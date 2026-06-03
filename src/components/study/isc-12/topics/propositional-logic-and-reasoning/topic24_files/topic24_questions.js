// topic24_files/topic24_questions.js
const questions = [
  {
    question: "What is the weightage of propositional logic in ISC Computer Science?",
    shortAnswer: "Typically 10-15 marks across various sections.",
    explanation: "Questions appear in short answer, truth table, and simplification sections.",
    hint: "Check previous year papers.",
    level: "basic"
  },
  {
    question: "How many marks is a truth table question usually worth?",
    shortAnswer: "2-3 marks.",
    explanation: "ISC papers often have a 2 or 3 mark question on constructing truth tables.",
    hint: "Small to medium weight.",
    level: "basic"
  },
  {
    question: "In ISC, is showing intermediate columns in truth tables mandatory?",
    shortAnswer: "Recommended for clarity and partial marks.",
    explanation: "Examiners award partial marks for correct sub-expressions even if final answer is wrong.",
    hint: "Show working.",
    level: "basic"
  },
  {
    question: "What is the most common mistake in ISC truth table questions?",
    shortAnswer: "Incorrect number of rows.",
    explanation: "For 3 variables, many students write 6 or 4 rows instead of 8.",
    hint: "2^n rows.",
    level: "basic"
  },
  {
    question: "Which logical law is most frequently tested in ISC?",
    shortAnswer: "De Morgan's laws.",
    explanation: "Questions often require applying De Morgan to simplify or negate compound statements.",
    hint: "Negation of AND/OR.",
    level: "intermediate"
  },
  {
    question: "Does ISC ask about converse, inverse, and contrapositive?",
    shortAnswer: "Yes, regularly.",
    explanation: "Typically a 2-3 mark question asking to write all three for a given implication.",
    hint: "Know the definitions.",
    level: "basic"
  },
  {
    question: "What is the ISC marking scheme for simplification using laws?",
    shortAnswer: "One mark per correct application of a law.",
    explanation: "Examiners expect you to mention which law you used at each step.",
    hint: "Show laws used.",
    level: "intermediate"
  },
  {
    question: "How many years of previous papers should a student practice?",
    shortAnswer: "At least 5-7 years.",
    explanation: "Pattern recognition and topic repetition help.",
    hint: "Consistent practice.",
    level: "basic"
  },
  {
    question: "In ISC, are truth tables accepted for proving logical equivalence?",
    shortAnswer: "Yes, for up to 3 variables.",
    explanation: "Truth tables are a valid method, but for more variables algebraic method is expected.",
    hint: "Acceptable for small n.",
    level: "basic"
  },
  {
    question: "What is the most common type of implication question in ISC?",
    shortAnswer: "Writing contrapositive or simplifying implication.",
    explanation: "Often combined with De Morgan or other laws.",
    hint: "Implication to OR.",
    level: "intermediate"
  },
  {
    question: "Does ISC ask about tautology and contradiction?",
    shortAnswer: "Yes, frequently.",
    explanation: "Questions may ask to identify if a statement is tautology/contradiction/contingency.",
    hint: "Check final column.",
    level: "basic"
  },
  {
    question: "What is the typical time limit for a 3-mark logic question?",
    shortAnswer: "5-6 minutes.",
    explanation: "Speed comes with practice.",
    hint: "Manage time.",
    level: "basic"
  },
  {
    question: "Are there assertion-reason questions in ISC Computer Science?",
    shortAnswer: "Yes, in some years.",
    explanation: "Assertion-reason format appears occasionally.",
    hint: "Check pattern.",
    level: "intermediate"
  },
  {
    question: "How can I avoid losing marks in truth table construction?",
    shortAnswer: "List all rows systematically (binary counting), use intermediate columns.",
    explanation: "Partial marks are awarded for correct sub-expressions.",
    hint: "Show working.",
    level: "basic"
  },
  {
    question: "What is the most frequently tested law in ISC simplification problems?",
    shortAnswer: "Distributive law and De Morgan.",
    explanation: "These appear in almost every simplification question.",
    hint: "AND over OR, OR over AND.",
    level: "intermediate"
  },
  {
    question: "Does ISC ask to prove logical equivalence using algebraic laws?",
    shortAnswer: "Yes, often.",
    explanation: "You must state which law is applied at each step.",
    hint: "Show laws.",
    level: "intermediate"
  },
  {
    question: "What is the best way to prepare for ISC logic questions?",
    shortAnswer: "Practice truth tables, memorize laws, solve previous year papers.",
    explanation: "Consistent practice and understanding concepts, not rote learning.",
    hint: "Concept + practice.",
    level: "basic"
  },
  {
    question: "Are there questions on 'only if' and 'if and only if' in ISC?",
    shortAnswer: "Yes, they test understanding of necessary and sufficient conditions.",
    explanation: "Often part of English to logic translation questions.",
    hint: "Know the difference.",
    level: "intermediate"
  },
  {
    question: "What is the most common error in implication truth tables?",
    shortAnswer: "Thinking false ⇒ false is false.",
    explanation: "Implication is true when antecedent is false (vacuous truth).",
    hint: "Only T→F is F.",
    level: "basic"
  },
  {
    question: "How many marks is a simplification question usually worth?",
    shortAnswer: "3-4 marks.",
    explanation: "Requires multiple steps and law applications.",
    hint: "Medium weight.",
    level: "basic"
  },
  {
    question: "Does ISC ask to convert English statements to logical expressions?",
    shortAnswer: "Yes, occasionally.",
    explanation: "Tests understanding of logical connectives in natural language.",
    hint: "Identify keywords.",
    level: "intermediate"
  },
  {
    question: "What is the passing strategy for logic section in ISC?",
    shortAnswer: "Master truth tables and De Morgan; they cover most questions.",
    explanation: "These two topics appear in multiple question types.",
    hint: "Focus on high-yield topics.",
    level: "basic"
  },
  {
    question: "Are calculators allowed in ISC Computer Science exam?",
    shortAnswer: "No, calculators are not allowed for theory paper.",
    explanation: "All calculations are logical, not arithmetic.",
    hint: "Manual work.",
    level: "basic"
  },
  {
    question: "How to get full marks in a truth table question?",
    shortAnswer: "Correct number of rows, all intermediate columns, correct final column, and classification.",
    explanation: "Neat presentation also matters.",
    hint: "Complete and neat.",
    level: "basic"
  },
  {
    question: "What is the most difficult type of logic question in ISC?",
    shortAnswer: "Complex simplification using multiple laws.",
    explanation: "Requires careful step-by-step application and remembering all laws.",
    hint: "Practice more.",
    level: "expert"
  },
  {
    question: "Does ISC have questions on binary logic gates?",
    shortAnswer: "No, that's in Computer Hardware section, not propositional logic.",
    explanation: "Propositional logic is theoretical, gates are separate.",
    hint: "Different topic.",
    level: "basic"
  },
  {
    question: "How to check if your simplification is correct?",
    shortAnswer: "Build a truth table for the original and simplified expression.",
    explanation: "If columns match, simplification is correct.",
    hint: "Verify with truth table.",
    level: "intermediate"
  },
  {
    question: "What is the most common distributive law question?",
    shortAnswer: "p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r).",
    explanation: "AND over OR distribution is frequently tested.",
    hint: "Multiplication over addition analogy.",
    level: "intermediate"
  },
  {
    question: "How to prepare for assertion-reason questions in ISC?",
    shortAnswer: "Practice determining truth values independently and then checking explanation.",
    explanation: "Many students skip evaluating truth first.",
    hint: "True/false first.",
    level: "intermediate"
  },
  {
    question: "What is the best resource for ISC previous year questions?",
    shortAnswer: "Official ISC board question papers from council website or compiled books.",
    explanation: "Authentic papers give accurate pattern.",
    hint: "Use official sources.",
    level: "basic"
  }
];

export default questions;