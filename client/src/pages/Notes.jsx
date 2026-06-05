import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Trash2 } from 'lucide-react';
import { API_BASE } from '../utils/api';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchNotes();
  }, [user.token]);

  const fetchNotes = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const res = await axios.get(`${API_BASE}/api/notes`, config);
      setNotes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`${API_BASE}/api/notes/${id}`, config);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Notes</h1>
        <div className="text-sm text-gray-600">Total: {notes.length} notes</div>
      </div>

      {notes.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">
          You don't have any saved notes yet. Solve some practice questions to save your learnings!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div key={note._id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col h-64">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{note.title}</h3>
                <button 
                  onClick={() => handleDelete(note._id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="text-gray-600 text-sm whitespace-pre-wrap flex-1 overflow-hidden overflow-ellipsis">{note.content}</p>
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                <div className="flex gap-1">
                  {note.tags.map((tag, i) => (
                    <span key={i} className="bg-gray-100 px-2 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
                <span>{new Date(note.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
