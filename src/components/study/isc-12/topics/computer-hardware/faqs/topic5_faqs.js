// Topic 5 FAQs - 25 Comprehensive Questions and Answers
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
  },
  {
    "id": 16,
    "question": "What are the two binary outputs of a Half Subtractor?",
    "answer": "Difference (D) and Borrow-out (B).",
    "explanation": "Difference represents the result of A - B; Borrow-out indicates whether the minuend A needed to borrow 1 from the next higher position (when A < B)."
  },
  {
    "id": 17,
    "question": "What is the Boolean expression for the Difference (D) of a Half Subtractor?",
    "answer": "D = A ⊕ B = A'B + AB'.",
    "explanation": "Notice that Difference is mathematically identical to the Sum output of a Half Adder."
  },
  {
    "id": 18,
    "question": "What is the Boolean expression for the Borrow (B) of a Half Subtractor?",
    "answer": "B = A' · B.",
    "explanation": "Borrow is 1 only when A = 0 and B = 1 (i.e. computing 0 - 1 = 1 with a borrow of 1)."
  },
  {
    "id": 19,
    "question": "Compare the logic equations of a Half Adder and a Half Subtractor.",
    "answer": "Sum = A ⊕ B and Difference = A ⊕ B (identical); Carry = A · B whereas Borrow = A' · B (differs by an inverter on input A).",
    "explanation": "Because Difference and Sum share the same XOR logic, a Half Adder can be converted to a Half Subtractor simply by inverting input A before the AND gate."
  },
  {
    "id": 20,
    "question": "What is the Truth Table of a Half Subtractor for all 4 input combinations?",
    "answer": "(0,0) → D=0, B=0; (0,1) → D=1, B=1; (1,0) → D=1, B=0; (1,1) → D=0, B=0.",
    "explanation": "Only the combination A=0, B=1 generates a borrow because subtracting 1 from 0 in base-2 yields 1 with a borrow of 1 (binary 10 - 1 = 1)."
  },
  {
    "id": 21,
    "question": "How many 2-input NAND gates are needed to construct a complete Half Subtractor?",
    "answer": "Exactly 5 NAND gates.",
    "explanation": "4 NAND gates generate Difference = A ⊕ B, and 1 NAND gate coupled with intermediate terms produces Borrow = A'B."
  },
  {
    "id": 22,
    "question": "Why cannot a Half Subtractor subtract multi-bit binary numbers?",
    "answer": "Because it lacks a Borrow-in (Bin) input from the preceding lower-order bit subtraction stage.",
    "explanation": "Like a Half Adder, it only handles two 1-bit inputs and cannot incorporate a borrow generated by a lower column."
  },
  {
    "id": 23,
    "question": "What is the role of the Minuend and Subtrahend in binary subtraction?",
    "answer": "Minuend is the number from which another number is subtracted (A); Subtrahend is the number to be subtracted (B). Result is Minuend - Subtrahend.",
    "explanation": "When Minuend < Subtrahend (0 < 1), Borrow becomes 1."
  },
  {
    "id": 24,
    "question": "How can a Half Adder and an inverter be combined to form a Half Subtractor?",
    "answer": "Keep the XOR gate for Difference (A ⊕ B); invert input A to A' and feed A' and B into the AND gate to generate Borrow (A'B).",
    "explanation": "This highlights the minimal hardware difference between binary addition and subtraction."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE marking scheme for a Half Subtractor question?",
    "answer": "1 mark for definition, 1 mark for Truth Table, 1 mark for Boolean equations (D = A ⊕ B, B = A'B), and 1 mark for logic gate diagram.",
    "explanation": "Points are deducted if the NOT gate is placed on input B instead of input A for the Borrow output."
  }
];

export default faqs;
