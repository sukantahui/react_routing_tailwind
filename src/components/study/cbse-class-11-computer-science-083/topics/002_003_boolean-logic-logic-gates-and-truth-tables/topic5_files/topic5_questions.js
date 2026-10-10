const questions = [
  {
    id: 1,
    question: "How many distinct rows will exist in the truth table of a 3-variable Boolean function F(X, Y, Z)?",
    options: [
      "6 rows",
      "8 rows",
      "9 rows",
      "16 rows"
    ],
    correctAnswer: 1,
    explanation: "For n binary variables, the number of input states is $2^n$. For 3 variables: $2^3 = 8$ rows.",
    hint: "2 to the power of 3."
  },
  {
    id: 2,
    question: "How many total rows are required for a 4-variable truth table F(A, B, C, D)?",
    options: [
      "8 rows",
      "12 rows",
      "16 rows",
      "32 rows"
    ],
    correctAnswer: 2,
    explanation: "For 4 variables: $2^4 = 16$ combinations (0000 to 1111).",
    hint: "2 to the power of 4."
  },
  {
    id: 3,
    question: "What is a Boolean expression called if its truth table output column contains exclusively 1s for all input combinations?",
    options: [
      "Fallacy",
      "Tautology",
      "Contingency",
      "Minterm"
    ],
    correctAnswer: 1,
    explanation: "A Tautology is a proposition or compound Boolean formula that is universally True (evaluates to 1) for every conceivable input state.",
    hint: "Universally True = Tautology."
  },
  {
    id: 4,
    question: "What is a Boolean expression called if its truth table output column contains exclusively 0s for all input combinations?",
    options: [
      "Tautology",
      "Fallacy / Contradiction",
      "Contingency",
      "Maxterm"
    ],
    correctAnswer: 1,
    explanation: "A Fallacy (or Contradiction) is a Boolean formula that is universally False (evaluates to 0) for all possible input combinations.",
    hint: "Universally False = Fallacy / Contradiction."
  },
  {
    id: 5,
    question: "What is a Boolean expression called if its truth table contains a mixture of both 1s and 0s?",
    options: [
      "Tautology",
      "Contingency",
      "Contradiction",
      "Idempotent"
    ],
    correctAnswer: 1,
    explanation: "A Contingency is a logical formula whose truth value is contingent upon the specific truth values of its constituent variables.",
    hint: "Neither always True nor always False."
  },
  {
    id: 6,
    question: "The method of proving a Boolean theorem by exhaustively comparing the truth table columns of LHS and RHS is called:",
    options: [
      "Method of Mathematical Induction",
      "Method of Perfect Induction",
      "Duality Method",
      "K-Map Minimization"
    ],
    correctAnswer: 1,
    explanation: "The Method of Perfect Induction involves constructing the complete truth table for both sides of the identity and verifying row-by-row equivalence across all $2^n$ combinations.",
    hint: "Perfect Induction uses truth tables."
  },
  {
    id: 7,
    question: "In a 3-variable truth table (A, B, C), what binary combination corresponds to decimal minterm m5?",
    options: [
      "1 0 1",
      "0 1 1",
      "1 1 0",
      "1 1 1"
    ],
    correctAnswer: 0,
    explanation: "Decimal 5 in 3-bit binary is $101_2$ ($A=1, B=0, C=1$).",
    hint: "Convert 5 to binary: 4 + 1 = 101."
  },
  {
    id: 8,
    question: "In a 3-variable truth table (A, B, C), what binary combination corresponds to decimal minterm m3?",
    options: [
      "0 0 1",
      "0 1 1",
      "1 0 0",
      "1 1 0"
    ],
    correctAnswer: 1,
    explanation: "Decimal 3 in 3-bit binary is $011_2$ ($A=0, B=1, C=1$).",
    hint: "Convert 3 to binary: 2 + 1 = 011."
  },
  {
    id: 9,
    question: "In a 4-variable truth table (A, B, C, D), how many zeros and ones appear in the Most Significant Bit (Column A)?",
    options: [
      "4 zeros followed by 4 ones",
      "8 zeros followed by 8 ones",
      "2 zeros, 2 ones repeated",
      "Alternating 0 and 1"
    ],
    correctAnswer: 1,
    explanation: "In a 16-row table, column A has $16 / 2 = 8$ zeros followed by 8 ones.",
    hint: "Half zeros, half ones (8 of each)."
  },
  {
    id: 10,
    question: "In a 4-variable truth table (A, B, C, D), how often does the Least Significant Bit (Column D) alternate?",
    options: [
      "Every 8 rows",
      "Every 4 rows",
      "Every 2 rows",
      "Every single row (alternating 0, 1, 0, 1...)"
    ],
    correctAnswer: 3,
    explanation: "The LSB always alternates on every row: 0, 1, 0, 1, 0, 1...",
    hint: "LSB changes on every row."
  },
  {
    id: 11,
    question: "What is the evaluated output of F(A, B) = A + A' for all input combinations?",
    options: [
      "Always 0",
      "Always 1 (Tautology)",
      "0 for A=0, 1 for A=1",
      "1 for A=0, 0 for A=1"
    ],
    correctAnswer: 1,
    explanation: "When $A=0$, $0 + 0' = 0 + 1 = 1$. When $A=1$, $1 + 1' = 1 + 0 = 1$. It is a Tautology.",
    hint: "A + A' is always 1."
  },
  {
    id: 12,
    question: "What is the evaluated output of F(A, B) = A · A' for all input combinations?",
    options: [
      "Always 1 (Tautology)",
      "Always 0 (Fallacy / Contradiction)",
      "0 for A=0, 1 for A=1",
      "Undefined"
    ],
    correctAnswer: 1,
    explanation: "When $A=0$, $0 \\cdot 1 = 0$. When $A=1$, $1 \\cdot 0 = 0$. It is a Fallacy / Contradiction.",
    hint: "A . A' is always 0."
  },
  {
    id: 13,
    question: "For F(A, B, C) = A'BC + AB'C + ABC, for which input combinations does F evaluate to 1?",
    options: [
      "(0,1,1), (1,0,1), (1,1,1)",
      "(0,0,0), (1,1,0), (1,1,1)",
      "(0,0,1), (0,1,0), (1,0,0)",
      "(1,1,1) only"
    ],
    correctAnswer: 0,
    explanation: "Term 1 ($A'BC$) is 1 for $(0,1,1)$; Term 2 ($AB'C$) is 1 for $(1,0,1)$; Term 3 ($ABC$) is 1 for $(1,1,1)$.",
    hint: "Uncomplemented=1, Complemented=0."
  },
  {
    id: 14,
    question: "Why should intermediate columns be included when constructing a truth table in an exam?",
    options: [
      "They make the paper look colorful",
      "They prevent calculation mistakes by breaking down composite terms step-by-step and provide marking points for partial credit",
      "They are mandatory for Python execution",
      "They reduce the number of rows"
    ],
    correctAnswer: 1,
    explanation: "Intermediate sub-term columns allow systematic evaluation, prevent mental arithmetic errors, and earn step-marking in CBSE board evaluation.",
    hint: "Step-by-step clarity guarantees accuracy."
  },
  {
    id: 15,
    question: "If a Boolean function with 3 variables outputs 1 for all rows EXCEPT row (0,0,0), what is the function?",
    options: [
      "Y = A · B · C",
      "Y = A + B + C",
      "Y = (A + B + C)'",
      "Y = A' · B' · C'"
    ],
    correctAnswer: 1,
    explanation: "A 3-input OR gate ($A + B + C$) outputs 0 only when $A=0, B=0, C=0$, and outputs 1 for all other 7 combinations.",
    hint: "3-input OR gate."
  },
  {
    id: 16,
    question: "If a Boolean function with 3 variables outputs 1 ONLY for row (1,1,1) and 0 for all other 7 rows, what is the function?",
    options: [
      "Y = A + B + C",
      "Y = A · B · C",
      "Y = (A · B · C)'",
      "Y = A' + B' + C'"
    ],
    correctAnswer: 1,
    explanation: "A 3-input AND gate ($A \\cdot B \\cdot C$) outputs 1 only when all inputs are 1 ($1,1,1$).",
    hint: "3-input AND gate."
  },
  {
    id: 17,
    question: "How many input combinations exist for a Boolean function with 5 variables?",
    options: [
      "10",
      "25",
      "32",
      "64"
    ],
    correctAnswer: 2,
    explanation: "$2^5 = 32$ rows.",
    hint: "2^5 = 32."
  },
  {
    id: 18,
    question: "In standard SOP (Sum of Products) notation, how is row 6 ($A=1, B=1, C=0$) represented as a minterm?",
    options: [
      "ABC",
      "ABC'",
      "A'B'C",
      "A + B + C'"
    ],
    correctAnswer: 1,
    explanation: "For a minterm: uncomplemented for 1 ($A, B$), complemented for 0 ($C'$). Thus minterm $m_6 = AB\\overline{C}$.",
    hint: "A=1, B=1, C=0 -> A B C'."
  },
  {
    id: 19,
    question: "In standard POS (Product of Sums) notation, how is row 6 ($A=1, B=1, C=0$) represented as a maxterm?",
    options: [
      "A' + B' + C",
      "A + B + C'",
      "ABC'",
      "A'B'C"
    ],
    correctAnswer: 0,
    explanation: "For a maxterm: complemented for 1 ($A', B'$), uncomplemented for 0 ($C$). Thus maxterm $M_6 = A' + B' + C$.",
    hint: "In Maxterm, 1 becomes complement (A'+B'+C)."
  },
  {
    id: 20,
    question: "What is the truth table result of evaluating A + 1 for both A=0 and A=1?",
    options: [
      "0, 0",
      "1, 1 (Tautology)",
      "0, 1",
      "1, 0"
    ],
    correctAnswer: 1,
    explanation: "$0 + 1 = 1$, and $1 + 1 = 1$. The output is always 1.",
    hint: "Boundedness law for OR."
  },
  {
    id: 21,
    question: "What is the truth table result of evaluating A · 0 for both A=0 and A=1?",
    options: [
      "0, 0 (Fallacy)",
      "1, 1",
      "0, 1",
      "1, 0"
    ],
    correctAnswer: 0,
    explanation: "$0 \\cdot 0 = 0$, and $1 \\cdot 0 = 0$. The output is always 0.",
    hint: "Boundedness law for AND."
  },
  {
    id: 22,
    question: "Evaluate F(A, B) = A ⊕ B for inputs (0,0), (0,1), (1,0), (1,1). The output column is:",
    options: [
      "0, 0, 0, 1",
      "0, 1, 1, 1",
      "0, 1, 1, 0",
      "1, 0, 0, 1"
    ],
    correctAnswer: 2,
    explanation: "XOR outputs 1 for different inputs ($01, 10$) and 0 for same inputs ($00, 11$). Column is 0, 1, 1, 0.",
    hint: "0 1 1 0."
  },
  {
    id: 23,
    question: "Evaluate F(A, B) = A ⊙ B (XNOR) for inputs (0,0), (0,1), (1,0), (1,1). The output column is:",
    options: [
      "0, 1, 1, 0",
      "1, 0, 0, 1",
      "1, 1, 1, 0",
      "1, 0, 0, 0"
    ],
    correctAnswer: 1,
    explanation: "XNOR outputs 1 for matching inputs ($00, 11$) and 0 for different inputs ($01, 10$). Column is 1, 0, 0, 1.",
    hint: "1 0 0 1."
  },
  {
    id: 24,
    question: "When proving that (A + B) + C = A + (B + C) by Perfect Induction, how many rows must match between the two sides?",
    options: [
      "4 rows",
      "8 rows",
      "16 rows",
      "3 rows"
    ],
    correctAnswer: 1,
    explanation: "Because there are 3 distinct variables (A, B, C), all $2^3 = 8$ rows of the LHS column must match the RHS column.",
    hint: "All 8 rows for 3 variables."
  },
  {
    id: 25,
    question: "In Python, which standard library tool generates Cartesian product combinations for truth tables?",
    options: [
      "math.factorial",
      "itertools.product",
      "collections.Counter",
      "os.listdir"
    ],
    correctAnswer: 1,
    explanation: "`itertools.product([0, 1], repeat=n)` systematically generates all $2^n$ binary combinations for n variables.",
    hint: "itertools.product."
  }
];

export default questions;
