const topic4_questions = [
  {
    question: "What is the mathematical definition of the iterated logarithm log*(N)?",
    options: [
      "The square of log_2(N)",
      "The number of times you must iteratively apply log_2 until the result becomes <= 1",
      "log_2(N) multiplied by N",
      "The factorial of log_2(N)"
    ],
    correctAnswer: 1,
    explanation: "log*(N) is the count of successive log_2 applications required to bring N down to 1 or less. It grows extremely slowly."
  },
  {
    question: "For any realistic input size on modern computers (and even if N equals the number of atoms in the universe 10^80), what is the maximum value of log*(N)?",
    options: [
      "Approximately 1,000",
      "At most 5",
      "Around 80",
      "Infinity"
    ],
    correctAnswer: 1,
    explanation: "log*(65536) = 4, and log*(2^65536 ≈ 10^19728) = 5. Since 10^80 is astronomically smaller than 10^19728, log*(N) <= 5 for all physically conceivable inputs."
  },
  {
    question: "In which advanced data structures and algorithms does the double logarithm O(log log N) time complexity appear?",
    options: [
      "Bubble Sort and Insertion Sort",
      "Van Emde Boas Trees (vEB), Interpolation Search on uniform data, and Sieve of Eratosthenes harmonic prime bounds",
      "Unsorted Linked List linear scans",
      "Standard Breadth First Search"
    ],
    correctAnswer: 1,
    explanation: "Van Emde Boas Priority Queues, Interpolation Search on uniformly distributed keys, and prime sieve harmonic sums achieve O(log log N) time complexity."
  },
  {
    question: "In the Disjoint Set Union (DSU / Union-Find) data structure with Path Compression and Union by Rank, what is the amortized time complexity per operation?",
    options: [
      "O(N^2)",
      "O(alpha(N)) <= O(log* N) <= 5 (Practically O(1) constant time)",
      "O(N log N)",
      "O(sqrt(N))"
    ],
    correctAnswer: 1,
    explanation: "alpha(N) is the inverse Ackermann function, which is bounded from above by log*(N). For all practical purposes on Earth, alpha(N) <= 4, making DSU operations virtually constant time."
  },
  {
    question: "What is the value of log_2(log_2(16))?",
    options: [
      "1",
      "2",
      "4",
      "8"
    ],
    correctAnswer: 1,
    explanation: "log_2(16) = 4, and log_2(4) = 2. So log_2(log_2(16)) = 2."
  },
  {
    question: "What is the value of log_2(log_2(256))?",
    options: [
      "2",
      "3",
      "4",
      "8"
    ],
    correctAnswer: 1,
    explanation: "log_2(256) = 8, and log_2(8) = 3. So log_2(log_2(256)) = 3."
  },
  {
    question: "What is the value of log_2(log_2(4,294,967,296)) (4 Billion)?",
    options: [
      "3",
      "4",
      "5",
      "6"
    ],
    correctAnswer: 2,
    explanation: "4,294,967,296 = 2^32. log_2(2^32) = 32. Then log_2(32) = 5. For a dataset of 4 billion items, O(log log N) requires only 5 steps!"
  },
  {
    question: "What is the value of log*(16)?",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correctAnswer: 2,
    explanation: "Step 1: log_2(16) = 4; Step 2: log_2(4) = 2; Step 3: log_2(2) = 1 (<= 1). It took 3 applications, so log*(16) = 3."
  },
  {
    question: "What is the value of log*(65,536)?",
    options: [
      "3",
      "4",
      "5",
      "16"
    ],
    correctAnswer: 1,
    explanation: "Step 1: log_2(65536) = 16; Step 2: log_2(16) = 4; Step 3: log_2(4) = 2; Step 4: log_2(2) = 1. Exactly 4 applications, so log*(65536) = 4."
  },
  {
    question: "What is the value of log*(2)?",
    options: [
      "0",
      "1",
      "2",
      "undefined"
    ],
    correctAnswer: 1,
    explanation: "log_2(2) = 1 (which is <= 1). It takes 1 step, so log*(2) = 1."
  },
  {
    question: "What is the value of log*(1)?",
    options: [
      "0",
      "1",
      "undefined",
      "-1"
    ],
    correctAnswer: 0,
    explanation: "Since 1 is already <= 1, 0 steps are needed. So log*(1) = 0."
  },
  {
    question: "In Interpolation Search, under what key distribution assumption does the average search time achieve O(log log N)?",
    options: [
      "Uniformly and randomly distributed sorted keys",
      "Exponentially skewed keys",
      "Unsorted arrays",
      "Binary bitmasks"
    ],
    correctAnswer: 0,
    explanation: "When keys are uniformly distributed across the range, Interpolation Search predicts probe positions proportionally, reducing search space to sqrt(N) at each step, yielding O(log log N) expected time."
  },
  {
    question: "What is the worst-case time complexity of Interpolation Search if data is exponentially skewed (e.g. [1, 2, 4, 8, 16, ... 2^N])?",
    options: [
      "O(log log N)",
      "O(log N)",
      "O(N)",
      "O(1)"
    ],
    correctAnswer: 2,
    explanation: "If data is exponentially skewed, Interpolation Search probes only 1 element per step, degrading to O(N) linear search. That is why standard binary search O(log N) is preferred for unknown distributions."
  },
  {
    question: "In a Van Emde Boas (vEB) tree over a universe of size U, what is the recurrence relation for search/insert operations?",
    options: [
      "T(U) = T(U/2) + O(1)",
      "T(U) = T(sqrt(U)) + O(1)",
      "T(U) = 2T(U/2) + O(U)",
      "T(U) = T(U - 1) + O(1)"
    ],
    correctAnswer: 1,
    explanation: "A vEB tree decomposes a universe of size U into sqrt(U) clusters of size sqrt(U). Recursive operations satisfy T(U) = T(sqrt(U)) + O(1) = O(log log U)."
  },
  {
    question: "Why does the Sieve of Eratosthenes run in O(N log log N) time complexity?",
    options: [
      "Because the sum of reciprocals of primes sum_{p <= N} (1/p) = ln(ln N) + M (Mertens' Second Theorem)",
      "Because primes are distributed randomly",
      "Because it uses binary search",
      "Because it skips even numbers"
    ],
    correctAnswer: 0,
    explanation: "Mertens' Second Theorem states sum_{p <= N} (1/p) = ln(ln N) + O(1). The total operations are N * sum_{p <= N} (1/p) = Theta(N log log N)."
  },
  {
    question: "How does the Ackermann function A(m, n) relate to the inverse Ackermann function alpha(N)?",
    options: [
      "The Ackermann function grows unimaginably fast (faster than any primitive recursive function), so its inverse alpha(N) grows unimaginably slowly",
      "They are identical functions",
      "alpha(N) is the derivative of Ackermann",
      "alpha(N) grows exponentially"
    ],
    correctAnswer: 0,
    explanation: "Because A(4, 2) is 2^65536 - 3 (a number with 19,729 decimal digits), the inverse Ackermann function alpha(N) is less than 5 for all N <= A(4, 2)."
  },
  {
    question: "Which of the following correctly orders the asymptotic growth rates from slowest to fastest?",
    options: [
      "O(1) < O(alpha(N)) < O(log* N) < O(log log N) < O(log N)",
      "O(log N) < O(log log N) < O(log* N) < O(1)",
      "O(log* N) < O(1) < O(alpha(N))",
      "O(log log N) < O(log* N) < O(alpha(N))"
    ],
    correctAnswer: 0,
    explanation: "Constant O(1) is slowest growing, followed by inverse Ackermann O(alpha(N)), iterated log O(log* N), double log O(log log N), and standard log O(log N)."
  },
  {
    question: "In distributed computing, Cole and Vishkin proved that a distributed ring network can be 3-colored in how many synchronous rounds?",
    options: [
      "O(N) rounds",
      "O(log N) rounds",
      "O(log* N) rounds",
      "O(1) rounds"
    ],
    correctAnswer: 2,
    explanation: "The Cole-Vishkin deterministic symmetry breaking algorithm 3-colors an n-cycle in exactly O(log* N) distributed communication rounds."
  },
  {
    question: "What is the value of log*(2^16)?",
    options: [
      "3",
      "4",
      "5",
      "16"
    ],
    correctAnswer: 1,
    explanation: "2^16 = 65,536. As derived earlier, log*(65536) = 4."
  },
  {
    question: "What is the value of log*(2^(2^16))?",
    options: [
      "4",
      "5",
      "6",
      "16"
    ],
    correctAnswer: 1,
    explanation: "log_2(2^(2^16)) = 2^16 = 65536. Since log*(65536) = 4, log*(2^(2^16)) = 1 + 4 = 5."
  },
  {
    question: "If a database table has N = 10^12 rows, what is the value of log_2(log_2 N)?",
    options: [
      "approx 5.3",
      "approx 20",
      "approx 40",
      "approx 12"
    ],
    correctAnswer: 0,
    explanation: "log_2(10^12) ≈ 39.86. Then log_2(39.86) ≈ 5.32. An O(log log N) query executes in only ~6 steps on a trillion rows!"
  },
  {
    question: "Why is O(log* N) practically treated as O(1) in software engineering benchmarks?",
    options: [
      "Because log*(N) <= 5 for all physical memory configurations on Earth",
      "Because compilers remove log* functions",
      "Because Big-O does not allow * symbols",
      "Because log* only works for 0"
    ],
    correctAnswer: 0,
    explanation: "To reach log*(N) = 6, N would have to exceed 2^(2^65536) (a number far exceeding the atoms in the universe). Thus log*(N) never exceeds 5 in any physical computer."
  },
  {
    question: "In Tarjan's classic 1975 paper on Disjoint Set Union, what did he prove about Union-Find without Path Compression (using only Union by Rank)?",
    options: [
      "It runs in O(log N) time per operation",
      "It runs in O(N^2) time",
      "It runs in O(1) time",
      "It causes infinite loops"
    ],
    correctAnswer: 0,
    explanation: "Union by rank alone keeps tree height bounded by log_2 N, achieving O(log N) per operation. Adding Path Compression reduces it to O(alpha(N))."
  },
  {
    question: "What is the time complexity of finding the maximum element in a Van Emde Boas tree?",
    options: [
      "O(1)",
      "O(log log U)",
      "O(log U)",
      "O(U)"
    ],
    correctAnswer: 0,
    explanation: "vEB trees store the `min` and `max` elements directly in root node fields, allowing minimum and maximum lookups in O(1) constant time!"
  },
  {
    question: "What is the main limitation of Van Emde Boas trees compared to standard balanced BSTs?",
    options: [
      "They only work on integer keys bounded by universe size U and consume significant memory if the key universe is sparse",
      "They cannot insert elements",
      "They are slower than linear search",
      "They cannot run on 64-bit CPUs"
    ],
    correctAnswer: 0,
    explanation: "vEB trees are bounded integer data structures requiring space proportional to the universe U (or O(N) with hashing), whereas BSTs work with arbitrary comparison keys."
  },
  {
    question: "What is the limit of log*(N) as N → infinity?",
    options: [
      "5",
      "+infinity",
      "0",
      "1"
    ],
    correctAnswer: 1,
    explanation: "Mathematically, log*(N) is unbounded and tends to +infinity as N → infinity, but it grows slower than any standard polynomial or polylogarithmic function."
  },
  {
    question: "What is the relationship between iterated logarithm log*(N) and tower of powers (tetration 2^^k)?",
    options: [
      "log*(2^^k) = k",
      "log*(2^^k) = 2^k",
      "log*(2^^k) = k^2",
      "log*(2^^k) = 0"
    ],
    correctAnswer: 0,
    explanation: "Tetration 2^^k is a power tower of 2s of height k (2^(2^(2...))). log*(N) is the exact inverse of power towers: log*(2^^k) = k."
  },
  {
    question: "If an algorithm requires O(log(log(log N))) operations, what is it called?",
    options: [
      "Triple logarithmic time",
      "Exponential time",
      "Quadratic log time",
      "Constant time"
    ],
    correctAnswer: 0,
    explanation: "Applying logarithm three times is triple logarithmic time O(log log log N)."
  },
  {
    question: "What is the value of log_2(log_2(65536))?",
    options: [
      "2",
      "4",
      "16",
      "8"
    ],
    correctAnswer: 1,
    explanation: "log_2(65536) = 16, and log_2(16) = 4. So log_2(log_2(65536)) = 4."
  },
  {
    question: "What is the key takeaway about sub-logarithmic and exotic logarithmic complexities?",
    options: [
      "They are purely theoretical and have no practical applications",
      "They represent the apex of algorithmic efficiency, solving massive dataset problems in effectively 4 to 6 CPU operations",
      "They are slower than linear search",
      "They only apply to sorting numbers"
    ],
    correctAnswer: 1,
    explanation: "Sub-logarithmic algorithms like vEB trees O(log log U) and DSU O(alpha(N)) achieve near-constant performance even on multi-billion element universes."
  }
];

export default topic4_questions;
