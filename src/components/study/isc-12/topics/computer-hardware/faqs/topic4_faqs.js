// Topic 4 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "How many Half Adders and OR gates are required to construct a Full Adder?",
    "answer": "Exactly 2 Half Adders and 1 OR gate.",
    "explanation": "This is one of the most frequently asked questions in ISC Class 12 Computer Science Section A."
  },
  {
    "id": 2,
    "question": "What are the inputs and outputs of the First Half Adder (HA1)?",
    "answer": "Inputs: A and B; Outputs: S1 = A ⊕ B and C1 = A · B.",
    "explanation": "HA1 adds the two primary operand bits and generates an intermediate sum S1 and intermediate carry C1."
  },
  {
    "id": 3,
    "question": "What are the inputs and outputs of the Second Half Adder (HA2)?",
    "answer": "Inputs: S1 (from HA1) and Cin; Outputs: Final Sum = S1 ⊕ Cin and C2 = S1 · Cin.",
    "explanation": "HA2 adds the intermediate sum S1 to the third bit Cin, producing the final Full Adder Sum and an intermediate carry C2."
  },
  {
    "id": 4,
    "question": "What is the input to the final OR gate in the cascaded Full Adder?",
    "answer": "The two intermediate carries C1 (from HA1) and C2 (from HA2).",
    "explanation": "The OR gate computes Cout = C1 + C2 = A·B + (A ⊕ B)·Cin."
  },
  {
    "id": 5,
    "question": "Can both intermediate carries C1 and C2 ever be 1 simultaneously?",
    "answer": "No, C1 and C2 are mutually exclusive; they can never be 1 at the same time.",
    "explanation": "C1 = 1 requires A=1 and B=1, which makes S1 = A ⊕ B = 0. If S1 = 0, then C2 = S1 · Cin = 0 · Cin = 0. Hence C1 · C2 = 0 always."
  },
  {
    "id": 6,
    "question": "Because C1 and C2 are mutually exclusive, could an XOR gate replace the OR gate for Cout?",
    "answer": "Yes, Cout = C1 + C2 is identical to Cout = C1 ⊕ C2.",
    "explanation": "For mutually exclusive events where C1 · C2 = 0, C1 + C2 = C1 ⊕ C2. However, an OR gate is standard because it is simpler and faster."
  },
  {
    "id": 7,
    "question": "Provide the algebraic proof that Cout = C1 + C2 equals AB + BCin + ACin.",
    "answer": "Cout = AB + (A'B + AB')Cin = AB + A'BCin + AB'Cin = AB(1 + Cin) + A'BCin + AB'Cin = AB + BCin(A + A') + ACin(B + B') = AB + BCin + ACin.",
    "explanation": "Expanding (A ⊕ B) into A'B + AB' and applying Boolean absorption laws leads directly to the standard majority carry equation."
  },
  {
    "id": 8,
    "question": "What is the total propagation delay of a Full Adder made from two Half Adders and an OR gate?",
    "answer": "Delay for Sum = 2 × t_XOR; Delay for Carry = t_XOR + t_AND + t_OR.",
    "explanation": "Sum must pass through two successive XOR gates (HA1 then HA2). Carry-out must pass through HA1's XOR, HA2's AND, and the final OR gate."
  },
  {
    "id": 9,
    "question": "Draw the block diagram description of the cascaded circuit.",
    "answer": "Block HA1 receives A and B, sending S1 to HA2 and C1 to the OR gate. HA2 receives S1 and Cin, sending Sum out and C2 to the OR gate. The OR gate outputs Cout.",
    "explanation": "Examiners look for clear labeling of HA1, HA2, S1, C1, C2, and the final OR gate."
  },
  {
    "id": 10,
    "question": "Why is implementing a Full Adder using two Half Adders modularly advantageous?",
    "answer": "It allows hierarchical modular design, where a pre-verified Half Adder cell is reused across the chip layout.",
    "explanation": "Modular reuse simplifies IC testing, standard cell layout, and verification in VLSI CAD tools."
  },
  {
    "id": 11,
    "question": "How many total elementary gates (XOR, AND, OR) are used in this implementation?",
    "answer": "Two XOR gates, two AND gates, and one OR gate (5 gates total).",
    "explanation": "Each Half Adder contains 1 XOR and 1 AND (total 2 XOR + 2 AND), plus the 1 final OR gate."
  },
  {
    "id": 12,
    "question": "What are the intermediate signal values when A=1, B=0, and Cin=1?",
    "answer": "S1 = 1 ⊕ 0 = 1, C1 = 1 · 0 = 0, Sum = 1 ⊕ 1 = 0, C2 = 1 · 1 = 1, Cout = 0 + 1 = 1.",
    "explanation": "The circuit produces Sum = 0 and Cout = 1 (1 + 0 + 1 = 2₁₀ = 10₂)."
  },
  {
    "id": 13,
    "question": "What are the intermediate signal values when A=1, B=1, and Cin=0?",
    "answer": "S1 = 1 ⊕ 1 = 0, C1 = 1 · 1 = 1, Sum = 0 ⊕ 0 = 0, C2 = 0 · 0 = 0, Cout = 1 + 0 = 1.",
    "explanation": "Here C1 produces the carry directly from HA1, while C2 is 0. Cout becomes 1."
  },
  {
    "id": 14,
    "question": "Why does CISCE repeatedly ask for the algebraic proof of Cout?",
    "answer": "To test whether students can manipulate XOR expressions and apply Boolean distributive and absorption theorems correctly.",
    "explanation": "Many students memorize the final formula without being able to expand A ⊕ B algebraically."
  },
  {
    "id": 15,
    "question": "What is the single most common drawing pitfall in this question?",
    "answer": "Connecting Cin to HA1 instead of HA2, or forgetting the final OR gate.",
    "explanation": "HA1 must only take primary inputs A and B; Cin must enter HA2 alongside HA1's sum S1."
  }
];

export default faqs;
