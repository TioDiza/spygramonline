import React, { useRef } from 'react';
import { HeartCrack, ChevronLeft, ChevronRight, FileSearch } from 'lucide-react';
import MockChat from './MockChat';
import LockedFeatures from './LockedFeatures';

const JealousyMessage: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const mockChatData = [
    {
      id: 1,
      profilePic: 'https://picsum.photos/id/64/150/150',
      username: 'carol_santos_ofc', // Nome de usuário mais realista
      messages: [
        { id: '1', sender: 'other' as const, text: 'aquela nossa noite não sai da minha cabeça...', timestamp: '23:15', isBlurred: false },
        { id: '2', sender: 'self' as const, text: 'foi tudo perfeito, cada detalhe.', timestamp: '23:17', isBlurred: true },
        { id: '3', sender: 'other' as const, text: 'precisamos fazer de novo, mas em um lugar que a gente possa fazer mais barulho ;)', timestamp: '23:18', isBlurred: true },
        { id: '4', sender: 'self' as const, text: 'com certeza! tô livre amanhã a noite toda...', timestamp: '23:19', isBlurred: true },
        { id: '5', sender: 'other' as const, text: 'mal posso esperar pra te sentir de novo.', timestamp: '23:19', isBlurred: true },
        { id: '6', sender: 'self' as const, text: 'você sabe como me deixar sem fôlego.', timestamp: '23:20', isBlurred: true },
        { id: '7', sender: 'other' as const, text: 'e você sabe como me fazer querer mais. que delicia.', timestamp: '23:20', isBlurred: true },
        { id: '8', sender: 'self' as const, text: 'é um perigo a gente se encontrar.', timestamp: '23:21', isBlurred: true },
        { id: '9', sender: 'other' as const, text: 'um perigo que eu quero correr sempre, meu amor.', timestamp: '23:22', isBlurred: true },
        { id: '10', sender: 'other' as const, text: 'me manda aquela foto que vc tirou depois? só pra eu lembrar do seu sorriso.', timestamp: '23:25', isBlurred: true },
      ],
    },
    {
      id: 2,
      profilePic: 'https://picsum.photos/id/65/150/150',
      username: 'gui_fernandes_92', // Nome de usuário mais realista
      messages: [
        { id: '1', sender: 'other' as const, text: 'acha que alguém desconfia?', timestamp: '18:05', isBlurred: false },
        { id: '2', sender: 'self' as const, text: 'impossível. a gente disfarça bem demais.', timestamp: '18:07', isBlurred: true },
        { id: '3', sender: 'other' as const, text: 'mas é isso que deixa tudo mais gostoso, né? o perigo do nosso segredo.', timestamp: '18:08', isBlurred: true },
        { id: '4', sender: 'self' as const, text: 'tô com saudade já. mesmo lugar amanhã?', timestamp: '18:10', isBlurred: true },
        { id: '5', sender: 'other' as const, text: 'o jeito que você me olha... ninguém pode saber.', timestamp: '18:10', isBlurred: true },
        { id: '6', sender: 'self' as const, text: 'é o nosso segredo. e eu amo cada parte dele.', timestamp: '18:11', isBlurred: true },
        { id: '7', sender: 'other' as const, text: 'você é meu vício.', timestamp: '18:11', isBlurred: true },
        { id: '8', sender: 'self' as const, text: 'e você é o meu ponto fraco.', timestamp: '18:12', isBlurred: true },
        { id: '9', sender: 'other' as const, text: 'então se prepara pra amanhã.', timestamp: '18:12', isBlurred: true },
        { id: '10', sender: 'other' as const, text: 'leva aquele "brinquedinho" que vc usou da última vez.', timestamp: '18:15', isBlurred: true },
      ],
    },
    {
      id: 3,
      profilePic: 'https://picsum.photos/id/66/150/150',
      username: 'ana_clara_x', // Nome de usuário mais realista
      messages: [
        { id: '1', sender: 'other' as const, text: 'ainda tô sentindo seu cheiro no meu travesseiro.', timestamp: '09:10', isBlurred: false },
        { id: '2', sender: 'self' as const, text: 'e eu ainda sinto o gosto do seu beijo.', timestamp: '09:12', isBlurred: true },
        { id: '3', sender: 'other' as const, text: 'não fala assim que eu largo tudo e vou aí agora.', timestamp: '09:13', isBlurred: true },
        { id: '4', sender: 'self' as const, text: 'a porta tá sempre aberta pra você...', timestamp: '09:15', isBlurred: true },
        { id: '5', sender: 'other' as const, text: 'você não tem ideia do que eu faria pra estar aí.', timestamp: '09:15', isBlurred: true },
        { id: '6', sender: 'self' as const, text: 'me conta...', timestamp: '09:16', isBlurred: true },
        { id: '7', sender: 'other' as const, text: 'melhor eu te mostrar pessoalmente.', timestamp: '09:16', isBlurred: true },
        { id: '8', sender: 'self' as const, text: 'não me provoca assim.', timestamp: '09:17', isBlurred: true },
        { id: '9', sender: 'other' as const, text: 'é exatamente o que eu quero fazer.', timestamp: '09:18', isBlurred: true },
        { id: '10', sender: 'other' as const, text: 'só vem. e se prepara. foi uma delicia da ultima vez', timestamp: '09:20', isBlurred: true },
      ],
    },
    {
      id: 4,
      profilePic: 'https://picsum.photos/id/67/150/150',
      username: 'pedro_henrique_rj', // Nome de usuário mais realista
      messages: [
        { id: '1', sender: 'other' as const, text: 'sonhei com você de novo essa noite...', timestamp: '08:30', isBlurred: false },
        { id: '2', sender: 'self' as const, text: 'coisa boa ou ruim? haha', timestamp: '08:32', isBlurred: true },
        { id: '3', sender: 'other' as const, text: 'foi o melhor sonho da minha vida. pena que eu acordei.', timestamp: '08:33', isBlurred: true },
        { id: '4', sender: 'self' as const, text: 'a gente pode continuar ele na vida real. casa livre hoje.', timestamp: '08:34', isBlurred: true },
        { id: '5', sender: 'other' as const, text: 'meu corpo todo tá te pedindo.', timestamp: '08:34', isBlurred: true },
        { id: '6', sender: 'self' as const, text: 'e o meu tá esperando por você.', timestamp: '08:35', isBlurred: true },
        { id: '7', sender: 'other' as const, text: 'chego em 15 minutos.', timestamp: '08:35', isBlurred: true },
        { id: '8', sender: 'self' as const, text: 'a porta vai estar destrancada.', timestamp: '08:36', isBlurred: true },
        { id: '9', sender: 'other' as const, text: 'não vejo a hora de te ter de novo, amor.', timestamp: '08:37', isBlurred: true },
        { id: '10', sender: 'other' as const, text: 'entendeu o recado, né? te espero.', timestamp: '08:40', isBlurred: true },
      ],
    },
    {
      id: 5,
      profilePic: 'https://picsum.photos/id/68/150/150',
      username: 'julia_almeida_sp', // Nome de usuário mais realista
      messages: [
        { id: '1', sender: 'other' as const, text: 'gostou do presente que eu deixei pra vc?', timestamp: '20:00', isBlurred: false },
        { id: '2', sender: 'self' as const, text: 'eu AMEI. ficou perfeito em mim.', timestamp: '20:02', isBlurred: true },
        { id: '3', sender: 'other' as const, text: 'imagino... pena que não tô aí pra ver pessoalmente.', timestamp: '20:03', isBlurred: true },
        { id: '4', sender: 'self' as const, text: 'mas logo vc vai ver. e vai poder tirar com a boca. que delicia.', timestamp: '20:04', isBlurred: true },
        { id: '5', sender: 'other' as const, text: 'essa imagem não vai sair da minha cabeça.', timestamp: '20:04', isBlurred: true },
        { id: '6', sender: 'self' as const, text: 'é pra não sair mesmo.', timestamp: '20:05', isBlurred: true },
        { id: '7', sender: 'other' as const, text: 'você me enlouquece.', timestamp: '20:05', isBlurred: true },
        { id: '8', sender: 'self' as const, text: 'esse é o plano, meu amor.', timestamp: '20:06', isBlurred: true },
        { id: '9', sender: 'other' as const, text: 'está funcionando.', timestamp: '20:07', isBlurred: true },
        { id: '10', sender: 'other' as const, text: 'não demora. tô te esperando do jeito que vc gosta.', timestamp: '20:10', isBlurred: true },
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
        MENSAGENS SUSPEITAS RECUPERADAS DA LIXEIRA PELO SPYGRAM
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
              isBlurredProfile={true} // Adicionado para desfocar o perfil
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

      {/* Keyword Analysis Section */}
      <div className="mt-12 p-6 bg-gray-900/50 border border-red-500/50 rounded-xl max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-left">
        <FileSearch className="w-16 h-16 text-red-400 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Análise de Palavras-Chave</h3>
          <p className="text-gray-300">
            Nossa IA identificou palavras com teor suspeito. Termos como{' '}
            <span className="font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
              amor, delicia, saudade, segredo, perigo, beijo e corpo
            </span>
            {' '}foram mencionados <span className="font-bold text-white text-lg">12 vezes</span> nas conversas recuperadas.
          </p>
        </div>
      </div>

      {/* Locked Features Section */}
      <LockedFeatures />
    </div>
  );
};

export default JealousyMessage;