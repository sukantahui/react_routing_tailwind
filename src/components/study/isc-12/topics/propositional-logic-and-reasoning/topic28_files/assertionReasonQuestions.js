// questions1.js - 10 Assertion-Reason Questions for ISC Computer Science
// Only Propositional Logic section (Q1-Q10)
// Enhanced: Every definition includes an example.
// Further enhanced: Detailed discussion of the Reason statement from every aspect.

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
    reasonDiscussion: "The reason states: 'Contrapositive is the converse of inverse for any proposition.' This is a true statement in propositional logic. For any implication P ⇒ Q, its inverse is ¬P ⇒ ¬Q. The converse of that inverse is ¬Q ⇒ ¬P, which is exactly the contrapositive. Therefore the reason is logically correct and universally applicable. There is no edge case or exception. However, the assertion is false because the contrapositive of ¬A ⇒ B is ¬B ⇒ A, not B ⇒ ¬A. Hence the reason does not explain the assertion (since the assertion is wrong). The reason is independently true, making option D correct. Students often confuse the order of negation; the reason provides a valid meta‑logical fact but does not salvage the incorrect assertion."
  },

  // Q2: (P ∧ Q) ⇒ P is a tautology
  {
    id: 2,
    assertion: "The statement (P ∧ Q) ⇒ P is a tautology.",
    reason: "In any implication, if the antecedent is true, the consequent must be true for the implication to be true.",
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
    reasonDiscussion: "The reason is a true and fundamental property of material implication: an implication P⇒Q is false only when the antecedent (P) is true and the consequent (Q) is false. This is the definitional truth condition. The reason applies this principle to the specific implication (P∧Q)⇒P. Since the antecedent (P∧Q) being true forces P to be true (because conjunction requires both operands true), the falsifying condition (antecedent true, consequent false) can never happen. Therefore the implication is always true – a tautology. The reason directly and correctly explains the assertion. No hidden nuance: it covers all cases, including when the antecedent is false (implication vacuously true). Thus option A is justified."
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
    reasonDiscussion: "The reason is a correct statement of De Morgan's first law: ¬(P ∨ Q) ≡ ¬P ∧ ¬Q. It is a fundamental theorem in propositional logic and Boolean algebra, true for all truth assignments. However, the assertion mistakenly uses OR (∨) instead of AND (∧) on the right‑hand side. Therefore the reason does not support the assertion; it actually contradicts it because the correct law uses conjunction. The reason is true, but the assertion is false. This is a classic trap for students who misremember De Morgan's laws. Option D (A false, R true) is correct. There is no subtlety: the reason is universally true and independent of the false assertion."
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
    reasonDiscussion: "The reason is the precise definition of the converse of an implication. It is universally true. The assertion takes a concrete English sentence, identifies P = 'it rains' and Q = 'ground is wet', and applies the definition to produce 'If ground is wet, then it rains'. Thus the reason directly and correctly explains the assertion. There is no ambiguity or exception. The truth table confirms that the converse is not logically equivalent to the original, but that is irrelevant to the correctness of the definition. Option A is correct."
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
    reasonDiscussion: "The reason is true: for any two propositions P and Q, it is impossible for both P⇒Q and Q⇒P to be false simultaneously. Because if P⇒Q is false, then P=1 and Q=0. In that case, Q⇒P becomes 0⇒1 = 1 (true). Conversely, if Q⇒P is false, then Q=1 and P=0, making P⇒Q = 0⇒1 = 1. Thus at least one is always true. This reasoning is a complete and correct explanation of why the disjunction is a tautology. The reason is not just a restatement; it provides the underlying logical insight. Hence option A is correct. No edge cases exist – it holds for all binary truth values."
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
    reasonDiscussion: "The reason is the exact definition of the inverse of an implication. It is a true and universally applicable statement. The assertion applies this definition to a concrete example: with P = 'it rains' and Q = 'ground is wet', the inverse becomes ¬P ⇒ ¬Q, which translates to 'If it does not rain, then the ground is not wet'. Therefore the reason correctly and fully explains the assertion. There is no subtlety or exception. Option A is correct."
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
    reasonDiscussion: "The reason is true and directly explains why P ∨ ¬P is a tautology. If P is false, then ¬P is true, so the disjunction is true. If P is true, the disjunction is true. The impossibility of both being false is exactly the logical principle behind the Law of Excluded Middle. The reason is not just a restatement; it provides the fundamental justification. Therefore it correctly explains the assertion. No edge cases exist – it holds for any proposition in classical logic. Option A is correct."
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
    reasonDiscussion: "The reason is true: a proposition and its negation cannot both be true. This is the Law of Non‑Contradiction, a foundational principle of classical logic. For P ∧ ¬P to be true, both P and ¬P would have to be true simultaneously, which is impossible. Therefore the conjunction is always false – a contradiction. The reason directly explains the assertion. No subtlety: it covers all cases. Option A is correct."
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
    reasonDiscussion: "The reason is true and provides a valid explanation for the tautology. It focuses on the case when P is true: then Q⇒P becomes Q⇒True, which is always true regardless of Q. However, the reason does not explicitly address the case when P is false. In that case, the outer implication P⇒(Q⇒P) has a false antecedent (P false), making the whole implication true vacuously. The reason implicitly covers this because it states 'any implication with P as consequent is true' – but the outer implication's consequent is (Q⇒P), not P itself. Actually, the reason says: 'If P is true, then any implication with P as consequent is true regardless of the antecedent.' This is correct: when P is true, Q⇒P is true. For P false, the outer implication is true because antecedent false. So the reason is complete. It correctly explains the tautology. Option A is correct."
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
    reasonDiscussion: "The reason is true and provides the exact truth‑conditional justification for the equivalence. Both P⇒Q and ¬P∨Q are false only in the single case where P is true and Q is false. In all other three cases, both are true. Therefore they have identical truth tables, establishing logical equivalence. The reason correctly identifies this falsification condition, which is the key to understanding why the equivalence holds. No edge cases or exceptions exist. Thus the reason fully and correctly explains the assertion. Option A is correct."
  },
    // Q11: Modus Ponens as a tautology
  {
    id: 11,
    assertion: "The statement (P ∧ (P ⇒ Q)) ⇒ Q is a tautology.",
    reason: "Modus Ponens is a valid inference rule: if P is true and P implies Q, then Q must be true.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains that Modus Ponens is a tautology.",
      definitions: [
        { term: "Modus Ponens", definition: "A rule of inference: from P and P⇒Q, infer Q.", example: "If 'it is raining' (P) and 'if it rains then ground is wet' (P⇒Q), then 'ground is wet' (Q)." },
        { term: "Tautology", definition: "A statement true for all truth assignments.", example: "(P ∧ (P⇒Q)) ⇒ Q is true for all P, Q." }
      ],
      steps: [
        { step: 1, action: "List all truth assignments", expression: "P, Q ∈ {0,1}", law: "Truth table" },
        { step: 2, action: "Compute P⇒Q", expression: "False only when P=1, Q=0", law: "Implication" },
        { step: 3, action: "Compute P ∧ (P⇒Q)", expression: "1 only when P=1 and P⇒Q=1", law: "Conjunction" },
        { step: 4, action: "Check implication (P∧(P⇒Q)) ⇒ Q", expression: "False only when left true and Q false", law: "Implication falsification" }
      ],
      truthTable: {
        headers: ["P", "Q", "P⇒Q", "P∧(P⇒Q)", "(P∧(P⇒Q)) ⇒ Q"],
        rows: [
          [0, 0, 1, 0, 1],
          [0, 1, 1, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 1, 1, 1, 1]
        ]
      },
      finalRemark: "Last column is all 1s, confirming tautology. Reason correctly describes Modus Ponens and why it is valid."
    },
    reasonDiscussion: "The reason states that Modus Ponens is a valid inference rule: from P and P⇒Q, Q follows. This is a fundamental rule of logic. The assertion claims that the corresponding conditional (P ∧ (P⇒Q)) ⇒ Q is a tautology. The reason explains exactly why: whenever the antecedent (P and P⇒Q) is true, P is true and P⇒Q is true, which forces Q to be true (otherwise P⇒Q would be false). Hence the implication is always true. The reason is true and provides a complete explanation. Option A is correct."
  },

  // Q12: Modus Tollens as a tautology
  {
    id: 12,
    assertion: "The statement (¬Q ∧ (P ⇒ Q)) ⇒ ¬P is a tautology.",
    reason: "Modus Tollens states that if Q is false and P implies Q, then P must be false.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly explains Modus Tollens as a tautology.",
      definitions: [
        { term: "Modus Tollens", definition: "A rule of inference: from ¬Q and P⇒Q, infer ¬P.", example: "If ground is not wet (¬Q) and 'if rain then wet' (P⇒Q), then it did not rain (¬P)." }
      ],
      steps: [
        { step: 1, action: "Truth table enumeration", expression: "P, Q ∈ {0,1}", law: "Truth table" },
        { step: 2, action: "Compute P⇒Q", expression: "False only when P=1, Q=0", law: "Implication" },
        { step: 3, action: "Compute ¬Q ∧ (P⇒Q)", expression: "1 only when Q=0 and P⇒Q=1", law: "Conjunction" },
        { step: 4, action: "Check implication", expression: "False only when left true and ¬P false", law: "Implication" }
      ],
      truthTable: {
        headers: ["P", "Q", "P⇒Q", "¬Q", "¬Q∧(P⇒Q)", "¬P", "(¬Q∧(P⇒Q))⇒¬P"],
        rows: [
          [0,0,1,1,1,1,1],
          [0,1,1,0,0,1,1],
          [1,0,0,1,0,0,1],
          [1,1,1,0,0,0,1]
        ]
      },
      finalRemark: "Last column all 1s, tautology. Reason correctly identifies Modus Tollens."
    },
    reasonDiscussion: "The reason is true: Modus Tollens is a standard valid inference. The assertion states that its corresponding conditional is a tautology. The reason explains: if Q is false and P⇒Q is true, then P cannot be true (because true P with false Q would make P⇒Q false). Therefore ¬P follows. This reasoning covers all cases, including when antecedent is false (implication vacuously true). Thus the reason correctly explains the tautology. Option A is correct."
  },

  // Q13: Simplification (P ∧ Q) ⇒ Q
  {
    id: 13,
    assertion: "The statement (P ∧ Q) ⇒ Q is a tautology.",
    reason: "If a conjunction is true, then each of its conjuncts must be true.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason explains simplification rule.",
      definitions: [
        { term: "Simplification", definition: "From P∧Q, we can infer P (and also Q).", example: "If it is raining and cold, then it is raining." }
      ],
      steps: [
        { step: 1, action: "Truth table", expression: "P, Q", law: "Truth table" },
        { step: 2, action: "P∧Q true only when both true", expression: "Then Q true", law: "Conjunction" },
        { step: 3, action: "Implication always true", expression: "No row with P∧Q true and Q false", law: "Tautology check" }
      ],
      truthTable: {
        headers: ["P", "Q", "P∧Q", "(P∧Q)⇒Q"],
        rows: [
          [0,0,0,1],
          [0,1,0,1],
          [1,0,0,1],
          [1,1,1,1]
        ]
      },
      finalRemark: "All outputs 1. Reason correctly states that conjunction implies each conjunct."
    },
    reasonDiscussion: "The reason is a true property of logical conjunction: if P∧Q is true, then both P and Q are true individually. The assertion is a direct application: (P∧Q) ⇒ Q is always true because whenever the antecedent (P∧Q) holds, Q holds. The reason explains this completely. Note that this is similar to Q2 but with Q as consequent instead of P. No repetition – it tests different simplification. Option A is correct."
  },

  // Q14: Addition P ⇒ (P ∨ Q)
  {
    id: 14,
    assertion: "The statement P ⇒ (P ∨ Q) is a tautology.",
    reason: "If a proposition is true, then its disjunction with any other proposition is also true.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason explains addition/inference rule.",
      definitions: [
        { term: "Addition", definition: "From P, infer P ∨ Q for any Q.", example: "If it is raining, then it is raining or snowing." }
      ],
      steps: [
        { step: 1, action: "Truth table", expression: "P, Q", law: "Truth table" },
        { step: 2, action: "P true makes P∨Q true", expression: "Disjunction true if at least one true", law: "OR" },
        { step: 3, action: "If P false, antecedent false", expression: "Implication vacuously true", law: "Implication" }
      ],
      truthTable: {
        headers: ["P", "Q", "P∨Q", "P⇒(P∨Q)"],
        rows: [
          [0,0,0,1],
          [0,1,1,1],
          [1,0,1,1],
          [1,1,1,1]
        ]
      },
      finalRemark: "All 1s. Reason correctly explains that true P makes disjunction true."
    },
    reasonDiscussion: "The reason is true: if P is true, then P∨Q is true regardless of Q. When P is false, the implication has a false antecedent, making the whole conditional true. Thus the statement is a tautology. The reason directly explains the only non‑vacuous case (P true). Hence option A is correct."
  },

  // Q15: Commutativity of AND
  {
    id: 15,
    assertion: "The expression P ∧ Q is logically equivalent to Q ∧ P.",
    reason: "The conjunction (AND) operation is commutative, meaning the order of operands does not affect the truth value.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason correctly states commutativity of AND.",
      definitions: [
        { term: "Commutative Law", definition: "P ∧ Q ≡ Q ∧ P; P ∨ Q ≡ Q ∨ P", example: "True ∧ False = False ∧ True = False." }
      ],
      steps: [
        { step: 1, action: "Truth table", expression: "Compare P∧Q and Q∧P", law: "Truth table" },
        { step: 2, action: "All rows identical", expression: "Both columns match", law: "Verification" }
      ],
      truthTable: {
        headers: ["P", "Q", "P∧Q", "Q∧P"],
        rows: [
          [0,0,0,0],
          [0,1,0,0],
          [1,0,0,0],
          [1,1,1,1]
        ]
      },
      finalRemark: "Identical columns, logically equivalent. Reason states commutativity."
    },
    reasonDiscussion: "The reason is a true statement about logical conjunction: AND is commutative. The assertion is exactly that equivalence. The reason explains why the order does not matter. No subtlety. Option A is correct."
  },

  // Q16: Associativity of OR
  {
    id: 16,
    assertion: "The expression (P ∨ Q) ∨ R is logically equivalent to P ∨ (Q ∨ R).",
    reason: "The OR operation is associative, so regrouping does not change the truth value.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason explains associativity of OR.",
      definitions: [
        { term: "Associative Law", definition: "(P ∨ Q) ∨ R ≡ P ∨ (Q ∨ R)", example: "(0∨0)∨1 = 0∨1=1; 0∨(0∨1)=0∨1=1." }
      ],
      steps: [
        { step: 1, action: "Truth table with 3 variables", expression: "8 rows", law: "Truth table" },
        { step: 2, action: "Compare both sides", expression: "Identical outputs", law: "Associativity" }
      ],
      truthTable: {
        headers: ["P", "Q", "R", "P∨Q", "(P∨Q)∨R", "Q∨R", "P∨(Q∨R)"],
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
      finalRemark: "Columns (P∨Q)∨R and P∨(Q∨R) are identical. Reason correctly states associativity."
    },
    reasonDiscussion: "The reason is true: OR is associative, which is a basic property. The assertion is a direct statement of that property. The reason correctly explains that regrouping does not change the result. Option A is correct."
  },

  // Q17: Distributivity of OR over AND
  {
    id: 17,
    assertion: "The expression P ∨ (Q ∧ R) is logically equivalent to (P ∨ Q) ∧ (P ∨ R).",
    reason: "OR distributes over AND in Boolean algebra, similar to addition distributing over multiplication.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason explains distributive law.",
      definitions: [
        { term: "Distributive Law", definition: "P ∨ (Q ∧ R) ≡ (P ∨ Q) ∧ (P ∨ R)", example: "1∨(0∧1)=1∨0=1; (1∨0)∧(1∨1)=1∧1=1." }
      ],
      steps: [
        { step: 1, action: "Truth table (3 variables)", expression: "8 rows", law: "Truth table" },
        { step: 2, action: "Compare LHS and RHS", expression: "All rows identical", law: "Distribution" }
      ],
      truthTable: {
        headers: ["P","Q","R","Q∧R","P∨(Q∧R)","P∨Q","P∨R","(P∨Q)∧(P∨R)"],
        rows: [
          [0,0,0,0,0,0,0,0],
          [0,0,1,0,0,0,1,0],
          [0,1,0,0,0,1,0,0],
          [0,1,1,1,1,1,1,1],
          [1,0,0,0,1,1,1,1],
          [1,0,1,0,1,1,1,1],
          [1,1,0,0,1,1,1,1],
          [1,1,1,1,1,1,1,1]
        ]
      },
      finalRemark: "Columns 5 and 8 are identical. Reason correctly identifies distribution."
    },
    reasonDiscussion: "The reason is true: OR distributes over AND. This is a fundamental law of Boolean algebra, not true in ordinary arithmetic but valid in logic. The assertion states the equivalence. The reason provides the correct explanation (analogy to algebra helps memory). Option A is correct."
  },

  // Q18: Biconditional as equivalence of implications
  {
    id: 18,
    assertion: "The biconditional P ⇔ Q is logically equivalent to (P ⇒ Q) ∧ (Q ⇒ P).",
    reason: "P ⇔ Q means P and Q have the same truth value, which is exactly when both implications hold.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason explains definition of biconditional.",
      definitions: [
        { term: "Biconditional (⇔)", definition: "True when P and Q have same truth value.", example: "True⇔True = True; True⇔False = False." },
        { term: "Logical Equivalence", definition: "Identical truth tables.", example: "P⇔Q and (P⇒Q)∧(Q⇒P) have same truth table." }
      ],
      steps: [
        { step: 1, action: "Truth table", expression: "P, Q", law: "Truth table" },
        { step: 2, action: "Compute P⇔Q", expression: "1 when P=Q", law: "Biconditional" },
        { step: 3, action: "Compute (P⇒Q)∧(Q⇒P)", expression: "1 only when both implications true", law: "Implication" },
        { step: 4, action: "Compare", expression: "Identical columns", law: "Equivalence" }
      ],
      truthTable: {
        headers: ["P","Q","P⇒Q","Q⇒P","(P⇒Q)∧(Q⇒P)","P⇔Q"],
        rows: [
          [0,0,1,1,1,1],
          [0,1,1,0,0,0],
          [1,0,0,1,0,0],
          [1,1,1,1,1,1]
        ]
      },
      finalRemark: "Columns 5 and 6 identical. Reason correctly defines biconditional."
    },
    reasonDiscussion: "The reason is true: the biconditional is true exactly when both P⇒Q and Q⇒P are true (i.e., P and Q imply each other). This is the standard definition. The assertion states that logical equivalence. The reason explains the equivalence fully. Option A is correct."
  },

  // Q19: Negation of implication
  {
    id: 19,
    assertion: "The negation of (P ⇒ Q) is logically equivalent to P ∧ ¬Q.",
    reason: "An implication is false only when the antecedent is true and the consequent is false.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason explains negation of implication.",
      definitions: [
        { term: "Negation of Implication", definition: "¬(P⇒Q) ≡ P ∧ ¬Q", example: "¬(True⇒False) = ¬False = True; True ∧ ¬False = True ∧ True = True." }
      ],
      steps: [
        { step: 1, action: "Truth table", expression: "Compare ¬(P⇒Q) and P∧¬Q", law: "Truth table" },
        { step: 2, action: "Both true only when P=1, Q=0", expression: "Other rows false", law: "Equivalence" }
      ],
      truthTable: {
        headers: ["P","Q","P⇒Q","¬(P⇒Q)","¬Q","P∧¬Q"],
        rows: [
          [0,0,1,0,1,0],
          [0,1,1,0,0,0],
          [1,0,0,1,1,1],
          [1,1,1,0,0,0]
        ]
      },
      finalRemark: "Columns 4 and 6 identical. Reason correctly identifies the only falsifying condition of implication."
    },
    reasonDiscussion: "The reason is true: an implication P⇒Q is false only when P is true and Q is false. Therefore its negation ¬(P⇒Q) is true exactly in that case. That matches P ∧ ¬Q, which is also true only when P true and Q false. Thus they are logically equivalent. The reason directly explains the assertion. Option A is correct."
  },

  // Q20: Exportation law
  {
    id: 20,
    assertion: "The expression (P ∧ Q) ⇒ R is logically equivalent to P ⇒ (Q ⇒ R).",
    reason: "Exportation states that a conjunction in the antecedent can be moved to nested implications.",
    correctOption: "A",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both true; Reason explains Exportation law.",
      definitions: [
        { term: "Exportation", definition: "(P ∧ Q) ⇒ R ≡ P ⇒ (Q ⇒ R)", example: "If (rain and cold) then slippery ≡ If rain then (if cold then slippery)." }
      ],
      steps: [
        { step: 1, action: "Truth table (3 vars)", expression: "8 rows", law: "Truth table" },
        { step: 2, action: "Compute LHS and RHS", expression: "Compare columns", law: "Logical equivalence" }
      ],
      truthTable: {
        headers: ["P","Q","R","P∧Q","(P∧Q)⇒R","Q⇒R","P⇒(Q⇒R)"],
        rows: [
          [0,0,0,0,1,1,1],
          [0,0,1,0,1,1,1],
          [0,1,0,0,1,0,1],
          [0,1,1,0,1,1,1],
          [1,0,0,0,1,1,1],
          [1,0,1,0,1,1,1],
          [1,1,0,1,0,0,0],
          [1,1,1,1,1,1,1]
        ]
      },
      finalRemark: "Columns 5 and 7 identical. Reason correctly names Exportation law."
    },
    reasonDiscussion: "The reason is true: Exportation is a well-known logical equivalence. It allows moving a conjunct from the antecedent to an outer implication. The assertion states that equivalence. The reason explains the transformation. Option A is correct."
  },
    // Q21: Converse of an implication with geometric example
  {
    id: 21,
    assertion: "p = I am a triangle, q = I am a three-sided polygon, s₁ = p → q, s₂ = q → p s₂ is converse of s₁, where s₁ = p → q and s₂ = q → p.",
    reason: "Three-sided polygon must be a triangle.",
    correctOption: "B",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are false."
    ],
    explanation: {
      summary: "Both Assertion and Reason are true, but the Reason does not explain the Assertion.",
      definitions: [
        { term: "Converse", definition: "The converse of an implication P ⇒ Q is Q ⇒ P.", example: "For 'If it rains, then ground is wet', converse is 'If ground is wet, then it rains'." },
        { term: "Implication (⇒)", definition: "A logical connective meaning 'if...then'.", example: "p → q means 'If I am a triangle, then I am a three-sided polygon'." }
      ],
      steps: [
        { step: 1, action: "Identify s₁", expression: "s₁ = p → q", law: "Given" },
        { step: 2, action: "Identify s₂", expression: "s₂ = q → p", law: "Given" },
        { step: 3, action: "Recall definition of converse", expression: "Converse of (p → q) is (q → p)", law: "Definition of converse" },
        { step: 4, action: "Compare", expression: "s₂ matches the converse of s₁", law: "Logical identification" },
        { step: 5, action: "Conclusion on Assertion", expression: "Assertion is true", law: "Verification" }
      ],
      truthTable: {
        headers: ["p (triangle)", "q (3‑sided polygon)", "p → q", "q → p (converse)"],
        rows: [
          [0, 0, 1, 1],
          [0, 1, 1, 0],
          [1, 0, 0, 1],
          [1, 1, 1, 1]
        ]
      },
      finalRemark: "The truth table shows that q → p is indeed the converse of p → q. The Assertion is true. The Reason is also true: a three-sided polygon is by definition a triangle. However, the Reason does not explain what a converse is; it merely states a geometric fact about triangles. Therefore option B is correct."
    },
    reasonDiscussion: "The Reason states: 'Three-sided polygon must be a triangle.' This is a true statement in Euclidean geometry. It confirms that the implication q → p ('If I am a three-sided polygon, then I am a triangle') is true. However, the Assertion is about the logical relationship between s₁ and s₂ – specifically, that s₂ is the converse of s₁. The definition of converse does not depend on the actual truth values of p and q; it is purely syntactic: swapping antecedent and consequent. The Reason does not mention or define 'converse' at all. Therefore, while both statements are true, the Reason is not the correct explanation for the Assertion. The correct option is B."
  }

];