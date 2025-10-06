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
        { id: '1', sender: 'other', text: 'aquela nossa noite não sai da minha cabeça...', timestamp: '23:15', isBlurred: false },
        { id: '2', sender: 'self', text: 'foi tudo perfeito, cada detalhe.', timestamp: '23:17', isBlurred: true },
        { id: '3', sender: 'other', text: 'precisamos fazer de novo, mas em um lugar que a gente possa fazer mais barulho ;)', timestamp: '23:18', isBlurred: true },
        { id: '4', sender: 'self', text: 'com certeza! tô livre amanhã a noite toda...', timestamp: '23:19', isBlurred: true },
        { id: '5', sender: 'other', text: 'me manda aquela foto que vc tirou depois? só pra eu lembrar do seu sorriso.', timestamp: '23:20', isBlurred: false },
      ],
    },
    {
      id: 2,
      profilePic: 'https://picsum.photos/id/65/150/150',
      username: 'contatinho_secreto',
      messages: [
        { id: '1', sender: 'other', text: 'acha que alguém desconfia?', timestamp: '18:05', isBlurred: false },
        { id: '2', sender: 'self', text: 'impossível. a gente disfarça bem demais.', timestamp: '18:07', isBlurred: true },
        { id: '3', sender: 'other', text: 'mas é isso que deixa tudo mais gostoso, né? o perigo.', timestamp: '18:08', isBlurred: true },
        { id: '4', sender: 'self', text: 'tô com saudade já. mesmo lugar amanhã?', timestamp: '18:10', isBlurred: true },
        { id: '5', sender: 'other', text: 'leva aquele "brinquedinho" que vc usou da última vez.', timestamp: '18:12', isBlurred: false },
      ],
    },
    {
      id: 3,
      profilePic: 'https://picsum.photos/id/66/150/150',
      username: 'amor_proibido',
      messages: [
        { id: '1', sender: 'other', text: 'ainda tô sentindo seu cheiro no meu travesseiro.', timestamp: '09:10', isBlurred: false },
        { id: '2', sender: 'self', text: 'e eu ainda sinto o gosto do seu beijo.', timestamp: '09:12', isBlurred: true },
        { id: '3', sender: 'other', text: 'não fala assim que eu largo tudo e vou aí agora.', timestamp: '09:13', isBlurred: true },
        { id: '4', sender: 'self', text: 'a porta tá sempre aberta pra você...', timestamp: '09:15', isBlurred: true },
        { id: '5', sender: 'other', text: 'só vem. e se prepara.', timestamp: '09:16', isBlurred: false },
      ],
    },
    {
      id: 4,
      profilePic: 'https://picsum.photos/id/67/150/150',
      username: 'meu_xodo',
      messages: [
        { id: '1', sender: 'other', text: 'sonhei com você de novo essa noite...', timestamp: '08:30', isBlurred: false },
        { id: '2', sender: 'self', text: 'coisa boa ou ruim? haha', timestamp: '08:32', isBlurred: true },
        { id: '3', sender: 'other', text: 'foi o melhor sonho da minha vida. pena que eu acordei.', timestamp: '08:33', isBlurred: true },
        { id: '4', sender: 'self', text: 'a gente pode continuar ele na vida real. casa livre hoje.', timestamp: '08:34', isBlurred: true },
        { id: '5', sender: 'other', text: 'entendeu o recado, né? te espero.', timestamp: '08:35', isBlurred: false },
      ],
    },
    {
      id: 5,
      profilePic: 'https://picsum.photos/id/68/150/150',
      username: 'paixao_oculta',
      messages: [
        { id: '1', sender: 'other', text: 'gostou do presente que eu deixei pra vc?', timestamp: '20:00', isBlurred: false },
        { id: '2', sender: 'self', text: 'eu AMEI. ficou perfeito em mim.', timestamp: '20:02', isBlurred: true },
        { id: '3', sender: 'other', text: 'imagino... pena que não tô aí pra ver pessoalmente.', timestamp: '20:03', isBlurred: true },
        { id: '4', sender: 'self', text: 'mas logo vc vai ver. e vai poder tirar com a boca.', timestamp: '20:04', isBlurred: true },
        { id: '5', sender: 'other', text: 'não demora. tô te esperando do jeito que vc gosta.', timestamp: '20:05', isBlurred: false },
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