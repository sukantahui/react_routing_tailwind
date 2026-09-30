// topic7_questions.js
// Module 001_003 | Topic 7: Interactive Sentence Transformation Workbench

const questions = [
  {
    id: 1,
    question: "Which of the following is the correct transformation of 'She is always punctual' into a negative sentence without changing its meaning?",
    options: [
      "She is never late.",
      "She is not punctual.",
      "She is never punctual.",
      "She is not always late."
    ],
    correctAnswer: 0,
    explanation: "Affirmative 'always + positive' transforms into negative 'never + antonym' ('never late') while maintaining semantic equivalence.",
    explanationBn: "'Always punctual'-এর সমার্থক নেগেটিভ রূপ হল 'never late' (বিপরীত শব্দ সহযোগে)।"
  },
  {
    id: 2,
    question: "Transform 'Everyone desires success' into an interrogative sentence.",
    options: [
      "Who does not desire success?",
      "Does everyone desire success?",
      "Who desires success?",
      "Is everyone desiring success?"
    ],
    correctAnswer: 0,
    explanation: "Universal affirmative assertions ('Everyone...') transform into negative rhetorical questions ('Who does not...?').",
    explanationBn: "'Everyone' যুক্ত বাক্যকে ভাব অক্ষুণ্ণ রেখে প্রশ্নে রূপান্তরের নিয়ম হল 'Who does not...?'।"
  },
  {
    id: 3,
    question: "Transform 'What a breathtaking sight the Himalayas present!' into an assertive sentence.",
    options: [
      "The Himalayas present a very breathtaking sight.",
      "The sight of Himalayas is breathtaking?",
      "The Himalayas present a sight.",
      "Is the sight of the Himalayas breathtaking!"
    ],
    correctAnswer: 0,
    explanation: "Exclamatory sentences with 'What a + adjective + noun' become assertive by substituting 'a very / an extremely + adjective'.",
    explanationBn: "'What a breathtaking sight'-এর Assertive রূপ হল 'a very breathtaking sight' যোগ করা।"
  },
  {
    id: 4,
    question: "Transform 'Could you please pass the salt?' into an imperative sentence.",
    options: [
      "Please pass the salt.",
      "You should pass the salt.",
      "Will you pass the salt?",
      "You must pass the salt."
    ],
    correctAnswer: 0,
    explanation: "A polite interrogative request converts directly into an imperative polite request starting with 'Please' followed by the base verb.",
    explanationBn: "ভদ্রতামূলক ইন্টারোগেটিভ অনুরোধকে সরাসরি 'Please pass the salt' ইম্পারেটিভে রূপান্তর করা যায়।"
  },
  {
    id: 5,
    question: "Transform 'May God bless your journey!' into an assertive sentence expressing the speaker's wish.",
    options: [
      "I pray that God may bless your journey.",
      "God will bless your journey.",
      "God is blessing your journey.",
      "Will God bless your journey?"
    ],
    correctAnswer: 0,
    explanation: "Optative prayers ('May God...') transform into assertive clauses using matrix verbs like 'I pray / wish that God may...'.",
    explanationBn: "Optative বাক্যকে 'I pray/wish that...' দিয়ে Assertive বাক্যে রূপান্তর করা হয়।"
  },
  {
    id: 6,
    question: "Transform 'No one can deny that honesty is the best policy' into an interrogative sentence.",
    options: [
      "Who can deny that honesty is the best policy?",
      "Can anyone deny that honesty is the best policy?",
      "Both A and B are acceptable standard forms",
      "Is honesty the best policy?"
    ],
    correctAnswer: 2,
    explanation: "Negative assertions with 'No one' convert into affirmative rhetorical questions using 'Who can...?' or 'Can anyone...?'.",
    explanationBn: "'No one can deny'-এর ইন্টারোগেটিভ রূপ 'Who can deny...?' অথবা 'Can anyone deny...?' উভয়ই শুদ্ধ।"
  },
  {
    id: 7,
    question: "What happens to sentence polarity during assertive ↔ interrogative rhetorical transformation?",
    options: [
      "Polarity flips: Affirmative statement becomes negative question; Negative statement becomes positive question",
      "Polarity stays strictly identical",
      "All verbs change to past tense",
      "Punctuation is removed"
    ],
    correctAnswer: 0,
    explanation: "Rhetorical questions invert polarity to maintain identical pragmatic meaning.",
    explanationBn: "অর্থ অপরিবর্তিত রাখতে পজিটিভ বাক্যকে নেগেটিভ প্রশ্ন এবং নেগেটিভ বাক্যকে পজিটিভ প্রশ্নে রূপান্তর করা হয়।"
  },
  {
    id: 8,
    question: "Transform 'He is too proud to admit his fault' into a negative sentence without 'too'.",
    options: [
      "He is so proud that he cannot admit his fault.",
      "He is very proud and admits his fault.",
      "He is not proud to admit his fault.",
      "He admits his fault proudly."
    ],
    correctAnswer: 0,
    explanation: "'Too... to' transforms into the correlative construction 'so... that + cannot'.",
    explanationBn: "'Too... to' পরিবর্তিত হয়ে 'so... that + cannot' গঠন গ্রহণ করে।"
  },
  {
    id: 9,
    question: "Transform 'How sweet the moonlight sleeps upon this bank!' into an assertive sentence.",
    options: [
      "The moonlight sleeps very sweetly upon this bank.",
      "The moonlight is sweet on this bank.",
      "Does the moonlight sleep sweetly upon this bank?",
      "The moonlight may sleep sweetly."
    ],
    correctAnswer: 0,
    explanation: "'How + adjective/adverb' converts into 'Subject + Verb + very + adverb/adjective'.",
    explanationBn: "'How sweet'-এর রূপান্তর হিসেবে 'very sweetly' ব্যবহৃত হয়।"
  },
  {
    id: 10,
    question: "Why must semantic invariants be preserved during sentence transformation drills?",
    options: [
      "Because transformation alters grammatical form and communicative packaging, not truth value or core meaning",
      "Because grammar rules are fixed by law",
      "To make sentences longer",
      "To test memory only"
    ],
    correctAnswer: 0,
    explanation: "Syntactic transformation preserves truth value and propositional content while altering structural mode.",
    explanationBn: "রূপান্তরের মূল নীতি হল কাঠামোর পরিবর্তন হলেও বাক্যের মূল অর্থ ও সত্যমান অপরিবর্তিত থাকবে।"
  }
];

export default questions;
