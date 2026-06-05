import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Code2, 
  Cpu, 
  Briefcase, 
  ScanLine, 
  Milestone, 
  Library, 
  UserCircle, 
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Practice Lab', path: '/questions', icon: <Code2 size={20} /> },
    { name: 'AI Explainer', path: '/ai-explainer', icon: <Cpu size={20} /> },
    { name: 'Mock Interviews', path: '/ai-interview', icon: <Briefcase size={20} /> },
    { name: 'Resume Scan', path: '/resume-analyzer', icon: <ScanLine size={20} /> },
    { name: 'Career Path', path: '/career-roadmap', icon: <Milestone size={20} /> },
    { name: 'Notes', path: '/notes', icon: <Library size={20} /> },
    { name: 'Profile', path: '/profile', icon: <UserCircle size={20} /> },
  ];

  return (
    <div className="flex flex-col h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0 pt-20 z-40">
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className={`mr-3 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
