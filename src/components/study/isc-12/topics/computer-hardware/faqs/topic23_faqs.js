// Topic 23 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What are the terminal specifications of an 8-to-1 line multiplexer?",
    "answer": "8 data inputs (D0-D7), 3 select lines (S2, S1, S0), 1 strobe/enable pin (E), and 1 output line (Y).",
    "explanation": "With 2^3 = 8 combinations, 3 binary select bits uniquely identify and route any one of the eight data input channels."
  },
  {
    "id": 2,
    "question": "What is the complete Boolean equation for the output Y of an 8-to-1 multiplexer?",
    "answer": "Y = Σ (m_i · D_i) for i = 0 to 7 = S2'S1'S0'D0 + S2'S1'S0 D1 + ... + S2 S1 S0 D7.",
    "explanation": "Each data input D_i is ANDed with its corresponding 3-variable minterm m_i formed by select inputs S2, S1, and S0."
  },
  {
    "id": 3,
    "question": "How many logic gates and of what fan-in are needed to construct an 8-to-1 MUX from discrete gates?",
    "answer": "Three NOT gates, eight 5-input AND gates (including Enable), and one 8-input OR gate.",
    "explanation": "Each AND gate accepts Enable E, three select literals, and one data line, totaling 5 inputs per gate."
  },
  {
    "id": 4,
    "question": "What is the industry-standard commercial IC for an 8-to-1 multiplexer?",
    "answer": "The 74xx151 (74LS151 / 74HC151) 8-line to 1-line data selector/multiplexer.",
    "explanation": "The 74151 is a 16-pin MSI chip featuring complementary outputs (Y and W) and an active-LOW strobe input."
  },
  {
    "id": 5,
    "question": "What unique output feature does the 74151 IC provide?",
    "answer": "It provides both the true output Y and its logical complement W (where W = Y').",
    "explanation": "Having both outputs simultaneously available simplifies circuit interfacing by eliminating external inverter ICs."
  },
  {
    "id": 6,
    "question": "Which data input is connected to output Y when select lines are S2=1, S1=0, S0=1?",
    "answer": "Data input D5 is routed to output Y.",
    "explanation": "Binary 101 corresponds to decimal 5. Thus, the 6th input channel (D5) is asserted to the output."
  },
  {
    "id": 7,
    "question": "How can an 8-to-1 MUX implement any arbitrary 4-variable Boolean function?",
    "answer": "Connect three variables to select lines S2, S1, S0; determine D0-D7 from the fourth variable {0, 1, D, D'} using an implementation table.",
    "explanation": "An 8-to-1 MUX naturally covers all 16 minterms of 4 variables by grouping them into 8 pairs evaluated against the residual variable."
  },
  {
    "id": 8,
    "question": "How can a 1-bit Full Adder (Sum and Carry) be implemented using two 8-to-1 multiplexers?",
    "answer": "Connect inputs A, B, C to select lines S2, S1, S0; set Sum MUX inputs D1=D2=D4=D7=1, and Carry MUX inputs D3=D5=D6=D7=1.",
    "explanation": "All unselected inputs are tied to logic 0 (GND). This directly implements Sum = Σ(1,2,4,7) and Carry = Σ(3,5,6,7)."
  },
  {
    "id": 9,
    "question": "What is the function of the Strobe pin (S' or E') in the 74151 IC?",
    "answer": "When S'=0, normal multiplexing occurs; when S'=1, true output Y is forced to 0 and complement output W is forced to 1.",
    "explanation": "This allows cascading multiple 74151 chips or disabling the multiplexer during system initialization."
  },
  {
    "id": 10,
    "question": "What is the typical propagation delay from select lines to output in a 74LS151 multiplexer?",
    "answer": "Approximately 15 to 30 nanoseconds depending on whether true or inverted output is observed.",
    "explanation": "The select-to-output path involves internal inverters, a 4-input NAND stage, and an output inverter stage."
  },
  {
    "id": 11,
    "question": "Why is an 8-to-1 multiplexer considered the most versatile MSI chip for 3- and 4-variable logic design?",
    "answer": "Because it can synthesize any 3-variable function with zero external gates, and any 4-variable function with at most one inverter.",
    "explanation": "This dramatic reduction in component count made the 74151 an indispensable building block in pre-FPGA digital system engineering."
  },
  {
    "id": 12,
    "question": "How does an 8-to-1 multiplexer behave as a byte-to-serial converter?",
    "answer": "An 8-bit byte is loaded onto D0-D7; a modulo-8 binary counter clocks S2, S1, S0 from 000 to 111, serializing the byte.",
    "explanation": "Each clock pulse advances the select lines, streaming bits D0 through D7 onto the transmission line sequentially."
  },
  {
    "id": 13,
    "question": "What occurs if multiple select lines change simultaneously in an 8-to-1 MUX?",
    "answer": "Intermediate transient decoding states may cause dynamic glitches on the output line for a few nanoseconds.",
    "explanation": "For example, switching from 011 to 100 may momentarily decode 000 or 111 due to asymmetric propagation delays along select inverter paths."
  },
  {
    "id": 14,
    "question": "How can an 8-to-1 MUX be built using two 4-to-1 MUXes and one 2-to-1 MUX?",
    "answer": "D0-D3 feed MUX 1, D4-D7 feed MUX 2; S1, S0 drive both 4-to-1 MUXes; MSB S2 drives the 2-to-1 MUX.",
    "explanation": "S1 and S0 select the channel within each 4-input bank; S2 selects between the upper and lower banks."
  },
  {
    "id": 15,
    "question": "What are common pitfalls students encounter in ISC exams when drawing an 8-to-1 MUX circuit?",
    "answer": "Reversing select bit significance (assigning S0 as MSB) or forgetting to tie unused data inputs securely to GND or VCC.",
    "explanation": "Reversing select lines scrambles minterm routing completely. In digital circuits, floating inputs cause unpredictable outputs."
  }
];

export default faqs;
