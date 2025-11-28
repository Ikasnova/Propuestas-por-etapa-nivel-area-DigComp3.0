import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { LearningOutcome, ProficiencyLevel, Language } from '../types';
import { UI_TRANSLATIONS } from '../data';

interface StatsProps {
  data: LearningOutcome[];
  language: Language;
}

const StatsOverview: React.FC<StatsProps> = ({ data, language }) => {
  const t = UI_TRANSLATIONS[language];

  // Aggregate data for the chart
  const stats = Object.values(ProficiencyLevel).map(levelKey => {
    return {
      id: levelKey,
      name: t.levels[levelKey as ProficiencyLevel],
      count: data.filter(d => d.level === levelKey).length
    };
  });

  const COLORS = {
    [ProficiencyLevel.BASIC]: '#3eb7ae',
    [ProficiencyLevel.INTERMEDIATE]: '#3b82f6',
    [ProficiencyLevel.ADVANCED]: '#a855f7',
    [ProficiencyLevel.HIGHLY_ADVANCED]: '#6080a3',
  };

  if (data.length === 0) return null;

  return (
    <div className="bg-white p-6 border-l-4 border-slate-800 shadow-sm mb-10">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">
        {t.resultsDistribution}
      </h3>
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats}>
            <XAxis 
              dataKey="name" 
              tick={{fontSize: 11, fontWeight: 600, fill: '#64748b'}} 
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
              interval={0}
              dy={10}
            />
            <YAxis hide />
            <Tooltip 
              cursor={{fill: '#f1f5f9'}}
              contentStyle={{
                backgroundColor: '#1e293b',
                color: '#fff',
                fontSize: '12px',
                border: 'none',
                borderRadius: '0px',
                padding: '8px 12px'
              }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar dataKey="count" radius={[2, 2, 0, 0]}>
              {stats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.id as ProficiencyLevel] || '#94a3b8'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsOverview;