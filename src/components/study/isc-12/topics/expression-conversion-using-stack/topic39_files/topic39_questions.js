// topic39_questions.js
// 30 FAQs on "Expression Evaluation using Stack" – basic to expert.

const questions = [
  {
    question: "What is the core data structure used for expression evaluation?",
    shortAnswer: "A stack.",
    explanation: "The LIFO nature of stacks perfectly matches the order of operations in postfix and prefix.",
    hint: "LIFO.",
    level: "basic",
    codeExample: "Stack<Double> stack = new Stack<>();"
  },
  {
    question: "How do you evaluate a postfix expression?",
    shortAnswer: "Scan left to right, push operands, and when an operator appears, pop two operands and push the result.",
    explanation: "The first popped is the right operand, the second is the left.",
    hint: "Left to right.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "How do you evaluate a prefix expression?",
    shortAnswer: "Scan right to left, push operands, and when an operator appears, pop two operands and push the result.",
    explanation: "The first popped is the left operand, the second is the right.",
    hint: "Right to left.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the order of popping operands in postfix evaluation?",
    shortAnswer: "First popped is the right operand, second is the left operand.",
    explanation: "In postfix, the right operand appears before the operator, so it's on top of the stack.",
    hint: "Right first.",
    level: "intermediate",
    codeExample: "double right = stack.pop(); double left = stack.pop();"
  },
  {
    question: "What is the order of popping operands in prefix evaluation?",
    shortAnswer: "First popped is the left operand, second is the right operand.",
    explanation: "In prefix, the left operand appears after the operator, so it's on top when scanning right-to-left.",
    hint: "Left first.",
    level: "intermediate",
    codeExample: "double left = stack.pop(); double right = stack.pop();"
  },
  {
    question: "What happens if you evaluate an empty expression?",
    shortAnswer: "The stack will be empty, causing an error.",
    explanation: "The expression should have at least one operand and operator.",
    hint: "Edge case.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "How do you handle variables in expression evaluation?",
    shortAnswer: "Use a symbol table (map) to store variable values, and look them up when an operand is encountered.",
    explanation: "When a token is a variable, its value is retrieved from the map and pushed onto the stack.",
    hint: "Use a map.",
    level: "intermediate",
    codeExample: "Map<String, Double> variables = new HashMap<>();"
  },
  {
    question: "What is the time complexity of postfix evaluation?",
    shortAnswer: "O(n) where n is the number of tokens.",
    explanation: "Each token is processed once.",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the space complexity of postfix evaluation?",
    shortAnswer: "O(n) in the worst case.",
    explanation: "The stack can hold up to the number of operands.",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "Can postfix evaluation handle floating‑point numbers?",
    shortAnswer: "Yes, by using a stack of double or float.",
    explanation: "The algorithm works with any numeric type.",
    hint: "Use double.",
    level: "basic",
    codeExample: "Stack<Double> stack = new Stack<>();"
  },
  {
    question: "What is the result of evaluating `2 3 + 4 *`?",
    shortAnswer: "20",
    explanation: "2+3=5, then 5*4=20.",
    hint: "Simple.",
    level: "basic",
    codeExample: "20"
  },
  {
    question: "What is the result of evaluating `* + 2 3 4`?",
    shortAnswer: "20",
    explanation: "2+3=5, then 5*4=20.",
    hint: "Prefix version of the same.",
    level: "basic",
    codeExample: "20"
  },
  {
    question: "What is the result of evaluating `A B +` with A=5, B=3?",
    shortAnswer: "8",
    explanation: "5+3=8.",
    hint: "Variable substitution.",
    level: "basic",
    codeExample: "8"
  },
  {
    question: "What is the result of evaluating `A B C * +` with A=2, B=3, C=4?",
    shortAnswer: "14",
    explanation: "B*C=12, then 2+12=14.",
    hint: "Multiplication first.",
    level: "intermediate",
    codeExample: "14"
  },
  {
    question: "What is the result of evaluating `* + A B C` with A=2, B=3, C=4?",
    shortAnswer: "20",
    explanation: "A+B=5, then 5*C=20.",
    hint: "Prefix order.",
    level: "intermediate",
    codeExample: "20"
  },
  {
    question: "What is the result of evaluating `5 3 /`?",
    shortAnswer: "1.666... (5/3)",
    explanation: "5 divided by 3.",
    hint: "Division.",
    level: "basic",
    codeExample: "1.6666666666666667"
  },
  {
    question: "How do you handle division by zero in evaluation?",
    shortAnswer: "Check for zero before performing division, and throw an exception.",
    explanation: "Division by zero is undefined and should be handled gracefully.",
    hint: "Check.",
    level: "intermediate",
    codeExample: "if (right == 0) throw new ArithmeticException();"
  },
  {
    question: "Can you evaluate expressions with multi‑character operands?",
    shortAnswer: "Yes, if tokens are space‑separated.",
    explanation: "Use spaces to delimit tokens.",
    hint: "Tokenisation.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the difference between postfix and prefix evaluation?",
    shortAnswer: "Postfix scans left‑to‑right and pops right operand first; prefix scans right‑to‑left and pops left operand first.",
    explanation: "The scanning direction and operand order are reversed.",
    hint: "Direction.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "Is the evaluation algorithm deterministic?",
    shortAnswer: "Yes, for a given expression and variable values, the result is always the same.",
    explanation: "The algorithm follows strict rules.",
    hint: "Deterministic.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the role of the stack in evaluation?",
    shortAnswer: "It holds intermediate results until they are needed.",
    explanation: "The stack stores operands and partial results.",
    hint: "Temporary storage.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "Can you evaluate an expression with unary operators?",
    shortAnswer: "Yes, but they require special handling.",
    explanation: "Unary operators have a single operand.",
    hint: "Special case.",
    level: "advanced",
    codeExample: "Not applicable"
  },
  {
    question: "What is the result of evaluating `2 3 + 4 5 * -`?",
    shortAnswer: "5 - 20 = -15? Actually 2+3=5, 4*5=20, 5-20 = -15.",
    explanation: "Postfix: (2+3) - (4*5) = -15.",
    hint: "Order matters.",
    level: "advanced",
    codeExample: "-15"
  },
  {
    question: "What is the result of evaluating `* - + 2 3 4 5`?",
    shortAnswer: "((2+3)-4)*5 = 1*5 = 5? Let's evaluate: +2 3 =5, -5 4=1, *1 5=5. So 5.",
    explanation: "Prefix: ((2+3)-4)*5 = 5.",
    hint: "Prefix order.",
    level: "advanced",
    codeExample: "5"
  },
  {
    question: "What is the result of evaluating `A B C * D / +` with A=10, B=5, C=2, D=4?",
    shortAnswer: "10 + (5*2)/4 = 10 + 10/4 = 10 + 2.5 = 12.5.",
    explanation: "Postfix: A + (B*C)/D.",
    hint: "Order: *, /, +.",
    level: "advanced",
    codeExample: "12.5"
  },
  {
    question: "Can you evaluate expressions with exponentiation?",
    shortAnswer: "Yes, by adding '^' as an operator that uses Math.pow.",
    explanation: "Exponentiation has higher precedence in infix, but in postfix/prefix it's just another operator.",
    hint: "Add ^.",
    level: "intermediate",
    codeExample: "case '^': result = Math.pow(left, right); break;"
  },
  {
    question: "What is the result of evaluating `2 3 ^ 4 ^`?",
    shortAnswer: "(2^3)^4 = 8^4 = 4096.",
    explanation: "Postfix: (2^3)^4 = 4096.",
    hint: "Left‑assoc.",
    level: "advanced",
    codeExample: "4096"
  },
  {
    question: "What is the result of evaluating `^ ^ 2 3 4`?",
    shortAnswer: "(2^3)^4 = 4096.",
    explanation: "Prefix: ^ ^ 2 3 4 = (2^3)^4 = 4096.",
    hint: "Prefix left‑assoc.",
    level: "advanced",
    codeExample: "4096"
  },
  {
    question: "What is the main advantage of using a stack for evaluation?",
    shortAnswer: "It's simple, efficient, and naturally handles the order of operations.",
    explanation: "The stack's LIFO property is perfect for expression evaluation.",
    hint: "Simplicity.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the main disadvantage of stack‑based evaluation?",
    shortAnswer: "It requires the expression to be in postfix or prefix (not infix).",
    explanation: "Infix requires additional precedence handling.",
    hint: "Needs conversion.",
    level: "intermediate",
    codeExample: "Not applicable"
  }
];

export default questions;