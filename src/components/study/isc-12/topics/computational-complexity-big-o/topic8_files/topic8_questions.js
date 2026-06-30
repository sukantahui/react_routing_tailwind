const questions = [
  {
    question: "What is the time complexity of an algorithm that repeatedly divides the input by 2?",
    shortAnswer: "O(log n).",
    explanation: "The number of divisions is equal to the number of times you can halve n until reaching 1, which is log₂(n).",
    hint: "Count the iterations.",
    level: "basic",
    codeExample: "// while (n > 1) { n /= 2; } // O(log n)"
  },
  {
    question: "How many times can you halve n until you reach 1?",
    shortAnswer: "⌊log₂(n)⌋ times.",
    explanation: "After k halvings, n becomes n/2ᵏ. Set n/2ᵏ = 1 → k = log₂(n).",
    hint: "This is the definition of logarithm.",
    level: "basic",
    codeExample: "// steps = floor(log2(n))"
  },
  {
    question: "What is the number of halving steps for n = 1,000,000?",
    shortAnswer: "Approximately 20 (since 2^20 ≈ 1,048,576).",
    explanation: "log₂(1,000,000) ≈ 20.",
    hint: "2^10 = 1024, 2^20 ≈ 1M.",
    level: "basic",
    codeExample: "// steps = floor(log2(1e6)) + 1"
  },
  {
    question: "What is the time complexity of a loop where i doubles each iteration?",
    shortAnswer: "O(log n).",
    explanation: "The loop runs until i >= n, doubling each time, so the number of iterations is log₂(n).",
    hint: "Doubling is same as halving in reverse.",
    level: "intermediate",
    codeExample: "for (int i = 1; i < n; i *= 2) { ... } // O(log n)"
  },
  {
    question: "What is the time complexity of binary search?",
    shortAnswer: "O(log n) in the worst case.",
    explanation: "Each comparison halves the search space.",
    hint: "How many halvings?",
    level: "basic",
    codeExample: "// binary search uses halving"
  },
  {
    question: "How many steps does binary search take for an array of size 2^20?",
    shortAnswer: "At most 20 steps.",
    explanation: "2^20 elements require at most log₂(2^20) = 20 comparisons.",
    hint: "Power of two.",
    level: "basic",
    codeExample: "// 20 steps maximum"
  },
  {
    question: "What is the height of a balanced binary tree with 1,000,000 nodes?",
    shortAnswer: "Approximately 20 (since log₂(1,000,000) ≈ 20).",
    explanation: "Height is O(log n).",
    hint: "Balanced tree height ≈ log₂(n).",
    level: "intermediate",
    codeExample: "// height ≈ log2(1e6)"
  },
  {
    question: "What is the time complexity of the Euclidean algorithm?",
    shortAnswer: "O(log min(a,b)).",
    explanation: "The number of steps is logarithmic in the smaller input.",
    hint: "Based on Fibonacci numbers worst-case.",
    level: "advanced",
    codeExample: "// gcd(a,b) = gcd(b, a%b)"
  },
  {
    question: "What is the time complexity of fast exponentiation?",
    shortAnswer: "O(log n).",
    explanation: "The exponent is halved at each step.",
    hint: "Exponentiation by squaring.",
    level: "intermediate",
    codeExample: "// fastPow = O(log n)"
  },
  {
    question: "Is dividing by 3 also logarithmic?",
    shortAnswer: "Yes, it's O(log_3 n) = O(log n) (since base is constant).",
    explanation: "Any constant factor division gives logarithmic complexity.",
    hint: "Base doesn't matter in Big-O.",
    level: "intermediate",
    codeExample: "// while (n > 1) n /= 3; // O(log n)"
  },
  {
    question: "What is the number of halving steps for n = 1024?",
    shortAnswer: "10 steps.",
    explanation: "1024 → 512 → 256 → 128 → 64 → 32 → 16 → 8 → 4 → 2 → 1 (10 divisions).",
    hint: "2^10 = 1024.",
    level: "basic",
    codeExample: "// steps = log2(1024) = 10"
  },
  {
    question: "What is the space complexity of a recursive halving algorithm?",
    shortAnswer: "O(log n) due to recursion stack.",
    explanation: "Recursion depth equals the number of halving steps.",
    hint: "Each call adds a frame.",
    level: "intermediate",
    codeExample: "// recursive binary search uses O(log n) stack"
  },
  {
    question: "Why does halving produce logarithmic time?",
    shortAnswer: "Because the number of times you can halve n is log₂(n), which grows very slowly.",
    explanation: "The exponential reduction of size leads to logarithmic number of steps.",
    hint: "Repeated division by a constant factor.",
    level: "basic",
    codeExample: "// n/2^k = 1 => k = log2(n)"
  },
  {
    question: "What is the worst-case number of comparisons in binary search for n elements?",
    shortAnswer: "⌊log₂(n)⌋ + 1.",
    explanation: "Each comparison reduces the range by half until only one element remains.",
    hint: "Include the final check.",
    level: "intermediate",
    codeExample: "// max comparisons = floor(log2(n)) + 1"
  },
  {
    question: "What is the time complexity of the following loop: while (n > 0) { n /= 2; }?",
    shortAnswer: "O(log n).",
    explanation: "It runs log₂(n) times.",
    hint: "Halving loop.",
    level: "basic",
    codeExample: "// O(log n)"
  },
  {
    question: "Can you have O(log n) time without explicit halving?",
    shortAnswer: "Yes, any constant factor reduction (e.g., divide by 3, 4, etc.) gives O(log n).",
    explanation: "Even if the factor is not 2, the number of steps is logarithmic with a different base.",
    hint: "Base doesn't affect Big-O.",
    level: "intermediate",
    codeExample: "// divide by 10: O(log_10 n) = O(log n)"
  },
  {
    question: "How does halving relate to binary representation?",
    shortAnswer: "Each halving step corresponds to shifting right by one bit, revealing the binary digits.",
    explanation: "Repeatedly dividing by 2 is equivalent to counting bits.",
    hint: "Number of bits in an integer.",
    level: "intermediate",
    codeExample: "// while (n > 0) { bits++; n >>= 1; }"
  },
  {
    question: "What is the time complexity of finding the number of bits in an integer?",
    shortAnswer: "O(log n) (or O(1) using built-in methods).",
    explanation: "You can count bits by repeated halving, which is O(log n).",
    hint: "Bit operations can give O(1).",
    level: "intermediate",
    codeExample: "// Integer.bitCount(n)"
  },
  {
    question: "What is the time complexity of checking if a number is a power of two using halving?",
    shortAnswer: "O(log n) if using loop, O(1) using bit manipulation.",
    explanation: "You can halve until you get 1; that's O(log n).",
    hint: "Bitwise is better.",
    level: "intermediate",
    codeExample: "// (n & (n-1)) == 0"
  },
  {
    question: "Why is O(log n) considered very efficient for large n?",
    shortAnswer: "Because log₂(n) grows extremely slowly; for n up to 10^9, log₂(n) is only about 30.",
    explanation: "It's nearly constant for practical input sizes.",
    hint: "Compare to n.",
    level: "basic",
    codeExample: "// log2(1e9) ≈ 30"
  },
  {
    question: "What is the time complexity of an algorithm that halves the input but does O(n) work at each step?",
    shortAnswer: "O(n log n).",
    explanation: "The recurrence is T(n) = T(n/2) + O(n), which solves to O(n log n).",
    hint: "Master Theorem case.",
    level: "advanced",
    codeExample: "// Example: merge sort recurrence"
  },
  {
    question: "What is the time complexity of an algorithm that halves the input and does O(1) work at each step?",
    shortAnswer: "O(log n).",
    explanation: "T(n) = T(n/2) + O(1) → O(log n).",
    hint: "Binary search case.",
    level: "intermediate",
    codeExample: "// T(n) = T(n/2) + 1 -> O(log n)"
  },
  {
    question: "How many times can you halve 10^9?",
    shortAnswer: "About 30 times.",
    explanation: "2^30 ≈ 1.07 × 10^9.",
    hint: "log₂(10^9) ≈ 30.",
    level: "basic",
    codeExample: "// 30 steps"
  },
  {
    question: "What is the significance of the base 2 in halving?",
    shortAnswer: "It's the natural base when you divide by 2, but any base works; it's just a constant factor.",
    explanation: "log₂(n) vs log₃(n) differ by a constant factor, which Big-O ignores.",
    hint: "Change of base formula.",
    level: "basic",
    codeExample: "// O(log_2 n) = O(log_3 n)"
  },
  {
    question: "Can you have a halving problem in a linked list?",
    shortAnswer: "Yes, if you use a technique like skip lists or balanced trees built on linked lists.",
    explanation: "But standard singly linked list doesn't support random access, so binary search is O(n).",
    hint: "Structure matters.",
    level: "advanced",
    codeExample: "// Not directly"
  },
  {
    question: "What is the time complexity of finding the median using halving?",
    shortAnswer: "O(log n) if you have a balanced tree, but generally O(n) for arrays.",
    explanation: "Quickselect is O(n) on average; there is no O(log n) for unsorted arrays.",
    hint: "Not a halving problem.",
    level: "advanced",
    codeExample: "// Not applicable"
  },
  {
    question: "What is the time complexity of an algorithm that reduces the problem size by half but does O(log n) work per step?",
    shortAnswer: "O(log² n) (log n squared).",
    explanation: "T(n) = T(n/2) + O(log n) → O(log² n) by Master Theorem.",
    hint: "Work per level accumulates.",
    level: "advanced",
    codeExample: "// Not common"
  },
  {
    question: "How do you implement a halving loop in Java?",
    shortAnswer: "while (n > 0) { n /= 2; } or for (int i = 1; i < n; i *= 2).",
    explanation: "Either form gives O(log n) iterations.",
    hint: "Use division or multiplication.",
    level: "basic",
    codeExample: "// for (int i = 1; i < n; i *= 2) { ... }"
  },
  {
    question: "What is the time complexity of counting digits in a decimal number by repeated division by 10?",
    shortAnswer: "O(log₁₀ n) = O(log n).",
    explanation: "The number of digits is log₁₀(n)+1, which is O(log n).",
    hint: "Base 10 division.",
    level: "intermediate",
    codeExample: "// while (n > 0) { n /= 10; digits++; }"
  },
  {
    question: "What is the time complexity of the following code: for (int i = n; i > 0; i /= 2) { ... }?",
    shortAnswer: "O(log n).",
    explanation: "i is halved each iteration.",
    hint: "Halving in loop.",
    level: "basic",
    codeExample: "// O(log n)"
  },
  {
    question: "How many steps would it take to reduce a number from 10^12 to 1 by halving?",
    shortAnswer: "About 40 steps (since 2^40 ≈ 10^12).",
    explanation: "log₂(10^12) ≈ 40.",
    hint: "2^10 ≈ 10^3.",
    level: "intermediate",
    codeExample: "// 40 steps"
  }
];

export default questions;