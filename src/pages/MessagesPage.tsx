import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, SquarePen } from 'lucide-react';
import SmileyStarIcon from '../components/icons/SmileyStarIcon';
import MetaAIIcon from '../components/icons/MetaAIIcon';
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
  { id: 1, name: 'Ana*******', message: 'Oi delícia, adivinha o que vc esq...', time: 'Agora', unread: true, locked: false, avatar: 'https://i.pravatar.cc/150?u=ana' },
  { id: 2, name: 'Swa*******', message: 'Encaminhou um reel de jonas.milgrau', time: '33 min', unread: true, locked: false, avatar: 'https://i.pravatar.cc/150?u=bia' },
  { id: 3, name: 'Swi*******', message: 'Blz depois a gente se fala', time: '2 h', unread: false, locked: false, avatar: 'https://i.pravatar.cc/150?u=swing' },
  { id: 4, name: 'Marc*******', message: 'Reagiu com 👍 à sua mensagem', time: '6 h', unread: false, locked: false, avatar: 'https://i.pravatar.cc/150?u=marc' },
  { id: 5, name: '𝕭𝖗𝖚****', message: '4 novas mensagens', time: '22 h', unread: true, locked: false, avatar: 'https://i.pravatar.cc/150?u=bru' },
  { id: 6, name: '*****', message: 'Enviado segunda-feira', time: '3 d', unread: false, locked: true, avatar: '' },
  { id: 7, name: '*****', message: 'Delícia você 😈 😈', time: '4 d', unread: false, locked: true, avatar: '' },
  { id: 8, name: '*****', message: 'Curtiu sua mensagem', time: '4 d', unread: false, locked: true, avatar: '' },
];

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLockedClick = () => {
    navigate('/credits');
  };

  return (
    <div className="messages-page-container">
      <header className="messages-header">
        <div className="header-left-content">
          <button onClick={() => navigate('/invasion-simulation')} className="p-1">
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>
          <div className="header-title">
            <span>biel_sfm</span>
          </div>
        </div>
        <div className="header-actions">
          <SmileyStarIcon size={28} strokeWidth={1.5} onClick={handleLockedClick} />
          <SquarePen size={24} strokeWidth={1.5} onClick={handleLockedClick} />
        </div>
      </header>

      <main>
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <MetaAIIcon size={20} className="search-icon" />
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
    </div>
  );
};

export default MessagesPage;