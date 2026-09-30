// topic0_questions.js - Module 007_002: Clause Analysis: Noun Clauses, Relative Clauses & Adverbial Clauses
// 25 High-Yield Diagnostic MCQs with Technical and Bengali Explanations

const questions = [
  {
    id: 1,
    question: "Identify the syntactic role of the underlined Noun Clause in: 'That he will succeed in the civil services exam is beyond all doubt.'",
    options: [
      "Subject of the verb 'is'",
      "Object of the transitive verb",
      "Object of a preposition",
      "Subject complement"
    ],
    correctAnswer: "Subject of the verb 'is'",
    explanation: "The noun clause 'That he will succeed in the civil services exam' functions as the grammatical subject of the finite linking verb 'is'.",
    explanationBn: "'That he will succeed in the civil services exam' ক্লজটি 'is' ভার্বের Subject হিসেবে কাজ করছে (Noun Clause as Subject of Verb)।"
  },
  {
    id: 2,
    question: "Identify the syntactic role of the Noun Clause in: 'Listen carefully to what your teacher says.'",
    options: [
      "Subject of the verb",
      "Object of the preposition 'to'",
      "Direct object of 'listen'",
      "In apposition to a noun"
    ],
    correctAnswer: "Object of the preposition 'to'",
    explanation: "'What your teacher says' is a noun clause governed by and functioning as the object of the preposition 'to'.",
    explanationBn: "'What your teacher says' ক্লজটি Preposition 'to'-র Object হিসেবে ব্যবহৃত হয়েছে (Object of a Preposition)।"
  },
  {
    id: 3,
    question: "In the sentence: 'The rumour that the company was bankrupt caused widespread panic,' the subordinate clause 'that the company was bankrupt' is:",
    options: [
      "An Adjective clause modifying 'rumour'",
      "A Noun clause in apposition to the noun 'rumour'",
      "An Adverb clause of reason",
      "A Noun clause acting as the object of 'caused'"
    ],
    correctAnswer: "A Noun clause in apposition to the noun 'rumour'",
    explanation: "The clause defines the exact content of the noun 'rumour' and does not contain a relative pronoun representing the noun; thus, it is a Noun Clause in Apposition.",
    explanationBn: "'That the company was bankrupt' ক্লজটি 'rumour' শব্দটির ভেতরের বক্তব্য প্রকাশ করছে; এটি Noun Clause in Apposition (সম্পূরক ব্যাখ্যা)।"
  },
  {
    id: 4,
    question: "Select the sentence containing a NON-DEFINING (non-restrictive) Relative Clause with correct punctuation:",
    options: [
      "My brother who lives in London is a cardiac surgeon. (Assuming I have only one brother)",
      "My brother, who lives in London, is a cardiac surgeon.",
      "My brother that lives in London, is a cardiac surgeon.",
      "My brother, that lives in London is a cardiac surgeon."
    ],
    correctAnswer: "My brother, who lives in London, is a cardiac surgeon.",
    explanation: "A non-defining relative clause provides non-essential supplementary information, must be enclosed in commas, and uses 'who/which' (never 'that').",
    explanationBn: "Non-Defining Relative Clause অতিরিক্ত তথ্য দেয় (যা বাদ দিলেও মূল বাক্য সঠিক থাকে), এটি কমা দিয়ে ঘেরা থাকে এবং এতে 'that' ব্যবহার করা যায় না ('who/which' বসে)।"
  },
  {
    id: 5,
    question: "Which relative pronoun is strictly required in NON-DEFINING clauses referring to things?",
    options: ["that", "which", "what", "whichever"],
    correctAnswer: "which",
    explanation: "In formal English, non-defining (parenthetical) clauses describing inanimate objects strictly take 'which' preceded by a comma, NEVER 'that'.",
    explanationBn: "Non-defining ক্লজে অপ্রাণিবাচক বস্তুর ক্ষেত্রে কমার পরে সর্বদা 'which' বসে; 'that' কখনো নন-ডিফাইনিং ক্লজে বসে না।"
  },
  {
    id: 6,
    question: "Identify the type of subordinate clause in: 'Strike while the iron is hot.'",
    options: [
      "Adverb clause of condition",
      "Adverb clause of time",
      "Adverb clause of manner",
      "Noun clause acting as object"
    ],
    correctAnswer: "Adverb clause of time",
    explanation: "'While the iron is hot' is an Adverbial Clause of Time answering the question 'When should you strike?'.",
    explanationBn: "'While the iron is hot' ক্লজটি 'কখন আঘাত করবে' (When) প্রশ্নের উত্তর দেয়, তাই এটি Adverb Clause of Time।"
  },
  {
    id: 7,
    question: "Identify the type of subordinate clause in: 'He ran so fast that he was completely out of breath.'",
    options: [
      "Adverb clause of purpose",
      "Adverb clause of result / consequence",
      "Adverb clause of reason",
      "Adverb clause of comparison"
    ],
    correctAnswer: "Adverb clause of result / consequence",
    explanation: "'That he was completely out of breath' introduced by 'so... that' expresses the result or consequence of running fast.",
    explanationBn: "'So fast that...' গঠনটি কাজের পরিণতি বা ফলাফল (result/consequence) প্রকাশ করে, তাই এটি Adverb Clause of Result।"
  },
  {
    id: 8,
    question: "Identify the syntactic role of the Noun Clause in: 'The fundamental problem is that we lack sufficient raw materials.'",
    options: [
      "Subject of the verb",
      "Subject complement (following linking verb 'is')",
      "Object of a transitive verb",
      "Object of a preposition"
    ],
    correctAnswer: "Subject complement (following linking verb 'is')",
    explanation: "The clause follows the linking verb 'is' and completes the meaning of the subject 'problem', functioning as a Subject Complement.",
    explanationBn: "ক্লজটি Linking Verb 'is'-এর পরে বসে Subject-এর অর্থ সম্পূর্ণ করছে, তাই এটি Subject Complement।"
  },
  {
    id: 9,
    question: "Choose the sentence containing a 'Contact Clause' (Relative Clause with omitted relative pronoun):",
    options: [
      "The book which I bought yesterday is fascinating.",
      "The book that I bought yesterday is fascinating.",
      "The book I bought yesterday is fascinating.",
      "The book where I bought yesterday is fascinating."
    ],
    correctAnswer: "The book I bought yesterday is fascinating.",
    explanation: "When a relative pronoun represents the grammatical object of the relative clause, it can be freely omitted, creating a 'Contact Clause' ('The book [that] I bought').",
    explanationBn: "Relative Pronoun যখন ক্লজের Object হয়, তখন তাকে বাদ দেওয়া যায় (যেমন: 'The book I bought'); একে Contact Clause বলে।"
  },
  {
    id: 10,
    question: "Identify the type of subordinate clause in: 'We eat so that we may live.'",
    options: [
      "Adverb clause of purpose",
      "Adverb clause of result",
      "Adverb clause of reason",
      "Adverb clause of condition"
    ],
    correctAnswer: "Adverb clause of purpose",
    explanation: "'So that we may live' expresses the deliberate intention or objective of eating, making it an Adverb Clause of Purpose.",
    explanationBn: "'So that we may live' খাওয়ার উদ্দেশ্য বা লক্ষ্য (purpose) প্রকাশ করে, তাই এটি Adverb Clause of Purpose।"
  },
  {
    id: 11,
    question: "In the sentence: 'This is the hospital where Dr. Sen conducts research,' the clause 'where Dr. Sen conducts research' is:",
    options: [
      "An Adverb clause of place",
      "An Adjective (Relative) clause modifying 'hospital'",
      "A Noun clause as subject complement",
      "A Noun clause in apposition"
    ],
    correctAnswer: "An Adjective (Relative) clause modifying 'hospital'",
    explanation: "Although introduced by the relative adverb 'where', the clause directly modifies the antecedent noun 'hospital', making it an Adjective Clause.",
    explanationBn: "'Where Dr. Sen conducts research' ক্লজটি পূর্বপদ Noun 'hospital'-কে বর্ণনা করছে, তাই এটি Adjective (Relative) Clause।"
  },
  {
    id: 12,
    question: "Identify the Adverb Clause of Concession in the following options:",
    options: [
      "Because he was exhausted, he went to sleep early.",
      "Although he was exhausted, he completed the research project.",
      "If you are exhausted, take a brief rest.",
      "He worked until he was completely exhausted."
    ],
    correctAnswer: "Although he was exhausted, he completed the research project.",
    explanation: "'Although he was exhausted' acknowledges a counter-circumstance without preventing the main outcome, functioning as an Adverb Clause of Concession.",
    explanationBn: "'Although he was exhausted' প্রতিকূল অবস্থা সত্ত্বেও কাজটি সম্পন্ন হওয়া নির্দেশ করে (Adverb Clause of Concession)।"
  },
  {
    id: 13,
    question: "Select the sentence with a Noun Clause acting as the DIRECT OBJECT of a transitive verb:",
    options: [
      "She explained why she was late for the conference.",
      "Why she was late for the conference remains a mystery.",
      "The mystery is why she was late for the conference.",
      "I was informed about why she was late for the conference."
    ],
    correctAnswer: "She explained why she was late for the conference.",
    explanation: "In 'She explained [what?]', the entire clause 'why she was late...' acts as the direct object of the transitive verb 'explained'.",
    explanationBn: "'Explained' Transitive Verb-এর সরাসরি কর্ম (Direct Object) হিসেবে 'why she was late...' ক্লজটি ব্যবহৃত হয়েছে।"
  },
  {
    id: 14,
    question: "Identify the type of clause: 'He behaved as if he were the sole owner of the enterprise.'",
    options: [
      "Adverb clause of manner",
      "Adverb clause of condition",
      "Adverb clause of place",
      "Noun clause in apposition"
    ],
    correctAnswer: "Adverb clause of manner",
    explanation: "'As if he were the sole owner...' explains the manner or way in which he behaved, functioning as an Adverb Clause of Manner.",
    explanationBn: "কাজের ধরন বা আচরণ (Manner/Way) ব্যাখ্যা করায় এটি Adverb Clause of Manner।"
  },
  {
    id: 15,
    question: "Which of the following contains an Adverb Clause of Comparison / Degree?",
    options: [
      "She is wiser than her elder sister is.",
      "Where there is a will, there is a way.",
      "He left because the meeting ended.",
      "Wait here until I return."
    ],
    correctAnswer: "She is wiser than her elder sister is.",
    explanation: "'Than her elder sister is' compares the degree of wisdom between two individuals, constituting an Adverb Clause of Comparison/Degree.",
    explanationBn: "'Than her elder sister is' তুলনামূলক মাত্রা (Comparison of Degree) প্রকাশ করে।"
  },
  {
    id: 16,
    question: "In the sentence: 'Whatever you decide will be respected by the council,' the clause 'Whatever you decide' is:",
    options: [
      "Noun Clause functioning as Subject of 'will be respected'",
      "Adverb Clause of condition",
      "Adjective Clause modifying 'council'",
      "Noun Clause functioning as Object"
    ],
    correctAnswer: "Noun Clause functioning as Subject of 'will be respected'",
    explanation: "'Whatever you decide' is a nominal relative clause acting as the subject of the passive verb phrase 'will be respected'.",
    explanationBn: "'Whatever you decide' ক্লজটি প্যাসিভ ক্রিয়া 'will be respected'-এর Subject হিসেবে কাজ করছে।"
  },
  {
    id: 17,
    question: "Select the sentence with a Defining (Restrictive) Relative Clause:",
    options: [
      "The students who scored above 90% received certificates of honor.",
      "William Shakespeare, who wrote Hamlet, was born in Stratford.",
      "Kolkata, which is the capital of West Bengal, is situated on the Hooghly.",
      "My father, who is a retired professor, loves gardening."
    ],
    correctAnswer: "The students who scored above 90% received certificates of honor.",
    explanation: "'Who scored above 90%' is essential to identifying WHICH specific students received certificates (defining/restrictive; no commas).",
    explanationBn: "'Who scored above 90%' ক্লজটি ছাড়া কোন ছাত্ররা সম্মাননা পেয়েছে তা বোঝা অসম্ভব (এটি অপরিহার্য বা Defining Clause, তাই এতে কমা বসে না)।"
  },
  {
    id: 18,
    question: "Identify the error in: 'The Taj Mahal, that was built by Shah Jahan, is a wonder of the world.'",
    options: [
      "'that' should be replaced by 'which'",
      "Commas should be removed",
      "'built' should be 'building'",
      "'wonder' should be 'wonderful'"
    ],
    correctAnswer: "'that' should be replaced by 'which'",
    explanation: "'The Taj Mahal' is already a uniquely defined proper noun; the clause is non-defining (extra info) and must take 'which', NEVER 'that'.",
    explanationBn: "Proper Noun-এর পরে Non-defining ক্লজে কমার সাথে 'which' বসে; 'that' ব্যবহার করা ব্যাকরণগতভাবে ভুল।"
  },
  {
    id: 19,
    question: "Identify the subordinate clause type: 'As the sun rose, the dense fog dissipated.'",
    options: [
      "Adverb clause of time",
      "Adverb clause of reason",
      "Noun clause",
      "Adjective clause"
    ],
    correctAnswer: "Adverb clause of time",
    explanation: "'As the sun rose' indicates the temporal point when the fog dissipated (Adverb Clause of Time).",
    explanationBn: "'সূর্য ওঠার সাথে সাথে' সময় নির্দেশ করায় এটি Adverb Clause of Time।"
  },
  {
    id: 20,
    question: "In the sentence: 'I am certain that he will pass the examination,' the clause 'that he will pass the examination' functions as:",
    options: [
      "Adverbial complement modifying the adjective 'certain'",
      "Noun clause acting as direct object",
      "Adjective clause modifying 'I'",
      "Independent principal clause"
    ],
    correctAnswer: "Adverbial complement modifying the adjective 'certain'",
    explanation: "The 'that'-clause completes and modifies the predicate adjective 'certain', functioning as an Adjective/Adverbial Complement.",
    explanationBn: "'That'-যুক্ত ক্লজটি Predicate Adjective 'certain'-এর অর্থ সম্পূর্ণ করছে (Adjective Complement)।"
  },
  {
    id: 21,
    question: "Identify the Adverb Clause of Condition in:",
    options: [
      "Should it rain tomorrow, the match will be cancelled.",
      "Because it rained tomorrow, the match was cancelled.",
      "Although it rained, the match continued.",
      "The match was cancelled when it rained."
    ],
    correctAnswer: "Should it rain tomorrow, the match will be cancelled.",
    explanation: "'Should it rain tomorrow' is an inverted conditional clause equivalent to 'If it should rain tomorrow'.",
    explanationBn: "'Should it rain tomorrow' হলো 'If it rains'-এর ইনভার্টেড রূপ (Adverb Clause of Condition)।"
  },
  {
    id: 22,
    question: "Fill in the blank with the appropriate relative connective: 'This is the scientist ______ groundbreaking discoveries revolutionized oncology.'",
    options: ["who", "whom", "whose", "which"],
    correctAnswer: "whose",
    explanation: "'Whose' is the possessive relative pronoun modifying 'groundbreaking discoveries'.",
    explanationBn: "মালিকানা বা অধিকার (possessive) নির্দেশ করতে Relative Pronoun হিসেবে 'whose' বসে।"
  },
  {
    id: 23,
    question: "Select the sentence where the subordinate clause is an ADJECTIVE CLAUSE of reason introduced by 'why':",
    options: [
      "I do not know why he left the company. (Noun clause)",
      "This is the exact reason why he left the company.",
      "Why he left the company is unknown.",
      "He explained why he left the company."
    ],
    correctAnswer: "This is the exact reason why he left the company.",
    explanation: "In this sentence, 'why he left the company' has an explicit nominal antecedent ('reason') which it modifies, making it an Adjective Clause.",
    explanationBn: "এখানে 'why he left the company' ক্লজটি পূর্বপদ Noun 'reason'-কে বিশেষিত করছে, তাই এটি Adjective Clause।"
  },
  {
    id: 24,
    question: "In: 'Where there is genuine love, there is peace,' the clause 'Where there is genuine love' is:",
    options: [
      "Adverb clause of place",
      "Noun clause as subject",
      "Adjective clause",
      "Principal clause"
    ],
    correctAnswer: "Adverb clause of place",
    explanation: "'Where there is genuine love' specifies the spatial/existential location of peace (Adverb Clause of Place).",
    explanationBn: "স্থান নির্দেশ করায় 'Where there is genuine love' একটি Adverb Clause of Place।"
  },
  {
    id: 25,
    question: "What is the primary difference between a Phrase and a Clause?",
    options: [
      "A Clause possesses both a Subject and a Finite Verb; a Phrase lacks one or both.",
      "A Phrase has a subject and finite verb; a clause does not.",
      "A Clause is always longer than a phrase.",
      "Phrases only occur at the end of sentences."
    ],
    correctAnswer: "A Clause possesses both a Subject and a Finite Verb; a Phrase lacks one or both.",
    explanation: "By syntactic definition, a Clause contains its own Subject and Finite Verb predicate, whereas a Phrase is a group of words lacking a subject-finite verb combination.",
    explanationBn: "Clause-এর নিজস্ব Subject এবং Finite Verb থাকে; অপরপক্ষে Phrase-এ Subject ও Finite Verb-এর যুগলবন্দী থাকে না।"
  }
];

export default questions;
