// Topic 0 FAQs - 25 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is the primary defining characteristic of a Combinational Logic Circuit?",
    "answer": "The output depends solely on the present combination of input signals without any dependency on past states or memory.",
    "explanation": "Unlike sequential circuits, combinational logic has no memory elements (flip-flops, latches) or feedback loops. As soon as inputs change (plus a tiny gate propagation delay), outputs update purely based on Boolean logic."
  },
  {
    "id": 2,
    "question": "How is a Combinational Circuit fundamentally different from a Sequential Circuit?",
    "answer": "Combinational circuits have no memory or feedback; sequential circuits have memory and feedback where outputs depend on present inputs AND past states.",
    "explanation": "Sequential circuits require clock pulses and storage elements (such as flip-flops and registers) to maintain an internal state (e.g., counters, shift registers). Combinational circuits are completely memoryless."
  },
  {
    "id": 3,
    "question": "Why is a clock signal NOT required in purely combinational logic circuits?",
    "answer": "Because operations are asynchronous and level-triggered; changes in inputs propagate directly through logic gates to produce outputs.",
    "explanation": "Without storage elements to synchronize or latch data on clock edges, combinational circuits respond continuously to changes at their input pins."
  },
  {
    "id": 4,
    "question": "What is Propagation Delay in a combinational logic circuit?",
    "answer": "The time delay between the application of an input signal and the resulting stable output transition.",
    "explanation": "Physical transistors and logic gates take finite time (usually nanoseconds) to charge capacitances and switch logic levels. The critical path is the longest path from any input to any output."
  },
  {
    "id": 5,
    "question": "How many distinct input combinations exist for a combinational circuit with n binary inputs?",
    "answer": "Exactly 2^n distinct input combinations.",
    "explanation": "Since each input variable can independently assume 2 values (0 or 1), n independent binary variables yield 2 × 2 × ... × 2 = 2^n rows in its truth table."
  },
  {
    "id": 6,
    "question": "What are the 4 fundamental combinational building blocks prescribed in the ISC Class 12 Syllabus?",
    "answer": "Adders/Subtractors, Encoders, Decoders, and Multiplexers/Demultiplexers.",
    "explanation": "These circuits form the core arithmetic and data routing blocks of modern computer processors and ALUs (Arithmetic Logic Units)."
  },
  {
    "id": 7,
    "question": "Can any combinational logic circuit be implemented solely using Universal Gates?",
    "answer": "Yes, any combinational circuit can be implemented exclusively with NAND gates or exclusively with NOR gates.",
    "explanation": "Both NAND and NOR gates are functionally complete; by appropriately combining them, you can synthesize NOT, AND, and OR operations, and consequently any arbitrary Boolean function."
  },
  {
    "id": 8,
    "question": "What is meant by an 'Active-HIGH' versus an 'Active-LOW' signal in digital hardware?",
    "answer": "Active-HIGH means logic 1 causes the circuit action; Active-LOW means logic 0 activates the function (often represented with a bar or bubble).",
    "explanation": "For example, in an Active-HIGH enable (E), the chip operates when E = 1. In an Active-LOW enable (E'), the chip is activated when E' = 0 and disabled when E' = 1."
  },
  {
    "id": 9,
    "question": "Why are feedback connections strictly prohibited in combinational logic circuits?",
    "answer": "Feedback creates memory, latching, or unstable oscillations, turning the circuit into a sequential system.",
    "explanation": "If an output wire is looped back into an input of the same combinational network, the output depends on its previous output, violating the definition of combinational logic."
  },
  {
    "id": 10,
    "question": "What role does a Truth Table play in combinational logic design?",
    "answer": "It serves as the exhaustive mathematical specification mapping every possible 2^n input combination to its intended output value.",
    "explanation": "From the truth table, designers extract standard canonical minterms (SOP) or maxterms (POS) to minimize expressions using Boolean algebra or Karnaugh Maps (K-maps)."
  },
  {
    "id": 11,
    "question": "What are static hazards and glitches in combinational networks?",
    "answer": "Temporary false output pulses (spikes) caused by unequal propagation delays along differing internal paths.",
    "explanation": "When an input switches, different paths through inverters and gates have slight delay differences, causing a brief momentary incorrect output before stabilizing."
  },
  {
    "id": 12,
    "question": "How does an Arithmetic Logic Unit (ALU) utilize combinational circuits?",
    "answer": "The ALU relies on combinational parallel adders, subtractors, and multiplexers to execute arithmetic and logical instructions instantaneously.",
    "explanation": "When opcode control signals select an operation, combinational data paths process operands from CPU registers and compute the result within a single clock cycle phase."
  },
  {
    "id": 13,
    "question": "What is the difference between SSI, MSI, and LSI combinational circuits?",
    "answer": "Small Scale (SSI) contains <10 gates; Medium Scale (MSI) contains 10-100 gates (e.g. 74151 MUX); Large Scale (LSI) contains 100-1000 gates.",
    "explanation": "MSI chips implement functional modules such as 4-to-1 multiplexers, 3-to-8 decoders, and 4-bit priority encoders on a single monolithic silicon die."
  },
  {
    "id": 14,
    "question": "Why is Canonical SOP (Sum of Products) universally preferred for designing combinational circuits?",
    "answer": "Because SOP forms map directly to an AND-OR two-level gate architecture, minimizing overall propagation delay.",
    "explanation": "A two-level AND-OR structure ensures that signals pass through at most 2 gate levels (excluding input inverters), ensuring the fastest possible execution speed."
  },
  {
    "id": 15,
    "question": "What is the CISCE Board marking strategy when defining a combinational circuit?",
    "answer": "State that outputs depend exclusively on present inputs, specify 'no memory elements / no feedback', and cite at least two examples (e.g., Half Adder, Multiplexer).",
    "explanation": "CISCE mark schemes award 1 mark for 'present inputs only without memory' and 1 mark for naming valid standard combinational circuits."
  },
  {
    "id": 16,
    "question": "What is fan-in and fan-out of a logic gate in a combinational network?",
    "answer": "Fan-in is the maximum number of input signals a gate can receive; fan-out is the maximum number of standard logic gate inputs a gate output can reliably drive without voltage degradation.",
    "explanation": "Exceeding fan-out causes output voltage levels to drop below the threshold (V_OH drops), leading to erratic circuit behavior and increased propagation delay in combinational networks."
  },
  {
    "id": 17,
    "question": "How does gate-level minimization contribute to reducing critical path delay?",
    "answer": "Minimizing Boolean expressions reduces the number of cascaded gate levels and physical gate counts, directly decreasing total signal propagation time.",
    "explanation": "Each additional gate level introduces a finite switching delay (typically 2-10 ns). Reducing a 4-level logic structure to a 2-level SOP structure ensures minimum propagation delay."
  },
  {
    "id": 18,
    "question": "Why can combinational circuits NOT store passwords or encryption keys?",
    "answer": "Because combinational circuits have zero internal memory and their outputs immediately disappear or change when the input power or signals change.",
    "explanation": "Combinational logic computes stateless functions. Data storage requires bistable multivibrators (flip-flops, SRAM cells) which belong to sequential logic circuits."
  },
  {
    "id": 19,
    "question": "What is the role of Karnaugh Maps (K-maps) in the design workflow of combinational circuits?",
    "answer": "K-maps provide a visual, systematic graphic method to group adjacent 1s (minterms) or 0s (maxterms) into pairs, quads, and octets to find minimal Boolean expressions.",
    "explanation": "By applying the adjacency property (Gray code ordering), K-maps eliminate redundant literals (using A + A' = 1) without requiring cumbersome algebraic theorem manipulations."
  },
  {
    "id": 20,
    "question": "What is an Incompletely Specified Function (Don't Care conditions) in combinational design?",
    "answer": "Input combinations that never occur in practice or whose output values do not affect system performance, denoted by 'X' or 'd'.",
    "explanation": "In BCD circuits (which only use 0-9), combinations 1010 to 1111 (10 to 15) are invalid and treated as Don't Cares, allowing larger groupings in K-maps to achieve simpler circuits."
  },
  {
    "id": 21,
    "question": "How do active-low signals prevent false triggering in noisy industrial environments?",
    "answer": "Active-low circuits require an output to pull down to ground (0V) to activate, which offers greater current sinking capability and immunity to positive noise spikes.",
    "explanation": "BJT TTL logic gates can sink substantially more current (I_OL) than they can source (I_OH), making active-low signaling more robust against electromagnetic interference."
  },
  {
    "id": 22,
    "question": "What is the difference between synchronous and asynchronous circuits?",
    "answer": "Synchronous circuits are driven and coordinated by a periodic master clock pulse, whereas asynchronous combinational circuits respond instantaneously to input level transitions.",
    "explanation": "Combinational circuits are inherently asynchronous. Synchronous systems use clock pulses to latch combinational outputs into flip-flops at defined clock edges."
  },
  {
    "id": 23,
    "question": "What is a Look-Up Table (LUT) in modern programmable combinational logic (FPGA)?",
    "answer": "A digital memory-based structure that stores the truth table outputs of a combinational Boolean function.",
    "explanation": "An n-input LUT uses SRAM cells addressed by the n inputs, allowing any arbitrary n-variable combinational function to be implemented simply by reading stored values without redesigning gate wiring."
  },
  {
    "id": 24,
    "question": "How does propagation delay limit the maximum clock frequency of a digital processor?",
    "answer": "The clock period must be strictly greater than the sum of the longest combinational critical path delay, register setup time, and clock-to-Q delay.",
    "explanation": "If the clock pulse arrives before combinational signals settle to stable values, setup-time violations occur, causing data corruption and metastable state failures."
  },
  {
    "id": 25,
    "question": "What are the essential steps in designing any combinational logic circuit from a problem specification in ISC exams?",
    "answer": "1. State problem & identify inputs/outputs; 2. Formulate Truth Table; 3. Derive simplified Boolean equations via K-Map; 4. Draw gate-level logic circuit diagram.",
    "explanation": "Following this 4-step canonical engineering procedure guarantees full marks in CISCE 4-mark and 5-mark hardware circuit design questions."
  }
];

export default faqs;
