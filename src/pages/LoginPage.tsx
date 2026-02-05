import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(password)) {
            navigate('/news'); // توجيه للمنصة الرئيسية بعد الدخول
        } else {
            setError('كلمة المرور غير صحيحة');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0D1137] relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E1C1] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#00E1C1] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(0,225,193,0.3)]">
                        <Lock className="text-[#0D1137]" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">بوابة الوصول</h1>
                    <p className="text-blue-200 text-sm">أدخل كلمة المرور للوصول إلى استراتيجية العلامة التجارية.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            className="w-full bg-[#0D1137]/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-blue-200/30 focus:outline-none focus:border-[#00E1C1] transition-colors text-center text-lg tracking-widest"
                            placeholder="••••••••"
                            autoFocus
                        />
                        {error && <p className="text-red-400 text-xs mt-3 text-center flex items-center justify-center gap-1 animate-pulse"><ShieldCheck size={12} /> {error}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#00E1C1] text-[#0D1137] font-bold py-4 rounded-xl hover:bg-[#00c4a7] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        تسجيل الدخول <ArrowRight size={20} />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-white/20 font-mono">SECURED ACCESS • BRAND GUIDELINES</p>
                </div>
            </div>
        </div>
    );
};
