import React, { useState } from 'react';
import { Button, Input, Textarea } from '../ui';

interface QuestFormProps {
  onSubmit: (data: { title: string; description: string; points: number; category: string }) => void;
  categories: { id: string; label: string; icon: string }[];
}

const QuestForm: React.FC<QuestFormProps> = ({ onSubmit, categories }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState(50);
  const [category, setCategory] = useState(categories[0].label);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ title, description, points, category }); }} className="space-y-5">
      <Input
        label="퀘스트 제목"
        required
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="예: 이번 주말 영화 데이트"
      />

      <Textarea
        label="설명 (요청사항)"
        required
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="무엇을 해야 하나요?"
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
                   ? 'bg-indigo-600 text-white border-indigo-600'
                   : 'border-slate-200 text-slate-600 hover:bg-slate-50'
               }`}
             >
               {c.icon} {c.label}
             </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">보상 포인트: {points}점</label>
        <input
          type="range"
          min="10"
          max="100"
          step="10"
          value={points}
          onChange={e => setPoints(Number(e.target.value))}
          className="w-full accent-indigo-600 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
          <span>10</span>
          <span>100</span>
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg" fullWidth>
        퀘스트 요청하기
      </Button>
    </form>
  );
};

export default QuestForm;