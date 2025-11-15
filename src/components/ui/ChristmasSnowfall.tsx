import React from 'react';

interface ChristmasSnowfallProps {
  className?: string;
  children?: React.ReactNode; // Adicionado: 'children' para permitir conteúdo dentro do componente
}

const ChristmasSnowfallComponent: React.FC<ChristmasSnowfallProps> = ({ className, children }) => {
  return (
    <>
      <style>{`
        /* Estilos para a neve */
        .snow-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 1; /* Abaixo do conteúdo principal */
        }

        .snowflake {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
          animation: snowfall linear infinite;
        }

        @keyframes snowfall {
          0% {
            transform: translateY(-10vh);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        /* Estilos para os chapéus de Papai Noel */
        .santa-hat-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 2; /* Acima da neve, mas abaixo do conteúdo principal */
        }

        .santa-hat {
          position: absolute;
          width: 50px; /* Tamanho do chapéu */
          height: auto;
          opacity: 0.9;
          animation: hatfall linear infinite;
        }

        @keyframes hatfall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
      <div className="snow-container">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`snow-${i}`}
            className="snowflake"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
      <div className="santa-hat-container">
        {Array.from({ length: 10 }).map((_, i) => (
          <img
            key={`hat-${i}`}
            src="/santa_hat.png" // Certifique-se de que esta imagem está em sua pasta public/
            alt="Santa Hat"
            className="santa-hat"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 15 + 8}s`,
              animationDelay: `${Math.random() * 7}s`,
              transform: `scale(${Math.random() * 0.5 + 0.5})`, // Varia o tamanho
            }}
          />
        ))}
      </div>
      <div className={className}>{children}</div>
    </>
  );
};

export const ChristmasSnowfall = React.memo(ChristmasSnowfallComponent);