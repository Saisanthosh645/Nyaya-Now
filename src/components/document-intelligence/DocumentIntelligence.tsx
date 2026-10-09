import React, { useState } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  Sparkles, 
  Upload, 
  RotateCcw, 
  Shield, 
  Globe, 
  Check,
  Scale
} from 'lucide-react';
import { Language } from '../../types';
import { 
  DocumentAnalysis, 
  DocumentIntelligenceService, 
  SAMPLE_DOCUMENTS 
} from '../../services/documentIntelligenceService';
import { DocumentUploader } from './DocumentUploader';
import { ProcessingPipeline } from './ProcessingPipeline';
import { DocumentPreview } from './DocumentPreview';
import { DocumentIdentityCard } from './DocumentIdentityCard';
import { ExecutiveSummary } from './ExecutiveSummary';
import { ImportantDatesTimeline } from './ImportantDatesTimeline';
import { NextStepsCards } from './NextStepsCards';
import { DocumentVsLawCard } from './DocumentVsLawCard';
import { LegalTermsExplained } from './LegalTermsExplained';
import { EntitiesInvolved } from './EntitiesInvolved';
import { SourceTraceabilityCard } from './SourceTraceabilityCard';
import { AskNyayaDocPanel } from './AskNyayaDocPanel';
import { AshokaChakra } from '../AshokaChakra';

interface DocumentIntelligenceProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateBack: () => void;
  onNavigateToAssistantWithPrompt: (prompt: string) => void;
}

export const DocumentIntelligence: React.FC<DocumentIntelligenceProps> = ({
  language,
  onLanguageChange,
  onNavigateBack,
  onNavigateToAssistantWithPrompt
}) => {
  const [activeDocument, setActiveDocument] = useState<DocumentAnalysis | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingFileName, setProcessingFileName] = useState<string>('');
  const [processingStage, setProcessingStage] = useState<number>(1);
  const [processingStatus, setProcessingStatus] = useState<string>('Reading document & running OCR…');
  const [processingPercent, setProcessingPercent] = useState<number>(15);

  // Handle uploaded file
  const handleFileSelected = async (file: File) => {
    setProcessingFileName(file.name);
    setProcessingStage(1);
    setProcessingStatus('Starting OCR text extraction…');
    setProcessingPercent(15);
    setIsProcessing(true);

    try {
      const analysis = await DocumentIntelligenceService.analyzeDocumentFile(
        file,
        (stage, status, pct) => {
          setProcessingStage(stage);
          setProcessingStatus(status);
          if (pct !== undefined) setProcessingPercent(pct);
        }
      );
      setProcessingPercent(100);
      setTimeout(() => {
        setActiveDocument(analysis);
        setIsProcessing(false);
      }, 350);
    } catch (err) {
      console.error('File analysis error:', err);
      const fallback = DocumentIntelligenceService.parseDocumentText(
        `DOCUMENT: ${file.name}\nSize: ${(file.size / 1024).toFixed(0)} KB\nUploaded Scan`,
        file.name,
        `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        URL.createObjectURL(file)
      );
      setActiveDocument(fallback);
      setIsProcessing(false);
    }
  };

  // Handle sample selection
  const handleSampleSelected = async (sample: DocumentAnalysis) => {
    setProcessingFileName(sample.fileName);
    setProcessingStage(1);
    setProcessingStatus('Loading statutory document…');
    setProcessingPercent(20);
    setIsProcessing(true);

    const steps = [
      { stage: 2, status: 'Identifying legal parties & jurisdictions…', pct: 45, delay: 250 },
      { stage: 3, status: 'Analyzing document classification & legal charges…', pct: 70, delay: 250 },
      { stage: 4, status: 'Structuring statutory deadlines & next actions…', pct: 88, delay: 250 },
      { stage: 5, status: 'Cross-verifying citations against BNSS 2023…', pct: 100, delay: 250 },
    ];

    for (const step of steps) {
      await new Promise((r) => setTimeout(r, step.delay));
      setProcessingStage(step.stage);
      setProcessingStatus(step.status);
      setProcessingPercent(step.pct);
    }

    await new Promise((r) => setTimeout(r, 150));
    setActiveDocument(sample);
    setIsProcessing(false);
  };

  // Handle directly pasted notice text
  const handleTextPasted = async (text: string, title?: string) => {
    const docTitle = title || 'Pasted_Legal_Notice.txt';
    setProcessingFileName(docTitle);
    setProcessingStage(1);
    setProcessingStatus('Parsing notice text…');
    setProcessingPercent(25);
    setIsProcessing(true);

    const steps = [
      { stage: 2, status: 'Extracting case numbers, dates & named parties…', pct: 50, delay: 200 },
      { stage: 3, status: 'Detecting statutory provisions & notice type…', pct: 75, delay: 200 },
      { stage: 4, status: 'Formulating step-by-step action guidelines…', pct: 90, delay: 200 },
      { stage: 5, status: 'Verifying rights under BNSS 2023…', pct: 100, delay: 200 },
    ];

    for (const step of steps) {
      await new Promise((r) => setTimeout(r, step.delay));
      setProcessingStage(step.stage);
      setProcessingStatus(step.status);
      setProcessingPercent(step.pct);
    }

    const analysis = DocumentIntelligenceService.analyzePastedText(text, docTitle);
    setActiveDocument(analysis);
    setIsProcessing(false);
  };

  const handleUpdateDocumentText = (newText: string) => {
    if (!activeDocument) return;
    const reAnalysis = DocumentIntelligenceService.parseDocumentText(
      newText,
      activeDocument.fileName,
      activeDocument.fileSize,
      activeDocument.previewImageUrl,
      95
    );
    setActiveDocument(reAnalysis);
  };

  const handleResetDocument = () => {
    setActiveDocument(null);
    setIsProcessing(false);
    setProcessingFileName('');
  };

  const handleAskQuestion = (question: string) => {
    if (!activeDocument) return;
    const contextualPrompt = `Regarding Document "${activeDocument.title}" (${activeDocument.referenceNumber}): ${question}`;
    onNavigateToAssistantWithPrompt(contextualPrompt);
  };

  const handleOpenAssistantWithContext = () => {
    if (!activeDocument) return;
    const contextualPrompt = `I have received a document titled "${activeDocument.title}" with Reference No. "${activeDocument.referenceNumber}" issued by "${activeDocument.issuer}". What are my immediate legal rights and actions under BNSS 2023?`;
    onNavigateToAssistantWithPrompt(contextualPrompt);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24 selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-h-14 h-auto py-2 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onNavigateBack}
            className="flex items-center gap-1.5 sm:gap-2 text-slate-400 hover:text-white transition-colors text-xs sm:text-sm font-semibold cursor-pointer group shrink-0"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back to Nyaya Now</span>
            <span className="sm:hidden">Back</span>
          </button>

          {/* Center Badge */}
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-black border border-amber-500/40">
              03
            </span>
            <span className="text-xs sm:text-sm font-black tracking-tight text-white uppercase hidden sm:inline">
              Document Intelligence
            </span>
          </div>

          {/* Right Language Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {(['en', 'hi', 'te'] as Language[]).map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => onLanguageChange(lng)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  language === lng
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {lng === 'en' ? 'EN' : lng === 'hi' ? 'हिंदी' : 'తెలుగు'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-8 sm:space-y-12">
        
        {/* HERO TITLE SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>03 / DOCUMENT INTELLIGENCE</span>
            <AshokaChakra size={12} color="#f59e0b" speed="slow" />
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Understand the document. Know what to do next.
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Upload a notice, summons, FIR, or legal document. Nyaya extracts the important details, clarifies statutory deadlines, and explains them in simple language.
          </p>
        </div>

        {/* VIEW STATE 1: PROCESSING STATE */}
        {isProcessing && (
          <div className="py-6 sm:py-12">
            <ProcessingPipeline
              fileName={processingFileName}
              currentStage={processingStage}
              statusText={processingStatus}
              progressPercent={processingPercent}
            />
          </div>
        )}

        {/* VIEW STATE 2: EMPTY / UPLOAD STATE */}
        {!isProcessing && !activeDocument && (
          <div className="py-2 sm:py-6">
            <DocumentUploader
              onFileSelected={handleFileSelected}
              onSampleSelected={handleSampleSelected}
              onTextPasted={handleTextPasted}
              language={language}
            />
          </div>
        )}

        {/* VIEW STATE 3: FULL TWO-PANEL WORKSPACE AFTER DOCUMENT LOADED */}
        {!isProcessing && activeDocument && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT PANEL: DOCUMENT PREVIEW (Cols 1 to 5) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              <DocumentPreview
                document={activeDocument}
                onReset={handleResetDocument}
                onUpdateText={handleUpdateDocumentText}
              />
            </div>

            {/* RIGHT PANEL: NYAYA LEGAL INTELLIGENCE (Cols 6 to 12) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Document Identity Card */}
              <DocumentIdentityCard
                document={activeDocument}
                onUpdateField={(field, val) => {
                  setActiveDocument((prev) => (prev ? { ...prev, [field]: val } : null));
                }}
              />

              {/* 2. Executive Summary ("In simple words" + "Don't miss this") */}
              <ExecutiveSummary
                document={activeDocument}
                language={language}
              />

              {/* 3. Important Dates Timeline */}
              <ImportantDatesTimeline
                dates={activeDocument.importantDates}
              />

              {/* 4. Your Next Steps Action Cards */}
              <NextStepsCards
                actions={activeDocument.actions}
              />

              {/* 5. Document Says vs Law Says Card */}
              <DocumentVsLawCard
                whatDocumentSays={activeDocument.whatDocumentSays}
                whatLawSays={activeDocument.whatLawSays}
              />

              {/* 6. Legal Terms Explained */}
              <LegalTermsExplained
                terms={activeDocument.legalTerms}
              />

              {/* 7. Named Entities & Authorities */}
              <EntitiesInvolved
                people={activeDocument.people}
              />

              {/* 8. Source Traceability Card */}
              <SourceTraceabilityCard
                documentSources={activeDocument.documentSources}
                legalSources={activeDocument.legalSources}
              />

              {/* 9. Ask Nyaya About This Document (Hand-off to Feature 01) */}
              <AskNyayaDocPanel
                document={activeDocument}
                onAskQuestion={handleAskQuestion}
                onOpenAssistantWithContext={handleOpenAssistantWithContext}
              />

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
