/**
 * Module 001_004: Topic 6: Traditional 'switch-case' statement: syntax, matching rules, and valid data types (byte, short, int, char, String, enum)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the Traditional 'switch-case' statement in Java (JLS §14.11)?",
    shortAnswer: "A multi-way branch statement that evaluates an expression and transfers control to a matching `case` constant label.",
    explanation: "Provides structured multi-branch routing with jump-table optimization in bytecode.",
    hint: "Multi-way branching based on constant matching.",
    level: "basic",
    codeExample: "switch (option) {\n    case 1: doAction(); break;\n    default: fallback();\n}"
  },
  {
    question: "What data types are VALID for the switch selector expression in Java?",
    shortAnswer: "1. Primitive integral types: `byte`, `short`, `char`, `int`; 2. Wrapper classes: `Byte`, `Short`, `Character`, `Integer`; 3. `String` (Java 7+); 4. `enum` types (Java 5+).",
    explanation: "These are the only types supported by traditional switch statements.",
    hint: "byte, short, char, int, String, enum, and wrappers.",
    level: "basic",
    codeExample: "// byte, short, char, int, String, enum"
  },
  {
    question: "Which primitive data types are ILLEGAL in a switch selector in Java?",
    shortAnswer: "`long`, `float`, `double`, and `boolean`.",
    explanation: "Attempting to switch on `long`, `float`, `double`, or `boolean` causes a compile-time error.",
    hint: "long, float, double, boolean are illegal.",
    level: "basic",
    codeExample: "// long x = 10L; switch (x) { } // COMPILATION ERROR!"
  },
  {
    question: "Why is `long` not supported in traditional Java switch statements?",
    shortAnswer: "Because JVM jump table opcodes (`tableswitch`, `lookupswitch`) are designed around 32-bit integer indexes; a 64-bit jump table would require prohibitive memory allocation.",
    explanation: "Hardware and bytecode architecture design decision.",
    hint: "JVM bytecode tableswitch is 32-bit indexed.",
    level: "advanced",
    codeExample: "// JVM tableswitch uses 32-bit integer offsets"
  },
  {
    question: "Why are `float` and `double` not supported in switch statements?",
    shortAnswer: "Because floating-point representation involves binary approximation and rounding inaccuracies (e.g. `0.1 + 0.2 != 0.3`), making exact binary equality matching unreliable.",
    explanation: "Floating-point numbers lack exact discrete identity.",
    hint: "Floating-point rounding inaccuracies prevent exact matching.",
    level: "intermediate",
    codeExample: "// double d = 1.5; switch (d) { } // COMPILATION ERROR"
  },
  {
    question: "Why is `boolean` not supported in switch statements?",
    shortAnswer: "Because `boolean` only has two states (`true` / `false`), for which `if-else` is already the optimal and standard language construct.",
    explanation: "Switch is intended for multi-value discrete dispatch.",
    hint: "boolean is binary; use if-else instead.",
    level: "basic",
    codeExample: "// boolean b = true; switch (b) { } // COMPILATION ERROR"
  },
  {
    question: "What are the rules for `case` labels in a traditional switch statement?",
    shortAnswer: "1. Must be compile-time constant expressions; 2. Must be assignable to the selector type; 3. Cannot contain duplicates; 4. Cannot be `null`.",
    explanation: "Enforced strictly by the Java compiler.",
    hint: "Compile-time constants, no duplicates, within type range.",
    level: "basic",
    codeExample: "final int OPTION = 1;\nswitch (x) { case OPTION: ... }"
  },
  {
    question: "Can a non-final variable be used as a `case` label in Java?",
    shortAnswer: "No! `case` labels must be compile-time constants (literals or `final` variables initialized with constant expressions).",
    explanation: "Using a normal variable like `int val = 5; case val:` causes a compile error: 'constant expression required'.",
    hint: "Variables must be declared 'final' and initialized with constants.",
    level: "basic",
    codeExample: "int a = 5;\n// case a: // COMPILER ERROR: constant expression required"
  },
  {
    question: "What happens if two `case` labels have the same value in a switch statement?",
    shortAnswer: "Compilation error: 'duplicate case label'.",
    explanation: "Case labels must be distinct.",
    hint: "Duplicate case labels cause compile error.",
    level: "basic",
    codeExample: "// case 1: ... case 1: // COMPILER ERROR: Duplicate case"
  },
  {
    question: "What happens if a `case` label exceeds the range of the selector type (`byte b = 1; switch (b) { case 130: ... }`)?",
    shortAnswer: "Compilation error: 'incompatible types: possible lossy conversion from int to byte'.",
    explanation: "130 cannot fit in a signed 8-bit `byte` (-128 to 127).",
    hint: "Case value out of range causes compile error.",
    level: "intermediate",
    codeExample: "byte b = 1;\n// case 130: // COMPILER ERROR: out of byte range"
  },
  {
    question: "What happens if the switch selector expression evaluates to `null`?",
    shortAnswer: "Throws `java.lang.NullPointerException` at runtime.",
    explanation: "Applies to `String`, `enum`, and wrapper types (`Integer`, `Character`, etc.) during unboxing/dispatch.",
    hint: "Null selector expression throws NullPointerException.",
    level: "basic",
    codeExample: "String s = null;\n// switch (s) { } // THROWS NullPointerException"
  },
  {
    question: "When switching on an `enum`, why must case labels use the unqualified enum constant name (`case BARRACKPORE:`) rather than `case StudentBranch.BARRACKPORE:`?",
    shortAnswer: "The Java compiler already knows the enum type from the selector expression, and JLS §14.11 explicitly requires unqualified enum constant names.",
    explanation: "Writing `case StudentBranch.BARRACKPORE:` causes a compilation error.",
    hint: "Use unqualified enum name (case BARRACKPORE:).",
    level: "intermediate",
    codeExample: "StudentBranch b = StudentBranch.NAIHATI;\nswitch (b) {\n    case NAIHATI: // Correct\n    // case StudentBranch.NAIHATI: // COMPILER ERROR!\n}"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student portal, what data types are used in switch dispatchers?",
    shortAnswer: "Integers for course track selection (₹15,000 Java Core vs ₹22,000 Spring Boot), Strings for ATM commands (`WITHDRAW`, `DEPOSIT`), and Enums for branch locations (`BARRACKPORE`, `SHYAMNAGAR`, `NAIHATI`, `ICHAPUR`).",
    explanation: "Demonstrates multi-type switch dispatching in Indian Rupees (₹).",
    hint: "int for courses, String for ATM actions, enum for branches.",
    level: "basic",
    codeExample: "switch (trackId) { case 1: ... }\nswitch (action) { case \"WITHDRAW\": ... }"
  },
  {
    question: "What is the purpose of the `break` statement in a traditional `case` block?",
    shortAnswer: "To terminate execution of the switch statement and jump past the closing curly brace `}`.",
    explanation: "Topic 7 explores `break` and fall-through mechanics in detail.",
    hint: "Exits the switch statement.",
    level: "basic",
    codeExample: "case 1: doWork(); break;"
  },
  {
    question: "What happens if `break` is omitted at the end of a `case` block in traditional switch?",
    shortAnswer: "Execution falls through into the next `case` block, executing its statements regardless of whether its case label matches!",
    explanation: "The infamous fall-through behavior of traditional switch.",
    hint: "Falls through into subsequent cases.",
    level: "basic",
    codeExample: "case 1: step1(); // No break -> falls into case 2!"
  },
  {
    question: "What bytecode instruction is generated when `case` labels are dense integers (e.g. 1, 2, 3, 4)?",
    shortAnswer: "`tableswitch`.",
    explanation: "Direct $O(1)$ indexed jump table.",
    hint: "tableswitch opcode.",
    level: "advanced",
    codeExample: "// Bytecode: tableswitch 1 to 4: L1, L2, L3, L4"
  },
  {
    question: "What bytecode instruction is generated when `case` labels are sparse integers (e.g. 1, 100, 50000)?",
    shortAnswer: "`lookupswitch`.",
    explanation: "Binary search table in bytecode with $O(\log N)$ lookup time.",
    hint: "lookupswitch opcode.",
    level: "advanced",
    codeExample: "// Bytecode: lookupswitch: 1->L1, 100->L2, 50000->L3"
  },
  {
    question: "Can a `case` label be a constant mathematical expression (e.g. `case 10 + 5:`)?",
    shortAnswer: "Yes! As long as the expression evaluates at compile-time to a constant (`15`), it is completely legal.",
    explanation: "Compile-time constant expressions are permitted.",
    hint: "Constant math expressions like 10 + 5 are legal.",
    level: "intermediate",
    codeExample: "case 10 * 2: // Legal (Constant 20)"
  },
  {
    question: "Can a `case` label call a method (e.g. `case getOption():`)?",
    shortAnswer: "No! Method invocations are evaluated at runtime and are NOT compile-time constants (causes a compile error).",
    explanation: "Methods cannot be evaluated at compile time.",
    hint: "Method calls are illegal in case labels.",
    level: "basic",
    codeExample: "// case getCode(): // COMPILER ERROR: constant expression required"
  },
  {
    question: "What is the scope of a variable declared inside a `switch` block without inner braces?",
    shortAnswer: "The variable is scoped to the ENTIRE `switch` block, so declaring the same variable name in another `case` causes a 'variable already defined' compile error!",
    explanation: "The entire switch body `{ ... }` forms a single scope.",
    hint: "Entire switch is one scope; wrap cases in {} to isolate.",
    level: "intermediate",
    codeExample: "switch (x) {\n    case 1: int temp = 10; break;\n    // case 2: int temp = 20; // ERROR: duplicate variable temp!\n}"
  },
  {
    question: "How do you isolate variable scopes between different `case` blocks in traditional switch?",
    shortAnswer: "Enclose the body of the `case` in its own curly braces `{ ... }`.",
    explanation: "Creates a distinct local block scope.",
    hint: "Wrap case body in curly braces {}.",
    level: "basic",
    codeExample: "case 1: {\n    int temp = 10;\n    break;\n}\ncase 2: {\n    int temp = 20; // Legal! (Separate scope)\n    break;\n}"
  },
  {
    question: "Can `Character` wrapper objects be used as switch selectors?",
    shortAnswer: "Yes! Java automatically unboxes `Character` to primitive `char` before evaluation.",
    explanation: "Autounboxing is supported for all 4 primitive wrappers.",
    hint: "Autounboxed to primitive char.",
    level: "basic",
    codeExample: "Character ch = 'X';\nswitch (ch) { case 'X': ... }"
  },
  {
    question: "What happens if a `Character` wrapper holding `null` is used in a switch statement?",
    shortAnswer: "Throws `NullPointerException` during unboxing.",
    explanation: "Unboxing `null` always throws NPE.",
    hint: "Throws NullPointerException.",
    level: "basic",
    codeExample: "Character c = null;\n// switch (c) { } // THROWS NullPointerException"
  },
  {
    question: "Can you switch on a `char` and match against integer literals (e.g. `char c = 'A'; switch (c) { case 65: ... }`)?",
    shortAnswer: "Yes! `char` is an unsigned 16-bit numeric type, so matching against integer constant `65` is valid.",
    explanation: "'A' has Unicode integer code point 65.",
    hint: "char can match against integer constants.",
    level: "intermediate",
    codeExample: "char c = 'A';\nswitch (c) {\n    case 65: System.out.println(\"Matched 65 ('A')\"); break;\n}"
  },
  {
    question: "What is the role of the `default` label in traditional switch?",
    shortAnswer: "Executes when none of the explicit `case` constants match the selector value.",
    explanation: "Topic 8 explores `default` placement and best practices in detail.",
    hint: "Fallback when no cases match.",
    level: "basic",
    codeExample: "default:\n    System.out.println(\"Unknown\");\n    break;"
  },
  {
    question: "Is the `default` label required in a traditional switch statement?",
    shortAnswer: "No, `default` is optional, but strongly recommended for defensive coding.",
    explanation: "If omitted and no cases match, switch terminates without doing anything.",
    hint: "Optional, but recommended.",
    level: "basic",
    codeExample: "// Valid without default"
  },
  {
    question: "Can multiple `case` labels share the same statement block in traditional switch?",
    shortAnswer: "Yes! Stacking cases (`case 1: case 2: case 3: doWork(); break;`) utilizes intentional fall-through.",
    explanation: "A standard idiom for grouping multiple options.",
    hint: "Stacked case labels share code via fall-through.",
    level: "basic",
    codeExample: "case 1:\ncase 2:\ncase 3:\n    processGroup();\n    break;"
  },
  {
    question: "What is the difference between switching on an `int` vs switching on a `String` under the hood?",
    shortAnswer: "`int` switch uses native bytecode jump tables (`tableswitch`); `String` switch compiles into two stages: first hashing with `hashCode()` and testing `.equals()`, then jumping to the corresponding code branch.",
    explanation: "Topic 10 covers String switch mechanics in depth.",
    hint: "int switch uses jump tables; String switch uses hashCode and equals.",
    level: "advanced",
    codeExample: "// String switch hashes first"
  },
  {
    question: "What is the ultimate takeaway of Module 001_004 Topic 6 for Java developers?",
    shortAnswer: "Traditional `switch-case` statements provide fast, readable multi-way constant dispatch for `byte`, `short`, `int`, `char`, `String`, and `enum`; case labels must be compile-time constants, selectors cannot be `long`/`float`/`double`/`boolean`/`null`, and inner scopes should be isolated with braces.",
    explanation: "Essential foundation before mastering Java 14+ modern switch expressions.",
    hint: "Fast multi-way dispatch on discrete constants; use compile-time constants.",
    level: "basic",
    codeExample: "// Summary: switch on int, char, String, enum with constant case labels"
  },
  {
    question: "What is the next topic (Topic 7) in Module 001_004?",
    shortAnswer: "The 'break' statement in switch-case and understanding intentional vs accidental fall-through.",
    explanation: "Topic 7 explores `break` semantics, the hazards of accidental fall-through, and legitimate patterns for intentional fall-through.",
    hint: "The 'break' statement and fall-through mechanics.",
    level: "basic",
    codeExample: "// Topic 7: The 'break' statement & fall-through"
  }
];

export default questions;
