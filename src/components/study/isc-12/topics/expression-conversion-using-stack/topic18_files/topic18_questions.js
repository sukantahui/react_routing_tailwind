// topic18_questions.js
// 30 FAQs on "Example of Infix to Prefix using Stack" – basic to expert.

const questions = [
  // ---- BASIC (1-6) ----
  {
    question: "What is the primary data structure used in infix‑to‑prefix conversion?",
    shortAnswer: "A stack.",
    explanation: "The stack temporarily holds operators and parentheses until they are output in the correct order.",
    hint: "Think of a LIFO structure.",
    level: "basic",
    codeExample: "Stack<Character> stack = new Stack<>();"
  },
  {
    question: "What are the four main steps of the infix‑to‑prefix algorithm?",
    shortAnswer: "Reverse infix, swap parentheses, apply modified postfix, reverse output.",
    explanation: "The algorithm is a mirror of postfix conversion with a key modification.",
    hint: "Remember 'reverse, swap, postfix, reverse'.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "Why do we reverse the infix expression in the algorithm?",
    shortAnswer: "To enable right‑to‑left scanning, which matches prefix evaluation order.",
    explanation: "Prefix is evaluated from right to left; reversing allows us to use a left‑to‑right scan.",
    hint: "It's a trick to reuse postfix logic.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "Why do we swap parentheses after reversing?",
    shortAnswer: "To preserve the correct grouping of sub‑expressions.",
    explanation: "Reversing changes the nesting; swapping '(' and ')' restores the intended grouping.",
    hint: "Grouping must remain correct.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the key difference between the postfix algorithm and the modified algorithm used for prefix?",
    shortAnswer: "We do NOT pop operators of equal precedence in the modified algorithm.",
    explanation: "Because prefix is right‑associative, operators of equal precedence should stay on the stack.",
    hint: "Associativity is reversed.",
    level: "intermediate",
    codeExample: "while (precedence(stack.peek()) > precedence(token)) { pop; } // only greater, not equal"
  },
  {
    question: "What is the final step of the algorithm?",
    shortAnswer: "Reverse the output obtained from the modified postfix step.",
    explanation: "The output is the reverse of the correct prefix expression.",
    hint: "Reverse again.",
    level: "basic",
    codeExample: "return reverse(output);"
  },

  // ---- INTERMEDIATE (7-15) ----
  {
    question: "What is the output for infix `A+B` using the stack algorithm?",
    shortAnswer: "+AB",
    explanation: "Reverse → B+A; postfix‑like → BA+; reverse → +AB.",
    hint: "Simple case.",
    level: "basic",
    codeExample: "+AB"
  },
  {
    question: "What is the output for infix `A+B*C`?",
    shortAnswer: "+A*BC",
    explanation: "Reverse → C*B+A; postfix‑like → CB*A+; reverse → +A*BC.",
    hint: "Multiplication first.",
    level: "intermediate",
    codeExample: "+A*BC"
  },
  {
    question: "What is the output for infix `(A+B)*C`?",
    shortAnswer: "*+ABC",
    explanation: "Reverse → C*(B+A); postfix‑like → CBA+*; reverse → *+ABC.",
    hint: "Parentheses force addition first.",
    level: "intermediate",
    codeExample: "*+ABC"
  },
  {
    question: "What is the output for infix `A*B+C*D`?",
    shortAnswer: "+*AB*CD",
    explanation: "Reverse → D*C+B*A; postfix‑like → DC*BA*+; reverse → +*AB*CD.",
    hint: "Multiplications first, then addition.",
    level: "advanced",
    codeExample: "+*AB*CD"
  },
  {
    question: "What is the output for infix `A+B*C-D`?",
    shortAnswer: "-+A*BCD",
    explanation: "Reverse → D-C*B+A; postfix‑like → DCB*A+-; reverse → -+A*BCD.",
    hint: "Subtraction after multiplication and addition.",
    level: "advanced",
    codeExample: "-+A*BCD"
  },
  {
    question: "What is the output for infix `A^B^C` (right‑associative)?",
    shortAnswer: "^^ABC",
    explanation: "Reverse → C^B^A; postfix‑like (no equal pop) → CB^A^; reverse → ^^ABC.",
    hint: "Exponentiation is right‑associative.",
    level: "advanced",
    codeExample: "^^ABC"
  },
  {
    question: "What is the output for infix `(A+B)*(C-D)`?",
    shortAnswer: "*+AB-CD",
    explanation: "Reverse → (D-C)*(B+A); postfix‑like → DC-BA+*; reverse → *+AB-CD.",
    hint: "Two parenthesised groups.",
    level: "advanced",
    codeExample: "*+AB-CD"
  },
  {
    question: "What is the output for infix `A*(B+C)-D/E`?",
    shortAnswer: "-*A+BC/DE",
    explanation: "Reverse → E/D-C+B*A; postfix‑like → EDCB+A*-; reverse → -*A+BC/DE.",
    hint: "Complex precedence.",
    level: "expert",
    codeExample: "-*A+BC/DE"
  },
  {
    question: "What happens when the stack is empty and a ')' is encountered?",
    shortAnswer: "An error (mismatched parentheses) is thrown.",
    explanation: "This indicates an invalid expression with an extra closing parenthesis.",
    hint: "Check for validity.",
    level: "intermediate",
    codeExample: "throw new IllegalArgumentException('Mismatched parentheses');"
  },

  // ---- ADVANCED (16-24) ----
  {
    question: "How does the algorithm handle spaces in the input?",
    shortAnswer: "It typically ignores them.",
    explanation: "Spaces are not part of the expression and should be skipped during scanning.",
    hint: "Ignore whitespace.",
    level: "basic",
    codeExample: "if (Character.isWhitespace(ch)) continue;"
  },
  {
    question: "What is the time complexity of the algorithm?",
    shortAnswer: "O(n), where n is the length of the expression.",
    explanation: "Each character is processed once, and each operator is pushed and popped at most once.",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the space complexity?",
    shortAnswer: "O(n) due to the stack and temporary strings.",
    explanation: "The stack and output string grow proportionally to the expression length.",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "Can the algorithm handle multi‑character operands (e.g., `var`)?",
    shortAnswer: "Not directly; it requires a tokeniser to treat them as single tokens.",
    explanation: "The basic algorithm assumes single‑character operands.",
    hint: "Need to tokenise.",
    level: "advanced",
    codeExample: "Not applicable"
  },
  {
    question: "What is the difference in associativity handling between prefix and postfix?",
    shortAnswer: "Prefix is effectively right‑associative, so equal precedence is not popped; postfix is left‑associative, so equal precedence is popped.",
    explanation: "This is why the modified algorithm uses '>' instead of '>=' for precedence comparison.",
    hint: "Right vs left associativity.",
    level: "advanced",
    codeExample: "while (precedence(stack.peek()) > precedence(token)) // prefix\nwhile (precedence(stack.peek()) >= precedence(token)) // postfix"
  },
  {
    question: "How would you implement the algorithm in Java?",
    shortAnswer: "Use `Stack<Character>` and `StringBuilder`, with helper functions for reversing and swapping.",
    explanation: "Implement precedence map, operand checks, and the modified postfix logic.",
    hint: "Follow the pseudocode.",
    level: "advanced",
    codeExample: "public static String infixToPrefix(String infix) { ... }"
  },
  {
    question: "What is the role of the `isOperator` function?",
    shortAnswer: "It checks if a character is one of the supported operators (+, -, *, /, ^).",
    explanation: "This is used to decide how to process the token.",
    hint: "Operator check.",
    level: "basic",
    codeExample: "private static boolean isOperator(char c) { return PRECEDENCE.containsKey(c); }"
  },
  {
    question: "What is the role of the `isOperand` function?",
    shortAnswer: "It checks if a character is a letter or digit (operand).",
    explanation: "Operands are appended directly to the output.",
    hint: "Operand check.",
    level: "basic",
    codeExample: "private static boolean isOperand(char c) { return Character.isLetterOrDigit(c); }"
  },
  {
    question: "What happens if the input contains characters other than operands, operators, or parentheses?",
    shortAnswer: "An error is thrown.",
    explanation: "Invalid characters are not allowed.",
    hint: "Validation.",
    level: "intermediate",
    codeExample: "throw new IllegalArgumentException('Invalid character: ' + ch);"
  },

  // ---- EXPERT (25-30) ----
  {
    question: "How can you adapt the algorithm for unary operators (e.g., negative numbers)?",
    shortAnswer: "You need to distinguish unary minus from binary minus, often by marking or using a different symbol.",
    explanation: "Unary operators have higher precedence and require special handling.",
    hint: "Special case.",
    level: "expert",
    codeExample: "if (token == '-' && (prev == '(' || prev == null)) { // unary minus }"
  },
  {
    question: "What is the output for infix `A-B-C` using the stack algorithm?",
    shortAnswer: "--ABC",
    explanation: "Reverse → C-B-A; postfix‑like → CB-A-; reverse → --ABC.",
    hint: "Left‑associative but prefix handles differently.",
    level: "advanced",
    codeExample: "--ABC"
  },
  {
    question: "What is the output for infix `(A^B)^C`?",
    shortAnswer: "^ ^ A B C? Actually it's ^^ABC? Let's check: (A^B)^C = ^(^AB)C = ^^ABC. So output is ^^ABC.",
    explanation: "Parentheses force left‑assoc, but prefix notation still yields ^^ABC.",
    hint: "Parentheses but exponentiation.",
    level: "expert",
    codeExample: "^^ABC"
  },
  {
    question: "How do you test the algorithm thoroughly?",
    shortAnswer: "Write unit tests with various expressions, including edge cases (empty, single operand).",
    explanation: "Compare the output with known correct prefix expressions.",
    hint: "Testing.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the significance of the `swapParentheses` step?",
    shortAnswer: "It ensures correct grouping after reversal by flipping the direction of nesting.",
    explanation: "Without swapping, parentheses would be inverted, breaking the expression structure.",
    hint: "Grouping restoration.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "Can the algorithm be used to convert expressions with functions (e.g., `sin(x)`)?",
    shortAnswer: "Yes, if functions are treated as operators with highest precedence and parentheses are handled.",
    explanation: "You need to extend the tokeniser to recognise function names.",
    hint: "Extend the parser.",
    level: "expert",
    codeExample: "Not applicable"
  }
];

export default questions;