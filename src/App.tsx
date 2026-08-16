import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LearningProvider } from '@/context/LearningContext';
import { ThemeProvider } from '@/context/ThemeContext';
import AppShell from '@/components/layout/AppShell';

// Main pages loaded directly for instant zero-lag rendering
import Dashboard from '@/pages/Dashboard';
import RoadmapPage from '@/pages/RoadmapPage';
import ModulePage from '@/pages/ModulePage';
import LessonPage from '@/pages/LessonPage';
import DailyChallengePage from '@/pages/DailyChallengePage';
import ProjectsPage from '@/pages/ProjectsPage';
import InterviewPage from '@/pages/InterviewPage';
import JobReadinessPage from '@/pages/JobReadinessPage';
import BookmarksPage from '@/pages/BookmarksPage';
import SettingsPage from '@/pages/SettingsPage';
import ProgressPage from '@/pages/ProgressPage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function App() {
  return (
    <ThemeProvider>
      <LearningProvider>
        <BrowserRouter>
          <AppShell>
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
              <Route path="/progress" element={<JobReadinessPage />} />
              <Route path="/daily" element={<DailyChallengePage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/my-progress" element={<ProgressPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AppShell>
        </BrowserRouter>
      </LearningProvider>
    </ThemeProvider>
  );
}

// Dynamic module wrapper for slug routing
import { useParams } from 'react-router-dom';
import type { ModuleKey } from '@/types';

function LessonPageWrapper() {
  const { moduleKey } = useParams<{ moduleKey: string }>();
  return <LessonPage moduleKey={(moduleKey || 'java') as ModuleKey} />;
}
