const questions = [
  {
    id: 1,
    question: "State the Duality Principle in Boolean algebra.",
    options: [
      "Every Boolean expression evaluates to 0 or 1",
      "Any Boolean algebraic identity remains valid if operators (+ and ·) and identity elements (0 and 1) are interchanged throughout",
      "Double negation always cancels out",
      "All logic gates can be built with transistors"
    ],
    correctAnswer: 1,
    explanation: "The Principle of Duality states that from any valid Boolean relation, another valid relation (its dual) is obtained by interchanging '+' with '·' and '0' with '1'.",
    hint: "Interchanging operators and 0/1 preserves validity."
  },
  {
    id: 2,
    question: "What is the primary difference between finding the DUAL of an expression and finding its COMPLEMENT?",
    options: [
      "In Duality, variables are complemented; in Complement, variables remain unchanged",
      "In Duality, variables remain UNCHANGED; in Complement, variables are COMPLEMENTED",
      "There is no mathematical difference",
      "Duality applies only to numbers, Complement applies to letters"
    ],
    correctAnswer: 1,
    explanation: "In finding the Dual ($F^*$), variables stay as they are (A remains A, B' remains B'). In finding the Complement ($F'$), variables are inverted ($A \\to A'$).",
    hint: "Variables are NOT complemented in duality."
  },
  {
    id: 3,
    question: "What is the dual of the Boolean expression: A + B · C?",
    options: [
      "A · (B + C)",
      "A' · (B' + C')",
      "(A + B) · C",
      "A + B + C"
    ],
    correctAnswer: 0,
    explanation: "Replace '+' with '·' and '·' with '+': $A + (B \\cdot C)$ becomes $A \\cdot (B + C)$.",
    hint: "Swap + with . and . with +."
  },
  {
    id: 4,
    question: "What is the dual of the identity: A + 0 = A?",
    options: [
      "A · 1 = A",
      "A' · 0 = 0",
      "A + 1 = 1",
      "A' + 1 = A"
    ],
    correctAnswer: 0,
    explanation: "Swap '+' with '·' and '0' with '1': $A + 0 = A$ becomes $A \\cdot 1 = A$.",
    hint: "0 becomes 1 and + becomes ."
  },
  {
    id: 5,
    question: "What is the dual of the identity: A + 1 = 1?",
    options: [
      "A · 0 = 0",
      "A + 0 = A",
      "A' · 1 = 0",
      "A · 1 = A"
    ],
    correctAnswer: 0,
    explanation: "Swap '+' with '·' and '1' with '0': $A + 1 = 1$ becomes $A \\cdot 0 = 0$.",
    hint: "1 becomes 0 and + becomes ."
  },
  {
    id: 6,
    question: "What is the dual of the expression: X · Y' + Z · 1?",
    options: [
      "(X + Y') · (Z + 0)",
      "(X' + Y) · (Z' + 0)",
      "X · Y + Z · 0",
      "(X + Y) · (Z + 1)"
    ],
    correctAnswer: 0,
    explanation: "Replace products with sums, sum with product, and '1' with '0': $(X + Y') \\cdot (Z + 0)$. Note that $Y'$ stays $Y'$.",
    hint: "Keep Y' intact, swap operators and constants."
  },
  {
    id: 7,
    question: "What is the dual of: (A + B) · (C + D)?",
    options: [
      "A · B + C · D",
      "(A' · B') + (C' · D')",
      "(A · B) + (C · D)",
      "(A + B') · (C + D')"
    ],
    correctAnswer: 2,
    explanation: "Replace inner additions with products and outer product with addition: $(A \\cdot B) + (C \\cdot D)$.",
    hint: "+ becomes . and . becomes +."
  },
  {
    id: 8,
    question: "What is the dual of: A + A'B = A + B?",
    options: [
      "A · (A' + B) = A · B",
      "A' · (A + B') = A' · B'",
      "A + AB = A",
      "A · (A + B) = A"
    ],
    correctAnswer: 0,
    explanation: "Change '+' to '·', '·' to '+': $A \\cdot (A' + B) = A \\cdot B$.",
    hint: "Swap + and . operators."
  },
  {
    id: 9,
    question: "What is the dual of: A · (A + B) = A?",
    options: [
      "A + (A · B) = A",
      "A' + (A' · B') = A'",
      "A · AB = A",
      "A + A = A"
    ],
    correctAnswer: 0,
    explanation: "Swap '·' to '+' and '+' to '·': $A + (A \\cdot B) = A$.",
    hint: "Absorption law 1."
  },
  {
    id: 10,
    question: "What is a 'Self-Dual' Boolean function?",
    options: [
      "A function whose dual is identical to the original function: F* = F",
      "A function that only has 1s in its truth table",
      "A function that cannot be simplified",
      "A function with an odd number of variables"
    ],
    correctAnswer: 0,
    explanation: "A Self-Dual Boolean function satisfies $F^* = F$. An example is the majority voting function $F(A, B, C) = AB + BC + CA$.",
    hint: "F* = F."
  },
  {
    id: 11,
    question: "Which of the following functions is a famous Self-Dual function?",
    options: [
      "F(A, B, C) = AB + BC + CA (Majority function)",
      "F(A, B) = A + B",
      "F(A, B) = AB",
      "F(A, B, C) = A + B + C"
    ],
    correctAnswer: 0,
    explanation: "Dual of $AB + BC + CA$ is $(A+B)(B+C)(C+A) = AB + BC + CA$. Hence it is self-dual.",
    hint: "Majority voting function."
  },
  {
    id: 12,
    question: "What is the dual of the Boolean statement: 0 + 0 = 0?",
    options: [
      "1 · 1 = 1",
      "0 · 0 = 0",
      "1 + 1 = 1",
      "0 · 1 = 0"
    ],
    correctAnswer: 0,
    explanation: "Replace '0' with '1' and '+' with '·': $1 \\cdot 1 = 1$.",
    hint: "0 -> 1 and + -> ."
  },
  {
    id: 13,
    question: "What is the dual of the Boolean statement: 1 + 0 = 1?",
    options: [
      "0 · 1 = 0",
      "1 · 0 = 0",
      "0 + 1 = 1",
      "1 + 1 = 1"
    ],
    correctAnswer: 0,
    explanation: "Replace '1' with '0', '+' with '·', and '0' with '1': $0 \\cdot 1 = 0$.",
    hint: "1 -> 0, + -> ., 0 -> 1."
  },
  {
    id: 14,
    question: "If a Boolean identity LHS = RHS is proved to be true, what can be stated about its dual identity (LHS)* = (RHS)*?",
    options: [
      "It must be proved separately using a 16-row truth table",
      "It is automatically and unconditionally TRUE by the Principle of Duality",
      "It might be False depending on variable names",
      "It only holds for 2 variables"
    ],
    correctAnswer: 1,
    explanation: "The Duality Principle guarantees that any theorem derived from Boolean axioms has an equally valid dual theorem without requiring separate proof.",
    hint: "Automatically true by duality."
  },
  {
    id: 15,
    question: "What is the dual of: (A + B)' = A' · B' (De Morgan's 1st Law)?",
    options: [
      "(A · B)' = A' + B' (De Morgan's 2nd Law)",
      "(A + B)' = A + B",
      "A' · B' = A + B",
      "(A · B)' = A · B"
    ],
    correctAnswer: 0,
    explanation: "Interchanging '+' and '·' yields $(A \\cdot B)' = A' + B'$, which is precisely De Morgan's Second Law.",
    hint: "De Morgan's 2nd law is the dual of the 1st."
  },
  {
    id: 16,
    question: "What is the dual of the expression: A'B + AB' + A'B'?",
    options: [
      "(A' + B) · (A + B') · (A' + B')",
      "(A + B') · (A' + B) · (A + B)",
      "A'B' + AB + A'B",
      "A + B + A'B'"
    ],
    correctAnswer: 0,
    explanation: "Swap product to sum within terms, and sum to product between terms: $(A' + B) \\cdot (A + B') \\cdot (A' + B')$. Variables remain uncomplemented.",
    hint: "Products become sums, sums become products."
  },
  {
    id: 17,
    question: "Find the dual of F = (X + Y) · (X' + Z) · (Y + Z).",
    options: [
      "XY + X'Z + YZ",
      "X'Y' + XZ' + Y'Z'",
      "(X · Y) + (X' · Z) + (Y · Z)",
      "Both A and C"
    ],
    correctAnswer: 3,
    explanation: "The dual converts each sum factor to a product and sums them: $XY + X'Z + YZ$.",
    hint: "Sum-of-products form."
  },
  {
    id: 18,
    question: "What is the dual of A · A' = 0?",
    options: [
      "A + A' = 1",
      "A · 1 = A",
      "A + 0 = A",
      "A' + A = 0"
    ],
    correctAnswer: 0,
    explanation: "Swap '·' with '+' and '0' with '1': $A + A' = 1$ (Complement law for OR).",
    hint: "· becomes + and 0 becomes 1."
  },
  {
    id: 19,
    question: "When applying the Duality Principle to an expression containing parentheses like A · (B + C), what must be preserved?",
    options: [
      "The exact grouping / precedence structure using parentheses: A + (B · C)",
      "The order of alphabets in English",
      "All lowercase letters",
      "The number of logic gates"
    ],
    correctAnswer: 0,
    explanation: "Parentheses ensure operator precedence is preserved. $A \\cdot (B + C)$ must become $A + (B \\cdot C)$, not $A + B \\cdot C$ (which would evaluate $B \\cdot C$ first).",
    hint: "Parentheses maintain precedence."
  },
  {
    id: 20,
    question: "What is the dual of: (A + B)(A + C) = A + BC?",
    options: [
      "AB + AC = A(B + C)",
      "A'B + A'C = A'(B + C)",
      "(A · B) + (A · C) = A · (B + C)",
      "Both A and C"
    ],
    correctAnswer: 3,
    explanation: "The dual of $(A+B)(A+C) = A+BC$ is $AB + AC = A(B+C)$ (First Distributive Law).",
    hint: "First distributive law."
  },
  {
    id: 21,
    question: "What is the dual of: A + A = A?",
    options: [
      "A · A = A",
      "A' · A' = A'",
      "A + 0 = A",
      "A · 1 = A"
    ],
    correctAnswer: 0,
    explanation: "Swap '+' with '·': $A \\cdot A = A$.",
    hint: "Idempotent law for AND."
  },
  {
    id: 22,
    question: "What is the dual of: (A')' = A?",
    options: [
      "(A')' = A",
      "(A)' = A'",
      "A = A'",
      "A + A' = 1"
    ],
    correctAnswer: 0,
    explanation: "The Involution Law has no '+' or '·' operators or constants, so its dual is identically $(A')' = A$.",
    hint: "Self-dual identity."
  },
  {
    id: 23,
    question: "If F = A'B + AB', what is its dual F*?",
    options: [
      "(A' + B) · (A + B')",
      "AB + A'B'",
      "A'B' + AB",
      "All of the above (since (A'+B)(A+B') expands to AB + A'B')"
    ],
    correctAnswer: 3,
    explanation: "Dual is $(A' + B)(A + B')$. Expanding gives $A'A + A'B' + BA + BB' = 0 + A'B' + AB + 0 = AB + A'B'$.",
    hint: "Dual of XOR is XNOR."
  },
  {
    id: 24,
    question: "Why should a student never change variable complements (e.g. converting A to A') when asked to write the dual in a board exam?",
    options: [
      "Because complementing variables generates the COMPLEMENT (F'), which is a completely different function and scores 0 marks for a duality question",
      "Because Python will crash",
      "Because it takes more ink",
      "Because A' is not a valid Boolean variable"
    ],
    correctAnswer: 0,
    explanation: "Inverting variables produces the Logical Complement ($F'$), not the Dual ($F^*$). Duality strictly alters operators and constants while keeping variables intact.",
    hint: "Complementing variables creates F', not F*."
  },
  {
    id: 25,
    question: "In logic circuit design, why does the Duality Principle matter for CMOS transistor layouts?",
    options: [
      "Because every CMOS pull-up PMOS network is the exact topological DUAL of its pull-down NMOS network (series switches in NMOS become parallel switches in PMOS)",
      "Because it halves the clock frequency",
      "Because it prevents electromagnetic interference",
      "Because it allows using AC mains directly"
    ],
    correctAnswer: 0,
    explanation: "CMOS logic cells (like NAND and NOR) rely on duality: series NMOS pull-down transistors correspond to parallel PMOS pull-up transistors.",
    hint: "CMOS PMOS/NMOS duality."
  }
];

export default questions;
