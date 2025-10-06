import React from 'react';
import SparkleButton from '../../components/ui/SparkleButton';

const CtaSection: React.FC = () => {
  return (
    <div className="mt-16 w-full flex flex-col items-center animate-fade-in p-6 bg-gray-900/50 border border-purple-500/30 rounded-2xl max-w-3xl mx-auto shadow-lg shadow-purple-500/10">
      <p className="text-2xl font-bold text-white mb-4 text-center">
        Você está a um passo de descobrir <span className="bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text">TODA</span> a verdade.
      </p>
      <div className="flex items-center justify-center gap-4 mb-6">
        <span className="text-2xl text-gray-500 line-through">R$ 97,90</span>
        <span className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text animate-pulse">R$ 27,90</span>
      </div>
      <SparkleButton onClick={() => alert('Redirecionando para a página de compra...')}>
        Desbloquear Acesso Total Agora
      </SparkleButton>
      <p className="text-sm text-gray-500 mt-4">Acesso vitalício com pagamento único. Sem mensalidades.</p>
    </div>
  );
};

export default CtaSection;