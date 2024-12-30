import React from 'react';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportPDFProps {
  targetRef: React.RefObject<HTMLDivElement>;
  url: string;
}

export function ExportPDF({ targetRef, url }: ExportPDFProps) {
  const generatePDF = async () => {
    if (!targetRef.current) return;

    try {
      const canvas = await html2canvas(targetRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      });

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add header
      pdf.setFontSize(16);
      pdf.setTextColor(44, 62, 80);
      pdf.text('Web Performance Analysis Report', 105, 15, { align: 'center' });
      
      // Add URL and date
      pdf.setFontSize(10);
      pdf.setTextColor(127, 140, 141);
      pdf.text(`URL: ${url}`, 15, 25);
      pdf.text(`Generated: ${new Date().toLocaleString()}`, 15, 30);
      
      // Add horizontal line
      pdf.setDrawColor(189, 195, 199);
      pdf.line(15, 35, 195, 35);
      
      // Add the main content
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        10,
        40,
        imgWidth,
        imgHeight
      );

      // Save the PDF
      pdf.save('performance-analysis-report.pdf');
    } catch (error) {
      console.error('PDF generation failed:', error);
    }
  };

  return (
    <button
      onClick={generatePDF}
      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      <Download className="w-4 h-4 mr-2" />
      Export PDF
    </button>
  );
}
