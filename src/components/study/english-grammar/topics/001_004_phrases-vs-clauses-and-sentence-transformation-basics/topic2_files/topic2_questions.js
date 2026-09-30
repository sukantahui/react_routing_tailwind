// topic2_questions.js
// Module 001_004 | Topic 2: What is a Clause

const questions = [
  {
    id: 1,
    question: "What is the non-negotiable structural requirement of every grammatical clause in English?",
    options: [
      "A Subject and a Finite Verb pair (nexus)",
      "A Preposition and an Object",
      "An Adjective and an Adverb",
      "A minimum length of ten words"
    ],
    correctAnswer: 0,
    explanation: "A clause must contain a subject and a finite verb expressing predication, tense, or mood.",
    explanationBn: "প্রতিটি Clause-এর জন্য একটি নির্দিষ্ট Subject এবং Finite Verb (সমাপিকা ক্রিয়া) থাকা বাধ্যতামূলক।"
  },
  {
    id: 2,
    question: "Why is 'Having finished his homework' a phrase rather than a clause?",
    options: [
      "Because 'Having finished' is a non-finite participle, not a finite verb with a grammatical subject",
      "Because it is too short",
      "Because it begins with a capital letter",
      "Because it lacks a noun"
    ],
    correctAnswer: 0,
    explanation: "Non-finite verb forms (participles, gerunds, infinitives) without finite tense/person agreement do not form clauses.",
    explanationBn: "'Having finished' একটি Non-finite Participle, কোনো Finite Verb নয়, তাই এটি Clause নয়—Phrase।"
  },
  {
    id: 3,
    question: "In the sentence 'Although the rain was heavy, the match continued', how many clauses are present?",
    options: ["2 clauses", "1 clause", "3 clauses", "0 clauses"],
    correctAnswer: 0,
    explanation: "There are two clauses: 1. Dependent clause: 'Although the rain was heavy', 2. Main clause: 'the match continued'.",
    explanationBn: "এখানে দুটি Clause রয়েছে: ১. 'Although the rain was heavy' এবং ২. 'the match continued'।"
  },
  {
    id: 4,
    question: "Which of the following contains a finite verb capable of forming a clause?",
    options: [
      "Swadeep writes research papers.",
      "To write research papers.",
      "Writing research papers.",
      "Having written research papers."
    ],
    correctAnswer: 0,
    explanation: "'Writes' is a finite present tense 3rd-person singular verb, making 'Swadeep writes research papers' a complete clause.",
    explanationBn: "'Writes' হল Finite Verb যা Subject 'Swadeep'-এর সাথে সমন্বিত।"
  },
  {
    id: 5,
    question: "Identify the finite clause in the following options:",
    options: [
      "when the sun rose over the river",
      "rising over the river",
      "to rise over the river",
      "at sunrise over the river"
    ],
    correctAnswer: 0,
    explanation: "'When the sun rose over the river' has the subject 'the sun' and finite past verb 'rose'.",
    explanationBn: "'The sun' (Subject) এবং 'rose' (Finite Past Verb) থাকায় এটি একটি পূর্ণাঙ্গ Clause।"
  },
  {
    id: 6,
    question: "Can a single standalone sentence consist of just one independent clause?",
    options: [
      "Yes, a Simple Sentence is structurally defined as a single independent clause",
      "No, all sentences must have at least two clauses",
      "Only in spoken English",
      "Never in academic writing"
    ],
    correctAnswer: 0,
    explanation: "A simple sentence contains exactly one independent matrix clause (e.g. 'Birds fly').",
    explanationBn: "হ্যাঁ, একটি Simple Sentence আসলে একটি মাত্র Independent Clause দ্বারা গঠিত।"
  },
  {
    id: 7,
    question: "What is the syntactic difference between 'during the storm' and 'while the storm raged'?",
    options: [
      "'during the storm' is a prepositional phrase; 'while the storm raged' is an adverbial clause",
      "Both are identical noun clauses",
      "Both are prepositional phrases",
      "Neither has meaning"
    ],
    correctAnswer: 0,
    explanation: "'During the storm' lacks a verb (phrase); 'while the storm raged' has subject ('the storm') and finite verb ('raged') (clause).",
    explanationBn: "'During the storm'-এ কোনো Verb নেই (Phrase); কিন্তু 'while the storm raged'-এ Subject ও Finite Verb রয়েছে (Clause)।"
  },
  {
    id: 8,
    question: "In imperative sentences like 'Submit the project tomorrow', what is the subject of the clause?",
    options: [
      "The implied 2nd-person pronoun '(You)'",
      "The project",
      "Tomorrow",
      "There is no subject"
    ],
    correctAnswer: 0,
    explanation: "In imperative clauses, the subject '(You)' is syntactically present in deep structure though omitted on the surface.",
    explanationBn: "Imperative Clause-এ Subject হিসেবে 'You' উহ্য (Understood) থাকে।"
  },
  {
    id: 9,
    question: "Which of the following is a non-finite construction often mistaken for a clause?",
    options: [
      "Tired from the long journey",
      "He was tired from the journey",
      "Because he was tired",
      "When he grew tired"
    ],
    correctAnswer: 0,
    explanation: "'Tired from the long journey' is a participial phrase, whereas the others contain finite verbs ('was', 'grew').",
    explanationBn: "'Tired from the long journey' একটি Participle Phrase, এতে Finite Verb নেই।"
  },
  {
    id: 10,
    question: "Why is the distinction between finite and non-finite verbs crucial in clause analysis?",
    options: [
      "Because only finite verbs can license grammatical subjects and establish clauses",
      "Because non-finite verbs are illegal in English",
      "To make sentences shorter",
      "Because finite verbs do not change with tense"
    ],
    correctAnswer: 0,
    explanation: "Finite verbs encode tense, person, and number, creating the predicate core necessary for clause formation.",
    explanationBn: "শুধুমাত্র সমাপিকা ক্রিয়াই (Finite Verb) Subject গ্রহণ করে পূর্ণাঙ্গ Clause গঠন করতে সক্ষম।"
  }
];

export default questions;
