// Topic 14 FAQs - 25 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is the truth table specification of an active-HIGH 2-to-4 line decoder with active-HIGH enable?",
    "answer": "When E=0, Y0=Y1=Y2=Y3=0. When E=1: 00 -> Y0=1; 01 -> Y1=1; 10 -> Y2=1; 11 -> Y3=1.",
    "explanation": "The Enable input acts as an overall circuit gatekeeper. Only when E=1 does the 2-bit input code (A1 A0) activate the corresponding output line."
  },
  {
    "id": 2,
    "question": "What are the Boolean equations for the 4 outputs of an active-HIGH 2-to-4 decoder with Enable E?",
    "answer": "Y0 = E · A1' · A0', Y1 = E · A1' · A0, Y2 = E · A1 · A0', Y3 = E · A1 · A0.",
    "explanation": "Each output is formed by an AND gate receiving the Enable signal along with the true or complemented forms of input address lines A1 and A0."
  },
  {
    "id": 3,
    "question": "How many logic gates are required to construct an active-HIGH 2-to-4 line decoder with Enable?",
    "answer": "Two NOT gates (inverters) and four 3-input AND gates.",
    "explanation": "The two NOT gates generate the complements A1' and A0'. The four 3-input AND gates generate the four minterms conditioned by the Enable line E."
  },
  {
    "id": 4,
    "question": "What is the output state when Enable E = 0 regardless of the values on A1 and A0?",
    "answer": "All four outputs Y0, Y1, Y2, Y3 remain strictly at logic 0.",
    "explanation": "Because E is connected to an input of every AND gate, when E=0, the output of every AND gate is forced to 0 according to the Boolean identity 0 · X = 0."
  },
  {
    "id": 5,
    "question": "If inputs are A1 = 1, A0 = 0 and E = 1, which output pin goes HIGH?",
    "answer": "Output Y2 goes HIGH (logic 1), while Y0, Y1, and Y3 remain LOW (logic 0).",
    "explanation": "The binary combination 10 represents decimal 2. Thus, the minterm m2 (A1 · A0') is asserted."
  },
  {
    "id": 6,
    "question": "Why are NOT gates placed at the inputs of a 2-to-4 decoder?",
    "answer": "To provide both true and complemented forms of each input variable to the AND gate array.",
    "explanation": "Minterms require specific variable polarities (e.g., m0 requires both A1' and A0'). Inverters generate these complementary signals directly on-chip."
  },
  {
    "id": 7,
    "question": "How does an active-HIGH 2-to-4 decoder generate standard minterms m0, m1, m2, m3?",
    "answer": "By setting E=1, each output Y_i directly implements the algebraic minterm expression m_i.",
    "explanation": "Specifically: Y0 = m0 = A1'A0', Y1 = m1 = A1'A0, Y2 = m2 = A1A0', and Y3 = m3 = A1A0."
  },
  {
    "id": 8,
    "question": "How can a 2-to-4 line decoder be used to implement a 1-bit Half Adder?",
    "answer": "By connecting an OR gate to Y1 and Y2 for Sum (m1 + m2), and taking Y3 directly for Carry (m3).",
    "explanation": "A Half Adder requires Sum = A ⊕ B = A'B + AB' = m1 + m2, and Carry = AB = m3. The decoder provides all four minterms ready for summation."
  },
  {
    "id": 9,
    "question": "What is the fan-in requirement for the AND gates in a 2-to-4 decoder with Enable?",
    "answer": "A fan-in of 3 (each AND gate must accept 3 inputs: Enable, A1/A1', and A0/A0').",
    "explanation": "If no Enable pin is included, the fan-in reduces to 2 (only the two address variables)."
  },
  {
    "id": 10,
    "question": "What happens if the Enable line of a TTL 2-to-4 decoder is left unconnected (floating)?",
    "answer": "In classic TTL logic, a floating pin floats to logic HIGH, enabling the circuit, but in modern CMOS it causes indeterminate states and oscillation.",
    "explanation": "Good engineering practice requires unused or control pins to be tied securely to VCC or GND via pull-up/pull-down resistors."
  },
  {
    "id": 11,
    "question": "What are switching glitches/hazards in a 2-to-4 decoder and how does Enable prevent them?",
    "answer": "Temporary false spikes on outputs when address bits switch non-simultaneously; disabling E during address transitions suppresses them.",
    "explanation": "If A1 changes before A0, an unintended intermediate code could briefly flash an output. De-asserting Enable until inputs stabilize eliminates these hazards."
  },
  {
    "id": 12,
    "question": "In microcontroller memory mapping, how does a 2-to-4 decoder select between 4 peripheral chips?",
    "answer": "Two address bus lines connect to A1 and A0, and each output line connects to the Chip Select (CS) pin of one peripheral.",
    "explanation": "Address 00 selects Peripheral 0, 01 selects Peripheral 1, 10 selects Peripheral 2, and 11 selects Peripheral 3."
  },
  {
    "id": 13,
    "question": "What is the maximum number of simultaneously active outputs in a standard 2-to-4 decoder?",
    "answer": "Exactly one output when enabled, and zero outputs when disabled.",
    "explanation": "Because the four binary codes (00, 01, 10, 11) are mutually exclusive, no two AND gates can ever be satisfied at the same time."
  },
  {
    "id": 14,
    "question": "What is the standard block diagram symbol for an active-HIGH 2-to-4 decoder?",
    "answer": "A rectangular box with 2 data input lines on the left, 1 enable line on the bottom/side, and 4 output lines without inversion bubbles on the right.",
    "explanation": "The absence of bubbles indicates active-HIGH operation. Inputs are labeled A1 (MSB), A0 (LSB), and outputs are labeled Y0, Y1, Y2, Y3."
  },
  {
    "id": 15,
    "question": "What common mistake do students make in ISC examinations when drawing a 2-to-4 decoder?",
    "answer": "Swapping MSB and LSB connections or omitting the Enable line from the gate-level diagram.",
    "explanation": "Reversing A1 and A0 inverts the minterm assignments (confusing Y1 and Y2), while omitting E ignores a mandatory 3-input AND gate requirement."
  },
  {
    "id": 16,
    "question": "What are the inputs and outputs of a 2-to-4 line binary decoder with Active-HIGH enable?",
    "answer": "Inputs: 2 address lines (A1 MSB, A0 LSB) and 1 Enable line (E); Outputs: 4 data lines (Y0, Y1, Y2, Y3).",
    "explanation": "When E = 1, exactly one output Y_i corresponding to binary code A1A0 becomes 1."
  },
  {
    "id": 17,
    "question": "Write the Boolean equations for the 4 outputs of an active-HIGH 2-to-4 decoder with enable E.",
    "answer": "Y0 = E · A1' · A0'; Y1 = E · A1' · A0; Y2 = E · A1 · A0'; Y3 = E · A1 · A0.",
    "explanation": "Each output is an AND gate taking enable E and the corresponding minterm literals."
  },
  {
    "id": 18,
    "question": "What type and number of logic gates are used to build this decoder?",
    "answer": "Four 3-input AND gates and two inverters (NOT gates).",
    "explanation": "Two inverters provide A1' and A0'; each 3-input AND gate combines E and two address literals."
  },
  {
    "id": 19,
    "question": "What is the output state when E = 0, A1 = 1, A0 = 1?",
    "answer": "All outputs are 0 (Y0 = 0, Y1 = 0, Y2 = 0, Y3 = 0).",
    "explanation": "Because E = 0, all AND gates are disabled regardless of address inputs."
  },
  {
    "id": 20,
    "question": "What is the output state when E = 1, A1 = 1, A0 = 0?",
    "answer": "Y2 = 1, and Y0 = Y1 = Y3 = 0.",
    "explanation": "Binary 10 is decimal 2, which activates line Y2."
  },
  {
    "id": 21,
    "question": "Show the complete Truth Table of a 2-to-4 decoder with Active-HIGH enable.",
    "answer": "E A1 A0 | Y3 Y2 Y1 Y0 : (0 X X → 0 0 0 0), (1 0 0 → 0 0 0 1), (1 0 1 → 0 0 1 0), (1 1 0 → 0 1 0 0), (1 1 1 → 1 0 0 0).",
    "explanation": "A 5-row truth table illustrating disabled state (E=0) and all 4 active minterms (E=1)."
  },
  {
    "id": 22,
    "question": "How does a 2-to-4 decoder implement a 1-to-4 Demultiplexer?",
    "answer": "Use Enable (E) as the Data Input line (D), and use address lines A1, A0 as the Select Lines (S1, S0).",
    "explanation": "The input data D is routed directly to the selected output line Y_i."
  },
  {
    "id": 23,
    "question": "How can a Full Adder Sum and Carry be generated using a 3-to-8 decoder (extended from 2-to-4)?",
    "answer": "Sum = OR(m1, m2, m4, m7); Carry = OR(m3, m5, m6, m7).",
    "explanation": "Decoder outputs are fed into external OR gates to form the functions directly."
  },
  {
    "id": 24,
    "question": "Why are inverters with high fan-out capability preferred for driving decoder address buses?",
    "answer": "Because each address line connects to half of all decoder AND gates (e.g., in a 4-to-16 decoder, each address drives 8 gates).",
    "explanation": "Adequate fan-out prevents signal degradation across multiple gate inputs."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE question format for a 2-to-4 Decoder?",
    "answer": "Draw Truth Table with Enable input, derive Boolean expressions for Y0-Y3, and draw the logic gate diagram using AND gates.",
    "explanation": "A standard 3-mark to 4-mark question testing foundational decoder construction."
  }
];

export default faqs;
