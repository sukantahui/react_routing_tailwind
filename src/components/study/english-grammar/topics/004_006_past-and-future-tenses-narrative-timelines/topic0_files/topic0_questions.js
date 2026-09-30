const questions = [
  {
    id: "q1",
    question: "In the famous sentence 'The patient had died before the doctor arrived', why is 'had died' in the Past Perfect tense?",
    options: [
      "Because the doctor arrived before the patient died.",
      "Because when two past actions occur sequentially, the EARLIER past action (Past of the Past) MUST be in the Past Perfect (had + V3), and the subsequent action in the Simple Past (V2).",
      "Because 'died' is an irregular verb.",
      "Because 'before' always forces future tense."
    ],
    correctAnswer: 1,
    explanation: "When two distinct actions took place in the past, the earlier event is expressed in the Past Perfect ('had died') and the later event in the Simple Past ('arrived').",
    explanationBn: "অতীতে দুটি কাজ ধারাবাহিকভাবে ঘটলে অপেক্ষাকৃত পূর্ববর্তী কাজটি Past Perfect ('had died') এবং পরবর্তী কাজটি Simple Past ('arrived') হয়।"
  },
  {
    id: "q2",
    question: "Complete the sentence using the 'Past of the Past' rule: 'The train _______ before we reached the platform.'",
    options: [
      "left",
      "had left",
      "has left",
      "was leaving"
    ],
    correctAnswer: 1,
    explanation: "The train departure occurred prior to our reaching the platform, requiring the Past Perfect 'had left'.",
    explanationBn: "স্টেশনে পৌঁছানোর পূর্বেই ট্রেনটি ছেড়ে গিয়েছিল, তাই পূর্ববর্তী কাজটি Past Perfect 'had left' হবে।"
  },
  {
    id: "q3",
    question: "What is the formula for 'After' when joining two sequential past actions?",
    options: [
      "Simple Past + after + Past Perfect (e.g. 'The doctor came after the patient had died.')",
      "Past Perfect + after + Simple Past",
      "Simple Past + after + Simple Past",
      "Past Continuous + after + Past Perfect"
    ],
    correctAnswer: 0,
    explanation: "With 'after', the earlier action follows the conjunction: 'Subject + V2 (Simple Past) + AFTER + Subject + had + V3 (Past Perfect)'. Example: 'We reached the station AFTER the train had left.'",
    explanationBn: "'After'-এর গঠন: Simple Past (V2) + AFTER + Past Perfect (had + V3)। যেমন: 'The doctor arrived after the patient had died'।"
  },
  {
    id: "q4",
    question: "Choose the correct sentence to express an intention or plan decided BEFORE the moment of speaking:",
    options: [
      "I will buy a new laptop this evening. (Unplanned impulse)",
      "I am going to buy a new laptop this evening. (Pre-meditated intention)",
      "I buy a new laptop this evening.",
      "I have bought a laptop this evening."
    ],
    correctAnswer: 1,
    explanation: "'Be going to' expresses prior intentions, planned decisions, or predictions based on immediate visible evidence. 'Will' is used for spontaneous on-the-spot decisions.",
    explanationBn: "পূর্ব-পরিকল্পিত সিদ্ধান্ত বা উদ্দেশ্য প্রকাশে 'be going to' ব্যবহৃত হয়; আর তাৎক্ষণিক সিদ্ধান্তে 'will' বসে।"
  },
  {
    id: "q5",
    question: "Which of the following sentences correctly expresses a spontaneous, on-the-spot decision made at the moment of speaking?",
    options: [
      "The doorbell is ringing. I am going to answer it.",
      "The doorbell is ringing. I will answer it.",
      "The doorbell is ringing. I answer it.",
      "The doorbell is ringing. I have answered it."
    ],
    correctAnswer: 1,
    explanation: "'I will answer it' is an immediate spontaneous decision made at the moment of hearing the doorbell.",
    explanationBn: "কথা বলার মুহূর্তে তাৎক্ষণিক সিদ্ধান্ত প্রকাশে 'will' ব্যবহার করা হয় ('I will answer it')।"
  },
  {
    id: "q6",
    question: "Identify the tense and aspect of the verb in: 'By next December, we will have lived in this city for twenty years.'",
    options: [
      "Future Continuous",
      "Future Perfect",
      "Future Perfect Continuous",
      "Simple Future"
    ],
    correctAnswer: 1,
    explanation: "'Will have + V3 (lived)' represents the Future Perfect tense, denoting an action that will be completed by a designated future benchmark ('by next December').",
    explanationBn: "'Will have lived' হলো Future Perfect Tense, যা ভবিষ্যতের নির্দিষ্ট সময়ের পূর্বে কোনো কাজ সম্পন্ন হওয়ার নির্দেশ করে।"
  },
  {
    id: "q7",
    question: "What is the key time marker that almost always triggers the FUTURE PERFECT tense?",
    options: [
      "Yesterday",
      "By + future time marker (e.g. 'By tomorrow', 'By next year', 'By 5 PM')",
      "Since",
      "While"
    ],
    correctAnswer: 1,
    explanation: "'By + future time' (meaning no later than that point) is the canonical trigger for the Future Perfect ('will have completed').",
    explanationBn: "'By + ভবিষ্যৎ সময়' (যেমন: 'By next week') Future Perfect Tense-এর সবচেয়ে প্রধান সংকেত।"
  },
  {
    id: "q8",
    question: "Complete the sentence: 'By the time the manager arrives tomorrow, the team _______ the project.'",
    options: [
      "will finish",
      "will have finished",
      "finishes",
      "had finished"
    ],
    correctAnswer: 1,
    explanation: "When paired with 'By the time + Simple Present (arrives)', the main clause requires the Future Perfect: 'will have finished'.",
    explanationBn: "'By the time + Simple Present'-এর সাথে প্রধান বাক্যাংশটি Future Perfect ('will have finished') হয়।"
  },
  {
    id: "q9",
    question: "In the sentence 'While I was studying in my room, my brother was playing the guitar', what type of past aspect is demonstrated?",
    options: [
      "Two sequential completed actions.",
      "Two parallel simultaneous actions progressing concurrently in the past.",
      "An interrupted single action.",
      "Past of the past."
    ],
    correctAnswer: 1,
    explanation: "'While + Past Continuous ... Past Continuous' demonstrates two parallel simultaneous past actions unfolding at the same time without interrupting each other.",
    explanationBn: "'While'-এর মাধ্যমে অতীতে একই সাথে চলমান দুটি সমান্তরাল ধারাবাহিক ক্রিয়া (Parallel Simultaneous Actions) প্রকাশিত হয়েছে।"
  },
  {
    id: "q10",
    question: "Choose the correct sentence to express an ongoing past action interrupted by a sudden short event:",
    options: [
      "I watched television when the lights went out.",
      "I was watching television when the lights went out.",
      "I had watched television when the lights went out.",
      "I have been watching television when the lights went out."
    ],
    correctAnswer: 1,
    explanation: "The longer background ongoing activity is in the Past Continuous ('was watching'), and the sudden interrupting event is in the Simple Past ('went out').",
    explanationBn: "অতীতে চলমান দীর্ঘ কাজের মাঝে কোনো ক্ষণস্থায়ী ঘটনা ঘটলে চলমান ক্রিয়াটি Past Continuous ('was watching') এবং বাধা সৃষ্টিকারী ঘটনাটি Simple Past ('went out') হয়।"
  },
  {
    id: "q11",
    question: "Identify the tense: 'They had been waiting for two hours before the bus finally arrived.'",
    options: [
      "Past Continuous",
      "Past Perfect",
      "Past Perfect Continuous",
      "Simple Past"
    ],
    correctAnswer: 2,
    explanation: "'Had + been + V-ing (waiting)' denotes the Past Perfect Continuous tense, emphasizing the continuous duration of an action up to a specific past milestone.",
    explanationBn: "'Had been waiting' হলো Past Perfect Continuous Tense, যা অতীতের নির্দিষ্ট ঘটনার পূর্ব পর্যন্ত একটানা চলমান কাজের ব্যাপ্তি প্রকাশ করে।"
  },
  {
    id: "q12",
    question: "Which modal auxiliary is traditionally used with First Person pronouns (I, We) to express formal futurity or suggestions in British English?",
    options: [
      "Will",
      "Shall",
      "Would",
      "Might"
    ],
    correctAnswer: 1,
    explanation: "In traditional standard grammar, 'Shall' is paired with 'I' and 'We' for pure futurity and suggestions ('Shall we dance?'), while 'Will' is used with second/third persons.",
    explanationBn: "প্রথাগত ব্যাকরণে First Person (I, We)-এর সাথে সাধারণ ভবিষ্যৎ ও প্রস্তাব প্রকাশে 'Shall' বসে।"
  },
  {
    id: "q13",
    question: "Complete the sentence: 'Look at those dark, heavy clouds! It _______ rain.'",
    options: [
      "will",
      "is going to",
      "shall",
      "would"
    ],
    correctAnswer: 1,
    explanation: "When a future prediction is based on present, visible, immediate sensory evidence (dark clouds), 'is going to' is strictly preferred over 'will'.",
    explanationBn: "বর্তমানের চাক্ষুষ প্রমাণের ভিত্তিতে কোনো ভবিষ্যৎ ঘটনা অবশ্যম্ভাবী মনে হলে 'is going to' ব্যবহৃত হয় ('It is going to rain')।"
  },
  {
    id: "q14",
    question: "Identify the correct verb form: 'This time tomorrow, we _______ over the Atlantic Ocean.'",
    options: [
      "will fly",
      "will be flying",
      "will have flown",
      "fly"
    ],
    correctAnswer: 1,
    explanation: "'At this time tomorrow' specifies an action that will be in progress at a future moment, requiring the Future Continuous tense ('will be flying').",
    explanationBn: "ভবিষ্যতের কোনো নির্দিষ্ট সময়ে চলমান কাজ প্রকাশ করতে Future Continuous ('will be flying') ব্যবহৃত হয়।"
  },
  {
    id: "q15",
    question: "Why is 'I had seen him yesterday' grammatically unacceptable in a standalone sentence without another past context?",
    options: [
      "Because Past Perfect ('had seen') is a RELATIVE tense ('Past of the Past') and requires a secondary reference point in the past; a standalone past action with 'yesterday' must use Simple Past ('I saw him yesterday').",
      "Because 'yesterday' is future.",
      "Because 'had' cannot be used with 'seen'.",
      "Because 'yesterday' requires Past Continuous."
    ],
    correctAnswer: 0,
    explanation: "Past Perfect cannot exist in isolation without an anchoring past moment or prior action. A standalone event at a specific past time takes Simple Past.",
    explanationBn: "Past Perfect একা একা বসতে পারে না; অতীতে অপর কোনো ক্রিয়ার সাপেক্ষ ছাড়া কেবল 'yesterday' থাকলে Simple Past ('I saw him yesterday') বসবে।"
  },
  {
    id: "q16",
    question: "Choose the correct sentence to express an unfulfilled past wish or intention:",
    options: [
      "I had hoped to meet the Director, but he was away on tour.",
      "I hope to meet the Director yesterday.",
      "I was hoping to meet the Director tomorrow.",
      "I have hoped to meet the Director yesterday."
    ],
    correctAnswer: 0,
    explanation: "Past Perfect with verbs of desire/intent (hope, expect, wish, intend) expresses an unfulfilled past hope: 'I had hoped to meet him (but couldn't)'.",
    explanationBn: "অতীতের অপূর্ণ ইচ্ছা বা প্রত্যাশা প্রকাশে Past Perfect ব্যবহৃত হয়: 'I had hoped to meet...'।"
  },
  {
    id: "q17",
    question: "Identify the formula for the Future Perfect Continuous tense:",
    options: [
      "Subject + will/shall + be + V-ing",
      "Subject + will/shall + have + been + V-ing",
      "Subject + will/shall + have + V3",
      "Subject + had + been + V-ing"
    ],
    correctAnswer: 1,
    explanation: "Future Perfect Continuous = Subject + will/shall + have + been + V-ing (e.g. 'By 2026, I will have been teaching for 15 years').",
    explanationBn: "Future Perfect Continuous-এর গঠন: Subject + will/shall + have + been + V-ing।"
  },
  {
    id: "q18",
    question: "Select the sentence with correct tense harmony:",
    options: [
      "When the bell rang, the students had already left.",
      "When the bell had rung, the students left already.",
      "When the bell rang, the students have already left.",
      "When the bell will ring, the students had left."
    ],
    correctAnswer: 0,
    explanation: "The departure of the students happened prior to the bell ringing: 'When the bell rang (V2), the students had already left (had + V3)'.",
    explanationBn: "ঘণ্টা বাজার পূর্বেই ছাত্ররা চলে গিয়েছিল: 'When the bell rang, the students had already left'।"
  },
  {
    id: "q19",
    question: "Which of the following sentences correctly expresses an arrangement involving other people (fixed personal plan)?",
    options: [
      "I am having dinner with the CEO tomorrow evening.",
      "I will have dinner with the CEO yesterday.",
      "I have dinner with the CEO at 8 PM.",
      "I had dinner with the CEO tomorrow."
    ],
    correctAnswer: 0,
    explanation: "Present Continuous ('am having dinner') is standard for pre-arranged personal appointments and fixed social schedules with others in the near future.",
    explanationBn: "ব্যক্তিগত সুনির্দিষ্ট ভবিষ্যৎ অ্যাপয়েন্টমেন্ট বা সূচি প্রকাশে Present Continuous ('am having dinner') ব্যবহৃত হয়।"
  },
  {
    id: "q20",
    question: "What is the Simple Past (V2) of the irregular verb 'broadcast'?",
    options: [
      "broadcasted",
      "broadcast",
      "broadcasten",
      "was broadcasted"
    ],
    correctAnswer: 1,
    explanation: "'Broadcast', 'cast', 'telecast', 'forecast', 'cut', 'put', 'hit', 'hurt', 'set', and 'shut' have identical V1, V2, and V3 forms ('broadcast -> broadcast -> broadcast'). 'Broadcasted' is incorrect.",
    explanationBn: "'Broadcast'-এর V1, V2 এবং V3 রূপ অভিন্ন: 'broadcast'। 'Broadcasted' বলা অশুদ্ধ।"
  },
  {
    id: "q21",
    question: "In the sentence 'Scarcely had the sun set _______ the temperature plummeted', which word completes the correlative?",
    options: [
      "than",
      "when",
      "then",
      "before"
    ],
    correctAnswer: 1,
    explanation: "'Scarcely had ... when' is the invariant past correlative pairing.",
    explanationBn: "'Scarcely had'-এর সাথে জোড় শব্দ হিসেবে 'when' বসে।"
  },
  {
    id: "q22",
    question: "Identify the correct verb form: 'By the time we arrive at the theatre, the play _______.'",
    options: [
      "will start",
      "will have started",
      "had started",
      "starts"
    ],
    correctAnswer: 1,
    explanation: "'By the time + Present (arrive)' triggers the Future Perfect ('will have started') for the prior completion in the future.",
    explanationBn: "'By the time we arrive'-এর সাথে Future Perfect 'will have started' বসবে।"
  },
  {
    id: "q23",
    question: "Choose the correct sentence to describe a past habit that no longer occurs:",
    options: [
      "He used to smoke, but he gave up two years ago.",
      "He is used to smoke, but he gave up.",
      "He uses to smoke in the past.",
      "He had used to smoke."
    ],
    correctAnswer: 0,
    explanation: "'Used to + base verb' expresses a discontinued past routine or state that is no longer true in the present.",
    explanationBn: "অতীতের বিলুপ্ত অভ্যাস প্রকাশে 'Used to + V1' ('He used to smoke') ব্যবহৃত হয়।"
  },
  {
    id: "q24",
    question: "What is the difference between 'used to work' and 'is used to working'?",
    options: [
      "'Used to work' = discontinued past habit; 'Is used to working' = accustomed / familiar with work in the present.",
      "Both mean the exact same thing.",
      "'Is used to working' is an error.",
      "'Used to work' is future tense."
    ],
    correctAnswer: 0,
    explanation: "'Used to + V1' denotes a past habit. 'Be used to + V-ing / Noun' denotes being accustomed to something in the present.",
    explanationBn: "'Used to work' অতীতের অভ্যাস; আর 'is used to working' কোনো কাজে অভ্যস্ত হওয়া (Accustomed to) বোঝায়।"
  },
  {
    id: "q25",
    question: "How many total structural tenses exist in the standard English 3-Tense x 4-Aspect matrix?",
    options: [
      "8",
      "10",
      "12",
      "16"
    ],
    correctAnswer: 2,
    explanation: "3 Tenses (Present, Past, Future) multiplied by 4 Aspects (Simple, Continuous, Perfect, Perfect Continuous) yields the complete 12-Tense Grand Reference Matrix of English grammar.",
    explanationBn: "৩টি কাল (Present, Past, Future) এবং ৪টি ভাব (Simple, Continuous, Perfect, Perfect Continuous) মিলে ইংরেজিতে মোট ১২টি Tense গঠিত হয়।"
  }
];

export default questions;
