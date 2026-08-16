import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Smartphone, 
  WifiOff, 
  ShieldCheck, 
  Share2, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  ExternalLink,
  Sparkles,
  Zap
} from 'lucide-react';
import { Language } from '../types';
import { AshokaChakra } from './AshokaChakra';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onShowToast?: (msg: string) => void;
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({
  isOpen,
  onClose,
  language,
  onShowToast
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [downloadedOffline, setDownloadedOffline] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        if (onShowToast) onShowToast('NyayaNow installed to your device home screen!');
      }
      setDeferredPrompt(null);
    } else {
      if (onShowToast) {
        onShowToast('Tap Share / Menu (⋮) on your browser and select "Add to Home Screen"');
      }
    }
  };

  const handleDownloadOfflineCard = () => {
    const offlineContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NyayaNow Pocket Emergency Rights Card (BNSS 2023)</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #0B1120; color: #fff; line-height: 1.5; }
    .card { background: #1E293B; border-radius: 16px; padding: 24px; max-width: 600px; margin: 0 auto; border: 1px solid #334155; }
    h1 { color: #F59E0B; margin-top: 0; font-size: 24px; border-bottom: 2px solid #F59E0B; padding-bottom: 8px; }
    .emergency { background: #DC2626; color: #fff; padding: 12px; border-radius: 8px; font-weight: bold; margin-bottom: 16px; }
    .rule { background: #0F172A; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #38BDF8; }
    .rule h3 { margin: 0 0 4px 0; color: #38BDF8; font-size: 16px; }
    .helpline { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #334155; font-size: 14px; }
    .footer { text-align: center; font-size: 12px; color: #94A3B8; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>⚖️ NyayaNow • Citizen Pocket Rights</h1>
    <div class="emergency">🚨 IMMEDIATE ACTION: Ask "Am I free to go?" If detained, demand to inform family within 24 hours under Section 48 BNSS 2023.</div>
    <div class="rule">
      <h3>1. Right to Grounds of Arrest (Sec 47 BNSS / Art 22(1))</h3>
      <p>Police MUST state exact reasons and whether the offense is bailable.</p>
    </div>
    <div class="rule">
      <h3>2. Right to Legal Aid & Lawyer (Sec 35/40 BNSS / Art 22(1))</h3>
      <p>Consult a private advocate or dial NALSA free legal aid 15100.</p>
    </div>
    <div class="rule">
      <h3>3. Women's Special Safeguards (Sec 43(5) & 46 BNSS)</h3>
      <p>Arrest only between 6 AM - 6 PM by female officers; search by female officers with strict decency.</p>
    </div>
    <div class="rule">
      <h3>4. Traffic Stop Checks (MV Act Sec 130/207)</h3>
      <p>Only Sub-Inspector (1+ star) can fine >₹100. Officers cannot seize vehicle keys without formal seizure memo.</p>
    </div>
    <h3 style="color:#10B981;margin-top:20px;">📞 Official Helplines:</h3>
    <div class="helpline"><span>National Emergency</span><strong>112</strong></div>
    <div class="helpline"><span>Women Helpline</span><strong>1091</strong></div>
    <div class="helpline"><span>Free Legal Aid (NALSA)</span><strong>15100</strong></div>
    <div class="helpline"><span>Anti-Corruption / Vigilance</span><strong>1064</strong></div>
    <div class="footer">NyayaNow • 100% Offline Civic Protection • BNSS 2023 Verified</div>
  </div>
</body>
</html>`;

    const blob = new Blob([offlineContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'NyayaNow-Pocket-Rights-Guide.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadedOffline(true);
    if (onShowToast) onShowToast('Offline Pocket Rights Card saved to your downloads!');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'NyayaNow - Know Your Police Rights in India',
          text: 'Verified 30-second guides on Indian citizen rights under BNSS 2023. Works 100% offline.',
          url: window.location.href,
        });
      } catch (e) {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      if (onShowToast) onShowToast('Link copied to clipboard! Share with family & friends.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tricolor top glowing strip */}
        <div className="h-1.5 w-full flex">
          <div className="flex-1 bg-amber-500"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-emerald-500"></div>
        </div>

        {/* Header with Close */}
        <div className="relative p-6 pb-4 flex items-start justify-between border-b border-slate-800">
          {/* Subtle Background Chakra */}
          <div className="absolute right-4 top-2 opacity-10 pointer-events-none">
            <AshokaChakra size={140} speed="slow" color="#38bdf8" strokeWidth={1.5} />
          </div>

          <div className="flex items-center space-x-3 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
              <Smartphone className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-black text-white">Get NyayaNow App</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  FREE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                100% Offline Access • Instant Emergency Lockscreen Tool
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors relative z-10"
            aria-label="Close download modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center space-x-2.5">
              <WifiOff className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-200">Works Without Internet</p>
                <p className="text-[10px] text-slate-400">Crucial during network blackouts</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center space-x-2.5">
              <Zap className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-200">1-Tap 112 & Rights</p>
                <p className="text-[10px] text-slate-400">Instant quick actions</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-200">BNSS 2023 Verified</p>
                <p className="text-[10px] text-slate-400">Zero outdated laws</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center space-x-2.5">
              <Sparkles className="w-5 h-5 text-purple-400 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-200">Zero Data Tracking</p>
                <p className="text-[10px] text-slate-400">No login or location recorded</p>
              </div>
            </div>
          </div>

          {/* Option 1: Add to Home Screen / Install PWA */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-850 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-black flex items-center justify-center border border-amber-500/40">
                  1
                </span>
                <h4 className="text-sm font-bold text-white">Install as Mobile / Desktop App</h4>
              </div>
              <span className="text-[11px] text-amber-400 font-semibold">Recommended</span>
            </div>
            <p className="text-xs text-slate-300">
              Installs a lightweight app onto your Android, iPhone, or PC. Launches instantly like a native app with zero store downloads required.
            </p>
            <button
              onClick={handleInstallPWA}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-extrabold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>{isInstalled ? 'App Already Installed ✓' : 'Install NyayaNow to Home Screen'}</span>
            </button>
            <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 flex items-start space-x-2">
              <span className="font-bold text-slate-300 shrink-0">Mobile Tip:</span>
              <span>On Chrome/Edge, click "Install" above. On iOS Safari, tap <strong>Share</strong> (bottom) → <strong>"Add to Home Screen"</strong>.</span>
            </div>
          </div>

          {/* Option 2: Download Standalone Pocket Guide */}
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/80 space-y-2.5">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 text-xs font-black flex items-center justify-center border border-sky-500/40">
                2
              </span>
              <h4 className="text-sm font-bold text-white">Download Standalone Pocket Card (.html)</h4>
            </div>
            <p className="text-xs text-slate-300">
              Save a single self-contained offline emergency file to your phone's storage. Opens in any browser even in airplane mode.
            </p>
            <button
              onClick={handleDownloadOfflineCard}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs border border-slate-600 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              {downloadedOffline ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4 text-sky-400" />}
              <span>{downloadedOffline ? 'Downloaded Successfully ✓' : 'Save Offline Rights File'}</span>
            </button>
          </div>

          {/* Share Option */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleShare}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center space-x-2 border border-slate-700 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Share NyayaNow with Family & Friends</span>
            </button>
          </div>

        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800/80 text-center text-[11px] text-slate-400">
          NyayaNow is an open public civic project. Free forever for all citizens of India.
        </div>
      </div>
    </div>
  );
};
