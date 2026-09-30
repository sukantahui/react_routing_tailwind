const questions = [
  {
    id: "q1",
    question: "What is the correct sequence of multiple adverbs modifying a single verb according to the 'MPT' Royal Order?",
    options: [
      "Time -> Manner -> Place",
      "Manner -> Place -> Time",
      "Place -> Time -> Manner",
      "Manner -> Time -> Place"
    ],
    correctAnswer: 1,
    explanation: "The standard English royal order for multiple adverbs in end position is MPT: Manner (How) -> Place (Where) -> Time (When). Example: 'She sang beautifully (M) in the auditorium (P) yesterday (T).'",
    explanationBn: "একাধিক Adverb একসাথে সাজানোর আন্তর্জাতিক নিয়ম হলো MPT: Manner (কীভাবে) -> Place (কোথায়) -> Time (কখন)।"
  },
  {
    id: "q2",
    question: "Identify the sentence that correctly follows the MPT rule:",
    options: [
      "He spoke yesterday fluently at the conference.",
      "He spoke fluently at the conference yesterday.",
      "He spoke at the conference yesterday fluently.",
      "He spoke at the conference fluently yesterday."
    ],
    correctAnswer: 1,
    explanation: "'Fluently' (Manner) -> 'at the conference' (Place) -> 'yesterday' (Time).",
    explanationBn: "সঠিক MPT ক্রম: 'fluently' (Manner) -> 'at the conference' (Place) -> 'yesterday' (Time)।"
  },
  {
    id: "q3",
    question: "What is the meaning difference between 'He works hard' and 'He hardly works'?",
    options: [
      "There is no difference.",
      "'He works hard' means he is diligent and puts in great effort; 'He hardly works' means he is lazy and scarcely works at all.",
      "'He hardly works' means he works with great difficulty.",
      "Both mean he is unemployed."
    ],
    correctAnswer: 1,
    explanation: "'Hard' is a flat adverb meaning with energy and diligence. 'Hardly' is a restrictive negative adverb meaning scarcely or almost never.",
    explanationBn: "'He works hard' অর্থ সে কঠোর পরিশ্রম করে; আর 'He hardly works' অর্থ সে প্রায় কাজ করেই না (নেতিবাচক অর্থ)।"
  },
  {
    id: "q4",
    question: "Where should an Adverb of Frequency (e.g. 'always', 'never', 'often', 'seldom') be positioned with respect to a linking verb 'to be'?",
    options: [
      "Before the verb 'to be' ('He always is punctual')",
      "After the verb 'to be' ('He is always punctual')",
      "At the very beginning of the sentence only",
      "At the very end of the sentence only"
    ],
    correctAnswer: 1,
    explanation: "Adverbs of frequency are placed AFTER the verb 'to be' (am/is/are/was/were) and other auxiliaries, but BEFORE ordinary main lexical verbs.",
    explanationBn: "Adverbs of Frequency (always, never, often) 'to be' verb এবং Auxiliary-এর পরে বসে, কিন্তু সাধারণ Main Verb-এর পূর্বে বসে।"
  },
  {
    id: "q5",
    question: "Where should an Adverb of Frequency be placed when modifying an ordinary main verb without an auxiliary?",
    options: [
      "Immediately after the main verb",
      "Immediately before the main verb",
      "At the end of the sentence",
      "Between the direct object and indirect object"
    ],
    correctAnswer: 1,
    explanation: "With ordinary main verbs, frequency adverbs precede the verb: 'He always arrives on time', 'She rarely eats fast food'.",
    explanationBn: "সাধারণ Main Verb-এর ক্ষেত্রে Adverb of Frequency ঠিক Main Verb-এর পূর্বে বসে (যেমন: 'He always arrives on time')।"
  },
  {
    id: "q6",
    question: "Which of the following is a FLAT ADVERB (an adverb that has the exact same form as its corresponding adjective without '-ly')?",
    options: [
      "Quickly",
      "Fast",
      "Slowly",
      "Beautifully"
    ],
    correctAnswer: 1,
    explanation: "'Fast' is a flat adverb. There is no word 'fastly' in standard English. (e.g. 'He drives fast').",
    explanationBn: "'Fast' একটি Flat Adverb যার Adjective এবং Adverb রূপ অভিন্ন। ইংরেজিতে 'fastly' বলে কোনো শব্দ নেই।"
  },
  {
    id: "q7",
    question: "Identify the part of speech of 'fast' in: 'He observed a day-long fast during the festival.'",
    options: [
      "Adverb",
      "Adjective",
      "Noun",
      "Verb"
    ],
    correctAnswer: 2,
    explanation: "Preceded by the indefinite article 'a' and modified by the adjective 'day-long', 'fast' functions here as a Noun (meaning a period of abstaining from food).",
    explanationBn: "'a day-long fast'-এ 'fast' শব্দটি Noun হিসেবে ব্যবহৃত হয়েছে (উপবাস অর্থে)।"
  },
  {
    id: "q8",
    question: "Which sentence correctly places the limiting adverb 'only' to express that no other person passed the exam?",
    options: [
      "Only Rahul passed the examination.",
      "Rahul only passed the examination.",
      "Rahul passed only the examination.",
      "Rahul passed the only examination."
    ],
    correctAnswer: 0,
    explanation: "'Only' must immediately precede the specific word it restricts. To restrict the subject 'Rahul' (meaning nobody else passed), it must be 'Only Rahul passed...'.",
    explanationBn: "'Only' যার উপর সীমাবদ্ধতা আরোপ করে ঠিক তার পূর্বে বসে। কেবল রাহুলই পাস করেছে বোঝাতে 'Only Rahul passed...' সঠিক।"
  },
  {
    id: "q9",
    question: "What does 'I only ate two apples' formally imply compared to 'I ate only two apples'?",
    options: [
      "'I only ate' strictly means I did nothing else to them (e.g., didn't cook or sell them); 'I ate only two' restricts the quantity to precisely two.",
      "Both are completely identical in formal syntax.",
      "'I only ate' means I ate three apples.",
      "Neither is correct."
    ],
    correctAnswer: 0,
    explanation: "In formal syntax, 'only' modifies the word adjacent to it. 'I only ate' modifies the verb 'ate', while 'only two apples' modifies the numerical quantifier 'two'.",
    explanationBn: "ফর্মাল ব্যাকরণে 'only ate' ক্রিয়াকে মডিফাই করে (অন্য কিছু না করে শুধু খেয়েছি), আর 'only two' সংখ্যাকে সীমাবদ্ধ করে (মাত্র দুটি)।"
  },
  {
    id: "q10",
    question: "What is the meaning difference between 'late' and 'lately'?",
    options: [
      "'Late' means after the expected time; 'lately' means recently / in recent times.",
      "'Late' means recently; 'lately' means behind schedule.",
      "Both mean behind schedule.",
      "Both are adjectives."
    ],
    correctAnswer: 0,
    explanation: "'He arrived late' (after scheduled time - Adverb of Time). 'I haven't seen him lately' (recently - Adverb of Time).",
    explanationBn: "'Late' অর্থ দেরিতে (বিলম্ব); আর 'lately' অর্থ সম্প্রতি বা ইদানীং।"
  },
  {
    id: "q11",
    question: "Identify the Adverb of Degree / Quantity in: 'She was extremely exhausted after the marathon.'",
    options: [
      "exhausted",
      "extremely",
      "after",
      "marathon"
    ],
    correctAnswer: 1,
    explanation: "'Extremely' modifies the participial adjective 'exhausted', answering 'To what degree/extent?'",
    explanationBn: "'Extremely' শব্দটি Adjective 'exhausted'-এর তীব্রতা বা মাত্রা প্রকাশ করায় এটি Adverb of Degree।"
  },
  {
    id: "q12",
    question: "Which of the following sentences correctly positions the adverb 'enough'?",
    options: [
      "He is enough tall to touch the ceiling.",
      "He is tall enough to touch the ceiling.",
      "He is enough a tall man to touch the ceiling.",
      "He is tall to touch enough the ceiling."
    ],
    correctAnswer: 1,
    explanation: "'Enough' as an adverb of degree MUST follow the adjective or adverb it modifies: 'Adjective + enough' ('tall enough', 'fast enough'). As an adjective/determiner, it precedes a noun ('enough money').",
    explanationBn: "'Enough' যখন Adverb হিসেবে Adjective বা Adverb-কে মডিফাই করে, তখন তা সর্বদা Adjective-এর পরে বসে ('tall enough')।"
  },
  {
    id: "q13",
    question: "Identify the Sentence Adverb (an adverb that modifies the entire sentence/clause rather than a single word):",
    options: [
      "He ran quickly.",
      "Fortunately, nobody was injured in the accident.",
      "She spoke softly.",
      "They waited outside."
    ],
    correctAnswer: 1,
    explanation: "'Fortunately' conveys the speaker's commentary on the entire circumstance, functioning as a Sentence Adverb / Disjunct.",
    explanationBn: "'Fortunately' পুরো বাক্যের বক্তব্যকে মডিফাই করে বক্তার দৃষ্টিভঙ্গি প্রকাশ করায় এটি Sentence Adverb।"
  },
  {
    id: "q14",
    question: "What is the difference between 'near' and 'nearly'?",
    options: [
      "'Near' denotes short physical distance/proximity; 'nearly' means almost / closely approaching a state.",
      "'Near' means almost; 'nearly' means close in space.",
      "Both are adjectives only.",
      "Both mean strictly time."
    ],
    correctAnswer: 0,
    explanation: "'Come near' (close in physical space). 'He nearly missed the train' (almost / narrowly avoided).",
    explanationBn: "'Near' নিকটবর্তী দূরত্ব বোঝায়; আর 'nearly' অর্থ 'প্রায়' (almost)।"
  },
  {
    id: "q15",
    question: "In the sentence 'She sings very well', identify the part of speech and function of 'very':",
    options: [
      "Adjective modifying 'sings'",
      "Adverb modifying the verb 'sings'",
      "Adverb of Degree modifying another adverb 'well'",
      "Noun adjunct"
    ],
    correctAnswer: 2,
    explanation: "'Well' is an adverb modifying the verb 'sings'. 'Very' is an adverb of degree modifying the adverb 'well'.",
    explanationBn: "'Well' হলো Adverb যা 'sings' ক্রিয়াকে মডিফাই করছে; আর 'very' হলো Adverb of Degree যা অপর Adverb 'well'-কে মডিফাই করছে।"
  },
  {
    id: "q16",
    question: "Choose the sentence with correct adverb placement in a compound tense with multiple auxiliaries:",
    options: [
      "She has been always working diligently.",
      "She always has been working diligently.",
      "She has always been working diligently.",
      "She has been working always diligently."
    ],
    correctAnswer: 2,
    explanation: "When a verb phrase has two or more auxiliary verbs ('has been'), the frequency/mid-position adverb is placed immediately after the FIRST auxiliary ('has always been').",
    explanationBn: "একাধিক Auxiliary Verb থাকলে Mid-position Adverb সর্বদা প্রথম Auxiliary Verb-এর ঠিক পরে বসে ('has always been')।"
  },
  {
    id: "q17",
    question: "Identify the Interrogative Adverb of Reason in: 'Why did you refuse the job offer?'",
    options: [
      "did",
      "Why",
      "refuse",
      "offer"
    ],
    correctAnswer: 1,
    explanation: "'Why' asks for the reason or cause of an action, functioning as an Interrogative Adverb of Reason.",
    explanationBn: "'Why' কারণ জানতে চাওয়ায় এটি Interrogative Adverb of Reason।"
  },
  {
    id: "q18",
    question: "What is a 'Split Infinitive'?",
    options: [
      "Splitting a noun into two syllables.",
      "Placing an adverb between the particle 'to' and the base verb (e.g. 'to boldly go').",
      "Separating a subject from its predicate.",
      "Splitting a compound sentence into two simple sentences."
    ],
    correctAnswer: 1,
    explanation: "A split infinitive occurs when an adverb is inserted between 'to' and the verb root ('to boldly go', 'to really understand'). While widely accepted in modern English for clarity, traditional grammarians avoid it in strict formal style.",
    explanationBn: "Infinitive-এর 'to' এবং মূল Verb-এর মাঝে কোনো Adverb প্রবেশ করালে তাকে 'Split Infinitive' বলা হয় (যেমন: 'to boldly go')।"
  },
  {
    id: "q19",
    question: "Which of the following adverbs is formed irregularly from the adjective 'good'?",
    options: [
      "goodly",
      "goodily",
      "well",
      "bestly"
    ],
    correctAnswer: 2,
    explanation: "The adverb form corresponding to the adjective 'good' is 'well' (e.g. 'a good singer' -> 'she sings well').",
    explanationBn: "Adjective 'good'-এর সংশ্লিষ্ট Adverb রূপ হলো 'well' ('She sings well')।"
  },
  {
    id: "q20",
    question: "Identify the Adverb of Place in: 'The scouts marched forward into the valley.'",
    options: [
      "marched",
      "forward",
      "into",
      "valley"
    ],
    correctAnswer: 1,
    explanation: "'Forward' indicates the direction/location of the movement, acting as an Adverb of Place/Direction.",
    explanationBn: "'Forward' গতির দিক বা স্থান নির্দেশ করায় এটি Adverb of Place/Direction।"
  },
  {
    id: "q21",
    question: "Select the sentence with INCORRECT adverb positioning:",
    options: [
      "He quietly closed the door.",
      "He closed quietly the door.",
      "He closed the door quietly.",
      "Quietly, he closed the door."
    ],
    correctAnswer: 1,
    explanation: "An adverb should NEVER separate a transitive verb from its direct object ('closed quietly the door' is wrong; say 'closed the door quietly').",
    explanationBn: "Transitive Verb এবং তার Direct Object-এর মাঝে Adverb বসানো ব্যাকরণগতভাবে নিষিদ্ধ। তাই 'closed the door quietly' শুদ্ধ।"
  },
  {
    id: "q22",
    question: "What is the meaning difference between 'direct' and 'directly' as adverbs?",
    options: [
      "'Direct' means in a straight line without stopping/intermediaries; 'directly' means instantly / without delay or in an immediate manner.",
      "'Direct' is an adjective only; 'directly' is an adverb only.",
      "Both mean without delay.",
      "There is no distinction."
    ],
    correctAnswer: 0,
    explanation: "'The train goes direct to Delhi' (without stopping/changing). 'I will contact you directly' (immediately / personally).",
    explanationBn: "'Direct' কোনো বিরতি ছাড়া সরাসরি পথ নির্দেশ করে; আর 'directly' অবিলম্বে বা তৎক্ষণাৎ অর্থ প্রকাশ করে।"
  },
  {
    id: "q23",
    question: "Which sentence correctly uses 'too' meaning 'excessively'?",
    options: [
      "The tea is too hot to drink.",
      "The tea is too good.",
      "The tea is too much sweet to drink.",
      "The tea is to hot for drink."
    ],
    correctAnswer: 0,
    explanation: "'Too + adjective + to-infinitive' expresses excess with a negative consequence ('too hot to drink' = so hot that one cannot drink it).",
    explanationBn: "'Too + Adjective + to-infinitive' গঠনটি মাত্রাতিরিক্ততার নেতিবাচক প্রভাব প্রকাশ করে ('too hot to drink')।"
  },
  {
    id: "q24",
    question: "Identify the Relative Adverb in: 'This is the town where the poet was born.'",
    options: [
      "This",
      "where",
      "poet",
      "born"
    ],
    correctAnswer: 1,
    explanation: "'Where' links the subordinate clause to the antecedent noun 'town', acting as a Relative Adverb of Place.",
    explanationBn: "'Where' শব্দটি পূর্ববর্তী Noun 'town'-এর সাথে Subordinate Clause-কে সংযুক্ত করায় এটি Relative Adverb।"
  },
  {
    id: "q25",
    question: "In the sentence 'He seldom or ever makes a mistake', what is the standard idiomatic correction?",
    options: [
      "He seldom or never makes a mistake.",
      "He seldom if ever makes a mistake.",
      "Both A and B are standard idioms.",
      "He seldom and never makes a mistake."
    ],
    correctAnswer: 2,
    explanation: "The two standard correlative adverb idioms in English are 'seldom or never' (absolute negation) and 'seldom if ever' (conditional rarity). 'Seldom or ever' is a non-standard blended error.",
    explanationBn: "ইংরেজিতে দুটি নির্ধারিত বাগধারা রয়েছে: 'seldom or never' এবং 'seldom if ever'। 'Seldom or ever' একটি প্রচলিত ভুল।"
  }
];

export default questions;
