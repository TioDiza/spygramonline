import React from 'react';
import InstagramFeedContent from './InstagramFeedContent';
import { ProfileData } from '../../types';

interface InstagramFeedMockupProps {
  profileData: ProfileData;
}

const InstagramFeedMockup: React.FC<InstagramFeedMockupProps> = ({ profileData }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-black min-h-screen flex flex-col shadow-2xl shadow-purple-500/20 md:shadow-none">
      <InstagramFeedContent profileData={profileData} />
    </div>
  );
};

export default InstagramFeedMockup;