const questions = [
  {
    id: "q1",
    question: "Why is the sentence 'I am having a red sports car' grammatically incorrect in standard English?",
    options: [
      "Because 'having' requires a preposition 'with'.",
      "Because 'have' in the sense of 'ownership/possession' is a STATIVE verb and cannot be used in the progressive (-ing) aspect.",
      "Because 'car' is a countable noun.",
      "Because 'sports' should be singular 'sport'."
    ],
    correctAnswer: 1,
    explanation: "When 'have' denotes ownership or state of possession, it is a pure stative verb and resists continuous aspect. Say: 'I have a red sports car'. (Continuous is only valid for dynamic actions: 'I am having lunch/a shower').",
    explanationBn: "মালিকানা বা অধিকার বোঝাতে 'have' একটি Stative Verb, তাই এর সাথে Continuous (-ing) রূপ ব্যবহার করা ভুল। শুদ্ধ বাক্য: 'I have a red sports car'।"
  },
  {
    id: "q2",
    question: "In which of the following sentences is 'taste' used as a DYNAMIC ACTION VERB (allowing progressive aspect)?",
    options: [
      "The soup tastes spicy and delicious.",
      "The chef is tasting the soup to check the seasoning.",
      "Sugar tastes sweet.",
      "This medicine tastes bitter."
    ],
    correctAnswer: 1,
    explanation: "In 'The chef is tasting the soup', 'tasting' is a deliberate physical, voluntary action performed by the chef, making it dynamic. In the other sentences, it represents an inherent stative sensory quality.",
    explanationBn: "'The chef is tasting...' বাক্যে রাঁধুনি সক্রিয়ভাবে জিভ দিয়ে চেখে দেখছেন (Dynamic Action); বাকি বাক্যগুলোতে এটি স্বাদ সম্পর্কিত অপরিবর্তনীয় অবস্থা (Stative) প্রকাশ করছে।"
  },
  {
    id: "q3",
    question: "Identify the LINKING / COPULAR verb in: 'The exhausted traveler became silent.'",
    options: [
      "exhausted",
      "traveler",
      "became",
      "silent"
    ],
    correctAnswer: 2,
    explanation: "'Became' functions as a copular/linking verb connecting the subject 'traveler' to its subject complement 'silent'.",
    explanationBn: "'Became' একটি Linking Verb যা Subject 'traveler'-এর সাথে Subject Complement 'silent'-কে সংযুক্ত করেছে।"
  },
  {
    id: "q4",
    question: "What is an ERGATIVE (Inchoative) verb?",
    options: [
      "A verb that can never take an object.",
      "A verb that can be used transitively (with an external agent) or intransitively (where the object becomes the subject undergoing the action) without changing its form.",
      "A verb that only occurs in passive voice.",
      "A verb that has no past participle."
    ],
    correctAnswer: 1,
    explanation: "Ergative verbs allow the same word to be transitive ('He opened the door') and intransitive ('The door opened'). Examples include: open, close, break, melt, boil, start.",
    explanationBn: "Ergative Verb এমন ক্রিয়া যা একই রূপে Transitive ('He opened the door') এবং Intransitive ('The door opened') উভয় ভাবেই ব্যবহৃত হতে পারে।"
  },
  {
    id: "q5",
    question: "Identify the DITRANSITIVE verb structure in: 'The teacher taught us English grammar.'",
    options: [
      "Subject + Verb + Subject Complement",
      "Subject + Verb + Direct Object only",
      "Subject + Verb + Indirect Object ('us') + Direct Object ('English grammar')",
      "Subject + Verb + Object Complement"
    ],
    correctAnswer: 2,
    explanation: "'Taught' is ditransitive because it takes two objects: Indirect Object ('us' - recipient) and Direct Object ('English grammar' - thing taught).",
    explanationBn: "'Taught' ক্রিয়াটি Ditransitive কারণ এটি দুটি Object গ্রহণ করেছে: Indirect Object ('us') এবং Direct Object ('English grammar')।"
  },
  {
    id: "q6",
    question: "Which of the following stative verbs is INCORRECTLY used in the progressive form?",
    options: [
      "I am understanding the complex mathematical formula now.",
      "I understand the complex mathematical formula now.",
      "She understands the formula.",
      "They understood the formula yesterday."
    ],
    correctAnswer: 0,
    explanation: "'Understand' is a stative verb of mental cognition; it represents a state of comprehension and cannot be used in progressive continuous tenses.",
    explanationBn: "'Understand' মানসিক উপলব্ধি সংক্রান্ত Stative Verb হওয়ায় এর সাথে Progressive (-ing) রূপ 'am understanding' ব্যাকরণগত ভুল। শুদ্ধ রূপ: 'I understand'।"
  },
  {
    id: "q7",
    question: "In the sentence 'The committee elected Swadeep president', what is 'president'?",
    options: [
      "Direct Object",
      "Indirect Object",
      "Object Complement",
      "Subject Complement"
    ],
    correctAnswer: 2,
    explanation: "'President' completes the meaning of the direct object 'Swadeep' (Swadeep = president), making it an Object Complement. The verb 'elected' is complex-transitive.",
    explanationBn: "'President' শব্দটি Direct Object 'Swadeep'-এর পরিচয় সম্পন্ন করায় এটি Object Complement।"
  },
  {
    id: "q8",
    question: "Which of the following is a PRIMARY AUXILIARY verb?",
    options: [
      "Must",
      "Should",
      "Do",
      "Might"
    ],
    correctAnswer: 2,
    explanation: "The three Primary Auxiliaries in English are 'Be', 'Do', and 'Have' (they can function as helping verbs or main lexical verbs). 'Must', 'should', and 'might' are modal auxiliaries.",
    explanationBn: "ইংরেজিতে Primary Auxiliary Verb হলো তিনটি: 'Be', 'Do', এবং 'Have'। এগুলো Helping Verb এবং Main Verb উভয় রূপেই বসতে পারে।"
  },
  {
    id: "q9",
    question: "Identify the INTRANSITIVE verb that takes a Prepositional Object: 'The students laughed at the comical clown.'",
    options: [
      "laughed at",
      "students",
      "comical",
      "clown"
    ],
    correctAnswer: 0,
    explanation: "'Laughed' is inherently intransitive, but when combined with the fixed preposition 'at' ('laughed at'), it forms a prepositional transitive unit taking 'the clown' as object.",
    explanationBn: "'Laughed' মূলত Intransitive Verb, কিন্তু 'at' Preposition যুক্ত হয়ে 'laughed at' একটি Prepositional Verb হিসেবে কাজ করছে।"
  },
  {
    id: "q10",
    question: "What is the difference between 'I think you are right' and 'I am thinking about the problem'?",
    options: [
      "In the first, 'think' means 'believe/have an opinion' (Stative); in the second, 'thinking' means 'mental processing/deliberation' (Dynamic).",
      "Both are stative verbs.",
      "Both are dynamic verbs.",
      "The first is an error; it must be 'I am thinking you are right'."
    ],
    correctAnswer: 0,
    explanation: "'Think' = opinion/belief (Stative, no -ing). 'Think' = active cognitive deliberation (Dynamic, allows -ing).",
    explanationBn: "মতামত বা বিশ্বাস প্রকাশে 'think' হলো Stative ('I think you are right'); কিন্তু সক্রিয় মানসিক চিন্তা প্রকাশে এটি Dynamic ('I am thinking')."
  },
  {
    id: "q11",
    question: "Which of the following verbs of sensation requires a predicate ADJECTIVE rather than an adverb when functioning as a linking verb?",
    options: [
      "The food smells horribly.",
      "The fabric feels smoothly.",
      "The music sounds melodious.",
      "The coffee tastes bitterly."
    ],
    correctAnswer: 2,
    explanation: "Sensory copular verbs (sound, smell, feel, taste, look) describe the subject and must take a predicate ADJECTIVE ('melodious'), not an adverb.",
    explanationBn: "Sensory Linking Verb-এর পরে Subject-এর বর্ণনা দিতে Predicate Adjective ('melodious') বসে, Adverb বসে না।"
  },
  {
    id: "q12",
    question: "Identify the 5 Principal Verb Forms for the irregular verb 'write':",
    options: [
      "V1: write | V2: wrote | V3: written | V4: writing | V5: writes",
      "V1: write | V2: writed | V3: written | V4: writing | V5: write",
      "V1: write | V2: wrote | V3: wrote | V4: writing | V5: writes",
      "V1: writes | V2: wrote | V3: written | V4: writing | V5: write"
    ],
    correctAnswer: 0,
    explanation: "V1 (Base): write | V2 (Past): wrote | V3 (Past Participle): written | V4 (Present Participle): writing | V5 (3rd Person Singular Present): writes.",
    explanationBn: "Verb-এর ৫টি রূপ: V1 (Base) write, V2 (Past) wrote, V3 (Past Participle) written, V4 (Present Participle) writing, V5 (3rd Person Sing.) writes।"
  },
  {
    id: "q13",
    question: "In the sentence 'The sun rises in the east', what category of verb is 'rises'?",
    options: [
      "Transitive Verb",
      "Intransitive Verb of Complete Predication",
      "Linking Verb",
      "Auxiliary Verb"
    ],
    correctAnswer: 1,
    explanation: "'Rises' requires no object to complete its sense ('in the east' is an adverbial prepositional phrase of place). It is an Intransitive Verb of Complete Predication.",
    explanationBn: "'Rises'-এর কোনো Object প্রয়োজন হয় না, তাই এটি Intransitive Verb of Complete Predication।"
  },
  {
    id: "q14",
    question: "Choose the correct sentence regarding stative verb 'belong':",
    options: [
      "This ancestral property is belonging to my family.",
      "This ancestral property belongs to my family.",
      "This ancestral property has been belonging to my family.",
      "This ancestral property was belonging to my family."
    ],
    correctAnswer: 1,
    explanation: "'Belong' is a pure stative verb of ownership and is never used in progressive continuous tenses.",
    explanationBn: "'Belong' একটি বিশুদ্ধ Stative Verb (মালিকানা সম্পর্কিত); এটি কখনো Continuous রূপ গ্রহণ করে না। সঠিক রূপ: 'belongs to'।"
  },
  {
    id: "q15",
    question: "What is the difference between 'see' in 'I see a flying bird' vs 'I am seeing the doctor tomorrow'?",
    options: [
      "'I see' = involuntary visual perception (Stative); 'am seeing' = planned meeting / consultation (Dynamic).",
      "Both are identical in meaning.",
      "'Am seeing' is an Indian English colloquial error.",
      "'I see' is past tense."
    ],
    correctAnswer: 0,
    explanation: "Visual sensory perception is stative ('I see'). When 'see' means visiting, meeting, or consulting someone, it is dynamic and accepts continuous forms ('am seeing').",
    explanationBn: "চোখে দেখা অর্থে 'see' Stative; কিন্তু কারও সাথে সাক্ষাৎ বা ডাক্তার দেখানোর পরিকল্পনা অর্থে 'see' Dynamic এবং 'am seeing' সম্পূর্ণ শুদ্ধ।"
  },
  {
    id: "q16",
    question: "Identify the CAUSATIVE verb in: 'The teacher made the noisy students apologize.'",
    options: [
      "apologize",
      "made",
      "noisy",
      "students"
    ],
    correctAnswer: 1,
    explanation: "'Made' is a causative verb (cause someone to do an action), followed by a bare infinitive ('apologize').",
    explanationBn: "'Made' এখানে Causative Verb (প্রযোজক ক্রিয়া) যা অন্যকে দিয়ে কাজ করানো বোঝায়, এবং এর পর Bare Infinitive বসে।"
  },
  {
    id: "q17",
    question: "Which of the following verbs is INHERENTLY INTRANSITIVE and cannot be made passive?",
    options: [
      "Die",
      "Kill",
      "Destroy",
      "Construct"
    ],
    correctAnswer: 0,
    explanation: "'Die', 'arrive', 'sleep', 'fall', 'occur', and 'vanish' are strictly intransitive verbs with no direct object, making passive voice transformation structurally impossible.",
    explanationBn: "'Die', 'arrive', 'fall' সম্পূর্ণ Intransitive Verb; এদের কোনো Direct Object না থাকায় এদের Passive Voice করা অসম্ভব।"
  },
  {
    id: "q18",
    question: "Identify the verb used as a SEMI-MODAL / MARGINAL AUXILIARY:",
    options: [
      "Dare",
      "Have",
      "Be",
      "Sing"
    ],
    correctAnswer: 0,
    explanation: "'Dare', 'need', and 'used to' are Semi-Modals (marginal auxiliaries) that can behave as either modal auxiliaries or ordinary lexical verbs.",
    explanationBn: "'Dare', 'need', এবং 'used to' হলো Semi-Modal Auxiliaries যা ক্ষেত্রবিশেষে Modal এবং সাধারণ Verb উভয় রূপেই কাজ করে।"
  },
  {
    id: "q19",
    question: "In the sentence 'The water boiled in the pot', how does 'boiled' function?",
    options: [
      "Transitive Verb",
      "Intransitive / Ergative Verb",
      "Modal Verb",
      "Linking Verb"
    ],
    correctAnswer: 1,
    explanation: "'Boiled' is functioning ergatively/intransitively here, where the subject 'the water' undergoes the boiling action without an external agent specified.",
    explanationBn: "'The water boiled' বাক্যে 'boiled' Ergative/Intransitive হিসেবে ব্যবহৃত হয়েছে।"
  },
  {
    id: "q20",
    question: "Which of the following sentences correctly uses a verb of emotion/feeling?",
    options: [
      "I am loving this delicious biryani.",
      "I love this delicious biryani.",
      "She is hating deceitful people.",
      "They are preferring iced tea to coffee."
    ],
    correctAnswer: 1,
    explanation: "Verbs of core emotion (love, hate, prefer, adore, detest) are stative in standard formal English and take simple aspect ('I love', 'She hates', 'They prefer').",
    explanationBn: "অনুভূতিবাচক ক্রিয়া (love, hate, prefer) প্রমিত ইংরেজিতে Stative Verb হিসেবে Simple Present-এ ব্যবহৃত হয় ('I love this biryani')।"
  },
  {
    id: "q21",
    question: "What is the past participle (V3) of the verb 'lie' (meaning to recline)?",
    options: [
      "lied",
      "lay",
      "lain",
      "laid"
    ],
    correctAnswer: 2,
    explanation: "To recline: Lie (V1) -> Lay (V2) -> Lain (V3). To put down: Lay (V1) -> Laid (V2) -> Laid (V3). To tell an untruth: Lie (V1) -> Lied (V2) -> Lied (V3).",
    explanationBn: "বিশ্রাম নেওয়া/শুয়ে থাকা অর্থে: Lie (V1) -> Lay (V2) -> Lain (V3)। কোনো বস্তু রাখা অর্থে: Lay (V1) -> Laid (V2) -> Laid (V3)। মিথ্যা বলা অর্থে: Lie (V1) -> Lied (V2) -> Lied (V3)।"
  },
  {
    id: "q22",
    question: "Choose the correct sentence to describe placing a book on a table in the past tense:",
    options: [
      "She lay the book on the table yesterday.",
      "She laid the book on the table yesterday.",
      "She lain the book on the table yesterday.",
      "She lied the book on the table yesterday."
    ],
    correctAnswer: 1,
    explanation: "'Lay' (to place something down - transitive) has the simple past form 'laid' (V2). 'She laid the book on the table'.",
    explanationBn: "কোনো বস্তু রাখা (Transitive) ক্রিয়ার Past Form (V2) হলো 'laid'। শুদ্ধ বাক্য: 'She laid the book on the table'."
  },
  {
    id: "q23",
    question: "Identify the Cognate Object in: 'The brave soldier fought a glorious fight.'",
    options: [
      "brave",
      "soldier",
      "glorious",
      "fight"
    ],
    correctAnswer: 3,
    explanation: "A Cognate Object is an object etymologically and semantically derived from the verb itself ('fought a fight', 'dreamed a dream', 'lived a life').",
    explanationBn: "ক্রিয়ার ধাতু বা সমোদ্ভূত Noun যখন Object হিসেবে বসে তাকে Cognate Object বলা হয় (যেমন: 'fought a fight')।"
  },
  {
    id: "q24",
    question: "Which of the following contains a FACTITIVE (Complex-Transitive) verb?",
    options: [
      "They painted the fence white.",
      "He slept peacefully.",
      "She bought a new laptop.",
      "Birds fly in the sky."
    ],
    correctAnswer: 0,
    explanation: "In 'painted the fence white', 'painted' is a factitive verb where the action causes the direct object ('the fence') to take on a resulting state ('white' - object complement).",
    explanationBn: "'painted the fence white'-এ 'painted' হলো Factitive Verb যা Object-এর নতুন অবস্থা (white) সৃষ্টি করেছে।"
  },
  {
    id: "q25",
    question: "What type of verb is 'resemble' in 'She resembles her mother'?",
    options: [
      "Dynamic Action Verb",
      "Stative Verb of Relation / Appearance (cannot be passive: 'Her mother is resembled by her' is incorrect)",
      "Linking Verb",
      "Intransitive Verb"
    ],
    correctAnswer: 1,
    explanation: "'Resemble' is a non-passivizable transitive stative verb of relation/appearance. It does not allow progressive aspect ('is resembling' [Wrong]) nor passive transformation.",
    explanationBn: "'Resemble' একটি সম্পর্কসূচক Stative Verb; এর সাথে Continuous (-ing) বসে না এবং এর Passive Voice করা ব্যাকরণগতভাবে অশুদ্ধ।"
  }
];

export default questions;
