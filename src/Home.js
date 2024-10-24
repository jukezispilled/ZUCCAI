import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Chat from './Chat';
import Tracker from './Tracker'; // Assuming Tracker.js exports the Tracker component
import Activity from './Activity'; // Import the Activity component

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null); // State to track modal content

    // Function to open the modal with specific content
    const openModal = (content) => {
        setModalContent(content); // Set the content for the modal
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null); // Reset content when closing
    };

    return (
        <div className='relative font-mono'>
            {/* Fixed Video Background */}
            <div className="fixed top-0 left-0 w-screen h-screen z-0">
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="bg.mp4"
                />
            </div>

            {/* Content Layer */}
            <div className="relative h-screen w-screen z-10">
                {/* Powered by Meta */}
                <motion.div
                    className='absolute top-5 w-full flex justify-center pt-5'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                >
                    <div className='font-mono text-xl text-white'>powered by</div>
                    <img src="meta.png" className='size-16 -mt-5' alt="Meta logo" />
                </motion.div>

                {/* Main Content Area */}
                <div className="h-screen w-screen flex justify-center items-center font-mono p-4">
                    <Chat />
                </div>

                {/* Bottom-left info button */}
                <button
                    className="hidden md:flex absolute bottom-5 left-5 items-center bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition ease-in-out duration-150"
                    onClick={() => openModal(
                        <div className='flex justify-center w-screen'>
                            <video
                                className="w-3/4"
                                src="info.mp4"
                                autoPlay
                                playsInline
                                onEnded={closeModal} // Close the modal when the video ends
                            />
                        </div>
                    )} // Open modal with video
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </button>

                {/* Bottom-right action buttons */}
                <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 bottom-5 md:right-5 space-x-3 flex justify-center">
                    <button
                        className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition ease-in-out duration-150"
                        onClick={() => openModal(<Tracker />)} // Open modal with Tracker
                    >
                        Asian Finder
                    </button>
                    <button
                        className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition ease-in-out duration-150"
                        onClick={() => openModal(<Activity />)} // Open modal with Activity
                    >
                        Activity Monitor
                    </button>
                </div>

                <div className="hidden md:flex justify-center absolute bottom-5 md:right-5 space-x-3">
                    <button
                        className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition ease-in-out duration-150"
                        onClick={() => openModal(<Tracker />)} // Open modal with Tracker
                    >
                        Asian Finder
                    </button>
                    <button
                        className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition ease-in-out duration-150"
                        onClick={() => openModal(<Activity />)} // Open modal with Activity
                    >
                        Activity Monitor
                    </button>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-30" onClick={closeModal}>
                        {/* Modal content */}
                        <div
                            className="rounded" // Add some padding and background
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                        >
                            {modalContent} {/* Render the content dynamically */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;