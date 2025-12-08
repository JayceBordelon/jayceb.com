/* eslint-disable react-hooks/purity */
'use client';

import { motion } from 'framer-motion';

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 8 * position} -${189 + i * 10}C-${
      380 - i * 8 * position
    } -${189 + i * 10} -${312 - i * 8 * position} ${216 - i * 10} ${
      152 - i * 8 * position
    } ${343 - i * 10}C${616 - i * 8 * position} ${470 - i * 10} ${
      684 - i * 8 * position
    } ${875 - i * 10} ${684 - i * 8 * position} ${875 - i * 10}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <svg
      className="w-full h-full text-primary"
      viewBox="-200 -400 1200 1200"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <title>Background Paths</title>
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          stroke="currentColor"
          strokeWidth={path.width}
          strokeOpacity={0.1 + path.id * 0.03}
          initial={{ pathLength: 0.3, opacity: 0.6 }}
          animate={{
            pathLength: 1,
            opacity: [0.3, 0.6, 0.3],
            pathOffset: [0, 1, 0],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        />
      ))}
    </svg>
  );
}

export function BackgroundPaths() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}