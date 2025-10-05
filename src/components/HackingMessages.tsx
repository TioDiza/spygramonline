import React, { useState, useEffect, useCallback } from 'react';

interface HackingMessagesProps {
  onComplete: () => void;
}

const HackingMessages: React.FC<HackingMessagesProps> = ({ onComplete }) => {
  const messages = [
    "Acessando rede neural do Instagram...",
    "Bypass de segurança iniciado...",
    "Decifrando hash de usuário...",
    "Estabelecendo conexão com o perfil alvo...",
    "Extraindo dados de seguidores e seguidos...",
    "Compilando informações de posts e mídias...",
    "Ignorando restrições de privacidade...",
    "Acesso completo ao perfil concedido!",
  ];

  const typingSpeed = 50; // ms por caractere
  const delayAfterMessage = 1500; // ms após a mensagem ser digitada

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [messageKey, setMessageKey] = useState(0); // Key para forçar re-render da animação de fade

  const startTyping = useCallback((message: string) => {
    let charIndex = 0;
    setDisplayedText('');
    setIsTyping(true);
    setMessageKey(prev => prev + 1); // Atualiza a key para reiniciar a animação de fade

    const typingInterval = setInterval(() => {
      if (charIndex < message.length) {
        setDisplayedText((prev) => prev + message[charIndex]);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        const nextMessageTimeout = setTimeout(() => {
          setCurrentMessageIndex((prev) => prev + 1);
        }, delayAfterMessage);
        return () => clearTimeout(nextMessageTimeout);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [typingSpeed, delayAfterMessage]);

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      const cleanupTyping = startTyping(messages[currentMessageIndex]);
      return cleanupTyping;
    } else {
      // Todas as mensagens foram exibidas
      onComplete();
    }
  }, [currentMessageIndex, messages, onComplete, startTyping]);

  return (
    <div className="text-center mt-4 min-h-[6rem] flex flex-col justify-center items-center">
      <p 
        key={messageKey} // Usa a key para reiniciar a animação de fade
        className="text-lg text-green-400 font-mono animate-fade-in-out"
      >
        {displayedText}
        {isTyping && <span className="animate-pulse ml-1">|</span>}
      </p>
      <style>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translateY(10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-in-out {
          animation: fade-in-out ${typingSpeed * (messages[currentMessageIndex]?.length || 0) + delayAfterMessage}ms ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HackingMessages;