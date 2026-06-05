import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../utils/api';

const AIInterviewGenerator = () => {
  const [role, setRole] = useState('Software Engineer');
  const [topic, setTopic] = useState('React.js');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questions, setQuestions] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const res = await axios.post(`${API_BASE}/api/ai/generate-interview`, { role, topic, difficulty }, config);
      setQuestions(res.data.questions);
    } catch (error) {
      console.error(error);
      setQuestions('Error generating interview questions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Mock Interview Generator</h1>
        <p className="text-gray-600">Generate targeted interview questions based on your role and topic.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Topic / Technology</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 text-white p-2 rounded font-medium hover:bg-indigo-700 disabled:opacity-50 mt-2"
            >
              {loading ? 'Generating...' : 'Generate Questions'}
            </button>
          </form>
        </div>

        <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-sm border border-gray-200 min-h-[400px]">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Generated Questions</h2>
          {questions ? (
            <div className="prose max-w-none text-gray-700">
              <div dangerouslySetInnerHTML={{ __html: questions.replace(/\n/g, '<br/>') }} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Fill out the form to generate questions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIInterviewGenerator;
