
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
}

const CountdownTimer = ({ targetDate, onComplete }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft(distance);
      } else {
        setTimeLeft(0);
        if (onComplete) onComplete();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-center">
      <h3 className="text-white text-lg font-semibold mb-4">Next Draw In:</h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-2xl font-bold text-white">{days}</div>
          <div className="text-sm text-white/80">Days</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-2xl font-bold text-white">{hours}</div>
          <div className="text-sm text-white/80">Hours</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-2xl font-bold text-white">{minutes}</div>
          <div className="text-sm text-white/80">Minutes</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-2xl font-bold text-white">{seconds}</div>
          <div className="text-sm text-white/80">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
