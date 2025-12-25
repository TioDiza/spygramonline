import React from 'react';
import { motion, Variants } from 'framer-motion';
import { SuggestedProfile } from '../../types';

interface InteractionProfilesCarouselProps {
  profiles: SuggestedProfile[];
}

const InteractionProfilesCarousel: React.FC<InteractionProfilesCarouselProps> = ({ profiles }) => {
  // Duplica perfis para criar um loop de rolagem contínuo
  const duplicatedProfiles = [...profiles, ...profiles];
  
  // Removido o estado 'offset' e o useEffect que controlava a alternância de blur.

  if (profiles.length === 0) return null;

  // Configuração da animação de rolagem infinita
  const containerVariants: Variants = {
    animate: {
      x: ['0%', '-50%'], // Rola do início até a metade (o tamanho do array original)
      transition: {
        x: {
          repeat: Infinity,
          ease: [0, 0, 1, 1], // Easing linear
          duration: 30, // Velocidade da rolagem
        },
      },
    },
  };

  // O blur será aplicado estaticamente a todos os perfis para simular o bloqueio.
  const isBlurred = true; 

  return (
    <div className="w-full overflow-hidden py-4">
      <motion.div
        className="flex space-x-4"
        variants={containerVariants}
        animate="animate"
      >
        {duplicatedProfiles.map((profile, index) => {
          
          return (
            <div 
              key={`${profile.username}-${index}`} 
              className="flex flex-col items-center flex-shrink-0 w-20 text-center cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all duration-500 ${isBlurred ? 'border-red-500' : 'border-pink-500'}`}>
                <img 
                  src={profile.profile_pic_url} 
                  alt={profile.username} 
                  className={`w-full h-full object-cover transition-all duration-500 ${isBlurred ? 'blur-sm opacity-70' : 'blur-none opacity-100'}`}
                />
              </div>
              <p className={`text-xs mt-1 transition-colors duration-500 ${isBlurred ? 'text-red-400' : 'text-white'}`}>
                {/* O nome de usuário sempre será mascarado */}
                {'*****'} 
              </p>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default InteractionProfilesCarousel;