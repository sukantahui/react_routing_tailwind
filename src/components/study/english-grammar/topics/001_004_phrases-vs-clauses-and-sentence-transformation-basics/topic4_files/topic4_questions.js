// topic4_questions.js
// Module 001_004: Phrases vs Clauses & Foundational Sentence Transformations
// Topic 4: Transformation Basics & The Golden Rule of Grammar
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What is the foundational difference between 'Conversion' and 'Transformation' in English Grammar?",
    options: [
      "Conversion alters meaning (e.g. making an affirmative true statement false), whereas Transformation alters ONLY the grammatical structure while keeping meaning 100% invariant.",
      "Conversion applies only to poetry, while transformation applies only to prose.",
      "Transformation always makes sentences longer.",
      "They are identical terms with no difference."
    ],
    correctAnswer: 0,
    explanation: "Conversion changes the sense (e.g., 'He is honest' -> 'He is not honest' changes truth value). Transformation preserves the exact meaning ('He is honest' -> 'He is not dishonest').",
    explanationBn: "Conversion বাক্যের অর্থ বদলে দেয় (যেমন: হ্যাঁ-কে না করা); কিন্তু Transformation কেবল ব্যাকরণগত কাঠামো বদলায়, মূল অর্থ হুবহু অক্ষুণ্ণ রাখে।"
  },
  {
    id: 2,
    question: "Transform 'He is the tallest boy in the classroom' into a POSITIVE DEGREE sentence without changing meaning:",
    options: [
      "No other boy in the classroom is as tall as he.",
      "He is as tall as any other boy.",
      "Very few boys in the classroom are as tall as he.",
      "He is taller than no other boy."
    ],
    correctAnswer: 0,
    explanation: "The superlative 'the tallest' transforms into the positive degree using 'No other + singular noun + as...as': 'No other boy in the classroom is as tall as he.'",
    explanationBn: "Superlative 'the tallest'-কে অর্থ ঠিক রেখে Positive Degree করার নিয়ম: 'No other boy ... is as tall as he'।"
  },
  {
    id: 3,
    question: "Transform 'He is the tallest boy in the classroom' into a COMPARATIVE DEGREE sentence:",
    options: [
      "He is taller than all other boys in the classroom.",
      "He is taller than some other boys.",
      "No other boy is taller than he.",
      "He is tall than any boy."
    ],
    correctAnswer: 0,
    explanation: "Superlative transforms to comparative using 'Comparative adjective + than any other + singular noun' (or 'than all other + plural nouns'): 'He is taller than any other boy / all other boys...'.",
    explanationBn: "Comparative Degree-তে রূপান্তর: 'He is taller than any other boy' বা 'taller than all other boys'।"
  },
  {
    id: 4,
    question: "Expand the underlined phrase into a SUBORDINATE CLAUSE: 'Sukanta Sir praised the student of great dedication.'",
    options: [
      "Sukanta Sir praised the student who was greatly dedicated.",
      "Sukanta Sir praised the greatly dedicated student.",
      "Sukanta Sir praised the dedication of the student.",
      "The student was dedicated and Sukanta Sir praised him."
    ],
    correctAnswer: 0,
    explanation: "The adjective phrase 'of great dedication' expands into the relative clause 'who was greatly dedicated' (Subject 'who' + Finite Verb 'was').",
    explanationBn: "'of great dedication' Adjective Phrase-টি Relative Clause 'who was greatly dedicated'-এ রূপান্তরিত হয়েছে।"
  },
  {
    id: 5,
    question: "Reduce the subordinate clause into a CONCISE PHRASE: 'When the sun rose, the dense fog dispersed.'",
    options: [
      "At sunrise, the dense fog dispersed.",
      "The sun rose and the dense fog dispersed.",
      "Because the sun rose, the fog dispersed.",
      "The sun having rose, fog dispersed."
    ],
    correctAnswer: 0,
    explanation: "The adverbial clause 'When the sun rose' condenses into the concise prepositional phrase of time 'At sunrise' (or nominative absolute 'The sun having risen').",
    explanationBn: "'When the sun rose' Clause-টিকে সংক্ষেপ করে Prepositional Phrase 'At sunrise'-এ রূপান্তর করা যায়।"
  },
  {
    id: 6,
    question: "Transform 'Iron is more useful than any other metal' into a SUPERLATIVE sentence:",
    options: [
      "Iron is the most useful of all metals.",
      "Iron is a very useful metal.",
      "No metal is as useful as iron.",
      "Iron is more useful metal."
    ],
    correctAnswer: 0,
    explanation: "'More useful than any other metal' transforms into the superlative 'Iron is the most useful of all metals.'",
    explanationBn: "Comparative থেকে Superlative রূপ: 'Iron is the most useful of all metals'।"
  },
  {
    id: 7,
    question: "Transform the simple sentence 'On hearing the announcement, Swadeep cheered' into a COMPLEX sentence:",
    options: [
      "As soon as Swadeep heard the announcement, he cheered.",
      "Swadeep heard the announcement and cheered.",
      "Hearing the announcement, Swadeep cheered.",
      "Swadeep cheered at the announcement."
    ],
    correctAnswer: 0,
    explanation: "'As soon as Swadeep heard the announcement' is a subordinate adverb clause of time, making the sentence Complex (1 Subordinate + 1 Main Clause).",
    explanationBn: "'As soon as Swadeep heard the announcement' একটি Subordinate Clause যোগ করে বাক্যটিকে Complex Sentence-এ রূপান্তর করে।"
  },
  {
    id: 8,
    question: "Transform the same sentence 'On hearing the announcement, Swadeep cheered' into a COMPOUND sentence:",
    options: [
      "Swadeep heard the announcement, and he cheered.",
      "When Swadeep heard the announcement, he cheered.",
      "Because Swadeep heard the announcement, he cheered.",
      "Swadeep cheered on the announcement."
    ],
    correctAnswer: 0,
    explanation: "Joining two independent main clauses with coordinating conjunction 'and' creates a Compound Sentence: 'Swadeep heard the announcement, and he cheered.'",
    explanationBn: "দুটি Main Clause-কে Coordinating Conjunction 'and' দিয়ে যুক্ত করে Compound Sentence তৈরি হয়: 'Swadeep heard the announcement, and he cheered'।"
  },
  {
    id: 9,
    question: "Transform 'He was too tired to continue coding' into a complex sentence with 'so...that':",
    options: [
      "He was so tired that he could not continue coding.",
      "He was so tired to continue coding.",
      "He was very tired that he cannot continue.",
      "He was too tired that he could not code."
    ],
    correctAnswer: 0,
    explanation: "Past tense 'too...to' transforms into 'so + Adj + that + Subject + could not + Verb': 'He was so tired that he could not continue coding.'",
    explanationBn: "Past Tense-এ 'too...to' পরিবর্তিত হয়ে 'so...that + could not + Base Verb' হয়।"
  },
  {
    id: 10,
    question: "Transform 'Only the brave deserve the fair' into a negative sentence:",
    options: [
      "None but the brave deserve the fair.",
      "Nobody deserves the fair.",
      "The brave do not deserve the fair.",
      "Only not the brave deserve the fair."
    ],
    correctAnswer: 0,
    explanation: "'Only' referring to persons ('the brave') transforms into 'None but': 'None but the brave deserve the fair.'",
    explanationBn: "'Only the brave' ব্যক্তিবাচক হওয়ায় Negative-এ 'None but the brave deserve the fair' হয়।"
  },
  {
    id: 11,
    question: "Transform 'Everybody will admit that she is talented' into a negative sentence:",
    options: [
      "Nobody will deny that she is talented.",
      "Nobody will admit that she is talented.",
      "Everybody will not admit she is talented.",
      "She is not talented everybody admits."
    ],
    correctAnswer: 0,
    explanation: "'Everybody will admit' transforms into 'Nobody will deny' (retaining 100% semantic equivalence).",
    explanationBn: "'Everybody will admit'-এর অর্থ ঠিক রেখে Negative রূপ: 'Nobody will deny that she is talented'।"
  },
  {
    id: 12,
    question: "Transform 'As soon as the bell rang, the teacher entered the lab' using 'No sooner...than':",
    options: [
      "No sooner did the bell ring than the teacher entered the lab.",
      "No sooner the bell rang when the teacher entered.",
      "No sooner had the bell rang when the teacher entered.",
      "As soon as not the bell rang."
    ],
    correctAnswer: 0,
    explanation: "'No sooner did + Subject + V1 ... than ...' is the standard literary transformation of 'As soon as'.",
    explanationBn: "'As soon as'-এর স্ট্যান্ডার্ড সাহিত্যিক রূপ: 'No sooner did the bell ring than the teacher entered...'।"
  },
  {
    id: 13,
    question: "Which of the following is the correct transformation of 'He is richer than I' into positive degree?",
    options: [
      "I am not as rich as he.",
      "I am as rich as he.",
      "He is not as rich as I.",
      "No one is richer than I."
    ],
    correctAnswer: 0,
    explanation: "If A is richer than B, then B is NOT as rich as A: 'I am not as rich as he.'",
    explanationBn: "যদি A, B-এর চেয়ে ধনী হয়, তবে B, A-এর মতো ধনী নয়: 'I am not as rich as he'।"
  },
  {
    id: 14,
    question: "Transform 'Kolkata is larger than most other cities in West Bengal' into SUPERLATIVE degree:",
    options: [
      "Kolkata is one of the largest cities in West Bengal.",
      "Kolkata is the largest city in West Bengal.",
      "No other city in West Bengal is as large as Kolkata.",
      "Kolkata is larger than all cities."
    ],
    correctAnswer: 0,
    explanation: "'Larger than most other cities' transforms into 'one of the largest cities' (plural noun 'cities').",
    explanationBn: "'Larger than most other...' Superlative-এ 'one of the largest cities' রূপ নেয়।"
  },
  {
    id: 15,
    question: "Transform 'Kolkata is larger than most other cities in West Bengal' into POSITIVE degree:",
    options: [
      "Very few cities in West Bengal are as large as Kolkata.",
      "No other city in West Bengal is as large as Kolkata.",
      "Some cities are larger than Kolkata.",
      "Kolkata is as large as few cities."
    ],
    correctAnswer: 0,
    explanation: "'One of the largest / larger than most' transforms into positive degree using 'Very few + plural noun + are as...as': 'Very few cities in West Bengal are as large as Kolkata.'",
    explanationBn: "'One of the largest'-এর Positive Degree রূপ: 'Very few cities ... are as large as Kolkata'।"
  },
  {
    id: 16,
    question: "Transform the active voice 'Sukanta Sir mentors the engineering cohort' into PASSIVE VOICE:",
    options: [
      "The engineering cohort is mentored by Sukanta Sir.",
      "The engineering cohort was mentored by Sukanta Sir.",
      "The engineering cohort has been mentored by Sukanta Sir.",
      "Sukanta Sir is mentoring the engineering cohort."
    ],
    correctAnswer: 0,
    explanation: "Present simple active 'Subject + V1 + Object' transforms into passive 'Object + is/are + V3 + by Subject': 'The engineering cohort is mentored by Sukanta Sir.'",
    explanationBn: "Simple Present Active-এর Passive রূপ: Object ('The engineering cohort') + is + V3 ('mentored') + by + Subject।"
  },
  {
    id: 17,
    question: "Transform 'I have no advice to give you' into a complex sentence containing a relative clause:",
    options: [
      "I have no advice that I can give you.",
      "Giving you advice is impossible for me.",
      "I cannot give you advice.",
      "There is no advice given by me."
    ],
    correctAnswer: 0,
    explanation: "The infinitive 'to give you' expands into the relative adjective clause 'that I can give you'.",
    explanationBn: "'to give you' Infinitive-টি 'that I can give you' Relative Clause-এ প্রসারিত হয়েছে।"
  },
  {
    id: 18,
    question: "Transform 'In spite of his poverty, he is scrupulously honest' into a COMPOUND sentence:",
    options: [
      "He is very poor, but he is scrupulously honest.",
      "Although he is poor, he is scrupulously honest.",
      "Because he is poor, he is honest.",
      "Being poor, he is honest."
    ],
    correctAnswer: 0,
    explanation: "'In spite of / Despite' transforms into a compound sentence using the adversative coordinating conjunction 'but': 'He is poor, but he is scrupulously honest.'",
    explanationBn: "'In spite of' যুক্ত বাক্য Compound-এ Adversative Conjunction 'but' দিয়ে যুক্ত হয়।"
  },
  {
    id: 19,
    question: "Transform the same sentence 'In spite of his poverty, he is scrupulously honest' into a COMPLEX sentence:",
    options: [
      "Although he is poor, he is scrupulously honest.",
      "He is poor, but he is scrupulously honest.",
      "He is poor and honest.",
      "Poor as he is not honest."
    ],
    correctAnswer: 0,
    explanation: "'In spite of' transforms into a complex sentence using the subordinating conjunction of concession 'Although / Though': 'Although he is poor, he is scrupulously honest.'",
    explanationBn: "'In spite of' Complex Sentence-এ 'Although / Though' দ্বারা রূপান্তরিত হয়।"
  },
  {
    id: 20,
    question: "Transform 'He confessed his guilt' into a complex sentence containing a noun clause:",
    options: [
      "He confessed that he was guilty.",
      "He was guilty and confessed.",
      "Confessing his guilt, he left.",
      "His guilt was confessed."
    ],
    correctAnswer: 0,
    explanation: "The noun phrase 'his guilt' expands into the subordinate noun clause 'that he was guilty'.",
    explanationBn: "'his guilt' Noun Phrase-টি 'that he was guilty' Noun Clause-এ রূপান্তরিত হয়েছে।"
  },
  {
    id: 21,
    question: "Transform 'We eat to live' into a complex sentence of purpose:",
    options: [
      "We eat so that we may live.",
      "We eat because we live.",
      "We live when we eat.",
      "Eating is living."
    ],
    correctAnswer: 0,
    explanation: "The infinitive of purpose 'to live' expands into the adverb clause of purpose 'so that we may live'.",
    explanationBn: "'to live' Infinitive-টি 'so that we may live' Adverb Clause of Purpose-এ রূপান্তরিত হয়েছে।"
  },
  {
    id: 22,
    question: "Transform 'He worked hard to avoid failure' using the negative purpose conjunction 'lest':",
    options: [
      "He worked hard lest he should fail.",
      "He worked hard lest he should not fail.",
      "He worked hard lest he failed.",
      "He worked hard lest to fail."
    ],
    correctAnswer: 0,
    explanation: "'Lest' means 'for fear that' and is already negative. It mandates 'should + base verb' and NEVER takes 'not': 'He worked hard lest he should fail.'",
    explanationBn: "'Lest' নিজেই না-বোধক, তাই এর পরে 'should + Base Verb' বসে এবং কখনোই 'not' বসে না।"
  },
  {
    id: 23,
    question: "Transform 'A dead man tells no tales' into a complex sentence:",
    options: [
      "A man who is dead tells no tales.",
      "A man died and tells no tales.",
      "When a man dies, tales are told.",
      "Dead men tell tales not."
    ],
    correctAnswer: 0,
    explanation: "The adjective 'dead' expands into the relative clause 'who is dead': 'A man who is dead tells no tales.'",
    explanationBn: "'dead' Adjective-টি 'who is dead' Relative Clause-এ প্রসারিত হয়ে Complex Sentence গঠন করেছে।"
  },
  {
    id: 24,
    question: "Why must a grammar student check the TENSE during sentence transformation?",
    options: [
      "Because altering the tense shifts the temporal truth of the statement, violating the fundamental law of semantic invariance.",
      "Because all transformed sentences must be in future tense.",
      "Because past tense is forbidden in transformations.",
      "Because tenses are only used in compound sentences."
    ],
    correctAnswer: 0,
    explanation: "A sentence originally set in the past ('He was poor') must remain past in transformation ('Although he was poor', NOT *'Although he is poor'). Tense consistency preserves semantic truth.",
    explanationBn: "রূপান্তরের সময় Tense পরিবর্তন করলে বাক্যের সময়গত সত্যতা নষ্ট হয়, যা রূপান্তরের মূল নিয়মের পরিপন্থী।"
  },
  {
    id: 25,
    question: "What is the ultimate benefit of mastering grammatical transformation for academic and competitive exams?",
    options: [
      "It provides absolute command over 'Do as Directed' sections, synthesis, précis writing, and stylistic variety in essays.",
      "It eliminates the need to study vocabulary.",
      "It reduces study time to zero.",
      "It allows writing without verbs."
    ],
    correctAnswer: 0,
    explanation: "Transformation mastery is the key to conquering ICSE/ISC, Board, and Competitive Exam 'Do as Directed' papers with 100% accuracy.",
    explanationBn: "Transformation-এ দক্ষতা থাকলে যেকোনো প্রতিযোগিতামূলক ও বোর্ড পরীক্ষার 'Do as Directed', Synthesis ও Essay বিভাগে পূর্ণ নম্বর অর্জন নিশ্চিত হয়।"
  }
];

export default questions;
