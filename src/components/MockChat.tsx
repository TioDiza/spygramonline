import React from 'react';
import { Phone, Video, Smile, Camera, Mic, Image, ChevronLeft, UserPlus } from 'lucide-react';
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
  name: string;
  username: string;
  followers: string;
  posts: number;
  isFollowing: boolean;
  messages: Message[];
}

const MockChat: React.FC<MockChatProps> = ({
  otherProfilePic = 'https://picsum.photos/id/64/50/50',
  name,
  username,
  followers,
  posts,
  isFollowing,
  messages,
}) => {
  return (
    <div className="w-[280px] h-[550px] bg-black rounded-2xl p-0 flex flex-col overflow-hidden border border-gray-800 shadow-lg shadow-purple-500/10 flex-shrink-0">
      {/* Cabeçalho do Chat */}
      <div className="flex items-center justify-between p-3 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <ChevronLeft className="w-6 h-6 text-white" />
          <img src={otherProfilePic} alt="Chat Partner" className="w-8 h-8 rounded-full" />
          <div>
            <span className="font-semibold text-white text-sm">{name} 🕵️‍♂️</span>
            <p className="text-xs text-gray-400">{username.replace('@', '')}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <UserPlus className="w-6 h-6 text-white" />
          <Phone className="w-6 h-6 text-white" />
          <Video className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Corpo (Perfil + Mensagens) */}
      <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col">
        {/* Seção de Perfil */}
        <div className="flex flex-col items-center text-center text-white pt-8 pb-4 px-4 border-b border-gray-800 mb-4">
          <img src={otherProfilePic} className="w-24 h-24 rounded-full mb-4" alt={name} />
          <h2 className="font-bold text-xl">{name} 🕵️‍♂️</h2>
          <p className="text-sm text-gray-400 mb-2">{username}</p>
          <p className="text-sm text-gray-400">
            {followers} seguidores • {posts} posts
          </p>
          {!isFollowing && <p className="text-sm text-gray-500 mt-1">Vocês não se seguem no Instagram</p>}
          <p className="text-sm text-gray-400 mt-1">Nova conta do Instagram</p>
          <button className="mt-4 bg-gray-700 text-white text-sm font-semibold py-1.5 px-4 rounded-lg hover:bg-gray-600">
            Ver perfil
          </button>
        </div>

        {/* Mensagens */}
        <div className="px-3">
          {messages.map((msg) => (
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
      </div>

      {/* Rodapé (Campo de Mensagem) */}
      <div className="p-3 border-t border-gray-800 flex-shrink-0">
        <div className="bg-gray-800 rounded-full flex items-center px-2 py-1">
          <button className="bg-blue-500 hover:bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
            <Camera className="w-4 h-4 text-white" />
          </button>
          <input
            type="text"
            placeholder="Mensagem..."
            className="bg-transparent outline-none border-none text-white text-sm flex-1 mx-2"
            disabled
          />
          <div className="flex items-center space-x-3 pr-1"> {/* Espaçamento ajustado */}
            <Mic className="w-5 h-5 text-white cursor-pointer" /> {/* Dimensão corrigida */}
            <Image className="w-5 h-5 text-white cursor-pointer" /> {/* Dimensão corrigida */}
            <Smile className="w-5 h-5 text-white cursor-pointer" /> {/* Dimensão corrigida */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockChat;