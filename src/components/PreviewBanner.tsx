import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PREVIEW_DURATION = 10 * 60; // 10 minutos em segundos

const PreviewBanner: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(PREVIEW_DURATION);

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate('/credits');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="preview-banner">
      <div className="preview-banner-content">
        <div>
          <p className="preview-banner-title">
            ⚡ Prévia disponível por {formatTime(timeLeft)}
          </p>
          <p className="preview-banner-description">
            Você ganhou 10 minutos para testar gratuitamente nossa ferramenta, mas para liberar todas as funcionalidades é necessário ser um membro VIP.
          </p>
        </div>
      </div>
      <button onClick={() => navigate('/credits')} className="preview-banner-button">
        Tornar-se VIP
      </button>
    </div>
  );
};

export default PreviewBanner;