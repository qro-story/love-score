
import React, { useState } from 'react';
import { Card, CardType } from '../types';
import { Heart, AlertCircle, MessageCircle, Filter } from 'lucide-react';

interface TimelineProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
}

const Timeline: React.FC<TimelineProps> = ({ cards, onCardClick }) => {
  const [filter, setFilter] = useState<'ALL' | 'PRAISE' | 'PENALTY'>('ALL');

  const filteredCards = cards.filter(c => {
    if (filter === 'ALL') return true;
    return c.type === filter;
  });

  return (
    <div className="pb-4 flex flex-col max-w-3xl mx-auto w-full">
      <div className="sticky top-16 md:top-0 bg-[#f8fafc] z-30 pt-2 pb-6">
        <div className="flex justify-between items-end px-4 md:px-0 mb-4">
           <h2 className="text-2xl font-bold text-slate-900">타임라인</h2>
           <span className="text-sm text-slate-400 font-medium">{filteredCards.length}개의 기록</span>
        </div>
        
        <div className="flex px-4 md:px-0 gap-2">
          {[
            { id: 'ALL', label: '전체보기' }, 
            { id: 'PRAISE', label: '칭찬만' }, 
            { id: 'PENALTY', label: '아쉬움만' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all shadow-sm border ${
                filter === f.id 
                  ? 'bg-slate-900 text-white border-slate-900' 
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 md:px-0 space-y-8">
        {filteredCards.length === 0 ? (
             <div className="text-center py-20">
                 <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                     <Filter size={30} />
                 </div>
                 <p className="text-slate-400 font-medium">해당하는 기록이 없습니다.</p>
             </div>
        ) : filteredCards.map((card) => (
          <div key={card.id} className="relative pl-6 md:pl-8 border-l-2 border-slate-200 pb-2 last:border-0 group">
            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm transition-transform group-hover:scale-125 ${
              card.type === CardType.PRAISE ? 'bg-pink-400' : 'bg-blue-400'
            }`}></div>
            
            <div 
              onClick={() => onCardClick(card)}
              className={`rounded-2xl p-5 md:p-6 shadow-sm transition-all hover:shadow-md cursor-pointer ${
               card.type === CardType.PRAISE 
                 ? 'bg-white border-t-4 border-t-pink-400 hover:bg-pink-50/30' 
                 : 'bg-white border-t-4 border-t-blue-400 hover:bg-blue-50/30'
            }`}>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md uppercase tracking-wide">
                  {card.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {new Date(card.createdAt).toLocaleDateString('ko-KR')} {new Date(card.createdAt).toLocaleTimeString('ko-KR', {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-2">{card.title}</h3>
              <p className="text-slate-600 text-base leading-relaxed mb-5 whitespace-pre-wrap line-clamp-3">
                {card.content}
              </p>

              <div className="flex justify-between items-center border-t pt-4 border-slate-100">
                <div className={`flex items-center gap-1.5 font-bold text-lg ${
                  card.type === CardType.PRAISE ? 'text-pink-500' : 'text-blue-500'
                }`}>
                   {card.type === CardType.PRAISE ? <Heart size={20} fill="currentColor"/> : <AlertCircle size={20}/>}
                   <span>{card.type === CardType.PRAISE ? '+' : ''}{card.points}</span>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add reply logic here if needed, currently just placeholder styling
                  }}
                  className="text-slate-400 hover:text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-medium"
                >
                  <MessageCircle size={16} />
                  답글 달기
                </button>
              </div>
              
              {card.reaction && (
                <div className="mt-4 bg-slate-50 p-3 rounded-xl text-sm text-slate-700 flex items-center gap-2">
                  <span className="text-lg">❤️</span> 
                  <span className="font-medium">{card.reaction}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
