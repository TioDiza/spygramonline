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
  "É seguro?",
  "Como pago?",
  "Libera na hora?",
  "Acesso total?",
];

const adminResponses: { [key: string]: string } = {
  "É seguro?": "Totalmente seguro e anônimo. Usamos criptografia de ponta para proteger sua identidade. Ninguém saberá que foi você.",
  "Como pago?": "O pagamento é único, via Pix ou cartão de crédito. Você paga uma vez e tem acesso vitalício, sem nenhuma mensalidade.",
  "Libera na hora?": "O acesso é liberado imediatamente após a confirmação do pagamento. É tudo automático.",
  "Acesso total?": "Sim, o acesso é completo. Você poderá ver mensagens (até as apagadas), fotos, vídeos, localização em tempo real e muito mais.",
};

const initialMessages: ChatMessageData[] = [
    { id: 1, sender: 'other', text: 'Funciona mesmo? Alguém já comprou?', username: 'usuario-157', timestamp: '14:22' },
    { id: 2, sender: 'other', text: 'Comprei e funcionou! Vi umas conversas apagadas, chocada.', username: 'usuario-44', timestamp: '14:23' },
    { id: 3, sender: 'other', text: 'Bem-vindos ao suporte! Tirem suas dúvidas.', username: 'Admin SpyGram', timestamp: '14:24' },
];

const generateRandomUsername = () => `usuario-${Math.floor(Math.random() * (602 - 44 + 1)) + 44}`;

const simulatedNewMessages = [
  { text: 'Acabei de comprar, ansiosa!', username: generateRandomUsername() },
  { text: 'É seguro mesmo? Medo de descobrirem.', username: generateRandomUsername() },
  { text: 'Admin, PIX cai na hora?', username: generateRandomUsername() },
  { text: 'Gente, é surreal. Vi até a localização.', username: generateRandomUsername() },
  { text: 'Funciona pra conta privada?', username: generateRandomUsername() },
  { text: 'Sim, PIX libera o acesso na hora!', username: 'Admin SpyGram' },
  { text: 'Funciona perfeitamente para contas privadas!', username: 'Admin SpyGram' },
  { text: 'Vale cada centavo.', username: generateRandomUsername() },
  { text: 'Consegui recuperar uma conta antiga!', username: generateRandomUsername() },
  { text: 'Isso é legal?', username: generateRandomUsername() },
  { text: 'Nossa ferramenta opera em uma área cinzenta da legislação, focada em monitoramento. O uso é de responsabilidade do cliente.', username: 'Admin SpyGram' },
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

      setMessages((prev: ChatMessageData[]) => [...prev, newMessage]);
    }, 3500); // Intervalo mais rápido

    return () => clearInterval(interval);
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

    setMessages((prev: ChatMessageData[]) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    scrollToBottom();

    setTimeout(() => {
      const adminResponseText = adminResponses[text] || "Não entendi sua pergunta. Tente uma das opções ou reformule.";
      const adminMessage: ChatMessageData = {
        id: Date.now() + 1,
        sender: 'other',
        text: adminResponseText,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        username: 'Admin SpyGram',
      };
      setIsTyping(false);
      setMessages((prev: ChatMessageData[]) => [...prev, adminMessage]);
      scrollToBottom();
    }, 1500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg shadow-purple-500/10 flex flex-col h-[500px]">
      {/* Header */}
      <div className="p-3 border-b border-gray-700 flex items-center gap-3 flex-shrink-0">
        <div className="relative">
          <MessageSquare className="w-8 h-8 text-purple-400" />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-gray-900 rounded-full"></span>
        </div>
        <div>
          <h3 className="font-bold text-white text-base">Suporte SpyGram</h3>
          <p className="text-xs text-green-400">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto scrollbar-hide">
        {messages.map((msg: ChatMessageData) => (
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
              <p className="text-[11px] font-bold mb-1 text-green-400">Admin SpyGram</p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse delay-300"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* FAQ Buttons */}
      <div className="p-2 border-t border-gray-700 flex flex-wrap gap-1.5 justify-center flex-shrink-0">
        {faqs.map(faq => (
          <button
            key={faq}
            onClick={() => handleSendMessage(faq)}
            className="px-2.5 py-1 bg-gray-700 text-white text-[11px] rounded-full hover:bg-purple-600 transition-colors"
          >
            {faq}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleFormSubmit} className="p-3 border-t border-gray-700 flex-shrink-0">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="w-full bg-gray-800 text-white text-sm rounded-full py-1.5 pl-3 pr-10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button type="submit" className="absolute right-1.5 p-1.5 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors">
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default LiveChat;