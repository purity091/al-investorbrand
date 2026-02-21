import React from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
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
  Users,
  Headphones,
  Calendar,
  Shield,
  LogOut,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useAuth } from '../context/AuthContext';

const sections = [
  { id: 'snapshot', path: '', title: 'نظرة سريعة', icon: <LayoutIcon size={18} /> },
  { id: 'core', path: '/core', title: 'جوهر العلامة', icon: <Target size={18} /> },
  { id: 'strategy', path: '/strategy', title: 'الاستراتيجية', icon: <ShieldCheck size={18} /> },
  { id: 'ecosystem', path: '/ecosystem', title: 'منظومة المنتجات', icon: <Layers size={18} /> },
  { id: 'visual', path: '/visual', title: 'الهوية البصرية', icon: <Palette size={18} /> },
  { id: 'messaging', path: '/messaging', title: 'نظام الرسائل', icon: <MessageSquare size={18} /> },
  { id: 'social-content', path: '/social-content', title: 'محتوى التواصل', icon: <PenTool size={18} /> },
  { id: 'social', path: '/social', title: 'نماذج التواصل', icon: <Instagram size={18} /> },
  { id: 'social-media', path: '/social-media', title: 'منصات التواصل', icon: <Users size={18} /> },
  { id: 'podcast', path: '/podcast', title: 'بودكاست', icon: <Headphones size={18} /> },
  { id: 'planning', path: '/planning', title: 'التخطيط السنوي', icon: <Calendar size={18} /> },
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
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  const [openPlatforms, setOpenPlatforms] = React.useState<Record<string, boolean>>({
    news: true,
    academy: false,
    radar: false,
    launch: false,
    saudi: false,
  });
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const togglePlatform = (platformId: string) => {
    setOpenPlatforms(prev => ({ ...prev, [platformId]: !prev[platformId] }));
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  // Automatically open the platform based on current URL
  React.useEffect(() => {
    const currentPlatform = platforms.find(p => location.pathname.startsWith(p.basePath));
    if (currentPlatform) {
      setOpenPlatforms(prev => ({ ...prev, [currentPlatform.id]: true }));
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen font-['IBM_Plex_Sans_Arabic'] overflow-hidden bg-[#FBFBFB] relative">

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed z-50 top-6 transition-all duration-300 p-2.5 bg-white border border-slate-200 shadow-md rounded-full text-slate-500 hover:text-[#0D1137] hover:bg-slate-50 flex items-center justify-center
          ${isSidebarOpen ? 'right-[20rem] -mr-5' : 'right-4'}
        `}
        title="تبديل القائمة الجانبية"
      >
        {isSidebarOpen ? <ChevronRight size={18} /> : <Menu size={18} />}
      </button>

      {/* Backdrop for mobile overlays */}
      {!isSidebarOpen && false /* disabled for now, using push instead of overlay */}

      {/* Sidebar Navigation */}
      <aside className={`bg-white border-l border-slate-200 sticky top-0 h-screen overflow-hidden z-40 transition-all duration-300 flex-shrink-0 ${isSidebarOpen ? 'w-80' : 'w-0 border-none'}`}>
        <div className="w-80 flex flex-col h-full overflow-y-auto overflow-x-hidden">
          <div className="p-6 border-b border-slate-100 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0D1137] rounded-lg flex items-center justify-center p-1 shrink-0">
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

            {/* Admin Link - Only for admins */}
            {profile?.role === 'admin' || profile?.role === 'superadmin' ? (
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 w-full px-3 py-2 bg-[#0D1137] text-white rounded-lg hover:bg-[#1a237e] transition-colors text-xs font-bold mb-2"
              >
                <Shield size={14} />
                <span>لوحة التحكم</span>
              </button>
            ) : null}

            {/* User Info & Logout */}
            {profile && (
              <div className="mb-2 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-[#0D1137]">{profile.full_name || profile.email}</span>
                  <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] capitalize">{profile.role}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 w-full px-3 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-xs font-bold"
                >
                  <LogOut size={14} />
                  <span>تسجيل خروج</span>
                </button>
              </div>
            )}

            <button className="flex items-center gap-2 text-[#00E1C1] font-bold hover:underline text-xs">
              <Share2 size={14} />
              <span>مشاركة المرجعية</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 lg:p-16 h-screen overflow-y-auto bg-[#FBFBFB] relative transition-all duration-300 min-w-0">
        <Outlet />
      </main>
    </div>
  );
};
