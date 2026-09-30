// topic6_questions.js
// Topic 6: Classroom Dialogue & Functional Word Identification

const questions = [
  {
    id: 1,
    question: "During the classroom session, why did Sukanta Sir correct Swadeep for saying 'He ran fastly'?",
    options: [
      "Because 'fast' is both an adjective and an adverb; 'fastly' does not exist in standard English",
      "Because 'fast' can only be an adjective",
      "Because adverbs cannot be used after verbs of motion",
      "Because the sentence was too short"
    ],
    correctAnswer: 0,
    explanation: "'Fast' is a flat adverb with zero-derivation; English has no such word as 'fastly'.",
    explanationBn: "'Fast' নিজেই একটি Adverb, তাই এর সাথে '-ly' যোগ করে 'fastly' তৈরি করা ব্যাকরণগতভাবে ভুল।"
  },
  {
    id: 2,
    question: "How did Tuhina explain the word 'friendly' in 'She gave a friendly smile'?",
    options: [
      "As an Adverb because it ends in '-ly'",
      "As an Adjective formed by Noun ('friend') + suffix '-ly' modifying 'smile'",
      "As a Verb in past tense",
      "As a Preposition"
    ],
    correctAnswer: 1,
    explanation: "Noun + '-ly' produces an adjective qualifying a noun (e.g., 'friendly smile').",
    explanationBn: "'Friend' Noun-এর সাথে '-ly' যুক্ত হয়ে 'friendly' Adjective গঠিত হয়েছে যা 'smile' Noun-কে বর্ণনা করছে।"
  },
  {
    id: 3,
    question: "When Debangshu asked about 'He arrived before sunset' vs 'He arrived before the train started', what was the key diagnostic test?",
    options: [
      "Checking whether 'before' is followed by a nominal entity (Preposition) or a full subject + finite verb clause (Conjunction)",
      "Counting the letters in the sentence",
      "Translating the sentence into Latin",
      "Checking the font size"
    ],
    correctAnswer: 0,
    explanation: "If followed by a noun/pronoun phrase $\rightarrow$ Preposition. If followed by a full clause with its own subject and finite verb $\rightarrow$ Subordinating Conjunction.",
    explanationBn: "'Before'-এর পর যদি শুধু Noun থাকে তবে তা Preposition; আর যদি পূর্ণাঙ্গ Clause থাকে তবে তা Conjunction।"
  },
  {
    id: 4,
    question: "In the dialogue, why did Sukanta Sir emphasize asking 'What work is this word doing?' rather than 'What does this word mean in Bengali'?",
    options: [
      "Because a single English word shifts grammatical categories depending on its functional placement in the sentence",
      "Because Bengali has no grammatical categories",
      "Because meaning does not matter in English",
      "Because exams forbid translation"
    ],
    correctAnswer: 0,
    explanation: "Functional distribution dictates syntax; isolated literal translation leads to incorrect parts of speech categorization.",
    explanationBn: "বাক্যে শব্দের কাজই তার আসল ব্যাকরণিক পরিচয় নির্ধারণ করে, বিচ্ছিন্নভাবে আক্ষরিক অনুবাদ করলে ভুল পদ চিহ্নিত হয়।"
  },
  {
    id: 5,
    question: "In 'Abhronila was late for class, and lately she has been very busy', what are the parts of speech of 'late' and 'lately'?",
    options: [
      "'Late' is an Adjective (Subject Complement); 'Lately' is an Adverb of Time (meaning recently)",
      "Both are adverbs",
      "Both are adjectives",
      "'Late' is a verb"
    ],
    correctAnswer: 0,
    explanation: "'Late' follows the linking verb 'was' as an adjective; 'lately' is an adverb of time meaning recently.",
    explanationBn: "'Late' Linking Verb-এর পর বসে Adjective; আর 'lately' হলো সম্প্রতিকাল নির্দেশক Adverb of Time।"
  },
  {
    id: 6,
    question: "Which student correctly identified 'down' as a preposition in 'He ran down the hill'?",
    options: ["Swadeep", "Debangshu", "Tuhina", "Abhronila"],
    correctAnswer: 2,
    explanation: "Tuhina observed that 'down' governs the nominal object 'the hill', functioning as a spatial preposition.",
    explanationBn: "'the hill' Noun Object-এর পূর্বে বসে স্থানিক গতি বোঝানোয় 'down' একটি Preposition।"
  },
  {
    id: 7,
    question: "In 'The up train will arrive on platform 2', what part of speech is 'up'?",
    options: ["Preposition", "Adjective qualifying 'train'", "Adverb", "Noun"],
    correctAnswer: 1,
    explanation: "'Up' is positioned attributively before the noun 'train', functioning as an adjective.",
    explanationBn: "'train' Noun-এর পূর্বে বসে তার অভিমুখ প্রকাশ করায় 'up' এখানে Adjective।"
  },
  {
    id: 8,
    question: "Why did Sukanta Sir warn against confusing 'hard' and 'hardly' in competitive examinations?",
    options: [
      "Because 'hard' means with intense effort, while 'hardly' is a negative adverb meaning almost not at all",
      "Because both words have identical meanings",
      "Because 'hardly' is an adjective",
      "Because 'hard' cannot be used in formal essays"
    ],
    correctAnswer: 0,
    explanation: "'He worked hard' = diligent effort; 'He hardly worked' = almost did no work (polarity reversal!).",
    explanationBn: "'He worked hard' মানে সে কঠোর পরিশ্রম করেছিল, আর 'He hardly worked' মানে সে প্রায় কাজই করেনি।"
  },
  {
    id: 9,
    question: "In 'Still waters run deep', what are 'Still' and 'deep'?",
    options: [
      "'Still' is an Adjective qualifying 'waters'; 'deep' is an Adverb modifying 'run'",
      "Both are nouns",
      "Both are verbs",
      "'Still' is an adverb; 'deep' is a preposition"
    ],
    correctAnswer: 0,
    explanation: "'Still' is an attributive adjective meaning calm/unmoving; 'deep' is a flat adverb modifying the verb 'run'.",
    explanationBn: "'Still' হলো 'waters' Noun-এর Adjective; আর 'deep' হলো 'run' Verb-এর Adverb।"
  },
  {
    id: 10,
    question: "What is the primary pedagogical takeaway from the Barrackpore Classroom Dialogue?",
    options: [
      "Mastery of English parts of speech requires contextual clause parsing, active diagnostic questioning, and unlearning literal word-by-word translation habits",
      "Grammar should be memorized without understanding",
      "Students should never ask questions",
      "Only written English matters"
    ],
    correctAnswer: 0,
    explanation: "True linguistic fluency comes from contextual parsing and functional syntactic reasoning.",
    explanationBn: "সঠিক ব্যাকরণ দক্ষতা আসে বাক্যের অভ্যন্তরীণ গঠন ও পদের কার্যকারিতা বিশ্লেষণের মাধ্যমে।"
  }
];

export default questions;
