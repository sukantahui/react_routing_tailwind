// topic0_questions.js
// Module 001_001: Words & The Eight Parts of Speech Overview
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "Which of the following belongs strictly to the 'Closed Class' of words in English grammar?",
    options: [
      "Noun",
      "Preposition",
      "Adjective",
      "Verb"
    ],
    correctAnswer: 1,
    explanation: "Prepositions belong to the Closed Class of words because languages rarely coin new prepositions. In contrast, Nouns, Verbs, and Adjectives belong to Open Classes where new words are continually invented (e.g., 'to google', 'selfie').",
    explanationBn: "Preposition হলো Closed Class word, কারণ নতুন Preposition সচরাচর তৈরি হয় না। অন্যদিকে Noun, Verb এবং Adjective হলো Open Class words, যেখানে নিয়মিত নতুন নতুন শব্দ যুক্ত হতে থাকে।"
  },
  {
    id: 2,
    question: "In the sentence 'She gave him water to drink, but he wanted to water the garden', what are the parts of speech of the two instances of 'water' respectively?",
    options: [
      "Noun and Adjective",
      "Noun and Verb",
      "Verb and Noun",
      "Adjective and Verb"
    ],
    correctAnswer: 1,
    explanation: "The first 'water' functions as a Direct Object noun (substance), while 'to water' is an infinitive Verb expressing an action (irrigating the garden). A word's part of speech is determined entirely by its syntactic function in context.",
    explanationBn: "প্রথম 'water' শব্দটি Direct Object হিসেবে Noun এবং দ্বিতীয় 'to water' Infinitive Verb হিসেবে কাজ করছে। English Grammar-এ কোনো শব্দের Part of Speech তার বাহ্যিক রূপ নয়, বরং বাক্যের Syntactic Function দ্বারা নির্ধারিত হয়।"
  },
  {
    id: 3,
    question: "Identify the part of speech of 'fast' in the sentence: 'Muslims observe a fast during Ramadan.'",
    options: [
      "Adverb",
      "Adjective",
      "Noun",
      "Verb"
    ],
    correctAnswer: 2,
    explanation: "In this context, 'fast' is preceded by the indefinite article 'a' and functions as the direct object of 'observe', meaning a period of abstaining from food. Hence, it is a Noun.",
    explanationBn: "এখানে 'fast'-এর আগে Indefinite Article 'a' বসেছে এবং এটি 'observe' Verb-এর Direct Object হিসেবে Noun (উপবাস) রূপে ব্যবহৃত হয়েছে।"
  },
  {
    id: 4,
    question: "Identify the part of speech of 'fast' in: 'He ran very fast to catch the Barrackpore local.'",
    options: [
      "Adjective",
      "Adverb",
      "Noun",
      "Verb"
    ],
    correctAnswer: 1,
    explanation: "'Fast' modifies the action verb 'ran' (answering 'How did he run?'). Therefore, it is an Adverb of Manner. Note: 'Fastly' does not exist in standard English.",
    explanationBn: "'Fast' শব্দটি 'ran' Action Verb-কে modify করছে (কীভাবে দৌড়েছিল?), তাই এটি Adverb of Manner। মনে রাখতে হবে, ইংরেজিতে 'Fastly' বলে কোনো শব্দ নেই।"
  },
  {
    id: 5,
    question: "In the sentence 'This is a fast train to Howrah', what part of speech is 'fast'?",
    options: [
      "Adverb",
      "Noun",
      "Adjective",
      "Conjunction"
    ],
    correctAnswer: 2,
    explanation: "Here 'fast' directly describes and qualifies the noun 'train' (answering 'What kind of train?'). Therefore, it is an Adjective used attributively.",
    explanationBn: "এখানে 'fast' শব্দটি 'train' Noun-কে qualify করছে (কেমন ট্রেন?), তাই এটি Attributive Adjective হিসেবে ব্যবহৃত হয়েছে।"
  },
  {
    id: 6,
    question: "Which of the following words ending in '-ly' is an ADJECTIVE, not an adverb?",
    options: [
      "Quickly",
      "Friendly",
      "Carefully",
      "Silently"
    ],
    correctAnswer: 1,
    explanation: "Adding '-ly' to a noun creates an adjective (Friend + ly = Friendly; Love + ly = Lovely; Brother + ly = Brotherly). Adding '-ly' to an adjective creates an adverb (Quick + ly = Quickly).",
    explanationBn: "Noun-এর সাথে '-ly' যোগ করলে Adjective তৈরি হয় (Friend + ly = Friendly, Love + ly = Lovely)। কিন্তু Adjective-এর সাথে '-ly' যোগ করলে Adverb তৈরি হয় (Quick + ly = Quickly)।"
  },
  {
    id: 7,
    question: "In the sentence 'All but John attended the lecture at Shyamnagar center', what part of speech is 'but'?",
    options: [
      "Coordinating Conjunction",
      "Preposition",
      "Adverb",
      "Relative Pronoun"
    ],
    correctAnswer: 1,
    explanation: "Here 'but' means 'except' and links the noun 'John' with 'All'. When 'but' means 'except', it functions as a Preposition.",
    explanationBn: "এখানে 'but' শব্দটি 'except' (ব্যতীত) অর্থে ব্যবহৃত হয়ে Preposition-এর ভূমিকা পালন করছে ('John ছাড়া সবাই উপস্থিত ছিল')।"
  },
  {
    id: 8,
    question: "In the sentence 'He worked hard, but he failed to secure the first rank', what is the function of 'but'?",
    options: [
      "Preposition",
      "Coordinating Conjunction",
      "Adverb",
      "Interjection"
    ],
    correctAnswer: 1,
    explanation: "Here 'but' connects two independent clauses ('He worked hard' and 'he failed to secure the first rank') expressing contrast. It is a Coordinating Conjunction (one of the FANBOYS).",
    explanationBn: "এখানে 'but' দুটি Independent Clauses-কে যুক্ত করে বিপরীত ভাব প্রকাশ করছে, তাই এটি Coordinating Conjunction (FANBOYS-এর অন্তর্ভুক্ত)।"
  },
  {
    id: 9,
    question: "What is the part of speech of 'round' in: 'The earth moves round the sun'?",
    options: [
      "Adjective",
      "Preposition",
      "Noun",
      "Adverb"
    ],
    correctAnswer: 1,
    explanation: "'Round' is followed by the nominal object 'the sun' and indicates spatial path and relation. Hence, it functions as a Preposition.",
    explanationBn: "'Round'-এর পর Nominal Object 'the sun' রয়েছে এবং এটি স্থানিক সম্পর্ক বোঝাচ্ছে, তাই এটি Preposition হিসেবে কাজ করছে।"
  },
  {
    id: 10,
    question: "What is the part of speech of 'round' in: 'The doctor completed his daily ward round'?",
    options: [
      "Noun",
      "Verb",
      "Adjective",
      "Preposition"
    ],
    correctAnswer: 0,
    explanation: "'Round' is preceded by the possessive adjective 'his' and attributive adjective 'daily', serving as the direct object of 'completed'. It is therefore a Noun.",
    explanationBn: "'Round' শব্দটি 'completed' Verb-এর Direct Object হিসেবে ব্যবহৃত হয়েছে এবং এর পূর্বে 'daily' Adjective রয়েছে, তাই এটি Noun।"
  },
  {
    id: 11,
    question: "Which of the eight parts of speech is grammatically independent of the syntactic structure of the sentence?",
    options: [
      "Conjunction",
      "Interjection",
      "Preposition",
      "Adverb"
    ],
    correctAnswer: 1,
    explanation: "Interjections (e.g., 'Alas!', 'Hurrah!', 'Ouch!') express sudden emotional outbursts and have no syntactic or grammatical dependency on the rest of the sentence elements.",
    explanationBn: "Interjection (যেমন: 'Alas!', 'Hurrah!') আকস্মিক আবেগ বা অনুভূতি প্রকাশ করে এবং Sentence-এর অন্যান্য ব্যাকরণিক পদের সাথে কোনো কাঠামোগত নির্ভরতা ছাড়াই স্বাধীনভাবে বসে।"
  },
  {
    id: 12,
    question: "In the sentence 'She lives on the floor above', what part of speech is 'above'?",
    options: [
      "Preposition",
      "Adverb",
      "Adjective",
      "Noun"
    ],
    correctAnswer: 1,
    explanation: "'Above' has no following nominal object here; it post-modifies the verb phrase/location indicating 'where'. It functions as an Adverb of Place.",
    explanationBn: "এখানে 'above'-এর পরে কোনো Noun Object নেই; এটি স্থান নির্দেশ করে 'where' প্রশ্নের উত্তর দিচ্ছে, তাই এটি Adverb of Place।"
  },
  {
    id: 13,
    question: "In the sentence 'The birds flew above the clouds', what part of speech is 'above'?",
    options: [
      "Adverb",
      "Preposition",
      "Adjective",
      "Conjunction"
    ],
    correctAnswer: 1,
    explanation: "Here 'above' is followed by the noun phrase 'the clouds' acting as its prepositional object. Hence, 'above' is a Preposition.",
    explanationBn: "এখানে 'above'-এর পরে 'the clouds' Noun Phrase-টি Prepositional Object হিসেবে রয়েছে, তাই 'above' এখানে Preposition।"
  },
  {
    id: 14,
    question: "Which part of speech can modify a Verb, an Adjective, or another Adverb?",
    options: [
      "Noun",
      "Adjective",
      "Adverb",
      "Conjunction"
    ],
    correctAnswer: 2,
    explanation: "An Adverb possesses the unique capability to modify: (1) Verbs ('drives slowly'), (2) Adjectives ('extremely fast'), and (3) other Adverbs ('runs very slowly').",
    explanationBn: "Adverb একমাত্র পদ যা একই সাথে: (১) Verb ('drives slowly'), (২) Adjective ('extremely fast'), এবং (৩) অপর একটি Adverb-কে ('runs very slowly') modify করতে পারে।"
  },
  {
    id: 15,
    question: "In the sentence 'Look before you leap', what is the grammatical category of 'before'?",
    options: [
      "Preposition",
      "Subordinating Conjunction",
      "Adverb",
      "Adjective"
    ],
    correctAnswer: 1,
    explanation: "'Before' connects the main clause ('Look') to the subordinate temporal clause ('you leap') containing a subject and a finite verb. Therefore, it is a Subordinating Conjunction.",
    explanationBn: "'Before' এখানে 'Look' Principal Clause এবং 'you leap' Subordinate Clause-কে যুক্ত করেছে (যেখানে Subject ও Finite Verb রয়েছে), তাই এটি Subordinating Conjunction।"
  },
  {
    id: 16,
    question: "In the sentence 'He stood before the judge in the Barrackpore court', what is 'before'?",
    options: [
      "Conjunction",
      "Preposition",
      "Adverb",
      "Noun"
    ],
    correctAnswer: 1,
    explanation: "'Before' is followed by the noun phrase 'the judge' (its object), signifying physical presence/location ('in front of'). It functions as a Preposition.",
    explanationBn: "এখানে 'before'-এর পরে 'the judge' Noun Object রয়েছে এবং এটি 'কার সামনে' তা বোঝাচ্ছে, তাই এটি Preposition।"
  },
  {
    id: 17,
    question: "In the sentence 'I have seen him before', what part of speech is 'before'?",
    options: [
      "Preposition",
      "Conjunction",
      "Adverb of Time",
      "Adjective"
    ],
    correctAnswer: 2,
    explanation: "'Before' stands alone at the end of the clause without an object or subordinate clause, indicating previous time ('formerly'). Thus, it is an Adverb of Time.",
    explanationBn: "'Before'-এর পরে কোনো Object বা Subordinate Clause নেই; এটি অতীতে কোনো সময়কে ('পূর্বে') বোঝাচ্ছে, তাই এটি Adverb of Time।"
  },
  {
    id: 18,
    question: "Identify the part of speech of 'like' in: 'She sings like an angel.'",
    options: [
      "Verb",
      "Preposition",
      "Adjective",
      "Conjunction"
    ],
    correctAnswer: 1,
    explanation: "In formal standard English, 'like' followed by a noun phrase ('an angel') expressing comparison of manner functions as a Preposition.",
    explanationBn: "Standard English-এ 'like'-এর পর যখন Noun Phrase ('an angel') বসে তুলনা প্রকাশ করে, তখন তা Preposition হিসেবে কাজ করে।"
  },
  {
    id: 19,
    question: "Identify the part of speech of 'like' in: 'Children like ice cream.'",
    options: [
      "Preposition",
      "Transitive Verb",
      "Adverb",
      "Noun"
    ],
    correctAnswer: 1,
    explanation: "'Like' expresses the action/preference of the subject 'Children' taking the direct object 'ice cream'. It is a Transitive Verb.",
    explanationBn: "'Like' শব্দটি 'Children' Subject-এর পছন্দ প্রকাশ করছে এবং এর Direct Object হলো 'ice cream', তাই এটি Transitive Verb।"
  },
  {
    id: 20,
    question: "In the sentence 'The up train will arrive on platform number 2', what is 'up'?",
    options: [
      "Preposition",
      "Adverb",
      "Adjective",
      "Noun"
    ],
    correctAnswer: 2,
    explanation: "'Up' is positioned directly before the noun 'train' to qualify its direction/type. It is functioning as an Adjective.",
    explanationBn: "'Up' শব্দটি 'train' Noun-এর ঠিক পূর্বে বসে ট্রেনের অভিমুখ ও প্রকার বোঝাচ্ছে, তাই এটি Adjective হিসেবে কাজ করছে।"
  },
  {
    id: 21,
    question: "In the sentence 'He climbed up the ladder', what part of speech is 'up'?",
    options: [
      "Adjective",
      "Preposition",
      "Adverb",
      "Verb"
    ],
    correctAnswer: 1,
    explanation: "'Up' is followed by the object 'the ladder' to denote directional movement. It is a Preposition.",
    explanationBn: "'Up'-এর পর 'the ladder' Object বসেছে এবং এটি আরোহণের দিক নির্দেশ করছে, তাই এটি Preposition।"
  },
  {
    id: 22,
    question: "In the sentence 'Prices went up rapidly', what part of speech is 'up'?",
    options: [
      "Preposition",
      "Adverb",
      "Adjective",
      "Noun"
    ],
    correctAnswer: 1,
    explanation: "'Up' modifies the verb 'went' without governing any noun object, indicating direction of motion. It is an Adverb (or adverbial particle).",
    explanationBn: "'Up' শব্দটি 'went' Verb-এর গতি নির্দেশ করছে এবং এর পরে কোনো Object নেই, তাই এটি Adverb।"
  },
  {
    id: 23,
    question: "In the sentence 'Every student must submit their assignment', what is 'Every'?",
    options: [
      "Pronoun",
      "Distributive Determiner / Adjective",
      "Adverb",
      "Conjunction"
    ],
    correctAnswer: 1,
    explanation: "'Every' directly modifies the singular countable noun 'student', functioning as a Distributive Determiner (traditionally classed as a Distributive Adjective).",
    explanationBn: "'Every' শব্দটি 'student' Singular Countable Noun-কে নির্দেশ করছে, তাই এটি Distributive Determiner / Adjective।"
  },
  {
    id: 24,
    question: "Why can't an English sentence be formed without a Finite Verb, unlike Bengali?",
    options: [
      "Because English has no pronouns",
      "Because English syntax requires an overt Predicate nucleus (Finite Verb / Copula) to establish tense, mood, and person",
      "Because English words are always longer",
      "Because English only allows transitive actions"
    ],
    correctAnswer: 1,
    explanation: "Bengali allows zero-copula constructions (e.g., 'তিনি ডাক্তার'), but English requires an overt finite verb ('He IS a doctor') to anchor the clause in tense, person, and grammatical validity.",
    explanationBn: "বাংলায় প্রকাশ্য Verb ছাড়াও বাক্য গঠিত হতে পারে (যেমন: 'তিনি ডাক্তার'), কিন্তু English Syntax-এ Tense, Person ও Mood প্রতিষ্ঠা করতে Finite Linking Verb ('is/are/am') থাকা বাধ্যতামূলক।"
  },
  {
    id: 25,
    question: "In the sentence 'Well, I never expected such a well-crafted solution', what are the two 'well's respectively?",
    options: [
      "Adverb and Adjective",
      "Interjection and Adverb",
      "Noun and Adjective",
      "Conjunction and Adverb"
    ],
    correctAnswer: 1,
    explanation: "The initial 'Well,' is an introductory Interjection expressing surprise/hesitation, while in 'well-crafted', 'well' is an Adverb modifying the participle adjective 'crafted'.",
    explanationBn: "বাক্যের শুরুতে থাকা 'Well,' হলো বিস্ময়বোধক Interjection এবং 'well-crafted'-এর 'well' হলো Adverb যা 'crafted' Participial Adjective-কে modify করছে।"
  }
];

export default questions;
