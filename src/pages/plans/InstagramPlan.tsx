import React, { useEffect } from 'react';
import './plans.css';

export const InstagramPlan = () => {
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
        // Call once to activate initial
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="plan-container insta-plan" style={{ '--platform-color': '#dc2743' } as any}>
            <div className="bg-glow top-right" style={{ background: 'radial-gradient(circle, #bc1888 0%, transparent 60%)', opacity: 0.12 }}></div>
            <div className="bg-glow bottom-left" style={{ background: 'radial-gradient(circle, #f09433 0%, transparent 60%)', opacity: 0.12 }}></div>

            <div className="app-layout">
                {/* Sidebar Navigation */}
                {/* Main Content */}
                <main className="main-content">
                <nav className="top-toc">
                    <h2 className="brand-title">محتويات الخطة</h2>

                    <div className="nav-section">
                        <nav className="toc-links">
                            <a href="#overview">الخوارزميات والجمهور</a>
                            <a href="#strategy">استراتيجية المحتوى والجدول</a>
                            <a href="#plan">خطة الـ 60 يوم (المراحل)</a>
                            <a href="#content-types">30 فكرة للمنشورات</a>
                            <a href="#education">الدليل التعليمي الشامل</a>
                            <a href="#warnings">التحذيرات والأخطاء</a>
                        </nav>

                                        </div>
                </nav>
<header className="page-header" id="overview">
                        <div className="badge" style={{ borderColor: '#e6683c', color: '#e6683c' }}>الهدف: 10,000 متابع خلال 60 يوم</div>
                        <h1>خطة احترافية لمنصة <span className="insta-gradient">إنستغرام</span> (Instagram)</h1>
                        <p>هذا ليس لراقصي الريلز، بل للمحتوى الجاد. خطة تعتمد استراتيجية "السيطرة البصرية" وتحويل السحب (Swipe) والحفظ (Save) إلى أدوات لبناء سلطة اقتصادية ساحقة.</p>
                    </header>

                    <div className="sections-wrapper">
                    <section>
                        <details className="toggle-section">
                            <summary>
                                <h2><span></span> خوارزميات إنستغرام 2026 والجمهور</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">
                        <div className="grid-2">
                            <div className="info-card">
                                <h4>التركيز على الحفظ (Saves) والسحب (Swipes)</h4>
                                <p>قامت خوارزميات المنصة بنزع التاج عن الإعجابات وتتويج (الحفظ والمشاركة). كاروسيل جيد يجعلك تسحب لـ 8 صور سيجبر إنستغرام على عرضه لألف شخص جديد لأن وقت الاستبقاء (Dwell Time) كان عالياً.</p>
                                <p style={{ marginTop: '10px', fontSize: '14px', color: '#a0a0a0' }}><strong>نصيحة ذهبية:</strong> اجعل الشريحة الأخيرة من الكاروسيل دائماً CTA للحفظ: "احفظ هذا المنشور للرجوع إليه"</p>
                            </div>
                            <div className="info-card">
                                <h4>البحث الدلالي (Semantic SEO)</h4>
                                <p>الهاشتاغات لم تعد كما كانت. إنستغرام يقرأ (النص الموجود في الصور) و(الكلمات في البايو والكابشن). استخدم كلمات مفتاحية صريحة (اقتصاد، إدارة الدخل، تضخم) لكي تظهر في الـ Explore بقوة.</p>
                                <p style={{ marginTop: '10px', fontSize: '14px', color: '#a0a0a0' }}><strong>تكتيك:</strong> ضع الكلمة المفتاحية الرئيسية في أول سطر من الكابشن وفي الشريحة الأولى من الكاروسيل.</p>
                            </div>
                        </div>
                        <div className="info-card" style={{ marginTop: '1.5rem' }}>
                            <h4>الجمهور المستهدف (18 - 35 سنة)</h4>
                            <p>جمهور يقدس الجماليات البصرية ويفضل المعلومة السريعة جداً. يريدون تحقيق الثراء، التعامل مع وظائفهم، ويتطلعون للحرية المالية بسن مبكرة. الخطاف (Hook) يجب أن يتحدث عن آلامهم وتطلعاتهم المباشرة.</p>
                        </div>
                        <div className="info-card" style={{ marginTop: '1.5rem' }}>
                            <h4>إشارات الخوارزمية الأساسية (Ranking Signals)</h4>
                            <ul>
                                <li><strong>وقت المشاهدة (Watch Time):</strong> للريلز - كلما أكمل المستخدم الفيديو وزاد إعادة المشاهدة، زاد الانتشار.</li>
                                <li><strong>الحفظ (Saves):</strong> أقوى إشارة للمحتوى التعليمي. يعني "هذا مهم بما يكفي للرجوع إليه".</li>
                                <li><strong>المشاركة (Shares):</strong> يرسل المستخدم المنشور لآخرين عبر DM أو يشاركه في ستوري = محتوى فيروسي.</li>
                                <li><strong>التعليقات الطويلة:</strong> الخوارزمية تفضل النقاشات الحقيقية وليست الإيموجيات.</li>
                                <li><strong>المتابعة من المنشور:</strong> إذا تابع شخص حسابك بعد منشور معين، هذا إشارة قوية لتكرار الصيغة.</li>
                            </ul>
                        </div>
                                                </div>
                        </details>
                    </section>

                    <section id="strategy">
                        <details className="toggle-section">
                            <summary>
                                <h2><span>️</span> استراتيجية المحتوى وجدول النشر</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">
                        <div className="grid-2">
                            <div className="info-card">
                                <h4>صيغ النشر القوية</h4>
                                <p><strong>1. الكاروسيل التعليمي:</strong> (50% من المحتوى). أقوى صيغة للانتشار والاكتشاف على المنصة. من 5-8 صور.</p>
                                <p><strong>2. الصورة والنص (Single Image):</strong> للرسائل الجريئة والاقتباسات. صورة غنية بالتصميم مع كابشن دسم.</p>
                                <p><strong>3. الستوريز:</strong> للنقاشات الخلفية وأسئلة اليوم (تصويتات).</p>
                                <p><strong>4. الريلز (Reels):</strong> (20% من المحتوى) - ريلز واحد أسبوعياً يلخص أهم نقطة من كاروسيل الأسبوع.</p>
                                <p style={{ marginTop: '10px', fontSize: '14px', color: '#a0a0a0' }}><strong>نصيحة:</strong> استخدم الكابشن الطويل (150-300 كلمة) لزيادة وقت القراءة وتحسين الـ SEO.</p>
                            </div>
                            <div className="info-card">
                                <h4>توزيع الجدول (2 منشور يوميا)</h4>
                                <ul>
                                    <li><strong>1 ظهرًا:</strong> صورة + نص قوي ومختصر لاقتناص المشاهدة في وقت الراحة.</li>
                                    <li><strong>8 أو 9 مساءً:</strong> الكاروسيل الأساسي، حيث يتسنى للمستخدمين الجلوس والتمرير والتعلم (Swipe & Save).</li>
                                    <li><strong>الستوريز:</strong> 3-5 قصص يومياً (صباحاً، ظهراً، مساءً) للحفاظ على التفاعل المستمر.</li>
                                    <li><strong>أفضل الأيام:</strong> الأحد، الاثنين، الأربعاء هي أيام الذروة للتفاعل الاقتصادي.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="info-card" style={{ marginTop: '1.5rem' }}>
                            <h4>هيكل الكاروسيل المثالي (Anatomy of a Viral Carousel)</h4>
                            <ul>
                                <li><strong>الشريحة 1 (Hook):</strong> عنوان صادم أو وعد قوي يجبر المستخدم على التوقف والسحب.</li>
                                <li><strong>الشريحة 2 (Problem):</strong> حدد المشكلة أو الألم الذي يعاني منه الجمهور.</li>
                                <li><strong>الشريحة 3-7 (Value):</strong> قدم الحلول، الخطوات، أو المعلومات القيمة.</li>
                                <li><strong>الشريحة 8 (CTA):</strong> دعوة واضحة للحفظ، المشاركة، أو المتابعة.</li>
                            </ul>
                        </div>
                                                </div>
                        </details>
                    </section>

                    <section id="plan">
                        <details className="toggle-section">
                            <summary>
                                <h2><span></span> خطة الـ 60 يوم (مراحل التنفيذ)</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">

                        <div className="phase-card">
                            <h3>المرحلة الأولى: الهوية البصرية (الأيام 1-7) <span className="phase-badge">الأساسيات</span></h3>
                            <div className="phase-content">
                                <div className="goal">تثبيت هوية بصرية صارمة لا تتغير، ليتعرف عليك المتابع بلمحة.</div>
                                <ul>
                                    <li><strong>البايو (Bio):</strong> جملة قوية (أساعدك في تبسيط الاقتصاد وتحقيق الاستقرار المالي).</li>
                                    <li><strong>الهايلايتس (Highlights):</strong> إضافة قصص تثبت كالتالي: (من أنا، مصطلحات، نصائح للمبتدئين).</li>
                                    <li><strong>أول 9 منشورات قوية (Grid Set):</strong> يجب أن تدخل الصفحة وتجد شكل الـ Grid جذاب، قبل دعوة أي أحد.</li>
                                    <li><strong>الهوية البصرية:</strong> اختر لوحة ألوان ثابتة (2-3 ألوان) وخطوط محددة لا تتغير.</li>
                                    <li><strong>Profile Picture:</strong> شعار واضح أو صورة احترافية بخلفية موحدة.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="phase-card">
                            <h3>المرحلة الثانية: اقتحام المجتمع (الأسابيع 2-4) <span className="phase-badge">أول 3000 متابع</span></h3>
                            <div className="phase-content">
                                <div className="goal">التفاعل الاستباقي للفت الانتباه وجر الجمهور لصفحتك.</div>
                                <ul>
                                    <li>التعليق المبكر على 10 حسابات كبيرة (عربية وعالمية مترجمة) في أول دقائق من نشرهم بردود "تحليلية وثرية". سيعجَب الناس بتعليقك ويدخلون لحسابك.</li>
                                    <li>استخدام <em>Call to Action</em> صريح (احفظ هذا الكاروسيل للرجوع إليه لاحقاً) لتغذية الخوارزمية بالإيجابية.</li>
                                    <li>تحفيز المحادثات المباشرة (DMs) بنهاية المنشور: "أرسل كلمة (خطة) على الخاص لأعطيك تفاصيل، لزيادة نقاط ثقة الحساب".</li>
                                    <li><strong>Collaboration Posts:</strong> منشور تعاوني واحد أسبوعياً مع حساب مشابه في الحجم.</li>
                                    <li><strong>Story Engagement:</strong> استخدم ستكر التفاعل (Poll, Quiz, Question Box) يومياً لرفع معدل التفاعل.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="phase-card">
                            <h3>المرحلة الثالثة: الانفجار في الـ Explore (الأسابيع 5-8) <span className="phase-badge">الوصول لـ 10,000</span></h3>
                            <div className="phase-content">
                                <div className="goal">دخول المنشورات بصفحة الاستكشاف (Explore) ومحتوى الترقيات (Suggested).</div>
                                <ul>
                                    <li>مضاعفة العناوين الاستفزازية (مثال: "قانون الـ 30 يوماً الذي يجهله الفقراء").</li>
                                    <li>أداء تحليل تنافسي (Insights): أي الكاروسيلات نال أعلى نسبة حفظ، وعمل جزء ثانٍ وثالث له.</li>
                                    <li>توظيف الستوري بشكل مكثف (3-5 قصص يوميا) للتفاعل، أسئلة/أجوبة (Q&A box) ونشر الردود لبناء الثقة المطلقة.</li>
                                    <li><strong>Reels Strategy:</strong> ريلز أسبوعياً (30-60 ثانية) بصيغة تريند مع صوت شائع في مجالك.</li>
                                    <li><strong>Broadcast Channel:</strong> أنشئ قناة بث لإرسال إشعارات فورية لأهم المنشورات.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="phase-card" style={{ marginTop: '1.5rem' }}>
                            <h3>المرحلة الرابعة: التثبيت والنمو المستدام (الأسابيع 9-12) <span className="phase-badge">ما بعد 10K</span></h3>
                            <div className="phase-content">
                                <div className="goal">تحويل المتابعين إلى مجتمع متفاعل وولاء طويل الأمد.</div>
                                <ul>
                                    <li><strong>Instagram Live:</strong> بث مباشر أسبوعي (30-45 دقيقة) للإجابة على أسئلة المتابعين.</li>
                                    <li><strong>UGC Content:</strong> شجّع المتابعين على مشاركة تجاربهم مع محتواك وإعادة نشره.</li>
                                    <li><strong>Series Content:</strong> أطلق سلسلة أسبوعية ثابتة (مثال: "اقتصاد في 60 ثانية" كل ثلاثاء).</li>
                                    <li><strong>Analytics Deep Dive:</strong> راجع Insights أسبوعياً لتحديد أفضل الأوقات، الصيغ، والمواضيع تكراراً.</li>
                                </ul>
                            </div>
                        </div>
                                                </div>
                        </details>
                    </section>

                    <section id="content-types">
                        <details className="toggle-section">
                            <summary>
                                <h2><span></span> 30 نوع منشور (الأفكار الجاهزة)</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">
                        <div className="content-types-list">
                            <div className="type-item">
                                <span className="num">01</span>
                                <strong>خرافات القطيع (Myths)</strong>
                                <span>كاروسيل: 5 خرافات عن المال يصدقها 90% من الناس.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">02</span>
                                <strong>خرائط الطريق</strong>
                                <span>كاروسيل: 4 مراحل للوصول إلى أول 10 ألاف دولار.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">03</span>
                                <strong>المقارنات البصرية</strong>
                                <span>كاروسيل/صورة: شخص يشتري سيارة ديناً VS شخص يستثمر قيمتها.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">04</span>
                                <strong>الاقتباسات المؤثرة</strong>
                                <span>صورة: مقولة من كتاب "الأب الغني" مع كابشن يشرح تطبيقها محلياً.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">05</span>
                                <strong>تحليل النفسية المالية</strong>
                                <span>صورة ونص: لماذا لا تستطيع التوقف عن الشراء العشوائي العاطفي؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">06</span>
                                <strong>قوائم المصادر والأدوات</strong>
                                <span>كاروسيل: أفضل 3 تطبيقات لإدارة وتتبع مصروفاتك في الشرق الأوسط.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">07</span>
                                <strong>القوانين المالية الذهبية</strong>
                                <span>كاروسيل: كيف تطبق ميزانية 50/30/20 على مرتبك.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">08</span>
                                <strong>نصيحة قبل سن الـ 30</strong>
                                <span>صورة ونص: الاستثمار المبكر.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">09</span>
                                <strong>الدروس المستفادة </strong>
                                <span>كاروسيل: تحليل شركة كوداك ولماذا أفلس عملاق واثق بنفسه.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">10</span>
                                <strong>معادلات بسيطة للثراء</strong>
                                <span>صورة: قاعدة الـ 72 لمعرفة متى سيتضاعف مالك.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">11</span>
                                <strong>تحذيرات الخطر المالي</strong>
                                <span>كاروسيل: 3 علامات تدل أنك في طريقك للخطر والإفلاس.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">12</span>
                                <strong>الأخبار الاقتصادية المترجمة كواقع</strong>
                                <span>صورة ونص: ماذا يعني صعود الذهب بالنسبة لجيبك؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">13</span>
                                <strong>تحدي الـ 30 يوم</strong>
                                <span>كاروسيل: تحدي الادخار - وفر 1000 دولار في شهر بخطوات عملية.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">14</span>
                                <strong>أسرار الاستثمار</strong>
                                <span>كاروسيل: 7 أسرار استثمارية لا يخبرك بها أحد.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">15</span>
                                <strong>دليل المبتدئين</strong>
                                <span>كاروسيل: كل ما تحتاج معرفته قبل شراء أول سهم لك.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">16</span>
                                <strong>عادات الصباح المالية</strong>
                                <span>صورة ونص: 5 عادات صباحية يمارسها الأغنياء لإدارة أموالهم.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">17</span>
                                <strong>الحد الأدنى للطوارئ</strong>
                                <span>كاروسيل: كيف تبني صندوق طوارئ يحميك من أي أزمة؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">18</span>
                                <strong>الرواتب والثروات</strong>
                                <span>كاروسيل: لماذا الراتب العالي لا يعني بالضرورة الثراء؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">19</span>
                                <strong>الاستقلال المالي</strong>
                                <span>كاروسيل: خطة FIRE - كيف تتقاعد مبكراً بذكاء؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">20</span>
                                <strong>أخطاء الاستثمار</strong>
                                <span>كاروسيل: 5 أخطاء قاتلة يرتكبها المبتدئون في البورصة.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">21</span>
                                <strong>الدخل الإضافي</strong>
                                <span>كاروسيل: 7 طرق عملية لزيادة دخلك الشهري.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">22</span>
                                <strong>التضخم المبسط</strong>
                                <span>صورة وإنفوغرافيك: كيف يؤثر التضخم على قوتك الشرائية يومياً؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">23</span>
                                <strong>قصة نجاح</strong>
                                <span>كاروسيل: من الصفر إلى مليون - قصة ملهمة ودروس مستفادة.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">24</span>
                                <strong>العملات الرقمية</strong>
                                <span>كاروسيل: ما يجب أن تعرفه قبل شراء أول عملة رقمية.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">25</span>
                                <strong>الوعي الاستهلاكي</strong>
                                <span>صورة ونص: 7 حيل تسويقية تجعلك تنفق أكثر مما تحتاج.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">26</span>
                                <strong>التأمين والحماية</strong>
                                <span>كاروسيل: أنواع التأمين التي تحتاجها حقاً والتي لا تحتاجها.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">27</span>
                                <strong>الضرائب المبسطة</strong>
                                <span>كاروسيل: دليلك لفهم الضرائب في بلدك خلال 5 دقائق.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">28</span>
                                <strong>سؤال المتابعين</strong>
                                <span>صورة: إجابة على أكثر سؤال تلقينه هذا الأسبوع.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">29</span>
                                <strong>كتب غيرتك حياتك</strong>
                                <span>كاروسيل: أهم 5 كتب مالية غيرت طريقة تفكيري.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">30</span>
                                <strong>توقعات المستقبل</strong>
                                <span>صورة ونص: 3 اتجاهات اقتصادية ستشكل العقد القادم.</span>
                            </div>
                        </div>
                                                </div>
                        </details>
                    </section>

                    <section id="education">
                        <details className="toggle-section">
                            <summary>
                                <h2><span></span> الدليل التعليمي الشامل لمسؤولي السوشيال ميديا - إنستغرام</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">

                        <div className="info-card" style={{ marginBottom: '2rem' }}>
                            <h3>مقدمة: سيكولوجية إنستغرام 2026</h3>
                            <p>إنستغرام في 2026 لم يعد منصة "صور جميلة" فقط. تحول إلى نظام بيئي معقد يجمع بين الترفيه، التعليم، والتجارة. الخوارزمية الحالية تعتمد على أربعة أنظمة منفصلة تعمل معاً: خلاصة المنشورات (Feed)، الاستكشاف (Explore)، الريبوست (Reels)، والستوريز (Stories). كل نظام له خوارزميته الخاصة وإشاراته الفريدة.</p>
                            <p>كمسؤول سوشيال ميديا محترف، يجب أن تفهم أن إنستغرام يكافئ "وقت الشاشة" فوق كل شيء. كلما أطال المستخدمون الوقت في التطبيق بسبب محتواك، كلما كافأك إنستغرام بمزيد من الوصول. هذا الدليل سيأخذك في عمق الخوارزمية وكيفية استغلالها بذكاء.</p>
                        </div>

                        <h3>الفصل الأول: التشريح العميق لخوارزميات إنستغرام</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>1.1 الخوارزميات الأربع (The Four Algorithms)</h4>
                            <p>إنستغرام ليس خوارزمية واحدة، بل أربع خوارزميات منفصلة:</p>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>أ. خوارزمية الخلاصة (Feed Algorithm)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الإشارات الرئيسية:</strong>
                                    <ul>
                                        <li>معلومات المنشور: عدد الإعجابات، السرعة، الموقع، الوقت</li>
                                        <li>معلومات الناشر: علاقتك به، عدد المرات التي تفاعلت فيها معه</li>
                                        <li>نشاطك: ما نوع المحتوى الذي تحب عادةً</li>
                                        <li>سجل التفاعل: هل تفاعلتم مع بعض قبل؟</li>
                                    </ul>
                                </li>
                                <li><strong>الأوزان النسبية:</strong>
                                    <ul>
                                        <li>العلاقة مع الناشر: 35%</li>
                                        <li>الاهتمام بنوع المحتوى: 30%</li>
                                        <li>شعبية المنشور: 20%</li>
                                        <li>حداثة المنشور: 15%</li>
                                    </ul>
                                </li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>ب. خوارزمية الاستكشاف (Explore Algorithm)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>كيف تعمل:</strong> تبحث عن محتوى مشابه لما تفاعلت معه سابقاً</li>
                                <li><strong>الإشارات:</strong>
                                    <ul>
                                        <li>تفاعلاتك السابقة مع محتوى مشابه</li>
                                        <li>شعبية المنشور في مجتمعه</li>
                                        <li>معلومات الناشر وتفاعلاته معك</li>
                                    </ul>
                                </li>
                                <li><strong>نصيحة:</strong> استخدم هاشتاغات دقيقة جداً لتصنيف محتواك بشكل صحيح</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>ج. خوارزمية الريبوست (Reels Algorithm)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>التركيز:</strong> الترفيه والاكتشاف</li>
                                <li><strong>الإشارات:</strong>
                                    <ul>
                                        <li>وقت المشاهدة الكامل: 40%</li>
                                        <li>إعادة المشاهدة: 25%</li>
                                        <li>التفاعل (لايك، تعليق، مشاركة): 20%</li>
                                        <li>المتابعة بعد المشاهدة: 15%</li>
                                    </ul>
                                </li>
                                <li><strong>مهم:</strong> Reels هي أفضل طريقة للوصول لغير المتابعين حالياً</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>د. خوارزمية الستوريز (Stories Algorithm)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>التركيز:</strong> القرب والعلاقة</li>
                                <li><strong>الإشارات:</strong>
                                    <ul>
                                        <li>عدد المرات التي تفتح فيها ستوريز الشخص</li>
                                        <li>هل ترد على ستوريزه؟</li>
                                        <li>هل تتفاعل مع حسابه عموماً؟</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>1.2 نظام "النقاط المخفية" في إنستغرام</h4>
                            <p>كل حساب لديه "نقاط علاقة" (Relationship Score) مع كل متابع. هذه النقاط تحدد هل يرى منشوراتك أم لا:</p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>كسب النقاط:</strong>
                                    <ul>
                                        <li>الإعجاب بمنشوراتك: +1 نقطة</li>
                                        <li>التعليق: +3 نقاط</li>
                                        <li>المشاركة: +5 نقاط</li>
                                        <li>الحفظ: +4 نقاط</li>
                                        <li>مشاهدة ستوريزك: +0.5 نقطة</li>
                                        <li>الرد على ستوري: +6 نقاط</li>
                                        <li>إرسال منشورك عبر DM: +8 نقاط</li>
                                    </ul>
                                </li>
                                <li><strong>خسارة النقاط:</strong>
                                    <ul>
                                        <li>عدم التفاعل لمدة 30 يوم: -10 نقاط</li>
                                        <li>إخفاء منشورك: -20 نقطة</li>
                                        <li>إلغاء المتابعة: -100 نقطة (صفر)</li>
                                    </ul>
                                </li>
                                <li><strong>العتبات:</strong>
                                    <ul>
                                        <li>50+ نقطة: يرى كل منشوراتك</li>
                                        <li>20-49 نقطة: يرى 50% من منشوراتك</li>
                                        <li>0-19 نقطة: يرى 10% فقط</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        <h3>الفصل الثاني: سيكولوجية جمهور إنستغرام</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>2.1 العقلية البصرية للجمهور</h4>
                            <p>جمهور إنستغرام مختلف جذرياً عن فيسبوك أو لينكد إن:</p>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>أ. خصائص الجمهور</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>انتباه سريع:</strong> 1.7 ثانية متوسط الوقت قبل التمرير. الخطاف البصري حاسم.</li>
                                <li><strong>تقدير الجماليات:</strong> التصميم الرديء = محتوى غير موثوق في أذهانهم.</li>
                                <li><strong>رغبة في الإلهام:</strong> يبحثون عن محتوى "يجعلهم يريدون أن يكونوا أفضل".</li>
                                <li><strong>ولاء للعلامات:</strong> إذا أحبوا هويتك البصرية، يصبحون متابعين أوفياء.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>ب. دوافع التفاعل</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الإعجاب:</strong> "هذا يعجبني" - تفاعل منخفض الجهد</li>
                                <li><strong>الحفظ:</strong> "هذا مفيد، أريد الرجوع إليه" - تفاعل عالي القيمة</li>
                                <li><strong>المشاركة:</strong> "هذا يمثّلني/أريد الآخرين أن يروا هذا" - أعلى قيمة</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>2.2 أنماط الاستهلاك على إنستغرام</h4>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>أ. الأنماط الزمنية</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>7-9 صباحاً:</strong> تصفح سريع قبل العمل/الدراسة. ستوريز وميمز.</li>
                                <li><strong>12-2 ظهراً:</strong> استراحة. وقت جيد للمنشورات التعليمية.</li>
                                <li><strong>5-7 مساءً:</strong> بعد العمل/الدراسة. تصفح استرخائي.</li>
                                <li><strong>9-11 مساءً:</strong> ذروة الاستخدام. محتوى عميق، ريبوست، بث مباشر.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>ب. سلوكيات التمرير</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>التمرير السريع:</strong> 60% من المستخدمين يمرون على 10+ منشورات في الدقيقة.</li>
                                <li><strong>التوقف الانتقائي:</strong> يتوقفون فقط عند: ألوان جذابة، وجوه، نص كبير واضح.</li>
                                <li><strong>القراءة العميقة:</strong> 5% فقط يقرأون الكابشن الطويل. لكنهم الأكثر قيمة.</li>
                            </ul>
                        </div>

                        <h3>الفصل الثالث: هندسة المحتوى البصري</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>3.1 علم تصميم الكاروسيل</h4>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>أ. تشريح الكاروسيل المثالي</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الشريحة 1 (الخطاف):</strong>
                                    <ul>
                                        <li>عنوان كبير وواضح (40-60 نقطة)</li>
                                        <li>تباين عالي بين النص والخلفية</li>
                                        <li>وعد واضح أو رقم محدد</li>
                                        <li>مثال: "7 أخطاء تدمر مدخراتك"</li>
                                    </ul>
                                </li>
                                <li><strong>الشريحة 2 (المشكلة):</strong>
                                    <ul>
                                        <li>وصف الألم الذي يعانيه الجمهور</li>
                                        <li>إحصائية صادمة أو قصة قصيرة</li>
                                    </ul>
                                </li>
                                <li><strong>الشريحة 3-7 (الحل):</strong>
                                    <ul>
                                        <li>نقطة واحدة لكل شريحة</li>
                                        <li>عنوان + شرح مختصر + مثال بصري</li>
                                        <li>استخدم أرقام، أسهم، دوائر للتركيز</li>
                                    </ul>
                                </li>
                                <li><strong>الشريحة 8 (الدعوة):</strong>
                                    <ul>
                                        <li>ملخص سريع</li>
                                        <li>CTA واضح: "احفظ هذا المنشور"</li>
                                        <li>تذكير بالمتابعة</li>
                                    </ul>
                                </li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>ب. مبادئ التصميم</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>التناسق:</strong> نفس الخطوط، الألوان، والأسلوب في كل كاروسيل.</li>
                                <li><strong>المساحة البيضاء:</strong> لا تملأ كل المساحة. العين تحتاج راحة.</li>
                                <li><strong>التباين:</strong> نص داكن على خلفية فاتحة أو العكس.</li>
                                <li><strong>التسلسل:</strong> عناصر ترشد العين من الأعلى للأسفل، من اليمين لليسار.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>3.2 كتابة الكابشن المثالي</h4>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>أ. هيكل الكابشن</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>السطر الأول:</strong> يجب أن يكمل الخطاف البصري. لا تكرر ما في الصورة.</li>
                                <li><strong>الفقرات 1-3:</strong> قدّم قيمة إضافية غير موجودة في الصور.</li>
                                <li><strong>الفقرة الأخيرة:</strong> CTA واضح ومحدد.</li>
                                <li><strong>الهاشتاغات:</strong> في النهاية، مفصولة بأسطر فارغة.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>ب. أطوال الكابشن</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>قصير (50-100 كلمة):</strong> للمنشورات البصرية القوية، الميمز.</li>
                                <li><strong>متوسط (150-300 كلمة):</strong> للكاروسيل التعليمي.</li>
                                <li><strong>طويل (400-800 كلمة):</strong> للقصص الشخصية، الدروس العميقة.</li>
                            </ul>
                        </div>

                        <h3>الفصل الرابع: استراتيجيات النمو المتقدمة</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>4.1 استراتيجية "المغناطيس البصري" (Visual Magnet)</h4>
                            <p>اجعل هويتك البصرية لا تُنسى:
                            </p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>اختر 2-3 ألوان أساسية واستخدمها دائماً</li>
                                <li>خط واحد أو خطين كحد أقصى</li>
                                <li>نفس نمط الصور (فلاتر، إضاءة، زوايا)</li>
                                <li>بعد 10 منشورات، يجب أن يتعرف المتابع على محتواك من ثومبنايل فقط</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>4.2 استراتيجية "الستوري التفاعلي" (Interactive Stories)</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الصباح (9-10 صباحاً):</strong> ستوري ترحيب + سؤال تفاعلي (Poll/Quiz)</li>
                                <li><strong>الظهيرة (1-2 ظهراً):</strong> وراء الكواليس + صندوق أسئلة</li>
                                <li><strong>المساء (8-9 مساءً):</strong> ملخص اليوم + CTA للمنشور الرئيسي</li>
                                <li><strong>الهدف:</strong> 3-5 ستوريز يومياً للحفاظ على العلاقة</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>4.3 استراتيجية "الريبوست التعليمي" (Educational Reels)</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>حوّل أفضل كاروسيلاتك إلى ريبوست 30-60 ثانية</li>
                                <li>استخدم صوت تريند في مجالك</li>
                                <li>النص على الشاشة ضروري (80% يشاهدون بدون صوت)</li>
                                <li>أول 3 ثواني حاسمة - ضع أهم معلومة</li>
                            </ul>
                        </div>

                        <h3>الفصل الخامس: التحليلات والقياس</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>5.1 المقاييس الأساسية</h4>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>أ. مقاييس المنشورات</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Reach:</strong> عدد الحسابات الفريدة التي رأت منشورك</li>
                                <li><strong>Impressions:</strong> عدد مرات ظهور منشورك (قد يكون نفس الشخص عدة مرات)</li>
                                <li><strong>Saves:</strong> أهم مقياس للمحتوى التعليمي</li>
                                <li><strong>Shares:</strong> مقياس الفيروسية</li>
                                <li><strong>Engagement Rate:</strong> (لايك + تعليق + حفظ + مشاركة) ÷ Reach × 100</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>ب. مقاييس الستوريز</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Completion Rate:</strong> نسبة من أكملوا جميع ستوريزك. الهدف: 60%+</li>
                                <li><strong>Exit Rate:</strong> نسبة من غادروا عند ستوري معينة. حدد المحتوى الضعيف.</li>
                                <li><strong>Reply Rate:</strong> نسبة من ردوا على ستوري.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ background: 'linear-gradient(135deg, rgba(220, 39, 67, 0.2) 0%, rgba(220, 39, 67, 0.05) 100%)', border: '2px solid rgba(220, 39, 67, 0.3)' }}>
                            <h4> قائمة التحقق النهائية لإنستغرام</h4>
                            <p>قبل نشر أي منشور:
                            </p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '2' }}>
                                <li> الشريحة الأولى جذابة وتخلق فضولاً</li>
                                <li> التصميم متناسق مع هويتك البصرية</li>
                                <li> النص في الصور مقروء على الجوال</li>
                                <li> الكابشن يضيف قيمة غير موجودة في الصور</li>
                                <li> هناك CTA واضح في نهاية الكابشن</li>
                                <li> الهاشتاغات ذات صلة (5-10 هاشتاغ)</li>
                                <li> تنشر في الوقت الأمثل</li>
                                <li> مستعد للرد على التعليقات في أول ساعة</li>
                                <li> تشارك المنشور في ستوري مع CTA</li>
                            </ul>
                        </div>

                        <h3>الفصل السادس: المصطلحات التقنية المتقدمة لإنستغرام</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>6.1 مصطلحات الوصول والانطباعات</h4>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>أ. أنواع الوصول</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Accounts Reached (الحسابات التي تم الوصول إليها):</strong> عدد الحسابات الفريدة التي رأت محتواك.</li>
                                <li><strong>Impressions (الانطباعات):</strong> إجمالي مرات الظهور (نفس الشخص قد يحسب عدة مرات).</li>
                                <li><strong>Non-Followers Reach (وصول غير المتابعين):</strong> نسبة الوصول من أشخاص لا يتابعونك. مؤشر قوي على الفيروسية.</li>
                                <li><strong>Followers Reach (وصول المتابعين):</strong> نسبة الوصول من متابعيك الحاليين.</li>
                                <li><strong>Home Feed Reach:</strong> الوصول من الصفحة الرئيسية.</li>
                                <li><strong>Explore Reach:</strong> الوصول من صفحة الاستكشاف - مؤشر على أن الخوارزمية تروج لمحتواك.</li>
                                <li><strong>Hashtag Reach:</strong> الوصول من الهاشتاغات.</li>
                                <li><strong>Profile Reach:</strong> الوصول من زيارة البروفايل مباشرة.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>6.2 مصطلحات التفاعل المتخصصة</h4>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>أ. مقاييس الكاروسيل</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Swipe-Forward Rate (معدل السحب للأمام):</strong> نسبة من انتقلوا من الشريحة 1 للشريحة 2. الهدف: 70%+.</li>
                                <li><strong>Swipe-Back Rate (معدل السحب للخلف):</strong> نسبة من أعادوا مشاهدة شريحة سابقة. مؤشر على محتوى معقد أو مثير للاهتمام.</li>
                                <li><strong>Exit Rate (معدل الخروج):</strong> نسبة من غادروا عند شريحة معينة. حدد الشريحة الضعيفة.</li>
                                <li><strong>Completion Rate (معدل الإكمال):</strong> نسبة من شاهدوا جميع الشرائح. الهدف: 40%+ للكاروسيل 8 شرائح.</li>
                                <li><strong>Average Time Spent (متوسط الوقت المستغرق):</strong> الوقت الكلي الذي قضاه المستخدم على الكاروسيل.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>ب. مقاييس الريبوست</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Plays (المشاهدات):</strong> عدد مرات تشغيل الفيديو.</li>
                                <li><strong>3-Second Views:</strong> مشاهدات تجاوزت 3 ثواني.</li>
                                <li><strong>Average Watch Time:</strong> متوسط وقت المشاهدة بالثواني.</li>
                                <li><strong>Watch-Through Rate:</strong> نسبة من شاهدوا حتى النهاية.</li>
                                <li><strong>Replays (إعادة المشاهدة):</strong> عدد المرات التي أُعيد تشغيل الفيديو فيها.</li>
                                <li><strong>Audio Saves:</strong> عدد من حفظوا الصوت المستخدم - مهم للتريند.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>ج. مقاييس الستوريز</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Story Reach:</strong> عدد الحسابات الفريدة التي شاهدت ستوري واحد على الأقل.</li>
                                <li><strong>Completion Rate:</strong> نسبة من أكملوا جميع ستوريزك المتتالية.</li>
                                <li><strong>Forward Taps:</strong> عدد النقرات للانتقال للستوري التالية.</li>
                                <li><strong>Back Taps:</strong> عدد النقرات للعودة للستوري السابقة - مؤشر على محتوى معقد.</li>
                                <li><strong>Next Story Swipes:</strong> عدد من انتقلوا لستوري حساب آخر - مؤشر سلبي.</li>
                                <li><strong>Exits:</strong> عدد من غادروا مشاهدة الستوريز تماماً.</li>
                                <li><strong>Reply Rate:</strong> نسبة من ردوا على الستوري.</li>
                                <li><strong>Sticker Taps:</strong> عدد النقرات على الستكرات التفاعلية.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>6.3 مصطلحات النمو والاحتفاظ</h4>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>أ. مقاييس المتابعين</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Follows (المتابعون الجدد):</strong> عدد المتابعين الجدد في فترة زمنية.</li>
                                <li><strong>Unfollows (إلغاء المتابعة):</strong> عدد من ألغوا المتابعة.</li>
                                <li><strong>Net Follows (صافي المتابعين):</strong> المتابعون الجدد - إلغاء المتابعة.</li>
                                <li><strong>Follow Rate (معدل المتابعة):</strong> (المتابعون الجدد ÷ زيارات البروفايل) × 100. الهدف: 20%+.</li>
                                <li><strong>Follower Growth Rate (معدل نمو المتابعين):</strong> (النمو الصافي ÷ إجمالي المتابعين) × 100.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>ب. مقاييس العلاقة</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>DM Conversations (محادثات الرسائل):</strong> عدد المحادثات النشطة في الرسائل المباشرة.</li>
                                <li><strong>Share Rate (معدل المشاركة):</strong> (المشاركات ÷ الوصول) × 100. مؤشر على محتوى "قابل للمشاركة".</li>
                                <li><strong>Save Rate (معدل الحفظ):</strong> (الحفظ ÷ الوصول) × 100. أهم مقياس للمحتوى التعليمي.</li>
                                <li><strong>Mention Rate (معدل الذكر):</strong> عدد المرات التي ذُكر فيها حسابك في ستوريات الأخرين.</li>
                            </ul>
                        </div>

                        <h3>الفصل السابع: دراسات حالة عملية لإنستغرام</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>7.1 دراسة حالة: حساب اقتصادي وصل لـ 100K متابع في 6 أشهر</h4>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>أ. الخلفية</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الحساب:</strong> @MoneyMinds_AR - توعية مالية للشباب</li>
                                <li><strong>البداية:</strong> 0 متابع، يناير 2026</li>
                                <li><strong>النتيجة:</strong> 103,000 متابع، يونيو 2026</li>
                                <li><strong>الميزانية:</strong> 500 دولار إعلانات (5%)</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>ب. الاستراتيجية</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الشهر 1-2:</strong> كاروسيل يومي (8 شرائح) + 5 ستوريز يومياً. هوية بصرية موحدة (أزرق + أصفر).</li>
                                <li><strong>الشهر 3-4:</strong> إضافة ريبوست أسبوعي + Collaboration مع 4 حسابات مشابهة.</li>
                                <li><strong>الشهر 5-6:</strong> إطلاق سلسلة "اقتصاد في 60 ثانية" + بث مباشر أسبوعي.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>ج. الأرقام</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>إجمالي المنشورات:</strong> 365 كاروسيل + 1800 ستوري + 24 ريبوست</li>
                                <li><strong>أفضل كاروسيل:</strong> "5 عادات مالية للأغنياء" - 3.2 مليون وصول، 85K حفظ</li>
                                <li><strong>متوسط Engagement Rate:</strong> 7.2%</li>
                                <li><strong>متوسط Save Rate:</strong> 4.8% (أعلى من المتوسط بـ 3x)</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>د. المفاتيح الرئيسية للنجاح</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>الهوية البصرية الموحدة جعلت الحساب "قابل للتعرف" فوراً في الـ Explore.</li>
                                <li>الستوريز اليومية حافظت على العلاقة مع المتابعين الحاليين.</li>
                                <li>التعاون مع حسابات مشابهة ضاعف النمو 3x في الشهر 3-4.</li>
                                <li>الريبوست الأسبوعي جلب جمهور جديد لم يكن ليكتشف الحساب.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>7.2 دراسة حالة: ريبوست فيروسي وصل لـ 10 مليون مشاهدة</h4>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>أ. تشريح الريبوست</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>المدة:</strong> 47 ثانية</li>
                                <li><strong>النوع:</strong> نص على شاشة مع صوت تريند</li>
                                <li><strong>الموضوع:</strong> "لو بدأت من الصفر اليوم، هذا ما سأفعله"</li>
                                <li><strong>الأداء:</strong> 10.3 مليون مشاهدة، 450K مشاركة�� 85K متابع جديد</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>ب. لماذا نجح؟</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>أول 3 ثواني:</strong> "لو خسرت كل فلوسي اليوم..." - صدمة فورية.</li>
                                <li><strong>الصوت:</strong> استخدم صوت تريند (2M استخدام وقتها).</li>
                                <li><strong>القيمة:</strong> 5 خطوات عملية قابلة للتطبيق.</li>
                                <li><strong>القابلية للمشاركة:</strong> المحتوى "يمثّل" الطموح المالي للشباب.</li>
                                <li><strong>التوقيت:</strong> نُشر الساعة 9 مساءً الأحد - ذروة الاستخدام.</li>
                            </ul>
                        </div>

                        <h3>الفصل الثامن: أدوات احترافية لإنستغرام</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>8.1 أدوات التصميم والفيديو</h4>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>أ. للكاروسيل</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Canva Pro:</strong> الأفضل. استخدم "Magic Resize" لتحويل التصاميم.</li>
                                <li><strong>Figma:</strong> للمحترفين. أنشئ "Component Library" لهويتك.</li>
                                <li><strong>Adobe Illustrator:</strong> للتحكم الكامل في العناصر المتجهة.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>ب. للريبوست</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>CapCut:</strong> مجاني، قوي، يحتوي على تريندات.</li>
                                <li><strong>InShot:</strong> بديل جيد، سهل الاستخدام.</li>
                                <li><strong>Premiere Rush:</strong> للمحترفين، تكامل مع Adobe.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#e6683c' }}>ج. للستوريز</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Unfold:</strong> قوالب ستوري احترافية.</li>
                                <li><strong>Mojo:</strong> قوالب متحركة جذابة.</li>
                                <li><strong>Canva:</strong> شامل لكل الأنواع.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>8.2 أدوات التحليل والجدولة</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Instagram Insights:</strong> مجاني، كافٍ للبداية.</li>
                                <li><strong>Meta Business Suite:</strong> تحليلات أعمق + جدولة.</li>
                                <li><strong>Later:</strong> جدولة بصرية، تحليلات جيدة.</li>
                                <li><strong>Hootsuite:</strong> للفرق الكبيرة.</li>
                                <li><strong>Social Blade:</strong> لتتبع النمو ومقارنة المنافسين.</li>
                                <li><strong>Phlanx:</strong> لحساب Engagement Rate بدقة.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ background: 'linear-gradient(135deg, rgba(220, 39, 67, 0.25) 0%, rgba(220, 39, 67, 0.1) 100%)', border: '2px solid rgba(220, 39, 67, 0.4)' }}>
                            <h4> شهادة إتمام دليل إنستغرام</h4>
                            <p>إذا قرأت وفهمت كل الفصول الـ 8، فأنت تمتلك الآن:</p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '2' }}>
                                <li> فهماً عميقاً لخوارزميات إنستغرام الأربع</li>
                                <li> معرفة بـ 40+ مصطلحاً تقنياً متخصصاً</li>
                                <li> قدرة على تحليل أداء الكاروسيل والريبوست والستوريز</li>
                                <li> استراتيجيات نمو مُجرّبة ومثبتة</li>
                                <li> أدوات عملية للتطبيق الفوري</li>
                            </ul>
                            <p style={{ marginTop: '1rem', fontWeight: 'bold', fontSize: '1.1rem' }}>تذكّر: إنستغرام منصة بصرية. الجماليات + القيمة = النجاح.</p>
                        </div>
                                                </div>
                        </details>
                    </section>

                    <section id="warnings">
                        <details className="toggle-section">
                            <summary>
                                <h2><span>️</span> تحذيرات وقوانين إنستغرام الجازمة</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">

                        <div className="warning-box" style={{ borderColor: '#fca5a5', background: 'rgba(220, 39, 67, 0.1)' }}>
                            <div className="icon"></div>
                            <div>
                                <h4>النص داخل الصورة كثيف ومزعج</h4>
                                <p>لا تملأ الصور في الكاروسيل بنصوص طويلة معقدة. إنستغرام يخفض الوصول للصور التي تشبه "الجرائد". اجعلها عناوين، ونقاط، ومساحات فارغة مريحة للعين، والشرح بالتفصيل في الـ Caption.</p>
                            </div>
                        </div>

                        <div className="warning-box">
                            <div className="icon">️</div>
                            <div>
                                <h4>هاشتاغات عشوائية</h4>
                                <p>استخدام هاشتاغات غير متعلقة بالاقتصاد والمحتوى سيشوش الخوارزمية الدلالية. استخدم 5-10 هاشتاغات دقيقة للغاية.</p>
                                <p style={{ marginTop: '10px', fontSize: '14px', color: '#a0a0a0' }}><strong>الاستراتيجية الصحيحة:</strong> 3 هاشتاغات كبيرة (100K+)، 3 متوسطة (10K-100K)، 3 صغيرة (أقل من 10K).</p>
                            </div>
                        </div>

                        <div className="warning-box">
                            <div className="icon"></div>
                            <div>
                                <h4>الردود المكررة كالروبوت</h4>
                                <p>الردود بـ (إيموجي نار أو تصفيق) على جميع التعليقات يجعلك مصنف كنشاط روبوتي (Bot-like behavior). يجب أن ترد بجمل طبيعية ومتنوعة لتفعيل الحوار.</p>
                            </div>
                        </div>

                        <div className="warning-box">
                            <div className="icon"></div>
                            <div>
                                <h4>شراء المتابعين والبوتات</h4>
                                <p>إنستغرام يكتشف الحسابات الوهمية ويحذفها دورياً. شراء متابعين يدمر نسبة التفاعل (Engagement Rate) ويقتل وصولك العضوي نهائياً.</p>
                            </div>
                        </div>

                        <div className="warning-box">
                            <div className="icon"></div>
                            <div>
                                <h4>حقوق الموسيقى والمحتوى</h4>
                                <p>استخدام موسيقى محمية بحقوق الطبع والنشر في منشوراتك التجارية قد يؤدي لحذف المحتوى أو كتم الصوت. استخدم مكتبة إنستغرام الرسمية أو موسيقى خالية من الحقوق.</p>
                            </div>
                        </div>

                        <div className="info-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, rgba(220, 39, 67, 0.15) 0%, rgba(220, 39, 67, 0.05) 100%)' }}>
                            <h4> لوحة متابعة الأداء الأسبوعي (KPIs Dashboard)</h4>
                            <ul>
                                <li><strong>Reach (الوصول):</strong> كم حساب شاهد محتواك هذا الأسبوع؟ الهدف: +20% أسبوعياً.</li>
                                <li><strong>Saves Rate:</strong> عدد الحفظ ÷ الوصول × 100. الهدف: 3%+ للكاروسيل التعليمي.</li>
                                <li><strong>Shares Rate:</strong> عدد المشاركات ÷ الوصول × 100. الهدف: 2%+.</li>
                                <li><strong>Profile Visits:</strong> كم شخص زار بروفايلك من المنشورات؟ الهدف: 500+ أسبوعياً.</li>
                                <li><strong>Follows from Posts:</strong> كم متابع جديد جاء من كل منشور؟</li>
                                <li><strong>Story Completion Rate:</strong> نسبة من أكمل مشاهدة ستوريزك. الهدف: 60%+.</li>
                            </ul>
                        </div>
                                                </div>
                        </details>
                    </section>
                </div>
                </main>
            </div>
        </div>
    );
};
