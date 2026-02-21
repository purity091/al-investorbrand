import React, { useState, useRef, useEffect } from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Play, Headphones, Mic, Clock, Calendar, Download, Share2, Plus, Trash2, GripVertical, X as XIcon, Check, Database, Save, Upload, FileJson, Copy, ClipboardCheck } from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';

interface PodcastEpisode {
    id: number;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    guest: string;
    guestAr: string;
    duration: string;
    season: number;
    episodeNumber: number;
    status: 'draft' | 'scheduled' | 'published';
    publishDate: string;
    platform: string;
    color: string;
    audioUrl?: string;
    audioFile?: File | null;
}

interface ImportExportData {
    episodes: PodcastEpisode[];
    exportDate: string;
    version: string;
}

export const PodcastPage = () => {
    const { savePrograms, loading, error, isSupabaseConfigured } = useDatabase();
    
    const [episodes, setEpisodes] = useState<PodcastEpisode[]>([
        {
            id: 1,
            title: 'Analyst Corner - Episode 1',
            titleAr: 'زاوية المحلل - الحلقة الأولى',
            description: 'Deep analysis of market trends and investment opportunities',
            descriptionAr: 'تحليل معمق لاتجاهات السوق وفرص الاستثمار في السوق السعودي',
            guest: 'فريق التحليل',
            guestAr: 'فريق التحليل المالي',
            duration: '45:00',
            season: 1,
            episodeNumber: 1,
            status: 'published',
            publishDate: '2026-02-19',
            platform: 'spotify',
            color: 'from-[#0D1137] to-[#1a237e]',
            audioUrl: '',
        },
        {
            id: 2,
            title: 'Q1 Market Analysis',
            titleAr: 'تحليل السوق للربع الأول',
            description: 'Deep dive into Q1 2026 market performance',
            descriptionAr: 'نظرة معمقة على أداء السوق في الربع الأول 2026',
            guest: 'Dr. Ahmed Al-Maliki',
            guestAr: 'د. أحمد المالكي',
            duration: '45:30',
            season: 1,
            episodeNumber: 2,
            status: 'published',
            publishDate: '2026-01-15',
            platform: 'spotify',
            color: 'from-[#006C35] to-[#10B981]',
        },
        {
            id: 3,
            title: 'FinTech Future',
            titleAr: 'مستقبل التقنية المالية',
            description: 'Discussion with fintech entrepreneurs',
            descriptionAr: 'حوار مع رواد أعمال في قطاع الفنتك',
            guest: 'Sarah Al-Otaibi',
            guestAr: 'سارة العتيبي',
            duration: '38:15',
            season: 1,
            episodeNumber: 3,
            status: 'scheduled',
            publishDate: '2026-02-25',
            platform: 'apple',
            color: 'from-[#CBB588] to-[#F59E0B]',
        },
    ]);

    const [showAddEpisode, setShowAddEpisode] = useState(false);
    const [showImportExport, setShowImportExport] = useState(false);
    const [importExportMode, setImportExportMode] = useState<'import' | 'export'>('export');
    const [jsonInput, setJsonInput] = useState('');
    const [importError, setImportError] = useState('');
    const [importSuccess, setImportSuccess] = useState('');
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const [copied, setCopied] = useState(false);
    const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null);
    const [showEpisodeModal, setShowEpisodeModal] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [newEpisode, setNewEpisode] = useState({
        title: '',
        titleAr: '',
        description: '',
        descriptionAr: '',
        guest: '',
        guestAr: '',
        duration: '30:00',
        season: 1,
        episodeNumber: episodes.length + 1,
        status: 'draft' as 'draft' | 'scheduled' | 'published',
        publishDate: new Date().toISOString().split('T')[0],
        platform: 'spotify',
        audioFile: null as File | null,
        audioUrl: '',
    });

    const autoSaveToDatabase = async (episodesToSave: PodcastEpisode[]) => {
        setSaveStatus('saving');
        try {
            // Convert episodes to programs format for database
            const programs = episodesToSave.map((ep, index) => ({
                id: ep.id,
                title: ep.title,
                titleAr: ep.titleAr,
                platform: 'podcast',
                platformName: 'بودكاست',
                platformColor: 'bg-[#0D1137]',
                postsCount: 1,
                quarterId: Math.ceil((index + 1) / 3), // Distribute across quarters
                order: index,
            }));
            await savePrograms(programs);
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        } catch (err) {
            setSaveStatus('error');
        }
    };

    const addEpisode = () => {
        if (!newEpisode.title || !newEpisode.titleAr) return;

        const colors = [
            'from-[#0D1137] to-[#1a237e]',
            'from-[#006C35] to-[#10B981]',
            'from-[#CBB588] to-[#F59E0B]',
            'from-[#0077B5] to-[#3B82F6]',
        ];

        let audioUrl = newEpisode.audioUrl;
        
        // If audio file is selected, create object URL
        if (newEpisode.audioFile) {
            audioUrl = URL.createObjectURL(newEpisode.audioFile);
        }

        const episode: PodcastEpisode = {
            id: Date.now(),
            title: newEpisode.title,
            titleAr: newEpisode.titleAr,
            description: newEpisode.description,
            descriptionAr: newEpisode.descriptionAr,
            guest: newEpisode.guest,
            guestAr: newEpisode.guestAr,
            duration: newEpisode.duration,
            season: newEpisode.season,
            episodeNumber: newEpisode.episodeNumber,
            status: newEpisode.status,
            publishDate: newEpisode.publishDate,
            platform: newEpisode.platform,
            color: colors[episodes.length % colors.length],
            audioUrl: audioUrl,
        };

        const updated = [...episodes, episode];
        setEpisodes(updated);
        autoSaveToDatabase(updated);

        setNewEpisode({
            title: '',
            titleAr: '',
            description: '',
            descriptionAr: '',
            guest: '',
            guestAr: '',
            duration: '30:00',
            season: 1,
            episodeNumber: updated.length + 1,
            status: 'draft',
            publishDate: new Date().toISOString().split('T')[0],
            platform: 'spotify',
            audioFile: null,
            audioUrl: '',
        });
        setShowAddEpisode(false);
    };

    const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check if it's an audio file
            if (!file.type.startsWith('audio/')) {
                alert('الرجاء اختيار ملف صوتي صالح');
                return;
            }
            
            // Get duration from audio file
            const audio = new Audio(URL.createObjectURL(file));
            audio.addEventListener('loadedmetadata', () => {
                const minutes = Math.floor(audio.duration / 60);
                const seconds = Math.floor(audio.duration % 60);
                const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                setNewEpisode({ 
                    ...newEpisode, 
                    audioFile: file,
                    audioUrl: URL.createObjectURL(file),
                    duration: duration 
                });
            });
        }
    };

    const deleteEpisode = (id: number) => {
        const updated = episodes.filter(e => e.id !== id);
        setEpisodes(updated);
        autoSaveToDatabase(updated);
        if (selectedEpisode?.id === id) {
            setShowEpisodeModal(false);
            setSelectedEpisode(null);
        }
    };

    const openEpisodeModal = (episode: PodcastEpisode) => {
        setSelectedEpisode(episode);
        setShowEpisodeModal(true);
    };

    const exportToJSON = () => {
        const exportData: ImportExportData = {
            episodes: episodes,
            exportDate: new Date().toISOString(),
            version: '1.0',
        };
        const jsonString = JSON.stringify(exportData, null, 2);
        
        navigator.clipboard.writeText(jsonString).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });

        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `podcast-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const importFromJSON = (jsonString: string) => {
        try {
            setImportError('');
            setImportSuccess('');
            
            const data: ImportExportData = JSON.parse(jsonString);
            
            if (!data.episodes || !Array.isArray(data.episodes)) {
                setImportError('الملف غير صالح: يجب أن يحتوي على حلقات');
                return;
            }

            setEpisodes(data.episodes as PodcastEpisode[]);
            autoSaveToDatabase(data.episodes as PodcastEpisode[]);
            
            setImportSuccess(`تم استيراد ${data.episodes.length} حلقة بنجاح!`);
            setTimeout(() => {
                setImportSuccess('');
                setShowImportExport(false);
                setJsonInput('');
            }, 2000);
        } catch (error) {
            setImportError('خطأ في قراءة ملف JSON. تأكد من صحة التنسيق.');
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            setJsonInput(content);
            importFromJSON(content);
        };
        reader.readAsText(file);
    };

    const stats = {
        total: episodes.length,
        published: episodes.filter(e => e.status === 'published').length,
        scheduled: episodes.filter(e => e.status === 'scheduled').length,
        draft: episodes.filter(e => e.status === 'draft').length,
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Headphones className="w-12 h-12 text-[#00E1C1] mx-auto mb-4 animate-pulse" />
                    <p className="text-slate-500">جاري تحميل الحلقات...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500 space-y-6">
            <SectionHeader
                title="بودكاست المستثمر"
                subtitle="أدر حلقات البودكاست الخاصة بك وخطط للمحتوى الصوتي."
            />

            {/* Supabase Warning */}
            {!isSupabaseConfigured && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <Database className="text-amber-600 shrink-0 mt-0.5" size={20} />
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-amber-800 mb-1">قاعدة البيانات غير مهيأة</h4>
                            <p className="text-xs text-amber-700">
                                لم يتم تكوين Supabase. سيتم حفظ البيانات محلياً فقط.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats & Actions Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-xl p-4 border border-slate-200">
                <div className="grid grid-cols-4 gap-2 md:gap-4 flex-1">
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-[#0D1137]">{stats.total}</div>
                        <div className="text-xs text-slate-500">إجمالي</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-[#10B981]">{stats.published}</div>
                        <div className="text-xs text-slate-500">منشور</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-[#F59E0B]">{stats.scheduled}</div>
                        <div className="text-xs text-slate-500">مجدول</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-slate-600">{stats.draft}</div>
                        <div className="text-xs text-slate-500">مسودة</div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {saveStatus === 'saved' && (
                        <span className="text-xs text-[#10B981] flex items-center gap-1">
                            <Check size={14} /> تم الحفظ
                        </span>
                    )}
                    <button
                        onClick={() => { setImportExportMode('export'); setShowImportExport(true); }}
                        className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-200 transition-all text-sm font-bold"
                    >
                        <Download size={14} />
                        <span className="hidden md:inline">تصدير</span>
                    </button>
                    <button
                        onClick={() => { setImportExportMode('import'); setShowImportExport(true); }}
                        className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-200 transition-all text-sm font-bold"
                    >
                        <Upload size={14} />
                        <span className="hidden md:inline">استيراد</span>
                    </button>
                    <button
                        onClick={() => setShowAddEpisode(true)}
                        className="flex items-center gap-1.5 bg-[#0D1137] text-white px-4 py-2 rounded-lg hover:bg-[#1a237e] transition-all text-sm font-bold"
                    >
                        <Plus size={16} />
                        <span>إضافة حلقة</span>
                    </button>
                </div>
            </div>

            {/* Episodes List */}
            <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#0D1137]">قائمة الحلقات</h3>
                
                {episodes.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 border-2 border-dashed border-slate-200 text-center">
                        <Headphones className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 mb-4">لا توجد حلقات بعد</p>
                        <button
                            onClick={() => setShowAddEpisode(true)}
                            className="bg-[#0D1137] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-[#1a237e] transition-all"
                        >
                            إضافة أول حلقة
                        </button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {episodes.map((episode) => (
                            <div
                                key={episode.id}
                                onClick={() => openEpisodeModal(episode)}
                                className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-lg transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Play Button */}
                                    <button className={`w-14 h-14 bg-gradient-to-br ${episode.color} rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shrink-0`}>
                                        <Play size={24} fill="currentColor" />
                                    </button>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold text-[#00E1C1] bg-[#00E1C1]/10 px-2 py-0.5 rounded">
                                                S{episode.season} E{episode.episodeNumber}
                                            </span>
                                            <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                                                episode.status === 'published' ? 'bg-green-100 text-green-700' :
                                                episode.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                                                'bg-slate-100 text-slate-600'
                                            }`}>
                                                {episode.status === 'published' ? 'منشور' :
                                                 episode.status === 'scheduled' ? 'مجدول' : 'مسودة'}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-[#0D1137] text-base md:text-lg truncate">
                                            {episode.titleAr}
                                        </h4>
                                        <p className="text-sm text-slate-500 truncate">{episode.title}</p>
                                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <Mic size={12} />
                                                {episode.guestAr}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} />
                                                {episode.duration}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                {episode.publishDate}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); openEpisodeModal(episode); }}
                                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                        >
                                            <Check size={18} className="text-[#00E1C1]" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); deleteEpisode(episode.id); }}
                                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} className="text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Episode Detail Modal */}
            {showEpisodeModal && selectedEpisode && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-[#0D1137]">تفاصيل الحلقة</h3>
                            <button onClick={() => setShowEpisodeModal(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <XIcon size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Header with Play Button */}
                            <div className={`bg-gradient-to-br ${selectedEpisode.color} rounded-2xl p-6 text-white`}>
                                <div className="flex items-start gap-4">
                                    <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shrink-0">
                                        <Play size={28} fill="currentColor" />
                                    </button>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs bg-white/20 px-2 py-1 rounded">
                                                S{selectedEpisode.season} E{selectedEpisode.episodeNumber}
                                            </span>
                                            <span className="text-xs bg-white/20 px-2 py-1 rounded">
                                                {selectedEpisode.duration}
                                            </span>
                                        </div>
                                        <h4 className="text-xl font-bold mb-1">{selectedEpisode.titleAr}</h4>
                                        <p className="text-sm text-white/80">{selectedEpisode.title}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Audio Player */}
                            {selectedEpisode.audioUrl && (
                                <div className="bg-[#0D1137] rounded-xl p-4">
                                    <audio controls className="w-full" src={selectedEpisode.audioUrl}>
                                        متصفحك لا يدعم تشغيل الصوت
                                    </audio>
                                </div>
                            )}

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <label className="text-xs text-slate-500 block mb-1">الضيف</label>
                                    <p className="text-sm font-bold text-[#0D1137]">{selectedEpisode.guestAr}</p>
                                    <p className="text-xs text-slate-500">{selectedEpisode.guest}</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <label className="text-xs text-slate-500 block mb-1">تاريخ النشر</label>
                                    <p className="text-sm font-bold text-[#0D1137]">{selectedEpisode.publishDate}</p>
                                    <p className="text-xs text-slate-500">
                                        {selectedEpisode.status === 'published' ? 'تم النشر' :
                                         selectedEpisode.status === 'scheduled' ? 'مجدول' : 'غير منشور'}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-slate-50 rounded-lg p-4">
                                <label className="text-xs text-slate-500 block mb-2">الوصف (عربي)</label>
                                <p className="text-sm text-[#0D1137] leading-relaxed">{selectedEpisode.descriptionAr}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t border-slate-200">
                                <button className="flex-1 bg-[#0D1137] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#1a237e] transition-all flex items-center justify-center gap-2">
                                    <Play size={18} />
                                    <span>تشغيل الحلقة</span>
                                </button>
                                <button
                                    onClick={() => {
                                        const data = { episodes: [selectedEpisode] };
                                        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 2000);
                                    }}
                                    className="px-4 py-3 border border-slate-200 rounded-lg font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                                >
                                    {copied ? <ClipboardCheck size={18} /> : <Copy size={18} />}
                                    <span>نسخ</span>
                                </button>
                                <button
                                    onClick={() => {
                                        deleteEpisode(selectedEpisode.id);
                                        setShowEpisodeModal(false);
                                    }}
                                    className="px-4 py-3 bg-red-50 text-red-600 rounded-lg font-bold hover:bg-red-100 transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Episode Modal */}
            {showAddEpisode && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-[#0D1137]">إضافة حلقة جديدة</h3>
                            <button onClick={() => setShowAddEpisode(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <XIcon size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-[#0D1137] mb-2">العنوان (عربي)</label>
                                    <input
                                        type="text"
                                        value={newEpisode.titleAr}
                                        onChange={(e) => setNewEpisode({ ...newEpisode, titleAr: e.target.value })}
                                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm"
                                        placeholder="مثال: تحليل السوق"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#0D1137] mb-2">العنوان (English)</label>
                                    <input
                                        type="text"
                                        value={newEpisode.title}
                                        onChange={(e) => setNewEpisode({ ...newEpisode, title: e.target.value })}
                                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm"
                                        placeholder="e.g., Market Analysis"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-[#0D1137] mb-2">الضيف (عربي)</label>
                                    <input
                                        type="text"
                                        value={newEpisode.guestAr}
                                        onChange={(e) => setNewEpisode({ ...newEpisode, guestAr: e.target.value })}
                                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm"
                                        placeholder="مثال: د. أحمد"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#0D1137] mb-2">الضيف (English)</label>
                                    <input
                                        type="text"
                                        value={newEpisode.guest}
                                        onChange={(e) => setNewEpisode({ ...newEpisode, guest: e.target.value })}
                                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm"
                                        placeholder="e.g., Dr. Ahmed"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-[#0D1137] mb-2">الموسم</label>
                                    <input
                                        type="number"
                                        value={newEpisode.season}
                                        onChange={(e) => setNewEpisode({ ...newEpisode, season: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#0D1137] mb-2">الحلقة</label>
                                    <input
                                        type="number"
                                        value={newEpisode.episodeNumber}
                                        onChange={(e) => setNewEpisode({ ...newEpisode, episodeNumber: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#0D1137] mb-2">المدة</label>
                                    <input
                                        type="text"
                                        value={newEpisode.duration}
                                        onChange={(e) => setNewEpisode({ ...newEpisode, duration: e.target.value })}
                                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm"
                                        placeholder="30:00"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-[#0D1137] mb-2">تاريخ النشر</label>
                                    <input
                                        type="date"
                                        value={newEpisode.publishDate}
                                        onChange={(e) => setNewEpisode({ ...newEpisode, publishDate: e.target.value })}
                                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#0D1137] mb-2">الحالة</label>
                                    <select
                                        value={newEpisode.status}
                                        onChange={(e) => setNewEpisode({ ...newEpisode, status: e.target.value as any })}
                                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm"
                                    >
                                        <option value="draft">مسودة</option>
                                        <option value="scheduled">مجدول</option>
                                        <option value="published">منشور</option>
                                    </select>
                                </div>
                            </div>

                            {/* Audio File Upload */}
                            <div>
                                <label className="block text-xs font-bold text-[#0D1137] mb-2">ملف الصوتي</label>
                                <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                                    <input
                                        type="file"
                                        accept="audio/*"
                                        onChange={handleAudioFileChange}
                                        className="hidden"
                                        id="audio-upload"
                                    />
                                    <label htmlFor="audio-upload" className="cursor-pointer">
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 bg-[#00E1C1]/10 rounded-full flex items-center justify-center mb-2">
                                                <Upload className="text-[#00E1C1]" size={24} />
                                            </div>
                                            {newEpisode.audioFile ? (
                                                <>
                                                    <p className="text-sm font-bold text-[#0D1137]">{newEpisode.audioFile.name}</p>
                                                    <p className="text-xs text-slate-500 mt-1">{newEpisode.duration}</p>
                                                    <p className="text-xs text-[#00E1C1] mt-2">تم اختيار الملف ✓</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-sm text-slate-600">اضغط لرفع ملف صوتي</p>
                                                    <p className="text-xs text-slate-400 mt-1">WAV, MP3, M4A</p>
                                                </>
                                            )}
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#0D1137] mb-2">الوصف (عربي)</label>
                                <textarea
                                    value={newEpisode.descriptionAr}
                                    onChange={(e) => setNewEpisode({ ...newEpisode, descriptionAr: e.target.value })}
                                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm h-20"
                                    placeholder="وصف الحلقة..."
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button onClick={() => setShowAddEpisode(false)} className="flex-1 px-4 py-3 border border-slate-200 rounded-lg font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                                    إلغاء
                                </button>
                                <button onClick={addEpisode} className="flex-1 px-4 py-3 bg-[#0D1137] text-white rounded-lg font-bold hover:bg-[#1a237e] transition-colors">
                                    إضافة الحلقة
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Import/Export Modal */}
            {showImportExport && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-5 w-full max-w-lg shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                {importExportMode === 'export' ? <Download size={20} className="text-[#00E1C1]" /> : <Upload size={20} className="text-[#00E1C1]" />}
                                <h3 className="text-lg font-bold text-[#0D1137]">{importExportMode === 'export' ? 'تصدير الحلقات' : 'استيراد الحلقات'}</h3>
                            </div>
                            <button onClick={() => { setShowImportExport(false); setJsonInput(''); setImportError(''); setImportSuccess(''); }} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <XIcon size={18} />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex gap-2 mb-3">
                                <button onClick={() => setImportExportMode('import')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm transition-all ${importExportMode === 'import' ? 'bg-[#00E1C1] text-[#0D1137]' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                    <Upload size={16} /><span>استيراد</span>
                                </button>
                                <button onClick={() => setImportExportMode('export')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm transition-all ${importExportMode === 'export' ? 'bg-[#00E1C1] text-[#0D1137]' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                    <Download size={16} /><span>تصدير</span>
                                </button>
                            </div>

                            {importExportMode === 'export' ? (
                                <div className="space-y-3">
                                    <div className="bg-[#00E1C1]/10 rounded-lg p-4 text-center">
                                        <FileJson className="text-[#00E1C1] mx-auto mb-2" size={28} />
                                        <p className="text-sm text-[#0D1137] font-bold">تصدير {episodes.length} حلقة</p>
                                    </div>
                                    <button onClick={exportToJSON} className="w-full bg-[#0D1137] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#1a237e] transition-all text-sm flex items-center justify-center gap-2">
                                        <Download size={16} /><span>تصدير وحفظ</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-5 text-center">
                                        <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                                        <Upload className="text-slate-400 mx-auto mb-2" size={28} />
                                        <p className="text-sm text-slate-600 mb-2">ارفع ملف JSON</p>
                                        <button onClick={() => fileInputRef.current?.click()} className="text-sm bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold hover:bg-slate-200 transition-colors">
                                            اختيار ملف
                                        </button>
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-[#0D1137] mb-2 block">لصق JSON</label>
                                        <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} className="w-full h-32 px-3 py-2.5 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:border-[#00E1C1]" placeholder='{"episodes": [...]}' />
                                    </div>
                                    <button onClick={() => importFromJSON(jsonInput)} disabled={!jsonInput} className="w-full bg-[#00E1C1] text-[#0D1137] px-4 py-3 rounded-lg font-bold hover:bg-[#00d1b3] transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <Import size={16} /><span>استيراد</span>
                                    </button>
                                    {importError && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">{importError}</div>}
                                    {importSuccess && <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-600">{importSuccess}</div>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
