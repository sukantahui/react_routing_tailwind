// topic2_questions.js
// Topic 2: Form vs Function — Multi-Functional Words in English
// 25 Comprehensive Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "In the sentence 'Please water the delicate plants in the morning', what part of speech is 'water'?",
    options: ["Noun", "Transitive Verb", "Adjective", "Adverb"],
    correctAnswer: 1,
    answer: "Transitive Verb",
    explanation: "'Water' is used here as an imperative finite verb taking the direct object 'the delicate plants' and expressing the action of supplying water.",
    explanationBn: "এখানে 'water' গাছে জল দেওয়ার কাজটি বুঝিয়ে Imperative Verb হিসেবে ব্যবহৃত হয়েছে এবং 'the delicate plants' হলো এর Direct Object।",
    hint: "What action is the subject being asked to perform?",
    level: "basic"
  },
  {
    id: 2,
    question: "In the sentence 'They installed a high-pressure water pipe', what is the grammatical role of 'water'?",
    options: ["Proper Noun", "Adjective / Noun-Adjunct", "Transitive Verb", "Preposition"],
    correctAnswer: 1,
    answer: "Adjective / Noun-Adjunct",
    explanation: "'Water' is placed before the noun 'pipe' to specify its type/purpose, functioning attributively as an Adjective or Noun Adjunct.",
    explanationBn: "'water' শব্দটি 'pipe' Noun-টির পূর্বে বসে পাইপের ধরন বা উদ্দেশ্য বর্ণনা করায় Attributive Adjective বা Noun-Adjunct হিসেবে কাজ করছে।",
    hint: "It modifies the following noun 'pipe'.",
    level: "basic"
  },
  {
    id: 3,
    question: "Identify the part of speech of 'fast' in: 'He ran fast to catch the 8:30 AM Barrackpore local.'",
    options: ["Adjective", "Adverb of Manner", "Noun", "Verb"],
    correctAnswer: 1,
    answer: "Adverb of Manner",
    explanation: "'Fast' modifies the dynamic action verb 'ran' (answering 'How did he run?'). Note that 'fastly' does not exist in standard English.",
    explanationBn: "'Fast' শব্দটি 'ran' Action Verb-কে modify করছে, তাই এটি Adverb of Manner। ইংরেজিতে 'Fastly' বলে কোনো শব্দ নেই।",
    hint: "Does it modify the action 'ran' or a noun?",
    level: "basic"
  },
  {
    id: 4,
    question: "Identify the part of speech of 'fast' in: 'This is a fast train to Howrah Station.'",
    options: ["Adverb", "Attributive Adjective", "Noun", "Conjunction"],
    correctAnswer: 1,
    answer: "Attributive Adjective",
    explanation: "Here 'fast' precedes and qualifies the noun 'train' (What kind of train? A fast train). Therefore, it is an Adjective.",
    explanationBn: "এখানে 'fast' শব্দটি 'train' Noun-টিকে qualify করছে, তাই এটি Attributive Adjective।",
    hint: "What kind of train is it?",
    level: "basic"
  },
  {
    id: 5,
    question: "Identify the part of speech of 'fast' in: 'Many devotees observe a strict fast on Mondays.'",
    options: ["Verb", "Adjective", "Noun", "Preposition"],
    correctAnswer: 2,
    answer: "Noun",
    explanation: "'Fast' is preceded by the article 'a' and adjective 'strict', serving as the direct object of 'observe' (meaning a period of abstinence from food).",
    explanationBn: "'a strict fast'-এ 'fast' হলো 'observe' Verb-এর Direct Object Noun (উপবাস)।",
    hint: "It is preceded by an article and adjective.",
    level: "basic"
  },
  {
    id: 6,
    question: "In the sentence 'The moon revolves round the earth', what part of speech is 'round'?",
    options: ["Adjective", "Preposition", "Adverb", "Noun"],
    correctAnswer: 1,
    answer: "Preposition",
    explanation: "'Round' is followed by the nominal object 'the earth', showing spatial orbital relationship between the moon and the earth.",
    explanationBn: "'round' শব্দটি 'the earth' Noun-এর পূর্বে বসে স্থানিক সম্পর্ক প্রকাশ করে Preposition হিসেবে ব্যবহৃত হয়েছে।",
    hint: "It governs the nominal object 'the earth'.",
    level: "intermediate"
  },
  {
    id: 7,
    question: "In the sentence 'We sat around a large round table', what part of speech is 'round'?",
    options: ["Preposition", "Adjective", "Adverb", "Verb"],
    correctAnswer: 1,
    answer: "Adjective",
    explanation: "'Round' describes the geometric shape of the noun 'table'.",
    explanationBn: "'round' শব্দটি 'table' Noun-টির গোলাকার আকৃতি বর্ণনা করায় Adjective।",
    hint: "It describes the physical shape of the table.",
    level: "basic"
  },
  {
    id: 8,
    question: "In the sentence 'The doctor made his morning round in the pediatric ward', what part of speech is 'round'?",
    options: ["Adjective", "Noun", "Verb", "Adverb"],
    correctAnswer: 1,
    answer: "Noun",
    explanation: "'Round' refers to a customary circuit of inspection, modified by 'his morning' and acting as the direct object of 'made'.",
    explanationBn: "হাসপাতালের নিয়মিত পরিদর্শন অর্থে 'round' শব্দটি এখানে Noun হিসেবে ব্যবহৃত হয়েছে।",
    hint: "It represents a scheduled circuit or tour.",
    level: "intermediate"
  },
  {
    id: 9,
    question: "In the sentence 'The sports cars round the sharp bend at high speed', what part of speech is 'round'?",
    options: ["Preposition", "Transitive Verb", "Adjective", "Adverb"],
    correctAnswer: 1,
    answer: "Transitive Verb",
    explanation: "'Round' is the finite predicate verb expressing the action of passing around the curve, taking 'the sharp bend' as its object.",
    explanationBn: "বাঁক ঘোরার কাজটি প্রকাশ করে 'round' এখানে Finite Verb হিসেবে কাজ করছে।",
    hint: "What action are the cars performing?",
    level: "intermediate"
  },
  {
    id: 10,
    question: "In the sentence 'All the students but Swadeep attended the coding workshop', what is the role of 'but'?",
    options: ["Coordinating Conjunction", "Preposition (meaning 'except')", "Adverb (meaning 'only')", "Relative Pronoun"],
    correctAnswer: 1,
    answer: "Preposition (meaning 'except')",
    explanation: "'But' is followed by the nominal 'Swadeep' and means 'except'. Hence, it functions as a Preposition.",
    explanationBn: "'but' শব্দটি 'except' (ব্যতীত) অর্থে 'Swadeep' Noun-এর পূর্বে বসে Preposition হিসেবে কাজ করছে।",
    hint: "Substitute the word 'except' in the sentence.",
    level: "intermediate"
  },
  {
    id: 11,
    question: "In the sentence 'Tuhina worked tirelessly, but she could not complete the assignment', what is 'but'?",
    options: ["Preposition", "Coordinating Conjunction", "Subordinating Conjunction", "Adverb"],
    correctAnswer: 1,
    answer: "Coordinating Conjunction",
    explanation: "'But' connects two independent coordinate clauses with contrasting ideas (one of the FANBOYS conjunctions).",
    explanationBn: "দুটি Independent Clauses-কে বিপরীত ভাব সহকারে যুক্ত করায় 'but' হলো Coordinating Conjunction।",
    hint: "It links two independent clauses with contrast.",
    level: "basic"
  },
  {
    id: 12,
    question: "In the sentence 'He is but a novice in programming', what part of speech is 'but'?",
    options: ["Conjunction", "Preposition", "Adverb of Degree / Manner (meaning 'only' or 'merely')", "Interjection"],
    correctAnswer: 2,
    answer: "Adverb of Degree / Manner (meaning 'only' or 'merely')",
    explanation: "'But' modifies the predicate meaning 'merely' or 'only'. Hence, it functions as an Adverb.",
    explanationBn: "'but' শব্দটি 'only' বা 'merely' (কেবলমাত্র) অর্থে ব্যবহৃত হয়ে Adverb হিসেবে কাজ করছে।",
    hint: "Substitute 'only' in the sentence.",
    level: "advanced"
  },
  {
    id: 13,
    question: "In the sentence 'He arrived before noon', what part of speech is 'before'?",
    options: ["Adverb of Time", "Preposition of Time", "Subordinating Conjunction", "Adjective"],
    correctAnswer: 1,
    answer: "Preposition of Time",
    explanation: "'Before' is followed by the nominal object 'noon'. A word followed by a noun/pronoun showing time or location is a Preposition.",
    explanationBn: "'before' শব্দটি 'noon' Noun-এর পূর্বে বসে সময় নির্দেশ করায় Preposition of Time।",
    hint: "Look at the word immediately following 'before'.",
    level: "basic"
  },
  {
    id: 14,
    question: "In the sentence 'He had never seen the ocean before', what part of speech is 'before'?",
    options: ["Preposition", "Adverb of Time", "Subordinating Conjunction", "Noun"],
    correctAnswer: 1,
    answer: "Adverb of Time",
    explanation: "'Before' stands alone at the end of the clause modifying the verb phrase 'had seen' (meaning previously). Hence, it is an Adverb.",
    explanationBn: "এখানে 'before'-এর পরে কোনো Noun নেই; এটি 'had seen' Verb-টিকে modify করে পূর্বে বা অতীতে অর্থে Adverb of Time হিসেবে কাজ করছে।",
    hint: "Does it have a following nominal object or stand alone?",
    level: "intermediate"
  },
  {
    id: 15,
    question: "In the sentence 'Look before you leap', what part of speech is 'before'?",
    options: ["Preposition", "Adverb", "Subordinating Conjunction", "Relative Pronoun"],
    correctAnswer: 2,
    answer: "Subordinating Conjunction",
    explanation: "'Before' introduces the subordinate adverbial clause of time 'you leap' with its own subject ('you') and finite verb ('leap').",
    explanationBn: "'before' এখানে 'you leap' ক্লজটিকে যুক্ত করায় Subordinating Conjunction of Time।",
    hint: "It introduces a complete clause with subject and verb.",
    level: "intermediate"
  },
  {
    id: 16,
    question: "In the sentence 'The train arrived late at the platform', what part of speech is 'late'?",
    options: ["Adjective", "Adverb of Time", "Noun", "Verb"],
    correctAnswer: 1,
    answer: "Adverb of Time",
    explanation: "'Late' modifies the verb 'arrived' (answering 'When did it arrive?'). 'Lately' means 'recently', so 'late' is the correct adverb here.",
    explanationBn: "'late' শব্দটি 'arrived' Verb-কে modify করায় Adverb। মনে রাখবেন 'lately' মানে 'সম্প্রতি', তাই দেরিতে অর্থে Adverb হলো 'late'।",
    hint: "Does 'late' tell us when the train arrived?",
    level: "intermediate"
  },
  {
    id: 17,
    question: "In the sentence 'The late Prime Minister was remembered with immense respect', what part of speech is 'late'?",
    options: ["Adverb", "Attributive Adjective (meaning deceased)", "Noun", "Preposition"],
    correctAnswer: 1,
    answer: "Attributive Adjective (meaning deceased)",
    explanation: "'Late' precedes the noun 'Prime Minister' and means 'deceased' (প্রয়াত). Hence, it functions as an Adjective.",
    explanationBn: "প্রয়াত অর্থে 'Prime Minister' Noun-এর পূর্বে বসে 'late' শব্দটি Adjective হিসেবে কাজ করছে।",
    hint: "It means 'deceased' describing the person.",
    level: "intermediate"
  },
  {
    id: 18,
    question: "In the sentence 'I like classical music', what part of speech is 'like'?",
    options: ["Preposition", "Transitive Verb", "Adjective", "Conjunction"],
    correctAnswer: 1,
    answer: "Transitive Verb",
    explanation: "'Like' is the finite predicate expressing emotional preference, taking 'classical music' as direct object.",
    explanationBn: "পছন্দ করা অর্থে 'like' এখানে Finite Transitive Verb।",
    hint: "It expresses the subject's preference.",
    level: "basic"
  },
  {
    id: 19,
    question: "In the sentence 'He speaks like an experienced orator', what part of speech is 'like'?",
    options: ["Verb", "Preposition of Comparison", "Conjunction", "Adverb"],
    correctAnswer: 1,
    answer: "Preposition of Comparison",
    explanation: "'Like' is followed by the nominal phrase 'an experienced orator', functioning as a Preposition of comparison.",
    explanationBn: "'an experienced orator' Noun Phrase-এর পূর্বে বসে তুলনা প্রকাশ করায় 'like' হলো Preposition।",
    hint: "It compares the person to a nominal phrase.",
    level: "intermediate"
  },
  {
    id: 20,
    question: "In the sentence 'We shall not look upon his like again', what part of speech is 'like'?",
    options: ["Verb", "Preposition", "Noun (meaning 'equal' or 'counterpart')", "Adjective"],
    correctAnswer: 2,
    answer: "Noun (meaning 'equal' or 'counterpart')",
    explanation: "'Like' is preceded by the possessive determiner 'his' and acts as the object of 'upon', meaning 'an equal person'.",
    explanationBn: "'his'-এর পরে বসে সমকক্ষ বা সদৃশ ব্যক্তি অর্থে 'like' এখানে Noun হিসেবে ব্যবহৃত হয়েছে।",
    hint: "Preceded by a possessive pronoun 'his'.",
    level: "advanced"
  },
  {
    id: 21,
    question: "In the sentence 'The well has dried up during the summer', what part of speech is 'well'?",
    options: ["Adverb", "Adjective", "Noun (water well)", "Interjection"],
    correctAnswer: 2,
    answer: "Noun (water well)",
    explanation: "'The well' is the subject naming an excavated water hole. Hence, it is a Noun.",
    explanationBn: "কূয়া বা পাতকুয়ো অর্থে Subject হিসেবে 'well' একটি Noun।",
    hint: "It is preceded by the definite article 'The'.",
    level: "basic"
  },
  {
    id: 22,
    question: "In the sentence 'Abhronila performed well in the national entrance exam', what part of speech is 'well'?",
    options: ["Noun", "Adjective", "Adverb of Manner", "Verb"],
    correctAnswer: 2,
    answer: "Adverb of Manner",
    explanation: "'Well' modifies the action verb 'performed' (How did she perform? Well). Hence, it is an Adverb.",
    explanationBn: "'performed' Action Verb-কে modify করায় 'well' হলো Adverb of Manner।",
    hint: "It modifies the verb 'performed'.",
    level: "basic"
  },
  {
    id: 23,
    question: "In the sentence 'Well, I am not convinced by your argument', what part of speech is 'Well'?",
    options: ["Noun", "Adverb", "Interjection / Discourse Marker", "Adjective"],
    correctAnswer: 2,
    answer: "Interjection / Discourse Marker",
    explanation: "'Well' at the start of dialogue expresses hesitation, consideration, or transition without syntactic linkage to the clause.",
    explanationBn: "বাক্যের শুরুতে আবেগ, দ্বিধা বা আলোচনার সূত্রপাত ঘটাতে 'Well' Interjection হিসেবে বসেছে।",
    hint: "An exclamatory word introducing spoken dialogue.",
    level: "intermediate"
  },
  {
    id: 24,
    question: "In the sentence 'The patient is now completely well', what part of speech is 'well'?",
    options: ["Adverb", "Predicative Adjective (meaning healthy)", "Noun", "Verb"],
    correctAnswer: 1,
    answer: "Predicative Adjective (meaning healthy)",
    explanation: "After the linking verb 'is', 'well' acts as a Subject Complement Adjective meaning healthy and recovered.",
    explanationBn: "Linking Verb 'is'-এর পর Subject Complement হিসেবে সুস্থ/আরোগ্য অর্থে 'well' Predicative Adjective।",
    hint: "It functions as a subject complement meaning in good health.",
    level: "advanced"
  },
  {
    id: 25,
    question: "What is the primary takeaway regarding English word classes according to Mentor Sukanta Hui?",
    options: [
      "Every English word has only one permanent part of speech in dictionaries",
      "A word's part of speech cannot be decided in isolation; syntactic function in the specific sentence dictates its class",
      "Parts of speech only matter in Latin",
      "All words ending in '-ly' are adverbs without exception"
    ],
    correctAnswer: 1,
    answer: "A word's part of speech cannot be decided in isolation; syntactic function in the specific sentence dictates its class",
    explanation: "In English, form does not fix function. You must analyze what syntactic work a word is doing in the clause before categorizing it.",
    explanationBn: "ইংরেজিতে কোনো শব্দকে আলাদাভাবে দেখে তার Part of Speech নিশ্চিত করা যায় না; বাক্যে শব্দটি কী কাজ (Function) করছে তা দেখেই তার পদ নির্ধারণ করতে হয়।",
    hint: "Function always takes precedence over static form.",
    level: "basic"
  }
];

export default questions;
