import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface Program {
    id: number;
    title: string;
    titleAr: string;
    platform: string;
    platformName: string;
    platformColor: string;
    postsCount: number;
    quarterId: number | null;
    order: number;
}

interface Platform {
    id: string;
    name: string;
    nameAr: string;
    color: string;
    enabled: boolean;
}

interface DatabaseContextType {
    programs: Program[];
    platforms: Platform[];
    loading: boolean;
    error: string | null;
    savePrograms: (programs: Program[]) => Promise<void>;
    loadPrograms: () => Promise<void>;
    savePlatforms: (platforms: Platform[]) => Promise<void>;
    loadPlatforms: () => Promise<Platform[]>;
    isSupabaseConfigured: boolean;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const useDatabase = () => {
    const context = useContext(DatabaseContext);
    if (!context) {
        throw new Error('useDatabase must be used within DatabaseProvider');
    }
    return context;
};

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadPrograms = async () => {
        try {
            setLoading(true);
            
            if (!isSupabaseConfigured || !supabase) {
                // Supabase not configured, use empty array
                setPrograms([]);
                setLoading(false);
                return;
            }
            
            const { data, error: fetchError } = await supabase
                .from('programs')
                .select('*')
                .order('created_at', { ascending: true });

            if (fetchError) throw fetchError;
            if (data) setPrograms(data as Program[]);
        } catch (err: any) {
            setError(err.message);
            console.error('Error loading programs:', err);
        } finally {
            setLoading(false);
        }
    };

    const savePrograms = async (programsToSave: Program[]) => {
        try {
            if (!isSupabaseConfigured || !supabase) {
                // Supabase not configured, just update local state
                setPrograms(programsToSave);
                return;
            }

            // Use upsert instead of delete+insert to avoid RLS issues
            // First, get existing programs
            const { data: existingPrograms, error: fetchError } = await supabase
                .from('programs')
                .select('id');

            if (fetchError) throw fetchError;

            // Delete programs that are not in the new list
            if (existingPrograms && existingPrograms.length > 0) {
                const existingIds = existingPrograms.map(p => p.id);
                const newIds = programsToSave.map(p => p.id);
                const toDelete = existingIds.filter(id => !newIds.includes(id));

                if (toDelete.length > 0) {
                    const { error: deleteError } = await supabase
                        .from('programs')
                        .delete()
                        .in('id', toDelete);

                    if (deleteError) console.warn('Warning: Could not delete some programs:', deleteError);
                }
            }

            // Insert or update programs
            if (programsToSave.length > 0) {
                const { error: upsertError } = await supabase
                    .from('programs')
                    .upsert(programsToSave, { onConflict: 'id' });

                if (upsertError) throw upsertError;
            }

            setPrograms(programsToSave);
        } catch (err: any) {
            setError(err.message);
            console.error('Error saving programs:', err);
            throw err;
        }
    };

    const loadPlatforms = async (): Promise<Platform[]> => {
        try {
            if (!isSupabaseConfigured || !supabase) {
                setLoading(false);
                return [];
            }
            
            const { data, error: fetchError } = await supabase
                .from('platforms')
                .select('*')
                .order('id');

            if (fetchError) throw fetchError;
            if (data) {
                setPlatforms(data as Platform[]);
                return data as Platform[];
            }
            return [];
        } catch (err: any) {
            setError(err.message);
            console.error('Error loading platforms:', err);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const savePlatforms = async (platformsToSave: Platform[]) => {
        try {
            if (!isSupabaseConfigured || !supabase) {
                setPlatforms(platformsToSave);
                return;
            }

            // Use upsert instead of delete+insert to avoid RLS issues
            if (platformsToSave.length > 0) {
                const { error: upsertError } = await supabase
                    .from('platforms')
                    .upsert(platformsToSave, { onConflict: 'id' });

                if (upsertError) throw upsertError;
            }

            setPlatforms(platformsToSave);
        } catch (err: any) {
            setError(err.message);
            console.error('Error saving platforms:', err);
            throw err;
        }
    };

    useEffect(() => {
        loadPrograms();
        loadPlatforms();
    }, []);

    return (
        <DatabaseContext.Provider value={{
            programs,
            platforms,
            loading,
            error,
            savePrograms,
            loadPrograms,
            savePlatforms,
            loadPlatforms,
            isSupabaseConfigured,
        }}>
            {children}
        </DatabaseContext.Provider>
    );
};
