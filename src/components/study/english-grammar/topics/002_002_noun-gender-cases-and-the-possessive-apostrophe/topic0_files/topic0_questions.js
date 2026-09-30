// topic0_questions.js
// Module 002_002: Noun Gender, Cases & The Possessive Apostrophe Mechanics
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "Which of the following phrases correctly shows the possessive form for a hostel meant for multiple boys?",
    options: [
      "The boy's hostel",
      "The boys' hostel",
      "The boys hostel",
      "The boys's hostel"
    ],
    correctAnswer: 1,
    explanation: "For regular plural nouns ending in '-s' ('boys'), the possessive case is formed by adding strictly an apostrophe (without an additional 's'): 'The boys' hostel'.",
    explanationBn: "যেসব Plural Noun-এর শেষে '-s' থাকে (যেমন: 'boys'), সেগুলোর Possessive করতে শেষে শুধু Apostrophe (') বসে: 'The boys' hostel'।"
  },
  {
    id: 2,
    question: "What is the correct possessive form for the irregular plural noun 'Children'?",
    options: [
      "Childrens' park",
      "Children's park",
      "Childrens park",
      "Child's park"
    ],
    correctAnswer: 1,
    explanation: "For irregular plural nouns that do NOT end in '-s' ('children', 'women', 'men', 'people'), the possessive is formed by adding apostrophe + 's' (`'s`): 'Children's park', 'Women's college'.",
    explanationBn: "যেসব Plural Noun-এর শেষে '-s' থাকে না (যেমন: children, women, men), সেগুলোর Possessive করতে `'s` যুক্ত হয়: 'Children's park', 'Women's college'।"
  },
  {
    id: 3,
    question: "In the sentence 'Swadeep and Debangshu's joint venture won the state technology award', what does the single apostrophe on the second name indicate?",
    options: [
      "Separate individual businesses owned independently",
      "Joint ownership of a single unified venture",
      "A grammatical typo",
      "Plural ventures"
    ],
    correctAnswer: 1,
    explanation: "When two nouns share JOINT possession of the same entity, the apostrophe is attached ONLY to the last noun: 'Swadeep and Debangshu's joint venture'.",
    explanationBn: "যখন দুজন ব্যক্তি যৌথভাবে একটি জিনিসের মালিকানা বোঝায় (Joint Possession), তখন শুধুমাত্র শেষের নামের সাথে Apostrophe (`'s`) বসে: 'Swadeep and Debangshu's venture'।"
  },
  {
    id: 4,
    question: "If Swadeep and Debangshu own two SEPARATE, independent research laboratories, how should it be punctuated?",
    options: [
      "Swadeep and Debangshu's laboratories",
      "Swadeep's and Debangshu's laboratories",
      "Swadeeps and Debangshus laboratories",
      "Swadeep's and Debangshu laboratories"
    ],
    correctAnswer: 1,
    explanation: "When two or more nouns denote SEPARATE individual possessions, each noun takes its own apostrophe + 's': 'Swadeep's and Debangshu's laboratories'.",
    explanationBn: "যখন পৃথক পৃথক মালিকানা (Separate Possession) বোঝায়, তখন প্রত্যেকটি নামের সাথে আলাদাভাবে `'s` যুক্ত করতে হয়: 'Swadeep's and Debangshu's laboratories'।"
  },
  {
    id: 5,
    question: "Which of the following possessive expressions with INANIMATE OBJECTS is considered grammatically incorrect in formal English?",
    options: [
      "A day's leave",
      "The table's leg",
      "At arm's length",
      "Nature's fury"
    ],
    correctAnswer: 1,
    explanation: "Inanimate objects do not take the possessive apostrophe unless personified or denoting time, space, or weight. Instead of 'the table's leg', write 'the leg of the table'.",
    explanationBn: "জড়বস্তুর ক্ষেত্রে সাধারণভাবে Apostrophe (`'s`) ব্যবহার করা অশুদ্ধ (ব্যতিক্রম: সময়, দূরত্ব ও মানবোচিত রূপদান)। তাই 'the table's leg' না লিখে 'the leg of the table' লিখতে হবে।"
  },
  {
    id: 6,
    question: "In the sentence 'Sukanta Sir gave Abhronila a certificate', what case is 'Abhronila'?",
    options: [
      "Nominative (Subjective) Case",
      "Accusative (Direct Object) Case",
      "Dative (Indirect Object) Case",
      "Vocative Case"
    ],
    correctAnswer: 2,
    explanation: "'Abhronila' is the indirect recipient of the action (Indirect Object), which in classical grammar is the Dative Case.",
    explanationBn: "'Abhronila' হলো Indirect Object (যাকে দেওয়া হয়েছে), যা ব্যাকরণে Dative Case (সম্প্রদান কারক / অপ্রত্যক্ষ কর্ম) নামে পরিচিত।"
  },
  {
    id: 7,
    question: "In the sentence 'Students, listen carefully to the instructions', what case is 'Students'?",
    options: [
      "Nominative Case",
      "Vocative Case (Case of Address)",
      "Accusative Case",
      "Genitive Case"
    ],
    correctAnswer: 1,
    explanation: "'Students' is directly addressed or invoked by the speaker. It is in the Vocative Case (Case of Address).",
    explanationBn: "'Students' পদটি সম্বোধন করে বলা হয়েছে, তাই এটি Vocative Case (সম্বোধন পদ)।"
  },
  {
    id: 8,
    question: "What is the correct possessive form of the compound noun 'Sister-in-law'?",
    options: [
      "Sister's-in-law",
      "Sister-in-law's",
      "Sister's-in-law's",
      "Sisters'-in-law"
    ],
    correctAnswer: 1,
    explanation: "While the plural marker attaches to the head noun ('Sisters-in-law'), the possessive apostrophe is attached strictly to the LAST word of the compound: 'Sister-in-law's car'.",
    explanationBn: "Compound Noun-এর Plural করার সময় Head Noun-এ '-s' যুক্ত হলেও ('Sisters-in-law'), Possessive করার সময় সর্বদাই শেষ শব্দের সাথে `'s` যুক্ত হয়: 'Sister-in-law's car'।"
  },
  {
    id: 9,
    question: "Which of the following shows the correct distinction between 'It's' and 'Its'?",
    options: [
      "It's is a possessive pronoun; Its is a contraction for 'it is'.",
      "It's is a contraction for 'it is' or 'it has'; Its is the possessive pronoun with NO apostrophe.",
      "Both are interchangeable.",
      "Its is never used in English."
    ],
    correctAnswer: 1,
    explanation: "'It's' = Contraction for 'It is' or 'It has'. 'Its' = Possessive pronoun (e.g., 'The cat licked ITS paws'). Possessive pronouns never take an apostrophe (yours, hers, its, ours, theirs).",
    explanationBn: "'It's' হলো 'It is / It has'-এর সংক্ষিপ্ত রূপ। আর 'Its' হলো Possessive Pronoun (এতে কোনো অপোস্ট্রফি বসে না)।"
  },
  {
    id: 10,
    question: "What is the correct possessive form for a classical proper noun ending in 's' like 'Keats'?",
    options: [
      "Keats' poetry",
      "Keats's poetry",
      "Both A and B are standard and accepted",
      "Keat's poetry"
    ],
    correctAnswer: 2,
    explanation: "For singular proper names ending in '-s', modern English permits either 'Keats's' (pronouncing the extra syllable /kiz/) or traditional 'Keats''. Both are standard.",
    explanationBn: "যেসব Proper Noun-এর শেষে '-s' থাকে, সেগুলোর ক্ষেত্রে আধুনিক ইংরেজিতে 'Keats's' এবং ঐতিহ্যগতভাবে 'Keats'' উভয় রূপই ব্যাকরণসম্মত।"
  },
  {
    id: 11,
    question: "In the sentence 'Tuhina, my sister's friend, visited Barrackpore', what case is 'my sister's friend'?",
    options: [
      "Noun in Apposition to the Nominative Subject 'Tuhina'",
      "Objective Case",
      "Vocative Case",
      "Dative Case"
    ],
    correctAnswer: 0,
    explanation: "'My sister's friend' is placed directly next to the subject 'Tuhina' to describe and rename her. It is a Noun Phrase in Apposition in the Nominative Case.",
    explanationBn: "'My sister's friend' পদটি Subject 'Tuhina'-র পরিচয় স্পষ্ট করতে পাশে বসেছে, তাই এটি Noun in Apposition (সমানাধিকরণ পদ)।"
  },
  {
    id: 12,
    question: "What is the feminine counterpart of the noun 'Duke'?",
    options: [
      "Dukess",
      "Duchess",
      "Dukette",
      "Dame"
    ],
    correctAnswer: 1,
    explanation: "'Duke' (Masculine) $\\rightarrow$ 'Duchess' (Feminine).",
    explanationBn: "'Duke'-এর Feminine Gender হলো 'Duchess'।"
  },
  {
    id: 13,
    question: "Which of the following is a COMMON GENDER noun (can refer to either male or female)?",
    options: [
      "Doctor",
      "Teacher",
      "Cousin",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Doctor, Teacher, Cousin, Child, Parent, Student, and Neighbor are Common Gender nouns denoting either sex.",
    explanationBn: "Doctor, Teacher, Cousin, Student—যেসব শব্দ পুরুষ ও মহিলা উভয়কেই বোঝায়, সেগুলোকে Common Gender (উভয়লিঙ্গ) বলে।"
  },
  {
    id: 14,
    question: "What is the feminine counterpart of 'Monk'?",
    options: [
      "Monkess",
      "Nun",
      "Priestess",
      "Sister"
    ],
    correctAnswer: 1,
    explanation: "'Monk' (Masculine religious ascetic) $\\rightarrow$ 'Nun' (Feminine religious ascetic).",
    explanationBn: "'Monk'-এর Feminine Gender হলো 'Nun'।"
  },
  {
    id: 15,
    question: "In the phrase 'At a stone's throw from the Barrackpore railway station', why is the apostrophe grammatically valid on 'stone'?",
    options: [
      "Because stone is personified as a human.",
      "Because idiomatic expressions of distance and space permit the possessive apostrophe on inanimate nouns.",
      "Because stone is a living entity.",
      "It is a spelling exception."
    ],
    correctAnswer: 1,
    explanation: "Standard English explicitly permits the genitive apostrophe on inanimate nouns in idiomatic measures of space, distance, and time (e.g., 'a stone's throw', 'a boat's length', 'a month's holiday').",
    explanationBn: "দূরত্ব, স্থান ও সময়ের পরিমাপক প্রবাদপ্রতিম ব্যবহারে জড়বস্তুতেও Apostrophe গ্রাহ্য: 'a stone's throw', 'a week's holiday'।"
  },
  {
    id: 16,
    question: "What is the feminine counterpart of 'Bachelor'?",
    options: [
      "Bachelorette",
      "Spinster / Maid",
      "Widow",
      "Both A and B"
    ],
    correctAnswer: 3,
    explanation: "Traditional formal counterpart is 'Spinster' or 'Maid', while modern colloquial English also recognizes 'Bachelorette'.",
    explanationBn: "'Bachelor'-এর ঐতিহ্যগত Feminine হলো 'Spinster' এবং আধুনিক রূপ 'Bachelorette'।"
  },
  {
    id: 17,
    question: "What is the correct possessive for two individuals: 'Men's and women's rights'?",
    options: [
      "Men and women's rights",
      "Men's and women's rights",
      "Mens and womens rights",
      "Men's and women rights"
    ],
    correctAnswer: 1,
    explanation: "Since men and women represent distinct categories with separate rights, both irregular plurals take their own apostrophe: 'Men's and women's rights'.",
    explanationBn: "পুরুষ ও মহিলাদের অধিকার পৃথক শ্রেণির হওয়ায় উভয় irregular plural-এ আলাদাভাবে `'s` বসে: 'Men's and women's rights'।"
  },
  {
    id: 18,
    question: "What is the feminine of 'Wizard'?",
    options: [
      "Wizardess",
      "Witch",
      "Warlock",
      "Sorceress"
    ],
    correctAnswer: 1,
    explanation: "'Wizard' (Masculine practitioner of magic) $\\rightarrow$ 'Witch' (Feminine practitioner of magic).",
    explanationBn: "'Wizard'-এর Feminine Gender হলো 'Witch'।"
  },
  {
    id: 19,
    question: "In 'He stayed at his uncle's', what noun is omitted after the possessive 'uncle's'?",
    options: [
      "person",
      "house / residence",
      "office",
      "car"
    ],
    correctAnswer: 1,
    explanation: "The noun 'house', 'shop', 'clinic', or 'church' is frequently omitted after a genitive when the location is obvious: 'at his uncle's [house]', 'at the chemist's [shop]'.",
    explanationBn: "বাসস্থান বা দোকান স্পষ্ট থাকলে Genitive-এর পর 'house' বা 'shop' উহ্য থাকে: 'at his uncle's [house]', 'at the chemist's [shop]'।"
  },
  {
    id: 20,
    question: "What is the feminine counterpart of 'Fox'?",
    options: [
      "Foxess",
      "Vixen",
      "She-fox",
      "Bitch"
    ],
    correctAnswer: 1,
    explanation: "'Fox' (Masculine) $\\rightarrow$ 'Vixen' (Feminine).",
    explanationBn: "'Fox'-এর Feminine Gender হলো 'Vixen'।"
  },
  {
    id: 21,
    question: "What is the gender of inanimate objects personified for STRENGTH, VIOLENCE, or POWER (e.g., The Sun, Summer, Winter, Time, Death)?",
    options: [
      "Neuter Gender",
      "Masculine Gender",
      "Feminine Gender",
      "Common Gender"
    ],
    correctAnswer: 1,
    explanation: "When personified, objects remarkable for strength and fierceness are traditionally treated as Masculine: 'The Sun sheds HIS beams'; 'Death lays HIS icy hand on kings'.",
    explanationBn: "শক্তি, তেজ বা উগ্রতার প্রতীক জড়বস্তুকে Personify করলে ঐতিহ্যগতভাবে Masculine ধরা হয়: 'The Sun sheds HIS beams', 'Death lays HIS hand'।"
  },
  {
    id: 22,
    question: "What is the gender of personified objects remarkable for BEAUTY, GENTLENESS, and GRACE (e.g., The Moon, The Earth, Spring, Nature, Liberty, Peace)?",
    options: [
      "Masculine Gender",
      "Feminine Gender",
      "Neuter Gender",
      "Common Gender"
    ],
    correctAnswer: 1,
    explanation: "Objects celebrated for gentleness and beauty are personified as Feminine: 'The Moon hid HER face behind the clouds'; 'Spring spreads HER green mantle'.",
    explanationBn: "সৌন্দর্য ও কোমলতার প্রতীক জড়বস্তুকে Personify করলে Feminine ধরা হয়: 'The Moon hid HER face', 'Spring spreads HER mantle'।"
  },
  {
    id: 23,
    question: "In the sentence 'Swadeep broke the window of the classroom', why is 'the window of the classroom' preferred over 'the classroom's window'?",
    options: [
      "Because classroom is a plural noun.",
      "Because inanimate non-personified objects strictly prefer the 'of' prepositional genitive construction.",
      "Because window must come first.",
      "Because classroom is capitalized."
    ],
    correctAnswer: 1,
    explanation: "Inanimate nouns generally form the possessive relationship using the preposition 'of': 'the window of the classroom', 'the cover of the book'.",
    explanationBn: "জড়বস্তুর ক্ষেত্রে `'s` ব্যবহারের চেয়ে 'of' যুক্ত গঠন মানসম্মত: 'the window of the classroom', 'the cover of the book'।"
  },
  {
    id: 24,
    question: "What is the feminine of 'Stallion' (an adult male horse)?",
    options: [
      "Filly",
      "Mare",
      "Colt",
      "Ewe"
    ],
    correctAnswer: 1,
    explanation: "'Stallion' (Adult male horse) $\\rightarrow$ 'Mare' (Adult female horse). ('Colt' = young male; 'Filly' = young female).",
    explanationBn: "'Stallion'-এর Feminine Gender হলো 'Mare'।"
  },
  {
    id: 25,
    question: "Why is mastering Noun Cases and Possessive Apostrophe rules vital for professional writing and competitive exams?",
    options: [
      "Because apostrophe errors (like 'it's' vs 'its' and misplaced plural apostrophes) are the most penalized punctuation defects in essays, legal documents, and exams.",
      "Because cases replace verbs entirely.",
      "Because English only has one case.",
      "Because apostrophes are decorative."
    ],
    correctAnswer: 0,
    explanation: "Possessive apostrophe errors (especially 'its vs it's' and plural apostrophes) severely compromise professional credibility and are heavily tested in competitive sentence correction sections.",
    explanationBn: "Possessive Apostrophe-এর সঠিক প্রয়োগ ('its' বনাম 'it's', 'boys'' বনাম 'boy's') আইনি চুক্তি, পেশাদার লেখা এবং প্রতিযোগিতামূলক পরীক্ষায় সর্বাধিক যাচাইকৃত বিষয়।"
  }
];

export default questions;
