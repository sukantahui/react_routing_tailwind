// topic4_questions.js
// Module 001_003 | Topic 4: Exclamatory Sentences ('What a...' vs 'How...')

const questions = [
  {
    id: 1,
    question: "When is 'WHAT (A/AN)' used instead of 'HOW' to begin an exclamatory sentence?",
    options: [
      "When modifying a NOUN or Noun Phrase (e.g., 'What a brilliant demonstration!')",
      "When modifying a single adjective without a noun",
      "When asking a question",
      "Only in past tense"
    ],
    correctAnswer: 0,
    explanation: "'What (a/an)' modifies nominal heads: $What + (a/an) + (Adj) + Noun + (Subject + Verb)!$.",
    explanationBn: "Noun বা Noun Phrase-এর ক্ষেত্রে 'What a / an' বসে (যেমন: 'What a beautiful scene!')."
  },
  {
    id: 2,
    question: "When is 'HOW' used to begin an exclamatory sentence?",
    options: [
      "When modifying an ADJECTIVE or ADVERB directly (e.g., 'How beautifully she sang!')",
      "When modifying a noun phrase with an article",
      "When writing a command",
      "Only in questions"
    ],
    correctAnswer: 0,
    explanation: "'How' directly modifies bare adjectives or adverbs: $How + Adj/Adv + Subject + Verb!$.",
    explanationBn: "শুধুমাত্র Adjective বা Adverb-এর তীব্রতা প্রকাশ করতে 'How' বসে (যেমন: 'How sweet the rose smells!')."
  },
  {
    id: 3,
    question: "Convert the assertive statement 'The Himalayan sunset is very magnificent' into an exclamatory sentence:",
    options: [
      "How magnificent the Himalayan sunset is!",
      "What magnificent the Himalayan sunset is!",
      "How very magnificent the sunset!",
      "Is the sunset magnificent!"
    ],
    correctAnswer: 0,
    explanation: "'Magnificent' is an adjective, so 'How' is used, dropping 'very': 'How magnificent the Himalayan sunset is!'.",
    explanationBn: "Adjective 'magnificent'-এর পূর্বে 'How' বসে এবং 'very' উঠে যায়।"
  },
  {
    id: 4,
    question: "Convert 'It is a very thrilling football match' into an exclamatory sentence:",
    options: [
      "What a thrilling football match it is!",
      "How a thrilling football match it is!",
      "What thrilling match!",
      "How thrilling it match!"
    ],
    correctAnswer: 0,
    explanation: "'A thrilling football match' is a singular noun phrase, requiring 'What a': 'What a thrilling football match it is!'.",
    explanationBn: "Noun Phrase 'a thrilling football match'-এর পূর্বে 'What a' বসে।"
  },
  {
    id: 5,
    question: "In exclamatory sentences, where does the [Subject + Finite Verb] typically sit?",
    options: [
      "At the very END of the clause before the exclamation mark (e.g., 'How cold the winter night [is]!')",
      "At the very beginning",
      "Between the adjective and noun",
      "Subject and verb are deleted"
    ],
    correctAnswer: 0,
    explanation: "The emotive modifier fronts the clause, pushing the $Subject + Verb$ pair to terminal position.",
    explanationBn: "আবেগের অংশটি সামনে চলে আসায় Subject ও Verb বাক্যের শেষে বিস্ময়সূচক চিহ্নের ঠিক আগে বসে।"
  },
  {
    id: 6,
    question: "Convert 'I wish I had the wings of a dove' into an exclamatory wish:",
    options: [
      "O that I had the wings of a dove!",
      "What I had the wings!",
      "How I had wings!",
      "Did I have wings!"
    ],
    correctAnswer: 0,
    explanation: "'O that...' or 'If only...' express poetic exclamatory yearning for the impossible.",
    explanationBn: "'O that...' বা 'If only...' দিয়ে আন্তরিক আকাঙ্ক্ষা প্রকাশক Exclamatory বাক্য তৈরি হয়।"
  },
  {
    id: 7,
    question: "Which of the following is punctuated CORRECTLY for an interjection-led exclamation?",
    options: [
      "Alas! The noble king is no more.",
      "Alas the noble king is no more!",
      "Alas? The noble king is no more.",
      "Alas, the noble king is no more?"
    ],
    correctAnswer: 0,
    explanation: "When an interjection is used, the exclamation mark follows the interjection, and the subsequent clause ends with a period.",
    explanationBn: "Interjection-এর ঠিক পরেই বিস্ময়সূচক চিহ্ন (!) বসে এবং পরবর্তী বাক্যের শেষে Full Stop বসে।"
  },
  {
    id: 8,
    question: "Convert 'It is extremely sad that the expedition failed' into an exclamatory sentence with 'Alas':",
    options: [
      "Alas! The expedition has failed.",
      "How sad the expedition failed?",
      "What a failure of expedition!",
      "Alas that failed!"
    ],
    correctAnswer: 0,
    explanation: "'Alas!' replaces 'It is extremely sad that' to express sudden grief.",
    explanationBn: "গভীর দুঃখ প্রকাশে 'Alas! The expedition has failed.' সঠিক।"
  },
  {
    id: 9,
    question: "Why is 'How a beautiful flower it is!' ungrammatical?",
    options: [
      "Because 'How' cannot be followed by an indefinite article + noun phrase; 'What a' must be used",
      "Because flowers are not beautiful",
      "Because 'is' is singular",
      "Because 'How' only works with questions"
    ],
    correctAnswer: 0,
    explanation: "'How' modifies bare adjectives ('How beautiful the flower is!'), whereas 'What a' modifies noun phrases ('What a beautiful flower it is!').",
    explanationBn: "'How'-এর সাথে 'a' বসে না; Noun Phrase থাকলে 'What a' ব্যবহার করতে হয়।"
  },
  {
    id: 10,
    question: "What syntactic purpose is served by transforming Assertive statements into Exclamatory sentences in creative composition?",
    options: [
      "To heighten emotional resonance, rhetorical intensity, and spontaneous imagery",
      "To make essays longer",
      "To avoid using verbs",
      "To sound old-fashioned"
    ],
    correctAnswer: 0,
    explanation: "Exclamatory sentences infuse writing with dramatic passion, vibrancy, and heightened communicative force.",
    explanationBn: "Exclamatory বাক্য রচনার আবেগ, নাটকীয়তা ও আবেদন বহুগুণ বাড়িয়ে তোলে।"
  }
];

export default questions;
