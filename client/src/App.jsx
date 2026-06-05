import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CodingQuestions from './pages/CodingQuestions';
import QuestionDetail from './pages/QuestionDetail';
import AICodeExplainer from './pages/AICodeExplainer';
import AIInterviewGenerator from './pages/AIInterviewGenerator';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import CareerRoadmap from './pages/CareerRoadmap';
import Notes from './pages/Notes';
import Profile from './pages/Profile';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  const { user } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 pt-16">
        {user && !isAuthPage && <Sidebar />}
        
        <main className={`flex-1 ${user && !isAuthPage ? 'ml-64' : ''}`}>
          <div className="p-6 md:p-10 h-full max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
              <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
              <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
              
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/questions" element={<ProtectedRoute><CodingQuestions /></ProtectedRoute>} />
              <Route path="/questions/:id" element={<ProtectedRoute><QuestionDetail /></ProtectedRoute>} />
              <Route path="/ai-explainer" element={<ProtectedRoute><AICodeExplainer /></ProtectedRoute>} />
              <Route path="/ai-interview" element={<ProtectedRoute><AIInterviewGenerator /></ProtectedRoute>} />
              <Route path="/resume-analyzer" element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>} />
              <Route path="/career-roadmap" element={<ProtectedRoute><CareerRoadmap /></ProtectedRoute>} />
              <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              
              <Route path="*" element={<div className="text-center mt-20 text-gray-500">404 - Page Not Found</div>} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
