/**
 * Module 001_007: Topic 15: StackOverflowError: causes, infinite recursion, and prevention
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is `java.lang.StackOverflowError` in Java?",
    shortAnswer: "An unchecked `VirtualMachineError` (subclass of `java.lang.Error`) thrown by the JVM when the Call Stack runs out of memory due to excessively deep or unbounded method invocations (JLS §11.1.1).",
    explanation: "Core definition and class hierarchy of StackOverflowError.",
    hint: "VirtualMachineError thrown when Call Stack memory is exhausted.",
    level: "basic",
    codeExample: "// java.lang.Object → Throwable → Error → VirtualMachineError → StackOverflowError"
  },
  {
    question: "Is `StackOverflowError` an Exception or an Error?",
    shortAnswer: "It is an **Error** (extends `java.lang.VirtualMachineError`), representing a severe fatal JVM subsystem failure rather than a recoverable application exception.",
    explanation: "Error vs Exception distinction.",
    hint: "It is an Error, representing a severe JVM memory exhaustion.",
    level: "basic",
    codeExample: "// Do NOT catch generic Exception expecting to catch StackOverflowError"
  },
  {
    question: "What are the 4 primary causes of `StackOverflowError` in Java applications?",
    shortAnswer: "1. **Missing Base Case**, 2. **Faulty / Unreachable Base Case** (`n == 0` with negative inputs), 3. **Divergent Recursive Step** (`n + 1` instead of `n - 1`), 4. **Excessively Deep Valid Recursion** ($N > 10,000$ exceeding `-Xss` limit).",
    explanation: "The 4 root causes of stack overflow.",
    hint: "Missing base case, unreachable base case, divergent step, and excessively deep call chains.",
    level: "basic",
    codeExample: "// void loop() { loop(); } // Classic missing base case"
  },
  {
    question: "Why should you use defensive inequality base cases (`if (n <= 0)`) rather than exact equality (`if (n == 0)`)?",
    shortAnswer: "Because exact equality fails to terminate if passed negative numbers or if step decrements by more than 1 (e.g. `n - 2`), causing infinite recursive descent.",
    explanation: "Defensive base case programming principle.",
    hint: "Prevents infinite loops if negative inputs or larger step decrements bypass exact equality.",
    level: "basic",
    codeExample: "if (n <= 0) return 0; // Defensive base case"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what happened when `safeDefensiveSum(-5, ...)` was called?",
    shortAnswer: "The defensive base case `n <= 0` terminated immediately, returning 0 safely without crashing in Indian Rupees (₹).",
    explanation: "Defensive base case demonstration.",
    hint: "Terminated safely returning 0.",
    level: "basic",
    codeExample: "safeDefensiveSum(-5, 0, 100) → 0"
  },
  {
    question: "What is a 'Depth Guard' in recursive programming?",
    shortAnswer: "A counter tracking recursion depth that aborts and throws an exception or returns a default fallback if depth exceeds a predefined safety limit (e.g. `if (depth > maxDepth) return 0;`).",
    explanation: "Depth guard circuit breaker pattern.",
    hint: "Safety counter that aborts recursion if depth exceeds threshold.",
    level: "intermediate",
    codeExample: "if (currentDepth > maxSafeDepth) return 0;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the result of `safeDefensiveSum(100, 0, 50)`?",
    shortAnswer: "The Depth Guard tripped at depth 51, safely aborting recursion and preventing a `StackOverflowError` in Indian Rupees (₹).",
    explanation: "Depth guard demonstration.",
    hint: "Depth guard tripped at depth 51, safely aborting.",
    level: "basic",
    codeExample: "safeDefensiveSum(100, 0, 50); // Guard tripped"
  },
  {
    question: "Why should deep linear recursion ($N > 10,000$) be refactored into an iterative loop?",
    shortAnswer: "Because iterative loops reuse a single stack frame with $O(1)$ memory, eliminating stack depth limitations and enabling computation of millions of steps safely.",
    explanation: "Iterative refactoring rationale.",
    hint: "Iterative loops use O(1) stack memory, running millions of iterations without crashing.",
    level: "basic",
    codeExample: "for (int i = 1; i <= 100_000; i++) total += i;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what sum was safely computed by `iterativeSafeSum(100_000)`?",
    shortAnswer: "$5,000,050,000$ calculated in $O(1)$ stack space without risk of stack overflow in Indian Rupees (₹).",
    explanation: "Iterative large-scale summation calculation.",
    hint: "5,000,050,000.",
    level: "basic",
    codeExample: "iterativeSafeSum(100_000) → 5000050000L"
  },
  {
    question: "Approximately how many stack frames can a standard 64-bit JVM hold with the default 1MB stack size (`-Xss1m`)?",
    shortAnswer: "Typically between 7,000 and 15,000 frames (depending on the number of local variables and operand stack size of each frame).",
    explanation: "Typical default thread stack limits.",
    hint: "Around 7,000 to 15,000 frames depending on frame byte size.",
    level: "intermediate",
    codeExample: "// probeStackLimit measured ~10,000 frames before exhausting default 1MB stack"
  },
  {
    question: "How can the JVM Thread Stack size be configured via command-line arguments?",
    shortAnswer: "Using the `-Xss` flag (e.g. `java -Xss4m ApplicationName` sets the stack size to 4 megabytes per thread).",
    explanation: "JVM stack memory tuning.",
    hint: "-Xss flag sets thread stack size (e.g. -Xss4m).",
    level: "intermediate",
    codeExample: "java -Xss4m com.coderaccotax.App"
  },
  {
    question: "Why is increasing `-Xss` not always a good solution for fixing StackOverflowError?",
    shortAnswer: "Because larger stack sizes reduce the total number of concurrent threads that can fit into physical RAM, and increasing stack size only delays failure if infinite recursion is present.",
    explanation: "Memory trade-off of increasing -Xss.",
    hint: "Reduces max concurrent thread count and fails to fix infinite recursion bugs.",
    level: "intermediate",
    codeExample: "// Larger -Xss consumes more RAM per thread, limiting thread scalability"
  },
  {
    question: "Can an indirect mutual recursion loop cause `StackOverflowError` (e.g. `A() → B() → A()`)?",
    shortAnswer: "YES! If Method A calls Method B and Method B calls Method A without a base case, both methods push frames alternately until stack exhaustion.",
    explanation: "Indirect mutual recursion loop.",
    hint: "Yes, mutual recursive loops push frames alternately until stack overflow.",
    level: "basic",
    codeExample: "void a() { b(); } void b() { a(); } // Infinite mutual recursion"
  },
  {
    question: "Can circular dependencies in JavaBean `toString()`, `equals()`, or `hashCode()` cause `StackOverflowError`?",
    shortAnswer: "YES! If Object A references Object B and Object B references Object A, calling `a.toString()` triggers `b.toString()` which triggers `a.toString()` in an infinite loop.",
    explanation: "Circular reference toString() bug in Java entities.",
    hint: "Yes, circular references in toString() or equals() trigger infinite recursive loops.",
    level: "intermediate",
    codeExample: "class Student { Course c; String toString() { return \"\" + c; } }"
  },
  {
    question: "How do Jackson / Gson JSON serializers prevent `StackOverflowError` on circular references?",
    shortAnswer: "Using annotations like `@JsonManagedReference` / `@JsonBackReference` or `@JsonIdentityInfo` to break bidirectional serialization loops.",
    explanation: "JSON serialization circular reference prevention.",
    hint: "@JsonManagedReference and @JsonIdentityInfo annotations.",
    level: "advanced",
    codeExample: "@JsonManagedReference public Course getCourse() { ... }"
  },
  {
    question: "Should you write `catch (StackOverflowError e)` in production enterprise code?",
    shortAnswer: "Generally NO; catching `Error` leaves the JVM thread in an unstable or indeterminate state. It should be caught only for controlled diagnostics or specialized sandboxes.",
    explanation: "Catching Error anti-pattern in Java.",
    hint: "Generally avoided; Errors indicate severe system failure, not normal business recovery.",
    level: "intermediate",
    codeExample: "// Avoid catching Error; fix the recursive algorithm instead"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, why did `dangerousCountdownSum(-1)` cause infinite descent?",
    shortAnswer: "Because the base case was `if (n == 0)`, and decrementing `-1` produced `-2, -3, -4, ...` never equaling 0 in Indian Rupees (₹).",
    explanation: "Exact equality boundary trap analysis.",
    hint: "Decrementing -1 produces negative numbers that never equal 0.",
    level: "basic",
    codeExample: "n == 0 check is bypassed when starting with negative numbers"
  },
  {
    question: "What is 'Tail Call Optimization' (TCO) and why does its absence in standard HotSpot make recursion vulnerable to StackOverflowError?",
    shortAnswer: "TCO would overwrite the current stack frame for tail recursive calls, allowing infinite recursion in $O(1)$ stack space; without TCO, every recursive call grows the Call Stack linearly.",
    explanation: "Impact of lack of TCO in HotSpot JVM.",
    hint: "Without TCO, every recursive call must allocate a new stack frame.",
    level: "advanced",
    codeExample: "// HotSpot does not eliminate tail frames, leading to stack growth"
  },
  {
    question: "What happens if an object constructor calls itself recursively (`public Student() { this(); }`)?",
    shortAnswer: "`Compile Error: recursive constructor invocation` (the Java compiler detects and forbids direct circular constructor chaining).",
    explanation: "Compiler prevention of circular constructor chaining.",
    hint: "Compile error: recursive constructor invocation.",
    level: "intermediate",
    codeExample: "// public Student() { this(); } // COMPILE ERROR"
  },
  {
    question: "Can an instance initializer block trigger `StackOverflowError` through object instantiation (`class A { A a = new A(); }`)?",
    shortAnswer: "YES! Instantiating `new A()` initializes field `a` by creating `new A()`, triggering endless heap allocation and constructor frames until `StackOverflowError`.",
    explanation: "Recursive instance field initialization trap.",
    hint: "Yes, field initializer creating new instances of self causes endless instantiation loop.",
    level: "intermediate",
    codeExample: "class Loop { Loop next = new Loop(); } // Throws StackOverflowError on 'new Loop()'"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what did `probeStackLimit` measure?",
    shortAnswer: "The maximum stack frame capacity of the executing thread before running out of stack memory in Indian Rupees (₹).",
    explanation: "Stack limit probing technique.",
    hint: "Measured max stack frame depth before StackOverflowError.",
    level: "basic",
    codeExample: "probeStackLimit(1); // Measured stack frame capacity"
  },
  {
    question: "What static analysis tools in the Java ecosystem detect potential infinite recursion before runtime?",
    shortAnswer: "SonarQube, SpotBugs, ErrorProne, and modern IDEs (IntelliJ IDEA, Eclipse) which flag recursive calls lacking reachable base cases.",
    explanation: "Static analysis for recursion safety.",
    hint: "SonarQube, SpotBugs, ErrorProne, and IDE inspections.",
    level: "basic",
    codeExample: "// IDE inspection: 'Function call is recursive without base case'"
  },
  {
    question: "What is the difference between `OutOfMemoryError` and `StackOverflowError`?",
    shortAnswer: "`OutOfMemoryError` occurs when the **Heap** runs out of memory for object allocation; `StackOverflowError` occurs when the **Call Stack** runs out of memory for method execution frames.",
    explanation: "Heap vs Stack memory error distinction.",
    hint: "OutOfMemoryError is for Heap; StackOverflowError is for Call Stack.",
    level: "basic",
    codeExample: "// Heap exhausted → OutOfMemoryError | Stack exhausted → StackOverflowError"
  },
  {
    question: "Can a `finally` block execute if a `StackOverflowError` occurs inside `try`?",
    shortAnswer: "YES! If sufficient stack space remains to push the `finally` block frame, the JVM executes the `finally` block during stack unwinding.",
    explanation: "Finally block execution during Error unwinding.",
    hint: "Yes, finally blocks execute during error stack unwinding if stack permits.",
    level: "advanced",
    codeExample: "try { recurse(); } finally { cleanUp(); }"
  },
  {
    question: "How can Java 8 Streams replace deep recursion for tree / collection processing?",
    shortAnswer: "Using `Stream.iterate()` or flatMap pipeline transformations that process unbounded sequences iteratively in $O(1)$ stack space.",
    explanation: "Stream API iterative pipeline alternative.",
    hint: "Stream.iterate() processes sequences iteratively without recursive frames.",
    level: "intermediate",
    codeExample: "Stream.iterate(1, n → n + 1).limit(100000).mapToLong(i → i).sum();"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the safe depth limit set in `safeDefensiveSum(100, 0, 50)`?",
    shortAnswer: "`maxSafeDepth = 50`, preventing runaway stack growth in Indian Rupees (₹).",
    explanation: "Safety threshold verification.",
    hint: "maxSafeDepth = 50.",
    level: "basic",
    codeExample: "maxSafeDepth = 50"
  },
  {
    question: "Can recursive regular expressions in `java.util.regex.Pattern` cause `StackOverflowError`?",
    shortAnswer: "YES! Catastrophic backtracking with nested quantifiers (e.g. `(a+)+`) on long non-matching strings causes deep internal regex recursion resulting in `StackOverflowError`.",
    explanation: "Regex catastrophic backtracking stack overflow.",
    hint: "Yes, catastrophic backtracking in complex regex patterns causes stack overflow.",
    level: "advanced",
    codeExample: "Pattern.compile(\"(a+)+\").matcher(\"aaaaaaaaaaaaaaaaaaaaax\").matches();"
  },
  {
    question: "What is the ultimate takeaway of Module 001_007 Topic 15 for Java developers?",
    shortAnswer: "`StackOverflowError` occurs when the Call Stack exhausts memory due to unbounded recursion or large input depths. Always write defensive base cases (`n <= 0`), implement depth guards, and convert deep linear recursion to iterative loops.",
    explanation: "Mastery of StackOverflowError causes and prevention.",
    hint: "Defensive base cases (n <= 0), depth guards, and iterative conversion prevent stack overflow.",
    level: "basic",
    codeExample: "// Summary: Defensive Base Case (<=) + Depth Guard + Iterative Refactoring"
  },
  {
    question: "What is the next topic (Topic 16) in Module 001_007?",
    shortAnswer: "Classic recursive algorithms: Factorial, Fibonacci, Sum of Digits, Power calculation, Tower of Hanoi.",
    explanation: "Topic 16 implements the 5 quintessential classic recursive algorithms in complete detail.",
    hint: "Classic recursive algorithms: Factorial, Fibonacci, Sum of Digits, Power, Tower of Hanoi.",
    level: "basic",
    codeExample: "// Topic 16: Classic Recursive Algorithms Master Suite"
  },
  {
    question: "How do Trampoline data structures eliminate stack overflow in functional Java libraries (e.g. Vavr)?",
    shortAnswer: "A Trampoline wraps recursive steps in thunks/lambdas and evaluates them sequentially in an iterative loop on the Heap, achieving arbitrary recursion depth without stack growth.",
    explanation: "Trampoline pattern in functional programming.",
    hint: "Evaluates recursive steps in an iterative loop on the Heap using thunks.",
    level: "advanced",
    codeExample: "Trampoline<Long> fact(int n, long acc) { return n <= 1 ? done(acc) : more(() → fact(n - 1, acc * n)); }"
  }
];

export default questions;
