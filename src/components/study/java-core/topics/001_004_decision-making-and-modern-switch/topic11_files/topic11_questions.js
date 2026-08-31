/**
 * Module 001_004: Topic 11: Modern Switch Expressions (introduced in Java 14+): arrow syntax (case X → Y)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "When were Modern Switch Expressions officially standardized in Java?",
    shortAnswer: "In Java SE 14 (under JEP 361), after previewing in Java 12 and 13.",
    explanation: "One of the most significant modern enhancements to the Java language.",
    hint: "Standardized in Java 14 (JEP 361).",
    level: "basic",
    codeExample: "int res = switch (day) { case 1 → 100; default → 0; };"
  },
  {
    question: "What is Arrow Syntax (`case X → Y`) in modern switch?",
    shortAnswer: "A clean syntax where `case` labels use `->` instead of `:` to directly specify the single expression, statement, or block to execute.",
    explanation: "Replaces traditional colon syntax with functional arrow notation.",
    hint: "Uses → instead of : for branches.",
    level: "basic",
    codeExample: "case \"JAVA\" → 15000;"
  },
  {
    question: "What is the primary difference between a Switch Statement and a Switch Expression?",
    shortAnswer: "A Switch Statement executes code solely for side effects (does not produce a value); a Switch Expression computes and yields a single value that can be assigned directly to a variable.",
    explanation: "Expressions evaluate to values; statements execute actions.",
    hint: "Expressions produce values; statements execute actions.",
    level: "basic",
    codeExample: "int fee = switch (course) { case JAVA → 15000; default → 0; }; // Expression"
  },
  {
    question: "Is the `break` statement used in arrow switch expressions?",
    shortAnswer: "No! The `break` keyword is completely unnecessary and obsolete in arrow switch; the arrow `->` automatically delimits the execution unit.",
    explanation: "Writing `break` inside an arrow expression is a compile-time error.",
    hint: "No break statements needed with arrow syntax.",
    level: "basic",
    codeExample: "// No 'break;' needed in 'case 1 → 10;'"
  },
  {
    question: "What is the Fall-Through behavior in Arrow Switch (`case X ->`)?",
    shortAnswer: "There is ZERO fall-through! Only the expression or block to the right of the matching arrow executes.",
    explanation: "Topic 12 explores fall-through elimination in detail.",
    hint: "Zero fall-through by design.",
    level: "basic",
    codeExample: "case 1 → doA(); // Will NEVER fall into case 2!"
  },
  {
    question: "Why is a trailing semicolon `;` required at the end of a Switch Expression assignment?",
    shortAnswer: "Because the switch expression forms the right-hand side of a variable declaration or assignment statement (e.g. `int val = switch (...) { ... };`).",
    explanation: "All assignment statements in Java must terminate with a semicolon.",
    hint: "Assignment statements require a terminating semicolon.",
    level: "basic",
    codeExample: "int fee = switch (track) { ... }; // Note trailing semicolon"
  },
  {
    question: "Can an arrow switch be used as a Statement (without assigning its result)?",
    shortAnswer: "Yes! `switch (cmd) { case \"A\" → runA(); default → fallback(); }` is a valid switch statement using arrow syntax.",
    explanation: "Arrow syntax can be used for both expressions and statements.",
    hint: "Valid as both statements and expressions.",
    level: "basic",
    codeExample: "switch (cmd) { case \"GO\" → start(); }"
  },
  {
    question: "Can an arrow branch execute multiple statements enclosed in curly braces `{ ... }`?",
    shortAnswer: "Yes! E.g. `case JAVA_CORE → { log(); returnFee(); }`.",
    explanation: "Topic 15 explains returning values from multi-statement blocks via `yield`.",
    hint: "Multi-statement bodies use curly braces {}.",
    level: "basic",
    codeExample: "case \"PAY\" → {\n    log();\n    process();\n}"
  },
  {
    question: "In the Coder & AccoTax Barrackpore curriculum, how does arrow switch simplify course tuition calculations?",
    shortAnswer: "By directly returning course tuition fees (`int fee = switch (track) { case JAVA_CORE → 15000; ... };`) without temporary variables or boilerplate breaks in Indian Rupees (₹).",
    explanation: "Demonstrates clean value mapping.",
    hint: "Direct tuition assignment in ₹.",
    level: "basic",
    codeExample: "int fee = switch (track) { case JAVA_CORE → 15000; default → 10000; };"
  },
  {
    question: "Can you mix colon syntax (`case 1:`) and arrow syntax (`case 2 ->`) in the same switch block?",
    shortAnswer: "No! Mixing `:` and `->` in the same switch block causes a compile-time error ('different case kinds used in the switch').",
    explanation: "A switch must consistently use either colon syntax or arrow syntax.",
    hint: "Cannot mix : and → in the same switch.",
    level: "intermediate",
    codeExample: "// switch (x) { case 1: ... case 2 → ... } // COMPILER ERROR"
  },
  {
    question: "What is the variable scoping rule for individual arrow branches in modern switch?",
    shortAnswer: "Each arrow branch (`case X → { ... }` or `case X → expr;`) has its own independent block scope, completely eliminating scope collisions across cases!",
    explanation: "Variables declared inside an arrow block are not visible to other cases.",
    hint: "Independent local scope per arrow branch.",
    level: "intermediate",
    codeExample: "case 1 → { int temp = 10; }\ncase 2 → { int temp = 20; } // Legal! (Independent scopes)"
  },
  {
    question: "What happens if a switch expression does not cover all possible values and omits `default`?",
    shortAnswer: "Compilation error: 'the switch expression does not cover all possible input values' (Exhaustiveness check).",
    explanation: "Topic 14 covers exhaustiveness rules in detail.",
    hint: "Switch expressions must be exhaustive.",
    level: "basic",
    codeExample: "// int x = switch (n) { case 1 → 10; }; // ERROR: missing default!"
  },
  {
    question: "When is `default` NOT required in a switch expression?",
    shortAnswer: "When switching on an `enum` (or sealed class in Java 17+) where ALL possible constants are explicitly handled.",
    explanation: "The compiler verifies that all enum constants are covered.",
    hint: "Not required when all enum constants are covered.",
    level: "intermediate",
    codeExample: "int fee = switch (allEnumConstantsCovered) { ... }; // No default needed"
  },
  {
    question: "What bytecode is generated for a modern arrow switch expression?",
    shortAnswer: "The JVM compiles it into the same highly optimized `tableswitch` or `lookupswitch` instructions, storing the evaluated result onto the operand stack.",
    explanation: "Zero runtime performance penalty compared to traditional switch.",
    hint: "Compiles to standard tableswitch/lookupswitch jump tables.",
    level: "advanced",
    codeExample: "// Compiles to tableswitch with operand stack return"
  },
  {
    question: "Can an arrow branch throw an exception directly (`case ERROR → throw new RuntimeException();`)?",
    shortAnswer: "Yes! Throwing an exception from an arrow branch is completely legal and satisfies the expression type system.",
    explanation: "A `throw` expression has bottom type and satisfies exhaustiveness.",
    hint: "Direct throw expression is legal in arrow branches.",
    level: "intermediate",
    codeExample: "default → throw new IllegalArgumentException(\"Bad token\");"
  },
  {
    question: "Can an arrow expression invoke a method directly (`case 1 → calculateBonus()`)?",
    shortAnswer: "Yes! The return value of the method becomes the value of the switch expression.",
    explanation: "Methods returning matching types can be called directly.",
    hint: "Method return value becomes switch expression result.",
    level: "basic",
    codeExample: "int bonus = switch (tier) { case 1 → calculateBonus(); default → 0; };"
  },
  {
    question: "What is the return type of a switch expression if branches return `int` and `double`?",
    shortAnswer: "The compiler infers the most specific common supertype (in this case, `double` via widening primitive conversion).",
    explanation: "Standard conditional expression type inference (JLS §15.28).",
    hint: "Infers common supertype (e.g. double for int and double).",
    level: "intermediate",
    codeExample: "double val = switch (x) { case 1 → 10; default → 20.5; };"
  },
  {
    question: "What is the result of `String s = switch (1) { case 1 → \"One\"; default → \"Other\"; };`?",
    shortAnswer: "`s = \"One\"`.",
    explanation: "Direct evaluation and assignment.",
    hint: "Evaluates to \"One\".",
    level: "basic",
    codeExample: "String s = switch (1) { case 1 → \"One\"; default → \"Other\"; };"
  },
  {
    question: "Can a switch expression be used as a method argument (`print(switch (x) { ... });`)?",
    shortAnswer: "Yes! Switch expressions can be embedded anywhere any normal expression is permitted.",
    explanation: "Can be passed directly to method calls, constructors, or return statements.",
    hint: "Can be embedded inside method arguments.",
    level: "basic",
    codeExample: "System.out.println(switch (status) { case 200 → \"OK\"; default → \"ERR\"; });"
  },
  {
    question: "Can a switch expression be used directly in a `return` statement (`return switch (x) { ... };`)?",
    shortAnswer: "Yes! A very common, clean idiom in modern Java methods.",
    explanation: "Eliminates local variable declarations.",
    hint: "return switch (x) { ... };",
    level: "basic",
    codeExample: "public int getFee(Track t) {\n    return switch (t) { case JAVA → 15000; default → 10000; };\n}"
  },
  {
    question: "How does arrow switch improve thread-safety and immutability?",
    shortAnswer: "It allows variables to be declared `final` at initialization time (`final int fee = switch (...) { ... };`), eliminating mutable reassignments.",
    explanation: "Promotes functional and immutable programming styles.",
    hint: "Enables single-step final variable initialization.",
    level: "intermediate",
    codeExample: "final int fee = switch (track) { ... };"
  },
  {
    question: "Can an arrow branch return a boolean value (`boolean isWeekend = switch (day) { case SAT, SUN → true; default → false; };`)?",
    shortAnswer: "Yes! Boolean switch expressions are clean and expressive replacements for complex boolean logic.",
    explanation: "Topic 13 covers multi-label matching in detail.",
    hint: "Can evaluate directly to boolean values.",
    level: "basic",
    codeExample: "boolean isWeekend = switch (day) { case SAT, SUN → true; default → false; };"
  },
  {
    question: "What is the difference between `return` and `yield` inside a switch expression block?",
    shortAnswer: "`return` exits the entire enclosing method; `yield` produces a value from the switch block to the switch expression without exiting the method.",
    explanation: "Topic 15 explores the `yield` keyword in depth.",
    hint: "return exits method; yield produces value from switch.",
    level: "intermediate",
    codeExample: "case 1 → { int v = calc(); yield v; } // yield produces value"
  },
  {
    question: "What happens if you write `break 10;` inside a Java 14 switch expression?",
    shortAnswer: "Compilation error: value-returning `break` was replaced by the `yield` keyword in Java 13/14.",
    explanation: "Java 12 previewed `break value;`, but Java 13+ replaced it with `yield value;`.",
    hint: "break value; was replaced by yield value;.",
    level: "advanced",
    codeExample: "// break 10; // COMPILER ERROR in Java 14+; use 'yield 10;'"
  },
  {
    question: "Why does arrow switch eliminate the need for `@SuppressWarnings(\"fallthrough\")`?",
    shortAnswer: "Because arrow syntax has zero fall-through by specification, completely removing all fall-through compiler warnings.",
    explanation: "Fall-through warnings only apply to colon syntax.",
    hint: "Zero fall-through means zero fall-through compiler warnings.",
    level: "basic",
    codeExample: "// Arrow syntax is inherently fall-through free"
  },
  {
    question: "Can an arrow switch expression evaluate complex objects like `BigDecimal` or `List`?",
    shortAnswer: "Yes! Any object reference type can be returned as the result of a switch expression.",
    explanation: "Full support for all reference and generic types.",
    hint: "Can return any object or collection type.",
    level: "basic",
    codeExample: "List<String> items = switch (tier) { case VIP → List.of(\"A\", \"B\"); default → List.of(); };"
  },
  {
    question: "In the Coder & AccoTax Barrackpore management portal, why is arrow switch preferred for state machines?",
    shortAnswer: "It makes state transitions explicit, concise, and verifiable by the compiler without missing-break bugs in Indian Rupees (₹).",
    explanation: "Guarantees bug-free state transitions.",
    hint: "Explicit, concise, and immune to missing-break bugs.",
    level: "basic",
    codeExample: "State next = switch (current) { case IDLE → State.RUNNING; default → State.ERROR; };"
  },
  {
    question: "What is the syntax for a default branch in arrow switch?",
    shortAnswer: "`default → expression;` or `default → { block; }`.",
    explanation: "Matches the arrow syntax of case labels.",
    hint: "default → expression;",
    level: "basic",
    codeExample: "default → 0;"
  },
  {
    question: "What is the ultimate takeaway of Module 001_004 Topic 11 for Java developers?",
    shortAnswer: "Modern Switch Expressions (Java 14+) with arrow syntax (`case X → Y`) transform switch into a concise, value-returning, fall-through-free, and type-safe language construct; always prefer arrow switch over traditional colon switch in modern Java.",
    explanation: "State-of-the-art modern Java decision architecture.",
    hint: "Use arrow syntax (case ->) for clean, safe, value-returning switch expressions.",
    level: "basic",
    codeExample: "// Summary: final int val = switch (key) { case A → 1; default → 0; };"
  },
  {
    question: "What is the next topic (Topic 12) in Module 001_004?",
    shortAnswer: "Elimination of fall-through in arrow switch expressions.",
    explanation: "Topic 12 explores the strict isolation and non-cascading execution semantics of arrow branches.",
    hint: "Elimination of fall-through in arrow switch expressions.",
    level: "basic",
    codeExample: "// Topic 12: Elimination of fall-through in arrow switch"
  }
];

export default questions;
