// Topic 27 FAQs - 15 Comprehensive Questions and Answers
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
  }
];
export default faqs;
