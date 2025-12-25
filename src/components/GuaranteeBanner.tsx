import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, RefreshCw } from 'lucide-react';

const GuaranteeBanner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-12 p-6 bg-green-900/30 border-2 border-green-600 rounded-xl shadow-2xl shadow-green-500/20 text-center w-full max-w-md mx-auto relative overflow-hidden"
    >
      {/* Efeito de fundo sutil */}
      <div className="absolute inset-0 bg-green-900 opacity-50 animate-pulse-slow"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <ShieldCheck className="w-8 h-8 text-green-400" />
          <h2 className="text-2xl font-extrabold text-white uppercase">
            GARANTIA TOTAL
          </h2>
          <RefreshCw className="w-8 h-8 text-green-400 animate-spin-slow" />
        </div>

        <p className="text-lg text-gray-200 mb-3 font-medium">
          Se você não gostar do que encontrar, ou se o acesso falhar:
        </p>
        
        <div className="bg-black/50 border border-green-700 rounded-lg p-3 inline-block">
          <span className="text-3xl font-mono font-bold text-green-300">
            7 DIAS
          </span>
          <span className="text-sm text-green-400 block mt-1">DE REEMBOLSO GARANTIDO</span>
        </div>

        <p className="text-sm text-yellow-300 mt-4 font-semibold">
          Sua satisfação é nossa prioridade. Compre com total tranquilidade.
        </p>
      </div>
    </motion.div>
  );
};

export default GuaranteeBanner;