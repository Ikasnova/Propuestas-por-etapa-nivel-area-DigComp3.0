
export type Language = 'en' | 'es' | 'eu';

export interface LocalizedText {
  en: string;
  es: string;
  eu: string;
}

export enum ProficiencyLevel {
  BASIC = 'Basic',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  HIGHLY_ADVANCED = 'Highly advanced'
}

export enum KSA {
  KNOWLEDGE = 'Knowledge',
  SKILL = 'Skill',
  ATTITUDE = 'Attitude'
}

export interface CurriculumStageDetail {
  activity: LocalizedText;
  competenciaGeneral: LocalizedText; // Key Competences / Competencias Clave
  competenciasEspecificas: LocalizedText; // Subject specific competences
}

export interface CurriculumExamples {
  primaria: CurriculumStageDetail;
  eso: CurriculumStageDetail;
  bachillerato: CurriculumStageDetail;
}

export interface LearningOutcome {
  id: string;
  description: LocalizedText;
  level: ProficiencyLevel;
  ksa: KSA;
  aiLabel: string;
  competenceArea: LocalizedText; 
  competenceSubArea: LocalizedText;
  examples?: CurriculumExamples;
}

export interface NavarraSubject {
  id: string;
  name: LocalizedText;
  recommendedAreas: number[]; // DigComp Areas (1-5) relevant to this subject
}

export interface TeacherSelection {
  stage: 'primaria' | 'eso' | 'bachillerato' | '';
  grade: string;
  subjectId: string;
  proficiencyLevel: string;
}

export interface ActivityProposal {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  areaId: number;
}