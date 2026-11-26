// Topic 3 FAQs - 25 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is a Full Adder?",
    "answer": "A combinational circuit that computes the arithmetic sum of three 1-bit binary inputs: A, B, and an incoming carry Cin.",
    "explanation": "It produces two binary outputs: Sum (S) and Carry-out (Cout), allowing multi-bit binary numbers to be added in cascade."
  },
  {
    "id": 2,
    "question": "What are the Boolean equations for the Full Adder outputs?",
    "answer": "Sum = A ⊕ B ⊕ Cin; Cout = A·B + B·Cin + A·Cin (or A·B + Cin·(A ⊕ B)).",
    "explanation": "Sum is the 3-variable XOR operation (parity), while Cout is generated when at least two of the three inputs are at logic 1."
  },
  {
    "id": 3,
    "question": "How many rows are in the Full Adder truth table?",
    "answer": "Exactly 8 rows (representing binary combinations 000₂ to 111₂).",
    "explanation": "Since there are 3 binary inputs (A, B, Cin), the truth table contains 2³ = 8 rows."
  },
  {
    "id": 4,
    "question": "What are the Sum and Cout values when A=1, B=1, and Cin=1?",
    "answer": "Sum = 1 and Cout = 1 (representing decimal 3, which is 11₂ in binary).",
    "explanation": "1 + 1 + 1 = 3₁₀ = 11₂. The lower bit is Sum=1, and the higher bit is Carry-out=1."
  },
  {
    "id": 5,
    "question": "What are the canonical minterms for the Full Adder Sum and Cout?",
    "answer": "Sum = Σm(1, 2, 4, 7); Cout = Σm(3, 5, 6, 7).",
    "explanation": "Sum is 1 whenever an odd number of inputs are 1 (1, 2, 4, 7). Cout is 1 whenever two or more inputs are 1 (3, 5, 6, 7)."
  },
  {
    "id": 6,
    "question": "How is Cout simplified using a Karnaugh Map (K-map)?",
    "answer": "By grouping the four 1s into three pairs of 2 cells, yielding Cout = AB + BCin + ACin.",
    "explanation": "The pairs group minterms (3,7) → BCin, (5,7) → ACin, and (6,7) → AB."
  },
  {
    "id": 7,
    "question": "What gates are used in a basic discrete gate implementation of a Full Adder?",
    "answer": "A 3-input XOR gate for Sum, and three 2-input AND gates plus one 3-input OR gate for Cout.",
    "explanation": "Alternatively, two 2-input XOR gates can be cascaded for Sum, and two AND gates plus one OR gate for Cout."
  },
  {
    "id": 8,
    "question": "How is a multi-bit Parallel Binary Adder (Ripple Carry Adder) formed using Full Adders?",
    "answer": "By connecting n Full Adders in cascade, where the Cout of each stage is wired to the Cin of the next higher significant stage.",
    "explanation": "For an n-bit adder, n Full Adders (or 1 Half Adder + (n-1) Full Adders) add the numbers bit by bit, rippling the carry from right to left."
  },
  {
    "id": 9,
    "question": "What is the primary speed limitation of a Ripple Carry Adder?",
    "answer": "Carry propagation delay through the entire chain of Full Adders.",
    "explanation": "Each Full Adder stage must wait for the carry output of the previous stage before its own carry output becomes valid."
  },
  {
    "id": 10,
    "question": "How do Carry Lookahead Adders (CLA) overcome ripple carry delay?",
    "answer": "By calculating carry signals in advance using Carry Generate (G = AB) and Carry Propagate (P = A ⊕ B) logic.",
    "explanation": "CLA circuits compute all carry signals in parallel within 2-3 gate delays, bypassing sequential ripple delays."
  },
  {
    "id": 11,
    "question": "How many NAND gates are required to construct a Full Adder?",
    "answer": "Exactly 9 NAND gates.",
    "explanation": "A Full Adder can be constructed from two Half Adders (5+4=9 NAND gates), because one internal NAND gate can be shared."
  },
  {
    "id": 12,
    "question": "What is the function of the Carry Generate (Gi) and Carry Propagate (Pi) terms?",
    "answer": "Gi = Ai · Bi (produces carry regardless of Cin); Pi = Ai ⊕ Bi (propagates incoming carry to Cout).",
    "explanation": "Using these terms: Cout = Gi + Pi · Cin. This formulation forms the basis of both Full Adder cascading and fast adders."
  },
  {
    "id": 13,
    "question": "Can a Full Adder be used as a Full Subtractor?",
    "answer": "Yes, by inverting one operand (1's complement) and asserting Cin = 1 to perform 2's complement subtraction.",
    "explanation": "In an Adder-Subtractor circuit, XOR gates conditionally invert the B inputs when a control signal SUB=1, and set Cin=1."
  },
  {
    "id": 14,
    "question": "Why does Sum = A ⊕ B ⊕ Cin produce 1 for minterm 7 (111)?",
    "answer": "Because 1 ⊕ 1 = 0, and 0 ⊕ 1 = 1.",
    "explanation": "XOR is associative: (1 ⊕ 1) ⊕ 1 = 0 ⊕ 1 = 1. Since minterm 7 has three 1s (an odd count), the XOR output is 1."
  },
  {
    "id": 15,
    "question": "What is the common CISCE exam question for 4 marks on Full Adders?",
    "answer": "'State the truth table of a Full Adder, derive the simplified Boolean expressions for Sum and Carry-out, and draw the gate circuit.'",
    "explanation": "1 mark for truth table, 1 mark for Sum derivation, 1 mark for Carry derivation, and 1 mark for clean schematic."
  },
  {
    "id": 16,
    "question": "What are the 3 inputs and 2 outputs of a 1-bit Full Adder?",
    "answer": "Inputs: Addend bit A, Augend bit B, and Carry-in Cin; Outputs: Sum S and Carry-out Cout.",
    "explanation": "The Full Adder handles the complete arithmetic requirement of an arbitrary bit-slice in an n-bit parallel binary adder."
  },
  {
    "id": 17,
    "question": "What is the algebraic expression for the Sum (S) of a Full Adder?",
    "answer": "S = A ⊕ B ⊕ Cin.",
    "explanation": "Sum is the 3-input XOR of all three operands, producing 1 whenever an odd number of the three inputs are 1 (minterms m1, m2, m4, m7)."
  },
  {
    "id": 18,
    "question": "What is the canonical Sum-of-Products (SOP) minterm form of Carry-out (Cout)?",
    "answer": "Cout = Σm(3, 5, 6, 7) = A'BCin + AB'Cin + ABCin' + ABCin.",
    "explanation": "Carry-out is 1 whenever two or more inputs are 1. Grouping minterms on a K-map simplifies this to Cout = AB + BCin + ACin."
  },
  {
    "id": 19,
    "question": "How can Cout be factored to share the intermediate XOR term (A ⊕ B) with Sum?",
    "answer": "Cout = AB + Cin(A ⊕ B).",
    "explanation": "Since Sum uses (A ⊕ B), reusing this term to compute Carry eliminates redundant gates when building a Full Adder from Half Adders."
  },
  {
    "id": 20,
    "question": "What is the result when all three inputs of a Full Adder are 1 (A = 1, B = 1, Cin = 1)?",
    "answer": "Sum = 1, Carry-out = 1 (binary '11', which is decimal 3).",
    "explanation": "1 + 1 + 1 = 3 (decimal) = 11 (binary). Both Sum and Carry-out pins are driven HIGH."
  },
  {
    "id": 21,
    "question": "How many total rows exist in the Truth Table of a Full Adder?",
    "answer": "Exactly 8 rows (2^3 = 8 combinations, from 000 to 111).",
    "explanation": "Three binary inputs (A, B, Cin) produce 8 distinct combinations, with Sum = 1 in 4 rows and Cout = 1 in 4 rows."
  },
  {
    "id": 22,
    "question": "How many NAND gates are required to construct a Full Adder from scratch?",
    "answer": "Exactly 9 NAND gates.",
    "explanation": "Using two 4-NAND XOR structures plus 1 NAND gate for the combined carry logic yields a 9-NAND gate realization."
  },
  {
    "id": 23,
    "question": "What is a Ripple Carry Adder (RCA) and how does it use Full Adders?",
    "answer": "An n-bit adder formed by cascading n 1-bit Full Adders, where the Cout of each stage is connected to the Cin of the next higher stage.",
    "explanation": "In an RCA, carry ripples sequentially from LSB to MSB, making total latency proportional to n × t_carry."
  },
  {
    "id": 24,
    "question": "How does a Carry Lookahead Adder (CLA) overcome the carry propagation delay of a Ripple Carry Adder?",
    "answer": "By calculating carry signals in advance using Carry Generate (G = AB) and Carry Propagate (P = A ⊕ B) logic equations.",
    "explanation": "CLA computes all carries simultaneously in two gate levels, eliminating the sequential ripple delay across bit stages."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE board question for a Full Adder?",
    "answer": "State definition, draw the complete 8-row Truth Table, derive Sum and Carry-out equations, and draw the logic gate circuit.",
    "explanation": "Usually carrying 4 to 5 marks, full credit demands exact derivation of S = A ⊕ B ⊕ Cin and Cout = AB + BCin + ACin."
  }
];

export default faqs;
