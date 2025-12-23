import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { ProfileData } from '../../types';

interface InstagramLoginSimulatorProps {
  profileData: ProfileData;
  onSuccess: () => void;
  isHacking: boolean;
}

type AttemptStage = 'typing' | 'attempting' | 'error' | 'success';

const generateRandomPassword = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  const length = Math.floor(Math.random() * 5) + 8; // 8 a 12 caracteres
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const InstagramLoginSimulator: React.FC<InstagramLoginSimulatorProps> = ({ profileData, onSuccess, isHacking }) => {
  const [attemptCount, setAttemptCount] = useState(1);
  const [currentPassword, setCurrentPassword] = useState('');
  const [displayedPassword, setDisplayedPassword] = useState('');
  const [stage, setStage] = useState<AttemptStage>('typing');
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Efeito principal que controla o ciclo de tentativas
  useEffect(() => {
    // Se não estiver mais "hackeando", interrompe o ciclo.
    if (!isHacking) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      // Inicia a sequência de sucesso
      setStage('typing');
      setCurrentPassword('biel_2805@'); // A senha "correta"
      setDisplayedPassword('');
      return;
    }

    // Lógica do ciclo de tentativas
    if (stage === 'typing') {
      if (displayedPassword.length < currentPassword.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedPassword(prev => currentPassword.substring(0, prev.length + 1));
        }, 40);
      } else {
        setStage('attempting');
      }
    } else if (stage === 'attempting') {
      timeoutRef.current = setTimeout(() => {
        // Se não estiver mais hackeando, a tentativa é um sucesso
        if (!isHacking) {
          setStage('success');
        } else {
          setStage('error');
        }
      }, 500);
    } else if (stage === 'error') {
      timeoutRef.current = setTimeout(() => {
        setAttemptCount(prev => prev + 1);
        setCurrentPassword(generateRandomPassword());
        setDisplayedPassword('');
        setStage('typing');
      }, 700);
    } else if (stage === 'success') {
        // Aguarda um momento na tela de sucesso e então chama o callback
        timeoutRef.current = setTimeout(onSuccess, 1000);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [stage, displayedPassword, currentPassword, isHacking, onSuccess]);

  // Efeito para iniciar a primeira tentativa
  useEffect(() => {
    setCurrentPassword(generateRandomPassword());
  }, []);

  const getPasswordDisplay = () => {
    if (stage === 'typing') return displayedPassword;
    return '•'.repeat(currentPassword.length);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-black text-white flex flex-col items-center justify-center min-h-[600px]">
      <div className="w-full text-center">
        <img
          src="/spygram_transparentebranco.png"
          alt="Instagram Logo"
          className="h-12 mx-auto mb-8"
          style={{ filter: 'invert(1)' }}
        />
        
        <div className="mb-6">
          <img
            src={profileData.profilePicUrl}
            alt={profileData.username}
            className="w-20 h-20 rounded-full mx-auto mb-2 border-2 border-gray-700"
          />
          <p className="text-lg font-semibold text-gray-300">@{profileData.username}</p>
        </div>

        <div className="w-full mb-4">
          <input
            type="text"
            value={profileData.username}
            readOnly
            className="w-full bg-gray-800 text-gray-400 px-4 py-3 rounded-lg border border-gray-700 text-sm mb-3"
          />
          <div className={`relative w-full transition-all duration-300 ${stage === 'error' ? 'animate-shake' : ''}`}>
            <input
              type="password"
              value={getPasswordDisplay()}
              readOnly
              placeholder="Senha"
              className={`w-full px-4 py-3 rounded-lg text-sm font-mono
                ${stage === 'error' ? 'bg-red-900/50 border-red-500 text-red-300' : ''}
                ${stage === 'success' ? 'bg-green-900/50 border-green-500 text-green-300' : ''}
                ${stage !== 'error' && stage !== 'success' ? 'bg-gray-800 border-gray-700 text-white' : ''}
                border focus:outline-none`}
            />
            {stage === 'typing' && (
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white animate-pulse">|</span>
            )}
          </div>
        </div>

        <motion.button
          className={`w-full py-3 rounded-lg font-bold text-white text-sm flex items-center justify-center gap-2
            ${stage === 'error' ? 'bg-red-500' : ''}
            ${stage === 'success' ? 'bg-green-500' : ''}
            ${stage !== 'error' && stage !== 'success' ? 'bg-blue-500' : ''}
            transition-colors`}
          disabled={true}
        >
          {stage === 'typing' && <><Loader2 className="w-4 h-4 animate-spin" /> Digitando...</>}
          {stage === 'attempting' && <><Loader2 className="w-4 h-4 animate-spin" /> Verificando...</>}
          {stage === 'error' && `Falha na Tentativa ${attemptCount}`}
          {stage === 'success' && `Senha Encontrada!`}
        </motion.button>

        <p className="mt-4 text-xs text-gray-500">
          Tentativa {attemptCount}
        </p>
        
        {stage === 'error' && (
          <p className="text-red-400 text-xs mt-2">
            Senha incorreta. Tente novamente.
          </p>
        )}
        
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
          }
          .animate-shake {
            animation: shake 0.3s ease-in-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default InstagramLoginSimulator;