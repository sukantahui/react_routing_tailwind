// topic25_files/topic25_questions.js
const questions = [
  {
    question: "What is the best way to approach mixed practice problems?",
    shortAnswer: "Identify the topic first, then apply appropriate method (truth table, laws, etc.).",
    explanation: "Each problem type has a specific strategy. Read carefully to know what is asked.",
    hint: "Categorize before solving.",
    level: "basic"
  },
  {
    question: "How many rows in a truth table for 4 variables?",
    shortAnswer: "16 rows",
    explanation: "2^4 = 16 possible combinations.",
    hint: "2 to the power n.",
    level: "basic"
  },
  {
    question: "What is the most frequently tested logical law in exams?",
    shortAnswer: "De Morgan's laws",
    explanation: "Appears in simplification, negation, and equivalence problems.",
    hint: "Negation of AND/OR.",
    level: "basic"
  },
  {
    question: "How can I check if my simplification is correct?",
    shortAnswer: "Build a truth table for original and simplified expression.",
    explanation: "If columns match, simplification is correct.",
    hint: "Verify with truth table.",
    level: "intermediate"
  },
  {
    question: "What is the difference between converse and contrapositive?",
    shortAnswer: "Converse swaps without negating; contrapositive swaps AND negates.",
    explanation: "Converse: q⇒p; Contrapositive: ¬q⇒¬p.",
    hint: "Contrapositive has negations.",
    level: "basic"
  },
  {
    question: "How to translate 'p unless q'?",
    shortAnswer: "p ∨ q (or ¬q ⇒ p)",
    explanation: "'Unless' introduces an alternative condition.",
    hint: "OR or implication.",
    level: "intermediate"
  },
  {
    question: "What is the truth table pattern for implication?",
    shortAnswer: "False only when true ⇒ false.",
    explanation: "All other cases (F⇒T, F⇒F, T⇒T) are true.",
    hint: "Only T→F is F.",
    level: "basic"
  },
  {
    question: "How to prove logical equivalence without truth table?",
    shortAnswer: "Use algebraic laws to transform one expression into the other.",
    explanation: "Apply identity, De Morgan, distributive, etc. step by step.",
    hint: "Algebraic manipulation.",
    level: "intermediate"
  },
  {
    question: "What is a contingency?",
    shortAnswer: "A statement that is neither tautology nor contradiction.",
    explanation: "Truth table has both true and false values.",
    hint: "Mixed results.",
    level: "basic"
  },
  {
    question: "Simplify: p ∨ (p ∧ q)",
    shortAnswer: "p (absorption law)",
    explanation: "p absorbs the larger expression.",
    hint: "Absorption.",
    level: "basic"
  },
  {
    question: "What is the dual of a logical expression?",
    shortAnswer: "Swap ∧ with ∨ and True with False.",
    explanation: "The dual of a tautology is a contradiction.",
    hint: "Swap operators.",
    level: "expert"
  },
  {
    question: "How to translate 'if and only if'?",
    shortAnswer: "⇔ (biconditional)",
    explanation: "Both directions must hold.",
    hint: "Two-way implication.",
    level: "basic"
  },
  {
    question: "What is the identity law for AND?",
    shortAnswer: "p ∧ True ≡ p",
    explanation: "True is neutral for AND.",
    hint: "AND with True.",
    level: "basic"
  },
  {
    question: "What is the domination law for OR?",
    shortAnswer: "p ∨ True ≡ True",
    explanation: "True dominates OR.",
    hint: "OR with True.",
    level: "basic"
  },
  {
    question: "Simplify: ¬(p ∨ ¬q)",
    shortAnswer: "¬p ∧ q",
    explanation: "Apply De Morgan: ¬p ∧ ¬(¬q) = ¬p ∧ q.",
    hint: "De Morgan + double negation.",
    level: "intermediate"
  },
  {
    question: "What is the exportation law?",
    shortAnswer: "p ⇒ (q ⇒ r) ≡ (p ∧ q) ⇒ r",
    explanation: "Flattens nested implications.",
    hint: "Combine antecedents.",
    level: "expert"
  },
  {
    question: "How to prove a statement is a tautology?",
    shortAnswer: "Truth table all true, or reduce to True using laws.",
    explanation: "If expression simplifies to True, it's a tautology.",
    hint: "Always true.",
    level: "intermediate"
  },
  {
    question: "What is the difference between 'p if q' and 'p only if q'?",
    shortAnswer: "p if q: q ⇒ p; p only if q: p ⇒ q.",
    explanation: "'If' introduces sufficient condition; 'only if' introduces necessary condition.",
    hint: "Direction matters.",
    level: "intermediate"
  },
  {
    question: "Simplify: (p ∧ q) ∨ (¬p ∧ q)",
    shortAnswer: "q",
    explanation: "Factor q: q ∧ (p ∨ ¬p) = q ∧ True = q.",
    hint: "Factor out q.",
    level: "intermediate"
  },
  {
    question: "What is the associative law?",
    shortAnswer: "(p ∧ q) ∧ r ≡ p ∧ (q ∧ r), similarly for OR.",
    explanation: "Parentheses don't change the result for AND/OR.",
    hint: "Grouping doesn't matter.",
    level: "basic"
  },
  {
    question: "What is the most common mistake in truth table construction?",
    shortAnswer: "Incorrect number of rows or missing combinations.",
    explanation: "For n variables, always 2^n rows in binary order.",
    hint: "Count carefully.",
    level: "basic"
  },
  {
    question: "How to translate 'neither p nor q'?",
    shortAnswer: "¬p ∧ ¬q",
    explanation: "Both are false.",
    hint: "AND of negations.",
    level: "basic"
  },
  {
    question: "What is the complement law?",
    shortAnswer: "p ∧ ¬p ≡ False, p ∨ ¬p ≡ True",
    explanation: "A proposition and its negation cannot both be true; one must be true.",
    hint: "Contradiction and tautology.",
    level: "basic"
  },
  {
    question: "Simplify: ¬(¬p ∨ q)",
    shortAnswer: "p ∧ ¬q",
    explanation: "De Morgan: ¬(¬p) ∧ ¬q = p ∧ ¬q.",
    hint: "Negation of OR.",
    level: "intermediate"
  },
  {
    question: "What is the difference between inclusive OR and exclusive OR (XOR)?",
    shortAnswer: "Inclusive OR true if at least one true; XOR true if exactly one true.",
    explanation: "XOR excludes the case where both are true.",
    hint: "XOR = (p∨q) ∧ ¬(p∧q).",
    level: "intermediate"
  },
  {
    question: "How to prove two expressions are not equivalent?",
    shortAnswer: "Find a counterexample (one row in truth table where they differ).",
    explanation: "One counterexample is sufficient to disprove equivalence.",
    hint: "Find different row.",
    level: "basic"
  },
  {
    question: "What is the idempotent law?",
    shortAnswer: "p ∧ p ≡ p, p ∨ p ≡ p",
    explanation: "Repeating same proposition doesn't change value.",
    hint: "p and p is just p.",
    level: "basic"
  },
  {
    question: "Simplify: (p ⇒ q) ∧ (¬p ⇒ q)",
    shortAnswer: "q",
    explanation: "(¬p∨q) ∧ (p∨q) = (¬p∧p) ∨ q = False ∨ q = q.",
    hint: "Case analysis.",
    level: "expert"
  },
  {
    question: "What is the best way to prepare for logic exams?",
    shortAnswer: "Practice truth tables, memorize laws, solve mixed problems.",
    explanation: "Regular practice and understanding concepts, not rote memorization.",
    hint: "Concept + application.",
    level: "basic"
  },
  {
    question: "How to approach a problem that asks 'Simplify using laws'?",
    shortAnswer: "Apply laws step by step, mentioning each law used, until simplest form reached.",
    explanation: "Common target: eliminate redundancies, reduce to basic form.",
    hint: "Step-by-step.",
    level: "intermediate"
  }
];

export default questions;