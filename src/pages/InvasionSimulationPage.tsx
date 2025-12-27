import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ProfileData, SuggestedProfile, FeedPost } from '../../types';
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
import { getUserLocation, getCitiesByState } from '../services/geolocationService';
import LockedFeatureModal from '../components/LockedFeatureModal';
import { useAuth } from '../context/AuthContext';
import { MOCK_SUGGESTION_NAMES } from '../../constants';
import { fetchFullInvasionData } from '../services/profileService';

type SimulationStage = 'loading' | 'login_attempt' | 'success_card' | 'feed_locked' | 'error';

// Mock de posts para garantir que o feed não fique vazio se a API falhar
const MOCK_POSTS: FeedPost[] = [
  {
    de_usuario: { username: 'mock_user_1', full_name: 'Mock User 1', profile_pic_url: '/perfil.jpg' },
    post: { id: 'mock1', image_url: '/perfil.jpg', is_video: false, caption: 'Conteúdo bloqueado. Acesso Premium Requerido.', like_count: 123, comment_count: 45 }
  },
  {
    de_usuario: { username: 'mock_user_2', full_name: 'Mock User 2', profile_pic_url: '/perfil.jpg' },
    post: { id: 'mock2', image_url: '/perfil.jpg', is_video: false, caption: 'Conteúdo bloqueado. Acesso Premium Requerido.', like_count: 456, comment_count: 78 }
  },
  {
    de_usuario: { username: 'mock_user_3', full_name: 'Mock User 3', profile_pic_url: '/perfil.jpg' },
    post: { id: 'mock3', image_url: '/perfil.jpg', is_video: false, caption: 'Conteúdo bloqueado. Acesso Premium Requerido.', like_count: 789, comment_count: 12 }
  },
];

const InvasionSimulationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth(); // Importa a função login

  const [profileData, setProfileData] = useState<ProfileData | undefined>();
  const [suggestedProfiles, setSuggestedProfiles] = useState<SuggestedProfile[]>([]);
  const [posts, setPosts] = useState<FeedPost[]>(MOCK_POSTS); // Inicializa com MOCK_POSTS

  const [stage, setStage] = useState<SimulationStage>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [locations, setLocations] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFeatureName, setModalFeatureName] = useState('');

  useEffect(() => {
    const loadAllDataAndProceed = async () => {
      let data;
      // 1. Obter dados básicos do perfil
      if (location.state?.profileData) {
        data = location.state;
      } else {
        const storedData = sessionStorage.getItem('invasionData');
        data = storedData ? JSON.parse(storedData) : null;
      }

      if (!data?.profileData) {
        setErrorMessage('Nenhum dado de perfil encontrado. Redirecionando...');
        toast.error('Nenhum dado de perfil encontrado. Redirecionando...');
        setTimeout(() => navigate('/'), 3000);
        setStage('error');
        return;
      }

      setProfileData(data.profileData);

      let userCity = 'São Paulo'; // Default fallback
      // 2. Buscar localizações
      try {
        const locationData = await getUserLocation();
        const stateCities = getCitiesByState(locationData.city, locationData.state);
        setLocations(stateCities);
        userCity = locationData.city; // Captura a cidade real
      } catch (e) {
        const fallbackCities = getCitiesByState('São Paulo', 'São Paulo');
        setLocations(fallbackCities);
      }

      // 3. Buscar dados completos (sugestões e posts) se necessário
      const hasFullData = (data.suggestedProfiles && data.suggestedProfiles.length > 0) || (data.posts && data.posts.length > 0);
      let fullData = { ...data };

      if (!hasFullData) {
        const { suggestions, posts: fetchedPosts } = await fetchFullInvasionData(data.profileData.username);
        
        // Se a API retornar dados, use-os
        if (fetchedPosts.length > 0) {
          fullData.posts = fetchedPosts;
        } else {
          // Se a API retornar vazio, use mocks para preencher o feed
          console.log("API não retornou posts, usando fallback.");
          fullData.posts = MOCK_POSTS; 
        }

        if (suggestions.length > 0) {
          fullData.suggestedProfiles = suggestions;
        } else {
          // Se a API retornar vazio, use mocks para preencher stories
          console.log("API não retornou sugestões, usando fallback.");
          const shuffledNames = [...MOCK_SUGGESTION_NAMES].sort(() => 0.5 - Math.random());
          const mockSuggestions: SuggestedProfile[] = shuffledNames.slice(0, 15).map(name => ({
            username: name,
            profile_pic_url: '/perfil.jpg',
          }));
          fullData.suggestedProfiles = mockSuggestions;
        }
      }
      
      // 4. Atualizar estado e sessionStorage
      setSuggestedProfiles(fullData.suggestedProfiles || []);
      setPosts(fullData.posts || MOCK_POSTS); // Garante que posts não seja undefined
      
      // Armazena todos os dados, incluindo a cidade do usuário
      const dataToStore = {
        profileData: fullData.profileData,
        suggestedProfiles: fullData.suggestedProfiles,
        posts: fullData.posts,
        userCity: userCity, // Armazena a cidade
      };
      sessionStorage.setItem('invasionData', JSON.stringify(dataToStore));

      // 5. Transição para o próximo estágio (sem delay, direto para login ou feed)
      if (isLoggedIn) {
        setStage('feed_locked');
      } else {
        setStage('login_attempt');
      }
    };

    if (stage === 'loading') {
      loadAllDataAndProceed();
    }
  }, [location.state, navigate, stage, isLoggedIn]);

  const handleLoginSuccess = useCallback(() => {
    login(); // Define o usuário como logado no contexto
    setStage('success_card');
    toast.success(`Acesso concedido ao perfil @${profileData?.username}!`);
    
    setTimeout(() => {
      setStage('feed_locked');
    }, 2000);
  }, [profileData?.username, login]);

  const handleLockedFeatureClick = useCallback((featureName: string) => {
    setModalFeatureName(featureName);
    setIsModalOpen(true);
  }, []);

  const closeModal = () => setIsModalOpen(false);

  if (!profileData || stage === 'loading') {
    // Se ainda estiver no estágio 'loading' ou sem profileData, mostra o Loader
    if (errorMessage) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <ErrorMessage message={errorMessage} />
        </div>
      );
    }
    // Mantém o Loader como fallback enquanto os dados estão sendo carregados
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black md:bg-[#121212] text-white font-sans w-full">
      <LockedFeatureModal
        isOpen={isModalOpen}
        onClose={closeModal}
        featureName={modalFeatureName}
      />
      
      {stage === 'feed_locked' ? (
        <div className="w-full">
          <div className="block md:hidden">
            <InstagramFeedMockup 
              profileData={profileData} 
              suggestedProfiles={suggestedProfiles} 
              posts={posts}
              locations={locations}
              onLockedFeatureClick={handleLockedFeatureClick}
            />
          </div>
          <div className="hidden md:flex w-full justify-center">
            <WebSidebar profileData={profileData} onLockedFeatureClick={handleLockedFeatureClick} />
            <main className="w-full max-w-[630px] border-x border-gray-800 md:ml-64">
              <InstagramFeedContent 
                profileData={profileData} 
                suggestedProfiles={suggestedProfiles} 
                posts={posts}
                locations={locations}
                onLockedFeatureClick={handleLockedFeatureClick}
              />
            </main>
            <WebSuggestions profileData={profileData} onLockedFeatureClick={handleLockedFeatureClick} />
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <div className="flex items-center justify-center min-h-screen">
            {/* Removida a renderização explícita do estágio 'loading' */}
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
        </AnimatePresence>
      )}
    </div>
  );
};

export default InvasionSimulationPage;