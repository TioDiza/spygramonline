import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ProfileData } from '../../types';
import ProfileCard from '../../components/ProfileCard';
import { BackgroundBeamsWithCollision } from '../components/ui/background-beams-with-collision';
import InteractionProfilesSection from '../components/InteractionProfilesSection';
import ScrollHint from '../components/ScrollHint';
import JealousyMessage from '../components/JealousyMessage';
import IphoneMockup from '../components/IphoneMockup';
import { ShieldCheck, History, KeyRound, MapPin, Eye, Smartphone, AlertTriangle } from 'lucide-react';
import BenefitsCarousel from '../components/BenefitsCarousel';
import LiveChat from '../components/LiveChat';
import SparkleButton from '../../components/ui/SparkleButton';

const InvasionConcludedPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const profileData = location.state?.profileData as ProfileData | undefined;

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

  if (!profileData) {
    navigate('/');
    return null;
  }

  return (
    <BackgroundBeamsWithCollision className="min-h-screen">
      <div className="relative z-20 text-white font-sans flex flex-col items-center p-4 sm:p-8 overflow-hidden w-full">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text animate-fade-in">
          Invasão Concluída!
        </h1>
        <ProfileCard data={profileData} />
        
        {profileData.topInteractions && profileData.topInteractions.length > 0 && (
          <InteractionProfilesSection profiles={profileData.topInteractions} />
        )}

        <JealousyMessage />

        <ScrollHint />

        <div className="mt-16 w-full max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
            Como Funciona?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Em apenas 3 passos simples você tem acesso total a qualquer conta do Instagram.
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
          <div className="mt-12 flex justify-center">
            <SparkleButton onClick={() => alert('Redirecionando para a página de compra...')}>
              Ver a Verdade em 3 Passos
            </SparkleButton>
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
          <div className="mt-12 flex justify-center">
            <SparkleButton onClick={() => alert('Redirecionando para a página de compra...')}>
              Desbloquear Acesso Total Agora
            </SparkleButton>
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default InvasionConcludedPage;