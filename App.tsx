
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
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center p-4 sm:p-8">
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
      `}</style>
      <header className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 pb-2">
          SpyGram
        </h1>
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
