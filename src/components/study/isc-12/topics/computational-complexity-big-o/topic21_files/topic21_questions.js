const questions = [
  {
    question: "What does O(log n) mean in time complexity?",
    shortAnswer: "Logarithmic time — the runtime grows very slowly as input size increases.",
    explanation: "The runtime is proportional to log₂(n), which grows slowly (e.g., log₂(1e9) ≈ 30).",
    hint: "Think of halving the input each step.",
    level: "basic",
    codeExample: "// while (low <= high) { mid = (low+high)/2; ... }"
  },
  {
    question: "What is an example of an O(log n) algorithm?",
    shortAnswer: "Binary search on a sorted array.",
    explanation: "Each step halves the search space.",
    hint: "Searching in a sorted list.",
    level: "basic",
    codeExample: "// binary search"
  },
  {
    question: "Why is binary search O(log n)?",
    shortAnswer: "Because each comparison halves the remaining search space.",
    explanation: "After k comparisons, the remaining size is n/2ᵏ. We stop when it's 1, so k = log₂(n).",
    hint: "Halving.",
    level: "basic",
    codeExample: "// n/2^k = 1 → k = log2(n)"
  },
  {
    question: "What is the time complexity of searching in a balanced BST?",
    shortAnswer: "O(log n) on average and worst-case for balanced trees.",
    explanation: "The height of a balanced BST is O(log n), so search follows a path of that length.",
    hint: "Balanced tree height.",
    level: "intermediate",
    codeExample: "// tree.search(key)"
  },
  {
    question: "What is the time complexity of insertion/deletion in a binary heap?",
    shortAnswer: "O(log n).",
    explanation: "Heap operations require percolating up or down the height of the tree, which is O(log n).",
    hint: "Heap is a complete binary tree.",
    level: "intermediate",
    codeExample: "// heap.add(element); heap.poll();"
  },
  {
    question: "What is the time complexity of the Euclidean algorithm (GCD)?",
    shortAnswer: "O(log min(a,b)).",
    explanation: "Each step reduces the numbers significantly; the number of steps is logarithmic.",
    hint: "Modulo operation.",
    level: "advanced",
    codeExample: "// gcd(a,b) = gcd(b, a%b)"
  },
  {
    question: "How many steps does binary search take for n=1,000,000?",
    shortAnswer: "At most 20 comparisons.",
    explanation: "log₂(1,000,000) ≈ 20.",
    hint: "2^20 ≈ 1,048,576.",
    level: "basic",
    codeExample: "// steps = floor(log2(1e6)) + 1"
  },
  {
    question: "What is the recurrence for binary search?",
    shortAnswer: "T(n) = T(n/2) + O(1), which solves to O(log n).",
    explanation: "Each recursive call halves the input and does constant work.",
    hint: "Constant work per level.",
    level: "intermediate",
    codeExample: "// T(n) = T(n/2) + 1"
  },
  {
    question: "What is the space complexity of recursive binary search?",
    shortAnswer: "O(log n) — due to recursion stack.",
    explanation: "The recursion depth is O(log n), so stack space is O(log n).",
    hint: "Recursion depth.",
    level: "intermediate",
    codeExample: "// recursion depth = O(log n)"
  },
  {
    question: "Is O(log n) faster than O(n)?",
    shortAnswer: "Yes, O(log n) is much faster for large n.",
    explanation: "For n=1e6, log₂(n) ≈ 20, while O(n) would be 1,000,000 operations.",
    hint: "Compare growth rates.",
    level: "basic",
    codeExample: "// O(log n) << O(n)"
  },
  {
    question: "What is the time complexity of a loop that doubles the variable each iteration?",
    shortAnswer: "O(log n) — logarithmic.",
    explanation: "The loop runs until i >= n, and i doubles each time, so iterations = log₂(n).",
    hint: "Doubling.",
    level: "basic",
    codeExample: "for (int i = 1; i < n; i *= 2) { ... }"
  },
  {
    question: "What is the time complexity of a loop that halves the variable each iteration?",
    shortAnswer: "O(log n) — logarithmic.",
    explanation: "The loop runs until i becomes 0, and i halves each time, so iterations = log₂(n).",
    hint: "Halving.",
    level: "basic",
    codeExample: "while (n > 0) { n /= 2; }"
  },
  {
    question: "Can O(log n) be achieved without sorting?",
    shortAnswer: "Not for arbitrary data; you need a data structure that partitions data (like a tree).",
    explanation: "Logarithmic time relies on the ability to discard large portions of the data.",
    hint: "Data must be organized.",
    level: "intermediate",
    codeExample: "// sorted array or balanced tree"
  },
  {
    question: "What is the time complexity of a skip list search?",
    shortAnswer: "O(log n) average.",
    explanation: "Skip lists use multiple levels to skip elements, achieving O(log n) search.",
    hint: "Randomized balanced structure.",
    level: "advanced",
    codeExample: "// skip list"
  },
  {
    question: "Why does O(log n) appear in divide-and-conquer algorithms?",
    shortAnswer: "Because the problem is divided into smaller subproblems, often by half, leading to logarithmic depth.",
    explanation: "If at each level you divide the problem size by a constant factor, the number of levels is O(log n).",
    hint: "Recursion depth.",
    level: "intermediate",
    codeExample: "// T(n) = T(n/2) + O(1) → O(log n)"
  },
  {
    question: "What is the time complexity of checking if a number is a power of two using bit manipulation?",
    shortAnswer: "O(1) — not O(log n).",
    explanation: "Bit manipulation is constant time.",
    hint: "Bitwise.",
    level: "intermediate",
    codeExample: "// (n & (n-1)) == 0"
  },
  {
    question: "What is the height of a complete binary tree with n nodes?",
    shortAnswer: "⌊log₂(n)⌋.",
    explanation: "In a complete binary tree, the height is the floor of log₂(n).",
    hint: "Balanced property.",
    level: "intermediate",
    codeExample: "// height = floor(log2(n))"
  },
  {
    question: "How does O(log n) compare to O(n) for n=10^9?",
    shortAnswer: "O(log n) is about 30 steps, O(n) is 1 billion steps.",
    explanation: "log₂(10^9) ≈ 30.",
    hint: "Huge difference.",
    level: "basic",
    codeExample: "// 30 vs 1,000,000,000"
  },
  {
    question: "Can an O(log n) algorithm be slower than an O(n) algorithm for small n?",
    shortAnswer: "Yes, because of constant factors and overhead.",
    explanation: "For small n, the constant factor in O(log n) might be larger than O(n).",
    hint: "Constants matter.",
    level: "intermediate",
    codeExample: "// Depends on implementation."
  },
  {
    question: "What is the time complexity of finding the maximum in a binary heap?",
    shortAnswer: "O(1) — the maximum is at the root.",
    explanation: "In a max-heap, the largest element is always at index 0.",
    hint: "Root access.",
    level: "intermediate",
    codeExample: "// heap[0] is max"
  },
  {
    question: "What is the time complexity of searching in an unbalanced BST?",
    shortAnswer: "O(n) in the worst case (skewed tree).",
    explanation: "If the tree is unbalanced, search can degenerate to O(n).",
    hint: "Skewed tree.",
    level: "intermediate",
    codeExample: "// worst-case unbalanced BST"
  },
  {
    question: "What is the time complexity of fast exponentiation?",
    shortAnswer: "O(log n).",
    explanation: "Fast exponentiation reduces the exponent by half each step.",
    hint: "Also called exponentiation by squaring.",
    level: "advanced",
    codeExample: "// fastPow = O(log n)"
  },
  {
    question: "What is the time complexity of a balanced tree insertion?",
    shortAnswer: "O(log n) — because you traverse from root to leaf.",
    explanation: "You visit O(log n) nodes.",
    hint: "Height is logarithmic.",
    level: "intermediate",
    codeExample: "// tree insert = O(log n)"
  },
  {
    question: "Why is O(log n) often considered 'nearly constant'?",
    shortAnswer: "Because log₂(n) grows very slowly; for n up to 10⁹, it's only about 30.",
    explanation: "For practical input sizes, it's almost constant time.",
    hint: "Slow growth.",
    level: "basic",
    codeExample: "// log2(1e9) ≈ 30"
  },
  {
    question: "What is the time complexity of the Master Theorem case for T(n) = T(n/2) + O(1)?",
    shortAnswer: "O(log n).",
    explanation: "This is the standard case for binary search.",
    hint: "a=1, b=2, f(n)=O(1).",
    level: "advanced",
    codeExample: "// T(n) = T(n/2) + 1 → O(log n)"
  },
  {
    question: "Can O(log n) be achieved in an unsorted array?",
    shortAnswer: "No, without sorting, you cannot do better than O(n) for search.",
    explanation: "Binary search requires the array to be sorted.",
    hint: "Sortedness is prerequisite.",
    level: "basic",
    codeExample: "// cannot binary search unsorted"
  },
  {
    question: "What is the time complexity of the Sieve of Eratosthenes?",
    shortAnswer: "O(n log log n) — not O(log n).",
    explanation: "It's nearly linear, but not logarithmic.",
    hint: "Different class.",
    level: "advanced",
    codeExample: "// Not O(log n)"
  },
  {
    question: "What is the time complexity of a while loop that divides by 2 each time?",
    shortAnswer: "O(log n).",
    explanation: "Number of iterations = log₂(n).",
    hint: "Divide and conquer.",
    level: "basic",
    codeExample: "while (n > 1) { n /= 2; }"
  },
  {
    question: "What is the time complexity of a loop that multiplies by 2 each time?",
    shortAnswer: "O(log n).",
    explanation: "Number of iterations = log₂(n).",
    hint: "Doubling.",
    level: "basic",
    codeExample: "for (int i = 1; i < n; i *= 2) { ... }"
  },
  {
    question: "What is the time complexity of counting the number of bits in an integer?",
    shortAnswer: "O(log n) — the number of bits is log₂(n).",
    explanation: "The number of bits is proportional to log₂(n).",
    hint: "Bits = log₂(n).",
    level: "intermediate",
    codeExample: "while (n > 0) { count++; n >>= 1; }"
  },
  {
    question: "What is the time complexity of finding an element in a balanced binary tree?",
    shortAnswer: "O(log n).",
    explanation: "The height of the tree is O(log n), so search is O(log n).",
    hint: "Tree height.",
    level: "intermediate",
    codeExample: "// balanced BST search"
  }
];

export default questions;