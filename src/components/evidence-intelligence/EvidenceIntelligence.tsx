import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter, 
  Layers, 
  Calendar, 
  Network, 
  User, 
  FileQuestion, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  Trash2,
  Image,
  FileText,
  MessageSquare,
  AlertCircle,
  FolderLock
} from 'lucide-react';
import { Language } from '../../types';
import { 
  EvidenceItem, 
  EvidenceEvent, 
  EvidenceCollection, 
  EvidenceGap, 
  EvidenceConnection, 
  EvidenceType,
  EvidenceIntelligenceService,
  SAMPLE_EVIDENCE_ITEMS,
  SAMPLE_TIMELINE_EVENTS,
  SAMPLE_COLLECTIONS,
  SAMPLE_EVIDENCE_GAPS,
  SAMPLE_CONNECTIONS
} from '../../services/evidenceIntelligenceService';
import { EvidenceHero } from './EvidenceHero';
import { EvidenceEmptyState } from './EvidenceEmptyState';
import { EvidenceUploader } from './EvidenceUploader';
import { EvidenceProcessingPipeline } from './EvidenceProcessingPipeline';
import { EvidenceCard } from './EvidenceCard';
import { EvidenceDetailPanel } from './EvidenceDetailPanel';
import { EvidenceTimeline } from './EvidenceTimeline';
import { EntityExplorer } from './EntityExplorer';
import { EvidenceRelationshipMap } from './EvidenceRelationshipMap';
import { EvidenceGapAnalysis } from './EvidenceGapAnalysis';
import { EvidenceExportModal } from './EvidenceExportModal';
import { AskNyayaEvidencePanel } from './AskNyayaEvidencePanel';

interface EvidenceIntelligenceProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateBack: () => void;
  onNavigateToAssistantWithPrompt: (prompt: string) => void;
  onNavigateToVoiceAssistant?: () => void;
  onNavigateToDocumentIntelligence?: () => void;
  onNavigateToLawyerConnection?: () => void;
}

type WorkspaceTab = 'library' | 'timeline' | 'connections' | 'entities' | 'gaps';

export const EvidenceIntelligence: React.FC<EvidenceIntelligenceProps> = ({
  language,
  onLanguageChange,
  onNavigateBack,
  onNavigateToAssistantWithPrompt,
  onNavigateToVoiceAssistant,
  onNavigateToDocumentIntelligence,
  onNavigateToLawyerConnection
}) => {
  // Primary state
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<EvidenceEvent[]>([]);
  const [collections, setCollections] = useState<EvidenceCollection[]>(SAMPLE_COLLECTIONS);
  const [gaps, setGaps] = useState<EvidenceGap[]>([]);
  const [connections, setConnections] = useState<EvidenceConnection[]>([]);

  // UI state
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('library');
  const [selectedItem, setSelectedItem] = useState<EvidenceItem | null>(null);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingFileName, setProcessingFileName] = useState('');
  const [processingStage, setProcessingStage] = useState(1);
  const [processingStatus, setProcessingStatus] = useState('Reading file…');
  const [processingPercent, setProcessingPercent] = useState(20);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [selectedEntityFilter, setSelectedEntityFilter] = useState<string | null>(null);

  // Derive live metrics
  const metrics = useMemo(() => {
    return EvidenceIntelligenceService.calculateMetrics(evidenceItems, timelineEvents);
  }, [evidenceItems, timelineEvents]);

  // Load sample Hackathon dataset
  const handleLoadDemoData = () => {
    setEvidenceItems(SAMPLE_EVIDENCE_ITEMS);
    setTimelineEvents(SAMPLE_TIMELINE_EVENTS);
    setGaps(SAMPLE_EVIDENCE_GAPS);
    setConnections(SAMPLE_CONNECTIONS);
    setActiveTab('library');
  };

  // Clear workspace
  const handleClearWorkspace = () => {
    if (window.confirm('Are you sure you want to clear this evidence workspace? Original files stored on your device will not be deleted.')) {
      setEvidenceItems([]);
      setTimelineEvents([]);
      setGaps([]);
      setConnections([]);
      setSelectedItem(null);
    }
  };

  // Ingest uploaded files
  const handleFilesSelected = async (files: File[]) => {
    setIsUploaderOpen(false);
    setIsProcessing(true);

    const newlyProcessedItems: EvidenceItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setProcessingFileName(file.name);
      setProcessingStage(1);
      setProcessingStatus(`Processing ${file.name} (${i + 1}/${files.length})…`);
      setProcessingPercent(20);

      const processed = await EvidenceIntelligenceService.processEvidenceFile(
        file,
        (stage, name) => {
          setProcessingStage(stage);
          setProcessingStatus(name);
          setProcessingPercent(Math.min(95, stage * 20));
        }
      );

      newlyProcessedItems.push(processed);
    }

    setProcessingPercent(100);
    await new Promise((r) => setTimeout(r, 300));

    setEvidenceItems((prev) => {
      const updated = [...prev, ...newlyProcessedItems];
      const newTimeline = EvidenceIntelligenceService.buildTimelineFromEvidence(updated);
      setTimelineEvents(newTimeline);
      return updated;
    });

    setIsProcessing(false);
  };

  // Import pasted text as evidence
  const handleTextImported = (text: string, title?: string) => {
    setIsUploaderOpen(false);
    const mockFile = new File([text], title || 'Pasted_Notice.txt', { type: 'text/plain' });
    handleFilesSelected([mockFile]);
  };

  // Update item type
  const handleChangeItemType = (itemId: string, newType: EvidenceType) => {
    setEvidenceItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, type: newType, isAiClassified: false } : item))
    );
  };

  // Add user note
  const handleAddNote = (itemId: string, note: string) => {
    setEvidenceItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, userNotes: [...item.userNotes, note] } : item
      )
    );
    if (selectedItem?.id === itemId) {
      setSelectedItem((prev) => (prev ? { ...prev, userNotes: [...prev.userNotes, note] } : null));
    }
  };

  // Toggle review status
  const handleToggleReviewStatus = (itemId: string) => {
    setEvidenceItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const nextStatus = item.reviewStatus === 'reviewed' ? 'needs-review' : 'reviewed';
          return { ...item, reviewStatus: nextStatus };
        }
        return item;
      })
    );
    if (selectedItem?.id === itemId) {
      setSelectedItem((prev) =>
        prev
          ? { ...prev, reviewStatus: prev.reviewStatus === 'reviewed' ? 'needs-review' : 'reviewed' }
          : null
      );
    }
  };

  // Delete item
  const handleDeleteItem = (itemId: string) => {
    setEvidenceItems((prev) => prev.filter((i) => i.id !== itemId));
    setTimelineEvents((prev) => prev.filter((e) => !e.evidenceIds.includes(itemId)));
    if (selectedItem?.id === itemId) setSelectedItem(null);
  };

  // Hand-off to Feature 01 (AI Assistant)
  const handleAskQuestion = (question: string) => {
    const summary = `Regarding my evidence record (${evidenceItems.length} items, ${timelineEvents.length} events): ${question}`;
    onNavigateToAssistantWithPrompt(summary);
  };

  const handleOpenAssistantWithContext = () => {
    const prompt = `I have organized an evidence record with ${evidenceItems.length} items (including ${metrics.totalDocuments} documents and ${metrics.totalScreenshots} screenshots). The key events span from ${timelineEvents[0]?.formattedDateTime || 'recent dates'}. What are my statutory legal rights and recommended next steps under BNSS 2023?`;
    onNavigateToAssistantWithPrompt(prompt);
  };

  // Filtered evidence items
  const filteredItems = useMemo(() => {
    return evidenceItems.filter((item) => {
      // Type filter
      if (selectedTypeFilter === 'needs-review' && item.reviewStatus !== 'needs-review') {
        return false;
      } else if (selectedTypeFilter !== 'all' && selectedTypeFilter !== 'needs-review' && item.type !== selectedTypeFilter) {
        return false;
      }

      // Entity filter
      if (selectedEntityFilter && !item.entities.some((e) => e.value.toLowerCase() === selectedEntityFilter.toLowerCase())) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesFilename = item.filename.toLowerCase().includes(q);
        const matchesText = item.extractedText?.toLowerCase().includes(q);
        const matchesEntity = item.entities.some((e) => e.value.toLowerCase().includes(q));
        const matchesNote = item.userNotes.some((n) => n.toLowerCase().includes(q));
        if (!matchesFilename && !matchesText && !matchesEntity && !matchesNote) {
          return false;
        }
      }

      return true;
    });
  }, [evidenceItems, selectedTypeFilter, selectedEntityFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24 selection:bg-purple-500 selection:text-slate-950">
      
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          
          <button
            type="button"
            onClick={onNavigateBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs sm:text-sm font-semibold cursor-pointer group shrink-0"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Nyaya Now</span>
          </button>

          {/* Center Badge */}
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs font-black border border-purple-500/40">
              04
            </span>
            <span className="text-xs sm:text-sm font-black tracking-tight text-white uppercase hidden sm:inline">
              Evidence Intelligence
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              {(['en', 'hi', 'te'] as Language[]).map((lng) => (
                <button
                  key={lng}
                  type="button"
                  onClick={() => onLanguageChange(lng)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    language === lng
                      ? 'bg-purple-500 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {lng === 'en' ? 'EN' : lng === 'hi' ? 'हिंदी' : 'తెలుగు'}
                </button>
              ))}
            </div>

            {/* Quick Add CTA */}
            {evidenceItems.length > 0 && (
              <button
                type="button"
                onClick={() => setIsUploaderOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-8">
        
        {/* HERO SECTION */}
        <EvidenceHero
          metrics={metrics}
          onAddEvidence={() => setIsUploaderOpen(true)}
          onLoadDemoData={handleLoadDemoData}
          onExport={() => setIsExportOpen(true)}
          onClearWorkspace={handleClearWorkspace}
          language={language}
          hasItems={evidenceItems.length > 0}
        />

        {/* PROCESSING MODAL/VIEW IF ACTIVE */}
        {isProcessing && (
          <div className="py-6 sm:py-12">
            <EvidenceProcessingPipeline
              fileName={processingFileName}
              currentStage={processingStage}
              statusText={processingStatus}
              progressPercent={processingPercent}
            />
          </div>
        )}

        {/* EMPTY STATE */}
        {!isProcessing && evidenceItems.length === 0 && (
          <EvidenceEmptyState
            onAddEvidence={() => setIsUploaderOpen(true)}
            onLoadDemoData={handleLoadDemoData}
          />
        )}

        {/* MAIN WORKSPACE CONTENT */}
        {!isProcessing && evidenceItems.length > 0 && (
          <div className="space-y-6">
            
            {/* WORKSPACE NAVIGATION TABS */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto max-w-full">
                
                <button
                  type="button"
                  onClick={() => setActiveTab('library')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    activeTab === 'library'
                      ? 'bg-purple-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Evidence Library ({evidenceItems.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('timeline')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    activeTab === 'timeline'
                      ? 'bg-purple-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Timeline ({timelineEvents.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('connections')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    activeTab === 'connections'
                      ? 'bg-purple-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Network className="w-3.5 h-3.5" />
                  <span>Connections ({connections.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('entities')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    activeTab === 'entities'
                      ? 'bg-purple-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>People & Entities</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('gaps')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    activeTab === 'gaps'
                      ? 'bg-purple-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <FileQuestion className="w-3.5 h-3.5" />
                  <span>Gaps & Completeness ({gaps.length})</span>
                </button>

              </div>

              {/* Search Bar for Library */}
              {activeTab === 'library' && (
                <div className="relative min-w-[200px] sm:min-w-[280px]">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search files, entities, notes…"
                    className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              )}
            </div>

            {/* TAB VIEW 1: EVIDENCE LIBRARY */}
            {activeTab === 'library' && (
              <div className="space-y-4">
                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  {[
                    { id: 'all', label: 'All Items' },
                    { id: 'screenshot', label: 'Screenshots' },
                    { id: 'notice', label: 'Police Notices' },
                    { id: 'document', label: 'Documents' },
                    { id: 'message', label: 'Messages' },
                    { id: 'photo', label: 'Photos' },
                    { id: 'needs-review', label: 'Needs Review' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedTypeFilter(cat.id)}
                      className={`px-3 py-1.5 rounded-xl font-semibold transition-all shrink-0 cursor-pointer ${
                        selectedTypeFilter === cat.id
                          ? 'bg-slate-800 text-purple-300 border border-purple-500/40 shadow-xs'
                          : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Evidence Cards Grid */}
                {filteredItems.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-xs text-slate-500">
                    No evidence items match your filters.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredItems.map((item) => (
                      <EvidenceCard
                        key={item.id}
                        item={item}
                        onSelect={(it) => setSelectedItem(it)}
                        onChangeType={handleChangeItemType}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB VIEW 2: TIMELINE */}
            {activeTab === 'timeline' && (
              <EvidenceTimeline
                events={timelineEvents}
                evidenceItems={evidenceItems}
                onSelectEvidence={(it) => setSelectedItem(it)}
              />
            )}

            {/* TAB VIEW 3: CONNECTIONS */}
            {activeTab === 'connections' && (
              <EvidenceRelationshipMap
                connections={connections}
                evidenceItems={evidenceItems}
                onSelectEvidence={(it) => setSelectedItem(it)}
              />
            )}

            {/* TAB VIEW 4: PEOPLE & ENTITIES */}
            {activeTab === 'entities' && (
              <div className="space-y-6">
                <EntityExplorer
                  evidenceItems={evidenceItems}
                  selectedEntityValue={selectedEntityFilter}
                  onSelectEntity={(val) => {
                    setSelectedEntityFilter(val);
                    if (val) setActiveTab('library');
                  }}
                />
              </div>
            )}

            {/* TAB VIEW 5: GAPS & COMPLETENESS */}
            {activeTab === 'gaps' && (
              <EvidenceGapAnalysis
                gaps={gaps}
                metrics={metrics}
                evidenceItems={evidenceItems}
                onAddEvidence={() => setIsUploaderOpen(true)}
                onSelectEvidenceById={(id) => {
                  const it = evidenceItems.find((i) => i.id === id);
                  if (it) setSelectedItem(it);
                }}
              />
            )}

            {/* ASK NYAYA ABOUT THIS EVIDENCE (Hand-off to Feature 01 & 02) */}
            <div className="pt-6">
              <AskNyayaEvidencePanel
                evidenceItems={evidenceItems}
                events={timelineEvents}
                onAskQuestion={handleAskQuestion}
                onOpenAssistantWithContext={handleOpenAssistantWithContext}
                onOpenVoiceAssistant={onNavigateToVoiceAssistant}
                language={language}
              />
            </div>

          </div>
        )}

      </div>

      {/* MODAL 1: ADD EVIDENCE UPLOADER */}
      {isUploaderOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <EvidenceUploader
            onFilesSelected={handleFilesSelected}
            onTextImported={handleTextImported}
            onClose={() => setIsUploaderOpen(false)}
            language={language}
          />
        </div>
      )}

      {/* MODAL 2: EVIDENCE DETAIL PANEL */}
      {selectedItem && (
        <EvidenceDetailPanel
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddNote={handleAddNote}
          onToggleReviewStatus={handleToggleReviewStatus}
          onDeleteItem={handleDeleteItem}
          onChangeType={handleChangeItemType}
          onNavigateToDocumentIntelligence={onNavigateToDocumentIntelligence}
        />
      )}

      {/* MODAL 3: EXPORT RECORD */}
      {isExportOpen && (
        <EvidenceExportModal
          evidenceItems={evidenceItems}
          events={timelineEvents}
          gaps={gaps}
          onClose={() => setIsExportOpen(false)}
          onNavigateToLawyerConnection={onNavigateToLawyerConnection}
        />
      )}

    </div>
  );
};
