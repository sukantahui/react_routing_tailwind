/**
 * Module 001_007: Topic 4: Return statement: returning values vs void return, early returns as guard clauses
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the primary function of the `return` statement in Java?",
    shortAnswer: "To immediately terminate execution of the current method, pop its stack frame from the JVM Call Stack, and return control (and an optional value) to the calling expression (JLS §14.17).",
    explanation: "Core definition of return statement control flow.",
    hint: "Terminates the method and returns control/value to the caller.",
    level: "basic",
    codeExample: "public static double compute(double fee) { return fee * 1.18; }"
  },
  {
    question: "What is the difference between returning a value vs a void return?",
    shortAnswer: "Value-returning methods use `return expression;` where the expression type must match the declared return type; void methods use `return;` (with no value) to exit early without producing a result.",
    explanation: "Value vs void return syntax.",
    hint: "return value; vs return; (empty for void).",
    level: "basic",
    codeExample: "// Value: return 42; | Void: return;"
  },
  {
    question: "What is a 'Guard Clause' (Bouncer Pattern) in Java methods?",
    shortAnswer: "An early return check placed at the top of a method to handle invalid inputs or edge conditions immediately, eliminating deeply nested `if-else` blocks.",
    explanation: "Clean code pattern for eliminating the Arrow Anti-Pattern.",
    hint: "Early return check at method start to handle edge cases immediately.",
    level: "basic",
    codeExample: "if (installments <= 0) return 0.0; // Guard clause"
  },
  {
    question: "Why are Guard Clauses preferred over deeply nested `if-else` pyramids ('Arrow Anti-Pattern')?",
    shortAnswer: "Guard clauses keep the main 'happy path' logic at the lowest indentation level, significantly improving readability, cognitive clarity, and maintainability.",
    explanation: "Cognitive complexity reduction via early exits.",
    hint: "Keeps the main business logic un-nested and easy to read.",
    level: "intermediate",
    codeExample: "// With guard clauses: 1 level of indent | Without: 5 nested if-else levels"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee engine, what did Guard Clause 1 in `calculateInstallment()` validate?",
    shortAnswer: "`if (totalFees <= 0.0) return 0.0;` preventing calculation on negative or zero course fees in Indian Rupees (₹).",
    explanation: "Defensive validation demonstration.",
    hint: "Ensured totalFees is strictly positive.",
    level: "basic",
    codeExample: "if (totalFees <= 0.0) return 0.0;"
  },
  {
    question: "What causes a `Compile Error: unreachable statement` involving return statements?",
    shortAnswer: "Placing any executable statements directly after an unconditional `return`, `throw`, `break`, or `continue` statement.",
    explanation: "JLS §14.21 definite reachability rules.",
    hint: "Code placed directly after an unconditional return can never execute.",
    level: "basic",
    codeExample: "return 10;\n// System.out.println(\"Unreachable!\"); // COMPILE ERROR"
  },
  {
    question: "Can a non-void method have multiple `return` statements?",
    shortAnswer: "YES! A method can contain multiple return statements along different conditional branches, provided every execution path terminates with a return.",
    explanation: "Multiple return exit points in branching logic.",
    hint: "Yes, multiple returns across different branches are completely legal.",
    level: "basic",
    codeExample: "if (score >= 90) return \"A\"; else if (score >= 80) return \"B\"; else return \"C\";"
  },
  {
    question: "What happens if an `if` block returns a value, but the method lacks an `else` return statement in a non-void method?",
    shortAnswer: "`Compile Error: missing return statement` because the compiler detects a reachable execution path that does not return a value.",
    explanation: "Definite assignment and return requirement in Java.",
    hint: "Compile error: missing return statement on the fall-through path.",
    level: "basic",
    codeExample: "// int get() { if (flag) return 1; } // COMPILE ERROR: missing return!"
  },
  {
    question: "Can a `return` statement return an expression that requires implicit type conversion (e.g. returning `int` 10 from a `double` method)?",
    shortAnswer: "YES! Java performs automatic widening primitive conversion (e.g. `int` 10 is automatically converted to `10.0`).",
    explanation: "Widening in return expressions.",
    hint: "Yes, returning int from a double method automatically widens the value.",
    level: "basic",
    codeExample: "public double getRate() { int x = 10; return x; } // Returns 10.0"
  },
  {
    question: "Can a `return` statement return `null` if the method return type is an Object reference?",
    shortAnswer: "YES! Any reference type (`String`, `StudentAccount`, array) can return `null`.",
    explanation: "Reference type null returns.",
    hint: "Yes, reference types can return null.",
    level: "basic",
    codeExample: "public Student findStudent(int id) { return null; } // Legal"
  },
  {
    question: "Why is returning `Optional<T>` preferred over returning `null` in modern Java APIs (Java 8+)?",
    shortAnswer: "Returning `Optional<T>` explicitly forces callers to handle the possibility of an absent value, eliminating runtime `NullPointerException` bugs.",
    explanation: "Modern API design with java.util.Optional.",
    hint: "Eliminates NullPointerExceptions by forcing callers to check presence.",
    level: "intermediate",
    codeExample: "public Optional<Student> findByRoll(int roll) { return Optional.ofNullable(s); }"
  },
  {
    question: "What happens if a `finally` block contains a `return` statement?",
    shortAnswer: "The `return` statement inside the `finally` block OVERRIDES and suppresses any return value or uncaught exception from the `try` or `catch` blocks (considered an anti-pattern!).",
    explanation: "Finally block return override hazard.",
    hint: "Finally return overrides the try/catch return value and swallows exceptions.",
    level: "advanced",
    codeExample: "try { return 1; } finally { return 2; } // Returns 2!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee invoicing system, what happened when `isRegistered` was false in `printReceiptHeader()`?",
    shortAnswer: "The guard clause executed `return;`, immediately terminating the void method and preventing printing of the official receipt in Indian Rupees (₹).",
    explanation: "Early exit in void method demonstration.",
    hint: "Executed 'return;' exiting the void method immediately.",
    level: "basic",
    codeExample: "if (!isRegistered) { System.out.println(\"Denied\"); return; }"
  },
  {
    question: "Is it required to place a `return;` statement at the very end of a `void` method?",
    shortAnswer: "NO! An implicit `return;` is automatically executed when a void method reaches the closing curly brace `}`.",
    explanation: "Implicit void return at method end.",
    hint: "No, void methods return automatically at the closing brace.",
    level: "basic",
    codeExample: "public void doWork() { int x = 5; } // Implicit return at end"
  },
  {
    question: "Can a `return` statement invoke another method inline (`return calculateGross() * 1.18;`)?",
    shortAnswer: "YES! Java evaluates the method call and arithmetic expression, and returns the final evaluated result.",
    explanation: "Inline expression evaluation in return.",
    hint: "Yes, expressions and method calls are evaluated before returning.",
    level: "basic",
    codeExample: "public double getNet() { return getGross() - getDiscount(); }"
  },
  {
    question: "What is the 'Single Exit Point' rule and why is it considered outdated in modern Java?",
    shortAnswer: "An old structured programming rule mandating exactly one return at the end of a method using flag variables; modern Java prefers clean early guard returns because they reduce code complexity.",
    explanation: "Evolution of software engineering clean code standards.",
    hint: "Single exit point forced temporary flag variables; guard clauses are cleaner.",
    level: "intermediate",
    codeExample: "// Early returns are cleaner than complex nested flag checks"
  },
  {
    question: "What is the return value of a method with a `boolean` return type if no branch is taken?",
    shortAnswer: "Every branch MUST return a boolean explicitly; if any branch can fall through without returning, the code fails to compile with `missing return statement`.",
    explanation: "Strict return coverage compiler check.",
    hint: "All paths must return a boolean explicitly; compiler errors if any path misses.",
    level: "basic",
    codeExample: "// Compiler verifies all paths return a boolean value"
  },
  {
    question: "Can a `return` statement be used inside a `switch` expression in Java 14+?",
    shortAnswer: "In a `switch` expression, values are yielded with `yield` or arrow `->`; a `return` statement inside a switch expression exits the entire enclosing method, not just the switch!",
    explanation: "Switch expression yield vs method return.",
    hint: "return exits the method; yield supplies the switch expression value.",
    level: "advanced",
    codeExample: "return switch(tier) { case GOLD -> 0.15; case SILVER -> 0.10; };"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee system, what did Guard Clause 2 in `calculateInstallment()` check?",
    shortAnswer: "`if (installments <= 0 || installments > 12) return 0.0;` ensuring installments are between 1 and 12 months in Indian Rupees (₹).",
    explanation: "Range validation via guard clause.",
    hint: "Checked that installments are between 1 and 12.",
    level: "basic",
    codeExample: "if (installments <= 0 || installments > 12) return 0.0;"
  },
  {
    question: "Can a constructor in Java contain a `return;` statement?",
    shortAnswer: "YES! A constructor can contain `return;` (with no value) to exit early, but CANNOT contain `return value;` (constructors have no return type).",
    explanation: "Early return in constructors.",
    hint: "Yes, 'return;' is allowed in constructors, but returning a value is illegal.",
    level: "intermediate",
    codeExample: "public Student(int age) { if (age < 0) return; this.age = age; }"
  },
  {
    question: "What happens if you write `return (x = 5);` in an `int` method?",
    shortAnswer: "The assignment expression `(x = 5)` assigns 5 to variable `x` and evaluates to 5, returning 5 to the caller.",
    explanation: "Assignment expression evaluation in return statements.",
    hint: "Assigns 5 to x and returns 5.",
    level: "intermediate",
    codeExample: "int x; return (x = 5); // Assigns and returns 5"
  },
  {
    question: "What is the recommended alternative to returning `null` when returning an empty array or collection?",
    shortAnswer: "Return an empty array (`new double[0]`) or empty collection (`List.of()`, `Collections.emptyList()`) to prevent `NullPointerException` on callers.",
    explanation: "Joshua Bloch Effective Java Item 54: Return empty collections, not nulls.",
    hint: "Return an empty array/collection instead of null.",
    level: "intermediate",
    codeExample: "public List<Student> getStudents() { return List.of(); }"
  },
  {
    question: "How does the ternary conditional operator (`? :`) interact with `return` statements?",
    shortAnswer: "`return condition ? valueIfTrue : valueIfFalse;` provides a concise single-line conditional return.",
    explanation: "Ternary return idiom.",
    hint: "return condition ? val1 : val2; returns the evaluated branch.",
    level: "basic",
    codeExample: "return isScholarship ? gross * 0.90 : gross;"
  },
  {
    question: "What error occurs if a `void` method writes `return 0;`?",
    shortAnswer: "`Compile Error: cannot return a value from a method with void result type`.",
    explanation: "Void return type value constraint.",
    hint: "Compile error: cannot return a value from a void method.",
    level: "basic",
    codeExample: "// void print() { return 0; } // COMPILE ERROR!"
  },
  {
    question: "Can an enhanced for-each loop contain a `return` statement to find an element early?",
    shortAnswer: "YES! Returning immediately upon finding the target element terminates the loop and method in $O(1)$ to $O(N)$ without inspecting remaining elements.",
    explanation: "Early exit in search loops.",
    hint: "Yes, returning inside a loop terminates both the loop and the method immediately.",
    level: "basic",
    codeExample: "for (Student s : list) if (s.getId() == id) return s; return null;"
  },
  {
    question: "What is Tail Call Optimization (TCO) and does Java support it for return statements?",
    shortAnswer: "TCO reuses the current stack frame when the return statement is a direct recursive call; standard Java HotSpot JVM does NOT support TCO, though some third-party compilers do.",
    explanation: "Tail recursion optimization status in Java.",
    hint: "Java HotSpot does not support Tail Call Optimization; recursive calls grow the stack.",
    level: "advanced",
    codeExample: "// return factHelper(n - 1, acc * n); // Still pushes a new stack frame in Java"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee invoicing system, how many total return statements did `calculateInstallment()` contain?",
    shortAnswer: "3 return statements: 2 guard clause exits (`return 0.0;`) and 1 final return (`return baseInstallment + lateFine;`).",
    explanation: "Return structure breakdown.",
    hint: "3 return statements (2 guard exits and 1 final business calculation).",
    level: "basic",
    codeExample: "calculateInstallment() has 2 guard returns and 1 final return"
  },
  {
    question: "What is the ultimate takeaway of Module 001_007 Topic 4 for Java developers?",
    shortAnswer: "`return` exits a method immediately; value-returning methods must cover all paths, `void` methods use `return;` for early exits, and Guard Clauses eliminate nested `if-else` complexity by handling edge conditions upfront.",
    explanation: "Mastery of return statements and guard clauses.",
    hint: "Guard clauses at method start eliminate nesting; return terminates the method instantly.",
    level: "basic",
    codeExample: "// Summary: Guard Clauses -> Clean Happy Path -> Final Return"
  },
  {
    question: "What is the next topic (Topic 5) in Module 001_007?",
    shortAnswer: "Pass-by-Value in Java: why Java is strictly Pass-by-Value for both primitives and object references.",
    explanation: "Topic 5 is the legendary deep dive into Java's strictly pass-by-value memory model.",
    hint: "Pass-by-Value in Java: why Java is strictly Pass-by-Value for primitives and object references.",
    level: "basic",
    codeExample: "// Topic 5: Strictly Pass-by-Value Memory Mechanics in Java"
  },
  {
    question: "Can a `return` statement return an anonymous class or lambda expression in Java?",
    shortAnswer: "YES! Returning a functional interface implementation (e.g. `return (a, b) -> a + b;`) or an anonymous instance is standard in functional Java.",
    explanation: "Functional programming return types.",
    hint: "Yes, returning lambdas or anonymous classes is completely legal.",
    level: "intermediate",
    codeExample: "public Comparator<Student> byFee() { return (s1, s2) -> Double.compare(s1.fee, s2.fee); }"
  }
];

export default questions;
