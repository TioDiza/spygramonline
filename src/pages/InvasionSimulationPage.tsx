import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ProfileData } from '../../types';
import InstagramLoginSimulator from '../components/InstagramLoginSimulator';
import InstagramFeedMockup from '../components/InstagramFeedMockup';
import InvasionSuccessCard from '../components/InvasionSuccessCard'; // New import
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { mockProfileData } from '../services/profileService';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Define os estados da simulação
type SimulationStage = 'loading' | 'login_attempt' | 'success_card' | 'feed_locked' | 'error';

const InvasionSimulationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const profileData = location.state?.profileData as ProfileData | undefined;
  
  const [stage, setStage] = useState<SimulationStage>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Verifica se os dados do perfil são os dados mockados
  const isMockData = profileData?.username === mockProfileData.username && 
                     profileData?.fullName === mockProfileData.fullName &&
                     profileData?.profilePicUrl === mockProfileData.profilePicUrl;

  useEffect(() => {
    if (!profileData) {
      setErrorMessage('Nenhum dado de perfil encontrado. Redirecionando...');
      toast.error('Nenhum dado de perfil encontrado. Redirecionando...');
      setTimeout(() => navigate('/'), 3000);
      setStage('error');
      return;
    }

    if (isMockData) {
      setErrorMessage('Aviso: Não foi possível obter dados reais. Exibindo simulação com dados de exemplo.');
      toast.error('Aviso: Não foi possível obter dados reais. Exibindo simulação com dados de exemplo.');
    }

    // Inicia a simulação de login após um breve carregamento
    const timeout = setTimeout(() => {
      setStage('login_attempt');
    }, 1000); // 1 segundo de 'loading' inicial

    return () => clearTimeout(timeout);
  }, [profileData, navigate, isMockData]);

  const handleLoginSuccess = () => {
    // 1. Transição para o card de sucesso
    setStage('success_card');
    toast.success(`Acesso concedido ao perfil @${profileData?.username}!`);

    // 2. Após 2 segundos, transição para o feed bloqueado
    setTimeout(() => {
      setStage('feed_locked');
    }, 2000);
  };

  if (!profileData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <ErrorMessage message={errorMessage || "Carregando..."} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center p-4 sm:p-8 w-full">
      <div className="w-full max-w-md mx-auto">
        {errorMessage && (
          <div className="mt-4 mb-8 bg-yellow-900/50 border border-yellow-500 text-yellow-300 px-4 py-3 rounded-lg text-center" role="alert">
            <p className="font-bold">Aviso</p>
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {stage === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md flex flex-col items-center justify-center min-h-[600px]"
          >
            <Loader />
            <h1 className="text-xl font-bold mt-4">Preparando Invasão...</h1>
          </motion.div>
        )}

        {stage === 'login_attempt' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <InstagramLoginSimulator 
              profileData={profileData} 
              onSuccess={handleLoginSuccess} 
            />
          </motion.div>
        )}
        
        {stage === 'success_card' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md flex flex-col items-center justify-center min-h-[600px]"
          >
            <InvasionSuccessCard profileData={profileData} />
          </motion.div>
        )}

        {stage === 'feed_locked' && (
          <motion.div
            key="feed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <InstagramFeedMockup profileData={profileData} />
            
            {/* O CTA Flutuante foi removido daqui */}
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvasionSimulationPage;