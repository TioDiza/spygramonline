import React from 'react';
import type { InteractionProfile } from '../../types';
// import InteractionCard from './InteractionCard'; // Removido: não é usado diretamente aqui
import InteractionCarousel from './InteractionCarousel'; // Importa o novo componente de carrossel

interface InteractionProfilesSectionProps {
  profiles: InteractionProfile[];
}

const InteractionProfilesSection: React.FC<InteractionProfilesSectionProps> = ({ profiles }) => {
  if (!profiles || profiles.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text animate-fade-in">
        Perfis com Maior Interação
      </h2>
      <InteractionCarousel profiles={profiles} /> {/* Usa o carrossel aqui */}
    </div>
  );
};

export default InteractionProfilesSection;