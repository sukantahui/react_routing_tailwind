// Topic 33 FAQs - 25 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is the fundamental functional difference between an Encoder and a Multiplexer?",
    "answer": "An Encoder converts 2^n active input lines into an n-bit binary code; a Multiplexer selects one of 2^n data input lines to route to a single output.",
    "explanation": "An encoder performs code generation (spatial-to-binary compression), whereas a multiplexer performs data steering (many-to-one switching)."
  },
  {
    "id": 2,
    "question": "Contrast the terminal count of an Encoder with a Multiplexer of equivalent capacity (e.g., 8:3 vs. 8:1).",
    "answer": "An 8-to-3 Encoder has 8 inputs and 3 outputs; an 8-to-1 Multiplexer has 8 data inputs, 3 select inputs, and 1 output.",
    "explanation": "Notice the multiplexer has 12 total functional lines (8+3+1), while the encoder has only 11 lines (8+3) without separate select lines."
  },
  {
    "id": 3,
    "question": "Do encoders have select control lines? Explain why or why not.",
    "answer": "No, encoders do not have select lines; the assertion of an input line itself directly triggers the corresponding output code.",
    "explanation": "In an encoder, the input data lines themselves act as the driving stimuli. In a MUX, the select lines decide which input line is routed."
  },
  {
    "id": 4,
    "question": "Contrast what the output signals represent in an Encoder versus a Multiplexer.",
    "answer": "An encoder's outputs represent the binary index (address) of the active line; a multiplexer's output represents the actual data bit carried on the selected line.",
    "explanation": "For example, if line 5 is active: the encoder outputs binary 101; the multiplexer outputs whatever logic level (0 or 1) is currently present on pin D5."
  },
  {
    "id": 5,
    "question": "How does a priority encoder handle multiple simultaneous inputs compared to a multiplexer?",
    "answer": "A priority encoder encodes the highest-priority active line; a multiplexer routes only the line specified by its select lines regardless of other inputs.",
    "explanation": "A multiplexer never experiences input conflicts because the select lines strictly pick one and only one input channel."
  },
  {
    "id": 6,
    "question": "Which device is used for parallel-to-serial conversion, an encoder or a multiplexer?",
    "answer": "A Multiplexer (MUX).",
    "explanation": "By connecting parallel data bits to MUX data inputs and driving the select lines with a binary counter, data is clocked out serially bit by bit."
  },
  {
    "id": 7,
    "question": "Which device is used to convert keyboard key presses into binary character codes?",
    "answer": "An Encoder (specifically a Priority Encoder).",
    "explanation": "Each physical key press asserts one input line; the encoder converts that spatial key position into its corresponding binary scan code."
  },
  {
    "id": 8,
    "question": "Compare the internal logic gate structures of an encoder versus a multiplexer.",
    "answer": "A simple encoder is constructed using OR gates; a multiplexer is constructed using an array of AND gates feeding into a single multi-input OR gate.",
    "explanation": "Encoders combine active line states via OR logic. Multiplexers use AND gates to decode select lines and gate data into the summing OR gate."
  },
  {
    "id": 9,
    "question": "Can an encoder synthesize arbitrary Boolean functions like a multiplexer can?",
    "answer": "No, an encoder cannot synthesize arbitrary Boolean functions; a multiplexer is a universal logic function generator.",
    "explanation": "Multiplexers can realize any Boolean truth table via the residual variable method, whereas encoders only output fixed numerical codes."
  },
  {
    "id": 10,
    "question": "What is the role of the Enable pin in an encoder versus in a multiplexer?",
    "answer": "In both it enables or disables the circuit, but in an encoder disabling forces outputs to 0 (or invalid), while in a MUX it forces output Y to 0.",
    "explanation": "Both use Enable as a master control for cascading chips and managing bus high-impedance states."
  },
  {
    "id": 11,
    "question": "How do input column headers differ in the truth tables of an 8:3 encoder and an 8:1 multiplexer?",
    "answer": "An encoder table lists 8 input lines (D0-D7) as input columns; a MUX table lists 3 select lines (S2, S1, S0) as input columns.",
    "explanation": "Because MUX operation is governed by select addresses, its primary truth table maps select combinations to the routed input symbol."
  },
  {
    "id": 12,
    "question": "Why does an encoder not need independent data inputs alongside its line detection inputs?",
    "answer": "Because the presence or absence of a signal on the line IS the information being encoded.",
    "explanation": "The input lines themselves are the 1-hot coded data; the encoder merely transforms this representation into binary format."
  },
  {
    "id": 13,
    "question": "How does propagation delay compare between encoders and multiplexers?",
    "answer": "Simple OR-gate encoders typically have lower delay (1 gate level) than multiplexers (2-3 gate levels: inverter + AND + OR).",
    "explanation": "However, complex priority encoders with lookahead priority logic have delays comparable to or higher than multiplexers."
  },
  {
    "id": 14,
    "question": "What tabular comparison format earns full marks in ISC Class 12 exams for Encoder vs. Multiplexer?",
    "answer": "A clear table with 5 distinct criteria: Function, Number of Inputs, Number of Outputs, Presence of Select Lines, and Common Application.",
    "explanation": "Tabular comparisons demonstrate structured understanding and make evaluation straightforward for board examiners."
  },
  {
    "id": 15,
    "question": "What is the most common confusion students exhibit between Encoders and Multiplexers in board exams?",
    "answer": "Confusing select lines with data inputs and misidentifying a MUX as an encoder because both 'take many lines'.",
    "explanation": "Students often forget that a MUX has only ONE output carrying data, whereas an encoder has MULTIPLE outputs carrying a binary code."
  },
  {
    "id": 16,
    "question": "What is the primary operational difference between an Encoder and a Multiplexer?",
    "answer": "An Encoder converts 2^n active lines into an n-bit binary code (code generator); a Multiplexer routes one of 2^n data lines to a single output based on n select lines (data router).",
    "explanation": "Encoder output represents an address; MUX output carries the selected data signal."
  },
  {
    "id": 17,
    "question": "Compare the number of input, select, and output lines in an 8-to-3 Encoder vs an 8-to-1 Multiplexer.",
    "answer": "8-to-3 Encoder: 8 inputs, 0 select lines, 3 outputs; 8-to-1 Multiplexer: 8 data inputs, 3 select lines, 1 output.",
    "explanation": "Notice the inverse roles: the 3 output lines of the encoder correspond to the 3 select lines of the multiplexer."
  },
  {
    "id": 18,
    "question": "What type of basic logic gates are primarily used to construct Encoders vs Multiplexers?",
    "answer": "Encoders are constructed primarily using OR gates; Multiplexers are constructed using an AND-OR gate array (AND gates for selection, OR gate for combining).",
    "explanation": "Encoders sum active lines; multiplexers form sum-of-products terms."
  },
  {
    "id": 19,
    "question": "Can an Encoder implement arbitrary Boolean logic functions directly?",
    "answer": "No, encoders cannot implement arbitrary Boolean functions because their outputs are fixed binary encodings of single active inputs.",
    "explanation": "Multiplexers, by contrast, can implement any arbitrary Boolean function via Shannon expansion."
  },
  {
    "id": 20,
    "question": "How do inputs behave in an Encoder vs a Multiplexer?",
    "answer": "In an encoder, only one input is active at a time (or prioritized); in a multiplexer, all data inputs can simultaneously carry active changing digital signals.",
    "explanation": "The MUX select lines isolate and transmit only the chosen input."
  },
  {
    "id": 21,
    "question": "Compare the truth tables of an 8-to-3 Encoder and an 8-to-1 MUX.",
    "answer": "Encoder truth table has 8 rows mapping active input pins to 3-bit binary words; MUX function table has 8 rows mapping 3-bit select codes to data outputs (I0-I7).",
    "explanation": "Encoder table maps Inputs → Code; MUX table maps Code → Data Output."
  },
  {
    "id": 22,
    "question": "Give an application example distinguishing an Encoder from a Multiplexer.",
    "answer": "Encoder: Keyboard controller converting key presses into binary scan codes; Multiplexer: CPU bus arbiter selecting which register places data onto the ALU bus.",
    "explanation": "Clearly highlights code conversion vs data switching."
  },
  {
    "id": 23,
    "question": "Does an Encoder have selection lines?",
    "answer": "No, a standard encoder has zero selection lines. Its inputs themselves determine the binary output code.",
    "explanation": "Only multiplexers and demultiplexers feature separate selection control lines."
  },
  {
    "id": 24,
    "question": "Can a Priority Encoder replace a Multiplexer?",
    "answer": "No, a priority encoder outputs an address code, not the data carried on the selected line.",
    "explanation": "However, a priority encoder can drive the select lines of a multiplexer to route data from the highest-priority active device."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE question format for Encoder vs Multiplexer?",
    "answer": "Tabulate 3 to 4 points of difference between an Encoder and a Multiplexer (inputs, outputs, select lines, and applications).",
    "explanation": "A classic 3-mark comparison question in Section D of ISC Class 12 Computer Science."
  }
];

export default faqs;
