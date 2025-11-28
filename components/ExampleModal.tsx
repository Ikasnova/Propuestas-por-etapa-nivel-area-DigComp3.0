
import React, { useState } from 'react';
import { Language, CurriculumExamples } from '../types';
import { UI_TRANSLATIONS } from '../data';

interface ExampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  examples: CurriculumExamples;
  language: Language;
  title: string;
}

const ExampleModal: React.FC<ExampleModalProps> = ({ isOpen, onClose, examples, language, title }) => {
  const [activeTab, setActiveTab] = useState<'primaria' | 'eso' | 'bachillerato'>('primaria');
  const t = UI_TRANSLATIONS[language];

  if (!isOpen) return null;

  const currentExample = examples[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white w-full max-w-4xl overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh] shadow-2xl">
        
        {/* Header */}
        <div className="bg-slate-900 p-8 flex justify-between items-start">
          <div className="pr-8">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
              Curriculum Connection (Navarra / LOMLOE)
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white leading-tight tracking-tight">
              {title}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-white">
          <button
            onClick={() => setActiveTab('primaria')}
            className={`flex-1 px-4 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === 'primaria' 
                ? 'bg-slate-50 text-slate-900 border-b-2 border-slate-900' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t.stages.primaria}
          </button>
          <button
            onClick={() => setActiveTab('eso')}
            className={`flex-1 px-4 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === 'eso' 
                ? 'bg-slate-50 text-slate-900 border-b-2 border-slate-900' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t.stages.eso}
          </button>
          <button
            onClick={() => setActiveTab('bachillerato')}
            className={`flex-1 px-4 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === 'bachillerato' 
                ? 'bg-slate-50 text-slate-900 border-b-2 border-slate-900' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t.stages.bachillerato}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto bg-white flex-1">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
             {/* Left Col: Activity */}
            <div className="col-span-1 md:col-span-2">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">
                 {t.activity}
               </h4>
               <p className="text-lg text-slate-800 leading-relaxed font-light">
                 {currentExample.activity[language]}
               </p>
            </div>

            {/* Bottom Row: Competences */}
            <div className="bg-slate-50 p-6 rounded-sm border-l-4 border-slate-200">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                 {t.specComp}
               </h4>
               <p className="text-sm font-medium text-slate-700">
                 {currentExample.competenciasEspecificas[language]}
               </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-sm border-l-4 border-slate-200">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                 {t.genComp}
               </h4>
               <p className="text-sm font-bold text-slate-700 font-mono">
                 {currentExample.competenciaGeneral[language]}
               </p>
            </div>
          </div>

          <div className="mt-4 pt-6 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest text-right">
              Departamento de Educación · Comunidad Foral de Navarra
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleModal;
