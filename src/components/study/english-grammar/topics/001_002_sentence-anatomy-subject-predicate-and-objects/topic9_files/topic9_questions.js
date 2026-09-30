// topic9_questions.js
// Module 001_002: Sentence Anatomy: Subject, Predicate, Objects & Complements
// Topic 9: Classroom Dialogue & Visual Sentence Tree Diagnostics (Grand Capstone Exam)
// 30 Comprehensive Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "In the Barrackpore seminar on Sentence Anatomy, what core diagnostic method does Mentor Sukanta Sir demonstrate for parsing complex sentences?",
    options: [
      "Constructing a Syntactic Clause Tree: partitioning into Complete Subject and Complete Predicate, locating the Finite Verb, and classifying objects and complements across the 7 basic patterns",
      "Memorizing translations without grammatical breakdown",
      "Guessing the subject based on word length",
      "Deleting all adjectives and adverbs"
    ],
    correctAnswer: 0,
    answer: "Constructing a Syntactic Clause Tree: partitioning into Complete Subject and Complete Predicate, locating the Finite Verb, and classifying objects and complements across the 7 basic patterns",
    explanation: "Sukanta Sir teaches systematic tree diagramming: splitting at the finite verb boundary, isolating the simple subject head, and resolving argument valency.",
    explanationBn: "সুকান্ত স্যার ব্যাকরণিক বৃক্ষ চিত্রের (Syntactic Clause Tree) মাধ্যমে বাক্যের দ্বিখণ্ডন (Subject বনাম Predicate), Finite Verb নির্ধারণ এবং ৭টি প্যাটার্নের আওতায় কর্ম ও কমপ্লিমেন্ট বিশ্লেষণের বৈজ্ঞানিক পদ্ধতি প্রদর্শন করেন।",
    hint: "Systematic clause tree partitioning.",
    level: "basic"
  },
  {
    id: 2,
    question: "When Swadeep asks why 'The mentor from Barrackpore praised Swadeep' is SVO rather than SVC, how does Sukanta Sir explain?",
    options: [
      "'Praise' is an action verb transferring energy to a distinct person (Mentor != Swadeep -> SVO); an SVC requires a linking verb where Subject == Complement (e.g., 'The mentor is Sukanta Sir')",
      "Because Swadeep is a proper noun",
      "Because praised is past tense",
      "Because Barrackpore is a city"
    ],
    correctAnswer: 0,
    answer: "'Praise' is an action verb transferring energy to a distinct person (Mentor != Swadeep -> SVO); an SVC requires a linking verb where Subject == Complement (e.g., 'The mentor is Sukanta Sir')",
    explanation: "The Equality Test: In SVO, Subject != Object. In SVC, Subject == Complement.",
    explanationBn: "সমতা নীতি: SVO-তে কর্তা ও কর্ম দুটি আলাদা ব্যক্তি (Mentor != Swadeep); কিন্তু SVC-তে কর্তা ও কমপ্লিমেন্ট একই ব্যক্তি (Mentor == Sukanta Sir)।",
    hint: "Subject != Object (SVO) vs Subject == Complement (SVC).",
    level: "basic"
  },
  {
    id: 3,
    question: "When Tuhina asks about the sentence 'They appointed Debangshu captain', what pattern does Sir confirm it to be?",
    options: [
      "SVOC (Complex-Transitive: Debangshu = Captain)",
      "SVOO (Ditransitive)",
      "SVC",
      "SVOA"
    ],
    correctAnswer: 0,
    answer: "SVOC (Complex-Transitive: Debangshu = Captain)",
    explanation: "Debangshu is the direct object; captain is his resultant title (Object Complement). (Debangshu == Captain -> SVOC).",
    explanationBn: "Debangshu হলো Direct Object এবং captain হলো তার নতুন পদমর্যাদা (Object Complement)। সমতা থাকায় এটি SVOC।",
    hint: "Debangshu = Captain (SVOC).",
    level: "basic"
  },
  {
    id: 4,
    question: "When Debangshu asks why *'He explained me the chapter'* is incorrect, what rule does Sukanta Sir reiterate?",
    options: [
      "'Explain' is a Latinate verb that CANNOT take a preverbal indirect object; it strictly requires 'He explained the chapter TO me'",
      "'Explain' can only be used with books",
      "'Chapter' must be capitalized",
      "'Me' should be 'I'"
    ],
    correctAnswer: 0,
    answer: "'Explain' is a Latinate verb that CANNOT take a preverbal indirect object; it strictly requires 'He explained the chapter TO me'",
    explanation: "Latinate communication verbs (explain, suggest, describe, announce) forbid the SVOO structure. They strictly require the preposition 'to'.",
    explanationBn: "ল্যাটিন ক্রিয়াপদ (explain, suggest, describe) কখনো SVOO গ্রহণ করে না (*'explain me' ভুল); বলতে হবে 'explained the chapter TO me'।",
    hint: "Never say *'explain me'*; use 'explain to me'.",
    level: "intermediate"
  },
  {
    id: 5,
    question: "In the sentence tree diagnostics, how is an imperative command like 'Close the door' diagrammed?",
    options: [
      "Complete Subject = Covert / Implied '[You]'; Complete Predicate = 'Close the door' (SVO pattern)",
      "It has no subject and no predicate",
      "The door is the subject",
      "Close is both subject and verb"
    ],
    correctAnswer: 0,
    answer: "Complete Subject = Covert / Implied '[You]'; Complete Predicate = 'Close the door' (SVO pattern)",
    explanation: "All standard imperative sentences possess an underlying second-person subject '[You]'.",
    explanationBn: "অনুরোধ/আদেশমূলক বাক্যের Subject হলো অন্তর্নিহিত '[You]' এবং 'Close the door' হলো Complete Predicate (SVO)।",
    hint: "Covert subject '[You]'.",
    level: "basic"
  },
  {
    id: 6,
    question: "When Abhronila parses 'There are three innovative solutions to this bug', what is the actual grammatical subject governing 'are'?",
    options: [
      "'three innovative solutions' (plural postponed subject)",
      "'There' (dummy subject)",
      "'this bug'",
      "'solutions to this bug are'"
    ],
    correctAnswer: 0,
    answer: "'three innovative solutions' (plural postponed subject)",
    explanation: "'There' is an expletive dummy pronoun; the true nominal head is 'three innovative solutions' (plural), requiring 'are'.",
    explanationBn: "'There' হলো Dummy Subject; আসল Subject হলো 'three innovative solutions' (Plural), যার কারণে বহুবচন ক্রিয়া 'are' বসেছে।",
    hint: "'There' is an expletive; find the delayed subject.",
    level: "intermediate"
  },
  {
    id: 7,
    question: "In the sentence 'Under the sprawling banyan tree sat the elderly philosopher', identify the Complete Subject and Complete Predicate:",
    options: [
      "Complete Subject: 'the elderly philosopher'; Complete Predicate: 'Under the sprawling banyan tree sat'",
      "Complete Subject: 'Under the sprawling banyan tree'; Complete Predicate: 'sat the elderly philosopher'",
      "Complete Subject: 'banyan tree'; Complete Predicate: 'sat'",
      "Complete Subject: 'the elderly philosopher sat'"
    ],
    correctAnswer: 0,
    answer: "Complete Subject: 'the elderly philosopher'; Complete Predicate: 'Under the sprawling banyan tree sat'",
    explanation: "Inverted locational construction: the nominal performing the sitting is 'the elderly philosopher' (Subject).",
    explanationBn: "উল্টানো বাক্যরীতিতে আসল কর্তা হলো 'the elderly philosopher' (Complete Subject) এবং স্থান সহ ক্রিয়া হলো 'Under the sprawling banyan tree sat' (Complete Predicate)।",
    hint: "Who sat under the tree?",
    level: "intermediate"
  },
  {
    id: 8,
    question: "When Swadeep parses 'Swadeep gave Debangshu a compiler and explained its architecture to him', what compound structure does this sentence exhibit?",
    options: [
      "A single Subject ('Swadeep') with a Compound Predicate combining an SVOO clause ('gave Debangshu a compiler') and an SVOA/SVO+Prep clause ('explained its architecture to him')",
      "A compound subject with a simple predicate",
      "Two independent sentences without conjunction",
      "A simple SV sentence"
    ],
    correctAnswer: 0,
    answer: "A single Subject ('Swadeep') with a Compound Predicate combining an SVOO clause ('gave Debangshu a compiler') and an SVOA/SVO+Prep clause ('explained its architecture to him')",
    explanation: "Swadeep is the shared subject governing the two coordinate predicates 'gave...' and 'explained...'.",
    explanationBn: "একক Subject 'Swadeep' দুটি সমন্বিত ক্রিয়া ('gave...' এবং 'explained...') পরিচালনা করায় এটি একটি Compound Predicate।",
    hint: "Single subject governing two coordinated predicate clauses.",
    level: "advanced"
  },
  {
    id: 9,
    question: "In the sentence 'The quality of the research papers submitted by the students was exemplary', what is the Simple Subject?",
    options: ["quality", "research papers", "students", "papers"],
    correctAnswer: 0,
    answer: "quality",
    explanation: "'Quality' is the singular head noun. 'Papers' and 'students' are prepositional objects and cannot act as the subject. Hence, the verb is 'was'.",
    explanationBn: "Preposition-এর ভেতরের পদগুলো কর্তা হতে পারে না; মূল Simple Subject হলো 'quality' (Singular), তাই 'was' বসেছে।",
    hint: "Error of proximity: head noun is 'quality'.",
    level: "intermediate"
  },
  {
    id: 10,
    question: "Which of the following sentences represents the SVA pattern with an obligatory locational adverbial?",
    options: [
      "The historic cantonment lies in Barrackpore.",
      "The historic cantonment attracted tourists.",
      "The tourists visited Barrackpore.",
      "Barrackpore is historic."
    ],
    correctAnswer: 0,
    answer: "The historic cantonment lies in Barrackpore.",
    explanation: "'Lies' is an intransitive verb of location taking the obligatory spatial adverbial 'in Barrackpore' (SVA).",
    explanationBn: "Subject ('The cantonment') + Verb ('lies') + Obligatory Adverbial ('in Barrackpore') — এটি SVA প্যাটার্ন।",
    hint: "Locational verb + place adverbial.",
    level: "basic"
  },
  {
    id: 11,
    question: "Which of the following sentences represents the SVOA pattern with an obligatory placement adverbial?",
    options: [
      "Swadeep put the research notebook into his backpack.",
      "Swadeep read the research notebook.",
      "Swadeep gave his friend the notebook.",
      "The notebook is informative."
    ],
    correctAnswer: 0,
    answer: "Swadeep put the research notebook into his backpack.",
    explanation: "Subject ('Swadeep') + Verb ('put') + Direct Object ('the research notebook') + Obligatory Adverbial ('into his backpack') (SVOA).",
    explanationBn: "Subject ('Swadeep') + Verb ('put') + DO ('the notebook') + Adverbial ('into his backpack') — এটি SVOA প্যাটার্ন।",
    hint: "Put + object + location.",
    level: "basic"
  },
  {
    id: 12,
    question: "In 'The mentor, together with thirty students, is conducting a workshop', why is 'is' singular?",
    options: [
      "Because 'together with' is an intervening prepositional phrase; agreement is governed strictly by the singular head 'The mentor'",
      "Because students is singular",
      "Because workshop is singular",
      "It is a typographical mistake"
    ],
    correctAnswer: 0,
    answer: "Because 'together with' is an intervening prepositional phrase; agreement is governed strictly by the singular head 'The mentor'",
    explanation: "'Together with', 'along with', 'as well as' do not create plural compound subjects; the verb agrees with the first subject.",
    explanationBn: "'together with' থাকলে Verb সর্বদা প্রথম Subject ('The mentor') অনুযায়ী Singular ('is') হবে।",
    hint: "First subject governs agreement.",
    level: "intermediate"
  },
  {
    id: 13,
    question: "In 'Neither the teacher nor the students were satisfied with the initial result', what rule governs the verb 'were'?",
    options: [
      "The Rule of Proximity: the verb agrees with the nearer subject 'the students' (plural)",
      "The Rule of Distance: agrees with 'teacher'",
      "All negative sentences must use 'were'",
      "None of the above"
    ],
    correctAnswer: 0,
    answer: "The Rule of Proximity: the verb agrees with the nearer subject 'the students' (plural)",
    explanation: "In 'Neither... nor', the nearest subject ('the students') dictates plural agreement.",
    explanationBn: "Rule of Proximity অনুযায়ী Verb-এর নিকটবর্তী Subject 'the students' (Plural) হওয়ায় Plural Verb 'were' বসেছে।",
    hint: "Rule of proximity with 'Neither... nor'.",
    level: "intermediate"
  },
  {
    id: 14,
    question: "In 'Bread and butter is his favorite breakfast dish', why is 'is' singular despite 'and'?",
    options: [
      "Because 'Bread and butter' represents a single composite culinary dish / unified idea",
      "Because butter is uncountable",
      "Because breakfast is singular",
      "It is an idiom that has no grammatical logic"
    ],
    correctAnswer: 0,
    answer: "Because 'Bread and butter' represents a single composite culinary dish / unified idea",
    explanation: "Coordinate nouns representing a single composite entity or dish take singular verbs in standard English.",
    explanationBn: "'Bread and butter' যখন একটিমাত্র অবিচ্ছেদ্য খাবার বা সামগ্রিক ভাব প্রকাশ করে, তখন তা Singular Verb ('is') গ্রহণ করে।",
    hint: "Single composite idea/dish.",
    level: "basic"
  },
  {
    id: 15,
    question: "In 'The secretary and treasurer has submitted the annual report', what does the single article 'The' indicate?",
    options: [
      "One person holds both offices (Secretary and Treasurer)",
      "Two separate individuals are acting together",
      "The secretary is more important than the treasurer",
      "The report was submitted late"
    ],
    correctAnswer: 0,
    answer: "One person holds both offices (Secretary and Treasurer)",
    explanation: "One article before the first noun means one person holds both roles (Singular -> 'has').",
    explanationBn: "প্রথম পদের আগে একটিমাত্র Article ('The') থাকার অর্থ হলো একই ব্যক্তি দুটি পদে নিয়োজিত, তাই Singular Verb 'has'।",
    hint: "One article = one person.",
    level: "intermediate"
  },
  {
    id: 16,
    question: "In 'The secretary and THE treasurer have submitted the annual report', what do the two articles indicate?",
    options: [
      "Two distinct individuals hold the two separate posts, requiring a plural verb ('have')",
      "One person with two titles",
      "A typing redundancy",
      "An informal dialect"
    ],
    correctAnswer: 0,
    answer: "Two distinct individuals hold the two separate posts, requiring a plural verb ('have')",
    explanation: "Two articles ('The... and the...') indicate two distinct people, creating a plural subject.",
    explanationBn: "দুটি পদের আগেই 'The' থাকলে দুজন আলাদা ব্যক্তি বোঝায় এবং Plural Verb 'have' বসে।",
    hint: "Two articles = two distinct people.",
    level: "intermediate"
  },
  {
    id: 17,
    question: "In the sentence 'The doctor examined the patient carefully in the clinic yesterday', identify the full sequence of elements:",
    options: [
      "Subject ('The doctor') + Verb ('examined') + Direct Object ('the patient') + Adverb of Manner ('carefully') + Adverb of Place ('in the clinic') + Adverb of Time ('yesterday') -> SVO + M-P-T",
      "SVOO",
      "SVOC",
      "SVC"
    ],
    correctAnswer: 0,
    answer: "Subject ('The doctor') + Verb ('examined') + Direct Object ('the patient') + Adverb of Manner ('carefully') + Adverb of Place ('in the clinic') + Adverb of Time ('yesterday') -> SVO + M-P-T",
    explanation: "Classic SVO pattern expanded by the canonical MPT adverb chain (Manner -> Place -> Time).",
    explanationBn: "SVO প্যাটার্নের সাথে MPT নিয়মে Adverb of Manner ('carefully'), Place ('in the clinic'), এবং Time ('yesterday') সুবিন্যস্ত হয়েছে।",
    hint: "SVO + Manner + Place + Time.",
    level: "intermediate"
  },
  {
    id: 18,
    question: "In 'Debangshu made Tuhina a cup of aromatic Darjeeling tea', what are the objects?",
    options: [
      "Indirect Object: 'Tuhina'; Direct Object: 'a cup of aromatic Darjeeling tea'",
      "Direct Object: 'Tuhina'; Indirect Object: 'tea'",
      "Subject: 'Tuhina'; Object: 'tea'",
      "Object Complement: 'Tuhina'"
    ],
    correctAnswer: 0,
    answer: "Indirect Object: 'Tuhina'; Direct Object: 'a cup of aromatic Darjeeling tea'",
    explanation: "'A cup of tea' is what was made (DO); 'Tuhina' is the beneficiary for whom it was made (IO). (SVOO).",
    explanationBn: "'a cup of tea' হলো Direct Object এবং 'Tuhina' হলো Beneficiary Indirect Object।",
    hint: "What was made? (DO) For whom? (IO).",
    level: "basic"
  },
  {
    id: 19,
    question: "In 'Debangshu made Tuhina team leader of the robotics club', what are the elements?",
    options: [
      "Direct Object: 'Tuhina'; Object Complement: 'team leader of the robotics club' (SVOC)",
      "Indirect Object: 'Tuhina'; Direct Object: 'team leader'",
      "Subject: 'Tuhina'",
      "SVC"
    ],
    correctAnswer: 0,
    answer: "Direct Object: 'Tuhina'; Object Complement: 'team leader of the robotics club' (SVOC)",
    explanation: "Here 'Tuhina' is the direct object; 'team leader...' renames Tuhina's new role (Object Complement). (Tuhina == Team Leader -> SVOC).",
    explanationBn: "এখানে Tuhina হলো Direct Object এবং 'team leader...' হলো তার পদমর্যাদা প্রকাশক Object Complement (SVOC)।",
    hint: "Tuhina = Team leader (SVOC).",
    level: "basic"
  },
  {
    id: 20,
    question: "In 'It is easy to find fault with others', what is the grammatical term for 'It' and 'to find fault with others'?",
    options: [
      "'It' is the Dummy / Anticipatory Subject; 'to find fault with others' is the Real / Postponed Subject",
      "'It' is the direct object",
      "'to find fault' is an adverb",
      "'It' is a relative pronoun"
    ],
    correctAnswer: 0,
    answer: "'It' is the Dummy / Anticipatory Subject; 'to find fault with others' is the Real / Postponed Subject",
    explanation: "'It' acts as a placeholder; the true delayed semantic subject is the non-finite infinitive phrase.",
    explanationBn: "'It' হলো Dummy বা Anticipatory Subject; বাক্যের প্রকৃত বিলম্বিত উদ্দেশ্য (Real Subject) হলো 'to find fault with others'।",
    hint: "Anticipatory dummy 'It' + postponed infinitive subject.",
    level: "advanced"
  },
  {
    id: 21,
    question: "In 'That the earth revolves around the sun is an established scientific fact', what is the Complete Subject?",
    options: [
      "'That the earth revolves around the sun' (a Noun Clause functioning as Subject)",
      "'the earth'",
      "'the sun'",
      "'an established scientific fact'"
    ],
    correctAnswer: 0,
    answer: "'That the earth revolves around the sun' (a Noun Clause functioning as Subject)",
    explanation: "An entire subordinate Noun Clause acts as the singular Complete Subject of the finite linking verb 'is'.",
    explanationBn: "'That the earth revolves around the sun' একটি পূর্ণাঙ্গ Noun Clause যা 'is' Verb-এর Subject হিসেবে কাজ করছে।",
    hint: "The entire 'That-clause' serves as the subject.",
    level: "advanced"
  },
  {
    id: 22,
    question: "In 'To err is human; to forgive, divine', what syntactic role do 'To err' and 'to forgive' perform?",
    options: [
      "Infinitive Phrases functioning as Subjects of their respective clauses",
      "Direct Objects",
      "Adverbs of Manner",
      "Prepositional Phrases"
    ],
    correctAnswer: 0,
    answer: "Infinitive Phrases functioning as Subjects of their respective clauses",
    explanation: "'To err' is the nominal subject of 'is'; 'to forgive' is the elliptical subject of '[is] divine'.",
    explanationBn: "'To err' এবং 'to forgive' হলো দুটি সমান্তরাল Infinitive Phrases যা স্ব স্ব ক্লজের Subject হিসেবে কাজ করছে।",
    hint: "Infinitives acting as nominal subjects.",
    level: "intermediate"
  },
  {
    id: 23,
    question: "In 'Swadeep was awarded the first prize by the judging panel', what is the grammatical term for 'the first prize'?",
    options: [
      "Retained Object (a Direct Object retained after the Indirect Object became the passive subject)",
      "Subject Complement",
      "Object Complement",
      "Adverbial"
    ],
    correctAnswer: 0,
    answer: "Retained Object (a Direct Object retained after the Indirect Object became the passive subject)",
    explanation: "In passive voice transformations of ditransitive verbs, the non-promoted object remains in the predicate as a Retained Object.",
    explanationBn: "Passive Voice-এ রূপান্তরিত হওয়ার পরও যে কর্মটি অবশিষ্ট থেকে যায় তাকে Retained Object বলে ('the first prize')।",
    hint: "The direct object retained in the passive predicate.",
    level: "advanced"
  },
  {
    id: 24,
    question: "In 'The students painted the classroom cheerful yellow', what is 'cheerful yellow'?",
    options: [
      "Object Complement Adjective Phrase",
      "Subject Complement",
      "Direct Object",
      "Adverb of Manner"
    ],
    correctAnswer: 0,
    answer: "Object Complement Adjective Phrase",
    explanation: "'The classroom' is the direct object; 'cheerful yellow' describes the resultant color/state of the classroom (SVOC).",
    explanationBn: "'the classroom' হলো Direct Object এবং 'cheerful yellow' হলো শ্রেণীকক্ষের পরিবর্তিত রং প্রকাশক Object Complement।",
    hint: "Classroom became cheerful yellow (SVOC).",
    level: "basic"
  },
  {
    id: 25,
    question: "Why is 'The rose smells sweet' an SVC sentence, whereas 'Swadeep smelled the rose cautiously' is an SVO sentence?",
    options: [
      "In the first sentence, 'smells' is a copular linking verb expressing state (Rose = Sweet); in the second, 'smelled' is an intentional transitive action performed on an external object (Rose)",
      "Because Swadeep is a human",
      "Because cautiously ends in '-ly'",
      "There is no grammatical difference"
    ],
    correctAnswer: 0,
    answer: "In the first sentence, 'smells' is a copular linking verb expressing state (Rose = Sweet); in the second, 'smelled' is an intentional transitive action performed on an external object (Rose)",
    explanation: "Linking verb of perception (SVC) vs Transitive action verb with direct object (SVO).",
    explanationBn: "প্রথম বাক্যে 'smell' অবস্থা প্রকাশক Linking Verb (SVC); দ্বিতীয় বাক্যে 'smelled' সক্রিয় কাজ প্রকাশক Transitive Verb যার কর্ম 'the rose' (SVO)।",
    hint: "Linking state (SVC) vs Transitive action (SVO).",
    level: "intermediate"
  },
  {
    id: 26,
    question: "In 'Ten miles is a long distance to walk on foot', what is the concord invariant?",
    options: [
      "A specific distance, period of time, weight, or monetary sum is conceived as a singular collective unit and takes a singular verb ('is')",
      "Miles is a singular noun",
      "Distance is an adjective",
      "It is a dialect of Northern England"
    ],
    correctAnswer: 0,
    answer: "A specific distance, period of time, weight, or monetary sum is conceived as a singular collective unit and takes a singular verb ('is')",
    explanation: "Quantities of distance, time, and money take singular verbs when viewed as a single collective measurement.",
    explanationBn: "দূরত্ব (Ten miles), সময় বা অর্থের পরিমাণ যখন একটি সামগ্রিক একক হিসেবে ব্যবহৃত হয়, তখন Singular Verb ('is') বসে।",
    hint: "Measurement unit takes a singular verb.",
    level: "basic"
  },
  {
    id: 27,
    question: "In 'Mathematics is an intriguing field of analytical science', what is the concord invariant?",
    options: [
      "Nouns ending in '-s' that represent academic disciplines or branches of study are singular in meaning and concord",
      "Mathematics is plural in Indian English",
      "Science is the real subject",
      "It is an error"
    ],
    correctAnswer: 0,
    answer: "Nouns ending in '-s' that represent academic disciplines or branches of study are singular in meaning and concord",
    explanation: "Academic disciplines (Mathematics, Physics, Economics, Civics, Linguistics) are singular nouns requiring singular verbs.",
    explanationBn: "শাস্ত্র বা বিষয়ের নাম (Mathematics, Physics, Economics) দেখতে বহুবচনের মতো হলেও এরা Singular এবং Singular Verb ('is') গ্রহণ করে।",
    hint: "Academic subjects ending in '-s' are singular.",
    level: "basic"
  },
  {
    id: 28,
    question: "In 'The jury were divided in their verdicts', why does 'jury' take the plural verb 'were'?",
    options: [
      "Because the collective noun is behaving as a Noun of Multitude where individual members act separately with conflicting opinions",
      "Because jury is always plural",
      "Because verdicts is plural",
      "It is a colloquialism"
    ],
    correctAnswer: 0,
    answer: "Because the collective noun is behaving as a Noun of Multitude where individual members act separately with conflicting opinions",
    explanation: "When members of a collective noun act as separate individuals or in disagreement, plural verbs and pronouns are used.",
    explanationBn: "Collective Noun-এর সদস্যরা যখন ভিন্ন ভিন্ন মত পোষণ করে আলাদা ব্যক্তি হিসেবে প্রতীয়মান হয়, তখন Plural Verb ('were') ও Pronoun ('their') ব্যবহৃত হয়।",
    hint: "Noun of Multitude in disagreement.",
    level: "advanced"
  },
  {
    id: 29,
    question: "In 'Swadeep presented his mentor a bouquet of fragrant lilies', transform the sentence into the 'TO' dative prepositional pattern:",
    options: [
      "Swadeep presented a bouquet of fragrant lilies to his mentor.",
      "Swadeep presented a bouquet of fragrant lilies for his mentor.",
      "Swadeep presented his mentor with a bouquet of lilies.",
      "A bouquet of lilies presented Swadeep to his mentor."
    ],
    correctAnswer: 0,
    answer: "Swadeep presented a bouquet of fragrant lilies to his mentor.",
    explanation: "'Present' as a ceremonial transfer takes the preposition 'to' when the direct object precedes the recipient.",
    explanationBn: "হস্তান্তর প্রকাশক Verb হিসেবে 'present'-এর সাথে 'to' বসবে: 'presented a bouquet ... TO his mentor'।",
    hint: "Transfer verb uses 'to'.",
    level: "basic"
  },
  {
    id: 30,
    question: "What is the grand conclusion of Module 001_002: Sentence Anatomy as taught by Mentor Sukanta Hui?",
    options: [
      "Every sentence in the English language is an architectural organism: partitioned into Complete Subject and Complete Predicate, powered by a Finite Verb engine, and configured across the 7 Fundamental Patterns. Master this anatomy, and your composition will be flawless, authoritative, and elegant.",
      "Sentences do not need subjects",
      "Grammar rules should be ignored when writing essays",
      "Only memorize vocabulary without sentence structure"
    ],
    correctAnswer: 0,
    answer: "Every sentence in the English language is an architectural organism: partitioned into Complete Subject and Complete Predicate, powered by a Finite Verb engine, and configured across the 7 Fundamental Patterns. Master this anatomy, and your composition will be flawless, authoritative, and elegant.",
    explanation: "Module 001_002 provides the definitive structural anatomy of English clauses, empowering learners to parse and write with professional mastery.",
    explanationBn: "সুকান্ত স্যারের সমাপনী বার্তা: ইংরেজি বাক্য হলো একটি জীবন্ত স্থাপত্য—যার দুটি অংশ Subject ও Predicate, যার হৃৎপিণ্ড Finite Verb, এবং যার রূপ ৭টি মৌলিক কাঠামোর মধ্যে বিন্যস্ত। এই শরীরতত্ত্ব আয়ত্ত করলেই রচনা হবে নির্ভুল, বলিষ্ঠ ও সৌন্দর্যমণ্ডিত।",
    hint: "Complete structural mastery of English clause anatomy.",
    level: "basic"
  }
];

export default questions;
