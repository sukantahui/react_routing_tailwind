// topic0_questions.js
// Module 001_003: Classification of Sentences by Purpose & Communicative Mood
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What type of sentence is: 'May the almighty grant you success in your examinations!'?",
    options: [
      "Imperative Sentence",
      "Optative Sentence",
      "Exclamatory Sentence",
      "Assertive Sentence"
    ],
    correctAnswer: 1,
    explanation: "Sentences that express a prayer, wish, curse, or benediction (usually opening with 'May' or having an implied 'May') are classified as Optative Sentences.",
    explanationBn: "যেসব বাক্যে প্রার্থনা, আশীর্বাদ, ইচ্ছা বা অভিশাপ প্রকাশ পায় (সাধারণত 'May' দিয়ে শুরু হয়), সেগুলোকে Optative Sentence (প্রার্থনাসূচক বাক্য) বলে।"
  },
  {
    id: 2,
    question: "What is the correct Question Tag for the statement: 'I am right, ________?'",
    options: [
      "amn't I",
      "aren't I",
      "am I",
      "isn't I"
    ],
    correctAnswer: 1,
    explanation: "In standard modern English, the negative question tag for 'I am' is always 'aren't I?' (or formal 'am I not?'). 'Amn't I' is archaic/non-standard.",
    explanationBn: "Standard English-এ 'I am'-এর Negative Question Tag সর্বদাই 'aren't I?' (বা আনুষ্ঠানিক 'am I not?') হয়। 'Amn't I' স্ট্যান্ডার্ড ব্যাকরণে গ্রাহ্য নয়।"
  },
  {
    id: 3,
    question: "What is the correct Question Tag for: 'Let's go for a walk along the Barrackpore riverside, ________?'",
    options: [
      "will we",
      "shall we",
      "don't we",
      "can we"
    ],
    correctAnswer: 1,
    explanation: "Sentences beginning with 'Let's' (Let us) express a mutual proposal or suggestion and take the invariant question tag 'shall we?'.",
    explanationBn: "'Let's' (Let us) দিয়ে শুরু হওয়া বাক্য পারস্পরিক প্রস্তাব বোঝায় এবং এর Question Tag সর্বদাই 'shall we?' হয়।"
  },
  {
    id: 4,
    question: "In the sentence 'Please close the door quietly', what is the mood and classification?",
    options: [
      "Declarative / Assertive",
      "Imperative (Polite Request)",
      "Optative",
      "Interrogative"
    ],
    correctAnswer: 1,
    explanation: "It expresses a request with the implied subject 'You'. Hence, it is an Imperative Sentence.",
    explanationBn: "এটি একটি অনুরোধমূলক বাক্য যার Subject 'You' উহ্য রয়েছে। তাই এটি Imperative Sentence (অনুজ্ঞাবাচক বাক্য)।"
  },
  {
    id: 5,
    question: "What is the correct Question Tag for: 'She seldom visits the library, ________?'",
    options: [
      "doesn't she",
      "does she",
      "is she",
      "isn't she"
    ],
    correctAnswer: 1,
    explanation: "Words like 'seldom', 'rarely', 'hardly', 'scarcely', 'barely', and 'never' have negative meaning. A negative statement takes a POSITIVE question tag: 'does she?'.",
    explanationBn: "'Seldom', 'rarely', 'hardly' শব্দগুলো না-বোধক (Negative) অর্থ প্রকাশ করে। তাই এর সাথে হ্যাঁ-বোধক (Positive) Question Tag 'does she?' বসবে।"
  },
  {
    id: 6,
    question: "Transform the Exclamatory sentence 'What a magnificent sunset over the Ganges!' into an Assertive sentence.",
    options: [
      "The sunset over the Ganges is what magnificent.",
      "The sunset over the Ganges is very magnificent.",
      "Is the sunset over the Ganges magnificent?",
      "How magnificent the sunset over the Ganges is!"
    ],
    correctAnswer: 1,
    explanation: "Exclamatory sentences with 'What a + noun' or 'How + adjective' transform to Assertive by introducing intensifiers like 'very', 'truly', or 'extremely': 'The sunset over the Ganges is very magnificent.'",
    explanationBn: "Exclamatory Sentence-কে Assertive-এ রূপান্তরের সময় 'What a / How'-এর পরিবর্তে 'very' বা 'extremely' ব্যবহার করতে হয়: 'The sunset over the Ganges is very magnificent.'।"
  },
  {
    id: 7,
    question: "What is the correct Question Tag for an imperative command: 'Open the window, ________?'",
    options: [
      "do you",
      "will you / won't you",
      "shall you",
      "did you"
    ],
    correctAnswer: 1,
    explanation: "Imperative sentences expressing requests or instructions take 'will you?' (or 'won't you?' for polite invitations).",
    explanationBn: "Imperative Sentence-এর Question Tag হিসেবে 'will you?' (অথবা অনুরোধের ক্ষেত্রে 'won't you?') ব্যবহৃত হয়।"
  },
  {
    id: 8,
    question: "Which of the following is a RHETORICAL QUESTION (a question asked for dramatic effect, requiring no answer)?",
    options: [
      "What is the time by your watch?",
      "Who does not love his motherland?",
      "Where is the Barrackpore railway station?",
      "Did you complete the assignment?"
    ],
    correctAnswer: 1,
    explanation: "'Who does not love his motherland?' is a rhetorical question that implies the emphatic assertion: 'Everyone loves his motherland.'",
    explanationBn: "'Who does not love his motherland?' একটি Rhetorical Question (আলঙ্কারিক প্রশ্ন), যার কোনো উত্তরের প্রয়োজন হয় না; এটি 'সকলেই নিজের মাতৃভূমিকে ভালোবাসে' অর্থ দৃঢ়ভাবে প্রকাশ করে।"
  },
  {
    id: 9,
    question: "What is the correct Question Tag for: 'Nobody called while I was away, ________?'",
    options: [
      "did he",
      "did they",
      "didn't they",
      "didn't he"
    ],
    correctAnswer: 1,
    explanation: "'Nobody' is negative, so the tag must be positive. Indefinite pronouns like nobody/somebody take the plural tag pronoun 'they': 'did they?'.",
    explanationBn: "'Nobody' শব্দটির অর্থ Negative, তাই Tag হবে Positive। এছাড়া 'Nobody/Somebody'-এর ক্ষেত্রে Tag Pronoun হিসেবে 'they' বসে: 'did they?'।"
  },
  {
    id: 10,
    question: "In the sentence 'Long live the President!', what type of sentence is this?",
    options: [
      "Imperative",
      "Optative (with implied 'May')",
      "Assertive",
      "Exclamatory"
    ],
    correctAnswer: 1,
    explanation: "It is an Optative Sentence expressing a wish/benediction. The base subjunctive verb 'live' is used with the implied optative auxiliary '[May] the President live long!'.",
    explanationBn: "এটি একটি Optative Sentence (যেখানে 'May' উহ্য রয়েছে: '[May] the President live long!')।"
  },
  {
    id: 11,
    question: "What is the correct Question Tag for: 'Everyone passed the examination, ________?'",
    options: [
      "didn't he",
      "didn't they",
      "did they",
      "passed they"
    ],
    correctAnswer: 1,
    explanation: "'Everyone' is positive, so the tag is negative ('didn't'). The indefinite pronoun 'Everyone' is referred to by the plural pronoun 'they' in question tags: 'didn't they?'.",
    explanationBn: "'Everyone' হ্যাঁ-বোধক, তাই Tag হবে Negative ('didn't')। 'Everyone'-এর পরিবর্তে Tag Pronoun 'they' বসে: 'didn't they?'।"
  },
  {
    id: 12,
    question: "Convert the Assertive sentence 'Nobody can deny that honesty is the best policy' into an Interrogative sentence.",
    options: [
      "Can anybody deny that honesty is the best policy?",
      "Can nobody deny that honesty is the best policy?",
      "Who can deny that honesty is the best policy?",
      "Both A and C are grammatically correct"
    ],
    correctAnswer: 3,
    explanation: "Both 'Who can deny that honesty is the best policy?' and 'Can anybody deny that honesty is the best policy?' are standard interrogative transformations of 'Nobody can deny...'.",
    explanationBn: "'Nobody can deny...'-কে প্রশ্নবোধকে রূপান্তরের সময় 'Who can deny...?' অথবা 'Can anybody deny...?' উভয় রূপই ব্যাকরণসম্মত।"
  },
  {
    id: 13,
    question: "What is the polarity shift rule in Question Tags?",
    options: [
      "Positive statements take positive tags.",
      "Positive statements take negative tags; Negative statements take positive tags.",
      "Negative statements take negative tags.",
      "Question tags have no polarity rules."
    ],
    correctAnswer: 1,
    explanation: "The fundamental law of question tags is the Polarity Shift: Positive Statement $\\rightarrow$ Negative Tag (*'He is, isn't he?'*); Negative Statement $\\rightarrow$ Positive Tag (*'He isn't, is he?'*).",
    explanationBn: "Question Tag-এর মৌলিক নিয়ম হলো Polarity Shift: হ্যাঁ-বোধক বাক্যে না-বোধক Tag বসে, আর না-বোধক বাক্যে হ্যাঁ-বোধক Tag বসে।"
  },
  {
    id: 14,
    question: "What is the correct Question Tag for: 'Nothing was damaged in the transit, ________?'",
    options: [
      "was it",
      "wasn't it",
      "were they",
      "wasn't they"
    ],
    correctAnswer: 0,
    explanation: "'Nothing' is a negative pronoun referring to an inanimate entity; hence the tag is positive and uses the pronoun 'it': 'was it?'.",
    explanationBn: "'Nothing' একটি Negative Pronoun এবং জড়বস্তু নির্দেশ করে; তাই Tag হবে Positive এবং Pronoun হবে 'it': 'was it?'।"
  },
  {
    id: 15,
    question: "What type of sentence is: 'How fast the time flies during vacations!'?",
    options: [
      "Interrogative",
      "Exclamatory",
      "Assertive",
      "Optative"
    ],
    correctAnswer: 1,
    explanation: "It opens with 'How + adverb' and terminates with an exclamation mark expressing amazement at the speed of time. It is an Exclamatory Sentence.",
    explanationBn: "এটি 'How + adverb' দিয়ে শুরু হয়ে বিস্ময় প্রকাশ করছে এবং শেষে বিস্ময়সূচক চিহ্ন রয়েছে, তাই এটি Exclamatory Sentence (আবেগসূচক বাক্য)।"
  },
  {
    id: 16,
    question: "What is the correct Question Tag for: 'You have a car, ________?' (in standard British English)",
    options: [
      "haven't you",
      "don't you",
      "Both A and B (haven't you / don't you)",
      "have you"
    ],
    correctAnswer: 2,
    explanation: "When 'have' is the main verb indicating possession, British English traditionally allows 'haven't you?', while do-support 'don't you?' is widely accepted globally.",
    explanationBn: "'Have' যখন মূল Verb হিসেবে অধিকার প্রকাশ করে, তখন 'haven't you?' এবং 'don't you?' উভয় Tag-ই প্রচলিত।"
  },
  {
    id: 17,
    question: "Transform the Exclamatory sentence 'If only I were young again!' into an Assertive sentence.",
    options: [
      "I wish that I were young again.",
      "I am young again.",
      "Was I young again?",
      "How I were young again."
    ],
    correctAnswer: 0,
    explanation: "'If only...' expressing an unrealizable wish transforms to an assertive sentence with 'I wish that...': 'I wish that I were young again.'",
    explanationBn: "'If only...' দিয়ে শুরু হওয়া অপ্রাপ্তির আক্ষেপমূলক বাক্যকে Assertive করতে 'I wish that...' ব্যবহার করা হয়।"
  },
  {
    id: 18,
    question: "What is the correct Question Tag for: 'Don't make any noise, ________?'",
    options: [
      "will you",
      "won't you",
      "shall you",
      "do you"
    ],
    correctAnswer: 0,
    explanation: "Negative imperative sentences ('Don't do X') strictly take the positive tag 'will you?'.",
    explanationBn: "নেগেটিভ Imperative Sentence ('Don't...')-এর ক্ষেত্রে সর্বদাই পজিটিভ Tag 'will you?' বসে।"
  },
  {
    id: 19,
    question: "Which of the following sentences is an INTERROGATIVE sentence with SUBJECT-AUXILIARY INVERSION?",
    options: [
      "You are coming to Barrackpore today.",
      "Are you coming to Barrackpore today?",
      "I wonder if you are coming to Barrackpore today.",
      "Tell me whether you are coming to Barrackpore today."
    ],
    correctAnswer: 1,
    explanation: "'Are you coming to Barrackpore today?' exhibits direct Subject-Auxiliary Inversion (Auxiliary 'Are' precedes Subject 'you') and terminates in a question mark.",
    explanationBn: "'Are you coming...?' বাক্যে Auxiliary Verb 'Are' Subject 'you'-এর পূর্বে বসে প্রত্যক্ষ Subject-Auxiliary Inversion ঘটিয়েছে।"
  },
  {
    id: 20,
    question: "What is the correct Question Tag for: 'Neither of them was ready, ________?'",
    options: [
      "was they",
      "were they",
      "wasn't they",
      "weren't they"
    ],
    correctAnswer: 1,
    explanation: "'Neither' is negative, so the tag must be positive. Since the tag pronoun is plural 'they', the verb must agree in plural: 'were they?'.",
    explanationBn: "'Neither' হলো Negative, তাই Tag হবে Positive। Tag Pronoun 'they' হওয়ার কারণে Verb হবে Plural 'were': 'were they?'।"
  },
  {
    id: 21,
    question: "In indirect questions like 'He asked me where I lived', why is there NO inversion?",
    options: [
      "Because indirect questions are subordinate noun clauses functioning as direct objects in declarative word order (Subject + Verb), not direct interrogatives.",
      "Because the past tense forbids questions.",
      "Because lived is intransitive.",
      "Because where is a preposition."
    ],
    correctAnswer: 0,
    explanation: "Subordinate noun clauses in indirect speech must preserve normal declarative word order (Subject + Verb: 'where I lived', NEVER *'where did I live'*).",
    explanationBn: "Indirect Question কোনো স্বাধীন প্রশ্ন নয়, এটি একটি Subordinate Noun Clause; তাই এতে সাধারণ বর্ণনামূলক পদক্রম (Subject + Verb) বজায় থাকে।"
  },
  {
    id: 22,
    question: "What is the correct Question Tag for: 'There is some water in the glass, ________?'",
    options: [
      "isn't it",
      "isn't there",
      "is there",
      "is it"
    ],
    correctAnswer: 1,
    explanation: "When a sentence opens with the introductory dummy subject 'There', the question tag replicates 'there' as its pronoun: 'isn't there?'.",
    explanationBn: "বাক্য যদি 'There' দিয়ে শুরু হয়, তবে Question Tag-এ Pronoun হিসেবে 'there' নিজেই বসে: 'isn't there?'।"
  },
  {
    id: 23,
    question: "Transform 'O that I had the wings of a dove!' into an Assertive sentence.",
    options: [
      "I strongly wish that I had the wings of a dove.",
      "I had the wings of a dove.",
      "Do I have the wings of a dove?",
      "How I had the wings of a dove."
    ],
    correctAnswer: 0,
    explanation: "'O that...' expressing deep longing transforms into 'I wish / I strongly desire that I had...'.",
    explanationBn: "'O that...' আকুল বাসনা প্রকাশ করে, যা Assertive-এ 'I strongly wish that...' রূপে রূপান্তরিত হয়।"
  },
  {
    id: 24,
    question: "What is the correct Question Tag for: 'You used to play cricket for the Barrackpore club, ________?'",
    options: [
      "didn't you",
      "usedn't you",
      "Both A and B (didn't you / usedn't you)",
      "wouldn't you"
    ],
    correctAnswer: 2,
    explanation: "Both 'didn't you?' (modern standard) and 'usedn't you?' (traditional British) are grammatically valid for the semi-modal 'used to'.",
    explanationBn: "'Used to'-এর ক্ষেত্রে আধুনিক ইংরেজিতে 'didn't you?' এবং ঐতিহ্যগতভাবে 'usedn't you?' উভয় Tag-ই সঠিক।"
  },
  {
    id: 25,
    question: "Why is mastering sentence classification by purpose essential for competitive exam aspirants?",
    options: [
      "Because it forms the bedrock for direct/indirect narration conversions, question tags, and transformation of sentences without meaning alteration.",
      "Because it only helps in reading poetry.",
      "Because it eliminates the need for tenses.",
      "Because it replaces vocabulary."
    ],
    correctAnswer: 0,
    explanation: "Accurate sentence classification is the prerequisite for Narration (Reporting Assertive, Interrogative, Imperative, Optative, Exclamatory), Question Tags, and syntactic transformation.",
    explanationBn: "Sentence Classification হলো Narration Change (উক্তি পরিবর্তন), Question Tags এবং Transformation of Sentences-এর মূল ভিত্তি।"
  }
];

export default questions;
