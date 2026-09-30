// topic8_questions.js
// Topic 8: Self-Assessment Quiz & Comprehensive Diagnostics for Module 001_001

const questions = [
  {
    id: 1,
    question: "Which of the following parts of speech is an OPEN CLASS item?",
    options: ["Pronoun", "Preposition", "Lexical Verb", "Conjunction"],
    correctAnswer: 2,
    explanation: "Lexical verbs (e.g., 'to upload', 'to debug') belong to the open class because the language constantly invents and incorporates new action terms.",
    explanationBn: "Lexical Verb হলো Open Class কারণ নতুন নতুন কাজের নাম প্রতিনিয়ত ভাষায় যুক্ত হতে পারে।"
  },
  {
    id: 2,
    question: "In 'He drove fast down the highway', what are the parts of speech of 'fast' and 'down'?",
    options: [
      "'fast' is an Adverb of Manner; 'down' is a Preposition",
      "Both are adjectives",
      "Both are adverbs",
      "'fast' is an adjective; 'down' is a noun"
    ],
    correctAnswer: 0,
    explanation: "'Fast' modifies the action verb 'drove'; 'down' connects the nominal object 'the highway'.",
    explanationBn: "'Fast' হলো 'drove' Verb-এর Adverb; আর 'down' হলো 'the highway' Noun-এর পূর্বে বসা Preposition।"
  },
  {
    id: 3,
    question: "Why is 'The rose smells sweetly' considered grammatically incorrect?",
    options: [
      "Because 'smells' is a Sensory Linking Verb and requires a Subject Complement Adjective ('sweet'), not an adverb",
      "Because 'sweetly' is a noun",
      "Because 'sweet' is an interjection",
      "Because linking verbs cannot be used with flowers"
    ],
    correctAnswer: 0,
    explanation: "Sensory linking verbs (smell, taste, feel, look, sound) must be followed by an adjective describing the subject's state or quality.",
    explanationBn: "Sensory Linking Verb-এর পর Adverb নয়, Subject Complement Adjective ('sweet') বসে।"
  },
  {
    id: 4,
    question: "Which of the following is a SUBORDINATING conjunction?",
    options: ["And", "Although", "But", "Or"],
    correctAnswer: 1,
    explanation: "'Although' introduces a dependent clause expressing concession, making it a subordinating conjunction.",
    explanationBn: "'Although' একটি Subordinating Conjunction যা Subordinate Clause যুক্ত করে।"
  },
  {
    id: 5,
    question: "In 'Between you and me, the decision was fair', what is the grammatical justification for 'me' rather than 'I'?",
    options: [
      "Pronouns serving as objects of prepositions ('between') must strictly be in the Objective (Accusative) Case",
      "Because 'I' cannot follow 'and'",
      "Because 'me' sounds shorter",
      "Because 'you' is plural"
    ],
    correctAnswer: 0,
    explanation: "Objects of prepositions strictly mandate the objective case: 'between you and me'.",
    explanationBn: "Preposition-এর পর Pronoun সর্বদা Objective Case-এ ('me') বসে।"
  },
  {
    id: 6,
    question: "In 'Only Swadeep can solve this puzzle', what part of speech is 'Only'?",
    options: ["Focusing Adverb modifying the noun 'Swadeep'", "Adjective", "Conjunction", "Preposition"],
    correctAnswer: 0,
    explanation: "'Only' functions as a focusing adverb restricting the scope of the sentence specifically to 'Swadeep'.",
    explanationBn: "'Only' এখানে Focusing Adverb হিসেবে 'Swadeep'-কে নির্দিষ্ট করছে।"
  },
  {
    id: 7,
    question: "Which pair consists of words that are BOTH ADJECTIVES, despite ending in '-ly'?",
    options: ["Friendly and Lovely", "Quickly and Slowly", "Boldly and Bravely", "Eagerly and Patiently"],
    correctAnswer: 0,
    explanation: "'Friendly' (Friend + ly) and 'Lovely' (Love + ly) are formed from nouns, making them adjectives.",
    explanationBn: "'Friendly' এবং 'Lovely' উভয়ই Noun-এর সাথে '-ly' যুক্ত হয়ে গঠিত Adjective।"
  },
  {
    id: 8,
    question: "In 'The express train arrived on time', what is 'express'?",
    options: ["Attributive Adjective modifying 'train'", "Verb", "Adverb", "Pronoun"],
    correctAnswer: 0,
    explanation: "'Express' describes the category/speed of the train, functioning attributively as an adjective.",
    explanationBn: "'Express' শব্দটি 'train' Noun-এর পূর্বে বসে Adjective হিসেবে কাজ করছে।"
  },
  {
    id: 9,
    question: "What is the correct sequence of adverbs according to the M-P-T rule in: 'She sang yesterday at the hall beautifully'?",
    options: [
      "She sang beautifully (Manner) at the hall (Place) yesterday (Time).",
      "She sang yesterday beautifully at the hall.",
      "She sang at the hall yesterday beautifully.",
      "She sang at the hall beautifully yesterday."
    ],
    correctAnswer: 0,
    explanation: "The standard M-P-T sequence requires: Manner (beautifully) $\rightarrow$ Place (at the hall) $\rightarrow$ Time (yesterday).",
    explanationBn: "MPT নিয়ম অনুযায়ী সঠিক ক্রম হলো: Manner (beautifully) -> Place (at the hall) -> Time (yesterday)।"
  },
  {
    id: 10,
    question: "What is the overall goal of mastering Module 001_001 for a competitive exam aspirant?",
    options: [
      "To effortlessly classify any word in a complex sentence based on its contextual syntactic function rather than mechanical dictionary definitions",
      "To translate everything word-by-word into Bengali",
      "To eliminate verbs from sentences",
      "To write without punctuation"
    ],
    correctAnswer: 0,
    explanation: "Mastery of word classes and functional syntax provides the rock-solid foundation for advanced error spotting, concord, voice, and clause synthesis.",
    explanationBn: "শব্দের অবস্থান ও কাজ অনুযায়ী পদ নির্ণয় করতে পারলে প্রতিযোগিতামূলক পরীক্ষার Error Spotting ও Translation-এ শতভাগ নির্ভুল হওয়া যায়।"
  }
];

export default questions;
