import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TrendingUp, TrendingDown, Users, Target, Calendar, Clock,
    BarChart3, PieChart, Activity, Award, Zap, Globe,
    ChevronUp, ChevronDown, ArrowRight, Eye, Edit, Plus,
    FileText, Video, Image, MessageSquare, Share2, Bookmark,
    Bell, Search, Filter, Download, RefreshCw, CheckCircle2,
    AlertCircle, Star, Layers, LayoutGrid, List, Moon, Sun
} from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

interface PlatformStats {
    id: string;
    name: string;
    nameAr: string;
    color: string;
    icon: string;
    programsCount: number;
    postsCount: number;
    quarterlyGrowth: number;
    engagement: number;
}

interface RecentActivity {
    id: number;
    type: 'program' | 'post' | 'update';
    title: string;
    titleAr: string;
    platform: string;
    date: string;
    status: 'published' | 'scheduled' | 'draft';
}

interface QuarterlyData {
    quarter: string;
    quarterAr: string;
    programs: number;
    posts: number;
    growth: number;
}

const DashboardPage = () => {
    const navigate = useNavigate();
    const { programs, loading } = useDatabase();
    const [selectedPeriod, setSelectedPeriod] = useState<'year' | 'quarter' | 'month'>('year');
    const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
    const [darkMode, setDarkMode] = useState(false);

    const platforms: PlatformStats[] = [
        {
            id: 'news',
            name: 'News',
            nameAr: 'الأخبار',
            color: '#00E1C1',
            icon: '📰',
            programsCount: 0,
            postsCount: 0,
            quarterlyGrowth: 15.5,
            engagement: 78
        },
        {
            id: 'academy',
            name: 'Academy',
            nameAr: 'الأكاديمية',
            color: '#F59E0B',
            icon: '🎓',
            programsCount: 0,
            postsCount: 0,
            quarterlyGrowth: 22.3,
            engagement: 85
        },
        {
            id: 'radar',
            name: 'Radar',
            nameAr: 'الرادار',
            color: '#EF4444',
            icon: '📡',
            programsCount: 0,
            postsCount: 0,
            quarterlyGrowth: 8.7,
            engagement: 65
        },
        {
            id: 'launch',
            name: 'Launch',
            nameAr: 'الإطلاق',
            color: '#3B82F6',
            icon: '🚀',
            programsCount: 0,
            postsCount: 0,
            quarterlyGrowth: 31.2,
            engagement: 92
        },
        {
            id: 'saudi',
            name: 'Saudi',
            nameAr: 'السعودية',
            color: '#10B981',
            icon: '🇸🇦',
            programsCount: 0,
            postsCount: 0,
            quarterlyGrowth: 18.9,
            engagement: 88
        }
    ];

    const quarterlyData: QuarterlyData[] = [
        { quarter: 'Q1', quarterAr: 'الربع الأول', programs: 45, posts: 1250, growth: 12.5 },
        { quarter: 'Q2', quarterAr: 'الربع الثاني', programs: 52, posts: 1480, growth: 18.3 },
        { quarter: 'Q3', quarterAr: 'الربع الثالث', programs: 48, posts: 1380, growth: 15.7 },
        { quarter: 'Q4', quarterAr: 'الربع الرابع', programs: 58, posts: 1620, growth: 22.1 }
    ];

    const recentActivities: RecentActivity[] = [
        { id: 1, type: 'program', title: 'Q1 Awareness Campaign', titleAr: 'حملة التوعية للربع الأول', platform: 'news', date: '2026-02-20', status: 'published' },
        { id: 2, type: 'post', title: 'Financial Literacy Series', titleAr: 'سلسلة التثقيف المالي', platform: 'academy', date: '2026-02-19', status: 'scheduled' },
        { id: 3, type: 'update', title: 'Instagram Growth Plan', titleAr: 'خطة نمو إنستغرام', platform: 'launch', date: '2026-02-18', status: 'draft' },
        { id: 4, type: 'program', title: 'YouTube Content Strategy', titleAr: 'استراتيجية محتوى يوتيوب', platform: 'saudi', date: '2026-02-17', status: 'published' },
        { id: 5, type: 'post', title: 'Telegram Channel Launch', titleAr: 'إطلاق قناة تيليجرام', platform: 'radar', date: '2026-02-16', status: 'published' }
    ];

    // Calculate stats from actual programs
    const calculateStats = () => {
        const totalPrograms = programs.length;
        const assignedPrograms = programs.filter(p => p.quarterId !== null).length;
        const unassignedPrograms = programs.filter(p => p.quarterId === null).length;
        const totalPosts = programs.reduce((acc, p) => acc + (p.postsCount || 0), 0);

        // Calculate per-platform stats
        platforms.forEach(platform => {
            const platformPrograms = programs.filter(p => p.platform === platform.id);
            platform.programsCount = platformPrograms.length;
            platform.postsCount = platformPrograms.reduce((acc, p) => acc + (p.postsCount || 0), 0);
        });

        return { totalPrograms, assignedPrograms, unassignedPrograms, totalPosts };
    };

    const stats = calculateStats();

    const getPlatformColor = (platformId: string) => {
        const platform = platforms.find(p => p.id === platformId);
        return platform?.color || '#6B7280';
    };

    const getPlatformName = (platformId: string) => {
        const platform = platforms.find(p => p.id === platformId);
        return platform?.nameAr || platformId;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published': return 'text-green-600 bg-green-50';
            case 'scheduled': return 'text-amber-600 bg-amber-50';
            case 'draft': return 'text-slate-600 bg-slate-50';
            default: return 'text-slate-600 bg-slate-50';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'published': return <CheckCircle2 size={14} />;
            case 'scheduled': return <Clock size={14} />;
            case 'draft': return <FileText size={14} />;
            default: return <FileText size={14} />;
        }
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'program': return <Target size={16} />;
            case 'post': return <FileText size={16} />;
            case 'update': return <Edit size={16} />;
            default: return <FileText size={16} />;
        }
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
        <div className={`min-h-screen ${darkMode ? 'dark bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100'}`}>
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
                            {/* Search */}
                            <div className={`relative hidden md:block ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg`}>
                                <Search size={18} className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                                <input
                                    type="text"
                                    placeholder="بحث..."
                                    className={`w-64 px-10 py-2 ${darkMode ? 'bg-slate-700 text-white placeholder-slate-400' : 'bg-slate-100 text-slate-900 placeholder-slate-500'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E1C1] text-sm`}
                                />
                            </div>

                            {/* Notifications */}
                            <button className={`relative p-2 ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-slate-50'} rounded-lg transition-colors shadow-sm`}>
                                <Bell size={18} className={darkMode ? 'text-slate-300' : 'text-slate-600'} />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                            </button>

                            {/* Dark Mode Toggle */}
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`p-2 ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-slate-50'} rounded-lg transition-colors shadow-sm`}
                            >
                                {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-600" />}
                            </button>

                            {/* Refresh */}
                            <button className={`p-2 ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-slate-50'} rounded-lg transition-colors shadow-sm`}>
                                <RefreshCw size={18} className={darkMode ? 'text-slate-300' : 'text-slate-600'} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Quick Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} rounded-xl flex items-center justify-center`}>
                                <Target size={24} className="text-blue-600" />
                            </div>
                            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                <TrendingUp size={16} />
                                <span>+12.5%</span>
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
                            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                <TrendingUp size={16} />
                                <span>+8.2%</span>
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
                            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                <TrendingUp size={16} />
                                <span>+25.3%</span>
                            </div>
                        </div>
                        <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-1`}>{stats.totalPosts}</div>
                        <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>إجمالي المنشورات</div>
                    </div>

                    <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 ${darkMode ? 'bg-amber-900/30' : 'bg-amber-50'} rounded-xl flex items-center justify-center`}>
                                <Activity size={24} className="text-amber-600" />
                            </div>
                            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                <TrendingUp size={16} />
                                <span>+18.7%</span>
                            </div>
                        </div>
                        <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-1`}>82%</div>
                        <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>معدل التفاعل</div>
                    </div>
                </div>

                {/* Platforms Grid */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>المنصات</h2>
                            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'} mt-1`}>نظرة عامة على أداء كل منصة</p>
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
                        {platforms.map((platform, index) => (
                            <div
                                key={platform.id}
                                className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-5 border shadow-sm hover:shadow-lg transition-all cursor-pointer group`}
                                onClick={() => navigate(`/${platform.id}`)}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md"
                                        style={{ background: `linear-gradient(135deg, ${platform.color}20, ${platform.color}10)` }}
                                    >
                                        {platform.icon}
                                    </div>
                                    <div className={`flex items-center gap-1 text-sm font-medium ${platform.quarterlyGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {platform.quarterlyGrowth > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                        <span>{Math.abs(platform.quarterlyGrowth)}%</span>
                                    </div>
                                </div>

                                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-1`}>{platform.nameAr}</h3>
                                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'} mb-4`}>{platform.name}</p>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>البرامج</span>
                                        <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{platform.programsCount}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>المنشورات</span>
                                        <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{platform.postsCount}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>التفاعل</span>
                                        <div className="flex items-center gap-1">
                                            <div className={`w-16 h-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'} rounded-full overflow-hidden`}>
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{ width: `${platform.engagement}%`, background: platform.color }}
                                                />
                                            </div>
                                            <span className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{platform.engagement}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-dashed" style={{ borderColor: darkMode ? '#475569' : '#E2E8F0' }}>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>النمو الربع سنوي</span>
                                        <span className={`font-bold ${platform.quarterlyGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {platform.quarterlyGrowth > 0 ? '+' : ''}{platform.quarterlyGrowth}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Charts and Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Quarterly Performance */}
                    <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 border shadow-sm`}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>الأداء الربع سنوي</h3>
                                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'} mt-1`}>عدد البرامج والمنشورات لكل ربع</p>
                            </div>
                            <div className={`p-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg`}>
                                <BarChart3 size={20} className={darkMode ? 'text-slate-300' : 'text-slate-600'} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {quarterlyData.map((data, index) => (
                                <div key={data.quarter} className="group">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${darkMode ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
                                                {data.quarter}
                                            </div>
                                            <div>
                                                <div className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{data.quarterAr}</div>
                                                <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{data.programs} برنامج • {data.posts} منشور</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className={`text-sm font-bold ${data.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {data.growth > 0 ? '+' : ''}{data.growth}%
                                            </div>
                                            {data.growth > 0 ? (
                                                <ChevronUp size={16} className="text-green-600" />
                                            ) : (
                                                <ChevronDown size={16} className="text-red-600" />
                                            )}
                                        </div>
                                    </div>
                                    <div className={`h-3 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-full overflow-hidden`}>
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-[#00E1C1] to-[#00C9A7] transition-all duration-500"
                                            style={{ width: `${(data.programs / 60) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 border shadow-sm`}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>النشاط الأخير</h3>
                                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'} mt-1`}>آخر التحديثات على المنصات</p>
                            </div>
                            <div className={`p-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg`}>
                                <Clock size={20} className={darkMode ? 'text-slate-300' : 'text-slate-600'} />
                            </div>
                        </div>

                        <div className="space-y-3">
                            {recentActivities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className={`flex items-center gap-3 p-3 ${darkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-50 hover:bg-slate-100'} rounded-xl transition-colors cursor-pointer`}
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ background: `${getPlatformColor(activity.platform)}20` }}
                                    >
                                        <div style={{ color: getPlatformColor(activity.platform) }}>
                                            {getActivityIcon(activity.type)}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'} truncate`}>{activity.titleAr}</div>
                                        <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'} flex items-center gap-2 mt-1`}>
                                            <span>{getPlatformName(activity.platform)}</span>
                                            <span>•</span>
                                            <span>{new Date(activity.date).toLocaleDateString('ar-SA')}</span>
                                        </div>
                                    </div>
                                    <div className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${getStatusColor(activity.status)}`}>
                                        {getStatusIcon(activity.status)}
                                        <span className="hidden sm:inline">
                                            {activity.status === 'published' && 'منشور'}
                                            {activity.status === 'scheduled' && 'مجدول'}
                                            {activity.status === 'draft' && 'مسودة'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-4 py-3 text-sm font-bold text-[#00E1C1] hover:bg-[#00E1C1]/10 rounded-xl transition-colors flex items-center justify-center gap-2">
                            <span>عرض كل النشاطات</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 border shadow-sm mb-8`}>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>إجراءات سريعة</h3>
                            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'} mt-1`}>أدوات مفيدة للوصول السريع</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {[
                            { icon: Plus, label: 'إضافة برنامج', color: '#00E1C1', action: () => navigate('/news/planning') },
                            { icon: Calendar, label: 'التقويم', color: '#F59E0B', action: () => { } },
                            { icon: FileText, label: 'المنشورات', color: '#3B82F6', action: () => { } },
                            { icon: BarChart3, label: 'التقارير', color: '#EF4444', action: () => { } },
                            { icon: Download, label: 'تصدير', color: '#10B981', action: () => { } },
                            { icon: Settings, label: 'الإعدادات', color: '#6B7280', action: () => navigate('/admin') }
                        ].map((action, index) => (
                            <button
                                key={index}
                                onClick={action.action}
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

                {/* Platform Distribution */}
                <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 border shadow-sm`}>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>توزيع البرامج</h3>
                            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'} mt-1`}>توزيع البرامج عبر المنصات والأرباع</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className={`p-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg`}>
                                <LayoutGrid size={18} className={darkMode ? 'text-slate-300' : 'text-slate-600'} />
                            </button>
                            <button className={`p-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg`}>
                                <List size={18} className={darkMode ? 'text-slate-300' : 'text-slate-600'} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {platforms.map((platform) => (
                            <div key={platform.id} className={`${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'} rounded-xl p-4`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                                        style={{ background: `${platform.color}20` }}
                                    >
                                        {platform.icon}
                                    </div>
                                    <div>
                                        <div className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{platform.nameAr}</div>
                                        <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{platform.programsCount} برنامج</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {['Q1', 'Q2', 'Q3', 'Q4'].map((quarter, idx) => {
                                        const count = Math.floor(platform.programsCount / 4) + (idx < (platform.programsCount % 4) ? 1 : 0);
                                        const percentage = platform.programsCount > 0 ? (count / platform.programsCount) * 100 : 0;
                                        return (
                                            <div key={quarter} className="flex items-center gap-2">
                                                <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'} w-8`}>{quarter}</span>
                                                <div className={`flex-1 h-2 ${darkMode ? 'bg-slate-600' : 'bg-slate-200'} rounded-full overflow-hidden`}>
                                                    <div
                                                        className="h-full rounded-full transition-all duration-500"
                                                        style={{ width: `${percentage}%`, background: platform.color }}
                                                    />
                                                </div>
                                                <span className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-900'} w-6 text-left`}>{count}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export { DashboardPage };
