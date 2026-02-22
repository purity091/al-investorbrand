import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from './AuthContext';

export interface ContentItem {
    id: number;
    platform: string;
    section: string;
    field_key: string;
    field_type: string;
    content_ar: string;
    content_en?: string;
    metadata?: any;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    created_by?: string;
    updated_by?: string;
}

export interface ContentBySection {
    [key: string]: {
        [key: string]: string; // field_key -> content_ar
    };
}

interface ContentContextType {
    // Get content
    getContent: (platform: string, section: string, fieldKey: string) => string;
    getAllContent: (platform: string, section: string) => ContentBySection;
    getSectionContent: (platform: string, section: string) => { [key: string]: string };
    
    // Update content
    updateContent: (platform: string, section: string, fieldKey: string, contentAr: string, contentEn?: string) => Promise<void>;
    bulkUpdateContent: (platform: string, section: string, items: { field_key: string; content_ar: string; content_en?: string }[]) => Promise<void>;
    
    // Load content
    loadContent: (platform?: string, section?: string) => Promise<void>;
    
    // State
    loading: boolean;
    error: string | null;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within ContentProvider');
    }
    return context;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [contentItems, setContentItems] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load content from database
    const loadContent = useCallback(async (platform?: string, section?: string) => {
        try {
            setLoading(true);
            setError(null);

            if (!isSupabaseConfigured || !supabase) {
                setContentItems([]);
                setLoading(false);
                return;
            }

            let query = supabase
                .from('content_items')
                .select('*')
                .eq('is_active', true);

            if (platform) {
                query = query.eq('platform', platform);
            }

            if (section) {
                query = query.eq('section', section);
            }

            const { data, error: fetchError } = await query.order('section', { ascending: true }).order('field_key', { ascending: true });

            if (fetchError) throw fetchError;
            if (data) {
                setContentItems(data);
            }
        } catch (err: any) {
            setError(err.message);
            console.error('Error loading content:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Get content for specific field
    const getContent = useCallback((platform: string, section: string, fieldKey: string): string => {
        const item = contentItems.find(
            c => c.platform === platform && c.section === section && c.field_key === fieldKey
        );
        return item?.content_ar || '';
    }, [contentItems]);

    // Get all content for a section
    const getSectionContent = useCallback((platform: string, section: string): { [key: string]: string } => {
        const sectionItems = contentItems.filter(
            c => c.platform === platform && c.section === section
        );
        
        const content: { [key: string]: string } = {};
        sectionItems.forEach(item => {
            content[item.field_key] = item.content_ar;
        });
        
        return content;
    }, [contentItems]);

    // Get all content (deprecated, use getSectionContent instead)
    const getAllContent = useCallback((platform: string, section: string): ContentBySection => {
        const result: ContentBySection = {};
        const sectionItems = contentItems.filter(
            c => c.platform === platform && c.section === section
        );
        
        sectionItems.forEach(item => {
            if (!result[section]) {
                result[section] = {};
            }
            result[section][item.field_key] = item.content_ar;
        });
        
        return result;
    }, [contentItems]);

    // Update single content item
    const updateContent = useCallback(async (
        platform: string,
        section: string,
        fieldKey: string,
        contentAr: string,
        contentEn?: string
    ) => {
        try {
            if (!isSupabaseConfigured || !supabase) {
                // Update local state only
                setContentItems(prev => prev.map(item => 
                    item.platform === platform && item.section === section && item.field_key === fieldKey
                        ? { ...item, content_ar: contentAr, content_en: contentEn || item.content_en, updated_by: user?.email }
                        : item
                ));
                return;
            }

            const { error: upsertError } = await supabase
                .from('content_items')
                .upsert({
                    platform,
                    section,
                    field_key: fieldKey,
                    content_ar: contentAr,
                    content_en: contentEn || null,
                    updated_by: user?.email,
                }, {
                    onConflict: 'platform,section,field_key'
                });

            if (upsertError) throw upsertError;

            // Update local state
            setContentItems(prev => {
                const existing = prev.find(
                    i => i.platform === platform && i.section === section && i.field_key === fieldKey
                );

                if (existing) {
                    return prev.map(item =>
                        item.platform === platform && item.section === section && item.field_key === fieldKey
                            ? { ...item, content_ar: contentAr, content_en: contentEn || item.content_en, updated_by: user?.email }
                            : item
                    );
                } else {
                    return [...prev, {
                        id: Date.now(),
                        platform,
                        section,
                        field_key: fieldKey,
                        field_type: 'text',
                        content_ar: contentAr,
                        content_en: contentEn || '',
                        is_active: true,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                        created_by: user?.email,
                        updated_by: user?.email,
                    }];
                }
            });
        } catch (err: any) {
            setError(err.message);
            console.error('Error updating content:', err);
            throw err;
        }
    }, [user?.email]);

    // Bulk update content for a section
    const bulkUpdateContent = useCallback(async (
        platform: string,
        section: string,
        items: { field_key: string; content_ar: string; content_en?: string }[]
    ) => {
        try {
            if (!isSupabaseConfigured || !supabase) {
                // Update local state only
                setContentItems(prev => prev.map(item => {
                    if (item.platform === platform && item.section === section) {
                        const update = items.find(i => i.field_key === item.field_key);
                        if (update) {
                            return {
                                ...item,
                                content_ar: update.content_ar,
                                content_en: update.content_en || item.content_en,
                                updated_by: user?.email,
                            };
                        }
                    }
                    return item;
                }));
                return;
            }

            const updates = items.map(item => ({
                platform,
                section,
                field_key: item.field_key,
                content_ar: item.content_ar,
                content_en: item.content_en || null,
                updated_by: user?.email,
            }));

            const { error: bulkError } = await supabase
                .from('content_items')
                .upsert(updates, { onConflict: 'platform,section,field_key' });

            if (bulkError) throw bulkError;

            // Update local state
            setContentItems(prev => prev.map(item => {
                if (item.platform === platform && item.section === section) {
                    const update = items.find(i => i.field_key === item.field_key);
                    if (update) {
                        return {
                            ...item,
                            content_ar: update.content_ar,
                            content_en: update.content_en || item.content_en,
                            updated_by: user?.email,
                        };
                    }
                }
                return item;
            }));
        } catch (err: any) {
            setError(err.message);
            console.error('Error bulk updating content:', err);
            throw err;
        }
    }, [user?.email]);

    // Load content on mount
    useEffect(() => {
        loadContent();
    }, [loadContent]);

    return (
        <ContentContext.Provider value={{
            getContent,
            getAllContent,
            getSectionContent,
            updateContent,
            bulkUpdateContent,
            loadContent,
            loading,
            error,
        }}>
            {children}
        </ContentContext.Provider>
    );
};
