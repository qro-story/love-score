import React from 'react';
import { User } from '../../types';

interface MobileHeaderProps {
  currentUser: User;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ currentUser }) => {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-4">
       <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-600">Love Tier</h1>
       <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200">
         <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
       </div>
    </div>
  );
};

export default MobileHeader;