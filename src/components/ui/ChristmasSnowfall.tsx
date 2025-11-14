import React from 'react';

interface ChristmasSnowfallProps {
  children: React.ReactNode;
  className?: string;
}

const ChristmasSnowfall: React.FC<ChristmasSnowfallProps> = ({ children, className }) => {
  const numberOfHats = 5; // Quantidade de toucas caindo
  const numberOfSnowflakes = 50; // Quantidade de flocos de neve caindo

  // Gera as toucas de Papai Noel
  const hats = Array.from({ length: numberOfHats }).map((_, i) => {
    const duration = Math.random() * 10 + 10; // Duração entre 10s e 20s
    const delay = Math.random() * 10; // Atraso entre 0s e 10s
    const left = Math.random() * 100; // Posição horizontal entre 0% e 100%
    const size = Math.random() * 30 + 40; // Tamanho entre 40px e 70px
    const initialRotation = Math.random() * 360; // Rotação inicial aleatória
    const finalRotation = initialRotation + (Math.random() > 0.5 ? 360 : -360); // Gira uma volta completa

    return (
      <img
        key={`hat-${i}`}
        src="/santa_hat.png"
        alt="Santa Hat"
        className="absolute opacity-40 pointer-events-none"
        style={{
          width: `${size}px`,
          height: 'auto',
          left: `${left}%`,
          animation: `fall ${duration}s linear ${delay}s infinite`,
          '--initial-rotation': `${initialRotation}deg`,
          '--final-rotation': `${finalRotation}deg`,
          '--initial-opacity': '0.4',
          '--final-opacity': '0.4',
          zIndex: 0, // Garante que fique no fundo
        } as React.CSSProperties} // Type assertion for custom CSS properties
      />
    );
  });

  // Gera os flocos de neve
  const snowflakes = Array.from({ length: numberOfSnowflakes }).map((_, i) => {
    const duration = Math.random() * 8 + 5; // Duração entre 5s e 13s
    const delay = Math.random() * 10; // Atraso entre 0s e 10s
    const left = Math.random() * 100; // Posição horizontal entre 0% e 100%
    const size = Math.random() * 3 + 2; // Tamanho entre 2px e 5px
    const opacity = Math.random() * 0.5 + 0.3; // Opacidade entre 0.3 e 0.8

    return (
      <div
        key={`snow-${i}`}
        className="absolute bg-white rounded-full pointer-events-none"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          animation: `fall ${duration}s linear ${delay}s infinite`,
          '--initial-rotation': '0deg', // Neve não gira
          '--final-rotation': '0deg',
          '--initial-opacity': `${opacity}`,
          '--final-opacity': `${opacity}`,
          zIndex: 0, // Garante que fique no fundo
        } as React.CSSProperties} // Type assertion for custom CSS properties
      />
    );
  });

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-100%) rotate(var(--initial-rotation, 0deg));
            opacity: var(--initial-opacity, 1);
          }
          100% {
            transform: translateY(150vh) rotate(var(--final-rotation, 0deg));
            opacity: var(--final-opacity, 1);
          }
        }
      `}</style>
      {snowflakes}
      {hats}
      <div className="relative z-10"> {/* Conteúdo principal com z-index maior */}
        {children}
      </div>
    </div>
  );
};

export { ChristmasSnowfall };