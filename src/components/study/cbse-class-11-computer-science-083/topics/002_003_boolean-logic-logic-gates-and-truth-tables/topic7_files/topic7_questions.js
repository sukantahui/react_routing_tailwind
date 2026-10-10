const questions = [
  {
    id: 1,
    question: "State De Morgan's First Law in Boolean algebra.",
    options: [
      "(A + B)' = A' · B'",
      "(A · B)' = A' + B'",
      "(A + B)' = A + B",
      "(A · B)' = A · B"
    ],
    correctAnswer: 0,
    explanation: "De Morgan's First Law states: The complement of a Boolean sum is equal to the product of individual complements: $(A + B)' = \\overline{A} \\cdot \\overline{B}$.",
    hint: "Complement of sum = Product of complements."
  },
  {
    id: 2,
    question: "State De Morgan's Second Law in Boolean algebra.",
    options: [
      "(A + B)' = A' · B'",
      "(A · B)' = A' + B'",
      "(A · B)' = A' · B'",
      "A · B = A + B"
    ],
    correctAnswer: 1,
    explanation: "De Morgan's Second Law states: The complement of a Boolean product is equal to the sum of individual complements: $(A \\cdot B)' = \\overline{A} + \\overline{B}$.",
    hint: "Complement of product = Sum of complements."
  },
  {
    id: 3,
    question: "Which standard logic gate is functionally equivalent to a 'Bubbled OR' gate (an OR gate whose inputs are inverted)?",
    options: [
      "NOR Gate",
      "NAND Gate",
      "AND Gate",
      "XOR Gate"
    ],
    correctAnswer: 1,
    explanation: "By De Morgan's Second Law: $A' + B' = (A \\cdot B)'$. Hence, a Bubbled OR gate is identical to a NAND gate.",
    hint: "A' + B' = (AB)' -> NAND."
  },
  {
    id: 4,
    question: "Which standard logic gate is functionally equivalent to a 'Bubbled AND' gate (an AND gate whose inputs are inverted)?",
    options: [
      "NAND Gate",
      "NOR Gate",
      "OR Gate",
      "XNOR Gate"
    ],
    correctAnswer: 1,
    explanation: "By De Morgan's First Law: $A' \\cdot B' = (A + B)'$. Hence, a Bubbled AND gate is identical to a NOR gate.",
    hint: "A' . B' = (A+B)' -> NOR."
  },
  {
    id: 5,
    question: "In algebraic proof of De Morgan's laws, which two conditions must be proven for Y to be the complement of X?",
    options: [
      "X + Y = 0 and X · Y = 1",
      "X + Y = 1 and X · Y = 0",
      "X = Y and X' = Y'",
      "X + Y = X · Y"
    ],
    correctAnswer: 1,
    explanation: "According to Huntington's Complement Postulates, Y is the unique complement of X ($Y = X'$) if and only if $X + Y = 1$ (Tautology) and $X \\cdot Y = 0$ (Contradiction).",
    hint: "Sum must equal 1 and product must equal 0."
  },
  {
    id: 6,
    question: "What is the result of applying De Morgan's law to simplify ((A + B') · C)'?",
    options: [
      "(A + B')' + C' = A'B + C'",
      "A'B' + C'",
      "(A + B) · C'",
      "A' + B + C'"
    ],
    correctAnswer: 0,
    explanation: "Apply 2nd Law: $((A + B') \\cdot C)' = (A + B')' + C'$. Apply 1st Law to $(A + B')'$: $A' \\cdot (B')' = A'B$. Final result: $A'B + C'$.",
    hint: "Break the main product bar first, then break the inner sum bar."
  },
  {
    id: 7,
    question: "What is the 3-variable generalization of De Morgan's First Law: (X + Y + Z)'?",
    options: [
      "X' + Y' + Z'",
      "X' · Y' · Z'",
      "X · Y · Z",
      "(X · Y · Z)'"
    ],
    correctAnswer: 1,
    explanation: "Generalizing for n variables: $(X + Y + Z)' = X' \\cdot Y' \\cdot Z'$.",
    hint: "Complement of sum = product of complements."
  },
  {
    id: 8,
    question: "What is the 3-variable generalization of De Morgan's Second Law: (X · Y · Z)'?",
    options: [
      "X' + Y' + Z'",
      "X' · Y' · Z'",
      "X + Y + Z",
      "(X + Y + Z)'"
    ],
    correctAnswer: 0,
    explanation: "Generalizing for n variables: $(X \\cdot Y \\cdot Z)' = X' + Y' + Z'$.",
    hint: "Complement of product = sum of complements."
  },
  {
    id: 9,
    question: "What is the popular student mnemonic for applying De Morgan's Laws?",
    options: [
      "Multiply across, invert down",
      "Break the line, change the sign",
      "Add the bits, shift the carry",
      "Flip the clock, reset the latch"
    ],
    correctAnswer: 1,
    explanation: "'Break the line (overbar), change the sign (+ to · or · to +)' is the universal mnemonic for De Morgan's laws.",
    hint: "Break the line, change the sign."
  },
  {
    id: 10,
    question: "Simplify: (A' · B')'.",
    options: [
      "A + B",
      "A · B",
      "A' + B'",
      "(A + B)'"
    ],
    correctAnswer: 0,
    explanation: "Apply De Morgan's 2nd Law: $(A' \\cdot B')' = (A')' + (B')' = A + B$.",
    hint: "Involution restores A and B: A + B."
  },
  {
    id: 11,
    question: "Simplify: (A' + B')'.",
    options: [
      "A · B",
      "A + B",
      "A' · B'",
      "(A · B)'"
    ],
    correctAnswer: 0,
    explanation: "Apply De Morgan's 1st Law: $(A' + B')' = (A')' \\cdot (B')' = A \\cdot B$.",
    hint: "Involution restores A and B: A . B."
  },
  {
    id: 12,
    question: "What is the complement of the expression F(A, B, C) = AB + A'C?",
    options: [
      "(A' + B')(A + C')",
      "(A' + B) · (A + C)",
      "A'B' + AC'",
      "(A + B)(A' + C)"
    ],
    correctAnswer: 0,
    explanation: "$F' = (AB + A'C)' = (AB)' \\cdot (A'C)' = (A' + B') \\cdot ((A')' + C') = (A' + B')(A + C')$.",
    hint: "Complement using De Morgan's laws."
  },
  {
    id: 13,
    question: "How are De Morgan's First Law and Second Law related to each other?",
    options: [
      "They are mathematical inverses",
      "They are exact Duals of each other (obtainable via the Duality Principle)",
      "They are unrelated theorems",
      "They apply only to decimal arithmetic"
    ],
    correctAnswer: 1,
    explanation: "Swapping '+' and '·' converts $(A+B)' = A'B'$ directly into $(AB)' = A'+B'$, demonstrating that they form an exact dual pair.",
    hint: "Dual relationship."
  },
  {
    id: 14,
    question: "In proving De Morgan's 1st Law by Perfect Induction, how many rows are computed in the truth table?",
    options: [
      "2 rows",
      "4 rows",
      "8 rows",
      "16 rows"
    ],
    correctAnswer: 1,
    explanation: "For 2 variables (A, B), the truth table requires $2^2 = 4$ rows (00, 01, 10, 11).",
    hint: "2^2 = 4."
  },
  {
    id: 15,
    question: "Which of the following Boolean expressions is equivalent to (A + B + C')'?",
    options: [
      "A' · B' · C",
      "A' + B' + C",
      "A · B · C'",
      "A' · B' · C'"
    ],
    correctAnswer: 0,
    explanation: "$(A + B + C')' = A' \\cdot B' \\cdot (C')' = A' \\cdot B' \\cdot C$.",
    hint: "(C')' = C."
  },
  {
    id: 16,
    question: "Which of the following Boolean expressions is equivalent to (A · B · C')'?",
    options: [
      "A' + B' + C",
      "A' · B' · C",
      "A + B + C'",
      "A' + B' + C'"
    ],
    correctAnswer: 0,
    explanation: "$(A \\cdot B \\cdot C')' = A' + B' + (C')' = A' + B' + C$.",
    hint: "(C')' = C."
  },
  {
    id: 17,
    question: "Why is De Morgan's law indispensable when converting an AND-OR logic circuit into a pure NAND-NAND circuit?",
    options: [
      "Because double negation combined with De Morgan's law transforms sum-of-products into inverted products: AB + CD = ((AB + CD)')' = ((AB)' · (CD)')'",
      "Because it removes all transistors",
      "Because it increases the clock speed by 10x",
      "Because it changes DC voltage into AC voltage"
    ],
    correctAnswer: 0,
    explanation: "Applying double involution and De Morgan's theorem turns standard two-level SOP (AND-OR) expressions directly into two-level NAND-NAND equivalent circuits.",
    hint: "AND-OR to NAND-NAND transformation."
  },
  {
    id: 18,
    question: "Simplify the expression: ((A + B)' + (A + C)')'.",
    options: [
      "(A + B) · (A + C)",
      "A + BC",
      "A'B + A'C",
      "Both A and B"
    ],
    correctAnswer: 3,
    explanation: "Let $X = (A+B)'$ and $Y = (A+C)'$. Then $(X + Y)' = X' \\cdot Y' = ((A+B)')' \\cdot ((A+C)')' = (A+B)(A+C) = A + BC$. Both options (A) and (B) are equivalent.",
    hint: "De Morgan simplifies it to (A+B)(A+C) = A + BC."
  },
  {
    id: 19,
    question: "What is the output of (A · B)' when A = 1 and B = 1?",
    options: [
      "0",
      "1",
      "2",
      "Undefined"
    ],
    correctAnswer: 0,
    explanation: "$A \\cdot B = 1 \\cdot 1 = 1$. Its complement is $1' = 0$.",
    hint: "(1 . 1)' = 0."
  },
  {
    id: 20,
    question: "What is the output of (A + B)' when A = 0 and B = 0?",
    options: [
      "0",
      "1",
      "Undefined",
      "-1"
    ],
    correctAnswer: 1,
    explanation: "$A + B = 0 + 0 = 0$. Its complement is $0' = 1$.",
    hint: "(0 + 0)' = 1."
  },
  {
    id: 21,
    question: "Which of the following represents Augustus De Morgan's full historic contribution to mathematical logic?",
    options: [
      "He introduced the duality relationship between conjunction and disjunction in formal logic (1847)",
      "He invented the first Python compiler",
      "He designed the first microchip in Silicon Valley",
      "He discovered binary number systems"
    ],
    correctAnswer: 0,
    explanation: "Augustus De Morgan was a 19th-century British mathematician whose formalization of logic duality paved the way for modern Boolean circuit theory.",
    hint: "19th century mathematical logic pioneer."
  },
  {
    id: 22,
    question: "Simplify: (A · (B + C'))'.",
    options: [
      "A' + B'C",
      "A' + B' · C",
      "A' + (B + C')' = A' + B'C",
      "All of the above are mathematically identical"
    ],
    correctAnswer: 3,
    explanation: "$(A \\cdot (B + C'))' = A' + (B + C')' = A' + (B' \\cdot (C')') = A' + B'C$.",
    hint: "Break main product, then break inner sum."
  },
  {
    id: 23,
    question: "What is the complement of (X' + Y)'?",
    options: [
      "X' + Y",
      "X · Y'",
      "X + Y'",
      "X' · Y"
    ],
    correctAnswer: 0,
    explanation: "By the Involution Law: $((X' + Y)')' = X' + Y$.",
    hint: "Double complement cancels out."
  },
  {
    id: 24,
    question: "In Boolean circuit diagrams, how is a 'Bubbled Gate' represented?",
    options: [
      "With inversion bubbles placed on the INPUT leads of the gate",
      "With a bubble on the ground wire",
      "With an illuminated LED",
      "With a dotted circuit boundary"
    ],
    correctAnswer: 0,
    explanation: "A bubbled gate has small circles (inversion bubbles) drawn on its input terminals, indicating that input signals are complemented prior to the logic operation.",
    hint: "Bubbles on input pins."
  },
  {
    id: 25,
    question: "Why is knowing De Morgan's equivalences critical when writing compound conditionals in Python (`not (x and y)`)?",
    options: [
      "Because `not (x and y)` is computationally and logically identical to `not x or not y`, allowing developers to refactor complex if-statements for better readability and performance",
      "Because Python does not support the `and` operator",
      "Because it prevents recursion depth errors",
      "Because it speeds up garbage collection"
    ],
    correctAnswer: 0,
    explanation: "Refactoring complex conditional expressions using De Morgan's laws (`not (a and b)` &harr; `not a or not b`) is a fundamental software engineering best practice.",
    hint: "Refactoring conditional statements in code."
  }
];

export default questions;
