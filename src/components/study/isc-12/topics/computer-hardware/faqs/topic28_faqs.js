// Topic 28 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is the direct variable capacity of an 8-to-1 multiplexer for function implementation?",
    "answer": "It can directly implement any 3-variable function without extra gates, or any 4-variable function using the residual variable method.",
    "explanation": "With 3 select lines, an 8-to-1 MUX has 8 inputs matching all 8 minterms of 3 variables, or 8 pairs of minterms for 4 variables."
  },
  {
    "id": 2,
    "question": "How is a 3-variable function F(A, B, C) implemented directly on an 8-to-1 MUX?",
    "answer": "Connect A, B, C to select lines S2, S1, S0; tie inputs D_i to 1 if minterm m_i is present in F, and tie to 0 if absent.",
    "explanation": "Because each select combination corresponds to one minterm, asserting 1 at that data input directly outputs 1 when selected."
  },
  {
    "id": 3,
    "question": "How is a 4-variable function F(A, B, C, D) implemented on an 8-to-1 MUX using the residual variable method?",
    "answer": "Connect A, B, C to select lines S2, S1, S0; connect each data input D0-D7 to {0, 1, D, D'} determined from an implementation table.",
    "explanation": "The 16 minterms are partitioned across the 8 data inputs, where each input corresponds to two minterms differing only in D."
  },
  {
    "id": 4,
    "question": "Explain the construction of the 8-column, 2-row Implementation Table for a 4-variable function with residual variable D.",
    "answer": "Columns are labeled D0 through D7; Row 1 is labeled D' (minterms 0, 2, 4, 6, 8, 10, 12, 14); Row 2 is labeled D (minterms 1, 3, 5, 7, 9, 11, 13, 15).",
    "explanation": "Minterm 2k is placed in Row D', and minterm 2k+1 is placed in Row D under column D_k."
  },
  {
    "id": 5,
    "question": "In the 4-variable implementation table, what minterms correspond to column D_k?",
    "answer": "Minterm 2k (where D=0) and minterm 2k+1 (where D=1).",
    "explanation": "For example, column D3 contains minterm 6 (2×3) in the D' row and minterm 7 (2×3+1) in the D row."
  },
  {
    "id": 6,
    "question": "Implement F(A, B, C, D) = Σ(0, 1, 3, 4, 8, 9, 10, 11, 15) using an 8-to-1 MUX with A, B, C as select lines.",
    "answer": "D0=1, D1=D, D2=D', D3=0, D4=1, D5=1, D6=0, D7=D.",
    "explanation": "D0: 0,1 circled -> 1; D1: 3 circled -> D; D2: 4 circled -> D'; D3: none circled -> 0; D4: 8,9 circled -> 1; D5: 10,11 circled -> 1; D6: none circled -> 0; D7: 15 circled -> D."
  },
  {
    "id": 7,
    "question": "Implement a 1-bit Full Adder Sum = Σ(1, 2, 4, 7) directly using an 8-to-1 MUX.",
    "answer": "Connect A, B, C to select lines S2, S1, S0; connect D1, D2, D4, D7 to VCC (1); connect D0, D3, D5, D6 to GND (0).",
    "explanation": "Every minterm present in the Sum expression is tied to logic 1, and all others to logic 0. No extra gates are needed."
  },
  {
    "id": 8,
    "question": "Implement Full Adder Carry = Σ(3, 5, 6, 7) directly using an 8-to-1 MUX.",
    "answer": "Connect A, B, C to select lines S2, S1, S0; connect D3, D5, D6, D7 to VCC (1); connect D0, D1, D2, D4 to GND (0).",
    "explanation": "Like Sum, Carry is realized purely by connecting the minterm inputs to VCC and GND."
  },
  {
    "id": 9,
    "question": "What if B, C, D are chosen as select lines and A is the residual variable? How does the implementation table change?",
    "answer": "Row 1 contains A' (minterms 0 to 7) and Row 2 contains A (minterms 8 to 15) under columns D0 to D7.",
    "explanation": "Each column D_k now contains minterm k (for A=0) and minterm k+8 (for A=1)."
  },
  {
    "id": 10,
    "question": "How does Shannon's Expansion Theorem mathematically validate 4-variable synthesis on an 8-to-1 MUX?",
    "answer": "F(A,B,C,D) = Σ m_i(A,B,C) · F_i(D), where F_i(D) is the 1-variable cofactor assigned to data input D_i.",
    "explanation": "Shannon's theorem decomposes any n-variable function into sum of product terms of (n-1) variables multiplying 1-variable sub-functions."
  },
  {
    "id": 11,
    "question": "How are 'don't care' conditions handled in an 8-to-1 MUX implementation table?",
    "answer": "Don't cares (d) are circled optionally if circling them simplifies the input value to a constant 1 or eliminates an inverter.",
    "explanation": "For example, if minterm 2 is in F and minterm 3 is a don't care, circling 3 makes column D1 = 1 instead of D', saving a NOT gate."
  },
  {
    "id": 12,
    "question": "Can a 5-variable function be implemented on an 8-to-1 MUX?",
    "answer": "Yes, by using 3 select lines and deriving the 8 data inputs from functions of the 2 remaining residual variables using external gates.",
    "explanation": "Each data input will receive a 2-variable function of D and E (requiring AND, OR, or NOT gates)."
  },
  {
    "id": 13,
    "question": "What is the hardware advantage of implementing Boolean functions with an 8-to-1 MUX over discrete gates?",
    "answer": "It replaces multiple AND, OR, and NOT IC packages with a single 16-pin IC, reducing PCB space, assembly cost, and wire count.",
    "explanation": "A single 74LS151 replaces up to four 14-pin gate ICs while allowing effortless logic changes by rewiring input pins."
  },
  {
    "id": 14,
    "question": "What occurs if an unassigned data input of a CMOS 8-to-1 MUX is left unconnected (floating)?",
    "answer": "The floating input can float to an intermediate voltage, causing high static current draw and unpredictable output logic oscillations.",
    "explanation": "High-impedance CMOS inputs must always be tied firmly to VCC (logic 1) or GND (logic 0)."
  },
  {
    "id": 15,
    "question": "What formatting and presentation are required by CISCE examiners for full marks on MUX implementation questions?",
    "answer": "1. Specify select lines and residual variable. 2. Neatly draw the implementation table with circled minterms. 3. Tabulate D0-D7 values. 4. Draw the complete circuit diagram.",
    "explanation": "Presenting each step methodically ensures that all rubric criteria are fulfilled, earning the full 5/5 marks."
  }
];

export default faqs;
