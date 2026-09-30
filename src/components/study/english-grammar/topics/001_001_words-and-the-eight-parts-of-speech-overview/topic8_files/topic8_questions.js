// topic8_questions.js
// Topic 8: Module 001_001 Grand Capstone Assessment & Diagnostic Lab
// 30 Comprehensive Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "Which of the following is the fundamental governing principle of English word classification?",
    options: [
      "A word's part of speech is permanently determined by its dictionary spelling",
      "A word's part of speech is determined entirely by its syntactic function in a specific sentence context",
      "All words ending in '-ly' must be adverbs",
      "Closed class words can be freely coined at any time"
    ],
    correctAnswer: 1,
    answer: "A word's part of speech is determined entirely by its syntactic function in a specific sentence context",
    explanation: "Syntactic function in context dictates word category, not static lexical appearance.",
    explanationBn: "ইংরেজিতে কোনো শব্দের Part of Speech তার বাহ্যিক রূপ নয়, বরং বাক্যের অভ্যন্তরীণ Syntactic Function দ্বারা নির্ধারিত হয়।",
    hint: "Function always takes precedence over form.",
    level: "basic"
  },
  {
    id: 2,
    question: "Which of the following belongs strictly to the Open Class of words?",
    options: ["Preposition", "Conjunction", "Lexical Verb", "Pronoun"],
    correctAnswer: 2,
    answer: "Lexical Verb",
    explanation: "Lexical (main) verbs are Open Class items that continuously expand with new cultural and technological coinages.",
    explanationBn: "মূল কাজ প্রকাশক Verb (Lexical Verb) হলো Open Class, যা নিত্যনতুন শব্দ গ্রহণ করে বৃদ্ধি পায়।",
    hint: "Think about which class admits new words like 'to google'.",
    level: "basic"
  },
  {
    id: 3,
    question: "Approximately how many structural words constitute the entire Closed Class of Modern English?",
    options: ["Over 200,000 words", "Roughly 300 to 400 words", "Exactly 26 words", "Zero words"],
    correctAnswer: 1,
    answer: "Roughly 300 to 400 words",
    explanation: "The functional framework of English grammar consists of a compact, finite inventory of around 300-400 closed class words.",
    explanationBn: "ইংরেজি ভাষার সমগ্র Closed Class মাত্র প্রায় ৩০০ থেকে ৪০০টি শব্দের সমন্বয়ে গঠিত।",
    hint: "A surprisingly small number that forms the grammatical skeleton.",
    level: "intermediate"
  },
  {
    id: 4,
    question: "In the sentence 'He ran fast to board the fast train', what are the parts of speech of the two instances of 'fast'?",
    options: [
      "Adverb of Manner and Attributive Adjective",
      "Adjective and Adverb",
      "Noun and Verb",
      "Adverb and Preposition"
    ],
    correctAnswer: 0,
    answer: "Adverb of Manner and Attributive Adjective",
    explanation: "The first 'fast' modifies the action verb 'ran' (Adverb). The second 'fast' qualifies the noun 'train' (Adjective).",
    explanationBn: "প্রথম 'fast' 'ran' Verb-কে modify করায় Adverb, আর দ্বিতীয় 'fast' 'train' Noun-কে qualify করায় Adjective।",
    hint: "Modifies verb 'ran' vs qualifies noun 'train'.",
    level: "basic"
  },
  {
    id: 5,
    question: "Why is the word 'friendly' an Adjective rather than an Adverb?",
    options: [
      "Because Noun ('Friend') + '-ly' creates an Adjective; Adjective ('Quick') + '-ly' creates an Adverb",
      "Because it has eight letters",
      "Because it cannot be used with people",
      "It is a dialectal slang"
    ],
    correctAnswer: 0,
    answer: "Because Noun ('Friend') + '-ly' creates an Adjective; Adjective ('Quick') + '-ly' creates an Adverb",
    explanation: "Morphological rule: Noun + -ly = Adjective (friendly, lovely, cowardly). Adjective + -ly = Adverb (quickly, bravely).",
    explanationBn: "Noun + '-ly' = Adjective (Friend + ly = Friendly)। Adjective + '-ly' = Adverb (Quick + ly = Quickly)।",
    hint: "Noun + ly produces an adjective.",
    level: "basic"
  },
  {
    id: 6,
    question: "What is the correct way to express 'He spoke in a friendly manner' using an adverbial structure?",
    options: [
      "He spoke friendly.",
      "He spoke in a friendly manner / way.",
      "He spoke friendlily.",
      "He spoke friendly-like."
    ],
    correctAnswer: 1,
    answer: "He spoke in a friendly manner / way.",
    explanation: "'Friendly' is an adjective and must be framed in a prepositional phrase ('in a friendly manner') to modify a verb.",
    explanationBn: "'friendly' একটি Adjective হওয়ায় Verb-কে modify করতে Prepositional Phrase ব্যবহার করতে হয়: 'in a friendly manner'।",
    hint: "Prepositional phrase 'in a ... manner'.",
    level: "intermediate"
  },
  {
    id: 7,
    question: "In the sentence 'The moon revolves round the earth', identify the part of speech of 'round':",
    options: ["Preposition", "Adjective", "Noun", "Verb"],
    correctAnswer: 0,
    answer: "Preposition",
    explanation: "'Round' is followed by the nominal object 'the earth', showing spatial orbital relation. Hence, it is a Preposition.",
    explanationBn: "'the earth' Noun-এর পূর্বে বসে স্থানিক সম্পর্ক নির্দেশ করায় 'round' হলো Preposition।",
    hint: "Governs the object 'the earth'.",
    level: "basic"
  },
  {
    id: 8,
    question: "In 'The physician made his morning round in the hospital', what part of speech is 'round'?",
    options: ["Noun", "Adjective", "Verb", "Preposition"],
    correctAnswer: 0,
    answer: "Noun",
    explanation: "'Round' acts as the direct object of 'made', meaning an inspection circuit. Hence, it is a Noun.",
    explanationBn: "হাসপাতালের নিয়মিত পরিদর্শন অর্থে 'round' শব্দটি এখানে Noun হিসেবে ব্যবহৃত হয়েছে।",
    hint: "Acts as a direct object meaning inspection circuit.",
    level: "intermediate"
  },
  {
    id: 9,
    question: "In 'The sports car can easily round that dangerous curve', what part of speech is 'round'?",
    options: ["Transitive Verb", "Preposition", "Adjective", "Adverb"],
    correctAnswer: 0,
    answer: "Transitive Verb",
    explanation: "'Round' is the finite modal infinitive verb meaning to pass around, taking 'that dangerous curve' as direct object.",
    explanationBn: "বাঁক ঘোরার কাজটি প্রকাশ করে 'round' এখানে Finite Verb হিসেবে কাজ করছে।",
    hint: "Action of passing around a curve.",
    level: "intermediate"
  },
  {
    id: 10,
    question: "In 'All the candidates but Swadeep cleared the coding round', what part of speech is 'but'?",
    options: ["Preposition (meaning except)", "Coordinating Conjunction", "Adverb", "Relative Pronoun"],
    correctAnswer: 0,
    answer: "Preposition (meaning except)",
    explanation: "'But' means 'except' and takes the nominal object 'Swadeep'. Hence, it functions as a Preposition.",
    explanationBn: "'but' শব্দটি 'except' (ব্যতীত) অর্থে 'Swadeep' Noun-এর পূর্বে বসে Preposition হিসেবে কাজ করছে।",
    hint: "Means 'except'.",
    level: "intermediate"
  },
  {
    id: 11,
    question: "In 'Swadeep coded for ten hours, but he was not fatigued', what part of speech is 'but'?",
    options: ["Coordinating Conjunction", "Preposition", "Adverb", "Interjection"],
    correctAnswer: 0,
    answer: "Coordinating Conjunction",
    explanation: "'But' joins two independent coordinate clauses with contrasting ideas (FANBOYS).",
    explanationBn: "দুটি স্বাধীন বাক্যকে বিপরীত ভাব সহকারে যুক্ত করায় 'but' হলো Coordinating Conjunction।",
    hint: "FANBOYS coordinator.",
    level: "basic"
  },
  {
    id: 12,
    question: "In 'He is but a young apprentice', what part of speech is 'but'?",
    options: ["Adverb of Degree / Manner (meaning only/merely)", "Preposition", "Conjunction", "Noun"],
    correctAnswer: 0,
    answer: "Adverb of Degree / Manner (meaning only/merely)",
    explanation: "'But' modifies the predicate phrase meaning 'merely' or 'only'. Hence, it is an Adverb.",
    explanationBn: "'but' শব্দটি 'only' বা 'merely' (কেবলমাত্র) অর্থে ব্যবহৃত হয়ে Adverb হিসেবে কাজ করছে।",
    hint: "Substitute 'only' in the sentence.",
    level: "advanced"
  },
  {
    id: 13,
    question: "Which of the following represents a common Bengali learner translation trap caused by the zero-copula structure in Bengali?",
    options: [
      "*'He a doctor'* instead of 'He is a doctor'",
      "*'He is reading'* instead of 'He reads'",
      "*'He speaks English'*",
      "*'They arrived on time'*"
    ],
    correctAnswer: 0,
    answer: "*'He a doctor'* instead of 'He is a doctor'",
    explanation: "Because Bengali allows 'সে ডাক্তার' without an overt verb, regional learners often drop the mandatory English linking verb 'is'.",
    explanationBn: "বাংলায় 'সে ডাক্তার' বাক্যে কোনো ক্রিয়াপদ না থাকায় শিক্ষার্থীরা প্রায়ই 'is' বাদ দিয়ে ভুল করে।",
    hint: "Missing linking verb trap.",
    level: "basic"
  },
  {
    id: 14,
    question: "Which sentence correctly demonstrates that Stative Verbs of cognition/possession resist progressive (-ing) aspects?",
    options: [
      "I know the solution to this algorithm.",
      "I am knowing the solution to this algorithm.",
      "I am understanding this topic.",
      "He is having two laptops in his bag."
    ],
    correctAnswer: 0,
    answer: "I know the solution to this algorithm.",
    explanation: "'Know', 'understand', and stative 'have' resist continuous tenses in standard English.",
    explanationBn: "Stative Verb হিসেবে 'know' কখনো Continuous Tense গ্রহণ করে না; সঠিক বাক্য: 'I know the solution'।",
    hint: "Stative verbs do not take progressive -ing.",
    level: "intermediate"
  },
  {
    id: 15,
    question: "What is the correct pronoun case in: 'The mentor distributed the books between you and _____.'?",
    options: ["me", "I", "myself", "he"],
    correctAnswer: 0,
    answer: "me",
    explanation: "Prepositions ('between') strictly govern the Objective Case ('you and me').",
    explanationBn: "Preposition 'between'-এর পর সর্বদা Objective Case 'me' বসবে ('Between you and me')।",
    hint: "Prepositions require objective case.",
    level: "intermediate"
  },
  {
    id: 16,
    question: "What is the Royal Order of Adjectives according to OSASCOMP?",
    options: [
      "Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material -> Purpose",
      "Origin -> Material -> Purpose -> Opinion -> Size -> Age -> Shape -> Color",
      "Size -> Age -> Shape -> Color -> Opinion -> Material -> Origin -> Purpose",
      "Purpose -> Material -> Color -> Shape -> Age -> Size -> Opinion -> Origin"
    ],
    correctAnswer: 0,
    answer: "Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material -> Purpose",
    explanation: "OSASCOMP: Opinion, Size, Age, Shape, Color, Origin, Material, Purpose.",
    explanationBn: "একাধিক Adjective পাশাপাশি বসলে তাদের সঠিক ক্রম: Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material -> Purpose (OSASCOMP)।",
    hint: "The OSASCOMP mnemonic.",
    level: "advanced"
  },
  {
    id: 17,
    question: "Which sentence correctly follows the MPT rule for multiple adverb placement?",
    options: [
      "Debangshu presented flawlessly [M] in the auditorium [P] yesterday [T].",
      "Debangshu presented yesterday [T] flawlessly [M] in the auditorium [P].",
      "Debangshu presented in the auditorium [P] yesterday [T] flawlessly [M].",
      "Debangshu presented yesterday in the auditorium flawlessly."
    ],
    correctAnswer: 0,
    answer: "Debangshu presented flawlessly [M] in the auditorium [P] yesterday [T].",
    explanation: "The natural adverb chain order is Manner -> Place -> Time (MPT).",
    explanationBn: "Adverb-এর সঠিক ক্রম হলো: Manner (কীভাবে) -> Place (কোথায়) -> Time (কখন) (MPT Rule)।",
    hint: "Manner first, then Place, then Time.",
    level: "advanced"
  },
  {
    id: 18,
    question: "What is the semantic difference between 'He works hard' and 'He hardly works'?",
    options: [
      "'Works hard' = with great effort; 'Hardly works' = almost does not work at all",
      "They are identical in meaning",
      "'Hardly works' is more formal",
      "'Hardly' is the comparative degree of 'hard'"
    ],
    correctAnswer: 0,
    answer: "'Works hard' = with great effort; 'Hardly works' = almost does not work at all",
    explanation: "'Hard' as an adverb means vigorously. 'Hardly' is a semi-negative adverb of degree meaning scarcely or barely.",
    explanationBn: "'He works hard' মানে সে কঠোর পরিশ্রম করে, আর 'He hardly works' মানে সে প্রায় কোনো কাজই করে না।",
    hint: "Hard = diligent; Hardly = almost never.",
    level: "basic"
  },
  {
    id: 19,
    question: "Why is 'The rose smells sweetly' considered grammatically INCORRECT in standard English?",
    options: [
      "'Smells' is a sensory linking verb describing the condition of the subject, requiring an ADJECTIVE complement ('sweet')",
      "'Sweetly' is not an English word",
      "'Rose' is an uncountable noun",
      "It is a passive voice violation"
    ],
    correctAnswer: 0,
    answer: "'Smells' is a sensory linking verb describing the condition of the subject, requiring an ADJECTIVE complement ('sweet')",
    explanation: "Sensory linking verbs take adjective subject complements. Correct: 'The rose smells sweet'.",
    explanationBn: "'smell' এখানে Linking Verb হিসেবে গোলাপের গন্ধের প্রকৃতি প্রকাশ করছে, তাই Adjective 'sweet' বসবে ('sweetly' ভুল)।",
    hint: "Linking verbs take adjective complements.",
    level: "intermediate"
  },
  {
    id: 20,
    question: "Which of the following is an invariant Correlative Conjunction pair?",
    options: [
      "No sooner... than",
      "No sooner... when",
      "No sooner... then",
      "No sooner... but"
    ],
    correctAnswer: 0,
    answer: "No sooner... than",
    explanation: "'No sooner' is strictly correlated with 'than'. ('Hardly/Scarcely' pairs with 'when').",
    explanationBn: "'No sooner'-এর সাথে সর্বদা 'than' বসে ('when' বা 'then' ভুল)।",
    hint: "'No sooner' always takes 'than'.",
    level: "advanced"
  },
  {
    id: 21,
    question: "What is the error in: 'Despite of his illness, he attended the masterclass'?",
    options: [
      "'Despite' never takes the preposition 'of'; write either 'Despite his illness' or 'In spite of his illness'",
      "'Attended' should be 'attend'",
      "'Masterclass' should be 'masterclasses'",
      "There is no error"
    ],
    correctAnswer: 0,
    answer: "'Despite' never takes the preposition 'of'; write either 'Despite his illness' or 'In spite of his illness'",
    explanation: "'Despite' is a standalone preposition taking a direct noun object. 'Of' is only part of 'in spite of'.",
    explanationBn: "'Despite'-এর পরে কখনো 'of' বসে না; লিখতে হবে 'Despite his illness' অথবা 'In spite of his illness'।",
    hint: "'Despite' does NOT take 'of'.",
    level: "basic"
  },
  {
    id: 22,
    question: "In the sentence 'Unless you work diligently, you will not succeed', what does 'Unless' mean?",
    options: [
      "If you do not (Negative condition)",
      "Because you work",
      "Although you work",
      "As soon as you work"
    ],
    correctAnswer: 0,
    answer: "If you do not (Negative condition)",
    explanation: "'Unless' inherently means 'if not' and introduces a negative condition.",
    explanationBn: "'Unless' (যদি না) হলো Negative Conditional Conjunction যার অর্থ 'If not'।",
    hint: "'Unless' = 'If not'.",
    level: "basic"
  },
  {
    id: 23,
    question: "In 'Bravo! You executed the algorithm flawlessly', what part of speech is 'Bravo!'?",
    options: ["Interjection", "Preposition", "Conjunction", "Adverb"],
    correctAnswer: 0,
    answer: "Interjection",
    explanation: "'Bravo!' is an emotive exclamation expressing high praise and standing outside syntactic clause architecture.",
    explanationBn: "'Bravo!' হলো প্রশংসা ও আনন্দ প্রকাশক Interjection।",
    hint: "An exclamatory word of praise.",
    level: "basic"
  },
  {
    id: 24,
    question: "In 'Swimming is an invigorating physical activity', what is 'Swimming'?",
    options: ["Gerund (Verbal Noun functioning as Subject)", "Present Continuous Verb", "Participle Adjective", "Infinitive"],
    correctAnswer: 0,
    answer: "Gerund (Verbal Noun functioning as Subject)",
    explanation: "'Swimming' is a V1+-ing word functioning as the nominal subject of 'is'. Hence, it is a Gerund.",
    explanationBn: "'Swimming' শব্দটি বাক্যের Subject হিসেবে Noun-এর কাজ করায় এটি Gerund (ক্রিয়াবাচক বিশেষ্য)।",
    hint: "-ing word acting as the subject of the clause.",
    level: "intermediate"
  },
  {
    id: 25,
    question: "In 'Swadeep gave Debangshu a high-performance laptop', what is 'Debangshu'?",
    options: ["Indirect Object", "Direct Object", "Subject Complement", "Object Complement"],
    correctAnswer: 0,
    answer: "Indirect Object",
    explanation: "'Debangshu' is the recipient of the laptop, answering 'To whom did Swadeep give it?'. Hence, it is the Indirect Object.",
    explanationBn: "'Debangshu' এখানে 'gave' Verb-এর পরোক্ষ কর্ম (Indirect Object), কারণ সে ল্যাপটপটি গ্রহণ করেছে।",
    hint: "The recipient answering 'To whom?'.",
    level: "intermediate"
  },
  {
    id: 26,
    question: "In 'The committee appointed Abhronila head of operations', what is 'head of operations'?",
    options: ["Object Complement", "Subject Complement", "Direct Object", "Indirect Object"],
    correctAnswer: 0,
    answer: "Object Complement",
    explanation: "'Head of operations' renames and designates the status of the direct object 'Abhronila' after 'appointed'.",
    explanationBn: "'head of operations' Direct Object 'Abhronila'-র পদমর্যাদা প্রকাশ করায় Object Complement।",
    hint: "Renames the direct object after 'appointed'.",
    level: "advanced"
  },
  {
    id: 27,
    question: "Which of the following sentences correctly demonstrates Syntactic Parallelism with 'Not only... but also'?",
    options: [
      "Tuhina not only designed the user interface but also developed the backend API.",
      "Tuhina designed not only the user interface but also developed the backend API.",
      "Tuhina not only designed the user interface but also the backend API.",
      "Not only Tuhina designed the interface but developed the API."
    ],
    correctAnswer: 0,
    answer: "Tuhina not only designed the user interface but also developed the backend API.",
    explanation: "Both 'not only' and 'but also' are followed by Verb Phrases ('designed the user interface' and 'developed the backend API'), maintaining perfect grammatical parallelism.",
    explanationBn: "'not only'-র পরে Verb Phrase ('designed...') এবং 'but also'-র পরেও Verb Phrase ('developed...') থাকায় এটি নিখুঁত Parallelism মেনে চলে।",
    hint: "Both sides must have identical grammatical structures.",
    level: "advanced"
  },
  {
    id: 28,
    question: "In 'He has been teaching English in Barrackpore since 2012', why is 'since' used instead of 'for'?",
    options: [
      "'Since' denotes a specific Point of Time in the past; 'for' denotes total Period/Duration of time",
      "Because 2012 is a leap year",
      "'For' cannot be used with years",
      "It is an optional colloquialism"
    ],
    correctAnswer: 0,
    answer: "'Since' denotes a specific Point of Time in the past; 'for' denotes total Period/Duration of time",
    explanation: "'Since' marks the specific starting point in time (Point of Time). 'For' marks total duration (Period of Time: e.g., 'for 14 years').",
    explanationBn: "অতীতের নির্দিষ্ট বিন্দু (Point of Time: 2012) নির্দেশ করায় 'since' বসেছে; সময়ের মোট পরিব্যাপ্তি (Period of Time) হলে 'for' বসতো।",
    hint: "Point of time requires 'since'.",
    level: "basic"
  },
  {
    id: 29,
    question: "In 'Everyone in the seminar hall was thoroughly inspired', why is 'was' singular despite 'everyone' referring to multiple people?",
    options: [
      "'Everyone' is grammatically an Indefinite Pronoun that is syntactically SINGULAR, requiring a singular verb",
      "Because 'hall' is singular",
      "Because 'inspired' is an adjective",
      "It is a dialect of British English"
    ],
    correctAnswer: 0,
    answer: "'Everyone' is grammatically an Indefinite Pronoun that is syntactically SINGULAR, requiring a singular verb",
    explanation: "Indefinite pronouns ending in -one, -body, -thing are grammatically singular and require singular verbs in standard Concord.",
    explanationBn: "'Everyone' ব্যাকরণগতভাবে Singular Indefinite Pronoun, তাই এর সাথে Singular Verb 'was' বসবে।",
    hint: "-one and -body indefinite pronouns are singular.",
    level: "basic"
  },
  {
    id: 30,
    question: "What is the ultimate objective of completing Module 001_001 under Mentor Sukanta Hui?",
    options: [
      "To build an unbreakable foundation in word classification, distinguish open from closed classes, recognize form-function dynamics, and eliminate Bengali translation traps before mastering sentence anatomy in Module 001_002",
      "To memorize dictionary pages without understanding syntax",
      "To write English without verbs",
      "To avoid competitive examination questions"
    ],
    correctAnswer: 0,
    answer: "To build an unbreakable foundation in word classification, distinguish open from closed classes, recognize form-function dynamics, and eliminate Bengali translation traps before mastering sentence anatomy in Module 001_002",
    explanation: "Module 001_001 establishes the rock-solid foundations of English grammar literacy, preparing students for advanced sentence architecture and stylistic excellence.",
    explanationBn: "মডিউল 001_001-এর লক্ষ্য হলো পদবিন্যাস ও ব্যাকরণিক কাঠামোর ভিত্তি দৃঢ় করা, অনুবাদের ভুল দূর করা এবং পরবর্তী মডিউল 001_002 (Sentence Anatomy)-র জন্য পূর্ণ প্রস্তুতি গ্রহণ করা।",
    hint: "Rock-solid foundational mastery before advancing.",
    level: "basic"
  }
];

export default questions;
