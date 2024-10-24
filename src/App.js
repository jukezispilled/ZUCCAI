import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Home from './Home';  // Import the Home component

function App() {
  const [text, setText] = useState('');
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [secondText, setSecondText] = useState('');
  const [showHome, setShowHome] = useState(false);  // State to show Home component

  const fullText = 'Mark';
  const secondFullText = 'Give me the Zucc';

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setShowSecondMessage(true);
          startSecondTyping();
        }, 625);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  const startSecondTyping = () => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= secondFullText.length) {
        setSecondText(secondFullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowHome(true), 500);  // After typing second text, show Home
      }
    }, 50);

    return () => clearInterval(typingInterval);
  };

  // Show the Home component with a fade-in effect after typing
  if (showHome) {
    return (
      <motion.div
        initial={{ opacity: 0 }}        // Start invisible
        animate={{ opacity: 1 }}        // Fade in
        transition={{ duration: 1.5 }}  // Set the duration of the fade-in effect
      >
        <Home />
      </motion.div>
    );
  }

  // Default typing animation screen
  return (
    <div className="h-screen w-screen flex justify-center items-center text-white bg-blue-500">

      <img src="zuck.png" className='absolute bottom-0' alt="Zuckerberg" />

      <div className='font-mono -mt-[55%] md:-mt-[25%] flex flex-col items-center space-y-4'>
        {!showSecondMessage ? (
          <div className='text-6xl md:text-8xl'>
            {text}
          </div>
        ) : (
          <>
            <div className='text-2xl md:text-4xl text-center'>
              {secondText}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;