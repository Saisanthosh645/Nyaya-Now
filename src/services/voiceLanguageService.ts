import { Language } from '../types';
import { AILegalService, AIResponseData, ChatResponseResult } from './aiLegalService';

export type SupportedVoiceLang = 'en' | 'hi' | 'te' | 'auto';

export interface IndianLanguageMeta {
  code: string;
  name: string;
  nativeName: string;
  script: string;
  speechLocale: string;
  status: 'active' | 'upcoming';
  flag: string;
  samplePhrase: string;
}

export const ALL_INDIAN_LANGUAGES: IndianLanguageMeta[] = [
  {
    code: 'en',
    name: 'Indian English',
    nativeName: 'English',
    script: 'Latin',
    speechLocale: 'en-IN',
    status: 'active',
    flag: '🇮🇳',
    samplePhrase: 'Police stopped me on the road and asked me to come to the station.'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    script: 'Devanagari',
    speechLocale: 'hi-IN',
    status: 'active',
    flag: '🇮🇳',
    samplePhrase: 'पुलिस ने मुझे रोका और थाने आने को कहा, लेकिन वजह नहीं बताई।'
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    script: 'Telugu',
    speechLocale: 'te-IN',
    status: 'active',
    flag: '🇮🇳',
    samplePhrase: 'నిన్న పోలీసులు నన్ను ఆపి స్టేషన్‌కి రావాలని చెప్పారు. ఎందుకు అనేది చెప్పలేదు.'
  },
  // Future-ready roadmap languages
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    script: 'Tamil',
    speechLocale: 'ta-IN',
    status: 'upcoming',
    flag: '🇮🇳',
    samplePhrase: 'காவல்துறை என்னை காரணமின்றி தடுத்து நிறுத்தியது.'
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    script: 'Kannada',
    speechLocale: 'kn-IN',
    status: 'upcoming',
    flag: '🇮🇳',
    samplePhrase: 'ಪೊಲೀಸರು ನನ್ನನ್ನು ನಿಲ್ಲಿಸಿ ಠಾಣೆಗೆ ಬರುವಂತೆ ಹೇಳಿದರು.'
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    script: 'Malayalam',
    speechLocale: 'ml-IN',
    status: 'upcoming',
    flag: '🇮🇳',
    samplePhrase: 'പോലീസ് എന്നെ തടഞ്ഞു നിർത്തി സ്റ്റേഷനിൽ വരാൻ ആവശ്യപ്പെട്ടു.'
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    script: 'Devanagari',
    speechLocale: 'mr-IN',
    status: 'upcoming',
    flag: '🇮🇳',
    samplePhrase: 'पोलिसांनी मला अडवले आणि कारण न सांगता ठाण्यात बोलावले.'
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    script: 'Bengali',
    speechLocale: 'bn-IN',
    status: 'upcoming',
    flag: '🇮🇳',
    samplePhrase: 'পুলিশ আমাকে থামিয়ে থানায় যেতে বলেছে কিন্তু কারণ জানায়নি।'
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    script: 'Gujarati',
    speechLocale: 'gu-IN',
    status: 'upcoming',
    flag: '🇮🇳',
    samplePhrase: 'પોલીસે મને અટકાવીને કારણ આપ્યા વિના સ્ટેશન આવવા કહ્યું.'
  },
  {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    script: 'Gurmukhi',
    speechLocale: 'pa-IN',
    status: 'upcoming',
    flag: '🇮🇳',
    samplePhrase: 'ਪੁਲਿਸ ਨੇ ਮੈਨੂੰ ਰੋਕਿਆ ਅਤੇ ਬਿਨਾਂ ਕਾਰਨ ਦੱਸੇ ਥਾਣੇ ਆਉਣ ਲਈ ਕਿਹਾ।'
  },
  {
    code: 'or',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    script: 'Odia',
    speechLocale: 'or-IN',
    status: 'upcoming',
    flag: '🇮🇳',
    samplePhrase: 'ପୋଲିସ ମୋତେ ଅଟକାଇ କାରଣ ନ କହି ଥାନାକୁ ଆସିବାକୁ କହିଲା।'
  },
  {
    code: 'as',
    name: 'Assamese',
    nativeName: 'অসমীয়া',
    script: 'Bengali-Assamese',
    speechLocale: 'as-IN',
    status: 'upcoming',
    flag: '🇮🇳',
    samplePhrase: 'আৰক্ষীয়ে মোক বাধা দিলে আৰু কাৰণ নজনোৱাকৈ থানালৈ মাতিলে।'
  },
  {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    script: 'Perso-Arabic',
    speechLocale: 'ur-IN',
    status: 'upcoming',
    flag: '🇮🇳',
    samplePhrase: 'پولیس نے مجھے روکا اور تھانے آنے کو کہا لیکن وجہ نہیں بتائی۔'
  }
];

export interface LanguageDetectionResult {
  detectedLang: Language;
  detectedLangMeta: IndianLanguageMeta;
  confidence: number;
  isCodeMixed: boolean;
  scriptIdentified: string;
  explanation: string;
}

export interface VoiceSampleScenario {
  id: string;
  titleEn: string;
  titleNative: string;
  lang: Language;
  transcript: string;
  isCodeMixed?: boolean;
  description: string;
}

export const REAL_WORLD_VOICE_SAMPLES: VoiceSampleScenario[] = [
  {
    id: 'sample-te-station',
    titleEn: 'Telugu: Police Station Notice',
    titleNative: 'తెలుగు: స్టేషన్‌కి పిలుపు',
    lang: 'te',
    transcript: 'నిన్న పోలీసులు నన్ను ఆపి స్టేషన్కి రావాలని చెప్పారు. ఎందుకు అనేది చెప్పలేదు.',
    description: 'Police stopped citizen and ordered attendance at station without giving grounds.'
  },
  {
    id: 'sample-te-phone',
    titleEn: 'Telugu: Phone Search & Inspection',
    titleNative: 'తెలుగు: మొబైల్ తనిఖీ డిమాండ్',
    lang: 'te',
    transcript: 'పోలీసులు నా మొబైల్ ఫోన్ అన్‌లాక్ చేసి వాట్సాప్ చాట్‌లు చూడాలని బెదిరిస్తున్నారు.',
    description: 'Police demanding phone unlock without judicial warrant.'
  },
  {
    id: 'sample-hi-station',
    titleEn: 'Hindi: Unofficial Detention Demand',
    titleNative: 'हिंदी: बिना नोटिस थाने बुलाना',
    lang: 'hi',
    transcript: 'पुलिस ने मुझे रोका और थाने आने को कहा, लेकिन वजह नहीं बताई।',
    description: 'Detention inquiry under BNSS Section 35(3) notice requirement.'
  },
  {
    id: 'sample-hi-fir',
    titleEn: 'Hindi: Refusal to File FIR',
    titleNative: 'हिंदी: एफआईआर लिखने से इंकार',
    lang: 'hi',
    transcript: 'थाने वाले मेरी शिकायत पर एफआईआर दर्ज नहीं कर रहे हैं और भगा रहे हैं।',
    description: 'Police refusing mandatory FIR registration under BNSS Section 173.'
  },
  {
    id: 'sample-mixed-te',
    titleEn: 'Code-Mixed: Tenglish (Telugu + English)',
    titleNative: 'కోడ్ మిక్స్: టెంగ్లీష్ (Police station ki vellali)',
    lang: 'te',
    isCodeMixed: true,
    transcript: 'Police station ki vellali annaru but reason cheppaledu, notice kuda ivvaledu.',
    description: 'Natural mixed conversational speech combining Telugu verbal roots with English legal words.'
  },
  {
    id: 'sample-mixed-hi',
    titleEn: 'Code-Mixed: Hinglish (Hindi + English)',
    titleNative: 'कोड मिक्स: हिंग्लिश (FIR register nahi kiya)',
    lang: 'hi',
    isCodeMixed: true,
    transcript: 'Police ne FIR register nahi kiya and bribe demand kar rahe hain, what should I do?',
    description: 'Natural mixed Indian speech combining Hindi colloquial verbs with English words.'
  },
  {
    id: 'sample-en-arrest',
    titleEn: 'English: Arbitrary Detention / Memo',
    titleNative: 'English: Arrest Memo & Legal Aid',
    lang: 'en',
    transcript: 'My brother was taken into custody 18 hours ago. Police have not produced him before any magistrate.',
    description: '24-hour constitutional custody limit under Article 22(2) & BNSS Section 58.'
  },
  {
    id: 'sample-en-drunk-drive',
    titleEn: 'English: Drunk & Drive Check',
    titleNative: 'Indian English: Drunk & Drive Check',
    lang: 'en',
    transcript: 'I was caught by the police in a drunk and drive',
    description: 'Statutory 30 mg BAC limit, court fine vs extortion bribes, and Panchnama rights under MV Act Sec 185.'
  },
  {
    id: 'sample-te-drunk-drive',
    titleEn: 'Telugu: Drunk & Drive / Meter Test',
    titleNative: 'తెలుగు: డ్రంక్ అండ్ డ్రైవ్ తనిఖీ',
    lang: 'te',
    transcript: 'పోలీసులు డ్రంక్ అండ్ డ్రైవ్ లో ఆపారు, మీటర్ లిమిట్ ఎంత మరియు లంచం అడుగుతున్నారు ఏం చేయాలి?',
    description: 'Legal alcohol threshold, refusing illegal road cash, and vehicle custody memo.'
  },
  {
    id: 'sample-hi-drunk-drive',
    titleEn: 'Hindi: Drunk & Drive / Breathalyzer',
    titleNative: 'हिंदी: ड्रिंक एंड ड्राइव चालान',
    lang: 'hi',
    transcript: 'ड्रिंक एंड ड्राइव में पुलिस ने गाड़ी रोकी है, कानूनी अल्कोहल लिमिट और सरकारी चालान कितना है?',
    description: 'Section 185 BAC threshold 30mg/100ml, court challan, and no cash bribe warning.'
  }
];

export interface VoiceAssistantResponse {
  userQuery: string;
  detectedLang: Language;
  targetLang: Language;
  detection: LanguageDetectionResult;
  chatResponse: ChatResponseResult;
  dossier?: AIResponseData;
  sayThisInLang: string;
  sayThisLabel: string;
  translatedResponses: {
    en: string;
    hi: string;
    te: string;
  };
}

export class VoiceLanguageService {
  /**
   * Intelligently detects whether input is Telugu, Hindi, Indian English,
   * or a code-mixed combination (Tenglish / Hinglish).
   */
  public static detectLanguage(text: string): LanguageDetectionResult {
    const trimmed = text.trim();
    if (!trimmed) {
      const defaultMeta = ALL_INDIAN_LANGUAGES.find(l => l.code === 'en')!;
      return {
        detectedLang: 'en',
        detectedLangMeta: defaultMeta,
        confidence: 0.9,
        isCodeMixed: false,
        scriptIdentified: 'Latin',
        explanation: 'Default to English'
      };
    }

    // 1. Script checks (Unicode ranges)
    const teluguRegex = /[\u0C00-\u0C7F]/;
    const devanagariRegex = /[\u0900-\u097F]/;

    const teluguMatches = (text.match(/[\u0C00-\u0C7F]/g) || []).length;
    const devanagariMatches = (text.match(/[\u0900-\u097F]/g) || []).length;
    const totalChars = trimmed.length;

    // Direct Telugu Script
    if (teluguMatches > 3 || (teluguMatches / totalChars > 0.25)) {
      const isMixed = /police|fir|station|car|mobile|phone|court|sir|officer/i.test(text);
      const meta = ALL_INDIAN_LANGUAGES.find(l => l.code === 'te')!;
      return {
        detectedLang: 'te',
        detectedLangMeta: meta,
        confidence: 0.98,
        isCodeMixed: isMixed,
        scriptIdentified: 'Telugu Script (తెలుగు లిపి)',
        explanation: isMixed ? 'Telugu with English legal terminology' : 'Native Telugu Script'
      };
    }

    // Direct Devanagari Script (Hindi)
    if (devanagariMatches > 3 || (devanagariMatches / totalChars > 0.25)) {
      const isMixed = /police|fir|station|car|mobile|phone|court|sir|officer/i.test(text);
      const meta = ALL_INDIAN_LANGUAGES.find(l => l.code === 'hi')!;
      return {
        detectedLang: 'hi',
        detectedLangMeta: meta,
        confidence: 0.98,
        isCodeMixed: isMixed,
        scriptIdentified: 'Devanagari Script (देवनागरी)',
        explanation: isMixed ? 'Hindi with English legal terms' : 'Native Hindi Script'
      };
    }

    // 2. Romanized Roman script analysis: Code-Mixed Indian English / Tenglish / Hinglish
    const lower = text.toLowerCase();

    // Romanized Telugu markers (Tenglish)
    const teluguKeywords = [
      'vellali', 'cheppaledu', 'nannu', 'chepparu', 'em cheyali', 'poyindi', 'pettaru',
      'adigaru', 'vastanu', 'lekapothe', 'aagaru', 'chusa', 'annaru', 'ivvaledu',
      'statio ki', 'stationki', 'policeki', 'cheppali', 'telusu', 'undali', 'ravali',
      'aparu', 'aapaaru', 'teesukunnaru', 'naku', 'sahayam', 'chesaru', 'adugutunnaru',
      'lancham', 'dabbu', 'dabbulu', 'paisalu', 'kottaru', 'bediristunnaru', 'tagi',
      'stri', 'mahila', 'aadavaaru', 'ammayi', 'nannu aapaaru', 'bribe adugutunnaru',
      'phone choostanu', 'fir rayaledu', 'arrest chesaru'
    ];

    // Romanized Hindi markers (Hinglish)
    const hindiKeywords = [
      'roka', 'kaha', 'nahi kiya', 'kya karun', 'thane', 'pucha', 'paise', 'batao',
      'giraftar', 'mujhe', 'le gaye', 'chori', 'mang rahe', 'mana kiya', 'thaane',
      'gadi', 'pakad liya', 'karenge', 'hai kya', 'nahin', 'kar rahe', 'bataiye',
      'sahab', 'riddha', 'paisa', 'dekhna chahte', 'ghoos', 'manga', 'rishwat',
      'mara', 'peeta', 'dhamki', 'sharab', 'daroo', 'nasha', 'ladki', 'mahila', 'aurat',
      'mujhe roka', 'paise maang rahe', 'fir nahi likh rahe'
    ];

    let teluguScore = 0;
    teluguKeywords.forEach(kw => {
      if (lower.includes(kw)) teluguScore += 2;
    });

    let hindiScore = 0;
    hindiKeywords.forEach(kw => {
      if (lower.includes(kw)) hindiScore += 2;
    });

    if (teluguScore > 0 && teluguScore >= hindiScore) {
      const meta = ALL_INDIAN_LANGUAGES.find(l => l.code === 'te')!;
      return {
        detectedLang: 'te',
        detectedLangMeta: meta,
        confidence: 0.88,
        isCodeMixed: true,
        scriptIdentified: 'Romanized Telugu (Tenglish)',
        explanation: 'Natural mixed speech: Telugu verbal roots with English words'
      };
    }

    if (hindiScore > 0 && hindiScore > teluguScore) {
      const meta = ALL_INDIAN_LANGUAGES.find(l => l.code === 'hi')!;
      return {
        detectedLang: 'hi',
        detectedLangMeta: meta,
        confidence: 0.88,
        isCodeMixed: true,
        scriptIdentified: 'Romanized Hindi (Hinglish)',
        explanation: 'Natural mixed speech: Hindi vocabulary with English legal phrases'
      };
    }

    // Default to Indian English
    const meta = ALL_INDIAN_LANGUAGES.find(l => l.code === 'en')!;
    return {
      detectedLang: 'en',
      detectedLangMeta: meta,
      confidence: 0.95,
      isCodeMixed: false,
      scriptIdentified: 'Latin Script (Indian English)',
      explanation: 'Indian English legal syntax'
    };
  }

  /**
   * Complete Voice-To-Legal pipeline:
   * SPEECH TEXT -> LANGUAGE DETECTION -> AI RETRIEVAL -> LOCALIZED RESPONSE -> SAY THIS POLITELY
   */
  public static async processVoiceQuery(
    spokenQuery: string,
    preferredLanguage: SupportedVoiceLang
  ): Promise<VoiceAssistantResponse> {
    // 1. Language Detection
    const detection = this.detectLanguage(spokenQuery);
    
    // Determine effective response language
    const effectiveLang: Language =
      preferredLanguage === 'auto'
        ? detection.detectedLang
        : (preferredLanguage as Language);

    // 2. Query Feature 01 AI Engine for conversational + dossier response
    const chatRes = await AILegalService.getChatResponse(spokenQuery, effectiveLang);

    // 3. Obtain structured dossier for deep legal context & "Say This Politely"
    let dossier: AIResponseData | undefined = undefined;
    try {
      dossier = await AILegalService.analyzeSituation(spokenQuery, effectiveLang);
    } catch (err) {
      console.warn('Dossier analysis fallback:', err);
    }

    // 4. Construct "Say This Politely" script localized for the user's language
    let sayThisInLang = '';
    let sayThisLabel = '';

    if (effectiveLang === 'te') {
      sayThisLabel = '🗣️ గౌరవంగా ఇలా చెప్పండి (Say This Politely)';
      sayThisInLang = dossier?.sayThis?.telugu ||
        '“అధికారి గారూ, నన్ను ఎందుకు ఆపారో మరియు నేను ఇక్కడ ఉండాల్సి ఉందా లేదా వెళ్లవచ్చా అనేది దయచేసి స్పష్టం చేయగలరా?”';
    } else if (effectiveLang === 'hi') {
      sayThisLabel = '🗣️ विनम्रता से ऐसे कहें (Say This Politely)';
      sayThisInLang = dossier?.sayThis?.hindi ||
        '“अधिकारी महोदय, कृपया स्पष्ट करें कि मुझे क्यों रोका गया है और क्या मैं यहाँ रुकने के लिए बाध्य हूँ या जा सकता हूँ?”';
    } else {
      sayThisLabel = '🗣️ Say This Politely to the Officer';
      sayThisInLang = dossier?.sayThis?.english ||
        '“Officer, could you please clarify why I am being stopped and whether I am under formal detention or free to go?”';
    }

    // Ensure allTranslations exists
    const translatedResponses = {
      en: chatRes.allTranslations?.en || chatRes.text,
      hi: chatRes.allTranslations?.hi || chatRes.text,
      te: chatRes.allTranslations?.te || chatRes.text
    };

    return {
      userQuery: spokenQuery,
      detectedLang: detection.detectedLang,
      targetLang: effectiveLang,
      detection,
      chatResponse: chatRes,
      dossier,
      sayThisInLang,
      sayThisLabel,
      translatedResponses
    };
  }

  /**
   * Text-To-Speech (TTS) engine with Indian voice selection & rate controls.
   */
  public static speakText(
    text: string,
    lang: Language,
    speed: number = 1.0,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: () => void
  ): () => void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onError) onError();
      return () => {};
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Clean markdown, symbols, bullet points, citations and emojis for crisp, natural TTS
    const cleanText = text
      .replace(/[*#_~`>•\-]/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      if (onEnd) onEnd();
      return () => {};
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = lang === 'te' ? 0.90 : lang === 'hi' ? 0.92 : Math.max(0.7, Math.min(1.4, speed));
    utterance.pitch = 1.0;

    const applyVoiceAndSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice: SpeechSynthesisVoice | null = null;

      if (lang === 'hi') {
        utterance.lang = 'hi-IN';
        selectedVoice =
          voices.find(v => v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi')) ||
          null;
      } else if (lang === 'te') {
        utterance.lang = 'te-IN';
        selectedVoice =
          voices.find(v => v.lang.startsWith('te') || v.name.toLowerCase().includes('telugu')) ||
          null;
      } else {
        utterance.lang = 'en-IN';
        selectedVoice =
          voices.find(v => v.lang === 'en-IN' || v.name.toLowerCase().includes('india')) ||
          voices.find(v => v.lang.startsWith('en')) ||
          null;
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      if (onStart) utterance.onstart = onStart;
      utterance.onend = () => {
        if (onEnd) onEnd();
      };
      utterance.onerror = () => {
        if (onError) onError();
        else if (onEnd) onEnd();
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('SpeechSynthesis error:', err);
        if (onError) onError();
      }
    };

    const currentVoices = window.speechSynthesis.getVoices();
    if (currentVoices.length > 0) {
      applyVoiceAndSpeak();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        applyVoiceAndSpeak();
      };
      // Fallback timeout in case onvoiceschanged does not fire
      setTimeout(applyVoiceAndSpeak, 100);
    }

    // Return cleanup/stop function
    return () => {
      try {
        window.speechSynthesis.cancel();
      } catch {}
      if (onEnd) onEnd();
    };
  }

  /**
   * Stops any ongoing speech synthesis
   */
  public static stopSpeaking(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}
