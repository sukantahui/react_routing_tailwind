/**
 * Module 001_004: Topic 17: Best practices for clean, maintainable conditional logic (avoiding deep nesting)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the 'Pyramid of Doom' (or Arrow Anti-Pattern) in conditional programming?",
    shortAnswer: "A code smell where multiple nested `if-else` blocks form a triangular arrow shape, creating high cognitive complexity and making code difficult to read and maintain.",
    explanation: "One of the most common maintainability flaws in enterprise software.",
    hint: "Deeply nested if-else structures forming a triangular pyramid shape.",
    level: "basic",
    codeExample: "if (a) { if (b) { if (c) { if (d) { doWork(); } } } }"
  },
  {
    question: "What is a 'Guard Clause' (or Early Return / Bouncer Pattern)?",
    shortAnswer: "A programming technique where failure preconditions and invalid states are checked first and exited immediately with `return` or an exception, keeping the primary logic unnested.",
    explanation: "Flattens deep hierarchies into clean, linear steps.",
    hint: "Early return on invalid conditions to keep the happy path unnested.",
    level: "basic",
    codeExample: "if (student == null) return;\nif (!student.hasId()) return;\n// Happy path follows directly!"
  },
  {
    question: "What is the 'Happy Path' in clean software architecture?",
    shortAnswer: "The default execution trajectory where no errors, exceptions, or validation failures occur; best practices mandate keeping the happy path left-aligned and unnested.",
    explanation: "Left-aligned code maximizes visual scanning efficiency.",
    hint: "The primary success execution path kept left-aligned.",
    level: "basic",
    codeExample: "// Happy path stays left-aligned without indentation"
  },
  {
    question: "Why should developers extract complex boolean conditions into Explanatory Helper Methods?",
    shortAnswer: "To convert confusing composite boolean algebra into self-documenting, intention-revealing code that reads like natural human language.",
    explanation: "Replaces cryptic predicates with readable method names.",
    hint: "Replaces cryptic logic with self-documenting method names.",
    level: "basic",
    codeExample: "if (isEligibleForHonorsScholarship(student)) { ... }"
  },
  {
    question: "What is the rule of thumb regarding the Ternary Operator `(cond ? v1 : v2)`?",
    shortAnswer: "Use ternary operators strictly for simple, concise, single-line variable assignments; NEVER nest ternary operators!",
    explanation: "Nested ternary operators (`a ? b ? c : d : e`) severely degrade code readability.",
    hint: "Use only for simple 2-way assignments; never nest.",
    level: "basic",
    codeExample: "int max = (a > b) ? a : b; // Clean\n// a ? (b ? c : d) : e // ANTI-PATTERN!"
  },
  {
    question: "What is Cyclomatic Complexity?",
    shortAnswer: "A software metric that measures the number of linearly independent execution paths through source code.",
    explanation: "Calculated as $E - N + 2P$ or number of decision points $+ 1$.",
    hint: "Number of independent execution paths through code.",
    level: "intermediate",
    codeExample: "// if, switch case, for, while each add 1 to complexity"
  },
  {
    question: "What is Cognitive Complexity (as formulated by SonarQube)?",
    shortAnswer: "A metric that assesses how difficult code is for a human developer to read and comprehend, heavily penalizing nested control flow structures.",
    explanation: "Directly measures mental burden during code reviews.",
    hint: "Measures human comprehension difficulty and penalizes nesting.",
    level: "intermediate",
    codeExample: "// Nesting level 3 incurs exponential cognitive penalty"
  },
  {
    question: "In the Coder & AccoTax Barrackpore admission engine, how do guard clauses simplify student onboarding?",
    shortAnswer: "By checking nulls, identity verification, minimum scores (50%), and tuition deposits (₹10,000) as early guard exits in Indian Rupees (₹).",
    explanation: "Demonstrates linear guard-based validation pipeline.",
    hint: "Linear guard validation pipeline for student admission in ₹.",
    level: "basic",
    codeExample: "if (s.deposit() < 10000.0) return; // Guard clause"
  },
  {
    question: "How does the 'Replace Conditional with Polymorphism' refactoring pattern work?",
    shortAnswer: "By replacing large `if-else` or `switch` dispatchers with an interface or abstract class having polymorphic implementations (e.g. Strategy or State pattern).",
    explanation: "Fundamental Martin Fowler refactoring pattern adhering to the Open-Closed Principle.",
    hint: "Replaces large conditional ladders with polymorphic interface objects.",
    level: "advanced",
    codeExample: "paymentStrategy.processPayment(amount);"
  },
  {
    question: "Why is it dangerous to embed side-effects inside `if` conditions (e.g. `if (conn != null && (data = read()) != null)`)?",
    shortAnswer: "Because it conflates state mutation with decision logic, makes debugging harder, and can fail unpredictably due to short-circuiting.",
    explanation: "Mutations should be separated from boolean query expressions.",
    hint: "Conflates state mutation with decision evaluation.",
    level: "intermediate",
    codeExample: "// Bad: if (a && ++count > 5) → Separate assignment from condition!"
  },
  {
    question: "What is the 'Command-Query Separation' (CQS) principle in conditional logic?",
    shortAnswer: "Methods that return a boolean to test a condition (queries) should NOT modify the state of the system; methods that change state (commands) should not be used as conditions.",
    explanation: "Foundational clean architecture principle by Bertrand Meyer.",
    hint: "Query methods must not produce side effects.",
    level: "advanced",
    codeExample: "// isEligible() should only inspect state, not modify it"
  },
  {
    question: "What is the maximum recommended nesting depth for clean, production-grade Java code?",
    shortAnswer: "Maximum 2 levels of nesting. 3 or more levels is considered a code smell that should be refactored with guard clauses.",
    explanation: "Enforced by enterprise linters and SonarQube quality gates.",
    hint: "Maximum 2 levels of nesting.",
    level: "basic",
    codeExample: "// Refactor code nested 3+ levels deep"
  },
  {
    question: "How do De Morgan's laws assist in refactoring nested `if` statements into guard clauses?",
    shortAnswer: "By inverting positive compound preconditions (`!(A && B) == !A || !B`) to create flat negative exit guards (`if (!A || !B) return;`).",
    explanation: "Transforms nested positive logic into linear early exits.",
    hint: "Inverts positive requirements into negative guard returns.",
    level: "intermediate",
    codeExample: "// if (hasId && hasFee) → if (!hasId || !hasFee) return;"
  },
  {
    question: "What is the 'Null Object Pattern' and how does it clean up conditional logic?",
    shortAnswer: "Providing a non-null object that implements an interface with default/no-op behavior, eliminating repetitive `if (obj != null)` checks throughout the codebase.",
    explanation: "Removes defensive null checks across domain models.",
    hint: "Replaces null checks with polymorphic default objects.",
    level: "advanced",
    codeExample: "Student student = repo.find(id).orElse(Student.ANONYMOUS);"
  },
  {
    question: "How does `Optional<T>` in Java 8+ help clean up conditional branching?",
    shortAnswer: "By providing functional methods like `.ifPresent()`, `.map()`, `.filter()`, and `.orElse()` to handle presence/absence without manual `if (val != null)` blocks.",
    explanation: "Replaces defensive if-else blocks with declarative pipelines.",
    hint: "Provides functional methods (map, filter, orElse) for null safety.",
    level: "intermediate",
    codeExample: "studentOpt.filter(Student::isEnrolled).ifPresent(this::notify);"
  },
  {
    question: "What is the 'Fail-Fast Principle' in software engineering?",
    shortAnswer: "Detecting and reporting invalid state or input immediately at the boundary of a method rather than allowing corrupted state to proceed deeper into execution.",
    explanation: "Core justification for validating preconditions with guard clauses.",
    hint: "Validates preconditions immediately at the method boundary.",
    level: "basic",
    codeExample: "Objects.requireNonNull(student, \"Student cannot be null\");"
  },
  {
    question: "Why should duplicate condition branches be eliminated immediately?",
    shortAnswer: "Because duplicate conditions create dead code that can never execute, wasting CPU cycles and misleading maintainers.",
    explanation: "Indicates poor branch design or copy-paste errors.",
    hint: "Duplicate conditions create unreachable dead code.",
    level: "basic",
    codeExample: "// if (x > 5) ... else if (x > 5) // Dead code bug!"
  },
  {
    question: "How does Java 14+ switch expressions help maintain clean conditional logic?",
    shortAnswer: "By replacing multi-branch `else-if` ladders with concise, tabular, value-returning arrow rules that guarantee exhaustiveness and eliminate fall-through.",
    explanation: "Modern synthesis of clean conditional design.",
    hint: "Replaces verbose ladders with concise, exhaustive value expressions.",
    level: "basic",
    codeExample: "final int rate = switch (tier) { case VIP → 20; default → 0; };"
  },
  {
    question: "What is the 'Bouncer Pattern' metaphor in programming?",
    shortAnswer: "Like a bouncer at the club door checking IDs and rejecting unqualified guests immediately, guard clauses check preconditions at the top of a method and reject invalid calls early.",
    explanation: "Vivid mental model for guard clauses.",
    hint: "Precondition checks reject invalid requests at the method entrance.",
    level: "basic",
    codeExample: "// Bouncers at top of method reject invalid calls"
  },
  {
    question: "Why is positive phrasing preferred over negative boolean variable names (`boolean isEnrolled` vs `boolean isNotEnrolled`)?",
    shortAnswer: "Because combining negative variable names with the logical NOT operator results in confusing double negatives (e.g. `!isNotEnrolled`), which impairs readability.",
    explanation: "Double negatives cause high cognitive strain.",
    hint: "Prevents confusing double negatives (!isNotEnrolled).",
    level: "basic",
    codeExample: "// Prefer: if (!isEnrolled) instead of if (!isNotEnrolled)"
  },
  {
    question: "How can Map lookups replace 20-branch `if-else` string dispatchers?",
    shortAnswer: "By storing command strings and their corresponding lambda handlers in a `Map<String, Runnable>`, achieving $O(1)$ dispatch without conditionals.",
    explanation: "Dynamic command routing pattern.",
    hint: "Map<String, Runnable> provides dynamic O(1) command routing.",
    level: "intermediate",
    codeExample: "commands.getOrDefault(action, this::unknownAction).run();"
  },
  {
    question: "What is the 'Flag Argument' anti-pattern in method design?",
    shortAnswer: "Passing a boolean flag to a method (e.g. `processOrder(true)`) which internally executes an `if (flag) { ... } else { ... }` block.",
    explanation: "Best practice is to split into two descriptive methods: `processStandardOrder()` and `processExpressOrder()`.",
    hint: "Split boolean flag methods into two descriptive methods.",
    level: "advanced",
    codeExample: "// Anti-pattern: process(boolean isUrgent) → Split into two methods!"
  },
  {
    question: "How do Enums with abstract methods replace conditionals?",
    shortAnswer: "Each enum constant provides its own implementation of an abstract method, achieving polymorphic dispatch without any `if` or `switch` statements.",
    explanation: "Constant-specific method implementations in Java enums.",
    hint: "Constant-specific method implementations in enums.",
    level: "advanced",
    codeExample: "public enum Op { ADD { int apply(int a, int b) { return a + b; } } }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore curriculum, why are students taught to write small methods (<20 lines)?",
    shortAnswer: "Because small methods naturally limit the maximum possible nesting depth, keep cyclomatic complexity low, and force modular thinking.",
    explanation: "Core tenet of clean code craftsmanship.",
    hint: "Small methods inherently limit nesting depth and complexity.",
    level: "basic",
    codeExample: "// Keep methods under 20 lines with clear focus"
  },
  {
    question: "What is the relationship between unit testing and clean conditional logic?",
    shortAnswer: "Every `if`, `else`, and `case` branch creates an additional test path; simplifying conditional logic directly reduces the number of unit test cases required to achieve 100% branch coverage.",
    explanation: "Direct mathematical correlation with testability.",
    hint: "Simpler branches require fewer test cases for 100% coverage.",
    level: "intermediate",
    codeExample: "// Fewer branches = simpler, more reliable test suites"
  },
  {
    question: "What is the 'Return Early' principle in functional programming?",
    shortAnswer: "Exiting computation as soon as a decisive result or failure is known, avoiding unnecessary computations and nested wrappers.",
    explanation: "Universal clean code principle across functional and OOP paradigms.",
    hint: "Exit computation as soon as result is determined.",
    level: "basic",
    codeExample: "if (cache.contains(key)) return cache.get(key);"
  },
  {
    question: "How do assertions (`assert condition : message;`) relate to guard clauses?",
    shortAnswer: "Assertions are used for internal developer invariant checks (disabled in production by default), whereas guard clauses validate external input and business rules in production.",
    explanation: "Assertions vs production runtime validation.",
    hint: "Assertions check internal invariants; guard clauses validate runtime input.",
    level: "intermediate",
    codeExample: "assert balance >= 0 : \"Negative balance invariant violated\";"
  },
  {
    question: "What is the final summary of clean conditional logic rules for professional Java developers?",
    shortAnswer: "1. Use Guard Clauses to keep happy paths unnested; 2. Extract boolean logic into descriptive helper methods; 3. Use switch expressions for multi-way constant mapping; 4. Avoid nested ternaries and side effects in conditions; 5. Refactor complex branches into polymorphism.",
    explanation: "The complete checklist for professional clean code craftsmanship.",
    hint: "Guard clauses, helper methods, switch expressions, no nested ternaries, polymorphism.",
    level: "basic",
    codeExample: "// 5 Golden Rules of Clean Conditional Logic"
  },
  {
    question: "What is the ultimate takeaway of Module 001_004 for Java developers?",
    shortAnswer: "Module 001_004 comprehensively equips Java developers with complete mastery of control flow: simple if-else, resolution of dangling else ambiguity, else-if ladders, boolean operator mechanics, traditional switch, Java 14+ switch expressions, yield keywords, Java 21 pattern matching with when guards, and clean guard-clause architecture.",
    explanation: "Mastery of decision making and control flow in modern Java.",
    hint: "Complete mastery of decision making and modern switch expressions.",
    level: "basic",
    codeExample: "// Full Mastery: Module 001_004 Completed!"
  },
  {
    question: "What is the next module in the Java Core curriculum roadmap?",
    shortAnswer: "Module 001_005: Loops, Iteration Statements, and Jump Controls (while, do-while, traditional for, enhanced for-each, labeled break/continue).",
    explanation: "Module 001_005 explores all iterative control flow mechanics in modern Java.",
    hint: "Module 001_005: Loops & Iterations.",
    level: "basic",
    codeExample: "// Next: Module 001_005 Loops and Iterations"
  }
];

export default questions;
