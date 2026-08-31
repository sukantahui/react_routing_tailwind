const questions = [
  {
    question: "Why does binary search have O(log n) time complexity?",
    shortAnswer: "Because each step halves the search space, so the number of steps is log₂(n).",
    explanation: "After k steps, the remaining search space is n/2^k. We stop when it becomes 1, so k = log₂(n).",
    hint: "How many times can you halve n?",
    level: "basic",
    codeExample: "// while (low <= high) { mid = (low+high)/2; ... }"
  },
  {
    question: "What is the height of a balanced binary tree with n nodes?",
    shortAnswer: "O(log n) — it's approximately log₂(n).",
    explanation: "In a balanced tree, each level doubles the number of nodes, so height is logarithmic.",
    hint: "How many levels to accommodate n nodes?",
    level: "intermediate",
    codeExample: "// height ≈ log2(n)"
  },
  {
    question: "What is the time complexity of searching in a balanced BST?",
    shortAnswer: "O(log n) on average and worst-case if balanced.",
    explanation: "The search follows a path from root to leaf, which has length equal to tree height = O(log n).",
    hint: "Balanced tree height is logarithmic.",
    level: "intermediate",
    codeExample: "// tree search = O(log n)"
  },
  {
    question: "What is the time complexity of insertion/deletion in a binary heap?",
    shortAnswer: "O(log n).",
    explanation: "Heap operations require percolating up or down along the height of the tree, which is O(log n).",
    hint: "Heap is a complete binary tree.",
    level: "intermediate",
    codeExample: "// heap add/remove = O(log n)"
  },
  {
    question: "Why is O(log n) considered very efficient?",
    shortAnswer: "Because it grows extremely slowly — even for huge n, log₂(n) is small.",
    explanation: "For n=1,000,000, log₂(n)≈20; for n=1,000,000,000, log₂(n)≈30.",
    hint: "Compare with linear growth.",
    level: "basic",
    codeExample: "// log2(1e9) ≈ 30"
  },
  {
    question: "What is the number of steps in binary search for n=2^20?",
    shortAnswer: "20 steps in the worst case.",
    explanation: "log₂(2^20) = 20.",
    hint: "n is a power of 2.",
    level: "basic",
    codeExample: "// steps = log2(2^20) = 20"
  },
  {
    question: "What type of loop gives O(log n) time complexity?",
    shortAnswer: "A loop where the variable doubles (i *= 2) or halves (i /= 2) each iteration.",
    explanation: "These loops run logarithmically with respect to n.",
    hint: "Look at the variable growth pattern.",
    level: "intermediate",
    codeExample: "while (i < n) { i *= 2; } // O(log n)"
  },
  {
    question: "What is the time complexity of the Euclidean algorithm for GCD?",
    shortAnswer: "O(log min(a,b)).",
    explanation: "Each step reduces the numbers significantly; the number of steps is proportional to log of the smaller number.",
    hint: "Uses modulo operation.",
    level: "advanced",
    codeExample: "// gcd(a,b) = gcd(b, a%b)"
  },
  {
    question: "Why does O(log n) appear in divide-and-conquer algorithms?",
    shortAnswer: "Because the problem is divided into smaller subproblems, often by half, leading to logarithmic depth.",
    explanation: "If at each level you divide the problem size by a constant factor, the number of levels is O(log n).",
    hint: "Think of recursion tree depth.",
    level: "intermediate",
    codeExample: "// T(n) = T(n/2) + O(1) → O(log n)"
  },
  {
    question: "What is the time complexity of finding an element in a hash table (average)?",
    shortAnswer: "O(1) — constant time.",
    explanation: "Hash tables use a hash function to directly index the bucket, so it's O(1) on average.",
    hint: "Not O(log n), but often confused.",
    level: "intermediate",
    codeExample: "// map.get(key) is O(1) average"
  },
  {
    question: "What is the time complexity of finding an element in a sorted array using linear search?",
    shortAnswer: "O(n) — linear.",
    explanation: "Even though the array is sorted, linear search checks each element until found.",
    hint: "Sortedness doesn't help linear search.",
    level: "basic",
    codeExample: "// for (int x : arr) if (x == target) ... // O(n)"
  },
  {
    question: "How many comparisons does binary search need for n=1,000,000?",
    shortAnswer: "At most 20 comparisons.",
    explanation: "log₂(1,000,000) ≈ 20.",
    hint: "2^20 ≈ 1,048,576.",
    level: "basic",
    codeExample: "// steps = floor(log2(1e6)) + 1"
  },
  {
    question: "What is the recurrence for binary search?",
    shortAnswer: "T(n) = T(n/2) + O(1), which solves to O(log n).",
    explanation: "Each recursive call halves the input and does O(1) work.",
    hint: "Constant work per level.",
    level: "intermediate",
    codeExample: "// T(n) = T(n/2) + 1"
  },
  {
    question: "What is the space complexity of binary search (iterative)?",
    shortAnswer: "O(1) — constant.",
    explanation: "It uses only a few variables (low, high, mid).",
    hint: "No recursion stack.",
    level: "basic",
    codeExample: "// O(1) space"
  },
  {
    question: "What is the space complexity of binary search (recursive)?",
    shortAnswer: "O(log n) due to recursion stack.",
    explanation: "The recursion depth is O(log n), so stack space is O(log n).",
    hint: "Each call adds a frame.",
    level: "intermediate",
    codeExample: "// recursion depth = O(log n)"
  },
  {
    question: "What is the time complexity of a balanced tree insertion?",
    shortAnswer: "O(log n) on average and worst-case for balanced trees.",
    explanation: "You traverse from root to leaf, visiting O(log n) nodes.",
    hint: "Height is logarithmic.",
    level: "intermediate",
    codeExample: "// tree insert = O(log n)"
  },
  {
    question: "How does the concept of halving relate to logarithms?",
    shortAnswer: "The number of times you can halve n until you reach 1 is log₂(n).",
    explanation: "This is the definition of logarithm.",
    hint: "Repeated division by 2.",
    level: "basic",
    codeExample: "// while (n > 1) { n /= 2; count++; }"
  },
  {
    question: "What is the time complexity of finding the maximum in a binary heap?",
    shortAnswer: "O(1) — the maximum is at the root.",
    explanation: "In a max-heap, the largest element is always at index 0.",
    hint: "Root access is constant.",
    level: "intermediate",
    codeExample: "// heap[0] is max"
  },
  {
    question: "Why is O(log n) often the best possible for comparison-based search?",
    shortAnswer: "Because in the worst case, you need to examine enough elements to determine the position, and there are n possibilities requiring at least log₂(n) comparisons.",
    explanation: "The decision tree of comparisons has n leaves, so minimum depth is log₂(n).",
    hint: "Information theory lower bound.",
    level: "advanced",
    codeExample: "// Not code-specific"
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
    question: "What is the time complexity of an algorithm that repeatedly divides by 3?",
    shortAnswer: "O(log_3 n) = O(log n) (since base is constant).",
    explanation: "Division by a constant factor gives logarithmic complexity with base of that factor.",
    hint: "Base doesn't affect Big-O.",
    level: "intermediate",
    codeExample: "// while (n > 1) n /= 3; // O(log n)"
  },
  {
    question: "What is the time complexity of finding an element in a skip list?",
    shortAnswer: "O(log n) average.",
    explanation: "Skip lists use multiple levels to skip elements, achieving O(log n) search.",
    hint: "It's like a randomized balanced tree.",
    level: "advanced",
    codeExample: "// Not code-specific"
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
    question: "How do you recognize O(log n) in code?",
    shortAnswer: "Look for loops where the iteration variable is multiplied or divided by a constant.",
    explanation: "E.g., for (int i = 1; i < n; i *= 2) or while (n > 0) { n /= 2; }.",
    hint: "Variable grows or shrinks exponentially.",
    level: "intermediate",
    codeExample: "// for (int i = 1; i < n; i *= 2) { ... }"
  },
  {
    question: "Why is binary search preferred over linear search for large datasets?",
    shortAnswer: "Binary search is O(log n), linear search is O(n), so binary search is much faster for large n.",
    explanation: "For n=1 million, binary search does 20 comparisons vs 1 million for linear.",
    hint: "Compare growth rates.",
    level: "basic",
    codeExample: "// Binary search is far superior for large n."
  },
  {
    question: "What is the time complexity of the power function using fast exponentiation?",
    shortAnswer: "O(log n).",
    explanation: "Fast exponentiation reduces the exponent by half each step.",
    hint: "Also called exponentiation by squaring.",
    level: "intermediate",
    codeExample: "// fastPow = O(log n)"
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
    question: "What is the time complexity of checking if a number is a power of two?",
    shortAnswer: "O(1) using bit manipulation: (n & (n-1)) == 0.",
    explanation: "A power of two has exactly one bit set.",
    hint: "Use bitwise AND.",
    level: "intermediate",
    codeExample: "// (n & (n-1)) == 0"
  },
  {
    question: "What is the time complexity of the Sieve of Eratosthenes?",
    shortAnswer: "O(n log log n) — close to linear.",
    explanation: "Not O(log n), but often discussed in complexity context.",
    hint: "Different from typical O(log n).",
    level: "advanced",
    codeExample: "// Not O(log n)"
  },
  {
    question: "Why does O(log n) appear so frequently in algorithms that use trees?",
    shortAnswer: "Because trees naturally divide the data into halves (or parts) at each level.",
    explanation: "The height of a balanced tree is logarithmic in the number of nodes.",
    hint: "Tree structure leads to logarithmic depth.",
    level: "intermediate",
    codeExample: "// Tree operations = O(height) = O(log n)"
  }
];

export default questions;