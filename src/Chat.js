import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function Chat() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]); // Start with an empty chat
    const [isTyping, setIsTyping] = useState(false);
    const [lastResponses, setLastResponses] = useState([]);
    const chatEndRef = useRef(null);
    const [showVideo, setShowVideo] = useState(false);

    const responses = [
        "advice: never go full zucc",
        "ok but zucc is now live in the metaverse. 4D zucc experience",
        "yea zucc is more worried about the wasian superrace. ask me about that!",
        "forget that and go back to scrolling. that keeps zucc alive",
        "bro lets just get to it. zucc for zucc?",
        "you guys wanted AI right? zucc it",
        "zucc zucc zucc zucc zucc zucc zucc zucc zucc",
        "whats zucc my zigga?",
        "zucc that bro. have you been to cartelgram?",
        "ticker is $ZUCC. forget everything else",
        "zucctober nigga",
        "repeat that again lil homie",
        "uhm. how about i just show you more ass on instagram?",
        "to zucc or not to zucc. that is the question young one",
    ];

    const presetPrompts = [
        "give me the zucc",
        "x",
        "telegram",
        "ca"
    ];

    // Specific responses based on prompts
    const specificResponses = {
        "twitter": { text: "Follow me human", link: "https://x.com/zucctoken" },
        "x": { text: "Follow me human", link: "https://x.com/zucctoken" },
        "telegram": { text: "Join up chad", link: "https://t.me/zucctoken" },
        "tg": { text: "Join up chad", link: "https://t.me/zucctoken" },
        "ca": { text: "soon...", link: null }, // No link
        "pump": { text: "we're gonna pump $ZUCC lil homie. billions will zucc", link: null },
        "token": { text: "we're gonna pump $ZUCC lil homie. billions will zucc", link: null },
        "train": { text: "zucc trained himself. why are you so worried?", link: null },
        "trained": { text: "zucc trained himself. why are you so worried?", link: null }
    };

    const getRandomResponse = () => {
        const availableResponses = responses.filter(response => !lastResponses.includes(response));
        const randomResponse = availableResponses[Math.floor(Math.random() * availableResponses.length)];
        
        setLastResponses(prev => {
            const updated = [...prev, randomResponse];
            if (updated.length > 12) updated.shift();
            return updated;
        });
        
        return randomResponse;
    };

    const streamResponse = async (response, link = null) => {
        setIsTyping(true);
        let currentText = '';
    
        for (let i = 0; i < response.length; i++) {
            currentText += response[i];
            setChat(prev => [
                ...prev.slice(0, -1),
                { sender: 'Bot', text: currentText, link }
            ]);
            await new Promise(resolve => setTimeout(resolve, 30));
        }
    
        setIsTyping(false);
    };

    const handleSend = async () => {
        if (message.trim()) {
            setChat(prev => [...prev, { sender: 'You', text: message }]);
            setMessage('');
            setChat(prev => [...prev, { sender: 'Bot', text: '' }]);
    
            // Check if the message contains "Zucc"
            if (message.toLowerCase().includes('zucc')) {
                handleVideoPlay(); // Play the video
            } else {
                // Check for specific responses based on user message
                const lowerCaseMessage = message.toLowerCase();
                const specificResponse = specificResponses[lowerCaseMessage];

                if (specificResponse) {
                    const { text, link } = specificResponse;
                    await streamResponse(text, link);
                } else {
                    // Proceed with random response if no specific response found
                    const response = getRandomResponse();
                    await streamResponse(response);
                }
            }
        }
    };

    const handlePresetPrompt = async (prompt) => {
        setChat(prev => [...prev, { sender: 'You', text: prompt }]);
    
        // Check if the prompt contains "Zucc"
        if (prompt.toLowerCase().includes('zucc')) {
            handleVideoPlay(); // Play the video for the "Zucc" preset
        } else {
            // Check for specific responses
            const lowerCasePrompt = prompt.toLowerCase();
            const specificResponse = specificResponses[lowerCasePrompt];
    
            if (specificResponse) {
                const { text, link } = specificResponse;
                // Stream the response with a link if available
                await streamResponse(text, link);
            } else {
                // Fallback to a random response if no specific response is found
                const response = getRandomResponse();
                await streamResponse(response);
            }
        }
    };

    const handleVideoPlay = () => {
        setShowVideo(true);
        const videoTimeout = setTimeout(() => {
            setShowVideo(false);
        }, 4000); // Adjust this duration to the length of the video

        return () => clearTimeout(videoTimeout); // Clean up on unmount
    };

    const streamInitialMessage = async () => {
        await streamResponse("hello human! it's me, mark... a.k.a, 'the zucc.'");
    };

    useEffect(() => {
        streamInitialMessage(); // Call the function to stream the initial message
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat]);

    return (
        <div className='w-screen flex justify-center'>
            <div className="bg-blue-50 p-4 md:p-10 rounded-lg w-[90%] md:w-[65%] lg:w-[55%] flex flex-col z-20">
                <h2 className="text-2xl font-bold mb-2 text-blue-500">ZUCC</h2>
                <div className="border border-gray-300 rounded p-2 h-72 overflow-auto flex flex-col">
                    {chat.map((item, index) => (
                        <div key={index} className={`flex items-start mb-2 ${item.sender === 'Bot' ? 'justify-start' : 'justify-end'}`}>
                            {item.sender === 'Bot' && (
                                <img
                                    src="zucc.png"
                                    alt="Bot Avatar"
                                    className="w-10 h-10 rounded-full mr-2"
                                />
                            )}
                            <div className={`flex items-center whitespace-normal ${item.sender === 'You' ? 'bg-blue-500 text-white rounded-lg p-2' : 'bg-gray-200 rounded-lg p-2'}`}>
                                <span>
                                    {item.text}
                                    {/* Render clickable link if available */}
                                    {item.link && (
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline ml-2">
                                            {item.link}
                                        </a>
                                    )}
                                </span>
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 mb-2">
                    {presetPrompts.map((prompt, index) => (
                        <button
                            key={index}
                            onClick={() => handlePresetPrompt(prompt)}
                            className="bg-gray-200 hover:bg-gray-300 rounded px-3 py-2 text-sm transition-colors duration-200"
                        >
                            {prompt}
                        </button>
                    ))}
                </div>
                
                <div className="flex mt-2">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        className="border border-gray-300 rounded w-full p-2"
                    />
                    <button 
                        onClick={handleSend}
                        className="bg-blue-500 text-white rounded px-4 py-2 ml-2 hover:bg-blue-600 transition-colors duration-200">
                        Send
                    </button>
                </div>
            </div>
            {showVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-30">
                    <video
                        className="w-3/4"
                        src="zucc.mp4"
                        autoPlay
                        playsInline
                        onEnded={() => setShowVideo(false)}
                    />
                </div>
            )}
        </div>
    );
}

export default Chat;