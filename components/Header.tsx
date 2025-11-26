import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-emerald-500">
          Gerador de Texto Criativo
        </span>
      </h1>
      <p className="mt-3 text-lg sm:text-xl text-amber-200/80 max-w-2xl mx-auto">
        Dê vida às suas ideias. Insira uma frase e deixe a inteligência artificial da Gemini API construir o resto.
      </p>
    </header>
  );
};