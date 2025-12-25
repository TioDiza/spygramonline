import React from 'react';
import { MessageSquare, User, ShieldCheck } from 'lucide-react';
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
  const messages: ChatMessageProps[] = [
    { sender: 'user', message: 'O acesso é realmente vitalício?', time: '14:30' },
    { sender: 'admin', message: 'Sim! O acesso é permanente. Você paga uma única vez e tem acesso ao perfil invadido para sempre.', time: '14:31' },
    { sender: 'user', message: 'É seguro? Posso ser rastreado?', time: '14:32' },
    { sender: 'admin', message: 'Absolutamente seguro. Utilizamos criptografia de ponta e servidores proxy anônimos. Sua identidade é 100% protegida.', time: '14:33' },
    { sender: 'user', message: 'E se eu não gostar do que encontrar?', time: '14:34' },
    { sender: 'admin', message: 'Oferecemos uma garantia de 7 dias. Se não estiver satisfeito, basta solicitar o reembolso total.', time: '14:35' },
  ];

  return (
    <div className="mt-12 w-full max-w-md mx-auto">
      <div className="flex items-center justify-center gap-3 mb-6">
        <MessageSquare className="w-6 h-6 text-pink-500" />
        <h2 className="text-xl font-bold text-white">
          CHAT AO VIVO (FAQ)
        </h2>
      </div>
      
      <div className="bg-gray-900/70 border border-gray-700 rounded-xl p-4 h-[400px] overflow-y-auto flex flex-col">
        {messages.map((msg, index) => (
          <ChatMessage key={index} {...msg} />
        ))}
        
        {/* Mensagem de status do Admin */}
        <div className="text-center text-xs text-gray-500 mt-4">
          Admin SpyGram está digitando...
        </div>
      </div>
    </div>
  );
};

export default LiveChatFAQ;