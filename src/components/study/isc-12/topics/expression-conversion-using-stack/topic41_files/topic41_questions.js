// topic41_questions.js
// 30 FAQs on "Evaluation of Prefix Expressions" – basic to expert.

const questions = [
  {
    question: "What is the core data structure used for prefix evaluation?",
    shortAnswer: "A stack.",
    explanation: "The LIFO property of stacks perfectly matches the order of operations in prefix.",
    hint: "LIFO.",
    level: "basic",
    codeExample: "Stack<Double> stack = new Stack<>();"
  },
  {
    question: "What direction do you scan a prefix expression during evaluation?",
    shortAnswer: "From right to left.",
    explanation: "Prefix evaluation scans right to left, pushing operands and applying operators when encountered.",
    hint: "Right to left.",
    level: "basic",
    codeExample: "for (int i = tokens.length - 1; i >= 0; i--)"
  },
  {
    question: "What is the order of popping operands when an operator is encountered in prefix?",
    shortAnswer: "First popped is the left operand, second is the right operand.",
    explanation: "In prefix, the left operand appears immediately after the operator, so it's on top when scanning right-to-left.",
    hint: "Left first, then right.",
    level: "intermediate",
    codeExample: "double left = stack.pop(); double right = stack.pop();"
  },
  {
    question: "What happens if the expression is empty?",
    shortAnswer: "The stack will be empty, causing an error.",
    explanation: "The expression should have at least one operand.",
    hint: "Edge case.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "How do you handle variables in prefix evaluation?",
    shortAnswer: "Use a symbol table (map) to store variable values and look them up when encountered.",
    explanation: "When a token is a variable, its value is retrieved from the map and pushed onto the stack.",
    hint: "Use a map.",
    level: "intermediate",
    codeExample: "Map<String, Double> variables = new HashMap<>();"
  },
  {
    question: "What is the time complexity of prefix evaluation?",
    shortAnswer: "O(n) where n is the number of tokens.",
    explanation: "Each token is processed once.",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the space complexity?",
    shortAnswer: "O(n) in the worst case.",
    explanation: "The stack can hold up to the number of operands.",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the result of evaluating `+ 2 3`?",
    shortAnswer: "5",
    explanation: "2+3=5.",
    hint: "Simple.",
    level: "basic",
    codeExample: "5"
  },
  {
    question: "What is the result of evaluating `* + 2 3 4`?",
    shortAnswer: "20",
    explanation: "2+3=5, then 5*4=20.",
    hint: "Addition first.",
    level: "basic",
    codeExample: "20"
  },
  {
    question: "What is the result of evaluating `+ A B` with A=5, B=3?",
    shortAnswer: "8",
    explanation: "5+3=8.",
    hint: "Variable substitution.",
    level: "basic",
    codeExample: "8"
  },
  {
    question: "What is the result of evaluating `+ A * B C` with A=2, B=3, C=4?",
    shortAnswer: "14",
    explanation: "B*C=12, then 2+12=14.",
    hint: "Multiplication first.",
    level: "intermediate",
    codeExample: "14"
  },
  {
    question: "What is the result of evaluating `* + 2 3 - 4 5`?",
    shortAnswer: "-5? Let's evaluate: +2 3=5, -4 5=-1, 5*-1=-5.",
    explanation: "(2+3)*(4-5) = 5 * (-1) = -5.",
    hint: "Order: +, -, *.",
    level: "advanced",
    codeExample: "-5"
  },
  {
    question: "Can prefix evaluation handle floating‑point numbers?",
    shortAnswer: "Yes, by using a stack of double or float.",
    explanation: "The algorithm works with any numeric type.",
    hint: "Use double.",
    level: "basic",
    codeExample: "Stack<Double> stack = new Stack<>();"
  },
  {
    question: "What is the result of evaluating `/ 2 3`?",
    shortAnswer: "0.666... (2/3)",
    explanation: "2 divided by 3.",
    hint: "Division.",
    level: "basic",
    codeExample: "0.6666666666666666"
  },
  {
    question: "How do you handle division by zero in prefix evaluation?",
    shortAnswer: "Check for zero before performing division, and throw an exception.",
    explanation: "Division by zero is undefined and should be handled gracefully.",
    hint: "Check.",
    level: "intermediate",
    codeExample: "if (right == 0) throw new ArithmeticException();"
  },
  {
    question: "What is the result of evaluating `^ 2 3`?",
    shortAnswer: "8",
    explanation: "2^3 = 8.",
    hint: "Exponentiation.",
    level: "intermediate",
    codeExample: "8"
  },
  {
    question: "Is prefix evaluation deterministic?",
    shortAnswer: "Yes, for a given expression and variable values, the result is always the same.",
    explanation: "The algorithm follows strict rules.",
    hint: "Deterministic.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the role of the stack in prefix evaluation?",
    shortAnswer: "It holds intermediate results until they are needed.",
    explanation: "The stack stores operands and partial results.",
    hint: "Temporary storage.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "Can you evaluate an expression with multi‑character operands?",
    shortAnswer: "Yes, if tokens are space‑separated.",
    explanation: "Use spaces to delimit tokens.",
    hint: "Tokenisation.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the advantage of prefix evaluation over infix evaluation?",
    shortAnswer: "It does not require precedence or parentheses, making it simpler.",
    explanation: "Prefix evaluation is a single pass with a stack.",
    hint: "Simplicity.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the result of evaluating `+ 5 * + 1 2 4`?",
    shortAnswer: "17? Let's evaluate: +1 2=3, 3*4=12, 5+12=17.",
    explanation: "5 + ((1+2)*4) = 5 + 12 = 17.",
    hint: "Complex.",
    level: "advanced",
    codeExample: "17"
  },
  {
    question: "How does the evaluator handle unknown operators?",
    shortAnswer: "It throws an exception.",
    explanation: "Only supported operators (+, -, *, /, ^) are allowed.",
    hint: "Error.",
    level: "basic",
    codeExample: "throw new IllegalArgumentException();"
  },
  {
    question: "What is the result of evaluating `* 2 + 3 4`?",
    shortAnswer: "14",
    explanation: "3+4=7, then 2*7=14.",
    hint: "Addition first.",
    level: "intermediate",
    codeExample: "14"
  },
  {
    question: "What is the result of evaluating `+ A * B C` with A=10, B=5, C=2?",
    shortAnswer: "20",
    explanation: "5*2=10, then 10+10=20.",
    hint: "Multiplication first.",
    level: "intermediate",
    codeExample: "20"
  },
  {
    question: "What is the result of evaluating `- + 2 * 3 4 5`?",
    shortAnswer: "9",
    explanation: "3*4=12, 2+12=14, 14-5=9.",
    hint: "Order: *, +, -.",
    level: "advanced",
    codeExample: "9"
  },
  {
    question: "Can the evaluator be extended to support more operators?",
    shortAnswer: "Yes, by adding cases to the operator switch.",
    explanation: "You can add modulus, bitwise, or logical operators.",
    hint: "Extensible.",
    level: "intermediate",
    codeExample: "case '%': result = left % right; break;"
  },
  {
    question: "What is the main difference between evaluating prefix and evaluating postfix?",
    shortAnswer: "Prefix scans right to left and pops left operand first; postfix scans left to right and pops right operand first.",
    explanation: "The scanning direction and operand order are reversed.",
    hint: "Direction.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the result of evaluating `* + 2 3 / 4 5`?",
    shortAnswer: "4? Let's evaluate: +2 3=5, /4 5=0.8, 5*0.8=4.",
    explanation: "(2+3)*(4/5) = 5 * 0.8 = 4.",
    hint: "Order: +, /, *.",
    level: "advanced",
    codeExample: "4"
  },
  {
    question: "What is the result of evaluating `+ A * B C` with A=2, B=3, C=4?",
    shortAnswer: "14",
    explanation: "B*C=12, then A+12=14.",
    hint: "Multiplication first.",
    level: "intermediate",
    codeExample: "14"
  },
  {
    question: "How do you ensure the expression is well‑formed?",
    shortAnswer: "Check that the stack has exactly one element at the end and doesn't underflow during processing.",
    explanation: "Validation can be done as part of the evaluation.",
    hint: "Validation.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "Is it possible to evaluate prefix without a stack?",
    shortAnswer: "A stack is the natural data structure, but you could use a list and process from the end in some cases.",
    explanation: "The stack is the simplest and most efficient approach.",
    hint: "Stack is preferred.",
    level: "advanced",
    codeExample: "Not applicable"
  }
];

export default questions;