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

// Dados de fallback para usar quando a API falhar
const mockSuggestedProfiles: SuggestedProfile[] = [
  { username: 'reactjs', profile_pic_url: 'https://i.pravatar.cc/150?u=reactjs' },
  { username: 'tailwindcss', profile_pic_url: 'https://i.pravatar.cc/150?u=tailwindcss' },
  { username: 'neymarjr', profile_pic_url: 'https://i.pravatar.cc/150?u=neymarjr' },
  { username: 'nasa', profile_pic_url: 'https://i.pravatar.cc/150?u=nasa' },
  { username: 'spacex', profile_pic_url: 'https://i.pravatar.cc/150?u=spacex' },
  { username: 'microsoft', profile_pic_url: 'https://i.pravatar.cc/150?u=microsoft' },
];

const InvasionSimulationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const profileData = location.state?.profileData as ProfileData | undefined;
  
  const [stage, setStage] = useState<SimulationStage>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [suggestedProfiles, setSuggestedProfiles] = useState<SuggestedProfile[]>([]);
  const [isHacking, setIsHacking] = useState(true);

  // Efeito para iniciar o processo
  useEffect(() => {
    if (!profileData) {
      setErrorMessage('Nenhum dado de perfil encontrado. Redirecionando...');
      toast.error('Nenhum dado de perfil encontrado. Redirecionando...');
      setTimeout(() => navigate('/'), 3000);
      setStage('error');
      return;
    }

    // Inicia a busca pelos perfis sugeridos em segundo plano
    const getSuggestions = async () => {
      let suggestions = await fetchSuggestedProfiles(profileData.username);
      
      // Se a API falhar ou retornar uma lista vazia, usa os dados de fallback
      if (suggestions.length === 0) {
        console.warn('[InvasionSimulationPage] API de sugestões falhou. Usando dados de fallback.');
        suggestions = mockSuggestedProfiles;
      }

      setSuggestedProfiles(suggestions);
      // Quando a busca (bem-sucedida ou não) terminar, sinaliza para o simulador parar
      setIsHacking(false);
    };
    getSuggestions();

    // Inicia a simulação visual
    const timeout = setTimeout(() => {
      setStage('login_attempt');
    }, 1000);

    return () => clearTimeout(timeout);
  }, [profileData, navigate]);

  // Callback do simulador quando a animação de sucesso termina
  const handleLoginSuccess = useCallback(() => {
    setStage('success_card');
    toast.success(`Acesso concedido ao perfil @${profileData?.username}!`);
    
    // Em seguida, avança para o feed
    setTimeout(() => {
      setStage('feed_locked');
    }, 2000); // 2 segundos na tela de sucesso
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
                  isHacking={isHacking}
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