// topic2_questions.js
// Topic 2: Form vs Function

const questions = [
  {
    id: 1,
    question: "In the sentence 'Please water the plants daily', what part of speech is 'water'?",
    options: ["Noun", "Verb", "Adjective", "Adverb"],
    correctAnswer: 1,
    explanation: "Here 'water' is an imperative finite verb expressing the action of supplying water to the plants.",
    explanationBn: "এখানে 'water' গাছে জল দেওয়ার কাজটি বুঝিয়ে Action Verb (ক্রিয়া) হিসেবে কাজ করছে।"
  },
  {
    id: 2,
    question: "In the sentence 'Swadeep purchased a new water filter', what is the syntactic role of 'water'?",
    options: ["Verb", "Adverb", "Attributive Noun-Adjunct (Adjective function)", "Pronoun"],
    correctAnswer: 2,
    explanation: "'Water' is a noun functioning attributively as an adjective modifier describing the type of filter.",
    explanationBn: "এখানে 'water' শব্দটি 'filter' Noun-কে বর্ণনা করার কারণে Adjective-এর মতো কাজ করছে।"
  },
  {
    id: 3,
    question: "In 'He ran fast to catch the train', what part of speech is 'fast'?",
    options: ["Adjective", "Adverb", "Noun", "Verb"],
    correctAnswer: 1,
    explanation: "'Fast' modifies the finite action verb 'ran' (answering 'How did he run?'). In English, 'fastly' does not exist.",
    explanationBn: "'Fast' শব্দটি 'ran' Verb-এর ধরন (manner) প্রকাশ করায় এটি Adverb।"
  },
  {
    id: 4,
    question: "In 'The devotee broke his day-long fast at sunset', what is 'fast'?",
    options: ["Adverb", "Noun", "Verb", "Adjective"],
    correctAnswer: 1,
    explanation: "'Fast' is preceded by a possessive determiner 'his' and adjective 'day-long', functioning as the direct object noun meaning period of abstinence.",
    explanationBn: "উপবাস বা অনশন অর্থে 'fast' এখানে Direct Object Noun হিসেবে বসেছে।"
  },
  {
    id: 5,
    question: "In 'All the students but Debangshu attended the seminar', what part of speech is 'but'?",
    options: ["Coordinating Conjunction", "Preposition", "Adverb", "Interjection"],
    correctAnswer: 1,
    explanation: "Here 'but' means 'except' and is followed by the nominal object 'Debangshu', functioning as a preposition.",
    explanationBn: "'Except' (ব্যতীত) অর্থে ব্যবহৃত হয়ে 'Debangshu' Noun-এর পূর্বে বসায় এটি Preposition।"
  },
  {
    id: 6,
    question: "In 'It is but a minor error', what is the function of 'but'?",
    options: ["Conjunction", "Adverb (meaning 'only' or 'merely')", "Preposition", "Noun"],
    correctAnswer: 1,
    explanation: "'But' is an adverb meaning 'only' or 'merely', modifying the predicate noun phrase.",
    explanationBn: "'Only' বা 'Merely' (কেবলমাত্র) অর্থে ব্যবহৃত হয়ে 'but' এখানে Adverb হিসেবে কাজ করছে।"
  },
  {
    id: 7,
    question: "What is the core syntactic law regarding word classification in English grammar?",
    options: [
      "A word always has one static dictionary definition",
      "Syntactic function in the sentence determines part of speech, not static spelling or morphology",
      "Words ending in '-ing' are always verbs",
      "Words ending in '-ly' are always adverbs"
    ],
    correctAnswer: 1,
    explanation: "In English syntax, function dictates form: a word is categorized purely based on what work it executes in the clause.",
    explanationBn: "বাক্যে কোনো শব্দের কাজ (Function)-ই নির্ধারণ করে সে কোন Part of Speech, তার বানান বা সাধারণ অভিধানের সংজ্ঞা নয়।"
  },
  {
    id: 8,
    question: "In 'The moon revolves round the earth', what is 'round'?",
    options: ["Adjective", "Preposition", "Verb", "Noun"],
    correctAnswer: 1,
    explanation: "'Round' connects the noun phrase 'the earth' to the motion of revolving, functioning as a spatial preposition.",
    explanationBn: "'the earth'-এর সাথে স্থানিক সম্পর্ক বুঝিয়ে 'round' এখানে Preposition হিসেবে কাজ করছে।"
  },
  {
    id: 9,
    question: "In 'The sports car rounded the dangerous corner', what is 'rounded'?",
    options: ["Past Participle Adjective", "Finite Verb in Past Tense", "Preposition", "Adverb"],
    correctAnswer: 1,
    explanation: "'Rounded' is the finite transitive action verb taking 'the dangerous corner' as its direct object.",
    explanationBn: "বাঁক ঘোরার কাজটি সম্পাদন করে 'rounded' বাক্যের প্রধান Finite Verb হিসেবে বসেছে।"
  },
  {
    id: 10,
    question: "Why do Bengali-medium students frequently struggle with Form vs Function in English?",
    options: [
      "Because Bengali words never change meaning",
      "Because translating words in isolation without analyzing clause context leads to false grammatical labeling",
      "Because English has no prepositions",
      "Because Bengali has no nouns"
    ],
    correctAnswer: 1,
    explanation: "Translating words in isolation misses the relational English syntax where position and context define word class.",
    explanationBn: "বাক্য বিবেচনা না করে এককভাবে শব্দ অনুবাদ করতে গেলে ইংরেজির গঠনগত পরিচয় ভুল হওয়ার সম্ভাবনা থাকে।"
  }
];

export default questions;
