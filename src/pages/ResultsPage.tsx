import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ProfileData } from '../../types';
import ProfileCard from '../components/ProfileCard'; // Caminho corrigido
import SparkleButton from '../components/ui/SparkleButton'; // Caminho corrigido
import { BackgroundBeamsWithCollision } from '../components/ui/background-beams-with-collision';

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const profileData = location.state?.profileData as ProfileData | undefined;

  if (!profileData) {
    // Se não houver dados de perfil, redireciona para a página inicial
    navigate('/');
    return null;
  }

  return (
    <BackgroundBeamsWithCollision className="min-h-screen">
      <div className="relative z-20 text-white font-sans flex flex-col items-center p-4 sm:p-8 overflow-hidden w-full">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text animate-fade-in">
          Perfil Encontrado!
        </h1>
        <ProfileCard data={profileData} />
        <div className="mt-10">
          <SparkleButton onClick={() => navigate('/')}>
            Nova Pesquisa
          </SparkleButton>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default ResultsPage;