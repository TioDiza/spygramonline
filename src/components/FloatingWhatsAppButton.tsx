import React from 'react';
import { MessageSquare } from 'lucide-react';

const FloatingWhatsAppButton: React.FC = () => {
  const whatsappNumber = "5511999999999"; // Número de placeholder
  const message = "Olá! Tenho uma dúvida sobre o SpyGram.";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

  return (
    <>
      <style>{`
        @keyframes pulse-whatsapp {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }
        .animate-pulse-whatsapp {
          animation: pulse-whatsapp 2s infinite;
        }
      `}</style>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 animate-pulse-whatsapp opacity-75 hover:opacity-100 hover:bg-[#128C7E]"
        aria-label="Fale conosco no WhatsApp"
      >
        <MessageSquare size={28} />
      </a>
    </>
  );
};

export default FloatingWhatsAppButton;