
import React, { useMemo } from 'react';
import { LearningOutcome, TeacherSelection, Language, ActivityProposal } from '../types';
import { generateActivityProposals, UI_TRANSLATIONS } from '../data';

interface ActivityListProps {
  outcomes: LearningOutcome[];
  selection: TeacherSelection;
  language: Language;
}

const ActivityList: React.FC<ActivityListProps> = ({ outcomes, selection, language }) => {
  const t = UI_TRANSLATIONS[language];
  
  const activities = useMemo(() => {
    return generateActivityProposals(outcomes, selection);
  }, [outcomes, selection]);

  if (activities.length === 0) return null;

  const getAreaColor = (areaId: number) => {
    const colors: Record<number, string> = {
      1: '#6080a3',
      2: '#578da6',
      3: '#4f9ba8',
      4: '#46a9ab',
      5: '#3eb7ae',
    };
    return colors[areaId] || '#6080a3';
  };

  return (
    <div className="bg-white border-t-4 border-slate-800 p-8 shadow-sm mt-12">
      <div className="mb-8">
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter mb-2">
          {t.teacherMode.activitiesTitle}
        </h3>
        <p className="text-sm text-slate-500 max-w-2xl">
          {t.teacherMode.activitiesDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="flex flex-col bg-slate-50 border border-slate-200 p-6 relative overflow-hidden group hover:border-slate-300 transition-colors"
          >
            <div 
              className="absolute top-0 left-0 w-1 h-full" 
              style={{ backgroundColor: getAreaColor(activity.areaId) }}
            />
            
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
              {t.allAreas.replace('All ', '').replace('Todas las ', '')} {activity.areaId}
            </span>
            
            <h4 className="text-lg font-bold text-slate-800 mb-3 leading-tight">
              {activity.title[language]}
            </h4>
            
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              {activity.description[language]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
