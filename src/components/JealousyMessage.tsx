import React, { useRef } from 'react';
import { HeartCrack, ChevronLeft, ChevronRight } from 'lucide-react'; // Importa os ícones de seta
import MockChat from './MockChat';

const JealousyMessage: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref para o contêiner de rolagem

  const mockChatData = [
    {
      id: 1,
      profilePic: 'https://picsum.photos/id/64/50/50',
      username: '@alguem_especial',
      messages: [
        { id: '1', sender: 'other', text: 'Oi, saudade de você!', isBlurred: false },
        { id: '2', sender: 'self', text: 'Também! Aquela noite foi...', isBlurred: true },
        { id: '3', sender: 'other', text: 'Sim! Mal posso esperar pra te ver de novo 😉', isBlurred: true },
        { id: '4', sender: 'self', text: 'O que você está vestindo agora? 😏', isBlurred: true },
        { id: '5', sender: 'other', text: 'Você não faz ideia... 🔥', isBlurred: true },
        { id: '6', sender: 'self', text: 'Me conta mais...', isBlurred: true },
        { id: '7', sender: 'other', text: 'Só se for pessoalmente 😉', isBlurred: false },
        { id: '8', sender: 'self', text: 'Combinado! Quando?', isBlurred: false },
      ],
    },
    {
      id: 2,
      profilePic: 'https://picsum.photos/id/65/50/50',
      username: '@contatinho_secreto',
      messages: [
        { id: '1', sender: 'other', text: 'Chegou bem? Me avisa!', isBlurred: false },
        { id: '2', sender: 'self', text: 'Cheguei sim, mas já quero voltar pra você...', isBlurred: true },
        { id: '3', sender: 'other', text: 'Ah, é? O que você faria se eu estivesse aí agora?', isBlurred: true },
        { id: '4', sender: 'self', text: 'Você não tem ideia... 😏', isBlurred: true },
        { id: '5', sender: 'other', text: 'Me provoca assim que eu gosto!', isBlurred: true },
        { id: '6', sender: 'self', text: 'Ainda bem que ninguém vê isso...', isBlurred: false },
        { id: '7', sender: 'other', text: 'Nosso segredo 😉', isBlurred: false },
      ],
    },
    {
      id: 3,
      profilePic: 'https://picsum.photos/id/66/50/50',
      username: '@amor_proibido',
      messages: [
        { id: '1', sender: 'other', text: 'Não consigo parar de pensar em você.', isBlurred: false },
        { id: '2', sender: 'self', text: 'Nem eu... Isso é loucura.', isBlurred: true },
        { id: '3', sender: 'other', text: 'Uma loucura boa, não acha?', isBlurred: true },
        { id: '4', sender: 'self', text: 'Muito boa... Mas e se descobrirem?', isBlurred: true },
        { id: '5', sender: 'other', text: 'Ninguém precisa saber. Só nós dois.', isBlurred: true },
        { id: '6', sender: 'self', text: 'Promete?', isBlurred: false },
        { id: '7', sender: 'other', text: 'Prometo. E agora, o que você quer fazer?', isBlurred: false },
      ],
    },
    {
      id: 4,
      profilePic: 'https://picsum.photos/id/67/50/50',
      username: '@meu_xodo',
      messages: [
        { id: '1', sender: 'other', text: 'Você me deixou sem palavras ontem.', isBlurred: false },
        { id: '2', sender: 'self', text: 'Ah é? Fico feliz em saber 😉', isBlurred: true },
        { id: '3', sender: 'other', text: 'Quero mais. Quando repetimos?', isBlurred: true },
        { id: '4', sender: 'self', text: 'Quando você quiser. Tenho umas ideias...', isBlurred: true },
        { id: '5', sender: 'other', text: 'Me conta! Estou curiosa.', isBlurred: true },
        { id: '6', sender: 'self', text: 'Só pessoalmente. É melhor.', isBlurred: false },
        { id: '7', sender: 'other', text: 'Mal posso esperar!', isBlurred: false },
      ],
    },
    {
      id: 5,
      profilePic: 'https://picsum.photos/id/68/50/50',
      username: '@paixao_oculta',
      messages: [
        { id: '1', sender: 'other', text: 'Ainda pensando no nosso último encontro...', isBlurred: false },
        { id: '2', sender: 'self', text: 'Eu também. Foi inesquecível.', isBlurred: true },
        { id: '3', sender: 'other', text: 'O que você mais gostou?', isBlurred: true },
        { id: '4', sender: 'self', text: 'Tudo. Mas a parte que você...', isBlurred: true },
        { id: '5', sender: 'other', text: 'Shiii... Não fala. Só faz de novo.', isBlurred: true },
        { id: '6', sender: 'self', text: 'Com prazer. Quando?', isBlurred: false },
        { id: '7', sender: 'other', text: 'Hoje à noite? No mesmo lugar?', isBlurred: false },
      ],
    },
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
            <MockChat key={chat.id} otherProfilePic={chat.profilePic} username={chat.username} messages={chat.messages} />
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