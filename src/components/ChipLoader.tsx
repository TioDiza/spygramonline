import React from 'react';

const ChipLoader: React.FC = () => {
  return (
    <>
      <style>{`
        /* From Uiverse.io by Vosoone - Adaptado por Dyad */ 
        .main-container-loader {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
        }

        .loader-svg {
          width: 100px; /* Ajustado para um tamanho razoável */
          height: 100px;
        }

        .trace-bg {
          stroke: #333;
          stroke-width: 1.8;
          fill: none;
        }

        .trace-flow {
          stroke-width: 1.8;
          fill: none;
          stroke-dasharray: 40 400;
          stroke-dashoffset: 438;
          filter: drop-shadow(0 0 6px currentColor);
          animation: flow 3s cubic-bezier(0.5, 0, 0.9, 1) infinite;
        }

        .yellow {
          stroke: #ffea00;
          color: #ffea00;
        }
        .blue {
          stroke: #00ccff;
          color: #00ccff;
        }
        .green {
          stroke: #00ff15;
          color: #00ff15;
        }
        .purple {
          stroke: #9900ff;
          color: #9900ff;
        }
        .red {
          stroke: #ff3300;
          color: #ff3300;
        }

        @keyframes flow {
          to {
            stroke-dashoffset: 0;
          }
        }

        /* Čip */
        .chip-body {
          rx: 5; /* Arredondamento menor para o chip */
          ry: 5;
        }

        /* Text uvnitř čipu */
        .chip-text {
          font-weight: bold;
          letter-spacing: 1px;
          font-size: 6px; /* Tamanho da fonte ajustado */
        }

        /* Piny */
        .chip-pin {
          stroke: #444;
          stroke-width: 0.5;
          filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.6));
        }
      `}</style>
      <div className="main-container-loader">
        <svg viewBox="0 0 100 100" className="loader-svg">
          {/* Chip Body */}
          <rect className="chip-body" x="30" y="40" width="40" height="20" fill="#222" />
          <text className="chip-text" x="50" y="53" textAnchor="middle" fill="#eee">LOADING</text>

          {/* Pins */}
          <line className="chip-pin" x1="30" y1="43" x2="25" y2="43" />
          <line className="chip-pin" x1="30" y1="48" x2="25" y2="48" />
          <line className="chip-pin" x1="30" y1="53" x2="25" y2="53" />
          <line className="chip-pin" x1="70" y1="43" x2="75" y2="43" />
          <line className="chip-pin" x1="70" y1="48" x2="75" y2="48" />
          <line className="chip-pin" x1="70" y1="53" x2="75" y2="53" />

          {/* Traces - Background */}
          <path className="trace-bg" d="M15 20 Q50 5 85 20 T85 80 Q50 95 15 80 T15 20 Z" />

          {/* Traces - Flowing colors */}
          <path className="trace-flow yellow" d="M15 20 Q50 5 85 20 T85 80 Q50 95 15 80 T15 20 Z" style={{ animationDelay: '0s' }} />
          <path className="trace-flow blue" d="M15 20 Q50 5 85 20 T85 80 Q50 95 15 80 T15 20 Z" style={{ animationDelay: '0.3s' }} />
          <path className="trace-flow green" d="M15 20 Q50 5 85 20 T85 80 Q50 95 15 80 T15 20 Z" style={{ animationDelay: '0.6s' }} />
          <path className="trace-flow purple" d="M15 20 Q50 5 85 20 T85 80 Q50 95 15 80 T15 20 Z" style={{ animationDelay: '0.9s' }} />
          <path className="trace-flow red" d="M15 20 Q50 5 85 20 T85 80 Q50 95 15 80 T15 20 Z" style={{ animationDelay: '1.2s' }} />
        </svg>
      </div>
    </>
  );
};

export default ChipLoader;