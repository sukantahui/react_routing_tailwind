/**
 * Module 001_003: Topic 4: String concatenation operator (+) and operator overloading mechanics
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "Why is the `+` operator considered unique in Java?",
    shortAnswer: "Because `+` is the only built-in overloaded operator in the Java language specification (performing numeric addition or String concatenation).",
    explanation: "Java does not permit user-defined operator overloading. The language designers specifically overloaded `+` to simplify String creation alongside arithmetic addition.",
    hint: "Only operator overloaded by the Java language specification.",
    level: "basic",
    codeExample: "int sum = 5 + 10;          // Numeric addition (15)\nString msg = \"Fee: ₹\" + 500; // String concatenation (\"Fee: ₹500\")"
  },
  {
    question: "What triggers String Concatenation when the `+` operator is used?",
    shortAnswer: "If at least one of the two operands of `+` is of type `java.lang.String`.",
    explanation: "According to JLS §15.18.1, if either operand is a String, the other operand is converted to a String, and string concatenation is performed.",
    hint: "At least one operand must be a String.",
    level: "basic",
    codeExample: "String s = \"Roll: \" + 101; // \"Roll: 101\""
  },
  {
    question: "What is the result of `10 + 20 + \"Barrackpore\"` in Java?",
    shortAnswer: "`\"30Barrackpore\"`.",
    explanation: "Because `+` is Left-to-Right associative, `10 + 20` executes first as integer addition (yielding `30`), and then `30 + \"Barrackpore\"` concatenates into `\"30Barrackpore\"`.",
    hint: "10 + 20 is calculated first, then concatenated.",
    level: "basic",
    codeExample: "String s = 10 + 20 + \"Barrackpore\"; // \"30Barrackpore\""
  },
  {
    question: "What is the result of `\"Barrackpore\" + 10 + 20` in Java?",
    shortAnswer: "`\"Barrackpore1020\"`.",
    explanation: "`\"Barrackpore\" + 10` executes first, producing String `\"Barrackpore10\"`. Then `\"Barrackpore10\" + 20` performs another String concatenation, resulting in `\"Barrackpore1020\"`.",
    hint: "Left-to-right evaluation converts 10 and 20 sequentially into text.",
    level: "basic",
    codeExample: "String s = \"Barrackpore\" + 10 + 20; // \"Barrackpore1020\""
  },
  {
    question: "How do you force numeric addition when concatenating with a String prefix?",
    shortAnswer: "Enclose the arithmetic operands in parentheses: `\"Total: \" + (10 + 20)`.",
    explanation: "Parentheses have higher precedence, forcing `10 + 20` to evaluate to `30` before concatenating with `\"Total: \"`.",
    hint: "Use parentheses around the numbers.",
    level: "basic",
    codeExample: "String s = \"Total: \" + (10 + 20); // \"Total: 30\""
  },
  {
    question: "What is the result of `'A' + 'B'` vs `\"\" + 'A' + 'B'`?",
    shortAnswer: "`'A' + 'B'` yields integer `131`; `\"\" + 'A' + 'B'` yields String `\"AB\"`.",
    explanation: "Because `'A'` (65) and `'B'` (66) are primitive `char` values, binary numeric promotion converts them to `int` for integer addition ($65 + 66 = 131$). Adding an empty String `\"\"` forces String concatenation.",
    hint: "Chars perform integer math unless a String is present.",
    level: "intermediate",
    codeExample: "int num = 'A' + 'B';        // 131\nString text = \"\" + 'A' + 'B'; // \"AB\""
  },
  {
    question: "How does the `+` operator convert non-String objects to Strings?",
    shortAnswer: "It implicitly invokes `String.valueOf(operand)`, which calls `operand.toString()` on non-null objects and returns `\"null\"` for null references.",
    explanation: "If an object is null, `String.valueOf(null)` safely produces `\"null\"`, preventing a `NullPointerException` during concatenation.",
    hint: "Calls String.valueOf() which delegates to toString() or \"null\".",
    level: "intermediate",
    codeExample: "Object obj = null;\nString s = \"Data: \" + obj; // \"Data: null\" (No NullPointerException!)"
  },
  {
    question: "Why does `obj.toString()` throw NullPointerException while `\"\" + obj` does not?",
    shortAnswer: "Because `obj.toString()` dereferences a null pointer, while `\"\" + obj` executes `String.valueOf(obj)` which handles null safely.",
    explanation: "The compiler protects concatenation against null reference crashes.",
    hint: "Concatenation handles null references safely.",
    level: "intermediate",
    codeExample: "String middle = null;\n// String bad = middle.toString(); // THROWS NullPointerException!\nString safe = \"Name: \" + middle;    // \"Name: null\""
  },
  {
    question: "How does Java 5 to 8 compile String concatenation under the hood?",
    shortAnswer: "The compiler replaces `str1 + str2` with `new StringBuilder().append(str1).append(str2).toString()`.",
    explanation: "This compiler optimization avoids creating multiple immutable intermediate String objects on a single line.",
    hint: "Desugared into StringBuilder chaining.",
    level: "advanced",
    codeExample: "// Code: String s = a + b + c;\n// Bytecode: new StringBuilder().append(a).append(b).append(c).toString();"
  },
  {
    question: "What major enhancement did Java 9 introduce for String Concatenation (JEP 280)?",
    shortAnswer: "It replaces hardcoded `StringBuilder` bytecode with `invokedynamic` calls using `StringConcatFactory.makeConcatWithConstants()`.",
    explanation: "JEP 280 allows the JVM to dynamically optimize and generate high-performance string concatenation strategies at runtime without recompilation.",
    hint: "invokedynamic via StringConcatFactory in Java 9+.",
    level: "expert",
    codeExample: "// Bytecode in Java 9+: invokedynamic #makeConcatWithConstants"
  },
  {
    question: "Why is using `str += item;` inside a large loop considered a severe performance anti-pattern?",
    shortAnswer: "Because each iteration instantiates a new `StringBuilder` and copies all previous characters, creating $O(N^2)$ quadratic time and memory bloat.",
    explanation: "For a loop with 10,000 iterations, `str += item` creates 10,000 intermediate String/StringBuilder objects and copies millions of characters unnecessarily.",
    hint: "Creates O(N^2) memory and GC thrashing.",
    level: "intermediate",
    codeExample: "// Anti-pattern (O(N^2)):\nString s = \"\";\nfor (String item : items) { s += item; }\n\n// Best Practice (O(N)):\nStringBuilder sb = new StringBuilder();\nfor (String item : items) { sb.append(item); }"
  },
  {
    question: "What is the compound assignment operator for String concatenation?",
    shortAnswer: "`+=` (e.g. `str += \" more text\";`).",
    explanation: "`str += text` is shorthand for `str = str + text`.",
    hint: "+= appends to a String variable.",
    level: "basic",
    codeExample: "String s = \"Hello\";\ns += \" World\"; // \"Hello World\""
  },
  {
    question: "Can the subtraction `-` or multiplication `*` operators be applied to Strings in Java?",
    shortAnswer: "No, only `+` (and `+=`) is supported for Strings; applying `-`, `*`, or `/` causes a compile error.",
    explanation: "Unlike Python (which supports `\"hi\" * 3`), Java restricts String operators strictly to `+`.",
    hint: "Only + is supported on Strings.",
    level: "basic",
    codeExample: "// String bad = \"Hi\" * 3; // COMPILATION ERROR: The operator * is undefined for String"
  },
  {
    question: "What is the result of `\"Value: \" + true` in Java?",
    shortAnswer: "`\"Value: true\"`.",
    explanation: "Primitive boolean `true` is converted to the String literal `\"true\"`.",
    hint: "Boolean values convert to \"true\" or \"false\".",
    level: "basic",
    codeExample: "String s = \"Value: \" + true; // \"Value: true\""
  },
  {
    question: "What is the result of `null + \"\"` in Java?",
    shortAnswer: "`\"null\"`.",
    explanation: "The null reference is converted to string `\"null\"` and concatenated with the empty string.",
    hint: "Evaluates to string \"null\".",
    level: "intermediate",
    codeExample: "String s = null + \"\"; // \"null\""
  },
  {
    question: "What is the result of `null + null` in Java?",
    shortAnswer: "Compilation error: `The operator + is undefined for the argument type(s) null, null`.",
    explanation: "Neither operand is an actual `String` type (both are untyped null literals), so the compiler cannot determine whether to perform numeric addition or string concatenation.",
    hint: "Compiler rejects null + null because neither operand is explicitly typed as String.",
    level: "advanced",
    codeExample: "// String s = null + null; // COMPILATION ERROR!"
  },
  {
    question: "What is the result of `(String) null + null` in Java?",
    shortAnswer: "`\"nullnull\"`.",
    explanation: "Because the left operand is explicitly cast to `String`, the `+` operator becomes String concatenation, converting both to `\"null\"`.",
    hint: "Explicit cast to String enables concatenation.",
    level: "advanced",
    codeExample: "String s = (String) null + null; // \"nullnull\""
  },
  {
    question: "How does `String.concat(String str)` compare to the `+` operator?",
    shortAnswer: "`concat()` only accepts String arguments and throws `NullPointerException` if the argument is null; `+` accepts any type and handles null safely.",
    explanation: "`\"hello\".concat(null)` throws `NullPointerException`, whereas `\"hello\" + null` yields `\"hellonull\"`.",
    hint: "concat() throws NullPointerException on null, + does not.",
    level: "intermediate",
    codeExample: "String s1 = \"Hello \".concat(\"World\"); // Valid\n// String s2 = \"Hello \".concat(null); // THROWS NullPointerException"
  },
  {
    question: "What is the result of `1 + 2 + \"3\" + 4 + 5` in Java?",
    shortAnswer: "`\"3345\"`.",
    explanation: "`1 + 2` evaluates to integer `3`. `3 + \"3\"` concatenates to `\"33\"`. `\"33\" + 4` becomes `\"334\"`. `\"334\" + 5` becomes `\"3345\"`.",
    hint: "Step by step: (1+2=3) → \"33\" → \"334\" → \"3345\".",
    level: "intermediate",
    codeExample: "String s = 1 + 2 + \"3\" + 4 + 5; // \"3345\""
  },
  {
    question: "What is the result of `\"3\" + (1 + 2) + 4 + 5` in Java?",
    shortAnswer: "`\"3345\"`.",
    explanation: "`1 + 2` in parentheses evaluates to `3`. `\"3\" + 3` becomes `\"33\"`. `\"33\" + 4` becomes `\"334\"`. `\"334\" + 5` becomes `\"3345\"`.",
    hint: "Parentheses evaluate (1+2=3) first.",
    level: "basic",
    codeExample: "String s = \"3\" + (1 + 2) + 4 + 5; // \"3345\""
  },
  {
    question: "What is the result of `\"Result: \" + 10 * 2`?",
    shortAnswer: "`\"Result: 20\"`.",
    explanation: "Multiplication `*` has higher precedence than addition/concatenation `+`. `10 * 2` is evaluated to `20` first, then concatenated with `\"Result: \"`.",
    hint: "Multiplication precedes concatenation.",
    level: "intermediate",
    codeExample: "String s = \"Result: \" + 10 * 2; // \"Result: 20\""
  },
  {
    question: "What is the result of `\"Result: \" + 10 - 2`?",
    shortAnswer: "Compilation error: `The operator - is undefined for the argument type(s) String, int`.",
    explanation: "Because `+` and `-` have equal precedence, `\"Result: \" + 10` executes first, yielding `\"Result: 10\"`. Then `\"Result: 10\" - 2` attempts string subtraction, which is illegal in Java.",
    hint: "Minus cannot operate on Strings.",
    level: "advanced",
    codeExample: "// String bad = \"Result: \" + 10 - 2; // COMPILATION ERROR!\nString fixed = \"Result: \" + (10 - 2); // \"Result: 8\""
  },
  {
    question: "Can `char[]` arrays be concatenated with Strings directly?",
    shortAnswer: "Yes, but it prints the object memory address (e.g. `[C@15db9742`) rather than array contents unless converted via `new String(arr)` or `String.valueOf(arr)`.",
    explanation: "Arrays do not override `toString()`, so `\"Letters: \" + charArray` invokes `Object.toString()`.",
    hint: "char[] requires String.valueOf() to print characters.",
    level: "intermediate",
    codeExample: "char[] letters = {'J', 'a', 'v', 'a'};\nSystem.out.println(\"Word: \" + new String(letters)); // \"Word: Java\""
  },
  {
    question: "In the Coder & AccoTax Barrackpore certificate generator, how are dynamic student credentials formatted?",
    shortAnswer: "Using String concatenation with `String.format()` for clean, aligned certificates in Indian Rupees (₹).",
    explanation: "Combining concatenation with formatted strings produces aligned ASCII certificates.",
    hint: "String concatenation + String.format.",
    level: "basic",
    codeExample: "String cert = \"Student: \" + name + \" | Fee: ₹\" + fee;"
  },
  {
    question: "What is String Constant Inlining for concatenated string literals?",
    shortAnswer: "If an expression consists entirely of compile-time String literals (e.g. `\"Hello \" + \"World\"`), `javac` merges them into a single string `\"Hello World\"` in the constant pool.",
    explanation: "No runtime `StringBuilder` or concatenation happens at runtime for pure literal concatenation.",
    hint: "Compiler merges string literals into one constant pool entry.",
    level: "advanced",
    codeExample: "String s = \"Barrackpore \" + \"Lab\"; // Compiled directly as \"Barrackpore Lab\""
  },
  {
    question: "What is the difference between `StringBuilder` and `StringBuffer`?",
    shortAnswer: "`StringBuilder` is unsynchronized and faster (recommended for single-thread use); `StringBuffer` is synchronized and thread-safe.",
    explanation: "`StringBuilder` (introduced in Java 5) replaced `StringBuffer` for standard high-performance string construction.",
    hint: "StringBuilder is faster; StringBuffer is thread-safe.",
    level: "intermediate",
    codeExample: "StringBuilder sb = new StringBuilder(); // Preferred for 99% of tasks"
  },
  {
    question: "What method in `String` allows joining multiple elements with a delimiter since Java 8?",
    shortAnswer: "`String.join(delimiter, elements)`.",
    explanation: "Eliminates manual trailing comma handling when concatenating collections or arrays.",
    hint: "String.join() joins with delimiters.",
    level: "basic",
    codeExample: "String list = String.join(\", \", \"Swadeep\", \"Tuhina\", \"Abhronila\"); // \"Swadeep, Tuhina, Abhronila\""
  },
  {
    question: "Can an integer variable be converted to a String using `\"\" + n`?",
    shortAnswer: "Yes, `\"\" + n` is an idiomatic trick to convert any primitive to String, though `Integer.toString(n)` or `String.valueOf(n)` is more explicit.",
    explanation: "Both produce identical string representations.",
    hint: "\"\" + n converts number to String.",
    level: "basic",
    codeExample: "int roll = 101;\nString s = \"\" + roll; // \"101\""
  },
  {
    question: "What is the ultimate takeaway of Topic 4 for Java developers?",
    shortAnswer: "Mastering the overloaded `+` operator, Left-to-Right associativity rules, and choosing `StringBuilder` for loops prevents logic bugs and memory bloat in production applications.",
    explanation: "Knowing when `+` adds numbers versus joins strings is fundamental to building clean UI banners, certificates, logs, and database queries.",
    hint: "Understand + associativity and use StringBuilder in loops.",
    level: "basic",
    codeExample: "// Summary: Left-to-right association, null safe conversion, StringBuilder in loops"
  },
  {
    question: "What is the next topic (Topic 5) in Module 001_003?",
    shortAnswer: "Unary operators: unary plus (+), unary minus (-), logical NOT (!), bitwise NOT (~).",
    explanation: "Topic 5 explores single-operand transformations, bit inversion, and sign flipping.",
    hint: "Unary operators in Java.",
    level: "basic",
    codeExample: "// Topic 5: Unary operators (+, -, !, ~)"
  }
];

export default questions;
