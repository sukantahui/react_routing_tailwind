import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
