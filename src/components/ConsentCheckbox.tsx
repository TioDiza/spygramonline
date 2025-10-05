import React from 'react';

interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ConsentCheckbox: React.FC<ConsentCheckboxProps> = ({ checked, onChange }) => {
  return (
    <>
      <style>{`
        /* From Uiverse.io by PriyanshuGupta28 - Adaptado por Dyad */ 
        .checkbox-wrapper:hover .check {
          stroke-dashoffset: 0;
        }

        .checkbox-wrapper {
          position: relative;
          display: inline-block;
          width: 28px; /* Tamanho reduzido */
          height: 28px; /* Tamanho reduzido */
        }

        .checkbox-wrapper .background {
          fill: #4A2C70; /* Roxo escuro, inspirado no Instagram */
          transition: ease all 0.6s;
          -webkit-transition: ease all 0.6s;
        }

        .checkbox-wrapper .stroke {
          fill: none;
          stroke: #fff;
          stroke-miterlimit: 10;
          stroke-width: 2px;
          stroke-dashoffset: 100;
          stroke-dasharray: 100;
          transition: ease all 0.6s;
          -webkit-transition: ease all 0.6s;
        }

        .checkbox-wrapper .check {
          fill: none;
          stroke: #fff;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 2px;
          stroke-dashoffset: 22;
          stroke-dasharray: 22;
          transition: ease all 0.6s;
          -webkit-transition: ease all 0.6s;
        }

        .checkbox-wrapper input[type=checkbox] {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          margin: 0;
          opacity: 0;
          -appearance: none;
          -webkit-appearance: none;
        }

        .checkbox-wrapper input[type=checkbox]:hover {
          cursor: pointer;
        }

        .checkbox-wrapper input[type=checkbox]:checked + svg .background {
          fill: #C13584; /* Rosa/Roxo vibrante, inspirado no Instagram */
        }

        .checkbox-wrapper input[type=checkbox]:checked + svg .stroke {
          stroke-dashoffset: 0;
        }

        .checkbox-wrapper input[type=checkbox]:checked + svg .check {
          stroke-dashoffset: 0;
        }
      `}</style>
      <label className="flex items-center space-x-3 cursor-pointer">
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <svg viewBox="0 0 32 32">
            <path
              d="M 16,5 C 7.714,5 1,11.714 1,20 C 1,28.286 7.714,35 16,35 C 24.286,35 31,28.286 31,20 C 31,11.714 24.286,5 16,5 Z"
              className="background"
            ></path>
            <circle cx="16" cy="20" r="14" className="stroke"></circle>
            <polyline className="check" points="11.5,20 15,24.5 20.5,17.5"></polyline>
          </svg>
        </div>
        <span className="text-gray-300 text-base">Realmente quero ter acesso ao perfil acima.</span>
      </label>
    </>
  );
};

export default ConsentCheckbox;