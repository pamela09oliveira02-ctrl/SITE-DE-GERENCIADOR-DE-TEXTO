import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, isLoading }) => {
  return (
    <div>
      <label htmlFor="prompt" className="block text-sm font-medium text-emerald-200 mb-2">
        Comece com uma frase, um verso ou uma ideia...
      </label>
      <textarea
        id="prompt"
        name="prompt"
        rows={4}
        className="w-full p-4 bg-emerald-800/50 border border-emerald-700 rounded-lg shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-emerald-100 placeholder-emerald-600 resize-none"
        placeholder="Ex: 'Era uma noite escura e tempestuosa...'"
        value={value}
        onChange={onChange}
        disabled={isLoading}
      />
    </div>
  );
};