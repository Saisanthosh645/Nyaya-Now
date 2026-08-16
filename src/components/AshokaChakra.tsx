import React from 'react';

interface AshokaChakraProps {
  className?: string;
  size?: number | string;
  speed?: 'slow' | 'medium' | 'fast' | 'none';
  color?: string;
  strokeWidth?: number;
  glow?: boolean;
  reverse?: boolean;
  showRays?: boolean;
}

export const AshokaChakra: React.FC<AshokaChakraProps> = ({
  className = '',
  size = 120,
  speed = 'slow',
  color = 'currentColor',
  strokeWidth = 2,
  glow = false,
  reverse = false,
  showRays = true
}) => {
  const spokesCount = 24;
  const cx = 100;
  const cy = 100;
  const innerR = 14;
  const outerR = 86;

  // Pre-calculate 24 spokes
  const spokes = Array.from({ length: spokesCount }, (_, i) => {
    const angleDeg = i * (360 / spokesCount);
    const angleRad = (angleDeg * Math.PI) / 180;
    
    // Outer point
    const x2 = cx + outerR * Math.sin(angleRad);
    const y2 = cy - outerR * Math.cos(angleRad);
    
    // Left/Right base points on inner hub for the tapered spoke blade
    const perpAngleRad = angleRad + Math.PI / 2;
    const baseWidth = 2.4;
    const xBaseL = cx + innerR * Math.sin(angleRad) + baseWidth * Math.sin(perpAngleRad);
    const yBaseL = cy - innerR * Math.cos(angleRad) - baseWidth * Math.cos(perpAngleRad);
    const xBaseR = cx + innerR * Math.sin(angleRad) - baseWidth * Math.sin(perpAngleRad);
    const yBaseR = cy - innerR * Math.cos(angleRad) + baseWidth * Math.cos(perpAngleRad);

    // Decorative outer rim bead between spokes
    const halfAngleRad = ((angleDeg + 7.5) * Math.PI) / 180;
    const beadR = 90.5;
    const bx = cx + beadR * Math.sin(halfAngleRad);
    const by = cy - beadR * Math.cos(halfAngleRad);

    return {
      id: i,
      path: `M ${cx} ${cy} L ${xBaseL} ${yBaseL} L ${x2} ${y2} L ${xBaseR} ${yBaseR} Z`,
      line: { x1: cx, y1: cy, x2, y2 },
      bead: { bx, by }
    };
  });

  const speedClass = {
    slow: reverse ? 'animate-spin-reverse-slow' : 'animate-spin-slow',
    medium: reverse ? 'animate-spin-reverse-medium' : 'animate-spin-medium',
    fast: reverse ? 'animate-spin-fast' : 'animate-spin-fast',
    none: ''
  }[speed];

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none pointer-events-none ${glow ? 'filter drop-shadow-[0_0_12px_rgba(217,119,6,0.35)]' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        className={`w-full h-full ${speedClass}`}
        style={{ transformOrigin: 'center center', willChange: 'transform' }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="chakraHubGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="80%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </radialGradient>
        </defs>

        {/* Outer concentric decorative rim */}
        <circle
          cx={cx}
          cy={cy}
          r="95"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth * 0.8}
          strokeOpacity="0.35"
        />
        
        {/* Main outer rim */}
        <circle
          cx={cx}
          cy={cy}
          r="89"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth * 1.5}
        />

        {/* Inner rim just inside outer wheel */}
        <circle
          cx={cx}
          cy={cy}
          r="84"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth * 0.7}
          strokeOpacity="0.6"
        />

        {/* 24 Decorative beads on outer perimeter */}
        {spokes.map((s) => (
          <circle
            key={`bead-${s.id}`}
            cx={s.bead.bx}
            cy={s.bead.by}
            r="1.8"
            fill={color}
            opacity="0.85"
          />
        ))}

        {/* 24 Spokes (Tapered Rays) */}
        {showRays && spokes.map((s) => (
          <path
            key={`spoke-${s.id}`}
            d={s.path}
            fill={color}
            stroke={color}
            strokeWidth={0.5}
            strokeLinejoin="round"
          />
        ))}

        {/* Outer Hub Ring */}
        <circle
          cx={cx}
          cy={cy}
          r={innerR + 3}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth * 1.1}
        />

        {/* Central Hub Fill */}
        <circle
          cx={cx}
          cy={cy}
          r={innerR}
          fill="url(#chakraHubGradient)"
          stroke={color}
          strokeWidth={strokeWidth}
        />

        {/* Core Center Pin / Bindu */}
        <circle
          cx={cx}
          cy={cy}
          r="5"
          fill={color}
        />
        <circle
          cx={cx}
          cy={cy}
          r="2.5"
          fill="#ffffff"
          opacity="0.9"
        />
      </svg>
    </div>
  );
};
