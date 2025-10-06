import { motion } from "framer-motion"; // Removido AnimatePresence
import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { cn } from "../../lib/utils";

interface BeamOptions {
  color?: string;
  duration?: number;
  delay?: number;
  strokeWidth?: number;
  randomize?: boolean;
}

interface BackgroundBeamsWithCollisionProps {
  className?: string;
  children?: React.ReactNode;
  beamOptions?: BeamOptions;
}

interface BeamProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  duration?: number;
  delay?: number;
  strokeWidth?: number;
  randomize?: boolean;
}

const Beam = forwardRef<HTMLDivElement, BeamProps>(
  ({ color = "#94a3b8", duration = 10, delay = 0, strokeWidth = 1, randomize = true, ...props }, ref) => {
    const [path, setPath] = useState("");
    const beamRef = useRef<HTMLDivElement>(null);

    const calculatePath = () => {
      if (!beamRef.current) return;

      const { width, height } = beamRef.current.getBoundingClientRect();
      const startX = randomize ? Math.random() * width : width / 2;
      const startY = randomize ? Math.random() * height : height / 2;
      const endX = randomize ? Math.random() * width : width / 2;
      const endY = randomize ? Math.random() * height : height / 2;

      setPath(`M${startX},${startY} L${endX},${endY}`);
    };

    useEffect(() => {
      calculatePath();
      const interval = setInterval(calculatePath, (duration + delay) * 1000);
      return () => clearInterval(interval);
    }, [duration, delay, randomize]);

    return (
      <div {...props} ref={ref} className={cn("absolute h-2 w-2", props.className)}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: delay }}
          className="absolute inset-0"
        >
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${beamRef.current?.offsetWidth || 0} ${beamRef.current?.offsetHeight || 0}`}
            preserveAspectRatio="none"
            className="absolute inset-0"
          >
            <motion.path
              d={path}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: duration, ease: "linear", delay: delay }}
            />
          </svg>
        </motion.div>
      </div>
    );
  }
);

const BackgroundBeamsWithCollision = forwardRef<HTMLDivElement, BackgroundBeamsWithCollisionProps>(
  ({ className, children, beamOptions = {} as BeamOptions }, ref) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [beamKey, setBeamKey] = useState(0); // Key to force re-render of beams

    useImperativeHandle(ref, () => parentRef.current!);

    useEffect(() => {
      const handleResize = () => {
        setBeamKey((prevKey: number) => prevKey + 1); // Force re-render beams on resize
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const beams = Array.from({ length: 10 }).map((_, i) => (
      <Beam
        key={`${beamKey}-${i}`} // Use beamKey to force re-render
        className="absolute inset-0"
        color={beamOptions.color}
        duration={beamOptions.duration}
        delay={beamOptions.delay ? beamOptions.delay * i : i * 0.1}
        strokeWidth={beamOptions.strokeWidth}
        randomize={beamOptions.randomize}
      />
    ));

    return (
      <div
        ref={parentRef}
        className={cn(
          "h-screen w-full relative flex items-center justify-center antialiased",
          className
        )}
      >
        {children}
        <div
          ref={containerRef}
          className="absolute inset-0 z-10 overflow-hidden"
          style={{
            maskImage: `radial-gradient(ellipse at center, white, transparent 70%)`,
            WebkitMaskImage: `radial-gradient(ellipse at center, white, transparent 70%)`,
          }}
        >
          {beams}
        </div>
      </div>
    );
  }
);

export { BackgroundBeamsWithCollision, Beam };