import React from 'react';
import { LayoutDashboard, History, CheckSquare, BarChart2, User as UserIcon } from 'lucide-react';
import { User, TabView } from '../../types';

interface SidebarProps {
  currentUser: User;
  activeTab: TabView;
  onNavigate: (tab: TabView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser, activeTab, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: '홈', icon: <LayoutDashboard size={22}/> },
    { id: 'timeline', label: '타임라인', icon: <History size={22}/> },
    { id: 'quests', label: '퀘스트', icon: <CheckSquare size={22}/> },
    { id: 'stats', label: '통계', icon: <BarChart2 size={22}/> },
    { id: 'profile', label: '내정보', icon: <UserIcon size={22}/> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0 z-50 shadow-sm">
      <div className="p-6 border-b border-slate-100">
         <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-600">Love Tier</h1>
         <p className="text-xs text-slate-500 mt-1">Relationship Manager</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as TabView)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-slate-900 text-white shadow-md' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
         <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <img src={currentUser.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover bg-slate-200" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-slate-800 truncate">{currentUser.name}</p>
              <p className="text-xs text-slate-500">{currentUser.tier} Tier</p>
            </div>
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;