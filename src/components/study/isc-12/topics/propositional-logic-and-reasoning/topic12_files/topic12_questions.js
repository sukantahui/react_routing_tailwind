// topic12_files/topic12_questions.js
const questions = [
  {
    question: "What is the identity law for AND?",
    shortAnswer: "p ∧ True ≡ p",
    explanation: "AND with True leaves the proposition unchanged, because True AND p is p.",
    hint: "Think of True as a neutral element.",
    level: "basic",
    codeExample: "p && true === p"
  },
  {
    question: "What is the identity law for OR?",
    shortAnswer: "p ∨ False ≡ p",
    explanation: "OR with False leaves the proposition unchanged.",
    hint: "False does nothing in OR.",
    level: "basic"
  },
  {
    question: "State the domination law for AND.",
    shortAnswer: "p ∧ False ≡ False",
    explanation: "Anything AND False is always False.",
    hint: "One false makes the whole conjunction false.",
    level: "basic"
  },
  {
    question: "State the domination law for OR.",
    shortAnswer: "p ∨ True ≡ True",
    explanation: "Anything OR True is always True.",
    hint: "True dominates OR.",
    level: "basic"
  },
  {
    question: "What is the idempotent law for AND?",
    shortAnswer: "p ∧ p ≡ p",
    explanation: "Repeating the same proposition with AND does not change truth value.",
    hint: "p AND p is the same as p.",
    level: "basic"
  },
  {
    question: "What is the double negation law?",
    shortAnswer: "¬¬p ≡ p",
    explanation: "Two negations cancel each other out.",
    hint: "Not (not p) equals p.",
    level: "basic"
  },
  {
    question: "Write the complement law for OR.",
    shortAnswer: "p ∨ ¬p ≡ True",
    explanation: "A proposition or its negation is always true (law of excluded middle).",
    hint: "Either p is true or p is false.",
    level: "basic"
  },
  {
    question: "Write the complement law for AND.",
    shortAnswer: "p ∧ ¬p ≡ False",
    explanation: "A proposition and its negation cannot both be true.",
    hint: "Contradiction.",
    level: "basic"
  },
  {
    question: "What does the commutative law state for AND?",
    shortAnswer: "p ∧ q ≡ q ∧ p",
    explanation: "Order of operands does not matter for conjunction.",
    hint: "p and q is same as q and p.",
    level: "basic"
  },
  {
    question: "What is the associative law for OR?",
    shortAnswer: "(p ∨ q) ∨ r ≡ p ∨ (q ∨ r)",
    explanation: "Grouping does not matter for disjunction.",
    hint: "Parentheses can be rearranged.",
    level: "basic"
  },
  {
    question: "State the distributive law of AND over OR.",
    shortAnswer: "p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)",
    explanation: "AND distributes over OR, like multiplication over addition.",
    hint: "Multiply (AND) across the OR.",
    level: "intermediate"
  },
  {
    question: "State the distributive law of OR over AND.",
    shortAnswer: "p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)",
    explanation: "OR also distributes over AND — unique to logic.",
    hint: "This has no arithmetic analog.",
    level: "intermediate"
  },
  {
    question: "What is the absorption law: p ∨ (p ∧ q) ≡ ?",
    shortAnswer: "p",
    explanation: "p absorbs the longer expression. If p is true, the OR is true; if p false, p∧q is false, so OR false.",
    hint: "The larger term is redundant.",
    level: "intermediate"
  },
  {
    question: "What is the other absorption law: p ∧ (p ∨ q) ≡ ?",
    shortAnswer: "p",
    explanation: "If p true, true ∧ anything = true; if p false, false ∧ anything = false.",
    hint: "Also simplifies to p.",
    level: "intermediate"
  },
  {
    question: "Simplify ¬(p ∧ ¬q) using De Morgan.",
    shortAnswer: "¬p ∨ q",
    explanation: "¬(p ∧ ¬q) ≡ ¬p ∨ ¬(¬q) ≡ ¬p ∨ q.",
    hint: "Flip AND to OR, negate each part.",
    level: "intermediate"
  },
  {
    question: "Simplify (p ∧ q) ∨ (p ∧ ¬q).",
    shortAnswer: "p",
    explanation: "Factor p: p ∧ (q ∨ ¬q) ≡ p ∧ True ≡ p.",
    hint: "Distributive + complement + identity.",
    level: "intermediate"
  },
  {
    question: "Simplify (p ∨ q) ∧ (p ∨ ¬q).",
    shortAnswer: "p",
    explanation: "Factor p: p ∨ (q ∧ ¬q) ≡ p ∨ False ≡ p.",
    hint: "OR distributes over AND.",
    level: "expert"
  },
  {
    question: "Is p ∨ (q ∧ r) equivalent to (p ∨ q) ∧ (p ∨ r)?",
    shortAnswer: "Yes, that's the distributive law.",
    explanation: "OR distributes over AND, unlike arithmetic.",
    hint: "Always true by logical equivalence.",
    level: "intermediate"
  },
  {
    question: "Simplify ¬(p ∨ q) ∨ (¬p ∧ q).",
    shortAnswer: "¬p",
    explanation: "¬(p∨q) ≡ ¬p∧¬q. So expression becomes (¬p∧¬q) ∨ (¬p∧q) ≡ ¬p ∧ (¬q ∨ q) ≡ ¬p ∧ True ≡ ¬p.",
    hint: "Factor ¬p.",
    level: "expert"
  },
  {
    question: "What law allows you to replace (p ∧ q) ∨ (p ∧ ¬q) with p?",
    shortAnswer: "Distributive, complement, and identity.",
    explanation: "Combination: p∧(q∨¬q) → p∧True → p.",
    hint: "Three laws in sequence.",
    level: "intermediate"
  },
  {
    question: "Is (p ∧ q) ∨ r equivalent to p ∧ (q ∨ r)?",
    shortAnswer: "No, not generally.",
    explanation: "Counterexample: p=F, q=T, r=T: left (F∧T)∨T = F∨T=T; right F∧(T∨T)=F∧T=F. Not equivalent.",
    hint: "Distribution doesn't work that way.",
    level: "intermediate"
  },
  {
    question: "Simplify ¬(¬p ∧ ¬q).",
    shortAnswer: "p ∨ q",
    explanation: "By De Morgan: ¬(¬p∧¬q) ≡ ¬(¬p) ∨ ¬(¬q) ≡ p ∨ q.",
    hint: "Double negation each.",
    level: "basic"
  },
  {
    question: "What is the identity element for OR?",
    shortAnswer: "False",
    explanation: "p ∨ False ≡ p, so False is identity for OR.",
    hint: "False doesn't change OR.",
    level: "basic"
  },
  {
    question: "What is the identity element for AND?",
    shortAnswer: "True",
    explanation: "p ∧ True ≡ p, so True is identity for AND.",
    hint: "True doesn't change AND.",
    level: "basic"
  },
  {
    question: "Simplify (p ⇒ q) ∧ (p ⇒ ¬q).",
    shortAnswer: "¬p",
    explanation: "(¬p∨q) ∧ (¬p∨¬q) ≡ ¬p ∨ (q∧¬q) ≡ ¬p ∨ False ≡ ¬p.",
    hint: "Distribute ¬p.",
    level: "expert"
  },
  {
    question: "What is the dual of p ∧ (q ∨ r)?",
    shortAnswer: "p ∨ (q ∧ r)",
    explanation: "Duality swaps ∧ with ∨ and True with False.",
    hint: "Swap operators.",
    level: "expert"
  },
  {
    question: "Simplify p ∨ (¬p ∧ q).",
    shortAnswer: "p ∨ q",
    explanation: "By distribution: (p ∨ ¬p) ∧ (p ∨ q) ≡ True ∧ (p ∨ q) ≡ p ∨ q.",
    hint: "OR distributes over AND.",
    level: "expert"
  },
  {
    question: "Simplify (p ∧ q) ∨ (¬p ∧ q) ∨ (p ∧ ¬q).",
    shortAnswer: "p ∨ q",
    explanation: "Group: (p∧q)∨(¬p∧q) = q∧(p∨¬p)=q. Then q ∨ (p∧¬q) = (q∨p)∧(q∨¬q) = (p∨q)∧True = p∨q.",
    hint: "Combine first two terms, then third.",
    level: "expert"
  },
  {
    question: "What law is used to simplify p ∨ (p ∧ q) to p?",
    shortAnswer: "Absorption law.",
    explanation: "Absorption directly states p ∨ (p∧q) ≡ p.",
    hint: "One of the absorption laws.",
    level: "basic"
  },
  {
    question: "Simplify ¬(p ⇒ q) using laws.",
    shortAnswer: "p ∧ ¬q",
    explanation: "p⇒q ≡ ¬p∨q, so ¬(p⇒q) ≡ ¬(¬p∨q) ≡ p ∧ ¬q (De Morgan).",
    hint: "Negation of implication is AND of antecedent and negation of consequent.",
    level: "intermediate"
  }
];

export default questions;