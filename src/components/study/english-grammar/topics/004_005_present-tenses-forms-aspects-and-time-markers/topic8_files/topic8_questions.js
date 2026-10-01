const questions = [
  {
    id: 1,
    question: "Select the sentence where the aspect correctly matches the context of an unvarying scientific law:",
    options: [
      "Light is traveling at 300,000 km/s in a vacuum.",
      "Light travels at 300,000 km/s in a vacuum.",
      "Light has traveled at 300,000 km/s.",
      "Light has been traveling at 300,000 km/s."
    ],
    correctAnswer: 1,
    explanation: "Universal scientific laws are governed by the Simple Present (Base/3rd sing form).",
    explanationBn: "চিরন্তন বৈজ্ঞানিক ধ্রুবক প্রকাশে Simple Present ('travels') ব্যবহৃত হয়।"
  },
  {
    id: 2,
    question: "Identify the sentence that correctly corrects the stative blunder: 'I am knowing her phone number.'",
    options: [
      "I have been knowing her phone number.",
      "I know her phone number.",
      "I am known her phone number.",
      "I knowing her phone number."
    ],
    correctAnswer: 1,
    explanation: "'Know' is a stative verb of cognition; it must be in the Simple Present ('I know').",
    explanationBn: "'Know' একটি Stative Verb, তাই সঠিক রূপ 'I know'।"
  },
  {
    id: 3,
    question: "Choose the correct formulation for a future scheduled timetable:",
    options: [
      "The board meeting will commence tomorrow at 10 AM by schedule.",
      "The board meeting commences tomorrow at 10 AM.",
      "The board meeting is commenced tomorrow at 10 AM.",
      "The board meeting has commenced tomorrow at 10 AM."
    ],
    correctAnswer: 1,
    explanation: "Official scheduled timetables use the Simple Present ('commences').",
    explanationBn: "অফিসিয়াল সময়সূচিতে Simple Present ('commences') ব্যবহৃত হয়।"
  },
  {
    id: 4,
    question: "Fill in the blank: 'If Swadeep ______ the presentation on time, we ______ the contract.'",
    options: [
      "delivers; will secure",
      "will deliver; will secure",
      "is delivering; secure",
      "delivered; secure"
    ],
    correctAnswer: 0,
    explanation: "Conditional 'If' clause takes Simple Present ('delivers'); main clause takes Future ('will secure').",
    explanationBn: "'If' শর্তমূলক ক্লজে Simple Present এবং মেইন ক্লজে Future বসে।"
  },
  {
    id: 5,
    question: "Which of the following sentences conveys speaker annoyance / irritation toward a careless habit?",
    options: [
      "He always leaves the laboratory doors unlocked.",
      "He is always leaving the laboratory doors unlocked!",
      "He has left the laboratory doors unlocked.",
      "He leaves the laboratory doors unlocked every day."
    ],
    correctAnswer: 1,
    explanation: "Present Continuous + 'always' with exclamation conveys emotional frustration and annoyance.",
    explanationBn: "'Is always leaving!' ক্ষোভ বা বিরক্তি প্রকাশ করে।"
  },
  {
    id: 6,
    question: "Fill in the blank: 'Where is Dr. Sukanta Hui? — He isn't here; he ______ to New Delhi for a linguistic summit.'",
    options: [
      "has been",
      "has gone",
      "is been",
      "had gone"
    ],
    correctAnswer: 1,
    explanation: "'Has gone' explains his current absence: he traveled to Delhi and has not yet returned.",
    explanationBn: "বর্তমানে দিল্লিতে উপস্থিত থাকা (অনুপস্থিতি) বোঝাতে 'has gone' হবে।"
  },
  {
    id: 7,
    question: "Complete the sentence: 'Tuhina is back in Barrackpore; she ______ to New Delhi three times this year.'",
    options: [
      "has gone",
      "has been",
      "is gone",
      "had gone"
    ],
    correctAnswer: 1,
    explanation: "'Has been' indicates she visited New Delhi and has returned home (completed round-trip).",
    explanationBn: "দিল্লি ভ্রমণ সম্পন্ন করে ফিরে আসার অভিজ্ঞতায় 'has been' বসে।"
  },
  {
    id: 8,
    question: "Spot the fatal tense anchor violation:",
    options: [
      "The delegates arrived in Barrackpore yesterday.",
      "The delegates have arrived in Barrackpore yesterday.",
      "The delegates have just arrived in Barrackpore.",
      "The delegates will arrive in Barrackpore tomorrow."
    ],
    correctAnswer: 1,
    explanation: "'Yesterday' cannot be paired with Present Perfect ('have arrived'). Simple Past ('arrived') is mandatory.",
    explanationBn: "'Yesterday'-এর সাথে Present Perfect ব্যবহার মারাত্মক ভুল; 'arrived' হবে।"
  },
  {
    id: 9,
    question: "Fill in the blank: 'It ______ continuously ______ 06:00 AM this morning.'",
    options: [
      "has been raining; since",
      "is raining; for",
      "has rained; from",
      "rained; since"
    ],
    correctAnswer: 0,
    explanation: "Continuous ongoing rain starting at a specific point (06:00 AM) requires Present Perfect Continuous + since.",
    explanationBn: "সকাল ৬টা থেকে অবিরাম বৃষ্টিতে 'has been raining; since' বসে।"
  },
  {
    id: 10,
    question: "Choose the correct sentence for duration with a stative verb:",
    options: [
      "I have been knowing him for a decade.",
      "I have known him for a decade.",
      "I am knowing him for a decade.",
      "I know him since ten years."
    ],
    correctAnswer: 1,
    explanation: "Stative verbs like 'know' fall back to Present Perfect ('have known') when expressing duration with 'for'.",
    explanationBn: "Stative Verb-এ Continuous না হয়ে Present Perfect 'have known' হয়।"
  },
  {
    id: 11,
    question: "Where should 'already' be placed in: 'She ______ (has/finished) ______ the diagnostics.'?",
    options: [
      "She already has finished the diagnostics.",
      "She has already finished the diagnostics.",
      "She has finished already the diagnostics.",
      "Already she has finished the diagnostics."
    ],
    correctAnswer: 1,
    explanation: "'Already' sits between auxiliary 'has' and participle 'finished': 'has already finished'.",
    explanationBn: "'Has already finished' হলো সঠিক অবস্থান।"
  },
  {
    id: 12,
    question: "Transform into standard English: 'When have you purchased this car?'",
    options: [
      "When did you purchase this car?",
      "When were you purchased this car?",
      "When are you purchasing this car yesterday?",
      "When did you purchased this car?"
    ],
    correctAnswer: 0,
    explanation: "'When' asking for past point of time takes Simple Past: 'When did you purchase...?'",
    explanationBn: "'When did you purchase...?' হলো সঠিক গঠন।"
  },
  {
    id: 13,
    question: "Identify the sentence demonstrating dynamic usage of 'taste':",
    options: [
      "The curry tastes delicious.",
      "The chef is tasting the sauce to verify the salt level.",
      "Good tea always tastes fragrant.",
      "Sugar tastes sweet."
    ],
    correctAnswer: 1,
    explanation: "The chef actively sampling the sauce is a physical action (Dynamic), so 'is tasting' is correct.",
    explanationBn: "শেফের সক্রিয়ভাবে স্বাদ পরীক্ষা করা Dynamic ক্রিয়া।"
  },
  {
    id: 14,
    question: "Fill in the blank: 'Listen! Someone ______ a plaintive melody on the flute.'",
    options: [
      "plays",
      "is playing",
      "has played",
      "played"
    ],
    correctAnswer: 1,
    explanation: "'Listen!' signals an event occurring at the exact speech moment ('is playing').",
    explanationBn: "'Listen!' বর্তমান মুহূর্তের চলমান ক্রিয়া নির্দেশ করে।"
  },
  {
    id: 15,
    question: "Complete the sentence: 'India ______ freedom on August 15, 1947.'",
    options: [
      "has achieved",
      "achieved",
      "is achieving",
      "was achieved"
    ],
    correctAnswer: 1,
    explanation: "Historical date anchor takes Simple Past ('achieved').",
    explanationBn: "১৯৪৭ সালের সুনির্দিষ্ট অতীত তারিখে Simple Past 'achieved' হয়।"
  },
  {
    id: 16,
    question: "Choose the correct preposition: 'She has been practicing classical dance ______ childhood.'",
    options: [
      "for",
      "since",
      "from",
      "during"
    ],
    correctAnswer: 1,
    explanation: "'Childhood' is a starting point / origin, requiring 'since'.",
    explanationBn: "'Childhood' শুরুর নির্দিষ্ট বিন্দু হওয়ায় 'since' বসবে।"
  },
  {
    id: 17,
    question: "What is the difference between (A) 'I have painted the room' vs (B) 'I have been painting the room'?",
    options: [
      "(A) emphasizes completed result; (B) emphasizes the ongoing activity / process.",
      "(A) is simple present; (B) is past perfect.",
      "(A) means the room is unpainted; (B) means the job is finished.",
      "Zero difference in English grammar."
    ],
    correctAnswer: 0,
    explanation: "Present Perfect (A) highlights the completed outcome; Present Perfect Continuous (B) highlights the ongoing activity.",
    explanationBn: "(A) সমাপ্ত ফলাফল এবং (B) কাজের চলমান প্রক্রিয়া বোঝায়।"
  },
  {
    id: 18,
    question: "Spot the error: 'He has not (A) yet submitted (B) his thesis yesterday (C).'",
    options: [
      "has not (A)",
      "yet submitted (B)",
      "his thesis yesterday (C)",
      "No error"
    ],
    correctAnswer: 2,
    explanation: "'Yesterday' cannot be used in a Present Perfect sentence with 'yet'.",
    explanationBn: "'Yesterday' এবং 'yet' একসাথে Present Perfect-এ বসতে পারে না।"
  },
  {
    id: 19,
    question: "Fill in the blank: 'Why are your palms so dirty?' — 'I ______ the motor engine.'",
    options: [
      "have repaired",
      "have been repairing",
      "am repairing",
      "repair"
    ],
    correctAnswer: 1,
    explanation: "Dirty hands represent physical evidence of a recently completed continuous activity ('have been repairing').",
    explanationBn: "হাতে ময়লা থাকা শারীরিক প্রমাণ, তাই 'have been repairing' হবে।"
  },
  {
    id: 20,
    question: "Select the sentence with correct Subject-Verb Concord in Simple Present:",
    options: [
      "Every student in this prestigious institution study diligently.",
      "Every student in this prestigious institution studies diligently.",
      "Every student in this prestigious institution are studying diligently.",
      "Every student in this prestigious institution have studied."
    ],
    correctAnswer: 1,
    explanation: "'Every student' is singular, requiring 3rd person singular verb 'studies'.",
    explanationBn: "'Every student' Singular Subject, তাই 'studies' হবে।"
  },
  {
    id: 21,
    question: "Complete the sentence: 'This ancient university library ______ over 500,000 rare manuscripts.'",
    options: [
      "is containing",
      "contains",
      "contain",
      "is contain"
    ],
    correctAnswer: 1,
    explanation: "'Contain' is a stative verb of inclusion taking Simple Present 'contains'.",
    explanationBn: "'Contain' একটি Stative Verb, তাই 'contains' হবে।"
  },
  {
    id: 22,
    question: "Which of the following time adverbials requires 'for'?",
    options: [
      "2015",
      "Monday",
      "five years",
      "breakfast"
    ],
    correctAnswer: 2,
    explanation: "'Five years' is a measured elapsed duration, requiring 'for'.",
    explanationBn: "'Five years' সময়কাল বোঝায়, তাই 'for' বসবে।"
  },
  {
    id: 23,
    question: "Choose the sentence that correctly adheres to all present tense invariants:",
    options: [
      "If it will rain, the match will be cancelled.",
      "I have seen him two days ago in Barrackpore.",
      "She has been living in Kolkata since 2018.",
      "He is having four siblings."
    ],
    correctAnswer: 2,
    explanation: "'She has been living in Kolkata since 2018' is 100% syntactically flawless.",
    explanationBn: "'She has been living in Kolkata since 2018' সম্পূর্ণ নির্ভুল।"
  },
  {
    id: 24,
    question: "Transform into Present Continuous to convey temporary arrangement: 'He lives in a dormitory.'",
    options: [
      "He is living in a dormitory this semester until his flat is ready.",
      "He has lived in a dormitory yesterday.",
      "He will live in a dormitory since two years.",
      "He lives in a dormitory this minute."
    ],
    correctAnswer: 0,
    explanation: "'He is living... this semester until...' perfectly encapsulates temporary arrangement.",
    explanationBn: "সাময়িক ব্যবস্থা প্রকাশে 'is living... this semester' সঠিক।"
  },
  {
    id: 25,
    question: "What is the primary key to achieving absolute mastery over English present aspects?",
    options: [
      "Translating word-for-word from regional vernaculars.",
      "Evaluating speaker viewpoint, duration (since/for), stative vs dynamic verb semantics, and respecting past anchor boundaries.",
      "Using Present Perfect for all historical events.",
      "Always adding -ing to every verb."
    ],
    correctAnswer: 1,
    explanation: "True mastery relies on evaluating speaker intent, aspectual unfolding, stative constraints, duration markers, and strict past anchor separation.",
    explanationBn: "বক্তব্যের উদ্দেশ্য, ক্রিয়ার প্রকৃতি (Stative/Dynamic), সময়সীমা এবং অতীতের সঠিক সীমানা রক্ষা করাই হলো Aspect-এর পূর্ণ দক্ষতা।"
  }
];

export default questions;
