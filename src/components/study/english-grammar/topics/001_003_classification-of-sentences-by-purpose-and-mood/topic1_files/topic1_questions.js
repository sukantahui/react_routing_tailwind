// topic1_questions.js
// Module 001_003: Classification of Sentences by Purpose & Communicative Mood
// Topic 1: Interrogative Sentences: Yes/No Inversion vs Wh- Questions
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "Which of the following represents the correct Subject-Auxiliary Inversion for the statement 'Swadeep has completed the React project'?",
    options: [
      "Has Swadeep completed the React project?",
      "Swadeep has completed the React project?",
      "Did Swadeep has completed the React project?",
      "Completed Swadeep the React project?"
    ],
    correctAnswer: 0,
    explanation: "To convert an assertive sentence with an auxiliary verb into a Yes/No question, invert the auxiliary verb ('has') before the subject ('Swadeep'): 'Has Swadeep completed...?'",
    explanationBn: "যে বাক্যে Auxiliary Verb (এখানে 'has') থাকে, তাকে Yes/No প্রশ্নে রূপান্তর করতে Auxiliary Verb-টিকে Subject ('Swadeep')-এর পূর্বে নিয়ে আসতে হয়: 'Has Swadeep completed...?'"
  },
  {
    id: 2,
    question: "In standard English, how do you formulate a Yes/No question from 'They study at Barrackpore' (simple present with no modal/be auxiliary)?",
    options: [
      "Study they at Barrackpore?",
      "Do they study at Barrackpore?",
      "Are they study at Barrackpore?",
      "Did they study at Barrackpore?"
    ],
    correctAnswer: 1,
    explanation: "When no auxiliary verb is present in the Simple Present tense, the dummy operator 'do/does' is introduced followed by the base form of the main verb: 'Do they study...?'",
    explanationBn: "Simple Present Tense-এ কোনো Auxiliary Verb না থাকলে প্রশ্ন গঠনের জন্য Dummy Operator 'do/does' ব্যবহার করা হয় এবং মূল Verb-এর Base Form বসে: 'Do they study...?'"
  },
  {
    id: 3,
    question: "Which question correctly asks for the OBJECT of the sentence 'Debangshu phoned Sukanta Sir'?",
    options: [
      "Who phoned Sukanta Sir?",
      "Whom did Debangshu phone?",
      "Who Debangshu did phone?",
      "Whom Debangshu phoned?"
    ],
    correctAnswer: 1,
    explanation: "When asking about the Object of an action, Wh- question syntax requires the auxiliary operator 'did' before the subject: 'Whom did Debangshu phone?' (or informally 'Who did Debangshu phone?').",
    explanationBn: "বাক্যের Object জানতে চাইলে Wh-word-এর পরে Auxiliary Verb ('did') + Subject ('Debangshu') + Base Verb ('phone') বসে: 'Whom did Debangshu phone?'"
  },
  {
    id: 4,
    question: "Which question correctly asks for the SUBJECT of the sentence 'Someone left a bag in the classroom'?",
    options: [
      "Who did leave a bag in the classroom?",
      "Who left a bag in the classroom?",
      "Whom did leave a bag in the classroom?",
      "Who did left a bag in the classroom?"
    ],
    correctAnswer: 1,
    explanation: "When the Wh- word is itself the SUBJECT of the clause, NO dummy 'do/did' auxiliary is added, and the word order remains declarative: 'Who left a bag in the classroom?'",
    explanationBn: "Wh-word যখন নিজেই Subject হিসেবে কাজ করে, তখন dummy 'do/did' যোগ করা হয় না; সরাসরি মূল Verb বসে: 'Who left a bag in the classroom?'"
  },
  {
    id: 5,
    question: "Identify the grammatically correct question inquiring about the reason for someone's late arrival in the past:",
    options: [
      "Why you arrived late yesterday?",
      "Why did you arrive late yesterday?",
      "Why did you arrived late yesterday?",
      "Why you did arrive late yesterday?"
    ],
    correctAnswer: 1,
    explanation: "Wh- questions in simple past require 'Why + did + Subject + V1 (base form)'. 'Why did you arrive...' is correct. Using V2 after 'did' (*did you arrived) is a major grammatical error.",
    explanationBn: "Simple Past-এ Wh- প্রশ্ন গঠনের সঠিক নিয়ম: Wh-word + did + Subject + Base Verb (V1)। 'did'-এর পর কখনো Verb-এর Past Form (V2) বসে না।"
  },
  {
    id: 6,
    question: "What is the correct transformation of 'She knows the answer' into a negative interrogative expressing surprise?",
    options: [
      "Doesn't she know the answer?",
      "Does she not knows the answer?",
      "Don't she know the answer?",
      "Doesn't she knows the answer?"
    ],
    correctAnswer: 0,
    explanation: "The contracted negative interrogative places 'Doesn't' at the front, followed by the subject 'she' and the base verb 'know': 'Doesn't she know the answer?'",
    explanationBn: "Contracted Negative Interrogative-এ 'Doesn't' বাক্যের শুরুতে বসে, এরপর Subject 'she' এবং Verb-এর Base Form 'know' বসে।"
  },
  {
    id: 7,
    question: "What is an INDIRECT QUESTION, and what word order does its subordinate clause follow?",
    options: [
      "It follows inverted word order: 'Could you tell me where does he live?'",
      "It follows declarative/statement word order: 'Could you tell me where he lives?'",
      "It requires double question marks at both ends.",
      "It always uses the passive voice."
    ],
    correctAnswer: 1,
    explanation: "An embedded or indirect question (e.g., introduced by 'Could you tell me...') acts as a noun clause and MUST follow regular declarative Subject + Verb word order: '...where he lives' (NOT *where does he live).",
    explanationBn: "Indirect / Embedded Question-এর Subordinate Clause-এ কোনো Inversion হয় না; সাধারণ বাক্যের মতো Subject + Verb বসে: 'Could you tell me where he lives?'"
  },
  {
    id: 8,
    question: "Identify the error in this spoken sentence: 'Can you tell me what time is it?'",
    options: [
      "The modal verb 'Can' cannot start a polite question.",
      "The embedded clause has incorrect inversion; it should be 'what time it is'.",
      "'Time' should be replaced with 'o'clock'.",
      "The question mark is misplaced."
    ],
    correctAnswer: 1,
    explanation: "Because the question is already introduced by 'Can you tell me', the embedded clause must revert to declarative order: 'what time it is' instead of inverted 'what time is it'.",
    explanationBn: "'Can you tell me'-এর পর Embedded Clause-এ Verb ও Subject উল্টানো যাবে না; সঠিক রূপ হলো: 'what time it is'।"
  },
  {
    id: 9,
    question: "Which of the following is an alternative question offering a closed choice?",
    options: [
      "Do you prefer Java or Python?",
      "Where are you traveling tomorrow?",
      "You are a coder, aren't you?",
      "Who developed this software?"
    ],
    correctAnswer: 0,
    explanation: "An alternative question gives the listener a choice between two or more options connected by 'or' ('Java or Python?'). It typically uses rising intonation on the first choice and falling intonation on the last.",
    explanationBn: "Alternative Question হলো এমন প্রশ্ন যেখানে 'or' দ্বারা নির্দিষ্ট বিকল্পের মধ্য থেকে বেছে নিতে বলা হয়: 'Do you prefer Java or Python?'"
  },
  {
    id: 10,
    question: "Which of the following is a RHETORICAL QUESTION (a question asked for dramatic effect or assertion, not expecting an answer)?",
    options: [
      "What is your name?",
      "Who does not know that the earth moves around the sun?",
      "Are you coming to Barrackpore tomorrow?",
      "When will the class start?"
    ],
    correctAnswer: 1,
    explanation: "'Who does not know that the earth moves around the sun?' is a rhetorical question implying the strong assertion: 'Everyone knows that the earth moves around the sun.'",
    explanationBn: "Rhetorical Question কোনো উত্তরের প্রত্যাশায় করা হয় না, বরং কোনো বক্তব্যকে জোরালোভাবে প্রকাশ করতে ব্যবহৃত হয়। 'Who does not know...?' মানে 'Everyone knows...'।"
  },
  {
    id: 11,
    question: "Which Wh- question word is used to inquire about MANNER, CONDITION, or DEGREE?",
    options: [
      "Where",
      "How",
      "Why",
      "Whose"
    ],
    correctAnswer: 1,
    explanation: "'How' inquires about manner ('How did you solve it?'), condition ('How are you?'), or degree/quantity when combined with adjectives/adverbs ('How much?', 'How fast?').",
    explanationBn: "'How' ব্যবহৃত হয় কোনো কাজের পদ্ধতি (Manner), অবস্থা (Condition) বা মাত্রা (Degree) জানতে।"
  },
  {
    id: 12,
    question: "Which Wh- word inquires about POSSESSION or OWNERSHIP?",
    options: [
      "Whom",
      "Which",
      "Whose",
      "Where"
    ],
    correctAnswer: 2,
    explanation: "'Whose' is the possessive interrogative pronoun/determiner used to ask about ownership: 'Whose laptop is this?'",
    explanationBn: "'Whose' হলো Possessive Interrogative Determiner/Pronoun যা কোনো কিছুর মালিকানা বা অধিকার জানতে ব্যবহৃত হয়।"
  },
  {
    id: 13,
    question: "Which question is formed correctly when 'Which' is used to choose among a limited, definite set of items?",
    options: [
      "Which of these three programming languages do you recommend?",
      "What of these three programming languages do you recommend?",
      "Who of these three programming languages do you recommend?",
      "Whom of these three programming languages do you recommend?"
    ],
    correctAnswer: 0,
    explanation: "'Which' is used when selecting from a known, limited set of choices, whereas 'What' is used when the scope is broad or unlimited.",
    explanationBn: "নির্দিষ্ট ও সীমিত সংখ্যক বিকল্পের মধ্য থেকে বেছে নিতে 'Which' ব্যবহৃত হয়; সাধারণ বা সীমাহীন ক্ষেত্রে 'What' বসে।"
  },
  {
    id: 14,
    question: "Convert the assertive sentence 'Riya had to rewrite the code' into a standard past interrogative:",
    options: [
      "Had Riya to rewrite the code?",
      "Did Riya have to rewrite the code?",
      "Did Riya had to rewrite the code?",
      "Was Riya to rewrite the code?"
    ],
    correctAnswer: 1,
    explanation: "When 'have to' is used as a semi-modal of obligation in the past tense ('had to'), standard interrogative formation uses dummy operator 'did': 'Did Riya have to rewrite...?'",
    explanationBn: "'Had to' (বাধ্যবাধকতা)-এর Past Interrogative করতে 'did' দিয়ে প্রশ্ন শুরু হয় এবং 'had' পরিবর্তিত হয়ে Base Form 'have' হয়: 'Did Riya have to...?'"
  },
  {
    id: 15,
    question: "Identify the correct interrogative form of 'He used to live in Shyamnagar':",
    options: [
      "Used he to live in Shyamnagar?",
      "Did he use to live in Shyamnagar?",
      "Did he used to live in Shyamnagar?",
      "Does he use to live in Shyamnagar?"
    ],
    correctAnswer: 1,
    explanation: "In modern standard English, the past habit 'used to' forms questions with dummy 'did': 'Did he use to live in Shyamnagar?' (notice 'use' without 'd').",
    explanationBn: "Modern English-এ 'used to'-এর প্রশ্নে 'Did + Subject + use to' বসে (did-এর কারণে 'used' না হয়ে 'use' হয়)।"
  },
  {
    id: 16,
    question: "In the sentence 'What did you buy the book for?', what does 'What...for' mean?",
    options: [
      "Where did you buy it?",
      "Why / for what reason did you buy it?",
      "How much did you pay?",
      "Who bought it for you?"
    ],
    correctAnswer: 1,
    explanation: "'What...for' is a common colloquial and standard interrogative structure meaning 'Why' or 'For what purpose/reason'.",
    explanationBn: "'What...for' একটি প্রচলিত প্রশ্ন কাঠামো যার অর্থ 'কেন' (Why) বা 'কী উদ্দেশ্যে' (For what reason)।"
  },
  {
    id: 17,
    question: "Which of the following demonstrates the correct position of a preposition in formal vs informal Wh- questions?",
    options: [
      "Formal: 'To whom were you speaking?' | Informal: 'Who were you speaking to?'",
      "Formal: 'Who were you speaking to?' | Informal: 'To whom were you speaking?'",
      "Formal: 'To who were you speaking?' | Informal: 'Whom were you speaking?'",
      "Both formal and informal English forbid ending a question with a preposition."
    ],
    correctAnswer: 0,
    explanation: "Formal English fronts the preposition with 'whom' ('To whom were you speaking?'), whereas modern everyday English strands the preposition at the end ('Who were you speaking to?').",
    explanationBn: "Formal English-এ Preposition বাক্যের শুরুতে 'whom'-এর আগে বসে ('To whom were you speaking?'); আর Spoken English-এ Preposition শেষে বসে ('Who were you speaking to?')।"
  },
  {
    id: 18,
    question: "Which question correctly applies Subject-Auxiliary Inversion with the negative adverb 'Seldom' fronted?",
    options: [
      "Seldom we have seen such dedicated students.",
      "Seldom have we seen such dedicated students.",
      "Seldom we did see such dedicated students.",
      "Seldom seen have we such dedicated students."
    ],
    correctAnswer: 1,
    explanation: "When negative or restrictive adverbs (seldom, rarely, hardly, scarcely, never) are fronted at the beginning of a clause, mandatory Subject-Auxiliary Inversion takes place: 'Seldom have we seen...'",
    explanationBn: "বাক্যের শুরুতে 'Seldom', 'Rarely', 'Never' ইত্যাদি Negative Adverb বসলে বাধ্যতামূলকভাবে Subject ও Auxiliary Verb-এর Inversion ঘটে: 'Seldom have we seen...'"
  },
  {
    id: 19,
    question: "How should 'I wonder where is the station' be corrected into standard English?",
    options: [
      "I wonder where the station is.",
      "I wonder where does the station be.",
      "I wonder where is station.",
      "I wonder is where the station."
    ],
    correctAnswer: 0,
    explanation: "'I wonder...' introduces an indirect noun clause, which is declarative in syntax. Therefore, subject ('the station') precedes the verb ('is'): 'I wonder where the station is.' (ending with a period).",
    explanationBn: "'I wonder' একটি Assertive Clause সূচনা করে, তাই এর পরের Noun Clause-এ কোনো Inversion হবে না; সঠিক বাক্য: 'I wonder where the station is.'"
  },
  {
    id: 20,
    question: "Identify the correct question to ask about the frequency of an event:",
    options: [
      "How long do you practice coding?",
      "How often do you practice coding?",
      "How far do you practice coding?",
      "How many do you practice coding?"
    ],
    correctAnswer: 1,
    explanation: "'How often' (or 'How frequently') is used to inquire about recurrence or frequency of an action. ('How long' asks for duration).",
    explanationBn: "কাজের পুনরাবৃত্তি বা পৌনঃপুনিকতা (Frequency) জানতে 'How often' ব্যবহৃত হয়; আর সময়কাল (Duration) জানতে 'How long' বসে।"
  },
  {
    id: 21,
    question: "Which of the following is an ECHO QUESTION (used to confirm or express disbelief about what was just heard)?",
    options: [
      "Speaker A: 'He won a million dollars!' — Speaker B: 'He won WHAT?!'",
      "Where did he win the money?",
      "Did he win the money yesterday?",
      "Why did he win the money?"
    ],
    correctAnswer: 0,
    explanation: "An Echo Question repeats the speaker's statement while replacing the unbelievable or unheard element with an emphasized Wh- word at the end: 'He won WHAT?!'",
    explanationBn: "Echo Question হলো কোনো কথা শুনে বিস্ময় বা অবিশ্বাস প্রকাশ করে সেই কথার মূল অংশটিকে Wh-word দিয়ে প্রশ্ন হিসেবে পুনরাবৃত্তি করা: 'He won WHAT?!'"
  },
  {
    id: 22,
    question: "Identify the grammatical flaw in: 'Did you went to the Barrackpore campus yesterday?'",
    options: [
      "The auxiliary 'Did' must be followed by the base form 'go', not past tense 'went'.",
      "'Yesterday' should be placed before the verb.",
      "'To' is an incorrect preposition with campus.",
      "The sentence requires 'Have you gone'."
    ],
    correctAnswer: 0,
    explanation: "The auxiliary 'did' already carries the past tense marker for the clause; the lexical verb must always be in its base/bare infinitive form: 'Did you go...?'",
    explanationBn: "Auxiliary Verb 'did' নিজেই Past Tense নির্দেশ করে, তাই এর সাথে মূল Verb-এর Base Form 'go' বসবে ('went' নয়)।"
  },
  {
    id: 23,
    question: "Which of the following negative interrogatives is structured in the formal UNCONTRACTED style?",
    options: [
      "Did not you attend the workshop?",
      "Did you not attend the workshop?",
      "Didn't you attend the workshop?",
      "Do you not attended the workshop?"
    ],
    correctAnswer: 1,
    explanation: "In formal uncontracted negative questions, 'not' follows the subject: 'Did + Subject + not + Verb' -> 'Did you not attend the workshop?' (Placing 'not' before the subject without contraction is archaic/incorrect).",
    explanationBn: "Formal Uncontracted Negative প্রশ্নে 'not' Subject-এর পরে বসে: 'Did you not attend...?' আর Contracted রূপে শুরুতে বসে: 'Didn't you attend...?'"
  },
  {
    id: 24,
    question: "What intonation contour is typically associated with standard Yes/No questions in spoken English?",
    options: [
      "Falling intonation at the end",
      "Rising intonation at the end",
      "Monotone flat pitch throughout",
      "Drop in pitch on the auxiliary verb"
    ],
    correctAnswer: 1,
    explanation: "Standard Yes/No questions generally conclude with a RISING intonation contour, whereas standard Wh- questions conclude with a FALLING intonation contour.",
    explanationBn: "সাধারণ Yes/No প্রশ্নে বাক্যের শেষে কণ্ঠস্বর উপরের দিকে ওঠে (Rising Intonation); পক্ষান্তরে Wh- প্রশ্নে বাক্যের শেষে কণ্ঠস্বর নিচে নামে (Falling Intonation)।"
  },
  {
    id: 25,
    question: "Which question correctly uses 'Wh- + be' when inquiring about a person's profession or role?",
    options: [
      "What is Mr. Mukherjee?",
      "Who is Mr. Mukherjee?",
      "Which is Mr. Mukherjee?",
      "Where is Mr. Mukherjee?"
    ],
    correctAnswer: 0,
    explanation: "In traditional and standard English, 'What is he?' inquires about a person's profession/occupation (e.g., 'He is a senior software engineer'), whereas 'Who is he?' inquires about personal identity or name.",
    explanationBn: "প্রথাগত ইংরেজিতে কারো পেশা বা জীবিকা জানতে 'What is he/she?' বলা হয় ('He is an engineer'); আর নাম বা ব্যক্তিগত পরিচয় জানতে 'Who is he/she?' বলা হয়।"
  }
];

export default questions;
