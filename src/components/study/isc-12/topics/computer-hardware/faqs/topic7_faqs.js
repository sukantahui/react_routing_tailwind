// Topic 7 FAQs - 25 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "How is a Full Subtractor constructed using Half Subtractors?",
    "answer": "Using two Half Subtractors (HS1 and HS2) and one 2-input OR gate.",
    "explanation": "HS1 subtracts B from A; HS2 subtracts Bin from the intermediate difference; the OR gate combines the two intermediate borrows."
  },
  {
    "id": 2,
    "question": "What are the inputs and outputs of the First Half Subtractor (HS1)?",
    "answer": "Inputs: A (minuend) and B (subtrahend); Outputs: D1 = A ⊕ B and B1 = A' · B.",
    "explanation": "HS1 performs the primary single-bit subtraction and generates intermediate difference D1 and intermediate borrow B1."
  },
  {
    "id": 3,
    "question": "What are the inputs and outputs of the Second Half Subtractor (HS2)?",
    "answer": "Inputs: D1 (from HS1) and Bin; Outputs: Final Difference = D1 ⊕ Bin and B2 = D1' · Bin.",
    "explanation": "HS2 subtracts Bin from the first difference D1, generating the final Difference and a second intermediate borrow B2."
  },
  {
    "id": 4,
    "question": "How is the final Borrow-out (Bout) generated?",
    "answer": "By passing B1 and B2 into the 2-input OR gate: Bout = B1 + B2 = A'B + (A ⊕ B)' · Bin.",
    "explanation": "A borrow occurs if either the first subtraction needed a borrow (B1) or the second subtraction needed a borrow (B2)."
  },
  {
    "id": 5,
    "question": "Can both intermediate borrows B1 and B2 ever be 1 at the same time?",
    "answer": "No, B1 and B2 are mutually exclusive; they can never be 1 simultaneously.",
    "explanation": "B1 = 1 requires A=0, B=1. This makes D1 = 0 ⊕ 1 = 1, so D1' = 0. Therefore B2 = D1' · Bin = 0 · Bin = 0. Hence B1 · B2 = 0 always."
  },
  {
    "id": 6,
    "question": "Could an XOR gate be used instead of the OR gate for Bout?",
    "answer": "Yes, because B1 and B2 are mutually exclusive (B1 · B2 = 0), B1 + B2 is mathematically equivalent to B1 ⊕ B2.",
    "explanation": "However, an OR gate is preferred in real circuits for lower propagation delay and silicon area."
  },
  {
    "id": 7,
    "question": "Give the algebraic proof that Bout = B1 + B2 simplifies to A'B + A'Bin + BBin.",
    "answer": "Bout = A'B + (A ⊕ B)'·Bin = A'B + (AB + A'B')·Bin = A'B + AB·Bin + A'B'·Bin = A'B(1 + Bin) + AB·Bin + A'B'·Bin = A'B + Bin(AB + A'B') = A'B + A'Bin + BBin.",
    "explanation": "Using (A ⊕ B)' = AB + A'B' (the XNOR equivalence) and Boolean consensus theorems simplifies to the standard 3-term borrow equation."
  },
  {
    "id": 8,
    "question": "What is the total gate delay of this cascaded subtractor?",
    "answer": "For Difference: 2 × t_XOR; For Bout: t_XOR + t_NOT + t_AND + t_OR.",
    "explanation": "D1 passes through an XOR gate in HS1 and then through the inverter and AND gate in HS2 before reaching the final OR gate."
  },
  {
    "id": 9,
    "question": "Draw the connection schematic between HS1, HS2, and the OR gate.",
    "answer": "A and B enter HS1. D1 from HS1 enters HS2 along with Bin. B1 from HS1 and B2 from HS2 enter the OR gate to output Bout. HS2 outputs Difference.",
    "explanation": "Be sure to label inputs A, B, Bin and intermediate nodes D1, B1, B2 clearly."
  },
  {
    "id": 10,
    "question": "What are the intermediate signals when A=0, B=1, and Bin=0?",
    "answer": "D1 = 0 ⊕ 1 = 1, B1 = 0' · 1 = 1, Diff = 1 ⊕ 0 = 1, B2 = 1' · 0 = 0, Bout = 1 + 0 = 1.",
    "explanation": "Here B1 supplies the borrow, while B2 is 0. Difference = 1 and Bout = 1."
  },
  {
    "id": 11,
    "question": "What are the intermediate signals when A=0, B=0, and Bin=1?",
    "answer": "D1 = 0 ⊕ 0 = 0, B1 = 0' · 0 = 0, Diff = 0 ⊕ 1 = 1, B2 = 0' · 1 = 1, Bout = 0 + 1 = 1.",
    "explanation": "Here B1 is 0, but B2 triggers because D1 is 0 and Bin is 1. Difference = 1 and Bout = 1."
  },
  {
    "id": 12,
    "question": "How many total elementary gates are used in this implementation?",
    "answer": "Two XOR gates, two NOT gates, two AND gates, and one OR gate (7 discrete gates).",
    "explanation": "Each Half Subtractor contains 1 XOR, 1 NOT, and 1 AND gate (total 6), plus the 1 final OR gate."
  },
  {
    "id": 13,
    "question": "What is the advantage of using XNOR identity (A ⊕ B)' = AB + A'B' in the proof?",
    "answer": "It allows direct expansion of B2 = (A ⊕ B)' · Bin into AB·Bin + A'B'·Bin for algebraic factoring with B1.",
    "explanation": "CISCE evaluators specifically look for this step in Section A derivations."
  },
  {
    "id": 14,
    "question": "How does this circuit compare architecturally to the Full Adder from two Half Adders?",
    "answer": "It has the identical topology: HS1 replaces HA1, HS2 replaces HA2, and the OR gate combines borrows instead of carries.",
    "explanation": "This symmetry makes learning both circuits straightforward."
  },
  {
    "id": 15,
    "question": "What is the most frequent student error when drawing this cascaded circuit?",
    "answer": "Forgetting to invert D1 inside HS2 before feeding the second borrow AND gate.",
    "explanation": "HS2 must compute D1' · Bin, not D1 · Bin. Omitting the inverter on D1 turns HS2 into a Half Adder!"
  },
  {
    "id": 16,
    "question": "What are the components required to build a Full Subtractor using Half Subtractors?",
    "answer": "Two Half Subtractors (HS1 and HS2) and one OR gate.",
    "explanation": "HS1 computes intermediate difference and borrow; HS2 subtracts Bin from the intermediate difference; the OR gate combines the two borrows."
  },
  {
    "id": 17,
    "question": "What are the inputs and outputs of the first Half Subtractor (HS1)?",
    "answer": "Inputs: A and B; Outputs: D1 = A ⊕ B, and B1 = A'B.",
    "explanation": "HS1 subtracts subtrahend B from minuend A."
  },
  {
    "id": 18,
    "question": "What are the inputs and outputs of the second Half Subtractor (HS2)?",
    "answer": "Inputs: D1 (from HS1) and Bin; Outputs: Final Difference D = D1 ⊕ Bin = A ⊕ B ⊕ Bin, and B2 = D1' · Bin = (A ⊕ B)' · Bin.",
    "explanation": "HS2 subtracts the incoming borrow Bin from the partial difference D1."
  },
  {
    "id": 19,
    "question": "Provide the algebraic proof that Bout = B1 + B2 produces the Full Subtractor borrow equation.",
    "answer": "Bout = A'B + (A ⊕ B)'Bin = A'B + (AB + A'B')Bin = A'B + ABBin + A'B'Bin = A'B(1 + Bin) + ABBin + A'B'Bin = A'B + Bin(AB + A'B' + A'B) = A'B + Bin(AB + A'(B' + B)) = A'B + A'Bin + BBin.",
    "explanation": "This derivation proves that ORing the two intermediate borrows produces the exact canonical borrow expression."
  },
  {
    "id": 20,
    "question": "Why can the two intermediate borrows (B1 and B2) be combined using an OR gate?",
    "answer": "Because B1 and B2 are mutually exclusive; both can never be 1 at the same time.",
    "explanation": "B1 = A'B is 1 only when A=0, B=1. In that case, D1 = 0 ⊕ 1 = 1, so D1' = 0, which forces B2 = D1' · Bin = 0. Since B1 · B2 = 0, B1 + B2 = B1 ⊕ B2."
  },
  {
    "id": 21,
    "question": "Draw the block diagram description of a Full Subtractor using two Half Subtractors and an OR gate.",
    "answer": "Inputs A, B → HS1. D1 from HS1 and Bin → HS2. D from HS2 is Final Difference. B1 from HS1 and B2 from HS2 → OR gate → Final Bout.",
    "explanation": "This architecture is the exact dual of the Full Adder implemented using two Half Adders and an OR gate."
  },
  {
    "id": 22,
    "question": "What is the total gate delay of this implementation?",
    "answer": "Difference delay = 2 × t_XOR; Borrow delay = t_XOR + t_NOT + t_AND + t_OR.",
    "explanation": "Difference ripples through two XOR gates, while Borrow passes through an XOR gate, an inverter, an AND gate, and an OR gate."
  },
  {
    "id": 23,
    "question": "How many discrete logic gates are present in two Half Subtractors and an OR gate?",
    "answer": "2 XOR gates, 2 NOT gates (inverters), 2 AND gates, and 1 OR gate (7 discrete gates).",
    "explanation": "Each Half Subtractor contains 1 XOR, 1 NOT, and 1 AND gate. Two Half Subtractors plus the external OR gate equals 7 gates."
  },
  {
    "id": 24,
    "question": "What happens if Bin = 0 in this circuit?",
    "answer": "HS2 receives D1 and 0, so D = D1 ⊕ 0 = D1 = A ⊕ B, and B2 = D1' · 0 = 0. Final Borrow = B1 + 0 = A'B. It reduces to a single Half Subtractor.",
    "explanation": "With zero borrow-in, the circuit operates strictly as a Half Subtractor."
  },
  {
    "id": 25,
    "question": "What common conceptual error must be avoided when drawing this circuit in board exams?",
    "answer": "Inverting Bin instead of inverting D1 at the second Half Subtractor.",
    "explanation": "Borrow in HS2 is generated because D1 is the minuend and Bin is the subtrahend, meaning D1 must be complemented: B2 = D1' · Bin."
  }
];

export default faqs;
