// questions1.js - 50 Assertion-Reason Questions for ISC Computer Science
// Enhanced: Every definition now includes an example.

export const assertionReasonQuestions = [
  // ======================================================================
  // SECTION 1: PROPOSITIONAL LOGIC BASICS (Q1-Q10)
  // ======================================================================

  // Q1: Contrapositive of ¬A ⇒ B
  {
    id: 1,
    assertion: "For proposition ¬A ⇒ B, its contrapositive is B ⇒ ¬A.",
    reason: "Contrapositive is the converse of inverse for any proposition.",
    correctOption: "D",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Assertion is false; Reason is true.",
      definitions: [
        { term: "Contrapositive", definition: "The contrapositive of P ⇒ Q is ¬Q ⇒ ¬P. It is logically equivalent to the original implication.", example: "For 'If it rains (P), then ground is wet (Q)', the contrapositive is 'If ground is not wet (¬Q), then it did not rain (¬P)'." },
        { term: "Converse", definition: "The converse of P ⇒ Q is Q ⇒ P.", example: "For 'If it rains, then ground is wet', the converse is 'If ground is wet, then it rains'." },
        { term: "Inverse", definition: "The inverse of P ⇒ Q is ¬P ⇒ ¬Q.", example: "For 'If it rains, then ground is wet', the inverse is 'If it does not rain, then ground is not wet'." },
        { term: "Antecedent", definition: "The 'if' part of an implication (P in P ⇒ Q).", example: "In 'If it rains, then ground is wet', 'it rains' is the antecedent." },
        { term: "Consequent", definition: "The 'then' part of an implication (Q in P ⇒ Q).", example: "In 'If it rains, then ground is wet', 'ground is wet' is the consequent." }
      ],
      steps: [
        { step: 1, action: "Identify the given implication", expression: "Given: ¬A ⇒ B", law: "Original statement" },
        { step: 2, action: "Recall the contrapositive rule", expression: "Contrapositive of P ⇒ Q is ¬Q ⇒ ¬P", law: "Logical equivalence" },
        { step: 3, action: "Substitute P = ¬A, Q = B", expression: "Contrapositive = ¬B ⇒ ¬(¬A) = ¬B ⇒ A", law: "Double negation (¬¬A = A)" },
        { step: 4, action: "Compare with the assertion", expression: "Assertion claims contrapositive is B ⇒ ¬A", law: "Comparison" },
        { step: 5, action: "Conclude about assertion", expression: "¬B ⇒ A ≠ B ⇒ ¬A, therefore Assertion is false", law: "Truth table verification" }
      ],
      truthTable: {
        headers: ["A", "B", "¬A", "¬A ⇒ B", "B ⇒ ¬A", "¬B ⇒ A"],
        rows: [
          [0, 0, 1, 0, 1, 0],
          [0, 1, 1, 1, 0, 1],
          [1, 0, 0, 1, 1, 1],
          [1, 1, 0, 1, 0, 1]
        ]
      },
      finalRemark: "Columns 4 (¬A⇒B) and 5 (B⇒¬A) are not identical, so the assertion is false. Reason is true: contrapositive is indeed the converse of inverse. Hence option D."
    },
    marks: 1
  },

  // Q2: (P ∧ Q) ⇒ P is a tautology
  {
    id: 2,
    assertion: "The statement (P ∧ Q) ⇒ P is a tautology.",
    reason: "In any implication, if the antecedent is true, the consequent must be true for the implication to be false.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both Assertion and Reason are true, and Reason correctly explains why the statement is a tautology.",
      definitions: [
        { term: "Tautology", definition: "A logical statement that is true for all possible truth values of its variables.", example: "P ∨ ¬P (Law of Excluded Middle) is always true – a tautology." },
        { term: "Implication (⇒)", definition: "P ⇒ Q is false only when P is true and Q is false; otherwise it is true.", example: "If P='2+2=4' (true) and Q='1=0' (false), then P⇒Q is false." },
        { term: "Antecedent", definition: "The 'if' part of an implication – the condition that must be satisfied.", example: "In (P∧Q)⇒P, the antecedent is (P∧Q)." },
        { term: "Consequent", definition: "The 'then' part of an implication – the result that follows.", example: "In (P∧Q)⇒P, the consequent is P." }
      ],
      steps: [
        { step: 1, action: "List all truth value combinations", expression: "P, Q ∈ {0,1} (4 rows)", law: "Truth table method" },
        { step: 2, action: "Compute the antecedent (P ∧ Q)", expression: "P AND Q", law: "Conjunction rule" },
        { step: 3, action: "Evaluate the implication (P∧Q) ⇒ P", expression: "Result is false only if (P∧Q)=1 and P=0", law: "Implication falsification condition" },
        { step: 4, action: "Check if any row makes it false", expression: "Row by row inspection", law: "Tautology check" }
      ],
      truthTable: {
        headers: ["P", "Q", "P ∧ Q", "(P∧Q) ⇒ P"],
        rows: [
          [0, 0, 0, 1],
          [0, 1, 0, 1],
          [1, 0, 0, 1],
          [1, 1, 1, 1]
        ]
      },
      finalRemark: "All outputs are 1, confirming (P∧Q)⇒P is a tautology. Reason correctly identifies the only falsifying condition (antecedent true, consequent false), which never occurs here. Hence option A."
    },
    marks: 1
  },

  // Q3: Negation of (P ∨ Q) is ¬P ∨ ¬Q
  {
    id: 3,
    assertion: "The negation of (P ∨ Q) is ¬P ∨ ¬Q.",
    reason: "De Morgan's law states that the negation of a disjunction is the conjunction of the negations.",
    correctOption: "D",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Assertion is false (incorrect application of De Morgan); Reason is true (correct statement of De Morgan's law).",
      definitions: [
        { term: "De Morgan's Laws", definition: "¬(P ∨ Q) ≡ ¬P ∧ ¬Q ; ¬(P ∧ Q) ≡ ¬P ∨ ¬Q", example: "¬(A ∨ B) = ¬A ∧ ¬B ; ¬(A ∧ B) = ¬A ∨ ¬B" },
        { term: "Negation", definition: "Logical NOT operator; flips truth value (0→1, 1→0).", example: "¬(True) = False, ¬(False) = True" },
        { term: "Disjunction (∨)", definition: "Logical OR – true if at least one operand is true.", example: "True ∨ False = True ; False ∨ False = False" },
        { term: "Conjunction (∧)", definition: "Logical AND – true only if both operands are true.", example: "True ∧ True = True ; True ∧ False = False" }
      ],
      steps: [
        { step: 1, action: "Recall correct De Morgan law for OR", expression: "¬(P ∨ Q) ≡ ¬P ∧ ¬Q", law: "De Morgan's Law" },
        { step: 2, action: "Compare with the assertion", expression: "Assertion claims ¬(P ∨ Q) ≡ ¬P ∨ ¬Q", law: "Comparison" },
        { step: 3, action: "Construct truth table to verify", expression: "Compare columns for ¬(P∨Q) and ¬P∨¬Q", law: "Truth table method" }
      ],
      truthTable: {
        headers: ["P", "Q", "P∨Q", "¬(P∨Q)", "¬P", "¬Q", "¬P ∨ ¬Q"],
        rows: [
          [0, 0, 0, 1, 1, 1, 1],
          [0, 1, 1, 0, 1, 0, 1],
          [1, 0, 1, 0, 0, 1, 1],
          [1, 1, 1, 0, 0, 0, 0]
        ]
      },
      finalRemark: "Columns 4 (¬(P∨Q)) and 7 (¬P∨¬Q) differ in rows 1 and 2 (0 vs 1), so assertion is false. Reason correctly states De Morgan's law, hence true. Option D is correct."
    },
    marks: 1
  },

  // Q4: Converse of implication
  {
    id: 4,
    assertion: "The converse of 'If it rains, then the ground is wet' is 'If the ground is wet, then it rains'.",
    reason: "The converse of P ⇒ Q is Q ⇒ P.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason provides the exact definition that matches the assertion.",
      definitions: [
        { term: "Converse", definition: "The converse of an implication P ⇒ Q is Q ⇒ P (swap hypothesis and conclusion).", example: "For 'If it rains, then ground is wet', converse = 'If ground is wet, then it rains'." },
        { term: "Inverse", definition: "The inverse of P ⇒ Q is ¬P ⇒ ¬Q (negate both).", example: "For the same statement, inverse = 'If it does not rain, then ground is not wet'." },
        { term: "Contrapositive", definition: "The contrapositive of P ⇒ Q is ¬Q ⇒ ¬P (swap and negate).", example: "Contrapositive = 'If ground is not wet, then it did not rain'." },
        { term: "Antecedent", definition: "The 'if' part – the condition (here: 'it rains').", example: "In the original, antecedent = 'it rains'." },
        { term: "Consequent", definition: "The 'then' part – the result (here: 'ground is wet').", example: "In the original, consequent = 'ground is wet'." }
      ],
      steps: [
        { step: 1, action: "Identify P and Q from the given statement", expression: "P = 'it rains', Q = 'ground is wet'", law: "Given statement" },
        { step: 2, action: "Write the original implication", expression: "P ⇒ Q: 'If it rains then ground is wet'", law: "Original" },
        { step: 3, action: "Apply converse definition", expression: "Converse = Q ⇒ P", law: "Definition of converse" },
        { step: 4, action: "Translate back to English", expression: "'If ground is wet then it rains'", law: "Substitution" },
        { step: 5, action: "Compare with assertion", expression: "Exact match", law: "Verification" }
      ],
      truthTable: {
        headers: ["P (rain)", "Q (wet)", "P⇒Q", "Converse Q⇒P"],
        rows: [
          [0, 0, 1, 1],
          [0, 1, 1, 0],
          [1, 0, 0, 1],
          [1, 1, 1, 1]
        ]
      },
      finalRemark: "The converse is correctly formed as Q⇒P. Reason gives the exact definition, so option A is correct."
    },
    marks: 1
  },

  // Q5: (P ⇒ Q) ∨ (Q ⇒ P) is a tautology
  {
    id: 5,
    assertion: "The statement (P ⇒ Q) ∨ (Q ⇒ P) is a tautology.",
    reason: "In propositional logic, at least one of the two implications P→Q or Q→P is always true.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains why the disjunction is always true (tautology).",
      definitions: [
        { term: "Tautology", definition: "A statement that evaluates to true for every assignment of truth values to its variables.", example: "(P⇒Q) ∨ (Q⇒P) is a tautology – try P=True, Q=False: (F)∨(T)=T." },
        { term: "Implication (⇒)", definition: "False only when antecedent is true and consequent is false.", example: "True ⇒ False = False; all other cases true." }
      ],
      steps: [
        { step: 1, action: "List all four possible truth assignments", expression: "(P,Q) = (0,0), (0,1), (1,0), (1,1)", law: "Truth table enumeration" },
        { step: 2, action: "Compute P⇒Q for each row", expression: "False only when P=1 and Q=0", law: "Implication rule" },
        { step: 3, action: "Compute Q⇒P for each row", expression: "False only when Q=1 and P=0", law: "Implication rule" },
        { step: 4, action: "Take the OR of the two implications", expression: "(P⇒Q) ∨ (Q⇒P)", law: "Logical OR" },
        { step: 5, action: "Check if result is always 1", expression: "All rows yield 1", law: "Tautology test" }
      ],
      truthTable: {
        headers: ["P", "Q", "P⇒Q", "Q⇒P", "(P⇒Q) ∨ (Q⇒P)"],
        rows: [
          [0, 0, 1, 1, 1],
          [0, 1, 1, 0, 1],
          [1, 0, 0, 1, 1],
          [1, 1, 1, 1, 1]
        ]
      },
      finalRemark: "The last column is all 1s, confirming tautology. Reason correctly notes that at least one implication holds in every case. Hence option A."
    },
    marks: 1
  },

  // Q6: Inverse of an implication
  {
    id: 6,
    assertion: "The inverse of 'If it rains, then the ground is wet' is 'If it does not rain, then the ground is not wet'.",
    reason: "The inverse of P ⇒ Q is ¬P ⇒ ¬Q.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both Assertion and Reason are true; Reason correctly defines inverse.",
      definitions: [
        { term: "Inverse", definition: "The inverse of an implication P ⇒ Q is ¬P ⇒ ¬Q (negating both hypothesis and conclusion).", example: "For 'If it rains, then ground is wet', inverse = 'If it does not rain, then ground is not wet'." }
      ],
      steps: [
        { step: 1, action: "Identify P and Q", expression: "P = 'it rains', Q = 'ground is wet'", law: "Given" },
        { step: 2, action: "Original implication", expression: "P ⇒ Q", law: "Original" },
        { step: 3, action: "Negate both sides for inverse", expression: "¬P ⇒ ¬Q", law: "Definition of inverse" },
        { step: 4, action: "Translate to English", expression: "'If it does not rain, then the ground is not wet'", law: "Substitution" },
        { step: 5, action: "Match with assertion", expression: "Exact match", law: "Verification" }
      ],
      truthTable: {
        headers: ["P", "Q", "P⇒Q", "¬P", "¬Q", "¬P⇒¬Q"],
        rows: [
          [0, 0, 1, 1, 1, 1],
          [0, 1, 1, 1, 0, 0],
          [1, 0, 0, 0, 1, 1],
          [1, 1, 1, 0, 0, 1]
        ]
      },
      finalRemark: "The inverse is correctly formed as ¬P⇒¬Q. Reason gives the exact definition, so option A is correct."
    },
    marks: 1
  },

  // Q7: P ∨ ¬P is a tautology
  {
    id: 7,
    assertion: "The statement P ∨ ¬P (Law of Excluded Middle) is a tautology.",
    reason: "A proposition and its negation cannot both be false simultaneously.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason explains why the Law of Excluded Middle always holds.",
      definitions: [
        { term: "Law of Excluded Middle", definition: "For any proposition P, either P is true or its negation ¬P is true.", example: "For P = 'It is raining', either it is raining or it is not raining – always true." },
        { term: "Tautology", definition: "A statement that is true under all possible truth assignments.", example: "P ∨ ¬P is true for P=True and P=False, hence a tautology." }
      ],
      steps: [
        { step: 1, action: "Consider possible truth values of P", expression: "P = 0 or P = 1", law: "Binary logic" },
        { step: 2, action: "Case 1: P = 1", expression: "P ∨ ¬P = 1 ∨ 0 = 1", law: "OR operation" },
        { step: 3, action: "Case 2: P = 0", expression: "P ∨ ¬P = 0 ∨ 1 = 1", law: "OR operation" },
        { step: 4, action: "Conclusion", expression: "Always true, hence tautology", law: "Definition of tautology" }
      ],
      truthTable: {
        headers: ["P", "¬P", "P ∨ ¬P"],
        rows: [
          [0, 1, 1],
          [1, 0, 1]
        ]
      },
      finalRemark: "The truth table shows P∨¬P is always 1. Reason correctly states that P and ¬P cannot both be false, making their OR always true. Hence option A."
    },
    marks: 1
  },

  // Q8: P ∧ ¬P is a contradiction
  {
    id: 8,
    assertion: "The statement P ∧ ¬P (Law of Contradiction) is a contradiction.",
    reason: "A proposition and its negation cannot both be true simultaneously.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason explains why P∧¬P is always false.",
      definitions: [
        { term: "Contradiction", definition: "A statement that is false under all possible truth assignments.", example: "P ∧ ¬P is always false – cannot be true." },
        { term: "Law of Contradiction", definition: "A proposition and its negation cannot both be true at the same time.", example: "It cannot be both raining and not raining simultaneously." }
      ],
      steps: [
        { step: 1, action: "Consider possible truth values of P", expression: "P = 0 or P = 1", law: "Binary logic" },
        { step: 2, action: "Case 1: P = 1", expression: "P ∧ ¬P = 1 ∧ 0 = 0", law: "AND operation" },
        { step: 3, action: "Case 2: P = 0", expression: "P ∧ ¬P = 0 ∧ 1 = 0", law: "AND operation" },
        { step: 4, action: "Conclusion", expression: "Always false, hence contradiction", law: "Definition of contradiction" }
      ],
      truthTable: {
        headers: ["P", "¬P", "P ∧ ¬P"],
        rows: [
          [0, 1, 0],
          [1, 0, 0]
        ]
      },
      finalRemark: "The truth table shows P∧¬P is always 0. Reason correctly states that P and ¬P cannot both be true, making their AND always false. Hence option A."
    },
    marks: 1
  },

  // Q9: P ⇒ (Q ⇒ P) is a tautology
  {
    id: 9,
    assertion: "The statement P ⇒ (Q ⇒ P) is a tautology.",
    reason: "If P is true, then any implication with P as consequent is true regardless of the antecedent.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains the tautology.",
      definitions: [
        { term: "Tautology", definition: "A statement true for all truth assignments.", example: "P ⇒ (Q ⇒ P) – try P=False: False⇒anything = True; P=True: True⇒(Q⇒True)=True⇒True=True." },
        { term: "Implication", definition: "False only when antecedent true and consequent false.", example: "True⇒False is the only false case." }
      ],
      steps: [
        { step: 1, action: "Construct truth table", expression: "Evaluate P ⇒ (Q ⇒ P)", law: "Truth table method" },
        { step: 2, action: "Note that when P=1", expression: "Q⇒P is always 1, so 1⇒1 = 1", law: "Implication rule" },
        { step: 3, action: "When P=0", expression: "Q⇒0 = ¬Q, so 0⇒¬Q = 1", law: "Implication with false antecedent" },
        { step: 4, action: "Conclusion", expression: "All rows yield 1", law: "Tautology confirmed" }
      ],
      truthTable: {
        headers: ["P", "Q", "Q⇒P", "P ⇒ (Q⇒P)"],
        rows: [
          [0, 0, 1, 1],
          [0, 1, 0, 1],
          [1, 0, 1, 1],
          [1, 1, 1, 1]
        ]
      },
      finalRemark: "Truth table confirms tautology. Reason correctly explains: when P is true, Q⇒P is true; when P is false, implication with false antecedent is true. Hence option A."
    },
    marks: 1
  },

  // Q10: P ⇒ Q is logically equivalent to ¬P ∨ Q
  {
    id: 10,
    assertion: "The implication P ⇒ Q is logically equivalent to ¬P ∨ Q.",
    reason: "An implication is false only when P is true and Q is false; this matches the condition for ¬P ∨ Q to be false.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains the logical equivalence.",
      definitions: [
        { term: "Logical Equivalence", definition: "Two statements are logically equivalent if they have identical truth values for all inputs.", example: "P⇒Q and ¬P∨Q have identical truth tables, so they are equivalent." },
        { term: "Implication (P⇒Q)", definition: "False only when P=1 and Q=0.", example: "If P='2+2=4' (true) and Q='1=0' (false), then P⇒Q is false." }
      ],
      steps: [
        { step: 1, action: "Construct truth table", expression: "Compare P⇒Q and ¬P∨Q", law: "Truth table method" },
        { step: 2, action: "Note both are false only when", expression: "P=1, Q=0", law: "Falsification condition" },
        { step: 3, action: "All other combinations", expression: "Both evaluate to 1", law: "Truth table verification" },
        { step: 4, action: "Conclusion", expression: "Columns identical", law: "Logical equivalence confirmed" }
      ],
      truthTable: {
        headers: ["P", "Q", "P⇒Q", "¬P", "¬P ∨ Q"],
        rows: [
          [0, 0, 1, 1, 1],
          [0, 1, 1, 1, 1],
          [1, 0, 0, 0, 0],
          [1, 1, 1, 0, 1]
        ]
      },
      finalRemark: "Truth table shows P⇒Q and ¬P∨Q have identical truth values. Reason correctly identifies the falsification condition. Hence option A."
    },
    marks: 1
  },

  // ======================================================================
  // SECTION 2: BOOLEAN ALGEBRA LAWS & THEOREMS (Q11-Q25)
  // ======================================================================

  // Q11: Absorption Law - First form
  {
    id: 11,
    assertion: "The Boolean expression A + (A·B) simplifies to A.",
    reason: "Absorption law states that A + (A·B) = A.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly states the Absorption law.",
      definitions: [
        { term: "Absorption Law", definition: "A + (A·B) = A and A·(A + B) = A", example: "Let A=1, B=0: 1+(1·0)=1+0=1 which equals A=1." },
        { term: "Redundancy", definition: "The term A·B is redundant as A already covers all cases.", example: "If A is true, the expression is true regardless of B." }
      ],
      steps: [
        { step: 1, action: "Original expression", expression: "A + A·B", law: "Given" },
        { step: 2, action: "Factor A", expression: "A·(1 + B)", law: "Distributive law" },
        { step: 3, action: "Apply null law", expression: "1 + B = 1", law: "Null law (1 + X = 1)" },
        { step: 4, action: "Simplify", expression: "A·1 = A", law: "Identity law" },
        { step: 5, action: "Conclusion", expression: "A + A·B = A", law: "Absorption law verified" }
      ],
      truthTable: {
        headers: ["A", "B", "A·B", "A + A·B"],
        rows: [
          [0, 0, 0, 0],
          [0, 1, 0, 0],
          [1, 0, 0, 1],
          [1, 1, 1, 1]
        ]
      },
      finalRemark: "Truth table shows A + A·B equals A for all inputs. Reason correctly states the Absorption law, so option A is correct."
    },
    marks: 1
  },

  // Q12: Absorption Law - Second form
  {
    id: 12,
    assertion: "The Boolean expression A·(A + B) simplifies to A.",
    reason: "Absorption law states that A·(A + B) = A.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly states the Absorption law.",
      definitions: [
        { term: "Absorption Law", definition: "A·(A + B) = A", example: "A=0,B=1: 0·(0+1)=0·1=0 = A; A=1,B=0: 1·(1+0)=1·1=1 = A." }
      ],
      steps: [
        { step: 1, action: "Original expression", expression: "A·(A + B)", law: "Given" },
        { step: 2, action: "Apply distributive law", expression: "A·A + A·B", law: "Distributive law" },
        { step: 3, action: "Simplify A·A", expression: "A + A·B", law: "Idempotent law (A·A = A)" },
        { step: 4, action: "Apply absorption", expression: "A", law: "Absorption law (A + A·B = A)" }
      ],
      truthTable: {
        headers: ["A", "B", "A+B", "A·(A+B)"],
        rows: [
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [1, 0, 1, 1],
          [1, 1, 1, 1]
        ]
      },
      finalRemark: "Truth table shows A·(A+B) equals A for all inputs. Hence option A."
    },
    marks: 1
  },

  // Q13: Distributive Law
  {
    id: 13,
    assertion: "The Boolean expression A·(B + C) equals A·B + A·C.",
    reason: "AND distributes over OR in Boolean algebra, similar to multiplication over addition in ordinary algebra.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains the Distributive law.",
      definitions: [
        { term: "Distributive Law", definition: "A·(B + C) = A·B + A·C", example: "For A=1,B=0,C=1: LHS=1·(0+1)=1, RHS=1·0+1·1=0+1=1." }
      ],
      steps: [
        { step: 1, action: "Construct truth table", expression: "Compare LHS and RHS", law: "Truth table method" },
        { step: 2, action: "Verify all rows", expression: "LHS and RHS identical", law: "Logical equivalence" },
        { step: 3, action: "Conclusion", expression: "Distributive law holds", law: "Boolean algebra" }
      ],
      truthTable: {
        headers: ["A", "B", "C", "B+C", "A·(B+C)", "A·B", "A·C", "A·B + A·C"],
        rows: [
          [0,0,0,0,0,0,0,0],
          [0,0,1,1,0,0,0,0],
          [0,1,0,1,0,0,0,0],
          [0,1,1,1,0,0,0,0],
          [1,0,0,0,0,0,0,0],
          [1,0,1,1,1,0,1,1],
          [1,1,0,1,1,1,0,1],
          [1,1,1,1,1,1,1,1]
        ]
      },
      finalRemark: "Truth table confirms A·(B+C) = A·B + A·C. Reason correctly identifies the analogy with ordinary algebra. Hence option A."
    },
    marks: 1
  },

  // Q14: Duality Principle
  {
    id: 14,
    assertion: "The dual of the Boolean expression A + (B·C) is A·(B + C).",
    reason: "The duality principle states that interchanging AND with OR and 0 with 1 yields the dual expression.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains the Duality principle.",
      definitions: [
        { term: "Duality Principle", definition: "Interchanging AND (·) with OR (+) and 0 with 1 in any Boolean expression yields its dual.", example: "Dual of A·(B+C) is A+(B·C)." }
      ],
      steps: [
        { step: 1, action: "Original expression", expression: "A + (B·C)", law: "Given" },
        { step: 2, action: "Replace + with ·", expression: "A · (B·C)", law: "Duality operation" },
        { step: 3, action: "Replace · with +", expression: "A·(B + C)", law: "Duality operation" },
        { step: 4, action: "Compare with assertion", expression: "Matches assertion", law: "Verification" }
      ],
      finalRemark: "The dual is correctly obtained as A·(B+C). Reason accurately describes the duality principle. Hence option A."
    },
    marks: 1
  },

  // Q15: Idempotent Law
  {
    id: 15,
    assertion: "The Boolean expression A + A simplifies to A.",
    reason: "Idempotent law states that A + A = A and A·A = A.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly states the Idempotent law.",
      definitions: [
        { term: "Idempotent Law", definition: "A + A = A and A·A = A", example: "For A=1: 1+1=1; A=0: 0+0=0." }
      ],
      steps: [
        { step: 1, action: "Case A=0", expression: "0 + 0 = 0", law: "OR operation" },
        { step: 2, action: "Case A=1", expression: "1 + 1 = 1", law: "OR operation" },
        { step: 3, action: "Conclusion", expression: "A + A = A for all A", law: "Idempotent law verified" }
      ],
      truthTable: {
        headers: ["A", "A + A"],
        rows: [
          [0, 0],
          [1, 1]
        ]
      },
      finalRemark: "Truth table confirms A+A = A. Reason correctly states the Idempotent law. Hence option A."
    },
    marks: 1
  },

  // Q16: Commutative Law for AND
  {
    id: 16,
    assertion: "The Boolean expression A·B equals B·A.",
    reason: "AND operation is commutative, meaning the order of operands does not affect the result.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains commutativity.",
      definitions: [
        { term: "Commutative Law", definition: "A·B = B·A and A + B = B + A", example: "For A=1,B=0: 1·0=0 and 0·1=0." }
      ],
      steps: [
        { step: 1, action: "Construct truth table", expression: "Compare A·B and B·A", law: "Truth table method" },
        { step: 2, action: "All rows identical", expression: "Both columns match", law: "Verification" },
        { step: 3, action: "Conclusion", expression: "AND is commutative", law: "Boolean algebra" }
      ],
      truthTable: {
        headers: ["A", "B", "A·B", "B·A"],
        rows: [
          [0, 0, 0, 0],
          [0, 1, 0, 0],
          [1, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      },
      finalRemark: "Truth table shows A·B = B·A. Reason correctly states commutativity. Hence option A."
    },
    marks: 1
  },

  // Q17: Involution Law (Double Negation)
  {
    id: 17,
    assertion: "The expression ¬(¬A) simplifies to A.",
    reason: "Involution law (Double Negation) states that complementing a variable twice returns the original variable.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly states the Involution law.",
      definitions: [
        { term: "Involution Law", definition: "¬(¬A) = A (Double Negation)", example: "If A=0, ¬0=1, ¬1=0 = A; if A=1, ¬1=0, ¬0=1 = A." }
      ],
      steps: [
        { step: 1, action: "Case A=0", expression: "¬(¬0) = ¬1 = 0", law: "Negation operation" },
        { step: 2, action: "Case A=1", expression: "¬(¬1) = ¬0 = 1", law: "Negation operation" },
        { step: 3, action: "Conclusion", expression: "¬(¬A) = A for all A", law: "Involution law verified" }
      ],
      truthTable: {
        headers: ["A", "¬A", "¬(¬A)"],
        rows: [
          [0, 1, 0],
          [1, 0, 1]
        ]
      },
      finalRemark: "Truth table confirms ¬(¬A) = A. Hence option A."
    },
    marks: 1
  },

  // Q18: Associative Law for OR
  {
    id: 18,
    assertion: "The Boolean expression (A + B) + C equals A + (B + C).",
    reason: "OR operation is associative, allowing regrouping without changing the result.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains associativity.",
      definitions: [
        { term: "Associative Law", definition: "(A + B) + C = A + (B + C)", example: "For A=0,B=0,C=1: (0+0)+1=1, 0+(0+1)=1." }
      ],
      steps: [
        { step: 1, action: "Construct truth table", expression: "Compare LHS and RHS", law: "Truth table method" },
        { step: 2, action: "All rows identical", expression: "Both columns match", law: "Verification" },
        { step: 3, action: "Conclusion", expression: "OR is associative", law: "Boolean algebra" }
      ],
      truthTable: {
        headers: ["A", "B", "C", "A+B", "(A+B)+C", "B+C", "A+(B+C)"],
        rows: [
          [0,0,0,0,0,0,0],
          [0,0,1,0,1,1,1],
          [0,1,0,1,1,1,1],
          [0,1,1,1,1,1,1],
          [1,0,0,1,1,0,1],
          [1,0,1,1,1,1,1],
          [1,1,0,1,1,1,1],
          [1,1,1,1,1,1,1]
        ]
      },
      finalRemark: "Truth table shows (A+B)+C = A+(B+C). Reason correctly explains associativity. Hence option A."
    },
    marks: 1
  },

  // Q19: Redundancy Law (Consensus Theorem)
  {
    id: 19,
    assertion: "The Boolean expression AB + A'C + BC simplifies to AB + A'C.",
    reason: "The term BC is redundant and can be eliminated by the Consensus Theorem.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly invokes the Consensus Theorem.",
      definitions: [
        { term: "Consensus Theorem", definition: "AB + A'C + BC = AB + A'C. The term BC is the consensus and is redundant.", example: "For A=0,B=1,C=1: AB=0, A'C=1, BC=1; sum=1; AB+A'C=1." }
      ],
      steps: [
        { step: 1, action: "Original expression", expression: "F = AB + A'C + BC", law: "Given" },
        { step: 2, action: "Add redundant term", expression: "AB + A'C + BC·(A + A')", law: "A + A' = 1" },
        { step: 3, action: "Expand", expression: "AB + A'C + ABC + A'BC", law: "Distributive" },
        { step: 4, action: "Group terms", expression: "AB(1 + C) + A'C(1 + B)", law: "Absorption" },
        { step: 5, action: "Simplify", expression: "AB + A'C", law: "Redundant term eliminated" }
      ],
      truthTable: {
        headers: ["A", "B", "C", "AB", "A'C", "BC", "AB+A'C+BC", "AB+A'C"],
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
      finalRemark: "Truth table shows AB + A'C + BC = AB + A'C. Reason correctly identifies the Consensus Theorem. Hence option A."
    },
    marks: 1
  },

  // Q20: Null Law for OR
  {
    id: 20,
    assertion: "The Boolean expression A + 1 simplifies to 1.",
    reason: "Null law (or Annulment law) states that any variable ORed with 1 always yields 1.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly states the Null law.",
      definitions: [
        { term: "Null Law (Annulment)", definition: "A + 1 = 1 and A·0 = 0", example: "For A=0: 0+1=1; A=1: 1+1=1." }
      ],
      steps: [
        { step: 1, action: "Case A=0", expression: "0 + 1 = 1", law: "OR operation" },
        { step: 2, action: "Case A=1", expression: "1 + 1 = 1", law: "OR operation" },
        { step: 3, action: "Conclusion", expression: "A + 1 = 1 for all A", law: "Null law verified" }
      ],
      truthTable: {
        headers: ["A", "A + 1"],
        rows: [
          [0, 1],
          [1, 1]
        ]
      },
      finalRemark: "Truth table confirms A+1 = 1. Hence option A."
    },
    marks: 1
  },

  // Q21: Complement Law
  {
    id: 21,
    assertion: "The Boolean expression A + A' simplifies to 1.",
    reason: "Complement law states that a variable ORed with its complement always equals 1.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly states the Complement law.",
      definitions: [
        { term: "Complement Law", definition: "A + A' = 1 and A·A' = 0", example: "For A=0: 0+1=1; A=1: 1+0=1." }
      ],
      steps: [
        { step: 1, action: "Case A=0", expression: "0 + 1 = 1", law: "OR operation" },
        { step: 2, action: "Case A=1", expression: "1 + 0 = 1", law: "OR operation" },
        { step: 3, action: "Conclusion", expression: "A + A' = 1 for all A", law: "Complement law verified" }
      ],
      truthTable: {
        headers: ["A", "A'", "A + A'"],
        rows: [
          [0, 1, 1],
          [1, 0, 1]
        ]
      },
      finalRemark: "Truth table confirms A + A' = 1. Hence option A."
    },
    marks: 1
  },

  // Q22: Identity Law for AND
  {
    id: 22,
    assertion: "The Boolean expression A·1 simplifies to A.",
    reason: "Identity law states that AND with 1 yields the original variable.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly states the Identity law.",
      definitions: [
        { term: "Identity Law", definition: "A·1 = A and A + 0 = A", example: "For A=0: 0·1=0; A=1: 1·1=1." }
      ],
      steps: [
        { step: 1, action: "Case A=0", expression: "0·1 = 0", law: "AND operation" },
        { step: 2, action: "Case A=1", expression: "1·1 = 1", law: "AND operation" },
        { step: 3, action: "Conclusion", expression: "A·1 = A for all A", law: "Identity law verified" }
      ],
      truthTable: {
        headers: ["A", "A·1"],
        rows: [
          [0, 0],
          [1, 1]
        ]
      },
      finalRemark: "Truth table confirms A·1 = A. Hence option A."
    },
    marks: 1
  },

  // Q23: De Morgan's First Theorem
  {
    id: 23,
    assertion: "The complement of (A + B) is A'·B'.",
    reason: "De Morgan's first theorem states that the complement of a sum equals the product of complements.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly states De Morgan's first theorem.",
      definitions: [
        { term: "De Morgan's First Theorem", definition: "(A + B)' = A'·B'", example: "For A=0,B=1: (0+1)'=1'=0, A'·B'=1·0=0." }
      ],
      steps: [
        { step: 1, action: "Construct truth table", expression: "Compare (A+B)' and A'·B'", law: "Truth table method" },
        { step: 2, action: "All rows identical", expression: "Both columns match", law: "Verification" },
        { step: 3, action: "Conclusion", expression: "(A+B)' = A'·B'", law: "De Morgan's theorem verified" }
      ],
      truthTable: {
        headers: ["A", "B", "A+B", "(A+B)'", "A'", "B'", "A'·B'"],
        rows: [
          [0,0,0,1,1,1,1],
          [0,1,1,0,1,0,0],
          [1,0,1,0,0,1,0],
          [1,1,1,0,0,0,0]
        ]
      },
      finalRemark: "Truth table confirms (A+B)' = A'·B'. Hence option A."
    },
    marks: 1
  },

  // Q24: De Morgan's Second Theorem
  {
    id: 24,
    assertion: "The complement of (A·B) is A' + B'.",
    reason: "De Morgan's second theorem states that the complement of a product equals the sum of complements.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly states De Morgan's second theorem.",
      definitions: [
        { term: "De Morgan's Second Theorem", definition: "(A·B)' = A' + B'", example: "For A=1,B=1: (1·1)'=1'=0, A'+B'=0+0=0." }
      ],
      steps: [
        { step: 1, action: "Construct truth table", expression: "Compare (A·B)' and A' + B'", law: "Truth table method" },
        { step: 2, action: "All rows identical", expression: "Both columns match", law: "Verification" },
        { step: 3, action: "Conclusion", expression: "(A·B)' = A' + B'", law: "De Morgan's theorem verified" }
      ],
      truthTable: {
        headers: ["A", "B", "A·B", "(A·B)'", "A'", "B'", "A' + B'"],
        rows: [
          [0,0,0,1,1,1,1],
          [0,1,0,1,1,0,1],
          [1,0,0,1,0,1,1],
          [1,1,1,0,0,0,0]
        ]
      },
      finalRemark: "Truth table confirms (A·B)' = A' + B'. Hence option A."
    },
    marks: 1
  },

  // Q25: Boolean expression reduction
  {
    id: 25,
    assertion: "The Boolean expression A + A'B simplifies to A + B.",
    reason: "This is a direct application of the Absorption law.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly identifies Absorption law.",
      definitions: [
        { term: "Absorption Law", definition: "A + A'B = A + B", example: "A=0,B=1: 0+1·1=1, A+B=1; A=1,B=0: 1+0=1, A+B=1." }
      ],
      steps: [
        { step: 1, action: "Original expression", expression: "A + A'B", law: "Given" },
        { step: 2, action: "Apply distributive law", expression: "(A + A')(A + B)", law: "Distributive law" },
        { step: 3, action: "Simplify A + A'", expression: "1·(A + B)", law: "Complement law" },
        { step: 4, action: "Simplify", expression: "A + B", law: "Identity law" }
      ],
      truthTable: {
        headers: ["A", "B", "A'", "A'B", "A + A'B", "A + B"],
        rows: [
          [0,0,1,0,0,0],
          [0,1,1,1,1,1],
          [1,0,0,0,1,1],
          [1,1,0,0,1,1]
        ]
      },
      finalRemark: "Truth table shows A + A'B = A + B. Hence option A."
    },
    marks: 1
  },

  // ======================================================================
  // SECTION 3: LOGIC GATES (Q26-Q35)
  // ======================================================================

  // Q26: NAND as Universal Gate
  {
    id: 26,
    assertion: "A NAND gate can be used to simulate the functions of basic gates NOT, AND, and OR.",
    reason: "NAND and NOR gates are universal gates.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains why NAND gates can simulate basic gates.",
      definitions: [
        { term: "Universal Gate", definition: "A gate that can be used to implement any Boolean function without using any other gate type.", example: "NAND and NOR are universal – you can build NOT, AND, OR, XOR, etc. using only NAND gates." },
        { term: "NAND Gate", definition: "A gate that outputs 0 only when both inputs are 1.", example: "Truth table: 00→1, 01→1, 10→1, 11→0." }
      ],
      steps: [
        { step: 1, action: "NOT using NAND", expression: "Connect both inputs together: NOT A = A NAND A", law: "NAND as NOT" },
        { step: 2, action: "AND using NAND", expression: "A AND B = (A NAND B)'", law: "NAND then NOT" },
        { step: 3, action: "OR using NAND", expression: "A OR B = (A' NAND B')", law: "NAND with complements" }
      ],
      truthTable: {
        headers: ["A", "B", "A NAND B", "NOT A (A NAND A)", "A AND B", "A OR B"],
        rows: [
          [0,0,1,1,0,0],
          [0,1,1,1,0,1],
          [1,0,1,0,0,1],
          [1,1,0,0,1,1]
        ]
      },
      finalRemark: "NAND gates can indeed simulate NOT, AND, and OR. Reason correctly states that NAND is universal. Hence option A."
    },
    marks: 1
  },

  // Q27: NOR as Universal Gate
  {
    id: 27,
    assertion: "A NOR gate can be used to simulate the functions of basic gates NOT, AND, and OR.",
    reason: "NAND and NOR gates are universal gates.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains why NOR gates can simulate basic gates.",
      definitions: [
        { term: "Universal Gate", definition: "A gate that can be used to implement any Boolean function without using any other gate type.", example: "NOR gates alone can build NOT, AND, OR, XOR, etc." },
        { term: "NOR Gate", definition: "A gate that outputs 1 only when both inputs are 0.", example: "Truth table: 00→1, 01→0, 10→0, 11→0." }
      ],
      steps: [
        { step: 1, action: "NOT using NOR", expression: "Connect both inputs together: NOT A = A NOR A", law: "NOR as NOT" },
        { step: 2, action: "OR using NOR", expression: "A OR B = (A NOR B)'", law: "NOR then NOT" },
        { step: 3, action: "AND using NOR", expression: "A AND B = (A' NOR B')", law: "NOR with complements" }
      ],
      truthTable: {
        headers: ["A", "B", "A NOR B", "NOT A (A NOR A)", "A OR B", "A AND B"],
        rows: [
          [0,0,1,1,0,0],
          [0,1,0,1,1,0],
          [1,0,0,0,1,0],
          [1,1,0,0,1,1]
        ]
      },
      finalRemark: "NOR gates can simulate NOT, OR, and AND. Reason correctly states that NOR is universal. Hence option A."
    },
    marks: 1
  },

  // Q28: XOR Gate Output
  {
    id: 28,
    assertion: "The XOR gate outputs 1 when the inputs are different.",
    reason: "XOR (exclusive OR) gives a true output when an odd number of inputs are true.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains XOR behavior.",
      definitions: [
        { term: "XOR Gate", definition: "Outputs 1 when inputs are different (odd number of 1s).", example: "0⊕0=0, 0⊕1=1, 1⊕0=1, 1⊕1=0." }
      ],
      steps: [
        { step: 1, action: "Construct truth table", expression: "A XOR B", law: "Truth table method" },
        { step: 2, action: "Observe output pattern", expression: "1 when A≠B, 0 when A=B", law: "XOR definition" },
        { step: 3, action: "Conclusion", expression: "XOR = A'B + AB'", law: "Boolean expression" }
      ],
      truthTable: {
        headers: ["A", "B", "A XOR B"],
        rows: [
          [0, 0, 0],
          [0, 1, 1],
          [1, 0, 1],
          [1, 1, 0]
        ]
      },
      finalRemark: "Truth table confirms XOR outputs 1 when inputs differ. Reason correctly describes XOR behavior. Hence option A."
    },
    marks: 1
  },

  // Q29: XNOR Gate Output
  {
    id: 29,
    assertion: "The XNOR gate outputs 1 when the inputs are equal.",
    reason: "XNOR (exclusive NOR) is the complement of XOR and outputs 1 when the number of true inputs is even.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains XNOR behavior.",
      definitions: [
        { term: "XNOR Gate", definition: "Outputs 1 when inputs are equal (even number of 1s).", example: "0⊙0=1, 0⊙1=0, 1⊙0=0, 1⊙1=1." }
      ],
      steps: [
        { step: 1, action: "Construct truth table", expression: "A XNOR B", law: "Truth table method" },
        { step: 2, action: "Observe output pattern", expression: "1 when A=B, 0 when A≠B", law: "XNOR definition" },
        { step: 3, action: "Conclusion", expression: "XNOR = AB + A'B'", law: "Boolean expression" }
      ],
      truthTable: {
        headers: ["A", "B", "A XNOR B"],
        rows: [
          [0, 0, 1],
          [0, 1, 0],
          [1, 0, 0],
          [1, 1, 1]
        ]
      },
      finalRemark: "Truth table confirms XNOR outputs 1 when inputs are equal. Hence option A."
    },
    marks: 1
  },

  // Q30: Half Adder Outputs
  {
    id: 30,
    assertion: "The sum output of a half adder is given by A XOR B.",
    reason: "Half adder sum is the XOR of the two inputs.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly states half adder sum.",
      definitions: [
        { term: "Half Adder", definition: "A circuit that adds two single bits, producing Sum and Carry outputs.", example: "Adds A=1,B=1 → Sum=0, Carry=1." },
        { term: "Sum (Half Adder)", definition: "Sum = A ⊕ B (XOR of inputs)", example: "1⊕1=0, 1⊕0=1." }
      ],
      steps: [
        { step: 1, action: "Construct truth table", expression: "Inputs A, B", law: "Half adder" },
        { step: 2, action: "Sum output", expression: "A XOR B", law: "XOR definition" },
        { step: 3, action: "Carry output", expression: "A·B", law: "AND definition" }
      ],
      truthTable: {
        headers: ["A", "B", "Sum (A⊕B)", "Carry (A·B)"],
        rows: [
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [1, 0, 1, 0],
          [1, 1, 0, 1]
        ]
      },
      finalRemark: "Truth table confirms Sum = A XOR B. Hence option A."
    },
    marks: 1
  },

  // Q31: Full Adder Outputs
  {
    id: 31,
    assertion: "The sum output of a full adder is given by A ⊕ B ⊕ Cin.",
    reason: "Full adder sum is the XOR of all three inputs.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly states full adder sum.",
      definitions: [
        { term: "Full Adder", definition: "A circuit that adds three bits (A, B, Carry-in), producing Sum and Carry-out.", example: "A=1,B=1,Cin=1 → Sum=1, Cout=1 (binary 1+1+1=3, binary 11)." },
        { term: "Sum (Full Adder)", definition: "Sum = A ⊕ B ⊕ Cin", example: "1⊕1⊕1 = 1." }
      ],
      steps: [
        { step: 1, action: "Construct truth table", expression: "Inputs A, B, Cin", law: "Full adder" },
        { step: 2, action: "Sum output", expression: "A XOR B XOR Cin", law: "XOR definition" }
      ],
      truthTable: {
        headers: ["A", "B", "Cin", "Sum (A⊕B⊕Cin)"],
        rows: [
          [0,0,0,0], [0,0,1,1], [0,1,0,1], [0,1,1,0],
          [1,0,0,1], [1,0,1,0], [1,1,0,0], [1,1,1,1]
        ]
      },
      finalRemark: "Truth table confirms Sum = A ⊕ B ⊕ Cin. Hence option A."
    },
    marks: 1
  },

  // Q32: Decoder Function
  {
    id: 32,
    assertion: "A 2-to-4 line decoder has 2 inputs and 4 outputs.",
    reason: "A decoder with n inputs has 2^n outputs.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains decoder design.",
      definitions: [
        { term: "Decoder", definition: "A combinational circuit that converts binary information from n inputs to a maximum of 2^n outputs.", example: "2-to-4 decoder: inputs 00 → output line 0 high, 01 → line 1 high, etc." }
      ],
      steps: [
        { step: 1, action: "Number of inputs", expression: "n = 2", law: "Given" },
        { step: 2, action: "Number of outputs", expression: "2^n = 2^2 = 4", law: "Decoder design" },
        { step: 3, action: "Conclusion", expression: "2 inputs produce 4 outputs", law: "Decoder truth table" }
      ],
      truthTable: {
        headers: ["Input A", "Input B", "Output 0", "Output 1", "Output 2", "Output 3"],
        rows: [
          [0,0,1,0,0,0],
          [0,1,0,1,0,0],
          [1,0,0,0,1,0],
          [1,1,0,0,0,1]
        ]
      },
      finalRemark: "A 2-to-4 decoder indeed has 2 inputs and 4 outputs. Reason correctly states the formula. Hence option A."
    },
    marks: 1
  },

  // Q33: Multiplexer Function
  {
    id: 33,
    assertion: "A 4-to-1 multiplexer selects one of its 4 data inputs based on 2 select lines.",
    reason: "A multiplexer with 2^n data inputs requires n select lines.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains multiplexer design.",
      definitions: [
        { term: "Multiplexer", definition: "A circuit that selects one of several inputs and forwards it to a single output based on select lines.", example: "4-to-1 MUX: select lines 00 → output = I0, 01 → I1, 10 → I2, 11 → I3." }
      ],
      steps: [
        { step: 1, action: "Number of data inputs", expression: "m = 4", law: "Given" },
        { step: 2, action: "Select lines required", expression: "n = log₂(4) = 2", law: "Multiplexer design" },
        { step: 3, action: "Conclusion", expression: "4 data inputs need 2 select lines", law: "MUX truth table" }
      ],
      finalRemark: "A 4-to-1 MUX indeed has 4 data inputs and 2 select lines. Hence option A."
    },
    marks: 1
  },

  // Q34: Half Adder vs Full Adder
  {
    id: 34,
    assertion: "A full adder can be constructed using two half adders.",
    reason: "Full adder adds three bits; two half adders can handle three inputs by cascading.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains construction.",
      definitions: [
        { term: "Half Adder", definition: "Adds two bits, produces Sum and Carry.", example: "1+1 = Sum=0, Carry=1." },
        { term: "Full Adder", definition: "Adds three bits, produces Sum and Carry-out.", example: "1+1+1 = Sum=1, Carry=1." }
      ],
      steps: [
        { step: 1, action: "First half adder", expression: "Sum1 = A ⊕ B, Carry1 = A·B", law: "Half adder" },
        { step: 2, action: "Second half adder", expression: "Sum = Sum1 ⊕ Cin, Carry2 = Sum1·Cin", law: "Half adder" },
        { step: 3, action: "Final Carry-out", expression: "Cout = Carry1 + Carry2", law: "OR of carries" }
      ],
      finalRemark: "Full adder can indeed be built using two half adders and an OR gate. Hence option A."
    },
    marks: 1
  },

  // Q35: Encoder Function
  {
    id: 35,
    assertion: "A 4-to-2 encoder has 4 inputs and 2 outputs.",
    reason: "An encoder with 2^n inputs has n outputs.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains encoder design.",
      definitions: [
        { term: "Encoder", definition: "A combinational circuit that converts 2^n inputs into n outputs.", example: "4-to-2 encoder: input 0100 (only line 1 high) → output 01." }
      ],
      steps: [
        { step: 1, action: "Number of inputs", expression: "2^n = 4 → n = 2", law: "Encoder design" },
        { step: 2, action: "Conclusion", expression: "4 inputs produce 2 outputs", law: "Encoder truth table" }
      ],
      finalRemark: "A 4-to-2 encoder indeed has 4 inputs and 2 outputs. Hence option A."
    },
    marks: 1
  },

  // ======================================================================
  // SECTION 4: SOP, POS & KARNAUGH MAPS (Q36-Q42)
  // ======================================================================

  // Q36: Standard SOP Form
  {
    id: 36,
    assertion: "SOP (Sum of Products) form consists of AND terms ORed together.",
    reason: "SOP represents Boolean functions as OR of minterms.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly describes SOP form.",
      definitions: [
        { term: "SOP (Sum of Products)", definition: "A Boolean expression consisting of AND terms (products) connected by OR operators.", example: "AB + A'B + BC is SOP." },
        { term: "Minterm", definition: "A product term in which each variable appears exactly once, either complemented or uncomplemented.", example: "For 3 variables, A'BC is a minterm (binary 011)." }
      ],
      steps: [
        { step: 1, action: "Example expression", expression: "F = AB + A'B + BC", law: "SOP form" },
        { step: 2, action: "Identify AND terms", expression: "AB, A'B, BC", law: "Products" },
        { step: 3, action: "Identify OR operators", expression: "Terms ORed together", law: "Sum" }
      ],
      finalRemark: "SOP is indeed OR of AND terms. Reason correctly mentions minterms. Hence option A."
    },
    marks: 1
  },

  // Q37: Canonical SOP
  {
    id: 37,
    assertion: "A canonical SOP expression must contain all variables in each product term.",
    reason: "Canonical form is a standardized representation where each term is a minterm.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains canonical SOP.",
      definitions: [
        { term: "Canonical SOP", definition: "A sum of minterms where each minterm contains all variables exactly once.", example: "For 2 variables, canonical SOP of A+B is A'B + AB' + AB." },
        { term: "Minterm", definition: "A product term that includes every variable of the function.", example: "For 3 variables, AB'C is a minterm (binary 101)." }
      ],
      steps: [
        { step: 1, action: "Non-canonical SOP", expression: "F = A + BC", law: "Missing variables" },
        { step: 2, action: "Canonical SOP", expression: "F = A'B'C + A'BC' + A'BC + AB'C' + AB'C + ABC' + ABC", law: "All variables in each term" },
        { step: 3, action: "Conclusion", expression: "Canonical form uses minterms", law: "Definition" }
      ],
      finalRemark: "Canonical SOP requires all variables in each term. Reason correctly states it uses minterms. Hence option A."
    },
    marks: 1
  },

  // Q38: Minterm Representation
  {
    id: 38,
    assertion: "A minterm for three variables A, B, C with binary value 101 corresponds to AB'C.",
    reason: "A minterm is 1 for only one combination of inputs, represented by complementing variables with 0.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains minterm formation.",
      definitions: [
        { term: "Minterm", definition: "A product term that evaluates to 1 for exactly one combination of inputs.", example: "For binary 101 (A=1,B=0,C=1), the minterm is AB'C." },
        { term: "Minterm Notation", definition: "Variables appear complemented if the corresponding input bit is 0.", example: "Binary 010 (A=0,B=1,C=0) gives minterm A'BC'." }
      ],
      steps: [
        { step: 1, action: "Binary value", expression: "101 = A=1, B=0, C=1", law: "Binary to variable mapping" },
        { step: 2, action: "Complement rule", expression: "1 → uncomplemented, 0 → complemented", law: "Minterm rule" },
        { step: 3, action: "Write minterm", expression: "AB'C", law: "A=1, B=0, C=1" }
      ],
      finalRemark: "Binary 101 correctly maps to AB'C. Hence option A."
    },
    marks: 1
  },

  // Q39: Maxterm Representation
  {
    id: 39,
    assertion: "A maxterm for three variables A, B, C with binary value 010 corresponds to A + B' + C.",
    reason: "A maxterm is 0 for only one combination of inputs, represented by complementing variables with 1.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains maxterm formation.",
      definitions: [
        { term: "Maxterm", definition: "A sum term that evaluates to 0 for exactly one combination of inputs.", example: "For binary 010 (A=0,B=1,C=0), the maxterm is A + B' + C." },
        { term: "Maxterm Notation", definition: "Variables appear complemented if the corresponding input bit is 1.", example: "Binary 101 (A=1,B=0,C=1) gives maxterm A' + B + C'." }
      ],
      steps: [
        { step: 1, action: "Binary value", expression: "010 = A=0, B=1, C=0", law: "Binary to variable mapping" },
        { step: 2, action: "Complement rule", expression: "0 → uncomplemented, 1 → complemented", law: "Maxterm rule" },
        { step: 3, action: "Write maxterm", expression: "A + B' + C", law: "A=0, B=1, C=0" }
      ],
      finalRemark: "Binary 010 correctly maps to A + B' + C. Hence option A."
    },
    marks: 1
  },

  // Q40: K-Map Adjacency
  {
    id: 40,
    assertion: "In a 3-variable K-map, cells 001 and 011 are adjacent.",
    reason: "K-map cells are adjacent if they differ in exactly one variable.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains adjacency.",
      definitions: [
        { term: "K-Map Adjacency", definition: "Two cells are adjacent if their binary representations differ in exactly one bit position.", example: "001 (A=0,B=0,C=1) and 011 (0,1,1) differ only in B – adjacent." }
      ],
      steps: [
        { step: 1, action: "Cell 001", expression: "A=0, B=0, C=1", law: "Binary representation" },
        { step: 2, action: "Cell 011", expression: "A=0, B=1, C=1", law: "Binary representation" },
        { step: 3, action: "Compare", expression: "Only B differs (0 vs 1)", law: "Adjacency condition" },
        { step: 4, action: "Conclusion", expression: "Cells are adjacent", law: "K-map property" }
      ],
      finalRemark: "001 and 011 differ only in variable B, so they are adjacent. Hence option A."
    },
    marks: 1
  },

  // Q41: K-Map Simplification Principle
  {
    id: 41,
    assertion: "In a K-map, grouping 2^n adjacent 1's eliminates n variables.",
    reason: "Larger groups represent simpler product terms with fewer literals.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains grouping benefit.",
      definitions: [
        { term: "K-Map Grouping", definition: "Adjacent 1's are grouped in powers of 2 (1, 2, 4, 8, etc.).", example: "A group of 4 cells in a 4-variable K-map eliminates 2 variables." }
      ],
      steps: [
        { step: 1, action: "Group size", expression: "2^n cells", law: "K-map rule" },
        { step: 2, action: "Variables eliminated", expression: "n variables", law: "Simplification" },
        { step: 3, action: "Example", expression: "Group of 4 eliminates 2 variables", law: "K-map example" }
      ],
      finalRemark: "Larger groups indeed eliminate more variables, resulting in simpler expressions. Hence option A."
    },
    marks: 1
  },

  // Q42: Don't Care Conditions
  {
    id: 42,
    assertion: "Don't care conditions in a K-map can be treated as either 0 or 1 to maximize grouping.",
    reason: "Don't cares are used to form larger groups, leading to simpler Boolean expressions.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains use of don't cares.",
      definitions: [
        { term: "Don't Care Condition", definition: "Input combinations that never occur, can be assigned 0 or 1 for simplification.", example: "In a BCD to 7-segment decoder, inputs 1010-1111 never occur – they are don't cares." }
      ],
      steps: [
        { step: 1, action: "Identify don't cares", expression: "Marked as X in K-map", law: "Given" },
        { step: 2, action: "Use as 1 if helpful", expression: "Increases group size", law: "Simplification" },
        { step: 3, action: "Use as 0 if not helpful", expression: "Doesn't affect groups", law: "Simplification" },
        { step: 4, action: "Result", expression: "Simpler expression", law: "K-map optimization" }
      ],
      finalRemark: "Don't cares can be used to form larger groups, leading to simpler expressions. Hence option A."
    },
    marks: 1
  },

  // ======================================================================
  // SECTION 5: COMPUTER HARDWARE & APPLICATIONS (Q43-Q50)
  // ======================================================================

  // Q43: Flip-Flop vs Latch
  {
    id: 43,
    assertion: "A flip-flop is edge-triggered while a latch is level-sensitive.",
    reason: "Flip-flops change state only at clock edges, whereas latches respond to input levels.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly distinguishes flip-flops from latches.",
      definitions: [
        { term: "Flip-Flop", definition: "A bistable device that changes state only on a clock edge (rising or falling).", example: "D flip-flop captures input on rising edge and holds it until next rising edge." },
        { term: "Latch", definition: "A bistable device that changes state based on input levels, not clock edges.", example: "SR latch: when Enable=1, output follows inputs; when Enable=0, output holds." }
      ],
      steps: [
        { step: 1, action: "Flip-flop operation", expression: "State changes at clock edge", law: "Edge-triggered" },
        { step: 2, action: "Latch operation", expression: "State follows input while enable is active", law: "Level-sensitive" },
        { step: 3, action: "Conclusion", expression: "Key difference is triggering method", law: "Digital logic design" }
      ],
      finalRemark: "Flip-flops are edge-triggered, latches are level-sensitive. Reason correctly explains this. Hence option A."
    },
    marks: 1
  },

  // Q44: SR Flip-Flop Race Condition
  {
    id: 44,
    assertion: "The SR flip-flop has an invalid state when both S=1 and R=1.",
    reason: "When both inputs are active, the output becomes unpredictable.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason explains the invalid state.",
      definitions: [
        { term: "SR Flip-Flop", definition: "A flip-flop with Set (S) and Reset (R) inputs.", example: "S=1,R=0 → Q=1; S=0,R=1 → Q=0." },
        { term: "Invalid State", definition: "Occurs when S=R=1, causing unpredictable output.", example: "S=R=1 forces both Q and Q' to 1, which is not allowed." }
      ],
      steps: [
        { step: 1, action: "S=1, R=0", expression: "Output = 1 (Set)", law: "Flip-flop behavior" },
        { step: 2, action: "S=0, R=1", expression: "Output = 0 (Reset)", law: "Flip-flop behavior" },
        { step: 3, action: "S=1, R=1", expression: "Invalid (both outputs forced to 1)", law: "Race condition" },
        { step: 4, action: "Conclusion", expression: "S=R=1 is forbidden", law: "Digital logic" }
      ],
      finalRemark: "SR=11 is indeed invalid. Reason correctly states it leads to unpredictable output. Hence option A."
    },
    marks: 1
  },

  // Q45: JK Flip-Flop Advantage
  {
    id: 45,
    assertion: "The JK flip-flop eliminates the invalid state of the SR flip-flop.",
    reason: "JK flip-flop toggles when both inputs are high, making all input combinations valid.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason explains JK's advantage.",
      definitions: [
        { term: "JK Flip-Flop", definition: "A flip-flop that toggles when J=K=1, eliminating invalid states.", example: "J=1,K=1 on clock edge toggles output: Q becomes Q'." }
      ],
      steps: [
        { step: 1, action: "J=1, K=1", expression: "Toggles output on clock edge", law: "JK behavior" },
        { step: 2, action: "J=1, K=0", expression: "Sets output to 1", law: "JK behavior" },
        { step: 3, action: "J=0, K=1", expression: "Resets output to 0", law: "JK behavior" },
        { step: 4, action: "J=0, K=0", expression: "No change", law: "JK behavior" },
        { step: 5, action: "Conclusion", expression: "All input combinations valid", law: "JK advantage" }
      ],
      finalRemark: "JK flip-flop indeed has no invalid state. Reason correctly describes toggling behavior. Hence option A."
    },
    marks: 1
  },

  // Q46: Counter Applications
  {
    id: 46,
    assertion: "A counter is a sequential circuit that counts clock pulses.",
    reason: "Counters are used in digital systems for frequency division and event counting.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason describes counter applications.",
      definitions: [
        { term: "Counter", definition: "A sequential circuit that goes through a predetermined sequence of states.", example: "A 3-bit binary counter counts from 000 to 111 (0 to 7)." }
      ],
      steps: [
        { step: 1, action: "Basic operation", expression: "Increments on each clock pulse", law: "Counter function" },
        { step: 2, action: "Frequency division", expression: "n-bit counter divides frequency by 2^n", law: "Application" },
        { step: 3, action: "Event counting", expression: "Counts number of input pulses", law: "Application" }
      ],
      finalRemark: "Counters indeed count clock pulses and are used for frequency division and event counting. Hence option A."
    },
    marks: 1
  },

  // Q47: Register vs Memory
  {
    id: 47,
    assertion: "A register stores data temporarily within the CPU.",
    reason: "Registers are high-speed storage locations directly accessible by the CPU.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly describes register function.",
      definitions: [
        { term: "Register", definition: "A small, high-speed storage location within the CPU.", example: "Accumulator, Program Counter, Instruction Register are examples of CPU registers." }
      ],
      steps: [
        { step: 1, action: "Temporary storage", expression: "Holds data during processing", law: "Register function" },
        { step: 2, action: "Speed comparison", expression: "Faster than main memory", law: "CPU architecture" },
        { step: 3, action: "Accessibility", expression: "Directly accessible by CPU", law: "Register property" }
      ],
      finalRemark: "Registers are temporary, high-speed storage within the CPU. Hence option A."
    },
    marks: 1
  },

  // Q48: ALU Function
  {
    id: 48,
    assertion: "The ALU performs arithmetic and logic operations.",
    reason: "ALU is the computational core of the CPU.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly identifies ALU's role.",
      definitions: [
        { term: "ALU (Arithmetic Logic Unit)", definition: "The part of the CPU that performs arithmetic and logical operations.", example: "Addition, subtraction, AND, OR, XOR, shift operations are done by ALU." }
      ],
      steps: [
        { step: 1, action: "Arithmetic operations", expression: "Addition, subtraction, etc.", law: "ALU function" },
        { step: 2, action: "Logic operations", expression: "AND, OR, NOT, XOR, etc.", law: "ALU function" },
        { step: 3, action: "Role", expression: "Computational core of CPU", law: "CPU architecture" }
      ],
      finalRemark: "ALU indeed performs arithmetic and logic operations. Hence option A."
    },
    marks: 1
  },

  // Q49: Binary Addition in Computers
  {
    id: 49,
    assertion: "Binary addition in computers uses half adders and full adders.",
    reason: "Binary addition is the foundation of all arithmetic operations.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly states the importance.",
      definitions: [
        { term: "Half Adder", definition: "Adds two bits, produces Sum and Carry.", example: "1+1 → Sum=0, Carry=1." },
        { term: "Full Adder", definition: "Adds three bits, produces Sum and Carry-out.", example: "1+1+1 → Sum=1, Carry=1." }
      ],
      steps: [
        { step: 1, action: "LSB addition", expression: "Half adder for first bits", law: "Binary addition" },
        { step: 2, action: "Higher bits", expression: "Full adders with carry propagation", law: "Ripple carry adder" },
        { step: 3, action: "Foundation", expression: "All arithmetic based on binary addition", law: "Computer arithmetic" }
      ],
      finalRemark: "Binary addition uses half adders and full adders. Reason correctly states its foundational importance. Hence option A."
    },
    marks: 1
  },

  // Q50: Boolean Algebra in Circuit Design
  {
    id: 50,
    assertion: "Boolean algebra is used to simplify digital logic circuits.",
    reason: "Simplification reduces the number of gates, saving cost and power.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason explains the benefit of simplification.",
      definitions: [
        { term: "Boolean Algebra", definition: "A mathematical system for analyzing and simplifying digital logic circuits.", example: "Using Boolean laws, AB + A'B simplifies to B (fewer gates)." }
      ],
      steps: [
        { step: 1, action: "Original expression", expression: "Complex Boolean expression", law: "Given" },
        { step: 2, action: "Apply laws", expression: "Use Boolean laws to simplify", law: "Boolean simplification" },
        { step: 3, action: "Reduced expression", expression: "Simpler, fewer terms", law: "Result" },
        { step: 4, action: "Benefits", expression: "Fewer gates, lower cost, less power", law: "Circuit design" }
      ],
      finalRemark: "Boolean algebra simplifies circuits, reducing gate count and power consumption. Hence option A."
    },
    marks: 1
  }
];