import { jsPDF } from 'jspdf';
import { AssessmentResult } from '@/types/assessment';

export async function generatePDFReport(results: AssessmentResult): Promise<string> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Header
  doc.setFontSize(24);
  doc.text('Advanced Insights Assessment Report', doc.internal.pageSize.width / 2, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.text(new Date().toLocaleDateString(), doc.internal.pageSize.width / 2, 30, { align: 'center' });

  // DISC Profile
  doc.setFontSize(16);
  doc.text('DISC Profile', 20, 50);
  doc.setFontSize(12);
  let y = 60;
  Object.entries(results.overall_profile.naturalStyle).forEach(([dimension, score]) => {
    doc.text(`${dimension}: ${score}%`, 20, y);
    y += 10;
  });

  // Dimensional Balance
  y += 10;
  doc.setFontSize(16);
  doc.text('Dimensional Balance', 20, y);
  doc.setFontSize(12);
  y += 10;
  
  Object.entries(results.dimensional_balance.external).forEach(([dimension, score]) => {
    doc.text(`${dimension}: ${score}%`, 20, y);
    y += 10;
  });

  // Category Scores
  y += 10;
  doc.setFontSize(16);
  doc.text('Category Scores', 20, y);
  doc.setFontSize(12);
  y += 10;
  
  results.scores.forEach(score => {
    doc.text(`${score.category}: ${score.score} (${score.level})`, 20, y);
    y += 10;
  });

  return doc.output('datauristring');
}