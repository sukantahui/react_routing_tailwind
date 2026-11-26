// Topic 34 FAQs - 25 Comprehensive Questions and Answers
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
  },
  {
    "id": 16,
    "question": "What is the primary operational difference between a Decoder and a Demultiplexer?",
    "answer": "A Decoder activates 1 of 2^n output lines based on an n-bit binary input code; a Demultiplexer routes 1 data input signal to 1 of 2^n output lines using n select lines.",
    "explanation": "Decoder converts code to line assertion; DEMUX routes external data through a designated line."
  },
  {
    "id": 17,
    "question": "Compare the input lines of a 3-to-8 Decoder vs a 1-to-8 Demultiplexer.",
    "answer": "3-to-8 Decoder has 3 binary input lines (plus optional Enable); 1-to-8 DEMUX has 1 Data Input line AND 3 Select lines.",
    "explanation": "The decoder's 3 inputs serve as addresses; the DEMUX has 1 data line and 3 address select lines."
  },
  {
    "id": 18,
    "question": "What do the outputs represent in a Decoder vs a Demultiplexer?",
    "answer": "Decoder outputs represent minterms (fixed 1s or 0s); DEMUX outputs represent the actual time-varying data signal D.",
    "explanation": "In a decoder, selected line = 1; in a demultiplexer, selected line = D."
  },
  {
    "id": 19,
    "question": "Can a Decoder implement arbitrary Boolean functions? Can a Demultiplexer?",
    "answer": "A Decoder implements Boolean functions when combined with external OR gates; a Demultiplexer distributes data and is not used as a logic generator.",
    "explanation": "Decoders act as universal minterm generators; demultiplexers act as communication switches."
  },
  {
    "id": 20,
    "question": "How does the Truth Table of a Decoder differ from that of a Demultiplexer?",
    "answer": "Decoder table maps inputs to a single output 1 (or 0); DEMUX table maps select codes to output lines showing the variable 'D'.",
    "explanation": "The variable 'D' appears explicitly in DEMUX truth table output columns."
  },
  {
    "id": 21,
    "question": "How can a Decoder be converted into a Demultiplexer?",
    "answer": "By applying the data input signal D directly to the Enable (E) pin of the decoder.",
    "explanation": "When Enable = D, the decoder performs data distribution."
  },
  {
    "id": 22,
    "question": "How can a Demultiplexer be converted into a Decoder?",
    "answer": "By tying the single data input line D permanently to logic 1 (+5V Vcc) in active-high circuits.",
    "explanation": "When D = 1, Y_k = 1 · m_k = m_k, which is the exact output of a binary decoder."
  },
  {
    "id": 23,
    "question": "Give an application example distinguishing a Decoder from a Demultiplexer.",
    "answer": "Decoder: Memory chip select (selecting 1 RAM chip out of 8); Demultiplexer: Audio routing (sending an audio stream to 1 of 8 speakers).",
    "explanation": "Chip activation vs analog/digital signal distribution."
  },
  {
    "id": 24,
    "question": "Compare the gate structure of a Decoder vs a Demultiplexer.",
    "answer": "Both use identical AND/NAND gate arrays; the only difference is whether the additional gate input is tied to Vcc (Decoder) or driven by a data stream (DEMUX).",
    "explanation": "Complete structural equivalence."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE question format for Decoder vs Demultiplexer?",
    "answer": "Differentiate between a Decoder and a Demultiplexer on the basis of inputs, outputs, select lines, truth tables, and applications (3-4 marks).",
    "explanation": "A frequent board question testing conceptual clarity on digital line expansion."
  }
];

export default faqs;
