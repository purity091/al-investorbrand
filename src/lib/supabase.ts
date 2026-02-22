import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is properly configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey &&
    (supabaseUrl.startsWith('https://') || supabaseUrl.startsWith('http://'));

// Simple mutex lock to prevent Navigator LockManager timeouts
// This avoids issues with the Web Locks API which can fail behind VPN/proxy
let lockHeld = false;
let lockQueue: Array<() => void> = [];

const simpleLock = async <R>(name: string, acquireTimeout: number, fn: () => Promise<R>): Promise<R> => {
    if (!lockHeld) {
        lockHeld = true;
        try {
            return await fn();
        } finally {
            lockHeld = false;
            // Process next in queue
            if (lockQueue.length > 0) {
                const next = lockQueue.shift();
                next?.();
            }
        }
    }

    // Wait for lock with timeout
    return new Promise<R>((resolve, reject) => {
        const timer = setTimeout(() => {
            // Remove from queue on timeout, but still run the function
            const idx = lockQueue.indexOf(tryAcquire);
            if (idx >= 0) lockQueue.splice(idx, 1);
            // On timeout, just run the function anyway to prevent deadlocks
            fn().then(resolve).catch(reject);
        }, acquireTimeout);

        const tryAcquire = () => {
            clearTimeout(timer);
            lockHeld = true;
            fn()
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    lockHeld = false;
                    if (lockQueue.length > 0) {
                        const next = lockQueue.shift();
                        next?.();
                    }
                });
        };

        lockQueue.push(tryAcquire);
    });
};

// Custom storage wrapper that handles errors gracefully (VPN/proxy safe)
const safeStorage = {
    getItem: (key: string): string | null => {
        try {
            return window.localStorage.getItem(key);
        } catch (e) {
            console.warn('Failed to read from localStorage:', e);
            return null;
        }
    },
    setItem: (key: string, value: string): void => {
        try {
            window.localStorage.setItem(key, value);
        } catch (e) {
            console.warn('Failed to write to localStorage:', e);
        }
    },
    removeItem: (key: string): void => {
        try {
            window.localStorage.removeItem(key);
        } catch (e) {
            console.warn('Failed to remove from localStorage:', e);
        }
    }
};

let _supabase: SupabaseClient | null = null;

if (isSupabaseConfigured) {
    // Migrate session from old auto-generated key to new explicit key
    // This prevents existing users from being logged out on deploy
    try {
        const newKey = 'brand-auth-token';
        if (!window.localStorage.getItem(newKey)) {
            // Try to find the old Supabase auto-generated key
            for (let i = 0; i < window.localStorage.length; i++) {
                const key = window.localStorage.key(i);
                if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
                    const oldData = window.localStorage.getItem(key);
                    if (oldData) {
                        window.localStorage.setItem(newKey, oldData);
                        window.localStorage.removeItem(key);
                        break;
                    }
                }
            }
        }
    } catch (e) {
        // Silent fail - migration is best effort
    }

    _supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            lock: simpleLock,
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            storage: safeStorage,
            storageKey: 'brand-auth-token',
            flowType: 'pkce',
        }
    });
}

export const supabase = _supabase;
export { isSupabaseConfigured };
