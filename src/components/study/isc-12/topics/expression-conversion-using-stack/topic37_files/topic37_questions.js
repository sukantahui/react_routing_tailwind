// topic37_questions.js
// 30 FAQs on "Step-by-Step Examples" for postfix‑to‑prefix.

const questions = [
  {
    question: "What is the first step in the postfix‑to‑prefix conversion?",
    shortAnswer: "Initialize an empty stack of strings.",
    explanation: "The stack will hold sub‑expressions as they are built.",
    hint: "Start with a stack.",
    level: "basic",
    codeExample: "Stack<String> stack = new Stack<>();"
  },
  {
    question: "What direction do you scan the postfix expression?",
    shortAnswer: "From left to right.",
    explanation: "Postfix is processed from left to right, pushing operands and combining when operators appear.",
    hint: "Left to right.",
    level: "basic",
    codeExample: "for (String token : tokens)"
  },
  {
    question: "What happens when an operand is encountered?",
    shortAnswer: "It is pushed onto the stack as a string.",
    explanation: "Operands are the building blocks.",
    hint: "Push.",
    level: "basic",
    codeExample: "stack.push(token);"
  },
  {
    question: "What happens when an operator is encountered?",
    shortAnswer: "Pop two operands, combine them in prefix order, and push the result.",
    explanation: "The first popped is the right operand, the second is the left operand. Combine as operator + left + right.",
    hint: "Pop, combine as operator left right, push.",
    level: "intermediate",
    codeExample: "String right = stack.pop(); String left = stack.pop(); String prefix = token + ' ' + left + ' ' + right; stack.push(prefix);"
  },
  {
    question: "Why is the first popped operand the right operand?",
    shortAnswer: "Because in postfix, the right operand appears before the operator.",
    explanation: "When scanning left to right, the last pushed operands are the rightmost ones.",
    hint: "Postfix order.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the order of operands and operator in the combined result?",
    shortAnswer: "operator + ' ' + left + ' ' + right",
    explanation: "Prefix notation places the operator before both operands.",
    hint: "Operator first.",
    level: "basic",
    codeExample: "token + ' ' + left + ' ' + right"
  },
  {
    question: "What is the final result of the conversion?",
    shortAnswer: "The single string remaining on the stack.",
    explanation: "After all tokens are processed, the stack contains the prefix expression.",
    hint: "Pop the last element.",
    level: "basic",
    codeExample: "return stack.pop();"
  },
  {
    question: "What is the output for postfix `A B +`?",
    shortAnswer: "+ A B",
    explanation: "Scan A, push; B, push; +: pop B (right), pop A (left) → + A B.",
    hint: "Simple.",
    level: "basic",
    codeExample: "+ A B"
  },
  {
    question: "What is the output for postfix `A B C * +`?",
    shortAnswer: "+ A * B C",
    explanation: "B*C → * B C; then + A * B C.",
    hint: "Multiplication first.",
    level: "intermediate",
    codeExample: "+ A * B C"
  },
  {
    question: "What is the output for postfix `A B + C *`?",
    shortAnswer: "* + A B C",
    explanation: "A+B → + A B; then * + A B C.",
    hint: "Addition first.",
    level: "intermediate",
    codeExample: "* + A B C"
  },
  {
    question: "What is the output for postfix `A B * C D * +`?",
    shortAnswer: "+ * A B * C D",
    explanation: "A*B → * A B; C*D → * C D; + → + * A B * C D.",
    hint: "Two multiplications then addition.",
    level: "advanced",
    codeExample: "+ * A B * C D"
  },
  {
    question: "What is the output for postfix `A B C * + D -`?",
    shortAnswer: "- + A * B C D",
    explanation: "B*C → * B C; + A * B C; - + A * B C D.",
    hint: "Subtraction at the end.",
    level: "advanced",
    codeExample: "- + A * B C D"
  },
  {
    question: "What is the output for postfix `A B ^ C ^`?",
    shortAnswer: "^ ^ A B C",
    explanation: "A^B → ^ A B; ^ ^ A B C.",
    hint: "Left‑assoc.",
    level: "advanced",
    codeExample: "^ ^ A B C"
  },
  {
    question: "What is the output for postfix `A B + C D - *`?",
    shortAnswer: "* + A B - C D",
    explanation: "A+B → + A B; C-D → - C D; * → * + A B - C D.",
    hint: "Two groups then multiplication.",
    level: "advanced",
    codeExample: "* + A B - C D"
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
    shortAnswer: "Yes, as long as tokens are separated by spaces.",
    explanation: "The algorithm works with any string operands.",
    hint: "Yes, with proper tokenisation.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the main advantage of this algorithm?",
    shortAnswer: "It is simple, efficient, and works for any postfix expression.",
    explanation: "The algorithm is easy to implement and understand.",
    hint: "Simplicity.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the main disadvantage?",
    shortAnswer: "It produces prefix with spaces between tokens, which may need formatting.",
    explanation: "The result is a space‑separated string.",
    hint: "Formatting.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "How can you verify the correctness of the conversion?",
    shortAnswer: "Convert the prefix result back to postfix and compare with the original.",
    explanation: "This is a good consistency check.",
    hint: "Verify.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the difference between this algorithm and postfix‑to‑infix?",
    shortAnswer: "The combination order differs: prefix uses operator + left + right, infix uses '(' + left + operator + right + ')'.",
    explanation: "The stack operations are the same, but the string format differs.",
    hint: "Format differs.",
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
    shortAnswer: "Write unit tests for various postfix expressions.",
    explanation: "Compare the output with expected prefix strings.",
    hint: "Testing.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the output for postfix `/ A B`?",
    shortAnswer: "/ A B",
    explanation: "A divided by B.",
    hint: "Division.",
    level: "basic",
    codeExample: "/ A B"
  },
  {
    question: "What is the output for postfix `A B C + *`?",
    shortAnswer: "* A + B C",
    explanation: "B+C → + B C; * A + B C.",
    hint: "Multiplication after addition.",
    level: "intermediate",
    codeExample: "* A + B C"
  },
  {
    question: "What is the output for postfix `A B C * D / +`?",
    shortAnswer: "+ A / * B C D",
    explanation: "B*C → * B C; / * B C D; + A / * B C D.",
    hint: "Order: *, /, +.",
    level: "advanced",
    codeExample: "+ A / * B C D"
  },
  {
    question: "How does the algorithm handle exponentiation?",
    shortAnswer: "It treats `^` as a normal operator, combining in prefix order.",
    explanation: "Exponentiation is handled the same way as other operators.",
    hint: "Same as others.",
    level: "intermediate",
    codeExample: "^ ^ A B C"
  },
  {
    question: "Why is the result a space‑separated string?",
    shortAnswer: "To make tokens distinguishable, especially for multi‑character operands.",
    explanation: "Spaces separate each token for clarity.",
    hint: "Token separation.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the main advantage of this algorithm?",
    shortAnswer: "It's simple, efficient, and works for any postfix expression.",
    explanation: "The algorithm is easy to implement and understand.",
    hint: "Simplicity.",
    level: "basic",
    codeExample: "Not applicable"
  }
];

export default questions;