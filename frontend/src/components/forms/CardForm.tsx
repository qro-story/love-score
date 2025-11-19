import React, { useState } from 'react';
import { CardType } from '../../types';
import { Button, Input, Textarea } from '../ui';

interface CardFormProps {
  onSubmit: (data: { type: CardType; title: string; content: string; points: number; category: string }) => void;
  categories: { id: string; label: string; icon: string }[];
}

const CardForm: React.FC<CardFormProps> = ({ onSubmit, categories }) => {
  const [type, setType] = useState<CardType>(CardType.PRAISE);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [points, setPoints] = useState(30);
  const [category, setCategory] = useState(categories[0].label);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ type, title, content, points, category }); }} className="space-y-5">
      <div className="flex gap-3 mb-4">
        <button
          type="button"
          onClick={() => setType(CardType.PRAISE)}
          className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${
            type === CardType.PRAISE
              ? 'border-pink-500 bg-pink-50 text-pink-600 shadow-sm'
              : 'border-slate-100 text-slate-400 hover:bg-slate-50'
          }`}
        >
          칭찬 카드
        </button>
        <button
          type="button"
          onClick={() => setType(CardType.PENALTY)}
          className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${
            type === CardType.PENALTY
              ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-sm'
              : 'border-slate-100 text-slate-400 hover:bg-slate-50'
          }`}
        >
          벌점 카드
        </button>
      </div>

      <Input
        label="제목"
        required
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="예: 오늘 저녁 너무 맛있었어"
      />

      <Textarea
        label="내용"
        required
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="구체적으로 적어주세요..."
        rows={4}
      />

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">카테고리</label>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
             <button
               key={c.id}
               type="button"
               onClick={() => setCategory(c.label)}
               className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                 category === c.label
                   ? 'bg-slate-800 text-white border-slate-800'
                   : 'border-slate-200 text-slate-600 hover:bg-slate-50'
               }`}
             >
               {c.icon} {c.label}
             </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">점수: {points}점</label>
        <input
          type="range"
          min="10"
          max="50"
          step="5"
          value={points}
          onChange={e => setPoints(Number(e.target.value))}
          className="w-full accent-slate-900 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
          <span>10</span>
          <span>50</span>
        </div>
      </div>

      <Button type="submit" variant="ghost" size="lg" fullWidth>
        카드 보내기
      </Button>
    </form>
  );
};

export default CardForm;