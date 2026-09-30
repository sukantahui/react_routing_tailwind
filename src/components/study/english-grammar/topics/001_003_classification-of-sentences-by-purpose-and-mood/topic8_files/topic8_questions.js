// topic8_questions.js
// Module 001_003 | Topic 8: Module 001_003 Capstone Self-Assessment

const questions = [
  {
    id: 1,
    question: "Identify the sentence type: 'May you find joy and prosperity in your new venture!'",
    options: ["Optative", "Imperative", "Exclamatory", "Interrogative"],
    correctAnswer: 0,
    explanation: "Sentences expressing wishes, blessings, or prayers using 'May' are Optative sentences.",
    explanationBn: "'May' দিয়ে শুভকামনা বা আশীর্বাদ প্রকাশ করা বাক্যকে Optative Sentence বলে।"
  },
  {
    id: 2,
    question: "Which question tag correctly completes: 'She rarely speaks ill of others, _______?'",
    options: ["does she?", "doesn't she?", "is she?", "isn't she?"],
    correctAnswer: 0,
    explanation: "'Rarely' is semantically negative, requiring an affirmative tag: 'does she?'.",
    explanationBn: "'Rarely' না-বোধক হওয়ায় Tag হবে হ্যাঁ-বোধক 'does she?'।"
  },
  {
    id: 3,
    question: "Identify the syntactic category: 'Kindly submit your research paper by Friday noon.'",
    options: ["Imperative (Polite Request)", "Declarative", "Optative", "Interrogative"],
    correctAnswer: 0,
    explanation: "Imperative sentences issue requests or instructions with an implied 2nd person subject '(You)'.",
    explanationBn: "অনুরোধমূলক বাক্য যাতে Subject 'You' উহ্য থাকে, তা Imperative Sentence।"
  },
  {
    id: 4,
    question: "Which of the following is an exclamatory sentence constructed with correct grammar?",
    options: [
      "What a sensational match that was!",
      "How a sensational match that was!",
      "What sensational that match was!",
      "What a sensational was that match!"
    ],
    correctAnswer: 0,
    explanation: "The formula is: 'What + a/an + Adjective + Noun + Subject + Verb!'",
    explanationBn: "সঠিক কাঠামো: 'What + a/an + Adjective + Noun + Subject + Verb!'।"
  },
  {
    id: 5,
    question: "What is the correct tag for: 'Let us organize a tree-planting drive, _______?'",
    options: ["shall we?", "will you?", "won't we?", "can we?"],
    correctAnswer: 0,
    explanation: "'Let us' / 'Let's' (suggestion) takes 'shall we?'.",
    explanationBn: "'Let us' দিয়ে প্রস্তাব বোঝালে Tag হয় 'shall we?'।"
  },
  {
    id: 6,
    question: "Transform into Interrogative: 'Nobody likes to be insulted.'",
    options: [
      "Who likes to be insulted?",
      "Does nobody like to be insulted?",
      "Who does not like to be insulted?",
      "Is nobody liking insult?"
    ],
    correctAnswer: 0,
    explanation: "Negative universal 'Nobody' transforms into affirmative rhetorical question 'Who likes...?'.",
    explanationBn: "'Nobody' যুক্ত বাক্যকে প্রশ্নে রূপান্তর করতে 'Who + Affirmative Verb...?' বসে।"
  },
  {
    id: 7,
    question: "Which auxiliary inversion is required for: 'Rarely _______ such incredible natural beauty.'",
    options: ["have I seen", "I have seen", "I saw", "seen have I"],
    correctAnswer: 0,
    explanation: "Negative adverb fronting ('Rarely') forces subject-auxiliary inversion ('have I seen').",
    explanationBn: "বাক্যের শুরুতে 'Rarely' বসলে Subject-এর আগে Auxiliary Verb আসে ('have I seen')।"
  },
  {
    id: 8,
    question: "Identify the communicative function of: 'Why don't we review chapter three together?'",
    options: [
      "Imperative Suggestion packaged in Interrogative form",
      "Pure fact-seeking question",
      "Optative blessing",
      "Exclamatory exclamation"
    ],
    correctAnswer: 0,
    explanation: "'Why don't we...' is a pragmatic conversational suggestion structured as an interrogative.",
    explanationBn: "'Why don't we...' গঠনগতভাবে প্রশ্ন হলেও কার্যক্ষেত্রে এটি একটি প্রস্তাব (Suggestion)।"
  },
  {
    id: 9,
    question: "What is the tag for: 'Let the children play in the garden, _______?'",
    options: ["will you?", "shall we?", "won't they?", "do they?"],
    correctAnswer: 0,
    explanation: "'Let + 3rd person noun/pronoun' (permission) takes 'will you?'.",
    explanationBn: "'Let + Third Person' (অনুমতি) বোঝালে Tag হবে 'will you?'।"
  },
  {
    id: 10,
    question: "Transform into Assertive: 'What a glorious monument the Taj Mahal is!'",
    options: [
      "The Taj Mahal is a very glorious monument.",
      "The Taj Mahal is glorious?",
      "Is the Taj Mahal a very glorious monument?",
      "The Taj Mahal was glorious."
    ],
    correctAnswer: 0,
    explanation: "'What a glorious...' converts to 'Subject + Verb + a very glorious...'.",
    explanationBn: "'What a glorious monument' Assertive-এ 'is a very glorious monument' হয়।"
  },
  {
    id: 11,
    question: "Which tag is required for: 'I am your senior mentor, _______?'",
    options: ["aren't I?", "amn't I?", "am I not?", "Both A and C are grammatically valid (A is standard colloquial)"],
    correctAnswer: 3,
    explanation: "'I am' takes 'aren't I?' in standard conversational English and 'am I not?' in formal written English.",
    explanationBn: "'I am'-এর Tag হিসেবে 'aren't I?' এবং প্রথাগতভাবে 'am I not?' ব্যবহৃত হয়।"
  },
  {
    id: 12,
    question: "In spoken discourse, a falling pitch (↘) on a question tag indicates:",
    options: [
      "The speaker is expecting agreement and rhetorical confirmation",
      "The speaker has no idea about the answer",
      "The sentence is an exclamatory prayer",
      "The speaker is asking for directions"
    ],
    correctAnswer: 0,
    explanation: "Falling tone on tags expects confirmation of known facts.",
    explanationBn: "Falling tone (↘) দিয়ে বক্তা শ্রোতার নিশ্চিত সম্মতি প্রত্যাশা করেন।"
  },
  {
    id: 13,
    question: "Identify the optative invariant without 'May':",
    options: [
      "Long live the Indian Constitution!",
      "You will live long.",
      "Are you living long?",
      "Live long and write well."
    ],
    correctAnswer: 0,
    explanation: "'Long live...' uses the subjunctive base verb with an elliptical understood 'May'.",
    explanationBn: "'Long live the Constitution' একটি ঐতিহ্যবাহী Optative বাক্য যাতে 'May' উহ্য রয়েছে।"
  },
  {
    id: 14,
    question: "Which sentence is classified as a negative assertion?",
    options: [
      "She rarely neglects her morning routine.",
      "She neglects her morning routine.",
      "Does she neglect her morning routine?",
      "Neglect not your routine!"
    ],
    correctAnswer: 0,
    explanation: "'Rarely neglects' is an assertive declarative statement with negative polarity.",
    explanationBn: "'She rarely neglects...' একটি বর্ণনামূলক না-বোধক বাক্য।"
  },
  {
    id: 15,
    question: "Why is mastering sentence classification by purpose essential for higher-level grammar?",
    options: [
      "Because voice change, narration, modal syntax, and transformation rules depend on communicative sentence category",
      "Only for elementary school exams",
      "Because all sentences in English must have exclamation marks",
      "To avoid writing long paragraphs"
    ],
    correctAnswer: 0,
    explanation: "Reported speech (narration), voice, inversion, and syntax formulas fundamentally pivot upon the sentence's communicative class.",
    explanationBn: "Narration (উক্তি পরিবর্তন), Voice, এবং Transformation-এর সমস্ত নিয়ম বাক্যের প্রকারভেদের উপর নির্ভর করে।"
  }
];

export default questions;
