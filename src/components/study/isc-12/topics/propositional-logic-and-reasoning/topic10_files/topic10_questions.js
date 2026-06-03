// topic10_files/topic10_questions.js
const questions = [
  {
    question: "What is a tautology in propositional logic?",
    shortAnswer: "A statement that is true under every possible truth assignment.",
    explanation: "A tautology's truth table final column contains all true values. Example: p ∨ ¬p is always true regardless of p.",
    hint: "Think of a statement that cannot be false.",
    level: "basic",
    codeExample: "p || !p   // always true"
  },
  {
    question: "What is a contradiction?",
    shortAnswer: "A statement that is false under every possible truth assignment.",
    explanation: "A contradiction's truth table final column contains all false values. Example: p ∧ ¬p is always false.",
    hint: "It's impossible for a contradiction to be true.",
    level: "basic"
  },
  {
    question: "What is a contingency?",
    shortAnswer: "A statement that is true for some assignments and false for others.",
    explanation: "Most real-world statements are contingencies. Example: p ∧ q is true only when both p and q are true.",
    hint: "A contingency depends on the truth values of its variables.",
    level: "basic"
  },
  {
    question: "Is the statement 'p ∨ ¬p' a tautology, contradiction, or contingency?",
    shortAnswer: "Tautology",
    explanation: "For any p, either p is true (making the OR true) or p is false making ¬p true, so the OR is always true.",
    hint: "Law of excluded middle.",
    level: "basic"
  },
  {
    question: "Is 'p ∧ ¬p' a tautology, contradiction, or contingency?",
    shortAnswer: "Contradiction",
    explanation: "p and ¬p cannot both be true simultaneously, so the AND is always false.",
    hint: "It's the law of non-contradiction.",
    level: "basic"
  },
  {
    question: "How many rows are needed in a truth table for an expression with 3 variables?",
    shortAnswer: "8 rows",
    explanation: "2^3 = 8 possible combinations of truth values.",
    hint: "Each variable doubles the possibilities.",
    level: "basic"
  },
  {
    question: "Determine if (p ⇒ q) ∨ (q ⇒ p) is a tautology.",
    shortAnswer: "Yes, it's a tautology.",
    explanation: "This expression is always true. If p is true and q false, first implication false but second true (false ⇒ false is true). Always at least one implication holds.",
    hint: "Test all four combinations.",
    level: "intermediate"
  },
  {
    question: "Is (p ∧ q) ⇒ p a tautology?",
    shortAnswer: "Yes",
    explanation: "If p∧q is true then p is true, so implication holds. If p∧q is false, implication is vacuously true.",
    hint: "A conjunction implies each of its conjuncts.",
    level: "intermediate"
  },
  {
    question: "What is the negation of a tautology?",
    shortAnswer: "A contradiction",
    explanation: "If a statement is always true, its negation is always false — a contradiction.",
    hint: "Flip all truth values.",
    level: "intermediate"
  },
  {
    question: "Can a contingency be simplified to a tautology using logical laws?",
    shortAnswer: "No, only equivalent expressions.",
    explanation: "Logical laws preserve truth values. If an expression is a contingency, any equivalent expression is also a contingency.",
    hint: "Equivalence preserves classification.",
    level: "intermediate"
  },
  {
    question: "Is the statement 'If it is raining then it is raining' a tautology?",
    shortAnswer: "Yes",
    explanation: "p ⇒ p is always true. If p is true, true⇒true=true; if p false, false⇒anything=true.",
    hint: "Implication of a statement to itself.",
    level: "basic"
  },
  {
    question: "Identify: (p ∨ q) ∧ (¬p ∧ ¬q)",
    shortAnswer: "Contradiction",
    explanation: "(¬p∧¬q) is the negation of (p∨q) by De Morgan. An expression AND its negation is always false.",
    hint: "De Morgan's law: ¬(p∨q) = ¬p∧¬q.",
    level: "intermediate"
  },
  {
    question: "What is the classification of p ⊕ q (XOR)?",
    shortAnswer: "Contingency",
    explanation: "XOR is true when p and q differ, false when they match — depends on inputs, so contingency.",
    hint: "Exclusive or is not always true or always false.",
    level: "intermediate"
  },
  {
    question: "If an expression has 2 variables and its truth table has 3 true and 1 false, what is it?",
    shortAnswer: "Contingency",
    explanation: "Since not all rows are true (not tautology) and not all false (not contradiction), it's a contingency.",
    hint: "Mixed results = contingency.",
    level: "basic"
  },
  {
    question: "Is the statement 'p ⇒ (q ⇒ p)' a tautology?",
    shortAnswer: "Yes",
    explanation: "If p is true, then q⇒p is true regardless of q, so true⇒true=true. If p false, false⇒anything=true.",
    hint: "A true consequent makes implication true.",
    level: "expert"
  },
  {
    question: "What is the relationship between tautology and valid argument?",
    shortAnswer: "A valid argument's corresponding conditional (premises ⇒ conclusion) is a tautology.",
    explanation: "An argument is valid iff the implication from conjunction of premises to conclusion is a tautology.",
    hint: "Valid argument = tautological implication.",
    level: "expert"
  },
  {
    question: "Can a contradiction be used in a proof?",
    shortAnswer: "Yes, in proof by contradiction.",
    explanation: "Assume the negation of what you want to prove and derive a contradiction, showing the original statement must be true.",
    hint: "Contradictions are powerful tools.",
    level: "intermediate"
  },
  {
    question: "Classify: (p ∧ q) ∨ (¬p ∨ ¬q)",
    shortAnswer: "Tautology",
    explanation: "By De Morgan, ¬p∨¬q = ¬(p∧q). So expression becomes (p∧q) ∨ ¬(p∧q), which is always true.",
    hint: "A ∨ ¬A is a tautology.",
    level: "expert"
  },
  {
    question: "What is the classification of a statement that is always false?",
    shortAnswer: "Contradiction",
    explanation: "By definition, a statement false under all interpretations is a contradiction.",
    hint: "Opposite of tautology.",
    level: "basic"
  },
  {
    question: "If you add a tautology to a contingency using OR, what do you get?",
    shortAnswer: "Tautology",
    explanation: "If A is a tautology, then A ∨ B is always true regardless of B.",
    hint: "True OR anything = True.",
    level: "intermediate"
  },
  {
    question: "If you AND a contradiction with any statement, what results?",
    shortAnswer: "Contradiction",
    explanation: "False ∧ anything = False, so the result is always false.",
    hint: "False AND anything is false.",
    level: "basic"
  },
  {
    question: "Is (p ⇒ q) ∧ (q ⇒ p) a tautology?",
    shortAnswer: "No, it's a contingency (equivalent to p⇔q).",
    explanation: "p⇔q is true only when p and q have same truth value, false otherwise — not always true.",
    hint: "Biconditional is not a tautology.",
    level: "intermediate"
  },
  {
    question: "What is the dual of a tautology?",
    shortAnswer: "A contradiction",
    explanation: "The dual (swap ∧/∨ and true/false) of a tautology is a contradiction.",
    hint: "Duality principle.",
    level: "expert"
  },
  {
    question: "In programming, why is a condition like 'if (x > 5 || x <= 5)' problematic?",
    shortAnswer: "It's a tautology — always true, so else branch unreachable.",
    explanation: "Every integer is either >5 or ≤5, so condition always true. This is likely a logic error.",
    hint: "Check for mutually exhaustive conditions.",
    level: "intermediate"
  },
  {
    question: "Is 'p ∧ (q ∨ ¬q)' a tautology, contradiction, or contingency?",
    shortAnswer: "Contingency (equivalent to p)",
    explanation: "q∨¬q is a tautology (true), so expression simplifies to p ∧ true = p, which is a contingency.",
    hint: "Simplify using tautology elimination.",
    level: "intermediate"
  },
  {
    question: "How many tautologies exist in propositional logic with n variables?",
    shortAnswer: "Infinitely many (syntactically), but only 2^(2^n) possible truth tables.",
    explanation: "Many different expressions can represent the same truth table (the all-true table). There are 2^(2^n) possible boolean functions, exactly one of which is the tautology function.",
    hint: "Different syntax, same semantics.",
    level: "expert"
  },
  {
    question: "Classify: (p ∨ q) ∧ (¬p ∨ q) ∧ (p ∨ ¬q) ∧ (¬p ∨ ¬q)",
    shortAnswer: "Contradiction",
    explanation: "This is the conjunction of all four possible clauses. No assignment satisfies all four simultaneously — it's always false.",
    hint: "Each clause eliminates one row.",
    level: "expert"
  },
  {
    question: "What is the classification of a statement that is logically equivalent to True?",
    shortAnswer: "Tautology",
    explanation: "If it's equivalent to True, it must be true under all interpretations.",
    hint: "Logical equivalence preserves classification.",
    level: "basic"
  },
  {
    question: "If an expression is neither a tautology nor a contradiction, what is it?",
    shortAnswer: "Contingency",
    explanation: "These three categories are mutually exclusive and exhaustive.",
    hint: "Every statement falls into exactly one.",
    level: "basic"
  },
  {
    question: "How can you quickly check if a simple implication p⇒q is a tautology?",
    shortAnswer: "It is a tautology only if q is true or p is false for all cases — actually p⇒q alone is a contingency unless p is always false or q always true.",
    explanation: "p⇒q is false when p true and q false, so it's a contingency unless that case cannot happen (which would require p⇒q to be a tautology in a specific domain). In pure logic, p⇒q is contingency.",
    hint: "Pure implication without quantifiers is contingency.",
    level: "intermediate"
  }
];

export default questions;