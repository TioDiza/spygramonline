import React, { useState, useEffect, useCallback } from 'react';

interface HackingMessagesProps {
  onComplete: () => void;
}

const HackingMessages: React.FC<HackingMessagesProps> = ({ onComplete }) => {
  const messages = [
    "Inicializando sessão segura...",
    "Conectando aos servidores do Instagram...",
    "Interceptando pacotes de dados...",
    "Analisando fluxo de informações...",
    "Quebrando criptografia de sessão...",
    "Obtendo dados de login...",
    "Extraindo informações do perfil...",
    "Normalizando dados para exibição...",
    "Processo concluído.",
  ];

  const typingSpeed = 50; // ms por caractere
  const delayAfterMessage = 1000; // ms após a mensagem ser digitada antes de começar a próxima

  const [typedMessages, setTypedMessages] = useState<string[]>([]);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const getBrasiliaTime = useCallback(() => {
    return new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  }, []);

  const startTypingEffect = useCallback((message: string) => {
    let charIndex = 0;
    setCurrentTypingText('');
    setIsTyping(true);
    const timestamp = getBrasiliaTime();
    const fullMessage = `[${timestamp}] ${message}`;

    const typingInterval = setInterval(() => {
      if (charIndex < fullMessage.length) {
        setCurrentTypingText((prev) => prev + fullMessage[charIndex]);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setTypedMessages((prev) => [...prev, fullMessage]);
        const nextMessageTimeout = setTimeout(() => {
          setCurrentMessageIndex((prev) => prev + 1);
        }, delayAfterMessage);
        return () => clearTimeout(nextMessageTimeout);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [typingSpeed, delayAfterMessage, getBrasiliaTime]);

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      const cleanupTyping = startTypingEffect(messages[currentMessageIndex]);
      return cleanupTyping;
    } else {
      setCurrentTypingText('');
      onComplete();
    }
  }, [currentMessageIndex, messages, onComplete, startTypingEffect]);

  return (
    <div className="text-center mt-4 min-h-[20rem] flex flex-col justify-start items-center space-y-2 bg-gray-800 border border-red-500 p-4 rounded-lg"> {/* Aumentado min-h e adicionado estilos temporários */}
      {typedMessages.map((msg, index) => (
        <p key={index} className="text-lg text-green-400 font-mono animate-fade-in">
          {msg}
        </p>
      ))}
      {currentMessageIndex < messages.length && (
        <p className="text-lg text-green-400 font-mono">
          {currentTypingText}
          {isTyping && <span className="animate-pulse ml-1">|</span>}
        </p>
      )}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HackingMessages;