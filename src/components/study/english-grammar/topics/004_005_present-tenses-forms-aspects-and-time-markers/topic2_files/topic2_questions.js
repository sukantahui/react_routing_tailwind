const questions = [
  {
    id: 1,
    question: "Select the sentence that contains a fatal stative verb error.",
    options: [
      "She understands the core principles of quantum physics.",
      "I am knowing the answer to this complex grammar query.",
      "They own a heritage property in Barrackpore.",
      "This antique clock belongs to my grandfather."
    ],
    correctAnswer: 1,
    explanation: "'Know' is a stative verb of cognition and cannot take progressive (-ing) form. It must be 'I know the answer'.",
    explanationBn: "'Know' একটি Stative Verb, তাই 'I am knowing' ভুল; সঠিক রূপ হলো 'I know'।"
  },
  {
    id: 2,
    question: "Identify the sentence where the verb 'have' is correctly used in the continuous aspect.",
    options: [
      "She is having three expensive sports cars.",
      "We are having a team luncheon at the heritage bistro.",
      "He is having vast knowledge of ancient Indian history.",
      "They are having a splendid mansion overlooking the river."
    ],
    correctAnswer: 1,
    explanation: "When 'have' means eating, drinking, or experiencing an event, it functions dynamically and takes continuous forms ('having lunch/luncheon'). When indicating possession, it is strictly stative.",
    explanationBn: "খাওয়া বা অনুষ্ঠান উপভোগ করা অর্থে 'have' Dynamic Verb হিসেবে continuous (-ing) রূপ গ্রহণ করে।"
  },
  {
    id: 3,
    question: "Choose the grammatically pure sentence involving sensory perception:",
    options: [
      "The freshly baked sourdough bread is smelling aromatic.",
      "The freshly baked sourdough bread smells aromatic.",
      "The freshly baked sourdough bread is having good smell.",
      "The freshly baked sourdough bread has been smelling aromatic today."
    ],
    correctAnswer: 1,
    explanation: "When 'smell' describes an inherent olfactory property/quality of an object, it is stative and takes Simple Present ('smells aromatic').",
    explanationBn: "কোনো বস্তুর অন্তর্নিহিত গন্ধ বা স্বাদ প্রকাশে 'smell' ও 'taste' Stative Verb (smells aromatic)।"
  },
  {
    id: 4,
    question: "In which sentence is 'think' functioning as a stative verb expressing opinion?",
    options: [
      "I am thinking about moving to a new apartment in Kolkata.",
      "Shubham is thinking deeply about the chess move.",
      "I think that syntactic clarity is essential for persuasive writing.",
      "We are thinking of launching a new grammar curriculum."
    ],
    correctAnswer: 2,
    explanation: "When 'think' means 'believe / hold an opinion', it is stative ('I think that...'). When it describes an ongoing mental process of deliberation, it is dynamic ('I am thinking about...').",
    explanationBn: "মতামত বা বিশ্বাস প্রকাশ করতে 'think' Stative ('I think'); কিন্তু গভীর চিন্তা করার প্রক্রিয়া বোঝাতে Dynamic ('am thinking')।"
  },
  {
    id: 5,
    question: "Fill in the blank: 'Why ______ so unreasonable today? You are usually very accommodating.'",
    options: [
      "are you being",
      "are you",
      "do you be",
      "have you been being"
    ],
    correctAnswer: 0,
    explanation: "'Are you being' uses the dynamic sense of 'be' to describe temporary, deliberate behavior happening at this specific moment.",
    explanationBn: "সাময়িক আচরণ প্রকাশে 'be' verb continuous রূপ নিতে পারে: 'Why are you being so unreasonable today?'"
  },
  {
    id: 6,
    question: "Identify the sentence that correctly uses the verb 'taste' in a dynamic sense.",
    options: [
      "The tomato soup tastes slightly sour today.",
      "This exotic fruit is tasting like a blend of mango and peach.",
      "The master chef is tasting the sauce to verify the seasoning.",
      "Good coffee always is tasting bitter and rich."
    ],
    correctAnswer: 2,
    explanation: "The chef actively sampling the sauce is a deliberate physical action (Dynamic), so 'is tasting' is perfectly correct.",
    explanationBn: "স্বাদ পরীক্ষা করার সক্রিয় কাজ বোঝাতে 'is tasting' পুরোপুরি শুদ্ধ।"
  },
  {
    id: 7,
    question: "Which of the following verbs is categorized as a stative verb of emotion/desire?",
    options: [
      "Calculate",
      "Detest",
      "Construct",
      "Sprint"
    ],
    correctAnswer: 1,
    explanation: "'Detest' (to hate intensely) expresses an enduring emotional state and cannot take continuous aspect (*I am detesting).",
    explanationBn: "'Detest' তীব্র ঘৃণা প্রকাশের Stative Verb, তাই এর continuous রূপ হয় না।"
  },
  {
    id: 8,
    question: "Spot the error: 'This textbook is consisting (A) of twelve comprehensive units (B) on English syntax (C).'",
    options: [
      "is consisting (A)",
      "of twelve comprehensive units (B)",
      "on English syntax (C)",
      "No error"
    ],
    correctAnswer: 0,
    explanation: "'Consist of' is a stative verb of inclusion/composition and must be in the Simple Present: 'This textbook consists of...'",
    explanationBn: "'Consist of' সর্বদা Stative, তাই 'is consisting' ভুল, 'consists of' হবে।"
  },
  {
    id: 9,
    question: "Choose the correct sentence expressing visual appearance:",
    options: [
      "Abhronila is resembling her grandmother remarkably.",
      "Abhronila resembles her grandmother remarkably.",
      "Abhronila has been resembling her grandmother.",
      "Abhronila is looking like resembling her grandmother."
    ],
    correctAnswer: 1,
    explanation: "'Resemble' describes a permanent physical state/trait and is strictly stative ('resembles').",
    explanationBn: "'Resemble' (সাদৃশ্য থাকা) একটি Stative Verb, কখনোই 'is resembling' হয় না।"
  },
  {
    id: 10,
    question: "Fill in the blank: 'I ______ the ophthalmologist for a comprehensive eye checkup tomorrow afternoon.'",
    options: [
      "see",
      "am seeing",
      "am seen",
      "have seen"
    ],
    correctAnswer: 1,
    explanation: "'See' in the dynamic sense of 'meeting / consulting' takes continuous aspect for scheduled future arrangements ('am seeing').",
    explanationBn: "ডাক্তারের সাথে দেখা বা পরামর্শ করার অর্থে 'see' Dynamic Verb ('am seeing') হিসেবে ব্যবহৃত হয়।"
  },
  {
    id: 11,
    question: "Which of the following sentences represents correct standard English?",
    options: [
      "I am having two elder brothers and one sister.",
      "I have two elder brothers and one sister.",
      "I am possessing two elder brothers and one sister.",
      "I have been having two elder brothers."
    ],
    correctAnswer: 1,
    explanation: "Expressing family relationships and possession requires the stative Simple Present: 'I have two elder brothers'.",
    explanationBn: "পারিবারিক সম্পর্ক বা ভাইবোন থাকার বর্ণনায় 'I have' ব্যবহার করতে হয়, 'I am having' নয়।"
  },
  {
    id: 12,
    question: "In the sentence 'The suitcase weighs exactly 20 kilograms', the verb 'weighs' is:",
    options: [
      "Dynamic action verb",
      "Stative verb expressing measurable property",
      "Causative auxiliary",
      "Modal auxiliary"
    ],
    correctAnswer: 1,
    explanation: "'Weighs' indicates a static physical measurement (Stative). Contrast with 'The porter is weighing the suitcase' (Dynamic).",
    explanationBn: "ওজন কত তা নির্দেশ করায় 'weighs' এখানে Stative Verb।"
  },
  {
    id: 13,
    question: "Select the sentence where 'feel' is used statively to mean 'believe / have an impression':",
    options: [
      "The doctor is feeling the patient's pulse.",
      "I feel that we should re-evaluate the hypothesis.",
      "She was feeling the soft velvet fabric carefully.",
      "The technician is feeling the vibration of the motor."
    ],
    correctAnswer: 1,
    explanation: "'I feel that...' expresses an opinion/belief, which is stative and cannot be '*I am feeling that...'.",
    explanationBn: "মতামত প্রকাশের ক্ষেত্রে 'I feel that' (Stative) সঠিক।"
  },
  {
    id: 14,
    question: "Why is 'I am loving it' considered informal marketing slang rather than formal standard grammar?",
    options: [
      "Because 'love' is a transitive verb requiring two objects.",
      "Because 'love' is a stative verb of emotion that formally resists continuous aspect.",
      "Because 'it' cannot be the object of 'love'.",
      "Because 'am' cannot precede 'love'."
    ],
    correctAnswer: 1,
    explanation: "Formally, 'love' is a stative emotion verb requiring Simple Present ('I love it'). Advertising slogans deliberately break this rule for conversational flair.",
    explanationBn: "প্রমিত ব্যাকরণে 'love' একটি Stative Verb, তাই প্রাতিষ্ঠানিক লেখায় 'I love it' লিখতে হয়।"
  },
  {
    id: 15,
    question: "Identify the correct usage of the stative verb 'matter':",
    options: [
      "Your opinion is mattering a lot to the committee.",
      "Your opinion matters a lot to the committee.",
      "Your opinion has been mattering to us.",
      "Your opinion was mattering previously."
    ],
    correctAnswer: 1,
    explanation: "'Matter' (to be of importance) is strictly stative and takes Simple Present ('matters').",
    explanationBn: "'Matter' সর্বদা Stative Verb, তাই 'matters' হবে।"
  },
  {
    id: 16,
    question: "Complete the sentence: 'This luxury sedan ______ fifty thousand dollars.'",
    options: [
      "is costing",
      "costs",
      "is costed",
      "has been costing"
    ],
    correctAnswer: 1,
    explanation: "Price and value are static attributes governed by stative 'costs'.",
    explanationBn: "মূল্য নির্দেশক 'cost' একটি Stative Verb ('costs')।"
  },
  {
    id: 17,
    question: "Select the sentence where 'look' is dynamic:",
    options: [
      "Debopam looks exceptionally confident today.",
      "The sky looks gloomy and overcast.",
      "Swadeep is looking through the microscope at the cell culture.",
      "This solution looks very promising."
    ],
    correctAnswer: 2,
    explanation: "Actively directing one's gaze through an instrument ('looking through the microscope') is a physical dynamic action.",
    explanationBn: "দৃষ্টিপাত করার সক্রিয় শারীরিক ক্রিয়া বোঝাতে 'is looking' Dynamic।"
  },
  {
    id: 18,
    question: "Which of the following verbs of perception CANNOT be used in continuous aspect when describing passive sensory experience?",
    options: [
      "Hear",
      "Listen to",
      "Watch",
      "Look at"
    ],
    correctAnswer: 0,
    explanation: "'Hear' is involuntary sensory perception (Stative), whereas 'listen to', 'watch', and 'look at' are deliberate dynamic actions.",
    explanationBn: "'Hear' অনিচ্ছাকৃত ইন্দ্রিয় অনুভূতি (Stative); কিন্তু 'listen to' বা 'watch' স্বেচ্ছাকৃত সক্রিয় কাজ (Dynamic)।"
  },
  {
    id: 19,
    question: "Spot the error: 'Although he spoke softly, I was hearing (A) every word (B) he uttered clearly (C).'",
    options: [
      "was hearing (A)",
      "every word (B)",
      "he uttered clearly (C)",
      "No error"
    ],
    correctAnswer: 0,
    explanation: "Sensory perception 'hear' resists continuous form; use 'I heard' or 'I could hear every word'.",
    explanationBn: "'Was hearing' ভুল; সঠিক হলো 'I heard' বা 'I could hear'।"
  },
  {
    id: 20,
    question: "Choose the correct sentence involving cognition:",
    options: [
      "Are you remembering the password to the secure server?",
      "Do you remember the password to the secure server?",
      "Have you been remembering the password?",
      "Are you having remembered the password?"
    ],
    correctAnswer: 1,
    explanation: "'Remember' is a cognitive stative verb requiring Simple Present ('Do you remember...?').",
    explanationBn: "'Remember' একটি Stative Verb, তাই 'Do you remember?' হবে।"
  },
  {
    id: 21,
    question: "Fill in the blank: 'The legal agreement ______ six distinct indemnity clauses.'",
    options: [
      "is containing",
      "contains",
      "contain",
      "is contain"
    ],
    correctAnswer: 1,
    explanation: "'Contain' is a stative verb of inclusion taking 3rd person singular 'contains'.",
    explanationBn: "'Contain' একটি Stative Verb, তাই 'contains' হবে।"
  },
  {
    id: 22,
    question: "In the sentence 'She is admiring the sunset from the terrace', the verb 'admire' is used:",
    options: [
      "Statively to mean respect",
      "Dynamically to describe the active gaze of appreciation",
      "As a passive participle",
      "As a modal auxiliary"
    ],
    correctAnswer: 1,
    explanation: "When 'admire' means actively looking at something with pleasure, it functions dynamically ('is admiring the sunset').",
    explanationBn: "সূর্যাস্ত উপভোগ করে দেখার সক্রিয় কাজ বোঝাতে 'admire' Dynamic রূপে ব্যবহৃত হয়েছে।"
  },
  {
    id: 23,
    question: "Which sentence correctly contrasts stative vs dynamic usage of 'appear'?",
    options: [
      "He appears tired (Stative) vs The actor is appearing on stage tonight (Dynamic).",
      "He is appearing tired (Stative) vs The actor appears on stage (Dynamic).",
      "Both sentences are always strictly stative.",
      "Both sentences are always strictly dynamic."
    ],
    correctAnswer: 0,
    explanation: "'Appears tired' = seems (Stative state); 'is appearing on stage' = performing (Dynamic action).",
    explanationBn: "'Appears tired' মানে মনে হওয়া (Stative); কিন্তু মঞ্চে অভিনয় করা অর্থে 'is appearing' (Dynamic)।"
  },
  {
    id: 24,
    question: "Transform into standard English: 'We are agreeing with your proposed curriculum.'",
    options: [
      "We agree with your proposed curriculum.",
      "We are agreed with your proposed curriculum.",
      "We have agreeing with your proposed curriculum.",
      "We do agreeing with your proposed curriculum."
    ],
    correctAnswer: 0,
    explanation: "'Agree' is a cognitive/stative verb of mental assent, requiring Simple Present: 'We agree'.",
    explanationBn: "'Agree' একটি Stative Verb, তাই 'We agree' হবে।"
  },
  {
    id: 25,
    question: "What is the key linguistic diagnostic test to identify a stative verb?",
    options: [
      "Check if the verb can take an adverb ending in -ly.",
      "Check if the verb naturally accepts continuous progressive aspect (*is knowing, *is owning) in standard formal usage.",
      "Check if the verb is regular in its past participle.",
      "Check if the verb has fewer than four letters."
    ],
    correctAnswer: 1,
    explanation: "The hallmark diagnostic test of a stative verb is its natural syntactic resistance to continuous/progressive aspect (*is knowing, *is owning are ungrammatical).",
    explanationBn: "Stative Verb চেনার প্রধান পরীক্ষা হলো এটি স্বাভাবিকভাবে Continuous (-ing) রূপ গ্রহণ করে না।"
  }
];

export default questions;
