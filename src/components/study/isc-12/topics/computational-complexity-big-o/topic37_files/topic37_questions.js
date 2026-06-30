const questions = [
  {
    question: "What is the recurrence for naive power?",
    shortAnswer: "T(n) = T(n-1) + O(1), T(0) = O(1)",
    explanation: "Each call reduces the exponent by 1 and does constant work (multiplication).",
    hint: "Reducing by 1 each time.",
    level: "basic",
    codeExample: "// T(n) = T(n-1) + 1"
  },
  {
    question: "What is the time complexity of naive power?",
    shortAnswer: "O(n) — linear time.",
    explanation: "The recurrence T(n) = T(n-1) + O(1) solves to O(n).",
    hint: "Linear.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the recurrence for fast power?",
    shortAnswer: "T(n) = T(n/2) + O(1), T(0) = O(1)",
    explanation: "Each call halves the exponent and does constant work.",
    hint: "Halving the exponent.",
    level: "intermediate",
    codeExample: "// T(n) = T(n/2) + 1"
  },
  {
    question: "What is the time complexity of fast power?",
    shortAnswer: "O(log n) — logarithmic time.",
    explanation: "The recurrence T(n) = T(n/2) + O(1) solves to O(log n).",
    hint: "Logarithmic.",
    level: "intermediate",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the space complexity of recursive fast power?",
    shortAnswer: "O(log n) — due to recursion stack depth = log₂(n).",
    explanation: "The recursion depth is O(log n).",
    hint: "Depth = log n.",
    level: "intermediate",
    codeExample: "// O(log n) space"
  },
  {
    question: "What is the space complexity of iterative fast power?",
    shortAnswer: "O(1) — constant space.",
    explanation: "The iterative version uses only a few variables.",
    hint: "No recursion stack.",
    level: "intermediate",
    codeExample: "// O(1) space"
  },
  {
    question: "What is the base case for both naive and fast power?",
    shortAnswer: "b⁰ = 1 for any b ≠ 0.",
    explanation: "Any number raised to the power 0 is 1.",
    hint: "Exponent 0.",
    level: "basic",
    codeExample: "// if (exp == 0) return 1;"
  },
  {
    question: "How does fast power handle odd exponents?",
    shortAnswer: "It multiplies by one extra base: b^e = b × (b²)^((e-1)/2).",
    explanation: "For odd e, b^e = b × (b²)^(e/2) using integer division.",
    hint: "Extra multiplication.",
    level: "advanced",
    codeExample: "// if (exp % 2 == 1) return base * fastPower(base, exp-1);"
  },
  {
    question: "How does fast power handle even exponents?",
    shortAnswer: "It squares the base and halves the exponent: b^e = (b²)^(e/2).",
    explanation: "For even e, b^e = (b²)^(e/2).",
    hint: "Square and halve.",
    level: "advanced",
    codeExample: "// if (exp % 2 == 0) return fastPower(base*base, exp/2);"
  },
  {
    question: "Why is fast power faster than naive power?",
    shortAnswer: "Because it reduces the exponent by half each step (O(log n)) vs reducing by 1 (O(n)).",
    explanation: "Fast power uses exponentiation by squaring, which is exponentially faster.",
    hint: "Halving vs decrementing.",
    level: "intermediate",
    codeExample: "// O(log n) vs O(n)"
  },
  {
    question: "How many multiplications does fast power need for b^1000000?",
    shortAnswer: "About 20 multiplications (log₂(1,000,000) ≈ 20).",
    explanation: "Fast power reduces the exponent by half each step.",
    hint: "~20 steps.",
    level: "intermediate",
    codeExample: "// 20 multiplications"
  },
  {
    question: "How many multiplications does naive power need for b^1000000?",
    shortAnswer: "1,000,000 multiplications.",
    explanation: "Naive power multiplies the base exp times.",
    hint: "1,000,000.",
    level: "basic",
    codeExample: "// 1,000,000 multiplications"
  },
  {
    question: "What is modular exponentiation?",
    shortAnswer: "Computing (b^e) % m using fast power with modulo at each step.",
    explanation: "Used in cryptography to keep numbers manageable while computing large powers.",
    hint: "Modulo at each step.",
    level: "advanced",
    codeExample: "// (b^e) % m"
  },
  {
    question: "What is the time complexity of modular exponentiation?",
    shortAnswer: "O(log n) — same as fast power.",
    explanation: "It's fast power with modulo operations at each step.",
    hint: "O(log n).",
    level: "advanced",
    codeExample: "// O(log n)"
  },
  {
    question: "Why is modular exponentiation used in cryptography?",
    shortAnswer: "Because it computes (b^e) % m efficiently without overflow or huge numbers.",
    explanation: "RSA and Diffie-Hellman rely on modular exponentiation.",
    hint: "Cryptography.",
    level: "advanced",
    codeExample: "// RSA uses modular exponentiation"
  },
  {
    question: "What is the recurrence for fast power in terms of steps?",
    shortAnswer: "T(e) = T(e/2) + O(1), T(0) = O(1) → O(log e).",
    explanation: "The number of steps is the number of bits in the exponent.",
    hint: "Bits in exponent.",
    level: "advanced",
    codeExample: "// O(log e)"
  },
  {
    question: "What is the recurrence for naive power in terms of steps?",
    shortAnswer: "T(e) = T(e-1) + O(1), T(0) = O(1) → O(e).",
    explanation: "The number of steps is equal to the exponent.",
    hint: "Exponent steps.",
    level: "basic",
    codeExample: "// O(e)"
  },
  {
    question: "Can fast power be implemented iteratively?",
    shortAnswer: "Yes, with O(log n) time and O(1) space.",
    explanation: "Iterative fast power uses a while loop instead of recursion.",
    hint: "Iterative version.",
    level: "intermediate",
    codeExample: "// while (exp > 0) { ... }"
  },
  {
    question: "What is the space complexity of recursive fast power in Java?",
    shortAnswer: "O(log n) — because Java doesn't optimize recursion.",
    explanation: "Even with tail recursion, Java doesn't use TCO.",
    hint: "O(log n) in Java.",
    level: "advanced",
    codeExample: "// O(log n) space"
  },
  {
    question: "What is the advantage of iterative fast power over recursive?",
    shortAnswer: "O(1) space vs O(log n) space.",
    explanation: "Iterative version avoids the recursion stack.",
    hint: "Less space.",
    level: "intermediate",
    codeExample: "// O(1) space"
  },
  {
    question: "What happens when the exponent is negative in power?",
    shortAnswer: "b⁻ⁿ = 1/bⁿ for b ≠ 0. Handle separately or throw an exception.",
    explanation: "Negative exponents result in fractions.",
    hint: "Fractional.",
    level: "advanced",
    codeExample: "// if (exp < 0) return 1.0 / power(b, -exp);"
  },
  {
    question: "What is the difference between Math.pow and fast power?",
    shortAnswer: "Math.pow is implemented in C and handles floating-point numbers; fast power is for integers.",
    explanation: "Math.pow is optimized for double precision; fast power is for integer exponentiation.",
    hint: "Floating vs integer.",
    level: "intermediate",
    codeExample: "// Math.pow for double, fast power for int/long"
  },
  {
    question: "Can fast power overflow for large bases/exponents?",
    shortAnswer: "Yes, the result can exceed long.MAX_VALUE. Use BigInteger or modular exponentiation.",
    explanation: "Even small bases can overflow for large exponents (e.g., 2^63).",
    hint: "Overflow.",
    level: "advanced",
    codeExample: "// Use BigInteger for large results"
  },
  {
    question: "What is the time complexity of modular exponentiation with BigInteger?",
    shortAnswer: "O(log n) multiplications, but each multiplication is O(k log k) where k is the number of digits.",
    explanation: "BigInteger operations are not constant time for large numbers.",
    hint: "BigInteger overhead.",
    level: "advanced",
    codeExample: "// O(log n) multiplications"
  },
  {
    question: "What is the binary representation of exponent used in fast power?",
    shortAnswer: "Fast power processes the bits of the exponent from LSB to MSB.",
    explanation: "The iterative version checks each bit of the exponent.",
    hint: "Bits of exponent.",
    level: "advanced",
    codeExample: "// while (exp > 0) { if (exp & 1) ... }"
  },
  {
    question: "What is the value of 2^10 using fast power?",
    shortAnswer: "1024.",
    explanation: "2^10 = 1024, and fast power computes it in about 4 steps.",
    hint: "1024.",
    level: "basic",
    codeExample: "// 2^10 = 1024"
  },
  {
    question: "What is the value of 2^20 using fast power?",
    shortAnswer: "1,048,576.",
    explanation: "2^20 = 1,048,576.",
    hint: "1,048,576.",
    level: "basic",
    codeExample: "// 2^20 = 1,048,576"
  },
  {
    question: "How does fast power relate to binary search?",
    shortAnswer: "Both have the same recurrence: T(n) = T(n/2) + O(1) → O(log n).",
    explanation: "Fast power reduces the exponent by half each step, just like binary search halves the search space.",
    hint: "Same recurrence.",
    level: "intermediate",
    codeExample: "// T(n) = T(n/2) + 1"
  },
  {
    question: "What is the recurrence for fast power with modulo?",
    shortAnswer: "T(n) = T(n/2) + O(1) — same as fast power.",
    explanation: "Modulo operations are O(1) and added at each step.",
    hint: "Same recurrence.",
    level: "advanced",
    codeExample: "// T(n) = T(n/2) + 1"
  },
  {
    question: "What is the maximum exponent that fast power can handle for 64-bit integers?",
    shortAnswer: "Exponents up to 2^63-1 (about 9.22e18) in the exponent, but results may overflow.",
    explanation: "The exponent is a long (64-bit), but the result may overflow.",
    hint: "Exponent limit.",
    level: "advanced",
    codeExample: "// exponent up to 9.22e18"
  },
  {
    question: "What is the recurrence for the number of multiplications in fast power?",
    shortAnswer: "M(e) = M(e/2) + 1, M(0) = 0 → O(log e).",
    explanation: "Each recursive call does at most 2 multiplications.",
    hint: "Logarithmic.",
    level: "advanced",
    codeExample: "// O(log e)"
  }
];

export default questions;