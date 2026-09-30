// topic0_questions.js - Module 006_004: Homophones, Homonyms, Paronyms & Confusable Word Pairs
// 25 High-Yield Diagnostic MCQs with Technical and Bengali Explanations

const questions = [
  {
    id: 1,
    question: "Select the sentence with the correct usage of 'Affect' vs 'Effect':",
    options: [
      "The drastic climate shift will adversely effect agricultural production.",
      "The drastic climate shift will adversely affect agricultural production.",
      "The drastic climate shift will have a severe affect on crops.",
      "The new policy will not effect him in any manner."
    ],
    correctAnswer: "The drastic climate shift will adversely affect agricultural production.",
    explanation: "'Affect' is primarily an active verb meaning 'to influence or produce an impact on'. 'Effect' is primarily a noun meaning 'the result or outcome'.",
    explanationBn: "'Affect' সাধারণত Verb হিসেবে ব্যবহৃত হয় যার অর্থ 'প্রভাব ফেলা'; আর 'Effect' সাধারণত Noun হিসেবে ব্যবহৃত হয় যার অর্থ 'ফলাফল বা প্রভাব'।"
  },
  {
    id: 2,
    question: "Fill in the blank: 'The new environmental legislation will come into ______ next month.'",
    options: ["affect", "effect", "effects", "affected"],
    correctAnswer: "effect",
    explanation: "The idiom is 'come into effect' (to become operative/enforced), where 'effect' functions as a noun.",
    explanationBn: "আইন কার্যকর হওয়া বোঝাতে 'come into effect' বসে; এখানে 'effect' একটি Noun।"
  },
  {
    id: 3,
    question: "Choose the correct pair of words: 'The ______ reason for his resignation was his strict adherence to moral ______.'",
    options: [
      "principal, principles",
      "principle, principals",
      "principal, principals",
      "principle, principles"
    ],
    correctAnswer: "principal, principles",
    explanation: "'Principal' (adjective/noun) means 'chief/head/main'. 'Principle' (noun) means a 'fundamental moral rule or doctrine'.",
    explanationBn: "'Principal' অর্থ প্রধান বা মূল (main/chief); আর 'Principle' অর্থ নৈতিক নীতি বা আদর্শ (moral rule/doctrine)।"
  },
  {
    id: 4,
    question: "Select the correct sentence regarding 'Compliment' vs 'Complement':",
    options: [
      "The exquisite white wine complimented the roasted fish perfectly.",
      "The exquisite white wine complemented the roasted fish perfectly.",
      "She paid him a lovely complement on his performance.",
      "A subject compliment is required after linking verbs."
    ],
    correctAnswer: "The exquisite white wine complemented the roasted fish perfectly.",
    explanation: "'Complement' (with an 'e') means to complete, balance, or enhance something. 'Compliment' (with an 'i') means an expression of praise or admiration.",
    explanationBn: "'Complement' (e যুক্ত) মানে কোনো কিছুকে পূর্ণাঙ্গ বা শোভিত করা (complete/enhance); আর 'Compliment' (i যুক্ত) মানে প্রশংসা করা (praise)।"
  },
  {
    id: 5,
    question: "Fill in the blank: 'Please purchase five reams of paper from the local ______ shop.'",
    options: ["stationary", "stationery", "stationery's", "stationer"],
    correctAnswer: "stationery",
    explanation: "'Stationery' (with 'er') refers to writing and office supplies (pens, paper, envelopes). 'Stationary' (with 'ar') means remaining in one fixed place (motionless).",
    explanationBn: "'Stationery' (er যুক্ত) অর্থ খাতা-কলম বা লেখার সরঞ্জাম; আর 'Stationary' (ar যুক্ত) অর্থ নিশ্চল বা স্থির (fixed/motionless)।"
  },
  {
    id: 6,
    question: "Choose the sentence where 'Stationary' is used correctly:",
    options: [
      "The car collided with a stationary truck parked on the shoulder.",
      "She bought new stationary for her calligraphy class.",
      "The planetary orbits are completely stationary in space.",
      "Write your answers on official stationary."
    ],
    correctAnswer: "The car collided with a stationary truck parked on the shoulder.",
    explanation: "'Stationary' means motionless, immobile, or fixed in position.",
    explanationBn: "দাঁড়িয়ে থাকা বা স্থির গাড়ি বোঝাতে 'stationary truck' সঠিক।"
  },
  {
    id: 7,
    question: "Fill in the blanks: 'The architect inspected the construction ______ and decided to ______ three historical precedents in his report.'",
    options: [
      "site, cite",
      "sight, site",
      "cite, site",
      "site, sight"
    ],
    correctAnswer: "site, cite",
    explanation: "'Site' is a physical location. 'Cite' (verb) means to quote or reference an authority. 'Sight' refers to vision or a spectacle.",
    explanationBn: "'Site' অর্থ ভৌগোলিক বা নির্মাণ স্থান; 'Cite' অর্থ উদ্ধৃত বা উল্লেখ করা; এবং 'Sight' অর্থ দৃষ্টি বা দৃশ্য।"
  },
  {
    id: 8,
    question: "Identify the correct usage of 'Desert' vs 'Dessert':",
    options: [
      "After the spicy dinner, they enjoyed chocolate cake for dessert.",
      "After the spicy dinner, they enjoyed chocolate cake for desert.",
      "The camel traversed the arid dessert with ease.",
      "Soldiers were ordered not to dessert their posts."
    ],
    correctAnswer: "After the spicy dinner, they enjoyed chocolate cake for dessert.",
    explanation: "'Dessert' (with double 's') is the sweet course served at the end of a meal. 'Desert' (single 's') refers to an arid wasteland (noun) or to abandon (verb).",
    explanationBn: "'Dessert' (ss যুক্ত) মানে খাবারের শেষের মিষ্টি পদ; আর 'Desert' (একটি s) মানে মরুভূমি (Noun) অথবা কাউকে ত্যাগ করা (Verb)।"
  },
  {
    id: 9,
    question: "Select the sentence with the correct paronym: 'Due to severe rainfall, there was a ______ drizzle that lasted three days without stopping.'",
    options: ["continual", "continuous", "alternating", "alternative"],
    correctAnswer: "continuous",
    explanation: "'Continuous' means uninterrupted in time or sequence (without pauses). 'Continual' means occurring repeatedly at frequent intervals (with small interruptions).",
    explanationBn: "'Continuous' মানে বিরতিহীনভাবে একটানা চলা (unbroken without pause); আর 'Continual' মানে ঘনঘন পুনরাবৃত্তি হওয়া (repeated with short pauses)।"
  },
  {
    id: 10,
    question: "Fill in the blank: 'His ______ interruptions prevented the lecturer from finishing the topic.'",
    options: ["continuous", "continual", "historic", "historical"],
    correctAnswer: "continual",
    explanation: "'Continual' applies to events that happen again and again with short intervals in between (e.g., continual interruptions, continual complaints).",
    explanationBn: "বারবার থেমে থেমে বিঘ্ন ঘটানো বোঝাতে 'continual interruptions' উপযুক্ত।"
  },
  {
    id: 11,
    question: "Choose the correct paronym pair: 'The astronaut made a ______ flight to Mars, which will be documented in a ______ archive.'",
    options: [
      "historic, historical",
      "historical, historic",
      "history, historic",
      "historic, historically"
    ],
    correctAnswer: "historic, historical",
    explanation: "'Historic' means momentous or having immense importance in history. 'Historical' means belonging to or pertaining to past history/records.",
    explanationBn: "'Historic' অর্থ ইতিহাসে স্মরণীয় বা যুগান্তকারী (famous in history); আর 'Historical' অর্থ ইতিহাস বিষয়ক বা অতীত সম্পর্কিত (based on history)।"
  },
  {
    id: 12,
    question: "Fill in the blank: 'A judge must be completely ______ during the trial, showing no bias.'",
    options: ["uninterested", "disinterested", "ignorant", "interesting"],
    correctAnswer: "disinterested",
    explanation: "'Disinterested' means impartial, unbiased, and objective (having no personal stake). 'Uninterested' means bored or lacking interest.",
    explanationBn: "'Disinterested' মানে নিরপেক্ষ ও পক্ষপাতহীন (impartial/unbiased); আর 'Uninterested' মানে অনাগ্রহী বা উদাসীন (bored/not interested)।"
  },
  {
    id: 13,
    question: "Select the sentence where 'Sensible' and 'Sensitive' are used accurately:",
    options: [
      "She made a sensible decision, taking into account her sensitive skin.",
      "She made a sensitive decision, taking into account her sensible skin.",
      "Skin can be sensible to sunlight.",
      "Judges should be sensitive rather than sensible."
    ],
    correctAnswer: "She made a sensible decision, taking into account her sensitive skin.",
    explanation: "'Sensible' means possessing good sense, wisdom, or practical judgment. 'Sensitive' means easily affected, delicate, or responsive to stimuli.",
    explanationBn: "'Sensible' অর্থ বুদ্ধিমান বা সুবিবেচক (wise/practical); আর 'Sensitive' অর্থ স্পর্শকাতর বা সংবেদনশীল (delicate/easily affected)।"
  },
  {
    id: 14,
    question: "Fill in the blank: 'We have no other ______ but to accept the arbitrator's terms.'",
    options: ["alternate", "alternative", "alternation", "altering"],
    correctAnswer: "alternative",
    explanation: "'Alternative' (noun) means a choice or option between two or more possibilities. 'Alternate' (adjective) means occurring by turns or every other one.",
    explanationBn: "'Alternative' মানে উপায় বা বিকল্প পছন্দ (choice/option); আর 'Alternate' মানে একান্তর বা একটি ছেড়ে আরেকটি (every other one)।"
  },
  {
    id: 15,
    question: "Select the correct sentence regarding 'Childish' vs 'Childlike':",
    options: [
      "Her childlike innocence and purity charmed everyone.",
      "Her childish innocence and purity charmed everyone.",
      "An adult throwing a tantrum is displaying childlike behavior.",
      "Childlike tantrums must not be tolerated in office."
    ],
    correctAnswer: "Her childlike innocence and purity charmed everyone.",
    explanation: "'Childlike' has a positive connotation meaning pure, innocent, and trusting. 'Childish' has a negative derogatory connotation meaning immature, silly, or petulant.",
    explanationBn: "'Childlike' প্রশংসনীয় অর্থ প্রকাশ করে (শিশুর মতো সরল/নির্দোষ); আর 'Childish' নিন্দনীয় অর্থ প্রকাশ করে (ছেলেমানুষি বা অপরিপক্ব)।"
  },
  {
    id: 16,
    question: "Identify the heteronym/homograph accent rule: In two-syllable words like 'OBJECT', 'RECORD', and 'PRESENT', where does the stress fall for NOUNS vs VERBS?",
    options: [
      "Stress on 1st syllable for Nouns (OB-ject), 2nd syllable for Verbs (ob-JECT)",
      "Stress on 2nd syllable for Nouns, 1st syllable for Verbs",
      "Stress is identical on both syllables regardless of word class",
      "Stress falls only on the vowel suffixes"
    ],
    correctAnswer: "Stress on 1st syllable for Nouns (OB-ject), 2nd syllable for Verbs (ob-JECT)",
    explanation: "In two-syllable noun/verb homographs, the Noun takes primary stress on the FIRST syllable (PRE-sent, RE-cord, OB-ject), while the Verb takes stress on the SECOND syllable (pre-SENT, re-CORD, ob-JECT).",
    explanationBn: "দ্বি-মাত্রিক (two-syllable) সমোচ্চারিত শব্দে Noun হলে ১ম সিলেবলে জোর (stress) পড়ে (যেমন: PRE-sent, RE-cord), আর Verb হলে ২য় সিলেবলে জোর পড়ে (যেমন: pre-SENT, re-CORD)।"
  },
  {
    id: 17,
    question: "Fill in the blank: 'The university ______ gave valuable ______ to the struggling student.'",
    options: [
      "counsel, council",
      "council, counsel",
      "counselor, consular",
      "consul, council"
    ],
    correctAnswer: "council, counsel",
    explanation: "'Council' is an administrative or advisory body/committee. 'Counsel' is advice or guidance (noun) or to give guidance (verb).",
    explanationBn: "'Council' অর্থ সভা বা প্রশাসনিক পরিষদ; আর 'Counsel' অর্থ পরামর্শ বা উপদেশ (advice/guidance)।"
  },
  {
    id: 18,
    question: "Select the sentence with correct usage of 'Coarse' vs 'Course':",
    options: [
      "The coarse texture of the cloth irritated his skin during the golf course.",
      "The course texture of the cloth irritated his skin during the golf coarse.",
      "He enrolled in a computer coarse.",
      "Coarse language is acceptable in a formal course."
    ],
    correctAnswer: "The coarse texture of the cloth irritated his skin during the golf course.",
    explanation: "'Coarse' means rough, crude, or unrefined. 'Course' refers to a direction, curriculum of study, or golf terrain.",
    explanationBn: "'Coarse' অর্থ খসখসে বা স্থূল (rough/crude); আর 'Course' অর্থ পাঠ্যক্রম, গতিপথ বা মাঠ।"
  },
  {
    id: 19,
    question: "Fill in the blank: 'Buying energy-efficient LED bulbs is an ______ choice that reduces electricity bills.'",
    options: ["economic", "economical", "economics", "economist"],
    correctAnswer: "economical",
    explanation: "'Economical' means thrifty, money-saving, or efficient. 'Economic' pertains to the national economy, trade, and finance.",
    explanationBn: "'Economical' অর্থ সাশ্রয়ী বা মিতব্যয়ী (thrifty/money-saving); আর 'Economic' অর্থ অর্থনীতি বা আর্থিক ব্যবস্থা সম্পর্কিত (financial/economic policy)।"
  },
  {
    id: 20,
    question: "Fill in the blank: 'The magistrate delivered a ______ ruling that satisfied both parties.'",
    options: ["judicial", "judicious", "judgmental", "judge"],
    correctAnswer: "judicious",
    explanation: "'Judicious' means wise, sensible, and prudent. 'Judicial' means pertaining to the court, legal justice system, or judge.",
    explanationBn: "'Judicious' অর্থ সুবিবেচনাপ্রসূত বা বিচক্ষণ (wise/prudent); আর 'Judicial' অর্থ বিচার বিভাগীয় বা আদালত সংক্রান্ত (legal/court-related)।"
  },
  {
    id: 21,
    question: "Select the sentence with correct usage of 'Eminent' vs 'Imminent':",
    options: [
      "The eminent scientist warned that a severe storm was imminent.",
      "The imminent scientist warned that a severe storm was eminent.",
      "War is eminent between the two nations.",
      "An imminent author received the Nobel Prize."
    ],
    correctAnswer: "The eminent scientist warned that a severe storm was imminent.",
    explanation: "'Eminent' means distinguished, famous, or renowned. 'Imminent' means impending or about to happen very soon.",
    explanationBn: "'Eminent' অর্থ বিখ্যাত বা বিশিষ্ট (renowned/famous); আর 'Imminent' অর্থ আসন্ন বা যা শীঘ্রই ঘটতে চলেছে (impending/about to happen)।"
  },
  {
    id: 22,
    question: "Fill in the blank: 'The police officer asked the suspect to ______ the stolen diamonds immediately.'",
    options: ["illicit", "elicit", "explicit", "implicit"],
    correctAnswer: "elicit",
    explanation: "'Elicit' (verb) means to draw forth, evoke, or obtain information/response. 'Illicit' (adjective) means illegal or forbidden by law.",
    explanationBn: "'Elicit' একটি Verb যার অর্থ তথ্য বা প্রতিক্রিয়া বের করে আনা (draw forth); আর 'Illicit' একটি Adjective যার অর্থ অবৈধ বা বেআইনি (illegal)।"
  },
  {
    id: 23,
    question: "Choose the correct sentence regarding 'Allusion' vs 'Illusion':",
    options: [
      "The poem contains a subtle allusion to Greek mythology, not an optical illusion.",
      "The poem contains a subtle illusion to Greek mythology, not an optical allusion.",
      "A mirage is a famous optical allusion.",
      "He made an illusion to Hamlet in his speech."
    ],
    correctAnswer: "The poem contains a subtle allusion to Greek mythology, not an optical illusion.",
    explanation: "'Allusion' is an indirect literary or historical reference. 'Illusion' is a deceptive appearance, false impression, or mirage.",
    explanationBn: "'Allusion' অর্থ পরোক্ষ ইঙ্গিত বা সাহিত্যিক উল্লেখ (indirect reference); আর 'Illusion' অর্থ বিভ্রান্তি, ভুল ধারণা বা মায়া (deceptive appearance/mirage)।"
  },
  {
    id: 24,
    question: "Fill in the blank: 'The king was willing to ______ his claim to the disputed province.'",
    options: ["waive", "wave", "weaver", "wavering"],
    correctAnswer: "waive",
    explanation: "'Waive' (verb) means to voluntarily relinquish or give up a right, rule, or claim. 'Wave' means to flutter in the wind or gesture with the hand.",
    explanationBn: "'Waive' অর্থ কোনো দাবি বা অধিকার স্বেচ্ছায় ত্যাগ/মওকুফ করা (relinquish right); আর 'Wave' অর্থ হাত নাড়া বা তরঙ্গ।"
  },
  {
    id: 25,
    question: "Select the sentence with correct paronym usage:",
    options: [
      "Her graceful and elegant manners made her an agreeable companion.",
      "Her gracious and elegant manners made her an agreing companion.",
      "A person who agrees to everything is always gracious.",
      "The hotel staff was very agreeable to the royalty."
    ],
    correctAnswer: "Her graceful and elegant manners made her an agreeable companion.",
    explanation: "'Graceful' describes elegance of movement and style. 'Gracious' describes courteous, merciful kindness. 'Agreeable' describes a pleasant and friendly personality.",
    explanationBn: "'Graceful' অর্থ মনোমুগ্ধকর বা সুন্দর ভঙ্গিমাযুক্ত; 'Gracious' অর্থ সদয় বা করুণাময়; 'Agreeable' অর্থ মনোরম বা প্রীতিকর।"
  }
];

export default questions;
