import { Situation } from '../types';

export const situations: Situation[] = [
  {
    id: 'stopped-questioned',
    slug: 'stopped-questioned',
    icon: 'ShieldAlert',
    title: 'Police stopped or questioned me',
    shortDescription: 'What you can ask, how to respond, and when questioning becomes detention.',
    badgeText: 'Everyday Interaction',
    quick30SecSummary: [
      'Stay calm, polite, and maintain respectful eye contact — do not run or make sudden movements.',
      'Politely ask for the officer’s name, designation, and police station if not displayed on their badge.',
      'Ask calmly: "Officer, am I free to go, or am I being detained?"',
      'Provide basic identity (name/address) if asked during lawful duty, but you have the right against self-incrimination.',
      'Remember or note the officer’s name, vehicle number, and location as soon as it is safe.'
    ],
    rights: [
      {
        id: 'r-sq-1',
        title: 'Right to know the officer’s identity',
        description: 'Police officers on duty are required to display clear name tags and identification badges with their designations. You may respectfully ask for their name and posting.',
        bnssSection: 'BNSS Guidelines',
        crpcEquivalent: 'D.K. Basu Guidelines (SC)',
        sourceId: 'sc-dk-basu'
      },
      {
        id: 'r-sq-2',
        title: 'Right to know if you are being detained',
        description: 'You have the right to ask if you are free to leave. Casual questioning is not detention. If you are not detained or arrested, you are generally free to proceed on your way.',
        constitutionArticle: 'Article 21 (Personal Liberty)',
        sourceId: 'const-art-22'
      },
      {
        id: 'r-sq-3',
        title: 'Right to silence on self-incriminating questions',
        description: 'While you should truthfully state your basic identity, you cannot be compelled to confess or answer questions that incriminate you in an offence.',
        constitutionArticle: 'Article 20(3) (Protection against Self-Incrimination)',
        sourceId: 'const-art-20'
      },
      {
        id: 'r-sq-4',
        title: 'Notice instead of arrest for minor offences',
        description: 'Under BNSS, for offences with imprisonment up to 7 years, the police must ordinarily issue a formal Notice of Appearance rather than effecting a routine street arrest.',
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
        instruction: 'Ask why you have been stopped and if there is a specific enquiry or traffic check underway.'
      },
      {
        number: 3,
        title: 'Ask your status',
        instruction: 'Respectfully ask: "Sir/Madam, am I required for any formal proceeding, or am I free to leave?"'
      },
      {
        number: 4,
        title: 'Produce required documents if driving',
        instruction: 'If driving a vehicle, produce your driving licence, registration, and insurance in physical or official DigiLocker/mParivahan format.'
      },
      {
        number: 5,
        title: 'Safely note details',
        instruction: 'Mentally note or jot down the officer’s name, time, exact location, and patrol vehicle number.'
      }
    ],
    donts: [
      {
        text: 'Do not run away or become physically confrontational',
        reason: 'Fleeing creates suspicion and can lead to lawful physical restraint or obstruction charges (Section 221 BNS).'
      },
      {
        text: 'Do not touch or reach into an officer’s vehicle or equipment',
        reason: 'May be perceived as an aggressive action or interference with public duty.'
      },
      {
        text: 'Do not present fake documents or false identities',
        reason: 'Providing forged documents or false identities is a serious criminal offence.'
      },
      {
        text: 'Do not argue aggressively or use abusive language',
        reason: 'De-escalation is your best protection. Keep tone formal and respectful.'
      }
    ],
    sayThis: [
      {
        id: 'st-sq-1',
        situation: 'Asking status',
        english: 'Officer, could you please let me know why I am being stopped, and whether I am free to leave?',
        hindi: 'अधिकारी महोदय, क्या आप कृपया बता सकते हैं कि मुझे क्यों रोका गया है, और क्या मैं जा सकता हूँ?',
        telugu: 'అధికారి గారు, నన్ను ఎందుకు ఆపారో మరియు నేను వెళ్ళవచ్చా లేదా దయచేసి చెప్పగలరా?',
        context: 'Use when stopped on the street or road and unsure whether it is just a routine inquiry.'
      },
      {
        id: 'st-sq-2',
        situation: 'Asking for officer identification',
        english: 'Could you please share your name and police station for my record?',
        hindi: 'क्या आप कृपया अपनी पहचान और थाने का नाम बता सकते हैं?',
        telugu: 'దయచేసి మీ పేరు మరియు పోలీస్ స్టేషన్ వివరాలు తెలియజేయగలరా?',
        context: 'Use politely if the officer does not have a visible nameplate or uniform badge.'
      },
      {
        id: 'st-sq-3',
        situation: 'Notice request',
        english: 'If there is an inquiry against me, could you please issue me a formal written Notice of Appearance under Section 35 BNSS?',
        hindi: 'यदि मेरे खिलाफ कोई पूछताछ है, तो क्या आप मुझे बीएनएसएस की धारा 35 के तहत लिखित नोटिस दे सकते हैं?',
        telugu: 'నాపై ఏదైనా విచారణ ఉంటే, దయచేసి BNSS సెక్షన్ 35 ప్రకారం రాతపూర్వక నోటీసు ఇవ్వగలరా?',
        context: 'Use if the officer insists on taking you to the police station without formal arrest.'
      }
    ],
    escalationPath: [
      {
        level: 1,
        title: 'Duty Officer / Station House Officer (SHO)',
        designation: 'Inspector / Sub-Inspector',
        description: 'Approach the SHO of the local police station to report improper street harassment or unrecorded stopping.',
        action: 'Submit a written representation detailing the incident.'
      },
      {
        level: 2,
        title: 'Supervisory Officer (ACP / DSP)',
        designation: 'Assistant Commissioner / Deputy Superintendent',
        description: 'Supervises all police stations within the sub-division.',
        action: 'File grievance if SHO fails to address wrongful conduct.'
      },
      {
        level: 3,
        title: 'District Police Complaints Authority (PCA)',
        designation: 'Statutory Body (Judicial Chair)',
        description: 'Mandated to enquire into complaints of police harassment, abuse, and non-compliance with guidelines.',
        action: 'Submit formal written complaint with witness statements.'
      }
    ],
    sourceIds: ['sc-dk-basu', 'bnss-35-notice', 'const-art-20', 'const-art-22'],
    keywords: ['stopped', 'questioned', 'street', 'interrogation', 'checking', 'traffic', 'inquiry', 'identity', 'dk basu', 'station']
  },
  {
    id: 'arrest-detention',
    slug: 'arrest-detention',
    icon: 'Lock',
    title: 'I am being arrested or detained',
    shortDescription: 'Know what police must tell you and what you should do immediately.',
    emergencyTag: 'Critical Safeguards',
    badgeText: 'Important',
    quick30SecSummary: [
      'Ask clearly: "Officer, on what specific grounds and under what section am I being arrested?"',
      'Ask for the mandatory Arrest Memo (Panchnama) to be prepared and signed in front of a witness.',
      'Exercise your right to have one family member or friend informed immediately of your arrest and location.',
      'Ask to meet an advocate/lawyer of your choice during interrogation.',
      'Demand mandatory medical examination (Section 53 BNSS) and production before a Magistrate within 24 hours.'
    ],
    rights: [
      {
        id: 'r-ad-1',
        title: 'Right to know full grounds of arrest & bail eligibility',
        description: 'Police must immediately inform you of the exact offence and reasons for arrest. If the offence is bailable, police must inform you of your right to be released on bail.',
        bnssSection: 'Section 47 BNSS',
        crpcEquivalent: 'Section 50 CrPC',
        sourceId: 'bnss-47'
      },
      {
        id: 'r-ad-2',
        title: 'Right to inform family or friend immediately',
        description: 'Police have a statutory duty to inform a relative, friend, or nominated person about your arrest and the exact police station where you are detained.',
        bnssSection: 'Section 48 BNSS',
        crpcEquivalent: 'Section 50A CrPC',
        sourceId: 'bnss-48'
      },
      {
        id: 'r-ad-3',
        title: 'Right to consult an advocate of your choice',
        description: 'You are legally entitled to meet and consult with an advocate of your choice during questioning. If you cannot afford one, you are entitled to free legal aid from DLSA.',
        bnssSection: 'Section 38 BNSS',
        crpcEquivalent: 'Section 41D CrPC',
        constitutionArticle: 'Article 22(1)',
        sourceId: 'bnss-38'
      },
      {
        id: 'r-ad-4',
        title: 'Production before Magistrate within 24 hours',
        description: 'Under both BNSS and the Constitution, you must be produced before the nearest Judicial Magistrate within 24 hours of arrest (excluding travel time). Detention beyond 24 hours without magistrate order is illegal.',
        bnssSection: 'Section 58 BNSS',
        crpcEquivalent: 'Section 57 CrPC',
        constitutionArticle: 'Article 22(2)',
        sourceId: 'bnss-58'
      },
      {
        id: 'r-ad-5',
        title: 'Mandatory medical examination upon arrest',
        description: 'Every arrested person must be medically examined by a registered medical officer immediately upon arrest to document physical condition and record any pre-existing or custodial injuries.',
        bnssSection: 'Section 53 BNSS',
        crpcEquivalent: 'Section 54 CrPC',
        sourceId: 'bnss-53'
      },
      {
        id: 'r-ad-6',
        title: 'Special protections for women',
        description: 'Except in exceptional circumstances with prior written permission of a Judicial Magistrate, no woman can be arrested after sunset and before sunrise. Arrest must be carried out only by a female officer.',
        bnssSection: 'Section 43(5) BNSS',
        crpcEquivalent: 'Section 46(4) CrPC',
        sourceId: 'bnss-43-women'
      }
    ],
    actions: [
      {
        number: 1,
        title: 'Stay calm and do not resist physically',
        instruction: 'Physical resistance does not stop arrest and exposes you to additional charges. Cooperate peacefully while invoking your legal rights.',
        urgent: true
      },
      {
        number: 2,
        title: 'Ask for the Grounds of Arrest',
        instruction: 'Politely state: "Please inform me of the grounds of arrest and whether the offence is bailable under Section 47 BNSS."',
        urgent: true
      },
      {
        number: 3,
        title: 'Demand family notification',
        instruction: 'Provide the name and phone number of your family member/advocate and request the officer to inform them immediately under Section 48 BNSS.',
        urgent: true
      },
      {
        number: 4,
        title: 'Request to meet an advocate',
        instruction: 'Request access to consult your advocate under Section 38 BNSS. If you have no lawyer, ask for the Legal Aid Defense Counsel / DLSA duty lawyer.'
      },
      {
        number: 5,
        title: 'Insist on an Arrest Memo (Panchnama)',
        instruction: 'Ensure the arrest memo notes the exact date, time, location, and is signed by at least one witness (a family member or respectable local resident).'
      },
      {
        number: 6,
        title: 'Note physical condition before medical test',
        instruction: 'During medical examination (Section 53 BNSS), honestly inform the doctor of all pre-existing conditions and any injuries.'
      }
    ],
    donts: [
      {
        text: 'Do not physically resist, push, or attempt to flee',
        reason: 'May cause injury and gives grounds for additional charges under Section 221 & 132 BNS.'
      },
      {
        text: 'Do not sign blank papers or unread confession statements',
        reason: 'Read every document thoroughly. If forced or unable to read, state your objection calmly.'
      },
      {
        text: 'Do not offer money or settle unofficially',
        reason: 'Bribery is a criminal offence under Prevention of Corruption Act and compromises your defence.'
      },
      {
        text: 'Do not reveal passwords or unlock devices without legal consultation',
        reason: 'Consult your advocate regarding self-incrimination safeguards and proper seizure procedures.'
      }
    ],
    sayThis: [
      {
        id: 'st-ad-1',
        situation: 'Asking for grounds of arrest',
        english: 'Officer, could you please tell me the specific grounds for my arrest and whether this is a bailable offence under Section 47 BNSS?',
        hindi: 'अधिकारी महोदय, क्या आप कृपया मुझे मेरी गिरफ्तारी के कारण और धारा 47 बीएनएसएस के तहत यह ज़मानती अपराध है या नहीं, बता सकते हैं?',
        telugu: 'అధికారి గారు, నన్ను ఏ కారణంపై అరెస్టు చేస్తున్నారు మరియు BNSS సెక్షన్ 47 ప్రకారం ఇది బెయిలబుల్ నేరమా కాదా దయచేసి చెప్పండి?',
        context: 'Say this immediately upon being told you are under arrest.'
      },
      {
        id: 'st-ad-2',
        situation: 'Demanding family notification',
        english: 'Under Section 48 BNSS, I request you to please inform my family member [Name: ____, Phone: ____] about my arrest and where I am being kept.',
        hindi: 'बीएनएसएस की धारा 48 के तहत, मैं अनुरोध करता हूँ कि मेरे परिवार के सदस्य [नाम: ____, फोन: ____] को मेरी गिरफ्तारी और स्थान के बारे में सूचित किया जाए।',
        telugu: 'BNSS సెక్షన్ 48 ప్రకారం, నా కుటుంబ సభ్యుడికి [పేరు: ____, ఫోన్: ____] నా అరెస్టు మరియు నన్ను ఎక్కడ ఉంచారో సమాచారం ఇవ్వాలని కోరుతున్నాను.',
        context: 'Say this to ensure your location is officially registered with relatives.'
      },
      {
        id: 'st-ad-3',
        situation: 'Requesting advocate',
        english: 'Under Section 38 BNSS and Article 22(1), I would like to consult with an advocate of my choice before answering detailed questions.',
        hindi: 'बीएनएसएस की धारा 38 और संविधान के अनुच्छेद 22(1) के तहत, मैं विस्तृत सवालों के जवाब देने से पहले अपने वकील से सलाह लेना चाहता हूँ।',
        telugu: 'BNSS సెక్షన్ 38 మరియు ఆర్టికల్ 22(1) ప్రకారం, నేను సమాధానాలు ఇచ్చే ముందు నా న్యాయవాదితో మాట్లాడాలనుకుంటున్నాను.',
        context: 'Say this if pressured to give statements or sign admissions.'
      },
      {
        id: 'st-ad-4',
        situation: 'Sunset rule for women',
        english: 'Under Section 43(5) BNSS, a woman cannot be arrested after sunset and before sunrise without prior written permission of a Judicial Magistrate.',
        hindi: 'बीएनएसएस की धारा 43(5) के तहत, न्यायिक मजिस्ट्रेट की पूर्व लिखित अनुमति के बिना सूर्यास्त के बाद और सूर्योदय से पहले किसी महिला को गिरफ्तार नहीं किया जा सकता।',
        telugu: 'BNSS సెక్షన్ 43(5) ప్రకారం, జ్యుడీషియల్ మేజిస్ట్రేట్ ముందస్తు అనుమతి లేకుండా సూర్యాస్తమయం తర్వాత మరియు సూర్యోదయానికి ముందు మహిళను అరెస్టు చేయకూడదు.',
        context: 'Say this if an attempt is made to detain a woman after sunset.'
      }
    ],
    escalationPath: [
      {
        level: 1,
        title: 'Duty Magistrate / Judicial Magistrate First Class (JMFC)',
        designation: 'Judicial Officer',
        description: 'You MUST be produced before the Magistrate within 24 hours. Inform the Magistrate directly if you were mistreated, not given medical aid, or detained illegally.',
        action: 'State all grievances openly when produced before the Magistrate.',
        timeframe: 'Mandatory within 24 hours'
      },
      {
        level: 2,
        title: 'District Legal Services Authority (DLSA)',
        designation: 'Legal Aid Secretary / Remand Advocate',
        description: 'Provides free legal aid and counsel representation at the time of remand.',
        action: 'Request the Magistrate or DLSA front office for a free defense advocate.'
      },
      {
        level: 3,
        title: 'High Court / Supreme Court (Habeas Corpus)',
        designation: 'Constitutional Court',
        description: 'If a person is detained beyond 24 hours without production before a Magistrate, relatives or advocates can file a Habeas Corpus petition under Article 226/32.',
        action: 'File emergency writ petition for immediate production.'
      }
    ],
    sourceIds: ['bnss-47', 'bnss-48', 'bnss-38', 'bnss-58', 'bnss-53', 'bnss-43-women', 'const-art-22', 'sc-dk-basu'],
    keywords: ['arrest', 'detained', 'custody', 'lockup', 'jail', 'remand', 'magistrate', 'handcuffs', 'lawyer', 'bail', 'grounds']
  },
  {
    id: 'fir-refusal',
    slug: 'fir-refusal',
    icon: 'FileText',
    title: 'Police refused to register my FIR',
    shortDescription: 'Understand the escalation process, Zero FIR, and your next legal remedies.',
    badgeText: 'Common Issue',
    quick30SecSummary: [
      'Registration of FIR is MANDATORY for all cognizable offences (Lalita Kumari SC ruling & Section 173 BNSS).',
      'If the incident occurred outside local station jurisdiction, police MUST still register a "Zero FIR" and transfer it.',
      'Always submit your complaint in writing and obtain a stamped receiving copy or acknowledgment receipt (General Diary / CSR).',
      'If refused by the local police station, send your written complaint by Registered Post / Speed Post to the Superintendent of Police (SP / DCP) under Section 173(4) BNSS.',
      'If the SP does not act, file an application before the Judicial Magistrate under Section 175(3) BNSS.'
    ],
    rights: [
      {
        id: 'r-fir-1',
        title: 'Mandatory FIR for cognizable offences',
        description: 'Under Section 173 BNSS, every officer in charge of a police station is bound by law to register an FIR when information discloses a cognizable offence. Refusal to register is a punishable dereliction of duty.',
        bnssSection: 'Section 173(1) BNSS',
        crpcEquivalent: 'Section 154(1) CrPC',
        landmarkCase: 'Lalita Kumari v. Govt. of U.P. (Supreme Court Constitution Bench)',
        sourceId: 'sc-lalita-kumari'
      },
      {
        id: 'r-fir-2',
        title: 'Right to Zero FIR (Jurisdiction is not a ground for refusal)',
        description: 'A police station CANNOT refuse to register an FIR on the grounds that the crime took place outside their territorial jurisdiction. They must register a "Zero FIR", initiate immediate preliminary steps, and transfer it to the concerned station.',
        bnssSection: 'Section 173(1) BNSS',
        sourceId: 'bnss-173'
      },
      {
        id: 'r-fir-3',
        title: 'Right to receive a free copy of the registered FIR',
        description: 'A copy of the FIR as recorded must be given forthwith, free of cost, to the informant or complainant.',
        bnssSection: 'Section 173(2) BNSS',
        crpcEquivalent: 'Section 154(2) CrPC',
        sourceId: 'bnss-173'
      },
      {
        id: 'r-fir-4',
        title: 'Right to electronic complaint (e-FIR)',
        description: 'Information may now be given electronically under BNSS Section 173(1)(ii), to be taken on record upon being signed by the informant within three days.',
        bnssSection: 'Section 173(1) BNSS',
        sourceId: 'bnss-173'
      }
    ],
    actions: [
      {
        number: 1,
        title: 'Submit in writing with duplicate copy',
        instruction: 'Write out the full incident clearly with date, time, location, persons involved, and specific acts. Carry two copies.'
      },
      {
        number: 2,
        title: 'Insist on an acknowledgment receipt',
        instruction: 'Ask the duty officer to stamp and sign your duplicate copy or provide a Community Service Register (CSR) / Daily Diary entry acknowledgment.'
      },
      {
        number: 3,
        title: 'Cite the Zero FIR mandate if jurisdiction is raised',
        instruction: 'If the officer says "this belongs to another police station", politely cite Section 173 BNSS and request a Zero FIR.'
      },
      {
        number: 4,
        title: 'Escalate to Superintendent of Police (SP/DCP)',
        instruction: 'If refused, send the complaint in writing by Registered Post with Acknowledgment Due (RPAD) or Speed Post to the District SP / DCP under Section 173(4) BNSS.'
      },
      {
        number: 5,
        title: 'Approach the Judicial Magistrate',
        instruction: 'If the SP does not direct investigation within reasonable time, engage an advocate to file an application under Section 175(3) BNSS before the Magistrate.'
      }
    ],
    donts: [
      {
        text: 'Do not leave without a signed receiving copy or receipt number',
        reason: 'Without a written acknowledgment, you cannot prove the date and time you approached the police.'
      },
      {
        text: 'Do not sign compromise or settlement papers under pressure',
        reason: 'Police cannot force you to compromise a cognizable criminal offence.'
      },
      {
        text: 'Do not exaggerate or add false allegations to make the case stronger',
        reason: 'False statements can harm your credibility in court and attract counter-prosecution (Section 217 BNS).'
      },
      {
        text: 'Do not lose your postal receipts / tracking proofs of escalated letters',
        reason: 'Postal receipts serve as vital evidence before the Magistrate under Section 175(3) BNSS.'
      }
    ],
    sayThis: [
      {
        id: 'st-fir-1',
        situation: 'Requesting FIR registration',
        english: 'Officer, as this information discloses a cognizable offence, I request you to record the FIR under Section 173 BNSS as mandated by the Supreme Court in the Lalita Kumari judgment.',
        hindi: 'अधिकारी महोदय, चूँकि यह संज्ञेय अपराध की जानकारी है, मैं सुप्रीम कोर्ट के ललिता कुमारी निर्णय और धारा 173 बीएनएसएस के तहत एफआईआर दर्ज करने का अनुरोध करता हूँ।',
        telugu: 'అధికారి గారు, ఇది కాగ్నిజబుల్ నేరం కాబట్టి, సుప్రీంకోర్టు లలితా కుమారి తీర్పు మరియు BNSS సెక్షన్ 173 ప్రకారం ఎఫ్.ఐ.ఆర్ నమోదు చేయాలని కోరుతున్నాను.',
        context: 'Use when the duty officer hesitates or avoids filing the FIR.'
      },
      {
        id: 'st-fir-2',
        situation: 'Requesting a Zero FIR',
        english: 'Even if the incident occurred outside this station’s territorial limits, kindly register a Zero FIR under Section 173 BNSS and forward it to the concerned police station.',
        hindi: 'भले ही घटना इस थाने के क्षेत्र से बाहर हुई हो, कृपया धारा 173 बीएनएसएस के तहत जीरो एफआईआर दर्ज कर संबंधित थाने को प्रेषित करें।',
        telugu: 'ఈ ఘటన మీ పరిధి వెలుపల జరిగినప్పటికీ, దయచేసి BNSS సెక్షన్ 173 ప్రకారం జీరో ఎఫ్.ఐ.ఆర్ నమోదు చేసి సంబంధిత స్టేషన్‌కు పంపండి.',
        context: 'Use when police claim "this is not our jurisdiction".'
      },
      {
        id: 'st-fir-3',
        situation: 'Demanding free FIR copy',
        english: 'Under Section 173(2) BNSS, I am entitled to receive a copy of the registered FIR immediately and free of cost. Could you please provide it?',
        hindi: 'बीएनएसएस की धारा 173(2) के तहत मुझे दर्ज एफआईआर की प्रति तुरंत और निःशुल्क प्राप्त करने का अधिकार है। कृपया मुझे इसकी प्रति दें।',
        telugu: 'BNSS సెక్షన్ 173(2) ప్రకారం ఉచితంగా ఎఫ్.ఐ.ఆర్ కాపీ వెంటనే పొందే హక్కు నాకు ఉంది. దయచేసి కాపీ ఇవ్వండి.',
        context: 'Use after FIR has been registered in the system.'
      }
    ],
    escalationPath: [
      {
        level: 1,
        title: 'Local Police Station / SHO',
        designation: 'Station House Officer',
        description: 'Submit written complaint in duplicate and request official acknowledgment / FIR number.',
        action: 'In-person submission with stamped receiving copy.'
      },
      {
        level: 2,
        title: 'Superintendent of Police (SP / DCP)',
        designation: 'District Police Chief',
        description: 'Send complaint in writing via Speed Post / Registered Post under Section 173(4) BNSS. The SP can investigate or direct an officer to investigate.',
        action: 'Postal dispatch with tracking proof.',
        timeframe: 'Step 2 if SHO refuses'
      },
      {
        level: 3,
        title: 'Judicial Magistrate First Class (JMFC)',
        designation: 'Magistrate Court',
        description: 'File an application under Section 175(3) BNSS supported by an affidavit and postal proofs. The Magistrate can direct the police to register an FIR and submit an investigation report.',
        action: 'Court petition through an advocate.',
        timeframe: 'Step 3 if SP does not act'
      },
      {
        level: 4,
        title: 'State Police Complaints Authority / High Court (Writ of Mandamus)',
        designation: 'Judicial Authority',
        description: 'High Court can issue a writ directing police action and initiating disciplinary proceedings against delinquent officers under Section 199 BNS (dereliction of duty).',
        action: 'Writ Petition under Article 226.'
      }
    ],
    specialGuide: {
      title: 'What is a Zero FIR?',
      content: 'A Zero FIR is an FIR that can be registered at ANY police station, regardless of where the crime took place. It is numbered as "0" (Zero) and later transferred to the police station that has actual territorial jurisdiction over the offence. This prevents crucial evidence and witness testimonies from being lost due to jurisdictional disputes.',
      points: [
        'Mandated across India by the Ministry of Home Affairs and recognized under Section 173 BNSS.',
        'Police at any station must register it, provide immediate medical or emergency aid if needed, and transfer the case file.',
        'Especially critical for crimes against women, road accidents, violent assaults, and cybercrimes.'
      ]
    },
    sourceIds: ['bnss-173', 'bnss-175-magistrate', 'sc-lalita-kumari'],
    keywords: ['fir', 'complaint', 'refused', 'police station', 'report', 'zero fir', 'sho', 'sp', 'magistrate', 'crime', 'written']
  },
  {
    id: 'search-property',
    slug: 'search-property',
    icon: 'Search',
    title: 'Police want to search me or my property',
    shortDescription: 'Understand searches, warrants, documentation, and mandatory video safeguards.',
    badgeText: 'Property & Privacy',
    quick30SecSummary: [
      'Politely ask to see the Search Warrant or ask the officer under what legal authority the search is being made.',
      'Ask the searching officers to show their name badges and offer to be searched themselves before entering.',
      'Searches of premises MUST be conducted in the presence of at least two independent respectable local witnesses (Panchnama under Section 100 BNSS).',
      'Under Section 105 BNSS, search and seizure processes must be recorded via audio-video electronic means.',
      'Demand an immediate signed Seizure List / Panchnama copy for every single item taken.'
    ],
    rights: [
      {
        id: 'r-sp-1',
        title: 'Mandatory electronic audio-video recording (BNSS Reform)',
        description: 'Under Section 105 BNSS, the entire search of a place or seizure of any property/device MUST be recorded through audio-video electronic means (mobile or camera) and forwarded to the Magistrate.',
        bnssSection: 'Section 105 BNSS',
        sourceId: 'bnss-105-search'
      },
      {
        id: 'r-sp-2',
        title: 'Search in presence of two independent witnesses',
        description: 'Police must call upon two or more independent and respectable inhabitants of the locality to attend and witness the search. The seizure list must be signed by these witnesses.',
        bnssSection: 'Section 100 BNSS',
        crpcEquivalent: 'Section 100 CrPC',
        sourceId: 'bnss-100-witnesses'
      },
      {
        id: 'r-sp-3',
        title: 'Right to receive a free signed copy of the Seizure List',
        description: 'A complete inventory of all articles, documents, and valuables seized must be drawn up on the spot and a signed copy delivered to the occupant of the premises.',
        bnssSection: 'Section 100(6) BNSS',
        sourceId: 'bnss-100-witnesses'
      },
      {
        id: 'r-sp-4',
        title: 'Body search of women by female officers only',
        description: 'Whenever it is necessary to cause a female to be searched, the search shall be made by another female officer with strict regard to decency.',
        bnssSection: 'Section 49(2) BNSS',
        crpcEquivalent: 'Section 51(2) CrPC',
        sourceId: 'bnss-43-women'
      }
    ],
    actions: [
      {
        number: 1,
        title: 'Ask to inspect the search warrant',
        instruction: 'Politely ask: "Sir/Madam, do you have a search warrant from the court, or are you conducting a search under emergency provisions of Section 185 BNSS?"'
      },
      {
        number: 2,
        title: 'Request police personal search first',
        instruction: 'Politely request the police officers to allow you to inspect their pockets/hands before entering to ensure no planted items.'
      },
      {
        number: 3,
        title: 'Ensure independent witnesses are present',
        instruction: 'Check that two independent neighbors or respectable locals are witnessing the search and recording their observations.'
      },
      {
        number: 4,
        title: 'Verify audio-video recording under Section 105 BNSS',
        instruction: 'Note if the officers are recording the proceedings electronically as required by law.'
      },
      {
        number: 5,
        title: 'Read and verify the Seizure Memo before signing',
        instruction: 'Carefully match every item listed with what was actually taken. Demand a signed duplicate copy on the spot.'
      }
    ],
    donts: [
      {
        text: 'Do not physically obstruct or block officers executing a lawful warrant',
        reason: 'Obstructing public servants is an offence under Section 221 BNS.'
      },
      {
        text: 'Do not allow unrecorded searches of closed cupboards without your presence',
        reason: 'Accompany officers into each room alongside the independent witnesses.'
      },
      {
        text: 'Do not sign an incomplete or blank Seizure List (Panchnama)',
        reason: 'Items added later without your knowledge can be falsely attributed.'
      },
      {
        text: 'Do not allow female family members to be bodily searched by male officers',
        reason: 'Male officers are strictly prohibited by law from bodily searching female persons.'
      }
    ],
    sayThis: [
      {
        id: 'st-sp-1',
        situation: 'Asking for warrant',
        english: 'Officer, could you please show the search warrant issued by the court, or state the specific section and reason for this search?',
        hindi: 'अधिकारी महोदय, क्या आप कृपया अदालत द्वारा जारी सर्च वारंट दिखा सकते हैं, या इस तलाशी का कारण बता सकते हैं?',
        telugu: 'అధికారి గారు, దయచేసి కోర్టు జారీ చేసిన సెర్చ్ వారెంట్ చూపించగలరా లేదా ఈ సోదాలకు గల కారణం తెలియజేయగలరా?',
        context: 'Say this before opening premises or admitting officers.'
      },
      {
        id: 'st-sp-2',
        situation: 'Requesting independent witnesses and recording',
        english: 'Under Section 100 and Section 105 BNSS, please ensure that two independent local witnesses are present and the search is recorded electronically.',
        hindi: 'बीएनएसएस की धारा 100 और 105 के तहत, कृपया दो स्वतंत्र स्थानीय गवाहों की उपस्थिति और वीडियोग्राफी सुनिश्चित करें।',
        telugu: 'BNSS సెక్షన్ 100 మరియు 105 ప్రకారం, దయచేసి ఇద్దరు స్థానిక స్వతంత్ర సాక్షుల సమక్షంలో మరియు వీడియో రికార్డింగ్ చేస్తూ సోదాలు జరపండి.',
        context: 'Say this during house or office searches.'
      },
      {
        id: 'st-sp-3',
        situation: 'Demanding copy of seizure memo',
        english: 'Please provide me a signed copy of the seizure list (Panchnama) with all seized items before leaving, as per Section 100(6) BNSS.',
        hindi: 'कृपया जाने से पहले धारा 100(6) बीएनएसएस के तहत सभी जब्त सामानों की हस्ताक्षरित सूची (जब्तीनामा) की प्रति मुझे दें।',
        telugu: 'BNSS సెక్షన్ 100(6) ప్రకారం స్వాధీనం చేసుకున్న వస్తువుల జాబితా (పంచనామా) కాపీని దయచేసి నాకు ఇవ్వండి.',
        context: 'Say this as soon as items are picked up by officers.'
      }
    ],
    escalationPath: [
      {
        level: 1,
        title: 'Superintendent of Police / DCP',
        designation: 'Supervising Authority',
        description: 'Report illegal, unrecorded, or warrantless searches without reasonable cause.',
        action: 'Submit written complaint along with CCTV/witness statements.'
      },
      {
        level: 2,
        title: 'Judicial Magistrate / Special Court',
        designation: 'Judicial Authority',
        description: 'Challenge illegal search and pray for return of seized property (Supurdari application under Section 497/503 BNSS).',
        action: 'File application through an advocate.'
      },
      {
        level: 3,
        title: 'High Court (Quashing / Civil Damages)',
        designation: 'Constitutional Court',
        description: 'Writ petition for gross violation of privacy and compensation for illegal seizure.',
        action: 'Writ Petition under Article 226.'
      }
    ],
    sourceIds: ['bnss-105-search', 'bnss-100-witnesses', 'bnss-43-women'],
    keywords: ['search', 'warrant', 'house', 'property', 'vehicle', 'panchnama', 'seizure', 'bags', 'privacy', 'witnesses']
  },
  {
    id: 'phone-belongings-seized',
    slug: 'phone-belongings-seized',
    icon: 'Smartphone',
    title: 'Police seized my phone or belongings',
    shortDescription: 'Understand digital seizures, hash value safeguards, and seizure memos.',
    badgeText: 'Digital Privacy',
    quick30SecSummary: [
      'Police cannot randomly snatch or unlock your phone during casual street questioning without a legal nexus to an investigation.',
      'If your phone or laptop is seized, demand a formal Seizure Memo with IMEI/Serial numbers and exact date/time.',
      'Under Section 105 BNSS, seizure of digital devices must be videographed/recorded electronically.',
      'Ask for the Hash Value of the digital device to be generated and recorded to prevent data tampering or planted files.',
      'You are not required to disclose passwords for personal social media / chat accounts without a specific judicial order.'
    ],
    rights: [
      {
        id: 'r-pb-1',
        title: 'Right to a detailed Seizure Memo with unique identifiers',
        description: 'Every electronic device seized must be catalogued with its IMEI number, make, model, serial number, and physical condition to prevent substitution or theft.',
        bnssSection: 'Section 100 & 105 BNSS',
        sourceId: 'bnss-105-search'
      },
      {
        id: 'r-pb-2',
        title: 'Right to Hash Value generation (Anti-Tampering Safeguard)',
        description: 'To protect against data manipulation or planting of files during custody, standard forensic protocols require generating and recording the cryptographic hash value of seized digital media in the presence of witnesses.',
        bnssSection: 'Digital Forensics Protocols / Section 105 BNSS',
        sourceId: 'bnss-105-search'
      },
      {
        id: 'r-pb-3',
        title: 'Protection of personal privacy and non-incrimination',
        description: 'Supreme Court has affirmed that personal digital devices contain intimate personal data protected under Article 21 (Puttaswamy Judgment). Random or exploratory searches without an FIR or warrant are improper.',
        constitutionArticle: 'Article 21 (Right to Privacy) & Article 20(3)',
        sourceId: 'const-art-20'
      }
    ],
    actions: [
      {
        number: 1,
        title: 'Ask for the specific FIR / Investigation reason',
        instruction: 'Ask why your device is relevant to an ongoing inquiry: "Under what FIR or legal proceedings is my phone being seized?"'
      },
      {
        number: 2,
        title: 'Insist on a complete Seizure Memo',
        instruction: 'Ensure the memo lists the IMEI number, brand, color, screen condition, and SIM card details.'
      },
      {
        number: 3,
        title: 'Request device to be sealed in an evidence bag',
        instruction: 'Ask that the phone be placed in a tamper-evident pouch or envelope and signed across the seal by you and the witnesses.'
      },
      {
        number: 4,
        title: 'Apply for interim custody (Supurdari) in court',
        instruction: 'Instruct your advocate to file an application before the Magistrate for return of your device after forensic mirroring.'
      }
    ],
    donts: [
      {
        text: 'Do not surrender your phone without an official written acknowledgment',
        reason: 'Without a seizure memo, officers may deny having taken the device.'
      },
      {
        text: 'Do not attempt to remotely wipe or factory-reset the seized device',
        reason: 'Remote wiping of evidence under investigation can lead to serious charges of evidence destruction (Section 238 BNS).'
      },
      {
        text: 'Do not hand over passwords to unauthorized third parties or unofficial agents',
        reason: 'Protect your financial apps and sensitive personal accounts.'
      }
    ],
    sayThis: [
      {
        id: 'st-pb-1',
        situation: 'Asking reason for digital seizure',
        english: 'Officer, under what FIR or investigation order are you seizing my phone, and will you be issuing an official seizure memo with the IMEI number?',
        hindi: 'अधिकारी महोदय, किस एफआईआर या जांच आदेश के तहत मेरा फोन जब्त किया जा रहा है, और क्या आप आईएमईआई नंबर के साथ जब्ती मेमो देंगे?',
        telugu: 'అధికారి గారు, ఏ ఎఫ్.ఐ.ఆర్ లేదా దర్యాప్తు ప్రకారం నా ఫోన్‌ను స్వాధీనం చేసుకుంటున్నారు మరియు IMEI నంబర్‌తో కూడిన రసీదు ఇస్తారా?',
        context: 'Say this when police ask you to hand over your smartphone.'
      },
      {
        id: 'st-pb-2',
        situation: 'Requesting hash value and sealing',
        english: 'Please seal the device in a tamper-proof evidence pouch and record its hash value and serial number in the Panchnama in front of witnesses.',
        hindi: 'कृपया डिवाइस को सीलबंद पाउच में रखें और गवाहों के सामने पंचनामे में इसका हैश वैल्यू और सीरियल नंबर दर्ज करें।',
        telugu: 'దయచేసి పరికరాన్ని సీల్ చేసి, సాక్షుల సమక్షంలో పంచనామాలో దాని హ్యాష్ విలువ మరియు సీరియల్ నంబర్‌ను నమోదు చేయండి.',
        context: 'Use to prevent tampering with digital evidence.'
      }
    ],
    escalationPath: [
      {
        level: 1,
        title: 'Investigating Officer / SHO',
        designation: 'Police Station',
        description: 'Demand a copy of the Seizure Memo signed by witnesses.',
        action: 'In-person request.'
      },
      {
        level: 2,
        title: 'Judicial Magistrate Court',
        designation: 'Judicial Magistrate',
        description: 'File an application for return of property (Supurdari) under Section 497/503 BNSS on appropriate security undertaking.',
        action: 'Legal petition by advocate.'
      },
      {
        level: 3,
        title: 'Cyber / Digital Cell Grievance / High Court',
        designation: 'High Court',
        description: 'Challenge indiscriminate fishing expeditions or violation of privacy without warrant.',
        action: 'Writ Petition under Article 226.'
      }
    ],
    sourceIds: ['bnss-105-search', 'bnss-100-witnesses', 'const-art-20'],
    keywords: ['phone', 'mobile', 'seized', 'laptop', 'device', 'whatsapp', 'password', 'imei', 'hash', 'photos', 'privacy']
  },
  {
    id: 'threatened-assaulted',
    slug: 'threatened-assaulted',
    icon: 'AlertTriangle',
    title: 'Police threatened, abused or assaulted me',
    shortDescription: 'Protect yourself, preserve medical evidence, and understand complaint options.',
    emergencyTag: 'Safety & Redress',
    badgeText: 'Emergency Protection',
    quick30SecSummary: [
      'Your physical safety is the first priority: do not retaliate physically or use counter-threats.',
      'Get an immediate Medical Examination (MLC - Medico-Legal Certificate) at a government hospital to document all injuries.',
      'Take photographs of bruises, cuts, and torn clothing, and save any CCTV footage or witness contacts.',
      'Inform the Judicial Magistrate directly at the time of production about any physical abuse or threats.',
      'File an official complaint with the District/State Police Complaints Authority (PCA) and National Human Rights Commission (NHRC).'
    ],
    rights: [
      {
        id: 'r-ta-1',
        title: 'Absolute right against torture and custodial violence',
        description: 'Police brutality, torture, and physical abuse are illegal and violate Fundamental Rights under Article 21. Officers indulging in custodial violence face criminal prosecution under BNS and NHRC penalties.',
        constitutionArticle: 'Article 21 (Right to Life & Dignity)',
        sourceId: 'sc-dk-basu'
      },
      {
        id: 'r-ta-2',
        title: 'Right to state injuries to the Magistrate',
        description: 'When produced before the Judicial Magistrate, you have the full right to openly show your injuries and state that you were assaulted. The Magistrate is required to order an immediate independent medical checkup.',
        bnssSection: 'Section 53 & 58 BNSS',
        sourceId: 'bnss-53'
      },
      {
        id: 'r-ta-3',
        title: 'Mandatory NHRC reporting for custodial offences',
        description: 'Any serious injury or custodial excess must be reported to the National Human Rights Commission within 24 hours under NHRC guidelines.',
        organization: 'NHRC',
        sourceId: 'nhrc-guidelines'
      }
    ],
    actions: [
      {
        number: 1,
        title: 'De-escalate and protect your safety',
        instruction: 'Do not escalate tensions or fight back physically. Try to remain calm and observe the names/faces of the officers.'
      },
      {
        number: 2,
        title: 'Seek immediate medical attention (MLC)',
        instruction: 'Go directly to a Government / District Hospital casualty ward and request a Medico-Legal Examination (MLC) recording all injuries with exact descriptions and cause.'
      },
      {
        number: 3,
        title: 'Preserve physical and digital evidence',
        instruction: 'Take clear, timestamped photos and videos of all injuries, bruises, and damaged property. Preserve torn clothes.'
      },
      {
        number: 4,
        title: 'Tell the Magistrate during remand hearing',
        instruction: 'If detained and produced in court, immediately inform the Magistrate of the abuse and show the injuries.'
      },
      {
        number: 5,
        title: 'File complaints with PCA & NHRC',
        instruction: 'Submit complaints with the District Police Complaints Authority, State Human Rights Commission (SHRC), and NHRC portal.'
      }
    ],
    donts: [
      {
        text: 'Do not retaliate physically or issue verbal counter-threats',
        reason: 'Officers may file grave charges of assaulting public servants (Section 132/121 BNS).'
      },
      {
        text: 'Do not delay getting a medical examination (MLC)',
        reason: 'Bruises and soft-tissue injuries fade quickly. Delayed medical reports weaken your case.'
      },
      {
        text: 'Do not wash or discard clothes worn during the assault',
        reason: 'Torn fabric, bloodstains, or dirt marks are crucial forensic evidence.'
      }
    ],
    sayThis: [
      {
        id: 'st-ta-1',
        situation: 'De-escalating calmly',
        english: 'Officer, I am cooperating peacefully and not resisting. Please do not use physical force or threats.',
        hindi: 'अधिकारी महोदय, मैं शांतिपूर्वक सहयोग कर रहा हूँ और कोई विरोध नहीं कर रहा। कृपया बल प्रयोग या धमकी न दें।',
        telugu: 'అధికారి గారు, నేను ప్రశాంతంగా సహకరిస్తున్నాను, ఎటువంటి ప్రతిఘటన చేయడం లేదు. దయచేసి బలాన్ని లేదా బెదిరింపులను ఉపయోగించవద్దు.',
        context: 'Say this to establish on record that you are fully peaceful.'
      },
      {
        id: 'st-ta-2',
        situation: 'Addressing the Magistrate in court',
        english: 'Honourable Magistrate, I was subjected to physical assault and threats while in custody. I request an immediate medical examination and my statement to be recorded.',
        hindi: 'माननीय मजिस्ट्रेट महोदय, हिरासत के दौरान मेरे साथ मारपीट और धमकी दी गई। मैं तत्काल मेडिकल जांच और अपना बयान दर्ज करने का अनुरोध करता हूँ।',
        telugu: 'గౌరవనీయ మేజిస్ట్రేట్ గారు, నన్ను కస్టడీలో కొట్టడం మరియు బెదిరించడం జరిగింది. దయచేసి తక్షణ వైద్య పరీక్షకు ఆదేశించి నా వాంగ్మూలం నమోదు చేయండి.',
        context: 'Say this directly to the judge when produced in court.'
      }
    ],
    escalationPath: [
      {
        level: 1,
        title: 'Government Hospital Casualty (MLC)',
        designation: 'Medical Officer',
        description: 'Get an official Medico-Legal Certificate (MLC) documenting every cut, contusion, and injury.',
        action: 'Immediate hospital visit.'
      },
      {
        level: 2,
        title: 'Judicial Magistrate / Chief Judicial Magistrate (CJM)',
        designation: 'Judicial Magistrate',
        description: 'Direct disclosure during production; or file a private complaint under Section 223 BNSS for criminal offences by police.',
        action: 'Court statement / Criminal Complaint.'
      },
      {
        level: 3,
        title: 'Police Complaints Authority (PCA) & NHRC',
        designation: 'Independent Oversight Authority',
        description: 'District & State PCA investigating custodial violence; NHRC online grievance portal (hrcnet.nic.in).',
        action: 'Formal petition with MLC attached.'
      },
      {
        level: 4,
        title: 'High Court (Writ for Compensation & CBI/CID probe)',
        designation: 'High Court',
        description: 'For severe custodial torture, petition for independent investigation and interim compensation.',
        action: 'Writ Petition under Article 226.'
      }
    ],
    sourceIds: ['sc-dk-basu', 'bnss-53', 'nhrc-guidelines', 'prakash-singh-pca'],
    keywords: ['assault', 'beaten', 'threatened', 'torture', 'custody', 'abuse', 'violence', 'mlc', 'hospital', 'injuries', 'nhrc']
  },
  {
    id: 'bribe-corruption',
    slug: 'bribe-corruption',
    icon: 'Coins',
    title: 'A police officer asked for a bribe',
    shortDescription: 'Do not put yourself at risk. See safe reporting options and statutory protections.',
    badgeText: 'Anti-Corruption',
    quick30SecSummary: [
      'Do not pay the bribe: demanding or accepting a bribe by a public servant is a grave offence under the Prevention of Corruption Act, 1988.',
      'Under Section 8 of the PC Act (Amended 2018), if you are coerced or compelled to give a bribe, you are protected if you report it to the Anti-Corruption Bureau (ACB/CBI) within 7 days.',
      'Do not attempt amateur trap operations yourself: report to the official Anti-Corruption Bureau who conduct authorized legal traps.',
      'Call the National Anti-Corruption Helpline 1064 or your State Anti-Corruption Bureau toll-free number.',
      'Preserve any audio/video recordings, messages, or payment demands safely as evidence.'
    ],
    rights: [
      {
        id: 'r-bc-1',
        title: 'Protection for reporting coerced bribes within 7 days',
        description: 'Under Section 8 of the Prevention of Corruption Act (2018 Amendment), a person compelled to give an undue advantage will NOT be prosecuted if they report the matter to law enforcement or the investigating agency within seven days from the date of giving the bribe.',
        legalSection: 'Section 8, Prevention of Corruption Act, 1988',
        sourceId: 'pc-act-1988'
      },
      {
        id: 'r-bc-2',
        title: 'Offence of demanding undue advantage',
        description: 'Any public servant who attempts to obtain or accepts an undue advantage with the intention to perform or cause improper performance of a public duty is liable for imprisonment up to 7 years.',
        legalSection: 'Section 7, Prevention of Corruption Act, 1988',
        sourceId: 'pc-act-1988'
      },
      {
        id: 'r-bc-3',
        title: 'Whistleblower protection & state ACB mechanisms',
        description: 'State Anti-Corruption Bureaus (ACB / Vigilance) are specialized agencies independent of local police stations equipped to register corruption FIRs and lay authorized traps.',
        organization: 'State ACB / Lokayukta',
        sourceId: 'pc-act-1988'
      }
    ],
    actions: [
      {
        number: 1,
        title: 'Politely refuse without provoking confrontation',
        instruction: 'State calmly that you only wish to proceed through official government procedures and receipts.'
      },
      {
        number: 2,
        title: 'Do not offer or pay money',
        instruction: 'Paying a bribe without reporting can compromise your standing and does not guarantee resolution.'
      },
      {
        number: 3,
        title: 'Preserve evidence discreetly',
        instruction: 'Note down the officer’s name, designation, badge number, police station, date, time, and exact amount demanded. Preserve any WhatsApp chats or call logs.'
      },
      {
        number: 4,
        title: 'Contact State Anti-Corruption Bureau (ACB)',
        instruction: 'Dial toll-free 1064 (Anti-Corruption Helpline) or visit your State ACB / Vigilance Directorate.'
      },
      {
        number: 5,
        title: 'Participate in an authorized legal trap',
        instruction: 'The ACB will record your complaint, verify the demand, and conduct a legal trap with phenolphthalein powder and independent witnesses.'
      }
    ],
    donts: [
      {
        text: 'Do not pay "speed money" or unofficial processing fees',
        reason: 'Encourages extortion and is unlawful under the PC Act.'
      },
      {
        text: 'Do not try to conduct your own vigilante sting operation carelessly',
        reason: 'Unverified unofficial recordings may be challenged in court or endanger your personal safety.'
      },
      {
        text: 'Do not delay reporting if you were forced to pay under duress',
        reason: 'Statutory immunity under Section 8 PC Act requires reporting within 7 days.'
      }
    ],
    sayThis: [
      {
        id: 'st-bc-1',
        situation: 'Declining bribe politely',
        english: 'Sir, I want to follow the proper legal process and pay any official government fee through an official receipt or portal.',
        hindi: 'सर, मैं उचित कानूनी प्रक्रिया का पालन करना चाहता हूँ और कोई भी सरकारी शुल्क केवल आधिकारिक रसीद या पोर्टल के माध्यम से ही देना चाहता हूँ।',
        telugu: 'సర్, నేను సరైన చట్టపరమైన ప్రక్రియను అనుసరించాలనుకుంటున్నాను మరియు ఏదైనా అధికారిక రుసుమును రసీదు ద్వారా మాత్రమే చెల్లిస్తాను.',
        context: 'Say this firmly and respectfully when money is solicited.'
      },
      {
        id: 'st-bc-2',
        situation: 'Asking for government challan/receipt',
        english: 'Could you please issue an official government challan or receipt for this payment?',
        hindi: 'क्या आप कृपया इस भुगतान के लिए आधिकारिक सरकारी चालान या रसीद दे सकते हैं?',
        telugu: 'ఈ చెల్లింపు కోసం దయచేసి అధికారిక ప్రభుత్వ చలాన్ లేదా రసీదు ఇవ్వగలరా?',
        context: 'Use when told that a "fee" is required to proceed.'
      }
    ],
    escalationPath: [
      {
        level: 1,
        title: 'State Anti-Corruption Bureau (ACB / DVAC / Vigilance)',
        designation: 'Specialized Police Agency',
        description: 'Every State has a specialized Anti-Corruption Bureau that operates independently from local police stations to catch corrupt officials.',
        action: 'Call 1064 or visit District ACB office.',
        timeframe: 'Report before or within 7 days'
      },
      {
        level: 2,
        title: 'State Lokayukta / Vigilance Commission',
        designation: 'Ombudsman Body',
        description: 'Statutory anti-corruption ombudsman with powers to investigate corruption across state departments including police.',
        action: 'File formal affidavit complaint.'
      },
      {
        level: 3,
        title: 'Central Bureau of Investigation (CBI) / CVC (For Central / UT Police)',
        designation: 'Central Agency',
        description: 'For police in Union Territories (e.g. Delhi Police) or Central Law Enforcement, CBI Anti-Corruption Branch handles cases.',
        action: 'Lodge complaint on cbi.gov.in or cvc.gov.in.'
      }
    ],
    sourceIds: ['pc-act-1988', 'cpgrams-portal'],
    keywords: ['bribe', 'corruption', 'money', 'cash', 'acb', 'vigilance', 'demanded', 'extortion', '1064', 'pay', 'unofficial']
  },
  {
    id: 'police-misconduct',
    slug: 'police-misconduct',
    icon: 'Scale',
    title: 'I want to complain about police misconduct',
    shortDescription: 'Find the appropriate escalation path, Police Complaints Authority, and oversight bodies.',
    badgeText: 'Grievance Redress',
    quick30SecSummary: [
      'Identify the nature of misconduct: administrative harassment, refusal to register FIR, physical abuse, or corruption.',
      'Step 1: File a formal written grievance with the District Superintendent of Police (SP) / Deputy Commissioner of Police (DCP).',
      'Step 2: If no action is taken, approach the District or State Police Complaints Authority (PCA) created under Supreme Court directives.',
      'Step 3: For human rights violations or custodial excesses, lodge a complaint with the State Human Rights Commission (SHRC) or NHRC.',
      'Step 4: Use government portals like CPGRAMS or State CM grievance helplines for tracked administrative resolution.'
    ],
    rights: [
      {
        id: 'r-pm-1',
        title: 'Right to independent oversight via Police Complaints Authority',
        description: 'Pursuant to Supreme Court directions in Prakash Singh (2006), State and District Police Complaints Authorities (PCA) exist to investigate public complaints against officers of all ranks.',
        landmarkCase: 'Prakash Singh v. Union of India (Supreme Court)',
        sourceId: 'prakash-singh-pca'
      },
      {
        id: 'r-pm-2',
        title: 'Criminal liability of public servants disobeying law',
        description: 'Under Section 199 of Bharatiya Nyaya Sanhita (BNS), 2023 (previously Section 166A IPC), any public servant who knowingly disobeys directions of the law or fails to record information as required is punishable with rigorous imprisonment.',
        legalSection: 'Section 199, Bharatiya Nyaya Sanhita (BNS), 2023',
        sourceId: 'bnss-173'
      },
      {
        id: 'r-pm-3',
        title: 'Right to tracked government grievance redressal',
        description: 'Citizens have the right to lodge complaints on public grievance portals such as CPGRAMS and State CM windows, which mandate institutional tracking and action-taken reports.',
        portal: 'CPGRAMS (pgportal.gov.in)',
        sourceId: 'cpgrams-portal'
      }
    ],
    actions: [
      {
        number: 1,
        title: 'Compile dates, evidence, and officer details',
        instruction: 'Prepare a factual timeline: names of officers, ranks, police station, dates, times, and attach copies of receipts or photos.'
      },
      {
        number: 2,
        title: 'Submit representation to the District SP / DCP',
        instruction: 'Send via Registered Post with Acknowledgment Due (RPAD) and keep the postal tracking receipt.'
      },
      {
        number: 3,
        title: 'Lodge complaint with District/State PCA',
        instruction: 'Submit an affidavit-backed petition to the Police Complaints Authority detailing the abuse of power or dereliction of duty.'
      },
      {
        number: 4,
        title: 'File online with SHRC / NHRC portal',
        instruction: 'For violations of dignity or rights, file on the NHRC portal (hrcnet.nic.in) to receive a unique complaint tracking number.'
      },
      {
        number: 5,
        title: 'Private Criminal Complaint before Magistrate',
        instruction: 'Where the misconduct involves cognizable crimes (forgery, assault, wrongful confinement), file a complaint under Section 223 BNSS before the Judicial Magistrate.'
      }
    ],
    donts: [
      {
        text: 'Do not send anonymous or unverified complaints',
        reason: 'Authorities often discard anonymous complaints without investigation. Provide verifiable contact details.'
      },
      {
        text: 'Do not use defamatory or insulting language in formal petitions',
        reason: 'Stick strictly to facts, dates, legal sections, and evidence.'
      },
      {
        text: 'Do not ignore administrative hierarchy',
        reason: 'Courts and commissions expect that you first brought the matter to the SP/DCP before escalating.'
      }
    ],
    sayThis: [
      {
        id: 'st-pm-1',
        situation: 'Submitting formal grievance to senior officer',
        english: 'Respected Sir/Madam, I am submitting this formal written representation regarding the non-compliance and misconduct by officers of [Station Name] on [Date], and request an inquiry.',
        hindi: 'आदरणीय महोदय/महोदया, मैं [दिनांक] को [थाने का नाम] के अधिकारियों द्वारा नियमों के उल्लंघन और दुर्व्यवहार के संबंध में यह औपचारिक लिखित शिकायत प्रस्तुत कर रहा हूँ और जांच का अनुरोध करता हूँ।',
        telugu: 'గౌరవనీయులైన అధికారి గారికి, [తేదీ]న [స్టేషన్ పేరు] అధికారుల దురుసు ప్రవర్తన మరియు చట్ట ఉల్లంఘనపై ఈ రాతపూర్వక ఫిర్యాదు సమర్పిస్తూ విచారణ కోరుతున్నాను.',
        context: 'Use when meeting the Superintendent of Police or ACP.'
      }
    ],
    escalationPath: [
      {
        level: 1,
        title: 'Superintendent of Police (SP) / Deputy Commissioner (DCP)',
        designation: 'District Police Leadership',
        description: 'First supervisory tier for all complaints regarding station staff.',
        action: 'Written representation via Speed Post / in-person.'
      },
      {
        level: 2,
        title: 'Police Complaints Authority (PCA)',
        designation: 'Statutory Body (Judicial Chair)',
        description: 'Inquires into serious misconduct: custodial torture, extortion, refusal to register cases.',
        action: 'Formal petition with supporting documents.'
      },
      {
        level: 3,
        title: 'State Human Rights Commission (SHRC) / NHRC',
        designation: 'Human Rights Commission',
        description: 'Takes cognizance of human rights violations, summons officers, and awards compensation.',
        action: 'Online complaint on hrcnet.nic.in.'
      },
      {
        level: 4,
        title: 'Judicial Magistrate / High Court',
        designation: 'Judicial Remedy',
        description: 'Direct prosecution under Section 223 BNSS or High Court Writ for disciplinary action.',
        action: 'Court petition through advocate.'
      }
    ],
    sourceIds: ['prakash-singh-pca', 'cpgrams-portal', 'nhrc-guidelines', 'bnss-173'],
    keywords: ['misconduct', 'complaint', 'pca', 'sho', 'sp', 'dcp', 'human rights', 'nhrc', 'shrc', 'cpgrams', 'discipline', 'escalate']
  }
];
