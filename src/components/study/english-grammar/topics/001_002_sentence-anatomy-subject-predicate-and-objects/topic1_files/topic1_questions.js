// topic1_questions.js
// Module 001_002 | Topic 1: The Two Structural Halves: Complete Subject vs Complete Predicate

const questions = [
  {
    id: 1,
    question: "In 'The brilliant young researcher from Barrackpore presented her findings', what is the COMPLETE SUBJECT?",
    options: [
      "The brilliant young researcher",
      "The brilliant young researcher from Barrackpore",
      "researcher",
      "her findings"
    ],
    correctAnswer: 1,
    explanation: "The complete subject includes the head noun ('researcher') and all its determiners ('The'), adjectives ('brilliant', 'young'), and prepositional phrase modifiers ('from Barrackpore').",
    explanationBn: "Complete Subject হলো মূল Noun ('researcher') এবং তার সাথে যুক্ত সমস্ত বিশেষণ ও Prepositional Phrase ('from Barrackpore')।"
  },
  {
    id: 2,
    question: "In the same sentence, what is the COMPLETE PREDICATE?",
    options: [
      "presented",
      "presented her findings",
      "her findings",
      "from Barrackpore"
    ],
    correctAnswer: 1,
    explanation: "The complete predicate includes the finite verb ('presented') and its direct object noun phrase ('her findings').",
    explanationBn: "Complete Predicate হলো Finite Verb ('presented') এবং তার সাথে যুক্ত Direct Object ('her findings') সহ বাকি সম্পূর্ণ অংশ।"
  },
  {
    id: 3,
    question: "What is the single mandatory element that EVERY complete predicate must contain?",
    options: ["An Adverb", "At least one Finite Verb", "A Direct Object", "A Prepositional Phrase"],
    correctAnswer: 1,
    explanation: "A predicate cannot exist without at least one finite verb group carrying tense and grammatical concord.",
    explanationBn: "একটি Predicate গঠনের জন্য অন্তত একটি Finite Verb (সমাপিকা ক্রিয়া) থাকা বাধ্যতামূলক।"
  },
  {
    id: 4,
    question: "In 'Down the winding mountain path galloped the wild horse', what is the Complete Subject?",
    options: [
      "Down the winding mountain path",
      "galloped",
      "the wild horse",
      "mountain path"
    ],
    correctAnswer: 2,
    explanation: "Despite inverted syntactic order, 'the wild horse' is the entity performing the action of galloping (Subject).",
    explanationBn: "বাক্যটিতে Inversion ঘটলেও কাজের মূল কর্তা হলো 'the wild horse', তাই এটিই Complete Subject।"
  },
  {
    id: 5,
    question: "In imperative sentences like 'Please submit the assignment immediately', what is the complete subject?",
    options: [
      "assignment",
      "immediately",
      "The implied / understood second-person pronoun 'You'",
      "Please"
    ],
    correctAnswer: 2,
    explanation: "In standard imperative clauses, the subject 'You' is elliptical (implied/understood) and omitted from surface structure.",
    explanationBn: "Imperative বাক্যে কর্তা 'You' উহ্য (Implied) থাকে।"
  },
  {
    id: 6,
    question: "What is the Simple Subject in 'Several senior professors of computational mathematics have published their research'?",
    options: ["professors", "mathematics", "Several senior professors", "research"],
    correctAnswer: 0,
    explanation: "The simple subject is strictly the core head noun alone: 'professors'.",
    explanationBn: "Simple Subject হলো অতিরিক্ত শব্দ ছাড়া শুধুমাত্র মূল Head Noun, অর্থাৎ 'professors'।"
  },
  {
    id: 7,
    question: "What is the Simple Predicate in 'The laboratory assistants have been testing the new samples all morning'?",
    options: ["have been testing", "testing", "have been testing the new samples", "testing the new samples"],
    correctAnswer: 0,
    explanation: "The simple predicate consists strictly of the complete auxiliary + lexical verb group: 'have been testing'.",
    explanationBn: "Simple Predicate হলো সম্পূর্ণ Verb Group (Auxiliary + Main Verb): 'have been testing'।"
  },
  {
    id: 8,
    question: "How can a learner reliably extract the Subject from any complex English sentence?",
    options: [
      "Find the finite verb group, then ask 'Who or What + Verb?'",
      "Pick the very first word in the line",
      "Look for the longest word",
      "Pick the word before the period"
    ],
    correctAnswer: 0,
    explanation: "Finding the finite verb and asking 'Who/What + Verb?' unfailingly yields the logical grammatical subject.",
    explanationBn: "Finite Verb খুঁজে বের করে 'কে' বা 'কী' দিয়ে প্রশ্ন করলে বাক্যের আসল Subject নিশ্চিতভাবে পাওয়া যায়।"
  },
  {
    id: 9,
    question: "In 'There are three high-performance servers in the computing room', what is the grammatical subject?",
    options: ["There", "three high-performance servers", "the computing room", "are"],
    correctAnswer: 1,
    explanation: "'There' is an expletive (dummy introductory pronoun). The true grammatical subject governing plural verb 'are' is 'three high-performance servers'.",
    explanationBn: "'There' হলো Dummy Subject; বাক্যের আসল Subject হলো 'three high-performance servers', যার কারণে Plural Verb 'are' বসেছে।"
  },
  {
    id: 10,
    question: "Why is partitioning a sentence into Complete Subject and Complete Predicate essential before learning Voice Change?",
    options: [
      "Because the direct object inside the predicate must become the new subject of the passive clause, while the active subject moves into the agent prepositional phrase",
      "Because voice change deletes all verbs",
      "Because predicates cannot be changed into Bengali",
      "Because subjects are banned in passive voice"
    ],
    correctAnswer: 0,
    explanation: "Accurate partition ensures the object is cleanly identified and promoted to subject position during passive transformation.",
    explanationBn: "Active থেকে Passive করার সময় Predicate-এর ভেতরের Object-কে Subject বানাতে হয় এবং Subject-টি Agent-এ পরিণত হয়।"
  }
];

export default questions;
