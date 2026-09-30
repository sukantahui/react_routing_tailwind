// topic7_questions.js
// Module 001_002: Sentence Anatomy
// Topic 7: Object Complements (Complex-Transitive SVOC Mechanics)
// 25 Comprehensive Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What is an Object Complement (OC) in English syntax?",
    options: [
      "A noun, pronoun, or adjective that follows the direct object and renames, qualifies, or completes the state of that direct object",
      "An indirect object placed before the verb",
      "A prepositional phrase modifying the subject",
      "A subordinate conjunction"
    ],
    correctAnswer: 0,
    answer: "A noun, pronoun, or adjective that follows the direct object and renames, qualifies, or completes the state of that direct object",
    explanation: "An Object Complement completes the meaning of a complex-transitive verb by predicating a new identity or state onto the Direct Object (Direct Object == Object Complement).",
    explanationBn: "Object Complement হলো এমন কোনো Noun বা Adjective যা Direct Object-এর পরে বসে সেই Object-টির নতুন পরিচয়, উপাধি বা অবস্থা প্রকাশ করে (Direct Object == Object Complement)।",
    hint: "Direct Object == Object Complement.",
    level: "basic"
  },
  {
    id: 2,
    question: "In the sentence 'The cohort elected Swadeep captain of the development team', what is 'captain of the development team'?",
    options: [
      "Object Complement (Noun Phrase renaming the direct object 'Swadeep')",
      "Indirect Object",
      "Subject Complement",
      "Prepositional Phrase"
    ],
    correctAnswer: 0,
    answer: "Object Complement (Noun Phrase renaming the direct object 'Swadeep')",
    explanation: "'Swadeep' is the direct object; 'captain of the development team' renames Swadeep's new office (Object Complement).",
    explanationBn: "'Swadeep' হলো Direct Object এবং 'captain...' হলো Swadeep-এর নতুন পদমর্যাদা প্রকাশক Object Complement।",
    hint: "Renames the direct object 'Swadeep'.",
    level: "basic"
  },
  {
    id: 3,
    question: "In the sentence 'The mentor painted the laboratory door green', what is 'green'?",
    options: [
      "Object Complement (Adjective describing the resultant state of 'the laboratory door')",
      "Attributive Adjective",
      "Direct Object",
      "Adverb of Manner"
    ],
    correctAnswer: 0,
    answer: "Object Complement (Adjective describing the resultant state of 'the laboratory door')",
    explanation: "'Green' describes the state resulting from the action of painting onto the direct object 'the laboratory door' (SVOC pattern).",
    explanationBn: "'green' হলো Object Complement Adjective যা রং করার ফলে 'door' Direct Object-টির পরিবর্তিত অবস্থা প্রকাশ করছে।",
    hint: "Resultant state of the direct object.",
    level: "basic"
  },
  {
    id: 4,
    question: "What is a Complex-Transitive Verb?",
    options: [
      "A transitive verb that requires both a Direct Object and an Object Complement to complete its semantic predication (e.g., make, call, name, elect, appoint, consider, find)",
      "A verb with two subjects",
      "A verb that has no tense",
      "An intransitive verb"
    ],
    correctAnswer: 0,
    answer: "A transitive verb that requires both a Direct Object and an Object Complement to complete its semantic predication (e.g., make, call, name, elect, appoint, consider, find)",
    explanation: "Complex-transitive verbs (make, elect, choose, judge, keep, paint, render) take the SVOC structure.",
    explanationBn: "Complex-Transitive Verb হলো এমন ক্রিয়া যার অর্থ পূর্ণ করতে Direct Object-এর পাশাপাশি একটি Object Complement প্রয়োজন হয় (যেমন: make, elect, appoint, consider)।",
    hint: "Takes both a direct object and an object complement.",
    level: "intermediate"
  },
  {
    id: 5,
    question: "What test differentiates an SVOO sentence from an SVOC sentence?",
    options: [
      "The Equality Test: In SVOC, Object = Complement ('They elected Swadeep captain' -> Swadeep is captain); in SVOO, IO != DO ('He gave Swadeep a book' -> Swadeep is not a book)",
      "Count the vowels in the sentence",
      "Check if the sentence ends in a preposition",
      "SVOO has no verb"
    ],
    correctAnswer: 0,
    answer: "The Equality Test: In SVOC, Object = Complement ('They elected Swadeep captain' -> Swadeep is captain); in SVOO, IO != DO ('He gave Swadeep a book' -> Swadeep is not a book)",
    explanation: "Sukanta Sir's Equality Test: In SVOC, DO = OC ('Swadeep = Captain'). In SVOO, IO != DO ('Swadeep != Book').",
    explanationBn: "সুকান্ত স্যারের সমতা পরীক্ষা: SVOC-তে দুটি পদের মধ্যে সমতা থাকে (Swadeep = Captain); কিন্তু SVOO-তে দুটি পদ সম্পূর্ণ আলাদা সত্তা (Swadeep != Book)।",
    hint: "The Equality Test: DO = OC vs IO != DO.",
    level: "intermediate"
  },
  {
    id: 6,
    question: "Classify the sentence: 'The committee appointed Abhronila lead investigator.'",
    options: [
      "SVOC (Subject + Verb + Direct Object + Object Complement)",
      "SVOO (Subject + Verb + Indirect Object + Direct Object)",
      "SVC (Subject + Linking Verb + Subject Complement)",
      "SVA (Subject + Verb + Adverbial)"
    ],
    correctAnswer: 0,
    answer: "SVOC (Subject + Verb + Direct Object + Object Complement)",
    explanation: "Subject ('The committee') + Complex-Transitive Verb ('appointed') + Direct Object ('Abhronila') + Object Complement ('lead investigator'). (Abhronila = Lead Investigator).",
    explanationBn: "Subject ('The committee') + Verb ('appointed') + DO ('Abhronila') + OC ('lead investigator') — এটি SVOC প্যাটার্ন।",
    hint: "Abhronila = Lead investigator.",
    level: "basic"
  },
  {
    id: 7,
    question: "In 'Debangshu found the programming challenge surprisingly simple', what is 'simple'?",
    options: [
      "Object Complement (Adjective describing 'the programming challenge')",
      "Direct Object",
      "Subject Complement",
      "Adverb of Manner"
    ],
    correctAnswer: 0,
    answer: "Object Complement (Adjective describing 'the programming challenge')",
    explanation: "'The programming challenge' is the direct object; 'simple' (modified by 'surprisingly') is the adjective object complement.",
    explanationBn: "'the programming challenge' হলো Direct Object; 'simple' হলো Object Complement Adjective যা চ্যালেঞ্জটির প্রকৃতি প্রকাশ করছে।",
    hint: "The challenge was simple.",
    level: "intermediate"
  },
  {
    id: 8,
    question: "In the sentence 'The jury judged the defendant guilty of all charges', what is 'guilty'?",
    options: [
      "Object Complement Adjective",
      "Subject Complement",
      "Direct Object",
      "Adverb of Manner"
    ],
    correctAnswer: 0,
    answer: "Object Complement Adjective",
    explanation: "'The defendant' is the direct object; 'guilty' completes the verdict rendered upon the defendant (Object Complement).",
    explanationBn: "'the defendant' হলো Direct Object; 'guilty' হলো আসামী সম্পর্কে রায়ের অবস্থা প্রকাশক Object Complement।",
    hint: "The defendant was judged to be guilty.",
    level: "basic"
  },
  {
    id: 9,
    question: "In 'His outstanding performance made his mentor proud', what is 'proud'?",
    options: [
      "Object Complement Adjective",
      "Direct Object",
      "Subject Complement",
      "Adverb of Manner"
    ],
    correctAnswer: 0,
    answer: "Object Complement Adjective",
    explanation: "'His mentor' is the direct object; 'proud' is the adjective object complement expressing the resultant emotional state of the mentor.",
    explanationBn: "'his mentor' হলো Direct Object; 'proud' হলো শিক্ষকের তৃপ্ত অবস্থা প্রকাশক Object Complement।",
    hint: "His mentor became proud.",
    level: "basic"
  },
  {
    id: 10,
    question: "What happens to the Object Complement when an SVOC sentence is transformed into PASSIVE VOICE?",
    options: [
      "The Direct Object becomes the Passive Subject, and the Object Complement becomes a SUBJECT COMPLEMENT following the passive verb (e.g., 'Swadeep was elected captain')",
      "The Object Complement is deleted",
      "The Object Complement becomes the passive subject",
      "The sentence becomes intransitive"
    ],
    correctAnswer: 0,
    answer: "The Direct Object becomes the Passive Subject, and the Object Complement becomes a SUBJECT COMPLEMENT following the passive verb (e.g., 'Swadeep was elected captain')",
    explanation: "Active: 'They elected Swadeep [DO] captain [OC]' -> Passive: 'Swadeep [S] was elected captain [Subject Complement] by them'.",
    explanationBn: "Passive রূপান্তরে Active-এর Direct Object হয় Subject এবং Object Complement-টি পরিণত হয় Subject Complement-এ ('Swadeep was elected captain')।",
    hint: "Active DO becomes passive Subject; active OC becomes Subject Complement.",
    level: "advanced"
  },
  {
    id: 11,
    question: "In the passive sentence 'Tuhina was considered exceptionally brilliant by her peers', what is 'exceptionally brilliant'?",
    options: [
      "Subject Complement (Predicate Adjective phrase describing the passive subject 'Tuhina')",
      "Object Complement",
      "Direct Object",
      "Adverb of Manner"
    ],
    correctAnswer: 0,
    answer: "Subject Complement (Predicate Adjective phrase describing the passive subject 'Tuhina')",
    explanation: "In the passive voice, the active object complement has become a Subject Complement modifying the passive subject 'Tuhina'.",
    explanationBn: "Passive Voice হওয়ার কারণে 'exceptionally brilliant' পদটি Subject 'Tuhina'-র Subject Complement-এ রূপান্তরিত হয়েছে।",
    hint: "Modifies the passive subject 'Tuhina'.",
    level: "advanced"
  },
  {
    id: 12,
    question: "In 'The students named the mascot Byte', what is 'Byte'?",
    options: [
      "Object Complement (Noun designating the direct object 'the mascot')",
      "Direct Object",
      "Indirect Object",
      "Subject Complement"
    ],
    correctAnswer: 0,
    answer: "Object Complement (Noun designating the direct object 'the mascot')",
    explanation: "'The mascot' is the direct object; 'Byte' is the proper noun object complement given as its name.",
    explanationBn: "'the mascot' হলো Direct Object এবং 'Byte' হলো তার নাম হিসেবে প্রদত্ত Object Complement।",
    hint: "The mascot was named Byte.",
    level: "basic"
  },
  {
    id: 13,
    question: "Which of the following sentences represents an SVOO pattern (NOT SVOC)?",
    options: [
      "Swadeep gave Debangshu a high-performance laptop.",
      "The cohort made Debangshu team leader.",
      "The mentor considered Debangshu genius.",
      "The principal appointed Debangshu prefect."
    ],
    correctAnswer: 0,
    answer: "Swadeep gave Debangshu a high-performance laptop.",
    explanation: "Debangshu != Laptop -> SVOO (Two separate entities). In all other options, Debangshu == Leader / Genius / Prefect (SVOC).",
    explanationBn: "'Swadeep gave Debangshu a laptop'-এ Debangshu ও Laptop আলাদা সত্তা (SVOO); বাকি তিনটিতে সমতা থাকায় তারা SVOC।",
    hint: "Debangshu is not a laptop (SVOO).",
    level: "intermediate"
  },
  {
    id: 14,
    question: "In 'The severe heat wave made the ice melt rapidly', what is 'melt'?",
    options: [
      "Bare Infinitive functioning as an Object Complement",
      "Finite Past Verb",
      "Subject Complement",
      "Gerund"
    ],
    correctAnswer: 0,
    answer: "Bare Infinitive functioning as an Object Complement",
    explanation: "Causative verbs like 'make' take a Bare Infinitive ('melt') as the verbal Object Complement.",
    explanationBn: "Causative Verb 'make'-এর পরে 'melt' একটি Bare Infinitive Object Complement হিসেবে কাজ করছে।",
    hint: "Causative verb 'make' takes a bare infinitive object complement.",
    level: "advanced"
  },
  {
    id: 15,
    question: "In 'We saw Swadeep crossing the Barrackpore railway station', what is 'crossing the Barrackpore railway station'?",
    options: [
      "Present Participle Phrase functioning as an Object Complement describing Swadeep in action",
      "Gerund Phrase Subject",
      "Direct Object",
      "Adverb of Reason"
    ],
    correctAnswer: 0,
    answer: "Present Participle Phrase functioning as an Object Complement describing Swadeep in action",
    explanation: "Verbs of sensory perception (see, hear, watch, notice) take participle phrases as Object Complements describing the direct object in progress.",
    explanationBn: "ইন্দ্রিয়গ্রাহ্য ক্রিয়া 'saw'-এর পর Present Participle Phrase 'crossing...' Direct Object 'Swadeep'-এর চলমান অবস্থা প্রকাশক Object Complement।",
    hint: "Participle phrase describing the object in action.",
    level: "advanced"
  },
  {
    id: 16,
    question: "In 'They proved the witness untrustworthy', what is 'untrustworthy'?",
    options: [
      "Object Complement Adjective",
      "Direct Object",
      "Subject Complement",
      "Preposition"
    ],
    correctAnswer: 0,
    answer: "Object Complement Adjective",
    explanation: "'The witness' is the direct object; 'untrustworthy' is the adjective object complement (The witness was untrustworthy).",
    explanationBn: "'the witness' হলো Direct Object এবং 'untrustworthy' হলো সাক্ষীর চরিত্র প্রকাশক Object Complement Adjective।",
    hint: "The witness = untrustworthy.",
    level: "basic"
  },
  {
    id: 17,
    question: "In 'The court declared the election null and void', what is 'null and void'?",
    options: [
      "Compound Adjective Object Complement",
      "Direct Object",
      "Subject Complement",
      "Adverb of Place"
    ],
    correctAnswer: 0,
    answer: "Compound Adjective Object Complement",
    explanation: "'The election' is the direct object; the legal idiom 'null and void' is the compound adjective object complement.",
    explanationBn: "'the election' হলো Direct Object এবং 'null and void' (বাতিল) হলো আইনি Object Complement Adjective।",
    hint: "The election became null and void.",
    level: "intermediate"
  },
  {
    id: 18,
    question: "Which of the following verbs is frequently used in the SVOC pattern?",
    options: ["Call (e.g., 'They called him a visionary')", "Sleep", "Arrive", "Sit"],
    correctAnswer: 0,
    answer: "Call (e.g., 'They called him a visionary')",
    explanation: "'Call' routinely takes a direct object and an object complement noun/adjective ('call him a genius', 'call him foolish').",
    explanationBn: "'Call' একটি বহুল ব্যবহৃত Complex-Transitive Verb যা SVOC গঠন তৈরি করে ('called him a visionary')।",
    hint: "Call + object + complement.",
    level: "basic"
  },
  {
    id: 19,
    question: "In 'Keep the room clean at all times', identify the Direct Object and Object Complement:",
    options: [
      "Direct Object: 'the room'; Object Complement: 'clean'",
      "Direct Object: 'clean'; Object Complement: 'the room'",
      "Subject: 'the room'; Object: 'clean'",
      "Direct Object: 'at all times'"
    ],
    correctAnswer: 0,
    answer: "Direct Object: 'the room'; Object Complement: 'clean'",
    explanation: "Imperative [You] + Verb ('Keep') + Direct Object ('the room') + Object Complement ('clean').",
    explanationBn: "Direct Object হলো 'the room' এবং Object Complement হলো Adjective 'clean'।",
    hint: "Keep [the room] [clean].",
    level: "basic"
  },
  {
    id: 20,
    question: "Why is *'They made him to work'* incorrect in standard English?",
    options: [
      "The causative verb 'make' takes a Bare Infinitive ('work') as its object complement without 'to' (Correct: 'They made him work')",
      "Because 'him' should be 'he'",
      "Because 'work' is a noun",
      "It is correct in formal writing"
    ],
    correctAnswer: 0,
    answer: "The causative verb 'make' takes a Bare Infinitive ('work') as its object complement without 'to' (Correct: 'They made him work')",
    explanation: "In active voice, 'make', 'let', 'have', 'bid' take bare infinitives without 'to' (Active: 'They made him work' -> Passive: 'He was made TO work').",
    explanationBn: "Active Voice-এ Causative Verb 'make'-এর পরে 'to' বসে না (Bare Infinitive); তাই বলতে হবে 'They made him work'।",
    hint: "Bare infinitive after active 'make'.",
    level: "advanced"
  },
  {
    id: 21,
    question: "In 'The mentor considered Debangshu an exceptional problem solver', what is the semantic relationship between 'Debangshu' and 'an exceptional problem solver'?",
    options: [
      "An embedded predicative relationship of identity / equivalence (Debangshu = Problem solver)",
      "A relationship of ownership",
      "A relationship of cause and effect",
      "No relationship exists"
    ],
    correctAnswer: 0,
    answer: "An embedded predicative relationship of identity / equivalence (Debangshu = Problem solver)",
    explanation: "The direct object and object complement form an underlying 'small clause' expressing semantic equivalence (Debangshu is an exceptional problem solver).",
    explanationBn: "Direct Object এবং Object Complement-এর মধ্যে একটি প্রচ্ছন্ন সমতা বা অভেদ সম্পর্ক বিদ্যমান (Debangshu = Problem solver)।",
    hint: "Embedded small clause of identity.",
    level: "intermediate"
  },
  {
    id: 22,
    question: "In 'We thought him honest until the investigation revealed the truth', what is 'honest'?",
    options: ["Object Complement Adjective", "Subject Complement", "Direct Object", "Adverb"],
    correctAnswer: 0,
    answer: "Object Complement Adjective",
    explanation: "'Him' is the direct object; 'honest' is the adjective object complement (We thought [that he was] honest).",
    explanationBn: "'him' হলো Direct Object এবং 'honest' হলো তার চরিত্র নির্দেশক Object Complement Adjective।",
    hint: "We thought [he was] honest.",
    level: "basic"
  },
  {
    id: 23,
    question: "In 'Sukanta Sir likes his coffee black', what is 'black'?",
    options: [
      "Object Complement Adjective describing the desired state of the direct object 'his coffee'",
      "Attributive Adjective modifying coffee",
      "Direct Object",
      "Adverb of Manner"
    ],
    correctAnswer: 0,
    answer: "Object Complement Adjective describing the desired state of the direct object 'his coffee'",
    explanation: "'His coffee' is the direct object; 'black' describes the condition in which he likes it (Object Complement).",
    explanationBn: "'his coffee' হলো Direct Object; 'black' হলো কফির কাঙ্ক্ষিত অবস্থা প্রকাশক Object Complement।",
    hint: "Describes the condition of his coffee.",
    level: "intermediate"
  },
  {
    id: 24,
    question: "Which of the following correctly pairs an SVOC sentence with its correct passive transformation?",
    options: [
      "Active: 'They appointed Swadeep lead architect.' -> Passive: 'Swadeep was appointed lead architect.'",
      "Active: 'They appointed Swadeep lead architect.' -> Passive: 'Lead architect was appointed to Swadeep.'",
      "Active: 'They appointed Swadeep lead architect.' -> Passive: 'Swadeep was appointed by lead architect.'",
      "Active: 'They appointed Swadeep lead architect.' -> Passive: 'Lead architect appointed Swadeep.'"
    ],
    correctAnswer: 0,
    answer: "Active: 'They appointed Swadeep lead architect.' -> Passive: 'Swadeep was appointed lead architect.'",
    explanation: "The direct object 'Swadeep' becomes the subject; the object complement 'lead architect' becomes the subject complement.",
    explanationBn: "'Swadeep' Subject হয়ে 'Swadeep was appointed lead architect' রূপ নেয়, যা সম্পূর্ণ ব্যাকরণসম্মত।",
    hint: "Direct object becomes passive subject.",
    level: "intermediate"
  },
  {
    id: 25,
    question: "What is Mentor Sukanta Hui's golden formula for Object Complements?",
    options: [
      "SVOC Formula: Subject + Verb + Direct Object + Object Complement (where DO == OC). Use the Equality Test to prevent confusion with Ditransitive SVOO.",
      "Object complements can only be used with past tense verbs",
      "Object complements must always be followed by 'to'",
      "All object complements are adverbs ending in '-ly'"
    ],
    correctAnswer: 0,
    answer: "SVOC Formula: Subject + Verb + Direct Object + Object Complement (where DO == OC). Use the Equality Test to prevent confusion with Ditransitive SVOO.",
    explanation: "Sukanta Sir's SVOC master formula enforces the internal equation DO == OC, making complement parsing foolproof.",
    explanationBn: "সুকান্ত স্যারের SVOC সূত্র: Subject + Verb + DO + OC (যেখানে DO == OC)। সমতা পরীক্ষা প্রয়োগ করলেই SVOO বনাম SVOC-এর বিভ্রান্তি চিরতরে দূর হয়।",
    hint: "DO == OC formula.",
    level: "basic"
  }
];

export default questions;
