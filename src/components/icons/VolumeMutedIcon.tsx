import React from 'react';

const VolumeMutedIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
    <line x1="23" y1="1" x2="1" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default VolumeMutedIcon;