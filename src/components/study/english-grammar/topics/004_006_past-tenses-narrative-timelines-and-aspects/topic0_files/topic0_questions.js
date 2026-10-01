const questions = [
  {
    id: 1,
    question: "Identify the grammatically correct sentence using the Simple Past interrogative form:",
    options: [
      "Did you completed your assignment yesterday?",
      "Did you complete your assignment yesterday?",
      "Had you completed your assignment yesterday?",
      "Did you have complete your assignment yesterday?"
    ],
    correctAnswer: 1,
    explanation: "In Simple Past questions, the auxiliary 'Did' already carries the past marker; the main verb MUST remain in its base form V1 ('complete', not 'completed')."
  },
  {
    id: 2,
    question: "Select the correct verb forms: 'The train ______ before we ______ the platform.'",
    options: [
      "left, had reached",
      "had left, reached",
      "has left, reached",
      "was leaving, had reached"
    ],
    correctAnswer: 1,
    explanation: "When two past actions occur with 'before', the earlier action takes Past Perfect ('had left') and the subsequent action takes Simple Past ('reached'). Formula: Past Perfect + BEFORE + Simple Past."
  },
  {
    id: 3,
    question: "Complete the sentence: 'We ______ dinner after the guests ______.'",
    options: [
      "had eaten, departed",
      "ate, had departed",
      "were eating, departed",
      "have eaten, had departed"
    ],
    correctAnswer: 1,
    explanation: "With 'after', the later action is in Simple Past and the earlier action is in Past Perfect. Formula: Simple Past + AFTER + Past Perfect ('ate after the guests had departed')."
  },
  {
    id: 4,
    question: "Choose the correct inversion clause: 'Hardly ______ the station when the rain poured down.'",
    options: [
      "he reached",
      "did he reached",
      "had he reached",
      "he had reached"
    ],
    correctAnswer: 2,
    explanation: "Negative adverbs like 'Hardly' and 'Scarcely' trigger auxiliary inversion before the subject: 'Hardly had he reached... when'."
  },
  {
    id: 5,
    question: "Which correlative conjunction correctly pairs with 'No sooner had they started'?",
    options: [
      "when it began to hail",
      "than it began to hail",
      "then it began to hail",
      "before it began to hail"
    ],
    correctAnswer: 1,
    explanation: "'No sooner' is a comparative adverb and strictly pairs with 'than' (not 'when' or 'then'): 'No sooner had they started THAN it began to hail'."
  },
  {
    id: 6,
    question: "Identify the sentence that correctly portrays an interrupted background action:",
    options: [
      "While I watched TV, the bell had rung.",
      "I was watching TV when the bell rang.",
      "I watched TV when the bell was ringing.",
      "While I was watching TV when the bell rang."
    ],
    correctAnswer: 1,
    explanation: "The ongoing background activity takes Past Continuous ('was watching') while the sudden interrupting event takes Simple Past with 'when' ('when the bell rang')."
  },
  {
    id: 7,
    question: "Why is 'I would live in London when I was young' grammatically questionable in standard English?",
    options: [
      "'Would' cannot refer to the past.",
      "'Would' cannot be used for stative verbs expressing permanent past states; 'used to live' must be used.",
      "'Would' requires a continuous participle (-ing).",
      "'When I was young' strictly demands Past Perfect."
    ],
    correctAnswer: 1,
    explanation: "'Would' expresses repeated past actions (e.g. 'we would play'), but CANNOT be used with stative verbs for past states or situations (e.g. 'live', 'be', 'know', 'have'). 'Used to' is mandatory for past states."
  },
  {
    id: 8,
    question: "Select the sentence with Past Perfect Continuous denoting duration leading up to a past event:",
    options: [
      "She was tired because she ran for three hours.",
      "She was tired because she had been running for three hours.",
      "She had tired because she has been running.",
      "She had been tired because she was running for three hours."
    ],
    correctAnswer: 1,
    explanation: "Past Perfect Continuous ('had been running') expresses an activity that continued over a duration up to a specific past moment ('She was tired')."
  },
  {
    id: 9,
    question: "Choose the correct sentence regarding stative verbs in past continuous:",
    options: [
      "They had been knowing the truth for a year before they spoke.",
      "They had known the truth for a year before they spoke.",
      "They were knowing the truth when I met them.",
      "They had been having two houses before the war."
    ],
    correctAnswer: 1,
    explanation: "Stative verbs like 'know' do not take progressive forms; duration prior to a past point is expressed via Past Perfect Simple ('had known')."
  },
  {
    id: 10,
    question: "Complete the sentence: 'By the time the fire engines arrived, the warehouse ______ to ashes.'",
    options: [
      "burned",
      "had burned",
      "was burning",
      "has burned"
    ],
    correctAnswer: 1,
    explanation: "'By the time' + Simple Past requires the main clause in Past Perfect ('had burned') to show completion before that past deadline."
  },
  {
    id: 11,
    question: "Which time adverbial strictly necessitates the Simple Past tense rather than Present Perfect?",
    options: [
      "already",
      "just now (referring to a moment ago in past)",
      "so far",
      "since last Monday"
    ],
    correctAnswer: 1,
    explanation: "'Just now' (meaning a moment ago) and 'yesterday/ago' anchor the action in finished past time, requiring Simple Past (e.g. 'He arrived just now')."
  },
  {
    id: 12,
    question: "Identify the error in: 'He told me that he *has completed* the project two days *ago*.'",
    options: [
      "Change 'told' to 'was telling'",
      "Change 'has completed' to 'had completed' or 'completed'",
      "Change 'ago' to 'since'",
      "Change 'that' to 'whether'"
    ],
    correctAnswer: 1,
    explanation: "In past reported speech and with finished past time 'ago', Present Perfect 'has completed' is strictly incorrect; it should be 'had completed'."
  },
  {
    id: 13,
    question: "Complete with the correct simultaneous past actions: 'While mother ______ dinner, father ______ the garden.'",
    options: [
      "cooked, was watering",
      "was cooking, was watering",
      "had cooked, watered",
      "was cooking, had watered"
    ],
    correctAnswer: 1,
    explanation: "Two continuous actions taking place at the same time in the past both use the Past Continuous tense."
  },
  {
    id: 14,
    question: "What is the past form (V2) and past participle (V3) of the irregular verb 'LIE' (to recline)?",
    options: [
      "Lied, Lied",
      "Lay, Lain",
      "Laid, Laid",
      "Lay, Laid"
    ],
    correctAnswer: 1,
    explanation: "'Lie' (recline) conjugates as Lie -> Lay (V2) -> Lain (V3). 'Lay' (put down transitively) conjugates as Lay -> Laid -> Laid."
  },
  {
    id: 15,
    question: "Choose the correct sentence expressing a discontinued past routine:",
    options: [
      "He is used to wake up early in childhood.",
      "He used to wake up early in childhood.",
      "He was used to wake early.",
      "He use to wake up early in childhood."
    ],
    correctAnswer: 1,
    explanation: "'Used to + V1' describes a past habitual state or routine that no longer occurs."
  },
  {
    id: 16,
    question: "Spot the correct transformation of: 'As soon as he entered the hall, the lights went off.' using 'No sooner':",
    options: [
      "No sooner did he entered the hall when the lights went off.",
      "No sooner had he entered the hall than the lights went off.",
      "No sooner he had entered the hall than the lights went off.",
      "No sooner had he entered the hall when the lights had gone off."
    ],
    correctAnswer: 1,
    explanation: "The standard structure is: 'No sooner had + Subject + V3 + ... THAN + Subject + V2'."
  },
  {
    id: 17,
    question: "Select the sentence where the Past Perfect is UNNECESSARY and erroneous because chronological sequence is clear without it:",
    options: [
      "I had brushed my teeth and went to sleep.",
      "After he had verified the ledger, he approved the invoice.",
      "The patient had died before the doctor came.",
      "He had already written the letter before noon."
    ],
    correctAnswer: 0,
    explanation: "When simple chronological sequential actions are connected by 'and', Simple Past is used for both ('I brushed my teeth and went to sleep'). Past Perfect is only needed when clarifying non-linear past relationships."
  },
  {
    id: 18,
    question: "In the sentence 'Scarcely had she closed her eyes when the door burst open', the word 'Scarcely' is followed by:",
    options: [
      "than",
      "then",
      "when",
      "before"
    ],
    correctAnswer: 2,
    explanation: "'Scarcely' and 'Hardly' strictly correlate with 'when'."
  },
  {
    id: 19,
    question: "Which of the following describes an action that happened repeatedly in the past using 'would'?",
    options: [
      "Every summer, my grandfather would take us to the riverbank to fish.",
      "My grandfather would have a vintage car in 1960.",
      "My grandfather would be a tall man.",
      "My grandfather would belong to Barrackpore."
    ],
    correctAnswer: 0,
    explanation: "'Would' is appropriate here because 'take us to fish' is an active dynamic repeated action, not a stative condition."
  },
  {
    id: 20,
    question: "Choose the correct verb form: 'I realized that I ______ my car keys inside the office.'",
    options: [
      "left",
      "have left",
      "had left",
      "was leaving"
    ],
    correctAnswer: 2,
    explanation: "Leaving the keys occurred before the moment of realizing in the past, requiring the Past Perfect 'had left'."
  },
  {
    id: 21,
    question: "Which question in the past tense is formed correctly?",
    options: [
      "Where did you went last night?",
      "Where did you go last night?",
      "Where had you go last night?",
      "Where were you go last night?"
    ],
    correctAnswer: 1,
    explanation: "The auxiliary 'did' takes the base form of the verb: 'Where did you go...?'"
  },
  {
    id: 22,
    question: "Identify the correct combination: 'It ______ heavily, so we ______ at home all afternoon.'",
    options: [
      "rained, were staying",
      "was raining, stayed",
      "had rained, had stayed",
      "is raining, stayed"
    ],
    correctAnswer: 1,
    explanation: "'It was raining heavily (ongoing backdrop), so we stayed (decision/result) at home'."
  },
  {
    id: 23,
    question: "Fill in the blank: 'He ______ in Barrackpore for twenty years before moving to Kolkata in 2022.'",
    options: [
      "has lived",
      "was living",
      "had lived",
      "lives"
    ],
    correctAnswer: 2,
    explanation: "The 20-year period of living occurred and finished prior to another past event in 2022, requiring Past Perfect ('had lived')."
  },
  {
    id: 24,
    question: "Which sentence shows correct negative past continuous structure?",
    options: [
      "He was not paying attention during the lecture.",
      "He did not paying attention during the lecture.",
      "He was not pay attention during the lecture.",
      "He had not paying attention during the lecture."
    ],
    correctAnswer: 0,
    explanation: "'Subject + was/were + not + V-ing': 'He was not paying attention'."
  },
  {
    id: 25,
    question: "Select the sentence that contains a fatal tense error:",
    options: [
      "I lived in Mumbai from 2010 to 2015.",
      "I have lived in Mumbai in 2010.",
      "I had lived in Mumbai before I relocated to Kolkata.",
      "I was living in Mumbai when the metro opened."
    ],
    correctAnswer: 1,
    explanation: "'In 2010' is a finished past time anchor, making the Present Perfect 'have lived' grammatically invalid; it must be 'I lived in Mumbai in 2010'."
  }
];

export default questions;
