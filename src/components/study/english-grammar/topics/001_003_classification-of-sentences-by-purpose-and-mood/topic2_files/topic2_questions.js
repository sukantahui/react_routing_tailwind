// topic2_questions.js
// Module 001_003: Classification of Sentences by Purpose & Communicative Mood
// Topic 2: Question Tags: Polarity Dynamics & Special Exceptions
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What is the correct question tag for: 'Swadeep is learning full-stack development, ________?'",
    options: [
      "is he?",
      "isn't he?",
      "wasn't he?",
      "doesn't he?"
    ],
    correctAnswer: 1,
    explanation: "A positive statement with the auxiliary 'is' takes a contracted negative tag using the corresponding pronoun: 'isn't he?'.",
    explanationBn: "হ্যাঁ-বোধক বাক্যে Auxiliary Verb 'is' থাকলে Tag Question হবে Contracted Negative: 'isn't he?'।"
  },
  {
    id: 2,
    question: "Select the correct question tag for: 'I am right, ________?'",
    options: [
      "amn't I?",
      "am not I?",
      "aren't I?",
      "don't I?"
    ],
    correctAnswer: 2,
    explanation: "In standard English, 'I am' in a positive statement takes the irregular negative tag 'aren't I?' (or formal 'am I not?'). 'Amn't I' is non-standard.",
    explanationBn: "Standard English-এ 'I am'-এর হ্যাঁ-বোধক বিবৃতির পর Negative Tag হিসেবে 'aren't I?' বসে ('amn't I' প্রচলিত ব্যাকরণে গ্রহণযোগ্য নয়)।"
  },
  {
    id: 3,
    question: "Choose the correct tag for: 'Let's begin the React workshop, ________?'",
    options: [
      "will we?",
      "shall we?",
      "don't we?",
      "can we?"
    ],
    correctAnswer: 1,
    explanation: "Proposals or suggestions introduced by 'Let's' (let us) conventionally take the question tag 'shall we?'.",
    explanationBn: "'Let's' (Let us) দ্বারা কোনো প্রস্তাব (Proposal/Suggestion) বোঝালে তার Tag Question সর্বদা 'shall we?' হয়।"
  },
  {
    id: 4,
    question: "Choose the correct tag for: 'Let us go home now' (where 'let us' means 'allow us / give us permission'):",
    options: [
      "shall we?",
      "will you?",
      "don't you?",
      "do we?"
    ],
    correctAnswer: 1,
    explanation: "When 'Let us' expresses a request for permission (not a mutual suggestion 'Let's'), the implied subject is 'you', and the tag is 'will you?'.",
    explanationBn: "'Let us' যখন অনুমতি চাওয়ার অর্থে (allow us) ব্যবহৃত হয়, তখন এটি মূলত Imperative Request এবং এর Tag হয় 'will you?'।"
  },
  {
    id: 5,
    question: "What is the correct tag for: 'He hardly ever visits the library, ________?'",
    options: [
      "doesn't he?",
      "does he?",
      "is he?",
      "isn't he?"
    ],
    correctAnswer: 1,
    explanation: "'Hardly' is a semi-negative adverb making the entire clause negative; therefore, it mandates a POSITIVE question tag: 'does he?'.",
    explanationBn: "'Hardly', 'Scarcely', 'Seldom' ইত্যাদি Semi-negative শব্দ বাক্যকে না-বোধক করে দেয়, তাই Tag Question সর্বদা হ্যাঁ-বোধক (Positive) হয়: 'does he?'।"
  },
  {
    id: 6,
    question: "What is the correct question tag for: 'Nobody phoned while I was out, ________?'",
    options: [
      "did they?",
      "didn't they?",
      "did he?",
      "didn't he?"
    ],
    correctAnswer: 0,
    explanation: "'Nobody' is negative, requiring a positive tag. Furthermore, indefinite pronouns referring to persons (nobody, somebody, everybody) take the plural pronoun 'they' in question tags: 'did they?'.",
    explanationBn: "'Nobody' না-বোধক শব্দ হওয়ায় Tag হবে Positive। এছাড়া 'Nobody', 'Everybody' ইত্যাদির ক্ষেত্রে Pronoun হিসেবে 'they' বসে: 'did they?'।"
  },
  {
    id: 7,
    question: "What is the correct tag for: 'Nothing was damaged during the transit, ________?'",
    options: [
      "was it?",
      "wasn't it?",
      "were they?",
      "weren't they?"
    ],
    correctAnswer: 0,
    explanation: "'Nothing' is negative, requiring a positive tag. Indefinite pronouns referring to things (nothing, everything, something) take the singular pronoun 'it': 'was it?'.",
    explanationBn: "'Nothing' না-বোধক হওয়ায় Tag হবে Positive এবং বস্তুবাচক হওয়ায় Pronoun হিসেবে 'it' বসে: 'was it?'।"
  },
  {
    id: 8,
    question: "Select the correct tag for: 'Everyone has submitted their assignments, ________?'",
    options: [
      "hasn't he?",
      "haven't they?",
      "hasn't they?",
      "don't they?"
    ],
    correctAnswer: 1,
    explanation: "'Everyone' takes the plural pronoun 'they' in tags. Because 'they' is plural, the auxiliary verb must agree in number: 'haven't they?' (NOT *hasn't they).",
    explanationBn: "'Everyone'-এর জন্য Tag-এ Pronoun বসে 'they'। যেহেতু 'they' Plural, তাই Auxiliary Verb-ও Plural হয়ে 'haven't they?' হবে।"
  },
  {
    id: 9,
    question: "What is the correct tag for: 'Shut the front door, ________?' (Imperative command/request)",
    options: [
      "will you?",
      "do you?",
      "shall you?",
      "don't you?"
    ],
    correctAnswer: 0,
    explanation: "Affirmative imperative sentences (commands or requests) typically take 'will you?' or 'won't you?' (or 'can you?' / 'would you?' depending on politeness): 'will you?'.",
    explanationBn: "Imperative বাক্যের ক্ষেত্রে Tag হিসেবে সাধারণত 'will you?' বা 'won't you?' ব্যবহৃত হয়।"
  },
  {
    id: 10,
    question: "What is the correct tag for: 'Don't make any noise here, ________?' (Negative imperative)",
    options: [
      "will you?",
      "won't you?",
      "shall you?",
      "do you?"
    ],
    correctAnswer: 0,
    explanation: "Negative imperative commands ('Don't...') strictly take the positive tag 'will you?': 'Don't make noise, will you?'.",
    explanationBn: "না-বোধক Imperative বাক্যে ('Don't...') সর্বদা Positive Tag 'will you?' বসে।"
  },
  {
    id: 11,
    question: "What is the correct question tag for: 'There is a new batch starting next week, ________?'",
    options: [
      "isn't it?",
      "isn't there?",
      "is there?",
      "doesn't there?"
    ],
    correctAnswer: 1,
    explanation: "When an existential 'There' acts as the dummy subject of the sentence, 'there' is retained in the question tag: 'isn't there?'.",
    explanationBn: "Existential 'There' দিয়ে বাক্য শুরু হলে Tag Question-এ Pronoun হিসেবে 'there'-ই ব্যবহৃত হয়: 'isn't there?'।"
  },
  {
    id: 12,
    question: "Choose the correct tag for: 'Sukanta Sir rarely misses a lecture, ________?'",
    options: [
      "does he?",
      "doesn't he?",
      "is he?",
      "isn't he?"
    ],
    correctAnswer: 0,
    explanation: "'Rarely' has a negative semantic polarity. Thus, the tag must be positive: 'does he?'.",
    explanationBn: "'Rarely' একটি Negative Adverb, তাই Tag Question হবে হ্যাঁ-বোধক: 'does he?'।"
  },
  {
    id: 13,
    question: "What is the correct tag for: 'You used to live in Shyamnagar, ________?'",
    options: [
      "didn't you?",
      "usedn't you?",
      "don't you?",
      "Both 'didn't you?' and 'usedn't you?' are acceptable in standard grammar"
    ],
    correctAnswer: 3,
    explanation: "Both 'didn't you?' (modern/standard) and 'usedn't you?' (traditional British) are grammatically valid tags for 'used to', with 'didn't you?' being most frequent today.",
    explanationBn: "'Used to'-এর Tag Question হিসেবে Modern English-এ 'didn't you?' সর্বাধিক প্রচলিত, যদিও Traditional English-এ 'usedn't you?'-ও ব্যাকরণগতভাবে শুদ্ধ।"
  },
  {
    id: 14,
    question: "Choose the correct tag for: 'Debangshu has a luxury car, ________?' (in modern standard American/General English where 'has' is the main lexical verb):",
    options: [
      "hasn't he?",
      "doesn't he?",
      "isn't he?",
      "didn't he?"
    ],
    correctAnswer: 1,
    explanation: "When 'have/has' functions as a main lexical verb of possession (not an auxiliary), modern English uses the dummy operator 'do/does': 'doesn't he?' (British formal: 'hasn't he?').",
    explanationBn: "'Has' যখন মূল Verb হিসেবে অধিকার (Possession) বোঝায়, তখন Modern English-এ Dummy Verb 'does' ব্যবহার করে Tag হয়: 'doesn't he?'।"
  },
  {
    id: 15,
    question: "What is the correct tag for: 'We ought to respect our mentors, ________?'",
    options: [
      "oughtn't we?",
      "shouldn't we?",
      "mustn't we?",
      "Both 'oughtn't we?' and 'shouldn't we?' are acceptable"
    ],
    correctAnswer: 3,
    explanation: "'Ought to' historically forms tags with 'oughtn't we?', but modern usage frequently replaces it with 'shouldn't we?'. Both are acceptable.",
    explanationBn: "'Ought to'-এর Tag Question হিসেবে 'oughtn't we?' বা আধুনিক ব্যবহারে 'shouldn't we?' দুটোই গৃহীত।"
  },
  {
    id: 16,
    question: "Select the correct tag for: 'Neither of the plans was accepted, ________?'",
    options: [
      "were they?",
      "was it?",
      "wasn't it?",
      "weren't they?"
    ],
    correctAnswer: 0,
    explanation: "'Neither of...' is negative in meaning (requiring a positive tag) and refers to multiple items/people, so the tag pronoun is 'they' with plural verb: 'were they?'.",
    explanationBn: "'Neither of...' না-বোধক অর্থ প্রকাশ করে, তাই Tag হবে Positive; এবং একাধিক বিষয়কে নির্দেশ করায় Pronoun 'they' ও Plural Verb 'were' বসে: 'were they?'।"
  },
  {
    id: 17,
    question: "What is the correct tag for: 'Few people attended the meeting, ________?' vs 'A few people attended the meeting, ________?'",
    options: [
      "'did they?' for both",
      "'didn't they?' for both",
      "'did they?' for 'Few' (negative) and 'didn't they?' for 'A few' (positive)",
      "'didn't they?' for 'Few' and 'did they?' for 'A few'"
    ],
    correctAnswer: 2,
    explanation: "'Few' has a negative meaning ('hardly any') and takes a positive tag ('did they?'). 'A few' has a positive meaning ('some') and takes a negative tag ('didn't they?').",
    explanationBn: "'Few' প্রায় নেই বললেই চলে (Negative), তাই এর Tag হয় 'did they?'। পক্ষান্তরে 'A few' কিছু সংখ্যক বোঝায় (Positive), তাই এর Tag হয় 'didn't they?'।"
  },
  {
    id: 18,
    question: "What is the correct tag for: 'Little progress has been made, ________?' vs 'A little progress has been made, ________?'",
    options: [
      "'has it?' for 'Little' (negative) and 'hasn't it?' for 'A little' (positive)",
      "'hasn't it?' for both",
      "'has it?' for both",
      "'didn't it?' for both"
    ],
    correctAnswer: 0,
    explanation: "'Little' is negative in polarity -> 'has it?'. 'A little' is positive in polarity -> 'hasn't it?'.",
    explanationBn: "'Little' না-বোধক (Negative) হওয়ায় Tag 'has it?'; আর 'A little' হ্যাঁ-বোধক (Positive) হওয়ায় Tag 'hasn't it?'।"
  },
  {
    id: 19,
    question: "What is the correct tag for: 'I am not late today, ________?'",
    options: [
      "am I?",
      "aren't I?",
      "is I?",
      "do I?"
    ],
    correctAnswer: 0,
    explanation: "While positive 'I am' takes 'aren't I?', negative 'I am not' takes the standard regular positive tag 'am I?'.",
    explanationBn: "'I am'-এর Negative Tag যেমন 'aren't I?' হয়, কিন্তু 'I am not'-এর Positive Tag স্বাভাবিক নিয়মে 'am I?' হয়।"
  },
  {
    id: 20,
    question: "What is the correct tag for: 'You had better consult a doctor immediately, ________?'",
    options: [
      "hadn't you?",
      "bettern't you?",
      "shouldn't you?",
      "didn't you?"
    ],
    correctAnswer: 0,
    explanation: "The idiom 'had better' uses 'had' as its auxiliary in question tags: 'hadn't you?'.",
    explanationBn: "'Had better' কাঠামোর Tag Question-এ Auxiliary হিসেবে 'had' ব্যবহৃত হয়: 'hadn't you?'।"
  },
  {
    id: 21,
    question: "What is the correct tag for: 'You would rather stay here, ________?'",
    options: [
      "wouldn't you?",
      "rather you?",
      "didn't you?",
      "hadn't you?"
    ],
    correctAnswer: 0,
    explanation: "The idiom 'would rather' uses 'would' as its auxiliary in question tags: 'wouldn't you?'.",
    explanationBn: "'Would rather'-এর Tag Question-এ Auxiliary হিসেবে 'would' বসে: 'wouldn't you?'।"
  },
  {
    id: 22,
    question: "What is the correct tag for: 'This is your laptop, ________?'",
    options: [
      "isn't this?",
      "isn't it?",
      "is it?",
      "doesn't it?"
    ],
    correctAnswer: 1,
    explanation: "Demonstrative pronouns 'this' and 'that' referring to things become 'it' in question tags: 'isn't it?'. ('These' and 'those' become 'they').",
    explanationBn: "বাক্যের Subject 'This' বা 'That' হলে Tag Question-এ Pronoun হিসেবে 'it' বসে: 'isn't it?' ('These'/'Those' হলে 'they' বসে)।"
  },
  {
    id: 23,
    question: "What is the correct tag for: 'These are your original documents, ________?'",
    options: [
      "aren't these?",
      "aren't they?",
      "are they?",
      "isn't it?"
    ],
    correctAnswer: 1,
    explanation: "'These' and 'those' acting as demonstrative subjects are replaced by 'they' in question tags: 'aren't they?'.",
    explanationBn: "'These' এবং 'Those' Subject হলে Tag Question-এ Pronoun হিসেবে 'they' ব্যবহৃত হয়: 'aren't they?'।"
  },
  {
    id: 24,
    question: "In spoken English, what does a FALLING intonation on a question tag indicate?",
    options: [
      "The speaker is genuinely asking for unknown information.",
      "The speaker is confident and merely inviting agreement/confirmation.",
      "The speaker is angry and shouting.",
      "The statement is grammatically incorrect."
    ],
    correctAnswer: 1,
    explanation: "A falling intonation ($\searrow$) on a tag means the speaker expects the listener to agree (inviting confirmation). A rising intonation ($\nearrow$) means the speaker is genuinely unsure and asking a real question.",
    explanationBn: "Tag Question-এ Falling Intonation ($\searrow$) মানে বক্তা উত্তর সম্পর্কে নিশ্চিত এবং সম্মতি চাইছে। আর Rising Intonation ($\nearrow$) মানে বক্তা আসলেই নিশ্চিত নয় এবং তথ্য জানতে চাইছে।"
  },
  {
    id: 25,
    question: "Identify the INCORRECT question tag among the following:",
    options: [
      "She can swim across the river, can't she?",
      "He has never told a lie, has he?",
      "Let's have some ice cream, won't we?",
      "Open the window, will you?"
    ],
    correctAnswer: 2,
    explanation: "'Let's have some ice cream' must take the tag 'shall we?', NOT 'won't we?'. All other options are completely correct.",
    explanationBn: "'Let's' দিয়ে শুরু হওয়া বাক্যের সঠিক Tag হলো 'shall we?' ('won't we?' সম্পূর্ণ ভুল)।"
  }
];

export default questions;
