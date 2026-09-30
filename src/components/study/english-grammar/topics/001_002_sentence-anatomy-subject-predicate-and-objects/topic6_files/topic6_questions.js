// topic6_questions.js
// Module 001_002 | Topic 6: Subject Complements & Linking Verbs

const questions = [
  {
    id: 1,
    question: "What is the primary role of a SUBJECT COMPLEMENT in English syntax?",
    options: [
      "To rename, classify, or describe the subject following a linking/copular verb",
      "To receive the direct action of a transitive verb",
      "To modify the terminal punctuation",
      "To act as an interjection"
    ],
    correctAnswer: 0,
    explanation: "Subject complements complete the predicate by defining or qualifying the subject across an equative/linking verb ($Subject = Complement$).",
    explanationBn: "Subject Complement মূলত Linking Verb-এর পর বসে Subject-এর পরিচয় পূর্ণ বা তার গুণ প্রকাশ করে ($Subject = Complement$)।"
  },
  {
    id: 2,
    question: "In 'Abhronila is an exceptional researcher', what is 'an exceptional researcher'?",
    options: ["Direct Object", "Predicate Noun (Subject Complement)", "Object Complement", "Adverb"],
    correctAnswer: 1,
    explanation: "It is a predicate noun renaming the subject 'Abhronila' ($Abhronila = researcher$).",
    explanationBn: "এটি একটি Predicate Noun (Subject Complement), কারণ 'Abhronila' এবং 'researcher' একই ব্যক্তি।"
  },
  {
    id: 3,
    question: "In 'The fresh mangoes taste sweet', what is 'sweet'?",
    options: ["Direct Object", "Predicate Adjective (Subject Complement)", "Adverb of Manner", "Indirect Object"],
    correctAnswer: 1,
    explanation: "'Sweet' is a predicate adjective qualifying 'mangoes' through the sensory linking verb 'taste'.",
    explanationBn: "'Taste' Sensory Linking Verb-এর পর 'sweet' হলো Predicate Adjective (Subject Complement)।"
  },
  {
    id: 4,
    question: "Which test decisively differentiates a Direct Object from a Subject Complement?",
    options: [
      "The Equality Test: In SVC ($Subject = Complement$), they refer to the SAME entity; in SVO ($Subject \\neq Object$), they are TWO distinct entities",
      "Counting vowels",
      "Checking the length of the verb",
      "Translating the sentence into Bengali"
    ],
    correctAnswer: 0,
    explanation: "Equality test: 'He is a doctor' ($He = Doctor \\rightarrow SVC$); 'He met a doctor' ($He \\neq Doctor \\rightarrow SVO$).",
    explanationBn: "Equality Test: Subject এবং Complement একই সত্তা ($He = Doctor$); কিন্তু Subject ও Direct Object দুটি আলাদা সত্তা ($He \\neq Doctor$)।"
  },
  {
    id: 5,
    question: "Can an SVC (Subject + Linking Verb + Subject Complement) sentence be converted into PASSIVE VOICE?",
    options: [
      "No, never. Passive voice strictly requires a transitive action verb acting on a direct object",
      "Yes, always",
      "Only in past tense",
      "Only if the complement is plural"
    ],
    correctAnswer: 0,
    explanation: "Linking verbs express state/identity without action transfer; therefore, SVC clauses have no direct object and cannot be passivized.",
    explanationBn: "Linking Verb কোনো কাজ হস্তান্তর করে না এবং এতে কোনো Direct Object থাকে না, তাই SVC বাক্যের Passive Voice অসম্ভব।"
  },
  {
    id: 6,
    question: "Which of the following verbs functions as an INCHOATIVE / LINKING verb expressing a change of state?",
    options: ["Turned (in 'The milk turned sour')", "Kicked", "Wrote", "Built"],
    correctAnswer: 0,
    explanation: "'Turned' functions as an inchoative copula meaning 'became' ($The milk = sour$).",
    explanationBn: "'The milk turned sour'-এ 'turned' হলো Linking Verb যার অর্থ 'became'।"
  },
  {
    id: 7,
    question: "In 'The soup smells deliciously', why is there a grammatical error?",
    options: [
      "Sensory verbs take Subject Complement Adjectives ('delicious'), not adverbs of manner",
      "'Deliciously' is misspelled",
      "'Smells' is not a verb",
      "The subject is missing"
    ],
    correctAnswer: 0,
    explanation: "The soup is not performing the physical action of smelling; it possesses the olfactory quality of being 'delicious' (SVC).",
    explanationBn: "Soup নিজে কোনো ঘ্রাণ নেওয়ার কাজ করছে না, তাই Adverb-এর পরিবর্তে Subject Complement Adjective ('delicious') বসবে।"
  },
  {
    id: 8,
    question: "In 'The jury remained silent throughout the trial', what is 'silent'?",
    options: ["Subject Complement", "Direct Object", "Object Complement", "Adverb of Place"],
    correctAnswer: 0,
    explanation: "'Remained' is a copula expressing continuing state; 'silent' is a predicate adjective subject complement.",
    explanationBn: "'Remained' Linking Verb-এর পর 'silent' হলো Subject Complement।"
  },
  {
    id: 9,
    question: "Which group consists ENTIRELY of common Linking (Copular) Verbs?",
    options: [
      "be, become, seem, appear, look, taste, feel, smell, sound, remain",
      "kick, hit, throw, catch, run, build",
      "eat, drink, write, read, drive",
      "fly, swim, dive, jump"
    ],
    correctAnswer: 0,
    explanation: "All listed verbs express states, identities, sensory qualities, or perceptions acting as copulas.",
    explanationBn: "be, become, seem, look, taste, feel, sound, remain — এরা সবাই বহুল ব্যবহৃত Linking Verbs।"
  },
  {
    id: 10,
    question: "In 'That statement sounds true', what syntactic pattern is exhibited?",
    options: ["SVC (Subject + Verb + Subject Complement)", "SVO (Subject + Verb + Object)", "SVOO", "SVOC"],
    correctAnswer: 0,
    explanation: "'That statement' (S) + 'sounds' (V - Linking) + 'true' (C - Predicate Adjective).",
    explanationBn: "এটি SVC (Subject + Verb + Subject Complement) প্যাটার্নের উদাহরণ।"
  }
];

export default questions;
