import React from 'react';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  sender: 'self' | 'other';
  text: string;
  isBlurred?: boolean;
}

interface MockChatProps {
  otherProfilePic?: string; // Foto de perfil para o "outro" participante
  username?: string; // Nome de usuário para o chat
  messages: Message[]; // Recebe as mensagens como prop
}

const MockChat: React.FC<MockChatProps> = ({ otherProfilePic = 'https://picsum.photos/id/64/50/50', username = '@alguem_especial', messages }) => {
  return (
    <div className="w-[320px] h-[400px] bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 flex flex-col overflow-y-auto scrollbar-hide border border-gray-700 shadow-lg shadow-purple-500/10 flex-shrink-0">
      {/* Simula o cabeçalho do chat */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-700">
        <div className="flex items-center">
          <img src={otherProfilePic} alt="Chat Partner" className="w-10 h-10 rounded-full mr-3" />
          <span className="font-semibold text-white">{username}</span>
        </div>
        <span className="text-xs text-gray-400">Online</span>
      </div>

      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            sender={msg.sender}
            text={msg.text}
            isBlurred={msg.isBlurred}
            profilePic={msg.sender === 'other' ? otherProfilePic : undefined} // Passa a foto apenas para o 'other'
          />
        ))}
      </div>
    </div>
  );
};

export default MockChat;