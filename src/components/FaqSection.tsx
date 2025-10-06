import React from 'react';
import FaqItem from './FaqItem';

const faqs = [
  {
    question: "O pagamento é único ou é uma assinatura?",
    answer: "O pagamento é único. Você paga apenas uma vez e tem acesso vitalício a todas as funcionalidades, sem nenhuma mensalidade ou cobrança adicional."
  },
  {
    question: "A pessoa que eu invadir vai saber que fui eu?",
    answer: "Não. Nosso sistema garante 100% de anonimato. A pessoa nunca saberá quem acessou o perfil dela. Sua identidade fica totalmente protegida."
  },
  {
    question: "Funciona em qualquer celular?",
    answer: "Sim. O SpyGram é uma aplicação web e funciona em qualquer dispositivo com acesso à internet, seja ele um iPhone, Android, tablet ou computador."
  },
  {
    question: "O que acontece se não funcionar para mim?",
    answer: "Temos uma garantia de satisfação de 7 dias. Se por qualquer motivo você não estiver satisfeito com a ferramenta, basta nos contatar e nós devolveremos 100% do seu dinheiro, sem burocracia."
  },
  {
    question: "Preciso instalar algum aplicativo?",
    answer: "Não. Todo o processo é feito através do nosso site. Você não precisa instalar nada no seu celular nem no celular da outra pessoa."
  }
];

const FaqSection: React.FC = () => {
  return (
    <div className="mt-20 w-full max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
        Perguntas Frequentes
      </h2>
      <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
        {faqs.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FaqSection;