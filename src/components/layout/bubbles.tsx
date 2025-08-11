
'use client';

import { useState, useEffect } from 'react';

export const Bubbles = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bubbles fixed inset-0 -z-10 pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="bubble" style={{
          '--size': `${2 + Math.random() * 4}vw`,
          '--left-start': `${-10 + Math.random() * 120}vw`,
          '--left-end': `${-10 + Math.random() * 120}vw`,
          '--animation-delay': `-${Math.random() * 20}s`,
          '--animation-duration': `${15 + Math.random() * 15}s`,
        } as React.CSSProperties}></div>
      ))}
    </div>
  );
};
