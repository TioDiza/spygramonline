import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, SquarePen } from 'lucide-react';
import SmileyStarIcon from '../components/icons/SmileyStarIcon';
import MetaAIIcon from '../components/icons/MetaAIIcon';
import DirectStoryItem from '../components/DirectStoryItem';
import MessageItem from '../components/MessageItem';
import './MessagesPage.css';
import { ProfileData } from '../../types';

// Interfaces para os dados da página
export interface Story {
  id: string;
  name: string;
  note: string;
  avatar: string;
}

export interface Message {
  id: string;
  name: string;
  message: string;
  time: string;
  unread: boolean;
  locked: boolean;
  avatar: string;
}

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Get profile data for the "Sua nota" avatar
    const storedData = sessionStorage.getItem('invasionData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setProfileData(data.profileData);
    } else {
      console.warn("Nenhum dado de invasão encontrado.");
      navigate('/');
    }

    // Define static data for stories and messages based on the screenshot
    const staticStories: Story[] = [
      { id: 'ali1', name: 'Ali*******', note: 'Preguiça Hoje 🥱🥱', avatar: '/perfil.jpg' },
      { id: 'ali2', name: 'Ali*******', note: 'Partido (Ao...', avatar: '/perfil.jpg' },
      { id: 'swi1', name: 'Swi*******', note: 'O vontde fudê a 3', avatar: '/nudes1-chat1.jpg' },
    ];

    const staticMessages: Message[] = [
      {
        id: 'fer',
        name: 'Fer*****',
        message: 'Oi delícia, adivinha o que vc esque...',
        time: '1 min',
        unread: true,
        locked: false, // Shows blurred photo
        avatar: '/perfil.jpg',
      },
      {
        id: 'gus',
        name: 'Gus*****',
        message: 'Encaminhou um reel de jonas.m...',
        time: '34 min',
        unread: false,
        locked: true, // Shows blurred placeholder
        avatar: '',
      },
      {
        id: 'bru',
        name: 'Bru*****',
        message: 'Blz depois a gente se fala',
        time: '2 h',
        unread: false,
        locked: true, // Shows blurred placeholder
        avatar: '',
      },
    ];

    setStories(staticStories);
    setMessages(staticMessages);

  }, [navigate]);

  const handleLockedClick = () => {
    navigate('/credits');
  };

  const handleChatClick = (user: Message) => {
    // Apenas o primeiro chat (Fer*****) é clicável nesta simulação
    if (user.id === 'fer') {
      navigate(`/chat/${user.id}`, { state: { user } });
    } else {
      handleLockedClick();
    }
  };

  return (
    <div className="messages-page-container">
      <header className="messages-header">
        <div className="header-left-content">
          <button onClick={() => navigate('/invasion-simulation')} className="p-1">
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>
          <div className="header-title">
            <span>{profileData?.username || 'mensagens'}</span>
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
            avatarUrl={profileData?.profilePicUrl || ''}
            name="Sua nota"
            note="Conte as novidades"
            isOwnStory
          />
          {stories.map(story => (
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
          {messages.map((msg) => (
            <MessageItem
              key={msg.id}
              avatarUrl={msg.avatar}
              name={msg.name}
              message={msg.message}
              time={msg.time}
              unread={msg.unread}
              locked={msg.locked}
              onClick={() => handleChatClick(msg)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MessagesPage;