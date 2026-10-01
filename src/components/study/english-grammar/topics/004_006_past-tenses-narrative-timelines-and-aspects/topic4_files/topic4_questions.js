const questions = [
  {
    id: 1,
    question: "Complete the sentence with correct correlative conjunction: 'Hardly had the doctor entered the clinic ______ the emergency call arrived.'",
    options: [
      "than",
      "when",
      "then",
      "while"
    ],
    correctAnswer: 1,
    explanation: "'Hardly' must be paired with 'when' (Hardly had + S + V3 ... when + S + V2).",
    explanationBn: "'Hardly'-র সাথে সর্বদা 'when' ব্যবহৃত হয়।"
  },
  {
    id: 2,
    question: "Complete the sentence with correct correlative conjunction: 'No sooner had the keynote speaker concluded his speech ______ the audience stood up for an ovation.'",
    options: [
      "when",
      "than",
      "then",
      "as"
    ],
    correctAnswer: 1,
    explanation: "'No sooner' (comparative form) takes 'than' (No sooner had + S + V3 ... than + S + V2).",
    explanationBn: "'No sooner'-এর সাথে তুলনামূলক 'than' বসে।"
  },
  {
    id: 3,
    question: "Spot the fatal inversion error:",
    options: [
      "No sooner had he left the room than the fire broke out.",
      "Hardly had he left the room than the fire broke out.",
      "Scarcely had he left the room when the fire broke out.",
      "No sooner did he leave the room than the fire broke out."
    ],
    correctAnswer: 1,
    explanation: "Option 2 incorrectly pairs 'Hardly' with 'than'. It must be 'Hardly... when'.",
    explanationBn: "'Hardly'-র সাথে 'than' ব্যবহার মারাত্মক ভুল; 'when' হবে।"
  },
  {
    id: 4,
    question: "Choose the correct inversion structure starting with 'No sooner did':",
    options: [
      "No sooner did the alarm sounded than we woke up.",
      "No sooner did the alarm sound than we woke up.",
      "No sooner did the alarm sound when we woke up.",
      "No sooner did the alarm sounded when we woke up."
    ],
    correctAnswer: 1,
    explanation: "After auxiliary 'did', the base form V1 ('sound') is required + 'than': 'No sooner did the alarm sound than...'",
    explanationBn: "'Did'-এর পর Base Form (sound) এবং শেষে 'than' বসে।"
  },
  {
    id: 5,
    question: "Transform into 'Hardly... when': 'As soon as Swadeep reached the station, the express train arrived.'",
    options: [
      "Hardly had Swadeep reached the station when the express train arrived.",
      "Hardly Swadeep had reached the station when the express train arrived.",
      "Hardly had Swadeep reached the station than the express train arrived.",
      "Hardly did Swadeep reached the station then the express train arrived."
    ],
    correctAnswer: 0,
    explanation: "Inversion requires 'Hardly had Swadeep reached... when the express train arrived.'",
    explanationBn: "'Hardly had Swadeep reached... when...' হলো সঠিক রূপান্তর।"
  },
  {
    id: 6,
    question: "Spot the error: 'No sooner had the match started (A) then the heavy downpour (B) disrupted the proceedings (C).'",
    options: [
      "No sooner had the match started (A)",
      "then the heavy downpour (B)",
      "disrupted the proceedings (C)",
      "No error"
    ],
    correctAnswer: 1,
    explanation: "'No sooner' requires 'than', not 'then'. Say: '...than the heavy downpour...'",
    explanationBn: "'No sooner'-এর সাথে 'than' হবে, 'then' নয়।"
  },
  {
    id: 7,
    question: "Fill in the blank: 'Scarcely ______ the airplane touched the runway ______ one of the tires burst.'",
    options: [
      "had; when",
      "had; than",
      "did; than",
      "was; when"
    ],
    correctAnswer: 0,
    explanation: "'Scarcely had + S + V3 ... when' is the correct correlative construction.",
    explanationBn: "'Scarcely had... when' হলো নিখুঁত জোড়া।"
  },
  {
    id: 8,
    question: "Why is 'Hardly he had arrived when the party began' ungrammatical?",
    options: [
      "Because fronting the restrictive adverb 'Hardly' triggers mandatory subject-auxiliary inversion ('Hardly had he arrived').",
      "Because 'Hardly' cannot begin a sentence.",
      "Because 'began' is an irregular verb.",
      "Because 'party' is a collective noun."
    ],
    correctAnswer: 0,
    explanation: "When 'Hardly' is fronted, inversion is mandatory: 'Hardly had he arrived', not *'Hardly he had arrived'.",
    explanationBn: "'Hardly' বাক্যের শুরুতে বসলে Inversion (Had + Subject) বাধ্যতামূলক।"
  },
  {
    id: 9,
    question: "Complete the sentence: 'Barely ______ Abhronila submitted the online form ______ the server crashed.'",
    options: [
      "had; when",
      "had; than",
      "did; than",
      "has; when"
    ],
    correctAnswer: 0,
    explanation: "'Barely had + S + V3 ... when' is identical in function to 'Hardly... when'.",
    explanationBn: "'Barely had... when' সঠিক গঠন।"
  },
  {
    id: 10,
    question: "Choose the sentence that correctly transforms: 'He saw the tiger. He instantly climbed up a tree.'",
    options: [
      "No sooner had he seen the tiger than he climbed up a tree.",
      "No sooner he saw the tiger than he climbed up a tree.",
      "No sooner had he seen the tiger when he climbed up a tree.",
      "No sooner did he saw the tiger than he climbed."
    ],
    correctAnswer: 0,
    explanation: "'No sooner had he seen the tiger than he climbed up a tree' is pristine.",
    explanationBn: "'No sooner had he seen... than...' হলো নির্ভুল রূপ।"
  },
  {
    id: 11,
    question: "Fill in the blank: 'No sooner ______ the gates opened ______ thousands of eager spectators rushed in.'",
    options: [
      "were; than",
      "had; than",
      "had; when",
      "did; when"
    ],
    correctAnswer: 1,
    explanation: "Passive inversion: 'No sooner had the gates opened than...'",
    explanationBn: "'No sooner had... than...' সঠিক।"
  },
  {
    id: 12,
    question: "Spot the error: 'Scarcely had the bell rung (A) than the children (B) ran out to the playground (C).'",
    options: [
      "Scarcely had the bell rung (A)",
      "than the children (B)",
      "ran out to the playground (C)",
      "No error"
    ],
    correctAnswer: 1,
    explanation: "'Scarcely' pairs with 'when', not 'than'. Say: '...when the children ran out...'",
    explanationBn: "'Scarcely'-র সাথে 'when' বসবে, 'than' নয়।"
  },
  {
    id: 13,
    question: "Identify the correct form using 'did':",
    options: [
      "No sooner did the train arrive than the passengers boarded.",
      "No sooner did the train arrived than the passengers boarded.",
      "No sooner did the train arrive when the passengers boarded.",
      "No sooner did the train has arrived than."
    ],
    correctAnswer: 0,
    explanation: "Did + base form (arrive) + than: 'No sooner did the train arrive than...'",
    explanationBn: "'Did' + Base Form (arrive) + than হলো সঠিক রূপ।"
  },
  {
    id: 14,
    question: "Fill in the blank: 'Hardly ______ Tuhina opened her grammar notebook ______ the electricity failed.'",
    options: [
      "had; when",
      "did; when",
      "had; than",
      "was; when"
    ],
    correctAnswer: 0,
    explanation: "'Hardly had Tuhina opened... when the electricity failed.'",
    explanationBn: "'Hardly had... when' সঠিক।"
  },
  {
    id: 15,
    question: "Which of the following correlative pairs is INCORRECT?",
    options: [
      "No sooner ... than",
      "Hardly ... when",
      "Scarcely ... when",
      "Barely ... than"
    ],
    correctAnswer: 3,
    explanation: "'Barely' pairs with 'when', NOT 'than'.",
    explanationBn: "'Barely'-র সাথে 'when' বসে, 'than' নয়।"
  },
  {
    id: 16,
    question: "Transform into standard non-inverted word order: 'No sooner had the bell rung than the exam ended.'",
    options: [
      "As soon as the bell rang, the exam ended.",
      "The bell had rung when the exam ended.",
      "The exam ended before the bell rang.",
      "The bell rang after the exam ended."
    ],
    correctAnswer: 0,
    explanation: "'As soon as the bell rang, the exam ended' is the natural non-inverted equivalent.",
    explanationBn: "'As soon as the bell rang, the exam ended' হলো স্বাভাবিক বাক্য রূপ।"
  },
  {
    id: 17,
    question: "Spot the error: 'Hardly had he finished (A) his dinner (B) before someone knocked at the door (C).'",
    options: [
      "Hardly had he finished (A)",
      "his dinner (B)",
      "before someone knocked at the door (C)",
      "No error"
    ],
    correctAnswer: 3,
    explanation: "In formal English, 'Hardly had... before' is an acceptable archaic variant of 'when', though 'when' is most standard. Here it is acceptable (No error).",
    explanationBn: "প্রমিত ব্যাকরণে 'Hardly had... when/before' উভয়ই ব্যাকরণগতভাবে গৃহীত।"
  },
  {
    id: 18,
    question: "Fill in the blank: 'No sooner ______ the principal entered the hall ______ pin-drop silence prevailed.'",
    options: [
      "had; than",
      "did; when",
      "had; when",
      "was; than"
    ],
    correctAnswer: 0,
    explanation: "'No sooner had the principal entered... than...'",
    explanationBn: "'No sooner had... than...' সঠিক।"
  },
  {
    id: 19,
    question: "Why is 'No sooner had I reached then the bus left' incorrect?",
    options: [
      "Because 'then' indicates a later timeframe, but 'sooner' requires comparative 'than'.",
      "Because 'bus' is singular.",
      "Because 'reached' is intransitive.",
      "Because 'left' should be 'leaved'."
    ],
    correctAnswer: 0,
    explanation: "'Sooner' is a comparative adverb and grammatically demands comparative conjunction 'than', not temporal adverb 'then'.",
    explanationBn: "'Sooner' Comparative হওয়ায় এর সাথে 'than' বসবে, 'then' নয়।"
  },
  {
    id: 20,
    question: "Complete the sentence: 'Scarcely ______ the siren sounded ______ the factory workers evacuated.'",
    options: [
      "had; when",
      "had; than",
      "did; than",
      "has; when"
    ],
    correctAnswer: 0,
    explanation: "'Scarcely had the siren sounded when...'",
    explanationBn: "'Scarcely had... when' সঠিক।"
  },
  {
    id: 21,
    question: "Choose the sentence with flawless inversion syntax:",
    options: [
      "Hardly had the sun risen when the morning mist began to dissipate.",
      "Hardly the sun had risen when mist began to dissipate.",
      "Hardly had the sun risen than the mist began.",
      "Hardly did the sun rose when mist began."
    ],
    correctAnswer: 0,
    explanation: "'Hardly had the sun risen when...' has flawless inversion and correlative pairing.",
    explanationBn: "'Hardly had the sun risen when...' সম্পূর্ণ নির্ভুল।"
  },
  {
    id: 22,
    question: "Fill in the blank: 'No sooner ______ the warning issued ______ the coastal areas were evacuated.'",
    options: [
      "was; than",
      "had; than",
      "had been; than",
      "did; when"
    ],
    correctAnswer: 2,
    explanation: "Passive Past Perfect inversion: 'No sooner had been the warning issued than...' or 'No sooner had the warning been issued than...'",
    explanationBn: "প্যাসিভ ভয়েসে 'No sooner had the warning been issued than...' বসে।"
  },
  {
    id: 23,
    question: "Transform into 'No sooner... than': 'When the teacher entered, the noisy class became silent.'",
    options: [
      "No sooner had the teacher entered than the noisy class became silent.",
      "No sooner did the teacher entered than class became silent.",
      "No sooner had the teacher entered when class became silent.",
      "No sooner teacher entered than class became silent."
    ],
    correctAnswer: 0,
    explanation: "'No sooner had the teacher entered than the noisy class became silent' is the exact transformation.",
    explanationBn: "'No sooner had the teacher entered than...' হলো সঠিক রূপান্তর।"
  },
  {
    id: 24,
    question: "Spot the error: 'Barely had the spacecraft (A) separated from the rocket (B) than the telemetry failed (C).'",
    options: [
      "Barely had the spacecraft (A)",
      "separated from the rocket (B)",
      "than the telemetry failed (C)",
      "No error"
    ],
    correctAnswer: 2,
    explanation: "'Barely' must be paired with 'when', not 'than'. Say: '...when the telemetry failed.'",
    explanationBn: "'Barely'-র সাথে 'when' বসবে, 'than' নয়।"
  },
  {
    id: 25,
    question: "What is the key grammatical takeaway regarding 'No sooner' and 'Hardly'?",
    options: [
      "Both require inverted word order (Auxiliary before Subject) and fixed correlative partners: No sooner... THAN, and Hardly/Scarcely... WHEN.",
      "Both can be used without any auxiliary verbs.",
      "Both require Future Tense.",
      "Both are informal colloquialisms prohibited in exams."
    ],
    correctAnswer: 0,
    explanation: "Negative Inversions require auxiliary-subject inversion + exact correlatives: No sooner... THAN, and Hardly/Scarcely... WHEN.",
    explanationBn: "নেগেটিভ ইনভার্সনে Auxiliary আগে বসে এবং 'No sooner... THAN' ও 'Hardly/Scarcely... WHEN' হলো বাঁধাধরা নিয়ম।"
  }
];

export default questions;
