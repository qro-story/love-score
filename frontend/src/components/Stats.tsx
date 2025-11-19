import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { User } from '../types';

interface StatsProps {
  user: User;
}

const Stats: React.FC<StatsProps> = ({ user }) => {
  // Mock Data for Charts
  const scoreHistory = [
    { date: '1일', score: 1180 },
    { date: '5일', score: 1190 },
    { date: '10일', score: 1210 },
    { date: '15일', score: 1205 },
    { date: '20일', score: 1230 },
    { date: '25일', score: 1230 },
  ];

  const categoryData = [
    { name: '데이트', value: 400 },
    { name: '집안일', value: 300 },
    { name: '선물', value: 300 },
    { name: '대화', value: 200 },
  ];

  const COLORS = ['#F472B6', '#60A5FA', '#A78BFA', '#34D399'];

  return (
    <div className="pb-4 pt-4 w-full">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 px-4 md:px-0">나의 기록</h2>

      <div className="px-4 md:px-0 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Trend */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold text-slate-800">점수 변화 추이</h3>
             <select className="text-xs border border-slate-200 rounded-lg p-1.5 text-slate-500 outline-none">
                 <option>최근 30일</option>
                 <option>최근 3개월</option>
             </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                <YAxis domain={['dataMin - 100', 'dataMax + 100']} hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '5 5' }}
                />
                <Line type="monotone" dataKey="score" stroke="#ec4899" strokeWidth={4} dot={{r: 0}} activeDot={{r: 8, fill: '#ec4899', stroke: '#fff', strokeWidth: 3}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">카테고리별 획득 포인트</h3>
          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  fill="#8884d8"
                  paddingAngle={4}
                  dataKey="value"
                  cornerRadius={8}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{paddingTop: '20px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insight Card - Full Width */}
        <div className="col-span-1 lg:col-span-2 bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-3xl text-white text-center shadow-lg">
          <h4 className="text-2xl font-bold mb-2">이번 달 리포트가 도착했어요! 💌</h4>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">지난 달보다 관계 만족도가 15% 상승했어요! 특히 '대화' 관련 퀘스트 수행률이 높아지면서 서로의 이해도가 깊어지고 있습니다.</p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold shadow-md hover:bg-indigo-50 transition-colors">
            상세 리포트 확인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stats;