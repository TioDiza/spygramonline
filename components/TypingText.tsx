import React, { useState, useEffect } from 'react';
import { cn } from '../src/lib/utils'; // Importando a função cn

interface TypingTextProps {
  text: string;
  speed?: number; // Velocidade de digitação em milissegundos por caractere
  className?: string; // Classes Tailwind para estilização
  showTime?: boolean; // Nova prop para mostrar o horário
  timeZone?: string; // Nova prop para o fuso horário
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 70, className, showTime = false, timeZone = 'America/Sao_Paulo' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

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

  // Effect for updating time
  useEffect(() => {
    if (showTime) {
      const updateTime = () => {
        const now = new Date();
        setCurrentTime(
          new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: timeZone,
          }).format(now)
        );
      };

      updateTime(); // Set initial time
      const intervalId = setInterval(updateTime, 1000); // Update every second
      return () => clearInterval(intervalId);
    }
  }, [showTime, timeZone]);

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
    <p className={cn(className, "flex items-center")}> {/* Adicionado flex items-center para alinhar o horário */}
      {showTime && <span className="text-gray-400 mr-2 whitespace-nowrap">{currentTime}</span>} {/* Exibe o horário */}
      <span dangerouslySetInnerHTML={{ __html: renderTextWithGradient(displayedText) }} />
      {index < text.length && <span className="animate-pulse">|</span>} {/* Cursor piscando */}
    </p>
  );
};

export default TypingText;