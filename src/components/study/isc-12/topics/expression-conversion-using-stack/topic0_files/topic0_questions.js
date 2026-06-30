// topic0_questions.js
// 30 FAQs on "Introduction to Expressions" – basic to expert level.

const questions = [
  {
    question: "What is an expression in programming?",
    shortAnswer:
      "An expression is a combination of values, variables, operators, and function calls that evaluates to a single value.",
    explanation:
      "Every expression yields a result of a specific type (e.g., int, boolean). Expressions are the building blocks of statements and programs.",
    hint: "Think of an expression as a formula you'd write in a calculator.",
    level: "basic",
    codeExample: "int x = 5 + 3; // 5 + 3 is an expression",
  },
  {
    question: "What are operands?",
    shortAnswer: "Operands are the values or variables on which operators act.",
    explanation:
      "In the expression `a + b`, `a` and `b` are operands. They can be constants, variables, or sub-expressions.",
    hint: "Look at the expression `5 * 2` – which parts are the operands?",
    level: "basic",
    codeExample: "int result = 10 / 2; // 10 and 2 are operands",
  },
  {
    question: "What is an operator?",
    shortAnswer:
      "An operator is a symbol that tells the compiler to perform a specific mathematical, relational, or logical operation.",
    explanation:
      "Common operators include `+`, `-`, `*`, `/`, `%`, `==`, `&&`, etc. They define the operation to be performed on the operands.",
    hint: "Operators are like the verbs in a sentence – they do the action.",
    level: "basic",
    codeExample: "int sum = a + b; // '+' is the operator",
  },
  {
    question: "What does an expression evaluate to?",
    shortAnswer: "An expression evaluates to a single value of a specific data type.",
    explanation:
      "For example, `5 + 3` evaluates to `8` (int). `true && false` evaluates to `false` (boolean).",
    hint: "The result can be used in assignments or as part of larger expressions.",
    level: "basic",
    codeExample: "double area = 3.14 * radius * radius; // evaluates to a double",
  },
  {
    question: "What is operator precedence?",
    shortAnswer:
      "Operator precedence determines the order in which operators are evaluated in an expression.",
    explanation:
      "For example, multiplication (`*`) has higher precedence than addition (`+`). So `5 + 3 * 2` is treated as `5 + (3 * 2)`.",
    hint: "Remember PEMDAS from math: Parentheses, Exponents, Multiplication/Division, Addition/Subtraction.",
    level: "basic",
    codeExample: "int result = 10 + 5 * 2; // result is 20, not 30",
  },
  {
    question: "How do you change the order of evaluation?",
    shortAnswer: "Use parentheses `( )` to explicitly group sub-expressions.",
    explanation:
      "Parentheses override default precedence. For example, `(5 + 3) * 2` forces addition before multiplication.",
    hint: "Think of parentheses as a way to say 'do this first'.",
    level: "basic",
    codeExample: "int result = (10 + 5) * 2; // result is 30",
  },
  {
    question: "What is the difference between `=` and `==`?",
    shortAnswer: "`=` is assignment, `==` is equality comparison.",
    explanation:
      "Using `=` in a conditional like `if (x = 5)` will assign 5 to x and then evaluate the condition (often true). This is a common mistake.",
    hint: "In conditions, you almost always want `==` to compare.",
    level: "intermediate",
    codeExample: "if (x == 5) { } // correct; if (x = 5) { } // mistake",
  },
  {
    question: "What is type coercion in expressions?",
    shortAnswer:
      "Type coercion is the automatic conversion of one data type to another when performing an operation.",
    explanation:
      "For example, in Java, `5 + 3.0` results in a `double` because the int is coerced to double.",
    hint: "Be aware of unintended conversions, e.g., integer division.",
    level: "intermediate",
    codeExample: "double d = 5 / 2.0; // 2.5, not 2",
  },
  {
    question: "What is integer division?",
    shortAnswer:
      "Integer division is division where both operands are integers, resulting in an integer (truncated).",
    explanation:
      "In Java, `5 / 2` yields `2` because the fractional part is discarded. To get a floating-point result, at least one operand must be a floating-point number.",
    hint: "If you want exact division, cast to double or use a decimal literal.",
    level: "intermediate",
    codeExample: "int result = 5 / 2; // result = 2",
  },
  {
    question: "What is the remainder operator?",
    shortAnswer: "The remainder operator `%` returns the remainder of a division.",
    explanation: "For example, `7 % 3` yields `1`. It is often used to check evenness (e.g., `n % 2 == 0`).",
    hint: "Think of it as the leftover after division.",
    level: "basic",
    codeExample: "int remainder = 10 % 3; // remainder = 1",
  },
  {
    question: "What is a boolean expression?",
    shortAnswer:
      "A boolean expression is an expression that evaluates to either `true` or `false`.",
    explanation:
      "Examples: `5 > 3`, `x == y`, `!(a && b)`. Boolean expressions are used in conditionals and loops.",
    hint: "They are the questions we ask the program.",
    level: "basic",
    codeExample: "boolean isAdult = age >= 18;",
  },
  {
    question: "What is the ternary operator?",
    shortAnswer:
      "The ternary operator `? :` is a shorthand for an if-else statement that returns one of two values.",
    explanation:
      "Syntax: `condition ? valueIfTrue : valueIfFalse`. It's an expression, so it can be used inside larger expressions.",
    hint: "Use it for simple conditional assignments, not complex logic.",
    level: "intermediate",
    codeExample: "int max = (a > b) ? a : b;",
  },
  {
    question: "Can expressions be nested?",
    shortAnswer: "Yes, expressions can be nested inside other expressions.",
    explanation:
      "For example, `(a + b) * (c - d)` contains two sub‑expressions. Nesting allows complex computations.",
    hint: "Break nested expressions into steps for readability.",
    level: "intermediate",
    codeExample: "int result = (2 + 3) * (4 - 1); // 5 * 3 = 15",
  },
  {
    question: "What is short‑circuit evaluation?",
    shortAnswer:
      "Short‑circuit evaluation stops evaluating a logical expression as soon as the outcome is determined.",
    explanation:
      "In `true || anything`, the `anything` is not evaluated because the OR already yields true. Similarly, `false && anything` short‑circuits.",
    hint: "This can prevent null pointer exceptions: `if (obj != null && obj.isValid())`.",
    level: "intermediate",
    codeExample: "if (a != null && a.getValue() > 5) { }",
  },
  {
    question: "How do you handle operator precedence confusion?",
    shortAnswer: "Use parentheses to explicitly define the order.",
    explanation:
      "Even if you know precedence, adding parentheses makes the code clearer and less error‑prone for future readers.",
    hint: "When in doubt, add parentheses.",
    level: "intermediate",
    codeExample: "int result = (a + b) * (c - d); // clear intent",
  },
  {
    question: "What is a side effect in an expression?",
    shortAnswer:
      "A side effect occurs when an expression modifies some state (e.g., variable value) beyond returning a value.",
    explanation:
      "For example, `i++` has the side effect of incrementing `i`. Avoid side effects in complex expressions to reduce bugs.",
    hint: "Prefer expressions without side effects for clarity.",
    level: "advanced",
    codeExample: "int x = i++ + 2; // i is modified",
  },
  {
    question: "What is the difference between prefix and postfix increment?",
    shortAnswer:
      "Prefix `++i` increments then uses the value; postfix `i++` uses the value then increments.",
    explanation:
      "Both have side effects, but the order affects the result of the expression.",
    hint: "Try `int a = 5; int b = a++;` vs `int b = ++a;`.",
    level: "intermediate",
    codeExample: "int a = 5; int b = a++; // b=5, a=6",
  },
  {
    question: "Can an expression contain function calls?",
    shortAnswer: "Yes, function calls are valid expressions as long as they return a value.",
    explanation:
      "For example, `Math.max(10, 20)` returns 20 and can be used in an expression like `int result = Math.max(10, 20) + 5;`.",
    hint: "Function calls are evaluated before being used.",
    level: "intermediate",
    codeExample: "int max = Math.max(5, 9);",
  },
  {
    question: "What is a constant expression?",
    shortAnswer:
      "A constant expression is an expression whose value is known at compile time, typically using literals and compile‑time constants.",
    explanation:
      "Example: `5 * 10` is constant; `x + 2` (where x is a variable) is not.",
    hint: "Compiler can optimize constant expressions.",
    level: "intermediate",
    codeExample: "final int MAX = 100 + 50; // constant expression",
  },
  {
    question: "Why are expressions important in compilers?",
    shortAnswer:
      "Compilers parse expressions to generate machine code, often converting them to intermediate representations like postfix.",
    explanation:
      "Understanding expressions is crucial for compiler design and optimisation.",
    hint: "Expression conversions (infix, prefix, postfix) are used in compiler construction.",
    level: "advanced",
    codeExample: "Not applicable",
  },
  {
    question: "What is the difference between an expression and a statement?",
    shortAnswer:
      "An expression evaluates to a value; a statement performs an action and may not return a value.",
    explanation:
      "In Java, `x = 5` is an assignment expression (though often used as a statement) and `if (x > 0) { }` is a statement.",
    hint: "A statement may contain expressions.",
    level: "intermediate",
    codeExample: "int x = 10; // statement; 10 is an expression",
  },
  {
    question: "What is a literal expression?",
    shortAnswer: "A literal expression consists solely of a literal value, like `42`, `3.14`, `\"hello\"`.",
    explanation: "It is the simplest form of expression, directly representing a value.",
    hint: "Literals are the building blocks of more complex expressions.",
    level: "basic",
    codeExample: "int age = 25; // 25 is a literal expression",
  },
  {
    question: "How do you evaluate an expression mentally?",
    shortAnswer: "Apply operator precedence and associativity, step by step.",
    explanation:
      "Identify the highest‑precedence operators first, evaluate them, then proceed to lower ones, handling associativity (left‑to‑right for most).",
    hint: "Write down the sub‑expressions and evaluate them in order.",
    level: "intermediate",
    codeExample: "Evaluate `a + b * c - d` → compute `b*c` first, then add `a`, then subtract `d`.",
  },
  {
    question: "What is the role of type in expression evaluation?",
    shortAnswer: "The types of operands determine the resulting type and possible conversion.",
    explanation:
      "For instance, `int + int` yields int, `double + int` yields double due to widening.",
    hint: "Be mindful of implicit conversions.",
    level: "intermediate",
    codeExample: "double d = 5 / 2; // d = 2.0 because integer division",
  },
  {
    question: "What is a unary expression?",
    shortAnswer: "A unary expression uses one operand and a unary operator (e.g., `-x`, `++i`).",
    explanation: "Unary operators include `+`, `-`, `++`, `--`, `!`, etc.",
    hint: "They act on a single value.",
    level: "basic",
    codeExample: "int neg = -5;",
  },
  {
    question: "What is a binary expression?",
    shortAnswer: "A binary expression involves two operands and one binary operator (e.g., `a + b`).",
    explanation: "Most arithmetic and relational operators are binary.",
    hint: "Two operands, one operator.",
    level: "basic",
    codeExample: "int sum = a + b;",
  },
  {
    question: "What is an expression tree?",
    shortAnswer:
      "An expression tree is a hierarchical representation of an expression where leaves are operands and internal nodes are operators.",
    explanation:
      "Expression trees are used in compilers and interpreters to evaluate expressions efficiently.",
    hint: "Think of it as a parse tree for expressions.",
    level: "advanced",
    codeExample: "Not applicable",
  },
  {
    question: "How can you simplify complex expressions?",
    shortAnswer: "Break them into smaller parts using temporary variables.",
    explanation:
      "This improves readability and makes debugging easier. Modern compilers often optimise away the temporaries.",
    hint: "Write each sub‑expression on its own line.",
    level: "intermediate",
    codeExample:
      "int part1 = a * b; int part2 = c / d; int result = part1 + part2;",
  },
  {
    question: "What are the common operator precedence rules in Java?",
    shortAnswer:
      "Postfix > Unary > Multiplicative > Additive > Shift > Relational > Equality > Logical AND > Logical XOR > Logical OR > Ternary > Assignment.",
    explanation:
      "A comprehensive table is available in the Java Language Specification.",
    hint: "Use parentheses to avoid memorising.",
    level: "advanced",
    codeExample: "Not applicable",
  },
  {
    question: "What is the effect of using parentheses on performance?",
    shortAnswer:
      "Parentheses do not affect runtime performance; they only change evaluation order (which may affect the result).",
    explanation:
      "Compilers optimise expressions regardless of parentheses; they are purely for semantics and readability.",
    hint: "Don't worry about performance; write for clarity.",
    level: "advanced",
    codeExample: "Not applicable",
  },
  {
    question: "Why are expressions important in programming?",
    shortAnswer:
      "Expressions allow us to compute values, make decisions, and control program flow.",
    explanation:
      "Almost everything in a program involves expressions – from arithmetic to conditionals to method arguments.",
    hint: "They are the core of computation.",
    level: "basic",
    codeExample: "Not applicable",
  },
];

export default questions;