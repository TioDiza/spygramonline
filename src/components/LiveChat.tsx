import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import ChatMessage from './ChatMessage';

interface ChatMessageData {
  id: number;
  sender: 'self' | 'other';
  text: string;
  timestamp: string;
  username?: string;
}

const faqs = [
  "É seguro usar?",
  "Como funciona o pagamento?",
  "Quanto tempo para liberar o acesso?",
  "Vou ter acesso a tudo mesmo?",
];

const adminResponses: { [key: string]: string } = {
  "É seguro usar?": "Totalmente seguro e anônimo. Usamos criptografia de ponta para proteger sua identidade. Ninguém saberá que foi você.",
  "Como funciona o pagamento?": "O pagamento é único, via Pix ou cartão de crédito. Você paga uma vez e tem acesso vitalício, sem nenhuma mensalidade.",
  "Quanto tempo para liberar o acesso?": "O acesso é liberado imediatamente após a confirmação do pagamento. É tudo automático.",
  "Vou ter acesso a tudo mesmo?": "Sim, o acesso é completo. Você poderá ver mensagens (até as apagadas), fotos, vídeos, localização em tempo real e muito mais.",
};

const initialMessages: ChatMessageData[] = [
    { id: 1, sender: 'other', text: 'Gente, funciona mesmo? Alguém já comprou?', username: 'usuario-157', timestamp: '14:22' },
    { id: 2, sender: 'other', text: 'Comprei e funcionou na hora! Consegui ver umas conversas que tinham apagado, chocada.', username: 'usuario-44', timestamp: '14:23' },
    { id: 3, sender: 'other', text: 'Bem-vindos ao nosso suporte! Fiquem à vontade para tirar suas dúvidas.', username: 'Admin SpyGram', timestamp: '14:24' },
];

const generateRandomUsername = () => `usuario-${Math.floor(Math.random() * (602 - 44 + 1)) + 44}`;

const simulatedNewMessages = [
  { text: 'Acabei de comprar, ansiosa pra testar!', username: generateRandomUsername() },
  { text: 'É seguro mesmo? Tenho medo de descobrirem.', username: generateRandomUsername() },
  { text: 'Admin, o pagamento por PIX cai na hora?', username: generateRandomUsername() },
  { text: 'Gente, é surreal. Vi até a localização em tempo real.', username: generateRandomUsername() },
  { text: 'Funciona pra conta privada?', username: generateRandomUsername() },
  { text: 'Sim, o acesso é liberado imediatamente após o PIX!', username: 'Admin SpyGram' },
  { text: 'Funciona perfeitamente para contas privadas também!', username: 'Admin SpyGram' },
  { text: 'Vale cada centavo, sério.', username: generateRandomUsername() },
];

const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageData[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  // Efeito para simular novas mensagens chegando
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * simulatedNewMessages.length);
      const newMessageData = {
        ...simulatedNewMessages[randomIndex],
        username: simulatedNewMessages[randomIndex].username === 'Admin SpyGram' 
          ? 'Admin SpyGram' 
          : generateRandomUsername(),
      };

      const newMessage: ChatMessageData = {
        id: Date.now() + Math.random(),
        sender: 'other',
        text: newMessageData.text,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        username: newMessageData.username,
      };

      setMessages(prev => [...prev, newMessage]);
    }, 5000); // Adiciona uma nova mensagem a cada 5 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessageData = {
      id: Date.now(),
      sender: 'self',
      text: text,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      username: 'Você',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    scrollToBottom();

    setTimeout(() => {
      const adminResponseText = adminResponses[text] || "Não entendi sua pergunta. Poderia tentar uma das opções abaixo ou reformular?";
      const adminMessage: ChatMessageData = {
        id: Date.now() + 1,
        sender: 'other',
        text: adminResponseText,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        username: 'Admin SpyGram',
      };
      setIsTyping(false);
      setMessages(prev => [...prev, adminMessage]);
      scrollToBottom();
    }, 1500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg shadow-purple-500/10 flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center gap-3">
        <div className="relative">
          <MessageSquare className="w-10 h-10 text-purple-400" />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
        </div>
        <div>
          <h3 className="font-bold text-white">Suporte SpyGram</h3>
          <p className="text-sm text-green-400">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
        {messages.map(msg => (
          <ChatMessage
            key={msg.id}
            sender={msg.sender}
            text={msg.text}
            timestamp={msg.timestamp}
            username={msg.username}
          />
        ))}
        {isTyping && (
          <div className="flex justify-start mb-2">
            <div className="bg-gray-700 text-gray-100 rounded-2xl rounded-bl-none px-3 py-2">
              <p className="text-xs font-bold mb-1 text-green-400">Admin SpyGram</p>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* FAQ Buttons */}
      <div className="p-2 border-t border-gray-700 flex flex-wrap gap-2 justify-center">
        {faqs.map(faq => (
          <button
            key={faq}
            onClick={() => handleSendMessage(faq)}
            className="px-3 py-1 bg-gray-700 text-white text-xs rounded-full hover:bg-purple-600 transition-colors"
          >
            {faq}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleFormSubmit} className="p-4 border-t border-gray-700">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="w-full bg-gray-800 text-white rounded-full py-2 pl-4 pr-12 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button type="submit" className="absolute right-2 p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default LiveChat;