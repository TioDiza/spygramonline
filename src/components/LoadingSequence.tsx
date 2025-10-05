import React from 'react';
import ChipLoader from './ChipLoader'; // Importa o novo ChipLoader
import HackingMessages from './HackingMessages'; // Importa o novo componente de mensagens

interface LoadingSequenceProps {
  onSequenceComplete: () => void;
}

const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onSequenceComplete }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[25rem]"> {/* Aumentado min-h para acomodar loader e mensagens */}
      <div className="mb-4"> {/* Container para o ChipLoader */}
        <ChipLoader />
      </div>
      <HackingMessages onComplete={onSequenceComplete} />
    </div>
  );
};

export default LoadingSequence;