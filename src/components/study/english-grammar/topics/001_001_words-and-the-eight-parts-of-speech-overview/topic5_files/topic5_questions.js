// topic5_questions.js
// Topic 5: High-Level Overview of Prepositions, Conjunctions, and Interjections
// 25 Comprehensive Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What is the primary syntactic role of a Preposition in English?",
    options: [
      "To connect a nominal object (noun/pronoun) to another word in the sentence, showing relation of place, time, direction, or agency",
      "To modify verbs directly without an object",
      "To replace the main finite verb",
      "To introduce an exclamatory statement"
    ],
    correctAnswer: 0,
    answer: "To connect a nominal object (noun/pronoun) to another word in the sentence, showing relation of place, time, direction, or agency",
    explanation: "A preposition precedes its nominal complement (prepositional object) and expresses spatial, temporal, causal, or logical relationships.",
    explanationBn: "Preposition তার পরবর্তী Noun বা Pronoun-এর সাথে বাক্যের অন্য কোনো পদের স্থান, কাল, দিক বা কারণজনিত সম্পর্ক স্থাপন করে।",
    hint: "Think about words like 'in', 'on', 'at', 'through'.",
    level: "basic"
  },
  {
    id: 2,
    question: "What case must a pronoun take when it follows a preposition as its object?",
    options: ["Subjective (Nominative) Case", "Objective (Accusative) Case", "Possessive Case", "Vocative Case"],
    correctAnswer: 1,
    answer: "Objective (Accusative) Case",
    explanation: "Prepositions strictly govern the Objective Case (e.g., 'with him', 'between you and me', 'for them').",
    explanationBn: "Preposition-এর পরে Pronoun সর্বদা Objective Case (me, him, them, us) গ্রহণ করে।",
    hint: "Think of 'with him' vs 'with he'.",
    level: "basic"
  },
  {
    id: 3,
    question: "What are the 7 Coordinating Conjunctions in English represented by the mnemonic FANBOYS?",
    options: [
      "For, And, Nor, But, Or, Yet, So",
      "From, At, Near, By, On, You, Since",
      "First, Also, Next, Because, Only, Yet, So",
      "For, After, Neither, But, Over, Yes, Since"
    ],
    correctAnswer: 0,
    answer: "For, And, Nor, But, Or, Yet, So",
    explanation: "The mnemonic FANBOYS stands for: For, And, Nor, But, Or, Yet, So, which join grammatically equal syntactic units.",
    explanationBn: "FANBOYS হলো ৭টি Coordinating Conjunction: For, And, Nor, But, Or, Yet, So, যা সমমর্যাদাসম্পন্ন শব্দ বা ক্লজ যুক্ত করে।",
    hint: "The FANBOYS acronym.",
    level: "basic"
  },
  {
    id: 4,
    question: "What is a Subordinating Conjunction?",
    options: [
      "A conjunction that joins a dependent (subordinate) clause to an independent main clause (e.g., although, because, since, unless)",
      "A conjunction that only joins two single adjectives",
      "A preposition with two objects",
      "An interjection used in formal speeches"
    ],
    correctAnswer: 0,
    answer: "A conjunction that joins a dependent (subordinate) clause to an independent main clause (e.g., although, because, since, unless)",
    explanation: "Subordinating conjunctions introduce adverbial or content clauses that depend on the main clause for complete meaning.",
    explanationBn: "Subordinating Conjunction একটি অপ্রধান (Dependent) ক্লজকে প্রধান (Main) ক্লজের সাথে যুক্ত করে (যেমন: although, because, unless)।",
    hint: "Introduces dependent clauses.",
    level: "intermediate"
  },
  {
    id: 5,
    question: "What is a Correlative Conjunction?",
    options: [
      "Conjunctions used in inseparable paired units (e.g., either...or, neither...nor, not only...but also)",
      "Conjunctions that only appear in dictionary titles",
      "Conjunctions that turn nouns into verbs",
      "Conjunctions that describe color"
    ],
    correctAnswer: 0,
    answer: "Conjunctions used in inseparable paired units (e.g., either...or, neither...nor, not only...but also)",
    explanation: "Correlative conjunctions work in pairs to link grammatically parallel structures.",
    explanationBn: "Correlative Conjunctions হলো জোড়ায় ব্যবহৃত সংযোজক অব্যয় (যেমন: either...or, neither...nor, not only...but also)।",
    hint: "Used in pairs like 'either...or'.",
    level: "intermediate"
  },
  {
    id: 6,
    question: "What grammatical requirement governs Correlative Conjunctions like 'Not only...but also'?",
    options: [
      "Syntactic Parallelism: Both parts must be followed by the exact same grammatical category (e.g., Verb + Verb, or Noun + Noun)",
      "They must always be placed at the end of the paragraph",
      "They can only be followed by numbers",
      "They require passive voice"
    ],
    correctAnswer: 0,
    answer: "Syntactic Parallelism: Both parts must be followed by the exact same grammatical category (e.g., Verb + Verb, or Noun + Noun)",
    explanation: "Parallel structure dictates that whatever part of speech follows 'not only' must also follow 'but also' (e.g., 'not only praised [V] but also rewarded [V]').",
    explanationBn: "সমান্তরাল ব্যাকরণ রীতি (Parallelism) অনুযায়ী 'not only'-র পরে যে পদ বসবে, 'but also'-র পরেও ঠিক একই পদ বসাতে হবে।",
    hint: "Look for parallel parts of speech on both sides.",
    level: "advanced"
  },
  {
    id: 7,
    question: "In the sentence 'Debangshu not only excels in programming but also in public speaking', what is the parallelism flaw?",
    options: [
      "'Not only' precedes the verb 'excels', while 'but also' precedes the prepositional phrase 'in public speaking'",
      "There is no flaw",
      "'Debangshu' is misspelled",
      "'Excels' should be in the past tense"
    ],
    correctAnswer: 0,
    answer: "'Not only' precedes the verb 'excels', while 'but also' precedes the prepositional phrase 'in public speaking'",
    explanation: "To restore parallelism, 'excels' must precede 'not only': 'Debangshu excels not only in programming but also in public speaking'.",
    explanationBn: "ভুলটি হলো: 'not only'-র পর Verb বসেছে কিন্তু 'but also'-র পর Prepositional Phrase বসেছে। সঠিক রূপ: 'Debangshu excels not only in programming but also in public speaking'।",
    hint: "Move the verb 'excels' before 'not only'.",
    level: "advanced"
  },
  {
    id: 8,
    question: "What is an Interjection?",
    options: [
      "A grammatically independent word or exclamation expressing sudden, intense emotion (e.g., Alas!, Hurrah!, Bravo!, Ouch!)",
      "A type of subordinate conjunction",
      "An irregular past participle",
      "A mathematical formula in grammar"
    ],
    correctAnswer: 0,
    answer: "A grammatically independent word or exclamation expressing sudden, intense emotion (e.g., Alas!, Hurrah!, Bravo!, Ouch!)",
    explanation: "Interjections stand outside the syntactic clause structure, conveying spontaneous feeling punctuated by an exclamation mark.",
    explanationBn: "Interjection হলো আকস্মিক তীব্র আবেগ, আনন্দ, দুঃখ বা বিস্ময় প্রকাশক পদ যা ব্যাকরণগতভাবে বাক্যের কাঠামোর বাইরে থাকে (যেমন: Alas!, Hurrah!)।",
    hint: "Words like 'Alas!', 'Hurrah!'.",
    level: "basic"
  },
  {
    id: 9,
    question: "Which of the following sentences correctly demonstrates the distinction between a Preposition and a Conjunction?",
    options: [
      "He arrived after 5 PM (Preposition) vs He arrived after the lecture ended (Conjunction)",
      "He arrived after (Preposition) vs He arrived after 5 PM (Conjunction)",
      "Both are always conjunctions",
      "Both are always prepositions"
    ],
    correctAnswer: 0,
    answer: "He arrived after 5 PM (Preposition) vs He arrived after the lecture ended (Conjunction)",
    explanation: "When followed by a nominal object ('5 PM'), it is a Preposition. When followed by a clause ('the lecture ended'), it is a Conjunction.",
    explanationBn: "যখন Noun/Object-এর পূর্বে বসে ('after 5 PM') তখন তা Preposition; আর যখন পূর্ণাঙ্গ Clause-এর পূর্বে বসে ('after the lecture ended') তখন তা Conjunction।",
    hint: "Check whether a noun phrase or a full clause follows.",
    level: "intermediate"
  },
  {
    id: 10,
    question: "In the sentence 'Swadeep distributed the sweets among the four students', why is 'among' used instead of 'between'?",
    options: [
      "'Among' is used for distribution among more than two distinct entities; 'between' is typically for two",
      "Because 'sweets' is plural",
      "'Between' is only used for inanimate objects",
      "It is an optional stylistic preference"
    ],
    correctAnswer: 0,
    answer: "'Among' is used for distribution among more than two distinct entities; 'between' is typically for two",
    explanation: "Standard traditional convention uses 'between' for two entities and 'among' for three or more in general distribution.",
    explanationBn: "সাধারণত দুজনের মধ্যে ভাগ হলে 'between' এবং দুইয়ের অধিক (যেমন ৪ জন) হলে 'among' ব্যবহৃত হয়।",
    hint: "Two entities vs three or more entities.",
    level: "basic"
  },
  {
    id: 11,
    question: "When can 'between' be correctly used with more than two items in formal English?",
    options: [
      "When naming distinct, reciprocal, or individual relationships between specific entities (e.g., 'A treaty between India, Nepal, and Bhutan')",
      "Never under any circumstances",
      "Only in spoken slang",
      "Only with numbers under 10"
    ],
    correctAnswer: 0,
    answer: "When naming distinct, reciprocal, or individual relationships between specific entities (e.g., 'A treaty between India, Nepal, and Bhutan')",
    explanation: "When distinct, individual entities have mutual, reciprocal relationships (like treaties or matches), 'between' is correct even for 3+ items.",
    explanationBn: "নির্দিষ্ট ও পৃথক রাষ্ট্র বা পক্ষের মধ্যে দ্বিপাক্ষিক/বহুপাক্ষিক চুক্তি বা খেলা নির্দেশ করতে ৩ বা ততোধিক ক্ষেত্রেও 'between' সঠিক।",
    hint: "Think of reciprocal international treaties.",
    level: "advanced"
  },
  {
    id: 12,
    question: "Identify the Subordinating Conjunction in: 'We shall begin the demonstration provided that everyone is seated.'",
    options: ["demonstration", "provided that", "seated", "begin"],
    correctAnswer: 1,
    answer: "provided that",
    explanation: "'Provided that' (meaning on the condition that) is a compound subordinating conjunction introducing a conditional clause.",
    explanationBn: "'provided that' (শর্ত থাকে যে) হলো একটি Compound Subordinating Conjunction।",
    hint: "A multi-word conjunction meaning 'on condition that'.",
    level: "intermediate"
  },
  {
    id: 13,
    question: "Which preposition correctly fills the blank: 'Sukanta Sir has been teaching English in Barrackpore _____ 2010'?",
    options: ["for", "since", "from", "during"],
    correctAnswer: 1,
    answer: "since",
    explanation: "'Since' indicates a specific point in past time from which an action continues to the present (Point of Time). 'For' indicates total duration (Period of Time).",
    explanationBn: "অতীতের নির্দিষ্ট বিন্দু (Point of Time - 2010) নির্দেশ করায় Present Perfect Continuous-এ 'since' বসবে; সময়ের পরিব্যাপ্তি (Period of Time) হলে 'for' বসতো।",
    hint: "Point of time requires 'since'.",
    level: "basic"
  },
  {
    id: 14,
    question: "Which preposition correctly fills the blank: 'Tuhina practiced coding _____ five continuous hours'?",
    options: ["since", "for", "from", "at"],
    correctAnswer: 1,
    answer: "for",
    explanation: "'For' expresses duration or length of time (Period of Time: 5 hours).",
    explanationBn: "সময়ের মোট ব্যাপ্তি বা পরিধি (Period of Time: ৫ ঘণ্টা) নির্দেশ করতে 'for' ব্যবহৃত হয়।",
    hint: "Duration/period of time requires 'for'.",
    level: "basic"
  },
  {
    id: 15,
    question: "What is the error in: 'Despite of heavy rain, Abhronila attended the seminar'?",
    options: [
      "'Despite' never takes the preposition 'of'; it should be either 'Despite heavy rain' or 'In spite of heavy rain'",
      "'Attended' should be 'attending'",
      "'Seminar' should be 'seminars'",
      "There is no error"
    ],
    correctAnswer: 0,
    answer: "'Despite' never takes the preposition 'of'; it should be either 'Despite heavy rain' or 'In spite of heavy rain'",
    explanation: "'Despite' is a single preposition taking a direct noun object without 'of'. 'In spite of' is the three-word prepositional idiom.",
    explanationBn: "'Despite'-এর পরে কখনো 'of' বসে না; লিখতে হবে 'Despite heavy rain' অথবা 'In spite of heavy rain'।",
    hint: "'Despite' does NOT take 'of'.",
    level: "intermediate"
  },
  {
    id: 16,
    question: "Identify the Prepositional Phrase functioning as an adverb in: 'The train arrived with great speed.'",
    options: ["The train", "arrived with", "with great speed", "great speed"],
    correctAnswer: 2,
    answer: "with great speed",
    explanation: "'With great speed' is a prepositional phrase modifying the verb 'arrived' (answering 'How did it arrive?').",
    explanationBn: "'with great speed' হলো Prepositional Phrase যা 'arrived' Verb-এর ধরন নির্দেশ করে Adverb of Manner-এর মতো কাজ করছে।",
    hint: "Preposition + modifiers + noun acting adverbially.",
    level: "intermediate"
  },
  {
    id: 17,
    question: "Which of the following is a Compound Preposition?",
    options: ["In front of", "By", "At", "On"],
    correctAnswer: 0,
    answer: "In front of",
    explanation: "'In front of' is a multi-word compound/phrasal preposition functioning as a single unit.",
    explanationBn: "'In front of' হলো একটি Compound বা Phrasal Preposition।",
    hint: "Consists of multiple words acting as one preposition.",
    level: "basic"
  },
  {
    id: 18,
    question: "In the sentence 'He sat beside me during the lecture', what does 'beside' mean?",
    options: [
      "By the side of / next to",
      "In addition to",
      "Behind",
      "Opposite to"
    ],
    correctAnswer: 0,
    answer: "By the side of / next to",
    explanation: "'Beside' means 'by the side of'. 'Besides' (with an 's') means 'in addition to' or 'moreover'.",
    explanationBn: "'Beside' মানে 'পাশে' (next to), আর 'Besides' মানে 'অধিকন্তু/তাছাড়া' (in addition to)।",
    hint: "'Beside' means next to; 'Besides' means in addition to.",
    level: "intermediate"
  },
  {
    id: 19,
    question: "In the sentence 'Besides English, Debangshu speaks fluent German', what does 'Besides' mean?",
    options: [
      "In addition to",
      "Next to",
      "Without",
      "Before"
    ],
    correctAnswer: 0,
    answer: "In addition to",
    explanation: "'Besides' means 'in addition to' (ইংরেজি ছাড়াও).",
    explanationBn: "'Besides' মানে 'অধিকন্তু' বা 'তাছাড়া' (In addition to)।",
    hint: "Means 'apart from' or 'in addition to'.",
    level: "intermediate"
  },
  {
    id: 20,
    question: "Which sentence correctly pairs 'No sooner' with its standard correlative conjunction?",
    options: [
      "No sooner had the bell rung than the students entered the lab.",
      "No sooner had the bell rung when the students entered the lab.",
      "No sooner had the bell rung then the students entered the lab.",
      "No sooner had the bell rung but the students entered the lab."
    ],
    correctAnswer: 0,
    answer: "No sooner had the bell rung than the students entered the lab.",
    explanation: "'No sooner' is strictly correlated with 'than' (not 'when' or 'then'). 'Hardly/Scarcely' pairs with 'when/before'.",
    explanationBn: "'No sooner'-এর সাথে সর্বদা 'than' বসে ('when' বা 'then' ভুল)। 'Hardly' বা 'Scarcely'-র সাথে 'when' বসে।",
    hint: "'No sooner' always pairs with 'than'.",
    level: "advanced"
  },
  {
    id: 21,
    question: "Which sentence correctly pairs 'Hardly' with its correlative conjunction?",
    options: [
      "Hardly had we stepped outside when the heavy downpour started.",
      "Hardly had we stepped outside than the heavy downpour started.",
      "Hardly had we stepped outside then the heavy downpour started.",
      "Hardly had we stepped outside but the heavy downpour started."
    ],
    correctAnswer: 0,
    answer: "Hardly had we stepped outside when the heavy downpour started.",
    explanation: "'Hardly' and 'Scarcely' pair strictly with 'when' (or 'before'), never 'than'.",
    explanationBn: "'Hardly' এবং 'Scarcely'-র সাথে সর্বদা 'when' ব্যবহৃত হয় ('than' ভুল)।",
    hint: "'Hardly' pairs with 'when'.",
    level: "advanced"
  },
  {
    id: 22,
    question: "In the sentence 'Hark! The temple bells are chiming in the distance', what part of speech is 'Hark'?",
    options: ["Interjection / Exclamatory Imperative", "Preposition", "Conjunction", "Adverb"],
    correctAnswer: 0,
    answer: "Interjection / Exclamatory Imperative",
    explanation: "'Hark!' is an archaic exclamatory call to listen intently, functioning as an Interjection.",
    explanationBn: "'Hark!' হলো মনোযোগ দিয়ে শোনার আহ্বানমূলক আবেগ প্রকাশক Interjection।",
    hint: "An exclamatory call meaning 'Listen!'.",
    level: "intermediate"
  },
  {
    id: 23,
    question: "What is the function of the Conjunction in 'Unless you practice daily, you cannot master grammar'?",
    options: [
      "Subordinating Conjunction of Negative Condition (meaning 'if not')",
      "Coordinating Conjunction of Addition",
      "Correlative Conjunction of Choice",
      "Relative Pronoun"
    ],
    correctAnswer: 0,
    answer: "Subordinating Conjunction of Negative Condition (meaning 'if not')",
    explanation: "'Unless' introduces a negative conditional clause meaning 'if... not' (Unless you practice = If you do not practice).",
    explanationBn: "'Unless' (যদি না) হলো Negative Conditional Subordinating Conjunction (Unless = If not)।",
    hint: "'Unless' means 'if not'.",
    level: "basic"
  },
  {
    id: 24,
    question: "Why is it incorrect to write 'Unless you do not practice...'?",
    options: [
      "Because 'Unless' already contains a negative meaning ('if not'); adding 'not' creates an erroneous double negative",
      "Because 'Unless' can only be used in questions",
      "Because 'do not' is not formal English",
      "There is no error"
    ],
    correctAnswer: 0,
    answer: "Because 'Unless' already contains a negative meaning ('if not'); adding 'not' creates an erroneous double negative",
    explanation: "'Unless' inherently means 'if not'. Adding 'not' produces an incorrect double negative.",
    explanationBn: "'Unless'-এর নিজস্ব অর্থই হলো 'যদি না'। তাই এর সাথে পুনরায় 'not' বসালে Double Negative ভুল হয়।",
    hint: "'Unless' already means 'if not'.",
    level: "intermediate"
  },
  {
    id: 25,
    question: "What is the key takeaway for Prepositions, Conjunctions, and Interjections according to Mentor Sukanta Hui?",
    options: [
      "Prepositions connect words spatially/temporally, Conjunctions synthesize clauses logically, and Interjections express raw human emotion; mastering their exact syntactic pairing guarantees high-scoring prose",
      "Prepositions should always be replaced by nouns",
      "Conjunctions are never used in competitive exams",
      "Interjections must appear in every sentence"
    ],
    correctAnswer: 0,
    answer: "Prepositions connect words spatially/temporally, Conjunctions synthesize clauses logically, and Interjections express raw human emotion; mastering their exact syntactic pairing guarantees high-scoring prose",
    explanation: "These three structural parts of speech supply relational glue, discourse logic, and emotive color to English communication.",
    explanationBn: "Preposition পদগুলোকে সম্পর্কে বাঁধে, Conjunction যুক্তি দিয়ে বাক্য সংযুক্ত করে এবং Interjection অনুভূতি প্রকাশ করে; এদের সঠিক ব্যবহারই নির্ভুল লেখার চাবিকাঠি।",
    hint: "Relational glue, clause logic, and emotive color.",
    level: "basic"
  }
];

export default questions;
