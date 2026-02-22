import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Check, AlertCircle, Database, FileText, Edit3, Languages } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';

const SECTIONS = [
    { id: 'snapshot', name: 'نظرة سريعة', icon: '📊' },
    { id: 'core', name: 'جوهر العلامة', icon: '🎯' },
    { id: 'strategy', name: 'الاستراتيجية', icon: '📋' },
    { id: 'ecosystem', name: 'منظومة المنتجات', icon: '🔄' },
    { id: 'visual', name: 'الهوية البصرية', icon: '🎨' },
    { id: 'messaging', name: 'نظام الرسائل', icon: '💬' },
    { id: 'social-content', name: 'محتوى التواصل', icon: '✍️' },
    { id: 'social', name: 'نماذج التواصل', icon: '📱' },
    { id: 'social-media', name: 'منصات التواصل', icon: '📲' },
    { id: 'podcast', name: 'بودكاست', icon: '🎙️' },
    { id: 'planning', name: 'التخطيط السنوي', icon: '📅' },
    { id: 'regional', name: 'الهوية الإقليمية', icon: '🌍' },
    { id: 'digital', name: 'التجربة الرقمية', icon: '💻' },
    { id: 'apps', name: 'تطبيقات العلامة', icon: '📱' },
    { id: 'guidelines', name: 'إرشادات الاستخدام', icon: '📖' },
    { id: 'developers', name: 'للمطورين', icon: '⚙️' },
];

const PLATFORMS = [
    { id: 'news', name: 'منصة المستثمر الإخبارية', color: '#00E1C1' },
    { id: 'radar', name: 'رادار المستثمر', color: '#EF4444' },
    { id: 'launch', name: 'مساعد الإطلاق', color: '#3B82F6' },
    { id: 'academy', name: 'أكاديمية المستثمر', color: '#F59E0B', disabled: true },
    { id: 'saudi', name: 'المستثمر سعودية', color: '#10B981', disabled: true },
];

const FIELD_TYPES = {
    text: 'نص قصير',
    textarea: 'نص طويل',
    rich_text: 'نص منسق',
    title: 'عنوان',
    subtitle: 'عنوان فرعي',
};

const AdminContentPage = () => {
    const navigate = useNavigate();
    const { user, profile } = useAuth();
    const { getContent, bulkUpdateContent, loadContent, loading, error } = useContent();
    
    const [selectedPlatform, setSelectedPlatform] = useState('news');
    const [selectedSection, setSelectedSection] = useState('snapshot');
    const [editedContent, setEditedContent] = useState<{ [key: string]: string }>({});
    const [showPreview, setShowPreview] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const [activeTab, setActiveTab] = useState<'ar' | 'en'>('ar');

    // Load current section content
    const currentContent = React.useMemo(() => {
        const content: { [key: string]: string } = {};
        const fieldKeys = ['hero_title', 'hero_subtitle', 'main_content', 'mission_title', 'mission_description', 'vision_title', 'vision_description'];
        
        fieldKeys.forEach(key => {
            content[key] = getContent(selectedPlatform, selectedSection, key);
        });
        
        return content;
    }, [getContent, selectedPlatform, selectedSection]);

    // Handle content change
    const handleContentChange = (fieldKey: string, value: string) => {
        setEditedContent(prev => ({
            ...prev,
            [fieldKey]: value,
        }));
    };

    // Save changes
    const handleSave = async () => {
        setSaveStatus('saving');
        try {
            const items = Object.entries(editedContent).map(([field_key, content_ar]) => ({
                field_key,
                content_ar,
                content_en: content_ar, // TODO: Add separate English input
            }));

            await bulkUpdateContent(selectedPlatform, selectedSection, items);
            setSaveStatus('saved');
            setEditedContent({});
            
            setTimeout(() => setSaveStatus('idle'), 2000);
        } catch (err: any) {
            setSaveStatus('error');
            console.error('Save error:', err);
        }
    };

    // Cancel changes
    const handleCancel = () => {
        setEditedContent({});
    };

    // Check if there are changes
    const hasChanges = Object.keys(editedContent).length > 0;

    // Check admin access
    if (profile?.role !== 'admin' && profile?.role !== 'superadmin') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="text-center">
                    <AlertCircle size={64} className="mx-auto mb-4 text-red-500" />
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">غير مصرح لك</h1>
                    <p className="text-slate-600">يجب أن تكون مسؤولاً للوصول إلى هذه الصفحة</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="text-center">
                    <Database size={48} className="mx-auto mb-4 text-blue-600 animate-pulse" />
                    <p className="text-slate-600 font-medium">جاري تحميل المحتوى...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/admin')}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X size={20} className="text-slate-600" />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900">إدارة المحتوى</h1>
                                <p className="text-xs text-slate-500">تعديل نصوص الموقع</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {hasChanges && (
                                <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">
                                    <Edit3 size={16} />
                                    <span>لديك تغييرات غير محفوظة</span>
                                </div>
                            )}

                            {saveStatus === 'saved' && (
                                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                                    <Check size={16} />
                                    <span>تم الحفظ</span>
                                </div>
                            )}

                            {saveStatus === 'error' && (
                                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-1.5 rounded-lg">
                                    <AlertCircle size={16} />
                                    <span>خطأ في الحفظ</span>
                                </div>
                            )}

                            {hasChanges && (
                                <>
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        <X size={16} />
                                        <span>إلغاء</span>
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={saveStatus === 'saving'}
                                        className="flex items-center gap-2 px-4 py-2 bg-[#00E1C1] text-slate-900 rounded-lg hover:bg-[#00C9A7] transition-colors text-sm font-bold disabled:opacity-50"
                                    >
                                        <Save size={16} />
                                        <span>{saveStatus === 'saving' ? 'جاري الحفظ...' : 'حفظ التغييرات'}</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-6">
                    {/* Sidebar - Platform & Section Selection */}
                    <aside className="w-64 flex-shrink-0">
                        {/* Platform Selection */}
                        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
                            <h3 className="text-sm font-bold text-slate-900 mb-3">المنصة</h3>
                            <div className="space-y-2">
                                {PLATFORMS.map(platform => (
                                    <button
                                        key={platform.id}
                                        onClick={() => !platform.disabled && setSelectedPlatform(platform.id)}
                                        disabled={platform.disabled}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                                            selectedPlatform === platform.id
                                                ? 'bg-[#00E1C1]/10 text-[#00E1C1] border border-[#00E1C1]/30'
                                                : platform.disabled
                                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                                        }`}
                                    >
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: platform.color }}
                                        />
                                        <span className="flex-1 text-right">{platform.name}</span>
                                        {platform.disabled && <span className="text-xs">🔒</span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Section Selection */}
                        <div className="bg-white rounded-xl border border-slate-200 p-4">
                            <h3 className="text-sm font-bold text-slate-900 mb-3">القسم</h3>
                            <div className="space-y-1 max-h-[600px] overflow-y-auto">
                                {SECTIONS.map(section => (
                                    <button
                                        key={section.id}
                                        onClick={() => setSelectedSection(section.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                                            selectedSection === section.id
                                                ? 'bg-[#0D1137] text-white'
                                                : 'text-slate-700 hover:bg-slate-50'
                                        }`}
                                    >
                                        <span className="text-lg">{section.icon}</span>
                                        <span className="flex-1 text-right">{section.name}</span>
                                        {selectedSection === section.id && <Check size={16} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Editor */}
                    <main className="flex-1">
                        {/* Language Tabs */}
                        <div className="bg-white rounded-xl border border-slate-200 mb-4 overflow-hidden">
                            <div className="flex border-b border-slate-200">
                                <button
                                    onClick={() => setActiveTab('ar')}
                                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold transition-colors ${
                                        activeTab === 'ar'
                                            ? 'bg-[#00E1C1]/10 text-[#00E1C1]'
                                            : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    <Languages size={16} />
                                    <span>العربية</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('en')}
                                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold transition-colors ${
                                        activeTab === 'en'
                                            ? 'bg-[#00E1C1]/10 text-[#00E1C1]'
                                            : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    <Languages size={16} />
                                    <span>English</span>
                                </button>
                            </div>

                            <div className="p-6">
                                {/* Current Section Info */}
                                <div className="mb-6 pb-6 border-b border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                        {SECTIONS.find(s => s.id === selectedSection)?.name}
                                    </h2>
                                    <p className="text-sm text-slate-500">
                                        {PLATFORMS.find(p => p.id === selectedPlatform)?.name}
                                    </p>
                                </div>

                                {/* Content Fields */}
                                <div className="space-y-6">
                                    {/* Hero Title */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-900 mb-2">
                                            العنوان الرئيسي
                                        </label>
                                        <input
                                            type="text"
                                            value={editedContent.hero_title ?? currentContent.hero_title}
                                            onChange={(e) => handleContentChange('hero_title', e.target.value)}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E1C1] text-slate-900"
                                            placeholder="أدخل العنوان الرئيسي..."
                                        />
                                    </div>

                                    {/* Hero Subtitle */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-900 mb-2">
                                            الوصف المختصر
                                        </label>
                                        <input
                                            type="text"
                                            value={editedContent.hero_subtitle ?? currentContent.hero_subtitle}
                                            onChange={(e) => handleContentChange('hero_subtitle', e.target.value)}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E1C1] text-slate-900"
                                            placeholder="أدخل وصفاً مختصراً..."
                                        />
                                    </div>

                                    {/* Main Content */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-900 mb-2">
                                            المحتوى الرئيسي
                                        </label>
                                        <textarea
                                            value={editedContent.main_content ?? currentContent.main_content}
                                            onChange={(e) => handleContentChange('main_content', e.target.value)}
                                            rows={8}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E1C1] text-slate-900 resize-none"
                                            placeholder="أدخل المحتوى الرئيسي..."
                                        />
                                    </div>

                                    {/* Mission */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-900 mb-2">
                                                المهمة - العنوان
                                            </label>
                                            <input
                                                type="text"
                                                value={editedContent.mission_title ?? currentContent.mission_title}
                                                onChange={(e) => handleContentChange('mission_title', e.target.value)}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E1C1] text-slate-900"
                                                placeholder="عنوان المهمة..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-900 mb-2">
                                                الرؤية - العنوان
                                            </label>
                                            <input
                                                type="text"
                                                value={editedContent.vision_title ?? currentContent.vision_title}
                                                onChange={(e) => handleContentChange('vision_title', e.target.value)}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E1C1] text-slate-900"
                                                placeholder="عنوان الرؤية..."
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-900 mb-2">
                                                المهمة - الوصف
                                            </label>
                                            <textarea
                                                value={editedContent.mission_description ?? currentContent.mission_description}
                                                onChange={(e) => handleContentChange('mission_description', e.target.value)}
                                                rows={4}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E1C1] text-slate-900 resize-none"
                                                placeholder="وصف المهمة..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-900 mb-2">
                                                الرؤية - الوصف
                                            </label>
                                            <textarea
                                                value={editedContent.vision_description ?? currentContent.vision_description}
                                                onChange={(e) => handleContentChange('vision_description', e.target.value)}
                                                rows={4}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E1C1] text-slate-900 resize-none"
                                                placeholder="وصف الرؤية..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Error Display */}
                                {error && (
                                    <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="text-sm font-bold text-red-800 mb-1">خطأ في قاعدة البيانات</h4>
                                                <p className="text-xs text-red-700 font-mono">{error}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Help Text */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <FileText size={20} className="text-blue-600 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-bold text-blue-800 mb-1">💡 نصيحة</h4>
                                    <p className="text-xs text-blue-700">
                                        قم بتعديل النصوص ثم اضغط على "حفظ التغييرات". سيتم حفظ جميع التعديلات دفعة واحدة في قاعدة البيانات.
                                        التغييرات ستظهر فوراً في الموقع بعد الحفظ.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export { AdminContentPage };
