import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm GlobeBot. How can I help you plan your trip today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const location = useLocation();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    useEffect(() => {
        // Context aware greeting if location changes
        if (location.pathname.includes('/trips/')) {
            // Maybe add a message? "I see you're looking at a trip. Need suggestions?"
            // To avoid spam, maybe not automatically add, but the bot "knows".
        }
    }, [location]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Mock AI Response
        setTimeout(() => {
            const responseText = generateResponse(inputValue, location.pathname);
            const botMsg = { id: Date.now() + 1, text: responseText, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const generateResponse = (input, path) => {
        const lower = input.toLowerCase();
        if (lower.includes('budget') || lower.includes('cost')) {
            return "I can help you optimize your budget. For this trip, I'd suggest looking at local dining options to save about 20%.";
        }
        if (lower.includes('restaurant') || lower.includes('food')) {
            return "Based on your location, 'Le Petit Bistro' is highly rated and fits your preferences.";
        }
        if (path.includes('create')) {
            return "I can generate a full itinerary for you! Just fill in the destination and dates.";
        }
        return "That sounds like a great idea! I can add that to your itinerary. Would you like me to find available times?";
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'transfrom 0.2s'
                }}
                className="hover-scale"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="glass-panel" style={{
                    position: 'fixed',
                    bottom: '100px',
                    right: '30px',
                    width: '350px',
                    height: '500px',
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    backgroundColor: '#1E1E1E'
                }}>
                    {/* Header */}
                    <div style={{ padding: '16px', background: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Sparkles size={18} color="var(--primary)" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>GlobeBot</div>
                            <div style={{ fontSize: '12px', opacity: 0.8 }}>AI Travel Assistant</div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {messages.map(msg => (
                            <div key={msg.id} style={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '80%',
                                padding: '10px 14px',
                                borderRadius: '12px',
                                backgroundColor: msg.sender === 'user' ? 'var(--primary-light)' : '#333',
                                color: 'white',
                                borderBottomRightRadius: msg.sender === 'user' ? '2px' : '12px',
                                borderBottomLeftRadius: msg.sender === 'bot' ? '2px' : '12px'
                            }}>
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && (
                            <div style={{ alignSelf: 'flex-start', padding: '10px', backgroundColor: '#333', borderRadius: '12px', color: '#aaa', fontSize: '12px' }}>
                                GlobeBot is typing...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div style={{ padding: '12px', borderTop: '1px solid #333', display: 'flex', gap: '8px' }}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask anything..."
                            style={{
                                flex: 1,
                                padding: '10px',
                                borderRadius: '20px',
                                border: 'none',
                                background: '#333',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                        <button onClick={handleSend} style={{
                            width: '40px', height: '40px', borderRadius: '50%',
                            background: 'var(--primary)', color: 'white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatWidget;
