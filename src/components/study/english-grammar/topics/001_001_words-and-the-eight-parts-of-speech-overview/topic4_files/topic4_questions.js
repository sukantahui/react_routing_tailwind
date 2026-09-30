// topic4_questions.js
// Topic 4: High-Level Overview of Adjectives and Adverbs

const questions = [
  {
    id: 1,
    question: "What is the primary syntactic distinction between an ADJECTIVE and an ADVERB?",
    options: [
      "Adjectives modify Nouns/Pronouns; Adverbs modify Verbs, Adjectives, and other Adverbs",
      "Adjectives always end in '-ly'; Adverbs never end in '-ly'",
      "Adjectives only appear at the beginning of a sentence",
      "Adverbs can only modify nouns"
    ],
    correctAnswer: 0,
    explanation: "Adjectives qualify nominal heads (nouns/pronouns), whereas adverbs qualify verbs (manner/time/place), adjectives (degree), or other adverbs.",
    explanationBn: "Adjective মূলত Noun/Pronoun-এর দোষ, গুণ বা অবস্থা প্রকাশ করে; আর Adverb কোনো Verb, Adjective বা অন্য কোনো Adverb-কে modify করে।"
  },
  {
    id: 2,
    question: "Which of the following words ending in '-ly' is actually an ADJECTIVE, not an adverb?",
    options: ["Quickly", "Friendly", "Slowly", "Eagerly"],
    correctAnswer: 1,
    explanation: "'Friendly' is formed by Noun + '-ly' (Friend + ly = Friendly), which creates an Adjective (e.g., 'a friendly scholar').",
    explanationBn: "Noun-এর সাথে '-ly' যুক্ত হলে Adjective গঠিত হয় (যেমন: Friendly, Lovely, Cowardly, Motherly)।"
  },
  {
    id: 3,
    question: "In 'The flower smells sweet', why is 'sweet' used instead of 'sweetly'?",
    options: [
      "Because 'smells' is a Sensory Linking (Copular) Verb requiring a Subject Complement Adjective",
      "Because 'sweetly' is not an English word",
      "Because the flower is actively performing an action with a nose",
      "Because adverbs are banned after flowers"
    ],
    correctAnswer: 0,
    explanation: "Sensory verbs (smell, taste, look, feel, sound) act as copulas connecting to an adjective complement describing the subject's inherent quality.",
    explanationBn: "অনুভূতিমূলক Linking Verb (smell, taste, look)-এর পর Adverb নয়, Subject Complement Adjective বসে।"
  },
  {
    id: 4,
    question: "In 'The exceptionally brilliant coder solved the problem very quickly', what is 'exceptionally'?",
    options: ["Adjective modifying 'coder'", "Adverb of Degree modifying the adjective 'brilliant'", "Noun adjunct", "Verb"],
    correctAnswer: 1,
    explanation: "'Exceptionally' is an adverb of degree modifying the adjective 'brilliant'.",
    explanationBn: "'Exceptionally' হলো Adverb of Degree যা 'brilliant' Adjective-এর মাত্রা নির্দেশ করছে।"
  },
  {
    id: 5,
    question: "What is the ATTRIBUTIVE position of an adjective?",
    options: [
      "Placing the adjective directly before the noun it modifies (e.g., 'a brilliant scholar')",
      "Placing the adjective after a linking verb (e.g., 'the scholar is brilliant')",
      "Placing the adjective at the very end of a paragraph",
      "Using the adjective as a verb"
    ],
    correctAnswer: 0,
    explanation: "An attributive adjective directly precedes its nominal head (e.g., 'a diligent student').",
    explanationBn: "Noun-এর ঠিক পূর্বে বসে গুণ প্রকাশ করাকে Attributive Position বলে (যেমন: 'a diligent student')।"
  },
  {
    id: 6,
    question: "Which of the following adjectives can ONLY be used in the PREDICATIVE position (never attributively)?",
    options: ["Afraid", "Red", "Large", "Clever"],
    correctAnswer: 0,
    explanation: "'Afraid' (along with asleep, alive, awake, aware) is used strictly predicatively (e.g., 'He was afraid', never 'an afraid boy').",
    explanationBn: "'Afraid', 'asleep', 'alive' প্রভৃতি Adjective শুধুমাত্র Predicative হিসেবে বসে, Noun-এর পূর্বে বসে না।"
  },
  {
    id: 7,
    question: "What is the correct royal order of adverbs in a standard clause?",
    options: [
      "Time -> Manner -> Place",
      "Manner -> Place -> Time (M-P-T)",
      "Place -> Time -> Manner",
      "Time -> Place -> Manner"
    ],
    correctAnswer: 1,
    explanation: "The standard English sequence is Manner (How) -> Place (Where) -> Time (When). Example: 'He spoke fluently in the hall yesterday'.",
    explanationBn: "Adverb-এর সঠিক ক্রম হলো Manner -> Place -> Time (MPT নিয়ম)।"
  },
  {
    id: 8,
    question: "In 'She worked hard, but hardly earned enough', what do 'hard' and 'hardly' mean?",
    options: [
      "'Hard' means with great effort (Adverb of manner); 'Hardly' means almost not at all (Negative adverb of degree)",
      "Both mean with great speed",
      "Both mean gently",
      "'Hardly' means strongly"
    ],
    correctAnswer: 0,
    explanation: "'Hard' is a flat adverb meaning diligently/with effort; 'hardly' is a semi-negative adverb meaning scarcely/almost not.",
    explanationBn: "'Hard' মানে কঠোরভাবে, আর 'Hardly' মানে প্রায় একেবারেই না (না-বোধক Adverb)।"
  },
  {
    id: 9,
    question: "Which of the following is an ADVERB OF FREQUENCY?",
    options: ["Yesterday", "Carefully", "Seldom", "Everywhere"],
    correctAnswer: 2,
    explanation: "'Seldom' (rarely) indicates how frequently an action takes place.",
    explanationBn: "'Seldom' (কদাচিৎ) একটি Adverb of Frequency যা কাজের পুনরাবৃত্তির হার বোঝায়।"
  },
  {
    id: 10,
    question: "In 'This mango is fairly ripe, but that one is rather sour', what is the nuance between 'fairly' and 'rather'?",
    options: [
      "'Fairly' is typically used with pleasant/favorable qualities; 'Rather' is used with unpleasant qualities or surprising degrees",
      "They are identical and interchangeable",
      "'Fairly' means extremely; 'Rather' means never",
      "'Fairly' is an adjective; 'Rather' is a noun"
    ],
    correctAnswer: 0,
    explanation: "'Fairly' modifies pleasant traits ('fairly good'); 'rather' modifies unpleasant traits ('rather bad') or unexpected intensity.",
    explanationBn: "'Fairly' ইতিবাচক/ভালো গুণের সাথে এবং 'Rather' নেতিবাচক/প্রতিকূল গুণের সাথে ব্যবহৃত হয়।"
  }
];

export default questions;
