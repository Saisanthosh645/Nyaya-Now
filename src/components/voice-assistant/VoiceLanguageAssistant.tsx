import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  ArrowLeft, 
  Sparkles, 
  Globe, 
  Volume2, 
  HelpCircle, 
  Shield, 
  Scale, 
  Check, 
  Type, 
  Headphones,
  Zap,
  Info
} from 'lucide-react';
import { Language } from '../../types';
import { 
  SupportedVoiceLang, 
  REAL_WORLD_VOICE_SAMPLES, 
  VoiceSampleScenario,
  VoiceAssistantResponse,
  VoiceLanguageService,
  LanguageDetectionResult
} from '../../services/voiceLanguageService';
import { LanguageSelectorPills } from './LanguageSelectorPills';
import { VoiceRecorder, VoiceState } from './VoiceRecorder';
import { SpeechTranscript } from './SpeechTranscript';
import { LanguageResponse } from './LanguageResponse';
import { VoicePrivacyNotice } from './VoicePrivacyNotice';
import { AshokaChakra } from '../AshokaChakra';

interface VoiceLanguageAssistantProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateBack: () => void;
}

export const VoiceLanguageAssistant: React.FC<VoiceLanguageAssistantProps> = ({
  currentLanguage,
  onLanguageChange,
  onNavigateBack
}) => {
  const [selectedVoiceLang, setSelectedVoiceLang] = useState<SupportedVoiceLang>('auto');
  const [voiceState, setVoiceState] = useState<VoiceState>('IDLE');
  const [transcript, setTranscript] = useState<string>('');
  const [detection, setDetection] = useState<LanguageDetectionResult | null>(null);
  const [activeResponse, setActiveResponse] = useState<VoiceAssistantResponse | null>(null);
  const [activeResponseLang, setActiveResponseLang] = useState<Language>(currentLanguage);
  const [largeTextMode, setLargeTextMode] = useState<boolean>(false);
  const [showTypeInput, setShowTypeInput] = useState<boolean>(false);
  const [typedInput, setTypedInput] = useState<string>('');

  // Handle pipeline execution
  const processQuery = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed) return;

    setTranscript(trimmed);
    setVoiceState('PROCESSING');

    // 1. Detection
    const detected = VoiceLanguageService.detectLanguage(trimmed);
    setDetection(detected);

    setVoiceState('NORMALIZING');
    await new Promise((r) => setTimeout(r, 450));

    setVoiceState('ANALYZING');

    try {
      const result = await VoiceLanguageService.processVoiceQuery(trimmed, selectedVoiceLang);
      setActiveResponse(result);
      setActiveResponseLang(result.targetLang);
      setVoiceState('RESPONSE');
    } catch (err) {
      console.error('Voice processing failed:', err);
      setVoiceState('ERROR');
    }
  };

  const handleClearSession = () => {
    setTranscript('');
    setDetection(null);
    setActiveResponse(null);
    setVoiceState('IDLE');
    setTypedInput('');
    VoiceLanguageService.stopSpeaking();
  };

  const handleSampleSelect = (sample: VoiceSampleScenario) => {
    setTranscript(sample.transcript);
    processQuery(sample.transcript);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header & Navigation */}
      <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={onNavigateBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs sm:text-sm font-semibold cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Nyaya Now</span>
          </button>

          {/* Center Badge */}
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-black border border-amber-500/40">
              02
            </span>
            <span className="text-xs sm:text-sm font-black tracking-tight text-white uppercase hidden sm:inline">
              Voice + Indian Languages
            </span>
          </div>

          {/* Right Accessibility: Text Size Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLargeTextMode(!largeTextMode)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                largeTextMode
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
              }`}
              title="Toggle Large Text Mode for low-vision or elderly users"
            >
              {largeTextMode ? 'A (Normal)' : 'A+ (Large Text)'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-8 sm:space-y-12">
        {/* HERO TITLE SECTION */}
        <div className="relative text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>FEATURE 02 — BILINGUAL & NATIVE SPEECH PIPELINE</span>
            <AshokaChakra size={12} color="#f59e0b" speed="slow" />
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
            <span className="text-amber-400">02</span> VOICE + INDIAN LANGUAGES
          </h1>

          <p className="text-lg sm:text-2xl font-bold text-slate-200">
            Speak in your language. Get legal guidance in your language.
          </p>

          <p className="text-xs sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            No legal vocabulary required. Speak naturally in the language you're most comfortable with.
            Nyaya understands your situation and explains it clearly.
          </p>
        </div>

        {/* LANGUAGE SELECTION CARDS */}
        <div className="max-w-3xl mx-auto">
          <LanguageSelectorPills
            selectedLanguage={selectedVoiceLang}
            onSelectLanguage={(lang) => {
              setSelectedVoiceLang(lang);
              if (lang !== 'auto') {
                setActiveResponseLang(lang as Language);
                onLanguageChange(lang as Language);
              }
            }}
          />
        </div>

        {/* MAIN TWO-PANEL INTERACTION WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: VOICE INTERACTION & RECORDING (Cols 1 to 5) */}
          <div className="lg:col-span-5 space-y-5">
            {/* 1. Large Central Microphone Interaction */}
            <VoiceRecorder
              language={selectedVoiceLang}
              voiceState={voiceState}
              onVoiceStateChange={setVoiceState}
              onTranscriptRecorded={(t) => processQuery(t)}
              onInterimTranscript={(interim) => setTranscript(interim)}
            />

            {/* 2. Live Recognized Transcript Box */}
            <SpeechTranscript
              transcript={transcript}
              isLiveRecording={voiceState === 'LISTENING'}
              detection={detection}
              onTranscriptChange={setTranscript}
              onSubmit={processQuery}
              onClear={() => {
                setTranscript('');
                setDetection(null);
                setVoiceState('IDLE');
              }}
              onSpeakAgain={() => {
                setTranscript('');
                setVoiceState('IDLE');
              }}
            />

            {/* 3. Type Instead Fallback Toggle */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-3.5">
              <button
                type="button"
                onClick={() => setShowTypeInput(!showTypeInput)}
                className="w-full flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-amber-400" />
                  <span>Cannot speak or in a public noisy area? Type instead</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  {showTypeInput ? 'Hide' : 'Type'}
                </span>
              </button>

              {showTypeInput && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (typedInput.trim()) processQuery(typedInput.trim());
                  }}
                  className="mt-3 space-y-2 animate-in fade-in duration-150"
                >
                  <textarea
                    value={typedInput}
                    onChange={(e) => setTypedInput(e.target.value)}
                    rows={2}
                    placeholder="Type in Telugu, Hindi, or English (e.g. 'Police station ki vellali annaru...')"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    disabled={!typedInput.trim()}
                    className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-xs font-bold transition-all cursor-pointer"
                  >
                    Analyze Spoken Text
                  </button>
                </form>
              )}
            </div>

            {/* 4. REAL-WORLD CITIZEN VOICE QUERY PRESETS */}
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Headphones className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Real-World Voice Presets
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">1-Click Test</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Test how Nyaya handles natural Telugu, Hindi, and code-mixed Indian speech without needing a microphone:
              </p>

              <div className="space-y-2">
                {REAL_WORLD_VOICE_SAMPLES.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSampleSelect(sample)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800/80 hover:border-amber-400/50 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors">
                        {sample.titleNative}
                      </span>
                      {sample.isCodeMixed && (
                        <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          Code-Mixed
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 italic line-clamp-1">
                      "{sample.transcript}"
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Privacy Notice Component */}
            <VoicePrivacyNotice
              onClearSession={handleClearSession}
              hasActiveSession={!!activeResponse || !!transcript}
            />
          </div>

          {/* RIGHT PANEL: LIVE NYAYA UNDERSTANDING & MULTILINGUAL RESPONSE (Cols 6 to 12) */}
          <div className="lg:col-span-7 space-y-5">
            {activeResponse ? (
              <LanguageResponse
                response={activeResponse}
                activeLanguage={activeResponseLang}
                onLanguageChange={(lng) => {
                  setActiveResponseLang(lng);
                  onLanguageChange(lng);
                }}
                largeTextMode={largeTextMode}
              />
            ) : (
              /* Empty Placeholder State */
              <div className="rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 p-8 sm:p-12 text-center space-y-5">
                <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-amber-400 shadow-inner">
                  <Mic className="w-8 h-8 stroke-[1.5]" />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="text-lg font-bold text-white">
                    Awaiting Spoken Inquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Tap the microphone on the left and speak naturally in Telugu, Hindi, or English.
                    Or tap one of the <strong>Real-World Voice Presets</strong> to see Nyaya's legal reasoning engine in action.
                  </p>
                </div>

                {/* 3-Step Flow Diagram */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-left">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">Step 01</span>
                    <h5 className="text-xs font-bold text-slate-200 mt-1">Speak Naturally</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Telugu, Hindi, or mixed Indian dialect.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Step 02</span>
                    <h5 className="text-xs font-bold text-slate-200 mt-1">BNSS 2023 Analysis</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Statutory rights & non-confrontational steps.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                    <span className="text-[10px] font-mono font-bold text-blue-400 uppercase">Step 03</span>
                    <h5 className="text-xs font-bold text-slate-200 mt-1">Listen in Audio</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Full speech playback & polite script.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
