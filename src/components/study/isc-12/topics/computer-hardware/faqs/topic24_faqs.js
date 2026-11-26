// Topic 24 FAQs - 25 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What are the terminal specifications of a 16-to-1 line multiplexer?",
    "answer": "16 data inputs (I0-I15), 4 select lines (S3, S2, S1, S0), 1 enable/strobe line (E), and 1 output line (Y).",
    "explanation": "With 2^4 = 16, four binary control lines are required to select one of the sixteen distinct data channels."
  },
  {
    "id": 2,
    "question": "What is the Boolean equation for the output of a 16-to-1 multiplexer?",
    "answer": "Y = Σ (m_i · I_i) from i = 0 to 15, where m_i is the 4-variable minterm of (S3, S2, S1, S0).",
    "explanation": "For example, m0 = S3'S2'S1'S0' gating I0, and m15 = S3·S2·S1·S0 gating I15."
  },
  {
    "id": 3,
    "question": "How many select lines are required for a 16-to-1 multiplexer and why?",
    "answer": "Exactly 4 select lines, because 2^4 = 16.",
    "explanation": "Four binary variables produce exactly 16 distinct combinations from 0000 to 1111, matching the 16 input lines."
  },
  {
    "id": 4,
    "question": "What is the industry-standard commercial IC for a 16-to-1 multiplexer?",
    "answer": "The 74xx150 (74LS150 / 74150) 16-line to 1-line data selector/multiplexer.",
    "explanation": "The 74150 is packaged in a 24-pin DIP and is notable for providing an active-LOW inverted output W."
  },
  {
    "id": 5,
    "question": "Why does the commercial 74150 IC produce an inverted output W instead of true output Y?",
    "answer": "Because implementing a 16-wide OR collector using NAND-NAND logic provides faster switching speed and lower transistor count.",
    "explanation": "In bipolar TTL technology, multi-emitter NAND gates are faster and more compact than multi-input OR structures."
  },
  {
    "id": 6,
    "question": "Which data input line is routed to output Y when select lines are S3=1, S2=1, S1=0, S0=0?",
    "answer": "Data input I12 is routed to output Y.",
    "explanation": "Binary 1100 corresponds to decimal 12. Thus, input line I12 is selected."
  },
  {
    "id": 7,
    "question": "How can a 16-to-1 multiplexer implement any arbitrary 5-variable Boolean function?",
    "answer": "Connect 4 variables to select lines S3-S0; connect the 16 data inputs to {0, 1, 5th variable, or complement of 5th variable}.",
    "explanation": "Using the residual variable method, an implementation table maps the 32 truth table rows into 16 pairs for the 16 MUX inputs."
  },
  {
    "id": 8,
    "question": "In digital communications, how is a 16-to-1 MUX utilized for channel aggregation?",
    "answer": "It combines 16 low-speed parallel voice or telemetry channels onto a single high-speed serial bus.",
    "explanation": "By cycling through the select addresses with a 4-bit binary counter, 16 distinct channels share a single transmission link."
  },
  {
    "id": 9,
    "question": "What are the fan-in and layout challenges when designing a single-stage 16-to-1 MUX with discrete gates?",
    "answer": "It requires sixteen 5-input AND gates and a massive 16-input OR gate, which suffers from excessive capacitive loading and high delay.",
    "explanation": "High fan-in OR gates introduce significant RC delay and signal degradation, making multi-stage tree structures preferable."
  },
  {
    "id": 10,
    "question": "How does a 2-stage tree multiplexer architecture overcome high gate fan-in limitations?",
    "answer": "By using four 4-to-1 MUXes in stage 1 feeding into one 4-to-1 MUX in stage 2.",
    "explanation": "Each stage uses standardized gates with fan-in ≤ 4, dramatically improving signal rise times and noise margins."
  },
  {
    "id": 11,
    "question": "What is the state of the output when Enable E is inactive in a 16-to-1 MUX?",
    "answer": "Output Y is forced to logic 0 (or logic 1 for inverted output W in 74150).",
    "explanation": "De-asserting Enable disables all 16 internal AND gates, shutting off data transmission completely."
  },
  {
    "id": 12,
    "question": "How does a 16-to-1 multiplexer perform 16-bit word serialization?",
    "answer": "A 16-bit data register applies its bits to I0-I15; a 4-bit counter increments S3-S0 every clock cycle, streaming bits serially.",
    "explanation": "This forms the basis of UART parallel-to-serial transmitter shift registers in microcontrollers."
  },
  {
    "id": 13,
    "question": "Compare the packaging of the 74150 with smaller multiplexer ICs.",
    "answer": "The 74150 requires a wide 24-pin DIP package, whereas 74151 (8:1) and 74153 (dual 4:1) fit in compact 16-pin DIPs.",
    "explanation": "The high pin count (16 data + 4 select + 1 strobe + 1 output + VCC + GND = 24 pins) occupies substantial PCB real estate."
  },
  {
    "id": 14,
    "question": "How can two 8-to-1 multiplexers and one 2-to-1 multiplexer form a 16-to-1 multiplexer?",
    "answer": "Inputs I0-I7 go to MUX 1, I8-I15 go to MUX 2; select lines S2, S1, S0 drive both 8:1 MUXes; MSB S3 drives the 2:1 MUX.",
    "explanation": "When S3=0, the 2:1 MUX outputs MUX 1 (I0-I7); when S3=1, it outputs MUX 2 (I8-I15)."
  },
  {
    "id": 15,
    "question": "In ISC examinations, how should students write the truth table for a 16-to-1 MUX concisely?",
    "answer": "Group rows into compact decimal indices: show Enable E=0 with Y=0, then list S3 S2 S1 S0 from 0000 to 1111 with corresponding Y = I0 to I15.",
    "explanation": "A structured 17-row table demonstrating binary combinations with matching input labels ensures complete clarity and full marks."
  },
  {
    "id": 16,
    "question": "What are the inputs and outputs of a 16-to-1 Multiplexer?",
    "answer": "16 Data inputs (I0 to I15), 4 Select lines (S3 MSB, S2, S1, S0 LSB), 1 Strobe/Enable line, and 1 Output (Y).",
    "explanation": "4 select lines produce 2^4 = 16 combinations to select 1 of 16 data inputs."
  },
  {
    "id": 17,
    "question": "What commercial IC part number is a 16-to-1 Multiplexer?",
    "answer": "IC 74150 (24-pin DIP TTL IC with inverted output W).",
    "explanation": "The 74150 is the standard 16-line to 1-line data selector in CISCE hardware syllabi."
  },
  {
    "id": 18,
    "question": "What is the Boolean equation for output Y of a 16-to-1 Multiplexer?",
    "answer": "Y = Σ (m_k · I_k) for k = 0 to 15, where m_k is the minterm of select lines S3, S2, S1, S0.",
    "explanation": "Sum of 16 product terms, each consisting of 4 select literals and 1 data input."
  },
  {
    "id": 19,
    "question": "What output line is selected when S3 S2 S1 S0 = 1 1 0 1?",
    "answer": "Output Y = I13 (since 1101 in binary is decimal 13).",
    "explanation": "Routes input I13 to output Y."
  },
  {
    "id": 20,
    "question": "How can a 16-to-1 MUX implement any 4-variable Boolean function F(A, B, C, D)?",
    "answer": "Connect A, B, C, D to select lines S3, S2, S1, S0; tie I_k to 1 if minterm k is in the function, and tie to 0 if not.",
    "explanation": "Direct mapping requires zero external logic gates."
  },
  {
    "id": 21,
    "question": "How can a 16-to-1 MUX implement any 5-variable Boolean function F(A, B, C, D, E)?",
    "answer": "Connect 4 variables (A, B, C, D) to select lines S3-S0; determine inputs I0-I15 using the 5th variable E as 0, 1, E, or E'.",
    "explanation": "Using (n-1) select lines allows a 16:1 MUX to realize any 5-variable logic function."
  },
  {
    "id": 22,
    "question": "How many gate levels are in the internal architecture of a standard 16-to-1 MUX?",
    "answer": "Two levels: an AND level (sixteen 5-input AND gates) followed by an OR level (one 16-input OR gate or tree of OR gates).",
    "explanation": "Two-level logic ensures minimal propagation delay across all 16 channels."
  },
  {
    "id": 23,
    "question": "Why is IC 74150 packaged in a 24-pin DIP rather than a standard 16-pin DIP?",
    "answer": "Because it requires 16 data pins + 4 select pins + 1 strobe pin + 1 output pin + Vcc + GND = 24 pins.",
    "explanation": "The high pin count requires a wider 24-pin dual in-line package."
  },
  {
    "id": 24,
    "question": "How does a 16-to-1 MUX function in digital waveform generation?",
    "answer": "By hardwiring inputs I0-I15 to constant 0s and 1s and driving select lines with a binary counter, it generates any repetitive 16-bit serial bitstream.",
    "explanation": "Acts as an arbitrary serial pattern/waveform generator."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE question format for a 16-to-1 MUX?",
    "answer": "Draw block diagram, write Function Table showing select lines S3-S0, and show how a 4-variable or 5-variable Boolean function is realized.",
    "explanation": "A frequent 4-mark question in Section D of the theory examination."
  }
];

export default faqs;
