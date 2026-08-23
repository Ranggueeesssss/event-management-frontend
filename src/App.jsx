import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Code-splitting via React Lazy loading (Performance requirement)
const EventList = lazy(() => import('./pages/EventList'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const Login = lazy(() => import('./pages/Login'));
const OrganizerDashboard = lazy(() => import('./pages/OrganizerDashboard'));
const ManageEvents = lazy(() => import('./pages/ManageEvents'));
const AdminEventsView = lazy(() => import('./pages/AdminEventsView'));
const Forbidden = lazy(() => import('./pages/Forbidden'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Layout>
      <Suspense fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
          <div className="skeleton" style={{ width: '60px', height: '60px', borderRadius: '50%' }}></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes (Role guards will be added in Phase 3) */}
          <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
          <Route path="/organizer/events" element={<ManageEvents />} />
          <Route path="/admin/events" element={<AdminEventsView />} />
          
          <Route path="/403" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
