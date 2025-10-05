import React, { useState, useEffect, useCallback } from 'react';
import ChipLoader from './ChipLoader'; // Importa o novo ChipLoader

interface LoadingSequenceProps {
  messages: string[];
  onSequenceComplete: () => void;
  delayPerMessage?: number; // Tempo de espera após cada mensagem ser digitada (em milissegundos)
  typingSpeed?: number; // Velocidade de digitação (em milissegundos por caractere)
  minDisplayTime?: number; // Novo: Tempo mínimo para exibir o loader se não houver mensagens
}

const LoadingSequence: React.FC<LoadingSequenceProps> = ({
  messages,
  onSequenceComplete,
  delayPerMessage = 1500, // Padrão: 1.5 segundos
  typingSpeed = 50, // Padrão: 50ms por caractere
  minDisplayTime = 10000, // Padrão: 10 segundos
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
    if (messages.length === 0) {
      // Se não houver mensagens, apenas exibe o loader pelo tempo mínimo
      const timer = setTimeout(() => {
        onSequenceComplete();
      }, minDisplayTime);
      return () => clearTimeout(timer);
    } else {
      // Lógica existente para mensagens
      if (currentMessageIndex < messages.length) {
        const cleanupTyping = startTyping(messages[currentMessageIndex]);
        return cleanupTyping;
      } else {
        // Todas as mensagens foram exibidas
        onSequenceComplete();
      }
    }
  }, [currentMessageIndex, messages, onSequenceComplete, startTyping, minDisplayTime]);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[150px]">
      <div className="mb-4"> {/* Container para o ChipLoader */}
        <ChipLoader />
      </div>
      {messages.length > 0 && ( // Renderiza o texto apenas se houver mensagens
        <p className="text-lg text-gray-300 font-medium min-h-[2rem]">
          {displayedText}
          {isTyping && <span className="animate-pulse ml-1">|</span>} {/* Cursor piscando */}
        </p>
      )}
    </div>
  );
};

export default LoadingSequence;