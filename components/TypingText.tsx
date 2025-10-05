import React, { useState, useEffect } from 'react';
import { cn } from '../src/lib/utils'; // Importando a função cn

interface TypingTextProps {
  text: string;
  speed?: number; // Velocidade de digitação em milissegundos por caractere
  className?: string; // Classes Tailwind para estilização
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 70, className }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  // Effect for typing animation
  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeoutId);
    }
  }, [index, text, speed]);

  // Função para aplicar o gradiente à palavra "INSTAGRAM" e text-white ao restante
  const renderTextWithGradient = (currentText: string) => {
    // Divide o texto em partes, mantendo "INSTAGRAM" como um item separado
    const parts = currentText.split(/(INSTAGRAM)/g); 
    
    return parts.map((part, idx) => {
      if (part === 'INSTAGRAM') {
        return `
          <span key=${idx} class="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
            ${part}
          </span>
        `;
      } else {
        // Aplica text-white às outras partes do texto
        return `<span key=${idx} class="text-white">${part}</span>`;
      }
    }).join('');
  };

  return (
    <p className={cn(className, "flex items-center")}>
      <span dangerouslySetInnerHTML={{ __html: renderTextWithGradient(displayedText) }} />
      {index < text.length && <span className="animate-pulse">|</span>} {/* Cursor piscando */}
    </p>
  );
};

export default TypingText;