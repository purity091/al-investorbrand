import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, Shield } from 'lucide-react';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { signIn, signUp, resetPassword } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as any)?.from?.pathname || '/news';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (isSignUp) {
                const { error } = await signUp(email, password, fullName);
                if (error) throw error;
                setSuccess('تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب.');
                setEmail('');
                setPassword('');
                setFullName('');
            } else {
                const { error } = await signIn(email, password);
                if (error) throw error;
                navigate(from, { replace: true });
            }
        } catch (err: any) {
            setError(err.message || 'حدث خطأ غير متوقع');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!email) {
            setError('الرجاء إدخال البريد الإلكتروني أولاً');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const { error } = await resetPassword(email);
            if (error) throw error;
            setSuccess('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
        } catch (err: any) {
            setError(err.message || 'حدث خطأ غير متوقع');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0D1137] via-[#1a237e] to-[#0D1137] p-4">
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                        <Shield className="text-[#0D1137]" size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">المستثمر</h1>
                    <p className="text-white/60 text-sm">نظام الهوية الموحد</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-[#0D1137] mb-1">
                            {isSignUp ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
                        </h2>
                        <p className="text-sm text-slate-500">
                            {isSignUp ? 'أدخل بياناتك لإنشاء الحساب' : 'أدخل بريدك الإلكتروني وكلمة المرور'}
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                            <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                            <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} />
                            <p className="text-sm text-green-600">{success}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name (Sign Up Only) */}
                        {isSignUp && (
                            <div>
                                <label className="block text-sm font-bold text-[#0D1137] mb-2">
                                    الاسم الكامل
                                </label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00E1C1] transition-colors"
                                    placeholder="الاسم الكامل"
                                    required={isSignUp}
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold text-[#0D1137] mb-2">
                                البريد الإلكتروني
                            </label>
                            <div className="relative">
                                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-4 pr-12 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00E1C1] transition-colors"
                                    placeholder="example@company.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-bold text-[#0D1137] mb-2">
                                كلمة المرور
                            </label>
                            <div className="relative">
                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00E1C1] transition-colors"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        {!isSignUp && (
                            <div className="flex items-center justify-between text-sm">
                                <button
                                    type="button"
                                    onClick={handleResetPassword}
                                    className="text-[#00E1C1] hover:text-[#00d1b3] font-bold transition-colors"
                                >
                                    نسيت كلمة المرور؟
                                </button>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
                                loading
                                    ? 'bg-slate-400 cursor-not-allowed'
                                    : 'bg-[#0D1137] hover:bg-[#1a237e] hover:shadow-lg'
                            }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    جاري المعالجة...
                                </span>
                            ) : isSignUp ? (
                                'إنشاء الحساب'
                            ) : (
                                'تسجيل الدخول'
                            )}
                        </button>
                    </form>

                    {/* Toggle Sign In/Up */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-600">
                            {isSignUp ? 'لديك حساب بالفعل؟' : 'ليس لديك حساب؟'}
                            <button
                                onClick={() => {
                                    setIsSignUp(!isSignUp);
                                    setError('');
                                    setSuccess('');
                                }}
                                className="text-[#00E1C1] hover:text-[#00d1b3] font-bold mr-2 transition-colors"
                            >
                                {isSignUp ? 'تسجيل الدخول' : 'إنشاء حساب'}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6 text-white/40 text-xs">
                    <p>© 2026 المستثمر. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </div>
    );
};
