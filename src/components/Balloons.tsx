
import { useState } from 'react';
import { motion } from 'framer-motion';

interface BalloonProps {
  color: string;
  x: string;
  delay: number;
  message?: string;
}

const Balloon = ({ color, x, delay, message }: BalloonProps) => {
  const [popped, setPopped] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  
  const handleClick = () => {
    if (!popped) {
      setPopped(true);
      setShowMessage(true);
      
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  };
  
  return (
    <div className="absolute bottom-0" style={{ left: x }}>
      {!popped ? (
        <motion.div
          className="balloon cursor-pointer"
          initial={{ y: 0 }}
          animate={{ y: [0, -15, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            delay,
            repeatType: "reverse"
          }}
          onClick={handleClick}
        >
          <div className="balloon-string" />
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-16 h-20 rounded-full"
            style={{ background: color }}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-16 h-20 flex items-center justify-center text-white font-bold"
        >
          💥
        </motion.div>
      )}
      
{showMessage && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className={`absolute bottom-24 transform bg-white p-2 rounded-lg shadow-lg text-xs text-center z-50 min-w-max
      ${parseInt(x) > 60 ? 'right-0 translate-x-full' : 'left-0 -translate-x-0'}
    `}
  >
    {message || "Happy Birthday Peya! 🎉"}
  </motion.div>
)}

    </div>
  );
};

const Balloons = () => {
  const balloons = [
    { color: "#9b87f5", x: "10%", delay: 0, message: "Happy Birthday! 🎂" },
    { color: "#D946EF", x: "25%", delay: 0.5, message: "Future Dr. Peya! 👩‍⚕️" },
    { color: "#0EA5E9", x: "40%", delay: 1, message: "May all your wishes come true! ✨" },
    { color: "#F97316", x: "55%", delay: 1.5, message: "Here's to your success! 🎓" },
    { color: "#FDE68A", x: "70%", delay: 2, message: "Sending love on your special day! ❤️" }
  ];
  
  return (
    <div className="relative h-64 w-full">
      {balloons.map((balloon, index) => (
        <Balloon
          key={index}
          color={balloon.color}
          x={balloon.x}
          delay={balloon.delay}
          message={balloon.message}
        />
      ))}
    </div>
  );
};

export default Balloons;
