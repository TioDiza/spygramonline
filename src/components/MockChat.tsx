import React from 'react';
import { Phone, Video, Info, Smile, Camera, Mic, Image, ChevronLeft } from 'lucide-react';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  sender: 'self' | 'other';
  text: string;
  timestamp: string;
  isBlurred?: boolean;
}

interface MockChatProps {
  otherProfilePic?: string;
  username: string;
  messages: Message[];
}

const MockChat: React.FC<MockChatProps> = ({
  otherProfilePic = 'https://picsum.photos/id/64/50/50',
  username,
  messages,
}) => {
  return (
    <div className="w-[320px] h-[640px] bg-black rounded-2xl p-0 flex flex-col overflow-hidden border border-gray-800 shadow-lg shadow-purple-500/10 flex-shrink-0">
      {/* Cabeçalho do Chat */}
      <div className="flex items-center justify-between p-3 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <ChevronLeft className="w-6 h-6 text-white" />
          <img src={otherProfilePic} alt="Chat Partner" className="w-8 h-8 rounded-full" />
          <div>
            <span className="font-semibold text-white text-sm">{username}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Phone className="w-5 h-5 text-white" />
          <Video className="w-5 h-5 text-white" />
          <Info className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Corpo (Apenas Mensagens) */}
      <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col p-3">
        {messages.map((msg: Message) => (
          <ChatMessage
            key={msg.id}
            sender={msg.sender}
            text={msg.text}
            timestamp={msg.timestamp}
            profilePic={msg.sender === 'other' ? otherProfilePic : undefined}
            isBlurred={msg.isBlurred}
          />
        ))}
      </div>

      {/* Rodapé (Campo de Mensagem) */}
      <div className="p-3 border-t border-gray-800 flex-shrink-0">
        <div className="bg-gray-800 rounded-full flex items-center px-3 py-2">
          <Smile className="w-6 h-6 text-white cursor-pointer" />
          <input
            type="text"
            placeholder="Mensagem..."
            className="bg-transparent outline-none border-none text-white text-sm flex-1 mx-2"
            disabled
          />
          <div className="flex items-center space-x-3">
            <Mic className="w-6 h-6 text-white cursor-pointer" />
            <Image className="w-6 h-6 text-white cursor-pointer" />
            <Camera className="w-6 h-6 text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockChat;