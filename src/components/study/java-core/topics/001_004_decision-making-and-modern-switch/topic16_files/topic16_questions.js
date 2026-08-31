/**
 * Module 001_004: Topic 16: Guard conditions in pattern matching (Java 17-21 preview overview)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is Pattern Matching for `switch` in Java?",
    shortAnswer: "A language feature (standardized in Java 21 under JEP 441) that allows switch expressions and statements to match on type patterns (`case String s`), extracting and casting the variable automatically.",
    explanation: "Replaces complex `instanceof` cascades with clean pattern matching.",
    hint: "Matches and casts types directly in case branches.",
    level: "basic",
    codeExample: "switch (obj) { case String s → s.toLowerCase(); }"
  },
  {
    question: "What is a Guard Clause (`when` clause) in pattern matching switch?",
    shortAnswer: "A boolean expression appended to a case pattern using the contextual keyword `when` (`case Type var when booleanCondition ->`), which must evaluate to `true` for the branch to match.",
    explanation: "Allows fine-grained pattern filtering without nested `if` statements.",
    hint: "Appends boolean condition using 'when'.",
    level: "basic",
    codeExample: "case Student s when s.getMarks() >= 90 → \"Honors\";"
  },
  {
    question: "What keyword was previously used for guards during Java 17-18 previews before `when` was finalized?",
    shortAnswer: "`&&` was used in early previews (e.g. `case String s && s.length() > 5`), but Java 19+ finalized the keyword `when` to prevent operator grammar ambiguities.",
    explanation: "Java 19, 20, 21 finalized the `when` contextual keyword.",
    hint: "&& was replaced by the contextual keyword 'when'.",
    level: "intermediate",
    codeExample: "// Java 17 preview: case String s && ... → Java 21: case String s when ..."
  },
  {
    question: "What is the Pattern Dominance rule in Java pattern matching switch?",
    shortAnswer: "A more general (broader) type pattern dominates a narrower or guarded pattern; the compiler enforces that guarded and specific patterns MUST appear before broad patterns.",
    explanation: "Prevents unreachable dead code branches.",
    hint: "Guarded specific patterns must precede broad unguarded patterns.",
    level: "intermediate",
    codeExample: "// Correct ordering:\ncase String s when s.isEmpty() → 1;\ncase String s → 2;"
  },
  {
    question: "What happens if an unguarded `case String s` is placed BEFORE `case String s when s.length() > 5`?",
    shortAnswer: "Compilation error: 'this case label is dominated by a preceding case label'.",
    explanation: "The compiler detects that the second guarded case can never be reached.",
    hint: "Compile error: case label is dominated.",
    level: "intermediate",
    codeExample: "// case String s → ...\n// case String s when ... // COMPILER ERROR: dominated!"
  },
  {
    question: "How does Java 21 handle `null` in pattern matching switch statements?",
    shortAnswer: "By providing explicit `case null ->` or `case null, default ->` branches that safely catch null references without throwing `NullPointerException`.",
    explanation: "Revolutionizes null handling in Java control flow.",
    hint: "case null → handles nulls safely without NPE.",
    level: "basic",
    codeExample: "switch (obj) { case null → \"Null Input\"; case String s → s; }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student auditor, how do `when` guards classify scholarships?",
    shortAnswer: "By checking student marks on `StudentRecord` (`case StudentRecord s when s.marks() >= 90 → \"Honors Gold Medalist\"`) in Indian Rupees (₹).",
    explanation: "Demonstrates practical pattern matching with record deconstruction.",
    hint: "Records filtered by marks using 'when' guards.",
    level: "basic",
    codeExample: "case StudentRecord s when s.marks() >= 90 → \"Gold Medalist\";"
  },
  {
    question: "Is `when` a reserved global keyword in Java 21?",
    shortAnswer: "No, `when` is a Contextual Keyword; you can still have variables, parameters, or methods named `when` outside of pattern case labels.",
    explanation: "Restricted contextual identifier.",
    hint: "Contextual keyword.",
    level: "intermediate",
    codeExample: "int when = 10; // Valid variable name outside pattern matching!"
  },
  {
    question: "What happens if a guard condition `when` throws a runtime exception (e.g. `NullPointerException` or `ArithmeticException`)?",
    shortAnswer: "The exception halts switch execution immediately and propagates up the call stack.",
    explanation: "Guard exceptions are not swallowed.",
    hint: "Exceptions in guards propagate immediately.",
    level: "intermediate",
    codeExample: "case String s when s.length() / 0 == 1 → // Throws ArithmeticException"
  },
  {
    question: "Can multiple boolean conditions be combined in a single `when` guard clause?",
    shortAnswer: "Yes! Using standard logical operators: `case Student s when s.getMarks() >= 80 && s.getFeePaid() > 0 → ...`.",
    explanation: "Full support for boolean logic in guards.",
    hint: "Combine conditions with &&, ||, and !.",
    level: "basic",
    codeExample: "case Student s when s.getMarks() >= 80 && s.hasPaidFee() → ..."
  },
  {
    question: "What is Record Pattern Matching in Java 21 (JEP 440)?",
    shortAnswer: "Deconstructing a record's components directly inside a case pattern: `case StudentRecord(String name, int marks, double fee) when marks >= 90 → ...`.",
    explanation: "Extracts record fields directly into local variables.",
    hint: "Deconstructs record fields directly in case label.",
    level: "advanced",
    codeExample: "case StudentRecord(String name, int marks, double fee) → ..."
  },
  {
    question: "Can a switch with pattern matching match against primitive values and reference types simultaneously?",
    shortAnswer: "Yes, when switching on an `Object` selector, branches can match `Integer`, `String`, `Double`, custom records, etc.",
    explanation: "Provides unified polymorphic dispatching.",
    hint: "Polymorphic dispatch across any object types.",
    level: "intermediate",
    codeExample: "switch (obj) { case Integer i → i * 2; case String s → s.length(); }"
  },
  {
    question: "What is the Exhaustiveness rule for pattern matching on Sealed Classes in Java 21?",
    shortAnswer: "If all permitted subclasses of a sealed class/interface are covered by type patterns in the switch, the compiler considers the switch exhaustive without requiring a `default` label.",
    explanation: "Sealed hierarchies provide complete type coverage guarantees.",
    hint: "Exhaustive if all permitted subclasses of sealed class are covered.",
    level: "advanced",
    codeExample: "switch (sealedShape) { case Circle c → ...; case Square s → ...; } // Exhaustive"
  },
  {
    question: "What is the result of `Object obj = \"Barrackpore\"; String res = switch (obj) { case String s when s.startsWith(\"B\") → \"HQ\"; default → \"Other\"; };`?",
    shortAnswer: "`res = \"HQ\"`.",
    explanation: "`\"Barrackpore\"` is a String and starts with \"B\", satisfying the guard.",
    hint: "Evaluates to \"HQ\".",
    level: "basic",
    codeExample: "switch (\"Barrackpore\") { case String s when s.startsWith(\"B\") → \"HQ\"; }"
  },
  {
    question: "What happens if a switch selector is `Object obj` and the switch expression has no `default` or total pattern?",
    shortAnswer: "Compilation error: `Object` has infinitely many subtypes, so a `default` or total `case Object o` pattern is mandatory for exhaustiveness.",
    explanation: "Compiler enforces exhaustiveness on open object hierarchies.",
    hint: "default or case Object is required for Object selectors.",
    level: "basic",
    codeExample: "// switch ((Object)x) { case String s → ...; } // ERROR: missing default"
  },
  {
    question: "What is a 'Total Pattern' in Java pattern matching?",
    shortAnswer: "A pattern that matches every possible non-null value of the selector type (e.g. `case Object o` for an `Object` selector).",
    explanation: "Acts as a type-safe fallback matching any object.",
    hint: "Matches all values of the selector type.",
    level: "advanced",
    codeExample: "case Object o → handleAnyObject(o);"
  },
  {
    question: "Can a `case null, default ->` rule be used in Java 21 switch expressions?",
    shortAnswer: "Yes! Combines null handling and the fallback branch into a single clean rule.",
    explanation: "Standardized in Java 21.",
    hint: "case null, default → combines null and fallback.",
    level: "basic",
    codeExample: "case null, default → handleFallback();"
  },
  {
    question: "Can a pattern variable declared in a case label be used in subsequent cases?",
    shortAnswer: "No! Pattern variables are strictly scoped to their matching case rule/block.",
    explanation: "Isolated pattern variable scope.",
    hint: "Pattern variables are scoped only to their own case branch.",
    level: "basic",
    codeExample: "case String s → s.trim(); // 's' only exists here!"
  },
  {
    question: "What is the difference between `if (obj instanceof String s && s.length() > 5)` and `case String s when s.length() > 5`?",
    shortAnswer: "Both evaluate the same semantic condition, but pattern switch organizes multiple polymorphic types into a single readable, tabular structure with jump-table optimization.",
    explanation: "Switch provides better multi-branch structure and compiler exhaustiveness checks.",
    hint: "Pattern switch organizes multi-type branches cleanly with exhaustiveness.",
    level: "intermediate",
    codeExample: "// case String s when s.length() > 5 → ... (cleaner than chained if instanceof)"
  },
  {
    question: "Can an ungarded constant case (e.g. `case \"SPECIAL\":`) appear before a type pattern (`case String s:`)?",
    shortAnswer: "Yes! Specific constant cases MUST appear before the broader type pattern `case String s` to avoid dominance compilation errors.",
    explanation: "Constant cases are more specific than general type patterns.",
    hint: "Constant cases must precede general type patterns.",
    level: "intermediate",
    codeExample: "case \"SPECIAL\" → handleSpecial();\ncase String s → handleGeneric(s);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore financial gateway, how are corporate grants handled?",
    shortAnswer: "By matching `CorporateGrant g when g.sanctionAmount() >= 100000.0` to route major enterprise sponsorships in Indian Rupees (₹).",
    explanation: "Demonstrates practical enterprise financial dispatching.",
    hint: "Filters corporate grants by sanction amount in ₹.",
    level: "basic",
    codeExample: "case CorporateGrant g when g.sanctionAmount() >= 100000.0 → ..."
  },
  {
    question: "Can a guard condition `when` call private methods on the enclosing class?",
    shortAnswer: "Yes! E.g. `case Student s when isValidAdmission(s) → ...`.",
    explanation: "Any accessible boolean method can be used in guards.",
    hint: "Can call private helper methods.",
    level: "basic",
    codeExample: "case Student s when isEligible(s) → approve();"
  },
  {
    question: "What is the execution overhead of pattern matching switch in Java 21 bytecode?",
    shortAnswer: "The JVM uses `invokedynamic` with `typeSwitch` bootstrap methods, achieving highly optimized $O(1)$ type index lookups combined with inline pattern tests.",
    explanation: "Leverages modern invokedynamic infrastructure for peak performance.",
    hint: "Uses invokedynamic typeSwitch bootstrap methods.",
    level: "expert",
    codeExample: "// Bytecode uses invokedynamic with SwitchBootstraps.typeSwitch"
  },
  {
    question: "Can `when` guards be used with traditional colon syntax (`case String s when s.isEmpty():`)?",
    shortAnswer: "Yes! Guard clauses are supported in both arrow syntax and colon syntax in Java 21.",
    explanation: "Supported across both switch syntaxes.",
    hint: "Supported in both arrow and colon syntax in Java 21.",
    level: "intermediate",
    codeExample: "case String s when s.isEmpty():\n    logEmpty();\n    break;"
  },
  {
    question: "What happens if a switch selector is of type `Number` and branches handle `Integer`, `Double`, `Long` with a `default`?",
    shortAnswer: "The switch compiles cleanly and dispatches dynamically based on the actual runtime object type.",
    explanation: "Clean polymorphic type dispatching.",
    hint: "Dispatches dynamically based on runtime object type.",
    level: "basic",
    codeExample: "switch (num) { case Integer i → i; case Double d → d; default → 0; }"
  },
  {
    question: "Why does pattern matching in switch eliminate the need for casting `((String) obj).substring(...)`?",
    shortAnswer: "Because the pattern variable (e.g. `s` in `case String s`) is automatically cast to `String` by the compiler, providing immediate type-safe access.",
    explanation: "Eliminates unsafe explicit casts.",
    hint: "Pattern variable is automatically typed and cast.",
    level: "basic",
    codeExample: "case String s → s.substring(0, 3); // No (String) cast needed!"
  },
  {
    question: "Can you match arrays with pattern matching in Java 21 (`case int[] arr when arr.length > 0 ->`)?",
    shortAnswer: "Yes! Array types are valid reference types in Java and can be matched via type patterns and guards.",
    explanation: "Full support for array type patterns.",
    hint: "Array types can be matched and guarded.",
    level: "intermediate",
    codeExample: "case int[] arr when arr.length > 0 → arr[0];"
  },
  {
    question: "What is the recommended best practice for ordering case branches with pattern matching and guards?",
    shortAnswer: "1. `case null ->`; 2. Specific constant literals (`case \"ADMIN\" ->`); 3. Narrow guarded type patterns (`case String s when s.length() > 10 ->`); 4. Broad unguarded type patterns (`case String s ->`); 5. Fallback `default ->`.",
    explanation: "Ensures logical progression from most specific to least specific.",
    hint: "null → specific constants → guarded patterns → broad patterns → default.",
    level: "intermediate",
    codeExample: "// Order: null → constants → guarded types → broad types → default"
  },
  {
    question: "What is the ultimate takeaway of Module 001_004 Topic 16 for Java developers?",
    shortAnswer: "Pattern Matching for switch with `when` guards (Java 21) elevates switch into a powerful polymorphic pattern-matching engine; it eliminates explicit casts, enables safe null handling (`case null ->`), and enforces pattern dominance rules for robust multi-type processing.",
    explanation: "Modern pinnacle of Java control flow and type dispatching.",
    hint: "Polymorphic type matching with 'when' guards and explicit null safety.",
    level: "basic",
    codeExample: "// Summary: case Type var when condition → result; (Java 21 pattern matching)"
  },
  {
    question: "What is the next and final topic (Topic 17) in Module 001_004?",
    shortAnswer: "Best practices for clean, maintainable conditional logic (avoiding deep nesting).",
    explanation: "Topic 17 concludes Module 001_004 with architectural best practices: guard clauses, early returns, cyclomatic complexity reduction, and eliminating the Pyramid of Doom.",
    hint: "Best practices for clean conditional logic and avoiding deep nesting.",
    level: "basic",
    codeExample: "// Topic 17: Clean Conditional Logic & Guard Clauses"
  }
];

export default questions;
