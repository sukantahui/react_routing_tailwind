// topic1_questions.js
// Module 001_002: Sentence Anatomy: Subject, Predicate, Objects & Complements
// Topic 1: The Two Structural Halves — Complete Subject vs Complete Predicate
// 25 Comprehensive Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What are the two indispensable structural halves that compose every standard English clause?",
    options: [
      "The Complete Subject and the Complete Predicate",
      "The Noun and the Preposition",
      "The Prefix and the Suffix",
      "The Capital letter and the Full Stop"
    ],
    correctAnswer: 0,
    answer: "The Complete Subject and the Complete Predicate",
    explanation: "Every complete English sentence consists of two fundamental syntactic halves: the Complete Subject (naming who/what the clause is about) and the Complete Predicate (asserting what the subject does or is).",
    explanationBn: "যেকোনো ইংরেজি বাক্যের দুটি প্রধান অংশ থাকে: Complete Subject (উদ্দেশ্য - যার সম্পর্কে কিছু বলা হয়) এবং Complete Predicate (বিধেয় - উদ্দেশ্য সম্পর্কে যা কিছু বলা হয়)।",
    hint: "Think about the topic of the sentence versus what is said about it.",
    level: "basic"
  },
  {
    id: 2,
    question: "In the sentence 'The exceptionally talented students from Barrackpore coded an interactive application', what is the COMPLETE SUBJECT?",
    options: [
      "'The exceptionally talented students from Barrackpore'",
      "'students'",
      "'The exceptionally talented students'",
      "'coded an interactive application'"
    ],
    correctAnswer: 0,
    answer: "'The exceptionally talented students from Barrackpore'",
    explanation: "The Complete Subject includes the head noun ('students') along with all its determiners ('The'), modifiers ('exceptionally talented'), and prepositional phrases ('from Barrackpore').",
    explanationBn: "Complete Subject-এ মূল Noun ('students')-এর সাথে তার সমস্ত বিশেষণ ও Prepositional Phrase ('from Barrackpore') অন্তর্ভুক্ত থাকে।",
    hint: "Identify everything before the finite verb 'coded'.",
    level: "basic"
  },
  {
    id: 3,
    question: "In the sentence 'The exceptionally talented students from Barrackpore coded an interactive application', what is the COMPLETE PREDICATE?",
    options: [
      "'coded an interactive application'",
      "'coded'",
      "'an interactive application'",
      "'students from Barrackpore coded'"
    ],
    correctAnswer: 0,
    answer: "'coded an interactive application'",
    explanation: "The Complete Predicate begins at the finite verb ('coded') and includes all its objects, complements, and adverbial modifiers ('an interactive application').",
    explanationBn: "Complete Predicate সমাপিকা ক্রিয়া ('coded') দিয়ে শুরু হয় এবং এর সমস্ত Object ও Modifiers এতে অন্তর্ভুক্ত থাকে।",
    hint: "The finite verb plus its entire following predicate complement.",
    level: "basic"
  },
  {
    id: 4,
    question: "In an imperative sentence like 'Submit your assignment before midnight', what is the Complete Subject?",
    options: [
      "The implied / understood second person pronoun 'You' ([You])",
      "'Submit'",
      "'assignment'",
      "There is no subject in imperative sentences"
    ],
    correctAnswer: 0,
    answer: "The implied / understood second person pronoun 'You' ([You])",
    explanation: "In imperative commands, the subject is syntactically active but covert/implicit: understood as '[You]'.",
    explanationBn: "অনুরোধ বা আদেশমূলক বাক্যে (Imperative Sentence) Subject হিসেবে 'You' উহ্য (Understood / Implicit) থাকে: '[You] submit your assignment'।",
    hint: "The listener is addressed implicitly.",
    level: "intermediate"
  },
  {
    id: 5,
    question: "In inverted sentences like 'Down the hill rolled the massive boulder', what is the Complete Subject?",
    options: [
      "'the massive boulder'",
      "'Down the hill'",
      "'rolled'",
      "'Down the hill rolled'"
    ],
    correctAnswer: 0,
    answer: "'the massive boulder'",
    explanation: "In literary inversion, the predicate phrase moves to the front, but 'the massive boulder' remains the nominal entity performing the action of rolling (the Complete Subject).",
    explanationBn: "Inverted বাক্যে Predicate শুরুতে বসলেও ক্রিয়ার মূল কর্তা হলো 'the massive boulder', তাই এটিই Complete Subject।",
    hint: "Ask: 'What rolled down the hill?'.",
    level: "intermediate"
  },
  {
    id: 6,
    question: "How does Bengali syntax differ from English regarding Subject and Predicate positioning in declarative sentences?",
    options: [
      "Bengali is typically Subject-Object-Verb (SOV), whereas English is Subject-Verb-Object (SVO)",
      "Bengali never allows subjects",
      "English verbs always precede subjects",
      "Both languages use Verb-Subject-Object order"
    ],
    correctAnswer: 0,
    answer: "Bengali is typically Subject-Object-Verb (SOV), whereas English is Subject-Verb-Object (SVO)",
    explanation: "Bengali places the verb at the end ('আমি ভাত খাই' -> Subject + Object + Verb), while English mandates Subject + Verb + Object ('I eat rice').",
    explanationBn: "বাংলা বাক্যের গঠন সাধারণত SOV (কর্তা + কর্ম + ক্রিয়া), কিন্তু ইংরেজি বাক্যের গঠন SVO (Subject + Verb + Object)।",
    hint: "SOV vs SVO word order.",
    level: "basic"
  },
  {
    id: 7,
    question: "In the sentence 'To master English grammar requires systematic daily practice', what is the Complete Subject?",
    options: [
      "'To master English grammar' (an Infinitive Phrase functioning nominally as Subject)",
      "'English grammar'",
      "'practice'",
      "'requires'"
    ],
    correctAnswer: 0,
    answer: "'To master English grammar' (an Infinitive Phrase functioning nominally as Subject)",
    explanation: "An entire non-finite Infinitive Phrase ('To master English grammar') acts as the singular nominal Complete Subject of the finite verb 'requires'.",
    explanationBn: "'To master English grammar' (Infinitive Phrase) সম্পূর্ণ অংশটি বাক্যের Subject হিসেবে 'requires' Verb-এর পূর্বে বসেছে।",
    hint: "The entire infinitive phrase acts as the subject.",
    level: "intermediate"
  },
  {
    id: 8,
    question: "In the sentence 'That Debangshu passed the competitive exam surprised nobody', what is the Complete Subject?",
    options: [
      "'That Debangshu passed the competitive exam' (a Noun Clause functioning as Subject)",
      "'Debangshu'",
      "'nobody'",
      "'the competitive exam'"
    ],
    correctAnswer: 0,
    answer: "'That Debangshu passed the competitive exam' (a Noun Clause functioning as Subject)",
    explanation: "A subordinate Noun Clause ('That Debangshu passed the competitive exam') serves as the Complete Subject of the verb 'surprised'.",
    explanationBn: "'That Debangshu passed the competitive exam' একটি পূর্ণাঙ্গ Noun Clause যা 'surprised' Verb-এর Subject হিসেবে কাজ করছে।",
    hint: "A 'That-clause' serving as the nominal subject.",
    level: "advanced"
  },
  {
    id: 9,
    question: "In the sentence 'There are forty enthusiastic students in the seminar room', what is the REAL grammatical subject?",
    options: [
      "'forty enthusiastic students' (postponed subject after dummy 'There')",
      "'There'",
      "'the seminar room'",
      "'are'"
    ],
    correctAnswer: 0,
    answer: "'forty enthusiastic students' (postponed subject after dummy 'There')",
    explanation: "'There' is an expletive (dummy subject). The real grammatical subject is the plural noun phrase 'forty enthusiastic students', which is why the verb is plural ('are').",
    explanationBn: "'There' হলো Expletive বা Dummy Subject; বাক্যের আসল কর্তা হলো 'forty enthusiastic students', যার কারণে বহুবচন ক্রিয়া 'are' বসেছে।",
    hint: "'There' is a dummy subject; find the real postponed subject.",
    level: "intermediate"
  },
  {
    id: 10,
    question: "In 'It is easy to make mistakes during complex calculations', what is the true delayed subject represented by the dummy 'It'?",
    options: [
      "'to make mistakes during complex calculations'",
      "'It'",
      "'easy'",
      "'calculations'"
    ],
    correctAnswer: 0,
    answer: "'to make mistakes during complex calculations'",
    explanation: "'It' is a dummy anticipatory subject. The real delayed subject is the infinitive phrase 'to make mistakes during complex calculations'.",
    explanationBn: "'It' হলো Anticipatory/Dummy Subject; বাক্যের প্রকৃত বিলম্বিত উদ্দেশ্য (Delayed Subject) হলো 'to make mistakes during complex calculations'।",
    hint: "The infinitive phrase that explains what 'It' refers to.",
    level: "advanced"
  },
  {
    id: 11,
    question: "Identify the Complete Predicate in: 'A heavy downpour flooded the streets of Barrackpore yesterday evening.'",
    options: [
      "'flooded the streets of Barrackpore yesterday evening'",
      "'A heavy downpour'",
      "'flooded the streets'",
      "'yesterday evening'"
    ],
    correctAnswer: 0,
    answer: "'flooded the streets of Barrackpore yesterday evening'",
    explanation: "The complete predicate includes the finite verb 'flooded', direct object 'the streets of Barrackpore', and time adverbial 'yesterday evening'.",
    explanationBn: "Complete Predicate সমাপিকা ক্রিয়া 'flooded' থেকে শুরু হয়ে বাক্যের শেষ পর্যন্ত সমস্ত অংশকে ধারণ করে।",
    hint: "From the verb 'flooded' to the end of the clause.",
    level: "basic"
  },
  {
    id: 12,
    question: "Can a Complete Predicate consist of ONLY a single word in English?",
    options: [
      "Yes, when an intransitive verb stands alone without objects or modifiers (e.g., 'Swadeep smiled.')",
      "No, a predicate must always have at least four words",
      "Only in questions",
      "Only in passive voice"
    ],
    correctAnswer: 0,
    answer: "Yes, when an intransitive verb stands alone without objects or modifiers (e.g., 'Swadeep smiled.')",
    explanation: "In intransitive clauses like 'Swadeep [Subject] smiled [Predicate]', a single finite verb constitutes the entire complete predicate.",
    explanationBn: "হ্যাঁ, অকর্মক ক্রিয়ার ক্ষেত্রে একটিমাত্র Verb-ই সম্পূর্ণ Predicate হতে পারে (যেমন: 'Swadeep smiled')।",
    hint: "Think of simple SV sentences like 'Birds fly'.",
    level: "basic"
  },
  {
    id: 13,
    question: "In the sentence 'Under the shady banyan tree sat the weary traveler', what is the Complete Predicate?",
    options: [
      "'Under the shady banyan tree sat'",
      "'the weary traveler'",
      "'sat'",
      "'banyan tree sat'"
    ],
    correctAnswer: 0,
    answer: "'Under the shady banyan tree sat'",
    explanation: "In this inverted sentence, the prepositional place adverbial ('Under the shady banyan tree') and the verb ('sat') form the complete predicate.",
    explanationBn: "উল্টানো বাক্যে স্থান নির্দেশক অংশ ('Under the shady banyan tree') এবং ক্রিয়া ('sat') মিলে Complete Predicate গঠিত হয়েছে।",
    hint: "Everything except the subject 'the weary traveler'.",
    level: "intermediate"
  },
  {
    id: 14,
    question: "In 'Tuhina, an ambitious software developer, designed an innovative algorithm', what is 'an ambitious software developer'?",
    options: [
      "An Appositive Phrase modifying the subject 'Tuhina'",
      "Part of the predicate",
      "The direct object",
      "An adverb clause"
    ],
    correctAnswer: 0,
    answer: "An Appositive Phrase modifying the subject 'Tuhina'",
    explanation: "An appositive phrase renames and describes the head noun, forming an integral part of the Complete Subject.",
    explanationBn: "'an ambitious software developer' হলো Appositive Phrase যা Subject 'Tuhina'-র পরিচয় বিশদ করে Complete Subject-এর অংশ গঠন করে।",
    hint: "Renames the noun next to it.",
    level: "intermediate"
  },
  {
    id: 15,
    question: "Why is the subject in 'Between the two hills runs a serene river' NOT 'the two hills'?",
    options: [
      "Because 'the two hills' is the object of the preposition 'Between'; a noun inside a prepositional phrase cannot serve as the subject of a clause",
      "Because hills cannot run",
      "Because hills is plural and runs is singular",
      "Both A and C are correct reasons"
    ],
    correctAnswer: 3,
    answer: "Both A and C are correct reasons",
    explanation: "A noun governed by a preposition is a prepositional object. The true subject is 'a serene river', which is why the verb is singular ('runs').",
    explanationBn: "Preposition-এর ভেতরের Noun কখনো বাক্যের Subject হতে পারে না। আসল Subject হলো 'a serene river', তাই Verb singular ('runs')।",
    hint: "Objects of prepositions can never be clause subjects.",
    level: "advanced"
  },
  {
    id: 16,
    question: "Identify the Complete Subject in: 'Eating nutritious food and exercising regularly promote longevity.'",
    options: [
      "'Eating nutritious food and exercising regularly' (a compound Gerund Phrase subject)",
      "'longevity'",
      "'food and exercising'",
      "'promote'"
    ],
    correctAnswer: 0,
    answer: "'Eating nutritious food and exercising regularly' (a compound Gerund Phrase subject)",
    explanation: "Two parallel gerund phrases connected by 'and' form the compound Complete Subject.",
    explanationBn: "'Eating nutritious food and exercising regularly' হলো দুটি Gerund Phrase সমন্বিত Compound Complete Subject।",
    hint: "The entire coordination before 'promote'.",
    level: "intermediate"
  },
  {
    id: 17,
    question: "In the sentence 'Great is the power of perseverance', what is the Complete Subject?",
    options: [
      "'the power of perseverance'",
      "'Great'",
      "'is'",
      "'Great is'"
    ],
    correctAnswer: 0,
    answer: "'the power of perseverance'",
    explanation: "Inverted construction: 'Great' is a predicate adjective fronted for stylistic emphasis; 'the power of perseverance' is the Complete Subject.",
    explanationBn: "বাচনিক শৈলীর জন্য 'Great' শুরুতে বসলেও বাক্যের আসল Complete Subject হলো 'the power of perseverance'।",
    hint: "Ask: 'What is great?'.",
    level: "advanced"
  },
  {
    id: 18,
    question: "What is a Sentence Fragment in writing?",
    options: [
      "An incomplete structure masquerading as a sentence because it lacks either an independent subject or a finite predicate verb",
      "A sentence with too many adjectives",
      "A sentence translated from Bengali",
      "A compound-complex sentence"
    ],
    correctAnswer: 0,
    answer: "An incomplete structure masquerading as a sentence because it lacks either an independent subject or a finite predicate verb",
    explanation: "A fragment fails the completeness test because it is missing an overt subject, a finite verb, or fails to express a complete thought.",
    explanationBn: "Sentence Fragment হলো খণ্ডিত বা অসম্পূর্ণ বাক্য যা কোনো সমাপিকা ক্রিয়া বা কর্তার অভাবে পূর্ণ অর্থ প্রকাশ করতে ব্যর্থ হয়।",
    hint: "Lacks a complete subject or finite verb.",
    level: "basic"
  },
  {
    id: 19,
    question: "Which of the following is a Sentence Fragment?",
    options: [
      "Because Swadeep was working diligently in the computer laboratory.",
      "Swadeep worked diligently in the computer laboratory.",
      "Swadeep was working in the laboratory.",
      "The students coded all evening."
    ],
    correctAnswer: 0,
    answer: "Because Swadeep was working diligently in the computer laboratory.",
    explanation: "Starting with the subordinating conjunction 'Because' without an attached main clause creates a dependent fragment.",
    explanationBn: "'Because' দিয়ে শুরু হওয়া ক্লজটি একটি Subordinate Clause; কোনো Main Clause না থাকায় এটি একটি অসম্পূর্ণ Sentence Fragment।",
    hint: "A dependent clause standing alone with no main clause.",
    level: "intermediate"
  },
  {
    id: 20,
    question: "In the sentence 'The mentor from Barrackpore, Sukanta Hui, inspired his students', what is the Simple Subject (Head Noun)?",
    options: ["mentor", "Sukanta Hui", "Barrackpore", "students"],
    correctAnswer: 0,
    answer: "mentor",
    explanation: "'Mentor' is the core grammatical head noun modified by the article, prepositional phrase, and appositive.",
    explanationBn: "সমস্ত Modifier ও Appositive বাদ দিলে মূল কর্তা (Head Noun / Simple Subject) হলো 'mentor'।",
    hint: "Strip away modifiers to find the single head noun.",
    level: "intermediate"
  },
  {
    id: 21,
    question: "In the sentence 'The mentor from Barrackpore, Sukanta Hui, inspired his students', what is the Simple Predicate (Finite Verb)?",
    options: ["inspired", "from Barrackpore", "his students", "mentor"],
    correctAnswer: 0,
    answer: "inspired",
    explanation: "'Inspired' is the core finite lexical verb performing the predication.",
    explanationBn: "বাক্যের মূল সমাপিকা ক্রিয়া (Simple Predicate) হলো 'inspired'।",
    hint: "The core finite verb.",
    level: "basic"
  },
  {
    id: 22,
    question: "In interrogative sentences like 'Did Abhronila complete the assignment?', how is the predicate split?",
    options: [
      "The auxiliary verb 'Did' is fronted before the subject ('Abhronila'), while the main verb 'complete' follows the subject",
      "The predicate is deleted",
      "The subject is placed at the end",
      "There is no predicate"
    ],
    correctAnswer: 0,
    answer: "The auxiliary verb 'Did' is fronted before the subject ('Abhronila'), while the main verb 'complete' follows the subject",
    explanation: "In English questions, the complete predicate is discontinuous: the auxiliary verb precedes the subject, and the rest of the predicate follows it.",
    explanationBn: "প্রশ্নবোধক বাক্যে Predicate খণ্ডিত হয়ে যায়: Auxiliary Verb ('Did') Subject-এর পূর্বে বসে এবং মূল Verb ('complete...') Subject-এর পরে বসে।",
    hint: "Auxiliary verb is placed before the subject.",
    level: "intermediate"
  },
  {
    id: 23,
    question: "What is a Compound Predicate?",
    options: [
      "A predicate containing two or more finite verbs joined by a conjunction sharing the same subject (e.g., 'Debangshu coded the app and tested its performance')",
      "A predicate with two direct objects",
      "A predicate with no verbs",
      "A predicate translated from Sanskrit"
    ],
    correctAnswer: 0,
    answer: "A predicate containing two or more finite verbs joined by a conjunction sharing the same subject (e.g., 'Debangshu coded the app and tested its performance')",
    explanation: "A single subject governing two or more coordinate verbs constitutes a Compound Predicate.",
    explanationBn: "একই Subject-এর অধীনে যখন দুটি বা ততোধিক Finite Verb যুক্ত থাকে (যেমন: 'coded and tested'), তখন তাকে Compound Predicate বলে।",
    hint: "One subject with multiple coordinate verbs.",
    level: "intermediate"
  },
  {
    id: 24,
    question: "In the sentence 'Neither the mentor nor the students were aware of the schedule change', what is the Complete Subject?",
    options: [
      "'Neither the mentor nor the students'",
      "'the mentor'",
      "'the students'",
      "'were aware'"
    ],
    correctAnswer: 0,
    answer: "'Neither the mentor nor the students'",
    explanation: "The correlative structure 'Neither the mentor nor the students' forms the compound Complete Subject.",
    explanationBn: "'Neither the mentor nor the students' সম্পূর্ণ অংশটি বাক্যের Correlative Compound Subject।",
    hint: "The entire correlative nominal construction.",
    level: "intermediate"
  },
  {
    id: 25,
    question: "What is Mentor Sukanta Hui's golden rule for sentence partitioning?",
    options: [
      "'Draw a clear syntactic vertical line immediately before the finite verb phrase: everything to the left is the Complete Subject, and everything from the verb to the right is the Complete Predicate (adjusting for inversion).'",
      "'Delete all verbs from the sentence.'",
      "'Subjects must always be pronouns.'",
      "'Predicates can never contain adjectives.'"
    ],
    correctAnswer: 0,
    answer: "'Draw a clear syntactic vertical line immediately before the finite verb phrase: everything to the left is the Complete Subject, and everything from the verb to the right is the Complete Predicate (adjusting for inversion).'",
    explanation: "Locating the finite verb cleanly separates the subject half from the predicate half.",
    explanationBn: "সুকান্ত স্যারের সূত্র: সমাপিকা ক্রিয়ার ঠিক আগে একটি কাল্পনিক বিভাজন টানুন—তার পূর্বের সমগ্র অংশ Complete Subject এবং ক্রিয়া সহ বাকি সব অংশ Complete Predicate।",
    hint: "Separate at the boundary of the finite verb phrase.",
    level: "basic"
  }
];

export default questions;
