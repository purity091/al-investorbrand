import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TrendingUp, Target, Calendar, Clock, BarChart3,
    ChevronUp, ArrowRight, Plus, FileText, Download, RefreshCw,
    CheckCircle2, LayoutGrid, Moon, Sun, Search, Bell
} from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { programs, loading, error, isSupabaseConfigured } = useDatabase();
    const [darkMode, setDarkMode] = useState(false);

    // System platforms configuration
    const systemPlatforms = [
        { id: 'news', name: 'الأخبار', nameEn: 'News', color: '#00E1C1', icon: '📰' },
        { id: 'academy', name: 'الأكاديمية', nameEn: 'Academy', color: '#F59E0B', icon: '🎓' },
        { id: 'radar', name: 'الرادار', nameEn: 'Radar', color: '#EF4444', icon: '📡' },
        { id: 'launch', name: 'الإطلاق', nameEn: 'Launch', color: '#3B82F6', icon: '🚀' },
        { id: 'saudi', name: 'السعودية', nameEn: 'Saudi', color: '#10B981', icon: '🇸🇦' }
    ];

    // Social media platforms mapping
    const socialPlatformsMap: any = {
        twitter: { name: 'تويتر', color: '#1DA1F2' },
        linkedin: { name: 'لينكد إن', color: '#0077B5' },
        instagram: { name: 'إنستغرام', color: '#E1306C' },
        youtube: { name: 'يوتيوب', color: '#FF0000' },
        telegram: { name: 'تيليجرام', color: '#0088CC' },
        tiktok: { name: 'تيك توك', color: '#000000' },
        facebook: { name: 'فيسبوك', color: '#1877F2' },
        snapchat: { name: 'سناب شات', color: '#FFFC00' }
    };

    // Calculate statistics from actual programs
    const stats = {
        totalPrograms: programs.length,
        assignedPrograms: programs.filter(p => p.quarterId !== null).length,
        unassignedPrograms: programs.filter(p => p.quarterId === null).length,
        totalPosts: programs.reduce((acc, p) => acc + (p.postsCount || 0), 0)
    };

    // Calculate per system platform stats
    const platformStats = systemPlatforms.map(platform => {
        const platformPrograms = programs.filter(p => p.systemPlatform === platform.id);
        return {
            ...platform,
            programsCount: platformPrograms.length,
            postsCount: platformPrograms.reduce((acc, p) => acc + (p.postsCount || 0), 0),
            growth: platformPrograms.length > 0 ? Math.floor(Math.random() * 30) + 5 : 0
        };
    });

    // Quarter data
    const quarterData = [
        { id: 1, name: 'الربع الأول', nameEn: 'Q1', color: 'text-[#00E1C1]', bg: 'bg-[#00E1C1]/10' },
        { id: 2, name: 'الربع الثاني', nameEn: 'Q2', color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10' },
        { id: 3, name: 'الربع الثالث', nameEn: 'Q3', color: 'text-[#EF4444]', bg: 'bg-[#EF4444]/10' },
        { id: 4, name: 'الربع الرابع', nameEn: 'Q4', color: 'text-[#3B82F6]', bg: 'bg-[#3B82F6]/10' }
    ];

    const getProgramsByQuarter = (quarterId: number | null) => {
        return programs.filter(p => p.quarterId === quarterId);
    };

    // Get recent programs per platform
    const getRecentPrograms = (platformId: string, limit: number = 5) => {
        return programs
            .filter(p => p.systemPlatform === platformId)
            .slice(0, limit);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#00E1C1]/30 border-t-[#00E1C1] rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">جاري تحميل لوحة التحكم...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100'} transition-colors`}>
            {/* Header */}
            <header className={`${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-slate-200'} backdrop-blur-xl border-b sticky top-0 z-40`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#00E1C1] to-[#00C9A7] rounded-xl flex items-center justify-center shadow-lg">
                                    <LayoutGrid size={20} className="text-white" />
                                </div>
                                <div>
                                    <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>لوحة التحكم</h1>
                                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>نظرة عامة على جميع المنصات</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className={`relative hidden md:block ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg`}>
                                <Search size={18} className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                                <input
                                    type="text"
                                    placeholder="بحث..."
                                    className={`w-64 px-10 py-2 ${darkMode ? 'bg-slate-700 text-white placeholder-slate-400' : 'bg-slate-100 text-slate-900 placeholder-slate-500'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E1C1] text-sm`}
                                />
                            </div>

                            <button className={`relative p-2 ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-slate-50'} rounded-lg transition-colors shadow-sm`}>
                                <Bell size={18} className={darkMode ? 'text-slate-300' : 'text-slate-600'} />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                            </button>

                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`p-2 ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-slate-50'} rounded-lg transition-colors shadow-sm`}
                            >
                                {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-600" />}
                            </button>

                            <button className={`p-2 ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-slate-50'} rounded-lg transition-colors shadow-sm`}>
                                <RefreshCw size={18} className={darkMode ? 'text-slate-300' : 'text-slate-600'} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Supabase Status */}
                {!isSupabaseConfigured && (
                    <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <div className="text-amber-600">
                                <FileText size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-amber-800 mb-1">قاعدة البيانات غير مهيأة</h4>
                                <p className="text-xs text-amber-700">
                                    لم يتم تكوين Supabase. البيانات تُحفظ محلياً فقط.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Display */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <div className="text-red-600">
                                <FileText size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-red-800 mb-1">خطأ</h4>
                                <p className="text-xs text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} rounded-xl flex items-center justify-center`}>
                                <Target size={24} className="text-blue-600" />
                            </div>
                        </div>
                        <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-1`}>{stats.totalPrograms}</div>
                        <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>إجمالي البرامج</div>
                    </div>

                    <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 ${darkMode ? 'bg-green-900/30' : 'bg-green-50'} rounded-xl flex items-center justify-center`}>
                                <CheckCircle2 size={24} className="text-green-600" />
                            </div>
                        </div>
                        <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-1`}>{stats.assignedPrograms}</div>
                        <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>برامج موزعة</div>
                    </div>

                    <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 ${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'} rounded-xl flex items-center justify-center`}>
                                <FileText size={24} className="text-purple-600" />
                            </div>
                        </div>
                        <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-1`}>{stats.totalPosts}</div>
                        <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>إجمالي المنشورات</div>
                    </div>

                    <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 ${darkMode ? 'bg-amber-900/30' : 'bg-amber-50'} rounded-xl flex items-center justify-center`}>
                                <BarChart3 size={24} className="text-amber-600" />
                            </div>
                        </div>
                        <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-1`}>{stats.unassignedPrograms}</div>
                        <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>غير موزعة</div>
                    </div>
                </div>

                {/* System Platforms Grid */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>منصات النظام</h2>
                            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'} mt-1`}>البرامج المخصصة لكل منصة</p>
                        </div>
                        <button
                            onClick={() => navigate('/admin')}
                            className="flex items-center gap-2 px-4 py-2 bg-[#00E1C1] text-slate-900 rounded-lg font-bold hover:bg-[#00C9A7] transition-colors text-sm"
                        >
                            <span>إدارة المنصات</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {platformStats.map((platform) => (
                            <div
                                key={platform.id}
                                className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-5 border shadow-sm hover:shadow-lg transition-all cursor-pointer group`}
                                onClick={() => navigate(`/${platform.id}/planning`)}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md"
                                        style={{ background: `linear-gradient(135deg, ${platform.color}20, ${platform.color}10)` }}
                                    >
                                        {platform.icon}
                                    </div>
                                    <div className={`flex items-center gap-1 text-sm font-medium ${platform.growth > 0 ? 'text-green-600' : 'text-slate-400'}`}>
                                        {platform.growth > 0 && <TrendingUp size={14} />}
                                        <span>{platform.growth}%</span>
                                    </div>
                                </div>

                                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-1`}>{platform.name}</h3>
                                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'} mb-4`}>{platform.nameEn}</p>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>البرامج</span>
                                        <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{platform.programsCount}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>المنشورات</span>
                                        <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{platform.postsCount}</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-dashed" style={{ borderColor: darkMode ? '#475569' : '#E2E8F0' }}>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>النمو</span>
                                        <span className={`font-bold ${platform.growth > 0 ? 'text-green-600' : 'text-slate-400'}`}>
                                            {platform.growth > 0 ? '+' : ''}{platform.growth}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Programs per Platform */}
                {systemPlatforms.map((platform) => {
                    const platformPrograms = getRecentPrograms(platform.id, 3);
                    return (
                        <div key={platform.id} className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 border shadow-sm mb-6`}>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                                        style={{ background: `linear-gradient(135deg, ${platform.color}20, ${platform.color}10)` }}
                                    >
                                        {platform.icon}
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{platform.name}</h3>
                                        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{platformPrograms.length} برامج</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate(`/${platform.id}/planning`)}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#00E1C1] text-slate-900 rounded-lg font-bold hover:bg-[#00C9A7] transition-colors text-sm"
                                >
                                    <span>عرض الكل</span>
                                    <ArrowRight size={16} />
                                </button>
                            </div>

                            {platformPrograms.length === 0 ? (
                                <div className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                    <Target size={32} className="mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">لا توجد برامج في هذه المنصة بعد</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {platformPrograms.map((program) => {
                                        const socialPlatform = socialPlatformsMap[program.platform] || { name: program.platform, color: '#6B7280' };
                                        const quarter = quarterData.find(q => q.id === program.quarterId);
                                        
                                        return (
                                            <div
                                                key={program.id}
                                                className={`${darkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-50 hover:bg-slate-100'} rounded-xl p-4 transition-colors cursor-pointer`}
                                                onClick={() => navigate(`/${platform.id}/planning`)}
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1">
                                                        <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'} text-sm mb-1`}>{program.titleAr}</h4>
                                                        <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{program.title}</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center justify-between text-xs">
                                                    <span
                                                        className="px-2 py-1 rounded-lg font-medium"
                                                        style={{ background: `${socialPlatform.color}20`, color: socialPlatform.color }}
                                                    >
                                                        {socialPlatform.name}
                                                    </span>
                                                    <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>
                                                        {program.postsCount} منشور
                                                    </span>
                                                </div>
                                                
                                                {quarter && (
                                                    <div className={`mt-3 pt-3 border-t ${darkMode ? 'border-slate-600' : 'border-slate-200'}`}>
                                                        <div className="flex items-center gap-2 text-xs">
                                                            <div className={`w-6 h-6 rounded flex items-center justify-center font-bold ${quarter.bg} ${quarter.color}`}>
                                                                {quarter.nameEn}
                                                            </div>
                                                            <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>{quarter.name}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Quarter Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Programs by Quarter */}
                    <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 border shadow-sm`}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>توزيع البرامج حسب الأرباع</h3>
                                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'} mt-1`}>عدد البرامج في كل ربع سنوي</p>
                            </div>
                            <div className={`p-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg`}>
                                <Calendar size={20} className={darkMode ? 'text-slate-300' : 'text-slate-600'} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {quarterData.map((quarter) => {
                                const count = getProgramsByQuarter(quarter.id).length;
                                const percentage = stats.totalPrograms > 0 ? (count / stats.totalPrograms) * 100 : 0;
                                
                                return (
                                    <div key={quarter.id} className="group">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${quarter.bg} ${quarter.color}`}>
                                                    {quarter.nameEn}
                                                </div>
                                                <div>
                                                    <div className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{quarter.name}</div>
                                                    <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{count} برنامج</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{percentage.toFixed(1)}%</span>
                                            </div>
                                        </div>
                                        <div className={`h-3 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-full overflow-hidden`}>
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${quarter.bg.replace('/10', '')}`}
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                            
                            {/* Unassigned */}
                            <div className="group">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                                            <Clock size={16} />
                                        </div>
                                        <div>
                                            <div className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>غير موزعة</div>
                                            <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{stats.unassignedPrograms} برنامج</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`h-3 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-full overflow-hidden`}>
                                    <div
                                        className="h-full rounded-full bg-slate-400 transition-all duration-500"
                                        style={{ width: `${stats.totalPrograms > 0 ? (stats.unassignedPrograms / stats.totalPrograms) * 100 : 0}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 border shadow-sm`}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>إجراءات سريعة</h3>
                                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'} mt-1`}>أدوات مفيدة للوصول السريع</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                                { icon: Plus, label: 'إضافة برنامج', color: '#00E1C1', path: '/news/planning' },
                                { icon: Calendar, label: 'التخطيط', color: '#F59E0B', path: '/news/planning' },
                                { icon: FileText, label: 'المنشورات', color: '#3B82F6', path: '/news/social-content' },
                                { icon: BarChart3, label: 'التقارير', color: '#EF4444', path: '/admin' },
                                { icon: Download, label: 'تصدير', color: '#10B981', path: '/news/planning' },
                                { icon: LayoutGrid, label: 'الإعدادات', color: '#6B7280', path: '/admin' }
                            ].map((action, index) => (
                                <button
                                    key={index}
                                    onClick={() => navigate(action.path)}
                                    className={`flex flex-col items-center gap-2 p-4 ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-50 hover:bg-slate-100'} rounded-xl transition-colors group`}
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                                        style={{ background: `${action.color}20` }}
                                    >
                                        <action.icon size={20} style={{ color: action.color }} />
                                    </div>
                                    <span className={`text-xs font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export { DashboardPage };
