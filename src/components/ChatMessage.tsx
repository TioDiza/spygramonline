import React from 'react';
import { cn } from '../lib/utils';

interface ChatMessageProps {
  sender: 'self' | 'other';
  text: string;
  timestamp: string;
  profilePic?: string;
  isBlurred?: boolean; // Reintroduzindo a propriedade isBlurred
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, text, timestamp, profilePic, isBlurred = false }) => {
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
            ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl rounded-br-none"
            : "bg-gray-700 text-gray-100 rounded-2xl rounded-bl-none", // Ajustado para um cinza mais escuro para o tema dark
          isBlurred && "blur-sm select-none" // Aplicando blur-sm
        )}
      >
        <p className="text-sm break-words">{text}</p>
        <span className={cn("text-[10px] mt-1", isSelf ? "text-blue-100 self-end" : "text-gray-400 self-start")}> {/* Ajustado cor do timestamp */}
          {timestamp}
        </span>
      </div>
      {isSelf && profilePic && (
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