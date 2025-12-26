import React, { useMemo } from 'react';
import { cn } from '../lib/utils';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-[]{}|;:,.<>?/~`';
const SPYGRAM = 'SPYGRAM';
const COLUMN_COUNT = 40; 
const FONT_SIZE = 16; 
const RAIN_LENGTH = 100; // Garante que cubra a tela

// Helper function to generate a single styled column as an array of React nodes
const generateStyledColumn = (columnIndex: number) => {
  const characters = [];
  let spygramIndex = 0;
  // Insere SPYGRAM em colunas a cada 7 colunas para que apareça periodicamente
  const shouldInsertSpygram = columnIndex % 7 === 0; 
  
  for (let i = 0; i < RAIN_LENGTH; i++) {
    let char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    // Cor base de baixo contraste (quase invisível no fundo preto)
    let className = 'text-gray-800'; 

    // Lógica para inserir e destacar letras SPYGRAM
    if (shouldInsertSpygram && spygramIndex < SPYGRAM.length && i % 10 === 0) { // Insere a cada 10 linhas em colunas específicas
      char = SPYGRAM[spygramIndex];
      className = 'text-purple-400 font-bold'; // Destaque brilhante
      spygramIndex++;
    } else if (Math.random() < 0.03) {
      // Destaque aleatório de outros caracteres com cores do tema
      className = Math.random() > 0.5 ? 'text-purple-600' : 'text-pink-600';
    }

    characters.push(
      <span key={i} className={className}>
        {char}
      </span>
    );
  }
  return characters;
};

const MatrixRainBackground: React.FC = () => {
  const columnData = useMemo(() => {
    return Array(COLUMN_COUNT).fill(0).map((_, index) => ({
      content: generateStyledColumn(index),
      duration: Math.random() * 10 + 5, // 5s to 15s duration
      delay: Math.random() * -10, // Negative delay to start off-screen
    }));
  }, []);

  return (
    <>
      <style>{`
        @keyframes matrix-fall {
          0% { transform: translateY(-100%); } 
          100% { transform: translateY(100vh); }
        }
        .matrix-column {
          position: absolute;
          top: 0; 
          font-size: ${FONT_SIZE}px;
          line-height: ${FONT_SIZE}px;
          white-space: pre;
          animation-name: matrix-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          opacity: 0.8; 
        }
      `}</style>
      <div className="fixed inset-0 overflow-hidden z-0 bg-black">
        {columnData.map((col, index) => (
          <div
            key={index}
            className={cn("matrix-column")}
            style={{
              left: `${(index / COLUMN_COUNT) * 100}%`,
              animationDuration: `${col.duration}s`,
              animationDelay: `${col.delay}s`,
            }}
          >
            {col.content}
          </div>
        ))}
      </div>
    </>
  );
};

export default MatrixRainBackground;