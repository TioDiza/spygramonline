import React from 'react';
import { Lock, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FeedPost } from '../../types';

interface BlurredPostProps {
  postData: FeedPost;
  location?: string;
  onLockedFeatureClick: (featureName: string) => void;
}

// Helper function to mask usernames
const maskUsername = (username: string) => {
  if (username.length <= 4) return username;
  if (username.length <= 3) return '*******';
  return `${username.substring(0, 3).toLowerCase()}****`;
};

const BlurredPost: React.FC<BlurredPostProps> = ({ postData, location, onLockedFeatureClick }) => {
  const { de_usuario, post } = postData;
  const maskedUsername = maskUsername(de_usuario.username);
  const navigate = useNavigate();

  // Verifica se a imagem é o placeholder genérico (indicando que o conteúdo é mockado/bloqueado)
  const isMockedContent = post.image_url.includes('/perfil.jpg');

  return (
    <div className="border-b border-gray-800 mb-4">
      <div className="flex items-center justify-between p-3">
        <div onClick={() => onLockedFeatureClick(`ver o perfil de @${de_usuario.username}`)} className="flex items-center space-x-3 cursor-pointer">
          <img src={de_usuario.profile_pic_url} alt={de_usuario.username} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold text-white">{maskedUsername}</p>
            {location && <p className="text-xs text-gray-400">{location}</p>}
          </div>
        </div>
        <button onClick={() => onLockedFeatureClick('ver as opções da publicação')}><MoreHorizontal className="w-5 h-5 text-white" /></button>
      </div>
      
      <div className="relative w-full aspect-square">
        {/* Conteúdo Real (Borrado) */}
        {post.is_video && post.video_url ? (
          <video src={post.video_url} controls className="w-full h-full object-contain bg-black blur-md"></video>
        ) : (
          <img 
            src={post.image_url} 
            alt="Post" 
            className={`w-full h-full object-contain ${isMockedContent ? 'blur-md' : 'blur-sm'}`} 
          />
        )}

        {/* Overlay de Bloqueio */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm cursor-pointer" onClick={() => onLockedFeatureClick('ver o conteúdo da publicação')}>
          <Lock className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
          <p className="text-xl font-bold text-white">CONTEÚDO BLOQUEADO</p>
          <p className="text-sm text-gray-400 mt-1">Acesso Premium Requerido</p>
        </div>
      </div>

      <div className="flex justify-between items-center p-3">
        <div className="flex space-x-4">
          <button onClick={() => onLockedFeatureClick('curtir publicações')}>
            <img src="/icons/heart.png" alt="Curtir" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
          </button>
          <button onClick={() => onLockedFeatureClick('ver os comentários')}>
            <img src="/icons/comment.png" alt="Comentar" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
          </button>
          <button onClick={() => navigate('/messages')}>
            <img src="/icons/send.png" alt="Enviar" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
          </button>
        </div>
        <button onClick={() => onLockedFeatureClick('salvar publicações')}>
          <img src="/icons/bookmark.png" alt="Salvar" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
        </button>
      </div>
      <div className="px-3 pb-3 text-xs">
        <p onClick={() => onLockedFeatureClick('ver as curtidas')} className="font-semibold text-white mb-1 cursor-pointer">{new Intl.NumberFormat().format(post.like_count)} curtidas</p>
        {post.caption && (
          <p className="text-white"><span className="font-semibold mr-1">{maskedUsername}</span><span>{post.caption}</span></p>
        )}
        <p onClick={() => onLockedFeatureClick('ver os comentários')} className="text-gray-500 mt-1 cursor-pointer">Ver todos os {post.comment_count} comentários</p>
      </div>
    </div>
  );
};

export default BlurredPost;