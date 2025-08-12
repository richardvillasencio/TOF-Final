
'use client';

import React, { useState, useEffect } from 'react';

// A helper function to create a splash effect
const createSplash = (x: number, size: number, setSplashes: React.Dispatch<React.SetStateAction<any[]>>) => {
  const numDroplets = Math.floor(size / 5);
  for (let i = 0; i < numDroplets; i++) {
    const newSplash = {
      id: Date.now() + Math.random() + i,
      x: x + (Math.random() - 0.5) * size,
      y: 90 + (Math.random() - 0.5) * 10, // Splash near the top
      vx: (Math.random() - 0.5) * 50,
      vy: (Math.random() - 0.5) * 50,
      size: Math.random() * 5 + 2,
    };

    setSplashes(prev => [...prev, newSplash]);

    // Remove splash after animation
    setTimeout(() => {
      setSplashes(prev => prev.filter(splash => splash.id !== newSplash.id));
    }, 700);
  }
};


export default function BubblePoopAnimation() {
  const [bubbles, setBubbles] = useState<any[]>([]);
  const [poops, setPoops] = useState<any[]>([]);
  const [splashes, setSplashes] = useState<any[]>([]);
  const [sparkles, setSparkles] = useState<any[]>([]);

  const createBubble = () => {
    const newBubble = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // Random x position (10% to 90%)
      startTime: Date.now(),
      size: Math.random() * 30 + 40, // Random size between 40-70px
      duration: Math.random() * 4000 + 8000, // 8-12 seconds to reach top
    };
    
    setBubbles(prev => [...prev, newBubble]);
    
    // Create splash when bubble "pops" at the top
    setTimeout(() => {
      createSplash(newBubble.x, newBubble.size, setSplashes);
      setBubbles(prev => prev.filter(bubble => bubble.id !== newBubble.id));
    }, newBubble.duration);
  };

  const createPoop = (bubbleX: number) => {
    // Create multiple small poops
    const numPoops = Math.floor(Math.random() * 3) + 2; // 2-4 poops
    
    for (let i = 0; i < numPoops; i++) {
      const newPoop = {
        id: Date.now() + Math.random() + i,
        x: bubbleX + (Math.random() - 0.5) * 20, // Spread around bubble position
        y: Math.random() * 20 + 40, // Start near middle-bottom
        rotation: Math.random() * 360,
        size: Math.random() * 8 + 6, // Small poops 6-14px
        opacity: 1,
      };
      
      setPoops(prev => [...prev, newPoop]);
      
      // Fade out and remove poop
      setTimeout(() => {
        setPoops(prev => prev.map(poop => 
          poop.id === newPoop.id 
            ? { ...poop, opacity: 0 }
            : poop
        ));
        
        setTimeout(() => {
          setPoops(prev => prev.filter(poop => poop.id !== newPoop.id));
        }, 500);
      }, 1000);
    }
  };

  useEffect(() => {
    // Generate sparkles on client-side only to prevent hydration mismatch
    const generatedSparkles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${Math.random() * 2 + 1}s`,
    }));
    setSparkles(generatedSparkles);

    // Create initial bubble
    createBubble();
    
    // Create new bubbles periodically
    const bubbleInterval = setInterval(() => {
      createBubble();
    }, 4000);

    // Random poop events
    const poopInterval = setInterval(() => {
      if (Math.random() < 0.15) { // 15% chance
        const randomX = Math.random() * 80 + 10;
        createPoop(randomX);
      }
    }, 3000);

    return () => {
      clearInterval(bubbleInterval);
      clearInterval(poopInterval);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 opacity-20 animate-pulse"></div>
      
      {/* Floating Sparkles */}
      <div className="absolute inset-0">
        {sparkles.map(sparkle => (
          <div
            key={sparkle.id}
            className="absolute w-1 h-1 bg-blue-300 rounded-full animate-ping"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              animationDelay: sparkle.animationDelay,
              animationDuration: sparkle.animationDuration
            }}
          ></div>
        ))}
      </div>

      {/* Bubbles */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute transition-all duration-1000 ease-out"
          style={{
            left: `${bubble.x}%`,
            bottom: '-100px',
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animation: `float-up ${bubble.duration}ms ease-out forwards`,
          }}
        >
          <div className="relative w-full h-full">
            {/* Main bubble */}
            <div className="w-full h-full bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 rounded-full shadow-lg opacity-80">
              {/* Shine effect */}
              <div className="absolute top-2 left-2 w-1/3 h-1/3 bg-white opacity-60 rounded-full blur-sm"></div>
            </div>
            
            {/* Trailing bubbles */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-2 bg-blue-100 rounded-full opacity-60 animate-bounce"></div>
            </div>
            <div className="absolute -bottom-4 left-1/3 transform -translate-x-1/2">
              <div className="w-1 h-1 bg-blue-50 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      ))}

      {/* Splash effects */}
      {splashes.map(splash => (
        <div
          key={splash.id}
          className="absolute transition-all duration-700 ease-out"
          style={{
            left: `${splash.x}%`,
            bottom: `${splash.y}%`,
            width: `${splash.size}px`,
            height: `${splash.size}px`,
            transform: `translate(${splash.vx}px, ${splash.vy}px) scale(0)`,
            animation: `splash-out 700ms ease-out forwards`,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-300 to-blue-500 rounded-full opacity-80"></div>
        </div>
      ))}

      {/* Poop elements */}
      {poops.map(poop => (
        <div
          key={poop.id}
          className="absolute transition-opacity duration-500"
          style={{
            left: `${poop.x}%`,
            bottom: `${poop.y}%`,
            width: `${poop.size}px`,
            height: `${poop.size}px`,
            transform: `rotate(${poop.rotation}deg)`,
            opacity: poop.opacity,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-amber-600 to-amber-800 rounded-full shadow-md">
            {/* Poop shine */}
            <div className="absolute top-0.5 left-0.5 w-1/2 h-1/2 bg-amber-400 opacity-50 rounded-full blur-sm"></div>
          </div>
        </div>
      ))}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(0.8) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) scale(1.1) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes splash-out {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.6;
          }
          100% {
            transform: scale(0.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
