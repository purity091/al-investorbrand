import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    Shield, 
    Eye, 
    Users, 
    Settings, 
    LogOut, 
    ArrowLeft,
    LayoutDashboard,
    FileText,
    CheckCircle
} from 'lucide-react';

export const AdminDashboard = () => {
    const { profile, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    const adminMenuItems = [
        {
            title: 'التحكم في الظهور',
            description: 'إظهار/إخفاء الأقسام للزوار والمستخدمين',
            icon: <Eye size={32} />,
            color: 'bg-[#10B981]',
            action: () => navigate('/admin/visibility'),
            enabled: true
        },
        {
            title: 'إدارة المستخدمين',
            description: 'إضافة وتعديل المستخدمين والصلاحيات',
            icon: <Users size={32} />,
            color: 'bg-[#3B82F6]',
            action: () => navigate('/admin/users'),
            enabled: true
        },
        {
            title: 'إعدادات النظام',
            description: 'تكوين إعدادات الموقع العامة',
            icon: <Settings size={32} />,
            color: 'bg-[#6B7280]',
            action: () => navigate('/admin/settings'),
            enabled: false
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Nav Bar */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        {/* Right Side - Logo & Title */}
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#0D1137] rounded-lg flex items-center justify-center">
                                <Shield className="text-white" size={24} />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-[#0D1137]">لوحة التحكم</h1>
                                <p className="text-xs text-slate-500">نظام إدارة الموقع</p>
                            </div>
                        </div>

                        {/* Left Side - Actions */}
                        <div className="flex items-center gap-3">
                            {/* Back to Site */}
                            <button
                                onClick={() => navigate('/news')}
                                className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-bold text-slate-600"
                            >
                                <ArrowLeft size={16} />
                                <span>العودة للموقع</span>
                            </button>

                            {/* User Info */}
                            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
                                <div className="w-8 h-8 bg-[#00E1C1] rounded-full flex items-center justify-center">
                                    <span className="text-[#0D1137] font-bold text-sm">
                                        {profile?.full_name?.charAt(0) || profile?.email?.charAt(0) || 'U'}
                                    </span>
                                </div>
                                <div className="text-sm">
                                    <div className="font-bold text-[#0D1137]">{profile?.full_name || 'مستخدم'}</div>
                                    <div className="text-xs text-slate-500 capitalize">{profile?.role}</div>
                                </div>
                            </div>

                            {/* Logout */}
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-bold"
                            >
                                <LogOut size={16} />
                                <span>خروج</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-[#0D1137] mb-2">
                        مرحباً بك في لوحة التحكم 👋
                    </h2>
                    <p className="text-slate-500">
                        اختر أداة للبدء في إدارة الموقع
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 border border-slate-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center">
                                <Eye className="text-[#10B981]" size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-[#0D1137]">25+</div>
                                <div className="text-sm text-slate-500">قسم قابل للتحكم</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-slate-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center">
                                <Users className="text-[#3B82F6]" size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-[#0D1137]">--</div>
                                <div className="text-sm text-slate-500">المستخدمين النشطين</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-slate-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-lg flex items-center justify-center">
                                <CheckCircle className="text-[#F59E0B]" size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-[#0D1137]">5</div>
                                <div className="text-sm text-slate-500">منصات متاحة</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {adminMenuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={item.action}
                            disabled={!item.enabled}
                            className={`bg-white rounded-xl p-6 border-2 transition-all text-right
                                ${item.enabled 
                                    ? 'border-slate-200 hover:border-[#00E1C1] hover:shadow-lg cursor-pointer' 
                                    : 'border-slate-100 opacity-60 cursor-not-allowed'
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center text-white shrink-0`}>
                                    {item.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-[#0D1137] mb-1">{item.title}</h3>
                                    <p className="text-sm text-slate-500 mb-3">{item.description}</p>
                                    {!item.enabled && (
                                        <span className="text-xs px-2 py-1 bg-slate-100 text-slate-500 rounded-full font-bold">
                                            قريباً
                                        </span>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Quick Info */}
                <div className="mt-8 bg-[#0D1137] rounded-xl p-6 text-white">
                    <div className="flex items-start gap-4">
                        <LayoutDashboard className="text-[#00E1C1] shrink-0" size={24} />
                        <div>
                            <h3 className="font-bold mb-2">💡 نصائح سريعة</h3>
                            <ul className="text-sm text-white/80 space-y-1">
                                <li>• استخدم "التحكم في الظهور" لإخفاء/إظهار الأقسام للزوار</li>
                                <li>• يمكنك جعل الأقسام تتطلب تسجيل دخول أو تكون عامة</li>
                                <li>• التغييرات تُحفظ تلقائياً وتُطبق فوراً</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
