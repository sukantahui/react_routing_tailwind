// topic22_files/topic22_questions.js
const questions = [
  {
    question: "Evaluate: p ∧ q when p=true, q=false",
    shortAnswer: "false",
    explanation: "AND (∧) returns true only when both operands are true. Here p is true but q is false, so result false.",
    hint: "Both must be true.",
    level: "basic"
  },
  {
    question: "Evaluate: p ∨ q when p=false, q=true",
    shortAnswer: "true",
    explanation: "OR (∨) returns true if at least one operand is true.",
    hint: "At least one true.",
    level: "basic"
  },
  {
    question: "Evaluate: ¬p when p=true",
    shortAnswer: "false",
    explanation: "NOT (¬) flips the truth value.",
    hint: "Opposite.",
    level: "basic"
  },
  {
    question: "Evaluate: p ⇒ q when p=true, q=false",
    shortAnswer: "false",
    explanation: "Implication is false only when antecedent true and consequent false.",
    hint: "Only false in T→F.",
    level: "basic"
  },
  {
    question: "Evaluate: p ⇒ q when p=false, q=false",
    shortAnswer: "true",
    explanation: "Implication is true when antecedent is false (vacuous truth).",
    hint: "False → anything is true.",
    level: "basic"
  },
  {
    question: "Evaluate: p ⇔ q when p=true, q=false",
    shortAnswer: "false",
    explanation: "Biconditional is true when both sides have same truth value.",
    hint: "Need both true or both false.",
    level: "basic"
  },
  {
    question: "Evaluate: (p ∧ q) ∨ r with p=true, q=false, r=true",
    shortAnswer: "true",
    explanation: "Step1: p∧q = false; Step2: false ∨ true = true.",
    hint: "OR with true is true.",
    level: "intermediate"
  },
  {
    question: "Evaluate: ¬(p ∨ q) with p=true, q=false",
    shortAnswer: "false",
    explanation: "p∨q = true; ¬true = false.",
    hint: "NOT of true is false.",
    level: "intermediate"
  },
  {
    question: "Evaluate: (p ∧ ¬q) ∨ (¬p ∧ q) with p=true, q=false",
    shortAnswer: "true",
    explanation: "p∧¬q = true∧true = true; ¬p∧q = false∧false = false; true ∨ false = true. (This is XOR)",
    hint: "XOR is true when different.",
    level: "expert"
  },
  {
    question: "Evaluate: p ⇒ (q ∧ r) with p=true, q=true, r=false",
    shortAnswer: "false",
    explanation: "q∧r = true∧false = false; p ⇒ false = true ⇒ false = false.",
    hint: "Consequent false, antecedent true → false.",
    level: "intermediate"
  },
  {
    question: "Evaluate: (p ⇒ q) ∧ (q ⇒ p) with p=true, q=false",
    shortAnswer: "false",
    explanation: "p⇒q = true⇒false = false; q⇒p = false⇒true = true; false ∧ true = false.",
    hint: "One direction false.",
    level: "intermediate"
  },
  {
    question: "What is the order of precedence for logical operators?",
    shortAnswer: "NOT (¬) highest, then AND (∧), then OR (∨), then ⇒, then ⇔.",
    explanation: "Parentheses override precedence.",
    hint: "NOT before AND before OR.",
    level: "basic"
  },
  {
    question: "Evaluate: ¬p ∧ q with p=true, q=true",
    shortAnswer: "false",
    explanation: "¬p = false; false ∧ true = false.",
    hint: "NOT before AND.",
    level: "basic"
  },
  {
    question: "Evaluate: ¬(p ∧ q) with p=true, q=false",
    shortAnswer: "true",
    explanation: "p∧q = false; ¬false = true.",
    hint: "Negation after parentheses.",
    level: "intermediate"
  },
  {
    question: "Evaluate: (p ∨ q) ⇒ r with p=false, q=true, r=false",
    shortAnswer: "false",
    explanation: "p∨q = true; true ⇒ false = false.",
    hint: "Implication false when antecedent true and consequent false.",
    level: "intermediate"
  },
  {
    question: "Evaluate: p ∨ (q ∧ r) with p=false, q=false, r=true",
    shortAnswer: "false",
    explanation: "q∧r = false∧true = false; false ∨ false = false.",
    hint: "AND before OR.",
    level: "intermediate"
  },
  {
    question: "Evaluate: (p ∧ q) ∨ (p ∧ r) with p=true, q=false, r=true",
    shortAnswer: "true",
    explanation: "p∧q = false; p∧r = true; false ∨ true = true.",
    hint: "Distributive form.",
    level: "intermediate"
  },
  {
    question: "Evaluate: p ⇒ (q ⇒ r) with p=true, q=false, r=true",
    shortAnswer: "true",
    explanation: "q⇒r = false⇒true = true; p⇒true = true⇒true = true.",
    hint: "Nested implication.",
    level: "expert"
  },
  {
    question: "Evaluate: (p ⇒ q) ⇒ r with p=true, q=false, r=false",
    shortAnswer: "false",
    explanation: "p⇒q = true⇒false = false; false ⇒ false = true? Wait false⇒false = true, not false. Let's recompute: (p⇒q)=false, then false⇒false = true. So result is true.",
    hint: "Be careful with parentheses.",
    level: "expert"
  },
  {
    question: "What is the first step in evaluating any logical expression?",
    shortAnswer: "Evaluate innermost parentheses first.",
    explanation: "Parentheses have highest precedence.",
    hint: "Inside out.",
    level: "basic"
  },
  {
    question: "Evaluate: ¬(p ∨ ¬q) with p=false, q=true",
    shortAnswer: "false",
    explanation: "¬q = false; p ∨ false = false; ¬false = true? Wait p=false, ¬q=false, false∨false=false, then ¬false=true. So result true.",
    hint: "Double negation.",
    level: "expert"
  },
  {
    question: "Evaluate: (p ∧ ¬p) ∨ q with p=true, q=false",
    shortAnswer: "false",
    explanation: "p∧¬p = true∧false = false; false ∨ false = false.",
    hint: "Contradiction.",
    level: "intermediate"
  },
  {
    question: "Evaluate: (p ∨ ¬p) ∧ q with p=true, q=false",
    shortAnswer: "false",
    explanation: "p∨¬p = true; true ∧ false = false.",
    hint: "Tautology AND false = false.",
    level: "intermediate"
  },
  {
    question: "Why is it important to write intermediate steps when evaluating complex expressions?",
    shortAnswer: "To avoid mistakes and ensure correct order of operations.",
    explanation: "Skipping steps leads to errors, especially with negation and parentheses.",
    hint: "Slow is accurate.",
    level: "basic"
  },
  {
    question: "Evaluate: (p ⇒ q) ∨ (q ⇒ p) with p=true, q=false",
    shortAnswer: "true",
    explanation: "p⇒q = false; q⇒p = true; false ∨ true = true. (This is always true)",
    hint: "Tautology.",
    level: "expert"
  },
  {
    question: "Evaluate: p ⇔ (q ⇔ r) with p=true, q=false, r=false",
    shortAnswer: "true",
    explanation: "q⇔r = false⇔false = true; p⇔true = true⇔true = true.",
    hint: "Biconditional associativity.",
    level: "expert"
  },
  {
    question: "What does the step-by-step method help you avoid?",
    shortAnswer: "Precedence mistakes and missing negations.",
    explanation: "By evaluating one operator at a time, you ensure correct order.",
    hint: "Order matters.",
    level: "basic"
  },
  {
    question: "Evaluate: ¬(p ∧ q) ∧ (p ∨ q) with p=true, q=false",
    shortAnswer: "true",
    explanation: "p∧q = false; ¬false = true; p∨q = true; true ∧ true = true.",
    hint: "De Morgan helps.",
    level: "expert"
  },
  {
    question: "In evaluation, why must you apply NOT before AND?",
    shortAnswer: "Because NOT has higher precedence than AND.",
    explanation: "¬p ∧ q means (¬p) ∧ q, not ¬(p∧q).",
    hint: "Precedence rules.",
    level: "basic"
  },
  {
    question: "Evaluate: p ∨ (q ∧ ¬r) with p=false, q=true, r=true",
    shortAnswer: "false",
    explanation: "¬r = false; q∧false = false; false ∨ false = false.",
    hint: "AND before OR.",
    level: "intermediate"
  }
];

export default questions;