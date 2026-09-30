// topic4_questions.js
// Module 001_004 | Topic 4: Transformation Basics & The Golden Rule

const questions = [
  {
    id: 1,
    question: "What is the inviolable 'Golden Rule of Sentence Transformation' in English grammar?",
    options: [
      "The grammatical form or structural packaging changes, but the semantic meaning and propositional truth value remain 100% constant",
      "Every transformed sentence must be shorter than the original",
      "All active verbs must become passive verbs",
      "The sentence must always end with an exclamation mark"
    ],
    correctAnswer: 0,
    explanation: "Transformation is the process of changing the form of a sentence without altering its sense.",
    explanationBn: "Transformation-এর মূল নীতি হল বাক্যের রূপ বা গঠন পরিবর্তিত হলেও মূল ভাব ও অর্থ অপরিবর্তিত থাকবে।"
  },
  {
    id: 2,
    question: "Why is 'I did not like the movie' NOT a valid grammatical transformation of 'I liked the movie'?",
    options: [
      "Because it directly contradicts the original semantic meaning instead of preserving it",
      "Because 'did' is an irregular verb",
      "Because negative sentences are forbidden in grammar tests",
      "Because 'movie' is informal"
    ],
    correctAnswer: 0,
    explanation: "Transformation requires semantic invariance; merely inserting 'not' creates a contradictory negation (Conversion), not a valid grammatical Transformation.",
    explanationBn: "কেবল 'not' বসালে অর্থ সম্পূর্ণ উল্টে যায়; রূপান্তরের ক্ষেত্রে বিপরীত অর্থ রক্ষা না করে 'not' এর সাথে Antonym ব্যবহার করতে হয়।"
  },
  {
    id: 3,
    question: "What is the difference between Sentence Conversion and Sentence Transformation?",
    options: [
      "Conversion alters meaning (e.g. Yes -> No); Transformation changes syntax while preserving truth value",
      "Both are identical terms",
      "Conversion is only for mathematics",
      "Transformation is only for poetry"
    ],
    correctAnswer: 0,
    explanation: "Conversion changes the polarity and meaning; Transformation preserves meaning through grammatical equivalence.",
    explanationBn: "Conversion অর্থের পরিবর্তন ঘটায়; কিন্তু Transformation ব্যাকরণগত সমার্থকতা বজায় রেখে শুধু রূপ পরিবর্তন করে।"
  },
  {
    id: 4,
    question: "Which strategy successfully transforms 'He is wise' into a negative sentence preserving meaning?",
    options: [
      "He is not foolish.",
      "He is not wise.",
      "He is foolish.",
      "Is he not wise?"
    ],
    correctAnswer: 0,
    explanation: "'Not + Antonym' ('not foolish') retains the exact meaning of 'wise'.",
    explanationBn: "'Not + Antonym' ('not foolish') প্রয়োগের মাধ্যমে 'He is wise'-এর মূল অর্থ সুরক্ষিত থাকে।"
  },
  {
    id: 5,
    question: "When transforming sentences in competitive and board exams (ICSE/CBSE/SSC), what penalty is incurred if the tense of the main verb is altered unnecessarily?",
    options: [
      "Marks are deducted because tense integrity is a primary syntactic invariant",
      "No penalty if spelling is correct",
      "Extra marks are awarded for creativity",
      "The question is cancelled"
    ],
    correctAnswer: 0,
    explanation: "Tense consistency is mandatory in sentence transformations unless the instruction explicitly directs tense shifting.",
    explanationBn: "নির্দেশিকা ছাড়া রূপান্তরের সময় কাল (Tense) পরিবর্তন করা গুরুতর ব্যাকরণগত ভুল।"
  },
  {
    id: 6,
    question: "Transform 'Only graduates can apply for this position' using 'None but' without changing meaning:",
    options: [
      "None but graduates can apply for this position.",
      "No graduates can apply for this position.",
      "Anyone can apply for this position.",
      "Graduates cannot apply for this position."
    ],
    correctAnswer: 0,
    explanation: "'Only' for persons transforms into 'None but' with 100% semantic fidelity.",
    explanationBn: "ব্যক্তির ক্ষেত্রে 'Only'-এর সমার্থক রূপান্তর হল 'None but'।"
  },
  {
    id: 7,
    question: "Why is double negation (e.g., 'He did not fail to attend') used as a powerful stylistic tool in English?",
    options: [
      "It emphasizes certainty, formality, and defensive understatement (litotes)",
      "It confuses the reader",
      "Because English has no simple affirmative verbs",
      "It is an obsolete dialect form"
    ],
    correctAnswer: 0,
    explanation: "Litotes and double negatives ('not fail to') provide emphatic and dignified affirmation in high-level prose.",
    explanationBn: "দ্বৈত নেতিবাচক গঠন ('not fail to') ইংরেজি ভাষায় জোরালো ও আনুষ্ঠানিক স্বীকৃতি প্রকাশে ব্যবহৃত হয়।"
  },
  {
    id: 8,
    question: "Which of the following maintains exact equivalence for 'As soon as the teacher entered, the class became silent'?",
    options: [
      "No sooner had the teacher entered than the class became silent.",
      "No sooner did the teacher entered then the class became silent.",
      "Hardly the teacher entered when the class was silent.",
      "The class was silent before the teacher entered."
    ],
    correctAnswer: 0,
    explanation: "'No sooner had + Subject + V3... than' is the standard correlative negative transformation of 'As soon as'.",
    explanationBn: "'As soon as'-এর সঠিক রূপান্তর হল 'No sooner had + Subject + V3... than'।"
  },
  {
    id: 9,
    question: "What role do correlative conjunctions (e.g., neither...nor, not only...but also) play in sentence transformation?",
    options: [
      "They allow parallel syntactic structures to be unified or contrasted while maintaining balance and meaning",
      "They replace punctuation marks",
      "They delete subjects from verbs",
      "They turn sentences into questions"
    ],
    correctAnswer: 0,
    explanation: "Correlatives link parallel constituents symmetrically, allowing clean structural synthesis and transformation.",
    explanationBn: "Correlative Conjunctions বাক্যের ভারসাম্য বজায় রেখে সমান্তরাল অংশগুলোকে যুক্ত করতে সাহায্য করে।"
  },
  {
    id: 10,
    question: "How does mastering the Golden Rule of Transformation benefit advanced English learners?",
    options: [
      "It develops extraordinary stylistic agility, precision in writing, and absolute accuracy in competitive examination 'Do as Directed' sections",
      "It allows learners to memorize fewer words",
      "It makes speaking English unnecessary",
      "It replaces vocabulary learning"
    ],
    correctAnswer: 0,
    explanation: "Transformational mastery empowers writers to express any idea with varying nuance, tone, and syntactic elegance.",
    explanationBn: "রূপান্তরের দক্ষতা শিক্ষার্থীদের ভাষায় বৈচিত্র্য, গভীরতা এবং পরীক্ষায় শতভাগ নির্ভুলতা অর্জনে সহায়তা করে।"
  }
];

export default questions;
