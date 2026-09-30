// topic9_questions.js
// Module 001_004: Phrases vs Clauses & Foundational Sentence Transformations
// Topic 9: Module 001_004 & Segment 1 Grand Capstone Assessment
// 30 Comprehensive Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "Classify the underlined part in: 'Swadeep completed the assignment with extraordinary speed.'",
    options: [
      "Adverb Phrase of Manner",
      "Noun Clause",
      "Relative Clause",
      "Verb Phrase"
    ],
    correctAnswer: 0,
    explanation: "'With extraordinary speed' is a prepositional phrase answering 'How?' (Manner), modifying the verb 'completed', making it an Adverb Phrase.",
    explanationBn: "'With extraordinary speed' (অসাধারণ দ্রুততার সাথে) একটি Adverb Phrase of Manner যা Verb 'completed'-কে বিশেষিত করছে।"
  },
  {
    id: 2,
    question: "Classify the underlined part in: 'The developer who designed this microservice won the hackathon.'",
    options: [
      "Subordinate Adjective / Relative Clause",
      "Noun Phrase",
      "Adverb Phrase",
      "Independent Main Clause"
    ],
    correctAnswer: 0,
    explanation: "'who designed this microservice' contains a Subject ('who') and Finite Verb ('designed') qualifying the antecedent noun 'developer', making it an Adjective/Relative Clause.",
    explanationBn: "'who designed this microservice' একটি Relative/Adjective Clause যা পূর্ববর্তী Noun 'developer'-কে বর্ণনা করছে।"
  },
  {
    id: 3,
    question: "How many finite verbs and clauses are in: 'Although the weather was harsh, we traveled to Barrackpore because the workshop was unmissable'?",
    options: [
      "3 finite verbs ('was', 'traveled', 'was') -> 3 clauses",
      "1 finite verb -> 1 clause",
      "2 finite verbs -> 2 clauses",
      "4 finite verbs -> 4 clauses"
    ],
    correctAnswer: 0,
    explanation: "Clause 1: 'Although the weather was harsh' (V1: was); Clause 2: 'we traveled to Barrackpore' (V2: traveled); Clause 3: 'because the workshop was unmissable' (V3: was). Total: 3 finite clauses.",
    explanationBn: "বাক্যে ৩টি Finite Verb ('was', 'traveled', 'was') থাকায় এতে মোট ৩টি Clause রয়েছে।"
  },
  {
    id: 4,
    question: "Transform 'Only the best candidates will be selected' into a NEGATIVE sentence:",
    options: [
      "None but the best candidates will be selected.",
      "Nobody will be selected.",
      "The best candidates will not be selected.",
      "Only not the best candidates will be selected."
    ],
    correctAnswer: 0,
    explanation: "'Only' qualifying persons transforms into 'None but': 'None but the best candidates will be selected.'",
    explanationBn: "ব্যক্তিবাচক ক্ষেত্রে 'Only'-এর জায়গায় 'None but' বসে।"
  },
  {
    id: 5,
    question: "Transform 'He bought only a digital tablet' into a NEGATIVE sentence:",
    options: [
      "He bought nothing but a digital tablet.",
      "He bought none but a digital tablet.",
      "He did not buy a tablet.",
      "No tablet was bought by him."
    ],
    correctAnswer: 0,
    explanation: "'Only' qualifying an inanimate thing transforms into 'nothing but': 'He bought nothing but a digital tablet.'",
    explanationBn: "বস্তুবাচক ক্ষেত্রে 'Only' পরিবর্তিত হয়ে 'nothing but' হয়।"
  },
  {
    id: 6,
    question: "Transform 'As soon as the mentor logged in, the webinar commenced' into a NEGATIVE sentence:",
    options: [
      "No sooner did the mentor log in than the webinar commenced.",
      "No sooner the mentor logged in when the webinar commenced.",
      "No sooner had the mentor logged in when the webinar commenced.",
      "As soon as not the mentor logged in."
    ],
    correctAnswer: 0,
    explanation: "'As soon as...' converts to 'No sooner did + Subject + V1 ... than ...': 'No sooner did the mentor log in than the webinar commenced.'",
    explanationBn: "'As soon as'-এর Negative রূপ: 'No sooner did the mentor log in than...'"
  },
  {
    id: 7,
    question: "Transform 'He is too proud to admit his syntactic error' into a COMPLEX sentence with 'so...that':",
    options: [
      "He is so proud that he will not admit his syntactic error.",
      "He is so proud to admit his syntactic error.",
      "He is very proud that he admits error.",
      "He does not admit error because of pride."
    ],
    correctAnswer: 0,
    explanation: "'Too + proud + to admit' transforms into 'so proud that he cannot / will not admit': 'He is so proud that he will not admit his syntactic error.'",
    explanationBn: "'Too...to' পরিবর্তিত হয়ে 'so proud that he will not / cannot admit...' হয়।"
  },
  {
    id: 8,
    question: "Transform 'Every mother loves her child' into a NEGATIVE sentence:",
    options: [
      "There is no mother but loves her child.",
      "No mother loves her child.",
      "Every mother does not love child.",
      "Mother loves child not."
    ],
    correctAnswer: 0,
    explanation: "'Every + Noun' transforms into 'There is no + Noun + but + Verb': 'There is no mother but loves her child.'",
    explanationBn: "'Every + Noun' রূপান্তর হয়ে 'There is no ... but ...' হয়।"
  },
  {
    id: 9,
    question: "Transform 'Everyone knows that the earth moves round the sun' into an INTERROGATIVE RHETORICAL sentence:",
    options: [
      "Who does not know that the earth moves round the sun?",
      "Does everyone know that the earth moves round the sun?",
      "Why does everyone know the earth moves?",
      "Who knows that the earth moves?"
    ],
    correctAnswer: 0,
    explanation: "'Everyone knows...' transforms into 'Who does not know that the earth moves round the sun?'.",
    explanationBn: "'Everyone knows...' রূপান্তরিত হয়ে 'Who does not know...?' হয়।"
  },
  {
    id: 10,
    question: "Transform 'Nobody can touch the blue sky' into an INTERROGATIVE sentence:",
    options: [
      "Who can touch the blue sky?",
      "Can nobody touch the blue sky?",
      "Why can nobody touch the sky?",
      "Who cannot touch the sky?"
    ],
    correctAnswer: 0,
    explanation: "'Nobody can...' transforms into the positive rhetorical inquiry 'Who can touch the blue sky?'.",
    explanationBn: "'Nobody can...' রূপান্তর হয়ে 'Who can...?' হয়।"
  },
  {
    id: 11,
    question: "Transform 'What a breathtaking sight the sunset over the Hooghly river was!' into an ASSERTIVE sentence:",
    options: [
      "The sunset over the Hooghly river was a very breathtaking sight.",
      "Was the sunset breathtaking?",
      "The sunset was not breathtaking.",
      "How breathtaking sunset it was."
    ],
    correctAnswer: 0,
    explanation: "'What a breathtaking sight...' transforms into 'The sunset over the Hooghly river was a very breathtaking sight.'",
    explanationBn: "'What a breathtaking sight...'-এর Assertive রূপ: 'The sunset ... was a very breathtaking sight'।"
  },
  {
    id: 12,
    question: "Transform 'How swiftly the cheetah caught its prey!' into an ASSERTIVE sentence:",
    options: [
      "The cheetah caught its prey very swiftly.",
      "Did the cheetah catch its prey swiftly?",
      "The cheetah did not catch its prey.",
      "What a swiftly catch."
    ],
    correctAnswer: 0,
    explanation: "'How swiftly...' transforms into 'The cheetah caught its prey very swiftly.'",
    explanationBn: "'How swiftly...'-এর Assertive রূপ: 'The cheetah caught its prey very swiftly'।"
  },
  {
    id: 13,
    question: "Transform 'If only I were young again!' into an ASSERTIVE sentence:",
    options: [
      "I earnestly wish that I were young again.",
      "I was young again.",
      "Am I young again?",
      "Be young again."
    ],
    correctAnswer: 0,
    explanation: "'If only I were...' transforms into 'I earnestly wish that I were young again.'",
    explanationBn: "'If only I were...' Assertive-এ 'I earnestly wish that I were young again' হয়।"
  },
  {
    id: 14,
    question: "Transform 'Alas! The legendary mentor has departed' into an ASSERTIVE sentence:",
    options: [
      "It is a matter of profound sorrow that the legendary mentor has departed.",
      "The mentor departed with joy.",
      "Why did the mentor depart?",
      "The mentor is not departed."
    ],
    correctAnswer: 0,
    explanation: "'Alas!' transforms into 'It is a matter of profound sorrow / grief that...'.",
    explanationBn: "'Alas!'-এর Assertive রূপ: 'It is a matter of profound sorrow that...'।"
  },
  {
    id: 15,
    question: "Transform 'May peace and prosperity reign across our state!' into an ASSERTIVE sentence:",
    options: [
      "I pray / wish that peace and prosperity may reign across our state.",
      "Peace and prosperity reign.",
      "Will peace reign?",
      "Let peace reign."
    ],
    correctAnswer: 0,
    explanation: "Optative 'May peace reign...' converts into assertive 'I pray/wish that peace and prosperity may reign...'.",
    explanationBn: "Optative বাক্য Assertive-এ 'I pray / wish that...' কাঠামো ধারণ করে।"
  },
  {
    id: 16,
    question: "What is the correct Question Tag for: 'I am right, ________?'",
    options: [
      "aren't I?",
      "amn't I?",
      "am I?",
      "don't I?"
    ],
    correctAnswer: 0,
    explanation: "Standard English requires 'aren't I?' for positive 'I am'.",
    explanationBn: "'I am'-এর Negative Tag সর্বদা 'aren't I?' হয়।"
  },
  {
    id: 17,
    question: "What is the correct Question Tag for: 'Let's review the entire codebase, ________?'",
    options: [
      "shall we?",
      "will we?",
      "don't we?",
      "can we?"
    ],
    correctAnswer: 0,
    explanation: "Proposals with 'Let's' (let us) take 'shall we?'.",
    explanationBn: "'Let's'-এর Tag Question সর্বদা 'shall we?' হয়।"
  },
  {
    id: 18,
    question: "What is the correct Question Tag for: 'Debangshu rarely makes syntax mistakes, ________?'",
    options: [
      "does he?",
      "doesn't he?",
      "is he?",
      "isn't he?"
    ],
    correctAnswer: 0,
    explanation: "'Rarely' makes the clause negative, requiring a positive tag: 'does he?'.",
    explanationBn: "'Rarely' না-বোধক শব্দ হওয়ায় Tag হবে Positive: 'does he?'।"
  },
  {
    id: 19,
    question: "What is the correct Question Tag for: 'Nobody attended the evening seminar, ________?'",
    options: [
      "did they?",
      "didn't they?",
      "did he?",
      "wasn't it?"
    ],
    correctAnswer: 0,
    explanation: "'Nobody' is negative (demanding positive tag) and refers to people (pronoun 'they'): 'did they?'.",
    explanationBn: "'Nobody' না-বোধক এবং Tag-এ Pronoun 'they' নিয়ে 'did they?' গঠন করে।"
  },
  {
    id: 20,
    question: "Transform 'Iron is the most useful metal' into a POSITIVE DEGREE sentence:",
    options: [
      "No other metal is as useful as iron.",
      "Iron is as useful as any metal.",
      "Very few metals are as useful as iron.",
      "Iron is more useful metal."
    ],
    correctAnswer: 0,
    explanation: "'The most useful' transforms into 'No other metal is as useful as iron.'",
    explanationBn: "'The most useful' Superlative-এর Positive রূপ: 'No other metal is as useful as iron'।"
  },
  {
    id: 21,
    question: "Transform 'Iron is the most useful metal' into a COMPARATIVE DEGREE sentence:",
    options: [
      "Iron is more useful than any other metal.",
      "Iron is more useful than some metals.",
      "No metal is more useful than iron.",
      "Iron is useful metal."
    ],
    correctAnswer: 0,
    explanation: "'The most useful' transforms into comparative 'Iron is more useful than any other metal.'",
    explanationBn: "Comparative রূপ: 'Iron is more useful than any other metal'।"
  },
  {
    id: 22,
    question: "Transform 'Kolkata is one of the oldest cities in India' into a POSITIVE DEGREE sentence:",
    options: [
      "Very few cities in India are as old as Kolkata.",
      "No other city in India is as old as Kolkata.",
      "Some cities in India are older than Kolkata.",
      "Kolkata is as old as few cities."
    ],
    correctAnswer: 0,
    explanation: "'One of the oldest' transforms into positive degree with 'Very few + plural noun + are as...as': 'Very few cities in India are as old as Kolkata.'",
    explanationBn: "'One of the oldest'-এর Positive রূপ: 'Very few cities ... are as old as Kolkata'।"
  },
  {
    id: 23,
    question: "Identify the sentence that represents a COMMA SPLICE error:",
    options: [
      "The server crashed, the engineers panicked.",
      "The server crashed; the engineers panicked.",
      "The server crashed, and the engineers panicked.",
      "When the server crashed, the engineers panicked."
    ],
    correctAnswer: 0,
    explanation: "Joining two independent clauses with only a comma (without conjunction or semicolon) is a comma splice error.",
    explanationBn: "দুটি স্বাধীন Main Clause-কে কোনো Conjunction ছাড়া শুধু Comma দিয়ে যুক্ত করা Comma Splice ভুল।"
  },
  {
    id: 24,
    question: "Transform 'Besides being a prolific author, Sukanta Sir is a veteran technology architect' into a COMPOUND sentence:",
    options: [
      "Sukanta Sir is not only a prolific author but also a veteran technology architect.",
      "Although Sukanta Sir is an author, he is an architect.",
      "Because Sukanta Sir is an author, he is an architect.",
      "Sukanta Sir is an author and architect not."
    ],
    correctAnswer: 0,
    explanation: "'Besides being A, he is B' transforms into compound 'He is not only A but also B': 'Sukanta Sir is not only a prolific author but also a veteran technology architect.'",
    explanationBn: "'Besides being...' Compound Sentence-এ 'not only...but also' দ্বারা রূপান্তরিত হয়।"
  },
  {
    id: 25,
    question: "In the sentence 'The soup tastes delicious', why is 'deliciously' incorrect?",
    options: [
      "Because 'tastes' is a sensory copular (linking) verb, which takes a Subject Complement Adjective ('delicious') rather than an adverb.",
      "Because delicious is a noun.",
      "Because deliciously does not exist.",
      "Because soup is uncountable."
    ],
    correctAnswer: 0,
    explanation: "Copular sense verbs (taste, smell, look, feel, sound) connect the subject to an adjective complement describing state/quality (Pattern: SVC).",
    explanationBn: "Sense Verbs (taste, smell, look ইত্যাদি) Linking Verb হিসেবে কাজ করে এবং এদের পরে Adverb নয়, Subject Complement Adjective বসে।"
  },
  {
    id: 26,
    question: "In the sentence 'The committee appointed Swadeep team lead', what is 'team lead'?",
    options: [
      "Object Complement (SVOC pattern where Swadeep == team lead)",
      "Indirect Object",
      "Direct Object",
      "Subject Complement"
    ],
    correctAnswer: 0,
    explanation: "'Team lead' describes the direct object 'Swadeep' (DO == OC), making it an Object Complement in the SVOC pattern.",
    explanationBn: "'Team lead' Direct Object 'Swadeep'-এর পদবী নির্দেশ করছে (Swadeep == team lead), তাই এটি Object Complement (SVOC)।"
  },
  {
    id: 27,
    question: "Transform 'He confessed his crime' into a complex sentence containing a noun clause:",
    options: [
      "He confessed that he had committed a crime.",
      "He committed a crime and confessed.",
      "Confessing his crime, he left.",
      "His crime was confessed."
    ],
    correctAnswer: 0,
    explanation: "The noun phrase 'his crime' expands into the subordinate noun clause 'that he had committed a crime'.",
    explanationBn: "'his crime' Noun Phrase-টি 'that he had committed a crime' Noun Clause-এ প্রসারিত হয়েছে।"
  },
  {
    id: 28,
    question: "Which of the following represents an OPTATIVE BLESSING?",
    options: [
      "May you attain the highest pinnacle of wisdom!",
      "Are you attaining wisdom?",
      "Attain wisdom immediately.",
      "What a wisdom you attained!"
    ],
    correctAnswer: 0,
    explanation: "'May + Subject + Base Verb + !' expressing a heartfelt wish or blessing is the hallmark of an Optative sentence.",
    explanationBn: "'May you attain...!' একটি আশীর্বাদসূচক Optative বাক্য।"
  },
  {
    id: 29,
    question: "What is the fundamental architectural achievement of completing Segment 1 (Foundations)?",
    options: [
      "Mastery of Parts of Speech, Sentence Anatomy (Subject/Predicate/Complements), 7 Clause Patterns, 5 Functional Types, Question Tags, and Sentence Transformations.",
      "Only memorizing 10 vocabulary words.",
      "Writing without punctuation.",
      "Eliminating verbs from English."
    ],
    correctAnswer: 0,
    explanation: "Segment 1 provides the complete foundational grammar matrix: word classes, clause structures, communicative moods, and structural transformations.",
    explanationBn: "সেগমেন্ট ১ সম্পন্ন করার মাধ্যমে শিক্ষার্থী Parts of Speech, Sentence Anatomy, ৭টি Clause Pattern, ৫টি Functional Type, Question Tags এবং Transformation-এ সম্পূর্ণ দক্ষতা অর্জন করেছে।"
  },
  {
    id: 30,
    question: "What domain of English grammar unlocks next in Segment 2?",
    options: [
      "The Nominal Domain: Noun Classifications, Number, Gender, Possessive Apostrophe, Pronoun Antecedent Harmony, and Determiners/Articles.",
      "Only poetic rhyming schemes.",
      "Ancient Greek grammar.",
      "Typing speed tests."
    ],
    correctAnswer: 0,
    explanation: "Segment 2 delves into the Nominal Domain: Nouns, Irregular Plurals, Possessive Cases, Pronouns, and Article Determiners.",
    explanationBn: "সেগমেন্ট ২-তে রয়েছে Nominal Domain: Noun, Irregular Plurals, Possessive Cases, Pronouns এবং Articles।"
  }
];

export default questions;
