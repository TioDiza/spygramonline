import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  sender: 'self' | 'other';
  text: string;
  timestamp: string;
  username?: string;
  isBlurred?: boolean;
  profilePic?: string; // Adicionado: A prop profilePic
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, text, timestamp, username, isBlurred = false, profilePic }) => {
  const isSelf = sender === 'self';

  // Gera uma cor consistente para cada nome de usuário
  const userColors = [
    'text-pink-400', 'text-purple-400', 'text-yellow-400', 'text-green-400', 'text-blue-400', 'text-red-400'
  ];
  const colorIndex = username ? username.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) % userColors.length : 0;
  const usernameColor = userColors[colorIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex flex-col mb-1.5", isSelf ? "items-end" : "items-start")}
    >
      <div className={cn("flex items-end gap-1.5", isSelf ? "flex-row-reverse" : "flex-row")}>
        {/* Renderiza a foto de perfil se for uma mensagem de 'other' e profilePic estiver disponível */}
        {!isSelf && profilePic && (
          <img src={profilePic} alt="Profile" className="w-6 h-6 rounded-full object-cover" />
        )}
        <div
          className={cn(
            "max-w-[75%] px-2.5 py-1.5 relative flex flex-col",
            isSelf
              ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl rounded-br-sm"
              : "bg-gray-700 text-gray-100 rounded-xl rounded-bl-sm",
            isBlurred && "blur-sm select-none"
          )}
        >
          {!isSelf && username && (
            <p className={cn("text-[11px] font-bold mb-0.5", username === 'Admin SpyGram' ? 'text-green-400' : usernameColor)}>
              {username}
            </p>
          )}
          <p className="text-xs break-words text-left">{text}</p>
          <span className={cn("text-[9px] mt-1", isSelf ? "text-blue-100 self-end" : "text-gray-400 self-start")}>
            {timestamp}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;