import React from 'react';
import { ProfileData } from '../../types';
import { Zap, MapPin } from 'lucide-react';

interface ProfileCardDetailedProps {
  profileData: ProfileData;
}

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

const ProfileCardDetailed: React.FC<ProfileCardDetailedProps> = ({ profileData }) => {
  // Mock data for demonstration purposes, as location/bio details are not always available in ProfileData
  const mockLocation = 'Barroso/MG';
  const mockBioLine1 = 'Ad Astra per Aspera';
  const mockBioLine2 = '...';

  return (
    <div className="bg-gray-900/80 border border-gray-700 rounded-2xl shadow-2xl shadow-purple-500/10 p-6 w-full max-w-sm mx-auto">
      {/* Header: Pic, Username, Fullname */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={profileData.profilePicUrl}
          alt={profileData.username}
          className="w-20 h-20 rounded-full object-cover border-2 border-pink-500"
        />
        <div className="flex-1">
          <p className="text-2xl font-bold text-white">{profileData.username}</p>
          <p className="text-gray-400">{profileData.fullName} 😟</p>
        </div>
      </div>

      {/* Stats: Posts, Followers, Following */}
      <div className="flex justify-around text-center text-sm border-t border-b border-gray-800 py-4 mb-4">
        <div>
          <p className="font-bold text-xl text-white">{formatNumber(profileData.postsCount)}</p>
          <p className="text-gray-400 text-xs">Posts</p>
        </div>
        <div>
          <p className="font-bold text-xl text-white">{formatNumber(profileData.followers)}</p>
          <p className="text-gray-400 text-xs">Followers</p>
        </div>
        <div>
          <p className="font-bold text-xl text-white">{formatNumber(profileData.following)}</p>
          <p className="text-gray-400 text-xs">Following</p>
        </div>
      </div>

      {/* Biography/Location */}
      <div className="text-sm text-gray-300 text-left space-y-1 mb-6">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span>{mockBioLine1}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-500" />
          <span>{mockLocation}</span>
        </div>
        <p>{mockBioLine2}</p>
      </div>

      {/* Private Status Banner */}
      {profileData.isPrivate && (
        <div className="bg-yellow-800/50 border border-yellow-600 text-yellow-300 px-4 py-3 rounded-lg text-center text-sm font-semibold">
          Este perfil é privado. O SpyGram conseguiu invadir mesmo assim!
        </div>
      )}
    </div>
  );
};

export default ProfileCardDetailed;