import React, { useEffect } from 'react';
import './plans.css';

export const LinkedInPlan = () => {
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
        <div className="plan-container linkedin-plan" style={{ '--platform-color': '#0a66c2' } as any}>
            <div className="bg-glow top-right"></div>
            <div className="bg-glow bottom-left"></div>

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
                        <div className="badge">الهدف: 10,000 متابع خلال 60 يوم</div>
                        <h1>خطة احترافية لمنصة لينكد إن (LinkedIn)</h1>
                        <p>دليل تنفيذي شامل يعتمد على خوارزميات 2026 (التي يُطلق عليها داخلياً 360 Brew)، مخصص لنشر المحتوى الاقتصادي والتوعوي بأسلوب قوي، ويضمن لك التفوق في الوصول المستهدف.</p>
                    </header>

                    <div className="sections-wrapper">
                    <section>
                        <details className="toggle-section">
                            <summary>
                                <h2><span></span> خوارزميات لينكد إن 2026 والجمهور</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">
                        <div className="grid-2">
                            <div className="info-card">
                                <h4>نظام الفلترة المسبقة (Phase 1)</h4>
                                <p>يختبر لينكد إن منشورك في أول 90 دقيقة مع عينة صغيرة من المتابعين. إن كان التفاعل الأولي (تعليقات عميقة وردودك عليها) ممتازاً، يتوسع العرض للإمبراطورية الأكبر. إن كان ضعيفاً، يُحجم.</p>
                                <p style={{ marginTop: '10px', fontSize: '14px', color: '#a0a0a0' }}><strong>تكتيك:</strong> كن متواجداً للرد على أي تعليق في أول 90 دقيقة بعد النشر. هذه الفترة حاسمة.</p>
                            </div>
                            <div className="info-card">
                                <h4>المقاييس الأكثر أهمية (Phase 2)</h4>
                                <ul>
                                    <li><strong>وقت القراءة (Dwell Time):</strong> هو الملك المطلق. كلما قرأ المستهلك المنشور أو قلب الكاروسيل ببطء، تفجر وصولك.</li>
                                    <li><strong>الحفظ (Saves):</strong> إشارة قوية جداً للمحتوى التعليمي بأن له قيمة عالية ويعتبر أهم من اللايك.</li>
                                    <li><strong>المشاركة (Shares):</strong> قوة دفع عظيمة للوصول خارج شبكتك.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="info-card" style={{ marginTop: '1.5rem' }}>
                            <h4>فيصل التخصص (AI Contextual Relevance)</h4>
                            <p>الخوارزمية في 2026 تعتمد تحليل الدلالات والسياق. يجب أن يظل محتواك في إطار الاقتصاد والتوعية، ليقوم النظام بتصنيفك كـ "Economic Creator" ويقوم بتوجيه محتواك لمن يبحث عن أمور التمويل وريادة الأعمال تلقائياً.</p>
                        </div>
                        <div className="info-card" style={{ marginTop: '1.5rem' }}>
                            <h4>إشارات الخوارزمية الأساسية (Ranking Signals)</h4>
                            <ul>
                                <li><strong>التعليقات ذات الجودة:</strong> التعليقات التي تتجاوز 15 كلمة وتحوي نقاشاً حقيقياً هي الأقوى وزناً.</li>
                                <li><strong>إعادة النشر (Reposts):</strong> عندما يعيد شخص مشاركة منشورك مع إضافة رأيه، هذه إشارة فيروسية قوية.</li>
                                <li><strong>النقر على "See More":</strong> إذا توقف المستخدم وقرأ منشورك الطويل، الخوارزمية تفهم أن المحتوى قيم.</li>
                                <li><strong>التفاعل من خارج الشبكة:</strong> إذا تفاعل أشخاص ليسوا على اتصال بك، هذا يعني أن المحتوى يستحق الانتشار الواسع.</li>
                                <li><strong>الملف الشخصي للناشر:</strong> الحسابات النشطة التي تنشر بانتظام وتحصل على تفاعل مستمر تحصل على أولوية أعلى.</li>
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
                                <h4>معدل النشر والهيكل</h4>
                                <p><strong>المعدل:</strong> 5 منشورات أسبوعياً. (لا تتعدى منشور واحد كل 18 ساعة لتجنب الضوضاء)</p>
                                <p><strong>هيكل المنشور المثالي:</strong> الخطاف (Hook) القوي في أول سطرين ⟵ القيمة أو الفكرة ⟵ نقاط واضحة ⟵ سؤال حقيقي للنقاش، وروابط في أول تعليق.</p>
                                <p style={{ marginTop: '10px', fontSize: '14px', color: '#a0a0a0' }}><strong>نصيحة ذهبية:</strong> اترك مسافة بيضاء بين الفقرات لتسهيل القراءة على الجوال. استخدم سطر واحد فقط لكل فكرة.</p>
                            </div>
                            <div className="info-card">
                                <h4>توزيع المحتوى أسبوعياً</h4>
                                <ul>
                                    <li><strong>الإثنين (كاروسيل):</strong> مفاهيم توعوية، يبقي المستخدم وقتاً طويلاً.</li>
                                    <li><strong>الثلاثاء (نص وصورة):</strong> خطأ مالي أو حقيقة اقتصادية سريعة.</li>
                                    <li><strong>الأربعاء (كاروسيل):</strong> دروس مالية وقواعد ذهبية.</li>
                                    <li><strong>الخميس (نص وصورة):</strong> أسئلة نقاشية للجمهور.</li>
                                    <li><strong>السبت (كاروسيل):</strong> نصائح معمقة ومقارنات قوية.</li>
                                    <li><strong>أفضل الأوقات:</strong> 8-10 صباحاً، 12-1 ظهراً، 5-6 مساءً (أوقات العمل والاستراحة).</li>
                                </ul>
                            </div>
                        </div>
                        <div className="info-card" style={{ marginTop: '1.5rem' }}>
                            <h4>هيكل المنشور المثالي (Anatomy of a Viral LinkedIn Post)</h4>
                            <ul>
                                <li><strong>السطر 1-2 (Hook):</strong> جملة صادمة أو إحصائية غير متوقعة. يجب أن تجبر القارئ على النقر على "See More".</li>
                                <li><strong>الفقرة 1 (Problem):</strong> حدد المشكلة أو التحدي الذي يواجهه المحترفون.</li>
                                <li><strong>الفقرة 2-4 (Value):</strong> قدم الحلول، الخطوات، أو الدروس المستفادة.</li>
                                <li><strong>الفقرة الأخيرة (CTA/Question):</strong> سؤال مفتوح يحفز النقاش المهني العميق.</li>
                                <li><strong>الهاشتاغات:</strong> 3-5 هاشتاغات دقيقة في نهاية المنشور.</li>
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
                            <h3>المرحلة الأولى: تهيئة الحساب (الأيام 1–3) <span className="phase-badge">الأساسيات</span></h3>
                            <div className="phase-content">
                                <div className="goal">الهدف: إثبات احترافية الحساب للخوارزمية وإبهار الزوار الجدد.</div>
                                <ul>
                                    <li><strong>صورة واسم وغلاف:</strong> احترافية واضحة، وغلاف يحتوي رسالة واضحة (مثال: تبسيط الاقتصاد والوعي المالي).</li>
                                    <li><strong>البايو (About):</strong> يجب أن يحتوي صراحة (من أنت، ماذا تفعل، ماذا سيستفيد القارئ).</li>
                                    <li><strong>التحضير:</strong> تجهيز 10 منشورات (نصوص وصور وكاروسيلات) للبدء في النشر فوراً بقوة.</li>
                                    <li><strong>Headline:</strong> استخدم صيغة واضحة: "أساعد X على تحقيق Y من خلال Z" مثال: "أساعد الشباب على تحقيق الاستقرار المالي من خلال التوعية الاقتصادية".</li>
                                    <li><strong>Featured Section:</strong> أضف أفضل كاروسيل أو منشورين في قسم Featured كواجهة.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="phase-card">
                            <h3>المرحلة الثانية: بناء الزخم (الأسابيع 1-2) <span className="phase-badge">أول 1500 متابع</span></h3>
                            <div className="phase-content">
                                <div className="goal">الهدف: إرساء قواعد الخوارزمية عبر التفاعل القوي والمستمر.</div>
                                <ul>
                                    <li>النشر بوتيرة ثابتة (5 منشورات بالأسبوع) وفقاً للجدول.</li>
                                    <li>التفاعل اليومي مع المنشورات: الرد الفوري في أول 90 دقيقة لكل تعليق.</li>
                                    <li>إرسال 50 طلب تواصل يومياً لشريحة مستهدفة (موظفو قطاع مالي، رواد أعمال). بإجمالي 3000 خلال الشهرين.</li>
                                    <li>كتابة 10 تعليقات "عميقة" على منشورات لكبار الصناع الاقتصاديين لجر الزيارات لحسابك.</li>
                                    <li><strong>Comment Strategy:</strong> اكتب تعليقات تضيف قيمة، لا تكتب "مشاركة رائعة". بل "نقطة مهمة، أضيف أن..."</li>
                                </ul>
                            </div>
                        </div>

                        <div className="phase-card">
                            <h3>المرحلة الثالثة: الانتشار الفيروسي (الأسابيع 4-8) <span className="phase-badge">الوصول لـ 10,000</span></h3>
                            <div className="phase-content">
                                <div className="goal">الهدف: اختراق فلاتر التوصية ليصل المحتوى إلى جمهور غير متابع عبر الكاروسيلات.</div>
                                <ul>
                                    <li>تكثيف التركيز على المحتوى الفيروسي، مثل كاروسيلات "أخطاء مالية شائعة" أو "حقائق صادمة عن المال".</li>
                                    <li>الاهتمام بمؤشرات التحليل Analytics: مراجعة أي أنواع تجلب (الحفظ / Saves) والمشاركة (Shares) وتكرارها.</li>
                                    <li>الحفاظ على نفس الوتيرة ونفس جودة الـ (Hook) والأسئلة لضمان نقاش مستمر يحافظ على التصنيف المرتفع.</li>
                                    <li><strong>Collaborative Articles:</strong> شارك في المقالات التعاونية في مجالك بخبراتك.</li>
                                    <li><strong>Newsletter:</strong> أطلق نشرة لينكد إن أسبوعية لتلخيص أهم الدروس.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="phase-card" style={{ marginTop: '1.5rem' }}>
                            <h3>المرحلة الرابعة: الترسخ والسلطة (الأسابيع 9-12) <span className="phase-badge">ما بعد 10K</span></h3>
                            <div className="phase-content">
                                <div className="goal">الهدف: ترسيخ مكانتك كصوت مؤثر في المجال الاقتصادي.</div>
                                <ul>
                                    <li><strong>LinkedIn Live:</strong> بث مباشر شهري مع خبير اقتصادي أو رائد أعمال.</li>
                                    <li><strong>Podcast/Video:</strong> أطلق سلسلة فيديو قصيرة (3-5 دقائق) تلخص أهم الدروس.</li>
                                    <li><strong>Community Building:</strong> أنشئ مجموعة لينكد إن متخصصة في الاقتصاد والوعي المالي.</li>
                                    <li><strong>Analytics Mastery:</strong> راجع Analytics أسبوعياً لمعرفة أفضل الأوقات، الصيغ، والمواضيع.</li>
                                    <li><strong>Thought Leadership:</strong> شارك برأيك في الأحداث الاقتصادية الكبرى خلال 24 ساعة من وقوعها.</li>
                                </ul>
                            </div>
                        </div>
                                                </div>
                        </details>
                    </section>

                    <section id="content-types">
                        <details className="toggle-section">
                            <summary>
                                <h2><span></span> 30 نوع منشورات قوية (الأفكار الجاهزة)</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">
                        <div className="content-types-list">
                            <div className="type-item">
                                <span className="num">01</span>
                                <strong>منشور "3 حقائق"</strong>
                                <span>كاروسيل: 3 حقائق اقتصادية لا يخبرك بها أحد.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">02</span>
                                <strong>منشور "أخطاء شائعة"</strong>
                                <span>كاروسيل: 7 أخطاء مالية يقع فيها الموظفون.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">03</span>
                                <strong>منشور "شرح مفهوم"</strong>
                                <span>نص+صورة: ما هو التضخم ببساطة؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">04</span>
                                <strong>منشور "إحصائية صادمة"</strong>
                                <span>صورة+تحليل: 70% من الناس بلا خطة مالية.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">05</span>
                                <strong>درس اقتصادي</strong>
                                <span>نص+صورة: درس واحد مستفاد من أزمة 2008.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">06</span>
                                <strong>منشور "قبل وبعد"</strong>
                                <span>كاروسيل: كيف تغير الاقتصاد خلال 20 سنة.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">07</span>
                                <strong>معلومة يومية</strong>
                                <span>نص+صورة: معلومة التمويل الشخصي خلال 30 ثانية.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">08</span>
                                <strong>تفكيك فكرة</strong>
                                <span>كاروسيل: هل القروض دائماً سيئة؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">09</span>
                                <strong>تحليل خبر</strong>
                                <span>نص+صورة: ماذا يعني رفع معدل الفائدة للبنك الفيدرالي؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">10</span>
                                <strong>المقارنات (الأقوى)</strong>
                                <span>كاروسيل: عقلية الادخار مقابل عقلية الاستثمار.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">11</span>
                                <strong>قائمة أدوات</strong>
                                <span>كاروسيل: 5 أدوات لإدارة أموالك، أو مصادر الدخل.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">12</span>
                                <strong>قواعد ذهبية</strong>
                                <span>كاروسيل: 7 قواعد للنجاح المالي وتجنب الديون.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">13</span>
                                <strong>الأسئلة الشائعة</strong>
                                <span>كاروسيل: أجوبة لأكثر 5 أسئلة طرحها المبتدئون في الاستثمار.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">14</span>
                                <strong>خريطة الطريق</strong>
                                <span>كاروسيل: دليلك خطوة بخطوة لبناء الاستقلال المالي المبكر.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">15</span>
                                <strong>القصة الملهمة</strong>
                                <span>نص+صورة: قصة انهيار شركة لعدم إدارة السيولة، وماذا نتعلم.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">16</span>
                                <strong>تحليل الظواهر</strong>
                                <span>نص+صورة: لماذا ترتفع أسعار العقارات بصورة قياسية وسبل التعامل..</span>
                            </div>
                            <div className="type-item">
                                <span className="num">17</span>
                                <strong>دروس من الفشل</strong>
                                <span>كاروسيل: 5 شركات كبرى أفلسَت وماذا نتعلم منها.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">18</span>
                                <strong>التنبؤات الاقتصادية</strong>
                                <span>نص+صورة: 3 اتجاهات اقتصادية ستشكل العام القادم.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">19</span>
                                <strong>نصائح للمسؤولين</strong>
                                <span>كاروسيل: 7 دروس مالية يجب أن يتعلمها كل مدير تنفيذي.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">20</span>
                                <strong>الرواتب والتفاوض</strong>
                                <span>نص+صورة: كيف تتفاوض على راتبك بنسبة زيادة 30%؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">21</span>
                                <strong>الاستثمار المؤسسي</strong>
                                <span>كاروسيل: كيف تستثمر الشركات فائض السيولة؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">22</span>
                                <strong>ريادة الأعمال</strong>
                                <span>كاروسيل: 5 أخطاء مالية تقتل الشركات الناشئة.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">23</span>
                                <strong>التخطيط الضريبي</strong>
                                <span>كاروسيل: استراتيجيات قانونية لتقليل العبء الضريبي.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">24</span>
                                <strong>إدارة المخاطر</strong>
                                <span>نص+صورة: كيف تحمي ثروتك من التقلبات الاقتصادية؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">25</span>
                                <strong>قصص نجاح عربية</strong>
                                <span>كاروسيل: قصة نجاح شركة ناشئة عربية من الصفر إلى الملايين.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">26</span>
                                <strong>الذكاء المالي</strong>
                                <span>كاروسيل: 7 كتب غيرت مفهومي للمال والاستثمار.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">27</span>
                                <strong>التقاعد والاستثمار</strong>
                                <span>كاروسيل: كيف تبني محفظة تقاعدية متوازنة؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">28</span>
                                <strong>العملات والاستثمار الأجنبي</strong>
                                <span>نص+صورة: متى تستثمر بعملات أجنبية ولماذا؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">29</span>
                                <strong>تحليل شخصيات ناجحة</strong>
                                <span>كاروسيل: العادات المالية لـ وارين بافيت التي يمكنك تطبيقها.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">30</span>
                                <strong>درس الأسبوع</strong>
                                <span>نص+صورة: أهم درس اقتصادي تعلمته هذا الأسبوع.</span>
                            </div>
                        </div>
                                                </div>
                        </details>
                    </section>

                    <section id="warnings">
                        <details className="toggle-section">
                            <summary>
                                <h2><span>️</span> تحذيرات وقواعد خوارزمية خطيرة</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">

                        <div className="warning-box">
                            <div className="icon"></div>
                            <div>
                                <h4>الروابط الخارجية تميت الوصول</h4>
                                <p>استخدام الروابط في نص المنشور جريمة في حق الخوارزمية، لأن لينكد إن لا ترغب في خروج القارئ. ضع الرابط دائماً في تعليق وقم بالإشارة إليه في النص.</p>
                            </div>
                        </div>

                        <div className="warning-box">
                            <div className="icon">️</div>
                            <div>
                                <h4>تعديل المنشور في الساعة الأولى</h4>
                                <p>أي تعديل لخطأ إملائي أو إضافة في أول ساعة من النشر يُعيد عملية احتساب الخوارزمية لتقييم المنشور من الصفر ويُبطل التفاعل الذي حصل عليه.</p>
                            </div>
                        </div>

                        <div className="warning-box">
                            <div className="icon"></div>
                            <div>
                                <h4>الاستقاء من التفاعل الصناعي</h4>
                                <p>الكلمات مثل (علق بـ تم)، (ضع لايك للمزيد)، أو استخدام مجوعات الاستقطاب (Engagement Pods)، ستقوم خوارزميات 2026 باكتشافها وحرمان حسابك من ظهوره الطبيعي.</p>
                            </div>
                        </div>

                        <div className="warning-box">
                            <div className="icon">#️⃣</div>
                            <div>
                                <h4>الهاشتاغات المفرطة</h4>
                                <p>استخدم 3 هاشتاغات قوية فقط (#اقتصاد #وعي_مالي #استثمار). الإكثار منها يُصنف ضمن البريد المزعج (Spam Threshold).</p>
                            </div>
                        </div>

                        <div className="warning-box">
                            <div className="icon"></div>
                            <div>
                                <h4>النشر الآلي والبوتات</h4>
                                <p>استخدام أدوات النشر الآلي غير الرسمية أو البوتات لإرسال رسائل تواصل جماعية قد يؤدي لتقييد حسابك أو حظره نهائياً.</p>
                            </div>
                        </div>

                        <div className="warning-box">
                            <div className="icon"></div>
                            <div>
                                <h4>المحتوى غير المهني</h4>
                                <p>لينكد إن منصة مهنية. تجنب المحتوى السياسي الحاد، الجدالات الشخصية، أو أي محتوى قد يُعتبر غير لائق لبيئة العمل.</p>
                            </div>
                        </div>

                        <div className="info-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, rgba(10, 102, 194, 0.15) 0%, rgba(10, 102, 194, 0.05) 100%)' }}>
                            <h4> لوحة متابعة الأداء الأسبوعي (KPIs Dashboard)</h4>
                            <ul>
                                <li><strong>Impressions (الانطباعات):</strong> كم مرة ظهر منشورك؟ الهدف: +25% أسبوعياً.</li>
                                <li><strong>Engagement Rate:</strong> (التعليقات + المشاركات + الإعجابات) ÷ الانطباعات × 100. الهدف: 3%+ للمنشورات الاقتصادية.</li>
                                <li><strong>Connection Requests:</strong> كم طلب تواصل جديد تلقيت؟ الهدف: 100+ أسبوعياً.</li>
                                <li><strong>Profile Views:</strong> كم شخص زار ملفك الشخصي؟ الهدف: 200+ أسبوعياً.</li>
                                <li><strong>Search Appearances:</strong> كم مرة ظهرت في نتائج البحث؟</li>
                                <li><strong>Top Performing Post:</strong> حدد المنشور الأفضل وكرر صيغته.</li>
                            </ul>
                        </div>
                                                </div>
                        </details>
                    </section>

                    <section id="education">
                        <details className="toggle-section">
                            <summary>
                                <h2><span></span> الدليل التعليمي الشامل لمسؤولي السوشيال ميديا - لينكد إن</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">

                        <div className="info-card" style={{ marginBottom: '2rem' }}>
                            <h3>مقدمة: لينكد إن 2026 - منصة السلطة المهنية</h3>
                            <p>لينكد إن في 2026 هي المنصة الأكثر قوة للوصول للجمهور المهني وصناع القرار. خوارزميتها فريدة من نوعها لأنها لا تكافئ "الترفيه" بل "القيمة المهنية". هذا يعني أن المحتوى التعليمي العميق يحصل على وصول عضوي أفضل من أي منصة أخرى.</p>
                            <p>كمسؤول سوشيال ميديا، يجب أن تفهم أن لينكد إن يعمل بنظام "السمعة المركبة". كل منشور ناجح يبني سلطتك المهنية، والسلطة تبني الوصول. هذا الدليل سيأخذك في عمق خوارزميات لينكد إن وكيفية استغلالها بذكاء.</p>
                        </div>

                        <h3>الفصل الأول: التشريح العميق لخوارزمية لينكد إن</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>1.1 نظام "360 Brew" - الخوارزمية الشاملة</h4>
                            <p>لينكد إن تستخدم نظاماً متطوراً يسمى داخلياً "360 Brew" يعمل على ثلاث مراحل:</p>

                            <h5 style={{ marginTop: '1rem', color: '#0a66c2' }}>أ. المرحلة الأولى: الفلترة المسبقة (0-90 دقيقة)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>التحليل الدلالي:</strong> الخوارزمية تقرأ منشورك وتفهم موضوعه باستخدام NLP متقدم.</li>
                                <li><strong>التصنيف:</strong> تُصنفك كـ "خبير في X" بناءً على محتوى منشوراتك.</li>
                                <li><strong>الاختبار المصغّر:</strong> تُعرض على 0.5-2% من متابعيك (أقل من فيسبوك).</li>
                                <li><strong>جمع الإشارات:</strong> كل تفاعل يُسجّل ويُحلّل.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#0a66c2' }}>ب. المرحلة الثانية: التوسع المشروط (90 دقيقة - 6 ساعات)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>شرط التوسع:</strong> إذا كان معدل التفاعل {'>'} 2% في المرحلة الأولى.</li>
                                <li><strong>نطاق التوسع:</strong> 10-25% من متابعيك + غير المتابعين المهتمين بالموضوع.</li>
                                <li><strong>إشارة الذهب:</strong> التعليقات الطويلة (15+ كلمة) هي الأقوى وزناً.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#0a66c2' }}>ج. المرحلة الثالثة: الانتشار الفيروسي (6-48 ساعة)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>شرط الفيروسية:</strong> معدل تفاعل {'>'} 5% + مشاركات متعددة.</li>
                                <li><strong>نطاق الانتشار:</strong> 50%+ من متابعيك + ظهور في Explore.</li>
                                <li><strong>مدة الحياة:</strong> منشور لينكد إن يعيش 48-72 ساعة (أطول من المنصات الأخرى).</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>1.2 إشارات الترتيب في لينكد إن</h4>

                            <h5 style={{ marginTop: '1rem', color: '#0a66c2' }}>أ. إشارات التفاعل (مرتببة بالأهمية)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>التعليق الطويل (15+ كلمة):</strong> وزن 10x - يدل على نقاش حقيقي</li>
                                <li><strong>إعادة النشر مع تعليق (Repost with Comment):</strong> وزن 8x</li>
                                <li><strong>المشاركة الخاصة (Send via DM):</strong> وزن 7x</li>
                                <li><strong>التعليق القصير:</strong> وزن 5x</li>
                                <li><strong>الحفظ (Save):</strong> وزن 6x - إشارة قوية للقيمة</li>
                                <li><strong>الإعجاب (Like):</strong> وزن 1x - الأضعف لكنه ضروري</li>
                                <li><strong>النقر على "اقرأ المزيد":</strong> وزن 4x</li>
                                <li><strong>زيارة البروفايل:</strong> وزن 5x</li>
                                <li><strong>المتابعة بعد المنشور:</strong> وزن 15x</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#0a66c2' }}>ب. إشارات الناشر</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Consistency Score:</strong> هل تنشر بانتظام؟ (3-5 مرات أسبوعياً مثالي)</li>
                                <li><strong>Expertise Signal:</strong> هل تلتزم بموضوعك المتخصص؟</li>
                                <li><strong>Response Rate:</strong> هل ترد على التعليقات؟ (80%+ مستهدف)</li>
                                <li><strong>Network Quality:</strong> جودة شبكة علاقاتك (مديرون، صناع قرار؟)</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>1.3 نظام "الخبير المعتمد" (Credentialed Expert System)</h4>
                            <p>لينكد إن يصنف كل ناشر في "مستويات خبرة":</p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>المستوى 1 - مبتدئ:</strong> حساب جديد أو غير نشط. وصول محدود جداً.</li>
                                <li><strong>المستوى 2 - مساهم:</strong> ينشر بانتظام، تفاعل متوسط. وصول عادي.</li>
                                <li><strong>المستوى 3 - خبير:</strong> محتوى متسق في مجال واحد، تفاعل عالي. وصول معزز.</li>
                                <li><strong>المستوى 4 - رائد فكر:</strong> محتوى أصلي، اقتباسات متعددة، ظهور في وسائل الإعلام. وصول فيروسي مستمر.</li>
                            </ul>
                            <p><strong>كيف تصعد المستويات:</strong> 10 منشورات متسقة في نفس المجال + معدل تفاعل 3%+ + شبكة علاقات نشطة.</p>
                        </div>

                        <h3>الفصل الثاني: سيكولوجية الجمهور المهني</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>2.1 العقلية المهنية للجمهور</h4>
                            <p>جمهور لينكد إن في "حالة ذهنية مهنية" - يبحثون عن:</p>

                            <h5 style={{ marginTop: '1rem', color: '#0a66c2' }}>أ. الدوافع الأساسية</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>التطوير المهني:</strong> "كيف أصبح أفضل في وظيفتي؟"</li>
                                <li><strong>التوسع الشبكي:</strong> "من يمكن أن أتعرف عليه؟"</li>
                                <li><strong>البحث عن فرص:</strong> "هل هناك وظيفة/شراكة أفضل؟"</li>
                                <li><strong>بناء السمعة:</strong> "كيف أبدو كخبير في مجالي؟"</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#0a66c2' }}>ب. ما يقدّره الجمهور</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الأصالة:</strong> قصص حقيقية من التجربة، ليس نظريات.</li>
                                <li><strong>القابلية للتطبيق:</strong> "ماذا أفعل غداً في عملي؟"</li>
                                <li><strong>العمق:</strong> تحليلات مفصلة، ليس نصائح سطحية.</li>
                                <li><strong>الاحترافية:</strong> لغة مهنية، تصميم نظيف، أمثلة واقعية.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>2.2 أنماط الاستهلاك المهني</h4>

                            <h5 style={{ marginTop: '1rem', color: '#0a66c2' }}>أ. الأوقات الذهبية</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>7-9 صباحاً:</strong> قبل العمل، تصفح سريع للأخبار المهنية.</li>
                                <li><strong>12-1 ظهراً:</strong> استراحة الغداء، وقت للقراءة المتعمقة.</li>
                                <li><strong>5-6 مساءً:</strong> بعد العمل، تصفح استرخائي وتعلم.</li>
                                <li><strong>الأفضل:</strong> الثلاثاء، الأربعاء، الخميس (أيام العمل الكاملة).</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#0a66c2' }}>ب. سلوكيات القراءة</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>القراءة الانتقائية:</strong> يقرؤون العناوين فقط ما لم يكن الموضوع ذا صلة مباشرة.</li>
                                <li><strong>التعليق المدروس:</strong> عندما يعلقون، يكتبون تعليقات طويلة ومدروسة.</li>
                                <li><strong>المشاركة الحذرة:</strong> يشاركون فقط ما يعزز صورتهم المهنية.</li>
                            </ul>
                        </div>

                        <h3>الفصل الثالث: هندسة المنشور المثالي</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>3.1 تشريح منشور لينكد إن الفيروسي</h4>

                            <h5 style={{ marginTop: '1rem', color: '#0a66c2' }}>أ. الهيكل الأمثل</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>السطر 1-2 (الخطاف):</strong>
                                    <ul>
                                        <li>جملة واحدة قصيرة وموجزة</li>
                                        <li>مساحة بيضاء بعدها (تجبر على "اقرأ المزيد")</li>
                                        <li>مثال: "ارتكبتُ خطأً كلف شركتي 100,000 دولار."</li>
                                    </ul>
                                </li>
                                <li><strong>الفقرة 1 (الجسر):</strong>
                                    <ul>
                                        <li>انتقال سلس من الخطاف للمحتوى</li>
                                        <li>"دعني أشرح ما حدث..."</li>
                                    </ul>
                                </li>
                                <li><strong>الفقرات 2-5 (القيمة):</strong>
                                    <ul>
                                        <li>نقطة واحدة لكل فقرة</li>
                                        <li>أسطر قصيرة (1-2 سطر كحد أقصى)</li>
                                        <li>أمثلة رقمية محددة</li>
                                    </ul>
                                </li>
                                <li><strong>الفقرة قبل الأخيرة (الدرس):</strong>
                                    <ul>
                                        <li>"ما تعلمته من هذا..."</li>
                                        <li>تلخيص القابلية للتطبيق</li>
                                    </ul>
                                </li>
                                <li><strong>الفقرة الأخيرة (السؤال):</strong>
                                    <ul>
                                        <li>سؤال مفتوح يحفز النقاش المهني</li>
                                        <li>"ماذا حدث معك في موقف مشابه؟"</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>3.2 كتابة الخطافات القاتلة</h4>

                            <h5 style={{ marginTop: '1rem', color: '#0a66c2' }}>أ. أنواع الخطافات المهنية</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>خطاف القصة الشخصية:</strong> "في أول سنة لي كمدير، فعلتُ شيئاً غيّر كل شيء..."</li>
                                <li><strong>خطاف الإحصائية:</strong> "73% من المديرين يرتكبون هذا الخطأ يومياً..."</li>
                                <li><strong>خطاف التناقض:</strong> "كل ما تعرفه عن الإنتاجية خطأ..."</li>
                                <li><strong>خطاف الدرس:</strong> "تعلمتُ هذا الدرس من مليونير عصامي..."</li>
                                <li><strong>خطاف السؤال:</strong> "ما هو أكبر تحدي تواجهه كفريق؟"</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#0a66c2' }}>ب. قواعد الخطاف الناجح</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>أقل من 15 كلمة للسطر الواحد</li>
                                <li>تجنب المصطلحات المعقدة</li>
                                <li>وعد واضح بما سيحصل عليه القارئ</li>
                                <li>مساحة بيضاء بعد السطر الثاني دائماً</li>
                            </ul>
                        </div>

                        <h3>الفصل الرابع: استراتيجيات النمو المتقدمة</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>4.1 استراتيجية "التعليق الذهبي" (Golden Comment Strategy)</h4>
                            <p>أقوى استراتيجية نمو على لينكد إن:
                            </p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>حدد 20 رائد فكر في مجالك (10K+ متابع)</li>
                                <li>فعّل إشعارات منشوراتهم (جرس التنبيهات)</li>
                                <li>كن من أوائل 10 أشخاص يعلقون</li>
                                <li>اكتب تعليقاً يضيف قيمة، ليس "مشاركة رائعة"</li>
                                <li>مثال: "نقطة ممتازة! أضيف أن الدراسة الأخيرة من هارفارد أظهرت..."</li>
                                <li>النتيجة: 500-2000 زيارة لبروفايلك يومياً مجاناً</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>4.2 استراتيجية "النشر المتسلسل" (Serial Content)</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>أنشئ سلسلة محتوى أسبوعية ثابتة</li>
                                <li>مثال: "درس القيادة الأسبوعي - الحلقة X"</li>
                                <li>كل منشور يُشير للسابق والتالي</li>
                                <li>هذا يخلق "إدمان محتوى" ومتابعة مستمرة</li>
                                <li>يزيد معدل المتابعة بنسبة 80%+</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>4.3 استراتيجية "التعاون الاستراتيجي"</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>تواصل مع 5-10 محترفين في مستوى مشابه</li>
                                <li>اقترح "منشور مشترك" أو "مقابلة متبادلة"</li>
                                <li>كل طرف يعرّف الآخر على شبكته</li>
                                <li>النمو المتبادل أسرع من النمو الفردي</li>
                            </ul>
                        </div>

                        <h3>الفصل الخامس: التحليلات والقياس</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>5.1 المقاييس الأساسية</h4>

                            <h5 style={{ marginTop: '1rem', color: '#0a66c2' }}>أ. مقاييس المنشور</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Impressions:</strong> عدد مرات الظهور</li>
                                <li><strong>Engagement Rate:</strong> (تفاعلات ÷ انطباعات) × 100</li>
                                <li><strong>Click-through Rate:</strong> نقرات على الرابط ÷ انطباعات</li>
                                <li><strong>Comment Quality:</strong> متوسط طول التعليقات</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#0a66c2' }}>ب. مقاييس البروفايل</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Profile Views:</strong> زيارات البروفايل الأسبوعية</li>
                                <li><strong>Search Appearances:</strong> ظهور في نتائج البحث</li>
                                <li><strong>Connection Acceptance Rate:</strong> نسبة قبول طلبات التواصل</li>
                                <li><strong>Follower Growth:</strong> نمو المتابعين العضوي</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ background: 'linear-gradient(135deg, rgba(10, 102, 194, 0.2) 0%, rgba(10, 102, 194, 0.05) 100%)', border: '2px solid rgba(10, 102, 194, 0.3)' }}>
                            <h4> قائمة التحقق النهائية للينكد إن</h4>
                            <p>قبل نشر أي منشور:
                            </p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '2' }}>
                                <li> الخطاف قوي ويخلق فضولاً مهنياً</li>
                                <li> مساحات بيضاء بين الفقرات</li>
                                <li> المحتوى يقدم قيمة قابلة للتطبيق</li>
                                <li> هناك قصة أو مثال واقعي</li>
                                <li> سؤال في النهاية يحفز النقاش</li>
                                <li> 3-5 هاشتاغات ذات صلة</li>
                                <li> لا توجد روابط في نص المنشور</li>
                                <li> تنشر في وقت عمل مهني</li>
                                <li> مستعد للرد على التعليقات في أول 90 دقيقة</li>
                            </ul>
                        </div>

                        <h3>الفصل السادس: المصطلحات التقنية المتقدمة للينكد إن</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>6.1 مصطلحات الوصول والرؤية</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Impressions (الانطباعات):</strong> عدد مرات ظهور منشورك. شخص واحد قد يراه 5 مرات = 5 انطباعات.</li>
                                <li><strong>Unique Impressions (الانطباعات الفريدة):</strong> عدد الأشخاص الفريدين الذين رأوا منشورك.</li>
                                <li><strong>Organic Impressions (الانطباعات العضوية):</strong> الوصول بدون دفع.</li>
                                <li><strong>Viral Impressions (الانطباعات الفيروسية):</strong> الوصول من خلال تفاعل الآخرين (مشاركات، إعادة نشر).</li>
                                <li><strong>Feed Density (كثافة الخلاصة):</strong> عدد المنشورات المنافسة في خلاصة جمهورك المستهدف.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>6.2 مصطلحات التفاعل المهني</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Social Selling Index (SSI):</strong> مؤشر لينكد إن لفعالية البيع الاجتماعي (0-100). يؤثر على الوصول.</li>
                                <li><strong>Thought Leadership Score:</strong> تصنيفك كرائد فكر في مجالك.</li>
                                <li><strong>Engagement Quality (جودة التفاعل):</strong> متوسط طول التعليقات وعمق النقاش.</li>
                                <li><strong>Repost with Commentary:</strong> إعادة النشر مع تعليق - أقوى أنواع المشاركة.</li>
                                <li><strong>Direct Share (المشاركة المباشرة):</strong> إرسال المنشور عبر رسالة خاصة.</li>
                            </ul>
                        </div>

                        <h3>الفصل السابع: دراسات حالة للينكد إن</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>7.1 دراسة حالة: مستشار مالي وصل لـ 50K متابع في 4 أشهر</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الاستراتيجية:</strong> منشور واحد يومياً (نص طويل + صورة) + 20 تعليق ذكي يومياً على حسابات كبيرة.</li>
                                <li><strong>أفضل منشور:</strong> "الدرس الأغلى في مسيرتي" - قصة فشل شخصي. 1.2 مليون انطباع، 8K تعليق.</li>
                                <li><strong>المفتاح:</strong> الأصالة والشفافية. شارك أخطاءه بصراحة.</li>
                            </ul>
                        </div>

                        <h3>الفصل الثامن: أدوات لينكد إن الاحترافية</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>8.1 أدوات التحليل</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>LinkedIn Analytics:</strong> مجاني ومباشر من المصدر.</li>
                                <li><strong>Social Selling Index Dashboard:</strong> لقياس SSI الخاص بك.</li>
                                <li><strong>Shield Analytics:</strong> تحليلات متقدمة للينكد إن.</li>
                            </ul>
                            <h4 style={{ marginTop: '1rem' }}>8.2 أدوات إنشاء المحتوى</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Canva:</strong> للكاروسيل PDF.</li>
                                <li><strong>Grammarly:</strong> للتدقيق اللغوي.</li>
                                <li><strong>Loom:</strong> لتسجيل فيديوهات سريعة.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ background: 'linear-gradient(135deg, rgba(10, 102, 194, 0.25) 0%, rgba(10, 102, 194, 0.1) 100%)', border: '2px solid rgba(10, 102, 194, 0.4)' }}>
                            <h4> شهادة إتمام دليل لينكد إن</h4>
                            <p>أنت تمتلك الآن فهماً عميقاً لخوارزميات لينكد إن، 30+ مصطلحاً متقدماً، واستراتيجيات نمو مُجرّبة.</p>
                            <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>تذكّر: لينكد إن منصة مهنية. القيمة + الأصالة = النمو المستدام.</p>
                        </div>
                                                </div>
                        </details>
                    </section>

                    <section id="warnings">
                        <details className="toggle-section">
                            <summary>
                                <h2><span>️</span> تحذيرات وقواعد خوارزمية خطيرة</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">

                        <div className="warning-box">
                            <div className="icon"></div>
                            <div>
                                <h4>الروابط الخارجية تميت الوصول</h4>
                                <p>استخدام الروابط في نص المنشور جريمة في حق الخوارزمية، لأن لينكد إن لا ترغب في خروج القارئ. ضع الرابط دائماً في تعليق وقم بالإشارة إليه في النص.</p>
                            </div>
                        </div>

                        <div className="warning-box">
                            <div className="icon">️</div>
                            <div>
                                <h4>تعديل المنشور في الساعة الأولى</h4>
                                <p>أي تعديل لخطأ إملائي أو إضافة في أول ساعة من النشر يُعيد عملية احتساب الخوارزمية لتقييم المنشور من الصفر ويُبطل التفاعل الذي حصل عليه.</p>
                            </div>
                        </div>

                        <div className="warning-box">
                            <div className="icon"></div>
                            <div>
                                <h4>الاستقاء من التفاعل الصناعي</h4>
                                <p>الكلمات مثل (علق بـ تم)، (ضع لايك للمزيد)، أو استخدام مجوعات الاستقطاب (Engagement Pods)، ستقوم خوارزميات 2026 باكتشافها وحرمان حسابك من ظهوره الطبيعي.</p>
                            </div>
                        </div>

                        <div className="warning-box">
                            <div className="icon">#️⃣</div>
                            <div>
                                <h4>الهاشتاغات المفرطة</h4>
                                <p>استخدم 3 هاشتاغات قوية فقط (#اقتصاد #وعي_مالي #استثمار). الإكثار منها يُصنف ضمن البريد المزعج (Spam Threshold).</p>
                            </div>
                        </div>

                        <div className="warning-box">
                            <div className="icon"></div>
                            <div>
                                <h4>النشر الآلي والبوتات</h4>
                                <p>استخدام أدوات النشر الآلي غير الرسمية أو البوتات لإرسال رسائل تواصل جماعية قد يؤدي لتقييد حسابك أو حظره نهائياً.</p>
                            </div>
                        </div>

                        <div className="warning-box">
                            <div className="icon"></div>
                            <div>
                                <h4>المحتوى غير المهني</h4>
                                <p>لينكد إن منصة مهنية. تجنب ال��حتوى السياسي الحاد، الجدالات الشخصية، أو أي محتوى قد يُعتبر غير لائق لبيئة العمل.</p>
                            </div>
                        </div>

                        <div className="info-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, rgba(10, 102, 194, 0.15) 0%, rgba(10, 102, 194, 0.05) 100%)' }}>
                            <h4> لوحة متابعة الأداء الأسبوعي (KPIs Dashboard)</h4>
                            <ul>
                                <li><strong>Impressions (الانطباعات):</strong> كم مرة ظهر منشورك؟ الهدف: +25% أسبوعياً.</li>
                                <li><strong>Engagement Rate:</strong> (التعليقات + المشاركات + الإعجابات) ÷ الانطباعات × 100. الهدف: 3%+ للمنشورات الاقتصادية.</li>
                                <li><strong>Connection Requests:</strong> كم طلب تواصل جديد تلقيت؟ الهدف: 100+ أسبوعياً.</li>
                                <li><strong>Profile Views:</strong> كم شخص زار ملفك الشخصي؟ الهدف: 200+ أسبوعياً.</li>
                                <li><strong>Search Appearances:</strong> كم مرة ظهرت في نتائج البحث؟</li>
                                <li><strong>Top Performing Post:</strong> حدد المنشور الأفضل وكرر صيغته.</li>
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
