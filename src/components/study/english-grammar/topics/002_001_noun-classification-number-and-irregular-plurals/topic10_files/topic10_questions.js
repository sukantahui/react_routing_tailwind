// topic10_questions.js
// Module 002_001 - Topic 10: Pluralization of Compound Nouns

const questions = [
  {
    id: 1,
    question: "What is the correct plural form of 'son-in-law' and 'passer-by'?",
    options: [
      "sons-in-law / passers-by",
      "son-in-laws / passer-bies",
      "sons-in-laws / passers-bies",
      "son-in-laws / passers-by"
    ],
    correctAnswer: 0,
    explanation: "In compound nouns, the plural '-s' is appended strictly to the principal noun head: 'son' -> sons-in-law, 'passer' -> passers-by.",
    explanationBn: "যৌগিক শব্দে (Compound Noun) মূল Noun Head-এর সাথে '-s' যুক্ত হয় (sons-in-law, passers-by)।"
  },
  {
    id: 2,
    question: "What is the plural of 'commander-in-chief'?",
    options: [
      "commanders-in-chief",
      "commander-in-chiefs",
      "commanders-in-chiefs",
      "commander-in-chieffs"
    ],
    correctAnswer: 0,
    explanation: "'Commander' is the principal head noun receiving the plural suffix: 'commanders-in-chief'.",
    explanationBn: "'Commander' হলো মূল Noun, তাই এর সাথে '-s' যুক্ত হয়ে 'commanders-in-chief' গঠিত হয়।"
  },
  {
    id: 3,
    question: "Which of the following compounds pluralizes BOTH components (Double Plural)?",
    options: [
      "Man-servant -> Men-servants",
      "Maid-servant -> Maids-servants",
      "Step-son -> Steps-sons",
      "Book-shelf -> Books-shelves"
    ],
    correctAnswer: 0,
    explanation: "In 'man-servant' and 'woman-doctor', both gender-noun and role-noun mutate: 'men-servants', 'women-doctors'.",
    explanationBn: "'Man-servant' এবং 'Woman-doctor' এর মতো শব্দে উভয় অংশই পরিবর্তিত হয়ে 'men-servants' ও 'women-doctors' হয়।"
  },
  {
    id: 4,
    question: "Select the correct plural of 'spoonful' and 'handful':",
    options: [
      "spoonfuls / handfuls",
      "spoonsful / handsful",
      "spoonsfull / handsfull",
      "spoonfules / handfules"
    ],
    correctAnswer: 0,
    explanation: "Nouns ending in '-ful' act as single unit measurements and take '-s' at the very end: 'spoonfuls', 'handfuls'.",
    explanationBn: "'-ful' যুক্ত শব্দগুলো একক পরিমাপ বোঝায়, তাই শেষে '-s' বসে 'spoonfuls' ও 'handfuls' হয় ('spoonsful' ভুল)।"
  },
  {
    id: 5,
    question: "Identify the error in: 'All his brother-in-laws came to visit him during the festival.'",
    options: [
      "'Brother-in-laws' is incorrect; the principal noun is 'brother', so it must be 'brothers-in-law'.",
      "'Came' should be 'come'.",
      "'Him' should be 'them'.",
      "No error."
    ],
    correctAnswer: 0,
    explanation: "Plural suffix belongs to the head noun 'brother' -> 'brothers-in-law'.",
    explanationBn: "'Brother-in-laws' সম্পূর্ণ ভুল, শুদ্ধ রূপ হলো 'brothers-in-law'।"
  },
  {
    id: 6,
    question: "What is the plural of 'maid-servant' and 'step-mother'?",
    options: [
      "maid-servants / step-mothers",
      "maids-servants / steps-mothers",
      "maids-servant / step-mothers",
      "maid-servantes / step-motheres"
    ],
    correctAnswer: 0,
    explanation: "In 'maid-servant' and 'step-mother', 'servant' and 'mother' are the principal head nouns, taking the '-s' suffix.",
    explanationBn: "'Maid-servant' এবং 'step-mother'-এ মূল শব্দ হলো 'servant' ও 'mother', তাই 'maid-servants' ও 'step-mothers' হবে।"
  },
  {
    id: 7,
    question: "What is the plural of 'looker-on' (onlooker)?",
    options: [
      "lookers-on",
      "looker-ons",
      "lookers-ons",
      "looker-onnes"
    ],
    correctAnswer: 0,
    explanation: "'Looker' is the noun head word, while 'on' is an adverb/preposition: 'lookers-on'.",
    explanationBn: "'Looker' হলো মূল Noun, তাই 'lookers-on' সঠিক রূপ।"
  },
  {
    id: 8,
    question: "Choose the correct plural form of 'governor-general' and 'knight-errant':",
    options: [
      "governors-general / knights-errant",
      "governor-generals / knight-errants",
      "governors-generals / knights-errants",
      "governor-generalies / knight-erranties"
    ],
    correctAnswer: 0,
    explanation: "In French-derived legal and chivalric compounds (Noun + Adjective), the noun takes '-s': 'governors-general', 'knights-errant'.",
    explanationBn: "Noun + Adjective সংবলিত ফরাসি ধারায় Noun অংশের সাথে '-s' বসে: governors-general, knights-errant।"
  },
  {
    id: 9,
    question: "What is the plural of 'merry-go-round' and 'forget-me-not'?",
    options: [
      "merry-go-rounds / forget-me-nots",
      "merries-go-round / forgets-me-not",
      "merry-goes-round / forget-me-notes",
      "merries-go-rounds / forgets-me-nots"
    ],
    correctAnswer: 0,
    explanation: "In idiomatic clause-like compounds containing no individual noun head, append '-s' to the final word: 'merry-go-rounds', 'forget-me-nots'.",
    explanationBn: "যে যৌগিক শব্দে কোনো নির্দিষ্ট Noun Head থাকে না, সেগুলোর একদম শেষ শব্দের সাথে '-s' যুক্ত হয়।"
  },
  {
    id: 10,
    question: "Select the sentence with 100% grammatical correctness:",
    options: [
      "Two women-doctors and three men-servants assisted the emergency team.",
      "Two woman-doctors and three man-servants assisted the emergency team.",
      "Two women-doctor and three men-servant assisted the emergency team.",
      "Two woman-doctors and three men-servants assisted the emergency team."
    ],
    correctAnswer: 0,
    explanation: "Both 'woman-doctor' and 'man-servant' require dual-element plural mutation: 'women-doctors' and 'men-servants'.",
    explanationBn: "'Women-doctors' এবং 'men-servants' উভয় অংশেই Plural রূপান্তর শতভাগ শুদ্ধ।"
  }
];

export default questions;
