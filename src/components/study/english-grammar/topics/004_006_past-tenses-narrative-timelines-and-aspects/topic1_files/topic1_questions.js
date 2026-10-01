const questions = [
  {
    id: 1,
    question: "Select the sentence where an ongoing past background action is interrupted by a sudden event:",
    options: [
      "I was driving home when a sudden thunderstorm erupted.",
      "I drove home and then a sudden thunderstorm erupted.",
      "While I drove, the thunderstorm was erupting.",
      "I have been driving when the thunderstorm erupted."
    ],
    correctAnswer: 0,
    explanation: "'Was driving' (Past Continuous) establishes the ongoing background activity, interrupted by 'erupted' (Simple Past V2).",
    explanationBn: "'Was driving' (চলমান ব্যাকগ্রাউন্ড ক্রিয়া) হঠাৎ 'erupted' (Simple Past) দ্বারা বাধাগ্রস্ত হয়েছে।"
  },
  {
    id: 2,
    question: "Fill in the blank: 'While the professor ______ the lecture, the students ______ copious notes.'",
    options: [
      "delivered; were taking",
      "was delivering; were taking",
      "had delivered; took",
      "was delivering; took"
    ],
    correctAnswer: 1,
    explanation: "Two parallel simultaneous ongoing past actions introduced by 'while' both take Past Continuous ('was delivering; were taking').",
    explanationBn: "'While' দ্বারা সংযুক্ত দুটি সমান্তরাল অতীত ক্রিয়ায় উভয় ক্লজেই Past Continuous বসে।"
  },
  {
    id: 3,
    question: "Spot the stative verb error in Past Continuous:",
    options: [
      "She was knowing all the irregular verb forms by heart.",
      "She knew all the irregular verb forms by heart.",
      "She was revising her irregular verbs.",
      "She was reciting the irregular verbs."
    ],
    correctAnswer: 0,
    explanation: "'Know' is a stative verb and cannot be used in Past Continuous (*was knowing). The correct form is 'knew'.",
    explanationBn: "'Know' একটি Stative Verb, তাই 'was knowing' ভুল; 'knew' হবে।"
  },
  {
    id: 4,
    question: "Fill in the blank: 'At exactly 08:30 PM last night, Swadeep ______ his code repository.'",
    options: [
      "audited",
      "was auditing",
      "has audited",
      "is auditing"
    ],
    correctAnswer: 1,
    explanation: "An exact reference milestone in the past ('At 8:30 PM last night') points to an action in progress at that moment ('was auditing').",
    explanationBn: "অতীতের নির্দিষ্ট মুহূর্তে চলমান কাজ বোঝাতে 'was auditing' ব্যবহৃত হয়।"
  },
  {
    id: 5,
    question: "Choose the grammatically pure sentence with 'when':",
    options: [
      "Abhronila cooked dinner when the door bell was ringing.",
      "Abhronila was cooking dinner when the door bell rang.",
      "Abhronila was cooking dinner when the door bell had rung.",
      "Abhronila had cooked dinner when the door bell was ringing."
    ],
    correctAnswer: 1,
    explanation: "Ongoing background action (was cooking) + WHEN + sudden interruption (rang).",
    explanationBn: "'Was cooking' (চলমান কাজ) + when + 'rang' (হঠাৎ ঘটে যাওয়া কাজ)।"
  },
  {
    id: 6,
    question: "Fill in the blank: 'The laboratory technicians ______ safety goggles throughout the chemical synthesis.'",
    options: [
      "were wearing",
      "wore",
      "have worn",
      "was wearing"
    ],
    correctAnswer: 0,
    explanation: "Plural subject 'technicians' takes 'were wearing' to denote continuous action throughout the duration.",
    explanationBn: "Plural Subject 'technicians'-এর সাথে 'were wearing' বসবে।"
  },
  {
    id: 7,
    question: "Which of the following sentences correctly expresses simultaneous past actions?",
    options: [
      "While Tuhina was singing, Sourav was playing the guitar.",
      "While Tuhina sang, Sourav played guitar yesterday.",
      "Tuhina was singing when Sourav was playing guitar.",
      "Tuhina sang when Sourav had played guitar."
    ],
    correctAnswer: 0,
    explanation: "'While Tuhina was singing, Sourav was playing...' perfectly expresses two simultaneous actions occurring in parallel.",
    explanationBn: "'While' সহযোগে দুটি সমান্তরাল কাজ বোঝাতে উভয়টিতে Past Continuous ব্যবহৃত হয়েছে।"
  },
  {
    id: 8,
    question: "Spot the error: 'I was seeing (A) a solitary heron (B) resting by the riverbank yesterday (C).'",
    options: [
      "was seeing (A)",
      "a solitary heron (B)",
      "resting by the riverbank yesterday (C)",
      "No error"
    ],
    correctAnswer: 0,
    explanation: "Involuntary sensory perception 'see' is stative and cannot take continuous form (*was seeing). Use 'I saw a solitary heron'.",
    explanationBn: "ইন্দ্রিয় অনুভূতি 'see' Stative Verb হওয়ায় 'was seeing' ভুল; 'I saw' হবে।"
  },
  {
    id: 9,
    question: "Fill in the blank: 'What ______ you ______ at this time yesterday afternoon?'",
    options: [
      "were; doing",
      "did; do",
      "have; done",
      "had; been doing"
    ],
    correctAnswer: 0,
    explanation: "Inquiring about an ongoing activity at a specific reference point yesterday takes 'were you doing'.",
    explanationBn: "গতকাল এই সময়ে কী করছিলেন তা জানতে 'were you doing' ব্যবহৃত হয়।"
  },
  {
    id: 10,
    question: "Complete the sentence: 'The patient ______ in pain while the paramedic ______ the bandage.'",
    options: [
      "was groaning; was applying",
      "groaned; applied",
      "was groaning; applied",
      "had groand; was applying"
    ],
    correctAnswer: 0,
    explanation: "Parallel continuous activities happening simultaneously: 'was groaning; was applying'.",
    explanationBn: "উভয় কাজ একই সাথে চলায় Past Continuous 'was groaning; was applying' হবে।"
  },
  {
    id: 11,
    question: "Why is 'The fire was destroying the entire warehouse before the engines arrived' flawed?",
    options: [
      "Because 'destroying' requires an adverb.",
      "Because when one past event was completed BEFORE another past event, Past Perfect ('had destroyed') is required, not Past Continuous.",
      "Because 'warehouse' is singular.",
      "Because 'before' requires Future Tense."
    ],
    correctAnswer: 1,
    explanation: "Completed event before another past event requires Past Perfect ('had destroyed'), not Past Continuous.",
    explanationBn: "অতীতের অপর একটি ঘটনার পূর্বে সম্পন্ন হওয়া বোঝাতে Past Perfect 'had destroyed' প্রয়োজন।"
  },
  {
    id: 12,
    question: "Fill in the blank: 'Neither Debopam nor his companions ______ attention to the warning sirens.'",
    options: [
      "was paying",
      "were paying",
      "has paid",
      "is paying"
    ],
    correctAnswer: 1,
    explanation: "In 'neither... nor', the verb agrees with the closer plural subject 'his companions' -> 'were paying'.",
    explanationBn: "কাছের Subject 'his companions' Plural হওয়ায় 'were paying' হবে।"
  },
  {
    id: 13,
    question: "Choose the sentence where 'when' introduces the sudden interrupter:",
    options: [
      "The lights went out when we were eating dinner.",
      "We were eating dinner when the lights went out.",
      "Both A and B are syntactically standard.",
      "Neither A nor B is correct."
    ],
    correctAnswer: 2,
    explanation: "Both 'When we were eating, lights went out' and 'We were eating when lights went out' are valid, though placing 'when' before the Simple Past clause is classic.",
    explanationBn: "উভয় বাক্যই ব্যাকরণগতভাবে প্রমিত।"
  },
  {
    id: 14,
    question: "Identify the correct negative Past Continuous sentence:",
    options: [
      "He was not wearing his helmet when he fell off the scooter.",
      "He did not wearing his helmet when he fell.",
      "He was not wear his helmet.",
      "He had not wearing his helmet."
    ],
    correctAnswer: 0,
    explanation: "Subject + was not + V-ing ('was not wearing').",
    explanationBn: "'Was not wearing' হলো সঠিক নেগেটিভ রূপ।"
  },
  {
    id: 15,
    question: "Complete the sentence: 'As the storm ______ in intensity, the sailors ______ down the hatches.'",
    options: [
      "was growing; were battening",
      "grew; battened",
      "had grown; were battening",
      "was growing; battened"
    ],
    correctAnswer: 0,
    explanation: "Simultaneous dynamic progression: 'was growing; were battening'.",
    explanationBn: "ঝড় বৃদ্ধি পাওয়া এবং নাবিকদের তৎপরতা একই সাথে চলায় 'was growing; were battening' সঠিক।"
  },
  {
    id: 16,
    question: "Spot the error: 'While Sukanta Sir explained (A) the concord rules, the students (B) were listening with rapt attention (C).'",
    options: [
      "explained (A)",
      "the concord rules, the students (B)",
      "were listening with rapt attention (C)",
      "No error"
    ],
    correctAnswer: 0,
    explanation: "With 'While', the ongoing lecturing activity should be in Past Continuous: 'While Sukanta Sir was explaining...'",
    explanationBn: "'While'-এর সাথে চলমান কাজ বোঝাতে 'was explaining' হওয়া উচিত।"
  },
  {
    id: 17,
    question: "Fill in the blank: 'The archaeological team ______ the trench when they ______ upon a gold coin.'",
    options: [
      "was excavating; stumbled",
      "excavated; was stumbling",
      "had excavated; stumbled",
      "were excavating; stumbled"
    ],
    correctAnswer: 3,
    explanation: "'Team' acting collectively with plural members + sudden discovery ('were excavating; stumbled').",
    explanationBn: "'Were excavating' (চলমান খনন) + 'stumbled' (হঠাৎ আবিষ্কার)।"
  },
  {
    id: 18,
    question: "Which of the following verbs is DYNAMIC and accepts Past Continuous freely?",
    options: [
      "Belong",
      "Construct",
      "Resemble",
      "Consist"
    ],
    correctAnswer: 1,
    explanation: "'Construct' is a dynamic action verb ('they were constructing a bridge'). Belong, resemble, and consist are stative.",
    explanationBn: "'Construct' একটি Dynamic Verb, যা অনায়াসে Past Continuous গঠন করে।"
  },
  {
    id: 19,
    question: "Fill in the blank: 'Why ______ you ______ so fast when the traffic police stopped your vehicle?'",
    options: [
      "were; driving",
      "did; drive",
      "had; driven",
      "was; driving"
    ],
    correctAnswer: 0,
    explanation: "Action in progress at the moment of being stopped: 'were you driving'.",
    explanationBn: "ট্রাফিক পুলিশ থামানোর মুহূর্তে চলমান গতি বোঝাতে 'were you driving' হবে।"
  },
  {
    id: 20,
    question: "Choose the sentence that correctly conveys annoyance toward a past habit:",
    options: [
      "He was always complaining about the laboratory equipment in his college days!",
      "He always complained about the equipment yesterday.",
      "He had always complained about the equipment.",
      "He complained always about the equipment."
    ],
    correctAnswer: 0,
    explanation: "Past Continuous + 'always' ('was always complaining!') conveys exasperation toward a past persistent habit.",
    explanationBn: "অতীতের বিরক্তিকর স্বভাব প্রকাশে 'was always complaining!' ব্যবহৃত হয়।"
  },
  {
    id: 21,
    question: "Complete the sentence: 'The birds ______ high in the thermals while the gliders ______ silent maneuvers.'",
    options: [
      "were soaring; were executing",
      "soared; executed",
      "were soaring; executed",
      "had soared; were executing"
    ],
    correctAnswer: 0,
    explanation: "Simultaneous ongoing flight activities in the past: 'were soaring; were executing'.",
    explanationBn: "উভয় ক্রিয়াই একই সাথে ঘটায় 'were soaring; were executing' সঠিক।"
  },
  {
    id: 22,
    question: "Identify the sentence that contains NO grammatical errors:",
    options: [
      "When the alarm was ringing, Swadeep jumped out of bed.",
      "When the alarm rang, Swadeep was jumping out of bed.",
      "When the alarm rang, Swadeep jumped out of bed.",
      "Swadeep was jumping when alarm was ringing."
    ],
    correctAnswer: 2,
    explanation: "Two quick consecutive actions in narrative sequence both take Simple Past ('When the alarm rang, Swadeep jumped out of bed').",
    explanationBn: "অতীতের দুটি তাৎক্ষণিক পরপর ঘটনায় উভয়টিতেই Simple Past বসে।"
  },
  {
    id: 23,
    question: "Fill in the blank: 'The generator ______ a loud grinding noise right before it broke down.'",
    options: [
      "was emitting",
      "emitted",
      "has emitted",
      "is emitting"
    ],
    correctAnswer: 0,
    explanation: "Ongoing warning state immediately prior to breakdown: 'was emitting'.",
    explanationBn: "যন্ত্র বিকল হওয়ার ঠিক পূর্বে চলমান অবস্থা বোঝাতে 'was emitting' সঠিক।"
  },
  {
    id: 24,
    question: "Transform into Past Continuous: 'She read a novel all evening.'",
    options: [
      "She was reading a novel all evening.",
      "She has been reading a novel all evening.",
      "She had read a novel all evening.",
      "She was read a novel all evening."
    ],
    correctAnswer: 0,
    explanation: "'She was reading a novel all evening' emphasizes the unbroken continuous past duration.",
    explanationBn: "'She was reading a novel all evening' সঠিক রূপ।"
  },
  {
    id: 25,
    question: "What is the core syntactic formula for an interrupted past action?",
    options: [
      "[Past Continuous] + WHEN + [Simple Past (V2)]",
      "[Simple Past] + WHILE + [Simple Past]",
      "[Past Perfect] + WHEN + [Past Continuous]",
      "[Future Simple] + WHEN + [Simple Past]"
    ],
    correctAnswer: 0,
    explanation: "[Past Continuous] + WHEN + [Simple Past (V2)] is the universal formula for interrupted past actions.",
    explanationBn: "[Past Continuous] + WHEN + [Simple Past (V2)] হলো বাধাগ্রস্ত অতীত ক্রিয়ার সার্বজনীন সূত্র।"
  }
];

export default questions;
