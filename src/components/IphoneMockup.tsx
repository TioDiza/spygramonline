import React from 'react';

interface IphoneMockupProps {
  stepNumber: number;
  title: string;
  imageUrl: string;
}

const IphoneMockup: React.FC<IphoneMockupProps> = ({ stepNumber, title, imageUrl }) => {
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
          height: 500px; /* Reduced from 700px */
          width: 250px; /* Reduced from 350px */
          background-color: #1c1c1c;
          border-radius: 40px; /* Adjusted */
          border: 3px solid #333;
          position: relative;
          box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.08);
        }

        .silencer {
          height: 20px;
          width: 3px;
          background-color: #333;
          position: absolute;
          left: -3px;
          top: 70px;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }

        .volume-up {
          height: 40px;
          width: 3px;
          background-color: #333;
          position: absolute;
          left: -3px;
          top: 100px;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }

        .volume-down {
          height: 40px;
          width: 3px;
          background-color: #333;
          position: absolute;
          left: -3px;
          top: 150px;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }

        .button-on {
          height: 60px;
          width: 3px;
          background-color: #333;
          position: absolute;
          right: -3px;
          top: 120px;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }

        .inside-border {
          height: 480px; /* Adjusted */
          width: 230px; /* Adjusted */
          background-color: #000;
          position: absolute;
          top: 10px; /* Adjusted */
          left: 10px; /* Adjusted */
          border-radius: 30px; /* Adjusted */
          overflow: hidden;
        }

        .camera {
          height: 25px; /* Adjusted */
          width: 120px; /* Adjusted */
          background-color: #000;
          position: absolute;
          top: 0px;
          left: 55px; /* Adjusted */
          border-bottom-left-radius: 12px; /* Adjusted */
          border-bottom-right-radius: 12px; /* Adjusted */
          z-index: 10;
        }

        .camera-dot {
          height: 8px;
          width: 8px;
          background-color: #2b2b2b;
          border-radius: 50%;
          position: absolute;
          top: 5px;
          left: 15px;
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
          height: 4px;
          width: 40px;
          background-color: #2b2b2b;
          border-radius: 50px;
          position: absolute;
          top: 10px;
          left: 40px;
        }

        .screen-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
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
              <img src={imageUrl} alt={title} className="screen-image" />
              <div className="camera">
                <div className="camera-dot">
                  <div className="camera-dot-2"></div>
                  <div className="camera-dot-3"></div>
                </div>
                <div className="camera-speaker"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IphoneMockup;