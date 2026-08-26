/**
 * Module 001_007: Topic 17: Recursion vs Iteration: memory overhead, call stack limits, and performance trade-offs
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the primary memory difference between Recursion and Iteration in Java?",
    shortAnswer: "**Recursion** allocates a new Stack Frame for every recursive call, consuming $O(N)$ Call Stack memory; **Iteration** reuses a single Stack Frame, consuming $O(1)$ constant memory.",
    explanation: "Core memory architectural difference.",
    hint: "Recursion consumes O(N) stack frames; Iteration uses O(1) constant stack memory.",
    level: "basic",
    codeExample: "// Recursive: O(N) frames | Iterative: O(1) frame"
  },
  {
    question: "Why is an iterative loop generally faster than naive recursion in Java?",
    shortAnswer: "Iteration avoids the CPU overhead of method invocation (pushing/popping stack frames, updating PC registers, passing parameters, and allocating operand stacks), executing via fast CPU branch jumps.",
    explanation: "Method dispatch overhead vs CPU loop branch.",
    hint: "Avoids method call overhead (frame push/pop, parameter copying).",
    level: "basic",
    codeExample: "for (int i = 0; i < n; i++) // Fast CPU register increment"
  },
  {
    question: "What is the risk of using Recursion for large linear datasets ($N > 10,000$)?",
    shortAnswer: "High probability of throwing `java.lang.StackOverflowError` when recursion depth exceeds the configured thread stack limit (`-Xss`).",
    explanation: "Recursion depth stack overflow vulnerability.",
    hint: "Risk of StackOverflowError when stack frames exceed thread limits.",
    level: "basic",
    codeExample: "recursiveFeeSum(massiveArray, 0); // Throws StackOverflowError if array > 10,000"
  },
  {
    question: "In the Coder & AccoTax Barrackpore benchmark, what was the total batch fee computed?",
    shortAnswer: "₹141,000.00 across the 8 campus tuition batches in Indian Rupees (₹).",
    explanation: "Batch fee array summation output.",
    hint: "₹141,000.00.",
    level: "basic",
    codeExample: "iterativeFeeSum(tuitionLedger) -> ₹141,000.00"
  },
  {
    question: "When is Recursion significantly better and preferred over Iteration?",
    shortAnswer: "When solving problems with naturally recursive, branching, or hierarchical structures: **Trees** (DOM, Binary Search Trees), **Graphs** (DFS), **Abstract Syntax Trees (AST)**, **Divide-and-Conquer** (MergeSort), and **Backtracking**.",
    explanation: "Ideal domains for recursion.",
    hint: "Hierarchical data: Trees, Graphs, ASTs, Divide-and-Conquer, Backtracking.",
    level: "basic",
    codeExample: "void traverseTree(TreeNode node) { if (node == null) return; traverseTree(node.left); }"
  },
  {
    question: "When is Iteration preferred over Recursion in production systems?",
    shortAnswer: "For flat linear data structures (arrays, lists), numerical sequences, high-throughput microservices, and performance-critical loops with large or unbounded counts.",
    explanation: "Ideal domains for iteration.",
    hint: "Linear sequences, arrays, loops, and unbounded iterations.",
    level: "basic",
    codeExample: "for (int i = 0; i < list.size(); i++) { ... }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore benchmark, how did Iterative Fibonacci compare to Naive Recursive Fibonacci for $N = 35$?",
    shortAnswer: "Iterative Fibonacci executed in **microseconds** ($O(N)$ time) while Naive Recursive Fibonacci took **hundreds of milliseconds** ($O(2^N)$ time) due to redundant tree evaluations.",
    explanation: "Fibonacci benchmark comparison analysis.",
    hint: "Iterative runs in microseconds (O(N)); naive recursion takes hundreds of milliseconds (O(2^N)).",
    level: "basic",
    codeExample: "iterativeFibonacci(35) vs naiveRecursiveFibonacci(35)"
  },
  {
    question: "Can every Recursive algorithm be converted into an Iterative algorithm in Java?",
    shortAnswer: "YES! (Church-Turing Thesis & Böhm-Jacopini Theorem). Any recursive algorithm can be converted into an iterative loop using an explicit Stack data structure on the Heap if needed.",
    explanation: "Theoretical equivalence of recursion and iteration.",
    hint: "Yes, every recursive algorithm can be simulated iteratively with an explicit stack.",
    level: "intermediate",
    codeExample: "Deque<Frame> stack = new ArrayDeque<>(); // Simulates call stack on Heap"
  },
  {
    question: "What is 'Heap Stack Simulation' for deep tree traversals?",
    shortAnswer: "Using a `java.util.ArrayDeque` on the Heap instead of relying on the JVM Call Stack, allowing traversal of trees with millions of nodes without `StackOverflowError` because Heap memory is gigabytes large compared to the 1MB Call Stack.",
    explanation: "Heap stack simulation architecture.",
    hint: "Uses ArrayDeque on Heap to bypass 1MB Call Stack limits.",
    level: "intermediate",
    codeExample: "ArrayDeque<Node> stack = new ArrayDeque<>(); stack.push(root);"
  },
  {
    question: "What is 'Tail Call Optimization' (TCO) and does standard Oracle HotSpot JVM support it?",
    shortAnswer: "TCO reuses the current stack frame for the final call in tail recursion; **HotSpot JVM does NOT currently support TCO** for security and stack-trace preservation reasons.",
    explanation: "HotSpot TCO support status.",
    hint: "HotSpot does NOT support TCO in standard Java bytecode.",
    level: "advanced",
    codeExample: "// Scala and Kotlin support TCO via compiler transformations; HotSpot does not"
  },
  {
    question: "What is the Time and Space Complexity comparison for Iterative Factorial vs Recursive Factorial?",
    shortAnswer: "Both have $O(N)$ Time Complexity; Iterative Factorial uses $O(1)$ Space, whereas Recursive Factorial uses $O(N)$ Stack Space.",
    explanation: "Factorial complexity comparison.",
    hint: "Both O(N) time; Iterative uses O(1) space, Recursive uses O(N) stack space.",
    level: "basic",
    codeExample: "Iterative: O(N) Time, O(1) Space | Recursive: O(N) Time, O(N) Space"
  },
  {
    question: "In the Coder & AccoTax Barrackpore benchmark, what was $20!$ computed as?",
    shortAnswer: "$20! = 2,432,902,008,176,640,000$ (the maximum factorial that fits in a signed 64-bit `long`).",
    explanation: "Factorial 20 value verification.",
    hint: "2,432,902,008,176,640,000.",
    level: "basic",
    codeExample: "iterativeFactorial(20) -> 2432902008176640000L"
  },
  {
    question: "How does JIT Method Inlining help small recursive functions?",
    shortAnswer: "The HotSpot C2 JIT compiler can inline small recursive calls up to a shallow depth (e.g. 2-3 levels), replacing method calls with unrolled linear machine code.",
    explanation: "JIT inlining optimization on recursion.",
    hint: "JIT compiler inlines shallow recursion levels into unrolled machine code.",
    level: "advanced",
    codeExample: "// -XX:MaxInlineLevel controls JIT method inlining depth"
  },
  {
    question: "Why do functional programming languages (Haskell, Lisp) favor Recursion while Java traditionally favors Iteration?",
    shortAnswer: "Functional languages rely on immutability and lack mutable loop counters (relying on compiler-guaranteed TCO), while Java embraces mutable variables and fast CPU register loops in an imperative object-oriented paradigm.",
    explanation: "Language design philosophy comparison.",
    hint: "Functional languages rely on immutability + TCO; Java uses mutable variables and fast loops.",
    level: "intermediate",
    codeExample: "// Java loops mutate loop variables: for (int i = 0; ...)"
  },
  {
    question: "What is 'Code Maintainability' trade-off between Recursion and Iteration for complex tree algorithms?",
    shortAnswer: "Recursive tree traversals take 4-5 lines of clean, self-documenting code; iterative tree traversals with manual stack state require 30-50 lines of complex pointer management prone to edge-case bugs.",
    explanation: "Readability vs complexity trade-off.",
    hint: "Recursion is 5 lines of elegant code; iterative equivalent requires 40+ lines of stack tracking.",
    level: "intermediate",
    codeExample: "void postOrder(Node n) { if (n==null) return; postOrder(n.left); postOrder(n.right); print(n); }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee ledger, how did `recursiveFeeSum` progress across the array?",
    shortAnswer: "By passing `index + 1` at each recursive step until hitting the base case `index >= fees.length` in Indian Rupees (₹).",
    explanation: "Recursive array traversal mechanism.",
    hint: "Passed index + 1 until index >= fees.length.",
    level: "basic",
    codeExample: "return fees[index] + recursiveFeeSum(fees, index + 1);"
  },
  {
    question: "What is the Garbage Collection impact difference between Recursion and Iteration?",
    shortAnswer: "Neither allocates Heap objects if operating on primitives/existing arrays; however, recursive methods that instantiate helper objects or wrappers at each call level generate massive GC pressure.",
    explanation: "Garbage collection impact analysis.",
    hint: "Pure recursion creates no GC pressure, but helper object creation inside calls stresses the GC.",
    level: "intermediate",
    codeExample: "// Avoid creating 'new Helper()' inside recursive method calls"
  },
  {
    question: "What is 'Divide-and-Conquer' and why is it inherently recursive?",
    shortAnswer: "A paradigm that divides a problem into independent sub-problems (Divide), solves them recursively (Conquer), and merges their solutions (Combine) (e.g. MergeSort, QuickSort).",
    explanation: "Divide-and-conquer recursive structure.",
    hint: "Divide into sub-problems, solve recursively, and combine results.",
    level: "basic",
    codeExample: "sort(left); sort(right); merge(left, right);"
  },
  {
    question: "How does the Java 8 Stream API bridge Recursion and Iteration?",
    shortAnswer: "Streams provide a declarative functional style while executing internally as optimized imperative iterative loops.",
    explanation: "Streams functional-to-imperative bridge.",
    hint: "Declarative functional API executed internally as fast iterative loops.",
    level: "intermediate",
    codeExample: "Arrays.stream(fees).sum(); // Declarative syntax, iterative execution"
  },
  {
    question: "In the Coder & AccoTax Barrackpore benchmark, how did `iterativeFibonacci` compute without arrays?",
    shortAnswer: "Using two rolling variables `a` and `b` (`temp = a + b; a = b; b = temp;`), achieving $O(N)$ Time and $O(1)$ Space in Indian Rupees (₹).",
    explanation: "Rolling variables iterative Fibonacci technique.",
    hint: "Used 2 rolling variables a and b with zero array allocation.",
    level: "basic",
    codeExample: "long temp = a + b; a = b; b = temp;"
  },
  {
    question: "What is 'Recursion Unrolling'?",
    shortAnswer: "A compiler optimization where multiple recursive steps are expanded into a sequence of linear statements, reducing method invocation overhead.",
    explanation: "Recursion unrolling optimization.",
    hint: "Expands recursive steps into linear sequential code to reduce calls.",
    level: "advanced",
    codeExample: "// fact(4) expanded directly as 4 * 3 * 2 * 1 by compiler"
  },
  {
    question: "What is the impact of Java 21 Virtual Threads on Recursion?",
    shortAnswer: "Virtual Threads store stack frames on the Heap when unmounted, making thousands of concurrent recursive tasks much lighter on operating system thread memory.",
    explanation: "Virtual thread heap stack impact.",
    hint: "Stores stack frames on Heap, allowing millions of concurrent lightweight tasks.",
    level: "advanced",
    codeExample: "Thread.startVirtualThread(() -> recursiveFactorial(100));"
  },
  {
    question: "Why is `StackOverflowError` impossible in a standard `for` loop with a terminating condition?",
    shortAnswer: "Because a `for` loop reuses the exact same stack frame and local variable slots; no new stack frames are pushed regardless of loop iteration count.",
    explanation: "Zero stack growth in iterative loops.",
    hint: "No new stack frames are pushed; loop reuses the single active frame.",
    level: "basic",
    codeExample: "for (int i = 0; i < 1_000_000_000; i++) { ... } // Zero stack growth"
  },
  {
    question: "In the Coder & AccoTax Barrackpore benchmark, what was the value of $fib(35)$?",
    shortAnswer: "$fib(35) = 9,227,465$.",
    explanation: "Fibonacci 35 value verification.",
    hint: "9,227,465.",
    level: "basic",
    codeExample: "iterativeFibonacci(35) -> 9227465"
  },
  {
    question: "What is the recommended rule of thumb for choosing between Recursion and Iteration in Enterprise Java?",
    shortAnswer: "**Default to Iteration for linear operations** to ensure high performance and safety; **use Recursion for non-linear structures (Trees, Graphs, Backtracking)** where recursive clarity outweighs stack overhead.",
    explanation: "Enterprise architecture rule of thumb.",
    hint: "Default to Iteration for linear sequences; use Recursion for Trees, Graphs, and Backtracking.",
    level: "basic",
    codeExample: "// Rule of Thumb: Linear -> Loop | Hierarchical -> Recursion"
  },
  {
    question: "Can a `while(true)` loop cause `OutOfMemoryError` or `StackOverflowError` on its own?",
    shortAnswer: "An empty `while(true) {}` loop causes 100% CPU utilization but NEVER causes `StackOverflowError` or `OutOfMemoryError` because it allocates zero stack frames and zero heap objects.",
    explanation: "Infinite loop memory profile.",
    hint: "Consumes 100% CPU but consumes zero memory (no stack or heap growth).",
    level: "intermediate",
    codeExample: "while (true) {} // Infinite CPU spin, zero memory allocation"
  },
  {
    question: "What was the final message from Educator Sukanta Hui for Module 001_007?",
    shortAnswer: "Congratulations to Swadeep, Tuhina, Abhronila, and Debangshu for mastering all 18 topics of Methods, Parameters, and Recursion Foundations!",
    explanation: "Module completion milestone.",
    hint: "Congratulations on mastering all 18 topics of Module 001_007!",
    level: "basic",
    codeExample: "// Module 001_007: 100% Complete!"
  },
  {
    question: "What is the ultimate takeaway of Module 001_007 Topic 17 for Java developers?",
    shortAnswer: "Recursion provides declarative mathematical elegance for hierarchical branching data structures (Trees, Graphs) at the cost of $O(N)$ stack frames. Iteration provides $O(1)$ memory safety and maximum speed for linear sequences.",
    explanation: "Mastery of recursion vs iteration trade-offs.",
    hint: "Recursion for trees/graphs/branching ($O(N)$ stack); Iteration for linear sequences ($O(1)$ stack).",
    level: "basic",
    codeExample: "// Master Formula: Linear = Iteration (O(1)) | Branching = Recursion (O(N))"
  },
  {
    question: "What is the next major module in the Java Core Roadmap following Module 001_007?",
    shortAnswer: "**Module 001_008: Object-Oriented Programming (OOP) Foundations: Classes, Objects, State & Encapsulation**.",
    explanation: "Roadmap progression to Module 001_008.",
    hint: "Module 001_008: OOP Foundations: Classes, Objects, State & Encapsulation.",
    level: "basic",
    codeExample: "// Next: Module 001_008 OOP Foundations"
  },
  {
    question: "How does Java's JIT Compiler vectorize simple iterative loops (SIMD)?",
    shortAnswer: "The HotSpot C2 compiler uses Auto-Vectorization (Superword Level Parallelism) to pack multiple array iterations into 128-bit/256-bit AVX CPU registers, executing 4 to 8 additions in a single CPU cycle.",
    explanation: "SIMD auto-vectorization in HotSpot loops.",
    hint: "Uses AVX/SIMD CPU registers to process multiple loop elements in a single cycle.",
    level: "advanced",
    codeExample: "// -XX:+UseSuperWord enables SIMD auto-vectorization for iterative loops"
  }
];

export default questions;
