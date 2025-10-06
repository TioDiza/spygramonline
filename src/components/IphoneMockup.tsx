import React from 'react';

interface IphoneMockupProps {
  stepNumber: number;
  title: string;
  children: React.ReactNode;
}

const IphoneMockup: React.FC<IphoneMockupProps> = ({ stepNumber, title, children }) => {
  return (
    <>
      <style>{`
        :root {
          --iphone-bg: #1c1c1c;
          --iphone-border: #333;
          --screen-bg: #000;
          --text-color: #fff;
          --highlight-color: #C13584; /* Instagram Purple */
        }

        .iphone-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--text-color);
        }

        .step-info {
          text-align: center;
        }

        .step-number {
          display: inline-block;
          width: 30px;
          height: 30px;
          line-height: 30px;
          border-radius: 50%;
          background: var(--highlight-color);
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .step-title {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .outside-border {
          height: 700px;
          width: 350px;
          background-color: #1c1c1c;
          border-radius: 50px;
          border: 3px solid #333;
          position: relative;
          box-shadow: 0px 0px 30px rgba(255, 255, 255, 0.1);
        }

        .silencer {
          height: 25px;
          width: 4px;
          background-color: #333;
          position: absolute;
          left: -4px;
          top: 80px;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }

        .volume-up {
          height: 50px;
          width: 4px;
          background-color: #333;
          position: absolute;
          left: -4px;
          top: 120px;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }

        .volume-down {
          height: 50px;
          width: 4px;
          background-color: #333;
          position: absolute;
          left: -4px;
          top: 180px;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }

        .button-on {
          height: 80px;
          width: 4px;
          background-color: #333;
          position: absolute;
          right: -4px;
          top: 140px;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }

        .inside-border {
          height: 670px;
          width: 320px;
          background-color: #000;
          position: absolute;
          top: 15px;
          left: 15px;
          border-radius: 35px;
          overflow: hidden;
        }

        .camera {
          height: 30px;
          width: 150px;
          background-color: #000;
          position: absolute;
          top: 0px;
          left: 85px;
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
          z-index: 10;
        }

        .camera-dot {
          height: 10px;
          width: 10px;
          background-color: #2b2b2b;
          border-radius: 50%;
          position: absolute;
          top: 5px;
          left: 20px;
        }

        .camera-dot-2 {
          height: 3px;
          width: 3px;
          background-color: #414141;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 4px;
        }

        .camera-dot-3 {
          height: 3px;
          width: 3px;
          background-color: #414141;
          border-radius: 50%;
          position: absolute;
          top: 5px;
          left: 1px;
        }

        .camera-speaker {
          height: 5px;
          width: 50px;
          background-color: #2b2b2b;
          border-radius: 50px;
          position: absolute;
          top: 12.5px;
          left: 50px;
        }

        .bottom-line {
          height: 4px;
          width: 120px;
          background-color: #fff;
          border-radius: 50px;
          position: absolute;
          bottom: 10px;
          left: 100px;
        }

        .screen-content {
          position: absolute;
          top: 40px; /* Below the notch */
          left: 0;
          right: 0;
          bottom: 0;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 1.5rem;
          color: #e0e0e0;
        }
      `}</style>
      <div className="iphone-container">
        <div className="step-info">
          <span className="step-number">{stepNumber}</span>
          <h3 className="step-title">{title}</h3>
        </div>
        <section>
          <div className="outside-border">
            <div className="silencer"></div>
            <div className="volume-up"></div>
            <div className="volume-down"></div>
            <div className="button-on"></div>
            <div className="inside-border">
              <div className="camera">
                <div className="camera-dot">
                  <div className="camera-dot-2"></div>
                  <div className="camera-dot-3"></div>
                </div>
                <div className="camera-speaker"></div>
              </div>
              <div className="screen-content">
                {children}
              </div>
              <div className="bottom-line"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IphoneMockup;