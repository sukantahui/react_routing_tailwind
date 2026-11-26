// Topic 40 FAQs - 25 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is a Scaled-Down Multiplexer implementation (Textbook Section 2.3.4B)?",
    "answer": "Implementing a Boolean function using a multiplexer smaller than 2^(n-1):1 (e.g. using a 2:1 MUX for 3 variables) by factoring out variables.",
    "explanation": "When smaller MUXes are used, fewer selection lines are available. The remaining multiple residual variables form sub-functions realized with external gates."
  },
  {
    "id": 2,
    "question": "How many selection lines does a 2:1 MUX have and how many variables can it control?",
    "answer": "A 2:1 MUX has exactly 1 selection line (2^1 = 2) and controls 1 selection variable.",
    "explanation": "For a 3-variable function F(a, b, c), choosing 1 variable for S0 leaves 2 variables to be handled at each data input."
  },
  {
    "id": 3,
    "question": "In the textbook example F(a, b, c) = ab + b'c' + c'a', which variable is chosen for the selection line?",
    "answer": "Variable 'a' is chosen as the selection line (S0 = a).",
    "explanation": "This allows factoring the expression into terms multiplied by 'a' and terms multiplied by 'a''."
  },
  {
    "id": 4,
    "question": "What are the two active conditions on selection line S0 = a?",
    "answer": "When a = 0 (a' is active), output F = I0; when a = 1 (a is active), output F = I1.",
    "explanation": "The multiplexer equation is F = S0' · I0 + S0 · I1 = a' · I0 + a · I1."
  },
  {
    "id": 5,
    "question": "Show the algebraic step to expand the middle term b'c' in F = ab + b'c' + c'a'.",
    "answer": "Multiply b'c' by (a + a'): b'c' = (a + a')b'c' = ab'c' + a'b'c'.",
    "explanation": "Because (a + a') = 1, multiplying by 1 does not alter the Boolean value but exposes the 'a' and 'a'' factors."
  },
  {
    "id": 6,
    "question": "Show how terms are grouped by 'a' and 'a'' in F = ab + ab'c' + a'b'c' + a'c'.",
    "answer": "F = a(b + b'c') + a'(b'c' + c').",
    "explanation": "Factoring 'a' from the first two terms and 'a'' from the last two terms isolates the two input sub-functions."
  },
  {
    "id": 7,
    "question": "How is the factor (b + b'c') simplified using Boolean absorption laws?",
    "answer": "b + b'c' = (b + b')(b + c') = (1)(b + c') = b + c'.",
    "explanation": "The distributive rule eliminates the complemented literal b'."
  },
  {
    "id": 8,
    "question": "How is the factor (b'c' + c') simplified?",
    "answer": "b'c' + c' = c'(b' + 1) = c'(1) = c'.",
    "explanation": "By the dominance identity (1 + X = 1), factoring c' leaves c' · 1 = c'."
  },
  {
    "id": 9,
    "question": "What is the final factored expression of F(a, b, c) in terms of selection variable 'a'?",
    "answer": "F = a(b + c') + a'(c') = a' · (c') + a · (b + c').",
    "explanation": "Matching this to F = S0' · I0 + S0 · I1 reveals the exact required data inputs."
  },
  {
    "id": 10,
    "question": "What are the inputs applied to I0 and I1 of the 2:1 MUX?",
    "answer": "I0 = c' and I1 = b + c'.",
    "explanation": "Input I0 connects to inverted literal c'; input I1 connects to an external OR gate receiving b and c'."
  },
  {
    "id": 11,
    "question": "What external logic gate is needed to realize input I1 = b + c'?",
    "answer": "A 2-input OR gate.",
    "explanation": "The OR gate accepts variable b on one input and literal c' on the other input, feeding its output into pin I1."
  },
  {
    "id": 12,
    "question": "What is the trade-off of using a Scaled-Down MUX versus a standard 4:1 MUX?",
    "answer": "A scaled-down MUX uses a smaller multiplexer but requires external logic gates (e.g. OR gate) at its data inputs.",
    "explanation": "A standard 4:1 MUX requires zero external gates; a scaled-down 2:1 MUX requires an external OR gate and inverter."
  },
  {
    "id": 13,
    "question": "What is Shannon's Expansion Theorem basis for scaled-down multiplexer design?",
    "answer": "F(x1, x2, ..., xn) = x1' · F(0, x2, ..., xn) + x1 · F(1, x2, ..., xn).",
    "explanation": "Shannon's theorem proves that any Boolean function can be decomposed around any arbitrary selection variable."
  },
  {
    "id": 14,
    "question": "How does the circuit behave when a=1, b=0, c=1 in the scaled-down 2:1 MUX circuit?",
    "answer": "Output F = 0.",
    "explanation": "When a=1, S0 selects I1 = b + c'. Since b=0 and c=1 (c'=0), I1 = 0 + 0 = 0. Output F = 0."
  },
  {
    "id": 15,
    "question": "What diagrams must be drawn in an ISC examination question on Scaled-Down Multiplexers?",
    "answer": "The step-by-step algebraic factoring proof, definition of inputs I0 and I1, and the circuit diagram showing 2:1 MUX and the external OR gate (Fig 2.26).",
    "explanation": "Full credit requires showing how the Boolean expression was factored and drawing the gate connected to the MUX input."
  },
  {
    "id": 16,
    "question": "What is a 'Scaled-Down Multiplexer' implementation?",
    "answer": "Realizing an n-variable Boolean function using a multiplexer with fewer than 2^(n-1) inputs (e.g. realizing a 3-variable function using a 2-to-1 MUX).",
    "explanation": "Requires factoring the Boolean expression into sub-functions applied to the MUX data inputs."
  },
  {
    "id": 17,
    "question": "How does Shannon's Expansion Theorem enable scaled-down MUX implementations?",
    "answer": "F(A, B, C) = A' · F(0, B, C) + A · F(1, B, C). A 2:1 MUX with select line S=A routes sub-function F0(B,C) to input 0 and F1(B,C) to input 1.",
    "explanation": "Decomposes a 3-variable problem into two 2-variable sub-problems."
  },
  {
    "id": 18,
    "question": "For F(A, B, C) = A'B + AC, how is this realized using a single 2-to-1 MUX?",
    "answer": "Connect select line S = A; connect Data Input I0 = B; connect Data Input I1 = C. Output Y = A'B + AC = F.",
    "explanation": "Zero external gates required; directly maps to Y = S'I0 + SI1."
  },
  {
    "id": 19,
    "question": "How can a 3-input XOR gate F = A ⊕ B ⊕ C be implemented with a 2-to-1 MUX?",
    "answer": "Select line S = A; Input I0 = B ⊕ C; Input I1 = (B ⊕ C)'. Output Y = A'(B ⊕ C) + A(B ⊕ C)' = A ⊕ B ⊕ C.",
    "explanation": "Uses one 2:1 MUX and external gates for the 2-variable sub-functions."
  },
  {
    "id": 20,
    "question": "What is the trade-off in using scaled-down multiplexers?",
    "answer": "Reduces MUX pin count and size, but may require external discrete gates to synthesize the complex sub-functions feeding inputs I0 and I1.",
    "explanation": "Balance between multiplexer size and external glue logic."
  },
  {
    "id": 21,
    "question": "How is an 8-variable function decomposed in modern FPGA architectures?",
    "answer": "FPGAs use 4-input or 6-input LUTs (multiplexers) cascaded via dedicated carry and expansion multiplexers (e.g. MUXF7, MUXF8).",
    "explanation": "Applies recursive Shannon decomposition in commercial FPGA synthesis."
  },
  {
    "id": 22,
    "question": "What is the algebraic factoring step for F(A, B, C) = Σ(1, 2, 4, 7)?",
    "answer": "F = A'(B'C + BC') + A(B'C' + BC) = A'(B ⊕ C) + A(B ⊙ C). Feed (B ⊕ C) to I0 and (B ⊙ C) to I1 of a 2:1 MUX with select line A.",
    "explanation": "Factoring out A' and A reveals the sub-functions."
  },
  {
    "id": 23,
    "question": "Can any 3-variable function be realized using a 2-to-1 MUX?",
    "answer": "Yes, by Shannon expansion with respect to any variable, provided appropriate sub-functions are applied to inputs I0 and I1.",
    "explanation": "Universal algebraic decomposition."
  },
  {
    "id": 24,
    "question": "What is the propagation delay of a scaled-down MUX circuit?",
    "answer": "Max delay = max(delay of sub-function logic on I0, I1) + t_2:1_MUX.",
    "explanation": "Sum of sub-circuit delay and multiplexer switching latency."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE question format for Scaled-Down Multiplexers?",
    "answer": "Decompose a given 3-variable function using Shannon's Expansion Theorem and draw its implementation using a 2-to-1 MUX and minimal discrete gates.",
    "explanation": "An advanced 4-mark problem for high-scoring students in ISC Class 12."
  }
];

export default faqs;
