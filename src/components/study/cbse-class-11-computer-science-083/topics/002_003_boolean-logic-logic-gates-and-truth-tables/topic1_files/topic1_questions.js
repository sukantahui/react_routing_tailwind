const questions = [
  {
    id: 1,
    question: "What is a Boolean variable?",
    options: [
      "A variable that can hold any real numeric value",
      "A variable that can take only two possible values: True (1) or False (0)",
      "A variable that stores string characters in ASCII format",
      "A memory pointer to a hardware register"
    ],
    correctAnswer: 1,
    explanation: "A Boolean variable (binary variable) can take only one of two discrete states: True (represented by 1 / HIGH) or False (represented by 0 / LOW).",
    hint: "Think binary: 0 and 1."
  },
  {
    id: 2,
    question: "Which of the following sentences is a valid logical proposition?",
    options: [
      "Please pass the textbook.",
      "What is the time right now?",
      "New Delhi is the capital of India.",
      "How beautiful this painting is!"
    ],
    correctAnswer: 2,
    explanation: "A proposition is a declarative sentence that is either conclusively True or False. 'New Delhi is the capital of India' is True. Questions, commands, and exclamations are not propositions.",
    hint: "A proposition must have a definitive True or False answer."
  },
  {
    id: 3,
    question: "Which fundamental Boolean operation is a unary operation (operates on only one operand)?",
    options: [
      "Logical AND",
      "Logical OR",
      "Logical NOT",
      "Logical XOR"
    ],
    correctAnswer: 2,
    explanation: "Logical NOT (Inversion) is a unary operation requiring only one variable ($Y = \\overline{A}$), whereas AND, OR, and XOR are binary operations requiring two or more variables.",
    hint: "Unary means single operand."
  },
  {
    id: 4,
    question: "In a digital switching circuit, two switches connected in SERIES represent which logical operation?",
    options: [
      "Logical OR",
      "Logical AND",
      "Logical NOT",
      "Logical NOR"
    ],
    correctAnswer: 1,
    explanation: "In a series circuit, current flows to light the bulb if and only if BOTH Switch A AND Switch B are closed simultaneously. This models the AND operation.",
    hint: "Current must pass through both switches sequentially."
  },
  {
    id: 5,
    question: "In a digital switching circuit, two switches connected in PARALLEL represent which logical operation?",
    options: [
      "Logical AND",
      "Logical OR",
      "Logical NOT",
      "Logical NAND"
    ],
    correctAnswer: 1,
    explanation: "In a parallel circuit, current can reach the lamp through either branch if AT LEAST ONE switch (A or B) is closed. This models the OR operation.",
    hint: "Current has alternative paths."
  },
  {
    id: 6,
    question: "In Boolean algebra, what is the value of 1 + 1?",
    options: [
      "2",
      "10 (binary ten)",
      "1",
      "0"
    ],
    correctAnswer: 2,
    explanation: "In Boolean algebra, the '+' symbol denotes the Logical OR operation (disjunction). Therefore, 1 + 1 = True OR True = 1 (True). It is NOT binary arithmetic addition.",
    hint: "True OR True is True."
  },
  {
    id: 7,
    question: "What is the correct order of evaluation (operator precedence) in Boolean algebra?",
    options: [
      "OR -> AND -> NOT",
      "AND -> NOT -> OR",
      "NOT -> AND -> OR",
      "NOT -> OR -> AND"
    ],
    correctAnswer: 2,
    explanation: "The standard Boolean precedence hierarchy from highest to lowest is: Parentheses -> NOT -> AND -> OR.",
    hint: "NOT is evaluated first, followed by AND, and finally OR."
  },
  {
    id: 8,
    question: "Evaluate the Boolean expression Y = A' . B + C when A = 1, B = 1, C = 0.",
    options: [
      "1",
      "0",
      "Undefined",
      "2"
    ],
    correctAnswer: 1,
    explanation: "Step 1: A' = 1' = 0. Step 2: A' . B = 0 . 1 = 0. Step 3: 0 + C = 0 + 0 = 0. Hence Y = 0.",
    hint: "Substitute A=1, B=1, C=0 step by step following precedence."
  },
  {
    id: 9,
    question: "How many total rows (possible input combinations) will exist in a truth table for 4 Boolean variables?",
    options: [
      "4 rows",
      "8 rows",
      "16 rows",
      "32 rows"
    ],
    correctAnswer: 2,
    explanation: "The total number of input combinations in a truth table with n variables is given by the formula $2^n$. For 4 variables: $2^4 = 16$ rows.",
    hint: "Formula is 2^n."
  },
  {
    id: 10,
    question: "What is the result of the Involution Law: (A')'?",
    options: [
      "0",
      "1",
      "A'",
      "A"
    ],
    correctAnswer: 3,
    explanation: "The Law of Involution (Double Inversion) states that complementing a variable twice yields the original variable: $(A')' = A$.",
    hint: "Double negation cancels out."
  },
  {
    id: 11,
    question: "Which of the following Boolean expressions represents the Logical Conjunction of three variables A, B, and C?",
    options: [
      "A + B + C",
      "A . B . C",
      "A' + B' + C'",
      "(A + B) . C"
    ],
    correctAnswer: 1,
    explanation: "Logical Conjunction refers to the AND operation, symbolized by the dot operator ($A \\cdot B \\cdot C$).",
    hint: "Conjunction = AND."
  },
  {
    id: 12,
    question: "Which of the following Boolean expressions represents the Logical Disjunction of three variables X, Y, and Z?",
    options: [
      "X . Y . Z",
      "X + Y + Z",
      "(X . Y)' + Z",
      "X' . Y' . Z'"
    ],
    correctAnswer: 1,
    explanation: "Logical Disjunction refers to the OR operation, symbolized by the plus operator ($X + Y + Z$).",
    hint: "Disjunction = OR."
  },
  {
    id: 13,
    question: "What is the output of the Python expression `not True and False or True`?",
    options: [
      "False",
      "True",
      "SyntaxError",
      "None"
    ],
    correctAnswer: 1,
    explanation: "Precedence: 1. `not True` is False. 2. `False and False` is False. 3. `False or True` evaluates to True.",
    hint: "Python follows not -> and -> or."
  },
  {
    id: 14,
    question: "What is the output of the Boolean function F(A, B) = A + A'B?",
    options: [
      "A",
      "B",
      "A + B",
      "A . B"
    ],
    correctAnswer: 2,
    explanation: "Using Distributive Law: $A + A'B = (A + A')(A + B) = (1)(A + B) = A + B$.",
    hint: "Distribute A over A' and B."
  },
  {
    id: 15,
    question: "A truth table is defined as:",
    options: [
      "A table showing only arithmetic computations",
      "A mathematical table showing all possible input truth values and corresponding output results of a Boolean expression",
      "A dictionary mapping variable names to memory addresses",
      "A matrix storing floating point numbers"
    ],
    correctAnswer: 1,
    explanation: "A truth table lists every combination of truth values of input variables alongside the resulting output for a logical formula.",
    hint: "It systematically lists all 2^n input states."
  },
  {
    id: 16,
    question: "Which logic function outputs 1 if and only if both inputs are identical in 0 or 1?",
    options: [
      "XOR",
      "XNOR (Equivalence)",
      "NAND",
      "NOR"
    ],
    correctAnswer: 1,
    explanation: "XNOR (Exclusive NOR / Coincidence / Equivalence) gate produces 1 when both inputs are equal ($0,0$ or $1,1$).",
    hint: "Identical inputs produce True."
  },
  {
    id: 17,
    question: "What is the dual of the Boolean statement 1 + 0 = 1?",
    options: [
      "0 . 1 = 0",
      "1 . 0 = 0",
      "0 + 1 = 1",
      "1 + 1 = 1"
    ],
    correctAnswer: 0,
    explanation: "According to the Duality Principle, replace '+' with '.', '.' with '+', '0' with '1', and '1' with '0'. Thus $1 + 0 = 1$ becomes $0 \\cdot 1 = 0$.",
    hint: "Swap + with . and 1 with 0."
  },
  {
    id: 18,
    question: "In Python, which operator performs bitwise NOT?",
    options: [
      "not",
      "!",
      "~",
      "^"
    ],
    correctAnswer: 2,
    explanation: "In Python, the tilde `~` is the bitwise NOT (inversion) operator, while `not` is the logical NOT operator.",
    hint: "Tilde symbol ~."
  },
  {
    id: 19,
    question: "If A = 0 and B = 1, what is the value of (A + B)'?",
    options: [
      "1",
      "0",
      "Undefined",
      "-1"
    ],
    correctAnswer: 1,
    explanation: "$A + B = 0 + 1 = 1$. Complementing gives $1' = 0$.",
    hint: "First calculate inside parentheses (0 + 1 = 1), then invert."
  },
  {
    id: 20,
    question: "According to the Identity Law in Boolean algebra, what is A + 0 equal to?",
    options: [
      "0",
      "1",
      "A",
      "A'"
    ],
    correctAnswer: 2,
    explanation: "Identity Law for OR: $A + 0 = A$. Adding 0 does not change the truth value of A.",
    hint: "0 is the identity element for OR."
  },
  {
    id: 21,
    question: "According to the Identity Law for AND, what is A . 1 equal to?",
    options: [
      "0",
      "1",
      "A",
      "A'"
    ],
    correctAnswer: 2,
    explanation: "Identity Law for AND: $A \\cdot 1 = A$. Multiplying by 1 does not alter the truth value of A.",
    hint: "1 is the identity element for AND."
  },
  {
    id: 22,
    question: "What is A . 0 according to the Null / Boundedness Law?",
    options: [
      "0",
      "1",
      "A",
      "A'"
    ],
    correctAnswer: 0,
    explanation: "Null Law for AND: $A \\cdot 0 = 0$. Anything ANDed with 0 is always 0.",
    hint: "0 dominates the AND operation."
  },
  {
    id: 23,
    question: "What is A + 1 according to the Null / Boundedness Law?",
    options: [
      "0",
      "1",
      "A",
      "2"
    ],
    correctAnswer: 1,
    explanation: "Null Law for OR: $A + 1 = 1$. Anything ORed with 1 is always 1.",
    hint: "1 dominates the OR operation."
  },
  {
    id: 24,
    question: "What is A + A' according to the Complement Law?",
    options: [
      "0",
      "1",
      "A",
      "2A"
    ],
    correctAnswer: 1,
    explanation: "Complement Law for OR: $A + A' = 1$ (either A is True or not-A is True, so one is always 1).",
    hint: "One of the two must be True."
  },
  {
    id: 25,
    question: "What is A . A' according to the Complement Law?",
    options: [
      "0",
      "1",
      "A",
      "A'"
    ],
    correctAnswer: 0,
    explanation: "Complement Law for AND: $A \\cdot A' = 0$ (a statement and its negation cannot both be True simultaneously).",
    hint: "Contradiction is always False."
  }
];

export default questions;
