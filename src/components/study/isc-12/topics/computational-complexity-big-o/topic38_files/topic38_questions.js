const questions = [
  {
    question: "What is the recurrence for the Euclidean algorithm?",
    shortAnswer: "T(a,b) = T(b, a % b) + O(1), T(a, 0) = O(1)",
    explanation: "Each step reduces the pair (a,b) to (b, a%b) with constant work.",
    hint: "Modulo operation reduces the numbers.",
    level: "basic",
    codeExample: "// T(a,b) = T(b, a%b) + 1"
  },
  {
    question: "What is the time complexity of the Euclidean algorithm?",
    shortAnswer: "O(log min(a,b)) — logarithmic time.",
    explanation: "The numbers decrease exponentially, so the number of steps is O(log min(a,b)).",
    hint: "Exponential decrease.",
    level: "intermediate",
    codeExample: "// O(log min(a,b))"
  },
  {
    question: "What is the worst-case input for the Euclidean algorithm?",
    shortAnswer: "Consecutive Fibonacci numbers (Fₖ, Fₖ₊₁).",
    explanation: "Fibonacci numbers produce the maximum number of steps for a given size.",
    hint: "Fibonacci numbers.",
    level: "advanced",
    codeExample: "// gcd(Fₖ, Fₖ₊₁)"
  },
  {
    question: "How many steps does the Euclidean algorithm take for consecutive Fibonacci numbers?",
    shortAnswer: "k steps for Fₖ and Fₖ₊₁.",
    explanation: "gcd(Fₖ, Fₖ₊₁) = 1 and takes k steps.",
    hint: "k steps.",
    level: "advanced",
    codeExample: "// gcd(Fₖ, Fₖ₊₁) takes k steps"
  },
  {
    question: "What is the space complexity of the recursive Euclidean algorithm?",
    shortAnswer: "O(log min(a,b)) — due to recursion stack depth.",
    explanation: "The recursion depth is O(log min(a,b)).",
    hint: "Depth = log n.",
    level: "intermediate",
    codeExample: "// O(log min(a,b)) space"
  },
  {
    question: "What is the space complexity of the iterative Euclidean algorithm?",
    shortAnswer: "O(1) — constant space.",
    explanation: "Iterative version uses only a few variables.",
    hint: "No recursion stack.",
    level: "basic",
    codeExample: "// O(1) space"
  },
  {
    question: "What is the base case for the Euclidean algorithm?",
    shortAnswer: "gcd(a, 0) = a.",
    explanation: "When one number becomes 0, the other is the GCD.",
    hint: "b == 0 → return a.",
    level: "basic",
    codeExample: "// if (b == 0) return a;"
  },
  {
    question: "Why is the Euclidean algorithm efficient?",
    shortAnswer: "Because the numbers decrease exponentially with each modulo operation.",
    explanation: "Each step reduces the pair to (b, a % b) which is much smaller.",
    hint: "Exponential decrease.",
    level: "intermediate",
    codeExample: "// numbers shrink rapidly"
  },
  {
    question: "Can the Euclidean algorithm be used for negative numbers?",
    shortAnswer: "Yes, by taking absolute values first.",
    explanation: "gcd(-a, b) = gcd(a, b) for positive a,b.",
    hint: "Use Math.abs.",
    level: "intermediate",
    codeExample: "// gcd(Math.abs(a), Math.abs(b))"
  },
  {
    question: "What is the extended Euclidean algorithm?",
    shortAnswer: "It computes gcd and also finds coefficients x,y such that ax + by = gcd(a,b).",
    explanation: "Used for modular inverses in cryptography.",
    hint: "Also finds x and y.",
    level: "advanced",
    codeExample: "// extendedEuclid(a, b)"
  },
  {
    question: "What is the time complexity of the extended Euclidean algorithm?",
    shortAnswer: "O(log min(a,b)) — same as the Euclidean algorithm.",
    explanation: "It adds constant work at each step, so the time complexity is unchanged.",
    hint: "Same as GCD.",
    level: "advanced",
    codeExample: "// O(log min(a,b))"
  },
  {
    question: "What is the recurrence for the Euclidean algorithm in terms of steps?",
    shortAnswer: "T(n) = T(n mod m) + O(1) where n ≥ m.",
    explanation: "The number of steps is determined by how quickly the numbers decrease.",
    hint: "Modulo reduction.",
    level: "advanced",
    codeExample: "// T(a,b) = T(b, a%b) + 1"
  },
  {
    question: "Why is the Euclidean algorithm important in number theory?",
    shortAnswer: "Because it's the foundation for many number-theoretic algorithms, including modular inverses.",
    explanation: "It's used in RSA, cryptography, and solving Diophantine equations.",
    hint: "Foundation of many algorithms.",
    level: "advanced",
    codeExample: "// number theory"
  },
  {
    question: "What is the GCD of 48 and 18?",
    shortAnswer: "6.",
    explanation: "48 % 18 = 12, 18 % 12 = 6, 12 % 6 = 0 → gcd = 6.",
    hint: "6.",
    level: "basic",
    codeExample: "// gcd(48,18) = 6"
  },
  {
    question: "What is the GCD of 100 and 25?",
    shortAnswer: "25.",
    explanation: "100 % 25 = 0 → gcd = 25.",
    hint: "25.",
    level: "basic",
    codeExample: "// gcd(100,25) = 25"
  },
  {
    question: "What is the GCD of 17 and 13?",
    shortAnswer: "1.",
    explanation: "17 and 13 are coprime, so gcd = 1.",
    hint: "1.",
    level: "basic",
    codeExample: "// gcd(17,13) = 1"
  },
  {
    question: "How many steps for gcd(100, 1)?",
    shortAnswer: "1 step.",
    explanation: "100 % 1 = 0 immediately, so 1 step.",
    hint: "1 step.",
    level: "basic",
    codeExample: "// 1 step"
  },
  {
    question: "How many steps for gcd(100, 99)?",
    shortAnswer: "About 11 steps.",
    explanation: "100 and 99 are consecutive numbers, which take O(log n) steps.",
    hint: "~11 steps.",
    level: "intermediate",
    codeExample: "// ~log(100) steps"
  },
  {
    question: "What is the maximum number of steps for numbers ≤ 10^9?",
    shortAnswer: "About 45 steps (Fibonacci bound).",
    explanation: "The number of steps is at most log_phi(10^9) ≈ 45.",
    hint: "~45 steps.",
    level: "advanced",
    codeExample: "// ~45 steps"
  },
  {
    question: "What is the recurrence for the Euclidean algorithm if a < b?",
    shortAnswer: "T(a,b) = T(b,a) — the algorithm swaps them.",
    explanation: "If a < b, the first step computes a % b = a, so it's effectively swapped.",
    hint: "Swap.",
    level: "intermediate",
    codeExample: "// if (a < b) swap"
  },
  {
    question: "What is the time complexity of gcd in Java's BigInteger?",
    shortAnswer: "O(log n) — uses the Euclidean algorithm.",
    explanation: "BigInteger.gcd() implements the Euclidean algorithm.",
    hint: "O(log n).",
    level: "intermediate",
    codeExample: "// BigInteger.gcd()"
  },
  {
    question: "Is the Euclidean algorithm faster than prime factorization for GCD?",
    shortAnswer: "Yes, prime factorization is O(√n) or worse; Euclidean is O(log n).",
    explanation: "Euclidean algorithm is much faster than factoring.",
    hint: "Much faster.",
    level: "intermediate",
    codeExample: "// Euclidean vs factorization"
  },
  {
    question: "Can the Euclidean algorithm be parallelized?",
    shortAnswer: "Not easily, because each step depends on the previous result.",
    explanation: "The algorithm is inherently sequential.",
    hint: "Sequential.",
    level: "advanced",
    codeExample: "// not parallelizable"
  },
  {
    question: "What is the recurrence for the number of steps in the worst case?",
    shortAnswer: "S(n) = S(n-1) + 1, where n is the Fibonacci index.",
    explanation: "The worst-case steps grow linearly with the Fibonacci index.",
    hint: "Fibonacci index.",
    level: "advanced",
    codeExample: "// S(F_k) = k"
  },
  {
    question: "What is the relationship between the Euclidean algorithm and the Fibonacci numbers?",
    shortAnswer: "Fibonacci numbers produce the worst-case number of steps.",
    explanation: "gcd(Fₖ, Fₖ₊₁) takes k steps.",
    hint: "Worst-case.",
    level: "advanced",
    codeExample: "// Fibonacci worst-case"
  },
  {
    question: "Why does the Euclidean algorithm use modulo instead of subtraction?",
    shortAnswer: "Modulo reduces the numbers much faster, giving O(log n) instead of O(n).",
    explanation: "Subtraction would take O(n) steps; modulo takes O(log n).",
    hint: "Faster.",
    level: "intermediate",
    codeExample: "// modulo is faster"
  },
  {
    question: "What is the time complexity of the Euclidean algorithm with subtraction?",
    shortAnswer: "O(n) — linear time.",
    explanation: "Subtraction reduces the numbers by the smaller value each time.",
    hint: "O(n).",
    level: "intermediate",
    codeExample: "// O(n) for subtraction"
  },
  {
    question: "Can the Euclidean algorithm be used for polynomials?",
    shortAnswer: "Yes, the Euclidean algorithm works for polynomials as well.",
    explanation: "It generalizes to Euclidean domains like polynomials.",
    hint: "Polynomials.",
    level: "advanced",
    codeExample: "// polynomial gcd"
  },
  {
    question: "What is the time complexity of the Euclidean algorithm for polynomials?",
    shortAnswer: "O(log n) in the degree, similar to the integer case.",
    explanation: "The number of steps is O(log d) where d is the degree.",
    hint: "O(log d).",
    level: "advanced",
    codeExample: "// O(log degree)"
  },
  {
    question: "What is the space complexity of the iterative Euclidean algorithm with BigInteger?",
    shortAnswer: "O(log n) for the BigInteger objects, but O(1) auxiliary space.",
    explanation: "BigInteger objects themselves store the numbers; auxiliary space is constant.",
    hint: "O(1) auxiliary.",
    level: "advanced",
    codeExample: "// O(1) auxiliary"
  },
  {
    question: "What is the recurrence for the Euclidean algorithm in the average case?",
    shortAnswer: "O(log n) — the same as worst-case.",
    explanation: "The average number of steps is also logarithmic.",
    hint: "Average is also O(log n).",
    level: "advanced",
    codeExample: "// Θ(log n) average"
  }
];

export default questions;