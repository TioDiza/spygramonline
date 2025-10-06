import React from 'react';
import { cn } from '../lib/utils';

interface ChatMessageProps {
  sender: 'self' | 'other';
  text: string;
  timestamp: string;
  username?: string;
  isBlurred?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, text, timestamp, username, isBlurred = false }) => {
  const isSelf = sender === 'self';

  // Gera uma cor consistente para cada nome de usuário
  const userColors = [
    'text-pink-400', 'text-purple-400', 'text-yellow-400', 'text-green-400', 'text-blue-400', 'text-red-400'
  ];
  const colorIndex = username ? username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % userColors.length : 0;
  const usernameColor = userColors[colorIndex];

  return (
    <div className={cn("flex flex-col mb-2", isSelf ? "items-end" : "items-start")}>
      <div className={cn("flex items-end gap-2", isSelf ? "flex-row-reverse" : "flex-row")}>
        <div
          className={cn(
            "max-w-[70%] px-3 py-2 relative flex flex-col",
            isSelf
              ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl rounded-br-none"
              : "bg-gray-700 text-gray-100 rounded-2xl rounded-bl-none",
            isBlurred && "blur-sm select-none"
          )}
        >
          {!isSelf && username && (
            <p className={cn("text-xs font-bold mb-1", username === 'Admin SpyGram' ? 'text-green-400' : usernameColor)}>
              {username}
            </p>
          )}
          <p className="text-sm break-words text-left">{text}</p>
          <span className={cn("text-[10px] mt-1", isSelf ? "text-blue-100 self-end" : "text-gray-400 self-start")}>
            {timestamp}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;