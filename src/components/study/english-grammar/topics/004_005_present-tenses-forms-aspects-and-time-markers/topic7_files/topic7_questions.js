const questions = [
  {
    id: 1,
    question: "Spot the fatal tense error in the given options:",
    options: [
      "I completed the research paper yesterday evening.",
      "I have completed the research paper yesterday evening.",
      "I have completed the research paper today.",
      "I completed the research paper three days ago."
    ],
    correctAnswer: 1,
    explanation: "'Yesterday evening' is a finished past time anchor that cannot co-occur with Present Perfect ('have completed'). It must be Simple Past: 'I completed...'",
    explanationBn: "'Yesterday evening' একটি নির্দিষ্ট অতীত সময় নির্দেশক, তাই 'have completed' মারাত্মক ভুল; 'completed' হবে।"
  },
  {
    id: 2,
    question: "Fill in the blank: 'Alexander the Great ______ the Indus valley in 326 BCE.'",
    options: [
      "has invaded",
      "invaded",
      "is invading",
      "has been invading"
    ],
    correctAnswer: 1,
    explanation: "Specific historical past dates ('in 326 BCE') strictly require the Simple Past ('invaded').",
    explanationBn: "নির্দিষ্ট ঐতিহাসিক সাল বা তারিখ উল্লেখ থাকলে Simple Past ('invaded') ব্যবহার করতে হয়।"
  },
  {
    id: 3,
    question: "Select the correct interrogative question inquiring about the time of a past purchase:",
    options: [
      "When have you bought this premium mechanical keyboard?",
      "When did you buy this premium mechanical keyboard?",
      "When were you buying this keyboard yesterday?",
      "When have you been buying this keyboard?"
    ],
    correctAnswer: 1,
    explanation: "'When' asks for a specific past moment in time and is incompatible with Present Perfect. Use 'When did you buy...?'",
    explanationBn: "'When' দিয়ে অতীতের নির্দিষ্ট সময় জানতে 'When did you buy...?' বসাতে হয়।"
  },
  {
    id: 4,
    question: "Choose the sentence that correctly adheres to the Finished Past Time Anchor rule:",
    options: [
      "The courier has delivered the parcel ten minutes ago.",
      "The courier delivered the parcel ten minutes ago.",
      "The courier has been delivering the parcel ten minutes ago.",
      "The courier delivers the parcel ten minutes ago."
    ],
    correctAnswer: 1,
    explanation: "'Ten minutes ago' contains the past anchor 'ago', mandating Simple Past ('delivered').",
    explanationBn: "'Ten minutes ago'-এর সাথে Simple Past 'delivered' আবশ্যক।"
  },
  {
    id: 5,
    question: "It is currently 08:00 PM in the evening. How should the speaker refer to their morning tea?",
    options: [
      "I have drunk two cups of tea this morning.",
      "I drank two cups of tea this morning.",
      "I am drinking two cups of tea this morning.",
      "I have been drinking two cups of tea this morning."
    ],
    correctAnswer: 1,
    explanation: "Because the morning is completely finished by 8:00 PM, 'this morning' is a closed past period requiring Simple Past ('drank').",
    explanationBn: "যেহেতু রাত ৮টায় সকাল শেষ হয়ে গেছে, তাই Simple Past 'drank' হবে।"
  },
  {
    id: 6,
    question: "Spot the error: 'Swadeep has passed (A) his board examinations (B) in 2021 with distinction (C).'",
    options: [
      "has passed (A)",
      "his board examinations (B)",
      "in 2021 with distinction (C)",
      "No error"
    ],
    correctAnswer: 0,
    explanation: "'In 2021' is a past year anchor; use Simple Past 'passed' instead of 'has passed'.",
    explanationBn: "'In 2021' নির্দিষ্ট অতীত বছর, তাই 'has passed' ভুল; 'passed' হবে।"
  },
  {
    id: 7,
    question: "Fill in the blank: 'We ______ our grandparents in Barrackpore last weekend.'",
    options: [
      "have visited",
      "visited",
      "were visited",
      "have been visiting"
    ],
    correctAnswer: 1,
    explanation: "'Last weekend' is a completed past timeframe requiring Simple Past ('visited').",
    explanationBn: "'Last weekend'-এর সাথে Simple Past 'visited' বসবে।"
  },
  {
    id: 8,
    question: "Why is 'The train has departed at 6:00 AM this morning' wrong if spoken at 2:00 PM?",
    options: [
      "Because 'train' is an inanimate object.",
      "Because at 2:00 PM, '6:00 AM this morning' is a closed, finished past point in time, demanding Simple Past ('departed').",
      "Because '6:00 AM' requires Future Tense.",
      "Because 'depart' is a stative verb."
    ],
    correctAnswer: 1,
    explanation: "A specific closed clock time in a finished part of the day requires Simple Past ('The train departed at 6:00 AM').",
    explanationBn: "বিকেল ২টায় সকাল ৬টার ঘটনা একটি সমাপ্ত অতীত বিন্দু, তাই Simple Past 'departed' হবে।"
  },
  {
    id: 9,
    question: "Select the sentence where Present Perfect is legitimately used because the time period is UNFINISHED:",
    options: [
      "I have received three client inquiries today (and the business day is still ongoing).",
      "I have received three client inquiries yesterday.",
      "I have received three client inquiries two days ago.",
      "I have received three client inquiries in 2019."
    ],
    correctAnswer: 0,
    explanation: "'Today' is an ongoing, unfinished time period, making Present Perfect ('have received') completely legitimate.",
    explanationBn: "'Today' এখনো চলমান (অসমাপ্ত) সময়সীমা হওয়ায় Present Perfect শুদ্ধ।"
  },
  {
    id: 10,
    question: "Transform into standard English: 'When have you arrived in Kolkata?'",
    options: [
      "When did you arrive in Kolkata?",
      "When were you arrived in Kolkata?",
      "When are you arrived in Kolkata?",
      "When did you arrived in Kolkata?"
    ],
    correctAnswer: 0,
    explanation: "'When did you arrive in Kolkata?' is the correct interrogative construction for specific arrival time.",
    explanationBn: "সঠিক গঠন: 'When did you arrive in Kolkata?'"
  },
  {
    id: 11,
    question: "Fill in the blank: 'Rabindranath Tagore ______ the Nobel Prize in Literature in 1913.'",
    options: [
      "has received",
      "received",
      "is receiving",
      "has been receiving"
    ],
    correctAnswer: 1,
    explanation: "Historical event with year anchor ('in 1913') takes Simple Past ('received').",
    explanationBn: "১৯১৩ সালের ঐতিহাসিক নোবেল প্রাপ্তির বর্ণনায় Simple Past 'received' হবে।"
  },
  {
    id: 12,
    question: "Spot the error: 'Did you seen (A) the magnificent eclipse (B) yesterday? (C)'",
    options: [
      "Did you seen (A)",
      "the magnificent eclipse (B)",
      "yesterday? (C)",
      "No error"
    ],
    correctAnswer: 0,
    explanation: "After auxiliary 'did', the base form V1 ('see') is mandatory: 'Did you see...?'",
    explanationBn: "'Did'-এর পর মূল verb-এর Base Form (V1) বসে, তাই 'Did you see' হবে।"
  },
  {
    id: 13,
    question: "Complete the sentence: 'The software update ______ successfully five minutes ago.'",
    options: [
      "has completed",
      "completed",
      "is completed",
      "was completing"
    ],
    correctAnswer: 1,
    explanation: "'Five minutes ago' requires Simple Past ('completed').",
    explanationBn: "'Five minutes ago'-এর জন্য Simple Past 'completed' হবে।"
  },
  {
    id: 14,
    question: "Which of the following time markers CANNOT be paired with Present Perfect?",
    options: [
      "Recently",
      "Already",
      "Yesterday afternoon",
      "So far"
    ],
    correctAnswer: 2,
    explanation: "'Yesterday afternoon' is a finished past anchor and strictly forbids Present Perfect.",
    explanationBn: "'Yesterday afternoon' একটি সমাপ্ত অতীত সময়, যা Present Perfect-এ নিষিদ্ধ।"
  },
  {
    id: 15,
    question: "Choose the correct sentence comparing past vs present:",
    options: [
      "I have bought this car in 2019, and I have driven it for five years.",
      "I bought this car in 2019, and I have driven it for five years.",
      "I bought this car in 2019, and I drove it for five years since.",
      "I have bought this car in 2019, and I drove it today."
    ],
    correctAnswer: 1,
    explanation: "First clause with past year ('in 2019') uses Simple Past ('bought'); second clause with ongoing duration uses Present Perfect ('have driven for five years').",
    explanationBn: "'In 2019'-এর সাথে Simple Past ('bought') এবং ৫ বছরের ধারাবাহিকতায় Present Perfect ('have driven') সঠিক।"
  },
  {
    id: 16,
    question: "Fill in the blank: 'She ______ her Master's degree when she was just twenty-two.'",
    options: [
      "has earned",
      "earned",
      "is earning",
      "has been earning"
    ],
    correctAnswer: 1,
    explanation: "The past time clause 'when she was twenty-two' anchors the event in the past, requiring Simple Past ('earned').",
    explanationBn: "'When she was twenty-two' অতীত ক্লজ নির্দেশ করায় Simple Past 'earned' হবে।"
  },
  {
    id: 17,
    question: "Spot the error: 'The police has arrested (A) the prime suspect (B) last night (C).'",
    options: [
      "has arrested (A)",
      "the prime suspect (B)",
      "last night (C)",
      "No error"
    ],
    correctAnswer: 0,
    explanation: "'Last night' is a finished past anchor. Say: 'The police arrested the prime suspect last night.'",
    explanationBn: "'Last night' থাকায় 'has arrested' ভুল; 'arrested' হবে।"
  },
  {
    id: 18,
    question: "Complete the sentence: 'At what time ______ the seminar ______ yesterday?'",
    options: [
      "has; concluded",
      "did; conclude",
      "was; conclude",
      "did; concluded"
    ],
    correctAnswer: 1,
    explanation: "Simple past interrogative with 'yesterday': 'did the seminar conclude?'.",
    explanationBn: "'Did the seminar conclude... yesterday?' হলো সঠিক রূপ।"
  },
  {
    id: 19,
    question: "Why is 'I have met him on Monday last' ungrammatical?",
    options: [
      "Because 'on Monday last' is a specific finished past day, demanding Simple Past ('I met him on Monday last').",
      "Because 'Monday' is capitalized.",
      "Because 'meet' has no participle.",
      "Because 'last' cannot follow a day of the week."
    ],
    correctAnswer: 0,
    explanation: "Specific past weekdays ('on Monday last') require Simple Past ('met').",
    explanationBn: "'On Monday last' সমাপ্ত অতীত দিন নির্দেশ করায় Simple Past 'met' হবে।"
  },
  {
    id: 20,
    question: "Fill in the blank: 'India ______ independence on August 15, 1947.'",
    options: [
      "has achieved",
      "achieved",
      "is achieving",
      "had been achieving"
    ],
    correctAnswer: 1,
    explanation: "Completed historical event on a calendar date takes Simple Past ('achieved').",
    explanationBn: "১৯৪৭ সালের ১৫ই আগস্টের সুনির্দিষ্ট ঐতিহাসিক ঘটনায় 'achieved' হবে।"
  },
  {
    id: 21,
    question: "Select the sentence that contains NO grammatical error:",
    options: [
      "Tuhina has submitted her application yesterday.",
      "Tuhina submitted her application yesterday.",
      "Tuhina has submitted her application two days ago.",
      "Tuhina was submitted her application yesterday."
    ],
    correctAnswer: 1,
    explanation: "'Tuhina submitted her application yesterday' is grammatically pure.",
    explanationBn: "'Tuhina submitted her application yesterday' সম্পূর্ণ শুদ্ধ।"
  },
  {
    id: 22,
    question: "Fill in the blank: 'How ______ you ______ the locked safe last night?'",
    options: [
      "have; opened",
      "did; open",
      "did; opened",
      "were; open"
    ],
    correctAnswer: 1,
    explanation: "Inquiring about a specific past action last night requires 'did you open'.",
    explanationBn: "'Did you open... last night?' সঠিক।"
  },
  {
    id: 23,
    question: "What is the psychological / linguistic reason why Present Perfect forbids 'yesterday'?",
    options: [
      "Because English grammar views 'yesterday' as an entirely disconnected, closed temporal space that cannot touch the present moment.",
      "Because 'yesterday' has too many syllables.",
      "Because 'yesterday' is a noun rather than an adverb.",
      "Because 'have' can only refer to tomorrow."
    ],
    correctAnswer: 0,
    explanation: "Present Perfect bridges to NOW. 'Yesterday' is a closed, severed past block with zero connection to the current split second.",
    explanationBn: "Present Perfect বর্তমানের সাথে সম্পর্কযুক্ত; কিন্তু 'Yesterday' একটি বন্ধ অতীত অধ্যায় যার সাথে বর্তমানের সংযোগ নেই।"
  },
  {
    id: 24,
    question: "Transform into standard English: 'The bell has rung five minutes ago.'",
    options: [
      "The bell rang five minutes ago.",
      "The bell was rung five minutes ago.",
      "The bell is rung five minutes ago.",
      "The bell had rung five minutes ago yesterday."
    ],
    correctAnswer: 0,
    explanation: "'The bell rang five minutes ago' is the pristine Simple Past correction.",
    explanationBn: "'The bell rang five minutes ago' সঠিক।"
  },
  {
    id: 25,
    question: "Which of the following formulas represents the Finished Past Anchor Invariant?",
    options: [
      "Finished Past Time Marker (yesterday / ago / in 1999) + Present Perfect = Correct",
      "Finished Past Time Marker (yesterday / ago / in 1999) + Simple Past (V2) = MANDATORY",
      "Finished Past Time Marker + Present Continuous = Mandatory",
      "Finished Past Time Marker + Future Perfect = Mandatory"
    ],
    correctAnswer: 1,
    explanation: "Finished Past Time Marker + Simple Past (V2) is an ironclad mandatory invariant of English grammar.",
    explanationBn: "সমাপ্ত অতীত সময় নির্দেশক (yesterday/ago/in 1999) + Simple Past (V2) হলো অপরিবর্তনীয় ব্যাকরণিক নীতি।"
  }
];

export default questions;
