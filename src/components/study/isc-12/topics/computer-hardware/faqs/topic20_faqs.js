// Topic 20 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is a Multiplexer (MUX) in digital systems?",
    "answer": "A combinational circuit that selects binary information from one of many input lines and directs it to a single output line.",
    "explanation": "Often abbreviated as MUX or called a Data Selector, it acts as a digital multiposition switch controlled by binary selection lines."
  },
  {
    "id": 2,
    "question": "Why is a multiplexer referred to as a 'Data Selector'?",
    "answer": "Because the binary signals applied to its select control inputs dynamically determine which data input channel is routed to the output.",
    "explanation": "Just as a mechanical rotary selector picks one audio channel to connect to an amplifier, a MUX selects one digital data channel out of many."
  },
  {
    "id": 3,
    "question": "What is the mathematical relationship between data inputs and select lines in a multiplexer?",
    "answer": "For 2^n data input lines, exactly 'n' select (address) lines are required (2^n-to-1).",
    "explanation": "For example: 2 inputs need 1 select line; 4 inputs need 2 select lines; 8 inputs need 3 select lines; 16 inputs need 4 select lines."
  },
  {
    "id": 4,
    "question": "What are the four primary functional terminal groups of a standard multiplexer?",
    "answer": "1. Data Inputs (2^n lines), 2. Select/Control Inputs (n lines), 3. Enable/Strobe Input, and 4. Single Output Line (Y).",
    "explanation": "Some commercial multiplexer ICs also provide an inverted output (Y' or W) alongside the true output Y."
  },
  {
    "id": 5,
    "question": "What is the purpose of the Strobe or Enable (E or EN) input in a multiplexer?",
    "answer": "It activates or disables the entire multiplexer circuit independent of data or select inputs.",
    "explanation": "When active, the selected input is transferred to the output. When inactive, the output is forced to logic 0 (or high impedance), allowing chip cascading and bus sharing."
  },
  {
    "id": 6,
    "question": "How does a multiplexer act as a digital Single-Pole Multi-Throw (SPMT) switch?",
    "answer": "The single pole represents the output line, while the multiple throws represent the data input lines switched electronically by the select lines.",
    "explanation": "The select lines behave like the switch dial, electronically connecting the pole to exactly one selected throw contact at a time."
  },
  {
    "id": 7,
    "question": "What is Time-Division Multiplexing (TDM) and how do multiplexers enable it?",
    "answer": "Transmitting multiple independent data streams across a single shared transmission medium by allocating sequential time slots to each channel.",
    "explanation": "A high-speed counter cycles through the select lines of the MUX, sending a slice of data from channel 0, then channel 1, and so on sequentially."
  },
  {
    "id": 8,
    "question": "Why can a multiplexer be considered a universal logic element?",
    "answer": "Because any arbitrary Boolean truth table can be implemented directly using a MUX without designing complex gate networks.",
    "explanation": "By connecting truth table values directly to data inputs and variables to select lines, a MUX physically acts as a programmable logic table."
  },
  {
    "id": 9,
    "question": "Can a multiplexer have complementary outputs? Give an example.",
    "answer": "Yes, many commercial multiplexers (e.g., 74151) provide both true (Y) and inverted (W) outputs.",
    "explanation": "Complementary outputs eliminate the need for external inverters when active-LOW or inverted logic signals are required by subsequent stages."
  },
  {
    "id": 10,
    "question": "How does a multiplexer facilitate parallel-to-serial data conversion?",
    "answer": "By applying parallel data bits to the data inputs and clocking a binary counter connected to the select lines.",
    "explanation": "As the counter increments (0, 1, 2, ...), the data bits appear serially one after another on the single output line in synchrony with the clock."
  },
  {
    "id": 11,
    "question": "What is the fundamental difference between a Multiplexer and a Decoder?",
    "answer": "A MUX routes one of 2^n data inputs to 1 output; a Decoder expands n inputs into 2^n distinct output lines.",
    "explanation": "A MUX has many inputs and 1 output (data routing). A Decoder has few inputs and many outputs (code translation/spatial expansion)."
  },
  {
    "id": 12,
    "question": "What internal logic structure constitutes an AND-OR multiplexer?",
    "answer": "An array of 2^n AND gates (each decoding one select code and gating one data input) feeding into a single multi-input OR gate.",
    "explanation": "Only the AND gate whose select lines match the input code is enabled; its data passes through the OR gate to the output."
  },
  {
    "id": 13,
    "question": "How does propagation delay through a multiplexer affect system clock frequencies?",
    "answer": "The select-to-output and data-to-output delays define the minimum setup time for downstream registers, bounding maximum clock speed.",
    "explanation": "In high-speed CPU datapaths (e.g., ALU operand selection), multiplexer propagation delay is often a critical path bottleneck."
  },
  {
    "id": 14,
    "question": "What is a static hazard or glitch in a multiplexer?",
    "answer": "A brief unwanted pulse on the output when select lines change between two inputs that both have logic 1 applied.",
    "explanation": "Slight differences in inverter and gate propagation delays can momentarily cause all AND gates to output 0 before the new one activates."
  },
  {
    "id": 15,
    "question": "In ISC Class 12 board examinations, what are the primary drawing conventions for multiplexers?",
    "answer": "Trapezoidal or rectangular block symbol with inputs on left, select lines on bottom, enable on side, and output on right.",
    "explanation": "The trapezoidal symbol visually communicates line concentration: wide input side converging to a narrow single-output side."
  }
];

export default faqs;
