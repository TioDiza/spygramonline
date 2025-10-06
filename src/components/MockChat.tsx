import React from 'react';
import { Phone, Video, Info, Smile, Camera, Mic, Image, Send } from 'lucide-react'; // Importa novos ícones
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  sender: 'self' | 'other';
  text: string;
  timestamp: string; // Adicionado: timestamp da mensagem
}

interface MockChatProps {
  otherProfilePic?: string; // Foto de perfil para o "outro" participante
  username?: string; // Nome de usuário para o chat
  messages: Message[]; // Recebe as mensagens como prop
}

const MockChat: React.FC<MockChatProps> = ({ otherProfilePic = 'https://picsum.photos/id/64/50/50', username = '@alguem_especial', messages }) => {
  return (
    <div className="w-[280px] h-[550px] bg-gray-900 rounded-2xl p-0 flex flex-col overflow-hidden border border-gray-700 shadow-lg shadow-purple-500/10 flex-shrink-0"> {/* Largura e altura ajustadas para proporção de celular */}
      {/* Cabeçalho do chat estilo Instagram */}
      <div className="flex items-center justify-between p-3 border-b border-gray-800 bg-gray-800">
        <div className="flex items-center">
          <img src={otherProfilePic} alt="Chat Partner" className="w-9 h-9 rounded-full mr-3" />
          <div>
            <span className="font-semibold text-white text-sm">{username}</span>
            <p className="text-xs text-gray-400">Online agora</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Phone className="w-5 h-5 text-white cursor-pointer hover:text-gray-300" />
          <Video className="w-5 h-5 text-white cursor-pointer hover:text-gray-300" />
          <Info className="w-5 h-5 text-white cursor-pointer hover:text-gray-300" />
        </div>
      </div>

      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-3">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            sender={msg.sender}
            text={msg.text}
            timestamp={msg.timestamp} // Passa o timestamp
            profilePic={msg.sender === 'other' ? otherProfilePic : undefined}
          />
        ))}
      </div>

      {/* Campo de entrada de mensagem mockado estilo Instagram */}
      <div className="p-3 border-t border-gray-800 bg-gray-800 flex items-center space-x-2">
        <div className="flex items-center bg-gray-700 rounded-full px-3 py-2 flex-1">
          <Smile className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Mensagem..."
            className="bg-transparent outline-none border-none text-white text-sm flex-1"
            disabled
          />
          <Camera className="w-5 h-5 text-gray-400 ml-2" />
          <Image className="w-5 h-5 text-gray-400 ml-2" />
          <Mic className="w-5 h-5 text-gray-400 ml-2" />
        </div>
        <Send className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-400" />
      </div>
    </div>
  );
};

export default MockChat;