// Topic 33 FAQs - 15 Comprehensive Questions and Answers
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
  }
];

export default faqs;
