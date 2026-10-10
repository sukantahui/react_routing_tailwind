const questions = [
  {
    id: 1,
    question: "What is the standard architecture of a two-level logic circuit that implements a Sum-of-Products (SOP) Boolean expression?",
    options: [
      "OR-AND Circuit",
      "AND-OR Circuit",
      "NAND-NOR Circuit",
      "XOR-XNOR Circuit"
    ],
    correctAnswer: 1,
    explanation: "A Sum-of-Products (SOP) expression (e.g. $AB + CD$) is synthesized as a two-level AND-OR circuit: Level 1 contains AND gates, and Level 2 combines them in a single OR gate.",
    hint: "SOP = AND-OR."
  },
  {
    id: 2,
    question: "What is the standard architecture of a two-level logic circuit that implements a Product-of-Sums (POS) Boolean expression?",
    options: [
      "AND-OR Circuit",
      "OR-AND Circuit",
      "NOR-NAND Circuit",
      "Buffer-Inverter Circuit"
    ],
    correctAnswer: 1,
    explanation: "A Product-of-Sums (POS) expression (e.g. $(A+B)(C+D)$) is synthesized as a two-level OR-AND circuit: Level 1 contains OR gates, and Level 2 multiplies them in a single AND gate.",
    hint: "POS = OR-AND."
  },
  {
    id: 3,
    question: "In a digital schematic diagram, what does a solid black dot at a wire intersection indicate?",
    options: [
      "A burnt resistor",
      "An electrical connection / branch tap between the intersecting conductors",
      "An air gap with no physical connection",
      "A grounding pin"
    ],
    correctAnswer: 1,
    explanation: "In electronic schematic conventions, a solid dot at a wire junction represents a valid electrical connection (bus tap). Wires crossing without a dot do not connect.",
    hint: "Dot = Electrical connection."
  },
  {
    id: 4,
    question: "Which gates are required to construct a 1-bit Half Adder circuit?",
    options: [
      "One XOR gate (for Sum) and one AND gate (for Carry)",
      "Two OR gates and one NOT gate",
      "One NAND gate and one NOR gate",
      "Two AND gates"
    ],
    correctAnswer: 0,
    explanation: "A Half Adder requires one XOR gate ($Sum = A \\oplus B$) and one AND gate ($Carry = A \\cdot B$).",
    hint: "XOR for Sum, AND for Carry."
  },
  {
    id: 5,
    question: "What is the Boolean expression derived from a circuit where inputs A and B enter a NAND gate, and its output enters an inverter?",
    options: [
      "Y = (A · B)'",
      "Y = ((A · B)')' = A · B",
      "Y = A + B",
      "Y = A' + B'"
    ],
    correctAnswer: 1,
    explanation: "The NAND gate produces $(A \\cdot B)'$. The subsequent inverter negates it to $((A \\cdot B)')' = A \\cdot B$ (AND function).",
    hint: "Double negation yields AND."
  },
  {
    id: 6,
    question: "What is the Boolean expression derived from a circuit where inputs A and B enter an OR gate, and its output enters an inverter?",
    options: [
      "Y = A + B",
      "Y = (A + B)' (NOR function)",
      "Y = A · B",
      "Y = A' · B'"
    ],
    correctAnswer: 1,
    explanation: "An OR gate followed by an Inverter implements the NOR operation: $Y = (A + B)'$.",
    hint: "OR + Inverter = NOR."
  },
  {
    id: 7,
    question: "How many total gates (including inverters) are needed to draw Y = A'B + AB' without using XOR?",
    options: [
      "2 gates",
      "3 gates",
      "5 gates (2 NOTs, 2 ANDs, 1 OR)",
      "8 gates"
    ],
    correctAnswer: 2,
    explanation: "Requires 2 NOT gates (for A' and B'), 2 AND gates (for A'B and AB'), and 1 OR gate to sum them ($2+2+1 = 5$ gates).",
    hint: "2 NOT + 2 AND + 1 OR = 5 gates."
  },
  {
    id: 8,
    question: "What is the Boolean expression for a circuit with 3 inputs A, B, C where A and B enter an AND gate (G1), and G1 and C enter an OR gate (G2)?",
    options: [
      "Y = A · (B + C)",
      "Y = (A · B) + C",
      "Y = (A + B) · C",
      "Y = A + B + C"
    ],
    correctAnswer: 1,
    explanation: "$G_1 = A \\cdot B$. $G_2$ combines $G_1$ and $C$ in an OR gate, yielding $Y = (A \\cdot B) + C$.",
    hint: "AB + C."
  },
  {
    id: 9,
    question: "What is the Boolean expression for a circuit where inputs A and B enter an OR gate (G1), and inputs B and C enter another OR gate (G2), and both enter an AND gate (G3)?",
    options: [
      "Y = (A + B) · (B + C)",
      "Y = AB + BC",
      "Y = (A · B) + (B · C)",
      "Y = A + B · C"
    ],
    correctAnswer: 0,
    explanation: "$G_1 = A + B$, $G_2 = B + C$. Final AND gate multiplies them: $Y = (A + B) \\cdot (B + C)$.",
    hint: "(A+B)(B+C)."
  },
  {
    id: 10,
    question: "In logic circuit diagrams, what is the convention for signal flow direction?",
    options: [
      "Right to Left",
      "Left to Right (Inputs on left, outputs on right)",
      "Top to Bottom only",
      "Circular clockwise"
    ],
    correctAnswer: 1,
    explanation: "Standard international schematic drawing convention dictates that input signals enter on the left and flow toward outputs on the right.",
    hint: "Inputs on left, outputs on right."
  },
  {
    id: 11,
    question: "What is propagation delay in a digital logic circuit?",
    options: [
      "The time taken for a change at the input terminal to produce a corresponding change at the output terminal",
      "The time it takes to draw the circuit diagram",
      "The battery discharge time",
      "The clock speed in MHz"
    ],
    correctAnswer: 0,
    explanation: "Propagation delay ($t_{pd}$) is the finite physical time required for an electrical signal to transit through semiconductor transistors inside a logic gate.",
    hint: "Input to output response time."
  },
  {
    id: 12,
    question: "How does reducing logic gate levels (e.g. from 4 levels to 2 levels) affect circuit performance?",
    options: [
      "Increases propagation delay",
      "Reduces propagation delay, allowing higher processor clock frequencies",
      "Increases battery consumption only",
      "No effect on speed"
    ],
    correctAnswer: 1,
    explanation: "Fewer gate levels in series reduces cumulative propagation delay, enabling faster processing speeds.",
    hint: "Fewer levels = faster speed."
  },
  {
    id: 13,
    question: "What is the output Y of a circuit implementing Y = (A + B') · C when A = 0, B = 0, C = 1?",
    options: [
      "0",
      "1",
      "Undefined",
      "2"
    ],
    correctAnswer: 1,
    explanation: "$B' = 0' = 1$. $A + B' = 0 + 1 = 1$. $1 \\cdot C = 1 \\cdot 1 = 1$. Hence $Y = 1$.",
    hint: "(0 + 1) . 1 = 1."
  },
  {
    id: 14,
    question: "What is the output Y of a circuit implementing Y = A · B + C' when A = 1, B = 0, C = 1?",
    options: [
      "0",
      "1",
      "Undefined",
      "-1"
    ],
    correctAnswer: 0,
    explanation: "$A \\cdot B = 1 \\cdot 0 = 0$. $C' = 1' = 0$. $0 + 0 = 0$. Hence $Y = 0$.",
    hint: "0 + 0 = 0."
  },
  {
    id: 15,
    question: "Which of the following circuits synthesizes the XOR function Y = A'B + AB' with the minimum number of NAND gates?",
    options: [
      "A 4-NAND gate cross-coupled circuit",
      "A 2-NAND gate circuit",
      "A 6-NAND gate circuit",
      "An 8-NAND gate circuit"
    ],
    correctAnswer: 0,
    explanation: "An optimal 4-NAND gate circuit synthesizes the 2-input XOR operation.",
    hint: "4 NAND gates."
  },
  {
    id: 16,
    question: "When synthesizing the logic circuit for Y = (A + B)(C + D) + E, what is the final output gate?",
    options: [
      "An AND gate",
      "An OR gate",
      "A NOT gate",
      "An XOR gate"
    ],
    correctAnswer: 1,
    explanation: "The outermost operation is addition with $E$, so the final output is generated by an OR gate.",
    hint: "Outer + operation means OR gate."
  },
  {
    id: 17,
    question: "When synthesizing the logic circuit for Y = (A · B + C) · (D + E), what is the final output gate?",
    options: [
      "An OR gate",
      "An AND gate",
      "A NAND gate",
      "A NOR gate"
    ],
    correctAnswer: 1,
    explanation: "The outermost operation is multiplication between the two parenthesized sub-terms, so the final gate is an AND gate.",
    hint: "Outer . operation means AND gate."
  },
  {
    id: 18,
    question: "What is the Boolean expression for an active-low enable AND gate circuit: Signal A, Enable E (active when E=0)?",
    options: [
      "Y = A · E",
      "Y = A · E'",
      "Y = A + E",
      "Y = A + E'"
    ],
    correctAnswer: 1,
    explanation: "When active-low, Enable passes signal when $E=0$. Thus $E'$ is fed with $A$ into an AND gate: $Y = A \\cdot E'$.",
    hint: "Invert E before ANDing."
  },
  {
    id: 19,
    question: "What digital circuit component adds three 1-bit binary inputs (A, B, and Carry-in)?",
    options: [
      "Half Adder",
      "Full Adder",
      "Multiplexer",
      "Decoder"
    ],
    correctAnswer: 1,
    explanation: "A Full Adder takes three 1-bit inputs ($A, B, C_{in}$) and produces two outputs ($Sum = A \\oplus B \\oplus C_{in}$, $C_{out} = AB + C_{in}(A \\oplus B)$).",
    hint: "Full Adder handles 3 inputs."
  },
  {
    id: 20,
    question: "A Full Adder circuit can be constructed using:",
    options: [
      "Two Half Adders and one OR gate",
      "One Half Adder only",
      "Three Inverters",
      "Four NOT gates"
    ],
    correctAnswer: 0,
    explanation: "A standard Full Adder is synthesized by cascading two Half Adders and OR-ing their carry outputs.",
    hint: "2 Half Adders + 1 OR gate."
  },
  {
    id: 21,
    question: "In a circuit diagram, if an output of an AND gate is fed into one input of another AND gate, this is called:",
    options: [
      "Cascading",
      "Short-circuiting",
      "Oscillating",
      "Floating"
    ],
    correctAnswer: 0,
    explanation: "Connecting the output of one logic stage into the input of a subsequent stage is known as cascading.",
    hint: "Cascading gates in series."
  },
  {
    id: 22,
    question: "What is the Boolean expression for: Input A -> NOT -> Input B & NOT(A) -> AND -> Output Y?",
    options: [
      "Y = A'B",
      "Y = AB'",
      "Y = A + B",
      "Y = (AB)'"
    ],
    correctAnswer: 0,
    explanation: "The inverter produces $A'$. The AND gate combines $A'$ and $B$ to produce $Y = A'B$.",
    hint: "A' . B."
  },
  {
    id: 23,
    question: "What is the Boolean expression for: Inputs A and B -> NAND -> Output G1; G1 into both inputs of a NAND -> Output Y?",
    options: [
      "Y = (AB)'",
      "Y = AB",
      "Y = A + B",
      "Y = A' + B'"
    ],
    correctAnswer: 1,
    explanation: "$G_1 = (AB)'$. Passing $G_1$ into a NAND with tied inputs inverts it: $((AB)')' = AB$.",
    hint: "AND realized via 2 NANDs."
  },
  {
    id: 24,
    question: "Why should circuit lines be labeled with intermediate expressions in CBSE exam answers?",
    options: [
      "It allows examiners to award step marks even if there is a minor error at the final output gate",
      "It changes the voltage",
      "It is required by the compiler",
      "It prevents short circuits on the paper"
    ],
    correctAnswer: 0,
    explanation: "CBSE marking schemes award individual partial marks for intermediate node expressions in circuit synthesis questions.",
    hint: "Step marks for labeled intermediate nodes."
  },
  {
    id: 25,
    question: "Which electronic design automation (EDA) format is universally used in industry to synthesize Boolean logic into physical FPGA and ASIC netlists?",
    options: [
      "HTML & CSS",
      "Verilog and VHDL Hardware Description Languages (HDLs)",
      "Microsoft Word",
      "SQL Query Scripts"
    ],
    correctAnswer: 1,
    explanation: "Hardware Description Languages (HDLs) like Verilog and VHDL are the industry standard for describing, simulating, and synthesizing digital logic circuits onto silicon chips and FPGAs.",
    hint: "VHDL and Verilog."
  }
];

export default questions;
