const questions = [
  {
    id: 1,
    question: "Fill in the blank: 'Tuhina was utterly exhausted because she ______ for eight continuous hours.'",
    options: [
      "had studied",
      "had been studying",
      "was studying",
      "studied"
    ],
    correctAnswer: 1,
    explanation: "Ongoing duration leading up to past physical fatigue mandates Past Perfect Continuous ('had been studying').",
    explanationBn: "অতীতের ক্লান্তির কারণ হিসেবে পূর্ববর্তী ৮ ঘণ্টার ধারাবাহিক পরিশ্রমে 'had been studying' বসে।"
  },
  {
    id: 2,
    question: "Spot the stative verb error in Past Perfect Continuous:",
    options: [
      "We had been knowing each other for five years before we joined the research center.",
      "We had known each other for five years before we joined the research center.",
      "We knew each other for five years.",
      "We had met each other five years before."
    ],
    correctAnswer: 0,
    explanation: "'Know' is stative and cannot take progressive forms (*had been knowing). Use 'had known'.",
    explanationBn: "'Know' একটি Stative Verb, তাই 'had been knowing' ভুল; 'had known' হবে।"
  },
  {
    id: 3,
    question: "Fill in the blank: 'The pitch was unplayable because it ______ heavily all night.'",
    options: [
      "rained",
      "had been raining",
      "was raining",
      "has rained"
    ],
    correctAnswer: 1,
    explanation: "Past state (unplayable pitch) resulted from unbroken past duration of rain ('had been raining').",
    explanationBn: "মাঠ খেলার অনুপযোগী হওয়ার পেছনে সারারাত বৃষ্টি চলার কারণে 'had been raining' সঠিক।"
  },
  {
    id: 4,
    question: "Choose the correct sentence expressing duration leading up to a past milestone:",
    options: [
      "By 2020, Swadeep had been working at the technology firm for seven years.",
      "By 2020, Swadeep was working at the technology firm since seven years.",
      "By 2020, Swadeep has been working at the technology firm for seven years.",
      "By 2020, Swadeep worked for seven years since 2013."
    ],
    correctAnswer: 0,
    explanation: "'By 2020... had been working... for seven years' correctly establishes past duration up to the 2020 milestone.",
    explanationBn: "২০২০ সালের পূর্বের ৭ বছরের চলমান কাজের বর্ণনায় 'had been working... for seven years' সঠিক।"
  },
  {
    id: 5,
    question: "Complete the sentence: 'The musicians ______ for three hours before the director called a lunch break.'",
    options: [
      "had been rehearsing",
      "were rehearsing",
      "had rehearsed",
      "rehearsed"
    ],
    correctAnswer: 0,
    explanation: "Continuous duration (for 3 hours) prior to the lunch break takes Past Perfect Continuous ('had been rehearsing').",
    explanationBn: "বিরতি দেওয়ার পূর্বের ৩ ঘণ্টার অনুশীলনে 'had been rehearsing' বসবে।"
  },
  {
    id: 6,
    question: "What is the difference between (A) 'He had painted the room' vs (B) 'He had been painting the room'?",
    options: [
      "(A) emphasizes completed result before a past point; (B) emphasizes the continuous activity/duration in the past.",
      "(A) is simple present; (B) is past continuous.",
      "(A) means the room was wet; (B) means the room was dry.",
      "There is no difference in English grammar."
    ],
    correctAnswer: 0,
    explanation: "Past Perfect (A) highlights the finished painted room; Past Perfect Continuous (B) highlights the duration and effort spent painting.",
    explanationBn: "(A) সমাপ্ত ফলাফল এবং (B) অতীত কাজের ধারাবাহিকতা ও পরিশ্রম বোঝায়।"
  },
  {
    id: 7,
    question: "Fill in the blank: 'How long ______ you ______ Sanskrit before you entered the university?'",
    options: [
      "had; been studying",
      "were; studying",
      "did; study",
      "have; been studying"
    ],
    correctAnswer: 0,
    explanation: "Inquiring about duration prior to a past event (university entry): 'had you been studying'.",
    explanationBn: "বিশ্ববিদ্যালয়ে ভর্তির পূর্বে কতদিন পড়েছিলেন তা জানতে 'had you been studying' বসে।"
  },
  {
    id: 8,
    question: "Spot the error: 'He was out of breath (A) because he was running (B) up the steep hill for an hour (C).'",
    options: [
      "was out of breath (A)",
      "because he was running (B)",
      "up the steep hill for an hour (C)",
      "No error"
    ],
    correctAnswer: 1,
    explanation: "With duration ('for an hour') leading to past physical evidence, use Past Perfect Continuous: 'he had been running'.",
    explanationBn: "এক ঘণ্টার ধারাবাহিক পরিশ্রমের জন্য 'was running'-এর পরিবর্তে 'had been running' হবে।"
  },
  {
    id: 9,
    question: "Fill in the blank: 'The boiler ______ alarming noises for days before it finally ruptured.'",
    options: [
      "had been emitting",
      "was emitting",
      "emitted",
      "has been emitting"
    ],
    correctAnswer: 0,
    explanation: "Ongoing duration over days before the final rupture: 'had been emitting'.",
    explanationBn: "ফেটে যাওয়ার পূর্বে দিনব্যাপী চলমান শব্দে 'had been emitting' হবে।"
  },
  {
    id: 10,
    question: "Choose the correct sentence with 'since' in the past:",
    options: [
      "She had been researching genetic mutations since her graduation in 2015.",
      "She was researching genetic mutations since her graduation in 2015.",
      "She researched genetic mutations since 2015.",
      "She has been researching genetic mutations since 2015 until she retired yesterday."
    ],
    correctAnswer: 0,
    explanation: "'Had been researching... since her graduation in 2015' is standard Past Perfect Continuous.",
    explanationBn: "'Had been researching... since 2015' হলো প্রমিত রূপ।"
  },
  {
    id: 11,
    question: "Complete the sentence: 'The team ______ the manuscript for weeks before they detected the typographical errors.'",
    options: [
      "had been proofreading",
      "were proofreading",
      "proofread",
      "have proofread"
    ],
    correctAnswer: 0,
    explanation: "Weeks of continuous proofreading prior to error detection: 'had been proofreading'.",
    explanationBn: "ত্রুটি ধরা পড়ার পূর্বের সপ্তাহব্যাপী প্রুফরিডিংয়ে 'had been proofreading' বসে।"
  },
  {
    id: 12,
    question: "Identify the correct negative form:",
    options: [
      "They had not been sleeping well for days before the final exam.",
      "They did not had been sleeping well.",
      "They were not been sleeping well.",
      "They had been not sleeping well."
    ],
    correctAnswer: 0,
    explanation: "Subject + had not been + V-ing ('had not been sleeping').",
    explanationBn: "'Had not been sleeping' হলো সঠিক নেগেটিভ রূপ।"
  },
  {
    id: 13,
    question: "Fill in the blank: 'His eyes were red and watery because he ______ at the monitor screen for hours.'",
    options: [
      "had been staring",
      "was staring",
      "stared",
      "has been staring"
    ],
    correctAnswer: 0,
    explanation: "Red eyes provide past evidence of hours of staring ('had been staring').",
    explanationBn: "চোখ লাল হওয়ার পেছনে ঘণ্টার পর ঘণ্টা তাকিয়ে থাকায় 'had been staring' হবে।"
  },
  {
    id: 14,
    question: "Spot the error: 'They had been owning (A) the vintage printing press (B) for three decades before selling it (C).'",
    options: [
      "had been owning (A)",
      "the vintage printing press (B)",
      "for three decades before selling it (C)",
      "No error"
    ],
    correctAnswer: 0,
    explanation: "'Own' is a stative verb of possession. Use Past Perfect 'had owned' instead of 'had been owning'.",
    explanationBn: "'Own' Stative Verb হওয়ায় 'had been owning' ভুল; 'had owned' হবে।"
  },
  {
    id: 15,
    question: "Complete the sentence: 'When the rescue helicopter arrived, the sailors ______ on the raft for seventy hours.'",
    options: [
      "had been drifting",
      "were drifting",
      "drifted",
      "have been drifting"
    ],
    correctAnswer: 0,
    explanation: "70 hours of continuous drifting prior to helicopter arrival: 'had been drifting'.",
    explanationBn: "উদ্ধারকারী হেলিকপ্টার আসার পূর্বে ৭০ ঘণ্টার ভেসে থাকায় 'had been drifting' হবে।"
  },
  {
    id: 16,
    question: "Which of the following sentences correctly expresses past duration?",
    options: [
      "Swadeep had been practicing the flute since early dawn before his audition started.",
      "Swadeep was practicing the flute since early dawn before audition started.",
      "Swadeep practiced the flute since dawn.",
      "Swadeep has been practicing dawn yesterday."
    ],
    correctAnswer: 0,
    explanation: "'Had been practicing... since early dawn before his audition started' is 100% syntactically pure.",
    explanationBn: "'Had been practicing... since early dawn' সম্পূর্ণ শুদ্ধ।"
  },
  {
    id: 17,
    question: "Fill in the blank: 'The engine ______ smoothly for over 500 miles before the oil leak occurred.'",
    options: [
      "had been running",
      "was running",
      "ran",
      "has run"
    ],
    correctAnswer: 0,
    explanation: "Duration of smooth operation (500 miles) prior to the oil leak: 'had been running'.",
    explanationBn: "তেল লিক হওয়ার পূর্বের ৫০০ মাইল নিরবচ্ছিন্ন চলায় 'had been running' হবে।"
  },
  {
    id: 18,
    question: "Why is 'I was knowing him for years before we met' ungrammatical?",
    options: [
      "Because 'know' is a stative verb that resists continuous aspect in both present and past perfect tenses ('had known').",
      "Because 'years' cannot take 'for'.",
      "Because 'met' should be 'meet'.",
      "Because 'before' requires Future Tense."
    ],
    correctAnswer: 0,
    explanation: "Stative verb 'know' must fall back to Past Perfect ('had known').",
    explanationBn: "'Know' একটি Stative Verb, তাই 'had known' হবে।"
  },
  {
    id: 19,
    question: "Complete the sentence: 'The detective was convinced that the suspect ______ stories throughout the interrogation.'",
    options: [
      "had been fabricating",
      "fabricated",
      "has been fabricating",
      "is fabricating"
    ],
    correctAnswer: 0,
    explanation: "Ongoing deception over the interrogation span: 'had been fabricating'.",
    explanationBn: "জেরা চলাকালীন সময় ধরে মিথ্যা গল্প বানিয়ে চলায় 'had been fabricating' সঠিক।"
  },
  {
    id: 20,
    question: "Spot the error: 'At the time of the merger, the firm was operating (A) at a severe loss (B) for eighteen months (C).'",
    options: [
      "was operating (A)",
      "at a severe loss (B)",
      "for eighteen months (C)",
      "No error"
    ],
    correctAnswer: 0,
    explanation: "With duration 'for eighteen months' up to the past merger, use 'had been operating' rather than 'was operating'.",
    explanationBn: "১৮ মাসের সময়কালের কারণে 'was operating'-এর বদলে 'had been operating' হবে।"
  },
  {
    id: 21,
    question: "Fill in the blank: 'The children ______ sandcastles on the beach for hours before the high tide washed them away.'",
    options: [
      "had been building",
      "were building",
      "built",
      "have built"
    ],
    correctAnswer: 0,
    explanation: "Hours of sandcastle building prior to high tide: 'had been building'.",
    explanationBn: "জোয়ার আসার পূর্বের কয়েক ঘণ্টার বালিঘর তৈরিতে 'had been building' বসবে।"
  },
  {
    id: 22,
    question: "Choose the correct interrogative form:",
    options: [
      "Had she been complaining of migraines before she visited the neurologist?",
      "Was she complaining of migraines for months before?",
      "Did she been complaining of migraines?",
      "Has she had been complaining?"
    ],
    correctAnswer: 0,
    explanation: "'Had she been complaining...?' correctly structures the question.",
    explanationBn: "'Had she been complaining...?' হলো সঠিক প্রশ্নবোধক রূপ।"
  },
  {
    id: 23,
    question: "Fill in the blank: 'We ______ in that tranquil village for seven years before the industrial zone was established.'",
    options: [
      "had been living",
      "were living",
      "lived",
      "have lived"
    ],
    correctAnswer: 0,
    explanation: "7 years of continuous village life prior to industrialization: 'had been living'.",
    explanationBn: "শিল্প এলাকা প্রতিষ্ঠার পূর্বের ৭ বছরের বসবাসের জন্য 'had been living' সঠিক।"
  },
  {
    id: 24,
    question: "Transform into Past Perfect Continuous: 'He worked on the code for five hours. Then he took a break.'",
    options: [
      "He had been working on the code for five hours before he took a break.",
      "He was working on the code for five hours after he took a break.",
      "He had worked on the code before he has taken a break.",
      "He worked on code when he had been taking a break."
    ],
    correctAnswer: 0,
    explanation: "'He had been working on the code for five hours before he took a break' perfectly captures the duration and milestone.",
    explanationBn: "'He had been working... for five hours before he took a break' হলো সঠিক রূপান্তর।"
  },
  {
    id: 25,
    question: "What is the primary diagnostic indicator that demands Past Perfect Continuous?",
    options: [
      "An action ongoing over a measured duration (since/for) up to a designated past milestone or leaving vivid past evidence.",
      "A completed action in 1947.",
      "An action happening right now.",
      "A general universal scientific law."
    ],
    correctAnswer: 0,
    explanation: "The hallmark of Past Perfect Continuous is duration (since/for) leading up to a past milestone or explaining a past physical state.",
    explanationBn: "অতীতের কোনো নির্দিষ্ট মুহূর্তের পূর্ব পর্যন্ত কোনো কাজের সময়কাল (since/for) বা শারীরিক প্রমাণ থাকাই Past Perfect Continuous-এর প্রধান লক্ষণ।"
  }
];

export default questions;
