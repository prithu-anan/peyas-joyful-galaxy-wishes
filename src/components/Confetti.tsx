
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: string;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

const Confetti = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  
  useEffect(() => {
    // Generate confetti pieces
    const colors = [
      '#9b87f5', // Purple
      '#D946EF', // Pink
      '#0EA5E9', // Teal
      '#F97316', // Orange
      '#FDE68A', // Yellow
    ];
    
    const pieces: ConfettiPiece[] = [];
    
    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        x: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 7,
        size: 5 + Math.random() * 15,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    setConfetti(pieces);
    
    // Cleanup
    return () => setConfetti([]);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="confetti"
          style={{
            left: piece.x,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.3 ? '50%' : '0',
          }}
          initial={{ top: '-10%', rotate: 0, opacity: 1 }}
          animate={{
            top: '110%',
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            x: [0, 50 * (Math.random() > 0.5 ? 1 : -1), 0],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: [0.4, 0, 0.6, 1],
            repeat: Infinity,
            repeatDelay: 15,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
