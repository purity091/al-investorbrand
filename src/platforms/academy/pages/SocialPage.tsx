import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Award, Book, CheckSquare } from 'lucide-react';

export const SocialPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="قوالب المحتوى التعليمي | Educational Templates"
                subtitle="تصاميم تدعم الفهم والتركيز والاستيعاب."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Wisdom Card */}
                <div className="space-y-4">
                    <div className="aspect-square bg-[#F8FAFC] rounded-3xl border-2 border-slate-100 p-6 flex flex-col items-center justify-center text-center">
                        <Book className="text-[#0D1137] mb-4" size={32} />
                        <h4 className="font-bold text-lg text-[#0D1137] mb-2">مصطلح في دقيقة</h4>
                        <div className="w-full h-px bg-slate-200 my-4"></div>
                        <p className="text-slate-500 text-sm">شرح مبسط لمفهوم "التضخم" مع مثال واقعي.</p>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-[#0D1137]">بطاقة المعلومات</h4>
                        <p className="text-xs text-slate-500">لشرح المصطلحات والمفاهيم.</p>
                    </div>
                </div>

                {/* Course Promo */}
                <div className="space-y-4">
                    <div className="aspect-square bg-[#0D1137] rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E1C1] rounded-full blur-3xl opacity-20"></div>
                        <span className="bg-[#00E1C1] text-[#0D1137] text-xs font-bold px-3 py-1 rounded-full w-fit">دورة جديدة</span>
                        <div>
                            <h4 className="text-white text-xl font-bold mb-2">التحليل الفني 101</h4>
                            <p className="text-blue-200 text-sm">ابدأ رحلتك في قراءة الشارت.</p>
                        </div>
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-slate-500 border-2 border-[#0D1137]"></div>
                            <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-[#0D1137]"></div>
                            <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-[#0D1137]"></div>
                        </div>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-[#0D1137]">إعلان الدورات</h4>
                        <p className="text-xs text-slate-500">للترويج للمحتوى الجديد.</p>
                    </div>
                </div>

                {/* Achievement Badge */}
                <div className="space-y-4">
                    <div className="aspect-square bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 p-6 flex flex-col items-center justify-center text-center">
                        <Award className="text-[#F59E0B] mb-4 drop-shadow-lg" size={48} />
                        <h4 className="font-bold text-lg text-[#0D1137] mb-1">مبروك التخرج!</h4>
                        <p className="text-slate-500 text-xs">أتم المتدرب: محمد أحمد</p>
                        <p className="font-bold text-sm text-[#00E1C1] mt-2">دورة الاستثمار للمبتدئين</p>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-[#0D1137]">شارة الإنجاز</h4>
                        <p className="text-xs text-slate-500">يشاركها الطلاب عند إتمام الدورات.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
