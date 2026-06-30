// topic42_questions.js
// 30 FAQs on "Common Errors in Expression Conversion" – basic to expert.

const questions = [
  {
    question: "What is the most common error in infix-to-postfix conversion?",
    shortAnswer: "Misapplying precedence (e.g., addition before multiplication).",
    explanation: "Always ensure that higher precedence operators are popped before lower precedence ones.",
    hint: "Remember PEMDAS.",
    level: "basic",
    codeExample: "while (precedence(stack.peek()) >= precedence(token)) { pop; } // Wrong for right-assoc"
  },
  {
    question: "What is the most common error in infix-to-prefix conversion?",
    shortAnswer: "Forgetting to reverse the final output.",
    explanation: "After applying the modified postfix algorithm to the reversed expression, you must reverse the result.",
    hint: "Reverse at the end.",
    level: "intermediate",
    codeExample: "return reverse(postfixLike);"
  },
  {
    question: "What is the scanning direction for prefix evaluation?",
    shortAnswer: "Right to left.",
    explanation: "Prefix expressions are evaluated from right to left using a stack.",
    hint: "Reverse direction.",
    level: "basic",
    codeExample: "for (int i = tokens.length - 1; i >= 0; i--)"
  },
  {
    question: "What is the scanning direction for postfix evaluation?",
    shortAnswer: "Left to right.",
    explanation: "Postfix expressions are evaluated from left to right using a stack.",
    hint: "Forward direction.",
    level: "basic",
    codeExample: "for (String token : tokens)"
  },
  {
    question: "In postfix evaluation, which operand is popped first?",
    shortAnswer: "The right operand.",
    explanation: "The first popped is the right operand, the second is the left.",
    hint: "Right first.",
    level: "intermediate",
    codeExample: "double right = stack.pop(); double left = stack.pop();"
  },
  {
    question: "In prefix evaluation, which operand is popped first?",
    shortAnswer: "The left operand.",
    explanation: "The first popped is the left operand, the second is the right.",
    hint: "Left first.",
    level: "intermediate",
    codeExample: "double left = stack.pop(); double right = stack.pop();"
  },
  {
    question: "What is the associativity of exponentiation in mathematics?",
    shortAnswer: "Right-associative.",
    explanation: "A^B^C is interpreted as A^(B^C), not (A^B)^C.",
    hint: "Right to left.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What happens if you treat exponentiation as left-associative in conversion?",
    shortAnswer: "You get the wrong postfix/prefix representation.",
    explanation: "A^B^C should be ABC^^ in postfix, but left-assoc would give AB^C^.",
    hint: "Associativity matters.",
    level: "advanced",
    codeExample: "ABC^^ (correct) vs AB^C^ (wrong)"
  },
  {
    question: "What is the consequence of forgetting to pop remaining operators at the end of conversion?",
    shortAnswer: "The output will be incomplete.",
    explanation: "Operators left in the stack must be appended to the output.",
    hint: "Clear the stack.",
    level: "basic",
    codeExample: "while (!stack.isEmpty()) output.append(stack.pop());"
  },
  {
    question: "Why is it important to check for division by zero in evaluation?",
    shortAnswer: "It prevents runtime errors and undefined results.",
    explanation: "Division by zero is mathematically undefined and should be handled.",
    hint: "Validation.",
    level: "basic",
    codeExample: "if (right == 0) throw new ArithmeticException();"
  },
  {
    question: "What is a symbol table and why is it used?",
    shortAnswer: "A map that stores variable values for evaluation.",
    explanation: "Used to look up values of variables when evaluating expressions.",
    hint: "Map for variables.",
    level: "intermediate",
    codeExample: "Map<String, Double> variables = new HashMap<>();"
  },
  {
    question: "What happens if you try to evaluate an expression with an undefined variable?",
    shortAnswer: "It should throw an error.",
    explanation: "The evaluator must check if the variable exists in the symbol table.",
    hint: "Check existence.",
    level: "intermediate",
    codeExample: "if (!variables.containsKey(token)) throw new IllegalArgumentException();"
  },
  {
    question: "Why is it important to use parentheses in infix output?",
    shortAnswer: "To preserve the correct precedence and avoid ambiguity.",
    explanation: "Without parentheses, the expression can be interpreted differently.",
    hint: "Precedence.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is a common mistake when converting `(A+B)*C` to prefix?",
    shortAnswer: "Forgetting the outer parentheses.",
    explanation: "The correct prefix is `* + A B C`, but without proper handling you might get `+ A * B C`.",
    hint: "Check grouping.",
    level: "advanced",
    codeExample: "* + A B C (correct)"
  },
  {
    question: "How can you avoid operand order errors?",
    shortAnswer: "Always remember the rule: postfix → right first; prefix → left first.",
    explanation: "Use comments or helper names to remind yourself.",
    hint: "Right for postfix, left for prefix.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the most common error in evaluating postfix expressions with variables?",
    shortAnswer: "Using integer division instead of floating-point.",
    explanation: "If values are integers, division truncates. Use double to preserve precision.",
    hint: "Use double.",
    level: "intermediate",
    codeExample: "Stack<Double> stack = new Stack<>();"
  },
  {
    question: "What is a good debugging strategy for conversion errors?",
    shortAnswer: "Print the stack and output at each step.",
    explanation: "Manual tracing helps identify where the logic diverges.",
    hint: "Trace.",
    level: "basic",
    codeExample: "System.out.println(\"Step: \" + step + \" Stack: \" + stack);"
  },
  {
    question: "Why is it important to handle spaces in expressions?",
    shortAnswer: "To correctly tokenize multi-character operands.",
    explanation: "Spaces separate tokens for parsing.",
    hint: "Tokenization.",
    level: "basic",
    codeExample: "String[] tokens = expr.split(\"\\s+\");"
  },
  {
    question: "What is a common mistake in infix-to-prefix conversion with parentheses?",
    shortAnswer: "Not swapping parentheses correctly after reversing.",
    explanation: "After reversal, '(' must be swapped with ')' and vice versa.",
    hint: "Swap parentheses.",
    level: "advanced",
    codeExample: "if (c == '(') sb.append(')'); else if (c == ')') sb.append('(');"
  },
  {
    question: "How can you ensure associativity is handled correctly?",
    shortAnswer: "Use a set of right-associative operators and only pop equal precedence if the operator is left-associative.",
    explanation: "For right-associative, do not pop equal precedence.",
    hint: "Right-assoc: no equal pop.",
    level: "advanced",
    codeExample: "if (isRightAssoc(ch)) { while (precedence(top) > precedence(ch)) pop; }"
  },
  {
    question: "What is the result of evaluating `5 3 /` incorrectly with integer division?",
    shortAnswer: "1 (if using int) or 1.666... (if using double).",
    explanation: "Integer division truncates. Use double for accuracy.",
    hint: "Precision.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is a common error when evaluating prefix expressions?",
    shortAnswer: "Scanning left-to-right instead of right-to-left.",
    explanation: "Prefix requires right-to-left scanning.",
    hint: "Reverse scan.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "How do you fix a bug where `A+B*C` converts to `AB+C*` in postfix?",
    shortAnswer: "Ensure that `*` has higher precedence than `+`, so pop `*` before pushing `+`.",
    explanation: "The bug occurs when `+` is pushed before popping `*`.",
    hint: "Precedence.",
    level: "advanced",
    codeExample: "while (precedence(stack.peek()) >= precedence(token)) pop; // wrong if not considering associativity"
  },
  {
    question: "Why is it important to check for stack underflow during evaluation?",
    shortAnswer: "To prevent runtime errors from malformed expressions.",
    explanation: "If there aren't enough operands for an operator, the expression is invalid.",
    hint: "Validation.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is a common mistake when converting `(A+B)*(C-D)` to prefix?",
    shortAnswer: "Getting the operand order wrong for subtraction.",
    explanation: "The prefix should be `* + A B - C D`.",
    hint: "Check order.",
    level: "advanced",
    codeExample: "* + A B - C D (correct)"
  },
  {
    question: "How can you avoid missing parentheses in infix output?",
    shortAnswer: "Always wrap every combined expression in parentheses during postfix-to-infix conversion.",
    explanation: "This ensures precedence is preserved.",
    hint: "Always wrap.",
    level: "intermediate",
    codeExample: "infix = \"(\" + left + \" \" + op + \" \" + right + \")\";"
  },
  {
    question: "What is the first thing to check when your conversion output is wrong?",
    shortAnswer: "Check the scanning direction and operand order.",
    explanation: "These are the most common sources of error.",
    hint: "Direction and order.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is a good way to test conversion algorithms?",
    shortAnswer: "Write unit tests with known correct outputs.",
    explanation: "Test simple expressions first, then complex ones.",
    hint: "Unit tests.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "Why is it important to handle parentheses correctly in conversions?",
    shortAnswer: "Parentheses override precedence and must be preserved.",
    explanation: "They indicate grouping that must be maintained.",
    hint: "Grouping.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is a common mistake when converting `A+B-C` to postfix?",
    shortAnswer: "Treating it as right-associative instead of left-associative.",
    explanation: "Subtraction is left-associative, so it should be `AB+C-` not `ABC-+`.",
    hint: "Left-assoc.",
    level: "advanced",
    codeExample: "AB+C- (correct)"
  }
];

export default questions;