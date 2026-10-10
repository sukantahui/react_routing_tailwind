const questions = [
  {
    id: 1,
    question: "What is the Boolean algebraic definition of a 2-input XOR gate (A ⊕ B)?",
    options: [
      "Y = AB + A'B'",
      "Y = A'B + AB'",
      "Y = A + B",
      "Y = A · B"
    ],
    correctAnswer: 1,
    explanation: "The Boolean algebraic expression for XOR is $A \\oplus B = \\overline{A}B + A\\overline{B}$.",
    hint: "A'B + AB'."
  },
  {
    id: 2,
    question: "What is the Boolean algebraic definition of a 2-input XNOR gate (A ⊙ B)?",
    options: [
      "Y = A'B + AB'",
      "Y = AB + A'B'",
      "Y = (A + B)'",
      "Y = A' + B'"
    ],
    correctAnswer: 1,
    explanation: "The Boolean algebraic expression for XNOR is $A \\odot B = (A \\oplus B)' = AB + \\overline{A}\\,\\overline{B}$.",
    hint: "AB + A'B'."
  },
  {
    id: 3,
    question: "Which logic gate produces HIGH output when its inputs are DIFFERENT and LOW when they are IDENTICAL?",
    options: [
      "XNOR Gate",
      "XOR Gate",
      "AND Gate",
      "NOR Gate"
    ],
    correctAnswer: 1,
    explanation: "An XOR gate is an inequality detector: it yields 1 only when inputs differ ($0,1$ or $1,0$).",
    hint: "Exclusive OR = Inequality detector."
  },
  {
    id: 4,
    question: "Which logic gate is also known as the Coincidence Gate or Equivalence Detector?",
    options: [
      "XOR Gate",
      "XNOR Gate",
      "NAND Gate",
      "OR Gate"
    ],
    correctAnswer: 1,
    explanation: "An XNOR gate is called a Coincidence / Equivalence gate because it outputs 1 when both inputs coincide in value ($0,0$ or $1,1$).",
    hint: "Equivalence = XNOR."
  },
  {
    id: 5,
    question: "In a binary Half Adder circuit, which logic gate generates the SUM bit?",
    options: [
      "AND Gate",
      "OR Gate",
      "XOR Gate",
      "NAND Gate"
    ],
    correctAnswer: 2,
    explanation: "Binary single-bit addition: $0+0=0, 0+1=1, 1+0=1, 1+1=0$ (sum bit with carry 1). This matches the XOR truth table ($Sum = A \\oplus B$).",
    hint: "Sum = A ⊕ B."
  },
  {
    id: 6,
    question: "In a binary Half Adder circuit, which logic gate generates the CARRY bit?",
    options: [
      "AND Gate",
      "OR Gate",
      "XOR Gate",
      "NOR Gate"
    ],
    correctAnswer: 0,
    explanation: "A carry bit is produced only when both $A=1$ and $B=1$ ($1+1=10_2$). This is computed by an AND gate ($Carry = A \\cdot B$).",
    hint: "Carry = A . B."
  },
  {
    id: 7,
    question: "What is the value of the Boolean identity: A ⊕ 0?",
    options: [
      "0",
      "1",
      "A",
      "A'"
    ],
    correctAnswer: 2,
    explanation: "$A \\oplus 0 = A' \\cdot 0 + A \\cdot 0' = 0 + A \\cdot 1 = A$. XOR with 0 passes the signal unchanged.",
    hint: "A ⊕ 0 = A."
  },
  {
    id: 8,
    question: "What is the value of the Boolean identity: A ⊕ 1?",
    options: [
      "0",
      "1",
      "A",
      "A'"
    ],
    correctAnswer: 3,
    explanation: "$A \\oplus 1 = A' \\cdot 1 + A \\cdot 1' = A' + A \\cdot 0 = A'$. XOR with 1 acts as a controlled inverter.",
    hint: "A ⊕ 1 = A'."
  },
  {
    id: 9,
    question: "What is the value of the Boolean identity: A ⊕ A?",
    options: [
      "0",
      "1",
      "A",
      "2A"
    ],
    correctAnswer: 0,
    explanation: "$A \\oplus A = A'A + AA' = 0 + 0 = 0$. XORing any variable with itself always produces 0.",
    hint: "Identical inputs yield 0 in XOR."
  },
  {
    id: 10,
    question: "What is the value of the Boolean identity: A ⊕ A'?",
    options: [
      "0",
      "1",
      "A",
      "A'"
    ],
    correctAnswer: 1,
    explanation: "$A \\oplus A' = A'(A') + A(A')' = A' + A = 1$. The inputs are always different, so XOR outputs 1.",
    hint: "Complementary inputs always yield 1."
  },
  {
    id: 11,
    question: "What is the standard TTL 7400-series IC number for a Quad 2-Input XOR gate?",
    options: [
      "IC 7408",
      "IC 7432",
      "IC 7486",
      "IC 7400"
    ],
    correctAnswer: 2,
    explanation: "IC 7486 is the standard TTL integrated circuit containing four independent 2-input XOR gates.",
    hint: "7486 is the XOR IC."
  },
  {
    id: 12,
    question: "What is the standard TTL 7400-series IC number for a Quad 2-Input XNOR gate?",
    options: [
      "IC 7402",
      "IC 7404",
      "IC 7486",
      "IC 74266"
    ],
    correctAnswer: 3,
    explanation: "IC 74266 is the standard Quad 2-input XNOR gate TTL integrated circuit.",
    hint: "74266 is the XNOR IC."
  },
  {
    id: 13,
    question: "What is the output of a 3-variable XOR gate Y = A ⊕ B ⊕ C when A = 1, B = 1, C = 1?",
    options: [
      "0",
      "1",
      "2",
      "Undefined"
    ],
    correctAnswer: 1,
    explanation: "Step 1: $1 \\oplus 1 = 0$. Step 2: $0 \\oplus 1 = 1$. (Odd parity: There are three 1s, which is an odd number, yielding 1).",
    hint: "Odd number of 1s produces 1."
  },
  {
    id: 14,
    question: "What is the output of a 3-variable XOR gate Y = A ⊕ B ⊕ C when A = 1, B = 1, C = 0?",
    options: [
      "0",
      "1",
      "Undefined",
      "2"
    ],
    correctAnswer: 0,
    explanation: "Step 1: $1 \\oplus 1 = 0$. Step 2: $0 \\oplus 0 = 0$. (Even parity: There are two 1s, which is an even number, yielding 0).",
    hint: "Even number of 1s produces 0."
  },
  {
    id: 15,
    question: "Which of the following circuits can act as a Controlled Inverter (passing signal unchanged when Control=0 and inverting signal when Control=1)?",
    options: [
      "OR Gate",
      "AND Gate",
      "XOR Gate",
      "NOR Gate"
    ],
    correctAnswer: 2,
    explanation: "An XOR gate where one pin is `Control` and other is `Signal` has $Y = Signal \\oplus Control$. If Control=0, $Y = Signal$. If Control=1, $Y = Signal'$.",
    hint: "XOR acts as a programmable inverter."
  },
  {
    id: 16,
    question: "In Python, which operator evaluates the bitwise XOR between two integers?",
    options: [
      "**",
      "^",
      "xor",
      "<>"
    ],
    correctAnswer: 1,
    explanation: "In Python, the caret operator `^` computes bitwise XOR (e.g. `5 ^ 3` computes `101_2 ^ 011_2 = 110_2 = 6`).",
    hint: "The caret symbol ^."
  },
  {
    id: 17,
    question: "What is the graphic symbol distinction of an XOR gate compared to an OR gate?",
    options: [
      "An XOR gate has an extra curved arch line on the input side before the curved body",
      "An XOR gate has a square body",
      "An XOR gate has no output line",
      "An XOR gate is shaped like a circle"
    ],
    correctAnswer: 0,
    explanation: "An XOR gate schematic symbol features a distinct supplementary curved arch line separated from the concave input boundary of the OR gate shape.",
    hint: "Double curved line on input side."
  },
  {
    id: 18,
    question: "How many 2-input NAND gates are required to construct an XOR gate?",
    options: [
      "2 NAND Gates",
      "3 NAND Gates",
      "4 NAND Gates",
      "5 NAND Gates"
    ],
    correctAnswer: 2,
    explanation: "An optimal 2-input XOR circuit requires exactly 4 NAND gates.",
    hint: "4 NAND gates."
  },
  {
    id: 19,
    question: "How many 2-input NOR gates are required to construct an XNOR gate?",
    options: [
      "2 NOR Gates",
      "3 NOR Gates",
      "4 NOR Gates",
      "5 NOR Gates"
    ],
    correctAnswer: 2,
    explanation: "An optimal 2-input XNOR circuit requires exactly 4 NOR gates.",
    hint: "4 NOR gates."
  },
  {
    id: 20,
    question: "What is the dual of the XOR expression A'B + AB'?",
    options: [
      "(A' + B)(A + B')",
      "AB + A'B'",
      "A + B",
      "A' · B'"
    ],
    correctAnswer: 0,
    explanation: "Applying the Duality principle (replacing AND with OR, and OR with AND): $A'B + AB'$ becomes $(A' + B) \\cdot (A + B')$. Multiplying this out yields $A'A + A'B' + BA + BB' = AB + A'B'$ (which is the XNOR function!).",
    hint: "Dual of XOR expands to XNOR."
  },
  {
    id: 21,
    question: "In data transmission, what is the purpose of an Even Parity generator built with XOR gates?",
    options: [
      "To compress data by 50%",
      "To generate a parity bit such that the total count of 1s in the transmitted frame is always even, enabling single-bit error detection",
      "To encrypt data using RSA algorithm",
      "To convert digital data to analog audio"
    ],
    correctAnswer: 1,
    explanation: "An even parity generator sets the parity bit such that total 1s in (Data + Parity) is even. If any single bit flips during transmission, the receiver detects the error.",
    hint: "Error detection by counting 1s."
  },
  {
    id: 22,
    question: "If A = 1 and B = 1, what is the output of an XNOR gate?",
    options: [
      "0",
      "1",
      "Undefined",
      "2"
    ],
    correctAnswer: 1,
    explanation: "For an XNOR gate: $Y = (1 \\cdot 1) + (1' \\cdot 1') = 1 + (0 \\cdot 0) = 1 + 0 = 1$.",
    hint: "Both inputs 1 -> XNOR is 1."
  },
  {
    id: 23,
    question: "If A = 0 and B = 1, what is the output of an XNOR gate?",
    options: [
      "1",
      "0",
      "Undefined",
      "-1"
    ],
    correctAnswer: 1,
    explanation: "For an XNOR gate: inputs are different (0 and 1), so output is 0.",
    hint: "Different inputs -> XNOR is 0."
  },
  {
    id: 24,
    question: "What is the output of (A ⊕ B) ⊕ B equal to?",
    options: [
      "0",
      "1",
      "A",
      "B"
    ],
    correctAnswer: 2,
    explanation: "By Associativity and the Self-Cancellation property: $(A \\oplus B) \\oplus B = A \\oplus (B \\oplus B) = A \\oplus 0 = A$. (This is the fundamental principle of XOR encryption/decryption!).",
    hint: "B ⊕ B cancels to 0."
  },
  {
    id: 25,
    question: "Why is the XOR operation widely used in symmetric stream ciphers and cryptography?",
    options: [
      "Because XOR is a non-linear quantum function",
      "Because XOR is perfectly self-reversible: (Message ⊕ Key) ⊕ Key = Message, with zero statistical bias",
      "Because XOR requires no arithmetic CPU registers",
      "Because XOR gates run at 100 GHz"
    ],
    correctAnswer: 1,
    explanation: "Applying the identical key with XOR twice reconstructs the plaintext: $(M \\oplus K) \\oplus K = M \\oplus (K \\oplus K) = M \\oplus 0 = M$, creating an ideal fast symmetric cipher.",
    hint: "Reversible encryption property."
  }
];

export default questions;
