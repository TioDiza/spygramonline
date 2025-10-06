import React from 'react';
import { HeartCrack } from 'lucide-react';

const JealousyMessage: React.FC = () => {
  return (
    <div className="mt-12 w-full max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl shadow-lg shadow-red-500/10 p-8 text-center animate-fade-in">
      <HeartCrack className="w-16 h-16 text-red-500 mx-auto mb-6 animate-pulse" />
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-transparent bg-clip-text">
        Revelações Inesperadas...
      </h2>
      <p className="text-lg text-gray-300 leading-relaxed">
        Os dados analisados revelam que este perfil mantém um círculo íntimo de pessoas com quem compartilha segredos e momentos que você nunca imaginaria.
        <br />
        As interações mais profundas acontecem em lugares que não são visíveis para todos.
      </p>
    </div>
  );
};

export default JealousyMessage;