import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Phone, Video, Mic, Camera, Sticker, Heart, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatPage.css';
import { Message } from './MessagesPage';
import LockedFeatureModal from '../components/LockedFeatureModal'; // Importa o modal

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [chatUser, setChatUser] = useState<Message | null>(null);
  const [showVolumePopup, setShowVolumePopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para o modal principal
  const [modalFeatureName, setModalFeatureName] = useState(''); // Estado para o nome do recurso

  useEffect(() => {
    if (location.state?.user) {
      setChatUser(location.state.user);
    } else {
      navigate('/messages');
    }
  }, [location.state, navigate]);

  const handleLockedFeature = (feature: string) => {
    setModalFeatureName(feature);
    setIsModalOpen(true);
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
      const numBars = 40;
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
      <LockedFeatureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        featureName={modalFeatureName}
      />

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
          <div className="chat-user-info" onClick={() => handleLockedFeature('ver o perfil do usuário')}>
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
          <button onClick={() => handleLockedFeature('fazer uma ligação')}><Phone size={24} /></button>
          <button onClick={() => handleLockedFeature('fazer uma chamada de vídeo')}><Video size={24} /></button>
        </div>
      </header>

      <main className="chat-messages">
        <div className="message sent">
          <div className="message-bubble emoji-bubble">😍😍😍😍😍😍</div>
        </div>

        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble blurred-text">que a vaca da Bruna</div>
        </div>

        <div className="message sent">
          <div className="message-bubble audio-bubble" onClick={handleAudioClick}>
            <div className="audio-message sent">
              <span className="play-icon">▶</span>
              <div className="audio-waveform"></div>
              <span className="audio-duration">0:11</span>
            </div>
            <div className="transcription-link" onClick={(e) => { e.stopPropagation(); handleLockedFeature('ver transcrições de áudio'); }}>Ver transcrição</div>
          </div>
        </div>

        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble">São João del-Rei</div>
        </div>

        <div className="message sent">
          <div className="message-bubble">
            Dboa, amanhã ou terça
            <div className="message-reaction">👍</div>
          </div>
        </div>

        <div className="message-date">ONTEM, 21:34</div>

        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble">Amor</div>
        </div>

        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble">Ta podendo falar?</div>
        </div>

        <div className="reply-event sent">
          <div className="reply-event-content">
            <span className="reply-event-label">Você respondeu</span>
            <div className="reply-event-bubble">Amor</div>
          </div>
          <div className="reply-event-line"></div>
        </div>
      </main>

      <footer className="message-input-container" onClick={() => handleLockedFeature('enviar mensagens')}>
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