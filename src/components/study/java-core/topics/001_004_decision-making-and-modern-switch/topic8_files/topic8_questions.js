/**
 * Module 001_004: Topic 8: The 'default' case and placement best practices
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the role of the `default` label in a Java switch statement (JLS §14.11)?",
    shortAnswer: "To provide a catch-all fallback block that executes when none of the explicit `case` constants match the selector expression.",
    explanation: "Ensures the switch statement handles unexpected or unlisted values gracefully.",
    hint: "Fallback when no other case labels match.",
    level: "basic",
    codeExample: "switch (day) {\n    case 1: ... break;\n    default: handleOther(); break;\n}"
  },
  {
    question: "Where can the `default` label be placed inside a switch block in Java?",
    shortAnswer: "Anywhere inside the switch block (at the top, in the middle, or at the bottom).",
    explanation: "Java grammar permits `default` in any position relative to other `case` labels.",
    hint: "Anywhere inside the switch block.",
    level: "basic",
    codeExample: "switch (x) {\n    default: ... break; // Top placement is legal\n    case 1: ... break;\n}"
  },
  {
    question: "Why is placing `default` at the very bottom considered an industry best practice?",
    shortAnswer: "Because it aligns with natural human reading order (specific cases first, fallback last) and prevents accidental fall-through into subsequent cases if `break` is omitted.",
    explanation: "Maximizes code readability and defensive safety.",
    hint: "Prevents fall-through bugs and matches logical reading flow.",
    level: "basic",
    codeExample: "// Best practice: place default at the bottom"
  },
  {
    question: "What happens if `default` is placed at the top and omits `break;` when an unmatched value is passed?",
    shortAnswer: "Control jumps to `default`, executes its statements, and falls through directly into the following `case` block!",
    explanation: "A dangerous and confusing bug pattern.",
    hint: "Falls through into subsequent cases if break is missing.",
    level: "intermediate",
    codeExample: "switch (x) {\n    default: print(\"D\"); // Falls into case 1!\n    case 1: print(\"1\"); break;\n}"
  },
  {
    question: "Can a switch block contain multiple `default` labels in Java?",
    shortAnswer: "No! A switch block can contain at most ONE `default` label (multiple `default` labels cause a compilation error).",
    explanation: "Enforced strictly by JLS §14.11.",
    hint: "Only one default label is allowed.",
    level: "basic",
    codeExample: "// default: ... default: ... // COMPILATION ERROR"
  },
  {
    question: "Is the `default` label mandatory in a traditional switch statement?",
    shortAnswer: "No, `default` is optional.",
    explanation: "If omitted and no case matches, the switch completes without executing anything.",
    hint: "Optional in traditional switch.",
    level: "basic",
    codeExample: "switch (x) { case 1: print(\"1\"); break; } // Valid without default"
  },
  {
    question: "When is a `default` label MANDATORY in modern Java?",
    shortAnswer: "In Switch Expressions (Java 14+) when the compiler cannot prove exhaustiveness (e.g. switching on `int` or `String` without an exhaustive enum).",
    explanation: "Topic 14 explores switch expression exhaustiveness rules in depth.",
    hint: "Mandatory in non-exhaustive switch expressions.",
    level: "intermediate",
    codeExample: "int val = switch (x) { case 1 → 10; default → 0; }; // default mandatory"
  },
  {
    question: "How is `default` used for defensive programming in domain-driven architectures?",
    shortAnswer: "By throwing an `IllegalArgumentException` or `IllegalStateException` on unexpected inputs to fail fast.",
    explanation: "Prevents silent propagation of corrupted data.",
    hint: "Throw IllegalArgumentException on unknown inputs.",
    level: "intermediate",
    codeExample: "default: throw new IllegalArgumentException(\"Unknown command: \" + cmd);"
  },
  {
    question: "What is the result of `int x = 10; switch (x) { default: print(\"D\"); break; case 10: print(\"10\"); break; }`?",
    shortAnswer: "Prints `\"10\"`.",
    explanation: "The matching `case 10` is checked first and executed; `default` is bypassed regardless of its physical placement at the top.",
    hint: "Matching cases always take priority over default.",
    level: "intermediate",
    codeExample: "int x = 10; switch (x) { default: print(\"D\"); break; case 10: print(\"10\"); break; } // 10"
  },
  {
    question: "In the Coder & AccoTax Barrackpore banking engine, how is `default` used?",
    shortAnswer: "To throw an `IllegalArgumentException` whenever an unlisted transaction action code is supplied, preventing unauthorized fund operations in Indian Rupees (₹).",
    explanation: "Enforces banking transaction integrity.",
    hint: "Throws exception on unlisted banking actions.",
    level: "basic",
    codeExample: "default: throw new IllegalArgumentException(\"Unsupported: \" + action);"
  },
  {
    question: "Can `default` have a colon `:` or an arrow `->` in modern Java?",
    shortAnswer: "Yes! In traditional switch it uses `default:`; in modern switch expressions it uses `default ->`.",
    explanation: "Arrow syntax is used with modern switch expressions.",
    hint: "default: vs default ->",
    level: "basic",
    codeExample: "default → \"Fallback\";"
  },
  {
    question: "What bytecode instruction is emitted for the `default` branch?",
    shortAnswer: "The `default` label offset is encoded directly inside the `tableswitch` or `lookupswitch` instruction frame as the jump destination when no case matches.",
    explanation: "Built directly into JVM switch opcodes.",
    hint: "Default target address encoded in tableswitch/lookupswitch.",
    level: "advanced",
    codeExample: "// Bytecode: tableswitch 1 to 3: L1, L2, L3 default: L_DEFAULT"
  },
  {
    question: "What happens if a switch on an `enum` covers all enum constants and includes a `default` block?",
    shortAnswer: "The `default` block will never execute during normal runs, but serves as defensive protection if a new enum constant is added in the future without updating the switch.",
    explanation: "Protects against future enum additions.",
    hint: "Future-proofs code against new enum constants.",
    level: "intermediate",
    codeExample: "default: throw new IllegalStateException(\"Unexpected branch: \" + branch);"
  },
  {
    question: "What is the result of `int x = 5; switch (x) { case 1: print(\"1\"); default: print(\"D\"); case 2: print(\"2\"); }`?",
    shortAnswer: "Prints `\"D2\"`.",
    explanation: "5 matches no case, jumps to `default`, prints `D`, and falls through into `case 2` to print `2`.",
    hint: "Jumps to default, then falls through into case 2.",
    level: "intermediate",
    codeExample: "int x = 5; switch (x) { case 1: print(\"1\"); default: print(\"D\"); case 2: print(\"2\"); } // D2"
  },
  {
    question: "Can an empty `default:` block exist in a switch statement (`default: break;` or `default:`)?",
    shortAnswer: "Yes! An empty default block is syntactically valid in Java.",
    explanation: "Explicitly documents that unmatched values are intentionally ignored.",
    hint: "Empty default is valid syntax.",
    level: "basic",
    codeExample: "default: break;"
  },
  {
    question: "Why should developers avoid leaving `default:` completely empty without a comment?",
    shortAnswer: "Because future maintainers cannot distinguish whether unmatched cases were intentionally ignored or accidentally overlooked.",
    explanation: "Self-documenting code best practice.",
    hint: "Add comment: // No action needed.",
    level: "basic",
    codeExample: "default:\n    // Intentionally no-op for unlisted statuses\n    break;"
  },
  {
    question: "What is the result of `int x = 1; switch (x) { case 1: print(\"1\"); default: print(\"D\"); }`?",
    shortAnswer: "Prints `\"1D\"` (due to missing break in case 1).",
    explanation: "Matches `case 1` and falls through into `default`.",
    hint: "Falls through into default.",
    level: "basic",
    codeExample: "int x = 1; switch (x) { case 1: print(\"1\"); default: print(\"D\"); } // 1D"
  },
  {
    question: "How does Definite Assignment (JLS §16) treat local variables initialized in `case` branches without a `default` block?",
    shortAnswer: "The variable is NOT definitely assigned because if no case matches, the variable remains uninitialized.",
    explanation: "Adding a `default` that assigns the variable ensures definite assignment.",
    hint: "Requires default to guarantee definite assignment.",
    level: "advanced",
    codeExample: "int res;\nswitch (x) { case 1: res = 1; break; default: res = 0; break; }\nSystem.out.println(res); // Definitely assigned!"
  },
  {
    question: "Can a `default` label be combined with a `case` label in Java 14+ (`case null, default ->`)?",
    shortAnswer: "Yes! Java 17-21 pattern matching enhancements permit `case null, default ->` to handle both null and fallback cases together.",
    explanation: "Topic 16 covers modern pattern matching guards.",
    hint: "case null, default is permitted in modern Java.",
    level: "advanced",
    codeExample: "case null, default → handleFallback();"
  },
  {
    question: "What is the result of `String s = \"TEST\"; switch (s) { case \"PROD\": print(\"P\"); break; default: print(\"D\"); break; }`?",
    shortAnswer: "Prints `\"D\"`.",
    explanation: "\"TEST\" does not match \"PROD\", so `default` executes.",
    hint: "Prints D.",
    level: "basic",
    codeExample: "String s = \"TEST\"; switch (s) { case \"PROD\": print(\"P\"); break; default: print(\"D\"); break; } // D"
  },
  {
    question: "What happens if a switch selector is `null` and a `default` block is present in traditional switch?",
    shortAnswer: "Throws `NullPointerException` BEFORE reaching the `default` block!",
    explanation: "Traditional switch evaluates the selector first and throws NPE on null.",
    hint: "Throws NPE before reaching default.",
    level: "intermediate",
    codeExample: "String s = null;\n// switch (s) { default: print(\"Safe\"); } // THROWS NullPointerException"
  },
  {
    question: "How does Java 21 handle `null` selectors in switch statements?",
    shortAnswer: "Allows an explicit `case null:` label to handle null values without throwing `NullPointerException`.",
    explanation: "Modern pattern matching enhancement in Java 21.",
    hint: "case null label handles nulls safely in Java 21.",
    level: "advanced",
    codeExample: "switch (s) { case null → \"Null value\"; default → \"Valid\"; }"
  },
  {
    question: "What is the difference between `default` in a switch statement and `default` in an interface?",
    shortAnswer: "In a switch statement, `default` defines the fallback branch; in an interface, `default` defines a default method implementation with a concrete body.",
    explanation: "Dual meaning of the `default` reserved keyword in Java.",
    hint: "Switch fallback branch vs interface default method.",
    level: "intermediate",
    codeExample: "public interface Service { default void log() { } }"
  },
  {
    question: "What is the difference between `default` in a switch and `default` in an annotation?",
    shortAnswer: "In an annotation, `default` specifies the default attribute value (e.g. `String value() default \"\";`).",
    explanation: "Third usage of the `default` keyword in Java.",
    hint: "Annotation attribute default value.",
    level: "intermediate",
    codeExample: "public @interface Author { String name() default \"Sukanta\"; }"
  },
  {
    question: "Can `default` be placed between two `case` labels (`case 1: default: case 2:`)?",
    shortAnswer: "Yes! It acts as a stacked label sharing execution with `case 2`.",
    explanation: "Legal syntax, though considered confusing and poor style.",
    hint: "Legal, but considered poor style.",
    level: "intermediate",
    codeExample: "case 1: break; default: case 2: handleShared(); break;"
  },
  {
    question: "What is the execution cost of a `default` branch in bytecode?",
    shortAnswer: "Zero additional overhead; the default jump target address is built directly into the jump table instruction.",
    explanation: "Direct jump if selector is out of range.",
    hint: "Zero overhead; embedded in jump table.",
    level: "advanced",
    codeExample: "// tableswitch default target offset"
  },
  {
    question: "In the Coder & AccoTax Barrackpore course registry, how is `default` used for tuition counseling?",
    shortAnswer: "When an unrecognized course code is passed, `default` outputs a prompt directing the student to the general enrollment and counseling desk in Indian Rupees (₹).",
    explanation: "Provides friendly fallback guidance.",
    hint: "Redirects unlisted tracks to counseling desk.",
    level: "basic",
    codeExample: "default: System.out.println(\"Consult Admissions Desk\"); break;"
  },
  {
    question: "Why should every switch statement have either an exhaustive set of cases or a `default` block?",
    shortAnswer: "To ensure that every possible input produces a known, deterministic outcome rather than silently ignoring unhandled cases.",
    explanation: "Core tenet of defensive software engineering.",
    hint: "Guarantees deterministic handling for all inputs.",
    level: "basic",
    codeExample: "// Exhaustive handling prevents silent omission bugs"
  },
  {
    question: "What is the ultimate takeaway of Module 001_004 Topic 8 for Java developers?",
    shortAnswer: "The `default` label provides a vital fallback mechanism for unhandled selector values; always place `default` at the bottom of the switch block, include a defensive `break;` or exception, and use it to guarantee Definite Assignment.",
    explanation: "Mastering default placement ensures robust, crash-immune multi-branch dispatching.",
    hint: "Always place default at the bottom with a defensive break or exception.",
    level: "basic",
    codeExample: "// Summary: Always place default: at the bottom with a break or throw exception"
  },
  {
    question: "What is the next topic (Topic 9) in Module 001_004?",
    shortAnswer: "Comparing 'switch' vs 'else-if' ladder: readability, jump tables, and performance.",
    explanation: "Topic 9 explores when to use switch vs else-if, bytecode performance benchmarks, and readability trade-offs.",
    hint: "Comparing switch vs else-if ladder.",
    level: "basic",
    codeExample: "// Topic 9: switch vs else-if ladder comparison"
  }
];

export default questions;
