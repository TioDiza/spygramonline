import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, RefreshCw } from 'lucide-react';

const GuaranteeBanner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-16 p-4 text-center w-full max-w-md mx-auto relative" // Estilo de card removido
    >
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <ShieldCheck className="w-10 h-10 text-green-500" />
          <h2 className="text-3xl font-extrabold text-white uppercase">
            GARANTIA TOTAL
          </h2>
          <RefreshCw className="w-10 h-10 text-green-500 animate-spin-slow" />
        </div>

        <p className="text-xl text-gray-200 mb-4 font-medium">
          Se você não gostar do que encontrar, ou se o acesso falhar:
        </p>
        
        {/* Destaque da Garantia */}
        <div className="inline-block p-4 border-4 border-green-600 rounded-xl bg-black/50 shadow-lg shadow-green-500/20">
          <span className="text-5xl font-extrabold text-green-400 block leading-none">
            7 DIAS
          </span>
          <span className="text-lg text-green-300 block mt-1 font-semibold">DE REEMBOLSO GARANTIDO</span>
        </div>

        <p className="text-base text-yellow-300 mt-6 font-semibold">
          Sua satisfação é nossa prioridade. Compre com total tranquilidade.
        </p>
      </div>
    </motion.div>
  );
};

export default GuaranteeBanner;