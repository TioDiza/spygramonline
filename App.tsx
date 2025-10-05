import React, { useState, useCallback } from 'react';
import type { ProfileData } from './types';
import { fetchProfileData } from './services/apiService';
import CustomSearchBar from './components/ui/CustomSearchBar';
import SparkleButton from './components/ui/SparkleButton'; // Importação do novo botão
import ProfileCard from './components/ProfileCard';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    setProfile(null);
    try {
      const data = await fetchProfileData(query);
      setProfile(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleButtonClick = () => {
    // Ação do botão, por exemplo, disparar a busca com um valor padrão ou o último valor pesquisado
    // Por enquanto, apenas um console.log
    console.log('Botão "Invadir Perfil" clicado!');
    // Se você quiser que ele dispare a busca com o último query, precisaria passar o query para o App
    // ou ter um estado para o query aqui. Por simplicidade, vou deixar apenas o log.
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center p-4 sm:p-8 overflow-hidden">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        @keyframes tilt {
          0%, 50%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(0.5deg); }
          75% { transform: rotate(-0.5deg); }
        }
        .animate-tilt {
          animation: tilt 10s infinite linear;
        }
        @keyframes logo-float-pulse {
          0% { transform: translateY(0) scale(1); }
          25% { transform: translateY(-5px) scale(1.02); }
          50% { transform: translateY(0) scale(1.04); }
          75% { transform: translateY(5px) scale(1.02); }
          100% { transform: translateY(0) scale(1); }
        }
        .animate-logo-float-pulse {
          animation: logo-float-pulse 4s infinite ease-in-out;
        }
        @keyframes blob-animation {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        .animate-blob {
          animation: blob-animation 10s infinite alternate;
        }
        @keyframes logo-entrance {
          from { opacity: 0; transform: translateY(50px) scale(0.8); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-logo-entrance {
          animation: logo-entrance 1s ease-out forwards;
        }
        @keyframes logo-background-pulse {
          0%, 100% { opacity: 0.03; } /* Opacidade inicial mais visível */
          50% { opacity: 0.10; } /* Pico de opacidade mais forte */
        }
        .animate-logo-background-pulse {
          animation: logo-background-pulse 3s infinite ease-in-out alternate;
        }
        .logo-radial-background {
          background-image: radial-gradient(circle at center,
            rgba(236, 72, 153, 0.4) 0%, /* pink-600, 40% opacity */
            rgba(147, 51, 234, 0.2) 50%, /* purple-600, 20% opacity */
            rgba(251, 191, 36, 0) 100% /* yellow-500, 0% opacity */
          );
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-pulse {
          animation: pulse 1s infinite;
        }
      `}</style>
      <header className="text-center mb-10 relative w-full max-w-xl">
        {/* Existing general blob background */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 rounded-full blur-3xl opacity-40 animate-blob"></div>
        </div>

        {/* New wrapper for the logo and its specific background */}
        <div className="relative group mx-auto w-fit mb-4"> {/* Adicionado mb-4 para espaçamento */}
          {/* The new background for the logo */}
          <div className="absolute -inset-0.5 blur animate-tilt animate-blob animate-logo-background-pulse logo-radial-background"></div>
          
          {/* The logo image itself */}
          <img
            src="/spygram_transparentebranco.png"
            alt="SpyGram Logo"
            className="h-48 md:h-64 relative z-10 animate-logo-float-pulse rounded-full animate-logo-entrance"
          />
        </div>

        {/* Nova frase adicionada aqui */}
        <p className="text-center text-xl md:text-2xl font-bold mt-4 animate-fade-in">
          <span className="text-white">ACESSE O </span>
          <span className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">INSTAGRAM</span>
          <span className="text-white"> DE QUALQUER PESSOA, </span>
          <span className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">SEM SENHA</span>
          <span className="text-white">, APENAS COM O @</span>
        </p>
      </header>
      
      <main className="w-full flex flex-col items-center">
        <CustomSearchBar onSearch={handleSearch} isLoading={isLoading} />
        <SparkleButton onClick={handleButtonClick} disabled={isLoading}>
          Invadir Perfil
        </SparkleButton>
        <div className="w-full mt-4">
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {profile && <ProfileCard data={profile} />}
        </div>
      </main>
    </div>
  );
};

export default App;