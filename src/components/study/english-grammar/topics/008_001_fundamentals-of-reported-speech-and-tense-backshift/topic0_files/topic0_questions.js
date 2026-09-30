// topic0_questions.js - Module 008_001: Fundamentals of Reported Speech, Reporting Verbs & Tense Backshift
// 25 High-Yield Diagnostic MCQs with Technical and Bengali Explanations

const questions = [
  {
    id: 1,
    question: "Convert to Indirect Speech: He said, 'The sun rises in the east and sets in the west.'",
    options: [
      "He said that the sun rose in the east and set in the west.",
      "He said that the sun rises in the east and sets in the west.",
      "He told that the sun rises in the east and sets in the west.",
      "He said that the sun had risen in the east and had set in the west."
    ],
    correctAnswer: "He said that the sun rises in the east and sets in the west.",
    explanation: "Universal scientific and geographical truths NEVER undergo tense backshift, even when the reporting verb ('said') is in the past tense.",
    explanationBn: "চিরন্তন সত্য বা বৈজ্ঞানিক সত্যের (Universal Truth) ক্ষেত্রে Reporting Verb Past Tense-এ থাকলেও ভেতরের Tense-এর কোনো পরিবর্তন (Backshift) হয় না।"
  },
  {
    id: 2,
    question: "Convert to Indirect Speech: The teacher says, 'The test is very easy.'",
    options: [
      "The teacher says that the test was very easy.",
      "The teacher says that the test is very easy.",
      "The teacher said that the test is very easy.",
      "The teacher told that the test was very easy."
    ],
    correctAnswer: "The teacher says that the test is very easy.",
    explanation: "When the reporting verb is in the Present Tense ('says') or Future Tense ('will say'), the tense of the reported speech remains completely unchanged.",
    explanationBn: "Reporting Verb যদি Present Tense ('says') বা Future Tense ('will say')-এ থাকে, তবে Reported Speech-এর Tense পরিবর্তিত হয় না।"
  },
  {
    id: 3,
    question: "Convert to Indirect Speech: She said to me, 'I completed the assignment yesterday.'",
    options: [
      "She told me that she had completed the assignment the previous day.",
      "She said to me that she completed the assignment yesterday.",
      "She told me that she completed the assignment the previous day.",
      "She told to me that she had completed the assignment yesterday."
    ],
    correctAnswer: "She told me that she had completed the assignment the previous day.",
    explanation: "'Said to me' becomes 'told me', Simple Past ('completed') backshifts to Past Perfect ('had completed'), and 'yesterday' shifts to 'the previous day'.",
    explanationBn: "'Said to me' পরিবর্তিত হয়ে 'told me' হয়, Simple Past পরিবর্তিত হয়ে Past Perfect ('had completed') হয় এবং 'yesterday' পরিবর্তিত হয়ে 'the previous day' হয়।"
  },
  {
    id: 4,
    question: "Which of the following sentences contains an error in reporting verb usage?",
    options: [
      "He said that he was tired.",
      "He told to me that he was tired.",
      "He told me that he was tired.",
      "He said to me that he was tired."
    ],
    correctAnswer: "He told to me that he was tired.",
    explanation: "The verb 'tell' is a transitive verb that takes a personal object directly without any preposition (e.g., 'told me', NOT 'told to me').",
    explanationBn: "'Told'-এর পরে সরাসরি ব্যক্তিবাচক অবজেক্ট বসে (যেমন: 'told me'); 'told to me' লেখা মারাত্মক ভুল।"
  },
  {
    id: 5,
    question: "Convert to Indirect Speech: He said, 'I am reading a classic novel now.'",
    options: [
      "He said that he was reading a classic novel then.",
      "He said that he is reading a classic novel now.",
      "He said that he had been reading a classic novel then.",
      "He told that he was reading a classic novel then."
    ],
    correctAnswer: "He said that he was reading a classic novel then.",
    explanation: "Present Continuous ('am reading') backshifts to Past Continuous ('was reading'), and the time adverbial 'now' shifts to 'then'.",
    explanationBn: "Present Continuous পরিবর্তিত হয়ে Past Continuous ('was reading') হয় এবং 'now' পরিবর্তিত হয়ে 'then' হয়।"
  },
  {
    id: 6,
    question: "Convert to Indirect Speech: The professor said, 'Water boils at 100 degrees Celsius.'",
    options: [
      "The professor said that water boiled at 100 degrees Celsius.",
      "The professor said that water boils at 100 degrees Celsius.",
      "The professor told that water boils at 100 degrees Celsius.",
      "The professor said that water has boiled at 100 degrees Celsius."
    ],
    correctAnswer: "The professor said that water boils at 100 degrees Celsius.",
    explanation: "Scientific facts maintain simple present tense in reported speech (no tense backshift).",
    explanationBn: "বৈজ্ঞানিক সত্য বা নিয়মের ক্ষেত্রে Tense অপরিবর্তিত থাকে (Water boils at 100°C)।"
  },
  {
    id: 7,
    question: "Convert to Indirect Speech: Rohan said, 'I have already seen this documentary.'",
    options: [
      "Rohan said that he had already seen that documentary.",
      "Rohan said that he has already seen that documentary.",
      "Rohan said that he had already seen this documentary.",
      "Rohan told that he saw that documentary."
    ],
    correctAnswer: "Rohan said that he had already seen that documentary.",
    explanation: "Present Perfect ('have seen') backshifts to Past Perfect ('had seen'), and the demonstrative 'this' shifts to 'that'.",
    explanationBn: "Present Perfect ('have seen') পরিবর্তিত হয়ে Past Perfect ('had seen') হয় এবং 'this' পরিবর্তিত হয়ে 'that' হয়।"
  },
  {
    id: 8,
    question: "Convert to Indirect Speech: Ananya said, 'I will call you tomorrow.'",
    options: [
      "Ananya said that she would call me the next day.",
      "Ananya said that she will call me tomorrow.",
      "Ananya said that she should call me the next day.",
      "Ananya told that she would call me tomorrow."
    ],
    correctAnswer: "Ananya said that she would call me the next day.",
    explanation: "Modal auxiliary 'will' backshifts to 'would', pronoun 'you' shifts to 'me', and 'tomorrow' shifts to 'the next day' or 'the following day'.",
    explanationBn: "'Will' পরিবর্তিত হয়ে 'would' হয় এবং 'tomorrow' পরিবর্তিত হয়ে 'the next day' বা 'the following day' হয়।"
  },
  {
    id: 9,
    question: "Convert to Indirect Speech: He said, 'I was playing cricket when it began to rain.'",
    options: [
      "He said that he had been playing cricket when it had begun to rain.",
      "He said that he was playing cricket when it began to rain.",
      "He said that he played cricket when it began to rain.",
      "Both A and B are acceptable in standard grammar, with B commonly used for parallel past background actions."
    ],
    correctAnswer: "Both A and B are acceptable in standard grammar, with B commonly used for parallel past background actions.",
    explanation: "While past continuous formally backshifts to past perfect continuous, in simultaneous past narrative time clauses introduced by 'when/while', the past continuous and simple past are frequently retained unchanged.",
    explanationBn: "Past Continuous সাধারণ ক্ষেত্রে 'had been V-ing'-এ রূপান্তরিত হলেও 'when/while'-যুক্ত যুগপৎ অতীত বর্ণনায় অপরিবর্তিত রাখা ব্যাকরণসম্মত।"
  },
  {
    id: 10,
    question: "Convert to Indirect Speech: He said, 'I can solve these complex calculus problems.'",
    options: [
      "He said that he could solve those complex calculus problems.",
      "He said that he can solve those complex calculus problems.",
      "He said that he could solve these complex calculus problems.",
      "He told that he could solve those complex calculus problems."
    ],
    correctAnswer: "He said that he could solve those complex calculus problems.",
    explanation: "Modal 'can' backshifts to 'could', and plural demonstrative 'these' shifts to 'those'.",
    explanationBn: "'Can' পরিবর্তিত হয়ে 'could' হয় এবং 'these' পরিবর্তিত হয়ে 'those' হয়।"
  },
  {
    id: 11,
    question: "Convert to Indirect Speech: She said, 'I must leave immediately.'",
    options: [
      "She said that she had to leave immediately.",
      "She said that she must have left immediately.",
      "She said that she ought to leave immediately.",
      "She told that she has to leave immediately."
    ],
    correctAnswer: "She said that she had to leave immediately.",
    explanation: "When 'must' expresses immediate situational necessity/obligation, it backshifts to 'had to' in indirect past reporting.",
    explanationBn: "তাৎক্ষণিক বাধ্যবাধকতা বোঝাতে 'must' পরিবর্তিত হয়ে 'had to' হয়।"
  },
  {
    id: 12,
    question: "Identify the correct indirect speech form of a Habitual Fact: The doctor said, 'I take a morning walk every single day.'",
    options: [
      "The doctor said that he takes a morning walk every single day.",
      "The doctor said that he took a morning walk every single day.",
      "The doctor said that he had taken a morning walk every single day.",
      "The doctor told that he takes a morning walk."
    ],
    correctAnswer: "The doctor said that he takes a morning walk every single day.",
    explanation: "Habitual actions (actions performed routinely) do not undergo tense backshift in reported speech.",
    explanationBn: "অভ্যাসগত কাজের (Habitual Fact) ক্ষেত্রে Tense-এর কোনো পরিবর্তন হয় না (Simple Present বজায় থাকে)।"
  },
  {
    id: 13,
    question: "Convert to Indirect Speech: My friend said, 'I bought this camera two years ago.'",
    options: [
      "My friend said that he had bought that camera two years before.",
      "My friend said that he bought that camera two years ago.",
      "My friend said that he has bought that camera two years before.",
      "My friend told that he had bought this camera two years before."
    ],
    correctAnswer: "My friend said that he had bought that camera two years before.",
    explanation: "Simple Past ('bought') backshifts to Past Perfect ('had bought'), 'this' becomes 'that', and 'ago' becomes 'before'.",
    explanationBn: "Simple Past পরিবর্তিত হয়ে Past Perfect ('had bought') হয়, 'this' হয় 'that', এবং 'ago' পরিবর্তিত হয়ে 'before' হয়।"
  },
  {
    id: 14,
    question: "What happens to the Past Perfect Tense ('had + V3') during indirect speech backshift?",
    options: [
      "It remains unchanged as Past Perfect.",
      "It changes to Past Perfect Continuous.",
      "It changes to Simple Past.",
      "It changes to Present Perfect."
    ],
    correctAnswer: "It remains unchanged as Past Perfect.",
    explanation: "Because Past Perfect ('had + V3') is already the deepest past tense in English, it undergoes NO further backshift.",
    explanationBn: "Past Perfect Tense হলো অতীতের চূড়ান্ত রূপ, তাই Indirect Speech-এ এর আর কোনো পরিবর্তন হয় না (Past Perfect অপরিবর্তিত থাকে)।"
  },
  {
    id: 15,
    question: "Convert to Indirect Speech: The guide said, 'India became independent in 1947.'",
    options: [
      "The guide said that India became independent in 1947.",
      "The guide said that India had become independent in 1947.",
      "The guide told that India became independent in 1947.",
      "The guide said that India has become independent in 1947."
    ],
    correctAnswer: "The guide said that India became independent in 1947.",
    explanation: "Historical events with explicit historical dates do not undergo tense backshift.",
    explanationBn: "সুনির্দিষ্ট সন/তারিখযুক্ত ঐতিহাসিক সত্য ঘটনার (Historical Fact) ক্ষেত্রে Tense অপরিবর্তিত থাকে।"
  },
  {
    id: 16,
    question: "Convert to Indirect Speech: He said, 'I may join the advanced coding bootcamp.'",
    options: [
      "He said that he might join the advanced coding bootcamp.",
      "He said that he may join the advanced coding bootcamp.",
      "He said that he can join the advanced coding bootcamp.",
      "He told that he might join the advanced coding bootcamp."
    ],
    correctAnswer: "He said that he might join the advanced coding bootcamp.",
    explanation: "Modal auxiliary 'may' backshifts to 'might'.",
    explanationBn: "Modal 'may' পরিবর্তিত হয়ে 'might' হয়।"
  },
  {
    id: 17,
    question: "Identify the correct conversion of time adverbial 'today':",
    options: ["that day", "the next day", "the previous day", "then"],
    correctAnswer: "that day",
    explanation: "'Today' shifts to 'that day' in indirect speech.",
    explanationBn: "'Today' পরিবর্তিত হয়ে 'that day' হয়।"
  },
  {
    id: 18,
    question: "Convert to Indirect Speech: She said, 'I had been working for three hours when you arrived.'",
    options: [
      "She said that she had been working for three hours when I arrived.",
      "She said that she was working for three hours when I arrived.",
      "She said that she has been working for three hours when I arrived.",
      "She told that she had worked for three hours."
    ],
    correctAnswer: "She said that she had been working for three hours when I arrived.",
    explanation: "Past Perfect Continuous ('had been working') undergoes no tense change.",
    explanationBn: "Past Perfect Continuous Tense Indirect Speech-এ অপরিবর্তিত থাকে।"
  },
  {
    id: 19,
    question: "Which pronoun shift is INCORRECT when converting from 1st person direct speech to 3rd person indirect speech?",
    options: [
      "'I' -> 'he / she'",
      "'my' -> 'his / her'",
      "'we' -> 'they'",
      "'our' -> 'your'"
    ],
    correctAnswer: "'our' -> 'your'",
    explanation: "'Our' shifts to 'their' (3rd person plural possessive), NOT 'your'.",
    explanationBn: "'Our' (আমাদের) পরিবর্তিত হয়ে 'their' (তাদের) হয়; 'your' হওয়া ভুল।"
  },
  {
    id: 20,
    question: "Convert to Indirect Speech: The principal will say, 'Discipline is paramount.'",
    options: [
      "The principal will say that discipline is paramount.",
      "The principal will say that discipline was paramount.",
      "The principal would say that discipline was paramount.",
      "The principal will tell that discipline is paramount."
    ],
    correctAnswer: "The principal will say that discipline is paramount.",
    explanation: "Because the reporting verb is in the Future Tense ('will say'), the tense of the reported clause remains strictly in the present ('is').",
    explanationBn: "Reporting Verb Future Tense ('will say')-এ থাকলে ভেতরের Tense পরিবর্তিত হয় না।"
  },
  {
    id: 21,
    question: "Convert to Indirect Speech: Rahul said, 'I live here in Kolkata.'",
    options: [
      "Rahul said that he lived there in Kolkata.",
      "Rahul said that he lives here in Kolkata.",
      "Rahul said that he had lived there in Kolkata.",
      "Rahul told that he lived there in Kolkata."
    ],
    correctAnswer: "Rahul said that he lived there in Kolkata.",
    explanation: "Simple Present ('live') becomes Simple Past ('lived'), and place adverbial 'here' shifts to 'there'.",
    explanationBn: "Simple Present ('live') পরিবর্তিত হয়ে Simple Past ('lived') হয় এবং 'here' পরিবর্তিত হয়ে 'there' হয়।"
  },
  {
    id: 22,
    question: "Convert to Indirect Speech: He said, 'Honesty is always rewarded in the end.'",
    options: [
      "He said that honesty is always rewarded in the end.",
      "He said that honesty was always rewarded in the end.",
      "He said that honesty had been always rewarded in the end.",
      "He told that honesty was rewarded in the end."
    ],
    correctAnswer: "He said that honesty is always rewarded in the end.",
    explanation: "Proverbs and universal moral maxims do not undergo tense backshift.",
    explanationBn: "প্রবাদ বা চিরন্তন নৈতিক সত্যের (Proverbs/Maxims) ক্ষেত্রে Tense অপরিবর্তিত থাকে।"
  },
  {
    id: 23,
    question: "Identify the correct change for 'tonight' in indirect speech:",
    options: ["that night", "the night before", "the following night", "then"],
    correctAnswer: "that night",
    explanation: "'Tonight' converts to 'that night' in reported discourse.",
    explanationBn: "'Tonight' পরিবর্তিত হয়ে 'that night' হয়।"
  },
  {
    id: 24,
    question: "Convert to Indirect Speech: The astronomer said, 'Light travels faster than sound.'",
    options: [
      "The astronomer said that light travels faster than sound.",
      "The astronomer said that light travelled faster than sound.",
      "The astronomer told that light travelled faster than sound.",
      "The astronomer said that light had travelled faster than sound."
    ],
    correctAnswer: "The astronomer said that light travels faster than sound.",
    explanation: "Physical scientific fact maintains present tense ('travels').",
    explanationBn: "পদার্থবিজ্ঞানের ধ্রুব সত্য হিসেবে 'travels' অপরিবর্তিত থাকবে।"
  },
  {
    id: 25,
    question: "What is the primary difference between 'Say' and 'Tell' as reporting verbs?",
    options: [
      "'Tell' requires a personal object without 'to'; 'Say' does not require a personal object.",
      "'Say' always requires 'to'; 'Tell' can never take an object.",
      "'Tell' is only used in questions; 'Say' is only used in statements.",
      "'Say' and 'Tell' are 100% interchangeable without any syntactic difference."
    ],
    correctAnswer: "'Tell' requires a personal object without 'to'; 'Say' does not require a personal object.",
    explanation: "'Tell' is a monotransitive/ditransitive verb requiring a receiver of the information ('He told me...'), whereas 'Say' focuses on the utterance itself ('He said that...').",
    explanationBn: "'Tell'-এর পরে সরাসরি ব্যক্তিবাচক শ্রোতার উল্লেখ (Personal Object) থাকা বাধ্যতামূলক (যেমন: told me); কিন্তু 'Say'-এর ক্ষেত্রে অবজেক্ট ছাড়া সরাসরি 'said that' বসে।"
  }
];

export default questions;
