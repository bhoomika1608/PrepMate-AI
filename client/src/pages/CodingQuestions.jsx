import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { API_BASE } from '../utils/api';
import { Search, Filter, CheckCircle } from 'lucide-react';

const CodingQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [solvedIds, setSolvedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTopic, setFilterTopic] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const [qRes, sRes] = await Promise.all([
          axios.get(`${API_BASE}/api/questions`, config),
          axios.get(`${API_BASE}/api/questions/solved/me`, config)
        ]);
        setQuestions(qRes.data);
        setSolvedIds(sRes.data.map(sq => sq.question._id));
      } catch (error) {
        console.error('Error fetching questions', error);
      }
    };
    fetchData();
  }, [user.token]);

  const filteredQuestions = questions.filter(q => {
    return (
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterTopic === '' || q.topic === filterTopic) &&
      (filterDifficulty === '' || q.difficulty === filterDifficulty)
    );
  });

  const topics = [...new Set(questions.map(q => q.topic))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Practice Problems</h1>
        <div className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-md border border-gray-200">
          Solved: {solvedIds.length} / {questions.length}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search problems..."
            className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4">
          <select 
            className="p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select 
            className="p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
          >
            <option value="">All Topics</option>
            {topics.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 w-16 text-center">Status</th>
              <th className="p-4 font-semibold text-gray-700">Title</th>
              <th className="p-4 font-semibold text-gray-700">Topic</th>
              <th className="p-4 font-semibold text-gray-700">Difficulty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredQuestions.map((q) => (
              <tr key={q._id} className="hover:bg-gray-50">
                <td className="p-4 text-center">
                  {solvedIds.includes(q._id) && <CheckCircle size={20} className="text-green-500 mx-auto" />}
                </td>
                <td className="p-4">
                  <Link to={`/questions/${q._id}`} className="font-medium text-indigo-600 hover:text-indigo-800">
                    {q.title}
                  </Link>
                </td>
                <td className="p-4 text-gray-600">{q.topic}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    q.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {q.difficulty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CodingQuestions;
