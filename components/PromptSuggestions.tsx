import React from 'react';

interface PromptSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
  isLoading: boolean;
}

const suggestions = [
  "Escreva um poema curto sobre o som da chuva.",
  "Crie uma sinopse para um filme de mistério em Marte.",
  "Escreva um tweet motivacional para começar a semana.",
  "Gere a letra de uma música sobre viagens no tempo.",
  "Descreva um jantar romântico em Paris com detalhes sensoriais.",
  "Crie 3 ideias de slogans para uma marca de café futurista."
];

export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ onSuggestionClick, isLoading }) => {
  return (
    <div className="mt-4">
      <p className="text-sm text-emerald-300 mb-2">Sugestões criativas:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            disabled={isLoading}
            className="px-3 py-1 bg-emerald-800/50 text-emerald-200 text-xs rounded-full hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-900 focus:ring-amber-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-emerald-700/50"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};