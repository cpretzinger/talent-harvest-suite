import { Question } from "@/types/assessment";
import { AssessmentSection } from "@/types/assessment/progress";

export const getSectionFromCategory = (category: string): AssessmentSection => {
  if (category.includes('Decisive') || category.includes('Interactive') || 
      category.includes('Stability') || category.includes('Cautious')) {
    return 'disc';
  }
  if (category.includes('Aesthetic') || category.includes('Economic') || 
      category.includes('Individualistic') || category.includes('Political') || 
      category.includes('Altruist') || category.includes('Regulatory') || 
      category.includes('Theoretical')) {
    return 'values';
  }
  return 'attributes';
};

export const calculateSectionProgress = (
  section: string,
  currentIndex: number,
  questions: Question[]
): number => {
  const sectionQuestions = questions.filter(q => 
    getSectionFromCategory(q.category) === section
  );
  const sectionStartIndex = questions.findIndex(q => 
    getSectionFromCategory(q.category) === section
  );
  const progressInSection = currentIndex - sectionStartIndex;
  
  return Math.max(0, Math.min(100, (progressInSection / (sectionQuestions.length || 1)) * 100));
};