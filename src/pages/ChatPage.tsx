import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Phone, Video, Mic, Camera, Sticker, Heart } from 'lucide-react';
import './ChatPage.css';
import { Message } from './MessagesPage'; // Assuming Message type is exported from MessagesPage

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [chatUser, setChatUser] = useState<Message | null>(null);

  useEffect(() => {
    if (location.state?.user) {
      setChatUser(location.state.user);
    } else {
      // Fallback or redirect if no user data is passed
      navigate('/messages');
    }
  }, [location.state, navigate]);

  const handleLockedFeature = () => {
    navigate('/credits');
  };

  // Simulate generating audio waveform bars
  useEffect(() => {
    const waveforms = document.querySelectorAll('.audio-waveform');
    waveforms.forEach(waveform => {
      // Clear existing bars
      waveform.innerHTML = '';
      const numBars = Math.floor(Math.random() * 10) + 20; // 20 to 30 bars
      for (let i = 0; i < numBars; i++) {
        const bar = document.createElement('div');
        bar.className = 'audio-waveform-bar';
        bar.style.height = `${Math.floor(Math.random() * 18) + 2}px`;
        waveform.appendChild(bar);
      }
    });
  }, []);

  if (!chatUser) {
    return null; // Or a loading spinner
  }

  return (
    <div className="chat-container">
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
        <div className="message-date">3 dias atrás, 11:12</div>
        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble">Oi minha delícia</div>
        </div>
        <div className="message sent">
          <div className="message-bubble">Oi amor da minha vidq</div>
        </div>
        <div className="message sent">
          <div className="message-bubble">vida*</div>
        </div>
        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble">To com saudade</div>
        </div>
        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble">
            <div className="message-media" onClick={handleLockedFeature}>
              <img src="/nudes1-chat1.jpg" alt="Conteúdo sensível" className="media-blurred" />
              <div className="sensitive-overlay">
                <span className="sensitive-icon">🚫</span>
                <span className="sensitive-text">Conteúdo Sensível</span>
              </div>
            </div>
            <div className="message-reaction">❤️</div>
          </div>
        </div>
        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble">Disso??</div>
        </div>
        <div className="message sent">
          <div className="message-bubble">😍😍😍😍😍😍</div>
        </div>
        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble">Gostou amor?</div>
        </div>
        <div className="message sent">
          <div className="message-bubble" onClick={handleLockedFeature}>
            <div className="audio-message sent">
              <span className="play-icon">▶</span>
              <div className="audio-waveform"></div>
              <span className="audio-duration">0:11</span>
            </div>
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
        <div className="message sent">
          <div className="message-bubble">
            <div className="message-reply">
              <div className="reply-line"></div>
              <div className="reply-content">
                <span className="reply-user">Você respondeu</span>
                <span className="reply-text">Amor</span>
              </div>
            </div>
            Oii bb
          </div>
        </div>
        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble">Perai que a vaca da Bruna tá aqui do lado</div>
        </div>
        <div className="message sent">
          <div className="message-bubble">kkkkkkkkk</div>
        </div>
        <div className="message received">
          <img src={chatUser.avatar} alt="User" className="message-avatar" />
          <div className="message-bubble">
            🦌🦌🦌 kkkk
            <div className="message-reaction">😂</div>
          </div>
        </div>
        
        <div className="message-unread-divider">
          <span>Novas mensagens</span>
        </div>

        <div className="message-date">Agora</div>
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