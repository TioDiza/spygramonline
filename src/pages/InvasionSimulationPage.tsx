import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ProfileData, SuggestedProfile } from '../../types';
import InstagramLoginSimulator from '../components/InstagramLoginSimulator';
import InvasionSuccessCard from '../components/InvasionSuccessCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import InstagramFeedMockup from '../components/InstagramFeedMockup';
import InstagramFeedContent from '../components/InstagramFeedContent';
import WebSidebar from '../components/WebSidebar';
import WebSuggestions from '../components/WebSuggestions';
import { getUserLocation, getNearbyCities } from '../services/geolocationService';

type SimulationStage = 'loading' | 'login_attempt' | 'success_card' | 'feed_locked' | 'error';

const InvasionSimulationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const profileData = location.state?.profileData as ProfileData | undefined;
  const apiSuggestedProfiles = location.state?.suggestedProfiles as SuggestedProfile[] | undefined;

  const [stage, setStage] = useState<SimulationStage>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isApiDataAvailable, setIsApiDataAvailable] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    const startSimulation = async () => {
      if (!profileData) {
        setErrorMessage('Nenhum dado de perfil encontrado. Redirecionando...');
        toast.error('Nenhum dado de perfil encontrado. Redirecionando...');
        setTimeout(() => navigate('/'), 3000);
        setStage('error');
        return;
      }

      // Busca a localização do usuário em paralelo com a tela de loading
      try {
        const locationData = await getUserLocation();
        console.log('📍 Cidade detectada por IP:', locationData.city); // Log para verificação
        const nearbyCities = getNearbyCities(locationData.city);
        console.log('🏙️ Lista de cidades para o feed:', nearbyCities); // Log para verificação
        setLocations(nearbyCities);
      } catch (e) {
        // Define cidades padrão em caso de falha na API de geolocalização
        const fallbackCities = getNearbyCities('São Paulo');
        console.log('⚠️ Falha na detecção de IP. Usando cidades de fallback:', fallbackCities); // Log para verificação
        setLocations(fallbackCities);
      }

      if (apiSuggestedProfiles && apiSuggestedProfiles.length > 0) {
        setIsApiDataAvailable(true);
      } else {
        setIsApiDataAvailable(false);
      }

      // Inicia a simulação visual
      const timeout = setTimeout(() => {
        setStage('login_attempt');
      }, 1000);

      return () => clearTimeout(timeout);
    };

    startSimulation();
  }, [profileData, apiSuggestedProfiles, navigate]);

  const handleLoginSuccess = useCallback(() => {
    setStage('success_card');
    toast.success(`Acesso concedido ao perfil @${profileData?.username}!`);
    
    setTimeout(() => {
      setStage('feed_locked');
    }, 2000);
  }, [profileData?.username]);

  if (!profileData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <ErrorMessage message={errorMessage || "Carregando..."} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black md:bg-[#121212] text-white font-sans w-full">
      <AnimatePresence mode="wait">
        {stage !== 'feed_locked' && (
          <div className="flex items-center justify-center min-h-screen">
            {stage === 'loading' && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Loader />
                <h1 className="text-xl font-bold mt-4 text-center">Preparando Invasão...</h1>
              </motion.div>
            )}
            {stage === 'login_attempt' && (
              <motion.div key="login" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-md">
                <InstagramLoginSimulator 
                  profileData={profileData} 
                  onSuccess={handleLoginSuccess}
                />
              </motion.div>
            )}
            {stage === 'success_card' && (
              <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-md">
                <InvasionSuccessCard profileData={profileData} />
              </motion.div>
            )}
          </div>
        )}

        {stage === 'feed_locked' && (
          <motion.div
            key="feed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="block md:hidden">
              <InstagramFeedMockup 
                profileData={profileData} 
                suggestedProfiles={apiSuggestedProfiles || []} 
                isApiDataAvailable={isApiDataAvailable} 
                locations={locations}
              />
            </div>

            <div className="hidden md:flex w-full justify-center">
              <WebSidebar profileData={profileData} />
              <main className="w-full max-w-[630px] border-x border-gray-800 md:ml-64">
                <InstagramFeedContent 
                  profileData={profileData} 
                  suggestedProfiles={apiSuggestedProfiles || []} 
                  isApiDataAvailable={isApiDataAvailable} 
                  locations={locations}
                />
              </main>
              <WebSuggestions profileData={profileData} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvasionSimulationPage;