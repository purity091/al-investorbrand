import React, { createContext, useContext, useState, useEffect } from 'react';
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Skip auth initialization if Supabase is not configured
        if (!isSupabaseConfigured || !supabase) {
            setLoading(false);
            return;
        }

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                loadUserProfile(session.user.id);
            } else {
                setLoading(false);
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                if (session?.user) {
                    await loadUserProfile(session.user.id);
                } else {
                    setProfile(null);
                    setLoading(false);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const loadUserProfile = async (userId: string) => {
        if (!isSupabaseConfigured || !supabase) {
            setLoading(false);
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
                setProfile(data as UserProfile);
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
                        setProfile(createdData as UserProfile);
                    } else {
                        console.warn('Could not create user profile automatically:', createError);
                        setProfile(null);
                    }
                } else {
                    setProfile(null);
                }
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
            setProfile(null);
        } finally {
            setLoading(false);
        }
    };

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
