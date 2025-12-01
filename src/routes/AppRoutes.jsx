import { Routes, Route } from 'react-router-dom';
import Home from './HomeComponent/Home';
import Certificate from './certificates/Certificate';
import Admin from './Admin';
import Bijoya from './Bijoya';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './NotFound';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import AddStudent from '../components/AddStudent';
import ClassEleven from '../components/study/class_11/ClassEleven';
import ClassElevenWbb from '../components/study/class_11/wbb/ClassElevenWbb';
import ComputerApplicationWbbEleven from '../components/study/class_11/wbb/computer_application/ComputerApplicationWbbEleven';
import SemTwoComputerApplicationWbbEleven from '../components/study/class_11/wbb/computer_application/semester2/SemTwoComputerApplicationWbbEleven';
import DataStructureSemTwoComputerApplicationWbbEleven from '../components/study/class_11/wbb/computer_application/semester2/chapters/DataStructureSemTwoComputerApplicationWbbEleven';
import TypingTest from '../components/TypingTest';
import Bca from '../components/study/bca/Bca';
import JavaChapters from '../components/GeneralSubjects/java/JavaChapters';
import IntroductionToJava from '../components/GeneralSubjects/java/IntroductionToJava';


// ⬇️ Import Study component
import Study from '../components/study/Study';

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

      <Route path="/students/add" element={<AddStudent />} />

      {/* ✅ Public Route (No Login Required) */}
      <Route path="/study" element={<Study />} />
      <Route path="/study/class11" element={<ClassEleven />} />
      <Route path="/study/class11/wbb" element={<ClassElevenWbb />} />
      <Route path="/study/class11/wbb/computer-application" element={<ComputerApplicationWbbEleven />} />
      <Route path="/study/class11/wbb/computer-application/sem2" element={<SemTwoComputerApplicationWbbEleven />} />
      <Route path="/study/class11/wbb/computer-application/sem2/dsa" element={<DataStructureSemTwoComputerApplicationWbbEleven />} />

      <Route path="/study/bca" element={<Bca />} />
      <Route path="/study/bca/java" element={<JavaChapters />} />
      <Route path="/study/bca/java/chapter-1" element={<IntroductionToJava />} />
      <Route path="/services/type-test" element={<TypingTest />} />
    

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
