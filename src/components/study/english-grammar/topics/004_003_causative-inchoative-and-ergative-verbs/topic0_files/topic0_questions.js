// topic0_questions.js
// Module 004_003: Causative Verbs, Inchoative Verbs & Ergative Mechanics

const questions = [
  {
    id: 1,
    question: "Select the grammatically correct active causative sentence using 'make':",
    options: [
      "The mentor made Swadeep write the summary again.",
      "The mentor made Swadeep to write the summary again.",
      "The mentor made Swadeep writing the summary again.",
      "The mentor made Swadeep wrote the summary again."
    ],
    correctAnswer: 0,
    explanation: "In active voice, the causative verb 'make' (expressing compulsion/requirement) is strictly followed by an object and a bare infinitive (V1 without 'to'): 'made him write'.",
    explanationBn: "Active Voice-এ প্রযোজক ক্রিয়া 'make'-এর পর Object এবং Bare Infinitive (V1) বসে ('made Swadeep write', 'to write' নয়)।"
  },
  {
    id: 2,
    question: "What is the correct passive transformation of 'The officer made the driver wash the car'?",
    options: [
      "The driver was made to wash the car by the officer.",
      "The driver was made wash the car by the officer.",
      "The driver was made washing the car by the officer.",
      "The car made the driver to wash."
    ],
    correctAnswer: 0,
    explanation: "CRITICAL INVARIANT: When 'make' is converted into passive voice ('was/were made'), the bare infinitive MUST convert into a full to-infinitive: 'was made TO wash'.",
    explanationBn: "মৌলিক নিয়ম: Passive Voice-এ 'made'-এর পর Bare Infinitive পরিবর্তিত হয়ে To-Infinitive ধারণ করে ('was made TO wash')।"
  },
  {
    id: 3,
    question: "Which sentence correctly demonstrates the causative verb 'get' with a human agent in active voice?",
    options: [
      "I got the electrician to inspect the wiring.",
      "I got the electrician inspect the wiring.",
      "I got the electrician inspected the wiring.",
      "I got the electrician inspecting the wiring."
    ],
    correctAnswer: 0,
    explanation: "'Get' + Person (expressing persuasion/convincing) strictly requires a full to-infinitive ('get + person + to + V1').",
    explanationBn: "'Get' দিয়ে কোনো ব্যক্তিকে দিয়ে কাজ করানো (Persuade করা) বোঝালে 'get + Person + to + V1' বসে ('got him to inspect')।"
  },
  {
    id: 4,
    question: "Select the correct passive causative structure meaning 'arranging for a service':",
    options: [
      "She had her laptop repaired by a certified technician.",
      "She had her laptop to repair by a certified technician.",
      "She had her laptop repair by a certified technician.",
      "She had repaired her laptop."
    ],
    correctAnswer: 0,
    explanation: "Passive Causative Formula: Subject + have/get + Object (Thing) + Past Participle (V3): 'had her laptop repaired'.",
    explanationBn: "Passive Causative গঠন: Subject + have/get + Object (বস্তু) + Past Participle (V3) -> 'had her laptop repaired'।"
  },
  {
    id: 5,
    question: "In active voice, which causative verb allows BOTH a bare infinitive and a to-infinitive with equal grammatical validity?",
    options: ["Help", "Make", "Have", "Let"],
    correctAnswer: 0,
    explanation: "'Help' is dual-compatible in modern English: 'He helped me solve the puzzle' and 'He helped me to solve the puzzle' are both fully standard.",
    explanationBn: "'Help'-এর পর Bare Infinitive ('help me solve') এবং To-Infinitive ('help me to solve') উভয়ই ব্যাকরণসম্মত।"
  },
  {
    id: 6,
    question: "Identify the sentence with the correct usage of causative 'let':",
    options: [
      "The librarian let the students borrow three reference books.",
      "The librarian let the students to borrow three reference books.",
      "The librarian let the students borrowed three reference books.",
      "The librarian was let the students borrow."
    ],
    correctAnswer: 0,
    explanation: "'Let' (to permit/allow) takes an object + bare infinitive: 'let the students borrow'.",
    explanationBn: "'Let'-এর পর Object এবং Bare Infinitive বসে ('let the students borrow')।"
  },
  {
    id: 7,
    question: "What is an Ergative (or Middle Voice / Labile) verb in English grammar?",
    options: [
      "A verb that can be used transitively (with an agent subject and patient object) and intransitively (where the patient becomes the grammatical subject) without changing form",
      "A verb that has no past tense",
      "A verb that only occurs in questions",
      "A verb invented in ancient Latin"
    ],
    correctAnswer: 0,
    explanation: "Ergative verbs (e.g. open, break, melt, boil, ring, start) can be transitive ('He opened the door') or intransitive ('The door opened').",
    explanationBn: "Ergative Verb হল এমন ক্রিয়া যা রূপের পরিবর্তন ছাড়াই Transitive ('He opened the door') এবং Intransitive ('The door opened') উভয়ভাবেই বসতে পারে।"
  },
  {
    id: 8,
    question: "Which of the following pairs illustrates an Ergative verb functioning in both transitive and intransitive modes?",
    options: [
      "The chef boiled the water (Transitive) / The water boiled (Intransitive)",
      "He saw the movie / The movie saw him",
      "She wrote a book / The book wrote",
      "They ate dinner / Dinner ate"
    ],
    correctAnswer: 0,
    explanation: "'Boil' is ergative: the object in the transitive clause ('the water') becomes the subject in the intransitive clause.",
    explanationBn: "'Boil' একটি Ergative Verb: 'The chef boiled the water' বনাম 'The water boiled'।"
  },
  {
    id: 9,
    question: "What is an Inchoative Verb?",
    options: [
      "A verb that expresses the beginning of an action, a transition into a new state, or gradual becoming (e.g. become, grow, turn, get)",
      "A verb that cannot be used in the past tense",
      "A verb that only takes prepositional objects",
      "A verb with four syllables"
    ],
    correctAnswer: 0,
    explanation: "Inchoative verbs denote entering a new condition (e.g. 'The leaves turned yellow', 'It grew dark', 'He became renowned').",
    explanationBn: "Inchoative Verb হল এমন ক্রিয়া যা নতুন কোনো অবস্থায় রূপান্তর বা শুরুর সূচনা প্রকাশ করে (যেমন: 'The leaves turned red', 'He grew old')।"
  },
  {
    id: 10,
    question: "Transform into active causative: 'He arranged for the carpenter to build a bookshelf.'",
    options: [
      "He had the carpenter build a bookshelf.",
      "He had the carpenter to build a bookshelf.",
      "He made the carpenter built a bookshelf.",
      "He got the carpenter build a bookshelf."
    ],
    correctAnswer: 0,
    explanation: "'Have + Person + Bare Infinitive' expresses delegating or commissioning a professional service: 'had the carpenter build'.",
    explanationBn: "কোনো পেশাদার ব্যক্তিকে দিয়ে কাজ করানো অর্থে 'have + Person + V1' বসে: 'had the carpenter build'।"
  },
  {
    id: 11,
    question: "Why is 'I had my tooth to extract yesterday' grammatically unacceptable?",
    options: [
      "Because passive causatives require a Past Participle (V3), not a to-infinitive: 'I had my tooth extracted yesterday'",
      "Because 'tooth' is singular",
      "Because 'had' cannot be used with dental terms",
      "Because 'yesterday' requires future tense"
    ],
    correctAnswer: 0,
    explanation: "The passive causative formula is: Subject + have/get + Object + V3 ('had my tooth extracted').",
    explanationBn: "সঠিক গঠন: 'had my tooth extracted' (V3), কোনো To-infinitive বসবে না।"
  },
  {
    id: 12,
    question: "In the sentence 'The leaves of the trees turned brown in autumn', 'turned' is functioning as an:",
    options: ["Inchoative linking verb denoting state change", "Active causative verb of force", "Ergative transitive verb", "Auxiliary modal"],
    correctAnswer: 0,
    explanation: "'Turned' is an inchoative copular verb expressing the transition of the leaves into the state of being brown.",
    explanationBn: "'Turned' এখানে অবস্থার রূপান্তর নির্দেশক Inchoative Linking Verb হিসেবে ব্যবহৃত।"
  },
  {
    id: 13,
    question: "Select the sentence where causative 'make' is correctly used to express unavoidable physical or emotional reaction:",
    options: [
      "The comedian made the audience laugh uncontrollably.",
      "The comedian made the audience to laugh uncontrollably.",
      "The comedian made the audience laughing uncontrollably.",
      "The comedian was made the audience laugh."
    ],
    correctAnswer: 0,
    explanation: "'Make + Object + Bare Infinitive' is standard for causing emotional reactions: 'made the audience laugh'.",
    explanationBn: "'Made the audience laugh' (Bare Infinitive) সঠিক রূপ।"
  },
  {
    id: 14,
    question: "What is the difference in nuance between 'I made him clean the room' and 'I got him to clean the room'?",
    options: [
      "'Made him clean' implies force or direct authority; 'Got him to clean' implies persuasion, encouragement, or negotiation",
      "Both sentences have identical tone and syntax",
      "'Got him to clean' implies physical force",
      "'Made him clean' is informal spoken slang"
    ],
    correctAnswer: 0,
    explanation: "'Make' denotes authority, obligation, or compulsion; 'Get' denotes persuasive effort or inducement.",
    explanationBn: "'Make' দিয়ে ক্ষমতা বা বাধ্যবাধকতা বোঝায়; 'Get' দিয়ে বুঝিয়ে-শুনিয়ে বা রাজি করিয়ে কাজ করানো বোঝায়।"
  },
  {
    id: 15,
    question: "Why is mastering causative verbs essential for Bengali-medium English learners?",
    options: [
      "Because Bengali has dedicated causative verb inflections (যেমন: 'করা' -> 'করানো', 'দেখা' -> 'দেখানো'), whereas English uses analytical causative auxiliary constructions (make, have, get, let)",
      "Because causative verbs only exist in British English",
      "Because English has no other verbs",
      "To avoid learning tenses"
    ],
    correctAnswer: 0,
    explanation: "Bengali forms causatives morphologically ('পড়া' -> 'পড়ানো'); English forms causatives syntactically with helper verbs (make, have, get, let).",
    explanationBn: "বাংলায় প্রত্যয় যোগে প্রযোজক ক্রিয়া গঠিত হয় ('খাওয়া' -> 'খাওয়ানো'); কিন্তু ইংরেজিতে 'Make/Have/Get/Let'-এর সুনির্দিষ্ট গঠন ব্যবহার করতে হয়।"
  },
  {
    id: 16,
    question: "How is the causative verb 'let' converted into passive voice in standard English?",
    options: [
      "'Let' is replaced by 'be allowed to' in the passive (e.g. 'We were allowed to enter the laboratory')",
      "It becomes 'was letted to enter'",
      "It becomes 'was let to enter'",
      "'Let' cannot exist in any passive idea"
    ],
    correctAnswer: 0,
    explanation: "In passive voice, 'let' is almost universally avoided; standard grammar replaces it with 'be allowed / permitted to + V1' ('We were allowed to leave early').",
    explanationBn: "Passive Voice-এ 'let'-এর পরিবর্তে 'be allowed to' ব্যবহৃত হয় ('He was allowed to enter')।"
  },
  {
    id: 17,
    question: "Which of the following full-lexical causative verbs takes a MANDATORY to-infinitive in active voice?",
    options: ["Force (e.g. 'forced him to confess')", "Require (e.g. 'required all to participate')", "Compel (e.g. 'compelled them to leave')", "All of the above"],
    correctAnswer: 3,
    explanation: "Unlike the primary causative auxiliaries (make, have, let), full lexical causative verbs like force, compel, require, order, cause, enable strictly take 'Object + To-Infinitive'.",
    explanationBn: "Force, Compel, Require, Order, Cause, Enable ইত্যাদি মূল Causative Verb-এর পর সর্বদা Object + To-Infinitive বসে।"
  },
  {
    id: 18,
    question: "Select the sentence with correct syntax for the causative verb 'cause':",
    options: [
      "The torrential monsoon caused the river to overflow its banks.",
      "The torrential monsoon caused the river overflow its banks.",
      "The torrential monsoon caused the river overflowing its banks.",
      "The torrential monsoon caused the river to overflown."
    ],
    correctAnswer: 0,
    explanation: "'Cause' requires 'Object + To-Infinitive': 'caused the river TO overflow'.",
    explanationBn: "'Cause'-এর গঠন: Subject + cause + Object + to-infinitive ('caused the river to overflow')।"
  },
  {
    id: 19,
    question: "In the sentence 'This smooth Italian silk washes easily', what kind of verbal construction is exemplified?",
    options: [
      "Quasi-Passive / Middle Voice (Ergative syntax with passive meaning in active form)",
      "Past Continuous Passive",
      "Subjunctive Mood",
      "Direct Causative of Force"
    ],
    correctAnswer: 0,
    explanation: "Quasi-passive / middle voice verbs (reads well, washes easily, sells fast) have an active structure but convey a passive meaning.",
    explanationBn: "Quasi-Passive / Middle Voice: গঠন Active কিন্তু অর্থ Passive ('This cloth washes easily' -> এই কাপড় সহজে ধোয়া যায়)।"
  },
  {
    id: 20,
    question: "Which inchoative verb correctly completes the state transition: 'The milk will _______ sour if left in the heat.'",
    options: ["turn (or go)", "make", "let", "fall"],
    correctAnswer: 0,
    explanation: "'Turn sour' or 'go sour' are standard inchoative collocations for spoilage or deterioration.",
    explanationBn: "দুধ টকে যাওয়া বা নষ্ট হওয়া অর্থে Inchoative Collocation হল 'turn sour' বা 'go sour'।"
  },
  {
    id: 21,
    question: "Identify the Ergative verb in the following pair: 'The sun melted the glacier' and 'The glacier melted rapidly'.",
    options: ["Melt", "Sun", "Glacier", "Rapidly"],
    correctAnswer: 0,
    explanation: "'Melt' is the ergative verb because the patient ('the glacier') shifts from object in the transitive clause to subject in the intransitive clause.",
    explanationBn: "'Melt' একটি Ergative Verb কারণ এটি সকর্মক ('sun melted glacier') ও অকর্মক ('glacier melted') উভয়ভাবে ব্যবহৃত।"
  },
  {
    id: 22,
    question: "Select the correct sentence expressing: 'I hired someone to paint my portrait.'",
    options: [
      "I had my portrait painted.",
      "I had painted my portrait.",
      "I painted my portrait myself.",
      "I got painted my portrait."
    ],
    correctAnswer: 0,
    explanation: "The passive causative 'have + thing + V3' ('had my portrait painted') expresses that the subject commissioned someone else to perform the painting.",
    explanationBn: "'I had my portrait painted' বোঝাচ্ছে আমি নিজে আঁকিনি, অন্য কাউকে দিয়ে আঁকিয়ে নিয়েছি।"
  },
  {
    id: 23,
    question: "Identify the syntactic error in: 'The manager had the accountant to verify the ledgers.'",
    options: [
      "'Had' in active causative delegation takes a BARE infinitive (without 'to'): 'had the accountant verify'",
      "'Manager' must be followed by 'have'",
      "'Ledgers' should be singular",
      "'Accountant' should be preceded by 'a'"
    ],
    correctAnswer: 0,
    explanation: "Active causative 'have' follows: 'have + Person + V1 (bare infinitive)'. No 'to' should be used.",
    explanationBn: "Active Causative 'Have'-এর পর Object এবং Bare Infinitive বসে ('had the accountant verify', 'to verify' নয়)।"
  },
  {
    id: 24,
    question: "Which of the following inchoative verbs typically pairs with falling into an involuntary condition (sleep, love, ruin)?",
    options: ["Fall (e.g. fall asleep, fall in love, fall ill)", "Turn", "Grow", "Come"],
    correctAnswer: 0,
    explanation: "'Fall' functions as an inchoative copular verb expressing rapid or involuntary transition into a state: 'fall asleep', 'fall ill', 'fall silent'.",
    explanationBn: "'Fall' একটি Inchoative Verb হিসেবে কোনো অবস্থায় আকস্মিক প্রবেশ বোঝায় (fall asleep, fall ill, fall in love)।"
  },
  {
    id: 25,
    question: "Translate accurately into English: 'শিক্ষক মহাশয় ছাত্রটিকে দিয়ে পাঠটি পড়ালেন।'",
    options: [
      "The teacher made the student read the lesson.",
      "The teacher made the student to read the lesson.",
      "The teacher read the student the lesson.",
      "The student made the teacher read."
    ],
    correctAnswer: 0,
    explanation: "Bengali causative 'পড়ানো' corresponds to English active causative 'made the student read' (bare infinitive).",
    explanationBn: "'ছাত্রটিকে দিয়ে পড়ালেন' -> 'The teacher made the student read the lesson' (প্রযোজক ক্রিয়া 'make + Object + V1')।"
  }
];

export default questions;
