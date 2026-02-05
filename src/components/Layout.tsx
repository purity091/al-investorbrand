import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Layout as LayoutIcon,
  Target,
  ShieldCheck,
  Palette,
  MessageSquare,
  Smartphone,
  BookOpen,
  Code,
  Globe,
  Share2,
  Layers,
  Instagram,
  PenTool,
  ChevronDown,
  ChevronRight,
  Newspaper,
  GraduationCap,
  Radar,
  Rocket,
  Building2,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

const sections = [
  { id: 'snapshot', path: '', title: 'نظرة سريعة', icon: <LayoutIcon size={18} /> },
  { id: 'core', path: '/core', title: 'جوهر العلامة', icon: <Target size={18} /> },
  { id: 'strategy', path: '/strategy', title: 'الاستراتيجية', icon: <ShieldCheck size={18} /> },
  { id: 'ecosystem', path: '/ecosystem', title: 'منظومة المنتجات', icon: <Layers size={18} /> },
  { id: 'visual', path: '/visual', title: 'الهوية البصرية', icon: <Palette size={18} /> },
  { id: 'messaging', path: '/messaging', title: 'نظام الرسائل', icon: <MessageSquare size={18} /> },
  { id: 'social-content', path: '/social-content', title: 'محتوى التواصل', icon: <PenTool size={18} /> },
  { id: 'social', path: '/social', title: 'نماذج التواصل', icon: <Instagram size={18} /> },
  { id: 'regional', path: '/regional', title: 'الهوية الإقليمية', icon: <Globe size={18} /> },
  { id: 'digital', path: '/digital', title: 'التجربة الرقمية', icon: <Smartphone size={18} /> },
  { id: 'apps', path: '/apps', title: 'تطبيقات العلامة', icon: <Globe size={18} /> },
  { id: 'guidelines', path: '/guidelines', title: 'إرشادات الاستخدام', icon: <BookOpen size={18} /> },
  { id: 'developers', path: '/developers', title: 'للمطورين', icon: <Code size={18} /> },
];

const platforms = [
  { id: 'news', basePath: '/news', title: 'منصة المستثمر الإخبارية', icon: <Newspaper size={18} /> },
  { id: 'academy', basePath: '/academy', title: 'أكاديمية المستثمر', icon: <GraduationCap size={18} /> },
  { id: 'radar', basePath: '/radar', title: 'رادار المستثمر', icon: <Radar size={18} /> },
  { id: 'launch', basePath: '/launch', title: 'مساعد الإطلاق', icon: <Rocket size={18} /> },
  { id: 'saudi', basePath: '/saudi', title: 'المستثمر سعودية', icon: <Building2 size={18} /> },
];

export const Layout = () => {
  const location = useLocation();
  const [openPlatforms, setOpenPlatforms] = React.useState<Record<string, boolean>>({
    news: true,
    academy: false,
    radar: false,
    launch: false,
    saudi: false,
  });

  const togglePlatform = (platformId: string) => {
    setOpenPlatforms(prev => ({ ...prev, [platformId]: !prev[platformId] }));
  };

  // Automatically open the platform based on current URL
  React.useEffect(() => {
    const currentPlatform = platforms.find(p => location.pathname.startsWith(p.basePath));
    if (currentPlatform) {
      setOpenPlatforms(prev => ({ ...prev, [currentPlatform.id]: true }));
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen font-['IBM_Plex_Sans_Arabic']">
      {/* Sidebar Navigation */}
      <aside className="w-80 bg-white border-l border-slate-200 sticky top-0 h-screen overflow-y-auto z-50">
        <div className="p-6 border-b border-slate-100 mb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#0D1137] rounded-lg flex items-center justify-center p-1">
              <BrandLogo color="#FFFFFF" secondaryColor="#00E1C1" className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-[#0D1137]">المستثمر</h1>
              <p className="text-[10px] text-slate-400">نظام الهوية الموحد</p>
            </div>
          </div>
        </div>

        <nav className="px-3 space-y-2 pb-6">
          {platforms.map((platform) => (
            <div key={platform.id} className="space-y-1">
              <button
                onClick={() => togglePlatform(platform.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${location.pathname.startsWith(platform.basePath)
                    ? 'bg-[#0D1137] text-white'
                    : 'text-[#0D1137] hover:bg-slate-50'
                  }`}
              >
                <span className="flex items-center gap-2 text-sm font-bold">
                  {platform.icon}
                  {platform.title}
                </span>
                {openPlatforms[platform.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>

              {openPlatforms[platform.id] && (
                <div className="pr-3 space-y-0.5 border-r-2 border-slate-100 mr-3">
                  {sections.map((s) => (
                    <NavLink
                      key={s.id}
                      to={`${platform.basePath}${s.path}`}
                      end={s.path === ''}
                      className={({ isActive }) =>
                        `sidebar-link w-full flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-medium ${isActive
                          ? 'bg-[#00E1C1]/10 text-[#0D1137] font-bold'
                          : 'text-slate-500 hover:bg-slate-50'
                        }`
                      }
                    >
                      {s.icon}
                      <span>{s.title}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-auto p-6 border-t border-slate-100">
          <div className="flex items-center gap-2 text-[10px] font-bold text-[#0D1137] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            الوعي المالي العربي
          </div>
          <button className="flex items-center gap-2 text-[#00E1C1] font-bold hover:underline text-xs">
            <Share2 size={14} />
            <span>مشاركة المرجعية</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 lg:p-16 overflow-x-hidden bg-[#FBFBFB]">
        <Outlet />
      </main>
    </div>
  );
};
