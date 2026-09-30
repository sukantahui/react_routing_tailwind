// topic4_questions.js
// Topic 4: High-Level Overview of Adjectives and Adverbs
// 25 Comprehensive Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What is the fundamental difference between an Adjective and an Adverb in English syntax?",
    options: [
      "Adjectives modify Nouns/Pronouns, while Adverbs modify Verbs, Adjectives, or other Adverbs",
      "Adjectives only appear in questions",
      "Adverbs can only modify pronouns",
      "There is no grammatical difference"
    ],
    correctAnswer: 0,
    answer: "Adjectives modify Nouns/Pronouns, while Adverbs modify Verbs, Adjectives, or other Adverbs",
    explanation: "Adjectives are nominal qualifiers (describing entities), while Adverbs modify actions, qualities, states, degree, or entire clauses.",
    explanationBn: "Adjective (নাম-বিশেষণ) Noun বা Pronoun-কে qualify করে, আর Adverb (ভাব-বিশেষণ) Verb, Adjective বা অন্য কোনো Adverb-কে modify করে।",
    hint: "Think about what each class modifies.",
    level: "basic"
  },
  {
    id: 2,
    question: "In the sentence 'The exceptionally brilliant student solved the puzzle', what does the adverb 'exceptionally' modify?",
    options: ["The noun 'student'", "The adjective 'brilliant'", "The verb 'solved'", "The noun 'puzzle'"],
    correctAnswer: 1,
    answer: "The adjective 'brilliant'",
    explanation: "'Exceptionally' is an Adverb of Degree modifying the qualitative adjective 'brilliant' (How brilliant? Exceptionally brilliant).",
    explanationBn: "'exceptionally' হলো Adverb of Degree যা 'brilliant' Adjective-টির মাত্রা নির্দেশ করছে।",
    hint: "It answers 'To what degree brilliant?'.",
    level: "intermediate"
  },
  {
    id: 3,
    question: "Which of the following words ending in '-ly' is actually an ADJECTIVE, not an adverb?",
    options: ["Quickly", "Friendly", "Swiftly", "Carefully"],
    correctAnswer: 1,
    answer: "Friendly",
    explanation: "'Friendly' is formed by Noun + '-ly' (Friend + ly = Friendly), which produces an Adjective. Suffixing '-ly' to an Adjective produces an Adverb (Quick + ly = Quickly).",
    explanationBn: "Noun-এর সাথে '-ly' যোগ করলে Adjective গঠিত হয় (Friend + ly = Friendly)। Adjective-এর সাথে '-ly' যোগ করলে Adverb গঠিত হয় (Quick + ly = Quickly)।",
    hint: "Noun + ly = Adjective.",
    level: "intermediate"
  },
  {
    id: 4,
    question: "What is the correct adverbial expression for 'in a cowardly way'?",
    options: ["He fought cowardly", "He fought in a cowardly manner", "He fought cowardlily", "He cowardly fought"],
    correctAnswer: 1,
    answer: "He fought in a cowardly manner",
    explanation: "Because 'cowardly' is an adjective, it cannot modify a verb directly. It requires a prepositional phrase: 'in a cowardly manner/way'.",
    explanationBn: "'cowardly' একটি Adjective হওয়ায় সরাসরি Verb-কে modify করতে পারে না; বলতে হবে 'in a cowardly manner'।",
    hint: "Use the prepositional phrase 'in a ... manner'.",
    level: "advanced"
  },
  {
    id: 5,
    question: "What is an Attributive Adjective?",
    options: [
      "An adjective that stands directly before the noun it modifies (e.g., 'a diligent scholar')",
      "An adjective that follows a linking verb (e.g., 'the scholar is diligent')",
      "An adjective that only appears in negative sentences",
      "An adjective derived from a verb"
    ],
    correctAnswer: 0,
    answer: "An adjective that stands directly before the noun it modifies (e.g., 'a diligent scholar')",
    explanation: "Attributive adjectives sit directly adjacent to (usually before) the nominal entity they qualify.",
    explanationBn: "Attributive Adjective সরাসরি Noun-এর পূর্বে বসে তার গুণ বা বৈশিষ্ট্য প্রকাশ করে (যেমন: 'a diligent scholar')।",
    hint: "Positioned directly before the noun.",
    level: "basic"
  },
  {
    id: 6,
    question: "What is a Predicative Adjective?",
    options: [
      "An adjective functioning as subject complement following a linking verb (e.g., 'The student is happy')",
      "An adjective before a noun",
      "An adjective placed in parentheses",
      "An adjective that modifies an adverb"
    ],
    correctAnswer: 0,
    answer: "An adjective functioning as subject complement following a linking verb (e.g., 'The student is happy')",
    explanation: "Predicative adjectives follow linking (copular) verbs and predicate a quality to the grammatical subject.",
    explanationBn: "Predicative Adjective হলো Linking Verb-এর পরে বসে Subject Complement হিসেবে কাজ করা বিশেষণ (যেমন: 'The student is happy')।",
    hint: "Follows a linking verb like 'is', 'seems', 'feels'.",
    level: "basic"
  },
  {
    id: 7,
    question: "In the sentence 'The rose smells sweet', why is 'sweet' (adjective) used instead of 'sweetly' (adverb)?",
    options: [
      "Because 'smells' is a linking verb of sensation describing the subject's condition, requiring an adjective complement",
      "Because 'sweetly' is not an English word",
      "It is an informal slang expression",
      "Because 'rose' is singular"
    ],
    correctAnswer: 0,
    answer: "Because 'smells' is a linking verb of sensation describing the subject's condition, requiring an adjective complement",
    explanation: "Sensory linking verbs (smell, taste, sound, feel, look) take adjective subject complements, not adverbs of manner (unless the subject is actively performing smelling).",
    explanationBn: "'smell' এখানে Linking Verb হিসেবে গোলাপের গন্ধের প্রকৃতি প্রকাশ করছে, কোনো সক্রিয় কাজ নয়; তাই Adjective 'sweet' বসবে ('sweetly' ভুল)।",
    hint: "Linking verbs take adjective complements, not adverbs.",
    level: "intermediate"
  },
  {
    id: 8,
    question: "What is the standard Royal Order of Cumulative Adjectives in English (OSASCOMP)?",
    options: [
      "Opinion, Size, Age, Shape, Color, Origin, Material, Purpose",
      "Origin, Shape, Size, Age, Color, Material, Opinion, Purpose",
      "Material, Color, Origin, Shape, Size, Age, Purpose, Opinion",
      "Purpose, Material, Origin, Color, Shape, Age, Size, Opinion"
    ],
    correctAnswer: 0,
    answer: "Opinion, Size, Age, Shape, Color, Origin, Material, Purpose",
    explanation: "The OSASCOMP mnemonic stands for: Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material -> Purpose (e.g., 'A lovely small antique round wooden dining table').",
    explanationBn: "একাধিক Adjective পাশাপাশি বসলে তাদের সঠিক ক্রম হলো: Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material -> Purpose (OSASCOMP)।",
    hint: "Remember the acronym OSASCOMP.",
    level: "advanced"
  },
  {
    id: 9,
    question: "Which of the following phrases correctly observes the Royal Order of Adjectives?",
    options: [
      "A black antique wooden beautiful chair",
      "A beautiful antique black wooden chair",
      "A wooden beautiful antique black chair",
      "An antique black wooden beautiful chair"
    ],
    correctAnswer: 1,
    answer: "A beautiful antique black wooden chair",
    explanation: "Opinion (beautiful) -> Age (antique) -> Color (black) -> Material (wooden) matches the OSASCOMP sequence.",
    explanationBn: "Opinion (beautiful) -> Age (antique) -> Color (black) -> Material (wooden) — এটি সঠিক OSASCOMP ক্রম অনুসরণ করে।",
    hint: "Opinion comes first, material comes near the noun.",
    level: "advanced"
  },
  {
    id: 10,
    question: "What is a 'Flat Adverb' in English?",
    options: [
      "An adverb that has the exact same morphological form as its corresponding adjective without '-ly' (e.g., fast, hard, late, early)",
      "An adverb that only describes two-dimensional objects",
      "An adverb that cannot be spoken aloud",
      "An adverb that has been abolished from modern dictionaries"
    ],
    correctAnswer: 0,
    answer: "An adverb that has the exact same morphological form as its corresponding adjective without '-ly' (e.g., fast, hard, late, early)",
    explanation: "Flat adverbs share their form with adjectives (e.g., 'run fast', 'work hard', 'arrive late').",
    explanationBn: "Flat Adverb হলো এমন Adverb যার সাথে '-ly' যুক্ত হয় না, বরং তা Adjective-এর রূপেই হুবহু ব্যবহৃত হয় (যেমন: 'fast', 'hard', 'late')।",
    hint: "Has the same form as its adjective counterpart.",
    level: "intermediate"
  },
  {
    id: 11,
    question: "What is the difference in meaning between 'hard' and 'hardly'?",
    options: [
      "'Hard' means with great effort/rigor; 'Hardly' means scarcely or almost not at all",
      "They are exact synonyms",
      "'Hardly' is the comparative degree of 'hard'",
      "'Hard' is only a noun"
    ],
    correctAnswer: 0,
    answer: "'Hard' means with great effort/rigor; 'Hardly' means scarcely or almost not at all",
    explanation: "'He works hard' (diligently) vs 'He hardly works' (almost never works). Confusing these two alters the sentence's polarity.",
    explanationBn: "'He works hard' মানে সে কঠোর পরিশ্রম করে, আর 'He hardly works' মানে সে প্রায় কোনো কাজই করে না।",
    hint: "'Hardly' carries a negative, near-zero meaning.",
    level: "intermediate"
  },
  {
    id: 12,
    question: "What is the difference in meaning between 'late' and 'lately'?",
    options: [
      "'Late' means after the expected time; 'Lately' means recently / in recent times",
      "They mean the exact same thing",
      "'Lately' means deceased",
      "'Late' cannot be used as an adverb"
    ],
    correctAnswer: 0,
    answer: "'Late' means after the expected time; 'Lately' means recently / in recent times",
    explanation: "'He arrived late' (tardy) vs 'I haven't seen Debangshu lately' (recently).",
    explanationBn: "'He arrived late' (দেরিতে পৌঁছাল), আর 'I have not seen him lately' (সম্প্রতি তাকে দেখিনি)।",
    hint: "'Lately' refers to recent time.",
    level: "intermediate"
  },
  {
    id: 13,
    question: "What is the Royal Order of Multiple Adverbs in a Single Clause (MPT Rule)?",
    options: [
      "Manner -> Place -> Time (e.g., 'She sang beautifully at Barrackpore yesterday')",
      "Time -> Manner -> Place",
      "Place -> Time -> Manner",
      "Manner -> Time -> Place"
    ],
    correctAnswer: 0,
    answer: "Manner -> Place -> Time (e.g., 'She sang beautifully at Barrackpore yesterday')",
    explanation: "When manner, place, and time adverbs occur together at the end of a clause, the natural English order is MPT (Manner -> Place -> Time).",
    explanationBn: "একই বাক্যে একাধিক Adverb বসলে তাদের স্বাভাবিক ক্রম হলো: Manner (কীভাবে) -> Place (কোথায়) -> Time (কখন) (MPT Rule)।",
    hint: "Remember the MPT sequence: Manner, Place, Time.",
    level: "advanced"
  },
  {
    id: 14,
    question: "Which sentence correctly places multiple adverbs following the MPT rule?",
    options: [
      "Swadeep programmed brilliantly in the computer lab all evening.",
      "Swadeep programmed all evening in the computer lab brilliantly.",
      "Swadeep programmed in the computer lab brilliantly all evening.",
      "Swadeep programmed all evening brilliantly in the computer lab."
    ],
    correctAnswer: 0,
    answer: "Swadeep programmed brilliantly in the computer lab all evening.",
    explanation: "Manner ('brilliantly') -> Place ('in the computer lab') -> Time ('all evening') strictly satisfies the MPT rule.",
    explanationBn: "Manner ('brilliantly') -> Place ('in the computer lab') -> Time ('all evening') — এটি MPT নিয়ম নিখুঁতভাবে মেনে চলে।",
    hint: "Manner first, then Place, then Time.",
    level: "advanced"
  },
  {
    id: 15,
    question: "Identify the Adverb of Frequency in: 'Abhronila seldom makes calculation mistakes in algebra.'",
    options: ["mistakes", "seldom", "algebra", "makes"],
    correctAnswer: 1,
    answer: "seldom",
    explanation: "'Seldom' tells how often the action occurs (almost never), functioning as an Adverb of Frequency.",
    explanationBn: "'seldom' (কদাচিৎ/খুব কমই) হলো Adverb of Frequency যা কাজের পুনরাবৃত্তির হার প্রকাশ করে।",
    hint: "It answers 'How often?'.",
    level: "basic"
  },
  {
    id: 16,
    question: "Where should an Adverb of Frequency (like always, never, often, seldom) normally be positioned in relation to a single lexical verb?",
    options: [
      "Immediately BEFORE the main lexical verb (e.g., 'He always arrives on time')",
      "At the very end of the paragraph",
      "Immediately after the direct object",
      "Between the article and the noun"
    ],
    correctAnswer: 0,
    answer: "Immediately BEFORE the main lexical verb (e.g., 'He always arrives on time')",
    explanation: "Adverbs of frequency typically precede the main lexical verb, but follow the primary auxiliary 'Be' (e.g., 'He is always punctual').",
    explanationBn: "Adverb of Frequency সাধারণত Main Verb-এর পূর্বে বসে (যেমন: 'He always comes'), কিন্তু Be-verb-এর পরে বসে (যেমন: 'He is always punctual')।",
    hint: "Placed before the main verb.",
    level: "intermediate"
  },
  {
    id: 17,
    question: "Which of the following is a Quantitative / Distributive Adjective?",
    options: ["Every", "Silently", "Quickly", "Because"],
    correctAnswer: 0,
    answer: "Every",
    explanation: "'Every' is a distributive adjective qualifying singular countable nouns individually (e.g., 'Every student').",
    explanationBn: "'Every' হলো Distributive Adjective যা প্রত্যেক সদস্যকে আলাদাভাবে নির্দেশ করে।",
    hint: "Qualifies individual members of a group.",
    level: "basic"
  },
  {
    id: 18,
    question: "What are the Three Degrees of Comparison for the irregular adjective 'GOOD'?",
    options: [
      "Good, Better, Best",
      "Good, Gooder, Goodest",
      "Good, More Good, Most Good",
      "Good, Well, Best"
    ],
    correctAnswer: 0,
    answer: "Good, Better, Best",
    explanation: "Positive: Good, Comparative: Better, Superlative: Best.",
    explanationBn: "Adjective-এর ৩টি মাত্রা: Positive (Good), Comparative (Better), Superlative (Best)।",
    hint: "The irregular forms for 'good'.",
    level: "basic"
  },
  {
    id: 19,
    question: "In the sentence 'The deeper the well, the cooler the water', what grammatical role do the two 'the's perform?",
    options: [
      "Definite Articles",
      "Adverbs of Degree (Correlative Instrumentals)",
      "Coordinating Conjunctions",
      "Demonstrative Pronouns"
    ],
    correctAnswer: 1,
    answer: "Adverbs of Degree (Correlative Instrumentals)",
    explanation: "In parallel comparative constructions ('the more... the better'), 'the' is an old instrumental adverb meaning 'by that amount / to that degree'.",
    explanationBn: "সমান্তরাল তুলনামূলক বাক্যে ('the more... the better') 'the' শব্দটি Article নয়, বরং Adverb of Degree হিসেবে কাজ করে (ততোধিক... যতোধিক)।",
    hint: "Used in parallel comparative constructions.",
    level: "advanced"
  },
  {
    id: 20,
    question: "Which sentence contains an error in adjective/adverb usage?",
    options: [
      "She sings lovely.",
      "She has a lovely voice.",
      "She sings beautifully.",
      "She sang in a lovely manner."
    ],
    correctAnswer: 0,
    answer: "She sings lovely.",
    explanation: "'Lovely' is an adjective and cannot modify the action verb 'sings'. The correct form is 'She sings beautifully' or 'in a lovely manner'.",
    explanationBn: "'Lovely' হলো Adjective, তাই এটি 'sings' Verb-কে সরাসরি modify করতে পারে না; বলতে হবে 'She sings beautifully'।",
    hint: "'Lovely' is an adjective, not an adverb.",
    level: "intermediate"
  },
  {
    id: 21,
    question: "Identify the Demonstrative Adjective in: 'These experimental findings confirm our hypothesis.'",
    options: ["findings", "experimental", "These", "confirm"],
    correctAnswer: 2,
    answer: "These",
    explanation: "'These' directly modifies the plural noun 'findings', specifying which findings are meant, acting as a Demonstrative Adjective.",
    explanationBn: "'These' শব্দটি 'findings' Noun-এর পূর্বে বসে তাকে নির্দিষ্ট করায় Demonstrative Adjective।",
    hint: "Points directly to the following noun.",
    level: "basic"
  },
  {
    id: 22,
    question: "What is an Interrogative Adverb?",
    options: [
      "An adverb used to ask questions about time, place, manner, or reason (When, Where, How, Why)",
      "An adverb that expresses certainty",
      "An adverb used only in negative sentences",
      "An adverb that ends in '-est'"
    ],
    correctAnswer: 0,
    answer: "An adverb used to ask questions about time, place, manner, or reason (When, Where, How, Why)",
    explanation: "When, Where, How, and Why are Interrogative Adverbs when used to initiate questions of time, location, method, and cause.",
    explanationBn: "When (কখন), Where (কোথায়), How (কীভাবে), এবং Why (কেন) — প্রশ্ন তৈরি করতে ব্যবহৃত হলে এদের Interrogative Adverb বলা হয়।",
    hint: "Question words asking for time, place, manner, reason.",
    level: "intermediate"
  },
  {
    id: 23,
    question: "In the sentence 'Tuhina felt bad about the misunderstanding', why is 'bad' correct and not 'badly'?",
    options: [
      "Because 'feel' is a linking verb of internal emotional state requiring an adjective complement",
      "Because 'badly' is not an English word",
      "Because 'misunderstanding' is an adjective",
      "It is an informal mistake"
    ],
    correctAnswer: 0,
    answer: "Because 'feel' is a linking verb of internal emotional state requiring an adjective complement",
    explanation: "'I feel bad' describes emotional sorrow or regret (adjective complement). 'I feel badly' would literally mean having a defective physical sense of touch.",
    explanationBn: "'feel' এখানে মানসিক অবস্থা প্রকাশক Linking Verb, তাই Adjective 'bad' বসবে; 'badly' লিখলে স্পর্শশক্তির ত্রুটি বুঝাবে।",
    hint: "Feel is a linking verb describing an emotional state.",
    level: "advanced"
  },
  {
    id: 24,
    question: "Which of the following is an Adverb of Degree?",
    options: ["Extremely", "Yesterday", "Outside", "Carefully"],
    correctAnswer: 0,
    answer: "Extremely",
    explanation: "'Extremely' tells the intensity or degree of a quality or action, making it an Adverb of Degree.",
    explanationBn: "'Extremely' (অত্যন্ত/চরমভাবে) কাজের বা গুণের তীব্রতা ও মাত্রা প্রকাশ করে Adverb of Degree হিসেবে কাজ করে।",
    hint: "Indicates intensity or extent.",
    level: "basic"
  },
  {
    id: 25,
    question: "What is the key takeaway for Bengali learners regarding Adjectives and Adverbs?",
    options: [
      "Always check what word is being modified: if it is a Noun/Pronoun, use an Adjective; if it is a Verb, Adjective, or Adverb, use an Adverb; and beware of '-ly' adjective traps (friendly, lovely)",
      "Never use adverbs in English",
      "Adjectives and adverbs are always interchangeable",
      "Adverbs can only be placed at the start of a sentence"
    ],
    correctAnswer: 0,
    answer: "Always check what word is being modified: if it is a Noun/Pronoun, use an Adjective; if it is a Verb, Adjective, or Adverb, use an Adverb; and beware of '-ly' adjective traps (friendly, lovely)",
    explanation: "Identifying the target word being modified and remembering flat adverbs and '-ly' adjective exceptions is the core of modifier mastery.",
    explanationBn: "কাকে qualify/modify করা হচ্ছে তা চিহ্নিত করাই প্রধান: Noun-কে করলে Adjective, আর Verb/Adj/Adv-কে করলে Adverb; সাথে '-ly' যুক্ত Adjective-এর ফাঁদ সম্পর্কে সতর্ক থাকতে হবে।",
    hint: "Match the modifier type to the target word.",
    level: "basic"
  }
];

export default questions;
