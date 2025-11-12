import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const ConfettiCelebration = ({ show, onComplete }) => {
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <Confetti
      width={windowDimension.width}
      height={windowDimension.height}
      recycle={false}
      numberOfPieces={500}
      gravity={0.3}
    />
  );
};

export default ConfettiCelebration;