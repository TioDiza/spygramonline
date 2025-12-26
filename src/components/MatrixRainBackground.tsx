import React from 'react';
import { cn } from '../lib/utils';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-[]{}|;:,.<>?/~`';
const COLUMN_COUNT = 40; 
const FONT_SIZE = 16; 
const RAIN_LENGTH = 50; 

const getRandomString = (length: number) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
  }
  return result;
};

const MatrixRainBackground: React.FC = () => {
  const columns = Array(COLUMN_COUNT).fill(0).map((_, i) => i);

  const columnData = columns.map(() => ({
    text: getRandomString(RAIN_LENGTH),
    duration: Math.random() * 10 + 5, // 5s to 15s duration
    delay: Math.random() * -10, // Negative delay to start off-screen
    // Use a random color from the theme palette for variety
    color: Math.random() > 0.5 ? 'text-purple-600' : 'text-pink-600',
  }));

  return (
    <>
      <style>{`
        @keyframes matrix-fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .matrix-column {
          position: absolute;
          top: -100vh; /* Start above the viewport */
          font-size: ${FONT_SIZE}px;
          line-height: ${FONT_SIZE}px;
          white-space: pre;
          animation-name: matrix-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          opacity: 0.3; /* General opacity for background effect */
        }
      `}</style>
      <div className="fixed inset-0 overflow-hidden z-0 bg-black">
        {columnData.map((col, index) => (
          <div
            key={index}
            className={cn("matrix-column", col.color)}
            style={{
              left: `${(index / COLUMN_COUNT) * 100}%`,
              animationDuration: `${col.duration}s`,
              animationDelay: `${col.delay}s`,
              // Randomize the starting position slightly
              transform: `translateY(${Math.random() * -50}vh)`,
            }}
          >
            {col.text}
          </div>
        ))}
      </div>
    </>
  );
};

export default MatrixRainBackground;