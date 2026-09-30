// topic5_questions.js
// Module 001_002: Sentence Anatomy
// Topic 5: Ditransitive Verbs — Dual Positioning Mechanics ('To' vs 'For')
// 25 Comprehensive Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What syntactic transformation occurs during Dative Alternation (shifting from SVOO to SVO + Prep)?",
    options: [
      "The Indirect Object (recipient) moves after the Direct Object and receives the preposition 'to' or 'for'",
      "The Direct Object is deleted from the sentence",
      "The Subject and Verb swap places",
      "The sentence becomes negative"
    ],
    correctAnswer: 0,
    answer: "The Indirect Object (recipient) moves after the Direct Object and receives the preposition 'to' or 'for'",
    explanation: "Dative Alternation: S + V + IO + DO ('I gave him a book') converts to S + V + DO + Preposition + Recipient ('I gave a book to him').",
    explanationBn: "Dative Alternation-এ Indirect Object ('him') Direct Object ('a book')-এর পরে চলে যায় এবং 'to' বা 'for' Preposition গ্রহণ করে ('gave a book to him')।",
    hint: "The recipient shifts to the end with 'to' or 'for'.",
    level: "basic"
  },
  {
    id: 2,
    question: "Which of the following verbs requires the preposition 'FOR' (not 'to') when the recipient follows the direct object?",
    options: ["Buy", "Give", "Send", "Tell"],
    correctAnswer: 0,
    answer: "Buy",
    explanation: "'Buy' is a verb of procurement/creation, requiring 'for': 'Swadeep bought a graphics tablet for Debangshu' (never *'to Debangshu').",
    explanationBn: "'Buy' হলো কেনাকাটা বা সংগ্রাহক Verb, তাই Recipient পরে বসলে 'for' বসবে ('bought ... for Debangshu')।",
    hint: "Procurement/creation verbs take 'for'.",
    level: "basic"
  },
  {
    id: 3,
    question: "Which of the following verbs requires the preposition 'TO' when the recipient follows the direct object?",
    options: ["Lend", "Bake", "Cook", "Build"],
    correctAnswer: 0,
    answer: "Lend",
    explanation: "'Lend' is a verb of transfer, requiring 'to': 'He lent his laptop to Tuhina'.",
    explanationBn: "'Lend' (ধার দেওয়া) হলো হস্তান্তর প্রকাশক Verb, তাই 'to' বসবে ('lent ... to Tuhina')।",
    hint: "Transfer/communication verbs take 'to'.",
    level: "basic"
  },
  {
    id: 4,
    question: "When BOTH the Direct Object and the Indirect Object are personal pronouns (e.g., 'it' and 'me'), which word order is mandatory in standard English?",
    options: [
      "S + V + DO (it) + TO + IO (me) -> 'He gave it to me'",
      "S + V + IO + DO -> *'He gave me it'* (dispreferred/colloquial)",
      "*'He gave to me it'*",
      "*'He gave it me'*"
    ],
    correctAnswer: 0,
    answer: "S + V + DO (it) + TO + IO (me) -> 'He gave it to me'",
    explanation: "When the Direct Object is the pronoun 'it' or 'them', the prepositional pattern ('give it to me', 'send them to us') is standard and required in formal English.",
    explanationBn: "Direct Object যখন সর্বনাম 'it' বা 'them' হয়, তখন Prepositional গঠন 'He gave it to me' ব্যবহার করা বাধ্যতামূলক।",
    hint: "'He gave it to me' vs *'He gave me it'*.",
    level: "advanced"
  },
  {
    id: 5,
    question: "Which sentence correctly demonstrates the 'FOR' dative shift?",
    options: [
      "Tuhina prepared a detailed study guide for her classmates.",
      "Tuhina prepared a detailed study guide to her classmates.",
      "Tuhina prepared to her classmates a study guide.",
      "Tuhina prepared for her classmates a study guide."
    ],
    correctAnswer: 0,
    answer: "Tuhina prepared a detailed study guide for her classmates.",
    explanation: "'Prepare' represents a service/creation for someone's benefit, requiring the preposition 'for'.",
    explanationBn: "'prepare' উপকার বা প্রস্তুতিমূলক কাজ হওয়ায় এর সাথে 'for' বসবে ('prepared ... for her classmates')।",
    hint: "Beneficiary of preparation takes 'for'.",
    level: "basic"
  },
  {
    id: 6,
    question: "In the sentence 'Mentor Sukanta Sir explained the complex theorem to the students', why CANNOT we say *'Sukanta Sir explained the students the theorem'*?",
    options: [
      "Verbs of Latin origin like 'explain', 'describe', 'announce', 'suggest', and 'confess' are NOT ditransitive and CANNOT take a preverbal Indirect Object; they strictly require the preposition 'to'",
      "Because theorem is too long",
      "Because students is plural",
      "Because Sukanta Sir is a proper noun"
    ],
    correctAnswer: 0,
    answer: "Verbs of Latin origin like 'explain', 'describe', 'announce', 'suggest', and 'confess' are NOT ditransitive and CANNOT take a preverbal Indirect Object; they strictly require the preposition 'to'",
    explanation: "Latinate verbs of communication (explain, describe, suggest, recommend, introduce) DO NOT allow the SVOO pattern (*'explain me this' is an error!). They strictly require 'explain this TO me'.",
    explanationBn: "ল্যাটিন মূলের Verbs (explain, describe, suggest, announce)-এর পরে কখনো সরাসরি IO বসে না (*'explain me' ভুল); বলতে হবে 'explain the theorem TO the students'।",
    hint: "'Explain', 'suggest', 'describe' always require 'to'.",
    level: "advanced"
  },
  {
    id: 7,
    question: "Which of the following sentences contains a serious Latinate verb error frequently made by Bengali learners?",
    options: [
      "Please explain me the problem.",
      "Please explain the problem to me.",
      "Please teach me the problem.",
      "Please show me the problem."
    ],
    correctAnswer: 0,
    answer: "Please explain me the problem.",
    explanation: "*'Explain me'* is an ungrammatical calque from regional languages. The correct English is 'Please explain the problem to me'.",
    explanationBn: "বাংলায় 'আমাকে বুঝিয়ে দাও' দেখে অনেকেই *'Explain me the problem' বলে, যা মস্ত বড় ভুল। বলতে হবে 'Please explain the problem TO me'।",
    hint: "'Explain' cannot take an indirect object directly.",
    level: "intermediate"
  },
  {
    id: 8,
    question: "Which of the following Latinate verbs also FORBIDS the SVOO pattern and strictly requires 'TO'?",
    options: ["Suggest (e.g., 'He suggested a plan to me')", "Give", "Tell", "Teach"],
    correctAnswer: 0,
    answer: "Suggest (e.g., 'He suggested a plan to me')",
    explanation: "Like 'explain', 'suggest' cannot take an indirect object directly (*'He suggested me a plan' is WRONG! -> 'He suggested a plan TO me').",
    explanationBn: "'Suggest'-এর পরেও সরাসরি IO বসে না (*'suggested me' ভুল); বলতে হবে 'suggested a plan TO me'।",
    hint: "Never say *'He suggested me'*; say 'He suggested to me'.",
    level: "advanced"
  },
  {
    id: 9,
    question: "In 'Debangshu cooked a delicious meal for his family', what is the SVOO equivalent?",
    options: [
      "Debangshu cooked his family a delicious meal.",
      "Debangshu cooked to his family a meal.",
      "Debangshu was cooked a meal by his family.",
      "A meal cooked Debangshu for his family."
    ],
    correctAnswer: 0,
    answer: "Debangshu cooked his family a delicious meal.",
    explanation: "S + V + IO ('his family') + DO ('a delicious meal').",
    explanationBn: "S + V + IO ('his family') + DO ('a delicious meal') — এটি সমতুল্য SVOO রূপ।",
    hint: "IO 'his family' precedes DO 'a delicious meal'.",
    level: "basic"
  },
  {
    id: 10,
    question: "Which of the following ditransitive verbs takes 'FOR' when shifted to the prepositional pattern?",
    options: ["Carve", "Hand", "Forward", "Offer"],
    correctAnswer: 0,
    answer: "Carve",
    explanation: "'Carve' (creative craft) takes 'for': 'He carved a wooden sculpture for his mentor'.",
    explanationBn: "ভাস্কর্য বা সৃষ্টিমূলক কাজ প্রকাশ করায় 'carve'-এর সাথে 'for' বসবে ('carved ... for his mentor')।",
    hint: "Creative craft verb.",
    level: "intermediate"
  },
  {
    id: 11,
    question: "In the sentence 'Swadeep showed Debangshu the debug logs', what is the prepositional equivalent?",
    options: [
      "Swadeep showed the debug logs to Debangshu.",
      "Swadeep showed the debug logs for Debangshu.",
      "Swadeep showed with Debangshu the debug logs.",
      "Swadeep showed by Debangshu the debug logs."
    ],
    correctAnswer: 0,
    answer: "Swadeep showed the debug logs to Debangshu.",
    explanation: "'Show' is a visual transfer verb requiring 'to'.",
    explanationBn: "'Show' হস্তান্তর/প্রদর্শনমূলক ক্রিয়া হওয়ায় 'to' Preposition গ্রহণ করে ('showed ... to Debangshu')।",
    hint: "Visual transfer uses 'to'.",
    level: "basic"
  },
  {
    id: 12,
    question: "Why do we prefer the prepositional pattern (SVO + Prep) when the Indirect Object is very LONG or complex (End-Weight Principle)?",
    options: [
      "Because English syntax naturally places long, heavy informational elements at the end of the sentence (e.g., 'He gave the scholarship to a student who had demonstrated extraordinary resilience')",
      "Because short words must always go last",
      "Because prepositions make sentences shorter",
      "It is an arbitrary style guide without reason"
    ],
    correctAnswer: 0,
    answer: "Because English syntax naturally places long, heavy informational elements at the end of the sentence (e.g., 'He gave the scholarship to a student who had demonstrated extraordinary resilience')",
    explanation: "The Principle of End-Weight: Heavy/long phrases naturally shift to sentence-final position for clarity and cognitive balance.",
    explanationBn: "Principle of End-Weight (বাক্যান্তিক গুরুত্বের নীতি): বড় বা জটিল পদগুলোকে বাক্যের শেষে Preposition সহ বসালে বাক্যের ভারসাম্য ও স্পষ্টতা বজায় থাকে।",
    hint: "Heavy information naturally sits at the end of a clause.",
    level: "advanced"
  },
  {
    id: 13,
    question: "Which sentence better respects the Principle of End-Weight?",
    options: [
      "Sukanta Sir gave the award to the dedicated student who had solved all fifty complex grammar puzzles.",
      "Sukanta Sir gave the dedicated student who had solved all fifty complex grammar puzzles the award.",
      "Both are equally elegant",
      "Neither is acceptable"
    ],
    correctAnswer: 0,
    answer: "Sukanta Sir gave the award to the dedicated student who had solved all fifty complex grammar puzzles.",
    explanation: "Placing the short DO ('the award') first and the heavy relative clause IO at the end prevents awkward structural disruption.",
    explanationBn: "ছোট Object 'the award' আগে এনে বড় বর্ণনামূলক অংশটিকে বাক্যের শেষে 'to'-এর পরে রাখা অধিকতর প্রাঞ্জল ও ছন্দময়।",
    hint: "Short direct object first, heavy relative clause recipient last.",
    level: "advanced"
  },
  {
    id: 14,
    question: "In 'Abhronila designed a responsive website for the Barrackpore academy', identify the Direct Object and Prepositional Recipient:",
    options: [
      "Direct Object: 'a responsive website'; Recipient: 'the Barrackpore academy'",
      "Direct Object: 'the Barrackpore academy'; Recipient: 'a responsive website'",
      "Subject: 'a responsive website'",
      "Object: 'designed'"
    ],
    correctAnswer: 0,
    answer: "Direct Object: 'a responsive website'; Recipient: 'the Barrackpore academy'",
    explanation: "'A responsive website' is the product designed (DO); 'the Barrackpore academy' is the beneficiary recipient.",
    explanationBn: "'a responsive website' হলো Direct Object এবং 'the Barrackpore academy' হলো 'for'-এর সাথে যুক্ত Recipient।",
    hint: "What was designed? For whom?",
    level: "basic"
  },
  {
    id: 15,
    question: "Which of the following verbs CANNOT participate in Dative Alternation and ONLY allows the prepositional pattern?",
    options: ["Describe", "Give", "Send", "Tell"],
    correctAnswer: 0,
    answer: "Describe",
    explanation: "'Describe' is a Latinate verb: 'Describe the scene to me' (never *'Describe me the scene'*).",
    explanationBn: "'Describe' ল্যাটিন জাতের Verb হওয়ায় শুধুমাত্র Prepositional রূপ 'Describe the scene to me' গ্রহণ করে (*'Describe me' ভুল)।",
    hint: "Latinate verb of communication.",
    level: "intermediate"
  },
  {
    id: 16,
    question: "Which sentence is grammatically CORRECT?",
    options: [
      "The mentor recommended a comprehensive reference book to the aspirants.",
      "The mentor recommended the aspirants a comprehensive reference book.",
      "The mentor recommended to the aspirants a comprehensive reference book.",
      "The mentor recommended for the aspirants a reference book."
    ],
    correctAnswer: 0,
    answer: "The mentor recommended a comprehensive reference book to the aspirants.",
    explanation: "'Recommend' is Latinate and requires 'recommend [something] TO [someone]'.",
    explanationBn: "'Recommend'-এর ক্ষেত্রে 'recommend [something] TO [someone]' গঠন ব্যবহার করতে হয়।",
    hint: "'Recommend' requires 'to'.",
    level: "advanced"
  },
  {
    id: 17,
    question: "In 'Tuhina knitted her grandmother a warm woollen scarf', what is the 'FOR' dative transformation?",
    options: [
      "Tuhina knitted a warm woollen scarf for her grandmother.",
      "Tuhina knitted to her grandmother a scarf.",
      "Tuhina knitted for her grandmother a scarf.",
      "A scarf knitted Tuhina for her grandmother."
    ],
    correctAnswer: 0,
    answer: "Tuhina knitted a warm woollen scarf for her grandmother.",
    explanation: "'Knit' is a creation verb taking 'for' when the recipient follows the DO.",
    explanationBn: "'Knit' তৈরি প্রকাশক Verb হওয়ায় 'for' বসবে: 'knitted a warm woollen scarf FOR her grandmother'।",
    hint: "Creation verb uses 'for'.",
    level: "basic"
  },
  {
    id: 18,
    question: "In the sentence 'Debangshu wrote his mentor an appreciative email', what is the prepositional equivalent?",
    options: [
      "Debangshu wrote an appreciative email to his mentor.",
      "Debangshu wrote an appreciative email for his mentor.",
      "Debangshu wrote with his mentor an email.",
      "Debangshu wrote at his mentor an email."
    ],
    correctAnswer: 0,
    answer: "Debangshu wrote an appreciative email to his mentor.",
    explanation: "'Write' as a communicative act directed at a recipient takes 'to'. (If writing on someone's behalf, 'for' can be used, but recipient is 'to').",
    explanationBn: "বার্তা প্রেরণের ক্ষেত্রে 'write'-এর সাথে 'to' বসবে: 'wrote an email TO his mentor'।",
    hint: "Communication to a recipient uses 'to'.",
    level: "basic"
  },
  {
    id: 19,
    question: "Which of the following represents a correct double-pronoun construction in standard English?",
    options: [
      "Swadeep handed it to them.",
      "Swadeep handed them it.",
      "Swadeep handed to them it.",
      "Swadeep handed it they."
    ],
    correctAnswer: 0,
    answer: "Swadeep handed it to them.",
    explanation: "When both objects are pronouns ('it' and 'them'), English mandates DO ('it') + to + IO ('them').",
    explanationBn: "উভয় পদই Pronoun হলে 'handed it to them' গঠনটিই বিশুদ্ধ ইংরেজি রীতি।",
    hint: "'It' + to + 'them'.",
    level: "intermediate"
  },
  {
    id: 20,
    question: "In 'The committee announced the results to the eager candidates', why is 'to' mandatory?",
    options: [
      "'Announce' is a Latinate verb of public declaration that never permits a direct SVOO structure",
      "Because candidates is plural",
      "Because results is plural",
      "It is an idiom"
    ],
    correctAnswer: 0,
    answer: "'Announce' is a Latinate verb of public declaration that never permits a direct SVOO structure",
    explanation: "We say 'announce [something] to [someone]', never *'announce someone something'*.",
    explanationBn: "'Announce' ল্যাটিন জাতের Verb হওয়ায় সর্বদা 'announce [something] TO [someone]' গঠন মেনে চলে (*'announced the candidates the results' ভুল)।",
    hint: "Latinate verb of public declaration.",
    level: "advanced"
  },
  {
    id: 21,
    question: "In 'Can you fetch me a glass of cold water?', what is the 'FOR' dative equivalent?",
    options: [
      "Can you fetch a glass of cold water for me?",
      "Can you fetch a glass of cold water to me?",
      "Can you fetch for me a glass of water?",
      "Can you fetch with me a glass of water?"
    ],
    correctAnswer: 0,
    answer: "Can you fetch a glass of cold water for me?",
    explanation: "'Fetch' (go and bring) represents a procurement service for someone, requiring 'for'.",
    explanationBn: "'Fetch' (সংগ্রহ করে আনা) কাজের ক্ষেত্রে 'for' বসবে: 'fetch a glass of cold water FOR me'।",
    hint: "Procurement verb uses 'for'.",
    level: "basic"
  },
  {
    id: 22,
    question: "In 'Swadeep read the children an inspiring tale', what is the 'TO' dative equivalent?",
    options: [
      "Swadeep read an inspiring tale to the children.",
      "Swadeep read an inspiring tale for the children.",
      "Swadeep read with the children an inspiring tale.",
      "Swadeep read by the children an inspiring tale."
    ],
    correctAnswer: 0,
    answer: "Swadeep read an inspiring tale to the children.",
    explanation: "'Read' aloud as a communicative delivery to listeners takes 'to'.",
    explanationBn: "শোনানোর উদ্দেশ্যে পাঠ করায় 'read'-এর সাথে 'to' বসবে: 'read an inspiring tale TO the children'।",
    hint: "Reading aloud to listeners takes 'to'.",
    level: "basic"
  },
  {
    id: 23,
    question: "What is the Passive Voice conversion of 'Mentor Sukanta Sir taught Swadeep grammar' using the Indirect Object as subject?",
    options: [
      "Swadeep was taught grammar by Mentor Sukanta Sir.",
      "Grammar was taught Swadeep by Mentor Sukanta Sir.",
      "Grammar was taught to Swadeep by Mentor Sukanta Sir.",
      "Swadeep was taught to grammar by Mentor Sukanta Sir."
    ],
    correctAnswer: 0,
    answer: "Swadeep was taught grammar by Mentor Sukanta Sir.",
    explanation: "The Indirect Object 'Swadeep' becomes the subject; the Direct Object 'grammar' remains as the Retained Object.",
    explanationBn: "Indirect Object 'Swadeep' Subject হয়ে 'Swadeep was taught grammar by Sukanta Sir' রূপ নেয়, যেখানে 'grammar' হলো Retained Object।",
    hint: "Indirect object becomes the passive subject.",
    level: "intermediate"
  },
  {
    id: 24,
    question: "What is the Passive Voice conversion of 'Mentor Sukanta Sir taught Swadeep grammar' using the Direct Object as subject?",
    options: [
      "Grammar was taught to Swadeep by Mentor Sukanta Sir.",
      "Grammar was taught Swadeep by Mentor Sukanta Sir.",
      "Swadeep was taught grammar by Mentor Sukanta Sir.",
      "To Swadeep was taught grammar by Mentor Sukanta Sir."
    ],
    correctAnswer: 0,
    answer: "Grammar was taught to Swadeep by Mentor Sukanta Sir.",
    explanation: "When Direct Object 'Grammar' becomes the passive subject, the recipient requires 'to' ('was taught to Swadeep').",
    explanationBn: "Direct Object 'Grammar' Subject হলে Recipient-এর পূর্বে 'to' বসে: 'Grammar was taught TO Swadeep by Sukanta Sir'।",
    hint: "Direct object as subject requires 'to' before the recipient.",
    level: "intermediate"
  },
  {
    id: 25,
    question: "What is the supreme practical rule for Ditransitive positioning according to Mentor Sukanta Hui?",
    options: [
      "Master the two standard patterns: SVOO (no preposition) and SVO + Prep (To for transfer, For for creation/procurement), and strictly avoid *'explain me'* errors with Latinate communication verbs.",
      "Always delete indirect objects from sentences",
      "Only use prepositions with one-syllable verbs",
      "Ditransitive verbs can never be converted to passive voice"
    ],
    correctAnswer: 0,
    answer: "Master the two standard patterns: SVOO (no preposition) and SVO + Prep (To for transfer, For for creation/procurement), and strictly avoid *'explain me'* errors with Latinate communication verbs.",
    explanation: "Distinguishing Germanic ditransitives (give me, buy me) from Latinate non-ditransitives (explain to me, suggest to me) is the pinnacle of ditransitive mastery.",
    explanationBn: "সুকান্ত স্যারের নির্দেশ: SVOO এবং SVO+Prep-এর রূপান্তর আয়ত্ত করো, 'To' (হস্তান্তর) ও 'For' (তৈরি)-র পার্থক্য বুঝো এবং 'explain to me' / 'suggest to me'-র মতো ল্যাটিন ক্রিয়াপদে 'to' বাদ দেওয়ার মারাত্মক ভুল পরিহার করো।",
    hint: "SVOO vs SVO+Prep and avoiding Latinate *'explain me'* errors.",
    level: "basic"
  }
];

export default questions;
