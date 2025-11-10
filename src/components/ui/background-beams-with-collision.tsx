import { motion } from "framer-motion"; // Removido AnimatePresence não utilizado
import React, { useRef, useState, useEffect, forwardRef } from "react";
import { cn } from "../../lib/utils";

interface BeamOptions {
  // Define any properties for beamOptions if needed
}

interface BackgroundBeamsProps {
  className?: string;
  children?: React.ReactNode;
  parentRef?: React.RefObject<HTMLDivElement | null>; // Permitir null
  containerRef?: React.RefObject<HTMLDivElement | null>; // Permitir null
  beamOptions?: BeamOptions;
}

const Beam = forwardRef<HTMLDivElement, BackgroundBeamsProps>(
  ({ className, ...props }, ref) => { // Desestruturando className e o resto das props, removendo parâmetros não utilizados e 'ref' não utilizado
    const beamRef = useRef<HTMLDivElement>(null);
    const [beamKey, setBeamKey] = useState(0); // Key to force re-render of beams

    useEffect(() => {
      const interval = setInterval(() => {
        setBeamKey((prevKey: number) => prevKey + 1);
      }, 2000); // Regenerate beams every 2 seconds
      return () => clearInterval(interval);
    }, []);

    const beams = Array.from({ length: 10 }).map((_, i) => {
      const start = Math.random() * 100;
      const end = Math.random() * 100;
      const duration = Math.random() * 5 + 5; // 5-10 seconds
      const delay = Math.random() * 2; // 0-2 seconds delay
      const opacity = Math.random() * 0.5 + 0.5; // 0.5-1 opacity
      const color = `hsl(${Math.random() * 360}, 70%, 70%)`; // Random color

      return (
        <motion.div
          key={`${beamKey}-${i}`} // Use beamKey to force re-render
          initial={{
            x: `${start}%`,
            y: `${start}%`,
            opacity: 0,
            scale: 0.5,
            backgroundColor: color,
          }}
          animate={{
            x: `${end}%`,
            y: `${end}%`,
            opacity: opacity,
            scale: 1,
          }}
          transition={{
            duration: duration,
            delay: delay,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute rounded-full"
          style={{
            width: "2px",
            height: "2px",
            boxShadow: `0 0 10px 5px ${color}`,
          }}
        />
      );
    });

    return (
      <div {...props} className={cn("absolute h-2 w-2", className)} ref={ref}> {/* Usando 'className' e 'ref' corretamente */}
        <motion.div
          ref={beamRef}
          className="absolute inset-0 overflow-hidden"
        >
          {beams}
        </motion.div>
      </div>
    );
  }
);

interface BackgroundBeamsWithCollisionProps {
  className?: string;
  children?: React.ReactNode;
}

export const BackgroundBeamsWithCollision: React.FC<BackgroundBeamsWithCollisionProps> = ({
  className,
  children,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={parentRef}
      className={cn(
        "h-screen w-full relative flex flex-col items-center justify-center antialiased",
        className
      )}
    >
      {children}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          maskImage: "radial-gradient(ellipse at center, white, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, white, transparent 70%)",
        }}
      >
        <Beam parentRef={parentRef} containerRef={containerRef} />
      </div>
    </div>
  );
};