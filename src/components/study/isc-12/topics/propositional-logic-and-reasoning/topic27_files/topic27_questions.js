// topic27_files/topic27_questions.js
const questions = [
  {
    question: "Why is it important to practice different types of logic examples?",
    shortAnswer: "To develop flexibility and recognize patterns across various problem types.",
    explanation: "Different examples train your brain to apply the right method for each situation.",
    hint: "Variety builds mastery.",
    level: "basic"
  },
  {
    question: "What is the first step in solving any logical equivalence problem?",
    shortAnswer: "Identify the logical operators and consider using truth table or algebraic laws.",
    explanation: "For small expressions, truth table is foolproof; for larger, use laws.",
    hint: "Choose method based on size.",
    level: "basic"
  },
  {
    question: "How do you check if two expressions are logically equivalent using laws?",
    shortAnswer: "Transform one expression into the other using known logical equivalences.",
    explanation: "Apply De Morgan, distributive, absorption, etc., step by step.",
    hint: "Algebraic manipulation.",
    level: "intermediate"
  },
  {
    question: "What is the difference between 'p unless q' and 'p if not q'?",
    shortAnswer: "They are logically equivalent: p unless q ≡ ¬q ⇒ p.",
    explanation: "'Unless' introduces an alternative condition.",
    hint: "Same meaning.",
    level: "intermediate"
  },
  {
    question: "Can a tautology be simplified to a single proposition?",
    shortAnswer: "Yes, it simplifies to True (or 1).",
    explanation: "Tautologies are always true, so the simplest form is the constant True.",
    hint: "Constant true.",
    level: "basic"
  },
  {
    question: "What is the simplest form of a contradiction?",
    shortAnswer: "False (or 0).",
    explanation: "A contradiction is always false, so simplifies to the constant False.",
    hint: "Constant false.",
    level: "basic"
  },
  {
    question: "In real-world logic, why is understanding 'only if' important?",
    shortAnswer: "It correctly captures necessary conditions (e.g., 'You can vote only if you are 18').",
    explanation: "Misinterpreting 'only if' leads to logical errors in contracts, laws, and programming.",
    hint: "Necessary condition.",
    level: "intermediate"
  },
  {
    question: "How many rows in a truth table for an expression with 4 variables?",
    shortAnswer: "16 rows",
    explanation: "2^4 = 16.",
    hint: "Double each time.",
    level: "basic"
  },
  {
    question: "What is the exportation law useful for?",
    shortAnswer: "Flattening nested implications in proofs and programming.",
    explanation: "It allows combining multiple conditions into a single antecedent.",
    hint: "Nested ifs to single if.",
    level: "expert"
  },
  {
    question: "Give an example of a contingency.",
    shortAnswer: "p ∧ q (true only when both true, false otherwise).",
    explanation: "Most everyday statements are contingencies.",
    hint: "Not always true, not always false.",
    level: "basic"
  },
  {
    question: "What is the absorption law?",
    shortAnswer: "p ∨ (p ∧ q) ≡ p and p ∧ (p ∨ q) ≡ p.",
    explanation: "The smaller term absorbs the larger.",
    hint: "Redundancy removal.",
    level: "intermediate"
  },
  {
    question: "How does De Morgan's law help in programming?",
    shortAnswer: "It simplifies negated conditions, e.g., !(a && b) becomes !a || !b.",
    explanation: "Makes complex boolean expressions more readable.",
    hint: "Readability.",
    level: "intermediate"
  },
  {
    question: "What is the difference between inclusive OR and exclusive OR (XOR)?",
    shortAnswer: "Inclusive OR true if at least one true; XOR true if exactly one true.",
    explanation: "XOR excludes the case where both are true.",
    hint: "XOR = (p∨q) ∧ ¬(p∧q).",
    level: "basic"
  },
  {
    question: "Can a logical expression be both a tautology and a contradiction?",
    shortAnswer: "No, they are mutually exclusive.",
    explanation: "A statement cannot be both always true and always false.",
    hint: "Opposites.",
    level: "basic"
  },
  {
    question: "What is the identity law for OR?",
    shortAnswer: "p ∨ False ≡ p.",
    explanation: "False is neutral for OR.",
    hint: "OR with false.",
    level: "basic"
  },
  {
    question: "How do you translate 'Neither Swadeep nor Tuhina came'?",
    shortAnswer: "¬S ∧ ¬T",
    explanation: "Both are false.",
    hint: "AND of negations.",
    level: "basic"
  },
  {
    question: "What is the relationship between contrapositive and inverse?",
    shortAnswer: "Inverse is contrapositive of converse.",
    explanation: "Inverse (¬p⇒¬q) and converse (q⇒p) are contrapositives of each other.",
    hint: "Double transformation.",
    level: "expert"
  },
  {
    question: "Why is it useful to memorize the 10+ logical laws?",
    shortAnswer: "They allow quick simplification without building truth tables.",
    explanation: "Speed and accuracy in exams and real-time reasoning.",
    hint: "Efficiency.",
    level: "basic"
  },
  {
    question: "What is the difference between 'p is sufficient for q' and 'p is necessary for q'?",
    shortAnswer: "Sufficient: p ⇒ q; Necessary: q ⇒ p.",
    explanation: "Sufficient condition guarantees q; necessary condition is required for q.",
    hint: "Direction of implication.",
    level: "intermediate"
  },
  {
    question: "In the example 'If it rains, the ground is wet', what is the converse?",
    shortAnswer: "If the ground is wet, then it rained.",
    explanation: "Converse swaps antecedent and consequent.",
    hint: "Swap.",
    level: "basic"
  },
  {
    question: "What is the most efficient way to check equivalence for 5 variables?",
    shortAnswer: "Use algebraic laws instead of truth tables (32 rows).",
    explanation: "Truth tables become impractical; laws scale better.",
    hint: "Algebra over brute force.",
    level: "intermediate"
  },
  {
    question: "What is the complement law?",
    shortAnswer: "p ∧ ¬p ≡ False, p ∨ ¬p ≡ True.",
    explanation: "Law of non-contradiction and law of excluded middle.",
    hint: "Opposites cancel.",
    level: "basic"
  },
  {
    question: "Simplify: (p ∨ q) ∧ (p ∨ ¬q)",
    shortAnswer: "p",
    explanation: "Distributive: p ∨ (q ∧ ¬q) = p ∨ False = p.",
    hint: "q ∧ ¬q is false.",
    level: "intermediate"
  },
  {
    question: "What is the difference between logical equivalence and logical implication?",
    shortAnswer: "Equivalence means same truth value always; implication means if A true then B true.",
    explanation: "Equivalence is stronger (both directions).",
    hint: "Two-way vs one-way.",
    level: "intermediate"
  },
  {
    question: "How do you translate 'You will succeed provided you work hard'?",
    shortAnswer: "W ⇒ S (if work hard then succeed).",
    explanation: "'Provided' introduces a sufficient condition.",
    hint: "If-then.",
    level: "basic"
  },
  {
    question: "What is the dual of a logical statement?",
    shortAnswer: "Swap ∧ with ∨ and True with False.",
    explanation: "Duality principle: if a statement is a tautology, its dual is a contradiction.",
    hint: "Swap operators.",
    level: "expert"
  },
  {
    question: "Can you prove logical equivalence using a truth table for 6 variables?",
    shortAnswer: "Theoretically yes, but 64 rows is very time-consuming.",
    explanation: "Practical to use algebraic laws instead.",
    hint: "Too many rows.",
    level: "intermediate"
  },
  {
    question: "What is the best approach for a mixed practice problem you've never seen before?",
    shortAnswer: "Identify the topic, recall relevant laws, and attempt step-by-step.",
    explanation: "Break the problem into smaller parts.",
    hint: "Deconstruct.",
    level: "basic"
  },
  {
    question: "How can you check if a simplification is correct without a truth table?",
    shortAnswer: "Substitute sample values (e.g., all true, all false, mixed) into both forms.",
    explanation: "If they match for several test cases, likely correct.",
    hint: "Test with examples.",
    level: "intermediate"
  },
  {
    question: "What is the purpose of the final topic 'Different Examples'?",
    shortAnswer: "To consolidate all concepts through diverse practice problems.",
    explanation: "Prepares students for any exam question by exposing them to variety.",
    hint: "Comprehensive review.",
    level: "basic"
  }
];

export default questions;