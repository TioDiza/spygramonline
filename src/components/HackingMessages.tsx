import React, { useState, useEffect, useCallback } from 'react';

interface HackingMessagesProps {
  onComplete: () => void;
}

const HackingMessages: React.FC<HackingMessagesProps> = ({ onComplete }) => {
  const messages = [
    "Inicializando sessão segura...",
    "Sincronizando com os serviços do Instagram...",
    "Validando reCAPTCHA...",
    "Consultando identificador do perfil...",
    "Coletando seguidores e metadados...",
    "Obtendo dados de login...",
    "Normalizando dados...",
    "Finalizado...",
  ];

  const typingSpeed = 50; // ms por caractere
  const delayAfterMessage = 1000; // ms após a mensagem ser digitada antes de começar a próxima

  const [typedMessages, setTypedMessages] = useState<string[]>([]); // Armazena as mensagens completas
  const [currentTypingText, setCurrentTypingText] = useState(''); // Texto atualmente sendo digitado
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const startTypingEffect = useCallback((message: string) => {
    let charIndex = 0;
    setCurrentTypingText('');
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (charIndex < message.length) {
        setCurrentTypingText((prev) => prev + message[charIndex]);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        // Uma vez que a digitação de uma mensagem é completa, adicione-a às mensagens digitadas
        setTypedMessages((prev) => [...prev, message]);
        // Em seguida, passe para a próxima mensagem após um atraso
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
      const cleanupTyping = startTypingEffect(messages[currentMessageIndex]);
      return cleanupTyping;
    } else {
      // Todas as mensagens foram digitadas e adicionadas a typedMessages
      // Limpa o texto de digitação atual e chama onComplete
      setCurrentTypingText('');
      onComplete();
    }
  }, [currentMessageIndex, messages, onComplete, startTypingEffect]);

  return (
    <div className="text-center mt-4 min-h-[20rem] flex flex-col justify-start items-center space-y-2 bg-gray-800 border border-green-500 p-4 rounded-lg"> {/* Adicionado fundo e borda temporários */}
      {typedMessages.map((msg, index) => (
        <p key={index} className="text-lg text-green-400 font-mono animate-fade-in">
          {msg}
        </p>
      ))}
      {currentMessageIndex < messages.length && (
        <p className="text-lg text-green-400 font-mono min-h-[1.5rem]"> {/* Adicionado min-h para garantir espaço */}
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