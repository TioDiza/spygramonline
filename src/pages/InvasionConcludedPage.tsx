import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ProfileData } from '../../types';
import ProfileCard from '../../components/ProfileCard';
import SparkleButton from '../../components/ui/SparkleButton';
import { BackgroundBeamsWithCollision } from '../components/ui/background-beams-with-collision';
import InteractionProfilesSection from '../components/InteractionProfilesSection';
import ScrollDownButton from '../components/ScrollDownButton'; // Importa o novo botão

const InvasionConcludedPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const profileData = location.state?.profileData as ProfileData | undefined;

  // Se não houver dados de perfil, redireciona para a página inicial
  if (!profileData) {
    navigate('/');
    return null;
  }

  // Função para rolar a página para baixo
  const handleScrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <BackgroundBeamsWithCollision className="min-h-screen">
      <div className="relative z-20 text-white font-sans flex flex-col items-center p-4 sm:p-8 overflow-hidden w-full">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text animate-fade-in">
          Invasão Concluída!
        </h1>
        <ProfileCard data={profileData} />
        
        {/* Nova seção de perfis de interação */}
        {profileData.topInteractions && profileData.topInteractions.length > 0 && (
          <InteractionProfilesSection profiles={profileData.topInteractions} />
        )}

        <div className="mt-10">
          <SparkleButton onClick={() => navigate('/')}>
            Nova Invasão
          </SparkleButton>
        </div>

        {/* Botão "Continue Lendo" */}
        <ScrollDownButton onClick={handleScrollDown} />
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default InvasionConcludedPage;