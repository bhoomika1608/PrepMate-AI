import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../utils/api';

const AICodeExplainer = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleExplain = async () => {
    if (!code) return;
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const res = await axios.post(`${API_BASE}/api/ai/explain-code`, { code, language }, config);
      setExplanation(res.data.explanation);
    } catch (error) {
      console.error(error);
      setExplanation('Error fetching AI explanation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Code Explainer</h1>
        <p className="text-gray-600">Paste your code below to get a detailed explanation including time and space complexity.</p>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        <div className="w-1/2 flex flex-col min-h-0 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-700">Your Code</h3>
            <select 
              className="p-1 border border-gray-300 rounded text-sm"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </div>
          <textarea
            className="flex-1 w-full p-4 font-mono text-sm resize-none focus:outline-none"
            placeholder="// Paste code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
          <div className="p-3 border-t border-gray-200 bg-gray-50 flex justify-end">
            <button 
              onClick={handleExplain} 
              disabled={loading || !code}
              className="bg-indigo-600 text-white py-1.5 px-4 rounded text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Explain Code'}
            </button>
          </div>
        </div>

        <div className="w-1/2 flex flex-col min-h-0 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-gray-700">AI Explanation</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {explanation ? (
              <div className="prose max-w-none text-gray-700">
                <div dangerouslySetInnerHTML={{ __html: explanation.replace(/\n/g, '<br/>') }} />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                AI explanation will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICodeExplainer;
