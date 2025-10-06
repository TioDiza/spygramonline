import React from 'react';
import { Image, MapPin, PhoneCall, AppWindow, Lock } from 'lucide-react';
import CtaSection from './CtaSection'; // Importando o novo componente

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="relative bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center text-center overflow-hidden h-52">
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-10">
      <Lock className="w-12 h-12 text-purple-500 mb-4" />
      <h4 className="text-lg font-bold text-white">Acesso Premium</h4>
      <p className="text-sm text-gray-400">Desbloqueie para ver</p>
    </div>
    <Icon className="w-16 h-16 mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text" />
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

const LockedFeatures: React.FC = () => {
  return (
    <div className="mt-20 w-full max-w-5xl mx-auto text-center animate-fade-in">
      <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
        A Invasão Foi Mais Fundo...
      </h2>
      <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
        Recuperamos mais do que apenas mensagens. Fotos, vídeos, localizações e até atividades em outros apps foram encontrados.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard 
          icon={Image} 
          title="Mídias Apagadas" 
          description="Fotos e vídeos que foram excluídos, mas não para sempre." 
        />
        <FeatureCard 
          icon={MapPin} 
          title="Histórico de Localização" 
          description="Os lugares mais frequentados e rotas recentes." 
        />
        <FeatureCard 
          icon={PhoneCall} 
          title="Registros de Chamadas" 
          description="Com quem, quando e por quanto tempo as conversas duraram." 
        />
        <FeatureCard 
          icon={AppWindow} 
          title="Atividade em Outros Apps" 
          description="Interações suspeitas no WhatsApp, Tinder e mais." 
        />
      </div>

      <CtaSection />
    </div>
  );
};

export default LockedFeatures;