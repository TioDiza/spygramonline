import React from 'react';
import { HeartCrack } from 'lucide-react';
import MockChat from './MockChat'; // Importa o novo componente de chat

const JealousyMessage: React.FC = () => {
  return (
    <div className="mt-20 w-full max-w-3xl mx-auto text-center animate-fade-in">
      <HeartCrack className="w-20 h-20 text-red-600 mx-auto mb-8 animate-pulse" />
      <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-red-600 via-pink-700 to-purple-800 text-transparent bg-clip-text animate-fade-in">
        MENSAGENS RECUPERADAS PELO SPYGRAM
      </h2>
      {/* Adiciona o componente de chat mockado aqui */}
      <div className="flex justify-center mt-8">
        <MockChat />
      </div>
      <p className="text-2xl text-gray-200 leading-relaxed font-medium mt-8">
        As conexões mais verdadeiras e as conversas mais íntimas acontecem em um universo particular, longe dos seus olhos.
        <br />
        <span className="text-red-400 font-bold">Você realmente conhece quem está por trás da tela?</span>
      </p>
    </div>
  );
};

export default JealousyMessage;