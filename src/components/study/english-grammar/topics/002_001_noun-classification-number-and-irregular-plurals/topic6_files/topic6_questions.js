// topic6_questions.js
// Module 002_001 - Topic 6: Irregular Plural Mutations

const questions = [
  {
    id: 1,
    question: "What is the plural of 'goose' and 'louse'?",
    options: [
      "geese / lice",
      "gooses / louses",
      "geese / louses",
      "gooses / lice"
    ],
    correctAnswer: 0,
    explanation: "Both words undergo historical internal vowel mutation (Umlaut): goose -> geese, louse -> lice.",
    explanationBn: "Goose-এর বহুবচন Geese এবং Louse-এর বহুবচন Lice (স্বরবর্ণ রূপান্তরের মাধ্যমে গঠিত)।"
  },
  {
    id: 2,
    question: "Which of the following nouns has an IDENTICAL form in both singular and plural (Zero-plural)?",
    options: [
      "Sheep",
      "Goat",
      "Cow",
      "Horse"
    ],
    correctAnswer: 0,
    explanation: "'Sheep', 'deer', 'aircraft', and 'species' maintain identical spelling in singular and plural ('one sheep', 'five sheep').",
    explanationBn: "'Sheep' একবচন ও বহুবচনে একই রূপ ধারণ করে ('one sheep', 'ten sheep')।"
  },
  {
    id: 3,
    question: "What is the difference between 'brothers' and 'brethren'?",
    options: [
      "'Brothers' means sons of the same parents; 'brethren' means fellow members of a society or religious community.",
      "'Brethren' is the old singular; 'brothers' is the plural.",
      "'Brothers' is informal; 'brethren' is strictly British.",
      "They are 100% interchangeable in all contexts."
    ],
    correctAnswer: 0,
    explanation: "'Brothers' denotes biological male siblings; 'brethren' denotes members of a fraternal guild, sect, or community.",
    explanationBn: "'Brothers' রক্তের সম্পর্কের ভাইদের বোঝায়; 'brethren' কোনো ধর্মীয় সম্প্রদায় বা সমাজের সদস্যদের বোঝায়।"
  },
  {
    id: 4,
    question: "Identify the correct plural of 'ox' and 'child':",
    options: [
      "oxen / children",
      "oxes / childs",
      "oxen / childs",
      "oxes / children"
    ],
    correctAnswer: 0,
    explanation: "Both preserve the archaic Old English plural suffix '-en' / '-ren' (ox -> oxen, child -> children).",
    explanationBn: "Ox-এর বহুবচন Oxen এবং Child-এর বহুবচন Children (প্রাচীন ইংরেজি -en অনুসর্গ)।"
  },
  {
    id: 5,
    question: "When is the plural 'fishes' grammatically appropriate?",
    options: [
      "When referring to multiple distinct species or varieties of fish.",
      "Whenever there are more than 10 fish.",
      "Never; 'fishes' does not exist in English.",
      "Only when the fish are cooked."
    ],
    correctAnswer: 0,
    explanation: "'Fish' is the standard plural for multiple fish of the same kind. 'Fishes' specifically denotes different species/taxa of fish.",
    explanationBn: "একই প্রজাতির অনেক মাছ হলে 'fish'; কিন্তু বিভিন্ন ভিন্ন প্রজাতির মাছ বোঝাতে 'fishes' ব্যবহার করা হয়।"
  },
  {
    id: 6,
    question: "Choose the sentence with correct subject-verb concord:",
    options: [
      "Ten sheep are grazing peacefully in the meadow.",
      "Ten sheeps are grazing peacefully in the meadow.",
      "Ten sheep is grazing peacefully in the meadow.",
      "A sheep are grazing peacefully in the meadow."
    ],
    correctAnswer: 0,
    explanation: "'Ten sheep' is plural, so it takes the plural verb 'are'. (Never add '-s' to sheep: *sheeps is wrong).",
    explanationBn: "'Ten sheep' বহুবচন হওয়ায় Plural Verb 'are' বসবে ('sheeps' লেখা সম্পূর্ণ ভুল)।"
  },
  {
    id: 7,
    question: "What is the plural form of 'mouse' when referring to a computer peripheral device?",
    options: [
      "Both 'mice' and 'mouses' are accepted in modern usage (mice is standard).",
      "Only 'mouses' is accepted.",
      "Only 'mousies' is accepted.",
      "Mouse cannot be pluralized."
    ],
    correctAnswer: 0,
    explanation: "In tech usage, 'computer mice' is most common, though 'computer mouses' is also recognized in tech style guides.",
    explanationBn: "কম্পিউটারের মাউসের ক্ষেত্রে 'mice' সর্বাধিক প্রচলিত, তবে 'mouses'-ও স্বীকৃত।"
  },
  {
    id: 8,
    question: "What is the plural of 'aircraft'?",
    options: [
      "aircraft",
      "aircrafts",
      "aircraftes",
      "aircraves"
    ],
    correctAnswer: 0,
    explanation: "'Aircraft', 'spacecraft', and 'hovercraft' are zero-plurals and never take '-s' ('three supersonic aircraft').",
    explanationBn: "'Aircraft' শব্দটির বহুবচন 'aircraft' (কখনো 'aircrafts' হবে না)।"
  },
  {
    id: 9,
    question: "Select the group where ALL words form plurals via internal vowel change:",
    options: [
      "Foot, Tooth, Goose, Man, Mouse",
      "Child, Ox, Brother, Sister",
      "Sheep, Deer, Fish, Trout",
      "Baby, City, Lady, Fly"
    ],
    correctAnswer: 0,
    explanation: "Foot (feet), Tooth (teeth), Goose (geese), Man (men), Mouse (mice) all undergo internal root vowel mutation.",
    explanationBn: "Foot, Tooth, Goose, Man, Mouse—সবগুলোই ভেতরের স্বরবর্ণ পরিবর্তনের মাধ্যমে বহুবচন গঠন করে।"
  },
  {
    id: 10,
    question: "Identify the incorrect pluralization in: 'The hunters spotted three deers and five wolves in the forest.'",
    options: [
      "'Deers' is incorrect; the plural of 'deer' is 'deer'.",
      "'Wolves' is incorrect; it should be 'wolfs'.",
      "'Hunters' should be 'hunter'.",
      "No error."
    ],
    correctAnswer: 0,
    explanation: "'Deer' is an invariable zero-plural noun; its plural is always 'deer' (never *deers).",
    explanationBn: "'Deer'-এর বহুবচন সর্বদা 'deer', তাই 'three deers' ভুল—সঠিক রূপ হলো 'three deer'।"
  }
];

export default questions;
