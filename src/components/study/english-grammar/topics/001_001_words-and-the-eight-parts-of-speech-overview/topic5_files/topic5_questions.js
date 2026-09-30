// topic5_questions.js
// Topic 5: High-Level Overview of Prepositions, Conjunctions, and Interjections

const questions = [
  {
    id: 1,
    question: "What is the primary role of a PREPOSITION in a sentence?",
    options: [
      "To connect a noun or pronoun phrase to another element in the clause, showing spatial, temporal, or logical relations",
      "To express sudden joy",
      "To replace the main verb",
      "To make nouns plural"
    ],
    correctAnswer: 0,
    explanation: "Prepositions link nominal elements (objects of preposition) to verbs, nouns, or adjectives to establish location, time, direction, or agency.",
    explanationBn: "Preposition কোনো Noun বা Pronoun-এর পূর্বে বসে বাক্যের অন্য পদের সাথে তার স্থান, কাল বা সম্পর্ক নির্দেশ করে।"
  },
  {
    id: 2,
    question: "Which of the following contains the 7 COORDINATING conjunctions (FANBOYS)?",
    options: [
      "For, And, Nor, But, Or, Yet, So",
      "From, At, Near, By, On, You, Since",
      "First, Also, Next, Because, Or, Yet, Still",
      "Few, All, None, Both, Other, You, Some"
    ],
    correctAnswer: 0,
    explanation: "The mnemonic FANBOYS represents: For, And, Nor, But, Or, Yet, So.",
    explanationBn: "FANBOYS দিয়ে ৭টি প্রধান Coordinating Conjunction মনে রাখা হয়: For, And, Nor, But, Or, Yet, So।"
  },
  {
    id: 3,
    question: "In 'He worked hard although he was unwell', what type of conjunction is 'although'?",
    options: ["Coordinating Conjunction", "Subordinating Conjunction", "Correlative Conjunction", "Relative Pronoun"],
    correctAnswer: 1,
    explanation: "'Although' introduces a dependent/subordinate clause of concession.",
    explanationBn: "'Although' একটি Subordinating Conjunction যা Subordinate Clause যুক্ত করে।"
  },
  {
    id: 4,
    question: "Which of the following is a CORRELATIVE conjunction pair?",
    options: ["Either... or", "In and out", "Quickly and slowly", "Above and below"],
    correctAnswer: 0,
    explanation: "'Either... or' (along with 'neither... nor', 'not only... but also', 'both... and') is a correlative pair working in tandem.",
    explanationBn: "'Either... or' হলো Correlative Conjunction যা জোড়ায় জোড়ায় বসে দুটি সমান পদ বা ক্লজকে যুক্ত করে।"
  },
  {
    id: 5,
    question: "In 'Alas! We missed the golden opportunity', what part of speech is 'Alas!'?",
    options: ["Interjection", "Preposition", "Conjunction", "Adverb"],
    correctAnswer: 0,
    explanation: "'Alas!' is an interjection expressing sudden grief or sorrow and is grammatically independent of the sentence structure.",
    explanationBn: "'Alas!' একটি Interjection (আবেগসূচক অব্যয়), যা তীব্র দুঃখ বা আক্ষেপ প্রকাশ করে।"
  },
  {
    id: 6,
    question: "In 'He arrived before noon' vs 'He arrived before the train left', what are the parts of speech of 'before'?",
    options: [
      "1st is Preposition (followed by noun phrase); 2nd is Subordinating Conjunction (followed by a clause)",
      "Both are adverbs",
      "Both are prepositions",
      "1st is conjunction; 2nd is preposition"
    ],
    correctAnswer: 0,
    explanation: "In sentence 1, 'before' is a preposition governing the nominal 'noon'; in sentence 2, 'before' connects a full clause (S + V) and is a conjunction.",
    explanationBn: "প্রথম বাক্যে 'noon' Noun-এর পূর্বে বসায় 'before' হলো Preposition; দ্বিতীয় বাক্যে পূর্ণাঙ্গ Clause যুক্ত করায় 'before' হলো Conjunction।"
  },
  {
    id: 7,
    question: "What case must a pronoun take when it serves as the OBJECT of a preposition?",
    options: ["Objective (Accusative) Case (e.g., 'between you and me')", "Nominative Case (e.g., 'between you and I')", "Possessive Case", "Vocative Case"],
    correctAnswer: 0,
    explanation: "Objects of prepositions strictly mandate the objective case: 'between you and me' (never 'between you and I').",
    explanationBn: "Preposition-এর পর Pronoun সর্বদা Objective Case-এ বসে (যেমন: 'between you and me')।"
  },
  {
    id: 8,
    question: "Which of the following prepositions indicates motion into an enclosed space?",
    options: ["In", "Into", "On", "Onto"],
    correctAnswer: 1,
    explanation: "'Into' indicates dynamic motion entering an interior space, whereas 'in' indicates static state inside.",
    explanationBn: "'Into' গতি সহকারে কোনো কিছুর ভেতরে প্রবেশ করা বোঝায়, আর 'in' স্থির অবস্থা নির্দেশ করে।"
  },
  {
    id: 9,
    question: "In 'She was not only brilliant but also exceptionally humble', what syntactic rule must be maintained?",
    options: [
      "Parallelism: Both elements following the correlative pair must share the same grammatical form",
      "The first word must be capitalized",
      "No verb can be used",
      "The sentence must end with an exclamation mark"
    ],
    correctAnswer: 0,
    explanation: "Correlative conjunctions require strict syntactic parallelism on both sides of the pair.",
    explanationBn: "Correlative Conjunction-এর উভয় পাশে সমান পদমর্যাদার ব্যাকরণগত উপাদান (Parallelism) বজায় রাখতে হয়।"
  },
  {
    id: 10,
    question: "Why are Interjections grammatically unique among the eight parts of speech?",
    options: [
      "Because they have no structural or grammatical connection to the rest of the sentence and stand alone as emotive markers",
      "Because they are always 10 letters long",
      "Because they replace all nouns",
      "Because they cannot be spoken aloud"
    ],
    correctAnswer: 0,
    explanation: "Interjections express spontaneous emotional outbursts and do not enter into subject/predicate grammatical relations with the main clause.",
    explanationBn: "Interjection বাক্যের অন্য কোনো পদের সাথে সরাসরি ব্যাকরণগত সম্পর্কে আবদ্ধ থাকে না, এটি স্বতন্ত্র আবেগ প্রকাশক ধ্বনি।"
  }
];

export default questions;
