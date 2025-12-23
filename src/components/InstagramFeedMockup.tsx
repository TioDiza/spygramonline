import React, { useState, useEffect } from 'react';
import InstagramFeedContent from './InstagramFeedContent';
import { ProfileData, SuggestedProfile, FeedPost } from '../../types';
import { InstagramNotification } from './InstagramNotification';

interface InstagramFeedMockupProps {
  profileData: ProfileData;
  suggestedProfiles: SuggestedProfile[];
  posts: FeedPost[]; // Adiciona a prop de posts
  isApiDataAvailable: boolean;
  locations: string[];
  onLockedFeatureClick: (featureName: string) => void;
}

const InstagramFeedMockup: React.FC<InstagramFeedMockupProps> = ({ profileData, suggestedProfiles, posts, isApiDataAvailable, locations, onLockedFeatureClick }) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
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
          duration={8000}
        />
      )}
      <InstagramFeedContent 
        profileData={profileData} 
        suggestedProfiles={suggestedProfiles} 
        posts={posts} // Passa os posts para o conteúdo
        isApiDataAvailable={isApiDataAvailable} 
        locations={locations}
        onLockedFeatureClick={onLockedFeatureClick}
      />
    </div>
  );
};

export default InstagramFeedMockup;