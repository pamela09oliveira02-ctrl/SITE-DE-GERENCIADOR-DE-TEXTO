import React from 'react';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { BeakerIcon } from './icons/BeakerIcon';

export type GenerationMode = 'creative' | 'direct' | 'any';

interface Mode {
  id: GenerationMode;
  name: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const modes: Mode[] = [
  {
    id: 'creative',
    name: 'Colaborador Criativo',
    description: 'Expande suas ideias de forma surpreendente e original.',
    icon: LightbulbIcon,
  },
  {
    id: 'direct',
    name: 'Continuação Direta',
    description: 'Continua o texto de forma literal e objetiva.',
    icon: ArrowRightIcon,
  },
  {
    id: 'any',
    name: 'Livre (Experimental)',
    description: 'Geração sem amarras, para resultados inesperados.',
    icon: BeakerIcon,
  },
];

interface ModeSelectorProps {
  selectedMode: GenerationMode;
  onSelectMode: (mode: GenerationMode) => void;
  isLoading: boolean;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ selectedMode, onSelectMode, isLoading }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-emerald-200 mb-2">
        Escolha o modo de geração
      </label>
      <div className="grid sm:grid-cols-3 gap-3">
        {modes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            onClick={() => onSelectMode(mode.id)}
            disabled={isLoading}
            className={`
              p-4 rounded-lg border-2 text-left transition-all duration-200 
              ${selectedMode === mode.id 
                ? 'bg-emerald-800/50 border-amber-500 shadow-lg scale-105' 
                : 'bg-emerald-900/50 border-emerald-700 hover:border-emerald-600'}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            aria-pressed={selectedMode === mode.id}
          >
            <div className="flex items-center">
              <mode.icon className={`h-6 w-6 mr-3 ${selectedMode === mode.id ? 'text-amber-400' : 'text-emerald-500'}`} />
              <span className="font-semibold text-white">{mode.name}</span>
            </div>
            <p className="text-xs text-emerald-400 mt-1 pl-9">{mode.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};