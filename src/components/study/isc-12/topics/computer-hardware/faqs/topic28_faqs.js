// Topic 28 FAQs - 25 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty
// Textbook Page 109 Example 2.13: F(a, b, c, d) = Σ(0, 1, 3, 4, 8, 9, 15) using 8:1 MUX

export const faqs = [
  {
    "id": 1,
    "question": "What is the problem statement of Textbook Page 109 Example 2.13?",
    "answer": "Implement the 4-variable Boolean function F(a, b, c, d) = Σ(0, 1, 3, 4, 8, 9, 15) with an 8-to-1 multiplexer.",
    "explanation": "Because n = 4, a 2^(n-1) to 1 = 8 to 1 multiplexer with (4 - 1) = 3 selection lines is required."
  },
  {
    "id": 2,
    "question": "In Example 2.13, which variable is singled out and which connect to selection lines?",
    "answer": "Leftmost variable 'a' is singled out as the data literal; variables b, c, d connect to selection lines S2, S1, S0.",
    "explanation": "The highest-order variable 'a' partitions the minterms into rows a' and a, while b, c, d form the 3-bit binary select bus."
  },
  {
    "id": 3,
    "question": "How are the 16 minterms partitioned in the 2-row Implementation Table for Example 2.13?",
    "answer": "Row a' contains minterms 0 to 7; Row a contains minterms 8 to 15.",
    "explanation": "Minterms 0-7 have a = 0 (a' is active), and minterms 8-15 have a = 1 (a is active). Column Ik pairs minterm k with k+8."
  },
  {
    "id": 4,
    "question": "Which minterms are circled in the implementation table for F(a, b, c, d) = Σ(0, 1, 3, 4, 8, 9, 15)?",
    "answer": "Minterms 0, 1, 3, 4 (in row a') and minterms 8, 9, 15 (in row a) are circled.",
    "explanation": "These are the exact minterms present in the sum-of-minterms specification of the function."
  },
  {
    "id": 5,
    "question": "Why are inputs I0 and I1 tied to logic 1 in Example 2.13?",
    "answer": "Because in both columns I0 (0, 8) and I1 (1, 9), both minterms are circled (Rule 2).",
    "explanation": "Rule 2 states that when both minterms in a column are circled, the corresponding multiplexer input is applied 1 (VCC)."
  },
  {
    "id": 6,
    "question": "Why are inputs I2, I5, and I6 tied to logic 0 in Example 2.13?",
    "answer": "Because in columns I2 (2, 10), I5 (5, 13), and I6 (6, 14), neither minterm is circled (Rule 1).",
    "explanation": "Rule 1 states that when neither minterm in a column is circled, the input is applied 0 (Ground)."
  },
  {
    "id": 7,
    "question": "Why are inputs I3 and I4 connected to a' in Example 2.13?",
    "answer": "Because in columns I3 (3, 11) and I4 (4, 12), only the top minterms (3 and 4 in row a') are circled (Rule 4).",
    "explanation": "Rule 4 states that when the top minterm is circled and bottom is not, the input receives complemented variable a'."
  },
  {
    "id": 8,
    "question": "Why is input I7 connected to variable 'a' in Example 2.13?",
    "answer": "Because in column I7 (7, 15), only the bottom minterm (15 in row a) is circled (Rule 3).",
    "explanation": "Rule 3 states that when the bottom minterm is circled and top is not, the input receives uncomplemented variable a."
  },
  {
    "id": 9,
    "question": "What is the complete input vector applied to pins I0 through I7 for Example 2.13?",
    "answer": "{I0=1, I1=1, I2=0, I3=a', I4=a', I5=0, I6=0, I7=a}.",
    "explanation": "This 8-element input vector completely synthesizes F(a, b, c, d)."
  },
  {
    "id": 10,
    "question": "How many external logic gates are required to implement Example 2.13?",
    "answer": "Only one external NOT gate (inverter) connected to variable 'a' to produce a'.",
    "explanation": "The inverted signal a' is shared between inputs I3 and I4. No external AND or OR gates are needed."
  },
  {
    "id": 11,
    "question": "What is the canonical Boolean equation for an 8x1 MUX given on Textbook Page 109?",
    "answer": "F = S2'S1'S0' I0 + S2'S1'S0 I1 + S2'S1S0' I2 + S2'S1S0 I3 + S2S1'S0' I4 + S2S1'S0 I5 + S2S1S0' I6 + S2S1S0 I7.",
    "explanation": "Each product term represents one 3-bit binary selection code from 000 (I0) to 111 (I7)."
  },
  {
    "id": 12,
    "question": "Show how substituting the inputs into the 8x1 MUX equation generates F(a, b, c, d).",
    "answer": "F = b'c'd'(1) + b'c'd(1) + b'cd(a') + bc'd'(a') + bcd(a) = m0 + m8 + m1 + m9 + m3 + m4 + m15.",
    "explanation": "Multiplying by a' and a recovers all 7 canonical minterms specified in Example 2.13."
  },
  {
    "id": 13,
    "question": "What happens if variable 'd' were singled out instead of 'a' in Example 2.13?",
    "answer": "The implementation table would pair adjacent even/odd minterms, and select lines would be a, b, c.",
    "explanation": "Both methods yield mathematically identical logic functions, but the CISCE textbook explicitly singles out the leftmost variable 'a'."
  },
  {
    "id": 14,
    "question": "What commercial IC package can be used to implement this 8-to-1 multiplexer circuit?",
    "answer": "The 74151 (or 74LS151) standard TTL 8-line to 1-line multiplexer IC.",
    "explanation": "The 74151 provides 8 data inputs, 3 select lines, an active-LOW enable input, and complementary outputs (Y and W)."
  },
  {
    "id": 15,
    "question": "How are marks allocated for Example 2.13 in an ISC Class 12 board examination?",
    "answer": "1 mark for variable identification, 2 marks for the 8-column table with circled minterms, 1 mark for input deductions, and 1 mark for the circuit diagram.",
    "explanation": "Presenting all steps explicitly ensures full 5 marks according to official CISCE evaluation rubrics."
  },
  {
    "id": 16,
    "question": "How many select lines and data inputs does an 8-to-1 MUX have when realizing a 4-variable function?",
    "answer": "3 select lines (S2, S1, S0) and 8 data inputs (I0 to I7).",
    "explanation": "For 4 variables (a, b, c, d), 3 variables (a, b, c) connect to select lines, and variable d is singled out."
  },
  {
    "id": 17,
    "question": "For F(a, b, c, d) = Σ(0, 1, 3, 4, 8, 9, 15), how are the select lines assigned?",
    "answer": "Connect variable 'a' to S2, variable 'b' to S1, and variable 'c' to S0; variable 'd' is singled out.",
    "explanation": "The three MSB variables serve as select addresses for the 8 MUX channels."
  },
  {
    "id": 18,
    "question": "Construct the implementation table columns for F(a, b, c, d) = Σ(0, 1, 3, 4, 8, 9, 15).",
    "answer": "8 columns (I0 to I7) with 2 rows: Row d' (0,2,4,6,8,10,12,14) and Row d (1,3,5,7,9,11,13,15). Circled minterms: 0, 1, 3, 4, 8, 9, 15.",
    "explanation": "Each column I_k pairs minterms (2k, 2k+1)."
  },
  {
    "id": 19,
    "question": "Derive the data inputs (I0 to I7) for F(a, b, c, d) = Σ(0, 1, 3, 4, 8, 9, 15).",
    "answer": "I0 = 1 (both 0,1 circled); I1 = d (3 circled); I2 = d' (4 circled); I3 = 0 (none); I4 = 1 (both 8,9 circled); I5 = 0 (none); I6 = 0 (none); I7 = d (15 circled).",
    "explanation": "Applying the 4 canonical rules to each column gives: I0=1, I1=d, I2=d', I3=0, I4=1, I5=0, I6=0, I7=d."
  },
  {
    "id": 20,
    "question": "What external gates are required for this 8-to-1 MUX implementation?",
    "answer": "Only one NOT gate (to invert variable d into d' for input I2).",
    "explanation": "Inputs I1 and I7 connect to d; I2 connects to d'; I0 and I4 connect to logic 1; I3, I5, I6 connect to logic 0."
  },
  {
    "id": 21,
    "question": "What logic level represents logic 1 and logic 0 in hardware circuit diagrams?",
    "answer": "Logic 1 connects to +5V (Vcc); Logic 0 connects to Ground (GND / 0V).",
    "explanation": "Standard TTL voltage specifications."
  },
  {
    "id": 22,
    "question": "Why is implementing functions using MUXes vastly superior to standard gate implementations?",
    "answer": "Zero K-map minimization is required, hazard glitches are reduced, and design requires only 1 IC package instead of 4-6 discrete gate ICs.",
    "explanation": "Drastically cuts PCB board area, component count, and wiring complexity."
  },
  {
    "id": 23,
    "question": "What happens if variable 'd' is chosen as select line S0 and 'a' is singled out instead?",
    "answer": "The implementation table is structured with rows a' and a; the circuit remains fully functional but yields different input equations for I0-I7.",
    "explanation": "Any of the 4 variables can be singled out, but selecting the rightmost variable is standard textbook convention."
  },
  {
    "id": 24,
    "question": "Can an 8-to-1 MUX implement a function with Don't Care conditions F = Σm(...) + d(...)?",
    "answer": "Yes; Don't Care minterms are circled if doing so simplifies the input to 1 or 0 instead of requiring an inverted variable.",
    "explanation": "Don't Cares provide optimization flexibility exactly as in Karnaugh maps."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE question format for Textbook Example 2.13?",
    "answer": "Given F(a, b, c, d) = Σ(0, 1, 3, 4, 8, 9, 15), draw the Implementation Table, determine values of I0 to I7, and draw the complete circuit diagram using an 8-to-1 MUX.",
    "explanation": "A frequent 4-mark board examination question in ISC Class 12 Computer Science Paper 1."
  }
];

export default faqs;
