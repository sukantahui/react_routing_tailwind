const questions = [
  {
    id: "q1",
    question: "What are the 4 invariant grammatical properties of true Modal Auxiliaries in English?",
    options: [
      "They take -s in 3rd person singular, require do-support, take gerunds, and have past participles.",
      "They never take -s for 3rd person singular, are followed by bare infinitives (no 'to'), form negatives/questions without 'do', and have no infinitive or participle forms.",
      "They always take 'to' before the main verb.",
      "They can only be used in the past tense."
    ],
    correctAnswer: 1,
    explanation: "True modals (can, could, may, might, shall, should, will, would, must) take no -s ending, take bare infinitives ('He must go', not 'must to go'), lack non-finite forms, and don't need 'do' for questions/negatives.",
    explanationBn: "Modal Auxiliaries-এর ৪টি অনন্য বৈশিষ্ট্য: ৩য় পুরুষে '-s' হয় না, মূল Verb-এর পূর্বে 'to' বসে না (Bare Infinitive), 'do' ছাড়া প্রশ্ন/না-বোধক হয়, এবং কোনো Participle রূপ নেই।"
  },
  {
    id: "q2",
    question: "Choose the correct sentence expressing a 100% logical POSITIVE DEDUCTION based on evidence: 'His car is outside and the lights are on. He _______ be at home.'",
    options: [
      "can",
      "might",
      "must",
      "should"
    ],
    correctAnswer: 2,
    explanation: "'Must' expresses logical positive certainty/deduction based on conclusive evidence ('He must be at home').",
    explanationBn: "প্রমাণের ভিত্তিতে শতভাগ নিশ্চিত অনুমান প্রকাশ করতে Modal 'must' ব্যবহৃত হয় ('He must be at home')।"
  },
  {
    id: "q3",
    question: "Now choose for a logical NEGATIVE DEDUCTION: 'He only left five minutes ago. He _______ be in Delhi already.'",
    options: [
      "must not",
      "can't",
      "might not",
      "should not"
    ],
    correctAnswer: 1,
    explanation: "The negative equivalent of deduction 'must be' is 'CAN'T BE' (logical impossibility). 'Must not' expresses prohibition, NOT negative deduction.",
    explanationBn: "যৌক্তিক অসম্ভবতা বা নেতিবাচক নিশ্চিত অনুমান প্রকাশে 'can't be' বসে ('must not' কেবল নিষেধ বোঝায়)।"
  },
  {
    id: "q4",
    question: "What is the crucial difference between 'needn't have done' and 'didn't need to do'?",
    options: [
      "'Needn't have done' means the action WAS PERFORMED, but in hindsight it was unnecessary; 'Didn't need to do' means the action WAS NOT PERFORMED because it was known to be unnecessary.",
      "'Needn't have done' means it was not done.",
      "Both mean the action was performed with necessity.",
      "There is no difference in modern British English."
    ],
    correctAnswer: 0,
    explanation: "'I needn't have bought the book' (I bought it, but later discovered it was already in the library). 'I didn't need to buy the book' (I knew it was in the library, so I didn't buy it).",
    explanationBn: "'Needn't have done' অর্থ কাজটি অপ্রয়োজনে করা হয়েছিল; আর 'didn't need to do' অর্থ অপ্রয়োজনীয় জেনে কাজটি করাই হয়নি।"
  },
  {
    id: "q5",
    question: "Complete the sentence to express a PAST REGRET / unfulfilled moral duty: 'You _______ the truth when the police questioned you.'",
    options: [
      "must tell",
      "should have told",
      "might tell",
      "could tell"
    ],
    correctAnswer: 1,
    explanation: "'Should have + V3' expresses past obligation or advice that was NOT fulfilled (a past regret/criticism).",
    explanationBn: "অতীতে কোনো কাজ করা উচিত ছিল কিন্তু করা হয়নি (আক্ষেপ/কর্তব্যচ্যুতি) বোঝাতে 'should have + V3' ('should have told') বসে।"
  },
  {
    id: "q6",
    question: "Identify the semi-modal verb used correctly in a negative modal construction:",
    options: [
      "You dare not to touch that live wire.",
      "You dare not touch that live wire.",
      "You don't dare touch not.",
      "You dare not touching."
    ],
    correctAnswer: 1,
    explanation: "When 'dare' functions as a modal in negative sentences ('dare not'), it is followed by a BARE infinitive without 'to': 'You dare not touch...'.",
    explanationBn: "'Dare not' যখন Modal হিসেবে বসে, তখন এর পর 'to' ছাড়া Bare Infinitive ('touch') বসে।"
  },
  {
    id: "q7",
    question: "Which of the following sentences correctly uses 'had better' for a strong warning with a potential negative consequence?",
    options: [
      "You had better to leave now or you will miss the train.",
      "You had better leave now or you will miss the train.",
      "You have better leave now.",
      "You had better leaving now."
    ],
    correctAnswer: 1,
    explanation: "'Had better' is an idiomatic modal structure that MUST be followed by a BARE infinitive (no 'to'): 'You had better leave now'.",
    explanationBn: "'Had better'-এর পর সর্বদা Bare Infinitive (to ছাড়া) বসে: 'You had better leave now'।"
  },
  {
    id: "q8",
    question: "Choose the correct modal to ask for formal permission from a senior or professor:",
    options: [
      "Can I submit my assignment tomorrow, sir?",
      "May I submit my assignment tomorrow, sir?",
      "Shall I submit my assignment tomorrow, sir?",
      "Will I submit my assignment tomorrow, sir?"
    ],
    correctAnswer: 1,
    explanation: "'May' is the standard polite and formal modal for asking permission in academic and professional settings.",
    explanationBn: "শিক্ষক বা ঊর্ধ্বতন কর্তৃপক্ষের কাছে মার্জিত ও আনুষ্ঠানিক অনুমতি চাইতে 'May I...?' ব্যবহৃত হয়।"
  },
  {
    id: "q9",
    question: "What degree of possibility is typically conveyed by 'might' compared to 'may'?",
    options: [
      "'Might' conveys a weaker, more remote, or tentative possibility (around 30%) than 'may' (around 50%).",
      "'Might' expresses 100% certainty.",
      "'Might' is strictly impossible.",
      "Both convey identical certainty."
    ],
    correctAnswer: 0,
    explanation: "'It may rain' = realistic possibility (50%). 'It might rain' = remote / weaker possibility (30%).",
    explanationBn: "'May' স্বাভাবিক সম্ভাবনা (৫০%) প্রকাশ করে; আর 'Might' ক্ষীণতর বা দূরবর্তী সম্ভাবনা (৩০%) নির্দেশ করে।"
  },
  {
    id: "q10",
    question: "Complete the sentence to describe a past ability in a SPECIFIC single challenging situation (achievement): 'Although the sea was rough, he _______ reach the shore safely.'",
    options: [
      "could",
      "was able to",
      "can",
      "might"
    ],
    correctAnswer: 1,
    explanation: "For a specific past achievement/success in a difficult situation, use 'was/were able to' or 'managed to', NOT 'could' ('could' denotes general permanent past ability).",
    explanationBn: "অতীতের কোনো সংকটময় মুহূর্তে নির্দিষ্ট সাফল্য বা সক্ষমতা প্রকাশে 'was able to' বসে ('could' কেবল সাধারণ অতীতের দক্ষতা বোঝায়)।"
  },
  {
    id: "q11",
    question: "Identify the modal of PAST DEDUCTION in: 'The streets are soaking wet. It _______ heavily last night.'",
    options: [
      "must rain",
      "must have rained",
      "should rain",
      "could rain"
    ],
    correctAnswer: 1,
    explanation: "'Must have + V3' (must have rained) expresses a logical deduction about a past event based on current visible evidence.",
    explanationBn: "অতীতের ঘটনা সম্পর্কে নিশ্চিত অনুমান প্রকাশে 'must have + V3' ('must have rained') বসে।"
  },
  {
    id: "q12",
    question: "What is the difference between 'must' and 'have to' regarding obligation?",
    options: [
      "'Must' expresses internal obligation arising from the speaker's own belief/will; 'Have to' expresses external obligation imposed by rules, laws, or circumstances.",
      "'Must' is for past only; 'Have to' is for future only.",
      "Both express identical external rules.",
      "'Have to' is a pure noun."
    ],
    correctAnswer: 0,
    explanation: "'I must stop eating junk food' (internal decision). 'I have to wear a seatbelt while driving' (external legal requirement).",
    explanationBn: "'Must' বক্তার নিজস্ব অনুভূতি বা অভ্যন্তরীণ তাগিদ প্রকাশ করে; আর 'Have to' বাহ্যিক নিয়মকানুন বা আইনের বাধ্যবাধকতা প্রকাশ করে।"
  },
  {
    id: "q13",
    question: "Select the sentence where 'need' is used as an ORDINARY MAIN VERB (not a modal):",
    options: [
      "You need not attend the lecture.",
      "He needs to consult an experienced lawyer.",
      "Need we submit the project today?",
      "They need not worry."
    ],
    correctAnswer: 1,
    explanation: "In 'He needs to consult', 'needs' takes the 3rd person singular '-s' and a full to-infinitive ('to consult'), functioning as a regular main lexical verb.",
    explanationBn: "'He needs to consult'-এ 'needs' মূল Verb হিসেবে '-s' এবং 'to-infinitive' গ্রহণ করেছে।"
  },
  {
    id: "q14",
    question: "Which sentence correctly uses 'ought to' to express moral obligation?",
    options: [
      "We ought obey our elders.",
      "We ought to respect our national heritage.",
      "We ought to respecting our teachers.",
      "We ought have respected."
    ],
    correctAnswer: 1,
    explanation: "'Ought' is the only modal auxiliary that is inherently followed by a TO-INFINITIVE: 'We ought to respect...'.",
    explanationBn: "'Ought' একমাত্র Modal Auxiliary যার পর 'to-infinitive' বসা বাধ্যতামূলক ('ought to respect')।"
  },
  {
    id: "q15",
    question: "What does 'You could have helped him' mean?",
    options: [
      "You helped him gladly.",
      "You had the ability/opportunity to help him in the past, but you chose NOT to do so.",
      "You are helping him currently.",
      "You will help him tomorrow."
    ],
    correctAnswer: 1,
    explanation: "'Could have + V3' indicates past capability or opportunity that was not utilized.",
    explanationBn: "'Could have helped' অর্থ অতীতে সাহায্য করার সামর্থ্য বা সুযোগ থাকা সত্ত্বেও সাহায্য করা হয়নি।"
  },
  {
    id: "q16",
    question: "Choose the correct sentence to express PROHIBITION (forbidden by rule):",
    options: [
      "You don't have to smoke here.",
      "You must not smoke here.",
      "You needn't smoke here.",
      "You might not smoke here."
    ],
    correctAnswer: 1,
    explanation: "'Must not' denotes absolute prohibition (not allowed). ('Don't have to' merely means lack of obligation/optional).",
    explanationBn: "'Must not' কঠোর নিষেধ (Prohibition) প্রকাশ করে; 'don't have to' কেবল ঐচ্ছিক কাজ বোঝায়।"
  },
  {
    id: "q17",
    question: "Complete the sentence: 'She _______ speak four languages fluently when she was just twelve.'",
    options: [
      "can",
      "could",
      "may",
      "might"
    ],
    correctAnswer: 1,
    explanation: "'Could' expresses general permanent past ability.",
    explanationBn: "অতীতের সাধারণ স্থায়ী দক্ষতা বা ক্ষমতা প্রকাশে 'could' বসে।"
  },
  {
    id: "q18",
    question: "Which of the following pairs is used to offer polite hospitality or assistance?",
    options: [
      "Must you have some coffee?",
      "Would you like some coffee?",
      "Shall you like some coffee?",
      "May you like some coffee?"
    ],
    correctAnswer: 1,
    explanation: "'Would you like...?' is the standard polite modal construction for offers and invitations.",
    explanationBn: "কাউকে ভদ্রভাবে কোনো প্রস্তাব বা আমন্ত্রণ জানাতে 'Would you like...?' ব্যবহৃত হয়।"
  },
  {
    id: "q19",
    question: "Identify the modal expressing a PAST ROUTINE / HABIT in: 'During summer vacations, my grandfather _______ take us to the riverbank every evening.'",
    options: [
      "would",
      "should",
      "must",
      "might"
    ],
    correctAnswer: 0,
    explanation: "'Would' is used to describe recurring, nostalgic past habitual actions (similar to 'used to').",
    explanationBn: "অতীতের নিয়মিত বা স্মৃতিবিজড়িত অভ্যাস প্রকাশে 'would' বসে।"
  },
  {
    id: "q20",
    question: "Correct the error: 'He can be able to solve this riddle.'",
    options: [
      "He can solve this riddle. (or: He is able to solve this riddle.)",
      "He could be able to solve.",
      "He must can solve.",
      "He is able to can solve."
    ],
    correctAnswer: 0,
    explanation: "'Can' and 'be able to' both mean ability; combining them ('can be able to') creates a redundant and grammatically incorrect double modal.",
    explanationBn: "'Can' এবং 'be able to' উভয়ই সক্ষমতা বোঝায়, এদের একসাথে ব্যবহার করা মারাত্মক ভুল। শুদ্ধ: 'He can solve' অথবা 'He is able to solve'।"
  },
  {
    id: "q21",
    question: "What does 'It can't be true' express?",
    options: [
      "Negative ability",
      "Strong negative deduction / disbelief (It is logically impossible)",
      "Polite refusal",
      "Moral duty"
    ],
    correctAnswer: 1,
    explanation: "'Can't be' conveys utter disbelief or logical impossibility.",
    explanationBn: "'Can't be true' যৌক্তিক অসম্ভবতা বা গভীর অবিশ্বাস প্রকাশ করে।"
  },
  {
    id: "q22",
    question: "Choose the correct sentence:",
    options: [
      "I used to living in Mumbai.",
      "I am used to living in Mumbai.",
      "I used to live in Mumbai and still do.",
      "I am used to live in Mumbai."
    ],
    correctAnswer: 1,
    explanation: "'Be used to + Gerund (-ing)' expresses being accustomed to something in the present: 'I am used to living in Mumbai'.",
    explanationBn: "'Be used to'-র পর Gerund (-ing) বসে বর্তমানের অভ্যাস বা অভিযোজন প্রকাশ করে: 'am used to living'।"
  },
  {
    id: "q23",
    question: "Complete the sentence with an appropriate semi-modal: 'How _______ you speak to me like that!'",
    options: [
      "need",
      "dare",
      "ought",
      "used"
    ],
    correctAnswer: 1,
    explanation: "'How dare you...!' is the classic modal idiom expressing indignation and challenge.",
    explanationBn: "সাহস বা ধৃষ্টতা প্রকাশে 'How dare you...!' ব্যবহৃত হয়।"
  },
  {
    id: "q24",
    question: "Select the sentence that correctly expresses LACK OF OBLIGATION (no necessity):",
    options: [
      "You mustn't wake up early tomorrow because it is Sunday.",
      "You don't have to wake up early tomorrow because it is Sunday.",
      "You can't wake up early tomorrow.",
      "You shouldn't wake up early tomorrow."
    ],
    correctAnswer: 1,
    explanation: "'Don't have to' / 'needn't' conveys that an action is optional and unnecessary. 'Mustn't' would mean waking up early is strictly forbidden!",
    explanationBn: "কোনো কাজের বাধ্যবাধকতা না থাকা (ঐচ্ছিক হওয়া) বোঝাতে 'don't have to' বা 'needn't' বসে।"
  },
  {
    id: "q25",
    question: "Identify the modal in: 'Shall I carry your heavy luggage for you?'",
    options: [
      "Shall (Offering assistance)",
      "carry",
      "heavy",
      "luggage"
    ],
    correctAnswer: 0,
    explanation: "'Shall I...?' is used with First Person to offer spontaneous assistance or service to another person.",
    explanationBn: "'Shall I...?' অপরকে সাহায্য করার ইচ্ছা বা প্রস্তাব প্রকাশে ব্যবহৃত হয়।"
  }
];

export default questions;
