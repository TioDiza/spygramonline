import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PurchaseNotificationProps {
  initialDelay?: number;
  duration?: number;
}

const mockBuyers = [
  { name: 'Carlos M.', item: 'Pacote Premium SpyGram!' },
  { name: 'Juliana S.', item: 'Créditos Ilimitados' },
  { name: 'Pedro H.', item: '10 Créditos' },
];

const PurchaseNotification: React.FC<PurchaseNotificationProps> = ({ initialDelay = 5000, duration = 8000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentBuyer, setCurrentBuyer] = useState(mockBuyers[0]);

  useEffect(() => {
    // Inicia a primeira notificação após o delay inicial
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, initialDelay);

    // Ciclo de notificações
    const cycleInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        const nextIndex = (mockBuyers.indexOf(currentBuyer) + 1) % mockBuyers.length;
        setCurrentBuyer(mockBuyers[nextIndex]);
        setIsVisible(true);
      }, 500); // Pequeno delay para a animação de saída/entrada
    }, duration);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(cycleInterval);
    };
  }, [initialDelay, duration, currentBuyer]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="fixed bottom-4 left-4 z-50 max-w-xs"
        >
          <div className="bg-green-700/90 backdrop-blur-sm rounded-lg shadow-xl p-3 flex items-center gap-3 border border-green-500">
            <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
            <div className="text-white text-xs">
              <p className="font-bold">{currentBuyer.name}</p>
              <p>Acabou de comprar <span className="font-semibold">{currentBuyer.item}</span></p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PurchaseNotification;