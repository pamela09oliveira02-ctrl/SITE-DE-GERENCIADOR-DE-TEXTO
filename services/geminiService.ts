import { GoogleGenAI } from "@google/genai";

type GenerationMode = 'creative' | 'direct' | 'any';

const getSystemInstruction = (mode: GenerationMode): string => {
  switch (mode) {
    case 'direct':
      return "Você é um assistente de IA que continua o texto fornecido da forma mais direta e literal possível, sem adicionar interpretações, opiniões ou floreios criativos. Apenas continue a frase ou parágrafo.";
    case 'any':
      return "Você é um gerador de texto de formato livre. Continue o texto a seguir sem restrições de estilo, formato ou tópico. Seja imprevisível, criativo e completamente livre em sua resposta.";
    case 'creative':
    default:
      return "Você é um colaborador criativo de elite, especialista em expandir ideias. Sua tarefa é analisar a essência, o tom и o estilo do texto inicial do usuário e continuá-lo de forma natural, mas ousada. Seu objetivo é surpreender e encantar, adaptando sua escrita ao formato sugerido (poema, história, tweet, etc.) e evitando o óbvio. Introduza um elemento novo, uma perspectiva diferente ou uma emoção mais profunda.";
  }
};

export const generateText = async (inputText: string, mode: string): Promise<string> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    throw new Error("A chave da API não está configurada. Por favor, defina a variável de ambiente API_KEY.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const systemInstruction = getSystemInstruction(mode as GenerationMode);

  try {
    const model = 'gemini-2.5-flash';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: inputText,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
        topP: 0.95,
        topK: 40,
      }
    });

    const text = response.text;

    if (!text) {
      const finishReason = response.candidates?.[0]?.finishReason;
      if (finishReason && finishReason !== 'STOP') {
        const reasonMessage = finishReason === 'SAFETY' 
          ? 'O conteúdo foi bloqueado por políticas de segurança.' 
          : `Motivo: ${finishReason}.`;
        throw new Error(`A geração de texto foi interrompida. ${reasonMessage} Tente uma entrada diferente.`);
      }
      throw new Error("A API retornou uma resposta vazia. Por favor, tente reformular sua entrada.");
    }

    return text;
  } catch (error) {
    if (error instanceof Error) {
        console.error("Erro ao gerar texto:", error.message);
        throw error;
    }
    console.error("Erro desconhecido ao gerar texto com a API Gemini:", error);
    throw new Error("Não foi possível gerar o texto. A API pode estar indisponível ou a requisição foi bloqueada.");
  }
};