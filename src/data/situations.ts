import { Situation } from '../types';

export const situations: Situation[] = [
  // 1. STOPPED & QUESTIONED
  {
    id: 'stopped-questioned',
    slug: 'stopped-questioned',
    icon: 'ShieldAlert',
    title: 'Police stopped or questioned me',
    shortDescription: 'What you can politely ask, your right to know officer identity, and when street questioning is lawful.',
    badgeText: 'Everyday Interaction',
    quick30SecSummary: [
      'Stay calm, polite, and keep hands visible — do not flee or make sudden movements.',
      'Politely ask for the officer’s name, designation, and police station if not displayed on their uniform.',
      'Ask calmly: "Officer, could you please tell me why I am being stopped, and whether I am free to leave?"',
      'Provide your truthful name and address during lawful duty, but you have the constitutional right against answering self-incriminating questions.',
      'If driving, produce required documents (DL/RC/Insurance) in physical or official DigiLocker/mParivahan format.'
    ],
    constitutionalProtection: {
      article: 'Article 20(3) & Article 21',
      title: 'Right against Self-Incrimination & Personal Liberty',
      plainExplanation: 'You cannot be compelled to be a witness against yourself or answer questions that incriminate you in an offence. Any restraint on your movement must be supported by statutory authority.',
      scopeAndExceptions: 'While you must provide truthful identification (name and address) upon lawful demand, you are not legally required to make oral confessions or incriminate yourself.',
      sourceUrl: 'https://www.india.gov.in/my-government/constitution-india'
    },
    rights: [
      {
        id: 'r-sq-1',
        title: 'Right to know the officer’s identity and designation',
        plainLanguage: 'Every police officer on duty is required to wear an accurate, clear, and visible name tag with their rank and designation.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023 & Supreme Court Guidelines',
          section: 'Section 36 BNSS / D.K. Basu Directives',
          sourceName: 'Supreme Court of India / India Code',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'You may politely note their name and station. Officers on uniform duty are required to display identification.',
        confidence: 'verified',
        description: 'Police officers on duty are required to display clear name tags and identification badges with their designations. You may respectfully ask for their name and posting.',
        bnssSection: 'Section 36 BNSS',
        sourceId: 'sc-dk-basu'
      },
      {
        id: 'r-sq-2',
        title: 'Right to clarify whether you are free to leave',
        plainLanguage: 'Casual questioning on the street does not constitute arrest or detention. If you are not suspected of a cognizable offence or under formal restraint, you are generally free to proceed.',
        legalBasis: {
          law: 'Constitution of India',
          article: 'Article 21 (Personal Liberty)',
          sourceName: 'Constitution of India',
          sourceUrl: 'https://www.india.gov.in/my-government/constitution-india',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'If an officer formally restrains you or prevents you from leaving, you have entered detention or arrest, triggering statutory arrest safeguards.',
        confidence: 'verified',
        description: 'You have the right to ask if you are free to leave. Casual questioning is not detention.',
        constitutionArticle: 'Article 21',
        sourceId: 'const-art-21'
      },
      {
        id: 'r-sq-3',
        title: 'Right to silence against self-incrimination',
        plainLanguage: 'You cannot be forced or coerced by police to admit guilt or answer questions designed to incriminate you in a criminal charge.',
        legalBasis: {
          law: 'Constitution of India',
          article: 'Article 20(3)',
          sourceName: 'Constitution of India',
          sourceUrl: 'https://www.india.gov.in/my-government/constitution-india',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'You should truthfully give your basic identity, but you have the constitutional right not to answer questions that accuse or incriminate you.',
        confidence: 'verified',
        description: 'No person accused of any offence shall be compelled to be a witness against himself.',
        constitutionArticle: 'Article 20(3)',
        sourceId: 'const-art-20'
      },
      {
        id: 'r-sq-4',
        title: 'Notice of Appearance instead of routine arrest for offences up to 7 years',
        plainLanguage: 'For offences with imprisonment up to 7 years, police must ordinarily issue a formal Notice of Appearance rather than effecting a routine street arrest, unless specific statutory necessity is recorded in writing.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
          section: 'Section 35(3)',
          sourceName: 'Ministry of Law & Justice, Govt of India',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'Applies to offences punishable with imprisonment up to 7 years. Arrest is only permissible if specific statutory necessity reasons (e.g., flight risk, evidence tampering) are recorded.',
        confidence: 'verified',
        description: 'Notice of appearance must ordinarily be served instead of arrest for offences punishable up to 7 years.',
        bnssSection: 'Section 35(3) BNSS',
        crpcEquivalent: 'Section 41A CrPC',
        landmarkCase: 'Arnesh Kumar v. State of Bihar',
        sourceId: 'bnss-35-notice'
      }
    ],
    actions: [
      {
        number: 1,
        title: 'Stop and remain calm',
        instruction: 'Do not panic, run, or raise your voice. Keep your hands visible and speak in a polite, measured tone.'
      },
      {
        number: 2,
        title: 'Politely clarify the reason',
        instruction: 'Respectfully ask: "Officer, could you please let me know the reason for stopping me?"'
      },
      {
        number: 3,
        title: 'Ask your status',
        instruction: 'Calmly ask: "Officer, am I required for any formal proceeding, or am I free to leave?"'
      },
      {
        number: 4,
        title: 'Produce vehicle documents if driving',
        instruction: 'If stopped during a vehicle check, produce your driving licence, registration, insurance, and PUC in physical format or via official DigiLocker / mParivahan apps.'
      },
      {
        number: 5,
        title: 'Safely note details',
        instruction: 'Mentally note or safely write down the officer’s name, time, exact location, and patrol vehicle number.'
      }
    ],
    donts: [
      {
        text: 'Do not run away or become physically confrontational',
        reason: 'Fleeing creates suspicion and can lead to lawful physical restraint or obstruction charges.'
      },
      {
        text: 'Do not touch or reach into an officer’s vehicle or equipment',
        reason: 'May be perceived as an aggressive action or interference with public duty.'
      },
      {
        text: 'Do not present fake documents or false identities',
        reason: 'Providing forged documents or false identities is a serious criminal offence under Bharatiya Nyaya Sanhita.'
      },
      {
        text: 'Do not argue aggressively or use abusive language',
        reason: 'De-escalation is your best legal and physical protection. Keep tone formal and calm.'
      }
    ],
    sayThis: [
      {
        id: 'st-sq-1',
        situation: 'Asking status',
        english: 'Officer, could you please let me know why I am being stopped, and whether I am free to leave?',
        hindi: 'अधिकारी महोदय, क्या आप कृपया बता सकते हैं कि मुझे क्यों रोका गया है, और क्या मैं जा सकता हूँ?',
        telugu: 'అధికారి గారు, నన్ను ఎందుకు ఆపారో మరియు నేను వెళ్ళవచ్చా లేదా దయచేసి చెప్పగలరా?',
        context: 'Use immediately when stopped to politely determine if this is casual inquiry or formal detention.'
      },
      {
        id: 'st-sq-2',
        situation: 'Asking officer name',
        english: 'May I politely know your name, rank, and police station, Officer?',
        hindi: 'क्या मैं सम्मानपूर्वक आपका नाम, पद और थाना जान सकता हूँ, अधिकारी महोदय?',
        telugu: 'అధికారి గారు, మీ పేరు, హోదా మరియు పోలీస్ స్టేషన్ తెలుసుకోవచ్చా?',
        context: 'If the officer is not wearing a visible name badge on duty.'
      },
      {
        id: 'st-sq-3',
        situation: 'Providing documents',
        english: 'Here are my driving licence and vehicle documents verified through the official DigiLocker app.',
        hindi: 'यह मेरा ड्राइविंग लाइसेंस और वाहन दस्तावेज हैं, जो आधिकारिक डिजीलॉकर ऐप पर उपलब्ध हैं।',
        telugu: 'ఇవి అధికారిక డిజిలాకర్ యాప్ ద్వారా ధృవీకరించబడిన నా డ్రైవింగ్ లైసెన్స్ మరియు వాహన పత్రాలు.',
        context: 'During routine traffic checks.'
      }
    ],
    escalationPath: [
      {
        level: 1,
        title: 'Duty Officer / Station House Officer (SHO)',
        designation: 'Inspector / SHO',
        description: 'If stopped unfairly or harassed on the street, report the incident in writing to the local Station House Officer.',
        action: 'Submit written letter detailing officer badge name, location, and time.',
        statutoryBasis: 'Administrative complaint'
      },
      {
        level: 2,
        title: 'Assistant Commissioner of Police / DSP',
        designation: 'ACP / DSP (Sub-Division)',
        description: 'Supervises local police stations. Escalation level if the SHO does not take notice.',
        action: 'Approach with copy of initial complaint and incident details.',
        statutoryBasis: 'Supervisory oversight'
      },
      {
        level: 3,
        title: 'Police Complaints Authority (PCA)',
        designation: 'Independent Statutory Authority',
        description: 'State / District PCA investigates serious police harassment, unlawful restraint, or abuse of authority.',
        action: 'File formal complaint before District/State PCA with date, time, and witness details.',
        statutoryBasis: 'Supreme Court Directive (Prakash Singh case)'
      }
    ],
    sourceIds: ['const-art-20', 'const-art-21', 'bnss-35-notice', 'sc-dk-basu', 'prakash-singh-pca'],
    keywords: ['stopped', 'questioned', 'police check', 'traffic', 'identity', 'digilocker', 'detained', 'street check']
  },

  // 2. ARREST & DETENTION
  {
    id: 'arrest-detained',
    slug: 'arrest-detained',
    icon: 'Lock',
    title: 'I am being arrested or detained',
    shortDescription: 'Your fundamental constitutional safeguards, arrest memo requirements, right to inform relatives, and 24-hour Magistrate production.',
    emergencyTag: 'URGENT SAFEGUARDS',
    badgeText: 'Arrest & Custody',
    needsLegalAid: true,
    quick30SecSummary: [
      'Ask calmly: "Officer, could you please tell me the grounds for my arrest?"',
      'Ask whether the alleged offence is bailable or non-bailable under BNSS Section 47.',
      'Request that your relative or friend be informed immediately under BNSS Section 48.',
      'Do not sign a blank arrest memo — ensure the memo lists the date, time, location, and is witnessed.',
      'You must be produced before the nearest Judicial Magistrate within 24 hours of arrest (excluding necessary journey time).'
    ],
    constitutionalProtection: {
      article: 'Article 22(1) & Article 22(2)',
      title: 'Constitutional Safeguards on Arrest and Detention',
      plainExplanation: 'You must be informed of the grounds of your arrest and cannot be denied the right to consult and be defended by a legal practitioner of your choice. You must be produced before the nearest Magistrate within 24 hours (excluding necessary journey time) and cannot be detained beyond that period without a Magistrate’s authority, subject to constitutional exceptions.',
      scopeAndExceptions: 'Applies to every person arrested under ordinary criminal law. Exceptions apply strictly to preventive detention laws or enemy aliens under Article 22(3).',
      sourceUrl: 'https://www.india.gov.in/my-government/constitution-india'
    },
    rights: [
      {
        id: 'r-ad-1',
        title: 'Right to know grounds of arrest and bail status',
        plainLanguage: 'The arresting officer must immediately inform you of the full particulars of the offence and whether the offence is bailable so you can arrange bail.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
          section: 'Section 47',
          sourceName: 'Ministry of Law & Justice, Govt of India',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'For bailable offences, police are statutorily required to inform you that you are entitled to be released on bail upon furnishing sureties.',
        confidence: 'verified',
        description: 'Arresting officer must immediately inform the arrested person of the grounds of arrest and whether the offence is bailable.',
        bnssSection: 'Section 47 BNSS',
        crpcEquivalent: 'Section 50 CrPC',
        constitutionArticle: 'Article 22(1)',
        sourceId: 'bnss-47'
      },
      {
        id: 'r-ad-2',
        title: 'Right to have a relative or friend immediately informed',
        plainLanguage: 'The arresting officer has a mandatory legal duty to immediately notify your nominated family member, friend, or relative about your arrest and the exact station where you are held.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
          section: 'Section 48',
          sourceName: 'Ministry of Law & Justice, Govt of India',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'The officer must record in a station register who was informed of the arrest.',
        confidence: 'verified',
        description: 'Mandatory obligation of police officer to inform relative/friend and record in station register.',
        bnssSection: 'Section 48 BNSS',
        crpcEquivalent: 'Section 50A CrPC',
        sourceId: 'bnss-48'
      },
      {
        id: 'r-ad-3',
        title: 'Right to meet an advocate of your choice during interrogation',
        plainLanguage: 'You have the statutory right to meet and consult with an advocate of your choice during interrogation, though not necessarily throughout the entire interrogation.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
          section: 'Section 38',
          sourceName: 'Ministry of Law & Justice, Govt of India',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'The statutory text permits meeting an advocate during interrogation, but does not mandate the advocate’s continuous presence throughout interrogation.',
        confidence: 'verified',
        description: 'Right of arrested person to meet an advocate of their choice during interrogation.',
        bnssSection: 'Section 38 BNSS',
        crpcEquivalent: 'Section 41D CrPC',
        constitutionArticle: 'Article 22(1)',
        sourceId: 'bnss-38'
      },
      {
        id: 'r-ad-4',
        title: 'Mandatory production before Magistrate within 24 hours',
        plainLanguage: 'You cannot be kept in police custody for more than 24 hours (excluding the time necessary for the journey to court) without an express remand order from a Judicial Magistrate.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023 & Constitution of India',
          section: 'Section 57 & 58 BNSS / Article 22(2)',
          sourceName: 'Constitution of India / India Code',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'Detention beyond 24 hours without Magisterial remand is unconstitutional and illegal.',
        confidence: 'verified',
        description: 'Mandatory production before nearest Magistrate within 24 hours excluding journey time.',
        bnssSection: 'Section 58 BNSS',
        crpcEquivalent: 'Section 57 CrPC',
        constitutionArticle: 'Article 22(2)',
        sourceId: 'bnss-58'
      },
      {
        id: 'r-ad-5',
        title: 'Mandatory medical examination upon arrest',
        plainLanguage: 'You have the right to be examined by a registered medical practitioner upon arrest, documenting existing injuries or health conditions, with a copy provided to you or your nominee.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
          section: 'Section 53',
          sourceName: 'Ministry of Law & Justice, Govt of India',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'Protects against custodial violence by establishing an official baseline medical record at the time of entering custody.',
        confidence: 'verified',
        description: 'Examination of arrested person by medical officer immediately upon arrest.',
        bnssSection: 'Section 53 BNSS',
        crpcEquivalent: 'Section 54 CrPC',
        sourceId: 'bnss-53'
      },
      {
        id: 'r-ad-6',
        title: 'No unnecessary restraint or routine handcuffing',
        plainLanguage: 'An arrested person shall not be subjected to more restraint than is necessary to prevent escape. Handcuffing requires specific statutory justification.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023 & Supreme Court Precedents',
          section: 'Section 46 BNSS',
          sourceName: 'Ministry of Law & Justice / Supreme Court of India',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'Routine handcuffing is restricted and must be justified by documented risk factors.',
        confidence: 'verified',
        description: 'The person arrested shall not be subjected to more restraint than is necessary to prevent escape.',
        bnssSection: 'Section 46 BNSS',
        sourceId: 'bnss-46'
      }
    ],
    actions: [
      {
        number: 1,
        title: 'Ask for the grounds of arrest',
        instruction: 'Politely ask: "Officer, could you please state the grounds of my arrest and the relevant sections?"'
      },
      {
        number: 2,
        title: 'Request relative notification',
        instruction: 'State clearly: "I request that my family/friend be immediately notified of my arrest under BNSS Section 48." Provide their phone number.'
      },
      {
        number: 3,
        title: 'Insist on an Arrest Memorandum',
        instruction: 'Ensure the arrest memo lists the exact date, time, location, and is signed by at least one witness (family member or locality resident).'
      },
      {
        number: 4,
        title: 'Request medical examination',
        instruction: 'Request an immediate medical examination under Section 53 BNSS to record your physical condition.'
      },
      {
        number: 5,
        title: 'Contact an advocate or NALSA Legal Aid',
        instruction: 'Request to contact your lawyer or inform the Magistrate that you require free legal aid from DLSA/NALSA (15100).'
      }
    ],
    donts: [
      {
        text: 'Do not physically resist or assault an officer',
        reason: 'Physical resistance may lead to lawful use of force and additional criminal charges under Bharatiya Nyaya Sanhita.'
      },
      {
        text: 'Do not sign blank papers or unread documents',
        reason: 'Always read every paper. If forced, state politely that you wish to consult your advocate before signing.'
      },
      {
        text: 'Do not make unguided self-incriminating statements',
        reason: 'You have a constitutional right to silence on questions that incriminate you (Article 20(3)).'
      },
      {
        text: 'Do not attempt to bribe or offer money to the police',
        reason: 'Offering a bribe is a severe criminal offence under the Prevention of Corruption Act.'
      }
    ],
    sayThis: [
      {
        id: 'st-ad-1',
        situation: 'Asking grounds of arrest',
        english: 'Officer, could you please tell me the grounds for my arrest?',
        hindi: 'अधिकारी महोदय, क्या आप कृपया मेरी गिरफ्तारी का कारण और धाराएं बता सकते हैं?',
        telugu: 'అధికారి గారు, నన్ను ఏ కారణం మరియు ఏ సెక్షన్ల కింద అరెస్టు చేస్తున్నారో దయచేసి చెప్పగలరా?',
        context: 'Your core statutory right under BNSS Section 47 and Constitution Article 22(1).'
      },
      {
        id: 'st-ad-2',
        situation: 'Relative notification',
        english: 'I would like my relative or friend to be informed that I have been arrested and where I am being held.',
        hindi: 'मैं चाहता हूँ कि मेरे रिश्तेदार या मित्र को सूचित किया जाए कि मुझे गिरफ्तार किया गया है और मुझे कहाँ रखा जा रहा है।',
        telugu: 'నన్ను అరెస్టు చేశారని మరియు ఎక్కడ ఉంచారో నా కుటుంబ సభ్యులకు లేదా స్నేహితునికి తెలియజేయాలని కోరుతున్నాను.',
        context: 'Mandatory under BNSS Section 48.'
      },
      {
        id: 'st-ad-3',
        situation: 'Requesting legal assistance',
        english: 'I would like to meet an advocate of my choice.',
        hindi: 'मैं अपनी पसंद के वकील से मिलना और परामर्श करना चाहता हूँ।',
        telugu: 'నేను నా తరపు న్యాయవాదిని కలిసి మాట్లాడాలనుకుంటున్నాను.',
        context: 'Statutory right under BNSS Section 38 & Article 22(1).'
      },
      {
        id: 'st-ad-4',
        situation: 'Bail inquiry',
        english: 'Officer, is this offence bailable, and may I arrange bail and sureties now?',
        hindi: 'अधिकारी महोदय, क्या यह अपराध जमानती है, और क्या मैं अभी जमानत की व्यवस्था कर सकता हूँ?',
        telugu: 'అధికారి గారు, ఇది బెయిలబుల్ నేరమా, నేను ఇప్పుడే బెయిల్ ఏర్పాటు చేసుకోవచ్చా?',
        context: 'Mandatory right under BNSS Section 47.'
      }
    ],
    specialSafeguards: [
      {
        group: 'women',
        title: 'Arrest of Women',
        protection: 'Except in exceptional circumstances, no woman shall be arrested after sunset and before sunrise. Where exceptional circumstances exist, arrest must be made by a woman officer with prior permission from a Judicial Magistrate First Class.',
        statutoryProvision: 'Section 43(5) & Section 47 BNSS, 2023'
      },
      {
        group: 'children',
        title: 'Juveniles & Children',
        protection: 'A child in conflict with law cannot be placed in a police lockup or jail. Must be placed under charge of the Child Welfare Police Officer and produced before the Juvenile Justice Board (JJB) within 24 hours.',
        statutoryProvision: 'Section 10, Juvenile Justice Act, 2015'
      },
      {
        group: 'seniors',
        title: 'Senior Citizens (60+ years)',
        protection: 'For offences punishable with less than 3 years imprisonment or involving infirm/senior persons, special procedural safeguards apply under BNSS Section 35.',
        statutoryProvision: 'Section 35(7) BNSS, 2023'
      }
    ],
    escalationPath: [
      {
        level: 1,
        title: 'Arresting Officer & Station House Officer',
        designation: 'SHO / Inspector',
        description: 'Demand compliance with Arrest Memo, relative intimation, and medical examination.',
        action: 'Request immediate compliance with Section 47 & 48 BNSS in writing.',
        statutoryBasis: 'BNSS Section 47 & 48'
      },
      {
        level: 2,
        title: 'Duty Judicial Magistrate',
        designation: 'Judicial Magistrate First Class (JMFC)',
        description: 'When produced before the Magistrate within 24 hours, inform the court directly of any procedural violations, denial of calls, or custodial mistreatment.',
        action: 'State all grievances directly to the Magistrate; request DLSA legal aid if needed.',
        statutoryBasis: 'BNSS Section 57 & Article 22(2)'
      },
      {
        level: 3,
        title: 'District Legal Services Authority (DLSA / NALSA)',
        designation: 'Legal Aid Counsel',
        description: 'If you cannot afford a private lawyer, the Magistrate or DLSA provides a free legal-aid advocate for remand and bail hearings.',
        action: 'Call 15100 or inform the court to appoint a Legal Aid Defense Counsel (LADC).',
        statutoryBasis: 'Legal Services Authorities Act, 1987 (Sec 12)'
      }
    ],
    sourceIds: ['const-art-22', 'bnss-47', 'bnss-48', 'bnss-38', 'bnss-58', 'bnss-53', 'bnss-46', 'bnss-43-women', 'nalsa-legal-aid'],
    keywords: ['arrest', 'detained', 'custody', 'handcuffs', 'police station', 'bail', 'lockup', 'remand', 'magistrate']
  },

  // 3. CALLED TO POLICE STATION
  {
    id: 'police-station',
    slug: 'police-station',
    icon: 'FileText',
    title: 'I have been called to the police station',
    shortDescription: 'When police can summon you, mandatory written notice requirements, and protections for women and senior citizens.',
    badgeText: 'Police Summons',
    quick30SecSummary: [
      'Ask for a formal written Notice under Section 35(3) or Section 179 BNSS stating the case details.',
      'Women, children under 15, and senior citizens over 60 cannot be compelled to attend the police station for witness questioning — their statements must be recorded at their residence.',
      'You are entitled to be accompanied by a family member or advocate to the station.',
      'Do not sign any blank paper or statement you have not read.',
      'Keep copies of the notice and inform your family before proceeding to the station.'
    ],
    constitutionalProtection: {
      article: 'Article 21',
      title: 'Protection of Personal Liberty and Due Process',
      plainExplanation: 'Attendance before a police officer must be based on lawful statutory authority. Police cannot arbitrarily summon citizens without following written statutory procedures.',
      scopeAndExceptions: 'Applies to both witnesses and persons called for inquiry.',
      sourceUrl: 'https://www.india.gov.in/my-government/constitution-india'
    },
    rights: [
      {
        id: 'r-ps-1',
        title: 'Right to written notice specifying case details',
        plainLanguage: 'Police must issue a formal written notice specifying the case crime number, purpose, and time of appearance under BNSS, rather than relying on informal verbal summons.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
          section: 'Section 35(3) & Section 179',
          sourceName: 'Ministry of Law & Justice, Govt of India',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'A written notice creates an official record of the summons.',
        confidence: 'verified',
        description: 'Requirement of formal written notice under Section 35(3) or Section 179 BNSS.',
        bnssSection: 'Section 35(3) & 179 BNSS',
        crpcEquivalent: 'Section 41A & 160 CrPC',
        sourceId: 'bnss-35-notice'
      },
      {
        id: 'r-ps-2',
        title: 'Special protection: Women, children and senior citizens questioned at residence',
        plainLanguage: 'No woman, child under 15, or senior citizen above 60 years shall be required to attend any place other than their residence for witness examination.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
          section: 'Section 179(1) Proviso',
          sourceName: 'Ministry of Law & Justice, Govt of India',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'Applies to witness statements. Police officers must visit the person’s residence or place of convenience.',
        confidence: 'verified',
        description: 'Proviso to Section 179(1) BNSS provides that women, children under 15, and senior citizens shall be examined at their residence.',
        bnssSection: 'Section 179(1) BNSS',
        crpcEquivalent: 'Section 160(1) CrPC Proviso',
        sourceId: 'bnss-43-women'
      },
      {
        id: 'r-ps-3',
        title: 'Right to have family or advocate accompany you',
        plainLanguage: 'You have the right to be accompanied to the police station by a family member or advocate for safety and legal consultation.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
          section: 'Section 38',
          sourceName: 'Ministry of Law & Justice, Govt of India',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'Ensures transparency and protects against wrongful detention.',
        confidence: 'verified',
        description: 'Right to meet advocate and have family accompany you.',
        bnssSection: 'Section 38 BNSS',
        sourceId: 'bnss-38'
      }
    ],
    actions: [
      {
        number: 1,
        title: 'Request formal written notice',
        instruction: 'Politely ask: "Officer, could you please provide a written notice under Section 35(3) or Section 179 BNSS stating the case details?"'
      },
      {
        number: 2,
        title: 'Inform family and note details',
        instruction: 'Inform your family members or advocate of the exact police station, officer name, and scheduled time before you leave.'
      },
      {
        number: 3,
        title: 'Take a trusted person or lawyer',
        instruction: 'Bring an advocate or trusted family member with you to the police station.'
      },
      {
        number: 4,
        title: 'Read all statements carefully',
        instruction: 'Read every word of any statement recorded before signing. Never sign blank paper or unverified text.'
      }
    ],
    donts: [
      {
        text: 'Do not go to the police station late at night without formal written summons',
        reason: 'Night visits carry safety risks. Insist on visiting during official daytime hours unless an emergency is documented.'
      },
      {
        text: 'Do not sign blank papers or confession statements',
        reason: 'Signing blank documents allows fabrication of statements.'
      },
      {
        text: 'Do not surrender your phone or belongings without an official seizure receipt',
        reason: 'Seizure of property requires an official seizure memo signed by independent witnesses.'
      }
    ],
    sayThis: [
      {
        id: 'st-ps-1',
        situation: 'Requesting written notice',
        english: 'Officer, could you please issue a formal written notice specifying the case number and reason for inquiry?',
        hindi: 'अधिकारी महोदय, क्या आप कृपया मामला संख्या और पूछताछ का कारण बताते हुए एक औपचारिक लिखित नोटिस जारी कर सकते हैं?',
        telugu: 'అధికారి గారు, కేసు నంబరు మరియు విచారణ కారణాన్ని తెలుపుతూ అధికారిక లిఖితపూర్వక నోటీసు ఇవ్వగలరా?',
        context: 'When called verbally by phone or in person.'
      },
      {
        id: 'st-ps-2',
        situation: 'Women / Senior citizen residence rule',
        english: 'As per the statutory proviso under BNSS, I request that my statement be recorded at my residence.',
        hindi: 'बीएनएसएस के वैधानिक प्रावधान के अनुसार, मैं अनुरोध करती हूँ कि मेरा बयान मेरे निवास स्थान पर दर्ज किया जाए।',
        telugu: 'బీఎన్ఎస్ఎస్ చట్టబద్ధమైన నిబంధన ప్రకారం, నా వాంగ్మూలాన్ని నా నివాసంలోనే నమోదు చేయాలని కోరుతున్నాను.',
        context: 'For women, seniors (60+), and children under 15.'
      }
    ],
    escalationPath: [
      {
        level: 1,
        title: 'Station House Officer (SHO)',
        designation: 'Inspector / SHO',
        description: 'Report improper summons or harassment directly to the in-charge officer.',
        action: 'Submit written representation stating harassment or procedural non-compliance.',
        statutoryBasis: 'Administrative process'
      },
      {
        level: 2,
        title: 'Superintendent of Police (SP / DCP)',
        designation: 'District Police Chief',
        description: 'If harassment continues, approach the SP/DCP with copies of communications.',
        action: 'Submit representation via registered post or in person.',
        statutoryBasis: 'Supervisory authority'
      }
    ],
    sourceIds: ['bnss-35-notice', 'bnss-43-women', 'bnss-38', 'const-art-21'],
    keywords: ['police station', 'summons', 'called', 'notice', 'witness', 'interrogation', 'statement']
  },

  // 4. PHONE OR HOME SEARCH
  {
    id: 'phone-search',
    slug: 'phone-search',
    icon: 'Search',
    title: 'Police want to search my phone or home',
    shortDescription: 'Search and seizure legal boundaries, mandatory independent witnesses (panchnama), audio-video recording, and digital privacy.',
    badgeText: 'Search & Seizure',
    quick30SecSummary: [
      'Whether a warrant or statutory authority is required depends on the circumstances and the specific power being exercised.',
      'Ask politely: "Officer, could you please state the legal authority or warrant under which this search is being conducted?"',
      'Searches of premises must be conducted in the presence of two independent local witnesses (Panchnama).',
      'Under BNSS Section 105, the process of search and seizure of property/devices must be recorded via audio-video electronic means.',
      'Insist on an official, signed Seizure Memo listing all items taken into possession before they leave.'
    ],
    constitutionalProtection: {
      article: 'Article 20(3) & Article 21',
      title: 'Right to Privacy & Protection against Self-Incrimination',
      plainExplanation: 'Personal electronic devices contain private communications and data. Unwarranted extraction of self-incriminating data or unlawful searches of private premises without statutory authority violates fundamental constitutional rights.',
      scopeAndExceptions: 'Searches must strictly follow the procedural safeguards prescribed under BNSS Sections 100, 103, 105, 106, and 107.',
      sourceUrl: 'https://www.india.gov.in/my-government/constitution-india'
    },
    rights: [
      {
        id: 'r-sr-1',
        title: 'Requirement of legal authority or search warrant',
        plainLanguage: 'Searches of private premises ordinarily require a judicial search warrant or documented emergency statutory grounds recorded in writing by the officer before conducting the search.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
          section: 'Section 103 & Section 106',
          sourceName: 'Ministry of Law & Justice, Govt of India',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'Whether a warrant is required depends on the circumstances (e.g. search of arrested person vs premises search vs urgent investigation under Section 106 BNSS).',
        confidence: 'verified',
        description: 'Warrant requirements and statutory power of search under BNSS Sections 103 & 106.',
        bnssSection: 'Section 103 & 106 BNSS',
        crpcEquivalent: 'Section 93 & 165 CrPC',
        sourceId: 'bnss-100-witnesses'
      },
      {
        id: 'r-sr-2',
        title: 'Mandatory audio-video electronic recording of search & seizure',
        plainLanguage: 'Under BNSS, the entire search and seizure process, including the preparation of the seizure list, must be recorded through audio-video electronic means (mobile or camera) and forwarded to the Magistrate.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
          section: 'Section 105',
          sourceName: 'Ministry of Law & Justice, Govt of India',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'Crucial safeguard introduced under BNSS 2023 to prevent planting of evidence or unauthorized tampering.',
        confidence: 'verified',
        description: 'Mandatory audio-video electronic recording of search and seizure under Section 105 BNSS.',
        bnssSection: 'Section 105 BNSS',
        sourceId: 'bnss-105-search'
      },
      {
        id: 'r-sr-3',
        title: 'Presence of two independent witnesses (Panchnama)',
        plainLanguage: 'Searches of premises must be conducted in the presence of two or more independent and respectable inhabitants of the locality, who sign the search list.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
          section: 'Section 103 & Section 100',
          sourceName: 'Ministry of Law & Justice, Govt of India',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'A copy of the seizure list must be delivered to the occupant of the premises free of cost.',
        confidence: 'verified',
        description: 'Presence of two independent and respectable witnesses during search (Panchnama).',
        bnssSection: 'Section 103 BNSS',
        sourceId: 'bnss-100-witnesses'
      },
      {
        id: 'r-sr-4',
        title: 'Right to receive a signed Seizure Memo / Hash Value for devices',
        plainLanguage: 'If a phone, computer, or property is seized, police must provide an official, signed Seizure Memo listing make, model, serial number, and calculate cryptographic hash values for digital devices.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023 & IT Rules',
          section: 'Section 107 BNSS',
          sourceName: 'Ministry of Law & Justice, Govt of India',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'Never surrender a device without receiving a signed duplicate copy of the seizure memo.',
        confidence: 'verified',
        description: 'Seizure memo and custody of seized property under Section 107 BNSS.',
        bnssSection: 'Section 107 BNSS',
        sourceId: 'bnss-105-search'
      }
    ],
    actions: [
      {
        number: 1,
        title: 'Ask for search warrant or legal authority',
        instruction: 'Respectfully ask: "Officer, could you please show the search warrant or state the statutory authority under which this search is conducted?"'
      },
      {
        number: 2,
        title: 'Ask for local independent witnesses',
        instruction: 'Request that the search be conducted in the presence of two independent neighbours or local residents as required by law.'
      },
      {
        number: 3,
        title: 'Verify audio-video recording',
        instruction: 'Note whether the officers are recording the search via audio-video electronic means as mandated by BNSS Section 105.'
      },
      {
        number: 4,
        title: 'Demand a signed Seizure Memo',
        instruction: 'Before any phone, laptop, or document is removed, demand a detailed seizure list (memo) signed by the officer and witnesses.'
      }
    ],
    donts: [
      {
        text: 'Do not physically obstruct or fight officers during a search',
        reason: 'Physical obstruction is a punishable offence. Instead, voice your objections clearly for the record and witness signatures.'
      },
      {
        text: 'Do not delete files, wipe devices, or destroy records during a lawful search',
        reason: 'Intentional destruction of evidence during lawful investigation is a serious criminal offence.'
      },
      {
        text: 'Do not let items be removed without being documented on the seizure memo',
        reason: 'Undocumented seizure creates risk of loss or unauthorized evidence tampering.'
      }
    ],
    sayThis: [
      {
        id: 'st-sr-1',
        situation: 'Asking for warrant / authority',
        english: 'Officer, could you please state the legal authority or warrant under which this search is being conducted?',
        hindi: 'अधिकारी महोदय, क्या आप कृपया वह कानूनी अधिकार या वारंट बता सकते हैं जिसके तहत यह तलाशी ली जा रही है?',
        telugu: 'అధికారి గారు, ఈ తనిఖీ ఏ చట్టపరమైన అధికారం లేదా వారెంట్ కింద నిర్వహిస్తున్నారో దయచేసి చెప్పగలరా?',
        context: 'When police arrive to search private premises or personal effects.'
      },
      {
        id: 'st-sr-2',
        situation: 'Demanding seizure memo',
        english: 'Please provide me with a signed copy of the seizure memo listing all seized items and electronic devices.',
        hindi: 'कृपया मुझे जब्त की गई सभी वस्तुओं और इलेक्ट्रॉनिक उपकरणों की सूची वाला हस्ताक्षरित जब्ती ज्ञापन (सीजर मेमो) प्रदान करें।',
        telugu: 'స్వాధీనం చేసుకున్న అన్ని వస్తువులు మరియు పరికరాల వివరాలతో కూడిన సంతకం చేసిన సీజర్ మెమో కాపీని నాకు అందించండి.',
        context: 'Before any property is taken into police custody.'
      }
    ],
    escalationPath: [
      {
        level: 1,
        title: 'Superintendent of Police (SP / DCP)',
        designation: 'District Police Chief',
        description: 'Report unauthorized or warrantless searches without panchnama or audio-video recording.',
        action: 'Submit written complaint detailing procedural violations during search.',
        statutoryBasis: 'BNSS Section 105 & 106 non-compliance'
      },
      {
        level: 2,
        title: 'Jurisdictional Judicial Magistrate',
        designation: 'Magistrate Court',
        description: 'Under BNSS Section 105, search recordings and seizure lists must be submitted to the Magistrate. You can file an application pointing out illegal search.',
        action: 'File an application through an advocate challenging the legality of seizure.',
        statutoryBasis: 'Section 105 & 107 BNSS'
      }
    ],
    sourceIds: ['bnss-105-search', 'bnss-100-witnesses', 'const-art-20', 'const-art-21'],
    keywords: ['search', 'phone', 'home', 'laptop', 'warrant', 'seizure', 'panchnama', 'video recording', 'privacy']
  },

  // 5. FIR REFUSAL
  {
    id: 'fir-refusal',
    slug: 'fir-refusal',
    icon: 'FileText',
    title: 'Police refuse to register my FIR',
    shortDescription: 'Statutory rights for cognizable offences, Zero FIR provisions, and legal escalation to the Superintendent of Police and Magistrate.',
    badgeText: 'FIR Rights',
    needsLegalAid: true,
    quick30SecSummary: [
      'If the complaint discloses a cognizable offence (serious crime like theft, assault, fraud), police are statutorily required to register an FIR.',
      'Zero FIR: Under BNSS Section 173(1), an FIR can be registered at ANY police station irrespective of territorial jurisdiction and transferred later.',
      'You have the legal right to receive a free copy of the registered FIR immediately (Section 173(2) BNSS).',
      'If the SHO refuses, send the substance of your complaint by Speed Post to the Superintendent of Police (SP / DCP) under Section 173(4) BNSS.',
      'If the SP does not act, you can approach the Judicial Magistrate under Section 175(3) BNSS for an investigation order.'
    ],
    specialGuide: {
      title: 'What is a Zero FIR?',
      content: 'Under Section 173(1) of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, information relating to a cognizable offence can be registered at ANY police station, regardless of where the crime occurred. The station registers it as a "Zero FIR", initiates immediate urgent action/investigation, and transfers the case to the jurisdictional police station.',
      points: [
        'Statutory basis: Section 173(1) BNSS (formerly based on MHA Advisory & Lalita Kumari judgment).',
        'Police cannot turn you away citing lack of territorial jurisdiction for cognizable offences.',
        'Zero FIR is numbered "0" and later assigned a regular crime number upon transfer to the proper station.'
      ],
      statutoryRef: 'Section 173(1) BNSS, 2023'
    },
    constitutionalProtection: {
      article: 'Article 21 & Supreme Court Constitution Bench Ruling',
      title: 'Access to Justice & Mandatory FIR for Cognizable Offences',
      plainExplanation: 'In Lalita Kumari v. Govt of U.P. (2014), the Supreme Court ruled that registration of FIR is mandatory if the information discloses a cognizable offence. Failure to register attracts departmental and criminal action against the defaulting officer.',
      scopeAndExceptions: 'For non-cognizable complaints, police record an NCR (Non-Cognizable Report) and refer the informant to the Magistrate under Section 174 BNSS.',
      sourceUrl: 'https://main.sci.gov.in/'
    },
    rights: [
      {
        id: 'r-fir-1',
        title: 'Mandatory FIR registration for cognizable offences',
        plainLanguage: 'If your complaint discloses the commission of a cognizable offence, the officer in charge is legally bound to register the FIR under Section 173 BNSS.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
          section: 'Section 173(1)',
          sourceName: 'Ministry of Law & Justice, Govt of India',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'Applies strictly to cognizable offences. In preliminary inquiry permissible cases (e.g. matrimonial disputes, commercial disputes), inquiry must be completed within 14 days under BNSS.',
        confidence: 'verified',
        description: 'Mandatory registration of FIR for cognizable offences under Section 173 BNSS.',
        bnssSection: 'Section 173 BNSS',
        crpcEquivalent: 'Section 154 CrPC',
        landmarkCase: 'Lalita Kumari v. Govt of U.P.',
        sourceId: 'sc-lalita-kumari'
      },
      {
        id: 'r-fir-2',
        title: 'Zero FIR: Registration irrespective of jurisdiction',
        plainLanguage: 'You can lodge your FIR at any police station across India irrespective of where the crime took place. The station must record it and transfer it.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
          section: 'Section 173(1)',
          sourceName: 'Ministry of Law & Justice, Govt of India',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'Statutory mandate under BNSS Section 173(1) allowing electronic or oral filing irrespective of area.',
        confidence: 'verified',
        description: 'Zero FIR registration under Section 173(1) BNSS.',
        bnssSection: 'Section 173(1) BNSS',
        sourceId: 'bnss-173'
      },
      {
        id: 'r-fir-3',
        title: 'Right to a free copy of the FIR immediately',
        plainLanguage: 'The police must provide a copy of the recorded FIR to the informant forthwith, completely free of cost.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
          section: 'Section 173(2)',
          sourceName: 'Ministry of Law & Justice, Govt of India',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'You are legally entitled to receive the FIR copy immediately upon registration.',
        confidence: 'verified',
        description: 'A copy of the information recorded under subsection (1) shall be given forthwith, free of cost, to the informant.',
        bnssSection: 'Section 173(2) BNSS',
        crpcEquivalent: 'Section 154(2) CrPC',
        sourceId: 'bnss-173'
      },
      {
        id: 'r-fir-4',
        title: 'Statutory escalation to Superintendent of Police (SP / DCP)',
        plainLanguage: 'If the SHO refuses to register your FIR, you have the statutory right to send the complaint in writing by Speed Post to the Superintendent of Police under Section 173(4) BNSS.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
          section: 'Section 173(4)',
          sourceName: 'Ministry of Law & Justice, Govt of India',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'The SP, if satisfied that cognizable offence is disclosed, shall investigate or direct subordinate investigation.',
        confidence: 'verified',
        description: 'Escalation to Superintendent of Police under Section 173(4) BNSS.',
        bnssSection: 'Section 173(4) BNSS',
        crpcEquivalent: 'Section 154(3) CrPC',
        sourceId: 'bnss-173'
      }
    ],
    actions: [
      {
        number: 1,
        title: 'Submit written complaint in duplicate',
        instruction: 'Submit two copies of your written complaint to the SHO. Insist on a signed and stamped receiving acknowledgement copy or CSR receipt.'
      },
      {
        number: 2,
        title: 'Request Zero FIR if jurisdiction is cited',
        instruction: 'If the officer says "this did not happen in our area", state: "Sir, under Section 173(1) BNSS, please register this as a Zero FIR and transfer it."'
      },
      {
        number: 3,
        title: 'Escalate to Superintendent of Police (SP / DCP)',
        instruction: 'If refused, send the complaint with all facts by Registered / Speed Post to the District SP/DCP under Section 173(4) BNSS and retain the postal tracking receipt.'
      },
      {
        number: 4,
        title: 'File application before Judicial Magistrate',
        instruction: 'If the SP does not direct investigation, engage a lawyer or NALSA legal aid counsel to file an application before the Judicial Magistrate under Section 175(3) BNSS.'
      }
    ],
    donts: [
      {
        text: 'Do not leave the police station without a written receipt or CSR number',
        reason: 'Verbal assurances leave no documentary trail to prove that you approached the station.'
      },
      {
        text: 'Do not add false accusations or exaggerated facts to your complaint',
        reason: 'Filing a false or fabricated police report is a criminal offence under Section 217 BNS.'
      },
      {
        text: 'Do not offer money to get an FIR registered',
        reason: 'Bribery is illegal under the Prevention of Corruption Act.'
      }
    ],
    sayThis: [
      {
        id: 'st-fir-1',
        situation: 'Requesting FIR registration',
        english: 'Officer, this complaint discloses a cognizable offence. I request that an FIR be registered under Section 173 BNSS and a free copy provided.',
        hindi: 'अधिकारी महोदय, यह शिकायत एक संज्ञेय अपराध दर्शाती है। मैं अनुरोध करता हूँ कि धारा 173 बीएनएसएस के तहत एफआईआर दर्ज की जाए और एक निःशुल्क प्रति दी जाए।',
        telugu: 'అధికారి గారు, ఈ ఫిర్యాదు కాగ్నిజబుల్ నేరాన్ని తెలియజేస్తుంది. దయచేసి సెక్షన్ 173 బీఎన్ఎస్ఎస్ కింద ఎఫ్ఐఆర్ నమోదు చేసి ఉచిత కాపీ ఇవ్వండి.',
        context: 'When presenting a serious crime complaint to the police.'
      },
      {
        id: 'st-fir-2',
        situation: 'Invoking Zero FIR',
        english: 'Even if the incident occurred outside this jurisdiction, please register a Zero FIR under Section 173(1) BNSS and transfer the file.',
        hindi: 'भले ही घटना इस क्षेत्र से बाहर हुई हो, कृपया धारा 173(1) बीएनएसएस के तहत जीरो एफआईआर दर्ज करें और केस स्थानांतरित करें।',
        telugu: 'సంఘటన ఈ ప్రాంత పరిధిలో జరగకపోయినా, సెక్షన్ 173(1) బీఎన్ఎస్ఎస్ కింద జీరో ఎఫ్ఐఆర్ నమోదు చేసి బదిలీ చేయండి.',
        context: 'When police refuse citing territorial jurisdiction.'
      },
      {
        id: 'st-fir-3',
        situation: 'Requesting stamped receipt',
        english: 'If FIR registration takes time, please provide a stamped receiving acknowledgement on my duplicate copy.',
        hindi: 'यदि एफआईआर दर्ज करने में समय लगता है, तो कृपया मेरी दूसरी प्रति पर मुहर लगाकर पावती (रिसीविंग) दें।',
        telugu: 'ఎఫ్ఐఆర్ నమోదుకు సమయం పడితే, దయచేసి నా డూప్లికేట్ కాపీపై స్టాంప్ వేసి రసీదు ఇవ్వండి.',
        context: 'To secure proof of submission.'
      }
    ],
    escalationPath: [
      {
        level: 1,
        title: 'Station House Officer (SHO)',
        designation: 'Inspector / SHO',
        description: 'First point of approach. Submit written complaint in duplicate and request stamped receiving copy.',
        action: 'Submit written complaint under Section 173(1) BNSS.',
        statutoryBasis: 'BNSS Section 173(1)'
      },
      {
        level: 2,
        title: 'Superintendent of Police (SP / DCP)',
        designation: 'District Police Chief',
        description: 'Statutory escalation under BNSS Section 173(4). Send complaint by Speed Post with tracking proof.',
        action: 'Send complaint via Registered/Speed Post under Section 173(4) BNSS.',
        statutoryBasis: 'BNSS Section 173(4)'
      },
      {
        level: 3,
        title: 'Judicial Magistrate First Class (JMFC)',
        designation: 'Magistrate Court',
        description: 'If the SP does not act, apply directly to the Judicial Magistrate under Section 175(3) BNSS for an order directing registration and investigation.',
        action: 'File Section 175(3) BNSS application through advocate or DLSA legal aid.',
        statutoryBasis: 'BNSS Section 175(3)'
      }
    ],
    sourceIds: ['bnss-173', 'bnss-175-magistrate', 'sc-lalita-kumari', 'nalsa-legal-aid'],
    keywords: ['fir', 'refusal', 'zero fir', 'complaint', 'cognizable', 'superintendent of police', 'magistrate', 'police report']
  },

  // 6. DEMANDING A BRIBE
  {
    id: 'demanding-bribe',
    slug: 'demanding-bribe',
    icon: 'Coins',
    title: 'Police are demanding a bribe',
    shortDescription: 'How to legally protect yourself, 7-day reporting protection under PC Act, and Anti-Corruption Bureau (ACB / 1064) reporting pathways.',
    badgeText: 'Anti-Corruption',
    quick30SecSummary: [
      'Do not pay the bribe — demanding or accepting undue advantage by a public servant is a severe crime under Section 7 of the Prevention of Corruption Act, 1988.',
      '7-Day Statutory Protection: Under Section 8 of the PC Act, if you are coerced to pay a bribe, you are protected from prosecution if you report it to the Anti-Corruption Bureau within 7 days.',
      'Preserve all evidence safely: note badge names, dates, times, demands made, WhatsApp messages, or audio records.',
      'Call the National Anti-Corruption Helpline 1064 or report to your State Anti-Corruption Bureau (ACB / DVAC / Vigilance).',
      'ACB conducts official trap operations to catch corrupt officials red-handed without legal risk to you.'
    ],
    constitutionalProtection: {
      article: 'Prevention of Corruption Act, 1988 (Amended 2018)',
      title: 'Statutory Protection for Compelled Bribe Givers',
      plainExplanation: 'Section 8 of the Prevention of Corruption Act provides explicit statutory immunity: a person who is compelled to give a bribe shall not be prosecuted if they report the matter to law enforcement or anti-corruption authorities within seven days.',
      scopeAndExceptions: 'Applies when reported within 7 days of being compelled. Proactive voluntary bribing remains punishable.',
      sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/1943'
    },
    rights: [
      {
        id: 'r-br-1',
        title: 'Demanding a bribe is a non-bailable criminal offence',
        plainLanguage: 'Any public servant demanding or accepting undue advantage commits a serious offence punishable with up to 7 years imprisonment under the Prevention of Corruption Act.',
        legalBasis: {
          law: 'Prevention of Corruption Act, 1988 (Amended 2018)',
          section: 'Section 7 & Section 7A',
          sourceName: 'Ministry of Personnel, Public Grievances & Pensions',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/1943',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'Applies to all public servants including state and central police officers.',
        confidence: 'verified',
        description: 'Offence relating to public servant being bribed under Section 7 PC Act.',
        legalSection: 'Section 7, PC Act 1988',
        sourceId: 'pc-act-1988'
      },
      {
        id: 'r-br-2',
        title: '7-Day statutory immunity for reporting compelled bribe',
        plainLanguage: 'If you are coerced or compelled to give a bribe, you are immune from prosecution provided you report the matter to the Anti-Corruption Bureau within 7 days.',
        legalBasis: {
          law: 'Prevention of Corruption Act, 1988 (Amended 2018)',
          section: 'Section 8 Proviso',
          sourceName: 'Ministry of Personnel, Public Grievances & Pensions',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/1943',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'Crucial protection enabling citizens to report corrupt demands without fear of being prosecuted as a bribe giver.',
        confidence: 'verified',
        description: 'Protection to compelled bribe givers reporting within 7 days under Section 8 PC Act.',
        legalSection: 'Section 8, PC Act 1988',
        sourceId: 'pc-act-1988'
      },
      {
        id: 'r-br-3',
        title: 'Direct access to independent Anti-Corruption Bureau (ACB / DVAC)',
        plainLanguage: 'State Anti-Corruption Bureaus are specialized investigation agencies completely independent of local police stations, authorized to lay traps and prosecute corrupt personnel.',
        legalBasis: {
          law: 'State Vigilance & Anti-Corruption Manuals',
          section: 'Toll-Free 1064 & State ACB Directives',
          sourceName: 'State Governments / CBI',
          sourceUrl: 'https://pgportal.gov.in/',
          lastVerified: '16 August 2026',
          sourceType: 'OFFICIAL_GOVERNMENT'
        },
        scopeNote: 'You do not report corruption to the same police station; you approach the district ACB office directly.',
        confidence: 'verified',
        description: 'Independent anti-corruption reporting pathway.',
        sourceId: 'pc-act-1988'
      }
    ],
    actions: [
      {
        number: 1,
        title: 'Politely refuse and buy time',
        instruction: 'Do not pay immediately. Calmly say: "I do not have cash right now, could you please give me a government challan / official receipt?"'
      },
      {
        number: 2,
        title: 'Preserve all details and evidence',
        instruction: 'Safely note the officer’s name, designation, police station, date, time, demand amount, and any message or audio records.'
      },
      {
        number: 3,
        title: 'Contact State Anti-Corruption Bureau (ACB / 1064)',
        instruction: 'Call toll-free 1064 or visit your district ACB/Vigilance office to lodge a formal complaint and arrange a trap operation.'
      },
      {
        number: 4,
        title: 'Lodge grievance on CPGRAMS / State Portal',
        instruction: 'Submit an online grievance on pgportal.gov.in or state vigilance grievance portals for permanent audit tracking.'
      }
    ],
    donts: [
      {
        text: 'Do not pay the bribe willingly or voluntarily',
        reason: 'Voluntarily paying a bribe without reporting is an offence under Section 8 PC Act.'
      },
      {
        text: 'Do not confront the officer aggressively on the spot',
        reason: 'Aggressive confrontations risk retaliatory false charges. Stay calm and report to ACB.'
      },
      {
        text: 'Do not post unverified accusations on social media before reporting',
        reason: 'Alerting the officer destroys the opportunity for ACB to conduct a lawful trap operation.'
      }
    ],
    sayThis: [
      {
        id: 'st-br-1',
        situation: 'Asking for official challan / receipt',
        english: 'Officer, could you please issue an official government receipt or challan for this payment?',
        hindi: 'अधिकारी महोदय, क्या आप कृपया इस भुगतान के लिए एक आधिकारिक सरकारी रसीद या चालान जारी कर सकते हैं?',
        telugu: 'అధికారి గారు, ఈ చెల్లింపుకు దయచేసి అధికారిక ప్రభుత్వ రసీదు లేదా చలాన్ ఇవ్వగలరా?',
        context: 'Polite and effective response when an officer asks for an informal cash settlement.'
      },
      {
        id: 'st-br-2',
        situation: 'Declining informal payment',
        english: 'I would prefer to pay through official online banking or government treasury portal against a formal challan.',
        hindi: 'मैं औपचारिक चालान के विरुद्ध आधिकारिक ऑनलाइन बैंकिंग या सरकारी पोर्टल के माध्यम से भुगतान करना पसंद करूँगा।',
        telugu: 'నేను అధికారిక చలాన్ ఆధారంగా ఆన్‌లైన్ బ్యాంకింగ్ లేదా ప్రభుత్వ పోర్టల్ ద్వారా చెల్లించాలనుకుంటున్నాను.',
        context: 'To make it clear you only transact through lawful government channels.'
      }
    ],
    escalationPath: [
      {
        level: 1,
        title: 'State Anti-Corruption Bureau (ACB / DVAC / Vigilance)',
        designation: 'Specialized Anti-Corruption Agency',
        description: 'Approach District ACB office or call 1064. ACB arranges a legal trap operation using phenolphthalein powder to catch the officer red-handed.',
        action: 'Submit written complaint under Section 7 & 8 PC Act 1988.',
        statutoryBasis: 'Prevention of Corruption Act, 1988'
      },
      {
        level: 2,
        title: 'Centralised Grievance Portal (CPGRAMS)',
        designation: 'DARPG, Government of India',
        description: 'For Central Government public servants (CBI, Central Armed Police, UT Police), lodge a grievance on pgportal.gov.in.',
        action: 'File grievance on pgportal.gov.in with incident details.',
        statutoryBasis: 'Administrative oversight'
      },
      {
        level: 3,
        title: 'Special Judge (CBI / ACB Court)',
        designation: 'Anti-Corruption Special Court',
        description: 'Private complaint can be filed before the Special Judge under PC Act if administrative bodies fail to act.',
        action: 'File private complaint under Section 19 of PC Act.',
        statutoryBasis: 'Section 19, PC Act 1988'
      }
    ],
    sourceIds: ['pc-act-1988', 'cpgrams-portal', 'prakash-singh-pca'],
    keywords: ['bribe', 'corruption', 'money', 'extortion', 'acb', '1064', 'vigilance', 'challan', 'prevention of corruption']
  },

  // 7. CUSTODIAL VIOLENCE / THREATS
  {
    id: 'custodial-violence',
    slug: 'custodial-violence',
    icon: 'AlertTriangle',
    title: 'Police threatened or assaulted me',
    shortDescription: 'Emergency steps for physical assault, mandatory medical examination, Magisterial inquiry under Section 196 BNSS, and NHRC complaints.',
    emergencyTag: 'CRITICAL PROTECTION',
    badgeText: 'Custodial Safety',
    needsLegalAid: true,
    quick30SecSummary: [
      'Physical assault or torture by police is strictly illegal and violates Article 21 of the Constitution.',
      'Immediate Medical Exam: Insist on an immediate examination by a government medical officer under Section 53/54 BNSS to record every injury on the official medico-legal certificate (MLC).',
      'When produced before the Magistrate, tell the Magistrate DIRECTLY about the assault and show physical marks — the Magistrate must order an independent medical examination.',
      'Under BNSS Section 196(4), any custodial death or grievous injury mandates an independent inquiry by a Judicial Magistrate.',
      'Lodge a 24x7 online complaint with the National Human Rights Commission (NHRC / 14433).'
    ],
    constitutionalProtection: {
      article: 'Article 21 & Supreme Court D.K. Basu Directives',
      title: 'Absolute Protection against Custodial Torture & Violence',
      plainExplanation: 'The Supreme Court of India in D.K. Basu v. State of West Bengal held that custodial violence, torture, and assault violate the fundamental right to life and personal dignity under Article 21. No police officer has legal authority to inflict physical violence upon any person in custody.',
      scopeAndExceptions: 'Absolute constitutional protection. Police personnel are personally liable for criminal prosecution and compensation for custodial torture.',
      sourceUrl: 'https://main.sci.gov.in/'
    },
    rights: [
      {
        id: 'r-cv-1',
        title: 'Right to state injuries directly to the Judicial Magistrate',
        plainLanguage: 'When produced before the Magistrate within 24 hours, you have the right to show all injury marks and state how they occurred. The Magistrate is duty-bound to order medical inspection.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023 & Supreme Court Guidelines',
          section: 'Section 53 & 54 BNSS',
          sourceName: 'Supreme Court of India / India Code',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'Always state injuries to the Magistrate directly; police officers cannot enter private chambers during your statement.',
        confidence: 'verified',
        description: 'Right to state custodial violence directly to Magistrate and obtain medical examination under Section 54 BNSS.',
        bnssSection: 'Section 54 BNSS',
        crpcEquivalent: 'Section 54 CrPC',
        sourceId: 'sc-dk-basu'
      },
      {
        id: 'r-cv-2',
        title: 'Mandatory Medico-Legal Certificate (MLC) at Government Hospital',
        plainLanguage: 'You have the right to be examined at a government hospital and receive an official Medico-Legal Certificate (MLC) recording all bruises, cuts, and fractures.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
          section: 'Section 53',
          sourceName: 'Ministry of Law & Justice, Govt of India',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'A medical report prepared immediately creates indispensable legal evidence for prosecuting guilty officers.',
        confidence: 'verified',
        description: 'Mandatory medical examination of arrested person by medical officer.',
        bnssSection: 'Section 53 BNSS',
        sourceId: 'bnss-53'
      },
      {
        id: 'r-cv-3',
        title: 'Judicial Magisterial Inquiry into custodial offences',
        plainLanguage: 'Under Section 196(4) BNSS, any custodial death, disappearance, or grievous violence mandates an independent inquiry conducted directly by a Judicial Magistrate.',
        legalBasis: {
          law: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
          section: 'Section 196(4)',
          sourceName: 'Ministry of Law & Justice, Govt of India',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'Independent judicial inquiry conducted parallel to any administrative inquiry.',
        confidence: 'verified',
        description: 'Mandatory judicial magisterial inquiry into custodial offences under Section 196(4) BNSS.',
        bnssSection: 'Section 196(4) BNSS',
        crpcEquivalent: 'Section 176(1A) CrPC',
        sourceId: 'bnss-196-custodial'
      },
      {
        id: 'r-cv-4',
        title: 'Direct complaint to National & State Human Rights Commissions',
        plainLanguage: 'You or your family members can immediately submit a complaint to the National Human Rights Commission (NHRC) online or by calling toll-free 14433.',
        legalBasis: {
          law: 'Protection of Human Rights Act, 1993',
          section: 'Section 12 & 18',
          sourceName: 'National Human Rights Commission (NHRC)',
          sourceUrl: 'https://hrcnet.nic.in/',
          lastVerified: '16 August 2026',
          sourceType: 'OFFICIAL_GOVERNMENT'
        },
        scopeNote: 'NHRC has powers of a civil court to summon records, order compensation, and direct criminal prosecution.',
        confidence: 'verified',
        description: 'Human rights complaint under Protection of Human Rights Act, 1993.',
        sourceId: 'nhrc-portal'
      }
    ],
    actions: [
      {
        number: 1,
        title: 'Prioritize physical safety and de-escalate',
        instruction: 'Do not retaliate physically. Protect your head and vital organs. Note mentally the names, faces, and ranks of officers involved.'
      },
      {
        number: 2,
        title: 'Demand immediate medical examination',
        instruction: 'Demand to be taken to a government hospital for a Medico-Legal Certificate (MLC) under Section 53 BNSS.'
      },
      {
        number: 3,
        title: 'Show injuries directly to the Magistrate',
        instruction: 'When produced before the Magistrate, immediately lift clothing if necessary and state: "Your Honour, I was physically assaulted in custody by these officers."'
      },
      {
        number: 4,
        title: 'Lodge NHRC & PCA Complaints',
        instruction: 'Have family or your advocate lodge an immediate complaint on the NHRC portal (hrcnet.nic.in) and State Police Complaints Authority.'
      }
    ],
    donts: [
      {
        text: 'Do not stay silent before the Magistrate out of fear of police presence',
        reason: 'The Magistrate’s courtroom is your primary legal safe zone. Once your statement is recorded in the order sheet, police cannot harm you with impunity.'
      },
      {
        text: 'Do not sign clean medical fitness sheets without a proper physical examination',
        reason: 'Ensure the doctor physically notes all external bruises and injuries in the MLC register.'
      },
      {
        text: 'Do not wash away chemical traces or discard torn/bloodstained clothing',
        reason: 'Preserve clothing and physical items in clean plastic bags as forensic evidence.'
      }
    ],
    sayThis: [
      {
        id: 'st-cv-1',
        situation: 'Demanding medical exam',
        english: 'I demand a full medical examination by a registered government doctor under Section 53 of the BNSS.',
        hindi: 'मैं बीएनएसएस की धारा 53 के तहत एक पंजीकृत सरकारी डॉक्टर द्वारा पूर्ण चिकित्सा परीक्षण की मांग करता हूँ।',
        telugu: 'బీఎన్ఎస్ఎస్ సెక్షన్ 53 కింద ప్రభుత్వ వైద్యుని ద్వారా సమగ్ర వైద్య పరీక్ష నిర్వహించాలని నేను డిమాండ్ చేస్తున్నాను.',
        context: 'To create an official medical record of injuries.'
      },
      {
        id: 'st-cv-2',
        situation: 'Statement to Magistrate',
        english: 'Your Honour, I was subjected to physical violence while in police custody. I request an immediate medical inspection and protective custody.',
        hindi: 'न्यायाधीश महोदय, पुलिस हिरासत में मेरे साथ मारपीट की गई है। मैं तत्काल चिकित्सा निरीक्षण और सुरक्षात्मक हिरासत का अनुरोध करता हूँ।',
        telugu: 'గౌరవనీయ న్యాయమూర్తి గారు, పోలీస్ కస్టడీలో నాపై భౌతిక దాడి జరిగింది. తక్షణ వైద్య పరీక్ష మరియు రక్షణ కల్పించాలని కోరుతున్నాను.',
        context: 'To be spoken directly to the Magistrate during the 24-hour production hearing.'
      }
    ],
    escalationPath: [
      {
        level: 1,
        title: 'Duty Judicial Magistrate',
        designation: 'Judicial Magistrate First Class (JMFC)',
        description: 'Inform the Magistrate directly during the remand hearing. The Magistrate can order an independent medical board examination and initiate inquiry under Section 196 BNSS.',
        action: 'State injuries directly to the Magistrate in open court.',
        statutoryBasis: 'BNSS Section 54 & Section 196'
      },
      {
        level: 2,
        title: 'National Human Rights Commission (NHRC)',
        designation: 'Statutory Human Rights Body',
        description: 'File 24x7 online complaint on hrcnet.nic.in or call 14433. NHRC investigates custodial violence and recommends compensation and disciplinary action.',
        action: 'Lodge complaint on hrcnet.nic.in with medical documents.',
        statutoryBasis: 'Protection of Human Rights Act, 1993'
      },
      {
        level: 3,
        title: 'State Police Complaints Authority (PCA)',
        designation: 'Independent Oversight Authority',
        description: 'Headed by a retired High Court / District Judge to investigate grave custodial misconduct.',
        action: 'Submit complaint with medical evidence to District / State PCA.',
        statutoryBasis: 'Supreme Court Directive (Prakash Singh)'
      }
    ],
    sourceIds: ['const-art-21', 'bnss-53', 'bnss-196-custodial', 'nhrc-portal', 'prakash-singh-pca', 'sc-dk-basu'],
    keywords: ['violence', 'assault', 'beaten', 'custodial torture', 'threat', 'mlc', 'medical exam', 'nhrc', 'injuries']
  },

  // 8. UNLAWFUL DETENTION BEYOND 24 HOURS
  {
    id: 'unlawful-detention',
    slug: 'unlawful-detention',
    icon: 'Scale',
    title: 'Held in detention over 24 hours',
    shortDescription: 'Constitutional 24-hour limit, illegal detention remedies, Writ of Habeas Corpus, and emergency legal aid intervention.',
    emergencyTag: 'CONSTITUTIONAL REMEDY',
    badgeText: 'Illegal Detention',
    needsLegalAid: true,
    quick30SecSummary: [
      'Under Article 22(2) of the Constitution and Section 58 BNSS, no person can be detained in police custody beyond 24 hours without a Magistrate’s order (excluding necessary journey time).',
      'Detention beyond 24 hours without Magisterial remand is unconstitutional, illegal, and constitutes wrongful confinement.',
      'Family members should immediately approach the jurisdictional Chief Judicial Magistrate (CJM) or High Court.',
      'Emergency Remedy: File a Writ of Habeas Corpus before the High Court under Article 226 or Supreme Court under Article 32.',
      'Call NALSA Legal Aid Helpline 15100 or approach the District Legal Services Authority (DLSA) for an emergency legal aid advocate.'
    ],
    constitutionalProtection: {
      article: 'Article 22(2) & Article 226 / 32',
      title: 'Constitutional Guarantee of 24-Hour Production & Habeas Corpus',
      plainExplanation: 'Article 22(2) guarantees that every person arrested and detained shall be produced before the nearest Magistrate within 24 hours of arrest, excluding journey time, and cannot be detained beyond that period without authority of a Magistrate. If violated, the High Court or Supreme Court can issue a Writ of Habeas Corpus commanding police to produce the person immediately.',
      scopeAndExceptions: 'Applies to all arrests under ordinary penal law. Excludes preventive detention laws or enemy aliens under Article 22(3).',
      sourceUrl: 'https://www.india.gov.in/my-government/constitution-india'
    },
    rights: [
      {
        id: 'r-ud-1',
        title: 'Constitutional 24-Hour Detention Limit',
        plainLanguage: 'Police custody cannot exceed 24 hours from the exact moment of arrest (excluding necessary journey time) without an express judicial remand order from a Magistrate.',
        legalBasis: {
          law: 'Constitution of India & BNSS, 2023',
          section: 'Article 22(2) & Section 58 BNSS',
          sourceName: 'Constitution of India / India Code',
          sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'Detention beyond 24 hours without production is a direct constitutional violation and renders the detaining officers liable for wrongful confinement.',
        confidence: 'verified',
        description: 'Mandatory production before nearest Magistrate within 24 hours under Article 22(2) and Section 58 BNSS.',
        bnssSection: 'Section 58 BNSS',
        crpcEquivalent: 'Section 57 CrPC',
        constitutionArticle: 'Article 22(2)',
        sourceId: 'bnss-58'
      },
      {
        id: 'r-ud-2',
        title: 'Emergency Remedy: Writ of Habeas Corpus',
        plainLanguage: 'Family members or advocates can file an urgent Writ of Habeas Corpus before the High Court (Article 226) or Supreme Court (Article 32) directing police to immediately produce the detained person.',
        legalBasis: {
          law: 'Constitution of India',
          article: 'Article 226 & Article 32',
          sourceName: 'Supreme Court of India / High Courts',
          sourceUrl: 'https://www.india.gov.in/my-government/constitution-india',
          lastVerified: '16 August 2026',
          sourceType: 'PRIMARY_LAW'
        },
        scopeNote: 'The High Court can appoint an advocate-commissioner to conduct a surprise inspection of the police station lockup.',
        confidence: 'verified',
        description: 'Constitutional writ of Habeas Corpus against illegal detention.',
        constitutionArticle: 'Article 226 & 32',
        sourceId: 'const-art-22'
      },
      {
        id: 'r-ud-3',
        title: 'Free Legal Representation via NALSA / DLSA',
        plainLanguage: 'Eligible persons and families in custody are entitled to free legal aid representation from the District Legal Services Authority (DLSA) under the Legal Services Authorities Act.',
        legalBasis: {
          law: 'Legal Services Authorities Act, 1987',
          section: 'Section 12 & 13',
          sourceName: 'National Legal Services Authority (NALSA)',
          sourceUrl: 'https://nalsa.gov.in/',
          lastVerified: '16 August 2026',
          sourceType: 'LEGAL_AID'
        },
        scopeNote: 'Call NALSA helpline 15100 for immediate legal aid counsel assignment.',
        confidence: 'verified',
        description: 'Free legal aid under Legal Services Authorities Act, 1987.',
        sourceId: 'nalsa-legal-aid'
      }
    ],
    actions: [
      {
        number: 1,
        title: 'Calculate exact elapsed hours',
        instruction: 'Document the exact date, time, and location of the initial arrest/restraint to establish that the 24-hour limit has been exceeded.'
      },
      {
        number: 2,
        title: 'Approach Chief Judicial Magistrate (CJM)',
        instruction: 'Family members should immediately approach the CJM Court or Duty Magistrate stating that the person is being held illegally without production.'
      },
      {
        number: 3,
        title: 'Call NALSA Legal Aid (15100)',
        instruction: 'Call toll-free 15100 or visit the District Legal Services Authority (DLSA) office located in the District Court complex.'
      },
      {
        number: 4,
        title: 'File Habeas Corpus Writ Petition',
        instruction: 'Instruct an advocate to file an urgent Habeas Corpus petition before the High Court under Article 226.'
      }
    ],
    donts: [
      {
        text: 'Do not wait quietly hoping the police will release the person voluntarily',
        reason: 'Unlawful detention beyond 24 hours increases the risk of custodial violence or fabricated documentation. Prompt legal intervention is critical.'
      },
      {
        text: 'Do not negotiate informal cash payments to secure release from illegal custody',
        reason: 'Paying extortion money does not guarantee safety and exposes you to corruption charges.'
      }
    ],
    sayThis: [
      {
        id: 'st-ud-1',
        situation: 'Informing police of 24h limit',
        english: 'Officer, 24 hours have elapsed since my arrest. Under Article 22(2) and Section 58 BNSS, I must be produced before the Magistrate immediately.',
        hindi: 'अधिकारी महोदय, मेरी गिरफ्तारी को 24 घंटे बीत चुके हैं। अनुच्छेद 22(2) और धारा 58 बीएनएसएस के तहत मुझे तुरंत मजिस्ट्रेट के सामने पेश किया जाना चाहिए।',
        telugu: 'అధికారి గారు, నన్ను అరెస్టు చేసి 24 గంటలు దాటింది. ఆర్టికల్ 22(2) మరియు సెక్షన్ 58 బీఎన్ఎస్ఎస్ ప్రకారం నన్ను తక్షణమే మేజిస్ట్రేట్ ముందు హాజరుపరచాలి.',
        context: 'Direct citation of your fundamental constitutional guarantee.'
      },
      {
        id: 'st-ud-2',
        situation: 'Family inquiry at station',
        english: 'We request the General Diary (GD) entry number and the scheduled time for producing my family member before the Judicial Magistrate.',
        hindi: 'हम जनरल डायरी (जीडी) प्रविष्टि संख्या और मेरे परिवार के सदस्य को न्यायिक मजिस्ट्रेट के सामने पेश करने का निर्धारित समय मांगते हैं।',
        telugu: 'మేము జనరల్ డైరీ (GD) ఎంట్రీ నంబరు మరియు నా కుటుంబ సభ్యుడిని జ్యుడీషియల్ మేజిస్ట్రేట్ ముందు హాజరుపరిచే సమయాన్ని కోరుతున్నాము.',
        context: 'Family members asking for formal records at the police station.'
      }
    ],
    escalationPath: [
      {
        level: 1,
        title: 'Jurisdictional Chief Judicial Magistrate (CJM)',
        designation: 'CJM / Duty Magistrate',
        description: 'File an urgent application informing the court of illegal custody without Magisterial remand.',
        action: 'Submit representation before CJM detailing arrest time and place.',
        statutoryBasis: 'Article 22(2) & BNSS Section 58'
      },
      {
        level: 2,
        title: 'High Court (Writ of Habeas Corpus)',
        designation: 'High Court Bench (Article 226)',
        description: 'Urgent constitutional petition directing police to produce the detained person before the court.',
        action: 'File Habeas Corpus petition through advocate or DLSA counsel.',
        statutoryBasis: 'Article 226, Constitution of India'
      },
      {
        level: 3,
        title: 'National Human Rights Commission (NHRC)',
        designation: 'Statutory Body',
        description: 'Lodge urgent complaint of unlawful detention on hrcnet.nic.in or call 14433.',
        action: 'Lodge complaint for illegal custody and human rights violation.',
        statutoryBasis: 'Protection of Human Rights Act, 1993'
      }
    ],
    sourceIds: ['const-art-22', 'bnss-58', 'nalsa-legal-aid', 'nhrc-portal'],
    keywords: ['24 hours', 'unlawful detention', 'illegal custody', 'habeas corpus', 'magistrate', 'remand', 'lockup']
  }
];
