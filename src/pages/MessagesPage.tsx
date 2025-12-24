import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, SquarePen } from 'lucide-react';
import SmileyStarIcon from '../components/icons/SmileyStarIcon';
import MetaAIIcon from '../components/icons/MetaAIIcon';
import DirectStoryItem from '../components/DirectStoryItem';
import MessageItem from '../components/MessageItem';
import './MessagesPage.css';
import { ProfileData, SuggestedProfile } from '../../types';

// Interfaces para os dados da página
interface Story {
  id: string;
  name: string;
  note: string;
  avatar: string;
}

interface Message {
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
    const storedData = sessionStorage.getItem('invasionData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setProfileData(data.profileData);

      // Cria stories a partir dos perfis sugeridos
      const suggestedStories: Story[] = (data.suggestedProfiles || []).slice(0, 4).map((profile: SuggestedProfile, index: number) => ({
        id: profile.username,
        name: `${profile.username.substring(0, 4)}*******`,
        note: ['Preguiça Hoje 🥱🥱', 'Coração Partido (Ao Vivo)', 'O vontde fudê a 3 😈', '📍💦 São Paulo'][index % 4],
        avatar: profile.profile_pic_url,
      }));
      setStories(suggestedStories);

      // Cria mensagens a partir dos mesmos perfis
      const suggestedMessages: Message[] = (data.suggestedProfiles || []).slice(0, 4).map((profile: SuggestedProfile, index: number) => ({
        id: profile.username,
        name: `${profile.username.substring(0, 4)}*******`,
        message: ['Oi delícia, adivinha o que vc esq...', 'Encaminhou um reel de jonas.milgrau', 'Blz depois a gente se fala', 'Reagiu com 👍 à sua mensagem'][index % 4],
        time: ['Agora', '33 min', '2 h', '6 h'][index % 4],
        unread: index < 2,
        locked: false,
        avatar: profile.profile_pic_url,
      }));
      
      // Adiciona as outras mensagens genéricas/bloqueadas
      const otherMessages: Message[] = [
        { id: 'user-5', name: '𝕭𝖗𝖚****', message: '4 novas mensagens', time: '22 h', unread: true, locked: false, avatar: 'https://i.pravatar.cc/150?u=bru' },
        { id: 'user-6', name: '*****', message: 'Enviado segunda-feira', time: '3 d', unread: false, locked: true, avatar: '' },
        { id: 'user-7', name: '*****', message: 'Delícia você 😈 😈', time: '4 d', unread: false, locked: true, avatar: '' },
        { id: 'user-8', name: '*****', message: 'Curtiu sua mensagem', time: '4 d', unread: false, locked: true, avatar: '' },
      ];

      setMessages([...suggestedMessages, ...otherMessages]);

    } else {
      console.warn("Nenhum dado de invasão encontrado. Usando dados de fallback.");
      // Fallback para o caso de não haver dados na sessão
      navigate('/');
    }
  }, [navigate]);

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
              onClick={handleLockedClick}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MessagesPage;