// Topic 21 FAQs - 25 Comprehensive Questions and Answers
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
  },
  {
    "id": 16,
    "question": "What are the inputs and outputs of a 2-to-1 Multiplexer?",
    "answer": "2 Data inputs (I0, I1), 1 Select line (S), and 1 Output (Y).",
    "explanation": "When S = 0, Y = I0; when S = 1, Y = I1."
  },
  {
    "id": 17,
    "question": "What is the Boolean equation of a 2-to-1 Multiplexer?",
    "answer": "Y = S' · I0 + S · I1.",
    "explanation": "When S=0, S'=1, so Y = 1·I0 + 0·I1 = I0. When S=1, Y = 0·I0 + 1·I1 = I1."
  },
  {
    "id": 18,
    "question": "Draw the gate-level schematic requirements for a 2-to-1 MUX.",
    "answer": "One NOT gate (inverter for S), two 2-input AND gates (for S'I0 and SI1), and one 2-input OR gate to combine the products.",
    "explanation": "A standard two-level AND-OR structure."
  },
  {
    "id": 19,
    "question": "What is the Function Table of a 2-to-1 Multiplexer?",
    "answer": "S | Output Y : (0 → I0), (1 → I1).",
    "explanation": "A clean 2-row table specifying data routing."
  },
  {
    "id": 20,
    "question": "How can a 2-to-1 MUX be implemented using ONLY 2-input NAND gates?",
    "answer": "Using 4 NAND gates: Gate 1 inverts S; Gate 2 computes (I0 · S')'; Gate 3 computes (I1 · S)'; Gate 4 combines Gates 2 and 3 to produce Y.",
    "explanation": "This classic 4-NAND gate circuit is frequently tested in digital electronics."
  },
  {
    "id": 21,
    "question": "How can a 2-to-1 MUX be used as a NOT gate?",
    "answer": "Connect S = Input A, I0 = 1, and I1 = 0. Output Y = A' · 1 + A · 0 = A'.",
    "explanation": "Demonstrates that a multiplexer can implement basic logic gates."
  },
  {
    "id": 22,
    "question": "How can a 2-to-1 MUX be used as an AND gate?",
    "answer": "Connect S = Input A, I0 = 0, and I1 = Input B. Output Y = A' · 0 + A · B = AB.",
    "explanation": "When A=1, B is routed to output; when A=0, output is 0."
  },
  {
    "id": 23,
    "question": "How can a 2-to-1 MUX be used as an OR gate?",
    "answer": "Connect S = Input A, I0 = Input B, and I1 = 1. Output Y = A' · B + A · 1 = A'B + A = A + B.",
    "explanation": "By Boolean simplification, A + A'B = A + B."
  },
  {
    "id": 24,
    "question": "What commercial IC contains four independent 2-to-1 Multiplexers on a single die?",
    "answer": "IC 74157 (Quad 2-line to 1-line data selector/multiplexer).",
    "explanation": "Shares a common Select line and a common Strobe (Enable) line across all 4 internal multiplexers."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE question format for a 2-to-1 MUX?",
    "answer": "Write the logic equation, draw the Function Table, draw the logic circuit diagram using AND, OR, NOT gates, and explain data routing.",
    "explanation": "A standard 2-mark to 3-mark question testing fundamental data selection."
  }
];

export default faqs;
