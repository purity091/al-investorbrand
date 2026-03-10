import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { DatabaseProvider } from './src/context/DatabaseContext';
import { ContentProvider } from './src/context/ContentContext';
import { LoginPage } from './src/pages/LoginPage';
import { DashboardPage } from './src/pages/DashboardPage';
import { AdminContentPage } from './src/pages/AdminContentPage';
import { AdminUsersPage } from './src/pages/AdminUsersPage';
import { Layout } from './src/components/Layout';
import { AdminDashboard } from './src/pages/AdminDashboard';
import { AdminVisibilityPage } from './src/pages/AdminVisibilityPage';
import './src/index.css';

// Platform Pages Imports
import * as RadarPages from './src/platforms/radar/pages';
import * as NewsPages from './src/platforms/news/pages';
import * as LaunchPages from './src/platforms/launch/pages';
import * as AcademyPages from './src/platforms/academy/pages';
import * as SaudiPages from './src/platforms/saudi/pages';

// Plans
import { LinkedInPlan } from './src/pages/plans/LinkedInPlan';
import { FacebookPlan } from './src/pages/plans/FacebookPlan';
import { InstagramPlan } from './src/pages/plans/InstagramPlan';
import { XPlan } from './src/pages/plans/XPlan';
import { EducationHub } from './src/pages/EducationHub';
import { SocialAssetsPage } from './src/pages/SocialAssetsPage';

// Protected Route Component - MUST check loading before redirecting
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // CRITICAL: Wait for auth to finish loading before making decisions
    // Without this check, page refresh causes immediate redirect to /login
    // because the session hasn't been recovered from localStorage yet
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#0a0a0a',
                color: '#ffffff',
                fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: 40,
                        height: 40,
                        border: '3px solid rgba(255,255,255,0.1)',
                        borderTop: '3px solid #3b82f6',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                        margin: '0 auto 16px'
                    }} />
                    <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
                    <p style={{ opacity: 0.7, fontSize: 14 }}>جاري التحميل...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

// Redirect root to main content
const RootRedirect = () => {
    return <Navigate to="/news/snapshot" replace />;
}

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <DatabaseProvider>
                    <ContentProvider>
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />

                            {/* Admin Routes */}
                            <Route path="/admin" element={
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            } />
                            <Route path="/admin/visibility" element={
                                <ProtectedRoute>
                                    <AdminVisibilityPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/admin/content" element={
                                <ProtectedRoute>
                                    <AdminContentPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/admin/users" element={
                                <ProtectedRoute>
                                    <AdminUsersPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/dashboard" element={
                                <ProtectedRoute>
                                    <DashboardPage />
                                </ProtectedRoute>
                            } />

                            {/* Protected Routes */}
                            <Route path="/" element={
                                <ProtectedRoute>
                                    <Layout />
                                </ProtectedRoute>
                            }>
                                <Route index element={<RootRedirect />} />

                                {/* News Platform */}
                                <Route path="news">
                                    <Route index element={<Navigate to="snapshot" replace />} />
                                    <Route path="snapshot" element={<NewsPages.SnapshotPage />} />
                                    <Route path="core" element={<NewsPages.CorePage />} />
                                    <Route path="strategy" element={<NewsPages.StrategyPage />} />
                                    <Route path="ecosystem" element={<NewsPages.EcosystemPage />} />
                                    <Route path="visual" element={<NewsPages.VisualPage />} />
                                    <Route path="messaging" element={<NewsPages.MessagingPage />} />
                                    <Route path="social-content" element={<NewsPages.SocialContentPage />} />
                                    <Route path="social" element={<NewsPages.SocialPage />} />
                                    <Route path="social-media" element={<NewsPages.SocialMediaPage />} />
                                    <Route path="podcast" element={<NewsPages.PodcastPage />} />
                                    <Route path="planning" element={<NewsPages.PlanningPage />} />
                                    <Route path="regional" element={<NewsPages.RegionalPage />} />
                                    <Route path="digital" element={<NewsPages.DigitalPage />} />
                                    <Route path="apps" element={<NewsPages.AppsPage />} />
                                    <Route path="guidelines" element={<NewsPages.GuidelinesPage />} />
                                    <Route path="developers" element={<NewsPages.DevelopersPage />} />
                                </Route>

                                {/* Academy Platform */}
                                <Route path="academy">
                                    <Route index element={<Navigate to="snapshot" replace />} />
                                    <Route path="snapshot" element={<AcademyPages.SnapshotPage />} />
                                    <Route path="core" element={<AcademyPages.CorePage />} />
                                    <Route path="strategy" element={<AcademyPages.StrategyPage />} />
                                    <Route path="ecosystem" element={<AcademyPages.EcosystemPage />} />
                                    <Route path="visual" element={<AcademyPages.VisualPage />} />
                                    <Route path="messaging" element={<AcademyPages.MessagingPage />} />
                                    <Route path="social-content" element={<AcademyPages.SocialContentPage />} />
                                    <Route path="social" element={<AcademyPages.SocialPage />} />
                                    <Route path="social-media" element={<AcademyPages.SocialMediaPage />} />
                                    <Route path="podcast" element={<AcademyPages.PodcastPage />} />
                                    <Route path="planning" element={<AcademyPages.PlanningPage />} />
                                    <Route path="regional" element={<AcademyPages.RegionalPage />} />
                                    <Route path="digital" element={<AcademyPages.DigitalPage />} />
                                    <Route path="apps" element={<AcademyPages.AppsPage />} />
                                    <Route path="guidelines" element={<AcademyPages.GuidelinesPage />} />
                                    <Route path="developers" element={<AcademyPages.DevelopersPage />} />
                                </Route>

                                {/* Radar Platform */}
                                <Route path="radar">
                                    <Route index element={<Navigate to="snapshot" replace />} />
                                    <Route path="snapshot" element={<RadarPages.SnapshotPage />} />
                                    <Route path="core" element={<RadarPages.CorePage />} />
                                    <Route path="strategy" element={<RadarPages.StrategyPage />} />
                                    <Route path="ecosystem" element={<RadarPages.EcosystemPage />} />
                                    <Route path="visual" element={<RadarPages.VisualPage />} />
                                    <Route path="messaging" element={<RadarPages.MessagingPage />} />
                                    <Route path="social-content" element={<RadarPages.SocialContentPage />} />
                                    <Route path="social" element={<RadarPages.SocialPage />} />
                                    <Route path="social-media" element={<RadarPages.SocialMediaPage />} />
                                    <Route path="podcast" element={<RadarPages.PodcastPage />} />
                                    <Route path="planning" element={<RadarPages.PlanningPage />} />
                                    <Route path="regional" element={<RadarPages.RegionalPage />} />
                                    <Route path="digital" element={<RadarPages.DigitalPage />} />
                                    <Route path="apps" element={<RadarPages.AppsPage />} />
                                    <Route path="guidelines" element={<RadarPages.GuidelinesPage />} />
                                    <Route path="developers" element={<RadarPages.DevelopersPage />} />
                                </Route>

                                {/* Launch Platform */}
                                <Route path="launch">
                                    <Route index element={<Navigate to="snapshot" replace />} />
                                    <Route path="snapshot" element={<LaunchPages.SnapshotPage />} />
                                    <Route path="core" element={<LaunchPages.CorePage />} />
                                    <Route path="strategy" element={<LaunchPages.StrategyPage />} />
                                    <Route path="ecosystem" element={<LaunchPages.EcosystemPage />} />
                                    <Route path="visual" element={<LaunchPages.VisualPage />} />
                                    <Route path="messaging" element={<LaunchPages.MessagingPage />} />
                                    <Route path="social-content" element={<LaunchPages.SocialContentPage />} />
                                    <Route path="social" element={<LaunchPages.SocialPage />} />
                                    <Route path="social-media" element={<LaunchPages.SocialMediaPage />} />
                                    <Route path="podcast" element={<LaunchPages.PodcastPage />} />
                                    <Route path="planning" element={<LaunchPages.PlanningPage />} />
                                    <Route path="regional" element={<LaunchPages.RegionalPage />} />
                                    <Route path="digital" element={<LaunchPages.DigitalPage />} />
                                    <Route path="apps" element={<LaunchPages.AppsPage />} />
                                    <Route path="guidelines" element={<LaunchPages.GuidelinesPage />} />
                                    <Route path="developers" element={<LaunchPages.DevelopersPage />} />
                                </Route>

                                {/* Saudi Platform */}
                                <Route path="saudi">
                                    <Route index element={<Navigate to="snapshot" replace />} />
                                    <Route path="snapshot" element={<SaudiPages.SnapshotPage />} />
                                    <Route path="core" element={<SaudiPages.CorePage />} />
                                    <Route path="strategy" element={<SaudiPages.StrategyPage />} />
                                    <Route path="ecosystem" element={<SaudiPages.EcosystemPage />} />
                                    <Route path="visual" element={<SaudiPages.VisualPage />} />
                                    <Route path="messaging" element={<SaudiPages.MessagingPage />} />
                                    <Route path="social-content" element={<SaudiPages.SocialContentPage />} />
                                    <Route path="social" element={<SaudiPages.SocialPage />} />
                                    <Route path="social-media" element={<SaudiPages.SocialMediaPage />} />
                                    <Route path="podcast" element={<SaudiPages.PodcastPage />} />
                                    <Route path="planning" element={<SaudiPages.PlanningPage />} />
                                    <Route path="regional" element={<SaudiPages.RegionalPage />} />
                                    <Route path="digital" element={<SaudiPages.DigitalPage />} />
                                    <Route path="apps" element={<SaudiPages.AppsPage />} />
                                    <Route path="guidelines" element={<SaudiPages.GuidelinesPage />} />
                                    <Route path="developers" element={<SaudiPages.DevelopersPage />} />
                                </Route>

                                {/* Plans */}
                                <Route path="plans">
                                    <Route index element={<Navigate to="linkedin" replace />} />
                                    <Route path="linkedin" element={<LinkedInPlan />} />
                                    <Route path="facebook" element={<FacebookPlan />} />
                                    <Route path="instagram" element={<InstagramPlan />} />
                                    <Route path="x" element={<XPlan />} />
                                </Route>

                                {/* Education Hub */}
                                <Route path="education">
                                    <Route index element={<EducationHub />} />
                                    <Route path="basics" element={<EducationHub />} />
                                    <Route path="algorithms" element={<EducationHub />} />
                                    <Route path="content-strategy" element={<EducationHub />} />
                                    <Route path="analytics" element={<EducationHub />} />
                                    <Route path="growth" element={<EducationHub />} />
                                    <Route path="tools" element={<EducationHub />} />
                                </Route>

                                {/* Social Assets Generator */}
                                <Route path="social-assets" element={<SocialAssetsPage />} />

                            </Route>
                        </Routes>
                    </ContentProvider>
                </DatabaseProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
