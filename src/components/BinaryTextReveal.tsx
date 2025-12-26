import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TARGET_WORD = 'SPYGRAM';
// Código binário ASCII de 8 bits para S P Y G R A M
const TARGET_BINARY = [
  '01010011', 
  '01010000', 
  '01011001', 
  '01000111', 
  '01010010', 
  '01000001', 
  '01001101', 
];

// Gera uma string binária aleatória do tamanho especificado
const generateRandomBinary = (length: number) => {
  let binary = '';
  for (let i = 0; i < length; i++) {
    binary += Math.random() > 0.5 ? '1' : '0';
  }
  return binary;
};

const BinaryTextReveal: React.FC = () => {
  // Estado que armazena a string binária atualmente exibida para cada caractere
  const [displayBinary, setDisplayBinary] = useState<string[]>(
    TARGET_BINARY.map(b => generateRandomBinary(b.length))
  );
  // Contador de quantos caracteres já foram totalmente resolvidos
  const [resolvedCount, setResolvedCount] = useState(0); 

  useEffect(() => {
    if (resolvedCount >= TARGET_BINARY.length) return;

    const interval = setInterval(() => {
      setDisplayBinary(prev => {
        const newBinary = [...prev];
        
        for (let charIndex = 0; charIndex < TARGET_BINARY.length; charIndex++) {
          const target = TARGET_BINARY[charIndex];
          let current = newBinary[charIndex];
          
          if (charIndex < resolvedCount) {
            // Caractere já resolvido, mantém estático
            newBinary[charIndex] = target;
            continue;
          }

          if (charIndex === resolvedCount) {
            // Caractere atualmente em resolução
            let updated = false;
            let newCurrent = '';
            
            for (let i = 0; i < target.length; i++) {
              if (current[i] !== target[i] && !updated) {
                // Vira o primeiro bit incorreto para o valor alvo
                newCurrent += target[i];
                updated = true;
              } else if (updated) {
                // Randomiza o restante dos bits após o ponto de virada
                newCurrent += Math.random() > 0.5 ? '1' : '0';
              } else {
                // Mantém os bits já corretos
                newCurrent += current[i];
              }
            }
            
            newBinary[charIndex] = newCurrent;
            
            if (newCurrent === target) {
              // Totalmente resolvido, avança para o próximo caractere
              setResolvedCount(prevCount => prevCount + 1);
            }
          } else {
            // Caracteres esperando a vez, mantém randomizados
            newBinary[charIndex] = generateRandomBinary(target.length);
          }
        }
        
        return newBinary;
      });
    }, 80); // Velocidade de virada de bit (80ms)

    return () => clearInterval(interval);
  }, [resolvedCount]);

  return (
    <div className="text-center font-mono mb-6">
      {/* Exibição do Código Binário */}
      <div className="text-2xl md:text-4xl font-bold">
        {displayBinary.map((binary, charIndex) => (
          <motion.span
            key={charIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: charIndex * 0.1 }}
            className={`inline-block mx-1 transition-colors duration-300 ${
              charIndex < resolvedCount ? 'text-purple-400' : 'text-gray-600'
            }`}
          >
            {binary}
          </motion.span>
        ))}
      </div>
      {/* Exibição da Palavra Decodificada */}
      <div className="text-white text-lg mt-2">
        {TARGET_WORD.split('').map((char, index) => (
            <span 
                key={index} 
                className={`inline-block mx-1 transition-colors duration-300 ${
                    index < resolvedCount ? 'text-yellow-400' : 'text-gray-700'
                }`}
            >
                {char}
            </span>
        ))}
      </div>
    </div>
  );
};

export default BinaryTextReveal;