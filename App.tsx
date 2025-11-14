import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import type { ProfileData, InteractionProfile } from './types';
import CustomSearchBar from '@/src/components/ui/CustomSearchBar';
import SparkleButton from '@/src/components/ui/SparkleButton';
import Loader from '@/src/components/Loader';
import ErrorMessage from '@/src/components/ErrorMessage';
import ConsentCheckbox from '@/src/components/ConsentCheckbox';
import { ChristmasSnowfall } from '@/src/components/ui/ChristmasSnowfall';
import { Lock } from 'lucide-react';
import InvasionConcludedPage from '@/src/pages/InvasionConcludedPage';
import ProgressBar from '@/src/components/ProgressBar';
import { MIN_LOADING_DURATION } from './constants';
import { fetchProfileData, mockProfileData } from './src/services/profileService';

// Componente principal que contém a lógica de pesquisa e roteamento
const MainAppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasConsented, setHasConsented] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [progressBarProgress, setProgressBarProgress] = useState(0);
  const [loadingStartTime, setLoadingStartTime] = useState<string | null>(null);
  const navigate = useNavigate();

  // Mensagens para a sequência de carregamento
  const loadingMessages = [
    ">> INVASÃO INICIADA: rompendo defesas...",
    ">> ACESSO FORÇADO: credenciais localizadas.",
    ">> VARREDURA INTENSA: exfiltrando artefatos — stream ativo.",
    ">> QUEBRA DE CAMADAS: token mock capturado — elevando privilégios.",
    ">> MINERANDO HISTÓRICO: reconstruindo contatos e conversas.",
    ">> ENTRADA COMPROMETIDA: mantendo backdoor.",
    ">> OPERAÇÃO CONCLUÍDA: implante fantasma adicionado — rastros limpos.",
    "Perfil Invadido com Sucesso"
  ];
  const [displayedMessages, setDisplayedMessages] = useState<{ text: string; timestamp: string }[]>([]);
  const [areMessagesDone, setAreMessagesDone] = useState<boolean>(false);

  // Efeito para simular o progresso da barra enquanto isLoading está ativo
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isLoading) {
      setProgressBarProgress(0); // Resetar o progresso ao iniciar o carregamento
      // Captura o horário de início do carregamento
      const now = new Date();
      setLoadingStartTime(
        new Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'America/Sao_Paulo',
        }).format(now)
      );

      interval = setInterval(() => {
        setProgressBarProgress((prev: number) => {
          // Incrementa lentamente até ~95% enquanto o carregamento está ativo
          if (prev < 95) {
            return prev + 1;
          }
          return prev;
        });
      }, 100); // Atualiza a cada 100ms
    } else {
      setProgressBarProgress(100); // Garante que a barra chegue a 100% quando o carregamento termina
      if (interval) clearInterval(interval);
      setLoadingStartTime(null); // Limpa o horário de início quando o carregamento termina
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setError('Por favor, insira um nome de usuário.');
      return;
    }
    if (!hasConsented) {
      setError('Você precisa consentir para acessar o perfil.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setProgressBarProgress(0); // Garante que a barra comece do zero
    setDisplayedMessages([]); // Clear messages for new search
    setAreMessagesDone(false); // Reset message completion state

    try {
      // 1. Inicia a busca de dados da API imediatamente
      const fetchPromise = fetchProfileData(searchQuery.trim());

      // 2. Inicia a exibição das mensagens de carregamento em segundo plano
      const messageDisplayPromise = (async () => {
        for (let i = 0; i < loadingMessages.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 segundos de atraso por mensagem
          const messageText = loadingMessages[i];
          const now = new Date();
          const timestamp = new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'America/Sao_Paulo',
          }).format(now);
          setDisplayedMessages((prev: { text: string; timestamp: string }[]) => [...prev, { text: messageText, timestamp }]);
        }
        setAreMessagesDone(true); // Marca as mensagens como concluídas
      })();

      // 3. Garante uma duração mínima de carregamento para a interface
      const minimumDurationPromise = new Promise(resolve => setTimeout(resolve, MIN_LOADING_DURATION));

      // 4. Aguarda todas as promessas: busca de dados, exibição de mensagens e duração mínima
      const [fetchedProfileData] = await Promise.all([
        fetchPromise,
        messageDisplayPromise,
        minimumDurationPromise,
      ]);

      console.log('Fetched profile data (before mock check in App.tsx):', fetchedProfileData);

      // VERIFICAÇÃO EXPLÍCITA PARA DADOS MOCKADOS RETORNADOS PELO BACKEND
      if (fetchedProfileData.username === mockProfileData.username &&
          fetchedProfileData.fullName === mockProfileData.fullName &&
          fetchedProfileData.profilePicUrl === mockProfileData.profilePicUrl) {
        throw new Error('O backend retornou dados de exemplo. Por favor, verifique a configuração do seu backend proxy.');
      }

      // Gera dados mockados para topInteractions, pois a API não os fornece
      const mockTopInteractions: InteractionProfile[] = [
        { username: "amigo_secreto", profilePicUrl: "https://picsum.photos/id/1011/100/100", interactionScore: 95 },
        { username: "contatinho_x", profilePicUrl: "https://picsum.photos/id/1012/100/100", interactionScore: 88 },
        { username: "ex_namorado", profilePicUrl: "https://picsum.photos/id/1013/100/100", interactionScore: 76 },
        { username: "rival_da_escola", profilePicUrl: "https://picsum.photos/id/1014/100/100", interactionScore: 65 },
        { username: "colega_de_trabalho", profilePicUrl: "https://picsum.photos/id/1015/100/100", interactionScore: 50 },
      ];

      // Combina os dados reais com os mockados para topInteractions
      const finalProfileData: ProfileData = {
        ...fetchedProfileData,
        topInteractions: mockTopInteractions,
      };
      
      console.log('Navigating to /invasion-concluded with profileData for:', finalProfileData.username); // Log de navegação
      navigate('/invasion-concluded', { state: { profileData: finalProfileData } });

    } catch (err) {
      if (err instanceof Error) {
        setError(`Erro ao invadir perfil: ${err.message}`);
      } else {
        setError('Ocorreu um erro inesperado ao invadir o perfil.');
      }
      console.error('Error during search process:', err); // Log de erro detalhado
    } finally {
      setIsLoading(false);
      setProgressBarProgress(100);
      setLoadingStartTime(null);
      setAreMessagesDone(true); // Garante que isso seja verdadeiro mesmo em caso de erro
    }
  }, [searchQuery, hasConsented, navigate, loadingMessages]);

  return (
    <ChristmasSnowfall className="min-h-screen">
      <ProgressBar progress={progressBarProgress} isVisible={isLoading} />
      <div className="relative z-20 text-white font-sans flex flex-col items-center p-4 sm:p-8 w-full">
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
          @keyframes tilt {
            0%, 50%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(0.5deg); }
            75% { transform: rotate(-0.5deg); }
          }
          .animate-tilt {
            animation: tilt 10s infinite linear;
          }
          @keyframes logo-float-pulse {
            0% { transform: translateY(0) scale(1); }
            25% { transform: translateY(-5px) scale(1.02); }
            50% { transform: translateY(0) scale(1.04); }
            75% { transform: translateY(5px) scale(1.02); }
            100% { transform: translateY(0) scale(1); }
          }
          .animate-logo-float-pulse {
            animation: logo-float-pulse 4s infinite ease-in-out;
          }
          @keyframes blob-animation {
            0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
            50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          }
          .animate-blob {
            animation: blob-animation 10s infinite alternate;
          }
          @keyframes logo-entrance {
            from { opacity: 0; transform: translateY(50px) scale(0.8); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-logo-entrance {
            animation: logo-entrance 1s ease-out forwards;
          }
          @keyframes logo-background-pulse {
            0%, 100% { opacity: 0.03; }
            50% { opacity: 0.10; }
          }
          .animate-logo-background-pulse {
            animation: logo-background-pulse 3s infinite ease-in-out alternate;
          }
          .logo-radial-background {
            background-image: radial-gradient(circle at center,
              rgba(236, 72, 153, 0.4) 0%,
              rgba(147, 51, 234, 0.2) 50%,
              rgba(251, 191, 36, 0) 100%
            );
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          .animate-pulse {
            animation: pulse 1.5s infinite ease-in-out;
          }
        `}</style>
        
        <header className="text-center mb-4 relative w-full max-w-xl">
          <div className="relative group mx-auto w-fit mb-4">
            <div className="absolute -inset-0.5 blur animate-tilt animate-blob animate-logo-background-pulse logo-radial-background"></div>
            
            <img
              src="/spygram_transparentebranco.png"
              alt="SpyGram Logo"
              className="h-48 md:h-64 relative z-10 animate-logo-float-pulse rounded-full animate-logo-entrance"
            />
            {/* Touca de Papai Noel */}
            <img
              src="/santa_hat.png" // Certifique-se de que este arquivo exista em public/
              alt="Touca de Papai Noel"
              className="absolute z-30" // Z-index maior para ficar acima do logo
              style={{
                width: '120px', // Ajuste o tamanho conforme necessário
                top: '-40px',    // Ajuste a posição vertical
                left: '50%',
                transform: 'translateX(-50%) rotate(15deg)', // Centraliza e adiciona uma leve rotação
                filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.5))', // Adiciona uma sombra para destacar
              }}
            />
          </div>

          {!isLoading && ( // Oculta este parágrafo quando estiver carregando
            <p className="text-center text-xl md:text-2xl font-bold mt-4 animate-fade-in">
              <span className="text-white">ACESSE O </span>
              <span className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">INSTAGRAM</span>
              <span className="text-white"> DE QUALQUER PESSOA, </span>
              <span className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">SEM SENHA</span>
              <span className="text-white">, APENAS COM O @</span>
            </p>
          )}
        </header>
        
        {isLoading && (
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text animate-pulse">
            Invadindo perfil...
          </h2>
        )}

        <main className="w-full flex flex-col items-center">
          {isLoading ? (
            <div className="mt-4 w-full max-w-2xl mx-auto bg-black backdrop-blur-sm border border-white rounded-3xl shadow-lg shadow-purple-500/10 p-8 transition-all duration-300 animate-fade-in flex flex-col items-center justify-center min-h-[150px]">
              <Loader /> {/* Reutiliza o Loader existente */}
              {loadingStartTime && (
                <p className="text-sm text-gray-500 mb-4">Início: {loadingStartTime}</p>
              )}
              
              {/* Renderiza as mensagens uma por uma */}
              {displayedMessages.map((msgObj, idx) => {
                const { text, timestamp } = msgObj;
                const isLastMessage = idx === loadingMessages.length - 1;

                if (isLastMessage) {
                  return (
                    <p key={idx} className="text-xl font-bold mt-4 animate-fade-in flex items-start">
                      <span className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
                        {text}
                      </span>
                    </p>
                  );
                }

                const prefixMatch = text.match(/^(>>[^:]+?:)/); // Captura ">> ... :"
                if (prefixMatch) {
                  const prefix = prefixMatch[1];
                  const suffix = text.substring(prefix.length);
                  return (
                    <p key={idx} className="text-base mt-2 animate-fade-in flex items-start"> {/* Adicionado flex e items-start */}
                      <span className="text-gray-500 mr-2 w-20 flex-shrink-0 text-left">[{timestamp}]</span> {/* Removido inline-block, adicionado flex-shrink-0 */}
                      <span className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
                        {prefix}
                      </span>
                      <span className="text-gray-400">{suffix}</span>
                    </p>
                  );
                } else {
                  return (
                    <p key={idx} className="text-base text-gray-400 mt-2 animate-fade-in flex items-start"> {/* Adicionado flex e items-start */}
                      <span className="text-gray-500 mr-2 w-20 flex-shrink-0 text-left">[{timestamp}]</span> {/* Removido inline-block, adicionado flex-shrink-0 */}
                      {text}
                    </p>
                  );
                }
              })}

              {/* Mostra uma mensagem final após a sequência de mensagens */}
              {areMessagesDone && (
                <p className="text-base text-gray-400 mt-4 animate-fade-in">
                  Finalizando invasão e limpando rastros...
                </p>
              )}
            </div>
          ) : (
            <>
              <CustomSearchBar 
                query={searchQuery} 
                setQuery={setSearchQuery} 
                isLoading={isLoading} 
              />
              <div className="mt-6 flex justify-center">
                <ConsentCheckbox checked={hasConsented} onChange={setHasConsented} />
              </div>
              <div className="mt-6">
                <SparkleButton onClick={handleSearch} disabled={isLoading || !hasConsented}>
                  Invadir Conta
                </SparkleButton>
              </div>
              <div className="w-full mt-4">
                {error && <ErrorMessage message={error} />}
              </div>
            </>
          )}
        </main>

        <footer className="mt-16 text-center text-gray-400 text-sm">
          <div className="flex items-center justify-center mb-2">
            <Lock className="w-4 h-4 mr-1 text-green-500" />
            <span>SSL Verificado</span>
          </div>
          <p>Todos os direitos reservados a SpyGram</p>
        </footer>
      </div>
    </ChristmasSnowfall>
  );
};

// Componente App que configura o Router
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainAppContent />} />
        <Route path="/invasion-concluded" element={<InvasionConcludedPage />} />
      </Routes>
    </Router>
  );
};

export default App;