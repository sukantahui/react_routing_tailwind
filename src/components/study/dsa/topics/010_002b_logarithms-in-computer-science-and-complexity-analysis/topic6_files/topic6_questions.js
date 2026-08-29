const topic6_questions = [
  {
    question: "How does the GCC/Clang built-in function `__builtin_clz(n)` calculate floor(log_2 n) in O(1) time?",
    options: [
      "By running a 32-step while loop in software",
      "By utilizing dedicated single-cycle CPU assembly instructions (such as x86 BSR/LZCNT or ARM CLZ) to count leading zeros in hardware",
      "By looking up values in a hardcoded 4GB hash table",
      "By converting the integer into an ASCII string"
    ],
    correctAnswer: 1,
    explanation: "`__builtin_clz` maps directly to single-cycle CPU instructions (x86 BSR/LZCNT, ARM CLZ), computing 31 - CLZ(n) = floor(log_2 n) in O(1) hardware time."
  },
  {
    question: "In Range Minimum Query (RMQ) Sparse Tables, why is O(1) query time possible?",
    options: [
      "Because queries are done on unsorted arrays linearly",
      "Because any interval length (R - L + 1) can be covered by two overlapping power-of-two blocks of length 2^k where k = floor(log_2(len))",
      "Because RMQ tables only work on sorted arrays",
      "Because Sparse Tables recalculate minimums dynamically"
    ],
    correctAnswer: 1,
    explanation: "Using k = floor(log_2(R - L + 1)), any range [L, R] is the union of [L, L + 2^k - 1] and [R - 2^k + 1, R], enabling O(1) lookup with idempotent operations."
  },
  {
    question: "In tree algorithms, how does Binary Lifting calculate the Lowest Common Ancestor (LCA) in O(log N) query time?",
    options: [
      "By jumping along precomputed 2^k ancestor pointers (up[node][k]) instead of stepping 1 parent at a time",
      "By flattening the tree into a linked list and running linear search",
      "By running Dijkstra's algorithm on each query",
      "By hashing the leaf nodes"
    ],
    correctAnswer: 0,
    explanation: "Binary Lifting stores ancestors at powers of two (2^0, 2^1, 2^2, ... 2^k). Any depth difference can be decomposed into binary bits, allowing jumping to the LCA in O(log N) steps."
  },
  {
    question: "Why should competitive programmers avoid calling `log2()` from `<math.h>` inside tight 10^7-iteration loops in C/C++?",
    options: [
      "Because `log2()` is deprecated in C11",
      "Because `<math.h>` `log2()` involves floating-point conversions and transcendental software approximations, whereas `31 - __builtin_clz(n)` executes in 1 single CPU cycle",
      "Because `log2()` causes memory leaks",
      "Because `<math.h>` only supports base 10"
    ],
    correctAnswer: 1,
    explanation: "Floating point math library functions incur heavy instruction cycles compared to single-cycle integer bit scan instructions (`__builtin_clz`)."
  },
  {
    question: "What is the return value of `__builtin_clz(1)` on a 32-bit architecture?",
    options: [
      "0",
      "1",
      "31 (since the single '1' bit is at bit position 0, preceded by 31 leading zeros)",
      "32"
    ],
    correctAnswer: 2,
    explanation: "The 32-bit representation of 1 is 00000000 00000000 00000000 00000001 (31 zeros followed by 1). Thus `__builtin_clz(1)` returns 31."
  },
  {
    question: "What is the return value of `31 - __builtin_clz(1024)` on a 32-bit system?",
    options: [
      "9",
      "10 (since 1024 = 2^10, so log_2(1024) = 10)",
      "11",
      "1024"
    ],
    correctAnswer: 1,
    explanation: "1024 is 2^10. Its leading zeros count is 31 - 10 = 21. `31 - 21` produces exactly 10."
  },
  {
    question: "What is the behavior of `__builtin_clz(0)` in standard GCC/Clang C without hardware support?",
    options: [
      "Returns 0",
      "Returns 32",
      "Undefined behavior (UB)",
      "Returns -1"
    ],
    correctAnswer: 2,
    explanation: "Calling `__builtin_clz(0)` is undefined behavior in GCC/Clang because the underlying x86 `BSR` instruction does not define the destination register when the source is 0. Always check `if (n == 0)` first!"
  },
  {
    question: "For a 64-bit unsigned integer `unsigned long long n`, what is the correct GCC intrinsic to compute floor(log_2 n)?",
    options: [
      "31 - __builtin_clz(n)",
      "63 - __builtin_clzll(n)",
      "__builtin_popcount(n)",
      "__builtin_ctz(n)"
    ],
    correctAnswer: 1,
    explanation: "`__builtin_clzll` operates on 64-bit integers (`unsigned long long`). The exact log2 is `63 - __builtin_clzll(n)`."
  },
  {
    question: "What does the GCC built-in function `__builtin_ctz(n)` count?",
    options: [
      "Count Leading Zeros",
      "Count Trailing Zeros (number of consecutive zero bits after the least significant set bit)",
      "Count Total Set Bits",
      "Count CPU clock cycles"
    ],
    correctAnswer: 1,
    explanation: "`__builtin_ctz` counts trailing zeros, which equals the 0-indexed position of the lowest set bit (e.g. `__builtin_ctz(12)` = 2 since 12 = 1100_2)."
  },
  {
    question: "What does the GCC intrinsic `__builtin_popcount(n)` calculate?",
    options: [
      "Pop operations on a stack",
      "The Hamming weight (number of set 1-bits in the binary representation of n)",
      "The logarithm of n",
      "The power of 2"
    ],
    correctAnswer: 1,
    explanation: "`__builtin_popcount` (Population Count) counts the number of 1-bits in n using single-cycle CPU instructions (`POPCNT`)."
  },
  {
    question: "In Sparse Table precomputation for an array of size N, what is the recurrence relation to fill the DP table `st[i][j]` (where `st[i][j]` covers range `[i, i + 2^j - 1]`)?",
    options: [
      "st[i][j] = st[i][j-1] + st[i+1][j-1]",
      "st[i][j] = min(st[i][j-1], st[i + (1 << (j-1))][j-1])",
      "st[i][j] = st[i/2][j]",
      "st[i][j] = min(st[i][j], st[i][j+1])"
    ],
    correctAnswer: 1,
    explanation: "A block of length 2^j is split into two halves of length 2^(j-1): from `i` to `i + 2^(j-1) - 1` and from `i + 2^(j-1)` to `i + 2^j - 1`."
  },
  {
    question: "What is the preprocessing time and space complexity to build a Sparse Table for an array of size N?",
    options: [
      "O(N) time and O(N) space",
      "O(N log N) time and O(N log N) space",
      "O(N^2) time and O(N) space",
      "O(log N) time and O(1) space"
    ],
    correctAnswer: 1,
    explanation: "The table dimensions are N * (floor(log_2 N) + 1). Each entry is computed in O(1), giving O(N log N) total time and space."
  },
  {
    question: "Which of the following range query operations CANNOT be answered in O(1) time using a standard Sparse Table?",
    options: [
      "Range Minimum Query (RMQ)",
      "Range Maximum Query",
      "Range Greatest Common Divisor (GCD)",
      "Range Sum Query (without Prefix Sums, with overlapping intervals)"
    ],
    correctAnswer: 3,
    explanation: "O(1) Sparse Table queries require idempotent operations where f(x, x) = x (like min, max, gcd, bitwise OR/AND). Range Sum is not idempotent (f(x, x) = 2x), so overlapping intervals double-count elements."
  },
  {
    question: "How can Range Sum Queries be answered in O(1) time instead of using a Sparse Table?",
    options: [
      "Using a 1D Prefix Sum array where Sum(L, R) = prefix[R] - prefix[L - 1]",
      "Using Bubble Sort",
      "Using Dijkstra's algorithm",
      "Using an AVL tree"
    ],
    correctAnswer: 0,
    explanation: "Prefix sum arrays compute exact non-overlapping interval sums in O(1) time with O(N) preprocessing."
  },
  {
    question: "In C/C++, how do you compute the smallest power of 2 greater than or equal to an integer N in O(1) time?",
    options: [
      "1 << (32 - __builtin_clz(N - 1))",
      "N * 2",
      "pow(2, N)",
      "N + log(N)"
    ],
    correctAnswer: 0,
    explanation: "For N > 1, `32 - __builtin_clz(N - 1)` computes ceil(log_2 N), and left-shifting 1 by this exponent gives the exact next power of 2."
  },
  {
    question: "In Binary Lifting for LCA, how is the ancestor table `up[v][k]` defined?",
    options: [
      "The (2^k)-th ancestor of vertex v",
      "The k-th child of v",
      "The depth of v + k",
      "The weight of edge (v, k)"
    ],
    correctAnswer: 0,
    explanation: "`up[v][k]` stores the ancestor of node v at a distance of 2^k upwards toward the tree root."
  },
  {
    question: "What is the recurrence relation to build the Binary Lifting table `up[v][k]`?",
    options: [
      "up[v][k] = up[up[v][k-1]][k-1]",
      "up[v][k] = up[v][k-1] + up[v][k-1]",
      "up[v][k] = up[v-1][k]",
      "up[v][k] = parent[v]"
    ],
    correctAnswer: 0,
    explanation: "To jump 2^k steps upwards, jump 2^(k-1) steps to `mid = up[v][k-1]`, and then jump another 2^(k-1) steps from `mid`: `up[mid][k-1]`."
  },
  {
    question: "What is the time complexity to query the LCA of any two nodes u and v using Binary Lifting after O(N log N) precomputation?",
    options: [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(sqrt(N))"
    ],
    correctAnswer: 1,
    explanation: "LCA queries first equalize depths in O(log N) jumps, then jump upwards in tandem in O(log N) steps, taking O(log N) total time."
  },
  {
    question: "How does the Farach-Colton & Bender algorithm achieve O(1) LCA queries on trees?",
    options: [
      "By reducing tree LCA to Euler Tour array RMQ and solving ±1 RMQ with the Method of Four Russians in O(N) precomputation and O(1) query",
      "By storing all pairs in an N*N matrix",
      "By running BFS on every query",
      "By balancing the tree with AVL rotations"
    ],
    correctAnswer: 0,
    explanation: "Euler tour reduces tree LCA to RMQ on an array where adjacent elements differ by ±1. Sub-blocking with table lookups achieves O(N) build and O(1) query."
  },
  {
    question: "What is the bitwise formula in C to isolate the lowest set 1-bit of an integer x?",
    options: [
      "x & (-x)",
      "x | (-x)",
      "x ^ (-x)",
      "~x + 1"
    ],
    correctAnswer: 0,
    explanation: "In two's complement, `-x = ~x + 1`. The bitwise AND `x & (-x)` zeros out all bits except the least significant 1-bit."
  },
  {
    question: "What is the bitwise trick in C to clear the lowest set 1-bit of an integer x?",
    options: [
      "x & (x - 1) [Brian Kernighan's Algorithm]",
      "x | (x - 1)",
      "x ^ (x - 1)",
      "x << 1"
    ],
    correctAnswer: 0,
    explanation: "`x & (x - 1)` clears the lowest set bit. Repeating this counts set bits in exactly O(number of 1-bits) iterations."
  },
  {
    question: "What is the bitwise formula in C to check if an integer N is a power of 2 (N > 0)?",
    options: [
      "(N & (N - 1)) == 0",
      "(N | (N - 1)) == 0",
      "(N ^ (N - 1)) == 0",
      "N % 2 == 0"
    ],
    correctAnswer: 0,
    explanation: "A power of 2 has exactly one 1-bit (e.g. 8 = 1000_2). Subtracting 1 gives 0111_2. `8 & 7 == 0`."
  },
  {
    question: "How can you iterate through all submasks of a bitmask `mask` of size N in O(3^N) total time?",
    options: [
      "for (int sub = mask; sub > 0; sub = (sub - 1) & mask)",
      "for (int sub = 0; sub < mask; sub++)",
      "for (int sub = mask; sub > 0; sub--)",
      "for (int sub = 1; sub <= N; sub *= 2)"
    ],
    correctAnswer: 0,
    explanation: "The elegant idiom `sub = (sub - 1) & mask` visits every submask in descending order. Summing over all masks yields sum_{k=0}^N C(N, k) 2^k = 3^N."
  },
  {
    question: "What is the De Bruijn sequence method used for in integer logarithms?",
    options: [
      "A software trick that multiplies by a 32-bit De Bruijn constant and uses a 32-element lookup table to find log2 in O(1) without hardware clz instructions",
      "A method to generate random numbers",
      "A fast string searching algorithm",
      "A sorting algorithm for floats"
    ],
    correctAnswer: 0,
    explanation: "De Bruijn multiplication maps each unique power of 2 to a unique 5-bit index in a 32-entry lookup table in O(1) integer arithmetic."
  },
  {
    question: "In dynamic memory allocators (like `malloc` in glibc), how are free list bins organized to find matching block sizes in O(1) to O(log N) time?",
    options: [
      "Segregated free lists indexed by power-of-two size classes (2^k bins)",
      "Linear unsorted linked lists",
      "Array scans from index 0",
      "Random memory selection"
    ],
    correctAnswer: 0,
    explanation: "Segregated free lists use size classes partitioned by powers of 2. Calculating the bin index uses `31 - __builtin_clz(size)` in O(1) time."
  },
  {
    question: "Why is an iterative bitwise Binary Search faster than recursive Binary Search in C benchmarks?",
    options: [
      "It eliminates function call stack frame allocation, prevents register spilling, and allows the compiler to unroll loops",
      "It has a lower Big-O complexity",
      "It uses base 10",
      "It runs on the GPU"
    ],
    correctAnswer: 0,
    explanation: "Iterative binary search executes inside a flat loop, enabling registers to be reused without stack frame push/pop overhead."
  },
  {
    question: "What is the memory size of a Sparse Table for N = 1,000,000 32-bit integers?",
    options: [
      "approx 4 MB",
      "approx 80 MB (1,000,000 * 20 levels * 4 bytes ≈ 80 MB)",
      "approx 1 GB",
      "approx 4 KB"
    ],
    correctAnswer: 1,
    explanation: "N = 10^6, levels = 20. Total integers = 20 * 10^6 = 20,000,000. At 4 bytes per integer, memory is 80 MB."
  },
  {
    question: "When should you prefer a Segment Tree over a Sparse Table?",
    options: [
      "When the array undergoes dynamic point updates or range updates (since Segment Trees update in O(log N), whereas Sparse Tables require O(N log N) complete rebuild)",
      "When you only need static queries",
      "When memory is unlimited",
      "When N < 10"
    ],
    correctAnswer: 0,
    explanation: "Sparse tables are strictly static (updates take O(N log N)). Segment trees handle dynamic point updates and range updates (with lazy propagation) in O(log N)."
  },
  {
    question: "What is the bitwise representation of -1 in two's complement 32-bit signed integer?",
    options: [
      "0x00000001",
      "0xFFFFFFFF (all 32 bits set to 1)",
      "0x80000000",
      "0x00000000"
    ],
    correctAnswer: 1,
    explanation: "In two's complement arithmetic, -1 is represented by all bits set to 1 (0xFFFFFFFF)."
  },
  {
    question: "What is the ultimate mastery takeaway of Logarithms in Computer Science and Systems Programming?",
    options: [
      "Logarithms are only useful for passing math exams",
      "Logarithms are the foundational bridge connecting binary hardware architecture (registers, bit-manipulation) to scalable data structures (trees, divide-and-conquer, RMQ, DSU), enabling handling massive planetary-scale data in milliseconds",
      "Linear algorithms should always be preferred over logarithmic algorithms",
      "Logarithms cannot be implemented in C"
    ],
    correctAnswer: 1,
    explanation: "Logarithms provide the fundamental mathematical machinery that enables software algorithms to conquer exponential data growth at the physical speed limits of silicon hardware."
  }
];

export default topic6_questions;
