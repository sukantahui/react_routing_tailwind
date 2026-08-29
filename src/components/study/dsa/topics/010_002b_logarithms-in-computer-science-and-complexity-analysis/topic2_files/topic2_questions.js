const topic2_questions = [
  {
    question: "What is the exact time complexity of the C loop: for(int i = 1; i < n; i *= 2)?",
    options: [
      "O(n)",
      "O(log_2 n)",
      "O(n^2)",
      "O(sqrt(n))"
    ],
    correctAnswer: 1,
    explanation: "In each step, i doubles (1, 2, 4, 8, ... 2^k). The loop terminates when 2^k >= n, which yields k = ceil(log_2 n) iterations, resulting in O(log n) time complexity."
  },
  {
    question: "What is the time complexity of the nested loops:\nfor(int i = 1; i < n; i *= 2)\n  for(int j = 1; j < n; j *= 2)?",
    options: [
      "O(n log n)",
      "O((log n)^2) [Polylogarithmic]",
      "O(n^2)",
      "O(log n)"
    ],
    correctAnswer: 1,
    explanation: "The outer loop executes log_2(n) times, and for each outer iteration, the inner loop executes log_2(n) times. The total operations are log_2(n) * log_2(n) = O((log n)^2)."
  },
  {
    question: "If a loop increments by multiplying with 3 (for(int i = 1; i < n; i *= 3)), how does its asymptotic complexity class compare with i *= 2?",
    options: [
      "It is exponentially faster",
      "Both belong to the exact same complexity class O(log n)",
      "i *= 3 is O(n) while i *= 2 is O(log n)",
      "i *= 3 is illegal in C syntax"
    ],
    correctAnswer: 1,
    explanation: "log_3(n) = (1 / log_2 3) * log_2(n) ≈ 0.63 * log_2(n). Because 0.63 is a constant scalar, both loops are in Theta(log n)."
  },
  {
    question: "What is the time complexity of the loop: for(int i = n; i > 1; i /= 2)?",
    options: [
      "O(n)",
      "O(log_2 n)",
      "O(n / 2)",
      "O(1)"
    ],
    correctAnswer: 1,
    explanation: "In division stepping, the loop value is successively halved from n down to 1: n, n/2, n/4, ... 1. The number of steps is exactly floor(log_2 n) = O(log n)."
  },
  {
    question: "What is the time complexity of the mixed nested loop:\nfor(int i = 1; i <= n; i++)\n  for(int j = 1; j < n; j *= 2)?",
    options: [
      "O(n^2)",
      "O(n log n) [Linearithmic]",
      "O((log n)^2)",
      "O(n)"
    ],
    correctAnswer: 1,
    explanation: "The outer loop runs n times with additive increment (+1), and the inner loop runs log_2(n) times with multiplicative increment (*2). The total work is n * log_2(n) = O(n log n)."
  },
  {
    question: "What is the time complexity of the loop: for(int i = 1; i < n; i *= 2) for(int j = 0; j < i; j++)?",
    options: [
      "O(n log n)",
      "O(n) [Linear Time]",
      "O(n^2)",
      "O((log n)^2)"
    ],
    correctAnswer: 1,
    explanation: "Summing the inner iterations: 1 + 2 + 4 + 8 + ... + 2^k where 2^k < n. This geometric series sums to 2^(k+1) - 1 ≈ 2n = O(n) linear time!"
  },
  {
    question: "What happens if a programmer writes: for(int i = 0; i < n; i *= 2)?",
    options: [
      "It runs in O(log n) time",
      "It creates an Infinite Loop because 0 * 2 = 0, so i is never incremented",
      "It causes a compiler syntax error",
      "It runs in O(1) time"
    ],
    correctAnswer: 1,
    explanation: "Since i starts at 0, i *= 2 produces 0 at every iteration, causing an infinite loop. Multiplicative loops must start with i >= 1!"
  },
  {
    question: "What is the time complexity of the quadratic squaring loop: for(int i = 2; i < n; i = i * i)?",
    options: [
      "O(log n)",
      "O(log log n) [Double Logarithmic]",
      "O(sqrt(n))",
      "O(n)"
    ],
    correctAnswer: 1,
    explanation: "At iteration k, i = 2^(2^k). The loop terminates when 2^(2^k) >= n, giving 2^k = log_2(n) => k = log_2(log_2 n) = O(log log n)."
  },
  {
    question: "What is the time complexity of the loop: for(int i = n; i > 2; i = sqrt(i))?",
    options: [
      "O(sqrt(n))",
      "O(log n)",
      "O(log log n)",
      "O(1)"
    ],
    correctAnswer: 2,
    explanation: "Taking square root repeatedly halves the exponent of the size: n^(1/2), n^(1/4), n^(1/8) ... down to 2. The number of steps is O(log log n)."
  },
  {
    question: "What is the time complexity of the dependent loop: for(int i = 1; i <= n; i++) for(int j = 1; j <= i; j *= 2)?",
    options: [
      "O(n^2)",
      "O(n log n)",
      "O((log n)^2)",
      "O(n)"
    ],
    correctAnswer: 1,
    explanation: "The total iterations are sum_{i=1}^n log_2(i) = log_2(1 * 2 * 3 * ... * n) = log_2(n!) = Theta(n log n) by Stirling's approximation."
  },
  {
    question: "What is the exact number of iterations executed by: for(int i = 1; i <= 64; i *= 2)?",
    options: [
      "6 iterations",
      "7 iterations",
      "8 iterations",
      "64 iterations"
    ],
    correctAnswer: 1,
    explanation: "Values of i: 1, 2, 4, 8, 16, 32, 64. That is exactly 7 iterations (since condition is i <= 64)."
  },
  {
    question: "What is the exact number of iterations executed by: for(int i = 1; i < 64; i *= 2)?",
    options: [
      "5 iterations",
      "6 iterations",
      "7 iterations",
      "8 iterations"
    ],
    correctAnswer: 1,
    explanation: "Values of i: 1, 2, 4, 8, 16, 32 (terminates when i = 64). That is exactly 6 iterations."
  },
  {
    question: "What is the time complexity of the 3-level nested logarithmic loop:\nfor(int i = 1; i < n; i *= 2)\n  for(int j = 1; j < n; j *= 2)\n    for(int k = 1; k < n; k *= 2)?",
    options: [
      "O(n^3)",
      "O(3 log n)",
      "O((log n)^3) [Polylogarithmic]",
      "O(n log n)"
    ],
    correctAnswer: 2,
    explanation: "Each loop executes log_2(n) times independently, yielding log_2(n) * log_2(n) * log_2(n) = O((log n)^3)."
  },
  {
    question: "What is the time complexity of the harmonic nested loop (Sieve of Eratosthenes inner loop structure):\nfor(int i = 1; i <= n; i++)\n  for(int j = i; j <= n; j += i)?",
    options: [
      "O(n^2)",
      "O(n log n)",
      "O((log n)^2)",
      "O(n)"
    ],
    correctAnswer: 1,
    explanation: "The inner loop runs n/i times. Total iterations = sum_{i=1}^n (n/i) = n * sum_{i=1}^n (1/i) = n * ln(n) = O(n log n)."
  },
  {
    question: "What is the time complexity of: for(int i = 1; i < n; i *= 4)?",
    options: [
      "O(n / 4)",
      "O(log_4 n) = O(log n)",
      "O(4^n)",
      "O(sqrt(n))"
    ],
    correctAnswer: 1,
    explanation: "At each step, i quadruples (1, 4, 16, 64, ...). The loop terminates in ceil(log_4 n) = O(log n) iterations."
  },
  {
    question: "What is the time complexity of: for(int i = n; i > 0; i /= 3)?",
    options: [
      "O(log_3 n) = O(log n)",
      "O(n / 3)",
      "O(3^n)",
      "O(n log n)"
    ],
    correctAnswer: 0,
    explanation: "Successive division by 3 reduces n to 0 in floor(log_3 n) + 1 steps = O(log n)."
  },
  {
    question: "If an additive loop runs in O(N) and a multiplicative loop runs in O(log N), what is their combined sequential complexity?",
    options: [
      "O(N * log N)",
      "O(N + log N) = O(N)",
      "O((log N)^2)",
      "O(N^2)"
    ],
    correctAnswer: 1,
    explanation: "For sequential code blocks, the dominant term governs the asymptotic sum: O(N + log N) = O(N)."
  },
  {
    question: "What is the time complexity of: for(int i = 1; i * i <= n; i++)?",
    options: [
      "O(n)",
      "O(sqrt(n))",
      "O(log n)",
      "O(n^2)"
    ],
    correctAnswer: 1,
    explanation: "The condition i * i <= n means i <= sqrt(n). Since i increments by +1, the loop runs exactly floor(sqrt(n)) times = O(sqrt(n))."
  },
  {
    question: "How does the complexity of for(int i = 1; i*i <= n; i++) compare to for(int i = 1; i < n; i *= 2)?",
    options: [
      "O(sqrt(n)) is faster than O(log n)",
      "O(log n) is strictly faster than O(sqrt(n))",
      "Both are identical",
      "O(sqrt(n)) is exponential"
    ],
    correctAnswer: 1,
    explanation: "For large n, log_2(n) is dramatically smaller than sqrt(n). For n = 1,000,000, log_2(n) ≈ 20 whereas sqrt(n) = 1,000."
  },
  {
    question: "What is the time complexity of: for(int i = 1; i < n; i *= 2) for(int j = 1; j < i; j *= 2)?",
    options: [
      "O(n)",
      "O((log n)^2)",
      "O(n log n)",
      "O(log n)"
    ],
    correctAnswer: 1,
    explanation: "When i = 2^k, the inner loop runs k times. Total iterations = sum_{k=0}^{log n} k = (log n * (log n + 1)) / 2 = O((log n)^2)."
  },
  {
    question: "What is the time complexity of: for(int i = n; i > 1; i /= 2) for(int j = 0; j < i; j++)?",
    options: [
      "O(n log n)",
      "O(n) [Linear Time]",
      "O(n^2)",
      "O(log n)"
    ],
    correctAnswer: 1,
    explanation: "The inner loop runs n + n/2 + n/4 + n/8 + ... + 1 times. This geometric sum equals n * (1 + 1/2 + 1/4 + ...) ≈ 2n = O(n)."
  },
  {
    question: "What is the time complexity of: for(int i = 1; i < n; i += 2)?",
    options: [
      "O(log n)",
      "O(n) [Linear Time]",
      "O(n / 2) which is Theta(n)",
      "Both 1 and 2 are correct"
    ],
    correctAnswer: 3,
    explanation: "Adding a constant (i += 2) is additive stepping, NOT multiplicative. It runs n/2 times, which is in Theta(n)."
  },
  {
    question: "What is the rule of thumb to distinguish O(n) loops from O(log n) loops?",
    options: [
      "Additive increments (i += c, i -= c) yield O(n); Multiplicative steps (i *= c, i /= c) yield O(log n)",
      "While loops are O(log n), for loops are O(n)",
      "All loops in C are O(n^2)",
      "If the loop uses integers it is O(1)"
    ],
    correctAnswer: 0,
    explanation: "The fundamental heuristic: addition/subtraction steps produce linear growth O(n); multiplication/division steps produce logarithmic growth O(log n)."
  },
  {
    question: "What is the time complexity of: for(int i = 2; i < n; i = pow(i, 2))?",
    options: [
      "O(n)",
      "O(log n)",
      "O(log log n)",
      "O(sqrt(n))"
    ],
    correctAnswer: 2,
    explanation: "pow(i, 2) is squaring i at each iteration (2, 4, 16, 256, 65536, ...). This achieves double logarithmic complexity O(log log n)."
  },
  {
    question: "What is the time complexity of: for(int i = 1; i < n; i *= 2) for(int j = 1; j < n; j += i)?",
    options: [
      "O(n log n)",
      "O(n)",
      "O(log n)",
      "O(n^2)"
    ],
    correctAnswer: 1,
    explanation: "When i is fixed, inner loop step is i, so it runs n/i times. Total sum = sum (n / 2^k) = n * (1 + 1/2 + 1/4 + ...) = 2n = O(n)."
  },
  {
    question: "In C, what bitwise operator can replace `i *= 2` for unsigned integers?",
    options: [
      "i >>= 1",
      "i <<= 1",
      "i ^= 2",
      "i &= 2"
    ],
    correctAnswer: 1,
    explanation: "Left shift by 1 bit (`i <<= 1`) multiplies an unsigned integer by 2 in 1 CPU cycle."
  },
  {
    question: "In C, what bitwise operator can replace `i /= 2` for unsigned integers?",
    options: [
      "i >>= 1",
      "i <<= 1",
      "i |= 2",
      "i ~= 1"
    ],
    correctAnswer: 0,
    explanation: "Right shift by 1 bit (`i >>= 1`) divides an integer by 2."
  },
  {
    question: "What is the time complexity of: for(int i = 1; i < n; i <<= 1)?",
    options: [
      "O(n)",
      "O(log_2 n)",
      "O(n^2)",
      "O(1)"
    ],
    correctAnswer: 1,
    explanation: "Left shifting by 1 is identical to multiplying by 2, which runs in ceil(log_2 n) = O(log n) time."
  },
  {
    question: "What is the time complexity of: for(int i = n; i > 0; i >>= 1)?",
    options: [
      "O(log_2 n)",
      "O(n)",
      "O(n / 2)",
      "O(1)"
    ],
    correctAnswer: 0,
    explanation: "Right shifting by 1 halves the number at each step until it reaches 0 in floor(log_2 n) + 1 steps = O(log n)."
  },
  {
    question: "What is the primary takeaway for loop complexity analysis?",
    options: [
      "Never look at the step update expression",
      "Always identify whether the loop variable changes additively (O(N)), multiplicatively (O(log N)), or exponentially (O(log log N))",
      "All nested loops are automatically O(N^2)",
      "Only recursion produces logarithms"
    ],
    correctAnswer: 1,
    explanation: "Analyzing the step update (additive vs multiplicative vs polynomial) immediately reveals whether the loop executes in O(N), O(log N), or O(log log N) time."
  }
];

export default topic2_questions;
