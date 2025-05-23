
import React, { useState, useEffect } from 'react';

interface DrawCountdownProps {
  targetDate: Date;
  title?: string;
}

const DrawCountdown = ({ targetDate, title = "Next Draw In:" }: DrawCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-center">
      <h3 className="text-white text-lg font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
          <div className="text-sm text-white/80">Days</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
          <div className="text-sm text-white/80">Hours</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
          <div className="text-sm text-white/80">Minutes</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
          <div className="text-sm text-white/80">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default DrawCountdown;
