// topic2_questions.js
// Module 001_002: Sentence Anatomy
// Topic 2: Simple Subjects vs Compound Subjects & Concord Invariants
// 25 Comprehensive Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What is the Simple Subject of a sentence?",
    options: [
      "The single core head noun or pronoun that performs or undergoes the verb, stripped of all modifiers",
      "The entire sentence excluding punctuation",
      "The first word of the sentence only",
      "A subordinate conjunction"
    ],
    correctAnswer: 0,
    answer: "The single core head noun or pronoun that performs or undergoes the verb, stripped of all modifiers",
    explanation: "The Simple Subject is the essential noun or pronoun kernel that governs subject-verb agreement (e.g., in 'The diligent scholar from Barrackpore won', the simple subject is 'scholar').",
    explanationBn: "Simple Subject হলো সমস্ত বিশেষণ, Article ও Prepositional Phrase বাদ দিয়ে বাক্যের মূল বিশেষ্য বা সর্বনাম পদ যা ক্রিয়ার রূপ নির্ধারণ করে।",
    hint: "The central head noun stripped of modifiers.",
    level: "basic"
  },
  {
    id: 2,
    question: "What constitutes a Compound Subject in English syntax?",
    options: [
      "Two or more simple subjects joined by a coordinating or correlative conjunction sharing the same finite predicate verb",
      "A subject with two verbs",
      "A subject that contains an adjective",
      "A subject written in uppercase letters"
    ],
    correctAnswer: 0,
    answer: "Two or more simple subjects joined by a coordinating or correlative conjunction sharing the same finite predicate verb",
    explanation: "A Compound Subject consists of two or more nouns/pronouns joined by connectors (and, or, nor) acting together as the subject of a single predicate (e.g., 'Swadeep and Debangshu coded the algorithm').",
    explanationBn: "Compound Subject হলো 'and', 'or', 'nor' ইত্যাদি Conjunction দ্বারা যুক্ত একাধিক কর্তা যা একটিমাত্র ক্রিয়াপদকে পরিচালনা করে।",
    hint: "Two or more subjects joined by conjunctions.",
    level: "basic"
  },
  {
    id: 3,
    question: "When two singular subjects are joined by 'AND', what verb number do they typically take?",
    options: [
      "A Plural Verb (e.g., 'Swadeep and Tuhina are present')",
      "A Singular Verb",
      "No verb is needed",
      "Only a past tense verb"
    ],
    correctAnswer: 0,
    answer: "A Plural Verb (e.g., 'Swadeep and Tuhina are present')",
    explanation: "Standard rule: 1 + 1 = 2 (plural). Two distinct singular entities joined by 'and' require a plural verb.",
    explanationBn: "'and' দিয়ে দুটি পৃথক Singular Subject যুক্ত হলে তারা মিলিতভাবে বহুবচন (Plural) গঠন করে এবং Plural Verb (are/were/have) গ্রহণ করে।",
    hint: "Two distinct entities combined create a plural subject.",
    level: "basic"
  },
  {
    id: 4,
    question: "In the sentence 'Bread and butter is a wholesome breakfast', why is the singular verb 'is' used instead of 'are'?",
    options: [
      "Because 'Bread and butter' is viewed conceptually as a single composite culinary unit / dish",
      "Because 'butter' is uncountable",
      "Because 'breakfast' is singular",
      "It is an idiom that violates all grammar rules"
    ],
    correctAnswer: 0,
    answer: "Because 'Bread and butter' is viewed conceptually as a single composite culinary unit / dish",
    explanation: "When two nouns joined by 'and' express a single unified concept, dish, or trade, they take a singular verb (e.g., 'Slow and steady wins the race', 'Time and tide waits for no man').",
    explanationBn: "'Bread and butter' যখন একটিমাত্র অবিচ্ছেদ্য খাবার বা ভাব প্রকাশ করে, তখন তা Singular হিসেবে গণ্য হয় এবং Singular Verb 'is' গ্রহণ করে।",
    hint: "They express a single unified concept.",
    level: "intermediate"
  },
  {
    id: 5,
    question: "In 'The novelist and poet has arrived in Barrackpore', why is 'has' singular?",
    options: [
      "The single article 'The' before the first noun indicates that one person holds both designations (novelist & poet)",
      "Because poet is singular",
      "Because arrived is past participle",
      "It is a typographical mistake"
    ],
    correctAnswer: 0,
    answer: "The single article 'The' before the first noun indicates that one person holds both designations (novelist & poet)",
    explanation: "If two nouns refer to the same person, only the first noun takes an article, and the verb is singular ('The novelist and poet has arrived'). If two distinct persons are meant, both take articles ('The novelist and the poet have arrived').",
    explanationBn: "যদি একটিমাত্র Article ('The') প্রথম পদের আগে বসে, তবে একই ব্যক্তি দুটি পদে আসীন বোঝায় এবং Singular Verb ('has') বসে; আর 'The novelist and the poet' বললে দুজন আলাদা ব্যক্তি বুঝিয়ে Plural Verb ('have') বসত।",
    hint: "Count the articles: one article = one person.",
    level: "advanced"
  },
  {
    id: 6,
    question: "Which verb correctly completes: 'The mentor, along with his diligent students, _____ inspecting the new science laboratory'?",
    options: ["is", "are", "were", "have been"],
    correctAnswer: 0,
    answer: "is",
    explanation: "Parenthetical / intervening phrases introduced by 'along with', 'as well as', 'together with', 'in addition to' do not alter subject number. The verb agrees strictly with the first subject ('The mentor' -> 'is').",
    explanationBn: "'along with', 'as well as', 'together with'-এর মতো সংযোজক থাকলে Verb সর্বদা প্রথম Subject ('The mentor') অনুযায়ী Singular ('is') হবে।",
    hint: "The intervening phrase does not change the singular subject.",
    level: "intermediate"
  },
  {
    id: 7,
    question: "What is the Rule of Proximity governing subjects joined by 'Either... or' and 'Neither... nor'?",
    options: [
      "The verb agrees in number and person with the SUBJECT CLOSER (nearest) to it",
      "The verb is always singular",
      "The verb is always plural",
      "The verb agrees with the first subject"
    ],
    correctAnswer: 0,
    answer: "The verb agrees in number and person with the SUBJECT CLOSER (nearest) to it",
    explanation: "Rule of Proximity: 'Either Swadeep or his brothers are responsible' vs 'Either the brothers or Swadeep is responsible'.",
    explanationBn: "Rule of Proximity (নিকটবর্তী পদের নিয়ম): 'Either...or' বা 'Neither...nor' থাকলে Verb-এর ঠিক নিকটবর্তী Subject অনুযায়ী Verb-এর রূপ নির্ধারিত হয়।",
    hint: "The nearest subject to the verb governs agreement.",
    level: "intermediate"
  },
  {
    id: 8,
    question: "Which sentence demonstrates correct Subject-Verb agreement with 'Neither... nor'?",
    options: [
      "Neither Swadeep nor his friends are present in the seminar.",
      "Neither Swadeep nor his friends is present in the seminar.",
      "Neither his friends nor Swadeep are present in the seminar.",
      "Neither Swadeep nor his friends has come."
    ],
    correctAnswer: 0,
    answer: "Neither Swadeep nor his friends are present in the seminar.",
    explanation: "The nearer subject 'his friends' is plural, requiring the plural verb 'are'.",
    explanationBn: "Verb-এর নিকটবর্তী Subject হলো 'his friends' (Plural), তাই Plural Verb 'are' সঠিক।",
    hint: "'his friends' is plural and closest to the verb.",
    level: "intermediate"
  },
  {
    id: 9,
    question: "In the sentence 'Every student and every mentor was present', why is 'was' singular despite 'and'?",
    options: [
      "When coordinate subjects are preceded by 'Each' or 'Every', they remain grammatically singular and require a singular verb",
      "Because mentor is singular",
      "Because present is an adjective",
      "It is a printing error"
    ],
    correctAnswer: 0,
    answer: "When coordinate subjects are preceded by 'Each' or 'Every', they remain grammatically singular and require a singular verb",
    explanation: "The distributives 'Each' and 'Every' individualize each item, keeping the compound subject singular (e.g., 'Every boy and every girl was given a prize').",
    explanationBn: "'Every' বা 'Each' দ্বারা যুক্ত পদগুলো সর্বদা Singular থাকে এবং তাদের সাথে Singular Verb ('was') বসে।",
    hint: "'Each' and 'Every' make subjects singular.",
    level: "intermediate"
  },
  {
    id: 10,
    question: "Identify the Simple Subject in: 'The exceptionally rapid growth of modern web technologies fascinates researchers.'",
    options: ["growth", "technologies", "researchers", "web"],
    correctAnswer: 0,
    answer: "growth",
    explanation: "'Growth' is the head singular noun of the subject phrase. 'Technologies' is merely the object of the preposition 'of'. Hence, the verb is singular ('fascinates').",
    explanationBn: "Preposition 'of'-এর ভেতরের পদ 'technologies' কর্তা হতে পারে না; মূল Simple Subject হলো 'growth', তাই Verb Singular ('fascinates')।",
    hint: "Find the head noun before the preposition 'of'.",
    level: "intermediate"
  },
  {
    id: 11,
    question: "In 'Debangshu, as well as Tuhina and Abhronila, has completed the assignment', why is 'has' used?",
    options: [
      "Because 'as well as' introduces an additive parenthetical phrase, so the verb agrees strictly with the singular head 'Debangshu'",
      "Because assignment is singular",
      "Because completed is past participle",
      "Because 'has' is shorter than 'have'"
    ],
    correctAnswer: 0,
    answer: "Because 'as well as' introduces an additive parenthetical phrase, so the verb agrees strictly with the singular head 'Debangshu'",
    explanation: "'As well as' does not function like 'and'. The grammatical subject remains the first noun 'Debangshu' (Singular -> 'has').",
    explanationBn: "'as well as' কখনো 'and'-এর মতো বহুবচন তৈরি করে না; ক্রিয়াটি প্রথম Subject 'Debangshu' অনুযায়ী Singular ('has') হবে।",
    hint: "The subject is the first noun 'Debangshu'.",
    level: "intermediate"
  },
  {
    id: 12,
    question: "Which of the following is a Compound Subject containing three coordinated elements?",
    options: [
      "Swadeep, Tuhina, and Debangshu developed the full-stack architecture.",
      "Swadeep developed the application with Tuhina.",
      "Debangshu coded and tested the module.",
      "The students from Barrackpore presented their research."
    ],
    correctAnswer: 0,
    answer: "Swadeep, Tuhina, and Debangshu developed the full-stack architecture.",
    explanation: "'Swadeep, Tuhina, and Debangshu' are three coordinate nominal subjects sharing the predicate 'developed...'.",
    explanationBn: "'Swadeep, Tuhina, and Debangshu' হলো তিনটি পদের সমন্বয়ে গঠিত Compound Subject।",
    hint: "Three coordinated nouns acting as subject.",
    level: "basic"
  },
  {
    id: 13,
    question: "In the sentence 'Ten thousand rupees is a substantial amount for a student scholarship', why is 'is' singular?",
    options: [
      "A specific quantity, lump sum of money, distance, or period of time is viewed as a single collective unit",
      "Because rupees is a singular word",
      "Because scholarship is singular",
      "It is an error"
    ],
    correctAnswer: 0,
    answer: "A specific quantity, lump sum of money, distance, or period of time is viewed as a single collective unit",
    explanation: "Lump sums of money ('ten thousand rupees'), distances ('ten miles'), and periods of time ('five years') take singular verbs when viewed as a single quantity.",
    explanationBn: "টাকার মোট অঙ্ক (Lump Sum), দূরত্ব বা সময় যখন একটি অখণ্ড সমষ্টি হিসেবে প্রকাশিত হয়, তখন Singular Verb ('is') বসে।",
    hint: "A lump sum quantity acts as a single unit.",
    level: "intermediate"
  },
  {
    id: 14,
    question: "In 'Not only Debangshu but also his classmates were praised by the principal', why is 'were' used?",
    options: [
      "In 'Not only... but also', the verb agrees with the subject following 'but also' ('his classmates' -> plural)",
      "Because principal is plural",
      "Because praised is passive",
      "Because Debangshu is plural"
    ],
    correctAnswer: 0,
    answer: "In 'Not only... but also', the verb agrees with the subject following 'but also' ('his classmates' -> plural)",
    explanation: "In correlative pairs, agreement is governed by the second subject attached to 'but also'.",
    explanationBn: "'Not only... but also'-র ক্ষেত্রে 'but also'-র পরবর্তী Subject ('his classmates' - Plural) অনুযায়ী Plural Verb 'were' বসেছে।",
    hint: "Agrees with the noun following 'but also'.",
    level: "intermediate"
  },
  {
    id: 15,
    question: "In 'The quality of these mangoes is exceptional', identify the Simple Subject and explain why 'are' is incorrect:",
    options: [
      "The simple subject is 'quality' (singular); 'mangoes' is merely the object of the preposition 'of', so 'are' would be a false proximity error",
      "The simple subject is 'mangoes'",
      "The simple subject is 'these'",
      "The simple subject is 'exceptional'"
    ],
    correctAnswer: 0,
    answer: "The simple subject is 'quality' (singular); 'mangoes' is merely the object of the preposition 'of', so 'are' would be a false proximity error",
    explanation: "This is the classic 'Error of Proximity'. The subject is 'quality' (singular), requiring 'is'.",
    explanationBn: "এটি 'Error of Proximity'-র উৎকৃষ্ট উদাহরণ। আসল Subject হলো 'quality' (Singular), তাই 'is' বসবে ('mangoes' দেখে 'are' বসানো ভুল)।",
    hint: "Error of proximity: don't match the verb to the prepositional object.",
    level: "intermediate"
  },
  {
    id: 16,
    question: "Which of the following sentences features a Compound Subject?",
    options: [
      "Time and tide wait for no man.",
      "The clock ticked steadily on the wall.",
      "Swadeep programmed throughout the night.",
      "The team celebrated their victory."
    ],
    correctAnswer: 0,
    answer: "Time and tide wait for no man.",
    explanation: "'Time and tide' is a compound subject composed of two coordinate nouns.",
    explanationBn: "'Time and tide' হলো দুটি Noun দ্বারা গঠিত Compound Subject।",
    hint: "Two coordinated nouns acting together.",
    level: "basic"
  },
  {
    id: 17,
    question: "In 'Mathematics is an intriguing subject', why is 'is' singular despite the terminal '-s' on 'Mathematics'?",
    options: [
      "'Mathematics' is a singular abstract field of study that happens to end in '-s'",
      "It is plural in American English",
      "Because subject is singular",
      "It is an abbreviation"
    ],
    correctAnswer: 0,
    answer: "'Mathematics' is a singular abstract field of study that happens to end in '-s'",
    explanation: "Branches of learning (Mathematics, Physics, Economics, Civics) and news items (News) are singular in meaning and concord.",
    explanationBn: "বিষয় বা শাস্ত্রের নাম (Mathematics, Physics, Economics) দেখতে বহুবচনের মতো হলেও এরা Singular এবং Singular Verb ('is') গ্রহণ করে।",
    hint: "Field of study ending in '-s' is singular in meaning.",
    level: "basic"
  },
  {
    id: 18,
    question: "In 'The scissors are kept in the top drawer', why is 'scissors' plural?",
    options: [
      "'Scissors' is an inherently paired plural noun (two blades) that has no singular form and requires a plural verb",
      "Because drawer is singular",
      "Because kept is passive",
      "It can also take 'is'"
    ],
    correctAnswer: 0,
    answer: "'Scissors' is an inherently paired plural noun (two blades) that has no singular form and requires a plural verb",
    explanation: "Bipartite instruments (scissors, pliers, tongs, spectacles, trousers) are grammatically plural unless preceded by 'a pair of'.",
    explanationBn: "কাঁচি (scissors), চশমা (spectacles), প্যান্ট (trousers) ইত্যাদি দুটি অংশের সমন্বয়ে গঠিত হওয়ায় এরা সর্বদা Plural Verb গ্রহণ করে।",
    hint: "Bipartite instrument consisting of two parts.",
    level: "intermediate"
  },
  {
    id: 19,
    question: "How does the verb change if 'A pair of scissors' is used as the subject?",
    options: [
      "It becomes singular ('A pair of scissors IS on the table')",
      "It remains plural",
      "It becomes future tense",
      "It cannot take any verb"
    ],
    correctAnswer: 0,
    answer: "It becomes singular ('A pair of scissors IS on the table')",
    explanation: "When 'a pair of' is used, 'pair' becomes the singular head noun governing the verb ('A pair of scissors is...').",
    explanationBn: "'A pair of' যুক্ত হলে মূল Head Noun হয় 'pair' (Singular), তাই তখন Singular Verb ('is') বসে।",
    hint: "Head noun becomes 'pair' (singular).",
    level: "intermediate"
  },
  {
    id: 20,
    question: "In 'One of my dearest friends is an accomplished surgeon', why is 'is' singular instead of 'are'?",
    options: [
      "The head subject is 'One' (singular); 'of my dearest friends' is a prepositional phrase showing the set from which one is chosen",
      "Because surgeon is singular",
      "Because friends is plural",
      "It is an error and should be 'are'"
    ],
    correctAnswer: 0,
    answer: "The head subject is 'One' (singular); 'of my dearest friends' is a prepositional phrase showing the set from which one is chosen",
    explanation: "In 'One of + Plural Noun', the simple subject is 'One', strictly mandating a singular verb ('is').",
    explanationBn: "'One of + Plural Noun'-এর ক্ষেত্রে মূল কর্তা হলো 'One' (একজন), তাই সর্বদা Singular Verb ('is') বসবে।",
    hint: "'One' is the singular head subject.",
    level: "intermediate"
  },
  {
    id: 21,
    question: "In the sentence 'Many a student has failed due to lack of regular revision', what is the concord rule?",
    options: [
      "'Many a' takes a singular countable noun and requires a singular verb ('has failed')",
      "'Many a' always takes a plural verb",
      "'Many a' is only used in poetry",
      "'Student' should be plural"
    ],
    correctAnswer: 0,
    answer: "'Many a' takes a singular countable noun and requires a singular verb ('has failed')",
    explanation: "Although semantically referring to many people, grammatically 'Many a + Singular Noun' requires a singular verb.",
    explanationBn: "'Many a'-র পরে Singular Noun বসে এবং ব্যাকরণ অনুযায়ী Singular Verb ('has failed') ব্যবহৃত হয়।",
    hint: "'Many a + singular noun' takes a singular verb.",
    level: "advanced"
  },
  {
    id: 22,
    question: "Identify the Compound Subject in: 'Either patience or perseverance is required to succeed in competitive exams.'",
    options: [
      "'Either patience or perseverance'",
      "'patience'",
      "'perseverance'",
      "'competitive exams'"
    ],
    correctAnswer: 0,
    answer: "'Either patience or perseverance'",
    explanation: "The correlative pair 'Either patience or perseverance' forms the Compound Subject.",
    explanationBn: "'Either patience or perseverance' সম্পূর্ণ অংশটি বাক্যের Correlative Compound Subject।",
    hint: "Correlative subjects joined by 'Either... or'.",
    level: "basic"
  },
  {
    id: 23,
    question: "In the sentence 'More than one candidate was selected for the internship', what is the grammatical number of the subject?",
    options: [
      "Singular concord is strictly observed with 'More than one + Singular Noun' ('was selected')",
      "Plural because more than one means two or more",
      "Dual number",
      "Invariant"
    ],
    correctAnswer: 0,
    answer: "Singular concord is strictly observed with 'More than one + Singular Noun' ('was selected')",
    explanation: "In formal English concord, 'More than one + Singular Noun' takes a singular verb ('was selected'). ('More candidates than one were selected' is plural).",
    explanationBn: "'More than one'-এর পরে Singular Noun বসলে ব্যাকরণগতভাবে Singular Verb ('was') বসে।",
    hint: "'More than one + singular noun' takes a singular verb.",
    level: "advanced"
  },
  {
    id: 24,
    question: "Which of the following pairs illustrates the distinction between a Simple Subject and a Compound Subject?",
    options: [
      "Simple: 'Swadeep coded' vs Compound: 'Swadeep and Tuhina coded'",
      "Simple: 'Swadeep coded' vs Compound: 'Swadeep coded and tested'",
      "Simple: 'He ran' vs Compound: 'He ran fast'",
      "Simple: 'The book' vs Compound: 'A book'"
    ],
    correctAnswer: 0,
    answer: "Simple: 'Swadeep coded' vs Compound: 'Swadeep and Tuhina coded'",
    explanation: "'Swadeep' is a single subject; 'Swadeep and Tuhina' is a compound subject sharing the verb 'coded'.",
    explanationBn: "'Swadeep' হলো একক কর্তা (Simple Subject), আর 'Swadeep and Tuhina' হলো যৌথ কর্তা (Compound Subject)।",
    hint: "Single subject vs multiple coordinated subjects.",
    level: "basic"
  },
  {
    id: 25,
    question: "What is the key practical rule taught by Mentor Sukanta Hui regarding Simple vs Compound Subjects?",
    options: [
      "Always isolate the true head noun(s), disregard intervening prepositional phrases, and apply the exact concord rule based on the joining conjunction (And vs Or/Nor vs As well as)",
      "Always use plural verbs for everything",
      "Never use compound subjects in formal writing",
      "Subject-verb agreement only applies in past tense"
    ],
    correctAnswer: 0,
    answer: "Always isolate the true head noun(s), disregard intervening prepositional phrases, and apply the exact concord rule based on the joining conjunction (And vs Or/Nor vs As well as)",
    explanation: "Mastering subject isolation and knowing the specific connector rules eliminates all concord errors in competitive writing.",
    explanationBn: "সুকান্ত স্যারের মূল নীতি: মধ্যবর্তী Prepositional Phrase বাদ দিয়ে মূল Head Noun চিহ্নিত করুন এবং সংযোজকের ধরন (And, Or/Nor, As well as) দেখে সঠিক Verb নির্বাচন করুন।",
    hint: "Isolate the head noun and apply connector-specific concord.",
    level: "basic"
  }
];

export default questions;
