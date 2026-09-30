const questions = [
  {
    id: "q1",
    question: "Why is 'I have met him yesterday' grammatically incorrect in standard English?",
    options: [
      "Because 'yesterday' is a future time marker.",
      "Because the Present Perfect tense CANNOT be paired with a specific, finished past time adverb (like 'yesterday', 'ago', 'last night', 'in 2010').",
      "Because 'met' should be 'meet'.",
      "Because 'have' should be 'had' only."
    ],
    correctAnswer: 1,
    explanation: "Present Perfect links past actions to the present moment. Once a definite completed past time anchor ('yesterday', 'two days ago', 'last year') is specified, the Simple Past tense ('I met him yesterday') MUST be used.",
    explanationBn: "নির্দিষ্ট অতীত সময় নির্দেশক শব্দ (yesterday, ago, last night) থাকলে Present Perfect Tense ব্যবহার করা ভুল; তখন Simple Past Tense ('I met him yesterday') ব্যবহার করতে হয়।"
  },
  {
    id: "q2",
    question: "Choose the correct sentence to express an action that started in the past and is still continuing:",
    options: [
      "I am living in Kolkata since five years.",
      "I have been living in Kolkata for five years.",
      "I am living in Kolkata for five years.",
      "I live in Kolkata since five years."
    ],
    correctAnswer: 1,
    explanation: "An action begun in the past and continuing into the present requires the Present Perfect Continuous tense ('have been living') paired with 'for' to denote a duration of time ('for five years').",
    explanationBn: "অতীত থেকে শুরু হয়ে বর্তমান পর্যন্ত চলছে এমন সময় বোঝাতে Present Perfect Continuous ('have been living') এবং সময়ের ব্যাপ্তি বোঝাতে 'for' বসে।"
  },
  {
    id: "q3",
    question: "What is the distinction between 'since' and 'for' in perfect continuous tenses?",
    options: [
      "'Since' is used for a specific starting point of time (e.g. since 2015, since Monday); 'For' is used for a period/duration of time (e.g. for 5 years, for 3 hours).",
      "'Since' is used for duration; 'For' is used for starting point.",
      "Both can be used interchangeably in all situations.",
      "'Since' is only used in past tense; 'For' is only used in future tense."
    ],
    correctAnswer: 0,
    explanation: "'Since' marks a point in time (Since 9 AM, Since childhood). 'For' measures total elapsed duration (For two hours, For ten days).",
    explanationBn: "'Since' নির্দিষ্ট সূচনা বিন্দু (Point of Time: 2015, Monday, morning) বোঝায়; আর 'For' সময়ের মোট ব্যাপ্তি (Period of Time: 5 years, 3 hours) বোঝায়।"
  },
  {
    id: "q4",
    question: "Which of the following sentences correctly uses 'since'?",
    options: [
      "She has been studying since three hours.",
      "She has been studying since 8 AM.",
      "She has been studying for 8 AM.",
      "She is studying since morning."
    ],
    correctAnswer: 1,
    explanation: "'8 AM' is a specific point of time on the clock, correctly taking 'since' with the Present Perfect Continuous tense.",
    explanationBn: "'8 AM' একটি সুনির্দিষ্ট সময় বিন্দু হওয়ায় এর পূর্বে 'since' বসবে: 'has been studying since 8 AM'।"
  },
  {
    id: "q5",
    question: "Identify the communicative function of the Simple Present tense in: 'Water boils at 100 degrees Celsius.'",
    options: [
      "Habitual routine",
      "Universal scientific truth / Invariable law of nature",
      "Dramatic commentary",
      "Timetabled future event"
    ],
    correctAnswer: 1,
    explanation: "Universal truths, scientific facts, and timeless natural laws are always expressed in the Simple Present tense.",
    explanationBn: "চিরন্তন সত্য ও বৈজ্ঞানিক নিয়ম সর্বদাই Simple Present Tense-এ প্রকাশিত হয়।"
  },
  {
    id: "q6",
    question: "In conditional clauses referring to future time ('If it rains tomorrow, we will stay indoors'), what tense is used in the subordinate 'if' clause?",
    options: [
      "Simple Future ('If it will rain')",
      "Simple Present ('If it rains')",
      "Present Continuous ('If it is raining')",
      "Future Perfect ('If it will have rained')"
    ],
    correctAnswer: 1,
    explanation: "Subordinate clauses of time and condition (introduced by if, unless, when, as soon as, before) cannot use 'will/shall'; they take the Simple Present tense to express future contingencies.",
    explanationBn: "ভবিষ্যত শর্তমূলক 'If' বা 'When' যুক্ত Subordinate Clause-এ 'will' বসে না, তার পরিবর্তে Simple Present Tense ('If it rains') বসে।"
  },
  {
    id: "q7",
    question: "Choose the correct sentence to express annoyance at a repeated bad habit using Present Continuous:",
    options: [
      "He always loses his keys.",
      "He is always losing his keys!",
      "He has always lost his keys.",
      "He was always losing his keys."
    ],
    correctAnswer: 1,
    explanation: "The Present Continuous paired with 'always', 'continually', or 'constantly' expresses speaker irritation or annoyance at an obstinate habitual action.",
    explanationBn: "কোনো বিরক্তিকর অভ্যাসগত আচরণের তীব্রতা বা ক্ষোভ প্রকাশ করতে Present Continuous-এর সাথে 'always' ব্যবহার করা হয় ('He is always losing his keys!')।"
  },
  {
    id: "q8",
    question: "Which of the following time markers is typically paired with the Present Perfect tense in negative sentences and questions?",
    options: [
      "Yesterday",
      "Ago",
      "Yet",
      "Tomorrow"
    ],
    correctAnswer: 2,
    explanation: "'Yet' is placed at the end of negative statements and questions in the Present Perfect tense to mean 'up to this moment' (e.g. 'I have not finished yet', 'Has the train arrived yet?').",
    explanationBn: "'Yet' শব্দটিকে Present Perfect Tense-এর না-বোধক ও প্রশ্নবোধক বাক্যের শেষে ব্যবহার করা হয় ('I have not finished yet')।"
  },
  {
    id: "q9",
    question: "What is the difference between 'He has gone to London' and 'He has been to London'?",
    options: [
      "'Has gone' means he is currently in London or on his way there (has not returned); 'Has been' means he visited London in the past and has now returned.",
      "'Has gone' means he returned; 'Has been' means he is still there.",
      "Both mean he is currently in London.",
      "Both mean he has never visited London."
    ],
    correctAnswer: 0,
    explanation: "'Has gone to' indicates unfinished journey/absence (he is still there). 'Has been to' indicates a completed round-trip life experience.",
    explanationBn: "'Has gone to London' অর্থ সে লন্ডনে গেছে এবং এখনো ফেরেনি; আর 'Has been to London' অর্থ সে অতীতে লন্ডন ভ্রমণ করেছে এবং ফিরে এসেছে।"
  },
  {
    id: "q10",
    question: "Complete the sentence: 'The train _______ at 6:30 PM according to the official schedule.'",
    options: [
      "is going to leave",
      "leaves",
      "will be leaving",
      "has left"
    ],
    correctAnswer: 1,
    explanation: "Fixed official timetables and programmed itineraries use the Simple Present tense for future events ('The train leaves at 6:30 PM').",
    explanationBn: "অফিসিয়াল সময়সূচি বা নির্ধারিত ভবিষ্যৎ কর্মসূচির ক্ষেত্রে Simple Present Tense ('leaves') ব্যবহৃত হয়।"
  },
  {
    id: "q11",
    question: "Identify the correct verb form: 'I _______ this interesting novel since yesterday morning.'",
    options: [
      "am reading",
      "have been reading",
      "read",
      "was reading"
    ],
    correctAnswer: 1,
    explanation: "Action starting in the past with 'since yesterday morning' and still in progress requires the Present Perfect Continuous: 'have been reading'.",
    explanationBn: "'Since yesterday morning' থাকায় ক্রিয়াটি Present Perfect Continuous ('have been reading') হবে।"
  },
  {
    id: "q12",
    question: "Choose the correct sentence regarding a completed action with present evidence:",
    options: [
      "She is exhausted because she has been running.",
      "She is exhausted because she runs.",
      "She is exhausted because she will run.",
      "She is exhausted because she had run."
    ],
    correctAnswer: 0,
    explanation: "Present Perfect Continuous ('has been running') explains a present state/visible evidence resulting from a recently ceased physical activity.",
    explanationBn: "বর্তমানের দৃশ্যমান ক্লান্তির কারণ হিসেবে সদ্য শেষ হওয়া ধারাবাহিক ক্রিয়া প্রকাশে Present Perfect Continuous ('has been running') বসে।"
  },
  {
    id: "q13",
    question: "Select the correct option: 'As soon as the principal _______, the ceremony will commence.'",
    options: [
      "will arrive",
      "arrives",
      "is arriving",
      "shall arrive"
    ],
    correctAnswer: 1,
    explanation: "In time clauses introduced by 'as soon as', the Simple Present ('arrives') is used instead of future auxiliaries.",
    explanationBn: "'As soon as' যুক্ত সময়সূচক বাক্যাংশে 'will arrive'-এর বদলে Simple Present 'arrives' বসবে।"
  },
  {
    id: "q14",
    question: "Identify the error in: 'She has graduated from Oxford University in 2018.'",
    options: [
      "'in 2018' is wrong.",
      "'has graduated' should be 'graduated' because 'in 2018' is a finished past time anchor.",
      "'from' should be 'at'.",
      "'Oxford' should be lowercase."
    ],
    correctAnswer: 1,
    explanation: "A specific finished historical year ('in 2018') requires Simple Past ('She graduated...'), not Present Perfect.",
    explanationBn: "নির্দিষ্ট অতীত সন ('in 2018') উল্লেখ থাকায় Present Perfect-এর বদলে Simple Past 'graduated' হবে।"
  },
  {
    id: "q15",
    question: "Which tense is used to introduce quotations from famous authors/thinkers? (e.g. 'Keats _______: A thing of beauty is a joy forever')",
    options: [
      "said",
      "says",
      "was saying",
      "has said"
    ],
    correctAnswer: 1,
    explanation: "Literary and philosophical quotations are traditionally introduced using the Simple Present tense ('Keats says: ...', 'Shakespeare writes: ...').",
    explanationBn: "বিখ্যাত লেখকদের অমর উক্তি উদ্ধৃত করার সময় ঐতিহ্যগতভাবে Simple Present Tense ('Keats says') ব্যবহৃত হয়।"
  },
  {
    id: "q16",
    question: "Complete the sentence: 'We _______ each other since our school days.'",
    options: [
      "are knowing",
      "have known",
      "have been knowing",
      "know"
    ],
    correctAnswer: 1,
    explanation: "Because 'know' is a stative verb, it cannot be used in continuous form ('have been knowing' is incorrect). The Present Perfect simple 'have known' is used with 'since'.",
    explanationBn: "'Know' একটি Stative Verb হওয়ায় Continuous হতে পারে না; 'since'-এর সাথে Present Perfect Simple ('have known') ব্যবহৃত হবে।"
  },
  {
    id: "q17",
    question: "Choose the correct sentence to express an ongoing temporary situation (not a permanent state):",
    options: [
      "I live with my uncle until I find a flat.",
      "I am living with my uncle until I find a flat.",
      "I have lived with my uncle until I find a flat.",
      "I was living with my uncle until I find a flat."
    ],
    correctAnswer: 1,
    explanation: "The Present Continuous tense ('am living') is used for temporary situations around the present time, whereas Simple Present ('live') denotes a permanent residence.",
    explanationBn: "অস্থায়ী বাসস্থান বা পরিস্থিতি বোঝাতে Present Continuous ('am living') ব্যবহৃত হয়।"
  },
  {
    id: "q18",
    question: "Fill in the blank: 'I _______ three cups of coffee this morning (and the morning is not over yet).'",
    options: [
      "drank",
      "have drunk",
      "am drinking",
      "drink"
    ],
    correctAnswer: 1,
    explanation: "When referring to an unfinished time period that includes the present moment ('this morning' while it is still morning), use Present Perfect: 'have drunk'.",
    explanationBn: "সময়কালটি যদি এখনো চলমান থাকে (সকাল এখনো শেষ হয়নি), তবে Present Perfect 'have drunk' ব্যবহার করতে হয়।"
  },
  {
    id: "q19",
    question: "Now choose for: 'I _______ three cups of coffee this morning (and it is now 4 PM in the afternoon).'",
    options: [
      "drank",
      "have drunk",
      "am drinking",
      "drink"
    ],
    correctAnswer: 0,
    explanation: "Because 'this morning' is now a finished past period in the afternoon, Simple Past 'drank' is required.",
    explanationBn: "যেহেতু এখন বিকেল ৪টে এবং সকাল শেষ হয়ে গেছে, তাই Simple Past 'drank' সঠিক রূপ।"
  },
  {
    id: "q20",
    question: "Which of the following questions is correctly framed to ask about life experience?",
    options: [
      "Did you ever see a tiger?",
      "Have you ever seen a tiger?",
      "Are you ever seeing a tiger?",
      "Had you ever seen a tiger?"
    ],
    correctAnswer: 1,
    explanation: "To inquire about life experiences at any indefinite point up to now, the standard construction is 'Have you ever + V3?'",
    explanationBn: "জীবনের সামগ্রিক অভিজ্ঞতা জানতে 'Have you ever + V3' ('Have you ever seen...?') ব্যবহৃত হয়।"
  },
  {
    id: "q21",
    question: "Complete the sentence: 'It is the first time I _______ such a magnificent monument.'",
    options: [
      "see",
      "am seeing",
      "have seen",
      "saw"
    ],
    correctAnswer: 2,
    explanation: "After phrases like 'It is the first / second / only time...', English syntax requires the Present Perfect tense ('have seen').",
    explanationBn: "'It is the first time...'-এর পর সর্বদা Present Perfect Tense ('have seen') বসে।"
  },
  {
    id: "q22",
    question: "What is the time marker 'just' used for in the Present Perfect tense?",
    options: [
      "For actions that happened years ago.",
      "For actions completed a very short time / moments before the present.",
      "For future plans.",
      "For permanent truths."
    ],
    correctAnswer: 1,
    explanation: "'Just' indicates an immediate recent completion moments before speech: 'I have just received the email'.",
    explanationBn: "'Just' কথাটি বর্তমান মুহূর্তের ঠিক সামান্য কিছুক্ষণ পূর্বে সম্পন্ন কাজকে নির্দেশ করে ('have just received')।"
  },
  {
    id: "q23",
    question: "Select the correct sentence:",
    options: [
      "He is having a headache since 2 hours.",
      "He has had a headache for two hours.",
      "He has a headache since two hours.",
      "He was having a headache for two hours."
    ],
    correctAnswer: 1,
    explanation: "'Have a headache' is stative and cannot be 'is having'. With duration 'for two hours', the Present Perfect simple 'has had' is used.",
    explanationBn: "'Have a headache' Stative হওয়ায় Continuous হয় না; 'for two hours'-এর কারণে Present Perfect Simple 'has had' সঠিক।"
  },
  {
    id: "q24",
    question: "Identify the aspect of the verb in: 'The researchers are conducting an experiment.'",
    options: [
      "Simple Aspect",
      "Progressive / Continuous Aspect",
      "Perfect Aspect",
      "Perfect Continuous Aspect"
    ],
    correctAnswer: 1,
    explanation: "'Be (are) + V-ing (conducting)' is the Progressive (Continuous) aspect showing ongoing action in present time.",
    explanationBn: "'Are conducting' হলো Present Continuous বা Progressive Aspect।"
  },
  {
    id: "q25",
    question: "Why is 'The sun has risen at 6 AM today' (spoken at noon) often corrected to 'The sun rose at 6 AM today'?",
    options: [
      "Because 'at 6 AM' is a precise completed point of time in the past, triggering Simple Past.",
      "Because the sun never rises at 6 AM.",
      "Because 'has risen' is passive.",
      "Because 'today' is invalid."
    ],
    correctAnswer: 0,
    explanation: "The specific time anchor 'at 6 AM' isolates the event at a finished past point, requiring the Simple Past ('rose').",
    explanationBn: "'at 6 AM' একটি সুনির্দিষ্ট অতীত সময় বিন্দু নির্দেশ করায় Simple Past 'rose' হবে।"
  }
];

export default questions;
