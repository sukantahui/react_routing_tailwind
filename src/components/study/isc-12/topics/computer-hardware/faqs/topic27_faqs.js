// Topic 27 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is the maximum number of Boolean variables a 4-to-1 MUX can implement without external logic gates?",
    "answer": "3 variables (using 2 variables as select lines and 1 variable as the residual data input).",
    "explanation": "By applying Shannon's expansion, an 8-minterm (3-variable) function can be mapped onto the 4 data inputs of a 4-to-1 MUX."
  },
  {
    "id": 2,
    "question": "How does the 'Residual Variable Method' work when implementing F(A, B, C) using a 4-to-1 MUX?",
    "answer": "Two variables (e.g., A, B) connect to select lines (S1, S0); the third variable C is evaluated to determine data inputs I0, I1, I2, I3.",
    "explanation": "For each combination of A and B, the output depends only on C, evaluating to either 0, 1, C, or C'."
  },
  {
    "id": 3,
    "question": "What are the four possible values that each multiplexer data input line (I0-I3) can receive?",
    "answer": "0 (GND), 1 (VCC), the residual variable (C), or the complemented residual variable (C').",
    "explanation": "Every single-variable Boolean function can only simplify to one of these four fundamental states."
  },
  {
    "id": 4,
    "question": "Explain how to construct the Multiplexer Implementation Table for F(A, B, C) with select lines A and B.",
    "answer": "Create a table with 4 columns (I0, I1, I2, I3) and 2 rows labeled C' (minterms 0,2,4,6) and C (minterms 1,3,5,7).",
    "explanation": "Circle the minterm numbers that are present in the given function F. Then inspect each column to deduce the input value."
  },
  {
    "id": 5,
    "question": "In an implementation table, how do you determine if an input line I_k should be connected to 0, 1, C, or C'?",
    "answer": "Both circled = 1; neither circled = 0; only bottom row (C) circled = C; only top row (C') circled = C'.",
    "explanation": "If both minterms are active, the function is 1 regardless of C. If neither is active, it is 0. If only one is active, it matches that row."
  },
  {
    "id": 6,
    "question": "Implement F(A, B, C) = Σ(1, 2, 4, 7) using a 4-to-1 MUX with A and B as select lines.",
    "answer": "I0 = C, I1 = C', I2 = C', I3 = C.",
    "explanation": "Column I0 has 1 circled -> C; Column I1 has 2 circled -> C'; Column I2 has 4 circled -> C'; Column I3 has 7 circled -> C. (This also synthesizes a 3-input XOR gate!)."
  },
  {
    "id": 7,
    "question": "Implement F(A, B, C) = Σ(0, 1, 3, 4, 6) using a 4-to-1 MUX with select lines B and C.",
    "answer": "With B, C as select lines and A as residual variable: I0 = 1, I1 = A', I2 = 1, I3 = A'.",
    "explanation": "Choosing different variables as select lines yields different input configurations, sometimes eliminating the need for an inverter."
  },
  {
    "id": 8,
    "question": "How can a 1-bit Half Adder Sum and Carry be implemented using a 4-to-1 MUX?",
    "answer": "Select lines A and B: for Sum = Σ(1, 2), inputs are I0=0, I1=1, I2=1, I3=0; for Carry = Σ(3), inputs are I0=0, I1=0, I2=0, I3=1.",
    "explanation": "Here only 2 variables exist, so data inputs are directly tied to fixed logic levels 0 and 1 without needing residual variables."
  },
  {
    "id": 9,
    "question": "What does it mean if all minterms in a column of the implementation table are circled?",
    "answer": "The corresponding data input line must be connected directly to logic HIGH (VCC / 1).",
    "explanation": "Since the output must be 1 whether the residual variable is 0 or 1, the input is independent of the residual variable."
  },
  {
    "id": 10,
    "question": "What does it mean if no minterm in a column of the implementation table is circled?",
    "answer": "The corresponding data input line must be connected directly to logic LOW (GND / 0).",
    "explanation": "Because neither minterm produces an output of 1, the output must remain 0 for that select combination."
  },
  {
    "id": 11,
    "question": "Can a 4-to-1 MUX implement a 4-variable Boolean function? Explain how.",
    "answer": "Yes, but it requires external logic gates because each data input must implement a 2-variable sub-function of the two residual variables.",
    "explanation": "Shannon's expansion with 2 select lines leaves 2 residual variables; an external gate network or smaller MUXes must synthesize each input."
  },
  {
    "id": 12,
    "question": "Why is implementing Boolean functions with multiplexers advantageous in circuit design?",
    "answer": "Functions can be modified or reprogrammed simply by changing input wiring without redesigning or replacing logic gate chips.",
    "explanation": "This reconfigurability is the fundamental foundation of modern Field Programmable Gate Arrays (FPGAs)."
  },
  {
    "id": 13,
    "question": "If a residual variable complement (e.g., C') is needed, how is it generated?",
    "answer": "By passing the residual variable C through an external NOT gate (inverter).",
    "explanation": "At most, a single NOT gate is required for the entire 3-variable circuit to generate C' for any inputs that require it."
  },
  {
    "id": 14,
    "question": "What is Shannon's Expansion Theorem basis for MUX function implementation?",
    "answer": "F(A, B, C) = A'B'·F(0,0,C) + A'B·F(0,1,C) + AB'·F(1,0,C) + AB·F(1,1,C).",
    "explanation": "Each cofactor F(a, b, C) corresponds exactly to the Boolean function applied to data input line I_{2a+b}."
  },
  {
    "id": 15,
    "question": "What are the mandatory steps in ISC board examinations for solving MUX implementation problems?",
    "answer": "1. State select and residual variables. 2. Draw the implementation table with circled minterms. 3. List derived inputs I0-I3. 4. Draw labeled 4-to-1 MUX schematic.",
    "explanation": "Following this precise 4-step structure guarantees maximum marks under CISCE examination grading standards."
  }
];

export default faqs;
