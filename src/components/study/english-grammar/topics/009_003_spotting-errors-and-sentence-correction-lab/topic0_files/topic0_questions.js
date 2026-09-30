export const topic0Questions = [
  {
    id: 1,
    category: "Subject-Verb Concord",
    question: "Identify the erroneous part in the sentence: 'Neither the principal (A) / nor the lecturers (B) / was present at (C) / the annual convocation. (D)'",
    options: {
      A: "Part A (Neither the principal)",
      B: "Part B (nor the lecturers)",
      C: "Part C (was present at)",
      D: "Part D (the annual convocation)"
    },
    correctAnswer: "C",
    explanation: "Under the Proximity Rule with 'neither...nor', when subjects differ in number, the verb agrees with the closer subject ('the lecturers' - plural). Therefore, 'was present' must be corrected to 'were present'.",
    explanationBn: "'Neither...nor' দিয়ে দুটি ভিন্ন বচনের Subject যুক্ত হলে verb তার নিকটতম Subject অনুসারে নির্ধারিত হয়। এখানে নিকটতম Subject হলো বহুবচন 'lecturers', তাই 'was'-এর পরিবর্তে 'were' হবে।"
  },
  {
    id: 2,
    category: "Tense Sequence & Time Markers",
    question: "Find the error: 'The train had left (A) / the station before (B) / I have reached (C) / the platform. (D)'",
    options: {
      A: "Part A (The train had left)",
      B: "Part B (the station before)",
      C: "Part C (I have reached)",
      D: "Part D (the platform)"
    },
    correctAnswer: "C",
    explanation: "In a past narrative showing two sequential actions connected by 'before', the earlier action takes Past Perfect (had left) and the subsequent action takes Simple Past (reached), never Present Perfect (have reached).",
    explanationBn: "অতীতের দুটি কাজের মধ্যে পূর্বে ঘটিত কাজের জন্য Past Perfect (had left) এবং পরের কাজের জন্য Simple Past বসে। তাই 'have reached'-এর জায়গায় 'reached' হবে।"
  },
  {
    id: 3,
    category: "Dangling Modifiers",
    question: "Identify the grammatically flawed sentence:",
    options: {
      A: "Walking briskly in the morning, a heavy branch fell on his shoulder.",
      B: "While he was walking briskly in the morning, a heavy branch fell on his shoulder.",
      C: "Walking briskly in the morning, he was struck by a falling branch.",
      D: "As he walked briskly in the morning, a heavy branch struck him."
    },
    correctAnswer: "A",
    explanation: "In option A, the participial phrase 'Walking briskly...' illogically modifies 'a heavy branch' (dangling participle), suggesting the branch was walking.",
    explanationBn: "Option A-তে Dangling Modifier রয়েছে। 'Walking briskly...' দিয়ে বাক্য শুরু করায় মনে হচ্ছে গাছের ডালটি নিজে হাঁটছিল। Option B, C ও D ব্যাকরণগতভাবে সঠিক।"
  },
  {
    id: 4,
    category: "Indian English & Redundancy",
    question: "Which of the following contains a redundancy / pleonasm error?",
    options: {
      A: "Please repeat that sentence again.",
      B: "The company will revert tomorrow.",
      C: "Let us discuss the merits of the proposal.",
      D: "He returned from Delhi yesterday."
    },
    correctAnswer: "A",
    explanation: "'Repeat' already signifies 'to say again'; pairing 'repeat' with 'again' creates a pleonastic redundancy. It should be 'Please repeat that sentence' or 'Please say that sentence again'.",
    explanationBn: "'Repeat' শব্দের অর্থই হলো পুনরায় বলা। তাই এর সাথে আবার 'again' যোগ করা একটি দ্বিরুক্তি বা Redundancy ভুল।"
  },
  {
    id: 5,
    category: "Prepositional Collocations",
    question: "Find the erroneous segment: 'Despite of having (A) / substantial financial backing, (B) / the startup failed (C) / to capture market share. (D)'",
    options: {
      A: "Part A (Despite of having)",
      B: "Part B (substantial financial backing)",
      C: "Part C (the startup failed)",
      D: "Part D (to capture market share)"
    },
    correctAnswer: "A",
    explanation: "'Despite' is a preposition that never takes 'of'. The correct form is 'Despite having' or 'In spite of having'.",
    explanationBn: "'Despite'-এর পরে কখনোই 'of' বসে না ('Despite having')। 'In spite'-এর পরেই কেবল 'of' বসে ('In spite of having')।"
  },
  {
    id: 6,
    category: "Pronoun Case Harmony",
    question: "Spot the error: 'Between you and I, (A) / the executive decision (B) / was completely biased (C) / against the junior staff. (D)'",
    options: {
      A: "Part A (Between you and I)",
      B: "Part B (the executive decision)",
      C: "Part C (was completely biased)",
      D: "Part D (against the junior staff)"
    },
    correctAnswer: "A",
    explanation: "Prepositions ('between') govern the objective case. Therefore, 'between you and I' is incorrect and must be 'between you and me'.",
    explanationBn: "Preposition-এর পর Pronoun সর্বদা Objective Case-এ বসে। 'Between' একটি Preposition, তাই 'you and I'-এর জায়গায় 'you and me' হবে।"
  },
  {
    id: 7,
    category: "Parallelism",
    question: "Which sentence violates syntactic parallelism?",
    options: {
      A: "She enjoys swimming, hiking, and playing tennis.",
      B: "She likes to swim, to hike, and to play tennis.",
      C: "She enjoys swimming, to hike, and tennis.",
      D: "She likes swimming, hiking, and tennis."
    },
    correctAnswer: "C",
    explanation: "Option C mixes gerunds ('swimming'), infinitives ('to hike'), and nouns ('tennis') in a coordinating list, destroying parallelism.",
    explanationBn: "Option C-তে সমান্তরাল গঠন (Parallelism) বজায় নেই। একটি Gerund (swimming), একটি Infinitive (to hike) এবং একটি Noun (tennis) একসাথে যুক্ত করা ব্যাকরণবিরুদ্ধ।"
  },
  {
    id: 8,
    category: "Conditional Invariants",
    question: "Identify the error: 'If he would have worked hard, (A) / he would have passed (B) / the civil services examination (C) / with flying colours. (D)'",
    options: {
      A: "Part A (If he would have worked hard)",
      B: "Part B (he would have passed)",
      C: "Part C (the civil services examination)",
      D: "Part D (with flying colours)"
    },
    correctAnswer: "A",
    explanation: "In a Third Conditional sentence, the subordinate 'if-clause' requires the Past Perfect ('If he had worked hard'), never modal 'would have'.",
    explanationBn: "Third Conditional বাক্যের 'If-clause'-এ কখনো 'would have' বসে না; সেখানে Past Perfect (had + V3) বসে ('If he had worked hard')।"
  },
  {
    id: 9,
    category: "Uncountable Noun Invariants",
    question: "Find the error: 'He provided me (A) / with many valuable informations (B) / regarding the upcoming (C) / corporate audit. (D)'",
    options: {
      A: "Part A (He provided me)",
      B: "Part B (with many valuable informations)",
      C: "Part C (regarding the upcoming)",
      D: "Part D (corporate audit)"
    },
    correctAnswer: "B",
    explanation: "'Information' is an uncountable mass noun that has no plural form (*informations) and cannot be modified by 'many'. It should be 'much valuable information' or 'many pieces of valuable information'.",
    explanationBn: "'Information' একটি Uncountable Noun। এর বহুবচন (informations) হয় না এবং এর পূর্বে 'many' বসে না। সঠিক রূপ: 'much valuable information' বা 'many pieces of information'।"
  },
  {
    id: 10,
    category: "Adverb Inversion",
    question: "Spot the mistake: 'Scarcely had the speaker finished (A) / his lecture when (B) / the audience did not applaud (C) / with great enthusiasm. (D)'",
    options: {
      A: "Part A (Scarcely had the speaker finished)",
      B: "Part B (his lecture when)",
      C: "Part C (the audience did not applaud)",
      D: "Part D (with great enthusiasm)"
    },
    correctAnswer: "C",
    explanation: "'Scarcely...when' introduces an affirmative outcome triggered by the initial event. Inserting 'did not' introduces a double-negative semantic clash. It should be 'the audience applauded'.",
    explanationBn: "'Scarcely...when' বাক্য গঠনে 'when' এর পরের ক্লজটি সাধারণত সদর্থক (affirmative) হয়। 'did not applaud' দ্বৈত-নেতিবাচক বিভ্রান্তি সৃষ্টি করেছে।"
  },
  {
    id: 11,
    category: "Correlative Conjunctions",
    question: "Find the error: 'He not only lost (A) / his ticket (B) / but also his passport (C) / at the terminal. (D)'",
    options: {
      A: "Part A (He not only lost)",
      B: "Part B (his ticket)",
      C: "Part C (but also his passport)",
      D: "Part D (at the terminal)"
    },
    correctAnswer: "A",
    explanation: "Correlative pairs ('not only...but also') must balance identical grammatical structures. Since 'but also' precedes the noun 'his passport', 'not only' must immediately precede 'his ticket' ('He lost not only his ticket but also his passport').",
    explanationBn: "Correlative Conjunction (not only...but also) একই জাতীয় পদের আগে বসতে হয়। 'but also'-এর পরে noun phrase (his passport) রয়েছে, তাই 'not only'-কেও 'his ticket'-এর ঠিক আগে বসাতে হবে ('He lost not only his ticket...')।"
  },
  {
    id: 12,
    category: "Adjective vs Adverb",
    question: "Spot the error: 'Although the dish smelled deliciously, (A) / the food critic refused (B) / to award the restaurant (C) / a five-star rating. (D)'",
    options: {
      A: "Part A (dish smelled deliciously)",
      B: "Part B (the food critic refused)",
      C: "Part C (to award the restaurant)",
      D: "Part D (a five-star rating)"
    },
    correctAnswer: "A",
    explanation: "The sensory linking verb 'smell' describes the state of the subject ('dish') and must be followed by a predicate adjective ('delicious'), not an adverb of manner ('deliciously').",
    explanationBn: "'Smell' একটি Sensory Linking Verb। তাই এর পর Adverb (deliciously) না বসে Adjective (delicious) বসবে।"
  },
  {
    id: 13,
    category: "Hyphenated Compound Modifiers",
    question: "Find the error: 'The company issued (A) / a ten-years-old policy (B) / to all its senior employees (C) / without verification. (D)'",
    options: {
      A: "Part A (The company issued)",
      B: "Part B (a ten-years-old policy)",
      C: "Part C (to all its senior employees)",
      D: "Part D (without verification)"
    },
    correctAnswer: "B",
    explanation: "When a measurement compound functions prenominally as an adjective before a noun ('policy'), the noun inside the compound must remain singular ('a ten-year-old policy').",
    explanationBn: "Noun-এর আগে Adjective হিসেবে ব্যবহৃত Compound শব্দে পরিমাপসূচক Noun সর্বদা একবচনে থাকে ('ten-year-old policy', 'ten-years-old' নয়)।"
  },
  {
    id: 14,
    category: "Indian English Common Traps",
    question: "Which of the following phrases represents non-standard Indian English colloquy?",
    options: {
      A: "He passed out of university in 2020.",
      B: "He graduated from university in 2020.",
      C: "He completed his degree in 2020.",
      D: "He earned his diploma in 2020."
    },
    correctAnswer: "A",
    explanation: "In standard English, 'pass out' means to lose consciousness (faint). To complete university, the standard phrase is 'graduated from' or 'passed examinations'.",
    explanationBn: "Standard English-এ 'pass out' মানে অজ্ঞান হয়ে যাওয়া (faint)। কলেজ বা বিশ্ববিদ্যালয় থেকে উত্তীর্ণ হওয়ার ক্ষেত্রে 'graduated from' ব্যবহার করতে হয়।"
  },
  {
    id: 15,
    category: "Comparatives & Superlatives",
    question: "Spot the error: 'Mount Everest is higher (A) / than any mountain (B) / in the world. (C) / No error (D)'",
    options: {
      A: "Part A (Mount Everest is higher)",
      B: "Part B (than any mountain)",
      C: "Part C (in the world)",
      D: "Part D (No error)"
    },
    correctAnswer: "B",
    explanation: "When comparing a member with its own class using a comparative degree, 'other' must be included to exclude the subject itself ('than any other mountain'). Otherwise, Everest is illogically claimed to be higher than itself.",
    explanationBn: "একই শ্রেণীর জিনিসের মধ্যে Comparative Degree-তে তুলনা করার সময় Subject নিজেকে বাদ দিতে 'any other' ব্যবহার আবশ্যক। তাই 'than any other mountain' হবে।"
  },
  {
    id: 16,
    category: "Stative Verb Continuous Trap",
    question: "Find the error: 'She is having (A) / three luxurious apartments (B) / in the heart (C) / of the metropolitan city. (D)'",
    options: {
      A: "Part A (She is having)",
      B: "Part B (three luxurious apartments)",
      C: "Part C (in the heart)",
      D: "Part D (of the metropolitan city)"
    },
    correctAnswer: "A",
    explanation: "'Have' denoting ownership/possession is a stative verb and cannot be used in continuous tenses. It should be 'She has three luxurious apartments'.",
    explanationBn: "মালিকানা বা অধিকার বোঝাতে 'have' একটি Stative Verb। তাই 'She is having'-এর পরিবর্তে 'She has' হবে।"
  },
  {
    id: 17,
    category: "Subject-Verb Concord (Collective Noun)",
    question: "Identify the error: 'The jury were unanimous (A) / in its decision (B) / regarding the guilt (C) / of the accused defendant. (D)'",
    options: {
      A: "Part A (The jury were unanimous)",
      B: "Part B (in its decision)",
      C: "Part C (regarding the guilt)",
      D: "Part D (of the accused defendant)"
    },
    correctAnswer: "A",
    explanation: "When a collective noun acts as a single unified body ('unanimous in its decision'), it takes a singular verb ('was unanimous') and singular pronoun ('its').",
    explanationBn: "Collective Noun যখন ঐক্যবদ্ধ সিদ্ধান্ত নেয় (unanimous), তখন তা একবচন হিসেবে গণ্য হয় এবং Singular Verb ('was') গ্রহণ করে।"
  },
  {
    id: 18,
    category: "Question Tags",
    question: "Identify the correct question tag: 'She rarely speaks ill of anyone, _____?'",
    options: {
      A: "doesn't she?",
      B: "does she?",
      C: "isn't she?",
      D: "did she?"
    },
    correctAnswer: "B",
    explanation: "Semi-negative adverbs ('rarely', 'scarcely', 'seldom', 'hardly') make the statement negative, requiring a positive question tag ('does she?').",
    explanationBn: "'Rarely', 'seldom', 'hardly' বাক্যটিকে অর্থগতভাবে নেতিবাচক (negative) করে দেয়, তাই এর Question Tag সর্বদা ইতিবাচক (positive: 'does she?') হবে।"
  },
  {
    id: 19,
    category: "Prepositional Superfluity",
    question: "Find the error: 'The police ordered (A) / to investigate into (B) / the sudden disappearance (C) / of the classified files. (D)'",
    options: {
      A: "Part A (The police ordered)",
      B: "Part B (to investigate into)",
      C: "Part C (the sudden disappearance)",
      D: "Part D (of the classified files)"
    },
    correctAnswer: "B",
    explanation: "'Investigate' is a transitive verb that directly takes an object without a preposition (*investigate into). It should be 'to investigate the sudden disappearance' (or 'to inquire into').",
    explanationBn: "'Investigate' একটি Transitive Verb, যার পর সরাসরি Object বসে, কোনো Preposition ('into') বসে না। তবে 'inquire into' সঠিক।"
  },
  {
    id: 20,
    category: "Pronoun Antecedent Agreement",
    question: "Spot the mistake: 'Each of the candidates (A) / submitted their credentials (B) / before the deadline (C) / expired yesterday. (D)'",
    options: {
      A: "Part A (Each of the candidates)",
      B: "Part B (submitted their credentials)",
      C: "Part C (before the deadline)",
      D: "Part D (expired yesterday)"
    },
    correctAnswer: "B",
    explanation: "The indefinite distributive pronoun 'Each' is grammatically singular, requiring the singular possessive pronoun 'his' or 'his or her' in formal prescriptive grammar, not plural 'their'.",
    explanationBn: "প্রথাগত ব্যাকরণে 'Each' একবচন (singular), তাই এর পরিবর্তে 'his' বা 'his or her' বসে, বহুবচন 'their' ভুল।"
  },
  {
    id: 21,
    category: "Subjunctive Mood",
    question: "Identify the error: 'The board recommended (A) / that the manager resigns (B) / from his position (C) / with immediate effect. (D)'",
    options: {
      A: "Part A (The board recommended)",
      B: "Part B (that the manager resigns)",
      C: "Part C (from his position)",
      D: "Part D (with immediate effect)"
    },
    correctAnswer: "B",
    explanation: "Verbs of mandate and recommendation ('recommended that...') require the present subjunctive mood (base form bare infinitive 'resign'), not indicative 'resigns'.",
    explanationBn: "Mandate বা প্রস্তাবসূচক ক্রিয়ার (recommend that, demand that) পর Subjunctive Mood ব্যবহৃত হয় এবং ক্রিয়ার মূল রূপ (base form: 'resign') বসে, 'resigns' নয়।"
  },
  {
    id: 22,
    category: "Causative Verbs",
    question: "Find the error: 'The strict teacher (A) / made the naughty student (B) / to rewrite the essay (C) / five times. (D)'",
    options: {
      A: "Part A (The strict teacher)",
      B: "Part B (made the naughty student)",
      C: "Part C (to rewrite the essay)",
      D: "Part D (five times)"
    },
    correctAnswer: "C",
    explanation: "The active causative verb 'make' takes a bare infinitive without 'to'. Therefore, 'to rewrite' must be corrected to 'rewrite'.",
    explanationBn: "Active Causative Verb 'make'-এর পর Bare Infinitive (to ছাড়া verb) বসে। তাই 'to rewrite'-এর জায়গায় 'rewrite' হবে।"
  },
  {
    id: 23,
    category: "Gerund & Possessive Case",
    question: "Spot the error: 'My father objected (A) / to me spending (B) / excessive time (C) / on video games. (D)'",
    options: {
      A: "Part A (My father objected)",
      B: "Part B (to me spending)",
      C: "Part C (excessive time)",
      D: "Part D (on video games)"
    },
    correctAnswer: "B",
    explanation: "A noun or pronoun modifying a gerund ('spending') must be in the possessive case ('my spending'), not the objective case ('me spending').",
    explanationBn: "Gerund-এর পূর্বে বসা Pronoun সর্বদা Possessive Case-এ হয়। তাই 'me spending'-এর পরিবর্তে 'my spending' হবে।"
  },
  {
    id: 24,
    category: "Correlative Pairing",
    question: "Identify the flawed sentence:",
    options: {
      A: "Hardly had I entered the room than the lights went out.",
      B: "Hardly had I entered the room when the lights went out.",
      C: "No sooner had I entered the room than the lights went out.",
      D: "Scarcely had I entered the room when the lights went out."
    },
    correctAnswer: "A",
    explanation: "'Hardly' and 'Scarcely' must be paired with 'when' or 'before'. Pairing 'Hardly' with 'than' is a severe correlative conjunction error ('than' is paired exclusively with 'No sooner').",
    explanationBn: "'Hardly' ও 'Scarcely'-এর জোড়া হলো 'when'। শুধুমাত্র 'No sooner'-এর সাথেই 'than' বসে। তাই Option A ভুল।"
  },
  {
    id: 25,
    category: "Articles with Abstract Nouns",
    question: "Find the error: 'A honesty (A) / is considered to be (B) / the best policy (C) / in all situations. (D)'",
    options: {
      A: "Part A (A honesty)",
      B: "Part B (is considered to be)",
      C: "Part C (the best policy)",
      D: "Part D (in all situations)"
    },
    correctAnswer: "A",
    explanation: "Abstract nouns used in a general sense take no indefinite article ('Honesty is the best policy'). Moreover, if an article were ever used phonetically before 'h-silent' words, it would be 'an', never 'a'.",
    explanationBn: "সাধারণ অর্থে Abstract Noun-এর আগে কোনো Article বসে না। তাই 'A honesty'-এর পরিবর্তে শুধুই 'Honesty' বসবে।"
  },
  {
    id: 26,
    category: "Pluralia Tantum & Concord",
    question: "Spot the error: 'The scissors is (A) / kept in the top drawer (B) / beside the stationery box (C) / on the study table. (D)'",
    options: {
      A: "Part A (The scissors is)",
      B: "Part B (kept in the top drawer)",
      C: "Part C (beside the stationery box)",
      D: "Part D (on the study table)"
    },
    correctAnswer: "A",
    explanation: "'Scissors' is a pluralia tantum noun that takes a plural verb ('The scissors are...'). Only when preceded by 'A pair of' does it take a singular verb ('A pair of scissors is...').",
    explanationBn: "'Scissors' একটি Pluralia Tantum Noun (দ্বৈত অংশযুক্ত) এবং এর সাথে Plural Verb ('are') বসে। কেবল 'A pair of scissors' থাকলে 'is' হতো।"
  },
  {
    id: 27,
    category: "Conjunction Superfluity",
    question: "Find the error: 'Although he was injured, (A) / but he completed (B) / the entire marathon (C) / with great courage. (D)'",
    options: {
      A: "Part A (Although he was injured)",
      B: "Part B (but he completed)",
      C: "Part C (the entire marathon)",
      D: "Part D (with great courage)"
    },
    correctAnswer: "B",
    explanation: "Subordinating conjunction 'Although' introduces the concession clause; adding coordinating conjunction 'but' in the main clause creates a redundant, ungrammatical double conjunction. Remove 'but'.",
    explanationBn: "'Although' বা 'Though' দিয়ে বাক্য শুরু হলে মূল ক্লজে আবার 'but' ব্যবহার করা সম্পূর্ণ ভুল (দ্বৈত Conjunction ত্রুটি)।"
  },
  {
    id: 28,
    category: "Infinitive Split / Bare Infinitive",
    question: "Spot the error: 'The inspector made (A) / the driver to show (B) / his original vehicle license (C) / and insurance certificate. (D)'",
    options: {
      A: "Part A (The inspector made)",
      B: "Part B (the driver to show)",
      C: "Part C (his original vehicle license)",
      D: "Part D (and insurance certificate)"
    },
    correctAnswer: "B",
    explanation: "The causative verb 'made' requires a bare infinitive ('show'), not a to-infinitive ('to show').",
    explanationBn: "Causative verb 'make'-এর পরে 'to' ছাড়া Bare Infinitive বসে ('made the driver show')।"
  },
  {
    id: 29,
    category: "Tense Harmony (Since Clause)",
    question: "Find the error: 'Five years have passed (A) / since I have seen (B) / my childhood friend (C) / in our native town. (D)'",
    options: {
      A: "Part A (Five years have passed)",
      B: "Part B (since I have seen)",
      C: "Part C (my childhood friend)",
      D: "Part D (in our native town)"
    },
    correctAnswer: "B",
    explanation: "When 'since' functions as a conjunction of time following a Present Perfect clause, the clause following 'since' must be in the Simple Past ('since I saw'), never Present Perfect.",
    explanationBn: "'Since'-এর আগের ক্লজে Present Perfect থাকলে 'since'-এর পরের ক্লজে সর্বদা Simple Past (saw) বসে, 'have seen' নয়।"
  },
  {
    id: 30,
    category: "Preposition of Purpose",
    question: "Spot the error: 'He went to the library (A) / with a view to read (B) / rare historical manuscripts (C) / of the eighteenth century. (D)'",
    options: {
      A: "Part A (He went to the library)",
      B: "Part B (with a view to read)",
      C: "Part C (rare historical manuscripts)",
      D: "Part D (of the eighteenth century)"
    },
    correctAnswer: "B",
    explanation: "In the idiomatic prepositional phrase 'with a view to', 'to' is a true preposition requiring a gerund (V4: 'reading'), not a base infinitive ('read').",
    explanationBn: "'With a view to', 'look forward to', 'addicted to' ইত্যাদি phrase-এ 'to' একটি Preposition, যার পর সর্বদা Gerund (V1+ing: 'reading') বসে।"
  }
];
