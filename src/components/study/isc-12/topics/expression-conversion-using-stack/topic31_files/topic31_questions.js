// topic31_questions.js
// 30 FAQs on "Rules for Prefix to Postfix Conversion" – basic to expert.

const questions = [
  {
    question: "What is the first step in converting prefix to postfix?",
    shortAnswer: "Initialize an empty stack to hold strings.",
    explanation: "The stack will store sub‑expressions as we build the postfix.",
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
    question: "How do you handle an operand in the conversion?",
    shortAnswer: "Push it onto the stack as a string.",
    explanation: "Operands are the building blocks of the postfix expression.",
    hint: "Push the operand.",
    level: "basic",
    codeExample: "stack.push(token);"
  },
  {
    question: "How do you handle an operator in the conversion?",
    shortAnswer: "Pop two operands, combine them with the operator at the end, and push the result.",
    explanation: "The first popped is the left operand, the second is the right operand.",
    hint: "Pop left, then right, then combine as postfix.",
    level: "intermediate",
    codeExample: "String left = stack.pop(); String right = stack.pop(); stack.push(left + ' ' + right + ' ' + op);"
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
    explanation: "Scan from right: B, A. '+' combines as A B +.",
    hint: "Simple.",
    level: "basic",
    codeExample: "A B +"
  },
  {
    question: "What is the output for prefix `+ A * B C`?",
    shortAnswer: "A B C * +",
    explanation: "B*C first, then added to A.",
    hint: "Multiplication first.",
    level: "intermediate",
    codeExample: "A B C * +"
  },
  {
    question: "What is the output for prefix `* + A B C`?",
    shortAnswer: "A B + C *",
    explanation: "A+B first, then multiplied by C.",
    hint: "Addition first.",
    level: "intermediate",
    codeExample: "A B + C *"
  },
  {
    question: "What is the output for prefix `+ * A B * C D`?",
    shortAnswer: "A B * C D * +",
    explanation: "A*B and C*D are computed first, then added.",
    hint: "Two multiplications then addition.",
    level: "advanced",
    codeExample: "A B * C D * +"
  },
  {
    question: "What is the output for prefix `- + A * B C D`?",
    shortAnswer: "A B * C + D -? Let's trace: - + A * B C D → scan: D, C, B, A, *, +, -. *: (A B *); +: (A B * C +); -: (A B * C + D -). So result: A B * C + D -.",
    explanation: "A*B, then +C, then -D.",
    hint: "Subtraction at the end.",
    level: "advanced",
    codeExample: "A B * C + D -"
  },
  {
    question: "What is the output for prefix `* + A B - C D`?",
    shortAnswer: "A B + C D - *",
    explanation: "A+B and C-D are computed first, then multiplied.",
    hint: "Two groups then multiplication.",
    level: "advanced",
    codeExample: "A B + C D - *"
  },
  {
    question: "What is the difference between prefix‑to‑postfix and prefix‑to‑infix?",
    shortAnswer: "The order of operands when combining: postfix uses left + right + operator.",
    explanation: "Infix uses left + operator + right.",
    hint: "Order of operands.",
    level: "intermediate",
    codeExample: "Not applicable"
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
    question: "Why is the first popped operand the left operand?",
    shortAnswer: "Because in prefix, the operator is followed by the left operand then the right operand.",
    explanation: "Since we scan from right to left, the last pushed operands are the rightmost operands.",
    hint: "Prefix order.",
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
    explanation: "B+C first, then multiplied by A.",
    hint: "Multiplication after addition.",
    level: "intermediate",
    codeExample: "A B C + *"
  },
  {
    question: "What is the output for prefix `+ A / * B C D`?",
    shortAnswer: "A B C * D / +",
    explanation: "B*C, then /D, then +A.",
    hint: "Order: *, /, +.",
    level: "advanced",
    codeExample: "A B C * D / +"
  },
  {
    question: "What is the output for prefix `^ ^ A B C`?",
    shortAnswer: "A B ^ C ^",
    explanation: "Prefix is left‑associative, so ^ ^ A B C becomes A B ^ C ^.",
    hint: "Left‑assoc.",
    level: "advanced",
    codeExample: "A B ^ C ^"
  },
  {
    question: "Why is the output not parenthesised?",
    shortAnswer: "Because postfix doesn't need parentheses.",
    explanation: "Postfix order eliminates the need for parentheses.",
    hint: "Postfix has no parentheses.",
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
  },
  {
    question: "What is the main disadvantage?",
    shortAnswer: "None significant – it's a straightforward algorithm.",
    explanation: "The algorithm is robust and widely used.",
    hint: "No major disadvantages.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "Is the algorithm used in real‑world applications?",
    shortAnswer: "Yes, in compilers and expression evaluators.",
    explanation: "It's a fundamental algorithm in compiler design.",
    hint: "Compilers.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the difference between this algorithm and evaluating prefix?",
    shortAnswer: "Evaluation operates on numbers; this algorithm operates on strings.",
    explanation: "The process is the same, but the data type changes.",
    hint: "Numbers vs strings.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the relationship between prefix and postfix?",
    shortAnswer: "They are mirror images: prefix has operator before operands; postfix has it after.",
    explanation: "Converting between them is a simple stack operation.",
    hint: "Symmetric.",
    level: "basic",
    codeExample: "Not applicable"
  }
];

export default questions;