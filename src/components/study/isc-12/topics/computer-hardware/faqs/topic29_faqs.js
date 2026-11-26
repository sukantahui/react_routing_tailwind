// Topic 29 FAQs - 25 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is a Demultiplexer (DEMUX) in digital electronics?",
    "answer": "A combinational circuit that takes a single data input line and directs it to one of many output lines selected by control inputs.",
    "explanation": "Often abbreviated as DEMUX or called a Data Distributor, it performs the exact inverse operation of a multiplexer."
  },
  {
    "id": 2,
    "question": "Why is a demultiplexer commonly referred to as a 'Data Distributor'?",
    "answer": "Because it receives a single stream of incoming data and distributes it to a designated destination channel among many candidates.",
    "explanation": "Just as a postal distribution center sorts incoming mail and routes it to specific local delivery routes, a DEMUX routes data to specific hardware ports."
  },
  {
    "id": 3,
    "question": "What is the mathematical relationship between select lines and output lines in a DEMUX?",
    "answer": "For 'n' binary select lines, a demultiplexer can route data to a maximum of 2^n output lines (1-to-2^n).",
    "explanation": "For example: 1 select line yields 2 outputs (1-to-2), 2 select lines yield 4 outputs (1-to-4), and 3 select lines yield 8 outputs (1-to-8)."
  },
  {
    "id": 4,
    "question": "What are the essential terminal groups of a standard 1-to-2^n demultiplexer?",
    "answer": "1. Single Data Input (Din), 2. Selection/Control Inputs (n lines), 3. Enable/Strobe input, and 4. Output lines (2^n lines).",
    "explanation": "The select lines determine which specific output pin mirrors the logic level present on the single data input pin."
  },
  {
    "id": 5,
    "question": "How does a DEMUX behave as a digital Single-Pole Multi-Throw (SPMT) switch?",
    "answer": "The single data input represents the movable pole, while the 2^n output lines represent the multiple contact throws switched by the select address.",
    "explanation": "Electronic control of the switch position is provided by the binary value on the selection lines."
  },
  {
    "id": 6,
    "question": "What is the fundamental operational difference between a Multiplexer and a Demultiplexer?",
    "answer": "A MUX has many inputs and one output (data selector); a DEMUX has one input and many outputs (data distributor).",
    "explanation": "Multiplexers funnel multiple lines down to one, whereas demultiplexers expand one line out to multiple destinations."
  },
  {
    "id": 7,
    "question": "How do multiplexers and demultiplexers operate cooperatively in telecommunication systems?",
    "answer": "A MUX at the transmitter combines multiple channels onto a single cable, and a DEMUX at the receiver separates them back into their original channels.",
    "explanation": "Synchronizing the select lines of both transmitter MUX and receiver DEMUX ensures each sender talks directly to its intended recipient."
  },
  {
    "id": 8,
    "question": "What happens to all unselected output lines in a DEMUX?",
    "answer": "They remain in their quiescent inactive state (logic 0 for active-HIGH outputs, or logic 1 for active-LOW outputs).",
    "explanation": "Only the single selected output line is allowed to transmit or reflect the state of the data input Din."
  },
  {
    "id": 9,
    "question": "What happens to all output lines when the Enable pin of a DEMUX is de-asserted?",
    "answer": "All output lines are forced to their inactive state regardless of the data input and select line settings.",
    "explanation": "The Enable line acts as an overall master switch, preventing any data from reaching any output line."
  },
  {
    "id": 10,
    "question": "Why is a Demultiplexer structurally identical to a Decoder with an Enable pin?",
    "answer": "Because if the Enable pin of a decoder is treated as the data input Din, the decoder's minterm outputs become the demultiplexed data outputs.",
    "explanation": "The Boolean equations are identical: Y_i = m_i · E. When E = Din, Y_i = m_i · Din, which is the exact equation of a demultiplexer."
  },
  {
    "id": 11,
    "question": "How can a Demultiplexer facilitate serial-to-parallel data conversion?",
    "answer": "By applying serial data bits to Din while a binary counter steps through the select lines, directing each bit to a separate parallel latch.",
    "explanation": "Consecutive incoming bits in time are converted into simultaneous bits distributed across space."
  },
  {
    "id": 12,
    "question": "What internal gate structure constitutes an active-HIGH demultiplexer?",
    "answer": "An array of 2^n AND gates, where each gate receives the data input Din, Enable E, and a unique minterm combination of select variables.",
    "explanation": "Only the AND gate with all select inputs at logic 1 will pass Din through to its output pin."
  },
  {
    "id": 13,
    "question": "What internal gate structure constitutes an active-LOW demultiplexer?",
    "answer": "An array of 2^n NAND gates, where each gate outputs an active-LOW inverted data signal.",
    "explanation": "When selected, the output produces (Din)'; unselected outputs remain held at logic HIGH (1)."
  },
  {
    "id": 14,
    "question": "How does propagation delay affect demultiplexing in high-frequency bus routing?",
    "answer": "Asymmetric gate delays can cause transient glitches on unselected output lines during select line transitions.",
    "explanation": "Proper bus design uses synchronous strobing on the Enable line to mask outputs until select line transitions are fully settled."
  },
  {
    "id": 15,
    "question": "What are the primary drawing conventions for demultiplexers in ISC Class 12 board examinations?",
    "answer": "An expanding trapezoidal or rectangular symbol with 1 data input on the left, select lines on the bottom, and 2^n output lines on the right.",
    "explanation": "The outward taper of the trapezoid visually emphasizes the 1-to-many distribution function of the circuit."
  },
  {
    "id": 16,
    "question": "What is the primary function of a Demultiplexer (DEMUX)?",
    "answer": "A combinational circuit that takes a single data input line and directs it to any one of 2^n possible output lines, determined by n select lines.",
    "explanation": "Known as a Data Distributor, it performs the reverse operation of a multiplexer."
  },
  {
    "id": 17,
    "question": "What is the mathematical relation between data inputs, select lines, and outputs in a DEMUX?",
    "answer": "1 Data input (D), n Select lines (S), and 2^n Output lines (Y0 to Y_(2^n - 1)).",
    "explanation": "For example, 1-to-4 DEMUX has 1 data input, 2 select lines, and 4 outputs."
  },
  {
    "id": 18,
    "question": "Why is a Demultiplexer called a 'Data Distributor'?",
    "answer": "Because it receives serial data on a single transmission channel and distributes it to one of multiple destination ports or registers.",
    "explanation": "It dynamically routes single-channel information to designated destinations."
  },
  {
    "id": 19,
    "question": "What is the general Boolean equation for output Y_k of a 1-to-2^n Demultiplexer?",
    "answer": "Y_k = D · m_k, where D is the single data input and m_k is the minterm of the n select lines.",
    "explanation": "Each output is the product of the data input and one select line minterm."
  },
  {
    "id": 20,
    "question": "How do a Multiplexer and Demultiplexer work together in a communication link?",
    "answer": "At the transmitter, an n:1 MUX serializes multiple channels onto a single cable; at the receiver, a 1:n DEMUX synchronized with the transmitter reconstructs the individual channels.",
    "explanation": "This forms the basis of Time-Division Multiplexed (TDM) digital communications."
  },
  {
    "id": 21,
    "question": "What happens to the unselected output lines of an Active-HIGH Demultiplexer?",
    "answer": "All unselected output lines remain at logic 0.",
    "explanation": "Only the single selected output line mirrors the logic level of the data input D."
  },
  {
    "id": 22,
    "question": "Can a Demultiplexer function as a Serial-to-Parallel Data Converter?",
    "answer": "Yes; by applying incoming serial bits to the data input D and stepping select lines through binary counts, successive bits are distributed to parallel output pins.",
    "explanation": "Enables serial-to-parallel conversion when combined with output latches."
  },
  {
    "id": 23,
    "question": "What is the relationship between an Enable pin of a Decoder and the Data input of a Demultiplexer?",
    "answer": "They are physically and logically identical; feeding data D into the Enable pin of an n-to-2^n decoder transforms it into a 1-to-2^n demultiplexer.",
    "explanation": "This dual equivalence is a foundational concept in CISCE digital electronics."
  },
  {
    "id": 24,
    "question": "What are common commercial Demultiplexer ICs?",
    "answer": "IC 74138 (1-to-8 Demultiplexer / 3-to-8 Decoder) and IC 74154 (1-to-16 Demultiplexer / 4-to-16 Decoder).",
    "explanation": "Commercial IC manufacturers package decoders and demultiplexers as dual-function chips."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE definition of a Demultiplexer?",
    "answer": "A combinational circuit that takes a single input data line and routes it to one of 2^n output lines, governed by the binary values on n select lines.",
    "explanation": "Award of 2 marks requires stating 1 data input, n select lines, and 2^n output lines."
  }
];

export default faqs;
