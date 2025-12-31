import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Phone, Video, Mic, Camera, Sticker, Heart, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatPage.css';
import { Message } from './MessagesPage';
import LockedFeatureModal from '../components/LockedFeatureModal';
import { getCitiesByState, getUserLocation } from '../services/geolocationService';
import VolumeMutedIcon from '../components/icons/VolumeMutedIcon';

// Componente para a forma de onda do áudio
const AudioWaveform: React.FC = () => (
  <div className="audio-waveform">
    {[...Array(30)].map((_, i) => (
      <div key={i} className="audio-waveform-bar" style={{ height: `${Math.floor(Math.random() * 18) + 4}px` }}></div>
    ))}
  </div>
);

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const chatUser = location.state?.user as Message | undefined;

  const [isSensitiveModalOpen, setIsSensitiveModalOpen] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [isAudioVipPopupOpen, setIsAudioVipPopupOpen] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState('Agora');
  const [locationPlaceholder, setLocationPlaceholder] = useState('...');

  // Efeito para buscar a localização do usuário e definir o placeholder
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const loc = await getUserLocation();
        const cities = getCitiesByState(loc.city, loc.state);
        // Pega uma cidade vizinha, se houver, ou a própria cidade
        setLocationPlaceholder(cities[1] || cities[0] || 'sua cidade');
      } catch (error) {
        console.error("Failed to get location, using fallback.");
        setLocationPlaceholder('São Paulo');
      }
    };
    fetchLocation();
  }, []);

  // Efeito para definir o horário da última mensagem
  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setLastMessageTime(`${hours}:${minutes}`);
  }, []);

  const handleBackClick = () => {
    // Marcar como lido no localStorage para a página de DMs saber
    if (chatUser) {
      localStorage.setItem(`chat-${chatUser.id}-read`, 'true');
    }
    navigate('/messages');
  };

  const handleShowVipModal = () => {
    setIsSensitiveModalOpen(false);
    setIsVipModalOpen(true);
  };

  const handleAudioClick = () => {
    setIsAudioVipPopupOpen(true);
    setTimeout(() => setIsAudioVipPopupOpen(false), 2500);
  };

  if (!chatUser) {
    // Se não houver dados do usuário, volta para a página de mensagens
    useEffect(() => {
      navigate('/messages');
    }, [navigate]);
    return null;
  }

  return (
    <div className="chat-container">
      <LockedFeatureModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
        featureName="ver fotos e vídeos censurados"
      />

      {/* Modal de Conteúdo Sensível */}
      <AnimatePresence>
        {isSensitiveModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sensitive-modal-overlay"
          >
            <button onClick={() => setIsSensitiveModalOpen(false)} className="sensitive-modal-back-btn">
              <ChevronLeft size={28} strokeWidth={2.5} />
            </button>
            <div className="sensitive-modal-content">
              <EyeOff className="sensitive-modal-icon" size={48} />
              <p className="sensitive-modal-title">Conteúdo sensível</p>
              <p className="sensitive-modal-subtitle">Esta imagem pode apresentar conteúdo de nudez e atividade sexual explícita.</p>
            </div>
            <footer className="sensitive-modal-footer">
              <button onClick={handleShowVipModal} className="sensitive-modal-view-btn">
                Ver imagem
              </button>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Modal de Áudio VIP */}
      <AnimatePresence>
        {isAudioVipPopupOpen && (
          <motion.div
            className="audio-vip-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="audio-vip-popup-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <p>Seja membro VIP para liberar o volume</p>
              <VolumeMutedIcon className="audio-vip-popup-icon" />
              <div className="audio-vip-popup-bar">
                {[...Array(15)].map((_, i) => <div key={i} className="audio-vip-popup-bar-segment" />)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="chat-header">
        <div className="chat-header-left">
          <button onClick={handleBackClick} className="back-button">
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>
          <div className="chat-user-info" onClick={() => setIsVipModalOpen(true)}>
            <button className="chat-avatar-btn">
              <div className="chat-avatar-inner">
                <img src={chatUser.avatar} alt={chatUser.name} className="chat-avatar-img" />
              </div>
            </button>
            <button className="chat-name-btn">
              <span className="chat-user-name">{chatUser.name}</span>
              <span className="chat-user-status">Online</span>
            </button>
          </div>
        </div>
        <div className="chat-header-right">
          <Phone size={24} onClick={() => setIsVipModalOpen(true)} />
          <Video size={24} onClick={() => setIsVipModalOpen(true)} />
        </div>
      </header>

      <main className="chat-messages">
        <div className="message-date">3 dias atrás, 11:12</div>
        
        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble"><div className="message-content">Oi minha delícia</div></div>
        </div>

        <div className="message sent">
          <div className="message-bubble"><div className="message-content">Oi amor da minha vidq</div></div>
        </div>
        <div className="message sent">
          <div className="message-bubble"><div className="message-content">vida*</div></div>
        </div>

        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble"><div className="message-content">To com saudade</div></div>
        </div>

        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble" style={{ padding: 0, background: 'none' }}>
            <div className="message-video" onClick={() => setIsSensitiveModalOpen(true)}>
              <img src="/nudes1-chat1.jpg" alt="Conteúdo sensível" className="video-blurred" />
              <div className="video-sensitive-overlay">
                <EyeOff className="video-sensitive-icon" size={32} />
              </div>
            </div>
            <div className="message-reaction">❤️</div>
          </div>
        </div>

        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble"><div className="message-content">Disso??</div></div>
        </div>

        <div className="message sent">
          <div className="message-bubble"><div className="message-content">😍😍😍😍😍😍</div></div>
        </div>

        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble"><div className="message-content">Gostou <span className="blur-word">amor</span>?</div></div>
        </div>

        <div className="message sent">
          <div className="message-bubble" onClick={handleAudioClick}>
            <div className="audio-message">
              <button className="audio-play-btn">▶</button>
              <AudioWaveform />
              <span className="audio-duration">0:11</span>
            </div>
          </div>
        </div>

        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble"><div className="message-content">Fala pra <span className="blur-word">ela que tem</span> sim em {locationPlaceholder}.</div></div>
        </div>

        <div className="message sent">
          <div className="message-bubble">
            <div className="message-content">Dboa, amanhã ou depois de amanhã</div>
            <div className="message-reaction">👍🏻</div>
          </div>
        </div>

        <div className="message-date">ONTEM, 21:34</div>

        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble"><div className="message-content">Amor</div></div>
        </div>
        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble"><div className="message-content">Ta podendo falar?</div></div>
        </div>

        <div className="message sent">
          <div className="message-bubble">
            <div className="message-reply">
              <div className="reply-label">Você respondeu</div>
              <div className="reply-content-wrapper">
                <div className="reply-line"></div>
                <div className="message-content reply-bg-purple">Amor</div>
              </div>
            </div>
            <div className="message-content">Oii bb</div>
          </div>
        </div>

        <div className="message-unread-divider">
          <div className="message-unread-line"></div>
          <span className="message-unread-text">Novas mensagens</span>
          <div className="message-unread-line"></div>
        </div>

        <div className="message-date">{lastMessageTime}</div>

        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble">
            <div className="message-content">Oi delícia, adivinha o que vc esqueceu aqui? kkkk</div>
          </div>
        </div>
      </main>

      <footer className="message-input-container" onClick={() => setIsVipModalOpen(true)}>
        <div className="message-input-wrapper">
          <button className="input-icon-button camera-button"><Camera size={24} /></button>
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