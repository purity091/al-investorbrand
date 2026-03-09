import React, { useEffect } from 'react';
import './plans/plans.css';

export const EducationHub = () => {
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section");
            const navLi = document.querySelectorAll(".toc-links a");
            let current = "";
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 150) {
                    current = section.getAttribute("id") || "";
                }
            });
            navLi.forEach((li) => {
                li.classList.remove("toc-active");
                if (li.getAttribute("href") === "#" + current) {
                    li.classList.add("toc-active");
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="plan-container" style={{ '--platform-color': '#8b5cf6' } as any}>
            <div className="bg-glow top-right" style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 60%)', opacity: 0.15 }}></div>
            <div className="bg-glow bottom-left" style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 60%)', opacity: 0.15 }}></div>

            <div className="app-layout">
                <aside className="sidebar">
                    <h2 className="brand-title">مركز التعليم</h2>
                    <div className="nav-section">
                        <nav className="toc-links">
                            <a href="#overview">نظرة عامة</a>
                            <a href="#platforms">المنصات الأربعة</a>
                            <a href="#fundamentals">الأساسيات</a>
                            <a href="#algorithms">فهم الخوارزميات</a>
                            <a href="#content">استراتيجية المحتوى</a>
                            <a href="#analytics">التحليلات</a>
                            <a href="#growth">استراتيجيات النمو</a>
                            <a href="#tools">الأدوات</a>
                        </nav>
                    </div>
                </aside>

                <main className="main-content">
                    <header className="page-header" id="overview">
                        <div className="badge" style={{ borderColor: '#8b5cf6', color: '#8b5cf6' }}>دليل شامل لمسؤولي السوشيال ميديا</div>
                        <h1>🎓 مركز التعليم والتدريب</h1>
                        <p>بوابتك الشاملة لاحتراف إدارة وسائل التواصل الاجتماعي في عالم الاقتصاد والوعي المالي. هذا المركز يجمع كل المعرفة التي تحتاجها من الصفر حتى الاحتراف.</p>
                    </header>

                    <section id="platforms">
                        <h2><span>🌐</span> المنصات الأربعة الرئيسية</h2>
                        <div className="grid-2">
                            <div className="info-card" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                                <h4 style={{ color: '#1877f2' }}>📘 فيسبوك (Facebook)</h4>
                                <p>المنصة الأم للوصول العضوي والمجتمعات. مثالية للمحتوى التعليمي الطويل والنقاشات العميقة.</p>
                                <ul style={{ marginTop: '1rem', lineHeight: '1.8', fontSize: '14px' }}>
                                    <li>• أفضل للجمهور: 25-44 سنة</li>
                                    <li>• نوع المحتوى: كاروسيل، منشورات نصية طويلة، بث مباشر</li>
                                    <li>• معدل النشر المثالي: 1-2 يومياً</li>
                                    <li>• الذروة: 12-2 ظهراً، 8-10 مساءً</li>
                                </ul>
                                <a href="/plans/facebook" style={{ display: 'inline-block', marginTop: '1rem', color: '#1877f2', textDecoration: 'none', fontWeight: 'bold' }}>→ اطلع على خطة فيسبوك الكاملة</a>
                            </div>

                            <div className="info-card" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                                <h4 style={{ color: '#dc2743' }}>📷 إنستغرام (Instagram)</h4>
                                <p>المنصة البصرية الأولى. مثالية للوصول للشباب والمحتوى المرئي التعليمي.</p>
                                <ul style={{ marginTop: '1rem', lineHeight: '1.8', fontSize: '14px' }}>
                                    <li>• أفضل للجمهور: 18-35 سنة</li>
                                    <li>• نوع المحتوى: كاروسيل، ريلز، ستوريز</li>
                                    <li>• معدل النشر المثالي: 1-2 يومياً + ستوريز يومية</li>
                                    <li>• الذروة: 7-9 صباحاً، 9-11 مساءً</li>
                                </ul>
                                <a href="/plans/instagram" style={{ display: 'inline-block', marginTop: '1rem', color: '#dc2743', textDecoration: 'none', fontWeight: 'bold' }}>→ اطلع على خطة إنستغرام الكاملة</a>
                            </div>

                            <div className="info-card" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                                <h4 style={{ color: '#0a66c2' }}>💼 لينكد إن (LinkedIn)</h4>
                                <p>منصة المحترفين وصناع القرار. مثالية للوصول المهني وبناء السلطة الفكرية.</p>
                                <ul style={{ marginTop: '1rem', lineHeight: '1.8', fontSize: '14px' }}>
                                    <li>• أفضل للجمهور: محترفون، مديرون، رواد أعمال</li>
                                    <li>• نوع المحتوى: منشورات نصية طويلة، كاروسيل PDF</li>
                                    <li>• معدل النشر المثالي: 5 أسبوعياً</li>
                                    <li>• الذروة: 8-10 صباحاً، 12-1 ظهراً (أيام العمل)</li>
                                </ul>
                                <a href="/plans/linkedin" style={{ display: 'inline-block', marginTop: '1rem', color: '#0a66c2', textDecoration: 'none', fontWeight: 'bold' }}>→ اطلع على خطة لينكد إن الكاملة</a>
                            </div>

                            <div className="info-card" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                                <h4 style={{ color: '#ffffff' }}>🐦 X (تويتر)</h4>
                                <p>ساحة النقاش العالمية. مثالية للأخبار الفورية والنقاشات السريعة.</p>
                                <ul style={{ marginTop: '1rem', lineHeight: '1.8', fontSize: '14px' }}>
                                    <li>• أفضل للجمهور: 18-40 سنة، مهتمون بالأخبار</li>
                                    <li>• نوع المحتوى: تغريدات قصيرة، ثريدات، صور</li>
                                    <li>• معدل النشر المثالي: 3-5 يومياً</li>
                                    <li>• الذروة: 6-8 صباحاً، 6-9 مساءً</li>
                                </ul>
                                <a href="/plans/x" style={{ display: 'inline-block', marginTop: '1rem', color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>→ اطلع على خطة X الكاملة</a>
                            </div>
                        </div>
                    </section>

                    <section id="fundamentals">
                        <h2><span>📚</span> الأساسيات - من الصفر للاحتراف</h2>
                        
                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h3>المستوى 1: المبتدئ (0-3 أشهر)</h3>
                            <div className="grid-2">
                                <div>
                                    <h5 style={{ color: '#22c55e' }}>المهارات الأساسية</h5>
                                    <ul style={{ lineHeight: '1.8' }}>
                                        <li>فهم أساسيات كل منصة</li>
                                        <li>إنشاء حسابات احترافية</li>
                                        <li>كتابة منشورات بسيطة</li>
                                        <li>تصميم صور أساسية (Canva)</li>
                                        <li>الرد على التعليقات</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 style={{ color: '#22c55e' }}>الأهداف المتوقعة</h5>
                                    <ul style={{ lineHeight: '1.8' }}>
                                        <li>500-1000 متابع عضوي</li>
                                        <li>معدل تفاعل 3-5%</li>
                                        <li>نشر منتظم 5-10 مرات أسبوعياً</li>
                                        <li>فهم أساسي للتحليلات</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h3>المستوى 2: المتوسط (3-6 أشهر)</h3>
                            <div className="grid-2">
                                <div>
                                    <h5 style={{ color: '#eab308' }}>المهارات المتقدمة</h5>
                                    <ul style={{ lineHeight: '1.8' }}>
                                        <li>استراتيجيات محتوى متقدمة</li>
                                        <li>تحليل المنافسين</li>
                                        <li>إدارة الأزمات</li>
                                        <li>تحسين معدلات التفاعل</li>
                                        <li>استخدام أدوات الجدولة</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 style={{ color: '#eab308' }}>الأهداف المتوقعة</h5>
                                    <ul style={{ lineHeight: '1.8' }}>
                                        <li>5,000-10,000 متابع</li>
                                        <li>معدل تفاعل 5-8%</li>
                                        <li>منشور فيروسي واحد على الأقل</li>
                                        <li>تقارير أداء شهرية احترافية</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h3>المستوى 3: المحترف (6-12 شهر)</h3>
                            <div className="grid-2">
                                <div>
                                    <h5 style={{ color: '#ef4444' }}>المهارات الخبيرة</h5>
                                    <ul style={{ lineHeight: '1.8' }}>
                                        <li>استراتيجيات نمو متقدمة</li>
                                        <li>إدارة فرق وميزانيات</li>
                                        <li>تحليلات متقدمة و A/B Testing</li>
                                        <li>بناء هوية بصرية متكاملة</li>
                                        <li>التعاون مع علامات تجارية</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 style={{ color: '#ef4444' }}>الأهداف المتوقعة</h5>
                                    <ul style={{ lineHeight: '1.8' }}>
                                        <li>10,000-50,000+ متابع</li>
                                        <li>معدل تفاعل 8%+</li>
                                        <li>منشورات فيروسية متعددة</li>
                                        <li>اعتراف كصوت مؤثر في المجال</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="algorithms">
                        <h2><span>🧠</span> فهم الخوارزميات - الدليل المبسط</h2>
                        
                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h3>كيف تفكر الخوارزميات؟</h3>
                            <p>الخوارزميات ليست سحراً - هي أنظمة تتبع قواعد محددة. فهم هذه القواعد هو مفتاح النجاح:</p>
                            
                            <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
                                    <h4 style={{ color: '#3b82f6', marginBottom: '1rem' }}>1. الهدف الأساسي</h4>
                                    <p style={{ lineHeight: '1.8' }}>إبقاء المستخدم على المنصة لأطول فترة ممكنة. المحتوى الذي يحقق هذا الهدف سيتم تعزيزه.</p>
                                </div>
                                
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
                                    <h4 style={{ color: '#10b981', marginBottom: '1rem' }}>2. إشارات الترتيب</h4>
                                    <p style={{ lineHeight: '1.8' }}>الخوارزميات تقيس: وقت المشاهدة، التفاعل، المشاركة، الحفظ. كل إشارة لها وزن مختلف.</p>
                                </div>
                                
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
                                    <h4 style={{ color: '#f59e0b', marginBottom: '1rem' }}>3. الاختبار الأولي</h4>
                                    <p style={{ lineHeight: '1.8' }}>كل منشور يُختبر على عينة صغيرة (2-5% من المتابعين). إذا نجح، يتوسع العرض.</p>
                                </div>
                                
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
                                    <h4 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>4. التوسع الفيروسي</h4>
                                    <p style={{ lineHeight: '1.8' }}>إذا تجاوز المنشور عتبات معينة (تفاعل، مشاركة)، يدخل مرحلة الانتشار الواسع.</p>
                                </div>
                            </div>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h3>أوزان التفاعل - ما الأهم؟</h3>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.2)' }}>
                                            <th style={{ padding: '1rem', textAlign: 'right', color: '#93c5fd' }}>نوع التفاعل</th>
                                            <th style={{ padding: '1rem', textAlign: 'center', color: '#93c5fd' }}>الوزن النسبي</th>
                                            <th style={{ padding: '1rem', textAlign: 'right', color: '#93c5fd' }}>لماذا؟</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                            <td style={{ padding: '1rem' }}>🔖 الحفظ (Save)</td>
                                            <td style={{ padding: '1rem', textAlign: 'center', color: '#22c55e', fontWeight: 'bold' }}>8x</td>
                                            <td style={{ padding: '1rem' }}>إشارة قوية أن المحتوى قيم ويستحق الرجوع إليه</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                            <td style={{ padding: '1rem' }}>📤 المشاركة (Share)</td>
                                            <td style={{ padding: '1rem', textAlign: 'center', color: '#22c55e', fontWeight: 'bold' }}>7x</td>
                                            <td style={{ padding: '1rem' }}>يوسع وصول المحتوى لجمهور جديد</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                            <td style={{ padding: '1rem' }}>💬 تعليق طويل (50+ كلمة)</td>
                                            <td style={{ padding: '1rem', textAlign: 'center', color: '#3b82f6', fontWeight: 'bold' }}>5x</td>
                                            <td style={{ padding: '1rem' }}>يدل على نقاش حقيقي ومحتوى مثير للتفكير</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                            <td style={{ padding: '1rem' }}>⏱️ وقت المشاهدة الكامل</td>
                                            <td style={{ padding: '1rem', textAlign: 'center', color: '#3b82f6', fontWeight: 'bold' }}>5x</td>
                                            <td style={{ padding: '1rem' }}>المستخدم استهلك المحتوى بالكامل</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                            <td style={{ padding: '1rem' }}>💬 تعليق قصير</td>
                                            <td style={{ padding: '1rem', textAlign: 'center', color: '#f59e0b' }}>3x</td>
                                            <td style={{ padding: '1rem' }}>تفاعل جيد لكن أقل عمقاً</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                            <td style={{ padding: '1rem' }}>❤️ الإعجاب (Like)</td>
                                            <td style={{ padding: '1rem', textAlign: 'center', color: '#ef4444' }}>1x</td>
                                            <td style={{ padding: '1rem' }}>أقل جهد، أقل قيمة للخوارزمية</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    <section id="content">
                        <h2><span>✍️</span> استراتيجية المحتوى - الأسس الذهبية</h2>
                        
                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h3>قاعدة 4E للمحتوى الناجح</h3>
                            <div className="grid-2">
                                <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1.5rem', borderRadius: '12px' }}>
                                    <h4 style={{ color: '#3b82f6' }}>Educate (علّم)</h4>
                                    <p style={{ lineHeight: '1.8' }}>قدّم قيمة تعليمية حقيقية. اجعل المعقد بسيطاً. استخدم الأمثلة العملية.</p>
                                    <p style={{ marginTop: '0.5rem', fontSize: '14px', color: '#93c5fd' }}>مثال: "كيف تبني ميزانية شهرية في 5 خطوات"</p>
                                </div>
                                
                                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '12px' }}>
                                    <h4 style={{ color: '#10b981' }}>Entertain (سلّ)</h4>
                                    <p style={{ lineHeight: '1.8' }}>المحتوى الجاد لا يعني الممل. استخدم القصص، الدراما، الفكاهة الذكية.</p>
                                    <p style={{ marginTop: '0.5rem', fontSize: '14px', color: '#93c5fd' }}>مثال: "قصة رجل خسر مليون في يوم واحد"</p>
                                </div>
                                
                                <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1.5rem', borderRadius: '12px' }}>
                                    <h4 style={{ color: '#f59e0b' }}>Empower (مكّن)</h4>
                                    <p style={{ lineHeight: '1.8' }}>أعطِ الجمهور أدوات قابلة للتطبيق فوراً. خطوات، قوالب، قوائم.</p>
                                    <p style={{ marginTop: '0.5rem', fontSize: '14px', color: '#93c5fd' }}>مثال: "قالب إكسل مجاني لإدارة الميزانية"</p>
                                </div>
                                
                                <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '1.5rem', borderRadius: '12px' }}>
                                    <h4 style={{ color: '#8b5cf6' }}>Engage (تفاعل)</h4>
                                    <p style={{ lineHeight: '1.8' }}>أنهِ كل منشور بدعوة للتفاعل. اسأل، استفتِ، اطلب الرأي.</p>
                                    <p style={{ marginTop: '0.5rem', fontSize: '14px', color: '#93c5fd' }}>مثال: "ما أكبر تحدي مالي تواجهه؟"</p>
                                </div>
                            </div>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h3>هيكل المنشور المثالي</h3>
                            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', fontFamily: 'monospace', fontSize: '14px', lineHeight: '2' }}>
{`┌─────────────────────────────────────────────┐
│  1. الخطاف (Hook) - أول 1-2 سطر            │
│     • صدمة / فضول / فائدة واضحة            │
│     • مثال: "90% من الناس يرتكبون هذا      │
│       الخطأ المالي..."                     │
├─────────────────────────────────────────────┤
│  2. الجسر (Bridge) - سطر 3-4               │
│     • انتقل من الخطاف للمحتوى              │
│     • "دعني أشرح لك ما حدث..."             │
├─────────────────────────────────────────────┤
│  3. القيمة (Value) - 5-15 سطر              │
│     • النقاط الرئيسية                      │
│     • أمثلة، أرقام، قصص                    │
│     • فقّرات واستخدم مساحات بيضاء          │
├─────────────────────────────────────────────┤
│  4. الدليل الاجتماعي (Proof) - اختياري    │
│     • "هذا ما فعله X شخص ونجحوا..."        │
├─────────────────────────────────────────────┤
│  5. الدعوة للتفاعل (CTA) - آخر سطر         │
│     • سؤال مفتوح يحفز التعليقات            │
│     • "ما رأيك؟ شاركنا تجربتك..."          │
└─────────────────────────────────────────────┘`}
                            </div>
                        </div>
                    </section>

                    <section id="analytics">
                        <h2><span>📊</span> التحليلات - اقرأ الأرقام مثل خبير</h2>
                        
                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h3>المقاييس التي تهم حقاً</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                                <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                                    <h4 style={{ color: '#22c55e', marginBottom: '0.5rem' }}>🎯 معدل التفاعل (Engagement Rate)</h4>
                                    <p style={{ fontSize: '14px', lineHeight: '1.6' }}>(التعليقات + المشاركات + الحفظ) ÷ الوصول × 100</p>
                                    <p style={{ fontSize: '13px', color: '#93c5fd', marginTop: '0.5rem' }}>الهدف: 5%+ للمنشورات الاقتصادية</p>
                                </div>
                                
                                <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                                    <h4 style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>📈 معدل الحفظ (Save Rate)</h4>
                                    <p style={{ fontSize: '14px', lineHeight: '1.6' }}>الحفظ ÷ الوصول × 100</p>
                                    <p style={{ fontSize: '13px', color: '#93c5fd', marginTop: '0.5rem' }}>الهدف: 3%+ (أهم مقياس للمحتوى التعليمي)</p>
                                </div>
                                
                                <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                                    <h4 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>🔄 معدل المشاركة (Share Rate)</h4>
                                    <p style={{ fontSize: '14px', lineHeight: '1.6' }}>المشاركات ÷ الوصول × 100</p>
                                    <p style={{ fontSize: '13px', color: '#93c5fd', marginTop: '0.5rem' }}>الهدف: 2%+ (مقياس الفيروسية)</p>
                                </div>
                                
                                <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                                    <h4 style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>👥 معدل المتابعة (Follow Rate)</h4>
                                    <p style={{ fontSize: '14px', lineHeight: '1.6' }}>المتابعون الجدد ÷ زيارات البروفايل × 100</p>
                                    <p style={{ fontSize: '13px', color: '#93c5fd', marginTop: '0.5rem' }}>الهدف: 20%+</p>
                                </div>
                            </div>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h3>قوالب تقارير جاهزة</h3>
                            <p>راجع قسم الملحق في كل خطة للحصول على قوالب تقارير شهرية جاهزة للاستخدام.</p>
                        </div>
                    </section>

                    <section id="growth">
                        <h2><span>🚀</span> استراتيجيات النمو المتسارع</h2>
                        
                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h3>أقوى 5 استراتيجيات نمو عضوي</h3>
                            
                            <div style={{ marginTop: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: '40px', height: '40px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>1</div>
                                    <div>
                                        <h4 style={{ color: '#3b82f6' }}>استراتيجية "التعليق الذهبي"</h4>
                                        <p style={{ lineHeight: '1.8' }}>علّق بذكاء على 20-30 حساباً كبيراً في مجالك يومياً. أضف قيمة، لا تكن متسولاً للمتابعة. النتيجة: 500-2000 زيارة مجانية لبروفايلك يومياً.</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: '40px', height: '40px', background: 'linear-gradient(135deg, #10b981, #3b82f6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>2</div>
                                    <div>
                                        <h4 style={{ color: '#10b981' }}>استراتيجية "السلسلة المتصلة"</h4>
                                        <p style={{ lineHeight: '1.8' }}>أنشئ سلسلة محتوى أسبوعية ثابتة (مثال: "درس الأسبوع"). كل حلقة تُشير للسابقة. هذا يخلق "إدمان محتوى" ويزيد المتابعة بنسبة 60%+.</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: '40px', height: '40px', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>3</div>
                                    <div>
                                        <h4 style={{ color: '#f59e0b' }}>استراتيجية "التعاون المتبادل"</h4>
                                        <p style={{ lineHeight: '1.8' }}>تعاون مع 2-3 حسابات بحجم حسابك لنشر محتوى مشترك. كل طرف يعرّف الآخر على جمهوره. النمو المتبادل أسرع 3x من النمو الفردي.</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: '40px', height: '40px', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>4</div>
                                    <div>
                                        <h4 style={{ color: '#8b5cf6' }}>استراتيجية "إعادة التدوير الذكي"</h4>
                                        <p style={{ lineHeight: '1.8' }}>أعد نشر أفضل منشوراتك بعد 30 يوم بصيغة مختلفة قليلاً. 70% من جمهورك لم يرَ المنشور الأصلي. المنشورات المعادة غالباً تؤدي أفضل!</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: '40px', height: '40px', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>5</div>
                                    <div>
                                        <h4 style={{ color: '#06b6d4' }}>استراتيجية "اللحظة الخبرية"</h4>
                                        <p style={{ lineHeight: '1.8' }}>راقب الأخبار الاقتصادية وكن أول من يعلّق بتحليل ذكي. استخدم الهاشتاغات الرسمية. هذا يضمن وصولاً فيروسياً فورياً.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="tools">
                        <h2><span>🛠️</span> الأدوات الاحترافية</h2>
                        
                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h3>أدوات إنشاء المحتوى</h3>
                            <div className="grid-2">
                                <div>
                                    <h5 style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>التصميم البصري</h5>
                                    <ul style={{ lineHeight: '1.8' }}>
                                        <li>• Canva Pro - الأفضل للكاروسيل</li>
                                        <li>• Figma - للمحترفين</li>
                                        <li>• Adobe Express - بديل Canva</li>
                                        <li>• CapCut - للفيديو والريبوست</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 style={{ color: '#10b981', marginBottom: '0.5rem' }}>الكتابة والتحرير</h5>
                                    <ul style={{ lineHeight: '1.8' }}>
                                        <li>• Notion - لتنظيم الأفكار</li>
                                        <li>• LanguageTool - تدقيق عربي</li>
                                        <li>• Grammarly - تدقيق إنجليزي</li>
                                        <li>• Hemingway App - لتبسيط النصوص</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h3>أدوات الجدولة والتحليل</h3>
                            <div className="grid-2">
                                <div>
                                    <h5 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>مجانية</h5>
                                    <ul style={{ lineHeight: '1.8' }}>
                                        <li>• Meta Business Suite</li>
                                        <li>• LinkedIn Analytics</li>
                                        <li>• X Analytics</li>
                                        <li>• Instagram Insights</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>مدفوعة</h5>
                                    <ul style={{ lineHeight: '1.8' }}>
                                        <li>• Buffer - بسيط وجيد</li>
                                        <li>• Hootsuite - للفرق الكبيرة</li>
                                        <li>• Social Blade - لتحليل المنافسين</li>
                                        <li>• Phlanx - لحساب التفاعل</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="info-card" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.15) 100%)', border: '2px solid rgba(139, 92, 246, 0.5)', padding: '2rem', textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '1rem' }}>🎯 خطوتك التالية</h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                            المعرفة بدون تنفيذ لا قيمة لها.<br/>
                            اختر منصة واحدة، طبّق ما تعلمته لمدة 30 يوم، ثم وسّع للمنصات الأخرى.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="/plans/facebook" style={{ padding: '0.75rem 1.5rem', background: '#1877f2', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>خطة فيسبوك</a>
                            <a href="/plans/instagram" style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(45deg, #f09433, #dc2743)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>خطة إنستغرام</a>
                            <a href="/plans/linkedin" style={{ padding: '0.75rem 1.5rem', background: '#0a66c2', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>خطة لينكد إن</a>
                            <a href="/plans/x" style={{ padding: '0.75rem 1.5rem', background: '#fff', color: '#000', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>خطة X</a>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
