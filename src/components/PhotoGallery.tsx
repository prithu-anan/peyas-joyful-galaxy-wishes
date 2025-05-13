
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Photo {
  src: string;
  alt: string;
}

const PhotoGallery = () => {
  const photos: Photo[] = [
    { src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", alt: "Placeholder 1" },
    { src: "https://images.unsplash.com/photo-1500673922987-e212871fec22", alt: "Placeholder 2" },
    { src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07", alt: "Placeholder 3" },
    { src: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb", alt: "Placeholder 4" },
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };
  
  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + newDirection;
      if (newIndex < 0) return photos.length - 1;
      if (newIndex >= photos.length) return 0;
      return newIndex;
    });
  };

  const handleSwipe = (offset: number) => {
    if (offset > 50) {
      paginate(-1);
    } else if (offset < -50) {
      paginate(1);
    }
  };
  
  return (
    <motion.div 
      className="w-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-dancing font-bold bg-gradient-to-r from-birthday-purple to-birthday-pink bg-clip-text text-transparent">
          Memories with Peya
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Replace these images with your photos
        </p>
      </div>
      
      <div 
        ref={containerRef}
        className="w-full h-64 relative overflow-hidden rounded-xl"
        onTouchStart={(e) => {
          const touch = e.touches[0];
          containerRef.current?.setAttribute('data-start-x', touch.clientX.toString());
        }}
        onTouchEnd={(e) => {
          const touch = e.changedTouches[0];
          const startX = Number(containerRef.current?.getAttribute('data-start-x') || 0);
          const endX = touch.clientX;
          const offset = endX - startX;
          handleSwipe(offset);
        }}
      >
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute inset-0"
        >
          <img 
            src={photos[currentIndex].src}
            alt={photos[currentIndex].alt}
            className="w-full h-full object-cover photo-frame"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 flex items-end p-4">
            <p className="text-white font-dancing text-xl">
              {currentIndex === 0 && "The aspiring doctor"}
              {currentIndex === 1 && "Celebrations with Peya"}
              {currentIndex === 2 && "Special memories"}
              {currentIndex === 3 && "Adventures together"}
            </p>
          </div>
        </motion.div>
      </div>
      
      <div className="flex justify-between mt-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="bg-birthday-purple text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
          onClick={() => paginate(-1)}
        >
          ←
        </motion.button>
        
        <div className="flex gap-2">
          {photos.map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-birthday-purple' : 'bg-gray-300'}`}
              whileHover={{ scale: 1.2 }}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
            />
          ))}
        </div>
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="bg-birthday-teal text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
          onClick={() => paginate(1)}
        >
          →
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PhotoGallery;
