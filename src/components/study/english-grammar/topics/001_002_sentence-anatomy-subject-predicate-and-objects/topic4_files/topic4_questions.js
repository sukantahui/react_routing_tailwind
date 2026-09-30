// topic4_questions.js
// Module 001_002: Sentence Anatomy
// Topic 4: Direct Objects vs Indirect Objects & Ditransitive Mechanics
// 25 Comprehensive Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What is a Direct Object (DO) in an English clause?",
    options: [
      "The noun, pronoun, or nominal phrase that directly receives the action of a transitive verb, answering 'What?' or 'Whom?' after the verb",
      "The person for whose benefit an action is done",
      "The subject complement after a linking verb",
      "A prepositional phrase modifying time"
    ],
    correctAnswer: 0,
    answer: "The noun, pronoun, or nominal phrase that directly receives the action of a transitive verb, answering 'What?' or 'Whom?' after the verb",
    explanation: "A Direct Object receives the verb's transitive energy directly (e.g., 'Swadeep wrote [What?] a compiler').",
    explanationBn: "Direct Object (মুখ্য কর্ম) হলো সকর্মক ক্রিয়ার সরাসরি ফলভোগী পদ, যা ক্রিয়াপদকে 'কী?' (What?) বা 'কাকে?' (Whom?) প্রশ্ন করলে পাওয়া যায়।",
    hint: "Answers 'What?' or 'Whom?' directly after the transitive verb.",
    level: "basic"
  },
  {
    id: 2,
    question: "What is an Indirect Object (IO) in an English clause?",
    options: [
      "The beneficiary or recipient of the direct object, answering 'To whom?' or 'For whom?' the action was performed",
      "The subject complement following a linking verb",
      "The main finite verb phrase",
      "The first word of the sentence"
    ],
    correctAnswer: 0,
    answer: "The beneficiary or recipient of the direct object, answering 'To whom?' or 'For whom?' the action was performed",
    explanation: "An Indirect Object receives the direct object (e.g., 'Swadeep gave [To whom?] Debangshu [IO] the documentation [DO]').",
    explanationBn: "Indirect Object (গৌণ কর্ম) হলো Direct Object-এর গ্রহীতা বা সুবিধাভোগী, যা ক্রিয়াপদকে 'কাকে/কার জন্য?' (To/For whom?) প্রশ্ন করলে পাওয়া যায়।",
    hint: "The recipient answering 'To whom?' or 'For whom?'.",
    level: "basic"
  },
  {
    id: 3,
    question: "In the sentence 'Mentor Sukanta Sir taught Swadeep advanced algorithms', what are the objects?",
    options: [
      "Indirect Object: 'Swadeep'; Direct Object: 'advanced algorithms'",
      "Direct Object: 'Swadeep'; Indirect Object: 'advanced algorithms'",
      "Subject: 'Swadeep'; Direct Object: 'advanced algorithms'",
      "Direct Object: 'Sukanta Sir'; Indirect Object: 'Swadeep'"
    ],
    correctAnswer: 0,
    answer: "Indirect Object: 'Swadeep'; Direct Object: 'advanced algorithms'",
    explanation: "'Advanced algorithms' is what was taught (Direct Object); 'Swadeep' is the person to whom it was taught (Indirect Object).",
    explanationBn: "'advanced algorithms' হলো কী পড়ানো হলো (Direct Object) এবং 'Swadeep' হলো কাকে পড়ানো হলো (Indirect Object)।",
    hint: "What was taught? (DO) To whom was it taught? (IO).",
    level: "basic"
  },
  {
    id: 4,
    question: "Can an Indirect Object exist in a sentence WITHOUT a Direct Object in standard English?",
    options: [
      "No, a true indirect object only exists when there is a direct object being transferred or provided",
      "Yes, every sentence must have an indirect object",
      "Yes, with intransitive verbs",
      "Only in questions"
    ],
    correctAnswer: 0,
    answer: "No, a true indirect object only exists when there is a direct object being transferred or provided",
    explanation: "By definition, an indirect object is the recipient of a direct object. If there is only one object (e.g., 'He helped Swadeep'), that single object is the Direct Object.",
    explanationBn: "না, Direct Object ছাড়া কোনো Indirect Object থাকতে পারে না। বাক্যে যদি একটিমাত্র কর্ম থাকে (যেমন: 'He helped Swadeep'), তবে সেটি সর্বদা Direct Object।",
    hint: "An indirect object requires a direct object to be transferred.",
    level: "intermediate"
  },
  {
    id: 5,
    question: "In the sentence 'Debangshu baked Tuhina a celebratory cake', identify the Direct Object:",
    options: ["a celebratory cake", "Tuhina", "Debangshu", "baked"],
    correctAnswer: 0,
    answer: "a celebratory cake",
    explanation: "'A celebratory cake' is what was baked (Direct Object). 'Tuhina' is the beneficiary for whom it was baked (Indirect Object).",
    explanationBn: "'a celebratory cake' হলো কী বেক করা হলো (Direct Object) এবং 'Tuhina' হলো কার জন্য করা হলো (Indirect Object)।",
    hint: "What did Debangshu bake?",
    level: "basic"
  },
  {
    id: 6,
    question: "What case must a pronoun take when functioning as either a Direct or Indirect Object?",
    options: ["Objective (Accusative/Dative) Case (me, him, her, us, them)", "Subjective (Nominative) Case", "Possessive Case", "Vocative Case"],
    correctAnswer: 0,
    answer: "Objective (Accusative/Dative) Case (me, him, her, us, them)",
    explanation: "Both direct and indirect objects strictly require the objective case pronouns ('She gave him [IO] them [DO]').",
    explanationBn: "Direct ও Indirect উভয় কর্মের ক্ষেত্রে Pronoun সর্বদা Objective Case (me, him, her, us, them) গ্রহণ করে।",
    hint: "Objective case pronouns (him, her, me, them).",
    level: "basic"
  },
  {
    id: 7,
    question: "What is a Ditransitive Verb?",
    options: [
      "A transitive verb that licenses TWO objects simultaneously: an Indirect Object and a Direct Object (e.g., give, tell, send, buy, show, teach)",
      "A verb with two subjects",
      "A verb that has no passive voice",
      "An intransitive verb used twice"
    ],
    correctAnswer: 0,
    answer: "A transitive verb that licenses TWO objects simultaneously: an Indirect Object and a Direct Object (e.g., give, tell, send, buy, show, teach)",
    explanation: "Ditransitive verbs (give, send, lend, tell, teach, buy, pass) take both an IO (recipient) and a DO (thing transferred).",
    explanationBn: "Ditransitive Verb (দ্বিকর্মক ক্রিয়া) হলো এমন ক্রিয়া যা একসাথে দুটি কর্ম (Indirect Object + Direct Object) গ্রহণ করে (যেমন: give, send, teach, show)।",
    hint: "Takes both an indirect and a direct object.",
    level: "basic"
  },
  {
    id: 8,
    question: "In the sentence 'Abhronila told a fascinating story to the children', what is the syntactic status of 'to the children'?",
    options: [
      "A Prepositional Phrase acting as the recipient (Dative Prepositional Complement), replacing the preverbal Indirect Object position",
      "A Direct Object",
      "A Subject Complement",
      "An Object Complement"
    ],
    correctAnswer: 0,
    answer: "A Prepositional Phrase acting as the recipient (Dative Prepositional Complement), replacing the preverbal Indirect Object position",
    explanation: "When the recipient follows the preposition 'to' or 'for', it functions grammatically as a Prepositional Object / Complement expressing the dative role.",
    explanationBn: "'to the children' হলো Prepositional Phrase যা 'to' Preposition-এর মাধ্যমে Indirect Object-এর সমতুল্য অর্থ প্রকাশ করছে।",
    hint: "Prepositional phrase with 'to' denoting the recipient.",
    level: "intermediate"
  },
  {
    id: 9,
    question: "Which of the following sentences exhibits the S + V + IO + DO pattern?",
    options: [
      "The mentor granted Swadeep permission.",
      "The mentor granted permission to Swadeep.",
      "Swadeep was granted permission.",
      "Permission was granted to Swadeep."
    ],
    correctAnswer: 0,
    answer: "The mentor granted Swadeep permission.",
    explanation: "Subject ('The mentor') + Verb ('granted') + Indirect Object ('Swadeep') + Direct Object ('permission').",
    explanationBn: "Subject ('The mentor') + Verb ('granted') + IO ('Swadeep') + DO ('permission') — এটি সঠিক SVOO রূপ।",
    hint: "IO precedes DO without any preposition.",
    level: "basic"
  },
  {
    id: 10,
    question: "In the sentence 'She asked me a difficult question', identify the Direct Object and Indirect Object:",
    options: [
      "Indirect Object: 'me'; Direct Object: 'a difficult question'",
      "Direct Object: 'me'; Indirect Object: 'a difficult question'",
      "Direct Object: 'She'; Indirect Object: 'me'",
      "Direct Object: 'asked'; Indirect Object: 'me'"
    ],
    correctAnswer: 0,
    answer: "Indirect Object: 'me'; Direct Object: 'a difficult question'",
    explanation: "'A difficult question' is what was asked (DO); 'me' is to whom it was asked (IO).",
    explanationBn: "'a difficult question' হলো Direct Object এবং 'me' হলো Indirect Object।",
    hint: "What was asked? (DO) Of whom? (IO).",
    level: "basic"
  },
  {
    id: 11,
    question: "In the sentence 'He resembles his father', why is 'his father' a Direct Object and NOT an Indirect Object?",
    options: [
      "'Resemble' is a monotransitive stative verb that takes only a single direct object completing its meaning",
      "Because father is older",
      "Because resemble is a linking verb",
      "Because father cannot be an indirect object"
    ],
    correctAnswer: 0,
    answer: "'Resemble' is a monotransitive stative verb that takes only a single direct object completing its meaning",
    explanation: "'Resemble' takes one object (DO). A sentence with only one object cannot have an indirect object.",
    explanationBn: "'Resemble' একটি Monotransitive Verb যার একটিমাত্র কর্ম (Direct Object) থাকে।",
    hint: "Single object verbs take only a direct object.",
    level: "intermediate"
  },
  {
    id: 12,
    question: "In 'Swadeep bought his sister a graphics tablet', transform the sentence into the 'for' prepositional pattern:",
    options: [
      "Swadeep bought a graphics tablet for his sister.",
      "Swadeep bought to his sister a graphics tablet.",
      "Swadeep bought for his sister a graphics tablet.",
      "Swadeep bought a graphics tablet to his sister."
    ],
    correctAnswer: 0,
    answer: "Swadeep bought a graphics tablet for his sister.",
    explanation: "Verbs of creation / purchase (buy, bake, cook, make, build) take the preposition 'for' when the recipient follows the direct object.",
    explanationBn: "তৈরি বা কেনাকাটা প্রকাশক Verbs (buy, bake, make)-এর ক্ষেত্রে Recipient পরে বসলে 'for' Preposition ব্যবহৃত হয় ('bought ... for his sister')।",
    hint: "Verbs of buying/creating use 'for', not 'to'.",
    level: "intermediate"
  },
  {
    id: 13,
    question: "Which class of ditransitive verbs takes 'TO' when the recipient follows the direct object?",
    options: [
      "Verbs of transfer / communication (give, send, lend, tell, show, hand, pay, write)",
      "Verbs of creation / cooking (bake, cook, build)",
      "Verbs of emotion (love, hate)",
      "Verbs of motion (run, walk)"
    ],
    correctAnswer: 0,
    answer: "Verbs of transfer / communication (give, send, lend, tell, show, hand, pay, write)",
    explanation: "Transfer/communication verbs take 'to' (e.g., 'give to', 'send to', 'show to'). Creation/procurement verbs take 'for' (e.g., 'buy for', 'make for').",
    explanationBn: "হস্তান্তর বা বার্তা প্রেরণমূলক ক্রিয়ায় 'to' বসে ('give to', 'send to'), কিন্তু তৈরি বা সংগ্রহমূলক ক্রিয়ায় 'for' বসে ('buy for', 'cook for')।",
    hint: "Transfer/communication verbs use 'to'.",
    level: "intermediate"
  },
  {
    id: 14,
    question: "In the sentence 'Debangshu promised me his undivided attention', what is 'his undivided attention'?",
    options: ["Direct Object (What was promised)", "Indirect Object", "Subject Complement", "Object Complement"],
    correctAnswer: 0,
    answer: "Direct Object (What was promised)",
    explanation: "'His undivided attention' is the thing promised (Direct Object). 'Me' is the recipient (Indirect Object).",
    explanationBn: "'his undivided attention' হলো প্রতিশ্রুত বিষয় (Direct Object) এবং 'me' হলো গ্রহীতা (Indirect Object)।",
    hint: "What did he promise?",
    level: "basic"
  },
  {
    id: 15,
    question: "In 'The mentor assigned the students three coding challenges', what is 'the students'?",
    options: ["Indirect Object (Recipient)", "Direct Object", "Subject Complement", "Appositive"],
    correctAnswer: 0,
    answer: "Indirect Object (Recipient)",
    explanation: "'The students' is the recipient group (IO) to whom the challenges (DO) were assigned.",
    explanationBn: "'the students' হলো Indirect Object যাদেরকে তিনটি কোডিং চ্যালেঞ্জ দেওয়া হয়েছিল।",
    hint: "To whom were the challenges assigned?",
    level: "basic"
  },
  {
    id: 16,
    question: "What is a major difference between a Direct Object and a Subject Complement?",
    options: [
      "A Direct Object receives the action of a transitive verb and is a different entity from the subject; a Subject Complement follows a linking verb and renames/describes the subject itself",
      "They are identical",
      "Subject complements only appear in past tense",
      "Direct objects only modify adverbs"
    ],
    correctAnswer: 0,
    answer: "A Direct Object receives the action of a transitive verb and is a different entity from the subject; a Subject Complement follows a linking verb and renames/describes the subject itself",
    explanation: "Compare: 'Swadeep created an app' (App != Swadeep -> Direct Object) vs 'Swadeep is a programmer' (Programmer == Swadeep -> Subject Complement).",
    explanationBn: "Direct Object কর্তার চেয়ে ভিন্ন কোনো সত্তা যা ক্রিয়ার ফল ভোগ করে; কিন্তু Subject Complement হলো কর্তারই অন্য একটি নাম বা গুণ যা Linking Verb-এর পর বসে (যেমন: 'He is a teacher')।",
    hint: "Transitive action (DO) vs equality/linking (Subject Complement).",
    level: "advanced"
  },
  {
    id: 17,
    question: "In the sentence 'Debangshu became an accomplished software architect', what is 'an accomplished software architect'?",
    options: [
      "Subject Complement (Predicate Noun renaming Debangshu after the linking verb 'became')",
      "Direct Object",
      "Indirect Object",
      "Object Complement"
    ],
    correctAnswer: 0,
    answer: "Subject Complement (Predicate Noun renaming Debangshu after the linking verb 'became')",
    explanation: "'Became' is a linking/copular verb showing transition of state. 'An accomplished software architect' refers back to 'Debangshu' (Subject Complement), not a direct object.",
    explanationBn: "'became' একটি Linking Verb; তাই 'an accomplished software architect' হলো Subject Complement ('Debangshu'-র পরিচয়), Direct Object নয়।",
    hint: "Follows the linking verb 'became' and renames the subject.",
    level: "intermediate"
  },
  {
    id: 18,
    question: "Which of the following sentences contains BOTH a Direct Object and an Indirect Object?",
    options: [
      "Sukanta Sir offered Abhronila an internship recommendation.",
      "Sukanta Sir praised Abhronila enthusiastically.",
      "Abhronila became a research intern.",
      "Abhronila arrived early at the seminar."
    ],
    correctAnswer: 0,
    answer: "Sukanta Sir offered Abhronila an internship recommendation.",
    explanation: "IO = 'Abhronila'; DO = 'an internship recommendation'.",
    explanationBn: "IO ('Abhronila') + DO ('an internship recommendation') — উভয় কর্মই এই বাক্যে উপস্থিত।",
    hint: "Look for ditransitive 'offered'.",
    level: "basic"
  },
  {
    id: 19,
    question: "In 'The professor taught mathematics for thirty years', what is 'for thirty years'?",
    options: [
      "An Adverbial Prepositional Phrase of Duration (NOT an object)",
      "An Indirect Object",
      "A Direct Object",
      "An Object Complement"
    ],
    correctAnswer: 0,
    answer: "An Adverbial Prepositional Phrase of Duration (NOT an object)",
    explanation: "'For thirty years' answers 'How long?' (Duration Adverbial), not 'To whom/For whom?' as an indirect object.",
    explanationBn: "'for thirty years' সময়কালের ব্যাপ্তি (Duration Adverbial) প্রকাশ করে, কোনো Indirect Object নয়।",
    hint: "Answers 'How long?', not 'To whom?'.",
    level: "intermediate"
  },
  {
    id: 20,
    question: "In the sentence 'Swadeep fed the hungry puppy some fresh milk', identify the Direct Object:",
    options: ["some fresh milk", "the hungry puppy", "Swadeep", "fed"],
    correctAnswer: 0,
    answer: "some fresh milk",
    explanation: "'Some fresh milk' is what was given as food (Direct Object). 'The hungry puppy' is the recipient (Indirect Object).",
    explanationBn: "'some fresh milk' হলো Direct Object এবং 'the hungry puppy' হলো Indirect Object।",
    hint: "What was fed to the puppy?",
    level: "basic"
  },
  {
    id: 21,
    question: "Why can't intransitive verbs (like arrive, sleep, laugh, sit) take a Direct Object?",
    options: [
      "Because their action is self-contained within the subject and does not pass over to any external receiver",
      "Because they only exist in Bengali",
      "Because they only have three letters",
      "Because they are always followed by adjectives"
    ],
    correctAnswer: 0,
    answer: "Because their action is self-contained within the subject and does not pass over to any external receiver",
    explanation: "Intransitive verbs express states or actions that do not act upon a receiver (e.g., 'The baby slept soundly').",
    explanationBn: "অকর্মক ক্রিয়ার (Intransitive Verb) কাজের প্রভাব কর্তার মধ্যেই সীমাবদ্ধ থাকে, কোনো বহিরাগত কর্মের ওপর স্থানান্তরিত হয় না।",
    hint: "Action does not pass to an external object.",
    level: "basic"
  },
  {
    id: 22,
    question: "In 'She handed me the confidential dossier', if we convert this sentence to passive voice starting with the Direct Object, what is the result?",
    options: [
      "The confidential dossier was handed to me by her.",
      "The confidential dossier was handed me by her.",
      "I was handed the confidential dossier by her.",
      "Me was handed the confidential dossier."
    ],
    correctAnswer: 0,
    answer: "The confidential dossier was handed to me by her.",
    explanation: "When the Direct Object becomes the passive subject, the indirect recipient is retained with the preposition 'to' ('was handed to me').",
    explanationBn: "Direct Object দিয়ে Passive শুরু করলে Indirect Object-এর পূর্বে 'to' বসে: 'The confidential dossier was handed to me by her'।",
    hint: "The recipient requires 'to' when the DO becomes the subject.",
    level: "advanced"
  },
  {
    id: 23,
    question: "In 'She handed me the confidential dossier', if we convert this sentence to passive voice starting with the Indirect Object, what is the result?",
    options: [
      "I was handed the confidential dossier by her.",
      "Me was handed the confidential dossier.",
      "To me was handed the confidential dossier.",
      "I was handed by her."
    ],
    correctAnswer: 0,
    answer: "I was handed the confidential dossier by her.",
    explanation: "When the Indirect Object 'me' becomes the passive subject, it shifts to subjective case 'I', retaining the direct object as a Retained Object.",
    explanationBn: "Indirect Object ('me') Subject হলে তা 'I' রূপ নেয় এবং Direct Object-টি Retained Object হিসেবে থেকে যায়: 'I was handed the confidential dossier by her'।",
    hint: "Indirect object 'me' becomes subject 'I'.",
    level: "advanced"
  },
  {
    id: 24,
    question: "In the sentence 'Debangshu wrote a heartfelt letter to his parents', what is 'a heartfelt letter'?",
    options: ["Direct Object", "Indirect Object", "Subject Complement", "Prepositional Complement"],
    correctAnswer: 0,
    answer: "Direct Object",
    explanation: "'A heartfelt letter' is the direct object of 'wrote'. 'To his parents' is a prepositional phrase expressing the recipient.",
    explanationBn: "'a heartfelt letter' হলো 'wrote' Verb-এর Direct Object।",
    hint: "What did Debangshu write?",
    level: "basic"
  },
  {
    id: 25,
    question: "What is the key diagnostic question pair taught by Mentor Sukanta Hui to identify Direct vs Indirect Objects?",
    options: [
      "Direct Object: Ask 'VERB + WHAT? / WHOM?'; Indirect Object: Ask 'TO WHOM? / FOR WHOM?'",
      "Direct Object: Ask 'WHEN?'; Indirect Object: Ask 'WHERE?'",
      "Direct Object: Ask 'WHY?'; Indirect Object: Ask 'HOW?'",
      "Direct Object: Ask 'WHO?'; Indirect Object: Ask 'WHICH?'"
    ],
    correctAnswer: 0,
    answer: "Direct Object: Ask 'VERB + WHAT? / WHOM?'; Indirect Object: Ask 'TO WHOM? / FOR WHOM?'",
    explanation: "Sukanta Sir's infallible test: Verb + What? -> Direct Object (Thing). Verb + To/For Whom? -> Indirect Object (Recipient).",
    explanationBn: "সুকান্ত স্যারের নিখুঁত সূত্র: ক্রিয়া + কী? (What?) = Direct Object (বস্তু); ক্রিয়া + কাকে/কার জন্য? (To/For whom?) = Indirect Object (গ্রহীতা)।",
    hint: "Verb + What? = DO; Verb + To/For whom? = IO.",
    level: "basic"
  }
];

export default questions;
