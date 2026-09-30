// topic3_questions.js
// Module 001_002: Sentence Anatomy
// Topic 3: The Simple Predicate (Verb Phrase) vs Complete Predicate
// 25 Comprehensive Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What is the Simple Predicate in an English sentence?",
    options: [
      "The essential finite verb or complete verb phrase (including auxiliaries and modals) that asserts the action, event, or state",
      "The direct object of the verb",
      "The last word of the sentence",
      "The prepositional phrase following the subject"
    ],
    correctAnswer: 0,
    answer: "The essential finite verb or complete verb phrase (including auxiliaries and modals) that asserts the action, event, or state",
    explanation: "The Simple Predicate consists strictly of the verb itself (lexical verb + any auxiliary/modal verbs), stripped of objects, complements, and adverbial modifiers.",
    explanationBn: "Simple Predicate হলো সমস্ত Object ও Modifier বাদ দিয়ে শুধুমাত্র মূল ক্রিয়াপদ ও সাহায্যকারী ক্রিয়া নিয়ে গঠিত Verb Phrase।",
    hint: "The core verb phrase alone.",
    level: "basic"
  },
  {
    id: 2,
    question: "In the sentence 'Swadeep has been diligently coding the full-stack web application all evening', what is the SIMPLE PREDICATE?",
    options: [
      "'has been coding'",
      "'has been diligently coding'",
      "'coding'",
      "'coding the full-stack web application'"
    ],
    correctAnswer: 0,
    answer: "'has been coding'",
    explanation: "The complete verb phrase consists of auxiliary 'has' + auxiliary 'been' + present participle 'coding'. The adverb 'diligently' is part of the complete predicate, not the simple predicate verb phrase.",
    explanationBn: "Simple Predicate হলো মূল Verb Phrase 'has been coding'; মধ্যবর্তী Adverb 'diligently' হলো Modifier, যা Simple Predicate-এর অংশ নয়।",
    hint: "Exclude the adverb 'diligently' to isolate the verb phrase.",
    level: "intermediate"
  },
  {
    id: 3,
    question: "In the sentence 'Swadeep has been diligently coding the full-stack web application all evening', what is the COMPLETE PREDICATE?",
    options: [
      "'has been diligently coding the full-stack web application all evening'",
      "'has been coding'",
      "'diligently coding'",
      "'the full-stack web application all evening'"
    ],
    correctAnswer: 0,
    answer: "'has been diligently coding the full-stack web application all evening'",
    explanation: "The Complete Predicate encompasses the entire verbal assertion: the verb phrase ('has been coding'), manner adverb ('diligently'), direct object ('the full-stack web application'), and time adverb ('all evening').",
    explanationBn: "Complete Predicate হলো ক্রিয়া এবং তার সাথে যুক্ত সমস্ত কর্ম ও বিশেষণ সম্বলিত সম্পূর্ণ বিধেয় অংশ।",
    hint: "The entire predicate from the first helping verb to the end of the clause.",
    level: "basic"
  },
  {
    id: 4,
    question: "What is a Discontinuous Verb Phrase (Split Predicate)?",
    options: [
      "A verb phrase where an adverb, negative particle, or subject interrupts the auxiliary and main lexical verbs (e.g., 'He has [always] arrived on time')",
      "A verb phrase broken into two different sentences",
      "A verb translated from Bengali",
      "A past tense verb with two vowels"
    ],
    correctAnswer: 0,
    answer: "A verb phrase where an adverb, negative particle, or subject interrupts the auxiliary and main lexical verbs (e.g., 'He has [always] arrived on time')",
    explanation: "When adverbs (always, never, not) or subjects (in questions) stand between auxiliary and main verbs, the simple predicate is split or discontinuous.",
    explanationBn: "যখন কোনো Adverb ('always', 'never') বা 'not' সাহায্যকারী ক্রিয়া ও মূল ক্রিয়ার মাঝে বসে, তখন তাকে Discontinuous Verb Phrase বা Split Predicate বলা হয়।",
    hint: "An intervening adverb splits the helping verb from the main verb.",
    level: "intermediate"
  },
  {
    id: 5,
    question: "In the question 'Did Tuhina complete the assignment on time?', what is the Simple Predicate?",
    options: [
      "'Did complete' (discontinuous verb phrase split by the subject 'Tuhina')",
      "'Did'",
      "'complete'",
      "'complete the assignment'"
    ],
    correctAnswer: 0,
    answer: "'Did complete' (discontinuous verb phrase split by the subject 'Tuhina')",
    explanation: "In questions, the auxiliary 'Did' and base verb 'complete' together form the simple predicate, separated by the subject 'Tuhina'.",
    explanationBn: "প্রশ্নবোধক বাক্যে 'Did' এবং 'complete' একসাথে মিলে Simple Predicate গঠন করে, যা Subject 'Tuhina' দ্বারা বিভক্ত।",
    hint: "Combine the auxiliary and the lexical verb.",
    level: "intermediate"
  },
  {
    id: 6,
    question: "In negative clauses like 'Debangshu does not understand the bug', is 'not' part of the Simple Predicate verb phrase?",
    options: [
      "No, 'not' is a negative adverb / particle modifying the verb; the simple predicate is 'does understand'",
      "Yes, 'not' is a lexical verb",
      "Yes, 'not' is an auxiliary verb",
      "Only in American English"
    ],
    correctAnswer: 0,
    answer: "No, 'not' is a negative adverb / particle modifying the verb; the simple predicate is 'does understand'",
    explanation: "'Not' is an adverb of negation. The grammatical verb phrase (Simple Predicate) is 'does understand'.",
    explanationBn: "'not' কোনো Verb নয়, এটি একটি Negative Adverb; তাই Simple Predicate হলো 'does understand'।",
    hint: "'Not' is an adverbial particle of negation.",
    level: "advanced"
  },
  {
    id: 7,
    question: "What is a Compound Predicate in sentence anatomy?",
    options: [
      "A predicate containing two or more finite verbs joined by a conjunction, sharing the same subject without repeating it (e.g., 'Abhronila studied hard and won the scholarship')",
      "A predicate with two direct objects",
      "A predicate containing a noun and an adjective",
      "A passive voice construction"
    ],
    correctAnswer: 0,
    answer: "A predicate containing two or more finite verbs joined by a conjunction, sharing the same subject without repeating it (e.g., 'Abhronila studied hard and won the scholarship')",
    explanation: "A single subject governing multiple coordinate finite verbs constitutes a Compound Predicate.",
    explanationBn: "একই Subject যখন একাধিক Finite Verb সম্পাদন করে (যেমন: 'studied hard and won the scholarship'), তখন তাকে Compound Predicate বলে।",
    hint: "Two or more verbs sharing a single subject.",
    level: "basic"
  },
  {
    id: 8,
    question: "Which of the following sentences features a Compound Predicate?",
    options: [
      "Swadeep analyzed the problem, designed an algorithm, and tested the solution.",
      "Swadeep and Debangshu analyzed the problem.",
      "Swadeep analyzed the problem with great care.",
      "The problem was analyzed by Swadeep."
    ],
    correctAnswer: 0,
    answer: "Swadeep analyzed the problem, designed an algorithm, and tested the solution.",
    explanation: "The single subject 'Swadeep' governs three coordinate predicates: 'analyzed...', 'designed...', and 'tested...'.",
    explanationBn: "একক Subject 'Swadeep' তিনটি সমন্বিত ক্রিয়া ('analyzed', 'designed', 'tested') পরিচালনা করায় এটি Compound Predicate।",
    hint: "Look for one subject performing three coordinate actions.",
    level: "basic"
  },
  {
    id: 9,
    question: "Why should a comma NOT be placed between the two verbs of a simple compound predicate (e.g., *'Swadeep coded, and tested the app')?",
    options: [
      "A coordinating conjunction joining two verbs sharing the same subject does not require a comma; commas are only needed when joining two complete independent clauses with separate subjects",
      "Commas are forbidden with 'and'",
      "Because 'tested' is in the past tense",
      "It is acceptable to place commas anywhere"
    ],
    correctAnswer: 0,
    answer: "A coordinating conjunction joining two verbs sharing the same subject does not require a comma; commas are only needed when joining two complete independent clauses with separate subjects",
    explanation: "Do not separate compound verbs with a comma unless there are three or more items in a series. 'He coded and tested' is correct.",
    explanationBn: "একই Subject-এর দুটি Verb 'and' দ্বারা যুক্ত হলে মাঝে কমা বসে না (যেমন: 'He coded and tested'); কিন্তু দুটি পৃথক Subject যুক্ত Independent Clause হলে কমা বসাতে হয়।",
    hint: "No comma between two elements of a compound predicate.",
    level: "advanced"
  },
  {
    id: 10,
    question: "In the sentence 'The ancient manuscript was discovered beneath the monastery ruins', identify the Simple Predicate:",
    options: ["was discovered", "was", "discovered", "was discovered beneath the monastery ruins"],
    correctAnswer: 0,
    answer: "was discovered",
    explanation: "'Was discovered' is the complete passive verb phrase consisting of auxiliary 'was' + past participle 'discovered'.",
    explanationBn: "Passive Voice-এ সাহায্যকারী ক্রিয়া 'was' এবং Past Participle 'discovered' মিলে Simple Predicate 'was discovered' গঠিত হয়েছে।",
    hint: "Auxiliary 'was' + past participle 'discovered'.",
    level: "basic"
  },
  {
    id: 11,
    question: "In 'The students might have been studying during the storm', how many verbs compose the Simple Predicate?",
    options: [
      "Four verbs: modal 'might' + auxiliary 'have' + auxiliary 'been' + main verb 'studying'",
      "One verb only",
      "Two verbs",
      "Three verbs"
    ],
    correctAnswer: 0,
    answer: "Four verbs: modal 'might' + auxiliary 'have' + auxiliary 'been' + main verb 'studying'",
    explanation: "The full 4-verb chain 'might have been studying' forms the single complex Simple Predicate.",
    explanationBn: "Modal 'might' + Aux 'have' + Aux 'been' + Main Verb 'studying' — এই ৪টি পদ মিলে একটি সম্পূর্ণ Simple Predicate গঠিত হয়েছে।",
    hint: "Count all modal, auxiliary, and main verb elements in the chain.",
    level: "intermediate"
  },
  {
    id: 12,
    question: "In the sentence 'The rose smells sweet', what is the Simple Predicate?",
    options: ["smells", "smells sweet", "sweet", "rose smells"],
    correctAnswer: 0,
    answer: "smells",
    explanation: "'Smells' is the single linking verb acting as the simple predicate. 'Sweet' is the subject complement adjective.",
    explanationBn: "'smells' হলো মূল Linking Verb (Simple Predicate); 'sweet' হলো Subject Complement।",
    hint: "The linking verb alone.",
    level: "basic"
  },
  {
    id: 13,
    question: "In 'Debangshu quickly and accurately solved the mathematical theorem', what is the Complete Predicate?",
    options: [
      "'quickly and accurately solved the mathematical theorem'",
      "'solved'",
      "'solved the mathematical theorem'",
      "'quickly and accurately solved'"
    ],
    correctAnswer: 0,
    answer: "'quickly and accurately solved the mathematical theorem'",
    explanation: "The complete predicate includes the compound adverb modifiers ('quickly and accurately'), verb ('solved'), and direct object ('the mathematical theorem').",
    explanationBn: "Complete Predicate-এ Adverb Modifiers ('quickly and accurately'), Verb ('solved') এবং Object ('the mathematical theorem') সমস্ত অংশ অন্তর্ভুক্ত থাকে।",
    hint: "All words from the fronted adverbs through the object.",
    level: "intermediate"
  },
  {
    id: 14,
    question: "What is a Phrasal Verb acting as a Simple Predicate?",
    options: [
      "An idiomatic combination of a verb and one or more particles/prepositions functioning as a single semantic verb unit (e.g., 'give up', 'look after', 'run out of')",
      "A verb written in phrases",
      "A sentence with no subject",
      "An infinitive with 'to'"
    ],
    correctAnswer: 0,
    answer: "An idiomatic combination of a verb and one or more particles/prepositions functioning as a single semantic verb unit (e.g., 'give up', 'look after', 'run out of')",
    explanation: "Phrasal verbs like 'look after' or 'break down' operate as single lexical units in the simple predicate.",
    explanationBn: "Phrasal Verb হলো Verb ও Preposition/Particle-এর সমন্বয়ে গঠিত একটি অবিচ্ছেদ্য ক্রিয়াবাচক একক (যেমন: 'look after', 'give up')।",
    hint: "Verb + preposition acting as a single unit.",
    level: "intermediate"
  },
  {
    id: 15,
    question: "In the sentence 'The detective looked into the mysterious disappearance', what is the Simple Predicate?",
    options: [
      "'looked into' (phrasal verb meaning investigated)",
      "'looked'",
      "'into'",
      "'looked into the mysterious disappearance'"
    ],
    correctAnswer: 0,
    answer: "'looked into' (phrasal verb meaning investigated)",
    explanation: "'Looked into' is a transitive prepositional/phrasal verb functioning as a single semantic predicate taking 'the mysterious disappearance' as object.",
    explanationBn: "'looked into' (তদন্ত করা) একটি Phrasal Verb হিসেবে একক Simple Predicate রূপে কাজ করছে।",
    hint: "The phrasal verb meaning 'investigated'.",
    level: "intermediate"
  },
  {
    id: 16,
    question: "Which of the following sentences contains an error in Compound Predicate agreement / parallelism?",
    options: [
      "Swadeep entered the lab and start coding immediately.",
      "Swadeep entered the lab and started coding immediately.",
      "Swadeep enters the lab and starts coding immediately.",
      "Swadeep will enter the lab and start coding immediately."
    ],
    correctAnswer: 0,
    answer: "Swadeep entered the lab and start coding immediately.",
    explanation: "Tense parallelism error: 'entered' is V2 (Past), but 'start' is V1 (Present). The verbs in a compound predicate must maintain tense harmony ('entered and started').",
    explanationBn: "Tense Parallelism-এর ত্রুটি: 'entered' Past Tense কিন্তু 'start' Present Tense; সঠিক রূপ হবে 'entered and started'।",
    hint: "Look for a tense mismatch between the two verbs.",
    level: "intermediate"
  },
  {
    id: 17,
    question: "In 'There stood an ancient oak tree in the courtyard', what is the Simple Predicate?",
    options: ["stood", "There stood", "stood an ancient oak tree", "in the courtyard"],
    correctAnswer: 0,
    answer: "stood",
    explanation: "'Stood' is the finite intransitive verb. 'An ancient oak tree' is the postponed subject.",
    explanationBn: "'stood' হলো মূল সমাপিকা ক্রিয়া (Simple Predicate); 'an ancient oak tree' হলো প্রকৃত Subject।",
    hint: "The finite verb.",
    level: "basic"
  },
  {
    id: 18,
    question: "In 'Rarely have I witnessed such sheer dedication', what is the Simple Predicate?",
    options: [
      "'have witnessed' (discontinuous verb phrase inverted around 'I')",
      "'have'",
      "'witnessed'",
      "'Rarely have'"
    ],
    correctAnswer: 0,
    answer: "'have witnessed' (discontinuous verb phrase inverted around 'I')",
    explanation: "Negative fronting with 'Rarely' triggers subject-auxiliary inversion, splitting the simple predicate 'have witnessed' around subject 'I'.",
    explanationBn: "Negative Inversion-এর কারণে 'have' এবং 'witnessed' Subject 'I'-এর দুই পাশে বসে Discontinuous Simple Predicate গঠন করেছে।",
    hint: "Negative inversion splits the verb phrase around 'I'.",
    level: "advanced"
  },
  {
    id: 19,
    question: "In the sentence 'Abhronila, can you help me with this code?', what is the Simple Predicate?",
    options: [
      "'can help'",
      "'help'",
      "'can'",
      "'can you help'"
    ],
    correctAnswer: 0,
    answer: "'can help'",
    explanation: "Modal 'can' + base verb 'help' forms the simple predicate verb phrase. 'Abhronila' is a vocative noun of address (not the subject).",
    explanationBn: "Modal 'can' + Base Verb 'help' মিলে Simple Predicate 'can help' গঠিত হয়েছে। 'Abhronila' হলো সম্বোধন পদ (Vocative)।",
    hint: "Modal 'can' + main verb 'help'.",
    level: "intermediate"
  },
  {
    id: 20,
    question: "What is the Simple Predicate in: 'To succeed in examinations, students must practice diligently'?",
    options: [
      "'must practice'",
      "'To succeed'",
      "'practice diligently'",
      "'must practice diligently'"
    ],
    correctAnswer: 0,
    answer: "'must practice'",
    explanation: "The modal verb phrase 'must practice' is the finite predicate of the main clause. 'To succeed...' is an introductory non-finite purpose phrase.",
    explanationBn: "মূল ক্লজের Finite Verb Phrase হলো 'must practice'। 'To succeed...' হলো নন-ফাইনাইট উদ্দেশ্য প্রকাশক বাক্যাংশ।",
    hint: "The finite modal verb phrase of the main clause.",
    level: "intermediate"
  },
  {
    id: 21,
    question: "In 'The committee has decided to postpone the conference', what is the Simple Predicate?",
    options: [
      "'has decided'",
      "'to postpone'",
      "'has decided to postpone'",
      "'postpone'"
    ],
    correctAnswer: 0,
    answer: "'has decided'",
    explanation: "'Has decided' is the finite verb phrase (Simple Predicate). 'To postpone the conference' is an infinitive phrase functioning as direct object.",
    explanationBn: "'has decided' হলো Finite Verb Phrase (Simple Predicate); 'to postpone the conference' হলো Direct Object Noun Phrase।",
    hint: "The finite present perfect verb phrase.",
    level: "intermediate"
  },
  {
    id: 22,
    question: "Can a sentence have multiple finite verbs without being a compound or complex sentence?",
    options: [
      "No, each finite verb represents an independent predication; multiple finite verbs create either a compound predicate, a compound sentence, or a complex sentence",
      "Yes, any simple sentence can have ten finite verbs with no conjunctions",
      "Only in spoken English",
      "Only if the verbs rhyme"
    ],
    correctAnswer: 0,
    answer: "No, each finite verb represents an independent predication; multiple finite verbs create either a compound predicate, a compound sentence, or a complex sentence",
    explanation: "Finite verbs are the structural anchors of clauses. Every additional finite verb requires syntactic coordination or subordination.",
    explanationBn: "প্রতিটি সমাপিকা ক্রিয়া (Finite Verb) একটি নতুন ক্লজের জন্ম দেয়; তাই একাধিক Finite Verb থাকলে বাক্যটি Compound বা Complex রূপ ধারণ করে।",
    hint: "Finite verbs define clause boundaries.",
    level: "advanced"
  },
  {
    id: 23,
    question: "In 'Debangshu was selected team captain and awarded the gold medal', what is the Compound Simple Predicate?",
    options: [
      "'was selected' and '[was] awarded'",
      "'selected and awarded'",
      "'team captain and gold medal'",
      "'was selected team captain'"
    ],
    correctAnswer: 0,
    answer: "'was selected' and '[was] awarded'",
    explanation: "The auxiliary 'was' applies to both coordinate passive verbs: 'was selected' and '[was] awarded'.",
    explanationBn: "উভয় সমন্বিত Passive Verb-এর Simple Predicate হলো 'was selected' এবং '[was] awarded'।",
    hint: "Coordinate passive verb phrases.",
    level: "intermediate"
  },
  {
    id: 24,
    question: "Which of the following demonstrates a correctly partitioned Subject and Predicate?",
    options: [
      "[The new batch of students from Naihati] [have registered for the workshop].",
      "[The new batch] [of students from Naihati have registered for the workshop].",
      "[The new batch of students] [from Naihati have registered for the workshop].",
      "[The new batch of students from Naihati have] [registered for the workshop]."
    ],
    correctAnswer: 0,
    answer: "[The new batch of students from Naihati] [have registered for the workshop].",
    explanation: "The Complete Subject includes the entire noun phrase up to the finite auxiliary 'have registered'.",
    explanationBn: "Finite Verb 'have registered'-এর ঠিক পূর্বের সমগ্র Noun Phrase হলো Complete Subject এবং বাকি অংশ Complete Predicate।",
    hint: "Partition cleanly right before the helping verb 'have'.",
    level: "basic"
  },
  {
    id: 25,
    question: "What is the key takeaway regarding Simple vs Complete Predicates according to Mentor Sukanta Hui?",
    options: [
      "The Simple Predicate is the pure engine (all helping and main verbs); the Complete Predicate is the entire vehicle in motion (the verb plus all objects, complements, and modifiers).",
      "Predicates are optional in English",
      "Complete predicates cannot contain adverbs",
      "Simple predicates must always be one word only"
    ],
    correctAnswer: 0,
    answer: "The Simple Predicate is the pure engine (all helping and main verbs); the Complete Predicate is the entire vehicle in motion (the verb plus all objects, complements, and modifiers).",
    explanation: "Sukanta Sir's engine analogy: Simple Predicate = Verb Engine; Complete Predicate = Engine + Cargo (Objects & Modifiers).",
    explanationBn: "সুকান্ত স্যারের ইঞ্জিন উপমা: Simple Predicate হলো বাক্যের খাঁটি ইঞ্জিন (Verb Phrase), আর Complete Predicate হলো ইঞ্জিন সহ তার সমস্ত মালামাল ও আরোহী (Objects, Complements & Modifiers)।",
    hint: "The engine versus the entire vehicle analogy.",
    level: "basic"
  }
];

export default questions;
