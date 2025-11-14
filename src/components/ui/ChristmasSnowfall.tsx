import React from 'react';

interface ChristmasSnowfallProps {
  children: React.ReactNode;
  className?: string;
}

const ChristmasSnowfall: React.FC<ChristmasSnowfallProps> = ({ children, className }) => {
  const numberOfHats = 5; // Quantidade de toucas caindo
  const numberOfSnowflakes = 50; // Quantidade de flocos de neve caindo
  const accumulatedSnowHeight = 100; // Altura da neve acumulada em pixels

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
          --accumulated-snow-height: ${accumulatedSnowHeight}px; /* Define a altura da neve acumulada */
        }

        @keyframes fall-snowflake {
          0% {
            transform: translateY(-100%);
            opacity: var(--initial-opacity, 1);
          }
          85% { /* Começa a desaparecer um pouco antes de tocar a neve acumulada */
            opacity: var(--initial-opacity, 1);
          }
          100% {
            transform: translateY(calc(100vh - var(--accumulated-snow-height)));
            opacity: 0; /* Desaparece completamente */
          }
        }

        @keyframes fall-hat {
          0% {
            transform: translateY(-100%) rotate(var(--initial-rotation, 0deg));
            opacity: var(--initial-opacity, 1);
          }
          100% {
            transform: translateY(150vh) rotate(var(--final-rotation, 0deg)); /* Hats fall completely off-screen */
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
            zIndex: 0,
          } as React.CSSProperties} // Type assertion for custom CSS properties
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
          } as React.CSSProperties} // Type assertion for custom CSS properties
        />
      ))}

      {/* Camada de Neve Acumulada */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white pointer-events-none"
        style={{
          height: 'var(--accumulated-snow-height)',
          zIndex: 5, // Acima dos elementos caindo, abaixo do conteúdo principal
          boxShadow: '0 -5px 20px rgba(255,255,255,0.3)', // Sombra suave para profundidade
          borderRadius: '20px 20px 0 0', // Cantos superiores arredondados
        }}
      />

      <div className="relative z-10"> {/* Conteúdo principal com z-index maior */}
        {children}
      </div>
    </div>
  );
};

export { ChristmasSnowfall };