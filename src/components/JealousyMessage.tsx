import React from 'react';
import { HeartCrack } from 'lucide-react';

const JealousyMessage: React.FC = () => {
  return (
    <div className="mt-20 w-full max-w-3xl mx-auto text-center animate-fade-in"> {/* Aumentei o espaçamento superior e a largura máxima */}
      <HeartCrack className="w-20 h-20 text-red-600 mx-auto mb-8 animate-pulse" /> {/* Ícone maior e mais vermelho */}
      <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-red-600 via-pink-700 to-purple-800 text-transparent bg-clip-text animate-fade-in">
        A VERDADE DÓI.
      </h2>
      <p className="text-2xl text-gray-200 leading-relaxed font-medium"> {/* Texto maior e mais forte */}
        Enquanto você observa, este perfil está vivendo momentos intensos e compartilhando segredos profundos com pessoas que você nem imagina.
        <br />
        As conexões mais verdadeiras e as conversas mais íntimas acontecem em um universo particular, longe dos seus olhos.
        <br />
        <span className="text-red-400 font-bold">Você realmente conhece quem está por trás da tela?</span>
      </p>
    </div>
  );
};

export default JealousyMessage;