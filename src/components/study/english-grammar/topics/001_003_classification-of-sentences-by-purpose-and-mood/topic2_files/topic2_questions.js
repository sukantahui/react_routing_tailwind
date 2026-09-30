// topic2_questions.js
// Module 001_003 | Topic 2: Question Tags & Polarity Dynamics

const questions = [
  {
    id: 1,
    question: "What is the core polarity rule of standard English question tags?",
    options: [
      "A Positive statement takes a Negative tag; a Negative statement takes a Positive tag",
      "A Positive statement always takes a Positive tag",
      "A Negative statement always takes a Negative tag",
      "Question tags have no polarity"
    ],
    correctAnswer: 0,
    explanation: "Standard English requires opposite polarity between statement and tag ($Positive \\rightarrow Negative$; $Negative \\rightarrow Positive$).",
    explanationBn: "মূল বাক্যটি হ্যাঁ-বোধক হলে Tag না-বোধক হবে; আর বাক্যটি না-বোধক হলে Tag হ্যাঁ-বোধক হবে।"
  },
  {
    id: 2,
    question: "What is the correct question tag for: 'I am right'?",
    options: ["aren't I?", "amn't I?", "am I not?", "isn't it?"],
    correctAnswer: 0,
    explanation: "Standard contracted English rejects *'amn't I'* and uses 'aren't I?' (or formal uncontracted 'am I not?').",
    explanationBn: "'I am'-এর কন্ট্রাক্টেড Negative Tag সর্বদা 'aren't I?' হয়।"
  },
  {
    id: 3,
    question: "What is the question tag for proposals beginning with 'Let's': 'Let's begin the seminar'?",
    options: ["shall we?", "will you?", "can we?", "don't we?"],
    correctAnswer: 0,
    explanation: "Proposals using 'Let's' (Let us) take the invariant question tag 'shall we?'.",
    explanationBn: "'Let's' দিয়ে শুরু হওয়া প্রস্তাবমূলক বাক্যে নির্দিষ্ট Tag 'shall we?' বসে।"
  },
  {
    id: 4,
    question: "In 'She seldom speaks during the conference', what is the correct question tag?",
    options: ["does she?", "doesn't she?", "is she?", "isn't she?"],
    correctAnswer: 0,
    explanation: "'Seldom' is a semi-negative adverb; because the statement is semantically negative, it mandates a POSITIVE tag 'does she?'.",
    explanationBn: "'Seldom' শব্দটি না-বোধক অর্থ প্রকাশ করায় এর Tag হবে হ্যাঁ-বোধক 'does she?'।"
  },
  {
    id: 5,
    question: "In 'Nobody called for him', what is the question tag?",
    options: ["did they?", "didn't they?", "did he?", "didn't he?"],
    correctAnswer: 0,
    explanation: "'Nobody' is negative, and indefinite personal pronouns take the plural tag pronoun 'they' with past auxiliary 'did'.",
    explanationBn: "'Nobody' Negative শব্দ এবং এর জন্য Plural Tag Pronoun 'they' বসে, তাই 'did they?'।"
  },
  {
    id: 6,
    question: "In imperative requests like 'Pass the dictionary', what is the standard tag?",
    options: ["will you?", "shall we?", "won't you?", "do you?"],
    correctAnswer: 0,
    explanation: "Imperatives take 'will you?' (or polite invitation 'won't you?').",
    explanationBn: "Imperative নির্দেশে অনুরোধ বোঝাতে 'will you?' বসে।"
  },
  {
    id: 7,
    question: "In 'There is no water in the flask', what is the question tag?",
    options: ["is there?", "isn't there?", "is it?", "isn't it?"],
    correctAnswer: 0,
    explanation: "'There is no...' is negative; introductory 'there' repeats as the tag subject with positive auxiliary 'is'.",
    explanationBn: "বাক্যটিতে 'no' থাকায় এটি Negative, তাই Tag হবে 'is there?'।"
  },
  {
    id: 8,
    question: "In 'Everyone was present yesterday', what is the question tag?",
    options: ["weren't they?", "wasn't he?", "wasn't they?", "didn't they?"],
    correctAnswer: 0,
    explanation: "'Everyone' takes the plural tag pronoun 'they', forcing the past verb to agree in plural: 'weren't they?'.",
    explanationBn: "'Everyone'-এর জন্য Tag Pronoun 'they' বসে এবং Verb-টি Plural হয়ে 'weren't they?' হয়।"
  },
  {
    id: 9,
    question: "In 'He used to live in Barrackpore', what is the question tag?",
    options: ["didn't he?", "usedn't he?", "both are acceptable", "wasn't he?"],
    correctAnswer: 2,
    explanation: "Both 'didn't he?' (common modern English) and 'usedn't he?' (traditional British) are acceptable.",
    explanationBn: "'didn't he?' এবং 'usedn't he?' উভয়ই সঠিক।"
  },
  {
    id: 10,
    question: "What intonation pattern applies to a question tag when the speaker is genuinely seeking confirmation vs merely expecting agreement?",
    options: [
      "Rising intonation seeks genuine verification; Falling intonation assumes agreement",
      "Intonation is always flat",
      "Rising intonation means shouting",
      "Falling intonation expresses anger"
    ],
    correctAnswer: 0,
    explanation: "In spoken phonology, rising pitch ($\nearrow$) indicates a real question; falling pitch ($\searrow$) invites agreement.",
    explanationBn: "কথ্য ইংরেজিতে স্বরভঙ্গি উপরে উঠলে (Rising) আসল প্রশ্ন বোঝায়, আর নিচে নামলে (Falling) সহমত পোষণ বোঝায়।"
  }
];

export default questions;
