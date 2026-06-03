// topic17_files/topic17_questions.js
const questions = [
  {
    question: "What is the contrapositive of p ⇒ q?",
    shortAnswer: "¬q ⇒ ¬p",
    explanation: "Swap the antecedent and consequent and negate both.",
    hint: "Flip and negate.",
    level: "basic",
    codeExample: "if(!q) then !p"
  },
  {
    question: "Is the contrapositive logically equivalent to the original implication?",
    shortAnswer: "Yes, always.",
    explanation: "Truth tables show identical columns for all rows. This is a fundamental logical equivalence.",
    hint: "Check truth table — all rows match.",
    level: "basic"
  },
  {
    question: "Give an example of an implication and its contrapositive.",
    shortAnswer: "Original: 'If it rains, then the ground is wet.' Contrapositive: 'If the ground is not wet, then it did not rain.'",
    explanation: "Both are true in normal circumstances.",
    hint: "Swap cause and effect, then negate.",
    level: "basic"
  },
  {
    question: "What is the contrapositive of 'If Swadeep studies, then he will pass'?",
    shortAnswer: "If Swadeep does NOT pass, then he did NOT study.",
    explanation: "Swap and negate: 'does not pass' becomes antecedent, 'did not study' becomes consequent.",
    hint: "Negate both and swap.",
    level: "basic"
  },
  {
    question: "How is the contrapositive different from the converse?",
    shortAnswer: "Converse swaps without negating (q⇒p); contrapositive swaps AND negates (¬q⇒¬p).",
    explanation: "Converse is not equivalent to original; contrapositive is.",
    hint: "Contrapositive has two negations.",
    level: "basic"
  },
  {
    question: "What is the contrapositive of ¬p ⇒ q?",
    shortAnswer: "¬q ⇒ p",
    explanation: "Swap: q becomes antecedent, ¬p becomes consequent. Then negate both: ¬q ⇒ ¬(¬p) = ¬q ⇒ p.",
    hint: "Double negation on p.",
    level: "intermediate"
  },
  {
    question: "Why is the contrapositive useful in mathematical proofs?",
    shortAnswer: "Sometimes proving ¬q ⇒ ¬p is easier than proving p ⇒ q.",
    explanation: "Example: Proving 'if n² is even then n is even' is easier via contrapositive 'if n is odd then n² is odd'.",
    hint: "Easier to prove the opposite direction.",
    level: "intermediate"
  },
  {
    question: "What is the contrapositive of (p ∧ q) ⇒ r?",
    shortAnswer: "¬r ⇒ ¬(p ∧ q), which simplifies to ¬r ⇒ (¬p ∨ ¬q).",
    explanation: "Swap r with (p∧q), negate both, then apply De Morgan to the antecedent.",
    hint: "Use De Morgan after swapping.",
    level: "expert"
  },
  {
    question: "Is the contrapositive of a tautology always a tautology?",
    shortAnswer: "Yes.",
    explanation: "If original is always true, its contrapositive is also always true because they are equivalent.",
    hint: "Equivalence preserves tautology.",
    level: "intermediate"
  },
  {
    question: "What is the contrapositive of p ⇒ (q ⇒ r)?",
    shortAnswer: "¬(q ⇒ r) ⇒ ¬p, which simplifies to (q ∧ ¬r) ⇒ ¬p.",
    explanation: "First swap: (q⇒r) becomes antecedent, p becomes consequent. Then negate both: ¬(q⇒r) ⇒ ¬p. Then ¬(q⇒r) ≡ q ∧ ¬r.",
    hint: "Negation of implication.",
    level: "expert"
  },
  {
    question: "If the original implication is false, is its contrapositive false?",
    shortAnswer: "Yes, always.",
    explanation: "Since they are equivalent, they have the same truth value. If original false, contrapositive false.",
    hint: "Equivalent means same truth value.",
    level: "basic"
  },
  {
    question: "What is the contrapositive of 'If a number is divisible by 4, then it is even'?",
    shortAnswer: "If a number is NOT even, then it is NOT divisible by 4.",
    explanation: "Swap and negate: 'not even' becomes antecedent, 'not divisible by 4' becomes consequent.",
    hint: "Negate both properties.",
    level: "basic"
  },
  {
    question: "How do you form the contrapositive of a statement with multiple conditions?",
    shortAnswer: "Swap the entire antecedent and consequent, then negate both.",
    explanation: "For (p ∧ q) ⇒ r, contrapositive is ¬r ⇒ ¬(p ∧ q).",
    hint: "Treat antecedent as a block.",
    level: "intermediate"
  },
  {
    question: "Is the contrapositive of a biconditional (p ⇔ q) equivalent to the original?",
    shortAnswer: "Yes, the contrapositive of p⇔q is also p⇔q (self-equivalent).",
    explanation: "p⇔q ≡ (p⇒q)∧(q⇒p). Contrapositive of each component yields (¬q⇒¬p)∧(¬p⇒¬q) which is equivalent to p⇔q.",
    hint: "Biconditional is symmetric.",
    level: "expert"
  },
  {
    question: "What common mistake do students make with contrapositive?",
    shortAnswer: "They forget to negate one of the parts, or they confuse it with converse.",
    explanation: "Many write q⇒p (converse) instead of ¬q⇒¬p (contrapositive).",
    hint: "Remember: swap AND negate both.",
    level: "basic"
  },
  {
    question: "Prove that contrapositive is equivalent to original using logical laws.",
    shortAnswer: "p⇒q ≡ ¬p∨q. Contrapositive: ¬q⇒¬p ≡ ¬(¬q)∨¬p ≡ q∨¬p ≡ ¬p∨q. Same.",
    explanation: "Both reduce to ¬p ∨ q.",
    hint: "Use material implication.",
    level: "intermediate"
  },
  {
    question: "What is the contrapositive of 'If Abhronila is in Ichapur, then she is in West Bengal'?",
    shortAnswer: "If Abhronila is NOT in West Bengal, then she is NOT in Ichapur.",
    explanation: "Swap and negate the location statements.",
    hint: "Negate both places and swap.",
    level: "basic"
  },
  {
    question: "In programming, how is contrapositive used?",
    shortAnswer: "To refactor conditions: if (a) { b } can be rewritten as if (!b) { !a } under certain contexts.",
    explanation: "But careful: in imperative code, side effects matter. In pure logic, they are equivalent.",
    hint: "Used in logical simplification.",
    level: "intermediate"
  },
  {
    question: "What is the contrapositive of ¬p ⇒ ¬q?",
    shortAnswer: "¬(¬q) ⇒ ¬(¬p) = q ⇒ p (the converse of original).",
    explanation: "Apply contrapositive to the inverse yields converse.",
    hint: "Contrapositive of inverse is converse.",
    level: "intermediate"
  },
  {
    question: "Is the contrapositive of a false statement always false?",
    shortAnswer: "Yes, because it's equivalent.",
    explanation: "If original false, contrapositive false; if original true, contrapositive true.",
    hint: "They share truth value.",
    level: "basic"
  },
  {
    question: "How can you use contrapositive to disprove an implication?",
    shortAnswer: "Find a counterexample to the contrapositive (¬q true and ¬p false).",
    explanation: "Since they are equivalent, a counterexample to one disproves both.",
    hint: "Find ¬q true but p true.",
    level: "intermediate"
  },
  {
    question: "What is the contrapositive of (p ∨ q) ⇒ r?",
    shortAnswer: "¬r ⇒ ¬(p ∨ q) ≡ ¬r ⇒ (¬p ∧ ¬q).",
    explanation: "Swap and negate, then De Morgan on antecedent.",
    hint: "De Morgan on the negated OR.",
    level: "expert"
  },
  {
    question: "Why is the contrapositive considered a 'proof technique'?",
    shortAnswer: "Because proving the contrapositive is often easier than proving the original directly.",
    explanation: "Mathematicians frequently use 'proof by contrapositive' as a standard method.",
    hint: "Easier to assume negation of conclusion.",
    level: "intermediate"
  },
  {
    question: "What is the relationship between contrapositive and inverse?",
    shortAnswer: "The inverse is the contrapositive of the converse.",
    explanation: "Inverse (¬p⇒¬q) = contrapositive of converse (q⇒p).",
    hint: "Inverse = contrapositive of converse.",
    level: "intermediate"
  },
  {
    question: "Write the contrapositive of 'If Susmita is tired, then she will rest'.",
    shortAnswer: "If Susmita does NOT rest, then she is NOT tired.",
    explanation: "Swap and negate: 'does not rest' becomes antecedent, 'not tired' becomes consequent.",
    hint: "Negate both actions.",
    level: "basic"
  },
  {
    question: "Can the contrapositive be used in everyday reasoning?",
    shortAnswer: "Yes, often unconsciously. 'If it's a dog, it has fur' → 'If it has no fur, it's not a dog'.",
    explanation: "People use contrapositive reasoning all the time.",
    hint: "Natural logical intuition.",
    level: "basic"
  },
  {
    question: "What is the contrapositive of p ⇒ (q ∨ r)?",
    shortAnswer: "¬(q ∨ r) ⇒ ¬p ≡ (¬q ∧ ¬r) ⇒ ¬p.",
    explanation: "Swap, negate, then De Morgan on antecedent.",
    hint: "De Morgan on OR.",
    level: "expert"
  },
  {
    question: "Is the contrapositive of a contradiction always a contradiction?",
    shortAnswer: "Yes, because equivalence preserves truth value.",
    explanation: "If original is always false, contrapositive also always false.",
    hint: "Equivalent statements share all truth values.",
    level: "intermediate"
  },
  {
    question: "Memorization trick: how to remember contrapositive vs converse?",
    shortAnswer: "Contrapositive = CONTRary + opposite (swap AND negate). Converse just swaps.",
    explanation: "Contrapositive has 'contra' meaning against, so it negates.",
    hint: "Contra = negate.",
    level: "basic"
  },
  {
    question: "What is the contrapositive of 'If Debangshu is a doctor, then he went to medical school'?",
    shortAnswer: "If Debangshu did NOT go to medical school, then he is NOT a doctor.",
    explanation: "Swap and negate both parts.",
    hint: "Reverse the training and profession.",
    level: "basic"
  }
];

export default questions;