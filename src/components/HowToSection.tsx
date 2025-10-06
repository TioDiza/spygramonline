import React, { useState } from 'react';

const steps = [
  {
    title: "Passo 1: Insira o @ do Perfil",
    description: "Digite o nome de usuário do Instagram que você deseja investigar no campo de busca. Não é necessário usar o '@'.",
    image: "/passo1.png"
  },
  {
    title: "Passo 2: Aguarde a Invasão",
    description: "Nossa ferramenta irá iniciar o processo de invasão. Acompanhe o status em tempo real enquanto quebramos as barreiras de segurança.",
    image: "/passo2.png"
  },
  {
    title: "Passo 3: Acesse os Dados",
    description: "Após a conclusão, você terá acesso total ao perfil, incluindo mensagens, mídias apagadas e muito mais. A verdade está a um clique.",
    image: "/passo3.png"
  }
];

const HowToSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="mt-20 w-full max-w-5xl mx-auto text-center animate-fade-in">
      <h2 className="text-4xl font-extrabold mb-12 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
        Como Funciona? É Simples.
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
        {/* iPhone Mockup */}
        <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl flex-shrink-0">
          <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
          <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
          <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black">
            <img src={steps[activeStep].image} className="w-full h-full object-cover transition-opacity duration-500" alt={`Passo ${activeStep + 1}`} />
          </div>
        </div>

        {/* Steps Description */}
        <div className="md:w-1/2 text-left">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`p-6 mb-4 rounded-lg cursor-pointer transition-all duration-300 border-2 ${activeStep === index ? 'border-purple-500 bg-gray-800/50 shadow-lg shadow-purple-500/10' : 'border-transparent hover:bg-gray-800/30'}`}
              onMouseEnter={() => setActiveStep(index)}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToSection;