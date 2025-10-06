import React from 'react';
import type { InteractionProfile } from '../types'; // Corrected path
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
      <style>{`
        /* Estilos para o carrossel de interação */
        .carousel-container {
          width: 100%;
          max-width: 1000px; /* Largura máxima do carrossel */
          margin: 0 auto;
          overflow: hidden; /* Esconde os cards que transbordam */
        }

        .carousel-track {
          display: flex;
          width: fit-content; /* Permite que o conteúdo determine a largura */
          animation: scroll-left ${scrollDuration}s linear infinite;
        }

        .carousel-track:hover {
          animation-play-state: paused; /* Pausa a rolagem ao passar o mouse */
        }

        .carousel-item {
          flex-shrink: 0; /* Impede que os itens encolham */
          width: ${cardWidth}px; /* Largura fixa para cada item */
          padding: 0 10px; /* Espaçamento entre os cards */
          box-sizing: border-box; /* Inclui padding na largura */
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Rola pela largura total de todos os cards (duplicados) */
            transform: translateX(calc(-${cardWidth * quantity}px));
          }
        }
      `}</style>
      <div className="carousel-container">
        <div className="carousel-track">
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