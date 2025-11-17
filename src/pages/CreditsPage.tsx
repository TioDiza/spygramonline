import React from 'react';
import { ShieldCheck, ShoppingCart } from 'lucide-react';
import SparkleButton from '../components/ui/SparkleButton'; // Importa o SparkleButton

const CreditsPage: React.FC = () => {
  const checkoutUrl = "https://go.perfectpay.com.br/PPU38CPUD1S"; // URL de checkout para comprar créditos

  return (
    <div className="min-h-screen bg-black text-white font-sans p-4 sm:p-8 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <img src="/spygram_transparentebranco.png" alt="SpyGram Logo" className="h-8" />
          <span className="text-xl font-bold">SpyGram</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">Créditos: 0</span>
          <span className="text-gray-400 text-sm">@user-403</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto text-center">
        <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg shadow-purple-500/10 p-8 w-full max-w-md flex flex-col items-center">
          <ShoppingCart className="w-20 h-20 text-purple-400 mb-6" />
          <h1 className="text-4xl font-extrabold text-white mb-4">Créditos: 0</h1>
          <p className="text-gray-400 text-lg mb-8">
            Você precisa comprar créditos para acessar os servidores e invadir perfis.
          </p>
          <SparkleButton checkoutUrl={checkoutUrl}>
            Comprar Créditos Agora!
          </SparkleButton>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center mt-auto py-8">
        <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500 text-red-300 px-4 py-2 rounded-full text-sm mb-2">
          <ShieldCheck className="w-4 h-4 text-red-400" />
          <span>Cadeado Site Seguro - SSL Verificado</span>
        </div>
        <p className="text-gray-500 text-xs">Todos os direitos reservados a SpyGram</p>
      </footer>
    </div>
  );
};

export default CreditsPage;