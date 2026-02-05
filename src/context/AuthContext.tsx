import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// كلمة السر الثابتة - يمكنك تغييرها من هنا
const HARDCODED_PASSWORD = "admin123@@";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // التحقق من وجود جلسة سابقة عند التحميل
        const storedAuth = localStorage.getItem('brand_auth_session');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = (password: string) => {
        if (password === HARDCODED_PASSWORD) {
            localStorage.setItem('brand_auth_session', 'true');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('brand_auth_session');
        setIsAuthenticated(false);
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400">Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
