// topic9_questions.js
// Module 001_002 | Topic 9: Classroom Dialogue & Visual Sentence Tree Diagnostics

const questions = [
  {
    id: 1,
    question: "In the classroom dialogue, why did Sukanta Sir emphasize that 'The rose smells sweet' cannot be passivized?",
    options: [
      "Because 'smells' is a Linking Verb and 'sweet' is a Subject Complement adjective, meaning there is no Direct Object to become the passive subject",
      "Because flowers cannot be passive",
      "Because 'sweet' is an adverb",
      "Because the sentence is too short"
    ],
    correctAnswer: 0,
    explanation: "Passive voice mandates an active direct object; linking verbs with subject complements ($SVC$) cannot undergo passive transformation.",
    explanationBn: "Passive Voice গঠনের জন্য Direct Object থাকা বাধ্যতামূলক; Linking Verb ও Subject Complement ($SVC$)-যুক্ত বাক্যের Passive সম্ভব নয়।"
  },
  {
    id: 2,
    question: "When parsing a sentence tree, which node forms the top-level structural bifurcation?",
    options: [
      "The Clause splits into [Noun Phrase Subject] + [Verb Phrase Predicate]",
      "The Clause splits into Nouns + Prepositions",
      "The Clause splits into Articles + Adjectives",
      "The Clause splits into Punctuation + Words"
    ],
    correctAnswer: 0,
    explanation: "At the root level, any standard clause branches into the Subject NP (Theme) and Predicate VP (Rheme).",
    explanationBn: "Sentence Tree-এর শীর্ষ স্তরে বাক্যটি দুটি প্রধান শাখায় বিভক্ত হয়: Subject NP এবং Predicate VP।"
  },
  {
    id: 3,
    question: "In 'They elected Swadeep captain', why does 'captain' attach directly under the Verb Phrase as an Object Complement rather than a separate clause?",
    options: [
      "Because 'captain' is a secondary predicate argument modifying the direct object 'Swadeep' within the complex-transitive verb phrase",
      "Because captain is a noun",
      "Because Swadeep is a student",
      "Because elected is past tense"
    ],
    correctAnswer: 0,
    explanation: "Complex-transitive verbs govern both the Direct Object and its co-referential Object Complement inside the VP.",
    explanationBn: "Complex-Transitive Verb-এর অধীনে Direct Object এবং Object Complement একই Verb Phrase-এর অভ্যন্তরে থাকে।"
  },
  {
    id: 4,
    question: "In 'There are five students in the Barrackpore hall', how is the Sentence Tree parsed?",
    options: [
      "'There' is an expletive dummy particle; 'five students' is the logical Subject NP; 'are in the Barrackpore hall' is the Predicate VP",
      "'There' is the subject",
      "'hall' is the subject",
      "'Barrackpore' is the verb"
    ],
    correctAnswer: 0,
    explanation: "'There' occupies dummy surface subject position, while the logical subject NP 'five students' governs concord with 'are'.",
    explanationBn: "'There' হলো Dummy Subject; আসল Subject হলো 'five students'।"
  },
  {
    id: 5,
    question: "What is the primary pedagogical objective of Module 001_002?",
    options: [
      "To deconstruct every English sentence into its 7 core patterns, simple/complete subjects, predicates, objects, and complements with zero ambiguity",
      "To memorize dictionary entries",
      "To replace nouns with verbs",
      "To write without adjectives"
    ],
    correctAnswer: 0,
    explanation: "Module 001_002 equips learners with deep anatomical mastery of clauses, forming the foundation for tenses, voice, concord, and synthesis.",
    explanationBn: "মডিউল 001_002-এর মূল উদ্দেশ্য হলো বাক্যের গঠন নিখুঁতভাবে বিশ্লেষণ করে Subject, Predicate, Object ও Complement-এর শতভাগ নির্ভুল প্রয়োগ শেখা।"
  },
  {
    id: 6,
    question: "In 'The students remained silent throughout the lecture', what is the tree hierarchy of 'throughout the lecture'?",
    options: [
      "An optional Prepositional Adverbial modifying the verb phrase [remained silent]",
      "Direct Object",
      "Subject",
      "Object Complement"
    ],
    correctAnswer: 0,
    explanation: "'Throughout the lecture' is an adjunct prepositional phrase of time attached to the VP.",
    explanationBn: "'Throughout the lecture' হলো সময় নির্দেশক Prepositional Adverbial Phrase।"
  },
  {
    id: 7,
    question: "How does Visual Tree Parsing assist Bengali-medium learners transitioning to English?",
    options: [
      "It makes the hierarchical English SVO structure visible, preventing word-by-word SOV Bengali translation traps",
      "It allows drawing pictures instead of writing",
      "It removes the need to practice grammar",
      "It replaces all punctuation marks"
    ],
    correctAnswer: 0,
    explanation: "Tree parsing reveals how English arguments nest inside the Verb Phrase, contrasting with Bengali postpositional structures.",
    explanationBn: "ট্রি পার্সিং ইংরেজির SVO গঠনকে দৃশ্যমান করে তোলে, যার ফলে বাংলার SOV গঠন থেকে অনুবাদের ভুল দূর হয়।"
  },
  {
    id: 8,
    question: "In 'The young scholar from Barrackpore won first prize', what is the head noun of the Subject NP?",
    options: ["scholar", "Barrackpore", "young", "prize"],
    correctAnswer: 0,
    explanation: "'Scholar' is the core nominal head modified by 'young' and 'from Barrackpore'.",
    explanationBn: "Subject NP-এর মূল Head Noun হলো 'scholar'।"
  },
  {
    id: 9,
    question: "In 'I found the exam question remarkably easy', what is 'remarkably easy'?",
    options: ["Object Complement (Adjective Phrase)", "Subject Complement", "Direct Object", "Adverbial"],
    correctAnswer: 0,
    explanation: "'Remarkably easy' qualifies the direct object 'the exam question' ($question = easy$).",
    explanationBn: "'remarkably easy' হলো Direct Object 'the exam question'-এর গুণ প্রকাশক Object Complement।"
  },
  {
    id: 10,
    question: "What milestone is achieved upon mastering Module 001_002?",
    options: [
      "Full certification in Sentence Anatomy and readiness to classify sentences by Purpose and Mood in Module 001_003",
      "Graduation from high school",
      "No more grammar study needed",
      "Only spoken fluency"
    ],
    correctAnswer: 0,
    explanation: "Mastery of 001_002 completes foundational sentence architecture, leading seamlessly to Module 001_003.",
    explanationBn: "মডিউল 001_002 আয়ত্ত করার মাধ্যমে বাক্যের গঠনগত ভিত্তি সম্পন্ন হয় এবং 001_003-এর পথ সুগম হয়।"
  }
];

export default questions;
