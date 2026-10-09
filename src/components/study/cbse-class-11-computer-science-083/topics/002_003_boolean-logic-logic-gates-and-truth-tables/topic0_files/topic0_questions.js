const questions = [
  {
    id: 1,
    question: "Which of the following logic gates produces an output of 1 (HIGH) ONLY when ALL its inputs are 1?",
    options: ["OR Gate", "AND Gate", "NOR Gate", "XOR Gate"],
    correctAnswer: 1,
    explanation: "An AND gate outputs 1 (True) if and only if all input signals are 1 (True). If any input is 0, the output is 0.",
    hint: "Boolean multiplication: Y = A . B."
  },
  {
    id: 2,
    question: "Which logic gate outputs 0 (LOW) ONLY when both inputs are 0?",
    options: ["AND Gate", "OR Gate", "NAND Gate", "XNOR Gate"],
    correctAnswer: 1,
    explanation: "An OR gate performs logical addition ($Y = A + B$). It produces an output of 0 only when both inputs are 0; otherwise it outputs 1.",
    hint: "Boolean addition: Y = A + B."
  },
  {
    id: 3,
    question: "Which pair of logic gates are known as 'Universal Gates' in digital electronics?",
    options: [
      "AND and OR Gates",
      "NAND and NOR Gates",
      "XOR and XNOR Gates",
      "NOT and Buffer Gates"
    ],
    correctAnswer: 1,
    explanation: "NAND and NOR gates are called Universal Gates because any other boolean logic function (AND, OR, NOT, XOR, XNOR) can be implemented using only NAND gates or only NOR gates.",
    hint: "NAND and NOR can construct any digital circuit."
  },
  {
    id: 4,
    question: "What is the output equation of an XOR (Exclusive-OR) gate for two inputs A and B?",
    options: [
      "Y = A . B",
      "Y = A + B",
      "Y = A'B + AB'",
      "Y = AB + A'B'"
    ],
    correctAnswer: 2,
    explanation: "An XOR gate ($A \\oplus B$) outputs 1 when the inputs are different ($A \\neq B$). Its Boolean algebraic expansion is $Y = \\overline{A}B + A\\overline{B}$.",
    hint: "A'B + AB' represents Exclusive OR."
  },
  {
    id: 5,
    question: "What is the first De Morgan's Law?",
    options: [
      "(A . B)' = A' + B'",
      "(A + B)' = A' + B'",
      "(A . B)' = A' . B'",
      "(A')' = A"
    ],
    correctAnswer: 0,
    explanation: "De Morgan's First Law states that the complement of a product of variables equals the sum of their individual complements: $\\overline{A \\cdot B} = \\overline{A} + \\overline{B}$. (NAND = Bubbled OR).",
    hint: "Break the line, change the sign: (A.B)' = A' + B'."
  },
  {
    id: 6,
    question: "What is the second De Morgan's Law?",
    options: [
      "(A + B)' = A' . B'",
      "(A + B)' = A' + B'",
      "(A . B)' = A' . B'",
      "A + A' = 1"
    ],
    correctAnswer: 0,
    explanation: "De Morgan's Second Law states that the complement of a sum of variables equals the product of their individual complements: $\\overline{A + B} = \\overline{A} \\cdot \\overline{B}$. (NOR = Bubbled AND).",
    hint: "Complement of OR is product of complements: (A+B)' = A'.B'."
  },
  {
    id: 7,
    question: "According to Boolean Algebra, what is the value of A + 1?",
    options: ["A", "1", "0", "A + 1"],
    correctAnswer: 1,
    explanation: "By the Dominance (Annulment / Null) Law of OR operations, any variable ORed with 1 always evaluates to 1 ($A + 1 = 1$).",
    hint: "1 ORed with anything is 1."
  },
  {
    id: 8,
    question: "According to Boolean Algebra, what is the value of A . 0?",
    options: ["A", "1", "0", "A'"],
    correctAnswer: 2,
    explanation: "By the Dominance (Null) Law of AND operations, any variable ANDed with 0 always evaluates to 0 ($A \\cdot 0 = 0$).",
    hint: "0 ANDed with anything is 0."
  },
  {
    id: 9,
    question: "Which Boolean law is represented by the equation A + A = A?",
    options: [
      "Commutative Law",
      "Idempotent Law",
      "Associative Law",
      "Distributive Law"
    ],
    correctAnswer: 1,
    explanation: "The Idempotent Law states that combining a variable with itself under OR or AND yields the variable itself: $A + A = A$ and $A \\cdot A = A$.",
    hint: "Idempotent: repeating the operation has no extra effect."
  },
  {
    id: 10,
    question: "Which law is represented by the equation A + (B . C) = (A + B) . (A + C)?",
    options: [
      "Distributive Law of OR over AND",
      "Associative Law",
      "Absorption Law",
      "De Morgan's Law"
    ],
    correctAnswer: 0,
    explanation: "In Boolean algebra, OR distributes over AND: $A + (B \\cdot C) = (A + B) \\cdot (A + C)$, which has no equivalent in standard ordinary arithmetic.",
    hint: "Distributive law unique to Boolean algebra."
  },
  {
    id: 11,
    question: "What is the Boolean simplification of the expression A + A'B?",
    options: ["A + B", "A . B", "A", "B"],
    correctAnswer: 0,
    explanation: "Using the Distributive Law: $A + \\overline{A}B = (A + \\overline{A})(A + B) = 1 \\cdot (A + B) = A + B$.",
    hint: "Distribute A over the product: (A + A')(A + B) = 1 . (A + B) = A + B."
  },
  {
    id: 12,
    question: "What is the output of an XNOR (Exclusive-NOR) gate when inputs A = 1 and B = 1?",
    options: ["0", "1", "Indeterminate", "High Impedance"],
    correctAnswer: 1,
    explanation: "An XNOR gate (coincidence / equivalence detector) outputs 1 when both inputs are identical ($A = B$). Since both $A=1$ and $B=1$, the output is 1.",
    hint: "XNOR outputs 1 when inputs are equal."
  },
  {
    id: 13,
    question: "How many rows are present in the truth table of a Boolean function with 4 input variables (A, B, C, D)?",
    options: ["4", "8", "16", "32"],
    correctAnswer: 2,
    explanation: "A truth table with $n$ binary input variables contains $2^n$ unique input combinations. For $n=4$: $2^4 = 16$ rows.",
    hint: "Formula: 2 to the power of number of variables."
  },
  {
    id: 14,
    question: "What is the Involution (Double Negation) Law?",
    options: [
      "(A')' = A",
      "A + A' = 1",
      "A . A' = 0",
      "A + 0 = A"
    ],
    correctAnswer: 0,
    explanation: "The Involution Law states that complementing a boolean variable twice returns the original variable: $\\overline{\\overline{A}} = A$.",
    hint: "Double NOT cancels out: (A')' = A."
  },
  {
    id: 15,
    question: "Simplify the Boolean expression: A . (A + B)",
    options: ["A", "B", "A + B", "A . B"],
    correctAnswer: 0,
    explanation: "By the Absorption Law: $A \\cdot (A + B) = A \\cdot A + A \\cdot B = A + A \\cdot B = A(1 + B) = A(1) = A$.",
    hint: "Absorption Law: A . (A + B) = A."
  },
  {
    id: 16,
    question: "Which logic gate can be constructed by connecting both input terminals of a NAND gate together?",
    options: ["NOT Gate (Inverter)", "OR Gate", "AND Gate", "XOR Gate"],
    correctAnswer: 0,
    explanation: "Connecting both inputs of a 2-input NAND gate together ($A = B$) produces output $\\overline{A \\cdot A} = \\overline{A}$, which functions identically to a NOT gate (Inverter).",
    hint: "A NAND A = NOT A."
  },
  {
    id: 17,
    question: "What is the Duality Principle in Boolean Algebra?",
    options: [
      "Replacing all variables with their complements",
      "Changing every OR (+) to AND (.), every AND (.) to OR (+), every 0 to 1, and every 1 to 0 produces another valid Boolean relation",
      "Doubling the clock frequency of the processor",
      "Running two programs concurrently"
    ],
    correctAnswer: 1,
    explanation: "The Principle of Duality states that any valid Boolean identity remains valid if AND ($\cdot$) and OR ($+$) operators are swapped, and identity elements $0$ and $1$ are interchanged.",
    hint: "Swap + and ., and swap 0 and 1."
  },
  {
    id: 18,
    question: "What is the dual of the Boolean expression: A + 0 = A?",
    options: ["A . 1 = A", "A + 1 = 1", "A . 0 = 0", "A' + 1 = A'"],
    correctAnswer: 0,
    explanation: "To find the dual of $A + 0 = A$: replace $+$ with $\\cdot$ and $0$ with $1$. This gives $A \\cdot 1 = A$.",
    hint: "Change + to . and 0 to 1."
  },
  {
    id: 19,
    question: "What is the truth value of the Boolean expression: F(A, B) = A'B + AB' when A = 0, B = 1?",
    options: ["0", "1", "False", "Both A and C"],
    correctAnswer: 1,
    explanation: "$F(0, 1) = \\overline{0} \\cdot 1 + 0 \\cdot \\overline{1} = 1 \\cdot 1 + 0 \\cdot 0 = 1 + 0 = 1$.",
    hint: "A' is 1, so 1*1 + 0*0 = 1."
  },
  {
    id: 20,
    question: "In digital electronics, what is a Half Adder circuit composed of?",
    options: [
      "One XOR gate (for Sum) and one AND gate (for Carry)",
      "Two OR gates and one NOT gate",
      "One NAND gate and one NOR gate",
      "Three NOT gates"
    ],
    correctAnswer: 0,
    explanation: "A Half Adder adds two 1-bit binary numbers: Sum = $A \\oplus B$ (XOR Gate), Carry = $A \\cdot B$ (AND Gate).",
    hint: "Sum is XOR, Carry is AND."
  },
  {
    id: 21,
    question: "Which of the following Boolean expressions represents the Complementarity Law?",
    options: [
      "A + A' = 1 and A . A' = 0",
      "A + A = A",
      "A + 0 = A",
      "(A')' = A"
    ],
    correctAnswer: 0,
    explanation: "The Complement Law states that a variable ORed with its complement is 1 ($A + \\overline{A} = 1$), and a variable ANDed with its complement is 0 ($A \\cdot \\overline{A} = 0$).",
    hint: "A OR NOT A is 1; A AND NOT A is 0."
  },
  {
    id: 22,
    question: "What is the complement of the expression: F = A'B + CD'?",
    options: [
      "(A + B') . (C' + D)",
      "(A' + B) . (C + D')",
      "AB' + C'D",
      "A + B + C + D"
    ],
    correctAnswer: 0,
    explanation: "Applying De Morgan's Law to $\\overline{F} = \\overline{(\\overline{A}B + C\\overline{D})} = \\overline{(\\overline{A}B)} \\cdot \\overline{(C\\overline{D})} = (A + \\overline{B}) \\cdot (\\overline{C} + D)$.",
    hint: "Use De Morgan's laws: complement of sum is product of complements."
  },
  {
    id: 23,
    question: "Which logic gate has the graphical schematic symbol featuring a curved input edge and a pointed output nose with a small negation circle (bubble) at the output?",
    options: ["NOR Gate", "NAND Gate", "OR Gate", "AND Gate"],
    correctAnswer: 0,
    explanation: "A NOR gate consists of the curved OR gate symbol with an inversion bubble attached to its pointed output tip.",
    hint: "Curved input edge = OR; bubble at output = NOR."
  },
  {
    id: 24,
    question: "In Python, which operators perform bitwise Boolean logic operations on integer bit representations?",
    options: [
      "& (AND), | (OR), ~ (NOT), ^ (XOR)",
      "and, or, not",
      "+, -, *, /",
      "&&, ||, !"
    ],
    correctAnswer: 0,
    explanation: "In Python, bitwise operators on binary representations are `&` (Bitwise AND), `|` (Bitwise OR), `~` (Bitwise NOT), and `^` (Bitwise XOR).",
    hint: "Bitwise symbols: &, |, ~, ^."
  },
  {
    id: 25,
    question: "Case Study: Mahima is designing a security vault alarm circuit. The alarm (Y) must sound if the Master Key Switch (A) is ON (1) AND either the Infrared Sensor (B) OR the Pressure Sensor (C) triggers. What is the correct Boolean equation?",
    options: [
      "Y = A . (B + C)",
      "Y = A + B . C",
      "Y = (A + B) . C",
      "Y = A' . B . C"
    ],
    correctAnswer: 0,
    explanation: "The requirement 'A must be 1 AND (B OR C is 1)' translates directly into the Boolean product-of-sum: $Y = A \\cdot (B + C)$.",
    hint: "A AND (B OR C) -> A . (B + C)."
  }
];

export default questions;
