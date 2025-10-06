import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface BenefitsCarouselProps {
  benefits: Benefit[];
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const BenefitsCarousel: React.FC<BenefitsCarouselProps> = ({ benefits }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // Garante que o índice sempre esteja dentro dos limites do array
  const benefitIndex = (page % benefits.length + benefits.length) % benefits.length;
  const benefit = benefits[benefitIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative w-full max-w-lg h-[250px] flex items-center justify-center overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-[320px] h-[220px] bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex flex-col items-start gap-4 text-left backdrop-filter backdrop-blur-sm"
        >
          <benefit.icon className="w-10 h-10 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-white">{benefit.title}</h3>
            <p className="text-gray-400 text-sm">{benefit.description}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => paginate(-1)}
        className="absolute left-0 sm:left-8 z-10 p-2 bg-gray-800/70 rounded-full text-white hover:bg-gray-700/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-0 sm:right-8 z-10 p-2 bg-gray-800/70 rounded-full text-white hover:bg-gray-700/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default BenefitsCarousel;