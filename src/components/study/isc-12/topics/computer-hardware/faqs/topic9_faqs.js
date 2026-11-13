// Topic 9 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What are the inputs and outputs of a 4-to-2 Line Binary Encoder?",
    "answer": "Inputs: 4 lines (I0, I1, I2, I3); Outputs: 2 binary lines (Y1 as MSB, Y0 as LSB).",
    "explanation": "Each input line corresponds to one binary state: I0 → 00, I1 → 01, I2 → 10, I3 → 11."
  },
  {
    "id": 2,
    "question": "What are the Boolean equations for the outputs Y1 and Y0?",
    "answer": "Y1 = I2 + I3; Y0 = I1 + I3.",
    "explanation": "Y1 is HIGH for indices 2 and 3 (10₂ and 11₂). Y0 is HIGH for indices 1 and 3 (01₂ and 11₂)."
  },
  {
    "id": 3,
    "question": "Why does input I0 not appear in either output equation?",
    "answer": "Because binary 0 is represented as Y1=0, Y0=0; hence neither OR gate needs to be activated.",
    "explanation": "When I0 is 1 (and all others 0), Y1 = 0 + 0 = 0 and Y0 = 0 + 0 = 0. The output is naturally 00 without any physical gate connection."
  },
  {
    "id": 4,
    "question": "Provide the complete 4-row truth table for a 4-to-2 line encoder.",
    "answer": "I0=1: Y1=0, Y0=0; I1=1: Y1=0, Y0=1; I2=1: Y1=1, Y0=0; I3=1: Y1=1, Y0=1.",
    "explanation": "The table represents a 'one-hot' input matrix where exactly one input bit is 1 in each row."
  },
  {
    "id": 5,
    "question": "How many logic gates are needed to construct a 4-to-2 binary encoder?",
    "answer": "Only two 2-input OR gates.",
    "explanation": "One OR gate computes Y1 = I2 + I3, and the second OR gate computes Y0 = I1 + I3."
  },
  {
    "id": 6,
    "question": "What happens if I0 and I3 are active simultaneously?",
    "answer": "The output becomes Y1=1, Y0=1 (code 3), masking the presence of I0.",
    "explanation": "Since I0 is unconnected, the presence of I3 forces both OR gates HIGH, yielding code 11₂."
  },
  {
    "id": 7,
    "question": "What is the propagation delay of a 4-to-2 encoder?",
    "answer": "A single OR gate delay (t_OR), typically 5 to 10 nanoseconds in standard TTL/CMOS.",
    "explanation": "Because there is only one layer of OR gates between the inputs and outputs, the circuit is extremely fast."
  },
  {
    "id": 8,
    "question": "How is a 4-to-2 encoder represented as a block diagram?",
    "answer": "A rectangular box with 4 input pins on the left (I0–I3) and 2 output pins on the right (Y1, Y0).",
    "explanation": "Pins must be clearly labeled with their significance (I0 as 0, I3 as 3; Y1 as MSB, Y0 as LSB)."
  },
  {
    "id": 9,
    "question": "Why is a 4-to-2 encoder called a 'One-Hot to Binary' converter?",
    "answer": "Because the input encoding is one-hot (only one wire is hot/HIGH at a time), which is converted to standard 2-bit binary.",
    "explanation": "One-hot representations are widely used in finite state machines and switch matrices."
  },
  {
    "id": 10,
    "question": "Can diode logic be used to implement a 4-to-2 encoder?",
    "answer": "Yes, passive diode OR matrices can synthesize Y1 and Y0 without active integrated transistors.",
    "explanation": "Connecting diodes from I2 and I3 to pull-down line Y1, and from I1 and I3 to Y0, forms a classic diode matrix encoder."
  },
  {
    "id": 11,
    "question": "What is the consequence of leaving all 4 inputs disconnected (floating)?",
    "answer": "Outputs fall to 00, falsely registering as if input I0 were pressed.",
    "explanation": "This zero-state ambiguity is why practical systems use pull-down resistors and active priority flags."
  },
  {
    "id": 12,
    "question": "How does a 4-to-2 encoder differ from a 2-to-4 decoder?",
    "answer": "An encoder compresses 4 lines to 2 lines; a decoder expands 2 lines to 4 lines.",
    "explanation": "They are functional inverses. Decoders use AND gates to produce minterms; encoders use OR gates to produce binary digits."
  },
  {
    "id": 13,
    "question": "Can an Enable line be added to a 4-to-2 encoder?",
    "answer": "Yes, by ANDing each output with an Enable signal E: Y1 = E · (I2 + I3), Y0 = E · (I1 + I3).",
    "explanation": "When E=0, all outputs are forced to 0 regardless of input lines, providing master chip control."
  },
  {
    "id": 14,
    "question": "What is the binary weight of output line Y1 and Y0?",
    "answer": "Y1 has weight 2¹ = 2; Y0 has weight 2⁰ = 1.",
    "explanation": "The total numerical value is 2 × Y1 + 1 × Y0."
  },
  {
    "id": 15,
    "question": "What is the common CISCE exam marking breakdown for this circuit?",
    "answer": "Truth Table (1 Mark), Boolean Output Equations (1 Mark), Logic Circuit Diagram (1 Mark).",
    "explanation": "CISCE questions typically ask students to construct a 4-to-2 line encoder with all three elements for 3 marks."
  }
];

export default faqs;
