"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface BackgroundBeamsProps {
  className?: string;
  quantity?: number; // Número de feixes
  duration?: number; // Duração da animação
  delay?: number; // Atraso entre as animações dos feixes
  size?: number; // Tamanho de cada feixe (largura do pingo)
  children?: React.ReactNode; // Adicionado para permitir elementos filhos
}

const BackgroundBeamsWithCollision: React.FC<BackgroundBeamsProps> = ({
  className,
  quantity = 400, // Quantidade aumentada para um efeito mais denso
  duration = 8, // Duração da animação (velocidade da queda)
  delay = 0.8, // Atraso entre as animações dos feixes
  size = 1.5, // Tamanho da largura do pingo
  children, // Desestruturado para ser renderizado
}) => {
  const [beams, setBeams] = useState<React.ReactElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const generateBeams = () => {
      const newBeams: React.ReactElement[] = [];
      const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
      const containerHeight = containerRef.current?.offsetHeight || window.innerHeight;

      for (let i = 0; i < quantity; i++) {
        const initialX = Math.random() * containerWidth;
        const initialY = -Math.random() * containerHeight; // Começa aleatoriamente acima da tela
        const finalY = containerHeight + (size * 20); // Termina abaixo da tela, considerando o comprimento do traçante
        const rotation = Math.random() * 360; // Rotação aleatória para variação
        const animationDelay = Math.random() * duration;

        newBeams.push(
          <motion.div
            key={i}
            initial={{ opacity: 0, y: initialY, x: initialX, rotate: rotation }}
            animate={{
              opacity: [0, 0.7, 0.7, 0], // Fade in, permanece opaco, fade out rápido no final
              y: [initialY, finalY], // Queda do topo para o fundo
              scale: [1, 1, 1.2, 1], // Leve aumento de escala no final para efeito de splash
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: animationDelay,
              ease: "linear", // Velocidade de queda consistente
              times: [0, 0.8, 0.9, 1], // Controla quando as mudanças de opacidade e escala acontecem
            }}
            style={{
              position: "absolute",
              width: `${size}px`, // Largura do pingo
              height: `${size * 20}px`, // Comprimento do traçante
              background: `linear-gradient(to bottom, #E1306C, #C13584, #FCAF45, transparent)`, // Gradiente de cores do Instagram
              borderRadius: "50%", // Topo arredondado
              transformOrigin: "center top", // Gira a partir do topo do pingo
            }}
            className="pointer-events-none"
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
  }, [quantity, duration, delay, size]); // Removido 'color' das dependências, pois agora é um gradiente fixo

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