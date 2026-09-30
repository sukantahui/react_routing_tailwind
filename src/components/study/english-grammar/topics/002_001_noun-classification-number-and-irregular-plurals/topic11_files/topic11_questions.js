// topic11_questions.js
// Module 002_001 - Topic 11: Classroom Dialogue & Module Diagnostic Practice Lab

const questions = [
  {
    id: 1,
    question: "Identify the erroneous part in: 'The furnitures (A) in the hall (B) were (C) damaged by fire (D).'",
    options: [
      "Part A ('The furnitures' should be 'The furniture' and Part C 'were' should be 'was')",
      "Part B ('in the hall')",
      "Part D ('damaged by fire')",
      "No error"
    ],
    correctAnswer: 0,
    explanation: "'Furniture' is an uncountable noun that cannot take '-s' and governs singular verb 'was' ('The furniture in the hall was damaged').",
    explanationBn: "'Furniture' সর্বদা Uncountable Singular Noun, তাই 'furnitures were' সম্পূর্ণ ভুল; শুদ্ধ রূপ হলো 'furniture was'।"
  },
  {
    id: 2,
    question: "Select the sentence with zero grammatical defects:",
    options: [
      "He bought two loaves of bread and five pieces of stationery for his office.",
      "He bought two breads and five stationeries for his office.",
      "He bought two loaf of bread and five stationeries for his office.",
      "He bought two breads and five stationery items."
    ],
    correctAnswer: 0,
    explanation: "'Bread' and 'stationery' are uncountable mass nouns quantified properly by partitives 'loaves of bread' and 'pieces of stationery'.",
    explanationBn: "'Bread' এবং 'stationery' Uncountable হওয়ায় 'two loaves of bread' ও 'five pieces of stationery' একদম নির্ভুল।"
  },
  {
    id: 3,
    question: "Spot the error: 'The police has caught (A) the burglar (B) red-handed (C) last night (D).'",
    options: [
      "Part A ('has caught' is wrong; 'police' is a plural noun and past tense requires 'caught' or 'have caught')",
      "Part B ('the burglar')",
      "Part C ('red-handed')",
      "Part D ('last night')"
    ],
    correctAnswer: 0,
    explanation: "'Police' is pluralia tantum and cannot take singular 'has'. For specific past time 'last night', simple past 'caught' (or plural 'have caught') is required.",
    explanationBn: "'Police' সর্বদা Plural Noun, তাই Singular Verb 'has' ভুল।"
  },
  {
    id: 4,
    question: "Choose the correct sentence regarding foreign plurals:",
    options: [
      "All these scientific criteria were thoroughly verified before publishing the data.",
      "All these scientific criterias were thoroughly verified before publishing the datas.",
      "All this scientific criteria was thoroughly verified before publishing the data.",
      "All these scientific criterion was thoroughly verified."
    ],
    correctAnswer: 0,
    explanation: "'Criteria' and 'data' are classical Latin/Greek plurals. 'These criteria were' is 100% grammatically immaculate.",
    explanationBn: "'Criteria' এবং 'data' বহুবচন, তাই 'All these scientific criteria were' সঠিক।"
  },
  {
    id: 5,
    question: "Which of the following compound plurals is INCORRECT?",
    options: [
      "Passer-bies (Incorrect; should be Passers-by)",
      "Sons-in-law",
      "Commanders-in-chief",
      "Men-servants"
    ],
    correctAnswer: 0,
    explanation: "In 'Passer-by', the head word is 'Passer', forming 'Passers-by'. 'Passer-bies' is non-existent in English.",
    explanationBn: "'Passer-by'-এর সঠিক বহুবচন হলো 'Passers-by' ('Passer-bies' নয়)।"
  },
  {
    id: 6,
    question: "Fill in the blanks: 'The jury _______ divided in _______ verdicts regarding the accused.'",
    options: [
      "were, their",
      "was, its",
      "was, their",
      "were, its"
    ],
    correctAnswer: 0,
    explanation: "When members of a collective body disagree, it acts as a Noun of Multitude, requiring plural verb 'were' and plural pronoun 'their'.",
    explanationBn: "সদস্যদের মধ্যে মতভেদ থাকায় 'were' (Plural Verb) এবং 'their' (Plural Pronoun) বসবে।"
  },
  {
    id: 7,
    question: "What is the correct plural of 'radius', 'oasis', and 'stratum'?",
    options: [
      "radii, oases, strata",
      "radiuses, oasises, stratums",
      "radia, oasia, strati",
      "radiis, oasies, stratas"
    ],
    correctAnswer: 0,
    explanation: "Radius -> Radii (-us to -i), Oasis -> Oases (-is to -es), Stratum -> Strata (-um to -a).",
    explanationBn: "Radius -> Radii, Oasis -> Oases, এবং Stratum -> Strata নিয়মমাফিক সঠিক।"
  },
  {
    id: 8,
    question: "Identify the sentence that displays correct concord with disciplines:",
    options: [
      "His physics is good, but his mathematics are weak.",
      "His physics are good, but his mathematics is weak.",
      "Physics are an interesting science.",
      "Mathematics are a tough subject."
    ],
    correctAnswer: 0,
    explanation: "'His mathematics are weak' refers to calculation abilities (plural), while 'His physics are/is' can refer to conceptual mastery.",
    explanationBn: "গণনার হিসাব বা দক্ষতা অর্থে 'his mathematics are' ব্যবহৃত হয়।"
  },
  {
    id: 9,
    question: "Which of the following is an invariable zero-plural noun?",
    options: [
      "Aircraft",
      "Airport",
      "Airplane",
      "Airline"
    ],
    correctAnswer: 0,
    explanation: "'Aircraft' (and spacecraft) retains the identical spelling in both singular and plural ('one aircraft', 'ten aircraft').",
    explanationBn: "'Aircraft' একবচন ও বহুবচনে একই রূপ ধারণ করে।"
  },
  {
    id: 10,
    question: "Select the sentence with accurate usage of 'hair':",
    options: [
      "Her hair is jet black, but she found two grey hairs on her temple.",
      "Her hairs are jet black, but she found two grey hair on her temple.",
      "Her hair are jet black, but she found two grey hairs.",
      "Her hairs is jet black, but she found two grey hairs."
    ],
    correctAnswer: 0,
    explanation: "The complete mass of hair is uncountable ('hair is black'), while individual detached strands are countable ('two grey hairs').",
    explanationBn: "মাথার সম্পূর্ণ চুল অর্থে 'hair is' (Uncountable); আলাদা দুটো পাকা চুল অর্থে 'two grey hairs' (Countable)।"
  }
];

export default questions;
