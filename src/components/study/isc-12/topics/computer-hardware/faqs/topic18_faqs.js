// Topic 18 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "How many 3-to-8 line decoders are required to construct a 4-to-16 line decoder?",
    "answer": "Two 3-to-8 line decoders.",
    "explanation": "Each 3-to-8 decoder produces 8 outputs. Two such decoders provide 8 + 8 = 16 distinct output lines (Y0 through Y15)."
  },
  {
    "id": 2,
    "question": "What role does the MSB (A) play in a 4-to-16 cascaded decoder system?",
    "answer": "MSB A selects between the lower block (outputs 0-7) and the upper block (outputs 8-15).",
    "explanation": "When A=0, the address is in range 0000-0111 (0-7); when A=1, the address is in range 1000-1111 (8-15)."
  },
  {
    "id": 3,
    "question": "How are the three remaining input lines (B, C, D) wired to both 3-to-8 decoders?",
    "answer": "They are wired directly in parallel to inputs (A, B, C) of both 3-to-8 decoders.",
    "explanation": "Lines B, C, D specify the exact minterm index (0 through 7) within whichever 8-output decoder block is enabled."
  },
  {
    "id": 4,
    "question": "Why is NO external NOT gate needed when cascading two 74138 ICs into a 4-to-16 decoder?",
    "answer": "Because the 74138 provides both active-HIGH (G1) and active-LOW (G2A', G2B') enable inputs on-chip.",
    "explanation": "By connecting MSB A to the active-LOW enable of Chip 1 and to the active-HIGH enable of Chip 2, complementary chip enabling is achieved without external gates."
  },
  {
    "id": 5,
    "question": "How are the enable pins wired when cascading two 74138 ICs into a 4-to-16 decoder?",
    "answer": "Connect MSB A to G2A' of Chip 1 and to G1 of Chip 2; connect G1 of Chip 1 and G2A' of Chip 2 to VCC and GND respectively.",
    "explanation": "When A=0, Chip 1 is enabled (G2A'=0) and Chip 2 is disabled (G1=0). When A=1, Chip 1 is disabled (G2A'=1) and Chip 2 is enabled (G1=1)."
  },
  {
    "id": 6,
    "question": "What are the output ranges produced by Decoder 1 and Decoder 2?",
    "answer": "Decoder 1 produces outputs Y0 to Y7 (minterms m0 to m7); Decoder 2 produces outputs Y8 to Y15 (minterms m8 to m15).",
    "explanation": "Together, they generate all 16 canonical minterms corresponding to 4 binary variables (A, B, C, D)."
  },
  {
    "id": 7,
    "question": "How can five 2-to-4 decoders be tree-cascaded to form a 4-to-16 line decoder?",
    "answer": "One 2-to-4 decoder acts as a pre-decoder driven by the two MSBs, and its 4 outputs enable four 2-to-4 sub-decoders driven by the two LSBs.",
    "explanation": "Pre-decoder outputs enable Decoder 1 (Y0-Y3), Decoder 2 (Y4-Y7), Decoder 3 (Y8-Y11), or Decoder 4 (Y12-Y15). Total outputs = 4 × 4 = 16."
  },
  {
    "id": 8,
    "question": "In the 5-decoder tree, what is the role of the first 2-to-4 decoder?",
    "answer": "It acts as a 1-of-4 bank selector, routing the master enable to only one of the four output decoders.",
    "explanation": "The two MSBs (A, B) decode which group of 4 outputs should be active, while C and D select the specific line within that group."
  },
  {
    "id": 9,
    "question": "Compare the propagation delay of a monolithic 4-to-16 decoder versus a 5-unit cascaded 2-to-4 tree.",
    "answer": "The cascaded tree has approximately double the propagation delay because signals must pass through two sequential decoder stages.",
    "explanation": "The pre-decoder delay must elapse before the second stage decoders receive their valid enable signals."
  },
  {
    "id": 10,
    "question": "In a 16-bit address microprocessor system, how is a 4-to-16 decoder used for memory banking?",
    "answer": "The top 4 address lines (A15-A12) connect to the decoder, dividing 64 KB memory space into 16 separate 4 KB memory blocks.",
    "explanation": "Each 4 KB memory chip uses 12 address lines (A0-A11) for internal addressing, and its /CS pin connects to one of the 16 decoder outputs."
  },
  {
    "id": 11,
    "question": "What is the state of all 16 outputs when the master system enable line is deactivated?",
    "answer": "All 16 outputs remain completely de-asserted (all 0 for active-HIGH, or all 1 for active-LOW).",
    "explanation": "Master enable de-assertion inhibits all decoders, ensuring the memory bus remains in a high-impedance or unselected state."
  },
  {
    "id": 12,
    "question": "What is bus contention and how does decoder cascading avoid it?",
    "answer": "Bus contention occurs when multiple devices drive a shared bus simultaneously; cascading ensures strictly one device is enabled at any instant.",
    "explanation": "Because only one output line out of all 16 lines can be active for any 4-bit binary combination, bus conflict is physically impossible."
  },
  {
    "id": 13,
    "question": "Can active-LOW 4-to-16 outputs directly interface with active-LOW /CS pins of SRAM chips?",
    "answer": "Yes, directly without needing any inverter gates.",
    "explanation": "The active-LOW 0 output matches the active-LOW /CS input requirement of SRAM chips, simplifying PCB interconnects."
  },
  {
    "id": 14,
    "question": "How many 4-to-16 decoders and what extra component would be needed to decode a 5-to-32 line system?",
    "answer": "Two 4-to-16 decoders and one inverter (or one 1-to-2 decoder) to steer the 5th variable (MSB) between their enables.",
    "explanation": "Each 4-to-16 decoder handles 16 lines; two decoders yield 32 lines, selected by the 5th address bit."
  },
  {
    "id": 15,
    "question": "What are the essential labeling requirements for the ISC board 4-to-16 cascading diagram?",
    "answer": "Chip names (Decoder 1, Decoder 2), inputs A (MSB), B, C, D (LSB), Enable connections with truth table, and outputs labeled Y0-Y7 and Y8-Y15.",
    "explanation": "Clear labeling guarantees that examiners can trace signal flow from inputs through the enable gating to all 16 output lines."
  }
];

export default faqs;
