/**
 * Module 001_007: Topic 12: Recursive methods: definition, base case (termination condition), and recursive step
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is a Recursive Method in Java?",
    shortAnswer: "A method that solves a computational problem by invoking smaller sub-problem instances of **ITSELF** directly or indirectly.",
    explanation: "Core definition of recursion.",
    hint: "A method that calls itself to solve smaller sub-instances of a problem.",
    level: "basic",
    codeExample: "long fact(int n) { return n <= 1 ? 1 : n * fact(n - 1); }"
  },
  {
    question: "What are the TWO indispensable components of every valid recursive method?",
    shortAnswer: "1. **Base Case** (Termination Condition): Returns an immediate non-recursive answer for the simplest input. 2. **Recursive Step** (Inductive Step): Reduces the problem and calls itself with arguments that progress towards the base case.",
    explanation: "The 2 core pillars of recursion.",
    hint: "Base Case and Recursive Step.",
    level: "basic",
    codeExample: "if (n <= 1) return 1; // Base Case\nreturn n * fact(n - 1); // Recursive Step"
  },
  {
    question: "What happens if a recursive method lacks a Base Case or has an unreachable base case?",
    shortAnswer: "Infinite Recursion: The method calls itself endlessly until the JVM Call Stack exhausts its memory limit, throwing a `java.lang.StackOverflowError` at runtime.",
    explanation: "Infinite recursion failure mode.",
    hint: "Throws StackOverflowError due to infinite call stack growth.",
    level: "basic",
    codeExample: "// void loop() { loop(); } // THROWS StackOverflowError!"
  },
  {
    question: "What is the mathematical foundation behind recursive algorithms?",
    shortAnswer: "**Mathematical Induction**: Establishing a base premise (e.g. $P(1)$ is true) and proving that if $P(k)$ is true, then $P(k+1)$ is also true.",
    explanation: "Theoretical foundation of recursion.",
    hint: "Mathematical Induction (Base Case + Inductive Step).",
    level: "intermediate",
    codeExample: "// Base case corresponds to P(1); recursive step corresponds to P(k) -> P(k+1)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the base case for `calculateFactorial(int n)`?",
    shortAnswer: "`if (n <= 1) return 1;` which terminates recursion when `n` drops to 1 or 0.",
    explanation: "Factorial base case demonstration.",
    hint: "if (n <= 1) return 1;",
    level: "basic",
    codeExample: "if (n <= 1) return 1;"
  },
  {
    question: "What was the recursive step in `calculateFactorial(int n)`?",
    shortAnswer: "`return n * calculateFactorial(n - 1);` which multiplies `n` by the factorial of `n - 1`.",
    explanation: "Factorial recursive step formulation.",
    hint: "return n * calculateFactorial(n - 1);",
    level: "basic",
    codeExample: "return n * calculateFactorial(n - 1);"
  },
  {
    question: "What is 'Direct Recursion' vs 'Indirect Recursion'?",
    shortAnswer: "Direct Recursion occurs when Method A explicitly calls Method A (`A -> A`); Indirect (Mutual) Recursion occurs when Method A calls Method B, which in turn calls Method A (`A -> B -> A`).",
    explanation: "Direct vs Indirect recursion classification.",
    hint: "Direct = A calls A; Indirect = A calls B which calls A.",
    level: "intermediate",
    codeExample: "void a() { b(); } void b() { a(); } // Indirect recursion"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the projected tuition fee for base ₹20,000 at 8% inflation over 4 years?",
    shortAnswer: "₹20,000 × (1.08)⁴ ≈ ₹27,209.78 calculated recursively across 4 yearly steps in Indian Rupees (₹).",
    explanation: "Compound fee recursion calculation.",
    hint: "₹27,209.78.",
    level: "basic",
    codeExample: "calculateCompoundFee(20000.0, 0.08, 4); // ₹27,209.78"
  },
  {
    question: "Why must the recursive argument progress 'monotonically' towards the base case?",
    shortAnswer: "To guarantee that the sequence of recursive calls is finite and will inevitably hit the base case (e.g. `n - 1` strictly decreases towards `1`).",
    explanation: "Convergence guarantee in recursion.",
    hint: "Ensures that arguments decrease/increase towards the base case to guarantee termination.",
    level: "intermediate",
    codeExample: "// n - 1 converges to 0; n + 1 would diverge away from base case"
  },
  {
    question: "What is 'Head Recursion' vs 'Tail Recursion'?",
    shortAnswer: "In Head Recursion, the recursive call occurs before other operations (work is done during stack unwinding); in Tail Recursion, the recursive call is the ABSOLUTE LAST operation executed before returning.",
    explanation: "Head vs Tail recursion taxonomy.",
    hint: "Head recursion calls self first; Tail recursion calls self as the final return operation.",
    level: "intermediate",
    codeExample: "// Tail: return factHelper(n - 1, acc * n); | Head: return n * fact(n - 1);"
  },
  {
    question: "Can a recursive method have multiple Base Cases?",
    shortAnswer: "YES! Many algorithms require multiple base cases (e.g. Fibonacci: `if (n == 0) return 0; if (n == 1) return 1;`).",
    explanation: "Multiple base cases in recursive design.",
    hint: "Yes, multiple base cases are standard for multi-step recurrences like Fibonacci.",
    level: "basic",
    codeExample: "if (n == 0) return 0; if (n == 1) return 1;"
  },
  {
    question: "What is the Time Complexity of calculating factorial recursively for $N$?",
    shortAnswer: "$O(N)$ linear time because exactly $N$ recursive method calls are executed.",
    explanation: "Factorial time complexity analysis.",
    hint: "O(N) linear time.",
    level: "basic",
    codeExample: "// T(N) = T(N - 1) + O(1) -> O(N)"
  },
  {
    question: "What is the Space Complexity of calculating factorial recursively in Java?",
    shortAnswer: "$O(N)$ stack space because $N$ active stack frames remain on the JVM Call Stack until the base case unwinds.",
    explanation: "Stack frame memory complexity.",
    hint: "O(N) stack memory space.",
    level: "basic",
    codeExample: "// N active stack frames exist concurrently on the Call Stack"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the sum of the first 10 months computed by `calculateNaturalSum(10)`?",
    shortAnswer: "1 + 2 + 3 + ... + 10 = 55 in Indian Rupees (₹).",
    explanation: "Natural sum recursive calculation.",
    hint: "55.",
    level: "basic",
    codeExample: "calculateNaturalSum(10) -> 55"
  },
  {
    question: "Can negative inputs break a naive base case like `if (n == 1) return 1;`?",
    shortAnswer: "YES! If `n = -5`, `n - 1` becomes `-6, -7, ...`, bypassing `n == 1` completely and crashing with `StackOverflowError`. Always use defensive guards: `if (n <= 1) return 1;`!",
    explanation: "Defensive base case boundary design.",
    hint: "Yes, use 'if (n <= 1)' instead of 'if (n == 1)' to guard against negative inputs.",
    level: "intermediate",
    codeExample: "if (n <= 1) return 1; // Defensive base case"
  },
  {
    question: "What is the 'Call Stack' during recursive method execution?",
    shortAnswer: "The LIFO (Last-In-First-Out) runtime memory structure in the JVM where each method call pushes a new Stack Frame containing local variables and return addresses.",
    explanation: "Call stack mechanics in recursion.",
    hint: "LIFO runtime memory storing method stack frames.",
    level: "basic",
    codeExample: "// Stack pushes frames: main() -> fact(3) -> fact(2) -> fact(1)"
  },
  {
    question: "What is 'Stack Unwinding' in recursive execution?",
    shortAnswer: "The return phase where base case return values bubble back up through the chain of waiting stack frames, completing intermediate calculations and popping frames.",
    explanation: "Stack unwinding phase description.",
    hint: "The return phase where frames calculate results and pop off the stack.",
    level: "intermediate",
    codeExample: "fact(1)=1 -> fact(2)=2*1=2 -> fact(3)=3*2=6"
  },
  {
    question: "Why is an iterative loop generally more memory-efficient than a standard recursive method in Java?",
    shortAnswer: "Because iterative loops reuse a single stack frame with $O(1)$ memory, whereas recursive methods allocate $O(N)$ new stack frames on the Call Stack.",
    explanation: "Recursion vs iteration memory trade-off.",
    hint: "Iterative loops use O(1) stack memory; recursion uses O(N) stack frames.",
    level: "basic",
    codeExample: "long sum = 0; for (int i = 1; i <= n; i++) sum += i; // O(1) memory"
  },
  {
    question: "When is Recursion preferred over Iteration in software engineering?",
    shortAnswer: "When working with naturally recursive, hierarchical, or branching data structures like Trees (DOM, XML, AST), Graphs, File Directories, and Divide-and-Conquer algorithms (QuickSort, MergeSort).",
    explanation: "Ideal use cases for recursion.",
    hint: "For hierarchical structures: Trees, Graphs, Directories, and Divide-and-Conquer.",
    level: "intermediate",
    codeExample: "void traverse(TreeNode node) { if (node == null) return; traverse(node.left); }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee engine, how was `calculateCompoundFee` formulated recursively?",
    shortAnswer: "Base Case: `years <= 0` returns principal; Recursive Step: `calculateCompoundFee(principal * (1 + rate), rate, years - 1)`.",
    explanation: "Compound fee recursive design breakdown.",
    hint: "Grows principal by 1 year and recursively calls with years - 1.",
    level: "basic",
    codeExample: "calculateCompoundFee(principal * (1.0 + rate), rate, years - 1)"
  },
  {
    question: "What is the difference between recursion depth and call stack size?",
    shortAnswer: "Recursion Depth is the number of times the recursive method has called itself; Call Stack Size is the total byte memory allocated by the JVM for all active stack frames.",
    explanation: "Recursion depth vs stack size distinction.",
    hint: "Depth is number of nested calls; stack size is memory consumed by frames.",
    level: "advanced",
    codeExample: "// JVM flag -Xss controls stack size per thread (e.g. -Xss1m)"
  },
  {
    question: "What JVM command-line flag configures the thread stack size for deep recursion?",
    shortAnswer: "`-Xss` (e.g. `-Xss2m` or `-Xss4m` sets the stack size to 2MB or 4MB per thread).",
    explanation: "JVM configuration for stack limits.",
    hint: "-Xss flag sets thread stack size.",
    level: "advanced",
    codeExample: "java -Xss4m com.coderaccotax.RecursiveApp"
  },
  {
    question: "What is 'Mutual Recursion'?",
    shortAnswer: "A form of indirect recursion where two methods call each other in an alternating pattern (e.g. `isEven(n)` calls `isOdd(n - 1)`, and `isOdd(n)` calls `isEven(n - 1)`).",
    explanation: "Mutual recursion pattern.",
    hint: "Two methods calling each other alternately.",
    level: "intermediate",
    codeExample: "boolean isEven(int n) { return n == 0 ? true : isOdd(n - 1); }"
  },
  {
    question: "Can a recursive method return a `void` type?",
    shortAnswer: "YES! Many recursive traversal and printing algorithms (e.g. printing a directory tree, in-order tree traversal, Tower of Hanoi moves) have a `void` return type.",
    explanation: "Void return recursive algorithms.",
    hint: "Yes, traversal and printing algorithms often return void.",
    level: "basic",
    codeExample: "void printCountdown(int n) { if (n < 0) return; System.out.println(n); printCountdown(n-1); }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what were the 5 factorial values printed for $n = 1$ to $5$?",
    shortAnswer: "$1! = 1, 2! = 2, 3! = 6, 4! = 24, 5! = 120$.",
    explanation: "Factorial output verification.",
    hint: "1, 2, 6, 24, 120.",
    level: "basic",
    codeExample: "calculateFactorial(5) -> 120"
  },
  {
    question: "Why should `calculateFactorial(n)` use `long` rather than `int` return type in Java?",
    shortAnswer: "Because factorial grows extremely fast; `13!` overflows a 32-bit signed `int` ($2.14 \\times 10^9$), while a 64-bit `long` can hold up to `20!` ($2.43 \\times 10^{18}$).",
    explanation: "Integer overflow in combinatorial calculations.",
    hint: "int overflows at 13!; long can store up to 20!.",
    level: "basic",
    codeExample: "public static long calculateFactorial(int n) { ... }"
  },
  {
    question: "What class should be used for factorials greater than 20 in Java?",
    shortAnswer: "`java.math.BigInteger` which supports arbitrary-precision arithmetic without integer overflow.",
    explanation: "Arbitrary-precision arithmetic with BigInteger.",
    hint: "BigInteger supports factorials of any size without overflow.",
    level: "intermediate",
    codeExample: "BigInteger fact(BigInteger n) { return n.equals(BigInteger.ONE) ? BigInteger.ONE : n.multiply(fact(n.subtract(BigInteger.ONE))); }"
  },
  {
    question: "What is the ultimate takeaway of Module 001_007 Topic 12 for Java developers?",
    shortAnswer: "A recursive method calls itself to solve smaller sub-problems. It requires two parts: a well-guarded Base Case to terminate execution, and a Recursive Step that progresses monotonically towards the base case.",
    explanation: "Mastery of recursive methods foundation.",
    hint: "Recursion requires a Base Case to terminate and a Recursive Step that progresses towards it.",
    level: "basic",
    codeExample: "// Summary: Base Case (Stop) + Recursive Step (Progress)"
  },
  {
    question: "What is the next topic (Topic 13) in Module 001_007?",
    shortAnswer: "Understanding the Call Stack and Stack Frames during method invocation.",
    explanation: "Topic 13 dives deep into JVM Stack memory, frame structures, LIFO push/pop mechanics, and return addresses.",
    hint: "Understanding the Call Stack and Stack Frames during method invocation.",
    level: "basic",
    codeExample: "// Topic 13: The JVM Call Stack & Stack Frames In-Depth"
  },
  {
    question: "How does Memoization optimize repetitive recursive algorithms like Fibonacci?",
    shortAnswer: "By caching previously calculated sub-problem results in a Map or array, reducing exponential time $O(2^N)$ down to linear time $O(N)$.",
    explanation: "Dynamic programming memoization optimization.",
    hint: "Caches sub-problem results to reduce time complexity from O(2^N) to O(N).",
    level: "advanced",
    codeExample: "int fib(int n, int[] memo) { if (memo[n] != 0) return memo[n]; ... }"
  }
];

export default questions;
