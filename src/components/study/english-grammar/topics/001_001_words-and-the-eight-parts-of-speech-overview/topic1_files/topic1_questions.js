// topic1_questions.js
// Topic 1: Word Classes — Open Classes vs Closed Classes
// 25 Comprehensive Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "Which of the following word classes belongs strictly to the 'Open Class' category in English?",
    options: ["Preposition", "Conjunction", "Adverb", "Pronoun"],
    correctAnswer: 2,
    answer: "Adverb",
    explanation: "Adverbs belong to the Open Class because new adverbs can be freely coined or borrowed as language evolves (e.g., 'cybernetically', 'algorithmically', 'wirelessly').",
    explanationBn: "Adverb হলো Open Class-এর অন্তর্ভুক্ত কারণ ভাষার বিবর্তনের সাথে সাথে নিত্যনতুন Adverb তৈরি বা গ্রহণ করা যায় (যেমন: 'algorithmically', 'globally')।",
    hint: "Think about which class can readily accept newly coined words.",
    level: "basic"
  },
  {
    id: 2,
    question: "Why are Pronouns, Prepositions, and Conjunctions classified as 'Closed Classes'?",
    options: [
      "Because they only occur at the end of a sentence",
      "Because their membership is fixed, stable, and rarely admits new words",
      "Because they cannot be translated into Bengali",
      "Because they only modify nouns"
    ],
    correctAnswer: 1,
    answer: "Because their membership is fixed, stable, and rarely admits new words",
    explanation: "Closed classes consist of structural, grammatical words whose total inventory remains relatively static and closed to new coinages.",
    explanationBn: "Closed Class-এর শব্দের সংখ্যা নির্দিষ্ট ও সীমাবদ্ধ; দৈনন্দিন ভাষায় সহজে নতুন কোনো Preposition বা Conjunction যোগ হয় না।",
    hint: "Consider how often the English language invents a brand-new preposition.",
    level: "basic"
  },
  {
    id: 3,
    question: "When a new technological term like 'to google' enters the dictionary as a verb, which class does it expand?",
    options: ["Closed Class (Auxiliary)", "Open Class (Lexical Verb)", "Closed Class (Determiner)", "Closed Class (Conjunction)"],
    correctAnswer: 1,
    answer: "Open Class (Lexical Verb)",
    explanation: "Lexical verbs are Open Class items, continuously expanding with modern culture, technology, and science.",
    explanationBn: "মূল ক্রিয়া (Lexical Verbs) হলো Open Class, যা নতুন প্রযুক্তি বা সংস্কৃতির সাথে নতুন শব্দ গ্রহণ করে প্রসারিত হয়।",
    hint: "Lexical (main) verbs express actions and concepts.",
    level: "basic"
  },
  {
    id: 4,
    question: "Which pair consists ENTIRELY of Closed Class parts of speech?",
    options: [
      "Nouns and Pronouns",
      "Adjectives and Adverbs",
      "Prepositions and Conjunctions",
      "Verbs and Interjections"
    ],
    correctAnswer: 2,
    answer: "Prepositions and Conjunctions",
    explanation: "Prepositions and Conjunctions are both core grammatical Closed Classes serving structural linking roles.",
    explanationBn: "Preposition এবং Conjunction উভয়ই Closed Class, যা পদ ও বাক্যাংশের মধ্যে ব্যাকরণগত সম্পর্ক তৈরিতে সাহায্য করে।",
    hint: "Look for the pair where neither member allows new word creation.",
    level: "basic"
  },
  {
    id: 5,
    question: "What syntactic role do Closed Class words primarily perform in sentence architecture?",
    options: [
      "Carrying primary lexical/semantic content",
      "Providing structural relationships and grammatical framework",
      "Replacing all verbs in a sentence",
      "Serving only as decorative poetic devices"
    ],
    correctAnswer: 1,
    answer: "Providing structural relationships and grammatical framework",
    explanation: "Closed class words (functors) establish structural, spatial, temporal, and logical relationships between open class lexical items.",
    explanationBn: "Closed Class শব্দগুলো মূলত বিভিন্ন পদের মধ্যে ব্যাকরণগত ও যৌক্তিক সম্পর্ক (Structural Framework) স্থাপন করে বাক্যের কাঠামো ঠিক রাখে।",
    hint: "Think about the 'mortar' that holds the 'bricks' together.",
    level: "intermediate"
  },
  {
    id: 6,
    question: "Which of the following is an example of an Open Class word created in the digital age?",
    options: ["Behind", "Selfie", "Although", "Whom"],
    correctAnswer: 1,
    answer: "Selfie",
    explanation: "'Selfie' is a noun (Open Class) coined in recent decades to describe a smartphone self-portrait.",
    explanationBn: "'Selfie' একটি আধুনিক Noun (Open Class), যা ডিজিটাল যুগে নতুন সৃষ্টি হয়েছে।",
    hint: "Identify the word coined due to modern camera phones.",
    level: "basic"
  },
  {
    id: 7,
    question: "How do Open Class words differ in communicative stress in standard spoken English?",
    options: [
      "They are always whispered",
      "They typically carry lexical stress (content words) while closed class words are often unstressed",
      "They are never pronounced fully",
      "They have no difference from closed classes"
    ],
    correctAnswer: 1,
    answer: "They typically carry lexical stress (content words) while closed class words are often unstressed",
    explanation: "In spoken English, Open Class content words (Nouns, Main Verbs, Adjectives, Adverbs) receive rhythmic stress, whereas Closed Class function words are often reduced.",
    explanationBn: "কথ্য ইংরেজিতে Content Words (Open Class) বেশি জোর (Stress) পায় এবং Function Words (Closed Class) সাধারণত Unstressed বা Reduced রূপে উচ্চারিত হয়।",
    hint: "Think about rhythm and content versus grammatical glue.",
    level: "intermediate"
  },
  {
    id: 8,
    question: "Which category does the determiner 'the' belong to?",
    options: ["Open Class", "Closed Class", "Morphological Invariant", "Lexical Category"],
    correctAnswer: 1,
    answer: "Closed Class",
    explanation: "Determiners/Articles are Closed Class functional items with a strictly limited set in English grammar.",
    explanationBn: "Determiners/Articles হলো Closed Class কারণ এদের সংখ্যা নির্দিষ্ট এবং নতুন কোনো Article তৈরি হয় না।",
    hint: "Can we coin a new definite article in English?",
    level: "basic"
  },
  {
    id: 9,
    question: "In the sentence 'The algorithm processes data swiftly', which words belong to Open Classes?",
    options: [
      "'The'",
      "'algorithm', 'processes', 'data', 'swiftly'",
      "'The', 'swiftly'",
      "'processes' only"
    ],
    correctAnswer: 1,
    answer: "'algorithm', 'processes', 'data', 'swiftly'",
    explanation: "'algorithm' (Noun), 'processes' (Verb), 'data' (Noun), and 'swiftly' (Adverb) are all Open Class content words. 'The' is a closed class determiner.",
    explanationBn: "'algorithm' (Noun), 'processes' (Verb), 'data' (Noun), এবং 'swiftly' (Adverb) — এরা প্রত্যেকেই Open Class শব্দ।",
    hint: "Filter out only the grammatical article.",
    level: "intermediate"
  },
  {
    id: 10,
    question: "Why are Auxiliary Verbs (like 'can', 'must', 'is') considered closed while Lexical Verbs are open?",
    options: [
      "Auxiliaries are longer in spelling",
      "Auxiliaries form a finite, non-expandable grammatical set expressing tense, aspect, or modality",
      "Auxiliaries only exist in British English",
      "Auxiliaries cannot take subjects"
    ],
    correctAnswer: 1,
    answer: "Auxiliaries form a finite, non-expandable grammatical set expressing tense, aspect, or modality",
    explanation: "The set of auxiliary and modal verbs is strictly closed; we cannot invent a new modal verb, whereas new main action verbs are created every year.",
    explanationBn: "সাহায্যকারী ক্রিয়া ও মোডাল ভার্বগুলোর সংখ্যা নির্দিষ্ট এবং অপরিবর্তনশীল (Closed), কিন্তু মূল কাজ প্রকাশক ক্রিয়া (Lexical Verbs) সংখ্যায় উন্মুক্ত (Open)।",
    hint: "Can we create a new modal verb like 'can' or 'must'?",
    level: "intermediate"
  },
  {
    id: 11,
    question: "What is another common linguistic term for 'Open Class' words?",
    options: ["Function words", "Content words (or Lexical words)", "Glue words", "Grammatical particles"],
    correctAnswer: 1,
    answer: "Content words (or Lexical words)",
    explanation: "Open class words are also termed 'Content words' or 'Lexical words' because they carry the real-world semantic payload of the message.",
    explanationBn: "Open Class শব্দগুলোকে 'Content words' বা 'Lexical words' বলা হয়, কারণ তারা বাক্যের মূল অর্থ বহন করে।",
    hint: "These words supply the actual substance or content.",
    level: "basic"
  },
  {
    id: 12,
    question: "What is another common linguistic term for 'Closed Class' words?",
    options: ["Lexical words", "Content words", "Function words (or Structural words)", "Descriptive words"],
    correctAnswer: 2,
    answer: "Function words (or Structural words)",
    explanation: "Closed class words are termed 'Function words' or 'Structural words' because they perform grammatical operations rather than naming concepts.",
    explanationBn: "Closed Class শব্দগুলোকে 'Function words' বা 'Structural words' বলা হয়, কারণ তাদের প্রধান কাজ বাক্যের গঠন নিয়ন্ত্রণ করা।",
    hint: "These words perform grammatical functions.",
    level: "basic"
  },
  {
    id: 13,
    question: "Approximately how many words constitute the entire Closed Class inventory of Modern English?",
    options: ["Around 300 words", "Over 500,000 words", "Exactly 26 words", "Infinite words"],
    correctAnswer: 0,
    answer: "Around 300 words",
    explanation: "The closed class inventory of English is surprisingly compact—only roughly 300 to 400 function words govern all grammatical connectivity.",
    explanationBn: "ইংরেজি ভাষার সমগ্র Closed Class মাত্র প্রায় ৩০০ থেকে ৪০০টি শব্দের সমন্বয়ে গঠিত, যা পুরো ব্যাকরণিক কাঠামো পরিচালনা করে।",
    hint: "A surprisingly small number compared to dictionary size.",
    level: "advanced"
  },
  {
    id: 14,
    question: "If all Open Class words were removed from a sentence, what would remain?",
    options: [
      "A complete story",
      "Only grammatical scaffolding without meaningful content (e.g., 'The ... of a ... was ... by ...')",
      "A Bengali translation",
      "A compound sentence"
    ],
    correctAnswer: 1,
    answer: "Only grammatical scaffolding without meaningful content (e.g., 'The ... of a ... was ... by ...')",
    explanation: "Stripping away open class words leaves only empty grammatical scaffolding (determiners, prepositions, conjunctions, auxiliaries).",
    explanationBn: "Open Class শব্দগুলো বাদ দিলে বাক্যে শুধু ব্যাকরণিক কঙ্কাল বা সংযোগকারী কাঠামো অবশিষ্ট থাকে, যার নিজস্ব কোনো তথ্যভিত্তিক অর্থ থাকে না।",
    hint: "Imagine a house with only beams and no walls or rooms.",
    level: "intermediate"
  },
  {
    id: 15,
    question: "In telegrams or early SMS text messages where words were charged per item, which class of words was routinely omitted to save cost?",
    options: ["Nouns", "Main Verbs", "Closed Class function words (Articles, Prepositions, Auxiliaries)", "Adjectives"],
    correctAnswer: 2,
    answer: "Closed Class function words (Articles, Prepositions, Auxiliaries)",
    explanation: "Telegrams used 'telegraphic speech' (e.g., 'ARRIVING BARRACKPORE MONDAY TRAIN') omitting closed class function words while keeping open class content words.",
    explanationBn: "টেলিগ্রামে খরচ বাঁচাতে Articles, Prepositions এবং Auxiliary Verbs বাদ দিয়ে কেবল প্রধান প্রধান Open Class শব্দ পাঠানো হতো।",
    hint: "People preserved the core content and dropped the structural glue.",
    level: "intermediate"
  },
  {
    id: 16,
    question: "Which of the following parts of speech is an OPEN class?",
    options: ["Pronoun", "Preposition", "Adjective", "Conjunction"],
    correctAnswer: 2,
    answer: "Adjective",
    explanation: "Adjectives are open class words; new descriptive terms like 'un-put-down-able', 'crypto-friendly', or 'viral' are constantly created.",
    explanationBn: "Adjective হলো Open Class, কারণ নিয়মিত নতুন নতুন বর্ণনামূলক বিশেষণ ভাষায় যুক্ত হয়।",
    hint: "Which one describes qualities and takes new coinages?",
    level: "basic"
  },
  {
    id: 17,
    question: "Which morphological process allows Open Classes to expand rapidly?",
    options: [
      "Affixation (Prefixes and Suffixes), Compounding, and Conversion",
      "Strict memorization without change",
      "Translation into Latin only",
      "Deleting consonants"
    ],
    correctAnswer: 0,
    answer: "Affixation (Prefixes and Suffixes), Compounding, and Conversion",
    explanation: "Open classes expand through derivational morphology: adding prefixes/suffixes (unfriend), compounding (crowdfunding), and conversion (to impact).",
    explanationBn: "Prefix, Suffix, Compounding এবং Conversion-এর মতো রূপতাত্ত্বিক প্রক্রিয়ার মাধ্যমে Open Class শব্দভাণ্ডার দ্রুত বৃদ্ধি পায়।",
    hint: "Adding prefixes, suffixes, and combining words.",
    level: "advanced"
  },
  {
    id: 18,
    question: "Is 'Interjection' typically treated as an Open or Closed class by modern linguists?",
    options: [
      "Open class because millions exist",
      "A special peripheral class with a limited, conventionalized set of emotive sounds (Ouch, Wow, Alas)",
      "A subtype of transitive verbs",
      "A compound conjunction"
    ],
    correctAnswer: 1,
    answer: "A special peripheral class with a limited, conventionalized set of emotive sounds (Ouch, Wow, Alas)",
    explanation: "Interjections are conventionalized exclamatory utterances standing outside syntactic clause architecture, generally treated as a closed peripheral set.",
    explanationBn: "Interjection হলো বাক্যের মূল সিনট্যাক্সের বাইরে থাকা আবেগ প্রকাশক নির্দিষ্ট কিছু ধ্বনি, যা সাধারণত একটি সীমিত (Closed) পরিমণ্ডলে থাকে।",
    hint: "Think about words like 'Alas', 'Hurrah', 'Bravo'.",
    level: "advanced"
  },
  {
    id: 19,
    question: "Identify the Closed Class word in the following list: 'innovate', 'resilient', 'underneath', 'enthusiasm'.",
    options: ["innovate", "resilient", "underneath", "enthusiasm"],
    correctAnswer: 2,
    answer: "underneath",
    explanation: "'Underneath' is a spatial preposition (Closed Class). 'Innovate' is a verb, 'resilient' is an adjective, and 'enthusiasm' is a noun (all Open Class).",
    explanationBn: "'Underneath' হলো একটি Preposition (Closed Class)। বাকি তিনটি শব্দ যথাক্রমে Verb, Adjective ও Noun (Open Class)।",
    hint: "Find the preposition of location.",
    level: "intermediate"
  },
  {
    id: 20,
    question: "Why do dictionary makers publish new editions every few years?",
    options: [
      "To change the spelling of pronouns",
      "To incorporate newly coined Open Class words (nouns, verbs, adjectives, adverbs)",
      "Because prepositions change their meaning entirely every year",
      "To remove all closed classes"
    ],
    correctAnswer: 1,
    answer: "To incorporate newly coined Open Class words (nouns, verbs, adjectives, adverbs)",
    explanation: "Dictionaries update constantly because the Open Class lexicon expands with hundreds of newly coined words every year.",
    explanationBn: "অভিধানগুলো প্রতি কয়েক বছর অন্তর পরিবর্ধিত হয় কারণ সমাজ ও প্রযুক্তির সাথে সাথে অজস্র নতুন Noun, Verb ও Adjective যুক্ত হয়।",
    hint: "New words are added from technology and culture.",
    level: "basic"
  },
  {
    id: 21,
    question: "In the sentence 'Debangshu quickly uploaded his new project onto the portal', how many CLOSED class words are there?",
    options: ["1 word", "2 words ('his', 'onto', 'the' = 3 words)", "3 words ('his', 'onto', 'the')", "6 words"],
    correctAnswer: 2,
    answer: "3 words ('his', 'onto', 'the')",
    explanation: "'his' (possessive pronoun/determiner), 'onto' (preposition), and 'the' (definite article) are the 3 closed class words.",
    explanationBn: "'his' (Pronoun/Determiner), 'onto' (Preposition), এবং 'the' (Article) — এই ৩টি শব্দ হলো Closed Class।",
    hint: "Count pronouns, prepositions, and articles.",
    level: "intermediate"
  },
  {
    id: 22,
    question: "Which of the following is true regarding Bengali-medium students learning English Closed Classes?",
    options: [
      "Closed classes can be ignored completely",
      "Bengali postpositions and inflections (বিভক্তি) must be systematically mapped to English prepositions and structural words",
      "Bengali has more articles than English",
      "Closed classes in English have no grammar rules"
    ],
    correctAnswer: 1,
    answer: "Bengali postpositions and inflections (বিভক্তি) must be systematically mapped to English prepositions and structural words",
    explanation: "Bengali attaches inflections (যেমন: 'কলমে', 'ঘরে') or uses postpositions (যেমন: 'টেবিলের ওপর'), whereas English uses pre-positioned Closed Class words ('on the table', 'with a pen').",
    explanationBn: "বাংলায় বিভক্তি বা অনুসর্গ পদের পরে বসে, কিন্তু ইংরেজিতে Preposition সর্বদা Noun-এর পূর্বে বসে; এই পার্থক্যটি আয়ত্ত করাই Closed Class শেখার মূল কৌশল।",
    hint: "Think about the difference between 'ঘরে' (-এ বিভক্তি) and 'in the room'.",
    level: "intermediate"
  },
  {
    id: 23,
    question: "When a speaker creates a nonsense word like 'splooging', why can listeners immediately identify it as a verb?",
    options: [
      "Because English speakers know all words in advance",
      "Because the '-ing' suffix and structural position identify it as an Open Class verb slot",
      "Because nonsense words are always adverbs",
      "Because it contains vowels"
    ],
    correctAnswer: 1,
    answer: "Because the '-ing' suffix and structural position identify it as an Open Class verb slot",
    explanation: "Open class words take regular grammatical inflections (-ing, -ed, -s, -ly), allowing listeners to identify their grammatical slot even if the root is novel.",
    explanationBn: "Open Class শব্দগুলো ব্যাকরণগত প্রত্যয় (-ing, -ed, -ly) গ্রহণ করতে পারে, যার ফলে নতুন বা অপরিচিত শব্দও বাক্যের অবস্থান দেখে চেনা যায়।",
    hint: "Structural suffixes indicate the part of speech.",
    level: "advanced"
  },
  {
    id: 24,
    question: "Which group of words below contains ONLY Open Class words?",
    options: [
      "cat, run, happy, quickly",
      "in, and, she, the",
      "under, but, they, a",
      "from, although, who, must"
    ],
    correctAnswer: 0,
    answer: "cat, run, happy, quickly",
    explanation: "'cat' (Noun), 'run' (Verb), 'happy' (Adjective), 'quickly' (Adverb) are all four core Open Classes.",
    explanationBn: "'cat' (Noun), 'run' (Verb), 'happy' (Adjective), এবং 'quickly' (Adverb) — এই চারটি পদই Open Class-এর অন্তর্ভুক্ত।",
    hint: "Look for noun, verb, adjective, adverb.",
    level: "basic"
  },
  {
    id: 25,
    question: "Mastering the Closed Classes of English is crucial for competitive exams primarily because:",
    options: [
      "They change every decade",
      "Over 70% of error-spotting questions test prepositions, pronoun agreements, determiners, and conjunctions",
      "Open class words are never tested in exams",
      "Closed class words have no correct answers"
    ],
    correctAnswer: 1,
    answer: "Over 70% of error-spotting questions test prepositions, pronoun agreements, determiners, and conjunctions",
    explanation: "In board and competitive examinations (SSC, Banking, WBCS), syntactic precision in closed class usage (fixed prepositions, correlative conjunctions, pronoun cases) forms the core of error identification.",
    explanationBn: "যেকোনো প্রতিযোগিতামূলক বা বোর্ড পরীক্ষায় স্পটিং এররস ও সিনট্যাক্সের অধিকাংশ প্রশ্ন Preposition, Conjunction, Pronoun Concord এবং Determiners থেকেই আসে।",
    hint: "Think about error-spotting and sentence correction questions.",
    level: "advanced"
  }
];

export default questions;
