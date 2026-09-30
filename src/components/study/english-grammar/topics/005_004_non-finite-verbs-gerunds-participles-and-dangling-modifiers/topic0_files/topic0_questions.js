const questions = [
  {
    id: "q1",
    question: "What case of noun or pronoun must precede a GERUND in formal standard English?",
    options: [
      "Objective (Accusative) Case (e.g. 'him coming')",
      "Possessive (Genitive) Case (e.g. 'his coming')",
      "Nominative Case (e.g. 'he coming')",
      "Vocative Case"
    ],
    correctAnswer: 1,
    explanation: "Because a gerund is a Verbal NOUN, it must be qualified by a POSSESSIVE determiner/noun: 'I insisted on HIS coming', 'She objected to RAHUL'S smoking'.",
    explanationBn: "Gerund যেহেতু একটি Verbal Noun (ক্রিয়াবাচক বিশেষ্য), তাই এর পূর্বে সর্বদাই Possessive Case বসে (যেমন: 'his coming', 'Swadeep's going')।"
  },
  {
    id: "q2",
    question: "Identify the sentence that correctly obeys the possessive case rule before a gerund:",
    options: [
      "I appreciate you helping me with the project.",
      "I appreciate your helping me with the project.",
      "I appreciate you to help me with the project.",
      "I appreciate yourself helping me."
    ],
    correctAnswer: 1,
    explanation: "'Helping' is a gerund functioning as the direct object of 'appreciate'. The modifier must be the possessive 'your' ('your helping').",
    explanationBn: "'Helping' Gerund হওয়ায় এর পূর্বে Possessive Adjective 'your' বসবে: 'I appreciate your helping me'।"
  },
  {
    id: "q3",
    question: "What is the definitive diagnostic test to distinguish a GERUND from a PRESENT PARTICIPLE?",
    options: [
      "A Gerund can be replaced by a noun or the pronoun 'IT' (noun function); a Present Participle describes an ongoing action or modifies a noun (adjective/verb function).",
      "Gerunds only end in -ed; participles end in -ing.",
      "There is no difference.",
      "Gerunds can never be subjects."
    ],
    correctAnswer: 0,
    explanation: "Gerund = Verb-Noun (e.g. 'Swimming is good' -> 'It is good'). Present Participle = Verb-Adjective (e.g. 'I saw a swimming duck' -> 'a duck that was swimming').",
    explanationBn: "Gerund হলো Verbal Noun (যাকে 'It' বা Noun দিয়ে প্রতিস্থাপন করা যায়); আর Present Participle হলো Verbal Adjective (যা গুণ বা চলমান কাজ বোঝায়)।"
  },
  {
    id: "q4",
    question: "Identify the GERUND in: 'Reading books expands intellectual horizons.'",
    options: [
      "Reading",
      "books",
      "expands",
      "intellectual"
    ],
    correctAnswer: 0,
    explanation: "'Reading' is a gerund acting as the subject of the sentence ('It expands horizons').",
    explanationBn: "'Reading' এখানে বাক্যের Subject হিসেবে Verbal Noun (Gerund)।"
  },
  {
    id: "q5",
    question: "Identify the PRESENT PARTICIPLE in: 'Barking dogs seldom bite.'",
    options: [
      "Barking",
      "dogs",
      "seldom",
      "bite"
    ],
    correctAnswer: 0,
    explanation: "'Barking' is a Present Participle functioning adjectivally to describe the noun 'dogs'.",
    explanationBn: "'Barking' শব্দটি Noun 'dogs'-কে বর্ণনা করায় এটি Present Participle (Verbal Adjective)।"
  },
  {
    id: "q6",
    question: "Why is the sentence 'Walking in the garden, a snake bit him' grammatically flawed (DANGLING PARTICIPLE)?",
    options: [
      "Because snakes do not live in gardens.",
      "Because the implied subject of the participle 'Walking' grammatically attaches to the subject of the main clause ('a snake'), creating the absurd meaning that the snake was walking in the garden!",
      "Because 'bit' is the wrong past tense.",
      "Because 'walking' should be an infinitive."
    ],
    correctAnswer: 1,
    explanation: "A dangling participle occurs when the subject of the participial phrase does not match the subject of the main clause. The snake was not walking; the man was.",
    explanationBn: "Dangling Modifier-এর কারণে মনে হচ্ছে সাপটি বাগানে হাঁটছিল! ব্যাকরণগতভাবে Participle-এর কর্তা Main Clause-এর Subject-এর সাথে মিলতে হবে।"
  },
  {
    id: "q7",
    question: "How should 'Walking in the garden, a snake bit him' be correctly rewritten?",
    options: [
      "While he was walking in the garden, a snake bit him.",
      "Walking in the garden, he was bitten by a snake.",
      "Both A and B are correct repairs.",
      "Walking in the garden, bit him a snake."
    ],
    correctAnswer: 2,
    explanation: "Both A (converting to an adverbial clause 'While he was walking') and B (making 'he' the subject in passive 'he was bitten') accurately repair the dangling participle.",
    explanationBn: "A ('While he was walking...') এবং B ('he was bitten by a snake') উভয়ভাবেই Dangling Modifier-এর ত্রুটি সংশোধন করা যায়।"
  },
  {
    id: "q8",
    question: "What is a NOMINATIVE ABSOLUTE construction?",
    options: [
      "A noun or pronoun combined with a participle, forming an independent phrase syntactically unattached to the main clause predicate.",
      "A complete declarative sentence.",
      "A clause starting with 'that'.",
      "A sentence with no subject."
    ],
    correctAnswer: 0,
    explanation: "A Nominative Absolute is a grammatically independent nominal + participle unit (e.g. 'The sun having set, we returned home').",
    explanationBn: "Nominative Absolute হলো একটি স্বাধীন Noun + Participle গুচ্ছ যা মূল বাক্যের সাথে ব্যাকরণগতভাবে সরাসরি যুক্ত থাকে না (যেমন: 'The weather being fine, we set out')।"
  },
  {
    id: "q9",
    question: "Which of the following is a correct NOMINATIVE ABSOLUTE sentence?",
    options: [
      "Being a rainy day, I stayed indoors. (Dangling error)",
      "It being a rainy day, I stayed indoors.",
      "Having a rainy day, I stayed indoors.",
      "Rainy day being, I stayed indoors."
    ],
    correctAnswer: 1,
    explanation: "In 'Being a rainy day, I stayed indoors', the implied subject attaches to 'I' (meaning 'I was a rainy day' [Wrong!]). The pronoun 'It' must be supplied to create the valid Nominative Absolute: 'It being a rainy day, I stayed indoors'.",
    explanationBn: "'Being a rainy day' লিখলে বোঝায় 'আমি একটি বৃষ্টির দিন'! তাই স্বাধীন কর্তা 'It' যোগ করে 'It being a rainy day' লিখতে হবে।"
  },
  {
    id: "q10",
    question: "Which of the following verbs is strictly followed by a GERUND (never an infinitive)?",
    options: [
      "Avoid",
      "Enjoy",
      "Postpone",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "'Avoid', 'enjoy', 'postpone', 'mind', 'admit', 'deny', 'finish', 'suggest', and 'look forward to' must take gerunds (e.g. 'He avoided meeting her', 'She enjoys swimming').",
    explanationBn: "'Avoid', 'enjoy', 'postpone', 'mind'-এর পর সর্বদাই Gerund (-ing) বসে।"
  },
  {
    id: "q11",
    question: "What is the meaning difference between 'He stopped smoking' and 'He stopped to smoke'?",
    options: [
      "'Stopped smoking' means he quit the habit of smoking permanently; 'Stopped to smoke' means he paused another ongoing activity in order to smoke a cigarette.",
      "'Stopped to smoke' means he gave up smoking.",
      "Both mean he quit smoking.",
      "There is no difference."
    ],
    correctAnswer: 0,
    explanation: "Stop + Gerund = cease the activity. Stop + To-infinitive = halt one action in order to perform another action.",
    explanationBn: "'Stopped smoking' অর্থ ধূমপানের অভ্যাস চিরতরে ত্যাগ করা; আর 'stopped to smoke' অর্থ অন্য কাজ থামিয়ে ধূমপান করার জন্য বিরতি নেওয়া।"
  },
  {
    id: "q12",
    question: "What is the difference between 'I remember locking the door' and 'I remembered to lock the door'?",
    options: [
      "'Remember locking' looks back at the past memory of having performed the action; 'Remembered to lock' means I did not forget the duty and locked it.",
      "'Remembered to lock' means I forgot to lock it.",
      "Both mean I forgot the key.",
      "There is no difference."
    ],
    correctAnswer: 0,
    explanation: "Remember + Gerund = recall a past completed action. Remember + Infinitive = remember a duty/task and perform it.",
    explanationBn: "'Remember locking' অতীতের কোনো স্মৃতির দৃশ্য মনে করা; আর 'remembered to lock' কোনো দায়িত্ব ভুলে না গিয়ে তা পালন করা বোঝায়।"
  },
  {
    id: "q13",
    question: "Identify the PERFECT PARTICIPLE in: 'Having finished his homework, Rahul went out to play.'",
    options: [
      "Having finished",
      "homework",
      "went",
      "to play"
    ],
    correctAnswer: 0,
    explanation: "'Having + V3 (finished)' is the Perfect Participle, indicating that the first action was fully completed before the second began.",
    explanationBn: "'Having finished' হলো Perfect Participle, যা প্রথম কাজটি সম্পূর্ণরূপে শেষ হওয়ার পর দ্বিতীয় কাজটি শুরু হওয়া নির্দেশ করে।"
  },
  {
    id: "q14",
    question: "In the sentence 'I am looking forward to _______ you', which form correctly completes the idiom?",
    options: [
      "meet",
      "meeting",
      "have met",
      "be met"
    ],
    correctAnswer: 1,
    explanation: "In 'look forward to', 'to' is a PREPOSITION (not an infinitive marker). Prepositions are followed by Gerunds ('meeting'), not bare verbs.",
    explanationBn: "'Look forward to'-তে 'to' একটি Preposition, তাই এর পর Verb-এর সাথে '-ing' (Gerund) 'meeting' বসবে।"
  },
  {
    id: "q15",
    question: "Which of the following phrases containing 'to' is a PREPOSITION requiring a GERUND?",
    options: [
      "With a view to",
      "Accustomed to",
      "Addicted to",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "'With a view to', 'accustomed to', 'addicted to', 'averse to', and 'devoted to' all end in true prepositions and MUST be followed by gerunds (e.g. 'with a view to purchasing a home').",
    explanationBn: "'With a view to', 'addicted to', 'accustomed to'-র 'to' একটি Preposition হওয়ায় এদের পর সর্বদা Gerund (-ing) বসে।"
  },
  {
    id: "q16",
    question: "Identify the MISPLACED PARTICIPLE in: 'Soiled with mud, the lady washed her children's clothes.'",
    options: [
      "The clothes were soiled with mud, but the participial modifier 'Soiled with mud' is misplaced next to 'the lady', suggesting the lady herself was covered in mud.",
      "The sentence is completely flawless.",
      "'Washed' should be 'washing'.",
      "'Children's' lacks an apostrophe."
    ],
    correctAnswer: 0,
    explanation: "Modifiers must be placed adjacent to the word they describe. Say: 'The lady washed her children's clothes, which were soiled with mud' (or 'Soiled with mud, the clothes were washed by the lady').",
    explanationBn: "'Soiled with mud' কাপড়কে বিশেষিত করা উচিত ছিল, কিন্তু 'the lady'-র পাশে বসায় ভুল অর্থ তৈরি হয়েছে।"
  },
  {
    id: "q17",
    question: "What is the function of the gerund in: 'Her favorite hobby is painting landscapes.'",
    options: [
      "Subject Complement",
      "Direct Object",
      "Prepositional Object",
      "Adverbial modifier"
    ],
    correctAnswer: 0,
    explanation: "'Painting' follows the linking verb 'is' and explains the subject 'hobby', functioning as a Subject Complement.",
    explanationBn: "'Painting' Linking Verb 'is'-এর পর বসে Subject 'hobby'-র পরিচয় সম্পন্ন করায় এটি Subject Complement।"
  },
  {
    id: "q18",
    question: "Choose the correct sentence:",
    options: [
      "She prevented me from to enter the hall.",
      "She prevented me from entering the hall.",
      "She prevented me to enter the hall.",
      "She prevented my entering the hall to."
    ],
    correctAnswer: 1,
    explanation: "'Prevent + object + FROM + Gerund (-ing)' is the fixed prepositional idiom: 'prevented me from entering'.",
    explanationBn: "'Prevent'-এর পর 'from + Gerund' বসে: 'prevented me from entering'।"
  },
  {
    id: "q19",
    question: "In 'A rolling stone gathers no moss', what is 'rolling'?",
    options: [
      "Gerund",
      "Present Participle",
      "Past Participle",
      "Finite Verb"
    ],
    correctAnswer: 1,
    explanation: "'Rolling' is a Present Participle functioning as an attributive adjective modifying the noun 'stone'.",
    explanationBn: "'Rolling' Noun 'stone'-কে বিশেষিত করায় এটি Present Participle (Verbal Adjective)।"
  },
  {
    id: "q20",
    question: "In 'The rolling of the ship made us nauseous', what is 'rolling'?",
    options: [
      "Gerund (Verbal Noun qualified by 'The' and 'of')",
      "Present Participle",
      "Infinitive",
      "Adverb"
    ],
    correctAnswer: 0,
    explanation: "When an -ing word is preceded by 'the' and followed by 'of', it operates as a Verbal Noun / Gerund.",
    explanationBn: "'The + -ing + of' গঠনটি খাঁটি Verbal Noun (Gerund) হিসেবে কাজ করে।"
  },
  {
    id: "q21",
    question: "Select the sentence with correct possessive agreement before a gerund:",
    options: [
      "There is no harm in him trying again.",
      "There is no harm in his trying again.",
      "There is no harm in he trying again.",
      "There is no harm in himself trying again."
    ],
    correctAnswer: 1,
    explanation: "'Trying' is a gerund; the modifier must be the possessive 'his': 'in his trying again'.",
    explanationBn: "Gerund 'trying'-এর পূর্বে Possessive Pronoun 'his' বসবে: 'in his trying again'।"
  },
  {
    id: "q22",
    question: "Identify the error in: 'Sitting on the porch, a bee stung Swadeep.'",
    options: [
      "Dangling Participle: It grammatically implies the bee was sitting on the porch.",
      "'Stung' is incorrect.",
      "'Swadeep' should be capitalized differently.",
      "No error."
    ],
    correctAnswer: 0,
    explanation: "The bee was not sitting on the porch; Swadeep was. Correct: 'While Swadeep was sitting on the porch, a bee stung him' (or 'Sitting on the porch, Swadeep was stung by a bee').",
    explanationBn: "Dangling Participle-এর কারণে মনে হচ্ছে মৌমাছিটি বারান্দায় বসেছিল! শুদ্ধ রূপ: 'While Swadeep was sitting on the porch, a bee stung him'।"
  },
  {
    id: "q23",
    question: "What does 'I regret telling you this secret' mean?",
    options: [
      "I am sorry about the fact that I told you the secret in the past.",
      "I am about to tell you the secret now with hesitation.",
      "I forgot the secret.",
      "I will never tell the secret."
    ],
    correctAnswer: 0,
    explanation: "Regret + Gerund = feeling sorrow/repentance about a past completed action. (Regret + Infinitive = apologizing in advance before delivering bad news).",
    explanationBn: "'Regret + Gerund' অতীতে করা কোনো কাজের জন্য অনুশোচনা প্রকাশ করে।"
  },
  {
    id: "q24",
    question: "Identify the PAST PARTICIPLE functioning as an adjective in: 'The broken window was repaired.'",
    options: [
      "broken",
      "window",
      "was",
      "repaired"
    ],
    correctAnswer: 0,
    explanation: "'Broken' is a Past Participle (V3) modifying the subject noun 'window' attributively.",
    explanationBn: "'Broken' হলো Past Participle যা Noun 'window'-কে বিশেষিত করেছে।"
  },
  {
    id: "q25",
    question: "Why is 'I object to him joining our team' considered an error in competitive grammar tests?",
    options: [
      "Because 'joining' is a gerund and requires the possessive 'his' ('his joining').",
      "Because 'object' cannot take 'to'.",
      "Because 'team' is singular.",
      "Because 'our' is redundant."
    ],
    correctAnswer: 0,
    explanation: "In formal testing, nouns/pronouns modifying gerunds must take possessive case ('his joining').",
    explanationBn: "Gerund 'joining'-এর পূর্বে Possessive 'his' বসা বাধ্যতামূলক: 'I object to his joining'।"
  }
];

export default questions;
