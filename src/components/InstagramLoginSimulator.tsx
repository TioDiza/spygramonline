import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { ProfileData } from '../../types';

interface InstagramLoginSimulatorProps {
  profileData: ProfileData;
  onSuccess: () => void;
}

const passwords = [
  '123456', 'senhaforte', 'amordaminhavida', 'dataaniversario', 'password123',
  'iloveyou', 'meuamor', 'segredinho', 'melhoramigo', 'senhainvalida',
  'spygram123', 'acessototal', 'verdadeoculta', 'senhacerta' // The successful one
];

type AttemptStage = 'typing' | 'attempting' | 'error';

const InstagramLoginSimulator: React.FC<InstagramLoginSimulatorProps> = ({ profileData, onSuccess }) => {
  const [attemptIndex, setAttemptIndex] = useState(0);
  const [currentPassword, setCurrentPassword] = useState('');
  const [stage, setStage] = useState<AttemptStage>('typing');

  const currentAttempt = passwords[attemptIndex];
  const totalAttempts = passwords.length;

  useEffect(() => {
    if (attemptIndex >= totalAttempts) return;

    let timer: NodeJS.Timeout | undefined;

    if (stage === 'typing') {
      if (currentPassword.length < currentAttempt.length) {
        timer = setTimeout(() => {
          setCurrentPassword(prev => currentAttempt.substring(0, prev.length + 1));
        }, 80); // Typing speed slowed down slightly to 80ms
      } else {
        // Finished typing, move to attempting stage
        setStage('attempting');
      }
    } else if (stage === 'attempting') {
      // Simulate login attempt delay
      timer = setTimeout(() => {
        if (attemptIndex === totalAttempts - 1) {
          onSuccess();
        } else {
          setStage('error');
        }
      }, 1000); // 1 second for "verifying"
    } else if (stage === 'error') {
      // Show error for a moment, then move to the next attempt
      timer = setTimeout(() => {
        setAttemptIndex(prev => prev + 1);
        setCurrentPassword('');
        setStage('typing');
      }, 1500); // 1.5 seconds for error display
    }

    return () => clearTimeout(timer);
  }, [attemptIndex, currentPassword, stage, currentAttempt, totalAttempts, onSuccess]);

  const getPasswordDisplay = () => {
    if (stage === 'typing') {
      return currentPassword;
    }
    // Show dots during login attempt or error display
    return '•'.repeat(currentAttempt.length);
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
                ${stage === 'error' ? 'bg-red-900/50 border-red-500 text-red-300' : 'bg-gray-800 border-gray-700 text-white'}
                border focus:outline-none`}
            />
            {stage === 'typing' && (
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white animate-pulse">|</span>
            )}
          </div>
        </div>

        <motion.button
          className={`w-full py-3 rounded-lg font-bold text-white text-sm flex items-center justify-center gap-2
            ${stage === 'error' ? 'bg-red-500' : 'bg-blue-500'} transition-colors`}
          disabled={true}
        >
          {stage === 'typing' && <><Loader2 className="w-4 h-4 animate-spin" /> Digitando...</>}
          {stage === 'attempting' && <><Loader2 className="w-4 h-4 animate-spin" /> Verificando...</>}
          {stage === 'error' && `Falha na Tentativa ${attemptIndex + 1}/${totalAttempts}`}
        </motion.button>

        <p className="mt-4 text-xs text-gray-500">
          Tentativa {attemptIndex + 1} de {totalAttempts}
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