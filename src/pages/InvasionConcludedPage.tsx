import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileData } from '../../types';
import { ShieldCheck, Zap, Clock, MessageSquare, Award, ChevronDown } from 'lucide-react';
import ProfileCardDetailed from '../components/ProfileCardDetailed';
import PurchaseNotification from '../components/PurchaseNotification';

const features = [
  { icon: Zap, title: 'Acesso Imediato', description: 'Visualize o perfil completo assim que o pagamento for confirmado.' },
  { icon: ShieldCheck, title: '100% Seguro e Anônimo', description: 'Sua identidade é protegida. A invasão é indetectável.' },
  { icon: Clock, title: 'Acesso Vitalício', description: 'Pague uma vez e tenha acesso ao perfil para sempre, sem mensalidades.' },
  { icon: MessageSquare, title: 'Chat Ao Vivo', description: 'Acompanhe as conversas em tempo real e veja com quem a pessoa interage.' },
  { icon: Award, title: 'Garantia de 7 Dias', description: 'Se não estiver satisfeito, devolvemos seu dinheiro sem burocracia.' },
];

// Componente para o fundo de Natal
const ChristmasBackground: React.FC = () => {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
  }));

  const hats = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 10,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Estrelas */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`,
            opacity: 0.8,
          }}
        />
      ))}
      {/* Chapéus de Papai Noel */}
      {hats.map(hat => (
        <div
          key={hat.id}
          className="absolute w-10 h-10 opacity-70"
          style={{
            left: `${hat.x}%`,
            top: `${hat.y}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `float-hat 15s infinite ease-in-out alternate`,
            animationDelay: `${hat.delay}s`,
          }}
        >
          <img src="/icons/santa-hat.png" alt="Santa Hat" className="w-full h-full" />
        </div>
      ))}
      <style>{`
        @keyframes float-hat {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

// Novo componente para a seção fixa
const FixedScrollPrompt: React.FC = () => (
  <div className="fixed bottom-0 left-0 right-0 z-20 p-4 bg-black/80 backdrop-blur-sm border-t border-gray-800 md:hidden">
    <div className="text-center">
      <p className="text-sm text-gray-500 mb-1">Continue lendo</p>
      <ChevronDown className="w-6 h-6 text-gray-500 mx-auto animate-bounce-slow" />
    </div>
  </div>
);

const InvasionConcludedPage: React.FC = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem('invasionData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setProfileData(data.profileData);
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!profileData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans p-4 sm:p-8 flex flex-col items-center relative z-10">
      <ChristmasBackground />
      <PurchaseNotification />

      <main className="w-full max-w-2xl mx-auto text-center relative z-10 pt-12 pb-20"> {/* Adicionado pb-20 para compensar o FixedScrollPrompt */}
        
        {/* Título Principal */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8">
          <span className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
            Invasão Concluída! 
          </span>
          <span className="text-pink-500 ml-2">
            <span role="img" aria-label="dress">👗</span> Oferta de Natal!
          </span>
        </h1>

        {/* Card de Perfil Detalhado */}
        <ProfileCardDetailed profileData={profileData} />

        {/* Seção de Interação (Continue Lendo) - Removida daqui e movida para FixedScrollPrompt */}
        <div className="mt-12 mb-8 hidden md:block"> {/* Mantido para desktop, mas escondido em mobile */}
          <p className="text-sm text-gray-500 mb-2">Continue lendo</p>
          <ChevronDown className="w-6 h-6 text-gray-500 mx-auto animate-bounce-slow" />
        </div>

        <h2 className="text-2xl font-extrabold text-white mt-4 mb-8">
          Perfis com Maior Interação 
          <span className="text-gray-500 font-normal text-lg ml-2">(Desbloqueie para ver nomes)</span>
        </h2>

        {/* Grid de Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
              <feature.icon className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Botão de Ação */}
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={() => navigate('/credits')}
            className="w-full py-4 px-6 text-lg font-bold text-white rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/50"
          >
            LIBERAR ACESSO COMPLETO AGORA
          </button>
        </div>

        <div className="mt-6 text-red-400 font-semibold animate-pulse">
          <p>ÚLTIMAS VAGAS DISPONÍVEIS!</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center mt-12 py-4 relative z-10">
        <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span>Pagamento Seguro | Site Protegido</span>
        </div>
      </footer>
      
      {/* Prompt de Scroll Fixo (Apenas em Mobile) */}
      <FixedScrollPrompt />
    </div>
  );
};

export default InvasionConcludedPage;