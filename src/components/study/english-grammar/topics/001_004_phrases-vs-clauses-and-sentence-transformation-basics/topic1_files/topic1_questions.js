// topic1_questions.js
// Module 001_004 | Topic 1: The 5 Major Phrase Types

const questions = [
  {
    id: 1,
    question: "In the sentence 'The brilliant young scientist from Barrackpore presented her research', what type of phrase is 'The brilliant young scientist from Barrackpore'?",
    options: ["Noun Phrase", "Verb Phrase", "Adverb Phrase", "Prepositional Phrase"],
    correctAnswer: 0,
    explanation: "The entire cluster acts as a noun phrase functioning as the complete subject, centered around the head noun 'scientist'.",
    explanationBn: "'Scientist' হল Head Noun এবং সম্পূর্ণ অংশটি একটি Noun Phrase হিসেবে Subject-এর কাজ করছে।"
  },
  {
    id: 2,
    question: "Identify the phrase type of the bracketed words: 'He completed the assignment [with remarkable speed].'",
    options: ["Prepositional Phrase acting as an Adverbial modifier", "Noun Phrase acting as direct object", "Verb Phrase", "Adjective Phrase"],
    correctAnswer: 0,
    explanation: "'With remarkable speed' begins with the preposition 'with' and modifies the verb 'completed' by answering 'how' (manner), functioning adverbially.",
    explanationBn: "'With remarkable speed' একটি Prepositional Phrase যা ক্রিয়া কীভাবে সম্পন্ন হয়েছে (Adverb of Manner) তা নির্দেশ করে।"
  },
  {
    id: 3,
    question: "In the sentence 'The girl [in the blue saree] is an accomplished classical vocalist', the prepositional phrase acts as:",
    options: ["An Adjective Phrase modifying 'The girl'", "An Adverb Phrase modifying 'is'", "A Noun Phrase subject", "A Verb Phrase"],
    correctAnswer: 0,
    explanation: "'In the blue saree' post-modifies the noun 'girl', answering 'which girl?', so it functions as an Adjective Phrase.",
    explanationBn: "'In the blue saree' অংশটি 'girl' Noun-টিকে বিশেষিত করায় এটি Adjective Phrase হিসেবে কাজ করছে।"
  },
  {
    id: 4,
    question: "What constitutes the core Verb Phrase in 'The students have been preparing diligently for the competitive exam'?",
    options: ["have been preparing", "preparing diligently", "for the competitive exam", "have been"],
    correctAnswer: 0,
    explanation: "The auxiliary verbs 'have been' together with the main lexical participle 'preparing' constitute the complete Verb Phrase.",
    explanationBn: "'have been preparing' অংশটি অক্সিলিয়ারি ও মূল ভার্ব নিয়ে গঠিত পূর্ণাঙ্গ Verb Phrase।"
  },
  {
    id: 5,
    question: "Which of the following contains an Adjective Phrase modifying a noun?",
    options: [
      "A leader [of great courage and vision] inspired the nation.",
      "She spoke [with immense courage].",
      "They arrived [after midnight].",
      "He was sleeping [in the room]."
    ],
    correctAnswer: 0,
    explanation: "'Of great courage and vision' modifies the noun 'leader', functioning adjectivally.",
    explanationBn: "'Of great courage and vision' অংশটি 'leader' Noun-টিকে qualify করছে, তাই এটি Adjective Phrase।"
  },
  {
    id: 6,
    question: "Identify the Adverb Phrase in: 'The express train arrived [much too early].'",
    options: ["much too early", "The express train", "arrived much", "train arrived"],
    correctAnswer: 0,
    explanation: "'Much too early' is an adverb phrase modifying the finite verb 'arrived' (answering 'when/how early').",
    explanationBn: "'Much too early' ক্রিয়া 'arrived'-কে বিশেষিত করায় এটি Adverb Phrase।"
  },
  {
    id: 7,
    question: "Why can a prepositional phrase function as either an Adjective Phrase or an Adverb Phrase?",
    options: [
      "Because syntactic function is determined by what the phrase modifies (Noun -> Adjectival; Verb/Adj/Adv -> Adverbial)",
      "Because prepositions change their spelling",
      "Because all English phrases are interchangeable",
      "Only in colloquial spoken dialects"
    ],
    correctAnswer: 0,
    explanation: "Syntactic role dictates category: modifying a noun makes it adjectival, whereas modifying a verb, adjective, or clause makes it adverbial.",
    explanationBn: "Prepositional Phrase যদি Noun-কে বিশেষিত করে তবে তা Adjectival, আর Verb/Adjective-কে বিশেষিত করলে তা Adverbial হয়।"
  },
  {
    id: 8,
    question: "In 'To win first prize in the competition requires consistent practice', 'To win first prize in the competition' is:",
    options: ["An Infinitive Noun Phrase acting as Subject", "An Adverbial clause", "A Finite predicate", "A Prepositional modifier"],
    correctAnswer: 0,
    explanation: "The infinitive phrase acts as a nominal unit functioning as the subject of the finite verb 'requires'.",
    explanationBn: "Infinitive Phrase-টি এখানে বাক্যের Subject হিসেবে Noun-এর ভূমিকা পালন করছে।"
  },
  {
    id: 9,
    question: "Which phrase in 'The old wooden bridge over the river collapsed yesterday' is the Head Noun of the subject noun phrase?",
    options: ["bridge", "wooden", "old", "river"],
    correctAnswer: 0,
    explanation: "'Bridge' is the central head noun, pre-modified by determiners/adjectives and post-modified by the prepositional phrase.",
    explanationBn: "'Bridge' হল প্রধান Noun (Head Noun), যা বাক্যের কেন্দ্রীয় বিষয়।"
  },
  {
    id: 10,
    question: "What distinguishes a phrase from a single standalone word?",
    options: [
      "A phrase is a syntactically unified cluster of two or more words functioning as a single grammatical part of speech",
      "A phrase must always contain a conjugated finite verb",
      "A phrase can only appear at the beginning of a sentence",
      "A phrase must end with a comma"
    ],
    correctAnswer: 0,
    explanation: "A phrase is a multi-word constituent lacking a finite subject-verb nexus that behaves as a single part of speech.",
    explanationBn: "Phrase হল দুই বা ততোধিক শব্দের সমষ্টি যা একসাথে কোনো একটি নির্দিষ্ট Part of Speech-এর কাজ করে।"
  }
];

export default questions;
