// Topic 16 FAQs - 25 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is the architecture and line capacity of a 3-to-8 line decoder?",
    "answer": "It has 3 binary input lines (A, B, C), an Enable control, and 8 decoded output lines (Y0 through Y7).",
    "explanation": "Since 2^3 = 8, the circuit decodes all 8 binary combinations (000 to 111) into 8 mutually exclusive output lines, often called an Octal Decoder."
  },
  {
    "id": 2,
    "question": "What are the Boolean expressions for the 8 outputs of an active-HIGH 3-to-8 decoder with Enable E?",
    "answer": "Y0=E·A'B'C', Y1=E·A'B'C, Y2=E·A'BC', Y3=E·A'BC, Y4=E·AB'C', Y5=E·AB'C, Y6=E·ABC', Y7=E·ABC.",
    "explanation": "Each output Y_i represents one 3-variable minterm m_i gated by the master Enable input E."
  },
  {
    "id": 3,
    "question": "How many logic gates are required to construct an active-HIGH 3-to-8 decoder from discrete gates?",
    "answer": "Three NOT gates (for A', B', C') and eight 4-input AND gates.",
    "explanation": "Each of the 8 AND gates requires 4 inputs: the Enable line E and three address variable literals."
  },
  {
    "id": 4,
    "question": "What commercial IC is the industry standard for 3-to-8 line decoders?",
    "answer": "The 74xx138 (74LS138 / 74HC138 / 74HCT138) 3-to-8 line decoder/demultiplexer.",
    "explanation": "The 74138 is one of the most widely used TTL/CMOS logic chips in computing history, featuring active-LOW outputs and a versatile 3-enable pin structure."
  },
  {
    "id": 5,
    "question": "Explain the unique 3-Enable pin structure of the 74LS138 IC.",
    "answer": "It has one active-HIGH enable (G1) and two active-LOW enables (G2A' and G2B').",
    "explanation": "The internal chip enable condition is Enable = G1 · (G2A)' · (G2B)'. All three conditions must be satisfied simultaneously for decoding to occur."
  },
  {
    "id": 6,
    "question": "Why does the 74138 IC feature two active-LOW enables and one active-HIGH enable?",
    "answer": "To allow cascading into 4-to-16 and larger decoders without requiring any external inverter gates.",
    "explanation": "A high-order address bit can connect directly to G1 of one chip and G2A' of another chip, enabling one chip when the bit is 1 and the other when it is 0."
  },
  {
    "id": 7,
    "question": "In an active-HIGH 3-to-8 decoder, which output line is activated when input ABC = 101?",
    "answer": "Output Y5 is activated (logic 1), while all other 7 outputs remain logic 0.",
    "explanation": "Binary 101 equals decimal 5. Therefore, minterm m5 (A · B' · C) is asserted."
  },
  {
    "id": 8,
    "question": "How does a 3-to-8 decoder convert an octal digit into 1-of-8 spatial lines?",
    "answer": "A 3-bit binary representation of any octal digit (0-7) directly activates the corresponding single output line.",
    "explanation": "Octal is base-8. Any octal digit directly maps to a 3-bit binary pattern, making the 3-to-8 decoder a native octal-to-spatial converter."
  },
  {
    "id": 9,
    "question": "How is a 3-to-8 decoder used in memory chip select circuits for an 8 KB memory space divided into 1 KB blocks?",
    "answer": "Address lines A12, A11, A10 feed the 3 inputs; each output line connects to the Chip Select (/CS) pin of one 1 KB RAM chip.",
    "explanation": "Each 1 KB block requires 10 address lines (A0-A9). The next 3 address lines (A10, A11, A12) select which of the 8 chips is active, perfectly partitioning 8 KB."
  },
  {
    "id": 10,
    "question": "Can a 3-to-8 decoder implement any arbitrary 3-variable Boolean function?",
    "answer": "Yes, by connecting the decoder outputs corresponding to the function's minterms to an external OR gate (or NAND gate for active-LOW).",
    "explanation": "Since the decoder generates all 8 canonical minterms m0 through m7, any 3-variable SOP function can be synthesized simply by ORing its required minterms."
  },
  {
    "id": 11,
    "question": "How can a 1-bit Full Adder be implemented using a 3-to-8 decoder and two OR gates?",
    "answer": "Sum = OR(Y1, Y2, Y4, Y7) and Carry = OR(Y3, Y5, Y6, Y7).",
    "explanation": "Full Adder truth table: Sum = Σ(1, 2, 4, 7) and Carry = Σ(3, 5, 6, 7). Connecting these minterm outputs to 4-input OR gates produces the exact Full Adder outputs."
  },
  {
    "id": 12,
    "question": "If an active-LOW 74138 decoder is used for Full Adder implementation, what gates replace the OR gates?",
    "answer": "Two NAND gates.",
    "explanation": "By De Morgan's theorem, NANDing active-LOW minterms produces the identical SOP function: [(m1)' · (m2)' · (m4)' · (m7)']' = m1 + m2 + m4 + m7 = Sum."
  },
  {
    "id": 13,
    "question": "What is the typical propagation delay of a standard 74LS138 decoder?",
    "answer": "Approximately 18 to 22 nanoseconds from address inputs to outputs.",
    "explanation": "Modern advanced high-speed CMOS versions (74AHCT138) reduce this delay to approximately 5 to 7 nanoseconds."
  },
  {
    "id": 14,
    "question": "What occurs during simultaneous address transitions in a 3-to-8 decoder?",
    "answer": "Transient output glitches (spikes) may briefly appear due to slightly unequal propagation delays along internal gate paths.",
    "explanation": "For example, changing from 011 (3) to 100 (4) might briefly cause 000 (0) or 111 (7) to activate for 2-3 nanoseconds. Synchronous strobing via Enable avoids this."
  },
  {
    "id": 15,
    "question": "What are the essential columns in an ISC Class 12 truth table for a 3-to-8 decoder?",
    "answer": "Enable (E), Inputs (A, B, C), and all eight individual outputs (Y0, Y1, Y2, Y3, Y4, Y5, Y6, Y7).",
    "explanation": "A complete truth table has 9 rows: one row showing E=0 with all outputs 0, followed by 8 rows for E=1 covering inputs 000 through 111."
  },
  {
    "id": 16,
    "question": "What are the inputs and outputs of a 3-to-8 Line Binary Decoder?",
    "answer": "Inputs: 3 binary address lines (A2 MSB, A1, A0 LSB) and 1 Enable line (E); Outputs: 8 output lines (Y0 to Y7).",
    "explanation": "It accepts 3 binary bits and activates exactly 1 of the 8 output lines (minterms m0 to m7)."
  },
  {
    "id": 17,
    "question": "Write the Boolean output equation for Y5 in a 3-to-8 decoder with active-HIGH enable.",
    "answer": "Y5 = E · A2 · A1' · A0.",
    "explanation": "Decimal 5 is binary 101, so A2=1, A1=0, A0=1."
  },
  {
    "id": 18,
    "question": "Write the Boolean output equation for Y0 in a 3-to-8 decoder with active-HIGH enable.",
    "answer": "Y0 = E · A2' · A1' · A0'.",
    "explanation": "Decimal 0 is binary 000, so all three address variables are complemented."
  },
  {
    "id": 19,
    "question": "How many logic gates are used to build a 3-to-8 decoder with discrete gates?",
    "answer": "Eight 4-input AND gates and three NOT gates (inverters).",
    "explanation": "3 inverters generate A2', A1', A0'; each 4-input AND gate combines E with three address literals."
  },
  {
    "id": 20,
    "question": "What is the output state when E = 1, A2 = 0, A1 = 1, A0 = 1?",
    "answer": "Y3 = 1, and all other seven outputs (Y0, Y1, Y2, Y4, Y5, Y6, Y7) are 0.",
    "explanation": "Binary 011 is decimal 3, so only output Y3 is asserted."
  },
  {
    "id": 21,
    "question": "What happens when E = 0 in a 3-to-8 decoder?",
    "answer": "All 8 outputs remain at logic 0 regardless of the address applied to A2, A1, and A0.",
    "explanation": "E = 0 disables every AND gate simultaneously."
  },
  {
    "id": 22,
    "question": "What commercial IC part number corresponds to a standard 3-to-8 Decoder?",
    "answer": "IC 74138 (74LS138 / 74HC138).",
    "explanation": "The 74138 is an industry-standard 3-to-8 line decoder/demultiplexer featuring three enable inputs (two active-low, one active-high)."
  },
  {
    "id": 23,
    "question": "How does a 3-to-8 decoder function as an Octal-to-Binary converter?",
    "answer": "It does NOT convert octal to binary; it does the inverse: it converts a 3-bit binary code into 8 individual octal lines (Binary-to-Octal decoder).",
    "explanation": "An encoder converts octal to binary; a decoder converts binary to octal."
  },
  {
    "id": 24,
    "question": "How many rows are present in the functional truth table of a 3-to-8 decoder?",
    "answer": "9 rows: 1 row for E=0 (disabled state) and 8 rows for E=1 (combinations 000 to 111).",
    "explanation": "This covers all operational states concisely."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE question format for a 3-to-8 Decoder?",
    "answer": "Draw Truth Table, write minterm expressions for Y0 through Y7, and draw the complete logic gate circuit diagram.",
    "explanation": "A frequent 4-mark question requiring neat bus lines for A2, A1, A0 and their complemented counterparts."
  }
];

export default faqs;
