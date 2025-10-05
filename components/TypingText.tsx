import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number; // Velocidade de digitação em milissegundos por caractere
  className?: string; // Classes Tailwind para estilização
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 70, className }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeoutId);
    }
  }, [index, text, speed]);

  // Função para aplicar o gradiente à palavra "Instagram"
  const renderTextWithGradient = (currentText: string) => {
    const instagramGradientSpan = `
      <span class="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
        Instagram
      </span>
    `;
    // Substitui a palavra "Instagram" pelo span com gradiente
    return currentText.replace(/Instagram/g, instagramGradientSpan);
  };

  return (
    <p className={className}>
      <span dangerouslySetInnerHTML={{ __html: renderTextWithGradient(displayedText) }} />
      {index < text.length && <span className="animate-pulse">|</span>} {/* Cursor piscando */}
    </p>
  );
};

export default TypingText;