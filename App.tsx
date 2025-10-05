import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import type { ProfileData } from './types';
import { fetchProfileData } from './services/apiService';
import CustomSearchBar from './components/ui/CustomSearchBar';
import SparkleButton from './components/ui/SparkleButton';
import ProfileCard from './components/ProfileCard';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import ConsentCheckbox from './src/components/ConsentCheckbox';
import { BackgroundBeamsWithCollision } from './src/components/ui/background-beams-with-collision';
import { Lock } from 'lucide-react'; // Importando o ícone de cadeado

// Componente principal que contém a lógica de pesquisa e roteamento
const MainAppContent: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasConsented, setHasConsented] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Estado para o input de pesquisa
  const navigate = useNavigate();

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setError('Por favor, insira um nome de usuário.');
      return;
    }
    if (!hasConsented) {
      setError('Você precisa consentir para acessar o perfil.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setProfile(null); // Limpa o perfil anterior antes de uma nova busca

    try {
      const data = await fetchProfileData(searchQuery.trim());
      setProfile(data);
      navigate('/results', { state: { profileData: data } }); // Navega para a página de resultados com os dados
    } catch (err) {
      if (err instanceof Error) {
        // Verifica se é um erro de sobrecarga ou erro de rede
        if (err.message.includes('Network response was not ok') || err.message.includes('Failed to fetch')) {
          navigate('/overload'); // Navega para a página de sobrecarga
        } else {
          setError(err.message);
        }
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, hasConsented, navigate]);

  return (
    <BackgroundBeamsWithCollision className="min-h-screen">
      <div className="relative z-20 text-white font-sans flex flex-col items-center p-4 sm:p-8 overflow-hidden w-full">
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
          <div className="relative group mx-auto w-fit mb-4">
            <div className="absolute -inset-0.5 blur animate-tilt animate-blob animate-logo-background-pulse logo-radial-background"></div>
            
            <img
              src="/spygram_transparentebranco.png"
              alt="SpyGram Logo"
              className="h-48 md:h-64 relative z-10 animate-logo-float-pulse rounded-full animate-logo-entrance"
            />
          </div>

          <p className="text-center text-xl md:text-2xl font-bold mt-4 animate-fade-in">
            <span className="text-white">ACESSE O </span>
            <span className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">INSTAGRAM</span>
            <span className="text-white"> DE QUALQUER PESSOA, </span>
            <span className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">SEM SENHA</span>
            <span className="text-white">, APENAS COM O @</span>
          </p>
        </header>
        
        <main className="w-full flex flex-col items-center">
          <CustomSearchBar 
            query={searchQuery} 
            setQuery={setSearchQuery} 
            isLoading={isLoading} 
          />
          <div className="mt-6 flex justify-center">
            <ConsentCheckbox checked={hasConsented} onChange={setHasConsented} />
          </div>
          <div className="mt-6">
            <SparkleButton onClick={handleSearch} disabled={isLoading || !hasConsented}>
              Invadir Conta
            </SparkleButton>
          </div>
          <div className="w-full mt-4">
            {isLoading && <Loader />}
            {error && <ErrorMessage message={error} />}
            {/* O ProfileCard não será mais exibido aqui, mas sim na ResultsPage */}
          </div>
        </main>

        <footer className="mt-16 text-center text-gray-400 text-sm">
          <div className="flex items-center justify-center mb-2">
            <Lock className="w-4 h-4 mr-1 text-green-500" />
            <span>SSL Verificado</span>
          </div>
          <p>Todos os direitos reservados a SpyGram</p>
        </footer>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

// Componente App que configura o Router
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainAppContent />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/overload" element={<OverloadPage />} />
      </Routes>
    </Router>
  );
};

export default App;