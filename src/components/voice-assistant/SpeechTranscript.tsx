import React, { useState, useEffect } from 'react';
import { Edit3, Trash2, Mic, ArrowRight, Check, Sparkles, AlertCircle } from 'lucide-react';
import { LanguageDetectionResult } from '../../services/voiceLanguageService';

interface SpeechTranscriptProps {
  transcript: string;
  isLiveRecording?: boolean;
  detection?: LanguageDetectionResult | null;
  onTranscriptChange: (text: string) => void;
  onSubmit: (text: string) => void;
  onClear: () => void;
  onSpeakAgain: () => void;
  disabled?: boolean;
}

export const SpeechTranscript: React.FC<SpeechTranscriptProps> = ({
  transcript,
  isLiveRecording = false,
  detection,
  onTranscriptChange,
  onSubmit,
  onClear,
  onSpeakAgain,
  disabled = false
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(transcript);

  useEffect(() => {
    setEditedText(transcript);
  }, [transcript]);

  const handleSaveEdit = () => {
    onTranscriptChange(editedText);
    setIsEditing(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      handleSaveEdit();
      if (editedText.trim()) onSubmit(editedText.trim());
    } else {
      if (transcript.trim()) onSubmit(transcript.trim());
    }
  };

  if (!transcript && !isLiveRecording) {
    return null;
  }

  return (
    <div className="w-full rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-5 shadow-xl space-y-3 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {isLiveRecording ? '🎙 Live Speech Capturing…' : '💬 You Said:'}
          </span>
          {isLiveRecording && (
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5">
          {!isEditing ? (
            <button
              type="button"
              disabled={disabled || isLiveRecording}
              onClick={() => setIsEditing(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs font-medium flex items-center gap-1 cursor-pointer"
              title="Edit spoken text"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Edit</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSaveEdit}
              className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Done</span>
            </button>
          )}

          <button
            type="button"
            disabled={disabled || isLiveRecording}
            onClick={onClear}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors text-xs font-medium flex items-center gap-1 cursor-pointer"
            title="Clear transcript"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>

      {/* Main Transcript Body */}
      {isEditing ? (
        <form onSubmit={handleFormSubmit} className="space-y-2">
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={3}
            className="w-full p-3 rounded-xl bg-slate-950 border border-amber-500/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none font-sans"
            placeholder="Edit what you said or correct names/numbers..."
            autoFocus
          />
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>You can refine names, locations, or section numbers.</span>
            <button
              type="submit"
              className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
            >
              Save Text
            </button>
          </div>
        </form>
      ) : (
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
          <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed italic">
            "{transcript}"
          </p>
        </div>
      )}

      {/* Language Detection Pill / Telemetry */}
      {detection && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300 font-semibold">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Detected: {detection.detectedLangMeta.name} ({detection.detectedLangMeta.nativeName})</span>
          </div>

          {detection.isCodeMixed && (
            <span className="px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[11px] font-medium">
              Code-Mixed Indian Speech
            </span>
          )}

          <span className="text-[11px] text-slate-500 font-mono">
            {detection.scriptIdentified} • {(detection.confidence * 100).toFixed(0)}% confidence
          </span>
        </div>
      )}

      {/* Bottom Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
        <button
          type="button"
          disabled={disabled || isLiveRecording}
          onClick={onSpeakAgain}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer py-1"
        >
          <Mic className="w-3.5 h-3.5 text-amber-400" />
          <span>Speak again</span>
        </button>

        <button
          type="button"
          disabled={disabled || !transcript.trim() || isLiveRecording}
          onClick={() => onSubmit(editedText.trim() || transcript.trim())}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
        >
          <span>Ask Nyaya Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
