
import React, { useState } from 'react';
import { LearningOutcome, KSA, Language } from '../types';
import { UI_TRANSLATIONS } from '../data';
import ExampleModal from './ExampleModal';

interface OutcomeCardProps {
  outcome: LearningOutcome;
  language: Language;
}

const OutcomeCard: React.FC<OutcomeCardProps> = ({ outcome, language }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = UI_TRANSLATIONS[language];
  
  // Generate accent color based on the Competence Area number
  const getBaseColor = (id: string) => {
    const areaNum = parseInt(id.charAt(2)) || 1;
    const colors: Record<number, string> = {
      1: '#6080a3',
      2: '#578da6',
      3: '#4f9ba8',
      4: '#46a9ab',
      5: '#3eb7ae',
    };
    return colors[areaNum] || colors[1];
  };

  const accentColor = getBaseColor(outcome.id);
  const isAiExplicit = outcome.aiLabel.toLowerCase().includes('explicit');

  return (
    <>
      <div 
        className="group relative bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm border border-slate-100 flex flex-col h-full"
      >
        {/* Top Accent Line */}
        <div 
          className="h-1.5 w-full"
          style={{ backgroundColor: accentColor }}
        />

        {/* Decorative Watermark ID */}
        <div 
          className="absolute -right-4 -top-6 text-[120px] font-black leading-none opacity-[0.03] select-none pointer-events-none font-sans tracking-tighter"
          style={{ color: '#000' }}
        >
          {outcome.id.replace('LO', '')}
        </div>

        {/* AI Explicit Indicator - Modern Geometric Corner */}
        {isAiExplicit && (
          <div className="absolute top-0 right-0 z-10 pointer-events-none">
             <div 
               className="w-14 h-14 bg-[#7e4d99] flex justify-end items-start pt-2 pr-2"
               style={{ 
                 clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
               }}
             >
                <span className="text-white font-black text-lg tracking-tighter leading-none">IA</span>
             </div>
          </div>
        )}

        <div className="p-6 flex flex-col h-full relative z-0">
          
          {/* Header Metadata */}
          <div className="flex flex-col gap-1 mb-4 pr-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {outcome.id}
            </span>
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-800 border-l-2 pl-3" style={{ borderColor: accentColor }}>
              {outcome.competenceSubArea[language]}
            </h4>
          </div>

          {/* Description */}
          <p className="text-[15px] leading-relaxed font-normal text-[#454242] mb-6 flex-grow">
            {outcome.description[language]}
          </p>

          {/* Footer Metadata (Chips) */}
          <div className="mt-auto space-y-4">
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
              {/* Level Chip */}
              <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                {t.levels[outcome.level]}
              </span>
              
              {/* KSA Chip */}
              <span className={`inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                outcome.ksa === KSA.KNOWLEDGE ? 'bg-sky-50 text-sky-700' :
                outcome.ksa === KSA.SKILL ? 'bg-emerald-50 text-emerald-700' :
                'bg-rose-50 text-rose-700'
              }`}>
                {t.ksa[outcome.ksa]}
              </span>
            </div>

            {/* Action Button */}
            {outcome.examples && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-widest border border-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <span>{t.viewExamples}</span>
                <span className="text-lg leading-none" style={{ color: accentColor }}>›</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {outcome.examples && (
        <ExampleModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          examples={outcome.examples}
          language={language}
          title={outcome.description[language]}
        />
      )}
    </>
  );
};

export default OutcomeCard;
