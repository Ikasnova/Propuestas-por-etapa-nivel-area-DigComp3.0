
import React from 'react';
import { Language, TeacherSelection, ProficiencyLevel } from '../types';
import { UI_TRANSLATIONS, NAVARRA_SUBJECTS_DATA, STAGE_GRADES, PROFICIENCY_LEVELS } from '../data';

interface TeacherFilterProps {
  selection: TeacherSelection;
  onChange: (newSelection: TeacherSelection) => void;
  language: Language;
  onDownload: () => void;
  resultCount: number;
}

const TeacherFilter: React.FC<TeacherFilterProps> = ({
  selection,
  onChange,
  language,
  onDownload,
  resultCount
}) => {
  const t = UI_TRANSLATIONS[language];

  const handleStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStage = e.target.value as TeacherSelection['stage'];
    onChange({
      stage: newStage,
      grade: '', // Reset grade on stage change
      subjectId: '', // Reset subject on stage change
      proficiencyLevel: '' // Reset level on stage change
    });
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...selection, grade: e.target.value });
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...selection, subjectId: e.target.value });
  };
  
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...selection, proficiencyLevel: e.target.value });
  };

  // Get available options based on selection
  const grades = selection.stage ? STAGE_GRADES[selection.stage] : [];
  const subjects = selection.stage ? NAVARRA_SUBJECTS_DATA[selection.stage] : [];

  const isComplete = selection.stage && selection.grade && selection.subjectId;

  return (
    <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg mb-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-6 items-end">
        
        {/* Stage Selector */}
        <div className="flex-1 w-full">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            {t.teacherMode.selectStage}
          </label>
          <select
            className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-700 font-medium focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
            value={selection.stage}
            onChange={handleStageChange}
          >
            <option value="">-- Select --</option>
            <option value="primaria">{t.stages.primaria}</option>
            <option value="eso">{t.stages.eso}</option>
            <option value="bachillerato">{t.stages.bachillerato}</option>
          </select>
        </div>

        {/* Grade Selector */}
        <div className="flex-1 w-full">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            {t.teacherMode.selectGrade}
          </label>
          <select
            className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-700 font-medium focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
            value={selection.grade}
            onChange={handleGradeChange}
            disabled={!selection.stage}
          >
            <option value="">-- Select --</option>
            {grades.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Subject Selector */}
        <div className="flex-1 w-full">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            {t.teacherMode.selectSubject}
          </label>
          <select
            className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-700 font-medium focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
            value={selection.subjectId}
            onChange={handleSubjectChange}
            disabled={!selection.stage}
          >
            <option value="">-- Select --</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name[language]}</option>
            ))}
          </select>
        </div>

        {/* Proficiency Level Selector (Optional Filter) */}
        <div className="flex-1 w-full">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            {t.teacherMode.selectLevel}
          </label>
          <select
            className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-700 font-medium focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
            value={selection.proficiencyLevel}
            onChange={handleLevelChange}
            disabled={!selection.stage}
          >
            <option value="">-- All Levels --</option>
            {PROFICIENCY_LEVELS.map(level => (
               <option key={level} value={level}>{t.levels[level as ProficiencyLevel]}</option>
            ))}
          </select>
        </div>

        {/* Download Button */}
        {isComplete && (
           <button
             onClick={onDownload}
             className="w-full md:w-auto px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold uppercase tracking-widest rounded shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap"
           >
             <span>{t.teacherMode.downloadPdf}</span>
             <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">
               {resultCount}
             </span>
           </button>
        )}
      </div>
      
      {!isComplete && (
        <p className="mt-4 text-xs text-slate-500 italic">
          {t.teacherMode.description}
        </p>
      )}
    </div>
  );
};

export default TeacherFilter;
