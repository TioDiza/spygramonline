import React, { useRef } from 'react';
import { HeartCrack, ChevronLeft, ChevronRight } from 'lucide-react';
import MockChat from './MockChat';

const JealousyMessage: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const mockChatData = [
    {
      id: 1,
      profilePic: 'https://picsum.photos/id/64/150/150',
      username: 'alguem_especial',
      messages: [
        { id: '1', sender: 'other', text: 'Não consigo parar de pensar em ontem...', timestamp: '23:15', isBlurred: false },
        { id: '2', sender: 'self', text: 'Nem eu. Ninguém pode sonhar com o que a gente fez.', timestamp: '23:17', isBlurred: true },
        { id: '3', sender: 'other', text: 'Nosso segredo 😉 Quando repetimos a dose?', timestamp: '23:18', isBlurred: true },
        { id: '4', sender: 'self', text: 'O mais rápido possível. Me manda aquela foto de novo?', timestamp: '23:20', isBlurred: true },
      ],
    },
    {
      id: 2,
      profilePic: 'https://picsum.photos/id/65/150/150',
      username: 'contatinho_secreto',
      messages: [
        { id: '1', sender: 'other', text: 'Ele(a) desconfia de alguma coisa?', timestamp: '18:05', isBlurred: false },
        { id: '2', sender: 'self', text: 'Acho que não. Mas o risco deixa tudo mais gostoso.', timestamp: '18:07', isBlurred: true },
        { id: '3', sender: 'other', text: 'Com certeza. Cada segundo com você vale a pena.', timestamp: '18:08', isBlurred: true },
        { id: '4', sender: 'self', text: 'Preciso te ver. Mesmo que seja escondido.', timestamp: '18:10', isBlurred: true },
      ],
    },
    {
      id: 3,
      profilePic: 'https://picsum.photos/id/66/150/150',
      username: 'amor_proibido',
      messages: [
        { id: '1', sender: 'other', text: 'Ainda tô com o seu cheiro em mim.', timestamp: '09:10', isBlurred: false },
        { id: '2', sender: 'self', text: 'E eu ainda sinto o gosto do seu beijo.', timestamp: '09:12', isBlurred: true },
        { id: '3', sender: 'other', text: 'Não provoca... senão eu apareço aí agora.', timestamp: '09:13', isBlurred: true },
        { id: '4', sender: 'self', text: 'Será que eu quero que você venha? 😏', timestamp: '09:15', isBlurred: true },
      ],
    },
    {
      id: 4,
      profilePic: 'https://picsum.photos/id/67/150/150',
      username: 'meu_xodo',
      messages: [
        { id: '1', sender: 'other', text: 'Sonhei com você essa noite...', timestamp: '08:30', isBlurred: false },
        { id: '2', sender: 'self', text: 'Espero que tenha sido um sonho bom... e quente.', timestamp: '08:32', isBlurred: true },
        { id: '3', sender: 'other', text: 'Foi mais que bom. Pena que não era de verdade.', timestamp: '08:33', isBlurred: true },
        { id: '4', sender: 'self', text: 'A gente pode resolver isso. Sozinho(a) em casa hoje?', timestamp: '08:35', isBlurred: true },
      ],
    },
    {
      id: 5,
      profilePic: 'https://picsum.photos/id/68/150/150',
      username: 'paixao_oculta',
      messages: [
        { id: '1', sender: 'other', text: 'Recebeu meu presente?', timestamp: '20:00', isBlurred: false },
        { id: '2', sender: 'self', text: 'Recebi. Adorei a lingerie. Pena que não tenho pra quem usar...', timestamp: '20:02', isBlurred: true },
        { id: '3', sender: 'other', text: 'Ainda não... mas logo você vai ter. E eu quero ver.', timestamp: '20:03', isBlurred: true },
        { id: '4', sender: 'self', text: 'Estou esperando. Não demora.', timestamp: '20:05', isBlurred: true },
      ],
    },
  ];

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
              username={chat.username}
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