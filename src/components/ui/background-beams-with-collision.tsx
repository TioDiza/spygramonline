"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface BackgroundBeamsProps {
  className?: string;
  quantity?: number; // Número de feixes
  duration?: number; // Duração da animação
  delay?: number; // Atraso entre as animações dos feixes
  beamWidth?: number; // Largura de cada feixe
  beamLength?: number; // Comprimento de cada feixe (para faíscas, será curto)
  children?: React.ReactNode; // Adicionado para permitir elementos filhos
}

const BackgroundBeamsWithCollision: React.FC<BackgroundBeamsProps> = ({
  className,
  quantity = 800,
  duration = 8,
  delay = 0.8,
  beamWidth = 1.5,
  beamLength = 10,
  children,
}) => {
  const [beams, setBeams] = useState<React.ReactElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  // Efeito para atualizar as dimensões do container
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      } else {
        // Fallback para a primeira renderização se a ref ainda não estiver disponível
        setContainerDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    updateDimensions(); // Define as dimensões iniciais

    const handleResize = () => updateDimensions();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Executa apenas uma vez na montagem para configurar o listener de redimensionamento

  // Efeito para gerar os feixes quando as dimensões do container ou outras props mudam
  useEffect(() => {
    const instagramColors = ['#E1306C', '#C13584', '#FCAF45', '#833AB4', '#FD1D1D'];

    const generateBeams = () => {
      const newBeams: React.ReactElement[] = [];
      const { width: currentContainerWidth, height: currentContainerHeight } = containerDimensions;

      // Não gera feixes se as dimensões ainda não foram determinadas
      if (currentContainerWidth === 0 || currentContainerHeight === 0) return;

      for (let i = 0; i < quantity; i++) {
        const initialX = Math.random() * currentContainerWidth; // Distribui por toda a largura do container
        const initialY = -Math.random() * currentContainerHeight; // Começa aleatoriamente acima da tela
        const finalY = currentContainerHeight + beamLength; // Termina abaixo da tela
        const randomColor = instagramColors[Math.floor(Math.random() * instagramColors.length)];
        const rotation = Math.random() * 30 - 15;
        const animationDelay = Math.random() * duration;

        newBeams.push(
          <motion.div
            key={i}
            initial={{ opacity: 0, y: initialY, x: initialX, rotate: rotation }}
            animate={{
              opacity: [0, 0.8, 0.8, 0],
              y: [initialY, finalY],
              rotate: rotation,
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: animationDelay,
              ease: "linear",
              times: [0, 0.1, 0.9, 1],
            }}
            style={{
              position: "absolute",
              width: `${beamWidth}px`,
              height: `${beamLength}px`,
              backgroundColor: randomColor,
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
        );
      }
      setBeams(newBeams);
    };

    generateBeams();
  }, [quantity, duration, delay, beamWidth, beamLength, containerDimensions]); // Re-executa quando as dimensões do container mudam

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden z-0",
        className
      )}
      style={{ width: '100vw', height: '100vh' }} // Garante que o container ocupe 100% da viewport
    >
      {beams}
      {children}
    </div>
  );
};

export { BackgroundBeamsWithCollision };