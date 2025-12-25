import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileData, SuggestedProfile } from '../../types';
import { ShieldCheck, Zap, Clock, MessageSquare, Award, ChevronDown, MapPin } from 'lucide-react';
import ProfileCardDetailed from '../components/ProfileCardDetailed';
import InteractionProfilesCarousel from '../components/InteractionProfilesCarousel';
import RealTimeLocationCard from '../components/RealTimeLocationCard';
import DatingAppCard from '../components/DatingAppCard';
import CheckoutPromptModal from '../components/CheckoutPromptModal';
import ShineButton from '../components/ui/ShineButton'; // Importa o novo botão

const features = [
  { icon: Zap, title: 'Acesso Imediato', description: 'Visualize o perfil completo assim que o pagamento for confirmado.' },
  { icon: MapPin, title: 'Localização em Tempo Real', description: 'Saiba exatamente onde a pessoa está no momento da invasão.' },
  { icon: ShieldCheck, title: '100% Seguro e Anônimo', description: 'Sua identidade é protegida. A invasão é indetectável.' },
  { icon: Clock, title: 'Acesso Vitalício', description: 'Pague uma vez e tenha acesso ao perfil para sempre, sem mensalidades.' },
  { icon: MessageSquare, title: 'Chat Ao Vivo', description: 'Acompanhe as conversas em tempo real e veja com quem a pessoa interage.' },
  { icon: Award, title: 'Garantia de 7 Dias', description: 'Se não estiver satisfeito, devolvemos seu dinheiro sem burocracia.' },
];

// Novo componente para a seção fixa
const FixedScrollPrompt: React.FC = () => (
  <div className="fixed bottom-0 left-0 right-0 z-20 p-4 bg-black/80 backdrop-blur-sm border-t border-gray-800">
    <div className="text-center">
      <p className="text-sm text-gray-500 mb-1">Continue lendo</p>
      <ChevronDown className="w-6 h-6 text-gray-500 mx-auto animate-bounce-slow" />
    </div>
  </div>
);

const CHECKOUT_URL = 'https://go.perfectpay.com.br/PPU38CPUD1S';

const InvasionConcludedPage: React.FC = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [suggestedProfiles, setSuggestedProfiles] = useState<SuggestedProfile[]>([]);
  const [userCity, setUserCity] = useState<string>('Sua Localização');
  
  // Novo estado para gerenciamento do modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFeatureName, setModalFeatureName] = useState('');

  useEffect(() => {
    const storedData = sessionStorage.getItem('invasionData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setProfileData(data.profileData);
      setSuggestedProfiles(data.suggestedProfiles || []);
      setUserCity(data.userCity || 'Sua Localização');
    } else {
      navigate('/');
    }
  }, [navigate]);

  // Handler modificado para abrir o modal
  const handleUnlockClick = (feature: 'localização' | 'sites de namoro' | 'acesso completo') => {
    setModalFeatureName(feature);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!profileData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans p-4 sm:p-8 flex flex-col items-center relative z-10">
      
      {/* Checkout Prompt Modal */}
      <CheckoutPromptModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        featureName={modalFeatureName}
        checkoutUrl={CHECKOUT_URL}
      />

      <main className="w-full max-w-md lg:max-w-4xl mx-auto text-center relative z-10 pt-12 pb-20">
        
        {/* Título Principal */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8">
          <span className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
            Invasão Concluída! 
          </span>
        </h1>

        {/* 1. Card de Perfil Detalhado (Perfil Pesquisado) */}
        <ProfileCardDetailed profileData={profileData} />

        {/* 2. Perfis com Maior Interação */}
        <h2 className="text-2xl font-extrabold text-white mt-4 mb-4">
          Perfis com Maior Interação 
          <span className="text-gray-500 font-normal text-lg ml-2">(Desbloqueie para ver nomes)</span>
        </h2>
        
        {/* CARROSSEL DE PERFIS */}
        <InteractionProfilesCarousel profiles={suggestedProfiles} />
        {/* FIM CARROSSEL */}

        {/* 3. Cartão de Localização em Tempo Real */}
        <RealTimeLocationCard 
          profileData={profileData} 
          userCity={userCity} 
          onUnlockClick={() => handleUnlockClick('localização')} // Aciona o modal
        />
        
        {/* 4. Cartão de Aplicativos de Relacionamento (NOVO) */}
        <DatingAppCard onUnlockClick={() => handleUnlockClick('sites de namoro')} /> // Aciona o modal

        {/* Grid de Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left mt-8">
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

        {/* Botão de Ação Principal */}
        <div className="w-full">
          <ShineButton onClick={() => handleUnlockClick('acesso completo')} className="w-full">
            LIBERAR ACESSO COMPLETO AGORA
          </ShineButton>
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
      
      {/* Prompt de Scroll Fixo (Agora visível em todas as resoluções) */}
      <FixedScrollPrompt />
    </div>
  );
};

export default InvasionConcludedPage;