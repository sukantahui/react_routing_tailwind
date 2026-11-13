// Topic 34 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is the fundamental functional difference between a Decoder and a Demultiplexer?",
    "answer": "A Decoder translates an n-bit binary code into one active output line; a Demultiplexer takes a single data input and steers it to one selected output line.",
    "explanation": "Decoders decode coded addresses; demultiplexers distribute a data signal from one source to one of many destinations."
  },
  {
    "id": 2,
    "question": "Why is a Demultiplexer often described as a 'Decoder with an Enable pin used as data input'?",
    "answer": "Because both circuits share the identical internal AND/NAND gate topology and identical output Boolean equations.",
    "explanation": "Output Y_i = Minterm_i · Control_signal. In a decoder, the control signal is Enable; in a DEMUX, the control signal is the incoming Data Input (Din)."
  },
  {
    "id": 3,
    "question": "Compare the terminal count of a 2-to-4 Decoder versus a 1-to-4 Demultiplexer.",
    "answer": "A 2-to-4 Decoder has 2 address inputs, 1 enable line, and 4 outputs; a 1-to-4 DEMUX has 1 data input, 2 select lines, 1 enable line, and 4 outputs.",
    "explanation": "If the decoder's enable is re-purposed as the DEMUX data input, the total pin count and internal hardware are completely identical."
  },
  {
    "id": 4,
    "question": "Compare the output signals: what does an active output represent in a Decoder vs. a Demultiplexer?",
    "answer": "In a Decoder, an active output indicates the numerical identity of the input code; in a DEMUX, it carries the data bit from Din.",
    "explanation": "A decoder output is a static logic 1 (or 0 for active-LOW). A DEMUX output dynamically mirrors whatever continuous signal is on Din."
  },
  {
    "id": 5,
    "question": "Which device is used for serial-to-parallel data conversion, a Decoder or a Demultiplexer?",
    "answer": "A Demultiplexer (DEMUX).",
    "explanation": "Serial bits applied to Din are routed to consecutive output lines as a clock steps through the select lines, distributing bits across space."
  },
  {
    "id": 6,
    "question": "Which device is used for memory chip selection (address decoding) in computers?",
    "answer": "A Decoder.",
    "explanation": "A microprocessor applies high-order address bus bits to the decoder inputs, activating the Chip Select (/CS) line of the desired memory chip."
  },
  {
    "id": 7,
    "question": "Can a Demultiplexer implement arbitrary Boolean functions like a Decoder?",
    "answer": "Yes, by tying the data input Din permanently to logic 1, the DEMUX becomes an active-HIGH decoder generating all minterms.",
    "explanation": "Once Din = 1, connecting the minterm outputs to external OR or NAND gates realizes any canonical Boolean function."
  },
  {
    "id": 8,
    "question": "Compare the truth tables of a 2-to-4 Decoder vs. a 1-to-4 Demultiplexer.",
    "answer": "A decoder table lists inputs A1 A0 with outputs {1,0,0,0}, etc.; a DEMUX table includes Din and shows the selected output equals Din while others are 0.",
    "explanation": "The DEMUX truth table explicitly illustrates data transparency on the selected channel."
  },
  {
    "id": 9,
    "question": "How does an active-LOW Decoder compare to an active-LOW Demultiplexer in terms of output equations?",
    "answer": "Active-LOW Decoder: Y_i' = (m_i · E)'; Active-LOW Demultiplexer: Y_i' = (m_i · Din)'.",
    "explanation": "Unselected lines remain at logic 1 (inactive), while the selected line inverts the data signal (or drops to 0 when data is asserted)."
  },
  {
    "id": 10,
    "question": "Can any commercial Decoder IC (e.g., 74LS138) be directly utilized as a Demultiplexer?",
    "answer": "Yes, by applying the serial data stream to one of its Enable pins (e.g., G2A') and using address pins (A, B, C) as select lines.",
    "explanation": "The manufacturer datasheet explicitly titles the 74138 as a '3-to-8 Line Decoder / Demultiplexer' because of this dual nature."
  },
  {
    "id": 11,
    "question": "Why does a Decoder not require an independent data input channel?",
    "answer": "Because its purpose is to interpret the meaning of an address, not to route continuous external signals.",
    "explanation": "The address inputs themselves contain all the information needed to specify which single output should be asserted."
  },
  {
    "id": 12,
    "question": "How do propagation delays and timing constraints compare between Decoders and Demultiplexers?",
    "answer": "They are identical because they use the same physical gate architecture; select-to-output and data-to-output delays are symmetric.",
    "explanation": "In both devices, the critical path consists of an inverter delay followed by a multi-input AND/NAND gate delay."
  },
  {
    "id": 13,
    "question": "How do Decoders and Demultiplexers cooperate in computer bus architectures?",
    "answer": "Decoders select which peripheral device has control of the bus, while Demultiplexers steer shared data or clock pulses to the chosen device.",
    "explanation": "Decoders manage address space partitioning; demultiplexers manage physical signal routing."
  },
  {
    "id": 14,
    "question": "What are the key points CISCE examiners require in a comparative tabular question on Decoder vs. Demultiplexer?",
    "answer": "1. Definition / Role, 2. Number of Inputs, 3. Input Types (Address vs. Data+Select), 4. Output Nature (Code vs. Replicated Data), 5. Applications.",
    "explanation": "Presenting these 5 points in a clear comparative table guarantees full marks on board evaluation rubrics."
  },
  {
    "id": 15,
    "question": "What common error do students commit when differentiating between a Decoder and a Demultiplexer?",
    "answer": "Claiming they are completely different circuits with different internal gates, failing to recognize that a DEMUX is a decoder with data fed to Enable.",
    "explanation": "Highlighting that their internal gate architecture is identical demonstrates deep mastery that impresses senior examiners."
  }
];

export default faqs;
