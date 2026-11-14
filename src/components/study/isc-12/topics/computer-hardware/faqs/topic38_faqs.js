// Topic 38 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What are the canonical minterm expressions for a 1-Bit Full Adder?",
    "answer": "Sum = Σ(1, 2, 4, 7) and Carry-out (Cout) = Σ(3, 5, 6, 7) for inputs A, B, and Cin.",
    "explanation": "Sum is odd parity (active when 1 or 3 inputs are 1); Carry is active when 2 or 3 inputs are 1."
  },
  {
    "id": 2,
    "question": "How many 4:1 multiplexers are needed to implement a 1-Bit Full Adder?",
    "answer": "Two 4:1 multiplexers (one for Sum and one for Carry).",
    "explanation": "Each 4:1 MUX synthesizes one independent Boolean output function of the 3 input variables."
  },
  {
    "id": 3,
    "question": "Which variables are connected to the selection lines of both 4:1 MUXes?",
    "answer": "Variable B connects to S1 and Cin connects to S0 on both multiplexers in parallel.",
    "explanation": "Sharing the selection bus ensures both multiplexers switch simultaneously based on the lower two address variables."
  },
  {
    "id": 4,
    "question": "Which variable is singled out as the data literal for the Full Adder implementation?",
    "answer": "Variable A (the MSB / leftmost variable) is singled out.",
    "explanation": "Row 1 represents A' (minterms 0-3) and Row 2 represents A (minterms 4-7) in both implementation tables."
  },
  {
    "id": 5,
    "question": "Derive the data inputs for the Sum MUX: Sum = Σ(1, 2, 4, 7).",
    "answer": "I0 = A (Rule 3), I1 = A' (Rule 4), I2 = A' (Rule 4), I3 = A (Rule 3).",
    "explanation": "Column I0: minterm 4 circled (bottom) -> A; I1: 1 circled (top) -> A'; I2: 2 circled (top) -> A'; I3: 7 circled (bottom) -> A."
  },
  {
    "id": 6,
    "question": "Derive the data inputs for the Carry MUX: Cout = Σ(3, 5, 6, 7).",
    "answer": "I0 = 0 (Rule 1), I1 = A (Rule 3), I2 = A (Rule 3), I3 = 1 (Rule 2).",
    "explanation": "Column I0: neither circled -> 0; I1: 5 circled (bottom) -> A; I2: 6 circled (bottom) -> A; I3: both 3 and 7 circled -> 1."
  },
  {
    "id": 7,
    "question": "How many external inverters (NOT gates) are required for the entire Full Adder MUX circuit?",
    "answer": "Only ONE inverter gate.",
    "explanation": "The single inverter generates A' from input A, which is shared by inputs I1 and I2 of the Sum multiplexer."
  },
  {
    "id": 8,
    "question": "Why is the dual 4:1 MUX commercial IC (74153) ideal for Full Adder implementation?",
    "answer": "Because the 74153 contains two complete 4:1 MUXes that share common select lines S1 and S0 on-chip.",
    "explanation": "This matches the exact architectural requirement of the Full Adder, implementing the entire circuit in a single 16-pin package."
  },
  {
    "id": 9,
    "question": "Prove algebraically that the Sum MUX output equals A ⊕ B ⊕ Cin.",
    "answer": "Sum = B'Cin'(A) + B'Cin(A') + BCin'(A') + BCin(A) = A(B'Cin' + BCin) + A'(B'Cin + BCin') = A ⊕ (B ⊕ Cin).",
    "explanation": "Factoring confirms the exact equivalence to the standard 3-input XOR Full Adder equation."
  },
  {
    "id": 10,
    "question": "Prove algebraically that the Carry MUX output equals AB + BCin + ACin.",
    "answer": "Cout = B'Cin'(0) + B'Cin(A) + BCin'(A) + BCin(1) = A(B'Cin + BCin') + BCin = A(B ⊕ Cin) + BCin = AB + BCin + ACin.",
    "explanation": "Algebraic expansion of the MUX equation produces the standard majority carry function."
  },
  {
    "id": 11,
    "question": "What is the quiescent state of the Full Adder MUX outputs when A=0, B=0, Cin=0?",
    "answer": "Sum = 0 and Cout = 0.",
    "explanation": "With B=0, Cin=0 (S1S0=00), Sum routes I0=A=0, and Carry routes I0=0, giving 0 and 0."
  },
  {
    "id": 12,
    "question": "What is the output state when A=1, B=0, Cin=1?",
    "answer": "Sum = 0 and Cout = 1 (binary 1 + 0 + 1 = 10_2).",
    "explanation": "S1S0 = 01 (I1 selected). Sum routes I1 = A' = 0. Cout routes I1 = A = 1."
  },
  {
    "id": 13,
    "question": "How does MUX-based Full Adder implementation compare to NAND-only implementation?",
    "answer": "A NAND-only Full Adder requires 9 NAND gates with 3 levels of logic; the 74153 dual MUX requires 1 chip with 2 gate delays.",
    "explanation": "MUX implementation is faster, occupies less PCB area, and eliminates inter-gate wiring congestion."
  },
  {
    "id": 14,
    "question": "Can a Full Subtractor also be implemented using two 4:1 multiplexers sharing select lines?",
    "answer": "Yes, Difference = Σ(1, 2, 4, 7) (identical inputs to Sum) and Borrow = Σ(1, 2, 3, 7).",
    "explanation": "Borrow implementation table derives: I0=A, I1=1, I2=A', I3=1, sharing the same select bus."
  },
  {
    "id": 15,
    "question": "What marking points do CISCE examiners award for the Full Adder using 4:1 MUX question?",
    "answer": "1 mark for minterms, 1 mark for each implementation table, 1 mark for input derivations, and 1 mark for the combined circuit diagram.",
    "explanation": "Examiners verify both tables, correct Rule annotations, shared select lines (B, Cin), and the single inverter for A'."
  }
];

export default faqs;
