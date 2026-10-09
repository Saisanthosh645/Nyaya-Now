import React, { useEffect, useRef } from 'react';

interface VoiceWaveformProps {
  isActive: boolean;
  isSpeaking?: boolean;
  color?: 'amber' | 'emerald' | 'blue' | 'rose';
  height?: number;
  barCount?: number;
}

export const VoiceWaveform: React.FC<VoiceWaveformProps> = ({
  isActive,
  isSpeaking = false,
  color = 'amber',
  height = 54,
  barCount = 28
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const h = canvas.height;
      const centerY = h / 2;
      const barWidth = Math.max(2.5, width / (barCount * 1.6));
      const spacing = (width - barCount * barWidth) / (barCount - 1);

      // Color scheme based on state
      let primaryColor = '#f59e0b'; // amber
      let secondaryColor = '#d97706';
      let glowColor = 'rgba(245, 158, 11, 0.4)';

      if (color === 'rose' || isActive) {
        primaryColor = '#f43f5e';
        secondaryColor = '#fb7185';
        glowColor = 'rgba(244, 63, 94, 0.45)';
      } else if (color === 'emerald' || isSpeaking) {
        primaryColor = '#10b981';
        secondaryColor = '#34d399';
        glowColor = 'rgba(16, 185, 129, 0.45)';
      } else if (color === 'blue') {
        primaryColor = '#38bdf8';
        secondaryColor = '#0284c7';
        glowColor = 'rgba(56, 189, 248, 0.45)';
      }

      ctx.shadowBlur = isActive || isSpeaking ? 8 : 0;
      ctx.shadowColor = glowColor;

      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + spacing);
        const normalizedIndex = i / (barCount - 1); // 0 to 1
        
        // Bell curve envelope so center bars are taller
        const envelope = Math.sin(normalizedIndex * Math.PI);

        let barHeight = 4; // Idle minimal height

        if (isActive || isSpeaking) {
          // Dynamic undulating wave
          const wave1 = Math.sin(phase + i * 0.4) * 0.5 + 0.5;
          const wave2 = Math.cos(phase * 1.3 + i * 0.25) * 0.5 + 0.5;
          const intensity = (wave1 * 0.6 + wave2 * 0.4);
          barHeight = Math.max(5, (h * 0.85) * envelope * intensity);
        } else {
          // Subtle breathing in idle
          const breath = Math.sin(phase * 0.4 + i * 0.15) * 2;
          barHeight = Math.max(4, 6 * envelope + breath);
        }

        const y = centerY - barHeight / 2;

        // Gradient for each bar
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, primaryColor);
        gradient.addColorStop(1, secondaryColor);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        // Pill-shaped rounded rectangle
        ctx.roundRect(x, y, barWidth, barHeight, barWidth / 2);
        ctx.fill();
      }

      phase += isActive ? 0.14 : isSpeaking ? 0.11 : 0.03;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, isSpeaking, color, barCount]);

  return (
    <div className="w-full flex items-center justify-center overflow-hidden py-1">
      <canvas
        ref={canvasRef}
        width={360}
        height={height}
        className="max-w-full drop-shadow-sm"
      />
    </div>
  );
};
