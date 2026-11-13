// Topic 21 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is the truth table of an active-HIGH 2-to-1 line multiplexer?",
    "answer": "When E=0, Y=0. When E=1: S=0 -> Y=I0; S=1 -> Y=I1.",
    "explanation": "With Enable active, Select bit S=0 routes input I0 to output Y, while S=1 routes input I1 to output Y."
  },
  {
    "id": 2,
    "question": "What is the Boolean expression for the output Y of a 2-to-1 multiplexer with inputs I0, I1, select S, and enable E?",
    "answer": "Y = E · (S' · I0 + S · I1).",
    "explanation": "When S=0, S'=1 and S=0, so Y = E · (1·I0 + 0·I1) = E·I0. When S=1, Y = E·I1."
  },
  {
    "id": 3,
    "question": "How many logic gates are required to construct a discrete 2-to-1 multiplexer without enable?",
    "answer": "One NOT gate, two 2-input AND gates, and one 2-input OR gate (total 4 gates).",
    "explanation": "The NOT gate produces S'. One AND gate computes S'·I0, the second computes S·I1, and the OR gate sums them."
  },
  {
    "id": 4,
    "question": "How can a 2-to-1 multiplexer implement an Inverter (NOT gate)?",
    "answer": "Set data inputs I0 = 1, I1 = 0, and connect variable A to the select line S.",
    "explanation": "Then Y = S'·I0 + S·I1 = A'·(1) + A·(0) = A'. The output is strictly the logical inverse of A."
  },
  {
    "id": 5,
    "question": "How can a 2-to-1 multiplexer implement a 2-input AND gate?",
    "answer": "Connect input variable A to select line S, set I0 = 0, and set I1 = B.",
    "explanation": "Then Y = A'·(0) + A·(B) = A · B, realizing a standard 2-input AND gate."
  },
  {
    "id": 6,
    "question": "How can a 2-to-1 multiplexer implement a 2-input OR gate?",
    "answer": "Connect variable A to select line S, set I0 = B, and set I1 = 1.",
    "explanation": "Then Y = A'·(B) + A·(1) = A'B + A = A + B (by absorption / distributive law)."
  },
  {
    "id": 7,
    "question": "How can a 2-to-1 multiplexer implement a 2-input XOR gate?",
    "answer": "Connect variable A to select line S, set I0 = B, and set I1 = B'.",
    "explanation": "Then Y = A'·(B) + A·(B') = A'B + AB' = A ⊕ B."
  },
  {
    "id": 8,
    "question": "How can a 2-to-1 multiplexer implement a 2-input XNOR gate?",
    "answer": "Connect variable A to select line S, set I0 = B', and set I1 = B.",
    "explanation": "Then Y = A'·(B') + A·(B) = A'B' + AB = (A ⊕ B)'."
  },
  {
    "id": 9,
    "question": "Can any 2-variable Boolean function be synthesized using a single 2-to-1 MUX?",
    "answer": "Yes, by connecting one variable to select line S and configuring I0 and I1 with {0, 1, second variable, or its complement}.",
    "explanation": "Shannon's decomposition proves that F(A, B) = A'·F(0, B) + A·F(1, B), where F(0, B) and F(1, B) can only evaluate to 0, 1, B, or B'."
  },
  {
    "id": 10,
    "question": "What is the industry-standard quad 2-to-1 multiplexer IC?",
    "answer": "The 74xx157 (74LS157 / 74HC157) quad 2-line to 1-line data selector/multiplexer.",
    "explanation": "It contains four independent 2-to-1 multiplexers sharing a common select line and common active-LOW strobe line in a 16-pin package."
  },
  {
    "id": 11,
    "question": "What happens when Enable E = 0 in an active-HIGH 2-to-1 multiplexer?",
    "answer": "The output Y is forced to 0 regardless of data inputs I0, I1 and select line S.",
    "explanation": "Because Enable is an ANDed factor on both product terms, E=0 zeroes both terms."
  },
  {
    "id": 12,
    "question": "Why are CMOS Transmission Gate (TG) multiplexers preferred over gate-level multiplexers in VLSI?",
    "answer": "A CMOS TG 2-to-1 MUX requires only 4 transistors (plus 2 for an inverter), compared to 14 transistors for an AND-OR-INVERT implementation.",
    "explanation": "Transmission gates provide bidirectional signal flow, ultra-low propagation delay (~0.5 ns), and minimal silicon footprint."
  },
  {
    "id": 13,
    "question": "How is a 2-to-1 multiplexer used in Arithmetic Logic Unit (ALU) design?",
    "answer": "To select between direct operand B and two's complement (-B) for addition vs. subtraction.",
    "explanation": "Setting select line S=0 feeds B into the adder; setting S=1 feeds B' (with carry-in=1) to perform two's complement subtraction."
  },
  {
    "id": 14,
    "question": "What is the nominal propagation delay through a 2-to-1 MUX expressed in gate delays?",
    "answer": "Two gate delays (one inverter delay if needed, plus one AND gate delay, plus one OR gate delay in parallel).",
    "explanation": "The inverted select signal propagates through the AND stage and OR stage in two successive gate levels."
  },
  {
    "id": 15,
    "question": "What common error do students commit when drawing a 2-to-1 MUX in ISC examinations?",
    "answer": "Connecting select line S directly to I0 and inverted S' to I1 instead of the correct convention.",
    "explanation": "By universal convention, S=0 selects I0 (which requires S') and S=1 selects I1 (which requires S)."
  }
];

export default faqs;
