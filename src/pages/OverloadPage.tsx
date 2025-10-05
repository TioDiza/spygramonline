import React from 'react';
import { useNavigate } from 'react-router-dom';
import SparkleButton from '../../components/ui/SparkleButton';
// import { BackgroundBeamsWithCollision } from '../components/ui/background-beams-with-collision'; // Removido
import { AlertTriangle } from 'lucide-react';

const OverloadPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black relative z-20 text-white font-sans flex flex-col items-center p-4 sm:p-8 overflow-hidden w-full text-center"> {/* Removido BackgroundBeamsWithCollision e adicionado bg-black */}
      <AlertTriangle className="w-24 h-24 text-yellow-500 mb-6 animate-pulse" />
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text animate-fade-in">
        Sistema Sobrecargado
      </h1>
      <p className="text-lg text-gray-300 mb-8 max-w-md">
        Parece que nossos servidores estão com alta demanda no momento. Por favor, tente novamente em alguns minutos.
      </p>
      <SparkleButton onClick={() => navigate('/')}>
        Tentar Novamente
      </SparkleButton>
    </div>
  );
};

export default OverloadPage;