import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AirportProvider } from './context/AirportContext';
import { AppShell } from './components/common/AppShell';

import DashboardPage from './pages/DashboardPage';
import HotspotPage from './pages/HotspotPage';
import OperationsPage from './pages/OperationsPage';
import ComparisonPage from './pages/ComparisonPage';
import MethodologyPage from './pages/MethodologyPage';
import NotFoundPage from './pages/NotFoundPage';

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AirportProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppShell />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="hotspot" element={<HotspotPage />} />
                <Route path="operations" element={<OperationsPage />} />
                <Route path="compare" element={<ComparisonPage />} />
                <Route path="methodology" element={<MethodologyPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AirportProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;

