import React, { useMemo } from 'react';
import { getCompetenceAreas, PROFICIENCY_LEVELS, UI_TRANSLATIONS } from '../data';
import { Language, ProficiencyLevel } from '../types';

interface FilterBarProps {
  selectedArea: string;
  selectedLevel: string;
  searchQuery: string;
  onAreaChange: (area: string) => void;
  onLevelChange: (level: string) => void;
  onSearchChange: (query: string) => void;
  onReset: () => void;
  language: Language;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedArea,
  selectedLevel,
  searchQuery,
  onAreaChange,
  onLevelChange,
  onSearchChange,
  onReset,
  language
}) => {
  const t = UI_TRANSLATIONS[language];
  const competenceAreas = useMemo(() => getCompetenceAreas(language), [language]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-end lg:items-center justify-between">
      
      {/* Search Input - Minimal underline style */}
      <div className="w-full lg:w-1/3 group">
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
          Search
        </label>
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          className="w-full bg-slate-50 border-b-2 border-slate-200 px-3 py-2 text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition-all rounded-t"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
        
        <div className="flex-1 min-w-[240px]">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Area
          </label>
          <select
            className="w-full bg-slate-50 border-b-2 border-slate-200 px-3 py-2 text-slate-700 font-medium focus:outline-none focus:border-slate-800 focus:bg-white cursor-pointer rounded-t appearance-none"
            value={selectedArea}
            onChange={(e) => onAreaChange(e.target.value)}
          >
            <option value="">{t.allAreas}</option>
            {competenceAreas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Level
          </label>
          <select
            className="w-full bg-slate-50 border-b-2 border-slate-200 px-3 py-2 text-slate-700 font-medium focus:outline-none focus:border-slate-800 focus:bg-white cursor-pointer rounded-t appearance-none"
            value={selectedLevel}
            onChange={(e) => onLevelChange(e.target.value)}
          >
            <option value="">{t.allLevels}</option>
            {PROFICIENCY_LEVELS.map(level => (
              <option key={level} value={level}>{t.levels[level as ProficiencyLevel]}</option>
            ))}
          </select>
        </div>

        {(selectedArea || selectedLevel || searchQuery) && (
          <div className="flex items-end pb-1">
             <button
              onClick={onReset}
              className="text-xs font-bold text-red-500 hover:text-red-700 border-b border-transparent hover:border-red-700 transition-all uppercase tracking-wider h-8"
            >
              {t.reset}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;