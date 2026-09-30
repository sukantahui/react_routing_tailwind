// topic3_questions.js
// Module 001_004: Phrases vs Clauses & Foundational Sentence Transformations
// Topic 3: Independent vs Subordinate (Dependent) Clauses
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What differentiates an INDEPENDENT (MAIN) CLAUSE from a SUBORDINATE (DEPENDENT) CLAUSE?",
    options: [
      "An independent clause expresses a complete, self-standing thought and can stand alone as a sentence, while a subordinate clause cannot stand alone.",
      "An independent clause has no subject.",
      "A subordinate clause always contains a passive verb.",
      "An independent clause must always be shorter than 5 words."
    ],
    correctAnswer: 0,
    explanation: "An independent clause contains a Subject + Finite Verb and makes complete sense on its own. A subordinate clause contains a subordinating conjunction/relative pronoun and depends on the main clause for complete meaning.",
    explanationBn: "Independent (Main) Clause স্বাধীনভাবে সম্পূর্ণ অর্থ প্রকাশ করতে পারে এবং একক বাক্য হিসেবে বসতে পারে; কিন্তু Subordinate (Dependent) Clause একা বসতে পারে না, Main Clause-এর উপর নির্ভরশীল।"
  },
  {
    id: 2,
    question: "Identify the SUBORDINATE CLAUSE in: 'Although Swadeep was exhausted, he completed the full-stack deployment.'",
    options: [
      "Although Swadeep was exhausted",
      "he completed the full-stack deployment",
      "the full-stack deployment",
      "Swadeep was exhausted he completed"
    ],
    correctAnswer: 0,
    explanation: "'Although Swadeep was exhausted' begins with the subordinating conjunction of concession 'Although' and cannot stand alone as a sentence.",
    explanationBn: "'Although Swadeep was exhausted' একটি Subordinate Adverb Clause of Concession যা 'Although' দিয়ে শুরু হয়েছে এবং একা পূর্ণ অর্থ দেয় না।"
  },
  {
    id: 3,
    question: "What type of subordinate clause is underlined in: 'Sukanta Sir said that consistency is the key to brilliance'?",
    options: [
      "Noun Clause (acting as direct object of 'said')",
      "Adjective Clause",
      "Adverb Clause of Time",
      "Coordinating Clause"
    ],
    correctAnswer: 0,
    explanation: "'that consistency is the key to brilliance' answers 'Said what?', functioning nominally as the direct object of the transitive verb 'said'.",
    explanationBn: "'that consistency is...' অংশটি 'said' Verb-এর Direct Object হিসেবে কাজ করছে, তাই এটি একটি Noun Clause।"
  },
  {
    id: 4,
    question: "What type of subordinate clause is underlined in: 'The developer who designed this UI won the national hackathon'?",
    options: [
      "Relative / Adjective Clause (modifying the antecedent noun 'developer')",
      "Noun Clause",
      "Adverb Clause of Reason",
      "Independent Main Clause"
    ],
    correctAnswer: 0,
    explanation: "'who designed this UI' begins with relative pronoun 'who' and qualifies the antecedent noun 'developer', making it an Adjective/Relative Clause.",
    explanationBn: "'who designed this UI' পূর্ববর্তী Noun 'developer'-কে বর্ণনা করছে, তাই এটি Relative / Adjective Clause।"
  },
  {
    id: 5,
    question: "What type of subordinate clause is underlined in: 'We will begin the masterclass as soon as all students log in'?",
    options: [
      "Adverb Clause of Time (modifying the verb 'will begin')",
      "Noun Clause",
      "Adjective Clause",
      "Prepositional Phrase"
    ],
    correctAnswer: 0,
    explanation: "'as soon as all students log in' indicates WHEN the main action takes place, functioning as an Adverbial Clause of Time.",
    explanationBn: "'as soon as all students log in' মূল কাজের সময় (Time) নির্দেশ করায় এটি Adverb Clause of Time।"
  },
  {
    id: 6,
    question: "Which of the following is a SUBORDINATING CONJUNCTION that introduces a dependent clause?",
    options: [
      "Because / Although / Since / Unless / Whereas",
      "And / But / Or / Nor / For / Yet / So (FANBOYS)",
      "Either...or / Neither...nor",
      "However / Therefore / Moreover"
    ],
    correctAnswer: 0,
    explanation: "'Because', 'although', 'since', 'unless', etc., are subordinating conjunctions creating dependent adverbial clauses. 'FANBOYS' are coordinating conjunctions.",
    explanationBn: "'Because', 'Although', 'Since', 'Unless' ইত্যাদি হলো Subordinating Conjunction যা Subordinate Clause তৈরি করে।"
  },
  {
    id: 7,
    question: "Identify the SENTENCE FRAGMENT (an incomplete dependent clause mistakenly punctuated as a full sentence):",
    options: [
      "Because the server experienced an unexpected runtime crash.",
      "The server experienced an unexpected runtime crash.",
      "Although the server crashed, we restored the backup quickly.",
      "When the server crashed, the alarms triggered immediately."
    ],
    correctAnswer: 0,
    explanation: "'Because the server experienced an unexpected runtime crash.' starts with a subordinating conjunction and lacks an independent main clause, making it a sentence fragment error.",
    explanationBn: "'Because the server experienced...' অংশটি একটি Subordinate Clause এবং এর সাথে কোনো Main Clause না থাকায় এটি একটি মারাত্মক Sentence Fragment ভুল।"
  },
  {
    id: 8,
    question: "In 'What Debangshu stated during the debate surprised the audience', what is the syntactic function of the clause 'What Debangshu stated during the debate'?",
    options: [
      "Noun Clause acting as the SUBJECT of the main finite verb 'surprised'",
      "Adjective Clause modifying debate",
      "Adverb Clause of Manner",
      "Independent Main Clause"
    ],
    correctAnswer: 0,
    explanation: "The entire nominal clause 'What Debangshu stated during the debate' occupies the subject slot before the main transitive verb 'surprised'.",
    explanationBn: "'What Debangshu stated...' Noun Clause-টি পুরো বাক্যের Subject হিসেবে 'surprised' Verb-এর পূর্বে বসেছে।"
  },
  {
    id: 9,
    question: "Which sentence contains an ADVERB CLAUSE OF CONDITION?",
    options: [
      "If you adhere to syntactic principles, your prose will become impeccable.",
      "He lives where the three rivers meet.",
      "She spoke so softly that nobody heard her.",
      "This is the book that I recommended."
    ],
    correctAnswer: 0,
    explanation: "'If you adhere to syntactic principles' sets a condition introduced by 'if', making it an Adverb Clause of Condition.",
    explanationBn: "'If you adhere...' অংশটি 'if' দিয়ে শর্ত নির্ধারণ করছে, তাই এটি Adverb Clause of Condition।"
  },
  {
    id: 10,
    question: "In 'This is the exact spot where the historic battle occurred', what kind of clause is 'where the historic battle occurred'?",
    options: [
      "Adjective / Relative Clause qualifying the noun 'spot'",
      "Noun Clause",
      "Adverb Clause of Place",
      "Independent Clause"
    ],
    correctAnswer: 0,
    explanation: "Although introduced by 'where', it directly modifies the preceding antecedent noun 'spot' (Which spot? -> where the battle occurred), making it an Adjective Clause.",
    explanationBn: "'Where the historic battle occurred' পূর্ববর্তী Noun 'spot'-কে নির্দেশ করায় এটি Adjective Clause হিসেবে কাজ করছে।"
  },
  {
    id: 11,
    question: "In 'Stay where you are until the signal turns green', what kind of clause is 'where you are'?",
    options: [
      "Adverb Clause of Place modifying the imperative verb 'Stay'",
      "Noun Clause object",
      "Adjective Clause",
      "Independent Clause"
    ],
    correctAnswer: 0,
    explanation: "'Where you are' modifies the verb 'Stay' (Stay where?), functioning as an Adverb Clause of Place (there is no preceding nominal antecedent).",
    explanationBn: "'Where you are' সরাসরি 'Stay' Verb-কে বিশেষিত করায় এটি Adverb Clause of Place।"
  },
  {
    id: 12,
    question: "Which of the following contains an ADVERB CLAUSE OF PURPOSE?",
    options: [
      "We study diligently so that we may master professional skills.",
      "We studied diligently because the exam was approaching.",
      "Although we studied diligently, the questions were tough.",
      "We studied when the mentor arrived."
    ],
    correctAnswer: 0,
    explanation: "'so that we may master professional skills' expresses the underlying purpose/goal introduced by 'so that / in order that'.",
    explanationBn: "'so that we may master...' অংশটি পড়াশোনার উদ্দেশ্য (Purpose) প্রকাশ করছে, তাই এটি Adverb Clause of Purpose।"
  },
  {
    id: 13,
    question: "In 'The mentor spoke so clearly that every student understood the complex theorem', what kind of clause is 'that every student understood the complex theorem'?",
    options: [
      "Adverb Clause of Result / Consequence",
      "Adverb Clause of Purpose",
      "Noun Clause",
      "Adjective Clause"
    ],
    correctAnswer: 0,
    explanation: "'so clearly that...' introduces the consequence or result produced by the degree of clarity, making it an Adverb Clause of Result.",
    explanationBn: "'so...that' কাঠামোটি কাজের ফলাফল (Result / Consequence) প্রকাশ করায় এটি Adverb Clause of Result।"
  },
  {
    id: 14,
    question: "What is a RESTRICTIVE (DEFINING) relative clause, and how is it punctuated?",
    options: [
      "It provides essential identification of the noun and is NOT separated by commas (e.g., 'The student who scored 100% won the medal').",
      "It provides extra non-essential information and must be placed between commas.",
      "It can only be used at the end of a question.",
      "It is always in past tense."
    ],
    correctAnswer: 0,
    explanation: "A restrictive clause provides essential identification without which the noun's reference is incomplete. It takes NO commas.",
    explanationBn: "Restrictive (Defining) Relative Clause Noun-এর পরিচয় নির্ধারণে অপরিহার্য এবং এর আগে-পরে কোনো Comma বসে না।"
  },
  {
    id: 15,
    question: "What is a NON-RESTRICTIVE (NON-DEFINING) relative clause, and how is it punctuated?",
    options: [
      "It provides supplementary, non-essential parenthetical information and MUST be set off by commas (e.g., 'Sukanta Sir, who has mentored thousands of students, founded Coder & AccoTax').",
      "It never takes commas.",
      "It cannot refer to proper nouns.",
      "It must always start with 'that'."
    ],
    correctAnswer: 0,
    explanation: "Non-restrictive clauses add extra, non-essential detail about an already identified entity and must be framed by commas. ('That' cannot introduce non-restrictive clauses).",
    explanationBn: "Non-restrictive Relative Clause অতিরিক্ত তথ্য দেয় এবং তা অবশ্যই Comma দিয়ে আলাদা করতে হয় (এতে 'that' ব্যবহার করা যায় না)।"
  },
  {
    id: 16,
    question: "Which relative pronoun is strictly FORBIDDEN in non-restrictive clauses in formal English?",
    options: [
      "That (use 'which' or 'who' instead)",
      "Which",
      "Who",
      "Whose"
    ],
    correctAnswer: 0,
    explanation: "In formal standard grammar, 'that' is restricted to defining/restrictive clauses; 'which' or 'who' must be used for non-defining clauses set off by commas.",
    explanationBn: "Formal English-এ Comma যুক্ত Non-restrictive Clause-এ 'that' ব্যবহার নিষিদ্ধ; 'which' বা 'who' ব্যবহার করতে হয়।"
  },
  {
    id: 17,
    question: "In 'I know the reason why he resigned from the organization', what kind of clause is 'why he resigned from the organization'?",
    options: [
      "Adjective Clause qualifying the antecedent noun 'reason'",
      "Noun Clause",
      "Adverb Clause of Reason",
      "Independent Clause"
    ],
    correctAnswer: 0,
    explanation: "Because 'why he resigned' directly qualifies the overt noun antecedent 'the reason', it functions as an Adjective/Relative Clause.",
    explanationBn: "'Why he resigned...' সরাসরি 'the reason' Noun-টিকে বিশেষিত করায় এটি Adjective Clause হিসেবে কাজ করছে।"
  },
  {
    id: 18,
    question: "In 'I know why he resigned from the organization' (where 'the reason' is omitted), what is 'why he resigned from the organization'?",
    options: [
      "Noun Clause functioning as the direct object of 'know'",
      "Adjective Clause",
      "Adverb Clause",
      "Prepositional Phrase"
    ],
    correctAnswer: 0,
    explanation: "With no preceding noun antecedent, 'why he resigned' directly answers 'Know what?', functioning as a Noun Clause direct object.",
    explanationBn: "পূর্ববর্তী Noun না থাকায় 'why he resigned...' সরাসরি 'know' Verb-এর Object হিসেবে Noun Clause গঠন করেছে।"
  },
  {
    id: 19,
    question: "Identify the sentence that joins two INDEPENDENT CLAUSES into a COMPOUND sentence using a coordinating conjunction (FANBOYS):",
    options: [
      "Swadeep optimized the React components, and Debangshu configured the Node.js backend.",
      "Because Swadeep optimized the React components, the app ran smoothly.",
      "Swadeep, who optimized the React components, received praise.",
      "Optimizing the React components, Swadeep improved performance."
    ],
    correctAnswer: 0,
    explanation: "'Swadeep optimized...' and 'Debangshu configured...' are two independent main clauses joined by coordinating conjunction 'and'.",
    explanationBn: "এখানে ২টি স্বাধীন Main Clause Coordinating Conjunction 'and' দ্বারা যুক্ত হয়ে একটি Compound Sentence গঠন করেছে।"
  },
  {
    id: 20,
    question: "In 'Whether we win or lose matters less than how we play the game', what is 'Whether we win or lose'?",
    options: [
      "Subordinate Noun Clause functioning as the subject of 'matters'",
      "Adverb Clause of Condition",
      "Adjective Clause",
      "Main Independent Clause"
    ],
    correctAnswer: 0,
    explanation: "'Whether we win or lose' is a Noun Clause occupying the subject position before the finite verb 'matters'.",
    explanationBn: "'Whether we win or lose' Noun Clause-টি বাক্যের Subject হিসেবে 'matters' Verb-এর পূর্বে বসেছে।"
  },
  {
    id: 21,
    question: "Which of the following contains an ADVERB CLAUSE OF COMPARISON OF DEGREE?",
    options: [
      "Swadeep codes faster than Debangshu does.",
      "Swadeep codes when he is inspired.",
      "Swadeep codes because he loves programming.",
      "Swadeep codes where the environment is quiet."
    ],
    correctAnswer: 0,
    explanation: "'than Debangshu does' is an Adverb Clause of Comparison modifying the comparative adverb 'faster'.",
    explanationBn: "'than Debangshu does' তুলনামূলক Adverb Clause of Comparison-এর উদাহরণ।"
  },
  {
    id: 22,
    question: "In 'He speaks as if he were an authority on quantum computing', what does 'as if he were...' express?",
    options: [
      "Adverb Clause of Manner with hypothetical/unreal subjunctive mood",
      "Noun Clause object",
      "Adjective Clause",
      "Factual past indicative"
    ],
    correctAnswer: 0,
    explanation: "'as if / as though' introduces an Adverb Clause of Manner, using subjunctive 'were' to indicate a hypothetical or contrary-to-fact situation.",
    explanationBn: "'as if he were...' একটি কাল্পনিক/অবাস্তব ভাব প্রকাশক Adverb Clause of Manner।"
  },
  {
    id: 23,
    question: "What is the danger of a 'COMMA SPLICE' error in clause syntax?",
    options: [
      "Joining two independent main clauses with only a comma (without a coordinating conjunction or semicolon)",
      "Using too many exclamation marks",
      "Splitting an infinitive with an adverb",
      "Ending a clause with a preposition"
    ],
    correctAnswer: 0,
    explanation: "A comma splice is the mechanical error of joining two independent clauses with a comma alone (e.g., *'The server crashed, the team panicked.' -> Correct: '...crashed; the team...' or '...crashed, and the team...').",
    explanationBn: "দুটি Independent Main Clause-কে কোনো Conjunction ছাড়া শুধু Comma দিয়ে যুক্ত করাকে Comma Splice ভুল বলা হয়।"
  },
  {
    id: 24,
    question: "Identify the sentence that correctly resolves a comma splice using a SEMICOLON:",
    options: [
      "The algorithms were complex; nevertheless, the students mastered them within a week.",
      "The algorithms were complex, nevertheless, the students mastered them.",
      "The algorithms were complex nevertheless the students mastered them.",
      "The algorithms were complex: nevertheless the students mastered them."
    ],
    correctAnswer: 0,
    explanation: "When conjunctive adverbs (nevertheless, however, therefore) connect independent clauses, they must be preceded by a semicolon (;) and followed by a comma (,).",
    explanationBn: "Conjunctive Adverb ('nevertheless', 'however') দিয়ে দুটি Main Clause যুক্ত করতে পূর্বে Semicolon (;) এবং পরে Comma (,) বসে।"
  },
  {
    id: 25,
    question: "How does mastering the hierarchy of Independent vs Subordinate Clauses empower a writer's style?",
    options: [
      "It enables writers to subordinate minor background details while placing their core arguments into emphatic independent main clauses.",
      "It guarantees that every sentence has identical length.",
      "It makes all sentences passive.",
      "It eliminates the need for nouns."
    ],
    correctAnswer: 0,
    explanation: "Clause subordination allows writers to control semantic emphasis (syntactic foregrounding vs backgrounding), creating nuanced, professional, and elegant prose.",
    explanationBn: "Clause-এর স্তরবিন্যাস জানা থাকলে লেখক অপ্রধান তথ্যকে Subordinate Clause-এ রেখে মূল বক্তব্যকে Main Clause-এ জোরালোভাবে তুলে ধরতে পারেন।"
  }
];

export default questions;
