// topic0_questions.js
// Module 001_002: Sentence Anatomy — Subject, Predicate, Objects & Complements
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "In the sentence 'The old banyan tree near the Barrackpore riverfront collapsed during the storm', what is the COMPLETE SUBJECT?",
    options: [
      "The old banyan tree",
      "The old banyan tree near the Barrackpore riverfront",
      "The banyan tree",
      "During the storm"
    ],
    correctAnswer: 1,
    explanation: "The Complete Subject includes the simple subject noun ('tree') along with all its modifiers, determiners, and prepositional phrases ('The old banyan', 'near the Barrackpore riverfront') preceding the finite verb 'collapsed'.",
    explanationBn: "Complete Subject হলো মূল Noun Head ('tree') এবং তার সাথে যুক্ত সমস্ত Modifiers ও Prepositional Phrases ('The old banyan tree near the Barrackpore riverfront'), যা Finite Verb 'collapsed'-এর আগে বসেছে।"
  },
  {
    id: 2,
    question: "In the sentence 'Sukanta Sir taught the students English Grammar', what is 'the students'?",
    options: [
      "Direct Object",
      "Indirect Object",
      "Subject Complement",
      "Object Complement"
    ],
    correctAnswer: 1,
    explanation: "'The students' is the Indirect Object (the beneficiary receiving the direct object 'English Grammar'). The sentence follows the Ditransitive Pattern: Subject + Verb + Indirect Object + Direct Object (SVOO).",
    explanationBn: "'The students' হলো Indirect Object (যাদের শেখানো হয়েছে), এবং 'English Grammar' হলো Direct Object (কী শেখানো হয়েছে)। এটি Ditransitive Pattern (SVOO)-এর উদাহরণ।"
  },
  {
    id: 3,
    question: "In the sentence 'She seems remarkably happy today', what is the syntactic role of 'happy'?",
    options: [
      "Direct Object",
      "Subject Complement",
      "Object Complement",
      "Adverb of Manner"
    ],
    correctAnswer: 1,
    explanation: "'Seems' is a Linking (Copular) Verb, not an action verb. Therefore, 'happy' is a Predicate Adjective functioning as a Subject Complement describing the subject 'She' (Pattern: SVC).",
    explanationBn: "'Seems' কোনো Action Verb নয়, এটি একটি Linking / Copular Verb। তাই 'happy' হলো Subject Complement যা Subject 'She'-এর অবস্থাকে বর্ণনা করছে (SVC Pattern)।"
  },
  {
    id: 4,
    question: "Which of the following sentences follows the 'Subject + Verb + Object + Object Complement' (SVOC) pattern?",
    options: [
      "The teacher gave Swadeep a medal.",
      "The committee elected Debangshu President.",
      "The weather became unexpectedly cold.",
      "The express train arrived at the platform."
    ],
    correctAnswer: 1,
    explanation: "In 'The committee elected Debangshu President', 'Debangshu' is the Direct Object, and 'President' is the Object Complement describing his new role resulting from the verb 'elected' (SVOC).",
    explanationBn: "'The committee elected Debangshu President' বাক্যে 'Debangshu' হলো Direct Object এবং 'President' হলো Object Complement যা Object-এর নতুন পদমর্যাদা প্রকাশ করছে (SVOC Pattern)।"
  },
  {
    id: 5,
    question: "In the sentence 'There are twenty students in the Barrackpore classroom', what is the grammatical subject?",
    options: [
      "There",
      "twenty students",
      "the Barrackpore classroom",
      "are"
    ],
    correctAnswer: 1,
    explanation: "'There' is an Expletive (Dummy Subject / Introductory Adverb). The true logical grammatical subject is the plural noun phrase 'twenty students' which governs the plural verb 'are'.",
    explanationBn: "'There' কোনো প্রকৃত Subject নয়, এটি Dummy / Introductory Subject। বাক্যের আসল ব্যাকরণিক Subject হলো 'twenty students', যার কারণেই বহুবচন Verb 'are' বসেছে।"
  },
  {
    id: 6,
    question: "What is the Simple Predicate in: 'The diligent young researcher has been working continuously on the dataset'?",
    options: [
      "working",
      "has been working",
      "has been working continuously",
      "working continuously on the dataset"
    ],
    correctAnswer: 1,
    explanation: "The Simple Predicate consists strictly of the complete verb group (auxiliary verbs + main lexical verb): 'has been working'.",
    explanationBn: "Simple Predicate হলো মূল Verb Group (Auxiliary Verbs + Main Verb), অর্থাৎ 'has been working'। এর মধ্যে কোনো Adverb বা Prepositional Phrase যুক্ত হয় না।"
  },
  {
    id: 7,
    question: "In the sentence 'The milk turned sour', what is 'sour'?",
    options: [
      "Direct Object",
      "Adverb of Manner",
      "Subject Complement",
      "Indirect Object"
    ],
    correctAnswer: 2,
    explanation: "Here 'turned' acts as an inchoative/linking verb meaning 'became'. 'Sour' is an adjective functioning as a Subject Complement describing the state of 'The milk' (SVC pattern).",
    explanationBn: "এখানে 'turned' হলো Linking Verb (যার অর্থ 'became')। তাই 'sour' হলো Subject Complement যা 'milk'-এর গুণ/অবস্থা বর্ণনা করছে।"
  },
  {
    id: 8,
    question: "Identify the sentence pattern for: 'The athlete ran fifty meters.'",
    options: [
      "SVO (Subject + Verb + Object)",
      "SVA (Subject + Verb + Adverbial)",
      "SVC (Subject + Verb + Complement)",
      "SV (Subject + Verb)"
    ],
    correctAnswer: 1,
    explanation: "'Ran' is an intransitive verb; 'fifty meters' is an Adverbial Objective expressing distance/extent (answering 'How far did he run?'), not a direct object. Hence, the pattern is SVA.",
    explanationBn: "'Ran' হলো Intransitive Verb; 'fifty meters' কোনো Direct Object নয়, এটি দূরত্বের পরিমাণ নির্দেশক Adverbial Objective। তাই এর প্যাটার্ন হলো SVA।"
  },
  {
    id: 9,
    question: "In 'They made him their spokesperson', what is the relation between 'him' and 'their spokesperson'?",
    options: [
      "Indirect Object and Direct Object",
      "Direct Object and Object Complement",
      "Subject and Predicate",
      "Preposition and Prepositional Object"
    ],
    correctAnswer: 1,
    explanation: "'Him' is the Direct Object, and 'their spokesperson' is the Object Complement completing the sense of the complex-transitive verb 'made'. Note: 'him' = 'their spokesperson'.",
    explanationBn: "'Him' হলো Direct Object এবং 'their spokesperson' হলো Object Complement (যেহেতু 'him' এবং 'spokesperson' একই ব্যক্তি)।"
  },
  {
    id: 10,
    question: "In an imperative sentence like 'Submit your assignment before 5 PM', what is the implied subject?",
    options: [
      "He",
      "You",
      "They",
      "One"
    ],
    correctAnswer: 1,
    explanation: "Imperative sentences always have an implicit/understood second-person subject: '[You] submit your assignment before 5 PM.'",
    explanationBn: "Imperative Sentence-এ Subject সর্বদাই উহ্য থাকে এবং তা হলো Second Person 'You' ('[You] Submit your assignment')।"
  },
  {
    id: 11,
    question: "In 'The judges considered the presentation outstanding', what part of speech and syntactic role is 'outstanding'?",
    options: [
      "Adverb modifying considered",
      "Adjective functioning as Object Complement",
      "Noun functioning as Direct Object",
      "Participle functioning as Subject Complement"
    ],
    correctAnswer: 1,
    explanation: "'Outstanding' is a participial adjective functioning as an Object Complement describing the direct object 'the presentation'.",
    explanationBn: "'Outstanding' হলো Adjective যা Direct Object 'the presentation'-এর গুণ বর্ণনা করে Object Complement হিসেবে কাজ করছে।"
  },
  {
    id: 12,
    question: "What is the test to distinguish a Direct Object from a Subject Complement?",
    options: [
      "A Direct Object receives the action of a transitive verb (Subject $\\neq$ Object), whereas a Subject Complement refers back to the same entity as the Subject after a linking verb (Subject = Complement).",
      "Direct objects are always pronouns.",
      "Subject complements only appear in passive voice.",
      "Direct objects cannot be nouns."
    ],
    correctAnswer: 0,
    explanation: "Formula: In 'He kicked the ball', He $\\neq$ Ball (Transitive Verb + Direct Object). In 'He is a doctor', He = Doctor (Linking Verb + Subject Complement).",
    explanationBn: "টেস্ট ফর্মুলা: Direct Object-এ Subject এবং Object আলাদা সত্তা (He $\\neq$ Ball)। কিন্তু Subject Complement-এ Subject এবং Complement একই সত্তা (He = Doctor)।"
  },
  {
    id: 13,
    question: "In the sentence 'The medicine tastes extremely bitter', what is 'bitter'?",
    options: [
      "Adverb modifying tastes",
      "Direct Object of tastes",
      "Subject Complement after the sensory linking verb 'tastes'",
      "Object Complement"
    ],
    correctAnswer: 2,
    explanation: "Verbs of sensation (taste, smell, sound, look, feel) function as Linking Verbs followed by Subject Complement adjectives (e.g., 'tastes bitter', NOT 'tastes bitterly').",
    explanationBn: "Sense Verbs (taste, smell, look, feel) এর পর Adverb বসে না; Linking Verb হিসেবে এগুলোর পর Subject Complement Adjective বসে ('tastes bitter', 'tastes bitterly' নয়)।"
  },
  {
    id: 14,
    question: "Identify the pattern of: 'Abhronila put the laptop on the study desk.'",
    options: [
      "SVO (Subject + Verb + Object)",
      "SVOA (Subject + Verb + Object + Obligatory Adverbial)",
      "SVOO (Subject + Verb + Indirect Object + Direct Object)",
      "SVOC (Subject + Verb + Object + Complement)"
    ],
    correctAnswer: 1,
    explanation: "'Put' is a verb requiring both a direct object ('the laptop') and an obligatory spatial adverbial ('on the study desk'). Without the adverbial, 'Abhronila put the laptop' is grammatically incomplete. Pattern: SVOA.",
    explanationBn: "'Put' Verb-এর পর Direct Object ('the laptop') এবং স্থান নির্দেশক Obligatory Adverbial ('on the study desk') দুটিই বাধ্যতামূলক। তাই প্যাটার্ন হলো SVOA।"
  },
  {
    id: 15,
    question: "In the sentence 'The birds are singing merrily in the garden', what is the Complete Predicate?",
    options: [
      "are singing",
      "are singing merrily",
      "are singing merrily in the garden",
      "singing merrily in the garden"
    ],
    correctAnswer: 2,
    explanation: "The Complete Predicate includes the finite verb group ('are singing') plus the adverb of manner ('merrily') and the prepositional phrase of place ('in the garden').",
    explanationBn: "Complete Predicate হলো Verb Group ('are singing') এবং তার সাথে যুক্ত تمام Adverbs ও Prepositional Phrases ('merrily in the garden')।"
  },
  {
    id: 16,
    question: "Which of the following verbs is DITRANSITIVE (can take two objects: Indirect + Direct)?",
    options: [
      "Arrive",
      "Promise",
      "Disappear",
      "Sleep"
    ],
    correctAnswer: 1,
    explanation: "'Promise' can take both an Indirect Object and a Direct Object: 'He promised me (Indirect) a reward (Direct)'. Verbs like arrive, disappear, sleep are strictly intransitive.",
    explanationBn: "'Promise' হলো Ditransitive Verb, যা দুটি Object নিতে পারে: 'He promised me (Indirect) a reward (Direct)'। অন্যগুলো Intransitive Verb।"
  },
  {
    id: 17,
    question: "How can the SVOO sentence 'Tuhina bought her brother a scientific calculator' be transformed using a prepositional phrase?",
    options: [
      "Tuhina bought a scientific calculator for her brother.",
      "Tuhina bought to her brother a scientific calculator.",
      "Tuhina bought a scientific calculator with her brother.",
      "Tuhina bought her brother from a scientific calculator."
    ],
    correctAnswer: 0,
    explanation: "SVOO can transform to SVO + Prepositional Phrase: 'bought [Direct Object] for [Beneficiary]': 'Tuhina bought a scientific calculator for her brother.'",
    explanationBn: "SVOO প্যাটার্নকে Preposition দিয়ে রূপান্তর করলে Direct Object আগে আসে: 'bought a scientific calculator for her brother'।"
  },
  {
    id: 18,
    question: "In the sentence 'Painting portraits became his lifelong passion', what is the subject?",
    options: [
      "Painting",
      "portraits",
      "Painting portraits (Gerund phrase)",
      "his lifelong passion"
    ],
    correctAnswer: 2,
    explanation: "The subject is the entire Gerund Phrase 'Painting portraits', which functions as a singular nominal unit governing the linking verb 'became'.",
    explanationBn: "এখানে Subject হলো সম্পূর্ণ Gerund Phrase 'Painting portraits', যা একটি Singular Noun Unit হিসেবে কাজ করছে।"
  },
  {
    id: 19,
    question: "In 'To err is human; to forgive, divine', what syntactic role do 'To err' and 'to forgive' play?",
    options: [
      "Direct Objects",
      "Infinitive Subjects",
      "Subject Complements",
      "Adverbial modifiers"
    ],
    correctAnswer: 1,
    explanation: "'To err' and 'to forgive' are Infinitive phrases functioning as the grammatical Subjects of their respective clauses.",
    explanationBn: "'To err' এবং 'to forgive' হলো Infinitive Phrases যা বাক্যের ব্যাকরণিক Subject হিসেবে কাজ করছে।"
  },
  {
    id: 20,
    question: "In the sentence 'The principal appointed Swadeep captain of the cricket team', what is 'captain of the cricket team'?",
    options: [
      "Indirect Object",
      "Direct Object",
      "Object Complement Phrase",
      "Subject Complement"
    ],
    correctAnswer: 2,
    explanation: "It modifies and renames the direct object 'Swadeep' following the complex-transitive verb 'appointed'. Hence, it is an Object Complement Phrase.",
    explanationBn: "'Captain of the cricket team' হলো Object Complement Phrase যা Direct Object 'Swadeep'-এর নতুন উপাধিকে সংজ্ঞায়িত করছে।"
  },
  {
    id: 21,
    question: "In 'The meeting lasted two hours', why is 'two hours' NOT a Direct Object?",
    options: [
      "Because 'lasted' is an intransitive durational verb, and 'two hours' is an Adverbial Objective of duration (answering 'How long?'), not a patient receiving an action.",
      "Because hours is plural.",
      "Because lasted is a linking verb.",
      "Because time cannot be an object."
    ],
    correctAnswer: 0,
    explanation: "'Lasted' cannot be passivized ('Two hours were lasted by the meeting' is ungrammatical). 'Two hours' functions as an Adverbial Objective of duration (SVA pattern).",
    explanationBn: "'Lasted' কোনো Transitive Verb নয় (এর Passive Voice হয় না)। 'Two hours' সময়ের ব্যাপ্তি প্রকাশকারী Adverbial Objective (SVA Pattern)।"
  },
  {
    id: 22,
    question: "Which of the following sentences exhibits an INVERTED subject-verb order?",
    options: [
      "The brave soldiers marched into the valley.",
      "Into the valley marched the brave soldiers.",
      "The brave soldiers were marching into the valley.",
      "The soldiers marched bravely."
    ],
    correctAnswer: 1,
    explanation: "In 'Into the valley marched the brave soldiers', the prepositional phrase is fronted, causing locative inversion where the verb 'marched' precedes the grammatical subject 'the brave soldiers'.",
    explanationBn: "'Into the valley marched the brave soldiers' বাক্যে Prepositional Phrase আগে আসায় Locative Inversion ঘটেছে, অর্থাৎ Verb 'marched' Subject 'the brave soldiers'-এর পূর্বে বসেছে।"
  },
  {
    id: 23,
    question: "In 'That he will pass the examination with distinction is certain', what is the subject?",
    options: [
      "That he will pass",
      "the examination",
      "That he will pass the examination with distinction (Noun Clause)",
      "is certain"
    ],
    correctAnswer: 2,
    explanation: "The entire dependent Noun Clause 'That he will pass the examination with distinction' functions as the singular Subject of the matrix clause verb 'is'.",
    explanationBn: "সম্পূর্ণ Noun Clause 'That he will pass the examination with distinction' বাক্যের মূল Verb 'is'-এর Singular Subject হিসেবে কাজ করছে।"
  },
  {
    id: 24,
    question: "Identify the sentence pattern: 'The students remained quiet throughout the lecture.'",
    options: [
      "SVO (Subject + Verb + Object)",
      "SVC (Subject + Verb + Complement) with an adverbial phrase",
      "SVOC (Subject + Verb + Object + Complement)",
      "SVOO (Subject + Verb + Indirect Object + Direct Object)"
    ],
    correctAnswer: 1,
    explanation: "'Remained' is a linking verb expressing continuing state; 'quiet' is a Subject Complement adjective, followed by the temporal prepositional phrase 'throughout the lecture'. Pattern: SVC(A).",
    explanationBn: "'Remained' হলো Linking Verb; 'quiet' হলো Subject Complement Adjective। তাই এর মূল প্যাটার্ন হলো SVC।"
  },
  {
    id: 25,
    question: "Why is understanding Sentence Anatomy fundamental for Bengali-medium students transitioning into advanced English?",
    options: [
      "It allows students to translate word-by-word without changing order.",
      "It prevents sentence fragments, misplaced complements, zero-copula omissions, and enables accurate syntactic parsing across all 12 tenses and voice transformations.",
      "It eliminates the need to learn vocabulary.",
      "It only applies to poetry."
    ],
    correctAnswer: 1,
    explanation: "Mastering the 7 sentence patterns and subject/predicate/complement roles prevents catastrophic errors like zero-copula sentences (*'He doctor'*) and enables seamless mastery of Voice, Concord, and Clause synthesis.",
    explanationBn: "Sentence Anatomy এবং ৭টি মৌলিক প্যাটার্ন আয়ত্ত করলে Zero-Copula ভুল দূর হয় এবং Voice Change, Concord ও Clause Synthesis-এ নির্ভুল দক্ষতা তৈরি হয়।"
  }
];

export default questions;
