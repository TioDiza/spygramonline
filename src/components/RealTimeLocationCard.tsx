import React from 'react';
import { MapPin } from 'lucide-react';
import { ProfileData } from '../../types';
import { useNavigate } from 'react-router-dom';

interface RealTimeLocationCardProps {
  profileData: ProfileData;
  userCity: string;
}

const RealTimeLocationCard: React.FC<RealTimeLocationCardProps> = ({ profileData, userCity }) => {
  const navigate = useNavigate();
  
  const handleViewClick = () => {
    // Redireciona para a página de créditos para desbloquear
    navigate('/credits');
  };

  // Usando userCity para exibir a localização atual
  const locationDisplay = userCity.toLowerCase() === 'sua localização' 
    ? 'Localização Desconhecida' 
    : userCity;

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-900/70 border border-gray-700 rounded-xl shadow-lg text-white">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="w-6 h-6 text-purple-500" />
        <h2 className="text-xl font-bold">Localização em tempo real</h2>
      </div>
      
      <p className="text-gray-400 text-sm mb-6">
        Veja onde {profileData.fullName.split(' ')[0] || profileData.username} está agora, e os últimos locais por onde passou.
      </p>

      {/* Map Mockup */}
      <div className="relative w-full h-48 bg-[#1a1a1a] rounded-lg overflow-hidden mb-6 border border-gray-700">
        {/* Simulated Map Grid Background */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}>
          {/* Simulated Roads/Features */}
          <div className="absolute top-1/4 left-0 w-full h-1 bg-gray-700/50 transform rotate-[-5deg]"></div>
          <div className="absolute top-3/4 left-0 w-full h-1 bg-gray-700/50 transform rotate-[10deg]"></div>
          <div className="absolute left-1/4 top-0 h-full w-1 bg-gray-700/50 transform rotate-[5deg]"></div>
        </div>
        
        {/* Profile Picture Marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-xl">
            <img 
              src={profileData.profilePicUrl} 
              alt={profileData.username} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Location Info */}
      <div className="text-left mb-6">
        <h3 className="text-lg font-semibold text-white">Localização Atual</h3>
        <p className="text-gray-400 text-sm">
          {locationDisplay}
        </p>
        <p className="text-gray-400 text-sm">@{profileData.username}</p>
      </div>

      {/* Button */}
      <button
        onClick={handleViewClick}
        className="w-full py-3 rounded-lg font-bold text-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
      >
        Ver
      </button>
    </div>
  );
};

export default RealTimeLocationCard;