import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User, Session, AuthError } from '@supabase/supabase-js';

interface UserProfile {
    id: string;
    email: string;
    full_name?: string;
    avatar_url?: string;
    role: 'user' | 'admin' | 'superadmin';
    organization?: string;
}

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    session: Session | null;
    loading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
    signUp: (email: string, password: string, fullName?: string) => Promise<{ error: AuthError | null }>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
    updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

// Helper: retry an async function with exponential backoff
async function retryAsync<T>(fn: () => Promise<T>, maxRetries = 3, baseDelay = 500): Promise<T> {
    let lastError: any;
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (err) {
            lastError = err;
            if (i < maxRetries - 1) {
                await new Promise(r => setTimeout(r, baseDelay * Math.pow(2, i)));
            }
        }
    }
    throw lastError;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    // Track if initial session has been resolved to avoid race conditions
    const initialSessionResolved = useRef(false);
    // Track if component is mounted
    const isMounted = useRef(true);

    const loadUserProfile = useCallback(async (userId: string) => {
        if (!isSupabaseConfigured || !supabase) {
            if (isMounted.current) setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('id', userId)
                .maybeSingle();

            if (error) throw error;

            if (data) {
                if (isMounted.current) setProfile(data as UserProfile);
            } else {
                // Profile doesn't exist, try to create it
                const { data: userData } = await supabase.auth.getUser();
                if (userData?.user) {
                    const newProfile = {
                        id: userId,
                        email: userData.user.email || '',
                        full_name: userData.user.user_metadata?.full_name || '',
                        avatar_url: userData.user.user_metadata?.avatar_url || '',
                        role: 'user'
                    };

                    const { data: createdData, error: createError } = await supabase
                        .from('user_profiles')
                        .insert([newProfile])
                        .select()
                        .maybeSingle();

                    if (!createError && createdData) {
                        if (isMounted.current) setProfile(createdData as UserProfile);
                    } else {
                        console.warn('Could not create user profile automatically:', createError);
                        if (isMounted.current) setProfile(null);
                    }
                } else {
                    if (isMounted.current) setProfile(null);
                }
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
            if (isMounted.current) setProfile(null);
        } finally {
            if (isMounted.current) setLoading(false);
        }
    }, []);

    useEffect(() => {
        isMounted.current = true;

        // Skip auth initialization if Supabase is not configured
        if (!isSupabaseConfigured || !supabase) {
            setLoading(false);
            return;
        }

        // ──────────────────────────────────────────────────────────
        // 1) Listen for auth state changes FIRST
        //    This ensures we don't miss any events that fire
        //    while getSession() is in-flight.
        // ──────────────────────────────────────────────────────────
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, newSession) => {
                if (!isMounted.current) return;

                // On initial load, let getSession() handle the first resolution
                // to avoid double-processing and race conditions
                if (!initialSessionResolved.current && event === 'INITIAL_SESSION') {
                    // This is the initial session event from onAuthStateChange
                    // We let getSession handle this to avoid race conditions
                    return;
                }

                if (event === 'SIGNED_OUT') {
                    setSession(null);
                    setUser(null);
                    setProfile(null);
                    setLoading(false);
                    return;
                }

                if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                    if (newSession?.user) {
                        setSession(newSession);
                        setUser(newSession.user);
                        // Load profile in background, don't block rendering
                        loadUserProfile(newSession.user.id);
                    }
                    return;
                }

                // For any other events, update state accordingly
                if (newSession?.user) {
                    setSession(newSession);
                    setUser(newSession.user);
                } else if (event !== 'INITIAL_SESSION') {
                    // Only clear user if it's not the initial session event
                    // (which we handle separately below)
                    setSession(null);
                    setUser(null);
                    setProfile(null);
                    setLoading(false);
                }
            }
        );

        // ──────────────────────────────────────────────────────────
        // 2) Get initial session with retry for VPN/proxy resilience
        // ──────────────────────────────────────────────────────────
        const initSession = async () => {
            try {
                const { data: { session: currentSession }, error } = await retryAsync(
                    () => supabase!.auth.getSession(),
                    3,
                    300
                );

                if (!isMounted.current) return;

                if (error) {
                    console.warn('Error getting session (will try to recover):', error);
                }

                initialSessionResolved.current = true;

                if (currentSession?.user) {
                    setSession(currentSession);
                    setUser(currentSession.user);
                    await loadUserProfile(currentSession.user.id);
                } else {
                    // No session found - try to recover from localStorage directly
                    // This handles cases where getSession fails due to network issues
                    // but we still have valid tokens in storage
                    const recovered = await tryRecoverFromStorage();
                    if (!recovered && isMounted.current) {
                        setLoading(false);
                    }
                }
            } catch (err) {
                console.warn('All session recovery attempts failed:', err);
                if (isMounted.current) {
                    // Even on complete failure, try localStorage recovery
                    const recovered = await tryRecoverFromStorage();
                    if (!recovered) {
                        setLoading(false);
                    }
                }
            }
        };

        // Try to recover session from localStorage if getSession() fails
        // This is the last resort for VPN/proxy issues where the network
        // call to refresh the token fails, but we still have a valid refresh token
        const tryRecoverFromStorage = async (): Promise<boolean> => {
            try {
                const stored = window.localStorage.getItem('brand-auth-token');
                if (!stored) return false;

                const parsed = JSON.parse(stored);
                if (!parsed?.refresh_token) return false;

                // Try to use the refresh token to get a new session
                const { data, error } = await supabase!.auth.refreshSession({
                    refresh_token: parsed.refresh_token,
                });

                if (!isMounted.current) return false;

                if (data?.session?.user && !error) {
                    setSession(data.session);
                    setUser(data.session.user);
                    loadUserProfile(data.session.user.id);
                    return true;
                }
            } catch (e) {
                console.warn('Storage recovery failed:', e);
            }
            return false;
        };

        initSession();

        return () => {
            isMounted.current = false;
            subscription.unsubscribe();
        };
    }, [loadUserProfile]);

    const signIn = async (email: string, password: string) => {
        if (!isSupabaseConfigured || !supabase) {
            console.warn('Supabase not configured. Sign in disabled.');
            return { error: new Error('Supabase not configured') as any };
        }

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            return { error: null };
        } catch (error: any) {
            return { error };
        }
    };

    const signUp = async (email: string, password: string, fullName?: string) => {
        if (!isSupabaseConfigured || !supabase) {
            console.warn('Supabase not configured. Sign up disabled.');
            return { error: new Error('Supabase not configured') as any };
        }

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            });

            if (error) throw error;
            return { error: null };
        } catch (error: any) {
            return { error };
        }
    };

    const signOut = async () => {
        if (!isSupabaseConfigured || !supabase) {
            setUser(null);
            setProfile(null);
            setSession(null);
            return;
        }
        // Clear storage first to prevent stale session on next load
        try {
            window.localStorage.removeItem('brand-auth-token');
        } catch { }
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
        setSession(null);
    };

    const resetPassword = async (email: string) => {
        if (!isSupabaseConfigured || !supabase) {
            console.warn('Supabase not configured. Password reset disabled.');
            return { error: new Error('Supabase not configured') as any };
        }

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw error;
            return { error: null };
        } catch (error: any) {
            return { error };
        }
    };

    const updateUserProfile = async (updates: Partial<UserProfile>) => {
        if (!user || !isSupabaseConfigured || !supabase) {
            console.warn('Cannot update profile: Supabase not configured or user not logged in');
            return;
        }

        try {
            const { error } = await supabase
                .from('user_profiles')
                .update(updates)
                .eq('id', user.id);

            if (error) throw error;

            if (profile) {
                setProfile({ ...profile, ...updates });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    };

    const isAdmin = profile?.role === 'admin' || profile?.role === 'superadmin';

    const value = {
        user,
        profile,
        session,
        loading,
        isAuthenticated: !!user,
        isAdmin,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updateUserProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

