// topic2_questions.js
// Module 002_001 - Topic 2: Countable vs Uncountable (Mass) Nouns

const questions = [
  {
    id: 1,
    question: "Which of the following is an UNCOUNTABLE (Mass) noun in standard English?",
    options: ["Equipment", "Chair", "Bottle", "Coin"],
    correctAnswer: 0,
    explanation: "'Equipment' is an uncountable mass noun and never takes a plural '-s' or indefinite article 'an'. ('Chair', 'Bottle', and 'Coin' are countable).",
    explanationBn: "'Equipment' (সরঞ্জাম) একটি Uncountable Mass Noun, এর সাথে কখনোই 's' যুক্ত হয় না বা 'an' বসে না।"
  },
  {
    id: 2,
    question: "How can the uncountable noun 'Information' be expressed as a single individual unit?",
    options: [
      "A piece of information",
      "An information",
      "One information",
      "Informations"
    ],
    correctAnswer: 0,
    explanation: "To individualize uncountable mass nouns, a partitive classifier must be used (e.g. 'a piece of information', 'an item of information').",
    explanationBn: "Uncountable Noun-কে একক গণনায় প্রকাশ করতে Partitive Classifier ব্যবহার করতে হয় (যেমন: 'a piece of information')।"
  },
  {
    id: 3,
    question: "Which quantifying determiner pairs correctly with COUNTABLE plural nouns?",
    options: ["Many / Few", "Much / Little", "Less / Little", "A little"],
    correctAnswer: 0,
    explanation: "'Many' and 'Few' modify countable nouns (many books, few students). 'Much' and 'Little' modify uncountable nouns (much water, little sugar).",
    explanationBn: "'Many' এবং 'Few' বসে Countable Noun-এর পূর্বে; 'Much' এবং 'Little' বসে Uncountable Noun-এর পূর্বে।"
  },
  {
    id: 4,
    question: "Select the sentence with correct quantifier and noun harmony:",
    options: [
      "She has much knowledge about English linguistic history.",
      "She has many knowledges about English linguistic history.",
      "She has few knowledge about English linguistic history.",
      "She has a knowledge about English linguistic history."
    ],
    correctAnswer: 0,
    explanation: "'Knowledge' is uncountable and takes 'much' or 'a lot of', never 'many' or plural 'knowledges'.",
    explanationBn: "'Knowledge' একটি Uncountable Noun, তাই এর সাথে 'much knowledge' বসবে।"
  },
  {
    id: 5,
    question: "Why is 'I bought two breads from the bakery' considered non-standard in British & Indian English examinations?",
    options: [
      "Because 'bread' is an uncountable mass noun; standard English requires 'two loaves of bread' or 'two slices of bread'.",
      "Because 'bakery' cannot sell bread.",
      "Because 'two' is an unlucky number.",
      "Because 'bought' should be 'buyed'."
    ],
    correctAnswer: 0,
    explanation: "'Bread' is an uncountable noun. To quantify it, use unit counters like 'loaves of bread' or 'slices of bread'.",
    explanationBn: "'Bread' (পাউরুটি) Uncountable, তাই দুটি পাউরুটি বোঝাতে 'two loaves of bread' বলতে হয়।"
  },
  {
    id: 6,
    question: "Which of the following nouns can function as BOTH countable and uncountable with a shift in meaning?",
    options: [
      "Paper (Uncountable material vs Countable newspaper/document)",
      "Light (Uncountable energy vs Countable lamp/bulb)",
      "Hair (Uncountable full head of hair vs Countable individual strands)",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Many nouns shift meaning between mass substance (uncountable) and discrete instances/objects (countable): paper/a paper, hair/two hairs, light/a light.",
    explanationBn: "Paper (কাগজ / সংবাদপত্র), Light (আলো / বাতি), Hair (মাথার চুল / কয়েকটি পশম) সবগুলোই অর্থভেদে Countable ও Uncountable উভয়ই হতে পারে।"
  },
  {
    id: 7,
    question: "Identify the grammatically correct sentence regarding 'luggage':",
    options: [
      "The passengers left their luggage at the security counter.",
      "The passengers left their luggages at the security counter.",
      "The passengers left a luggage at the security counter.",
      "The passenger bought three luggages."
    ],
    correctAnswer: 0,
    explanation: "'Luggage' (and 'baggage') is strictly uncountable and never takes plural '-s' or 'a/an'.",
    explanationBn: "'Luggage' সর্বদাই Uncountable, তাই 'luggages' ভুল, শুদ্ধ হলো 'luggage' বা 'pieces of luggage'।"
  },
  {
    id: 8,
    question: "What is the rule regarding indefinite articles ('a' / 'an') before pure uncountable nouns?",
    options: [
      "Indefinite articles 'a/an' can NEVER be placed directly before uncountable nouns without a partitive classifier.",
      "They are always mandatory.",
      "They can be used if the sentence is negative.",
      "They are optional."
    ],
    correctAnswer: 0,
    explanation: "Uncountable nouns cannot be counted as single discrete units (e.g. 'an advice' [Wrong] -> 'a piece of advice' [Correct]).",
    explanationBn: "Uncountable Noun-এর পূর্বে সরাসরি 'a' বা 'an' বসানো যায় না ('an advice' ভুল -> 'a piece of advice' শুদ্ধ)।"
  },
  {
    id: 9,
    question: "In which sentence is 'coffee' used as a COUNTABLE noun via contextual metonymy (ordering cups)?",
    options: [
      "We ordered two coffees at the café.",
      "Coffee grows abundantly in the Nilgiri hills.",
      "I love the rich aroma of roasted coffee.",
      "Coffee contains caffeine."
    ],
    correctAnswer: 0,
    explanation: "In restaurant/conversational English, 'two coffees' is an acceptable countable shortening for 'two cups of coffee'.",
    explanationBn: "রেস্তোরাঁয় বা কথোপকথনে 'two coffees' মানে 'two cups of coffee' (Countable ব্যবহার)।"
  },
  {
    id: 10,
    question: "Which of the following mass nouns takes a SINGULAR verb in concord?",
    options: ["Furniture", "Information", "Scenery", "All of the above"],
    correctAnswer: 3,
    explanation: "All uncountable mass nouns (Furniture, Information, Scenery, Advice, Luggage) strictly govern singular verbs (e.g. 'The scenery IS breathtaking').",
    explanationBn: "সমস্ত Uncountable Mass Noun (Furniture, Information, Scenery) সর্বদা Singular Verb গ্রহণ করে।"
  }
];

export default questions;
