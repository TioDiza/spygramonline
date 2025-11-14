import React from 'react';

interface ChristmasSnowfallProps {
  children: React.ReactNode;
  className?: string;
}

const ChristmasSnowfall: React.FC<ChristmasSnowfallProps> = ({ children, className }) => {
  const numberOfHats = 5; // Quantidade de toucas caindo
  const numberOfSnowflakes = 50; // Quantidade de flocos de neve caindo
  const accumulatedSnowHeight = 80; // Altura da neve acumulada em pixels, ajustada para ser um pouco menor

  // Gera as toucas de Papai Noel
  const hats = Array.from({ length: numberOfHats }).map((_, i) => {
    const duration = Math.random() * 10 + 10; // Duração entre 10s e 20s
    const delay = Math.random() * 10; // Atraso entre 0s e 10s
    const left = Math.random() * 100; // Posição horizontal entre 0% e 100%
    const size = Math.random() * 30 + 40; // Tamanho entre 40px e 70px
    const initialRotation = Math.random() * 360; // Rotação inicial aleatória
    const finalRotation = initialRotation + (Math.random() > 0.5 ? 360 : -360); // Gira uma volta completa

    return {
      id: `hat-${i}`,
      duration,
      delay,
      left,
      size,
      initialRotation,
      finalRotation,
    };
  });

  // Gera os flocos de neve
  const snowflakes = Array.from({ length: numberOfSnowflakes }).map((_, i) => {
    const duration = Math.random() * 8 + 5; // Duração entre 5s e 13s
    const delay = Math.random() * 10; // Atraso entre 0s e 10s
    const left = Math.random() * 100; // Posição horizontal entre 0% e 100%
    const size = Math.random() * 3 + 2; // Tamanho entre 2px e 5px
    const opacity = Math.random() * 0.5 + 0.3; // Opacidade entre 0.3 e 0.8

    return {
      id: `snow-${i}`,
      duration,
      delay,
      left,
      size,
      opacity,
    };
  });

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <style>{`
        :root {
          --accumulated-snow-height: ${accumulatedSnowHeight}px;
        }

        @keyframes fall-snowflake {
          0% {
            transform: translateY(-100%);
            opacity: var(--initial-opacity, 1);
          }
          80% { /* Flocos totalmente visíveis */
            opacity: var(--initial-opacity, 1);
          }
          95% { /* Começam a desaparecer suavemente */
            opacity: 0.2;
          }
          100% {
            /* Param para que a base do floco toque a neve acumulada */
            transform: translateY(calc(100vh - var(--accumulated-snow-height) - var(--snowflake-size)));
            opacity: 0; /* Totalmente transparente */
          }
        }

        @keyframes fall-hat {
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
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          className="absolute bg-white rounded-full pointer-events-none"
          style={{
            width: `${snowflake.size}px`,
            height: `${snowflake.size}px`,
            left: `${snowflake.left}%`,
            animation: `fall-snowflake ${snowflake.duration}s linear ${snowflake.delay}s infinite`,
            '--initial-opacity': `${snowflake.opacity}`,
            '--snowflake-size': `${snowflake.size}px`, // Passa o tamanho para o CSS
            zIndex: 0,
          } as React.CSSProperties}
        />
      ))}
      {hats.map((hat) => (
        <img
          key={hat.id}
          src="/santa_hat.png"
          alt="Santa Hat"
          className="absolute opacity-40 pointer-events-none"
          style={{
            width: `${hat.size}px`,
            height: 'auto',
            left: `${hat.left}%`,
            animation: `fall-hat ${hat.duration}s linear ${hat.delay}s infinite`,
            '--initial-rotation': `${hat.initialRotation}deg`,
            '--final-rotation': `${hat.finalRotation}deg`,
            '--initial-opacity': '0.4',
            '--final-opacity': '0.4',
            zIndex: 0,
          } as React.CSSProperties}
        />
      ))}

      {/* Camada de Neve Acumulada */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white/90 pointer-events-none" // Branco levemente translúcido
        style={{
          height: 'var(--accumulated-snow-height)',
          zIndex: 5, // Acima dos elementos caindo, abaixo do conteúdo principal
          boxShadow: '0 -5px 30px rgba(255,255,255,0.5)', // Sombra mais forte e suave
          borderRadius: '50px 50px 0 0', // Cantos superiores mais arredondados
          filter: 'blur(1px)', // Desfoque sutil para suavidade
        }}
      />

      <div className="relative z-10"> {/* Conteúdo principal com z-index maior */}
        {children}
      </div>
    </div>
  );
};

export { ChristmasSnowfall };