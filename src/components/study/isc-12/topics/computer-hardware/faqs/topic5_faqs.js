// Topic 5 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is a Half Subtractor?",
    "answer": "A combinational circuit that subtracts one binary bit (B, the subtrahend) from another (A, the minuend) and produces Difference and Borrow.",
    "explanation": "It computes A - B for single-bit inputs without accommodating a borrow from a lower significant position."
  },
  {
    "id": 2,
    "question": "What are the Boolean equations for the Difference and Borrow of a Half Subtractor?",
    "answer": "Difference (D) = A ⊕ B; Borrow (B_out) = A' · B.",
    "explanation": "Difference is identical to the Half Adder Sum (A ⊕ B). Borrow requires an inverter on A because a borrow is needed only when subtracting 1 from 0 (0 - 1)."
  },
  {
    "id": 3,
    "question": "State the 4-row truth table for a Half Subtractor.",
    "answer": "0-0: D=0, B=0; 0-1: D=1, B=1; 1-0: D=1, B=0; 1-1: D=0, B=0.",
    "explanation": "In binary: 0 - 1 requires borrowing 1 from the next higher position (weight 2), giving 2 - 1 = 1, so Difference=1 and Borrow=1."
  },
  {
    "id": 4,
    "question": "Which gates are required to implement a Half Subtractor?",
    "answer": "One 2-input XOR gate, one NOT gate (inverter), and one 2-input AND gate.",
    "explanation": "Inputs A and B feed the XOR gate to produce Difference. Input A passes through the NOT gate to become A', which is ANDed with B to produce Borrow."
  },
  {
    "id": 5,
    "question": "Why is Borrow equal to A'B and NOT AB'?",
    "answer": "Because Borrow is generated when Minuend A = 0 and Subtrahend B = 1 (A'B).",
    "explanation": "Subtracting 1 from 0 generates a borrow. Subtracting 0 from 1 (1 - 0) equals 1 without any borrow."
  },
  {
    "id": 6,
    "question": "How many NAND gates are required to build a Half Subtractor?",
    "answer": "Exactly 5 NAND gates.",
    "explanation": "Four NAND gates generate the Difference (A ⊕ B), and an additional NAND gate combined with an inverter synthesizes Borrow (A'B)."
  },
  {
    "id": 7,
    "question": "How many NOR gates are required to implement a Half Subtractor?",
    "answer": "Exactly 5 NOR gates.",
    "explanation": "By dual logic, a 5-NOR gate network can also synthesize both Difference and Borrow."
  },
  {
    "id": 8,
    "question": "What are the minterm expansions for Difference and Borrow?",
    "answer": "Difference = Σm(1, 2); Borrow = Σm(1).",
    "explanation": "Row 1 (A=0, B=1) produces D=1 and B=1. Row 2 (A=1, B=0) produces D=1 and B=0."
  },
  {
    "id": 9,
    "question": "What is the minuend and what is the subtrahend?",
    "answer": "The minuend is the number being subtracted from (A); the subtrahend is the number being subtracted (B).",
    "explanation": "Operation: Minuend - Subtrahend = A - B."
  },
  {
    "id": 10,
    "question": "Why cannot a Half Subtractor handle multi-bit subtraction?",
    "answer": "Because it lacks a third input for Borrow-in (Bin) borrowed by a previous stage.",
    "explanation": "In multi-bit subtraction, every position except the least significant bit must handle three bits: Minuend, Subtrahend, and Borrow-in."
  },
  {
    "id": 11,
    "question": "What is the similarity between a Half Adder and a Half Subtractor?",
    "answer": "Both have the exact same primary output equation: Sum = Difference = A ⊕ B.",
    "explanation": "The modulo-2 sum and difference of two bits are identical: 0⊕0=0, 0⊕1=1, 1⊕0=1, 1⊕1=0."
  },
  {
    "id": 12,
    "question": "How can a Half Adder circuit be modified into a Half Subtractor?",
    "answer": "By inserting an inverter (NOT gate) on input line A before it enters the Carry AND gate.",
    "explanation": "The XOR gate remains untouched, while the Carry output (AB) converts to Borrow (A'B)."
  },
  {
    "id": 13,
    "question": "What is the propagation delay of a Half Subtractor?",
    "answer": "For Difference: t_XOR; For Borrow: t_NOT + t_AND.",
    "explanation": "The borrow path incurs an extra inverter delay before the AND gate triggers."
  },
  {
    "id": 14,
    "question": "Can 2's complement addition replace the need for physical subtractors in modern CPUs?",
    "answer": "Yes, modern CPUs perform subtraction by adding the 2's complement of B using an adder circuit: A - B = A + B' + 1.",
    "explanation": "This allows the exact same adder hardware to perform both addition and subtraction, saving chip area."
  },
  {
    "id": 15,
    "question": "What is the most frequent student mistake in Half Subtractor questions?",
    "answer": "Placing the inverter on B instead of A, resulting in Borrow = AB' instead of A'B.",
    "explanation": "Writing Borrow as AB' means you are computing B - A instead of A - B, which receives 0 marks."
  }
];

export default faqs;
