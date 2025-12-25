import React from 'react';
import { HelpCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => (
  <div className="border-b border-gray-700 py-4 last:border-b-0">
    <h3 className="flex items-start gap-2 text-lg font-semibold text-white mb-1">
      <HelpCircle className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" />
      {question}
    </h3>
    <p className="text-gray-300 ml-7 text-sm">{answer}</p>
  </div>
);

const StaticFAQSection: React.FC = () => {
  const faqs = [
    { 
      question: 'O pagamento é único ou é uma assinatura?', 
      answer: 'O pagamento é único e vitalício. Você paga apenas uma vez e tem acesso permanente ao perfil invadido.' 
    },
    { 
      question: 'A pessoa que eu invadir vai saber que foi eu?', 
      answer: 'Não. O processo é 100% anônimo e indetectável. Sua identidade é totalmente protegida.' 
    },
    { 
      question: 'Funciona em qualquer celular?', 
      answer: 'Sim. Nosso sistema é baseado na web e funciona perfeitamente em qualquer dispositivo (celular, tablet ou computador) com acesso à internet.' 
    },
    { 
      question: 'O que acontece se não funcionar pra mim?', 
      answer: 'Oferecemos uma Garantia de 7 Dias. Se o acesso falhar ou você não estiver satisfeito, garantimos o reembolso total.' 
    },
    { 
      question: 'Preciso instalar algum aplicativo?', 
      answer: 'Não. Todo o processo é feito online, diretamente pelo seu navegador. Não é necessário baixar ou instalar nada.' 
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-16 w-full max-w-md mx-auto"
    >
      <div className="flex items-center justify-center gap-3 mb-6">
        <CheckCircle className="w-6 h-6 text-green-500" />
        <h2 className="text-2xl font-bold text-white">
          PERGUNTAS FREQUENTES
        </h2>
      </div>
      
      <div className="bg-gray-900/70 border border-gray-700 rounded-xl p-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </motion.div>
  );
};

export default StaticFAQSection;