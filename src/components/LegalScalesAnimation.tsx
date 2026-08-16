import React, { useState } from 'react';
import { AshokaChakra } from './AshokaChakra';

interface LegalScalesAnimationProps {
  size?: number;
  className?: string;
  interactive?: boolean;
}

export const LegalScalesAnimation: React.FC<LegalScalesAnimationProps> = ({
  size = 180,
  className = '',
  interactive = true,
}) => {
  const [tilt, setTilt] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const normalized = (x / rect.width) * 2 - 1; // -1 to 1
    setTilt(normalized * 12); // degrees
  };

  const handleMouseLeave = () => {
    setTilt(0);
    setIsHovered(false);
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none group cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      title="Scales of Justice • Nyaya (Balance of Law)"
    >
      <svg
        width={size}
        height={size * 0.85}
        viewBox="0 0 200 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible filter drop-shadow-md"
      >
        {/* Glow Filters */}
        <defs>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="saffronGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9933" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
          <linearGradient id="navyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>

        {/* Central Stand / Pillar (Satyameva Jayate Base) */}
        {/* Base Platform */}
        <rect x="75" y="145" width="50" height="8" rx="4" fill="url(#goldGradient)" />
        <rect x="85" y="140" width="30" height="6" rx="3" fill="#B45309" />
        <path d="M96 140 L97 45 L103 45 L104 140 Z" fill="url(#goldGradient)" stroke="#92400E" strokeWidth="1" />
        
        {/* Central Pillar Finial Ring */}
        <circle cx="100" cy="45" r="7" fill="url(#goldGradient)" stroke="#78350F" strokeWidth="1.5" />
        <circle cx="100" cy="45" r="3.5" fill="#1E293B" />

        {/* Ashoka Chakra Center Emblem on Pillar */}
        <g transform="translate(93, 75)">
          <circle cx="7" cy="7" r="8" fill="#0F172A" stroke="url(#navyGradient)" strokeWidth="1.2" />
          {/* Spoke lines */}
          <line x1="7" y1="1" x2="7" y2="13" stroke="#38BDF8" strokeWidth="0.8" />
          <line x1="1" y1="7" x2="13" y2="7" stroke="#38BDF8" strokeWidth="0.8" />
          <line x1="2.7" y1="2.7" x2="11.3" y2="11.3" stroke="#38BDF8" strokeWidth="0.8" />
          <line x1="2.7" y1="11.3" x2="11.3" y2="2.7" stroke="#38BDF8" strokeWidth="0.8" />
          <circle cx="7" cy="7" r="1.5" fill="#F8FAFC" />
        </g>

        {/* Tilting Scales Beam Assembly */}
        <g
          style={{
            transformOrigin: '100px 45px',
            transform: `rotate(${isHovered ? tilt : Math.sin(Date.now() / 1000) * 2}deg)`,
            transition: isHovered ? 'transform 0.15s ease-out' : 'transform 2s ease-in-out',
          }}
          className={!isHovered ? 'animate-subtle-balance' : ''}
        >
          {/* Top Main Beam with tapered ornate ends */}
          <path
            d="M 30 46 Q 100 40 170 46 Q 100 43 30 46 Z"
            fill="url(#goldGradient)"
            stroke="#78350F"
            strokeWidth="1.2"
          />
          <circle cx="30" cy="46" r="3" fill="#FEF08A" stroke="#78350F" strokeWidth="1" />
          <circle cx="170" cy="46" r="3" fill="#FEF08A" stroke="#78350F" strokeWidth="1" />

          {/* Left Pan Chains & Pan */}
          <g transform="translate(30, 46)">
            {/* Chains */}
            <line x1="0" y1="0" x2="-14" y2="35" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.85" />
            <line x1="0" y1="0" x2="0" y2="35" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.85" />
            <line x1="0" y1="0" x2="14" y2="35" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.85" />
            
            {/* Left Pan (Constitutional Law / Rights) */}
            <path
              d="M -22 35 C -22 48 22 48 22 35 Z"
              fill="url(#goldGradient)"
              stroke="#92400E"
              strokeWidth="1.2"
            />
            {/* Tricolor Indicator in Pan */}
            <rect x="-14" y="38" width="28" height="2" rx="1" fill="#FF9933" />
            <rect x="-14" y="41" width="28" height="2" rx="1" fill="#FFFFFF" opacity="0.9" />
            <rect x="-14" y="44" width="28" height="2" rx="1" fill="#138808" />
          </g>

          {/* Right Pan Chains & Pan */}
          <g transform="translate(170, 46)">
            {/* Chains */}
            <line x1="0" y1="0" x2="-14" y2="35" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.85" />
            <line x1="0" y1="0" x2="0" y2="35" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.85" />
            <line x1="0" y1="0" x2="14" y2="35" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.85" />
            
            {/* Right Pan (Due Process / BNSS 2023) */}
            <path
              d="M -22 35 C -22 48 22 48 22 35 Z"
              fill="url(#goldGradient)"
              stroke="#92400E"
              strokeWidth="1.2"
            />
            {/* Sovereign Emblem in Pan */}
            <rect x="-14" y="38" width="28" height="2" rx="1" fill="#38BDF8" />
            <rect x="-14" y="41" width="28" height="2" rx="1" fill="#F8FAFC" opacity="0.9" />
            <rect x="-14" y="44" width="28" height="2" rx="1" fill="#F59E0B" />
          </g>
        </g>
      </svg>

      {/* Motto Subscript */}
      <div className="flex items-center space-x-1.5 mt-1 opacity-90 transition-opacity group-hover:opacity-100">
        <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase">
          सत्यमेव जयते
        </span>
        <span className="text-slate-600 text-[10px]">•</span>
        <span className="text-[9px] font-bold text-slate-300 tracking-wider">
          JUSTICE • EQUALITY • LAW
        </span>
      </div>
    </div>
  );
};
