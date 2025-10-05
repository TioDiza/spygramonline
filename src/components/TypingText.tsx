import React, { useState, useEffect, useMemo } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number; // Velocidade de digitação em milissegundos por caractere
  className?: string; // Classes Tailwind para estilização
  gradientWords?: string[]; // Palavras que devem ter gradiente
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 70, className, gradientWords = [] }) => {
  const [currentTypedLength, setCurrentTypedLength] = useState(0);

  // Pré-processa o texto em segmentos, identificando as palavras com gradiente
  const textSegments = useMemo(() => {
    const segments: { content: string; isGradient: boolean }[] = [];
    let remainingText = text;

    while (remainingText.length > 0) {
      let foundGradientWord = false;
      for (const word of gradientWords) {
        if (remainingText.startsWith(word)) {
          segments.push({ content: word, isGradient: true });
          remainingText = remainingText.substring(word.length);
          foundGradientWord = true;
          break;
        }
      }
      if (!foundGradientWord) {
        // Se não encontrou uma palavra com gradiente, adicione o próximo caractere como texto normal
        segments.push({ content: remainingText[0], isGradient: false });
        remainingText = remainingText.substring(1);
      }
    }
    return segments;
  }, [text, gradientWords]);

  // Efeito para controlar a animação de digitação
  useEffect(() => {
    if (currentTypedLength < text.length) {
      const timeoutId = setTimeout(() => {
        setCurrentTypedLength((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeoutId);
    }
  }, [currentTypedLength, text.length, speed]);

  const renderedElements: React.ReactNode[] = [];
  let currentGlobalOffset = 0; // Rastreia a posição atual no texto completo

  // Itera sobre os segmentos para renderizar o texto digitado
  for (let i = 0; i < textSegments.length; i++) {
    const segment = textSegments[i];
    const segmentContent = segment.content;
    const segmentLength = segmentContent.length;

    // Calcula quantos caracteres deste segmento devem ser exibidos
    const charsToDisplayFromThisSegment = Math.max(
      0, // Não exibe caracteres negativos
      Math.min(
        segmentLength, // Limita ao tamanho do segmento
        currentTypedLength - currentGlobalOffset // Quantos caracteres restam para exibir do total, a partir do início deste segmento
      )
    );

    // Se há caracteres para exibir neste segmento
    if (charsToDisplayFromThisSegment > 0) {
      const partialContent = segmentContent.substring(0, charsToDisplayFromThisSegment);
      
      // Define a classe CSS com base se é uma palavra com gradiente ou não
      const spanClassName = segment.isGradient
        ? "inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text"
        : "text-white";

      renderedElements.push(
        <span key={i} className={spanClassName}>
          {partialContent}
        </span>
      );
    }
    
    // Avança o offset global para o próximo segmento
    currentGlobalOffset += segmentLength;
  }

  return (
    <p className={className}>
      {renderedElements}
      {currentTypedLength < text.length && <span className="animate-pulse">|</span>} {/* Cursor piscando */}
    </p>
  );
};

export default TypingText;