// topic4_questions.js
// Module 001_003: Classification of Sentences by Purpose & Communicative Mood
// Topic 4: Exclamatory Sentences: 'What a...' vs 'How...' Mechanics
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "Which of the following correctly transforms the assertive sentence 'It is a very lovely evening' into an exclamatory sentence?",
    options: [
      "What a lovely evening it is!",
      "How a lovely evening it is!",
      "What lovely evening is it!",
      "How it is a lovely evening!"
    ],
    correctAnswer: 0,
    explanation: "When modifying a singular countable noun with an adjective ('a lovely evening'), the standard pattern is 'What a/an + Adjective + Noun + Subject + Verb!': 'What a lovely evening it is!'",
    explanationBn: "Singular Countable Noun-এর পূর্বে Adjective থাকলে 'What a/an + Adjective + Noun + Subject + Verb!' কাঠামো বসে: 'What a lovely evening it is!'"
  },
  {
    id: 2,
    question: "Which of the following correctly uses 'How' to exclaim about an adjective with NO accompanying noun head?",
    options: [
      "How sweet the nightingale sings!",
      "What sweet the nightingale sings!",
      "How a sweetly the nightingale sings!",
      "What sweetly the nightingale sings!"
    ],
    correctAnswer: 0,
    explanation: "'How' directly modifies bare adjectives or adverbs ('How sweet...' or 'How sweetly...'). 'What' requires a noun phrase.",
    explanationBn: "সরাসরি Adjective বা Adverb-কে বিশেষিত করতে 'How + Adj/Adv + Subject + Verb!' বসে ('What' বসতে হলে Noun Phrase আবশ্যক)।"
  },
  {
    id: 3,
    question: "How do you form an exclamatory sentence with an UNCOUNTABLE noun like 'weather' or 'music'?",
    options: [
      "What wonderful music this is!",
      "What a wonderful music this is!",
      "How a wonderful music this is!",
      "What an music this is!"
    ],
    correctAnswer: 0,
    explanation: "Uncountable nouns (music, weather, advice, information) do NOT take the indefinite article 'a/an'. Therefore, use 'What + [no article] + Adjective + Uncountable Noun': 'What wonderful music this is!'",
    explanationBn: "Uncountable Noun (music, weather ইত্যাদি)-এর পূর্বে 'a/an' বসে না, তাই 'What + Adjective + Uncountable Noun' বসে: 'What wonderful music this is!'"
  },
  {
    id: 4,
    question: "How do you form an exclamatory sentence with a PLURAL countable noun?",
    options: [
      "What gorgeous paintings these are!",
      "What a gorgeous paintings these are!",
      "How gorgeous paintings these are!",
      "What an gorgeous paintings these are!"
    ],
    correctAnswer: 0,
    explanation: "With plural countable nouns ('paintings'), omit the article 'a/an': 'What gorgeous paintings these are!'.",
    explanationBn: "Plural Noun-এর ক্ষেত্রে 'a/an' বসে না; সরাসরি 'What + Adjective + Plural Noun + Subject + Verb!' বসে।"
  },
  {
    id: 5,
    question: "What is the correct transformation of 'He was a great fool' into an exclamatory sentence?",
    options: [
      "What a fool he was!",
      "How a fool he was!",
      "What fool he was!",
      "How great fool he was!"
    ],
    correctAnswer: 0,
    explanation: "'Great + Noun' (great fool, great tragedy) transforms into 'What a + Noun': 'What a fool he was!'.",
    explanationBn: "'A great fool'-এর Exclamatory রূপ হলো 'What a fool he was!'।"
  },
  {
    id: 6,
    question: "Convert 'The sunset is extremely breathtaking' into a 'How'-fronted exclamatory sentence:",
    options: [
      "How breathtaking the sunset is!",
      "How the sunset is breathtaking!",
      "How is the sunset breathtaking!",
      "What breathtaking is the sunset!"
    ],
    correctAnswer: 0,
    explanation: "The structure is 'How + Adjective ('breathtaking') + Subject ('the sunset') + Verb ('is')!'. Note that Subject precedes Verb (no interrogative inversion).",
    explanationBn: "সঠিক কাঠামো: 'How + Adjective + Subject + Verb!' -> 'How breathtaking the sunset is!' (মনে রাখবেন, Verb Subject-এর পরে বসে, আগে নয়)।"
  },
  {
    id: 7,
    question: "Which of the following demonstrates an exclamatory sentence utilizing an INTERJECTION at the front?",
    options: [
      "Alas! We have lost our most beloved mentor.",
      "Are we losing our mentor?",
      "We lost our mentor peacefully.",
      "Please respect our mentor."
    ],
    correctAnswer: 0,
    explanation: "'Alas!' is an interjection expressing profound sorrow, followed by an assertive clause: 'Alas! We have lost our most beloved mentor.'",
    explanationBn: "'Alas!' হলো গভীর শোক ও দুঃখ প্রকাশক Interjection, যা বাক্যের শুরুতে বসে।"
  },
  {
    id: 8,
    question: "Which interjection expresses spontaneous TRIUMPH, CHEERING, or CELEBRATION?",
    options: [
      "Hurrah! / Hurray!",
      "Hush!",
      "Alas!",
      "Fie!"
    ],
    correctAnswer: 0,
    explanation: "'Hurrah!' or 'Hurray!' expresses intense joy, victory, and celebration (e.g., 'Hurrah! Our team won the hackathon!').",
    explanationBn: "'Hurrah!' বা 'Hurray!' আনন্দ ও বিজয়োল্লাস প্রকাশ করতে ব্যবহৃত হয়।"
  },
  {
    id: 9,
    question: "Which interjection is used to demand SILENCE or QUIETNESS?",
    options: [
      "Hush! / Hark!",
      "Bravo!",
      "Alas!",
      "Ouch!"
    ],
    correctAnswer: 0,
    explanation: "'Hush!' is used to command immediate silence or attentiveness (e.g., 'Hush! The mentor is speaking.').",
    explanationBn: "'Hush!' নীরবতা বজায় রাখার নির্দেশ দিতে ব্যবহৃত হয়।"
  },
  {
    id: 10,
    question: "Which interjection expresses APPLAUSE and APPROVAL for an outstanding achievement?",
    options: [
      "Bravo!",
      "Alas!",
      "Pooh!",
      "Ouch!"
    ],
    correctAnswer: 0,
    explanation: "'Bravo!' expresses enthusiastic praise and admiration for a remarkable performance.",
    explanationBn: "'Bravo!' (সাবাশ!) অসাধারণ কৃতিত্বের প্রশংসা করতে ব্যবহৃত হয়।"
  },
  {
    id: 11,
    question: "Identify the word order error in: 'How fast did he run!'",
    options: [
      "Exclamatory sentences do not use auxiliary inversion; it should be 'How fast he ran!'.",
      "'How' should be 'What'.",
      "'Fast' should be 'fastly'.",
      "An exclamatory sentence cannot use the past tense."
    ],
    correctAnswer: 0,
    explanation: "Inversion ('did he run') turns the clause into an interrogative question. Exclamatory clauses MUST retain declarative subject-verb sequence: 'How fast he ran!'.",
    explanationBn: "Exclamatory বাক্যে কোনো Inversion হয় না; Subject Verb-এর আগে বসে: 'How fast he ran!' ('did he run' প্রশ্নবোধক ভুল)।"
  },
  {
    id: 12,
    question: "Convert the exclamatory sentence 'What a pity that you missed the live masterclass!' into an assertive sentence:",
    options: [
      "It is a great pity that you missed the live masterclass.",
      "Is it a pity that you missed the masterclass?",
      "You missed the masterclass with pity.",
      "Why did you pity missing the masterclass?"
    ],
    correctAnswer: 0,
    explanation: "'What a pity...' transforms into the assertive 'It is a great pity that...'.",
    explanationBn: "'What a pity...' রূপান্তর হয়ে Assertive-এ 'It is a great pity that...' হয়।"
  },
  {
    id: 13,
    question: "Transform 'I wish I had the wings of a dove' into an exclamatory structure expressing intense poetic yearning:",
    options: [
      "O that I had the wings of a dove!",
      "Why do I have wings of a dove?",
      "I have wings of a dove!",
      "How wings of a dove I have!"
    ],
    correctAnswer: 0,
    explanation: "Intense wishes ('I wish I had / were...') transform into poetic exclamatory forms using 'O that / If only / Would that': 'O that I had the wings of a dove!' or 'If only I had the wings of a dove!'.",
    explanationBn: "তীব্র আকুল ইচ্ছা ('I wish...') Exclamatory-তে 'O that / If only / Would that' দিয়ে শুরু হয়: 'O that I had the wings of a dove!'"
  },
  {
    id: 14,
    question: "What does 'If only I were young again!' express?",
    options: [
      "A realistic future plan",
      "An unfulfillable nostalgic exclamatory wish",
      "A routine habit",
      "A direct question"
    ],
    correctAnswer: 1,
    explanation: "'If only I were young again!' expresses an unattainable, nostalgic emotional yearning using the subjunctive 'were'.",
    explanationBn: "'If only I were...' একটি অপূর্ণ আকাঙ্ক্ষা ও আবেগপূর্ণ আক্ষেপ প্রকাশ করে।"
  },
  {
    id: 15,
    question: "Which of the following sentences is an ELLIPTICAL (abbreviated) exclamatory phrase?",
    options: [
      "What a shot!",
      "That was a splendid shot played by the batsman.",
      "Did you see that shot?",
      "Please play a shot."
    ],
    correctAnswer: 0,
    explanation: "'What a shot!' is an elliptical exclamation where the subject and verb ('it was') are omitted due to rapid spoken excitement.",
    explanationBn: "'What a shot!' একটি Elliptical Exclamation যেখানে দ্রুত আবেগের কারণে Subject ও Verb ('it was') উহ্য রয়েছে।"
  },
  {
    id: 16,
    question: "Identify the correct punctuation pattern when an interjection is followed by a complete statement:",
    options: [
      "Hurrah! We have won the championship trophy.",
      "Hurrah, We have won the championship trophy!",
      "Hurrah? We have won the championship trophy.",
      "Hurrah: We have won the championship trophy!"
    ],
    correctAnswer: 0,
    explanation: "When an interjection carries an exclamation point ('Hurrah!'), the following independent clause begins with a capital letter and concludes with a period: 'Hurrah! We have won the championship trophy.'",
    explanationBn: "Interjection-এর পরে Exclamation Mark (!) বসলে পরবর্তী পূর্ণ বাক্যটি Capital Letter দিয়ে শুরু হয় এবং শেষে Full Stop (.) বসে।"
  },
  {
    id: 17,
    question: "Convert 'How kind of you to help us!' into an assertive sentence:",
    options: [
      "It is very kind of you to help us.",
      "Are you kind to help us?",
      "You help us kindly.",
      "Help us with kindness."
    ],
    correctAnswer: 0,
    explanation: "'How kind of you...' transforms into the assertive statement 'It is very kind of you to help us.'",
    explanationBn: "'How kind of you...' Assertive বাক্যে রূপান্তরিত হয়ে 'It is very kind of you to help us' হয়।"
  },
  {
    id: 18,
    question: "Convert 'What a terrible accident!' into an assertive sentence:",
    options: [
      "It was a very terrible accident.",
      "The accident was not terrible.",
      "Why was the accident terrible?",
      "Let the accident be terrible."
    ],
    correctAnswer: 0,
    explanation: "'What a terrible accident!' transforms into 'It was a very terrible accident' or 'The accident was truly terrible'.",
    explanationBn: "'What a terrible accident!'-এর Assertive রূপ হলো: 'It was a very terrible accident'।"
  },
  {
    id: 19,
    question: "Which of the following pairs shows the correct intensifier correspondence when transforming from exclamatory to assertive?",
    options: [
      "'What a' + Noun ===> 'a great / wonderful / terrible' + Noun",
      "'How' + Adjective ===> 'very / extremely' + Adjective",
      "Both A and B are correct standard transformation rules",
      "Neither A nor B is correct"
    ],
    correctAnswer: 2,
    explanation: "When converting to assertive, 'How' is replaced by 'very/extremely' with adjectives, while 'What a' is replaced by 'great/wonderful/terrible' with nouns.",
    explanationBn: "Exclamatory থেকে Assertive করার সময় Adjective-এর পূর্বে 'very/extremely' এবং Noun-এর পূর্বে 'great/wonderful/terrible' বসে। দুটো নিয়মই সঠিক।"
  },
  {
    id: 20,
    question: "What emotion does the interjection 'Fie!' or 'For shame!' express?",
    options: [
      "Disgust, contempt, or moral indignation",
      "Joy and celebration",
      "Physical bodily pain",
      "Surprise and wonder"
    ],
    correctAnswer: 0,
    explanation: "'Fie!' and 'For shame!' express moral disgust, contempt, or reproach (e.g., 'Fie upon such dishonesty!').",
    explanationBn: "'Fie!' (ছিঃ!) ঘৃণা, ধিক্কার বা নৈতিক অসন্তোষ প্রকাশ করতে ব্যবহৃত হয়।"
  },
  {
    id: 21,
    question: "What emotion does 'Ouch!' express in spontaneous spoken English?",
    options: [
      "Sudden physical pain",
      "Profound philosophical thought",
      "Welcoming an arriving guest",
      "Admiration of beauty"
    ],
    correctAnswer: 0,
    explanation: "'Ouch!' is the universal English spontaneous vocalization of sudden physical pain.",
    explanationBn: "'Ouch!' শারীরিক বা আকস্মিক যন্ত্রণা প্রকাশের ধ্বনি।"
  },
  {
    id: 22,
    question: "Convert 'If only I could meet Netaji Subhas Chandra Bose!' into an assertive sentence:",
    options: [
      "I earnestly wish I could meet Netaji Subhas Chandra Bose.",
      "I could never meet Netaji Subhas Chandra Bose.",
      "Did I meet Netaji Subhas Chandra Bose?",
      "Meet Netaji Subhas Chandra Bose if you can."
    ],
    correctAnswer: 0,
    explanation: "'If only I could...' expresses a profound wish, transforming assertively into 'I earnestly wish I could...'.",
    explanationBn: "'If only I could...' রূপান্তর হয়ে Assertive-এ 'I earnestly wish I could...' হয়।"
  },
  {
    id: 23,
    question: "Which of the following sentences correctly expresses an exclamation about human character?",
    options: [
      "What a noble gentleman he is!",
      "How a noble gentleman he is!",
      "What noble gentleman is he!",
      "How noble gentleman is he!"
    ],
    correctAnswer: 0,
    explanation: "'Gentleman' is a singular countable noun qualified by 'noble', requiring 'What a noble gentleman he is!'.",
    explanationBn: "'Gentleman' Singular Countable Noun হওয়ায় সঠিক কাঠামো: 'What a noble gentleman he is!'"
  },
  {
    id: 24,
    question: "Why is 'What a bad weather we are having!' grammatically incorrect?",
    options: [
      "'Weather' is an uncountable mass noun and cannot take the indefinite article 'a'.",
      "'Bad' must be changed to 'badly'.",
      "'Having' cannot be used in continuous aspect.",
      "'What' must be replaced by 'Which'."
    ],
    correctAnswer: 0,
    explanation: "'Weather' is uncountable; it should be 'What bad weather we are having!' without 'a'.",
    explanationBn: "'Weather' একটি Uncountable Noun, তাই এর আগে 'a' বসানো ভুল। শুদ্ধ রূপ: 'What bad weather we are having!'"
  },
  {
    id: 25,
    question: "Identify the communicative intent of: 'How dare you accuse me of plagiarism!'",
    options: [
      "Polite inquiry",
      "Righteous indignation and outrage",
      "Humble apology",
      "Instructional guidance"
    ],
    correctAnswer: 1,
    explanation: "'How dare you...!' is an exclamation of intense indignation, outrage, and challenge against an unacceptable act.",
    explanationBn: "'How dare you...!' তীব্র ক্ষোভ, প্রতিবাদ ও আত্মমর্যাদাবোধ প্রকাশ করে।"
  }
];

export default questions;
