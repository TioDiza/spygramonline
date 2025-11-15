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

const profilePics = [
  "https://picsum.photos/id/1005/50/50",
  "https://picsum.photos/id/1011/50/50",
  "https://picsum.photos/id/1012/50/50",
  "https://picsum.photos/id/1013/50/50",
  "https://picsum.photos/id/1014/50/50",
  "https://picsum.photos/id/1015/50/50",
  "https://picsum.photos/id/1016/50/50",
  "https://picsum.photos/id/1018/50/50",
  "https://picsum.photos/id/1020/50/50",
  "https://picsum.photos/id/1025/50/50",
];

const PurchaseNotification: React.FC = () => {
  useEffect(() => {
    const generateNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomItem = purchasedItems[Math.floor(Math.random() * purchasedItems.length)];
      const randomPic = profilePics[Math.floor(Math.random() * profilePics.length)];

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img className="h-10 w-10 rounded-full" src={randomPic} alt="" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">
                  {randomName}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Acabou de comprar <span className="font-bold text-green-400">{randomItem}</span>!
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-700">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <CheckCircle className="h-5 w-5 text-green-500" />
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