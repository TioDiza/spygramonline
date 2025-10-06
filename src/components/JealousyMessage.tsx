import React, { useRef } from 'react';
import { HeartCrack, ChevronLeft, ChevronRight } from 'lucide-react'; // Importa os ícones de seta
import MockChat from './MockChat';

const JealousyMessage: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref para o contêiner de rolagem

  const mockChatData = [
    { id: 1, profilePic: 'https://picsum.photos/id/64/50/50', username: '@alguem_especial' },
    { id: 2, profilePic: 'https://picsum.photos/id/65/50/50', username: '@contatinho_secreto' },
    { id: 3, profilePic: 'https://picsum.photos/id/66/50/50', username: '@amor_proibido' },
    { id: 4, profilePic: 'https://picsum.photos/id/67/50/50', username: '@meu_xodo' },
    { id: 5, profilePic: 'https://picsum.photos/id/68/50/50', username: '@paixao_oculta' },
  ];

  // Calcula a quantidade de rolagem (largura do card + espaçamento)
  const scrollAmount = 320 + 16; // Largura do MockChat (320px) + space-x-4 (16px)

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-20 w-full text-center animate-fade-in">
      <HeartCrack className="w-20 h-20 text-red-600 mx-auto mb-8 animate-pulse" />
      <h2 className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-red-600 via-pink-700 to-purple-800 text-transparent bg-clip-text animate-fade-in">
        A VERDADE DÓI.
      </h2>
      <p className="text-2xl text-gray-300 font-medium mb-8">
        MENSAGENS RECUPERADAS PELO SPYGRAM
      </p>

      {/* Contêiner para o carrossel de chats e botões de navegação */}
      <div className="relative flex items-center justify-center w-full max-w-5xl mx-auto">
        <button
          onClick={handleScrollLeft}
          className="absolute left-0 z-10 p-2 bg-gray-800/70 rounded-full text-white hover:bg-gray-700/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <ChevronLeft size={32} />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex justify-start overflow-x-auto pb-4 px-4 space-x-4 scrollbar-hide w-full"
        >
          {mockChatData.map((chat) => (
            <MockChat key={chat.id} otherProfilePic={chat.profilePic} username={chat.username} />
          ))}
        </div>

        <button
          onClick={handleScrollRight}
          className="absolute right-0 z-10 p-2 bg-gray-800/70 rounded-full text-white hover:bg-gray-700/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

export default JealousyMessage;