import { Language } from '../types';

export interface ActionItem {
  number: string;
  title: string;
  detail: string;
}

export interface SayThisScript {
  english: string;
  hindi: string;
  telugu: string;
}

export interface LegalContextItem {
  id: string;
  category: string;
  badge: string;
  provision: string;
  explanation: string;
  sourceUrl?: string;
  isVerified: boolean;
}

export interface FollowUpOption {
  label: string;
  value: string;
}

export interface FollowUpQuestionData {
  id: string;
  question: string;
  options: FollowUpOption[];
}

export interface AIResponseData {
  id: string;
  userPrompt: string;
  timestamp: string;
  scenarioTag: string;
  situationTitle: string;
  primaryAssessment: string;
  conciseExplanation: string;
  actions: ActionItem[];
  sayThis: SayThisScript;
  legalContext: LegalContextItem[];
  followUp: FollowUpQuestionData;
  telemetry: {
    intent: string;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    governingAct: string;
    statutoryConfidence: 'VERIFIED' | 'CAUTIONARY';
  };
}

export interface ChatResponseResult {
  text: string;
  citations: string[];
  suggestions: string[];
  sayThisFirst?: string;
  allTranslations: {
    en: string;
    hi: string;
    te: string;
  };
  allSuggestions?: {
    en: string[];
    hi: string[];
    te: string[];
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content?: string;
  userQuery?: string;
  allTranslations?: {
    en: string;
    hi: string;
    te: string;
  };
  allSuggestions?: {
    en: string[];
    hi: string[];
    te: string[];
  };
  suggestions?: string[];
  citations?: string[];
  structuredResponse?: AIResponseData;
}

// Situational Knowledge Database mapped directly to BNSS 2023, Constitution, and Supreme Court Directives
interface SituationKnowledge {
  keywords: string[];
  scenarioTag: string;
  situationTitle: {
    en: string;
    hi: string;
    te: string;
  };
  primaryAssessment: {
    en: string;
    hi: string;
    te: string;
  };
  conciseExplanation: {
    en: string;
    hi: string;
    te: string;
  };
  actions: {
    en: ActionItem[];
    hi: ActionItem[];
    te: ActionItem[];
  };
  sayThis: SayThisScript;
  legalContext: LegalContextItem[];
  followUp: {
    en: FollowUpQuestionData;
    hi: FollowUpQuestionData;
    te: FollowUpQuestionData;
  };
  telemetry: {
    intent: string;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    governingAct: string;
    statutoryConfidence: 'VERIFIED' | 'CAUTIONARY';
  };
}

const KNOWLEDGE_BASE: SituationKnowledge[] = [
  {
    keywords: [
      'stop', 'stopped', 'road', 'street', 'question', 'questioned', 'checkpoint', 'nakabandi', 'pulled over', 'bike', 'car', 'license', 'licence', 'keys',
      'ఆపారు', 'ఆపడం', 'రోడ్డుపై', 'రోడ్డు', 'తనిఖీ', 'చెక్పోస్ట్', 'నాకాబందీ', 'బైక్', 'కారు', 'లైసెన్స్', 'కీలు', 'తాళాలు', 'ట్రాఫిక్', 'పోలీసు',
      'aapaaru', 'aagaru', 'aparu', 'road lo', 'traffic police', 'bike aapaaru',
      'रोका', 'रोक लिया', 'गाड़ी रोकी', 'सड़क पर', 'नाकाबंदी', 'चेकिंग', 'बाइक', 'कार', 'लाइसेंस', 'चाबी', 'ट्रैफिक', 'roka', 'rok liya', 'gaadi roki'
    ],
    scenarioTag: 'POLICE STOP & STREET QUESTIONING',
    situationTitle: {
      en: 'Police stopped or questioned on the road',
      hi: 'सड़क पर पुलिस द्वारा रोका जाना या पूछताछ',
      te: 'రోడ్డుపై పోలీసులు ఆపడం లేదా ప్రశ్నించడం'
    },
    primaryAssessment: {
      en: 'This appears to involve a routine police stop, checkpoint inquiry, or casual street questioning.',
      hi: 'यह मामला सड़क पर नियमित पुलिस जांच, नाकाबंदी पूछताछ या सामान्य पूछताछ का प्रतीत होता है।',
      te: 'ఇది రోడ్డుపై సాధారణ పోలీసు తనిఖీ, నాకాబందీ విచారణ లేదా సాధారణ ప్రశ్నల సందర్భాన్ని సూచిస్తోంది.'
    },
    conciseExplanation: {
      en: 'Based on what you\'ve described, casual questioning on the street does not automatically constitute detention or arrest. The exact legal position depends on the circumstances, but officers on duty must display clear identification, and any restriction on your physical movement must follow established statutory procedure under Section 35 of the BNSS.',
      hi: 'आपके विवरण के आधार पर, सड़क पर सामान्य पूछताछ का अर्थ तुरंत हिरासत या गिरफ्तारी नहीं होता। वास्तविक कानूनी स्थिति परिस्थितियों पर निर्भर करती है, परंतु ड्यूटी पर तैनात अधिकारी का नेमप्लेट प्रदर्शित करना अनिवार्य है और आपकी आवाजाही पर कोई भी रोक BNSS की धारा 35 के तहत ही हो सकती है।',
      te: 'మీరు తెలిపిన వివరాల ప్రకారం, రోడ్డుపై సాధారణ విచారణ వెంటనే అరెస్టు లేదా కస్టడీ కిందకు రాదు. చట్టపరమైన పరిస్థితి సందర్భంపై ఆధారపడి ఉంటుంది, అయితే విధుల్లో ఉన్న పోలీసులు నేమ్ ట్యాగ్ కలిగి ఉండాలి మరియు BNSS సెక్షన్ 35 నిబంధనల ప్రకారమే వ్యవహరించాలి.'
    },
    actions: {
      en: [
        { number: '01', title: 'Stay calm and avoid confrontation', detail: 'Keep hands visible, do not make sudden movements, and maintain a polite, neutral tone at all times.' },
        { number: '02', title: 'Verify the officer’s name and designation', detail: 'Politely observe the officer\'s name tag and police station badge required under Section 36 BNSS and D.K. Basu guidelines.' },
        { number: '03', title: 'Clarify whether you are free to leave', detail: 'Ask respectfully if you are being formally detained or if you are free to proceed on your journey.' },
        { number: '04', title: 'Produce mandatory documents if driving', detail: 'If driving, produce Driving License and RC in physical format or via official mParivahan / DigiLocker.' },
        { number: '05', title: 'Assert your right to silence against self-incrimination', detail: 'Provide your truthful name and address, but remember Article 20(3) protects you from forced confessions.' }
      ],
      hi: [
        { number: '01', title: 'शांत रहें और टकराव से बचें', detail: 'हाथ दृश्यमान रखें, कोई अचानक हरकत न करें और बातचीत में विनम्र व शांत लहजा बनाए रखें।' },
        { number: '02', title: 'अधिकारी का नाम और पद सत्यापित करें', detail: 'BNSS की धारा 36 के अनुसार वर्दी पर नेम प्लेट और पुलिस स्टेशन का विवरण विनम्रता से देखें।' },
        { number: '03', title: 'स्पष्ट करें कि क्या आप जाने के लिए स्वतंत्र हैं', detail: 'आदरपूर्वक पूछें कि क्या आपको औपचारिक रूप से रोका गया है या आप आगे बढ़ सकते हैं।' },
        { number: '04', title: 'वाहन चलाते समय आवश्यक दस्तावेज प्रस्तुत करें', detail: 'डिजिलॉकर या एम-परिवहन ऐप के माध्यम से वैध ड्राइविंग लाइसेंस व आरसी दिखाएं।' },
        { number: '05', title: 'आत्म-दोषारोपण के विरुद्ध मौन रहने का अधिकार', detail: 'सच्चा नाम और पता बताएं, लेकिन संविधान का अनुच्छेद 20(3) आपको जबरन बयान देने से बचाता है।' }
      ],
      te: [
        { number: '01', title: 'శాంతంగా ఉండండి, వాదనలకు దిగకండి', detail: 'చేతులు స్పష్టంగా కనిపించేలా ఉంచండి, హఠాత్తుగా కదలకండి మరియు మర్యాదపూర్వక స్వరాన్ని కొనసాగించండి.' },
        { number: '02', title: 'పోలీస్ అధికారి పేరు మరియు హోదా తెలుసుకోండి', detail: 'BNSS సెక్షన్ 36 ప్రకారం యూనిఫాంపై నేమ్ బ్యాడ్జ్ మరియు స్టేషన్ వివరాలను గమనించండి.' },
        { number: '03', title: 'మీరు వెళ్ళవచ్చా లేదా అనేది స్పష్టత తీసుకోండి', detail: 'మిమ్మల్ని అధికారికంగా నిర్బంధించారా లేదా మీరు వెళ్ళిపోవచ్చా అని గౌరవంగా అడగండి.' },
        { number: '04', title: 'డ్రైవింగ్ చేస్తుంటే అవసరమైన పత్రాలు చూపించండి', detail: 'డిజిలాకర్ లేదా ఎం-పరివాహన్ ద్వారా డ్రైవింగ్ లైసెన్స్, ఆర్సీని చూపించవచ్చు.' },
        { number: '05', title: 'మిమ్మల్ని మీరు నిందించుకునే సమాధానాలు ఇవ్వకపోవడం', detail: 'నిజమైన పేరు మరియు చిరునామా చెప్పండి, ఆర్టికల్ 20(3) ప్రకారం ఒత్తిడితో కూడిన సమాధానాలు చెప్పనవసరం లేదు.' }
      ]
    },
    sayThis: {
      english: '“Officer, could you please clarify why I am being stopped, and whether I am legally detained or free to leave?”',
      hindi: '“अधिकारी महोदय, क्या आप कृपया स्पष्ट कर सकते हैं कि मुझे क्यों रोका गया है, और क्या मैं जाने के लिए स्वतंत्र हूँ?”',
      telugu: '“అధికారి గారూ, నన్ను ఎందుకు ఆపారో మరియు నేను ఇక్కడే ఉండాలా లేదా వెళ్లవచ్చా అనేది దయచేసి స్పష్టం చేయగలరా?”'
    },
    legalContext: [
      {
        id: 'bnss-35',
        category: 'CRIMINAL PROCEDURE',
        badge: 'BNSS Sec 35(3)',
        provision: 'Section 35(3), Bharatiya Nagarik Suraksha Sanhita, 2023',
        explanation: 'For offences punishable up to 7 years, police must ordinarily serve a written Notice of Appearance rather than effecting a routine street arrest.',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
        isVerified: true
      },
      {
        id: 'const-21',
        category: 'CONSTITUTION OF INDIA',
        badge: 'Article 21 & 20(3)',
        provision: 'Articles 20(3) & 21, Constitution of India',
        explanation: 'Guarantees personal liberty and the constitutional right against compelled self-incrimination during questioning.',
        sourceUrl: 'https://www.india.gov.in/my-government/constitution-india',
        isVerified: true
      },
      {
        id: 'sc-dk-basu',
        category: 'SUPREME COURT PRECEDENT',
        badge: 'D.K. Basu Directives',
        provision: 'D.K. Basu v. State of West Bengal (1997)',
        explanation: 'Police personnel carrying out arrest or handling interrogation must bear clear identification and accurate name tags with designations.',
        sourceUrl: 'https://main.sci.gov.in/',
        isVerified: true
      }
    ],
    followUp: {
      en: {
        id: 'fu-stop-1',
        question: 'Are you currently still at the location with the police officer?',
        options: [
          { label: 'Yes, with police now', value: 'yes_current' },
          { label: 'No, this happened earlier', value: 'no_past' },
          { label: 'Not sure / In transit', value: 'unsure' }
        ]
      },
      hi: {
        id: 'fu-stop-1',
        question: 'क्या आप अभी भी मौके पर पुलिस अधिकारी के साथ मौजूद हैं?',
        options: [
          { label: 'हाँ, अभी पुलिस के साथ हूँ', value: 'yes_current' },
          { label: 'नहीं, यह पहले हुआ था', value: 'no_past' },
          { label: 'निश्चित नहीं / रास्ते में हूँ', value: 'unsure' }
        ]
      },
      te: {
        id: 'fu-stop-1',
        question: 'మీరు ప్రస్తుతం అక్కడే పోలీసు అధికారితో ఉన్నారా?',
        options: [
          { label: 'అవును, ప్రస్తుతం పోలీసులతో ఉన్నాను', value: 'yes_current' },
          { label: 'లేదు, ఇది ఇంతకుముందు జరిగింది', value: 'no_past' },
          { label: 'ఖచ్చితంగా తెలియదు / ప్రయాణంలో ఉన్నాను', value: 'unsure' }
        ]
      }
    },
    telemetry: {
      intent: 'STREET_CHECKPOINT_INQUIRY',
      riskLevel: 'LOW',
      governingAct: 'BNSS Sec 35 & 36',
      statutoryConfidence: 'VERIFIED'
    }
  },

  // 2. ARREST & DETENTION
  {
    keywords: [
      'arrest', 'arrested', 'detain', 'detained', 'custody', 'lockup', 'handcuff', 'handcuffs', 'jail', 'taken to station', 'held', 'remand', 'magistrate',
      'అరెస్ట్', 'అరెస్టు', 'కస్టడీ', 'లాకప్', 'జైలు', 'బంధించారు', 'తీసుకెళ్లారు', 'స్టేషన్ కి తీసుకెళ్లారు', 'చేతులకు బేడీలు', 'arrest chesaru', 'custody lo',
      'गिरफ्तार', 'गिरफ्तारी', 'हिरासत', 'जेल', 'लॉकअप', 'थाने ले गए', 'पकड़ लिया', 'हवालात', 'हथकड़ी', 'giraftar', 'custody mein'
    ],
    scenarioTag: 'FORMAL ARREST & CUSTODY',
    situationTitle: {
      en: 'Arrest or formal custodial detention',
      hi: 'औपचारिक गिरफ्तारी या पुलिस हिरासत',
      te: 'అరెస్టు లేదా పోలీస్ కస్టడీ'
    },
    primaryAssessment: {
      en: 'This appears to involve formal police arrest, custody, or involuntary detention.',
      hi: 'यह मामला औपचारिक पुलिस गिरफ्तारी, हिरासत या अस्वैच्छिक निरोध का प्रतीत होता है।',
      te: 'ఇది అధికారిక పోలీస్ అరెస్టు, కస్టడీ లేదా నిర్బంధాన్ని సూచిస్తోంది.'
    },
    conciseExplanation: {
      en: 'Based on what you\'ve described, whenever an individual\'s physical liberty is restrained by law enforcement, strict constitutional and statutory protections take effect immediately. Police must communicate the specific grounds of arrest, prepare a formal Arrest Memo, notify a nominated relative or friend, and produce you before a Judicial Magistrate within 24 hours under Section 58 of the BNSS.',
      hi: 'आपके विवरण के अनुसार, जब भी किसी नागरिक की व्यक्तिगत स्वतंत्रता पर रोक लगाई जाती है, तो सख्त संवैधानिक सुरक्षा उपाय तुरंत प्रभावी हो जाते हैं। पुलिस को गिरफ्तारी का ठोस कारण बताना होगा, अरेस्ट मेमो तैयार करना होगा, आपके किसी परिजन को सूचित करना होगा और BNSS की धारा 58 के तहत 24 घंटे के भीतर मजिस्ट्रेट के समक्ष पेश करना होगा।',
      te: 'మీరు వివరించిన ప్రకారం, ఒక వ్యక్తి స్వేచ్ఛను పోలీసులు పరిమితం చేసినప్పుడు, కఠినమైన రాజ్యాంగ మరియు చట్టపరమైన రక్షణలు వెంటనే అమల్లోకి వస్తాయి. పోలీసులు అరెస్టుకు గల కారణాలను తెలపాలి, అరెస్ట్ మెమో సిద్ధం చేయాలి, మీ బంధువులకు సమాచారం అందించాలి మరియు BNSS సెక్షన్ 58 ప్రకారం 24 గంటల్లో మేజిస్ట్రేట్ ముందు హాజరుపరచాలి.'
    },
    actions: {
      en: [
        { number: '01', title: 'Request the exact grounds of arrest in writing', detail: 'Ask calmly under Article 22(1) and Section 47 BNSS for the precise offence and whether it is bailable.' },
        { number: '02', title: 'Insist on preparation of the Arrest Memo', detail: 'The memo must record the exact date, time, location, and must be signed by at least one independent witness and counter-signed by you.' },
        { number: '03', title: 'Demand notification to a nominated family member', detail: 'Section 48 BNSS guarantees your right to have an immediate phone call made to a family member or trusted friend.' },
        { number: '04', title: 'Request legal counsel consultation', detail: 'Under Section 38 BNSS, you have the right to meet and consult an advocate of your choice during interrogation.' },
        { number: '05', title: 'Insist on mandatory medical examination', detail: 'Section 53 BNSS mandates a comprehensive medical examination by a medical officer upon arrest to record any pre-existing conditions or injuries.' }
      ],
      hi: [
        { number: '01', title: 'गिरफ्तारी का लिखित कारण मांगें', detail: 'संविधान के अनुच्छेद 22(1) व BNSS धारा 47 के तहत अपराध की धारा व यह जमानती है या नहीं, पूछें।' },
        { number: '02', title: 'अरेस्ट मेमो तैयार करने का आग्रह करें', detail: 'मेमो में गिरफ्तारी का समय, तारीख, स्थान और कम से कम एक गवाह के हस्ताक्षर होने अनिवार्य हैं।' },
        { number: '03', title: 'परिवार के सदस्य को सूचित करने की मांग करें', detail: 'BNSS की धारा 48 के तहत आपके किसी रिश्तेदार या मित्र को तत्काल सूचित किया जाना आपका अधिकार है।' },
        { number: '04', title: 'वकील से परामर्श की मांग करें', detail: 'BNSS धारा 38 के तहत पूछताछ के दौरान अपनी पसंद के अधिवक्ता से मिलने का वैधानिक अधिकार है।' },
        { number: '05', title: 'अनिवार्य मेडिकल जांच का आग्रह करें', detail: 'BNSS धारा 53 के तहत किसी भी चोट या स्वास्थ्य स्थिति को रिकॉर्ड करने के लिए सरकारी डॉक्टर से जांच जरूरी है।' }
      ],
      te: [
        { number: '01', title: 'అరెస్టుకు కారణాన్ని తెలుసుకోండి', detail: 'ఆర్టికల్ 22(1) మరియు BNSS సెక్షన్ 47 ప్రకారం ఏ నేరం కింద అరెస్ట్ చేశారో మరియు బెయిలబుల్ కాదో స్పష్టంగా అడగండి.' },
        { number: '02', title: 'అరెస్ట్ మెమో తయారు చేయాలని కోరండి', detail: 'మెమోలో అరెస్టు సమయం, తేదీ, స్థలం మరియు కనీసం ఒక సాక్షి సంతకం తప్పనిసరిగా ఉండాలి.' },
        { number: '03', title: 'కుటుంబ సభ్యులకు సమాచారం అందించాలని డిమాండ్ చేయండి', detail: 'BNSS సెక్షన్ 48 ప్రకారం మీ బంధువులు లేదా స్నేహితుడికి తక్షణమే ఫోన్ చేసి సమాచారం ఇచ్చే హక్కు ఉంది.' },
        { number: '04', title: 'న్యాయవాదితో మాట్లాడే హక్కును ఉపయోగించండి', detail: 'BNSS సెక్షన్ 38 ప్రకారం విచారణ సమయంలో న్యాయవాదిని సంప్రదించే హక్కు మీకు ఉంది.' },
        { number: '05', title: 'తప్పనిసరి వైద్య పరీక్షను కోరండి', detail: 'BNSS సెక్షన్ 53 ప్రకారం ఎలాంటి గాయాలైనా రికార్డు చేయడానికి డాక్టర్ ద్వారా వైద్య పరీక్ష చేయించాలి.' }
      ]
    },
    sayThis: {
      english: '“Officer, under Section 47 of the BNSS, please inform me of the grounds of this arrest, whether it is bailable, and please inform my family immediately.”',
      hindi: '“अधिकारी महोदय, BNSS की धारा 47 के तहत कृपया मुझे गिरफ्तारी का आधार और धाराएं बताएं, तथा मेरे परिवार को तुरंत सूचित करें।”',
      telugu: '“అధికారి గారూ, BNSS సెక్షన్ 47 ప్రకారం నన్ను ఏ కారణంపై అరెస్టు చేస్తున్నారో మరియు నా కుటుంబ సభ్యులకు తక్షణమే సమాచారం అందించగలరా?”'
    },
    legalContext: [
      {
        id: 'bnss-47-48',
        category: 'CRIMINAL PROCEDURE',
        badge: 'BNSS Sec 47 & 48',
        provision: 'Sections 47 & 48, Bharatiya Nagarik Suraksha Sanhita, 2023',
        explanation: 'Mandates informing the person arrested of grounds of arrest, bailability, and informing designated family members without delay.',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
        isVerified: true
      },
      {
        id: 'const-22-2',
        category: 'CONSTITUTIONAL MANDATE',
        badge: 'Article 22(2) & Sec 58 BNSS',
        provision: 'Article 22(2), Constitution of India & Section 58 BNSS',
        explanation: 'Strict requirement to produce every arrested individual before the nearest Judicial Magistrate within 24 hours.',
        sourceUrl: 'https://www.india.gov.in/my-government/constitution-india',
        isVerified: true
      },
      {
        id: 'bnss-53',
        category: 'MEDICAL SAFEGUARD',
        badge: 'BNSS Sec 53',
        provision: 'Section 53, Bharatiya Nagarik Suraksha Sanhita, 2023',
        explanation: 'Mandatory medical examination of the arrested person by an authorized medical practitioner.',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
        isVerified: true
      }
    ],
    followUp: {
      en: {
        id: 'fu-arrest-1',
        question: 'Has a formal Arrest Memo been prepared and signed in your presence?',
        options: [
          { label: 'Yes, memo signed', value: 'memo_signed' },
          { label: 'No, no memo prepared', value: 'no_memo' },
          { label: 'Not sure / Not allowed to see', value: 'unsure' }
        ]
      },
      hi: {
        id: 'fu-arrest-1',
        question: 'क्या आपकी उपस्थिति में औपचारिक अरेस्ट मेमो तैयार और हस्ताक्षरित किया गया है?',
        options: [
          { label: 'हाँ, मेमो साइन हुआ है', value: 'memo_signed' },
          { label: 'नहीं, कोई मेमो नहीं बना', value: 'no_memo' },
          { label: 'निश्चित नहीं / देखने नहीं दिया', value: 'unsure' }
        ]
      },
      te: {
        id: 'fu-arrest-1',
        question: 'మీ సమక్షంలో అధికారిక అరెస్ట్ మెమో తయారు చేసి సంతకం చేశారా?',
        options: [
          { label: 'అవును, మెమో సంతకం చేశారు', value: 'memo_signed' },
          { label: 'లేదు, ఎటువంటి మెమో చేయలేదు', value: 'no_memo' },
          { label: 'ఖచ్చితంగా తెలియదు / చూపించలేదు', value: 'unsure' }
        ]
      }
    },
    telemetry: {
      intent: 'ARREST_AND_DETENTION',
      riskLevel: 'CRITICAL',
      governingAct: 'BNSS Sec 36, 47, 48 & 58',
      statutoryConfidence: 'VERIFIED'
    }
  },

  // 3. FIR REFUSED
  {
    keywords: [
      'fir', 'refuse', 'refused', 'refusing', 'complaint', 'not writing', 'not taking', 'not registering', 'police station', 'sho', 'crime', 'theft', 'assault', 'zero fir',
      'ఎఫ్ఐఆర్', 'ఫిర్యాదు', 'తీసుకోలేదు', 'రాయలేదు', 'నిరాకరించారు', 'రిజిస్టర్ చేయలేదు', 'కేసు పెట్టలేదు', 'జీరో ఎఫ్ఐఆర్', 'fir rayaledu', 'complaint teesukoledhu',
      'एफआईआर', 'शिकायत', 'दर्ज नहीं', 'लिख नहीं रहे', 'मना कर दिया', 'केस दर्ज नहीं', 'जीरो एफआईआर', 'fir nahi likhi'
    ],
    scenarioTag: 'REFUSAL TO REGISTER FIR',
    situationTitle: {
      en: 'Police refusing to register an FIR or complaint',
      hi: 'पुलिस द्वारा एफआईआर या शिकायत दर्ज करने से इनकार',
      te: 'పోలీసులు ఎఫ్ఐఆర్ లేదా ఫిర్యాదు నమోదు చేయకపోవడం'
    },
    primaryAssessment: {
      en: 'This appears to involve a refusal by police to register a First Information Report (FIR) for a reported offence.',
      hi: 'यह मामला संज्ञेय अपराध की सूचना मिलने पर पुलिस द्वारा प्राथमिकी (FIR) दर्ज न करने का प्रतीत होता है।',
      te: 'ఇది నేరం జరిగినప్పుడు పోలీసులు ఎఫ్ఐఆర్ (FIR) నమోదు చేయడానికి నిరాకరించిన సందర్భాన్ని సూచిస్తోంది.'
    },
    conciseExplanation: {
      en: 'Based on what you\'ve described, under the Supreme Court\'s ruling in Lalita Kumari v. Govt of UP and Section 173 of the BNSS, police are statutorily obligated to register an FIR when information discloses the commission of a cognizable offence. If an SHO refuses, the BNSS provides immediate statutory escalation to the Superintendent of Police and the Judicial Magistrate.',
      hi: 'आपके विवरण के अनुसार, सुप्रीम कोर्ट के ललिता कुमारी बनाम यूपी सरकार के फैसले और BNSS की धारा 173 के तहत, यदि सूचना संज्ञेय अपराध से जुड़ी है तो पुलिस एफआईआर दर्ज करने के लिए कानूनी रूप से बाध्य है। यदि थाना प्रभारी इनकार करता है, तो पुलिस अधीक्षक (SP) और मजिस्ट्रेट के समक्ष अपील का वैधानिक रास्ता मौजूद है।',
      te: 'మీరు తెలిపిన సమాచారం ప్రకారం, సుప్రీంకోర్టు లలితా కుమారి తీర్పు మరియు BNSS సెక్షన్ 173 ప్రకారం కాగ్నిజబుల్ నేరం జరిగినప్పుడు పోలీసులు ఎఫ్ఐఆర్ నమోదు చేయడం తప్పనిసరి. ఎస్‌హెచ్‌ఓ తిరస్కరిస్తే, ఎస్పీ (SP) మరియు జ్యుడీషియల్ మేజిస్ట్రేట్‌ను ఆశ్రయించే చట్టపరమైన మార్గాలు ఉన్నాయి.'
    },
    actions: {
      en: [
        { number: '01', title: 'Submit your signed complaint in writing', detail: 'Provide two copies of your written complaint. Request an official diary/acknowledgement receipt stamp.' },
        { number: '02', title: 'Request a Zero FIR if outside territorial jurisdiction', detail: 'Section 173(1) BNSS mandates that an FIR must be registered as a "Zero FIR" irrespective of territorial jurisdiction and transferred later.' },
        { number: '03', title: 'Send complaint to the Superintendent of Police (SP)', detail: 'Under Section 173(4) BNSS, send the substance of your complaint by registered post or verified electronic means to the District SP / DCP.' },
        { number: '04', title: 'Petition the Judicial Magistrate under Section 175(3)', detail: 'If the SP does not direct an investigation, you may approach the Judicial Magistrate under Section 175(3) BNSS (formerly Sec 156(3) CrPC).' },
        { number: '05', title: 'Preserve all proof of submission', detail: 'Keep postal receipts, speed post tracking records, and any video/audio documentation of the visit.' }
      ],
      hi: [
        { number: '01', title: 'लिखित में शिकायत प्रस्तुत करें', detail: 'शिकायत की दो प्रतियां दें और एक प्रति पर रिसीविंग मोहर या जीडी/डीडी नंबर की पावती अवश्य लें।' },
        { number: '02', title: 'जीरो एफआईआर (Zero FIR) की मांग करें', detail: 'BNSS की धारा 173(1) के अनुसार, यदि अपराध किसी अन्य क्षेत्र का है तब भी पुलिस तुरंत जीरो एफआईआर दर्ज करने के लिए बाध्य है।' },
        { number: '03', title: 'पुलिस अधीक्षक (SP) को पंजीकृत डाक से भेजें', detail: 'BNSS धारा 173(4) के तहत जिले के पुलिस अधीक्षक (SP/DCP) को लिखित शिकायत रजिस्टर्ड डाक द्वारा भेजें।' },
        { number: '04', title: 'मजिस्ट्रेट के समक्ष धारा 175(3) में याचिका दें', detail: 'यदि एसपी स्तर पर भी कार्रवाई न हो, तो BNSS 175(3) के तहत न्यायिक मजिस्ट्रेट को जांच के आदेश हेतु आवेदन करें।' },
        { number: '05', title: 'प्रस्तुति के सभी साक्ष्य सुरक्षित रखें', detail: 'डाक रसीदें, ट्रैकिंग नंबर और थाने जाने के प्रमाण सुरक्षित रखें।' }
      ],
      te: [
        { number: '01', title: 'రాతపూర్వకంగా ఫిర్యాదు ఇవ్వండి', detail: 'రెండు కాపీలలో ఫిర్యాదు ఇచ్చి, ఒక కాపీపై అక్నాలెడ్జ్‌మెంట్ స్టాంప్ లేదా జీడీ నంబర్ తీసుకోండి.' },
        { number: '02', title: 'జీరో ఎఫ్ఐఆర్ (Zero FIR) నమోదు చేయమని కోరండి', detail: 'BNSS సెక్షన్ 173(1) ప్రకారం పరిధి వేరైనా కూడా ఏ పోలీస్ స్టేషన్‌లోనైనా జీరో ఎఫ్ఐఆర్ నమోదు చేయాల్సిందే.' },
        { number: '03', title: 'జిల్లా ఎస్పీ (SP/DCP) గారికి రిజిస్టర్డ్ పోస్ట్ ద్వారా పంపండి', detail: 'BNSS సెక్షన్ 173(4) ప్రకారం ఎస్పీ గారికి లిఖితపూర్వకంగా పోస్ట్ లేదా ఇమెయిల్ ద్వారా ఫిర్యాదు పంపవచ్చు.' },
        { number: '04', title: 'మేజిస్ట్రేట్ కోర్టులో సెక్షన్ 175(3) కింద పిటిషన్ వేయండి', detail: 'ఎస్పీ నుండి స్పందన లేకపోతే, BNSS 175(3) కింద జ్యుడీషియల్ మేజిస్ట్రేట్ ద్వారా దర్యాప్తుకు ఆదేశాలు కోరవచ్చు.' },
        { number: '05', title: 'అన్ని రశీదులను భద్రపరచండి', detail: 'పోస్టల్ రశీదులు మరియు స్టేషన్‌కు వెళ్లిన ఆధారాలను జాగ్రత్తగా ఉంచండి.' }
      ]
    },
    sayThis: {
      english: '“Officer, under Section 173 of the BNSS and the Supreme Court’s Lalita Kumari guidelines, a cognizable complaint must be registered as an FIR. If jurisdiction is an issue, please register a Zero FIR.”',
      hindi: '“अधिकारी महोदय, BNSS धारा 173 और सुप्रीम कोर्ट के ललिता कुमारी दिशा-निर्देशों के अनुसार संज्ञेय अपराध पर एफआईआर दर्ज करना अनिवार्य है। यदि क्षेत्राधिकार की समस्या है तो कृपया जीरो एफआईआर दर्ज करें।”',
      telugu: '“అధికారి గారూ, BNSS సెక్షన్ 173 మరియు లలితా కుమారి సుప్రీంకోర్టు తీర్పు ప్రకారం కాగ్నిజబుల్ నేరానికి ఎఫ్ఐఆర్ నమోదు చేయడం తప్పనిసరి. పరిధి సమస్య ఉంటే దయచేసి జీరో ఎఫ్ఐఆర్ చేయండి.”'
    },
    legalContext: [
      {
        id: 'bnss-173',
        category: 'CRIMINAL PROCEDURE',
        badge: 'BNSS Sec 173',
        provision: 'Section 173, Bharatiya Nagarik Suraksha Sanhita, 2023',
        explanation: 'Mandatory registration of FIR upon disclosure of a cognizable offence, including electronic information and Zero FIR provisions.',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
        isVerified: true
      },
      {
        id: 'sc-lalita-kumari',
        category: 'LANDMARK JUDGMENT',
        badge: 'Lalita Kumari (2014)',
        provision: 'Lalita Kumari v. Govt. of U.P. (Supreme Court Constitutional Bench)',
        explanation: 'Registration of FIR is mandatory if the information discloses commission of a cognizable offence and no preliminary inquiry is permissible in such cases.',
        sourceUrl: 'https://main.sci.gov.in/',
        isVerified: true
      },
      {
        id: 'bnss-175',
        category: 'JUDICIAL REMEDY',
        badge: 'BNSS Sec 175(3)',
        provision: 'Section 175(3), Bharatiya Nagarik Suraksha Sanhita, 2023',
        explanation: 'Power of the Judicial Magistrate to order investigation and registration of FIR upon police refusal.',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
        isVerified: true
      }
    ],
    followUp: {
      en: {
        id: 'fu-fir-1',
        question: 'Did you submit a physical written complaint and receive an acknowledgement receipt?',
        options: [
          { label: 'Yes, have written receipt', value: 'has_receipt' },
          { label: 'No, only spoke orally', value: 'oral_only' },
          { label: 'Refused to take written copy', value: 'refused_copy' }
        ]
      },
      hi: {
        id: 'fu-fir-1',
        question: 'क्या आपने लिखित शिकायत जमा की और पावती रसीद प्राप्त की?',
        options: [
          { label: 'हाँ, लिखित रसीद है', value: 'has_receipt' },
          { label: 'नहीं, केवल मौखिक बात हुई', value: 'oral_only' },
          { label: 'लिखित प्रति लेने से मना किया', value: 'refused_copy' }
        ]
      },
      te: {
        id: 'fu-fir-1',
        question: 'మీరు లిఖితపూర్వక ఫిర్యాదు ఇచ్చి రశీదు తీసుకున్నారా?',
        options: [
          { label: 'అవును, రశీదు ఉంది', value: 'has_receipt' },
          { label: 'లేదు, నోటి మాటతోనే చెప్పాను', value: 'oral_only' },
          { label: 'ఫిర్యాదు తీసుకోవడానికే నిరాకరించారు', value: 'refused_copy' }
        ]
      }
    },
    telemetry: {
      intent: 'FIR_REGISTRATION_REFUSAL',
      riskLevel: 'MEDIUM',
      governingAct: 'BNSS Sec 173 & 175(3)',
      statutoryConfidence: 'VERIFIED'
    }
  },

  // 4. PHONE OR HOME SEARCH
  {
    keywords: [
      'phone', 'mobile', 'search', 'searching', 'whatsapp', 'messages', 'photos', 'home', 'house', 'warrant', 'seize', 'confiscate', 'unlock', 'password',
      'ఫోన్', 'మొబైల్', 'వాట్సాప్', 'సోదా', 'తనిఖీ', 'లాక్కోవడం', 'పాస్‌వర్డ్', 'అన్‌లాక్', 'ఇల్లు', 'ఇంటిని', 'ఫోను', 'చాట్', 'ఫోన్ చూడాలి', 'ఫోన్ అన్‌లాక్',
      'फोन', 'मोबाइल', 'व्हाट्सएप', 'तलाशी', 'घर की तलाशी', 'पासवर्ड', 'अनलॉक', 'चैट', 'फोटो', 'जब्त'
    ],
    scenarioTag: 'SEARCH & DIGITAL PRIVACY',
    situationTitle: {
      en: 'Police demanding to search phone, messages, or home',
      hi: 'फोन, व्हाट्सएप या घर की तलाशी की मांग',
      te: 'ఫోన్, సందేశాలు లేదా ఇంటిని సోదా చేయడం'
    },
    primaryAssessment: {
      en: 'This appears to involve search and seizure of personal property, digital devices, or premises.',
      hi: 'यह मामला व्यक्तिगत संपत्ति, मोबाइल फोन, डिजिटल डेटा या घर की तलाशी व जब्ती का प्रतीत होता है।',
      te: 'ఇది వ్యక్తిగత పరికరాలు, మొబైల్ ఫోన్ లేదా నివాసాన్ని తనిఖీ మరియు స్వాధీనం చేసుకునే సందర్భాన్ని సూచిస్తోంది.'
    },
    conciseExplanation: {
      en: 'Based on what you\'ve described, Indian constitutional jurisprudence under K.S. Puttaswamy recognizes digital privacy as an intrinsic aspect of Article 21. Furthermore, Section 105 of the BNSS mandates that any search or seizure must be audio-video recorded, and an inventory seizure list must be prepared and provided to you with independent witnesses.',
      hi: 'आपके विवरण के अनुसार, सुप्रीम कोर्ट के पुट्टास्वामी फैसले के तहत निजता का अधिकार अनुच्छेद 21 का अभिन्न अंग है। इसके अतिरिक्त, BNSS की धारा 105 के तहत किसी भी तलाशी या जब्ती की ऑडियो-वीडियो रिकॉर्डिंग अनिवार्य है, और स्वतंत्र गवाहों के समक्ष जब्ती सूची (Seizure Memo) बनाकर आपको दी जानी चाहिए।',
      te: 'మీరు తెలిపిన ప్రకారం, సుప్రీంకోర్టు పుట్టస్వామి తీర్పు ద్వారా డిజిటల్ ప్రైవసీ ఆర్టికల్ 21 కింద ప్రాథమిక హక్కు. అంతేకాకుండా, BNSS సెక్షన్ 105 ప్రకారం ఏదైనా సోదా లేదా పరికరాల స్వాధీనం సమయంలో ఆడియో-వీడియో రికార్డింగ్ చేయడం మరియు స్వతంత్ర సాక్షుల సమక్షంలో సీజర్ మెమో ఇవ్వడం తప్పనిసరి.'
    },
    actions: {
      en: [
        { number: '01', title: 'Politely ask for the legal authorization or warrant', detail: 'Respectfully ask whether the officer holds a search warrant or has recorded statutory reasons for emergency search.' },
        { number: '02', title: 'Insist on audio-video recording under Section 105 BNSS', detail: 'The BNSS explicitly mandates that all search and seizure proceedings must be recorded through audio-video electronic means.' },
        { number: '03', title: 'Do not consent to arbitrary phone unlocking without formal procedure', detail: 'You are not obligated to casually hand over your phone unlocked at a routine checkpoint without lawful seizure and memo.' },
        { number: '04', title: 'Demand an official Seizure Memo (Panchnama)', detail: 'If any device or item is seized, insist on an immediate signed inventory detailing make, model, IMEI, and condition.' },
        { number: '05', title: 'Require independent local witnesses (Panchas)', detail: 'Search of premises must be conducted in the presence of two independent and respectable inhabitants of the locality.' }
      ],
      hi: [
        { number: '01', title: 'तलाशी वारंट या कानूनी अधिकार के बारे में पूछें', detail: 'आदरपूर्वक पूछें कि क्या अधिकारी के पास सर्च वारंट है या आपातकालीन तलाशी का वैधानिक कारण दर्ज किया गया है।' },
        { number: '02', title: 'BNSS धारा 105 के तहत वीडियोग्राफी की मांग करें', detail: 'नए कानून के तहत तलाशी व जब्ती की पूरी प्रक्रिया की ऑडियो-वीडियो रिकॉर्डिंग होना अनिवार्य है।' },
        { number: '03', title: 'बिना कानूनी प्रक्रिया के फोन अनलॉक करने से बचें', detail: 'सामान्य चेकिंग पर बिना औपचारिक जब्ती और मेमो के अपना निजी फोन अनलॉक करके सौंपना अनिवार्य नहीं है।' },
        { number: '04', title: 'जब्ती सूची (Seizure Memo) की हस्ताक्षरित प्रति मांगें', detail: 'यदि फोन जब्त किया जाता है तो तुरंत मेक, मॉडल, आईएमईआई नंबर युक्त रसीद प्राप्त करें।' },
        { number: '05', title: 'स्वतंत्र स्थानीय गवाहों (पंच) की उपस्थिति आवश्यक', detail: 'परिसर की तलाशी इलाके के दो स्वतंत्र और सम्मानित नागरिकों की मौजूदगी में ही होनी चाहिए।' }
      ],
      te: [
        { number: '01', title: 'సెర్చ్ వారెంట్ లేదా అధికార పత్రం అడగండి', detail: 'సోదా చేయడానికి వారెంట్ ఉందా లేదా ఎమర్జెన్సీ సోదాకు కారణాలు రికార్డు చేశారా అని మర్యాదగా అడగండి.' },
        { number: '02', title: 'BNSS సెక్షన్ 105 ప్రకారం వీడియో రికార్డింగ్ కోరండి', detail: 'కొత్త చట్టం ప్రకారం సోదా మరియు వస్తువులను స్వాధీనం చేసుకునే ప్రక్రియను ఆడియో-వీడియో రికార్డ్ చేయాలి.' },
        { number: '03', title: 'అధికారిక ప్రక్రియ లేకుండా ఫోన్ అన్‌లాక్ చేయవలసిన అవసరం లేదు', detail: 'సాధారణ తనిఖీల్లో సీజర్ మెమో లేకుండా వ్యక్తిగత ఫోన్ అన్‌లాక్ చేసి ఇవ్వాల్సిన చట్టపరమైన బాధ్యత లేదు.' },
        { number: '04', title: 'సీజర్ మెమో (స్వాధీన పత్రం) ఖచ్చితంగా తీసుకోండి', detail: 'ఫోన్ తీసుకుంటే మోడల్, ఐఎమ్‌ఈఐ నంబర్ రాసిన రశీదుపై అధికారి సంతకం తీసుకోవాలి.' },
        { number: '05', title: 'స్థానిక స్వతంత్ర సాక్షుల సమక్షంలోనే జరగాలి', detail: 'ఇంటి సోదా స్థానిక ప్రాంతానికి చెందిన ఇద్దరు స్వతంత్ర సాక్షుల సమక్షంలోనే జరగాలి.' }
      ]
    },
    sayThis: {
      english: '“Officer, under Section 105 of the BNSS, any search or seizure must be audio-video recorded, and a formal seizure list must be provided. Could you please provide the warrant or authorization?”',
      hindi: '“अधिकारी महोदय, BNSS की धारा 105 के तहत किसी भी तलाशी या जब्ती की वीडियोग्राफी अनिवार्य है और जब्ती सूची दी जानी चाहिए। क्या आप कृपया तलाशी का वैधानिक आधार बता सकते हैं?”',
      telugu: '“అధికారి గారూ, BNSS సెక్షన్ 105 ప్రకారం ఏదైనా సోదాకు ఆడియో-వీడియో రికార్డింగ్ మరియు సీజర్ మెమో ఇవ్వడం తప్పనిసరి. దయచేసి వారెంట్ లేదా చట్టపరమైన కారణాన్ని తెలపగలరా?”'
    },
    legalContext: [
      {
        id: 'bnss-105',
        category: 'CRIMINAL PROCEDURE',
        badge: 'BNSS Sec 105',
        provision: 'Section 105, Bharatiya Nagarik Suraksha Sanhita, 2023',
        explanation: 'Mandatory audio-video electronic recording of search and seizure of property and preparation of seizure list.',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
        isVerified: true
      },
      {
        id: 'sc-puttaswamy',
        category: 'CONSTITUTIONAL BENCH',
        badge: 'Puttaswamy (2017)',
        provision: 'K.S. Puttaswamy v. Union of India (Right to Privacy)',
        explanation: 'Constitutional protection of digital privacy and personal communication under Article 21.',
        sourceUrl: 'https://main.sci.gov.in/',
        isVerified: true
      },
      {
        id: 'bnss-100',
        category: 'SEARCH SAFEGUARDS',
        badge: 'BNSS Sec 100',
        provision: 'Section 100, Bharatiya Nagarik Suraksha Sanhita, 2023',
        explanation: 'Requirement of two independent and respectable inhabitants as witnesses during search of closed places.',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
        isVerified: true
      }
    ],
    followUp: {
      en: {
        id: 'fu-search-1',
        question: 'Are the police demanding to inspect your smartphone or searching physical premises?',
        options: [
          { label: 'Mobile phone / WhatsApp', value: 'phone' },
          { label: 'House / Physical premises', value: 'premises' },
          { label: 'Both phone and premises', value: 'both' }
        ]
      },
      hi: {
        id: 'fu-search-1',
        question: 'क्या पुलिस आपका मोबाइल फोन जांचना चाहती है या घर/परिसर की तलाशी ले रही है?',
        options: [
          { label: 'मोबाइल फोन / व्हाट्सएप', value: 'phone' },
          { label: 'घर / दुकान / परिसर', value: 'premises' },
          { label: 'दोनों (फोन और घर)', value: 'both' }
        ]
      },
      te: {
        id: 'fu-search-1',
        question: 'పోలీసులు మీ మొబైల్ ఫోన్‌ను అడుగుతున్నారా లేదా ఇల్లు/కార్యాలయాన్ని సోదా చేస్తున్నారా?',
        options: [
          { label: 'మొబైల్ ఫోన్ / వాట్సాప్', value: 'phone' },
          { label: 'ఇల్లు / భవనం', value: 'premises' },
          { label: 'రెండూ (ఫోన్ మరియు ఇల్లు)', value: 'both' }
        ]
      }
    },
    telemetry: {
      intent: 'SEARCH_AND_SEIZURE',
      riskLevel: 'MEDIUM',
      governingAct: 'BNSS Sec 100 & 105',
      statutoryConfidence: 'VERIFIED'
    }
  },

  // 5. BRIBE / CORRUPTION DEMAND
  {
    keywords: [
      'bribe', 'money', 'cash', 'extort', 'extortion', 'pay', 'paid', 'corrupt', 'corruption', 'demand', 'demanding', 'settlement', 'kharcha',
      'లంచం', 'డబ్బులు', 'పైసలు', 'డబ్బు', 'క్యాష్', 'అడుగుతున్నారు', 'డిమాండ్', 'ఖర్చు', 'lancham', 'dabbu adigaru', 'paise adugutunnaru',
      'रिश्वत', 'घूस', 'पैसे', 'पैसा', 'रुपये', 'कैश', 'मांग रहे', 'ले रहे', 'खर्चा', 'rishwat', 'ghoos', 'paise maange'
    ],
    scenarioTag: 'CORRUPTION & BRIBERY DEMAND',
    situationTitle: {
      en: 'Demanding a bribe or illegal gratification',
      hi: 'रिश्वत या अवैध धन की मांग',
      te: 'లంచం లేదా అక్రమ డబ్బు డిమాండ్ చేయడం'
    },
    primaryAssessment: {
      en: 'This appears to involve extortion, illegal gratification, or a bribe demand by a public servant.',
      hi: 'यह मामला लोक सेवक द्वारा अवैध रिश्वत, धन उगाही या भ्रष्टाचार की मांग का प्रतीत होता है।',
      te: 'ఇది ప్రభుత్వ అధికారి లంచం డిమాండ్ చేయడం లేదా అక్రమంగా డబ్బు వసూలు చేసే సందర్భాన్ని సూచిస్తోంది.'
    },
    conciseExplanation: {
      en: 'Based on what you\'ve described, demanding or soliciting illegal gratification by any public servant is a severe non-bailable offence under Section 7 of the Prevention of Corruption Act, 1988 (as amended). Furthermore, paying a bribe under coercion gives you statutory protection if reported to the Anti-Corruption Bureau (ACB) or Vigilance within 7 days.',
      hi: 'आपके विवरण के अनुसार, किसी भी लोक सेवक द्वारा रिश्वत मांगना भ्रष्टाचार निवारण अधिनियम, 1988 की धारा 7 के तहत एक गंभीर गैर-जमानती अपराध है। यदि दबाव में रिश्वत दी जाती है, तो 7 दिनों के भीतर भ्रष्टाचार निरोधक ब्यूरो (ACB) में रिपोर्ट करने पर कानून आपको सुरक्षा प्रदान करता है।',
      te: 'మీరు తెలిపిన ప్రకారం, అవినీతి నిరోధక చట్టం 1988 సెక్షన్ 7 కింద ప్రభుత్వ ఉద్యోగి లంచం అడగడం తీవ్రమైన నాన్-బెయిలబుల్ నేరం. ఒత్తిడితో లంచం ఇచ్చినప్పటికీ, 7 రోజుల్లోగా ఏసీబీ (ACB) లేదా విజిలెన్స్‌కు ఫిర్యాదు చేస్తే చట్టపరమైన రక్షణ లభిస్తుంది.'
    },
    actions: {
      en: [
        { number: '01', title: 'Do not pay the bribe voluntarily', detail: 'Politely refuse or seek time: "I need to arrange funds or consult my family." Never commit violence or make threats.' },
        { number: '02', title: 'Document names, designations, and specific amounts', detail: 'Note down the exact time, location, officer rank, vehicle number, and the exact monetary sum demanded.' },
        { number: '03', title: 'Call the National Anti-Corruption Helpline 1064', detail: 'Toll-free 1064 connects you immediately with State Anti-Corruption Bureau (ACB) officers who can lay a trap.' },
        { number: '04', title: 'Preserve electronic evidence carefully', detail: 'Save text messages, WhatsApp demands, or CCTV footage safely without editing or tampering.' },
        { number: '05', title: 'Utilize the 7-day statutory safe harbour', detail: 'Under Section 8 proviso of the PC Act, reporting coerced bribery to police/ACB within 7 days shields you from prosecution.' }
      ],
      hi: [
        { number: '01', title: 'स्वेच्छा से रिश्वत न दें', detail: 'विनम्रता से समय मांगें: "मुझे परिवार से बात करनी होगी या व्यवस्था करनी होगी।" उग्र न हों।' },
        { number: '02', title: 'अधिकारी का नाम, पद और मांगी गई रकम नोट करें', detail: 'तारीख, समय, पुलिस स्टेशन, वाहन नंबर और मांगी गई सही राशि सुरक्षित लिख लें।' },
        { number: '03', title: 'एंटी करप्शन हेल्पलाइन 1064 पर संपर्क करें', detail: 'टोल-फ्री नंबर 1064 पर राज्य के भ्रष्टाचार निरोधक ब्यूरो (ACB) से तुरंत सहायता व ट्रैप की सुविधा मिलती है।' },
        { number: '04', title: 'इलेक्ट्रॉनिक साक्ष्य सुरक्षित रखें', detail: 'कॉल रिकॉर्डिंग, व्हाट्सएप चैट या संदेशों को बिना छेड़छाड़ के बैकअप रखें।' },
        { number: '05', title: '7 दिन की कानूनी सुरक्षा का उपयोग करें', detail: 'भ्रष्टाचार निवारण अधिनियम की धारा 8 के तहत, दबाव में दिए गए पैसे की 7 दिन में रिपोर्ट करने पर नागरिक सुरक्षित रहता है।' }
      ],
      te: [
        { number: '01', title: 'స్వచ్ఛందంగా లంచం ఇవ్వకండి', detail: 'మర్యాదగా సమయం కోరండి: "నేను కుటుంబంతో మాట్లాడాలి లేదా డబ్బులు సమకూర్చుకోవాలి." ఉద్రిక్తతకు దిగకండి.' },
        { number: '02', title: 'అధికారి పేరు, హోదా మరియు అడిగిన మొత్తం నమోదు చేసుకోండి', detail: 'తేదీ, సమయం, స్టేషన్ మరియు అడిగిన నిర్దిష్ట మొత్తాన్ని భద్రంగా నోట్ చేసుకోండి.' },
        { number: '03', title: 'యాంటీ కరప్షన్ హెల్ప్‌లైన్ 1064 కు కాల్ చేయండి', detail: 'టోల్ ఫ్రీ 1064 ద్వారా రాష్ట్ర అవినీతి నిరోధక శాఖ (ACB) అధికారులకు సమాచారం ఇవ్వవచ్చు.' },
        { number: '04', title: 'ఎలక్ట్రానిక్ ఆధారాలను భద్రపరచండి', detail: 'మెసేజ్‌లు, వాట్సాప్ చాట్‌లు లేదా కాల్ రికార్డులను ఎడిట్ చేయకుండా దాచండి.' },
        { number: '05', title: '7 రోజుల చట్టపరమైన రక్షణ నిబంధనను వాడండి', detail: 'పీసీ యాక్ట్ సెక్షన్ 8 ప్రకారం, ఒత్తిడితో ఇచ్చిన లంచాన్ని 7 రోజుల్లోగా నివేదిస్తే ఫిర్యాదుదారునికి రక్షణ ఉంటుంది.' }
      ]
    },
    sayThis: {
      english: '“Officer, I respect the law and wish to proceed strictly by official receipt. Please issue a government challan or formal receipt for any payable fees.”',
      hindi: '“अधिकारी महोदय, मैं कानून का सम्मान करता हूँ और केवल सरकारी रसीद के साथ ही आगे बढ़ना चाहता हूँ। कृपया लागू शुल्क का आधिकारिक चालान जारी करें।”',
      telugu: '“అధికారి గారూ, నేను చట్టాన్ని గౌరవిస్తాను మరియు అధికారిక రశీదుతో మాత్రమే చెల్లింపు చేస్తాను. దయచేసి ప్రభుత్వ చలానా ఇవ్వండి.”'
    },
    legalContext: [
      {
        id: 'pc-act-7',
        category: 'ANTI-CORRUPTION STATUTE',
        badge: 'PC Act Sec 7',
        provision: 'Section 7, Prevention of Corruption Act, 1988 (as amended)',
        explanation: 'Offence relating to public servant being bribed or soliciting illegal gratification; punishable with imprisonment up to 7 years.',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
        isVerified: true
      },
      {
        id: 'pc-act-8',
        category: 'CITIZEN SAFEGUARD',
        badge: 'PC Act Sec 8 Proviso',
        provision: 'Section 8 Proviso, Prevention of Corruption Act, 1988',
        explanation: 'Statutory protection for citizens coerced into giving bribes who report the matter to law enforcement within 7 days.',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
        isVerified: true
      },
      {
        id: 'bns-2023',
        category: 'CRIMINAL CODE',
        badge: 'BNS Extortion Provisions',
        provision: 'Bharatiya Nyaya Sanhita, 2023',
        explanation: 'Extortion and public servant abusing position of trust is actionable under BNS criminal provisions.',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
        isVerified: true
      }
    ],
    followUp: {
      en: {
        id: 'fu-bribe-1',
        question: 'Has money already been handed over, or is it currently being demanded?',
        options: [
          { label: 'Demand is ongoing right now', value: 'ongoing_demand' },
          { label: 'Money was paid earlier', value: 'paid_earlier' },
          { label: 'Threatening false charges if not paid', value: 'false_charge_threat' }
        ]
      },
      hi: {
        id: 'fu-bribe-1',
        question: 'क्या पैसे पहले ही दिए जा चुके हैं या अभी मांगे जा रहे हैं?',
        options: [
          { label: 'अभी पैसे मांगे जा रहे हैं', value: 'ongoing_demand' },
          { label: 'पहले पैसे दे दिए गए हैं', value: 'paid_earlier' },
          { label: 'न देने पर झूठे केस की धमकी दे रहे हैं', value: 'false_charge_threat' }
        ]
      },
      te: {
        id: 'fu-bribe-1',
        question: 'డబ్బు ఇప్పటికే ఇచ్చారా లేదా ప్రస్తుతం డిమాండ్ చేస్తున్నారా?',
        options: [
          { label: 'ప్రస్తుతం డబ్బు డిమాండ్ చేస్తున్నారు', value: 'ongoing_demand' },
          { label: 'ఇంతకుముందే చెల్లించాను', value: 'paid_earlier' },
          { label: 'ఇవ్వకపోతే తప్పుడు కేసు పెడతామని బెదిరిస్తున్నారు', value: 'false_charge_threat' }
        ]
      }
    },
    telemetry: {
      intent: 'CORRUPTION_AND_EXTORTION',
      riskLevel: 'HIGH',
      governingAct: 'PC Act 1988 Sec 7 & 8',
      statutoryConfidence: 'VERIFIED'
    }
  },

  // 6. THREATS / CUSTODIAL VIOLENCE
  {
    keywords: [
      'threat', 'threatened', 'threatening', 'beat', 'beating', 'hit', 'violence', 'torture', 'slap', 'abuse', 'abusing', 'custodial', 'third degree', 'encounter',
      'కొట్టారు', 'దాడి', 'హింస', 'బెదిరింపు', 'కొట్టడం', 'చేయి చేసుకున్నారు', 'తిట్టారు', 'దౌర్జన్యం', 'ఎన్‌కౌంటర్', 'kottaru', 'bediristunnaru',
      'मारा', 'पीटा', 'मारपीट', 'धमकी', 'हिंसा', 'थप्पड़', 'गाली', 'टॉर्चर', 'हाथ उठाया', 'एनकाउंटर', 'mara', 'peeta', 'dhamki di'
    ],
    scenarioTag: 'CUSTODIAL VIOLENCE & THREATS',
    situationTitle: {
      en: 'Custodial violence, physical abuse, or threats',
      hi: 'हिरासत में हिंसा, मारपीट या धमकियां',
      te: 'కస్టడీలో హింస, దాడులు లేదా బెదిరింపులు'
    },
    primaryAssessment: {
      en: 'This appears to involve physical abuse, unlawful force, intimidation, or threats of violence by police personnel.',
      hi: 'यह मामला पुलिस कर्मियों द्वारा शारीरिक प्रताड़ना, अवैध बल प्रयोग या धमकी का प्रतीत होता है।',
      te: 'ఇది పోలీస్ సిబ్బంది శారీరక దాడి, అనుచిత బలం లేదా బెదిరింపులకు పాల్పడిన తీవ్ర సందర్భాన్ని సూచిస్తోంది.'
    },
    conciseExplanation: {
      en: 'Based on what you\'ve described, custodial violence and torture are abhorrent violations of fundamental rights under Article 21. The Supreme Court has repeatedly affirmed that police brutality carries zero immunity. Section 53 of the BNSS mandates immediate medical examination, and any injury must be reported directly to the Judicial Magistrate during the remand hearing.',
      hi: 'आपके विवरण के अनुसार, हिरासत में हिंसा व प्रताड़ना संविधान के अनुच्छेद 21 का घोर उल्लंघन है। सुप्रीम कोर्ट के स्पष्ट आदेश हैं कि पुलिस प्रताड़ना पर कोई प्रतिरक्षा नहीं मिलती। BNSS की धारा 53 के तहत तत्काल मेडिकल जांच अनिवार्य है और किसी भी चोट की शिकायत पहली पेशी पर मजिस्ट्रेट से की जानी चाहिए।',
      te: 'మీరు తెలిపిన ప్రకారం, కస్టడీలో హింస రాజ్యాంగంలోని ఆర్టికల్ 21 కు తీవ్ర ఉల్లంఘన. పోలీసుల హింసకు ఎటువంటి రక్షణ ఉండదని సుప్రీంకోర్టు స్పష్టం చేసింది. BNSS సెక్షన్ 53 ప్రకారం తక్షణ వైద్య పరీక్ష చేయించాలి మరియు రిమాండ్ సమయంలో మేజిస్ట్రేట్ దృష్టికి తీసుకురావాలి.'
    },
    actions: {
      en: [
        { number: '01', title: 'Demand an immediate independent medical examination', detail: 'Under Section 53 BNSS, insist on being examined by a government doctor and demand that every injury is recorded in the medical memo.' },
        { number: '02', title: 'Report abuse directly to the Judicial Magistrate', detail: 'When produced before the Magistrate within 24 hours, inform the judge immediately of any torture or threats. The Magistrate can order forensic evaluation.' },
        { number: '03', title: 'File a complaint before the Police Complaints Authority (PCA)', detail: 'State/District PCAs handle serious misconduct, grievous hurt, and custodial excesses independently of local police.' },
        { number: '04', title: 'Report to the National Human Rights Commission (NHRC)', detail: 'Call NHRC helpline 14433 or file an emergency online complaint on nhrc.nic.in for human rights violations.' },
        { number: '05', title: 'Connect with Free Legal Aid via NALSA 15100', detail: 'Eligible citizens and all individuals in custody have the right to free legal representation under the Legal Services Authorities Act.' }
      ],
      hi: [
        { number: '01', title: 'तत्काल सरकारी डॉक्टर से मेडिकल जांच की मांग करें', detail: 'BNSS धारा 53 के तहत डॉक्टर से जांच करवाएं और शरीर पर लगे प्रत्येक निशान को मेडिकल रिपोर्ट में दर्ज करवाएं।' },
        { number: '02', title: 'मजिस्ट्रेट के समक्ष सीधे शिकायत दर्ज कराएं', detail: '24 घंटे के भीतर जब मजिस्ट्रेट के सामने पेश किया जाए, तो बिना डरे जज को शारीरिक दुर्व्यवहार की जानकारी दें।' },
        { number: '03', title: 'पुलिस शिकायत प्राधिकरण (PCA) में शिकायत करें', detail: 'गंभीर दुर्व्यवहार और चोट के मामलों में राज्य पुलिस शिकायत प्राधिकरण स्वतंत्र जांच करता है।' },
        { number: '04', title: 'राष्ट्रीय मानवाधिकार आयोग (NHRC) हेल्पलाइन 14433', detail: 'हिरासत में हिंसा के विरुद्ध NHRC टोल-फ्री 14433 पर शिकायत दर्ज कराएं।' },
        { number: '05', title: 'नालसा (NALSA) 15100 से मुफ्त कानूनी सहायता लें', detail: 'हिरासत में मौजूद प्रत्येक नागरिक को विधिक सेवा प्राधिकरण अधिनियम के तहत मुफ्त वकील का अधिकार है।' }
      ],
      te: [
        { number: '01', title: 'తక్షణ స్వతంత్ర వైద్య పరీక్షను కోరండి', detail: 'BNSS సెక్షన్ 53 కింద ప్రభుత్వ వైద్యుని ద్వారా పరీక్ష చేయించి ప్రతి గాయాన్ని మెడికల్ సర్టిఫికేట్‌లో నమోదు చేయించండి.' },
        { number: '02', title: 'మేజిస్ట్రేట్ ముందు నేరుగా తెలపండి', detail: '24 గంటల్లో మేజిస్ట్రేట్ ముందు హాజరుపరిచినప్పుడు ఎలాంటి భయం లేకుండా జరిగిన హింస గురించి జడ్జికి చెప్పండి.' },
        { number: '03', title: 'పోలీస్ కంప్లైంట్స్ అథారిటీ (PCA) లో ఫిర్యాదు చేయండి', detail: 'పోలీసుల దురుసు ప్రవర్తనపై రాష్ట్ర పోలీస్ కంప్లైంట్స్ అథారిటీలో నేరుగా ఫిర్యాదు చేయవచ్చు.' },
        { number: '04', title: 'జాతీయ మానవ హక్కుల కమిషన్ (NHRC) 14433 కు కాల్ చేయండి', detail: 'మానవ హక్కుల ఉల్లంఘనలపై ఎన్‌హెచ్‌ఆర్‌సీ టోల్ ఫ్రీ 14433 లో ఫిర్యాదు నమోదు చేయండి.' },
        { number: '05', title: 'నల్సా (NALSA) 15100 ద్వారా ఉచిత న్యాయ సహాయం పొందండి', detail: 'కస్టడీలో ఉన్న ప్రతి ఒక్కరికీ ఉచిత న్యాయవాది సహాయం పొందే రాజ్యాంగ హక్కు ఉంది.' }
      ]
    },
    sayThis: {
      english: '“Your Honour / Officer, I request an immediate medical examination under Section 53 of the BNSS and access to legal counsel under Section 38.”',
      hindi: '“महोदय, मैं BNSS की धारा 53 के तहत तत्काल मेडिकल जांच और धारा 38 के तहत अपने अधिवक्ता से मिलने की मांग करता हूँ।”',
      telugu: '“అధికారి గారూ, నేను BNSS సెక్షన్ 53 ప్రకారం తక్షణ వైద్య పరీక్షను మరియు సెక్షన్ 38 ప్రకారం నా న్యాయవాదిని సంప్రదించాలని కోరుతున్నాను.”'
    },
    legalContext: [
      {
        id: 'const-21-torture',
        category: 'CONSTITUTIONAL RIGHT',
        badge: 'Article 21 Protection',
        provision: 'Article 21, Constitution of India',
        explanation: 'Right to life and human dignity; custodial violence is unconstitutional and actionable under law.',
        sourceUrl: 'https://www.india.gov.in/my-government/constitution-india',
        isVerified: true
      },
      {
        id: 'bnss-53-med',
        category: 'STATUTORY SAFEGUARD',
        badge: 'BNSS Sec 53',
        provision: 'Section 53, Bharatiya Nagarik Suraksha Sanhita, 2023',
        explanation: 'Mandatory medical examination of arrested persons to identify and document any physical trauma.',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
        isVerified: true
      },
      {
        id: 'sc-dk-basu-custodial',
        category: 'LANDMARK PRECEDENT',
        badge: 'D.K. Basu v. State of WB',
        provision: 'Supreme Court Guidelines on Custodial Safeguards',
        explanation: 'Strict personal accountability and prosecution for police officers guilty of custodial atrocities.',
        sourceUrl: 'https://main.sci.gov.in/',
        isVerified: true
      }
    ],
    followUp: {
      en: {
        id: 'fu-violence-1',
        question: 'Are you or your loved one currently in physical custody or facing an immediate threat?',
        options: [
          { label: 'Yes, in custody right now', value: 'in_custody' },
          { label: 'Threatened with future harm', value: 'threatened' },
          { label: 'Incident already occurred', value: 'already_happened' }
        ]
      },
      hi: {
        id: 'fu-violence-1',
        question: 'क्या आप या आपका कोई परिजन अभी पुलिस हिरासत में है या तुरंत खतरे में है?',
        options: [
          { label: 'हाँ, अभी हिरासत में हैं', value: 'in_custody' },
          { label: 'भविष्य में नुकसान की धमकी है', value: 'threatened' },
          { label: 'घटना पहले घट चुकी है', value: 'already_happened' }
        ]
      },
      te: {
        id: 'fu-violence-1',
        question: 'మీరు లేదా మీ కుటుంబ సభ్యులు ప్రస్తుతం కస్టడీలో ఉన్నారా లేదా ప్రమాదంలో ఉన్నారా?',
        options: [
          { label: 'అవును, ప్రస్తుతం కస్టడీలో ఉన్నారు', value: 'in_custody' },
          { label: 'భవిష్యత్తులో హాని చేస్తామని బెదిరిస్తున్నారు', value: 'threatened' },
          { label: 'ఇంతకుముందే జరిగింది', value: 'already_happened' }
        ]
      }
    },
    telemetry: {
      intent: 'CUSTODIAL_VIOLENCE_AND_THREATS',
      riskLevel: 'CRITICAL',
      governingAct: 'Article 21 & BNSS Sec 53',
      statutoryConfidence: 'VERIFIED'
    }
  }
];

// Fallback general guidance for unclassified inquiries
function getGeneralGuidance(prompt: string, lang: Language): SituationKnowledge {
  return {
    keywords: [],
    scenarioTag: 'GENERAL POLICE & LEGAL INTERACTION',
    situationTitle: {
      en: 'General Police Inquiry or Procedure',
      hi: 'सामान्य पुलिस पूछताछ या कानूनी प्रक्रिया',
      te: 'సాధారణ పోలీస్ విచారణ లేదా చట్టపరమైన ప్రక్రియ'
    },
    primaryAssessment: {
      en: 'This appears to involve an inquiry regarding police procedures, legal rights, or interactions with law enforcement.',
      hi: 'यह मामला पुलिस प्रक्रियाओं, कानूनी अधिकारों या पुलिस से बातचीत के सामान्य मार्गदर्शन का प्रतीत होता है।',
      te: 'ఇది పోలీస్ నిబంధనలు, చట్టపరమైన హక్కులు లేదా అధికారిక విధానాలకు సంబంధించిన సాధారణ విచారణను సూచిస్తోంది.'
    },
    conciseExplanation: {
      en: 'Based on what you\'ve described, all police interactions in India are strictly governed by the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 and the Constitution of India. The exact legal position depends on the specific circumstances, but law enforcement must always act within statutory authority and respect personal dignity.',
      hi: 'आपके विवरण के अनुसार, भारत में पुलिस की सभी कार्रवाइयां भारतीय नागरिक सुरक्षा संहिता (BNSS), 2023 और भारतीय संविधान द्वारा निर्देशित होती हैं। वास्तविक कानूनी स्थिति परिस्थितियों पर निर्भर करती है, परंतु पुलिस का कानून के दायरे में रहकर मानवीय गरिमा का सम्मान करना अनिवार्य है।',
      te: 'మీరు తెలిపిన ప్రకారం, భారతదేశంలో పోలీసు చర్యలన్నీ భారతీయ నాగరిక్ సురక్ష సంహిత (BNSS), 2023 మరియు రాజ్యాంగం ప్రకారం జరగాలి. చట్టపరమైన స్థితి పరిస్థితులపై ఆధారపడి ఉంటుంది, అయితే పౌరుల గౌరవాన్ని కాపాడటం చట్టం ప్రకారం తప్పనిసరి.'
    },
    actions: {
      en: [
        { number: '01', title: 'Stay calm and verify official identity', detail: 'Ensure the interaction remains calm and ask respectfully for the officer\'s name, rank, and station.' },
        { number: '02', title: 'Clarify the exact statutory purpose', detail: 'Inquire politely whether there is an inquiry, formal notice under Section 35(3) BNSS, or routine verification.' },
        { number: '03', title: 'Maintain your right against self-incrimination', detail: 'Provide your truthful name and address, but remember Article 20(3) protects you from compelled admissions.' },
        { number: '04', title: 'Consult an advocate or legal aid if needed', detail: 'Contact NALSA toll-free legal aid helpline 15100 or an independent legal practitioner for dedicated advice.' }
      ],
      hi: [
        { number: '01', title: 'शांत रहें और पहचान सत्यापित करें', detail: 'बातचीत को शांत रखें और अधिकारी का नाम, पद और पुलिस स्टेशन का विवरण विनम्रता से पूछें।' },
        { number: '02', title: 'वैधानिक उद्देश्य को स्पष्ट करें', detail: 'आदरपूर्वक पूछें कि क्या यह सामान्य जांच है या BNSS की धारा 35(3) के तहत कोई औपचारिक नोटिस है।' },
        { number: '03', title: 'सच्चा परिचय दें पर आत्म-दोषारोपण से बचें', detail: 'सच्चा नाम और पता बताएं, लेकिन संविधान के अनुच्छेद 20(3) के अनुसार जबरन बयान देने से बचें।' },
        { number: '04', title: 'आवश्यकता पड़ने पर कानूनी सलाह लें', detail: 'नालसा टोल-फ्री 15100 या किसी योग्य अधिवक्ता से संपर्क कर अपनी स्थिति पर परामर्श प्राप्त करें।' }
      ],
      te: [
        { number: '01', title: 'శాంతంగా ఉండి అధికారి వివరాలు తెలుసుకోండి', detail: 'మర్యాదపూర్వకంగా అధికారి పేరు, హోదా మరియు పోలీస్ స్టేషన్ వివరాలను అడగండి.' },
        { number: '02', title: 'చట్టపరమైన కారణాన్ని స్పష్టం చేసుకోండి', detail: 'ఇది సాధారణ విచారణా లేదా BNSS సెక్షన్ 35(3) నోటీసా అనేది గౌరవంగా తెలుసుకోండి.' },
        { number: '03', title: 'నిజమైన వివరాలు చెప్పండి కానీ ఒత్తిడికి లొంగకండి', detail: 'నిజమైన పేరు, చిరునామా చెప్పండి, ఆర్టికల్ 20(3) ప్రకారం తప్పుడు అంగీకారాలకు దూరంగా ఉండండి.' },
        { number: '04', title: 'ఉచిత న్యాయ సహాయం కోసం 15100 కి కాల్ చేయండి', detail: 'నల్సా టోల్ ఫ్రీ 15100 లేదా నమ్మకమైన న్యాయవాదిని సంప్రదించి చట్టపరమైన సలహా పొందండి.' }
      ]
    },
    sayThis: {
      english: '“Officer, could you please clarify the specific legal matter under inquiry, and provide a written notice under Section 35 of the BNSS if required?”',
      hindi: '“अधिकारी महोदय, क्या आप कृपया स्पष्ट कर सकते हैं कि यह किस मामले की जांच है, और यदि आवश्यक हो तो BNSS की धारा 35 के तहत लिखित नोटिस प्रदान करें?”',
      telugu: '“అధికారి గారూ, దయచేసి ఇది ఏ విచారణకు సంబంధించినదో తెలపగలరా, అవసరమైతే BNSS సెక్షన్ 35 ప్రకారం రాతపూర్వక నోటీస్ ఇవ్వగలరా?”'
    },
    legalContext: [
      {
        id: 'bnss-35-notice',
        category: 'CRIMINAL PROCEDURE',
        badge: 'BNSS Sec 35',
        provision: 'Section 35, Bharatiya Nagarik Suraksha Sanhita, 2023',
        explanation: 'Governs notice of appearance and conditions under which police may summon or restrain individuals.',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
        isVerified: true
      },
      {
        id: 'const-art-21',
        category: 'CONSTITUTION OF INDIA',
        badge: 'Article 21',
        provision: 'Article 21, Constitution of India',
        explanation: 'Protection of life and personal liberty; police action must be fair, just, and reasonable.',
        sourceUrl: 'https://www.india.gov.in/my-government/constitution-india',
        isVerified: true
      }
    ],
    followUp: {
      en: {
        id: 'fu-gen-1',
        question: 'Are you currently interacting with the police right now or preparing for an inquiry?',
        options: [
          { label: 'Yes, with police now', value: 'now' },
          { label: 'Preparing for an inquiry', value: 'preparing' },
          { label: 'Just seeking legal information', value: 'info' }
        ]
      },
      hi: {
        id: 'fu-gen-1',
        question: 'क्या आप अभी पुलिस से बातचीत कर रहे हैं या किसी जांच की तैयारी कर रहे हैं?',
        options: [
          { label: 'हाँ, अभी पुलिस के साथ हूँ', value: 'now' },
          { label: 'जांच या नोटिस की तैयारी', value: 'preparing' },
          { label: 'केवल सामान्य जानकारी चाहिए', value: 'info' }
        ]
      },
      te: {
        id: 'fu-gen-1',
        question: 'మీరు ప్రస్తుతం పోలీసులతో ఉన్నారా లేదా విచారణ కోసం సిద్ధమవుతున్నారా?',
        options: [
          { label: 'అవును, ప్రస్తుతం పోలీసులతో ఉన్నాను', value: 'now' },
          { label: 'విచారణకు సిద్ధమవుతున్నాను', value: 'preparing' },
          { label: 'కేవలం చట్టపరమైన సమాచారం కోసం', value: 'info' }
        ]
      }
    },
    telemetry: {
      intent: 'GENERAL_LEGAL_INQUIRY',
      riskLevel: 'LOW',
      governingAct: 'BNSS 2023 & Constitution',
      statutoryConfidence: 'VERIFIED'
    }
  };
}

export class AILegalService {
  /**
   * Evaluates user natural language prompt and synthesizes a calibrated, constitutional response
   */
  public static async analyzeSituation(prompt: string, language: Language = 'en'): Promise<AIResponseData> {
    const cleanPrompt = prompt.toLowerCase();

    // Match best situation from verified knowledge base
    let matchedSituation: SituationKnowledge | null = null;
    let highestScore = 0;

    for (const situation of KNOWLEDGE_BASE) {
      let score = 0;
      for (const keyword of situation.keywords) {
        if (cleanPrompt.includes(keyword)) {
          score += 1;
        }
      }
      if (score > highestScore) {
        highestScore = score;
        matchedSituation = situation;
      }
    }

    if (!matchedSituation || highestScore === 0) {
      matchedSituation = getGeneralGuidance(prompt, language);
    }

    const langKey = language === 'hi' ? 'hi' : language === 'te' ? 'te' : 'en';

    return {
      id: 'res-' + Date.now(),
      userPrompt: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      scenarioTag: matchedSituation.scenarioTag,
      situationTitle: matchedSituation.situationTitle[langKey],
      primaryAssessment: matchedSituation.primaryAssessment[langKey],
      conciseExplanation: matchedSituation.conciseExplanation[langKey],
      actions: matchedSituation.actions[langKey],
      sayThis: matchedSituation.sayThis,
      legalContext: matchedSituation.legalContext,
      followUp: matchedSituation.followUp[langKey],
      telemetry: matchedSituation.telemetry
    };
  }

  /**
   * Refines understanding based on user follow-up response
   */
  public static async handleFollowUpSelection(
    previousResponse: AIResponseData,
    optionValue: string,
    optionLabel: string,
    language: Language = 'en'
  ): Promise<ChatMessage> {
    const langKey = language === 'hi' ? 'hi' : language === 'te' ? 'te' : 'en';

    let content = '';
    if (optionValue.includes('yes') || optionValue.includes('current') || optionValue.includes('in_custody') || optionValue.includes('now')) {
      if (language === 'hi') {
        content = `समझ गया। चूंकि आप अभी भी पुलिस के साथ हैं, कृपया शांत रहें, अपने हाथों को दृश्यमान रखें और कोई भी आक्रामक कदम न उठाएं। अपना नाम और पता सच्चाई से बताएं, लेकिन धारा 47 और 35 के तहत अपने अधिकारों को शांत स्वर में दोहराएं। यदि आप असुरक्षित महसूस कर रहे हैं तो तुरंत राष्ट्रीय आपातकालीन नंबर 112 पर कॉल करें।`;
      } else if (language === 'te') {
        content = `అర్థమైంది. మీరు ప్రస్తుతం పోలీసులతో ఉన్నందున, దయచేసి శాంతంగా ఉండండి, చేతులు స్పష్టంగా కనిపించేలా ఉంచండి. మీ నిజమైన పేరు మరియు చిరునామా చెప్పండి, కానీ BNSS సెక్షన్ 47 మరియు 35 ప్రకారం మీ హక్కులను మర్యాదగా ప్రస్తావించండి. అత్యవసరమైతే 112 కి కాల్ చేయండి.`;
      } else {
        content = `Understood. Since you are currently with the police, your top priority is staying calm and ensuring physical safety. State your truthful identity, avoid arguing, and politely ask: “Officer, am I legally detained or am I free to go?” If you feel in immediate danger, remember you can call emergency 112.`;
      }
    } else if (optionValue.includes('no') || optionValue.includes('past') || optionValue.includes('already_happened')) {
      if (language === 'hi') {
        content = `नोट किया गया। चूंकि यह घटना पहले घट चुकी है, अब आप सुरक्षित स्थान पर हैं। अगला सही कदम सभी तारीखों, समय, नेमप्लेट और ऑडियो/वीडियो साक्ष्यों को सुरक्षित नोट करना और पुलिस अधीक्षक (SP) या पुलिस शिकायत प्राधिकरण (PCA) के समक्ष लिखित शिकायत दर्ज करना है।`;
      } else if (language === 'te') {
        content = `గమనించాను. ఈ సంఘటన ఇప్పటికే ముగిసినందున, మీరు ప్రస్తుతం సురక్షితంగా ఉన్నారు. తదుపరి ముఖ్యమైన చర్య తేదీలు, సమయాలు, పోలీసుల పేర్లు మరియు సాక్ష్యాలను భద్రపరచుకుని జిల్లా ఎస్పీ (SP) లేదా పోలీస్ కంప్లైంట్స్ అథారిటీ (PCA) కి లిఖితపూర్వక ఫిర్యాదు చేయడం.`;
      } else {
        content = `Noted. Since this incident occurred earlier, you are currently in a safer position. Your best next step is to document every detail in writing—date, time, location, officer names or vehicle numbers—and prepare a formal escalation to the District SP or the Police Complaints Authority (PCA).`;
      }
    } else {
      if (language === 'hi') {
        content = `स्पष्टता के लिए धन्यवाद। जब तक स्थिति पूरी तरह स्पष्ट न हो, हमेशा मानकर चलें कि आपके पास संविधान के अनुच्छेद 20(3) और 21 के तहत व्यक्तिगत स्वतंत्रता और वकील से मिलने का अधिकार है।`;
      } else if (language === 'te') {
        content = `స్పష్టతకు ధన్యవాదాలు. పరిస్థితి పూర్తిగా తెలియనంతవరకు, రాజ్యాంగంలోని ఆర్టికల్ 20(3) మరియు 21 ప్రకారం మీ వ్యక్తిగత హక్కులు మరియు న్యాయవాది సహాయం పొందే హక్కు ఎల్లప్పుడూ మీకు ఉంటాయని గుర్తుంచుకోండి.`;
      } else {
        content = `Thank you for clarifying. Whenever legal status is uncertain, always operate under the constitutional baseline: you cannot be compelled to self-incriminate (Article 20(3)), and any restraint on your physical freedom requires lawful statutory authority under the BNSS.`;
      }
    }

    return {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content
    };
  }

  /**
   * Fast, conversational AI legal consultation with accurate statutory citations
   * and complete tri-lingual (English, Hindi, Telugu) generation.
   */
  public static async getChatResponse(
    message: string,
    language: Language = 'en',
    _history: Array<{ role: 'user' | 'assistant'; content: string }> = []
  ): Promise<ChatResponseResult> {
    const cleanMessage = message.trim().toLowerCase();

    // Auto-detect native script or explicit romanized dialect
    const teluguCharCount = (cleanMessage.match(/[\u0C00-\u0C7F]/g) || []).length;
    const devanagariCharCount = (cleanMessage.match(/[\u0900-\u097F]/g) || []).length;

    // Check romanized markers if user speaks/types Tenglish or Hinglish
    const romanTelugu = [
      'nannu', 'aparu', 'chepparu', 'vellali', 'cheppaledu', 'em cheyali', 'poyindi', 'pettaru',
      'adigaru', 'vastanu', 'aagaru', 'annaru', 'ivvaledu', 'stationki', 'policeki', 'cheppali',
      'lancham', 'dabbu', 'dabbulu', 'kottaru', 'bediristunnaru', 'tagi', 'chesaru', 'adugutunnaru'
    ].some(kw => cleanMessage.includes(kw));

    const romanHindi = [
      'roka', 'kaha', 'nahi kiya', 'kya karun', 'thane', 'pucha', 'paise', 'batao',
      'giraftar', 'mujhe', 'le gaye', 'mang rahe', 'mana kiya', 'thaane', 'gadi', 'pakad liya',
      'rishwat', 'ghoos', 'mara', 'peeta', 'dhamki'
    ].some(kw => cleanMessage.includes(kw));

    let effectiveLang: Language = language;
    if (teluguCharCount >= 2 || (romanTelugu && language !== 'hi')) {
      effectiveLang = 'te';
    } else if (devanagariCharCount >= 2 || (romanHindi && language !== 'te')) {
      effectiveLang = 'hi';
    }

    // Helper to package response across all three languages
    const r = (
      translations: { en: string; hi: string; te: string },
      citations: string[],
      suggestionMap: { en: string[]; hi: string[]; te: string[] },
      sayThisFirst?: string
    ): ChatResponseResult => ({
      text: translations[effectiveLang] || translations.en,
      citations,
      suggestions: suggestionMap[effectiveLang] || suggestionMap.en,
      sayThisFirst,
      allTranslations: translations,
      allSuggestions: suggestionMap
    });

    // 1. Greetings & Introductory
    const isGreeting = ['hi', 'hello', 'hey', 'namaste', 'namaskaram', 'yo', 'halo', 'నమస్కారం', 'హలో', 'नमस्ते', 'प्रणाम'].some(g => cleanMessage.startsWith(g) || cleanMessage === g);
    if (isGreeting && cleanMessage.length < 25) {
      return r(
        {
          en: `Hello! I am **Nyaya Now**, your AI Legal First-Responder on Indian Law (BNSS 2023, BNS 2023 & Constitution of India).\n\nAre you in an active situation with police right now, or do you have a specific legal question?`,
          hi: `नमस्ते! मैं **न्याय नाउ** हूँ, भारतीय कानून (BNSS 2023, BNS 2023 एवं संविधान) पर आपका AI लीगल फर्स्ट-रेस्पॉन्डर।\n\nक्या आप अभी पुलिस के सामने हैं, या आपका कोई विशिष्ट कानूनी सवाल है?`,
          te: `నమస్కారం! నేను **న్యాయ నౌ**, భారతీయ చట్టాలు (BNSS 2023, BNS 2023 మరియు రాజ్యాంగం) ఆధారంగా పనిచేసే మీ AI న్యాయ సహాయకుడిని.\n\nమీరు ప్రస్తుతం పోలీసుల ఎదురుగా ఉన్నారా, లేదా ఏదైనా నిర్దిష్ట న్యాయపరమైన సందేహం ఉందా?`
        },
        ['Constitution of India Art. 21', 'BNSS 2023'],
        {
          en: ['Police stopped me on road', 'What is BNSS 2023?', 'My phone was stolen'],
          hi: ['पुलिस ने रास्ते में रोका', 'BNSS 2023 क्या है?', 'मेरा फोन चोरी हो गया'],
          te: ['పోలీసులు రోడ్డుపై ఆపారు', 'BNSS 2023 అంటే ఏమిటి?', 'నా ఫోన్ దొంగిలించబడింది']
        }
      );
    }

    // 2. WHAT IS BNSS 2023 / NEW CRIMINAL LAWS
    if (
      cleanMessage.includes('what is bnss') || cleanMessage.includes('bnss 2023') ||
      cleanMessage.includes('bharatiya nagarik suraksha') || cleanMessage.includes('new criminal law') ||
      cleanMessage.includes('new laws') || cleanMessage.includes('crpc vs bnss') ||
      cleanMessage.includes('బిఎన్ఎస్ఎస్') || cleanMessage.includes('కొత్త చట్టాలు') ||
      cleanMessage.includes('बीएनएसएस') || cleanMessage.includes('नए कानून')
    ) {
      return r(
        {
          en: `**Overview of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023:**\n\nThe BNSS 2023 replaced the Code of Criminal Procedure (CrPC), 1973 with effect from **1st July 2024** as India's governing procedural law for investigations, arrests, and bail.\n\n• **Notice Before Arrest (BNSS Sec 35(3))**: For offences punishable up to 7 years, arrest is not automatic. Police MUST issue a written Notice of Appearance specifying time and grounds.\n• **Zero FIR & e-FIR (BNSS Sec 173)**: Mandatory registration of FIR regardless of territorial jurisdiction, with digital filing recognized.\n• **Mandatory Electronic Evidence (BNSS Sec 105 & BSA Sec 63)**: Search and seizure operations require videography and hash value documentation to avoid tampering.\n• **Safeguards for Women (BNSS Sec 43(5))**: No woman can be arrested between sunset and sunrise without prior written order from a Judicial Magistrate.\n• **Arrest Notification (BNSS Sec 48 & 58)**: Designated family member must be informed immediately, and accused produced before Magistrate within 24 hours.`,
          hi: `**भारतीय नागरिक सुरक्षा संहिता (BNSS), 2023 का संक्षिप्त विवरण:**\n\nBNSS 2023 ने 1 जुलाई 2024 से दंड प्रक्रिया संहिता (CrPC 1973) का स्थान लिया है। यह आपराधिक जांच और नागरिक अधिकारों को नियंत्रित करता है।\n\n• **लिखित नोटिस की अनिवार्यता (धारा 35(3))**: 7 वर्ष से कम सजा वाले मामलों में गिरफ्तारी से पहले लिखित 'उपस्थिति नोटिस' देना अनिवार्य है।\n• **जीरो एफआईआर (धारा 173)**: क्षेत्राधिकार की परवाह किए बिना किसी भी थाने में जीरो एफआईआर दर्ज कराना अनिवार्य है।\n• **डिजिटल साक्ष्य और वीडियोग्राफी (धारा 105)**: तलाशी व जब्ती की वीडियोग्राफी और मोबाइल/डिवाइस का हैश वैल्यू दर्ज करना आवश्यक है।\n• **महिलाओं के अधिकार (धारा 43(5))**: सूर्यास्त के बाद और सूर्योदय से पहले महिला को मजिस्ट्रेट के आदेश के बिना गिरफ्तार नहीं किया जा सकता।\n• **24 घंटे में मजिस्ट्रेट पेशी (धारा 58)**: गिरफ्तारी के 24 घंटे के भीतर पेश करना कानूनी बाध्यता है।`,
          te: `**భారతీయ నాగరిక్ సురక్ష సంహిత (BNSS), 2023 పూర్తి వివరాలు:**\n\nBNSS 2023 చట్టం 1 జూలై 2024 నుండి పాత CrPC 1973 స్థానంలో అమలులోకి వచ్చింది.\n\n• **లిఖితపూర్వక నోటీస్ (సెక్షన్ 35(3))**: 7 ఏళ్ల లోపు శిక్ష ఉండే కేసులలో అరెస్ట్ చేయడానికి ముందు రాతపూర్వక నోటీస్ ఇవ్వడం తప్పనిసరి.\n• **జీరో ఎఫ్‌ఐఆర్ (సెక్షన్ 173)**: పరిధితో సంబంధం లేకుండా ఏదైనా స్టేషన్‌లో జీరో ఎఫ్‌ఐఆర్ నమోదు చేయవచ్చు.\n• **డిజిటల్ సాక్ష్యాల వీడియోగ్రఫీ (సెక్షన్ 105)**: తనిఖీలలో వీడియో రికార్డింగ్ మరియు హ్యాష్ విలువ నమోదు తప్పనిసరి.\n• **మహిళల రక్షణ (సెక్షన్ 43(5))**: సూర్యాస్తమయం తర్వాత మరియు సూర్యోదయానికి ముందు మేజిస్ట్రేట్ అనుమతి లేకుండా మహిళలను అరెస్ట్ చేయరాదు.\n• **24 గంటల్లో మేజిస్ట్రేట్ ఎదుట హాజరు (సెక్షన్ 58)**: అరెస్ట్ చేసిన 24 గంటలలోపు మేజిస్ట్రేట్ ముందు హాజరుపరచాలి.`
        },
        ['BNSS 2023 Sec 35, 43, 48, 58, 105, 173', 'Ministry of Home Affairs New Criminal Laws Portal', 'India Code (indiacode.nic.in)'],
        {
          en: ['What is Section 35(3) Notice?', 'Can police take me to station without notice?', 'What are my rights during road stop?'],
          hi: ['धारा 35(3) नोटिस क्या है?', 'क्या बिना नोटिस थाने ले जा सकते हैं?', 'सड़क पर रोके जाने पर क्या अधिकार हैं?'],
          te: ['సెక్షన్ 35(3) నోటీస్ అంటే ఏమిటి?', 'నోటీస్ లేకుండా స్టేషన్‌కి తీసుకెళ్లవచ్చా?', 'రోడ్డుపై ఆపినప్పుడు హక్కులేంటి?']
        }
      );
    }

    // 3. STATION SUMMONS / "ASKED ME TO COME TO THE STATION" / "POLICE STOPPED ME ON ROAD AND ASKED ME TO COME TO STATION"
    if (
      (cleanMessage.includes('station') || cleanMessage.includes('thaane') || cleanMessage.includes('స్టేషన్') || cleanMessage.includes('थाने') || cleanMessage.includes('summons')) &&
      (cleanMessage.includes('come') || cleanMessage.includes('asked') || cleanMessage.includes('call') || cleanMessage.includes('stopped') ||
       cleanMessage.includes('పిలిచారు') || cleanMessage.includes('రమ్మన్నారు') || cleanMessage.includes('बुलाया') || cleanMessage.includes('आने'))
    ) {
      return r(
        {
          en: `**Police cannot orally force you to accompany them to the police station without formal written notice:**\n\n• **BNSS Section 35(3) (Old CrPC 41A)**: For offences punishable up to 7 years, police MUST serve a written **Notice of Appearance** specifying the case, time, and place. Verbal commands or roadside intimidation have no legal force.\n• **Arnesh Kumar v. State of Bihar (SC)**: Supreme Court ruled arbitrary detention without Section 35 notice is illegal and officers face contempt.\n• **Right to Counsel (BNSS Sec 38 & Art 22(1))**: You have the right to be accompanied by your advocate.\n• **Verify Badge (BNSS Sec 36 / D.K. Basu)**: Check the officer's uniform nameplate and station tag.\n\n**Polite Response**: *"Officer, under BNSS Section 35(3), please issue me a formal written Notice of Appearance specifying the matter. I will duly appear along with my legal counsel."*`,
          hi: `**पुलिस मौखिक कहने या रास्ते में रोकने पर आपको जबरन थाने ले जाने के लिए बाध्य नहीं कर सकती:**\n\n• **BNSS धारा 35(3) (पूर्व CrPC 41A)**: 7 वर्ष से कम सजा वाले मामलों में लिखित **उपस्थिति नोटिस** (Notice of Appearance) देना अनिवार्य है। केवल मौखिक आदेश पर थाने जाने की कोई बाध्यता नहीं है।\n• **अर्णेश कुमार सुप्रीम कोर्ट फैसला**: बिना धारा 35 नोटिस के थाने बुलाना या हिरासत में रखना पूरी तरह अवैध है।\n• **वकील का अधिकार (अनुच्छेद 22(1) एवं धारा 38)**: आपको अपने वकील के साथ थाने जाने का पूरा अधिकार है।\n• **अधिकारी की पहचान (धारा 36)**: वर्दी पर स्पष्ट नेमप्लेट और थाने का बैज होना अनिवार्य है।\n\n**विनम्रता से कहें**: *"अधिकारी महोदय, BNSS धारा 35(3) के तहत कृपया मुझे लिखित नोटिस प्रदान करें। मैं अपने वकील के साथ विधिवत थाने में उपस्थित हो जाऊंगा।"*`,
          te: `**పోలీసులు లిఖితపూర్వక నోటీసు లేకుండా మిమ్మల్ని స్టేషన్‌కు రమ్మని బలవంతం చేయలేరు:**\n\n• **BNSS సెక్షన్ 35(3) (పాత CrPC 41A)**: 7 సంవత్సరాల లోపు శిక్ష ఉండే కేసులలో విచారణకు పిలవాలంటే తప్పనిసరిగా లిఖితపూర్వక **నోటీస్ ఆఫ్ అప్పియరెన్స్** ఇవ్వాలి. కేవలం మాటల మీద వెళ్లవలసిన అవసరం లేదు.\n• **అర్నేష్ కుమార్ సుప్రీం కోర్టు తీర్పు**: సరైన రాతపూర్వక నోటీసు లేకుండా స్టేషన్‌కు పిలవడం చట్టవిరుద్ధం.\n• **న్యాయవాది సహాయం (ఆర్టికల్ 22(1) & సెక్షన్ 38)**: మీ లాయర్‌ను వెంట తీసుకెళ్లే హక్కు మీకు ఉంది.\n• **అధికారి గుర్తింపు (సెక్షన్ 36)**: అధికారి నేమ్ బ్యాడ్జ్ మరియు పోలీస్ స్టేషన్ వివరాలు ఉండాలి.\n\n**స్పష్టంగా చెప్పండి**: *"అధికారి గారూ, BNSS సెక్షన్ 35(3) ప్రకారం దయచేసి నాకు లిఖితపూర్వక నోటీస్ ఇవ్వండి. నేను నా న్యాయవాదితో కలిసి స్టేషన్‌కు వస్తాను."*`
        },
        ['BNSS 2023 Sec 35(3) & 36', 'Arnesh Kumar v. State of Bihar (2014)', 'Constitution Art. 21 & 22(1)'],
        {
          en: ['Can I take my lawyer with me?', 'What if they refuse to give written notice?', 'Can they seize my vehicle?'],
          hi: ['क्या वकील साथ ले जा सकते हैं?', 'नोटिस देने से मना करें तो क्या करें?', 'क्या गाड़ी जब्त कर सकते हैं?'],
          te: ['లాయర్‌ను వెంట తీసుకెళ్లవచ్చా?', 'నోటీస్ ఇవ్వకపోతే ఏం చేయాలి?', 'వాహనం సీజ్ చేయవచ్చా?']
        },
        effectiveLang === 'te'
          ? '“అధికారి గారూ, BNSS సెక్షన్ 35(3) ప్రకారం నాకు లిఖితపూర్వక నోటీసు ఇవ్వండి, నేను లాయర్‌తో వస్తాను.”'
          : effectiveLang === 'hi'
          ? '“अधिकारी महोदय, BNSS धारा 35(3) के तहत कृपया मुझे लिखित नोटिस दें, मैं वकील के साथ आऊंगा।”'
          : '“Officer, under BNSS Section 35(3), please issue me a written notice specifying the inquiry; I will appear with my counsel.”'
      );
    }

    // 4. STOLEN PHONE / THEFT / SNATCHING / ROBBERY ON BUS OR ROAD
    if (
      cleanMessage.includes('stolen') || cleanMessage.includes('theft') || cleanMessage.includes('snatch') ||
      cleanMessage.includes('robbed') || cleanMessage.includes('chori') || cleanMessage.includes('loot') ||
      cleanMessage.includes('దొంగిలించబడింది') || cleanMessage.includes('దొంగతనం') || cleanMessage.includes('లాక్కున్నారు') ||
      cleanMessage.includes('चोरी') || cleanMessage.includes('छीन लिया') || cleanMessage.includes('लूट')
    ) {
      return r(
        {
          en: `**Immediate Legal & Practical Steps for a Stolen Mobile Phone:**\n\n• **Direct Legal Classification**: This is an offence of **theft under Section 303(2) of the Bharatiya Nyaya Sanhita (BNS), 2023** (or robbery/snatching under Section 309 BNS).\n• **1. Block SIM Immediately**: Call your telecom provider (Jio, Airtel, Vi, BSNL) to prevent financial fraud and OTP misuse.\n• **2. Block IMEI on CEIR ([ceir.gov.in](https://ceir.gov.in))**: Submit device details and police complaint copy on the Central Equipment Identity Register to blacklist the handset across Indian networks.\n• **3. Register Police FIR**: File a formal theft complaint at the nearest police station or via your State Police e-FIR portal. Under BNSS Section 173, registration of a cognizable offence FIR is mandatory.\n• **4. Remote Lock & Sign Out**: Use Google Find My Device (android.com/find) or Apple Find My (icloud.com/find) to lock the device and wipe data.\n• **5. Alert Your Bank**: Temporarily freeze UPI IDs and net banking accounts associated with that number.\n\n**Police Complaint Sample**: *"To SHO [Police Station]. Subject: Theft of phone [Brand/Model, IMEI: XXXXXXXXXXXXXXX] on [Date] at [Location/Bus]. Please register an FIR under Section 303 BNS and issue an acknowledged copy for CEIR blocking."*`,
          hi: `**मोबाइल फोन चोरी होने पर तत्काल कानूनी एवं व्यावहारिक कदम:**\n\n• **कानूनी स्थिति**: यह **भारतीय न्याय संहिता (BNS), 2023 की धारा 303(2) के तहत चोरी** का संज्ञेय अपराध है।\n• **1. सिम कार्ड तुरंत ब्लॉक करें**: बैंक ओटीपी और यूपीआई के दुरुपयोग से बचने के लिए टेलिकॉम कंपनी को कॉल कर सिम ब्लॉक कराएं।\n• **2. CEIR पोर्टल पर IMEI ब्लॉक करें**: भारत सरकार के **[ceir.gov.in](https://ceir.gov.in)** पोर्टल पर आईएमईआई नंबर ब्लॉक करें ताकि चोर फोन का उपयोग न कर सके।\n• **3. एफआईआर (FIR) दर्ज कराएं**: नजदीकी थाने में या राज्य पुलिस के ई-एफआईआर पोर्टल पर धारा 303 BNS में चोरी की एफआईआर दर्ज कराएं (BNSS धारा 173 में अनिवार्य)।\n• **4. रिमोट लॉक**: गूगल Find My Device या एप्पल Find My से फोन को लॉक करें।\n• **5. बैंक को सूचित करें**: बैंक से यूपीआई और नेट बैंकिंग को अस्थायी रूप से रोकने का अनुरोध करें।`,
          te: `**మొబైల్ ఫోన్ దొంగతనానికి గురైనప్పుడు వెంటనే చేయవలసిన చట్టపరమైన పనులు:**\n\n• **చట్టపరమైన స్థితి**: ఇది **భారతీయ న్యాయ సంహిత (BNS), 2023 సెక్షన్ 303(2) కింద దొంగతనం** నేరం.\n• **1. వెంటనే సిమ్ బ్లాక్ చేయండి**: బ్యాంక్ ఓటీపీలు దుర్వినియోగం కాకుండా టెలికాం ఆపరేటర్‌కు కాల్ చేసి సిమ్ బ్లాక్ చేయించండి.\n• **2. CEIR పోర్టల్‌లో IMEI బ్లాక్ చేయండి**: అధికారిక కేంద్ర ప్రభుత్వ పోర్టల్ **[ceir.gov.in](https://ceir.gov.in)** లో మొబైల్ IMEI ని దేశవ్యాప్తంగా బ్లాక్ చేయండి.\n• **3. పోలీస్ ఎఫ్‌ఐఆర్ నమోదు చేయండి**: సమీప పోలీస్ స్టేషన్‌లో లేదా ఆన్‌లైన్ పోర్టల్‌లో దొంగతనంపై ఎఫ్‌ఐఆర్ ఇవ్వండి. BNSS సెక్షన్ 173 ప్రకారం నమోదు తప్పనిసరి.\n• **4. రిమోట్ లాక్ చేయండి**: గూగుల్ Find My Device ద్వారా ఫోన్‌ను రిమోట్‌గా లాక్ చేసి అకౌంట్స్ లాగౌట్ చేయండి.\n• **5. బ్యాంకుకు తెలపండి**: యూపీఐ (UPI) లావాదేవీలను తాత్కాలికంగా నిలిపివేయండి.`
        },
        ['BNS 2023 Sec 303(2) & 309', 'BNSS 2023 Sec 173', 'CEIR Portal (ceir.gov.in)', 'DoT Telecom Security Guidelines'],
        {
          en: ['How to block IMEI on CEIR portal?', 'What if police refuse to file theft FIR?', 'How to get duplicate SIM card?'],
          hi: ['CEIR पर IMEI कैसे ब्लॉक करें?', 'अगर पुलिस एफआईआर दर्ज न करे तो?', 'डुप्लीकेट सिम कैसे लें?'],
          te: ['CEIR లో IMEI ఎలా బ్లాక్ చేయాలి?', 'ఎఫ్‌ఐఆర్ రాయకపోతే ఏం చేయాలి?', 'డూప్లికేట్ సిమ్ ఎలా పొందాలి?']
        }
      );
    }

    // 5. LOST PHONE / MISPLACED (DISTINCT FROM THEFT)
    if (
      (cleanMessage.includes('lost') || cleanMessage.includes('misplaced') || cleanMessage.includes('fell') ||
       cleanMessage.includes('kho gaya') || cleanMessage.includes('gum') || cleanMessage.includes('పోగొట్టుకున్నాను') ||
       cleanMessage.includes('పోయాయి') || cleanMessage.includes('పోయి') || cleanMessage.includes('खो गया')) &&
      !cleanMessage.includes('stolen') && !cleanMessage.includes('theft') && !cleanMessage.includes('chori')
    ) {
      return r(
        {
          en: `**Procedure for a Lost or Misplaced Mobile Phone (Lost Property vs Theft):**\n\n• **Classification**: Misplacing a phone is a **Lost Property / Non-Cognizable Incident**, not criminal theft. Do not file a false theft FIR.\n• **1. Locate Device**: Check Google Find My Device (android.com/find) or Apple Find My (icloud.com/find) to view the last location ping.\n• **2. Block SIM**: Request a temporary SIM block from your telecom operator.\n• **3. File Digital Lost Article Report**: Visit your State Police Citizen Portal/App (e.g. Delhi Police Lost Report, Karnataka KSP, UP COP, Telangana Police Portal). Lodge a "Lost Article Report" to receive an instant digitally signed Non-Cognizable Report (NCR) certificate.\n• **4. Block IMEI on CEIR ([ceir.gov.in](https://ceir.gov.in))**: Use the digital loss report receipt to blacklist the handset on the national CEIR portal.\n• **5. Duplicate SIM**: Show the official police loss receipt and Aadhaar card at your telecom store to get a duplicate SIM.`,
          hi: `**खोए हुए मोबाइल फोन के लिए आवश्यक कानूनी प्रक्रिया (Lost Property):**\n\n• **कानूनी अंतर**: फोन खो जाना 'खोई हुई संपत्ति' (Non-Cognizable) की श्रेणी में आता है, चोरी में नहीं। झूठी चोरी की एफआईआर न कराएं।\n• **1. लोकेशन ट्रैक करें**: गूगल Find My Device या एप्पल Find My से अंतिम लोकेशन देखें।\n• **2. सिम ब्लॉक करें**: टेलिकॉम कंपनी को कॉल करके तुरंत सिम ब्लॉक करवाएं।\n• **3. डिजिटल लॉस्ट रिपोर्ट दर्ज करें**: राज्य पुलिस की वेबसाइट या मोबाइल ऐप पर 'Lost Article Report' दर्ज करें और तुरंत डिजिटल पावती डाउनलोड करें।\n• **4. CEIR पोर्टल पर ब्लॉक करें**: [ceir.gov.in](https://ceir.gov.in) पर जाकर लॉस्ट रिपोर्ट के साथ IMEI ब्लॉक करें।\n• **5. नया सिम प्राप्त करें**: पुलिस पावती और आधार कार्ड लेकर टेलिकॉम स्टोर से नया सिम प्राप्त करें।`,
          te: `**ఫోన్ పోగొట్టుకున్నప్పుడు తీసుకోవలసిన చర్యలు (మిస్సింగ్ రిపోర్ట్):**\n\n• **ముఖ్యమైన తేడా**: ఫోన్ పోగొట్టుకోవడం అనేది 'లాస్ట్ ప్రాపర్టీ' కిందకు వస్తుంది, నేరం కిందకు రాదు. తప్పుడు దొంగతనం కేసు పెట్టవద్దు.\n• **1. లొకేషన్ తనిఖీ**: గూగుల్ Find My Device ద్వారా ఫోన్ ఎక్కడ ఉందో చూడండి.\n• **2. సిమ్ బ్లాక్**: టెలికాం ఆపరేటర్‌కు కాల్ చేసి సిమ్ బ్లాక్ చేయించండి.\n• **3. డిజిటల్ లాస్ట్ రిపోర్ట్ తీసుకోండి**: రాష్ట్ర పోలీస్ యాప్ లేదా వెబ్‌సైట్‌లో 'Lost Mobile Report' పెట్టి డిజిటల్ సర్టిఫికేట్ డౌన్‌లోడ్ చేసుకోండి.\n• **4. CEIR లో బ్లాక్ చేయండి**: [ceir.gov.in](https://ceir.gov.in) లో పోలీస్ రశీదుతో IMEI బ్లాక్ చేయండి.\n• **5. డూప్లికేట్ సిమ్ పొందండి**: పోలీస్ రశీదు మరియు ఆధార్‌తో కొత్త సిమ్ తీసుకోండి.`
        },
        ['BNSS 2023 Non-Cognizable Reporting', 'DoT CEIR Portal (ceir.gov.in)', 'State Police Citizen Portals'],
        {
          en: ['How to get duplicate SIM card?', 'Can CEIR trace my lost phone?', 'What if someone finds my phone?'],
          hi: ['डुप्लीकेट सिम कैसे प्राप्त करें?', 'क्या CEIR खोया फोन ढूंढ सकता है?', 'अगर किसी को फोन मिले तो?'],
          te: ['డూప్లికేట్ సిమ్ ఎలా తీసుకోవాలి?', 'CEIR ద్వారా ఫోన్ దొరుకుతుందా?', 'ఎవరికైనా ఫోన్ దొరికితే ఏం చేయాలి?']
        }
      );
    }

    // 6. ONLINE FRAUD / CYBER CRIME / UPI SCAM / APK SCAM
    if (
      cleanMessage.includes('fraud') || cleanMessage.includes('cyber') || cleanMessage.includes('scam') ||
      cleanMessage.includes('upi') || cleanMessage.includes('debited') || cleanMessage.includes('apk') ||
      cleanMessage.includes('otp') || cleanMessage.includes('phishing') || cleanMessage.includes('మోసం') ||
      cleanMessage.includes('సైబర్') || cleanMessage.includes('धोखा') || cleanMessage.includes('साइबर')
    ) {
      return r(
        {
          en: `**Emergency Actions for Online Financial Fraud & UPI Scams:**\n\n• **Act Inside the Golden Hour**: The first 2 to 3 hours are critical to freeze stolen money before fraudsters cash out through mule accounts.\n• **1. Dial 1930 Immediately**: Call the **National Cyber Crime Helpline (1930)** operated by the Indian Cyber Crime Coordination Centre (I4C). Provide UTR transaction ID, amount, bank name, and fraudulent UPI handle.\n• **2. File on [cybercrime.gov.in](https://cybercrime.gov.in)**: Register a formal incident on the National Cybercrime Reporting Portal.\n• **3. Contact Bank Fraud Desk**: Call your bank's 24x7 toll-free fraud helpline to block net banking, cards, and freeze beneficiary transfer.\n• **4. Preserve Evidence**: Take full screenshots of SMS, UPI receipts, WhatsApp chats, and fraudulent APK links.\n• **Applicable Law**: BNS 2023 Section 318(4) (Cheating) and IT Act 2000 Section 66D (Cheating by personation).`,
          hi: `**ऑनलाइन वित्तीय धोखाधड़ी एवं यूपीआई फ्रॉड पर तत्काल कार्रवाई:**\n\n• **गोल्डन ऑवर में कार्रवाई करें**: घटना के 2-3 घंटे के भीतर साइबर सेल और बैंक पैसे को फ्रीज (होल्ड) करवा सकते हैं।\n• **1. तुरंत 1930 पर कॉल करें**: भारत सरकार के **राष्ट्रीय साइबर हेल्पलाइन नंबर 1930** पर तुरंत कॉल करें और यूटीआर (UTR) नंबर व राशि दर्ज कराएं।\n• **2. cybercrime.gov.in पर रिपोर्ट करें**: आधिकारिक नेशनल साइबर क्राइम रिपोर्टिंग पोर्टल पर ऑनलाइन शिकायत दर्ज करें।\n• **3. बैंक फ्रॉड हेल्पडेस्क**: अपने बैंक को फोन करके संबंधित यूपीआई और कार्ड को ब्लॉक करवाएं और ट्रांजेक्शन फ्रीज करने का अनुरोध करें।\n• **4. सबूत सुरक्षित रखें**: बैंक एसएमएस, स्क्रीनशॉट, कॉल लॉग और चैट को डिलीट न करें।`,
          te: `**ఆన్‌లైన్ ఫైనాన్షియల్ ఫ్రాడ్ మరియు సైబర్ మోసాలపై అత్యవసర చర్యలు:**\n\n• **గోల్డెన్ అవర్ లో స్పందించండి**: మొదటి 2-3 గంటల్లో స్పందిస్తే మోసగాడి ఖాతాలోని నగదును హోల్డ్ (Freeze) చేయవచ్చు.\n• **1. వెంటనే 1930 కి కాల్ చేయండి**: భారత ప్రభుత్వ **జాతీయ సైబర్ హెల్ప్‌లైన్ 1930** కి వెంటనే కాల్ చేసి UTR నంబర్, తేదీ, మొత్తం వివరాలు ఇవ్వండి.\n• **2. cybercrime.gov.in లో రిపోర్ట్ చేయండి**: అధికారిక నేషనల్ సైబర్ క్రైమ్ పోర్టల్‌లో ఫిర్యాదు చేయండి.\n• **3. బ్యాంక్ కస్టమర్ కేర్**: మీ బ్యాంకుకు వెంటనే కాల్ చేసి యూపీఐ మరియు నెట్ బ్యాంకింగ్ లావాదేవీలను బ్లాక్ చేయించండి.\n• **4. సాక్ష్యాలను భద్రపరచండి**: ట్రాన్సాక్షన్ మెసేజ్‌లు, వాట్సాప్ చాట్‌లు, స్క్రీన్‌షాట్‌లను భద్రపరచండి.`
        },
        ['BNS 2023 Sec 318(4)', 'IT Act 2000 Sec 66D', 'National Cyber Crime Helpline 1930', 'cybercrime.gov.in'],
        {
          en: ['What details does 1930 ask for?', 'How does cyber cell freeze money?', 'Can bank refund fraudulent UPI debit?'],
          hi: ['1930 पर क्या जानकारी देनी होती है?', 'साइबर सेल पैसे कैसे फ्रीज करता है?', 'क्या बैंक पैसे वापस कर सकता है?'],
          te: ['1930 లో ఏ వివరాలు అడుగుతారు?', 'సైబర్ సెల్ డబ్బులు ఎలా ఫ్రీజ్ చేస్తుంది?', 'బ్యాంకు నుండి డబ్బులు వాపస్ వస్తాయా?']
        }
      );
    }

    // 7. LANDLORD SECURITY DEPOSIT WITHHELD
    if (
      cleanMessage.includes('landlord') || cleanMessage.includes('security deposit') || cleanMessage.includes('deposit') ||
      cleanMessage.includes('tenant') || cleanMessage.includes('rent') || cleanMessage.includes('vacate') ||
      cleanMessage.includes('घर मालिक') || cleanMessage.includes('किराया') || cleanMessage.includes('ఇంటి ఓనర్') || cleanMessage.includes('డిపాజిట్')
    ) {
      return r(
        {
          en: `**Legal Rights Regarding Withheld Security Deposit by Landlord:**\n\n• **Direct Answer**: If you vacated adhering to the agreed notice period without causing structural damage beyond normal wear and tear, withholding your deposit is an unlawful breach of tenancy agreement.\n• **1. Collate Move-out Evidence**: Keep flat condition handover photos/videos, move-out confirmation chats, and rent payment receipts.\n• **2. Send Formal Legal Demand Notice**: Send a 15-day demand notice via Speed Post and Email.\n• **3. Civil Recovery Suit**: File a Summary Recovery Suit under **Order 37 of the Code of Civil Procedure (CPC)** or approach the Rent Authority under the Model Tenancy Act.\n• **4. Consumer Forum**: If rented through a broker, PG company, or property firm, file a grievance on **[consumerhelpline.gov.in](https://consumerhelpline.gov.in)**.\n\n**Demand Sample**: *"To [Landlord]. As per tenancy ended on [Date] with peaceful handover, ₹[Amount] security deposit remains unlawfully withheld. Please transfer within 15 days, failing which legal recovery proceedings under Order 37 CPC will be initiated."*`,
          hi: `**मकान मालिक द्वारा सिक्योरिटी डिपॉजिट रोकने पर कानूनी अधिकार:**\n\n• **सीधा उत्तर**: नोटिस पीरियड का पालन करते हुए घर खाली करने के बाद मकान मालिक कानूनी रूप से आपकी सिक्योरिटी डिपॉजिट नहीं रोक सकता।\n• **1. सबूत जुटाएं**: घर खाली करते समय की तस्वीरें, वीडियो, किराया रसीदें और चाबी सौंपने की चैट सुरक्षित रखें।\n• **2. 15 दिन का लीगल डिमांड नोटिस भेजें**: ईमेल और स्पीड पोस्ट से 15 दिनों में पैसे लौटाने का औपचारिक नोटिस भेजें।\n• **3. सिविल कोर्ट में समरी रिकवरी**: सीपीसी (CPC) के **ऑर्डर 37 के तहत समरी सूट** दायर करें या रेंट ट्रिब्यूनल में जाएं।\n• **4. उपभोक्ता आयोग**: यदि ब्रोकर या पीजी कंपनी के जरिए लिया था, तो राष्ट्रीय उपभोक्ता हेल्पलाइन ([consumerhelpline.gov.in](https://consumerhelpline.gov.in)) पर शिकायत करें।`,
          te: `**ఇంటి ఓనర్ సెక్యూరిటీ డిపాజిట్ ఇవ్వకపోతే మీ చట్టపరమైన హక్కులు:**\n\n• **స్పష్టమైన సమాధానం**: నోటీస్ పీరియడ్ నిబంధనలు పాటించి ఇంటిని ఖాళీ చేసినప్పుడు, ఓనర్ సెక్యూరిటీ డిపాజిట్‌ను నిలిపివేయడం చట్టవిరుద్ధం.\n• **1. సాక్ష్యాలు భద్రపరచండి**: ఇల్లు ఖాళీ చేసిన నాటి ఫోటోలు, వీడియోలు, రెంట్ రశీదులు భద్రపరచండి.\n• **2. 15 రోజుల లీగల్ నోటీస్ ఇవ్వండి**: స్పీడ్ పోస్ట్ మరియు ఈమెయిల్ ద్వారా డిపాజిట్ మొత్తాన్ని 15 రోజుల్లో తిరిగి ఇవ్వాలని నోటీస్ పంపండి.\n• **3. సివిల్ కోర్టు పిటిషన్**: CPC ఆర్డర్ 37 కింద రికవరీ పిటిషన్ వేయవచ్చు.\n• **4. కన్స్యూమర్ ఫోరమ్**: బ్రోకర్ లేదా పీజీ మేనేజ్‌మెంట్ ద్వారా తీసుకుంటే [consumerhelpline.gov.in](https://consumerhelpline.gov.in) లో ఫిర్యాదు చేయవచ్చు.`
        },
        ['Order 37 Code of Civil Procedure (Summary Recovery)', 'Model Tenancy Act 2021', 'Consumer Protection Act 2019', 'National Consumer Helpline (consumerhelpline.gov.in)'],
        {
          en: ['How to draft legal notice to landlord?', 'Can I complain to police about withheld deposit?', 'What is Order 37 CPC recovery?'],
          hi: ['मकान मालिक को लीगल नोटिस कैसे भेजें?', 'क्या पुलिस में शिकायत कर सकते हैं?', 'ऑर्डर 37 सीपीसी रिकवरी क्या है?'],
          te: ['ఓనర్‌కు లీగల్ నోటీస్ ఎలా పంపాలి?', 'పోలీసులకు ఫిర్యాదు చేయవచ్చా?', 'ఆర్డర్ 37 రికవరీ పిటిషన్ అంటే ఏమిటి?']
        }
      );
    }

    // 8. ARTICLE 21 / CONSTITUTIONAL RIGHTS
    if (
      cleanMessage.includes('article 21') || cleanMessage.includes('art 21') || cleanMessage.includes('right to life') ||
      cleanMessage.includes('ఆర్టికల్ 21') || cleanMessage.includes('अनुच्छेद 21')
    ) {
      return r(
        {
          en: `**Article 21 of the Constitution of India — Right to Life and Personal Liberty:**\n\n• **Core Constitutional Text**: *"No person shall be deprived of his life or personal liberty except according to procedure established by law."*\n• **Just, Fair & Reasonable Law**: In *Maneka Gandhi v. Union of India (1978)*, the Supreme Court held that procedural law must be non-arbitrary, fair, and just.\n• **Right to Privacy (Puttaswamy 2017)**: A 9-judge bench recognized privacy, including digital data and personal correspondence, as an intrinsic fundamental right under Article 21.\n• **Derived Rights**: Right to Free Legal Aid (*Hussainara Khatoon*), Right to Speedy Trial, Right against Custodial Torture (*Prem Shankar Shukla*), and Right to Clean Environment (*Subhash Kumar*).\n• **Applicability**: Applies to all individuals in India, citizens and non-citizens alike.`,
          hi: `**भारतीय संविधान का अनुच्छेद 21 — जीवन और व्यक्तिगत स्वतंत्रता का अधिकार:**\n\n• **मूल पाठ**: *"विधि द्वारा स्थापित प्रक्रिया के अतिरिक्त किसी भी व्यक्ति को उसके जीवन या दैहिक स्वतंत्रता से वंचित नहीं किया जाएगा।"*\n• **मेनका गांधी फैसला (1978)**: सुप्रीम कोर्ट ने तय किया कि कोई भी कानून निष्पक्ष, न्यायसंगत और गैर-मनमाना होना चाहिए।\n• **निजता का मौलिक अधिकार (पुट्टास्वामी 2017)**: 9 जजों की बेंच ने डिजिटल डेटा और व्यक्तिगत बातचीत की प्राइवेसी को अनुच्छेद 21 का अभिन्न अंग माना।\n• **शामिल अधिकार**: मुफ्त कानूनी सहायता का अधिकार, त्वरित सुनवाई (Speedy Trial) का अधिकार, और पुलिस प्रताड़ना से सुरक्षा।`,
          te: `**భారత రాజ్యాంగంలోని ఆర్టికల్ 21 — జీవించే హక్కు మరియు వ్యక్తిగత స్వేచ్ఛ:**\n\n• **రాజ్యాంగ నిబంధన**: *"చట్టం నిర్దేశించిన పద్ధతి ప్రకారం తప్ప, ఏ వ్యక్తి యొక్క ప్రాణాన్ని లేదా వ్యక్తిగత స్వేచ్ఛను హరించకూడదు."*\n• **మేనకా గాంధీ తీర్పు (1978)**: చట్టపరమైన విధానం న్యాయబద్ధంగా, నిష్పక్షపాతంగా ఉండాలని సుప్రీంకోర్టు స్పష్టం చేసింది.\n• **గోప్యతా హక్కు (పుట్టస్వామి 2017)**: వ్యక్తిగత గోప్యత ఆర్టికల్ 21 లో అంతర్భాగమని 9 మంది జడ్జిల ధర్మాసనం తీర్పు చెప్పింది.\n• **ఇతర హక్కులు**: ఉచిత న్యాయ సహాయం, సత్వర విచారణ, మరియు లాకప్ హింస నుండి రక్షణ.`
        },
        ['Constitution of India Art. 21', 'Maneka Gandhi v. Union of India (1978)', 'KS Puttaswamy v. Union of India (2017)', 'India Code (indiacode.nic.in)'],
        {
          en: ['What is the Puttaswamy Privacy judgment?', 'What is Maneka Gandhi case?', 'How to enforce Article 21 in High Court?'],
          hi: ['पुट्टास्वामी निजता फैसला क्या है?', 'मेनका गांधी केस क्या था?', 'हाईकोर्ट में अनुच्छेद 21 कैसे लागू कराएं?'],
          te: ['పుట్టస్వామి తీర్పు వివరాలేంటి?', 'మేనకా గాంధీ కేసు ప్రాముఖ్యత ఏమిటి?', 'హైకోర్టులో ఆర్టికల్ 21 ఎలా అమలు చేయాలి?']
        }
      );
    }

    // 9. POLICE SEIZED PHONE / CONFISCATED DEVICE
    if (
      (cleanMessage.includes('police') || cleanMessage.includes('officer') || cleanMessage.includes('పోలీసులు') || cleanMessage.includes('पुलिस')) &&
      (cleanMessage.includes('seized') || cleanMessage.includes('took') || cleanMessage.includes('confiscated') ||
       cleanMessage.includes('తీసుకున్నారు') || cleanMessage.includes('లాక్కున్నారు') || cleanMessage.includes('जब्त') || cleanMessage.includes('ले लिया'))
    ) {
      return r(
        {
          en: `**Statutory Safeguards Against Police Seizure of Mobile Phones:**\n\n• **BNSS Section 105 & Section 94**: Digital devices can only be seized under a formal judicial search warrant or documented Section 105 seizure memo.\n• **Mandatory Hash Value (BSA Sec 63)**: To prevent planting or tampering with digital evidence, police MUST generate and record the device's cryptographic Hash Value in the seizure memo.\n• **Two Independent Witnesses**: Seizure must occur in the presence of two independent local witnesses who sign the seizure list.\n• **Never Sign Blank Papers**: Verify that make, model, and physical condition are noted accurately.\n• **Application for Return**: Your advocate can apply under **BNSS Section 497 (Old CrPC 451/457)** before the Judicial Magistrate for interim return of your device.`,
          hi: `**पुलिस द्वारा मोबाइल फोन जब्त किए जाने पर कानूनी अधिकार:**\n\n• **BNSS धारा 105 एवं 94**: डिजिटल उपकरण की जब्ती केवल अदालती सर्च वारंट या औपचारिक जब्ती मेमो (Seizure Memo) के तहत ही हो सकती है।\n• **हैश वैल्यू (Hash Value) अनिवार्य**: BSA धारा 63 के तहत इलेक्ट्रॉनिक साक्ष्य से छेड़छाड़ रोकने के लिए फोन का हैश वैल्यू दर्ज करना अनिवार्य है।\n• **स्वतंत्र गवाह**: जब्ती पर दो स्वतंत्र स्थानीय गवाहों के हस्ताक्षर होने चाहिए।\n• **फोन वापसी की अर्जी**: मजिस्ट्रेट के समक्ष **BNSS धारा 497 (पूर्व CrPC 451/457)** के तहत फोन वापस पाने की अर्जी लगाई जा सकती है।`,
          te: `**మొబైల్ ఫోన్ సీజ్ చేసినప్పుడు మీ చట్టపరమైన హక్కులు:**\n\n• **BNSS సెక్షన్ 105 మరియు 94**: కోర్టు సెర్చ్ వారెంట్ లేదా లిఖితపూర్వక సీజర్ మెమో (Seizure Memo) లేకుండా ఫోన్ స్వాధీనం చేసుకోలేరు.\n• **హ్యాష్ వాల్యూ నమోదు (BSA సెక్షన్ 63)**: సాక్ష్యాలు తారుమారు కాకుండా ఉండేందుకు డివైస్ హ్యాష్ వేల్యూ నమోదు చేయాలి.\n• **ఇద్దరు సాక్షులు**: సీజింగ్ సమయంలో ఇద్దరు స్వతంత్ర వ్యక్తులు సాక్షులుగా సంతకం చేయాలి.\n• **ఫోన్ తిరిగి పొందడం**: మేజిస్ట్రేట్ కోర్టులో **BNSS సెక్షన్ 497** కింద పిటిషన్ వేసి మీ ఫోన్‌ను తిరిగి పొందవచ్చు.`
        },
        ['BNSS 2023 Sec 105 & Sec 94', 'BSA 2023 Sec 63 (Electronic Evidence)', 'BNSS 2023 Sec 497 (Return of Property)', 'Constitution Art. 20(3) & 21'],
        {
          en: ['What is a Hash Value in phone seizure?', 'How to apply for phone return under BNSS 497?', 'Can police inspect data without court warrant?'],
          hi: ['फोन जब्ती में हैश वैल्यू क्या है?', 'धारा 497 में फोन वापस कैसे लें?', 'क्या बिना वारंट डेटा देख सकते हैं?'],
          te: ['సీజర్ మెమోలో హ్యాష్ వాల్యూ అంటే ఏమిటి?', 'సెక్షన్ 497 కింద ఫోన్ ఎలా తిరిగి పొందాలి?', 'వారెంట్ లేకుండా డేటా చూడవచ్చా?']
        }
      );
    }

    // 10. UNLOCK PHONE / PASSCODE DEMAND / WHATSAPP CHECK
    if (
      cleanMessage.includes('unlock') || cleanMessage.includes('password') || cleanMessage.includes('passcode') ||
      cleanMessage.includes('fingerprint') || cleanMessage.includes('face id') || cleanMessage.includes('whatsapp') ||
      cleanMessage.includes('chats') || cleanMessage.includes('అన్‌లాక్') || cleanMessage.includes('పాస్‌వర్డ్') ||
      cleanMessage.includes('अनलॉक') || cleanMessage.includes('पासवर्ड')
    ) {
      return r(
        {
          en: `**Police cannot force you to unlock your personal phone or disclose passwords on the road:**\n\n• **Article 20(3) (Right Against Self-Incrimination)**: You cannot be compelled to provide passcodes or act as a witness against yourself.\n• **Article 21 (Puttaswamy 2017)**: Privacy is a Fundamental Right protecting personal electronic conversations.\n• **Judicial Order Required**: In *Virendra Khanna v. State of Karnataka (2021)*, courts held digital passcodes can only be required under specific magistrate authorization in formal investigations, not casual roadside checks.\n\n**Polite Response**: *"Officer, my phone contains private communications. Under Articles 20(3) and 21, I respectfully decline to unlock my device without a judicial warrant."*`,
          hi: `**पुलिस रास्ते में आपका मोबाइल फोन अनलॉक करने या पासवर्ड देने के लिए मजबूर नहीं कर सकती:**\n\n• **अनुच्छेद 20(3) (आत्म-दोषारोपण से संरक्षण)**: किसी भी नागरिक को अपने ही खिलाफ गवाह बनने या जबरन पासवर्ड साझा करने के लिए बाध्य नहीं किया जा सकता।\n• **अनुच्छेद 21 (पुट्टास्वामी फैसला)**: निजता (प्राइवेसी) आपका मौलिक अधिकार है।\n• **अदालती आदेश अनिवार्य**: वीरेंद्र खन्ना बनाम कर्नाटक राज्य मामले में कोर्ट ने स्पष्ट किया कि पासवर्ड की मांग केवल औपचारिक जांच में अदालत की अनुमति से हो सकती है।\n\n**विनम्रता से कहें**: *"अधिकारी महोदय, फोन में मेरा निजी डेटा है। बिना कोर्ट वारंट या धारा 105 जब्ती मेमो के मैं इसे अनलॉक करने के लिए बाध्य नहीं हूँ।"*`,
          te: `**రోడ్డుపై పోలీసులు మీ మొబైల్ ఫోన్ అన్‌లాక్ చేయాలని బలవంతం చేయకూడదు:**\n\n• **ఆర్టికల్ 20(3) (స్వీయ-నేరారోపణ వ్యతిరేక హక్కు)**: తనపై తానే సాక్ష్యం చెప్పుకోవాలని ఎవరినీ బలవంతం చేయరాదు. పాస్‌వర్డ్ ఇవ్వాలని ఒత్తిడి చేయడం చట్టవిరుద్ధం.\n• **ఆర్టికల్ 21 (పుట్టస్వామి తీర్పు)**: వ్యక్తిగత గోప్యత ప్రాథమిక హక్కు.\n• **కోర్టు వారెంట్ అవసరం**: అధికారిక దర్యాప్తులో మేజిస్ట్రేట్ అనుమతితో మాత్రమే డిజిటల్ పరికరాల పరిశీలన జరుగుతుంది.\n\n**స్పష్టంగా చెప్పండి**: *"అధికారి గారూ, నా ఫోన్‌లో వ్యక్తిగత వివరాలు ఉన్నాయి. కోర్టు సెర్చ్ వారెంట్ లేదా సెక్షన్ 105 మెమో లేకుండా చూపించడానికి నేను బాధ్యుడిని కాను."*`
        },
        ['Constitution of India Art. 20(3) & 21', 'KS Puttaswamy v. Union of India (2017)', 'Virendra Khanna v. State of Karnataka (2021)'],
        {
          en: ['Can they seize my phone if I refuse?', 'What if they threaten me?', 'How to file complaint against officer?'],
          hi: ['क्या वे फोन जब्त कर सकते हैं?', 'यदि धमकी दें तो क्या करें?', 'अधिकारी की शिकायत कैसे करें?'],
          te: ['ఫోన్ లాక్కుంటే ఏం చేయాలి?', 'బెదిరిస్తే ఎవరికి ఫిర్యాదు చేయాలి?', 'సీజర్ మెమో అంటే ఏమిటి?']
        },
        effectiveLang === 'te'
          ? '“అధికారి గారూ, సెర్చ్ వారెంట్ లేదా సెక్షన్ 105 సీజర్ మెమో లేకుండా నా ఫోన్ అన్‌లాక్ చేయలేను.”'
          : effectiveLang === 'hi'
          ? '“अधिकारी महोदय, बिना सर्च वारंट या धारा 105 जब्ती मेमो के मैं फोन अनलॉक करने के लिए बाध्य नहीं हूँ।”'
          : '“Officer, unless you possess a judicial search warrant or formal Section 105 seizure memo, I respectfully decline to unlock my device.”'
      );
    }

    // 11. Police stopped on road / Traffic check / Nakabandi / Vehicle inspection / Keys
    if (
      cleanMessage.includes('stop') || cleanMessage.includes('stopped') || cleanMessage.includes('road') ||
      cleanMessage.includes('checkpoint') || cleanMessage.includes('nakabandi') || cleanMessage.includes('pulled over') ||
      cleanMessage.includes('bike') || cleanMessage.includes('car') || cleanMessage.includes('license') || cleanMessage.includes('licence') ||
      cleanMessage.includes('key') || cleanMessage.includes('chabi') || cleanMessage.includes('challan') ||
      cleanMessage.includes('ఆపారు') || cleanMessage.includes('ఆపడం') || cleanMessage.includes('రోడ్డుపై') || cleanMessage.includes('రోడ్డు') ||
      cleanMessage.includes('తనిఖీ') || cleanMessage.includes('చెక్పోస్ట్') || cleanMessage.includes('బైక్') || cleanMessage.includes('కారు') ||
      cleanMessage.includes('లైసెన్స్') || cleanMessage.includes('కీలు') || cleanMessage.includes('తాళాలు') || cleanMessage.includes('చెకింగ్') ||
      cleanMessage.includes('रोका') || cleanMessage.includes('सड़क') || cleanMessage.includes('नाकाबंदी') || cleanMessage.includes('गाड़ी') ||
      cleanMessage.includes('लाइसेंस') || cleanMessage.includes('चाबी') || cleanMessage.includes('ट्रैफिक') || cleanMessage.includes('चेकिंग')
    ) {
      return r(
        {
          en: `**Your Statutory Rights During a Police Stop on the Road:**\n\n• **Identification Requirement (BNSS Sec 36 / D.K. Basu)**: Police officers stopping you must wear clear uniform name badges and station tags.\n• **Digital Documents Allowed**: Under Motor Vehicles Act Sec 130 and Rule 139 of CMVR, presenting your Driving License, RC, and Insurance via official DigiLocker or mParivahan has equal legal validity as physical documents.\n• **Keys Cannot Be Snatched**: Snatching keys from vehicle ignition is unauthorized under the Motor Vehicles Act.\n• **Notice Before Custody (BNSS Sec 35(3))**: Police cannot casually compel you to accompany them to the station for minor offenses without a formal written Notice of Appearance.\n\n**Polite Response**: *"Officer, I am cooperating. Could you please clarify if I am free to go or being detained, and allow me to present my digital documents on DigiLocker?"*`,
          hi: `**सड़क पर पुलिस द्वारा रोके जाने पर आपके कानूनी अधिकार:**\n\n• **अधिकारी की पहचान (BNSS धारा 36 / D.K. बासु)**: चेकिंग कर रहे पुलिस अधिकारी की वर्दी पर स्पष्ट नेमप्लेट और थाने का बैज होना अनिवार्य है।\n• **डिजिटल दस्तावेज मान्य हैं**: मोटर वाहन अधिनियम धारा 130 और CMVR नियम 139 के अनुसार, डिजिलॉकर (DigiLocker) या एम-परिवहन ऐप पर ड्राइविंग लाइसेंस व आरसी दिखाना पूरी तरह वैध है।\n• **चाबी नहीं छीन सकते**: गाड़ी से जबरन चाबी निकालना कानूनन वर्जित है।\n• **लिखित नोटिस की अनिवार्यता (BNSS धारा 35(3))**: 7 वर्ष से कम सजा वाले मामलों में बिना लिखित नोटिस (Notice of Appearance) के आपको थाने ले जाने के लिए मजबूर नहीं किया जा सकता।\n\n**विनम्रता से कहें**: *"अधिकारी महोदय, मैं पूरा सहयोग कर रहा हूँ। क्या मैं जाने के लिए स्वतंत्र हूँ? मैं डिजिलॉकर पर अपने वैध दस्तावेज दिखा रहा हूँ।"*`,
          te: `**రోడ్డుపై పోలీసులు ఆపినప్పుడు మీ చట్టపరమైన హక్కులు:**\n\n• **పోలీస్ అధికారి గుర్తింపు (BNSS సెక్షన్ 36 / డి.కె. బసు మార్గదర్శకాలు)**: తనిఖీ చేసే అధికారి యూనిఫాంపై స్పష్టమైన నేమ్ బ్యాడ్జ్ మరియు పోలీస్ స్టేషన్ వివరాలు ఉండాలి.\n• **డిజిటల్ పత్రాలు చెల్లుబాటు అవుతాయి**: మోటార్ వెహికల్ యాక్ట్ సెక్షన్ 130 మరియు CMVR రూల్ 139 ప్రకారం డిజిలాకర్ (DigiLocker) లేదా ఎం-పరివాహన్ ద్వారా డ్రైవింగ్ లైసెన్స్, ఆర్సీ చూపించడం పూర్తిగా చట్టబద్ధం.\n• **వాహనం కీలు లాక్కోరాదు**: బైక్ లేదా కారు తాళాలను అకారణంగా లాక్కోవడం చట్టవిరుద్ధం.\n• **నోటీసు నిబంధన (BNSS సెక్షన్ 35(3))**: 7 సంవత్సరాల లోపు శిక్ష ఉండే విషయాలలో లిఖితపూర్వక నోటీసు లేకుండా స్టేషన్‌కు బలవంతంగా రమ్మనరాదు.\n\n**స్పష్టంగా చెప్పండి**: *"అధికారి గారూ, నేను సహకరిస్తున్నాను. నేను డిజిలాకర్‌లో లైసెన్స్ చూపిస్తాను, నన్ను ఎందుకు ఆపారో స్పష్టం చేయగలరా?"*`
        },
        ['BNSS 2023 Sec 35(3) & 36', 'Motor Vehicles Act 1988 Sec 130', 'CMVR Rule 139 (DigiLocker)', 'D.K. Basu v. State of WB'],
        {
          en: ['Can police take my bike keys?', 'Is DigiLocker valid for police?', 'Can police take me to station without notice?'],
          hi: ['क्या पुलिस गाड़ी की चाबी निकाल सकती है?', 'क्या डिजिलॉकर पुलिस के लिए मान्य है?', 'क्या बिना नोटिस थाने ले जा सकते हैं?'],
          te: ['పోలీసులు బైక్ కీలు లాక్కోవచ్చా?', 'డిజిలాకర్ పత్రాలు పోలీసులు అంగీకరించాలా?', 'నోటీసు లేకుండా స్టేషన్‌కి తీసుకెళ్లవచ్చా?']
        },
        effectiveLang === 'te'
          ? '“అధికారి గారూ, నేను డిజిలాకర్‌లో పత్రాలు చూపిస్తాను, దయచేసి నేను వెళ్లవచ్చా లేదా చెప్పండి.”'
          : effectiveLang === 'hi'
          ? '“अधिकारी महोदय, मैं डिजिलॉकर में दस्तावेज दिखा रहा हूँ। क्या मैं जाने के लिए स्वतंत्र हूँ?”'
          : '“Officer, I am presenting my valid credentials on DigiLocker; please clarify if I am free to proceed.”'
      );
    }

    // 12. General fallback for phone
    if (
      cleanMessage.includes('phone') || cleanMessage.includes('mobile') ||
      cleanMessage.includes('ఫోన్') || cleanMessage.includes('మొబైల్') ||
      cleanMessage.includes('फोन') || cleanMessage.includes('मोबाइल')
    ) {
      return r(
        {
          en: `**Police cannot search your mobile phone or WhatsApp chats casually on the road.**\n\n• **Article 21 (Puttaswamy 2017)**: Privacy is a Fundamental Right.\n• **BNSS Section 94 & 105**: Digital devices can only be seized under a formal judicial search warrant or documented Section 105 seizure memo signed by witnesses.\n• **No self-incrimination**: Article 20(3) guarantees you cannot be compelled to unlock your device or provide passcodes without judicial order.\n\n**Polite Response**: *"Officer, my phone contains private communications. Unless you have a judicial search warrant or formal Section 105 seizure memo, I respectfully exercise my constitutional right to privacy under Article 21."*`,
          hi: `**पुलिस रास्ते में आपका मोबाइल फोन या व्हाट्सएप चैट चेक नहीं कर सकती।**\n\n• **अनुच्छेद 21 (पुट्टास्वामी फैसला)**: निजता (प्राइवेसी) आपका मौलिक अधिकार है।\n• **BNSS धारा 94/105**: किसी भी डिजिटल उपकरण की जब्ती केवल अदालती सर्च वारंट या दो गवाहों वाले जब्ती मेमो (Seizure Memo) के तहत ही हो सकती है।\n• **अनुच्छेद 20(3)**: आपको फोन अनलॉक करने या पासवर्ड देने के लिए जबरन मजबूर नहीं किया जा सकता।\n\n**विनम्रता से कहें**: *"अधिकारी महोदय, फोन में मेरा निजी डेटा है। बिना कोर्ट वारंट या धारा 105 जब्ती मेमो के मैं इसे दिखाने के लिए बाध्य नहीं हूँ।"*`,
          te: `**పోలీసులు రోడ్డుపై మీ మొబైల్ ఫోన్ లేదా వాట్సాప్ చాట్‌లను అకారణంగా చెక్ చేయకూడదు.**\n\n• **ఆర్టికల్ 21 (పుట్టస్వామి తీర్పు)**: వ్యక్తిగత గోప్యత ప్రాథమిక హక్కు.\n• **BNSS సెక్షన్ 94 మరియు 105**: కోర్టు సెర్చ్ వారెంట్ లేదా ఇద్దరు స్వతంత్ర సాక్షుల సంతకాలతో కూడిన సీజర్ మెమో (Seizure Memo) లేకుండా ఫోన్ స్వాధీనం చేసుకోలేరు.\n• **ఆర్టికల్ 20(3)**: కోర్టు ఆదేశాలు లేకుండా ఫోన్ పాస్‌వర్డ్ ఇవ్వాలని బలవంతం చేయరాదు.\n\n**స్పష్టంగా చెప్పండి**: *"అధికారి గారూ, నా ఫోన్‌లో వ్యక్తిగత వివరాలు ఉన్నాయి. కోర్టు సెర్చ్ వారెంట్ లేదా సెక్షన్ 105 మెమో లేకుండా చూపించడానికి నేను బాధ్యుడిని కాను."*`
        },
        ['Constitution Art. 20(3) & 21', 'BNSS 2023 Sec 94 & 105', 'KS Puttaswamy v. Union of India (2017)'],
        {
          en: ['Can they seize my phone?', 'What if they threaten me?', 'How to file complaint against officer?'],
          hi: ['क्या वे फोन जब्त कर सकते हैं?', 'यदि धमकी दें तो क्या करें?', 'अधिकारी की शिकायत कैसे करें?'],
          te: ['ఫోన్ లాక్కుంటే ఏం చేయాలి?', 'బెదిరిస్తే ఎవరికి ఫిర్యాదు చేయాలి?', 'సీజర్ మెమో అంటే ఏమిటి?']
        }
      );
    }

    // 13. Breathalyzer / Drunk and drive
    if (
      cleanMessage.includes('drink') || cleanMessage.includes('drunk') || cleanMessage.includes('breathalyzer') || cleanMessage.includes('daroo') || cleanMessage.includes('alcohol') ||
      cleanMessage.includes('తాగి') || cleanMessage.includes('డ్రంక్') || cleanMessage.includes('మద్యం') || cleanMessage.includes('బ్రీత్‌లైజర్') ||
      cleanMessage.includes('शराब') || cleanMessage.includes('ड्रिंक') || cleanMessage.includes('नशा') || cleanMessage.includes('ब्रीथलाइजर')
    ) {
      return r(
        {
          en: `**Rules for Breathalyzer & Drink and Drive Testing in India:**\n\n• **Motor Vehicles Act Sec 185**: Legal threshold is 30 mg alcohol per 100 ml blood. You have the legal right to see the digital reading on the device.\n• **Sterile Straw**: Officer must use a fresh, sealed, sanitized disposable straw in front of you.\n• **Medical Test (Sec 203 & 204)**: If arrested, you must be medically examined by a registered medical practitioner within 2 hours.\n• Keys cannot be snatched: Under MV Act Sec 130/207, seizure requires written acknowledgment on e-Challan.\n\n**Polite Response**: *"Officer, please use a fresh sealed mouthpiece. I am fully cooperating; kindly show me the zero calibrated display before test."*`,
          hi: `**ड्रिंक एंड ड्राइव और ब्रीथलाइजर टेस्ट के कानूनी नियम:**\n\n• **मोटर वाहन अधिनियम धारा 185**: कानूनी सीमा 30 मिग्रा अल्कोहल प्रति 100 मिली रक्त है। आपको मशीन पर डिजिटल रीडिंग देखने का पूरा अधिकार है।\n• **सील पैक स्ट्रॉ**: अधिकारी को आपके सामने सील बंद नया स्ट्रॉ लगाना आवश्यक है।\n• **मेडिकल जांच (धारा 203/204)**: गिरफ्तारी की स्थिति में 2 घंटे के भीतर अधिकृत डॉक्टर द्वारा मेडिकल जांच कराना अनिवार्य है।\n• चाबी नहीं छीन सकते: जब्ती पर ई-चालान रसीद देना अनिवार्य है।\n\n**विनम्रता से कहें**: *"अधिकारी महोदय, कृपया नया सील बंद माउथपीस लगाएं। मैं पूरा सहयोग कर रहा हूँ, कृपया शून्य रीडिंग दिखाएं।"*`,
          te: `**డ్రంక్ అండ్ డ్రైవ్ మరియు బ్రీత్‌లైజర్ టెస్ట్ నిబంధనలు:**\n\n• **మోటార్ వెహికల్ యాక్ట్ సెక్షన్ 185**: 100 మి.లీ రక్తంలో 30 మి.గ్రా కంటే ఎక్కువ ఆల్కహాల్ ఉంటేనే నేరం. డిజిటల్ రీడింగ్ చూసే హక్కు మీకు ఉంది.\n• **కొత్త స్ట్రా**: అధికారి మీ కళ్లముందే కొత్త సీల్డ్ స్ట్రాను ఉపయోగించాలి.\n• **వైద్య పరీక్ష (సెక్షన్ 203/204)**: అరెస్ట్ చేస్తే 2 గంటల్లోగా రిజిస్టర్డ్ డాక్టర్ ద్వారా రక్త పరీక్ష చేయించాలి.\n• బైక్ లేదా కారు తాళాలు బలవంతంగా లాక్కోకూడదు; అధికారిక రశీదు తప్పనిసరి.\n\n**స్పష్టంగా చెప్పండి**: *"అధికారి గారూ, దయచేసి కొత్త సీల్ చేసిన స్ట్రా ఉపయోగించండి. నేను సహకరిస్తాను, రీడింగ్ చూపించండి."*`
        },
        ['Motor Vehicles Act 1988 Sec 185, 203, 204', 'BNSS 2023 Sec 51'],
        {
          en: ['What if reading is false?', 'Can they impound vehicle?', 'How to pay challan in court?'],
          hi: ['अगर गलत रीडिंग आए तो?', 'क्या गाड़ी जब्त कर सकते हैं?', 'कोर्ट में चालान कैसे भरें?'],
          te: ['రీడింగ్ తప్పుగా వస్తే ఏం చేయాలి?', 'వాహనం సీజ్ చేయవచ్చా?', 'కోర్టులో చలానా ఎలా చెల్లించాలి?']
        },
        effectiveLang === 'te'
          ? '“అధికారి గారూ, దయచేసి కొత్త స్ట్రా వేసి జీరో రీడింగ్ చూపించండి.”'
          : effectiveLang === 'hi'
          ? '“अधिकारी महोदय, कृपया नया स्ट्रॉ लगाएं और शून्य कैलिब्रेशन दिखाएं।”'
          : '“Officer, please install a fresh sealed mouthpiece and display the zero reading.”'
      );
    }

    // 14. Woman rights / Arrest after sunset
    if (
      cleanMessage.includes('woman') || cleanMessage.includes('female') || cleanMessage.includes('girl') || cleanMessage.includes('lady') || cleanMessage.includes('mahila') ||
      cleanMessage.includes('మహిళ') || cleanMessage.includes('స్త్రీ') || cleanMessage.includes('ఆడవారు') || cleanMessage.includes('లేడీ') ||
      cleanMessage.includes('महिला') || cleanMessage.includes('लड़की') || cleanMessage.includes('औरत')
    ) {
      return r(
        {
          en: `**Special Protections for Women under Indian Criminal Law:**\n\n• **BNSS Section 43(5) (Old CrPC 46(4))**: No woman can be arrested after sunset and before sunrise, except under exceptional judicial permission obtained beforehand from Judicial Magistrate.\n• **Female Police Officer mandatory**: Arrest and physical search of a woman can ONLY be performed by a female police officer.\n• **BNSS Section 179**: Women, minors under 15, and senior citizens cannot be called to police station for questioning; questioning must take place at their residence.\n\n**Polite Response**: *"Officer, under BNSS Section 43(5), a woman cannot be arrested after sunset without prior Judicial Magistrate order, and a female officer must be present."*`,
          hi: `**भारतीय आपराधिक कानून के तहत महिलाओं के विशेष अधिकार:**\n\n• **BNSS धारा 43(5) (पूर्व CrPC 46(4))**: किसी भी महिला को सूर्यास्त के बाद और सूर्योदय से पहले गिरफ्तार नहीं किया जा सकता (न्यायिक मजिस्ट्रेट की पूर्व अनुमति के बिना)।\n• **महिला पुलिस अधिकारी अनिवार्य**: महिला की गिरफ्तारी या तलाशी केवल महिला पुलिस अधिकारी ही ले सकती है।\n• **BNSS धारा 179**: महिलाओं और 15 वर्ष से कम उम्र के बच्चों को पूछताछ के लिए थाने नहीं बुलाया जा सकता; पूछताछ उनके घर पर ही होगी।\n\n**विनम्रता से कहें**: *"अधिकारी महोदय, BNSS धारा 43(5) के तहत सूर्यास्त के बाद और बिना महिला अधिकारी के किसी महिला को हिरासत में नहीं लिया जा सकता।"*`,
          te: `**భారతీయ చట్టాల ప్రకారం మహిళల ప్రత్యేక హక్కులు:**\n\n• **BNSS సెక్షన్ 43(5) (పాత CrPC 46(4))**: సూర్యాస్తమయం తర్వాత మరియు సూర్యోదయానికి ముందు మహిళలను అరెస్ట్ చేయడం చట్టవిరుద్ధం (మేజిస్ట్రేట్ ముందస్తు అనుమతి తప్పనిసరి).\n• **మహిళా కానిస్టేబుల్ తప్పనిసరి**: మహిళను మహిళా పోలీస్ అధికారి మాత్రమే తాకవచ్చు లేదా అరెస్ట్ చేయవచ్చు.\n• **BNSS సెక్షన్ 179**: మహిళలను, 15 ఏళ్లలోపు పిల్లలను స్టేషన్‌కు పిలిపించరాదు; వారి ఇంటి వద్దే విచారించాలి.\n\n**స్పష్టంగా చెప్పండి**: *"అధికారి గారూ, BNSS సెక్షన్ 43(5) ప్రకారం సూర్యాస్తమయం తర్వాత మరియు మహిళా పోలీస్ లేకుండా మహిళను అదుపులోకి తీసుకోలేరు."*`
        },
        ['BNSS 2023 Sec 43(5) & 179', 'State of Maharashtra v. Christian Patil', 'Constitution Art. 21'],
        {
          en: ['Can male police search a woman?', 'What if emergency arrest?', 'How to contact National Commission for Women?'],
          hi: ['क्या पुरुष पुलिस महिला की तलाशी ले सकता है?', 'इमरजेंसी में क्या नियम हैं?', 'महिला आयोग से कैसे संपर्क करें?'],
          te: ['పురుష పోలీసులు మహిళలను తాకవచ్చా?', 'అత్యవసర అరెస్ట్ నిబంధనలేంటి?', 'మహిళా కమిషన్‌కు ఎలా ఫిర్యాదు చేయాలి?']
        },
        effectiveLang === 'te'
          ? '“అధికారి గారూ, BNSS సెక్షన్ 43(5) ప్రకారం మహిళా అధికారి లేకుండా నన్ను అదుపులోకి తీసుకోలేరు.”'
          : effectiveLang === 'hi'
          ? '“अधिकारी महोदय, BNSS धारा 43(5) के अनुसार महिला पुलिस के बिना मुझे हिरासत में नहीं लिया जा सकता।”'
          : '“Officer, under BNSS Section 43(5), a woman cannot be detained after sunset without a judicial order and female officer.”'
      );
    }

    // 15. FIR refused / Zero FIR
    if (
      cleanMessage.includes('fir') || cleanMessage.includes('complaint') || cleanMessage.includes('refused') ||
      cleanMessage.includes('ఎఫ్ఐఆర్') || cleanMessage.includes('ఫిర్యాదు') || cleanMessage.includes('నిరాకరణ') ||
      cleanMessage.includes('एफआईआर') || cleanMessage.includes('शिकायत') || cleanMessage.includes('दर्ज')
    ) {
      return r(
        {
          en: `**Right to Mandatory FIR Registration (Lalita Kumari SC Mandate):**\n\n• **BNSS Section 173 (Old CrPC 154)**: Police MUST register an FIR if information discloses a cognizable offence. Refusal is punishable under Section 199 BNS (jail up to 2 years).\n• **Zero FIR**: You can lodge a Zero FIR at ANY police station irrespective of territorial jurisdiction; they must transfer it to the concerned station.\n• **Escalation**: If SHO refuses, send the written complaint via Registered Post / Email to the District Superintendent of Police (SP) under BNSS Section 173(3) or file a private complaint under Section 175(3) before Magistrate.\n\n**Polite Response**: *"Officer, Lalita Kumari SC ruling makes registration of cognizable FIR mandatory. If jurisdiction is an issue, please register a Zero FIR and transfer the file."*`,
          hi: `**एफआईआर (FIR) दर्ज कराने का कानूनी अधिकार (ललिता कुमारी फैसला):**\n\n• **BNSS धारा 173 (पूर्व CrPC 154)**: संज्ञेय अपराध (Cognizable offence) में पुलिस को तुरंत एफआईआर दर्ज करना अनिवार्य है। मना करना BNS धारा 199 के तहत दंडनीय अपराध है।\n• **जीरो एफआईआर (Zero FIR)**: घटना कहीं भी घटी हो, आप किसी भी नजदीकी थाने में जीरो एफआईआर दर्ज करा सकते हैं।\n• **आगे की कार्रवाई**: SHO मना करे तो पुलिस अधीक्षक (SP) को धारा 173(3) के तहत डाक/ईमेल से शिकायत भेजें या मजिस्ट्रेट के पास धारा 175(3) में अर्जी लगाएं।\n\n**विनम्रता से कहें**: *"अधिकारी महोदय, सुप्रीम कोर्ट के आदेशानुसार संज्ञेय अपराध में एफआईआर अनिवार्य है। यदि क्षेत्र का मामला है तो कृपया जीरो एफआईआर दर्ज करें।"*`,
          te: `**ఎఫ్‌ఐఆర్ (FIR) నమోదు చేసుకునే చట్టబద్ధమైన హక్కు (లలితా కుమారి తీర్పు):**\n\n• **BNSS సెక్షన్ 173 (పాత CrPC 154)**: తీవ్రమైన నేరం (Cognizable offence) జరిగినప్పుడు పోలీసులు తప్పనిసరిగా ఎఫ్‌ఐఆర్ నమోదు చేయాలి. నిరాకరిస్తే BNS సెక్షన్ 199 ప్రకారం పోలీసులపై చర్యలు ఉంటాయి.\n• **జీరో ఎఫ్‌ఐఆర్ (Zero FIR)**: పరిధి (Jurisdiction) తో సంబంధం లేకుండా ఏదైనా స్టేషన్‌లో జీరో ఎఫ్‌ఐఆర్ ఇవ్వవచ్చు; వారే సరైన స్టేషన్‌కు బదిలీ చేస్తారు.\n• **పై అధికారులకు ఫిర్యాదు**: ఎస్ హెచ్ ఓ నిరాకరిస్తే జిల్లా ఎస్పీ (SP) కి BNSS సెక్షన్ 173(3) కింద రిజిస్టర్డ్ పోస్ట్ ద్వారా పంపవచ్చు.\n\n**స్పష్టంగా చెప్పండి**: *"అధికారి గారూ, సుప్రీం కోర్టు లలితా కుమారి తీర్పు ప్రకారం ఎఫ్‌ఐఆర్ నమోదు తప్పనిసరి. పరిధి సమస్య అయితే జీరో ఎఫ్‌ఐఆర్ నమోదు చేయండి."*`
        },
        ['BNSS 2023 Sec 173 & 175', 'Lalita Kumari v. Govt of UP (2014)', 'BNS 2023 Sec 199'],
        {
          en: ['How to send complaint to SP?', 'What is e-FIR under BNSS?', 'How to file complaint before Magistrate?'],
          hi: ['एसपी को शिकायत कैसे भेजें?', 'ई-एफआईआर कैसे दर्ज करें?', 'मजिस्ट्रेट के समक्ष अर्जी कैसे दें?'],
          te: ['ఎస్పీకి పోస్ట్ ద్వారా ఫిర్యాదు ఎలా చేయాలి?', 'ఈ-ఎఫ్‌ఐఆర్ నిబంధనలు ఏంటి?', 'మేజిస్ట్రేట్ కోర్టులో కేసు ఎలా వేయాలి?']
        },
        effectiveLang === 'te'
          ? '“అధికారి గారూ, చట్టప్రకారం నా ఫిర్యాదుపై జీరో ఎఫ్‌ఐఆర్ నమోదు చేసి రశీదు ఇవ్వండి.”'
          : effectiveLang === 'hi'
          ? '“अधिकारी महोदय, कृपया मेरी शिकायत पर जीरो एफआईआर दर्ज कर पावती प्रदान करें।”'
          : '“Officer, please register a Zero FIR under statutory duty and issue me the formal acknowledgment.”'
      );
    }

    // 16. Arrest / Custody / Bail
    if (
      cleanMessage.includes('arrest') || cleanMessage.includes('bail') || cleanMessage.includes('custody') || cleanMessage.includes('hawaalat') ||
      cleanMessage.includes('అరెస్ట్') || cleanMessage.includes('అరెస్టు') || cleanMessage.includes('బెయిల్') || cleanMessage.includes('కస్టడీ') ||
      cleanMessage.includes('गिरफ्तार') || cleanMessage.includes('जमानत') || cleanMessage.includes('हिरासत')
    ) {
      return r(
        {
          en: `**Constitutional & Statutory Safeguards upon Arrest in India:**\n\n• **Arrest Memo (BNSS Sec 36 / D.K. Basu)**: Arresting officer must prepare a written Arrest Memo signed by at least one family member/respectable neighbor.\n• **Information of Grounds (BNSS Sec 47 / Art 22(1))**: You must be informed of the exact charges and whether the offence is bailable or non-bailable.\n• **Right to Inform Family (BNSS Sec 48)**: Police must immediately inform one designated relative or friend.\n• **Right to Consult Advocate (BNSS Sec 38 / Art 22(1))**: You have the right to meet your advocate during interrogation.\n• **24-Hour Magistrate Production (BNSS Sec 58 / Art 22(2))**: You must be produced before the nearest Judicial Magistrate within 24 hours of arrest.\n\n**Polite Response**: *"Officer, under Article 22 and BNSS Section 36 & 48, please provide me with my written Arrest Memo and permit me to make my statutory phone call to family and counsel."*`,
          hi: `**गिरफ्तारी के समय संवैधानिक एवं कानूनी अधिकार (D.K. बासु दिशानिर्देश):**\n\n• **अरेस्ट मेमो (BNSS धारा 36)**: गिरफ्तारी का लिखित मेमो तैयार करना और परिवार या गवाह के हस्ताक्षर लेना अनिवार्य है।\n• **गिरफ्तारी का कारण (धारा 47 एवं अनुच्छेद 22(1))**: आरोप स्पष्ट बताना और यह बताना कि मामला जमानती है या गैर-जमानती, अनिवार्य है।\n• **परिवार को सूचना (धारा 48)**: आपके परिवार या मित्र को तुरंत सूचित करने का वैधानिक अधिकार है।\n• **वकील से परामर्श (धारा 38)**: पूछताछ के दौरान अपने वकील से मिलने का अधिकार है।\n• **24 घंटे में मजिस्ट्रेट पेशी (धारा 58 / अनुच्छेद 22(2))**: गिरफ्तारी के 24 घंटे के अंदर मजिस्ट्रेट के सामने पेश करना अनिवार्य है।\n\n**विनम्रता से कहें**: *"अधिकारी महोदय, BNSS धारा 36 और 48 के तहत मुझे अरेस्ट मेमो दें और परिवार तथा वकील से बात करने की अनुमति दें।"*`,
          te: `**అరెస్ట్ సమయంలో మీ రాజ్యాంగ మరియు చట్టబద్ధమైన హక్కులు (డి.కె. బసు మార్గదర్శకాలు):**\n\n• **అరెస్ట్ మెమో (BNSS సెక్షన్ 36)**: అరెస్ట్ వివరాలతో కూడిన లిఖితపూర్వక అ‌రెస్ట్ మెమో తయారు చేసి కుటుంబ సభ్యుడి సంతకం తీసుకోవాలి.\n• **కారణాలు తెలుసుకునే హక్కు (సెక్షన్ 47 & ఆర్టికల్ 22(1))**: ఏ నేరం కింద అరెస్ట్ చేశారో, అది బెయిలబుల్ కాదా స్పష్టంగా చెప్పాలి.\n• **కుటుంబానికి సమాచారం (సెక్షన్ 48)**: మీకు నచ్చిన బంధువు లేదా మిత్రుడికి వెంటనే సమాచారం అందించే హక్కు ఉంది.\n• **న్యాయవాదిని సంప్రదించే హక్కు (సెక్షన్ 38)**: విచారణ సమయంలో న్యాయవాదిని కలిసే హక్కు ఉంది.\n• **24 గంటల్లో మేజిస్ట్రేట్ ముందు హాజరు (సెక్షన్ 58)**: అరెస్ట్ చేసిన 24 గంటలలోపు మేజిస్ట్రేట్ ముందు ప్రవేశపెట్టాలి.\n\n**స్పష్టంగా చెప్పండి**: *"అధికారి గారూ, BNSS సెక్షన్ 36 ప్రకారం అ‌రెస్ట్ మెమో ఇవ్వండి మరియు నా కుటుంబ సభ్యుడికి, లాయర్‌కి ఫోన్ చేసుకునే అవకాశం ఇవ్వండి."*`
        },
        ['BNSS 2023 Sec 36, 47, 48, 58', 'Constitution Art. 21 & 22', 'D.K. Basu v. State of West Bengal (1997)'],
        {
          en: ['How to apply for regular bail?', 'What is anticipatory bail?', 'What if police do not produce within 24 hours?'],
          hi: ['जमानत की अर्जी कैसे लगाएं?', 'अग्रिम जमानत (Anticipatory bail) क्या है?', '24 घंटे में पेश न करें तो क्या करें?'],
          te: ['బెయిల్ పిటిషన్ ఎలా వేయాలి?', 'ముందస్తు బెయిల్ (Anticipatory Bail) అంటే ఏమిటి?', '24 గంటల్లో మేజిస్ట్రేట్ వద్దకు తీసుకెళ్లకపోతే?']
        },
        effectiveLang === 'te'
          ? '“అధికారి గారూ, BNSS సెక్షన్ 36 ప్రకారం అరెస్ట్ మెమో తయారు చేసి నా బంధువుకు సమాచారం ఇవ్వండి.”'
          : effectiveLang === 'hi'
          ? '“अधिकारी महोदय, कृपया BNSS धारा 36 के तहत अरेस्ट मेमो बनाएं और मुझे फोन करने दें।”'
          : '“Officer, under BNSS Section 36, please execute the Arrest Memo and notify my designated contact.”'
      );
    }

    // 17. Bribe / Extortion / Illegal Demands
    if (
      cleanMessage.includes('bribe') || cleanMessage.includes('ghoos') || cleanMessage.includes('rishwat') || cleanMessage.includes('paisa') || cleanMessage.includes('money') ||
      cleanMessage.includes('లంచం') || cleanMessage.includes('డబ్బులు') || cleanMessage.includes('డబ్బు') ||
      cleanMessage.includes('रिश्वत') || cleanMessage.includes('घूस')
    ) {
      return r(
        {
          en: `**Protection Against Police Extortion & Bribery:**\n\n• **Prevention of Corruption Act Sec 7**: Demanding undue advantage by public servant is punishable with 3 to 7 years imprisonment.\n• **Do NOT hand cash**: Never give unofficial cash to avoid challans; ask for digital payment via government portal (echallan.parivahan.gov.in).\n• **Reporting**: Lodge complaint with Anti-Corruption Bureau (ACB / CBI helpline 1064) or State Vigilance Commission.\n• Audio/video recording in public spaces while facing extortion is not illegal under Indian law.\n\n**Polite Response**: *"Officer, I prefer to pay all statutory dues exclusively through the government electronic challan receipt or court treasury."*`,
          hi: `**पुलिस रिश्वत और अवैध वसूली से बचाव:**\n\n• **भ्रष्टाचार निवारण अधिनियम धारा 7**: रिश्वत मांगना 3 से 7 साल की जेल की सजा वाला गंभीर अपराध है।\n• **नकद पैसे कभी न दें**: हमेशा सरकारी ई-चालान पोर्टल (echallan.parivahan.gov.in) पर डिजिटल रसीद मांगें।\n• **शिकायत दर्ज करें**: एंटी करप्शन ब्यूरो (ACB टोल फ्री 1064) या राज्य विजिलेंस को शिकायत करें।\n• सार्वजनिक स्थान पर भ्रष्टाचार का ऑडियो/वीडियो सबूत बनाना कानूनी रूप से वर्जित नहीं है।\n\n**विनम्रता से कहें**: *"अधिकारी महोदय, मैं किसी भी जुर्माने का भुगतान केवल अधिकृत सरकारी ई-चालान पोर्टल या कोर्ट में ही करूंगा।"*`,
          te: `**పోలీస్ లంచం మరియు అక్రమ వసూళ్లపై మీ రక్షణ:**\n\n• **అవినీతి నిరోధక చట్టం (PC Act) సెక్షన్ 7**: లంచం అడగడం లేదా తీసుకోవడం 3 నుండి 7 సంవత్సరాల జైలు శిక్ష పడే నేరం.\n• **నగదు చేతికి ఇవ్వకండి**: ఎట్టి పరిస్థితుల్లోనూ చేతికి నగదు ఇవ్వకండి; అధికారిక ప్రభుత్వ ఈ-చలానా (echallan.parivahan.gov.in) రశీదు మాత్రమే అడగండి.\n• **ఫిర్యాదు**: ఏసీబీ (ACB హెల్ప్‌లైన్ 1064) లేదా విజిలెన్స్‌కు నేరుగా ఫిర్యాదు చేయవచ్చు.\n• బహిరంగ ప్రదేశంలో అధికార దుర్వినియోగాన్ని రికార్డ్ చేయడం చట్టవిరుద్ధం కాదు.\n\n**స్పష్టంగా చెప్పండి**: *"అధికారి గారూ, నేను ఎలాంటి జరిమానా అయినా ప్రభుత్వం అధికారిక ఈ-చలానా రశీదు ద్వారా మాత్రమే చెల్లిస్తాను."*`
        },
        ['Prevention of Corruption Act 1988 Sec 7', 'BNS 2023 Sec 308 (Extortion)', 'IT Act 2000'],
        {
          en: ['How to report to ACB 1064?', 'Can police take offline cash?', 'How to contest fake challan?'],
          hi: ['एसीबी में 1064 पर शिकायत कैसे करें?', 'क्या पुलिस कैश ले सकती है?', 'फर्जी चालान को कैसे चुनौती दें?'],
          te: ['ఏసీబీ 1064 కు ఫిర్యాదు ఎలా చేయాలి?', 'నగదు జరిమానా చెల్లించవచ్చా?', 'తప్పుడు చలానాను ఎలా రద్దు చేసుకోవాలి?']
        },
        effectiveLang === 'te'
          ? '“అధికారి గారూ, నేను ప్రభుత్వం జారీ చేసిన అధికారిక ఈ-చలానా ద్వారా మాత్రమే చెల్లింపు చేస్తాను.”'
          : effectiveLang === 'hi'
          ? '“अधिकारी महोदय, मैं केवल अधिकृत सरकारी ई-चालान के माध्यम से ही भुगतान करूंगा।”'
          : '“Officer, I will make all statutory fine payments exclusively via official government digital challan.”'
      );
    }

    // 18. Physical Violence / Beating / Police Brutality
    if (
      cleanMessage.includes('beat') || cleanMessage.includes('hit') || cleanMessage.includes('slap') || cleanMessage.includes('violence') || cleanMessage.includes('kottaru') ||
      cleanMessage.includes('కొట్టారు') || cleanMessage.includes('దాడి') || cleanMessage.includes('హింస') ||
      cleanMessage.includes('मारा') || cleanMessage.includes('पीटा') || cleanMessage.includes('मारपीट')
    ) {
      return r(
        {
          en: `**Zero Tolerance for Custodial Assault & Physical Force:**\n\n• **Article 21**: Right to life and dignity prohibits police brutality. Supreme Court in Munshi Singh Gautam affirmed custodial assault is an abhorrent violation of law.\n• **Immediate Medical Examination (BNSS Sec 53)**: Demand immediate medical checkup by government medical officer and record all injury marks in the MLC (Medico-Legal Certificate).\n• **Inform Magistrate (BNSS Sec 58)**: When produced before Magistrate, tell the Judge directly on record about physical assault.\n• **Police Complaints Authority (PCA)**: File immediate inquiry petition before State Police Complaints Authority.\n\n**Polite Response**: *"Officer, using physical violence on an unarmed citizen is a direct violation of Article 21 and punishable under Bharatiya Nyaya Sanhita. I request immediate medical examination under BNSS Section 53."*`,
          hi: `**पुलिस हिंसा और मारपीट के खिलाफ तत्काल कानूनी कदम:**\n\n• **अनुच्छेद 21**: जीवन और गरिमा का अधिकार पुलिस मारपीट को पूरी तरह गैरकानूनी ठहराता है।\n• **तत्काल मेडिकल जांच (BNSS धारा 53)**: सरकारी डॉक्टर से तत्काल जांच की मांग करें और सभी चोटों को एमएलसी (MLC) रिपोर्ट में दर्ज करवाएं।\n• **मजिस्ट्रेट के सामने बयान (धारा 58)**: जब मजिस्ट्रेट के सामने पेश किया जाए, तो सीधे जज को पुलिस मारपीट के बारे में बताएं।\n• **पुलिस शिकायत प्राधिकरण (PCA)**: राज्य पुलिस शिकायत प्राधिकरण में शिकायत दर्ज करें।\n\n**विनम्रता से कहें**: *"अधिकारी महोदय, शारीरिक बल का प्रयोग अनुच्छेद 21 का उल्लंघन है। BNSS धारा 53 के तहत मेरी मेडिकल जांच कराई जाए।"*`,
          te: `**పోలీసుల శారీరక దాడి మరియు హింసపై అత్యవసర చర్యలు:**\n\n• **ఆర్టికల్ 21**: పౌరుడిపై శారీరక దాడి చేయడం లేదా కొట్టడం పూర్తిగా చట్టవిరుద్ధం.\n• **వెంటనే వైద్య పరీక్ష (BNSS సెక్షన్ 53)**: వెంటనే ప్రభుత్వ వైద్యుడి వద్ద మెడికో-లీగల్ సర్టిఫికేట్ (MLC) చేయించి గాయాల వివరాలను నమోదు చేయించాలని డిమాండ్ చేయండి.\n• **మేజిస్ట్రేట్‌కు తెలపడం**: మేజిస్ట్రేట్ ముందు హాజరుపరిచినప్పుడు పోలీసులు కొట్టారని జడ్జి గారికి నేరుగా స్పష్టంగా చెప్పండి.\n• **పోలీస్ కంప్లైంట్స్ అథారిటీ (PCA)**: జిల్లా లేదా రాష్ట్ర స్థాయి పోలీస్ కంప్లైంట్స్ అథారిటీలో ఫిర్యాదు చేయండి.\n\n**స్పష్టంగా చెప్పండి**: *"అధికారి గారూ, పౌరులపై దాడి చేయడం ఆర్టికల్ 21 ఉల్లంఘన. BNSS సెక్షన్ 53 ప్రకారం నాకు వైద్య పరీక్ష చేయించండి."*`
        },
        ['BNSS 2023 Sec 53', 'Constitution Art. 21', 'DK Basu v. State of WB', 'BNS 2023 Sec 115'],
        {
          en: ['How to request MLC in government hospital?', 'How to complain to Police Complaints Authority?', 'Can I complain to Human Rights Commission?'],
          hi: ['सरकारी अस्पताल में एमएलसी कैसे कराएं?', 'पुलिस शिकायत प्राधिकरण में कैसे जाएं?', 'मानवाधिकार आयोग में कैसे शिकायत करें?'],
          te: ['ప్రభుత్వ ఆసుపత్రిలో ఎమ్మెల్సీ (MLC) ఎలా చేయించాలి?', 'పోలీస్ కంప్లైంట్స్ అథారిటీకి ఎలా ఫిర్యాదు చేయాలి?', 'మానవ హక్కుల కమిషన్‌ను ఎలా ఆశ్రయించాలి?']
        },
        effectiveLang === 'te'
          ? '“అధికారి గారూ, BNSS సెక్షన్ 53 ప్రకారం నన్ను ప్రభుత్వ వైద్యుడి వద్దకు తీసుకెళ్లి పరీక్ష చేయించండి.”'
          : effectiveLang === 'hi'
          ? '“अधिकारी महोदय, BNSS धारा 53 के तहत तुरंत मेरी मेडिकल जांच कराई जाए।”'
          : '“Officer, under BNSS Section 53, I formally request immediate medical examination by a medical officer.”'
      );
    }

    // 19. General / Fallback Legal Query
    return r(
      {
        en: `**Legal Assessment & Citizen Rights Overview:**\n\n1. **Right to Know Grounds**: Under Constitution Article 22(1) and BNSS Section 47, any police action requires clear statutory cause.\n2. **Right to Legal Counsel**: Article 22(1) and BNSS Section 38 ensure you have the right to contact and consult an advocate of your choice.\n3. **Notice Requirement**: For offenses punishable up to 7 years, police must serve a Section 35(3) written notice before custodial action.\n4. **Emergency Assistance**: In case of immediate distress or extortion, call National Emergency 112.\n\n*Would you like detailed guidance on bail, traffic rules, FIR registration, or dealing with station notices?*`,
        hi: `**कानूनी मार्गदर्शन एवं नागरिक अधिकार सारांश:**\n\n1. **कारण जानने का अधिकार**: संविधान के अनुच्छेद 22(1) एवं BNSS धारा 47 के तहत पुलिस को कार्रवाई का स्पष्ट वैधानिक कारण बताना होगा।\n2. **वकील से परामर्श**: अनुच्छेद 22(1) और BNSS धारा 38 के तहत आपको अपनी पसंद के वकील से परामर्श लेने का अधिकार है।\n3. **लिखित नोटिस की अनिवार्यता**: 7 वर्ष तक की सजा वाले मामलों में BNSS धारा 35(3) का लिखित नोटिस अनिवार्य है।\n4. **आपातकालीन नंबर**: किसी भी तत्काल संकट में राष्ट्रीय आपातकालीन नंबर 112 पर संपर्क करें।\n\n*क्या आप जमानत, ट्रैफिक चालान, एफआईआर या नोटिस के बारे में और अधिक जानना चाहते हैं?*`,
        te: `**చట్టపరమైన మార్గదర్శకాలు మరియు పౌర హక్కుల సారాంశం:**\n\n1. **కారణాలు తెలుసుకునే హక్కు**: రాజ్యాంగంలోని ఆర్టికల్ 22(1) మరియు BNSS సెక్షన్ 47 ప్రకారం పోలీసులు చేసే ప్రతి చర్యకు చట్టబద్ధమైన కారణం చెప్పాలి.\n2. **న్యాయవాది సహాయం**: ఆర్టికల్ 22(1) మరియు BNSS సెక్షన్ 38 ప్రకారం మీకు నచ్చిన లాయర్‌ను సంప్రదించే హక్కు ఉంది.\n3. **లిఖితపూర్వక నోటీసు**: 7 సంవత్సరాల లోపు శిక్ష ఉండే నేరాలలో BNSS సెక్షన్ 35(3) నోటీసు లేకుండా స్టేషన్‌కు బలవంతంగా పిలవరాదు.\n4. **అత్యవసర సహాయం**: ఏదైనా ఆపదలో ఉంటే వెంటనే జాతీయ హెల్ప్‌లైన్ 112 కి కాల్ చేయండి.\n\n*మీకు బెయిల్, ట్రాఫిక్ చలానా, ఎఫ్‌ఐఆర్ లేదా పోలీస్ నోటీసుల గురించి మరింత సమాచారం కావాలా?*`
      },
      ['Constitution of India Art. 21 & 22', 'BNSS 2023 Sec 35, 47, 48'],
      {
        en: ['What to do if stopped by police?', 'How does bail work under BNSS?', 'Can I record police officers?'],
        hi: ['पुलिस रोके तो क्या करें?', 'BNSS में जमानत कैसे मिलती है?', 'क्या पुलिस की रिकॉर्डिंग कर सकते हैं?'],
        te: ['పోలీసులు ఆపితే ఏం చేయాలి?', 'BNSS లో బెయిల్ ఎలా వస్తుంది?', 'పోలీసులను ఫోన్‌లో రికార్డ్ చేయవచ్చా?']
      },
      effectiveLang === 'te'
        ? '“అధికారి గారూ, BNSS సెక్షన్ 47 ప్రకారం నన్ను ఎందుకు ఆపారో స్పష్టం చేయండి.”'
        : effectiveLang === 'hi'
        ? '“अधिकारी महोदय, BNSS धारा 47 के तहत कृपया कार्रवाई का कानूनी आधार स्पष्ट करें।”'
        : '“Officer, under BNSS Section 47, kindly clarify the statutory reason for this stop.”'
    );
  }
}

