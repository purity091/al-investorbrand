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

            // Clear existing programs
            const { error: deleteError } = await supabase
                .from('programs')
                .delete()
                .neq('id', 0);

            if (deleteError) throw deleteError;

            // Insert new programs
            if (programsToSave.length > 0) {
                const { error: insertError } = await supabase
                    .from('programs')
                    .insert(programsToSave);

                if (insertError) throw insertError;
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

            const { error: deleteError } = await supabase
                .from('platforms')
                .delete()
                .neq('id', '');

            if (deleteError) throw deleteError;

            if (platformsToSave.length > 0) {
                const { error: insertError } = await supabase
                    .from('platforms')
                    .insert(platformsToSave);

                if (insertError) throw insertError;
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
