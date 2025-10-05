import React, { useState, useEffect, useCallback } from 'react';

interface LoadingSequenceProps {
  messages: string[];
  onSequenceComplete: () => void;
  delayPerMessage?: number; // Tempo de espera após cada mensagem ser digitada (em milissegundos)
  typingSpeed?: number; // Velocidade de digitação (em milissegundos por caractere)
}

const LoadingSequence: React.FC<LoadingSequenceProps> = ({
  messages,
  onSequenceComplete,
  delayPerMessage = 1500, // Padrão: 1.5 segundos
  typingSpeed = 50, // Padrão: 50ms por caractere
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const startTyping = useCallback((message: string) => {
    let charIndex = 0;
    setDisplayedText(''); // Limpa a mensagem anterior
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (charIndex < message.length) {
        setDisplayedText((prev) => prev + message[charIndex]);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        // Espera um pouco antes de ir para a próxima mensagem ou finalizar
        const nextMessageTimeout = setTimeout(() => {
          setCurrentMessageIndex((prev) => prev + 1);
        }, delayPerMessage);
        return () => clearTimeout(nextMessageTimeout);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [delayPerMessage, typingSpeed]);

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      startTyping(messages[currentMessageIndex]);
    } else {
      // Todas as mensagens foram exibidas
      onSequenceComplete();
    }
  }, [currentMessageIndex, messages, onSequenceComplete, startTyping]);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[150px]">
      <div className="w-16 h-16 border-4 border-t-transparent border-pink-500 rounded-full animate-spin mb-4"></div>
      <p className="text-lg text-gray-300 font-medium min-h-[2rem]">
        {displayedText}
        {isTyping && <span className="animate-pulse ml-1">|</span>} {/* Cursor piscando */}
      </p>
    </div>
  );
};

export default LoadingSequence;