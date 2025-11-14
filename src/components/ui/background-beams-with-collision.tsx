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
  beamLength?: number; // Comprimento de cada feixe
  children?: React.ReactNode; // Adicionado para permitir elementos filhos
}

const BackgroundBeamsWithCollision: React.FC<BackgroundBeamsProps> = ({
  className,
  quantity = 105, // Mantido em 105
  duration = 8,
  delay = 0.8,
  beamWidth = 1.5, // Largura fina para as linhas
  beamLength = 80, // Comprimento maior para as linhas
  children,
}) => {
  const [beams, setBeams] = useState<React.ReactElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      } else {
        setContainerDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    updateDimensions();

    const handleResize = () => updateDimensions();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const instagramColors = ['#E1306C', '#C13584', '#FCAF45', '#833AB4', '#FD1D1D'];

    const generateBeams = () => {
      const newBeams: React.ReactElement[] = [];
      const { width: currentContainerWidth, height: currentContainerHeight } = containerDimensions;

      if (currentContainerWidth === 0 || currentContainerHeight === 0) return;

      for (let i = 0; i < quantity; i++) {
        const initialX = Math.random() * currentContainerWidth;
        const initialY = -Math.random() * currentContainerHeight; // Começa acima da tela
        const finalY = currentContainerHeight + beamLength; // Termina abaixo da tela
        
        const startColor = instagramColors[Math.floor(Math.random() * instagramColors.length)];
        let endColor = instagramColors[Math.floor(Math.random() * instagramColors.length)];
        while (endColor === startColor) { // Garante cores de início e fim diferentes
          endColor = instagramColors[Math.floor(Math.random() * instagramColors.length)];
        }
        const gradient = `linear-gradient(to bottom, ${startColor}, ${endColor})`;

        const rotation = Math.random() * 30 - 15; // Leve rotação para um efeito mais dinâmico
        const animationDelay = Math.random() * duration;

        newBeams.push(
          <motion.div
            key={i}
            initial={{ opacity: 0, y: initialY, x: initialX, rotate: rotation, scale: 1 }}
            animate={{
              opacity: [0, 1, 1, 0], // Fade in, permanece opaco, fade out
              y: [initialY, finalY], // Queda do topo para o fundo
              rotate: rotation, // Mantém a rotação constante
              scale: 1, // Sem efeito de escala de "explosão"
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: animationDelay,
              ease: "linear",
              times: [0, 0.05, 0.95, 1], // Fade in rápido, visível na maior parte, fade out rápido
            }}
            style={{
              position: "absolute",
              width: `${beamWidth}px`,
              height: `${beamLength}px`,
              background: gradient, // Aplica o gradiente de cores
              borderRadius: "1px", // Levemente arredondado nas pontas
              pointerEvents: "none",
            }}
          />
        );
      }
      setBeams(newBeams);
    };

    generateBeams();
  }, [quantity, duration, delay, beamWidth, beamLength, containerDimensions]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden z-0",
        className
      )}
      style={{ width: '100vw', height: '100vh' }}
    >
      {beams}
      {children}
    </div>
  );
};

export { BackgroundBeamsWithCollision };