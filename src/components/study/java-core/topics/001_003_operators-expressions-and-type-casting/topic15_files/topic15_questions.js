/**
 * Module 001_003: Topic 15: Ternary / Conditional operator (? :) syntax and nested ternary expressions
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the syntax of the Ternary / Conditional Operator in Java?",
    shortAnswer: "`condition ? expressionIfTrue : expressionIfFalse`",
    explanation: "It evaluates `condition`. If true, it returns `expressionIfTrue`; if false, it returns `expressionIfFalse`.",
    hint: "condition ? trueExpr : falseExpr",
    level: "basic",
    codeExample: "String result = (score >= 40) ? \"Pass\" : \"Fail\";"
  },
  {
    question: "Why is the conditional operator `? :` called 'Ternary'?",
    shortAnswer: "Because it is the only operator in Java that takes three operands: condition, true expression, and false expression.",
    explanation: "Unary takes 1 operand, Binary takes 2, Ternary takes 3.",
    hint: "Takes 3 operands.",
    level: "basic",
    codeExample: "int max = (a > b) ? a : b;"
  },
  {
    question: "Does the Ternary operator guarantee short-circuit evaluation of its branches?",
    shortAnswer: "Yes! Only ONE of the two branch expressions is evaluated at runtime; the unselected branch is completely skipped.",
    explanation: "In `(divisor != 0) ? (total / divisor) : 0`, if `divisor` is 0, the division is never executed, preventing `ArithmeticException`.",
    hint: "Unselected branch is never evaluated.",
    level: "basic",
    codeExample: "int avg = (count != 0) ? (sum / count) : 0; // Safe!"
  },
  {
    question: "What is the evaluated type of `true ? 10 : 20.5` in Java (JLS §15.25)?",
    shortAnswer: "`double` (evaluates to `10.0`).",
    explanation: "When one branch is `int` and the other is `double`, Binary Numeric Promotion promotes the entire ternary expression to `double`.",
    hint: "Promoted to the wider type (double).",
    level: "intermediate",
    codeExample: "double d = true ? 10 : 20.5; // d is 10.0"
  },
  {
    question: "What is the associativity direction of the Ternary Operator in Java?",
    shortAnswer: "Right-to-Left.",
    explanation: "An unparenthesized nested expression `a ? b : c ? d : e` is parsed as `a ? b : (c ? d : e)`.",
    hint: "Right-to-Left associative.",
    level: "intermediate",
    codeExample: "int res = cond1 ? val1 : cond2 ? val2 : val3; // cond1 ? val1 : (cond2 ? val2 : val3)"
  },
  {
    question: "Can a ternary expression be used as a standalone statement (e.g. `(x > 0) ? doA() : doB();`)?",
    shortAnswer: "No! In Java, a ternary expression produces a value and cannot be used as an expression statement.",
    explanation: "Ternary expressions must be assigned to a variable, passed as a method argument, or returned.",
    hint: "Cannot stand alone like an if-else statement.",
    level: "basic",
    codeExample: "// (x > 0) ? System.out.println(1) : System.out.println(2); // COMPILATION ERROR"
  },
  {
    question: "What is the result of `Object obj = true ? new Integer(1) : new Double(2.0);` in Java?",
    shortAnswer: "`obj` holds a `Double` instance with value `1.0`.",
    explanation: "Type promotion forces numeric unification to `double`, autoboxing the resulting primitive `1.0` into a `Double` object!",
    hint: "Numeric promotion causes boxing into Double.",
    level: "advanced",
    codeExample: "Object obj = true ? 1 : 2.0; // obj is a Double of value 1.0"
  },
  {
    question: "How does the ternary operator trigger `NullPointerException` with mixed Wrapper objects?",
    shortAnswer: "When mixing `Integer` and `Double` wrappers, Java unboxes both to primitive `double`. If the evaluated branch holds `null`, unboxing throws `NullPointerException`.",
    explanation: "Type resolution forces primitive unboxing across mixed numeric wrapper classes.",
    hint: "Mixed wrappers force primitive unboxing.",
    level: "expert",
    codeExample: "Double d = null;\n// double val = false ? 1 : d; // THROWS NullPointerException!"
  },
  {
    question: "How can you write a clean Nested Ternary expression for student grading?",
    shortAnswer: "Format each conditional branch on a separate line with consistent indentation.",
    explanation: "Multi-line formatting makes nested ternaries as readable as `if-else-if` ladders.",
    hint: "Separate lines for each branch.",
    level: "basic",
    codeExample: "String grade = (m >= 90) ? \"A+\"\n             : (m >= 75) ? \"A\"\n             : (m >= 50) ? \"B\"\n             : \"F\";"
  },
  {
    question: "What is the result of `false ? 10 : 20`?",
    shortAnswer: "`20`.",
    explanation: "Since condition is false, the false branch (20) is evaluated.",
    hint: "Returns false branch.",
    level: "basic",
    codeExample: "int x = false ? 10 : 20; // 20"
  },
  {
    question: "What is the result of `true ? 10 : 20`?",
    shortAnswer: "`10`.",
    explanation: "Since condition is true, the true branch (10) is evaluated.",
    hint: "Returns true branch.",
    level: "basic",
    codeExample: "int x = true ? 10 : 20; // 10"
  },
  {
    question: "Can ternary operators return `void`?",
    shortAnswer: "No, both branches must produce a typed value.",
    explanation: "Ternary expressions are value-producing expressions.",
    hint: "Cannot return void.",
    level: "basic",
    codeExample: "// void v = true ? voidMethod1() : voidMethod2(); // ILLEGAL"
  },
  {
    question: "What is the result of `int x = 5; int y = (x > 2) ? (x < 4 ? 1 : 2) : 3;`?",
    shortAnswer: "`y = 2`.",
    explanation: "`x > 2` is true. Evaluates `(5 < 4 ? 1 : 2)`. Since `5 < 4` is false, it returns `2`.",
    hint: "Evaluates inner true branch: (5 < 4 ? 1 : 2) = 2.",
    level: "intermediate",
    codeExample: "int y = (5 > 2) ? (5 < 4 ? 1 : 2) : 3; // 2"
  },
  {
    question: "Can `null` be used in ternary branches?",
    shortAnswer: "Yes, when assigned to a reference type (e.g. `String s = isValid ? \"Active\" : null;`).",
    explanation: "Reference types safely accept `null` in ternary branches.",
    hint: "Valid for reference types.",
    level: "basic",
    codeExample: "String s = hasData ? \"Data\" : null;"
  },
  {
    question: "What is the result of `String s = (10 > 5) ? \"Greater\" : \"Lesser\";`?",
    shortAnswer: "`\"Greater\"`.",
    explanation: "`10 > 5` is true.",
    hint: "\"Greater\".",
    level: "basic",
    codeExample: "String s = (10 > 5) ? \"Greater\" : \"Lesser\";"
  },
  {
    question: "How does the Ternary operator differ from `if-else` in terms of variable initialization?",
    shortAnswer: "Ternary allows initializing `final` variables in a single expression without branching blocks.",
    explanation: "`final int max = (a > b) ? a : b;` is clean and directly initialized.",
    hint: "Enables single-line final variable initialization.",
    level: "intermediate",
    codeExample: "final String role = isAdmin ? \"ADMIN\" : \"USER\";"
  },
  {
    question: "What is the precedence of the Ternary operator?",
    shortAnswer: "Level 2 (very low precedence), right above assignment operators.",
    explanation: "Almost all arithmetic, relational, and logical operators are evaluated before the ternary operator.",
    hint: "Very low precedence (above =).",
    level: "intermediate",
    codeExample: "int res = a + b > c ? 10 : 20; // (a + b > c) is evaluated first"
  },
  {
    question: "What is the result of `int a = 10, b = 20; int min = a < b ? a : b;`?",
    shortAnswer: "`min = 10`.",
    explanation: "Computes the minimum of two values.",
    hint: "min is 10.",
    level: "basic",
    codeExample: "int min = a < b ? a : b; // 10"
  },
  {
    question: "What is the result of `int a = 10, b = 20; int max = a > b ? a : b;`?",
    shortAnswer: "`max = 20`.",
    explanation: "Computes the maximum of two values.",
    hint: "max is 20.",
    level: "basic",
    codeExample: "int max = a > b ? a : b; // 20"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee engine, how is the scholarship discount computed via ternary?",
    shortAnswer: "`double discount = isScholarship ? 0.25 : (marks >= 80 ? 0.15 : 0.0);`",
    explanation: "Provides clean, tiered rebate calculations in Indian Rupees (₹).",
    hint: "Tiered ternary discount calculation.",
    level: "basic",
    codeExample: "double rebate = isScholarship ? 0.25 : (marks >= 80 ? 0.15 : 0.0);"
  },
  {
    question: "What happens if condition in a ternary operator is not a boolean expression in Java?",
    shortAnswer: "Compile-time error: `Type mismatch: cannot convert from int to boolean`.",
    explanation: "Java requires a strict `boolean` expression for the ternary condition.",
    hint: "Requires strict boolean condition.",
    level: "basic",
    codeExample: "// int res = 1 ? 10 : 20; // COMPILATION ERROR"
  },
  {
    question: "Can ternary expressions be passed directly as method arguments?",
    shortAnswer: "Yes: `printStatus(isApproved ? \"PASSED\" : \"FAILED\");`",
    explanation: "Because ternary expressions produce a value, they can be embedded directly in method calls.",
    hint: "Can be passed directly into methods.",
    level: "basic",
    codeExample: "System.out.println(count > 0 ? count + \" items\" : \"empty\");"
  },
  {
    question: "What is the result of `boolean b = true; int x = b ? 1 : 2;`?",
    shortAnswer: "`x = 1`.",
    explanation: "`b` is true, returns 1.",
    hint: "x = 1.",
    level: "basic",
    codeExample: "int x = true ? 1 : 2; // 1"
  },
  {
    question: "What is the result of `int x = 10; String s = (x % 2 == 0) ? \"EVEN\" : \"ODD\";`?",
    shortAnswer: "`\"EVEN\"`.",
    explanation: "`10 % 2 == 0` is true.",
    hint: "10 is EVEN.",
    level: "basic",
    codeExample: "String s = (10 % 2 == 0) ? \"EVEN\" : \"ODD\"; // \"EVEN\""
  },
  {
    question: "Can a ternary operator return a lambda expression or method reference?",
    shortAnswer: "Yes, when the target type is a functional interface: `Consumer<String> action = isUpper ? String::toUpperCase : String::toLowerCase;`",
    explanation: "Target typing resolves the functional interface type.",
    hint: "Supported with functional interface target types.",
    level: "advanced",
    codeExample: "Function<String, String> f = upper ? String::toUpperCase : String::trim;"
  },
  {
    question: "Why should developers avoid deeply nesting ternary operators (> 3 levels)?",
    shortAnswer: "It harms code readability and maintainability; `switch` expressions or `if-else-if` ladders are clearer for complex multi-branch decision trees.",
    explanation: "Clean code best practices prioritize readability over extreme brevity.",
    hint: "Keep nesting shallow for maintainability.",
    level: "basic",
    codeExample: "// Avoid: a ? b ? c ? d : e : f : g ? h : i"
  },
  {
    question: "What is the result of `true ? \"Hello\" : 123` in Java?",
    shortAnswer: "Compiles cleanly if assigned to `Object` or `Serializable` / `Comparable` common ancestor.",
    explanation: "Java computes the Lowest Common Supertype (`Object` / `Serializable`).",
    hint: "Assigned to common supertype Object.",
    level: "intermediate",
    codeExample: "Object obj = true ? \"Hello\" : 123; // \"Hello\""
  },
  {
    question: "What is the bytecode structure generated for a ternary expression?",
    shortAnswer: "A conditional branch instruction (`ifeq` or `ifne`) that jumps directly to the appropriate evaluation branch and pushes the value onto the stack.",
    explanation: "Compiles to standard conditional jump bytecode.",
    hint: "ifeq/ifne branch instructions.",
    level: "expert",
    codeExample: "// Bytecode: ifeq Label_False -> load trueExpr -> goto End"
  },
  {
    question: "What is the ultimate takeaway of Topic 15 for Java developers?",
    shortAnswer: "The ternary operator `? :` provides clean, inline conditional value selection with short-circuit branch safety, but requires awareness of binary numeric promotion (int vs double) and wrapper unboxing NPE risks.",
    explanation: "Mastering ternary syntax enables expressive initialization of final fields, concise return statements, and clean multi-tier business logic.",
    hint: "Inline conditional value selection with short-circuiting.",
    level: "basic",
    codeExample: "// Summary: cond ? trueExpr : falseExpr (short-circuited branch execution)"
  },
  {
    question: "What is the next topic (Topic 16) in Module 001_003?",
    shortAnswer: "Operator precedence and associativity table from highest to lowest.",
    explanation: "Topic 16 provides the master precedence and associativity hierarchy table covering all Java operators.",
    hint: "Master operator precedence and associativity.",
    level: "basic",
    codeExample: "// Topic 16: Complete Precedence & Associativity Table"
  }
];

export default questions;
