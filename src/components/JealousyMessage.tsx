import React, { useRef } from 'react';
import { HeartCrack, ChevronLeft, ChevronRight } from 'lucide-react';
import MockChat from './MockChat';

const JealousyMessage: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const mockChatData = [
    {
      id: 1,
      profilePic: 'https://picsum.photos/id/64/150/150',
      name: 'Alguém Especial',
      username: '@alguem_especial',
      followers: '1,2 mil',
      posts: 15,
      isFollowing: false,
      messages: [
        { id: '1', sender: 'other', text: 'Oi, saudade de você!', timestamp: '14:30', isBlurred: false },
        { id: '2', sender: 'self', text: 'Também! Aquela noite foi...', timestamp: '14:31', isBlurred: true },
        { id: '3', sender: 'other', text: 'Sim! Mal posso esperar pra te ver de novo 😉', timestamp: '14:32', isBlurred: true },
        { id: '4', sender: 'self', text: 'O que você está vestindo agora? 😏', timestamp: '14:33', isBlurred: true },
      ],
    },
    {
      id: 2,
      profilePic: 'https://picsum.photos/id/65/150/150',
      name: 'Contatinho Secreto',
      username: '@contatinho_secreto',
      followers: '987',
      posts: 5,
      isFollowing: false,
      messages: [
        { id: '1', sender: 'other', text: 'Chegou bem? Me avisa!', timestamp: '18:05', isBlurred: false },
        { id: '2', sender: 'self', text: 'Cheguei sim, mas já quero voltar pra você...', timestamp: '18:07', isBlurred: true },
        { id: '3', sender: 'other', text: 'Ah, é? O que você faria se eu estivesse aí agora?', timestamp: '18:08', isBlurred: true },
      ],
    },
    {
      id: 3,
      profilePic: 'https://picsum.photos/id/66/150/150',
      name: 'Amor Proibido',
      username: '@amor_proibido',
      followers: '2,5 mil',
      posts: 32,
      isFollowing: false,
      messages: [
        { id: '1', sender: 'other', text: 'Não consigo parar de pensar em você.', timestamp: '21:10', isBlurred: false },
        { id: '2', sender: 'self', text: 'Nem eu... Isso é loucura.', timestamp: '21:12', isBlurred: true },
        { id: '3', sender: 'other', text: 'Uma loucura boa, não acha?', timestamp: '21:13', isBlurred: true },
      ],
    },
    {
      id: 4,
      profilePic: 'https://picsum.photos/id/67/150/150',
      name: 'Meu Xodó',
      username: '@meu_xodo',
      followers: '5,1 mil',
      posts: 120,
      isFollowing: false,
      messages: [
        { id: '1', sender: 'other', text: 'Você me deixou sem palavras ontem.', timestamp: '09:00', isBlurred: false },
        { id: '2', sender: 'self', text: 'Ah é? Fico feliz em saber 😉', timestamp: '09:02', isBlurred: true },
        { id: '3', sender: 'other', text: 'Quero mais. Quando repetimos?', timestamp: '09:03', isBlurred: true },
      ],
    },
    {
      id: 5,
      profilePic: 'https://picsum.photos/id/68/150/150',
      name: 'Paixão Oculta',
      username: '@paixao_oculta',
      followers: '834',
      posts: 22,
      isFollowing: false,
      messages: [
        { id: '1', sender: 'other', text: 'Ainda pensando no nosso último encontro...', timestamp: '00:15', isBlurred: false },
        { id: '2', sender: 'self', text: 'Eu também. Foi inesquecível.', timestamp: '00:17', isBlurred: true },
        { id: '3', sender: 'other', text: 'O que você mais gostou?', timestamp: '00:18', isBlurred: true },
      ],
    },
  ];

  const scrollAmount = 280 + 16; // Largura do MockChat (280px) + space-x-4 (16px)

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
            <MockChat
              key={chat.id}
              otherProfilePic={chat.profilePic}
              name={chat.name}
              username={chat.username}
              followers={chat.followers}
              posts={chat.posts}
              isFollowing={chat.isFollowing}
              messages={chat.messages}
            />
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