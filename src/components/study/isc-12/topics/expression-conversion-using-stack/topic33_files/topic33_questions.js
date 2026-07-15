// topic33_questions.js
// 30 FAQs on "Step-by-Step Examples" for prefix‑to‑postfix.

const questions = [
  {
    question: "What is the first step in the prefix‑to‑postfix conversion?",
    shortAnswer: "Initialize an empty stack of strings.",
    explanation: "The stack will hold sub‑expressions as they are built.",
    hint: "Start with a stack.",
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
    question: "What happens when an operand is encountered?",
    shortAnswer: "It is pushed onto the stack as a string.",
    explanation: "Operands are the building blocks.",
    hint: "Push.",
    level: "basic",
    codeExample: "stack.push(token);"
  },
  {
    question: "What happens when an operator is encountered?",
    shortAnswer: "Pop two operands, combine them in postfix order, and push the result.",
    explanation: "The first popped is the left operand, the second is the right operand. Combine as left + right + operator.",
    hint: "Pop, combine as left right operator, push.",
    level: "intermediate",
    codeExample: "String left = stack.pop(); String right = stack.pop(); String postfix = left + ' ' + right + ' ' + token; stack.push(postfix);"
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
    question: "What is the order of operands and operator in the combined result?",
    shortAnswer: "left + ' ' + right + ' ' + operator",
    explanation: "Postfix notation places the operator after both operands.",
    hint: "Operator last.",
    level: "basic",
    codeExample: "left + ' ' + right + ' ' + op"
  },
  {
    question: "What is the final result of the conversion?",
    shortAnswer: "The single string remaining on the stack.",
    explanation: "After all tokens are processed, the stack contains the postfix expression.",
    hint: "Pop the last element.",
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
    shortAnswer: "A B * C + D -",
    explanation: "B*C: B C *, +A: A B C * +, -D: A B C * + D -.",
    hint: "Subtraction at the end.",
    level: "advanced",
    codeExample: "A B * C + D -"
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
    shortAnswer: "Yes, as long as tokens are separated by spaces.",
    explanation: "The algorithm works with any string operands.",
    hint: "Yes, with proper tokenisation.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the main advantage of this algorithm?",
    shortAnswer: "It is simple, efficient, and works for any prefix expression.",
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
    question: "How can you verify the correctness of the conversion?",
    shortAnswer: "Convert the postfix result back to prefix and compare with the original.",
    explanation: "This is a good consistency check.",
    hint: "Verify.",
    level: "intermediate",
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
    question: "Why is the result a space‑separated string?",
    shortAnswer: "To make tokens distinguishable, especially for multi‑character operands.",
    explanation: "Spaces separate each token for clarity.",
    hint: "Token separation.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the main advantage of this algorithm?",
    shortAnswer: "It's simple, efficient, and works for any prefix expression.",
    explanation: "The algorithm is easy to implement and understand.",
    hint: "Simplicity.",
    level: "basic",
    codeExample: "Not applicable"
  }
];

export default questions;