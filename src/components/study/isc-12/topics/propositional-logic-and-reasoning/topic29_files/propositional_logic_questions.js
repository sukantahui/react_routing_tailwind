// propositional_logic_questions.js - 50 Propositional Logic Questions
export const propositionalQuestions = [
  // ======================================================================
  // BASIC CONCEPTS (Q1–Q10)
  // ======================================================================
  {
    id: 1,
    type: "mcq",
    questionText: "Which of the following is logically equivalent to P ⇒ Q?",
    options: ["¬P ∨ Q", "¬Q ⇒ ¬P", "¬(P ∧ ¬Q)", "All of the above"],
    correctAnswer: "D",
    steps: [
      { step: 1, action: "Recall equivalence", expression: "P ⇒ Q ≡ ¬P ∨ Q", law: "Implication law" },
      { step: 2, action: "Contrapositive", expression: "P ⇒ Q ≡ ¬Q ⇒ ¬P", law: "Contrapositive equivalence" },
      { step: 3, action: "Negation of antecedent", expression: "P ⇒ Q ≡ ¬(P ∧ ¬Q)", law: "Material implication" },
      { step: 4, action: "Conclusion", expression: "All three are correct", law: "Logical equivalence" }
    ],
    explanation: "P ⇒ Q is false only when P true and Q false. ¬P ∨ Q, ¬Q ⇒ ¬P, and ¬(P ∧ ¬Q) all have the same truth table.",
    definitions: [
      { term: "Implication", pronunciation: "im-pli-kay-shun", definition: "P ⇒ Q means if P then Q.", example: "If it rains, then ground gets wet." },
      { term: "Contrapositive", pronunciation: "kon-truh-poz-i-tiv", definition: "Swapping and negating both parts.", example: "¬Q ⇒ ¬P is contrapositive of P ⇒ Q." }
    ],
    hints: ["Draw a truth table for P ⇒ Q and each option.", "Remember: implication is false only when P true and Q false."],
    finalRemark: "All three forms are logically equivalent; they are used interchangeably in proofs.",
    marks: 1
  },
  {
    id: 2,
    type: "direct",
    questionText: "Construct the truth table for (P ∨ Q) ⇒ (P ∧ Q).",
    correctAnswer: "Truth table: rows (0,0)→1; (0,1)→0; (1,0)→0; (1,1)→1",
    steps: [
      { step: 1, action: "List all combinations", expression: "P, Q ∈ {0,1}", law: "Truth table" },
      { step: 2, action: "Compute P∨Q", expression: "OR of inputs", law: "Disjunction" },
      { step: 3, action: "Compute P∧Q", expression: "AND of inputs", law: "Conjunction" },
      { step: 4, action: "Compute implication (P∨Q) ⇒ (P∧Q)", expression: "False only when left true and right false", law: "Implication" }
    ],
    truthTable: {
      headers: ["P", "Q", "P∨Q", "P∧Q", "(P∨Q) ⇒ (P∧Q)"],
      rows: [
        [0,0,0,0,1],
        [0,1,1,0,0],
        [1,0,1,0,0],
        [1,1,1,1,1]
      ]
    },
    explanation: "The implication is true except when (P∨Q) is true and (P∧Q) is false, which occurs when exactly one of P, Q is true.",
    definitions: [
      { term: "Truth Table", pronunciation: "trooth tay-bul", definition: "A table showing output for all input combinations.", example: "AND gate truth table: 0∧0=0, 0∧1=0, 1∧0=0, 1∧1=1." }
    ],
    hints: ["Write columns step by step: P, Q, then OR, AND, then implication.", "Implication is false only when antecedent true and consequent false."],
    finalRemark: "The result is true when both inputs are equal (XNOR).",
    marks: 2
  },
  {
    id: 3,
    type: "simplify",
    questionText: "Simplify the Boolean expression: (P ∧ Q) ∨ (P ∧ ¬Q) ∨ (¬P ∧ Q).",
    correctAnswer: "P ∨ Q",
    steps: [
      { step: 1, action: "Original expression", expression: "(P∧Q) ∨ (P∧¬Q) ∨ (¬P∧Q)", law: "Given" },
      { step: 2, action: "Factor P from first two terms", expression: "P ∧ (Q ∨ ¬Q) ∨ (¬P∧Q)", law: "Distributive" },
      { step: 3, action: "Simplify (Q ∨ ¬Q)", expression: "P ∧ 1 ∨ (¬P∧Q) = P ∨ (¬P∧Q)", law: "Complement law" },
      { step: 4, action: "Apply absorption", expression: "P ∨ Q", law: "Absorption law" }
    ],
    explanation: "The expression simplifies to P ∨ Q, which is the logical OR.",
    definitions: [
      { term: "Absorption Law", pronunciation: "ab-sorp-shun law", definition: "P ∨ (¬P ∧ Q) = P ∨ Q", example: "A ∨ (¬A ∧ B) = A ∨ B." }
    ],
    hints: ["Use distributive law to factor common variables.", "Remember: X ∨ ¬X = 1."],
    finalRemark: "This is a standard simplification often asked in exams.",
    marks: 2
  },
  {
    id: 4,
    type: "mcq",
    questionText: "The statement (P ⇒ Q) ∧ (Q ⇒ P) is logically equivalent to:",
    options: ["P ⇒ Q", "Q ⇒ P", "P ⇔ Q", "P ⊕ Q"],
    correctAnswer: "C",
    steps: [
      { step: 1, action: "Recall biconditional", expression: "P ⇔ Q ≡ (P ⇒ Q) ∧ (Q ⇒ P)", law: "Definition of biconditional" },
      { step: 2, action: "Match with options", expression: "Option C is P ⇔ Q", law: "Comparison" }
    ],
    explanation: "The conjunction of an implication and its converse gives the biconditional (if and only if).",
    definitions: [
      { term: "Biconditional", pronunciation: "bye-kon-di-shun-ul", definition: "P ⇔ Q means P is true if and only if Q is true.", example: "A triangle is equilateral ⇔ it is equiangular." }
    ],
    hints: ["Write truth table for (P⇒Q)∧(Q⇒P) and compare with options.", "It matches the XNOR (equivalence) operation."],
    finalRemark: "Biconditional is true when both sides have the same truth value.",
    marks: 1
  },
  {
    id: 5,
    type: "direct",
    questionText: "Prove that (P ⇒ Q) ∨ (Q ⇒ P) is a tautology.",
    correctAnswer: "Always true (tautology)",
    steps: [
      { step: 1, action: "Consider truth values", expression: "Case 1: P true", law: "Case analysis" },
      { step: 2, action: "If P true", expression: "P⇒Q = Q, Q⇒P = true, so disjunction = true", law: "Implication with true antecedent" },
      { step: 3, action: "Case 2: P false", expression: "P⇒Q = true, Q⇒P = ¬Q, disjunction = true ∨ ¬Q = true", law: "Implication with false antecedent" },
      { step: 4, action: "Conclusion", expression: "Both cases give true, hence tautology", law: "Tautology definition" }
    ],
    truthTable: {
      headers: ["P", "Q", "P⇒Q", "Q⇒P", "(P⇒Q) ∨ (Q⇒P)"],
      rows: [
        [0,0,1,1,1],
        [0,1,1,0,1],
        [1,0,0,1,1],
        [1,1,1,1,1]
      ]
    },
    explanation: "At least one of the two implications is always true because if P is true then Q⇒P is true; if P is false then P⇒Q is true.",
    definitions: [
      { term: "Tautology", pronunciation: "taw-taw-luh-jee", definition: "A statement that is true for all truth assignments.", example: "P ∨ ¬P is a tautology." }
    ],
    hints: ["Use case analysis: either P is true or false.", "Implication with false antecedent is always true."],
    finalRemark: "This is a famous tautology often used in logic proofs.",
    marks: 2
  },
  {
    id: 6,
    type: "mcq",
    questionText: "Which of the following is a contradiction?",
    options: ["P ∨ ¬P", "P ∧ ¬P", "P ⇒ P", "P ⇔ P"],
    correctAnswer: "B",
    steps: [
      { step: 1, action: "Evaluate each", expression: "P ∨ ¬P = tautology; P ∧ ¬P = contradiction; P⇒P = tautology; P⇔P = tautology", law: "Truth table" }
    ],
    explanation: "P ∧ ¬P is always false, hence a contradiction.",
    definitions: [
      { term: "Contradiction", pronunciation: "kon-truh-dik-shun", definition: "A statement that is false for all truth assignments.", example: "P ∧ ¬P." }
    ],
    hints: ["Check each option with truth table.", "Contradiction is opposite of tautology."],
    finalRemark: "The law of non‑contradiction states that a proposition and its negation cannot both be true.",
    marks: 1
  },
  {
    id: 7,
    type: "simplify",
    questionText: "Simplify: ¬(¬P ∨ Q) ∨ ¬(P ∨ ¬Q).",
    correctAnswer: "P ⊕ Q (XOR)",
    steps: [
      { step: 1, action: "Apply De Morgan", expression: "¬(¬P ∨ Q) = P ∧ ¬Q", law: "De Morgan" },
      { step: 2, action: "Apply De Morgan to second", expression: "¬(P ∨ ¬Q) = ¬P ∧ Q", law: "De Morgan" },
      { step: 3, action: "Combine", expression: "(P ∧ ¬Q) ∨ (¬P ∧ Q) = P ⊕ Q", law: "XOR definition" }
    ],
    explanation: "The expression simplifies to exclusive OR.",
    definitions: [
      { term: "XOR", pronunciation: "ex-or", definition: "True when inputs differ.", example: "True ⊕ False = True." }
    ],
    hints: ["Use De Morgan's laws step by step.", "Recall that XOR = (P∧¬Q) ∨ (¬P∧Q)."],
    finalRemark: "This simplification is common in digital logic design.",
    marks: 2
  },
  {
    id: 8,
    type: "direct",
    questionText: "Write the contrapositive of: 'If a number is divisible by 6, then it is divisible by 2 and 3.'",
    correctAnswer: "If a number is not divisible by 2 or not divisible by 3, then it is not divisible by 6.",
    steps: [
      { step: 1, action: "Identify P and Q", expression: "P = 'divisible by 6', Q = 'divisible by 2 and 3'", law: "Given" },
      { step: 2, action: "Contrapositive formula", expression: "¬Q ⇒ ¬P", law: "Contrapositive" },
      { step: 3, action: "Negate Q", expression: "¬(divisible by 2 and 3) = not divisible by 2 OR not divisible by 3", law: "De Morgan" },
      { step: 4, action: "Negate P", expression: "¬(divisible by 6) = not divisible by 6", law: "Negation" },
      { step: 5, action: "Combine", expression: "If not divisible by 2 or not divisible by 3, then not divisible by 6", law: "Contrapositive" }
    ],
    explanation: "Contrapositive of P⇒Q is ¬Q⇒¬P.",
    definitions: [
      { term: "Contrapositive", pronunciation: "kon-truh-poz-i-tiv", definition: "Swapping and negating both parts.", example: "Original: If rain, then wet. Contrapositive: If not wet, then not rain." }
    ],
    hints: ["Negation of 'and' becomes 'or' (De Morgan).", "Contrapositive is logically equivalent to original."],
    finalRemark: "Contrapositive is often used in mathematical proofs.",
    marks: 2
  },
  {
    id: 9,
    type: "mcq",
    questionText: "The converse of 'If it is a square, then it is a rectangle' is:",
    options: [
      "If it is a rectangle, then it is a square.",
      "If it is not a square, then it is not a rectangle.",
      "If it is not a rectangle, then it is not a square.",
      "It is a square if and only if it is a rectangle."
    ],
    correctAnswer: "A",
    steps: [
      { step: 1, action: "Identify P and Q", expression: "P = 'it is a square', Q = 'it is a rectangle'", law: "Given" },
      { step: 2, action: "Converse formula", expression: "Q ⇒ P", law: "Converse" },
      { step: 3, action: "Write in words", expression: "If it is a rectangle, then it is a square.", law: "Substitution" }
    ],
    explanation: "Converse swaps hypothesis and conclusion.",
    definitions: [
      { term: "Converse", pronunciation: "kon-vurs", definition: "Swapping the antecedent and consequent.", example: "Original: If P then Q → Converse: If Q then P." }
    ],
    hints: ["Do not confuse converse with inverse or contrapositive.", "Converse is not logically equivalent to original."],
    finalRemark: "The converse of a true statement is not necessarily true (e.g., not all rectangles are squares).",
    marks: 1
  },
  {
    id: 10,
    type: "fill",
    questionText: "The negation of P ∧ Q is ________.",
    correctAnswer: "¬P ∨ ¬Q",
    steps: [
      { step: 1, action: "Apply De Morgan's law", expression: "¬(P ∧ Q) ≡ ¬P ∨ ¬Q", law: "De Morgan" }
    ],
    explanation: "De Morgan's law states that the negation of a conjunction is the disjunction of the negations.",
    definitions: [
      { term: "De Morgan's Law", pronunciation: "dee mor-ganz law", definition: "¬(P ∧ Q) ≡ ¬P ∨ ¬Q and ¬(P ∨ Q) ≡ ¬P ∧ ¬Q.", example: "It is not both raining and cold means either it's not raining or not cold." }
    ],
    hints: ["Remember: AND becomes OR after negation, and OR becomes AND."],
    finalRemark: "De Morgan's laws are fundamental in logic and digital circuits.",
    marks: 1
  },

  // ======================================================================
  // IMPLICATION AND EQUIVALENCE (Q11–Q20)
  // ======================================================================
  {
    id: 11,
    type: "mcq",
    questionText: "The statement (P ⇒ Q) ⇒ (¬Q ⇒ ¬P) is:",
    options: ["A tautology", "A contradiction", "Contingent", "None of these"],
    correctAnswer: "A",
    steps: [
      { step: 1, action: "Recall that ¬Q ⇒ ¬P is contrapositive of P ⇒ Q", expression: "Contrapositive is logically equivalent to original", law: "Logical equivalence" },
      { step: 2, action: "Thus (P ⇒ Q) ⇒ (Contrapositive) is (P⇒Q) ⇒ (P⇒Q)", expression: "X ⇒ X is always true", law: "Tautology" }
    ],
    truthTable: {
      headers: ["P", "Q", "P⇒Q", "¬Q", "¬P", "¬Q⇒¬P", "(P⇒Q) ⇒ (¬Q⇒¬P)"],
      rows: [
        [0,0,1,1,1,1,1],
        [0,1,1,0,1,1,1],
        [1,0,0,1,0,0,1],
        [1,1,1,0,0,1,1]
      ]
    },
    explanation: "Since the contrapositive is equivalent to the original, the implication of a statement to its contrapositive is always true.",
    definitions: [
      { term: "Contrapositive", pronunciation: "kon-truh-poz-i-tiv", definition: "¬Q ⇒ ¬P is contrapositive of P ⇒ Q and is logically equivalent." }
    ],
    hints: ["Recall that an implication and its contrapositive have identical truth tables."],
    finalRemark: "This proves that any implication implies its contrapositive, and vice versa.",
    marks: 1
  },
  {
    id: 12,
    type: "direct",
    questionText: "Show that (P ⇒ Q) ⇒ (¬P ⇒ ¬Q) is not a tautology.",
    correctAnswer: "It is false when P false and Q true.",
    steps: [
      { step: 1, action: "Consider truth assignment", expression: "P = 0, Q = 1", law: "Counterexample" },
      { step: 2, action: "Compute P⇒Q", expression: "0⇒1 = 1", law: "Implication" },
      { step: 3, action: "Compute ¬P⇒¬Q", expression: "¬0⇒¬1 = 1⇒0 = 0", law: "Implication" },
      { step: 4, action: "Then (P⇒Q) ⇒ (¬P⇒¬Q)", expression: "1 ⇒ 0 = 0", law: "Implication" }
    ],
    truthTable: {
      headers: ["P", "Q", "P⇒Q", "¬P", "¬Q", "¬P⇒¬Q", "(P⇒Q)⇒(¬P⇒¬Q)"],
      rows: [
        [0,0,1,1,1,1,1],
        [0,1,1,1,0,0,0],
        [1,0,0,0,1,1,1],
        [1,1,1,0,0,1,1]
      ]
    },
    explanation: "The statement is false when P is false and Q is true, so it is not a tautology.",
    definitions: [
      { term: "Counterexample", pronunciation: "kown-ter-eg-zam-pul", definition: "An assignment that makes a statement false.", example: "P false, Q true makes the statement false." }
    ],
    hints: ["Look for a row where antecedent true and consequent false."],
    finalRemark: "The inverse of an implication is not logically equivalent to the original.",
    marks: 2
  },
  {
    id: 13,
    type: "mcq",
    questionText: "Which of the following is equivalent to P ⇔ Q?",
    options: ["(P ⇒ Q) ∧ (Q ⇒ P)", "(P ∧ Q) ∨ (¬P ∧ ¬Q)", "¬(P ⊕ Q)", "All of the above"],
    correctAnswer: "D",
    steps: [
      { step: 1, action: "Definition of biconditional", expression: "P⇔Q ≡ (P⇒Q)∧(Q⇒P)", law: "Definition" },
      { step: 2, action: "Expand", expression: "(¬P∨Q) ∧ (¬Q∨P) ≡ (P∧Q) ∨ (¬P∧¬Q)", law: "Distribution" },
      { step: 3, action: "Also P⇔Q ≡ ¬(P⊕Q)", expression: "Equivalence is opposite of XOR", law: "XOR definition" }
    ],
    explanation: "All three expressions represent the biconditional (true when both inputs are equal).",
    definitions: [
      { term: "Biconditional", pronunciation: "bye-kon-di-shun-ul", definition: "True when both sides have the same truth value." }
    ],
    hints: ["Write truth table for each and compare.", "Equivalence is the complement of XOR."],
    finalRemark: "These equivalent forms are useful in different contexts.",
    marks: 1
  },
  {
    id: 14,
    type: "simplify",
    questionText: "Simplify (P ⇒ Q) ∧ (P ⇒ ¬Q).",
    correctAnswer: "¬P",
    steps: [
      { step: 1, action: "Rewrite implications", expression: "(¬P ∨ Q) ∧ (¬P ∨ ¬Q)", law: "Implication law" },
      { step: 2, action: "Factor ¬P", expression: "¬P ∨ (Q ∧ ¬Q)", law: "Distributive law" },
      { step: 3, action: "Simplify (Q ∧ ¬Q)", expression: "¬P ∨ 0 = ¬P", law: "Complement law" }
    ],
    explanation: "If P implies both Q and ¬Q, then P must be false.",
    definitions: [
      { term: "Reductio ad absurdum", pronunciation: "re-duk-tee-o ad ab-sur-dum", definition: "If a premise leads to a contradiction, the premise must be false." }
    ],
    hints: ["Use implication law to replace ⇒ with OR.", "Factor out ¬P."],
    finalRemark: "This is the logical principle of proof by contradiction.",
    marks: 2
  },
  {
    id: 15,
    type: "mcq",
    questionText: "The statement (P ∧ Q) ⇒ P is:",
    options: ["Tautology", "Contradiction", "Contingent", "None"],
    correctAnswer: "A",
    steps: [
      { step: 1, action: "Check truth table", expression: "When P∧Q true, P true; when false, implication true", law: "Truth table" }
    ],
    truthTable: {
      headers: ["P", "Q", "P∧Q", "(P∧Q)⇒P"],
      rows: [
        [0,0,0,1],
        [0,1,0,1],
        [1,0,0,1],
        [1,1,1,1]
      ]
    },
    explanation: "The consequent is always true when the antecedent is true, so the implication is a tautology.",
    definitions: [
      { term: "Tautology", pronunciation: "taw-taw-luh-jee", definition: "True for all truth assignments." }
    ],
    hints: ["If antecedent is true, both P and Q are true, so P is true."],
    finalRemark: "This is a classic example of a tautology.",
    marks: 1
  },
  {
    id: 16,
    type: "direct",
    questionText: "Write the inverse of 'If you study, you will pass.'",
    correctAnswer: "If you do not study, you will not pass.",
    steps: [
      { step: 1, action: "Identify P and Q", expression: "P = 'you study', Q = 'you pass'", law: "Given" },
      { step: 2, action: "Inverse formula", expression: "¬P ⇒ ¬Q", law: "Inverse" },
      { step: 3, action: "Translate", expression: "If you do not study, then you will not pass.", law: "Substitution" }
    ],
    explanation: "The inverse negates both hypothesis and conclusion.",
    definitions: [
      { term: "Inverse", pronunciation: "in-vurs", definition: "¬P ⇒ ¬Q", example: "Original: If P then Q → Inverse: If not P then not Q." }
    ],
    hints: ["Don't confuse inverse with converse or contrapositive."],
    finalRemark: "Inverse is not logically equivalent to the original.",
    marks: 1
  },
  {
    id: 17,
    type: "mcq",
    questionText: "Which of the following is logically equivalent to ¬(P ∨ Q)?",
    options: ["¬P ∨ ¬Q", "¬P ∧ ¬Q", "P ∨ Q", "P ∧ Q"],
    correctAnswer: "B",
    steps: [
      { step: 1, action: "Apply De Morgan", expression: "¬(P ∨ Q) ≡ ¬P ∧ ¬Q", law: "De Morgan's law" }
    ],
    explanation: "De Morgan's law: negation of OR is AND of negations.",
    definitions: [
      { term: "De Morgan's Law", pronunciation: "dee mor-ganz law", definition: "¬(P ∨ Q) ≡ ¬P ∧ ¬Q" }
    ],
    hints: ["Think: 'not (P or Q)' means 'not P and not Q'."],
    finalRemark: "This is one of the most used equivalences in logic.",
    marks: 1
  },
  {
    id: 18,
    type: "simplify",
    questionText: "Simplify (P ∨ Q) ∧ (¬P ∨ Q).",
    correctAnswer: "Q",
    steps: [
      { step: 1, action: "Factor Q", expression: "Q ∨ (P ∧ ¬P)", law: "Distributive law" },
      { step: 2, action: "Simplify (P ∧ ¬P)", expression: "Q ∨ 0 = Q", law: "Complement law" }
    ],
    explanation: "The expression reduces to Q because P and ¬P cancel.",
    definitions: [
      { term: "Distributive law", pronunciation: "di-strib-yoo-tiv law", definition: "A ∨ (B ∧ C) ≡ (A ∨ B) ∧ (A ∨ C)" }
    ],
    hints: ["Factor Q out of both terms using distribution.", "P ∧ ¬P = 0."],
    finalRemark: "This is a common simplification in Boolean algebra.",
    marks: 2
  },
  {
    id: 19,
    type: "mcq",
    questionText: "If P ⇒ Q is true, which of the following must be true?",
    options: ["¬P ⇒ ¬Q", "¬Q ⇒ ¬P", "Q ⇒ P", "None"],
    correctAnswer: "B",
    steps: [
      { step: 1, action: "Recall contrapositive", expression: "P ⇒ Q ≡ ¬Q ⇒ ¬P", law: "Logical equivalence" }
    ],
    explanation: "Only the contrapositive is guaranteed true when the original implication is true.",
    definitions: [
      { term: "Contrapositive", pronunciation: "kon-truh-poz-i-tiv", definition: "¬Q ⇒ ¬P is equivalent to P ⇒ Q." }
    ],
    hints: ["Converse and inverse are not logically equivalent to the original."],
    finalRemark: "In logical reasoning, we often use contrapositive to prove statements.",
    marks: 1
  },
  {
    id: 20,
    type: "direct",
    questionText: "Construct the truth table for (P ⊕ Q) ⊕ P.",
    correctAnswer: "Result is Q",
    steps: [
      { step: 1, action: "List all inputs", expression: "P, Q ∈ {0,1}", law: "Truth table" },
      { step: 2, action: "Compute P⊕Q", expression: "XOR", law: "XOR definition" },
      { step: 3, action: "Compute (P⊕Q)⊕P", expression: "XOR again", law: "XOR associativity" }
    ],
    truthTable: {
      headers: ["P", "Q", "P⊕Q", "(P⊕Q)⊕P"],
      rows: [
        [0,0,0,0],
        [0,1,1,1],
        [1,0,1,0],
        [1,1,0,1]
      ]
    },
    explanation: "(P ⊕ Q) ⊕ P = Q because XOR is associative and P ⊕ P = 0.",
    definitions: [
      { term: "XOR", pronunciation: "ex-or", definition: "True when inputs differ.", example: "1⊕0=1, 1⊕1=0." }
    ],
    hints: ["XOR is associative and commutative.", "A ⊕ A = 0, A ⊕ 0 = A."],
    finalRemark: "This property is used in cryptography and error detection.",
    marks: 2
  },

  // ======================================================================
  // ADVANCED SIMPLIFICATION & LAWS (Q21–Q30)
  // ======================================================================
  {
    id: 21,
    type: "simplify",
    questionText: "Simplify (P ∧ Q) ∨ (P ∧ ¬Q) ∨ (¬P ∧ ¬Q).",
    correctAnswer: "P ∨ ¬Q",
    steps: [
      { step: 1, action: "Original expression", expression: "(P∧Q) ∨ (P∧¬Q) ∨ (¬P∧¬Q)", law: "Given" },
      { step: 2, action: "Factor P from first two", expression: "P∧(Q∨¬Q) ∨ (¬P∧¬Q) = P ∨ (¬P∧¬Q)", law: "Distributive" },
      { step: 3, action: "Apply absorption", expression: "P ∨ ¬Q", law: "Absorption law" }
    ],
    truthTable: {
      headers: ["P", "Q", "P∧Q", "P∧¬Q", "¬P∧¬Q", "Expression", "P∨¬Q"],
      rows: [
        [0,0,0,0,1,1,1],
        [0,1,0,0,0,0,0],
        [1,0,0,1,0,1,1],
        [1,1,1,0,0,1,1]
      ]
    },
    explanation: "The expression simplifies to P ∨ ¬Q, which is the implication ¬P ⇒ ¬Q.",
    definitions: [
      { term: "Absorption Law", pronunciation: "ab-sorp-shun law", definition: "A ∨ (¬A ∧ B) = A ∨ B" }
    ],
    hints: ["Group terms to factor common variables.", "Use complement law: Q∨¬Q=1."],
    finalRemark: "This simplification is useful in reducing logic circuits.",
    marks: 2
  },
  {
    id: 22,
    type: "mcq",
    questionText: "The statement (P ∧ Q) ⇒ R is equivalent to:",
    options: ["P ⇒ (Q ⇒ R)", "(P ∧ Q) ⇒ R", "Q ⇒ (P ⇒ R)", "All of the above"],
    correctAnswer: "D",
    steps: [
      { step: 1, action: "Exportation law", expression: "(P∧Q)⇒R ≡ P⇒(Q⇒R)", law: "Exportation" },
      { step: 2, action: "Also Q⇒(P⇒R) is same", expression: "By commutativity of AND", law: "Logical equivalence" }
    ],
    explanation: "Exportation allows moving the conjunction to the left as nested implications.",
    definitions: [
      { term: "Exportation", pronunciation: "ek-spor-tay-shun", definition: "(P∧Q)⇒R ≡ P⇒(Q⇒R)", example: "If both P and Q imply R, then if P then (Q implies R)." }
    ],
    hints: ["Write truth table to verify.", "Use implication law: (P∧Q)⇒R ≡ ¬(P∧Q) ∨ R."],
    finalRemark: "Exportation is a powerful transformation in logical proofs.",
    marks: 1
  },
  {
    id: 23,
    type: "direct",
    questionText: "Show that (P ⇒ Q) ∨ (P ⇒ R) is equivalent to P ⇒ (Q ∨ R).",
    correctAnswer: "They are logically equivalent.",
    steps: [
      { step: 1, action: "Rewrite left side", expression: "(¬P∨Q) ∨ (¬P∨R) = ¬P ∨ Q ∨ ¬P ∨ R", law: "Implication law" },
      { step: 2, action: "Simplify", expression: "¬P ∨ (Q ∨ R)", law: "Idempotent law" },
      { step: 3, action: "Rewrite as implication", expression: "P ⇒ (Q ∨ R)", law: "Implication law" }
    ],
    explanation: "Both sides simplify to ¬P ∨ (Q ∨ R).",
    definitions: [
      { term: "Idempotent law", pronunciation: "eye-dem-po-tent law", definition: "A ∨ A = A, A ∧ A = A." }
    ],
    hints: ["Convert implications to OR form first.", "Combine like terms."],
    finalRemark: "This shows that the antecedent distributes over OR in the consequent.",
    marks: 2
  },
  {
    id: 24,
    type: "mcq",
    questionText: "Which law states that P ∨ (Q ∧ R) ≡ (P ∨ Q) ∧ (P ∨ R)?",
    options: ["Distributive law", "Associative law", "Commutative law", "Absorption law"],
    correctAnswer: "A",
    steps: [
      { step: 1, action: "Recall distributive law", expression: "OR distributes over AND", law: "Distributive law" }
    ],
    explanation: "This is the distributive law for OR over AND.",
    definitions: [
      { term: "Distributive law", pronunciation: "di-strib-yoo-tiv law", definition: "P ∨ (Q ∧ R) ≡ (P ∨ Q) ∧ (P ∨ R)" }
    ],
    hints: ["Analogous to multiplication over addition in arithmetic, but with OR and AND."],
    finalRemark: "Distributive laws are essential for Boolean algebra.",
    marks: 1
  },
  {
    id: 25,
    type: "simplify",
    questionText: "Simplify (P ⇒ Q) ∧ (¬P ⇒ Q).",
    correctAnswer: "Q",
    steps: [
      { step: 1, action: "Rewrite implications", expression: "(¬P∨Q) ∧ (P∨Q)", law: "Implication law" },
      { step: 2, action: "Factor Q", expression: "Q ∨ (¬P ∧ P)", law: "Distributive law" },
      { step: 3, action: "Simplify (¬P ∧ P)", expression: "Q ∨ 0 = Q", law: "Complement law" }
    ],
    explanation: "Both cases lead to Q regardless of P.",
    definitions: [
      { term: "Case analysis", pronunciation: "kase a-nal-i-sis", definition: "If Q follows from both P and ¬P, then Q is always true." }
    ],
    hints: ["Convert both implications to OR form.", "Factor Q."],
    finalRemark: "This is the principle of proof by cases.",
    marks: 2
  },
  {
    id: 26,
    type: "mcq",
    questionText: "The statement (P ∧ ¬P) ⇒ Q is:",
    options: ["Always true", "Always false", "True only when Q is true", "True only when P is true"],
    correctAnswer: "A",
    steps: [
      { step: 1, action: "Antecedent is P∧¬P", expression: "Always false (contradiction)", law: "Complement law" },
      { step: 2, action: "Implication with false antecedent", expression: "False ⇒ anything is true", law: "Implication definition" }
    ],
    explanation: "Any implication with a false antecedent is a tautology.",
    definitions: [
      { term: "Principle of explosion", pronunciation: "prin-si-pul of ex-plo-zhun", definition: "From a contradiction, anything follows." }
    ],
    hints: ["Recall truth table for implication: only false when antecedent true and consequent false."],
    finalRemark: "This is called 'ex falso quodlibet' (from falsehood, anything follows).",
    marks: 1
  },
  {
    id: 27,
    type: "direct",
    questionText: "Construct the truth table for (P ∨ Q) ∧ ¬(P ∧ Q).",
    correctAnswer: "This is XOR (P⊕Q)",
    steps: [
      { step: 1, action: "Compute P∨Q", expression: "OR", law: "Disjunction" },
      { step: 2, action: "Compute P∧Q", expression: "AND", law: "Conjunction" },
      { step: 3, action: "Negate (P∧Q)", expression: "¬(P∧Q)", law: "Negation" },
      { step: 4, action: "Combine with AND", expression: "(P∨Q) ∧ ¬(P∧Q)", law: "AND" }
    ],
    truthTable: {
      headers: ["P", "Q", "P∨Q", "P∧Q", "¬(P∧Q)", "(P∨Q)∧¬(P∧Q)"],
      rows: [
        [0,0,0,0,1,0],
        [0,1,1,0,1,1],
        [1,0,1,0,1,1],
        [1,1,1,1,0,0]
      ]
    },
    explanation: "The expression outputs 1 when exactly one input is true, which is XOR.",
    definitions: [
      { term: "XOR", pronunciation: "ex-or", definition: "True when inputs differ." }
    ],
    hints: ["Compare the last column with XOR truth table."],
    finalRemark: "XOR can be expressed as (P∨Q) ∧ ¬(P∧Q).",
    marks: 2
  },
  {
    id: 28,
    type: "simplify",
    questionText: "Simplify (P ∧ Q) ∨ (¬P ∧ Q) ∨ (P ∧ ¬Q).",
    correctAnswer: "P ∨ Q",
    steps: [
      { step: 1, action: "Original expression", expression: "(P∧Q) ∨ (¬P∧Q) ∨ (P∧¬Q)", law: "Given" },
      { step: 2, action: "Factor Q from first two", expression: "Q∧(P∨¬P) ∨ (P∧¬Q) = Q ∨ (P∧¬Q)", law: "Distributive" },
      { step: 3, action: "Apply absorption", expression: "Q ∨ P", law: "Absorption law" }
    ],
    explanation: "This is the OR of all minterms except ¬P∧¬Q, so it's P∨Q.",
    definitions: [
      { term: "Minterm", pronunciation: "min-term", definition: "A product term that includes each variable once." }
    ],
    hints: ["Notice the three terms cover all cases where at least one variable is true."],
    finalRemark: "This is the sum-of-products expression for OR.",
    marks: 2
  },
  {
    id: 29,
    type: "mcq",
    questionText: "If P is false and Q is true, then (P ⇒ Q) ∧ (Q ⇒ P) is:",
    options: ["True", "False"],
    correctAnswer: "B",
    steps: [
      { step: 1, action: "P=0, Q=1", expression: "P⇒Q = 0⇒1 = 1", law: "Implication" },
      { step: 2, action: "Q⇒P = 1⇒0 = 0", expression: "False", law: "Implication" },
      { step: 3, action: "Conjunction", expression: "1 ∧ 0 = 0", law: "AND" }
    ],
    explanation: "The biconditional is false when truth values differ.",
    definitions: [
      { term: "Biconditional", pronunciation: "bye-kon-di-shun-ul", definition: "True only when both sides have same truth value." }
    ],
    hints: ["Evaluate each implication separately, then AND."],
    finalRemark: "P⇔Q is false when P≠Q.",
    marks: 1
  },
  {
    id: 30,
    type: "direct",
    questionText: "Write the converse of 'If you are 18 or older, you can vote.'",
    correctAnswer: "If you can vote, then you are 18 or older.",
    steps: [
      { step: 1, action: "Identify P and Q", expression: "P = 'you are 18 or older', Q = 'you can vote'", law: "Given" },
      { step: 2, action: "Converse is Q ⇒ P", expression: "If you can vote, then you are 18 or older.", law: "Converse" }
    ],
    explanation: "Converse swaps the hypothesis and conclusion.",
    definitions: [
      { term: "Converse", pronunciation: "kon-vurs", definition: "Q ⇒ P" }
    ],
    hints: ["Swap the two parts without negating."],
    finalRemark: "The converse is not always true (e.g., in some countries you can vote at 16).",
    marks: 1
  },

  // ======================================================================
  // ADDITIONAL LAWS AND PROOFS (Q31–Q40)
  // ======================================================================
  {
    id: 31,
    type: "mcq",
    questionText: "Which of the following is an example of the associative law?",
    options: ["P ∨ Q ≡ Q ∨ P", "(P ∨ Q) ∨ R ≡ P ∨ (Q ∨ R)", "P ∨ (Q ∧ R) ≡ (P ∨ Q) ∧ (P ∨ R)", "P ∨ P ≡ P"],
    correctAnswer: "B",
    steps: [
      { step: 1, action: "Associative law definition", expression: "Grouping doesn't matter: (A⊕B)⊕C = A⊕(B⊕C)", law: "Associative" }
    ],
    explanation: "Associative law allows regrouping of operands.",
    definitions: [
      { term: "Associative law", pronunciation: "a-so-shee-uh-tiv law", definition: "(A ∨ B) ∨ C ≡ A ∨ (B ∨ C)" }
    ],
    hints: ["Look for parentheses shifting."],
    finalRemark: "Both AND and OR are associative.",
    marks: 1
  },
  {
    id: 32,
    type: "simplify",
    questionText: "Simplify ¬(¬P ∧ Q) ∧ ¬(P ∧ ¬Q).",
    correctAnswer: "P ⊕ Q",
    steps: [
      { step: 1, action: "Apply De Morgan", expression: "¬(¬P∧Q) = P ∨ ¬Q", law: "De Morgan" },
      { step: 2, action: "Apply De Morgan to second", expression: "¬(P∧¬Q) = ¬P ∨ Q", law: "De Morgan" },
      { step: 3, action: "Combine", expression: "(P ∨ ¬Q) ∧ (¬P ∨ Q)", law: "AND" },
      { step: 4, action: "This is XNOR", expression: "P ⇔ Q", law: "Biconditional" },
      { step: 5, action: "Negation of XNOR", expression: "¬(P⇔Q) = P⊕Q", law: "XOR" }
    ],
    explanation: "The expression simplifies to XOR (exclusive OR).",
    definitions: [
      { term: "XNOR", pronunciation: "ex-nor", definition: "True when inputs are equal." }
    ],
    hints: ["Apply De Morgan to each term, then simplify.", "Recognize (P∨¬Q)∧(¬P∨Q) as equivalence."],
    finalRemark: "XOR is the complement of equivalence.",
    marks: 2
  },
  {
    id: 33,
    type: "direct",
    questionText: "Prove that (P ⇒ Q) ∨ (R ⇒ Q) is equivalent to (P ∧ R) ⇒ Q.",
    correctAnswer: "Yes, they are equivalent.",
    steps: [
      { step: 1, action: "Rewrite left side", expression: "(¬P∨Q) ∨ (¬R∨Q) = ¬P ∨ ¬R ∨ Q", law: "Implication law" },
      { step: 2, action: "De Morgan on ¬P∨¬R", expression: "¬(P∧R) ∨ Q", law: "De Morgan" },
      { step: 3, action: "Rewrite as implication", expression: "(P∧R) ⇒ Q", law: "Implication law" }
    ],
    explanation: "Both sides simplify to ¬(P∧R) ∨ Q.",
    definitions: [
      { term: "De Morgan", pronunciation: "dee mor-gan", definition: "¬(P∧R) ≡ ¬P ∨ ¬R" }
    ],
    hints: ["Convert implications to OR form.", "Use De Morgan to combine antecedents."],
    finalRemark: "This shows how OR in antecedent can be moved inside implication.",
    marks: 2
  },
  {
    id: 34,
    type: "mcq",
    questionText: "The negation of P ⇒ Q is:",
    options: ["P ∧ ¬Q", "¬P ∧ Q", "P ∨ ¬Q", "¬P ∨ Q"],
    correctAnswer: "A",
    steps: [
      { step: 1, action: "Recall P⇒Q ≡ ¬P∨Q", expression: "Negate: ¬(¬P∨Q) = P ∧ ¬Q", law: "De Morgan" }
    ],
    explanation: "The only way to make an implication false is P true and Q false.",
    definitions: [
      { term: "Negation of implication", pronunciation: "ni-gay-shun", definition: "¬(P⇒Q) ≡ P ∧ ¬Q" }
    ],
    hints: ["Use the equivalence P⇒Q = ¬P∨Q, then negate."],
    finalRemark: "This is a common trick in logic puzzles.",
    marks: 1
  },
  {
    id: 35,
    type: "simplify",
    questionText: "Simplify (P ∨ Q) ∧ (¬P ∨ Q) ∧ (P ∨ ¬Q).",
    correctAnswer: "P ∧ Q",
    steps: [
      { step: 1, action: "First two factors", expression: "(P∨Q)∧(¬P∨Q) = Q ∨ (P∧¬P) = Q", law: "Distributive" },
      { step: 2, action: "Now Q ∧ (P ∨ ¬Q)", expression: "(Q∧P) ∨ (Q∧¬Q) = (Q∧P) ∨ 0 = P∧Q", law: "Distributive" }
    ],
    explanation: "The expression reduces to P∧Q.",
    definitions: [
      { term: "Distributive law", definition: "A ∧ (B ∨ C) = (A∧B) ∨ (A∧C)" }
    ],
    hints: ["Simplify pairwise.", "Use complement law: Q∧¬Q = 0."],
    finalRemark: "This is the product-of-sums form for AND.",
    marks: 2
  },
  {
    id: 36,
    type: "direct",
    questionText: "Construct the truth table for (P ⇒ Q) ∧ (¬P ⇒ R).",
    correctAnswer: "Truth table with 8 rows (3 variables)",
    steps: [
      { step: 1, action: "List all combinations", expression: "P, Q, R ∈ {0,1}", law: "Truth table" },
      { step: 2, action: "Compute P⇒Q", expression: "Implication", law: "Implication" },
      { step: 3, action: "Compute ¬P⇒R", expression: "Implication", law: "Implication" },
      { step: 4, action: "AND the two", expression: "Conjunction", law: "AND" }
    ],
    truthTable: {
      headers: ["P", "Q", "R", "P⇒Q", "¬P", "¬P⇒R", "(P⇒Q)∧(¬P⇒R)"],
      rows: [
        [0,0,0,1,1,0,0],
        [0,0,1,1,1,1,1],
        [0,1,0,1,1,0,0],
        [0,1,1,1,1,1,1],
        [1,0,0,0,0,1,0],
        [1,0,1,0,0,1,0],
        [1,1,0,1,0,1,1],
        [1,1,1,1,0,1,1]
      ]
    },
    explanation: "The expression is true when (if P then Q) and (if not P then R) both hold.",
    definitions: [
      { term: "Case analysis", definition: "Covers both P true and P false cases." }
    ],
    hints: ["Make sure to include all 8 rows."],
    finalRemark: "This truth table shows that the statement is equivalent to (P∧Q) ∨ (¬P∧R).",
    marks: 2
  },
  {
    id: 37,
    type: "mcq",
    questionText: "The statement (P ∨ Q) ⇒ R is equivalent to:",
    options: ["(P ⇒ R) ∧ (Q ⇒ R)", "(P ⇒ R) ∨ (Q ⇒ R)", "P ⇒ (Q ⇒ R)", "R ⇒ (P ∨ Q)"],
    correctAnswer: "A",
    steps: [
      { step: 1, action: "Rewrite left side", expression: "(P∨Q)⇒R ≡ ¬(P∨Q) ∨ R ≡ (¬P∧¬Q) ∨ R", law: "De Morgan" },
      { step: 2, action: "Rewrite right side", expression: "(P⇒R)∧(Q⇒R) ≡ (¬P∨R)∧(¬Q∨R) ≡ (¬P∧¬Q) ∨ R", law: "Distributive" }
    ],
    explanation: "Both sides simplify to (¬P∧¬Q) ∨ R.",
    definitions: [
      { term: "Exportation", definition: "(P∧Q)⇒R ≡ P⇒(Q⇒R)" }
    ],
    hints: ["Convert both sides to CNF or DNF and compare."],
    finalRemark: "This is the 'distributive' property of implication over OR in antecedent.",
    marks: 1
  },
    {
    id: 38,
    type: "simplify",
    questionText: "Simplify (P ⇒ Q) ⇒ (P ∧ Q).",
    correctAnswer: "P",
    steps: [
      { step: 1, action: "Rewrite outer implication", expression: "¬(P⇒Q) ∨ (P∧Q)", law: "Implication law" },
      { step: 2, action: "Negate inner implication", expression: "¬(¬P∨Q) ∨ (P∧Q) = (P∧¬Q) ∨ (P∧Q)", law: "De Morgan" },
      { step: 3, action: "Factor P", expression: "P ∧ (¬Q ∨ Q) = P ∧ 1 = P", law: "Distributive & Complement" }
    ],
    truthTable: {
      headers: ["P", "Q", "P⇒Q", "P∧Q", "(P⇒Q)⇒(P∧Q)"],
      rows: [
        [0,0,1,0,0],
        [0,1,1,0,0],
        [1,0,0,0,1],
        [1,1,1,1,1]
      ]
    },
    explanation: "The truth table shows the final column matches column P exactly (0,0,1,1). Hence the expression simplifies to P.",
    definitions: [
      { term: "Implication law", pronunciation: "im-pli-kay-shun law", definition: "P ⇒ Q ≡ ¬P ∨ Q" },
      { term: "De Morgan's law", definition: "¬(¬P ∨ Q) ≡ P ∧ ¬Q" },
      { term: "Complement law", definition: "¬Q ∨ Q ≡ 1" },
      { term: "Identity law", definition: "P ∧ 1 ≡ P" }
    ],
    hints: ["Convert the outer implication first.", "Use De Morgan to negate the inner implication.", "Factor P and simplify."],
    finalRemark: "The expression simplifies to P, not to P∧Q. This shows that (P⇒Q)⇒(P∧Q) is equivalent to P.",
    marks: 2
  },
  {
    id: 39,
    type: "mcq",
    questionText: "Which of the following is a tautology?",
    options: ["P ∨ Q", "P ∧ Q", "P ∨ ¬P", "P ⇒ ¬P"],
    correctAnswer: "C",
    steps: [
      { step: 1, action: "Check each", expression: "P∨¬P always true; others not always true.", law: "Truth table" }
    ],
    explanation: "Law of excluded middle: P ∨ ¬P is always true.",
    definitions: [
      { term: "Law of excluded middle", pronunciation: "eks-kloo-did mid-ul", definition: "For any proposition, either it is true or its negation is true." }
    ],
    hints: ["P ∨ ¬P is a classic tautology."],
    finalRemark: "This law is fundamental in classical logic.",
    marks: 1
  },
  {
    id: 40,
    type: "direct",
    questionText: "Write the dual of the expression (P ∧ Q) ∨ (R ∧ S).",
    correctAnswer: "(P ∨ Q) ∧ (R ∨ S)",
    steps: [
      { step: 1, action: "Duality principle", expression: "Swap ∧ with ∨, and 0 with 1 (no constants here)", law: "Duality" }
    ],
    explanation: "Dual replaces AND with OR and vice versa.",
    definitions: [
      { term: "Dual", pronunciation: "doo-ul", definition: "Expression obtained by interchanging AND and OR." }
    ],
    hints: ["Just swap all ∧ and ∨."],
    finalRemark: "Duality is used to derive new identities from existing ones.",
    marks: 1
  },

  // ======================================================================
  // APPLICATION & MIXED (Q41–Q50)
  // ======================================================================
  {
    id: 41,
    type: "mcq",
    questionText: "The statement (P ⇒ Q) ∧ (R ⇒ S) ∧ (P ∨ R) implies:",
    options: ["Q ∨ S", "Q ∧ S", "P ∨ R", "None"],
    correctAnswer: "A",
    steps: [
      { step: 1, action: "This is constructive dilemma", expression: "From P⇒Q, R⇒S, and P∨R, we can conclude Q∨S", law: "Constructive dilemma" }
    ],
    explanation: "Constructive dilemma: If P implies Q and R implies S, and either P or R is true, then either Q or S is true.",
    definitions: [
      { term: "Constructive dilemma", pronunciation: "kon-struk-tiv di-lem-uh", definition: "(P⇒Q)∧(R⇒S)∧(P∨R) ⇒ (Q∨S)" }
    ],
    hints: ["Think: If P true then Q; if R true then S; so at least one of Q,S true."],
    finalRemark: "This is a valid argument form in logic.",
    marks: 1
  },
  {
    id: 42,
    type: "simplify",
    questionText: "Simplify (P ∨ Q) ∧ (P ∨ ¬Q) ∧ (¬P ∨ Q).",
    correctAnswer: "P ∧ Q",
    steps: [
      { step: 1, action: "First two factors", expression: "(P∨Q)∧(P∨¬Q) = P ∨ (Q∧¬Q) = P", law: "Distributive" },
      { step: 2, action: "Then P ∧ (¬P ∨ Q)", expression: "(P∧¬P) ∨ (P∧Q) = 0 ∨ (P∧Q) = P∧Q", law: "Distributive" }
    ],
    explanation: "The expression reduces to P∧Q.",
    hints: ["Simplify pairwise using distributive law."],
    finalRemark: "This is the product-of-sums form for AND.",
    marks: 2
  },
  {
    id: 43,
    type: "mcq",
    questionText: "The statement (P ∧ Q) ∨ (¬P ∧ ¬Q) is equivalent to:",
    options: ["P ⇔ Q", "P ⊕ Q", "P ∨ Q", "P ∧ Q"],
    correctAnswer: "A",
    steps: [
      { step: 1, action: "Recognize as XNOR", expression: "(P∧Q) ∨ (¬P∧¬Q) ≡ P ⇔ Q", law: "Biconditional" }
    ],
    explanation: "This is the definition of biconditional (true when both same).",
    definitions: [
      { term: "XNOR", definition: "True when inputs equal." }
    ],
    hints: ["Write truth table to confirm."],
    finalRemark: "Biconditional can be expressed as AND of both true or both false.",
    marks: 1
  },
  {
    id: 44,
    type: "direct",
    questionText: "Prove that (P ∨ Q) ∧ (¬P ∨ R) ⇒ (Q ∨ R) is a tautology.",
    correctAnswer: "Yes, it's resolution rule.",
    steps: [
      { step: 1, action: "Assume (P∨Q) and (¬P∨R) true", expression: "If P true, then from second, R true; if P false, then from first, Q true.", law: "Case analysis" },
      { step: 2, action: "Thus Q∨R true", expression: "In either case", law: "Resolution" }
    ],
    truthTable: {
      headers: ["P","Q","R","P∨Q","¬P∨R","(P∨Q)∧(¬P∨R)","Q∨R","Implication"],
      rows: [
        [0,0,0,0,1,0,0,1],
        [0,0,1,0,1,0,1,1],
        [0,1,0,1,1,1,1,1],
        [0,1,1,1,1,1,1,1],
        [1,0,0,1,0,0,0,1],
        [1,0,1,1,1,1,1,1],
        [1,1,0,1,0,0,1,1],
        [1,1,1,1,1,1,1,1]
      ]
    },
    explanation: "Resolution is a fundamental rule in automated theorem proving.",
    definitions: [
      { term: "Resolution", pronunciation: "rez-uh-loo-shun", definition: "(P∨Q) ∧ (¬P∨R) ⇒ (Q∨R)" }
    ],
    hints: ["Check all 8 rows of truth table."],
    finalRemark: "Resolution forms the basis of the resolution proof system.",
    marks: 2
  },
  {
    id: 45,
    type: "simplify",
    questionText: "Simplify (P ⇒ Q) ⇒ (¬P ⇒ ¬Q).",
    correctAnswer: "¬P ∨ Q (i.e., P⇒Q)",
    steps: [
      { step: 1, action: "Rewrite as", expression: "(¬P∨Q) ⇒ (P∨¬Q)", law: "Implication law" },
      { step: 2, action: "Rewrite outer implication", expression: "¬(¬P∨Q) ∨ (P∨¬Q) = (P∧¬Q) ∨ (P∨¬Q)", law: "De Morgan" },
      { step: 3, action: "Simplify", expression: "(P∧¬Q) ∨ P ∨ ¬Q = P ∨ ¬Q", law: "Absorption" }
    ],
    explanation: "The expression simplifies to P⇒Q, meaning it's equivalent to itself.",
    hints: ["Use implication law and De Morgan."],
    finalRemark: "This shows that an implication implies its inverse? Actually no, it's not a tautology.",
    marks: 2
  },
  {
    id: 46,
    type: "mcq",
    questionText: "The statement (P ∨ Q) ∧ (¬P ∨ Q) is equivalent to:",
    options: ["P", "Q", "P ∨ Q", "P ∧ Q"],
    correctAnswer: "B",
    steps: [
      { step: 1, action: "Simplify", expression: "(P∨Q)∧(¬P∨Q) = Q ∨ (P∧¬P) = Q", law: "Distributive" }
    ],
    explanation: "The expression reduces to Q regardless of P.",
    hints: ["Factor Q out using distributive law."],
    finalRemark: "This is a common simplification in Boolean algebra.",
    marks: 1
  },
  {
    id: 47,
    type: "direct",
    questionText: "Write the contrapositive of: 'If a number is even, then its square is even.'",
    correctAnswer: "If the square of a number is odd, then the number is odd.",
    steps: [
      { step: 1, action: "P = 'number is even', Q = 'square is even'", expression: "Original: P⇒Q", law: "Given" },
      { step: 2, action: "Contrapositive: ¬Q⇒¬P", expression: "If square not even (odd), then number not even (odd)", law: "Contrapositive" }
    ],
    explanation: "Contrapositive swaps and negates.",
    hints: ["Negate both parts: 'square is odd' and 'number is odd'."],
    finalRemark: "This is a standard proof technique in number theory.",
    marks: 1
  },
  {
    id: 48,
    type: "mcq",
    questionText: "Which law states that P ∧ (Q ∨ R) ≡ (P ∧ Q) ∨ (P ∧ R)?",
    options: ["Distributive", "Associative", "Commutative", "Absorption"],
    correctAnswer: "A",
    steps: [
      { step: 1, action: "Definition", expression: "AND distributes over OR", law: "Distributive law" }
    ],
    explanation: "This is the distributive law for AND over OR.",
    hints: ["Recall algebra: a*(b+c) = a*b + a*c."],
    finalRemark: "It's analogous to multiplication over addition.",
    marks: 1
  },
  {
    id: 49,
    type: "simplify",
    questionText: "Simplify (P ∧ Q) ∨ (¬P ∧ R) ∨ (Q ∧ R).",
    correctAnswer: "(P ∧ Q) ∨ (¬P ∧ R)",
    steps: [
      { step: 1, action: "Consensus theorem", expression: "The term (Q∧R) is redundant", law: "Consensus theorem" }
    ],
    truthTable: {
      headers: ["P","Q","R","P∧Q","¬P∧R","Q∧R","Expression","Simplified"],
      rows: [
        [0,0,0,0,0,0,0,0],
        [0,0,1,0,1,0,1,1],
        [0,1,0,0,0,0,0,0],
        [0,1,1,0,1,1,1,1],
        [1,0,0,0,0,0,0,0],
        [1,0,1,0,0,0,0,0],
        [1,1,0,1,0,0,1,1],
        [1,1,1,1,0,1,1,1]
      ]
    },
    explanation: "The term Q∧R is absorbed by the other two.",
    definitions: [
      { term: "Consensus theorem", definition: "AB + A'C + BC = AB + A'C" }
    ],
    hints: ["Look for a term that is the consensus of the other two."],
    finalRemark: "Consensus theorem is useful in logic minimization.",
    marks: 2
  },
  {
    id: 50,
    type: "direct",
    questionText: "Construct the truth table for (P ⊕ Q) ⊕ (R ⊕ S).",
    correctAnswer: "Output is 1 when odd number of inputs are 1.",
    steps: [
      { step: 1, action: "XOR is associative", expression: "(P⊕Q)⊕(R⊕S) = P⊕Q⊕R⊕S", law: "Associativity" },
      { step: 2, action: "XOR is parity function", expression: "Output = parity (odd count of 1s)", law: "XOR property" }
    ],
    truthTable: {
      headers: ["P","Q","R","S","P⊕Q","R⊕S","(P⊕Q)⊕(R⊕S)"],
      rows: "16 rows; output is 1 when odd number of inputs are 1."
    },
    explanation: "XOR of multiple variables is the parity (odd/even) of the number of true inputs.",
    definitions: [
      { term: "Parity", pronunciation: "par-i-tee", definition: "Whether the number of 1s is odd or even." }
    ],
    hints: ["XOR is associative and commutative.", "A⊕A = 0, A⊕0 = A."],
    finalRemark: "This is the basis for error detection (parity bits).",
    marks: 2
  },
    // ======================================================================
  // ADDITIONAL QUESTIONS (Q51–Q60)
  // ======================================================================
  {
    id: 51,
    type: "mcq",
    questionText: "Which of the following is in Conjunctive Normal Form (CNF)?",
    options: ["(P ∨ Q) ∧ (¬P ∨ R)", "(P ∧ Q) ∨ (¬P ∧ R)", "¬(P ∧ Q)", "P ⊕ Q"],
    correctAnswer: "A",
    steps: [
      { step: 1, action: "CNF definition", expression: "Conjunction of disjunctions (clauses)", law: "Normal forms" },
      { step: 2, action: "Check each", expression: "A: conjunction of ORs; B: DNF; C: NAND; D: XOR", law: "Comparison" }
    ],
    explanation: "CNF is a conjunction of clauses, each clause being a disjunction of literals.",
    definitions: [
      { term: "Conjunctive Normal Form (CNF)", pronunciation: "kon-junk-tiv nor-mul form", definition: "AND of ORs", example: "(P ∨ Q) ∧ (¬P ∨ R)" }
    ],
    hints: ["Look for ∧ at top level, ∨ inside parentheses."],
    finalRemark: "CNF is widely used in automated theorem proving and SAT solvers.",
    marks: 1
  },
  {
    id: 52,
    type: "direct",
    questionText: "Convert (P ⇒ Q) ∧ (Q ⇒ R) into CNF.",
    correctAnswer: "(¬P ∨ Q) ∧ (¬Q ∨ R)",
    steps: [
      { step: 1, action: "Rewrite implications", expression: "P⇒Q ≡ ¬P∨Q, Q⇒R ≡ ¬Q∨R", law: "Implication law" },
      { step: 2, action: "Combine with AND", expression: "(¬P∨Q) ∧ (¬Q∨R)", law: "Conjunction" }
    ],
    explanation: "CNF is already achieved; each clause is a disjunction of literals.",
    definitions: [
      { term: "Literal", pronunciation: "lit-er-ul", definition: "A variable or its negation." }
    ],
    hints: ["Replace each implication with OR form.", "Keep the AND between them."],
    finalRemark: "This is a standard conversion; no distribution needed.",
    marks: 1
  },
  {
    id: 53,
    type: "mcq",
    questionText: "The set {¬, ∧} is functionally complete. Which of the following is also functionally complete?",
    options: ["{∨}", "{→}", "{¬, ∨}", "All of the above"],
    correctAnswer: "D",
    steps: [
      { step: 1, action: "Recall functional completeness", expression: "A set is complete if it can express all Boolean functions", law: "Definition" },
      { step: 2, action: "{∨} alone cannot express NOT", expression: "Not complete", law: "Counterexample" },
      { step: 3, action: "{→} alone: can express NOT (P→P = ¬P) and OR", expression: "Complete", law: "Known result" },
      { step: 4, action: "{¬, ∨} is complete", expression: "De Morgan gives AND", law: "Standard" }
    ],
    explanation: "{→} is complete because ¬P ≡ P→P and P∨Q ≡ (P→Q)→Q. {¬, ∨} is complete as ¬ and ∨ can simulate ∧. {∨} alone is not.",
    definitions: [
      { term: "Functional completeness", pronunciation: "funk-shun-ul kum-pleet-nis", definition: "Ability to express every truth function." }
    ],
    hints: ["Check if you can derive NOT and AND/OR from the set."],
    finalRemark: "NAND and NOR are single-operator complete sets as well.",
    marks: 1
  },
  {
    id: 54,
    type: "simplify",
    questionText: "Simplify (P ∨ Q) ∧ (¬P ∨ Q) ∧ (P ∨ ¬Q) ∧ (¬P ∨ ¬Q).",
    correctAnswer: "False (contradiction)",
    steps: [
      { step: 1, action: "Pair first two", expression: "(P∨Q)∧(¬P∨Q) = Q", law: "Distributive" },
      { step: 2, action: "Pair last two", expression: "(P∨¬Q)∧(¬P∨¬Q) = ¬Q", law: "Distributive" },
      { step: 3, action: "Combine", expression: "Q ∧ ¬Q = 0", law: "Complement" }
    ],
    explanation: "The four clauses together require Q and ¬Q simultaneously, impossible.",
    hints: ["Group clauses that share a variable.", "Use distributive law: (X∨Y)∧(¬X∨Y) = Y."],
    finalRemark: "This shows that the set of all maxterms over two variables is unsatisfiable.",
    marks: 2
  },
  {
    id: 55,
    type: "direct",
    questionText: "Determine if the following argument is valid: P ⇒ Q, ¬P ⇒ R, ¬Q ⇒ ¬R ∴ Q.",
    correctAnswer: "Valid",
    steps: [
      { step: 1, action: "Assume premises true", expression: "1: P⇒Q, 2: ¬P⇒R, 3: ¬Q⇒¬R", law: "Hypothetical" },
      { step: 2, action: "Contrapositive of 3", expression: "R ⇒ Q", law: "Contrapositive" },
      { step: 3, action: "From 2: ¬P⇒R and R⇒Q gives ¬P⇒Q", expression: "Hypothetical syllogism", law: "Transitivity" },
      { step: 4, action: "Now have P⇒Q and ¬P⇒Q", expression: "Therefore Q follows", law: "Proof by cases" }
    ],
    explanation: "Whether P is true or false, Q follows.",
    hints: ["Use contrapositive to combine implications.", "Apply proof by cases (P ∨ ¬P)."],
    finalRemark: "The argument is valid; conclusion Q is logically forced.",
    marks: 2
  },
  {
    id: 56,
    type: "mcq",
    questionText: "Which of the following is a logical consequence of (P ∧ Q) ⇒ R?",
    options: ["P ⇒ (Q ⇒ R)", "(P ⇒ R) ∨ (Q ⇒ R)", "Both A and B", "Neither"],
    correctAnswer: "C",
    steps: [
      { step: 1, action: "Exportation", expression: "(P∧Q)⇒R ≡ P⇒(Q⇒R)", law: "Exportation" },
      { step: 2, action: "Also (P⇒R)∨(Q⇒R) is weaker", expression: "It is always true? Not always, but it follows", law: "Logical consequence" }
    ],
    explanation: "By exportation, (P∧Q)⇒R is equivalent to P⇒(Q⇒R). Also, if (P∧Q)⇒R holds, then (P⇒R)∨(Q⇒R) holds as well (check truth table).",
    hints: ["Use equivalence transformations.", "Consider truth assignments where P true, Q false, R false."],
    finalRemark: "Both are valid consequences; the second is not equivalent but is entailed.",
    marks: 1
  },
  {
    id: 57,
    type: "simplify",
    questionText: "Simplify ¬(P ⇔ Q) to an expression using only ∧, ∨, ¬.",
    correctAnswer: "(P ∧ ¬Q) ∨ (¬P ∧ Q)",
    steps: [
      { step: 1, action: "Recall P⇔Q ≡ (P⇒Q)∧(Q⇒P)", expression: "Negate: ¬[(¬P∨Q)∧(¬Q∨P)]", law: "Definition" },
      { step: 2, action: "Apply De Morgan", expression: "¬(¬P∨Q) ∨ ¬(¬Q∨P) = (P∧¬Q) ∨ (Q∧¬P)", law: "De Morgan" }
    ],
    explanation: "Negation of biconditional is XOR (exclusive or).",
    definitions: [
      { term: "XOR", pronunciation: "ex-or", definition: "True when inputs differ." }
    ],
    hints: ["Use De Morgan on the CNF form of equivalence."],
    finalRemark: "This is the standard definition of XOR in terms of AND, OR, NOT.",
    marks: 1
  },
  {
    id: 58,
    type: "direct",
    questionText: "Construct the truth table for (P ⊕ Q) ∧ (P ⊕ R).",
    correctAnswer: "True when P is 0 and Q≠R, or P is 1 and Q=R.",
    steps: [
      { step: 1, action: "List all combos", expression: "P, Q, R ∈ {0,1}", law: "Truth table" },
      { step: 2, action: "Compute P⊕Q, P⊕R", expression: "XOR", law: "XOR" },
      { step: 3, action: "AND the two", expression: "Result column", law: "AND" }
    ],
    truthTable: {
      headers: ["P", "Q", "R", "P⊕Q", "P⊕R", "(P⊕Q)∧(P⊕R)"],
      rows: [
        [0,0,0,0,0,0],
        [0,0,1,0,1,0],
        [0,1,0,1,0,0],
        [0,1,1,1,1,1],
        [1,0,0,1,1,1],
        [1,0,1,1,0,0],
        [1,1,0,0,1,0],
        [1,1,1,0,0,0]
      ]
    },
    explanation: "The expression is true exactly when (P=0 and Q=R=1) or (P=1 and Q=R=0).",
    hints: ["Compute XOR column by column.", "AND is true only when both XORs are 1."],
    finalRemark: "This expression is equivalent to (¬P ∧ Q ∧ R) ∨ (P ∧ ¬Q ∧ ¬R).",
    marks: 2
  },
  {
    id: 59,
    type: "mcq",
    questionText: "The statement (P ∨ Q) ∧ (¬P ∨ R) is logically equivalent to:",
    options: ["(P ∧ R) ∨ (¬P ∧ Q)", "(P ∧ Q) ∨ (¬P ∧ R)", "(P ∨ R) ∧ (¬P ∨ Q)", "None of these"],
    correctAnswer: "B",
    steps: [
      { step: 1, action: "Distribute", expression: "(P∨Q)∧(¬P∨R) = (P∧¬P) ∨ (P∧R) ∨ (Q∧¬P) ∨ (Q∧R)", law: "Distributive" },
      { step: 2, action: "Simplify P∧¬P=0", expression: "(P∧R) ∨ (¬P∧Q) ∨ (Q∧R)", law: "Complement" },
      { step: 3, action: "Consensus theorem", expression: "(P∧R) ∨ (¬P∧Q) ∨ (Q∧R) = (P∧R) ∨ (¬P∧Q)", law: "Consensus" },
      { step: 4, action: "Reorder", expression: "(¬P∧Q) ∨ (P∧R)", law: "Commutative" }
    ],
    explanation: "After distribution and consensus, the expression simplifies to (¬P∧Q) ∨ (P∧R).",
    hints: ["Use distributive law and the consensus theorem.", "Check truth tables if unsure."],
    finalRemark: "This is the dual of the more common form (P∨R)∧(¬P∨Q).",
    marks: 1
  },
  {
    id: 60,
    type: "fill",
    questionText: "The statement that is true exactly when an odd number of its variables are true is called the ________ function.",
    correctAnswer: "parity",
    steps: [
      { step: 1, action: "Definition", expression: "Odd parity = XOR of all variables", law: "XOR property" }
    ],
    explanation: "XOR of multiple inputs yields 1 if the number of 1s is odd.",
    definitions: [
      { term: "Parity", pronunciation: "par-i-tee", definition: "Odd/even count of 1s in a binary string." }
    ],
    hints: ["Recall XOR of many variables is also known as the parity function."],
    finalRemark: "Parity checks are used in error detection codes.",
    marks: 1
  }
];