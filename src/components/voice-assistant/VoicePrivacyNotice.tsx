import React from 'react';
import { Lock, Trash2, Wifi, WifiOff, ShieldCheck } from 'lucide-react';

interface VoicePrivacyNoticeProps {
  onClearSession: () => void;
  hasActiveSession?: boolean;
}

export const VoicePrivacyNotice: React.FC<VoicePrivacyNoticeProps> = ({
  onClearSession,
  hasActiveSession = false
}) => {
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

  return (
    <div className="w-full rounded-2xl bg-slate-900/60 border border-slate-800 p-4 space-y-3 text-xs text-slate-400">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>
            <h5 className="font-bold text-slate-200">
              🔒 Voice Privacy & Data Confidentiality
            </h5>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
              Your voice is processed transiently to understand legal intent. Never share passwords, OTPs, Aadhaar numbers, or bank credentials.
            </p>
          </div>
        </div>

        {hasActiveSession && (
          <button
            type="button"
            onClick={onClearSession}
            className="self-end sm:self-auto px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-800/60 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Transcript & Audio</span>
          </button>
        )}
      </div>

      {/* Connectivity Banner */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-500">
        {isOnline ? (
          <>
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <span>Connected to Nyaya Legal AI Pipeline</span>
          </>
        ) : (
          <>
            <WifiOff className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-300">
              Limited Connectivity: Voice AI requires internet. Offline guides remain available.
            </span>
          </>
        )}
      </div>
    </div>
  );
};
