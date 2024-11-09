import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Home from './Home';
import Spam from './Spam';

const App = () => {
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHome(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showHome) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Home />
      </motion.div>
    );
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black overflow-hidden relative">
      <div>
        <Spam />
      </div>
    </div>
  );
};

export default App;