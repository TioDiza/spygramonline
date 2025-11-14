"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface BackgroundBeamsProps {
  className?: string;
  quantity?: number; // Número de feixes
  duration?: number; // Duração da animação
  delay?: number; // Atraso entre as animações dos feixes
  size?: number; // Tamanho de cada feixe
  color?: string; // Cor dos feixes
  children?: React.ReactNode; // Adicionado para permitir elementos filhos
}

const BackgroundBeamsWithCollision: React.FC<BackgroundBeamsProps> = ({
  className,
  quantity = 300, // Quantidade aumentada para um efeito mais denso
  duration = 10,
  delay = 0.8,
  size = 1.5, // Tamanho maior para um efeito mais visível
  color = "rgba(255, 0, 255, 0.7)", // Roxo/Magenta mais brilhante e opaco
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
        const x = Math.random() * containerWidth;
        const y = Math.random() * containerHeight; // Posição inicial aleatória
        const rotation = Math.random() * 360;
        // const scale = 0.5 + Math.random() * 0.5; // Variável 'scale' removida
        const animationDelay = Math.random() * duration;

        newBeams.push(
          <motion.div
            key={i}
            initial={{ opacity: 0, y: y - containerHeight, rotate: rotation }} // Começa acima da tela, com rotação
            animate={{ opacity: [0, 0.7, 0], y: y + containerHeight * 1.5, rotate: rotation }} // Cai e desaparece
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: animationDelay,
              ease: "linear", // Animação linear para queda constante
            }}
            style={{
              position: "absolute",
              left: x,
              width: `${size}px`,
              height: `${size * 100}px`, // Torná-los feixes verticais e mais longos
              backgroundColor: color,
              borderRadius: "9999px", // Pontas arredondadas
              transformOrigin: "center",
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
  }, [quantity, duration, delay, size, color]);

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