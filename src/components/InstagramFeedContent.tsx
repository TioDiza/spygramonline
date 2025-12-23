import React from 'react';
import { Heart, MessageCircle, Send, Bookmark, Lock, MoreHorizontal, Home } from 'lucide-react';
import { ProfileData } from '../../types';
import { cn } from '../lib/utils';

interface InstagramFeedContentProps {
  profileData: ProfileData;
}

// Mock data for posts
const mockPosts = [
  { id: 1, imageUrl: 'https://picsum.photos/id/1018/600/600', caption: 'Um dia incrível na praia! ☀️🌊', likes: 1245, comments: 45 },
  { id: 2, imageUrl: 'https://picsum.photos/id/1025/600/600', caption: 'Novo look para o inverno. O que acharam? 🧥', likes: 890, comments: 22 },
  { id: 3, imageUrl: 'https://picsum.photos/id/1033/600/600', caption: 'Melhor café da cidade! ☕', likes: 2100, comments: 78 },
  { id: 4, imageUrl: 'https://picsum.photos/id/1040/600/600', caption: 'TBT da viagem inesquecível. Saudades! ✈️', likes: 560, comments: 15 },
];

const InstagramHeader: React.FC = () => (
  <header className="flex justify-between items-center p-3 border-b border-gray-800 bg-black sticky top-0 z-10 md:hidden">
    <img
      src="/spygram_transparentebranco.png"
      alt="Instagram Logo"
      className="h-7"
      style={{ filter: 'invert(1)' }}
    />
    <div className="flex items-center space-x-4">
      <Heart className="w-6 h-6 text-white" />
      <Send className="w-6 h-6 text-white" />
    </div>
  </header>
);

interface InstagramFooterProps {
  profileData: ProfileData;
}

const InstagramFooter: React.FC<InstagramFooterProps> = ({ profileData }) => (
  <footer className="flex justify-around items-center p-2 border-t border-gray-800 bg-black sticky bottom-0 z-10 md:hidden">
    <Home className="w-6 h-6 text-white" />
    <Heart className="w-6 h-6 text-gray-500" />
    <MessageCircle className="w-6 h-6 text-gray-500" />
    <img
      src={profileData.profilePicUrl}
      alt={profileData.username}
      className="w-6 h-6 rounded-full object-cover"
    />
  </footer>
);

interface PostProps {
  post: typeof mockPosts[0];
  profileData: ProfileData;
}

const LockedPost: React.FC<PostProps> = ({ post, profileData }) => {
  const isLocked = true;
  const blurClass = isLocked ? 'blur-md select-none' : '';

  return (
    <div className="border-b border-gray-800 mb-4">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <img
            src={profileData.profilePicUrl}
            alt={profileData.username}
            className={cn("w-8 h-8 rounded-full object-cover", blurClass)}
          />
          <span className={cn("text-sm font-semibold text-white", blurClass)}>
            {profileData.username}
          </span>
        </div>
        <MoreHorizontal className="w-5 h-5 text-white" />
      </div>

      <div className="relative w-full aspect-square bg-gray-900 flex items-center justify-center">
        <img
          src={post.imageUrl}
          alt="Post"
          className={cn("w-full h-full object-cover", blurClass)}
        />
        {isLocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
            <Lock className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
            <p className="text-xl font-bold text-white">CONTEÚDO BLOQUEADO</p>
            <p className="text-sm text-gray-400 mt-1">Acesso Premium Requerido</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center p-3">
        <div className="flex space-x-4">
          <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
          <MessageCircle className="w-6 h-6 text-white" />
          <Send className="w-6 h-6 text-white" />
        </div>
        <Bookmark className="w-6 h-6 text-white" />
      </div>

      <div className="px-3 pb-3 text-xs">
        <p className={cn("font-semibold text-white mb-1", blurClass)}>
          {isLocked ? '999.999' : new Intl.NumberFormat().format(post.likes)} curtidas
        </p>
        <p className="text-white">
          <span className={cn("font-semibold mr-1", blurClass)}>{profileData.username}</span>
          <span className={blurClass}>{post.caption}</span>
        </p>
        <p className="text-gray-500 mt-1">
          Ver todos os {isLocked ? '999' : post.comments} comentários
        </p>
      </div>
    </div>
  );
};

const InstagramFeedContent: React.FC<InstagramFeedContentProps> = ({ profileData }) => {
  return (
    <>
      <InstagramHeader />
      
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="flex p-3 space-x-3 border-b border-gray-800 overflow-x-auto flex-shrink-0 scrollbar-hide md:my-4">
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-gray-800 border-2 border-pink-500 p-0.5">
              <img
                src={profileData.profilePicUrl}
                alt={profileData.username}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="text-xs text-white mt-1 truncate w-14 text-center">{profileData.username}</span>
          </div>
          {Array(8).fill(0).map((_, index) => (
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

        {mockPosts.map((post) => (
          <LockedPost key={post.id} post={post} profileData={profileData} />
        ))}
        <div className="text-center p-4 text-gray-500 text-sm">
          Fim do feed por enquanto.
        </div>
      </div>

      <InstagramFooter profileData={profileData} />
    </>
  );
};

export default InstagramFeedContent;