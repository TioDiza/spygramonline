import React from 'react';
import { cn } from '../lib/utils';

interface ChatMessageProps {
  sender: 'self' | 'other';
  text: string;
  timestamp: string; // Adicionado: timestamp da mensagem
  profilePic?: string; // Opcional para o remetente 'other'
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, text, timestamp, profilePic }) => {
  const isSelf = sender === 'self';

  return (
    <div className={cn("flex mb-2", isSelf ? "justify-end" : "justify-start")}>
      {!isSelf && profilePic && (
        <img
          src={profilePic}
          alt="Profile"
          className="w-7 h-7 rounded-full mr-2 self-end"
        />
      )}
      <div
        className={cn(
          "max-w-[70%] p-3 relative flex flex-col",
          isSelf
            ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl rounded-br-none" // Estilo Instagram para 'self'
            : "bg-gray-200 text-gray-900 rounded-2xl rounded-bl-none" // Estilo Instagram para 'other'
        )}
      >
        <p className="text-sm break-words">{text}</p>
        <span className={cn("text-[10px] mt-1", isSelf ? "text-blue-100 self-end" : "text-gray-500 self-start")}>
          {timestamp}
        </span>
      </div>
      {isSelf && profilePic && ( // Pode adicionar uma foto para o 'self' também, se desejar
        <img
          src={profilePic}
          alt="Profile"
          className="w-7 h-7 rounded-full ml-2 self-end"
        />
      )}
    </div>
  );
};

export default ChatMessage;