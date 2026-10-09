import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { Language } from '../../types';

interface VoiceInputProps {
  language: Language;
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  language,
  onTranscript,
  disabled = false
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Map app language to speech recognition locale
  const getSpeechLocale = (lang: Language) => {
    switch (lang) {
      case 'hi':
        return 'hi-IN';
      case 'te':
        return 'te-IN';
      default:
        return 'en-IN';
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = getSpeechLocale(language);

      recognition.onstart = () => {
        setIsRecording(true);
        setErrorMessage(null);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          onTranscript(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        setIsRecording(false);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access denied. Please allow microphone permissions.');
        } else if (event.error === 'no-speech') {
          setErrorMessage(null);
        } else {
          setErrorMessage('Speech recognition error. Please type your problem.');
        }
        setTimeout(() => setErrorMessage(null), 3500);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('Speech recognition initialization error:', err);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
    };
  }, [language, onTranscript]);

  const toggleRecording = () => {
    if (disabled) return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMessage('Speech recognition is not supported in this browser. Please type.');
      setTimeout(() => setErrorMessage(null), 3500);
      return;
    }

    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.lang = getSpeechLocale(language);
          recognitionRef.current.start();
        } catch (err) {
          console.warn('Recognition start error:', err);
          setIsRecording(false);
        }
      }
    }
  };

  const label = isRecording
    ? language === 'hi'
      ? 'सुन रहा हूँ...'
      : language === 'te'
      ? 'వింటున్నాను...'
      : 'Listening...'
    : language === 'hi'
    ? 'अपनी समस्या बोलें'
    : language === 'te'
    ? 'మీ సమస్యను మాట్లాడండి'
    : 'Speak your problem';

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={toggleRecording}
        disabled={disabled}
        className={`group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
          isRecording
            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)] animate-pulse'
            : 'bg-slate-800/80 hover:bg-slate-700/90 text-slate-300 hover:text-white border border-slate-700/60 hover:border-amber-500/40'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={label}
      >
        {/* Microphone icon with recording indicator */}
        <div className="relative flex items-center justify-center">
          {isRecording ? (
            <Mic className="w-4 h-4 text-rose-400 animate-bounce" />
          ) : (
            <Mic className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          )}

          {isRecording && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          )}
        </div>

        {/* Subtle Waveform Animation when recording */}
        {isRecording ? (
          <div className="flex items-center gap-0.5 h-3 px-1">
            <span className="w-1 bg-rose-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2.5" />
            <span className="w-1 bg-rose-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-4" />
            <span className="w-1 bg-rose-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite] h-1.5" />
            <span className="w-1 bg-rose-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-3" />
            <span className="w-1 bg-rose-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2" />
          </div>
        ) : null}

        <span className="hidden sm:inline font-medium">{label}</span>
      </button>

      {/* Error notification popup */}
      {errorMessage && (
        <div className="absolute bottom-full left-0 mb-2 w-64 p-2.5 rounded-lg bg-rose-950/95 border border-rose-700 text-rose-200 text-xs shadow-xl z-30 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
