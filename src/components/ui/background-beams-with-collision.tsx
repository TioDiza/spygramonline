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
  quantity = 400, // Ajustado para uma quantidade boa sem ser exagerada
  duration = 10, // Duração da animação (velocidade da queda)
  delay = 0.8, // Atraso entre as animações dos feixes
  beamWidth = 2, // Largura do feixe (mais visível)
  beamLength = 80, // Comprimento do feixe (mais visível)
  children, // Desestruturado para ser renderizado
}) => {
  const [beams, setBeams] = useState<React.ReactElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Forçar o uso das dimensões da janela para garantir cobertura total
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    const generateBeams = () => {
      const newBeams: React.ReactElement[] = [];

      for (let i = 0; i < quantity; i++) {
        const initialX = Math.random() * containerWidth; // Distribui por toda a largura da janela
        const initialY = -Math.random() * containerHeight; // Começa aleatoriamente acima da tela
        const finalY = containerHeight + beamLength; // Termina abaixo da tela

        const animationDelay = Math.random() * duration;

        newBeams.push(
          <motion.div
            key={i}
            initial={{ opacity: 0, y: initialY, x: initialX }}
            animate={{
              opacity: [0, 0.6, 0.6, 0], // Fade in, permanece opaco, fade out ao sair da tela
              y: [initialY, finalY], // Queda do topo para o fundo
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: animationDelay,
              ease: "linear", // Velocidade de queda consistente
              times: [0, 0.1, 0.9, 1], // Controla quando as mudanças de opacidade acontecem
            }}
            style={{
              position: "absolute",
              width: `${beamWidth}px`, // Largura do feixe
              height: `${beamLength}px`, // Comprimento do feixe
              background: `linear-gradient(to bottom, #E1306C, #C13584, #FCAF45, transparent)`, // Gradiente de cores do Instagram
              borderRadius: "9999px", // Pontas arredondadas para o rastro
              pointerEvents: "none",
            }}
          />
        );
      }
      setBeams(newBeams);
    };

    generateBeams();
    // Regenerar feixes se a janela for redimensionada
    const handleResize = () => generateBeams();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [quantity, duration, delay, beamWidth, beamLength]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "h-full w-full absolute inset-0 overflow-hidden z-0", // z-0 para garantir que esteja no fundo
        className
      )}
    >
      {beams}
      {children} {/* Renderiza os elementos filhos aqui */}
    </div>
  );
};

export { BackgroundBeamsWithCollision };