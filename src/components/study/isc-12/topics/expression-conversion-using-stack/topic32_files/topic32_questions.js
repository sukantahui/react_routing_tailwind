// topic32_questions.js
// 30 FAQs on "Algorithm for Prefix to Postfix" – basic to expert.

const questions = [
  {
    question: "What is the core data structure used in the prefix‑to‑postfix algorithm?",
    shortAnswer: "A stack of strings.",
    explanation: "The stack holds operand strings (sub‑expressions) as we build the postfix expression.",
    hint: "Stack of strings.",
    level: "basic",
    codeExample: "Stack<String> stack = new Stack<>();"
  },
  {
    question: "What direction do you scan the prefix expression?",
    shortAnswer: "From right to left.",
    explanation: "Prefix is evaluated from right to left, so we scan in that direction.",
    hint: "Reverse direction.",
    level: "basic",
    codeExample: "for (int i = tokens.length - 1; i >= 0; i--)"
  },
  {
    question: "How do you handle an operand in the algorithm?",
    shortAnswer: "Push it onto the stack as a string.",
    explanation: "Operands are the building blocks of the postfix expression.",
    hint: "Push the operand.",
    level: "basic",
    codeExample: "stack.push(token);"
  },
  {
    question: "How do you handle an operator in the algorithm?",
    shortAnswer: "Pop two operands, combine them in postfix order, and push the result.",
    explanation: "The first popped is the left operand, the second is the right operand. Combine as left + right + operator.",
    hint: "Pop left, then right, then combine as left right operator.",
    level: "intermediate",
    codeExample: "String left = stack.pop(); String right = stack.pop(); String postfix = left + ' ' + right + ' ' + token; stack.push(postfix);"
  },
  {
    question: "What is the order of operands and operator in the combined result?",
    shortAnswer: "left + ' ' + right + ' ' + operator",
    explanation: "Postfix notation places the operator after both operands.",
    hint: "Operator last.",
    level: "basic",
    codeExample: "left + ' ' + right + ' ' + op"
  },
  {
    question: "Why is the first popped operand the left operand?",
    shortAnswer: "Because in prefix, the operator is followed by the left operand then the right operand.",
    explanation: "Since we scan from right to left, the last pushed operands are the rightmost operands.",
    hint: "Prefix order.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the final result of the conversion?",
    shortAnswer: "The single string remaining on the stack.",
    explanation: "After all tokens are processed, the stack holds the postfix expression.",
    hint: "Pop the final element.",
    level: "basic",
    codeExample: "return stack.pop();"
  },
  {
    question: "What is the output for prefix `+ A B`?",
    shortAnswer: "A B +",
    explanation: "Scan from right: B, A. '+' combines them as A B +.",
    hint: "Simple.",
    level: "basic",
    codeExample: "A B +"
  },
  {
    question: "What is the output for prefix `+ A * B C`?",
    shortAnswer: "A B C * +",
    explanation: "B*C first: B C *, then added to A: A B C * +.",
    hint: "Multiplication first.",
    level: "intermediate",
    codeExample: "A B C * +"
  },
  {
    question: "What is the output for prefix `* + A B C`?",
    shortAnswer: "A B + C *",
    explanation: "A+B first: A B +, then multiplied by C: A B + C *.",
    hint: "Addition first.",
    level: "intermediate",
    codeExample: "A B + C *"
  },
  {
    question: "What is the output for prefix `+ * A B * C D`?",
    shortAnswer: "A B * C D * +",
    explanation: "A*B: A B *, C*D: C D *, then add: A B * C D * +.",
    hint: "Two multiplications then addition.",
    level: "advanced",
    codeExample: "A B * C D * +"
  },
  {
    question: "What is the output for prefix `- + A * B C D`?",
    shortAnswer: "A B C * + D -",
    explanation: "B*C: B C *, +A: A B C * +, -D: A B C * + D -.",
    hint: "Subtraction at the end.",
    level: "advanced",
    codeExample: "A B C * + D -"
  },
  {
    question: "What is the output for prefix `^ ^ A B C`?",
    shortAnswer: "A B ^ C ^",
    explanation: "A^B: A B ^, then ^C: A B ^ C ^.",
    hint: "Left‑assoc.",
    level: "advanced",
    codeExample: "A B ^ C ^"
  },
  {
    question: "What is the output for prefix `* + A B - C D`?",
    shortAnswer: "A B + C D - *",
    explanation: "A+B: A B +, C-D: C D -, then *: A B + C D - *.",
    hint: "Two groups then multiplication.",
    level: "advanced",
    codeExample: "A B + C D - *"
  },
  {
    question: "What is the time complexity of the algorithm?",
    shortAnswer: "O(n), where n is the number of tokens.",
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
    question: "Does the algorithm work for multi‑character operands?",
    shortAnswer: "Yes, as long as tokens are properly separated.",
    explanation: "The algorithm works with any string operands.",
    hint: "Yes, with tokenisation.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "Can this algorithm be used for postfix‑to‑prefix conversion?",
    shortAnswer: "Yes, but with a different scan direction and operand order.",
    explanation: "The algorithms are symmetric.",
    hint: "Symmetric.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What happens if the input is empty?",
    shortAnswer: "The algorithm should return an empty string or handle gracefully.",
    explanation: "Edge case.",
    hint: "Edge case.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the role of the stack in this algorithm?",
    shortAnswer: "It holds operand strings until they can be combined.",
    explanation: "The stack manages the order of operations.",
    hint: "Temporary storage.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "How can you test the algorithm?",
    shortAnswer: "Write unit tests for various prefix expressions.",
    explanation: "Compare the output with expected postfix strings.",
    hint: "Testing.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the output for prefix `/ A B`?",
    shortAnswer: "A B /",
    explanation: "A divided by B.",
    hint: "Division.",
    level: "basic",
    codeExample: "A B /"
  },
  {
    question: "What is the output for prefix `* A + B C`?",
    shortAnswer: "A B C + *",
    explanation: "B+C first: B C +, then *A: A B C + *.",
    hint: "Multiplication after addition.",
    level: "intermediate",
    codeExample: "A B C + *"
  },
  {
    question: "What is the output for prefix `+ A / * B C D`?",
    shortAnswer: "A B C * D / +",
    explanation: "B*C: B C *, /D: B C * D /, +A: A B C * D / +.",
    hint: "Order: *, /, +.",
    level: "advanced",
    codeExample: "A B C * D / +"
  },
  {
    question: "How does the algorithm handle exponentiation?",
    shortAnswer: "It treats `^` as a normal operator, combining in postfix order.",
    explanation: "Exponentiation is handled the same way as other operators.",
    hint: "Same as others.",
    level: "intermediate",
    codeExample: "A B ^ C ^"
  },
  {
    question: "What is the main advantage of this algorithm?",
    shortAnswer: "It's simple, efficient, and works for any prefix expression.",
    explanation: "The algorithm is easy to implement and understand.",
    hint: "Simplicity.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the main disadvantage?",
    shortAnswer: "It produces postfix with spaces between tokens, which may need formatting.",
    explanation: "The result is a space‑separated string.",
    hint: "Formatting.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "Is the algorithm used in real‑world applications?",
    shortAnswer: "Yes, in compilers and expression transformers.",
    explanation: "It's a fundamental algorithm in compiler design.",
    hint: "Compilers.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the difference between this algorithm and prefix‑to‑infix?",
    shortAnswer: "The combination order differs: postfix uses left + right + operator, infix uses '(' + left + operator + right + ')'.",
    explanation: "The stack operations are the same, but the string format differs.",
    hint: "Format differs.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "Can you convert prefix to postfix without a stack?",
    shortAnswer: "The algorithm is stack‑based, but you could use recursion if the expression is fully parenthesized.",
    explanation: "A stack is the standard and simplest approach.",
    hint: "Stack is preferred.",
    level: "intermediate",
    codeExample: "Not applicable"
  }
];

export default questions;