import React from 'react';
import { LayoutDashboard, History, CheckSquare, BarChart2, User as UserIcon } from 'lucide-react';
import { TabView } from '../../types';

interface MobileNavigationProps {
  activeTab: TabView;
  onNavigate: (tab: TabView) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ activeTab, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: '홈', icon: <LayoutDashboard size={22}/> },
    { id: 'timeline', label: '타임라인', icon: <History size={22}/> },
    { id: 'quests', label: '퀘스트', icon: <CheckSquare size={22}/> },
    { id: 'stats', label: '통계', icon: <BarChart2 size={22}/> },
    { id: 'profile', label: '내정보', icon: <UserIcon size={22}/> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 pb-safe flex justify-between items-center z-50 h-16">
      {navItems.map(item => (
         <button 
            key={item.id}
            onClick={() => onNavigate(item.id as TabView)} 
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === item.id ? 'text-slate-900' : 'text-slate-400'}`}
          >
            {React.cloneElement(item.icon as any, { size: 24 })}
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
      ))}
    </nav>
  );
};

export default MobileNavigation;