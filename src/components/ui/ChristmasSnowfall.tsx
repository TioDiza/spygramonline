"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface SnowflakeProps {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

const generateSnowflake = (containerWidth: number, containerHeight: number): SnowflakeProps => ({
  id: Math.random().toString(36).substring(2, 9),
  x: Math.random() * containerWidth,
  y: -Math.random() * containerHeight, // Começa acima da tela
  size: Math.random() * 3 + 1, // Tamanho entre 1px e 4px
  opacity: Math.random() * 0.7 + 0.3, // Opacidade entre 0.3 e 1
  duration: Math.random() * 10 + 5, // Duração entre 5s e 15s
  delay: Math.random() * 10, // Atraso entre 0s e 10s
});

const ChristmasSnowfall: React.FC<{ className?: string; children?: React.ReactNode }> = ({ className, children }) => {
  const [snowflakes, setSnowflakes] = useState<SnowflakeProps[]>([]);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setContainerDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (containerDimensions.width === 0 || containerDimensions.height === 0) return;

    const numSnowflakes = 100; // Quantidade de flocos de neve
    const initialSnowflakes = Array.from({ length: numSnowflakes }).map(() =>
      generateSnowflake(containerDimensions.width, containerDimensions.height)
    );
    setSnowflakes(initialSnowflakes);
  }, [containerDimensions]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden z-0", className)}>
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          initial={{ y: flake.y, x: flake.x, opacity: flake.opacity }}
          animate={{ y: containerDimensions.height + flake.size, x: flake.x + Math.sin(flake.delay) * 20 }} // Adiciona um pequeno movimento lateral
          transition={{
            duration: flake.duration,
            repeat: Infinity,
            delay: flake.delay,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Flocos brancos
            borderRadius: "50%",
            filter: "blur(0.5px)", // Suaviza as bordas
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}
      {children}
    </div>
  );
};

export { ChristmasSnowfall };