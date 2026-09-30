// topic5_questions.js
// Module 001_002 | Topic 5: Ditransitive Verbs and Positioning of Indirect Objects

const questions = [
  {
    id: 1,
    question: "Which preposition is typically required when transferring direct objects with verbs of giving, sending, or telling (e.g., 'send', 'give', 'show', 'lend')?",
    options: ["To", "For", "With", "At"],
    correctAnswer: 0,
    explanation: "Verbs of transmission and communication take 'to' (e.g., 'give the prize to her', 'send the email to him').",
    explanationBn: "হস্তান্তর বা যোগাযোগের Verb-গুলোতে Direct Object আগে বসলে 'to' Preposition ব্যবহৃত হয়।"
  },
  {
    id: 2,
    question: "Which preposition is typically required with verbs of creation or acquisition (e.g., 'buy', 'cook', 'bake', 'build', 'fetch')?",
    options: ["For", "To", "From", "In"],
    correctAnswer: 0,
    explanation: "Verbs of creation or obtaining for someone's benefit take 'for' (e.g., 'baked a cake for him', 'bought a gift for her').",
    explanationBn: "কারো জন্য কিছু তৈরি বা ক্রয়ের ক্ষেত্রে 'for' Preposition ব্যবহৃত হয়।"
  },
  {
    id: 3,
    question: "Identify the INCORRECT sentence:",
    options: [
      "I lent to Swadeep my laptop.",
      "I lent Swadeep my laptop.",
      "I lent my laptop to Swadeep.",
      "Swadeep was lent my laptop."
    ],
    correctAnswer: 0,
    explanation: "'I lent to Swadeep my laptop' is ungrammatical. In SVOO, never place 'to' before the person when the person precedes the direct object.",
    explanationBn: "ব্যক্তি (IO) আগে বসলে তার পূর্বে 'to' বসানো মারাত্মক ভুল।"
  },
  {
    id: 4,
    question: "In 'The teacher explained the difficult calculus concept to the students', why CANNOT we say 'The teacher explained the students the concept'?",
    options: [
      "Because 'explain' is a Latinate verb that does NOT allow the pure SVOO dative shift; it strictly mandates 'explain [something] to [someone]'",
      "Because calculus is hard",
      "Because students are plural",
      "Because 'explain' is intransitive"
    ],
    correctAnswer: 0,
    explanation: "Verbs like 'explain', 'describe', 'suggest', 'announce' do not permit the SVOO pattern; they require prepositional 'to + person'.",
    explanationBn: "'Explain', 'suggest', 'describe' প্রভৃতি Verb-এর ক্ষেত্রে ব্যক্তি আগে বসিয়ে SVOO গঠন করা যায় না; সর্বদা 'explain something to someone' লিখতে হয়।"
  },
  {
    id: 5,
    question: "Which of the following verbs CANNOT be used in the pure SVOO pattern (*'Verb + Person + Thing')?",
    options: ["Suggest", "Give", "Lend", "Teach"],
    correctAnswer: 0,
    explanation: "We say 'He suggested a plan to me', never *'He suggested me a plan'.",
    explanationBn: "'Suggest'-এর পর কখনো সরাসরি Person বসে না (যেমন: 'suggested a plan to me')।"
  },
  {
    id: 6,
    question: "In 'Could you fetch me a glass of water?', what is the prepositional equivalent?",
    options: [
      "Could you fetch a glass of water for me?",
      "Could you fetch a glass of water to me?",
      "Could you fetch to me a glass of water?",
      "Could you fetch with me a glass of water?"
    ],
    correctAnswer: 0,
    explanation: "'Fetch' is a verb of acquisition/service and takes the beneficiary preposition 'for'.",
    explanationBn: "'Fetch' Verb-এর সাথে 'for me' বসে।"
  },
  {
    id: 7,
    question: "When both the Direct Object and Indirect Object are PRONOUNS (e.g., 'it' and 'him'), which pattern is strongly preferred in standard modern English?",
    options: [
      "'Give it to him' (DO pronoun + to + IO pronoun)",
      "'Give him it'",
      "'Give to him it'",
      "'Give it him'"
    ],
    correctAnswer: 0,
    explanation: "When both objects are pronouns, standard English strongly prefers 'Give it to him' for acoustic clarity.",
    explanationBn: "উভয় Object-ই Pronoun হলে 'Give it to him' (DO + to + IO) রূপটি সর্বাধিক গ্রহণযোগ্য।"
  },
  {
    id: 8,
    question: "In 'She narrated a fascinating story to her children', what is 'a fascinating story'?",
    options: ["Direct Object", "Indirect Object", "Subject Complement", "Adverb"],
    correctAnswer: 0,
    explanation: "'A fascinating story' is the direct content narrated (Direct Object).",
    explanationBn: "'A fascinating story' হলো Direct Object।"
  },
  {
    id: 9,
    question: "Why do Latin-origin communication verbs like 'announce', 'confess', 'reveal' require 'to' rather than SVOO?",
    options: [
      "Historical English syntactic rules preserved the prepositional frame for Romance loanwords while reserving pure dative shifts for native Germanic verbs",
      "Because they only have three syllables",
      "Because they are nouns",
      "Because they cannot be written in past tense"
    ],
    correctAnswer: 0,
    explanation: "Germanic verbs (give, tell, lend, send) take SVOO; Romance/Latin loanwords (explain, describe, announce, confess) require 'to'.",
    explanationBn: "ল্যাটিন মূলের Verb (announce, confess, explain)-এ Preposition 'to' বাধ্যতামূলক।"
  },
  {
    id: 10,
    question: "In 'He made his daughter a wooden doll', what is 'a wooden doll'?",
    options: ["Direct Object (What was made)", "Indirect Object", "Object Complement", "Subject Complement"],
    correctAnswer: 0,
    explanation: "'A wooden doll' is the physical entity created (Direct Object); 'his daughter' is the beneficiary (Indirect Object).",
    explanationBn: "'a wooden doll' হলো Direct Object (কী তৈরি করা হয়েছিল)।"
  }
];

export default questions;
