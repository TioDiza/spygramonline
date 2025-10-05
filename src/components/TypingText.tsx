import React, { useState, useEffect, useMemo } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number; // Velocidade de digitação em milissegundos por caractere
  className?: string; // Classes Tailwind para estilização
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 70, className }) => {
  const [currentTypedLength, setCurrentTypedLength] = useState(0);

  // Pré-processa o texto em segmentos, identificando 'INSTAGRAM'
  const textSegments = useMemo(() => {
    const segments: { content: string; isInstagram: boolean }[] = [];
    // Divide o texto, mantendo 'INSTAGRAM' como um item separado no array
    const parts = text.split(/(INSTAGRAM)/g); 
    
    parts.forEach(part => {
      if (part) { // Garante que partes vazias não sejam adicionadas
        segments.push({ content: part, isInstagram: part === 'INSTAGRAM' });
      }
    });
    return segments;
  }, [text]);

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
      
      // Define a classe CSS com base se é a palavra 'INSTAGRAM' ou não
      const spanClassName = segment.isInstagram
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