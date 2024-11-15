import React, { useState, useEffect } from 'react';
import { Window, WindowContent, Button } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

const getRandomPosition = () => {
  const top = Math.random() * 80; // Reduce max percentage to avoid overflow
  const left = Math.random() * 80; // Same for left
  return { top: `${top}%`, left: `${left}%` };
};

const Popup = ({ onClose }) => {
  const [position, setPosition] = useState(getRandomPosition());

  return (
    <Window
      style={{
        position: 'absolute',
        ...position,
        width: '300px', // Default width
        height: '200px', // Default height
        clip: 'rect(0, auto, auto, 0)', // Ensure clipping for overflow
      }}
      className="max-w-[90%] max-h-[90%] sm:w-64 sm:h-40 md:w-72 md:h-48 font-custom"
    >
      <WindowContent className="flex flex-col justify-between h-full relative">
        <img src="zucc2.png" alt="Spam" className="max-w-full max-h-[85%] object-contain absolute bottom-0" />
        <Button onClick={onClose} className="self-end">
          Close
        </Button>
      </WindowContent>
    </Window>
  );
};

function Spam() {
  const [popups, setPopups] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (popups.length < 40) {
        setPopups((prev) => [...prev, Date.now()]);
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [popups]);

  const closePopup = (id) => {
    setPopups((prev) => prev.filter((popupId) => popupId !== id));
  };

  return (
    <ThemeProvider theme={original}>
      <div className="h-screen w-screen flex justify-center items-center relative overflow-hidden">

        {popups.map((id) => (
          <Popup key={id} onClose={() => closePopup(id)} />
        ))}
      </div>
    </ThemeProvider>
  );
}

export default Spam;