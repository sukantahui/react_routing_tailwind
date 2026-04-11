// topic16_files/topic16_questions.js
const questions = [
  {
    question: "What is the inverse of p ⇒ q?",
    shortAnswer: "¬p ⇒ ¬q",
    explanation: "The inverse negates both the antecedent (p) and the consequent (q).",
    hint: "Add NOT to both sides.",
    level: "basic",
    codeExample: "if(!p) then !q"
  },
  {
    question: "Is the inverse logically equivalent to the original implication?",
    shortAnswer: "No, generally not.",
    explanation: "Only the contrapositive is equivalent to the original. Inverse is equivalent to the converse.",
    hint: "Check truth table rows 2 and 3.",
    level: "basic"
  },
  {
    question: "Give an example where the original is true but its inverse is false.",
    shortAnswer: "p: 'It is a square', q: 'It is a rectangle'.",
    explanation: "Original true (squares are rectangles). Inverse: 'If not square then not rectangle' — false (a circle is not square but also not rectangle? Wait need p false, q true for inverse false. Better: p: 'number is divisible by 4', q: 'number is even'. Inverse: 'if not divisible by 4 then not even' — false (2 is not divisible by 4 but is even).",
    hint: "Find p false, q true case.",
    level: "intermediate"
  },
  {
    question: "What is the inverse of 'If Swadeep studies, then he will pass'?",
    shortAnswer: "If Swadeep does NOT study, then he will NOT pass.",
    explanation: "Negate both parts: 'does not study' and 'will not pass'.",
    hint: "Add 'not' to hypothesis and conclusion.",
    level: "basic"
  },
  {
    question: "How is the inverse related to the converse?",
    shortAnswer: "The inverse is logically equivalent to the converse.",
    explanation: "Converse (q⇒p) and inverse (¬p⇒¬q) are contrapositives of each other, hence equivalent.",
    hint: "They are contrapositives.",
    level: "intermediate"
  },
  {
    question: "What is the inverse of p ⇒ ¬q?",
    shortAnswer: "¬p ⇒ q",
    explanation: "Negate both: ¬p ⇒ ¬(¬q) = ¬p ⇒ q.",
    hint: "Double negation on q.",
    level: "intermediate"
  },
  {
    question: "If the original is false, can its inverse be true?",
    shortAnswer: "Yes.",
    explanation: "Example: p true, q false makes original false. Inverse: ¬p⇒¬q = false⇒true = true.",
    hint: "Row 2 in truth table.",
    level: "intermediate"
  },
  {
    question: "What is the inverse of (p ∧ q) ⇒ r?",
    shortAnswer: "¬(p ∧ q) ⇒ ¬r, which simplifies to (¬p ∨ ¬q) ⇒ ¬r.",
    explanation: "Negate the whole antecedent and consequent.",
    hint: "Use De Morgan on antecedent.",
    level: "expert"
  },
  {
    question: "Is the inverse of a tautology always a tautology?",
    shortAnswer: "Not necessarily.",
    explanation: "If original is p⇒p (tautology), inverse is ¬p⇒¬p (also tautology). But if original is (p∧q)⇒p (tautology), inverse is ¬(p∧q)⇒¬p, which is not a tautology.",
    hint: "Depends on the statement.",
    level: "expert"
  },
  {
    question: "What is the difference between inverse and contrapositive?",
    shortAnswer: "Inverse negates both; contrapositive negates AND swaps.",
    explanation: "Inverse: ¬p⇒¬q; Contrapositive: ¬q⇒¬p.",
    hint: "Contrapositive swaps order.",
    level: "basic"
  },
  {
    question: "If the inverse is true, what can we conclude about the original?",
    shortAnswer: "Nothing — the original may be true or false.",
    explanation: "Inverse true does not imply original true (e.g., p false, q false: inverse true, original true; p false, q true: inverse true, original true? Wait p false, q true: original true (false⇒true=true), inverse: true⇒false=false. Actually inverse false. So inverse true only when? Check: inverse true except when ¬p true and ¬q false (p false, q true). So inverse true means NOT (p false and q true). That means either p true or q false. Original true except when p true and q false. So they differ. Thus no implication.)",
    hint: "No direct relationship.",
    level: "expert"
  },
  {
    question: "Write the inverse of 'If a figure is a triangle, then it has three sides'.",
    shortAnswer: "If a figure is NOT a triangle, then it does NOT have three sides.",
    explanation: "Negate both parts. The inverse is false (a square is not a triangle but has four sides, not three — wait four sides, so 'does not have three sides' is true? Actually a square does not have three sides, so the inverse becomes true? Need careful: The statement 'does NOT have three sides' is true for a square. So inverse is actually true? But common sense says inverse should be false. Let's check: Original: triangle → 3 sides (true). Inverse: not triangle → not 3 sides. A square is not a triangle and does not have 3 sides (true). So inverse is also true? That means this is a biconditional? Actually any polygon that is not a triangle could have 3 sides? No, only triangles have exactly 3 sides. So 'not triangle' implies 'not 3 sides' is true. So inverse is true. So here original and inverse are both true. So it's possible. Good example where inverse holds.",
    hint: "Sometimes inverse can be true.",
    level: "intermediate"
  },
  {
    question: "What is the inverse of ¬p ⇒ q?",
    shortAnswer: "¬(¬p) ⇒ ¬q = p ⇒ ¬q",
    explanation: "Negate both sides, double negation on p.",
    hint: "p ⇒ ¬q",
    level: "intermediate"
  },
  {
    question: "In logic, why is the inverse not equivalent to the original?",
    shortAnswer: "Because the truth table rows differ when p is false and q is true.",
    explanation: "Original is true in that case, inverse is false.",
    hint: "Check the third row.",
    level: "basic"
  },
  {
    question: "What is the inverse of 'If it is raining, then the ground is wet'?",
    shortAnswer: "If it is NOT raining, then the ground is NOT wet.",
    explanation: "Inverse negates both conditions. It's false because ground can be wet from sprinklers.",
    hint: "Negate each part.",
    level: "basic"
  },
  {
    question: "Is the inverse of a false statement always true?",
    shortAnswer: "No.",
    explanation: "If original false (p true, q false), inverse (¬p⇒¬q) = false⇒true = true. But if original false in other way? Implication false only when p true, q false. So only one case. So for that specific false original, inverse is true. But for other false statements not in implication form? The question is vague.",
    hint: "Implication false only one case.",
    level: "expert"
  },
  {
    question: "How do you form the inverse of a statement with multiple conditions?",
    shortAnswer: "Negate the entire antecedent and the entire consequent.",
    explanation: "For (p ∧ q) ⇒ r, inverse is ¬(p∧q) ⇒ ¬r.",
    hint: "Use parentheses.",
    level: "intermediate"
  },
  {
    question: "What is the inverse of 'If Susmita is in class, then the teacher is present'?",
    shortAnswer: "If Susmita is NOT in class, then the teacher is NOT present.",
    explanation: "Negate both. This is false (teacher could be present even if Susmita absent).",
    hint: "Add 'not' to each.",
    level: "basic"
  },
  {
    question: "Are the inverse and converse logically equivalent?",
    shortAnswer: "Yes.",
    explanation: "Inverse (¬p⇒¬q) and converse (q⇒p) are contrapositives: ¬p⇒¬q ≡ ¬¬q⇒¬¬p ≡ q⇒p.",
    hint: "Contrapositive of inverse is converse.",
    level: "intermediate"
  },
  {
    question: "What is the inverse of (p ∨ q) ⇒ r?",
    shortAnswer: "¬(p ∨ q) ⇒ ¬r, which simplifies to (¬p ∧ ¬q) ⇒ ¬r.",
    explanation: "Negate the whole disjunction using De Morgan.",
    hint: "De Morgan on antecedent.",
    level: "expert"
  },
  {
    question: "If the original is a biconditional (p ⇔ q), what is its inverse?",
    shortAnswer: "¬p ⇔ ¬q (which is equivalent to p ⇔ q).",
    explanation: "Biconditional's inverse is also a biconditional and is equivalent because negating both sides preserves equivalence.",
    hint: "Double negation.",
    level: "expert"
  },
  {
    question: "What common mistake do students make with inverse?",
    shortAnswer: "Assuming inverse is equivalent to original, or confusing it with contrapositive.",
    explanation: "Many think negating both sides keeps meaning, but it doesn't.",
    hint: "Only contrapositive works.",
    level: "basic"
  },
  {
    question: "Prove that inverse ≡ converse using logical laws.",
    shortAnswer: "Inverse: ¬p⇒¬q ≡ ¬¬q ⇒ ¬¬p ≡ q⇒p (contrapositive of inverse).",
    explanation: "Apply contrapositive to inverse to get converse.",
    hint: "Contrapositive twice.",
    level: "expert"
  },
  {
    question: "What is the inverse of 'If x > 5, then x > 3'?",
    shortAnswer: "If x ≤ 5, then x ≤ 3.",
    explanation: "Negate inequalities: > becomes ≤. Original true, inverse false (x=4 gives true antecedent, false consequent).",
    hint: "Flip inequality signs when negating.",
    level: "intermediate"
  },
  {
    question: "In programming, why is it dangerous to assume the inverse of a condition?",
    shortAnswer: "Because the inverse may not hold, leading to logical errors.",
    explanation: "If you have if (p) { doX(); }, you cannot assume else { doNotX(); } is equivalent to inverse logic.",
    hint: "Don't negate conditions carelessly.",
    level: "intermediate"
  },
  {
    question: "What is the inverse of ¬p ⇒ ¬q?",
    shortAnswer: "¬(¬p) ⇒ ¬(¬q) = p ⇒ q (the original).",
    explanation: "Applying inverse twice returns original.",
    hint: "Inverse is an involution.",
    level: "intermediate"
  },
  {
    question: "Is the inverse of a contradiction always a tautology?",
    shortAnswer: "Not necessarily, depends on form.",
    explanation: "If contradiction is p∧¬p, it's not an implication. For implication false⇒false (tautology actually), its inverse is true⇒true (tautology). Need specific.",
    hint: "Depends on structure.",
    level: "expert"
  },
  {
    question: "How can you remember the difference between inverse, converse, and contrapositive?",
    shortAnswer: "Inverse: negate both. Converse: swap. Contrapositive: swap AND negate.",
    explanation: "Use mnemonic: 'Inverse = NOT both, Converse = SWAP, Contrapositive = SWAP + NOT'.",
    hint: "Memorize the operations.",
    level: "basic"
  },
  {
    question: "What is the inverse of 'If Debangshu is a doctor, then he went to medical school'?",
    shortAnswer: "If Debangshu is NOT a doctor, then he did NOT go to medical school.",
    explanation: "Inverse is false (someone could have gone to medical school but not be a doctor).",
    hint: "Negate both.",
    level: "basic"
  },
  {
    question: "If original and inverse are both true, what does that imply about p and q?",
    shortAnswer: "They have the same truth value (both true or both false).",
    explanation: "Original true when (p,q) = (T,T), (F,T), (F,F). Inverse true when (p,q) = (T,T), (T,F), (F,F). Intersection gives (T,T) and (F,F).",
    hint: "Both true only when p and q match.",
    level: "expert"
  }
];

export default questions;