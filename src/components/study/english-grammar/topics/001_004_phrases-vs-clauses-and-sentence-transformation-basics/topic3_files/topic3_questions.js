// topic3_questions.js
// Module 001_004 | Topic 3: Independent vs Subordinate Clauses

const questions = [
  {
    id: 1,
    question: "What defines an Independent (Main / Principal) Clause in English grammar?",
    options: [
      "It contains a subject and finite verb and can stand alone as a complete, grammatically self-sufficient sentence",
      "It always starts with 'because' or 'although'",
      "It requires another clause to make complete sense",
      "It cannot contain an object"
    ],
    correctAnswer: 0,
    explanation: "An independent clause expresses a complete proposition and can stand alone as an orthographic sentence.",
    explanationBn: "Independent বা Principal Clause সম্পূর্ণ অর্থ প্রকাশ করতে পারে এবং স্বাধীন বাক্য হিসেবে বসতে পারে।"
  },
  {
    id: 2,
    question: "In the sentence 'When the library opened, the students rushed inside', which part is the Subordinate (Dependent) Clause?",
    options: [
      "When the library opened",
      "the students rushed inside",
      "rushed inside",
      "the library opened"
    ],
    correctAnswer: 0,
    explanation: "'When the library opened' is introduced by the subordinating conjunction 'when' and depends on the main clause for full meaning.",
    explanationBn: "'When the library opened' অংশটি Subordinating Conjunction 'When' দিয়ে শুরু হওয়ায় এটি Subordinate Clause।"
  },
  {
    id: 3,
    question: "Which of the following conjunctions introduces an Independent Coordinate Clause rather than a Subordinate Clause?",
    options: ["but (FANBOYS coordinator)", "although", "because", "unless"],
    correctAnswer: 0,
    explanation: "'FANBOYS' (For, And, Nor, But, Or, Yet, So) are coordinating conjunctions linking independent clauses of equal grammatical rank.",
    explanationBn: "FANBOYS (যেমন 'but') হল Coordinating Conjunction যা দুটি সমমানের Independent Clause-কে যুক্ত করে।"
  },
  {
    id: 4,
    question: "Identify the Subordinate Clause in: 'The mentor explained that consistent practice guarantees fluency.'",
    options: [
      "that consistent practice guarantees fluency",
      "The mentor explained",
      "consistent practice guarantees",
      "guarantees fluency"
    ],
    correctAnswer: 0,
    explanation: "'That consistent practice guarantees fluency' is a dependent Noun Clause functioning as the direct object of 'explained'.",
    explanationBn: "'that consistent practice guarantees fluency' একটি Subordinate Noun Clause যা 'explained'-এর Object।"
  },
  {
    id: 5,
    question: "Why cannot a Subordinate Clause stand alone as an independent sentence in formal writing?",
    options: [
      "Because subordinating conjunctions create syntactic dependency, making a standalone subordinate clause a Sentence Fragment error",
      "Because subordinate clauses have no verbs",
      "Because they are too short",
      "Only because of historical convention"
    ],
    correctAnswer: 0,
    explanation: "Subordinate conjunctions subordinate the predication, creating an incomplete thought that produces a sentence fragment if punctuated as a full sentence.",
    explanationBn: "Subordinate Clause একা বসলে পূর্ণ অর্থ প্রকাশ করতে পারে না এবং এটি ব্যাকরণগতভাবে 'Sentence Fragment' ভুলের সৃষ্টি করে।"
  },
  {
    id: 6,
    question: "In 'He worked diligently so that he might secure first rank', the clause 'so that he might secure first rank' expresses:",
    options: ["Subordinate Adverbial Clause of Purpose", "Independent Main Clause", "Noun Clause Subject", "Prepositional Phrase"],
    correctAnswer: 0,
    explanation: "'So that...' introduces an adverbial clause of purpose modifying the matrix verb 'worked'.",
    explanationBn: "'So that he might secure first rank' উদ্দেশ্য (Purpose) প্রকাশকারী Subordinate Adverb Clause।"
  },
  {
    id: 7,
    question: "Which sentence contains BOTH an independent clause and a subordinate clause?",
    options: [
      "Unless you revise daily, you will forget the formulas.",
      "She loves reading and he loves painting.",
      "The sun rose over the horizon.",
      "In the morning after the storm."
    ],
    correctAnswer: 0,
    explanation: "'Unless you revise daily' (Subordinate) + 'you will forget the formulas' (Independent) = Complex sentence.",
    explanationBn: "'Unless you revise daily' (Dependent) এবং 'you will forget the formulas' (Independent) মিলে একটি Complex Sentence।"
  },
  {
    id: 8,
    question: "In 'I met a scholar whose research on phonetics is world-renowned', 'whose research on phonetics is world-renowned' is a:",
    options: ["Relative (Adjective) Subordinate Clause", "Adverbial Clause of Condition", "Independent Clause", "Noun Clause Object"],
    correctAnswer: 0,
    explanation: "Introduced by relative possessive 'whose', this dependent clause post-modifies the noun 'scholar'.",
    explanationBn: "'whose research...' অংশটি 'scholar' Noun-টিকে বিশেষিত করায় এটি Subordinate Adjective (Relative) Clause।"
  },
  {
    id: 9,
    question: "What syntactic test immediately reveals whether a clause is dependent or independent?",
    options: [
      "The Standalone Test: Remove surrounding clauses; if it forms a complete standalone statement without dangling conjunctions, it is Independent",
      "The Count Test: Count the letters in the subject",
      "The Accent Test",
      "The Capitalization Test"
    ],
    correctAnswer: 0,
    explanation: "The standalone test verifies if the clause expresses a complete semantic thought without syntactic ellipsis or subordinating dependency.",
    explanationBn: "Standalone Test: অন্য বাক্যটি বাদ দিয়ে যদি একা সম্পূর্ণ অর্থ প্রকাশ করতে পারে তবে তা Independent Clause।"
  },
  {
    id: 10,
    question: "What is a Complex Sentence?",
    options: [
      "A sentence containing at least one Independent Clause and one or more Subordinate Clauses",
      "A sentence with two independent clauses joined by 'and'",
      "A sentence containing only phrases",
      "A sentence with words over ten syllables"
    ],
    correctAnswer: 0,
    explanation: "By definition, a complex sentence contains one matrix independent clause and one or more dependent subordinate clauses.",
    explanationBn: "একটিমাত্র Independent Clause এবং এক বা একাধিক Subordinate Clause নিয়ে গঠিত বাক্যকে Complex Sentence বলে।"
  }
];

export default questions;
