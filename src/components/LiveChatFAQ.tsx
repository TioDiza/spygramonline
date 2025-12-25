import React, { useRef, useEffect } from 'react';
import { MessageSquare, User, ShieldCheck, Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  sender: 'user' | 'admin';
  message: string;
  time: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, message, time }) => {
  const isUser = sender === 'user';
  
  const bubbleClasses = isUser
    ? 'bg-purple-600 text-white rounded-br-none self-end'
    : 'bg-gray-700 text-white rounded-tl-none self-start';
  
  const avatar = isUser 
    ? <User className="w-4 h-4 text-white" />
    : <ShieldCheck className="w-4 h-4 text-green-400" />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col max-w-[85%] mb-3 ${isUser ? 'items-end' : 'items-start'}`}
    >
      <div className={`flex items-center text-xs mb-1 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center border border-gray-600 mx-2">
          {avatar}
        </div>
        <span className="text-gray-400 font-semibold">
          {isUser ? 'Você' : 'Admin SpyGram'}
        </span>
      </div>
      <div className={`px-4 py-2 rounded-xl text-sm shadow-md ${bubbleClasses}`}>
        {message}
      </div>
      <span className="text-xs text-gray-500 mt-1 mx-2">{time}</span>
    </motion.div>
  );
};

const LiveChatFAQ: React.FC = () => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  const messages: ChatMessageProps[] = [
    { sender: 'user', message: 'O acesso é realmente vitalício?', time: '14:30' },
    { sender: 'admin', message: 'Sim! O acesso é permanente. Você paga uma única vez e tem acesso ao perfil invadido para sempre.', time: '14:31' },
    { sender: 'user', message: 'É seguro? Posso ser rastreado?', time: '14:32' },
    { sender: 'admin', message: 'Absolutamente seguro. Utilizamos criptografia de ponta e servidores proxy anônimos. Sua identidade é 100% protegida.', time: '14:33' },
    { sender: 'user', message: 'E se eu não gostar do que encontrar?', time: '14:34' },
    { sender: 'admin', message: 'Oferecemos uma garantia de 7 dias. Se não estiver satisfeito, basta solicitar o reembolso total.', time: '14:35' },
  ];

  const commonQuestions = [
    'Aceita PIX?',
    'É seguro comprar?',
    'O acesso é imediato?',
  ];

  // Efeito para rolar automaticamente para o final do chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Função simulada para lidar com o clique nas perguntas
  const handleQuestionClick = (question: string) => {
    // Simula o envio da pergunta e a resposta do admin
    console.log(`Pergunta simulada: ${question}`);
    // Aqui você poderia adicionar lógica para simular a resposta, mas por enquanto, apenas logamos.
  };

  return (
    <div className="mt-12 w-full max-w-md mx-auto">
      <div className="flex items-center justify-center gap-3 mb-6">
        <MessageSquare className="w-6 h-6 text-pink-500" />
        <h2 className="text-xl font-bold text-white">
          CHAT AO VIVO (FAQ)
        </h2>
      </div>
      
      {/* Área de Mensagens */}
      <div className="bg-gray-900/70 border border-gray-700 rounded-xl p-4 h-[400px] overflow-y-auto flex flex-col">
        {messages.map((msg, index) => (
          <ChatMessage key={index} {...msg} />
        ))}
        
        {/* Mensagem de status do Admin */}
        <div className="text-center text-xs text-gray-500 mt-4">
          Admin SpyGram está digitando...
        </div>
        
        {/* Ponto de rolagem automática */}
        <div ref={chatEndRef} />
      </div>

      {/* Campo de Digitação Simulada */}
      <div className="mt-4 p-3 bg-gray-900/70 border border-gray-700 rounded-xl flex items-center">
        <input
          type="text"
          placeholder="Digite sua pergunta..."
          className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
          readOnly // Mantido como readOnly para simulação
        />
        <button className="ml-3 p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors cursor-pointer">
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Perguntas Frequentes (Botões) */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {commonQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => handleQuestionClick(question)}
            className="px-3 py-1 text-xs font-medium text-gray-300 bg-gray-800 border border-gray-700 rounded-full hover:bg-gray-700 transition-colors"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LiveChatFAQ;