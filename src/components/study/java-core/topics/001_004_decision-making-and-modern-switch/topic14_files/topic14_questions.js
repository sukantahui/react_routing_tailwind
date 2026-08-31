/**
 * Module 001_004: Topic 14: Using switch as an expression that returns a value
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is a Switch Expression in Java (JLS §15.28)?",
    shortAnswer: "A switch construct that evaluates and produces a single value that can be assigned to a variable, passed to a method, or returned from a function.",
    explanation: "Standardized in Java 14 under JEP 361.",
    hint: "Switch construct that computes and returns a value.",
    level: "basic",
    codeExample: "int fee = switch (course) { case JAVA → 15000; default → 10000; };"
  },
  {
    question: "What is the Exhaustiveness requirement for Switch Expressions?",
    shortAnswer: "The Java compiler must be able to prove that EVERY possible input value of the selector type is handled by a case branch, a default label, or throws an exception.",
    explanation: "Guarantees that a switch expression always produces a valid result without undefined behavior.",
    hint: "Every possible input value must be handled.",
    level: "basic",
    codeExample: "// Missing cases or default causes compile-time exhaustiveness error"
  },
  {
    question: "When is a `default` branch NOT required in a switch expression?",
    shortAnswer: "When switching on an `enum` (or sealed class hierarchy) and all possible enum constants are explicitly handled in case branches.",
    explanation: "The compiler inspects the enum definition and verifies complete coverage.",
    hint: "Not required when all enum constants are explicitly handled.",
    level: "basic",
    codeExample: "switch (allEnumValuesCovered) { case A → 1; case B → 2; } // No default needed"
  },
  {
    question: "What happens if a new constant is added to an `enum` used in an exhaustive switch expression without `default`?",
    shortAnswer: "The Java compiler generates a compile-time error ('the switch expression does not cover all possible input values'), alerting developers to update the switch.",
    explanation: "One of the greatest architectural benefits of switch expressions over if-else ladders.",
    hint: "Compiler raises an error, ensuring new enum constants are not missed.",
    level: "intermediate",
    codeExample: "// Compiler catches missing enum constants at build time!"
  },
  {
    question: "Can a switch expression be embedded directly inside a `System.out.println(...)` call?",
    shortAnswer: "Yes! E.g. `System.out.println(switch (status) { case 200 → \"OK\"; default → \"Error\"; });`.",
    explanation: "Switch expressions can be used anywhere an ordinary expression is permitted.",
    hint: "Can be passed directly into method invocations.",
    level: "basic",
    codeExample: "System.out.println(switch (s) { case 1 → \"A\"; default → \"B\"; });"
  },
  {
    question: "Can a switch expression be used directly as the operand of a `return` statement?",
    shortAnswer: "Yes! E.g. `return switch (category) { case GENERAL → 0; default → 10; };`.",
    explanation: "A standard clean code idiom for mapper methods.",
    hint: "return switch (x) { ... };",
    level: "basic",
    codeExample: "public int getDiscount(Tier t) {\n    return switch (t) { case VIP → 20; default → 0; };\n}"
  },
  {
    question: "In the Coder & AccoTax Barrackpore scholarship engine, how does switch expression calculate discounts?",
    shortAnswer: "By directly returning scholarship percentages (`0.50` for `MERIT_SCHOLAR`, `0.75` for `BPL_EWS`) to compute final payable fees in Indian Rupees (₹).",
    explanation: "Demonstrates practical financial rebate calculations.",
    hint: "Direct scholarship rate assignment in ₹.",
    level: "basic",
    codeExample: "final double discount = switch (cat) { case MERIT → 0.50; default → 0.0; };"
  },
  {
    question: "How does Type Inference work for switch expressions?",
    shortAnswer: "The compiler infers the return type as the common supertype of all branch expressions (e.g. if branches return `Integer` and `Double`, type is inferred as `Number`).",
    explanation: "Poly-expression type inference under JLS §15.28.",
    hint: "Infers common supertype across all branches.",
    level: "intermediate",
    codeExample: "Number num = switch (x) { case 1 → 10; default → 20.5; };"
  },
  {
    question: "Why is assigning a switch expression to a `final` variable considered a best practice?",
    shortAnswer: "Because it guarantees that the variable is initialized exactly once with a valid value and cannot be mutated subsequently, ensuring thread safety and immutability.",
    explanation: "Aligns with clean functional programming paradigms.",
    hint: "Guarantees single initialization and immutability.",
    level: "basic",
    codeExample: "final int fee = switch (track) { case JAVA → 15000; default → 10000; };"
  },
  {
    question: "What happens if one branch of a switch expression returns a `String` and another returns an `int` when assigned to `int`?",
    shortAnswer: "Compilation error: 'incompatible types: java.lang.String cannot be converted to int'.",
    explanation: "All branches must be compatible with the target assignment type.",
    hint: "Incompatible branch types cause compile error.",
    level: "basic",
    codeExample: "// int x = switch (n) { case 1 → 10; default → \"Ten\"; }; // ERROR"
  },
  {
    question: "Can a switch expression throw an exception from a branch while other branches return values?",
    shortAnswer: "Yes! `case ERROR → throw new RuntimeException();` is completely valid because a `throw` statement has bottom type and satisfies exhaustiveness.",
    explanation: "Allows defensive handling of invalid states.",
    hint: "Throw statements are valid and satisfy exhaustiveness.",
    level: "basic",
    codeExample: "default → throw new IllegalArgumentException(\"Invalid track\");"
  },
  {
    question: "Why is a trailing semicolon `;` required after a switch expression assignment statement?",
    shortAnswer: "Because the assignment `Type var = switch (...) { ... };` is a variable declaration statement, which in Java grammar must terminate with a semicolon.",
    explanation: "Required on all assignment statements.",
    hint: "Mandatory semicolon for assignment statements.",
    level: "basic",
    codeExample: "int x = switch (y) { default → 0; }; // Semicolon required"
  },
  {
    question: "Can a switch expression return `null`?",
    shortAnswer: "Yes! If the target type is a reference type (e.g. `String`), returning `null` from a branch (`case UNKNOWN → null;`) is valid.",
    explanation: "Null literal is assignable to any reference type.",
    hint: "Valid for reference types.",
    level: "basic",
    codeExample: "String s = switch (id) { case 1 → \"A\"; default → null; };"
  },
  {
    question: "What happens if a switch expression returns `null` and is assigned to a primitive `int`?",
    shortAnswer: "Compiles, but throws `java.lang.NullPointerException` at runtime during autounboxing!",
    explanation: "Autounboxing a null reference always triggers NPE.",
    hint: "Throws NullPointerException during unboxing.",
    level: "intermediate",
    codeExample: "// int n = switch (x) { default → (Integer) null; }; // THROWS NPE at runtime"
  },
  {
    question: "Can a switch expression be nested inside another switch expression?",
    shortAnswer: "Yes! A branch expression can contain another inner switch expression.",
    explanation: "Valid syntax, though should be kept concise to maintain readability.",
    hint: "Nesting is valid syntax.",
    level: "intermediate",
    codeExample: "int val = switch (a) { case 1 → switch (b) { case 2 → 20; default → 0; }; default → 0; };"
  },
  {
    question: "What bytecode instruction stores the switch expression result onto the stack?",
    shortAnswer: "Each branch loads its result onto the JVM operand stack (`bipush`, `iconst`, `ldc`, `aload`), then jumps unconditionally to the exit label where the top-of-stack value is popped/stored.",
    explanation: "Direct operand stack yield.",
    hint: "Branch loads value onto operand stack before jumping to exit label.",
    level: "advanced",
    codeExample: "// iconst_1 → goto L_EXIT"
  },
  {
    question: "Can a switch expression be used with `var` local variable type inference in Java 14+?",
    shortAnswer: "Yes! E.g. `var result = switch (option) { case 1 → \"One\"; default → \"Other\"; };`.",
    explanation: "The compiler infers `result` as `String`.",
    hint: "Fully compatible with var type inference.",
    level: "basic",
    codeExample: "var title = switch (role) { case ADMIN → \"Admin\"; default → \"User\"; };"
  },
  {
    question: "What is the evaluated result of `int x = 2; String res = switch (x) { case 1 → \"A\"; case 2 → \"B\"; default → \"C\"; };`?",
    shortAnswer: "`res = \"B\"`.",
    explanation: "Matches `case 2` directly.",
    hint: "Evaluates to \"B\".",
    level: "basic",
    codeExample: "switch (2) { case 1 → \"A\"; case 2 → \"B\"; default → \"C\"; }"
  },
  {
    question: "Can an enum switch expression omit `default` if 3 out of 4 enum constants are handled?",
    shortAnswer: "No! If any enum constant is unhandled, the compiler raises an exhaustiveness error.",
    explanation: "All constants must be covered.",
    hint: "Must cover all constants or provide default.",
    level: "basic",
    codeExample: "// Enum with 4 constants: handling 3 without default causes compile error!"
  },
  {
    question: "How does using switch expressions improve unit test reliability?",
    shortAnswer: "Because exhaustiveness ensures that no edge case or unhandled state can slip through silently, eliminating entire classes of uninitialized state bugs.",
    explanation: "Guarantees deterministic output for all inputs.",
    hint: "Eliminates uninitialized state defects.",
    level: "basic",
    codeExample: "// Exhaustiveness guarantees all inputs are covered"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student badge generator, how is switch expression embedded?",
    shortAnswer: "Directly as the formatting parameter in `System.out.printf(\"Badge: %s\", switch (category) { ... })`.",
    explanation: "Demonstrates direct method argument embedding.",
    hint: "Embedded directly in printf formatting argument.",
    level: "basic",
    codeExample: "printf(\"Badge: %s\", switch (cat) { case MERIT → \"⭐\"; default → \"📚\"; });"
  },
  {
    question: "Can a switch expression return a lambda expression or method reference?",
    shortAnswer: "Yes! E.g. `Function<Double, Double> calc = switch (type) { case TAX → val → val * 0.18; default → val → 0.0; };`.",
    explanation: "First-class support for functional interfaces.",
    hint: "Can return lambdas and functional interfaces.",
    level: "advanced",
    codeExample: "Function<Double, Double> taxFn = switch (tier) { case STANDARD → v → v * 0.18; default → v → 0.0; };"
  },
  {
    question: "What is the difference between traditional ternary operator `(cond ? v1 : v2)` and a switch expression?",
    shortAnswer: "Ternary operator handles binary 2-branch expressions; switch expressions generalize value-returning expressions to $N$ multi-way branches.",
    explanation: "Switch expression is the multi-branch equivalent of the ternary operator.",
    hint: "Multi-branch generalization of the ternary operator.",
    level: "basic",
    codeExample: "// Ternary (2 branches) vs Switch Expression (N branches)"
  },
  {
    question: "What happens if a switch expression has a block body `{ ... }` that fails to return or yield a value?",
    shortAnswer: "Compilation error: 'missing return value' or 'yield required in multi-statement switch block'.",
    explanation: "Topic 15 explores the `yield` keyword in detail.",
    hint: "Compile error if a block fails to yield a value.",
    level: "basic",
    codeExample: "case 1 → { int x = 10; yield x; } // yield required in blocks"
  },
  {
    question: "Can a switch expression be used in constructor initialization (`this.fee = switch (...) { ... };`)?",
    shortAnswer: "Yes! Ideal for initializing `final` instance fields inside class constructors.",
    explanation: "Eliminates mutable field assignments in constructors.",
    hint: "Ideal for final field initialization in constructors.",
    level: "basic",
    codeExample: "public Course(Track t) { this.fee = switch (t) { case JAVA → 15000; default → 10000; }; }"
  },
  {
    question: "Can a switch expression return boolean values to drive an `if` condition (`if (switch (status) { case 200 → true; default → false; })`)?",
    shortAnswer: "Yes! Although usually written directly with boolean logic, it is syntactically legal.",
    explanation: "Valid wherever a boolean expression is expected.",
    hint: "Valid as conditional expression in if statements.",
    level: "intermediate",
    codeExample: "if (switch (code) { case 200 → true; default → false; }) { }"
  },
  {
    question: "How does the HotSpot JIT compiler optimize switch expressions?",
    shortAnswer: "By generating optimized jump tables and folding constant switch expressions directly into static constants at runtime.",
    explanation: "Aggressive JIT constant folding.",
    hint: "Constant folding and optimized jump tables.",
    level: "advanced",
    codeExample: "// JIT performs constant folding"
  },
  {
    question: "What is the result of `int val = switch (\"ACC\") { case \"ACC\" → 12000; default → 0; };`?",
    shortAnswer: "`val = 12000`.",
    explanation: "Direct String match returning `12000`.",
    hint: "Evaluates to 12000.",
    level: "basic",
    codeExample: "switch (\"ACC\") { case \"ACC\" → 12000; default → 0; }"
  },
  {
    question: "What is the ultimate takeaway of Module 001_004 Topic 14 for Java developers?",
    shortAnswer: "Switch Expressions allow direct, functional value returns to assignment targets, method parameters, and return statements; compile-time exhaustiveness eliminates unhandled edge cases, enabling clean immutable architectures.",
    explanation: "Essential modern Java paradigm.",
    hint: "Direct value returns, compile-time exhaustiveness, and immutable architectures.",
    level: "basic",
    codeExample: "// Summary: final Type val = switch (key) { case A → v1; default → v2; };"
  },
  {
    question: "What is the next topic (Topic 15) in Module 001_004?",
    shortAnswer: "The 'yield' keyword for returning values from multi-statement switch blocks.",
    explanation: "Topic 15 explores the `yield` statement (introduced in Java 14) for yielding values from complex multi-line arrow and colon switch blocks.",
    hint: "The 'yield' keyword for multi-statement switch blocks.",
    level: "basic",
    codeExample: "// Topic 15: The 'yield' keyword"
  }
];

export default questions;
