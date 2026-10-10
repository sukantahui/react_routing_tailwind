const questions = [
  {
    id: 1,
    question: "Which of the following represents the Idempotent Law in Boolean algebra?",
    options: [
      "A + A = A and A · A = A",
      "A + 0 = A and A · 1 = A",
      "A + 1 = 1 and A · 0 = 0",
      "A + A' = 1 and A · A' = 0"
    ],
    correctAnswer: 0,
    explanation: "The Idempotent Law states that applying an operation to the same operand twice yields the operand itself ($A + A = A$ and $A \\cdot A = A$).",
    hint: "Idempotent: combining with self yields self."
  },
  {
    id: 2,
    question: "Which law is represented by: A + BC = (A + B)(A + C)?",
    options: [
      "Associative Law",
      "Distributive Law of OR over AND",
      "Absorption Law",
      "Commutative Law"
    ],
    correctAnswer: 1,
    explanation: "In Boolean algebra, OR distributes over AND ($A + BC = (A+B)(A+C)$). This distributive property has no direct equivalent in ordinary real-number arithmetic.",
    hint: "OR distributing over AND."
  },
  {
    id: 3,
    question: "What is the simplified form of the expression: A + AB?",
    options: [
      "B",
      "A",
      "AB",
      "A + B"
    ],
    correctAnswer: 1,
    explanation: "By the Absorption Law: $A + AB = A(1 + B) = A(1) = A$.",
    hint: "Absorption: A + AB absorbs the B term."
  },
  {
    id: 4,
    question: "What is the simplified form of the expression: A + A'B?",
    options: [
      "A",
      "B",
      "A + B",
      "AB"
    ],
    correctAnswer: 2,
    explanation: "By the Distributive Law / 3rd Absorption Law: $A + A'B = (A + A')(A + B) = (1)(A + B) = A + B$.",
    hint: "A absorbs the A' complement leaving A + B."
  },
  {
    id: 5,
    question: "What is the simplified form of the expression: A(A' + B)?",
    options: [
      "A",
      "AB",
      "A + B",
      "0"
    ],
    correctAnswer: 1,
    explanation: "$A(A' + B) = AA' + AB = 0 + AB = AB$.",
    hint: "Distribute A: A.A' = 0."
  },
  {
    id: 6,
    question: "Which Boolean law states that (A')' = A?",
    options: [
      "Identity Law",
      "Law of Involution (Double Inversion)",
      "Complement Law",
      "Idempotent Law"
    ],
    correctAnswer: 1,
    explanation: "The Involution Law (Double Negation) states that complementing a variable twice restores its original value: $(A')' = A$.",
    hint: "Double inversion = Involution."
  },
  {
    id: 7,
    question: "According to the Null / Boundedness Law, what is A · 0 equal to?",
    options: [
      "0",
      "1",
      "A",
      "A'"
    ],
    correctAnswer: 0,
    explanation: "$A \\cdot 0 = 0$. 0 is the annihilator / dominant element for AND.",
    hint: "Multiplying by 0 gives 0."
  },
  {
    id: 8,
    question: "According to the Null / Boundedness Law, what is A + 1 equal to?",
    options: [
      "A",
      "0",
      "1",
      "A + 1"
    ],
    correctAnswer: 2,
    explanation: "$A + 1 = 1$. 1 is the dominant element for OR.",
    hint: "OR with 1 gives 1."
  },
  {
    id: 9,
    question: "What is the identity element for the Logical OR operation?",
    options: [
      "1",
      "0",
      "A",
      "-1"
    ],
    correctAnswer: 1,
    explanation: "0 is the identity element for OR because $A + 0 = A$. Adding 0 preserves the original value.",
    hint: "A + 0 = A."
  },
  {
    id: 10,
    question: "What is the identity element for the Logical AND operation?",
    options: [
      "0",
      "1",
      "A",
      "A'"
    ],
    correctAnswer: 1,
    explanation: "1 is the identity element for AND because $A \\cdot 1 = A$. Multiplying by 1 preserves the value.",
    hint: "A . 1 = A."
  },
  {
    id: 11,
    question: "Simplify the Boolean expression: X · Y + X · Y' + X' · Y.",
    options: [
      "X",
      "Y",
      "X + Y",
      "X · Y"
    ],
    correctAnswer: 2,
    explanation: "$XY + XY' + X'Y = X(Y + Y') + X'Y = X(1) + X'Y = X + X'Y = X + Y$.",
    hint: "Group first two terms: X(Y+Y') = X, then X + X'Y = X + Y."
  },
  {
    id: 12,
    question: "Simplify the Boolean expression: (A + B)(A + B').",
    options: [
      "A",
      "B",
      "A + B",
      "0"
    ],
    correctAnswer: 0,
    explanation: "Using Distributive Law: $(A + B)(A + B') = A + BB' = A + 0 = A$.",
    hint: "A + BB' = A + 0 = A."
  },
  {
    id: 13,
    question: "Which of the following is the dual form of the equation: A + A'B = A + B?",
    options: [
      "A · (A' + B) = A · B",
      "A' · (A + B') = A' · B'",
      "A + AB = A",
      "A' + AB = A' + B"
    ],
    correctAnswer: 0,
    explanation: "Replacing '+' with '.', and '.' with '+': $A + A'B = A + B$ becomes $A \\cdot (A' + B) = A \\cdot B$.",
    hint: "Swap + and . operators."
  },
  {
    id: 14,
    question: "Which law allows rearranging operands as: A + (B + C) = (A + B) + C?",
    options: [
      "Commutative Law",
      "Associative Law",
      "Distributive Law",
      "Absorption Law"
    ],
    correctAnswer: 1,
    explanation: "The Associative Law allows grouping of consecutive identical operations without changing the result.",
    hint: "Associative = regrouping."
  },
  {
    id: 15,
    question: "Simplify the expression: AB + A'C + BC.",
    options: [
      "AB + A'C (Consensus Theorem / Redundant term BC)",
      "BC + A'C",
      "AB + BC",
      "A + B + C"
    ],
    correctAnswer: 0,
    explanation: "By the Consensus Theorem, in $AB + A'C + BC$, the term $BC$ is redundant because $BC = BC(A + A') = ABC + A'BC$. Thus $AB + A'C + BC = AB + A'C$.",
    hint: "Consensus theorem eliminates BC."
  },
  {
    id: 16,
    question: "What is the value of the Boolean term: A · B · C · 0?",
    options: [
      "ABC",
      "0",
      "1",
      "A + B + C"
    ],
    correctAnswer: 1,
    explanation: "By the Boundedness Law for AND, any term multiplied by 0 equals 0.",
    hint: "Anything . 0 = 0."
  },
  {
    id: 17,
    question: "What is the value of the Boolean term: A + B + C + 1?",
    options: [
      "A + B + C",
      "0",
      "1",
      "3"
    ],
    correctAnswer: 2,
    explanation: "By the Boundedness Law for OR, any term added to 1 equals 1.",
    hint: "Anything + 1 = 1."
  },
  {
    id: 18,
    question: "Simplify: (A + B + C)(A + B + C').",
    options: [
      "A + B",
      "A + C",
      "B + C",
      "ABC"
    ],
    correctAnswer: 0,
    explanation: "Let $X = A + B$. Then $(X + C)(X + C') = X + CC' = X + 0 = X = A + B$.",
    hint: "Let (A+B) = X."
  },
  {
    id: 19,
    question: "Simplify: A(B + C) + A(B + C').",
    options: [
      "AB",
      "A",
      "AC",
      "A + B"
    ],
    correctAnswer: 1,
    explanation: "Factor out A: $A[(B + C) + (B + C')] = A[B + (C + C')] = A[B + 1] = A[1] = A$.",
    hint: "Factor out A: B + 1 = 1."
  },
  {
    id: 20,
    question: "Which postulate ensures that Boolean operations on binary numbers (0, 1) always produce a binary result (0 or 1)?",
    options: [
      "Closure Postulate",
      "Identity Postulate",
      "Commutative Postulate",
      "Complement Postulate"
    ],
    correctAnswer: 0,
    explanation: "The Closure Postulate states that the result of any operation on elements of set K also belongs to set K.",
    hint: "Closure property."
  },
  {
    id: 21,
    question: "What is the complement of 0 in Boolean algebra?",
    options: [
      "0",
      "1",
      "-1",
      "Null"
    ],
    correctAnswer: 1,
    explanation: "$0' = 1$. The complement of 0 is 1.",
    hint: "Invert 0 to get 1."
  },
  {
    id: 22,
    question: "What is the complement of 1 in Boolean algebra?",
    options: [
      "1",
      "0",
      "-1",
      "Infinity"
    ],
    correctAnswer: 1,
    explanation: "$1' = 0$. The complement of 1 is 0.",
    hint: "Invert 1 to get 0."
  },
  {
    id: 23,
    question: "Simplify: A'B'C + A'BC + AB'C + ABC.",
    options: [
      "A",
      "B",
      "C",
      "1"
    ],
    correctAnswer: 2,
    explanation: "Factor out C: $C(A'B' + A'B + AB' + AB) = C[A'(B' + B) + A(B' + B)] = C[A'(1) + A(1)] = C[A' + A] = C[1] = C$.",
    hint: "Factor out C."
  },
  {
    id: 24,
    question: "Which of the following is an example of the Commutative Law for AND?",
    options: [
      "A · B = B · A",
      "A + B = B + A",
      "A · 1 = A",
      "A · A = A"
    ],
    correctAnswer: 0,
    explanation: "Commutative Law for AND states that changing the order of operands does not affect the product: $A \\cdot B = B \\cdot A$.",
    hint: "A . B = B . A."
  },
  {
    id: 25,
    question: "Why is algebraic minimization of Boolean expressions important in digital hardware design?",
    options: [
      "It reduces the number of logic gates, PCB area, power consumption, propagation delay, and manufacturing cost",
      "It makes the computer processor run on AC current",
      "It converts digital circuits into quantum computers",
      "It eliminates the need for clock oscillators"
    ],
    correctAnswer: 0,
    explanation: "Minimizing Boolean expressions results in fewer logic gates and connections, resulting in smaller silicon chip area, lower dynamic power dissipation, and higher clock speeds.",
    hint: "Fewer gates = lower cost, less power, faster speed."
  }
];

export default questions;
