/**
 * Module 001_003: Topic 0: Operands, operators, and expression evaluation in Java
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is an Operator and what is an Operand in Java?",
    shortAnswer: "An Operator is a symbol that performs a specific computation; an Operand is the data value, variable, or sub-expression acted upon by the operator.",
    explanation: "In the expression `a + 5`, `+` is the operator, while `a` and literal `5` are the operands.",
    hint: "Operator = action symbol; Operand = target value/variable.",
    level: "basic",
    codeExample: "int sum = a + b; // '+' is operator; 'a' and 'b' are operands"
  },
  {
    question: "How are operators classified by 'Arity' in Java?",
    shortAnswer: "Unary (1 operand), Binary (2 operands), and Ternary (3 operands).",
    explanation: "Unary operators include `++`, `--`, `!`, `~`, `+`, `-`. Binary operators include `+`, `-`, `*`, `/`, `%`, `==`, `&&`, etc. Java has exactly one Ternary operator: `? :`.",
    hint: "1 operand = Unary, 2 = Binary, 3 = Ternary.",
    level: "basic",
    codeExample: "int u = -x;            // Unary\nint b = x + y;         // Binary\nint t = (x > y) ? x : y; // Ternary"
  },
  {
    question: "What is the difference between an Expression, a Statement, and a Block in Java?",
    shortAnswer: "An Expression produces a value; a Statement executes an action; a Block `{ ... }` groups zero or more statements.",
    explanation: "`a + b` is an expression. `int sum = a + b;` is a statement. `{ int x = 1; int y = 2; }` is a block.",
    hint: "Expression = produces value; Statement = unit of execution; Block = grouped statements.",
    level: "basic",
    codeExample: "// Expression: x * 2\n// Statement: int y = x * 2;\n// Block: { int a = 1; int b = 2; }"
  },
  {
    question: "What is the Java Language Specification (JLS §15.7) rule for Operand Evaluation Order?",
    shortAnswer: "Java strictly evaluates operands from Left to Right before the operator is applied.",
    explanation: "Unlike C/C++ where operand evaluation order is undefined/compiler-dependent, Java guarantees that the left-hand operand is completely evaluated before any part of the right-hand operand is evaluated.",
    hint: "Strict Left-to-Right evaluation guarantee.",
    level: "intermediate",
    codeExample: "int x = 5;\nint result = (x = 10) + (x * 2); // (x = 10) evaluates first → 10 + 20 = 30"
  },
  {
    question: "What is Operator Precedence in Java?",
    shortAnswer: "The set of rules that defines which operators are evaluated first when multiple operators are present in an expression.",
    explanation: "For example, in `a + b * c`, multiplication `*` has higher precedence than addition `+`, so `b * c` is evaluated before adding `a`.",
    hint: "Determines operator execution priority.",
    level: "basic",
    codeExample: "int val = 10 + 5 * 2; // Evaluates as 10 + (5 * 2) = 20"
  },
  {
    question: "What is Operator Associativity?",
    shortAnswer: "The direction (Left-to-Right or Right-to-Left) in which operators with equal precedence are grouped and evaluated.",
    explanation: "Most binary operators (like `+`, `-`, `*`, `/`) are Left-to-Right associative: `10 - 5 - 2` is evaluated as `(10 - 5) - 2 = 3`. Assignment operators (`=`, `+=`) and the ternary operator (`? :`) are Right-to-Left associative.",
    hint: "Breaks ties between operators of identical precedence.",
    level: "intermediate",
    codeExample: "int a, b, c;\na = b = c = 10; // Right-to-Left: c = 10, then b = 10, then a = 10"
  },
  {
    question: "How can a developer override the default operator precedence in an expression?",
    shortAnswer: "By using parentheses `( )`.",
    explanation: "Parentheses have the highest precedence in Java and force explicit sub-expression evaluation, while enhancing code clarity and readability.",
    hint: "Use parentheses ( ) for explicit grouping.",
    level: "basic",
    codeExample: "int val = (10 + 5) * 2; // 15 * 2 = 30"
  },
  {
    question: "What is an Expression Statement in Java?",
    shortAnswer: "An expression that can stand on its own as a valid statement when terminated with a semicolon.",
    explanation: "Only specific expressions can become statements: assignment expressions (`x = 1;`), increment/decrement expressions (`x++;`), method invocations (`System.out.println();`), and object creation expressions (`new Student();`).",
    hint: "Expressions allowed as standalone statements.",
    level: "intermediate",
    codeExample: "x++;              // Valid expression statement\n// x + 5;        // COMPILER ERROR: Not a statement!"
  },
  {
    question: "What is Constant Folding in expression evaluation?",
    shortAnswer: "A compiler optimization where expressions consisting entirely of compile-time constants are evaluated at compile time rather than runtime.",
    explanation: "`javac` simplifies `int secondsInDay = 24 * 60 * 60;` directly into literal `86400` in the generated bytecode.",
    hint: "Compile-time evaluation of constant expressions.",
    level: "advanced",
    codeExample: "int total = 10 + 20 * 3; // Compiled as 'bipush 70' in bytecode"
  },
  {
    question: "What is the return type of a Relational Expression (e.g. `a > b`)?",
    shortAnswer: "`boolean` (`true` or `false`).",
    explanation: "All relational comparison operators (`>`, `<`, `>=`, `<=`, `==`, `!=`) evaluate to the primitive type `boolean`.",
    hint: "Relational operators always return boolean.",
    level: "basic",
    codeExample: "boolean isEligible = (marks >= 80);"
  },
  {
    question: "What is Side Effect in expression evaluation?",
    shortAnswer: "A modification of program state (like changing a variable or performing I/O) that occurs during the evaluation of an expression.",
    explanation: "Operators like `++`, `--`, and `=` produce side effects because they alter variable memory values while computing a result.",
    hint: "State changes during expression execution.",
    level: "intermediate",
    codeExample: "int x = 5;\nint y = ++x; // Side effect: x changes to 6"
  },
  {
    question: "What is the danger of writing expressions with multiple side effects on the same variable?",
    shortAnswer: "It creates confusing, unmaintainable code that is prone to subtle bugs and misunderstandings.",
    explanation: "Writing expressions like `a = a++ + ++a` is an anti-pattern. Code should always be written cleanly and clearly.",
    hint: "Multiple side effects make code fragile and unreadable.",
    level: "intermediate",
    codeExample: "// Anti-pattern: int z = x++ + ++x;\n// Clean: x++; int z = x + (x + 1);"
  },
  {
    question: "What is an Infix, Prefix, and Postfix operator in Java?",
    shortAnswer: "Infix sits between operands (`a + b`); Prefix sits before its operand (`++a`); Postfix sits after its operand (`a++`).",
    explanation: "Binary operators are infix; unary operators can be prefix or postfix.",
    hint: "Infix = middle, Prefix = before, Postfix = after.",
    level: "basic",
    codeExample: "++x;   // Prefix\nx++;   // Postfix\nx + y; // Infix"
  },
  {
    question: "What are the only operators in Java that evaluate Right-to-Left?",
    shortAnswer: "Unary operators (`++`, `--`, `+`, `-`, `!`, `~`, `(type)`), Assignment operators (`=`, `+=`, etc.), and the Ternary operator (`? :`).",
    explanation: "All other arithmetic, relational, bitwise, and logical binary operators evaluate Left-to-Right.",
    hint: "Unary, Assignment, and Ternary are Right-to-Left.",
    level: "advanced",
    codeExample: "a = b = c = 5; // Evaluates c=5, then b=5, then a=5"
  },
  {
    question: "What is Short-Circuiting in boolean expression evaluation?",
    shortAnswer: "Stopping evaluation as soon as the final truth value is determined (e.g. `false && ...` or `true || ...`).",
    explanation: "In `a && b`, if `a` is false, `b` is never evaluated because the outcome is guaranteed to be false.",
    hint: "Short-circuit stops evaluation early.",
    level: "basic",
    codeExample: "if (student != null && student.hasPaidFee()) { }"
  },
  {
    question: "Can user-defined operator overloading be implemented in Java?",
    shortAnswer: "No, Java does not support user-defined operator overloading (unlike C++ or Kotlin).",
    explanation: "In Java, only the `+` operator is built-in overloaded by the language specification for String concatenation alongside numeric addition.",
    hint: "Java deliberately omits custom operator overloading for simplicity.",
    level: "intermediate",
    codeExample: "// In Java, you write: matrix.add(matrixB) instead of matrix + matrixB"
  },
  {
    question: "What happens when an expression contains mixed data types (e.g. `int + double`)?",
    shortAnswer: "Java performs Binary Numeric Promotion, widening the narrower type to match the wider type before evaluation.",
    explanation: "In `5 + 2.5`, `5` is promoted to `5.0` (double), and the addition yields `7.5` of type `double`.",
    hint: "Widening promotion automatically converts narrower types.",
    level: "basic",
    codeExample: "double total = 100 + 15.5; // 100 becomes 100.0 → total is 115.5"
  },
  {
    question: "What is an lvalue and rvalue concept in Java expression assignments?",
    shortAnswer: "An lvalue is a variable memory location that can receive an assignment; an rvalue is the evaluated value assigned to the lvalue.",
    explanation: "In `x = a + b`, `x` is the lvalue (left-hand side variable target), and `a + b` is the rvalue (computed value). Writing `5 = x;` is a compile error because `5` is not a variable.",
    hint: "lvalue = variable target; rvalue = value to assign.",
    level: "intermediate",
    codeExample: "int x = 10; // 'x' is lvalue, '10' is rvalue"
  },
  {
    question: "What is the result of `10 + 20 + \"Barrackpore\"` vs `\"Barrackpore\" + 10 + 20`?",
    shortAnswer: "`30Barrackpore` vs `Barrackpore1020`.",
    explanation: "Because `+` associates Left-to-Right: `10 + 20 + \"B\"` evaluates `10 + 20 = 30` first, then converts to String `\"30Barrackpore\"`. `\"B\" + 10 + 20` converts `10` to String `\"Barrackpore10\"`, then concatenates `20` to make `\"Barrackpore1020\"`.",
    hint: "Left-to-right association dictates arithmetic vs string concatenation.",
    level: "intermediate",
    codeExample: "System.out.println(10 + 20 + \"B\"); // \"30B\"\nSystem.out.println(\"B\" + 10 + 20); // \"B1020\""
  },
  {
    question: "How does the ternary operator `? :` infer its return type?",
    shortAnswer: "It infers the common super-type or performs numeric promotion between the second and third operands.",
    explanation: "In `condition ? 10 : 20.5`, `10` (int) is promoted to `10.0` (double), so the entire ternary expression returns a `double`.",
    hint: "Promotes to the wider type of the two result branches.",
    level: "advanced",
    codeExample: "double res = true ? 10 : 20.5; // Evaluates to 10.0 (double)"
  },
  {
    question: "What is the result of `System.out.println(1 + 2 * 3 / 2 - 1);`?",
    shortAnswer: "`3`.",
    explanation: "Precedence & associativity: `2 * 3` is `6`. `6 / 2` is `3`. `1 + 3` is `4`. `4 - 1` is `3`.",
    hint: "Multiplication and division first (left to right), then addition and subtraction.",
    level: "basic",
    codeExample: "int val = 1 + 2 * 3 / 2 - 1; // 3"
  },
  {
    question: "What is an operand stack in JVM bytecode execution?",
    shortAnswer: "The LIFO (Last-In First-Out) memory stack within a stack frame used by bytecode instructions to push operands and pop results.",
    explanation: "Every expression (like `iadd` or `imul`) pops its operands from the JVM operand stack and pushes the computed result back onto the stack.",
    hint: "JVM executes expressions on an internal operand stack.",
    level: "advanced",
    codeExample: "// Bytecode: iload_1, iload_2, iadd, istore_3"
  },
  {
    question: "Can an expression have a `void` return type?",
    shortAnswer: "No, expressions always produce a value; methods with `void` return cannot be used as operands in expressions.",
    explanation: "Writing `int x = 5 + System.out.println(\"Hi\");` is a compilation error because `println()` returns `void`.",
    hint: "Expressions must produce a value.",
    level: "basic",
    codeExample: "// int x = 5 + System.out.println(); // COMPILER ERROR: 'void' type not allowed"
  },
  {
    question: "What is the maximum number of operands that a single Java operator can take?",
    shortAnswer: "`3` (the ternary conditional operator `? :`).",
    explanation: "Java has no operators that take 4 or more operands.",
    hint: "Ternary operator is the maximum with 3 operands.",
    level: "basic",
    codeExample: "String s = (a > b) ? \"A\" : \"B\";"
  },
  {
    question: "What is the difference between bitwise `&` and logical `&&` when evaluated in expressions?",
    shortAnswer: "`&` always evaluates both operands (eager); `&&` short-circuits if the left operand is false.",
    explanation: "`&` is also a bitwise operator for integers, while `&&` only operates on booleans.",
    hint: "&& is short-circuit boolean; & is eager boolean or bitwise integer.",
    level: "basic",
    codeExample: "boolean b1 = false && (++x > 0); // x is not incremented\nboolean b2 = false & (++x > 0);  // x IS incremented"
  },
  {
    question: "What is the effect of redundant parentheses in Java expressions?",
    shortAnswer: "No runtime performance penalty; the compiler strips redundant parentheses during parsing.",
    explanation: "Using parentheses like `int x = (a * b) + c;` improves human readability without adding bytecode overhead.",
    hint: "Parentheses enhance readability with zero bytecode penalty.",
    level: "basic",
    codeExample: "int total = (qty * price) + ((qty * price) * taxRate);"
  },
  {
    question: "Can an assignment expression be nested inside another expression in Java?",
    shortAnswer: "Yes, because an assignment expression evaluates to the assigned value.",
    explanation: "`x = (y = 20) + 5;` assigns `20` to `y`, and `x` becomes `25`.",
    hint: "Assignment evaluates to the assigned value.",
    level: "intermediate",
    codeExample: "int x, y;\nx = (y = 20) + 5; // y is 20, x is 25"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student fee calculation, how is the weighted score evaluated?",
    shortAnswer: "`weightedScore = (theoryMarks * 0.6) + (practicalMarks * 0.4);`",
    explanation: "Multiplication precedes addition, producing a clean weighted percentage without floating-point distortion.",
    hint: "Standard weighted formula with precedence.",
    level: "basic",
    codeExample: "double finalGrade = (theory * 0.6) + (practical * 0.4);"
  },
  {
    question: "What is the ultimate takeaway of Topic 0 for Module 001_003?",
    shortAnswer: "Understanding how Java classifies operators by arity, enforces strict left-to-right operand evaluation (JLS §15.7), and resolves precedence sets the stage for mastering all 22 operator topics.",
    explanation: "Mastering the fundamental grammar of operators and expressions prevents subtle bugs in algorithms and financial formulas.",
    hint: "Foundation for all operator mechanics in Java.",
    level: "basic",
    codeExample: "// Summary: Arity (Unary/Binary/Ternary), JLS §15.7 Left-to-Right, Precedence & Associativity"
  },
  {
    question: "What is the next topic (Topic 1) in Module 001_003?",
    shortAnswer: "Arithmetic operators: addition (+), subtraction (-), multiplication (*), division (/), modulus (%).",
    explanation: "Topic 1 dives deeply into arithmetic operators, integer division truncation vs float division, and modulus arithmetic.",
    hint: "Arithmetic operators in Java.",
    level: "basic",
    codeExample: "// Topic 1: +, -, *, /, %"
  }
];

export default questions;
