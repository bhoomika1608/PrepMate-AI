import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../utils/api';

const ResumeAnalyzer = () => {
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleAnalyze = async () => {
    if (!resumeText) return;
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const res = await axios.post(`${API_BASE}/api/ai/analyze-resume`, { resumeText, targetRole }, config);
      setAnalysis(res.data.analysis);
    } catch (error) {
      console.error(error);
      setAnalysis('Error analyzing resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Resume Analyzer</h1>
        <p className="text-gray-600">Paste your resume text to get an ATS score and improvement suggestions.</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="w-full xl:w-1/2 bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col min-h-[500px]">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g., Frontend Developer"
            />
          </div>
          <div className="flex-1 flex flex-col mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Resume Text</label>
            <textarea
              className="flex-1 w-full p-3 border border-gray-300 rounded resize-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            ></textarea>
          </div>
          <button 
            onClick={handleAnalyze} 
            disabled={loading || !resumeText}
            className="w-full bg-indigo-600 text-white p-2 rounded font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </div>

        <div className="w-full xl:w-1/2 bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col min-h-[500px]">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Analysis Report</h2>
          <div className="flex-1 overflow-y-auto">
            {analysis ? (
              <div className="prose max-w-none text-gray-700">
                <div dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br/>') }} />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Analysis will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
