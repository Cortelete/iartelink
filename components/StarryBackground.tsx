
import React, { useMemo } from 'react';

const StarryBackground: React.FC = () => {
  const stars = useMemo(() => {
    const starArray = [];
    for (let i = 0; i < 100; i++) {
      starArray.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${4 + Math.random() * 6}s`,
        animationDelay: `${Math.random() * 4}s`,
        opacity: Math.random() * 0.4 + 0.2,
        size: `${Math.random() * 2 + 1}px`,
      });
    }
    return starArray;
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-purple-900/60 to-indigo-900/70 animate-gradient-y overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white/60 animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default StarryBackground;