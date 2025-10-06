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

  const [activeStep, setActiveStep] = useState(0);
  const currentStep = steps[activeStep];

  if (!profileData) {
    navigate('/');
    return null;
  }

  return (
    <BackgroundBeamsWithCollision className="min-h-screen">
      <style>{`
        .benefit-card {
          width: 320px;
          height: 220px;
          background: rgba(30, 30, 30, 0.7);
          border: 1px solid #444;
          border-radius: 1rem;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
          transition: all 0.3s ease-out;
          backdrop-filter: blur(5px);
          text-align: left;
        }

        .benefit-card:hover {
          transform: translateY(-10px) rotateY(3deg) scale(1.03);
          border-color: #C13584;
          box-shadow: 0 10px 30px rgba(193, 53, 132, 0.2);
        }
      `}</style>
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
        </div>

        <div className="mt-20 w-full max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
            Benefícios Exclusivos do SpyGram
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Tenha acesso a um arsenal de ferramentas para descobrir a verdade e proteger o que é seu.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="benefit-card">
              <ShieldCheck className="w-10 h-10 text-purple-400 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-white">Acesso Total</h3>
                <p className="text-gray-400 text-sm">Acesse todas as funções do Instagram como se fosse o dono da conta, de forma 100% anônima.</p>
              </div>
            </div>
            <div className="benefit-card">
              <History className="w-10 h-10 text-purple-400 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-white">Mensagens Apagadas</h3>
                <p className="text-gray-400 text-sm">Veja todas as mensagens, fotos e vídeos apagados de até um ano atrás.</p>
              </div>
            </div>
            <div className="benefit-card">
              <KeyRound className="w-10 h-10 text-purple-400 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-white">Recuperação de Conta</h3>
                <p className="text-gray-400 text-sm">Recupere perfis hackeados, perdidos ou com senha inválida em minutos.</p>
              </div>
            </div>
            <div className="benefit-card">
              <MapPin className="w-10 h-10 text-purple-400 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-white">Localização em Tempo Real</h3>
                <p className="text-gray-400 text-sm">Saiba exatamente onde a pessoa está através do GPS do celular.</p>
              </div>
            </div>
            <div className="benefit-card">
              <Eye className="w-10 h-10 text-purple-400 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-white">Mídias Ocultas</h3>
                <p className="text-gray-400 text-sm">Acesse fotos e vídeos privados, mesmo que o perfil seja trancado.</p>
              </div>
            </div>
            <div className="benefit-card">
              <Smartphone className="w-10 h-10 text-purple-400 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-white">Atividade Externa</h3>
                <p className="text-gray-400 text-sm">Monitore interações suspeitas em outros apps como WhatsApp e Tinder.</p>
              </div>
            </div>
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
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default InvasionConcludedPage;