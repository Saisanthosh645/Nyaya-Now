import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle, RefreshCw, Sparkles, Volume2 } from 'lucide-react';
import { SupportedVoiceLang } from '../../services/voiceLanguageService';
import { VoiceWaveform } from './VoiceWaveform';

export type VoiceState =
  | 'IDLE'
  | 'LISTENING'
  | 'PROCESSING'
  | 'NORMALIZING'
  | 'ANALYZING'
  | 'RESPONSE'
  | 'ERROR';

interface VoiceRecorderProps {
  language: SupportedVoiceLang;
  voiceState: VoiceState;
  onVoiceStateChange: (state: VoiceState) => void;
  onTranscriptRecorded: (transcript: string) => void;
  onInterimTranscript?: (interim: string) => void;
  disabled?: boolean;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  language,
  voiceState,
  onVoiceStateChange,
  onTranscriptRecorded,
  onInterimTranscript,
  disabled = false
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMicSupported, setIsMicSupported] = useState<boolean>(true);
  const recognitionRef = useRef<any>(null);
  const finalTranscriptRef = useRef<string>('');

  // Determine speech recognition locale
  const getRecognitionLocale = (lang: SupportedVoiceLang): string => {
    switch (lang) {
      case 'te':
        return 'te-IN';
      case 'hi':
        return 'hi-IN';
      case 'en':
        return 'en-IN';
      case 'auto':
      default:
        // Indian English recognizes both English and phonetically transcribed Indian words well
        return 'en-IN';
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsMicSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.lang = getRecognitionLocale(language);

      recognition.onstart = () => {
        onVoiceStateChange('LISTENING');
        setErrorMessage(null);
        finalTranscriptRef.current = '';
      };

      recognition.onresult = (event: any) => {
        let interimText = '';
        let finalText = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalText += event.results[i][0].transcript;
          } else {
            interimText += event.results[i][0].transcript;
          }
        }

        if (finalText) {
          finalTranscriptRef.current = (finalTranscriptRef.current + ' ' + finalText).trim();
          if (onInterimTranscript) onInterimTranscript(finalTranscriptRef.current);
        } else if (interimText && onInterimTranscript) {
          onInterimTranscript((finalTranscriptRef.current + ' ' + interimText).trim());
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition event error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setErrorMessage('Microphone access denied. Please enable mic permissions in your browser.');
          onVoiceStateChange('ERROR');
        } else if (event.error === 'no-speech') {
          if (finalTranscriptRef.current.trim().length > 0) {
            // Already caught speech, commit it
            onTranscriptRecorded(finalTranscriptRef.current.trim());
          } else {
            setErrorMessage("We couldn't hear that clearly. Please try again.");
            onVoiceStateChange('ERROR');
          }
        } else {
          setErrorMessage('Speech recognition encountered a transient issue. Try speaking again or type.');
          onVoiceStateChange('ERROR');
        }
      };

      recognition.onend = () => {
        const transcript = finalTranscriptRef.current.trim();
        if (transcript.length > 0) {
          onTranscriptRecorded(transcript);
        } else if (voiceState === 'LISTENING') {
          onVoiceStateChange('IDLE');
        }
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('Speech recognition init error:', err);
      setIsMicSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
    };
  }, [language]);

  const handleStartRecording = () => {
    if (disabled) return;
    setErrorMessage(null);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMessage('Speech recognition is not supported in this browser. Please use the quick presets below or type.');
      onVoiceStateChange('ERROR');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.lang = getRecognitionLocale(language);
        recognitionRef.current.start();
      }
    } catch (err) {
      console.warn('Failed to start recognition, recreating instance:', err);
      try {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = getRecognitionLocale(language);
        rec.start();
        recognitionRef.current = rec;
      } catch (e) {
        setErrorMessage('Could not activate microphone. Please try again.');
        onVoiceStateChange('ERROR');
      }
    }
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
    const transcript = finalTranscriptRef.current.trim();
    if (transcript.length > 0) {
      onTranscriptRecorded(transcript);
    } else {
      onVoiceStateChange('IDLE');
    }
  };

  // State Title and Descriptions
  const getStateInfo = () => {
    switch (voiceState) {
      case 'LISTENING':
        return {
          title: language === 'te' ? 'వింటున్నాను…' : language === 'hi' ? 'सुन रहा हूँ…' : 'Listening…',
          desc: 'Speak naturally in Telugu, Hindi, or English. Describe what happened.',
          badgeColor: 'border-rose-500/50 bg-rose-500/10 text-rose-300'
        };
      case 'PROCESSING':
        return {
          title: 'Understanding your words…',
          desc: 'Transcribing speech audio and parsing phonetic structure…',
          badgeColor: 'border-amber-500/50 bg-amber-500/10 text-amber-300'
        };
      case 'NORMALIZING':
        return {
          title: 'Understanding your language…',
          desc: 'Detecting language dialect, code-mixing & legal intent…',
          badgeColor: 'border-blue-500/50 bg-blue-500/10 text-blue-300'
        };
      case 'ANALYZING':
        return {
          title: 'Finding relevant legal guidance…',
          desc: 'Synthesizing BNSS 2023, BNS & Constitutional protections…',
          badgeColor: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
        };
      case 'RESPONSE':
        return {
          title: 'Nyaya has understood your situation.',
          desc: 'Complete legal analysis generated in your language below.',
          badgeColor: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
        };
      case 'ERROR':
        return {
          title: errorMessage || "We couldn't hear that clearly. Please try again.",
          desc: 'Ensure microphone permissions are granted, or select one of the real-world voice presets below.',
          badgeColor: 'border-rose-500/50 bg-rose-500/10 text-rose-300'
        };
      case 'IDLE':
      default:
        return {
          title: language === 'te'
            ? 'న్యాయతో మాట్లాడండి'
            : language === 'hi'
            ? 'न्याय से बोलें'
            : 'Speak to Nyaya',
          desc: 'Tap and tell us what happened in your own words.',
          badgeColor: 'border-slate-700 bg-slate-900/90 text-slate-300'
        };
    }
  };

  const stateInfo = getStateInfo();
  const isListening = voiceState === 'LISTENING';
  const isBusy = ['PROCESSING', 'NORMALIZING', 'ANALYZING'].includes(voiceState);

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-950/90 via-slate-900/90 to-slate-950/90 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background ambient radial glow */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
        isListening
          ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-500/15 via-transparent to-transparent opacity-100'
          : isBusy
          ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent opacity-100'
          : 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800/20 via-transparent to-transparent opacity-50'
      }`} />

      {/* Top Status Pill */}
      <div className="relative z-10 mb-5">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold backdrop-blur-md transition-all ${stateInfo.badgeColor}`}>
          {isListening && <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />}
          {isBusy && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
          {voiceState === 'ERROR' && <AlertCircle className="w-3.5 h-3.5" />}
          {voiceState === 'RESPONSE' && <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
          <span>{stateInfo.title}</span>
        </div>
      </div>

      {/* Hero Waveform Container */}
      <div className="w-full max-w-sm h-14 mb-4 relative z-10">
        <VoiceWaveform
          isActive={isListening}
          isSpeaking={isBusy}
          color={isListening ? 'rose' : isBusy ? 'amber' : 'blue'}
          height={54}
        />
      </div>

      {/* Large Hero Microphone Button */}
      <div className="relative z-10 my-2">
        {/* Pulsing rings when listening */}
        {isListening && (
          <>
            <div className="absolute inset-0 rounded-full bg-rose-500/30 animate-ping duration-1000" />
            <div className="absolute -inset-4 rounded-full bg-rose-500/15 animate-pulse duration-700" />
          </>
        )}

        <button
          type="button"
          disabled={disabled || isBusy}
          onClick={isListening ? handleStopRecording : handleStartRecording}
          className={`relative group w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer shadow-2xl ${
            isListening
              ? 'bg-gradient-to-tr from-rose-600 to-rose-500 text-white shadow-rose-500/40 ring-4 ring-rose-500/30'
              : isBusy
              ? 'bg-gradient-to-tr from-amber-600 to-amber-500 text-white shadow-amber-500/30 animate-pulse'
              : 'bg-gradient-to-tr from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 shadow-amber-500/30 hover:scale-105 ring-4 ring-amber-500/20'
          }`}
          aria-label={isListening ? 'Stop Listening' : 'Speak to Nyaya'}
        >
          {isListening ? (
            <>
              <div className="w-7 h-7 bg-white rounded-md shadow-sm mb-1" />
              <span className="text-[11px] font-black uppercase tracking-wider text-white">
                Tap to Stop
              </span>
            </>
          ) : isBusy ? (
            <>
              <RefreshCw className="w-8 h-8 animate-spin mb-1 text-slate-950" />
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-950">
                Thinking…
              </span>
            </>
          ) : (
            <>
              <Mic className="w-9 h-9 sm:w-10 sm:h-10 text-slate-950 stroke-[2.5] mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-950">
                🎙 Speak
              </span>
            </>
          )}
        </button>
      </div>

      {/* Subtext description below button */}
      <p className="relative z-10 text-center text-xs sm:text-sm text-slate-400 max-w-sm mt-4 font-normal">
        {stateInfo.desc}
      </p>

      {/* Action if in ERROR state: Try again button */}
      {voiceState === 'ERROR' && (
        <div className="relative z-10 mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={handleStartRecording}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      )}

      {!isMicSupported && (
        <p className="relative z-10 text-[11px] text-amber-400/90 mt-2 text-center">
          Note: Browser microphone API unavailable. Use the 1-click citizen voice query presets below.
        </p>
      )}
    </div>
  );
};
