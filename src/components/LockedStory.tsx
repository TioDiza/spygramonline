import React, { useMemo } from 'react';

interface LockedStoryProps {
  name: string;
}

const LockedStory: React.FC<LockedStoryProps> = ({ name }) => {
  // Cria um nome de usuário mascarado, ex: "Bruna" -> "bru****"
  const maskedUsername = useMemo(() => {
    if (name.length <= 3) return '*******';
    return `${name.substring(0, 3).toLowerCase()}****`;
  }, [name]);

  // Gera uma URL de imagem de avatar aleatória e consistente
  const avatarUrl = `https://i.pravatar.cc/150?u=${name}`;

  return (
    <div className="flex flex-col items-center flex-shrink-0 space-y-1 text-center relative">
      <div className="w-[70px] h-[70px] rounded-full flex items-center justify-center p-0.5 bg-gray-700">
        <div className="bg-black p-1 rounded-full">
          {/* Imagem desfocada */}
          <img 
            src={avatarUrl} 
            alt="Story bloqueado" 
            className="w-full h-full rounded-full object-cover filter blur-sm" 
          />
        </div>
      </div>
      {/* Nome de usuário mascarado */}
      <span className="text-xs text-gray-400 mt-1 truncate w-16">{maskedUsername}</span>
    </div>
  );
};

export default LockedStory;