
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Medical3DModel from '../components/Medical3DModel';
import Confetti from '../components/Confetti';
import Balloons from '../components/Balloons';
import PhotoGallery from '../components/PhotoGallery';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [birthdayDate] = useState(new Date('2025-05-15'));
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const calcTimeLeft = () => {
    const now = new Date();
    const difference = birthdayDate.getTime() - now.getTime();
    
    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    } else {
      // It's her birthday or after!
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    }
  };
  
  useEffect(() => {
    calcTimeLeft();
    const timer = setInterval(calcTimeLeft, 1000);
    
    // After intro animation
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 3500);
    
    return () => {
      clearInterval(timer);
      clearTimeout(introTimer);
    };
  }, []);
  
  // Check if it's her birthday
  const isBirthday = timeLeft.days === 0 && 
                      timeLeft.hours === 0 && 
                      timeLeft.minutes === 0 && 
                      timeLeft.seconds === 0;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-birthday-soft-pink via-white to-birthday-soft-peach">
      <AnimatePresence>
        {showIntro ? (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-celebration"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.8, times: [0, 0.6, 1] }}
              className="text-6xl font-dancing text-white mb-4"
            >
              Peya
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-xl text-white font-poppins font-light"
            >
              Happy Birthday!
            </motion.div>
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
              className="mt-8 text-5xl"
            >
              🎉
            </motion.div>
          </motion.div>
        ) : (
          <div className="container px-4 py-6 min-h-screen">
            {/* Confetti */}
            <Confetti />
            
            {/* Header */}
            <motion.header 
              className="text-center py-6"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-dancing font-bold birthday-heading bg-gradient-to-r from-birthday-purple via-birthday-pink to-birthday-teal bg-clip-text text-transparent">
                Happy Birthday, Peya!
              </h1>
              <motion.p 
                className="text-lg text-gray-700 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                May 15, 2025
              </motion.p>
            </motion.header>
            
            {/* Countdown or Birthday Message */}
            <motion.div 
              className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-xl p-6 mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              {!isBirthday ? (
                <div className="text-center">
                  <h2 className="text-xl font-bold text-birthday-purple mb-4">Countdown to Peya's Special Day</h2>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-birthday-pink">{timeLeft.days}</div>
                      <div className="text-xs uppercase text-gray-500">Days</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-birthday-teal">{timeLeft.hours}</div>
                      <div className="text-xs uppercase text-gray-500">Hours</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-birthday-orange">{timeLeft.minutes}</div>
                      <div className="text-xs uppercase text-gray-500">Mins</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-birthday-purple">{timeLeft.seconds}</div>
                      <div className="text-xs uppercase text-gray-500">Secs</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <motion.h2 
                    className="text-2xl font-bold text-birthday-pink mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    🎂 It's Your Birthday Today! 🎂
                  </motion.h2>
                  <p className="text-gray-700">
                    Wishing you a day filled with joy, laughter, and unforgettable moments!
                  </p>
                </div>
              )}
            </motion.div>
            
            {/* Special Message */}
            <motion.div 
              className="bg-white rounded-xl shadow-xl p-6 mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <h2 className="text-2xl font-dancing font-bold text-center bg-gradient-to-r from-birthday-purple to-birthday-teal bg-clip-text text-transparent mb-4">
                To Our Aspiring Doctor
              </h2>
              <p className="text-gray-700 mb-4 text-center">
                Dear Peya, as you pursue your dream of becoming a doctor, may your birthday be 
                as amazing as the lives you're destined to touch. Your dedication, compassion, and 
                brilliance inspire us all.
              </p>
              <p className="text-gray-700 mb-4 text-center">
                The journey through medical college is challenging, but you're conquering it with grace. 
                Here's to celebrating not just another year, but all your incredible achievements!
              </p>
              <motion.div 
                className="flex justify-center pt-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
              >
                <span className="text-4xl animate-heart-beat">❤️</span>
              </motion.div>
            </motion.div>
            
            {/* 3D Medical Model */}
            <motion.div 
              className="bg-white rounded-xl shadow-xl p-6 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              <h2 className="text-2xl font-dancing font-bold text-center bg-gradient-to-r from-birthday-purple to-birthday-pink bg-clip-text text-transparent mb-4">
                Your Future Tools
              </h2>
              <Medical3DModel />
            </motion.div>
            
            {/* Photo Gallery */}
            <motion.div 
              className="bg-white rounded-xl shadow-xl p-6 mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
            >
              <PhotoGallery />
            </motion.div>
            
            {/* Balloons */}
            <motion.div 
              className="bg-white rounded-xl shadow-xl p-6 mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.7 }}
            >
              <h2 className="text-2xl font-dancing font-bold text-center bg-gradient-to-r from-birthday-teal to-birthday-orange bg-clip-text text-transparent mb-4">
                Pop the Balloons for Surprises!
              </h2>
              <Balloons />
            </motion.div>
            
            {/* Footer */}
            <motion.footer 
              className="text-center py-8 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <p>Made with ❤️ for Peya's special day</p>
              <p className="mt-2">May 15, 2025</p>
            </motion.footer>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
