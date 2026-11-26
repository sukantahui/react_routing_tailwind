// Topic 27 FAQs - 25 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty
// Textbook Page 108: Boolean Function Implementation using 4:1 Multiplexer

export const faqs = [
  {
    "id": 1,
    "question": "What is the core theorem on Textbook Page 107 for implementing Boolean functions using multiplexers?",
    "answer": "Any Boolean function of n variables can be implemented with a 2^(n-1) to 1 multiplexer with (n - 1) selection lines.",
    "explanation": "Because a multiplexer has an internal decoder and OR gate, using (n - 1) variables on the select lines leaves 1 variable to generate the required data inputs."
  },
  {
    "id": 2,
    "question": "For a 3-variable function F(x, y, z), how are the variables partitioned in Textbook Section 2.3.4A?",
    "answer": "The leftmost variable x is singled out as the data literal; variables y and z are connected to selection lines S1 and S0.",
    "explanation": "In an ordered set of variables x y z, the leftmost variable x has highest order and is singled out, while remaining variables connect to the select bus."
  },
  {
    "id": 3,
    "question": "What is Step IV as described on Textbook Page 108?",
    "answer": "Partitioning minterms: x is 0 for minterms 0 to (2^n/2 - 1) i.e. 0 to 3, and x is 1 for minterms 2^n/2 to (2^n - 1) i.e. 4 to 7.",
    "explanation": "For n=3, minterms 0, 1, 2, 3 have x complemented (x'), while minterms 4, 5, 6, 7 have x uncomplemented (x)."
  },
  {
    "id": 4,
    "question": "How is the Implementation Table structured on Textbook Page 108 (Step V)?",
    "answer": "A table with 4 columns (I0, I1, I2, I3) and 2 rows: Row x' containing minterms 0, 1, 2, 3, and Row x containing minterms 4, 5, 6, 7.",
    "explanation": "Column I0 holds minterms (0, 4), I1 holds (1, 5), I2 holds (2, 6), and I3 holds (3, 7)."
  },
  {
    "id": 5,
    "question": "State Rule 1 from Textbook Page 108 Step VI.",
    "answer": "Rule 1: If the two minterms in a column are not circled, apply 0 to the corresponding multiplexer input.",
    "explanation": "Neither minterm is active in the function, so the output for that select code must be logic 0 (Ground)."
  },
  {
    "id": 6,
    "question": "State Rule 2 from Textbook Page 108 Step VI.",
    "answer": "Rule 2: If the two minterms in a column are circled, apply 1 to the corresponding multiplexer input.",
    "explanation": "Both minterms are active in the function, so the output is logic 1 (VCC) regardless of variable x."
  },
  {
    "id": 7,
    "question": "State Rule 3 from Textbook Page 108 Step VI.",
    "answer": "Rule 3: If the bottom minterm is circled and the top is not circled, apply x (in uncomplemented form) to the corresponding multiplexer input.",
    "explanation": "The output is 1 only when x = 1 (the bottom row), meaning the output directly follows variable x."
  },
  {
    "id": 8,
    "question": "State Rule 4 from Textbook Page 108 Step VI.",
    "answer": "Rule 4: If the top minterm is circled and the bottom is not circled, apply x' to the corresponding multiplexer input.",
    "explanation": "The output is 1 only when x = 0 (the top row), meaning the output requires the inverted signal x' via a NOT gate."
  },
  {
    "id": 9,
    "question": "In the textbook example F(x, y, z) = Σ(1, 3, 5, 6), which minterms are circled in the implementation table?",
    "answer": "Minterms 1, 3, 5, and 6 are circled.",
    "explanation": "In column I0: none circled; column I1: 1 and 5 circled; column I2: 6 circled; column I3: 3 circled."
  },
  {
    "id": 10,
    "question": "What are the exact inputs applied to I0, I1, I2, I3 for F(x, y, z) = Σ(1, 3, 5, 6) on Page 108?",
    "answer": "I0 is applied 0 (Rule 1), I1 is applied 1 (Rule 2), I2 is applied x (Rule 3), I3 is applied x' (Rule 4).",
    "explanation": "This yields the complete input vector {0, 1, x, x'} feeding into the 4:1 multiplexer."
  },
  {
    "id": 11,
    "question": "What logic gates are required externally in Figure 2.25 on Textbook Page 108?",
    "answer": "Exactly one NOT gate (inverter) connected to variable x to produce x' for input I3.",
    "explanation": "Inputs I0 and I1 connect to GND and VCC, I2 connects directly to x, and I3 requires x' through an inverter."
  },
  {
    "id": 12,
    "question": "What is the canonical Boolean equation for a 4x1 MUX given at the bottom of Textbook Page 108?",
    "answer": "F = S1' S0' I0 + S1' S0 I1 + S1 S0' I2 + S1 S0 I3.",
    "explanation": "Each product term represents one selection combination decoding one of the four data inputs."
  },
  {
    "id": 13,
    "question": "Show how the MUX equation simplifies to F(x, y, z) for the inputs {0, 1, x, x'}.",
    "answer": "F = y'z'(0) + y'z(1) + yz'(x) + yz(x') = y'z + xyz' + x'yz, which is identical to minterms m1 + m5 + m6 + m3.",
    "explanation": "Algebraic expansion proves that the multiplexer circuit precisely synthesizes the target Boolean function."
  },
  {
    "id": 14,
    "question": "How does the selection line assignment differ if the variable order is given as y z x?",
    "answer": "The leftmost variable y is singled out as data; remaining variables z and x connect to select lines S1 and S0.",
    "explanation": "As stated in Textbook Step II, singling out depends on the given variable sequence."
  },
  {
    "id": 15,
    "question": "Why is the Singled-Out Variable Method on Page 108 preferred in CISCE board examinations?",
    "answer": "It provides a deterministic, algorithmic procedure (Steps I to VI) with strict evaluation criteria and minimal gate overhead.",
    "explanation": "Board evaluators award specific step marks for the 2-row table, circle inspection, rule citation, and circuit schematic."
  },
  {
    "id": 16,
    "question": "What is the 'Singled-Out Variable Method' for implementing Boolean functions with multiplexers?",
    "answer": "A design technique where (n-1) variables of an n-variable function are connected to the MUX select lines, and the remaining 1 variable is used to determine data inputs (0, 1, variable, or complement).",
    "explanation": "Formulated on Shannon's Expansion Theorem, it enables an n-variable function to be realized on a 2^(n-1)-to-1 MUX."
  },
  {
    "id": 17,
    "question": "What are the 4 fundamental rules for determining MUX data inputs in the Singled-Out Variable Method?",
    "answer": "Rule 1: If both minterm cells are 0 → Input = 0; Rule 2: If both are 1 → Input = 1; Rule 3: If 0-row is 1 and 1-row is 0 → Input = Variable'; Rule 4: If 0-row is 0 and 1-row is 1 → Input = Variable.",
    "explanation": "These 4 canonical textbook rules (Rules 1-4) determine inputs I0, I1, etc., from the implementation table."
  },
  {
    "id": 18,
    "question": "For F(x, y, z) = Σ(1, 3, 5, 6), what variables are connected to the select lines of a 4-to-1 MUX?",
    "answer": "Variables x and y are connected to select lines S1 and S0 respectively (variable z is singled out).",
    "explanation": "The two higher-order variables x, y serve as select inputs."
  },
  {
    "id": 19,
    "question": "Construct the implementation table for F(x, y, z) = Σ(1, 3, 5, 6) with z singled out.",
    "answer": "Columns I0(0,1), I1(2,3), I2(4,5), I3(6,7). Row z'(0,2,4,6) has circle at 6; Row z(1,3,5,7) has circles at 1,3,5. Outputs: I0 = z, I1 = z, I2 = z, I3 = z'.",
    "explanation": "I0 has minterm 1 (z); I1 has minterm 3 (z); I2 has minterm 5 (z); I3 has minterm 6 (z')."
  },
  {
    "id": 20,
    "question": "What are the data input values (I0, I1, I2, I3) for F(x, y, z) = Σ(1, 3, 5, 6)?",
    "answer": "I0 = z, I1 = z, I2 = z, I3 = z'.",
    "explanation": "Directly derived from the 4 rules on the implementation table."
  },
  {
    "id": 21,
    "question": "What external gates are required to complete this implementation of F(x, y, z)?",
    "answer": "Only one NOT gate (to invert variable z into z' for input I3). Inputs I0, I1, I2 connect directly to variable z.",
    "explanation": "Massive hardware saving: an entire 3-variable logic function is implemented with just 1 MUX and 1 inverter."
  },
  {
    "id": 22,
    "question": "What happens if a minterm column has NO circles (neither minterm present)?",
    "answer": "By Rule 1, that data input is connected directly to logic 0 (GND).",
    "explanation": "Since the function is 0 for both combinations of the singled-out variable, the input must be 0."
  },
  {
    "id": 23,
    "question": "What happens if a minterm column has BOTH cells circled (both minterms present)?",
    "answer": "By Rule 2, that data input is connected directly to logic 1 (+5V Vcc).",
    "explanation": "Since the function is 1 regardless of whether the singled-out variable is 0 or 1, the input is permanently 1."
  },
  {
    "id": 24,
    "question": "How does Shannon's Expansion Theorem mathematically justify this method?",
    "answer": "F(x, y, z) = x'y' · F(0,0,z) + x'y · F(0,1,z) + xy' · F(1,0,z) + xy · F(1,1,z). Each F(a,b,z) reduces to 0, 1, z, or z'.",
    "explanation": "Multiplexer select lines evaluate the minterms of (x,y), routing the corresponding sub-function to output Y."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE marking scheme for Textbook Page 108 Fig 2.25 problems?",
    "answer": "1 mark for select line assignment, 1 mark for the Implementation Table with circled minterms, 1 mark for derived inputs (I0-I3), and 1 mark for logic circuit diagram.",
    "explanation": "Full marks require showing the implementation table and clearly labeling inputs I0-I3 and select lines."
  }
];

export default faqs;
