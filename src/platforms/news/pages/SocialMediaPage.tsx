import React, { useState } from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { MessageCircle, Linkedin, Instagram, Youtube, Send, Facebook, X, Plus, Trash2, Check, X as XIcon, ChevronDown, ChevronUp, Video, Smartphone, Settings } from 'lucide-react';

interface Platform {
    id: string;
    name: string;
    nameAr: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    enabled: boolean;
    followers: string;
    postsCount: number;
}

interface Program {
    id: number;
    title: string;
    titleAr: string;
    platform: string;
    postsCount: number;
    startDate: string;
    endDate: string;
    status: 'active' | 'completed' | 'draft';
    posts: Post[];
    objectives: string;
    objectivesAr: string;
}

interface Post {
    id: number;
    content: string;
    contentAr: string;
    type: 'image' | 'video' | 'text' | 'carousel';
    scheduledDate: string;
    status: 'published' | 'scheduled' | 'draft';
}

export const SocialMediaPage = () => {
    const [platforms, setPlatforms] = useState<Platform[]>([
        {
            id: 'twitter',
            name: 'X (Twitter)',
            nameAr: 'إكس (تويتر)',
            description: 'للأخبار العاجلة',
            icon: <X size={18} />,
            color: 'bg-[#1DA1F2]',
            enabled: true,
            followers: '125K',
            postsCount: 1250,
        },
        {
            id: 'linkedin',
            name: 'LinkedIn',
            nameAr: 'لينكد إن',
            description: 'للمحتوى المهني',
            icon: <Linkedin size={18} />,
            color: 'bg-[#0077B5]',
            enabled: true,
            followers: '85K',
            postsCount: 520,
        },
        {
            id: 'instagram',
            name: 'Instagram',
            nameAr: 'إنستغرام',
            description: 'للصور والفيديو',
            icon: <Instagram size={18} />,
            color: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
            enabled: true,
            followers: '210K',
            postsCount: 890,
        },
        {
            id: 'youtube',
            name: 'YouTube',
            nameAr: 'يوتيوب',
            description: 'للفيديو الطويل',
            icon: <Youtube size={18} />,
            color: 'bg-[#FF0000]',
            enabled: true,
            followers: '95K',
            postsCount: 340,
        },
        {
            id: 'telegram',
            name: 'Telegram',
            nameAr: 'تيليجرام',
            description: 'للنشر السريع',
            icon: <Send size={18} />,
            color: 'bg-[#0088cc]',
            enabled: false,
            followers: '45K',
            postsCount: 2100,
        },
        {
            id: 'tiktok',
            name: 'TikTok',
            nameAr: 'تيك توك',
            description: 'للفيديو القصير',
            icon: <Video size={18} />,
            color: 'bg-black',
            enabled: true,
            followers: '180K',
            postsCount: 450,
        },
        {
            id: 'facebook',
            name: 'Facebook',
            nameAr: 'فيسبوك',
            description: 'الأوسع انتشاراً',
            icon: <Facebook size={18} />,
            color: 'bg-[#1877F2]',
            enabled: false,
            followers: '320K',
            postsCount: 1800,
        },
        {
            id: 'snapchat',
            name: 'Snapchat',
            nameAr: 'سناب شات',
            description: 'للمحتوى المؤقت',
            icon: <Smartphone size={18} />,
            color: 'bg-[#FFFC00]',
            enabled: false,
            followers: '95K',
            postsCount: 670,
        },
    ]);

    const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active');

    const [programs, setPrograms] = useState<Program[]>([
        {
            id: 1,
            title: 'Q1 2026 Awareness Campaign',
            titleAr: 'حملة التوعية للربع الأول 2026',
            platform: 'twitter',
            postsCount: 100,
            startDate: '2026-01-01',
            endDate: '2026-03-31',
            status: 'active',
            posts: generateSamplePosts(100),
            objectives: 'Increase brand awareness by 40% | Engage with 50K+ users | Drive traffic to main website | Establish thought leadership in financial sector',
            objectivesAr: 'زيادة الوعي بالعلامة التجارية بنسبة 40% | التفاعل مع أكثر من 50 ألف مستخدم | توجيه الحركة للموقع الرئيسي | ترسيخ الريادة الفكرية في القطاع المالي'
        },
        {
            id: 2,
            title: 'Financial Literacy Series',
            titleAr: 'سلسلة التثقيف المالي',
            platform: 'linkedin',
            postsCount: 100,
            startDate: '2026-02-01',
            endDate: '2026-04-30',
            status: 'active',
            posts: generateSamplePosts(100),
            objectives: 'Educate audience on investment basics | Build trust through expertise | Generate 10K qualified leads | Position brand as educational resource',
            objectivesAr: 'تثقيف الجمهور حول أساسيات الاستثمار | بناء الثقة من خلال الخبرة | توليد 10 آلاف عميل محتمل مؤهل | ترسيخ المكانة كمرجع تعليمي'
        },
    ]);

    const [showAddProgram, setShowAddProgram] = useState(false);
    const [showEditProgram, setShowEditProgram] = useState(false);
    const [editingProgramId, setEditingProgramId] = useState<number | null>(null);
    const [newProgramTitle, setNewProgramTitle] = useState('');
    const [newProgramTitleAr, setNewProgramTitleAr] = useState('');
    const [newProgramObjectives, setNewProgramObjectives] = useState('');
    const [newProgramObjectivesAr, setNewProgramObjectivesAr] = useState('');
    const [newProgramPlatform, setNewProgramPlatform] = useState('twitter');
    const [newProgramStatus, setNewProgramStatus] = useState<'active' | 'completed' | 'draft'>('draft');
    const [expandedProgram, setExpandedProgram] = useState<number | null>(null);

    function generateSamplePosts(count: number): Post[] {
        const posts: Post[] = [];
        const postTypes: ('image' | 'video' | 'text' | 'carousel')[] = ['image', 'video', 'text', 'carousel'];
        const statuses: ('published' | 'scheduled' | 'draft')[] = ['published', 'scheduled', 'draft'];

        for (let i = 0; i < count; i++) {
            posts.push({
                id: i + 1,
                content: `Post content ${i + 1} - Engaging content about financial markets`,
                contentAr: `محتوى المنشور ${i + 1} - محتوى جذاب حول الأسواق المالية`,
                type: postTypes[i % 4],
                scheduledDate: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
                status: statuses[i % 3],
            });
        }
        return posts;
    }

    const togglePlatform = (id: string) => {
        setPlatforms(platforms.map(p =>
            p.id === id ? { ...p, enabled: !p.enabled } : p
        ));
    };

    const addProgram = () => {
        if (!newProgramTitle || !newProgramTitleAr) return;

        const newProgram: Program = {
            id: Date.now(),
            title: newProgramTitle,
            titleAr: newProgramTitleAr,
            platform: newProgramPlatform,
            postsCount: 100,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
            status: newProgramStatus,
            posts: generateSamplePosts(100),
            objectives: newProgramObjectives,
            objectivesAr: newProgramObjectivesAr,
        };

        setPrograms([...programs, newProgram]);
        setNewProgramTitle('');
        setNewProgramTitleAr('');
        setNewProgramObjectives('');
        setNewProgramObjectivesAr('');
        setShowAddProgram(false);
    };

    const openEditModal = (program: Program) => {
        setEditingProgramId(program.id);
        setNewProgramTitle(program.title);
        setNewProgramTitleAr(program.titleAr);
        setNewProgramObjectives(program.objectives);
        setNewProgramObjectivesAr(program.objectivesAr);
        setNewProgramPlatform(program.platform);
        setNewProgramStatus(program.status);
        setShowEditProgram(true);
    };

    const updateProgram = () => {
        if (!newProgramTitle || !newProgramTitleAr || !editingProgramId) return;

        setPrograms(programs.map(p =>
            p.id === editingProgramId
                ? {
                    ...p,
                    title: newProgramTitle,
                    titleAr: newProgramTitleAr,
                    platform: newProgramPlatform,
                    status: newProgramStatus,
                    objectives: newProgramObjectives,
                    objectivesAr: newProgramObjectivesAr,
                }
                : p
        ));
        setNewProgramTitle('');
        setNewProgramTitleAr('');
        setNewProgramObjectives('');
        setNewProgramObjectivesAr('');
        setEditingProgramId(null);
        setShowEditProgram(false);
    };

    const deleteProgram = (id: number) => {
        setPrograms(programs.filter(p => p.id !== id));
    };

    const getPlatformName = (platformId: string) => {
        const platform = platforms.find(p => p.id === platformId);
        return platform ? platform.nameAr : platformId;
    };

    const getPlatformColor = (platformId: string) => {
        const platform = platforms.find(p => p.id === platformId);
        return platform ? platform.color : 'bg-slate-500';
    };

    return (
        <div className="animate-in fade-in duration-500 space-y-6 md:space-y-8">
            <SectionHeader
                title="إدارة منصات التواصل الاجتماعي"
                subtitle="تحكم في المنصات النشطة وأضف برامج محتوى مخصصة."
            />

            {/* Platforms Carousel - Categorized */}
            <div className="space-y-4">
                {/* Tab Headers */}
                <div className="flex items-center gap-3 bg-white rounded-xl p-2 border border-slate-200">
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all text-sm md:text-base ${
                            activeTab === 'active'
                                ? 'bg-[#10B981] text-white shadow-md'
                                : 'bg-transparent text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                        <Check size={18} />
                        <span>المنصات النشطة</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                            activeTab === 'active' ? 'bg-white/20' : 'bg-[#10B981]/10 text-[#10B981]'
                        }`}>
                            {platforms.filter(p => p.enabled).length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('inactive')}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all text-sm md:text-base ${
                            activeTab === 'inactive'
                                ? 'bg-slate-400 text-white shadow-md'
                                : 'bg-transparent text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                        <XIcon size={18} />
                        <span>المنصات غير النشطة</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                            activeTab === 'inactive' ? 'bg-white/20' : 'bg-slate-200 text-slate-600'
                        }`}>
                            {platforms.filter(p => !p.enabled).length}
                        </span>
                    </button>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    <div className="overflow-x-auto scrollbar-hide">
                        <div className="flex gap-3 pb-2">
                            {platforms
                                .filter(platform => activeTab === 'active' ? platform.enabled : !platform.enabled)
                                .map((platform) => (
                                    <div
                                        key={platform.id}
                                        className={`flex-shrink-0 w-40 md:w-48 rounded-xl p-3 border-2 transition-all duration-200 hover:shadow-lg ${
                                            platform.enabled
                                                ? 'border-[#00E1C1] bg-[#00E1C1]/5'
                                                : 'border-slate-200 bg-white opacity-75'
                                        }`}
                                    >
                                        {/* Toggle Button */}
                                        <button
                                            onClick={() => togglePlatform(platform.id)}
                                            className={`w-full h-5 rounded-full transition-colors mb-2 ${
                                                platform.enabled ? 'bg-[#00E1C1]' : 'bg-slate-300'
                                            }`}
                                        >
                                            <div
                                                className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${
                                                    platform.enabled ? 'translate-x-7' : 'translate-x-0.5'
                                                }`}
                                            />
                                        </button>

                                        {/* Icon */}
                                        <div className={`${platform.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-2 mx-auto`}>
                                            {platform.icon}
                                        </div>

                                        {/* Name */}
                                        <div className="font-bold text-[#0D1137] text-sm text-center truncate" title={platform.nameAr}>
                                            {platform.nameAr}
                                        </div>

                                        {/* Description */}
                                        <div className="text-xs text-slate-500 text-center mt-1">
                                            {platform.description}
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                                            <div className="text-xs">
                                                <div className="font-bold text-[#0D1137]">{platform.followers}</div>
                                                <div className="text-slate-400 text-[10px]">متابع</div>
                                            </div>
                                            <div className="text-xs text-left">
                                                <div className="font-bold text-[#0D1137]">{platform.postsCount.toLocaleString()}</div>
                                                <div className="text-slate-400 text-[10px]">منشور</div>
                                            </div>
                                        </div>

                                        {/* Active Indicator */}
                                        {platform.enabled && (
                                            <div className="absolute top-2 right-2 w-3 h-3 bg-[#00E1C1] rounded-full border-2 border-white" />
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Scroll Indicators */}
                    <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-500">
                        <span>← اسحب للتصفح →</span>
                    </div>
                </div>
            </div>

            {/* Programs Section */}
            <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg md:text-xl font-bold text-[#0D1137]">برامج المحتوى</h3>
                    <button
                        onClick={() => setShowAddProgram(true)}
                        className="flex items-center gap-1.5 md:gap-2 bg-[#0D1137] text-white px-3 md:px-5 py-1.5 md:py-2.5 rounded-full font-bold hover:bg-[#1a237e] transition-all hover:scale-105 active:scale-95 text-xs md:text-sm"
                    >
                        <Plus size={16} />
                        <span>إضافة برنامج</span>
                    </button>
                </div>

                {/* Add Program Modal */}
                {showAddProgram && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl p-5 md:p-8 w-full max-w-lg shadow-2xl">
                            <div className="flex items-center justify-between mb-4 md:mb-6">
                                <h3 className="text-lg md:text-xl font-bold text-[#0D1137]">إضافة برنامج محتوى جديد</h3>
                                <button
                                    onClick={() => setShowAddProgram(false)}
                                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                                >
                                    <XIcon size={18} />
                                </button>
                            </div>

                            <div className="space-y-3 md:space-y-4">
                                <div>
                                    <label className="block text-xs md:text-sm font-bold text-[#0D1137] mb-1.5">
                                        عنوان البرنامج (English)
                                    </label>
                                    <input
                                        type="text"
                                        value={newProgramTitle}
                                        onChange={(e) => setNewProgramTitle(e.target.value)}
                                        className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm"
                                        placeholder="e.g., Q1 2026 Campaign"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-bold text-[#0D1137] mb-1.5">
                                        عنوان البرنامج (عربي)
                                    </label>
                                    <input
                                        type="text"
                                        value={newProgramTitleAr}
                                        onChange={(e) => setNewProgramTitleAr(e.target.value)}
                                        className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm"
                                        placeholder="مثال: حملة الربع الأول 2026"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-bold text-[#0D1137] mb-1.5">
                                        المنصة
                                    </label>
                                    <select
                                        value={newProgramPlatform}
                                        onChange={(e) => setNewProgramPlatform(e.target.value)}
                                        className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm"
                                    >
                                        {platforms.filter(p => p.enabled).map((platform) => (
                                            <option key={platform.id} value={platform.id}>
                                                {platform.nameAr}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-bold text-[#0D1137] mb-1.5">
                                        حالة البرنامج
                                    </label>
                                    <select
                                        value={newProgramStatus}
                                        onChange={(e) => setNewProgramStatus(e.target.value as 'active' | 'completed' | 'draft')}
                                        className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm"
                                    >
                                        <option value="active">نشط</option>
                                        <option value="completed">مكتمل</option>
                                        <option value="draft">مسودة</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-bold text-[#0D1137] mb-1.5">
                                        أهداف البرنامج (English)
                                    </label>
                                    <textarea
                                        value={newProgramObjectives}
                                        onChange={(e) => setNewProgramObjectives(e.target.value)}
                                        className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm resize-none"
                                        rows={3}
                                        placeholder="e.g., Increase brand awareness by 40% | Engage with 50K+ users"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-bold text-[#0D1137] mb-1.5">
                                        أهداف البرنامج (عربي)
                                    </label>
                                    <textarea
                                        value={newProgramObjectivesAr}
                                        onChange={(e) => setNewProgramObjectivesAr(e.target.value)}
                                        className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm resize-none"
                                        rows={3}
                                        placeholder="مثال: زيادة الوعي بالعلامة التجارية بنسبة 40% | التفاعل مع أكثر من 50 ألف مستخدم"
                                    />
                                </div>

                                <div className="bg-[#00E1C1]/10 rounded-lg p-3 md:p-4">
                                    <div className="flex items-center gap-2 text-[#0D1137] font-bold mb-1.5 text-xs md:text-sm">
                                        <Check size={14} />
                                        <span>100 منشور سيتم إنشاؤهم تلقائياً</span>
                                    </div>
                                    <p className="text-xs text-slate-600">
                                        سيتم إنشاء 100 منشور متنوع (صور، فيديو، نصوص، كاروسيل)
                                    </p>
                                </div>

                                <div className="flex gap-2 md:gap-3 pt-2">
                                    <button
                                        onClick={() => setShowAddProgram(false)}
                                        className="flex-1 px-4 py-2 md:py-2.5 border border-slate-200 rounded-lg font-bold text-slate-600 hover:bg-slate-50 transition-colors text-sm"
                                    >
                                        إلغاء
                                    </button>
                                    <button
                                        onClick={addProgram}
                                        className="flex-1 px-4 py-2 md:py-2.5 bg-[#0D1137] text-white rounded-lg font-bold hover:bg-[#1a237e] transition-colors text-sm"
                                    >
                                        إنشاء البرنامج
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Program Modal */}
                {showEditProgram && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl p-5 md:p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-4 md:mb-6">
                                <h3 className="text-lg md:text-xl font-bold text-[#0D1137]">تعديل البرنامج</h3>
                                <button
                                    onClick={() => setShowEditProgram(false)}
                                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                                >
                                    <XIcon size={18} />
                                </button>
                            </div>

                            <div className="space-y-3 md:space-y-4">
                                <div>
                                    <label className="block text-xs md:text-sm font-bold text-[#0D1137] mb-1.5">
                                        عنوان البرنامج (English)
                                    </label>
                                    <input
                                        type="text"
                                        value={newProgramTitle}
                                        onChange={(e) => setNewProgramTitle(e.target.value)}
                                        className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm"
                                        placeholder="e.g., Q1 2026 Campaign"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-bold text-[#0D1137] mb-1.5">
                                        عنوان البرنامج (عربي)
                                    </label>
                                    <input
                                        type="text"
                                        value={newProgramTitleAr}
                                        onChange={(e) => setNewProgramTitleAr(e.target.value)}
                                        className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm"
                                        placeholder="مثال: حملة الربع الأول 2026"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-bold text-[#0D1137] mb-1.5">
                                        المنصة
                                    </label>
                                    <select
                                        value={newProgramPlatform}
                                        onChange={(e) => setNewProgramPlatform(e.target.value)}
                                        className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm"
                                    >
                                        {platforms.filter(p => p.enabled).map((platform) => (
                                            <option key={platform.id} value={platform.id}>
                                                {platform.nameAr}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-bold text-[#0D1137] mb-1.5">
                                        حالة البرنامج
                                    </label>
                                    <select
                                        value={newProgramStatus}
                                        onChange={(e) => setNewProgramStatus(e.target.value as 'active' | 'completed' | 'draft')}
                                        className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm"
                                    >
                                        <option value="active">نشط</option>
                                        <option value="completed">مكتمل</option>
                                        <option value="draft">مسودة</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-bold text-[#0D1137] mb-1.5">
                                        أهداف البرنامج (English)
                                    </label>
                                    <textarea
                                        value={newProgramObjectives}
                                        onChange={(e) => setNewProgramObjectives(e.target.value)}
                                        className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm resize-none"
                                        rows={3}
                                        placeholder="e.g., Increase brand awareness by 40% | Engage with 50K+ users"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-bold text-[#0D1137] mb-1.5">
                                        أهداف البرنامج (عربي)
                                    </label>
                                    <textarea
                                        value={newProgramObjectivesAr}
                                        onChange={(e) => setNewProgramObjectivesAr(e.target.value)}
                                        className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm resize-none"
                                        rows={3}
                                        placeholder="مثال: زيادة الوعي بالعلامة التجارية بنسبة 40% | التفاعل مع أكثر من 50 ألف مستخدم"
                                    />
                                </div>

                                <div className="bg-[#10B981]/10 rounded-lg p-3 md:p-4">
                                    <div className="flex items-start gap-2 text-[#0D1137] font-bold mb-1.5 text-xs md:text-sm">
                                        <Check size={14} className="shrink-0 mt-0.5" />
                                        <div>
                                            <div>أهداف واضحة لفريق التواصل الاجتماعي</div>
                                            <p className="text-xs text-slate-600 mt-1">
                                                تساعد الأهداف الواضحة الفريق على فهم الغرض من البرنامج وتنفيذ استراتيجية محتوى فعالة
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 md:gap-3 pt-2">
                                    <button
                                        onClick={() => setShowEditProgram(false)}
                                        className="flex-1 px-4 py-2 md:py-2.5 border border-slate-200 rounded-lg font-bold text-slate-600 hover:bg-slate-50 transition-colors text-sm"
                                    >
                                        إلغاء
                                    </button>
                                    <button
                                        onClick={updateProgram}
                                        className="flex-1 px-4 py-2 md:py-2.5 bg-[#0D1137] text-white rounded-lg font-bold hover:bg-[#1a237e] transition-colors text-sm"
                                    >
                                        حفظ التعديلات
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Programs List */}
                <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 md:gap-6">
                    {programs.map((program) => (
                        <div
                            key={program.id}
                            className="bg-white rounded-lg md:rounded-xl border border-slate-200 overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Program Header */}
                            <div className="p-3 md:p-4">
                                <div className="flex items-start justify-between gap-2 md:gap-4">
                                    <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                                        <div className={`${getPlatformColor(program.platform)} w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-white shrink-0`}>
                                            {platforms.find(p => p.id === program.platform)?.icon}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="font-bold text-[#0D1137] text-sm md:text-base truncate">
                                                {program.titleAr}
                                            </h4>
                                            <p className="text-[10px] md:text-xs text-slate-500 truncate">{program.title}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 md:gap-2 shrink-0">
                                        <span className={`px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold ${program.status === 'active' ? 'bg-green-100 text-green-700' :
                                                program.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-slate-100 text-slate-600'
                                            }`}>
                                            {program.status === 'active' ? 'نشط' :
                                                program.status === 'completed' ? 'مكتمل' : 'مسودة'}
                                        </span>
                                        <button
                                            onClick={() => openEditModal(program)}
                                            className="p-1.5 hover:bg-blue-50 text-blue-600 rounded transition-colors"
                                            title="تعديل البرنامج"
                                        >
                                            <Settings size={16} />
                                        </button>
                                        <button
                                            onClick={() => setExpandedProgram(expandedProgram === program.id ? null : program.id)}
                                            className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                                        >
                                            {expandedProgram === program.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </button>
                                        <button
                                            onClick={() => deleteProgram(program.id)}
                                            className="p-1.5 hover:bg-red-50 text-red-500 rounded transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mt-auto pt-3 border-t border-slate-100">
                                    <div>
                                        <div className="text-[10px] md:text-xs text-slate-500">المنصة</div>
                                        <div className="font-bold text-[#0D1137] text-xs md:text-sm">{getPlatformName(program.platform)}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] md:text-xs text-slate-500">المنشورات</div>
                                        <div className="font-bold text-[#0D1137] text-xs md:text-sm">{program.postsCount} منشور</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] md:text-xs text-slate-500">البداية</div>
                                        <div className="font-bold text-[#0D1137] text-xs md:text-sm">{program.startDate}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] md:text-xs text-slate-500">النهاية</div>
                                        <div className="font-bold text-[#0D1137] text-xs md:text-sm">{program.endDate}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Posts List */}
                            {expandedProgram === program.id && (
                                <div className="border-t border-slate-200 bg-slate-50 p-3 md:p-4">
                                    {/* Objectives Section */}
                                    <div className="mb-4 space-y-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Check className="text-[#10B981]" size={18} />
                                            <h5 className="font-bold text-[#0D1137] text-sm md:text-base">أهداف البرنامج</h5>
                                        </div>
                                        {program.objectivesAr && (
                                            <div className="bg-white rounded-lg p-3 border border-slate-200">
                                                <div className="text-xs text-slate-500 mb-1 font-bold">الأهداف (عربي):</div>
                                                <p className="text-sm text-[#0D1137] leading-relaxed">{program.objectivesAr}</p>
                                            </div>
                                        )}
                                        {program.objectives && (
                                            <div className="bg-white rounded-lg p-3 border border-slate-200">
                                                <div className="text-xs text-slate-500 mb-1 font-bold">Objectives (English):</div>
                                                <p className="text-sm text-[#0D1137] leading-relaxed">{program.objectives}</p>
                                            </div>
                                        )}
                                        <div className="bg-[#10B981]/10 rounded-lg p-3">
                                            <p className="text-xs text-slate-600">
                                                💡 هذه الأهداف تساعد فريق التواصل الاجتماعي على فهم الغرض من البرنامج وتنفيذ استراتيجية محتوى فعالة
                                            </p>
                                        </div>
                                    </div>

                                    {/* Posts Section */}
                                    <div className="flex items-center justify-between mb-3">
                                        <h5 className="font-bold text-[#0D1137] text-xs md:text-sm">المنشورات ({program.posts.length})</h5>
                                        <div className="flex gap-1">
                                            <span className="text-[9px] md:text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded">
                                                {program.posts.filter(p => p.status === 'published').length}
                                            </span>
                                            <span className="text-[9px] md:text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">
                                                {program.posts.filter(p => p.status === 'scheduled').length}
                                            </span>
                                            <span className="text-[9px] md:text-xs px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded">
                                                {program.posts.filter(p => p.status === 'draft').length}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="max-h-80 overflow-y-auto space-y-1.5">
                                        {program.posts.slice(0, 15).map((post) => (
                                            <div
                                                key={post.id}
                                                className="bg-white rounded p-2 border border-slate-200"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className={`w-1.5 h-1.5 rounded-full ${post.type === 'image' ? 'bg-blue-500' :
                                                                post.type === 'video' ? 'bg-red-500' :
                                                                    post.type === 'carousel' ? 'bg-purple-500' :
                                                                        'bg-slate-500'
                                                            }`} />
                                                        <span className="text-[9px] md:text-xs text-slate-600">
                                                            {post.type === 'image' ? 'صورة' :
                                                                post.type === 'video' ? 'فيديو' :
                                                                    post.type === 'carousel' ? 'كاروسيل' : 'نص'}
                                                        </span>
                                                    </div>
                                                    <span className="text-[9px] md:text-xs text-slate-500">{post.scheduledDate}</span>
                                                </div>
                                                <p className="text-[10px] md:text-xs text-slate-700 mt-1 line-clamp-2">{post.contentAr}</p>
                                                <div className="mt-1">
                                                    <span className={`text-[9px] md:text-xs px-1.5 py-0.5 rounded ${post.status === 'published' ? 'bg-green-100 text-green-700' :
                                                            post.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                                                                'bg-slate-100 text-slate-600'
                                                        }`}>
                                                        {post.status === 'published' ? 'منشور' :
                                                            post.status === 'scheduled' ? 'مجدول' : 'مسودة'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                        {program.posts.length > 15 && (
                                            <div className="text-center text-xs text-slate-500 py-2">
                                                ... و{program.posts.length - 15} منشورات أخرى
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Summary Stats - Compact */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
                <div className="bg-gradient-to-br from-[#0D1137] to-[#1a237e] rounded-lg md:rounded-xl p-3 md:p-4 text-white">
                    <div className="text-2xl md:text-3xl font-bold mb-0.5">{programs.length}</div>
                    <div className="text-[10px] md:text-xs text-white/70">برنامج محتوى</div>
                </div>
                <div className="bg-gradient-to-br from-[#00E1C1] to-[#10B981] rounded-lg md:rounded-xl p-3 md:p-4 text-white">
                    <div className="text-2xl md:text-3xl font-bold mb-0.5">
                        {programs.reduce((acc, p) => acc + p.postsCount, 0)}
                    </div>
                    <div className="text-[10px] md:text-xs text-white/70">إجمالي المنشورات</div>
                </div>
                <div className="bg-gradient-to-br from-[#F59E0B] to-[#F97316] rounded-lg md:rounded-xl p-3 md:p-4 text-white">
                    <div className="text-2xl md:text-3xl font-bold mb-0.5">
                        {platforms.filter(p => p.enabled).length}
                    </div>
                    <div className="text-[10px] md:text-xs text-white/70">منصات نشطة</div>
                </div>
                <div className="bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-lg md:rounded-xl p-3 md:p-4 text-white">
                    <div className="text-2xl md:text-3xl font-bold mb-0.5">
                        {programs.reduce((acc, p) => acc + p.posts.filter(post => post.status === 'published').length, 0)}
                    </div>
                    <div className="text-[10px] md:text-xs text-white/70">منشور منشور</div>
                </div>
            </div>
        </div>
    );
};
