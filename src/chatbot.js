import React, { useState, useEffect, useRef } from 'react';
import { FaCommentDots, FaPhone, FaTimes } from 'react-icons/fa';
import './chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonState, setButtonState] = useState('initial');
  const chatbotRef = useRef(null);

  useEffect(() => {
    const sequence = async () => {
      setButtonState('hi');
      await new Promise(resolve => setTimeout(resolve, 2000));
      setButtonState('waiting');
      await new Promise(resolve => setTimeout(resolve, 2000));
      setButtonState('initial');
    };
    sequence();
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && <div className="chat-overlay"></div>}
      <div className="chatbot">
        <div className={`chat-window ${isOpen ? 'open' : 'closed'}`} ref={chatbotRef}>
          <div className="chat-top">
            <img src="/images/img001.jpg" alt="Friendly Expert" className="chat-top-image" />
            <div className="chat-top-text">
              <h2>We're Online</h2>
              <p>Our friendly experts are here and ready to assist you. How can we help today?</p>
            </div>
          </div>
          <div className="chat-buttons">
            <button className="chat-btn chat">
              <FaCommentDots className="btn-icon" />
              <span>Chat Now</span>
            </button>
            <button className="chat-btn call">
              <FaPhone className="btn-icon" />
              <span>Speak with Us</span>
            </button>
          </div>
          <button onClick={toggleChat} className="close-button">
            <FaTimes />
          </button>
        </div>
        {!isOpen && (
          <div className="chat-button-container">
            <div className={`chat-button-message ${buttonState !== 'initial' ? 'show' : ''}`}>
              {buttonState === 'hi' ? 'Hi!' : buttonState === 'waiting' ? 'Waiting for your call...' : ''}
            </div>
            <button 
              onClick={toggleChat} 
              className={`chat-toggle ${buttonState === 'waiting' ? 'call-mode' : ''}`}
            >
              {buttonState === 'waiting' ? <FaPhone className="moving-icon" /> : <FaCommentDots />}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Chatbot;