const questions = [
  {
    id: 1,
    question: "Identify the earlier past action in: 'When we reached the cinema hall, the film had already started.'",
    options: [
      "Reaching the cinema hall",
      "Starting of the film",
      "Both occurred simultaneously",
      "Neither occurred"
    ],
    correctAnswer: 1,
    explanation: "The action expressed in the Past Perfect ('had already started') is the earlier event; reaching the hall was the later event.",
    explanationBn: "'Had already started' (Past Perfect) নির্দেশ করে সিনেমাটি আগে শুরু হয়েছিল।"
  },
  {
    id: 2,
    question: "Fill in the blank: 'The patient ______ before the surgeon ______ the operation theatre.'",
    options: [
      "died; had entered",
      "had died; entered",
      "has died; entered",
      "was dying; had entered"
    ],
    correctAnswer: 1,
    explanation: "Earlier action (had died) precedes 'before', while later action takes Simple Past (entered).",
    explanationBn: "পূর্বে ঘটা কাজে Past Perfect ('had died') এবং পরে ঘটা কাজে Simple Past ('entered') বসে।"
  },
  {
    id: 3,
    question: "Spot the fatal single isolated past action error:",
    options: [
      "I completed the assignment yesterday.",
      "I had completed the assignment yesterday.",
      "I had completed the assignment before the teacher arrived.",
      "I was completing the assignment yesterday evening."
    ],
    correctAnswer: 1,
    explanation: "'I had completed the assignment yesterday' is ungrammatical because there is no second past reference event. Simple Past 'completed' is required.",
    explanationBn: "দ্বিতীয় কোনো অতীত ঘটনার উল্লেখ না থাকলে একক অতীতের জন্য 'had completed' ভুল; 'completed' হবে।"
  },
  {
    id: 4,
    question: "Fill in the blank: 'Swadeep realized that he ______ his umbrella in the lecture hall.'",
    options: [
      "forgot",
      "had forgotten",
      "has forgotten",
      "was forgetting"
    ],
    correctAnswer: 1,
    explanation: "Leaving the umbrella happened prior to the realization, requiring Past Perfect ('had forgotten').",
    explanationBn: "ছাতা ভুলে ফেলে আসার কাজটি বুঝতে পারার আগেই ঘটেছিল, তাই 'had forgotten' হবে।"
  },
  {
    id: 5,
    question: "Choose the correct sequence with 'after':",
    options: [
      "The guests departed after they had finished dinner.",
      "The guests had departed after they finished dinner.",
      "The guests departed after they have finished dinner.",
      "The guests were departing after they finished dinner."
    ],
    correctAnswer: 0,
    explanation: "Finishing dinner was the earlier action (had finished); departing was the later action (departed).",
    explanationBn: "ডিনার আগে শেষ হয়েছিল (had finished), তারপর অতিথিরা চলে গিয়েছিলেন (departed)।"
  },
  {
    id: 6,
    question: "Fill in the blank: 'By the time the fire brigade arrived, the local residents ______ the fire.'",
    options: [
      "extinguished",
      "had extinguished",
      "have extinguished",
      "were extinguishing"
    ],
    correctAnswer: 1,
    explanation: "The fire was extinguished before the fire brigade arrived, requiring Past Perfect ('had extinguished').",
    explanationBn: "দমকল আসার আগেই আগুন নিভিয়ে ফেলা হয়েছিল, তাই 'had extinguished' হবে।"
  },
  {
    id: 7,
    question: "What does the sentence 'I had hoped to secure the first rank' imply?",
    options: [
      "The speaker actually secured the first rank.",
      "The speaker hoped in the past, but the expectation was unfulfilled / not realized.",
      "The speaker is hoping right now.",
      "The speaker will hope tomorrow."
    ],
    correctAnswer: 1,
    explanation: "Past Perfect with verbs of intention (hope, intend, expect) conveys an unfulfilled past wish.",
    explanationBn: "'Had hoped' দ্বারা অতীতের অপূর্ণ প্রত্যাশা বোঝানো হয়।"
  },
  {
    id: 8,
    question: "Spot the error: 'He had graduated (A) from college (B) in 2018 with honors (C).'",
    options: [
      "had graduated (A)",
      "from college (B)",
      "in 2018 with honors (C)",
      "No error"
    ],
    correctAnswer: 0,
    explanation: "For an isolated past graduation event in 2018, Simple Past ('graduated') is required instead of 'had graduated'.",
    explanationBn: "একটিমাত্র অতীত সাল 'in 2018'-এর জন্য 'graduated' হবে, 'had graduated' নয়।"
  },
  {
    id: 9,
    question: "Fill in the blank: 'She refused to watch the movie because she ______ the novel previously.'",
    options: [
      "read",
      "had read",
      "has read",
      "was reading"
    ],
    correctAnswer: 1,
    explanation: "Reading the novel occurred earlier in the past, explaining her subsequent refusal ('had read').",
    explanationBn: "উপন্যাসটি আগেই পড়ে ফেলার কারণে Past Perfect 'had read' হবে।"
  },
  {
    id: 10,
    question: "Complete the sentence: 'Tuhina ______ never ______ a helicopter before she visited the aviation expo.'",
    options: [
      "had; seen",
      "has; seen",
      "did; saw",
      "was; seeing"
    ],
    correctAnswer: 0,
    explanation: "Prior to the past visit (milestone), she had never seen one: 'had never seen'.",
    explanationBn: "অতীতের প্রদর্শনীর পূর্বে কখনো না দেখার অভিজ্ঞতায় 'had never seen' বসে।"
  },
  {
    id: 11,
    question: "Which of the following sentences correctly pairs two past actions?",
    options: [
      "As soon as the teacher entered, the students stood up.",
      "As soon as the teacher had entered, the students had stood up.",
      "As soon as the teacher entered, the students have stood up.",
      "The teacher entered as soon as students were standing."
    ],
    correctAnswer: 0,
    explanation: "When two actions happen immediately in rapid consecutive sequence with 'as soon as', both take Simple Past ('entered; stood up').",
    explanationBn: "'As soon as' দিয়ে দ্রুত পরপর ঘটা দুটি কাজে উভয়টিতেই Simple Past বসে।"
  },
  {
    id: 12,
    question: "Fill in the blank: 'When the police questioned the suspect, he admitted that he ______ the jewels.'",
    options: [
      "stole",
      "had stolen",
      "has stolen",
      "was stealing"
    ],
    correctAnswer: 1,
    explanation: "Stealing the jewels happened before the interrogation and confession ('had stolen').",
    explanationBn: "স্বীকারোক্তির পূর্বেই চুরি সংঘটিত হওয়ায় 'had stolen' হবে।"
  },
  {
    id: 13,
    question: "Identify the correct negative Past Perfect structure:",
    options: [
      "The scientist had not verified the equations before publishing the paper.",
      "The scientist did not had verified the equations.",
      "The scientist has not had verified the equations.",
      "The scientist was not verified the equations."
    ],
    correctAnswer: 0,
    explanation: "Subject + had not + V3 ('had not verified').",
    explanationBn: "'Had not verified' হলো সঠিক গঠন।"
  },
  {
    id: 14,
    question: "Fill in the blank: 'The grass was yellow because it ______ for eight consecutive weeks.'",
    options: [
      "had not rained",
      "did not rain",
      "has not rained",
      "was not raining"
    ],
    correctAnswer: 0,
    explanation: "The drought preceded the past observation that the grass was yellow ('had not rained').",
    explanationBn: "ঘাস হলুদ হওয়ার পূর্বেই অনাবৃষ্টি চলায় 'had not rained' সঠিক।"
  },
  {
    id: 15,
    question: "Spot the error: 'Hardly had he (A) left the house (B) than it started raining heavily (C).'",
    options: [
      "Hardly had he (A)",
      "left the house (B)",
      "than it started raining heavily (C)",
      "No error"
    ],
    correctAnswer: 2,
    explanation: "'Hardly' must be paired with 'when', not 'than'. Say: '...when it started raining.'",
    explanationBn: "'Hardly'-র সাথে 'when' বসে, 'than' নয় ('No sooner'-এর সাথে 'than' বসে)।"
  },
  {
    id: 16,
    question: "Choose the sentence where Past Perfect is ESSENTIAL to avoid ambiguity:",
    options: [
      "When I opened the gate, the dog barked.",
      "When I reached the stadium, the match had begun.",
      "He closed the book and went to sleep.",
      "She woke up, brushed her teeth, and took a bath."
    ],
    correctAnswer: 1,
    explanation: "Past Perfect ('had begun') is essential here to clarify that the match started BEFORE arrival, so the speaker missed the opening.",
    explanationBn: "পৌঁছানোর আগেই ম্যাচ শুরু হয়ে গিয়েছিল তা স্পষ্ট করতে Past Perfect অপরিহার্য।"
  },
  {
    id: 17,
    question: "Fill in the blank: 'They ______ all their savings before they ______ for the bank loan.'",
    options: [
      "exhausted; applied",
      "had exhausted; applied",
      "exhausted; had applied",
      "have exhausted; applied"
    ],
    correctAnswer: 1,
    explanation: "Earlier action (had exhausted) + BEFORE + later action (applied).",
    explanationBn: "পূর্বে ঘটা সঞ্চয় শেষ হওয়া (had exhausted) + before + ঋণের আবেদন (applied)।"
  },
  {
    id: 18,
    question: "Why is 'I had seen him two days ago' ungrammatical?",
    options: [
      "Because 'two days ago' requires Present Continuous.",
      "Because Past Perfect cannot be used for an isolated past action without a second reference point; Simple Past 'I saw him two days ago' is required.",
      "Because 'seen' is spelled incorrectly.",
      "Because 'had' cannot accompany 'ago'."
    ],
    correctAnswer: 1,
    explanation: "Without a second past event to establish a 'past of the past', Past Perfect is invalid. Use Simple Past 'I saw him'.",
    explanationBn: "দ্বিতীয় কোনো অতীত সাপেক্ষ ঘটনা না থাকলে 'I saw him two days ago' হবে।"
  },
  {
    id: 19,
    question: "Complete the sentence: 'Until yesterday, Debopam ______ never ______ a live astronomical observatory.'",
    options: [
      "had; visited",
      "has; visited",
      "was; visiting",
      "did; visit"
    ],
    correctAnswer: 0,
    explanation: "'Until yesterday' establishes a past deadline, requiring Past Perfect ('had never visited').",
    explanationBn: "'Until yesterday' অতীত সময়সীমা নির্দেশ করায় 'had never visited' হবে।"
  },
  {
    id: 20,
    question: "Fill in the blank: 'After Sukanta Sir ______ the algorithm, the students ______ the coding task.'",
    options: [
      "had explained; commenced",
      "explained; had commenced",
      "has explained; commenced",
      "was explaining; commenced"
    ],
    correctAnswer: 0,
    explanation: "The explanation happened first (had explained), followed by commencement (commenced).",
    explanationBn: "ব্যাখ্যা আগে হওয়ায় 'had explained' এবং শুরু পরে হওয়ায় 'commenced' হবে।"
  },
  {
    id: 21,
    question: "Identify the sentence that correctly uses the Past Perfect for an unfulfilled condition:",
    options: [
      "If he had studied diligently, he would have cleared the examination.",
      "If he studied diligently, he had cleared the examination.",
      "If he has studied diligently, he would clear.",
      "If he had been studying, he cleared."
    ],
    correctAnswer: 0,
    explanation: "Third Conditional: 'If + Past Perfect (had studied), would have + V3 (would have cleared)'.",
    explanationBn: "শর্তমূলক বাক্যে 'If + had studied..., would have cleared' হলো আদর্শ গঠন।"
  },
  {
    id: 22,
    question: "Fill in the blank: 'The conductor told us that the last bus ______.'",
    options: [
      "departed",
      "had departed",
      "has departed",
      "was departed"
    ],
    correctAnswer: 1,
    explanation: "In indirect reported speech, the past departure preceding the statement takes Past Perfect ('had departed').",
    explanationBn: "বক্তব্য দেওয়ার পূর্বেই বাস চলে যাওয়ায় 'had departed' হবে।"
  },
  {
    id: 23,
    question: "Spot the error: 'By 5 PM yesterday, we completed (A) all fifteen (B) diagnostic test papers (C).'",
    options: [
      "completed (A)",
      "all fifteen (B)",
      "diagnostic test papers (C)",
      "No error"
    ],
    correctAnswer: 0,
    explanation: "A deadline in the past ('By 5 PM yesterday') mandates Past Perfect: 'we had completed'.",
    explanationBn: "'By 5 PM yesterday' অতীত ডেডলাইন নির্দেশ করায় 'had completed' হবে।"
  },
  {
    id: 24,
    question: "Transform into Past Perfect sequence: 'She cooked the meal. Then the guests arrived.'",
    options: [
      "She had cooked the meal before the guests arrived.",
      "She cooked the meal before the guests had arrived.",
      "She was cooking the meal after the guests arrived.",
      "She had cooked the meal before guests had arrived."
    ],
    correctAnswer: 0,
    explanation: "'She had cooked the meal before the guests arrived' accurately reflects the chronological sequence.",
    explanationBn: "'She had cooked the meal before the guests arrived' হলো নির্ভুল রূপান্তর।"
  },
  {
    id: 25,
    question: "What is the golden rule of the Past Perfect tense?",
    options: [
      "Use it for every past event that happened more than one year ago.",
      "Use it only when you need to distinguish the EARLIER of two past actions (Past of the Past).",
      "Use it whenever 'yesterday' appears in the sentence.",
      "Use it with stative verbs exclusively."
    ],
    correctAnswer: 1,
    explanation: "Past Perfect is reserved for establishing that one past event occurred before another past event.",
    explanationBn: "অতীতের দুটি ঘটনার মধ্যে অপেক্ষাকৃত পূর্বে ঘটা কাজটি বোঝাতে Past Perfect ব্যবহৃত হয়।"
  }
];

export default questions;
