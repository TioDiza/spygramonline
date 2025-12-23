import React, { useState, useEffect } from 'react';
import InstagramFeedContent from './InstagramFeedContent';
import { ProfileData, SuggestedProfile } from '../../types';
import { InstagramNotification } from './InstagramNotification';

interface InstagramFeedMockupProps {
  profileData: ProfileData;
  suggestedProfiles: SuggestedProfile[];
  isApiDataAvailable: boolean; // Nova prop
}

const InstagramFeedMockup: React.FC<InstagramFeedMockupProps> = ({ profileData, suggestedProfiles, isApiDataAvailable }) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Mostra a notificação após 2.5 segundos
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-black min-h-screen flex flex-col shadow-2xl shadow-purple-500/20 md:shadow-none relative">
      {showNotification && (
        <InstagramNotification
          title="f*****"
          message="Vai dar certo me ver essa semana,amor?"
          time="agora"
          onClose={() => setShowNotification(false)}
          duration={8000} // A notificação some após 8 segundos
        />
      )}
      <InstagramFeedContent 
        profileData={profileData} 
        suggestedProfiles={suggestedProfiles} 
        isApiDataAvailable={isApiDataAvailable} 
      />
    </div>
  );
};

export default InstagramFeedMockup;