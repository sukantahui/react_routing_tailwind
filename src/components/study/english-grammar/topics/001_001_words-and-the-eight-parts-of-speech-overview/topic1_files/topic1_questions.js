// topic1_questions.js
// Topic 1: Open Classes vs Closed Classes

const questions = [
  {
    id: 1,
    question: "Which of the following word classes belongs to the 'Open Class' category?",
    options: ["Preposition", "Conjunction", "Adverb", "Pronoun"],
    correctAnswer: 2,
    explanation: "Adverbs belong to the Open Class because new adverbs can be freely coined or borrowed as language evolves (e.g., 'cybernetically', 'algorithmically').",
    explanationBn: "Adverb হলো Open Class-এর অন্তর্ভুক্ত কারণ ভাষার বিবর্তনের সাথে সাথে নিত্যনতুন Adverb তৈরি বা গ্রহণ করা যায়।"
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
    explanation: "Closed classes consist of structural, grammatical words whose total inventory remains relatively static and closed to new coinages.",
    explanationBn: "Closed Class-এর শব্দের সংখ্যা নির্দিষ্ট ও সীমাবদ্ধ; দৈনন্দিন ভাষায় সহজে নতুন কোনো Preposition বা Conjunction যোগ হয় না।"
  },
  {
    id: 3,
    question: "When a new technological term like 'to google' enters the dictionary as a verb, which class does it expand?",
    options: ["Closed Class (Auxiliary)", "Open Class (Lexical Verb)", "Closed Class (Determiner)", "Closed Class (Conjunction)"],
    correctAnswer: 1,
    explanation: "Lexical verbs are Open Class items, continuously expanding with modern culture, technology, and science.",
    explanationBn: "মূল ক্রিয়া (Lexical Verbs) হলো Open Class, যা নতুন প্রযুক্তি বা সংস্কৃতির সাথে নতুন শব্দ গ্রহণ করে প্রসারিত হয়।"
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
    explanation: "Prepositions and Conjunctions are both core grammatical Closed Classes serving structural linking roles.",
    explanationBn: "Preposition এবং Conjunction উভয়ই Closed Class, যা ব্যাকরণগত সম্পর্ক তৈরিতে সাহায্য করে।"
  },
  {
    id: 5,
    question: "What syntactic role do Closed Class words primarily perform?",
    options: [
      "Carrying primary lexical/semantic content",
      "Providing structural relationships and grammatical framework",
      "Replacing all verbs in a sentence",
      "Serving only as decorative poetic devices"
    ],
    correctAnswer: 1,
    explanation: "Closed class words (functors) establish structural, spatial, temporal, and logical relationships between open class lexical items.",
    explanationBn: "Closed Class শব্দগুলো মূলত বিভিন্ন পদের মধ্যে ব্যাকরণগত ও যৌক্তিক সম্পর্ক (Structural Framework) স্থাপন করে।"
  },
  {
    id: 6,
    question: "Which of the following is an example of an Open Class word created in the digital age?",
    options: ["Behind", "Selfie", "Although", "Whom"],
    correctAnswer: 1,
    explanation: "'Selfie' is a noun (Open Class) coined in recent decades to describe a smartphone self-portrait.",
    explanationBn: "'Selfie' একটি আধুনিক Noun (Open Class), যা ডিজিটাল যুগে নতুন সৃষ্টি হয়েছে।"
  },
  {
    id: 7,
    question: "How do Open Class words differ in communicative stress in spoken English?",
    options: [
      "They are always whispered",
      "They typically carry lexical stress (content words) while closed class words are often unstressed",
      "They are never pronounced fully",
      "They have no difference from closed classes"
    ],
    correctAnswer: 1,
    explanation: "In spoken English, Open Class content words (Nouns, Main Verbs, Adjectives, Adverbs) receive rhythmic stress, whereas Closed Class function words are often reduced.",
    explanationBn: "কথ্য ইংরেজিতে Content Words (Open Class) বেশি জোর (Stress) পায় এবং Function Words (Closed Class) সাধারণত Unstressed থাকে।"
  },
  {
    id: 8,
    question: "Which category does the determiner 'the' belong to?",
    options: ["Open Class", "Closed Class", "Morphological Invariant", "Lexical Category"],
    correctAnswer: 1,
    explanation: "Determiners/Articles are Closed Class functional items with a strictly limited set in English grammar.",
    explanationBn: "Determiners/Articles হলো Closed Class কারণ এদের সংখ্যা নির্দিষ্ট এবং নতুন কোনো Article তৈরি হয় না।"
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
    explanation: "'algorithm' (Noun), 'processes' (Verb), 'data' (Noun), and 'swiftly' (Adverb) are all Open Class content words. 'The' is a closed class determiner.",
    explanationBn: "'algorithm' (Noun), 'processes' (Verb), 'data' (Noun), এবং 'swiftly' (Adverb) — এরা প্রত্যেকেই Open Class শব্দ।"
  },
  {
    id: 10,
    question: "Why is the distinction between Open and Closed classes vital for natural language processing and grammar learners?",
    options: [
      "It allows learners to memorize the entire closed system while freely expanding lexical vocabulary in open classes",
      "It proves that English has no grammar rules",
      "It eliminates the need for punctuation",
      "It only applies to Old English"
    ],
    correctAnswer: 0,
    explanation: "Understanding that closed classes are finite allows mastery of English syntax structure while open classes allow infinite vocabulary growth.",
    explanationBn: "Closed Class আয়ত্ত করলে ব্যাকরণের মূল কাঠামো বোঝা যায়, আর Open Class ক্রমাগত শব্দভাণ্ডার সমৃদ্ধ করতে সাহায্য করে।"
  }
];

export default questions;
