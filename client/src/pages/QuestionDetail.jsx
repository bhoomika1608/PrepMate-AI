import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { API_BASE } from '../utils/api';

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [question, setQuestion] = useState(null);
  const [isSolved, setIsSolved] = useState(false);
  const [code, setCode] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const qRes = await axios.get(`${API_BASE}/api/questions/${id}`, config);
        setQuestion(qRes.data);
        
        const sRes = await axios.get(`${API_BASE}/api/questions/solved/me`, config);
        const solvedRecord = sRes.data.find(sq => sq.question._id === id);
        if (solvedRecord) {
          setIsSolved(true);
          setCode(solvedRecord.code);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestion();
  }, [id, user.token]);

  const handleMarkSolved = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post(`${API_BASE}/api/questions/${id}/solve`, { code }, config);
      setIsSolved(true);
      setMessage('Marked as solved!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error marking as solved.');
    }
  };

  const handleSaveNote = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post(`${API_BASE}/api/notes`, { 
        title: noteTitle || `${question.title} Notes`, 
        content: noteContent,
        tags: [question.topic]
      }, config);
      setMessage('Note saved successfully!');
      setNoteTitle('');
      setNoteContent('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving note.');
    }
  };

  if (!question) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate('/questions')} className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} className="mr-1" /> Back to Questions
        </button>
        {message && <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">{message}</span>}
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        <div className="w-1/2 flex flex-col min-h-0 overflow-y-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{question.title}</h1>
            {isSolved && <CheckCircle className="text-green-500" size={24} />}
          </div>
          
          <div className="flex gap-2 mb-6">
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">{question.difficulty}</span>
            <span className="bg-indigo-50 text-indigo-800 px-2 py-1 rounded text-xs font-medium">{question.topic}</span>
          </div>

          <div className="prose max-w-none text-gray-700 mb-8">
            <p>{question.description}</p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="font-semibold text-gray-900 mb-1">Example Input:</p>
              <code className="text-sm">{question.exampleIn}</code>
            </div>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="font-semibold text-gray-900 mb-1">Expected Output:</p>
              <code className="text-sm">{question.exampleOut}</code>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col gap-4 min-h-0">
          <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 p-3">
              <h3 className="font-semibold text-gray-700">Code Editor</h3>
            </div>
            <textarea
              className="flex-1 w-full p-4 font-mono text-sm resize-none focus:outline-none"
              placeholder="// Write your solution here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            ></textarea>
            <div className="bg-gray-50 border-t border-gray-200 p-3 flex justify-end">
              <button onClick={handleMarkSolved} className="bg-green-600 text-white py-1.5 px-4 rounded text-sm font-medium hover:bg-green-700 flex items-center">
                <CheckCircle size={16} className="mr-1" /> Mark Solved
              </button>
            </div>
          </div>

          <div className="h-64 flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 p-3">
              <h3 className="font-semibold text-gray-700">Add Note</h3>
            </div>
            <div className="p-3 flex flex-col flex-1 gap-2">
              <input 
                type="text" 
                placeholder="Note Title (Optional)" 
                className="p-2 border border-gray-300 rounded text-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
              />
              <textarea
                className="flex-1 p-2 border border-gray-300 rounded text-sm resize-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Write your notes, logic, or time complexity here..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
              ></textarea>
              <div className="flex justify-end">
                <button onClick={handleSaveNote} className="bg-indigo-600 text-white py-1.5 px-4 rounded text-sm font-medium hover:bg-indigo-700">
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
