import React, { useEffect } from 'react';
import './plans.css';

export const XPlan = () => {
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
        <div className="plan-container x-plan" style={{ '--platform-color': '#ffffff' } as any}>
            <div className="bg-glow top-right" style={{ opacity: 0.05 }}></div>
            <div className="bg-glow bottom-left" style={{ opacity: 0.05 }}></div>

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
                        <div className="badge" style={{ background: '#fff', color: '#000' }}>الهدف: 10,000 متابع خلال 60 يوم</div>
                        <h1>خطة احترافية لمنصة <span style={{ background: '#fff', padding: '0 20px', borderRadius: '10px', color: '#000' }}>X</span> (تويتر سابقاً)</h1>
                        <p>ساحة الكبار والأخبار. المحتوى هنا يجب أن يكون صاععاً، سريعاً، وثرياً. هذه الخطة مصممة للتوافق مع نظام التوصية (Thunder & Phoenix) وأنظمة الذكاء الاصطناعي على المنصة.</p>
                    </header>

                    <div className="sections-wrapper">
                    <section>
                        <details className="toggle-section">
                            <summary>
                                <h2><span></span> خوارزميات X 2026 والجمهور</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">
                        <div className="grid-2">
                            <div className="info-card">
                                <h4>الثالوث المقدس (Replies, Read Time, Bookmarks)</h4>
                                <p>التفضيلات (Likes) أصبحت ذات وزن أقل. نظام التوصيات يبحث عن التغريدة التي يضغط عليها المستخدم لقراءتها ببطء، وتفتح الصور المرفقة، ثم يُعلق عليها أو يحفظها.</p>
                                <p style={{ marginTop: '10px', fontSize: '14px', color: '#a0a0a0' }}><strong>نصيحة ذهبية:</strong> اجعل أول تغريدة في الثريد تحتوي "وعد" قوي يجبر المستخدم على إكمال القراءة.</p>
                            </div>
                            <div className="info-card">
                                <h4>قوة أول 60 دقيقة وتأثير الحيتان</h4>
                                <p>نظام Thunder يراقب تغريدتك في أول ساعة. إذا استجاب لها أشخاص موثقون أو ذوو متابعين (حسابات كبيرة)، فإن الخوارزمية تدفِعها لكل شخص غير متابع لك (الـ For You page).</p>
                                <p style={{ marginTop: '10px', fontSize: '14px', color: '#a0a0a0' }}><strong>تكتيك:</strong> بعد النشر، أرسل التغريدة لـ 5-10 أصدقاء موثوقين ليعلقوا عليها فوراً.</p>
                            </div>
                        </div>
                        <div className="info-card" style={{ marginTop: '1.5rem' }}>
                            <h4>فيصل الروابط والمقاطعة</h4>
                            <p>منصة X تكره أن يغادر المستخدم. دمج الروابط في التغريدة الأم يقضي على وصولها فوراً (عقوبة متعمدة بالخوارزمية). يجب وضع الروابط دائماً في تعليق منفصل (تغريدة اقتباس أو رد).</p>
                        </div>
                        <div className="info-card" style={{ marginTop: '1.5rem' }}>
                            <h4>إشارات الخوارزمية الأساسية (Ranking Signals)</h4>
                            <ul>
                                <li><strong>وقت القراءة (Read Time):</strong> كلما طالت مدة بقاء المستخدم يقرأ تغريدتك، زاد انتشارها.</li>
                                <li><strong>الردود الطويلة:</strong> الردود التي تتجاوز 20 كلمة تعتبر نقاشاً حقيقياً وتُعزز الوصول.</li>
                                <li><strong>الاقتباس (Quote Tweet):</strong> عندما يقتبس شخص تغريدتك مع إضافة رأيه، هذه إشارة فيروسية قوية.</li>
                                <li><strong>العلامات (Bookmarks):</strong> إشارة قوية أن المحتوى "قيّم" ويستحق الحفظ للرجوع إليه.</li>
                                <li><strong>التحقق من المتابعة:</strong> إذا تابع شخص حسابك بعد قراءة تغريدة، هذا يعني محتوى عالي الجودة.</li>
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
                                <h4>صيغ النشر المعتمدة</h4>
                                <p><strong>الثريد المرئي (Carousel/Thread):</strong> استخدم الصور ككاروسيل مع تغريدة مختصرة وصادمة كغلاف (Hook). هذا يرفع مدة القراءة.</p>
                                <p><strong>تغريدة نصية + ديزاين قوي:</strong> إنفوغرافيك لتلخيص الأرقام المزعجة أو الخدع المالية. تغريدة السطر الواحد الصادمة تُعد ممتازة للإطلاق.</p>
                                <p><strong>Polls (التصويتات):</strong> مرة أسبوعياً لخلق تفاعل سريع وجمع آراء الجمهور.</p>
                                <p style={{ marginTop: '10px', fontSize: '14px', color: '#a0a0a0' }}><strong>نصيحة:</strong> استخدم الفراغات البيضاء بين الأسطر لتسهيل القراءة على الجوال.</p>
                            </div>
                            <div className="info-card">
                                <h4>الوتيرة (3-5 مرات يومياً)</h4>
                                <p>منصة X تختلف عن فيسبوك، هي منصة إخبارية وسريعة. يمكنك النشر من 3 إلى 5 مرات يومياً دون إزعاج المتابعين، بشرط وجود فارق ساعتين أو أكثر بين كل تغريدة لتجنب حظر الـ Spam.</p>
                                <ul>
                                    <li><strong>الصباح (8-9 صباحاً):</strong> تغريدة نقاشية أو سؤال للجمهور.</li>
                                    <li><strong>الظهيرة (12-1 ظهراً):</strong> ثريد تعليمي أو كاروسيل.</li>
                                    <li><strong>المساء (6-8 مساءً):</strong> إنفوغرافيك أو إحصائية صادمة.</li>
                                    <li><strong>أفضل الأيام:</strong> الأحد، الاثنين، الثلاثاء هي أيام الذروة للتفاعل الاقتصادي.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="info-card" style={{ marginTop: '1.5rem' }}>
                            <h4>هيكل الثريد المثالي (Anatomy of a Viral Thread)</h4>
                            <ul>
                                <li><strong>التغريدة 1 (Hook):</strong> جملة صادمة أو وعد قوي. يجب أن تجبر المستخدم على التوقف والتمرير.</li>
                                <li><strong>التغريدة 2 (Problem):</strong> حدد المشكلة أو الألم الذي يعاني منه الجمهور.</li>
                                <li><strong>التغريدة 3-8 (Value):</strong> قدم الحلول، الخطوات، أو المعلومات القيمة.</li>
                                <li><strong>التغريدة الأخيرة (CTA/Summary):</strong> ملخص سريع + دعوة للمتابعة أو الحفظ.</li>
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
                            <h3>المرحلة الأولى: تهيئة المنصة والتثبيت (الأيام 1-7) <span className="phase-badge">الأساسيات</span></h3>
                            <div className="phase-content">
                                <div className="goal">تأسيس السلطة (Authority) للزوار الجدد.</div>
                                <ul>
                                    <li>التأكد من أن صياغة واجهة البروفايل (الاسم، الغلاف، البايو) تدل على أنك كيان خبير، وموثوق بالمعلومات المذكورة.</li>
                                    <li>كتابة "السلسلة المثبتة" (Pinned Thread) المرعبة: أكثر ثريد كاروسيل مليء بالقيمة، تثبته كواجهة، لأن كل زائر قادم من التوصيات سيقرأه ويقرر بناءً عليه أن يتابعك.</li>
                                    <li><strong>البايو (Bio):</strong> جملة واضحة تحدد من أنت وماذا تقدم. مثال: "أبسط الاقتصاد وأعلمك كيف تحمي دخلك من التضخم".</li>
                                    <li><strong>التحضير:</strong> تجهيز 15-20 تغريدة (ثريدات، إنفوغرافيك، أسئلة) للبدء بقوة.</li>
                                    <li><strong>Pinned Tweet:</strong> أفضل ثريد تعليمي لديك، ثبته كواجهة للحساب.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="phase-card">
                            <h3>المرحلة الثانية: استراتيجية التعليقات القناصة (الأسابيع 2-4) <span className="phase-badge">أول 2000 متابع</span></h3>
                            <div className="phase-content">
                                <div className="goal">سرقة الزيارات من الحسابات العملاقة بشكل شرعي وأنيق.</div>
                                <ul>
                                    <li><strong>الاشتباك:</strong> كتابة 20 رد "عميق وإضافي" يومياً على حسابات رواد الأعمال الكبار والأخبار الاقتصادية فور نشرهم. لا تكن متسولاً للمتابعة، فقط أضف قيمة أو تصحيح. الزوار سيدخلون حسابك من تعليقك.</li>
                                    <li>نشر 3 منشورات يومياً. (1 سؤال نقاشي للجمهور، كاروسيل تعليمي، و 1 إنفوغرافيك وحقائق).</li>
                                    <li><strong>Reply Game:</strong> فعّل إشعارات الحسابات الكبيرة (10-15 حساب) وكن أول من يعلق بتعليق ذكي.</li>
                                    <li><strong>Networking:</strong> تواصل مع 5-10 حسابات في حجمك لتبادل الدعم والتفاعل.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="phase-card">
                            <h3>المرحلة الثالثة: النمو الأسي (الأسابيع 5-8) <span className="phase-badge">الوصول لـ 10,000</span></h3>
                            <div className="phase-content">
                                <div className="goal">تكرار النجاحات والاندماج في أحاديث الساعة (Trending).</div>
                                <ul>
                                    <li>مشاركة الأخبار الاقتصادية الساخنة (اقتباس/Quote Tweet) مع "تحليلك الخاص"، هذا يدمجك في المواضيع الشائعة ويمنحك وصولاً مضاعفاً.</li>
                                    <li>الاستمرار بكثافة في الثريدات المرئية (التي تظهر ككاروسيل في X) التي تناقش "دليلاً شاملاً" أو "فضحاً للخرافات" لجلب الـ Bookmarks.</li>
                                    <li>تنظيم المساحات (X Spaces) الصوتية الأسبوعية متى ما سنحت الفرصة للتواصل المباشر (Boost كبير للحساب).</li>
                                    <li><strong>Trending Topics:</strong> شارك في المحادثات الرائجّة بذكاء عندما تتعلق بالاقتصاد أو المال.</li>
                                    <li><strong>Collaborative Threads:</strong> ثريدات مشتركة مع حسابات مشابهة.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="phase-card" style={{ marginTop: '1.5rem' }}>
                            <h3>المرحلة الرابعة: الترسخ والتوسع (الأسابيع 9-12) <span className="phase-badge">ما بعد 10K</span></h3>
                            <div className="phase-content">
                                <div className="goal">تحويل المتابعين إلى مجتمع متفاعل وولاء طويل الأمد.</div>
                                <ul>
                                    <li><strong>X Premium:</strong> فكر في الاشتراك بالخدمة المميزة لزيادة المصداقية والوصول.</li>
                                    <li><strong>Newsletter:</strong> أطلق نشرة X الأسبوعية لأهم الدروس الاقتصادية.</li>
                                    <li><strong>Long-form Content:</strong> استخدم ميزة المقالات الطويلة لـ X للمحتوى المعمق.</li>
                                    <li><strong>Analytics Mastery:</strong> راجع Analytics أسبوعياً لتحديد أفضل الأوقات، الصيغ، والمواضيع تكراراً.</li>
                                    <li><strong>Monetization:</strong> استكشف خيارات الربح من X (Ads revenue sharing) إذا كنت مؤهلاً.</li>
                                </ul>
                            </div>
                        </div>
                                                </div>
                        </details>
                    </section>

                    <section id="content-types">
                        <details className="toggle-section">
                            <summary>
                                <h2><span></span> 30 فكرة لتغريدات اقتصادية (القوائم الجاهزة)</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">
                        <div className="content-types-list">
                            <div className="type-item">
                                <span className="num">01</span>
                                <strong>كشف الأسرار</strong>
                                <span>كاروسيل: 5 أسرار عن البنوك لا يريدونك أن تعرفها.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">02</span>
                                <strong>المقارنات المذهلة</strong>
                                <span>انفوغرافيك: الراتب في عام 2000 مقابل الراتب اليوم أمام التضخم.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">03</span>
                                <strong>قصص الشركات الطويلة (الثريد)</strong>
                                <span>قصة: كيف خسرت شركة نوكيا سوقاً كانت تحتكره وما هو درس الاستثمار؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">04</span>
                                <strong>المفاهيم في أبسط صورة</strong>
                                <span>نص+صورة: ما معنى "السوق الهابط البير ماركت" وكيف تستفيد منه؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">05</span>
                                <strong>مخططات 1-2-3 (Frameworks)</strong>
                                <span>كاروسيل: 3 خطوات بسيطة لبناء محفظة طوارئ في 6 أشهر.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">06</span>
                                <strong>أخطاء القاع المالي</strong>
                                <span>نص: "أكبر كذبة اقتصادية تصدقها هي أن الادخار سيجعلك ثرياً. إليك السبب..."</span>
                            </div>
                            <div className="type-item">
                                <span className="num">07</span>
                                <strong>السؤال المثير للجدل</strong>
                                <span>سؤال: هل تعتبر شراء بيت عن طريق قرض بنكي استثماراً أم حماقة؟ (التعليقات ستنفجر).</span>
                            </div>
                            <div className="type-item">
                                <span className="num">08</span>
                                <strong>النصائح الزمنية</strong>
                                <span>كاروسيل: 7 أشياء يجب أن تفعلها بمالك قبل بلوغك الثلاثين.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">09</span>
                                <strong>التوقعات القصيرة</strong>
                                <span>تغريدة: ما سيحدث إذا تم استبدال الدولار بـ ...</span>
                            </div>
                            <div className="type-item">
                                <span className="num">10</span>
                                <strong>اقتباسات رواد الأعمال مع التعليق</strong>
                                <span>(Quote): إيلون ماسك يقول كذا.. كيف نترجم هذا للواقع؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">11</span>
                                <strong>كتب مالية ملخصة</strong>
                                <span>كاروسيل ممتع: خلاصة كتاب "أغنى رجل في بابل" في 5 صور فقط.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">12</span>
                                <strong>الحقائق الرقمية</strong>
                                <span>انفوغرافيك: 10 أرقام عن الاقتصاد العالمي ستصدمك.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">13</span>
                                <strong>دليل سريع</strong>
                                <span>ثريد: دليلك السريع لفهم العملات الرقمية في 10 تغريدات.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">14</span>
                                <strong>تحدي الأسبوع</strong>
                                <span>تغريدة: تحدي الأسبوع - وفر 10% من مصروفك اليومي وسجل النتيجة.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">15</span>
                                <strong>نصيحة يومية</strong>
                                <span>تغريدة قصيرة: نصيحة مالية واحدة تطبقها اليوم.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">16</span>
                                <strong>تحليل حدث</strong>
                                <span>ثريد: تحليل فوري لحدث اقتصادي وقع اليوم وتداعياته.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">17</span>
                                <strong>مقارنة سريعة</strong>
                                <span>صورة: الاستثمار في الذهب VS الاستثمار في العقار.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">18</span>
                                <strong>سلسلة الدروس</strong>
                                <span>ثريد: سلسلة "اقتصاد في دقائق" - الحلقة الأولى: التضخم.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">19</span>
                                <strong>أدوات مفيدة</strong>
                                <span>تغريدة: 5 تطبيقات مجانية لإدارة ميزانيتك الشخصية.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">20</span>
                                <strong>قصة ملهمة</strong>
                                <span>ثريد: قصة شخص بدأ من الصفر وبَنى ثروة - الدروس المستفادة.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">21</span>
                                <strong>إحصاء الأسبوع</strong>
                                <span>صورة: إحصائية اقتصادية صادمة مع شرح مختصر.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">22</span>
                                <strong>سؤال للجمهور</strong>
                                <span>تغريدة: ما أكبر خطأ مالي ارتكبته في حياتك؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">23</span>
                                <strong>توقعات المحللين</strong>
                                <span>ثريد: ماذا يتوقع كبار الاقتصاديين للاقتصاد العالمي في 2026؟</span>
                            </div>
                            <div className="type-item">
                                <span className="num">24</span>
                                <strong>مصطلح الأسبوع</strong>
                                <span>تغريدة: شرح مبسط لمصطلح "العائد على الاستثمار ROI".</span>
                            </div>
                            <div className="type-item">
                                <span className="num">25</span>
                                <strong>تحذير مالي</strong>
                                <span>كاروسيل: 5 علامات تحذيرية تدل على أنك في طريقك للإفلاس.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">26</span>
                                <strong>رد على شائعة</strong>
                                <span>تغريدة: تصحيح لمعلومة اقتصادية خاطئة منتشرة.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">27</span>
                                <strong>استراتيجية استثمار</strong>
                                <span>ثريد: استراتيجية الاستثمار بالدولار المتوسط (DCA) شرح وتطبيق.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">28</span>
                                <strong>مقولة الأسبوع</strong>
                                <span>صورة: مقولة اقتصادية ملهمة مع شرح تطبيقها.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">29</span>
                                <strong>تجربة شخصية</strong>
                                <span>تغريدة: درس تعلمته من تجربة استثمارية شخصية.</span>
                            </div>
                            <div className="type-item">
                                <span className="num">30</span>
                                <strong>ملخص الأسبوع</strong>
                                <span>ثريد: أهم 5 أحداث اقتصادية هذا الأسبوع في خيط واحد.</span>
                            </div>
                        </div>
                                                </div>
                        </details>
                    </section>

                    <section id="education">
                        <details className="toggle-section">
                            <summary>
                                <h2><span></span> الدليل التعليمي الشامل لمسؤولي السوشيال ميديا - X (تويتر)</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">

                        <div className="info-card" style={{ marginBottom: '2rem' }}>
                            <h3>مقدمة: X 2026 - ساحة النقاش العالمية</h3>
                            <p>X في 2026 هي المنصة الأسرع والأكثر ديناميكية. خوارزميتها تعتمد على "اللحظة" و"الصدى". المحتوى هنا يعيش دقائق لكن تأثيره قد يمتد لسنوات. نظام التوصية الجديد (Thunder & Phoenix) يكتشف المحتوى الواعد خلال 60 دقيقة فقط.</p>
                            <p>كمسؤول سوشيال ميديا، يجب أن تفهم أن X تكافئ "الجرأة الفكرية" و"السرعة". من يتأخر يفقد اللحظة. هذا الدليل سيأخذك في عمق خوارزميات X وكيفية استغلالها بذكاء.</p>
                        </div>

                        <h3>الفصل الأول: التشريح العميق لخوارزميات X</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>1.1 نظام "Thunder" - المحرك الفيروسي</h4>
                            <p>Thunder هو نظام التوصية الرئيسي في X. يعمل على ثلاث مراحل:</p>

                            <h5 style={{ marginTop: '1rem', color: '#fff' }}>أ. مرحلة الكشف (0-15 دقيقة)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>التحليل الفوري:</strong> عند النشر، تُحلّل التغريدة خلال ثوانٍ.</li>
                                <li><strong>التصنيف:</strong> تحديد الموضوع، النبرة، والجمهور المحتمل.</li>
                                <li><strong>الاختبار المصغّر:</strong> تُعرض على 0.1-0.5% من متابعيك.</li>
                                <li><strong>حساسية الوقت:</strong> كل دقيقة مهمة. التفاعل البطيء = موت التغريدة.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#fff' }}>ب. مرحلة التضخيم (15-60 دقيقة)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>شرط التضخيم:</strong> معدل تفاعل {'>'} 3% في المرحلة الأولى.</li>
                                <li><strong>تأثير الحيتان:</strong> إذا تفاعل حساب كبير (10K+ متابع)، يُضاعف الوصول 10x.</li>
                                <li><strong>نطاق التضخيم:</strong> 5-20% من متابعيك + For You page.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#fff' }}>ج. مرحلة الفيروسية (1-6 ساعات)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>شرط الفيروسية:</strong> معدل تفاعل {'>'} 8% + اقتباسات متعددة.</li>
                                <li><strong>نطاق الفيروسية:</strong> 50%+ من متابعيك + ظهور في Trending.</li>
                                <li><strong>مدة الحياة:</strong> تغريدة X تعيش 15-30 دقيقة فقط، لكن الفيروسية تمتد لساعات.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>1.2 إشارات الترتيب في X</h4>

                            <h5 style={{ marginTop: '1rem', color: '#fff' }}>أ. إشارات التفاعل (مرتببة بالأهمية)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الاقتباس مع تعليق (Quote Tweet):</strong> وزن 10x - يدل على نقاش حقيقي</li>
                                <li><strong>الرد الطويل (20+ كلمة):</strong> وزن 8x - يحفز النقاش</li>
                                <li><strong>إعادة التغريد (Retweet):</strong> وزن 6x</li>
                                <li><strong>العلامة (Bookmark):</strong> وزن 7x - إشارة للقيمة</li>
                                <li><strong>الرد القصير:</strong> وزن 4x</li>
                                <li><strong>الإعجاب (Like):</strong> وزن 1x - الأضعف</li>
                                <li><strong>وقت القراءة:</strong> وزن 5x - قراءة كاملة للتغريدة</li>
                                <li><strong>زيارة البروفايل:</strong> وزن 6x</li>
                                <li><strong>المتابعة بعد التغريدة:</strong> وزن 15x</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#fff' }}>ب. إشارات خاصة بـ X</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>تأثير الحسابات الموثقة:</strong> تفاعل الحسابات الموثقة بـ Premium يضاعف الوصول 3x.</li>
                                <li><strong>سرعة التفاعل:</strong> التفاعل في أول 10 دقائق يضاعف الوزن 2x.</li>
                                <li><strong>نقاش متداخل:</strong> ردود على ردود (Threaded Replies) تزيد الوزن 1.5x.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>1.3 نظام "السمعة اللحظية" (Momentary Reputation)</h4>
                            <p>X فريدة في أن "سمعتك" تُقيّم لحظياً:</p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>آخر 10 تغريدات:</strong> الخوارزمية تقيّم أداء آخر 10 تغريدات لتحديد "زخمك الحالي".</li>
                                <li><strong>التغريدة الواحدة:</strong> تغريدة فيروسية واحدة يمكنها تغيير مسار حسابك كلياً.</li>
                                <li><strong>النسيان السريع:</strong> الفشل يُنسى بسرعة. جرّب مرة أخرى فوراً.</li>
                            </ul>
                        </div>

                        <h3>الفصل الثاني: سيكولوجية جمهور X</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>2.1 العقلية السريعة للجمهور</h4>
                            <p>جمهور X في "حالة تنقل سريع" - يبحثون عن:</p>

                            <h5 style={{ marginTop: '1rem', color: '#fff' }}>أ. الدوافع الأساسية</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الأخبار الفورية:</strong> "ماذا يحدث الآن؟"</li>
                                <li><strong>الرأي السريع:</strong> "ماذا يقول الخبراء عن هذا؟"</li>
                                <li><strong>الفكاهة:</strong> "أريد شيئاً يضحكني."</li>
                                <li><strong>النقاش:</strong> "أريد أن أشارك رأيي."</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#fff' }}>ب. ما يقدّره الجمهور</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الإيجاز:</strong> أقل كلمات، أكثر تأثير.</li>
                                <li><strong>الجرأة:</strong> رأي واضح وغير مهذّب زائداً.</li>
                                <li><strong>السرعة:</strong> أول من يعلّق على الحدث يكسب.</li>
                                <li><strong>الذكاء:</strong> نكتة ذكية أو ملاحظة دقيقة.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>2.2 أنماط الاستهلاك السريع</h4>

                            <h5 style={{ marginTop: '1rem', color: '#fff' }}>أ. الأوقات الذهبية</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>6-8 صباحاً:</strong> أخبار الصباح، تصفح سريع.</li>
                                <li><strong>12-2 ظهراً:</strong> استراحة، نقاشات أطول.</li>
                                <li><strong>6-9 مساءً:</strong> ذروة الاستخدام، محتوى متنوع.</li>
                                <li><strong>الأحداث المباشرة:</strong> أثناء الأحداث الكبرى (مباريات، مؤتمرات)، التفاعل يضاعف 5x.</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#fff' }}>ب. سلوكيات التمرير</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>السرعة القصوى:</strong> 50+ تغريدة في الدقيقة للمستخدم النشط.</li>
                                <li><strong>التوقف الانتقائي:</strong> يتوقفون عند: كلمات كبيرة، أرقام، أسئلة، صور.</li>
                                <li><strong>القراءة السطحية:</strong> 80% يقرؤون أول سطر فقط.</li>
                            </ul>
                        </div>

                        <h3>الفصل الثالث: هندسة التغريدة المثالية</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>3.1 تشريح التغريدة الفيروسية</h4>

                            <h5 style={{ marginTop: '1rem', color: '#fff' }}>أ. التغريدة الفردية المثالية</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>السطر 1 (الخطاف):</strong>
                                    <ul>
                                        <li>جملة واحدة قوية</li>
                                        <li>كلمات كبيرة أو أرقام في البداية</li>
                                        <li>مثال: "90% من الناس يضيعون فرصتهم المالية الأولى."</li>
                                    </ul>
                                </li>
                                <li><strong>السطر 2-3 (القيمة):</strong>
                                    <ul>
                                        <li>شرح مختصر جداً</li>
                                        <li>رقم أو مثال محدد</li>
                                    </ul>
                                </li>
                                <li><strong>السطر الأخير (الدعوة):</strong>
                                    <ul>
                                        <li>سؤال أو دعوة للتفكير</li>
                                        <li>مثال: "ما هي فرصتك التي ضاعت؟"</li>
                                    </ul>
                                </li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#fff' }}>ب. الثريد المثالي (8-10 تغريدات)</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>التغريدة 1:</strong> خطاف قوي + "دليل في 10 تغريدات"</li>
                                <li><strong>التغريدة 2:</strong> المشكلة/الألم</li>
                                <li><strong>التغريدة 3-8:</strong> الحل/الخطوات</li>
                                <li><strong>التغريدة 9:</strong> ملخص سريع</li>
                                <li><strong>التغريدة 10:</strong> CTA + دعوة للمتابعة</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>3.2 كتابة الخطافات القاتلة</h4>

                            <h5 style={{ marginTop: '1rem', color: '#fff' }}>أ. أنواع الخطافات</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الرقم الصادم:</strong> "خسر 2 مليون دولار في يوم واحد..."</li>
                                <li><strong>التناقض:</strong> "كل نصائح الادخار التي سمعتها خطأ..."</li>
                                <li><strong>السؤال المباشر:</strong> "ما أكبر خطأ مالي ارتكبته؟"</li>
                                <li><strong>القصة المصغّرة:</strong> "بدأ من الصفر. بعد 5 سنوات..."</li>
                                <li><strong>القائمة:</strong> "7 دروس تعلمتها من خسارة مليون..."</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#fff' }}>ب. قواعد الخطاف الناجح</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>أقل من 20 كلمة للسطر الأول</li>
                                <li>كلمة واحدة كبيرة (CAPS) للتركيز</li>
                                <li>رقم محدد إن أمكن</li>
                                <li>لا مساحة بيضاء بعد السطر الأول (يجب التمرير)</li>
                            </ul>
                        </div>

                        <h3>الفصل الرابع: استراتيجيات النمو المتقدمة</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>4.1 استراتيجية "الرد الذهبي" (Golden Reply Strategy)</h4>
                            <p>أقوى استراتيجية نمو على X:
                            </p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>حدد 30 حساباً كبيراً في مجالك (50K+ متابع)</li>
                                <li>فعّل إشعارات كل الحسابات</li>
                                <li>كن من أوائل 5 أشخاص يردون</li>
                                <li>اكتب رداً يضيف قيمة أو زاوية جديدة</li>
                                <li>مثال: "نقطة مهمة! الأحدث أن الإحصائية ارتفعت لـ 85% حسب تقرير الأسبوع..."</li>
                                <li>النتيجة: 1000-5000 زيارة لبروفايلك يومياً</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>4.2 استراتيجية "الثريد الأسبوعي" (Weekly Thread)</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>ثريد واحد طويل أسبوعياً (10-15 تغريدة)</li>
                                <li>موضوع شامل ومعمق</li>
                                <li>نفس اليوم والوقت كل أسبوع</li>
                                <li>هذا يصبح "علامة تجارية" لحسابك</li>
                                <li>المتابعون ينتظرونه أسبوعياً</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>4.3 استراتيجية "اللحظة الخبرية" (Newsjacking)</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li>راقب Trending باستمرار</li>
                                <li>عند حدث اقتصادي كبير، كن أول من يعلّق</li>
                                <li>أضف تحليلك الخاص خلال 30 دقيقة</li>
                                <li>استخدم الهاشتاغ الرسمي للحدث</li>
                                <li>هذا يضمن وصولاً فيروسياً فورياً</li>
                            </ul>
                        </div>

                        <h3>الفصل الخامس: التحليلات والقياس</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>5.1 المقاييس الأساسية</h4>

                            <h5 style={{ marginTop: '1rem', color: '#fff' }}>أ. مقاييس التغريدة</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Impressions:</strong> عدد مرات الظهور</li>
                                <li><strong>Engagements:</strong> مجموع كل التفاعلات</li>
                                <li><strong>Engagement Rate:</strong> (تفاعلات ÷ انطباعات) × 100</li>
                                <li><strong>Detail Expands:</strong> نقرات على "اقرأ المزيد"</li>
                                <li><strong>Profile Clicks:</strong> زيارات البروفايل من التغريدة</li>
                            </ul>

                            <h5 style={{ marginTop: '1rem', color: '#fff' }}>ب. مقاييس الحساب</h5>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Follower Growth:</strong> نمو المتابعين اليومي</li>
                                <li><strong>Top Tweet:</strong> أفضل تغريدة أداءً</li>
                                <li><strong>Mentions:</strong> عدد المرات التي ذُكرت فيها</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)', border: '2px solid rgba(255, 255, 255, 0.3)' }}>
                            <h4 style={{ color: '#fff' }}> قائمة التحقق النهائية لـ X</h4>
                            <p>قبل نشر أي تغريدة:
                            </p>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '2' }}>
                                <li style={{ color: '#ccc' }}> السطر الأول قوي ويخلق فضولاً</li>
                                <li style={{ color: '#ccc' }}> أقل من 280 حرف للتغريدة الفردية</li>
                                <li style={{ color: '#ccc' }}> هناك رقم أو كلمة كبيرة للتركيز</li>
                                <li style={{ color: '#ccc' }}> سؤال أو دعوة في النهاية</li>
                                <li style={{ color: '#ccc' }}> لا روابط في التغريدة الأم</li>
                                <li style={{ color: '#ccc' }}> تنشر في وقت نشاط عالي</li>
                                <li style={{ color: '#ccc' }}> مستعد للرد على التعليقات في أول 30 دقيقة</li>
                                <li style={{ color: '#ccc' }}> للثريد: جميع التغريدات متصلة منطقياً</li>
                            </ul>
                        </div>

                        <h3>الفصل السادس: المصطلحات التقنية المتقدمة لـ X</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>6.1 مصطلحات الوصول والانطباعات</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Impressions (الانطباعات):</strong> عدد مرات ظهور التغريدة. في X هذا الرقم يكون عالياً جداً بسبب سرعة التمرير.</li>
                                <li><strong>Organic Impressions:</strong> الانطباعات بدون دفع.</li>
                                <li><strong>For You Impressions:</strong> ظهور في صفحة "لك" - مؤشر على الفيروسية.</li>
                                <li><strong>Following Impressions:</strong> ظهور لمتابعيك فقط.</li>
                                <li><strong>Trending Impressions:</strong> ظهور من خلال المواضيع الرائجّة.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>6.2 مصطلحات التفاعل</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Engagements (التفاعلات):</strong> مجموع كل التفاعلات (لايك، رد، إعادة، علامة).</li>
                                <li><strong>Engagement Rate:</strong> (التفاعلات ÷ الانطباعات) × 100. المعدل الجيد: 3%+.</li>
                                <li><strong>Detail Expands (توسيع التفاصيل):</strong> نقرات على "Show more" أو لفتح التغريدة بالكامل.</li>
                                <li><strong>Link Clicks:</strong> نقرات على الروابط (في الردود).</li>
                                <li><strong>Hashtag Clicks:</strong> نقرات على الهاشتاغات.</li>
                                <li><strong>Media Views:</strong> مشاهدات الصور/الفيديو.</li>
                                <li><strong>Media Engagements:</strong> تفاعلات مع الوسائط (تكبير صورة، تشغيل فيديو).</li>
                            </ul>
                        </div>

                        <h3>الفصل السابع: دراسات حالة لـ X</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>7.1 دراسة حالة: حساب اقتصادي وصل لـ 80K متابع في 90 يوم</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>الاستراتيجية:</strong> 5 تغريدات يومياً + 30 رد ذكي يومياً على حسابات كبيرة + ثريد أسبوعي طويل.</li>
                                <li><strong>أفضل ثريد:</strong> "دليل الثراء في 20 تغريدة" - 8 مليون انطباع، 25K متابع من ثريد واحد.</li>
                                <li><strong>المفتاح:</strong> السرعة في الرد على الأحداث + قيمة عالية في الثريدات.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>7.2 دراسة حالة: تغريدة فردية وصلت لـ 15 مليون انطباع</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>التغريدة:</strong> "أكبر كذبة مالية سمعتها: 'البيت استثمار'. الحقيقة: ..." (278 حرف)</li>
                                <li><strong>الأداء:</strong> 15.2M انطباع، 45K إعجاب، 8K إعادة، 3K ردود.</li>
                                <li><strong>لماذا نجحت:</strong> كسر معتقد شائع + إثارة جدل + إيجاز.</li>
                            </ul>
                        </div>

                        <h3>الفصل الثامن: أدوات X الاحترافية</h3>

                        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
                            <h4>8.1 أدوات التحليل</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>X Analytics:</strong> مجاني ومباشر.</li>
                                <li><strong>Twitter Analytics Pro:</strong> تحليلات أعمق.</li>
                                <li><strong>Social Blade:</strong> لتتبع النمو.</li>
                                <li><strong>Followerwonk:</strong> لتحليل المتابعين.</li>
                            </ul>
                            <h4 style={{ marginTop: '1rem' }}>8.2 أدوات الإنشاء والجدولة</h4>
                            <ul style={{ marginRight: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Typefully:</strong> لكتابة وجدولة الثريدات.</li>
                                <li><strong>Hypefury:</strong> أتمتة النشر وإعادة التدوير.</li>
                                <li><strong>Canva:</strong> للصور والإنفوغرافيك.</li>
                            </ul>
                        </div>

                        <div className="info-card" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)', border: '2px solid rgba(255, 255, 255, 0.4)' }}>
                            <h4 style={{ color: '#fff' }}> شهادة إتمام دليل X</h4>
                            <p>أنت تمتلك الآن فهماً عميقاً لخوارزميات X، 25+ مصطلحاً متقدماً، واستراتيجيات نمو مُجرّبة.</p>
                            <p style={{ marginTop: '1rem', fontWeight: 'bold', color: '#fff' }}>تذكّر: X منصة السرعة. من يتأخر يفقد. كن سريعاً، كن جريئاً، كن قيّماً.</p>
                        </div>
                                                </div>
                        </details>
                    </section>

                    <section id="warnings">
                        <details className="toggle-section">
                            <summary>
                                <h2><span>️</span> تحذيرات وقوانين القمع على X</h2>
                                <span className="toggle-icon">▼</span>
                            </summary>
                            <div className="toggle-content">

                        <div className="warning-box" style={{ borderColor: '#555', background: 'rgba(255, 255, 255, 0.05)' }}>
                            <div className="icon" style={{ color: '#fff' }}></div>
                            <div>
                                <h4 style={{ color: '#fff' }}>لعنة التغريدات المتضمنة لروابط</h4>
                                <p style={{ color: '#bbb' }}>خوارزمية X تضرب وصول التغريدات المحتوية على روابط (توجيه لمواقع، أو يوتيوب) في مقتل. إذا أردت التسويق، اكتب الـ Value في الثريد، وضع الرابط في آخر تعليق.</p>
                            </div>
                        </div>

                        <div className="warning-box" style={{ borderColor: '#555', background: 'rgba(255, 255, 255, 0.05)' }}>
                            <div className="icon" style={{ color: '#fff' }}></div>
                            <div>
                                <h4 style={{ color: '#fff' }}>التفاعل المتبادل المفضوح بالجروبات</h4>
                                <p style={{ color: '#bbb' }}>الـ Engagement Pods يتم اصطيادها بسرعة من نظام المراقبة ويعتبر الحساب (Spam) ويُعاقب بـ (Shadowban) مخفي.</p>
                            </div>
                        </div>

                        <div className="warning-box" style={{ borderColor: '#555', background: 'rgba(255, 255, 255, 0.05)' }}>
                            <div className="icon" style={{ color: '#fff' }}></div>
                            <div>
                                <h4 style={{ color: '#fff' }}>التعليقات الترويجية المباشرة (Reply Spamming)</h4>
                                <p style={{ color: '#bbb' }}>التعليق أسفل تغريدات المشاهير بعبارات مثل "تابعوني" أو "أقدم محتوى كذا" سيؤدي لحظر الحساب تماماً. يجب أن يكون التعليق مادة نقاشية مفيدة.</p>
                            </div>
                        </div>

                        <div className="warning-box" style={{ borderColor: '#555', background: 'rgba(255, 255, 255, 0.05)' }}>
                            <div className="icon" style={{ color: '#fff' }}></div>
                            <div>
                                <h4 style={{ color: '#fff' }}>إعادة التغريد المفرطة بدون إضافة</h4>
                                <p style={{ color: '#bbb' }}>إعادة التغريد المستمرة بدون إضافة رأيك أو قيمة (Quote Tweet مع تعليق) لا تبني علامتك الشخصية. اجعل 80% من محتواك أصلياً و20% إعادة تغريد.</p>
                            </div>
                        </div>

                        <div className="warning-box" style={{ borderColor: '#555', background: 'rgba(255, 255, 255, 0.05)' }}>
                            <div className="icon" style={{ color: '#fff' }}></div>
                            <div>
                                <h4 style={{ color: '#fff' }}>المعلومات المالية المضللة</h4>
                                <p style={{ color: '#bbb' }}>X تشدد العقوبات على نشر معلومات مالية كاذبة أو وعود ثراء سريع. تجنب الادعاءات غير المثبتة والنصائح الاستثمارية الخطيرة.</p>
                            </div>
                        </div>

                        <div className="info-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)' }}>
                            <h4 style={{ color: '#fff' }}> لوحة متابعة الأداء الأسبوعي (KPIs Dashboard)</h4>
                            <ul>
                                <li style={{ color: '#ccc' }}><strong>Impressions (الانطباعات):</strong> كم مرة ظهرت تغريداتك؟ الهدف: +30% أسبوعياً.</li>
                                <li style={{ color: '#ccc' }}><strong>Engagement Rate:</strong> (الردود + إعادة التغريد + الإعجابات) ÷ الانطباعات × 100. الهدف: 5%+.</li>
                                <li style={{ color: '#ccc' }}><strong>Profile Clicks:</strong> كم شخص زار بروفايلك؟ الهدف: 300+ أسبوعياً.</li>
                                <li style={{ color: '#ccc' }}><strong>New Followers:</strong> متابعون جدد من التغريدات. الهدف: 250+ أسبوعياً.</li>
                                <li style={{ color: '#ccc' }}><strong>Bookmarks:</strong> عدد مرات حفظ تغريداتك. الهدف: 50+ أسبوعياً.</li>
                                <li style={{ color: '#ccc' }}><strong>Top Tweet:</strong> حدد التغريدة الأفضل وكرر صيغتها.</li>
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
