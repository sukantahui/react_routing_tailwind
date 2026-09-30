// topic0_questions.js
// Module 002_001: Noun Classification, Number Invariants & Irregular Plurals
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "Which of the following sentences contains an UNCOUNTABLE NOUN error?",
    options: [
      "The professor provided valuable pieces of advice.",
      "The tourist bought new furnitures for his Barrackpore apartment.",
      "She has thick dark hair.",
      "We collected sufficient data for the analysis."
    ],
    correctAnswer: 1,
    explanation: "'Furniture' is an uncountable mass noun in English and never takes a plural '-s'. The correct form is 'furniture' (or 'items of furniture').",
    explanationBn: "'Furniture' একটি Uncountable Mass Noun, যার সাথে কখনোই বহুবচনে '-s' যুক্ত হয় না। সঠিক রূপ হলো 'furniture' বা 'items of furniture'।"
  },
  {
    id: 2,
    question: "What is the plural form of the Greek loanword 'Phenomenon'?",
    options: [
      "Phenomenons",
      "Phenomenas",
      "Phenomena",
      "Phenomenies"
    ],
    correctAnswer: 2,
    explanation: "In Greek loanwords ending in '-on', the plural is formed by mutating '-on' to '-a': 'Phenomenon' (Singular) $\\rightarrow$ 'Phenomena' (Plural). Similarly, 'Criterion' $\\rightarrow$ 'Criteria'.",
    explanationBn: "Greek শব্দ যেগুলোর শেষে '-on' থাকে, সেগুলোর Plural-এ '-a' যুক্ত হয়: 'Phenomenon' $\\rightarrow$ 'Phenomena' এবং 'Criterion' $\\rightarrow$ 'Criteria'।"
  },
  {
    id: 3,
    question: "What is the correct plural form of the compound noun 'Commander-in-chief'?",
    options: [
      "Commander-in-chiefs",
      "Commanders-in-chief",
      "Commanders-in-chiefs",
      "Commanders-ins-chief"
    ],
    correctAnswer: 1,
    explanation: "In compound nouns joined by hyphens, the plural suffix '-s' is attached strictly to the principal noun head ('Commander'), not the prepositional phrase: 'Commanders-in-chief'.",
    explanationBn: "Hyphenated Compound Noun-এর ক্ষেত্রে মূল Noun Head-এর সাথে '-s' যুক্ত করতে হয়: 'Commanders-in-chief', 'Sons-in-law', 'Passers-by'।"
  },
  {
    id: 4,
    question: "Which of the following nouns is a 'PLURALIA TANTUM' (a noun that exists ONLY in plural form and takes a plural verb)?",
    options: [
      "News",
      "Mathematics",
      "Scissors",
      "Innings"
    ],
    correctAnswer: 2,
    explanation: "'Scissors' is a Pluralia Tantum (consisting of two hinged parts) and strictly takes a plural verb: 'The scissors ARE sharp' (unless preceded by 'A pair of'). News, Mathematics, and Innings are singular in meaning.",
    explanationBn: "'Scissors' হলো Pluralia Tantum (দুটি সমঅংশের সমষ্টি), যা সর্বদাই Plural Verb গ্রহণ করে: 'The scissors are sharp'। কিন্তু News ও Mathematics দেখতে Plural হলেও অর্থে Singular।"
  },
  {
    id: 5,
    question: "In the sentence 'The cattle ________ grazing in the meadow near Ichapur', which verb correctly fills the blank?",
    options: [
      "is",
      "are",
      "was",
      "has been"
    ],
    correctAnswer: 1,
    explanation: "'Cattle' is a collective noun plural in form and meaning without an '-s'. It strictly takes a plural verb: 'The cattle ARE grazing'. (Saying 'cattles' is a serious grammatical error).",
    explanationBn: "'Cattle' শব্দটি কোনো '-s' ছাড়াই সর্বদাই Plural এবং Plural Verb গ্রহণ করে: 'The cattle are grazing'। 'Cattles' লেখা সম্পূর্ণ ভুল।"
  },
  {
    id: 6,
    question: "What is the plural form of the Latin noun 'Crisis'?",
    options: [
      "Crisiss",
      "Crises",
      "Crisises",
      "Crisi"
    ],
    correctAnswer: 1,
    explanation: "Latin/Greek loanwords ending in '-is' form their plural by changing '-is' to '-es' (pronounced /i:z/): 'Crisis' $\\rightarrow$ 'Crises'; 'Thesis' $\\rightarrow$ 'Theses'; 'Basis' $\\rightarrow$ 'Bases'; 'Analysis' $\\rightarrow$ 'Analyses'.",
    explanationBn: "যেসব বিদেশি শব্দের শেষে '-is' থাকে, সেগুলোর Plural-এ '-es' হয়: 'Crisis' $\\rightarrow$ 'Crises', 'Thesis' $\\rightarrow$ 'Theses', 'Analysis' $\\rightarrow$ 'Analyses'।"
  },
  {
    id: 7,
    question: "What is the plural of 'Radius' in mathematics?",
    options: [
      "Radiuses",
      "Radii",
      "Radia",
      "Both A and B (Radii is preferred in formal mathematics)"
    ],
    correctAnswer: 3,
    explanation: "Latin loanwords ending in '-us' traditionally pluralize to '-i': 'Radius' $\\rightarrow$ 'Radii' (preferred in formal science/mathematics), though anglicized 'radiuses' is also recorded in general usage.",
    explanationBn: "Latin শব্দ '-us' যুক্ত থাকলে Plural-এ '-i' হয়: 'Radius' $\\rightarrow$ 'Radii' (গণিতে সর্বাধিক ব্যবহৃত) এবং 'Focus' $\\rightarrow$ 'Foci'।"
  },
  {
    id: 8,
    question: "In the sentence 'The committee ________ divided in their opinions on the new curriculum', which verb is appropriate?",
    options: [
      "was",
      "were",
      "is",
      "has been"
    ],
    correctAnswer: 1,
    explanation: "When a Collective Noun acts not as a unified body but as divided individual members with conflicting actions/views (indicated by 'their opinions'), it takes a PLURAL verb: 'were divided'.",
    explanationBn: "Collective Noun যখন ঐক্যবদ্ধভাবে কাজ না করে সদস্যদের মধ্যে মতবিরোধ বা ভিন্নতা প্রকাশ করে ('their opinions'), তখন তা Plural Verb 'were' গ্রহণ করে।"
  },
  {
    id: 9,
    question: "Which of the following uncountable nouns is frequently misused with an erroneous plural in competitive examinations?",
    options: [
      "Scenery",
      "Information",
      "Luggage",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "'Scenery', 'Information', 'Luggage', 'Baggage', 'Poetry', and 'Machinery' are all mass/uncountable nouns that never take '-s' or the indefinite article 'a/an' directly.",
    explanationBn: "'Scenery', 'Information', 'Luggage', 'Poetry', 'Machinery'—এগুলো সবই Uncountable Nouns; এদের সাথে কখনো '-s' যুক্ত হয় না এবং সরাসরি 'a/an' বসে না।"
  },
  {
    id: 10,
    question: "What is the plural of 'Passer-by'?",
    options: [
      "Passer-bys",
      "Passers-by",
      "Passers-bys",
      "Passer-by"
    ],
    correctAnswer: 1,
    explanation: "The noun head is 'Passer', while 'by' is an adverbial particle. The plural marker '-s' attaches to the noun: 'Passers-by'.",
    explanationBn: "'Passer' হলো মূল Noun Head, তাই Plural করার সময় '-s' মূল Noun-এ যুক্ত হয়: 'Passers-by'।"
  },
  {
    id: 11,
    question: "Which of the following nouns forms its plural via an INTERNAL VOWEL MUTATION (Ablaut/Umlaut)?",
    options: [
      "Book",
      "Foot",
      "Boy",
      "Cat"
    ],
    correctAnswer: 1,
    explanation: "'Foot' mutates its internal double-o to double-e: 'Foot' $\\rightarrow$ 'Feet'. Other internal vowel shifts include Tooth $\\rightarrow$ Teeth, Goose $\\rightarrow$ Geese, Mouse $\\rightarrow$ Mice, Man $\\rightarrow$ Men.",
    explanationBn: "'Foot' শব্দের ভেতরের Vowel পরিবর্তিত হয়ে Plural গঠিত হয়: 'Foot' $\\rightarrow$ 'Feet' (একইভাবে Tooth $\\rightarrow$ Teeth, Goose $\\rightarrow$ Geese, Mouse $\\rightarrow$ Mice)।"
  },
  {
    id: 12,
    question: "Identify the part of speech and category of 'Barrackpore' in: 'Barrackpore is situated on the eastern bank of the Hooghly River.'",
    options: [
      "Common Noun",
      "Proper Noun",
      "Collective Noun",
      "Abstract Noun"
    ],
    correctAnswer: 1,
    explanation: "'Barrackpore' names a specific unique geographical location and is always capitalized. It is a Proper Noun.",
    explanationBn: "'Barrackpore' একটি নির্দিষ্ট স্থানের নাম এবং সর্বদা Capital Letter দিয়ে শুরু হয়, তাই এটি Proper Noun (সংজ্ঞাবাচক বিশেষ্য)।"
  },
  {
    id: 13,
    question: "In the sentence 'Honesty is praised everywhere, but practiced rarely', what type of noun is 'Honesty'?",
    options: [
      "Proper Noun",
      "Material Noun",
      "Abstract Noun",
      "Collective Noun"
    ],
    correctAnswer: 2,
    explanation: "'Honesty' denotes an intangible virtue or moral quality that cannot be experienced through physical senses. It is an Abstract Noun.",
    explanationBn: "'Honesty' (সততা) একটি বিমূর্ত মানবিক গুণ বা আদর্শ প্রকাশ করে যা ইন্দ্রিয়গ্রাহ্য নয়, তাই এটি Abstract Noun (গুণবাচক বিশেষ্য)।"
  },
  {
    id: 14,
    question: "What is the correct plural of 'Alumnus' (a male graduate)?",
    options: [
      "Alumnuses",
      "Alumni",
      "Alumnae",
      "Alumna"
    ],
    correctAnswer: 1,
    explanation: "'Alumnus' (Latin masculine singular) $\\rightarrow$ 'Alumni' (Masculine/Mixed plural). 'Alumna' (Feminine singular) $\\rightarrow$ 'Alumnae' (Feminine plural).",
    explanationBn: "'Alumnus' (পুরুষ গ্র্যাজুয়েট)-এর Plural হলো 'Alumni'। 'Alumna' (নারী গ্র্যাজুয়েট)-এর Plural হলো 'Alumnae'।"
  },
  {
    id: 15,
    question: "In the sentence 'The police ________ investigating the cybercrime case in Naihati', which verb is correct?",
    options: [
      "is",
      "are",
      "has been",
      "was"
    ],
    correctAnswer: 1,
    explanation: "'Police' is a plural noun referring to the institutional personnel and strictly requires a plural verb: 'The police ARE investigating'. (To refer to one person, say 'a police officer').",
    explanationBn: "'Police' শব্দটি ব্যাকরণগতভাবে সর্বদাই Plural এবং Plural Verb গ্রহণ করে: 'The police are investigating' (একক ব্যক্তি বোঝাতে 'a police officer' বলতে হয়)।"
  },
  {
    id: 16,
    question: "What is the plural of 'Datum' (a single piece of information)?",
    options: [
      "Datums",
      "Data",
      "Datas",
      "Datae"
    ],
    correctAnswer: 1,
    explanation: "Latin singular '-um' mutates to '-a': 'Datum' (Singular) $\\rightarrow$ 'Data' (Plural). In formal academic and technical contexts, 'data' is the plural of 'datum'.",
    explanationBn: "Latin শব্দ '-um'-এর Plural হলো '-a': 'Datum' $\\rightarrow$ 'Data', 'Medium' $\\rightarrow$ 'Media', 'Stratum' $\\rightarrow$ 'Strata'।"
  },
  {
    id: 17,
    question: "Which of the following nouns has the SAME FORM in both singular and plural?",
    options: [
      "Sheep",
      "Deer",
      "Species",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "'Sheep', 'Deer', 'Species', 'Series', and 'Offspring' maintain identical morphological forms in both singular and plural (e.g., 'one sheep', 'ten sheep').",
    explanationBn: "'Sheep', 'Deer', 'Species', 'Series'—এসব শব্দের Singular ও Plural রূপ একই থাকে (কখনোই 'sheeps' বা 'deers' হয় না)।"
  },
  {
    id: 18,
    question: "In the sentence 'Mathematics ________ my favorite subject in school', which verb correctly fills the blank?",
    options: [
      "is",
      "are",
      "were",
      "have been"
    ],
    correctAnswer: 0,
    explanation: "Academic disciplines ending in '-ics' (Mathematics, Physics, Economics, Politics, Ethics) are singular in meaning and take singular verbs: 'Mathematics IS my favorite subject'.",
    explanationBn: "যেসব বিষয়ের শেষে '-ics' থাকে (Mathematics, Physics, Economics), সেগুলো দেখতে Plural হলেও অর্থে Singular, তাই Singular Verb 'is' বসে।"
  },
  {
    id: 19,
    question: "What is the plural of 'Brother-in-law'?",
    options: [
      "Brother-in-laws",
      "Brothers-in-law",
      "Brothers-in-laws",
      "Brother-ins-law"
    ],
    correctAnswer: 1,
    explanation: "The plural suffix '-s' attaches to the principal noun head: 'Brothers-in-law'. (Possessive apostrophe attaches to the end: 'Brother-in-law's house').",
    explanationBn: "Plural করার সময় মূল Noun Head-এ '-s' বসে ('Brothers-in-law'); কিন্তু Possessive করার সময় শেষে অপোস্ট্রফি বসে ('Brother-in-law's')।"
  },
  {
    id: 20,
    question: "What is the plural of 'Index' in scientific and mathematical publishing?",
    options: [
      "Indexes",
      "Indices",
      "Both A and B (Indices in math; Indexes for book contents)",
      "Indexies"
    ],
    correctAnswer: 2,
    explanation: "Both are standard with register distinction: 'Indices' is preferred in mathematics and economics (power/exponents); 'Indexes' is used for alphabetical book bibliographies.",
    explanationBn: "গণিত ও বিজ্ঞানের ক্ষেত্রে 'Indices' ব্যবহৃত হয়; বইয়ের সূচিপত্রের ক্ষেত্রে 'Indexes' ব্যবহৃত হয়।"
  },
  {
    id: 21,
    question: "In the sentence 'A flock of birds ________ flying across the evening sky over Barrackpore', which verb is correct?",
    options: [
      "was",
      "were",
      "are",
      "have been"
    ],
    correctAnswer: 0,
    explanation: "The collective subject is the singular noun phrase 'A flock' (acting as a single unit), so it takes the singular verb 'was'.",
    explanationBn: "বাক্যের মূল Subject হলো Singular Collective Noun Phrase 'A flock', তাই Singular Verb 'was' বসবে।"
  },
  {
    id: 22,
    question: "What is the plural of the Latin word 'Formula'?",
    options: [
      "Formulas",
      "Formulae",
      "Both A and B (Formulae in pure mathematics/science; Formulas in general usage)",
      "Formuli"
    ],
    correctAnswer: 2,
    explanation: "Latin '-a' mutates to '-ae' in traditional scientific prose ('Formulae'), while anglicized 'Formulas' is common in general English.",
    explanationBn: "বিজ্ঞান ও গণিতে ঐতিহ্যবাহী Latin রূপ 'Formulae' এবং সাধারণ ব্যবহারে 'Formulas' উভয়ই প্রচলিত।"
  },
  {
    id: 23,
    question: "Which of the following nouns is a MATERIAL NOUN?",
    options: [
      "Gold",
      "Water",
      "Cotton",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Gold, Water, Cotton, Silver, and Iron are Material Nouns denoting raw physical substances from which objects are manufactured.",
    explanationBn: "Gold, Water, Cotton, Iron—যেসব বস্তু থেকে অন্যান্য জিনিস তৈরি হয়, সেগুলোকে Material Noun (বস্তুবাচক বিশেষ্য) বলে।"
  },
  {
    id: 24,
    question: "What is the plural form of the singular noun 'Oasis'?",
    options: [
      "Oasises",
      "Oases",
      "Oasi",
      "Oasies"
    ],
    correctAnswer: 1,
    explanation: "Like 'crisis' $\\rightarrow$ 'crises', 'Oasis' changes '-is' to '-es' in plural: 'Oases'.",
    explanationBn: "'Crisis $\\rightarrow$ Crises'-এর মতো 'Oasis'-এর Plural হলো 'Oases'।"
  },
  {
    id: 25,
    question: "Why is mastering Noun Countability and Irregular Plurals critical for Bengali-medium students in competitive exams?",
    options: [
      "Because Bengali allows pluralizing mass concepts (যেমন: 'অনেক তথ্য/উপদেশ'), whereas English strictly treats them as uncountable invariants (Information, Advice) that forbid direct pluralization.",
      "Because Bengali nouns never have plurals.",
      "Because English has only 10 nouns.",
      "Because it only matters in spelling tests."
    ],
    correctAnswer: 0,
    explanation: "Bengali allows countable usage for concepts like information ('অনেক খবর/তথ্য'), but English grammar mandates that 'Information', 'Advice', and 'Furniture' are strictly uncountable, causing frequent translation errors.",
    explanationBn: "বাংলায় 'অনেক উপদেশ/তথ্য' স্বাভাবিকভাবে বলা গেলেও ইংরেজিতে 'Advices/Informations' লেখা সম্পূর্ণ ভুল। তাই Noun Countability জানা অপরিহার্য।"
  }
];

export default questions;
