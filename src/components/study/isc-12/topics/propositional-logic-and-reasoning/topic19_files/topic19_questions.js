// topic19_files/topic19_questions.js
const questions = [
  {
    question: "What is an assertion-reason question?",
    shortAnswer: "Two statements (Assertion A and Reason R) where you determine their truth values and if R correctly explains A.",
    explanation: "Common in ISC exams. You must select from five options: both true with correct explanation, both true without correct explanation, A true R false, A false R true, or both false.",
    hint: "Think of it as two true/false evaluations plus a logical connection check.",
    level: "basic"
  },
  {
    question: "In ISC pattern, what does option 'A' mean?",
    shortAnswer: "Both A and R are true and R is the correct explanation of A.",
    explanation: "This is the highest score option; it requires not just truth but a valid explanatory relationship.",
    hint: "R must logically imply A and be relevant.",
    level: "basic"
  },
  {
    question: "In ISC pattern, what does option 'B' mean?",
    shortAnswer: "Both A and R are true but R is NOT the correct explanation of A.",
    explanation: "Both statements are factually correct, but they are independent or R does not explain why A holds.",
    hint: "True but unrelated.",
    level: "basic"
  },
  {
    question: "In ISC pattern, what does option 'C' mean?",
    shortAnswer: "A is true but R is false.",
    explanation: "Assertion holds, but the given reason is incorrect.",
    hint: "One true, one false.",
    level: "basic"
  },
  {
    question: "In ISC pattern, what does option 'D' mean?",
    shortAnswer: "A is false but R is true.",
    explanation: "Assertion is incorrect, but the reason statement itself is true.",
    hint: "False assertion, true reason.",
    level: "basic"
  },
  {
    question: "In ISC pattern, what does option 'E' mean?",
    shortAnswer: "Both A and R are false.",
    explanation: "Neither statement is true.",
    hint: "Both incorrect.",
    level: "basic"
  },
  {
    question: "How do you determine if R correctly explains A?",
    shortAnswer: "Check if R logically implies A and if R provides the underlying reason for A's truth.",
    explanation: "R ⇒ A must hold (R being true forces A to be true). Also, R should be relevant and not trivial.",
    hint: "Ask: Does the reason guarantee the assertion?",
    level: "intermediate"
  },
  {
    question: "Assertion: p ⇒ q is true. Reason: ¬p ∨ q is true. Choose the correct option.",
    shortAnswer: "A (Both true, R correct explanation).",
    explanation: "Material implication: p⇒q ≡ ¬p∨q, so R is exactly the equivalent form, thus explains A.",
    hint: "Logical equivalence.",
    level: "intermediate"
  },
  {
    question: "Assertion: p ∨ q is true. Reason: p is true. What is the correct option?",
    shortAnswer: "C (A true, R false).",
    explanation: "p∨q can be true even when p is false (if q true). So R is not necessarily true when A is true.",
    hint: "Consider p false, q true.",
    level: "intermediate"
  },
  {
    question: "Assertion: p ∧ q is true. Reason: p ∨ q is true. Choose option.",
    shortAnswer: "B (Both true, R not correct explanation).",
    explanation: "If p∧q true, then p∨q true automatically. But R being true does not explain why p∧q is true (could be p true, q false).",
    hint: "R is a consequence, not the cause.",
    level: "intermediate"
  },
  {
    question: "Assertion: ¬(p ∧ q) ≡ ¬p ∧ ¬q. Reason: De Morgan's law. Evaluate.",
    shortAnswer: "C (A false, R true).",
    explanation: "A is false because correct De Morgan is ¬(p∧q) ≡ ¬p ∨ ¬q. R is true (De Morgan's law exists).",
    hint: "Check the operator in A.",
    level: "intermediate"
  },
  {
    question: "Assertion: (p ⇒ q) ∨ (q ⇒ p) is a tautology. Reason: For any two propositions, at least one implication holds. Choose option.",
    shortAnswer: "A (Both true, R correct explanation).",
    explanation: "It's always true that either p⇒q or q⇒p. Reason explains why.",
    hint: "One direction always holds.",
    level: "expert"
  },
  {
    question: "Assertion: p ⇒ q is equivalent to its converse. Reason: Implication is symmetric. Evaluate.",
    shortAnswer: "E (Both false).",
    explanation: "p⇒q is not equivalent to its converse (q⇒p) in general. Also implication is not symmetric. Both false.",
    hint: "Converse is not equivalent.",
    level: "basic"
  },
  {
    question: "Assertion: If a number is divisible by 6, it is divisible by 3. Reason: 3 divides 6. Evaluate.",
    shortAnswer: "A (Both true, R correct explanation).",
    explanation: "The reason explains divisibility: because 6 = 2×3, any multiple of 6 is multiple of 3.",
    hint: "Reason provides mathematical basis.",
    level: "intermediate"
  },
  {
    question: "Assertion: p ∧ ¬p is a contradiction. Reason: A proposition cannot be both true and false. Choose option.",
    shortAnswer: "A (Both true, R correct explanation).",
    explanation: "Law of non-contradiction explains why p∧¬p is always false.",
    hint: "Classical logic principle.",
    level: "basic"
  },
  {
    question: "Assertion: p ∨ ¬p is a tautology. Reason: Law of excluded middle. Evaluate.",
    shortAnswer: "A (Both true, R correct explanation).",
    explanation: "Law of excluded middle states every proposition is either true or false, making p∨¬p always true.",
    hint: "Fundamental logical law.",
    level: "basic"
  },
  {
    question: "Assertion: (p ∧ q) ⇒ p is a tautology. Reason: If a conjunction is true, each conjunct is true. Choose option.",
    shortAnswer: "A (Both true, R correct explanation).",
    explanation: "R correctly explains: if p∧q true then p true, so implication holds.",
    hint: "Conjunction elimination.",
    level: "intermediate"
  },
  {
    question: "Assertion: p ⇒ (q ⇒ p) is a tautology. Reason: If p is true, then any implication with p as consequent is true. Evaluate.",
    shortAnswer: "A (Both true, R correct explanation).",
    explanation: "R explains why: when p true, q⇒p is true regardless of q.",
    hint: "True consequent makes implication true.",
    level: "expert"
  },
  {
    question: "Assertion: The contrapositive of p⇒q is q⇒p. Reason: Contrapositive swaps and negates. Evaluate.",
    shortAnswer: "D (A false, R true).",
    explanation: "A is false (contrapositive is ¬q⇒¬p, not q⇒p). R is true (correct definition).",
    hint: "Contrapositive has negations.",
    level: "intermediate"
  },
  {
    question: "Assertion: The inverse of p⇒q is ¬p⇒¬q. Reason: Inverse negates both antecedent and consequent. Evaluate.",
    shortAnswer: "A (Both true, R correct explanation).",
    explanation: "R correctly defines inverse.",
    hint: "Negate both.",
    level: "basic"
  },
  {
    question: "Assertion: p ∧ q is true. Reason: p is true and q is true. Evaluate.",
    shortAnswer: "A (Both true, R correct explanation).",
    explanation: "R is exactly the condition for p∧q to be true, so it explains A.",
    hint: "Conjunction definition.",
    level: "basic"
  },
  {
    question: "Assertion: Swadeep will pass if he studies. Reason: Studying guarantees passing. Evaluate as logical statements.",
    shortAnswer: "B (Both true but R not correct explanation).",
    explanation: "Both may be true in context, but studying doesn't guarantee passing (other factors). So R may be too strong, or not the full explanation.",
    hint: "Real-world nuance.",
    level: "intermediate"
  },
  {
    question: "Assertion: ¬(p ∨ q) ≡ ¬p ∧ ¬q. Reason: De Morgan's law. Evaluate.",
    shortAnswer: "A (Both true, R correct explanation).",
    explanation: "R correctly cites De Morgan's law which gives that equivalence.",
    hint: "Second De Morgan law.",
    level: "basic"
  },
  {
    question: "Assertion: (p ⇒ q) ∧ (q ⇒ p) is equivalent to p ⇔ q. Reason: Biconditional is defined as both implications. Evaluate.",
    shortAnswer: "A (Both true, R correct explanation).",
    explanation: "R is the definition, correctly explaining the assertion.",
    hint: "Definition of biconditional.",
    level: "basic"
  },
  {
    question: "Assertion: p ⇒ q is false. Reason: p is true and q is false. Evaluate.",
    shortAnswer: "A (Both true, R correct explanation).",
    explanation: "Implication is false only when antecedent true and consequent false. R states exactly that.",
    hint: "Only false case.",
    level: "intermediate"
  },
  {
    question: "Assertion: A statement that is always false is a contradiction. Reason: Contradiction has all false in truth table. Evaluate.",
    shortAnswer: "A (Both true, R correct explanation).",
    explanation: "R correctly defines contradiction.",
    hint: "Definition match.",
    level: "basic"
  },
  {
    question: "Assertion: Tautology is always true. Reason: Tautology has all true in truth table. Evaluate.",
    shortAnswer: "A (Both true, R correct explanation).",
    explanation: "R defines tautology, explaining the assertion.",
    hint: "Definition.",
    level: "basic"
  },
  {
    question: "Assertion: p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r). Reason: OR distributes over AND. Evaluate.",
    shortAnswer: "A (Both true, R correct explanation).",
    explanation: "R is the distributive law, which explains the equivalence.",
    hint: "Distributive law.",
    level: "intermediate"
  },
  {
    question: "Assertion: (p ∧ q) ∨ r ≡ p ∧ (q ∨ r). Reason: AND distributes over OR. Evaluate.",
    shortAnswer: "C (A false, R true).",
    explanation: "A is false (distribution works differently: (p∧q)∨r is not equivalent to p∧(q∨r) generally). R is true as a general law but doesn't apply here correctly.",
    hint: "Check counterexample.",
    level: "expert"
  },
  {
    question: "Assertion: If a figure is a square, then it is a rectangle. Reason: All squares have four right angles and opposite sides equal, which are properties of rectangles. Evaluate.",
    shortAnswer: "A (Both true, R correct explanation).",
    explanation: "R explains why square satisfies rectangle definition.",
    hint: "Geometric reasoning.",
    level: "intermediate"
  },
  {
    question: "Assertion: p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r). Reason: AND distributes over OR. Evaluate.",
    shortAnswer: "A (Both true, R correct explanation).",
    explanation: "R is the distributive law, correctly explaining the equivalence.",
    hint: "Correct distribution.",
    level: "intermediate"
  }
];

export default questions;