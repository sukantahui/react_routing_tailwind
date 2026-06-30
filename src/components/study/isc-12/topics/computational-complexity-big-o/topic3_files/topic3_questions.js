const questions = [
  {
    question: "What is an exponent?",
    shortAnswer: "A number that indicates how many times a base is multiplied by itself.",
    explanation: "For example, in 2³, 2 is the base and 3 is the exponent. It means 2 × 2 × 2 = 8.",
    hint: "Think of repeated multiplication.",
    level: "basic",
    codeExample: "// 2^3 = 8"
  },
  {
    question: "What is 2⁰ equal to?",
    shortAnswer: "1 (for any non-zero base).",
    explanation: "Any number raised to the power of 0 equals 1, by definition.",
    hint: "Remember the exponent rule b⁰ = 1.",
    level: "basic",
    codeExample: "// 2^0 = 1"
  },
  {
    question: "What is the rule for multiplying powers with the same base?",
    shortAnswer: "Add the exponents: bᵐ × bⁿ = bᵐ⁺ⁿ.",
    explanation: "For example, 2³ × 2⁴ = 2⁷ = 128.",
    hint: "When multiplying, keep the base and sum exponents.",
    level: "basic",
    codeExample: "// 2^3 * 2^4 = 2^(3+4) = 2^7"
  },
  {
    question: "What is the rule for dividing powers with the same base?",
    shortAnswer: "Subtract the exponents: bᵐ ÷ bⁿ = bᵐ⁻ⁿ.",
    explanation: "For example, 2⁵ ÷ 2² = 2³ = 8.",
    hint: "When dividing, subtract exponents.",
    level: "basic",
    codeExample: "// 2^5 / 2^2 = 2^(5-2) = 2^3"
  },
  {
    question: "What is the power of a power rule?",
    shortAnswer: "(bᵐ)ⁿ = bᵐⁿ — multiply exponents.",
    explanation: "For example, (2³)² = 2⁶ = 64.",
    hint: "Multiply the exponents when you raise a power to another power.",
    level: "basic",
    codeExample: "// (2^3)^2 = 2^(3*2) = 2^6"
  },
  {
    question: "What does a negative exponent mean?",
    shortAnswer: "It represents the reciprocal: b⁻ⁿ = 1/bⁿ.",
    explanation: "For example, 2⁻³ = 1/8 = 0.125.",
    hint: "Negative exponent means invert the base.",
    level: "intermediate",
    codeExample: "// 2^-3 = 1/(2^3) = 1/8"
  },
  {
    question: "Why is 2ⁿ considered exponential growth?",
    shortAnswer: "Because the value doubles with each increment of n, growing very fast.",
    explanation: "For n=10, 2¹⁰=1024; for n=20, 2²⁰≈1 million; for n=30, 2³⁰≈1 billion.",
    hint: "Think about doubling each time.",
    level: "basic",
    codeExample: "// 2^n grows extremely fast"
  },
  {
    question: "How is exponentiation related to logarithms?",
    shortAnswer: "Logarithms are the inverse of exponentiation: log_b(x) = y means b^y = x.",
    explanation: "If you know the result and base, the logarithm gives you the exponent.",
    hint: "They undo each other.",
    level: "intermediate",
    codeExample: "// log2(8) = 3 because 2^3 = 8"
  },
  {
    question: "What is exponentiation by squaring (fast exponentiation)?",
    shortAnswer: "An algorithm that computes b^n in O(log n) time using divide-and-conquer.",
    explanation: "It reduces the exponent by half each step, using the identity b^(2k) = (b^k)^2.",
    hint: "Recursively square the base when exponent is even.",
    level: "advanced",
    codeExample: "// fastPow(2,10) = 1024"
  },
  {
    question: "What is the time complexity of the naive loop for computing b^n?",
    shortAnswer: "O(n) — linear time.",
    explanation: "You multiply the base n times.",
    hint: "Count the number of multiplications.",
    level: "intermediate",
    codeExample: "for (int i=0; i<n; i++) result *= base;"
  },
  {
    question: "What is the time complexity of fast exponentiation?",
    shortAnswer: "O(log n) — logarithmic time.",
    explanation: "The exponent is halved each step, so the number of steps is proportional to log₂(n).",
    hint: "Think of binary representation of exponent.",
    level: "intermediate",
    codeExample: "// fastPow does O(log n) multiplications"
  },
  {
    question: "Why is 2^60 too large for an int in Java?",
    shortAnswer: "Because the maximum int is about 2.1×10⁹, while 2⁶⁰ ≈ 1.15×10¹⁸, which overflows.",
    explanation: "An int is 32-bit signed, max value 2³¹-1. 2⁶⁰ requires 61 bits.",
    hint: "Use long or BigInteger for large exponents.",
    level: "intermediate",
    codeExample: "// int max = 2^31-1; 2^60 exceeds that"
  },
  {
    question: "How can you compute powers of 2 efficiently in Java?",
    shortAnswer: "Using bit shifting: 1L << n gives 2ⁿ for n up to 62.",
    explanation: "Left shift by n multiplies by 2ⁿ, and it's extremely fast.",
    hint: "Bit operations are optimized by the CPU.",
    level: "intermediate",
    codeExample: "long powerOfTwo = 1L << 10; // 1024"
  },
  {
    question: "What is the value of 2^31 - 1?",
    shortAnswer: "2,147,483,647 — the maximum value of a signed 32-bit integer.",
    explanation: "This is a common limit in programming.",
    hint: "It's the maximum int in Java.",
    level: "basic",
    codeExample: "// Integer.MAX_VALUE"
  },
  {
    question: "What is the value of 2^63 - 1?",
    shortAnswer: "9,223,372,036,854,775,807 — the maximum value of a signed 64-bit long.",
    explanation: "This is the limit of long in Java.",
    hint: "Use BigInteger for anything larger.",
    level: "intermediate",
    codeExample: "// Long.MAX_VALUE"
  },
  {
    question: "How do exponents relate to algorithm complexity classes?",
    shortAnswer: "Exponents define growth rates: O(n²) is polynomial (exponent 2), O(2ⁿ) is exponential (variable in exponent).",
    explanation: "Algorithms with exponential time become infeasible for moderate n.",
    hint: "Compare n² and 2ⁿ for n=10, 20, 30.",
    level: "intermediate",
    codeExample: "// O(2^n) vs O(n^2)"
  },
  {
    question: "What is the difference between 2^n and n^2?",
    shortAnswer: "2^n has the variable in the exponent; n^2 has the variable in the base. For large n, 2^n is much larger.",
    explanation: "For n=10: 2¹⁰=1024, 10²=100. For n=20: 2²⁰≈1M, 20²=400.",
    hint: "Exponential beats polynomial for large n.",
    level: "intermediate",
    codeExample: "// 2^n vs n^2"
  },
  {
    question: "What is the exponent rule for a product of powers with different bases?",
    shortAnswer: "There is no simple rule; you multiply separately: a^m * b^n stays as is.",
    explanation: "You cannot combine bases unless they are the same.",
    hint: "Only same bases can be combined.",
    level: "basic",
    codeExample: "// 2^3 * 3^2 = 8 * 9 = 72"
  },
  {
    question: "What is the exponent rule for a power of a product?",
    shortAnswer: "(a*b)^n = a^n * b^n.",
    explanation: "Distribute the exponent over multiplication.",
    hint: "Power of a product equals product of powers.",
    level: "intermediate",
    codeExample: "(2*3)^2 = 2^2 * 3^2 = 4*9 = 36"
  },
  {
    question: "What is the exponent rule for a power of a fraction?",
    shortAnswer: "(a/b)^n = a^n / b^n.",
    explanation: "Raise both numerator and denominator to the power.",
    hint: "Apply exponent to both parts.",
    level: "intermediate",
    codeExample: "(2/3)^2 = 4/9"
  },
  {
    question: "How do you compute the exponent when you know the result and base?",
    shortAnswer: "Use logarithms: exponent = log_base(result).",
    explanation: "For example, log₂(8) = 3.",
    hint: "Logarithms are the inverse of exponentiation.",
    level: "intermediate",
    codeExample: "// Math.log(8) / Math.log(2) = 3"
  },
  {
    question: "What is the significance of powers of 2 in computer science?",
    shortAnswer: "Computers use binary, so powers of 2 appear everywhere: memory sizes, bit masks, cache lines.",
    explanation: "2¹⁰=1024 is a kilobyte, 2²⁰=1,048,576 is a megabyte, etc.",
    hint: "Think about memory units.",
    level: "basic",
    codeExample: "// 1 MB = 1024 KB = 2^20 bytes"
  },
  {
    question: "What is the maximum n for which 2^n fits in a 64-bit long?",
    shortAnswer: "n ≤ 63, because 2⁶³ is the largest power of 2 that fits (2⁶³-1 is max).",
    explanation: "A signed long has 63 bits for magnitude, so 2⁶³ fits, but 2⁶⁴ overflows.",
    hint: "Long.MAX_VALUE = 2^63 - 1.",
    level: "intermediate",
    codeExample: "// 1L << 63 gives the minimum long (negative)"
  },
  {
    question: "How does exponentiation relate to the binary representation of a number?",
    shortAnswer: "Any integer can be expressed as a sum of powers of 2 (binary).",
    explanation: "Example: 13 = 8 + 4 + 1 = 2³ + 2² + 2⁰.",
    hint: "This is the basis of binary numbers.",
    level: "intermediate",
    codeExample: "// 13 in binary is 1101 = 2^3 + 2^2 + 2^0"
  },
  {
    question: "What is the time complexity of computing 2^n using a loop?",
    shortAnswer: "O(n) — linear.",
    explanation: "You multiply by 2 n times.",
    hint: "How many multiplications?",
    level: "basic",
    codeExample: "for (int i=0; i<n; i++) result *= 2;"
  },
  {
    question: "What is the time complexity of computing 2^n using bit shift?",
    shortAnswer: "O(1) — constant time.",
    explanation: "A single bit shift operation executes in constant time.",
    hint: "Bit shift is a hardware instruction.",
    level: "intermediate",
    codeExample: "// 1L << n"
  },
  {
    question: "What is the space complexity of fast exponentiation (recursive)?",
    shortAnswer: "O(log n) — because of the recursion stack depth.",
    explanation: "The recursion depth is proportional to log₂(n).",
    hint: "The stack grows with each recursive call.",
    level: "intermediate",
    codeExample: "// fastPow recursive uses O(log n) stack space"
  },
  {
    question: "What is the space complexity of fast exponentiation (iterative)?",
    shortAnswer: "O(1) — constant.",
    explanation: "It uses only a few variables.",
    hint: "No additional data structures.",
    level: "intermediate",
    codeExample: "// iterative fastPow uses O(1) space"
  },
  {
    question: "Why does fast exponentiation use the 'exponent is odd' check?",
    shortAnswer: "Because when exponent is odd, we multiply the result by the base and then square the base for the next iteration.",
    explanation: "This corresponds to the binary representation of the exponent.",
    hint: "Think of binary expansion of exponent.",
    level: "advanced",
    codeExample: "// if (exp & 1) result *= base;"
  },
  {
    question: "What is the value of 2^10 in decimal?",
    shortAnswer: "1024.",
    explanation: "2¹⁰ = 1024, a common number in computing (1 KB).",
    hint: "It's a power of 2.",
    level: "basic",
    codeExample: "// 1024"
  },
  {
    question: "How do you compute a^b modulo m efficiently?",
    shortAnswer: "Using fast exponentiation with modular multiplication at each step.",
    explanation: "This prevents overflow and is used in cryptography.",
    hint: "Modular exponentiation = fastPow with % m.",
    level: "advanced",
    codeExample: "// result = (result * base) % mod;"
  }
];

export default questions;