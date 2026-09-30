// topic4_questions.js
// Module 001_002 | Topic 4: Direct Objects vs Indirect Objects

const questions = [
  {
    id: 1,
    question: "How do you identify the DIRECT OBJECT in a sentence?",
    options: [
      "Ask 'Verb + What?' or 'Verb + Whom?'",
      "Ask 'Verb + Where?'",
      "Ask 'Verb + When?'",
      "Ask 'Verb + How?'"
    ],
    correctAnswer: 0,
    explanation: "Direct Objects are extracted by asking 'Verb + What?' (things/entities) or 'Verb + Whom?' (persons receiving direct action).",
    explanationBn: "Verb-কে 'কী' বা 'কাকে' (What / Whom) দিয়ে প্রশ্ন করলে Direct Object পাওয়া যায়।"
  },
  {
    id: 2,
    question: "In 'Sukanta Sir gave Swadeep a reference book', what is 'Swadeep'?",
    options: ["Direct Object", "Indirect Object", "Subject Complement", "Object Complement"],
    correctAnswer: 1,
    explanation: "'Swadeep' is the beneficiary person receiving the direct entity ('a reference book'), functioning as the Indirect Object.",
    explanationBn: "'Swadeep' হলো Indirect Object (যাকে বইটি দেওয়া হয়েছে); আর 'a reference book' হলো Direct Object।"
  },
  {
    id: 3,
    question: "Can an Indirect Object exist in a sentence without a Direct Object?",
    options: [
      "No, standard ditransitive verbs require a Direct Object for an Indirect Object to exist",
      "Yes, all verbs have indirect objects",
      "Yes, in intransitive sentences",
      "Only in exclamatory sentences"
    ],
    correctAnswer: 0,
    explanation: "An indirect object represents the recipient/beneficiary of a transferred entity; without a direct object, no transfer occurs.",
    explanationBn: "Direct Object ছাড়া সাধারণত Indirect Object বসতে পারে না, কারণ কোনো বস্তু বা তথ্য হস্তান্তরিত হলেই প্রাপক (Indirect Object) থাকে।"
  },
  {
    id: 4,
    question: "In 'She baked her brother a chocolate cake', what is the Direct Object?",
    options: ["her brother", "a chocolate cake", "baked", "She"],
    correctAnswer: 1,
    explanation: "'A chocolate cake' is what was baked (Direct Object); 'her brother' is for whom it was baked (Indirect Object).",
    explanationBn: "'a chocolate cake' হলো Direct Object (কী বানানো হয়েছে); আর 'her brother' হলো Indirect Object (কার জন্য বানানো হয়েছে)।"
  },
  {
    id: 5,
    question: "What case must personal pronouns take when functioning as Direct or Indirect Objects?",
    options: ["Objective (Accusative / Dative) Case (me, him, her, us, them)", "Nominative Case (I, he, she, we, they)", "Possessive Case", "Vocative Case"],
    correctAnswer: 0,
    explanation: "All objects (direct, indirect, and prepositional) in English strictly require the Objective Case pronoun form.",
    explanationBn: "Direct বা Indirect Object হিসেবে Pronoun সর্বদা Objective Case (me, him, us, them)-এ বসে।"
  },
  {
    id: 6,
    question: "In 'The professor taught mathematics to the students', what is 'to the students'?",
    options: [
      "A Prepositional Phrase functioning as the Prepositional Indirect Object / Dative Complement",
      "Direct Object",
      "Subject Complement",
      "Compound Subject"
    ],
    correctAnswer: 0,
    explanation: "When the direct object precedes the recipient, English uses a prepositional phrase with 'to' or 'for'.",
    explanationBn: "Direct Object আগে বসলে প্রাপকের পূর্বে 'to' বা 'for' বসে Prepositional Object তৈরি হয়।"
  },
  {
    id: 7,
    question: "In 'He kicked the football into the goalpost', what is 'the football'?",
    options: ["Direct Object", "Indirect Object", "Subject Complement", "Adverb"],
    correctAnswer: 0,
    explanation: "'The football' is the physical entity receiving the kinetic action of kicking (Direct Object).",
    explanationBn: "'The football' হলো Direct Object কারণ এটি লাথির সক্রিয় আঘাত সরাসরি গ্রহণ করেছে।"
  },
  {
    id: 8,
    question: "Which of the following verbs is typically DITRANSITIVE (taking two objects: IO + DO)?",
    options: ["Give", "Sleep", "Arrive", "Sit"],
    correctAnswer: 0,
    explanation: "'Give' is a classic ditransitive verb (e.g., 'give him the key').",
    explanationBn: "'Give' একটি Ditransitive Verb যা দুটি Object (IO + DO) গ্রহণ করে।"
  },
  {
    id: 9,
    question: "In 'They sent us an invitation', what is 'us'?",
    options: ["Indirect Object", "Direct Object", "Subject Complement", "Object Complement"],
    correctAnswer: 0,
    explanation: "'Us' is the recipient of the invitation (Indirect Object).",
    explanationBn: "'Us' হলো প্রাপক বা Indirect Object।"
  },
  {
    id: 10,
    question: "Why is the distinction between Direct and Indirect Objects critical for Active-to-Passive voice transformations?",
    options: [
      "Because Ditransitive sentences can produce TWO distinct grammatical passive versions (e.g., 'Swadeep was given a book' or 'A book was given to Swadeep')",
      "Because indirect objects delete verbs in passive voice",
      "Because direct objects cannot be changed into Bengali",
      "Because only indirect objects have tenses"
    ],
    correctAnswer: 0,
    explanation: "A ditransitive active clause can be passivized with either the Indirect Object or Direct Object as the new subject.",
    explanationBn: "Ditransitive বাক্যে দুটি Object থাকায় দুটি ভিন্ন Passive রূপ তৈরি করা যায় (যেমন: 'He was given...' অথবা 'A book was given to him...')।"
  }
];

export default questions;
