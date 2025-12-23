import React from 'react';
import { Heart, MessageCircle, Bookmark, Lock, MoreHorizontal, User, Grid3x3 } from 'lucide-react';
import { ProfileData } from '../../types';
import { useNavigate } from 'react-router-dom';

interface InstagramFeedMockupProps {
  profileData: ProfileData;
}

// Mock data for posts
const mockPosts = [
  { id: 1, imageUrl: 'https://picsum.photos/id/1018/600/600' },
  { id: 2, imageUrl: 'https://picsum.photos/id/1025/600/600' },
  { id: 3, imageUrl: 'https://picsum.photos/id/1033/600/600' },
  { id: 4, imageUrl: 'https://picsum.photos/id/1040/600/600' },
  { id: 5, imageUrl: 'https://picsum.photos/id/1041/600/600' },
  { id: 6, imageUrl: 'https://picsum.photos/id/1042/600/600' },
];

const InstagramHeader: React.FC<{ username: string; isPrivate: boolean }> = ({ username, isPrivate }) => (
  <header className="flex justify-between items-center p-3 border-b border-gray-800 bg-black sticky top-0 z-10">
    <div className="w-8"></div> {/* Spacer */}
    <div className="flex items-center gap-2">
      {isPrivate && <Lock className="w-4 h-4 text-white" />}
      <span className="font-bold text-white">{username}</span>
    </div>
    <MoreHorizontal className="w-6 h-6 text-white" />
  </header>
);

const ProfileHeader: React.FC<{ profileData: ProfileData }> = ({ profileData }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="p-4">
      {/* Profile Pic and Stats */}
      <div className="flex items-center justify-between mb-4">
        <img
          src={profileData.profilePicUrl}
          alt={profileData.username}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex gap-4 text-center">
          <div>
            <p className="font-bold text-lg">{formatNumber(profileData.postsCount)}</p>
            <p className="text-gray-400 text-xs">Publicações</p>
          </div>
          <div>
            <p className="font-bold text-lg">{formatNumber(profileData.followers)}</p>
            <p className="text-gray-400 text-xs">Seguidores</p>
          </div>
          <div>
            <p className="font-bold text-lg">{formatNumber(profileData.following)}</p>
            <p className="text-gray-400 text-xs">Seguindo</p>
          </div>
        </div>
      </div>

      {/* Name and Bio */}
      <div>
        <p className="font-semibold text-sm">{profileData.fullName}</p>
        {profileData.biography && (
          <p className="text-sm text-gray-300 whitespace-pre-wrap mt-1">
            {profileData.biography}
          </p>
        )}
      </div>

      {/* Action Buttons (Locked) */}
      <div className="mt-4 flex gap-2">
        <button className="flex-1 bg-red-600/80 text-white text-sm font-semibold py-1.5 rounded-lg flex items-center justify-center gap-2">
          <Lock className="w-3 h-3" />
          <span>Seguir</span>
        </button>
        <button className="flex-1 bg-gray-700/80 text-white text-sm font-semibold py-1.5 rounded-lg flex items-center justify-center gap-2">
          <Lock className="w-3 h-3" />
          <span>Mensagem</span>
        </button>
      </div>
    </div>
  );
};

const InstagramFooter: React.FC<{ profilePicUrl: string }> = ({ profilePicUrl }) => (
  <footer className="flex justify-around items-center p-2 border-t border-gray-800 bg-black sticky bottom-0 z-10">
    <User className="w-6 h-6 text-gray-500" />
    <Heart className="w-6 h-6 text-gray-500" />
    <MessageCircle className="w-6 h-6 text-gray-500" />
    <img src={profilePicUrl} alt="Profile" className="w-6 h-6 rounded-full object-cover" />
  </footer>
);

const LockedPostGrid: React.FC = () => {
  const navigate = useNavigate();

  const handleUnlock = () => {
    navigate('/credits');
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-0.5">
        {mockPosts.map((post) => (
          <div key={post.id} className="aspect-square bg-gray-800">
            <img src={post.imageUrl} alt="Post" className="w-full h-full object-cover blur-md" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm text-center p-4">
        <Lock className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
        <p className="text-xl font-bold text-white">CONTEÚDO BLOQUEADO</p>
        <p className="text-sm text-gray-400 mt-1">Acesso Premium Requerido para visualizar as publicações.</p>
        <button 
          onClick={handleUnlock}
          className="mt-6 px-6 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700"
        >
          Desbloquear Agora
        </button>
      </div>
    </div>
  );
};

const InstagramFeedMockup: React.FC<InstagramFeedMockupProps> = ({ profileData }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-black min-h-screen flex flex-col shadow-2xl shadow-purple-500/20 border border-gray-800 rounded-lg overflow-hidden">
      <InstagramHeader username={profileData.username} isPrivate={profileData.isPrivate} />
      
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <ProfileHeader profileData={profileData} />
        
        {/* Stories Placeholder */}
        <div className="flex p-3 space-x-3 border-y border-gray-800 overflow-x-auto flex-shrink-0 scrollbar-hide">
          {Array(5).fill(0).map((_, index) => (
            <div key={index} className="flex flex-col items-center flex-shrink-0">
              <div className="w-14 h-14 rounded-full bg-gray-800 border-2 border-pink-500 p-0.5">
                <img
                  src={`https://picsum.photos/id/${100 + index}/50/50`}
                  alt={`Story ${index}`}
                  className="w-full h-full rounded-full object-cover blur-sm"
                />
              </div>
              <span className="text-xs text-gray-400 mt-1 blur-sm select-none">amigo{index + 1}</span>
            </div>
          ))}
        </div>

        {/* Post Grid Tabs */}
        <div className="flex justify-around border-b border-gray-800">
          <div className="flex-1 text-center py-2 border-b-2 border-white">
            <Grid3x3 className="w-6 h-6 text-white mx-auto" />
          </div>
          <div className="flex-1 text-center py-2">
            <Bookmark className="w-6 h-6 text-gray-500 mx-auto" />
          </div>
        </div>

        {/* Feed Posts Grid */}
        <LockedPostGrid />
      </div>

      <InstagramFooter profilePicUrl={profileData.profilePicUrl} />
    </div>
  );
};

export default InstagramFeedMockup;