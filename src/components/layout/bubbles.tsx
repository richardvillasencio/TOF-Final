// src/components/layout/bubbles.tsx
// Step 2: Create a dedicated component for the bubbles.
// This component renders multiple divs, each styled as a bubble.
// The key is that each bubble has a different animation duration and delay,
// creating a natural, randomized floating effect.
'use client';

import { useState, useEffect } from 'react';

export function Bubbles() {
    // We use isMounted to ensure this component only renders on the client.
    // This prevents hydration errors between the server and client.
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            {/* Each div below is a single bubble. They all use the 'animate-bubble' class
                from our CSS file. The inline style attribute is used to give each one a
                unique speed and starting time. */}
            <div className="absolute left-10 bottom-6 w-14 h-14 rounded-full animate-bubble" style={{animationDuration: '6s', animationDelay: '0s', backgroundColor: 'rgba(255, 255, 255, 0.2)'}}></div>
            <div className="absolute left-32 bottom-10 w-10 h-10 rounded-full animate-bubble" style={{animationDuration: '5s', animationDelay: '1s', backgroundColor: 'rgba(255, 255, 255, 0.15)'}}></div>
            <div className="absolute left-1/2 bottom-0 w-20 h-20 rounded-full blur-md animate-bubble" style={{animationDuration: '7s', animationDelay: '2s', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}></div>
            <div className="absolute right-28 bottom-6 w-12 h-12 rounded-full animate-bubble" style={{animationDuration: '5.5s', animationDelay: '3s', backgroundColor: 'rgba(255, 255, 255, 0.12)'}}></div>
            <div className="absolute right-10 bottom-14 w-8 h-8 rounded-full animate-bubble" style={{animationDuration: '4.5s', animationDelay: '1.5s', backgroundColor: 'rgba(255, 255, 255, 0.18)'}}></div>
            <div className="absolute left-2/3 bottom-8 w-24 h-24 rounded-full bg-gradient-to-tr from-white/20 to-white/8 blur-lg animate-bubble" style={{animationDuration: '8s', animationDelay: '0.5s'}}></div>
            <div className="absolute left-8 bottom-36 w-4 h-4 rounded-full bg-white/60 animate-bubble" style={{animationDuration: '4s', animationDelay: '2s'}}></div>
            <div className="absolute right-16 bottom-48 w-5 h-5 rounded-full bg-white/50 animate-bubble" style={{animationDuration: '4.8s', animationDelay: '2.5s'}}></div>
        </>
    );
}
