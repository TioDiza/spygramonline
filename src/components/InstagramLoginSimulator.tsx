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

const InstagramLoginSimulator: React.FC<InstagramLoginSimulatorProps> = ({ profileData, onSuccess }) => {
  const [attemptIndex, setAttemptIndex] = useState(0);
  const [currentPassword, setCurrentPassword] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isError, setIsError] = useState(false);

  const currentAttempt = passwords[attemptIndex];
  const totalAttempts = passwords.length;

  useEffect(() => {
    if (attemptIndex >= totalAttempts) {
      return; // Stop if all attempts are done
    }

    let timer: NodeJS.Timeout | undefined;
    let loginTimeout: NodeJS.Timeout | undefined;
    let errorTimeout: NodeJS.Timeout | undefined;

    if (isTyping) {
      // Phase 1: Typing
      if (currentPassword.length < currentAttempt.length) {
        timer = setTimeout(() => {
          setCurrentPassword(currentAttempt.substring(0, currentPassword.length + 1));
        }, 30); // Velocidade de digitação rápida (30ms)
      } else {
        // Typing finished, transition to login attempt phase
        setIsTyping(false);
        setIsError(false);
        
        const currentIdx = attemptIndex; 

        // Inicia a tentativa de login após a digitação
        loginTimeout = setTimeout(() => {
          // Phase 2: Login attempt (simulated network delay)
          if (currentIdx === totalAttempts - 1) {
            // Success!
            onSuccess();
          } else {
            // Failure, show error briefly
            setIsError(true);
            
            // Phase 3: Reset and move to next attempt after showing error
            errorTimeout = setTimeout(() => {
              setCurrentPassword('');
              setAttemptIndex(prev => prev + 1);
              setIsTyping(true);
              setIsError(false);
            }, 1000); // Aumentado para 1000ms (1 segundo) para estabilidade
          }
        }, 400); // Tempo de espera da tentativa de login (400ms)
      }
    }
    
    // Cleanup function: clears all potential timers
    return () => {
      if (timer) clearTimeout(timer);
      if (loginTimeout) clearTimeout(loginTimeout);
      if (errorTimeout) clearTimeout(errorTimeout);
    };

  }, [attemptIndex, currentPassword, isTyping, currentAttempt, totalAttempts, onSuccess]);

  const getPasswordDisplay = () => {
    if (isTyping) {
      return currentPassword;
    }
    // Show dots during login attempt or error display
    return '•'.repeat(currentPassword.length);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-black text-white flex flex-col items-center justify-center min-h-[600px]">
      <div className="w-full text-center">
        <img
          src="/spygram_transparentebranco.png"
          alt="Instagram Logo"
          className="h-12 mx-auto mb-8"
          style={{ filter: 'invert(1)' }} // Simula o logo do Instagram em dark mode
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
          <div className={`relative w-full transition-all duration-300 ${isError ? 'animate-shake' : ''}`}>
            <input
              type="password"
              value={getPasswordDisplay()}
              readOnly
              placeholder="Senha"
              className={`w-full px-4 py-3 rounded-lg text-sm font-mono
                ${isError ? 'bg-red-900/50 border-red-500 text-red-300' : 'bg-gray-800 border-gray-700 text-white'}
                border focus:outline-none`}
            />
            {isTyping && (
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white animate-pulse">|</span>
            )}
          </div>
        </div>

        <motion.button
          initial={{ opacity: 0.5 }}
          animate={{ opacity: isTyping ? 0.5 : 1 }}
          transition={{ duration: 0.2 }}
          className={`w-full py-3 rounded-lg font-bold text-white text-sm flex items-center justify-center gap-2
            ${isTyping ? 'bg-blue-900/50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 transition-colors'}`}
          disabled={isTyping}
        >
          {isTyping ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Tentando...
            </>
          ) : isError ? (
            `Falha na Tentativa ${attemptIndex + 1}/${totalAttempts}`
          ) : (
            'Entrar'
          )}
        </motion.button>

        <p className="mt-4 text-xs text-gray-500">
          Tentativa {attemptIndex + 1} de {totalAttempts}
        </p>
        
        {isError && (
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