// topic3_questions.js
// Module 001_003: Classification of Sentences by Purpose & Communicative Mood
// Topic 3: Imperative Sentences: Commands, Requests, Instructions & The Implied 'You'
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What is the grammatical subject of the imperative sentence 'Submit the code review before 5 PM'?",
    options: [
      "The code review",
      "5 PM",
      "The implied second-person pronoun '(You)'",
      "There is no subject in imperative sentences"
    ],
    correctAnswer: 2,
    explanation: "In standard imperative sentences, the second-person subject '(You)' is structurally implied and omitted from surface word order.",
    explanationBn: "Imperative বাক্যে Second-person Subject '(You)' সর্বদা উহ্য (Implied) থাকে, সরাসরি বাক্যে দৃশ্যমান থাকে না।"
  },
  {
    id: 2,
    question: "Which of the following sentences expresses an IMPERATIVE OF INSTRUCTION / MANUAL DIRECTION?",
    options: [
      "Why don't you read the manual?",
      "First, import React and ReactDOM, then render the component into the root DOM node.",
      "You must be very proud of your application.",
      "May you succeed in your examination!"
    ],
    correctAnswer: 1,
    explanation: "Step-by-step sequential directions starting with base verbs ('import', 'render') represent instructional imperatives typical of manuals and coding guides.",
    explanationBn: "ধাপভিত্তিক নির্দেশনামূলক বাক্য যা মূল Verb দিয়ে শুরু হয় ('import', 'render'), তা Instructional Imperative-এর উদাহরণ।"
  },
  {
    id: 3,
    question: "How is an EMPHATIC IMPERATIVE formed when the speaker wants to show strong urgency, warmth, or insistence?",
    options: [
      "By adding 'Please' at the end.",
      "By prefixing the auxiliary 'Do' before the base verb (e.g., 'Do visit us tomorrow!').",
      "By using the past tense form of the verb.",
      "By turning it into a passive structure."
    ],
    correctAnswer: 1,
    explanation: "Placing 'Do' before the base verb in an imperative sentence creates an Emphatic Imperative indicating warmth, hospitality, or urgency: 'Do visit us tomorrow!'",
    explanationBn: "Imperative বাক্যের শুরুতে 'Do' বসিয়ে জোর (Emphasis), আন্তরিক আমন্ত্রণ বা জরুরি ভাব প্রকাশ করা হয়: 'Do visit us tomorrow!'"
  },
  {
    id: 4,
    question: "Which of the following represents a NEGATIVE IMPERATIVE?",
    options: [
      "Never push unverified code to the production branch.",
      "You are not pushing code.",
      "Why did you not push the code?",
      "No pushing of code allowed."
    ],
    correctAnswer: 0,
    explanation: "'Never push unverified code...' starts with the negative adverb 'Never' followed by base verb 'push', issuing a direct negative prohibition.",
    explanationBn: "'Never push...' একটি সরাসরি নেতিবাচক নিষেধাজ্ঞা (Prohibition), যা Negative Imperative-এর উৎকৃষ্ট উদাহরণ।"
  },
  {
    id: 5,
    question: "Identify the communicative function of: 'Have a wonderful journey across North Bengal!'",
    options: [
      "Strict military command",
      "Imperative of Social Formula / Good Wish",
      "Assertive statement of fact",
      "Interrogative question"
    ],
    correctAnswer: 1,
    explanation: "'Have a wonderful journey' uses imperative syntax ('Have...') to express a friendly social wish or cordial greeting.",
    explanationBn: "'Have a wonderful journey' হলো শুভেচ্ছা বা সৌজন্য প্রকাশের জন্য ব্যবহৃত Social Imperative।"
  },
  {
    id: 6,
    question: "When an imperative sentence expresses a third-person command or permission, what structure is used?",
    options: [
      "Let + Object Pronoun (him/her/them) + Base Verb",
      "Let + Subject Pronoun (he/she/they) + Base Verb",
      "May + Subject + Base Verb",
      "Should + Subject + Base Verb"
    ],
    correctAnswer: 0,
    explanation: "Third-person imperatives are formed with 'Let' followed by the objective case pronoun and bare infinitive: 'Let him explain his logic' (NOT *Let he explain).",
    explanationBn: "Third-person Imperative গঠনে 'Let'-এর পরে Objective Pronoun (him/her/them) এবং মূল Verb-এর Base Form বসে: 'Let him explain...'"
  },
  {
    id: 7,
    question: "How do you make an imperative command extremely polite while maintaining standard grammar?",
    options: [
      "Adding 'Kindly' or 'Please' at the beginning or end of the clause.",
      "Putting the verb in the future continuous tense.",
      "Adding exclamation marks after every word.",
      "Omitting the main verb."
    ],
    correctAnswer: 0,
    explanation: "'Please' and 'Kindly' are politeness markers used with imperatives to convert direct commands into courteous requests.",
    explanationBn: "Imperative বাক্যের শুরুতে বা শেষে 'Please' বা 'Kindly' যোগ করে আদেশকে মার্জিত অনুরোধে পরিণত করা হয়।"
  },
  {
    id: 8,
    question: "Which of the following is an IMPERATIVE OF WARNING?",
    options: [
      "Watch out for the live electrical wire!",
      "I watched the electrical wire.",
      "The electrical wire is live.",
      "Can you see the electrical wire?"
    ],
    correctAnswer: 0,
    explanation: "'Watch out for the live electrical wire!' is an immediate cautionary warning in imperative mood, usually ending with an exclamation mark.",
    explanationBn: "'Watch out for...' হলো তাৎক্ষণিক সতর্কতামূলক Imperative of Warning।"
  },
  {
    id: 9,
    question: "What is the passive voice transformation of the imperative command 'Open the gate'?",
    options: [
      "The gate is opened by you.",
      "Let the gate be opened.",
      "You are opening the gate.",
      "The gate should open."
    ],
    correctAnswer: 1,
    explanation: "Transitive imperative commands are converted to passive voice using the standard formula: 'Let + Object + be + V3 (Past Participle)' -> 'Let the gate be opened'.",
    explanationBn: "আদেশমূলক Imperative বাক্যের Passive Voice-এর নিয়ম: Let + Object + be + Verb-এর Past Participle (V3) -> 'Let the gate be opened'।"
  },
  {
    id: 10,
    question: "What is the passive voice transformation of the advice 'Help the poor'?",
    options: [
      "The poor should be helped.",
      "Let the poor be helped by anyone.",
      "You help the poor.",
      "Let the poor help you."
    ],
    correctAnswer: 0,
    explanation: "Imperatives expressing moral duty or advice are most appropriately transformed into passive voice using 'should be + V3': 'The poor should be helped'.",
    explanationBn: "উপদেশ বা নৈতিক দায়িত্বমূলক বাক্যের ক্ষেত্রে 'Subject + should be + V3' কাঠামো সর্বাধিক মার্জিত ও শুদ্ধ: 'The poor should be helped'।"
  },
  {
    id: 11,
    question: "In the imperative sentence 'Pass the salt, will you?', what is the role of 'will you?'",
    options: [
      "It transforms the sentence into an assertive fact.",
      "It functions as a polite question tag softening the command.",
      "It indicates future continuous tense.",
      "It is a syntactic error."
    ],
    correctAnswer: 1,
    explanation: "'Will you?' is an attached question tag used in colloquial spoken English to soften a direct command into a casual, polite request.",
    explanationBn: "'Will you?' হলো Tag Question যা প্রত্যক্ষ আদেশকে নরম করে অনুরোধের রূপ দেয়।"
  },
  {
    id: 12,
    question: "Which of the following sentences features an OVERT (explicitly stated) 'You' subject for contrast or anger?",
    options: [
      "You clean your desk right this instant, Swadeep!",
      "Clean your desk immediately.",
      "Let Swadeep clean his desk.",
      "Please clean the desk."
    ],
    correctAnswer: 0,
    explanation: "In emphatic, angry, or contrastive spoken imperatives, the speaker may explicitly state 'You' for direct focus: 'You clean your desk right this instant!'.",
    explanationBn: "ক্রোধ, জোর বা নির্দিষ্ট কাউকে আলাদা করতে বক্তা কখনো কখনো Imperative বাক্যে 'You' স্পষ্টভাবে উচ্চারণ করে: 'You clean your desk...!'"
  },
  {
    id: 13,
    question: "Identify the communicative function of: 'Come in and make yourself at home.'",
    options: [
      "Legal prohibition",
      "Warm hospitality and invitation",
      "Strict interrogation",
      "Philosophical assertion"
    ],
    correctAnswer: 1,
    explanation: "'Come in and make yourself at home' is a classic imperative of welcoming invitation and hospitality.",
    explanationBn: "এটি অতিথিকে আন্তরিকভাবে গ্রহণ করার জন্য ব্যবহৃত Hospitality & Invitation Imperative।"
  },
  {
    id: 14,
    question: "Which is the standard negative imperative for 'Be careless'?",
    options: [
      "Don't be careless.",
      "Be not careless.",
      "Not be careless.",
      "Do not careless."
    ],
    correctAnswer: 0,
    explanation: "Negative imperatives with the copula 'be' mandate the dummy auxiliary 'Don't': 'Don't be careless' (NOT *Be not careless in modern standard English).",
    explanationBn: "Copular 'be' সহযোগে গঠিত বাক্যের Negative Imperative-এ 'Don't be...' বসে: 'Don't be careless'।"
  },
  {
    id: 15,
    question: "Identify the error in: 'Please to lend me your notes for today.'",
    options: [
      "'Please' must be followed by a bare infinitive (base form 'lend'), NOT 'to lend'.",
      "'Lend' should be 'borrow'.",
      "'Notes' should be singular.",
      "'For today' should be 'on today'."
    ],
    correctAnswer: 0,
    explanation: "The politeness marker 'Please' modifies an imperative clause and must be followed by a bare base verb ('Please lend me...'), not a to-infinitive.",
    explanationBn: "'Please'-এর পরে সরাসরি মূল Verb-এর Base Form বসে, কোনো 'to' বসে না: 'Please lend me...' ('Please to lend' ভুল)।"
  },
  {
    id: 16,
    question: "Which of the following sentences is an IMPERATIVE WITH AN INDEFINITE PRONOUN subject?",
    options: [
      "Somebody open the ventilation window!",
      "Did somebody open the window?",
      "Somebody has opened the window.",
      "The window was opened by somebody."
    ],
    correctAnswer: 0,
    explanation: "Imperatives directed at a group can use an indefinite pronoun (somebody, everyone) as the vocative/subject: 'Somebody open the ventilation window!' (notice bare verb 'open', not 3rd-person 'opens').",
    explanationBn: "গ্রুপের ক্ষেত্রে Indefinite Pronoun যুক্ত Imperative-এ মূল Verb-এর Base Form বসে (যেমন: 'Somebody open...', 'opens' নয়)।"
  },
  {
    id: 17,
    question: "Which punctuation mark is most appropriate for a calm, routine imperative instruction?",
    options: [
      "A period (full stop)",
      "An exclamation mark",
      "A question mark",
      "A semicolon"
    ],
    correctAnswer: 0,
    explanation: "Routine, courteous, or instructional imperatives (e.g., 'Turn left at the post office.') conventionally end with a period (.). Exclamation marks are reserved for urgent commands or cries.",
    explanationBn: "সাধারণ নির্দেশ বা অনুরোধমূলক Imperative বাক্যের শেষে Full Stop (.) বসে; কেবল তীব্র আদেশ বা সতর্কবার্তায় Exclamation Mark (!) বসে।"
  },
  {
    id: 18,
    question: "How do you transform the assertive 'You are requested not to pluck flowers' into a direct imperative?",
    options: [
      "Don't pluck flowers, please.",
      "Pluck no flowers.",
      "Why are you plucking flowers?",
      "You will not pluck flowers."
    ],
    correctAnswer: 0,
    explanation: "'You are requested not to pluck flowers' translates directly into the courteous negative imperative: 'Don't pluck flowers, please' (or 'Please do not pluck flowers').",
    explanationBn: "'You are requested not to...' পরোক্ষ রূপটির প্রত্যক্ষ Imperative রূপ হলো: 'Please do not pluck flowers' বা 'Don't pluck flowers, please'।"
  },
  {
    id: 19,
    question: "Which of the following demonstrates a CONDITIONAL IMPERATIVE (Imperative + 'and/or' + Clause)?",
    options: [
      "Work hard, and you will top the merit list.",
      "Work hard because you want to top the merit list.",
      "While working hard, you top the list.",
      "You must work hard to top the list."
    ],
    correctAnswer: 0,
    explanation: "'Work hard, and you will top the merit list' is a Conditional Imperative equivalent to 'If you work hard, you will top the merit list'.",
    explanationBn: "'Imperative + and/or + Clause' কাঠামোটি শর্ত নির্দেশ করে: 'Work hard, and you will top...' মানে 'If you work hard, you will top...'।"
  },
  {
    id: 20,
    question: "What does 'Hurry up, or you will miss the train' mean logically?",
    options: [
      "If you do not hurry up, you will miss the train.",
      "Because you hurried up, you missed the train.",
      "You are hurrying up to catch the train.",
      "Miss the train after hurrying up."
    ],
    correctAnswer: 0,
    explanation: "An imperative followed by 'or' expresses a negative condition: 'Imperative + or...' = 'If you do not [Verb], then [Consequence]'.",
    explanationBn: "'Imperative + or' কাঠামো নেতিবাচক শর্ত প্রকাশ করে: 'তাড়াতাড়ি করো, অন্যথায় ট্রেন মিস করবে' = 'If you do not hurry, you will miss the train'।"
  },
  {
    id: 21,
    question: "Choose the correct indirect speech conversion for Sukanta Sir's command: 'Sukanta Sir said to Swadeep, \"Write the clean code.\"'",
    options: [
      "Sukanta Sir ordered Swadeep to write the clean code.",
      "Sukanta Sir said that Swadeep should wrote the clean code.",
      "Sukanta Sir told Swadeep that he write clean code.",
      "Sukanta Sir asked Swadeep if he wrote clean code."
    ],
    correctAnswer: 0,
    explanation: "In indirect narration, imperative sentences replace the reporting verb with 'ordered/instructed/advised' followed by the to-infinitive ('to write'): 'Sukanta Sir ordered Swadeep to write the clean code.'",
    explanationBn: "Indirect Narration-এ Imperative বাক্যে Reporting Verb পরিবর্তিত হয়ে ordered/advised হয় এবং Comma উঠে 'to + V1' বসে।"
  },
  {
    id: 22,
    question: "Which of the following is an imperative of PROHIBITION / REGULATION?",
    options: [
      "Do not park vehicles in front of the gate.",
      "Parking is a daily routine.",
      "Where should I park my vehicle?",
      "Vehicles are parked here."
    ],
    correctAnswer: 0,
    explanation: "'Do not park vehicles in front of the gate' is an official regulatory prohibition in negative imperative form.",
    explanationBn: "আইনগত বা প্রাতিষ্ঠানিক নিষেধাজ্ঞা জারির জন্য 'Do not + Base Verb' ব্যবহার করা হয়।"
  },
  {
    id: 23,
    question: "Which imperative form correctly uses 'Let' for first-person plural collective action?",
    options: [
      "Let us resolve this architectural bottleneck.",
      "Let we resolve this bottleneck.",
      "Let us to resolve this bottleneck.",
      "Let our resolve this bottleneck."
    ],
    correctAnswer: 0,
    explanation: "'Let us + bare infinitive' is the correct syntax for first-person plural collective action (shortened to 'Let's').",
    explanationBn: "ফার্স্ট পারসন বহুবচনে যৌথ পদক্ষেপের জন্য 'Let us + Base Verb' সঠিক রূপ ('Let we' বা 'Let us to' সম্পূর্ণ ভুল)।"
  },
  {
    id: 24,
    question: "In military or formal drill commands, what is the characteristic word order?",
    options: [
      "Concise bare verbs with immediate target: 'Attention!', 'About turn!', 'Quick march!'",
      "Full descriptive declarative clauses.",
      "Interrogative questions with auxiliary inversion.",
      "Complex sentences with subordinate clauses."
    ],
    correctAnswer: 0,
    explanation: "Military commands are ultra-concise imperative verbs or verb-phrases delivered with sharp falling tone: 'Attention!', 'Forward march!'.",
    explanationBn: "সামরিক বা প্রাতিষ্ঠানিক ড্রিলের আদেশগুলো অত্যন্ত সংক্ষিপ্ত ও ক্ষিপ্র হয়: 'Attention!', 'Quick march!'"
  },
  {
    id: 25,
    question: "Identify the sentence that is NOT an imperative sentence:",
    options: [
      "Kindly hand over the report.",
      "Don't hesitate to ask doubts.",
      "You should practice grammar every morning.",
      "Take two tablets after dinner."
    ],
    correctAnswer: 2,
    explanation: "'You should practice grammar every morning' is an ASSERTIVE/DECLARATIVE sentence containing an overt modal 'should', not a true syntactic imperative.",
    explanationBn: "'You should practice...' একটি Assertive / Declarative বাক্য যাতে Modal Verb 'should' রয়েছে; এটি সরাসরি Syntactic Imperative বাক্য নয়।"
  }
];

export default questions;
