import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Video, SquarePen } from 'lucide-react';
import './MessagesPage.css'; // Importa o CSS dedicado

const mockMessages = [
  { id: 1, name: 'Bruna', message: 'Vai dar certo me ver essa semana, amor?', time: '1h', unread: true, online: true, avatar: 'https://i.pravatar.cc/150?u=bruna' },
  { id: 2, name: 'Carlos', message: 'Enviou um anexo', time: '3h', unread: false, online: false, avatar: 'https://i.pravatar.cc/150?u=carlos' },
  { id: 3, name: 'julia_s', message: 'Hahahah sim!', time: '5h', unread: true, online: false, avatar: 'https://i.pravatar.cc/150?u=julia' },
  { id: 4, name: 'Academia', message: 'Seu plano foi renovado com sucesso.', time: '1d', unread: false, online: false, avatar: 'https://i.pravatar.cc/150?u=gym' },
  { id: 5, name: 'pedro_h', message: 'Você viu o jogo ontem?', time: '1d', unread: false, online: true, avatar: 'https://i.pravatar.cc/150?u=pedro' },
  { id: 6, name: 'Sofia', message: 'Foto', time: '2d', unread: false, online: false, avatar: 'https://i.pravatar.cc/150?u=sofia', locked: true },
  { id: 7, name: 'Lucas', message: 'Onde você está?', time: '3d', unread: false, online: false, avatar: 'https://i.pravatar.cc/150?u=lucas', locked: true },
];

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLockedClick = () => {
    navigate('/credits');
  };

  return (
    <div className="messages-page-container">
      <header className="messages-header">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft size={24} />
        </button>
        <div className="header-title">
          <span>@user-403</span>
        </div>
        <div className="header-actions">
          <Video size={24} />
          <SquarePen size={24} />
        </div>
      </header>

      <main>
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input type="text" placeholder="Pesquisar" className="search-input" />
          </div>
        </div>

        <div className="messages-list">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`message-item ${msg.locked ? 'locked' : ''}`}
              onClick={msg.locked ? handleLockedClick : undefined}
            >
              <div className="message-avatar-wrapper">
                <img src={msg.avatar} alt={msg.name} className="message-avatar" />
                {msg.online && !msg.locked && <div className="online-indicator"></div>}
              </div>
              <div className="message-content">
                <div className="message-header">
                  <span className={`message-name ${msg.unread ? 'unread' : ''}`}>{msg.name}</span>
                </div>
                <div className="message-preview">
                  <span className={`message-text ${msg.unread ? 'unread' : ''}`}>{msg.message}</span>
                  <span className="message-time">{msg.time}</span>
                </div>
              </div>
              <div className="message-actions">
                {msg.unread && !msg.locked && <div className="unread-indicator"></div>}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MessagesPage;