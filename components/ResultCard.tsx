import React from 'react';
import { jsPDF } from "jspdf";
import { DownloadIcon } from './icons/DownloadIcon';

interface ResultCardProps {
  text: string;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-4 bg-emerald-800 rounded w-3/4"></div>
    <div className="h-4 bg-emerald-800 rounded"></div>
    <div className="h-4 bg-emerald-800 rounded w-5/6"></div>
    <div className="h-4 bg-emerald-800 rounded w-1/2"></div>
  </div>
);

export const ResultCard: React.FC<ResultCardProps> = ({ text, isLoading, error }) => {
  const handleDownloadPDF = () => {
    if (!text) return;

    const doc = new jsPDF();
    
    // Configurações do PDF
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - (margin * 2);
    const lineHeight = 7;
    let yPosition = 20;

    // Título
    doc.setFontSize(16);
    doc.setTextColor(0, 100, 0); // Verde escuro
    doc.text("Relatório do Projeto (IA Generator)", margin, yPosition);
    yPosition += 15;

    // Conteúdo
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");

    const splitText = doc.splitTextToSize(text, maxLineWidth);

    splitText.forEach((line: string) => {
      if (yPosition > 280) { // Nova página se chegar ao fim
        doc.addPage();
        yPosition = 20;
      }
      doc.text(line, margin, yPosition);
      yPosition += lineHeight;
    });

    // Rodapé
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Gerado em ${new Date().toLocaleDateString()} - Página ${i} de ${pageCount}`, 
        margin, 
        290
      );
    }

    doc.save("projeto-ia.pdf");
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }
    if (error) {
      return (
        <div className="text-red-400 bg-red-900/20 p-4 rounded-lg border border-red-700/30">
          <p className="font-bold text-amber-400">Erro ao gerar texto</p>
          <p className="mt-1 text-red-300">{error}</p>
        </div>
      );
    }
    if (text) {
      return (
        <p className="text-emerald-100 whitespace-pre-wrap leading-relaxed">{text}</p>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-emerald-200">Resultado</h2>
        {!isLoading && !error && text && (
          <button
            onClick={handleDownloadPDF}
            className="flex items-center text-xs bg-emerald-800 hover:bg-emerald-700 text-emerald-100 px-3 py-1 rounded transition-colors duration-200 border border-emerald-700"
            title="Baixar como PDF"
          >
            <DownloadIcon className="w-4 h-4 mr-1.5" />
            Baixar PDF
          </button>
        )}
      </div>
      <div className="min-h-[100px]">
        {renderContent()}
      </div>
    </div>
  );
};