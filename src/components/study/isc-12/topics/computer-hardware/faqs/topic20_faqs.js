// Topic 20 FAQs - 25 Comprehensive Questions and Answers
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
  },
  {
    "id": 16,
    "question": "What is the basic functional definition of a Multiplexer (MUX)?",
    "answer": "A combinational circuit that selects one binary information input from among 2^n input lines and directs it to a single output line based on n select lines.",
    "explanation": "Known as a Data Selector, it acts as a digital single-pole multi-throw switch controlled by binary address bits."
  },
  {
    "id": 17,
    "question": "What is the mathematical relationship between the number of data inputs (I) and select lines (S) in a MUX?",
    "answer": "I = 2^n, where n is the number of select lines (or n = log2(I)).",
    "explanation": "For example, 4 inputs require 2 select lines (2^2=4); 8 inputs require 3 select lines (2^3=8); 16 inputs require 4 select lines (2^4=16)."
  },
  {
    "id": 18,
    "question": "Why is a Multiplexer called a 'Data Selector'?",
    "answer": "Because the binary value applied to its selection lines 'selects' exactly which data input channel is routed to the output.",
    "explanation": "The select lines act as an address determining which data input appears at pin Y."
  },
  {
    "id": 19,
    "question": "What is the general Boolean equation for any 2^n-to-1 Multiplexer?",
    "answer": "Y = Σ (m_k · I_k) for k = 0 to 2^n - 1, where m_k is the minterm of the selection variables and I_k is the data input.",
    "explanation": "Each data input I_k is ANDed with its corresponding select line minterm, and all terms are ORed together."
  },
  {
    "id": 20,
    "question": "What is the role of an Enable (Strobe) input in a Multiplexer?",
    "answer": "It activates or deactivates the multiplexer. When disabled, the output is forced to logic 0 (or HIGH-Z), regardless of data or select inputs.",
    "explanation": "The Strobe input is vital for expanding multiplexer networks (e.g. cascading two 4:1 MUXes to build an 8:1 MUX)."
  },
  {
    "id": 21,
    "question": "How does a Multiplexer enable Time-Division Multiplexing (TDM) in telecommunications?",
    "answer": "By sequentially cycling select lines (using a binary counter), multiple telephone or sensor data channels share a single long-distance transmission cable.",
    "explanation": "At the receiving end, a Demultiplexer synchronized with the counter reconstructs the individual channels."
  },
  {
    "id": 22,
    "question": "How does a Multiplexer function as a Parallel-to-Serial Data Converter?",
    "answer": "Apply multi-bit parallel data to the inputs (I0-I7); clocking a binary counter connected to the select lines shifts the bits out serially on the single output line Y.",
    "explanation": "This is standard in UART transmission and shift register interfaces."
  },
  {
    "id": 23,
    "question": "Compare a Multiplexer with an Encoder.",
    "answer": "A MUX routes one of 2^n data lines to 1 output using n select lines; an encoder converts 2^n active request lines into an n-bit binary code.",
    "explanation": "MUX output carries the data signal; encoder output carries the address/code."
  },
  {
    "id": 24,
    "question": "What are the common standard commercial Multiplexer ICs?",
    "answer": "IC 74157 (Quad 2-to-1 MUX), IC 74153 (Dual 4-to-1 MUX), IC 74151 (8-to-1 MUX), and IC 74150 (16-to-1 MUX).",
    "explanation": "These TTL 7400 series chips are central to ISC hardware questions."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE definition of a Multiplexer?",
    "answer": "A combinational circuit that receives binary information from 2^n input data lines and directs it to a single output line, governed by n selection lines.",
    "explanation": "Full credit requires mentioning 2^n data inputs, n select lines, and 1 output line."
  }
];

export default faqs;
