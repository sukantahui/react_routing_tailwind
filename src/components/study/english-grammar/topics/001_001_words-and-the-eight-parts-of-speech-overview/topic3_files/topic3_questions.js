// topic3_questions.js
// Topic 3: High-Level Overview of Nouns, Pronouns, and Verbs

const questions = [
  {
    id: 1,
    question: "Which of the following functions can a NOUN perform in a standard English sentence?",
    options: [
      "Subject, Direct Object, Indirect Object, Subject Complement, and Prepositional Object",
      "Only as the Subject of a sentence",
      "Only as a modifier for verbs",
      "Only in exclamatory expressions"
    ],
    correctAnswer: 0,
    explanation: "Nouns are universal nominal anchors capable of acting as Subjects, Direct/Indirect Objects, Complements, and Prepositional Complements.",
    explanationBn: "Noun বাক্যে Subject, Direct Object, Indirect Object, Subject Complement, এবং Preposition-এর Object হিসেবে কাজ করতে পারে।"
  },
  {
    id: 2,
    question: "In 'Sukanta Sir taught him grammar', what type of pronoun is 'him'?",
    options: ["Nominative Pronoun", "Objective (Accusative/Dative) Personal Pronoun", "Reflexive Pronoun", "Demonstrative Pronoun"],
    correctAnswer: 1,
    explanation: "'Him' is the objective form of the 3rd person singular masculine pronoun acting as the Indirect Object.",
    explanationBn: "'Him' হলো ৩য় পুরুষের Objective/Accusative Pronoun যা Indirect Object হিসেবে কাজ করছে।"
  },
  {
    id: 3,
    question: "What differentiates a FINITE verb from a NON-FINITE verb?",
    options: [
      "Finite verbs have no tense",
      "Finite verbs show tense, person, and number, and can stand alone as the main predicate engine",
      "Non-finite verbs change according to the subject",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "Finite verbs are bound by tense (past/present), person (1st/2nd/3rd), and number (singular/plural), while non-finites (infinitives, gerunds, participles) are invariant.",
    explanationBn: "Finite Verb কাল (Tense), পুরুষ (Person) ও বচন (Number) অনুযায়ী পরিবর্তিত হয় এবং বাক্যের মূল Predicate গঠন করে।"
  },
  {
    id: 4,
    question: "In the sentence 'The team reached Kolkata yesterday', what kind of verb is 'reached'?",
    options: ["Transitive Verb", "Intransitive Verb", "Linking Verb", "Auxiliary Verb"],
    correctAnswer: 0,
    explanation: "'Reached' is a transitive verb taking 'Kolkata' as its direct object (reached where/what entity without a preposition).",
    explanationBn: "'Reached' একটি Transitive Verb কারণ এটি সরাসরি 'Kolkata' Object গ্রহণ করেছে।"
  },
  {
    id: 5,
    question: "In 'Swadeep became a successful software engineer', what is 'became'?",
    options: ["Transitive Action Verb", "Linking (Copular) Verb", "Auxiliary Verb", "Modal Verb"],
    correctAnswer: 1,
    explanation: "'Became' connects the subject 'Swadeep' to his new identity/state 'a successful software engineer' (Subject Complement).",
    explanationBn: "'Became' একটি Linking / Copular Verb যা Subject-এর সাথে তার নতুন পরিচয়যুক্ত Subject Complement-কে যুক্ত করেছে।"
  },
  {
    id: 6,
    question: "Which of the following is a REFLEXIVE pronoun?",
    options: ["He", "Him", "Himself", "His"],
    correctAnswer: 2,
    explanation: "'Himself' is a reflexive pronoun used when the subject and object of the action are the exact same entity.",
    explanationBn: "'Himself' হলো Reflexive Pronoun, যা বোঝায় কর্তা নিজেই নিজের ওপর কাজটি করেছে।"
  },
  {
    id: 7,
    question: "Which of the following is an UNCOUNTABLE (Mass) noun that never takes a plural '-s' in standard English?",
    options: ["Information", "Computer", "Student", "Desk"],
    correctAnswer: 0,
    explanation: "'Information' is an uncountable abstract noun and must never be written as 'informations'.",
    explanationBn: "'Information' একটি Uncountable Noun, তাই এর সাথে কখনো 's' বা 'es' যুক্ত করে বহুবচন করা যায় না।"
  },
  {
    id: 8,
    question: "What is the primary role of an AUXILIARY verb?",
    options: [
      "To name objects",
      "To assist the main lexical verb in expressing tense, aspect, mood, voice, or emphasis",
      "To replace prepositions",
      "To connect two paragraphs"
    ],
    correctAnswer: 1,
    explanation: "Auxiliary verbs (be, have, do, modals) combine with lexical verbs to construct continuous, perfect, passive, and interrogative forms.",
    explanationBn: "Auxiliary Verbs মূল Verb-এর সাথে যুক্ত হয়ে Tense, Aspect, Voice বা প্রশ্নবোধক রূপ তৈরিতে সাহায্য করে।"
  },
  {
    id: 9,
    question: "In 'Everyone should do their best', what kind of pronoun is 'Everyone'?",
    options: ["Personal Pronoun", "Indefinite Pronoun", "Relative Pronoun", "Interrogative Pronoun"],
    correctAnswer: 1,
    explanation: "'Everyone' is an indefinite pronoun referring to persons generally without specifying particular individuals.",
    explanationBn: "'Everyone' একটি Indefinite Pronoun, যা অনির্দিষ্টভাবে কোনো ব্যক্তি বা সমষ্টিকে বোঝায়।"
  },
  {
    id: 10,
    question: "Why are Nouns, Pronouns, and Verbs considered the 'Triumvirate Core' of English sentences?",
    options: [
      "Because together they establish entity (Noun/Pronoun) and state/action (Verb), fulfilling the minimum structural requirement for a complete clause",
      "Because they are the only three parts of speech in English",
      "Because they always begin with vowels",
      "Because they only occur in affirmative sentences"
    ],
    correctAnswer: 0,
    explanation: "A sentence cannot exist without a subject (Noun/Pronoun) and a predicate finite engine (Verb).",
    explanationBn: "একটি পূর্ণাঙ্গ বাক্যের মূল কাঠামো তৈরির জন্য Subject (Noun/Pronoun) এবং Finite Verb থাকা অপরিহার্য।"
  }
];

export default questions;
