/**
 * Module 001_004: Topic 15: The 'yield' keyword for returning values from multi-statement switch blocks
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the `yield` statement in Java (JLS §14.21)?",
    shortAnswer: "A control statement used inside a switch block to produce a value for the enclosing switch expression and transfer control past the switch.",
    explanation: "Introduced in Java 13 and standardized in Java 14 (JEP 361).",
    hint: "Yields a value from a switch block to the switch expression.",
    level: "basic",
    codeExample: "case 1 → { int x = compute(); yield x; }"
  },
  {
    question: "When is the `yield` keyword MANDATORY in modern switch expressions?",
    shortAnswer: "1. Inside multi-statement block bodies with curly braces (`case X → { ... yield val; }`); 2. Inside colon-syntax switch expressions (`case X: ... yield val;`).",
    explanation: "Required whenever a branch body contains multiple statements.",
    hint: "Required in multi-statement block bodies and colon-style switch expressions.",
    level: "basic",
    codeExample: "case \"PRO\" → {\n    log();\n    yield 18000;\n}"
  },
  {
    question: "When is the `yield` keyword NOT needed in switch expressions?",
    shortAnswer: "In single-line arrow expressions (`case X → expression;`).",
    explanation: "The single expression to the right of `->` is yielded automatically.",
    hint: "Not needed for single-line arrow expressions.",
    level: "basic",
    codeExample: "case 1 → 100; // No 'yield' required"
  },
  {
    question: "What is the difference between `yield` and `return`?",
    shortAnswer: "`yield value;` produces a value from the switch expression to its caller while continuing execution of the enclosing method; `return value;` exits the entire enclosing method immediately.",
    explanation: "Fundamental scope difference.",
    hint: "yield exits only the switch; return exits the entire method.",
    level: "basic",
    codeExample: "// yield yields from switch; return exits method"
  },
  {
    question: "What is the difference between `yield` and `break` in Java 14+?",
    shortAnswer: "`yield` produces a value from a switch expression; `break` terminates a loop or switch statement without producing a value.",
    explanation: "In Java 12 preview, `break value;` was used, but replaced by `yield value;` in Java 13+.",
    hint: "yield produces a value; break terminates control flow.",
    level: "basic",
    codeExample: "yield 100; // Produces value\nbreak;     // Exits statement"
  },
  {
    question: "Is `yield` a reserved keyword in Java like `class` or `public`?",
    shortAnswer: "No, `yield` is a Contextual Keyword (Restricted Identifier); it acts as a keyword ONLY inside switch blocks.",
    explanation: "You can still declare variables, parameters, or methods named `yield` elsewhere in Java without breaking existing code (e.g. `Thread.yield()`).",
    hint: "Contextual keyword (restricted identifier).",
    level: "intermediate",
    codeExample: "int yield = 5; // Valid variable name outside switch block!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee engine, how is `yield` used?",
    shortAnswer: "To calculate complex multi-step discounts (base fee minus merit rebate) inside a `{ ... }` block before yielding the final payable tuition in Indian Rupees (₹).",
    explanation: "Demonstrates practical multi-statement business computation.",
    hint: "Yields net tuition after multi-step discount calculation in ₹.",
    level: "basic",
    codeExample: "case PRO → { int base = 18000; int disc = 3000; yield base - disc; }"
  },
  {
    question: "What happens if a multi-statement block body `{ ... }` in a switch expression fails to execute a `yield` statement?",
    shortAnswer: "Compilation error: 'switch expression does not yield a value on all execution paths'.",
    explanation: "All branches in a switch expression must yield a value or throw an exception.",
    hint: "Compile error if a block fails to yield a value.",
    level: "basic",
    codeExample: "// case 1 → { int x = 10; } // COMPILER ERROR: missing yield!"
  },
  {
    question: "Can you use `yield` in a switch STATEMENT (that does not return a value)?",
    shortAnswer: "No! Using `yield` inside a switch statement causes a compile error: 'yield outside of switch expression'.",
    explanation: "`yield` is only valid inside switch expressions.",
    hint: "yield is illegal in switch statements.",
    level: "basic",
    codeExample: "// switch (x) { case 1 → { yield 10; } } // COMPILER ERROR if not assigned!"
  },
  {
    question: "Can a `yield` statement yield the result of another method call (`yield calculateTotal();`)?",
    shortAnswer: "Yes! Any valid expression evaluating to a compatible type can be yielded.",
    explanation: "Full support for method invocation results.",
    hint: "Can yield method invocation results.",
    level: "basic",
    codeExample: "case VIP → { log(); yield calculateTotal(); }"
  },
  {
    question: "What happens if an `if-else` branch inside a switch block yields on one path but not the other?",
    shortAnswer: "Compilation error: the compiler checks Definite Assignment and requires every possible execution path through the block to yield a value.",
    explanation: "Exhaustive path verification inside block bodies.",
    hint: "All paths through inner if-else must yield a value.",
    level: "intermediate",
    codeExample: "case 1 → {\n    if (c) yield 10;\n    // Missing else with yield → COMPILER ERROR!\n}"
  },
  {
    question: "Can a `throw` statement be used instead of `yield` inside a multi-statement block body?",
    shortAnswer: "Yes! Throwing an exception completes the block abruptly, satisfying the compiler's yield requirement.",
    explanation: "Exceptions satisfy value yield requirements.",
    hint: "Throwing an exception satisfies the branch requirement.",
    level: "basic",
    codeExample: "default → {\n    logError();\n    throw new IllegalArgumentException(\"Invalid\");\n}"
  },
  {
    question: "Can you write `yield (x + y);` with parentheses around the yielded expression?",
    shortAnswer: "Yes! Parentheses are completely optional but valid.",
    explanation: "`yield Expression;` accepts any valid expression.",
    hint: "Parentheses around expression are optional.",
    level: "basic",
    codeExample: "yield (base - discount);"
  },
  {
    question: "What is the bytecode instruction emitted for a `yield` statement?",
    shortAnswer: "The expression is evaluated onto the JVM operand stack, followed by an unconditional `goto` jump to the switch exit label.",
    explanation: "Leaves the computed value on top of the stack.",
    hint: "Leaves value on operand stack and jumps to exit label.",
    level: "advanced",
    codeExample: "// Bytecode: iload_1 → goto L_EXIT"
  },
  {
    question: "Can `yield` return `null` for a reference type?",
    shortAnswer: "Yes! E.g. `yield null;` is legal when the switch expression produces an object type (e.g. `String`).",
    explanation: "Null literal is valid for reference types.",
    hint: "yield null; is valid for object types.",
    level: "basic",
    codeExample: "case UNKNOWN → { log(); yield null; }"
  },
  {
    question: "What is the result of `int res = switch (1) { case 1 → { int a = 5; int b = 10; yield a + b; } default → 0; };`?",
    shortAnswer: "`res = 15`.",
    explanation: "`5 + 10 = 15` is yielded and assigned to `res`.",
    hint: "Evaluates to 15.",
    level: "basic",
    codeExample: "switch (1) { case 1 → { yield 5 + 10; } default → 0; }"
  },
  {
    question: "Can a colon-syntax switch expression contain multiple statements ending in `yield` (`case 1: log(); yield 10;`) without braces?",
    shortAnswer: "Yes! Colon-syntax switch expressions execute statements sequentially until a `yield` is encountered.",
    explanation: "In colon-syntax switch expressions, `yield` acts as both the value provider and the termination statement.",
    hint: "Colon-syntax switch expressions use yield without braces.",
    level: "intermediate",
    codeExample: "case 1:\n    log();\n    yield 10;"
  },
  {
    question: "Why did Java language designers choose the keyword `yield` instead of reusing `break value;`?",
    shortAnswer: "To avoid grammar ambiguity when breaking out of labeled loops with a variable named identically to the label (`break label;` vs `break value;`).",
    explanation: "Eliminated syntactic ambiguity in Java parser grammar.",
    hint: "Eliminated grammar ambiguity with labeled breaks.",
    level: "advanced",
    codeExample: "// Disambiguated 'break label;' from 'yield value;'"
  },
  {
    question: "Can a switch block contain both single-line arrow expressions and multi-statement blocks with `yield`?",
    shortAnswer: "Yes! E.g. `case A → 10; case B → { int x = calc(); yield x; }` is completely legal.",
    explanation: "Arrows can point to either single expressions or block bodies.",
    hint: "Can mix single-line arrow expressions and block bodies with yield.",
    level: "basic",
    codeExample: "case A → 10;\ncase B → { log(); yield 20; }"
  },
  {
    question: "What happens if a developer writes `yield;` without an expression?",
    shortAnswer: "Compilation error: `yield` in a switch expression requires an expression value (`yield Expression;`).",
    explanation: "Yield must always produce an expression value.",
    hint: "yield requires an expression operand.",
    level: "basic",
    codeExample: "// yield; // COMPILER ERROR: expression required"
  },
  {
    question: "Can a `yield` statement be used inside a lambda expression that is inside a switch branch?",
    shortAnswer: "No! `yield` cannot yield through lambda or anonymous class boundaries.",
    explanation: "Yield target must be the immediate enclosing switch expression.",
    hint: "Cannot yield across lambda boundaries.",
    level: "advanced",
    codeExample: "// Cannot yield across lambda boundaries"
  },
  {
    question: "How does `yield` make logging inside switch branches possible while retaining value-returning expressions?",
    shortAnswer: "By wrapping the branch in `{ ... }`, executing arbitrary logging statements, and then calling `yield computedValue;`.",
    explanation: "Enables multi-statement debugging and telemetry.",
    hint: "Allows logging before yielding the computed result.",
    level: "basic",
    codeExample: "case 1 → {\n    logger.info(\"Selected 1\");\n    yield 100;\n}"
  },
  {
    question: "In the Coder & AccoTax Barrackpore portal, why is `yield` used in course plan selection?",
    shortAnswer: "To log student track enrollment metadata before yielding the final discounted tuition fee in Indian Rupees (₹).",
    explanation: "Demonstrates practical telemetry and fee calculation.",
    hint: "Logs track metadata before yielding course fee in ₹.",
    level: "basic",
    codeExample: "case PRO → { logTrack(); yield 18000; }"
  },
  {
    question: "Can a `yield` statement be executed inside a loop that is inside a switch block?",
    shortAnswer: "Yes! `yield` inside a loop will break out of the loop and produce the value for the switch expression.",
    explanation: "Transfers control directly to the switch exit.",
    hint: "Yields value from switch, breaking out of inner loop.",
    level: "intermediate",
    codeExample: "case 1 → {\n    for (int i : list) {\n        if (i > 10) yield i;\n    }\n    yield 0;\n}"
  },
  {
    question: "What happens if you declare a variable named `yield` inside a switch block (`int yield = 10;`)?",
    shortAnswer: "Compilation error: inside a switch block, `yield` is treated as a keyword.",
    explanation: "Restricted identifier rules apply inside switch contexts.",
    hint: "yield is a keyword inside switch contexts.",
    level: "intermediate",
    codeExample: "// Inside switch: int yield = 10; // COMPILER ERROR"
  },
  {
    question: "What is the return type of a switch expression if one branch does `yield 10;` and another does `yield 20.5;`?",
    shortAnswer: "`double` (widening primitive conversion applied).",
    explanation: "Infers common supertype `double`.",
    hint: "Inferred as double.",
    level: "basic",
    codeExample: "double d = switch (x) { case 1 → { yield 10; } default → 20.5; };"
  },
  {
    question: "Can you use `yield` with an object instantiated via `new` (`yield new Student(\"Swadeep\");`)?",
    shortAnswer: "Yes! Instantiating and yielding new objects directly is a common pattern in factory methods.",
    explanation: "Full support for constructor invocations.",
    hint: "Can yield newly instantiated objects.",
    level: "basic",
    codeExample: "yield new Course(\"Java\", 15000);"
  },
  {
    question: "What is the best practice regarding the length of block bodies with `yield`?",
    shortAnswer: "Keep block bodies short (3-5 lines). If a branch requires 10+ lines of complex logic, extract it into a dedicated private helper method and call it via a single-line arrow (`case X → calculateComplex(x);`).",
    explanation: "Preserves the clean, tabular readability of switch expressions.",
    hint: "Keep yield blocks concise; extract large logic into helper methods.",
    level: "basic",
    codeExample: "// Extract large blocks into private helper methods"
  },
  {
    question: "What is the ultimate takeaway of Module 001_004 Topic 15 for Java developers?",
    shortAnswer: "The `yield` keyword allows multi-statement switch blocks to perform intermediate logging, validation, and calculations before producing a result value for the switch expression without exiting the enclosing method.",
    explanation: "Essential tool for complex multi-line switch expression branches.",
    hint: "yield produces values from multi-statement switch blocks.",
    level: "basic",
    codeExample: "// Summary: case X → { log(); yield result; }"
  },
  {
    question: "What is the next topic (Topic 16) in Module 001_004?",
    shortAnswer: "Guard conditions in pattern matching (Java 17-21 preview overview).",
    explanation: "Topic 16 explores type pattern matching in switch and `when` guard clauses introduced in Java 17-21.",
    hint: "Guard conditions in pattern matching.",
    level: "basic",
    codeExample: "// Topic 16: Guard conditions & Pattern matching"
  }
];

export default questions;
