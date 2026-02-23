import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Trash2, Edit, Shield, UserCheck, X, Save, AlertCircle, Check, LogOut, Ban } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface UserProfile {
    id: string;
    email: string;
    full_name: string;
    role: 'user' | 'admin' | 'superadmin';
    status: 'active' | 'inactive';
    created_at: string;
    avatar_url?: string;
}

const AdminUsersPage = () => {
    const navigate = useNavigate();
    const { user, profile } = useAuth();
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newFullName, setNewFullName] = useState('');
    const [newRole, setNewRole] = useState<'user' | 'admin' | 'superadmin'>('admin');

    // Check if current user is admin
    const isAdmin = profile?.role === 'admin' || profile?.role === 'superadmin';
    const isSuperAdmin = profile?.role === 'superadmin';

    // Load users
    useEffect(() => {
        if (isAdmin) {
            loadUsers();
        }
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!isSupabaseConfigured || !supabase) {
                setError('قاعدة البيانات غير مهيأة');
                setLoading(false);
                return;
            }

            // Fetch users from profiles table
            const { data, error: fetchError } = await supabase
                .from('profiles')
                .select('id, email, full_name, role, avatar_url, created_at')
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;

            if (data) {
                setUsers(data as UserProfile[]);
            }
        } catch (err: any) {
            setError(err.message);
            console.error('Error loading users:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async () => {
        if (!newEmail || !newPassword || !newFullName) {
            setError('يرجى ملء جميع الحقول');
            return;
        }

        setSaveStatus('saving');
        try {
            // Use the create_admin_user function
            const { data, error: createError } = await supabase.rpc('create_admin_user', {
                p_email: newEmail,
                p_password: newPassword,
                p_full_name: newFullName,
                p_role: newRole,
            });

            if (createError) throw createError;

            if (data?.success) {
                setSaveStatus('saved');
                setShowAddModal(false);
                resetForm();
                loadUsers();
                setTimeout(() => setSaveStatus('idle'), 2000);
            } else {
                throw new Error(data?.error || 'فشل إنشاء المستخدم');
            }
        } catch (err: any) {
            setSaveStatus('error');
            setError(err.message);
            console.error('Error creating user:', err);
        }
    };

    const handleUpdateRole = async (userId: string, newRole: 'user' | 'admin' | 'superadmin') => {
        setSaveStatus('saving');
        try {
            const { data, error: updateError } = await supabase.rpc('update_user_role', {
                p_user_id: userId,
                p_new_role: newRole,
            });

            if (updateError) throw updateError;

            if (data?.success) {
                setSaveStatus('saved');
                loadUsers();
                setTimeout(() => setSaveStatus('idle'), 2000);
            }
        } catch (err: any) {
            setSaveStatus('error');
            setError(err.message);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;

        try {
            const { data, error: deleteError } = await supabase.rpc('delete_user', {
                p_user_id: userId,
            });

            if (deleteError) throw deleteError;

            if (data?.success) {
                loadUsers();
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    const resetForm = () => {
        setNewEmail('');
        setNewPassword('');
        setNewFullName('');
        setNewRole('admin');
        setEditingUser(null);
    };

    const openEditModal = (user: UserProfile) => {
        setEditingUser(user);
        setNewEmail(user.email);
        setNewFullName(user.full_name);
        setNewRole(user.role);
        setShowAddModal(true);
    };

    if (!isAdmin) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="text-center">
                    <AlertCircle size={64} className="mx-auto mb-4 text-red-500" />
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">غير مصرح لك</h1>
                    <p className="text-slate-600">يجب أن تكون مسؤولاً للوصول إلى هذه الصفحة</p>
                    <button
                        onClick={() => navigate('/admin')}
                        className="mt-4 px-6 py-2 bg-[#00E1C1] text-slate-900 rounded-lg font-bold hover:bg-[#00C9A7] transition-colors"
                    >
                        العودة للوحة التحكم
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="text-center">
                    <Users size={48} className="mx-auto mb-4 text-blue-600 animate-pulse" />
                    <p className="text-slate-600 font-medium">جاري تحميل المستخدمين...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/admin')}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X size={20} className="text-slate-600" />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#00E1C1] to-[#00C9A7] rounded-xl flex items-center justify-center">
                                    <Users size={20} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-slate-900">إدارة المستخدمين</h1>
                                    <p className="text-xs text-slate-500">إنشاء وتعديل حسابات المسؤولين</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                resetForm();
                                setShowAddModal(true);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-[#00E1C1] text-slate-900 rounded-lg font-bold hover:bg-[#00C9A7] transition-colors text-sm"
                        >
                            <Plus size={16} />
                            <span>مسؤول جديد</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Error Display */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-red-800 mb-1">خطأ</h4>
                                <p className="text-xs text-red-700 font-mono">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Status Display */}
                {saveStatus === 'saved' && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <Check size={20} className="text-green-600" />
                            <span className="text-sm font-bold text-green-800">تمت العملية بنجاح</span>
                        </div>
                    </div>
                )}

                {/* Users Table */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase">المستخدم</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase">البريد الإلكتروني</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase">الدور</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase">الحالة</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase">تاريخ الإنشاء</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase">إجراءات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {user.avatar_url ? (
                                                    <img src={user.avatar_url} alt={user.full_name} className="w-10 h-10 rounded-full" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00E1C1] to-[#00C9A7] flex items-center justify-center text-white font-bold">
                                                        {user.full_name.charAt(0)}
                                                    </div>
                                                )}
                                                <span className="font-bold text-slate-900">{user.full_name || 'بدون اسم'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleUpdateRole(user.id, e.target.value as any)}
                                                disabled={!isSuperAdmin && user.role === 'superadmin'}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${
                                                    user.role === 'superadmin'
                                                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                                                        : user.role === 'admin'
                                                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                                                        : 'bg-slate-50 text-slate-700 border-slate-200'
                                                }`}
                                            >
                                                <option value="user">مستخدم</option>
                                                <option value="admin">مسؤول</option>
                                                {isSuperAdmin && <option value="superadmin">مدير أعلى</option>}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                user.status === 'active'
                                                    ? 'bg-green-50 text-green-700'
                                                    : 'bg-slate-50 text-slate-600'
                                            }`}>
                                                {user.status === 'active' ? 'نشط' : 'غير نشط'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(user.created_at).toLocaleDateString('ar-SA')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => openEditModal(user)}
                                                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                                                    title="تعديل"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                                    title="حذف"
                                                    disabled={user.id === user.id} // Can't delete yourself
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-white rounded-xl border border-slate-200 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                <Users size={24} className="text-blue-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">{users.length}</div>
                                <div className="text-xs text-slate-500">إجمالي المستخدمين</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                                <UserCheck size={24} className="text-green-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">
                                    {users.filter(u => u.role === 'admin' || u.role === 'superadmin').length}
                                </div>
                                <div className="text-xs text-slate-500">المسؤولين</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                                <Shield size={24} className="text-purple-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">
                                    {users.filter(u => u.role === 'superadmin').length}
                                </div>
                                <div className="text-xs text-slate-500">المديرين الأعلى</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Add/Edit Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900">
                                {editingUser ? 'تعديل مسؤول' : 'مسؤول جديد'}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    resetForm();
                                }}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X size={20} className="text-slate-600" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-2">
                                    البريد الإلكتروني
                                </label>
                                <input
                                    type="email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E1C1]"
                                    placeholder="admin@example.com"
                                    disabled={!!editingUser}
                                />
                            </div>

                            {!editingUser && (
                                <div>
                                    <label className="block text-sm font-bold text-slate-900 mb-2">
                                            كلمة المرور
                                        </label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E1C1]"
                                        placeholder="••••••••"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-2">
                                    الاسم الكامل
                                </label>
                                <input
                                    type="text"
                                    value={newFullName}
                                    onChange={(e) => setNewFullName(e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E1C1]"
                                    placeholder="مدير النظام"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-2">
                                    الدور
                                </label>
                                <select
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value as any)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E1C1]"
                                >
                                    <option value="admin">مسؤول</option>
                                    {isSuperAdmin && <option value="superadmin">مدير أعلى</option>}
                                    <option value="user">مستخدم</option>
                                </select>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => {
                                        setShowAddModal(false);
                                        resetForm();
                                    }}
                                    className="flex-1 px-4 py-3 border border-slate-200 rounded-lg font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    إلغاء
                                </button>
                                <button
                                    onClick={handleCreateUser}
                                    disabled={saveStatus === 'saving'}
                                    className="flex-1 px-4 py-3 bg-[#00E1C1] text-slate-900 rounded-lg font-bold hover:bg-[#00C9A7] transition-colors disabled:opacity-50"
                                >
                                    {saveStatus === 'saving' ? 'جاري الحفظ...' : editingUser ? 'حفظ التعديلات' : 'إنشاء'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export { AdminUsersPage };
