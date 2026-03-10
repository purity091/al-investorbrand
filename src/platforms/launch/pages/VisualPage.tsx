import React, { useState } from 'react';
import { 
    Palette, 
    Type, 
    Grid3x3, 
    Image as ImageIcon, 
    Shapes,
    Download,
    Copy,
    Check,
    Eye,
    Layers,
    Contrast,
    Ruler,
    Monitor,
    BookOpen,
    Sparkles,
    X,
    Rocket,
    Zap,
    Target,
    TrendingUp,
    Lightbulb,
    ArrowUpRight,
    Box,
    Star,
    Award,
    Clock,
    Users
} from 'lucide-react';

export const VisualPage = () => {
    const [copiedColor, setCopiedColor] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'logo' | 'grid' | 'icons'>('colors');

    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopiedColor(type);
        setTimeout(() => setCopiedColor(null), 2000);
    };

    const ColorSwatch = ({ name, hex, rgb, category }: { name: string; hex: string; rgb: string; category: string }) => (
        <div className="group relative bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300">
            <div 
                className="h-32 w-full relative"
                style={{ backgroundColor: hex }}
            >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={() => copyToClipboard(hex, name)}
                        className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-slate-800 flex items-center gap-2 shadow-lg hover:bg-white transition-colors"
                    >
                        {copiedColor === name ? <Check size={16} /> : <Copy size={16} />}
                        {copiedColor === name ? 'تم النسخ!' : 'نسخ HEX'}
                    </button>
                </div>
            </div>
            <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <h4 className="font-bold text-slate-800">{name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{category}</p>
                    </div>
                    <button
                        onClick={() => copyToClipboard(hex, name)}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        {copiedColor === name ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                    </button>
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-mono text-slate-600">{hex}</p>
                    <p className="text-xs text-slate-400">{rgb}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="animate-in fade-in duration-500 space-y-12">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-3xl p-12 text-white">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-[#3B82F6] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#7C3AED] rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] rounded-2xl flex items-center justify-center shadow-2xl">
                            <Rocket className="text-white" size={32} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold mb-1">الهوية البصرية</h1>
                            <p className="text-white/70">Launch Visual Identity System</p>
                        </div>
                    </div>
                    
                    <p className="text-xl text-white/80 max-w-3xl leading-relaxed">
                        نظام بصري ديناميكي لمنصة مساعد الإطلاق، مصمم ليعكس الطاقة، الابتكار، والسرعة. 
                        هوية مرنة تجمع بين الاحترافية وروح الشباب.
                    </p>

                    <div className="flex gap-4 mt-8">
                        <button className="bg-white text-[#0F172A] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/90 transition-colors">
                            <Download size={20} />
                            تحميل دليل الهوية
                        </button>
                        <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/20 transition-colors border border-white/20">
                            <Eye size={20} />
                            معاينة حية
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {[
                    { id: 'colors', label: 'نظام الألوان', icon: Palette },
                    { id: 'typography', label: 'نظام الخطوط', icon: Type },
                    { id: 'logo', label: 'نظام الشعار', icon: Shapes },
                    { id: 'grid', label: 'الشبكة والتصميم', icon: Grid3x3 },
                    { id: 'icons', label: 'الأيقونات', icon: Layers },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                            activeTab === tab.id
                                ? 'bg-[#0F172A] text-white shadow-lg'
                                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                        }`}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Colors Section */}
            {activeTab === 'colors' && (
                <div className="space-y-12">
                    {/* Primary Colors */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-[#3B82F6] rounded-xl flex items-center justify-center">
                                <Palette className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">الألوان الأساسية</h2>
                                <p className="text-slate-500">Primary Color Palette - أساس الهوية البصرية</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            <ColorSwatch
                                name="أزرق الإطلاق"
                                hex="#3B82F6"
                                rgb="RGB(59, 130, 246)"
                                category="Primary - اللون الأساسي"
                            />
                            <ColorSwatch
                                name="كحلي داكن"
                                hex="#0F172A"
                                rgb="RGB(15, 23, 42)"
                                category="Primary Dark - الخلفيات"
                            />
                            <ColorSwatch
                                name="أبيض نقي"
                                hex="#FFFFFF"
                                rgb="RGB(255, 255, 255)"
                                category="Neutral - النصوص"
                            />
                            <ColorSwatch
                                name="خلفية فاتحة"
                                hex="#F8FAFC"
                                rgb="RGB(248, 250, 252)"
                                category="Background - الخلفيات الفاتحة"
                            />
                        </div>

                        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-2xl p-6 text-white">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <Contrast size={20} />
                                معايير التباين - WCAG 2.1 AAA Compliant
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                    <p className="text-sm text-white/70 mb-2">الأبيض على الكحلي</p>
                                    <p className="text-3xl font-bold">18.5:1</p>
                                    <p className="text-xs text-[#22C55E] mt-2">✓ Pass AAA</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                    <p className="text-sm text-white/70 mb-2">الأزرق على الأبيض</p>
                                    <p className="text-3xl font-bold">8.2:1</p>
                                    <p className="text-xs text-[#22C55E] mt-2">✓ Pass AAA</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                    <p className="text-sm text-white/70 mb-2">النص الرئيسي</p>
                                    <p className="text-3xl font-bold">12.5:1</p>
                                    <p className="text-xs text-[#22C55E] mt-2">✓ Pass AAA</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Accent Colors */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-[#7C3AED] rounded-xl flex items-center justify-center">
                                <Sparkles className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">ألوان التمييز والإبراز</h2>
                                <p className="text-slate-500">Accent Colors - للتميز والإبراز</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <ColorSwatch
                                name="بنفسجي مميز"
                                hex="#7C3AED"
                                rgb="RGB(124, 58, 237)"
                                category="Accent - للتميز"
                            />
                            <ColorSwatch
                                name="برتقالي حيوي"
                                hex="#F97316"
                                rgb="RGB(249, 115, 22)"
                                category="Highlight - للإبراز"
                            />
                            <ColorSwatch
                                name="أخضر النجاح"
                                hex="#22C55E"
                                rgb="RGB(34, 197, 94)"
                                category="Success - للنجاح"
                            />
                            <ColorSwatch
                                name="رمادي داكن"
                                hex="#1E293B"
                                rgb="RGB(30, 41, 59)"
                                category="Secondary Dark - ثانوي"
                            />
                        </div>

                        {/* Usage Examples */}
                        <div className="mt-8 p-6 bg-[#F8FAFC] rounded-xl">
                            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Lightbulb size={20} />
                                أمثلة على استخدام الألوان
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#3B82F6] rounded-lg flex items-center justify-center">
                                            <Rocket className="text-white" size={20} />
                                        </div>
                                        <span className="font-medium text-slate-700">الأزرار الأساسية</span>
                                    </div>
                                    <div className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg font-bold text-sm">
                                        إطلاق
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#7C3AED] rounded-lg flex items-center justify-center">
                                            <Star className="text-white" size={20} />
                                        </div>
                                        <span className="font-medium text-slate-700">العناصر المميزة</span>
                                    </div>
                                    <div className="px-4 py-2 bg-[#7C3AED] text-white rounded-lg font-bold text-sm">
                                        مميز
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#F97316] rounded-lg flex items-center justify-center">
                                            <Zap className="text-white" size={20} />
                                        </div>
                                        <span className="font-medium text-slate-700">التنبيهات والإشعارات</span>
                                    </div>
                                    <div className="px-4 py-2 bg-[#F97316] text-white rounded-lg font-bold text-sm">
                                        جديد
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#22C55E] rounded-lg flex items-center justify-center">
                                            <Check className="text-white" size={20} />
                                        </div>
                                        <span className="font-medium text-slate-700">عمليات ناجحة</span>
                                    </div>
                                    <div className="px-4 py-2 bg-[#22C55E] text-white rounded-lg font-bold text-sm">
                                        تم بنجاح
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Neutral & Text Colors */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-[#6B7280] rounded-xl flex items-center justify-center">
                                <Layers className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">الألوان المحايدة والنصوص</h2>
                                <p className="text-slate-500">Neutral & Text Colors - للنصوص والعناصر</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <ColorSwatch
                                name="رمادي النصوص"
                                hex="#6B7280"
                                rgb="RGB(107, 114, 128)"
                                category="Text - النصوص الثانوية"
                            />
                            <ColorSwatch
                                name="كحلي متوسط"
                                hex="#1E293B"
                                rgb="RGB(30, 41, 59)"
                                category="Dark Slate - العناصر الداكنة"
                            />
                            <ColorSwatch
                                name="أبيض"
                                hex="#FFFFFF"
                                rgb="RGB(255, 255, 255)"
                                category="White - الخلفيات الفاتحة"
                            />
                        </div>
                    </div>

                    {/* Functional Colors */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-[#22C55E] rounded-xl flex items-center justify-center">
                                <Award className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">ألوان الحالات الوظيفية</h2>
                                <p className="text-slate-500">Functional Colors - UI States</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-green-50 border border-green-200">
                                <div className="w-16 h-16 bg-[#22C55E] rounded-xl flex items-center justify-center">
                                    <Check className="text-white" size={32} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">Success</p>
                                    <p className="text-sm font-mono text-slate-600">#22C55E</p>
                                    <p className="text-xs text-slate-500">للعمليات الناجحة</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-orange-50 border border-orange-200">
                                <div className="w-16 h-16 bg-[#F97316] rounded-xl flex items-center justify-center">
                                    <Clock className="text-white" size={32} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">Warning</p>
                                    <p className="text-sm font-mono text-slate-600">#F97316</p>
                                    <p className="text-xs text-slate-500">للتنبيهات</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 border border-blue-200">
                                <div className="w-16 h-16 bg-[#3B82F6] rounded-xl flex items-center justify-center">
                                    <Users className="text-white" size={32} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">Info</p>
                                    <p className="text-sm font-mono text-slate-600">#3B82F6</p>
                                    <p className="text-xs text-slate-500">للمعلومات</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-red-50 border border-red-200">
                                <div className="w-16 h-16 bg-red-500 rounded-xl flex items-center justify-center">
                                    <X className="text-white" size={32} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">Error</p>
                                    <p className="text-sm font-mono text-slate-600">#EF4444</p>
                                    <p className="text-xs text-slate-500">للأخطاء</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Typography Section */}
            {activeTab === 'typography' && (
                <div className="space-y-8">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-[#0F172A] rounded-xl flex items-center justify-center">
                                <Type className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">نظام الخطوط</h2>
                                <p className="text-slate-500">Typography System - IBM Plex Sans Arabic</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                            <div className="space-y-6">
                                <div className="p-6 bg-slate-50 rounded-2xl">
                                    <p className="text-sm text-slate-500 mb-2">العناوين الرئيسية - 36px</p>
                                    <h1 className="text-4xl font-bold text-[#0F172A] leading-tight mb-2" style={{ fontFamily: 'IBM Plex Sans Arabic' }}>
                                        منصة الإطلاق للشركات الناشئة
                                    </h1>
                                    <p className="text-xs text-slate-400">IBM Plex Sans Arabic Black (900) | Line-height: 1.2</p>
                                </div>

                                <div className="p-6 bg-slate-50 rounded-2xl">
                                    <p className="text-sm text-slate-500 mb-2">العناوين الفرعية - 24px</p>
                                    <h2 className="text-2xl font-bold text-[#3B82F6] leading-tight mb-2" style={{ fontFamily: 'IBM Plex Sans Arabic' }}>
                                        أدوات متكاملة للنمو
                                    </h2>
                                    <p className="text-xs text-slate-400">IBM Plex Sans Arabic Bold (700) | Line-height: 1.3</p>
                                </div>

                                <div className="p-6 bg-slate-50 rounded-2xl">
                                    <p className="text-sm text-slate-500 mb-2">العناوين الصغيرة - 18px</p>
                                    <h3 className="text-xl font-semibold text-[#1E293B] leading-tight mb-2" style={{ fontFamily: 'IBM Plex Sans Arabic' }}>
                                        مميزات المنصة
                                    </h3>
                                    <p className="text-xs text-slate-400">IBM Plex Sans Arabic SemiBold (600) | Line-height: 1.4</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 bg-slate-50 rounded-2xl">
                                    <p className="text-sm text-slate-500 mb-2">النص الأساسي - 18px</p>
                                    <p className="text-lg text-[#6B7280] leading-relaxed mb-2" style={{ fontFamily: 'IBM Plex Sans Arabic' }}>
                                        توفر منصة مساعد الإطلاق جميع الأدوات التي تحتاجها الشركات الناشئة للنمو والتوسع. 
                                        من إدارة المشاريع إلى التحليلات المتقدمة، كل ما تحتاجه في مكان واحد.
                                    </p>
                                    <p className="text-xs text-slate-400">IBM Plex Sans Arabic Regular (400) | Line-height: 1.6</p>
                                </div>

                                <div className="p-6 bg-slate-50 rounded-2xl">
                                    <p className="text-sm text-slate-500 mb-2">النص الصغير - 14px</p>
                                    <p className="text-sm text-[#6B7280] leading-relaxed mb-2" style={{ fontFamily: 'IBM Plex Sans Arabic' }}>
                                        آخر تحديث: منذ 5 دقائق | الحالة: نشط
                                    </p>
                                    <p className="text-xs text-slate-400">IBM Plex Sans Arabic Regular (400) | Line-height: 1.5</p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-right">
                                <thead>
                                    <tr className="border-b border-slate-200">
                                        <th className="pb-4 text-sm font-semibold text-slate-600">الاستخدام</th>
                                        <th className="pb-4 text-sm font-semibold text-slate-600">الحجم</th>
                                        <th className="pb-4 text-sm font-semibold text-slate-600">الوزن</th>
                                        <th className="pb-4 text-sm font-semibold text-slate-600">ارتفاع السطر</th>
                                        <th className="pb-4 text-sm font-semibold text-slate-600">مثال</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-slate-100">
                                        <td className="py-4 text-slate-600">العناوين الرئيسية</td>
                                        <td className="py-4 font-mono text-slate-500">36px</td>
                                        <td className="py-4 text-slate-600">Black (900)</td>
                                        <td className="py-4 font-mono text-slate-500">1.2</td>
                                        <td className="py-4"><span className="text-2xl font-black" style={{ fontFamily: 'IBM Plex Sans Arabic' }}>عنوان</span></td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-4 text-slate-600">العناوين الفرعية</td>
                                        <td className="py-4 font-mono text-slate-500">24px</td>
                                        <td className="py-4 text-slate-600">Bold (700)</td>
                                        <td className="py-4 font-mono text-slate-500">1.3</td>
                                        <td className="py-4"><span className="text-xl font-bold" style={{ fontFamily: 'IBM Plex Sans Arabic' }}>عنوان</span></td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-4 text-slate-600">النص الأساسي</td>
                                        <td className="py-4 font-mono text-slate-500">18px</td>
                                        <td className="py-4 text-slate-600">Regular (400)</td>
                                        <td className="py-4 font-mono text-slate-500">1.6</td>
                                        <td className="py-4"><span className="text-base" style={{ fontFamily: 'IBM Plex Sans Arabic' }}>نص</span></td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-4 text-slate-600">النص الصغير</td>
                                        <td className="py-4 font-mono text-slate-500">14px</td>
                                        <td className="py-4 text-slate-600">Regular (400)</td>
                                        <td className="py-4 font-mono text-slate-500">1.5</td>
                                        <td className="py-4"><span className="text-sm" style={{ fontFamily: 'IBM Plex Sans Arabic' }}>نص</span></td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 text-slate-600">الأزرار</td>
                                        <td className="py-4 font-mono text-slate-500">16px</td>
                                        <td className="py-4 text-slate-600">Medium (500)</td>
                                        <td className="py-4 font-mono text-slate-500">1.4</td>
                                        <td className="py-4"><span className="px-3 py-1 bg-[#3B82F6] text-white rounded text-sm font-medium" style={{ fontFamily: 'IBM Plex Sans Arabic' }}>زر</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-3xl p-8 text-white">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <BookOpen size={24} />
                            إرشادات استخدام الخطوط
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-[#22C55E] flex items-center gap-2">
                                    <Check size={20} className="text-[#22C55E]" />
                                    المسموح
                                </h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li className="flex items-start gap-2">
                                        <Check size={16} className="text-[#22C55E] mt-0.5 flex-shrink-0" />
                                        استخدام IBM Plex Sans Arabic فقط
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={16} className="text-[#22C55E] mt-0.5 flex-shrink-0" />
                                        الحفاظ على أحجام الخطوط المحددة
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={16} className="text-[#22C55E] mt-0.5 flex-shrink-0" />
                                        استخدام التباين الصحيح بين العناوين والنصوص
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={16} className="text-[#22C55E] mt-0.5 flex-shrink-0" />
                                        الحفاظ على ارتفاع السطر المحدد
                                    </li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-semibold text-red-400 flex items-center gap-2">
                                    <X size={20} className="text-red-400" />
                                    الممنوع
                                </h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li className="flex items-start gap-2">
                                        <X size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                                        استخدام خطوط أخرى غير المعتمدة
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <X size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                                        تمطيط أو ضغط النصوص
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <X size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                                        استخدام ألوان غير معتمدة للنصوص
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <X size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                                        تقليل حجم النص الأساسي عن 18px
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Logo Section */}
            {activeTab === 'logo' && (
                <div className="space-y-8">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-[#0F172A] rounded-xl flex items-center justify-center">
                                <Shapes className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">نظام الشعار</h2>
                                <p className="text-slate-500">Logo System - التكوين والاستخدام</p>
                            </div>
                        </div>

                        {/* Logo Preview */}
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-12 mb-8">
                            <div className="flex flex-col items-center justify-center">
                                {/* Logo Mark */}
                                <div className="w-32 h-32 bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] rounded-2xl flex items-center justify-center shadow-2xl mb-6">
                                    <Rocket className="text-white" size={64} />
                                </div>
                                
                                {/* Logo Text */}
                                <h1 className="text-5xl font-black text-[#0F172A] mb-2" style={{ fontFamily: 'IBM Plex Sans Arabic' }}>
                                    إطلاق
                                </h1>
                                <p className="text-lg text-[#6B7280] font-medium">Launch</p>
                            </div>
                        </div>

                        {/* Logo Variations */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="p-6 bg-white rounded-xl border-2 border-slate-200">
                                <p className="text-sm text-slate-500 mb-4 text-center">الشعار العمودي</p>
                                <div className="flex flex-col items-center py-8">
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] rounded-xl flex items-center justify-center mb-3">
                                        <Rocket className="text-white" size={32} />
                                    </div>
                                    <p className="text-2xl font-black text-[#0F172A]" style={{ fontFamily: 'IBM Plex Sans Arabic' }}>إطلاق</p>
                                    <p className="text-sm text-[#6B7280]">Launch</p>
                                </div>
                            </div>

                            <div className="p-6 bg-white rounded-xl border-2 border-slate-200">
                                <p className="text-sm text-slate-500 mb-4 text-center">الشعار الأفقي</p>
                                <div className="flex items-center justify-center py-8 gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] rounded-xl flex items-center justify-center">
                                        <Rocket className="text-white" size={24} />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-[#0F172A]" style={{ fontFamily: 'IBM Plex Sans Arabic' }}>إطلاق</p>
                                        <p className="text-sm text-[#6B7280]">Launch</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-white rounded-xl border-2 border-slate-200">
                                <p className="text-sm text-slate-500 mb-4 text-center">الأيقونة (Favicon)</p>
                                <div className="flex items-center justify-center py-8">
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] rounded-xl flex items-center justify-center">
                                        <Rocket className="text-white" size={32} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Clear Space */}
                        <div className="bg-slate-50 rounded-xl p-6 mb-8">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Ruler size={20} />
                                مساحة الأمان (Clear Space)
                            </h3>
                            <div className="flex items-center justify-center py-8">
                                <div className="relative">
                                    <div className="absolute -inset-8 border-2 border-dashed border-[#3B82F6] rounded-3xl"></div>
                                    <div className="w-24 h-24 bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] rounded-2xl flex items-center justify-center">
                                        <Rocket className="text-white" size={48} />
                                    </div>
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-[#3B82F6] font-mono">X</div>
                                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-[#3B82F6] font-mono">X</div>
                                    <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-xs text-[#3B82F6] font-mono">X</div>
                                    <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-xs text-[#3B82F6] font-mono">X</div>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 text-center">
                                ترك مسافة تعادل عرض العمود الصغير (X) من جميع الجهات
                            </p>
                        </div>

                        {/* Minimum Size */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl border border-slate-200 p-6">
                                <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <Monitor size={18} />
                                    الحد الأدنى للحجم - الويب
                                </h4>
                                <div className="flex items-center gap-4">
                                    <div className="w-6 h-6 bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] rounded flex items-center justify-center">
                                        <Rocket className="text-white" size={14} />
                                    </div>
                                    <p className="text-sm text-slate-600">24px (أيقونة)</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-slate-200 p-6">
                                <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <BookOpen size={18} />
                                    الحد الأدنى للحجم - المطبوعات
                                </h4>
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] rounded flex items-center justify-center">
                                        <Rocket className="text-white" size={20} />
                                    </div>
                                    <p className="text-sm text-slate-600">8mm (مطبوعات)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logo Don'ts */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 border border-red-200">
                        <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center gap-2">
                            <X size={24} className="text-red-600" />
                            الممنوعات في استخدام الشعار
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white/50 rounded-xl p-4 text-center">
                                <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center opacity-50">
                                    <Rocket className="text-white" size={32} />
                                </div>
                                <p className="text-sm font-medium text-red-800">التشويه الهندسي</p>
                            </div>
                            <div className="bg-white/50 rounded-xl p-4 text-center">
                                <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] rounded-full flex items-center justify-center transform rotate-45">
                                    <Rocket className="text-white" size={32} />
                                </div>
                                <p className="text-sm font-medium text-red-800">التدوير</p>
                            </div>
                            <div className="bg-white/50 rounded-xl p-4 text-center">
                                <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                                    <Rocket className="text-white" size={32} />
                                </div>
                                <p className="text-sm font-medium text-red-800">الخلفيات المشوشة</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Grid Section */}
            {activeTab === 'grid' && (
                <div className="space-y-8">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-[#0F172A] rounded-xl flex items-center justify-center">
                                <Grid3x3 className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">الشبكة السويسرية</h2>
                                <p className="text-slate-500">Swiss Grid System - التنظيم البصري</p>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-8 mb-8">
                            <p className="text-slate-600 text-center mb-8 leading-relaxed">
                                نعتمد "الشبكة السويسرية" في التصميم. تنظيم صارم للعناصر، مساحات بيضاء مدروسة، 
                                وخطوط فاصلة دقيقة. تصميم مرن يعكس سرعة وحيوية منصة الإطلاق.
                            </p>

                            {/* Grid Visualization */}
                            <div className="bg-white rounded-xl p-6 shadow-inner">
                                <div className="grid grid-cols-12 gap-3">
                                    {/* Header */}
                                    <div className="col-span-12 h-24 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] rounded-lg flex items-center justify-center">
                                        <p className="text-white font-bold">Header / Logo Area</p>
                                    </div>
                                    
                                    {/* Main Content */}
                                    <div className="col-span-8 h-48 bg-blue-100 rounded-lg flex items-center justify-center border-2 border-dashed border-[#3B82F6]">
                                        <p className="text-[#0F172A] font-medium">المحتوى الرئيسي (8 أعمدة)</p>
                                    </div>
                                    <div className="col-span-4 h-48 bg-slate-200 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-400">
                                        <p className="text-slate-600 font-medium">الشريط الجانبي (4 أعمدة)</p>
                                    </div>

                                    {/* Secondary Row */}
                                    <div className="col-span-4 h-32 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                                        <p className="text-slate-500 font-medium text-sm">بطاقة 1</p>
                                    </div>
                                    <div className="col-span-4 h-32 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                                        <p className="text-slate-500 font-medium text-sm">بطاقة 2</p>
                                    </div>
                                    <div className="col-span-4 h-32 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                                        <p className="text-slate-500 font-medium text-sm">بطاقة 3</p>
                                    </div>

                                    {/* Footer */}
                                    <div className="col-span-12 h-16 bg-[#1E293B] rounded-lg flex items-center justify-center">
                                        <p className="text-white/70 text-sm">Footer</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-8">
                                <div className="text-center p-4 bg-white rounded-xl">
                                    <p className="text-3xl font-bold text-[#0F172A]">12</p>
                                    <p className="text-sm text-slate-500 mt-1">عمود أساسي</p>
                                </div>
                                <div className="text-center p-4 bg-white rounded-xl">
                                    <p className="text-3xl font-bold text-[#0F172A]">24px</p>
                                    <p className="text-sm text-slate-500 mt-1">مسافة بين الأعمدة</p>
                                </div>
                                <div className="text-center p-4 bg-white rounded-xl">
                                    <p className="text-3xl font-bold text-[#0F172A]">8px</p>
                                    <p className="text-sm text-slate-500 mt-1">وحدة القياس الأساسية</p>
                                </div>
                            </div>
                        </div>

                        {/* Spacing System */}
                        <div className="mb-8">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Layers size={20} />
                                نظام المسافات (Spacing System)
                            </h3>
                            <div className="space-y-4">
                                {[8, 16, 24, 32, 48, 64].map((size) => (
                                    <div key={size} className="flex items-center gap-4">
                                        <div className="w-20 text-sm font-mono text-slate-500">{size}px</div>
                                        <div className="flex-1 h-8 bg-slate-100 rounded flex items-center px-3">
                                            <div 
                                                className="h-2 bg-[#3B82F6] rounded"
                                                style={{ width: `${Math.min(size * 2, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Layout Examples */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl border border-slate-200 p-6">
                                <h4 className="font-semibold text-slate-800 mb-4">تخطيط لوحة التحكم</h4>
                                <div className="aspect-video bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center">
                                    <p className="text-slate-400 text-sm">مثال تخطيط Dashboard</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200 p-6">
                                <h4 className="font-semibold text-slate-800 mb-4">تخطيط صفحة المشروع</h4>
                                <div className="aspect-video bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center">
                                    <p className="text-slate-400 text-sm">مثال تخطيط صفحة المشروع</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Icons Section */}
            {activeTab === 'icons' && (
                <div className="space-y-8">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-[#0F172A] rounded-xl flex items-center justify-center">
                                <ImageIcon className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">نظام الأيقونات</h2>
                                <p className="text-slate-500">Iconography - Lucide React Icons</p>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6 mb-8">
                            <p className="text-slate-600 text-center leading-relaxed">
                                نستخدم مكتبة <strong className="text-[#0F172A]">Lucide React</strong> للأيقونات. 
                                سمك الخط: <strong className="text-[#0F172A]">1.5px</strong> للأيقونات الدقيقة، 
                                <strong className="text-[#0F172A]"> 2px</strong> للأيقونات الرئيسية.
                            </p>
                        </div>

                        {/* Icon Categories */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:border-[#3B82F6] hover:shadow-md transition-all">
                                <Rocket size={32} className="text-[#3B82F6] mx-auto mb-2" />
                                <p className="text-xs text-slate-500">Rocket</p>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:border-[#3B82F6] hover:shadow-md transition-all">
                                <Zap size={32} className="text-[#3B82F6] mx-auto mb-2" />
                                <p className="text-xs text-slate-500">Zap</p>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:border-[#3B82F6] hover:shadow-md transition-all">
                                <Target size={32} className="text-[#3B82F6] mx-auto mb-2" />
                                <p className="text-xs text-slate-500">Target</p>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:border-[#3B82F6] hover:shadow-md transition-all">
                                <TrendingUp size={32} className="text-[#3B82F6] mx-auto mb-2" />
                                <p className="text-xs text-slate-500">Trend</p>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:border-[#3B82F6] hover:shadow-md transition-all">
                                <Lightbulb size={32} className="text-[#3B82F6] mx-auto mb-2" />
                                <p className="text-xs text-slate-500">Idea</p>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:border-[#3B82F6] hover:shadow-md transition-all">
                                <Box size={32} className="text-[#3B82F6] mx-auto mb-2" />
                                <p className="text-xs text-slate-500">Box</p>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:border-[#3B82F6] hover:shadow-md transition-all">
                                <Star size={32} className="text-[#3B82F6] mx-auto mb-2" />
                                <p className="text-xs text-slate-500">Star</p>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:border-[#3B82F6] hover:shadow-md transition-all">
                                <Award size={32} className="text-[#3B82F6] mx-auto mb-2" />
                                <p className="text-xs text-slate-500">Award</p>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:border-[#3B82F6] hover:shadow-md transition-all">
                                <Clock size={32} className="text-[#3B82F6] mx-auto mb-2" />
                                <p className="text-xs text-slate-500">Time</p>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:border-[#3B82F6] hover:shadow-md transition-all">
                                <Users size={32} className="text-[#3B82F6] mx-auto mb-2" />
                                <p className="text-xs text-slate-500">Users</p>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:border-[#3B82F6] hover:shadow-md transition-all">
                                <ArrowUpRight size={32} className="text-[#3B82F6] mx-auto mb-2" />
                                <p className="text-xs text-slate-500">Growth</p>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:border-[#3B82F6] hover:shadow-md transition-all">
                                <Sparkles size={32} className="text-[#3B82F6] mx-auto mb-2" />
                                <p className="text-xs text-slate-500">Sparkle</p>
                            </div>
                        </div>

                        {/* Icon Sizes */}
                        <div className="mb-8">
                            <h3 className="font-bold text-slate-800 mb-4">أحجام الأيقونات</h3>
                            <div className="flex items-end gap-8 p-6 bg-white rounded-xl border border-slate-200">
                                <div className="text-center">
                                    <Rocket size={16} className="text-[#3B82F6] mx-auto mb-2" />
                                    <p className="text-xs text-slate-500">16px</p>
                                </div>
                                <div className="text-center">
                                    <Rocket size={24} className="text-[#3B82F6] mx-auto mb-2" />
                                    <p className="text-xs text-slate-500">24px</p>
                                </div>
                                <div className="text-center">
                                    <Rocket size={32} className="text-[#3B82F6] mx-auto mb-2" />
                                    <p className="text-xs text-slate-500">32px</p>
                                </div>
                                <div className="text-center">
                                    <Rocket size={48} className="text-[#3B82F6] mx-auto mb-2" />
                                    <p className="text-xs text-slate-500">48px</p>
                                </div>
                                <div className="text-center">
                                    <Rocket size={64} className="text-[#3B82F6] mx-auto mb-2" />
                                    <p className="text-xs text-slate-500">64px</p>
                                </div>
                            </div>
                        </div>

                        {/* Icon Usage */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-green-50 rounded-xl border border-green-200 p-6">
                                <h4 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                                    <Check size={18} className="text-green-600" />
                                    الاستخدام الصحيح
                                </h4>
                                <ul className="space-y-2 text-sm text-green-700">
                                    <li className="flex items-start gap-2">
                                        <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                        استخدام أيقونات Lucide فقط
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                        الحفاظ على سمك الخط المحدد
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                        استخدام الألوان المعتمدة
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                        الحفاظ على التناسق في الحجم
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-red-50 rounded-xl border border-red-200 p-6">
                                <h4 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                                    <X size={18} className="text-red-600" />
                                    الاستخدام الخاطئ
                                </h4>
                                <ul className="space-y-2 text-sm text-red-700">
                                    <li className="flex items-start gap-2">
                                        <X size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                                        خلط مكتبات أيقونات مختلفة
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <X size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                                        تغيير سمك الخط عشوائياً
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <X size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                                        استخدام ألوان غير معتمدة
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <X size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                                        تغيير حجم الأيقونة بشكل غير متناسب
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
