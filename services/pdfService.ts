import { jsPDF } from "jspdf";
import { RemediationData, Language } from "../types";

export const generateWorksheetPDF = (data: RemediationData, language: Language) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let cursorY = 20;

  // --- Header ---
  doc.setFillColor(0, 56, 168); // DepEd Blue
  doc.rect(0, 0, pageWidth, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("SAGIP: Remediation Worksheet", margin, 18);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const dateStr = new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Generated on: ${dateStr} | Language: ${language}`, margin, 25);

  cursorY = 45;

  // --- Section 1: Concept Review ---
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Guro's Notes (Concept Review)", margin, cursorY);
  cursorY += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const splitConcept = doc.splitTextToSize(data.conceptReview, contentWidth);
  doc.text(splitConcept, margin, cursorY);
  
  // Update cursor based on lines
  cursorY += splitConcept.length * 5 + 15;

  // --- Section 2: Practice Problems ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Remediation Exercises", margin, cursorY);
  cursorY += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  data.practiceProblems.forEach((problem, index) => {
    // Check for page break
    if (cursorY > 260) {
      doc.addPage();
      cursorY = 20;
    }

    const questionPrefix = `${index + 1}. `;
    const questionText = doc.splitTextToSize(problem, contentWidth - 10);
    
    doc.text(questionPrefix, margin, cursorY);
    doc.text(questionText, margin + 10, cursorY);
    
    const lines = questionText.length;
    cursorY += lines * 5 + 5;

    // Draw answer line
    doc.setDrawColor(150, 150, 150);
    doc.line(margin + 10, cursorY + 5, pageWidth - margin, cursorY + 5);
    
    cursorY += 20; // Space for next question
  });

  // --- Footer ---
  const pageCount = doc.getNumberOfPages();
  for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text('Sagip - Helping Filipino Learners Succeed', pageWidth / 2, 290, { align: 'center' });
  }

  doc.save(`Sagip_Worksheet_${Date.now()}.pdf`);
};