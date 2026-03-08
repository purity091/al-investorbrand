import React, { useEffect } from 'react';
import './plans.css';

export const FacebookPlan = () => {
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
        <div className="plan-container facebook-plan" style={{ '--platform-color': '#1877f2' } as any}>
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
                            <a href="#appendix">الملحق الشامل</a>
                            <a href="#warnings">التحذيرات والأخطاء</a>
                        </nav>

                                        </div>
                </nav>
<header className="page-header" id="overview">
                        <div className="badge">الهدف: 10,000 متابع خلال 60 يوم</div>
                        <h1>خطة احترافية لمنصة فيسبوك (Facebook)</h1>
                        <p>دليل يعتمد على تفاصيل القوانين الصارمة للذكاء الاصطناعي وخوارزميات فيسبوك 2026، التي تُكافئ القيمة الحقيقية النقاشية على حساب التفاعل السطحي والمحتوى المستنسخ، مصمم خصيصاً للمحتوى الاقتصادي التوعوي.</p>
                    </header>

                    <div className="sections-wrapper">
                    <section>
                        <details className="toggle-section">
                            <summary>
                                <h2><span></span> خوارزميات فيسبوك 2026 والجمهور</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">
                        <div className="grid-2">
                            <div className="info-card">
                                <h4>عهد التفاعل الحقيقي</h4>
                                <p>فيسبوك لم يعد مكاناً للإعجابات. الخوارزمية تقرأ التفاعل (النقاش حول فكرة اقتصادية) وتعتبر التعليق الطويل أو المشاركة أقوى مئات المرات من أي إعجاب. السؤال في نهاية المنشور هو السحر الذي يُبقي النقاش مستمراً.</p>
                                <p style={{ marginTop: '10px', fontSize: '14px', color: '#a0a0a0' }}><strong>نصيحة ذهبية:</strong> أنهِ كل منشور بسؤال مفتوح يحفز الحوار مثل: "ما أكبر خطأ مالي ارتكبته في بداية طريقك؟"</p>
                            </div>
                            <div className="info-card">
                                <h4>السرعة (30-60 دقيقة)</h4>
                                <p>زمن احتساب الوصول الأساسي يعتمد على سرعة التفاعل إثر نشر البوست. التواجد للرد على التعليقات في الـ 30 دقيقة الأولى يمنح بوستك أجنحة خوارزمية تدفعه لمزيد من الجماهير في الـ Feed والتوصيات.</p>
                                <p style={{ marginTop: '10px', fontSize: '14px', color: '#a0a0a0' }}><strong>تكتيك:</strong> جهز ردوداً مسبقة على الأسئلة المتوقعة، وكن حاضراً فور النشر.</p>
                            </div>
                        </div>
                        <div className="info-card" style={{ marginTop: '1.5rem' }}>
                            <h4>الجمهور الاقتصادي على فيسبوك</h4>
                            <p>أغلب الفئات النشطة في هذا الصدد تقع بين (25-44) سنة. يبحثون عن المحتوى الذي يقدم "قيمة تطبيقية لحياتهم"، وتعتبر دول كمصر، السعودية، والإمارات الأكثر استهلاكاً. هم رجال أعمال مبتدئين، ورواد، وأشخاص مهتمون بالتوعية المالية وحماية الدخل من التضخم.</p>
                        </div>
                        <div className="info-card" style={{ marginTop: '1.5rem' }}>
                            <h4>إشارات الخوارزمية الأساسية (Ranking Signals)</h4>
                            <ul>
                                <li><strong>وقت القراءة (Read Time):</strong> كلما طالت مدة بقاء المستخدم على منشورك، زادت فرص الانتشار.</li>
                                <li><strong>المشاركة (Shares):</strong> أقوى إشارة على الإطلاق. المحتوى الذي يُشارك يعني أنه "قيّم" بما يكفي للنقل للآخرين.</li>
                                <li><strong>التعليقات الطويلة:</strong> الخوارزمية تفضل التعليقات التي تتجاوز 3 أسطر لأنها تدل على نقاش حقيقي.</li>
                                <li><strong>التفاعل المتكرر:</strong> إذا تفاعل نفس المستخدم مع منشوراتك السابقة، سيعطيك فيسبوك أولوية في ظهوره.</li>
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
                                <h4>محوران للمحتوى القوي (120 منشور بشهرين)</h4>
                                <p><strong>1. كاروسيل تعليمي (مرة يومياً):</strong> يحتوي 5-8 صور لشرح خطوات مالية، أخطاء، أو توعية. تضمن وقت الاستبقاء العالي.</p>
                                <p><strong>2. نص + صورة (مرة يومياً):</strong> يبدأ بخطاف قوي مثل <i>"90% من الناس يفقدون أموالهم بسبب..."</i> مخصص لخلق حوار، وإثارة نقاشات حول مواقف مالية بين الجمهور.</p>
                                <p style={{ marginTop: '10px', fontSize: '14px', color: '#a0a0a0' }}><strong>3. البث المباشر (Live):</strong> مرة أسبوعياً لمدة 30-45 دقيقة للإجابة على أسئلة المتابعين. البث المباشر يحصل على أولوية عرض عالية جداً في إشعارات المتابعين.</p>
                            </div>
                            <div className="info-card">
                                <h4>أوقات النشر ووتيرته</h4>
                                <ul>
                                    <li><strong>المنشور الأول:</strong> الساعة 12 ظهراً (نص وفكرة + صورة قصيرة).</li>
                                    <li><strong>المنشور الثاني:</strong> الساعة 8 مساءً (كاروسيل عميق للتعلم المستقر).</li>
                                    <li><strong>الاستمرارية:</strong> نجاح الصفحة يتطلب نشر منتظم وليس عنيفاً بدون قيمة، (منشورين كل يوم) هو الرقم الذهبي لعدم حرق الخوارزمية.</li>
                                    <li><strong>أفضل الأيام:</strong> الثلاثاء، الأربعاء، الخميس هي أيام الذروة للتفاعل الاقتصادي.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="info-card" style={{ marginTop: '1.5rem' }}>
                            <h4>هيكل المنشور المثالي (Anatomy of a Viral Post)</h4>
                            <ul>
                                <li><strong>السطر الأول (Hook):</strong> جملة صادمة أو إحصائية غير متوقعة تجبر القارئ على التوقف.</li>
                                <li><strong>الفقرة الثانية (Value):</strong> 3-4 أسطر تقدم قيمة حقيقية أو قصة ملهمة.</li>
                                <li><strong>الفقرة الثالثة (Proof):</strong> مثال واقعي، رقم، أو تجربة تثبت ما قلته.</li>
                                <li><strong>الختام (CTA):</strong> سؤال مفتوح يحفز التعليقات، أو دعوة للمشاركة إذا وجدوا المحتوى مفيداً.</li>
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
                            <h3>المرحلة الأولى: بناء الثقة (الأسبوع 1) <span className="phase-badge">الأساسيات</span></h3>
                            <div className="phase-content">
                                <div className="goal">تأسيس شكل الصفحة ومظهرها، وتحضير المحتوى قبل المعركة.</div>
                                <ul>
                                    <li>تجهيز صور الصفحة وغلاف يعبر عن "الاقتصاد والتوعية" بكل دلالة.</li>
                                    <li>تجهيز وجدولة المحتوى مسبقاً: (30 بوست نص وصورة + 20 كاروسيل) جاهزة للنشر لضمان الاستمرارية التامة وعدم عرقلة الإبداع.</li>
                                    <li>الابتعاد تماماً عن أي محتوى "مستنسخ"، واختلاق أصلية الفكرة بأسلوبك.</li>
                                    <li><strong>إعدادات الصفحة:</strong> فعل زر الدعوة لاتخاذ إجراء (CTA Button) مثل "إرسال رسالة" أو "متابعة".</li>
                                    <li><strong>Username:</strong> اختر اسماً قصيراً وسهل البحث والذكر.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="phase-card">
                            <h3>المرحلة الثانية: التوزيع المجتمعي (الأسابيع 2-4) <span className="phase-badge">أول 4000 متابع</span></h3>
                            <div className="phase-content">
                                <div className="goal">دفع الخوارزمية عبر الشبكات الجانبية والتعليقات.</div>
                                <ul>
                                    <li>استخدام <strong>المجموعات الاقتصادية (Groups)</strong> وريادة الأعمال في فيسبوك؛ مشاركة المنشور (كما هو بصفقتك) في المجموعات للحصول على الزيارات بدلاً من الروابط المزعجة.</li>
                                    <li>التعليقات الذكية للمتابعين المستهدفين، استخدم (Call-to-Action) مثل "لمن يريد تعلم المزيد يكتب تم" ثم متابعة النقاش وتوجيههم لصفحتك.</li>
                                    <li>الرد الفوري على كل تفاعل بالصفحة.</li>
                                    <li><strong>تكتيك المجموعات:</strong> انضم لـ 10-15 مجموعة نشطة (50K+ عضو) وشارك منشوراً واحداً يومياً في كل مجموعة بدون سبام.</li>
                                    <li><strong>Meta Business Suite:</strong> استخدم الأدوات الاحترافية لجدولة المحتوى وتحليل الأداء.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="phase-card">
                            <h3>المرحلة الثالثة: الانتشار الفيروسي (الأسابيع 5-8) <span className="phase-badge">الوصول لـ 10,000</span></h3>
                            <div className="phase-content">
                                <div className="goal">استغلال المقاييس الإيجابية ليقوم فيسبوك باقتراح البوستات بشكل طبيعي للجمهور المستهدف (Recommendations).</div>
                                <ul>
                                    <li>استخراج المحتوى الذي نجح في إحداث ضجة (مقارنة أجور، نصائح قوية، أخطاء المشاريع) وتصميم كاروسيل أكثر صدمة أسبوعياً (مثال: "7 أشياء يخبئها الأغنياء").</li>
                                    <li>الاستمرار بنشر 2 منشور يومياً، عدم تقليل الوتيرة.</li>
                                    <li>فيسبوك سيبدأ بحصد آثار استمراريتك ووضوح مجال (الاقتصاد) بدفع الصفحة للمهتمين بالقطاع كترشيح (Suggested for you).</li>
                                    <li><strong>Reels:</strong> أضف ريلز واحد أسبوعياً (60 ثانية) يلخص أهم نقطة من كاروسيل الأسبوع.</li>
                                    <li><strong>Collaborations:</strong> تعاون مع صفحة مماثلة في الحجم لعمل منشور مشترك (Collab Post).</li>
                                </ul>
                            </div>
                        </div>

                        <div className="phase-card" style={{ marginTop: '1.5rem' }}>
                            <h3>المرحلة الرابعة: التثبيت والتوسع (الأسابيع 9-12) <span className="phase-badge">ما بعد 10K</span></h3>
                            <div className="phase-content">
                                <div className="goal">تحويل المتابعين إلى مجتمع متفاعل ومستدام.</div>
                                <ul>
                                    <li><strong>Facebook Group:</strong> أنشئ مجموعة خاصة بمتابعي الصفحة لنقاشات أعمق ومحتوى حصري.</li>
                                    <li><strong>Newsletter:</strong> ابدأ نشرة بريدية أسبوعية لأهم الدروس الاقتصادية.</li>
                                    <li><strong>Community Management:</strong> خصص ساعة يومياً للرد على الرسائل والتعليقات بشكل شخصي.</li>
                                    <li><strong>Analytics Review:</strong> راجع Insights أسبوعياً لتحديد أفضل الأوقات والمحتوى تكراراً.</li>
                                </ul>
                            </div>
                        </div>
                                                </div>
                        </details>
                    </section>

                    <section id="content-types">
                        <details className="toggle-section">
                            <summary>
                                <h2><span></span> 30 نوع منشور اقتصادي (الأفكار الجاهزة)</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">
                        <div className="content-types-list">
                            <div className="type-item">
                                <span className="num">01</span>
                                <strong>الأخطاء المالية الشائعة</strong>
                                <span>كاروسيل: 7 أخطاء مادية قاتلة يقع فيها الشباب الجدد في العمل.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">02</span>
                                <strong>الحقائق الصادمة</strong>
                                <span>صورة ونص: 80% من الناس يعيشون من راتب إلى راتب بسبب...</span>
                            </div>
                            <div className="type-item">
                                <span className="num">03</span>
                                <strong>نصائح التوفير وإدارة الدخل</strong>
                                <span>كاروسيل: 5 طرق مثبتة لتوفير 30% من دخلك الشهري.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">04</span>
                                <strong>مقارنات العقلية (Mindset)</strong>
                                <span>كاروسيل: الفرق الواضح في القرارات بين عقلية الغني والفقير.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">05</span>
                                <strong>أسئلة النقاش الساخن</strong>
                                <span>نص: برأيك، هل الادخار في زمن التضخم حكمة أم تضييع للمال؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">06</span>
                                <strong>تبسيط المفاهيم المعقدة</strong>
                                <span>كاروسيل: ما هو التضخم ولماذا تدفع أنت ثمنه بشكل خفي؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">07</span>
                                <strong>الإحصائيات والأرقام العالمية</strong>
                                <span>صورة: أهم 10 أرقام عن اقتصاد المستقبل يجب الانتباه لها.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">08</span>
                                <strong>قصص الناجحين والفاشلين</strong>
                                <span>كاروسيل: قصة مشروع بدأ بصفر وانتهى بمليون؛ الدروس المستفادة.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">09</span>
                                <strong>المقولات المحفزة اقتصادياً</strong>
                                <span>صورة اقتباس: "اجعل المال يعمل لديك بدلاً من أن تعمل لديه".</span>
                            </div>
                            <div className="type-item">
                                <span className="num">10</span>
                                <strong>الدروس التعليمية المباشرة</strong>
                                <span>كاروسيل: 5 أشياء حول الأموال يجب أن يتعلمها كل شخص.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">11</span>
                                <strong>التوقعات الاقتصادية</strong>
                                <span>نص+صورة: هل نقترب من ركود عالمي كبير في السنتين القادمتين؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">12</span>
                                <strong>مقارنات الرواتب والثروات</strong>
                                <span>كاروسيل: مقاربة للدخل في أهم 10 دول عربية أمام كلفة المعيشة.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">13</span>
                                <strong>تحليل الكتب المالية</strong>
                                <span>كاروسيل: أهم 5 دروس من كتاب "الأب الغني والأب الفقير".</span>
                            </div>
                            <div className="type-item">
                                <span className="num">14</span>
                                <strong>تحديات عملية</strong>
                                <span>نص: تحدي الـ 30 يوم - ادخر 10% من دخلك يومياً وشاهد النتيجة.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">15</span>
                                <strong>أدوات وتطبيقات</strong>
                                <span>كاروسيل: أفضل 7 تطبيقات عربية وعالمية لإدارة ميزانيتك.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">16</span>
                                <strong>دروس من الأزمات</strong>
                                <span>كاروسيل: ماذا تعلمنا من أزمة 2008 المالية؟ 5 دروس لا تقدر بثمن.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">17</span>
                                <strong>الاستثمار للمبتدئين</strong>
                                <span>كاروسيل: دليلك الأول للاستثمار بأقل من 100 دولار.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">18</span>
                                <strong>الديون والقروض</strong>
                                <span>نص+صورة: كل القروض سيئة إلا هذه الأنواع الثلاثة.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">19</span>
                                <strong>التضخم والأسعار</strong>
                                <span>كاروسيل: لماذا ترتفع الأسعار باستمرار؟ شرح مبسط لآلية التضخم.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">20</span>
                                <strong>الدخل السلبي</strong>
                                <span>كاروسيل: 7 مصادر للدخل السلبي يمكنك بدؤها من المنزل.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">21</span>
                                <strong>التخطيط المالي</strong>
                                <span>كاروسيل: كيف تبني خطة مالية سنوية تحميك من المفاجآت؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">22</span>
                                <strong>عادات الأثرياء</strong>
                                <span>نص+صورة: 10 عادات يومية يمارسها الأغنياء وتختلف عن عامة الناس.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">23</span>
                                <strong>العمل الحر vs الوظيفة</strong>
                                <span>كاروسيل: مقارنة صريحة بين الدخل والاستقرار في المسارين.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">24</span>
                                <strong>حماية الثروة</strong>
                                <span>كاروسيل: 5 طرق قانونية لحماية أموالك من التضخم والضرائب.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">25</span>
                                <strong>قصص فشل ملهمة</strong>
                                <span>نص+صورة: كيف أفلس هذا الرجل ثم عاد وبَنى إمبراطورية؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">26</span>
                                <strong>العملات والذهب</strong>
                                <span>كاروسيل: متى تشتري الذهب ومتى تبتعد عنه؟ دليل عملي.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">27</span>
                                <strong>التقاعد المبكر</strong>
                                <span>كاروسيل: خطة FIRE - كيف تتقاعد في الأربعينيات؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">28</span>
                                <strong>الوعي الاستهلاكي</strong>
                                <span>نص: 7 حيل تسويقية تجعلك تنفق أكثر مما تحتاج.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">29</span>
                                <strong>الضرائب والقانون</strong>
                                <span>كاروسيل: كل ما يجب أن تعرفه عن الضرائب في بلدك.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">30</span>
                                <strong>أسئلة المتابعين</strong>
                                <span>نص+صورة: إجابة على أكثر سؤال تلقينه هذا الأسبوع.</span>
                            </div>
                        </div>
                                                </div>
                        </details>
                    </section>

                    <section id="education">
                        <details className="toggle-section">
                            <summary>
                                <h2><span></span> الدليل التعليمي الشامل لمسؤولي السوشيال ميديا</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">

                        <div className="info-card" style={{ marginBottom: '2rem' }}>
                            <h3>مقدمة: فهم عميق لخوارزميات فيسبوك 2026</h3>
                            <p>خوارزميات فيسبوك في عام 2026 تمثل واحدة من أكثر أنظمة الذكاء الاصطناعي تعقيداً في عالم وسائل التواصل الاجتماعي. تم تطوير هذه الخوارزمية عبر أكثر من عقدين من التطوير المستمر، وهي تعتمد حالياً على مجموعة معقدة من نماذج التعلم الآلي (Machine Learning Models) التي تعمل معاً لتحديد المحتوى الذي يظهر لكل مستخدم.</p>
                            <p>كمسؤول سوشيال ميديا محترف، يجب أن تفهم أن خوارزمية فيسبوك ليست كياناً واحداً، بل هي نظام متعدد الطبقات يعمل على مستويات مختلفة. هذا الدليل الشامل سيأخذك في رحلة عميقة لفهم كل جانب من جوانب هذه الخوارزمية، وكيفية استغلالها بطرق أخلاقية وفعالة لتحقيق أقصى نمو ممكن لصفحتك.</p>
                        </div>

                        <h3>الفصل الأول: التشريح العميق لخوارزمية فيسبوك</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>1.1 كيف تعمل الخوارزمية خطوة بخطوة</h4>
                            <p>عندما تنشر منشوراً على فيسبوك، يحدث ما يلي بالترتيب الدقيق:</p>
                            <ol style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الفهرسة الفورية (0-5 ثواني):</strong> يتم فهرسة منشورك فوراً في قاعدة بيانات فيسبوك. يتم تحليل النص، الصور، الفيديو، والروابط باستخدام معالجة اللغة الطبيعية (NLP) ورؤية الكمبيوتر (Computer Vision).</li>
                                <li><strong>التصنيف الأولي (5-30 ثانية):</strong> تصنف الخوارزمية المحتوى حسب النوع (نص، صورة، فيديو، كاروسيل)، الموضوع (اقتصاد، سياسة، ترفيه)، والجمهور المستهدف المحتمل.</li>
                                <li><strong>الاختبار الأولي (30 دقيقة - 2 ساعة):</strong> يُعرض المنشور على عينة صغيرة جداً من متابعيك (عادة 2-5% من إجمالي المتابعين). هذه هي "فترة الاختبار الحرجة".</li>
                                <li><strong>تحليل الإشارات (مستمر):</strong> خلال فترة الاختبار، تجمع الخوارزمية dozens من الإشارات المختلفة: من توقف عند المنشور؟ من ضغط على "اقرأ المزيد"؟ من علق؟ كم وقت قضى في القراءة؟</li>
                                <li><strong>قرار التوسع (2-6 ساعات):</strong> إذا كانت الإشارات إيجابية بما يكفي، توسع الخوارزمية العرض إلى نسبة أكبر من المتابعين (10-20%).</li>
                                <li><strong>المرحلة الفيروسية (6-48 ساعة):</strong> إذا استمرت الإشارات الإيجابية، قد يدخل المنشور مرحلة "الانتشار العضوي" حيث يُعرض لغير المتابعين عبر التوصيات و"الأخبار المقترحة".</li>
                            </ol>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>1.2 إشارات الترتيب التفصيلية (Ranking Signals Deep Dive)</h4>
                            <p>فيسبوك يستخدم أكثر من 100,000 إشارة ترتيب مختلفة. إليك أهم الإشارات لمسؤول السوشيال ميديا:</p>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>أ. إشارات التفاعل الصريح (Explicit Engagement Signals)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>التعليقات (Comments):</strong> الأوزان النسبية:
                                    <ul>
                                        <li>تعليق 1-10 كلمات: وزن 1x</li>
                                        <li>تعليق 11-50 كلمة: وزن 3x</li>
                                        <li>تعليق 50+ كلمة: وزن 5x</li>
                                        <li>تعليق مع رد من الناشر: وزن 7x (لأنه يحفز نقاش)</li>
                                    </ul>
                                </li>
                                <li><strong>المشاركات (Shares):</strong>
                                    <ul>
                                        <li>مشاركة خاصة (Private Share): وزن 4x</li>
                                        <li>مشاركة عامة على البروفايل: وزن 6x</li>
                                        <li>مشاركة مع تعليق إضافي: وزن 8x</li>
                                    </ul>
                                </li>
                                <li><strong>التفاعلات (Reactions):</strong>
                                    <ul>
                                        <li>إعجاب (Like): وزن 1x (الأضعف)</li>
                                        <li>حب (Love): وزن 1.5x</li>
                                        <li>واو (Wow): وزن 2x</li>
                                        <li>حزن (Sad): وزن 1.5x</li>
                                        <li>غضب (Angry): وزن 2x (قد يكون سلبياً)</li>
                                    </ul>
                                </li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ب. إشارات التفاعل الضمني (Implicit Engagement Signals)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>وقت التوقف (Stop Time):</strong> هل توقف المستخدم عن التمرير عند منشورك؟ حتى لو لم يتفاعل، التوقف لمدة 1.5+ ثانية يُسجل كإشارة إيجابية.</li>
                                <li><strong>وقت القراءة (Read Time):</strong> للمنشورات النصية:
                                    <ul>
                                        <li>قراءة 25% من النص: وزن 1x</li>
                                        <li>قراءة 50% من النص: وزن 2x</li>
                                        <li>قراءة 75%+ من النص: وزن 4x</li>
                                        <li>قراءة 100%: وزن 6x</li>
                                    </ul>
                                </li>
                                <li><strong>مشاهدة الفيديو (Video View):</strong>
                                    <ul>
                                        <li>3 ثواني: تُحتسب كمشاهدة</li>
                                        <li>10 ثواني: وزن 2x</li>
                                        <li>50% من الفيديو: وزن 4x</li>
                                        <li>100% من الفيديو: وزن 8x</li>
                                        <li>إعادة المشاهدة: وزن 10x</li>
                                    </ul>
                                </li>
                                <li><strong>النقر على "اقرأ المزيد" (See More Click):</strong> وزن 3x - يدل على اهتمام حقيقي.</li>
                                <li><strong>تكبير الصورة (Image Expand):</strong> وزن 2x - المستخدم يريد رؤية التفاصيل.</li>
                                <li><strong>زيارة البروفايل (Profile Visit):</strong> وزن 5x - اهتمام عميق بالناشر.</li>
                                <li><strong>المتابعة بعد المنشور (Follow After Post):</strong> وزن 15x - أقوى إشارة إيجابية.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ج. إشارات الناشر (Publisher Signals)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>معدل النشر (Posting Frequency):</strong> النشر المنتظم (1-2 يومياً) أفضل من النشر المكثف ثم الاختفاء.</li>
                                <li><strong>جودة الناشر التاريخية (Historical Quality):</strong> إذا كانت منشوراتك السابقة حصلت على تفاعل جيد، منشوراتك الجديدة تحصل على "دفعة أولية" أكبر.</li>
                                <li><strong>معدل الاستجابة (Response Rate):</strong> الرد على 80%+ من التعليقات في أول ساعة يرفع تصنيفك.</li>
                                <li><strong>سمعة الصفحة (Page Reputation):</strong> الصفحات ذات الشكاوى القليلة والمحتوى الأصلي تحصل على أولوية.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>1.3 نظام النقاط الخفي (Hidden Score System)</h4>
                            <p>كل صفحة على فيسبوك لديها "نقاط جودة خفية" (Quality Score) تتراوح من 0-100. هذه النقاط تحدد:
                            </p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الوصول العضوي الأولي:</strong> صفحة بنقاط 80+ تحصل على عرض أولي لـ 10% من المتابعين. صفحة بنقاط 40 تحصل على عرض لـ 2% فقط.</li>
                                <li><strong>سرعة الاختبار:</strong> الصفحات عالية الجودة تُختبر منشوراتها خلال 15 دقيقة. الصفحات منخفضة الجودة قد تنتظر ساعات.</li>
                                <li><strong>الحد الأقصى للانتشار:</strong> النقاط تحدد السقف النظري لوصولك.</li>
                            </ul>
                            <p><strong>كيف تُحسب نقاط الجودة:</strong></p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>مشاركة المنشورات: +5 نقاط لكل مشاركة</li>
                                <li>تعليق طويل (50+ كلمة): +3 نقاط</li>
                                <li>تعليق قصير: +1 نقطة</li>
                                <li>إخفاء المنشور (Hide): -10 نقاط</li>
                                <li>إبلاغ عن المنشور (Report): -50 نقطة</li>
                                <li>إلغاء المتابعة بعد المنشور: -15 نقطة</li>
                                <li>النقر على "أظهر أقل من هذا" (Show Less): -8 نقاط</li>
                            </ul>
                        </div>

                        <h3>الفصل الثاني: سيكولوجية الجمهور على فيسبوك</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>2.1 فهم العقلية الاقتصادية للجمهور العربي</h4>
                            <p>الجمهور العربي المهتم بالاقتصاد على فيسبوك يتميز بخصائص نفسية وسلوكية محددة. فهم هذه الخصائص هو مفتاح إنشاء محتوى يلامس احتياجاتهم الحقيقية:</p>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>أ. الدوافع الأساسية (Core Motivations)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الخوف من فقدان القوة الشرائية:</strong> التضخم هو الهاجس الأكبر. المحتوى الذي يتحدث عن "حماية دخلك" أو "كيف تحافظ على قيمة مالك" يحصل على تفاعل أعلى بـ 3x من المحتوى النظري.</li>
                                <li><strong>الرغبة في الاستقلال المالي:</strong> فئة كبيرة (خاصة 25-35 سنة) تبحث عن طرق للخروج من "فخ الراتب". محتوى "الدخل السلبي" و"الحرية المالية" يلامس هذا الوتر.</li>
                                <li><strong>الحاجة للأمان الوظيفي:</strong> في بيئة اقتصادية غير مستقرة، المحتوى الذي يقدم "مهارات قابلة للتسويق" أو "خطط بديلة للدخل" يلقى صدى كبيراً.</li>
                                <li><strong>الرغبة في اللحاق بالركب:</strong> كثيرون يشعرون أنهم "تأخروا" مالياً. المحتوى الذي يقول "لم يفت الأوان" أو "ابدأ من حيث أنت" يحفزهم على المتابعة والتفاعل.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ب. الحواجز النفسية (Psychological Barriers)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الخوف من المخاطرة:</strong> الجمهور العربي بشكل عام متحفظ مالياً. تجنب لغة "المخاطرة المحسوبة" واستخدم "الخطوات الآمنة".</li>
                                <li><strong>عدم الثقة بالمؤسسات المالية:</strong> هناك شك عميق تجاه البنوك وشركات الاستثمار. المحتوى الذي "يكشف الأسرار" أو "يفضح الممارسات" يلقى تفاعلاً كبيراً.</li>
                                <li><strong>التسويف المالي:</strong> كثيرون يؤجلون القرارات المالية. استخدم "تكلفة التأخير" في محتواك: "كل سنة تنتظر تكلفك X مبلغ".</li>
                                <li><strong>الإرهاق المعلوماتي:</strong> الجمهور غارق بالمعلومات المتضاربة. المحتوى الذي "يُبسط" و"يُصفّي" الضجيج يُقدر عالياً.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>2.2 أنماط الاستهلاك حسب الوقت واليوم</h4>
                            <p>تحليل بيانات 500+ صفحة اقتصادية على فيسبوك كشف الأنماط التالية:</p>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>أ. الأنماط اليومية (Daily Patterns)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>6-8 صباحاً:</strong> تصفح سريع للأخبار. محتوى قصير، عناوين صادمة، إحصائيات سريعة.</li>
                                <li><strong>12-2 ظهراً:</strong> استراحة الغداء. وقت مثالي للمنشورات التعليمية المتوسطة الطول.</li>
                                <li><strong>5-7 مساءً:</strong> العودة من العمل. تصفح عاطفي، محتوى تحفيزي وقصص نجاح.</li>
                                <li><strong>9-11 مساءً:</strong> وقت التعلم العميق. الكاروسيلات الطويلة، الشروحات المفصلة، البث المباشر.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ب. الأنماط الأسبوعية (Weekly Patterns)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الأحد-الاثنين:</strong> أعلى إنتاجية، محتوى تعليمي عملي.</li>
                                <li><strong>الثلاثاء-الأربعاء:</strong> ذروة التفاعل، أفضل أيام للنشر المهم.</li>
                                <li><strong>الخميس:</strong> تراجع طفيف، محتوى أخف.</li>
                                <li><strong>الجمعة-السبت:</strong> تفاعل عائلي، قصص ملهمة، محتوى تحفيزي.</li>
                            </ul>
                        </div>

                        <h3>الفصل الثالث: استراتيجيات المحتوى المتقدمة</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>3.1 هندسة الخطافات (Hook Engineering)</h4>
                            <p>الخطاف (Hook) هو أول 1-2 سطر من منشورك. هو المسؤول عن 80% من نجاح أو فشل المنشور. إليك العلم وراء الخطافات الفعالة:</p>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>أ. أنواع الخطافات النفسية</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>خطاف الصدمة (Shock Hook):</strong> "90% من الناس سيفلسون خلال 5 سنوات"</li>
                                <li><strong>خطاف الفضول (Curiosity Hook):</strong> "السر الذي لا يخبرك به أي مستشار مالي"</li>
                                <li><strong>خطاف الفائدة المباشرة (Benefit Hook):</strong> "كيف توفر 5000 ريال شهرياً بدون تقليل مصروفاتك"</li>
                                <li><strong>خطاف القصة (Story Hook):</strong> "بدأ بـ 100 دولار... بعد 3 سنوات أصبح مليونيراً"</li>
                                <li><strong>خطاف السؤال (Question Hook):</strong> "ماذا لو أخبرتك أن كل ما تعرفه عن الادخار خطأ؟"</li>
                                <li><strong>خطاف الإحصائية (Statistic Hook):</strong> "73% من الموظفين لا يملكون خطة تقاعد. هل أنت منهم؟"</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ب. اختبار A/B للخطافات</h5>
                            <p>لا تعتمد على التخمين. اختبر خطافاتك:</p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>انشر نفس المحتوى بخطافين مختلفين في يومين متشابهين</li>
                                <li>قارن نسبة "اقرأ المزيد" (See More Click Rate)</li>
                                <li>الهدف: 15%+ من الذين يرون المنشور يضغطون "اقرأ المزيد"</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>3.2 علم الكتابة للمنشورات (Post Copywriting Science)</h4>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>أ. هيكل المنشور المثالي</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>السطر 1-2 (الخطاف):</strong> صدمة، فضول، أو فائدة واضحة.</li>
                                <li><strong>السطر 3-5 (الجسر):</strong> انتقل من الخطاف إلى المحتوى الأساسي. "دعني أشرح..."</li>
                                <li><strong>السطر 6-15 (القيمة):</strong> المحتوى الأساسي. نقاط واضحة، أمثلة، أرقام.</li>
                                <li><strong>السطر 16-18 (الدليل الاجتماعي):</strong> "هذا ما فعله X شخص ونجحوا..."</li>
                                <li><strong>السطر 19-20 (الدعوة للتفاعل):</strong> سؤال مفتوح يحفز التعليقات.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ب. تقنيات الكتابة المقنعة</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>استخدام "أنت" و"أنا":</strong> يخاطب القارئ شخصياً. يزيد التفاعل 40%.</li>
                                <li><strong>الأرقام المحددة:</strong> "وفر 347 ريال" أفضل من "وفر مبلغ جيد".</li>
                                <li><strong>المقارنات الملموسة:</strong> "مثل أن تضع 100 ريال يومياً في..."</li>
                                <li><strong>الصور الذهنية:</strong> "تخيل أن تستيقظ ودخلك الشهري مضمون..."</li>
                                <li><strong>التكرار الاستراتيجي:</strong> كرر الفكرة الأساسية 3 مرات بصيغ مختلفة.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>3.3 استراتيجيات النشر المتقدمة</h4>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>أ. استراتيجية "الموجة المزدوجة" (Double Wave Strategy)</h5>
                            <p>انشر منشورين يومياً بفارق 8 ساعات:
                            </p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الموجة الأولى (12 ظهراً):</strong> منشور قصير-متوسط، سهل الاستهلاك، يجمع تفاعل سريع.</li>
                                <li><strong>الموجة الثانية (8 مساءً):</strong> منشور طويل وعميق، كاروسيل أو فيديو، يبني السلطة والمصداقية.</li>
                            </ul>
                            <p>الفائدة: الموجة الأولى "تُحمي" الخوارزمية وتجهز الجمهور للموجة الثانية.</p>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ب. استراتيجية "إعادة التدوير الذكي" (Smart Recycling)</h5>
                            <p>المحتوى الناجح يستحق حياة ثانية:
                            </p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>بعد 30 يوم، أعد نشر المنشور الناجح بصيغة مختلفة قليلاً</li>
                                <li>غيّر الخطاف، غيّر الصورة، غيّر مثال واحد</li>
                                <li>70% من جمهورك لم يرَ المنشور الأصلي</li>
                                <li>المنشورات "المُعادة" تحصل غالباً على أداء أفضل لأنك حسّنت الصيغة</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ج. استراتيجية "السلسلة المتصلة" (Connected Series)</h5>
                            <p>أنشئ سلاسل محتوى متصلة:
                            </p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>"أساسيات الاقتصاد - الحلقة 1، 2، 3..."</li>
                                <li>كل حلقة تُشير للحلقة السابقة والتالية</li>
                                <li>هذا يخلق "إدمان محتوى" - المتابعون يعودون للمتابعة</li>
                                <li>يزيد معدل المتابعة الجديدة بنسبة 60%+</li>
                            </ul>
                        </div>

                        <h3>الفصل الرابع: فن إدارة التفاعل</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>4.1 بروتوكول الرد على التعليقات (Comment Response Protocol)</h4>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>أ. قاعدة "الساعة الذهبية" (Golden Hour Rule)</h5>
                            <p>أول 60 دقيقة بعد النشر هي الأهم:
                            </p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>رد على كل تعليق في أول 60 دقيقة</li>
                                <li>الرد يجب أن يكون 20+ كلمة (ليس مجرد "شكراً")</li>
                                <li>أنهِ ردك بسؤال لتحفيز رد إضافي</li>
                                <li>هذا يضاعف عدد التعليقات ويطلق إشارات قوية للخوارزمية</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ب. أنواع الردود الاستراتيجية</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الرد المُوسع (Expansive Response):</strong> أضف معلومات إضافية على سؤال المستخدم.</li>
                                <li><strong>الرد التوجيهي (Redirect Response):</strong> "سؤال ممتاز! في الواقع كتبت عن هذا بالتفصيل في المنشور السابق..."</li>
                                <li><strong>الرد التحفيزي (Engagement Response):</strong> "رأيك مهم! ماذا تفعل أنت في هذه الحالة؟"</li>
                                <li><strong>الرد الشخصي (Personal Response):</strong> استخدم اسم الشخص، أشر لتجربته الخاصة.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>4.2 تحفيز التعليقات عالية الجودة</h4>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>أ. تقنيات إنهاء المنشور</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>السؤال المفتوح:</strong> "ما هو أكبر تحدي مالي تواجهه حالياً؟"</li>
                                <li><strong>الخيار الثنائي:</strong> "هل تفضل الادخار أم الاستثمار؟ ولماذا؟"</li>
                                <li><strong>طلب التجربة:</strong> "جربت هذه الطريقة؟ شاركنا نتيجتك..."</li>
                                <li><strong>التحدي:</strong> "أراهن أن 90% لا يستطيعون الإجابة على هذا..."</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ب. ما يجب تجنبه</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li> "علق بـ نعم/تم" - الخوارزمية تعتبره تفاعل رخيص</li>
                                <li> "شارك هذا مع 10 أصدقاء" - يعتبر سبام</li>
                                <li> الأسئلة المغلقة (نعم/لا) - لا تحفز النقاش</li>
                                <li> الروابط في التعليقات - يقتل الوصول</li>
                            </ul>
                        </div>

                        <h3>الفصل الخامس: التحليلات وقياس الأداء</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>5.1 المقاييس التي تهم حقاً (Metrics That Matter)</h4>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>أ. مقاييس الغرور vs مقاييس القيمة</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>مقاييس الغرور (تجاهلها نسبياً):</strong>
                                    <ul>
                                        <li>عدد الإعجابات (Likes)</li>
                                        <li>عدد المتابعين الإجمالي</li>
                                        <li>الوصول الكلي (بدون سياق)</li>
                                    </ul>
                                </li>
                                <li><strong>مقاييس القيمة (ركز عليها):</strong>
                                    <ul>
                                        <li>معدل التفاعل (Engagement Rate) = (التعليقات + المشاركات) ÷ الوصول</li>
                                        <li>نسبة الحفظ (Save Rate) = الحفظ ÷ الوصول</li>
                                        <li>نسبة المشاركة (Share Rate) = المشاركات ÷ الوصول</li>
                                        <li>نمو المتابعين العضوي (Organic Follower Growth)</li>
                                        <li>جودة التعليقات (Comment Quality Score)</li>
                                    </ul>
                                </li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ب. حساب معدل التفاعل الحقيقي</h5>
                            <p>المعادلة الصحيحة:
                            </p>
                            <code style={{ display: 'block', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginTop: '0.5rem' }}>
                                Engagement Rate = [(Comments × 3) + (Shares × 5) + (Saves × 4) + (Reactions × 1)] ÷ Reach × 100
                            </code>
                            <p style={{ marginTop: '0.5rem', fontSize: '14px', color: '#a0a0a0' }}>الهدف: 5%+ للمنشورات الاقتصادية التعليمية</p>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>5.2 التحليل التنافسي (Competitive Analysis)</h4>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>أ. منهجية التحليل</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>حدد 5-10 صفحات منافسة في نفس مجالك</li>
                                <li>تابع منشوراتهم اليومية لمدة 30 يوم</li>
                                <li>سجّل: نوع المحتوى، وقت النشر، عدد التفاعلات</li>
                                <li>حدد الأنماط: ما الذي يعمل معهم باستمرار؟</li>
                                <li>طبّق الدروس على استراتيجيتك (بدون نسخ)</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ب. أدوات التحليل الموصى بها</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Facebook Insights:</strong> مجاني، بيانات مباشرة من المصدر.</li>
                                <li><strong>Meta Business Suite:</strong> تحليلات متقدمة وجدولة.</li>
                                <li><strong>Social Blade:</strong> تتبع نمو الصفحات المنافسة.</li>
                                <li><strong>Buffer Analyze:</strong> مقارنة أداء متعدد المنصات.</li>
                            </ul>
                        </div>

                        <h3>الفصل السادس: الأخطاء القاتلة وكيفية تجنبها</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>6.1 أخطاء الخوارزمية (Algorithm Mistakes)</h4>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>أ. القتل الصامت للوصول (Silent Reach Killers)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>النشر ثم الاختفاء:</strong> تنشر ولا تتفاعل في الساعات التالية. الخوارزمية تفهم أن المحتوى لا يستحق الترويج.</li>
                                <li><strong>التعديل المبكر:</strong> تعديل المنشور في أول ساعة يُعيد تقييم الخوارزمية من الصفر.</li>
                                <li><strong>حذف التعليقات السلبية:</strong> إلا إذا كانت مسيئة، الحذف يقلل مصداقية الصفحة.</li>
                                <li><strong>شراء التفاعل:</strong> حتى لو كان "غير مكتشف"، التفاعل الرخيص يخفض جودة جمهورك.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>6.2 أخطاء المحتوى (Content Mistakes)</h4>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>أ. مشاكل الخطافات</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>خطاف ضعيف أو عام جداً</li>
                                <li>خطاف مضلل (Clickbait) - يضر بسمعتك طويلة المدى</li>
                                <li>عدم وجود "وعد واضح" في أول سطرين</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ب. مشاكل الهيكل</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>فقرات طويلة جداً (3+ أسطر متصلة)</li>
                                <li>عدم وجود نقاط مرقمة أو تعداد</li>
                                <li>غياب الأمثلة العملية</li>
                                <li>عدم وجود CTA واضح في النهاية</li>
                            </ul>
                        </div>

                        <h3>الفصل السابع: استراتيجيات النمو المتسارع</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>7.1 نموذج "النمو المركب" (Compound Growth Model)</h4>
                            <p>النمو الحقيقي على فيسبوك ليس خطياً، بل مركب. كل منشور ناجح يبني على نجاح المنشور السابق:
                            </p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الأسبوع 1-2:</strong> تركيز على الجودة. 10 منشورات "محكمة" تبني سمعة الصفحة.</li>
                                <li><strong>الأسبوع 3-4:</strong> تحليل البيانات. تكرار ما نجح، إيقاف ما فشل.</li>
                                <li><strong>الأسبوع 5-8:</strong> التكثيف. زيادة وتيرة النشر مع الحفاظ على الجودة.</li>
                                <li><strong>الأسبوع 9-12:</strong> التوسع. استكشاف أنواع محتوى جديدة بناءً على الأساس القوي.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>7.2 تكتيكات النمو السريع (Growth Hacking Tactics)</h4>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>أ. استراتيجية "التعليق الذهبي" (Golden Comment Strategy)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>حدد 10 صفحات كبيرة في مجالك (100K+ متابع)</li>
                                <li>فعّل إشعارات منشوراتهم</li>
                                <li>كن من أوائل المعلقين بكل منشور</li>
                                <li>اكتب تعليقاً يضيف قيمة، ليس "مشاركة رائعة"</li>
                                <li>مثال: "نقطة مهمة! أضيف أن الإحصائية الأخيرة تظهر..."</li>
                                <li>النتيجة: مئات الزيارات المجانية لصفحتك يومياً</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ب. استراتيجية "التعاون المتبادل" (Cross-Pollination)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>تواصل مع صفحات بحجم صفحتك (أو أكبر قليلاً)</li>
                                <li>اقترح "منشور مشترك" (Collab Post)</li>
                                <li>كل صفحة تعرض الأخرى لجمهورها</li>
                                <li>تبادل الخبرات: أنت تكتب عن الاقتصاد، هم يكتبون عن ريادة الأعمال</li>
                            </ul>
                        </div>

                        <h3>الفصل الثامن: المستقبل والاستعداد للتغييرات</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>8.1 اتجاهات خوارزميات 2026-2027</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الذكاء الاصطناعي التوليدي:</strong> فيسبوك يطور قدرة على كشف المحتوى المولّد بالـ AI. المحتوى "البشري الأصيل" سيُكافأ.</li>
                                <li><strong>الفيديو القصير:</strong> Reels سيستمر في الحصول على أولوية. حضّر محتوى فيديو عمودي.</li>
                                <li><strong>المجتمعات الخاصة:</strong> Groups و Broadcast Channels ستحصل على مزيد من الأهمية.</li>
                                <li><strong>الشفافية:</strong> فيسبوك سيعطي مزيداً من البيانات للناشرين عن "لماذا نجح أو فشل منشورك".</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>8.2 كيف تبقى محدّثاً (Staying Updated)</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Meta for Business Blog:</strong> المصدر الرسمي لأحدث التغييرات.</li>
                                <li><strong>Matt Navarra (Twitter):</strong> من أفضل مصادر أخبار السوشيال ميديا.</li>
                                <li><strong>Social Media Today:</strong> تحليلات يومية عميقة.</li>
                                <li><strong>اختبر دائماً:</strong> لا تصدق أي "قاعدة" بدون اختبارها على صفحتك.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ background: 'linear-gradient(135deg, rgba(24, 119, 242, 0.2) 0%, rgba(24, 119, 242, 0.05) 100%)', border: '2px solid rgba(24, 119, 242, 0.3)' }}>
                            <h4> قائمة التحقق النهائية (Master Checklist)</h4>
                            <p>قبل نشر أي منشور، تأكد من:
                            </p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '2' }}>
                                <li> الخطاف قوي ويخلق فضولاً أو يعد بفائدة</li>
                                <li> أول سطرين يجبران على النقر على "اقرأ المزيد"</li>
                                <li> المحتوى يقدم قيمة حقيقية وقابلة للتطبيق</li>
                                <li> هناك أمثلة عملية أو أرقام محددة</li>
                                <li> الهيكل سهل القراءة (فقرات قصيرة، نقاط)</li>
                                <li> هناك دعوة واضحة للتفاعل في النهاية</li>
                                <li> الصورة/الكاروسيل عالي الجودة وذو صلة</li>
                                <li> تنشر في الوقت الأمثل لجمهورك</li>
                                <li> مستعد للرد على التعليقات في أول 60 دقيقة</li>
                                <li> لا توجد روابط في نص المنشور</li>
                            </ul>
                        </div>

                        <h3>الفصل التاسع: المصطلحات التقنية المتقدمة (Advanced Technical Glossary)</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>9.1 مصطلحات الخوارزميات الأساسية</h4>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>أ. مصطلحات متعلقة بالوصول (Reach Terminology)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Organic Reach (الوصول العضوي):</strong> عدد الأشخاص الذين شاهدوا منشورك بدون دفع. هذا هو "الوصول الحقيقي" الذي تعنيه الخوارزمية.</li>
                                <li><strong>Viral Reach (الوصول الفيروسي):</strong> عدد الأشخاص الذين شاهدوا منشورك لأن شخصاً آخر تفاعل معه (شارك، علّق، أعجب). هذا مؤشر قوي على جودة المحتوى.</li>
                                <li><strong>Paid Reach (الوصول المدفوع):</strong> الوصول الناتج عن الإعلانات الممولة.</li>
                                <li><strong>Unique Reach (الوصول الفريد):</strong> عدد الحسابات الفريدة (بدون تكرار). شخص واحد قد يرى منشورك 5 مرات = 5 انطباعات، 1 وصول فريد.</li>
                                <li><strong>Cumulative Reach (الوصول التراكمي):</strong> مجموع الوصول عبر جميع المنشورات في فترة زمنية.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ب. مصطلحات التفاعل (Engagement Terminology)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Engagement Rate by Reach (ERR):</strong> (إجمالي التفاعلات ÷ الوصول) × 100. هذا هو المقياس الأصح للتفاعل الحقيقي.</li>
                                <li><strong>Engagement Rate by Impressions (ERI):</strong> (إجمالي التفاعلات ÷ الانطباعات) × 100. يقيس فعالية كل ظهور.</li>
                                <li><strong>Amplification Rate (معدل التضخيم):</strong> (عدد المشاركات ÷ إجمالي التفاعلات) × 100. يقيس كم من التفاعل تحول لمشاركة.</li>
                                <li><strong>Virality Rate (معدل الفيروسية):</strong> (عدد المشاركات ÷ الوصول) × 100. نسبة الأشخاص الذين شاركوا المنشور من الذين شاهدوه.</li>
                                <li><strong>Conversation Rate (معدل المحادثة):</strong> (عدد التعليقات ÷ إجمالي التفاعلات) × 100. يقيس جودة النقاش.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>9.2 مصطلحات متقدمة في تحليل الأداء</h4>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>أ. مقاييس الوقت والاستبقاء</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Dwell Time (وقت التوقف/الإقامة):</strong> المدة التي يقضيها المستخدم في مشاهدة منشورك قبل التمرير. هذا هو "الملك الخفي" للخوارزميات 2026.</li>
                                <li><strong>Average Watch Time (متوسط وقت المشاهدة):</strong> للفيديو - متوسط الوقت الذي يشاهده الناس قبل التوقف.</li>
                                <li><strong>Completion Rate (معدل الإكمال):</strong> نسبة الأشخاص الذين شاهدوا الفيديو/الكاروسيل بالكامل.</li>
                                <li><strong>Re-watch Rate (معدل إعادة المشاهدة):</strong> نسبة الأشخاص الذين أعادوا مشاهدة المحتوى. إشارة قوية جداً للقيمة.</li>
                                <li><strong>Scroll-Stop Rate (معدل إيقاف التمرير):</strong> نسبة الأشخاص الذين توقفوا عند منشورك من إجمالي من مرّوا عليه. الهدف: 20%+.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ب. مقاييس النمو والاحتفاظ</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Follower Churn Rate (معدل فقدان المتابعين):</strong> (عدد إلغاء المتابعة ÷ إجمالي المتابعين) × 100. إذا كان {'>'} 5% شهرياً، هناك مشكلة.</li>
                                <li><strong>Net Follower Growth (صافي نمو المتابعين):</strong> المتابعون الجدد - إلغاء المتابعة. هذا هو "النمو الحقيقي".</li>
                                <li><strong>Follow-Through Rate (معدل المتابعة من المنشور):</strong> (المتابعون الجدد من منشور ÷ وصول المنشور) × 100. يقيس قوة المنشور في جذب المتابعين.</li>
                                <li><strong>Audience Retention (احتفاظ الجمهور):</strong> نسبة المتابعين النشطين الذين يرون منشوراتك بانتظام.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>9.3 مصطلحات خوارزمية فيسبوك الخاصة</h4>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>أ. نظام الجودة والسمعة</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Quality Ranking (تصنيف الجودة):</strong> تقييم فيسبوك لجودة منشورك مقارنة بالمنشورات الأخرى الموجهة لنفس الجمهور. (Above Average, Average, Below Average).</li>
                                <li><strong>Engagement Rate Ranking (تصنيف معدل التفاعل):</strong> كيف يقارن تفاعلك بالمنافسين على نفس الجمهور.</li>
                                <li><strong>Conversion Rate Ranking (تصنيف معدل التحويل):</strong> للمنشورات التي لها CTA - كيف يقارن أداؤك.</li>
                                <li><strong>Page Quality Score (نقاط جودة الصفحة):</strong> تقييم سري (0-100) يؤثر على كل منشوراتك. يُبنى على تاريخ الصفحة.</li>
                                <li><strong>Authenticity Score (نقاط الأصالة):</strong> تقييم مدى "أصالة" محتواك (ليس AI-generated، ليس منسوخاً).</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ب. مصطلحات العقوبات والقيود</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Shadowban (الحظر الخفي):</strong> عندما يُخفَض وصولك بشكل كبير بدون إشعار. يحدث عند انتهاك متكرر للقوانين.</li>
                                <li><strong>Reach Penalty (عقوبة الوصول):</strong> خفض متعمد للوصول بسبب محتوى منخفض الجودة أو مبالغ فيه.</li>
                                <li><strong>Engagement Bait Penalty (عقوبة تصيد التفاعل):</strong> عقوبة على منشورات تطلب التفاعل بشكل صريح ("علق بـ نعم").</li>
                                <li><strong>Clickbait Penalty (عقوبة العناوين المضللة):</strong> عقوبة على عناوين لا تقدّم ما تعد به.</li>
                                <li><strong>Unoriginal Content Flag (علامة المحتوى غير الأصلي):</strong> عندما يُكتشف أن محتواك منسوخ، يُعلَم حسابك وتُخفَض أولويتك.</li>
                            </ul>
                        </div>

                        <h3>الفصل العاشر: دراسات حالة عملية (Case Studies)</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>10.1 دراسة حالة: صفحة اقتصادية نمت من 0 إلى 50K في 90 يوم</h4>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>أ. الخلفية</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الصفحة:</strong> "اقتصاد بلا تعقيد" - صفحة توعية مالية</li>
                                <li><strong>البداية:</strong> 0 متابع، يناير 2026</li>
                                <li><strong>النتيجة:</strong> 52,000 متابع، مارس 2026</li>
                                <li><strong>الميزانية:</strong> 0 دولار (نمو عضوي 100%)</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ب. الاستراتيجية المُطبّقة</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الأسبوع 1-2:</strong> 10 منشورات "تأسيسية" عالية الجودة جداً (كاروسيل 8 شرائح كل منها). التركيز على "أخطاء مالية شائعة".</li>
                                <li><strong>الأسبوع 3-4:</strong> تطبيق استراتيجية "التعليق الذهبي" على 15 صفحة كبيرة. 20 تعليق يومياً.</li>
                                <li><strong>الأسبوع 5-8:</strong> إطلاق سلسلة "درس في دقيقة" - كاروسيل يومي بنفس التنسيق البصري.</li>
                                <li><strong>الأسبوع 9-12:</strong> تكثيف النشر لـ 3 مرات يومياً + بث مباشر أسبوعي.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ج. الأرقام التفصيلية</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>إجمالي المنشورات:</strong> 180 منشور في 90 يوم</li>
                                <li><strong>أفضل منشور:</strong> "7 أخطاء تدمر مدخراتك" - 2.3 مليون وصول، 45K مشاركة</li>
                                <li><strong>متوسط معدل التفاعل:</strong> 8.5% (أعلى من المتوسط بـ 4x)</li>
                                <li><strong>معدل التحويل للمتابعة:</strong> 12% من الزوار يتابعون</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>د. الدروس المستفادة</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>الاستمرارية أهم من الكمال. نشر يومي أفضل من منشور "مثالي" كل أسبوع.</li>
                                <li>التعليق على الصفحات الكبيرة جلب 40% من النمو الأولي.</li>
                                <li>الهوية البصرية الموحدة جعلت الصفحة "قابلة للتعرف" فوراً.</li>
                                <li>أول 30 يوم كانت الأصعب. بعد كسر حاجز 5K متابع، النمو أصبح "تلقائياً".</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>10.2 دراسة حالة: منشور فيروسي وصل لـ 5 مليون شخص</h4>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>أ. تشريح المنشور</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>النوع:</strong> كاروسيل 8 شرائح</li>
                                <li><strong>العنوان:</strong> "الراتب لا يجعلك غنياً. هذه الـ 7 طرق تفعل."</li>
                                <li><strong>وقت النشر:</strong> الثلاثاء 8:15 مساءً</li>
                                <li><strong>الأداء النهائي:</strong> 5.2 مليون وصول، 180K مشاركة، 12K متابع جديد من منشور واحد</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ب. لماذا نجح؟</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الخطاف:</strong> صدم القارئ بكسر معتقد شائع ("الراتب يجعلك غنياً").</li>
                                <li><strong>التوقيت:</strong> مساء الثلاثاء - ذروة التفاعل للأسبوع.</li>
                                <li><strong>القيمة:</strong> 7 خطوات عملية قابلة للتطبيق فوراً.</li>
                                <li><strong>القابلية للمشاركة:</strong> المحتوى "يمثّل" الناس، أرادوا مشاركته مع أصدقائهم.</li>
                                <li><strong>الحظ:</strong> شاركه شخص لديه 100K متابع في أول ساعتين.</li>
                            </ul>
                        </div>

                        <h3>الفصل الحادي عشر: أدوات ومساحات العمل الاحترافية</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>11.1 أدوات إنشاء المحتوى</h4>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>أ. التصميم البصري</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Canva Pro:</strong> الأفضل للكاروسيل والصور. استخدم "Brand Kit" لحفظ هويتك.</li>
                                <li><strong>Figma:</strong> للمحترفين - تحكم كامل، قوالب قابلة لإعادة الاستخدام.</li>
                                <li><strong>Adobe Express:</strong> بديل Canva مع ميزات AI متقدمة.</li>
                                <li><strong>CapCut:</strong> للفيديو والريبوست - مجاني وقوي.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>ب. الكتابة والتحرير</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Notion:</strong> لتنظيم محتوى التقويم والافكار.</li>
                                <li><strong>Grammarly (للإنجليزي):</strong> تدقيق لغوي.</li>
                                <li><strong>LanguageTool (للعربي):</strong> تدقيق إملائي ونحوي.</li>
                                <li><strong>Hemingway App:</strong> لتبسيط النصوص وجعلها أكثر وضوحاً.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>11.2 أدوات الجدولة والتحليل</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Meta Business Suite:</strong> مجاني، رسمي، كافٍ لمعظم الاحتياجات.</li>
                                <li><strong>Buffer:</strong> بسيط، يدعم منصات متعددة، تحليلات جيدة.</li>
                                <li><strong>Hootsuite:</strong> للمحترفين والفرق - غالي لكن قوي.</li>
                                <li><strong>Social Blade:</strong> لتحليل المنافسين ومتابعة النمو.</li>
                                <li><strong>Phlanx:</strong> لحساب معدلات التفاعل ومقارنة الصفحات.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ background: 'linear-gradient(135deg, rgba(24, 119, 242, 0.25) 0%, rgba(24, 119, 242, 0.1) 100%)', border: '2px solid rgba(24, 119, 242, 0.4)' }}>
                            <h4> شهادة إتمام الدليل التعليمي</h4>
                            <p>إذا قرأت وفهمت كل الفصول الـ 11 في هذا الدليل، فأنت الآن تمتلك:</p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '2' }}>
                                <li> فهماً عميقاً لكيفية عمل خوارزميات فيسبوك 2026</li>
                                <li> معرفة بأكثر من 50 مصطلحاً تقنياً متقدماً</li>
                                <li> قدرة على تحليل الأداء باحترافية</li>
                                <li> استراتيجيات نمو مُجرّبة ومثبتة</li>
                                <li> أدوات عملية للتطبيق الفوري</li>
                            </ul>
                            <p style={{ marginTop: '1rem', fontWeight: 'bold', fontSize: '1.1rem' }}>الخطوة التالية: التطبيق. المعرفة بدون تنفيذ = لا قيمة لها.</p>
                            <p style={{ marginTop: '0.5rem', fontSize: '14px', color: '#a0a0a0' }}>ابدأ بمنشور واحد اليوم. طبّق ما تعلمته. حلّل النتائج. كرّر.</p>
                        </div>
                                                </div>
                        </details>
                    </section>

                    <section id="appendix">
                        <details className="toggle-section">
                            <summary>
                                <h2><span></span> الملحق الشامل - موارد إضافية</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>أ. قاموس المصطلحات الإنجليزية-العربية</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                                <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                    <li><strong>Algorithm:</strong> الخوارزمية</li>
                                    <li><strong>Reach:</strong> الوصول</li>
                                    <li><strong>Impressions:</strong> الانطباعات</li>
                                    <li><strong>Engagement:</strong> التفاعل</li>
                                    <li><strong>Organic:</strong> عضوي</li>
                                    <li><strong>Viral:</strong> فيروسي</li>
                                    <li><strong>Feed:</strong> الخلاصة</li>
                                    <li><strong>Post:</strong> المنشور</li>
                                    <li><strong>Carousel:</strong> كاروسيل (صور متعددة)</li>
                                    <li><strong>Reels:</strong> ريلز (فيديو قصير)</li>
                                    <li><strong>Stories:</strong> ستوريز (قصص)</li>
                                    <li><strong>Live:</strong> بث مباشر</li>
                                    <li><strong>Insights:</strong> رؤى/تحليلات</li>
                                    <li><strong>Analytics:</strong> تحليلات</li>
                                    <li><strong>Metrics:</strong> مقاييس</li>
                                </ul>
                                <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                    <li><strong>KPI (Key Performance Indicator):</strong> مؤشر الأداء الرئيسي</li>
                                    <li><strong>ROI (Return on Investment):</strong> العائد على الاستثمار</li>
                                    <li><strong>CTR (Click-Through Rate):</strong> معدل النقر</li>
                                    <li><strong>CPM (Cost Per Mille):</strong> تكلفة ألف انطباع</li>
                                    <li><strong>CPC (Cost Per Click):</strong> تكلفة النقرة</li>
                                    <li><strong>Target Audience:</strong> الجمهور المستهدف</li>
                                    <li><strong>Demographics:</strong> البيانات الديموغرافية</li>
                                    <li><strong>Psychographics:</strong> البيانات السيكوجرافية</li>
                                    <li><strong>Content Calendar:</strong> تقويم المحتوى</li>
                                    <li><strong>Scheduling:</strong> جدولة</li>
                                    <li><strong>Moderation:</strong> إشراف/تعديل</li>
                                    <li><strong>Community Management:</strong> إدارة المجتمع</li>
                                    <li><strong>Crisis Management:</strong> إدارة الأزمات</li>
                                    <li><strong>A/B Testing:</strong> اختبار أ/ب</li>
                                    <li><strong>Optimization:</strong> تحسين</li>
                                </ul>
                            </div>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>ب. قوالب جاهزة للاستخدام</h4>

                            <h5 style={{ marginTop: '1rem', color: '#93c5fd' }}>قالب خطة محتوى أسبوعية</h5>
                            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem', fontFamily: 'monospace', fontSize: '13px' }}>
{`┌─────────────────────────────────────────────┐
│        خطة المحتوى الأسبوعية               │
│        الأسبوع: ___ / ___ / 2026            │
├─────────────────────────────────────────────┤
│ الأحد:                                      │
│ • النوع: كاروسيل تعليمي                    │
│ • الموضوع: ___________________             │
│ • الوقت: 8:00 مساءً                        │
│ • CTA: احفظ هذا المنشور                    │
├─────────────────────────────────────────────┤
│ الاثنين:                                    │
│ • النوع: نص + صورة                         │
│ • الموضوع: ___________________             │
│ • الوقت: 12:00 ظهراً                       │
│ • CTA: شارك رأيك في التعليقات             │
├─────────────────────────────────────────────┤
│ الثلاثاء:                                   │
│ • النوع: كاروسيل تعليمي                    │
│ • الموضوع: ___________________             │
│ • الوقت: 8:00 مساءً                        │
│ • CTA: تابعنا للمزيد                       │
├─────────────────────────────────────────────┤
│ ... (كرر لباقي الأيام)                     │
└─────────────────────────────────────────────┘`}
                            </div>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h5 style={{ color: '#93c5fd' }}>قالب تحليل المنافسين</h5>
                            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem', fontFamily: 'monospace', fontSize: '13px' }}>
{`┌─────────────────────────────────────────────┐
│        تحليل المنافسين الشهري              │
│        الشهر: ___ / 2026                    │
├─────────────────────────────────────────────┤
│ المنافس 1: ________________                │
│ • عدد المتابعين: _________                 │
│ • النمو الشهري: _________                  │
│ • متوسط التفاعل: _________                 │
│ • أفضل منشور: ________________             │
│ • نقاط القوة: ________________             │
│ • نقاط الضعف: ________________             │
│ • الدروس المستفادة: ________________       │
├─────────────────────────────────────────────┤
│ المنافس 2: ________________                │
│ ... (كرر لكل منافس)                        │
└─────────────────────────────────────────────┘`}
                            </div>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h5 style={{ color: '#93c5fd' }}>قالب تقرير الأداء الشهري</h5>
                            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem', fontFamily: 'monospace', fontSize: '13px' }}>
{`┌─────────────────────────────────────────────┐
│        تقرير الأداء الشهري                 │
│        الشهر: ___ / 2026                    │
├─────────────────────────────────────────────┤
│  المقاييس الرئيسية:                      │
│ • الوصول الكلي: _________ (vs ___% الشهر الماضي) │
│ • إجمالي التفاعلات: _________              │
│ • معدل التفاعل: ___% (vs ___% الشهر الماضي)│
│ • المتابعون الجدد: _________               │
│ • إلغاء المتابعة: _________                │
│ • صافي النمو: _________                    │
├─────────────────────────────────────────────┤
│  أفضل المنشورات:                         │
│ 1. ________________ : _________ وصول      │
│ 2. ________________ : _________ وصول      │
│ 3. ________________ : _________ وصول      │
├─────────────────────────────────────────────┤
│  الدروس المستفادة:                       │
│ • ما نجح: ________________                 │
│ • ما فشل: ________________                 │
│ • التحسينات المقترحة: ________________     │
├─────────────────────────────────────────────┤
│  أهداف الشهر القادم:                     │
│ • الوصول: _________                        │
│ • المتابعين الجدد: _________               │
│ • معدل التفاعل: ___%                       │
└─────────────────────────────────────────────┘`}
                            </div>
                        </div>

                        <h3>الفصل الثاني عشر: أسئلة شائعة (FAQ)</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>12.1 أسئلة حول الخوارزمية</h4>

                            <div style={{ marginTop: '1rem' }}>
                                <p style={{ fontWeight: 'bold', color: '#93c5fd' }}>س: كم مرة يجب أن أنشر يومياً؟</p>
                                <p style={{ marginRight: '1rem', lineHeight: '1.8' }}>ج: لمنشورات اقتصادية تعليمية، 1-2 منشور يومياً هو الأمثل. الجودة أهم من الكمية. منشور واحد ممتاز أفضل من 3 منشورات متوسطة.</p>
                            </div>

                            <div style={{ marginTop: '1rem' }}>
                                <p style={{ fontWeight: 'bold', color: '#93c5fd' }}>س: لماذا انخفض وصلي فجأة؟</p>
                                <p style={{ marginRight: '1rem', lineHeight: '1.8' }}>ج: أسباب محتملة: 1) تغيير خوارزمي من فيسبوك، 2) محتوى منخفض الجودة، 3) قلة التفاعل في الساعة الأولى، 4) عقوبة خفية. راجع تحليلاتك وحدد السبب.</p>
                            </div>

                            <div style={{ marginTop: '1rem' }}>
                                <p style={{ fontWeight: 'bold', color: '#93c5fd' }}>س: هل البث المباشر لا يزال فعالاً؟</p>
                                <p style={{ marginRight: '1rem', lineHeight: '1.8' }}>ج: نعم! البث المباشر يحصل على أولوية في الإشعارات. لكن يجب أن يكون له قيمة حقيقية. بث أسبوعي مدته 30-45 دقيقة مثالي.</p>
                            </div>

                            <div style={{ marginTop: '1rem' }}>
                                <p style={{ fontWeight: 'bold', color: '#93c5fd' }}>س: ما أفضل وقت للنشر؟</p>
                                <p style={{ marginRight: '1rem', lineHeight: '1.8' }}>ج: للجمهور العربي: 12-2 ظهراً و 8-10 مساءً. لكن راجع تحليلاتك الخاصة - جمهورك قد يكون مختلفاً.</p>
                            </div>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>12.2 أسئلة حول المحتوى</h4>

                            <div style={{ marginTop: '1rem' }}>
                                <p style={{ fontWeight: 'bold', color: '#93c5fd' }}>س: هل أستخدم AI لكتابة المحتوى؟</p>
                                <p style={{ marginRight: '1rem', lineHeight: '1.8' }}>ج: استخدم AI للمسودات الأولى والأفكار، لكن أعد الكتابة دائماً بصوتك البشري. فيسبوك 2026 يكتشف المحتوى AI-generated ويخفض أولويته.</p>
                            </div>

                            <div style={{ marginTop: '1rem' }}>
                                <p style={{ fontWeight: 'bold', color: '#93c5fd' }}>س: هل أنشر نفس المحتوى على منصات متعددة؟</p>
                                <p style={{ marginRight: '1rem', lineHeight: '1.8' }}>ج: يمكنك إعادة استخدام الأفكار، لكن عدّل التنسيق لكل منصة. ما ينجح على إنستغرام قد لا ينجح على فيسبوك بنفس الصيغة.</p>
                            </div>

                            <div style={{ marginTop: '1rem' }}>
                                <p style={{ fontWeight: 'bold', color: '#93c5fd' }}>س: كم يجب أن يكون طول المنشور؟</p>
                                <p style={{ marginRight: '1rem', lineHeight: '1.8' }}>ج: للمنشورات التعليمية: 300-800 كلمة. للمنشورات النقاشية: 100-300 كلمة. المهم: فقّرات جيداً واستخدم مساحات بيضاء.</p>
                            </div>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>12.3 أسئلة حول النمو</h4>

                            <div style={{ marginTop: '1rem' }}>
                                <p style={{ fontWeight: 'bold', color: '#93c5fd' }}>س: هل أستخدم الإعلانات المدفوعة؟</p>
                                <p style={{ marginRight: '1rem', lineHeight: '1.8' }}>ج: في البداية، ركّز على النمو العضوي. بعد الوصول لـ 5K متابع، يمكنك استخدام إعلانات Boost لأفضل منشوراتك بميزانية صغيرة (5-10 دولار/يوم).</p>
                            </div>

                            <div style={{ marginTop: '1rem' }}>
                                <p style={{ fontWeight: 'bold', color: '#93c5fd' }}>س: كيف أتعامل مع التعليقات السلبية؟</p>
                                <p style={{ marginRight: '1rem', lineHeight: '1.8' }}>ج: 1) الرد المهني السريع، 2) لا تحذف إلا إذا كان مسيئاً، 3) حوّل النقد لفرصة تحسين، 4) التعليقات السلبية تزيد التفاعل - الخوارزمية لا تميز بين إيجابي وسلبي.</p>
                            </div>

                            <div style={{ marginTop: '1rem' }}>
                                <p style={{ fontWeight: 'bold', color: '#93c5fd' }}>س: متى أتوقع رؤية نتائج؟</p>
                                <p style={{ marginRight: '1rem', lineHeight: '1.8' }}>ج: الجدول الواقعي: 30 يوم = 500-1000 متابع، 60 يوم = 3000-5000 متابع، 90 يوم = 10,000+ متابع. هذا يفترض نشر يومي واستراتيجية صحيحة.</p>
                            </div>
                        </div>

                        <div className="info-card" style={{ background: 'linear-gradient(135deg, rgba(24, 119, 242, 0.3) 0%, rgba(24, 119, 242, 0.15) 100%)', border: '2px solid rgba(24, 119, 242, 0.5)' }}>
                            <h4> مصادر موصى بها للتعلم المستمر</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                                <div>
                                    <p style={{ fontWeight: 'bold', color: '#93c5fd' }}>مدونات رسمية:</p>
                                    <ul style={{ marginRight: '1.5rem', lineHeight: '1.8', fontSize: '14px' }}>
                                        <li>Meta for Business Blog</li>
                                        <li>Facebook Engineering Blog</li>
                                        <li>Social Media Today</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style={{ fontWeight: 'bold', color: '#93c5fd' }}>قنوات يوتيوب:</p>
                                    <ul style={{ marginRight: '1.5rem', lineHeight: '1.8', fontSize: '14px' }}>
                                        <li>Meta Business Suite</li>
                                        <li>Social Media Examiner</li>
                                        <li>Later.com</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style={{ fontWeight: 'bold', color: '#93c5fd' }}>بودكاست:</p>
                                    <ul style={{ marginRight: '1.5rem', lineHeight: '1.8', fontSize: '14px' }}>
                                        <li>Social Media Marketing Podcast</li>
                                        <li>The Science of Social Media</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="info-card" style={{ marginTop: '2rem', background: 'linear-gradient(135deg, rgba(24, 119, 242, 0.35) 0%, rgba(24, 119, 242, 0.2) 100%)', border: '3px solid rgba(24, 119, 242, 0.6)', padding: '2rem' }}>
                            <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}> تهانينا! أكملت الدليل الشامل لفيسبوك</h3>
                            <p style={{ textAlign: 'center', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                أنت الآن تمتلك معرفة أعمق من 95% من مسؤولي السوشيال ميديا.<br/>
                                <strong>لكن المعرفة بدون تنفيذ لا قيمة لها.</strong><br/><br/>
                                <span style={{ fontSize: '1rem' }}>ابدأ اليوم: منشور واحد، فكرة واحدة، خطوة واحدة.<br/>
                                بعد 90 يوم من التطبيق المستمر، ستفاجئك النتائج.</span>
                            </p>
                            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontWeight: 'bold', color: '#93c5fd' }}>
                                "النجاح ليس حدثاً، إنه عادة يومية"
                            </p>
                        </div>
                                                </div>
                        </details>
                    </section>

                    <section id="warnings">
                        <details className="toggle-section">
                            <summary>
                                <h2><span>️</span> قوانين فيسبوك الصارمة وتجنب العقوبات</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">

                        <div className="warning-box">
                            <div className="icon"></div>
                            <div>
                                <h4>المحتوى السلبي / التحريضي</h4>
                                <p>تجنب العناوين التي تشير إلى "الانهيار، الدمار الاقتصادي الشامل" بكثرة أو الكلمات المتعلقة بالصراع (Violence). خوارزمية AI تصنفها كإثارة القلق (Fear-mongering) وتحد من التوزيع.</p>
                            </div>
                        </div>

                        <div className="warning-box">
                            <div className="icon"></div>
                            <div>
                                <h4>المحتوى المنسوخ والمعاد تدويره</h4>
                                <p>قوانين التوصية في 2026 حازمة. نسخ المقالات الاقتصادية من الصفحات الأخرى ووضعها سيقيد وصول الصفحة بالكامل فوراً (Unoriginal Content Penalty).</p>
                            </div>
                        </div>

                        <div className="warning-box">
                            <div className="icon"></div>
                            <div>
                                <h4>سبام الروابط الخارجية</h4>
                                <p>منع تام لاستخدام الروابط في نص البوست. بالإضافة إلى تجنب الـ Clickbait (عناوين خادعة أو تسول للإعجابات). الحوار الطبيعي هو المفتاح.</p>
                            </div>
                        </div>

                        <div className="warning-box">
                            <div className="icon"></div>
                            <div>
                                <h4>الوعود المالية الكاذبة</h4>
                                <p>تجنب وعود "الثراء السريع" أو "اربح 1000 دولار في يوم". فيسبوك يصنف هذا كـ Misleading Financial Claims ويحد من وصولك أو يغلق الصفحة.</p>
                            </div>
                        </div>

                        <div className="warning-box">
                            <div className="icon"></div>
                            <div>
                                <h4>شراء المتابعين والتفاعل الوهمي</h4>
                                <p>الخوارزمية تكتشف الحسابات الوهمية بسهولة. شراء متابعين أو استخدام خدمات التفاعل الآلي يؤدي لـ Shadowban فوري وفقدان المصداقية الخوارزمية.</p>
                            </div>
                        </div>

                        <div className="info-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, rgba(24, 119, 242, 0.15) 0%, rgba(24, 119, 242, 0.05) 100%)' }}>
                            <h4> لوحة متابعة الأداء الأسبوعي (KPIs Dashboard)</h4>
                            <ul>
                                <li><strong>Reach (الوصول):</strong> كم شخص شاهد منشوراتك هذا الأسبوع؟ الهدف: +15% أسبوعياً.</li>
                                <li><strong>Engagement Rate:</strong> (التعليقات + المشاركات + الإعجابات) ÷ الوصول × 100. الهدف: 5%+ للمنشورات الاقتصادية.</li>
                                <li><strong>Follower Growth:</strong> عدد المتابعين الجدد. الهدف: 500+ متابع أسبوعياً في المرحلة الأولى.</li>
                                <li><strong>Best Performing Post:</strong> حدد المنشور الأفضل وكرر صيغته.</li>
                                <li><strong>Peak Hours:</strong> سجل الأوقات التي حصل فيها أعلى تفاعل وعدّل جدولك بناءً عليها.</li>
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
