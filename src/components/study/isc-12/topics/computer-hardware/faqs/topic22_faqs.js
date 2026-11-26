// Topic 22 FAQs - 25 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is the structural definition and terminal count of a 4-to-1 line multiplexer?",
    "answer": "4 data inputs (I0, I1, I2, I3), 2 select lines (S1, S0), 1 enable/strobe line (E), and 1 output line (Y).",
    "explanation": "Since 2^2 = 4, two select lines are necessary and sufficient to address any of the four data input channels."
  },
  {
    "id": 2,
    "question": "What is the Boolean algebraic equation for the output Y of a 4-to-1 MUX?",
    "answer": "Y = S1'·S0'·I0 + S1'·S0·I1 + S1·S0'·I2 + S1·S0·I3 (conditioned by Enable E).",
    "explanation": "Each product term matches one 2-bit binary minterm of the select variables S1 and S0, gating the corresponding data input."
  },
  {
    "id": 3,
    "question": "How many logic gates are required to construct a discrete 4-to-1 MUX with enable?",
    "answer": "Two NOT gates (for S1' and S0'), four 4-input AND gates, and one 4-input OR gate.",
    "explanation": "Each 4-input AND gate receives Enable E, two select literals, and one data input line."
  },
  {
    "id": 4,
    "question": "Present the functional routing table for a 4-to-1 multiplexer with Enable E=1.",
    "answer": "S1=0, S0=0 -> Y=I0; S1=0, S0=1 -> Y=I1; S1=1, S0=0 -> Y=I2; S1=1, S0=1 -> Y=I3.",
    "explanation": "When Enable E=0, Y=0 regardless of the states of S1, S0, and all data inputs."
  },
  {
    "id": 5,
    "question": "Which data input line is routed to output Y when S1 = 1 and S0 = 0?",
    "answer": "Input line I2 is routed to output Y.",
    "explanation": "Binary 10 equals decimal 2. Hence, select combination 10 activates the AND gate for data line I2."
  },
  {
    "id": 6,
    "question": "How does a 4-to-1 multiplexer implement any arbitrary 3-variable Boolean function without extra gates?",
    "answer": "Connect two variables to select lines S1 and S0; derive the 4 data inputs from the third variable {0, 1, C, C'}.",
    "explanation": "This is known as the residual variable method, mapping an 8-row truth table into 4 pairs corresponding to the 4 MUX inputs."
  },
  {
    "id": 7,
    "question": "How can a 1-bit Half Adder be implemented using two 4-to-1 multiplexers?",
    "answer": "Connect A and B to select lines; set MUX 1 inputs to {0, 1, 1, 0} for Sum, and MUX 2 inputs to {0, 0, 0, 1} for Carry.",
    "explanation": "Sum has minterms m1, m2 (I1=1, I2=1, I0=I3=0). Carry has minterm m3 (I3=1, I0=I1=I2=0)."
  },
  {
    "id": 8,
    "question": "What is the commercial IC number for a dual 4-to-1 multiplexer?",
    "answer": "The 74xx153 (74LS153 / 74HC153) dual 4-line to 1-line data selector/multiplexer.",
    "explanation": "The 74153 contains two complete, independent 4-to-1 multiplexers sharing common select lines S1 and S0, with separate active-LOW enables."
  },
  {
    "id": 9,
    "question": "Explain why sharing select lines in the 74153 dual 4-to-1 MUX is advantageous.",
    "answer": "It allows simultaneous 2-bit word multiplexing (e.g., selecting between two 2-bit registers) with minimal pin count.",
    "explanation": "One MUX handles bit 0 and the other handles bit 1, both switched in tandem by the single select bus (S1, S0)."
  },
  {
    "id": 10,
    "question": "What is the state of output Y if active-LOW Enable E' is held at logic 1?",
    "answer": "Output Y remains at logic 0 regardless of all other inputs.",
    "explanation": "Active-LOW enable requires E'=0 to operate. An asserted 1 on E' disables the internal AND gates."
  },
  {
    "id": 11,
    "question": "How does a 4-to-1 MUX perform parallel-to-serial conversion of a 4-bit nibble?",
    "answer": "The 4 bits are placed on I0-I3; a 2-bit binary counter clocks S1 and S0 through 00, 01, 10, 11 sequentially.",
    "explanation": "The serial output stream transmits bit 0, bit 1, bit 2, and bit 3 consecutively over one communication wire."
  },
  {
    "id": 12,
    "question": "Why do all unselected AND gates in a 4-to-1 multiplexer produce logic 0?",
    "answer": "Because at least one of their select input literals is at logic 0 for any binary combination of S1 and S0.",
    "explanation": "The minterms formed by S1 and S0 are mutually exclusive; exactly one minterm is 1, and the other three are strictly 0."
  },
  {
    "id": 13,
    "question": "What is the fan-in requirement for the output OR gate in a 4-to-1 multiplexer?",
    "answer": "A fan-in of 4 (one input per AND gate output).",
    "explanation": "In modern CMOS gate arrays, a 4-input OR is commonly realized as a 4-input NOR followed by an inverter."
  },
  {
    "id": 14,
    "question": "How can a 4-to-1 multiplexer be implemented using three 2-to-1 multiplexers?",
    "answer": "Two 2-to-1 MUXes in the first stage (driven by S0) feeding into one 2-to-1 MUX in the second stage (driven by S1).",
    "explanation": "Stage 1 selects between (I0, I1) and (I2, I3). Stage 2 selects between the results of the two first-stage MUXes."
  },
  {
    "id": 15,
    "question": "What key diagrammatic features do CISCE examiners inspect in 4-to-1 MUX questions?",
    "answer": "Clearly labeled inputs (I0-I3), select lines (S1=MSB, S0=LSB), Enable pin, and accurate Boolean sum-of-products equation.",
    "explanation": "Marks are deducted if S1 and S0 are inverted or if the internal AND gate minterm combinations do not match the inputs."
  },
  {
    "id": 16,
    "question": "What are the inputs and outputs of a 4-to-1 Multiplexer?",
    "answer": "4 Data inputs (I0, I1, I2, I3), 2 Select lines (S1 MSB, S0 LSB), and 1 Output (Y).",
    "explanation": "2 select lines produce 2^2 = 4 combinations, selecting one of I0-I3."
  },
  {
    "id": 17,
    "question": "What is the Boolean equation of a 4-to-1 Multiplexer?",
    "answer": "Y = S1'S0'I0 + S1'S0I1 + S1S0'I2 + S1S0I3.",
    "explanation": "Each data input is ANDed with its corresponding 2-variable select minterm."
  },
  {
    "id": 18,
    "question": "What is the Function Table of a 4-to-1 Multiplexer?",
    "answer": "S1 S0 | Output Y : (0 0 → I0), (0 1 → I1), (1 0 → I2), (1 1 → I3).",
    "explanation": "Addresses 00, 01, 10, 11 route I0, I1, I2, I3 respectively to Y."
  },
  {
    "id": 19,
    "question": "How many and what type of logic gates are used to build a 4-to-1 MUX?",
    "answer": "Two NOT gates (for S1', S0'), four 3-input AND gates, and one 4-input OR gate.",
    "explanation": "The two NOT gates provide complemented select lines; each AND gate evaluates one minterm; the OR gate sums all paths."
  },
  {
    "id": 20,
    "question": "What commercial IC contains two 4-to-1 Multiplexers in a single DIP package?",
    "answer": "IC 74153 (Dual 4-line to 1-line multiplexer).",
    "explanation": "Contains two independent 4:1 multiplexers sharing common select lines S1 and S0 but with separate active-low enable pins (1E', 2E')."
  },
  {
    "id": 21,
    "question": "How does an Enable (E) pin affect the 4-to-1 MUX equation if included?",
    "answer": "Y = E · (S1'S0'I0 + S1'S0I1 + S1S0'I2 + S1S0I3).",
    "explanation": "If E = 0, Y = 0 regardless of data or select inputs."
  },
  {
    "id": 22,
    "question": "What output is produced when S1 = 1, S0 = 0?",
    "answer": "Output Y = I2.",
    "explanation": "Binary 10 is decimal 2, which activates the third AND gate, routing data input I2 to Y."
  },
  {
    "id": 23,
    "question": "How can a 4-to-1 MUX be built using three 2-to-1 MUXes?",
    "answer": "MUX 1 selects between I0, I1 using S0; MUX 2 selects between I2, I3 using S0; MUX 3 selects between the outputs of MUX 1 and MUX 2 using S1.",
    "explanation": "A two-level tree hierarchy: Level 1 decodes S0; Level 2 decodes S1."
  },
  {
    "id": 24,
    "question": "How does a 4-to-1 MUX implement any 2-variable Boolean function F(A, B)?",
    "answer": "Connect A, B to select lines S1, S0; connect inputs I0-I3 directly to logic 0 or logic 1 according to the truth table output.",
    "explanation": "Zero external gates are needed; inputs I0-I3 are simply tied to Vcc or GND."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE marking scheme for a 4-to-1 MUX?",
    "answer": "1 mark for Function Table, 1 mark for Boolean equation, and 2 marks for gate-level logic diagram.",
    "explanation": "Full marks require clear labeling of S1, S0, I0-I3, and Y."
  }
];

export default faqs;
