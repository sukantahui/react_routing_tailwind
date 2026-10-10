const questions = [
  {
    id: 1,
    question: "Which of the following ICs contains four independent 2-input NAND gates?",
    options: [
      "IC 7400",
      "IC 7402",
      "IC 7404",
      "IC 7408"
    ],
    correctAnswer: 0,
    explanation: "IC 7400 is the standard TTL Quad 2-Input NAND gate IC.",
    hint: "7400 is the NAND gate chip."
  },
  {
    id: 2,
    question: "Which of the following ICs contains four independent 2-input NOR gates?",
    options: [
      "IC 7400",
      "IC 7402",
      "IC 7408",
      "IC 7432"
    ],
    correctAnswer: 1,
    explanation: "IC 7402 is the standard TTL Quad 2-Input NOR gate IC.",
    hint: "7402 is the NOR gate chip."
  },
  {
    id: 3,
    question: "Which of the following ICs contains six independent NOT gates (Hex Inverter)?",
    options: [
      "IC 7404",
      "IC 7408",
      "IC 7432",
      "IC 7486"
    ],
    correctAnswer: 0,
    explanation: "IC 7404 is the standard TTL Hex Inverter IC (contains 6 NOT gates).",
    hint: "7404 = Inverter."
  },
  {
    id: 4,
    question: "Which of the following ICs contains four independent 2-input AND gates?",
    options: [
      "IC 7400",
      "IC 7404",
      "IC 7408",
      "IC 7432"
    ],
    correctAnswer: 2,
    explanation: "IC 7408 contains four 2-input AND gates.",
    hint: "7408 = AND."
  },
  {
    id: 5,
    question: "Which of the following ICs contains four independent 2-input OR gates?",
    options: [
      "IC 7402",
      "IC 7408",
      "IC 7432",
      "IC 7486"
    ],
    correctAnswer: 2,
    explanation: "IC 7432 contains four 2-input OR gates.",
    hint: "7432 = OR."
  },
  {
    id: 6,
    question: "Which of the following ICs contains four independent 2-input XOR gates?",
    options: [
      "IC 7400",
      "IC 7408",
      "IC 7486",
      "IC 74266"
    ],
    correctAnswer: 2,
    explanation: "IC 7486 contains four 2-input XOR gates.",
    hint: "7486 = XOR."
  },
  {
    id: 7,
    question: "How many NAND gates are required to realize an OR gate?",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correctAnswer: 2,
    explanation: "Three NAND gates: 2 for inverting A and B, and 1 for $(A'B')' = A + B$.",
    hint: "3 NAND gates."
  },
  {
    id: 8,
    question: "How many NOR gates are required to realize an AND gate?",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correctAnswer: 2,
    explanation: "Three NOR gates: 2 for inverting A and B, and 1 for $(A'+B')' = AB$.",
    hint: "3 NOR gates."
  },
  {
    id: 9,
    question: "What is the Boolean expression for the Carry Out of a Full Adder?",
    options: [
      "Cout = AB + Cin(A ⊕ B)",
      "Cout = A ⊕ B ⊕ Cin",
      "Cout = A + B + Cin",
      "Cout = A · B · Cin"
    ],
    correctAnswer: 0,
    explanation: "The Carry Out of a Full Adder is $C_{out} = AB + C_{in}(A \\oplus B)$.",
    hint: "Carry out equation."
  },
  {
    id: 10,
    question: "What is the Boolean expression for the Sum bit of a Full Adder?",
    options: [
      "Sum = A ⊕ B ⊕ Cin",
      "Sum = AB + Cin",
      "Sum = A + B + Cin",
      "Sum = (A ⊕ B)' · Cin"
    ],
    correctAnswer: 0,
    explanation: "The Sum bit of a Full Adder is $Sum = A \\oplus B \\oplus C_{in}$.",
    hint: "Sum bit is 3-variable XOR."
  },
  {
    id: 11,
    question: "What is the dual of A + (B · C) = (A + B) · (A + C)?",
    options: [
      "A · (B + C) = A·B + A·C",
      "A' · (B + C) = A'B + A'C",
      "A + BC = A + B + C",
      "A · BC = ABC"
    ],
    correctAnswer: 0,
    explanation: "The dual of the 2nd Distributive Law is the 1st Distributive Law: $A(B+C) = AB + AC$.",
    hint: "Swap + and . everywhere."
  },
  {
    id: 12,
    question: "What is the simplified form of A + A'B + AB'?",
    options: [
      "A + B",
      "A + B + B' = 1",
      "AB",
      "0"
    ],
    correctAnswer: 0,
    explanation: "$A + A'B + AB' = (A + AB') + A'B = A + A'B = A + B$.",
    hint: "A absorbs AB' then A absorbs A'B."
  },
  {
    id: 13,
    question: "What is a 2-level SOP circuit composed of?",
    options: [
      "AND gates at Level 1 feeding into an OR gate at Level 2",
      "OR gates feeding into an AND gate",
      "NAND gates only",
      "Inverters only"
    ],
    correctAnswer: 0,
    explanation: "SOP circuits have AND gates at level 1 and an OR gate at level 2.",
    hint: "AND-OR architecture."
  },
  {
    id: 14,
    question: "What is the dual of the identity: A · A' = 0?",
    options: [
      "A + A' = 1",
      "A · 1 = A",
      "A + 0 = A",
      "A · 0 = 0"
    ],
    correctAnswer: 0,
    explanation: "Swap '·' with '+' and '0' with '1': $A + A' = 1$.",
    hint: "Complement law for OR."
  },
  {
    id: 15,
    question: "What is the result of (A ⊕ B)' ⊕ B?",
    options: [
      "A'",
      "A",
      "B",
      "1"
    ],
    correctAnswer: 0,
    explanation: "$(A \\oplus B)' \\oplus B = (A \\odot B) \\oplus B = (AB + A'B') \\oplus B = A'$.",
    hint: "Expands to A'."
  },
  {
    id: 16,
    question: "How many input combinations does a 5-variable truth table contain?",
    options: [
      "16",
      "32",
      "64",
      "128"
    ],
    correctAnswer: 1,
    explanation: "$2^5 = 32$ rows.",
    hint: "2^5 = 32."
  },
  {
    id: 17,
    question: "According to De Morgan's 2nd Law, (AB)' is equivalent to:",
    options: [
      "A' + B'",
      "A'B'",
      "A + B",
      "(A + B)'"
    ],
    correctAnswer: 0,
    explanation: "$(AB)' = A' + B'$.",
    hint: "NAND = Bubbled OR."
  },
  {
    id: 18,
    question: "According to De Morgan's 1st Law, (A + B)' is equivalent to:",
    options: [
      "A' · B'",
      "A' + B'",
      "A · B",
      "(A · B)'"
    ],
    correctAnswer: 0,
    explanation: "$(A + B)' = A' \\cdot B'$.",
    hint: "NOR = Bubbled AND."
  },
  {
    id: 19,
    question: "Which Boolean theorem states: A + AB = A?",
    options: [
      "Identity Law",
      "Absorption Law 1",
      "Associative Law",
      "Distributive Law"
    ],
    correctAnswer: 1,
    explanation: "Absorption Law 1 states $A + AB = A(1 + B) = A(1) = A$.",
    hint: "Absorption law."
  },
  {
    id: 20,
    question: "Which Boolean theorem states: (A')' = A?",
    options: [
      "Involution Law (Double Inversion)",
      "Idempotent Law",
      "Complement Law",
      "Null Law"
    ],
    correctAnswer: 0,
    explanation: "Involution Law states that double negation restores the original variable.",
    hint: "Involution law."
  },
  {
    id: 21,
    question: "Which of the following statements about a Tautology is correct?",
    options: [
      "Its truth table output is 1 for all input rows",
      "Its truth table output is 0 for all input rows",
      "It contains only one variable",
      "It is always False"
    ],
    correctAnswer: 0,
    explanation: "A Tautology is universally True (evaluates to 1) for every row in its truth table.",
    hint: "All 1s = Tautology."
  },
  {
    id: 22,
    question: "Which of the following statements about a Fallacy / Contradiction is correct?",
    options: [
      "Its truth table output is 0 for all input rows",
      "Its truth table output is 1 for all input rows",
      "It is a valid theorem",
      "It requires 3 inputs"
    ],
    correctAnswer: 0,
    explanation: "A Fallacy / Contradiction is universally False (evaluates to 0) for every row in its truth table.",
    hint: "All 0s = Fallacy."
  },
  {
    id: 23,
    question: "In Python, which built-in operator computes the bitwise inversion (NOT)?",
    options: [
      "not",
      "~",
      "!",
      "^"
    ],
    correctAnswer: 1,
    explanation: "The tilde `~` is Python's bitwise NOT operator.",
    hint: "Tilde operator ~."
  },
  {
    id: 24,
    question: "What is the output of the Python expression: `bool(1 & 0 | 1)`?",
    options: [
      "True",
      "False",
      "1",
      "0"
    ],
    correctAnswer: 0,
    explanation: "`1 & 0` is 0. `0 | 1` is 1. `bool(1)` is True.",
    hint: "Evaluates to True."
  },
  {
    id: 25,
    question: "Why does CBSE Class XI CS 083 include Boolean Logic in Unit 1 Computer Systems & Organisation?",
    options: [
      "Because Boolean logic and digital logic gates form the mathematical foundation for all CPU ALUs, memory latches, registers, and digital hardware architectures",
      "Because it is required to play video games",
      "Because it replaces Python syntax",
      "Because it is only used in web browsers"
    ],
    correctAnswer: 0,
    explanation: "Understanding Boolean algebra and logic gates explains how physical silicon transistors perform mathematical computation and data manipulation inside modern computer processors.",
    hint: "Foundational hardware theory."
  }
];

export default questions;
