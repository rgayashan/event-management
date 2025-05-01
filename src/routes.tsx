import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy-loaded components for code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const EventForm = lazy(() => import('./pages/EventForm'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/events/new" element={<EventForm />} />
        <Route path="/events/edit/:id" element={<EventForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;