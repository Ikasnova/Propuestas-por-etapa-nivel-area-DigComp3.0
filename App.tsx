
import React, { useState, useMemo } from 'react';
import { DIGCOMP_DATA, UI_TRANSLATIONS, NAVARRA_SUBJECTS_DATA } from './data';
import OutcomeCard from './components/OutcomeCard';
import StatsOverview from './components/StatsOverview';
import TeacherFilter from './components/TeacherFilter';
import ActivityList from './components/ActivityList';
import { generateTeacherPlanPDF } from './utils/pdfGenerator';
import { Language, TeacherSelection } from './types';

function App() {
  // Teacher State - Default Mode
  const [teacherSelection, setTeacherSelection] = useState<TeacherSelection>({
    stage: '',
    grade: '',
    subjectId: '',
    proficiencyLevel: ''
  });

  const [language, setLanguage] = useState<Language>('es');

  const t = UI_TRANSLATIONS[language];

  // Filtering Logic - Teacher Mode Only
  const filteredData = useMemo(() => {
    // In teacher mode, filter based on the subject's recommended areas
    if (!teacherSelection.stage || !teacherSelection.subjectId) return [];

    const subjects = NAVARRA_SUBJECTS_DATA[teacherSelection.stage];
    const selectedSubject = subjects?.find(s => s.id === teacherSelection.subjectId);

    if (!selectedSubject) return [];

    return DIGCOMP_DATA.filter(item => {
      // Parse area number from ID (LO1.x...)
      const areaNum = parseInt(item.id.charAt(2));
      const matchSubject = selectedSubject.recommendedAreas.includes(areaNum);
      const matchLevel = teacherSelection.proficiencyLevel ? item.level === teacherSelection.proficiencyLevel : true;
      
      return matchSubject && matchLevel;
    });
  }, [teacherSelection, language]);

  const toggleLanguage = () => {
    setLanguage(prev => {
      // Cycle: es -> eu -> en -> es
      if (prev === 'es') return 'eu';
      if (prev === 'eu') return 'en';
      return 'es';
    });
  };

  const getLanguageLabel = (lang: Language) => {
    switch (lang) {
      case 'es': return 'ESP';
      case 'eu': return 'EUS';
      case 'en': return 'ENG';
    }
  };

  const handlePdfDownload = () => {
    if (filteredData.length > 0 && teacherSelection.stage) {
      generateTeacherPlanPDF(filteredData, teacherSelection, language);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Modern Minimalist */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-row items-center justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <h1 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">
                  {t.teacherMode.title}
                </h1>
                <span className="hidden md:inline-block px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold tracking-widest uppercase rounded">
                  Navarra Ed.
                </span>
              </div>
              <p className="text-slate-500 text-xs md:text-sm font-medium tracking-wide mt-0.5">
                {t.teacherMode.description}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleLanguage}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold tracking-widest hover:bg-slate-800 transition-all rounded shadow-lg shadow-slate-300/50 uppercase"
              >
                {getLanguageLabel(language)}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Section */}
      <div className="bg-white border-b border-slate-200 py-6 px-6 transition-all">
        <div className="max-w-7xl mx-auto">
          <TeacherFilter 
            selection={teacherSelection}
            onChange={setTeacherSelection}
            language={language}
            onDownload={handlePdfDownload}
            resultCount={filteredData.length}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-8 space-y-8">
        
        {/* Statistics - Show when data is available */}
        {filteredData.length > 0 && (
           <StatsOverview data={filteredData} language={language} />
        )}

        {filteredData.length > 0 && (
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-800">
              {t.learningOutcomes} 
            </h2>
            <span className="text-sm font-bold text-slate-500">
              {filteredData.length} <span className="font-normal opacity-70">{t.found}</span>
            </span>
          </div>
        )}

        {filteredData.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map(outcome => (
                <OutcomeCard key={outcome.id} outcome={outcome} language={language} />
              ))}
            </div>

            {/* Suggested Activities Section */}
            <ActivityList 
              outcomes={filteredData} 
              selection={teacherSelection} 
              language={language} 
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white/50 rounded-lg border-2 border-dashed border-slate-200">
            <h3 className="text-xl font-bold text-slate-400">{t.noResultsTitle}</h3>
            <p className="text-slate-400 mt-2">
              {t.teacherMode.description}
            </p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-10 px-4 text-center mt-12">
        <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
          {t.footer}
        </p>
      </footer>
    </div>
  );
}

export default App;