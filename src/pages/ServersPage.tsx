import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface ServerCardProps {
  serverNumber: number;
  ping: number;
}

const ServerCard: React.FC<ServerCardProps> = ({ serverNumber, ping }) => {
  // Calcula a largura da barra de ping baseada no ping (quanto menor o ping, mais cheia a barra)
  // Invertemos a lógica para que pings menores (melhores) mostrem mais preenchimento
  const maxPing = 100; // Ping máximo para escala
  const fillPercentage = Math.max(0, Math.min(100, 100 - (ping / maxPing) * 100));

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 w-full max-w-[200px] flex flex-col items-start">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        <span className="text-white font-semibold text-sm">SERVER #{serverNumber}</span>
      </div>
      <p className="text-gray-400 text-xs mb-3">Ping: {ping}ms</p>
      <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
          style={{ width: `${fillPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const ServersPage: React.FC = () => {
  const servers = [
    { id: 0, ping: 24 },
    { id: 1, ping: 88 },
    { id: 2, ping: 52 },
    { id: 3, ping: 77 },
    { id: 4, ping: 82 },
    { id: 5, ping: 12 },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans p-4 sm:p-8">
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
      <main className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <img src="/spygram_transparentebranco.png" alt="SpyGram Logo Icon" className="h-16" />
          <div>
            <h1 className="text-5xl font-extrabold text-white mb-2">SERVERS</h1>
            <p className="text-gray-400 text-sm max-w-xl">
              DEVIDO À ALTA DEMANDA E COMPLEXIDADE DOS NOSSOS SERVIÇOS, CRIAMOS VÁRIOS SERVIDORES ONDE O USUÁRIO PODE VER E ESCOLHER O MELHOR PARA ELE, DEPENDENDO DE SUA LOCALIDADE.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-12 mb-8">ESCOLHA UM DOS SERVIDORES ABAIXO</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
          {servers.map((server) => (
            <ServerCard key={server.id} serverNumber={server.id} ping={server.ping} />
          ))}
        </div>

        <div className="flex items-center gap-2 text-gray-400 text-sm mb-20">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          <span>390 Usuários Online</span>
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

export default ServersPage;