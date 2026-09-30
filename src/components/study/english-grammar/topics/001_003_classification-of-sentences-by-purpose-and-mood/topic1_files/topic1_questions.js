// topic1_questions.js
// Module 001_003 | Topic 1: Interrogative Sentences: Yes/No Inversion vs Wh- Questions

const questions = [
  {
    id: 1,
    question: "What syntactic transformation creates a standard YES/NO question from an assertive statement in English?",
    options: [
      "Subject-Auxiliary Inversion (Auxiliary Verb moves before the Subject)",
      "Adding a period at the end",
      "Moving the object to the front",
      "Deleting the verb"
    ],
    correctAnswer: 0,
    explanation: "Yes/No questions invert the auxiliary verb before the subject ($Auxiliary + Subject + Main Verb$).",
    explanationBn: "Yes/No প্রশ্ন তৈরি করার জন্য Auxiliary Verb-টিকে Subject-এর পূর্বে বসানো হয় (Subject-Auxiliary Inversion)।"
  },
  {
    id: 2,
    question: "Convert the assertive statement 'Swadeep develops AI applications' into a direct present interrogative:",
    options: [
      "Does Swadeep develop AI applications?",
      "Develops Swadeep AI applications?",
      "Is Swadeep develop AI applications?",
      "Do Swadeep develops AI applications?"
    ],
    correctAnswer: 0,
    explanation: "For present simple verbs without auxiliaries, English uses the dummy operator 'Does' + base verb 'develop'.",
    explanationBn: "Present Simple Tense-এ 3rd Person Singular Subject-এর জন্য 'Does' + Base Verb ('develop') বসে।"
  },
  {
    id: 3,
    question: "In Wh- questions, when the Wh- word is the SUBJECT (e.g., 'Who wrote the code?'), what is the inversion rule?",
    options: [
      "NO auxiliary inversion is used; the Wh- subject is followed directly by the affirmative verb group ('Who wrote the code?')",
      "You must always say 'Who did write the code?'",
      "Inversion is mandatory",
      "The sentence must be passive"
    ],
    correctAnswer: 0,
    explanation: "When 'Who' or 'What' functions as the subject, standard S-V order is maintained without dummy 'do/did'.",
    explanationBn: "Wh-শব্দটি নিজে Subject হলে কোনো Inversion বা 'did' বসে না; সরাসরি Verb বসে (যেমন: 'Who wrote the code?')।"
  },
  {
    id: 4,
    question: "In Wh- questions when the Wh- word is the OBJECT (e.g., 'What did you buy?'), what is the structure?",
    options: [
      "Wh- Word + Auxiliary Operator + Subject + Base Verb",
      "Wh- Word + Subject + Verb",
      "Wh- Word + Verb + Subject",
      "Wh- Word + Object"
    ],
    correctAnswer: 0,
    explanation: "Wh- Object questions require full inversion: $Wh + Aux + S + V$ (e.g., 'What did you buy?').",
    explanationBn: "Wh-শব্দটি Object হলে $Wh + Auxiliary + Subject + Verb$ কাঠামো অনুযায়ী Inversion বাধ্যতামূলক।"
  },
  {
    id: 5,
    question: "Convert 'She has completed the research' into an interrogative:",
    options: [
      "Has she completed the research?",
      "Did she has completed the research?",
      "Does she completed the research?",
      "Completed she the research?"
    ],
    correctAnswer: 0,
    explanation: "The auxiliary 'has' moves before the subject 'she'.",
    explanationBn: "'Has' Auxiliary Verb-টি Subject 'she'-এর আগে বসে প্রশ্ন গঠন করে।"
  },
  {
    id: 6,
    question: "Identify the INCORRECT interrogative structure:",
    options: [
      "Why you did not attend the seminar yesterday?",
      "Why did you not attend the seminar yesterday?",
      "Why didn't you attend the seminar yesterday?",
      "Did you attend the seminar yesterday?"
    ],
    correctAnswer: 0,
    explanation: "'Why you did not...' fails Subject-Auxiliary Inversion and is ungrammatical in standard English.",
    explanationBn: "Wh-এর পর Auxiliary Verb না বসিয়ে সরাসরি Subject বসালে প্রশ্নবোধক বাক্য অশুদ্ধ হয়।"
  },
  {
    id: 7,
    question: "In indirect questions like 'I wonder where she lives', why is there NO inversion (*'where does she live')?",
    options: [
      "Because embedded noun clauses in assertive matrix sentences maintain affirmative declarative word order ($Subject + Verb$)",
      "Because the question mark is missing",
      "Because 'wonder' is intransitive",
      "Because 'lives' is plural"
    ],
    correctAnswer: 0,
    explanation: "Indirect embedded questions function as noun clauses and follow standard Subject-Verb affirmative order.",
    explanationBn: "Indirect / Embedded Question-এ কোনো Inversion হয় না; সাধারণ Subject + Verb ক্রম বজায় থাকে।"
  },
  {
    id: 8,
    question: "Convert 'They were absent because of illness' into a Wh- question asking for the reason:",
    options: [
      "Why were they absent?",
      "Why they were absent?",
      "How were they absent?",
      "Where they were absent?"
    ],
    correctAnswer: 0,
    explanation: "'Why' queries reason with auxiliary inversion: 'Why were they absent?'.",
    explanationBn: "কারণ জানতে 'Why were they absent?' সঠিক কাঠামো।"
  },
  {
    id: 9,
    question: "What is a RHETORICAL question?",
    options: [
      "A question asked for dramatic effect or assertion where no verbal answer is expected (e.g., 'Who does not love their motherland?')",
      "A question about chemistry",
      "A question with no verb",
      "A question spoken in whispering tone"
    ],
    correctAnswer: 0,
    explanation: "Rhetorical questions function pragmatically as strong assertions rather than genuine information requests.",
    explanationBn: "Rhetorical Question হলো এমন প্রশ্ন যার উত্তর সবার জানা এবং এটি জোরালো বক্তব্যের জন্য ব্যবহৃত হয়।"
  },
  {
    id: 10,
    question: "Why is Subject-Auxiliary Inversion a critical topic for Bengali-medium learners?",
    options: [
      "Because in Bengali, questions are formed simply by adding 'কি' without changing word order, leading learners to mistakenly omit auxiliary inversion in English",
      "Because Bengali has no questions",
      "Because English has no question marks",
      "Because inversion is optional"
    ],
    correctAnswer: 0,
    explanation: "Bengali forms questions with question particles without reordering, causing students to mistakenly say *'Why you went?'* instead of *'Why did you go?'*.",
    explanationBn: "বাংলায় শুধু 'কি' যোগ করলেই প্রশ্ন হয় বলে বাঙালি শিক্ষার্থীরা ইংরেজিতে Inversion বাদ দিয়ে 'Why you did this?' ভুলটি প্রায়ই করে।"
  }
];

export default questions;
