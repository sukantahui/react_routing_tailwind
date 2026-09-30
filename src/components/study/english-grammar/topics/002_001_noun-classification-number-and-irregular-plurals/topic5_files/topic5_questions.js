// topic5_questions.js
// Module 002_001 - Topic 5: Formation of Regular Plurals (-s, -es, -ies, -ves)

const questions = [
  {
    id: 1,
    question: "What is the correct plural form of 'monarch' (where '-ch' sounds like /k/)?",
    options: [
      "monarchs",
      "monarches",
      "monarchies",
      "monarch's"
    ],
    correctAnswer: 0,
    explanation: "When '-ch' is pronounced with the /k/ sound (monarch, stomach), only '-s' is appended (monarchs, stomachs).",
    explanationBn: "যখন '-ch'-এর উচ্চারণ /k/ (ক)-এর মতো হয়, তখন শুধু '-s' যোগ হয় (monarchs, stomachs)।"
  },
  {
    id: 2,
    question: "Which of the following nouns ending in '-o' takes ONLY '-s' to form its plural?",
    options: [
      "Photo",
      "Hero",
      "Potato",
      "Tomato"
    ],
    correctAnswer: 0,
    explanation: "'Photo' (abbreviation for photograph) and musical terms like 'piano' take only '-s' (photos, pianos), unlike heroes, potatoes, and tomatoes which take '-es'.",
    explanationBn: "'Photo' এবং 'piano'-এর মতো শব্দে শুধু '-s' যুক্ত হয় (photos, pianos)।"
  },
  {
    id: 3,
    question: "What is the plural of 'story' (narrative tale) vs 'storey' (floor of a building)?",
    options: [
      "stories / storeys",
      "storys / stories",
      "stories / stories",
      "storyes / storeyes"
    ],
    correctAnswer: 0,
    explanation: "Consonant + 'y' mutates to '-ies' (story -> stories). Vowel + 'y' retains 'y' and adds '-s' (storey -> storeys).",
    explanationBn: "Consonant + 'y' হলে '-ies' (stories) হয়; কিন্তু Vowel + 'y' হলে শুধু '-s' যুক্ত হয় (storeys)।"
  },
  {
    id: 4,
    question: "Which of the following words ending in '-f' correctly takes ONLY '-s'?",
    options: [
      "Chief -> Chiefs",
      "Thief -> Thieffs",
      "Leaf -> Leafs",
      "Calf -> Calfs"
    ],
    correctAnswer: 0,
    explanation: "'Chief', 'roof', 'cliff', and 'belief' take only '-s' (chiefs, roofs, cliffs, beliefs), while thief/leaf/calf mutate to -ves.",
    explanationBn: "'Chief', 'roof', 'cliff', 'belief'-এর শেষে শুধু '-s' বসে (chiefs, roofs, cliffs, beliefs)।"
  },
  {
    id: 5,
    question: "What is the plural of 'quiz'?",
    options: [
      "quizzes",
      "quizs",
      "quizes",
      "quizies"
    ],
    correctAnswer: 0,
    explanation: "Single vowel + single consonant 'z' doubles the final 'z' before adding '-es' (quiz -> quizzes).",
    explanationBn: "Quiz শব্দে 'z' দ্বিগুণ হয়ে 'quizzes' গঠিত হয়।"
  },
  {
    id: 6,
    question: "Which pair is incorrectly pluralized?",
    options: [
      "safe -> saves",
      "knife -> knives",
      "wife -> wives",
      "wolf -> wolves"
    ],
    correctAnswer: 0,
    explanation: "The noun 'safe' (a strong metal container for valuables) forms its plural with '-s' (safes). 'Saves' is a 3rd-person singular verb.",
    explanationBn: "নিরাপদ লকার বা সিন্দুক অর্থে Noun 'safe'-এর বহুবচন হলো 'safes' (saves নয়)।"
  },
  {
    id: 7,
    question: "Select the correct plural of 'monkey':",
    options: [
      "monkeys",
      "monkies",
      "monkeyes",
      "monkeies"
    ],
    correctAnswer: 0,
    explanation: "Since 'y' is preceded by vowel 'e' (vowel + y), simply add '-s' (monkeys, donkeys, turkeys).",
    explanationBn: "Vowel 'e' এর পর 'y' থাকায় কেবল '-s' যুক্ত হয়ে 'monkeys' গঠিত হয়।"
  },
  {
    id: 8,
    question: "What is the plural form of 'stomach'?",
    options: [
      "stomachs",
      "stomaches",
      "stomachies",
      "stomaques"
    ],
    correctAnswer: 0,
    explanation: "Pronounced with /k/ sound at the end, so it takes '-s' -> 'stomachs'.",
    explanationBn: "'Stomach' শব্দের শেষে /k/ ধ্বনি থাকায় শুধু '-s' যুক্ত হয়ে 'stomachs' হয়।"
  },
  {
    id: 9,
    question: "Which noun allows BOTH '-s' and '-ves' in standard modern English?",
    options: [
      "Dwarf (dwarfs / dwarves)",
      "Cat (cats / catves)",
      "Book (books / bookves)",
      "Pen (pens / penves)"
    ],
    correctAnswer: 0,
    explanation: "'Dwarf', 'scarf', 'wharf', and 'hoof' accept both regular '-s' and mutated '-ves' (dwarfs/dwarves, scarfs/scarves, hoofs/hooves).",
    explanationBn: "'Dwarf' শব্দের বহুবচনে 'dwarfs' এবং 'dwarves' উভয় রূপই ব্যাকরণগতভাবে মান্য।"
  },
  {
    id: 10,
    question: "Choose the sentence with correct plural spelling throughout:",
    options: [
      "The heroes carried loaves of bread and sharp knives to the cliffs.",
      "The heros carried loafs of bread and sharp knifes to the cliffs.",
      "The heroes carried loaves of bread and sharp knifes to the scarves.",
      "The heroes carried loafes of bread and sharp knives to the clieves."
    ],
    correctAnswer: 0,
    explanation: "Heroes (-es), loaves (-ves), knives (-ves), and cliffs (-s) are all 100% orthographically correct.",
    explanationBn: "Heroes, loaves, knives এবং cliffs—প্রতিটি বানান সম্পূর্ণ শুদ্ধ।"
  }
];

export default questions;
