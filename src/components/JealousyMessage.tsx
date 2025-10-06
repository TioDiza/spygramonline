import React from 'react';
import { HeartCrack } from 'lucide-react';
import MockChat from './MockChat';

const JealousyMessage: React.FC = () => {
  const mockChatData = [
    { id: 1, profilePic: 'https://picsum.photos/id/64/50/50', username: '@alguem_especial' },
    { id: 2, profilePic: 'https://picsum.photos/id/65/50/50', username: '@contatinho_secreto' },
    { id: 3, profilePic: 'https://picsum.photos/id/66/50/50', username: '@amor_proibido' },
    { id: 4, profilePic: 'https://picsum.photos/id/67/50/50', username: '@meu_xodo' },
    { id: 5, profilePic: 'https://picsum.photos/id/68/50/50', username: '@paixao_oculta' },
  ];

  return (
    <div className="mt-20 w-full text-center animate-fade-in">
      <HeartCrack className="w-20 h-20 text-red-600 mx-auto mb-8 animate-pulse" />
      <h2 className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-red-600 via-pink-700 to-purple-800 text-transparent bg-clip-text animate-fade-in">
        A VERDADE DÓI.
      </h2>
      <p className="text-2xl text-gray-300 font-medium mb-8">
        MENSAGENS RECUPERADAS PELO SPYGRAM
      </p>
      {/* Container para os chats mockados com rolagem horizontal */}
      <div className="flex justify-start overflow-x-auto pb-4 px-4 space-x-4 scrollbar-hide">
        {mockChatData.map((chat) => (
          <MockChat key={chat.id} otherProfilePic={chat.profilePic} username={chat.username} />
        ))}
      </div>
    </div>
  );
};

export default JealousyMessage;