// topic23_files/topic23_questions.js
const questions = [
  {
    question: "What is a truth table?",
    shortAnswer: "A table showing all possible truth values of a logical expression.",
    explanation: "It lists every combination of input values and the resulting output.",
    hint: "Exhaustive enumeration.",
    level: "basic"
  },
  {
    question: "How many rows are needed for an expression with 3 variables?",
    shortAnswer: "8 rows",
    explanation: "2^3 = 8 combinations.",
    hint: "2 to the power n.",
    level: "basic"
  },
  {
    question: "What does it mean if two expressions have identical truth table columns?",
    shortAnswer: "They are logically equivalent.",
    explanation: "Same truth value for all inputs → equivalent.",
    hint: "Identical columns.",
    level: "basic"
  },
  {
    question: "How do you identify a tautology using a truth table?",
    shortAnswer: "The final column is all true.",
    explanation: "Tautology is true for every assignment.",
    hint: "All T's.",
    level: "basic"
  },
  {
    question: "How do you identify a contradiction using a truth table?",
    shortAnswer: "The final column is all false.",
    explanation: "Contradiction is false for every assignment.",
    hint: "All F's.",
    level: "basic"
  },
  {
    question: "What is a contingency?",
    shortAnswer: "A statement with both true and false in its truth table.",
    explanation: "Neither a tautology nor a contradiction.",
    hint: "Mixed results.",
    level: "basic"
  },
  {
    question: "Construct truth table for p ∧ q. How many true rows?",
    shortAnswer: "1 true row (when both p and q are true).",
    explanation: "AND is true only when both true.",
    hint: "Only TT gives T.",
    level: "basic"
  },
  {
    question: "Construct truth table for p ∨ q. How many true rows?",
    shortAnswer: "3 true rows (TT, TF, FT).",
    explanation: "OR is false only when both false.",
    hint: "Only FF gives F.",
    level: "basic"
  },
  {
    question: "Verify using truth table: p ⇒ q is equivalent to ¬p ∨ q.",
    shortAnswer: "Yes, columns match.",
    explanation: "Both are false only when p true and q false.",
    hint: "Check T,F row.",
    level: "intermediate"
  },
  {
    question: "Verify De Morgan's first law using truth table.",
    shortAnswer: "Columns for ¬(p∧q) and ¬p∨¬q match.",
    explanation: "Both are false only when p and q both true.",
    hint: "Check T,T row.",
    level: "intermediate"
  },
  {
    question: "How many rows for 4 variables?",
    shortAnswer: "16 rows",
    explanation: "2^4 = 16.",
    hint: "Double each time.",
    level: "basic"
  },
  {
    question: "What is the main limitation of truth tables?",
    shortAnswer: "Exponential growth makes them impractical for many variables.",
    explanation: "For 10 variables, 1024 rows is too many to do manually.",
    hint: "Too many rows.",
    level: "intermediate"
  },
  {
    question: "Verify: (p ∧ q) ⇒ p is a tautology using truth table.",
    shortAnswer: "Final column all true.",
    explanation: "If p∧q true then p true; if p∧q false, implication true vacuously.",
    hint: "Always true.",
    level: "intermediate"
  },
  {
    question: "What is the systematic order for rows in a truth table?",
    shortAnswer: "Binary counting from 0 to 2ⁿ-1.",
    explanation: "Assign T=1, F=0, count in binary.",
    hint: "000, 001, 010, ...",
    level: "basic"
  },
  {
    question: "Verify: p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) using truth table.",
    shortAnswer: "Columns match for all 8 rows.",
    explanation: "Distributive law.",
    hint: "Check all combos.",
    level: "expert"
  },
  {
    question: "What is the truth table for XOR (p ⊕ q)?",
    shortAnswer: "True when p and q differ: (T,F)→T, (F,T)→T, others F.",
    explanation: "Exclusive OR.",
    hint: "Different = true.",
    level: "intermediate"
  },
  {
    question: "Verify: p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r).",
    shortAnswer: "Yes, columns match.",
    explanation: "OR distributes over AND.",
    hint: "Check each row.",
    level: "expert"
  },
  {
    question: "How do you verify that two expressions are not equivalent using truth table?",
    shortAnswer: "Find at least one row where they differ.",
    explanation: "A single counterexample disproves equivalence.",
    hint: "One different row.",
    level: "basic"
  },
  {
    question: "What is the truth table for p ⇒ (q ⇒ p)?",
    shortAnswer: "All true (tautology).",
    explanation: "Always true regardless of p,q.",
    hint: "Check all rows.",
    level: "expert"
  },
  {
    question: "How many rows for an expression with 5 variables?",
    shortAnswer: "32 rows",
    explanation: "2^5 = 32.",
    level: "basic"
  },
  {
    question: "What is the purpose of intermediate columns in a truth table?",
    shortAnswer: "To break down complex expressions step by step.",
    explanation: "Reduces errors and shows evaluation process.",
    hint: "Sub-expressions.",
    level: "basic"
  },
  {
    question: "Verify: p ⇒ q is NOT equivalent to q ⇒ p.",
    shortAnswer: "Rows differ at (T,F) and (F,T).",
    explanation: "Implication is not symmetric.",
    hint: "Check opposite rows.",
    level: "intermediate"
  },
  {
    question: "What does it mean if the final column of a truth table has both T and F?",
    shortAnswer: "The statement is a contingency.",
    explanation: "Not always true, not always false.",
    hint: "Mixed.",
    level: "basic"
  },
  {
    question: "Construct truth table for ¬(p ∨ q). How many true rows?",
    shortAnswer: "1 true row (when both false).",
    explanation: "Only F,F gives T after negation.",
    hint: "De Morgan.",
    level: "intermediate"
  },
  {
    question: "Verify: (p ⇒ q) ∨ (q ⇒ p) is a tautology.",
    shortAnswer: "All rows true.",
    explanation: "One of the two implications always holds.",
    hint: "Always true.",
    level: "expert"
  },
  {
    question: "What is the truth table for p ⇔ q?",
    shortAnswer: "True when p and q same (TT, FF).",
    explanation: "Biconditional.",
    hint: "Both true or both false.",
    level: "basic"
  },
  {
    question: "How do you verify absorption law p ∨ (p ∧ q) ≡ p?",
    shortAnswer: "Columns for left and right match for all rows.",
    explanation: "When p true, left true; when p false, left false.",
    hint: "Check both cases.",
    level: "intermediate"
  },
  {
    question: "What is the advantage of truth tables over algebraic simplification?",
    shortAnswer: "They are mechanical and foolproof for small n.",
    explanation: "No need to remember laws; just compute.",
    hint: "Brute force.",
    level: "basic"
  },
  {
    question: "What is the disadvantage of truth tables compared to algebraic methods?",
    shortAnswer: "Exponential growth for many variables.",
    explanation: "Algebraic methods scale better.",
    hint: "Manual work.",
    level: "basic"
  },
  {
    question: "Verify: (p ∧ q) ∨ r is NOT equivalent to p ∧ (q ∨ r).",
    shortAnswer: "Find counterexample: p=F,q=T,r=T gives left true, right false.",
    explanation: "Distribution doesn't work that way.",
    hint: "Check F,T,T.",
    level: "expert"
  }
];

export default questions;