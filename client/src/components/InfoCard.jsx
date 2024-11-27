import React, { useState } from 'react';
import infoIcon from '../assets/infoIcon.svg'

export default function InfoCard({text, style}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className="relative flex">
      <button
        id='infoCard'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`p-1 bg-slate-400 rounded-lg hover:bg-slate-500 ${style}`}
        aria-label="Información"
      >
        <img src={infoIcon} alt="" />
      </button>
      {isHovered && (
        <div className="absolute top-0 left-full ml-2 p-2 bg-gray-600 opacity-1 text-white rounded-md shadow-md w-40">
          <p className=''>{text}</p>
        </div>
      )}
    </div>
  );
}
