import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Video, SquarePen, Clock } from 'lucide-react';
import DirectStoryItem from '../components/DirectStoryItem';
import MessageItem from '../components/MessageItem';
import './MessagesPage.css';

const mockStories = [
  { id: 1, name: 'Ana*******', note: 'Preguiça Hoje 🥱🥱', avatar: 'https://i.pravatar.cc/150?u=ana' },
  { id: 2, name: 'Swa*******', note: 'Coração Partido (Ao Vivo)', avatar: 'https://i.pravatar.cc/150?u=bia' },
  { id: 3, name: 'Swi*******', note: 'O vontde fudê a 3 😈', avatar: 'https://i.pravatar.cc/150?u=swing' },
  { id: 4, name: 'Marc*******', note: '📍💦 São Paulo', avatar: 'https://i.pravatar.cc/150?u=marc' },
];

const mockMessages = [
  { id: 1, name: 'Fer*****', message: 'Oi delícia, adivinha o que vc esq...', time: 'Agora', unread: true, locked: false, avatar: 'https://i.pravatar.cc/150?u=bruna' },
  { id: 2, name: 'itzbryan', message: 'Encaminhou um reel de jonas.milgrau', time: '33 min', unread: true, locked: false, avatar: 'https://i.pravatar.cc/150?u=carlos' },
  { id: 3, name: 'MIGUEL🇧🇷🇺🇲', message: 'Blz depois a gente se fala', time: '2 h', unread: false, locked: false, avatar: 'https://i.pravatar.cc/150?u=julia' },
  { id: 4, name: 'And*****', message: 'Reagiu com 👍 à sua mensagem', time: '6 h', unread: false, locked: false, avatar: 'https://i.pravatar.cc/150?u=pedro' },
  { id: 5, name: '𝕭𝖗𝖚****', message: '4 novas mensagens', time: '22 h', unread: true, locked: false, avatar: 'https://i.pravatar.cc/150?u=bru' },
  { id: 6, name: '*****', message: 'Enviado segunda-feira', time: '3 d', unread: false, locked: true, avatar: '' },
  { id: 7, name: '*****', message: 'Delícia você 😈 😈', time: '4 d', unread: false, locked: true, avatar: '' },
  { id: 8, name: '*****', message: 'Curtiu sua mensagem', time: '4 d', unread: false, locked: true, avatar: '' },
];

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLockedClick = () => {
    navigate('/credits');
  };

  return (
    <div className="messages-page-container">
      <header className="messages-header">
        <button onClick={() => navigate('/invasion-simulation')} className="p-1">
          <ArrowLeft size={24} />
        </button>
        <div className="header-title">
          <span>@user-403</span>
        </div>
        <div className="header-actions">
          <Video size={28} strokeWidth={1.5} onClick={handleLockedClick} />
          <SquarePen size={24} strokeWidth={1.5} onClick={handleLockedClick} />
        </div>
      </header>

      <main>
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input type="text" placeholder="Interaja com a Meta AI ou pesquise" className="search-input" readOnly onClick={handleLockedClick} />
          </div>
        </div>

        <div className="stories-container">
          <DirectStoryItem
            avatarUrl="https://i.pravatar.cc/150?u=user403"
            name="Sua nota"
            note="Conte as novidades"
            isOwnStory
          />
          {mockStories.map(story => (
            <DirectStoryItem
              key={story.id}
              avatarUrl={story.avatar}
              name={story.name}
              note={story.note}
            />
          ))}
        </div>

        <div className="messages-section-header">
          <h2>Mensagens</h2>
          <span className="requests-link" onClick={handleLockedClick}>Pedidos (4)</span>
        </div>

        <div className="messages-list">
          {mockMessages.map((msg) => (
            <MessageItem
              key={msg.id}
              avatarUrl={msg.avatar}
              name={msg.name}
              message={msg.message}
              time={msg.time}
              unread={msg.unread}
              locked={msg.locked}
              onClick={handleLockedClick}
            />
          ))}
        </div>
      </main>

      <div id="preview-banner">
        <div className="preview-banner-content">
            <div className="preview-banner-text">
                <p className="preview-banner-title">
                    ⚡ Prévia disponível por
                    <span className="preview-timer-inline">
                        <span id="timer-text">{formatTime(timeLeft)}</span>
                        <Clock className="preview-timer-icon" />
                    </span>
                </p>
                <p className="preview-banner-description">Você ganhou 10 minutos para testar gratuitamente nossa ferramenta, mas para liberar todas as funcionalidades e ter acesso permanente é necessário ser um membro VIP.</p>
            </div>
        </div>
        <button type="button" className="preview-banner-button" onClick={() => navigate('/credits')}>Tornar-se VIP</button>
    </div>
    </div>
  );
};

export default MessagesPage;