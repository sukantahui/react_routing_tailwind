// topic8_questions.js
// Module 001_002: Sentence Anatomy
// Topic 8: The 7 Fundamental Sentence Patterns (SV, SVO, SVOO, SVC, SVOC, SVA, SVOA)
// 25 Comprehensive Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "How many canonical basic clause patterns govern all simple sentences in English grammar according to Quirk and Greenbaum?",
    options: ["7 Fundamental Sentence Patterns", "3 Patterns", "12 Patterns", "50 Patterns"],
    correctAnswer: 0,
    answer: "7 Fundamental Sentence Patterns",
    explanation: "Modern comprehensive English grammar classifies all simple clauses into 7 canonical patterns: SV, SVO, SVOO, SVC, SVOC, SVA, SVOA.",
    explanationBn: "আধুনিক ইংরেজি ব্যাকরণে সমস্ত সাধারণ বাক্যকে ৭টি প্রধান মৌলিক প্যাটার্নে (SV, SVO, SVOO, SVC, SVOC, SVA, SVOA) বিন্যস্ত করা হয়।",
    hint: "The 7 canonical clause patterns.",
    level: "basic"
  },
  {
    id: 2,
    question: "Classify the pattern of the sentence: 'The birds were singing melodiously.'",
    options: [
      "SV (Subject + Intransitive Verb; 'melodiously' is an optional adverbial)",
      "SVO",
      "SVC",
      "SVOO"
    ],
    correctAnswer: 0,
    answer: "SV (Subject + Intransitive Verb; 'melodiously' is an optional adverbial)",
    explanation: "Subject ('The birds') + Intransitive Verb ('were singing'). 'Melodiously' is an optional adverb of manner, not an obligatory structural complement.",
    explanationBn: "Subject ('The birds') + Verb ('were singing') — এটি মৌলিক SV প্যাটার্ন; 'melodiously' হলো ঐচ্ছিক Adverbial।",
    hint: "Subject + Intransitive verb.",
    level: "basic"
  },
  {
    id: 3,
    question: "Classify the pattern of the sentence: 'Swadeep designed a full-stack web application.'",
    options: [
      "SVO (Subject + Monotransitive Verb + Direct Object)",
      "SV",
      "SVC",
      "SVOC"
    ],
    correctAnswer: 0,
    answer: "SVO (Subject + Monotransitive Verb + Direct Object)",
    explanation: "Subject ('Swadeep') + Monotransitive Verb ('designed') + Direct Object ('a full-stack web application').",
    explanationBn: "Subject ('Swadeep') + Verb ('designed') + Direct Object ('a full-stack web application') — এটি SVO প্যাটার্ন।",
    hint: "Subject + Verb + Direct Object.",
    level: "basic"
  },
  {
    id: 4,
    question: "Classify the pattern of the sentence: 'Sukanta Sir gave the cohort a challenging assignment.'",
    options: [
      "SVOO (Subject + Ditransitive Verb + Indirect Object + Direct Object)",
      "SVOC",
      "SVO",
      "SVC"
    ],
    correctAnswer: 0,
    answer: "SVOO (Subject + Ditransitive Verb + Indirect Object + Direct Object)",
    explanation: "Subject ('Sukanta Sir') + Verb ('gave') + Indirect Object ('the cohort') + Direct Object ('a challenging assignment').",
    explanationBn: "Subject ('Sukanta Sir') + Verb ('gave') + IO ('the cohort') + DO ('a challenging assignment') — এটি SVOO প্যাটার্ন।",
    hint: "Subject + Verb + IO + DO.",
    level: "basic"
  },
  {
    id: 5,
    question: "Classify the pattern of the sentence: 'The seminar was extraordinarily insightful.'",
    options: [
      "SVC (Subject + Linking Verb + Subject Complement Adjective)",
      "SVO",
      "SVA",
      "SV"
    ],
    correctAnswer: 0,
    answer: "SVC (Subject + Linking Verb + Subject Complement Adjective)",
    explanation: "Subject ('The seminar') + Linking Verb ('was') + Subject Complement Adjective ('extraordinarily insightful').",
    explanationBn: "Subject ('The seminar') + Verb ('was') + Complement ('insightful') — এটি SVC প্যাটার্ন।",
    hint: "Subject + Copula + Adjective complement.",
    level: "basic"
  },
  {
    id: 6,
    question: "Classify the pattern of the sentence: 'The board elected Debangshu chairperson.'",
    options: [
      "SVOC (Subject + Complex-Transitive Verb + Direct Object + Object Complement)",
      "SVOO",
      "SVC",
      "SVOA"
    ],
    correctAnswer: 0,
    answer: "SVOC (Subject + Complex-Transitive Verb + Direct Object + Object Complement)",
    explanation: "Subject ('The board') + Verb ('elected') + Direct Object ('Debangshu') + Object Complement Noun ('chairperson'). (Debangshu = Chairperson).",
    explanationBn: "Subject ('The board') + Verb ('elected') + DO ('Debangshu') + OC ('chairperson') — এটি SVOC প্যাটার্ন।",
    hint: "Debangshu = Chairperson (SVOC).",
    level: "basic"
  },
  {
    id: 7,
    question: "What is the SVA pattern in sentence anatomy?",
    options: [
      "Subject + Verb + Obligatory Adverbial (e.g., 'The train is in the station' / 'The museum lies near the river')",
      "Subject + Verb + Adjective",
      "Subject + Verb + Article",
      "A sentence with no verb"
    ],
    correctAnswer: 0,
    answer: "Subject + Verb + Obligatory Adverbial (e.g., 'The train is in the station' / 'The museum lies near the river')",
    explanation: "In SVA, the adverbial is structurally obligatory; removing it renders the sentence ungrammatical (*'The train is'* or *'The museum lies'* are incomplete).",
    explanationBn: "SVA প্যাটার্নে Adverbial পদটি আবশ্যক (Obligatory); এটি বাদ দিলে বাক্যটি অসম্পূর্ণ থেকে যায় (যেমন: 'The train is in the station')।",
    hint: "Subject + Verb + Obligatory Adverbial.",
    level: "intermediate"
  },
  {
    id: 8,
    question: "What is the SVOA pattern in sentence anatomy?",
    options: [
      "Subject + Transitive Verb + Direct Object + Obligatory Adverbial (e.g., 'Swadeep placed the laptop on the table')",
      "Subject + Verb + Object + Adjective",
      "Subject + Verb + Indirect Object + Adverb",
      "A compound sentence"
    ],
    correctAnswer: 0,
    answer: "Subject + Transitive Verb + Direct Object + Obligatory Adverbial (e.g., 'Swadeep placed the laptop on the table')",
    explanation: "In SVOA, both the direct object and the spatial/directional adverbial are obligatory (*'Swadeep placed the laptop'* is ungrammatical without 'on the table').",
    explanationBn: "SVOA প্যাটার্নে Direct Object এবং Adverbial উভয়ই আবশ্যক (যেমন: 'Swadeep placed the laptop on the table')।",
    hint: "Put/place + object + location.",
    level: "intermediate"
  },
  {
    id: 9,
    question: "Which of the following sentences exhibits the SVA pattern with an obligatory locational adverbial?",
    options: [
      "My friend lives in Barrackpore.",
      "My friend visited Barrackpore.",
      "My friend is a resident.",
      "My friend invited me."
    ],
    correctAnswer: 0,
    answer: "My friend lives in Barrackpore.",
    explanation: "'Lives' requires an obligatory locational complement: 'My friend [S] lives [V] in Barrackpore [A]'.",
    explanationBn: "Subject ('My friend') + Verb ('lives') + Obligatory Adverbial ('in Barrackpore') — এটি SVA প্যাটার্ন।",
    hint: "Live + location.",
    level: "basic"
  },
  {
    id: 10,
    question: "Which of the following sentences exhibits the SVOA pattern with an obligatory directional/locational adverbial?",
    options: [
      "Tuhina put her mobile phone into her handbag.",
      "Tuhina called her friend.",
      "Tuhina gave her friend a call.",
      "Tuhina is a developer."
    ],
    correctAnswer: 0,
    answer: "Tuhina put her mobile phone into her handbag.",
    explanation: "Subject ('Tuhina') + Verb ('put') + Direct Object ('her mobile phone') + Obligatory Locational Adverbial ('into her handbag').",
    explanationBn: "Subject ('Tuhina') + Verb ('put') + DO ('her mobile phone') + Adverbial ('into her handbag') — এটি SVOA প্যাটার্ন।",
    hint: "Put + object + into...",
    level: "basic"
  },
  {
    id: 11,
    question: "Classify the pattern: 'The baby cried loudly all night.'",
    options: [
      "SV (with optional adverbials of manner 'loudly' and duration 'all night')",
      "SVO",
      "SVC",
      "SVA"
    ],
    correctAnswer: 0,
    answer: "SV (with optional adverbials of manner 'loudly' and duration 'all night')",
    explanation: "The core clause kernel is 'The baby cried' (SV). Adverbials of manner ('loudly') and duration ('all night') are adjuncts.",
    explanationBn: "মূল বাক্য হলো 'The baby [S] cried [V]'; 'loudly' ও 'all night' হলো ঐচ্ছিক Adjuncts। তাই এটি SV প্যাটার্ন।",
    hint: "The core kernel is Subject + Verb.",
    level: "basic"
  },
  {
    id: 12,
    question: "Classify the pattern: 'The mentor considers the solution optimal.'",
    options: [
      "SVOC (Solution = Optimal)",
      "SVOO",
      "SVO",
      "SVC"
    ],
    correctAnswer: 0,
    answer: "SVOC (Solution = Optimal)",
    explanation: "Subject ('The mentor') + Verb ('considers') + Direct Object ('the solution') + Object Complement Adjective ('optimal').",
    explanationBn: "Subject ('The mentor') + Verb ('considers') + DO ('the solution') + OC ('optimal') — এটি SVOC প্যাটার্ন।",
    hint: "Direct object = optimal.",
    level: "basic"
  },
  {
    id: 13,
    question: "Classify the pattern: 'Debangshu sent his mentor an email.'",
    options: [
      "SVOO",
      "SVOC",
      "SVO",
      "SVOA"
    ],
    correctAnswer: 0,
    answer: "SVOO",
    explanation: "Subject ('Debangshu') + Verb ('sent') + Indirect Object ('his mentor') + Direct Object ('an email').",
    explanationBn: "Subject ('Debangshu') + Verb ('sent') + IO ('his mentor') + DO ('an email') — এটি SVOO প্যাটার্ন।",
    hint: "Sent + IO + DO.",
    level: "basic"
  },
  {
    id: 14,
    question: "Classify the pattern: 'Debangshu sent an email to his mentor.'",
    options: [
      "SVOA / SVO + Prepositional Recipient",
      "SVOO",
      "SVC",
      "SVOC"
    ],
    correctAnswer: 0,
    answer: "SVOA / SVO + Prepositional Recipient",
    explanation: "Subject ('Debangshu') + Verb ('sent') + Direct Object ('an email') + Directional/Recipient Prepositional Adverbial ('to his mentor').",
    explanationBn: "Subject ('Debangshu') + Verb ('sent') + DO ('an email') + Adverbial/Recipient ('to his mentor') — এটি SVOA / SVO+Prep প্যাটার্ন।",
    hint: "Subject + Verb + DO + Prepositional phrase.",
    level: "intermediate"
  },
  {
    id: 15,
    question: "Classify the pattern: 'The weather turned unusually cold.'",
    options: [
      "SVC (Subject + Linking Verb + Adjective Complement)",
      "SVA",
      "SVO",
      "SV"
    ],
    correctAnswer: 0,
    answer: "SVC (Subject + Linking Verb + Adjective Complement)",
    explanation: "Subject ('The weather') + Linking Verb ('turned' = became) + Predicate Adjective Complement ('unusually cold').",
    explanationBn: "Subject ('The weather') + Verb ('turned') + Complement ('cold') — এটি SVC প্যাটার্ন।",
    hint: "'Turned' means became (SVC).",
    level: "basic"
  },
  {
    id: 16,
    question: "Why is 'The railway station lies five miles to the north' an SVA pattern rather than an SVO pattern?",
    options: [
      "'Lies' is an intransitive verb of location; 'five miles to the north' is an obligatory spatial adverbial phrase, not an object",
      "Because miles is an object",
      "Because station is a building",
      "It is an SVO pattern"
    ],
    correctAnswer: 0,
    answer: "'Lies' is an intransitive verb of location; 'five miles to the north' is an obligatory spatial adverbial phrase, not an object",
    explanation: "Locational verbs (lie, stand, reside, dwell) take spatial adverbial complements (SVA), not direct objects.",
    explanationBn: "'lies' একটি অবস্থান প্রকাশক অকর্মক ক্রিয়া; 'five miles to the north' হলো স্থান নির্দেশক Adverbial, কোনো Object নয় (SVA)।",
    hint: "Location verbs take spatial adverbial complements.",
    level: "intermediate"
  },
  {
    id: 17,
    question: "In 'Abhronila stepped onto the stage with immense grace', what is the basic underlying clause pattern?",
    options: [
      "SVA (Subject + Verb + Obligatory Directional Adverbial 'onto the stage'; 'with immense grace' is an optional manner adjunct)",
      "SVO",
      "SVOO",
      "SVC"
    ],
    correctAnswer: 0,
    answer: "SVA (Subject + Verb + Obligatory Directional Adverbial 'onto the stage'; 'with immense grace' is an optional manner adjunct)",
    explanation: "The core clause is 'Abhronila [S] stepped [V] onto the stage [A]'.",
    explanationBn: "মূল গঠন হলো Subject ('Abhronila') + Verb ('stepped') + Adverbial ('onto the stage') = SVA।",
    hint: "Stepped + directional adverbial.",
    level: "intermediate"
  },
  {
    id: 18,
    question: "Which of the following sentences is an SVC pattern with a Predicate Noun?",
    options: [
      "Sukanta Hui is a senior master mentor.",
      "Sukanta Hui teaches grammar.",
      "Sukanta Hui founded the academy.",
      "Sukanta Hui speaks clearly."
    ],
    correctAnswer: 0,
    answer: "Sukanta Hui is a senior master mentor.",
    explanation: "Subject ('Sukanta Hui') + Linking Verb ('is') + Predicate Noun ('a senior master mentor'). (Sukanta Hui = Master Mentor).",
    explanationBn: "Subject ('Sukanta Hui') + Verb ('is') + Predicate Noun ('a senior master mentor') — এটি SVC (Noun Complement) প্যাটার্ন।",
    hint: "Subject + is + Noun complement.",
    level: "basic"
  },
  {
    id: 19,
    question: "Which of the following sentences is an SVC pattern with a Predicate Adjective?",
    options: [
      "The theoretical explanation was extraordinarily lucid.",
      "The theoretical explanation clarified the problem.",
      "The mentor provided a theoretical explanation.",
      "The students took notes during the explanation."
    ],
    correctAnswer: 0,
    answer: "The theoretical explanation was extraordinarily lucid.",
    explanation: "Subject ('The theoretical explanation') + Linking Verb ('was') + Predicate Adjective ('lucid').",
    explanationBn: "Subject ('The explanation') + Verb ('was') + Predicate Adjective ('lucid') — এটি SVC (Adjective Complement) প্যাটার্ন।",
    hint: "Subject + was + Adjective.",
    level: "basic"
  },
  {
    id: 20,
    question: "Classify the pattern: 'The police officer led the lost child to safety.'",
    options: [
      "SVOA (Subject + Verb + Direct Object 'the lost child' + Directional Adverbial 'to safety')",
      "SVOO",
      "SVOC",
      "SVC"
    ],
    correctAnswer: 0,
    answer: "SVOA (Subject + Verb + Direct Object 'the lost child' + Directional Adverbial 'to safety')",
    explanation: "Subject ('The police officer') + Verb ('led') + Direct Object ('the lost child') + Directional Adverbial ('to safety').",
    explanationBn: "Subject ('The officer') + Verb ('led') + DO ('the child') + Adverbial ('to safety') — এটি SVOA প্যাটার্ন।",
    hint: "Led + object + to location.",
    level: "intermediate"
  },
  {
    id: 21,
    question: "Classify the pattern: 'The cohort made Swadeep their representative.'",
    options: [
      "SVOC",
      "SVOO",
      "SVO",
      "SVOA"
    ],
    correctAnswer: 0,
    answer: "SVOC",
    explanation: "Subject ('The cohort') + Verb ('made') + Direct Object ('Swadeep') + Object Complement Noun ('their representative'). (Swadeep = Representative).",
    explanationBn: "Subject ('The cohort') + Verb ('made') + DO ('Swadeep') + OC ('their representative') — এটি SVOC প্যাটার্ন।",
    hint: "Swadeep = their representative.",
    level: "basic"
  },
  {
    id: 22,
    question: "Why can the same verb (like 'made') appear in multiple patterns (e.g. SVO, SVOO, SVOC)?",
    options: [
      "Because verbs are polysemous and their valency/argument structure changes depending on the syntactic frame in which they are deployed",
      "Because English grammar has no rules",
      "Because 'made' is an irregular verb",
      "Only in spoken dialect"
    ],
    correctAnswer: 0,
    answer: "Because verbs are polysemous and their valency/argument structure changes depending on the syntactic frame in which they are deployed",
    explanation: "Consider 'make': 'He made a cake' (SVO), 'He made her a cake' (SVOO), 'He made her happy' (SVOC). A verb's syntactic frame dictates its pattern.",
    explanationBn: "একটি ক্রিয়াপদ বিভিন্ন বাক্যে বিভিন্ন অর্থ ও কাঠামোর মাধ্যমে SVO, SVOO বা SVOC রূপ ধারণ করতে পারে (যেমন: 'made a cake' - SVO; 'made her a cake' - SVOO; 'made her happy' - SVOC)।",
    hint: "Verbs adopt different argument structures in different contexts.",
    level: "advanced"
  },
  {
    id: 23,
    question: "In the sentence 'The historical monument stands proudly upon the hill overlooking the river', identify the core SVA kernel:",
    options: [
      "[The historical monument: S] [stands: V] [upon the hill: A]",
      "[The historical monument: S] [stands proudly: V]",
      "[The monument stands: SVO]",
      "[stands proudly: SVA]"
    ],
    correctAnswer: 0,
    answer: "[The historical monument: S] [stands: V] [upon the hill: A]",
    explanation: "The core clause is Subject ('The historical monument') + Verb ('stands') + Locational Adverbial ('upon the hill').",
    explanationBn: "মূল SVA কাঠামোটি হলো: Subject ('The monument') + Verb ('stands') + Locational Adverbial ('upon the hill')।",
    hint: "Subject + stands + location.",
    level: "intermediate"
  },
  {
    id: 24,
    question: "Which of the following summaries accurately reflects all 7 Fundamental Sentence Patterns?",
    options: [
      "1. SV, 2. SVO, 3. SVOO, 4. SVC, 5. SVOC, 6. SVA, 7. SVOA",
      "1. SV, 2. SVO, 3. SVA, 4. SOV, 5. OSV, 6. VSO, 7. OVS",
      "1. Noun, 2. Pronoun, 3. Verb, 4. Adj, 5. Adv, 6. Prep, 7. Conj",
      "1. Past, 2. Present, 3. Future, 4. Perfect, 5. Continuous, 6. Voice, 7. Mood"
    ],
    correctAnswer: 0,
    answer: "1. SV, 2. SVO, 3. SVOO, 4. SVC, 5. SVOC, 6. SVA, 7. SVOA",
    explanation: "The 7 structural archetypes: SV, SVO, SVOO, SVC, SVOC, SVA, SVOA encompass all standard simple clause syntax in English.",
    explanationBn: "ইংরেজি বাক্যের ৭টি প্রধান রূপ: ১. SV, ২. SVO, ৩. SVOO, ৪. SVC, ৫. SVOC, ৬. SVA, ৭. SVOA।",
    hint: "The 7 structural archetypes.",
    level: "basic"
  },
  {
    id: 25,
    question: "What is Mentor Sukanta Hui's master directive for sentence synthesis and analysis?",
    options: [
      "Every single English sentence, no matter how long or ornate, can be deconstructed into one of the 7 foundational patterns. Master these 7 blueprints, and you will construct complex prose with flawless structural integrity.",
      "Only write SV sentences in examinations",
      "Sentence patterns only apply to poetry",
      "Never use adverbs in writing"
    ],
    correctAnswer: 0,
    answer: "Every single English sentence, no matter how long or ornate, can be deconstructed into one of the 7 foundational patterns. Master these 7 blueprints, and you will construct complex prose with flawless structural integrity.",
    explanation: "Deconstructing ornate sentences into their core 7 architectural patterns gives learners complete diagnostic mastery over English prose.",
    explanationBn: "সুকান্ত স্যারের মূল বার্তা: ইংরেজি ভাষার যেকোনো দীর্ঘ বা অলঙ্কৃত বাক্যকে এই ৭টি মৌলিক কাঠামোর যেকোনো একটিতে ভেঙে ফেলা যায়। এই ৭টি ব্লুপ্রিন্ট আয়ত্ত করলেই নির্ভুল বাক্য গঠনের পূর্ণ নিয়ন্ত্রণ অর্জন করা সম্ভব।",
    hint: "All English prose maps to the 7 foundational blueprints.",
    level: "basic"
  }
];

export default questions;
