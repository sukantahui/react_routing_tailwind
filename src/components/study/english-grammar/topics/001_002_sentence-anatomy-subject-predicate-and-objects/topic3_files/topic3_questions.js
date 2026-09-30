// topic3_questions.js
// Module 001_002 | Topic 3: The Simple Predicate (Verb) vs Complete Predicate

const questions = [
  {
    id: 1,
    question: "What is the SIMPLE PREDICATE in: 'The laboratory technician has been calibrating the optical sensors all afternoon'?",
    options: [
      "has been calibrating",
      "calibrating",
      "calibrating the optical sensors",
      "has been calibrating the optical sensors all afternoon"
    ],
    correctAnswer: 0,
    explanation: "The Simple Predicate is strictly the complete verb group (auxiliaries 'has been' + main verb 'calibrating').",
    explanationBn: "Simple Predicate হলো মূল Verb Group (Auxiliary + Main Verb): 'has been calibrating'।"
  },
  {
    id: 2,
    question: "What does the COMPLETE PREDICATE contain?",
    options: [
      "The finite verb group plus all objects, complements, and adverbial modifiers",
      "Only the main lexical verb",
      "The subject and the verb",
      "Only the prepositional phrases"
    ],
    correctAnswer: 0,
    explanation: "The complete predicate encompasses everything asserted about the subject from the verb to the terminal punctuation.",
    explanationBn: "Complete Predicate-এর মধ্যে Verb Group ছাড়াও সমস্ত Objects, Complements এবং Adverbial Modifiers অন্তর্ভুক্ত থাকে।"
  },
  {
    id: 3,
    question: "In 'The express train arrived', what is unique about the simple predicate and complete predicate?",
    options: [
      "They are identical ('arrived') because there are no objects or modifiers following the intransitive verb",
      "There is no predicate",
      "The subject is missing",
      "It is an incomplete sentence"
    ],
    correctAnswer: 0,
    explanation: "When an intransitive verb stands alone without adverbials or objects, the simple predicate and complete predicate are the exact same word.",
    explanationBn: "Intransitive Verb-এর পর কোনো Object বা Adverbial না থাকলে Simple Predicate এবং Complete Predicate একই হয় ('arrived')।"
  },
  {
    id: 4,
    question: "In 'She could have been studying for the examination', how many auxiliary verbs are part of the simple predicate?",
    options: ["3 ('could', 'have', 'been')", "1 ('could')", "2 ('could', 'have')", "0"],
    correctAnswer: 0,
    explanation: "The simple predicate verb group consists of three auxiliary verbs ('could', 'have', 'been') and one lexical participle ('studying').",
    explanationBn: "এখানে 'could', 'have', 'been' — এই ৩টি Auxiliary Verb এবং 'studying' Main Verb মিলে Simple Predicate তৈরি হয়েছে।"
  },
  {
    id: 5,
    question: "What is a COMPOUND PREDICATE?",
    options: [
      "Two or more finite verbs joined by a conjunction sharing the exact same subject",
      "A predicate with two subjects",
      "A predicate with no verb",
      "A predicate written in two lines"
    ],
    correctAnswer: 0,
    explanation: "A compound predicate contains multiple verbs connected by conjunctions governed by a single subject (e.g., 'Swadeep [researched and programmed] the model').",
    explanationBn: "Compound Predicate হলো একই Subject-এর অধীনে Conjunction দিয়ে যুক্ত একাধিক Finite Verb।"
  },
  {
    id: 6,
    question: "In 'Debangshu entered the laboratory, turned on the power, and calibrated the instruments', what is present?",
    options: [
      "A Compound Predicate with three finite verbs ('entered', 'turned on', 'calibrated')",
      "Three separate independent sentences",
      "A compound subject",
      "A sentence fragment"
    ],
    correctAnswer: 0,
    explanation: "A single subject ('Debangshu') executes three actions forming a compound predicate.",
    explanationBn: "একক Subject 'Debangshu' ৩টি কাজ সম্পাদন করায় এটি একটি Compound Predicate।"
  },
  {
    id: 7,
    question: "In 'He did not attend the masterclass', what constitutes the Simple Predicate?",
    options: ["did not attend", "did attend (with negative adverb 'not' intervening)", "attend", "not attend"],
    correctAnswer: 1,
    explanation: "The verb group is 'did attend'; 'not' is an adverb of negation embedded inside the verb group.",
    explanationBn: "মূল Verb Group হলো 'did attend', যার মাঝে 'not' Adverb হিসেবে বসেছে।"
  },
  {
    id: 8,
    question: "Why can a gerund or infinitive phrase NEVER serve as a simple predicate on its own?",
    options: [
      "Because they are Non-Finite verb forms and lack tense/person markers required for a matrix predicate",
      "Because they are too long",
      "Because they are nouns",
      "Because they are adjectives"
    ],
    correctAnswer: 0,
    explanation: "Non-finite verbs (infinitives/gerunds/participles) cannot function as predicates without an auxiliary carrying finite tense.",
    explanationBn: "Non-Finite Verb (যেমন: to go, going) নিজে একা কোনো Predicate গঠন করতে পারে না, কারণ এতে Tense থাকে না।"
  },
  {
    id: 9,
    question: "In 'The scientist carefully examined the microscopic slides under the lens', what is the Complete Predicate?",
    options: [
      "carefully examined the microscopic slides under the lens",
      "examined",
      "the microscopic slides",
      "under the lens"
    ],
    correctAnswer: 0,
    explanation: "Everything from 'carefully' to 'lens' forms the complete predicate modifying and complementing 'examined'.",
    explanationBn: "'The scientist' Subject বাদে বাকি সম্পূর্ণ অংশটিই হলো Complete Predicate।"
  },
  {
    id: 10,
    question: "What is the diagnostic significance of identifying the Simple Predicate first when parsing a sentence?",
    options: [
      "The finite verb dictates the entire clause architecture, transitivity requirements, and concord rules",
      "It determines the font style",
      "It tells you the word count",
      "It makes the sentence longer"
    ],
    correctAnswer: 0,
    explanation: "The finite verb is the syntactical engine that mandates what arguments (objects/complements) must follow.",
    explanationBn: "Finite Verb হলো বাক্যের চালিকাশক্তি; Verb শনাক্ত করলেই বোঝা যায় বাক্যের বাকি অংশে Object নাকি Complement বসবে।"
  }
];

export default questions;
