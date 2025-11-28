
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { LearningOutcome, Language, TeacherSelection, CurriculumExamples, ProficiencyLevel } from '../types';
import { UI_TRANSLATIONS, NAVARRA_SUBJECTS_DATA } from '../data';

export const generateTeacherPlanPDF = (
  outcomes: LearningOutcome[],
  selection: TeacherSelection,
  language: Language
) => {
  const doc = new jsPDF();
  const t = UI_TRANSLATIONS[language];
  const date = new Date().toLocaleDateString();
  
  // Resolve Names
  const stageName = t.stages[selection.stage as keyof typeof t.stages] || selection.stage;
  const subjects = NAVARRA_SUBJECTS_DATA[selection.stage as keyof typeof NAVARRA_SUBJECTS_DATA];
  const subjectObj = subjects?.find(s => s.id === selection.subjectId);
  const subjectName = subjectObj?.name[language] || selection.subjectId;
  const levelName = selection.proficiencyLevel ? t.levels[selection.proficiencyLevel as ProficiencyLevel] : t.allLevels;

  // Title
  doc.setFontSize(18);
  doc.setTextColor(40, 40, 40);
  doc.text(t.teacherMode.title, 14, 20);

  // Metadata
  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);
  doc.text(`${t.teacherMode.generatedFor}: ${stageName} - ${selection.grade}`, 14, 30);
  doc.text(`${t.teacherMode.selectSubject}: ${subjectName}`, 14, 36);
  doc.text(`${t.teacherMode.selectLevel}: ${levelName}`, 14, 42);
  doc.text(`Date: ${date}`, 14, 48);

  // Table Data
  const tableData = outcomes.map(outcome => {
    // Get example specific to stage
    const exampleStage = selection.stage as keyof CurriculumExamples;
    const example = outcome.examples?.[exampleStage];
    
    return [
      outcome.id,
      outcome.competenceSubArea[language],
      outcome.description[language],
      example?.activity[language] || '-'
    ];
  });

  // Generate Table
  (doc as any).autoTable({
    startY: 55,
    head: [['ID', 'Sub-Area', 'Learning Outcome', `Activity Context (${stageName})`]],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [44, 62, 80], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 9, cellPadding: 3, overflow: 'linebreak' },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 40 },
      2: { cellWidth: 'auto' },
      3: { cellWidth: 60 }
    }
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text('DigComp 3.0 Explorer - Navarre Curriculum Edition', 14, doc.internal.pageSize.height - 10);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
  }

  doc.save(`DigComp_Plan_${selection.stage}_${selection.subjectId}.pdf`);
};
