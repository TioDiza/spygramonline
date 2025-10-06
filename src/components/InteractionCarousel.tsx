import React from 'react';
import type { InteractionProfile } from '../../types';
import InteractionCard from './InteractionCard';

interface InteractionCarouselProps {
  profiles: InteractionProfile[];
}

const InteractionCarousel: React.FC<InteractionCarouselProps> = ({ profiles }) => {
  const quantity = profiles.length;
  const cardWidth = 160; // Largura aproximada de um card + espaçamento
  const scrollDuration = quantity * 2; // Duração da animação baseada na quantidade de cards

  return (
    <>
      <div className="carousel-container">
        <div className="carousel-track" style={{ animationDuration: `${scrollDuration}s` }}>
          {/* Duplica os perfis para criar um efeito de loop contínuo */}
          {[...profiles, ...profiles].map((profile, index) => (
            <div key={index} className="carousel-item">
              <InteractionCard profile={profile} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InteractionCarousel;