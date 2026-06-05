import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Code2, BookOpen, Cpu, Target } from 'lucide-react';
import { API_BASE } from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ solved: 0, notes: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const [solvedRes, notesRes] = await Promise.all([
          axios.get(`${API_BASE}/api/questions/solved/me`, config),
          axios.get(`${API_BASE}/api/notes`, config)
        ]);
        setStats({ solved: solvedRes.data.length, notes: notesRes.data.length });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, [user.token]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}!</h1>
        <p className="text-gray-600 mt-1">Here's an overview of your progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Questions Solved" value={stats.solved} icon={<Code2 size={24} />} color="text-indigo-600" />
        <StatCard title="Saved Notes" value={stats.notes} icon={<BookOpen size={24} />} color="text-green-600" />
        <StatCard title="AI Interactions" value="∞" icon={<Cpu size={24} />} color="text-purple-600" />
        <StatCard title="Target Role" value={user.targetRole || 'Not Set'} icon={<Target size={24} />} color="text-rose-600" isText />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/questions" className="block w-full text-center bg-indigo-50 text-indigo-700 py-2 rounded font-medium hover:bg-indigo-100 transition-colors">
              Practice Coding Questions
            </Link>
            <Link to="/ai-interview" className="block w-full text-center bg-purple-50 text-purple-700 py-2 rounded font-medium hover:bg-purple-100 transition-colors">
              Generate Mock Interview
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="text-center text-gray-500 py-8">
            <p>Start practicing to see your recent activity here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, isText }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
    <div className={`p-3 rounded-full bg-gray-50 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className={`font-bold ${isText ? 'text-lg' : 'text-2xl'} text-gray-900`}>{value}</p>
    </div>
  </div>
);

export default Dashboard;
