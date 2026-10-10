const questions = [
  {
    id: 1,
    question: "What does the small bubble (circle) at the output of an inverter symbol represent?",
    options: [
      "Amplification of the input signal",
      "Logical Inversion (NOT operation)",
      "Delay line buffer",
      "Ground connection"
    ],
    correctAnswer: 1,
    explanation: "In standard digital logic schematic symbols, an inversion bubble signifies logical negation (NOT operation), indicating that the signal is active-low / inverted.",
    hint: "Bubble = Inversion."
  },
  {
    id: 2,
    question: "Which primary logic gate has a flat back and a smooth semi-circular curved front?",
    options: [
      "OR Gate",
      "AND Gate",
      "NOT Gate",
      "XOR Gate"
    ],
    correctAnswer: 1,
    explanation: "The standard ANSI symbol for an AND gate features a flat vertical input boundary and a curved semi-circular output edge.",
    hint: "Flat back = AND Gate."
  },
  {
    id: 3,
    question: "Which primary logic gate has a curved concave back and a pointed front output?",
    options: [
      "AND Gate",
      "OR Gate",
      "NOT Gate",
      "Buffer Gate"
    ],
    correctAnswer: 1,
    explanation: "The ANSI symbol for an OR gate has a concave curved input edge and curved top/bottom sides terminating at a pointed output crest.",
    hint: "Pointed arrowhead-like front = OR Gate."
  },
  {
    id: 4,
    question: "For a 3-input AND gate with inputs A, B, and C, when will the output Y be 1?",
    options: [
      "When any one of A, B, or C is 1",
      "When at least two inputs are 1",
      "Only when A = 1, B = 1, and C = 1 simultaneously",
      "When A = 0, B = 0, and C = 0"
    ],
    correctAnswer: 2,
    explanation: "In an n-input AND gate, the output is 1 if and only if every single input is 1. If any input is 0, the product $A \\cdot B \\cdot C = 0$.",
    hint: "ALL inputs must be 1."
  },
  {
    id: 5,
    question: "For a 3-input OR gate with inputs A, B, and C, when will the output Y be 0?",
    options: [
      "Only when A = 0, B = 0, and C = 0 simultaneously",
      "When any one input is 0",
      "When two inputs are 0",
      "When A = 1, B = 1, and C = 1"
    ],
    correctAnswer: 0,
    explanation: "An OR gate produces 0 only when all input lines are simultaneously 0 ($0 + 0 + 0 = 0$). If any input is 1, output is 1.",
    hint: "Disjunction yields 0 only if all operands are 0."
  },
  {
    id: 6,
    question: "What is the industry-standard TTL 7400-series IC number for a Hex Inverter (NOT gate)?",
    options: [
      "IC 7400",
      "IC 7404",
      "IC 7408",
      "IC 7432"
    ],
    correctAnswer: 1,
    explanation: "IC 7404 is the standard TTL Hex Inverter IC containing 6 independent NOT gates.",
    hint: "7404 is the NOT gate chip."
  },
  {
    id: 7,
    question: "What is the standard TTL 7400-series IC number for a Quad 2-Input AND gate?",
    options: [
      "IC 7400",
      "IC 7404",
      "IC 7408",
      "IC 7486"
    ],
    correctAnswer: 2,
    explanation: "IC 7408 contains four independent 2-input AND gates.",
    hint: "7408 = AND gate."
  },
  {
    id: 8,
    question: "What is the standard TTL 7400-series IC number for a Quad 2-Input OR gate?",
    options: [
      "IC 7402",
      "IC 7404",
      "IC 7408",
      "IC 7432"
    ],
    correctAnswer: 3,
    explanation: "IC 7432 contains four independent 2-input OR gates.",
    hint: "7432 = OR gate."
  },
  {
    id: 9,
    question: "If a NOT gate is connected immediately after an AND gate, what combined logic gate is formed?",
    options: [
      "NOR Gate",
      "NAND Gate",
      "XOR Gate",
      "XNOR Gate"
    ],
    correctAnswer: 1,
    explanation: "An AND gate followed by an Inverter (NOT gate) produces a NOT-AND gate, abbreviated as NAND gate ($Y = (A \\cdot B)'$).",
    hint: "NOT + AND = NAND."
  },
  {
    id: 10,
    question: "If a NOT gate is connected immediately after an OR gate, what combined logic gate is formed?",
    options: [
      "NAND Gate",
      "NOR Gate",
      "XOR Gate",
      "Buffer Gate"
    ],
    correctAnswer: 1,
    explanation: "An OR gate followed by an Inverter (NOT gate) produces a NOT-OR gate, abbreviated as NOR gate ($Y = (A + B)'$).",
    hint: "NOT + OR = NOR."
  },
  {
    id: 11,
    question: "How many distinct inputs does a standard Inverter (NOT gate) accept?",
    options: [
      "1 input",
      "2 inputs",
      "3 inputs",
      "Arbitrary number"
    ],
    correctAnswer: 0,
    explanation: "A NOT gate is strictly a single-input (unary) logic gate. It cannot have multiple inputs.",
    hint: "NOT operates on exactly one input."
  },
  {
    id: 12,
    question: "Which logic gate can be used as an active-high enable switch to allow or block a digital clock pulse?",
    options: [
      "OR Gate",
      "AND Gate",
      "NOT Gate",
      "Inverter"
    ],
    correctAnswer: 1,
    explanation: "In an AND gate ($Y = Signal \\cdot Enable$), when Enable = 1, $Y = Signal$. When Enable = 0, $Y = 0$ (blocked). Thus AND acts as a gatekeeper.",
    hint: "A . 1 = A, and A . 0 = 0."
  },
  {
    id: 13,
    question: "What is the output Y of the expression Y = (A · B) + (A · C) when A = 1, B = 0, C = 1?",
    options: [
      "0",
      "1",
      "Undefined",
      "2"
    ],
    correctAnswer: 1,
    explanation: "$A \\cdot B = 1 \\cdot 0 = 0$. $A \\cdot C = 1 \\cdot 1 = 1$. $0 + 1 = 1$. Hence $Y = 1$.",
    hint: "Evaluate each AND term first, then OR the results."
  },
  {
    id: 14,
    question: "If all inputs to an 8-input AND gate are 1 except for one input which is 0, what is the gate's output?",
    options: [
      "1",
      "0",
      "7",
      "High impedance"
    ],
    correctAnswer: 1,
    explanation: "In any AND gate, if even a single input is 0, the entire boolean product collapses to 0 ($A \\cdot 0 = 0$).",
    hint: "A single 0 pulls AND output to 0."
  },
  {
    id: 15,
    question: "If all inputs to an 8-input OR gate are 0 except for one input which is 1, what is the gate's output?",
    options: [
      "0",
      "1",
      "8",
      "Undefined"
    ],
    correctAnswer: 1,
    explanation: "In any OR gate, if at least one input is 1, the boolean sum evaluates to 1 ($0 + 0 + ... + 1 = 1$).",
    hint: "A single 1 pulls OR output to 1."
  },
  {
    id: 16,
    question: "What is the Boolean expression corresponding to two cascaded inverters: Input A -> NOT -> NOT -> Output Y?",
    options: [
      "Y = A'",
      "Y = (A')' = A",
      "Y = 0",
      "Y = 1"
    ],
    correctAnswer: 1,
    explanation: "Two cascaded NOT gates perform double inversion: $(A')' = A$. This configuration functions as a non-inverting digital buffer.",
    hint: "Double inversion returns original input."
  },
  {
    id: 17,
    question: "In digital electronics, what logic voltage range generally represents HIGH (Logic 1) in 5V standard TTL?",
    options: [
      "0.0V to 0.8V",
      "2.0V to 5.0V",
      "-5V to 0V",
      "10V to 15V"
    ],
    correctAnswer: 1,
    explanation: "In 5V TTL logic, voltages between 2.0V and 5.0V are recognized as HIGH (Logic 1), while 0.0V to 0.8V are recognized as LOW (Logic 0).",
    hint: "TTL HIGH threshold is above 2V."
  },
  {
    id: 18,
    question: "Which of the following Boolean equations represents an OR gate with complemented inputs?",
    options: [
      "Y = (A + B)'",
      "Y = A' + B'",
      "Y = (A . B)'",
      "Y = A . B'"
    ],
    correctAnswer: 1,
    explanation: "An OR gate with inverted inputs (bubbled OR) has the equation $Y = A' + B'$. By De Morgan's Law, this is equivalent to a NAND gate $(A \\cdot B)'$.",
    hint: "A' + B'."
  },
  {
    id: 19,
    question: "Which logic gate corresponds to the boolean identity A + A = A?",
    options: [
      "An OR gate with both inputs tied together to variable A",
      "An AND gate with both inputs tied together",
      "A NOT gate",
      "An XOR gate"
    ],
    correctAnswer: 0,
    explanation: "Tying both inputs of a 2-input OR gate together yields $Y = A + A = A$ (Idempotent Law for OR).",
    hint: "OR gate with common input."
  },
  {
    id: 20,
    question: "Which logic gate corresponds to the boolean identity A · A = A?",
    options: [
      "An OR gate with tied inputs",
      "An AND gate with both inputs tied together to variable A",
      "A NOT gate",
      "An XNOR gate"
    ],
    correctAnswer: 1,
    explanation: "Tying both inputs of a 2-input AND gate together yields $Y = A \\cdot A = A$ (Idempotent Law for AND).",
    hint: "AND gate with common input."
  },
  {
    id: 21,
    question: "What is the output of an AND gate if one input is permanently connected to Logic 1 (+5V)?",
    options: [
      "Always 1",
      "Always 0",
      "Equal to the other input (Y = A)",
      "Inverted (Y = A')"
    ],
    correctAnswer: 2,
    explanation: "By the Identity Law ($A \\cdot 1 = A$), holding one input of an AND gate HIGH allows the other input signal to pass through unchanged.",
    hint: "A . 1 = A."
  },
  {
    id: 22,
    question: "What is the output of an OR gate if one input is permanently connected to Logic 0 (Ground)?",
    options: [
      "Always 0",
      "Always 1",
      "Equal to the other input (Y = A)",
      "Inverted (Y = A')"
    ],
    correctAnswer: 2,
    explanation: "By the Identity Law ($A + 0 = A$), holding one input of an OR gate LOW allows the other input signal to pass through directly.",
    hint: "A + 0 = A."
  },
  {
    id: 23,
    question: "What is the output of an AND gate if one input is permanently grounded (Logic 0)?",
    options: [
      "Always 0",
      "Always 1",
      "Equal to A",
      "Floating"
    ],
    correctAnswer: 0,
    explanation: "By the Boundedness/Null Law ($A \\cdot 0 = 0$), tying any input of an AND gate to 0 permanently forces the output to 0.",
    hint: "A . 0 = 0."
  },
  {
    id: 24,
    question: "What is the output of an OR gate if one input is permanently connected to +5V (Logic 1)?",
    options: [
      "Always 0",
      "Always 1",
      "Equal to A",
      "Oscillating"
    ],
    correctAnswer: 1,
    explanation: "By the Boundedness/Null Law ($A + 1 = 1$), tying any input of an OR gate to 1 permanently forces the output to 1.",
    hint: "A + 1 = 1."
  },
  {
    id: 25,
    question: "Why are NOT, AND, and OR called 'Primary' logic gates?",
    options: [
      "Because they were invented by Google",
      "Because any conceivable digital Boolean function can be expressed and built using combinations of these three elementary gates",
      "Because they use higher voltage than other gates",
      "Because they require no power supply"
    ],
    correctAnswer: 1,
    explanation: "NOT, AND, and OR form a functionally complete set of fundamental operations from which all complex combinational circuits (adders, multiplexers, decoders, ALUs) are constructed.",
    hint: "They form the foundational basis of all digital computation."
  }
];

export default questions;
