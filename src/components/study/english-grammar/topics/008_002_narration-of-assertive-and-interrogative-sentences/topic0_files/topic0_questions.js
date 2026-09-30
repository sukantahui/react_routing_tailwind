// topic0_questions.js - Module 008_002: Narration of Assertive & Interrogative Sentences (Wh- & Yes/No)
// 25 High-Yield Diagnostic MCQs with Technical and Bengali Explanations

const questions = [
  {
    id: 1,
    question: "Convert the Wh- question to Indirect Speech: The policeman said to the stranger, 'Where are you going at this late hour?'",
    options: [
      "The policeman asked the stranger where he was going at that late hour.",
      "The policeman asked the stranger where was he going at that late hour.",
      "The policeman asked the stranger that where he was going at that late hour.",
      "The policeman told the stranger where he was going at that late hour."
    ],
    correctAnswer: "The policeman asked the stranger where he was going at that late hour.",
    explanation: "In reported questions: 1. Reporting verb becomes 'asked'; 2. 'Where' acts as the connective (never use 'that'); 3. Inversion is removed to declarative order ('he was going', NOT 'was he going'); 4. 'this' becomes 'that'.",
    explanationBn: "Reported Question-এ: ১. Reporting verb 'asked' হয়; ২. Wh-word নিজেই Connector হিসেবে কাজ করে ('that' বসে না); ৩. প্রশ্নবাচক গঠন পরিবর্তিত হয়ে Declarative গঠন (Subject + Verb: 'he was going') হয়; ৪. 'this' হয় 'that'।"
  },
  {
    id: 2,
    question: "Convert the Yes/No question to Indirect Speech: She said to me, 'Do you understand this mathematical theorem?'",
    options: [
      "She asked me if I understood that mathematical theorem.",
      "She asked me that if I understood that mathematical theorem.",
      "She asked me whether did I understand that mathematical theorem.",
      "She asked me if I understand this mathematical theorem."
    ],
    correctAnswer: "She asked me if I understood that mathematical theorem.",
    explanation: "Yes/No questions take 'if' or 'whether' as the connective (never 'that if'), the auxiliary 'do' is removed, and the verb backshifts to simple past ('understood').",
    explanationBn: "Yes/No প্রশ্ন Indirect Speech-এ 'if' বা 'whether' গ্রহণ করে, সাহায্যকারী 'do' উঠে যায় এবং মূল ভার্ব Simple Past ('understood')-এ ব্যাকশিফট হয়।"
  },
  {
    id: 3,
    question: "Identify the sentence that violates the declarative word order rule in reported questions:",
    options: [
      "He asked me why I had arrived late.",
      "He asked me why had I arrived late.",
      "She asked him where he lived.",
      "The teacher asked whether everyone was ready."
    ],
    correctAnswer: "He asked me why had I arrived late.",
    explanation: "In reported speech, retaining auxiliary inversion ('why had I...') is a severe error. It must be declarative order ('why I had...').",
    explanationBn: "Reported Speech-এ 'why had I...' ইনভার্সন রাখা ভুল; এটি অবশ্যই 'why I had...' (Subject + Verb) হতে হবে।"
  },
  {
    id: 4,
    question: "Which connective should NOT be used with Wh- questions in indirect speech?",
    options: ["that", "where", "why", "how"],
    correctAnswer: "that",
    explanation: "Using 'that' before a Wh- word (e.g. 'asked that why...') creates an illegal double connective error in standard English.",
    explanationBn: "Wh- প্রশ্ন Indirect Speech-এ রূপান্তরের সময় 'that' ব্যবহার করা সম্পূর্ণ বেআইনি (Double Connective ভুল)।"
  },
  {
    id: 5,
    question: "Convert to Indirect Speech: The interviewer said to the candidate, 'Are you willing to relocate to Bengaluru or not?'",
    options: [
      "The interviewer asked the candidate whether he was willing to relocate to Bengaluru or not.",
      "The interviewer asked the candidate if he was willing to relocate to Bengaluru or not.",
      "The interviewer asked that whether he was willing to relocate to Bengaluru.",
      "The interviewer told the candidate whether he was willing to relocate."
    ],
    correctAnswer: "The interviewer asked the candidate whether he was willing to relocate to Bengaluru or not.",
    explanation: "When the alternative choice 'or not' is explicitly stated in the question, 'whether' is preferred over 'if'.",
    explanationBn: "বাক্যে যখন 'or not' (বিকল্প পছন্দ) স্পষ্টভাবে উল্লেখ থাকে, তখন 'if'-এর চেয়ে 'whether' ব্যবহার করা ব্যাকরণগতভাবে শ্রেয়।"
  },
  {
    id: 6,
    question: "Convert to Indirect Speech: He said to me, 'What is your name?'",
    options: [
      "He asked me what my name was.",
      "He asked me what was my name.",
      "He asked me that what my name was.",
      "He inquired of me what was my name."
    ],
    correctAnswer: "He asked me what my name was.",
    explanation: "The linking verb 'was' must sit at the end in declarative order ('what my name was'), NOT 'what was my name'.",
    explanationBn: "Declarative ক্রমে 'was' ভার্বটি Subject 'my name'-এর পরে বসবে ('what my name was')।"
  },
  {
    id: 7,
    question: "Convert to Indirect Speech: Mother said to Rohan, 'Have you completed your homework?'",
    options: [
      "Mother asked Rohan if he had completed his homework.",
      "Mother asked Rohan that had he completed his homework.",
      "Mother asked Rohan whether he has completed his homework.",
      "Mother told Rohan if he completed his homework."
    ],
    correctAnswer: "Mother asked Rohan if he had completed his homework.",
    explanation: "Present perfect 'Have you completed' transforms to past perfect 'if he had completed'.",
    explanationBn: "Present Perfect 'Have you completed' পরিবর্তিত হয়ে Past Perfect 'if he had completed' হয়।"
  },
  {
    id: 8,
    question: "Convert to Indirect Speech: The tourist said to the local guide, 'Can you show me the way to the monument?'",
    options: [
      "The tourist asked the local guide if he could show him the way to the monument.",
      "The tourist asked the local guide that could he show him the way to the monument.",
      "The tourist asked the local guide if can he show him the way to the monument.",
      "The tourist told the local guide whether he can show him the way."
    ],
    correctAnswer: "The tourist asked the local guide if he could show him the way to the monument.",
    explanation: "Modal 'can' backshifts to 'could', and word order becomes declarative ('he could show him').",
    explanationBn: "'Can you show' পরিবর্তিত হয়ে 'if he could show him' (Declarative Order) হয়।"
  },
  {
    id: 9,
    question: "Convert to Indirect Speech: The doctor said to the patient, 'How long have you been suffering from this fever?'",
    options: [
      "The doctor inquired of the patient how long he had been suffering from that fever.",
      "The doctor asked the patient that how long he had been suffering from that fever.",
      "The doctor inquired how long was he suffering from that fever.",
      "The doctor asked the patient how long had he been suffering from this fever."
    ],
    correctAnswer: "The doctor inquired of the patient how long he had been suffering from that fever.",
    explanation: "'Inquired of' is an advanced reporting verb; 'how long' acts as the connective; 'have been suffering' becomes 'had been suffering'; 'this' becomes 'that'.",
    explanationBn: "'Inquired of' উন্নত Reporting Verb; 'how long' Connector; 'have been' পরিবর্তিত হয়ে 'had been' হয় এবং 'this' হয় 'that'।"
  },
  {
    id: 10,
    question: "Convert to Indirect Speech: She said, 'I will not tolerate this indiscipline.'",
    options: [
      "She said that she would not tolerate that indiscipline.",
      "She told that she would not tolerate this indiscipline.",
      "She said that she will not tolerate that indiscipline.",
      "She asked that she would not tolerate that indiscipline."
    ],
    correctAnswer: "She said that she would not tolerate that indiscipline.",
    explanation: "In an assertive sentence, 'that' connects the reported clause, 'will' becomes 'would', and 'this' becomes 'that'.",
    explanationBn: "Assertive বাক্যে 'that' বসে, 'will' পরিবর্তিত হয়ে 'would' হয় এবং 'this' হয় 'that'।"
  },
  {
    id: 11,
    question: "Convert to Indirect Speech: The stranger said to me, 'Did you see the accident?'",
    options: [
      "The stranger asked me if I had seen the accident.",
      "The stranger asked me if I saw the accident.",
      "The stranger asked me that did I see the accident.",
      "The stranger asked me whether did I see the accident."
    ],
    correctAnswer: "The stranger asked me if I had seen the accident.",
    explanation: "Simple past question ('Did you see') backshifts to past perfect ('if I had seen').",
    explanationBn: "Simple Past প্রশ্ন ('Did you see') পরিবর্তিত হয়ে Past Perfect ('if I had seen') হয়।"
  },
  {
    id: 12,
    question: "Convert to Indirect Speech: The teacher said to the boy, 'Why are you making a noise in the library?'",
    options: [
      "The teacher asked the boy why he was making a noise in the library.",
      "The teacher asked the boy why was he making a noise in the library.",
      "The teacher asked the boy that why he was making a noise in the library.",
      "The teacher told the boy why he was making a noise in the library."
    ],
    correctAnswer: "The teacher asked the boy why he was making a noise in the library.",
    explanation: "'Why' connects the clause, and 'are you making' becomes declarative past continuous 'he was making'.",
    explanationBn: "'Why' Connector এবং 'are you making' পরিবর্তিত হয়ে Declarative 'he was making' হয়।"
  },
  {
    id: 13,
    question: "Identify the correct indirect question in polite spoken English:",
    options: [
      "Could you tell me where is the railway station? (Wrong inversion)",
      "Could you tell me where the railway station is?",
      "Could you tell me that where is the railway station?",
      "Could you tell me where does the railway station locate?"
    ],
    correctAnswer: "Could you tell me where the railway station is?",
    explanation: "Embedded questions inside polite requests must use declarative word order ('where the railway station is'), NOT question inversion ('where is the railway station').",
    explanationBn: "ভদ্রতামূলক অনুরোধের ভেতরের প্রশ্নে (Embedded Question) ইনভার্সন না হয়ে Declarative Order ('where the railway station is') বসে।"
  },
  {
    id: 14,
    question: "Convert to Indirect Speech: He said to me, 'Will you join us for dinner tonight?'",
    options: [
      "He asked me whether I would join them for dinner that night.",
      "He asked me if I will join them for dinner that night.",
      "He asked me that if I would join them for dinner tonight.",
      "He told me whether I would join them for dinner that night."
    ],
    correctAnswer: "He asked me whether I would join them for dinner that night.",
    explanation: "'Will you join' becomes 'whether I would join', 'us' becomes 'them', and 'tonight' becomes 'that night'.",
    explanationBn: "'Will you join' পরিবর্তিত হয়ে 'whether I would join', 'us' হয় 'them', এবং 'tonight' হয় 'that night'।"
  },
  {
    id: 15,
    question: "Convert to Indirect Speech: The judge said to the witness, 'Were you present at the scene of the crime?'",
    options: [
      "The judge asked the witness if he had been present at the scene of the crime.",
      "The judge asked the witness if he was present at the scene of the crime.",
      "The judge asked the witness that was he present at the scene of the crime.",
      "The judge inquired the witness if he were present at the scene of the crime."
    ],
    correctAnswer: "The judge asked the witness if he had been present at the scene of the crime.",
    explanation: "Simple past verb 'Were you' backshifts to past perfect 'if he had been'.",
    explanationBn: "Simple Past 'Were you' পরিবর্তিত হয়ে Past Perfect 'if he had been' হয়।"
  },
  {
    id: 16,
    question: "What punctuation mark is used at the end of an indirect question?",
    options: [
      "A full stop (period .)",
      "A question mark (?)",
      "An exclamation mark (!)",
      "A semicolon (;)"
    ],
    correctAnswer: "A full stop (period .)",
    explanation: "Because an indirect question is syntactically a declarative subordinate clause, it MUST end with a full stop (period), NEVER a question mark.",
    explanationBn: "Indirect Question মূলত একটি বর্ণনামূলক বাক্য (Declarative Clause), তাই এর শেষে প্রশ্নবোধক চিহ্নের বদলে দাঁড়ি বা Full Stop (.) বসে।"
  },
  {
    id: 17,
    question: "Convert to Indirect Speech: He said to her, 'Whose umbrella did you borrow?'",
    options: [
      "He asked her whose umbrella she had borrowed.",
      "He asked her whose umbrella had she borrowed.",
      "He asked her that whose umbrella she had borrowed.",
      "He told her whose umbrella she borrowed."
    ],
    correctAnswer: "He asked her whose umbrella she had borrowed.",
    explanation: "'Whose umbrella' acts as the relative interrogative phrase followed by declarative past perfect 'she had borrowed'.",
    explanationBn: "'Whose umbrella' Connector হিসেবে বসে এবং এরপরে Declarative Past Perfect 'she had borrowed' বসে।"
  },
  {
    id: 18,
    question: "Convert to Indirect Speech: The librarian said to the student, 'Which book do you want to borrow?'",
    options: [
      "The librarian asked the student which book he wanted to borrow.",
      "The librarian asked the student which book did he want to borrow.",
      "The librarian asked that which book he wanted to borrow.",
      "The librarian inquired which book does he want to borrow."
    ],
    correctAnswer: "The librarian asked the student which book he wanted to borrow.",
    explanation: "The auxiliary 'do' is removed, and 'want' backshifts to 'wanted'.",
    explanationBn: "সাহায্যকারী 'do' বর্জন করে 'wanted' (Simple Past) বসিয়ে Declarative বাক্য তৈরি করা হয়েছে।"
  },
  {
    id: 19,
    question: "Convert to Indirect Speech: She said to him, 'You have not returned my laptop yet.'",
    options: [
      "She told him that he had not returned her laptop yet.",
      "She said him that he has not returned her laptop yet.",
      "She told to him that he had not returned her laptop yet.",
      "She asked him that he had not returned her laptop yet."
    ],
    correctAnswer: "She told him that he had not returned her laptop yet.",
    explanation: "'Said to him' becomes 'told him', and present perfect 'have not returned' becomes past perfect 'had not returned'.",
    explanationBn: "'Said to him' পরিবর্তিত হয়ে 'told him' এবং Present Perfect পরিবর্তিত হয়ে Past Perfect 'had not returned' হয়।"
  },
  {
    id: 20,
    question: "Convert to Indirect Speech: He said, 'Shall I ever see her again?'",
    options: [
      "He wondered if he would ever see her again.",
      "He asked that shall he ever see her again.",
      "He asked if he should ever see her again.",
      "He told whether he would see her again."
    ],
    correctAnswer: "He wondered if he would ever see her again.",
    explanation: "Speculative or self-directed questions with 'Shall I...?' are best reported using the reporting verb 'wondered' with 'would'.",
    explanationBn: "নিজের মনে সংশয় বা জল্পনা প্রকাশ করা প্রশ্নে Reporting Verb হিসেবে 'wondered' ব্যবহার করা সবচেয়ে মার্জিত।"
  },
  {
    id: 21,
    question: "Convert to Indirect Speech: The coach said to the athlete, 'Are you confident of winning the gold medal?'",
    options: [
      "The coach asked the athlete if he was confident of winning the gold medal.",
      "The coach asked the athlete that if he was confident of winning the gold medal.",
      "The coach asked the athlete was he confident of winning the gold medal.",
      "The coach told the athlete if he was confident of winning."
    ],
    correctAnswer: "The coach asked the athlete if he was confident of winning the gold medal.",
    explanation: "'Are you confident' becomes 'if he was confident'.",
    explanationBn: "'Are you confident' পরিবর্তিত হয়ে 'if he was confident' হয়।"
  },
  {
    id: 22,
    question: "Convert to Indirect Speech: The host said to the guest, 'Do you prefer tea or coffee?'",
    options: [
      "The host asked the guest whether he preferred tea or coffee.",
      "The host asked the guest if did he prefer tea or coffee.",
      "The host asked the guest that whether he preferred tea or coffee.",
      "The host told the guest whether he preferred tea or coffee."
    ],
    correctAnswer: "The host asked the guest whether he preferred tea or coffee.",
    explanation: "'Whether' is preferred for two distinct choices (tea or coffee), and 'prefer' backshifts to 'preferred'.",
    explanationBn: "দুটি সুনির্দিষ্ট পছন্দের ক্ষেত্রে 'whether' বসে এবং 'prefer' পরিবর্তিত হয়ে 'preferred' হয়।"
  },
  {
    id: 23,
    question: "Convert to Indirect Speech: The passenger said, 'When will the Rajdhani Express arrive?'",
    options: [
      "The passenger inquired when the Rajdhani Express would arrive.",
      "The passenger asked when would the Rajdhani Express arrive.",
      "The passenger asked that when the Rajdhani Express would arrive.",
      "The passenger told when the Rajdhani Express would arrive."
    ],
    correctAnswer: "The passenger inquired when the Rajdhani Express would arrive.",
    explanation: "'When' acts as the connective, and 'will the Rajdhani Express arrive' becomes declarative 'the Rajdhani Express would arrive'.",
    explanationBn: "'When' Connector এবং এরপরে 'the Rajdhani Express would arrive' (Declarative Order) বসে।"
  },
  {
    id: 24,
    question: "Convert to Indirect Speech: She said, 'I know the answer to this riddle.'",
    options: [
      "She said that she knew the answer to that riddle.",
      "She said that she knows the answer to that riddle.",
      "She told that she knew the answer to this riddle.",
      "She said that she had known the answer to that riddle."
    ],
    correctAnswer: "She said that she knew the answer to that riddle.",
    explanation: "Simple present 'know' becomes simple past 'knew', and 'this' becomes 'that'.",
    explanationBn: "Simple Present 'know' পরিবর্তিত হয়ে 'knew' এবং 'this' হয় 'that'।"
  },
  {
    id: 25,
    question: "What is the most common error students commit in interrogative narration?",
    options: [
      "Maintaining the question word order (Auxiliary before Subject) instead of Declarative order (Subject before Verb).",
      "Using 'asked' as the reporting verb.",
      "Changing 'this' to 'that'.",
      "Removing the quotation marks."
    ],
    correctAnswer: "Maintaining the question word order (Auxiliary before Subject) instead of Declarative order (Subject before Verb).",
    explanation: "Students frequently write 'He asked where was I going' instead of the grammatically mandatory declarative order 'He asked where I was going'.",
    explanationBn: "সবচেয়ে প্রচলিত ভুল হলো Indirect Speech-এও প্রশ্নের মতো ভার্বকে সাবজেক্টের আগে রাখা ('where was I going'); সঠিক রূপ হলো 'where I was going' (Subject + Verb)।"
  }
];

export default questions;
