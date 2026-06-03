// topic18_files/topic18_questions.js
const questions = [
  {
    question: "What is the relationship between an implication and its contrapositive?",
    shortAnswer: "They are logically equivalent.",
    explanation: "p ⇒ q and ¬q ⇒ ¬p always have the same truth value for all assignments.",
    hint: "Check truth table — identical columns.",
    level: "basic",
    codeExample: "(p => q) === (!q => !p)"
  },
  {
    question: "Write the contrapositive of p ⇒ q.",
    shortAnswer: "¬q ⇒ ¬p",
    explanation: "Swap antecedent and consequent, then negate both.",
    hint: "Flip and negate.",
    level: "basic"
  },
  {
    question: "Is the converse (q ⇒ p) equivalent to the original?",
    shortAnswer: "No, generally not.",
    explanation: "Only the contrapositive is equivalent. Converse is a different statement.",
    hint: "Converse does not preserve truth.",
    level: "basic"
  },
  {
    question: "Prove that p ⇒ q is equivalent to ¬q ⇒ ¬p using logical laws.",
    shortAnswer: "p⇒q ≡ ¬p∨q, and ¬q⇒¬p ≡ ¬(¬q)∨¬p ≡ q∨¬p ≡ ¬p∨q. Same.",
    explanation: "Both reduce to the same disjunction.",
    hint: "Use material implication.",
    level: "intermediate"
  },
  {
    question: "Give a real-world example of an implication and its contrapositive.",
    shortAnswer: "Original: 'If it rains, the ground gets wet.' Contrapositive: 'If the ground is not wet, it did not rain.'",
    explanation: "Both are true statements about the world.",
    hint: "Think of cause and effect.",
    level: "basic"
  },
  {
    question: "Why is the contrapositive useful in mathematical proofs?",
    shortAnswer: "Sometimes proving ¬q ⇒ ¬p is easier than proving p ⇒ q.",
    explanation: "Example: Proving 'if n² is even then n is even' is easier via contrapositive 'if n is odd then n² is odd'.",
    hint: "Easier assumption.",
    level: "intermediate"
  },
  {
    question: "Is the inverse (¬p ⇒ ¬q) equivalent to the contrapositive?",
    shortAnswer: "No, the inverse is equivalent to the converse, not the contrapositive.",
    explanation: "Inverse ≡ Converse; Contrapositive ≡ Original.",
    hint: "Inverse and converse are a pair.",
    level: "intermediate"
  },
  {
    question: "If p ⇒ q is true, what can we say about its contrapositive?",
    shortAnswer: "It is also true.",
    explanation: "Logical equivalence means they share truth value.",
    hint: "Always same.",
    level: "basic"
  },
  {
    question: "Write the contrapositive of 'If Swadeep studies, he will pass'.",
    shortAnswer: "If Swadeep does not pass, then he did not study.",
    explanation: "Swap and negate: 'not pass' becomes antecedent, 'not study' becomes consequent.",
    hint: "Reverse and negate.",
    level: "basic"
  },
  {
    question: "What is the difference between contrapositive and converse?",
    shortAnswer: "Contrapositive negates both parts and swaps; converse only swaps.",
    explanation: "Contrapositive: ¬q⇒¬p; Converse: q⇒p.",
    hint: "Contrapositive has negations.",
    level: "basic"
  },
  {
    question: "Prove that the contrapositive of a tautology is a tautology.",
    shortAnswer: "Since original is always true, equivalent contrapositive is also always true.",
    explanation: "Logical equivalence preserves tautology status.",
    hint: "Equivalence means same truth in all cases.",
    level: "intermediate"
  },
  {
    question: "What is the contrapositive of (p ∧ q) ⇒ r?",
    shortAnswer: "¬r ⇒ ¬(p ∧ q) ≡ ¬r ⇒ (¬p ∨ ¬q).",
    explanation: "Swap r with (p∧q), negate both, then De Morgan on antecedent.",
    hint: "Use De Morgan after swapping.",
    level: "expert"
  },
  {
    question: "In a proof by contrapositive, what do you assume and what do you prove?",
    shortAnswer: "Assume ¬q, prove ¬p.",
    explanation: "To prove p⇒q, you prove its contrapositive ¬q⇒¬p instead.",
    hint: "Assume negation of conclusion.",
    level: "intermediate"
  },
  {
    question: "Is the contrapositive of a false implication always false?",
    shortAnswer: "Yes, because equivalence preserves truth value.",
    explanation: "If original false, contrapositive false; if original true, contrapositive true.",
    hint: "Same truth value.",
    level: "basic"
  },
  {
    question: "Write the contrapositive of 'If a number is divisible by 6, then it is divisible by 3'.",
    shortAnswer: "If a number is NOT divisible by 3, then it is NOT divisible by 6.",
    explanation: "Swap and negate the divisibility conditions.",
    hint: "Negate both divisibility statements.",
    level: "basic"
  },
  {
    question: "How can you use contrapositive to refute an implication?",
    shortAnswer: "Find a counterexample where ¬q is true but ¬p is false (i.e., q false and p true).",
    explanation: "That counterexample disproves the contrapositive, hence the original.",
    hint: "Find p true, q false.",
    level: "intermediate"
  },
  {
    question: "What is the contrapositive of p ⇒ (q ∨ r)?",
    shortAnswer: "¬(q ∨ r) ⇒ ¬p ≡ (¬q ∧ ¬r) ⇒ ¬p.",
    explanation: "Swap, negate, then De Morgan on antecedent.",
    hint: "De Morgan on the OR.",
    level: "expert"
  },
  {
    question: "Why do students often confuse contrapositive with converse?",
    shortAnswer: "Because both involve swapping, but one also requires negation.",
    explanation: "The word 'contrapositive' sounds less familiar, so they default to 'converse'.",
    hint: "Remember: contra = against (negate).",
    level: "basic"
  },
  {
    question: "If the contrapositive of a statement is true, what can we conclude?",
    shortAnswer: "The original statement is also true.",
    explanation: "Equivalence means they are both true or both false.",
    hint: "Same truth value.",
    level: "basic"
  },
  {
    question: "Write the contrapositive of 'If Abhronila is in Ichapur, then she is in West Bengal'.",
    shortAnswer: "If Abhronila is NOT in West Bengal, then she is NOT in Ichapur.",
    explanation: "Swap the locations and negate each.",
    hint: "Negate both places and swap.",
    level: "basic"
  },
  {
    question: "In programming, how is contrapositive used in condition simplification?",
    shortAnswer: "Replace if (p) { q } with if (!q) { !p } in logical contexts.",
    explanation: "But careful with side effects in imperative languages.",
    hint: "Used in refactoring boolean expressions.",
    level: "intermediate"
  },
  {
    question: "Is the contrapositive of a biconditional equivalent to the original?",
    shortAnswer: "Yes, a biconditional is symmetric, so its contrapositive is itself.",
    explanation: "p⇔q ≡ (p⇒q)∧(q⇒p). Contrapositive of each component yields (¬q⇒¬p)∧(¬p⇒¬q), which is equivalent.",
    hint: "Biconditional is its own contrapositive.",
    level: "expert"
  },
  {
    question: "What is the contrapositive of ¬p ⇒ ¬q?",
    shortAnswer: "¬(¬q) ⇒ ¬(¬p) ≡ q ⇒ p (the converse of original).",
    explanation: "Apply contrapositive to the inverse to get converse.",
    hint: "Contrapositive of inverse is converse.",
    level: "intermediate"
  },
  {
    question: "Memorization trick: how to remember that contrapositive is equivalent?",
    shortAnswer: "Think: 'Contrapositive = Flip AND Negate' and that works.",
    explanation: "Practice with truth tables to internalize.",
    hint: "Always works.",
    level: "basic"
  },
  {
    question: "Can the contrapositive be used in everyday reasoning?",
    shortAnswer: "Yes, frequently. 'If you're a doctor, you went to med school' → 'If you didn't go to med school, you're not a doctor'.",
    explanation: "People use this naturally.",
    hint: "Common sense logic.",
    level: "basic"
  },
  {
    question: "What is the contrapositive of (p ∨ q) ⇒ r?",
    shortAnswer: "¬r ⇒ ¬(p ∨ q) ≡ ¬r ⇒ (¬p ∧ ¬q).",
    explanation: "Swap, negate, then De Morgan.",
    hint: "De Morgan on OR.",
    level: "expert"
  },
  {
    question: "Is the contrapositive of a contradiction always a contradiction?",
    shortAnswer: "Yes, because equivalence preserves truth value.",
    explanation: "If original is always false, contrapositive is always false.",
    hint: "Same truth value.",
    level: "intermediate"
  },
  {
    question: "Why is proof by contrapositive considered a direct proof technique?",
    shortAnswer: "Because you directly prove the contrapositive, which is logically equivalent.",
    explanation: "It's not a proof by contradiction; it's a direct proof of an equivalent statement.",
    hint: "Equivalent statement, direct method.",
    level: "intermediate"
  },
  {
    question: "Write the contrapositive of 'If Susmita is tired, then she will rest'.",
    shortAnswer: "If Susmita does NOT rest, then she is NOT tired.",
    explanation: "Swap and negate.",
    hint: "Negate both actions.",
    level: "basic"
  },
  {
    question: "What is the relationship between contrapositive and proof by contradiction?",
    shortAnswer: "They are related but distinct. Contrapositive proves ¬q⇒¬p directly; contradiction assumes p and ¬q and derives a contradiction.",
    explanation: "Sometimes contrapositive is simpler.",
    hint: "Different techniques.",
    level: "expert"
  }
];

export default questions;