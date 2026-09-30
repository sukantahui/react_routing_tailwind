// topic7_questions.js
// Topic 7: Interactive Word Classification Workbench & Diagnostics

const questions = [
  {
    id: 1,
    question: "In the sentence 'The exceptionally diligent scholar solved the complex calculus problem with remarkable ease', what is 'exceptionally'?",
    options: ["Adjective", "Adverb of Degree", "Noun", "Conjunction"],
    correctAnswer: 1,
    explanation: "'Exceptionally' modifies the adjective 'diligent', specifying the degree of diligence.",
    explanationBn: "'Exceptionally' হলো Adverb of Degree যা 'diligent' Adjective-এর মাত্রা বৃদ্ধি করেছে।"
  },
  {
    id: 2,
    question: "In the same sentence, what is 'with remarkable ease' functioning as syntactically?",
    options: ["Adjective phrase", "Adverbial Prepositional Phrase of Manner", "Noun clause", "Direct object"],
    correctAnswer: 1,
    explanation: "'With remarkable ease' is a prepositional phrase answering 'How did he solve it?' (Adverbial of Manner).",
    explanationBn: "'With remarkable ease' একটি Prepositional Phrase যা কাজটি কীভাবে সম্পন্ন হয়েছিল (Adverb of Manner) তা বোঝাচ্ছে।"
  },
  {
    id: 3,
    question: "In 'Bravo! You executed the algorithm flawlessly', what parts of speech are 'Bravo!' and 'flawlessly'?",
    options: [
      "'Bravo!' is an Interjection; 'flawlessly' is an Adverb of Manner",
      "Both are adjectives",
      "Both are nouns",
      "'Bravo!' is a verb"
    ],
    correctAnswer: 0,
    explanation: "'Bravo!' expresses spontaneous praise (Interjection); 'flawlessly' modifies the verb 'executed' (Adverb of Manner).",
    explanationBn: "'Bravo!' হলো Interjection এবং 'flawlessly' হলো 'executed' ক্রিয়ার Adverb of Manner।"
  },
  {
    id: 4,
    question: "In 'Neither Swadeep nor Debangshu missed the morning session', what is 'Neither... nor'?",
    options: ["Correlative Conjunction", "Coordinating Conjunction", "Preposition", "Relative Pronoun"],
    correctAnswer: 0,
    explanation: "'Neither... nor' functions as a paired correlative conjunction joining two coordinate subjects.",
    explanationBn: "'Neither... nor' হলো Correlative Conjunction যা দুটি Subject-কে সংযুক্ত করেছে।"
  },
  {
    id: 5,
    question: "In 'He went inside because the weather outside turned hostile', what are 'inside' and 'outside'?",
    options: [
      "'inside' is an Adverb of Place; 'outside' is an Adverb/Prepositional modifier of Place",
      "Both are verbs",
      "Both are conjunctions",
      "Both are interjections"
    ],
    correctAnswer: 0,
    explanation: "'Inside' modifies 'went' (where); 'outside' modifies the weather's location.",
    explanationBn: "'inside' এবং 'outside' উভয়েই স্থান নির্দেশক Adverb of Place হিসেবে ব্যবহৃত।"
  },
  {
    id: 6,
    question: "In 'That brilliant idea of yours saved the entire project', what is 'That'?",
    options: ["Demonstrative Adjective / Determiner", "Relative Pronoun", "Conjunction", "Adverb"],
    correctAnswer: 0,
    explanation: "'That' sits directly before the noun phrase 'brilliant idea', acting as a Demonstrative Determiner.",
    explanationBn: "'That' এখানে 'brilliant idea' Noun Phrase-এর পূর্বে বসে Demonstrative Determiner হিসেবে কাজ করছে।"
  },
  {
    id: 7,
    question: "In 'I know that you will succeed', what is 'that'?",
    options: ["Demonstrative Pronoun", "Subordinating Conjunction (Complementizer)", "Adjective", "Preposition"],
    correctAnswer: 1,
    explanation: "'That' links the matrix clause 'I know' to the nominal object clause 'you will succeed' (Subordinating Conjunction).",
    explanationBn: "'that' এখানে দুটি Clause যুক্ত করে Subordinating Conjunction হিসেবে বসেছে।"
  },
  {
    id: 8,
    question: "In 'Look at that!', what is 'that'?",
    options: ["Demonstrative Pronoun", "Conjunction", "Adjective", "Adverb"],
    correctAnswer: 0,
    explanation: "'That' stands alone as the object of the preposition 'at', functioning as a Demonstrative Pronoun.",
    explanationBn: "'that' একা বসে 'at' Preposition-এর Object হিসেবে Demonstrative Pronoun-এর কাজ করছে।"
  },
  {
    id: 9,
    question: "What does the 'Token-by-Token Sentence Parsing' method achieve for a learner?",
    options: [
      "It eliminates guesswork by assigning exact syntactic duties to every word in the clause based on context",
      "It teaches speed typing",
      "It converts text to audio",
      "It deletes unnecessary punctuation"
    ],
    correctAnswer: 0,
    explanation: "Token parsing enables rigorous grammatical deconstruction, ensuring absolute certainty in error spotting and syntax.",
    explanationBn: "টোকেন পার্সিং পদ্ধতির মাধ্যমে বাক্যের প্রতিটি শব্দের প্রকৃত ব্যাকরণগত ভূমিকা নিখুঁতভাবে বিশ্লেষণ করা যায়।"
  },
  {
    id: 10,
    question: "In the sentence 'Although he walked fast, he arrived late', how many open-class words are present?",
    options: [
      "3 ('walked' [V], 'fast' [Adv], 'arrived' [V], 'late' [Adv]) - Total 4 open class words",
      "0",
      "1",
      "8"
    ],
    correctAnswer: 0,
    explanation: "'walked' (Verb), 'fast' (Adverb), 'arrived' (Verb), 'late' (Adverb) are Open Class content words (4 total). 'Although' and 'he' are closed class words.",
    explanationBn: "'walked' (Verb), 'fast' (Adverb), 'arrived' (Verb), 'late' (Adverb) — এই ৪টি হলো Open Class শব্দ।"
  }
];

export default questions;
