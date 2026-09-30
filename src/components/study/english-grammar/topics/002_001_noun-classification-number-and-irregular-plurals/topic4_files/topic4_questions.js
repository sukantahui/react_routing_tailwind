// topic4_questions.js
// Module 002_001 - Topic 4: Collective Nouns (Singular vs Plural Concord)

const questions = [
  {
    id: 1,
    question: "Choose the correct verb: 'The jury _______ reached a unanimous verdict.'",
    options: [
      "has",
      "have",
      "are",
      "were"
    ],
    correctAnswer: 0,
    explanation: "When a collective noun acts unanimously as a single undivided unit, it takes a singular verb ('has reached') and singular pronoun ('its').",
    explanationBn: "যখন কোনো Collective Noun ঐক্যবদ্ধভাবে একক ইউনিট হিসেবে কাজ করে, তখন Singular Verb 'has' বসে।"
  },
  {
    id: 2,
    question: "Choose the correct verb and pronoun: 'The jury _______ divided in _______ opinions.'",
    options: [
      "were, their",
      "was, its",
      "was, their",
      "were, its"
    ],
    correctAnswer: 0,
    explanation: "When members of a collective noun are divided or act individually (Noun of Multitude), it governs a plural verb ('were') and plural pronoun ('their').",
    explanationBn: "সদস্যদের মধ্যে মতবিরোধ বা ভিন্নতা থাকলে Collective Noun-কে Noun of Multitude বিবেচনা করে Plural Verb ('were') ও Plural Pronoun ('their') ব্যবহার করা হয়।"
  },
  {
    id: 3,
    question: "Identify the grammatically correct sentence:",
    options: [
      "The committee has submitted its annual audit report to the director.",
      "The committee have submitted its annual audit report to the director.",
      "The committee has submitted their annual audit report to the director.",
      "The committee are submitted its annual audit report to the director."
    ],
    correctAnswer: 0,
    explanation: "The committee acts as a single body: singular verb 'has submitted' agrees with singular neuter pronoun 'its'.",
    explanationBn: "কমিটি একক সংস্থা হিসেবে কাজ করায় Singular Verb 'has' এবং Singular Pronoun 'its' সঙ্গতিপূর্ণ।"
  },
  {
    id: 4,
    question: "Fill in the blank: 'The crew _______ fighting among themselves for survival.'",
    options: [
      "were",
      "was",
      "is",
      "has been"
    ],
    correctAnswer: 0,
    explanation: "'Fighting among themselves' signifies individual conflict among crew members, requiring the plural verb 'were'.",
    explanationBn: "'Fighting among themselves' দ্বারা নাবিকদের পরস্পরের মধ্যে বিরোধ বোঝায়, তাই Plural Verb 'were' বসবে।"
  },
  {
    id: 5,
    question: "Which sentence shows incorrect pronoun-verb agreement?",
    options: [
      "The team is taking their seats in the bus.",
      "The team is celebrating its championship victory.",
      "The team are putting on their new jerseys.",
      "The audience was enthralled by the performance."
    ],
    correctAnswer: 0,
    explanation: "Option A mixes singular verb 'is' with plural pronoun 'their'. Taking seats is an individual action, so it should be: 'The team are taking their seats'.",
    explanationBn: "Option A-তে 'is' (Singular) এবং 'their' (Plural)-এর অমিল রয়েছে। পৃথকভাবে আসন নেওয়ার কারণে 'are taking their seats' হওয়া উচিত।"
  },
  {
    id: 6,
    question: "Select the sentence where 'family' is treated as a Noun of Multitude:",
    options: [
      "My family are early risers and have different morning routines.",
      "My family is the largest in our village.",
      "A nuclear family consists of parents and children.",
      "The royal family lives in Buckingham Palace."
    ],
    correctAnswer: 0,
    explanation: "In 'My family are early risers and have different morning routines', individual habits of distinct members are emphasized, requiring plural concord.",
    explanationBn: "পরিবারের প্রতিটি সদস্যের ভিন্ন ভিন্ন রুটিন বোঝানোর জন্য 'family' এখানে Plural Concord ('are', 'have') নিয়েছে।"
  },
  {
    id: 7,
    question: "Fill in the blank: 'The audience _______ clapping and cheering loudly throughout the auditorium.'",
    options: [
      "were",
      "was",
      "has",
      "is"
    ],
    correctAnswer: 0,
    explanation: "Individual members clapping throughout the hall emphasize distinct actions of individuals, hence plural 'were' (or singular 'was' if viewing the audience as an aggregate mass, but plural is preferred for dynamic individual actions).",
    explanationBn: "দর্শকদের পৃথক পৃথক করতালি ও উচ্ছ্বাস বোঝাতে Plural Verb 'were' সর্বাধিক প্রযোজ্য।"
  },
  {
    id: 8,
    question: "Correct the sentence: 'The board of directors have passed the resolution with unanimous support.'",
    options: [
      "The board of directors has passed the resolution with unanimous support.",
      "The board of directors have passed the resolution with its support.",
      "The boards of director has passed the resolution.",
      "No correction needed."
    ],
    correctAnswer: 0,
    explanation: "A unanimous resolution represents a unified single decision, requiring the singular verb 'has passed'.",
    explanationBn: "সর্বসম্মত প্রস্তাব (unanimous support) একক সিদ্ধান্ত, তাই 'has passed' বসবে।"
  },
  {
    id: 9,
    question: "Which of the following collective nouns is ALWAYS treated as plural in modern English?",
    options: [
      "Cattle",
      "Committee",
      "Jury",
      "Team"
    ],
    correctAnswer: 0,
    explanation: "'Cattle' is an invariable plural noun that always takes a plural verb ('Cattle are grazing'). Committee, Jury, and Team can be singular or plural depending on context.",
    explanationBn: "'Cattle' সর্বদা Plural Verb গ্রহণ করে (যেমন: 'Cattle are grazing')।"
  },
  {
    id: 10,
    question: "Choose the grammatically immaculate option:",
    options: [
      "The orchestra were tuning their instruments before the concert began.",
      "The orchestra was tuning their instruments before the concert began.",
      "The orchestra were tuning its instruments before the concert began.",
      "The orchestra are tuned its instruments."
    ],
    correctAnswer: 0,
    explanation: "Each musician tunes their own individual instrument (plural individuals), requiring plural verb 'were' and plural pronoun 'their'.",
    explanationBn: "বাদক দলের প্রত্যেকে নিজস্ব বাদ্যযন্ত্র সুর বাঁধছিল (পৃথক কাজ), তাই 'were tuning their instruments' সঠিক।"
  }
];

export default questions;
