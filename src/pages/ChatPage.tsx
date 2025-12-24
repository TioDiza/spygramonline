import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Phone, Video, Mic, Camera, Sticker, Heart, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatPage.css';
import { Message } from './MessagesPage';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [chatUser, setChatUser] = useState<Message | null>(null);
  const [showVolumePopup, setShowVolumePopup] = useState(false);

  useEffect(() => {
    if (location.state?.user) {
      setChatUser(location.state.user);
    } else {
      navigate('/messages');
    }
  }, [location.state, navigate]);

  const handleLockedFeature = () => {
    navigate('/credits');
  };

  const handleAudioClick = () => {
    if (showVolumePopup) return;
    setShowVolumePopup(true);
    setTimeout(() => {
      setShowVolumePopup(false);
    }, 2500);
  };

  useEffect(() => {
    const waveforms = document.querySelectorAll('.audio-waveform');
    waveforms.forEach(waveform => {
      waveform.innerHTML = '';
      const numBars = waveform.classList.contains('short') ? 20 : 40;
      for (let i = 0; i < numBars; i++) {
        const bar = document.createElement('div');
        bar.className = 'audio-waveform-bar';
        bar.style.height = `${Math.floor(Math.random() * 16) + 2}px`;
        waveform.appendChild(bar);
      }
    });
  }, [chatUser]);

  if (!chatUser) {
    return null;
  }

  return (
    <div className="chat-container">
      <AnimatePresence>
        {showVolumePopup && (
          <motion.div
            className="volume-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="volume-popup-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <p>Seja membro VIP para liberar o volume</p>
              <VolumeX className="volume-popup-icon" size={48} strokeWidth={1.5} />
              <div className="volume-popup-bar">
                {[...Array(15)].map((_, i) => <div key={i} className="volume-popup-bar-segment" />)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="chat-header-sticky">
        <div className="chat-header-left">
          <button onClick={() => navigate('/messages')} className="back-button">
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>
          <div className="chat-user-info" onClick={handleLockedFeature}>
            <div className="chat-avatar-wrapper-header">
              <img src={chatUser.avatar} alt={chatUser.name} className="chat-avatar-img" />
            </div>
            <div className="chat-name-wrapper">
              <span className="chat-user-name">{chatUser.name}</span>
              <span className="chat-user-status">Online</span>
            </div>
          </div>
        </div>
        <div className="chat-header-right">
          <button onClick={handleLockedFeature}><Phone size={24} /></button>
          <button onClick={handleLockedFeature}><Video size={24} /></button>
        </div>
      </header>

      <main className="chat-messages">
        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble">
            <div className="audio-message received" onClick={handleAudioClick}>
              <span className="play-icon purple">▶</span>
              <div className="audio-waveform"></div>
              <span className="audio-duration">0:32</span>
            </div>
            <div className="transcription-link" onClick={handleLockedFeature}>
              Ver transcrição
            </div>
          </div>
        </div>

        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble">
            <div className="audio-message received" onClick={handleAudioClick}>
              <span className="play-icon paused">||</span>
              <div className="audio-waveform short"></div>
              <span className="audio-duration">0:03</span>
            </div>
            <div className="transcription-link" onClick={handleLockedFeature}>
              Ver transcrição
            </div>
          </div>
        </div>

        <div className="message sent heart">
          <div className="message-bubble heart-bubble">❤️</div>
        </div>

        <div className="message-date">01:25</div>

        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble">Oi delícia, adivinha o que vc esqueceu aqui? kkkk</div>
        </div>
      </main>

      <footer className="message-input-container" onClick={handleLockedFeature}>
        <div className="message-input-wrapper">
          <button className="input-icon-button camera-button">
            <Camera size={24} />
          </button>
          <input type="text" placeholder="Mensagem..." className="message-input" readOnly />
          <div className="message-input-actions">
            <button className="input-icon-button"><Mic size={22} /></button>
            <button className="input-icon-button"><Camera size={22} /></button>
            <button className="input-icon-button"><Sticker size={22} /></button>
            <button className="input-icon-button"><Heart size={22} /></button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;