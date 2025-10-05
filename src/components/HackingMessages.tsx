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
    console.log(`HackingMessages: Iniciando digitação para a mensagem: "${message}"`);

    const typingInterval = setInterval(() => {
      if (charIndex < message.length) {
        setCurrentTypingText((prev) => prev + message[charIndex]);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setTypedMessages((prev) => [...prev, message]);
        console.log(`HackingMessages: Digitação finalizada para a mensagem: "${message}"`);
        const nextMessageTimeout = setTimeout(() => {
          setCurrentMessageIndex((prev) => prev + 1);
        }, delayAfterMessage);
        return () => clearTimeout(nextMessageTimeout);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [typingSpeed, delayAfterMessage]);

  useEffect(() => {
    console.log('HackingMessages: useEffect disparado. currentMessageIndex:', currentMessageIndex);
    if (currentMessageIndex < messages.length) {
      const cleanupTyping = startTypingEffect(messages[currentMessageIndex]);
      return cleanupTyping;
    } else {
      console.log('HackingMessages: Sequência de mensagens completa. Chamando onComplete.');
      setCurrentTypingText('');
      onComplete();
    }
  }, [currentMessageIndex, messages, onComplete, startTypingEffect]);

  return (
    <div className="text-center mt-4 min-h-[12rem] flex flex-col justify-start items-center space-y-2 border border-red-500"> {/* Adicionada borda temporária para depuração */}
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