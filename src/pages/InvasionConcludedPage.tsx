import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ProfileData } from '../../types';
import ProfileCard from '../../components/ProfileCard';
import SparkleButton from '../../components/ui/SparkleButton';
import { BackgroundBeamsWithCollision } from '../components/ui/background-beams-with-collision';
import InteractionProfilesSection from '../components/InteractionProfilesSection';
import ScrollHint from '../components/ScrollHint';
import JealousyMessage from '../components/JealousyMessage';
import IphoneMockup from '../components/IphoneMockup';

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
      imageFit: "cover" as const,
      isBlurred: true,
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
      <div className="relative z-20 text-white font-sans flex flex-col items-center p-4 sm:p-8 overflow-hidden w-full">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text animate-fade-in">
          Invasão Concluída!
        </h1>
        <ProfileCard data={profileData} />
        
        {profileData.topInteractions && profileData.topInteractions.length > 0 && (
          <InteractionProfilesSection profiles={profileData.topInteractions} />
        )}

        <JealousyMessage />

        <div className="mt-10">
          <SparkleButton onClick={() => navigate('/')}>
            Nova Invasão
          </SparkleButton>
        </div>

        <ScrollHint />

        <div className="mt-24 w-full max-w-6xl mx-auto text-center">
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
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default InvasionConcludedPage;