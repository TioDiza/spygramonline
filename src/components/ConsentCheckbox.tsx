import React from 'react';

interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ConsentCheckbox: React.FC<ConsentCheckboxProps> = ({ checked, onChange }) => {
  return (
    <>
      <label className="flex items-center space-x-2 cursor-pointer">
        <div className="neon-checkbox">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <div className="neon-checkbox__frame">
            <div className="neon-checkbox__box"></div>
            <div className="neon-checkbox__check-container">
              <svg className="neon-checkbox__check" viewBox="0 0 16 16">
                <polyline points="4,8 7,12 12,4"></polyline>
              </svg>
            </div>
            <div className="neon-checkbox__glow"></div>
            <div className="neon-checkbox__borders">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="neon-checkbox__particles">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="neon-checkbox__rings">
              <div className="ring"></div>
              <div className="ring"></div>
              <div className="ring"></div>
            </div>
            <div className="neon-checkbox__sparks">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <span className="text-gray-300 text-sm">Realmente quero ter acesso ao perfil acima.</span>
      </label>
    </>
  );
};

export default ConsentCheckbox;