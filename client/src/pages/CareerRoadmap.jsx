import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../utils/api';

const CareerRoadmap = () => {
  const [currentSkills, setCurrentSkills] = useState('HTML, CSS, basic JavaScript');
  const [targetRole, setTargetRole] = useState('Full Stack Developer');
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const res = await axios.post(`${API_BASE}/api/ai/career-roadmap`, { currentSkills, targetRole }, config);
      setRoadmap(res.data.roadmap);
    } catch (error) {
      console.error(error);
      setRoadmap('Error generating roadmap.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Career Roadmap Generator</h1>
        <p className="text-gray-600">Get a step-by-step learning path based on your current skills and target role.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Skills</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
              value={currentSkills}
              onChange={(e) => setCurrentSkills(e.target.value)}
              required
            />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full md:w-auto bg-indigo-600 text-white py-2 px-6 rounded font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Roadmap'}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 min-h-[400px]">
        {roadmap ? (
          <div className="prose max-w-none text-gray-700">
            <div dangerouslySetInnerHTML={{ __html: roadmap.replace(/\n/g, '<br/>') }} />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 py-20">
            Fill out the form above to generate your career roadmap.
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerRoadmap;
