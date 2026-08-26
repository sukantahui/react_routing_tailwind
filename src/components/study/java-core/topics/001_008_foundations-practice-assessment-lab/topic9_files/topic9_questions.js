/**
 * Module 001_008: Topic 9: Debugging challenge: Identifying and resolving 10 common compilation & logical bugs
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "Why does `a == b` fail when comparing two `String` objects with identical content?",
    shortAnswer: "Because `==` compares heap memory reference addresses, not the underlying character sequence; use `a.equals(b)` or `Objects.equals(a, b)` for content equality.",
    explanation: "String reference vs content equality (Bug 1).",
    hint: "== compares memory addresses; .equals() compares character content.",
    level: "basic",
    codeExample: "boolean ok = a.equals(b); // Correct"
  },
  {
    question: "What causes a `NullPointerException` (NPE) in Java?",
    shortAnswer: "Attempting to invoke an instance method, access an instance field, or index an array on a reference variable that points to `null`.",
    explanation: "NullPointerException anatomy (Bug 2).",
    hint: "Calling methods or accessing fields on a null object reference.",
    level: "basic",
    codeExample: "String s = null; s.length(); // Throws NPE"
  },
  {
    question: "How do you prevent `ArrayIndexOutOfBoundsException` in standard for-loops?",
    shortAnswer: "Ensure the loop termination condition uses `i < arr.length` (strict inequality) rather than `i <= arr.length`.",
    explanation: "Off-by-one loop boundary fix (Bug 3).",
    hint: "Use i < arr.length because valid indices are 0 to length - 1.",
    level: "basic",
    codeExample: "for (int i = 0; i < arr.length; i++) { ... }"
  },
  {
    question: "Why does `int a = 5, b = 2; double avg = a / b;` evaluate to `2.0` instead of `2.5`?",
    shortAnswer: "Because `a / b` performs integer division first (truncating `5 / 2 = 2`), and only converts `2` to `2.0` upon assignment; cast one operand to double: `(double) a / b`.",
    explanation: "Integer division truncation bug (Bug 4).",
    hint: "Integer division truncates decimals before assigning to double; cast to (double) a / b.",
    level: "basic",
    codeExample: "double avg = (double) a / b; // 2.5"
  },
  {
    question: "Why does `int price = 1_000_000, qty = 3000; long total = price * qty;` produce a negative corrupted total?",
    shortAnswer: "Because `price * qty` multiplies two 32-bit `int` values, overflowing 32-bit `Integer.MAX_VALUE` before being promoted to `long`; fix: `(long) price * qty`.",
    explanation: "Arithmetic overflow before assignment (Bug 5).",
    hint: "Multiplication happens as 32-bit int before assignment; cast one operand to (long).",
    level: "basic",
    codeExample: "long total = (long) price * qty; // Prevents overflow"
  },
  {
    question: "What happens when an accidental semicolon is placed after a for-loop header: `for (int i=0; i<n; i++); count++;`?",
    shortAnswer: "The semicolon terminates the loop body with an empty statement; the loop runs `n` times doing nothing, and `count++` executes only ONCE after the loop terminates.",
    explanation: "Accidental semicolon empty loop body bug (Bug 6).",
    hint: "The semicolon creates an empty loop body; the following block executes only once.",
    level: "basic",
    codeExample: "for (int i = 0; i < n; i++) count++; // Removed semicolon"
  },
  {
    question: "What is Variable Shadowing in a constructor without `this`?",
    shortAnswer: "In `public Student(String name) { name = name; }`, the parameter `name` shadows the instance field, assigning the parameter to itself and leaving the field `null`.",
    explanation: "Variable shadowing in constructors (Bug 7).",
    hint: "Parameter shadows instance field; use this.name = name.",
    level: "basic",
    codeExample: "this.name = name; this.roll = roll;"
  },
  {
    question: "What happens when `break` statements are omitted in a legacy `switch` statement?",
    shortAnswer: "**Fall-Through Bug**: Execution falls through and executes all subsequent `case` blocks consecutively regardless of whether their condition matches.",
    explanation: "Switch fall-through bug (Bug 8).",
    hint: "Execution falls through and executes subsequent cases consecutively.",
    level: "basic",
    codeExample: "switch (x) { case 1 -> \"A\"; case 2 -> \"B\"; } // Modern switch expression"
  },
  {
    question: "What causes a `StackOverflowError` in recursive methods?",
    shortAnswer: "Missing or incorrect Base Cases, or recursive arguments that do not progress towards the base case, causing infinite recursive stack frame allocations.",
    explanation: "Infinite recursion and StackOverflowError (Bug 9).",
    hint: "Missing base case causes infinite stack frame pushes until memory exhausts.",
    level: "basic",
    codeExample: "if (n <= 0) return 0; // Mandatory Base Case"
  },
  {
    question: "What causes `ConcurrentModificationException` when modifying a List in an enhanced for-each loop?",
    shortAnswer: "Calling `list.remove()` or `list.add()` directly while iterating modifies `modCount` without updating the Iterator's `expectedModCount`.",
    explanation: "ConcurrentModificationException in collections (Bug 10).",
    hint: "Directly modifying a list during for-each iteration breaks internal iterator state.",
    level: "intermediate",
    codeExample: "list.removeIf(s -> s.equals(target)); // Safe removal"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the safe result of `fixBug2_NullSafety(null)`?",
    shortAnswer: "`0` (handled safely via ternary null check without throwing NPE).",
    explanation: "Null safety return verification.",
    hint: "0.",
    level: "basic",
    codeExample: "fixBug2_NullSafety(null) -> 0"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the average marks for 95 total marks across 2 subjects?",
    shortAnswer: "`47.50` (correctly computed using `(double) totalMarks / subjectCount`).",
    explanation: "Integer division fix output.",
    hint: "47.50.",
    level: "basic",
    codeExample: "fixBug4_IntegerDivision(95, 2) -> 47.50"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the correct product of $1,000,000 \\times 3000$ in Indian Rupees?",
    shortAnswer: "`₹3,000,000,000` (3 billion INR, safely handled via `(long) price * qty`).",
    explanation: "Long overflow fix output.",
    hint: "₹3,000,000,000.",
    level: "basic",
    codeExample: "fixBug5_IntegerOverflow(1_000_000, 3000) -> 3,000,000,000L"
  },
  {
    question: "Why is `list.removeIf(predicate)` preferred over `Iterator.remove()` in modern Java?",
    shortAnswer: "`removeIf()` is concise, declarative, thread-safe for concurrent collections, and optimized internally by `ArrayList` to perform a single batch shift of elements.",
    explanation: "removeIf modern collection API advantage.",
    hint: "removeIf() performs batch element shifting in O(N) time with clean syntax.",
    level: "intermediate",
    codeExample: "students.removeIf(s -> s.equals(\"Tuhina\"));"
  },
  {
    question: "What compiler error occurs if a non-void method is missing a `return` statement in one execution path?",
    shortAnswer: "`error: missing return statement`.",
    explanation: "Compiler unreachable or missing return check.",
    hint: "error: missing return statement.",
    level: "basic",
    codeExample: "// Compiler ensures every logical path returns a value"
  },
  {
    question: "Why should `Objects.equals(a, b)` be used for null-safe object equality?",
    shortAnswer: "`Objects.equals(a, b)` safely handles cases where either `a` or `b` (or both) are `null` without throwing `NullPointerException`.",
    explanation: "Objects.equals null safety utility.",
    hint: "Safely handles null values on either side of the comparison.",
    level: "basic",
    codeExample: "Objects.equals(str1, str2);"
  },
  {
    question: "What is a 'Phantom Semicolon' after an `if` condition: `if (x > 10); doSomething();`?",
    shortAnswer: "The semicolon terminates the `if` body immediately; `doSomething()` executes unconditionally regardless of whether `x > 10` is true or false.",
    explanation: "Accidental semicolon in if-statement.",
    hint: "Semicolon terminates if statement; block executes unconditionally.",
    level: "basic",
    codeExample: "if (x > 10) doSomething(); // Removed semicolon"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, who was remaining in the student list after removing `\"Tuhina\"`?",
    shortAnswer: "`[\"Swadeep\", \"Abhronila\", \"Debangshu\"]`.",
    explanation: "removeIf list modification verification.",
    hint: "[Swadeep, Abhronila, Debangshu].",
    level: "basic",
    codeExample: "Remaining = [Swadeep, Abhronila, Debangshu]"
  },
  {
    question: "Why does `char c = 'A'; int val = c;` compile without cast, but `int val = 65; char c = val;` fails?",
    shortAnswer: "`char` to `int` is Widening (16-bit to 32-bit); `int` to `char` is Narrowing (32-bit to 16-bit), requiring an explicit cast `(char) val`.",
    explanation: "Widening vs Narrowing type rules.",
    hint: "int to char requires explicit narrowing cast (char) val.",
    level: "basic",
    codeExample: "char c = (char) val; // Explicit cast required"
  },
  {
    question: "What is the consequence of modifying a loop control variable inside the body of a `for` loop?",
    shortAnswer: "It makes loop progression unpredictable, leading to infinite loops or skipped iterations. Loop counters should only be incremented in the `for` header.",
    explanation: "Loop counter manipulation anti-pattern.",
    hint: "Can cause skipped elements or infinite loops.",
    level: "basic",
    codeExample: "// Avoid modifying 'i' inside for(int i=0; ...; i++) body"
  },
  {
    question: "How does Java 14+ Enhanced Switch eliminate fall-through bugs permanently?",
    shortAnswer: "The arrow syntax (`case X -> ...`) executes only the targeted branch without falling through to subsequent cases, eliminating the need for `break` statements.",
    explanation: "Enhanced switch expression syntax.",
    hint: "Arrow syntax (case ->) executes only the matching branch with zero fall-through.",
    level: "basic",
    codeExample: "case 1 -> \"Monday\";"
  },
  {
    question: "What is the difference between `Checked` and `Unchecked` exceptions in Java?",
    shortAnswer: "**Checked Exceptions** (subclasses of `Exception` excluding `RuntimeException`) are verified at compile-time and require `try-catch` or `throws`; **Unchecked Exceptions** (subclasses of `RuntimeException` like NPE, `ArrayIndexOutOfBoundsException`) occur at runtime.",
    explanation: "Checked vs Unchecked exceptions categorization.",
    hint: "Checked verified at compile-time; Unchecked occur at runtime.",
    level: "intermediate",
    codeExample: "IOException (Checked) vs NullPointerException (Unchecked)"
  },
  {
    question: "Why should `double` NEVER be used for precise financial calculations in Indian Rupees (`₹`)?",
    shortAnswer: "Binary floating-point types (`double`/`float`) cannot represent decimal fractions like `0.1` or `0.05` exactly, causing rounding errors (e.g. `0.1 + 0.2 = 0.30000000000000004`). Use `BigDecimal` or store integer paise.",
    explanation: "Floating point financial inaccuracy hazard.",
    hint: "Floating point fractions cause rounding errors; use BigDecimal or integer paise.",
    level: "intermediate",
    codeExample: "BigDecimal price = new BigDecimal(\"199.99\");"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was `s.name` after fixing the StudentRecord constructor with `this.name = name`?",
    shortAnswer: "`\"Swadeep\"`.",
    explanation: "Constructor variable shadowing fix verification.",
    hint: "Swadeep.",
    level: "basic",
    codeExample: "s.name -> \"Swadeep\""
  },
  {
    question: "How can static analysis tools (SonarQube, SpotBugs, Checkstyle) catch these 10 bugs automatically?",
    shortAnswer: "They inspect Abstract Syntax Trees (AST) and bytecode to flag anti-patterns like `==` on strings, empty loop bodies, potential NPEs, and arithmetic overflows before code compiles.",
    explanation: "Static code analysis in CI/CD pipelines.",
    hint: "AST and bytecode static analyzers flag common bugs automatically in CI/CD.",
    level: "intermediate",
    codeExample: "// SonarQube & SpotBugs automated rule enforcement"
  },
  {
    question: "What compiler error happens when accessing an uninitialized local variable in Java?",
    shortAnswer: "`error: variable x might not have been initialized` (Java enforces Definite Assignment for local variables).",
    explanation: "Definite assignment rule in Java.",
    hint: "error: variable x might not have been initialized.",
    level: "basic",
    codeExample: "int x; System.out.println(x); // Compile error"
  },
  {
    question: "What is an 'Unreachable Code' error in Java?",
    shortAnswer: "Placing statements immediately following an unconditional `return`, `break`, `continue`, or `throw` statement inside the same block.",
    explanation: "Unreachable code compiler error.",
    hint: "Statements placed after unconditional return/throw/break.",
    level: "basic",
    codeExample: "return 5; int x = 10; // error: unreachable statement"
  },
  {
    question: "What is the ultimate takeaway of Module 001_008 Topic 9 for Java developers?",
    shortAnswer: "Mastering debugging requires defensive coding: always compare strings with `.equals()`, guard against `null`, protect arithmetic with `(double)`/`(long)` casts, use modern switch expressions, enforce recursive base cases, and avoid mutating collections during for-each iteration.",
    explanation: "Mastery of Java core debugging practices.",
    hint: "Defensive coding: .equals(), null guards, type casting, modern switch, removeIf.",
    level: "basic",
    codeExample: "// Summary: .equals() | null guards | (long) casts | switch expressions | removeIf"
  },
  {
    question: "What is the next topic (Topic 10) in Module 001_008?",
    shortAnswer: "Writing clean, readable code conforming to Google Java Style Guide.",
    explanation: "Topic 10 covers formatting, naming, and architectural conventions conforming to Google Java Style Guide.",
    hint: "Writing clean, readable code conforming to Google Java Style Guide.",
    level: "basic",
    codeExample: "// Topic 10: Clean Code & Google Java Style Guide"
  },
  {
    question: "How does Java 21 `NullPointerException` enhanced messages assist in debugging?",
    shortAnswer: "Helpful NPEs in modern JDK pinpoint the exact sub-expression that was null (e.g. `Cannot invoke \"String.length()\" because \"student.getAddress().city\" is null`).",
    explanation: "Helpful NullPointerExceptions (JEP 358).",
    hint: "Modern JVM pinpoints the exact method call or field that evaluated to null.",
    level: "advanced",
    codeExample: "// JEP 358 Helpful NullPointerExceptions in modern JDK"
  }
];

export default questions;
