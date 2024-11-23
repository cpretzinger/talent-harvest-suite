import PDFDocument from 'pdfkit';
import { AssessmentResult, StylePattern, ValuesDimension } from '@/types/assessment';

export async function generatePDFReport(results: AssessmentResult): Promise<string> {
  const doc = new PDFDocument({ margins: { top: 50, bottom: 50, left: 72, right: 72 } });
  const chunks: Buffer[] = [];

  // Collect PDF chunks
  doc.on('data', chunk => chunks.push(chunk));
  
  // Header
  doc.fontSize(24).text('Advanced Insights Assessment Report', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(new Date().toLocaleDateString(), { align: 'center' });
  doc.moveDown(2);

  // Executive Summary
  addSection(doc, 'Executive Summary', () => {
    doc.fontSize(12).text(generateExecutiveSummary(results.overall_profile));
    doc.moveDown();
  });

  // DISC Profile
  addSection(doc, 'DISC Profile Analysis', () => {
    addDISCProfile(doc, results.overall_profile.naturalStyle, results.overall_profile.adaptiveStyle);
    doc.moveDown();
  });

  // Values Profile
  addSection(doc, 'Values Assessment', () => {
    addValuesProfile(doc, results.overall_profile.values);
    doc.moveDown();
  });

  // Dimensional Balance
  addSection(doc, 'Dimensional Balance', () => {
    addDimensionalBalance(doc, results.dimensional_balance);
    doc.moveDown();
  });

  // Category Scores
  addSection(doc, 'Category Analysis', () => {
    addCategoryScores(doc, results.scores);
    doc.moveDown();
  });

  // Development Suggestions
  addSection(doc, 'Development Suggestions', () => {
    addDevelopmentSuggestions(doc, results);
    doc.moveDown();
  });

  // Finish the PDF
  doc.end();

  // Convert chunks to base64
  const pdfBuffer = Buffer.concat(chunks);
  return `data:application/pdf;base64,${pdfBuffer.toString('base64')}`;
}

function addSection(doc: PDFKit.PDFDocument, title: string, contentFn: () => void) {
  doc.fontSize(16).text(title, { underline: true });
  doc.moveDown();
  contentFn();
  doc.moveDown();
}

function generateExecutiveSummary(profile: AssessmentResult['overall_profile']): string {
  const primaryNaturalStyle = getPrimaryStyle(profile.naturalStyle);
  const primaryAdaptiveStyle = getPrimaryStyle(profile.adaptiveStyle);
  
  return `This report provides a comprehensive analysis of your behavioral preferences and motivational drivers. 

Your profile indicates:
• Primary Natural Style: ${primaryNaturalStyle}
• Primary Adaptive Style: ${primaryAdaptiveStyle}
• Key Values: ${getKeyValues(profile.values)}

The insights in this report can help you leverage your natural talents and identify areas for growth and development.`;
}

function addDISCProfile(
  doc: PDFKit.PDFDocument, 
  naturalStyle: StylePattern,
  adaptiveStyle: StylePattern
) {
  doc.fontSize(12).text('Natural Style:', { continued: true });
  doc.moveDown();
  Object.entries(naturalStyle).forEach(([dimension, score]) => {
    doc.text(`${dimension}: ${score}%`, { continued: true });
    doc.text(` - ${getDISCDescription(dimension, score)}`);
    doc.moveDown(0.5);
  });

  doc.moveDown();
  doc.text('Adaptive Style:', { continued: true });
  doc.moveDown();
  Object.entries(adaptiveStyle).forEach(([dimension, score]) => {
    doc.text(`${dimension}: ${score}%`, { continued: true });
    doc.text(` - ${getDISCDescription(dimension, score)}`);
    doc.moveDown(0.5);
  });
}

function addValuesProfile(doc: PDFKit.PDFDocument, values: ValuesDimension[]) {
  values.forEach(value => {
    doc.fontSize(12).text(`${value.dimension}: ${value.score}%`, { continued: true });
    doc.fontSize(10).text(` - ${value.description}`);
    doc.moveDown(0.5);
  });
}

function addDimensionalBalance(doc: PDFKit.PDFDocument, balance: AssessmentResult['dimensional_balance']) {
  doc.fontSize(12).text('External Dimensions:');
  doc.moveDown(0.5);
  Object.entries(balance.external).forEach(([dimension, score]) => {
    doc.text(`${formatDimension(dimension)}: ${score}%`);
    doc.moveDown(0.5);
  });

  doc.moveDown();
  doc.text('Internal Dimensions:');
  doc.moveDown(0.5);
  Object.entries(balance.internal).forEach(([dimension, score]) => {
    doc.text(`${formatDimension(dimension)}: ${score}%`);
    doc.moveDown(0.5);
  });
}

function addCategoryScores(doc: PDFKit.PDFDocument, scores: AssessmentResult['scores']) {
  scores.forEach(score => {
    doc.fontSize(12).text(`${score.category} - ${score.level}`, { continued: true });
    doc.fontSize(10).text(` (${score.score}%)`);
    doc.moveDown(0.5);
    
    score.insights.forEach(insight => {
      doc.fontSize(10).text(`• ${insight}`);
      doc.moveDown(0.25);
    });
    doc.moveDown(0.5);
  });
}

function addDevelopmentSuggestions(doc: PDFKit.PDFDocument, results: AssessmentResult) {
  const suggestions = generateDevelopmentSuggestions(results);
  suggestions.forEach(suggestion => {
    doc.fontSize(12).text(`• ${suggestion}`);
    doc.moveDown(0.5);
  });
}

// Helper functions
function getPrimaryStyle(style: StylePattern): string {
  const entries = Object.entries(style);
  const [highest] = entries.sort(([, a], [, b]) => b - a);
  return `${highest[0]} (${highest[1]}%)`;
}

function getKeyValues(values: ValuesDimension[]): string {
  return values
    .filter(v => v.score >= 70)
    .map(v => v.dimension)
    .join(', ');
}

function getDISCDescription(dimension: string, score: number): string {
  if (score >= 80) return "Very High";
  if (score >= 60) return "High";
  if (score >= 40) return "Moderate";
  if (score >= 20) return "Low";
  return "Very Low";
}

function formatDimension(dimension: string): string {
  return dimension
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function generateDevelopmentSuggestions(results: AssessmentResult): string[] {
  const suggestions: string[] = [];
  const { naturalStyle } = results.overall_profile;

  if (naturalStyle.D > 70) {
    suggestions.push("Consider practicing active listening and developing patience with others.");
  }
  if (naturalStyle.I > 70) {
    suggestions.push("Focus on developing detail orientation and follow-through on tasks.");
  }
  if (naturalStyle.S > 70) {
    suggestions.push("Work on becoming more comfortable with change and taking initiative.");
  }
  if (naturalStyle.C > 70) {
    suggestions.push("Practice being more flexible and accepting of different approaches.");
  }

  return suggestions;
}