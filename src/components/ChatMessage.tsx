import React from 'react';
import { cn } from '../lib/utils';

interface ChatMessageProps {
  sender: 'self' | 'other';
  text: string;
  isBlurred?: boolean;
  profilePic?: string; // Opcional para o remetente 'other'
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, text, isBlurred = false, profilePic }) => {
  const isSelf = sender === 'self';

  return (
    <div className={cn("flex mb-4", isSelf ? "justify-end" : "justify-start")}>
      {!isSelf && profilePic && (
        <img
          src={profilePic}
          alt="Profile"
          className="w-8 h-8 rounded-full mr-2 self-end"
        />
      )}
      <div
        className={cn(
          "max-w-[70%] p-3 rounded-xl relative",
          isSelf
            ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-br-none"
            : "bg-gray-700 text-gray-100 rounded-bl-none",
          isBlurred && "blur-md select-none" // Aplica blur e impede seleção de texto
        )}
      >
        <p className="text-sm">{text}</p>
      </div>
      {isSelf && profilePic && ( // Pode adicionar uma foto para o 'self' também, se desejar
        <img
          src={profilePic}
          alt="Profile"
          className="w-8 h-8 rounded-full ml-2 self-end"
        />
      )}
    </div>
  );
};

export default ChatMessage;