import React, { useState, useCallback } from 'react';
import type { ProfileData } from './types';
import { fetchProfileData } from './services/apiService';
import SearchBar from './components/SearchBar';
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
          0%, 100% { opacity: 0.02; } /* Very subtle */
          50% { opacity: 0.08; } /* Slightly brighter at peak */
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
      `}</style>
      <header className="text-center mb-10 relative w-full max-w-xl">
        {/* Existing general blob background */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 rounded-full blur-3xl opacity-40 animate-blob"></div>
        </div>

        {/* New wrapper for the logo and its specific background */}
        <div className="relative group mx-auto w-fit mb-2">
          {/* The new background for the logo */}
          <div className="absolute -inset-0.5 blur animate-tilt animate-blob animate-logo-background-pulse logo-radial-background"></div>
          
          {/* The logo image itself */}
          <img
            src="/spygram_transparentebranco.png"
            alt="SpyGram Logo"
            className="h-48 md:h-64 relative z-10 animate-logo-float-pulse rounded-full animate-logo-entrance"
          />
        </div>
        <p className="text-gray-400 mt-2">Get insights on any Instagram profile.</p>
      </header>
      
      <main className="w-full flex flex-col items-center">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
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