// Topic 11 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is a Decimal-to-BCD Encoder?",
    "answer": "A combinational circuit that converts 10 decimal input lines (0 to 9) into a 4-bit Binary Coded Decimal (BCD) equivalent (A, B, C, D).",
    "explanation": "It translates human-readable decimal digit inputs (like numeric keypad switches) into standard 8421 BCD code."
  },
  {
    "id": 2,
    "question": "How many input lines and output lines are in a Decimal-to-BCD encoder?",
    "answer": "10 decimal input lines (D0 through D9) and 4 BCD output lines (A, B, C, D where A is MSB and D is LSB).",
    "explanation": "Although 4 binary outputs can represent up to 16 states (0–15), only the first 10 states (0000₂ to 1001₂) are used in BCD."
  },
  {
    "id": 3,
    "question": "What are the Boolean equations for the 4 BCD outputs (A, B, C, D)?",
    "answer": "A = D8 + D9; B = D4 + D5 + D6 + D7; C = D2 + D3 + D6 + D7; D = D1 + D3 + D5 + D7 + D9.",
    "explanation": "A (weight 8) is 1 for digits 8, 9. B (weight 4) is 1 for 4-7. C (weight 2) is 1 for 2, 3, 6, 7. D (weight 1) is 1 for odd digits 1, 3, 5, 7, 9."
  },
  {
    "id": 4,
    "question": "Why is input line D0 not connected to any of the 4 OR gates?",
    "answer": "Because decimal 0 is represented in BCD as 0000; all four outputs naturally remain 0 without gate excitation.",
    "explanation": "Connecting D0 to any OR gate would result in an erroneous non-zero BCD output for digit 0."
  },
  {
    "id": 5,
    "question": "What gates are used to build a Decimal-to-BCD encoder?",
    "answer": "One 2-input OR gate (for A), two 4-input OR gates (for B and C), and one 5-input OR gate (for D).",
    "explanation": "Four OR gates with varying input counts synthesize the four BCD bit positions directly."
  },
  {
    "id": 6,
    "question": "What are the invalid BCD states in a Decimal-to-BCD encoder?",
    "answer": "Binary combinations 1010₂ (10) through 1111₂ (15) are invalid and never generated.",
    "explanation": "BCD strictly represents decimal digits 0 to 9. The remaining 6 four-bit combinations are treated as 'Don't Care' conditions in design."
  },
  {
    "id": 7,
    "question": "What is the commercial TTL IC for a Decimal-to-BCD priority encoder?",
    "answer": "IC 74147 (10-line decimal to 4-line BCD priority encoder with active-LOW inputs and outputs).",
    "explanation": "The 74147 encodes the highest-order active decimal key into an inverted 9's/BCD representation."
  },
  {
    "id": 8,
    "question": "What is the BCD output when input D9 is asserted?",
    "answer": "A = 1, B = 0, C = 0, D = 1 (BCD 1001₂ = decimal 9).",
    "explanation": "D9 activates the A gate (D8+D9) and the D gate (D1+D3+D5+D7+D9), while B and C remain 0."
  },
  {
    "id": 9,
    "question": "What is the BCD output when input D6 is asserted?",
    "answer": "A = 0, B = 1, C = 1, D = 0 (BCD 0110₂ = decimal 6).",
    "explanation": "D6 activates both the B gate (4-7) and the C gate (2, 3, 6, 7)."
  },
  {
    "id": 10,
    "question": "Why is BCD encoding widely used in digital calculators and electronic weighing scales?",
    "answer": "Because BCD maps each decimal digit directly to a 4-bit nibble, simplifying display driving on 7-segment LED/LCD panels.",
    "explanation": "Decimal numbers can be displayed digit-by-digit without requiring complex binary-to-decimal division algorithms."
  },
  {
    "id": 11,
    "question": "What is the difference between pure binary and BCD for number 12?",
    "answer": "Pure binary for 12 is 1100₂; BCD for 12 is 0001 0010 (digit 1 = 0001, digit 2 = 0010).",
    "explanation": "A single Decimal-to-BCD encoder encodes one decimal digit at a time into a 4-bit nibble."
  },
  {
    "id": 12,
    "question": "What happens if no buttons are pressed on a Decimal-to-BCD encoder?",
    "answer": "The output is 0000, which is indistinguishable from pressing digit 0.",
    "explanation": "Practical keypads resolve this ambiguity using an additional 'Key Pressed' or 'Valid' flag line."
  },
  {
    "id": 13,
    "question": "Can an 8421 Decimal-to-BCD encoder be adapted for Excess-3 code?",
    "answer": "Yes, by either modifying the OR gate connections or passing the 4-bit BCD output through an adder that adds 0011₂ (3).",
    "explanation": "Excess-3 is an unweighted self-complementing code used in arithmetic decimal processing."
  },
  {
    "id": 14,
    "question": "What is the propagation delay of the Decimal-to-BCD encoder?",
    "answer": "Equal to the delay of the 5-input OR gate (for output D).",
    "explanation": "Because gate D has the highest fan-in (5 inputs), its switching time determines the maximum circuit propagation delay."
  },
  {
    "id": 15,
    "question": "What is the common mistake students make in ISC board exams for this topic?",
    "answer": "Forgetting to include D9 in the equation for output D (writing D = D1+D3+D5+D7 only).",
    "explanation": "Decimal 9 is 1001₂, which has a 1 in both bit position A (8) and bit position D (1). Leaving out D9 causes digit 9 to encode as 8 (1000₂)."
  }
];

export default faqs;
