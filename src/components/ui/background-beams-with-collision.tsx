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
  quantity = 600, // Aumentado para maior densidade, como na imagem
  duration = 8, // Duração da animação (velocidade da queda)
  delay = 0.8, // Atraso entre as animações dos feixes
  beamWidth = 1.5, // Largura do feixe
  beamLength = 10, // Comprimento do feixe (curto para faíscas)
  children, // Desestruturado para ser renderizado
}) => {
  const [beams, setBeams] = useState<React.ReactElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const instagramColors = ['#E1306C', '#C13584', '#FCAF45', '#833AB4', '#FD1D1D']; // Paleta de cores do Instagram

    const generateBeams = () => {
      const newBeams: React.ReactElement[] = [];
      const containerWidth = window.innerWidth; // Usa a largura total da janela
      const containerHeight = window.innerHeight; // Usa a altura total da janela

      for (let i = 0; i < quantity; i++) {
        const initialX = Math.random() * containerWidth; // Distribui por toda a largura
        const initialY = -Math.random() * containerHeight; // Começa aleatoriamente acima da tela
        const finalY = containerHeight + beamLength; // Termina abaixo da tela
        const randomColor = instagramColors[Math.floor(Math.random() * instagramColors.length)]; // Cor aleatória por pingo
        const rotation = Math.random() * 30 - 15; // Rotação aleatória entre -15 e 15 graus
        const animationDelay = Math.random() * duration;

        newBeams.push(
          <motion.div
            key={i}
            initial={{ opacity: 0, y: initialY, x: initialX, rotate: rotation }}
            animate={{
              opacity: [0, 0.8, 0.8, 0], // Fade in, permanece opaco, fade out ao sair da tela
              y: [initialY, finalY], // Queda do topo para o fundo
              rotate: rotation, // Mantém a rotação constante durante a queda
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
              width: `${beamWidth}px`,
              height: `${beamLength}px`,
              backgroundColor: randomColor, // Usa uma cor sólida aleatória
              borderRadius: "50%", // Para parecer um ponto/oval pequeno
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