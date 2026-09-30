// topic6_questions.js
// Module 001_004 | Topic 6: Assertive to Interrogative Transformation

const questions = [
  {
    id: 1,
    question: "Transform 'Everyone loves their mother tongue' into an interrogative sentence:",
    options: [
      "Who does not love their mother tongue?",
      "Does everyone love their mother tongue?",
      "Who loves their mother tongue?",
      "Why does everyone love their mother tongue?"
    ],
    correctAnswer: 0,
    explanation: "Universal positive statement ('Everyone...') transforms into negative rhetorical question ('Who does not...?').",
    explanationBn: "'Everyone' যুক্ত বাক্যকে প্রশ্নে রূপান্তর করতে 'Who does not...?' ব্যবহৃত হয়।"
  },
  {
    id: 2,
    question: "Transform 'Nobody can touch the stars' into an interrogative sentence:",
    options: [
      "Who can touch the stars?",
      "Can nobody touch the stars?",
      "Can anyone touch the stars?",
      "Both A and C are grammatically valid rhetorical equivalents"
    ],
    correctAnswer: 3,
    explanation: "'Nobody' converts either to 'Who can...?' or 'Can anyone...?'.",
    explanationBn: "'Nobody'-এর রূপান্তর হিসেবে 'Who can...?' অথবা 'Can anyone...?' উভয়ই শুদ্ধ।"
  },
  {
    id: 3,
    question: "Transform 'Their glory can never fade' into an interrogative sentence:",
    options: [
      "When can their glory fade?",
      "Can their glory ever fade?",
      "Both A and B are acceptable standard forms",
      "Why can their glory fade?"
    ],
    correctAnswer: 2,
    explanation: "'Never' transforms to 'ever' ('Can... ever fade?') or 'When can... fade?'.",
    explanationBn: "'Never' যুক্ত বাক্যকে 'Can... ever?' অথবা 'When can...?' দিয়ে রূপান্তর করা যায়।"
  },
  {
    id: 4,
    question: "What happens to the polarity when transforming an affirmative assertive sentence into an interrogative sentence?",
    options: [
      "It becomes negative: Affirmative statement -> Negative Question",
      "It stays strictly affirmative",
      "The verb changes from present to past",
      "Polarity is deleted"
    ],
    correctAnswer: 0,
    explanation: "To preserve identical pragmatic meaning, an affirmative assertion becomes a negative question, and vice versa.",
    explanationBn: "অর্থ অক্ষুণ্ণ রাখতে হ্যাঁ-বোধক বিবৃতি না-বোধক প্রশ্নে এবং না-বোধক বিবৃতি হ্যাঁ-বোধক প্রশ্নে রূপান্তরিত হয়।"
  },
  {
    id: 5,
    question: "Transform 'It is useless to cry over spilled milk' using 'Why':",
    options: [
      "Why cry over spilled milk?",
      "Is it useless to cry over spilled milk?",
      "Why is it crying over milk?",
      "Why do you cry over milk?"
    ],
    correctAnswer: 0,
    explanation: "'It is useless to + verb' transforms into rhetorical 'Why + base verb...?' ('Why cry over spilled milk?').",
    explanationBn: "'It is useless to...' পরিবর্তিত হয়ে অলংকারিক 'Why + V1...?' হয়।"
  },
  {
    id: 6,
    question: "Transform 'There is no point in arguing with a fanatic':",
    options: [
      "What is the point of arguing with a fanatic?",
      "Is there no point in arguing?",
      "Why do you argue with a fanatic?",
      "Who argues with a fanatic?"
    ],
    correctAnswer: 0,
    explanation: "'There is no point in...' transforms cleanly to 'What is the point of...?'.",
    explanationBn: "'There is no point in...' রূপান্তর হয়ে 'What is the point of...?' হয়।"
  },
  {
    id: 7,
    question: "Transform 'Friendship is greater than wealth':",
    options: [
      "Is friendship not greater than wealth?",
      "Is friendship greater than wealth?",
      "Why is friendship greater than wealth?",
      "Who says friendship is greater than wealth?"
    ],
    correctAnswer: 0,
    explanation: "Affirmative statement 'Friendship is...' becomes negative question 'Is friendship not...?'.",
    explanationBn: "Affirmative বিবৃতিকে প্রশ্নবোধক করতে 'Is friendship not...?' গঠন প্রয়োগ করা হয়।"
  },
  {
    id: 8,
    question: "Why is a rhetorical question classified pragmatically as an assertive statement in disguise?",
    options: [
      "Because the speaker is not genuinely asking for unknown information; they are making a forceful, self-evident claim",
      "Because rhetorical questions have no question marks",
      "Because only teachers ask them",
      "Because they are always in future tense"
    ],
    correctAnswer: 0,
    explanation: "A rhetorical question does not elicit an answer; it forces the listener to acknowledge an obvious truth.",
    explanationBn: "অলংকারিক প্রশ্নে কোনো উত্তর জানতে চাওয়া হয় না, বরং স্বতঃসিদ্ধ সত্যকে জোরালোভাবে প্রকাশ করা হয়।"
  },
  {
    id: 9,
    question: "Transform 'No one worships the setting sun' into an interrogative sentence:",
    options: [
      "Who worships the setting sun?",
      "Does anyone worship the setting sun?",
      "Both A and B are valid rhetorical transformations",
      "Who does not worship the setting sun?"
    ],
    correctAnswer: 2,
    explanation: "'No one' becomes 'Who...?' or 'Does anyone...?'.",
    explanationBn: "'No one worships'-এর ইন্টারোগেটিভ রূপ 'Who worships...?' বা 'Does anyone worship...?'।"
  },
  {
    id: 10,
    question: "Which of the following is the correct terminal punctuation for a transformed rhetorical question?",
    options: [
      "A question mark (?) is mandatory",
      "A period (.)",
      "An exclamation mark (!)",
      "A semicolon (;)"
    ],
    correctAnswer: 0,
    explanation: "Regardless of rhetorical intent, all interrogative structures must end with a question mark.",
    explanationBn: "বাক্যটি অলংকারিক হলেও প্রশ্নবোধক কাঠামোর কারণে শেষে Question Mark (?) বসা বাধ্যতামূলক।"
  }
];

export default questions;
