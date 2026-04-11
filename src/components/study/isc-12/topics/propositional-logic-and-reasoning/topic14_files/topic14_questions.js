// topic14_files/topic14_questions.js
const questions = [
  {
    question: "What is the material implication law?",
    shortAnswer: "p ⇒ q ≡ ¬p ∨ q",
    explanation: "An implication is logically equivalent to a disjunction where the antecedent is negated.",
    hint: "If p then q means either not p or q.",
    level: "basic",
    codeExample: "!(p) || q"
  },
  {
    question: "State the contrapositive law.",
    shortAnswer: "p ⇒ q ≡ ¬q ⇒ ¬p",
    explanation: "An implication is equivalent to its contrapositive: reverse and negate both sides.",
    hint: "Swap and negate.",
    level: "basic"
  },
  {
    question: "What is the converse of p ⇒ q? Is it equivalent?",
    shortAnswer: "Converse is q ⇒ p, which is not equivalent to p ⇒ q.",
    explanation: "Converse is a different statement. Only contrapositive is equivalent.",
    hint: "Don't confuse converse with contrapositive.",
    level: "basic"
  },
  {
    question: "State the exportation law.",
    shortAnswer: "p ⇒ (q ⇒ r) ≡ (p ∧ q) ⇒ r",
    explanation: "Nested implications can be flattened into a single implication with a conjunction of antecedents.",
    hint: "Combine the antecedents with AND.",
    level: "intermediate"
  },
  {
    question: "What is the negation of p ⇒ q?",
    shortAnswer: "p ∧ ¬q",
    explanation: "The only way an implication is false is when antecedent true and consequent false.",
    hint: "False only when p true and q false.",
    level: "intermediate"
  },
  {
    question: "Is (p ⇒ q) ∧ (q ⇒ r) logically equivalent to (p ⇒ r)?",
    shortAnswer: "No, it's a valid implication but not equivalence. (p⇒r) does not imply the conjunction.",
    explanation: "Hypothetical syllogism: (p⇒q)∧(q⇒r) ⇒ (p⇒r) is a tautology, but the reverse is not.",
    hint: "Transitivity holds one way only.",
    level: "intermediate"
  },
  {
    question: "Simplify (p ⇒ q) ∨ (p ⇒ ¬q).",
    shortAnswer: "¬p ∨ (q ∨ ¬q) ≡ ¬p ∨ True ≡ True (tautology).",
    explanation: "Using implication law: (¬p∨q) ∨ (¬p∨¬q) ≡ ¬p ∨ (q∨¬q) ≡ ¬p ∨ True ≡ True.",
    hint: "q or not q is always true.",
    level: "expert"
  },
  {
    question: "What is the difference between contrapositive and inverse?",
    shortAnswer: "Contrapositive: ¬q⇒¬p (equivalent). Inverse: ¬p⇒¬q (not equivalent).",
    explanation: "Inverse is the contrapositive of the converse.",
    hint: "Inverse negates both without swapping.",
    level: "intermediate"
  },
  {
    question: "Rewrite 'If Swadeep is late, then he misses the bus' using contrapositive.",
    shortAnswer: "If Swadeep does not miss the bus, then he is not late.",
    explanation: "Contrapositive: ¬q ⇒ ¬p.",
    hint: "Negate and swap.",
    level: "basic"
  },
  {
    question: "Is p ⇒ (q ⇒ p) a tautology?",
    shortAnswer: "Yes.",
    explanation: "p ⇒ (q ⇒ p) ≡ ¬p ∨ (¬q ∨ p) ≡ (¬p ∨ p) ∨ ¬q ≡ True ∨ ¬q ≡ True.",
    hint: "Always true regardless of q.",
    level: "intermediate"
  },
  {
    question: "Simplify (p ⇒ q) ∧ (p ⇒ ¬q).",
    shortAnswer: "¬p",
    explanation: "(¬p∨q) ∧ (¬p∨¬q) ≡ ¬p ∨ (q∧¬q) ≡ ¬p ∨ False ≡ ¬p.",
    hint: "Distribute ¬p.",
    level: "expert"
  },
  {
    question: "What does exportation allow in programming?",
    shortAnswer: "It allows flattening nested if statements: if (p) { if (q) { ... } } becomes if (p && q) { ... }.",
    explanation: "Exportation shows logical equivalence, enabling code simplification.",
    hint: "Combine conditions.",
    level: "intermediate"
  },
  {
    question: "Is p ⇒ q equivalent to its inverse ¬p ⇒ ¬q?",
    shortAnswer: "No, generally not.",
    explanation: "Counterexample: p true, q false: p⇒q false, ¬p⇒¬q = false⇒true = true. Different.",
    hint: "Inverse is not equivalent.",
    level: "basic"
  },
  {
    question: "Prove that ¬(p ⇒ q) ≡ p ∧ ¬q using truth table.",
    shortAnswer: "Truth table shows identical columns.",
    explanation: "The only false row of p⇒q is p=T, q=F, so negation gives T only on that row, matching p∧¬q.",
    hint: "Negation of implication.",
    level: "intermediate"
  },
  {
    question: "What is hypothetical syllogism?",
    shortAnswer: "(p⇒q) ∧ (q⇒r) ⇒ (p⇒r)",
    explanation: "If p implies q and q implies r, then p implies r. It's the transitive property of implication.",
    hint: "Chaining implications.",
    level: "intermediate"
  },
  {
    question: "Simplify (p ⇒ q) ∨ (q ⇒ p).",
    shortAnswer: "Tautology (always true).",
    explanation: "It's always true that either p implies q or q implies p. Proof: if p true and q false, first false, second true; other cases similar.",
    hint: "One of the two directions always holds.",
    level: "expert"
  },
  {
    question: "What is the relationship between implication and disjunction?",
    shortAnswer: "p ⇒ q ≡ ¬p ∨ q",
    explanation: "Implication can be expressed purely with OR and NOT.",
    hint: "Implication is a disguised OR.",
    level: "basic"
  },
  {
    question: "Is (p ⇒ q) ⇒ r equivalent to p ⇒ (q ⇒ r)?",
    shortAnswer: "No, they are not equivalent.",
    explanation: "Counterexample: p=F, q=F, r=F: left (F⇒F)=T, T⇒F = F; right F⇒(F⇒F)=F⇒T=T. Different.",
    hint: "Implication is not associative.",
    level: "expert"
  },
  {
    question: "What is the law of exportation used for in logic proofs?",
    shortAnswer: "To transform a nested conditional into a single conditional with a conjunctive antecedent.",
    explanation: "It allows assuming multiple hypotheses at once: to prove p⇒(q⇒r), assume p and q and prove r.",
    hint: "Combine assumptions.",
    level: "expert"
  },
  {
    question: "Rewrite 'If Tuhina studies hard, then if she gets enough sleep, she will pass' using exportation.",
    shortAnswer: "If Tuhina studies hard and gets enough sleep, then she will pass.",
    explanation: "p⇒(q⇒r) becomes (p∧q)⇒r.",
    hint: "Combine the two conditions.",
    level: "intermediate"
  },
  {
    question: "Is p ⇒ (q ∨ r) equivalent to (p ⇒ q) ∨ (p ⇒ r)?",
    shortAnswer: "Yes, they are equivalent.",
    explanation: "Left: ¬p ∨ q ∨ r. Right: (¬p∨q) ∨ (¬p∨r) ≡ ¬p ∨ q ∨ r. Same.",
    hint: "Distribute implication over OR.",
    level: "expert"
  },
  {
    question: "Is p ⇒ (q ∧ r) equivalent to (p ⇒ q) ∧ (p ⇒ r)?",
    shortAnswer: "Yes.",
    explanation: "Left: ¬p ∨ (q∧r). Right: (¬p∨q) ∧ (¬p∨r) ≡ ¬p ∨ (q∧r) by distributivity.",
    hint: "AND distributes over OR.",
    level: "expert"
  },
  {
    question: "What is the converse error?",
    shortAnswer: "Assuming q ⇒ p from p ⇒ q, which is not valid.",
    explanation: "Common fallacy: If it rains, ground is wet; therefore if ground is wet, it rained (could be sprinklers).",
    hint: "Converse is not equivalent.",
    level: "basic"
  },
  {
    question: "Simplify (p ⇒ q) ∧ (¬p ⇒ q).",
    shortAnswer: "q",
    explanation: "(¬p∨q) ∧ (p∨q) ≡ (¬p∧p) ∨ q ≡ False ∨ q ≡ q.",
    hint: "Case analysis: q holds regardless of p.",
    level: "intermediate"
  },
  {
    question: "What is the relationship between implication and its contrapositive in terms of truth values?",
    shortAnswer: "They always have identical truth values.",
    explanation: "p⇒q and ¬q⇒¬p are logically equivalent, proved by truth table or algebra.",
    hint: "Equivalent, not just similar.",
    level: "basic"
  },
  {
    question: "In a proof by contrapositive, what do you assume and what do you prove?",
    shortAnswer: "Assume ¬q, prove ¬p.",
    explanation: "To prove p⇒q, assume the consequent is false and show the antecedent must be false.",
    hint: "Negate conclusion, derive negation of hypothesis.",
    level: "intermediate"
  },
  {
    question: "Is (p ⇒ q) ∨ (r ⇒ s) equivalent to (p ∧ r) ⇒ (q ∨ s)?",
    shortAnswer: "No, not generally.",
    explanation: "Counterexample: p=T, q=F, r=F, s=F: left (F) ∨ (T) = T; right (T∧F)=F ⇒ (F∨F)=F ⇒ T? Actually false⇒false = true, so both true? Need better counterexample. Let p=T,q=F,r=T,s=F: left (F) ∨ (F)=F; right (T∧T)=T ⇒ (F∨F)=F ⇒ false. Different. So not equivalent.",
    hint: "Implication does not distribute that way.",
    level: "expert"
  },
  {
    question: "What is the identity element for implication?",
    shortAnswer: "There is no identity element because implication is not commutative or associative in that way.",
    explanation: "No constant c such that c ⇒ p ≡ p or p ⇒ c ≡ p for all p.",
    hint: "Implication is different from AND/OR.",
    level: "expert"
  },
  {
    question: "Simplify ¬(p ⇒ q) ∨ ¬(q ⇒ p).",
    shortAnswer: "(p ∧ ¬q) ∨ (q ∧ ¬p) which is XOR.",
    explanation: "¬(p⇒q) = p∧¬q, ¬(q⇒p)=q∧¬p. Their OR is exclusive OR (p ⊕ q).",
    hint: "Negation of both implications gives XOR.",
    level: "expert"
  },
  {
    question: "Why is false ⇒ false considered true in logic?",
    shortAnswer: "Because implication is defined to be true whenever antecedent is false, to maintain logical consistency.",
    explanation: "This definition (vacuous truth) allows useful reasoning and matches mathematical practice (e.g., 'if 0=1 then 2=3' is considered true).",
    hint: "Vacuous truth.",
    level: "intermediate"
  }
];

export default questions;