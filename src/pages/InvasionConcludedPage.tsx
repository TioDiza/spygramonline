import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ProfileData } from '../../types';
import ProfileCard from '../../components/ProfileCard';
import SparkleButton from '../../components/ui/SparkleButton';
import { BackgroundBeamsWithCollision } from '../components/ui/background-beams-with-collision';
import InteractionProfilesSection from '../components/InteractionProfilesSection';
import ScrollHint from '../components/ScrollHint';
import JealousyMessage from '../components/JealousyMessage';
import IphoneMockup from '../components/IphoneMockup';
import { Search, Loader2, UserCheck } from 'lucide-react';

const InvasionConcludedPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const profileData = location.state?.profileData as ProfileData | undefined;

  // Se não houver dados de perfil, redireciona para a página inicial
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
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Em apenas 3 passos simples você tem acesso total a qualquer conta do Instagram.
          </p>
          <div className="flex flex-col lg:flex-row justify-center items-start gap-12">
            <IphoneMockup stepNumber={1} title="Digite o Usuário">
              <Search className="w-24 h-24 text-purple-400" />
              <p className="text-lg font-medium">
                Comece inserindo o @ do perfil que você deseja invadir no nosso campo de busca.
              </p>
            </IphoneMockup>
            <IphoneMockup stepNumber={2} title="Aguarde a Invasão">
              <Loader2 className="w-24 h-24 text-purple-400 animate-spin" />
              <p className="text-lg font-medium">
                Nossa ferramenta irá explorar vulnerabilidades para obter acesso total à conta.
              </p>
            </IphoneMockup>
            <IphoneMockup stepNumber={3} title="Acesse os Dados">
              <UserCheck className="w-24 h-24 text-purple-400" />
              <p className="text-lg font-medium">
                Veja mensagens, mídias apagadas, localização e muito mais, tudo de forma anônima.
              </p>
            </IphoneMockup>
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default InvasionConcludedPage;