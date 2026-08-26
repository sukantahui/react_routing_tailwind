/**
 * Topic 13: Boolean data type: true and false literals (non-convertible to integers in Java)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What are the only two valid literal values for the `boolean` data type in Java?",
    shortAnswer: "`true` and `false` (in all lowercase letters).",
    explanation: "`true` and `false` are reserved keywords representing truth values in Java. Capitalized words like `True`, `FALSE`, or numbers like `1` and `0` are not valid boolean literals.",
    hint: "Only lowercase true and false.",
    level: "basic",
    codeExample: "boolean flag1 = true;\nboolean flag2 = false;\n// boolean bad = True; // COMPILATION ERROR!"
  },
  {
    question: "Can an integer like `1` or `0` be converted or assigned to a `boolean` in Java?",
    shortAnswer: "No, Java strictly prohibits implicit and explicit casting between boolean and integral numeric types.",
    explanation: "Unlike C/C++ where 0 is false and non-zero is true, Java maintains a strict separation between boolean truth values and numerical quantities. `(boolean) 1` and `(int) true` both cause compilation errors.",
    hint: "Java prevents boolean-to-integer conversion for strict type safety.",
    level: "basic",
    codeExample: "// boolean b = 1; // COMPILER ERROR: Type mismatch\n// int n = (int) true; // COMPILER ERROR: Cannot cast boolean to int"
  },
  {
    question: "How does Java prevent the classic C bug `if (x = 1)`?",
    shortAnswer: "In Java, `x = 1` evaluates to integer `1`, which causes a compile-time type mismatch error inside an `if` condition.",
    explanation: "An `if` statement requires a boolean expression. Because `x = 1` produces an `int` rather than a `boolean`, the Java compiler flags it as an error before runtime, preventing accidental assignment bugs.",
    hint: "if condition strictly requires a boolean expression.",
    level: "intermediate",
    codeExample: "int x = 0;\n// if (x = 1) { } // COMPILER ERROR: Type mismatch: cannot convert from int to boolean\nif (x == 1) { } // Correct equality check"
  },
  {
    question: "What is the memory size of a `boolean` in Java according to the JVM Specification?",
    shortAnswer: "The JVM specification does not define an exact size; typically 1 byte in memory and 32-bit int on the operand stack.",
    explanation: "At the bytecode level, individual boolean variables are compiled into 32-bit integer instructions (`iconst_1`, `iconst_0`, `istore`). In arrays (`boolean[]`), the JVM represents each element as a single byte (8 bits).",
    hint: "Logical 1 bit of information, stored as 1 byte in memory/arrays.",
    level: "advanced",
    codeExample: "boolean b = true; // 1 byte in memory\nboolean[] flags = new boolean[100]; // Stored as byte array internally"
  },
  {
    question: "What is the default value of an uninitialized `boolean` instance or static field?",
    shortAnswer: "`false`.",
    explanation: "When an object or class is allocated, the JVM zeroes its memory fields. For boolean fields, zero corresponds to `false`.",
    hint: "Default boolean field value is false.",
    level: "basic",
    codeExample: "class Student {\n  boolean isFeesPaid; // Defaults to false\n}"
  },
  {
    question: "What is the difference between short-circuit AND (`&&`) and eager logical AND (`&`)?",
    shortAnswer: "`&&` skips evaluating the right-hand operand if the left-hand operand is `false`; `&` always evaluates both operands.",
    explanation: "Short-circuit `&&` provides safety when guarding against null pointers or division by zero (`str != null && str.length() > 0`). Eager `&` evaluates both expressions regardless of the outcome.",
    hint: "Short-circuit evaluates only as much as needed.",
    level: "intermediate",
    codeExample: "String s = null;\nif (s != null && s.length() > 0) { } // Safe (short-circuit)\n// if (s != null & s.length() > 0) { } // Crashes with NullPointerException!"
  },
  {
    question: "What is the difference between short-circuit OR (`||`) and eager logical OR (`|`)?",
    shortAnswer: "`||` skips the right operand if the left operand is `true`; `|` always evaluates both sides.",
    explanation: "If the first condition of `||` is `true`, the overall expression is guaranteed to be `true`, so Java skips the second condition for performance and safety.",
    hint: "Left is true -> || stops evaluating.",
    level: "intermediate",
    codeExample: "boolean passed = (score >= 90) || (++attempts > 3);"
  },
  {
    question: "What does the logical XOR (`^`) operator do on boolean operands?",
    shortAnswer: "Returns `true` if and only if exactly one operand is `true` (and the other is `false`).",
    explanation: "XOR (Exclusive OR) returns `true` when the operands have different boolean values (`true ^ false` is `true`, `true ^ true` is `false`, `false ^ false` is `false`).",
    hint: "XOR = Exclusive OR (one or the other, but not both).",
    level: "intermediate",
    codeExample: "boolean otpValid = true;\nboolean passwordValid = false;\nboolean singleFactor = otpValid ^ passwordValid; // true"
  },
  {
    question: "What does the logical NOT (`!`) operator do?",
    shortAnswer: "Inverts the truth value of a boolean expression (`!true` becomes `false`, `!false` becomes `true`).",
    explanation: "The unary logical complement operator `!` flips a boolean value.",
    hint: "Unary inversion.",
    level: "basic",
    codeExample: "boolean isAvailable = false;\nif (!isAvailable) {\n  System.out.println(\"Resource busy\");\n}"
  },
  {
    question: "How do you manually convert a boolean to an integer in Java?",
    shortAnswer: "Use a ternary operator: `int n = flag ? 1 : 0;` or `Boolean.compare(flag, false)`.",
    explanation: "Because explicit casting is prohibited, ternary conditional expressions or helper methods are used to serialize booleans to integer codes (e.g. for database columns or C-native APIs).",
    hint: "Ternary expression: flag ? 1 : 0.",
    level: "basic",
    codeExample: "boolean isEnrolled = true;\nint dbCode = isEnrolled ? 1 : 0;"
  },
  {
    question: "How do you manually convert an integer to a boolean in Java?",
    shortAnswer: "Use a comparison: `boolean flag = (num != 0);`.",
    explanation: "Comparing an integer against zero evaluates to a boolean primitive (`true` for non-zero, `false` for zero).",
    hint: "Compare against zero (n != 0).",
    level: "basic",
    codeExample: "int status = 1;\nboolean isActive = (status != 0); // true"
  },
  {
    question: "What is the wrapper class for primitive `boolean` in Java?",
    shortAnswer: "`java.lang.Boolean`.",
    explanation: "`Boolean` encapsulates a primitive `boolean` in an immutable object. It provides constants `Boolean.TRUE` and `Boolean.FALSE` as well as parsing methods.",
    hint: "java.lang.Boolean.",
    level: "basic",
    codeExample: "Boolean boolObj = Boolean.valueOf(true);\nboolean primitive = boolObj.booleanValue();"
  },
  {
    question: "What is the default value of an uninitialized `Boolean` object reference field?",
    shortAnswer: "`null` (not `false`).",
    explanation: "`Boolean` is an object reference type. Like all reference fields in Java classes, its default uninitialized value is `null`, which can cause a `NullPointerException` if auto-unboxed.",
    hint: "Wrapper object defaults to null.",
    level: "intermediate",
    codeExample: "class Account {\n  Boolean isApproved; // null!\n}"
  },
  {
    question: "What happens when auto-unboxing a `Boolean` reference that is `null`?",
    shortAnswer: "The JVM throws a `NullPointerException` at runtime.",
    explanation: "Auto-unboxing translates `boolean b = boolObj;` to `boolean b = boolObj.booleanValue();`. Calling `.booleanValue()` on a null reference triggers `NullPointerException`.",
    hint: "Auto-unboxing null triggers NullPointerException.",
    level: "intermediate",
    codeExample: "Boolean boolObj = null;\n// boolean b = boolObj; // THROWS NullPointerException at runtime!"
  },
  {
    question: "How does `Boolean.parseBoolean(String s)` handle input strings?",
    shortAnswer: "Returns `true` if the string is non-null and equals `\"true\"` (case-insensitive); returns `false` for all other inputs.",
    explanation: "`Boolean.parseBoolean(\"True\")`, `\"TRUE\"`, and `\"true\"` all return `true`. Passing `\"yes\"`, `\"1\"`, or `null` returns `false` without throwing an exception.",
    hint: "Case-insensitive match for \"true\", everything else is false.",
    level: "intermediate",
    codeExample: "boolean b1 = Boolean.parseBoolean(\"TRUE\"); // true\nboolean b2 = Boolean.parseBoolean(\"yes\");  // false\nboolean b3 = Boolean.parseBoolean(null);   // false"
  },
  {
    question: "What is the operator precedence between `!`, `&&`, and `||` in Java?",
    shortAnswer: "`!` has highest precedence, followed by `&&`, and finally `||`.",
    explanation: "In Java expression evaluation: `!a || b && c` is evaluated as `(!a) || (b && c)`. Parentheses should be used to make complex boolean logic unambiguous.",
    hint: "NOT (!) > AND (&&) > OR (||).",
    level: "intermediate",
    codeExample: "boolean res = true || false && false; // true (because false && false is evaluated first)"
  },
  {
    question: "Can a `boolean` variable be used in a Java `switch` statement?",
    shortAnswer: "No, switch expressions do not accept boolean primitives or Boolean objects.",
    explanation: "Java switch expressions support byte, short, char, int, String, and enums. Because a boolean has only two states, an `if-else` statement is the idiomatic control flow structure.",
    hint: "Use if-else for boolean conditions instead of switch.",
    level: "basic",
    codeExample: "boolean flag = true;\n// switch(flag) { } // COMPILATION ERROR: Cannot switch on a value of type boolean"
  },
  {
    question: "What is De Morgan's Law in Java boolean logic?",
    shortAnswer: "`!(a && b) == (!a || !b)` and `!(a || b) == (!a && !b)`.",
    explanation: "De Morgan's Laws allow simplifying negated compound boolean expressions, making complex conditional guard logic cleaner and easier to read.",
    hint: "Distribute NOT and flip AND to OR (and vice versa).",
    level: "intermediate",
    codeExample: "// Instead of: !hasPassed && !hasPaidFees\n// You can write: !(hasPassed || hasPaidFees)"
  },
  {
    question: "What is the return type of relational comparison operators (`==`, `!=`, `<`, `<=`, `>`, `>=`) in Java?",
    shortAnswer: "`boolean`.",
    explanation: "All relational and comparison operators evaluate to either `true` or `false`.",
    hint: "All comparisons produce a boolean result.",
    level: "basic",
    codeExample: "boolean isAdult = (age >= 18); // Evaluates to boolean"
  },
  {
    question: "What is the result of `Boolean.compare(boolean x, boolean y)`?",
    shortAnswer: "Returns `0` if `x == y`; returns `1` if `x` is `true` and `y` is `false`; returns `-1` if `x` is `false` and `y` is `true`.",
    explanation: "In natural boolean ordering, `false` is considered less than `true`.",
    hint: "false < true.",
    level: "advanced",
    codeExample: "System.out.println(Boolean.compare(false, true)); // -1\nSystem.out.println(Boolean.compare(true, false)); // 1\nSystem.out.println(Boolean.compare(true, true));   // 0"
  },
  {
    question: "Why is writing `if (isEnrolled == true)` considered a code smell in Java?",
    shortAnswer: "Because `isEnrolled` is already a boolean expression; comparing it with `== true` is redundant.",
    explanation: "Writing `if (isEnrolled)` is cleaner, more concise, and prevents accidental assignment typos (`isEnrolled = true`). To test for false, write `if (!isEnrolled)`.",
    hint: "Simplify `flag == true` to just `flag`.",
    level: "basic",
    codeExample: "// Anti-pattern: if (isEnrolled == true) {}\n// Clean idiom: if (isEnrolled) {}"
  },
  {
    question: "Can bitwise shift operators (`<<`, `>>`, `>>>`) be applied to `boolean` operands?",
    shortAnswer: "No, bitwise shift operators are only valid for integral numeric types (byte, short, char, int, long).",
    explanation: "Shifting bits of a boolean has no logical meaning in Java and results in a compilation error.",
    hint: "Bitwise shifts are restricted to numeric integers.",
    level: "intermediate",
    codeExample: "boolean b = true;\n// boolean bad = b << 1; // COMPILATION ERROR"
  },
  {
    question: "What is a Boolean Flag pattern in algorithm design?",
    shortAnswer: "A boolean variable used to signal the occurrence of a condition or state change (e.g. `found`, `isSorted`, `hasError`).",
    explanation: "Flags allow loops and search algorithms to terminate early when a target element is located or an error is detected.",
    hint: "Signal state change or early exit.",
    level: "basic",
    codeExample: "boolean found = false;\nfor (int n : arr) {\n  if (n == target) { found = true; break; }\n}"
  },
  {
    question: "Can `java.util.BitSet` be used instead of `boolean[]` for memory efficiency?",
    shortAnswer: "Yes, `BitSet` allocates exactly 1 bit per boolean, whereas `boolean[]` consumes 8 bits (1 byte) per element.",
    explanation: "For large collections of flags (e.g. 10 million tracking states), `boolean[10_000_000]` consumes ~10 MB of RAM, whereas `BitSet` of size 10,000,000 consumes only ~1.2 MB.",
    hint: "BitSet compresses booleans into true single-bit bitmasks.",
    level: "advanced",
    codeExample: "java.util.BitSet visited = new java.util.BitSet(1_000_000);\nvisited.set(42); // Sets bit 42 to true"
  },
  {
    question: "Can you declare a `boolean` array with an inline initializer in Java?",
    shortAnswer: "Yes: `boolean[] attendance = {true, false, true, true};`.",
    explanation: "Array initializer syntax allows declaring and populating boolean arrays in a single line.",
    hint: "Standard array initialization.",
    level: "basic",
    codeExample: "boolean[] labAttendance = {true, true, false, true};"
  },
  {
    question: "What is the difference between `Boolean.TRUE` and `new Boolean(true)`?",
    shortAnswer: "`Boolean.TRUE` reuses a static cached singleton instance; `new Boolean()` creates an unnecessary new heap object (and is deprecated in Java 9).",
    explanation: "Instantiating wrapper objects with constructors is deprecated. Use `Boolean.valueOf(true)` or `Boolean.TRUE` to avoid garbage collection overhead.",
    hint: "Use cached static constants Boolean.TRUE / Boolean.FALSE.",
    level: "intermediate",
    codeExample: "Boolean b1 = Boolean.TRUE; // Best practice\nBoolean b2 = Boolean.valueOf(true); // Also cached"
  },
  {
    question: "How does the ternary operator `? :` evaluate boolean conditions?",
    shortAnswer: "`condition ? exprIfTrue : exprIfFalse` evaluates `condition`; if `true`, it returns `exprIfTrue`, otherwise `exprIfFalse`.",
    explanation: "The ternary operator provides a concise inline if-else expression for variable assignment.",
    hint: "Inline condition evaluation.",
    level: "basic",
    codeExample: "double fee = isScholarship ? 10000.0 : 15000.0;"
  },
  {
    question: "What is Boolean coercion in other languages and why does Java reject it?",
    shortAnswer: "Automatic type-casting of truthy/falsy values (like non-empty strings or numbers); Java rejects it to eliminate subtle bugs.",
    explanation: "Languages like JavaScript allow `\"hello\"` or `1` to evaluate to true. Java enforces strict static type safety to ensure that only true boolean logic drives control flow.",
    hint: "Strict type safety eliminates truthy/falsy ambiguities.",
    level: "intermediate",
    codeExample: "// In Java: String s = \"data\"; if (s) {} // COMPILATION ERROR!"
  },
  {
    question: "Can `boolean` variables be volatile in multithreaded Java applications?",
    shortAnswer: "Yes, `volatile boolean isRunning = true;` guarantees memory visibility across multiple threads.",
    explanation: "Marking a boolean flag as `volatile` ensures that reads and writes bypass CPU thread caches and interact directly with main memory, preventing infinite loops in worker threads.",
    hint: "volatile boolean is the standard thread termination flag.",
    level: "advanced",
    codeExample: "private volatile boolean shutdownRequested = false;\npublic void stop() { shutdownRequested = true; }"
  },
  {
    question: "What is the ultimate takeaway of Topic 13 for Java software engineers?",
    shortAnswer: "Java's strict `boolean` type guarantees crash-proof conditional logic, protects against assignment bugs, and powers short-circuit safety guard patterns.",
    explanation: "By enforcing that truth values are distinct from numbers and providing short-circuit `&&` and `||` evaluation, Java enables developers to write clean, unambiguous, and null-safe decision logic.",
    hint: "Strict boolean type safety is the foundation of dependable Java control flow.",
    level: "basic",
    codeExample: "// Summary: true/false literals, no integer cast, short-circuit && / ||, default false"
  }
];

export default questions;
