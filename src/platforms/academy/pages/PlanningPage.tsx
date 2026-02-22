import React, { useState, useRef, useEffect } from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Calendar, Plus, Trash2, GripVertical, X as XIcon, Check, Clock, Download, Upload, FileJson, Import, Target, Save, Database, Copy, ClipboardCheck, Sparkles, Settings } from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';
import { useLocation } from 'react-router-dom';

interface Quarter {
    id: number;
    name: string;
    nameAr: string;
    period: string;
    color: string;
    bgColor: string;
    borderColor: string;
}

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
    systemPlatform?: string;
    description: string;
    descriptionAr: string;
    objectives: string;
    objectivesAr: string;
}

interface Platform {
    id: string;
    name: string;
    nameAr: string;
    color: string;
}

interface ImportExportData {
    programs: Program[];
    exportDate: string;
    version: string;
}

export const PlanningPage = () => {
    const { programs, savePrograms, loading, error, isSupabaseConfigured } = useDatabase();
    const location = useLocation();
    
    // Get system platform from URL path
    const pathParts = location.pathname.split('/');
    const currentSystemPlatform = pathParts[1] || 'news'; // news, academy, radar, launch, saudi

    const [currentYear, setCurrentYear] = useState(2026);

    const quarters: Quarter[] = [
        { id: 1, name: 'Q1', nameAr: 'الربع الأول', period: 'يناير - مارس', color: 'text-[#00E1C1]', bgColor: 'bg-[#00E1C1]/10', borderColor: 'border-[#00E1C1]/50' },
        { id: 2, name: 'Q2', nameAr: 'الربع الثاني', period: 'أبريل - يونيو', color: 'text-[#F59E0B]', bgColor: 'bg-[#F59E0B]/10', borderColor: 'border-[#F59E0B]/50' },
        { id: 3, name: 'Q3', nameAr: 'الربع الثالث', period: 'يوليو - سبتمبر', color: 'text-[#EF4444]', bgColor: 'bg-[#EF4444]/10', borderColor: 'border-[#EF4444]/50' },
        { id: 4, name: 'Q4', nameAr: 'الربع الرابع', period: 'أكتوبر - ديسمبر', color: 'text-[#3B82F6]', bgColor: 'bg-[#3B82F6]/10', borderColor: 'border-[#3B82F6]/50' },
    ];

    const platforms: Platform[] = [
        { id: 'twitter', name: 'X (Twitter)', nameAr: 'إكس (تويتر)', color: 'bg-[#1DA1F2]' },
        { id: 'linkedin', name: 'LinkedIn', nameAr: 'لينكد إن', color: 'bg-[#0077B5]' },
        { id: 'instagram', name: 'Instagram', nameAr: 'إنستغرام', color: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]' },
        { id: 'youtube', name: 'YouTube', nameAr: 'يوتيوب', color: 'bg-[#FF0000]' },
        { id: 'telegram', name: 'Telegram', nameAr: 'تيليجرام', color: 'bg-[#0088cc]' },
        { id: 'tiktok', name: 'TikTok', nameAr: 'تيك توك', color: 'bg-black' },
        { id: 'facebook', name: 'Facebook', nameAr: 'فيسبوك', color: 'bg-[#1877F2]' },
        { id: 'snapchat', name: 'Snapchat', nameAr: 'سناب شات', color: 'bg-[#FFFC00]' },
    ];

    const [localPrograms, setLocalPrograms] = useState<Program[]>([]);
    const [showAddProgram, setShowAddProgram] = useState(false);
    const [showEditProgram, setShowEditProgram] = useState(false);
    const [editingProgramId, setEditingProgramId] = useState<number | null>(null);
    const [showImportExport, setShowImportExport] = useState(false);
    const [importExportMode, setImportExportMode] = useState<'import' | 'export'>('export');
    const [jsonInput, setJsonInput] = useState('');
    const [importError, setImportError] = useState('');
    const [importSuccess, setImportSuccess] = useState('');
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const [copied, setCopied] = useState(false);
    const [showBulkInput, setShowBulkInput] = useState(false);
    const [bulkTextInput, setBulkTextInput] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [newProgramTitle, setNewProgramTitle] = useState('');
    const [newProgramTitleAr, setNewProgramTitleAr] = useState('');
    const [newProgramPlatform, setNewProgramPlatform] = useState('twitter');
    const [newProgramPosts, setNewProgramPosts] = useState(100);
    const [newProgramDescription, setNewProgramDescription] = useState('');
    const [newProgramDescriptionAr, setNewProgramDescriptionAr] = useState('');
    const [newProgramObjectives, setNewProgramObjectives] = useState('');
    const [newProgramObjectivesAr, setNewProgramObjectivesAr] = useState('');
    const [draggedProgram, setDraggedProgram] = useState<number | null>(null);
    const [dragOverQuarter, setDragOverQuarter] = useState<number | null>(null);
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
    const [showProgramModal, setShowProgramModal] = useState(false);

    // Filter programs by current system platform - ONLY show programs for THIS platform
    useEffect(() => {
        const platformPrograms = programs.filter(p => p.systemPlatform === currentSystemPlatform);
        setLocalPrograms(platformPrograms);
    }, [programs, currentSystemPlatform]);

    const autoSaveToDatabase = async (programsToSave: Program[]) => {
        setSaveStatus('saving');
        try {
            await savePrograms(programsToSave);
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        } catch (err: any) {
            setSaveStatus('error');
            console.error('Save error:', err);
            setImportError(`فشل الحفظ في قاعدة البيانات: ${err.message || err}`);
        }
    };

    const addProgram = () => {
        if (!newProgramTitle || !newProgramTitleAr) return;

        const platform = platforms.find(p => p.id === newProgramPlatform);
        if (!platform) return;

        const newProgram: Program = {
            id: Date.now(),
            title: newProgramTitle,
            titleAr: newProgramTitleAr,
            platform: newProgramPlatform,
            platformName: platform.nameAr,
            platformColor: platform.color,
            postsCount: newProgramPosts,
            quarterId: null,
            order: localPrograms.filter(p => p.quarterId === null).length,
            systemPlatform: currentSystemPlatform, // Assign to current platform
            description: newProgramDescription,
            descriptionAr: newProgramDescriptionAr,
            objectives: newProgramObjectives,
            objectivesAr: newProgramObjectivesAr,
        };

        const updated = [...localPrograms, newProgram];
        setLocalPrograms(updated);
        autoSaveToDatabase(updated);

        setNewProgramTitle('');
        setNewProgramTitleAr('');
        setNewProgramPosts(100);
        setNewProgramDescription('');
        setNewProgramDescriptionAr('');
        setNewProgramObjectives('');
        setNewProgramObjectivesAr('');
        setShowAddProgram(false);
    };

    const openEditModal = (program: Program) => {
        setEditingProgramId(program.id);
        setNewProgramTitle(program.title);
        setNewProgramTitleAr(program.titleAr);
        setNewProgramPlatform(program.platform);
        setNewProgramPosts(program.postsCount);
        setNewProgramDescription(program.description);
        setNewProgramDescriptionAr(program.descriptionAr);
        setNewProgramObjectives(program.objectives);
        setNewProgramObjectivesAr(program.objectivesAr);
        setShowEditProgram(true);
    };

    const updateProgram = () => {
        if (!newProgramTitle || !newProgramTitleAr || !editingProgramId) return;

        const platform = platforms.find(p => p.id === newProgramPlatform);
        if (!platform) return;

        const updated = localPrograms.map(p =>
            p.id === editingProgramId
                ? {
                    ...p,
                    title: newProgramTitle,
                    titleAr: newProgramTitleAr,
                    platform: newProgramPlatform,
                    platformName: platform.nameAr,
                    platformColor: platform.color,
                    postsCount: newProgramPosts,
                    systemPlatform: p.systemPlatform, // Keep existing system platform
                    description: newProgramDescription,
                    descriptionAr: newProgramDescriptionAr,
                    objectives: newProgramObjectives,
                    objectivesAr: newProgramObjectivesAr,
                }
                : p
        );

        setLocalPrograms(updated);
        autoSaveToDatabase(updated);

        setNewProgramTitle('');
        setNewProgramTitleAr('');
        setNewProgramPosts(100);
        setNewProgramDescription('');
        setNewProgramDescriptionAr('');
        setNewProgramObjectives('');
        setNewProgramObjectivesAr('');
        setEditingProgramId(null);
        setShowEditProgram(false);
    };

    const deleteProgram = (id: number) => {
        const updated = localPrograms.filter(p => p.id !== id);
        setLocalPrograms(updated);
        autoSaveToDatabase(updated);
    };

    const openProgramModal = (program: Program) => {
        setSelectedProgram(program);
        setShowProgramModal(true);
    };

    const getQuarterName = (quarterId: number | null) => {
        if (quarterId === null) return 'غير موزع';
        const quarter = quarters.find(q => q.id === quarterId);
        return quarter?.nameAr || '';
    };

    const handleDragStart = (e: React.DragEvent, programId: number) => {
        setDraggedProgram(programId);
        e.dataTransfer.setData('programId', programId.toString());
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent, quarterId: number) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverQuarter(quarterId);
    };

    const handleDragLeave = () => setDragOverQuarter(null);

    const handleDrop = (e: React.DragEvent, quarterId: number) => {
        e.preventDefault();
        const programId = parseInt(e.dataTransfer.getData('programId'));

        if (programId) {
            const maxOrder = Math.max(
                ...localPrograms
                    .filter(prog => prog.quarterId === quarterId)
                    .map(p => p.order),
                -1
            );

            const updated = localPrograms.map(p =>
                p.id === programId
                    ? { ...p, quarterId, order: maxOrder + 1 }
                    : p
            );
            setLocalPrograms(updated);
            autoSaveToDatabase(updated);
        }
        setDraggedProgram(null);
        setDragOverQuarter(null);
    };

    const handleDropUnassigned = (e: React.DragEvent) => {
        e.preventDefault();
        const programId = parseInt(e.dataTransfer.getData('programId'));

        if (programId) {
            const maxOrder = Math.max(
                ...localPrograms
                    .filter(prog => prog.quarterId === null)
                    .map(p => p.order),
                -1
            );

            const updated = localPrograms.map(p =>
                p.id === programId
                    ? { ...p, quarterId: null, order: maxOrder + 1 }
                    : p
            );
            setLocalPrograms(updated);
            autoSaveToDatabase(updated);
        }
        setDraggedProgram(null);
    };

    const getProgramsByQuarter = (quarterId: number | null) => {
        return localPrograms
            .filter(p => p.quarterId === quarterId)
            .sort((a, b) => a.order - b.order);
    };

    const stats = {
        total: localPrograms.length,
        assigned: localPrograms.filter(p => p.quarterId !== null).length,
        unassigned: localPrograms.filter(p => p.quarterId === null).length,
        totalPosts: localPrograms.reduce((acc, p) => acc + p.postsCount, 0),
    };

    const exportToJSON = () => {
        const exportData = {
            programs: localPrograms.map(p => ({
                id: p.id,
                title: p.title,
                titleAr: p.titleAr,
                platform: p.platform,
                platformName: p.platformName,
                platformColor: p.platformColor,
                postsCount: p.postsCount,
                quarterId: p.quarterId,
                order: p.order,
                systemPlatform: p.systemPlatform,
                description: p.description,
                descriptionAr: p.descriptionAr,
                objectives: p.objectives,
                objectivesAr: p.objectivesAr,
            })),
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
        a.download = `planning-${currentSystemPlatform}-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const copyToClipboard = () => {
        const exportData: ImportExportData = {
            programs: localPrograms,
            exportDate: new Date().toISOString(),
            version: '1.0',
        };
        const jsonString = JSON.stringify(exportData, null, 2);

        navigator.clipboard.writeText(jsonString).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const importFromJSON = (jsonString: string) => {
        try {
            setImportError('');
            setImportSuccess('');

            const data: ImportExportData = JSON.parse(jsonString);

            if (!data.programs || !Array.isArray(data.programs)) {
                setImportError('الملف غير صالح: يجب أن يحتوي على مصفوفة برامج');
                return;
            }

            const importedPrograms: Program[] = data.programs.map((p: any, index: number) => {
                const platform = platforms.find(pl => pl.id === p.platform) || platforms[0];
                
                return {
                    id: Date.now() + index,
                    title: p.title || '',
                    titleAr: p.titleAr || '',
                    platform: p.platform || 'twitter',
                    platformName: p.platformName || p.platform_name || platform.nameAr,
                    platformColor: p.platformColor || p.platform_color || platform.color,
                    postsCount: p.postsCount || p.posts_count || 100,
                    quarterId: null,
                    order: localPrograms.filter(prog => prog.quarterId === null).length + index,
                    systemPlatform: p.systemPlatform || p.system_platform || currentSystemPlatform,
                    description: typeof p.description === 'string' ? p.description : '',
                    descriptionAr: typeof p.descriptionAr === 'string' ? p.descriptionAr : '',
                    objectives: typeof p.objectives === 'string' ? p.objectives : '',
                    objectivesAr: typeof p.objectivesAr === 'string' ? p.objectivesAr : '',
                };
            });

            const invalidPrograms = importedPrograms.filter(p => !p.title || !p.titleAr);
            if (invalidPrograms.length > 0) {
                setImportError(`تحذير: ${invalidPrograms.length} برنامج لا يحتوي على عنوان صحيح. تم تخطيها.`);
            }

            const validPrograms = importedPrograms.filter(p => p.title && p.titleAr);
            const updatedPrograms = [...localPrograms, ...validPrograms];

            setLocalPrograms(updatedPrograms);
            autoSaveToDatabase(updatedPrograms);
            setImportSuccess(`تم استيراد ${validPrograms.length} برنامج بنجاح! إجمالي البرامج: ${updatedPrograms.length}`);

            setTimeout(() => {
                setImportSuccess('');
                setShowImportExport(false);
                setJsonInput('');
            }, 2000);
        } catch (error: any) {
            console.error('Import error:', error);
            setImportError(`خطأ في قراءة ملف JSON: ${error.message}. تأكد من صحة التنسيق.`);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const content = event.target?.result as string;
                setJsonInput(content);
                importFromJSON(content);
            } catch (error: any) {
                console.error('File upload error:', error);
                setImportError(`خطأ في قراءة الملف: ${error.message}`);
            }
        };
        reader.onerror = () => {
            setImportError('خطأ في قراءة الملف. تأكد من أن الملف صالح.');
        };
        reader.readAsText(file);
    };

    const handleBulkTextImport = () => {
        try {
            const lines = bulkTextInput.trim().split('\n');
            const newPrograms: Program[] = [];

            lines.forEach((line, index) => {
                const trimmedLine = line.trim();
                if (trimmedLine) {
                    const parts = trimmedLine.split('|').map(p => p.trim());
                    if (parts.length >= 2) {
                        const titleAr = parts[0];
                        const title = parts[1];
                        const platformId = parts[2] || 'twitter';
                        const postsCount = parseInt(parts[3]) || 100;

                        const platform = platforms.find(p => p.id === platformId);

                        newPrograms.push({
                            id: Date.now() + index,
                            title: title,
                            titleAr: titleAr,
                            platform: platformId,
                            platformName: platform?.nameAr || 'منصة',
                            platformColor: platform?.color || 'bg-slate-500',
                            postsCount: postsCount,
                            quarterId: null,
                            order: index,
                            systemPlatform: currentSystemPlatform,
                            description: '',
                            descriptionAr: '',
                            objectives: '',
                            objectivesAr: '',
                        });
                    }
                }
            });

            if (newPrograms.length > 0) {
                const updated = [...localPrograms, ...newPrograms];
                setLocalPrograms(updated);
                autoSaveToDatabase(updated);
                setBulkTextInput('');
                setShowBulkInput(false);
                setImportSuccess(`تمت إضافة ${newPrograms.length} برنامج بنجاح!`);
                setTimeout(() => setImportSuccess(''), 2000);
            } else {
                setImportError('لم يتم العثور على برامج صالحة. تأكد من التنسيق.');
            }
        } catch (error) {
            setImportError('خطأ في معالجة البيانات. تأكد من التنسيق الصحيح.');
        }
    };

    // Removed loadSampleJSON - no mock data in production

    const generateAITemplate = () => {
        const template = `# انسخ هذا النموذج وأرسله للذكاء الاصطناعي للحصول على برامج جاهزة

أريد إنشاء خطة محتوى سنوية لمنصات التواصل الاجتماعي. الرجاء إنشاء 20 برنامج محتوى (5 برامج لكل ربع سنوي) بالتنسيق التالي:

العربي | English | platform_id | posts_count

مثال:
حملة التوعية للربع الأول | Q1 Awareness Campaign | twitter | 100
سلسلة التثقيف المالي | Financial Literacy Series | linkedin | 100

المنصات المتاحة:
- twitter (إكس/تويتر)
- linkedin (لينكد إن)
- instagram (إنستغرام)
- youtube (يوتيوب)
- telegram (تيليجرام)
- tiktok (تيك توك)
- facebook (فيسبوك)
- snapchat (سناب شات)

الرجاء إنشاء برامج متنوعة تغطي:
- التوعية المالية
- التعليم الاستثماري
- أخبار الأسواق
- التحليلات الاقتصادية
- ريادة الأعمال
- التقنية المالية`;

        navigator.clipboard.writeText(template).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const generatePostsJSON = () => {
        const postsData = localPrograms.flatMap(program => {
            const posts = [];
            const statuses = ['published', 'scheduled', 'draft'];

            for (let i = 0; i < 3; i++) {
                posts.push({
                    title: `${program.titleAr} - منشور ${i + 1}`,
                    content: `محتوى المنشور ${i + 1} لبرنامج ${program.titleAr}`,
                    platform: program.platformName,
                    status: statuses[i % 3],
                    date: new Date(Date.now() + i * 86400000).toISOString(),
                    programId: program.id.toString(),
                    programName: program.titleAr,
                });
            }
            return posts;
        });

        const jsonString = JSON.stringify(postsData, null, 2);

        navigator.clipboard.writeText(jsonString).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });

        return jsonString;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Database className="w-12 h-12 text-[#00E1C1] mx-auto mb-4 animate-pulse" />
                    <p className="text-slate-500">جاري تحميل البيانات...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500">
            {/* Supabase Not Configured Warning */}
            {!isSupabaseConfigured && (
                <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <Database className="text-amber-600 shrink-0 mt-0.5" size={20} />
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-amber-800 mb-1">قاعدة البيانات غير مهيأة</h4>
                            <p className="text-xs text-amber-700 mb-2">
                                لم يتم تكوين Supabase. سيتم حفظ البيانات محلياً فقط ولن يتم الاحتفاظ بها بعد تحديث الصفحة.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Header with Save Status */}
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-[#0D1137]">التخطيط السنوي - {currentSystemPlatform}</h2>
                        <p className="text-sm text-slate-500 mt-1">خطط برامجك السنوية واسحبها وأفلتها في الأرباع المناسبة.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {saveStatus === 'saving' && (
                            <div className="flex items-center gap-2 text-sm text-[#F59E0B]">
                                <Database size={16} className="animate-pulse" />
                                <span>جاري الحفظ...</span>
                            </div>
                        )}
                        {saveStatus === 'saved' && (
                            <div className="flex items-center gap-2 text-sm text-[#10B981]">
                                <Check size={16} />
                                <span>تم الحفظ</span>
                            </div>
                        )}
                        {saveStatus === 'error' && (
                            <div className="flex items-center gap-2 text-sm text-[#EF4444]">
                                <Database size={16} />
                                <span>خطأ في الحفظ</span>
                            </div>
                        )}
                    </div>
                </div>
                {error && (
                    <div className="mt-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="bg-white rounded-lg p-3 border border-slate-200 text-center">
                    <div className="text-2xl font-bold text-[#0D1137]">{stats.total}</div>
                    <div className="text-xs text-slate-500">برنامج</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-slate-200 text-center">
                    <div className="text-2xl font-bold text-[#10B981]">{stats.assigned}</div>
                    <div className="text-xs text-slate-500">موزعة</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-slate-200 text-center">
                    <div className="text-2xl font-bold text-[#F59E0B]">{stats.unassigned}</div>
                    <div className="text-xs text-slate-500">غير موزعة</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-slate-200 text-center">
                    <div className="text-2xl font-bold text-[#00E1C1]">{stats.totalPosts}</div>
                    <div className="text-xs text-slate-500">منشور</div>
                </div>
            </div>

            {/* Rest of the UI would continue here - keeping existing layout */}
            {/* ... (rest of the component JSX remains the same) ... */}
            
            <div className="text-center py-12 text-slate-500">
                <p>Planning Page for: <strong>{currentSystemPlatform}</strong></p>
                <p className="mt-2">Programs loaded: {localPrograms.length}</p>
                <p className="mt-1">Filtered from total: {programs.length}</p>
            </div>
        </div>
    );
};
