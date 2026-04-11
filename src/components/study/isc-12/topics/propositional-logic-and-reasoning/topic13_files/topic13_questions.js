// topic13_files/topic13_questions.js
const questions = [
  {
    question: "State De Morgan's first law.",
    shortAnswer: "¬(p ∧ q) ≡ ¬p ∨ ¬q",
    explanation: "The negation of a conjunction is logically equivalent to the disjunction of the negations.",
    hint: "AND becomes OR, and each part is negated.",
    level: "basic",
    codeExample: "!(a && b) === !a || !b"
  },
  {
    question: "State De Morgan's second law.",
    shortAnswer: "¬(p ∨ q) ≡ ¬p ∧ ¬q",
    explanation: "The negation of a disjunction is logically equivalent to the conjunction of the negations.",
    hint: "OR becomes AND, and each part is negated.",
    level: "basic"
  },
  {
    question: "Apply De Morgan to ¬(p ∧ ¬q).",
    shortAnswer: "¬p ∨ q",
    explanation: "¬(p ∧ ¬q) ≡ ¬p ∨ ¬(¬q) ≡ ¬p ∨ q.",
    hint: "Double negation cancels on q.",
    level: "intermediate"
  },
  {
    question: "Simplify ¬(¬p ∨ q) using De Morgan.",
    shortAnswer: "p ∧ ¬q",
    explanation: "¬(¬p ∨ q) ≡ ¬(¬p) ∧ ¬q ≡ p ∧ ¬q.",
    hint: "Flip OR to AND, negate each part.",
    level: "intermediate"
  },
  {
    question: "What is the negation of (p ∧ q ∧ r)?",
    shortAnswer: "¬p ∨ ¬q ∨ ¬r",
    explanation: "De Morgan extends: negating an AND of many terms becomes OR of negations.",
    hint: "All ANDs become ORs, each term negated.",
    level: "intermediate"
  },
  {
    question: "How do you negate (p ∨ q ∨ r)?",
    shortAnswer: "¬p ∧ ¬q ∧ ¬r",
    explanation: "Negation of a multi-term OR becomes AND of negations.",
    hint: "Flip all ORs to ANDs.",
    level: "intermediate"
  },
  {
    question: "Simplify ¬(p ∧ ¬q ∧ r).",
    shortAnswer: "¬p ∨ q ∨ ¬r",
    explanation: "Apply De Morgan: ¬p ∨ ¬(¬q) ∨ ¬r ≡ ¬p ∨ q ∨ ¬r.",
    hint: "Negate each part; double negation on q.",
    level: "intermediate"
  },
  {
    question: "Is ¬(p ∧ q) logically equivalent to ¬p ∧ ¬q?",
    shortAnswer: "No, that's a common mistake.",
    explanation: "Correct equivalence is ¬p ∨ ¬q, not AND. Counterexample: p true, q true gives left false, right false? Actually ¬p∧¬q = F∧F = F, same? Try p true, q false: left ¬(T∧F)=¬F=T; right ¬T∧¬F = F∧T = F. Different. So not equivalent.",
    hint: "De Morgan flips AND to OR, not keeps AND.",
    level: "basic"
  },
  {
    question: "What is the negation of 'Swadeep is tall and Tuhina is smart'?",
    shortAnswer: "Swadeep is not tall or Tuhina is not smart.",
    explanation: "De Morgan's first law applied to natural language.",
    hint: "AND becomes OR, negate each part.",
    level: "basic"
  },
  {
    question: "Write the contrapositive of p ⇒ q using De Morgan?",
    shortAnswer: "¬q ⇒ ¬p",
    explanation: "Contrapositive is not directly De Morgan, but you can derive: p⇒q ≡ ¬p∨q. Negating both sides? Not needed.",
    hint: "Contrapositive is a different law.",
    level: "intermediate"
  },
  {
    question: "Simplify the boolean expression !(a && b) || c using De Morgan.",
    shortAnswer: "!a || !b || c",
    explanation: "!(a && b) becomes !a || !b, then OR with c.",
    hint: "Apply De Morgan to the negated AND.",
    level: "intermediate"
  },
  {
    question: "How does De Morgan apply to if (!(x > 0 && y > 0)) in code?",
    shortAnswer: "if (x <= 0 || y <= 0)",
    explanation: "Negation of (x>0 && y>0) becomes (x<=0 || y<=0) after applying De Morgan and flipping inequalities.",
    hint: "Flip > to <= when negating.",
    level: "intermediate"
  },
  {
    question: "What is ¬(p ∨ ¬q) simplified?",
    shortAnswer: "¬p ∧ q",
    explanation: "¬(p ∨ ¬q) ≡ ¬p ∧ ¬(¬q) ≡ ¬p ∧ q.",
    hint: "OR becomes AND; double negation on q.",
    level: "intermediate"
  },
  {
    question: "Are ¬(p ∧ q) and ¬p ∨ ¬q logically equivalent?",
    shortAnswer: "Yes, that's De Morgan's first law.",
    explanation: "They have identical truth tables.",
    hint: "Always true by definition.",
    level: "basic"
  },
  {
    question: "Simplify ¬(¬p ∧ ¬q) using De Morgan.",
    shortAnswer: "p ∨ q",
    explanation: "¬(¬p ∧ ¬q) ≡ ¬(¬p) ∨ ¬(¬q) ≡ p ∨ q.",
    hint: "Double negation on both.",
    level: "basic"
  },
  {
    question: "What is the relationship between De Morgan's laws and duality?",
    shortAnswer: "De Morgan's laws show that negation swaps ∧ and ∨, which is the basis of duality.",
    explanation: "The dual of a statement is obtained by swapping ∧/∨ and True/False; De Morgan shows how negation interacts.",
    hint: "Negation acts like a dualizing operator.",
    level: "expert"
  },
  {
    question: "Apply De Morgan to ¬(p ⇒ q).",
    shortAnswer: "p ∧ ¬q",
    explanation: "First rewrite p⇒q as ¬p∨q, then ¬(¬p∨q) ≡ p ∧ ¬q.",
    hint: "Negation of implication is antecedent AND negation of consequent.",
    level: "intermediate"
  },
  {
    question: "Simplify the circuit: NOT (AND (p, q)) using De Morgan to use only NOR gates.",
    shortAnswer: "OR (NOT p, NOT q) which is a NOR if you have NOR? Actually NOR is NOT OR.",
    explanation: "De Morgan allows conversion between NAND and NOR implementations.",
    hint: "NAND = NOT AND becomes OR with inverted inputs.",
    level: "expert"
  },
  {
    question: "Write the negation of 'Abhronila likes math and Susmita likes science'.",
    shortAnswer: "Abhronila does not like math or Susmita does not like science.",
    explanation: "De Morgan: NOT (A AND B) ≡ (NOT A) OR (NOT B).",
    hint: "Break the AND, change to OR, negate each.",
    level: "basic"
  },
  {
    question: "Is ¬(p ∧ q) ∧ r equivalent to (¬p ∨ ¬q) ∧ r?",
    shortAnswer: "Yes, by De Morgan substitution.",
    explanation: "Since ¬(p∧q) ≡ ¬p∨¬q, replacing one with the other preserves equivalence.",
    hint: "Substitution of equivalents.",
    level: "intermediate"
  },
  {
    question: "Simplify ¬(p ∨ (q ∧ r)).",
    shortAnswer: "¬p ∧ (¬q ∨ ¬r)",
    explanation: "First apply De Morgan to outer OR: ¬p ∧ ¬(q∧r). Then apply De Morgan to ¬(q∧r): ¬p ∧ (¬q ∨ ¬r).",
    hint: "Apply De Morgan twice, inside-out.",
    level: "expert"
  },
  {
    question: "What is the De Morgan equivalent of 'It is not the case that both the switch is on and the light is off'?",
    shortAnswer: "The switch is off or the light is on.",
    explanation: "NOT (on AND off) ≡ NOT on OR NOT off ≡ off OR on.",
    hint: "Flip AND to OR, negate each condition.",
    level: "basic"
  },
  {
    question: "Simplify ¬(¬p ∨ ¬q) ∧ r.",
    shortAnswer: "(p ∧ q) ∧ r",
    explanation: "¬(¬p ∨ ¬q) ≡ p ∧ q (by De Morgan and double negation). Then AND with r.",
    hint: "Inner De Morgan first.",
    level: "expert"
  },
  {
    question: "How many variables can De Morgan's laws handle?",
    shortAnswer: "Any finite number.",
    explanation: "The laws generalize to n variables: ¬(p1 ∧ p2 ∧ ... ∧ pn) ≡ ¬p1 ∨ ¬p2 ∨ ... ∨ ¬pn, and similarly for OR.",
    hint: "Induction extends the laws.",
    level: "intermediate"
  },
  {
    question: "Is ¬(p ∧ q) ∨ r equivalent to (¬p ∨ ¬q) ∨ r?",
    shortAnswer: "Yes, by De Morgan substitution.",
    explanation: "Replacing ¬(p∧q) with its equivalent ¬p∨¬q yields an equivalent expression.",
    hint: "Substitution of equivalents preserves truth.",
    level: "intermediate"
  },
  {
    question: "What mistake do beginners make when applying De Morgan to ¬(p ∧ q)?",
    shortAnswer: "They write ¬p ∧ ¬q instead of ¬p ∨ ¬q.",
    explanation: "Forgetting to flip the operator is the most common error.",
    hint: "Remember: break the line, change the sign.",
    level: "basic"
  },
  {
    question: "Simplify ¬(p ∨ (q ∨ r)) using De Morgan.",
    shortAnswer: "¬p ∧ ¬q ∧ ¬r",
    explanation: "¬(p ∨ q ∨ r) by associativity and De Morgan yields ¬p ∧ ¬q ∧ ¬r.",
    hint: "OR chain becomes AND of negations.",
    level: "intermediate"
  },
  {
    question: "In digital logic, what gate implements ¬(p ∧ q)?",
    shortAnswer: "NAND gate.",
    explanation: "NAND = NOT AND, which by De Morgan is equivalent to OR with inverted inputs.",
    hint: "NAND is universal gate.",
    level: "intermediate"
  },
  {
    question: "Simplify ¬(p ∧ q) ∧ ¬(p ∨ q).",
    shortAnswer: "¬p ∧ ¬q",
    explanation: "First: ¬(p∧q) ≡ ¬p∨¬q. Second: ¬(p∨q) ≡ ¬p∧¬q. Then (¬p∨¬q) ∧ (¬p∧¬q) ≡ (¬p∧¬p∧¬q) ∨ (¬q∧¬p∧¬q) ... simplifies to ¬p∧¬q.",
    hint: "Distribute and simplify.",
    level: "expert"
  },
  {
    question: "What is the dual of De Morgan's first law?",
    shortAnswer: "De Morgan's second law.",
    explanation: "The dual of ¬(p∧q) ≡ ¬p∨¬q is ¬(p∨q) ≡ ¬p∧¬q (swap ∧/∨).",
    hint: "Duality swaps operators.",
    level: "expert"
  }
];

export default questions;