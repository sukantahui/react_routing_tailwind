// topic7_questions.js
// Module 001_002 | Topic 7: Object Complements & Complex-Transitive Verbs

const questions = [
  {
    id: 1,
    question: "What is an OBJECT COMPLEMENT in English grammar?",
    options: [
      "A noun, pronoun, or adjective that immediately follows the direct object to rename, describe, or complete its meaning ($Direct Object = Object Complement$)",
      "A complement that modifies the subject",
      "An adverb that modifies the terminal punctuation",
      "A preposition that comes after the verb"
    ],
    correctAnswer: 0,
    explanation: "An object complement completes the predicate by describing or renaming the direct object ($DO = OC$).",
    explanationBn: "Object Complement হলো Direct Object-এর ঠিক পরে বসে তার নতুন পরিচয় বা অবস্থা প্রকাশকারী Noun বা Adjective ($DO = OC$)।"
  },
  {
    id: 2,
    question: "In 'The committee elected Debangshu President', what is 'President'?",
    options: ["Indirect Object", "Direct Object", "Object Complement (Noun)", "Subject Complement"],
    correctAnswer: 2,
    explanation: "'President' renames the direct object 'Debangshu' ($Debangshu = President$). Pattern: SVOC.",
    explanationBn: "'President' শব্দটি Direct Object 'Debangshu'-এর নতুন পদমর্যাদা প্রকাশ করায় এটি Object Complement।"
  },
  {
    id: 3,
    question: "In 'The exciting news made the students happy', what is 'happy'?",
    options: ["Object Complement (Adjective)", "Subject Complement", "Direct Object", "Adverb of Manner"],
    correctAnswer: 0,
    explanation: "'Happy' is an adjective describing the emotional state resulting in the direct object 'the students' ($students = happy$).",
    explanationBn: "'happy' শব্দটি Direct Object 'the students'-এর মানসিক অবস্থা প্রকাশ করায় এটি Adjective Object Complement।"
  },
  {
    id: 4,
    question: "What class of verbs takes an Object Complement following a Direct Object?",
    options: ["Complex-Transitive Verbs (e.g., elect, make, name, call, find, paint, appoint)", "Intransitive Verbs", "Pure Copular Verbs", "Auxiliary Verbs"],
    correctAnswer: 0,
    explanation: "Complex-transitive verbs require both a direct object and an object complement to form a complete semantic clause.",
    explanationBn: "Complex-Transitive Verbs (যেমন: elect, make, name, appoint) অর্থপূর্ণ বাক্য গঠনের জন্য Direct Object এবং Object Complement উভয়ই দাবি করে।"
  },
  {
    id: 5,
    question: "How do you distinguish an SVOO sentence from an SVOC sentence?",
    options: [
      "In SVOO ($IO \\neq DO$), the two objects are TWO DIFFERENT entities (e.g., 'He gave Swadeep [IO] a book [DO]'); in SVOC ($DO = OC$), they refer to the SAME entity (e.g., 'They named him [DO] John [OC]')",
      "By counting the words",
      "By checking if the verb is in past tense",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "The equality test: In SVOO, Person $\\neq$ Thing. In SVOC, Direct Object $==$ Object Complement.",
    explanationBn: "SVOO-তে দুটি পদ আলাদা সত্তা ($IO \\neq DO$); কিন্তু SVOC-তে দুটি পদ একই ব্যক্তি বা সত্তা ($DO = OC$)।"
  },
  {
    id: 6,
    question: "In 'They painted the classroom walls bright blue', what is 'bright blue'?",
    options: ["Object Complement", "Subject Complement", "Direct Object", "Adverb of Place"],
    correctAnswer: 0,
    explanation: "'Bright blue' describes the resulting color of the direct object 'the classroom walls'.",
    explanationBn: "'bright blue' হলো Direct Object 'the classroom walls'-এর রঙের বর্ণনা প্রদানকারী Object Complement।"
  },
  {
    id: 7,
    question: "In 'The jury found the defendant innocent', what pattern does the clause follow?",
    options: ["SVOC (Subject + Verb + Direct Object + Object Complement)", "SVOO", "SVC", "SVO"],
    correctAnswer: 0,
    explanation: "'The jury' (S) + 'found' (V) + 'the defendant' (DO) + 'innocent' (OC). Pattern: SVOC.",
    explanationBn: "এটি SVOC (Subject + Verb + Object + Complement) প্যাটার্নের উদাহরণ।"
  },
  {
    id: 8,
    question: "When an SVOC sentence is converted to PASSIVE VOICE, what does the Object Complement become?",
    options: [
      "It becomes a Subject Complement in the passive clause (e.g., 'Debangshu was elected President')",
      "It becomes the passive subject",
      "It is deleted from the sentence",
      "It turns into an adverb"
    ],
    correctAnswer: 0,
    explanation: "In passive voice, the direct object is promoted to subject, causing the former object complement to function as a subject complement.",
    explanationBn: "Passive Voice-এ Direct Object যখন Subject হয়, তখন Object Complement-টি Subject Complement-এ রূপান্তরিত হয় (যেমন: 'Debangshu was elected President')।"
  },
  {
    id: 9,
    question: "In 'We consider him an honest mentor', what is 'an honest mentor'?",
    options: ["Object Complement (Noun Phrase)", "Direct Object", "Indirect Object", "Adverbial"],
    correctAnswer: 0,
    explanation: "'An honest mentor' defines the identity of 'him' ($him = mentor$).",
    explanationBn: "'an honest mentor' হলো 'him' Object-এর পরিচয়দানকারী Object Complement।"
  },
  {
    id: 10,
    question: "Which of the following sentences exhibits the SVOC pattern?",
    options: [
      "The board appointed Swadeep Chief Technology Officer.",
      "The board gave Swadeep a promotion.",
      "The board celebrated in the hall.",
      "The board is very proud."
    ],
    correctAnswer: 0,
    explanation: "'Swadeep' is the Direct Object, and 'Chief Technology Officer' is the Object Complement renaming him (SVOC).",
    explanationBn: "'Swadeep' হলো Direct Object এবং 'Chief Technology Officer' হলো Object Complement (SVOC)।"
  }
];

export default questions;
