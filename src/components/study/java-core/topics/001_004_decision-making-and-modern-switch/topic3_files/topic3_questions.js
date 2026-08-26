/**
 * Module 001_004: Topic 3: Nested 'if-else' statements and resolving the dangling else ambiguity
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is a Nested 'if-else' statement in Java?",
    shortAnswer: "An `if` or `if-else` statement placed inside the body of another `if` or `else` block.",
    explanation: "Used to create hierarchical decision trees when a condition depends on the outcome of a previous condition.",
    hint: "An if-else statement enclosed inside another if-else block.",
    level: "basic",
    codeExample: "if (score >= 80) {\n    if (attendance >= 75) { grantPass(); }\n}"
  },
  {
    question: "What is the Dangling Else Problem in programming language grammar?",
    shortAnswer: "The syntactic ambiguity that arises when an `else` follows two nested `if` statements without braces, making it ambiguous which `if` the `else` belongs to.",
    explanation: "E.g., `if (A) if (B) s1(); else s2();`.",
    hint: "Ambiguity of which if an else belongs to in unbraced code.",
    level: "intermediate",
    codeExample: "if (a)\n    if (b)\n        s1();\n    else\n        s2(); // To which 'if' does this belong?"
  },
  {
    question: "How does the Java compiler resolve the Dangling Else ambiguity (JLS §14.5)?",
    shortAnswer: "An `else` is ALWAYS paired with the nearest preceding unclosed `if` statement.",
    explanation: "In `if (a) if (b) s1(); else s2();`, the `else` belongs to `if (b)`.",
    hint: "Binds to the closest preceding open if.",
    level: "basic",
    codeExample: "// 'else' binds to 'if (b)'"
  },
  {
    question: "Why is Misleading Indentation dangerous with the Dangling Else in Java?",
    shortAnswer: "Because Java is free-format and ignores indentation; visual indentation may make humans think `else` belongs to the outer `if`, but the compiler attaches it to the inner `if`!",
    explanation: "Causes subtle, silent logic defects during maintenance.",
    hint: "Compiler ignores whitespace/indentation.",
    level: "intermediate",
    codeExample: "if (a)\n    if (b)\n        s1();\nelse // Indented under 'a', but compiler attaches to 'b'!\n    s2();"
  },
  {
    question: "How do you definitively resolve the Dangling Else problem in Java?",
    shortAnswer: "By wrapping every statement body in explicit curly braces `{}`.",
    explanation: "Braces explicitly define the scope of every block, eliminating grammar ambiguity.",
    hint: "Use curly braces {} on every if statement.",
    level: "basic",
    codeExample: "if (a) {\n    if (b) {\n        s1();\n    }\n} else {\n    s2(); // Unambiguously belongs to if (a)\n}"
  },
  {
    question: "What is the result of `int x = 5, y = 10; if (x > 0) if (y < 5) x = 1; else x = 2; System.out.println(x);`?",
    shortAnswer: "`2`.",
    explanation: "`x > 0` is true; `y < 5` is false; the `else` (bound to `y < 5`) executes, setting `x = 2`.",
    hint: "Else belongs to inner if (y < 5).",
    level: "basic",
    codeExample: "int x = 5, y = 10;\nif (x > 0) if (y < 5) x = 1; else x = 2; // x = 2"
  },
  {
    question: "What is the result of `int x = -5, y = 10; if (x > 0) if (y < 5) x = 1; else x = 2; System.out.println(x);`?",
    shortAnswer: "`-5`.",
    explanation: "`x > 0` is false, so the entire inner `if-else` construct is skipped completely!",
    hint: "Outer if is false, entire inner structure is skipped.",
    level: "intermediate",
    codeExample: "int x = -5, y = 10;\nif (x > 0) if (y < 5) x = 1; else x = 2; // x remains -5"
  },
  {
    question: "What is the Arrow Anti-Pattern (Pyramid of Doom)?",
    shortAnswer: "Code characterized by deep, rightward-drifting nested `if-else` blocks that resemble an arrow or pyramid shape, making it difficult to read and test.",
    explanation: "Drastically increases cyclomatic complexity and mental cognitive load.",
    hint: "Deep rightward nested code indentation.",
    level: "intermediate",
    codeExample: "if (a) { if (b) { if (c) { if (d) { ... } } } }"
  },
  {
    question: "How do Guard Clauses eliminate the Pyramid of Doom?",
    shortAnswer: "By inverting conditions and returning early (`if (!condition) return;`), keeping the 'happy path' unnested and flat.",
    explanation: "Significantly enhances code maintainability.",
    hint: "Return early on failure conditions to flatten nesting.",
    level: "basic",
    codeExample: "if (!isValid(student)) return;\nif (!hasPaid(student)) return;\nprocessEnrollment(student);"
  },
  {
    question: "How can nested conditions like `if (a) { if (b) { doAction(); } }` be simplified?",
    shortAnswer: "Combine them into a single `if` statement using the logical AND operator: `if (a && b) { doAction(); }`.",
    explanation: "Eliminates unnecessary nesting while preserving short-circuit evaluation.",
    hint: "Combine with logical AND (&&).",
    level: "basic",
    codeExample: "if (a && b) { doAction(); }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore scholarship engine, how does nested `if-else` classify students?",
    shortAnswer: "First checks academic score ($\ge 85\%$). If true, checks family income ($\le 200,000$) for a Tier 1 full waiver, then checks local residence in Barrackpore for Tier 2 vs Tier 3 waivers in Indian Rupees (₹).",
    explanation: "Demonstrates multi-tier hierarchical eligibility decision trees.",
    hint: "Hierarchical checks: score -> income -> residence.",
    level: "basic",
    codeExample: "if (score >= 85) {\n    if (income <= 200000) { tier1(); }\n    else if (isResident) { tier2(); }\n}"
  },
  {
    question: "Can an `else` block contain a nested `if-else` statement?",
    shortAnswer: "Yes! Writing an `if-else` inside an `else` block creates multi-way branching (the basis for `else-if` ladders).",
    explanation: "Completely standard in Java.",
    hint: "Nested inside else block.",
    level: "basic",
    codeExample: "if (c1) { } else { if (c2) { } else { } }"
  },
  {
    question: "What is the maximum nesting depth of `if` statements allowed by the Java compiler?",
    shortAnswer: "There is no explicit language specification limit, but JVM method bytecode stack limits and class file size limits (64KB method limit) apply.",
    explanation: "Clean code practices mandate keeping nesting $\le 2$ or 3 levels.",
    hint: "Practically limited by method byte size; keep nesting <= 3.",
    level: "advanced",
    codeExample: "// Keep nesting shallow for maintainability"
  },
  {
    question: "What is Cyclomatic Complexity in relation to nested `if-else` statements?",
    shortAnswer: "Each nested `if` or `else if` adds 1 to the cyclomatic complexity score of the method.",
    explanation: "Deep nesting rapidly elevates complexity to unacceptable levels.",
    hint: "Each if branch adds 1 to complexity.",
    level: "advanced",
    codeExample: "// 4 nested if statements = complexity 5+"
  },
  {
    question: "What bytecode instruction is generated when exiting a nested `if` block?",
    shortAnswer: "A `goto` instruction that jumps past all remaining sibling `else` blocks to the end of the outer statement.",
    explanation: "Standard control flow jump opcode.",
    hint: "goto opcode jumps to the end label.",
    level: "advanced",
    codeExample: "// Bytecode: goto LABEL_END"
  },
  {
    question: "What is the result of `if (true) if (false) System.out.print(\"1\"); else System.out.print(\"2\");`?",
    shortAnswer: "`\"2\"`.",
    explanation: "The `else` binds to `if (false)`, executing `System.out.print(\"2\")`.",
    hint: "Prints 2.",
    level: "basic",
    codeExample: "if (true) if (false) System.out.print(\"1\"); else System.out.print(\"2\"); // 2"
  },
  {
    question: "What is the result of `if (false) if (true) System.out.print(\"1\"); else System.out.print(\"2\");`?",
    shortAnswer: "Nothing is printed!",
    explanation: "Outer `if (false)` skips the entire nested construct including the `else`.",
    hint: "Prints nothing because outer if is false.",
    level: "basic",
    codeExample: "if (false) if (true) System.out.print(\"1\"); else System.out.print(\"2\"); // No output"
  },
  {
    question: "How does Python avoid the Dangling Else problem compared to Java?",
    shortAnswer: "Python uses mandatory whitespace indentation to define code blocks, whereas Java relies on curly braces `{}` and treats indentation as cosmetic.",
    explanation: "In Java, indentation has zero semantic meaning.",
    hint: "Python uses indentation; Java uses braces {}.",
    level: "intermediate",
    codeExample: "// Java: Braces {} are mandatory for disambiguation"
  },
  {
    question: "Can an inner nested block access variables declared in the outer `if` block?",
    shortAnswer: "Yes! Lexical scoping allows inner nested blocks to access all variables declared in enclosing outer blocks.",
    explanation: "Standard Java lexical variable scope.",
    hint: "Inner blocks can access outer variables.",
    level: "basic",
    codeExample: "if (true) {\n    int outerVar = 10;\n    if (true) {\n        System.out.println(outerVar); // Accessible\n    }\n}"
  },
  {
    question: "Can an outer `if` block access variables declared in an inner nested `if` block?",
    shortAnswer: "No! Variables declared in an inner block go out of scope at the inner closing brace `}`.",
    explanation: "Block scope prevents outer access to inner variables.",
    hint: "Inaccessible outside inner block.",
    level: "basic",
    codeExample: "if (true) {\n    if (true) { int innerVar = 20; }\n    // innerVar not accessible here\n}"
  },
  {
    question: "What is the 'Bouncer Pattern' in programming?",
    shortAnswer: "Another term for Guard Clauses: validating inputs at the 'door' (start of method) and rejecting invalid calls immediately.",
    explanation: "Named after nightclub bouncers checking IDs at the entrance.",
    hint: "Checking preconditions at the entrance of a method.",
    level: "basic",
    codeExample: "if (!isAuthorized(user)) throw new SecurityException();"
  },
  {
    question: "What happens if a nested `if` condition mutates a variable used by the outer `else` block?",
    shortAnswer: "The outer `else` block will never execute because the inner block only runs when the outer `if` is `true`.",
    explanation: "Mutually exclusive outer branches.",
    hint: "Outer else never runs if outer if is true.",
    level: "intermediate",
    codeExample: "// Outer if and outer else cannot both run"
  },
  {
    question: "What is the recommended rule of thumb for maximum nesting in enterprise Java?",
    shortAnswer: "Keep nesting $\\le 2$ levels deep. If a 3rd level is required, refactor using helper methods, guard clauses, or switch expressions.",
    explanation: "Clean Code guideline by Robert C. Martin (Uncle Bob).",
    hint: "Maximum 2 levels of nesting.",
    level: "intermediate",
    codeExample: "// Refactor deep nesting into private helper methods"
  },
  {
    question: "Can nested `if-else` statements be replaced by polymorphic dispatch or Strategy Pattern?",
    shortAnswer: "Yes! In Object-Oriented Design, complex nested decision trees based on types or roles are often replaced by polymorphism.",
    explanation: "Eliminates large conditional structures by delegating to specialized subclasses.",
    hint: "Replace conditionals with polymorphism.",
    level: "advanced",
    codeExample: "DiscountStrategy strategy = student.getDiscountStrategy();\nstrategy.applyDiscount();"
  },
  {
    question: "What is the result of `if (a) { if (b) s1; } else s2;`?",
    shortAnswer: "`s2` executes whenever `a` is `false` (regardless of `b`), while `s1` executes when both `a` and `b` are `true`.",
    explanation: "The curly braces clearly associate the `else` with `if (a)`.",
    hint: "Else belongs to if (a).",
    level: "basic",
    codeExample: "if (a) {\n    if (b) s1;\n} else s2;"
  },
  {
    question: "How does the Java compiler prevent dangling else ambiguity in its internal grammar?",
    shortAnswer: "The Java grammar specifies two distinct statement rules: `Statement` and `StatementNoShortIf`, formally binding `else` to the closest preceding unclosed `if` during LR/LALR parsing.",
    explanation: "Formal grammar design in JLS §14.5.",
    hint: "Grammar explicitly defines StatementNoShortIf production rules.",
    level: "expert",
    codeExample: "// JLS §14.5 StatementNoShortIf formal grammar"
  },
  {
    question: "What happens when you combine nested `if-else` with ternary operators in unreadable code?",
    shortAnswer: "Creates 'Nested Ternary Hell' (`a ? b ? c : d : e ? f : g`), which is considered an extreme anti-pattern in industry.",
    explanation: "Never nest more than one ternary operator; use structured if-else or modern switch instead.",
    hint: "Avoid deeply nested ternary operators.",
    level: "basic",
    codeExample: "// Anti-pattern: String s = a ? (b ? \"1\" : \"2\") : (c ? \"3\" : \"4\");"
  },
  {
    question: "In the Coder & AccoTax Barrackpore curriculum, why are students taught guard clauses early?",
    shortAnswer: "Because writing guard clauses builds professional habits: writing flat, readable, bug-free, and easily unit-testable Java code from day one.",
    explanation: "Essential clean coding pedagogy in Barrackpore.",
    hint: "Promotes clean, flat, testable architecture.",
    level: "basic",
    codeExample: "// Guard clauses ensure clean production software"
  },
  {
    question: "What is the ultimate takeaway of Module 001_004 Topic 3 for Java developers?",
    shortAnswer: "The Dangling Else ambiguity proves that indentation is purely cosmetic in Java; always use curly braces `{}` to define unambiguous decision blocks, and refactor nested pyramids into flat guard clauses.",
    explanation: "Mastering nested if-else structures and disambiguation guarantees clean, bug-free code.",
    hint: "Always use braces {} to eliminate dangling else; flatten with guard clauses.",
    level: "basic",
    codeExample: "// Summary: Always use braces {} and guard clauses to eliminate nesting traps"
  },
  {
    question: "What is the next topic (Topic 4) in Module 001_004?",
    shortAnswer: "'else-if' ladder for multi-branch evaluations.",
    explanation: "Topic 4 explores sequential multi-tier evaluations, grading systems, income tax slab calculators, and boundary edge cases.",
    hint: "'else-if' ladder for multi-branch evaluations.",
    level: "basic",
    codeExample: "// Topic 4: else-if ladder"
  }
];

export default questions;
