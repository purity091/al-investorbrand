import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is properly configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey &&
    (supabaseUrl.startsWith('https://') || supabaseUrl.startsWith('http://'));

// Simple mutex lock to prevent Navigator LockManager timeouts
let lockHeld = false;
const simpleLock = async <R>(name: string, acquireTimeout: number, fn: () => Promise<R>): Promise<R> => {
    // Wait for existing lock to release (with timeout)
    const start = Date.now();
    while (lockHeld && Date.now() - start < acquireTimeout) {
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    lockHeld = true;
    try {
        return await fn();
    } finally {
        lockHeld = false;
    }
};

export const supabase = isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            lock: simpleLock,
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            storage: window.localStorage,
            flowType: 'implicit',
        }
    })
    : null;

export { isSupabaseConfigured };
