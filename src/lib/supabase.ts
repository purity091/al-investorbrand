import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is properly configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey &&
    (supabaseUrl.startsWith('https://') || supabaseUrl.startsWith('http://'));

// Custom lock to prevent Navigator LockManager timeouts in development/Strict Mode
const customLock = async <R>(name: string, acquireTimeout: number, fn: () => Promise<R>): Promise<R> => {
    return await fn();
};

export const supabase = isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            lock: customLock
        }
    })
    : null;

export { isSupabaseConfigured };
