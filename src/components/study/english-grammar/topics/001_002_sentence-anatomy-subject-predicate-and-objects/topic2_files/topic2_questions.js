// topic2_questions.js
// Module 001_002 | Topic 2: Simple Subjects vs Compound Subjects

const questions = [
  {
    id: 1,
    question: "What constitutes a COMPOUND SUBJECT in English syntax?",
    options: [
      "Two or more subjects joined by a coordinating conjunction (like 'and', 'or', 'nor') sharing the same predicate",
      "A subject that has more than 10 letters",
      "A subject that is always plural",
      "A subject followed by two verbs"
    ],
    correctAnswer: 0,
    explanation: "A compound subject consists of multiple nominal heads joined by conjunctions sharing a single finite verb group.",
    explanationBn: "Compound Subject হলো 'and', 'or', বা 'nor' দিয়ে যুক্ত একাধিক Subject যারা একই Predicate শেয়ার করে।"
  },
  {
    id: 2,
    question: "In 'Swadeep and Debangshu developed the AI algorithm', what kind of subject is present?",
    options: ["Simple Subject", "Compound Subject with plural concord", "Dummy Subject", "Inverted Subject"],
    correctAnswer: 1,
    explanation: "'Swadeep and Debangshu' form a compound subject joined by 'and', requiring a plural verb.",
    explanationBn: "'Swadeep and Debangshu' হলো 'and' দিয়ে যুক্ত Compound Subject, যার সাথে Plural Verb বসে।"
  },
  {
    id: 3,
    question: "When two singular subjects are joined by 'Either... or' or 'Neither... nor', which subject determines the verb agreement (Proximity Rule)?",
    options: [
      "The subject closest to the verb",
      "Always the first subject",
      "Always the second subject",
      "The longest subject"
    ],
    correctAnswer: 0,
    explanation: "Under the Proximity Rule, verbs agree in number and person with the closest subject nominal.",
    explanationBn: "'Either... or' বা 'Neither... nor'-এর ক্ষেত্রে Verb-এর সবচেয়ে কাছের Subject অনুযায়ী Verb নির্ধারিত হয় (Rule of Proximity)।"
  },
  {
    id: 4,
    question: "In 'Bread and butter is our daily breakfast', why is the singular verb 'is' used with a compound subject joined by 'and'?",
    options: [
      "Because 'Bread and butter' represents a single unitary conceptual idea/dish",
      "Because 'butter' is uncountable",
      "Because 'and' is ignored",
      "Because 'breakfast' is singular"
    ],
    correctAnswer: 0,
    explanation: "When compound nouns joined by 'and' express a single unitary entity or concept, they take a singular verb.",
    explanationBn: "'Bread and butter' যখন একটি অবিভাজ্য একক ধারণা বা খাবার বোঝায়, তখন Singular Verb ('is') বসে।"
  },
  {
    id: 5,
    question: "In 'The teacher, along with her students, has arrived', what is the grammatical subject?",
    options: [
      "'The teacher' (Singular Simple Subject; 'along with her students' is an intervening parenthetical prepositional phrase)",
      "'The teacher, along with her students' (Compound Subject)",
      "'her students'",
      "'The teacher and students'"
    ],
    correctAnswer: 0,
    explanation: "Phrases like 'along with', 'as well as', 'together with' do not create compound subjects; the core subject remains 'The teacher'.",
    explanationBn: "'along with', 'as well as', 'together with'-যুক্ত অংশটি Parenthetical Modifier, তাই মূল Subject হলো 'The teacher' (Singular)।"
  },
  {
    id: 6,
    question: "In 'Neither the mentor nor the students were present in the hall', why is 'were' used?",
    options: [
      "Because the plural noun 'the students' is closest to the verb",
      "Because 'mentor' is singular",
      "Because 'nor' always takes plural",
      "Because the sentence is in past tense"
    ],
    correctAnswer: 0,
    explanation: "By the proximity rule with 'neither... nor', the verb agrees with 'students' (plural).",
    explanationBn: "'Neither... nor'-এ Verb-এর ঠিক আগের Subject হলো Plural 'students', তাই Plural Verb 'were' বসেছে।"
  },
  {
    id: 7,
    question: "In 'Slow and steady wins the race', why is the verb 'wins' in the third-person singular form?",
    options: [
      "Because 'Slow and steady' constitutes a single philosophical principle/quality",
      "Because 'steady' is an adverb",
      "Because 'race' is singular",
      "Because of a typing error"
    ],
    correctAnswer: 0,
    explanation: "Like 'bread and butter', 'slow and steady' expresses a singular unitary compound notion.",
    explanationBn: "'Slow and steady' একটি একক নীতি প্রকাশ করায় Singular Verb ('wins') গ্রহণ করে।"
  },
  {
    id: 8,
    question: "In 'Either you or he is responsible for the error', why is 'is' correct?",
    options: [
      "Because the 3rd person singular pronoun 'he' is closest to the verb",
      "Because 'you' takes 'is'",
      "Because 'or' makes everything singular",
      "Because 'responsible' is an adjective"
    ],
    correctAnswer: 0,
    explanation: "The verb agrees in person and number with 'he' (3rd person singular $\rightarrow$ 'is').",
    explanationBn: "Verb-এর নিকটবর্তী Subject হলো 'he' (৩য় পুরুষ একবচন), তাই 'is' বসেছে।"
  },
  {
    id: 9,
    question: "What is the Simple Subject in 'My older brother's laptop broke yesterday'?",
    options: ["laptop", "brother's", "older brother's", "My older brother's laptop"],
    correctAnswer: 0,
    explanation: "'Laptop' is the core noun head that suffered the action of breaking.",
    explanationBn: "মূল Head Noun হলো 'laptop', বাকি অংশটি হলো তার Possessive Modifier।"
  },
  {
    id: 10,
    question: "Why is mastering Compound Subjects crucial for Subject-Verb Agreement in competitive exams?",
    options: [
      "Because test-makers deliberately insert intervening prepositional phrases to trap students into choosing incorrect verb numbers",
      "Because compound subjects are never used in literature",
      "Because all compound subjects are singular",
      "Because compound subjects delete the predicate"
    ],
    correctAnswer: 0,
    explanation: "Exam questions frequently exploit parenthetical phrases ('as well as', 'in addition to') to test if students can isolate the true subject.",
    explanationBn: "পরীক্ষায় 'as well as' বা 'along with' দিয়ে বিভ্রান্তিকর বাক্য দেওয়া হয় যাতে শিক্ষার্থীরা আসল Subject ও Compound Subject-এর পার্থক্য করতে পারে।"
  }
];

export default questions;
