import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { UserCircle } from 'lucide-react';
import { API_BASE } from '../utils/api';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    targetRole: '',
    currentSkills: [],
  });
  const [skillInput, setSkillInput] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const res = await axios.get(`${API_BASE}/api/profile`, config);
        setProfile(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [user.token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`${API_BASE}/api/profile`, profile, config);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile.');
    }
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (skillInput && !profile.currentSkills.includes(skillInput)) {
      setProfile({ ...profile, currentSkills: [...profile.currentSkills, skillInput] });
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile({
      ...profile,
      currentSkills: profile.currentSkills.filter(skill => skill !== skillToRemove)
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
        <p className="text-gray-600">Manage your account settings and career goals.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-6 mb-8 border-b border-gray-200 pb-8">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            <UserCircle size={64} strokeWidth={1} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
            <p className="text-gray-500">{profile.email}</p>
          </div>
        </div>

        {message && <div className="bg-green-50 text-green-700 p-3 rounded mb-6 text-sm">{message}</div>}

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-500 cursor-not-allowed"
                value={profile.email}
                disabled
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
              value={profile.targetRole}
              onChange={(e) => setProfile({...profile, targetRole: e.target.value})}
              placeholder="e.g., Full Stack Engineer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Skills</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {profile.currentSkills.map((skill, index) => (
                <span key={index} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-1 border border-indigo-100">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="text-indigo-400 hover:text-indigo-600 font-bold ml-1">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                className="flex-1 p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add a skill..."
              />
              <button type="button" onClick={addSkill} className="bg-gray-100 text-gray-700 px-4 py-2 rounded font-medium hover:bg-gray-200 border border-gray-300">
                Add
              </button>
            </div>
          </div>

          <div className="pt-4 flex justify-end border-t border-gray-200">
            <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded font-medium hover:bg-indigo-700">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
