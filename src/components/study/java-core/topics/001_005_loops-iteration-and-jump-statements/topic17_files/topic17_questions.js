/**
 * Module 001_005: Topic 17: Solving number-based loop problems: Prime number check, Armstrong number, Palindrome number, Factorial, Fibonacci series
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "Why is the loop condition `i * i <= N` (or `i <= Math.sqrt(N)`) used to check if $N$ is Prime?",
    shortAnswer: "Because if $N$ has a factor greater than $\\sqrt{N}$, its corresponding factor pair MUST be less than $\\sqrt{N}$; checking up to $\\sqrt{N}$ reduces time complexity from $O(N)$ to $O(\\sqrt{N})$.",
    explanation: "Fundamental mathematical property of composite factor pairs.",
    hint: "Factor pairs occur in symmetric pairs around sqrt(N).",
    level: "basic",
    codeExample: "for (int i = 2; i * i <= n; i++) if (n % i == 0) return false;"
  },
  {
    question: "What is an Armstrong (Narcissistic) Number?",
    shortAnswer: "An integer where the sum of its digits, each raised to the power of the total number of digits $k$, equals the original number ($\sum d^k = N$).",
    explanation: "E.g. $153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153$.",
    hint: "Sum of digits raised to the power of digit count equals original number.",
    level: "basic",
    codeExample: "while (t > 0) { int d = t % 10; sum += Math.pow(d, k); t /= 10; }"
  },
  {
    question: "How do you mathematically check if a number is a Palindrome Number without converting it to a `String`?",
    shortAnswer: "By reversing its digits using a `while` loop (`rev = rev * 10 + n % 10; n /= 10;`) and checking if `originalNumber == rev`.",
    explanation: "Reverses digits via pure arithmetic.",
    hint: "Reverse digits mathematically with rev = rev * 10 + n % 10.",
    level: "basic",
    codeExample: "int rev = 0, t = n;\nwhile (t > 0) { rev = rev * 10 + t % 10; t /= 10; }\nreturn n == rev;"
  },
  {
    question: "What are the first two terms of the Fibonacci sequence and how is the series generated iteratively?",
    shortAnswer: "Terms: $0$ and $1$. Each subsequent term is computed by `next = a + b`, then shifting state: `a = b; b = next;` in an $O(N)$ loop.",
    explanation: "Standard iterative state shifting.",
    hint: "Start with 0 and 1; next = a + b, a = b, b = next.",
    level: "basic",
    codeExample: "long a = 0, b = 1;\nfor (int i = 0; i < n; i++) { print(a); long next = a + b; a = b; b = next; }"
  },
  {
    question: "Why is the iterative Fibonacci loop preferred over naive recursion in Java?",
    shortAnswer: "The iterative loop runs in $O(N)$ linear time and $O(1)$ constant memory; naive recursion (`fib(n-1) + fib(n-2)`) runs in catastrophic $O(2^N)$ exponential time and causes `StackOverflowError`.",
    explanation: "Avoids redundant overlapping subproblem computations.",
    hint: "Iterative is O(N) linear time; naive recursion is O(2^N) exponential time.",
    level: "intermediate",
    codeExample: "// Iterative O(N) vs Recursive O(2^N)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student ID token verifier, what test is performed on registration codes?",
    shortAnswer: "Prime number divisibility checks and Armstrong checksum validations to secure student lab privileges in Indian Rupees (₹).",
    explanation: "Demonstrates practical token authentication.",
    hint: "Performs prime check and Armstrong verification on student IDs.",
    level: "basic",
    codeExample: "boolean valid = isPrime(regCode) || isArmstrong(regCode);"
  },
  {
    question: "Are negative numbers considered Palindromes in standard Java algorithmic problems (e.g. LeetCode #9)?",
    shortAnswer: "No, because the negative sign `-121` reads `121-` backward, which is not equal to `-121`.",
    explanation: "Negative integers are immediately disqualified from palindrome status.",
    hint: "No, negative numbers are not palindromes due to the leading minus sign.",
    level: "basic",
    codeExample: "if (x < 0) return false; // Negative numbers are not palindromes"
  },
  {
    question: "What is the Time Complexity of checking if a number $N$ is Prime using the `i * i <= N` loop?",
    shortAnswer: "$O(\\sqrt{N})$ square root time complexity.",
    explanation: "Only tests integers up to $\\sqrt{N}$.",
    hint: "O(sqrt(N)) time complexity.",
    level: "basic",
    codeExample: "// O(sqrt(N)) iterations"
  },
  {
    question: "How do you count the number of digits in an integer $N$ using a `while` loop?",
    shortAnswer: "`int count = 0; while (n > 0) { count++; n /= 10; }`.",
    explanation: "Repeated integer division by 10 strips one digit per iteration.",
    hint: "while (n > 0) { count++; n /= 10; }.",
    level: "basic",
    codeExample: "int digits = 0;\nwhile (n > 0) { digits++; n /= 10; }"
  },
  {
    question: "What is the Sieve of Eratosthenes algorithm for finding all Primes up to $N$?",
    shortAnswer: "A boolean array algorithm where multiples of each prime are marked as composite in nested loops, running in $O(N \\log \\log N)$ time.",
    explanation: "The fastest prime generation algorithm for ranges up to $10^7$.",
    hint: "Marks multiples of primes as composite in O(N log log N) time.",
    level: "intermediate",
    codeExample: "boolean[] prime = new boolean[n+1]; Arrays.fill(prime, true); ..."
  },
  {
    question: "What is the Greatest Common Divisor (GCD) computed using Euclid's loop algorithm?",
    shortAnswer: "`while (b != 0) { int temp = b; b = a % b; a = temp; } return a;`.",
    explanation: "Euclidean algorithm running in $O(\\log(\\min(a,b)))$ time.",
    hint: "while (b != 0) { int t = b; b = a % b; a = t; }.",
    level: "intermediate",
    codeExample: "int gcd(int a, int b) {\n    while (b != 0) { int t = b; b = a % b; a = t; }\n    return a;\n}"
  },
  {
    question: "How is Least Common Multiple (LCM) calculated using GCD in Java?",
    shortAnswer: "$\\text{LCM}(a, b) = \\frac{|a \\times b|}{\\text{GCD}(a, b)}$.",
    explanation: "Standard arithmetic relationship between LCM and GCD.",
    hint: "(a * b) / gcd(a, b).",
    level: "basic",
    codeExample: "long lcm = ((long) a * b) / gcd(a, b);"
  },
  {
    question: "What is a Perfect Number in number theory?",
    shortAnswer: "A positive integer that is equal to the sum of its proper positive divisors (excluding itself). E.g. $6 = 1 + 2 + 3$, $28 = 1 + 2 + 4 + 7 + 14$.",
    explanation: "Classic loop divisor summation problem.",
    hint: "Sum of proper divisors equals the number itself (e.g. 6, 28).",
    level: "basic",
    codeExample: "int sum = 0; for (int i=1; i<n; i++) if (n % i == 0) sum += i; return sum == n;"
  },
  {
    question: "What is an Automorphic Number?",
    shortAnswer: "A number whose square ends in the same digits as the number itself (e.g. $5^2 = 25$, $6^2 = 36$, $25^2 = 625$).",
    explanation: "Tested using modulus powers of 10 in a loop.",
    hint: "Square ends with the number itself (e.g. 25^2 = 625).",
    level: "intermediate",
    codeExample: "long sq = (long)n * n;\nwhile (n > 0) { if (n % 10 != sq % 10) return false; n /= 10; sq /= 10; }"
  },
  {
    question: "What is a Strong (Krishnamurthy / Peterson) Number?",
    shortAnswer: "A number whose sum of the factorials of its digits equals the original number (e.g. $145 = 1! + 4! + 5! = 1 + 24 + 120 = 145$).",
    explanation: "Fuses digit extraction with factorial accumulation.",
    hint: "Sum of factorials of digits equals original number (145 = 1! + 4! + 5!).",
    level: "basic",
    codeExample: "while (t > 0) { sum += fact(t % 10); t /= 10; }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore curriculum, how is 0! defined?",
    shortAnswer: "$0! = 1$ (by mathematical definition and empty product identity).",
    explanation: "Crucial boundary case in factorial algorithms.",
    hint: "0! = 1.",
    level: "basic",
    codeExample: "// 0! is 1"
  },
  {
    question: "What is the maximum Fibonacci number index that fits in a 64-bit `long` without overflow?",
    shortAnswer: "$F_{92} = 7,540,113,804,746,346,429$. $F_{93}$ overflows `long` (requires `BigInteger`).",
    explanation: "Fundamental boundary in Java numerical types.",
    hint: "F_92 is the largest Fibonacci term that fits in a long.",
    level: "intermediate",
    codeExample: "// F_92 fits in long; use BigInteger for F_93+"
  },
  {
    question: "How do you check if a number is a Duck Number?",
    shortAnswer: "A positive number that contains at least one zero digit (`0`), but does not start with leading zeros (e.g. 1023 is a duck number; 0123 is not).",
    explanation: "Digit scanning loop problem.",
    hint: "Contains a zero digit and does not start with zero.",
    level: "basic",
    codeExample: "boolean duck = false; while (n > 0) { if (n % 10 == 0) duck = true; n /= 10; }"
  },
  {
    question: "How do you find the Sum of Prime Factors of a number using a `while` loop?",
    shortAnswer: "Divide out factors starting from 2: `while (n % d == 0) { sum += d; n /= d; }` and increment `d++`.",
    explanation: "Prime factorization algorithm.",
    hint: "Repeatedly divide out divisor while n % d == 0.",
    level: "intermediate",
    codeExample: "for (int d = 2; d * d <= n; d++) { while (n % d == 0) { sum += d; n /= d; } }"
  },
  {
    question: "What is a Harshad (Niven) Number?",
    shortAnswer: "An integer that is divisible by the sum of its digits (e.g. $18 \\to 1 + 8 = 9$; $18 \\% 9 == 0$).",
    explanation: "Digit sum divisor check.",
    hint: "Number is divisible by sum of its digits (e.g. 18 / 9 = 2).",
    level: "basic",
    codeExample: "int sum = sumDigits(n); return n % sum == 0;"
  },
  {
    question: "What happens if you check if $1$ is prime in `isPrime(1)` without guard clauses?",
    shortAnswer: "The loop `for (int i=2; i*i<=1; i++)` does not execute (0 iterations), returning `true` incorrectly! You must explicitly guard with `if (n <= 1) return false;`.",
    explanation: "Classic beginner edge-case mistake.",
    hint: "Must explicitly check if n <= 1 return false.",
    level: "basic",
    codeExample: "if (n <= 1) return false; // Mandatory guard clause for 1"
  },
  {
    question: "What is a Neon Number?",
    shortAnswer: "A number where the sum of digits of its square equals the number itself (e.g. $9^2 = 81 \\to 8 + 1 = 9$).",
    explanation: "Square digit summation test.",
    hint: "Sum of digits of its square equals the number (9^2 = 81 → 8+1 = 9).",
    level: "basic",
    codeExample: "int sq = n * n; return sumDigits(sq) == n;"
  },
  {
    question: "How do you find the N-th term of a Geometric Progression (GP) via a loop?",
    shortAnswer: "`long term = a; for (int i = 1; i < n; i++) term *= r;`.",
    explanation: "Multiplicative scaling by common ratio $r$.",
    hint: "Multiply initial term a by common ratio r (N-1) times.",
    level: "basic",
    codeExample: "long term = a; for (int i = 1; i < n; i++) term *= r;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what is the best practice for reversing a number that might overflow 32-bit `int`?",
    shortAnswer: "Accumulate the reversed number in a 64-bit `long rev = 0;` and check `if (rev > Integer.MAX_VALUE || rev < Integer.MIN_VALUE) return 0;` before casting back to `int`.",
    explanation: "Standard solution for LeetCode #7 (Reverse Integer).",
    hint: "Use long accumulator and check Integer.MAX_VALUE bounds before casting.",
    level: "intermediate",
    codeExample: "long rev = 0; while (n != 0) { rev = rev*10 + n%10; ... }"
  },
  {
    question: "What is an Abundant Number vs a Deficient Number?",
    shortAnswer: "An Abundant Number has sum of proper divisors $> N$ (e.g. 12: $1+2+3+4+6 = 16 > 12$); a Deficient Number has sum $< N$ (e.g. 10: $1+2+5 = 8 < 10$).",
    explanation: "Divisor classification categories.",
    hint: "Abundant: divisor sum > N; Deficient: divisor sum < N.",
    level: "basic",
    codeExample: "int sum = getDivisorSum(n); // sum > n vs sum < n"
  },
  {
    question: "How does the Fast Exponentiation (Binary Exponentiation) loop compute $x^N$ in $O(\\log N)$ time?",
    shortAnswer: "`while (N > 0) { if (N % 2 == 1) res *= x; x *= x; N /= 2; }`.",
    explanation: "Halves power on each step, squaring base.",
    hint: "Squares base and halves exponent on each iteration.",
    level: "intermediate",
    codeExample: "while (exp > 0) {\n    if (exp % 2 == 1) res *= base;\n    base *= base;\n    exp /= 2;\n}"
  },
  {
    question: "What is a Spy Number?",
    shortAnswer: "A number where the sum of its digits equals the product of its digits (e.g. $1124 \\to 1+1+2+4 = 8$ and $1 \\times 1 \\times 2 \\times 4 = 8$).",
    explanation: "Dual accumulator (sum and product) test.",
    hint: "Sum of digits equals product of digits (e.g. 1124 → sum=8, prod=8).",
    level: "basic",
    codeExample: "return sumDigits(n) == productDigits(n);"
  },
  {
    question: "Why does `Math.pow()` return a `double` and how should it be cast for integer problems?",
    shortAnswer: "`Math.pow(base, exp)` returns a 64-bit IEEE floating-point `double`; for integer calculations, use `(int) Math.round(Math.pow(d, k))` to prevent precision truncation bugs like `124.9999999` becoming `124`.",
    explanation: "Prevents floating-point truncation bugs.",
    hint: "Use Math.round() before casting to int to prevent truncation errors.",
    level: "intermediate",
    codeExample: "int powered = (int) Math.round(Math.pow(digit, numDigits));"
  },
  {
    question: "What is the ultimate takeaway of Module 001_005 Topic 17 for Java developers?",
    shortAnswer: "Mastering number theory loop problems (Primes, Armstrong, Palindromes, Factorials, Fibonacci) synthesizes loops, accumulators, digit extraction, mathematical optimizations ($O(\\sqrt{N})$, $O(\\log N)$), and overflow safety into practical coding mastery.",
    explanation: "Crucial benchmark for technical interviews and competitive programming.",
    hint: "Mastering number theory loops combines accumulators, digit math, and Big-O optimizations.",
    level: "basic",
    codeExample: "// Summary: Master Primes (sqrt(N)), Palindromes (%10,/10), Fibonacci (a,b state)"
  },
  {
    question: "What is the final topic (Topic 18) in Module 001_005?",
    shortAnswer: "Loop performance best practices: avoiding expensive method calls in termination conditions.",
    explanation: "Topic 18 explores enterprise loop optimization, loop hoisting, JIT unrolling, and HotSpot compiler performance tuning.",
    hint: "Loop performance best practices: avoiding expensive method calls in conditions.",
    level: "basic",
    codeExample: "// Topic 18: Loop Performance Best Practices"
  }
];

export default questions;
