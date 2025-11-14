import React from 'react';

interface ChristmasSnowfallProps {
  children: React.ReactNode;
  className?: string;
}

const ChristmasSnowfall: React.FC<ChristmasSnowfallProps> = ({ children, className }) => {
  const numberOfHats = 5; // Quantidade de toucas caindo
  const hats = Array.from({ length: numberOfHats }).map((_, i) => {
    const duration = Math.random() * 10 + 10; // Duração entre 10s e 20s
    const delay = Math.random() * 10; // Atraso entre 0s e 10s
    const left = Math.random() * 100; // Posição horizontal entre 0% e 100%
    const size = Math.random() * 30 + 40; // Tamanho entre 40px e 70px
    const rotation = Math.random() * 30 - 15; // Rotação entre -15deg e 15deg

    return (
      <img
        key={i}
        src="/santa_hat.png"
        alt="Santa Hat"
        className="absolute opacity-40 pointer-events-none"
        style={{
          width: `${size}px`,
          height: 'auto',
          left: `${left}%`,
          animation: `fall ${duration}s linear ${delay}s infinite`,
          transform: `rotate(${rotation}deg)`,
          zIndex: 0, // Garante que fique no fundo
        }}
      />
    );
  });

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-100%) rotate(var(--initial-rotation, 0deg));
            opacity: 0.4;
          }
          100% {
            transform: translateY(150vh) rotate(var(--final-rotation, 0deg));
            opacity: 0.4;
          }
        }
      `}</style>
      {hats}
      <div className="relative z-10"> {/* Conteúdo principal com z-index maior */}
        {children}
      </div>
    </div>
  );
};

export { ChristmasSnowfall };