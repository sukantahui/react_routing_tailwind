// topic0_questions.js - Module 009_001: Punctuation Mastery, Comma Splices & Syntactic Clarity
// 25 High-Yield Diagnostic MCQs with Technical and Bengali Explanations

const questions = [
  {
    id: 1,
    question: "Identify the sentence that suffers from a COMMA SPLICE error:",
    options: [
      "The examination was arduous, however, all students passed.",
      "The examination was arduous, all students passed.",
      "The examination was arduous; all students passed.",
      "The examination was arduous, but all students passed."
    ],
    correctAnswer: "The examination was arduous, all students passed.",
    explanation: "Joining two independent clauses with only a comma (without a coordinating conjunction or semicolon) is a Comma Splice run-on error.",
    explanationBn: "দুটি সম্পূর্ণ স্বাধীন বাক্যকে কোনো Conjunction ছাড়া শুধু কমা দিয়ে যুক্ত করলে তাকে Comma Splice ভুল বলা হয়।"
  },
  {
    id: 2,
    question: "Which of the following sentences correctly demonstrates the OXFORD COMMA (serial comma)?",
    options: [
      "I would like to thank my parents, Mother Teresa and the Pope. (Ambiguous)",
      "I would like to thank my parents, Mother Teresa, and the Pope.",
      "I would like to thank my parents Mother Teresa, and the Pope.",
      "I would like to thank my parents, Mother Teresa and, the Pope."
    ],
    correctAnswer: "I would like to thank my parents, Mother Teresa, and the Pope.",
    explanation: "The Oxford Comma is the comma placed immediately before the coordinating conjunction (and/or) in a series of three or more items to prevent hilarious ambiguity.",
    explanationBn: "তালিকায় ৩ বা ততোধিক বিষয়ের ক্ষেত্রে 'and'-এর ঠিক আগে যে কমাটি বসে তাকে Oxford Comma বলে; এটি মারাত্মক অর্থবিভ্রান্তি দূর করে।"
  },
  {
    id: 3,
    question: "Choose the correctly punctuated sentence using a SEMICOLON with a conjunctive adverb:",
    options: [
      "The research data was compelling; therefore, the committee approved the grant.",
      "The research data was compelling, therefore, the committee approved the grant.",
      "The research data was compelling; therefore the committee approved the grant.",
      "The research data was compelling, therefore; the committee approved the grant."
    ],
    correctAnswer: "The research data was compelling; therefore, the committee approved the grant.",
    explanation: "When a conjunctive adverb (therefore, however, moreover) links two independent clauses, it is preceded by a semicolon and followed by a comma.",
    explanationBn: "Conjunctive Adverb (যেমন: therefore, however) দুটি স্বাধীন বাক্যকে যুক্ত করলে পূর্বে Semicolon (;) এবং পরে Comma (,) বসে।"
  },
  {
    id: 4,
    question: "Select the sentence where a COLON (:) is used correctly to introduce a list:",
    options: [
      "The essential items for the laboratory experiment are: test tubes, beakers, and burners.",
      "The laboratory assistant prepared the essential equipment: test tubes, beakers, and Bunsen burners.",
      "For the experiment you will need: test tubes, beakers, and burners.",
      "The students brought: test tubes, beakers, and Bunsen burners."
    ],
    correctAnswer: "The laboratory assistant prepared the essential equipment: test tubes, beakers, and Bunsen burners.",
    explanation: "A colon must be preceded by a grammatically complete independent clause ('The assistant prepared the essential equipment'). Never place a colon directly after a verb ('are:') or preposition ('need:').",
    explanationBn: "Colon-এর পূর্বের অংশটি অবশ্যই একটি পূর্ণাঙ্গ ব্যাকরণগত বাক্য (Independent Clause) হতে হবে; Verbs of being ('are:') বা Preposition-এর পরে সরাসরি কোলন বসানো ভুল।"
  },
  {
    id: 5,
    question: "Identify the correct usage of the EM DASH (—) for dramatic parenthetical interruption:",
    options: [
      "The ancient secret—guarded for three centuries by monks—was finally unveiled.",
      "The ancient secret - guarded for three centuries by monks - was finally unveiled.",
      "The ancient secret — guarded for three centuries by monks — was finally unveiled.",
      "The ancient secret-guarded for three centuries by monks-was finally unveiled."
    ],
    correctAnswer: "The ancient secret—guarded for three centuries by monks—was finally unveiled.",
    explanation: "An Em Dash (—) is used without spaces (in standard publishing) to create emphatic, dramatic parenthetical emphasis or sudden rhetorical shifts.",
    explanationBn: "Em Dash (—) কোনো আকস্মিক ভাবান্তর বা বিশেষ জোর দেওয়ার জন্য ব্যবহৃত হয়।"
  },
  {
    id: 6,
    question: "Which of the following illustrates the illiterate 'Grocer's Apostrophe' error?",
    options: [
      "Fresh Apple's for Sale",
      "Fresh Apples for Sale",
      "The Teacher's Desk",
      "Students' Books"
    ],
    correctAnswer: "Fresh Apple's for Sale",
    explanation: "Using an apostrophe to form a simple plural noun ('Apple's' instead of 'Apples') is the notorious 'Grocer's Apostrophe' error.",
    explanationBn: "সাধারণ বহুবচনে Apostrophe ব্যবহার করা ('Apple's' এর বদলে 'Apples') মারাত্মক ভুল; একে Grocer's Apostrophe বলে।"
  },
  {
    id: 7,
    question: "Identify the correctly punctuated sentence containing an introductory adverbial clause:",
    options: [
      "When the bell rang the students left the classroom.",
      "When the bell rang, the students left the classroom.",
      "When, the bell rang the students left the classroom.",
      "When the bell rang the students, left the classroom."
    ],
    correctAnswer: "When the bell rang, the students left the classroom.",
    explanation: "When a subordinate adverbial clause precedes the main independent clause, a comma MUST separate them.",
    explanationBn: "Subordinate Clause যখন বাক্যের শুরুতে বসে, তখন Main Clause-এর পূর্বে কমা (,) বসানো বাধ্যতামূলক।"
  },
  {
    id: 8,
    question: "Select the sentence with correct quotation and comma punctuation (British style vs American style):",
    options: [
      "'I am ready,' said the explorer. (Standard American dialogue punctuation)",
      "'I am ready', said the explorer. (British publishing punctuation)",
      "Both A and B are standard conventions in their respective geographic domains.",
      "Neither A nor B is correct."
    ],
    correctAnswer: "Both A and B are standard conventions in their respective geographic domains.",
    explanation: "American style places commas inside quotation marks (,'), whereas British publishing traditionally places punctuation outside (',). Both are correct within their conventions.",
    explanationBn: "আমেরিকান রীতিতে কমা কোটেশনের ভেতরে বসে (,'), আর ব্রিটিশ রীতিতে কোটেশনের বাইরে বসে (',)। উভয় রীতিই তাদের নিজস্ব প্রেক্ষাপটে সঠিক।"
  },
  {
    id: 9,
    question: "Identify the sentence that correctly punctuates direct address (vocative comma):",
    options: [
      "Let's eat grandma! (Cannibalistic meaning!)",
      "Let's eat, grandma!",
      "Let's eat grandma.",
      "Let's, eat grandma!"
    ],
    correctAnswer: "Let's eat, grandma!",
    explanation: "A vocative comma before the name of the person addressed ('grandma') is critical to indicate you are inviting her to eat, not eating her!",
    explanationBn: "সম্বোধন পদের (Vocative) আগে কমা না দিলে অর্থ সম্পূর্ণ বিকৃত হয়ে যায় ('Let's eat, grandma!'-তে কমা দিয়ে দাদিকে খাওয়ার আহ্বান বোঝানো হয়েছে)।"
  },
  {
    id: 10,
    question: "Select the correctly punctuated complex series where items contain internal commas:",
    options: [
      "The delegates arrived from London, England, Paris, France, and Tokyo, Japan.",
      "The delegates arrived from London, England; Paris, France; and Tokyo, Japan.",
      "The delegates arrived from London, England: Paris, France: and Tokyo, Japan.",
      "The delegates arrived from London, England—Paris, France—and Tokyo, Japan."
    ],
    correctAnswer: "The delegates arrived from London, England; Paris, France; and Tokyo, Japan.",
    explanation: "When list items themselves contain internal commas (City, Country), semicolons MUST separate the major items to prevent syntactic chaos.",
    explanationBn: "তালিকার ভেতরের পদগুলোর মধ্যেই কমা থাকলে মূল পদগুলোকে আলাদা করার জন্য Semicolon (;) ব্যবহার করতে হয়।"
  },
  {
    id: 11,
    question: "Identify the correct use of the EN DASH (–):",
    options: [
      "The conference spans May 15–May 18.",
      "The conference spans May 15—May 18.",
      "The conference spans May 15 - May 18.",
      "The conference spans May 15 to - May 18."
    ],
    correctAnswer: "The conference spans May 15–May 18.",
    explanation: "The En Dash (–) is specifically used to represent spans or ranges of numbers, dates, scores, or pages (e.g., pages 45–60, 1939–1945).",
    explanationBn: "তারিখ, পৃষ্ঠা বা সংখ্যার সীমা বা রেঞ্জ (range) বোঝাতে En Dash (–) ব্যবহৃত হয়।"
  },
  {
    id: 12,
    question: "Select the sentence with correct APOSTROPHE placement for joint possession:",
    options: [
      "Rohan and Soham's joint venture was a massive success.",
      "Rohan's and Soham's joint venture was a massive success.",
      "Rohan's and Soham joint venture was a massive success.",
      "Rohan and Sohams' joint venture was a massive success."
    ],
    correctAnswer: "Rohan and Soham's joint venture was a massive success.",
    explanation: "When two or more individuals jointly own a single item or venture, the possessive apostrophe is attached ONLY to the final noun.",
    explanationBn: "যৌথ মালিকানা (Joint Possession) বোঝাতে শুধুমাত্র শেষ নামের পরে Apostrophe 's' বসে।"
  },
  {
    id: 13,
    question: "Select the sentence with correct APOSTROPHE placement for separate individual possession:",
    options: [
      "Shakespeare's and Milton's poetic styles are completely different.",
      "Shakespeare and Milton's poetic styles are completely different.",
      "Shakespeare and Miltons' poetic styles are completely different.",
      "Shakespeare's and Milton poetic styles are completely different."
    ],
    correctAnswer: "Shakespeare's and Milton's poetic styles are completely different.",
    explanation: "When referring to separate possessions or styles of two distinct individuals, BOTH nouns must take an apostrophe 's'.",
    explanationBn: "আলাদা আলাদা মালিকানা বা বৈশিষ্ট্যের ক্ষেত্রে উভয় নামের পরেই Apostrophe 's' বসে।"
  },
  {
    id: 14,
    question: "Identify the sentence that correctly uses parentheses for non-essential editorial asides:",
    options: [
      "The prime minister (accompanied by his security detail) arrived at the summit.",
      "The prime minister, (accompanied by his security detail) arrived at the summit.",
      "The prime minister (accompanied by his security detail,) arrived at the summit.",
      "The prime minister [accompanied by his security detail] arrived at the summit."
    ],
    correctAnswer: "The prime minister (accompanied by his security detail) arrived at the summit.",
    explanation: "Parentheses neatly enclose supplementary information without needing surrounding commas.",
    explanationBn: "Parentheses (প্রথম বন্ধনী) অতিরিক্ত অপ্রধান তথ্যকে সুনির্দিষ্টভাবে আবদ্ধ করে।"
  },
  {
    id: 15,
    question: "When are SQUARE BRACKETS [ ] used in academic and journalistic prose?",
    options: [
      "To indicate words or explanations inserted by the editor/author into a direct quotation.",
      "To indicate parenthetical thoughts of the speaker.",
      "To mark dialogue in British literature.",
      "To replace question marks in rhetorical questions."
    ],
    correctAnswer: "To indicate words or explanations inserted by the editor/author into a direct quotation.",
    explanation: "Square brackets are strictly reserved for editorial clarifications, corrections, or pronoun replacements inserted into an exact quotation.",
    explanationBn: "উদ্ধৃতির ভেতরে সম্পাদকের নিজস্ব ব্যাখ্যা বা সংযোজন নির্দেশ করতে Square Brackets [ ] ব্যবহৃত হয়।"
  },
  {
    id: 16,
    question: "Which of the following represents a correct repair of the Comma Splice: 'The library is closed today, we must study at home.'?",
    options: [
      "The library is closed today; we must study at home. (Semicolon repair)",
      "The library is closed today. We must study at home. (Period repair)",
      "The library is closed today, so we must study at home. (Comma + FANBOYS)",
      "All of the above are 100% valid grammatical repairs."
    ],
    correctAnswer: "All of the above are 100% valid grammatical repairs.",
    explanation: "A comma splice can be repaired via: 1. A semicolon, 2. A period, 3. A comma + coordinating conjunction (FANBOYS), or 4. Subordination ('Because the library is closed...').",
    explanationBn: "Comma Splice দূর করার ৪টি প্রধান উপায় রয়েছে: Semicolon, Period, Comma + FANBOYS, অথবা Subordination।"
  },
  {
    id: 17,
    question: "Identify the correctly punctuated sentence containing coordinate adjectives modifying a noun:",
    options: [
      "He was a charming, witty orator.",
      "He was a charming witty orator.",
      "He was a charming, witty, orator.",
      "He was a charming witty, orator."
    ],
    correctAnswer: "He was a charming, witty orator.",
    explanation: "Coordinate adjectives of equal weight modifying a noun ('charming' and 'witty') are separated by a comma. No comma is placed between the last adjective and the noun.",
    explanationBn: "সমমর্যাদার দুটি বিশেষণের মাঝে কমা বসে, কিন্তু শেষ বিশেষণ ও Noun-এর মাঝে কোনো কমা বসে না।"
  },
  {
    id: 18,
    question: "Select the sentence with correct HYPHENATION in a compound adjective before a noun:",
    options: [
      "She is a well-known astrophysicist.",
      "She is a well known astrophysicist.",
      "The astrophysicist is well-known. (Predicative - no hyphen needed)",
      "Both A and C represent standard hyphenation rules."
    ],
    correctAnswer: "Both A and C represent standard hyphenation rules.",
    explanation: "Compound modifiers before a noun are hyphenated ('well-known scientist'), but when they follow the verb predicatively ('is well known'), they typically drop the hyphen.",
    explanationBn: "Noun-এর আগে বসলে Compound Adjective-এ Hyphen বসে ('well-known scientist'), কিন্তু ভার্বের পরে বসলে Hyphen লাগে না।"
  },
  {
    id: 19,
    question: "Identify the correctly punctuated sentence with an introductory transitional word:",
    options: [
      "Consequently the proposal was rejected by the board.",
      "Consequently, the proposal was rejected by the board.",
      "Consequently; the proposal was rejected by the board.",
      "Consequently: the proposal was rejected by the board."
    ],
    correctAnswer: "Consequently, the proposal was rejected by the board.",
    explanation: "Introductory transitional adverbs at the beginning of a sentence must be followed by a comma.",
    explanationBn: "বাক্যের শুরুতে কোনো রূপান্তরমূলক শব্দ (যেমন: Consequently, Furthermore) বসলে তার পরে কমা (,) বসে।"
  },
  {
    id: 20,
    question: "Select the correctly punctuated sentence with a non-restrictive appositive:",
    options: [
      "Dr. APJ Abdul Kalam the Missile Man of India was an inspiring visionary.",
      "Dr. APJ Abdul Kalam, the Missile Man of India, was an inspiring visionary.",
      "Dr. APJ Abdul Kalam, the Missile Man of India was an inspiring visionary.",
      "Dr. APJ Abdul Kalam the Missile Man of India, was an inspiring visionary."
    ],
    correctAnswer: "Dr. APJ Abdul Kalam, the Missile Man of India, was an inspiring visionary.",
    explanation: "Non-restrictive appositives providing parenthetical information must be enclosed by commas on BOTH sides.",
    explanationBn: "অতিরিক্ত ব্যাখ্যামূলক পদ (Appositive)-এর উভয় পাশেই কমা (,) বসানো বাধ্যতামূলক।"
  },
  {
    id: 21,
    question: "Which of the following illustrates correct contraction vs possessive pronoun usage?",
    options: [
      "It's true that the company lost its valuable patent.",
      "Its true that the company lost it's valuable patent.",
      "Its true that the company lost its' valuable patent.",
      "It's true that the company lost it's' valuable patent."
    ],
    correctAnswer: "It's true that the company lost its valuable patent.",
    explanation: "'It's' is the contraction of 'It is' or 'It has'. 'Its' is the possessive pronoun (like 'his' or 'her') and NEVER takes an apostrophe.",
    explanationBn: "'It's' মানে 'It is'; আর 'Its' হলো Possessive Pronoun যার সাথে কখনো Apostrophe বসে না।"
  },
  {
    id: 22,
    question: "Select the sentence with correct punctuation around 'too' meaning 'also':",
    options: [
      "She, too, was astonished by the astronomical discoveries.",
      "She too was astonished by the astronomical discoveries.",
      "She too, was astonished by the astronomical discoveries.",
      "Both A and B are acceptable, with A preferred in formal publishing."
    ],
    correctAnswer: "Both A and B are acceptable, with A preferred in formal publishing.",
    explanation: "When 'too' interrupts the subject and verb, enclosing it in commas ('She, too, was...') is standard formal punctuation.",
    explanationBn: "বাক্যের মাঝখানে 'too' বসলে উভয় পাশে কমা দিয়ে ঘেরা মার্জিত প্রকাশ।"
  },
  {
    id: 23,
    question: "Identify the error in: 'The reason he failed is: because he was negligent.'",
    options: [
      "The colon is incorrect and must be deleted",
      "'because' should be replaced by 'that'",
      "Both A and B are errors",
      "No error"
    ],
    correctAnswer: "Both A and B are errors",
    explanation: "1. A colon should not follow a linking verb ('is:'); 2. 'The reason... is because' is a redundant error (must be 'The reason... is that').",
    explanationBn: "Linking Verb-এর পরে কোলন বসে না এবং 'The reason... is that' লিখতে হয় ('is because' ভুল)।"
  },
  {
    id: 24,
    question: "Select the sentence with correct ellipsis (...) punctuation for omitted text in quotes:",
    options: [
      "'The constitution guarantees liberty . . . for all citizens.'",
      "'The constitution guarantees liberty...for all citizens.'",
      "'The constitution guarantees liberty, ..., for all citizens.'",
      "'The constitution guarantees liberty - - - for all citizens.'"
    ],
    correctAnswer: "'The constitution guarantees liberty . . . for all citizens.'",
    explanation: "An ellipsis consists of three spaced periods (. . .) indicating the intentional omission of words from a quotation.",
    explanationBn: "উদ্ধৃতির অংশ বর্জন নির্দেশ করতে তিনটি বিন্দু বা Ellipsis (. . .) ব্যবহৃত হয়।"
  },
  {
    id: 25,
    question: "What is the primary function of punctuation in English syntax?",
    options: [
      "To act as the structural road signs of thought, preventing semantic ambiguity and establishing cadence.",
      "To make the page look decorative.",
      "To pause whenever the reader breathes.",
      "To separate all adjectives from verbs."
    ],
    correctAnswer: "To act as the structural road signs of thought, preventing semantic ambiguity and establishing cadence.",
    explanation: "Punctuation provides the syntactic architecture, logical grouping, and rhythmic cadence necessary for unambiguous communication.",
    explanationBn: "বিরামচিহ্ন (Punctuation) হলো বাক্যের ট্রাফিক সাইন, যা অর্থের কোনো প্রকার বিভ্রান্তি দূর করে চিন্তার সঠিক ছন্দ ও কাঠামো তৈরি করে।"
  }
];

export default questions;
