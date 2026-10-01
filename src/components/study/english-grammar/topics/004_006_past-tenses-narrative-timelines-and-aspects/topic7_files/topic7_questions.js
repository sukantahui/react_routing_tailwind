const questions = [
  {
    id: "cap-q01",
    question: "Identify the sentence that violates the Fundamental Past Sequence Rule:",
    options: [
      "When the station master flagged the signal, the express train had already departed.",
      "By the time the firefighter reached the rooftop, the fire destroyed the attic.",
      "The botanist explained that she had discovered the rare orchid species two years prior.",
      "After the thunderstorm had subsided, the rescue volunteers cleared the fallen boughs."
    ],
    correctAnswer: 1,
    explanation: "In 'By the time + Simple Past (V2)', the main clause representing the earlier completed action MUST use the Past Perfect ('had destroyed'). Writing 'the fire destroyed' is incorrect.",
    explanationBn: "'By the time + V2' ক্লজে মূল প্রধান ক্লজটিতে পূর্ববর্তী কাজের জন্য Past Perfect ('had destroyed') ব্যবহার করা বাধ্যতামূলক।"
  },
  {
    id: "cap-q02",
    question: "Choose the correct inverted sentence:",
    options: [
      "Hardly had the jury announced the verdict than the courtroom erupted in cheers.",
      "Hardly did the jury announce the verdict when the courtroom erupted in cheers.",
      "Hardly had the jury announced the verdict when the courtroom erupted in cheers.",
      "Hardly had the jury announced the verdict then the courtroom erupted in cheers."
    ],
    correctAnswer: 2,
    explanation: "'Hardly had + Subject + V3' strictly correlates with 'WHEN' (never 'than' or 'then').",
    explanationBn: "'Hardly had...'-এর সাথে তুলনামূলক যোজক হিসেবে শুধুমাত্র 'when' ব্যবহৃত হয় ('than' বা 'then' নয়)।"
  },
  {
    id: "cap-q03",
    question: "Spot the error: 'Did (A) the laboratory assistant (B) found (C) the missing test tubes yesterday (D)?'",
    options: [
      "A",
      "B",
      "C",
      "D"
    ],
    correctAnswer: 2,
    explanation: "Part (C) contains an error. After the auxiliary 'Did', the verb must remain in its base form V1 ('find', not 'found').",
    explanationBn: "Auxiliary verb 'Did'-এর পরে মূল verb-এর Base Form (V1) 'find' বসবে, 'found' নয়।"
  },
  {
    id: "cap-q04",
    question: "Select the sentence with the accurate aspect: 'Priyabrata was exhausted because he ______ for eight consecutive hours before the race was cancelled.'",
    options: [
      "was cycling",
      "had been cycling",
      "cycled",
      "has been cycling"
    ],
    correctAnswer: 1,
    explanation: "The prolonged continuous duration ('for eight consecutive hours') leading up to a past cutoff milestone requires the Past Perfect Continuous: 'had been cycling'.",
    explanationBn: "অতীতের কোনো ঘটনার পূর্বে দীর্ঘ সময় ধরে চলা অবিচ্ছিন্ন কাজের জন্য Past Perfect Continuous ('had been cycling') প্রযোজ্য।"
  },
  {
    id: "cap-q05",
    question: "Which of the following is UNGRAMMATICAL because of a stative verb violation?",
    options: [
      "When we were children, Grandfather would tell us folklore stories.",
      "In the 1980s, there would be a historic clock tower in this square.",
      "Every summer, we would swim across the pond behind the garden.",
      "During school recess, Swadeep would sketch mechanical diagrams."
    ],
    correctAnswer: 1,
    explanation: "'There be / exist' is a stative condition representing past presence/location. 'Would' cannot describe past states; 'There used to be' is required.",
    explanationBn: "অতীতের অবস্থা বা অস্তিত্ব (Stative Condition) বোঝাতে 'would' ব্যবহার করা নিষিদ্ধ; 'used to be' ব্যবহার করতে হবে।"
  },
  {
    id: "cap-q06",
    question: "Fill in the blank: 'No sooner ______ the chemical reagent into the crucible than a vivid blue vapor emerged.'",
    options: [
      "had the professor poured",
      "the professor had poured",
      "did the professor poured",
      "has the professor poured"
    ],
    correctAnswer: 0,
    explanation: "Fronted negative/restrictive phrases require subject-auxiliary inversion: 'No sooner had the professor poured...'",
    explanationBn: "বাক্যের শুরুতে 'No sooner' বসলে Auxiliary verb কর্তার পূর্বে আসে: 'No sooner had the professor poured'।"
  },
  {
    id: "cap-q07",
    question: "Convert to negative: 'Sneha used to study late at night in high school.'",
    options: [
      "Sneha didn't used to study late at night in high school.",
      "Sneha didn't use to study late at night in high school.",
      "Sneha was not used to study late at night in high school.",
      "Sneha had not used to study late at night in high school."
    ],
    correctAnswer: 1,
    explanation: "The standard negative form with 'did not' drops the 'd': 'didn't use to study'.",
    explanationBn: "'Didn't'-এর সাথে Base form 'use to' বসে: 'didn't use to study'।"
  },
  {
    id: "cap-q08",
    question: "Choose the sentence that correctly sequences two independent past events using 'After':",
    options: [
      "After Abhronila had validated the algorithm, she presented the findings to the committee.",
      "After Abhronila validated the algorithm, she had presented the findings to the committee.",
      "After Abhronila has validated the algorithm, she presented the findings to the committee.",
      "After Abhronila had been validating the algorithm, she presents the findings to the committee."
    ],
    correctAnswer: 0,
    explanation: "Formula: 'After + Past Perfect (had + V3), Simple Past (V2)'. Validating happened first, followed by presenting.",
    explanationBn: "'After'-এর সংলগ্ন ক্লজটিতে প্রথম কাজের জন্য Past Perfect ('had validated') এবং দ্বিতীয় ক্লজে Simple Past ('presented') বসে।"
  },
  {
    id: "cap-q09",
    question: "Why is 'I have visited the Victoria Memorial yesterday' incorrect?",
    options: [
      "'Visited' requires the preposition 'to'.",
      "Present Perfect cannot co-occur with a finished past time anchor ('yesterday').",
      "'Memorial' should be capitalized as 'Memorials'.",
      "'Have' must be replaced with 'had' to form a continuous tense."
    ],
    correctAnswer: 1,
    explanation: "A finished specific past time anchor (yesterday, last year, in 2015, ago) is incompatible with the Present Perfect. The Simple Past 'I visited...' must be used.",
    explanationBn: "অতীতের নির্দিষ্ট সময়ের উল্লেখ ('yesterday') থাকলে Present Perfect ব্যবহার করা নিষিদ্ধ; Simple Past ('I visited') ব্যবহার করতে হয়।"
  },
  {
    id: "cap-q10",
    question: "Which tense combination correctly expresses simultaneous parallel actions in the past?",
    options: [
      "While Debanjan had practiced his violin, Tathagata solved calculus equations.",
      "While Debanjan was practicing his violin, Tathagata was solving calculus equations.",
      "While Debanjan practiced his violin, Tathagata had been solving calculus equations.",
      "While Debanjan has practiced his violin, Tathagata is solving calculus equations."
    ],
    correctAnswer: 1,
    explanation: "Two continuous actions unfolding at the same time in the past take Past Continuous in both clauses: 'While X was practicing, Y was solving'.",
    explanationBn: "অতীতে দুটি কাজ একসাথে সমান্তরালভাবে চলতে থাকলে উভয় ক্লজেই Past Continuous Tense ('was practicing ... was solving') ব্যবহৃত হয়।"
  },
  {
    id: "cap-q11",
    question: "Complete the sentence: 'We ______ each other for over a decade before we became research partners.'",
    options: [
      "had been knowing",
      "had known",
      "were knowing",
      "knew"
    ],
    correctAnswer: 1,
    explanation: "'Know' is a stative verb. Even though there is a duration ('for over a decade') before a past event, stative verbs cannot take continuous forms, requiring the Past Perfect Simple ('had known').",
    explanationBn: "'Know' একটি stative verb হওয়ায় continuous রূপ সম্ভব নয়; তাই 'had known' (Past Perfect Simple) সঠিক।"
  },
  {
    id: "cap-q12",
    question: "Select the sentence where 'used to' functions as an adjective meaning 'accustomed':",
    options: [
      "Subhendu is used to navigating chaotic Kolkata traffic.",
      "Subhendu used to navigate chaotic Kolkata traffic when he lived there.",
      "Subhendu didn't use to navigate traffic during rush hours.",
      "Did Subhendu use to drive a car?"
    ],
    correctAnswer: 0,
    explanation: "'Is used to navigating' uses 'be used to + gerund', where 'used' is a predicate adjective meaning 'accustomed to'.",
    explanationBn: "'Subhendu is used to navigating' বাক্যে 'is used to'-এর পর gerund বসেছে এবং এর অর্থ 'অভ্যস্ত'।"
  },
  {
    id: "cap-q13",
    question: "Spot the error: 'Scarcely had (A) the curtain risen (B) than the audience (C) began applauding enthusiastically (D).'",
    options: [
      "A",
      "B",
      "C",
      "D"
    ],
    correctAnswer: 2,
    explanation: "Part (C) contains 'than'. 'Scarcely had...' strictly correlates with 'when', not 'than'.",
    explanationBn: "'Scarcely had'-এর সাথে 'than' বসে না, 'when' বসাতে হয়।"
  },
  {
    id: "cap-q14",
    question: "Which of the following describes a past habitual state that is NO LONGER true?",
    options: [
      "Swadeep lives in Barrackpore.",
      "Swadeep is used to living in Barrackpore.",
      "Swadeep used to live in Barrackpore.",
      "Swadeep would live in Barrackpore."
    ],
    correctAnswer: 2,
    explanation: "'Used to live' conveys a past continuous state/residence that is discontinued in the present.",
    explanationBn: "'Used to live' অতীতে বাসস্থান ছিল কিন্তু বর্তমানে সেখানে আর থাকে না তা প্রকাশ করে।"
  },
  {
    id: "cap-q15",
    question: "Identify the correct narrative sequence: 'The detective (enter) the study, (notice) the broken latch, and (realize) someone (steal) the diary.'",
    options: [
      "entered, noticed, realized, had stolen",
      "had entered, noticed, realized, stole",
      "entered, had noticed, realized, had stolen",
      "was entering, noticed, was realizing, had stolen"
    ],
    correctAnswer: 0,
    explanation: "The chronological sequential actions of the detective take Simple Past (entered, noticed, realized), while the prior theft that took place before his arrival takes Past Perfect (had stolen).",
    explanationBn: "গোয়েন্দার ধারাবাহিক কাজগুলি Simple Past (entered, noticed, realized) এবং তার পূর্বে ঘটে যাওয়া চুরিটি Past Perfect (had stolen) হবে।"
  },
  {
    id: "cap-q16",
    question: "Choose the sentence with correct word order for inversion using 'did':",
    options: [
      "No sooner did the bell rang than the students dispersed.",
      "No sooner did the bell ring than the students dispersed.",
      "No sooner did the bell ring when the students dispersed.",
      "No sooner had the bell ring than the students dispersed."
    ],
    correctAnswer: 1,
    explanation: "When 'did' is used for inversion, the main verb is base form V1 ('ring') and pairs with 'than': 'No sooner did the bell ring than...'",
    explanationBn: "'Did' দ্বারা inversion হলে verb-এর V1 রূপ ('ring') বসবে এবং 'No sooner'-এর সাথে 'than' বসবে।"
  },
  {
    id: "cap-q17",
    question: "What does the sentence 'When the phone rang, Priyabrata answered it' imply?",
    options: [
      "Priyabrata was already answering the phone when it started to ring.",
      "The phone rang first, and immediately afterward Priyabrata answered it.",
      "Priyabrata had answered the phone before it rang.",
      "Priyabrata answers the phone habitually every day."
    ],
    correctAnswer: 1,
    explanation: "Two Simple Past clauses connected with 'When' indicate immediate sequential action (Action 1 followed directly by Action 2).",
    explanationBn: "'When'-এর সাথে দুটিই Simple Past থাকলে বোঝায় ফোন বাজার সঙ্গে সঙ্গে প্রিয়ব্রত তা ধরেছিল।"
  },
  {
    id: "cap-q18",
    question: "What does the sentence 'When the phone rang, Priyabrata was answering emails' imply?",
    options: [
      "Priyabrata started typing emails only after the phone rang.",
      "Priyabrata's email typing was already in progress when the ringing interrupted him.",
      "Priyabrata had finished all emails before the phone rang.",
      "Priyabrata refused to answer the phone."
    ],
    correctAnswer: 1,
    explanation: "'Past Continuous + When + Simple Past' indicates that an ongoing background activity was interrupted by a sudden discrete event.",
    explanationBn: "ইমেল লেখার কাজটি চলছিল (Past Continuous), সেই মুহূর্তে ফোন বেজে ওঠার ঘটনাটি ঘটে (Simple Past)।"
  },
  {
    id: "cap-q19",
    question: "Choose the correct sentence to describe past single achievement:",
    options: [
      "In 2021, Sukanta Sir used to establish the advanced physics laboratory.",
      "In 2021, Sukanta Sir would establish the advanced physics laboratory.",
      "In 2021, Sukanta Sir established the advanced physics laboratory.",
      "In 2021, Sukanta Sir had been establishing the advanced physics laboratory."
    ],
    correctAnswer: 2,
    explanation: "A single event completed at a specified date in the past ('In 2021') requires the Simple Past (V2): 'established'. Neither 'used to' nor 'would' can apply to single events.",
    explanationBn: "অতীতে কোনো নির্দিষ্ট সালে একবার সম্পন্ন কাজের জন্য শুধুমাত্র Simple Past (V2) 'established' বসবে।"
  },
  {
    id: "cap-q20",
    question: "Fill in the blank: 'By 9 PM last night, the team ______ all thirty diagnostic trials.'",
    options: [
      "completed",
      "had completed",
      "was completing",
      "has completed"
    ],
    correctAnswer: 1,
    explanation: "'By + specific past time milestone' ('By 9 PM last night') requires the Past Perfect Tense ('had completed') to show completion before that deadline.",
    explanationBn: "'By + অতীতের নির্দিষ্ট সময়' থাকলে সেই সময়ের পূর্বে কাজ সম্পন্ন হওয়া বোঝাতে Past Perfect ('had completed') বসে।"
  },
  {
    id: "cap-q21",
    question: "Identify the sentence that correctly uses 'barely...when':",
    options: [
      "Barely had the spacecraft touched the lunar surface when communication was established.",
      "Barely had the spacecraft touched the lunar surface than communication was established.",
      "Barely did the spacecraft touched the lunar surface when communication was established.",
      "Barely the spacecraft had touched the lunar surface when communication was established."
    ],
    correctAnswer: 0,
    explanation: "'Barely had + Subject + V3' correctly pairs with 'WHEN' and enforces subject-auxiliary inversion.",
    explanationBn: "'Barely had + Subject + V3 ... when' সম্পূর্ণ নির্ভুল inversion বাক্যগঠন।"
  },
  {
    id: "cap-q22",
    question: "Select the sentence with INCORRECT tense usage:",
    options: [
      "She had lived in London for three years before moving to Paris.",
      "She has lived in London for three years in 2015.",
      "She was living in London when she met her mentor.",
      "She used to live in London during her doctoral studies."
    ],
    correctAnswer: 1,
    explanation: "'in 2015' is a closed past time period, making 'has lived' (Present Perfect) grammatically invalid. It must be 'She lived in London... in 2015'.",
    explanationBn: "'in 2015' একটি সমাপ্ত অতীত সময়, তাই 'has lived' (Present Perfect) মারাত্মক ভুল। সঠিক রূপ হবে 'She lived'।"
  },
  {
    id: "cap-q23",
    question: "Which form is required: 'We did not ______ that the seminar had been rescheduled.'",
    options: [
      "knew",
      "know",
      "known",
      "knowing"
    ],
    correctAnswer: 1,
    explanation: "'Did not' is followed strictly by the base infinitive form V1 ('know').",
    explanationBn: "'Did not'-এর পর মূল ক্রিয়ার Base Form (V1) 'know' বসবে।"
  },
  {
    id: "cap-q24",
    question: "Determine the correct sentence:",
    options: [
      "No sooner had the whistle blown than the runners surged forward.",
      "No sooner had the whistle blown then the runners surged forward.",
      "No sooner the whistle had blown than the runners surged forward.",
      "No sooner had the whistle blew than the runners surged forward."
    ],
    correctAnswer: 0,
    explanation: "Option A has accurate inversion ('had the whistle blown'), correct V3 ('blown'), and correct correlative conjunction ('than').",
    explanationBn: "Option A-তে সঠিক Inversion ('had the whistle blown') এবং সঠিক যোজক 'than' প্রযুক্ত হয়েছে।"
  },
  {
    id: "cap-q25",
    question: "Choose the comprehensive capstone principle that governs all past narrative sequences:",
    options: [
      "Past Perfect is used for every action that occurred in the past.",
      "Past Perfect is used ONLY to establish temporal priority of an earlier event over another past event or past benchmark.",
      "Simple Past can never be used in a sentence containing more than one clause.",
      "Past Continuous and Past Perfect Continuous are completely interchangeable in all contexts."
    ],
    correctAnswer: 1,
    explanation: "Past Perfect is the 'Past of the Past'. It is strictly used to signal that an action preceded another past event or milestone, establishing unequivocal chronological priority.",
    explanationBn: "Past Perfect হলো 'Past of the Past'—অতীতের দুটি ঘটনার মধ্যে যেটি অপেক্ষাকৃত পূর্বে ঘটেছিল তার অগ্রাধিকার নির্দেশ করতেই এটি ব্যবহৃত হয়।"
  }
];

export default questions;
