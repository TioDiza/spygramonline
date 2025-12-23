import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Video, SquarePen, Camera } from 'lucide-react';
import DirectStoryItem from '../components/DirectStoryItem';
import PreviewBanner from '../components/PreviewBanner';
import './MessagesPage.css';

const mockStories = [
  { id: 1, name: 'Ana*******', note: 'Preguiça Hoje 🥱🥱', avatar: 'https://i.pravatar.cc/150?u=ana' },
  { id: 2, name: 'Ana*******', note: 'Coração Partido (Ao Vivo)', avatar: 'https://i.pravatar.cc/150?u=bia' },
  { id: 3, name: 'Swi*******', note: 'O vontde fudê a 3 😈', avatar: 'https://i.pravatar.cc/150?u=swing' },
];

const mockMessages = [
  { id: 1, name: 'Fer*****', message: 'Oi delícia, adivinha o que vc esq...', time: '9 min', unread: true, avatar: 'https://i.pravatar.cc/150?u=bruna' },
  { id: 2, name: 'Ál*****', message: 'Encaminhou um reel de jonas.milgrau', time: '42 min', unread: true, avatar: 'https://i.pravatar.cc/150?u=carlos' },
  { id: 3, name: 'Let*****', message: 'Blz depois a gente se fala', time: '2 h', unread: false, avatar: 'https://i.pravatar.cc/150?u=julia' },
  { id: 4, name: 'And*****', message: 'Reagiu com 👍 à sua mensagem', time: '6 h', unread: false, avatar: 'https://i.pravatar.cc/150?u=pedro' },
];

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLockedClick = () => {
    navigate('/credits');
  };

  return (
    <div className="messages-page-container">
      <header className="messages-header">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={24} />
        </button>
        <div className="header-title">
          <span>@user-403</span>
        </div>
        <div className="header-actions">
          <Video size={28} strokeWidth={1.5} />
          <SquarePen size={24} strokeWidth={1.5} />
        </div>
      </header>

      <main>
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input type="text" placeholder="Interaja com a Meta AI ou pesquise" className="search-input" />
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
            <div
              key={msg.id}
              className={`message-item ${msg.unread ? 'unread' : ''}`}
              onClick={handleLockedClick}
            >
              <div className="message-avatar-wrapper">
                <img src={msg.avatar} alt={msg.name} className="message-avatar" />
              </div>
              <div className="message-content">
                <span className="message-name">{msg.name}</span>
                <div className="message-preview-row">
                  <span className="message-text">{msg.message}</span>
                  <span className="message-time">{msg.time}</span>
                </div>
              </div>
              <div className="message-actions">
                {msg.unread && <div className="unread-indicator"></div>}
                <Camera size={20} />
              </div>
            </div>
          ))}
        </div>
      </main>
      <PreviewBanner />
    </div>
  );
};

export default MessagesPage;