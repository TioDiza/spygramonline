import React from 'react';
import ChatMessage from './ChatMessage';

interface MockChatProps {
  otherProfilePic?: string; // Foto de perfil para o "outro" participante
}

const MockChat: React.FC<MockChatProps> = ({ otherProfilePic = 'https://picsum.photos/id/64/50/50' }) => {
  const mockMessages = [
    { id: '1', sender: 'other', text: 'Oi, saudade de você!', isBlurred: false, profilePic: otherProfilePic },
    { id: '2', sender: 'self', text: 'Também! Aquela noite foi...', isBlurred: true },
    { id: '3', sender: 'other', text: 'Sim! Mal posso esperar pra te ver de novo 😉', isBlurred: true, profilePic: otherProfilePic },
    { id: '4', sender: 'self', text: 'O que você está vestindo agora? 😏', isBlurred: true },
    { id: '5', sender: 'other', text: 'Você não faz ideia... 🔥', isBlurred: true, profilePic: otherProfilePic },
    { id: '6', sender: 'self', text: 'Me conta mais...', isBlurred: true },
    { id: '7', sender: 'other', text: 'Só se for pessoalmente 😉', isBlurred: false, profilePic: otherProfilePic },
    { id: '8', sender: 'self', text: 'Combinado! Quando?', isBlurred: false },
  ];

  return (
    <div className="w-full max-w-md h-[400px] bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 flex flex-col overflow-y-auto scrollbar-hide border border-gray-700 shadow-lg shadow-purple-500/10">
      {/* Simula o cabeçalho do chat */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-700">
        <div className="flex items-center">
          <img src={otherProfilePic} alt="Chat Partner" className="w-10 h-10 rounded-full mr-3" />
          <span className="font-semibold text-white">@alguem_especial</span>
        </div>
        <span className="text-xs text-gray-400">Online</span>
      </div>

      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {mockMessages.map((msg) => (
          <ChatMessage
            key={msg.id}
            sender={msg.sender}
            text={msg.text}
            isBlurred={msg.isBlurred}
            profilePic={msg.profilePic}
          />
        ))}
      </div>
    </div>
  );
};

export default MockChat;