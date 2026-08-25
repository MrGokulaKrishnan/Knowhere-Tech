import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { LearningProvider } from '@/context/LearningContext';
import { ThemeProvider } from '@/context/ThemeContext';
import AppShell from '@/components/layout/AppShell';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import type { ModuleKey } from '@/types';

// Lazy-load all pages — splits the bundle so the app shell renders instantly
// Each page only loads when first navigated to (eliminates black screen)
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const RoadmapPage = lazy(() => import('@/pages/RoadmapPage'));
const ModulePage = lazy(() => import('@/pages/ModulePage'));
const LessonPage = lazy(() => import('@/pages/LessonPage'));
const DailyChallengePage = lazy(() => import('@/pages/DailyChallengePage'));
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'));
const InterviewPage = lazy(() => import('@/pages/InterviewPage'));
const JobReadinessPage = lazy(() => import('@/pages/JobReadinessPage'));
const BookmarksPage = lazy(() => import('@/pages/BookmarksPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const ProgressPage = lazy(() => import('@/pages/ProgressPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// Smooth loading spinner shown while a lazy page chunk loads
function PageLoader() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-emerald-500/30 border-t-emerald-400 animate-spin" />
        <span className="text-zinc-500 text-sm font-mono tracking-wide">Loading…</span>
      </div>
    </div>
  );
}

function LessonPageWrapper() {
  const { moduleKey, slug } = useParams<{ moduleKey: string, slug: string }>();
  return <LessonPage key={`${moduleKey}-${slug}`} moduleKey={(moduleKey || 'java') as ModuleKey} />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LearningProvider>
          <BrowserRouter>
            <AppShell>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/roadmap" element={<RoadmapPage />} />

                  {/* Module index pages */}
                  <Route path="/java" element={<ModulePage moduleKey="java" />} />
                  <Route path="/oop" element={<ModulePage moduleKey="oop" />} />
                  <Route path="/advanced-java" element={<ModulePage moduleKey="advanced-java" />} />
                  <Route path="/dsa" element={<ModulePage moduleKey="dsa" />} />
                  <Route path="/sql" element={<ModulePage moduleKey="sql" />} />
                  <Route path="/html" element={<ModulePage moduleKey="html" />} />
                  <Route path="/css" element={<ModulePage moduleKey="css" />} />
                  <Route path="/javascript" element={<ModulePage moduleKey="javascript" />} />
                  <Route path="/react" element={<ModulePage moduleKey="react" />} />
                  <Route path="/spring" element={<ModulePage moduleKey="spring" />} />
                  <Route path="/spring-boot" element={<ModulePage moduleKey="spring-boot" />} />
                  <Route path="/rest-api" element={<ModulePage moduleKey="rest-api" />} />
                  <Route path="/security" element={<ModulePage moduleKey="security" />} />
                  <Route path="/linux" element={<ModulePage moduleKey="linux" />} />
                  <Route path="/networking" element={<ModulePage moduleKey="networking" />} />
                  <Route path="/git" element={<ModulePage moduleKey="git" />} />
                  <Route path="/docker" element={<ModulePage moduleKey="docker" />} />
                  <Route path="/devops" element={<ModulePage moduleKey="devops" />} />
                  <Route path="/aws" element={<ModulePage moduleKey="aws" />} />
                  <Route path="/testing" element={<ModulePage moduleKey="testing" />} />
                  <Route path="/system-design" element={<ModulePage moduleKey="system-design" />} />

                  {/* Dynamic Lesson Route */}
                  <Route path="/:moduleKey/:slug" element={<LessonPageWrapper />} />

                  {/* Special pages */}
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/interview" element={<InterviewPage />} />
                  <Route path="/job-readiness" element={<JobReadinessPage />} />
                  <Route path="/progress" element={<ProgressPage />} />
                  <Route path="/daily" element={<DailyChallengePage />} />
                  <Route path="/bookmarks" element={<BookmarksPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/my-progress" element={<ProgressPage />} />

                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </AppShell>
          </BrowserRouter>
        </LearningProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
