const questions = [
  {
    question: "What is Recursion in C programming?",
    shortAnswer: "A programming technique where a function solves a computational problem by calling itself directly or indirectly on a smaller subproblem until reaching a terminating base condition.",
    explanation: "Consists of two mandatory components: The Base Condition (halting rule) and the Recursive Step (self-invocation with smaller input).",
    hint: "Function calling itself on smaller subproblems.",
    level: "basic"
  },
  {
    question: "What is the Base Condition (Base Case) and why is it mandatory?",
    shortAnswer: "The stopping condition that returns a known, trivial result without making further recursive calls. Without a base condition, the function calls itself indefinitely until the stack memory exhausts, causing a Stack Overflow crash.",
    explanation: "Always write and test the base case first.",
    hint: "Halting condition preventing stack overflow.",
    level: "basic",
    codeExample: "int fact(int n) {\n    if (n <= 1) return 1; // BASE CASE\n    return n * fact(n - 1); // RECURSIVE STEP\n}"
  },
  {
    question: "What is a Stack Overflow in C recursion?",
    shortAnswer: "A fatal runtime crash (`SIGSEGV`) occurring when too many recursive stack frames are pushed onto the Call Stack, exceeding the maximum memory allocated for the stack by the operating system.",
    explanation: "Caused by missing base cases, wrong decrement logic (e.g. `fact(n+1)`), or excessively deep recursion depth.",
    hint: "Exhaustion of stack memory by excessive recursive calls.",
    level: "basic"
  },
  {
    question: "What are the two phases of recursive execution?",
    shortAnswer: "1. The Winding (Expansion) Phase: Each call pushes a new stack frame, postponing calculations until reaching the base case.\n2. The Unwinding (Resolution) Phase: Returns propagate upward, calculating deferred expressions and popping stack frames.",
    explanation: "Memory grows during winding and contracts during unwinding.",
    hint: "Winding (stack expansion) and Unwinding (stack resolution).",
    level: "intermediate"
  },
  {
    question: "What is Tail Recursion?",
    shortAnswer: "A special form of recursion where the recursive call is the ABSOLUTE LAST operation executed in the function, with no pending calculations left to perform after returning.",
    explanation: "Allows compilers with Tail Call Optimization (TCO) to reuse the current stack frame, reducing space complexity from $O(N)$ to $O(1)$.",
    hint: "Recursive call is final operation; eligible for stack optimization.",
    level: "intermediate",
    codeExample: "int factTail(int n, int acc) {\n    if (n <= 1) return acc;\n    return factTail(n - 1, n * acc); // Pure tail call\n}"
  },
  {
    question: "What is Non-Tail (Head / Embedded) Recursion?",
    shortAnswer: "Recursion where operations remain to be performed after the recursive call returns (e.g. `return n * fact(n - 1)` has a pending multiplication).",
    explanation: "Requires maintaining all parent stack frames on the call stack until child calls return.",
    hint: "Pending operations exist after recursive return.",
    level: "intermediate"
  },
  {
    question: "What is the Russian Matryoshka Nesting Dolls Analogy for Recursion?",
    shortAnswer: "Opening a big doll reveals a smaller identical doll inside. You keep opening smaller dolls until you hit the solid baby doll (the Base Case!), and then you close them all back up one-by-one (the Unwinding phase).",
    explanation: "Sukanta Hui's visual classroom metaphor.",
    hint: "Nesting dolls opened until solid base doll is reached.",
    level: "basic"
  },
  {
    question: "What is Direct Recursion vs Indirect (Mutual) Recursion?",
    shortAnswer: "- Direct Recursion: Function `A()` calls `A()` directly.\n- Indirect Recursion: Function `A()` calls `B()`, and `B()` calls `A()` in a cycle.",
    explanation: "Indirect recursion requires forward declarations (prototypes) for compilation.",
    hint: "Calling itself vs calling through another function cycle.",
    level: "intermediate"
  },
  {
    question: "What is the Time and Space Complexity of recursive Factorial?",
    shortAnswer: "- Time Complexity: $\\mathcal{O}(N)$ (executes $N$ recursive calls).\n- Space Complexity: $\\mathcal{O}(N)$ auxiliary stack memory (maintains $N$ concurrent stack frames).",
    explanation: "An iterative loop uses $\\mathcal{O}(N)$ time and only $\\mathcal{O}(1)$ space.",
    hint: "O(N) time and O(N) stack space.",
    level: "intermediate"
  },
  {
    question: "Why is standard naive recursive Fibonacci `fib(n) = fib(n-1) + fib(n-2)` inefficient?",
    shortAnswer: "Because it has an exponential Time Complexity of $\\mathcal{O}(2^N)$, repeatedly re-calculating the exact same subproblems thousands of times in a branching tree.",
    explanation: "For example, `fib(5)` calculates `fib(3)` multiple times independently.",
    hint: "Exponential O(2^N) time due to overlapping redundant subproblems.",
    level: "intermediate"
  },
  {
    question: "What is the Tower of Hanoi problem and how is it solved recursively?",
    shortAnswer: "A mathematical game of moving $N$ disks from peg A to peg C using peg B, subject to rules (move 1 disk at a time; never place larger disk on smaller). Solved in $2^N - 1$ steps by moving $N-1$ disks to B, moving disk $N$ to C, and moving $N-1$ disks from B to C.",
    explanation: "The quintessential demonstration of divide-and-conquer recursion.",
    hint: "2^N - 1 moves via 3-step divide and conquer.",
    level: "intermediate"
  },
  {
    question: "How do you calculate the Greatest Common Divisor (GCD) using Euclidean recursion?",
    shortAnswer: "`int gcd(int a, int b) { return (b == 0) ? a : gcd(b, a % b); }`",
    explanation: "Reaches base case in $\\mathcal{O}(\\log(\\min(a, b)))$ steps; pure tail recursion.",
    hint: "gcd(b, a % b) with base case b == 0.",
    level: "basic",
    codeExample: "int gcd(int a, int b) {\n    if (b == 0) return a;\n    return gcd(b, a % b);\n}"
  },
  {
    question: "What is Recursion Tree Visualization?",
    shortAnswer: "A tree diagram where each node represents a function call frame and child nodes represent sub-calls, visualizing branching factors and total computational work.",
    explanation: "Helps analyze time complexity and call patterns.",
    hint: "Hierarchical tree diagram of call invocations.",
    level: "intermediate"
  },
  {
    question: "When should you choose Recursion over Iteration in C?",
    shortAnswer: "When solving problems with natural recursive structure (e.g. Tree traversals, Graph DFS, QuickSort/MergeSort, Backtracking mazes, Tower of Hanoi) where an iterative solution requires complex manual stack management.",
    explanation: "For simple linear counting/summing, iteration is faster and uses less memory.",
    hint: "Trees, graphs, divide-and-conquer algorithms, and backtracking.",
    level: "intermediate"
  },
  {
    question: "What is Tail Call Optimization (TCO)?",
    shortAnswer: "A compiler optimization (enabled in GCC via `-O2`) where the compiler replaces the tail recursive call with a jump instruction (like a `while` loop), reusing the existing stack frame and eliminating stack overflow risks.",
    explanation: "Transforms $O(N)$ stack memory into $O(1)$ stack memory.",
    hint: "Compiler transforms tail call into jump loop.",
    level: "advanced"
  },
  {
    question: "How do you reverse a string recursively in C?",
    shortAnswer: "Base case: when pointers cross; recursive step: swap outermost characters `left` and `right`, and recurse on `(left + 1, right - 1)`.",
    explanation: "Two-pointer recursive in-place string reversal.",
    hint: "Swap boundary chars and recurse on inner substring.",
    level: "intermediate",
    codeExample: "void reverseStr(char *str, int l, int r) {\n    if (l >= r) return;\n    char t = str[l]; str[l] = str[r]; str[r] = t;\n    reverseStr(str, l + 1, r - 1);\n}"
  },
  {
    question: "What is Tree Recursion vs Linear Recursion?",
    shortAnswer: "- Linear Recursion: Makes at most ONE recursive call per invocation (e.g. Factorial, Linear Search).\n- Tree Recursion: Makes TWO or more recursive calls per invocation (e.g. Fibonacci, Divide and Conquer).",
    explanation: "Tree recursion creates exponential branching call stacks.",
    hint: "Single call path vs multiple branching call paths.",
    level: "intermediate"
  },
  {
    question: "What is Nested Recursion (e.g. Ackermann Function)?",
    shortAnswer: "A recursive function that passes a recursive call as an argument to another recursive call (e.g. `ackermann(m - 1, ackermann(m, n - 1))`).",
    explanation: "Grows at an extraordinarily rapid rate.",
    hint: "Recursive call passed as parameter to another recursive call.",
    level: "advanced"
  },
  {
    question: "How do you calculate the power $X^N$ in $\\mathcal{O}(\\log N)$ time using recursion?",
    shortAnswer: "If $N$ is even: $(X^{N/2})^2$; if $N$ is odd: $X \\times (X^{(N-1)/2})^2$; base case: $X^0 = 1$.",
    explanation: "Binary Exponentiation algorithm halves the exponent at each recursive step.",
    hint: "Halve exponent at each step: power(x, n/2).",
    level: "intermediate",
    codeExample: "double fastPower(double x, int n) {\n    if (n == 0) return 1.0;\n    double half = fastPower(x, n / 2);\n    if (n % 2 == 0) return half * half;\n    return x * half * half;\n}"
  },
  {
    question: "How can you debug a runaway recursive function in GDB?",
    shortAnswer: "Use `backtrace` (or `bt`) to view the entire call stack history and inspect frame numbers, arguments, and depth.",
    explanation: "`bt -10` shows the last 10 stack frames before a crash.",
    hint: "Use 'backtrace' or 'bt' in GDB.",
    level: "intermediate"
  },
  {
    question: "What is the danger of using recursion on embedded microcontrollers (e.g. ARM Cortex-M, PIC, AVR)?",
    shortAnswer: "Embedded microcontrollers have severely constrained RAM (often only a few kilobytes); uncontrolled recursion quickly overflows the small hardware stack into global variables or registers, causing catastrophic hardware crashes.",
    explanation: "Many safety-critical standards (like MISRA C) ban or heavily restrict recursion in automotive/aerospace firmware.",
    hint: "Constrained RAM causes hardware stack overflow.",
    level: "advanced"
  },
  {
    question: "How do you print numbers from 1 to N using recursion WITHOUT loops?",
    shortAnswer: "Base case: `if (n == 0) return;`; recurse `print1ToN(n - 1);` first, and then `printf(\"%d \", n);` during the unwinding phase!",
    explanation: "Reversing the statement order prints numbers in ascending order.",
    hint: "Recurse first, print during unwinding phase.",
    level: "basic",
    codeExample: "void print1ToN(int n) {\n    if (n == 0) return;\n    print1ToN(n - 1); // Recurse first\n    printf(\"%d \", n); // Print on unwinding\n}"
  },
  {
    question: "How do you print numbers from N down to 1 using recursion?",
    shortAnswer: "Print `printf(\"%d \", n);` first, and then recurse `printNTo1(n - 1);` during the winding phase.",
    explanation: "Printing before the recursive call prints in descending order.",
    hint: "Print first, then recurse.",
    level: "basic"
  },
  {
    question: "What is an Accumulator in tail recursive programming?",
    shortAnswer: "An auxiliary parameter that carries the running intermediate result across successive recursive calls, eliminating the need to perform deferred calculations during unwinding.",
    explanation: "Enables converting non-tail recursion into tail recursion.",
    hint: "Parameter carrying running intermediate result.",
    level: "intermediate"
  },
  {
    question: "What is Sukanta Hui's golden advice for mastering recursion in C?",
    shortAnswer: "Always write the Base Case first, trust the recursive leap of faith on smaller subproblems, and never try to manually trace more than 3 stack levels in your head—draw the tree on paper!",
    explanation: "Visualizing the base case and unwinding phase prevents bugs.",
    hint: "Write base case first, draw stack tree on paper.",
    level: "basic"
  }
];

export default questions;
