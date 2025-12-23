import React from 'react';
import { Home, Search, Compass, Clapperboard, Send, Heart, PlusSquare, Menu } from 'lucide-react';
import { ProfileData } from '../../types';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active }) => (
  <a href="#" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors">
    <Icon className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-400'}`} />
    <span className={`text-base ${active ? 'font-bold text-white' : 'text-gray-300'}`}>{label}</span>
  </a>
);

interface WebSidebarProps {
  profileData: ProfileData;
}

const WebSidebar: React.FC<WebSidebarProps> = ({ profileData }) => {
  return (
    <aside className="hidden md:flex flex-col fixed top-0 left-0 h-full w-64 bg-black border-r border-gray-800 p-4 z-30">
      <div className="py-4 mb-6">
        <img
          src="/spygram_transparentebranco.png"
          alt="SpyGram Logo"
          className="h-10"
          style={{ filter: 'invert(1)' }}
        />
      </div>
      <nav className="flex flex-col flex-grow space-y-2">
        <NavItem icon={Home} label="Página Inicial" active />
        <NavItem icon={Search} label="Pesquisa" />
        <NavItem icon={Compass} label="Explorar" />
        <NavItem icon={Clapperboard} label="Reels" />
        <NavItem icon={Send} label="Mensagens" />
        <NavItem icon={Heart} label="Notificações" />
        <NavItem icon={PlusSquare} label="Criar" />
        <a href="#" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <img src={profileData.profilePicUrl} alt={profileData.username} className="w-6 h-6 rounded-full object-cover" />
          <span className="text-base text-gray-300">Perfil</span>
        </a>
      </nav>
      <div className="mt-auto">
        <NavItem icon={Menu} label="Mais" />
      </div>
    </aside>
  );
};

export default WebSidebar;