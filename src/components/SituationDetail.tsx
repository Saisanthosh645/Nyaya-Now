import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Printer, 
  Zap, 
  ShieldCheck, 
  AlertCircle, 
  XCircle, 
  BookOpen, 
  ExternalLink,
  Scale,
  Lock,
  FileText,
  Search,
  Smartphone,
  AlertTriangle,
  Coins,
  ShieldAlert,
  ChevronRight,
  Info
} from 'lucide-react';
import { Situation, Language, ActiveView, RightItem } from '../types';
import { legalSources } from '../data/sources';
import { translations } from '../data/translations';
import { RightsCard } from './RightsCard';
import { ActionTimeline } from './ActionTimeline';
import { SayThisPolitely } from './SayThisPolitely';
import { ComplaintFlow } from './ComplaintFlow';
import { PrintGuideModal } from './PrintGuideModal';
import { ConstitutionalProtection } from './ConstitutionalProtection';
import { LegalAidCard } from './LegalAidCard';
import { SpecialSafeguards } from './SpecialSafeguards';
import { SourceVerificationDrawer } from './SourceVerificationDrawer';

interface SituationDetailProps {
  situation: Situation;
  language: Language;
  onNavigate: (view: ActiveView) => void;
  onShowToast: (msg: string) => void;
  onOpenEmergency: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  ShieldAlert: <ShieldAlert className="w-8 h-8 text-amber-600" />,
  Lock: <Lock className="w-8 h-8 text-red-600" />,
  FileText: <FileText className="w-8 h-8 text-blue-600" />,
  Search: <Search className="w-8 h-8 text-indigo-600" />,
  Smartphone: <Smartphone className="w-8 h-8 text-purple-600" />,
  AlertTriangle: <AlertTriangle className="w-8 h-8 text-rose-600" />,
  Coins: <Coins className="w-8 h-8 text-emerald-600" />,
  Scale: <Scale className="w-8 h-8 text-slate-700" />
};

export const SituationDetail: React.FC<SituationDetailProps> = ({
  situation,
  language,
  onNavigate,
  onShowToast,
  onOpenEmergency
}) => {
  const [printModalOpen, setPrintModalOpen] = useState<boolean>(false);
  const [selectedVerifyRight, setSelectedVerifyRight] = useState<RightItem | null>(null);
  const t = translations[language];

  const handleShare = () => {
    const shareData = {
      title: `NyayaNow Guide: ${situation.title}`,
      text: `⚡ 30-Second Police Rights Guide: ${situation.title}\n\nKey Steps:\n` +
        situation.quick30SecSummary.map((s, idx) => `${idx + 1}. ${s}`).join('\n') +
        `\n\nVerified legal guidance under BNSS 2023.`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {
        navigator.clipboard.writeText(shareData.text);
        onShowToast(t.copied);
      });
    } else {
      navigator.clipboard.writeText(shareData.text);
      onShowToast(t.copied);
    }
  };

  const situationSources = situation.sourceIds
    .map(id => legalSources[id])
    .filter(Boolean);

  return (
    <div id="situation-detail-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-6">
        <button
          onClick={() => onNavigate({ type: 'home' })}
          className="hover:text-amber-600 transition-colors flex items-center space-x-1"
        >
          <span>{t.home}</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button
          onClick={() => onNavigate({ type: 'home' })}
          className="hover:text-amber-600 transition-colors"
        >
          {t.situations}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-none">
          {situation.title}
        </span>
      </nav>

      {/* Top Header & Action Controls */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          
          {/* Title & Icon */}
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
              {iconMap[situation.icon] || <ShieldAlert className="w-8 h-8 text-slate-700" />}
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {situation.badgeText || 'BNSS Rights'}
                </span>
                {situation.emergencyTag && (
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 animate-pulse">
                    🚨 {situation.emergencyTag}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {situation.title}
              </h1>
            </div>
          </div>

          {/* Action Buttons: Share & Print */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-colors"
              title="Share this guide"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-600" />
              <span>{t.shareGuide}</span>
            </button>

            <button
              onClick={() => setPrintModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-colors"
              title="Print Pocket Rights Card"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>{t.printOrSave}</span>
            </button>
          </div>
        </div>

        <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
          {situation.shortDescription}
        </p>
      </div>

      {/* ⚡ 30-SECOND GUIDE (Visually Distinct Prominent Panel) */}
      <section id="30-second-guide-panel" className="bg-linear-to-br from-amber-500 via-amber-600 to-amber-700 text-slate-950 rounded-2xl p-6 sm:p-8 shadow-xl shadow-amber-500/15 mb-8 border border-amber-400">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-slate-950 text-amber-400 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5 fill-amber-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              {t.thirtySecGuide}
            </h2>
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded bg-slate-950/10 text-slate-950 border border-slate-950/20">
            Read in 30 Seconds
          </span>
        </div>

        <p className="text-xs sm:text-sm font-semibold text-slate-900/80 mb-5">
          If you are in this situation right now, follow these direct action points immediately:
        </p>

        <div className="space-y-3">
          {situation.quick30SecSummary.map((step, idx) => (
            <div
              key={idx}
              className="bg-white/95 rounded-xl p-3.5 sm:p-4 border border-amber-300/80 shadow-xs flex items-start space-x-3.5"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-950 text-amber-400 font-black text-sm flex items-center justify-center shrink-0">
                {idx + 1}
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-950 leading-snug pt-0.5">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 🇮🇳 CONSTITUTIONAL PROTECTION LAYER */}
      {situation.constitutionalProtection && (
        <div className="mb-8">
          <ConstitutionalProtection
            protection={situation.constitutionalProtection}
            language={language}
          />
        </div>
      )}

      {/* Special Guide Panel (e.g. Zero FIR explanation) */}
      {situation.specialGuide && (
        <section className="bg-blue-50/80 rounded-2xl p-6 border border-blue-200 mb-8">
          <div className="flex items-center space-x-2 mb-3">
            <Info className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-blue-950">
              {situation.specialGuide.title}
            </h3>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            {situation.specialGuide.content}
          </p>
          <div className="space-y-2">
            {situation.specialGuide.points.map((pt, i) => (
              <div key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span>
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* YOUR RIGHTS Section */}
      <section id="your-rights-section" className="mb-10">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              {t.yourRights}
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            (Tap "✓ Source verified" for statutory citations)
          </span>
        </div>

        <div className="space-y-3.5">
          {situation.rights.map((right) => (
            <RightsCard
              key={right.id}
              right={right}
              onVerifyClick={(r) => setSelectedVerifyRight(r)}
            />
          ))}
        </div>
      </section>

      {/* WHAT TO DO NOW Timeline */}
      <section id="what-to-do-section" className="mb-10">
        <div className="flex items-center space-x-2.5 mb-6">
          <div className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
            1-5
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            {t.whatToDoNow}
          </h3>
        </div>

        <ActionTimeline actions={situation.actions} />
      </section>

      {/* DO NOT (Safety Warning Panel) */}
      <section id="do-not-section" className="bg-red-50/70 rounded-2xl p-5 sm:p-6 border border-red-200 mb-10">
        <div className="flex items-center space-x-2.5 mb-4 text-red-700">
          <XCircle className="w-5 h-5 stroke-[2.5]" />
          <h3 className="text-lg font-extrabold tracking-tight">
            {t.whatNotToDo} (For Your Personal Safety)
          </h3>
        </div>

        <div className="space-y-3">
          {situation.donts.map((dont, idx) => (
            <div key={idx} className="bg-white rounded-xl p-3.5 sm:p-4 border border-red-200/80 shadow-2xs">
              <div className="flex items-start space-x-2.5">
                <span className="text-red-600 font-black text-sm">✕</span>
                <div>
                  <h4 className="text-sm font-bold text-red-950">
                    {dont.text}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    <strong className="text-slate-700">Reason:</strong> {dont.reason}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPECIAL SAFEGUARDS (Vulnerable Groups) */}
      {situation.specialSafeguards && situation.specialSafeguards.length > 0 && (
        <div className="mb-10">
          <SpecialSafeguards
            safeguards={situation.specialSafeguards}
            language={language}
          />
        </div>
      )}

      {/* SAY THIS POLITELY Section */}
      <SayThisPolitely
        phrases={situation.sayThis}
        language={language}
        onShowToast={onShowToast}
      />

      {/* FREE LEGAL AID CARD (NALSA 15100) */}
      {situation.needsLegalAid && (
        <div className="mb-10">
          <LegalAidCard language={language} />
        </div>
      )}

      {/* WHERE TO COMPLAIN Section */}
      <section id="where-to-complain-section" className="mb-10">
        <div className="flex items-center space-x-2.5 mb-4">
          <Scale className="w-5 h-5 text-slate-700" />
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            {t.whereToComplain}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mb-5">
          If police officers violate these statutory safeguards, follow this visual escalation hierarchy:
        </p>

        <ComplaintFlow nodes={situation.escalationPath} />
      </section>

      {/* SOURCES & LEGAL REFERENCES Section */}
      <section id="sources-section" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-12">
        <div className="flex items-center space-x-2.5 mb-4">
          <BookOpen className="w-5 h-5 text-slate-700" />
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            {t.verifiedSources}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          Every right on this page is derived directly from official Indian statutes, Supreme Court judgments, and statutory regulations.
        </p>

        <div className="space-y-3">
          {situationSources.map((src) => (
            <div
              key={src.id}
              className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                <h4 className="text-sm font-bold text-slate-900">
                  {src.title}
                </h4>
                {src.officialBadge && (
                  <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Official Source</span>
                  </span>
                )}
              </div>

              {src.legalSection && (
                <div className="text-xs font-semibold text-amber-800 mb-2">
                  {src.legalSection} • {src.organization}
                </div>
              )}

              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {src.summary}
              </p>

              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-900 hover:text-amber-700 hover:underline"
              >
                <span>Access Statute / Judgment Document</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Back Button */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        <button
          onClick={() => onNavigate({ type: 'home' })}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToHome}</span>
        </button>

        <button
          onClick={onOpenEmergency}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-md shadow-red-600/20"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{t.helpNowBtn}</span>
        </button>
      </div>

      {/* Print Pocket Card Modal */}
      <PrintGuideModal
        situation={situation}
        isOpen={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
        language={language}
      />

      {/* Source Verification Drawer */}
      <SourceVerificationDrawer
        rightItem={selectedVerifyRight}
        isOpen={!!selectedVerifyRight}
        onClose={() => setSelectedVerifyRight(null)}
        language={language}
      />

    </div>
  );
};
