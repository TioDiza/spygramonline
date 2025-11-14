import React from 'react';
import { cn } from '../../lib/utils';

interface BackgroundBeamsWithCollisionProps {
  className?: string;
  children?: React.ReactNode;
  // Removendo React.HTMLAttributes<HTMLDivElement> para evitar que props desconhecidas
  // como 'parentRef' e 'containerRef' sejam passadas para o elemento div.
  // Se houver props específicas para as 'beams', elas precisariam ser adicionadas aqui.
}

export const BackgroundBeamsWithCollision: React.FC<BackgroundBeamsWithCollisionProps> = ({
  className,
  children,
  // Não espalhamos '...props' aqui para evitar passar props não reconhecidas para o DOM.
}) => {
  return (
    <div
      className={cn("relative h-screen w-full bg-black flex flex-col items-center justify-center antialiased", className)}
      // Não passamos 'ref' aqui, pois não estamos usando React.forwardRef nesta versão simplificada.
    >
      {children}
      {/* A lógica real para renderizar as 'beams' precisaria ser adicionada aqui,
          mas para resolver o erro de props, estamos começando com uma versão básica. */}
    </div>
  );
};