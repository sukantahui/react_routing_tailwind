// topic8_questions.js
// Module 001_003: Classification of Sentences by Purpose & Communicative Mood
// Topic 8: Module 001_003 Capstone Self-Assessment & Synthesis
// 30 Comprehensive Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "Classify the sentence: 'The Ganges flows by the historic town of Barrackpore.'",
    options: [
      "Assertive / Declarative",
      "Interrogative",
      "Imperative",
      "Optative"
    ],
    correctAnswer: 0,
    explanation: "This sentence states a factual geographical reality and ends with a period (.), making it an Assertive / Declarative sentence.",
    explanationBn: "বাক্যটি একটি ভৌগোলিক সত্য বিবৃতি প্রকাশ করছে এবং এর শেষে Full Stop (.) আছে, তাই এটি Assertive / Declarative বাক্য।"
  },
  {
    id: 2,
    question: "Classify the sentence: 'Did you review the state management architecture in React?'",
    options: [
      "Assertive",
      "Interrogative (Yes/No Question with Auxiliary Inversion)",
      "Imperative",
      "Exclamatory"
    ],
    correctAnswer: 1,
    explanation: "The sentence starts with inverted auxiliary 'Did' followed by subject 'you' and verb 'review', ending with a question mark (?).",
    explanationBn: "বাক্যটি Auxiliary Verb 'Did' দিয়ে শুরু হয়ে প্রশ্ন করেছে এবং শেষে Question Mark (?) রয়েছে, তাই এটি Interrogative বাক্য।"
  },
  {
    id: 3,
    question: "Classify the sentence: 'Please handle the sensitive customer database with utmost care.'",
    options: [
      "Imperative (Polite Request)",
      "Assertive",
      "Interrogative",
      "Optative"
    ],
    correctAnswer: 0,
    explanation: "Introduced by politeness marker 'Please' and commanding action with bare verb 'handle' (implied subject 'You'), this is an Imperative sentence.",
    explanationBn: "'Please' এবং মূল Verb 'handle' দিয়ে শুরু হয়ে অনুরোধ প্রকাশ করায় এটি একটি Imperative বাক্য।"
  },
  {
    id: 4,
    question: "Classify the sentence: 'What an extraordinary breakthrough the AI team achieved!'",
    options: [
      "Exclamatory",
      "Interrogative",
      "Optative",
      "Assertive"
    ],
    correctAnswer: 0,
    explanation: "Introduced by 'What an...' and terminating with an exclamation point (!), this expresses intense emotional admiration as an Exclamatory sentence.",
    explanationBn: "'What an...' দিয়ে শুরু হয়ে তীব্র বিস্ময় ও প্রশংসা প্রকাশ করায় এবং শেষে (!) থাকায় এটি Exclamatory বাক্য।"
  },
  {
    id: 5,
    question: "Classify the sentence: 'May you find peace, prosperity, and joy in your new home!'",
    options: [
      "Optative (Prayer / Blessing)",
      "Interrogative",
      "Imperative",
      "Assertive"
    ],
    correctAnswer: 0,
    explanation: "Beginning with modal 'May' and expressing a heartfelt blessing and prayer, this is an Optative sentence.",
    explanationBn: "'May' দিয়ে শুরু হয়ে শুভকামনা ও আশীর্বাদ প্রকাশ করায় এটি একটি Optative বাক্য।"
  },
  {
    id: 6,
    question: "What is the correct tag for: 'Swadeep can speak three programming languages fluently, ________?'",
    options: [
      "can't he?",
      "can he?",
      "doesn't he?",
      "isn't he?"
    ],
    correctAnswer: 0,
    explanation: "Positive modal 'can' takes the contracted negative tag 'can't he?'.",
    explanationBn: "Positive Modal 'can'-এর ক্ষেত্রে Negative Tag হবে 'can't he?'।"
  },
  {
    id: 7,
    question: "What is the correct tag for: 'I am your primary coding mentor, ________?'",
    options: [
      "aren't I?",
      "amn't I?",
      "am I?",
      "don't I?"
    ],
    correctAnswer: 0,
    explanation: "Positive 'I am' strictly takes the tag 'aren't I?' in standard English.",
    explanationBn: "Standard English-এ 'I am'-এর Negative Tag সর্বদা 'aren't I?' হয়।"
  },
  {
    id: 8,
    question: "What is the correct tag for: 'Let's deploy the application to AWS, ________?'",
    options: [
      "shall we?",
      "will we?",
      "don't we?",
      "can we?"
    ],
    correctAnswer: 0,
    explanation: "Cohort proposals with 'Let's' (let us) take 'shall we?'.",
    explanationBn: "'Let's'-এর ক্ষেত্রে Tag Question সর্বদা 'shall we?' হয়।"
  },
  {
    id: 9,
    question: "What is the correct tag for: 'He seldom makes errors in syntax parsing, ________?'",
    options: [
      "does he?",
      "doesn't he?",
      "is he?",
      "isn't he?"
    ],
    correctAnswer: 0,
    explanation: "'Seldom' is semantically negative, requiring a positive tag: 'does he?'.",
    explanationBn: "'Seldom' না-বোধক শব্দ হওয়ায় Tag হবে Positive: 'does he?'।"
  },
  {
    id: 10,
    question: "What is the correct tag for: 'Nobody was present in the auditorium, ________?'",
    options: [
      "were they?",
      "wasn't it?",
      "was he?",
      "weren't they?"
    ],
    correctAnswer: 0,
    explanation: "'Nobody' is negative (demanding positive tag) and refers to people (pronoun 'they' + plural verb 'were'): 'were they?'.",
    explanationBn: "'Nobody' না-বোধক এবং Tag-এ Pronoun 'they' ও Plural Verb 'were' নিয়ে 'were they?' গঠন করে।"
  },
  {
    id: 11,
    question: "What is the correct tag for: 'Nothing went wrong during the live stream, ________?'",
    options: [
      "did it?",
      "didn't it?",
      "did they?",
      "was it?"
    ],
    correctAnswer: 0,
    explanation: "'Nothing' is negative and singular inanimate ('it'), requiring positive tag: 'did it?'.",
    explanationBn: "'Nothing' না-বোধক ও বস্তুবাচক ('it'), তাই Positive Tag হবে 'did it?'।"
  },
  {
    id: 12,
    question: "What is the correct tag for: 'Shut down the development server, ________?'",
    options: [
      "will you?",
      "do you?",
      "shall you?",
      "don't you?"
    ],
    correctAnswer: 0,
    explanation: "Affirmative imperative requests/commands take 'will you?' (or 'won't you?'): 'will you?'.",
    explanationBn: "Imperative বাক্যের ক্ষেত্রে Tag হিসেবে 'will you?' বসে।"
  },
  {
    id: 13,
    question: "What is the correct tag for: 'Don't interrupt the speaker, ________?'",
    options: [
      "will you?",
      "won't you?",
      "shall you?",
      "must you?"
    ],
    correctAnswer: 0,
    explanation: "Negative imperatives with 'Don't' strictly take positive 'will you?'.",
    explanationBn: "Negative Imperative ('Don't...') বাক্যে সর্বদা 'will you?' বসে।"
  },
  {
    id: 14,
    question: "Convert 'Every student must attend the laboratory' into a negative sentence without changing its meaning:",
    options: [
      "There is no student but must attend the laboratory.",
      "No student must attend the laboratory.",
      "Every student must not attend the laboratory.",
      "Students do not attend the laboratory."
    ],
    correctAnswer: 0,
    explanation: "'Every + Noun' transforms into 'There is no + Noun + but...': 'There is no student but must attend the laboratory.'",
    explanationBn: "'Every + Noun' রূপান্তর হয়ে 'There is no + Noun + but...' হয়।"
  },
  {
    id: 15,
    question: "Convert 'Only graduates can apply for this post' into a negative sentence:",
    options: [
      "None but graduates can apply for this post.",
      "Nobody can apply for this post.",
      "Graduates cannot apply for this post.",
      "Only not graduates can apply."
    ],
    correctAnswer: 0,
    explanation: "'Only' referring to persons transforms into 'None but': 'None but graduates can apply for this post.'",
    explanationBn: "ব্যক্তিবাচক ক্ষেত্রে 'Only'-এর জায়গায় 'None but' বসে।"
  },
  {
    id: 16,
    question: "Convert 'He is too proud to beg' into a complex negative sentence:",
    options: [
      "He is so proud that he will not beg.",
      "He is very proud that he cannot beg.",
      "He is too proud that he begs.",
      "He does not beg because of pride."
    ],
    correctAnswer: 0,
    explanation: "'Too + Adj + to + Verb' transforms into 'so + Adj + that + Subject + cannot/will not + Verb': 'He is so proud that he will not beg.'",
    explanationBn: "'Too...to' পরিবর্তিত হয়ে 'so...that + will/cannot + Verb' হয়।"
  },
  {
    id: 17,
    question: "Convert 'Who does not know the Father of the Nation?' into an assertive sentence:",
    options: [
      "Everyone knows the Father of the Nation.",
      "Nobody knows the Father of the Nation.",
      "Does everyone know the Father of the Nation?",
      "Someone knows the Father of the Nation."
    ],
    correctAnswer: 0,
    explanation: "A negative rhetorical question 'Who does not know...?' converts into the universal affirmative assertive 'Everyone knows...'.",
    explanationBn: "Negative Rhetorical প্রশ্ন 'Who does not know...?' রূপান্তর হয়ে Assertive-এ 'Everyone knows...' হয়।"
  },
  {
    id: 18,
    question: "Convert 'How fast the runner finished the sprint!' into an assertive sentence:",
    options: [
      "The runner finished the sprint very fast.",
      "Did the runner finish the sprint fast?",
      "The runner did not finish the sprint fast.",
      "What a fast sprint the runner finished."
    ],
    correctAnswer: 0,
    explanation: "'How fast...' transforms into 'Subject + Verb + very fast': 'The runner finished the sprint very fast.'",
    explanationBn: "'How fast...'-এর Assertive রূপ: 'The runner finished the sprint very fast'।"
  },
  {
    id: 19,
    question: "Convert 'What a disastrous mistake he committed!' into an assertive sentence:",
    options: [
      "He committed a very disastrous mistake.",
      "Did he commit a disastrous mistake?",
      "He did not commit a disastrous mistake.",
      "How disastrous a mistake he committed."
    ],
    correctAnswer: 0,
    explanation: "'What a disastrous mistake...' transforms into 'He committed a very disastrous mistake.'",
    explanationBn: "'What a...'-এর Assertive রূপ হলো 'He committed a very disastrous mistake'।"
  },
  {
    id: 20,
    question: "Which of the following sentences illustrates the correct construction of an indirect embedded question?",
    options: [
      "Could you please explain how the routing mechanism operates?",
      "Could you please explain how does the routing mechanism operate?",
      "Could you please explain how operates the routing mechanism?",
      "Explain how does operate the routing mechanism."
    ],
    correctAnswer: 0,
    explanation: "Embedded questions follow declarative Subject + Verb word order: 'how the routing mechanism operates' (NO dummy 'does' auxiliary).",
    explanationBn: "Embedded / Indirect Question-এ কোনো Inversion হয় না; Subject-এর পর সরাসরি Verb বসে: 'how the routing mechanism operates'।"
  },
  {
    id: 21,
    question: "What is the correct punctuation pattern for: 'Alas our most experienced developer has resigned'?",
    options: [
      "Alas! Our most experienced developer has resigned.",
      "Alas, Our most experienced developer has resigned!",
      "Alas? Our most experienced developer has resigned.",
      "Alas: Our most experienced developer has resigned!"
    ],
    correctAnswer: 0,
    explanation: "The interjection takes an exclamation point ('Alas!'), and the following clause begins with a capital letter ending with a period: 'Alas! Our most experienced developer has resigned.'",
    explanationBn: "Interjection-এর পরে (!) বসে এবং পরবর্তী স্বাধীন বাক্যটি Capital Letter দিয়ে শুরু হয়ে Full Stop (.) দিয়ে শেষ হয়।"
  },
  {
    id: 22,
    question: "Convert to Indirect Narration: 'The mentor said to the students, \"May you all crack the national exam!\"'",
    options: [
      "The mentor wished that all the students might crack the national exam.",
      "The mentor told the students that they may crack the exam.",
      "The mentor asked if students would crack the exam.",
      "The mentor ordered the students to crack the exam."
    ],
    correctAnswer: 0,
    explanation: "Optative direct speech converts with reporting verb 'wished/prayed that' and modal backshift 'might': 'The mentor wished that all the students might crack the national exam.'",
    explanationBn: "Indirect Speech-এ Optative বাক্য 'wished that ... might crack' কাঠামো অনুসরণ করে।"
  },
  {
    id: 23,
    question: "Identify the sentence that has an ERROR in question tag formation:",
    options: [
      "She rarely attends the evening lectures, does she?",
      "Let's revise the entire module, shall we?",
      "He has a beautiful house, hasn't he?",
      "I am invited to the summit, amn't I?"
    ],
    correctAnswer: 3,
    explanation: "'I am invited..., amn't I?' is incorrect in standard English. The mandatory standard tag is 'aren't I?'.",
    explanationBn: "'amn't I?' ভুল; Standard English-এ 'I am'-এর সঠিক Tag হলো 'aren't I?'।"
  },
  {
    id: 24,
    question: "What is the passive voice transformation of 'Never disclose confidential credentials'?",
    options: [
      "Confidential credentials should never be disclosed.",
      "Let confidential credentials never disclose.",
      "You are never disclosing credentials.",
      "Confidential credentials are never disclosing."
    ],
    correctAnswer: 0,
    explanation: "Imperatives offering advice or ethical prohibitions transform best into 'Subject + should never be + V3': 'Confidential credentials should never be disclosed.'",
    explanationBn: "উপদেশমূলক নেতিবাচক Imperative বাক্যের Passive Voice: 'Subject + should never be + V3'।"
  },
  {
    id: 25,
    question: "Transform 'As soon as the bell rang, the students entered the classroom' into a negative sentence:",
    options: [
      "No sooner did the bell ring than the students entered the classroom.",
      "No sooner the bell rang when the students entered.",
      "Hardly the bell rang then the students entered.",
      "As soon as not the bell rang."
    ],
    correctAnswer: 0,
    explanation: "'As soon as...' converts to 'No sooner did + Subject + V1 ... than ...': 'No sooner did the bell ring than the students entered the classroom.'",
    explanationBn: "'As soon as'-এর Negative রূপ: 'No sooner did the bell ring than...'"
  },
  {
    id: 26,
    question: "In the sentence 'God forgive us our trespasses!', what syntactic mood is expressed?",
    options: [
      "Optative Subjunctive Mood (Prayer / Blessing)",
      "Indicative Mood",
      "Interrogative Mood",
      "Passive Mood"
    ],
    correctAnswer: 0,
    explanation: "'God forgive...' uses the present subjunctive base form 'forgive' (understood '[May] God forgive') to express a solemn optative prayer.",
    explanationBn: "'God forgive...' হলো Subjunctive Mood-এ গঠিত একটি Optative প্রার্থনা।"
  },
  {
    id: 27,
    question: "Which of the following transforms 'Everyone must admit that he is honest' into a negative sentence?",
    options: [
      "No one can deny that he is honest.",
      "No one must admit that he is honest.",
      "Everyone does not admit he is honest.",
      "He is not honest everyone admits."
    ],
    correctAnswer: 0,
    explanation: "'Everyone must admit' transforms into 'No one can deny' (using antonym of admit and negative pronoun 'no one').",
    explanationBn: "'Everyone must admit'-এর অর্থ ঠিক রেখে Negative রূপ হলো: 'No one can deny that he is honest'।"
  },
  {
    id: 28,
    question: "Which of the following is an EMPHATIC IMPERATIVE showing great warmth and hospitality?",
    options: [
      "Do have some more sweets!",
      "You have some sweets.",
      "Did you have sweets?",
      "What sweet sweets!"
    ],
    correctAnswer: 0,
    explanation: "Prefixing 'Do' before the base verb 'have' creates an emphatic, hospitable imperative: 'Do have some more sweets!'.",
    explanationBn: "'Do have some more sweets!' আন্তরিক আতিথেয়তা ও জোর প্রকাশক Emphatic Imperative বাক্য।"
  },
  {
    id: 29,
    question: "Identify the correct negative question with Subject-Auxiliary Inversion:",
    options: [
      "Didn't you understand the syntactic tree architecture?",
      "Did you not understood the syntactic tree architecture?",
      "Why you didn't understand the tree architecture?",
      "You didn't understand the tree architecture, did you not?"
    ],
    correctAnswer: 0,
    explanation: "'Didn't you understand...?' correctly fronts the contracted auxiliary 'Didn't' followed by subject 'you' and base verb 'understand'.",
    explanationBn: "'Didn't you understand...?' সঠিক নিয়মে গঠিত Inverted Negative Interrogative বাক্য।"
  },
  {
    id: 30,
    question: "Which sentence pattern correctly sums up the entire communicative classification framework?",
    options: [
      "Assertive (Fact) | Interrogative (Question) | Imperative (Command/Req) | Exclamatory (Emotion) | Optative (Wish/Prayer)",
      "Subject | Verb | Object | Complement | Adverbial",
      "Noun | Pronoun | Verb | Adjective | Adverb",
      "Simple | Compound | Complex | Compound-Complex"
    ],
    correctAnswer: 0,
    explanation: "The 5 functional communicative types of English sentences are: Assertive/Declarative, Interrogative, Imperative, Exclamatory, and Optative.",
    explanationBn: "যোগাযোগের উদ্দেশ্য ও মনোভাবের ভিত্তিতে বাক্য ৫ প্রকার: Assertive (বিবৃতি), Interrogative (প্রশ্ন), Imperative (আদেশ/অনুরোধ), Exclamatory (বিস্ময়), এবং Optative (প্রার্থনা/ইচ্ছা)।"
  }
];

export default questions;
