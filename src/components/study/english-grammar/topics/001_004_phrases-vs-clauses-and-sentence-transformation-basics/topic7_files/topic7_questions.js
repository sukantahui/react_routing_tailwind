// topic7_questions.js
// Module 001_004: Phrases vs Clauses & Foundational Sentence Transformations
// Topic 7: Exclamatory ↔ Assertive Sentence Transformation
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "Transform the exclamatory sentence 'How lovely the rose is!' into an assertive sentence:",
    options: [
      "The rose is very lovely.",
      "Is the rose lovely?",
      "The rose is not lovely.",
      "What a lovely rose."
    ],
    correctAnswer: 0,
    explanation: "'How + Adjective' transforms into 'Subject + Verb + very + Adjective': 'The rose is very lovely.'",
    explanationBn: "'How + Adjective' Assertive-এ রূপান্তরিত হয়ে 'Subject + Verb + very + Adjective' হয়: 'The rose is very lovely'।"
  },
  {
    id: 2,
    question: "Transform 'What a majestic monument the Victoria Memorial is!' into an assertive sentence:",
    options: [
      "The Victoria Memorial is a very majestic monument.",
      "Is the Victoria Memorial majestic?",
      "The Victoria Memorial is not majestic.",
      "How majestic monument it is."
    ],
    correctAnswer: 0,
    explanation: "'What a + Adjective + Noun' transforms into 'Subject + Verb + a very + Adjective + Noun': 'The Victoria Memorial is a very majestic monument.'",
    explanationBn: "'What a...'-এর Assertive রূপ: 'The Victoria Memorial is a very majestic monument'।"
  },
  {
    id: 3,
    question: "Transform 'What a piece of work is man!' into an assertive sentence:",
    options: [
      "Man is a wonderful piece of work.",
      "Is man a piece of work?",
      "Man is no piece of work.",
      "How piece of work man is."
    ],
    correctAnswer: 0,
    explanation: "'What a piece of work...' transforms into the philosophical assertive assertion 'Man is a wonderful / marvelous piece of work.'",
    explanationBn: "'What a piece of work...'-এর দার্শনিক Assertive রূপ: 'Man is a wonderful piece of work'।"
  },
  {
    id: 4,
    question: "Transform 'Alas! We have lost our most beloved teacher' into an assertive sentence:",
    options: [
      "It is a matter of great sorrow that we have lost our most beloved teacher.",
      "We lost our teacher with joy.",
      "Why did we lose our teacher?",
      "Our teacher is not lost."
    ],
    correctAnswer: 0,
    explanation: "'Alas!' transforms into the assertive matrix 'It is a matter of great sorrow / grief that...': 'It is a matter of great sorrow that we have lost our most beloved teacher.'",
    explanationBn: "'Alas!'-এর Assertive রূপ: 'It is a matter of great sorrow that...'।"
  },
  {
    id: 5,
    question: "Transform 'Hurrah! Our academy has secured the top rank across West Bengal' into an assertive sentence:",
    options: [
      "It is a matter of immense joy that our academy has secured the top rank across West Bengal.",
      "Is our academy top ranked?",
      "Our academy did not secure top rank.",
      "Alas our academy secured top rank."
    ],
    correctAnswer: 0,
    explanation: "'Hurrah!' transforms into 'It is a matter of immense joy / celebration that...'.",
    explanationBn: "'Hurrah!'-এর Assertive রূপ: 'It is a matter of immense joy that...'।"
  },
  {
    id: 6,
    question: "Transform 'Bravo! You executed a flawless code deployment' into an assertive sentence:",
    options: [
      "It is a matter of great praise / credit that you executed a flawless code deployment.",
      "Did you execute a deployment?",
      "You did not execute a deployment.",
      "How deployment you executed."
    ],
    correctAnswer: 0,
    explanation: "'Bravo!' transforms into 'It is a matter of great praise / admiration that...' (or 'We highly applaud you for executing...').",
    explanationBn: "'Bravo!'-এর Assertive রূপ: 'It is a matter of great praise that...'।"
  },
  {
    id: 7,
    question: "Transform the poetic wish 'O that I were a child again!' into an assertive sentence:",
    options: [
      "I earnestly wish that I were a child again.",
      "I was a child again.",
      "Am I a child again?",
      "Let me be a child."
    ],
    correctAnswer: 0,
    explanation: "'O that / Oh that...' transforms into 'I earnestly wish / long that...': 'I earnestly wish that I were a child again.'",
    explanationBn: "'O that...'-এর Assertive রূপ: 'I earnestly wish that I were a child again'।"
  },
  {
    id: 8,
    question: "Transform 'If only I had known the truth earlier!' into an assertive sentence:",
    options: [
      "I deeply wish that I had known the truth earlier.",
      "I knew the truth earlier.",
      "Did I know the truth earlier?",
      "Knowing the truth is good."
    ],
    correctAnswer: 0,
    explanation: "'If only I had...' transforms into 'I deeply / earnestly wish that I had...'.",
    explanationBn: "'If only I had...' রূপান্তরিত হয়ে 'I deeply wish that I had...' হয়।"
  },
  {
    id: 9,
    question: "Transform 'Would that the great leader were alive today!' into an assertive sentence:",
    options: [
      "I wish that the great leader were alive today.",
      "The leader was alive today.",
      "Was the leader alive today?",
      "Let the leader live."
    ],
    correctAnswer: 0,
    explanation: "'Would that...' transforms into 'I wish that...': 'I wish that the great leader were alive today.'",
    explanationBn: "'Would that...'-এর Assertive রূপ হলো 'I wish that...'।"
  },
  {
    id: 10,
    question: "Transform 'What a fool you are to believe his false promises!' into an assertive sentence:",
    options: [
      "You are a great fool to believe his false promises.",
      "You are not a fool.",
      "Are you a fool to believe him?",
      "How fool you are."
    ],
    correctAnswer: 0,
    explanation: "'What a fool...' transforms into 'You are a great fool...'.",
    explanationBn: "'What a fool...' Assertive-এ 'You are a great fool...' হয়।"
  },
  {
    id: 11,
    question: "Transform 'Fie upon such cowardice in the face of adversity!' into an assertive sentence:",
    options: [
      "It is extremely shameful and contemptible to show such cowardice in the face of adversity.",
      "Cowardice is adversity.",
      "Is cowardice shameful?",
      "Show cowardice always."
    ],
    correctAnswer: 0,
    explanation: "'Fie upon...' transforms into 'It is extremely shameful / disgraceful that...' or 'It is a matter of contempt that...'.",
    explanationBn: "'Fie upon...'-এর Assertive রূপ: 'It is extremely shameful that...'।"
  },
  {
    id: 12,
    question: "Transform the assertive sentence 'It is very kind of you to help us during the crisis' into an EXCLAMATORY sentence:",
    options: [
      "How kind of you to help us during the crisis!",
      "What a kind of you to help us!",
      "How you are kind to help us!",
      "What kind help it was!"
    ],
    correctAnswer: 0,
    explanation: "'It is very kind of you...' transforms into the exclamatory 'How kind of you to help us during the crisis!'.",
    explanationBn: "'It is very kind of you...'-এর Exclamatory রূপ: 'How kind of you to help us...!'।"
  },
  {
    id: 13,
    question: "Transform the assertive 'The night is remarkably cold and dark' into an EXCLAMATORY sentence:",
    options: [
      "How cold and dark the night is!",
      "What a cold and dark the night is!",
      "How the night is cold and dark!",
      "What night is cold!"
    ],
    correctAnswer: 0,
    explanation: "'How + Adjectives ('cold and dark') + Subject ('the night') + Verb ('is')!': 'How cold and dark the night is!'.",
    explanationBn: "সঠিক Exclamatory রূপ: 'How cold and dark the night is!'"
  },
  {
    id: 14,
    question: "Transform the assertive 'I wish I were a bird soaring across the sky' into an EXCLAMATORY sentence:",
    options: [
      "O that I were a bird soaring across the sky!",
      "How bird I am!",
      "What a bird soaring!",
      "Why am I not a bird!"
    ],
    correctAnswer: 0,
    explanation: "'I wish I were...' transforms into the poetic exclamatory 'O that I were a bird soaring across the sky!' (or 'If only I were a bird...').",
    explanationBn: "'I wish I were...'-এর Exclamatory রূপ: 'O that I were a bird...!' বা 'If only I were a bird...!'।"
  },
  {
    id: 15,
    question: "Transform the assertive 'It is a great pity that the event was cancelled' into an EXCLAMATORY sentence:",
    options: [
      "What a pity that the event was cancelled!",
      "How a pity that the event was cancelled!",
      "How pity the event was cancelled!",
      "What event was pity!"
    ],
    correctAnswer: 0,
    explanation: "'It is a great pity that...' transforms into 'What a pity that the event was cancelled!'.",
    explanationBn: "'It is a great pity...'-এর Exclamatory রূপ: 'What a pity that...'।"
  },
  {
    id: 16,
    question: "Transform 'How sweetly the river flows by Barrackpore!' into an assertive sentence:",
    options: [
      "The river flows very sweetly by Barrackpore.",
      "Does the river flow sweetly?",
      "The river flows not sweetly.",
      "What a sweet river flows."
    ],
    correctAnswer: 0,
    explanation: "'How sweetly...' transforms into 'The river flows very sweetly by Barrackpore.'",
    explanationBn: "'How sweetly...'-এর Assertive রূপ: 'The river flows very sweetly by Barrackpore'।"
  },
  {
    id: 17,
    question: "Transform 'What a dangerous journey we undertook!' into an assertive sentence:",
    options: [
      "We undertook a very dangerous journey.",
      "Was our journey dangerous?",
      "Our journey was not dangerous.",
      "How dangerous journey we took."
    ],
    correctAnswer: 0,
    explanation: "'What a dangerous journey...' transforms into 'We undertook a very dangerous journey.'",
    explanationBn: "'What a dangerous journey...' Assertive-এ 'We undertook a very dangerous journey' রূপ নেয়।"
  },
  {
    id: 18,
    question: "Transform 'If only I had listened to Sukanta Sir's advice!' into an assertive sentence:",
    options: [
      "I earnestly wish I had listened to Sukanta Sir's advice.",
      "I listened to Sukanta Sir's advice.",
      "Did I listen to Sukanta Sir's advice?",
      "Sukanta Sir gave advice."
    ],
    correctAnswer: 0,
    explanation: "'If only I had...' transforms into 'I earnestly wish I had listened to Sukanta Sir's advice.'",
    explanationBn: "'If only I had...' রূপান্তরিত হয়ে 'I earnestly wish I had...' হয়।"
  },
  {
    id: 19,
    question: "Transform 'O for a glass of water!' into an assertive sentence:",
    options: [
      "I intensely desire a glass of water.",
      "A glass of water is wet.",
      "Do I want a glass of water?",
      "Water is in a glass."
    ],
    correctAnswer: 0,
    explanation: "'O for + Noun' transforms into 'I intensely wish / long / desire for...'.",
    explanationBn: "'O for...' Assertive-এ 'I intensely desire/long for...' রূপ নেয়।"
  },
  {
    id: 20,
    question: "Why does the word order change when converting Exclamatory to Assertive?",
    options: [
      "Because exclamatory sentences front the intensified complement (How/What a) to create emotional impact, while assertive sentences restore standard Subject + Verb + Object/Complement order.",
      "Because assertive sentences cannot have adjectives.",
      "Because exclamatory sentences have no subjects.",
      "Because grammar rules change randomly."
    ],
    correctAnswer: 0,
    explanation: "Exclamations front emotional descriptors to the head of the sentence. Assertive conversions restore normal syntactic Subject + Verb baseline word order.",
    explanationBn: "Exclamatory বাক্যে আবেগের তীব্রতা বোঝাতে বর্ণনামূলক অংশটি শুরুতে আনা হয়; Assertive রূপান্তরে সাধারণ পদবিন্যাস (Subject + Verb + Complement) পুনর্বহাল করা হয়।"
  },
  {
    id: 21,
    question: "Transform 'How well she spoke at the international conference!' into an assertive sentence:",
    options: [
      "She spoke remarkably / very well at the international conference.",
      "Did she speak well at the conference?",
      "She did not speak well.",
      "What a well speech she spoke."
    ],
    correctAnswer: 0,
    explanation: "'How well...' transforms into 'She spoke remarkably well / very well at the international conference.'",
    explanationBn: "'How well...'-এর Assertive রূপ: 'She spoke remarkably well at the conference'।"
  },
  {
    id: 22,
    question: "Transform 'What an unfortunate misunderstanding this has been!' into an assertive sentence:",
    options: [
      "This has been a very unfortunate misunderstanding.",
      "Was this an unfortunate misunderstanding?",
      "This was not a misunderstanding.",
      "How unfortunate this misunderstanding was."
    ],
    correctAnswer: 0,
    explanation: "'What an unfortunate...' transforms into 'This has been a very unfortunate misunderstanding.'",
    explanationBn: "'What an unfortunate...'-এর Assertive রূপ: 'This has been a very unfortunate misunderstanding'।"
  },
  {
    id: 23,
    question: "Transform 'Had I but known your difficulty earlier!' into an assertive sentence:",
    options: [
      "I wish I had known your difficulty earlier.",
      "I knew your difficulty earlier.",
      "Did I know your difficulty earlier?",
      "Know your difficulty earlier."
    ],
    correctAnswer: 0,
    explanation: "'Had I but known...' is an inverted subjunctive wish, converting into 'I wish I had known your difficulty earlier.'",
    explanationBn: "'Had I but known...' একটি Subjunctive আক্ষেপ, যার Assertive রূপ: 'I wish I had known your difficulty earlier'।"
  },
  {
    id: 24,
    question: "Transform 'What a splendid victory!' into an assertive sentence:",
    options: [
      "It is / was a truly splendid victory.",
      "The victory was not splendid.",
      "Did we win a victory?",
      "How victory was splendid."
    ],
    correctAnswer: 0,
    explanation: "'What a splendid victory!' (elliptical) expands assertively into 'It was a truly splendid victory.'",
    explanationBn: "'What a splendid victory!'-এর পূর্ণ Assertive রূপ: 'It was a truly splendid victory'।"
  },
  {
    id: 25,
    question: "Identify the sentence that represents a FLAWED transformation of 'How fast the cheetah runs!':",
    options: [
      "The cheetah runs fastly. (Error: 'fastly' is not an English word; 'fast' is already an adverb)",
      "The cheetah runs very fast. (Correct)",
      "The cheetah runs extremely fast. (Correct)",
      "The cheetah is an extraordinarily fast runner. (Correct)"
    ],
    correctAnswer: 0,
    explanation: "'Fastly' is an invalid non-word in English; 'fast' serves as both adjective and adverb. Correct: 'The cheetah runs very fast.'",
    explanationBn: "ইংরেজিতে 'fastly' বলে কোনো শব্দ নেই; 'fast' নিজেই Adverb। তাই 'The cheetah runs fastly' একটি অশুদ্ধ রূপান্তর।"
  }
];

export default questions;
