const topic0_questions = [
  {
    question: "What is the formal mathematical definition of a logarithm log_b(x) = y?",
    options: [
      "x raised to the power y equals b (x^y = b)",
      "b multiplied by y equals x (b * y = x)",
      "b raised to the power y equals x (b^y = x)",
      "x divided by b equals y (x / b = y)"
    ],
    correctAnswer: 2,
    explanation: "A logarithm is the inverse operation of exponentiation: log_b(x) = y if and only if b^y = x. It answers what power y the base b must be raised to produce x."
  },
  {
    question: "In computer science algorithm analysis, what intuitive operational question does log_2(N) directly answer?",
    options: [
      "How many elements can fit inside an array of size N?",
      "How many times can you divide a problem size N by 2 before reaching 1?",
      "How many permutations exist for N distinct items?",
      "How many total bits are stored in the CPU cache?"
    ],
    correctAnswer: 1,
    explanation: "If you repeatedly divide N by 2 (as in Binary Search or MergeSort splitting), the problem reduces to size 1 after k halving steps where N / 2^k = 1, giving k = log_2(N)."
  },
  {
    question: "Why is base 2 (log_2) the primary and natural logarithm base used in computer science?",
    options: [
      "Because computer displays use 2D raster grids",
      "Because computer architecture is built upon binary digital electronics (bits 0 and 1) and divide-and-conquer algorithms divide problem spaces into 2 halves",
      "Because base 10 is mathematically incompatible with calculus",
      "Because ASCII characters are 2 bytes wide"
    ],
    correctAnswer: 1,
    explanation: "Digital computers operate on binary circuits (bits), and the fundamental algorithmic paradigm (binary search, binary trees, divide-and-conquer) partitions datasets into 2 equal halves."
  },
  {
    question: "If a sorted database contains N = 1,000,000,000 (1 Billion) records, how many key comparisons are required in the worst case using Binary Search (O(log_2 N))?",
    options: [
      "1,000,000,000 comparisons",
      "500,000,000 comparisons",
      "At most 30 comparisons",
      "Exactly 1,000 comparisons"
    ],
    correctAnswer: 2,
    explanation: "Since 2^30 = 1,073,741,824 > 1,000,000,000, ceil(log_2(10^9)) = 30. Binary search needs at most 30 comparisons to locate any key in 1 billion sorted records!"
  },
  {
    question: "How does the asymptotic growth rate of a logarithmic function f(N) = log_2(N) compare to a square-root function g(N) = sqrt(N)?",
    options: [
      "log_2(N) grows much slower than sqrt(N) as N approaches infinity",
      "log_2(N) grows faster than sqrt(N)",
      "Both have the identical asymptotic growth rate",
      "sqrt(N) is an upper bound on N^2 while log_2(N) is not"
    ],
    correctAnswer: 0,
    explanation: "As N → infinity, log(N) / sqrt(N) → 0. Therefore, O(log N) is strictly faster and grows much more slowly than sub-linear O(sqrt(N))."
  },
  {
    question: "What is the value of log_2(1) for any valid logarithm base?",
    options: [
      "1",
      "0",
      "Infinity",
      "Undefined"
    ],
    correctAnswer: 1,
    explanation: "For any base b > 0 (b != 1), b^0 = 1. Therefore, log_b(1) is always 0."
  },
  {
    question: "What is the value of log_2(2^k) where k is any positive integer?",
    options: [
      "2",
      "2^k",
      "k",
      "k^2"
    ],
    correctAnswer: 2,
    explanation: "By the inverse power property of logarithms, log_b(b^k) = k * log_b(b) = k * 1 = k."
  },
  {
    question: "What is the domain of the real-valued logarithm function f(x) = log_2(x)?",
    options: [
      "All real numbers (-infinity, +infinity)",
      "All non-negative real numbers [0, +infinity)",
      "Strictly positive real numbers (0, +infinity)",
      "Integers only"
    ],
    correctAnswer: 2,
    explanation: "The argument of a real logarithm must be strictly positive (x > 0). log_b(0) approaches -infinity and logarithms of negative numbers are not defined on real numbers."
  },
  {
    question: "If an array has size N = 64, how many times can it be divided in half before a single element is left?",
    options: [
      "32 times",
      "6 times",
      "16 times",
      "8 times"
    ],
    correctAnswer: 1,
    explanation: "64 → 32 → 16 → 8 → 4 → 2 → 1. That is exactly 6 halving steps, since 2^6 = 64, so log_2(64) = 6."
  },
  {
    question: "What is the floor of log_2(100)?",
    options: [
      "5",
      "6",
      "7",
      "10"
    ],
    correctAnswer: 1,
    explanation: "Since 2^6 = 64 and 2^7 = 128, 64 <= 100 < 128. Therefore, floor(log_2(100)) = 6."
  },
  {
    question: "What is the ceiling of log_2(100)?",
    options: [
      "6",
      "7",
      "8",
      "10"
    ],
    correctAnswer: 1,
    explanation: "Since 2^6 = 64 < 100 <= 128 = 2^7, the smallest integer power of 2 that can cover 100 elements is 7, so ceil(log_2(100)) = 7."
  },
  {
    question: "In binary search on an array of size N, what is the maximum number of iterations in terms of ceiling function?",
    options: [
      "ceil(log_2(N)) + 1",
      "floor(log_2(N)) + 1",
      "N / 2",
      "log_10(N)"
    ],
    correctAnswer: 1,
    explanation: "The maximum number of comparisons in binary search is floor(log_2(N)) + 1 (or ceil(log_2(N + 1)))."
  },
  {
    question: "Why does doubling the input size N increase the number of operations of an O(log_2 N) algorithm by only 1?",
    options: [
      "Because log_2(2N) = log_2(2) + log_2(N) = 1 + log_2(N)",
      "Because 2 * log(N) = log(N) + 1",
      "Because Big-O ignores doubles",
      "Because N doubles cancel out"
    ],
    correctAnswer: 0,
    explanation: "By the logarithm product rule: log_2(2 * N) = log_2(2) + log_2(N) = 1 + log_2(N). Doubling the dataset adds only a single additional step!"
  },
  {
    question: "If searching 1,000 items takes 10 steps, how many steps will an O(log_2 N) algorithm take to search 1,000,000 items?",
    options: [
      "10,000 steps",
      "1,000 steps",
      "20 steps",
      "100 steps"
    ],
    correctAnswer: 2,
    explanation: "1,000,000 = 1,000^2. log_2(10^6) = 2 * log_2(10^3) ≈ 2 * 10 = 20 steps. Squaring the dataset only doubles the step count!"
  },
  {
    question: "What is the time complexity of an algorithm that reduces problem size by a factor of 3 at each step (N → N/3)?",
    options: [
      "O(N / 3)",
      "O(log_3 N) = O(log N)",
      "O(3^N)",
      "O(N^3)"
    ],
    correctAnswer: 1,
    explanation: "Reducing by a factor of 3 at each step yields k = log_3(N) steps. Asymptotically, O(log_3 N) is O(log N)."
  },
  {
    question: "What happens to the value of log_2(x) as x approaches 0 from the positive side (x → 0+)?",
    options: [
      "It approaches 0",
      "It approaches 1",
      "It approaches -infinity",
      "It approaches +infinity"
    ],
    correctAnswer: 2,
    explanation: "As x → 0+, 2^y = x requires y to become an increasingly large negative number, so log_2(x) → -infinity."
  },
  {
    question: "Which of the following functions grows the SLOWEST as N → infinity?",
    options: [
      "f(N) = N",
      "f(N) = sqrt(N)",
      "f(N) = log_2(N)",
      "f(N) = N / log_2(N)"
    ],
    correctAnswer: 2,
    explanation: "Among the options, log_2(N) is logarithmic, which grows strictly slower than sqrt(N), N/log(N), and linear N."
  },
  {
    question: "If log_2(x) = 8, what is the value of x?",
    options: [
      "16",
      "64",
      "256",
      "512"
    ],
    correctAnswer: 2,
    explanation: "By definition, log_2(x) = 8 means x = 2^8 = 256."
  },
  {
    question: "If 2^x = 2048, what is x?",
    options: [
      "10",
      "11",
      "12",
      "20"
    ],
    correctAnswer: 1,
    explanation: "2^10 = 1024, so 2^11 = 2048. Thus x = log_2(2048) = 11."
  },
  {
    question: "What is log_2(0.5)?",
    options: [
      "-1",
      "0",
      "0.5",
      "Undefined"
    ],
    correctAnswer: 0,
    explanation: "0.5 = 1/2 = 2^(-1). Therefore, log_2(0.5) = -1."
  },
  {
    question: "What is log_2(0.125)?",
    options: [
      "-2",
      "-3",
      "-4",
      "0.125"
    ],
    correctAnswer: 1,
    explanation: "0.125 = 1/8 = 2^(-3). Therefore, log_2(0.125) = -3."
  },
  {
    question: "How many elements can a binary search tree of height h = 4 hold at most (root at height 0)?",
    options: [
      "15 elements",
      "16 elements",
      "31 elements",
      "63 elements"
    ],
    correctAnswer: 2,
    explanation: "A full binary tree of height h contains 2^(h+1) - 1 nodes. For h = 4, 2^(4+1) - 1 = 2^5 - 1 = 31 nodes."
  },
  {
    question: "Why can an algorithm with O(log N) runtime easily process an input of size N = 10^18 (1 Quintillion)?",
    options: [
      "Because log_2(10^18) ≈ 60 operations, which modern CPUs execute in less than a microsecond",
      "Because quantum computers run log N in 0 seconds",
      "Because O(log N) does not process data",
      "Because 10^18 fits in a 16-bit register"
    ],
    correctAnswer: 0,
    explanation: "Since 2^60 ≈ 1.15 * 10^18, log_2(10^18) is only ~60 steps. A 3 GHz CPU executes 3 billion cycles per second, making 60 steps virtually instantaneous (< 1 microsecond)."
  },
  {
    question: "What is the value of log_b(b) for any valid base b?",
    options: [
      "0",
      "1",
      "b",
      "b^2"
    ],
    correctAnswer: 1,
    explanation: "Since b^1 = b, log_b(b) is always equal to 1."
  },
  {
    question: "Which of the following is equivalent to log_2(N^3)?",
    options: [
      "(log_2 N)^3",
      "3 * log_2(N)",
      "log_2(3) * N",
      "3 + log_2(N)"
    ],
    correctAnswer: 1,
    explanation: "By the Power Rule of logarithms: log_b(x^k) = k * log_b(x). Therefore, log_2(N^3) = 3 * log_2(N)."
  },
  {
    question: "If an algorithm runs in O(log(N^5)) time, what is its simplified Big-O complexity class?",
    options: [
      "O(N^5)",
      "O(5 log N)",
      "O(log N)",
      "O((log N)^5)"
    ],
    correctAnswer: 2,
    explanation: "log(N^5) = 5 * log(N). Since 5 is a constant scalar multiplier, Big-O absorbs it: O(5 log N) = O(log N)."
  },
  {
    question: "If an array has N elements and you perform a linear search, worst-case steps are N. If you use binary search, worst-case steps are log_2 N. For N = 1,000,000, how many times faster is binary search?",
    options: [
      "100 times faster",
      "1,000 times faster",
      "50,000 times faster",
      "2 times faster"
    ],
    correctAnswer: 2,
    explanation: "Linear search takes 1,000,000 steps. Binary search takes log_2(10^6) ≈ 20 steps. Speedup = 1,000,000 / 20 = 50,000x faster!"
  },
  {
    question: "Which type of algorithm design paradigm most frequently produces logarithmic O(log N) time complexities?",
    options: [
      "Dynamic Programming table fill",
      "Brute force permutations",
      "Divide-and-Conquer with constant time combination (Halve and Conquer)",
      "Greedy interval scheduling"
    ],
    correctAnswer: 2,
    explanation: "Divide-and-conquer algorithms that divide the problem into 2 halves and only recurse into one half (T(N) = T(N/2) + O(1)) produce logarithmic time."
  },
  {
    question: "What is log_2(16) + log_2(32)?",
    options: [
      "9",
      "20",
      "512",
      "8"
    ],
    correctAnswer: 0,
    explanation: "log_2(16) = 4 (since 2^4 = 16) and log_2(32) = 5 (since 2^5 = 32). 4 + 5 = 9. Alternatively, log_2(16 * 32) = log_2(512) = 9."
  },
  {
    question: "What is the key takeaway about logarithmic algorithms in modern computing?",
    options: [
      "They only work on arrays with fewer than 100 elements",
      "They scale extraordinarily well because exponential increases in dataset size result in only linear additions to step count",
      "They require infinite RAM to execute",
      "They are slower than linear algorithms for large N"
    ],
    correctAnswer: 1,
    explanation: "Logarithmic time is the gold standard of scalability: even if the dataset expands by a factor of 1,000,000, the step count only increases by ~20 operations."
  }
];

export default topic0_questions;
