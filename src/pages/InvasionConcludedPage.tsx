import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileData } from '../../types';
import { CheckCircle, ShieldCheck, Zap, Clock, MessageSquare, Award } from 'lucide-react';

const InvasionConcludedPage: React.FC = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem('invasionData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setProfileData(data.profileData);
    } else {
      // Se não houver dados, volta para a página inicial
      navigate('/');
    }
  }, [navigate]);

  if (!profileData) {
    return null; // ou um loader
  }

  const features = [
    { icon: Zap, title: 'Acesso Imediato', description: 'Visualize o perfil completo assim que o pagamento for confirmado.' },
    { icon: ShieldCheck, title: '100% Seguro e Anônimo', description: 'Sua identidade é protegida. A invasão é indetectável.' },
    { icon: Clock, title: 'Acesso Vitalício', description: 'Pague uma vez e tenha acesso ao perfil para sempre, sem mensalidades.' },
    { icon: MessageSquare, title: 'Chat Ao Vivo', description: 'Acompanhe as conversas em tempo real e veja com quem a pessoa interage.' },
    { icon: Award, title: 'Garantia de 7 Dias', description: 'Se não estiver satisfeito, devolvemos seu dinheiro sem burocracia.' },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans p-4 sm:p-8 flex flex-col items-center justify-center">
      <main className="w-full max-w-2xl mx-auto text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">INVASÃO CONCLUÍDA COM SUCESSO!</h1>
        <p className="text-gray-300 text-lg mb-6">
          Acesso total e irrestrito ao perfil de <span className="font-bold text-pink-400">@{profileData.username}</span> está a um passo de você.
        </p>

        <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg shadow-purple-500/10 p-6 mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img src={profileData.profilePicUrl} alt={profileData.username} className="w-16 h-16 rounded-full border-2 border-purple-500" />
            <div>
              <p className="text-2xl font-bold">@{profileData.username}</p>
              <p className="text-gray-400">{profileData.fullName}</p>
            </div>
          </div>
          <p className="text-yellow-400 text-sm font-semibold">
            Para sua segurança, o acesso completo será liberado após a confirmação.
          </p>
        </div>

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

      <footer className="text-center mt-12 py-4">
        <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span>Pagamento Seguro | Site Protegido</span>
        </div>
      </footer>
    </div>
  );
};

export default InvasionConcludedPage;