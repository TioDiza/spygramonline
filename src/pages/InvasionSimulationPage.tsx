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

type SimulationStage = 'loading' | 'login_attempt' | 'success_card' | 'feed_locked' | 'error';

const InvasionSimulationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  const [profileData, setProfileData] = useState<ProfileData | undefined>();
  const [apiSuggestedProfiles, setApiSuggestedProfiles] = useState<SuggestedProfile[] | undefined>();
  const [posts, setPosts] = useState<FeedPost[] | undefined>();

  const [stage, setStage] = useState<SimulationStage>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isApiDataAvailable, setIsApiDataAvailable] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFeatureName, setModalFeatureName] = useState('');

  useEffect(() => {
    let data;
    if (location.state?.profileData) {
      data = location.state;
      sessionStorage.setItem('invasionData', JSON.stringify(data));
    } else {
      const storedData = sessionStorage.getItem('invasionData');
      data = storedData ? JSON.parse(storedData) : null;
    }

    if (data?.profileData) {
      setProfileData(data.profileData);
      setApiSuggestedProfiles(data.suggestedProfiles);
      setPosts(data.posts);
    } else {
      setErrorMessage('Nenhum dado de perfil encontrado. Redirecionando...');
      toast.error('Nenhum dado de perfil encontrado. Redirecionando...');
      setTimeout(() => navigate('/'), 3000);
      setStage('error');
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (!profileData) return;

    const setupPage = async () => {
      try {
        const locationData = await getUserLocation();
        const stateCities = getCitiesByState(locationData.city, locationData.state);
        setLocations(stateCities);
      } catch (e) {
        const fallbackCities = getCitiesByState('São Paulo', 'São Paulo');
        setLocations(fallbackCities);
      }
      setIsApiDataAvailable(!!(apiSuggestedProfiles && apiSuggestedProfiles.length > 0));
    };
    setupPage();

    if (isLoggedIn) {
      setStage('feed_locked');
    } else {
      const timeout = setTimeout(() => {
        setStage('login_attempt');
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [profileData, apiSuggestedProfiles, isLoggedIn]);

  const handleLoginSuccess = useCallback(() => {
    login();
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

  if (!profileData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <ErrorMessage message={errorMessage || "Carregando..."} />
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
            className="w-full"
          >
            <div className="block md:hidden">
              <InstagramFeedMockup 
                profileData={profileData} 
                suggestedProfiles={apiSuggestedProfiles || []} 
                posts={posts || []}
                isApiDataAvailable={isApiDataAvailable} 
                locations={locations}
                onLockedFeatureClick={handleLockedFeatureClick}
              />
            </div>

            <div className="hidden md:flex w-full justify-center">
              <WebSidebar profileData={profileData} onLockedFeatureClick={handleLockedFeatureClick} />
              <main className="w-full max-w-[630px] border-x border-gray-800 md:ml-64">
                <InstagramFeedContent 
                  profileData={profileData} 
                  suggestedProfiles={apiSuggestedProfiles || []} 
                  posts={posts || []}
                  isApiDataAvailable={isApiDataAvailable} 
                  locations={locations}
                  onLockedFeatureClick={handleLockedFeatureClick}
                />
              </main>
              <WebSuggestions profileData={profileData} onLockedFeatureClick={handleLockedFeatureClick} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvasionSimulationPage;