// topic1_questions.js
// Module 001_004: Phrases vs Clauses & Foundational Sentence Transformations
// Topic 1: The 5 Major Phrase Types in English
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What is the defining syntactic characteristic of a PHRASE in English grammar?",
    options: [
      "A group of words acting as a single unit WITHOUT a Subject + Finite Verb nexus",
      "A complete sentence with subject, verb, and object",
      "A subordinate clause containing a conjunction and finite verb",
      "A single hyphenated word"
    ],
    correctAnswer: 0,
    explanation: "A phrase is a syntactic cluster of related words functioning as a single part of speech that lacks a Subject + Finite Verb pair.",
    explanationBn: "Phrase (শব্দগুচ্ছ) হলো একাধিক শব্দের সমষ্টি যা একক পদ (Part of Speech) হিসেবে কাজ করে কিন্তু যাতে কোনো Subject ও Finite Verb-এর যুগল থাকে না।"
  },
  {
    id: 2,
    question: "Identify the NOUN PHRASE functioning as the subject in: 'The brilliant young developer from Barrackpore designed an elegant algorithm.'",
    options: [
      "The brilliant young developer from Barrackpore",
      "designed an elegant algorithm",
      "from Barrackpore designed",
      "an elegant algorithm"
    ],
    correctAnswer: 0,
    explanation: "'The brilliant young developer from Barrackpore' is a complex Noun Phrase headed by the noun 'developer' along with determiners, adjectives, and prepositional modifiers.",
    explanationBn: "'The brilliant young developer from Barrackpore' হলো একটি সম্পূর্ণ Noun Phrase যার Head Noun হলো 'developer'।"
  },
  {
    id: 3,
    question: "In the sentence 'She has been working on the software all morning', what is 'has been working'?",
    options: [
      "A Verb Phrase (Auxiliary verbs + Main lexical verb)",
      "A Noun Phrase",
      "A Prepositional Phrase",
      "An Adverb Phrase"
    ],
    correctAnswer: 0,
    explanation: "'Has been working' is a Verb Phrase (VP) consisting of two auxiliary verbs ('has', 'been') and the present participle lexical verb ('working').",
    explanationBn: "'Has been working' হলো একটি Verb Phrase যা Auxiliary Verb ('has', 'been') এবং মূল Verb ('working') নিয়ে গঠিত।"
  },
  {
    id: 4,
    question: "In the sentence 'The book on the top shelf belongs to Sukanta Sir', what kind of phrase is 'on the top shelf' and what is its grammatical function?",
    options: [
      "Prepositional Phrase functioning as an Adjective modifying 'The book'",
      "Noun Phrase functioning as the direct object",
      "Adverb Phrase modifying 'belongs'",
      "Verb Phrase"
    ],
    correctAnswer: 0,
    explanation: "'On the top shelf' begins with the preposition 'on' and describes the noun 'The book' (which book? -> on the top shelf), making it an Adjectival Prepositional Phrase.",
    explanationBn: "'On the top shelf' একটি Prepositional Phrase যা Noun 'The book'-কে বর্ণনা করছে, তাই এটি Adjectival Prepositional Phrase হিসেবে কাজ করছে।"
  },
  {
    id: 5,
    question: "In the sentence 'Debangshu solved the complex problem with great dexterity', what is the role of 'with great dexterity'?",
    options: [
      "Adverbial Prepositional Phrase modifying the verb 'solved' (telling HOW)",
      "Noun Phrase acting as subject",
      "Adjective Phrase modifying 'problem'",
      "Verb Phrase"
    ],
    correctAnswer: 0,
    explanation: "'With great dexterity' is a Prepositional Phrase answering 'How did he solve it?' (Manner), thus functioning adverbially to modify the verb 'solved'.",
    explanationBn: "'With great dexterity' (অত্যন্ত দক্ষতার সাথে) একটি Prepositional Phrase যা Verb 'solved'-এর কার্যপদ্ধতি (Manner) প্রকাশ করছে, তাই এটি Adverbial Phrase।"
  },
  {
    id: 6,
    question: "Identify the ADJECTIVE PHRASE in: 'A man with a golden heart is loved by everyone.'",
    options: [
      "with a golden heart",
      "A man",
      "is loved by everyone",
      "by everyone"
    ],
    correctAnswer: 0,
    explanation: "'With a golden heart' modifies the noun 'man' by describing his character, functioning as an Adjective Phrase.",
    explanationBn: "'With a golden heart' শব্দগুচ্ছটি Noun 'man'-এর গুণ বর্ণনা করছে, তাই এটি Adjective Phrase।"
  },
  {
    id: 7,
    question: "In the sentence 'He completed the project in the blink of an eye', what type of phrase is 'in the blink of an eye'?",
    options: [
      "Adverb Phrase of Time / Speed",
      "Noun Phrase",
      "Adjective Phrase",
      "Verb Phrase"
    ],
    correctAnswer: 0,
    explanation: "'In the blink of an eye' functions as an Adverb Phrase modifying 'completed', indicating the instantaneous timeframe/speed of the action.",
    explanationBn: "'In the blink of an eye' (পলকের মধ্যে) একটি Adverb Phrase যা Verb 'completed'-এর সময়/গতি নির্দেশ করছে।"
  },
  {
    id: 8,
    question: "Which of the following is an APPOSITIVE PHRASE (a noun phrase placed beside another noun to rename or explain it)?",
    options: [
      "Sukanta Sir, our master grammar mentor, explained the rule clearly.",
      "The mentor explained the rule very clearly.",
      "Because the mentor explained the rule, we understood.",
      "To understand the rule is essential."
    ],
    correctAnswer: 0,
    explanation: "'Our master grammar mentor' is an Appositive Noun Phrase renaming and providing essential context about 'Sukanta Sir'.",
    explanationBn: "'Our master grammar mentor' একটি Appositive Phrase যা 'Sukanta Sir'-এর পরিচয় সুস্পষ্ট করছে।"
  },
  {
    id: 9,
    question: "In 'Walking along the Barrackpore riverbank, Swadeep saw the sunset', what is 'Walking along the Barrackpore riverbank'?",
    options: [
      "A Participial Phrase modifying the subject 'Swadeep'",
      "A Gerund Noun Phrase acting as subject",
      "A Prepositional Phrase",
      "An Independent Clause"
    ],
    correctAnswer: 0,
    explanation: "'Walking along...' begins with the present participle 'Walking' and acts adjectivally to modify the noun 'Swadeep', making it a Participial Phrase.",
    explanationBn: "'Walking along...' Participle দিয়ে শুরু হয়ে Subject 'Swadeep'-কে বিশেষিত করছে, তাই এটি Participial Phrase।"
  },
  {
    id: 10,
    question: "In 'To master English grammar requires systematic dedication', what is 'To master English grammar'?",
    options: [
      "An Infinitive Phrase functioning as the syntactic subject of the sentence",
      "A Prepositional Phrase",
      "An Adverb Phrase",
      "A Participial Phrase"
    ],
    correctAnswer: 0,
    explanation: "'To master English grammar' is an Infinitive Phrase (To + Base Verb + Object) occupying the subject position before the finite verb 'requires'.",
    explanationBn: "'To master English grammar' হলো একটি Infinitive Phrase যা বাক্যের Subject হিসেবে কাজ করছে।"
  },
  {
    id: 11,
    question: "In 'Swadeep enjoys building high-performance web applications', what is 'building high-performance web applications'?",
    options: [
      "A Gerund Phrase functioning as the direct object of 'enjoys'",
      "A Participial Phrase modifying 'Swadeep'",
      "An Adverb Phrase of Reason",
      "A Finite Clause"
    ],
    correctAnswer: 0,
    explanation: "'Building high-performance web applications' functions nominally as the direct object of the transitive verb 'enjoys', making it a Gerund Phrase.",
    explanationBn: "'Building high-performance web applications' একটি Gerund Phrase যা Verb 'enjoys'-এর Direct Object হিসেবে ব্যবহৃত হয়েছে।"
  },
  {
    id: 12,
    question: "What is the HEAD of the phrase in 'extremely enthusiastic about linguistics'?",
    options: [
      "The adjective 'enthusiastic' (Adjective Phrase)",
      "The adverb 'extremely'",
      "The preposition 'about'",
      "The noun 'linguistics'"
    ],
    correctAnswer: 0,
    explanation: "The central semantic core is the adjective 'enthusiastic', modified by adverb 'extremely' and prepositional complement 'about linguistics', making it an Adjective Phrase.",
    explanationBn: "এই শব্দগুচ্ছের মূল কেন্দ্র হলো Adjective 'enthusiastic', তাই এটি একটি Adjective Phrase।"
  },
  {
    id: 13,
    question: "Identify the ABSOLUTE PHRASE in: 'The weather being stormy, the flight was delayed.'",
    options: [
      "The weather being stormy",
      "the flight was delayed",
      "being stormy the flight",
      "was delayed"
    ],
    correctAnswer: 0,
    explanation: "'The weather being stormy' is an Absolute Phrase consisting of a noun ('weather') and a participle ('being') with no finite verb, modifying the entire independent clause.",
    explanationBn: "'The weather being stormy' একটি Absolute Phrase যা Noun ও Participle নিয়ে গঠিত এবং কোনো Finite Verb ছাড়া পুরো বাক্যকে প্রভাবিত করে।"
  },
  {
    id: 14,
    question: "Convert the underlined Adjective Phrase in 'A student of great promise' into a single equivalent adjective:",
    options: [
      "A promising student",
      "A promised student",
      "A student promisingly",
      "A promise student"
    ],
    correctAnswer: 0,
    explanation: "The prepositional adjective phrase 'of great promise' condenses into the single pre-modifying adjective 'promising': 'A promising student'.",
    explanationBn: "'Of great promise' Adjective Phrase-টিকে একক Adjective-এ রূপান্তর করলে হয় 'A promising student'।"
  },
  {
    id: 15,
    question: "Convert the underlined Adverb Phrase in 'He replied in a very polite manner' into a single equivalent adverb:",
    options: [
      "He replied very politely.",
      "He replied with politeness.",
      "He replied polite.",
      "He replied politely manner."
    ],
    correctAnswer: 0,
    explanation: "'In a very polite manner' translates concisely into the manner adverb 'very politely': 'He replied very politely.'",
    explanationBn: "'In a very polite manner' Adverb Phrase-এর সংক্ষিপ্ত রূপ হলো 'very politely'।"
  },
  {
    id: 16,
    question: "Identify the phrase type of 'underneath the old wooden staircase':",
    options: [
      "Prepositional Phrase (Preposition + Determiner + Adjectives + Noun)",
      "Verb Phrase",
      "Infinitive Phrase",
      "Independent Clause"
    ],
    correctAnswer: 0,
    explanation: "'Underneath' is the preposition, and 'the old wooden staircase' is the object of the preposition, forming a Prepositional Phrase of place.",
    explanationBn: "'Underneath the old wooden staircase' হলো স্থান নির্দেশক Prepositional Phrase।"
  },
  {
    id: 17,
    question: "In the sentence 'Debangshu was standing right in front of the gate', what does the prepositional phrase 'in front of the gate' indicate?",
    options: [
      "Place / Spatial Location",
      "Time / Temporal Duration",
      "Reason / Cause",
      "Condition"
    ],
    correctAnswer: 0,
    explanation: "'In front of the gate' specifies the physical spatial location (Where) where Debangshu was standing.",
    explanationBn: "'In front of the gate' Debangshu কোথায় দাঁড়িয়েছিল তা স্থানগতভাবে (Spatial Location) প্রকাশ করছে।"
  },
  {
    id: 18,
    question: "Which of the following phrases functions as an ADVERBIAL PHRASE OF FREQUENCY?",
    options: [
      "Now and then",
      "With a heavy heart",
      "In the classroom",
      "To win the trophy"
    ],
    correctAnswer: 0,
    explanation: "'Now and then' (meaning 'occasionally / from time to time') indicates how frequently an action takes place.",
    explanationBn: "'Now and then' (মাঝে মাঝে) কাজের পৌনঃপুনিকতা নির্দেশ করায় এটি Adverbial Phrase of Frequency।"
  },
  {
    id: 19,
    question: "In 'She spoke in a low voice', what part of speech is replaced if we say 'She spoke softly'?",
    options: [
      "The Adverb Phrase 'in a low voice' is replaced by the Adverb 'softly'.",
      "A Noun Phrase is replaced by a Verb.",
      "An Adjective Phrase is replaced by a Noun.",
      "A Preposition is deleted."
    ],
    correctAnswer: 0,
    explanation: "'In a low voice' is an Adverb Phrase of manner that can be directly substituted by the single adverb 'softly'.",
    explanationBn: "'In a low voice' Adverb Phrase-টির পরিবর্তে একক Adverb 'softly' বসানো যায়।"
  },
  {
    id: 20,
    question: "Why is 'The boy in the red shirt' NOT a clause?",
    options: [
      "Because it lacks a finite verb and does not make a complete predication.",
      "Because it contains too many adjectives.",
      "Because 'boy' is singular.",
      "Because it has a preposition."
    ],
    correctAnswer: 0,
    explanation: "A clause requires both a subject and a finite verb. 'The boy in the red shirt' contains only a noun head and a prepositional modifier without any finite verb.",
    explanationBn: "Clause হতে হলে Subject ও Finite Verb থাকা আবশ্যক। 'The boy in the red shirt'-এ কোনো Finite Verb নেই, তাই এটি কেবল একটি Phrase।"
  },
  {
    id: 21,
    question: "What is the syntactic role of 'by leaps and bounds' in 'Our coding skills are improving by leaps and bounds'?",
    options: [
      "Idiomatic Adverb Phrase of Manner / Degree (meaning 'very rapidly')",
      "Noun Phrase subject",
      "Adjective Phrase modifying skills",
      "Prepositional object"
    ],
    correctAnswer: 0,
    explanation: "'By leaps and bounds' is an idiomatic adverb phrase modifying 'are improving', meaning with extraordinary speed.",
    explanationBn: "'By leaps and bounds' (দ্রুতগতিতে) একটি Idiomatic Adverb Phrase যা 'are improving' Verb-কে বিশেষিত করছে।"
  },
  {
    id: 22,
    question: "In 'A stitch in time saves nine', what kind of phrase is 'in time'?",
    options: [
      "Adjective Prepositional Phrase modifying 'stitch'",
      "Adverb Phrase modifying 'saves'",
      "Noun Phrase",
      "Verb Phrase"
    ],
    correctAnswer: 0,
    explanation: "'In time' sits directly after the noun 'stitch' and qualifies it (Which stitch? -> The stitch made in time), functioning adjectivally.",
    explanationBn: "'In time' শব্দগুচ্ছটি Noun 'stitch'-কে বিশেষিত করায় এটি Adjective Prepositional Phrase হিসেবে কাজ করছে।"
  },
  {
    id: 23,
    question: "Which of the following contains a VERB PHRASE with a modal auxiliary and passive voice?",
    options: [
      "The server might have been configured by the network administrator.",
      "The server is running smoothly.",
      "We configured the server yesterday.",
      "Configuring the server was hard."
    ],
    correctAnswer: 0,
    explanation: "'Might have been configured' is a complex Verb Phrase comprising modal 'might', auxiliaries 'have' and 'been', and past participle lexical verb 'configured'.",
    explanationBn: "'Might have been configured' হলো Modal Auxiliary ও Passive Voice সহযোগে গঠিত একটি জটিল Verb Phrase।"
  },
  {
    id: 24,
    question: "Identify the NOUN PHRASE functioning as the OBJECT of a preposition in: 'Sukanta Sir spoke about the subtleties of English syntax.'",
    options: [
      "the subtleties of English syntax",
      "Sukanta Sir",
      "spoke about",
      "of English"
    ],
    correctAnswer: 0,
    explanation: "'The subtleties of English syntax' is the complete Noun Phrase functioning as the grammatical object of the preposition 'about'.",
    explanationBn: "'The subtleties of English syntax' হলো Preposition 'about'-এর Object হিসেবে ব্যবহৃত Noun Phrase।"
  },
  {
    id: 25,
    question: "How does mastery of Phrase Types empower a writer?",
    options: [
      "It allows writers to vary sentence rhythm, condense verbose clauses, and eliminate dangling modifiers.",
      "It replaces the need for punctuation.",
      "It makes all sentences simple sentences.",
      "It eliminates prepositions from writing."
    ],
    correctAnswer: 0,
    explanation: "Understanding phrases enables writers to expand ideas concisely, vary syntactic rhythm, avoid ambiguity, and master sentence condensation.",
    explanationBn: "Phrase-এর সঠিক ব্যবহার জানলে লেখার ছন্দ উন্নত হয়, অপ্রয়োজনীয় বাক্য সংক্ষেপ করা যায় এবং ব্যাকরণগত অস্পষ্টতা দূর হয়।"
  }
];

export default questions;
