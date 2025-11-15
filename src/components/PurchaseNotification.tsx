"use client";

import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { CheckCircle } from 'lucide-react';

const names = [
  "João S.", "Maria A.", "Pedro R.", "Ana L.", "Carlos M.", "Sofia G.",
  "Lucas P.", "Isabela F.", "Gabriel C.", "Laura B.", "Rafael D.", "Beatriz H."
];

const purchasedItems = [
  "Acesso Total ao Perfil",
  "Pacote Premium SpyGram",
  "Desbloqueio de Mídias Apagadas",
  "Localização em Tempo Real",
  "Histórico de Conversas Secretas"
];

// O array profilePics não é mais necessário, pois as fotos de perfil foram removidas.

const PurchaseNotification: React.FC = () => {
  useEffect(() => {
    const generateNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomItem = purchasedItems[Math.floor(Math.random() * purchasedItems.length)];

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-lg w-full bg-emerald-600 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              {/* A imagem de perfil foi removida daqui */}
              <div className="ml-0 flex-1"> {/* Ajustado ml-3 para ml-0 */}
                <p className="text-lg font-bold text-white"> {/* Aumentado o tamanho e negrito */}
                  {randomName}
                </p>
                <p className="mt-1 text-base text-emerald-100"> {/* Aumentado o tamanho */}
                  Acabou de comprar <span className="font-extrabold text-white">{randomItem}</span>! {/* Mais destaque */}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-emerald-700"> {/* Cor da borda ajustada */}
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-emerald-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <CheckCircle className="h-5 w-5 text-white" /> {/* Ícone branco para contraste */}
            </button>
          </div>
        </div>
      ), {
        duration: 4000, // Duração de cada notificação
      });
    };

    // Gera a primeira notificação após um pequeno atraso
    const initialTimeout = setTimeout(generateNotification, 2000);

    // Gera notificações subsequentes em intervalos aleatórios
    const interval = setInterval(() => {
      const randomDelay = Math.random() * 5000 + 5000; // Entre 5 e 10 segundos
      setTimeout(generateNotification, randomDelay);
    }, 10000); // Verifica a cada 10 segundos para agendar uma nova notificação

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return null; // Este componente não renderiza nada visualmente, apenas dispara toasts
};

export default PurchaseNotification;