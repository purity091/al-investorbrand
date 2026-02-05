import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { LoginPage } from './src/pages/LoginPage';
import { Layout } from './src/components/Layout';
import './src/index.css';

// Platform Pages Imports
import * as RadarPages from './src/platforms/radar/pages';
import * as NewsPages from './src/platforms/news/pages';
import * as LaunchPages from './src/platforms/launch/pages';
import * as AcademyPages from './src/platforms/academy/pages';
import * as SaudiPages from './src/platforms/saudi/pages';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

// Redirect root to default platform
const RootRedirect = () => {
    return <Navigate to="/news" replace />;
}

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />

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
                            <Route path="regional" element={<SaudiPages.RegionalPage />} />
                            <Route path="digital" element={<SaudiPages.DigitalPage />} />
                            <Route path="apps" element={<SaudiPages.AppsPage />} />
                            <Route path="guidelines" element={<SaudiPages.GuidelinesPage />} />
                            <Route path="developers" element={<SaudiPages.DevelopersPage />} />
                        </Route>

                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
