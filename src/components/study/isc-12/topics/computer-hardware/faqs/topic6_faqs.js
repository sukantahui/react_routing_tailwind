// Topic 6 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is a Full Subtractor?",
    "answer": "A combinational circuit that subtracts two bits (A and B) while accounting for a borrow-in (Bin) from a prior column.",
    "explanation": "It computes A - B - Bin and generates two outputs: Difference (D) and Borrow-out (Bout)."
  },
  {
    "id": 2,
    "question": "What are the Boolean equations for a Full Subtractor?",
    "answer": "Difference = A ⊕ B ⊕ Bin; Bout = A'·B + A'·Bin + B·Bin (or A'·B + Bin·(A ⊕ B)').",
    "explanation": "Difference is identical in form to the Full Adder Sum, while Bout is activated whenever borrowing is necessitated by Minuend A being 0."
  },
  {
    "id": 3,
    "question": "What is the output when A=0, B=0, and Bin=1?",
    "answer": "Difference = 1 and Bout = 1.",
    "explanation": "0 - 0 - 1 = -1. Borrowing 2 from the next column gives 2 - 1 = 1, so Difference = 1 and Borrow-out = 1."
  },
  {
    "id": 4,
    "question": "What is the output when A=0, B=1, and Bin=1?",
    "answer": "Difference = 0 and Bout = 1.",
    "explanation": "0 - 1 - 1 = -2. Borrowing 2 gives 2 - 2 = 0, so Difference = 0 and Borrow-out = 1."
  },
  {
    "id": 5,
    "question": "What are the canonical minterms for the Full Subtractor outputs?",
    "answer": "Difference = Σm(1, 2, 4, 7); Bout = Σm(1, 2, 3, 7).",
    "explanation": "Difference matches Full Adder Sum minterms exactly. Bout is 1 for minterms 001, 010, 011, and 111."
  },
  {
    "id": 6,
    "question": "How many rows are in the Full Subtractor truth table?",
    "answer": "Exactly 8 rows (from A, B, Bin = 000 to 111).",
    "explanation": "Three binary input variables yield 2³ = 8 distinct input combinations."
  },
  {
    "id": 7,
    "question": "How is Bout simplified using a 3-variable K-map?",
    "answer": "Grouping minterms (1,3), (2,3), and (3,7) yields Bout = A'B + A'Bin + BBin.",
    "explanation": "Notice the term BBin does not contain A, because if both B and Bin are 1, a borrow is inevitable regardless of A."
  },
  {
    "id": 8,
    "question": "What gate network is used to implement a basic Full Subtractor?",
    "answer": "A 3-input XOR gate for Difference, and three 2-input AND gates + two inverters + one 3-input OR gate for Bout.",
    "explanation": "Alternatively, cascaded 2-input gates can be used to mirror the two-half-subtractor architecture."
  },
  {
    "id": 9,
    "question": "What is the difference between Full Adder Cout and Full Subtractor Bout?",
    "answer": "Cout = AB + BCin + ACin; Bout = A'B + BBin + A'Bin (input A is complemented wherever it appears).",
    "explanation": "Because A is the minuend from which values are deducted, A must be 0 for borrows to initiate."
  },
  {
    "id": 10,
    "question": "Why does the combination A=1, B=1, Bin=1 produce Difference=1 and Bout=1?",
    "answer": "1 - 1 - 1 = -1. Borrowing 2 from the next column yields 2 - 1 = 1, giving D=1 and Bout=1.",
    "explanation": "This corresponds to minterm 7, which activates both outputs in both Full Adder and Full Subtractor."
  },
  {
    "id": 11,
    "question": "Can multi-bit binary subtraction be performed by chaining Full Subtractors?",
    "answer": "Yes, by chaining n Full Subtractors where the Bout of each stage feeds the Bin of the next higher bit.",
    "explanation": "This is known as a Parallel Binary Subtractor or Ripple Borrow Subtractor."
  },
  {
    "id": 12,
    "question": "How many NAND gates are needed to construct a Full Subtractor?",
    "answer": "Exactly 9 NAND gates.",
    "explanation": "Similar to the Full Adder, an efficient NAND-only implementation requires 9 gates."
  },
  {
    "id": 13,
    "question": "What is the output when A=1, B=0, and Bin=0?",
    "answer": "Difference = 1 and Bout = 0.",
    "explanation": "1 - 0 - 0 = 1 without any borrow needed."
  },
  {
    "id": 14,
    "question": "What is the output when A=1, B=1, and Bin=0?",
    "answer": "Difference = 0 and Bout = 0.",
    "explanation": "1 - 1 - 0 = 0 with no borrow."
  },
  {
    "id": 15,
    "question": "What is the critical exam tip for drawing a Full Subtractor truth table?",
    "answer": "Carefully verify rows 001, 010, 011, and 111 where Bout must be 1; row 100 has Difference=1 but Bout=0.",
    "explanation": "Students frequently confuse 1-0-0 (D=1, Bout=0) with 0-0-1 (D=1, Bout=1)."
  }
];

export default faqs;
