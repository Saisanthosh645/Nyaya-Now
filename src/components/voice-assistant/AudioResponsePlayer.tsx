import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, RotateCcw, FastForward, Sparkles } from 'lucide-react';
import { Language } from '../../types';
import { VoiceLanguageService } from '../../services/voiceLanguageService';
import { VoiceWaveform } from './VoiceWaveform';

interface AudioResponsePlayerProps {
  textToSpeak: string;
  language: Language;
  label?: string;
  largeTextMode?: boolean;
}

export const AudioResponsePlayer: React.FC<AudioResponsePlayerProps> = ({
  textToSpeak,
  language,
  label,
  largeTextMode = false
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1.0);
  const stopFnRef = useRef<(() => void) | null>(null);

  // Stop speech when component unmounts or text changes
  useEffect(() => {
    return () => {
      if (stopFnRef.current) {
        stopFnRef.current();
      }
      VoiceLanguageService.stopSpeaking();
    };
  }, [textToSpeak]);

  const handlePlay = () => {
    if (isPlaying) {
      // Pause / Stop
      handleStop();
      return;
    }

    const cancel = VoiceLanguageService.speakText(
      textToSpeak,
      language,
      speed,
      () => setIsPlaying(true),
      () => setIsPlaying(false),
      () => setIsPlaying(false)
    );

    stopFnRef.current = cancel;
  };

  const handleStop = () => {
    if (stopFnRef.current) {
      stopFnRef.current();
    }
    VoiceLanguageService.stopSpeaking();
    setIsPlaying(false);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (isPlaying) {
      // Restart at new speed
      handleStop();
      setTimeout(() => {
        const cancel = VoiceLanguageService.speakText(
          textToSpeak,
          language,
          newSpeed,
          () => setIsPlaying(true),
          () => setIsPlaying(false),
          () => setIsPlaying(false)
        );
        stopFnRef.current = cancel;
      }, 100);
    }
  };

  const getAudioButtonLabel = () => {
    if (isPlaying) return 'Pause Audio';
    if (language === 'te') return '🔊 తెలుగులో వినండి (Listen in Telugu)';
    if (language === 'hi') return '🔊 हिंदी में सुनें (Listen in Hindi)';
    return '🔊 Listen in Indian English';
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-3.5 sm:p-4 shadow-lg">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left Side: Play/Stop Button & Animated Status */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handlePlay}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 shrink-0 ${
              isPlaying
                ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/25 ring-2 ring-emerald-400'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-slate-950 stroke-none" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-slate-950 stroke-none" />
                <span>{getAudioButtonLabel()}</span>
              </>
            )}
          </button>

          {isPlaying && (
            <button
              type="button"
              onClick={handleStop}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
              title="Stop audio"
            >
              <Square className="w-3.5 h-3.5 fill-slate-300 stroke-none" />
            </button>
          )}

          {/* Speaking Indicator */}
          {isPlaying && (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 animate-pulse">
              <Volume2 className="w-4 h-4 animate-bounce" />
              <span className="hidden md:inline">Nyaya is speaking in {language === 'te' ? 'Telugu' : language === 'hi' ? 'Hindi' : 'English'}…</span>
            </div>
          )}
        </div>

        {/* Center / Waveform when playing */}
        {isPlaying && (
          <div className="w-36 h-8 hidden lg:block">
            <VoiceWaveform isActive={false} isSpeaking={true} color="emerald" height={32} barCount={18} />
          </div>
        )}

        {/* Right Side: Speed Rate Controls */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs">
          <span className="text-[11px] text-slate-500 font-medium mr-1 hidden sm:inline">Speed:</span>
          {[0.75, 1.0, 1.25].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSpeedChange(s)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                speed === s
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-xs'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
