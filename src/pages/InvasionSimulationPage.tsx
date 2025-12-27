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
  const [posts, setPosts] = useState<FeedPost[] | undefined>();

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

      const targetProfileData = data.profileData;
      setProfileData(targetProfileData);

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
      let fetchedSuggestions: SuggestedProfile[] = data.suggestedProfiles || [];
      let fetchedPosts: FeedPost[] = data.posts || [];

      // Só busca na API se os dados estiverem faltando ou se for a primeira vez (posts e suggestions vazios)
      if (fetchedSuggestions.length === 0 || fetchedPosts.length === 0) {
        const { suggestions, posts: apiPosts } = await fetchFullInvasionData(targetProfileData.username);
        
        // Se a API retornou posts, usamos eles. Caso contrário, mantemos o que já tínhamos (que pode ser vazio).
        if (apiPosts.length > 0) {
            fetchedPosts = apiPosts;
        }
        // Se a API retornou sugestões, usamos elas.
        if (suggestions.length > 0) {
            fetchedSuggestions = suggestions;
        }
      }
      
      // Fallback: Se os posts ainda estiverem vazios, usa mocks
      if (fetchedPosts.length === 0) {
          console.log("Posts vazios após fetch/session, usando fallback MOCK_POSTS.");
          fetchedPosts = MOCK_POSTS;
      }
      
      // Fallback: Se as sugestões ainda estiverem vazias, usa mocks
      if (fetchedSuggestions.length === 0) {
          console.log("Sugestões vazias após fetch/session, usando fallback mocks.");
          const shuffledNames = [...MOCK_SUGGESTION_NAMES].sort(() => 0.5 - Math.random());
          fetchedSuggestions = shuffledNames.slice(0, 15).map(name => ({
            username: name,
            profile_pic_url: '/perfil.jpg',
          }));
      }
      
      // 4. Atualizar estado e sessionStorage
      // Garante que os posts do usuário alvo tenham os dados corretos do perfil principal.
      // Posts de usuários sugeridos já devem vir com seus próprios dados de 'de_usuario' preenchidos pelo service.
      const finalPosts = fetchedPosts.map((p: FeedPost) => {
          // Se o post não tem um full_name preenchido, assumimos que é um post do usuário alvo
          // e preenchemos com os dados do perfil principal.
          if (!p.de_usuario.full_name || p.de_usuario.username === targetProfileData.username) {
              return {
                  ...p,
                  de_usuario: {
                      username: targetProfileData.username,
                      full_name: targetProfileData.fullName,
                      profile_pic_url: targetProfileData.profilePicUrl,
                  }
              };
          }
          return p; // Post de usuário sugerido, mantém os dados originais
      });
      
      setSuggestedProfiles(fetchedSuggestions);
      setPosts(finalPosts); // Use finalPosts
      
      // Armazena todos os dados, incluindo a cidade do usuário
      const dataToStore = {
        profileData: targetProfileData,
        suggestedProfiles: fetchedSuggestions,
        posts: finalPosts, // Store finalPosts
        userCity: userCity, // Armazena a cidade
      };
      sessionStorage.setItem('invasionData', JSON.stringify(dataToStore));

      // 5. Transição para o próximo estágio
      if (isLoggedIn) {
        setStage('feed_locked');
      } else {
        setStage('login_attempt');
      }
    };

    if (stage === 'loading') {
      loadAllDataAndProceed();
    }
  }, [location.state, navigate, stage, isLoggedIn, login]);

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
              posts={posts || []}
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
                posts={posts || []}
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