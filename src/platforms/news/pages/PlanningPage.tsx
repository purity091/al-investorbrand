import React, { useState, useRef, useEffect } from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Calendar, Plus, Trash2, GripVertical, X as XIcon, Check, Clock, Download, Upload, FileJson, Import, Target, Save, Database, Copy, ClipboardCheck, Sparkles, Settings } from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';

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

    useEffect(() => {
        if (programs.length > 0) {
            setLocalPrograms(programs);
        } else {
            setLocalPrograms([
                { id: 1, title: 'Q1 Awareness Campaign', titleAr: 'حملة التوعية للربع الأول', platform: 'twitter', platformName: 'إكس (تويتر)', platformColor: 'bg-[#1DA1F2]', postsCount: 100, quarterId: 1, order: 0, description: 'Comprehensive awareness campaign for Q1 2026', descriptionAr: 'حملة توعية شاملة للربع الأول 2026', objectives: 'Increase brand awareness by 40% | Reach 500K impressions | Drive engagement rate to 5%', objectivesAr: 'زيادة الوعي بالعلامة التجارية بنسبة 40% | الوصول لـ 500 ألف ظهور | رفع معدل التفاعل لـ 5%' },
                { id: 2, title: 'Financial Literacy Series', titleAr: 'سلسلة التثقيف المالي', platform: 'linkedin', platformName: 'لينكد إن', platformColor: 'bg-[#0077B5]', postsCount: 100, quarterId: 1, order: 1, description: 'Educational content series on financial literacy', descriptionAr: 'سلسلة محتوى تعليمي حول التثقيف المالي', objectives: 'Educate 100K professionals | Generate 5K leads | Establish thought leadership', objectivesAr: 'تثقيف 100 ألف محترف | توليد 5 آلاف عميل محتمل | ترسيخ الريادة الفكرية' },
                { id: 3, title: 'Instagram Growth Plan', titleAr: 'خطة نمو إنستغرام', platform: 'instagram', platformName: 'إنستغرام', platformColor: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]', postsCount: 100, quarterId: 2, order: 0, description: 'Visual storytelling and growth strategy for Instagram', descriptionAr: 'استراتيجية السرد البصري والنمو لإنستغرام', objectives: 'Grow followers to 250K | Achieve 8% engagement rate | Increase reach by 60%', objectivesAr: 'زيادة المتابعين لـ 250 ألف | تحقيق معدل تفاعل 8% | زيادة الوصول بنسبة 60%' },
                { id: 4, title: 'YouTube Content Strategy', titleAr: 'استراتيجية محتوى يوتيوب', platform: 'youtube', platformName: 'يوتيوب', platformColor: 'bg-[#FF0000]', postsCount: 100, quarterId: null, order: 0, description: 'Long-form video content strategy for YouTube', descriptionAr: 'استراتيجية محتوى الفيديو الطويل ليوتيوب', objectives: 'Reach 100K subscribers | Achieve 1M total views | Build loyal community', objectivesAr: 'الوصول لـ 100 ألف مشترك | تحقيق مليون مشاهدة إجمالية | بناء مجتمع مخلص' },
                { id: 5, title: 'Telegram Channel Launch', titleAr: 'إطلاق قناة تيليجرام', platform: 'telegram', platformName: 'تيليجرام', platformColor: 'bg-[#0088cc]', postsCount: 100, quarterId: null, order: 0, description: 'Launch and grow Telegram channel for real-time updates', descriptionAr: 'إطلاق وتنمية قناة تيليجرام للتحديثات الفورية', objectives: 'Launch channel | Gain 50K subscribers in 3 months | Daily engagement', objectivesAr: 'إطلاق القناة | كسب 50 ألف مشترك في 3 أشهر | تفاعل يومي' },
            ]);
        }
    }, [programs]);

    const autoSaveToDatabase = async (programsToSave: Program[]) => {
        setSaveStatus('saving');
        try {
            await savePrograms(programsToSave);
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        } catch (err: any) {
            setSaveStatus('error');
            console.error('Save error:', err);
            // Show error to user
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
            // ✅ Get max order and add 1 to prevent duplicates
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
            // ✅ Get max order and add 1 to prevent duplicates
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
        // Ensure clean data structure for export
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
        a.download = `planning-${new Date().toISOString().split('T')[0]}.json`;
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

            // Normalize and validate imported programs
            // Default: quarterId = null (not distributed to quarters)
            const importedPrograms: Program[] = data.programs.map((p: any, index: number) => {
                // Handle both camelCase and snake_case field names
                const platform = platforms.find(pl => pl.id === p.platform) || platforms[0];

                return {
                    // ✅ Generate unique ID to prevent duplicates
                    id: Math.floor(Date.now() + Math.random() * 1000),
                    title: p.title || p.title || '',
                    titleAr: p.titleAr || p.title_ar || '',
                    platform: p.platform || 'twitter',
                    platformName: p.platformName || p.platform_name || platform.nameAr,
                    platformColor: p.platformColor || p.platform_color || platform.color,
                    postsCount: p.postsCount || p.posts_count || 100,
                    quarterId: null, // ✅ Default: not distributed (null)
                    order: localPrograms.filter(prog => prog.quarterId === null).length + index, // Add to end of unassigned
                    description: typeof p.description === 'string' ? p.description : '',
                    descriptionAr: typeof p.descriptionAr === 'string' ? p.descriptionAr : '',
                    objectives: typeof p.objectives === 'string' ? p.objectives : '',
                    objectivesAr: typeof p.objectivesAr === 'string' ? p.objectivesAr : '',
                };
            });

            // Validate required fields
            const invalidPrograms = importedPrograms.filter(p => !p.title || !p.titleAr);
            if (invalidPrograms.length > 0) {
                setImportError(`تحذير: ${invalidPrograms.length} برنامج لا يحتوي على عنوان صحيح. تم تخطيها.`);
            }

            const validPrograms = importedPrograms.filter(p => p.title && p.titleAr);

            // ✅ Merge with existing programs (don't delete old ones)
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

    const loadSampleJSON = () => {
        const sampleData: ImportExportData = {
            programs: [
                { id: 1, title: 'Brand Awareness Q1', titleAr: 'حملة التوعية بالعلامة التجارية', platform: 'twitter', platformName: 'إكس (تويتر)', platformColor: 'bg-[#1DA1F2]', postsCount: 100, quarterId: 1, order: 0 },
                { id: 2, title: 'LinkedIn Thought Leadership', titleAr: 'الريادة الفكرية على لينكد إن', platform: 'linkedin', platformName: 'لينكد إن', platformColor: 'bg-[#0077B5]', postsCount: 100, quarterId: 1, order: 1 },
                { id: 3, title: 'Instagram Visual Story', titleAr: 'القصة البصرية على إنستغرام', platform: 'instagram', platformName: 'إنستغرام', platformColor: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]', postsCount: 100, quarterId: 2, order: 0 },
                { id: 4, title: 'YouTube Tutorial Series', titleAr: 'سلسلة دروس يوتيوب', platform: 'youtube', platformName: 'يوتيوب', platformColor: 'bg-[#FF0000]', postsCount: 50, quarterId: 3, order: 0 },
                { id: 5, title: 'TikTok Viral Campaign', titleAr: 'حملة الفيروسية على تيك توك', platform: 'tiktok', platformName: 'تيك توك', platformColor: 'bg-black', postsCount: 150, quarterId: 4, order: 0 },
            ],
            exportDate: new Date().toISOString(),
            version: '1.0',
        };
        setJsonInput(JSON.stringify(sampleData, null, 2));
    };

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
            // Generate sample posts for each program
            const posts = [];
            const postTypes = ['image', 'video', 'text', 'carousel'];
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
                            <a href="/SUPABASE_SETUP.md" target="_blank" className="text-xs text-amber-800 font-bold hover:underline">
                                عرض دليل الإعداد ←
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Header with Save Status */}
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-[#0D1137]">التخطيط السنوي</h2>
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
                    <div className="text-2xl font-bold text-[#3B82F6]">{stats.totalPosts}</div>
                    <div className="text-xs text-slate-500">منشور</div>
                </div>
            </div>

            {/* Main Planning Container */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-4">
                {/* Header */}
                <div className="bg-[#0D1137] text-white px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Database size={18} />
                        <span className="font-bold text-sm">التخطيط السنوي 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => { setShowBulkInput(true); }}
                            className="flex items-center gap-1.5 bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition-all text-sm font-bold"
                        >
                            <Sparkles size={14} />
                            <span>إدخال جماعي</span>
                        </button>
                        <button
                            onClick={() => { setImportExportMode('export'); setShowImportExport(true); }}
                            className="flex items-center gap-1.5 bg-white/10 text-white px-3 py-1.5 rounded-lg hover:bg-white/20 transition-all text-sm"
                        >
                            <Download size={14} />
                            <span>تصدير</span>
                        </button>
                        <button
                            onClick={() => { setImportExportMode('import'); setShowImportExport(true); }}
                            className="flex items-center gap-1.5 bg-[#00E1C1] text-[#0D1137] px-3 py-1.5 rounded-lg hover:bg-white transition-all text-sm font-bold"
                        >
                            <Upload size={14} />
                            <span>استيراد</span>
                        </button>
                        <button
                            onClick={() => setShowAddProgram(true)}
                            className="flex items-center gap-1.5 bg-[#00E1C1] text-[#0D1137] px-4 py-1.5 rounded-lg font-bold hover:bg-white transition-all text-sm"
                        >
                            <Plus size={14} />
                            <span>إضافة برنامج</span>
                        </button>
                    </div>
                </div>

                {/* Quarters Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 p-4 bg-slate-50 border-t border-slate-200">
                    {quarters.map((quarter) => {
                        const quarterPrograms = getProgramsByQuarter(quarter.id);
                        const isDragOver = dragOverQuarter === quarter.id;

                        return (
                            <div
                                key={quarter.id}
                                onDragOver={(e) => handleDragOver(e, quarter.id)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, quarter.id)}
                                className={`border border-slate-200 rounded-xl transition-all duration-200 min-h-[240px] shadow-sm flex flex-col overflow-hidden ${isDragOver ? `${quarter.bgColor} scale-[1.01] shadow-md ring-2 ring-[#00E1C1]` : 'bg-white'
                                    }`}
                            >
                                {/* Quarter Header */}
                                <div className={`px-3 py-2.5 ${quarter.bgColor} border-b ${quarter.borderColor}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xl font-black ${quarter.color}`}>{quarter.name}</span>
                                            <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded-full font-bold">
                                                {quarterPrograms.length}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-[#0D1137]">{quarter.nameAr}</div>
                                            <div className="text-xs text-slate-500">{quarter.period}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Drop Zone */}
                                <div className="p-2 space-y-2 min-h-[160px]">
                                    {quarterPrograms.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-32 text-slate-400 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
                                            <Target size={24} className="mb-2 opacity-40" />
                                            <span className="text-sm text-center">اسحب البرامج هنا</span>
                                        </div>
                                    ) : (
                                        quarterPrograms.map((program) => (
                                            <div
                                                key={program.id}
                                                onClick={() => openProgramModal(program)}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, program.id)}
                                                className={`bg-white rounded-lg p-2.5 border-2 cursor-pointer active:cursor-grabbing transition-all hover:shadow-md hover:scale-[1.02] ${draggedProgram === program.id ? 'opacity-40 scale-95' : 'opacity-100'
                                                    } border-slate-200`}
                                            >
                                                <div className="flex items-start gap-2">
                                                    <div className="mt-0.5 text-slate-300 shrink-0">
                                                        <GripVertical size={14} />
                                                    </div>
                                                    <div className={`${program.platformColor} w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0`}>
                                                        <Calendar size={14} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-bold text-[#0D1137] text-sm truncate leading-tight">
                                                            {program.titleAr}
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                                                {program.platformName.split(' ')[0]}
                                                            </span>
                                                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded font-bold">
                                                                {program.postsCount} منشور
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); openEditModal(program); }}
                                                        className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors shrink-0"
                                                        title="تعديل البرنامج"
                                                    >
                                                        <Settings size={14} />
                                                    </button>
                                                    <button onClick={(e) => { e.stopPropagation(); deleteProgram(program.id); }} className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors shrink-0">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Unassigned Programs */}
            <div onDragOver={(e) => e.preventDefault()} onDrop={handleDropUnassigned} className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-[#F59E0B]" />
                        <h3 className="text-sm font-bold text-[#0D1137]">البرامج غير الموزعة</h3>
                    </div>
                    <span className="text-xs font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1 rounded-full">
                        {getProgramsByQuarter(null).length}
                    </span>
                </div>

                {getProgramsByQuarter(null).length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3">
                        {getProgramsByQuarter(null).map((program) => (
                            <div
                                key={program.id}
                                onClick={() => openProgramModal(program)}
                                draggable
                                onDragStart={(e) => handleDragStart(e, program.id)}
                                className={`bg-white rounded-lg p-2.5 border-2 cursor-pointer active:cursor-grabbing transition-all hover:shadow-md hover:scale-[1.02] ${draggedProgram === program.id ? 'opacity-40 scale-95' : 'opacity-100'
                                    } border-slate-200`}
                            >
                                <div className="flex items-start gap-2">
                                    <div className="mt-0.5 text-slate-300 shrink-0">
                                        <GripVertical size={14} />
                                    </div>
                                    <div className={`${program.platformColor} w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0`}>
                                        <Calendar size={14} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-[#0D1137] text-sm truncate leading-tight">
                                            {program.titleAr}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded font-bold">
                                                {program.postsCount}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); openEditModal(program); }}
                                        className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors shrink-0"
                                        title="تعديل البرنامج"
                                    >
                                        <Settings size={14} />
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); deleteProgram(program.id); }} className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors shrink-0">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-slate-400">
                        <Check size={20} className="mb-2 opacity-30" />
                        <p className="text-sm">جميع البرامج موزعة</p>
                    </div>
                )}
            </div>

            {/* Import/Export Modal with AI Template */}
            {showImportExport && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-5 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                {importExportMode === 'export' ? <Download size={20} className="text-[#00E1C1]" /> : <Upload size={20} className="text-[#00E1C1]" />}
                                <h3 className="text-lg font-bold text-[#0D1137]">{importExportMode === 'export' ? 'تصدير البرامج' : 'استيراد البرامج'}</h3>
                            </div>
                            <button onClick={() => { setShowImportExport(false); setJsonInput(''); setImportError(''); setImportSuccess(''); }} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <XIcon size={18} />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {/* Mode Tabs */}
                            <div className="flex gap-2 mb-3">
                                <button onClick={() => setImportExportMode('import')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm transition-all ${importExportMode === 'import' ? 'bg-[#00E1C1] text-[#0D1137]' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                    <Upload size={16} /><span>استيراد</span>
                                </button>
                                <button onClick={() => setImportExportMode('export')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm transition-all ${importExportMode === 'export' ? 'bg-[#00E1C1] text-[#0D1137]' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                    <Download size={16} /><span>تصدير</span>
                                </button>
                                <button onClick={generateAITemplate} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm transition-all bg-purple-600 text-white hover:bg-purple-700">
                                    <Sparkles size={16} /><span>نموذج الذكاء الاصطناعي</span>
                                </button>
                            </div>
                            {importExportMode === 'export' ? (
                                <div className="space-y-3">
                                    <div className="bg-[#00E1C1]/10 rounded-lg p-4 text-center">
                                        <FileJson className="text-[#00E1C1] mx-auto mb-2" size={28} />
                                        <p className="text-sm text-[#0D1137] font-bold">تصدير {localPrograms.length} برنامج</p>
                                        <p className="text-xs text-slate-500 mt-1">اختر طريقة التصدير المناسبة</p>
                                    </div>

                                    {/* Export Options */}
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold text-slate-600 mb-2">تصدير البرامج:</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button onClick={copyToClipboard} className="bg-[#0D1137] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#1a237e] transition-all text-sm flex items-center justify-center gap-2">
                                                {copied ? <ClipboardCheck size={16} /> : <Copy size={16} />}
                                                <span>نسخ JSON (برامج)</span>
                                            </button>
                                            <button onClick={exportToJSON} className="bg-[#0D1137] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#1a237e] transition-all text-sm flex items-center justify-center gap-2">
                                                <Download size={16} /><span>تحميل الملف</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-200 pt-3">
                                        <p className="text-xs font-bold text-slate-600 mb-2">تصدير المنشورات التفصيلية:</p>
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                                            <p className="text-xs text-blue-800">
                                                <strong>ملاحظة:</strong> سيتم إنشاء 3 منشورات تجريبية لكل برنامج بالتنسيق المطلوب
                                            </p>
                                        </div>
                                        <button onClick={generatePostsJSON} className="w-full bg-gradient-to-r from-[#00E1C1] to-[#10B981] text-white px-4 py-3 rounded-lg font-bold hover:from-[#00d1b3] hover:to-[#059669] transition-all text-sm flex items-center justify-center gap-2">
                                            <Copy size={16} />
                                            <span>نسخ JSON (منشورات تفصيلية)</span>
                                        </button>
                                    </div>
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
                                    <div className="text-center"><span className="text-xs text-slate-400">أو</span></div>
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-sm font-bold text-[#0D1137]">لصق JSON</label>
                                            <button onClick={loadSampleJSON} className="text-xs text-[#00E1C1] font-bold hover:underline">تحميل نموذج</button>
                                        </div>
                                        <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} className="w-full h-48 px-3 py-2.5 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:border-[#00E1C1]" placeholder='{"programs": [...]}' />
                                    </div>
                                    <button onClick={() => importFromJSON(jsonInput)} disabled={!jsonInput} className="w-full bg-[#00E1C1] text-[#0D1137] px-4 py-3 rounded-lg font-bold hover:bg-[#00d1b3] transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <Import size={16} /><span>استيراد البيانات</span>
                                    </button>
                                    {importError && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">{importError}</div>}
                                    {importSuccess && <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-600">{importSuccess}</div>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Bulk Input Modal */}
            {showBulkInput && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-5 w-full max-w-2xl shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Sparkles className="text-purple-600" size={20} />
                                <h3 className="text-lg font-bold text-[#0D1137]">إدخال جماعي للبرامج</h3>
                            </div>
                            <button onClick={() => setShowBulkInput(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <XIcon size={18} />
                            </button>
                        </div>
                        <div className="space-y-3">
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                                <p className="text-xs text-purple-800 font-bold mb-2">التنسيق المطلوب:</p>
                                <code className="text-xs bg-white px-2 py-1 rounded block mb-2">العربي | English | platform_id | posts_count</code>
                                <p className="text-xs text-purple-700">مثال:</p>
                                <code className="text-xs bg-white px-2 py-1 rounded block">حملة التوعية | Awareness Campaign | twitter | 100</code>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#0D1137] mb-2">أدخل البرامج (كل برنامج في سطر)</label>
                                <textarea
                                    value={bulkTextInput}
                                    onChange={(e) => setBulkTextInput(e.target.value)}
                                    className="w-full h-64 px-3 py-2.5 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:border-purple-500"
                                    placeholder={`حملة التوعية للربع الأول | Q1 Awareness Campaign | twitter | 100\nسلسلة التثقيف المالي | Financial Literacy Series | linkedin | 100\nخطة نمو إنستغرام | Instagram Growth Plan | instagram | 100`}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={() => setShowBulkInput(false)} className="px-4 py-2.5 border border-slate-200 rounded-lg font-bold text-slate-600 hover:bg-slate-50 transition-colors text-sm">إلغاء</button>
                                <button onClick={handleBulkTextImport} className="px-4 py-2.5 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-all text-sm flex items-center justify-center gap-2">
                                    <Plus size={16} /><span>إضافة الكل</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Program Detail Modal */}
            {showProgramModal && selectedProgram && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`${selectedProgram.platformColor} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#0D1137]">تفاصيل البرنامج</h3>
                                    <p className="text-xs text-slate-500">{selectedProgram.platformName}</p>
                                </div>
                            </div>
                            <button onClick={() => setShowProgramModal(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <XIcon size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Program Info */}
                            <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                                <div>
                                    <label className="text-xs text-slate-500 block mb-1">العنوان (عربي)</label>
                                    <p className="text-sm font-bold text-[#0D1137]">{selectedProgram.titleAr}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-500 block mb-1">العنوان (English)</label>
                                    <p className="text-sm font-bold text-[#0D1137]">{selectedProgram.title}</p>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-[#00E1C1]/10 rounded-lg p-3 text-center">
                                    <div className="text-2xl font-bold text-[#00E1C1]">{selectedProgram.postsCount}</div>
                                    <div className="text-xs text-slate-600 mt-1">عدد المنشورات</div>
                                </div>
                                <div className="bg-[#F59E0B]/10 rounded-lg p-3 text-center">
                                    <div className="text-sm font-bold text-[#F59E0B]">{getQuarterName(selectedProgram.quarterId)}</div>
                                    <div className="text-xs text-slate-600 mt-1">الربع السنوي</div>
                                </div>
                            </div>

                            {/* Platform Info */}
                            <div className="bg-white border border-slate-200 rounded-lg p-3">
                                <div className="flex items-center gap-3">
                                    <div className={`${selectedProgram.platformColor} w-10 h-10 rounded-lg flex items-center justify-center text-white`}>
                                        <Calendar size={18} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-[#0D1137]">{selectedProgram.platformName}</div>
                                        <div className="text-xs text-slate-500">المنصة المستخدمة</div>
                                    </div>
                                </div>
                            </div>

                            {/* Sample Posts Preview */}
                            <div>
                                <label className="text-xs text-slate-500 block mb-2">نماذج منشورات مقترحة:</label>
                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-2 h-2 rounded-full bg-[#00E1C1]"></div>
                                                <span className="text-xs font-bold text-slate-600">منشور {i}</span>
                                            </div>
                                            <p className="text-xs text-slate-600 line-clamp-2">
                                                {selectedProgram.titleAr} - محتوى تجريبي للمنشور رقم {i}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t border-slate-200">
                                <button
                                    onClick={() => {
                                        const exportData = {
                                            programs: [selectedProgram],
                                            exportDate: new Date().toISOString(),
                                            version: '1.0',
                                        };
                                        navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 2000);
                                    }}
                                    className="flex-1 bg-[#0D1137] text-white px-4 py-2.5 rounded-lg font-bold hover:bg-[#1a237e] transition-all text-sm flex items-center justify-center gap-2"
                                >
                                    {copied ? <ClipboardCheck size={16} /> : <Copy size={16} />}
                                    <span>نسخ البرنامج</span>
                                </button>
                                <button
                                    onClick={() => {
                                        deleteProgram(selectedProgram.id);
                                        setShowProgramModal(false);
                                    }}
                                    className="px-4 py-2.5 bg-red-50 text-red-600 rounded-lg font-bold hover:bg-red-100 transition-all text-sm flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={16} />
                                    <span>حذف</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Program Modal */}
            {showAddProgram && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-5 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-[#0D1137]">إضافة برنامج جديد</h3>
                            <button onClick={() => setShowAddProgram(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <XIcon size={18} />
                            </button>
                        </div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-bold text-[#0D1137] mb-2">عنوان البرنامج (English)</label>
                                    <input type="text" value={newProgramTitle} onChange={(e) => setNewProgramTitle(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm" placeholder="e.g., Q1 2026 Campaign" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#0D1137] mb-2">عنوان البرنامج (عربي)</label>
                                    <input type="text" value={newProgramTitleAr} onChange={(e) => setNewProgramTitleAr(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm" placeholder="مثال: حملة الربع الأول 2026" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-bold text-[#0D1137] mb-2">المنصة</label>
                                    <select value={newProgramPlatform} onChange={(e) => setNewProgramPlatform(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm">
                                        {platforms.map((platform) => (<option key={platform.id} value={platform.id}>{platform.nameAr}</option>))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#0D1137] mb-2">المنشورات</label>
                                    <select value={newProgramPosts} onChange={(e) => setNewProgramPosts(Number(e.target.value))} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm">
                                        <option value={50}>50</option><option value={100}>100</option><option value={150}>150</option><option value={200}>200</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#0D1137] mb-2">وصف البرنامج (English)</label>
                                <textarea value={newProgramDescription} onChange={(e) => setNewProgramDescription(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm resize-none" rows={2} placeholder="e.g., Comprehensive awareness campaign for Q1 2026" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#0D1137] mb-2">وصف البرنامج (عربي)</label>
                                <textarea value={newProgramDescriptionAr} onChange={(e) => setNewProgramDescriptionAr(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm resize-none" rows={2} placeholder="مثال: حملة توعية شاملة للربع الأول 2026" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#0D1137] mb-2">أهداف البرنامج (English)</label>
                                <textarea value={newProgramObjectives} onChange={(e) => setNewProgramObjectives(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm resize-none" rows={3} placeholder="e.g., Increase brand awareness by 40% | Reach 500K impressions" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#0D1137] mb-2">أهداف البرنامج (عربي)</label>
                                <textarea value={newProgramObjectivesAr} onChange={(e) => setNewProgramObjectivesAr(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm resize-none" rows={3} placeholder="مثال: زيادة الوعي بالعلامة التجارية بنسبة 40% | الوصول لـ 500 ألف ظهور" />
                            </div>
                            <div className="bg-[#10B981]/10 rounded-lg p-3">
                                <p className="text-xs text-slate-600">
                                    💡 تساعد الأهداف والوصف الواضح فريق التواصل الاجتماعي على فهم الغرض من البرنامج وتنفيذ استراتيجية محتوى فعالة
                                </p>
                            </div>
                            <div className="flex gap-3 pt-3">
                                <button onClick={() => setShowAddProgram(false)} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg font-bold text-slate-600 hover:bg-slate-50 transition-colors text-sm">إلغاء</button>
                                <button onClick={addProgram} className="flex-1 px-4 py-2.5 bg-[#0D1137] text-white rounded-lg font-bold hover:bg-[#1a237e] transition-colors text-sm">إضافة</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Program Modal */}
            {showEditProgram && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-5 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-[#0D1137]">تعديل البرنامج</h3>
                            <button onClick={() => setShowEditProgram(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <XIcon size={18} />
                            </button>
                        </div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-bold text-[#0D1137] mb-2">عنوان البرنامج (English)</label>
                                    <input type="text" value={newProgramTitle} onChange={(e) => setNewProgramTitle(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm" placeholder="e.g., Q1 2026 Campaign" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#0D1137] mb-2">عنوان البرنامج (عربي)</label>
                                    <input type="text" value={newProgramTitleAr} onChange={(e) => setNewProgramTitleAr(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm" placeholder="مثال: حملة الربع الأول 2026" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-bold text-[#0D1137] mb-2">المنصة</label>
                                    <select value={newProgramPlatform} onChange={(e) => setNewProgramPlatform(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm">
                                        {platforms.map((platform) => (<option key={platform.id} value={platform.id}>{platform.nameAr}</option>))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#0D1137] mb-2">المنشورات</label>
                                    <select value={newProgramPosts} onChange={(e) => setNewProgramPosts(Number(e.target.value))} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm">
                                        <option value={50}>50</option><option value={100}>100</option><option value={150}>150</option><option value={200}>200</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#0D1137] mb-2">وصف البرنامج (English)</label>
                                <textarea value={newProgramDescription} onChange={(e) => setNewProgramDescription(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm resize-none" rows={2} placeholder="e.g., Comprehensive awareness campaign for Q1 2026" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#0D1137] mb-2">وصف البرنامج (عربي)</label>
                                <textarea value={newProgramDescriptionAr} onChange={(e) => setNewProgramDescriptionAr(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm resize-none" rows={2} placeholder="مثال: حملة توعية شاملة للربع الأول 2026" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#0D1137] mb-2">أهداف البرنامج (English)</label>
                                <textarea value={newProgramObjectives} onChange={(e) => setNewProgramObjectives(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm resize-none" rows={3} placeholder="e.g., Increase brand awareness by 40% | Reach 500K impressions" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#0D1137] mb-2">أهداف البرنامج (عربي)</label>
                                <textarea value={newProgramObjectivesAr} onChange={(e) => setNewProgramObjectivesAr(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00E1C1] text-sm resize-none" rows={3} placeholder="مثال: زيادة الوعي بالعلامة التجارية بنسبة 40% | الوصول لـ 500 ألف ظهور" />
                            </div>
                            <div className="bg-[#10B981]/10 rounded-lg p-3">
                                <p className="text-xs text-slate-600">
                                    💡 تساعد الأهداف والوصف الواضح فريق التواصل الاجتماعي على فهم الغرض من البرنامج وتنفيذ استراتيجية محتوى فعالة
                                </p>
                            </div>
                            <div className="flex gap-3 pt-3">
                                <button onClick={() => setShowEditProgram(false)} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg font-bold text-slate-600 hover:bg-slate-50 transition-colors text-sm">إلغاء</button>
                                <button onClick={updateProgram} className="flex-1 px-4 py-2.5 bg-[#0D1137] text-white rounded-lg font-bold hover:bg-[#1a237e] transition-colors text-sm">حفظ التعديلات</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
