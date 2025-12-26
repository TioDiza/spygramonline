import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Phone, Video, Mic, Camera, Sticker, Heart, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatPage.css';
import { Message } from './MessagesPage';
import LockedFeatureModal from '../components/LockedFeatureModal';

// Define a estrutura para uma mensagem no chat
interface ChatMessage {
  id: number;
  type: 'sent' | 'received' | 'date' | 'reply_event';
  content: string;
  reaction?: string;
  replyTo?: string;
  isAudio?: boolean;
  audioDuration?: string;
  isBlurred?: boolean;
}

// Define os diálogos mockados
const DIALOGUES: { [key: string]: ChatMessage[] } = {
  // Diálogo Padrão (para o primeiro chat)
  DEFAULT_CHAT: [
    { id: 1, type: 'sent', content: '😍😍😍😍😍😍' },
    { id: 2, type: 'received', content: 'que a vaca da Bruna', isBlurred: true },
    { id: 3, type: 'sent', content: 'Áudio', isAudio: true, audioDuration: '0:11' },
    { id: 4, type: 'received', content: 'São João del-Rei' },
    { id: 5, type: 'sent', content: 'Dboa, amanhã ou terça', reaction: '👍' },
    { id: 6, type: 'date', content: 'ONTEM, 21:34' },
    { id: 7, type: 'received', content: 'Amor' },
    { id: 8, type: 'received', content: 'Ta podendo falar?' },
    { id: 9, type: 'reply_event', content: 'Amor', replyTo: 'Você respondeu' },
  ],
  
  // Diálogo para o segundo chat (Encaminhou um reel)
  SECOND_CHAT: [
    { id: 1, type: 'date', content: 'HOJE, 10:00' },
    { id: 2, type: 'received', content: 'Encaminhou um reel de jonas.milgrau' },
    // Reduzida a string para evitar erro de parser
    { id: 3, type: 'sent', content: 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
    { id: 4, type: 'received', content: 'São João del-Rei' },
    { id: 5, type: 'sent', content: 'Dboa, amanhã ou terça', reaction: '👍' },
    { id: 6, type: 'date', content: 'ONTEM, 21:34' },
    { id: 7, type: 'received', content: 'Amor' },
    { id: 8, type: 'received', content: 'Ta podendo falar?' },
    { id: 9, type: 'reply_event', content: 'Amor', replyTo: 'Você respondeu' },
  ],
};

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extrai o usuário do chat dos dados de navegação
  const chatUser = location.state?.user as Message | undefined;

  // Estados do Chat
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFeatureName, setModalFeatureName] = useState('');
  const [showVolumePopup, setShowVolumePopup] = useState(false);

  // Lógica para selecionar o diálogo correto
  const getDialogue = useCallback((userId: string) => {
    const storedData = sessionStorage.getItem('invasionData');
    if (storedData) {
      const data = JSON.parse(storedData);
      const suggestedProfiles = data.suggestedProfiles || [];
      // O segundo chat corresponde ao segundo perfil sugerido (índice 1)
      const secondUser = suggestedProfiles[1]; 
      if (secondUser && userId === secondUser.username) {
        return DIALOGUES.SECOND_CHAT;
      }
    }
    // Se não for o segundo usuário, usa o chat padrão
    return DIALOGUES.DEFAULT_CHAT;
  }, []);

  // Efeito para carregar as mensagens
  useEffect(() => {
    if (chatUser) {
      const dialogue = getDialogue(chatUser.id);
      setMessages(dialogue);
    }
  }, [chatUser, getDialogue]);

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

  // Função para renderizar uma mensagem
  const renderMessage = (msg: ChatMessage) => {
    if (msg.type === 'date') {
      return <div key={msg.id} className="message-date">{msg.content}</div>;
    }

    if (msg.type === 'reply_event') {
      return (
        <div key={msg.id} className="reply-event sent">
          <div className="reply-event-content">
            <span className="reply-event-label">{msg.replyTo}</span>
            <div className="reply-event-bubble">{msg.content}</div>
          </div>
          <div className="reply-event-line"></div>
        </div>
      );
    }

    const isSent = msg.type === 'sent';
    // Regex para emojis, garantindo que não seja um áudio
    const isEmoji = msg.content.match(/^[\p{Emoji}\s]+$/u) && msg.content.length < 10 && !msg.isAudio;
    
    return (
      <div key={msg.id} className={`message ${isSent ? 'sent' : 'received'}`}>
        {!isSent && chatUser && <img src={chatUser.avatar} alt="User" className="message-avatar" />}
        
        <div className={`message-bubble ${isEmoji ? 'emoji-bubble' : ''} ${msg.isBlurred ? 'blurred-text' : ''} ${msg.isAudio ? 'audio-bubble' : ''}`}>
          {msg.isAudio ? (
            <div className="audio-message sent" onClick={handleAudioClick}>
              <span className="play-icon">▶</span>
              <div className="audio-waveform">
                {/* Waveform bars generated via useEffect or static mock */}
                {[...Array(40)].map((_, i) => (
                  <div key={i} className="audio-waveform-bar" style={{ height: `${Math.floor(Math.random() * 16) + 2}px` }}></div>
                ))}
              </div>
              <span className="audio-duration">{msg.audioDuration}</span>
            </div>
          ) : (
            msg.content
          )}
          
          {msg.reaction && <div className="message-reaction">{msg.reaction}</div>}
          
          {msg.isAudio && (
            <div className="transcription-link" onClick={(e) => { e.stopPropagation(); handleLockedFeature('ver transcrições de áudio'); }}>Ver transcrição</div>
          )}
        </div>
      </div>
    );
  };

  // Efeito para garantir que o waveform seja gerado (mantido para compatibilidade)
  useEffect(() => {
    const waveforms = document.querySelectorAll('.audio-waveform');
    waveforms.forEach(waveform => {
      if (waveform.children.length === 0) {
        const numBars = 40;
        for (let i = 0; i < numBars; i++) {
          const bar = document.createElement('div');
          bar.className = 'audio-waveform-bar';
          bar.style.height = `${Math.floor(Math.random() * 16) + 2}px`;
          waveform.appendChild(bar);
        }
      }
    });
  }, [messages]);

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
        {messages.map(renderMessage)}
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