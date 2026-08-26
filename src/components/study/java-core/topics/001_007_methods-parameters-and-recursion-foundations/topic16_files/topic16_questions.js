/**
 * Module 001_007: Topic 16: Classic recursive algorithms: Factorial, Fibonacci, Sum of Digits, Power calculation, Tower of Hanoi
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What are the 5 classic prototype recursive algorithms in computer science?",
    shortAnswer: "1. **Factorial** ($n!$), 2. **Fibonacci Series** ($fib(n)$), 3. **Sum of Digits**, 4. **Fast Exponentiation (Binary Power)** ($x^n$), and 5. **Tower of Hanoi**.",
    explanation: "The 5 canonical recursive algorithms.",
    hint: "Factorial, Fibonacci, Sum of Digits, Fast Power, and Tower of Hanoi.",
    level: "basic",
    codeExample: "// The quintessential recursive algorithm portfolio"
  },
  {
    question: "What is the recurrence relation and base case for Factorial ($n!$)?",
    shortAnswer: "Recurrence: $n! = n \\times (n - 1)!$; Base Case: $0! = 1$ and $1! = 1$. Time Complexity: $O(N)$.",
    explanation: "Factorial mathematical definition.",
    hint: "n! = n * (n - 1)! with base case 0! = 1.",
    level: "basic",
    codeExample: "long fact(int n) { return n <= 1 ? 1 : n * fact(n - 1); }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was $6!$ computed as?",
    shortAnswer: "$6! = 720$.",
    explanation: "Factorial calculation verification.",
    hint: "720.",
    level: "basic",
    codeExample: "factorial(6) -> 720"
  },
  {
    question: "What is the recurrence relation and base cases for the Fibonacci sequence?",
    shortAnswer: "Recurrence: $fib(n) = fib(n - 1) + fib(n - 2)$; Base Cases: $fib(0) = 0, fib(1) = 1$.",
    explanation: "Fibonacci recurrence relation.",
    hint: "fib(n) = fib(n-1) + fib(n-2) with base cases fib(0)=0 and fib(1)=1.",
    level: "basic",
    codeExample: "if (n <= 0) return 0; if (n == 1) return 1; return fib(n-1) + fib(n-2);"
  },
  {
    question: "How does Memoization transform Fibonacci time complexity?",
    shortAnswer: "It reduces time complexity from exponential $O(2^N)$ down to linear $O(N)$ by caching previously computed values in an array/map.",
    explanation: "Memoization complexity transformation.",
    hint: "Reduces O(2^N) to O(N) by caching sub-problem results.",
    level: "basic",
    codeExample: "if (memo[n] != 0) return memo[n]; memo[n] = fib(n-1) + fib(n-2);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was $fib(40)$ computed as via memoization?",
    shortAnswer: "$fib(40) = 102,334,155$ computed instantaneously in $O(N)$ operations.",
    explanation: "Memoized Fibonacci calculation verification.",
    hint: "102,334,155.",
    level: "basic",
    codeExample: "fibonacciMemo(40, memo) -> 102,334,155"
  },
  {
    question: "What is the recursive recurrence relation for Sum of Digits of an integer $N$?",
    shortAnswer: "$sum(N) = (N \\% 10) + sum(N / 10)$; Base Case: $N == 0 \\to 0$. Time Complexity: $O(\\log_{10} N)$.",
    explanation: "Sum of digits decimal decomposition.",
    hint: "(N % 10) extracts last digit; (N / 10) removes last digit.",
    level: "basic",
    codeExample: "int sumOfDigits(int n) { return n == 0 ? 0 : (n % 10) + sumOfDigits(n / 10); }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the sum of digits for roll number `98452`?",
    shortAnswer: "$9 + 8 + 4 + 5 + 2 = 28$.",
    explanation: "Sum of digits output verification.",
    hint: "28.",
    level: "basic",
    codeExample: "sumOfDigits(98452) -> 28"
  },
  {
    question: "How does Fast Exponentiation (Binary Power) achieve $O(\\log N)$ time complexity?",
    shortAnswer: "By Divide-and-Conquer: $x^n = (x^{n/2})^2$ for even powers, and $x \\times (x^{n/2})^2$ for odd powers, cutting the problem size in half at each step.",
    explanation: "Binary power algorithmic mechanics.",
    hint: "Squares half-powers to cut exponent in half at each step (O(log N)).",
    level: "intermediate",
    codeExample: "double half = fastPower(x, n / 2); return (n % 2 == 0) ? half * half : x * half * half;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was $2.0^{10}$ computed as via `fastPower`?",
    shortAnswer: "$2^{10} = 1024.00$ computed in $\\approx 4$ recursive steps.",
    explanation: "Fast power calculation verification.",
    hint: "1024.00.",
    level: "basic",
    codeExample: "fastPower(2.0, 10) -> 1024.00"
  },
  {
    question: "How does `fastPower` safely handle negative exponents (e.g. $2^{-3}$)?",
    shortAnswer: "Using the mathematical reciprocal identity: $x^{-n} = \\frac{1}{x^n}$ (`return 1.0 / fastPower(base, -exp);`).",
    explanation: "Negative exponent handling in power algorithms.",
    hint: "Takes reciprocal: 1.0 / fastPower(base, -exp).",
    level: "intermediate",
    codeExample: "if (exp < 0) return 1.0 / fastPower(base, -exp);"
  },
  {
    question: "What is the Tower of Hanoi puzzle?",
    shortAnswer: "A classic puzzle with 3 pegs (Source, Helper, Destination) and $N$ disks of different sizes, where only 1 disk can be moved at a time and no disk may be placed on top of a smaller disk.",
    explanation: "Tower of Hanoi rules and formulation.",
    hint: "3 pegs with N disks moving from Source to Destination without placing larger on smaller.",
    level: "basic",
    codeExample: "// Move N disks from A to C using B"
  },
  {
    question: "What are the 3 recursive steps to solve Tower of Hanoi for $N$ disks?",
    shortAnswer: "1. Move top $(N-1)$ disks from Source to Helper using Destination as aux. 2. Move disk $N$ directly from Source to Destination. 3. Move $(N-1)$ disks from Helper to Destination using Source as aux.",
    explanation: "The 3 core inductive steps of Tower of Hanoi.",
    hint: "Move N-1 to Helper -> Move disk N to Dest -> Move N-1 from Helper to Dest.",
    level: "basic",
    codeExample: "hanoi(n-1, S, D, H); move(n, S, D); hanoi(n-1, H, S, D);"
  },
  {
    question: "What is the formula for the minimum number of moves required to solve Tower of Hanoi for $N$ disks?",
    shortAnswer: "$M(N) = 2^N - 1$.",
    explanation: "Tower of Hanoi minimum move formula.",
    hint: "2^N - 1 moves.",
    level: "basic",
    codeExample: "// For N = 3: 2^3 - 1 = 7 moves; For N = 64: 2^64 - 1 moves"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, how many moves were required for 3 disks in Tower of Hanoi?",
    shortAnswer: "$2^3 - 1 = 7$ moves from Peg A to Peg C.",
    explanation: "3-disk Hanoi move count verification.",
    hint: "7 moves.",
    level: "basic",
    codeExample: "solveTowerOfHanoi(3, 'A', 'B', 'C'); // 7 moves"
  },
  {
    question: "What is the Time Complexity of Tower of Hanoi?",
    shortAnswer: "$O(2^N)$ Exponential Time, because each $N$ requires doubling the moves of $N - 1$ plus 1 ($T(N) = 2T(N - 1) + 1$).",
    explanation: "Tower of Hanoi time complexity analysis.",
    hint: "O(2^N) exponential time.",
    level: "basic",
    codeExample: "// T(N) = 2*T(N-1) + 1 -> O(2^N)"
  },
  {
    question: "What is the Space Complexity of Tower of Hanoi on the Call Stack?",
    shortAnswer: "$O(N)$ Linear Stack Space, because the maximum recursion depth at any time equals the number of disks $N$.",
    explanation: "Tower of Hanoi stack space complexity.",
    hint: "O(N) stack memory proportional to number of disks.",
    level: "intermediate",
    codeExample: "// Call stack depth never exceeds N frames"
  },
  {
    question: "How long would it take to solve Tower of Hanoi for 64 disks at 1 move per second?",
    shortAnswer: "$2^{64} - 1 \\approx 1.84 \\times 10^{19}$ seconds $\\approx 584$ billion years (longer than the age of the universe)!",
    explanation: "Ancient legend of Brahma and exponential growth.",
    hint: "Over 584 billion years.",
    level: "basic",
    codeExample: "// 2^64 - 1 moves = ~584 billion years"
  },
  {
    question: "What is the base case for Tower of Hanoi?",
    shortAnswer: "$N = 1$: Directly move Disk 1 from Source to Destination in 1 step without auxiliary peg help.",
    explanation: "Tower of Hanoi base case.",
    hint: "N = 1 moves directly from Source to Destination.",
    level: "basic",
    codeExample: "if (n == 1) { System.out.println(source + \" -> \" + destination); return; }"
  },
  {
    question: "Can `sumOfDigits` handle negative numbers properly?",
    shortAnswer: "YES! By applying `n = Math.abs(n);` before recursion, negative signs are stripped cleanly.",
    explanation: "Defensive handling of negative numbers in digit sums.",
    hint: "Use Math.abs(n) before recursion.",
    level: "basic",
    codeExample: "int sumOfDigits(int n) { n = Math.abs(n); ... }"
  },
  {
    question: "What happens if you calculate $0^0$ in `fastPower(0, 0)`?",
    shortAnswer: "Returns `1.0` (standard mathematical convention for discrete algebra and computer systems where $x^0 = 1$).",
    explanation: "Zero to the zeroth power convention.",
    hint: "Returns 1.0 (if exp == 0 return 1.0).",
    level: "intermediate",
    codeExample: "if (exp == 0) return 1.0;"
  },
  {
    question: "Why does naive power calculation ($x \\times x^{n-1}$) take $O(N)$ time?",
    shortAnswer: "Because it decrements the exponent by 1 at each step, executing $N$ linear recursive method calls.",
    explanation: "Naive linear power vs binary logarithmic power.",
    hint: "Decrements exponent by 1 at each step, taking N steps.",
    level: "basic",
    codeExample: "// Naive: double pow(x, n) { return n == 0 ? 1 : x * pow(x, n - 1); }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the first move in 3-disk Tower of Hanoi?",
    shortAnswer: "Move 1: Transfer Disk 1 from Peg A -> Peg C.",
    explanation: "Hanoi initial move verification.",
    hint: "Disk 1 from Peg A to Peg C.",
    level: "basic",
    codeExample: "Move 1: Transfer Disk 1 from Peg A -> Peg C"
  },
  {
    question: "What is the Binary Number representation pattern in Tower of Hanoi moves?",
    shortAnswer: "At step $K$, the disk to be moved corresponds to the position of the least significant set bit in the binary representation of $K$ (e.g. step 1: disk 1, step 2: disk 2, step 4: disk 3).",
    explanation: "Binary bit manipulation isomorphism in Tower of Hanoi.",
    hint: "Disk moved at step K corresponds to the lowest set bit in binary K.",
    level: "advanced",
    codeExample: "// Integer.numberOfTrailingZeros(k) + 1 identifies disk to move at step k"
  },
  {
    question: "Can Tower of Hanoi be solved iteratively?",
    shortAnswer: "YES! Using the binary Gray code algorithm or an explicit stack simulation without recursive function calls.",
    explanation: "Iterative Tower of Hanoi solution.",
    hint: "Yes, using binary bitwise operations or explicit stacks.",
    level: "advanced",
    codeExample: "// Gray code iterative Hanoi algorithm"
  },
  {
    question: "What is the relationship between Fibonacci and the Golden Ratio ($\\phi \\approx 1.618$)?",
    shortAnswer: "As $N \\to \\infty$, the ratio of consecutive Fibonacci numbers $\\frac{fib(N+1)}{fib(N)} \\to \\phi = \\frac{1 + \\sqrt{5}}{2}$ (Binet's Formula).",
    explanation: "Golden ratio connection to Fibonacci.",
    hint: "The ratio of consecutive Fibonacci numbers converges to 1.618 (Golden Ratio).",
    level: "intermediate",
    codeExample: "// Binet's formula: fib(n) = (phi^n - psi^n) / sqrt(5)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, how was `memo` initialized for `fibonacciMemo`?",
    shortAnswer: "As `long[] memo = new long[fibN + 1];` storing cached results for fast index lookup in Indian Rupees (₹).",
    explanation: "Memo array initialization.",
    hint: "new long[fibN + 1] sized array.",
    level: "basic",
    codeExample: "long[] memo = new long[fibN + 1];"
  },
  {
    question: "What is the ultimate takeaway of Module 001_007 Topic 16 for Java developers?",
    shortAnswer: "The 5 classic recursive algorithms demonstrate diverse recursive patterns: linear recursion (Factorial), logarithmic divide-and-conquer (Fast Power, Sum of Digits), memoized tree recursion (Fibonacci), and multi-peg inductive puzzles (Tower of Hanoi).",
    explanation: "Mastery of classic recursive algorithms suite.",
    hint: "Covers linear, logarithmic, memoized tree, and exponential puzzle recursion.",
    level: "basic",
    codeExample: "// Summary: Factorial (O(N)), Fast Power (O(log N)), Hanoi (O(2^N))"
  },
  {
    question: "What is the next and final topic (Topic 17) in Module 001_007?",
    shortAnswer: "Recursion vs Iteration: memory overhead, call stack limits, and performance trade-offs.",
    explanation: "Topic 17 synthesizes the complete trade-off matrix between Recursion and Iteration.",
    hint: "Recursion vs Iteration: memory overhead, call stack limits, and performance trade-offs.",
    level: "basic",
    codeExample: "// Topic 17: Recursion vs Iteration Comprehensive Trade-Offs"
  },
  {
    question: "How does Matrix Exponentiation compute $fib(N)$ in $O(\\log N)$ time?",
    shortAnswer: "By raising the $2 \\times 2$ transformation matrix $\\begin{pmatrix} 1 & 1 \\\\ 1 & 0 \\end{pmatrix}$ to the $(N-1)$th power using Fast Exponentiation.",
    explanation: "Matrix exponentiation for logarithmic Fibonacci.",
    hint: "Raises 2x2 matrix to power N-1 using Fast Power in O(log N) time.",
    level: "advanced",
    codeExample: "// [[1, 1], [1, 0]]^(n-1) computes fib(n) in O(log N) time"
  }
];

export default questions;
