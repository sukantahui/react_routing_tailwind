const questions = [
  {
    id: 1,
    question: "Why are NAND and NOR gates called Universal Gates?",
    options: [
      "Because they are the only gates used in outer space",
      "Because any Boolean logic circuit or primary gate can be constructed using exclusively NAND or exclusively NOR gates",
      "Because they operate with higher voltage than all other gates",
      "Because they do not require power supplies"
    ],
    correctAnswer: 1,
    explanation: "NAND and NOR gates are universal because a complete digital system (implementing NOT, AND, OR, XOR, etc.) can be fabricated entirely out of either NAND gates alone or NOR gates alone.",
    hint: "Universal means capable of realizing all other digital functions."
  },
  {
    id: 2,
    question: "How many 2-input NAND gates are required to implement a NOT gate (Inverter)?",
    options: [
      "1 NAND Gate",
      "2 NAND Gates",
      "3 NAND Gates",
      "4 NAND Gates"
    ],
    correctAnswer: 0,
    explanation: "Tying both inputs of a NAND gate together yields $Y = (A \\cdot A)' = A'$. Thus, exactly 1 NAND gate is needed.",
    hint: "Tie the two inputs together: (A.A)' = A'."
  },
  {
    id: 3,
    question: "How many 2-input NAND gates are required to implement a standard 2-input AND gate?",
    options: [
      "1 NAND Gate",
      "2 NAND Gates",
      "3 NAND Gates",
      "4 NAND Gates"
    ],
    correctAnswer: 1,
    explanation: "Two NAND gates are required: the first computes $(A \\cdot B)'$, and the second acts as an inverter to produce $((A \\cdot B)')' = A \\cdot B$.",
    hint: "NAND followed by an Inverter."
  },
  {
    id: 4,
    question: "How many 2-input NAND gates are required to implement a standard 2-input OR gate?",
    options: [
      "2 NAND Gates",
      "3 NAND Gates",
      "4 NAND Gates",
      "5 NAND Gates"
    ],
    correctAnswer: 1,
    explanation: "Three NAND gates are required: 2 gates invert A and B to yield A' and B', and the 3rd NAND computes $(A' \\cdot B')' = A + B$ via De Morgan's Law.",
    hint: "Invert A, invert B, then NAND them together (3 gates total)."
  },
  {
    id: 5,
    question: "How many 2-input NOR gates are required to implement a standard 2-input OR gate?",
    options: [
      "1 NOR Gate",
      "2 NOR Gates",
      "3 NOR Gates",
      "4 NOR Gates"
    ],
    correctAnswer: 1,
    explanation: "Two NOR gates are needed: the first computes $(A + B)'$, and the second inverts it to produce $((A + B)')' = A + B$.",
    hint: "NOR followed by an Inverter."
  },
  {
    id: 6,
    question: "How many 2-input NOR gates are required to implement a standard 2-input AND gate?",
    options: [
      "2 NOR Gates",
      "3 NOR Gates",
      "4 NOR Gates",
      "5 NOR Gates"
    ],
    correctAnswer: 1,
    explanation: "Three NOR gates are needed: 2 gates invert A and B to yield A' and B', and the 3rd NOR computes $(A' + B')' = A \\cdot B$ via De Morgan's Law.",
    hint: "Invert A, invert B, then NOR them together (3 gates total)."
  },
  {
    id: 7,
    question: "What is the standard TTL 7400-series IC number for a Quad 2-Input NAND gate?",
    options: [
      "IC 7400",
      "IC 7402",
      "IC 7404",
      "IC 7408"
    ],
    correctAnswer: 0,
    explanation: "IC 7400 is the fundamental Quad 2-input NAND gate TTL integrated circuit.",
    hint: "7400 is the primary NAND chip."
  },
  {
    id: 8,
    question: "What is the standard TTL 7400-series IC number for a Quad 2-Input NOR gate?",
    options: [
      "IC 7400",
      "IC 7402",
      "IC 7404",
      "IC 7432"
    ],
    correctAnswer: 1,
    explanation: "IC 7402 is the standard Quad 2-input NOR gate TTL integrated circuit.",
    hint: "7402 is the NOR gate chip."
  },
  {
    id: 9,
    question: "What is the output of a 2-input NAND gate when both inputs A and B are 1?",
    options: [
      "1",
      "0",
      "Undefined",
      "High impedance"
    ],
    correctAnswer: 1,
    explanation: "$Y = (1 \\cdot 1)' = 1' = 0$. A NAND gate produces 0 only when all inputs are 1.",
    hint: "NAND is inverted AND: (1.1)' = 0."
  },
  {
    id: 10,
    question: "What is the output of a 2-input NOR gate when both inputs A and B are 0?",
    options: [
      "0",
      "1",
      "Undefined",
      "-1"
    ],
    correctAnswer: 1,
    explanation: "$Y = (0 + 0)' = 0' = 1$. A NOR gate produces 1 only when all inputs are 0.",
    hint: "NOR is inverted OR: (0+0)' = 1."
  },
  {
    id: 11,
    question: "According to De Morgan's First Law, what is (A · B)' equivalent to?",
    options: [
      "A' · B'",
      "A' + B'",
      "A + B",
      "(A + B)'"
    ],
    correctAnswer: 1,
    explanation: "De Morgan's First Law states $(A \\cdot B)' = A' + B'$ (A NAND gate is algebraically equal to a bubbled OR gate).",
    hint: "Break the line, change the sign: (A.B)' = A' + B'."
  },
  {
    id: 12,
    question: "According to De Morgan's Second Law, what is (A + B)' equivalent to?",
    options: [
      "A' · B'",
      "A' + B'",
      "A · B",
      "(A · B)'"
    ],
    correctAnswer: 0,
    explanation: "De Morgan's Second Law states $(A + B)' = A' \\cdot B'$ (A NOR gate is algebraically equal to a bubbled AND gate).",
    hint: "Break the line, change the sign: (A+B)' = A' . B'."
  },
  {
    id: 13,
    question: "How many 2-input NAND gates are needed to implement a 2-input XOR gate ($A \\oplus B$)?",
    options: [
      "3 NAND Gates",
      "4 NAND Gates",
      "5 NAND Gates",
      "6 NAND Gates"
    ],
    correctAnswer: 1,
    explanation: "A standard optimal 2-input XOR circuit requires exactly 4 NAND gates.",
    hint: "4 NAND gates are required for XOR."
  },
  {
    id: 14,
    question: "How many 2-input NOR gates are needed to implement a 2-input XOR gate ($A \\oplus B$)?",
    options: [
      "3 NOR Gates",
      "4 NOR Gates",
      "5 NOR Gates",
      "6 NOR Gates"
    ],
    correctAnswer: 2,
    explanation: "Implementing an XOR gate using only NOR gates requires 5 NOR gates (while an XNOR requires 4 NOR gates).",
    hint: "5 NOR gates for XOR."
  },
  {
    id: 15,
    question: "Which of the following describes the circuit realization: (A + A)'?",
    options: [
      "NOT gate implemented via NOR",
      "AND gate implemented via NAND",
      "OR gate implemented via NOR",
      "XOR gate implemented via NAND"
    ],
    correctAnswer: 0,
    explanation: "$(A + A)' = A'$. Connecting both inputs of a NOR gate together implements an inverter (NOT gate).",
    hint: "A single variable fed into both inputs of a NOR gate."
  },
  {
    id: 16,
    question: "What happens if one input of a 2-input NAND gate is tied permanently to Logic 1 (+5V)?",
    options: [
      "The output is always 1",
      "The output is always 0",
      "The gate acts as a NOT gate for the other input (Y = A')",
      "The gate acts as an AND gate"
    ],
    correctAnswer: 2,
    explanation: "$Y = (A \\cdot 1)' = A'$. Thus, holding one input HIGH configures a NAND gate as an inverter (NOT gate).",
    hint: "(A . 1)' = A'."
  },
  {
    id: 17,
    question: "What happens if one input of a 2-input NOR gate is tied permanently to Logic 0 (Ground)?",
    options: [
      "The output is always 0",
      "The output is always 1",
      "The gate acts as a NOT gate for the other input (Y = A')",
      "The gate acts as an OR gate"
    ],
    correctAnswer: 2,
    explanation: "$Y = (A + 0)' = A'$. Thus, holding one input LOW configures a NOR gate as an inverter (NOT gate).",
    hint: "(A + 0)' = A'."
  },
  {
    id: 18,
    question: "What happens if one input of a 2-input NAND gate is tied permanently to Logic 0 (Ground)?",
    options: [
      "Output is permanently locked at 1 (HIGH)",
      "Output is permanently locked at 0 (LOW)",
      "Output oscillates",
      "Output equals A"
    ],
    correctAnswer: 0,
    explanation: "$Y = (A \\cdot 0)' = 0' = 1$. Tying an input of NAND to ground disables the gate and fixes the output at Logic 1.",
    hint: "(A . 0)' = 0' = 1."
  },
  {
    id: 19,
    question: "What happens if one input of a 2-input NOR gate is tied permanently to Logic 1 (+5V)?",
    options: [
      "Output is permanently locked at 1",
      "Output is permanently locked at 0 (LOW)",
      "Output equals A",
      "Output equals A'"
    ],
    correctAnswer: 1,
    explanation: "$Y = (A + 1)' = 1' = 0$. Tying an input of NOR to +5V disables the gate and forces the output to Logic 0.",
    hint: "(A + 1)' = 1' = 0."
  },
  {
    id: 20,
    question: "Why is NAND logic generally faster than NOR logic in CMOS integrated circuits?",
    options: [
      "NAND gates use gold wires instead of copper",
      "NAND gates place NMOS transistors in series, and electrons have higher carrier mobility than holes in PMOS transistors",
      "NAND gates operate at lower clock frequencies",
      "NAND gates have higher voltage tolerances"
    ],
    correctAnswer: 1,
    explanation: "In CMOS silicon fabrication, NMOS transistors conduct via electrons (higher mobility) while PMOS conduct via holes. NAND gates put NMOS in series and PMOS in parallel, making them faster and more compact than NOR gates.",
    hint: "Electron mobility in NMOS gives NAND superior speed."
  },
  {
    id: 21,
    question: "What is the output of the expression Y = (A · B)' when A = 0 and B = 1?",
    options: [
      "0",
      "1",
      "Undefined",
      "Floating"
    ],
    correctAnswer: 1,
    explanation: "$A \\cdot B = 0 \\cdot 1 = 0$. Inverting gives $0' = 1$.",
    hint: "First find AND (0), then invert (1)."
  },
  {
    id: 22,
    question: "What is the output of the expression Y = (A + B)' when A = 1 and B = 0?",
    options: [
      "1",
      "0",
      "Undefined",
      "2"
    ],
    correctAnswer: 1,
    explanation: "$A + B = 1 + 0 = 1$. Inverting gives $1' = 0$.",
    hint: "First find OR (1), then invert (0)."
  },
  {
    id: 23,
    question: "Which of the following represents a 3-input NAND gate output equation?",
    options: [
      "Y = A' · B' · C'",
      "Y = (A · B · C)'",
      "Y = A + B + C'",
      "Y = (A + B + C)'"
    ],
    correctAnswer: 1,
    explanation: "A 3-input NAND gate performs AND on all three inputs followed by overall negation: $Y = (A \\cdot B \\cdot C)'$.",
    hint: "Overall complement of the product."
  },
  {
    id: 24,
    question: "Which of the following represents a 3-input NOR gate output equation?",
    options: [
      "Y = (A · B · C)'",
      "Y = A' + B' + C'",
      "Y = (A + B + C)'",
      "Y = A · B' · C"
    ],
    correctAnswer: 2,
    explanation: "A 3-input NOR gate performs OR on all three inputs followed by overall negation: $Y = (A + B + C)'$.",
    hint: "Overall complement of the sum."
  },
  {
    id: 25,
    question: "In digital IC layout design, what is the primary economic advantage of using universal NAND gates?",
    options: [
      "Requires fewer PCB layers and identical silicon standard cell libraries, reducing mask tooling and manufacturing cost",
      "Eliminates the need for ground connections",
      "Allows analog signals to be processed directly",
      "Doubles the operating voltage"
    ],
    correctAnswer: 0,
    explanation: "Designing circuits with a single universal gate type simplifies fabrication masks, optimizes silicon real estate, and streamlines inventory and quality control.",
    hint: "Standardized single-gate libraries reduce manufacturing overhead."
  }
];

export default questions;
