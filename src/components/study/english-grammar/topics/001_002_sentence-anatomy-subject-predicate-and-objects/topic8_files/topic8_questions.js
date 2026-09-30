// topic8_questions.js
// Module 001_002 | Topic 8: The 7 Fundamental Sentence Patterns

const questions = [
  {
    id: 1,
    question: "Which of the 7 structural sentence patterns is represented by 'The express train arrived'?",
    options: ["SV (Subject + Intransitive Verb)", "SVO", "SVC", "SVA"],
    correctAnswer: 0,
    explanation: "'The express train' (S) + 'arrived' (V). The verb is complete in itself and needs no object.",
    explanationBn: "এটি SV (Subject + Intransitive Verb) প্যাটার্নের উদাহরণ।"
  },
  {
    id: 2,
    question: "Identify the pattern for: 'The researcher placed the microscope on the study table.'",
    options: [
      "SVOA (Subject + Verb + Direct Object + Obligatory Adverbial)",
      "SVOO",
      "SVOC",
      "SVA"
    ],
    correctAnswer: 0,
    explanation: "'The researcher' (S) + 'placed' (V) + 'the microscope' (DO) + 'on the study table' (Obligatory Adverbial of place).",
    explanationBn: "এটি SVOA (Subject + Verb + Object + Obligatory Adverbial) প্যাটার্নের উদাহরণ।"
  },
  {
    id: 3,
    question: "What is the pattern for: 'The institute is located in Barrackpore'?",
    options: ["SVA (Subject + Verb + Obligatory Adverbial of Place)", "SV", "SVC", "SVO"],
    correctAnswer: 0,
    explanation: "'The institute' (S) + 'is located' (V) + 'in Barrackpore' (Obligatory spatial adverbial). Pattern: SVA.",
    explanationBn: "স্থান নির্দেশক Adverbial ছাড়া বাক্যটি অসম্পূর্ণ থেকে যায়, তাই এটি SVA।"
  },
  {
    id: 4,
    question: "Identify the pattern for: 'Sukanta Sir taught Tuhina English Grammar.'",
    options: ["SVOO (Subject + Ditransitive Verb + Indirect Object + Direct Object)", "SVOC", "SVO", "SVC"],
    correctAnswer: 0,
    explanation: "Two objects: 'Tuhina' (IO) and 'English Grammar' (DO). Pattern: SVOO.",
    explanationBn: "এটি SVOO (Subject + Verb + Indirect Object + Direct Object) প্যাটার্ন।"
  },
  {
    id: 5,
    question: "Identify the pattern for: 'The committee elected Debangshu team leader.'",
    options: ["SVOC (Subject + Complex-Transitive Verb + Direct Object + Object Complement)", "SVOO", "SVC", "SVO"],
    correctAnswer: 0,
    explanation: "'Debangshu' (DO) + 'team leader' (OC). Pattern: SVOC.",
    explanationBn: "এটি SVOC (Subject + Verb + Direct Object + Object Complement) প্যাটার্ন।"
  },
  {
    id: 6,
    question: "Identify the pattern for: 'The roses in the botanical garden smell exceptionally sweet.'",
    options: ["SVC (Subject + Linking Verb + Subject Complement Adjective)", "SVO", "SVA", "SV"],
    correctAnswer: 0,
    explanation: "'The roses...' (S) + 'smell' (Linking Verb) + 'sweet' (Subject Complement). Pattern: SVC.",
    explanationBn: "এটি SVC (Subject + Verb + Complement) প্যাটার্ন।"
  },
  {
    id: 7,
    question: "Why is the adverbial 'on the table' considered OBLIGATORY in SVOA with the verb 'put' or 'place'?",
    options: [
      "Because saying *'He put the book'* is grammatically and semantically incomplete without specifying the destination location",
      "Because 'table' is a noun",
      "Because 'put' is intransitive",
      "Because of spelling rules"
    ],
    correctAnswer: 0,
    explanation: "Certain verbs like 'put', 'place', 'lean' mandate both an object and a spatial adverbial to form a well-formed clause.",
    explanationBn: "'Put' বা 'place' Verb-এর পর বস্তু কোথায় রাখা হয়েছে তা না বললে বাক্য ব্যাকরণগতভাবে অসম্পূর্ণ থেকে যায়, তাই এটি Obligatory Adverbial।"
  },
  {
    id: 8,
    question: "How many basic clause patterns govern all grammatical sentences in English syntactic taxonomy?",
    options: ["7 Fundamental Patterns (Quirk / Greenbaum Taxonomy)", "2 Patterns", "25 Patterns", "100 Patterns"],
    correctAnswer: 0,
    explanation: "Comprehensive English grammar taxonomy establishes 7 fundamental clause patterns: SV, SVO, SVOO, SVC, SVOC, SVA, SVOA.",
    explanationBn: "স্ট্যান্ডার্ড ইংরেজি ব্যাকরণে ৭টি মৌলিক ক্লজ প্যাটার্ন রয়েছে: SV, SVO, SVOO, SVC, SVOC, SVA, SVOA।"
  },
  {
    id: 9,
    question: "In 'Swadeep developed a web application', what is the pattern?",
    options: ["SVO (Subject + Transitive Verb + Direct Object)", "SV", "SVC", "SVA"],
    correctAnswer: 0,
    explanation: "'Swadeep' (S) + 'developed' (V) + 'a web application' (DO). Pattern: SVO.",
    explanationBn: "এটি SVO (Subject + Verb + Object) প্যাটার্ন।"
  },
  {
    id: 10,
    question: "How does mastering the 7 sentence patterns empower students in writing and error spotting?",
    options: [
      "It allows students to verify that every sentence they write has all required grammatical arguments without missing complements or dangling fragments",
      "It eliminates the need for tenses",
      "It replaces vocabulary",
      "It only applies to spoken English"
    ],
    correctAnswer: 0,
    explanation: "Mastery of the 7 patterns ensures structurally complete clauses and flawless syntactic clarity.",
    explanationBn: "৭টি প্যাটার্ন আয়ত্ত করলে বাক্যের গঠনগত ত্রুটি ও অসম্পূর্ণতা চিরতরে দূর হয়ে যায়।"
  }
];

export default questions;
