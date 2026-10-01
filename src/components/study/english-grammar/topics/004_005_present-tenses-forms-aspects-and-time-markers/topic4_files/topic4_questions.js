const questions = [
  {
    id: 1,
    question: "Select the sentence where Present Perfect correctly conveys a direct present consequence:",
    options: [
      "I have lost my identity card (meaning: I do not possess it right now).",
      "I lost my identity card in 2020 but recovered it the next day.",
      "I was losing my identity card when I boarded the train.",
      "I will have lost my identity card soon."
    ],
    correctAnswer: 0,
    explanation: "'I have lost my identity card' connects the past event directly to the present reality: the card remains missing right now.",
    explanationBn: "'I have lost my identity card' বর্তমান ফলাফল প্রকাশ করে—কার্ডটি এখনো হারানো অবস্থায় আছে।"
  },
  {
    id: 2,
    question: "Where should the adverb 'already' be placed in a standard Present Perfect affirmative sentence?",
    options: [
      "At the very beginning before the subject.",
      "Between the auxiliary verb (have/has) and the main verb (V3).",
      "After the direct object only.",
      "Before the auxiliary verb always."
    ],
    correctAnswer: 1,
    explanation: "'Already' typically occupies the mid-position between auxiliary have/has and past participle V3 (e.g. 'She has already finished').",
    explanationBn: "'Already' সাধারণত have/has এবং মূল Verb-এর V3 রূপের মাঝে বসে (e.g. has already finished)।"
  },
  {
    id: 3,
    question: "Identify the correct usage of 'yet' in standard English:",
    options: [
      "He has yet finished the laboratory experiment.",
      "He has not finished the laboratory experiment yet.",
      "He finished not yet the laboratory experiment.",
      "He is yet not finishing the experiment."
    ],
    correctAnswer: 1,
    explanation: "'Yet' is placed at the end of negative sentences (and questions) to indicate an expected event hasn't happened up to now.",
    explanationBn: "'Yet' নেতিবাচক ও প্রশ্নবোধক বাক্যের শেষে বসে (has not finished... yet)।"
  },
  {
    id: 4,
    question: "Fill in the blank: '______ you ever ______ a total solar eclipse in your lifetime?'",
    options: [
      "Did; witnessed",
      "Have; witnessed",
      "Were; witnessing",
      "Do; witness"
    ],
    correctAnswer: 1,
    explanation: "Inquiring about life experience up to the present moment uses 'Have you ever + V3' ('Have you ever witnessed').",
    explanationBn: "জীবনের অভিজ্ঞতা জানতে 'Have you ever + V3' ব্যবহৃত হয়।"
  },
  {
    id: 5,
    question: "Spot the fatal tense violation:",
    options: [
      "The prime minister has inaugurated the science center today.",
      "The prime minister has inaugurated the science center two days ago.",
      "The prime minister inaugurated the science center two days ago.",
      "The prime minister will inaugurate the science center tomorrow."
    ],
    correctAnswer: 1,
    explanation: "Present Perfect ('has inaugurated') cannot co-occur with specific finished past time adverbs ('two days ago'). Simple Past is mandatory.",
    explanationBn: "নির্দিষ্ট অতীত সময় নির্দেশক 'two days ago'-এর সাথে কখনো Present Perfect হয় না।"
  },
  {
    id: 6,
    question: "Complete the sentence: 'Swadeep ______ three cups of espresso coffee this morning (and it is still 10:00 AM).'",
    options: [
      "drank",
      "has drunk",
      "is drinking",
      "had drunk"
    ],
    correctAnswer: 1,
    explanation: "Because 'this morning' is an unfinished time period at the moment of speaking (10:00 AM), Present Perfect ('has drunk') is appropriate.",
    explanationBn: "সকাল এখনো শেষ হয়নি (অসম্পূর্ণ সময়সীমা), তাই 'has drunk' সঠিক।"
  },
  {
    id: 7,
    question: "Which of the following sentences correctly uses 'just'?",
    options: [
      "The express train has just arrived on platform 1.",
      "The express train just has arrived on platform 1.",
      "The express train has arrived just now yesterday.",
      "The express train is just arrived."
    ],
    correctAnswer: 0,
    explanation: "'Just' (meaning a short moment ago) is placed between auxiliary 'has' and participle 'arrived'.",
    explanationBn: "'Has just arrived' হলো সঠিক ও প্রমিত বাক্য গঠন।"
  },
  {
    id: 8,
    question: "In the sentence 'We have reviewed fifty syntax rules so far', the phrase 'so far' means:",
    options: [
      "At a great geographical distance",
      "From the beginning up to the present moment",
      "In the distant future",
      "A long time ago in history"
    ],
    correctAnswer: 1,
    explanation: "'So far' (or 'up to now') marks the cumulative extent of an action from inception up to the present point.",
    explanationBn: "'So far' মানে শুরু থেকে বর্তমান সময় পর্যন্ত (up to the present moment)।"
  },
  {
    id: 9,
    question: "Choose the correct negative sentence:",
    options: [
      "I haven't never seen such a remarkable architectural monument.",
      "I have never seen such a remarkable architectural monument.",
      "I have not never saw such a monument.",
      "I didn't never see such a monument."
    ],
    correctAnswer: 1,
    explanation: "'Never' is already negative; double negation ('haven't never') is grammatically incorrect. 'I have never seen' is pristine.",
    explanationBn: "'Never' নিজেই নেতিবাচক, তাই ডাবল নেগেটিভ 'haven't never' ভুল; 'I have never seen' সঠিক।"
  },
  {
    id: 10,
    question: "Fill in the blank: 'Why are the streets so wet? — It ______ heavily.'",
    options: [
      "has rained",
      "rained yesterday",
      "was raining long ago",
      "had been rained"
    ],
    correctAnswer: 0,
    explanation: "The visible present evidence (wet streets) points to an action whose result is immediately apparent ('It has rained').",
    explanationBn: "রাস্তা ভেজা থাকা বর্তমান ফলাফল নির্দেশ করে, তাই 'It has rained' হবে।"
  },
  {
    id: 11,
    question: "Which question correctly asks about recent actions using 'lately'?",
    options: [
      "Have you seen Abhronila lately?",
      "Did you saw Abhronila lately?",
      "Were you seeing Abhronila lately?",
      "Do you see Abhronila lately?"
    ],
    correctAnswer: 0,
    explanation: "'Lately' pairs naturally with Present Perfect interrogatives ('Have you seen... lately?').",
    explanationBn: "'Lately' (সম্প্রতি) সহযোগে Present Perfect interrogative 'Have you seen...?' বসে।"
  },
  {
    id: 12,
    question: "Spot the error: 'I have already (A) submitted the manuscript (B) before three days (C).'",
    options: [
      "have already (A)",
      "submitted the manuscript (B)",
      "before three days (C)",
      "No error"
    ],
    correctAnswer: 2,
    explanation: "'Before three days' (or 'three days ago') is a past time anchor that clashes with Present Perfect. Say: 'I submitted the manuscript three days ago.'",
    explanationBn: "নির্দিষ্ট অতীত সময় নির্দেশক ফ্রেজ Present Perfect-এর সাথে বসতে পারে না।"
  },
  {
    id: 13,
    question: "Complete the sentence: 'This is the first time I ______ such a comprehensive grammar workbench.'",
    options: [
      "have used",
      "used",
      "am using",
      "had used"
    ],
    correctAnswer: 0,
    explanation: "Constructions like 'This is the first/second time...' take Present Perfect ('have used').",
    explanationBn: "'This is the first time...' কাঠামোর সাথে সর্বদা Present Perfect ('have used') বসে।"
  },
  {
    id: 14,
    question: "Identify the sentence where Present Perfect expresses an ongoing unfinished state with a stative verb:",
    options: [
      "I have known Professor Hui since my school days.",
      "I am knowing Professor Hui since 2018.",
      "I knew Professor Hui tomorrow.",
      "I have been knowing Professor Hui for years."
    ],
    correctAnswer: 0,
    explanation: "Stative verbs like 'know' cannot take Present Perfect Continuous; they express duration via Present Perfect: 'I have known him since...'",
    explanationBn: "Stative Verb 'know'-এর সাথে Continuous হয় না, তাই 'I have known... since' সঠিক।"
  },
  {
    id: 15,
    question: "Fill in the blank: 'The research committee ______ its final verdict on the grant application.'",
    options: [
      "has already announced",
      "have already announce",
      "is already announce",
      "did already announced"
    ],
    correctAnswer: 0,
    explanation: "Singular collective committee + has + already + V3 ('announced').",
    explanationBn: "'Committee has already announced' ব্যাকরণগতভাবে নিখুঁত।"
  },
  {
    id: 16,
    question: "Which of the following sentences correctly conveys that an action happened sooner than expected?",
    options: [
      "She has already solved all 25 diagnostic problems.",
      "She has yet solved all 25 diagnostic problems.",
      "She solved already yesterday.",
      "She has ever solved the problems."
    ],
    correctAnswer: 0,
    explanation: "'Already' emphasizes that the completion occurred earlier or sooner than anticipated.",
    explanationBn: "'Already' প্রত্যাশার চেয়ে দ্রুত কাজ সম্পন্ন হওয়া বোঝায়।"
  },
  {
    id: 17,
    question: "Transform into Present Perfect negative: 'He completed the assignment.'",
    options: [
      "He has not completed the assignment yet.",
      "He did not completed the assignment yet.",
      "He is not completed the assignment.",
      "He has not complete the assignment."
    ],
    correctAnswer: 0,
    explanation: "Subject + has not + V3 (completed) + ... yet.",
    explanationBn: "'He has not completed the assignment yet' হলো সঠিক রূপ।"
  },
  {
    id: 18,
    question: "Why is 'Shakespeare has written Hamlet' grammatically flawed in modern English?",
    options: [
      "Because Hamlet is a drama, not an essay.",
      "Because Shakespeare is dead (past author), so his life experience period is closed, requiring Simple Past ('Shakespeare wrote Hamlet').",
      "Because 'written' is spelled incorrectly.",
      "Because 'has' cannot accompany historical figures."
    ],
    correctAnswer: 1,
    explanation: "Since Shakespeare's life is a finished past period, actions during his life must use Simple Past ('wrote'). Present Perfect would imply Shakespeare is still alive and producing plays.",
    explanationBn: "শেক্সপিয়রের জীবনকাল শেষ হয়ে যাওয়ায় অতীত কাজ হিসেবে 'Shakespeare wrote Hamlet' হবে, 'has written' নয়।"
  },
  {
    id: 19,
    question: "Fill in the blank: 'Up to now, the team ______ any major technical impediments.'",
    options: [
      "has not encountered",
      "did not encounter yesterday",
      "is not encountered",
      "was not encountering"
    ],
    correctAnswer: 0,
    explanation: "'Up to now' specifies a timeframe extending to the present, requiring Present Perfect ('has not encountered').",
    explanationBn: "'Up to now' সময়সীমার সাথে Present Perfect বসে।"
  },
  {
    id: 20,
    question: "Choose the correct sentence regarding medical diagnosis:",
    options: [
      "The surgeon has successfully removed the appendix and the patient is recovering well.",
      "The surgeon removed successfully the appendix yesterday and patient has recovered today.",
      "The surgeon has been removing the appendix yesterday.",
      "The surgeon is removed the appendix just now."
    ],
    correctAnswer: 0,
    explanation: "The past operation has a direct present result: 'has successfully removed... and the patient is recovering'.",
    explanationBn: "অতীত অপারেশনের বর্তমান ফলাফল বোঝাতে 'has successfully removed' ব্যবহৃত হয়েছে।"
  },
  {
    id: 21,
    question: "Complete the sentence: 'Have you ______ to the new digital library at Barrackpore?'",
    options: [
      "ever been",
      "ever gone",
      "ever went",
      "ever be"
    ],
    correctAnswer: 0,
    explanation: "'Have you ever been to...' inquires if someone has visited and returned (life experience).",
    explanationBn: "কোথাও গিয়ে ফিরে আসার অভিজ্ঞতা জানতে 'Have you ever been to...?' বসে।"
  },
  {
    id: 22,
    question: "Identify the correct past participle form (V3) of the irregular verb 'choose':",
    options: [
      "chose",
      "chosen",
      "choosed",
      "choosen"
    ],
    correctAnswer: 1,
    explanation: "Conjugation: choose (V1) - chose (V2) - chosen (V3).",
    explanationBn: "'Choose'-এর Past Participle (V3) রূপ হলো 'chosen'।"
  },
  {
    id: 23,
    question: "Fill in the blank: 'I ______ my smartphone at home, so I cannot check the timetable right now.'",
    options: [
      "have left",
      "left yesterday",
      "was leaving",
      "had left"
    ],
    correctAnswer: 0,
    explanation: "Direct present consequence (cannot check now) mandates the Present Perfect ('have left').",
    explanationBn: "বর্তমানে ফোন দেখতে না পাওয়ার কারণ হিসেবে 'have left' সঠিক।"
  },
  {
    id: 24,
    question: "Select the sentence where 'already' is correctly positioned:",
    options: [
      "We have already verified the credentials of all candidates.",
      "We already have verified the credentials of all candidates yesterday.",
      "Already we verified credentials.",
      "We have verified already credentials."
    ],
    correctAnswer: 0,
    explanation: "'We have already verified...' reflects the standard mid-position adverb placement.",
    explanationBn: "'Have already verified' হলো মানসম্মত অবস্থান।"
  },
  {
    id: 25,
    question: "Which statement accurately encapsulates the Present Perfect tense?",
    options: [
      "It describes actions completed in a remote past with no connection to today.",
      "It serves as a syntactic bridge connecting an indefinite past event to its active relevance in the present.",
      "It is used only with specific calendar years.",
      "It is interchangeable with Past Continuous."
    ],
    correctAnswer: 1,
    explanation: "The Present Perfect is the grammatical bridge linking an indefinite past action to its active relevance and consequences in the present.",
    explanationBn: "Present Perfect অতীত ও বর্তমানের সংযোগকারী সেতু হিসেবে কাজ করে।"
  }
];

export default questions;
