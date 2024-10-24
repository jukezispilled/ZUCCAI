import React, { useState, useEffect, useRef } from 'react';

function Tracker() {
    const imageRef = useRef(null);
    const [dotPosition, setDotPosition] = useState({ x: 50, y: 50 });
    const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });

    // Function to get a new random position
    const getNewPosition = (current) => {
        if (imageRef.current) {
            const bounds = imageRef.current.getBoundingClientRect();
            
            // Calculate new position with larger movements (in pixels)
            let newX = current.x + (Math.random() - 0.5) * 30;
            let newY = current.y + (Math.random() - 0.5) * 30;
            
            // Keep within bounds with padding
            const padding = 10;
            newX = Math.max(padding, Math.min(bounds.width - padding, newX));
            newY = Math.max(padding, Math.min(bounds.height - padding, newY));
            
            return { x: newX, y: newY };
        }
        return current;
    };

    // Initialize positions
    useEffect(() => {
        if (imageRef.current) {
            const bounds = imageRef.current.getBoundingClientRect();
            const initialX = bounds.width / 2;
            const initialY = bounds.height / 2;
            setDotPosition({ x: initialX, y: initialY });
            setTargetPosition({ x: initialX, y: initialY });
        }
    }, []);

    useEffect(() => {
        // Update target position every 2 seconds
        const targetInterval = setInterval(() => {
            setTargetPosition(prev => getNewPosition(prev));
        }, 2000);

        // Smoothly move current position towards target every 50ms
        const moveInterval = setInterval(() => {
            setDotPosition(current => {
                const dx = (targetPosition.x - current.x) * 0.1;
                const dy = (targetPosition.y - current.y) * 0.1;
                return {
                    x: current.x + dx,
                    y: current.y + dy
                };
            });
        }, 50);

        return () => {
            clearInterval(targetInterval);
            clearInterval(moveInterval);
        };
    }, [targetPosition]);

    return (
        <div className="relative mt-8 mb-8">
            <div ref={imageRef} className="relative">
                <img 
                    src="shen.png" 
                    className="w-[85vw] md:w-[55vw] h-auto rounded" 
                    alt="Shenzen"
                />
                <div className='absolute bottom-4 right-4 p-2 bg-white font-mono text-base md:text-xl'>
                    Asian Finder
                </div>

                {/* Tracker element with "+" and corners */}
                <div
                    className="absolute w-10 h-10 flex items-center justify-center"
                    style={{
                        left: `${dotPosition.x}px`,
                        top: `${dotPosition.y}px`,
                        transform: 'translate(-50%, -50%)',
                        transition: 'all 0.05s linear',
                    }}
                >
                    <div className="relative">
                        {/* "+" sign */}
                        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                            +
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tracker;