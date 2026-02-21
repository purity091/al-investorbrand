import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Eye, EyeOff, Lock, Unlock, Users, Shield, Check, X, Save, RefreshCw } from 'lucide-react';

interface VisibilitySetting {
    id: string;
    section_key: string;
    section_name: string;
    section_name_ar: string;
    is_visible: boolean;
    requires_auth: boolean;
    parent_section: string | null;
    display_order: number;
}

export const AdminVisibilityPage = () => {
    const { user, profile, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [settings, setSettings] = useState<VisibilitySetting[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [filter, setFilter] = useState<'all' | 'visible' | 'hidden' | 'auth'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Check if user is admin
        if (!user || !isAdmin) {
            navigate('/login');
            return;
        }

        loadVisibilitySettings();
    }, [user, isAdmin, navigate]);

    const loadVisibilitySettings = async () => {
        try {
            const { data, error } = await supabase
                .from('visibility_settings')
                .select('*')
                .order('display_order');

            if (error) throw error;
            setSettings(data || []);
        } catch (error) {
            console.error('Error loading visibility settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleVisibility = async (sectionKey: string, currentValue: boolean) => {
        setSaving(true);
        try {
            const { error } = await supabase
                .from('visibility_settings')
                .update({ is_visible: !currentValue })
                .eq('section_key', sectionKey);

            if (error) throw error;

            setSettings(settings.map(s =>
                s.section_key === sectionKey
                    ? { ...s, is_visible: !currentValue }
                    : s
            ));
        } catch (error) {
            console.error('Error toggling visibility:', error);
            alert('حدث خطأ في تحديث الإعدادات');
        } finally {
            setSaving(false);
        }
    };

    const toggleAuthRequired = async (sectionKey: string, currentValue: boolean) => {
        setSaving(true);
        try {
            const { error } = await supabase
                .from('visibility_settings')
                .update({ requires_auth: !currentValue })
                .eq('section_key', sectionKey);

            if (error) throw error;

            setSettings(settings.map(s =>
                s.section_key === sectionKey
                    ? { ...s, requires_auth: !currentValue }
                    : s
            ));
        } catch (error) {
            console.error('Error toggling auth requirement:', error);
            alert('حدث خطأ في تحديث الإعدادات');
        } finally {
            setSaving(false);
        }
    };

    const bulkToggle = async (visible: boolean) => {
        if (!confirm(`هل أنت متأكد من ${visible ? 'إظهار' : 'إخفاء'} جميع الأقسام؟`)) return;

        setSaving(true);
        try {
            const updates = settings.reduce((acc, setting) => ({
                ...acc,
                [setting.section_key]: visible
            }), {});

            const { error } = await supabase.rpc('bulk_update_visibility', {
                updates: JSON.stringify(updates)
            });

            if (error) throw error;

            setSettings(settings.map(s => ({ ...s, is_visible: visible })));
        } catch (error) {
            console.error('Error bulk updating:', error);
            alert('حدث خطأ في التحديث الجماعي');
        } finally {
            setSaving(false);
        }
    };

    const resetToDefaults = async () => {
        if (!confirm('هل أنت متأكد من إعادة تعيين جميع الإعدادات؟')) return;

        setSaving(true);
        try {
            await supabase.rpc('reset_visibility_to_defaults');
            await loadVisibilitySettings();
        } catch (error) {
            console.error('Error resetting:', error);
            alert('حدث خطأ في إعادة التعيين');
        } finally {
            setSaving(false);
        }
    };

    const filteredSettings = settings.filter(setting => {
        const matchesFilter =
            filter === 'all' ||
            (filter === 'visible' && setting.is_visible) ||
            (filter === 'hidden' && !setting.is_visible) ||
            (filter === 'auth' && setting.requires_auth);

        const matchesSearch =
            setting.section_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            setting.section_name_ar.includes(searchTerm);

        return matchesFilter && matchesSearch;
    });

    const stats = {
        total: settings.length,
        visible: settings.filter(s => s.is_visible).length,
        hidden: settings.filter(s => !s.is_visible).length,
        authRequired: settings.filter(s => s.requires_auth).length,
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#00E1C1] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-500">جاري التحميل...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-[#0D1137] mb-2">التحكم في الظهور</h1>
                            <p className="text-slate-500">تحكم في ظهور الأقسام والميزات للزوار والمستخدمين</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={resetToDefaults}
                                disabled={saving}
                                className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-bold text-slate-600"
                            >
                                <RefreshCw size={16} />
                                <span>إعادة تعيين</span>
                            </button>
                            <button
                                onClick={() => navigate('/admin')}
                                className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-bold text-slate-600"
                            >
                                لوحة التحكم
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-[#0D1137] rounded-lg flex items-center justify-center">
                                    <Shield className="text-white" size={20} />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-[#0D1137]">{stats.total}</div>
                                    <div className="text-xs text-slate-500">إجمالي الأقسام</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-[#10B981] rounded-lg flex items-center justify-center">
                                    <Eye className="text-white" size={20} />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-[#10B981]">{stats.visible}</div>
                                    <div className="text-xs text-slate-500">ظاهر</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-slate-400 rounded-lg flex items-center justify-center">
                                    <EyeOff className="text-white" size={20} />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-slate-600">{stats.hidden}</div>
                                    <div className="text-xs text-slate-500">مخفي</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-[#F59E0B] rounded-lg flex items-center justify-center">
                                    <Lock className="text-white" size={20} />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-[#F59E0B]">{stats.authRequired}</div>
                                    <div className="text-xs text-slate-500">يتطلب دخول</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bulk Actions */}
                    <div className="bg-white rounded-xl p-4 border border-slate-200 mb-6">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-600">إجراءات جماعية:</span>
                                <button
                                    onClick={() => bulkToggle(true)}
                                    disabled={saving}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors text-sm font-bold disabled:opacity-50"
                                >
                                    <Eye size={14} />
                                    <span>إظهار الكل</span>
                                </button>
                                <button
                                    onClick={() => bulkToggle(false)}
                                    disabled={saving}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-400 text-white rounded-lg hover:bg-slate-500 transition-colors text-sm font-bold disabled:opacity-50"
                                >
                                    <EyeOff size={14} />
                                    <span>إخفاء الكل</span>
                                </button>
                            </div>

                            {/* Filter */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="بحث..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#00E1C1]"
                                />
                                <select
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value as any)}
                                    className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#00E1C1]"
                                >
                                    <option value="all">الكل</option>
                                    <option value="visible">ظاهر</option>
                                    <option value="hidden">مخفي</option>
                                    <option value="auth">يتطلب دخول</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings List */}
                <div className="space-y-3">
                    {filteredSettings.map((setting) => (
                        <div
                            key={setting.id}
                            className={`bg-white rounded-xl p-4 border-2 transition-all ${
                                setting.parent_section ? 'ml-8 border-slate-100' : 'border-slate-200'
                            }`}
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4 flex-1">
                                    {/* Icon */}
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                        setting.is_visible
                                            ? setting.requires_auth
                                                ? 'bg-[#F59E0B]/10'
                                                : 'bg-[#10B981]/10'
                                            : 'bg-slate-100'
                                    }`}>
                                        {setting.is_visible ? (
                                            setting.requires_auth ? (
                                                <Lock className="text-[#F59E0B]" size={24} />
                                            ) : (
                                                <Eye className="text-[#10B981]" size={24} />
                                            )
                                        ) : (
                                            <EyeOff className="text-slate-400" size={24} />
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-[#0D1137]">{setting.section_name_ar}</h3>
                                            <span className="text-xs text-slate-400">{setting.section_name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {setting.is_visible ? (
                                                <span className="text-xs px-2 py-0.5 bg-[#10B981]/10 text-[#10B981] rounded-full font-bold">
                                                    ظاهر
                                                </span>
                                            ) : (
                                                <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-bold">
                                                    مخفي
                                                </span>
                                            )}
                                            {setting.requires_auth && (
                                                <span className="text-xs px-2 py-0.5 bg-[#F59E0B]/10 text-[#F59E0B] rounded-full font-bold flex items-center gap-1">
                                                    <Lock size={10} />
                                                    يتطلب دخول
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center gap-3">
                                    {/* Visibility Toggle */}
                                    <button
                                        onClick={() => toggleVisibility(setting.section_key, setting.is_visible)}
                                        disabled={saving}
                                        className={`relative w-14 h-7 rounded-full transition-colors ${
                                            setting.is_visible ? 'bg-[#10B981]' : 'bg-slate-300'
                                        }`}
                                    >
                                        <div
                                            className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
                                                setting.is_visible ? 'left-1' : 'right-1'
                                            }`}
                                        />
                                    </button>

                                    {/* Auth Toggle */}
                                    <button
                                        onClick={() => toggleAuthRequired(setting.section_key, setting.requires_auth)}
                                        disabled={saving}
                                        className={`relative w-14 h-7 rounded-full transition-colors ${
                                            setting.requires_auth ? 'bg-[#F59E0B]' : 'bg-slate-300'
                                        }`}
                                        title="يتطلب تسجيل دخول"
                                    >
                                        <div
                                            className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
                                                setting.requires_auth ? 'left-1' : 'right-1'
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredSettings.length === 0 && (
                    <div className="bg-white rounded-xl p-12 border-2 border-dashed border-slate-200 text-center">
                        <EyeOff className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 mb-4">لا توجد أقسام تطابق البحث</p>
                        <button
                            onClick={() => { setSearchTerm(''); setFilter('all'); }}
                            className="text-[#00E1C1] hover:text-[#00d1b3] font-bold"
                        >
                            مسح الفلتر
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
