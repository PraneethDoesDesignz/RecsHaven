import React, { useEffect, useState } from "react";

const icons = [
  { name: "Book", icon: "fa-book", color: "text-purple-500" },
  { name: "Plane", icon: "fa-plane", color: "text-sky-500" },
  { name: "Food", icon: "fa-utensils", color: "text-emerald-500" },
  { name: "Movie", icon: "fa-ticket", color: "text-amber-500" },
];

const LoadingAnimation: React.FC = () => {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [iconScale, setIconScale] = useState(1);
  const [scalingUp, setScalingUp] = useState(true);
  const [textOffset, setTextOffset] = useState(0);

  // Cycle icons
  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 2000);
    return () => clearInterval(iconInterval);
  }, []);

  // Animate scale and text
  useEffect(() => {
    const scaleInterval = setInterval(() => {
      if (scalingUp) {
        setIconScale((prevScale) => {
          if (prevScale >= 1.2) {
            setScalingUp(false);
            return 1.2;
          }
          return prevScale + 0.01;
        });
        setTextOffset(0);
      } else {
        setIconScale((prevScale) => {
          if (prevScale <= 0.8) {
            setScalingUp(true);
            return 0.8;
          }
          return prevScale - 0.01;
        });
        setTextOffset(400);
      }
    }, 30);
    return () => clearInterval(scaleInterval);
  }, [scalingUp]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-rose-50">
      <div className="max-w-[300px] flex flex-col items-center justify-center">
        {/* Icon Animation */}
        <div className="h-[180px] flex items-center justify-center mb-6">
          <i
            className={`fas ${icons[currentIconIndex].icon} text-[72px] ${icons[currentIconIndex].color} transition-all duration-500 ease-in-out`}
            style={{ transform: `scale(${iconScale})` }}
            aria-label={icons[currentIconIndex].name}
          ></i>
        </div>
        {/* Text Animation */}
        <div className="h-[70px] overflow-hidden relative w-full">
          <h1
            className={`text-4xl font-bold whitespace-nowrap text-center transition-all duration-700 ease-in-out absolute w-full ${icons[currentIconIndex].color}`}
            style={{
              transform: `translateX(${scalingUp ? 0 : 400}px)`,
              opacity: scalingUp ? 1 : 0,
            }}
          >
            RecsHaven
          </h1>
        </div>
        {/* Loading text */}
        <p className="mt-6 text-lg text-gray-600">
          Loading your recommendations...
        </p>
      </div>
    </div>
  );
};

export default LoadingAnimation; 