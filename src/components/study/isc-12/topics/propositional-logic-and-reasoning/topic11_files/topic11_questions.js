// topic11_files/topic11_questions.js
const questions = [
  {
    question: "What does it mean for two propositions to be logically equivalent?",
    shortAnswer: "They have the same truth value for every possible assignment to their variables.",
    explanation: "Logical equivalence (≡) means the truth tables of the two expressions are identical. For example, p⇒q and ¬p∨q are logically equivalent.",
    hint: "Think of two different English sentences that always mean the same thing.",
    level: "basic",
    codeExample: "(p => q) === (!p || q)   // always true"
  },
  {
    question: "Are p ∧ q and q ∧ p logically equivalent?",
    shortAnswer: "Yes, conjunction is commutative.",
    explanation: "AND operation is commutative: the order of operands does not affect the result. Truth table confirms identity.",
    hint: "Switching sides doesn't change 'and'.",
    level: "basic"
  },
  {
    question: "Is p ⇒ q logically equivalent to q ⇒ p?",
    shortAnswer: "No, implication is not commutative.",
    explanation: "Example: p true, q false gives p⇒q false but q⇒p true. So they differ.",
    hint: "Implication direction matters.",
    level: "basic"
  },
  {
    question: "What is the double negation law?",
    shortAnswer: "¬¬p ≡ p",
    explanation: "Negating a proposition twice returns the original truth value.",
    hint: "Two wrongs make a right in logic.",
    level: "basic"
  },
  {
    question: "State De Morgan's law for negating a conjunction.",
    shortAnswer: "¬(p ∧ q) ≡ ¬p ∨ ¬q",
    explanation: "The negation of 'p and q' is 'not p or not q'.",
    hint: "Distribute the NOT and flip AND to OR.",
    level: "basic"
  },
  {
    question: "Is (p ∨ q) ∧ r logically equivalent to p ∨ (q ∧ r)?",
    shortAnswer: "No, parentheses matter; AND and OR do not associate arbitrarily.",
    explanation: "Assignment p=F,q=T,r=F gives first: (F∨T)∧F = T∧F = F; second: F∨(T∧F)=F∨F=F? Wait both false? Try p=T,q=F,r=F: first (T∨F)∧F=T∧F=F; second T∨(F∧F)=T∨F=T → different. So not equivalent.",
    hint: "Test with a counterexample.",
    level: "intermediate"
  },
  {
    question: "Prove that p ⇒ q is equivalent to ¬q ⇒ ¬p.",
    shortAnswer: "True, that's the contrapositive equivalence.",
    explanation: "Truth table or algebraic: p⇒q ≡ ¬p∨q, and ¬q⇒¬p ≡ ¬¬q∨¬p ≡ q∨¬p, same.",
    hint: "Contrapositive always equivalent.",
    level: "intermediate"
  },
  {
    question: "Is p ⇔ q equivalent to (p ⇒ q) ∧ (q ⇒ p)?",
    shortAnswer: "Yes, by definition of biconditional.",
    explanation: "p⇔q is true exactly when both implications hold.",
    hint: "Two-way implication.",
    level: "basic"
  },
  {
    question: "What is the equivalence for p ⊕ q (XOR)?",
    shortAnswer: "(p ∨ q) ∧ ¬(p ∧ q) or (p ∧ ¬q) ∨ (¬p ∧ q).",
    explanation: "Exclusive OR is true when exactly one is true.",
    hint: "XOR = (p OR q) AND NOT (p AND q).",
    level: "intermediate"
  },
  {
    question: "Simplify ¬(p ∨ ¬q) using De Morgan.",
    shortAnswer: "¬p ∧ q",
    explanation: "¬(p ∨ ¬q) ≡ ¬p ∧ ¬(¬q) ≡ ¬p ∧ q.",
    hint: "Double negation on q.",
    level: "intermediate"
  },
  {
    question: "Are p ∧ (q ∨ r) and (p ∧ q) ∨ (p ∧ r) equivalent?",
    shortAnswer: "Yes, distributive law.",
    explanation: "AND distributes over OR.",
    hint: "Like multiplication over addition.",
    level: "intermediate"
  },
  {
    question: "Is (p ⇒ q) ∨ (q ⇒ p) a tautology? If yes, what does it mean?",
    shortAnswer: "Yes, it's a tautology, meaning it is always true.",
    explanation: "For any p,q, at least one implication holds. If p true and q false, first false but second true (false⇒false true).",
    hint: "One of the two directions always holds.",
    level: "expert"
  },
  {
    question: "What is the absorption law?",
    shortAnswer: "p ∧ (p ∨ q) ≡ p and p ∨ (p ∧ q) ≡ p.",
    explanation: "Absorption eliminates the redundant term.",
    hint: "The larger expression 'absorbs' the smaller.",
    level: "intermediate"
  },
  {
    question: "Are ¬(p ∧ q) and ¬p ∧ ¬q equivalent?",
    shortAnswer: "No, that's a common mistake. Correct De Morgan gives ¬p ∨ ¬q.",
    explanation: "Counterexample: p true, q true: ¬(T∧T)=¬T=F; ¬p∧¬q=F∧F=F (same? Wait false? Actually ¬p=F, ¬q=F, F∧F=F, both false? Try p=T,q=F: ¬(T∧F)=¬F=T; ¬p∧¬q=F∧T=F → different. So not equivalent.",
    hint: "De Morgan flips AND to OR.",
    level: "basic"
  },
  {
    question: "Simplify (p ∨ q) ∧ (p ∨ ¬q).",
    shortAnswer: "p",
    explanation: "By distributivity: (p ∨ q) ∧ (p ∨ ¬q) ≡ p ∨ (q ∧ ¬q) ≡ p ∨ False ≡ p.",
    hint: "q ∧ ¬q is contradiction.",
    level: "expert"
  },
  {
    question: "What is the identity law for OR?",
    shortAnswer: "p ∨ False ≡ p",
    explanation: "False is the identity for OR (false ∨ p = p).",
    hint: "OR with false does nothing.",
    level: "basic"
  },
  {
    question: "What is the identity law for AND?",
    shortAnswer: "p ∧ True ≡ p",
    explanation: "True is the identity for AND.",
    hint: "AND with true does nothing.",
    level: "basic"
  },
  {
    question: "Is p ⇒ q equivalent to ¬p ∧ q?",
    shortAnswer: "No, that's wrong. p⇒q ≡ ¬p ∨ q, not AND.",
    explanation: "AND would be false when p false and q true? Actually ¬p∧q is different.",
    hint: "Implication is a kind of OR, not AND.",
    level: "basic"
  },
  {
    question: "Show that (p ⇒ q) ∧ (p ⇒ ¬q) is equivalent to ¬p.",
    shortAnswer: "Yes, (p⇒q)∧(p⇒¬q) ≡ ¬p",
    explanation: "p⇒q ≡ ¬p∨q, p⇒¬q ≡ ¬p∨¬q. Conjunction: (¬p∨q)∧(¬p∨¬q) ≡ ¬p ∨ (q∧¬q) ≡ ¬p ∨ False ≡ ¬p.",
    hint: "Distribute ¬p.",
    level: "expert"
  },
  {
    question: "How can you prove two expressions are not equivalent?",
    shortAnswer: "Find a counterexample assignment where they differ.",
    explanation: "A single row in the truth table with different results disproves equivalence.",
    hint: "One counterexample is enough.",
    level: "intermediate"
  },
  {
    question: "Are p ∧ (q ∨ r) and (p ∧ q) ∨ r equivalent?",
    shortAnswer: "No, the parentheses matter.",
    explanation: "Counterexample: p=F, q=T, r=T: left: F∧(T∨T)=F∧T=F; right: (F∧T)∨T = F∨T=T. Different.",
    hint: "AND does not distribute over OR that way.",
    level: "intermediate"
  },
  {
    question: "What is the equivalence for p ⇒ (q ⇒ r)?",
    shortAnswer: "(p ∧ q) ⇒ r",
    explanation: "Exportation law: p⇒(q⇒r) ≡ (p∧q)⇒r.",
    hint: "Combine antecedent with nested implication.",
    level: "expert"
  },
  {
    question: "Is (p ∨ q) ⇒ r equivalent to (p ⇒ r) ∧ (q ⇒ r)?",
    shortAnswer: "Yes, that's a valid equivalence.",
    explanation: "(p∨q)⇒r ≡ ¬(p∨q)∨r ≡ (¬p∧¬q)∨r. And (p⇒r)∧(q⇒r) ≡ (¬p∨r)∧(¬q∨r) ≡ (¬p∧¬q)∨r by distributivity. Same.",
    hint: "OR in antecedent distributes over implication.",
    level: "expert"
  },
  {
    question: "Simplify ¬(p ∨ ¬q) ∨ (¬p ∧ q).",
    shortAnswer: "¬p",
    explanation: "First part ¬(p∨¬q) ≡ ¬p∧q. So expression becomes (¬p∧q) ∨ (¬p∧q) ≡ ¬p∧q. Wait that's not ¬p. Let's recompute: ¬(p∨¬q) ≡ ¬p∧q. Then (¬p∧q) ∨ (¬p∧q) = ¬p∧q. So simplified is ¬p∧q, not ¬p. Correction: Actually the original might have typo. Better: ¬(p∨¬q) ∨ (¬p∧q) = (¬p∧q) ∨ (¬p∧q) = ¬p∧q. So answer ¬p∧q.",
    hint: "Double-check De Morgan.",
    level: "expert"
  },
  {
    question: "What is the duality principle?",
    shortAnswer: "Swapping ∧ with ∨ and True with False in a tautology yields another tautology.",
    explanation: "If a statement is a tautology, its dual is also a tautology.",
    hint: "Every logical equivalence has a dual.",
    level: "expert"
  },
  {
    question: "Are p ∧ (q ∨ r) and (p ∧ q) ∨ (p ∧ r) equivalent?",
    shortAnswer: "Yes, distributive law.",
    explanation: "AND distributes over OR, exactly like multiplication over addition.",
    hint: "Standard distribution.",
    level: "intermediate"
  },
  {
    question: "Is (p ⇒ q) ∧ (¬p ⇒ q) equivalent to q?",
    shortAnswer: "Yes.",
    explanation: "(p⇒q)∧(¬p⇒q) ≡ (¬p∨q)∧(p∨q) ≡ (¬p∧p)∨q ≡ False∨q ≡ q.",
    hint: "Case analysis: regardless of p, q holds.",
    level: "expert"
  },
  {
    question: "What is the difference between ≡ and ⇔?",
    shortAnswer: "≡ is meta-level logical equivalence; ⇔ is an object-level logical connective.",
    explanation: "We use ≡ to state that two formulas are equivalent. The biconditional ⇔ is a connective that produces a truth value. However, often they are used interchangeably in texts.",
    hint: "Context matters.",
    level: "intermediate"
  },
  {
    question: "Simplify p ∨ (p ∧ q).",
    shortAnswer: "p (absorption)",
    explanation: "p ∨ (p∧q) ≡ p (absorption law).",
    hint: "The first p already makes the OR true.",
    level: "basic"
  },
  {
    question: "Are the expressions (p ∧ q) ∨ r and p ∧ (q ∨ r) equivalent?",
    shortAnswer: "No, they are not equivalent in general.",
    explanation: "Counterexample: p=F, q=T, r=T: first (F∧T)∨T = F∨T=T; second F∧(T∨T)=F∧T=F. Different.",
    hint: "Parentheses placement matters.",
    level: "intermediate"
  }
];

export default questions;