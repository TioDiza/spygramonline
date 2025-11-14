import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ProfileData } from '../../types';
import ProfileCard from '../components/ProfileCard';
import InteractionProfilesSection from '../components/InteractionProfilesSection';
import ScrollHint from '../components/ScrollHint';
import JealousyMessage from '../components/JealousyMessage';
import IphoneMockup from '../components/IphoneMockup';
import { ShieldCheck, History, KeyRound, MapPin, Eye, Smartphone, AlertTriangle } from 'lucide-react';
import BenefitsCarousel from '../components/BenefitsCarousel';
import LiveChat from '../components/LiveChat';
import SparkleButton from '../components/ui/SparkleButton';
import FaqSection from '../components/FaqSection';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';
import { motion, AnimatePresence } from 'framer-motion';
import FinalCallToAction from '../components/FinalCallToAction';
import { mockProfileData } from '../services/profileService'; // Importa os dados mockados

const InvasionConcludedPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const profileData = location.state?.profileData as ProfileData | undefined;
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    console.log('InvasionConcludedPage mounted. Profile data received:', profileData?.username); // Log de montagem
    if (!profileData) {
      console.log('No profile data received, navigating back to home.'); // Log de redirecionamento
      navigate('/');
      return;
    }

    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50; // 50px buffer
      setShowScrollHint(!isAtBottom);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [profileData, navigate]); // Adicionado profileData e navigate às dependências

  const steps = [
    {
      stepNumber: 1,
      title: "Digite o Usuário",
      imageUrl: "/passo1.png",
      imageFit: "contain" as const,
      isBlurred: false,
      description: "Comece inserindo o @ do perfil que você deseja invadir no nosso campo de busca."
    },
    {
      stepNumber: 2,
      title: "Aguarde a Invasão",
      imageUrl: "/passo2.png",
      imageFit: "contain" as const,
      isBlurred: false,
      description: "Nossa ferramenta irá explorar vulnerabilidades para obter acesso total à conta."
    },
    {
      stepNumber: 3,
      title: "Acesse os Dados",
      imageUrl: "/passo3.png",
      imageFit: "contain" as const,
      isBlurred: false,
      description: "Veja mensagens, mídias apagadas, localização e muito mais, tudo de forma anônima."
    }
  ];

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Acesso Total",
      description: "Acesse todas as funções do Instagram como se fosse o dono da conta, de forma 100% anônima."
    },
    {
      icon: History,
      title: "Mensagens Apagadas",
      description: "Veja todas as mensagens, fotos e vídeos apagados de até um ano atrás."
    },
    {
      icon: KeyRound,
      title: "Recuperação de Conta",
      description: "Recupere perfis hackeados, perdidos ou com senha inválida em minutos."
    },
    {
      icon: MapPin,
      title: "Localização em Tempo Real",
      description: "Saiba exatamente onde a pessoa está através do GPS do celular."
    },
    {
      icon: Eye,
      title: "Mídias Ocultas",
      description: "Acesse fotos e vídeos privados, mesmo que o perfil seja trancado."
    },
    {
      icon: Smartphone,
      title: "Atividade Externa",
      description: "Monitore interações suspeitas em outros apps como WhatsApp e Tinder."
    }
  ];

  const [activeStep, setActiveStep] = useState(0);
  const currentStep = steps[activeStep];

  // Verifica se os dados do perfil são os dados mockados
  const isMockData = profileData?.username === mockProfileData.username && 
                     profileData?.fullName === mockProfileData.fullName &&
                     profileData?.profilePicUrl === mockProfileData.profilePicUrl;

  return (
    <>
      <div className="relative z-20 text-white font-sans flex flex-col items-center p-4 sm:p-8 w-full pb-24 pt-16 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text animate-fade-in">
          Invasão Concluída! <span className="text-gray-500 text-xl">(Acesso Parcial)</span>
        </h1>
        
        {isMockData && (
          <div className="mt-4 mb-8 bg-yellow-900/50 border border-yellow-500 text-yellow-300 px-4 py-3 rounded-lg text-center max-w-2xl mx-auto" role="alert">
            <p className="font-bold">Aviso: Dados de Exemplo</p>
            <p className="text-sm">Não foi possível obter os dados reais do perfil. Exibindo dados de exemplo. Por favor, verifique seu backend proxy no Render para garantir que ele está funcionando e retornando dados válidos.</p>
          </div>
        )}

        {profileData ? (
          <>
            <ProfileCard data={profileData} isPremiumLocked={false} />
            
            {profileData.topInteractions && profileData.topInteractions.length > 0 && (
              <InteractionProfilesSection profiles={profileData.topInteractions} isPremiumLocked={true} />
            )}
          </>
        ) : (
          <div className="text-center text-gray-400 mt-10">
            <p>Carregando dados do perfil ou redirecionando...</p>
          </div>
        )}

        <JealousyMessage />

        <div className="mt-12 flex justify-center">
            <SparkleButton onClick={() => alert('Redirecionando para a página de compra...')}>
              Desbloquear Acesso Total AGORA!
            </SparkleButton>
        </div>

        <AnimatePresence>
          {showScrollHint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ScrollHint />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-16 w-full max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
            Como Funciona o SpyGram?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Em apenas 3 passos simples você tem acesso total a <span className="font-bold text-white">QUALQUER</span> conta do Instagram.
          </p>
          
          <div className="flex justify-center items-center gap-4 mb-8">
            {steps.map((step, index) => (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStep(index)}
                className={`w-12 h-12 rounded-full text-xl font-bold transition-all duration-300
                  ${activeStep === index 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white scale-110 shadow-lg shadow-purple-500/30' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
              >
                {step.stepNumber}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center text-center">
            <IphoneMockup 
              stepNumber={currentStep.stepNumber} 
              title={currentStep.title}
              description={currentStep.description}
              imageUrl={currentStep.imageUrl}
              imageFit={currentStep.imageFit}
              isBlurred={currentStep.isBlurred}
            />
          </div>
        </div>

        <div className="mt-20 w-full max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
            Benefícios Exclusivos do SpyGram
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Tenha acesso a um arsenal de ferramentas para descobrir a verdade e proteger o que é seu.
          </p>

          <div className="flex justify-center">
            <BenefitsCarousel benefits={benefits} />
          </div>

          <div className="mt-16 p-6 bg-gray-900/50 border border-yellow-500/50 rounded-xl max-w-3xl mx-auto flex items-start gap-4 text-left">
            <AlertTriangle className="w-12 h-12 text-yellow-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Aviso Importante</h3>
              <p className="text-gray-300">
                Garantimos o completo anonimato de todos os nossos clientes. Contudo, o SpyGram é uma ferramenta de monitoramento e não nos responsabilizamos por nenhuma ação realizada dentro da conta acessada. Use com responsabilidade.
              </p>
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <SparkleButton onClick={() => alert('Redirecionando para a página de compra...')}>
              Quero Acesso a Todos Benefícios
            </SparkleButton>
          </div>
        </div>

        <div className="mt-20 w-full max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
            Ainda com Dúvidas?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Fale com nosso suporte em tempo real e veja o que outros clientes estão dizendo.
          </p>
          <LiveChat />
        </div>

        <div className="mt-20 w-full max-w-4xl mx-auto text-center p-8 bg-gray-900/50 border border-green-500/30 rounded-2xl">
          <div className="mx-auto mb-6 w-32 h-32 rounded-full border-4 border-green-500 bg-gray-800/50 flex flex-col items-center justify-center text-white">
            <ShieldCheck className="w-10 h-10 text-green-400 mb-1" />
            <span className="text-2xl font-bold">7 Dias</span>
            <span className="text-xs font-semibold">de Garantia</span>
          </div>
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
            Sua Satisfação ou Seu Dinheiro de Volta
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Você tem 7 dias para testar o SpyGram sem riscos. Se por qualquer motivo você não estiver satisfeito, basta nos enviar um e-mail e devolveremos 100% do seu investimento, sem perguntas.
          </p>
          <div className="mt-8 flex justify-center">
            <SparkleButton onClick={() => alert('Redirecionando para a página de compra...')}>
              Desbloquear Acesso Total Agora (Sem Risco)
            </SparkleButton>
          </div>
        </div>

        <FaqSection />

        <AnimatePresence>
          {!showScrollHint && <FinalCallToAction />}
        </AnimatePresence>
      </div>
      <FloatingWhatsAppButton />
    </>
  );
};

export default InvasionConcludedPage;