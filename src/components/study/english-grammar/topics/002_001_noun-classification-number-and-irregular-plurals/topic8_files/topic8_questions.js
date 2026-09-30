// topic8_questions.js
// Module 002_001 - Topic 8: Pluralia Tantum & Nouns Existing Only in Plural Form

const questions = [
  {
    id: 1,
    question: "Choose the correct verbs for both sentences:\n1. The scissors _______ sharp.\n2. A pair of scissors _______ on the table.",
    options: [
      "are, is",
      "is, is",
      "are, are",
      "is, are"
    ],
    correctAnswer: 0,
    explanation: "'Scissors' is a pluralia tantum and takes plural verb 'are'. But with 'A pair of scissors', the true subject head noun is singular 'A pair', governing singular verb 'is'.",
    explanationBn: "শুধু 'Scissors' থাকলে Plural Verb ('are') বসে; কিন্তু 'A pair of scissors' থাকলে মূল Subject 'A pair' (একবচন) হওয়ায় 'is' বসে।"
  },
  {
    id: 2,
    question: "Which of the following sentences with 'cattle' is grammatically correct?",
    options: [
      "The cattle are grazing in the lush pasture.",
      "The cattles are grazing in the lush pasture.",
      "The cattle is grazing in the lush pasture.",
      "A cattle is grazing in the lush pasture."
    ],
    correctAnswer: 0,
    explanation: "'Cattle' is singular in form but strictly plural in meaning and concord. It NEVER takes '-s' (*cattles is wrong) and always takes a plural verb ('are').",
    explanationBn: "'Cattle' রূপগতভাবে একবচনের মতো দেখালেও এটি সর্বদা Plural এবং Plural Verb 'are' গ্রহণ করে ('cattles' সম্পূর্ণ ভুল)।"
  },
  {
    id: 3,
    question: "Select the sentence with correct verb concord:",
    options: [
      "His spectacles have been broken during the match.",
      "His spectacle has been broken during the match.",
      "His spectacles has been broken during the match.",
      "A spectacles is broken."
    ],
    correctAnswer: 0,
    explanation: "'Spectacles' (eyeglasses) is a pluralia tantum noun governing the plural verb 'have been broken'.",
    explanationBn: "চশমা অর্থে 'Spectacles' সর্বদা Plural এবং 'have been broken' গ্রহণ করে।"
  },
  {
    id: 4,
    question: "Fill in the blank: 'The gentry of the district _______ present at the civic banquet.'",
    options: [
      "were",
      "was",
      "is",
      "has been"
    ],
    correctAnswer: 0,
    explanation: "'Gentry' (the elite/upper-class people) is an invariable plural noun requiring the plural verb 'were'.",
    explanationBn: "'Gentry' (ভদ্রলোক বা উচ্চশ্রেণি) সর্বদা Plural Noun, তাই Plural Verb 'were' বসবে।"
  },
  {
    id: 5,
    question: "Identify the error in: 'The proceeds of the charity concert was donated to the hospital.'",
    options: [
      "'Was' is incorrect; 'proceeds' (financial earnings/yield) is a plural noun and requires 'were'.",
      "'Donated' should be 'donating'.",
      "'Charity' should be 'charities'.",
      "No error."
    ],
    correctAnswer: 0,
    explanation: "'Proceeds' (net revenue/takings) is pluralia tantum and governs a plural verb: 'The proceeds were donated'.",
    explanationBn: "মুনাফা বা বিক্রয়লব্ধ অর্থ অর্থে 'Proceeds' Plural Noun, তাই 'was'-এর বদলে 'were' হবে।"
  },
  {
    id: 6,
    question: "Which of the following nouns belongs to Pluralia Tantum (plural-only)?",
    options: [
      "Trousers, Pincers, Alms, Riches",
      "News, Physics, Mathematics, Innings",
      "Furniture, Information, Advice, Scenery",
      "Book, Pen, Table, Chair"
    ],
    correctAnswer: 0,
    explanation: "Trousers, Pincers, Alms, and Riches exist only in the plural. (News/Physics are plural in form but singular in meaning; Furniture/Advice are uncountable singulars).",
    explanationBn: "Trousers, Pincers, Alms, এবং Riches সর্বদা Pluralia Tantum (শুধুমাত্র বহুবচনযুক্ত রূপ)।"
  },
  {
    id: 7,
    question: "Complete the famous proverb: 'The wages of sin _______ death.'",
    options: [
      "is (singular, expressing retribution as an abstract consequence)",
      "are",
      "were",
      "have been"
    ],
    correctAnswer: 0,
    explanation: "In the biblical proverb (Romans 6:23), 'wages' carries the archaic singular meaning of 'spiritual retribution/consequence' taking 'is'. In modern financial contexts, 'wages' is plural: 'His wages are paid weekly.'",
    explanationBn: "বাইবেলের প্রবাদে 'wages' অর্থ পাপের অবধারিত ফল, তাই 'is death' বসে। কিন্তু শ্রমিকের বেতনের ক্ষেত্রে 'wages are' বসে।"
  },
  {
    id: 8,
    question: "Choose the correct sentence regarding 'poultry' and 'vermin':",
    options: [
      "Poultry are reared on the farm, and vermin destroy the crops.",
      "Poultries are reared on the farm, and vermins destroy the crops.",
      "Poultry is reared on the farm, and vermin destroys the crops.",
      "A poultry are reared on the farm."
    ],
    correctAnswer: 0,
    explanation: "'Poultry' (domestic fowls) and 'vermin' (harmful pests) are invariable plural nouns without '-s' that govern plural verbs ('are reared', 'destroy').",
    explanationBn: "'Poultry' এবং 'Vermin' কোনো '-s' ছাড়াই সর্বদা Plural Noun এবং Plural Verb নেয়।"
  },
  {
    id: 9,
    question: "Correct the sentence: 'His earning are insufficient to support such high expenditure.'",
    options: [
      "His earnings are insufficient to support such high expenditure.",
      "His earning is insufficient to support such high expenditure.",
      "His earnings is insufficient to support such high expenditure.",
      "No correction needed."
    ],
    correctAnswer: 0,
    explanation: "'Earnings' (income) is pluralia tantum and requires the '-s' suffix and plural verb 'are'.",
    explanationBn: "আয় বা রোজগার অর্থে 'Earnings' (বহুবচন) ব্যবহৃত হয় এবং Plural Verb 'are' গ্রহণ করে।"
  },
  {
    id: 10,
    question: "Select the sentence with 100% grammatical precision:",
    options: [
      "The police are investigating the robbery, and their findings will be released today.",
      "The police is investigating the robbery, and its findings will be released today.",
      "The polices are investigating the robbery.",
      "A police are investigating the robbery."
    ],
    correctAnswer: 0,
    explanation: "'Police' is an invariable plural noun requiring plural verb 'are' and plural pronoun 'their'. An individual officer is 'a police officer'.",
    explanationBn: "'Police' সর্বদা Plural Concord ('are', 'their') গ্রহণ করে। একজন পুলিশ সদস্য বোঝাতে 'a police officer' বলতে হয়।"
  }
];

export default questions;
