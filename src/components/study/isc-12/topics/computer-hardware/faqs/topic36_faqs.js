// Topic 36 FAQs - 25 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is the 2^(n-1)-to-1 multiplexer rule for Boolean function implementation?",
    "answer": "Any Boolean function of n variables can be implemented with a 2^(n-1)-to-1 multiplexer having (n - 1) selection lines.",
    "explanation": "Because a 2^(n-1)-to-1 MUX has 2^(n-1) data inputs and (n-1) select lines, connecting (n-1) variables to select lines allows each data input to be synthesized using {0, 1, remaining variable, or its complement}."
  },
  {
    "id": 2,
    "question": "In the CISCE textbook method, which variable from the ordered set (x, y, z) is singled out?",
    "answer": "The leftmost variable x is singled out as the data input literal.",
    "explanation": "The remaining two variables y and z are connected to the selection lines S1 and S0 respectively, preserving binary positional order."
  },
  {
    "id": 3,
    "question": "How are variables y and z connected to the selection lines of the 4:1 MUX?",
    "answer": "The higher-order variable y connects to S1, and the lowest-order variable z connects to S0.",
    "explanation": "This ensures the selection lines decode combinations 00 (I0), 01 (I1), 10 (I2), and 11 (I3) corresponding to the minterm pairs."
  },
  {
    "id": 4,
    "question": "How does leftmost variable x split the 8 minterms in the implementation table?",
    "answer": "x is 0 for minterms 0 to 3 (Row 1: x'), and x is 1 for minterms 4 to 7 (Row 2: x).",
    "explanation": "Because the truth table is sorted in standard binary order, x is 0 for the first half of the rows (000 to 011) and 1 for the second half (100 to 111)."
  },
  {
    "id": 5,
    "question": "What minterms occupy the four columns of the 4:1 MUX implementation table?",
    "answer": "Column I0: (0, 4); Column I1: (1, 5); Column I2: (2, 6); Column I3: (3, 7).",
    "explanation": "Each column I_k pairs minterm k (where x=0) with minterm k+4 (where x=1), differing only in the singled-out variable x."
  },
  {
    "id": 6,
    "question": "What is Rule 1 of the implementation table inspection rules?",
    "answer": "If neither minterm in a column is circled, apply logic 0 (Ground) to that multiplexer data input.",
    "explanation": "If neither minterm is part of the function, the function evaluates to 0 for that select address regardless of x."
  },
  {
    "id": 7,
    "question": "What is Rule 2 of the implementation table inspection rules?",
    "answer": "If both minterms in a column are circled, apply logic 1 (VCC / High) to that multiplexer data input.",
    "explanation": "Since the function is 1 for both x=0 and x=1 at that select code, the output is permanently 1."
  },
  {
    "id": 8,
    "question": "What is Rule 3 of the implementation table inspection rules?",
    "answer": "If the bottom minterm is circled and top is not, apply the uncomplemented variable x to that data input.",
    "explanation": "The function is 1 only when x=1 (the bottom row), meaning output F directly tracks variable x."
  },
  {
    "id": 9,
    "question": "What is Rule 4 of the implementation table inspection rules?",
    "answer": "If the top minterm is circled and bottom is not, apply the complemented variable x' to that data input.",
    "explanation": "The function is 1 only when x=0 (the top row), so an inverter is placed on x to feed x' into that MUX input."
  },
  {
    "id": 10,
    "question": "For F(x, y, z) = Σ(1, 3, 5, 6), which minterms are circled in the implementation table?",
    "answer": "Minterms 1, 3, 5, and 6 are circled.",
    "explanation": "These minterms represent the active rows in the truth table where function F outputs logic 1."
  },
  {
    "id": 11,
    "question": "Derive the data input value applied to I0 for F(x, y, z) = Σ(1, 3, 5, 6).",
    "answer": "I0 = 0 (Rule 1).",
    "explanation": "Column I0 contains minterms 0 and 4. Neither 0 nor 4 is circled, so Rule 1 applies: I0 = 0."
  },
  {
    "id": 12,
    "question": "Derive the data input value applied to I1 for F(x, y, z) = Σ(1, 3, 5, 6).",
    "answer": "I1 = 1 (Rule 2).",
    "explanation": "Column I1 contains minterms 1 and 5. Both 1 and 5 are circled, so Rule 2 applies: I1 = 1."
  },
  {
    "id": 13,
    "question": "Derive the data input value applied to I2 for F(x, y, z) = Σ(1, 3, 5, 6).",
    "answer": "I2 = x (Rule 3).",
    "explanation": "Column I2 contains minterms 2 and 6. Bottom minterm 6 is circled and top minterm 2 is not, so Rule 3 applies: I2 = x."
  },
  {
    "id": 14,
    "question": "Derive the data input value applied to I3 for F(x, y, z) = Σ(1, 3, 5, 6).",
    "answer": "I3 = x' (Rule 4).",
    "explanation": "Column I3 contains minterms 3 and 7. Top minterm 3 is circled and bottom minterm 7 is not, so Rule 4 applies: I3 = x' (via NOT gate)."
  },
  {
    "id": 15,
    "question": "What is the complete algebraic output equation for the 4:1 MUX realizing F(x, y, z) = Σ(1, 3, 5, 6)?",
    "answer": "F = y'z'(0) + y'z(1) + yz'(x) + yz(x') = y'z + xyz' + x'yz.",
    "explanation": "Substituting S1=y, S0=z, I0=0, I1=1, I2=x, I3=x' into the general 4:1 MUX equation F = S1'S0'I0 + S1'S0 I1 + S1 S0' I2 + S1 S0 I3 matches the original canonical minterms."
  },
  {
    "id": 16,
    "question": "In Textbook Page 108, what is Step IV in realizing F(x, y, z) = Σ(1, 3, 5, 6) using a 4-to-1 MUX?",
    "answer": "Assigning select lines: Variables x and y are assigned to select lines S1 and S0 respectively, while variable z is singled out.",
    "explanation": "Step IV establishes the address bus structure of the 4:1 MUX."
  },
  {
    "id": 17,
    "question": "What is Step V in the Page 108 textbook procedure?",
    "answer": "Constructing the Implementation Table: List 4 columns for I0, I1, I2, I3; list 2 rows for z' and z; circle minterms 1, 3, 5, and 6.",
    "explanation": "Step V visually maps the function minterms onto MUX channels."
  },
  {
    "id": 18,
    "question": "What is Step VI in the Page 108 textbook procedure?",
    "answer": "Applying Rules 1-4 to determine data inputs: Column I0 → z; Column I1 → z; Column I2 → z; Column I3 → z'.",
    "explanation": "Step VI derives the exact signals to be applied to MUX data pins."
  },
  {
    "id": 19,
    "question": "How does Fig 2.25 depict the final circuit diagram?",
    "answer": "A 4-to-1 MUX block with select lines S1=x, S0=y; inputs I0, I1, I2 tied together and connected to variable z; input I3 connected to z via an inverter; output Y = F.",
    "explanation": "Fig 2.25 is the canonical diagram prescribed in the textbook."
  },
  {
    "id": 20,
    "question": "Why does Column I0 evaluate to z for minterm 1?",
    "answer": "Row z' contains minterm 0 (not circled); Row z contains minterm 1 (circled). By Rule 4 (0 in z' row, 1 in z row), Input = z.",
    "explanation": "Direct application of Rule 4."
  },
  {
    "id": 21,
    "question": "Why does Column I3 evaluate to z' for minterm 6?",
    "answer": "Row z' contains minterm 6 (circled); Row z contains minterm 7 (not circled). By Rule 3 (1 in z' row, 0 in z row), Input = z'.",
    "explanation": "Direct application of Rule 3."
  },
  {
    "id": 22,
    "question": "Can variables y and z be used as select lines instead of x and y for F(x, y, z)?",
    "answer": "Yes; variable x would be singled out, yielding an implementation table with rows x' and x.",
    "explanation": "The circuit remains valid and functional, but wiring to I0-I3 changes."
  },
  {
    "id": 23,
    "question": "How many ICs are needed to build the Fig 2.25 circuit physically?",
    "answer": "Two ICs: one 74153 (Dual 4:1 MUX) and one 7404 (Hex Inverter).",
    "explanation": "Requires only 1 MUX chip and 1 inverter gate from a 7404."
  },
  {
    "id": 24,
    "question": "What is the truth table verification of Fig 2.25 when x = 1, y = 1, z = 0?",
    "answer": "Select lines S1S0 = 11, routing input I3 to Y. Since I3 = z' and z = 0, Y = 0' = 1. Matches minterm 6 = 1.",
    "explanation": "Confirms circuit correctness for minterm 6 (110)."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE question format for Page 108 Step-by-Step problems?",
    "answer": "Explicitly asking for: 1. Assignment of select variables; 2. Implementation table with circled minterms; 3. Derived inputs I0-I3; 4. Circuit diagram conforming to Fig 2.25.",
    "explanation": "A standard 4-mark question directly testing this exact textbook derivation."
  }
];

export default faqs;
