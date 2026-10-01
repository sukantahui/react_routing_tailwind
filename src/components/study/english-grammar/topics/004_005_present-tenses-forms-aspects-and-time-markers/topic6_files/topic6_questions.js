const questions = [
  {
    id: 1,
    question: "Fill in the blank: 'It ______ continuously since 05:00 AM this morning.'",
    options: [
      "is raining",
      "has been raining",
      "was raining",
      "rained"
    ],
    correctAnswer: 1,
    explanation: "An action starting at a specific past point (05:00 AM) and continuing unbroken into the present requires Present Perfect Continuous ('has been raining').",
    explanationBn: "সকাল ৫টা থেকে একটানা বৃষ্টি চলার কারণে 'has been raining' সঠিক।"
  },
  {
    id: 2,
    question: "Which of the following time expressions takes the preposition 'since' rather than 'for'?",
    options: [
      "three decades",
      "a fortnight",
      "last Tuesday morning",
      "several hours"
    ],
    correctAnswer: 2,
    explanation: "'Last Tuesday morning' is a specific starting point of time, requiring 'since'. The others are durations requiring 'for'.",
    explanationBn: "'Last Tuesday morning' একটি নির্দিষ্ট শুরুর বিন্দু (Point of Time), তাই 'since' বসবে।"
  },
  {
    id: 3,
    question: "Spot the fatal stative verb error with duration:",
    options: [
      "I have known Swadeep for more than ten years.",
      "I have been knowing Swadeep for more than ten years.",
      "I met Swadeep ten years ago.",
      "Swadeep and I have been friends for a decade."
    ],
    correctAnswer: 1,
    explanation: "'Know' is a stative verb and cannot take '-ing' in Present Perfect Continuous. It must fall back to Present Perfect: 'I have known Swadeep...'",
    explanationBn: "'Know' একটি Stative Verb, তাই 'have been knowing' মারাত্মক ভুল; 'have known' হবে।"
  },
  {
    id: 4,
    question: "Fill in the blank: 'Why are your clothes drenched in sweat?' — 'I ______ badminton for two hours.'",
    options: [
      "have played",
      "have been playing",
      "am playing",
      "was playing"
    ],
    correctAnswer: 1,
    explanation: "A recent continuous activity with physical evidence in the present moment takes Present Perfect Continuous ('have been playing').",
    explanationBn: "ঘামে ভেজা থাকা বর্তমান শারীরিক প্রমাণ নির্দেশ করে, তাই 'have been playing' সঠিক।"
  },
  {
    id: 5,
    question: "Choose the correct preposition: 'She has been working on her doctoral thesis ______ she graduated from Jadavpur University.'",
    options: [
      "for",
      "since",
      "from",
      "during"
    ],
    correctAnswer: 1,
    explanation: "When introducing a clause anchored to a specific past event (graduated), 'since' is the mandatory connective.",
    explanationBn: "অতীতের একটি নির্দিষ্ট ঘটনা (she graduated) থেকে বোঝাতে 'since' বসে।"
  },
  {
    id: 6,
    question: "Select the sentence where 'for' is correctly used:",
    options: [
      "They have been living in Barrackpore for 2012.",
      "They have been living in Barrackpore for a decade.",
      "They have been living in Barrackpore for Monday.",
      "They have been living in Barrackpore for childhood."
    ],
    correctAnswer: 1,
    explanation: "'A decade' is a measured period/duration of time, properly paired with 'for'.",
    explanationBn: "'A decade' সময়ের ব্যাপ্তি (Duration), তাই 'for' প্রযোজ্য।"
  },
  {
    id: 7,
    question: "Complete the sentence: 'Professor Hui ______ grammar diagnostics to competitive aspirants since 2005.'",
    options: [
      "is teaching",
      "has been teaching",
      "taught",
      "was teaching"
    ],
    correctAnswer: 1,
    explanation: "Starting point in 2005 + ongoing activity to the present = 'has been teaching'.",
    explanationBn: "২০০৫ সাল থেকে বর্তমান পর্যন্ত চলমান শিক্ষকতায় 'has been teaching' হবে।"
  },
  {
    id: 8,
    question: "Identify the sentence that correctly corrects: 'He is having this car for five years.'",
    options: [
      "He has been having this car for five years.",
      "He has had this car for five years.",
      "He had this car for five years yesterday.",
      "He is possessing this car for five years."
    ],
    correctAnswer: 1,
    explanation: "'Have' indicating possession is stative; with duration ('for five years'), it converts to Present Perfect ('has had').",
    explanationBn: "মালিকানা অর্থে 'have' একটি Stative Verb; সময়ের ব্যাপ্তি থাকলে Present Perfect রূপ 'has had' হয়।"
  },
  {
    id: 9,
    question: "Which of the following time phrases MUST take 'since'?",
    options: [
      "8 hours",
      "2 centuries",
      "8:15 AM",
      "many weeks"
    ],
    correctAnswer: 2,
    explanation: "'8:15 AM' is an exact clock point (origin), demanding 'since'.",
    explanationBn: "'8:15 AM' ঘড়ির কাঁটার নির্দিষ্ট বিন্দু (Point of Time), তাই 'since' বসবে।"
  },
  {
    id: 10,
    question: "Spot the error: 'How long (A) are you waiting (B) here in the rain? (C)'",
    options: [
      "How long (A)",
      "are you waiting (B)",
      "here in the rain? (C)",
      "No error"
    ],
    correctAnswer: 1,
    explanation: "Inquiring about duration up to the present requires Present Perfect Continuous: 'How long have you been waiting...?'",
    explanationBn: "'How long' দিয়ে সময়কাল জানতে 'have you been waiting' ব্যবহার করতে হয়।"
  },
  {
    id: 11,
    question: "Fill in the blank: 'The research laboratory ______ uninterrupted solar energy ______ last December.'",
    options: [
      "has been generating; since",
      "is generating; for",
      "generated; since",
      "was generating; from"
    ],
    correctAnswer: 0,
    explanation: "'Last December' is a starting point requiring 'since', paired with 'has been generating'.",
    explanationBn: "'Last December'-এর সাথে 'since' এবং ক্রিয়ায় 'has been generating' বসবে।"
  },
  {
    id: 12,
    question: "Choose the correct sentence involving an unfinished duration:",
    options: [
      "Abhronila has been practicing classical ragas for three hours this morning.",
      "Abhronila is practicing classical ragas since three hours.",
      "Abhronila practices classical ragas for three hours since morning yesterday.",
      "Abhronila has practiced for morning."
    ],
    correctAnswer: 0,
    explanation: "'Has been practicing... for three hours' is immaculate.",
    explanationBn: "'Has been practicing... for three hours' ব্যাকরণগতভাবে নিখুঁত।"
  },
  {
    id: 13,
    question: "In the subordinate clause of 'since' (e.g. 'She has lived here since her father ______'), which tense is required?",
    options: [
      "Simple Present (retires)",
      "Simple Past (retired)",
      "Present Perfect (has retired)",
      "Past Continuous (was retiring)"
    ],
    correctAnswer: 1,
    explanation: "The clause following 'since' marks a past milestone and takes Simple Past (V2, 'retired').",
    explanationBn: "'Since'-এর পরবর্তী সাবঅর্ডিনেট ক্লজটি অতীতের একটি ঘটনা নির্দেশ করে, তাই Simple Past ('retired') বসে।"
  },
  {
    id: 14,
    question: "Why is 'I am studying since 2 PM' considered a major grammatical blunder in Indian English?",
    options: [
      "Because '2 PM' should be written as '14:00'.",
      "Because Present Continuous ('am studying') cannot express elapsed duration starting in the past; Present Perfect Continuous ('have been studying') is obligatory.",
      "Because 'since' only applies to years.",
      "Because 'study' is a stative verb."
    ],
    correctAnswer: 1,
    explanation: "Present Continuous only indicates actions in progress now, without duration. When duration from a past point is added with 'since/for', Present Perfect Continuous ('have been studying') is required.",
    explanationBn: "'Since' বা 'For' সহযোগে সময় যুক্ত থাকলে Present Continuous হয় না; Present Perfect Continuous আবশ্যক।"
  },
  {
    id: 15,
    question: "Fill in the blank: 'Debopam is out of breath because he ______ the heavy luggage upstairs.'",
    options: [
      "has carried",
      "has been carrying",
      "carries",
      "is carrying"
    ],
    correctAnswer: 1,
    explanation: "Being out of breath is immediate physical evidence of a recently completed continuous activity ('has been carrying').",
    explanationBn: "হাঁপিয়ে ওঠা শারীরিক ফলাফল নির্দেশ করে, তাই 'has been carrying' সঠিক।"
  },
  {
    id: 16,
    question: "Which phrase requires 'for'?",
    options: [
      "sunrise",
      "the last six months",
      "last Tuesday",
      "her arrival"
    ],
    correctAnswer: 1,
    explanation: "'The last six months' represents a measured duration (6 months), requiring 'for'.",
    explanationBn: "'The last six months' সময়ের পরিমাপ বোঝায়, তাই 'for' হবে।"
  },
  {
    id: 17,
    question: "Select the sentence with impeccable syntax:",
    options: [
      "We have been residing in this heritage colony since twenty years.",
      "We have been residing in this heritage colony for twenty years.",
      "We are residing in this heritage colony for twenty years.",
      "We reside in this heritage colony since twenty years."
    ],
    correctAnswer: 1,
    explanation: "'For twenty years' correctly matches duration with Present Perfect Continuous.",
    explanationBn: "'For twenty years' হলো শুদ্ধ প্রয়োগ।"
  },
  {
    id: 18,
    question: "Fill in the blank: 'The telescope ______ anomalies in the deep sky ______ the new sensor was installed.'",
    options: [
      "has been detecting; since",
      "is detecting; for",
      "detected; for",
      "has detected; from"
    ],
    correctAnswer: 0,
    explanation: "'Since' introduces the past anchor clause ('was installed'), paired with 'has been detecting'.",
    explanationBn: "'Since the sensor was installed' এবং 'has been detecting' সঠিক।"
  },
  {
    id: 19,
    question: "What is the difference between: (A) 'I have painted the living room.' vs (B) 'I have been painting the living room.'?",
    options: [
      "(A) means the painting is 100% completed; (B) emphasizes the ongoing activity (the job may still be in progress).",
      "(A) is past continuous; (B) is future perfect.",
      "(A) means the room is unpainted; (B) means the room is fully dry.",
      "There is zero difference in English syntax."
    ],
    correctAnswer: 0,
    explanation: "Present Perfect (A) focuses on completion and the finished room; Present Perfect Continuous (B) focuses on the activity and process, which may not be finished.",
    explanationBn: "(A) কাজটি পুরোপুরি সম্পন্ন হওয়া বোঝায়; (B) কাজের প্রক্রিয়া বা ধারাবাহিকতা বোঝায় যা এখনো চলতে পারে।"
  },
  {
    id: 20,
    question: "Spot the error: 'She has been wanting (A) to become a neurosurgeon (B) since she was seven years old (C).'",
    options: [
      "has been wanting (A)",
      "to become a neurosurgeon (B)",
      "since she was seven years old (C)",
      "No error"
    ],
    correctAnswer: 0,
    explanation: "'Want' is a stative verb of desire and cannot take continuous form (*has been wanting). It should be 'She has wanted to become...'",
    explanationBn: "'Want' একটি Stative Verb, তাই 'has been wanting' ভুল; 'has wanted' হবে।"
  },
  {
    id: 21,
    question: "Fill in the blank: 'The workers ______ on strike ______ over a fortnight.'",
    options: [
      "have been; for",
      "are; since",
      "have been being; for",
      "were; from"
    ],
    correctAnswer: 0,
    explanation: "'Be' functions statively with duration 'for over a fortnight' -> 'have been on strike for over a fortnight'.",
    explanationBn: "'Have been on strike for over a fortnight' সঠিক।"
  },
  {
    id: 22,
    question: "Choose the correct question regarding study duration:",
    options: [
      "Since when have you been learning Sanskrit grammar?",
      "For when are you learning Sanskrit grammar?",
      "Since when are you learning Sanskrit grammar?",
      "From how long do you learn Sanskrit grammar?"
    ],
    correctAnswer: 0,
    explanation: "'Since when have you been learning...?' correctly inquires about the starting point of an ongoing activity.",
    explanationBn: "'Since when have you been learning...?' প্রমিত প্রশ্নবোধক রূপ।"
  },
  {
    id: 23,
    question: "Complete the sentence: 'It has been raining ______ yesterday evening without a pause.'",
    options: [
      "for",
      "since",
      "from",
      "by"
    ],
    correctAnswer: 1,
    explanation: "'Yesterday evening' is a specific point of origin, requiring 'since'.",
    explanationBn: "'Yesterday evening' শুরুর বিন্দু হওয়ায় 'since' বসবে।"
  },
  {
    id: 24,
    question: "Identify the correct negative Present Perfect Continuous sentence:",
    options: [
      "They have been not attending the rehearsals.",
      "They have not been attending the rehearsals lately.",
      "They not have been attending the rehearsals.",
      "They are not been attending the rehearsals."
    ],
    correctAnswer: 1,
    explanation: "Negation sits between the first auxiliary and been: 'have not been attending'.",
    explanationBn: "'Have not been attending' হলো সঠিক নেগেটিভ রূপ।"
  },
  {
    id: 25,
    question: "Which of the following summarizes the 'Since' vs 'For' rule?",
    options: [
      "Since = Period of time; For = Point of time.",
      "Since = Specific starting point / origin; For = Measured duration / length of elapsed time.",
      "Both are interchangeable at the writer's discretion.",
      "Since is only used in negative sentences; For is only used in questions."
    ],
    correctAnswer: 1,
    explanation: "Since anchors to a specific starting point in time; For measures the total elapsed duration.",
    explanationBn: "Since = শুরুর নির্দিষ্ট সময় (Point); For = মোট সময়ের ব্যাপ্তি (Duration)।"
  }
];

export default questions;
