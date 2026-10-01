const questions = [
  {
    id: 1,
    question: "Complete the sentence according to the 'Before' formula: 'The flight ______ before we ______ the boarding gate.'",
    options: [
      "had taken off; reached",
      "took off; had reached",
      "has taken off; reached",
      "took off; reached"
    ],
    correctAnswer: 0,
    explanation: "Earlier action precedes 'before' (had taken off), while later action follows 'before' (reached).",
    explanationBn: "'Before'-এর পূর্বের ক্লজে Past Perfect (had taken off) এবং পরের ক্লজে Simple Past (reached) বসে।"
  },
  {
    id: 2,
    question: "Complete the sentence according to the 'After' formula: 'The inspector ______ the crime scene after the forensic experts ______ all fingerprints.'",
    options: [
      "examined; had collected",
      "had examined; collected",
      "examined; collected",
      "has examined; collected"
    ],
    correctAnswer: 0,
    explanation: "Later action precedes 'after' (examined), while earlier action follows 'after' (had collected).",
    explanationBn: "'After'-এর পূর্বের ক্লজে Simple Past (examined) এবং পরের ক্লজে Past Perfect (had collected) বসে।"
  },
  {
    id: 3,
    question: "Fill in the blank using the 'By the time' formula: 'By the time the rescue team ______ the stranded hikers, the blizzard ______.'",
    options: [
      "reached; had stopped",
      "had reached; stopped",
      "reached; stopped",
      "has reached; had stopped"
    ],
    correctAnswer: 0,
    explanation: "'By the time' clause takes Simple Past (reached); main clause takes Past Perfect (had stopped).",
    explanationBn: "'By the time' ক্লজে Simple Past ('reached') এবং প্রধান ক্লজে Past Perfect ('had stopped') বসে।"
  },
  {
    id: 4,
    question: "Spot the error: 'The audience had left (A) the auditorium (B) after the performance ended (C).'",
    options: [
      "had left (A)",
      "the auditorium (B)",
      "after the performance ended (C)",
      "No error"
    ],
    correctAnswer: 0,
    explanation: "Under the 'after' formula, the clause before 'after' takes Simple Past ('left') and the clause after 'after' takes Past Perfect ('had ended').",
    explanationBn: "'After'-এর পূর্বে Simple Past ('left') এবং পরে Past Perfect ('had ended') হওয়া উচিত।"
  },
  {
    id: 5,
    question: "Choose the correct sentence expressing a rapid consecutive sequence without gap:",
    options: [
      "As soon as the bell rang, the students submitted their answer scripts.",
      "As soon as the bell had rung, the students had submitted their answer scripts.",
      "As soon as the bell rang, the students have submitted.",
      "The bell had rung as soon as students submitted."
    ],
    correctAnswer: 0,
    explanation: "Immediate consecutive actions with 'as soon as' both use Simple Past ('rang; submitted').",
    explanationBn: "'As soon as' দিয়ে তাৎক্ষণিক পরপর ঘটা ক্রিয়ায় উভয়টিতেই Simple Past বসে।"
  },
  {
    id: 6,
    question: "Fill in the blank: 'We ______ dinner after the guest of honor ______.'",
    options: [
      "served; had arrived",
      "had served; arrived",
      "served; arrived",
      "were serving; arrived"
    ],
    correctAnswer: 0,
    explanation: "Arrival occurred first (had arrived), followed by serving dinner (served).",
    explanationBn: "অতিথি আগে আসায় 'had arrived' এবং ডিনার পরে পরিবেশন করায় 'served' হবে।"
  },
  {
    id: 7,
    question: "Complete the sentence: 'By the time Swadeep ______ his laptop, the online test ______.'",
    options: [
      "booted; had commenced",
      "had booted; commenced",
      "booted; commenced",
      "was booting; had commenced"
    ],
    correctAnswer: 0,
    explanation: "The test commenced before he booted the laptop: 'By the time Swadeep booted... test had commenced'.",
    explanationBn: "ল্যাপটপ অন করার পূর্বেই পরীক্ষা শুরু হওয়ায় 'booted; had commenced' সঠিক।"
  },
  {
    id: 8,
    question: "Which of the following sentences adheres to the 'Before' mnemonic ('Before-এর পূর্বে Had + V3')?",
    options: [
      "The sun had set before we completed the trek.",
      "The sun set before we had completed the trek.",
      "The sun has set before we completed the trek.",
      "The sun was setting before we had completed."
    ],
    correctAnswer: 0,
    explanation: "'The sun had set before we completed the trek' follows the exact 'Before' formula.",
    explanationBn: "'Had set before we completed' হলো আদর্শ সূত্র।"
  },
  {
    id: 9,
    question: "Fill in the blank: 'The bell ______ before the invigilator ______ the question papers.'",
    options: [
      "had rung; distributed",
      "rang; had distributed",
      "had rung; had distributed",
      "was ringing; distributed"
    ],
    correctAnswer: 0,
    explanation: "Earlier action (had rung) + BEFORE + later action (distributed).",
    explanationBn: "ঘণ্টা আগে বাজায় 'had rung' এবং প্রশ্নপত্র পরে বিতরণ করায় 'distributed' হবে।"
  },
  {
    id: 10,
    question: "Spot the error: 'By the time we had arrived (A) at the theatre, (B) all tickets had been sold out (C).'",
    options: [
      "By the time we had arrived (A)",
      "at the theatre, (B)",
      "all tickets had been sold out (C)",
      "No error"
    ],
    correctAnswer: 0,
    explanation: "'By the time' clause takes Simple Past ('we arrived'), not Past Perfect. Say: 'By the time we arrived...'",
    explanationBn: "'By the time'-এর ক্লজে Past Perfect হয় না; Simple Past ('we arrived') হবে।"
  },
  {
    id: 11,
    question: "Transform into an 'After' construction: 'The doctor arrived. Before that, the patient died.'",
    options: [
      "The doctor arrived after the patient had died.",
      "The doctor had arrived after the patient died.",
      "The patient died after the doctor had arrived.",
      "The doctor arrived after the patient died."
    ],
    correctAnswer: 0,
    explanation: "The patient died first (had died), then the doctor arrived (arrived): 'The doctor arrived after the patient had died.'",
    explanationBn: "'The doctor arrived after the patient had died' হলো সঠিক রূপান্তর।"
  },
  {
    id: 12,
    question: "Fill in the blank: 'The suspect ______ the country before the arrest warrant ______ issued.'",
    options: [
      "had fled; was",
      "fled; had been",
      "has fled; was",
      "fled; was"
    ],
    correctAnswer: 0,
    explanation: "Fleeing happened before warrant issuance: 'had fled... before warrant was issued'.",
    explanationBn: "গ্রেফতারি পরোয়ানা জারির আগেই দেশত্যাগ করায় 'had fled; was' হবে।"
  },
  {
    id: 13,
    question: "Choose the correct sentence:",
    options: [
      "The match resumed after the rain had stopped.",
      "The match had resumed after the rain stopped.",
      "The match resumed after the rain has stopped.",
      "The match was resuming after rain stopped."
    ],
    correctAnswer: 0,
    explanation: "Rain stopped first (had stopped); match resumed later (resumed).",
    explanationBn: "বৃষ্টি আগে থামায় 'had stopped' এবং ম্যাচ পরে শুরু হওয়ায় 'resumed' হবে।"
  },
  {
    id: 14,
    question: "Complete the sentence: 'By the time the semester ______, Tuhina ______ forty research articles.'",
    options: [
      "ended; had read",
      "had ended; read",
      "ended; read",
      "has ended; had read"
    ],
    correctAnswer: 0,
    explanation: "Reading 40 articles preceded the end of the semester ('ended; had read').",
    explanationBn: "সেমিস্টার শেষ হওয়ার আগেই ৪০টি নিবন্ধ পড়া শেষ হওয়ায় 'ended; had read' সঠিক।"
  },
  {
    id: 15,
    question: "Spot the error: 'The train left (A) before we (B) had reached the station (C).'",
    options: [
      "The train left (A)",
      "before we (B)",
      "had reached the station (C)",
      "No error"
    ],
    correctAnswer: 0,
    explanation: "Under the 'before' rule, earlier action before 'before' must be Past Perfect: 'The train had left before we reached...'",
    explanationBn: "'The train had left before we reached' হওয়া উচিত।"
  },
  {
    id: 16,
    question: "Fill in the blank: 'As soon as the thief saw the police patrol, he ______ into the narrow alley.'",
    options: [
      "dashed",
      "had dashed",
      "has dashed",
      "was dashing"
    ],
    correctAnswer: 0,
    explanation: "Instantaneous reflexive reaction with 'as soon as' takes Simple Past ('dashed').",
    explanationBn: "পুলিশ দেখে চোরের সাথে সাথে ছুটে পালানোয় Simple Past ('dashed') বসবে।"
  },
  {
    id: 17,
    question: "Choose the sentence where 'By the time' correctly sets a past deadline:",
    options: [
      "By the time the sun set, the climbers had reached the summit.",
      "By the time the sun had set, the climbers reached the summit.",
      "By the time the sun set, the climbers reached the summit.",
      "By the time the sun was setting, the climbers have reached."
    ],
    correctAnswer: 0,
    explanation: "'By the time the sun set, the climbers had reached the summit' is 100% syntactically pure.",
    explanationBn: "'By the time the sun set, the climbers had reached the summit' সম্পূর্ণ শুদ্ধ।"
  },
  {
    id: 18,
    question: "Fill in the blank: 'Debopam ______ the laboratory clean after he ______ all titration experiments.'",
    options: [
      "left; had completed",
      "had left; completed",
      "left; completed",
      "was leaving; completed"
    ],
    correctAnswer: 0,
    explanation: "Experiments completed first (had completed); leaving laboratory clean occurred second (left).",
    explanationBn: "পরীক্ষা সম্পন্ন আগে হওয়ায় 'had completed' এবং ল্যাব ত্যাগ পরে হওয়ায় 'left' হবে।"
  },
  {
    id: 19,
    question: "Why is 'The patient died before the doctor had arrived' ungrammatical?",
    options: [
      "Because the doctor's arrival happened after the patient died, so arrival cannot take Past Perfect.",
      "Because 'patient' is a singular noun.",
      "Because 'before' must always be at the start of a sentence.",
      "Because 'died' is an irregular verb."
    ],
    correctAnswer: 0,
    explanation: "The earlier event was the death (had died); the arrival was later (arrived). Placing Past Perfect on the later event reverses the timeline!",
    explanationBn: "রোগী আগে মারা গেছেন এবং ডাক্তার পরে এসেছেন; তাই ভুল ক্লজে Past Perfect দিলে সময়রেখা বিকৃত হয়।"
  },
  {
    id: 20,
    question: "Complete the sentence: 'By the time the auction closed, the antique manuscript ______ for record millions.'",
    options: [
      "had been sold",
      "was sold",
      "has been sold",
      "is sold"
    ],
    correctAnswer: 0,
    explanation: "Sale concluded prior to the auction closing ('had been sold').",
    explanationBn: "নিলাম শেষ হওয়ার পূর্বেই পাণ্ডুলিপিটি বিক্রি হয়ে যাওয়ায় 'had been sold' হবে।"
  },
  {
    id: 21,
    question: "Identify the correct pairing for an 'After' sentence:",
    options: [
      "V2 + AFTER + had + V3",
      "had + V3 + AFTER + V2",
      "V1 + AFTER + V2",
      "V2 + AFTER + V2"
    ],
    correctAnswer: 0,
    explanation: "The universal formula: [Later: Simple Past V2] + AFTER + [Earlier: Past Perfect had + V3].",
    explanationBn: "সঠিক সার্বজনীন সূত্র: V2 + AFTER + had + V3।"
  },
  {
    id: 22,
    question: "Fill in the blank: 'The spacecraft ______ millions of kilometers before its primary thrusters ______.'",
    options: [
      "had traveled; failed",
      "traveled; had failed",
      "traveled; failed",
      "was traveling; failed"
    ],
    correctAnswer: 0,
    explanation: "Traveling millions of kilometers happened before thrusters failed ('had traveled; failed').",
    explanationBn: "থ্রাস্টার বিকল হওয়ার আগেই মহাকাশযানটি লক্ষ কিলোমিটার পথ পাড়ি দিয়েছিল ('had traveled; failed')।"
  },
  {
    id: 23,
    question: "Spot the error: 'By the time the concert (A) had commenced at 7 PM, (B) the hall was completely packed (C).'",
    options: [
      "By the time the concert (A)",
      "had commenced at 7 PM, (B)",
      "the hall was completely packed (C)",
      "No error"
    ],
    correctAnswer: 1,
    explanation: "'By the time' clause takes Simple Past: 'commenced at 7 PM'.",
    explanationBn: "'By the time' ক্লজে 'commenced' হবে, 'had commenced' নয়।"
  },
  {
    id: 24,
    question: "Transform into a 'Before' sentence: 'Swadeep verified the code. Then he deployed it.'",
    options: [
      "Swadeep had verified the code before he deployed it.",
      "Swadeep verified the code before he had deployed it.",
      "Swadeep had deployed the code before he verified it.",
      "Swadeep deployed the code before he was verifying it."
    ],
    correctAnswer: 0,
    explanation: "Verification happened first (had verified), deployment second (deployed).",
    explanationBn: "'Swadeep had verified the code before he deployed it' হলো সঠিক রূপ।"
  },
  {
    id: 25,
    question: "Which formula summarizes the 'Before' and 'After' rules in one line?",
    options: [
      "Past Perfect sits BEFORE 'before' and AFTER 'after'.",
      "Past Perfect sits AFTER 'before' and BEFORE 'after'.",
      "Past Perfect is never used with before or after.",
      "Simple Past always precedes both connectives."
    ],
    correctAnswer: 0,
    explanation: "Past Perfect (had + V3) sits BEFORE the word 'before' (had + V3 before V2) and AFTER the word 'after' (V2 after had + V3).",
    explanationBn: "Past Perfect (had + V3) বসে Before-এর পূর্বে এবং After-এর পরে।"
  }
];

export default questions;
