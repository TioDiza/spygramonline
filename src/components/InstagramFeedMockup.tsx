import React, { useState, useEffect } from 'react';
import InstagramFeedContent from './InstagramFeedContent';
import { ProfileData } from '../../types';
import { InstagramNotification } from './InstagramNotification';

interface InstagramFeedMockupProps {
  profileData: ProfileData;
}

const InstagramFeedMockup: React.FC<InstagramFeedMockupProps> = ({ profileData }) => {
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
          senderName="f*****"
          message="Vai dar certo me ver essa semana,amor?"
          onClose={() => setShowNotification(false)}
          duration={8000} // A notificação some após 8 segundos
        />
      )}
      <InstagramFeedContent profileData={profileData} />
    </div>
  );
};

export default InstagramFeedMockup;