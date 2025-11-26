import React from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-900 focus:ring-amber-500 disabled:bg-amber-600/50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-100"
    >
      {isLoading ? (
        <>
          <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
          Gerando...
        </>
      ) : (
        <>
          <SparklesIcon className="-ml-1 mr-2 h-5 w-5" />
          Gerar Texto
        </>
      )}
    </button>
  );
};