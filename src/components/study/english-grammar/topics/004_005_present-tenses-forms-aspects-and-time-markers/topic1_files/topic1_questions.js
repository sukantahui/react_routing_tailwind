const questions = [
  {
    id: 1,
    question: "Identify the sentence that correctly expresses a universal scientific truth.",
    options: [
      "Water is boiling at 100 degrees Celsius under standard pressure.",
      "Water boils at 100 degrees Celsius under standard pressure.",
      "Water has boiled at 100 degrees Celsius under standard pressure.",
      "Water will boil at 100 degrees Celsius always."
    ],
    correctAnswer: 1,
    explanation: "Universal scientific truths and physical laws are expressed in the Simple Present tense (Base verb / 3rd singular).",
    explanationBn: "চিরন্তন বৈজ্ঞানিক সত্য বা প্রাকৃতিক নিয়ম সর্বদা Simple Present Tense-এ প্রকাশিত হয়।"
  },
  {
    id: 2,
    question: "Fill in the blank with the correct verb form: 'The express train to New Delhi ______ from platform 3 at 08:30 PM tonight.'",
    options: [
      "is departing",
      "departs",
      "departed",
      "has departed"
    ],
    correctAnswer: 1,
    explanation: "Official timetables, scheduled journeys, and fixed public itineraries use Simple Present ('departs') even for future times.",
    explanationBn: "রেল বা বিমানের নির্দিষ্ট সময়সূচি (Official Timetable) বোঝাতে ভবিষ্যৎ সময়ের ক্ষেত্রেও Simple Present ব্যবহৃত হয়।"
  },
  {
    id: 3,
    question: "Select the sentence with the correct subordinate conditional clause formulation.",
    options: [
      "If it will rain tomorrow, we will postpone the Barrackpore tournament.",
      "If it rains tomorrow, we will postpone the Barrackpore tournament.",
      "If it is raining tomorrow, we will postpone the Barrackpore tournament.",
      "If it will have rained tomorrow, we will postpone the tournament."
    ],
    correctAnswer: 1,
    explanation: "In conditional clauses introduced by 'if', the modal auxiliary 'will' is prohibited. The Simple Present ('rains') must be used.",
    explanationBn: "শর্তমূলক 'If' ক্লজে কখনো 'will' বসে না; সেখানে সর্বদা Simple Present ('rains') ব্যবহৃত হয়।"
  },
  {
    id: 4,
    question: "Choose the correct negative form of: 'He catches the morning ferry every day.'",
    options: [
      "He does not catches the morning ferry every day.",
      "He do not catch the morning ferry every day.",
      "He does not catch the morning ferry every day.",
      "He is not catching the morning ferry every day."
    ],
    correctAnswer: 2,
    explanation: "In the negative simple present for third-person singular, use 'does not' + base form V1 ('catch'), never retaining the -es ending.",
    explanationBn: "'Does not' ব্যবহারের পর মূল Verb-এর সাথে আর -s/-es যুক্ত থাকে না, verb তার Base Form (V1)-এ ফিরে আসে।"
  },
  {
    id: 5,
    question: "In live sporting commentary, which tense is conventionally employed? 'Kohli ______ onto the front foot and ______ the delivery through covers.'",
    options: [
      "is stepping; is driving",
      "steps; drives",
      "has stepped; drove",
      "stepped; drove"
    ],
    correctAnswer: 1,
    explanation: "Live dramatic commentary uses the Simple Present tense ('steps; drives') to convey immediate, crisp real-time action.",
    explanationBn: "খেলার ধারাভাষ্যে (Live Commentary) তাৎক্ষণিক ও সজীব ক্রিয়া বোঝাতে Simple Present Tense ব্যবহৃত হয়।"
  },
  {
    id: 6,
    question: "Select the sentence exhibiting correct Subject-Verb inversion with 'Here' or 'There'.",
    options: [
      "Here is coming the chief guest!",
      "Here comes the chief guest!",
      "Here the chief guest is coming!",
      "Here the chief guest comes!"
    ],
    correctAnswer: 1,
    explanation: "Exclamatory sentences opening with 'Here' or 'There' take Simple Present with inverted word order (Verb before Subject): 'Here comes the chief guest!'",
    explanationBn: "'Here' বা 'There' দিয়ে শুরু হওয়া বিস্ময়সূচক বাক্যে Simple Present ও Subject-Verb Inversion (আগে Verb, পরে Subject) ঘটে।"
  },
  {
    id: 7,
    question: "Which of the following frequency adverbs is NOT typical of the Simple Present tense?",
    options: [
      "Seldom",
      "Habitually",
      "Right now at this second",
      "Twice a week"
    ],
    correctAnswer: 2,
    explanation: "'Right now at this second' signals an action in progress at the speech moment, requiring Present Continuous, whereas seldom, habitually, and twice a week signal Simple Present routines.",
    explanationBn: "'Right now at this second' চলমান মুহূর্ত নির্দেশ করে যা Present Continuous-এর লক্ষণ, অভ্যাসের নয়।"
  },
  {
    id: 8,
    question: "Fill in the blank: 'Unless Swadeep ______ the application before 5 PM, his registration will be cancelled.'",
    options: [
      "submits",
      "will submit",
      "is submitting",
      "submitted"
    ],
    correctAnswer: 0,
    explanation: "'Unless' introduces a conditional subordinate clause requiring Simple Present ('submits') to pair with the future main clause.",
    explanationBn: "'Unless' ক্লজে ভবিষ্যৎ বোঝাতেও Simple Present ('submits') বসে।"
  },
  {
    id: 9,
    question: "Identify the 3rd person singular spelling rule error:",
    options: [
      "teach -> teaches",
      "study -> studys",
      "fix -> fixes",
      "pass -> passes"
    ],
    correctAnswer: 1,
    explanation: "When a verb ends in a consonant + 'y' (e.g. study), change 'y' to 'i' and add -es -> 'studies'. 'Studys' is misspelled.",
    explanationBn: "Consonant + 'y' দিয়ে শেষ হওয়া Verb-এর ক্ষেত্রে 'y' উঠে 'ies' হয় (study -> studies)।"
  },
  {
    id: 10,
    question: "Choose the correct sentence expressing a permanent geographical or astronomical fact:",
    options: [
      "The equator is dividing the earth into northern and southern hemispheres.",
      "The equator divides the earth into northern and southern hemispheres.",
      "The equator has divided the earth into northern and southern hemispheres.",
      "The equator will divide the earth into northern and southern hemispheres."
    ],
    correctAnswer: 1,
    explanation: "Permanent geographical and anatomical realities are timeless facts governed by Simple Present ('divides').",
    explanationBn: "ভৌগোলিক স্থায়ী সত্য সর্বদা Simple Present-এ লেখা হয়।"
  },
  {
    id: 11,
    question: "Complete the sentence: 'When the principal ______ the auditorium, all students ______ up.'",
    options: [
      "enters; stand",
      "will enter; stand",
      "is entering; will stand",
      "enters; will have stood"
    ],
    correctAnswer: 0,
    explanation: "This describes a general institutional custom or rule; both clauses properly take Simple Present ('enters; stand').",
    explanationBn: "সাধারণ প্রাতিষ্ঠানিক নিয়ম বা অভ্যাস বোঝাতে উভয় ক্লজেই Simple Present ব্যবহৃত হয়।"
  },
  {
    id: 12,
    question: "Identify the correct historic present usage in literary analysis:",
    options: [
      "Shakespeare is warning us against vaulting ambition in Macbeth.",
      "Shakespeare warns us against vaulting ambition in Macbeth.",
      "Shakespeare has been warning us against vaulting ambition in Macbeth.",
      "Shakespeare will warn us against vaulting ambition in Macbeth."
    ],
    correctAnswer: 1,
    explanation: "Literary quotations and critical discussions of works of literature use the Historic Present ('warns', 'states', 'argues').",
    explanationBn: "সাহিত্যিক উদ্ধৃতি বা লেখকের মতামতের ব্যাখ্যায় 'Historic Present' ('warns') ব্যবহৃত হয়।"
  },
  {
    id: 13,
    question: "Which of the following interrogative sentences is grammatically correct?",
    options: [
      "Does she plays the sitar proficiently?",
      "Does she play the sitar proficiently?",
      "Do she play the sitar proficiently?",
      "Is she play the sitar proficiently?"
    ],
    correctAnswer: 1,
    explanation: "Third person singular interrogative takes 'Does' + Subject + Base Verb V1 ('play') without -s/-es.",
    explanationBn: "'Does' সহযোগে প্রশ্নবোধক বাক্যে Verb-এর সাথে -s/-es যুক্ত হয় না, মূল রূপ 'play' বসে।"
  },
  {
    id: 14,
    question: "Fill in the blank: 'Light ______ at approximately 300,000 kilometers per second.'",
    options: [
      "is traveling",
      "travels",
      "has traveled",
      "will travel"
    ],
    correctAnswer: 1,
    explanation: "Universal constant speed of light is a physical law requiring Simple Present ('travels').",
    explanationBn: "আলোর গতি একটি চিরন্তন প্রাকৃতিক ধ্রুবক, তাই 'travels' হবে।"
  },
  {
    id: 15,
    question: "Choose the correct sentence showing a habitual action:",
    options: [
      "Abhronila is going to the gym four days a week currently.",
      "Abhronila goes to the gym four days a week.",
      "Abhronila has gone to the gym four days a week.",
      "Abhronila was going to the gym four days a week."
    ],
    correctAnswer: 1,
    explanation: "Regular weekly routines and habits are expressed using Simple Present ('goes').",
    explanationBn: "নিয়মিত সাপ্তাহিক অভ্যাস প্রকাশে Simple Present ('goes') ব্যবহৃত হয়।"
  },
  {
    id: 16,
    question: "Spot the error in the sentence: 'The committee meets (A) every Thursday, but nobody know (B) what they decide (C).'",
    options: [
      "meets (A)",
      "know (B)",
      "decide (C)",
      "No error"
    ],
    correctAnswer: 1,
    explanation: "Indefinite pronoun 'nobody' is singular and requires the 3rd person singular verb form 'knows', not 'know'.",
    explanationBn: "'Nobody' সর্বদা Singular Subject, তাই এর পর 'knows' হবে।"
  },
  {
    id: 17,
    question: "Fill in the blank: 'The academic session ______ on July 1st and ______ on April 30th.'",
    options: [
      "commences; concludes",
      "is commencing; is concluding",
      "will commence; will conclude",
      "commenced; concluded"
    ],
    correctAnswer: 0,
    explanation: "Calendar timetables and formal academic schedules use the Simple Present ('commences; concludes').",
    explanationBn: "বার্ষিক প্রাতিষ্ঠানিক ক্যালেন্ডার ও সময়সূচি Simple Present-এ লেখা হয়।"
  },
  {
    id: 18,
    question: "Which of the following negative sentences is syntactically flawless?",
    options: [
      "He does not goes to the library on Sundays.",
      "He do not go to the library on Sundays.",
      "He does not go to the library on Sundays.",
      "He is not go to the library on Sundays."
    ],
    correctAnswer: 2,
    explanation: "Subject (He) + does not + V1 (go) + ...",
    explanationBn: "'He does not go' হলো সঠিক গঠন।"
  },
  {
    id: 19,
    question: "Complete the sentence: 'There ______ the last bus to Barrackpore station!'",
    options: [
      "goes",
      "is going",
      "has gone",
      "went"
    ],
    correctAnswer: 0,
    explanation: "Exclamatory sentences opening with 'There' take Simple Present ('goes') with inverted order.",
    explanationBn: "'There goes...' একটি সুনির্দিষ্ট বিস্ময়সূচক ইনভার্সন গঠন।"
  },
  {
    id: 20,
    question: "In the sentence 'Fortune favors the brave', the tense is used to express:",
    options: [
      "A temporary circumstance",
      "A proverb / universal adage",
      "An action happening at this exact moment",
      "A past historical event"
    ],
    correctAnswer: 1,
    explanation: "Proverbs, adages, and traditional maxims are universally structured in the Simple Present tense.",
    explanationBn: "প্রবাদ-প্রবচন সর্বদা Simple Present Tense-এ গঠিত হয়।"
  },
  {
    id: 21,
    question: "Fill in the blank: 'As soon as the bell ______, the invigilator ______ the question papers.'",
    options: [
      "rings; collects",
      "will ring; collects",
      "rings; will collect",
      "is ringing; collects"
    ],
    correctAnswer: 2,
    explanation: "In time clauses introduced by 'as soon as', the subordinate clause uses Simple Present ('rings') while the main clause uses Future ('will collect').",
    explanationBn: "'As soon as' টাইম ক্লজে Simple Present ('rings') এবং মেইন ক্লজে Future ('will collect') বসে।"
  },
  {
    id: 22,
    question: "Choose the correct form: 'The chef ______ the spices carefully before adding them to the sauce.'",
    options: [
      "weighs",
      "is weighing",
      "weighed",
      "has weighed"
    ],
    correctAnswer: 0,
    explanation: "A standard routine or recipe step in procedural descriptions uses the Simple Present ('weighs').",
    explanationBn: "রেসিপি বা রান্নার প্রণালীর ধাপ বর্ণনায় Simple Present ব্যবহৃত হয়।"
  },
  {
    id: 23,
    question: "Identify the correct 3rd person singular form of the verb 'rely':",
    options: [
      "relys",
      "relies",
      "relyes",
      "relie"
    ],
    correctAnswer: 1,
    explanation: "Consonant + y rule: 'rely' becomes 'relies'.",
    explanationBn: "Consonant + 'y' থাকলে 'y' উঠে 'ies' বসে (rely -> relies)।"
  },
  {
    id: 24,
    question: "Which of the following statements about Simple Present is FALSE?",
    options: [
      "It can be used for actions happening continuously at this exact split second.",
      "It can express future timetables fixed by an authority.",
      "It is mandatory in conditional 'if' clauses when the main clause is future.",
      "It expresses timeless scientific and mathematical laws."
    ],
    correctAnswer: 0,
    explanation: "Actions happening continuously at this exact split second require Present Continuous (e.g. 'is writing right now'), not Simple Present.",
    explanationBn: "এই মুহূর্তে একটানা চলমান ক্রিয়ার জন্য Present Continuous প্রয়োজন, Simple Present নয়।"
  },
  {
    id: 25,
    question: "Transform into Simple Present interrogative: 'She writes insightful essays on linguistics.'",
    options: [
      "Does she writes insightful essays on linguistics?",
      "Does she write insightful essays on linguistics?",
      "Do she write insightful essays on linguistics?",
      "Is she write insightful essays on linguistics?"
    ],
    correctAnswer: 1,
    explanation: "Correct interrogative transformation: 'Does she write insightful essays on linguistics?'",
    explanationBn: "সঠিক রূপ: 'Does she write...?' (Verb-এর সাথে -s থাকবে না)।"
  }
];

export default questions;
