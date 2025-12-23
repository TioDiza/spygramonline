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
import { fetchSuggestedProfiles } from '../services/profileService';

type SimulationStage = 'loading' | 'login_attempt' | 'success_card' | 'feed_locked' | 'error';

const InvasionSimulationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const profileData = location.state?.profileData as ProfileData | undefined;
  
  const [stage, setStage] = useState<SimulationStage>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [suggestedProfiles, setSuggestedProfiles] = useState<SuggestedProfile[]>([]);

  // Estados para sincronizar a animação e a chamada da API
  const [suggestionsLoaded, setSuggestionsLoaded] = useState(false);
  const [passwordSimulationComplete, setPasswordSimulationComplete] = useState(false);

  // Efeito para iniciar o processo
  useEffect(() => {
    if (!profileData) {
      setErrorMessage('Nenhum dado de perfil encontrado. Redirecionando...');
      toast.error('Nenhum dado de perfil encontrado. Redirecionando...');
      setTimeout(() => navigate('/'), 3000);
      setStage('error');
      return;
    }

    // Inicia a busca pelos perfis sugeridos imediatamente
    const getSuggestions = async () => {
      try {
        const suggestions = await fetchSuggestedProfiles(profileData.username);
        setSuggestedProfiles(suggestions);
      } catch (error) {
        console.error("Falha ao buscar sugestões, continuando sem elas.", error);
      } finally {
        setSuggestionsLoaded(true);
      }
    };
    getSuggestions();

    // Inicia a simulação visual após um breve atraso
    const timeout = setTimeout(() => {
      setStage('login_attempt');
    }, 1000);

    return () => clearTimeout(timeout);
  }, [profileData, navigate]);

  // Função chamada pelo simulador quando sua animação termina
  const handlePasswordSimulationSuccess = useCallback(() => {
    setPasswordSimulationComplete(true);
  }, []);

  // Efeito que aguarda as duas condições serem verdadeiras
  useEffect(() => {
    if (suggestionsLoaded && passwordSimulationComplete) {
      // Ambos terminaram, avança para a tela de sucesso
      setStage('success_card');
      toast.success(`Acesso concedido ao perfil @${profileData?.username}!`);
      
      // Em seguida, avança para o feed
      setTimeout(() => {
        setStage('feed_locked');
      }, 2000); // 2 segundos na tela de sucesso
    }
  }, [suggestionsLoaded, passwordSimulationComplete, profileData?.username, navigate]);

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
                <InstagramLoginSimulator profileData={profileData} onSuccess={handlePasswordSimulationSuccess} />
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
            {/* Mobile View */}
            <div className="block md:hidden">
              <InstagramFeedMockup profileData={profileData} suggestedProfiles={suggestedProfiles} />
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex w-full justify-center">
              <WebSidebar profileData={profileData} />
              <main className="w-full max-w-[630px] border-x border-gray-800 md:ml-64">
                <InstagramFeedContent profileData={profileData} suggestedProfiles={suggestedProfiles} />
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