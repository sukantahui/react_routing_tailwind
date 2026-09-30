// topic2_questions.js
// Module 001_004: Phrases vs Clauses & Foundational Sentence Transformations
// Topic 2: What is a Clause? The Subject + Finite Verb Nexus
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What is the indispensable, non-negotiable requirement for any group of words to be classified as a CLAUSE?",
    options: [
      "It must contain a Subject and a Finite Verb nexus",
      "It must start with a preposition and end with a noun",
      "It must be exactly 10 words long",
      "It must contain at least two adjectives"
    ],
    correctAnswer: 0,
    explanation: "A clause is fundamentally defined by the presence of a Subject linked to a Finite Verb (a verb conjugated for tense, person, and number).",
    explanationBn: "Clause (বাক্যাংশ) হওয়ার প্রধান ও অবিচ্ছেদ্য শর্ত হলো এতে একটি Subject এবং একটি Finite Verb (সমাপিকা ক্রিয়া)-এর বন্ধন থাকতে হবে।"
  },
  {
    id: 2,
    question: "What is a FINITE VERB, and how does it differ from a non-finite verb?",
    options: [
      "A finite verb changes its form according to tense (past/present), person (1st/2nd/3rd), and number (singular/plural)",
      "A finite verb is always in the -ing form",
      "A finite verb can never have a subject",
      "A finite verb is always preceded by 'to'"
    ],
    correctAnswer: 0,
    explanation: "A finite verb is bound by tense and agreement (e.g., 'he writes', 'they write', 'he wrote'), whereas non-finites (infinitives, gerunds, participles) do not show tense agreement.",
    explanationBn: "Finite Verb (সমাপিকা ক্রিয়া) Tense, Person ও Number অনুযায়ী রূপ পরিবর্তন করে; পক্ষান্তরে Non-finite Verb (অসমাপিকা ক্রিয়া) কোনো Tense বা Agreement প্রকাশ করে না।"
  },
  {
    id: 3,
    question: "How many clauses are present in the sentence: 'When the seminar concluded, the students applauded, and the mentor answered their questions'?",
    options: [
      "3 clauses (each containing its own subject and finite verb)",
      "1 long clause",
      "2 clauses",
      "4 clauses"
    ],
    correctAnswer: 0,
    explanation: "Clause 1: 'When the seminar concluded' (S: seminar, V: concluded); Clause 2: 'the students applauded' (S: students, V: applauded); Clause 3: 'the mentor answered their questions' (S: mentor, V: answered). Total: 3 clauses.",
    explanationBn: "বাক্যে ৩টি পৃথক Finite Verb ('concluded', 'applauded', 'answered') এবং ৩টি Subject থাকায় এতে মোট ৩টি Clause রয়েছে।"
  },
  {
    id: 4,
    question: "In 'Having finished the code review, Swadeep shut down his workstation', how many CLAUSES are present?",
    options: [
      "Only 1 clause ('Swadeep shut down his workstation') — the first part is a participial phrase",
      "2 clauses",
      "3 clauses",
      "No clauses"
    ],
    correctAnswer: 0,
    explanation: "'Having finished...' contains a non-finite perfect participle, forming a PHRASE. The only finite verb is 'shut down', meaning there is exactly 1 independent clause.",
    explanationBn: "'Having finished...' একটি Non-finite Participial Phrase (কোনো Finite Verb নেই)। বাক্যে কেবল একটি Finite Verb 'shut down' থাকায় এটি ১টি Clause-বিশিষ্ট Simple Sentence।"
  },
  {
    id: 5,
    question: "Which of the following contains a NON-FINITE verb form that CANNOT independently anchor a clause?",
    options: [
      "To master full-stack web development",
      "Swadeep masters full-stack web development",
      "Debangshu mastered full-stack web development",
      "They are mastering full-stack web development"
    ],
    correctAnswer: 0,
    explanation: "'To master...' is an infinitive (non-finite). All other options contain conjugated finite verbs ('masters', 'mastered', 'are mastering').",
    explanationBn: "'To master' হলো Non-finite Infinitive যা স্বাধীনভাবে কোনো Clause গঠন করতে পারে না।"
  },
  {
    id: 6,
    question: "In the sentence 'Although the rain was heavy, we reached the Barrackpore campus on time', what is 'the rain was heavy'?",
    options: [
      "The clause nucleus (Subject: 'the rain' + Finite Verb: 'was')",
      "A prepositional phrase",
      "A noun phrase without verb",
      "An infinitive complement"
    ],
    correctAnswer: 0,
    explanation: "'The rain' is the subject noun phrase and 'was' is the past finite linking verb, constituting a full clause.",
    explanationBn: "'The rain' (Subject) এবং 'was' (Finite Verb) মিলে একটি পূর্ণাঙ্গ Clause গঠন করেছে।"
  },
  {
    id: 7,
    question: "Identify the FINITE VERB in: 'The developer wanted to optimize the database query.'",
    options: [
      "'wanted' (conjugated in past tense)",
      "'to optimize' (infinitive)",
      "'database'",
      "'query'"
    ],
    correctAnswer: 0,
    explanation: "'Wanted' is the finite verb inflected for past tense. 'To optimize' is a non-finite to-infinitive complement.",
    explanationBn: "'Wanted' হলো Past Tense-এ Conjugated Finite Verb; আর 'to optimize' হলো Non-finite Infinitive।"
  },
  {
    id: 8,
    question: "Which of the following word groups is a COMPLETE CLAUSE?",
    options: [
      "Because Sukanta Sir explained the concept so clearly",
      "With great dedication and endless patience",
      "To build robust scalable web applications",
      "The brilliant algorithm designed by the cohort"
    ],
    correctAnswer: 0,
    explanation: "'Because Sukanta Sir explained...' contains Subject ('Sukanta Sir') and Finite Verb ('explained'), making it a subordinate clause. The others are phrases.",
    explanationBn: "'Because Sukanta Sir explained...'-এ Subject ('Sukanta Sir') ও Finite Verb ('explained') রয়েছে, তাই এটি একটি Clause।"
  },
  {
    id: 9,
    question: "In 'He likes playing chess on Sunday mornings', what is 'playing chess on Sunday mornings'?",
    options: [
      "A Non-finite Gerund Phrase acting as the object of the finite verb 'likes'",
      "A subordinate finite clause",
      "An independent clause",
      "A relative clause"
    ],
    correctAnswer: 0,
    explanation: "'Playing' is a non-finite gerund, not a finite verb. The entire unit is a Gerund Phrase acting as the object of finite verb 'likes'.",
    explanationBn: "'Playing' এখানে Non-finite Gerund, তাই এটি একটি Gerund Phrase যা Finite Verb 'likes'-এর Object হিসেবে বসেছে।"
  },
  {
    id: 10,
    question: "Why is a finite verb called the 'HEART' of an English sentence/clause?",
    options: [
      "Because without a finite verb, no assertion, question, command, or predication can exist in English syntax",
      "Because it must be placed physically in the center of the sentence",
      "Because it always refers to emotional matters",
      "Because it has the longest spelling"
    ],
    correctAnswer: 0,
    explanation: "A finite verb anchors tense, person, number, and mood, transforming a random collection of words into a functional syntactic predication.",
    explanationBn: "Finite Verb ছাড়া ইংরেজিতে কোনো বক্তব্য বা বাক্য গঠিত হতে পারে না; এটি Tense ও Person ধারণ করে বাক্যের প্রাণ প্রতিষ্ঠা করে।"
  },
  {
    id: 11,
    question: "How many finite verbs (and therefore clauses) are in: 'The boy who won the first prize is my younger brother'?",
    options: [
      "2 finite verbs ('won', 'is') -> 2 clauses",
      "1 finite verb -> 1 clause",
      "3 finite verbs -> 3 clauses",
      "No finite verbs"
    ],
    correctAnswer: 0,
    explanation: "Finite verb 1: 'won' (in relative clause 'who won the first prize'); Finite verb 2: 'is' (in main clause 'The boy ... is my younger brother'). Total: 2 clauses.",
    explanationBn: "বাক্যে ২টি Finite Verb রয়েছে ('won' এবং 'is'), তাই এতে মোট ২টি Clause বিদ্যমান।"
  },
  {
    id: 12,
    question: "In the sentence 'Barking dogs seldom bite', what is the status of 'Barking' vs 'bite'?",
    options: [
      "'Barking' is a non-finite present participle (adjective); 'bite' is the finite verb.",
      "Both 'Barking' and 'bite' are finite verbs.",
      "Both are non-finite verbs.",
      "'Barking' is the finite verb and 'bite' is the noun."
    ],
    correctAnswer: 0,
    explanation: "'Barking' is a non-finite participle modifying 'dogs'. 'Bite' is the finite present-tense verb agreeing with plural subject 'dogs'.",
    explanationBn: "'Barking' হলো Non-finite Participle (Adjective); আর 'bite' হলো Finite Verb যা Subject 'dogs'-এর সাথে যুক্ত।"
  },
  {
    id: 13,
    question: "Identify the sentence that consists of EXACTLY ONE independent clause (Simple Sentence):",
    options: [
      "Despite the torrential downpour, the team deployed the application successfully.",
      "Although it rained torrentially, the team deployed the application.",
      "The rain was heavy, but the team deployed the application.",
      "When the rain stopped, the team deployed the application."
    ],
    correctAnswer: 0,
    explanation: "'Despite the torrential downpour' is a prepositional phrase. The sentence has only ONE subject ('the team') and ONE finite verb ('deployed'), making it a Simple Sentence.",
    explanationBn: "'Despite the torrential downpour' একটি Prepositional Phrase; পুরো বাক্যে কেবল ১টি Finite Verb ('deployed') থাকায় এটি Simple Sentence।"
  },
  {
    id: 14,
    question: "In the complex sentence 'I know where you live', what is 'where you live'?",
    options: [
      "A Subordinate Noun Clause acting as the direct object of 'know'",
      "A Prepositional Phrase",
      "An Adverb Phrase",
      "An Independent Clause"
    ],
    correctAnswer: 0,
    explanation: "'Where you live' contains Subject ('you') + Finite Verb ('live') and answers 'What do I know?', functioning as a Noun Clause object.",
    explanationBn: "'Where you live' হলো Noun Clause যাতে Subject ('you') ও Finite Verb ('live') রয়েছে এবং এটি 'know'-এর Object।"
  },
  {
    id: 15,
    question: "In 'This is the laptop that Swadeep purchased', what is 'that Swadeep purchased'?",
    options: [
      "A Subordinate Relative / Adjective Clause modifying 'laptop'",
      "A Noun Phrase",
      "An Adverb Clause of Reason",
      "A Main Clause"
    ],
    correctAnswer: 0,
    explanation: "'That Swadeep purchased' contains Subject ('Swadeep') + Finite Verb ('purchased') and qualifies the antecedent noun 'laptop', making it an Adjective Clause.",
    explanationBn: "'That Swadeep purchased' একটি Relative/Adjective Clause যা পূর্ববর্তী Noun 'laptop'-কে বিশেষিত করছে।"
  },
  {
    id: 16,
    question: "In 'You will succeed if you work diligently', what is 'if you work diligently'?",
    options: [
      "A Subordinate Adverb Clause of Condition",
      "A Noun Clause",
      "An Adjective Clause",
      "An Independent Main Clause"
    ],
    correctAnswer: 0,
    explanation: "'If you work diligently' contains Subject ('you') + Finite Verb ('work') and sets a condition for the main verb 'will succeed', making it an Adverbial Clause of Condition.",
    explanationBn: "'If you work diligently' হলো শর্তসূচক Adverb Clause of Condition।"
  },
  {
    id: 17,
    question: "Can an imperative sentence like 'Stop!' be classified as a complete clause?",
    options: [
      "Yes, because it contains a finite base verb 'Stop' and an implied second-person subject '(You)'.",
      "No, because it is only one word.",
      "No, because it lacks punctuation.",
      "Yes, only if an exclamation mark is present."
    ],
    correctAnswer: 0,
    explanation: "'Stop!' has an underlying syntactic subject '(You)' and a finite imperative verb 'Stop', fulfilling the definition of a complete clause.",
    explanationBn: "'Stop!'-এ উহ্য Subject '(You)' এবং Finite Verb 'Stop' রয়েছে, তাই এটি ব্যাকরণগতভাবে একটি পূর্ণাঙ্গ Clause।"
  },
  {
    id: 18,
    question: "Identify the sentence with a FINITE AUXILIARY and a NON-FINITE LEXICAL VERB:",
    options: [
      "The students are writing their code.",
      "The students wrote their code.",
      "The students write their code.",
      "Students like code."
    ],
    correctAnswer: 0,
    explanation: "In 'are writing', 'are' is the finite auxiliary (inflected for present plural) and 'writing' is the non-finite present participle.",
    explanationBn: "'Are writing'-এ 'are' হলো Finite Auxiliary Verb এবং 'writing' হলো Non-finite Participle।"
  },
  {
    id: 19,
    question: "What happens to the finite verb when third-person singular 'He' is used in Simple Present tense?",
    options: [
      "The finite verb takes an -s / -es inflection (e.g., 'He writes', 'He teaches').",
      "The finite verb becomes an infinitive.",
      "The finite verb drops all vowels.",
      "The finite verb changes to past tense."
    ],
    correctAnswer: 0,
    explanation: "In the simple present tense, finite verbs uniquely inflect with an '-s/-es' suffix to agree with 3rd-person singular subjects (He/She/It).",
    explanationBn: "Simple Present Tense-এ 3rd Person Singular Subject (He/She/It)-এর সাথে Finite Verb-এর শেষে '-s/-es' যুক্ত হয়।"
  },
  {
    id: 20,
    question: "In the sentence 'Seeing the police, the thief fled', what is 'Seeing the police'?",
    options: [
      "A Non-finite Participial Phrase (NOT a clause)",
      "A subordinate adverb clause",
      "An independent clause",
      "A noun clause"
    ],
    correctAnswer: 0,
    explanation: "'Seeing' is a non-finite present participle lacking tense and subject agreement, making 'Seeing the police' a Participial Phrase.",
    explanationBn: "'Seeing the police' হলো Non-finite Participial Phrase কারণ এতে কোনো Finite Verb নেই।"
  },
  {
    id: 21,
    question: "Transform the phrase 'Seeing the police' into a full SUBORDINATE CLAUSE:",
    options: [
      "When he saw the police",
      "To see the police",
      "By seeing the police",
      "On seeing the police"
    ],
    correctAnswer: 0,
    explanation: "'When he saw the police' introduces subject 'he' and finite verb 'saw', transforming the phrase into a complete Adverb Clause of Time.",
    explanationBn: "'When he saw the police'-এ Subject 'he' এবং Finite Verb 'saw' যুক্ত হওয়ায় এটি একটি পূর্ণাঙ্গ Clause-এ রূপান্তরিত হয়েছে।"
  },
  {
    id: 22,
    question: "Which of the following groups of words contains ZERO finite verbs?",
    options: [
      "Running through the crowded streets of Kolkata to catch the morning train",
      "He ran through the crowded streets of Kolkata",
      "She catches the morning train",
      "They were running through the streets"
    ],
    correctAnswer: 0,
    explanation: "'Running' (participle) and 'to catch' (infinitive) are both non-finite. There is no finite verb, so this is a long Participial/Infinitive Phrase.",
    explanationBn: "এতে 'Running' (Participle) এবং 'to catch' (Infinitive) উভয়ই Non-finite; কোনো Finite Verb না থাকায় এটি কেবল একটি শব্দগুচ্ছ (Phrase)।"
  },
  {
    id: 23,
    question: "What is the relationship between Clauses and Sentence Structures (Simple, Compound, Complex)?",
    options: [
      "Simple = 1 Independent Clause; Compound = 2+ Independent Clauses; Complex = 1 Independent + 1+ Subordinate Clauses.",
      "All sentences must have exactly 5 clauses.",
      "Clauses only exist in interrogative sentences.",
      "Compound sentences have no finite verbs."
    ],
    correctAnswer: 0,
    explanation: "Sentence types are classified by clause composition: Simple (1 Main Clause), Compound (2+ Main Clauses joined by coordinating conjunctions), Complex (1 Main + 1+ Subordinate Clauses).",
    explanationBn: "Clause-এর সংখ্যার ভিত্তিতে বাক্য গঠিত হয়: Simple (১টি Main Clause), Compound (২টি Main Clause), Complex (১টি Main + ১টি বা ততোধিক Subordinate Clause)।"
  },
  {
    id: 24,
    question: "In 'Sukanta Sir believes that consistency builds extraordinary mastery', what is 'that consistency builds extraordinary mastery'?",
    options: [
      "A Subordinate Noun Clause acting as object of 'believes'",
      "An Adjective Phrase",
      "An Independent Main Clause",
      "A Prepositional Phrase"
    ],
    correctAnswer: 0,
    explanation: "It contains conjunction 'that', subject 'consistency', and finite verb 'builds', functioning nominally as the object of 'believes'.",
    explanationBn: "'that consistency builds...' হলো Subordinate Noun Clause যা Verb 'believes'-এর Object হিসেবে কাজ করছে।"
  },
  {
    id: 25,
    question: "Why is mastering the Clause Nexus crucial for eliminating SENTENCE FRAGMENTS in professional writing?",
    options: [
      "Because recognizing the requirement for a Subject + Finite Verb prevents writers from punctuating standalone phrases or dependent clauses as full sentences.",
      "Because it automatically fixes spelling errors.",
      "Because it replaces commas with hyphens.",
      "Because it makes all writing passive."
    ],
    correctAnswer: 0,
    explanation: "Sentence fragments occur when phrases or dependent clauses are mistakenly punctuated as independent sentences. Understanding the Subject + Finite Verb nexus guarantees syntactic completeness.",
    explanationBn: "Clause Nexus আয়ত্ত করলে Sentence Fragment (অসম্পূর্ণ বাক্য)-এর ভুল দূর হয় এবং প্রতিটি বাক্যে Subject ও Finite Verb-এর পূর্ণতা নিশ্চিত থাকে।"
  }
];

export default questions;
