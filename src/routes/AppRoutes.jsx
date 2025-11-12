import { Routes, Route } from 'react-router-dom';
import Home from './HomeComponent/Home';
import Certificate from './certificates/Certificate';
import Admin from './Admin';
import Bijoya from './Bijoya';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './NotFound';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/certificates/:certificateId"
        element={
          <ProtectedRoute>
            <Certificate />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bijoya"
        element={
          <ProtectedRoute>
            <Bijoya />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
