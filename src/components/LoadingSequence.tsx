import React from 'react';
import CircuitLoader from './CircuitLoader'; // Importa o novo CircuitLoader
import HackingMessages from './HackingMessages'; // Importa o novo componente de mensagens

interface LoadingSequenceProps {
  onSequenceComplete: () => void;
}

const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onSequenceComplete }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[25rem]"> {/* Aumentado min-h para acomodar loader e mensagens */}
      <div className="mb-4"> {/* Container para o CircuitLoader */}
        <CircuitLoader />
      </div>
      <HackingMessages onComplete={onSequenceComplete} />
    </div>
  );
};

export default LoadingSequence;