import React from 'react';

const ChipLoader: React.FC = () => {
  return (
    <>
      <style>{`
        /* From Uiverse.io by vinodjangid07 - Adaptado por Dyad */ 
        .loader {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 150px; /* Ajustado para um tamanho fixo para o loader */
          width: 150px; /* Ajustado para um tamanho fixo para o loader */
          margin: auto; /* Centraliza o container */
        }

        .loaderMiniContainer {
          position: relative;
          width: 100px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .barContainer {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: rotate 2s linear infinite;
        }

        .bar {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 7px solid transparent;
          border-top-color: #ffea00; /* Amarelo */
          border-radius: 50%;
          animation: spin 1.5s linear infinite;
        }

        .bar2 {
          border-top-color: #9900ff; /* Roxo */
          animation-delay: 0.5s;
        }

        .svgIcon {
          position: absolute;
          width: 50px; /* Ajustado para caber dentro do loader */
          height: 50px;
          fill: none;
          stroke: #E1306C; /* Rosa Instagram */
          stroke-width: 7;
          animation: pulse 1.5s ease-in-out infinite alternate;
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
      <div className="loader">
        <div className="loaderMiniContainer">
          <div className="barContainer">
            <span className="bar"></span>
            <span className="bar bar2"></span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 101 114"
            className="svgIcon"
          >
            <circle
              strokeWidth="7"
              stroke="currentColor" /* Usando currentColor para herdar a cor do CSS */
              transform="rotate(36.0692 46.1726 46.1727)"
              r="29.5497"
              cy="46.1727"
              cx="46.1726"
            ></circle>
            <line
              strokeWidth="7"
              stroke="currentColor" /* Usando currentColor para herdar a cor do CSS */
              y2="111.784"
              x2="97.7088"
              y1="67.7837"
              x1="61.7089"
            ></line>
          </svg>
        </div>
      </div>
    </>
  );
};

export default ChipLoader;