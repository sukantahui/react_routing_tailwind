// topic0_questions.js - Module 007_001: Conjunctions, Coordination & Correlative Parallelism
// 25 High-Yield Diagnostic MCQs with Technical and Bengali Explanations

const questions = [
  {
    id: 1,
    question: "Select the sentence that strictly satisfies the Law of Parallelism with 'Not only... but also':",
    options: [
      "He not only lost his wallet but also his passport.",
      "He lost not only his wallet but also his passport.",
      "Not only he lost his wallet but also his passport.",
      "He lost his wallet not only but also his passport."
    ],
    correctAnswer: "He lost not only his wallet but also his passport.",
    explanation: "In parallel correlative structures, the elements following 'not only' and 'but also' must be identical grammatical constituents. Here, both 'his wallet' and 'his passport' are noun phrases functioning as direct objects of 'lost'.",
    explanationBn: "Correlative Conjunction (যেমন: not only... but also)-এর ক্ষেত্রে 'not only'-র পরে যে Part of Speech বসে, 'but also'-র পরেও হুবহু একই Part of Speech বসতে হবে। এখানে 'lost not only [Noun Phrase] but also [Noun Phrase]' সম্পূর্ণ সঠিক।"
  },
  {
    id: 2,
    question: "Which of the following sentences correctly uses the conjunction 'lest'?",
    options: [
      "Walk carefully lest you should not fall on the slippery road.",
      "Walk carefully lest you should fall on the slippery road.",
      "Walk carefully lest you will fall on the slippery road.",
      "Walk carefully lest you may not fall on the slippery road."
    ],
    correctAnswer: "Walk carefully lest you should fall on the slippery road.",
    explanation: "'Lest' inherently means 'for fear that' or 'so that...not' and is always followed by 'should' (or a bare subjunctive). It must NEVER be paired with 'not' or 'will/shall'.",
    explanationBn: "'Lest' শব্দের অর্থই হলো 'পাছে ঘটে / যাতে না ঘটে' (so that...not)। তাই 'lest'-এর সাথে কখনো 'not' বসে না এবং এরপরে সর্বদা 'should' বা Subjunctive বসে।"
  },
  {
    id: 3,
    question: "Identify the correctly punctuated compound sentence using a FANBOYS coordinating conjunction:",
    options: [
      "The storm knocked down the power lines and the entire city was plunged into darkness.",
      "The storm knocked down the power lines, and the entire city was plunged into darkness.",
      "The storm knocked down the power lines, and plunged the city into darkness.",
      "The storm knocked down the power lines and, the entire city was plunged into darkness."
    ],
    correctAnswer: "The storm knocked down the power lines, and the entire city was plunged into darkness.",
    explanation: "When a coordinating conjunction (FANBOYS) joins two independent clauses (each with its own subject and verb), a comma MUST precede the conjunction.",
    explanationBn: "যখন কোনো FANBOYS Conjunction দুটি স্বাধীন বাক্যকে (independent clauses) যুক্ত করে, তখন Conjunction-টির ঠিক আগে একটি কমা (comma) দিতে হয়।"
  },
  {
    id: 4,
    question: "Select the sentence with correct correlative pairing:",
    options: [
      "Scarcely had he entered the room than the lights went off.",
      "Scarcely had he entered the room when the lights went off.",
      "Scarcely had he entered the room then the lights went off.",
      "Scarcely had he entered the room while the lights went off."
    ],
    correctAnswer: "Scarcely had he entered the room when the lights went off.",
    explanation: "'Scarcely' and 'Hardly' strictly pair with 'when' (or 'before'). 'No sooner' strictly pairs with 'than'.",
    explanationBn: "'Scarcely' এবং 'Hardly'-র সাথে সর্বদা 'when' বসে; আর 'No sooner'-এর সাথে 'than' বসে।"
  },
  {
    id: 5,
    question: "Fill in the blank: 'No sooner did the bell ring ______ the students rushed out of the classroom.'",
    options: ["when", "then", "than", "before"],
    correctAnswer: "than",
    explanation: "'No sooner' contains the comparative form 'sooner' and therefore requires the correlative partner 'than'.",
    explanationBn: "'No sooner'-এ comparative রূপ 'sooner' থাকায় এর সাথে সর্বদা 'than' বসে (then বা when নয়)।"
  },
  {
    id: 6,
    question: "Choose the correct sentence using a conjunctive adverb with standard punctuation:",
    options: [
      "The demand was unusually high, however, the factory failed to increase supply.",
      "The demand was unusually high; however, the factory failed to increase supply.",
      "The demand was unusually high; however the factory failed to increase supply.",
      "The demand was unusually high, however; the factory failed to increase supply."
    ],
    correctAnswer: "The demand was unusually high; however, the factory failed to increase supply.",
    explanation: "When a conjunctive adverb (however, therefore, moreover, furthermore) links two independent clauses, it is preceded by a semicolon and followed by a comma.",
    explanationBn: "Conjunctive Adverb (যেমন: however, therefore, moreover) দুটি স্বাধীন বাক্যকে যুক্ত করলে তার পূর্বে Semicolon (;) এবং পরে Comma (,) বসে।"
  },
  {
    id: 7,
    question: "Select the sentence that violates parallelism:",
    options: [
      "She likes swimming, jogging, and reading.",
      "She likes to swim, to jog, and to read.",
      "She likes swimming, jogging, and to read novels.",
      "She likes to swim, jog, and read."
    ],
    correctAnswer: "She likes swimming, jogging, and to read novels.",
    explanation: "Mixing gerunds ('swimming', 'jogging') with an infinitive ('to read') in a coordinate series violates syntactic parallelism.",
    explanationBn: "একই তালিকায় Gerund (swimming, jogging) এবং Infinitive (to read) মিশিয়ে ব্যবহার করলে Parallelism লঙ্ঘিত হয়।"
  },
  {
    id: 8,
    question: "Fill in the blank: '______ you work with unwavering dedication, you will not qualify for the fellowship.'",
    options: ["If", "Unless", "Lest", "Although"],
    correctAnswer: "Unless",
    explanation: "'Unless' means 'if...not' and introduces a negative condition. Note: 'Unless' should not contain another negative word in its own clause.",
    explanationBn: "'Unless' অর্থ 'যদি না' (if not); এটি শর্তযুক্ত নেতিবাচক ভাব প্রকাশ করে।"
  },
  {
    id: 9,
    question: "Choose the sentence with correct correlative placement:",
    options: [
      "You can either have tea or coffee.",
      "You can have either tea or coffee.",
      "Either you can have tea or coffee.",
      "You either can have tea or coffee."
    ],
    correctAnswer: "You can have either tea or coffee.",
    explanation: "'Either tea or coffee' places 'either' before noun 1 and 'or' before noun 2, establishing flawless parallel coordination.",
    explanationBn: "'Either tea or coffee' বাক্যে 'either' ১ম Noun-এর আগে এবং 'or' ২য় Noun-এর আগে বসে নিখুঁত Parallelism বজায় রেখেছে।"
  },
  {
    id: 10,
    question: "Fill in the blank with the appropriate subordinating conjunction of concession: '______ he is extremely wealthy, he lives a remarkably modest and frugal life.'",
    options: ["Because", "Since", "Although", "Unless"],
    correctAnswer: "Although",
    explanation: "'Although' (or 'Though / Even though') introduces a subordinate clause of concession/contrast.",
    explanationBn: "স্বভাব বা পরিস্থিতির বৈপরীত্য (concession/contrast) বোঝাতে 'Although' বা 'Though' (যদিও) ব্যবহৃত হয়।"
  },
  {
    id: 11,
    question: "Identify the error in: 'Although he worked very hard, but he failed the exam.'",
    options: [
      "'worked' should be 'had worked'",
      "'but' is redundant and must be removed",
      "'Although' should be 'Because'",
      "'failed' should be 'did not pass'"
    ],
    correctAnswer: "'but' is redundant and must be removed",
    explanation: "In standard English, an 'Although' clause is paired with a comma or 'yet', NEVER with 'but'. Using 'although... but' is a classic double-conjunction error.",
    explanationBn: "'Although'-যুক্ত বাক্যে কখনো 'but' বসে না; শুধু কমা (,) অথবা 'yet' বসে। 'Although... but' একসাথে ব্যবহার করা মারাত্মক ভুল।"
  },
  {
    id: 12,
    question: "Fill in the blank: 'She spoke ______ she knew all the confidential secrets of the organization.'",
    options: ["as if", "as though", "as", "both A and B are correct"],
    correctAnswer: "both A and B are correct",
    explanation: "'As if' and 'as though' are interchangeable subordinating conjunctions of manner followed by the past subjunctive for counterfactual situations.",
    explanationBn: "'As if' এবং 'as though' (যেন) উভয়ই অবাস্তব অনুমানের ক্ষেত্রে সাবজাঙ্কটিভসহ ব্যবহার করা যায়।"
  },
  {
    id: 13,
    question: "Select the sentence where 'for' functions as a COORDINATING CONJUNCTION meaning 'because':",
    options: [
      "I bought this gift for my younger sister.",
      "He has lived in London for ten years.",
      "We must set out early, for the journey is long and hazardous.",
      "She asked for permission from the director."
    ],
    correctAnswer: "We must set out early, for the journey is long and hazardous.",
    explanation: "In 'for the journey is long...', 'for' is the first letter of the FANBOYS acronym, operating as a coordinating conjunction introducing a reason/explanation.",
    explanationBn: "FANBOYS-এর 'For' যখন কারণ দর্শায় (কারণ/যেহেতু), তখন তা Coordinating Conjunction হিসেবে কাজ করে।"
  },
  {
    id: 14,
    question: "Fill in the blank: 'He was neither willing to compromise ______ ready to negotiate.'",
    options: ["or", "nor", "and", "but"],
    correctAnswer: "nor",
    explanation: "'Neither' is always correlatively paired with 'nor' ('Neither... nor').",
    explanationBn: "'Neither'-এর সাথে সর্বদা 'nor' বসে ('Neither... nor')।"
  },
  {
    id: 15,
    question: "Choose the correct sentence regarding 'both... and':",
    options: [
      "He is both an accomplished pianist as well as a gifted painter.",
      "He is both an accomplished pianist and a gifted painter.",
      "He is both an accomplished pianist or a gifted painter.",
      "Both he is an accomplished pianist as well as a painter."
    ],
    correctAnswer: "He is both an accomplished pianist and a gifted painter.",
    explanation: "'Both' strictly pairs with 'and'. Pairing 'both... as well as' is a severe grammatical error.",
    explanationBn: "'Both'-এর সাথে সর্বদা 'and' বসে; 'both... as well as' ব্যবহার করা সম্পূর্ণ ভুল।"
  },
  {
    id: 16,
    question: "Fill in the blank: 'The flight was delayed ______ the dense fog enveloped the entire runway.'",
    options: ["because", "because of", "due to", "owing to"],
    correctAnswer: "because",
    explanation: "'Because' is a conjunction followed by a finite clause (Subject + Verb: 'dense fog enveloped'). 'Because of', 'due to', and 'owing to' are prepositions followed only by noun phrases.",
    explanationBn: "'Because' একটি Conjunction যার পরে পূর্ণাঙ্গ Clause (Subject + Verb) বসে; অপরপক্ষে 'because of/due to'-র পরে শুধু Noun Phrase বসে।"
  },
  {
    id: 17,
    question: "Select the sentence with correct parallel structure across infinitive phrases:",
    options: [
      "The mentor instructed us to plan meticulously, execute boldly, and to reflect daily.",
      "The mentor instructed us to plan meticulously, execute boldly, and reflect daily.",
      "The mentor instructed us planning meticulously, execute boldly, and to reflect daily.",
      "The mentor instructed us to plan meticulously, executing boldly, and reflect daily."
    ],
    correctAnswer: "The mentor instructed us to plan meticulously, execute boldly, and reflect daily.",
    explanation: "When a series of infinitives follows 'to', the particle 'to' can apply to all bare verbs in the coordinate list (to plan, execute, and reflect).",
    explanationBn: "তালিকার শুরুতে একবার 'to' দিয়ে বাকি Verb-গুলোকে Bare Infinitive হিসেবে রাখা নিখুঁত Parallelism।"
  },
  {
    id: 18,
    question: "Fill in the blank: 'He ran fast ______ he might catch the morning commuter train.'",
    options: ["in order that", "lest", "unless", "provided"],
    correctAnswer: "in order that",
    explanation: "'In order that' or 'so that' introduces a clause of purpose, commonly followed by modal auxiliaries (may/might, can/could).",
    explanationBn: "উদ্দেশ্য (purpose) প্রকাশ করতে 'in order that' বা 'so that' বসে (যাতে সে ট্রেনটি ধরতে পারে)।"
  },
  {
    id: 19,
    question: "Choose the correct sentence using 'Provided that':",
    options: [
      "You may borrow the camera provided that you return it undamaged by Monday.",
      "You may borrow the camera provided that you will return it undamaged.",
      "You may borrow the camera unless that you return it undamaged.",
      "You may borrow the camera lest you return it undamaged."
    ],
    correctAnswer: "You may borrow the camera provided that you return it undamaged by Monday.",
    explanation: "'Provided that' introduces a conditional clause ('on the condition that') and uses present tense for future conditions.",
    explanationBn: "'Provided that' অর্থ 'এই শর্তে যে' (on the condition that) এবং শর্তমূলক বাক্যের মতো Present Tense গ্রহণ করে।"
  },
  {
    id: 20,
    question: "Select the sentence that contains a COMMA SPLICE error:",
    options: [
      "The research is complete, the results are astonishing.",
      "The research is complete, and the results are astonishing.",
      "The research is complete; the results are astonishing.",
      "Because the research is complete, the results are astonishing."
    ],
    correctAnswer: "The research is complete, the results are astonishing.",
    explanation: "Joining two independent clauses with only a comma (without a coordinating conjunction or semicolon) is a classic 'Comma Splice' run-on error.",
    explanationBn: "দুটি স্বাধীন বাক্যকে কোনো Conjunction ছাড়া শুধু কমা দিয়ে জোড়া লাগালে তাকে 'Comma Splice' ভুল বলা হয়।"
  },
  {
    id: 21,
    question: "Fill in the blank: 'The agreement will stand ______ both parties agree in writing to terminate it.'",
    options: ["until", "since", "while", "as"],
    correctAnswer: "until",
    explanation: "'Until' denotes continuation in time up to a specific boundary event.",
    explanationBn: "কোনো সুনির্দিষ্ট সময় বা ঘটনা ঘটা পর্যন্ত অবিরাম চলা বোঝাতে 'until' বসে।"
  },
  {
    id: 22,
    question: "Identify the coordinating conjunction expressing contrast:",
    options: ["Yet", "So", "And", "For"],
    correctAnswer: "Yet",
    explanation: "In the FANBOYS family, 'Yet' and 'But' express contrast and adversative relationship between independent thoughts.",
    explanationBn: "FANBOYS-এর মধ্যে 'Yet' এবং 'But' বৈপরীত্য বা প্রতিকূল ভাব (contrast) প্রকাশ করে।"
  },
  {
    id: 23,
    question: "Fill in the blank: 'He had hardly sat down to dinner ______ the phone rang.'",
    options: ["than", "when", "then", "after"],
    correctAnswer: "when",
    explanation: "'Hardly... when' is the invariant correlative construction in English.",
    explanationBn: "'Hardly'-র সাথে সর্বদা 'when' বসে।"
  },
  {
    id: 24,
    question: "Select the sentence with correct correlative pairing:",
    options: [
      "Whether you agree or not, the decision is final.",
      "Whether you agree nor not, the decision is final.",
      "Whether you agree but not, the decision is final.",
      "Whether you agree and not, the decision is final."
    ],
    correctAnswer: "Whether you agree or not, the decision is final.",
    explanation: "'Whether' always pairs with 'or' ('Whether... or').",
    explanationBn: "'Whether'-এর সাথে সর্বদা 'or' বসে ('Whether... or')।"
  },
  {
    id: 25,
    question: "Fill in the blank: 'The scientist was respected ______ for his brilliant intellect ______ for his profound humility.'",
    options: [
      "not only, but also",
      "neither, or",
      "both, as well as",
      "either, nor"
    ],
    correctAnswer: "not only, but also",
    explanation: "'Not only for... but also for...' maintains strict prepositional parallelism across both coordinated items.",
    explanationBn: "'Not only for [A] but also for [B]' বাক্যে উভয় প্রান্তে Preposition 'for' রেখে নিখুঁত সমান্তরাল গঠন বজায় রাখা হয়েছে।"
  }
];

export default questions;
