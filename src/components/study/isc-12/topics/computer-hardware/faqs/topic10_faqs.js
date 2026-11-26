// Topic 10 FAQs - 25 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is an 8-to-3 Line Octal-to-Binary Encoder?",
    "answer": "A combinational circuit that converts 8 octal input lines (D0–D7) into a 3-bit binary output code (X, Y, Z).",
    "explanation": "Each input represents an octal digit (0 to 7). Asserting one input line produces its 3-bit binary equivalent (000₂ to 111₂)."
  },
  {
    "id": 2,
    "question": "What are the Boolean equations for the three outputs X, Y, and Z?",
    "answer": "X = D4 + D5 + D6 + D7; Y = D2 + D3 + D6 + D7; Z = D1 + D3 + D5 + D7.",
    "explanation": "X (MSB, weight 4) is 1 for digits 4, 5, 6, 7. Y (weight 2) is 1 for digits 2, 3, 6, 7. Z (LSB, weight 1) is 1 for odd digits 1, 3, 5, 7."
  },
  {
    "id": 3,
    "question": "Why does D0 not connect to any of the three OR gates?",
    "answer": "Because octal digit 0 is represented as binary 000; thus X=0, Y=0, Z=0 naturally without gate activation.",
    "explanation": "If D0 were connected to any gate, pressing digit 0 would erroneously set that bit to 1."
  },
  {
    "id": 4,
    "question": "How many OR gates are required to construct an 8-to-3 encoder, and how many inputs per gate?",
    "answer": "Three 4-input OR gates.",
    "explanation": "Each of the 3 outputs (X, Y, Z) is the logical sum of exactly 4 input lines."
  },
  {
    "id": 5,
    "question": "How many rows are in the truth table of an 8-to-3 line encoder?",
    "answer": "8 rows, each having exactly one input line set to 1.",
    "explanation": "The input matrix is an 8×8 identity diagonal representing the 8 mutually exclusive octal states."
  },
  {
    "id": 6,
    "question": "What is the commercial TTL IC number for an 8-to-3 line encoder?",
    "answer": "IC 74148 (8-line to 3-line priority encoder with active-LOW pins).",
    "explanation": "The 74LS148 is the industry-standard octal priority encoder chip used in microprocessor interrupt hardware."
  },
  {
    "id": 7,
    "question": "What output code is produced when input line D5 is asserted?",
    "answer": "X = 1, Y = 0, Z = 1 (binary 101₂ = decimal 5).",
    "explanation": "D5 activates the X gate (D4+D5+D6+D7) and the Z gate (D1+D3+D5+D7), but not the Y gate."
  },
  {
    "id": 8,
    "question": "What output code is produced when input line D6 is asserted?",
    "answer": "X = 1, Y = 1, Z = 0 (binary 110₂ = decimal 6).",
    "explanation": "D6 activates both the X gate and the Y gate, while Z remains 0."
  },
  {
    "id": 9,
    "question": "What happens if both D3 and D4 are activated simultaneously in a simple 8-to-3 encoder?",
    "answer": "The output becomes X=1 (from D4), Y=1 (from D3), Z=1 (from D3), producing binary 111 (digit 7), which is incorrect.",
    "explanation": "Simple encoders produce logical union errors when multiple inputs are pressed. A priority encoder is needed to resolve conflicts."
  },
  {
    "id": 10,
    "question": "What is the significance of the weights 4, 2, and 1 for outputs X, Y, and Z?",
    "answer": "They represent powers of two: X has weight 2²=4, Y has weight 2¹=2, Z has weight 2⁰=1.",
    "explanation": "Any octal digit D_k is reconstructed as: Decimal Value = 4X + 2Y + 1Z."
  },
  {
    "id": 11,
    "question": "How does the circuit handle an input of D7?",
    "answer": "D7 connects to all three OR gates, producing X=1, Y=1, Z=1 (binary 111₂).",
    "explanation": "7₁₀ in binary is 111₂, so all three output bits must be forced HIGH simultaneously."
  },
  {
    "id": 12,
    "question": "Can an 8-to-3 encoder be constructed using 2-input OR gates?",
    "answer": "Yes, each 4-input OR gate can be implemented as a tree of three 2-input OR gates (total 9 two-input OR gates).",
    "explanation": "By associative law: (A + B + C + D) = ((A + B) + (C + D))."
  },
  {
    "id": 13,
    "question": "What is the total propagation delay of an 8-to-3 encoder using single-level 4-input OR gates?",
    "answer": "One gate propagation delay (t_OR4).",
    "explanation": "Since all 3 outputs are computed in parallel directly from the 8 inputs, delay is minimal."
  },
  {
    "id": 14,
    "question": "In drawing the 8-to-3 encoder circuit, what is the best practice for clean wiring?",
    "answer": "Draw 8 vertical bus lines for inputs D0–D7 on the left, and connect horizontal taps to the three OR gates on the right.",
    "explanation": "Vertical bus wiring ensures no crossing lines are misinterpreted as connections, securing full presentation marks."
  },
  {
    "id": 15,
    "question": "What is the CISCE marking key for an 8-to-3 encoder question (4 Marks)?",
    "answer": "1 mark for truth table, 1 mark for Boolean equations (X, Y, Z), and 2 marks for logic circuit with three 4-input OR gates.",
    "explanation": "Examiners deduct marks if D0 is connected to any OR gate or if MSB/LSB labels are inverted."
  },
  {
    "id": 16,
    "question": "What are the inputs and outputs of an 8-to-3 Line Octal-to-Binary Encoder?",
    "answer": "8 octal inputs: D0 to D7; 3 binary outputs: X (MSB), Y, Z (LSB).",
    "explanation": "It accepts one of 8 octal digits (0 to 7) and generates its 3-bit binary equivalent (000 to 111)."
  },
  {
    "id": 17,
    "question": "What are the Boolean equations for the 3 outputs of an 8-to-3 encoder?",
    "answer": "X = D4 + D5 + D6 + D7; Y = D2 + D3 + D6 + D7; Z = D1 + D3 + D5 + D7.",
    "explanation": "X is 1 for digits 4-7; Y is 1 for digits 2, 3, 6, 7; Z is 1 for odd digits 1, 3, 5, 7. D0 is not connected."
  },
  {
    "id": 18,
    "question": "How many OR gates are required to implement an 8-to-3 line encoder?",
    "answer": "Three 4-input OR gates.",
    "explanation": "Each of the 3 outputs (X, Y, Z) is formed by ORing 4 distinct input lines."
  },
  {
    "id": 19,
    "question": "What is the output when input line D5 is active (D5 = 1)?",
    "answer": "X = 1, Y = 0, Z = 1 (binary '101', which is decimal 5).",
    "explanation": "D5 is connected to the OR gates for X and Z, but not Y, yielding 101."
  },
  {
    "id": 20,
    "question": "Why is input D0 omitted from all three OR gates?",
    "answer": "Because decimal 0 is encoded as 000; when D0 is active, all three OR gate outputs must remain at logic 0.",
    "explanation": "If D0 were connected to any gate, that output would become 1, corrupting the binary code for zero."
  },
  {
    "id": 21,
    "question": "What commercial IC chip is a standard 8-to-3 line Priority Encoder?",
    "answer": "IC 74148 (8-line to 3-line priority encoder with active-low inputs and outputs).",
    "explanation": "The 74LS148 is widely studied in digital electronics and CISCE computer hardware curricula."
  },
  {
    "id": 22,
    "question": "How many rows are present in the functional truth table of an 8-to-3 encoder?",
    "answer": "8 valid rows (one-hot encoding where exactly one input is 1 in each row).",
    "explanation": "From D0=1 (000) through D7=1 (111)."
  },
  {
    "id": 23,
    "question": "What is a 'one-hot' input configuration?",
    "answer": "A binary coding scheme where across a group of bits, exactly one bit is logic 1 (hot) and all others are logic 0.",
    "explanation": "Standard encoders expect one-hot inputs; priority encoders eliminate this constraint."
  },
  {
    "id": 24,
    "question": "How can two 8-to-3 encoders be cascaded to build a 16-to-4 encoder?",
    "answer": "Connect inputs D0-D7 to Encoder 1 and D8-D15 to Encoder 2; combine corresponding outputs using 2-input OR gates, and use Encoder 2's group select as the 4th MSB bit.",
    "explanation": "Cascading expands input capacity hierarchically using standard MSI building blocks."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE question format for an 8-to-3 Encoder?",
    "answer": "Draw Truth Table, write Boolean equations for X, Y, Z, and draw the logic gate diagram using OR gates.",
    "explanation": "A frequent 4-mark question demanding clear labeling of inputs D0-D7 and outputs X, Y, Z."
  }
];

export default faqs;
