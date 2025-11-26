import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { GenerateButton } from './components/GenerateButton';
import { ResultCard } from './components/ResultCard';
import { generateText } from './services/geminiService';
import { ModeSelector, GenerationMode } from './components/ModeSelector';
import { PromptSuggestions } from './components/PromptSuggestions';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [mode, setMode] = useState<GenerationMode>('creative');
  const [generatedText, setGeneratedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedText('');

    try {
      const result = await generateText(prompt, mode);
      setGeneratedText(result);
    } catch (e) {
      const err = e as Error;
      setError(err.message || 'Ocorreu um erro desconhecido.');
      setGeneratedText('');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading, mode]);
  
  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  return (
    <div className="min-h-screen bg-emerald-950 text-white font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <Header />
        <main className="mt-8">
          <div className="bg-emerald-900/50 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl border border-emerald-800 space-y-6">
            <ModeSelector
              selectedMode={mode}
              onSelectMode={setMode}
              isLoading={isLoading}
            />
            <PromptInput 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              isLoading={isLoading}
            />
            <PromptSuggestions 
              onSuggestionClick={handleSuggestionClick}
              isLoading={isLoading}
            />
            <GenerateButton 
              onClick={handleGenerate} 
              isLoading={isLoading} 
            />
            
            {(generatedText || isLoading || error) && (
              <>
                <hr className="border-emerald-800/50" />
                <ResultCard 
                  text={generatedText}
                  isLoading={isLoading}
                  error={error}
                />
              </>
            )}
          </div>
        </main>
      </div>
       <footer className="w-full max-w-3xl mx-auto text-center text-gray-400 py-6 mt-8">
        <p>Desenvolvido com a API Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;