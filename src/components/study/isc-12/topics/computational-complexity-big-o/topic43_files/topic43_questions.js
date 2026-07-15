const questions = [
  {
    question: "What is the recurrence for recursive decimal-to-binary conversion?",
    shortAnswer: "T(n) = T(n/2) + O(1), T(0) = O(1)",
    explanation: "Each step divides the number by 2 and does constant work (modulo and division).",
    hint: "Divide by 2 each time.",
    level: "basic",
    codeExample: "// T(n) = T(n/2) + 1"
  },
  {
    question: "What is the time complexity of recursive decimal-to-binary conversion?",
    shortAnswer: "O(log n) — logarithmic time.",
    explanation: "The number of bits in n is ⌊log₂(n)⌋ + 1, so the number of recursive calls is O(log n).",
    hint: "Number of bits.",
    level: "basic",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the space complexity of recursive decimal-to-binary conversion?",
    shortAnswer: "O(log n) — due to the recursion stack.",
    explanation: "The recursion depth equals the number of bits, which is O(log n).",
    hint: "Depth = number of bits.",
    level: "basic",
    codeExample: "// O(log n) space"
  },
  {
    question: "What is the base case for decimal-to-binary conversion?",
    shortAnswer: "toBinary(0) = '0'.",
    explanation: "When the number becomes 0, the recursion stops and returns '0'.",
    hint: "Zero returns '0'.",
    level: "basic",
    codeExample: "// if (n == 0) return '0';"
  },
  {
    question: "How many bits does the binary representation of n have?",
    shortAnswer: "⌊log₂(n)⌋ + 1.",
    explanation: "This is the number of digits in the binary representation.",
    hint: "Log base 2.",
    level: "intermediate",
    codeExample: "// bits = floor(log2(n)) + 1"
  },
  {
    question: "Why is the recursive decimal-to-binary conversion O(log n)?",
    shortAnswer: "Because the number of recursive calls is the number of bits, which is log₂(n).",
    explanation: "Each call divides the number by 2, reducing it exponentially.",
    hint: "Division by 2.",
    level: "basic",
    codeExample: "// log₂(n) calls"
  },
  {
    question: "What is the value of 13 in binary?",
    shortAnswer: "1101.",
    explanation: "13 = 8 + 4 + 1 = 2³ + 2² + 2⁰ = 1101₂.",
    hint: "1101.",
    level: "basic",
    codeExample: "// 13 → 1101"
  },
  {
    question: "What is the value of 255 in binary?",
    shortAnswer: "11111111 (8 ones).",
    explanation: "255 = 2⁸ - 1 = 11111111₂.",
    hint: "8 ones.",
    level: "basic",
    codeExample: "// 255 → 11111111"
  },
  {
    question: "What is the value of 1024 in binary?",
    shortAnswer: "10000000000 (1 followed by 10 zeros).",
    explanation: "1024 = 2¹⁰ = 10000000000₂.",
    hint: "1 followed by 10 zeros.",
    level: "basic",
    codeExample: "// 1024 → 10000000000"
  },
  {
    question: "Why does the recursive call go before the digit in the return value?",
    shortAnswer: "Because the remainders are collected in reverse order — the last digit is the most significant bit.",
    explanation: "toBinary(n/2) gives the higher-order bits; (n % 2) gives the least significant bit.",
    hint: "Reverse order.",
    level: "intermediate",
    codeExample: "// return toBinary(n/2) + (n % 2);"
  },
  {
    question: "What is the maximum recursion depth for n = 10⁹?",
    shortAnswer: "About 30 (since 2³⁰ ≈ 10⁹).",
    explanation: "The number of bits in 10⁹ is about 30.",
    hint: "~30.",
    level: "intermediate",
    codeExample: "// depth ≈ 30"
  },
  {
    question: "Can recursive decimal-to-binary conversion cause a stack overflow?",
    shortAnswer: "Rarely, because the depth is only the number of bits (max ~31 for int, ~63 for long).",
    explanation: "For int (32-bit), depth ≤ 32; for long (64-bit), depth ≤ 64.",
    hint: "Depth is small.",
    level: "intermediate",
    codeExample: "// max depth ≤ 64"
  },
  {
    question: "What is the time complexity if you use string concatenation instead of StringBuilder?",
    shortAnswer: "O(log² n) — because each concatenation copies the growing string.",
    explanation: "The string length grows to O(log n), and each concatenation copies it.",
    hint: "String copies.",
    level: "advanced",
    codeExample: "// O(log² n) with string concatenation"
  },
  {
    question: "What is the space complexity of string concatenation in recursive conversion?",
    shortAnswer: "O(log n) for the final string + O(log n) for the stack = O(log n).",
    explanation: "The final string length is O(log n), and the stack is O(log n).",
    hint: "O(log n).",
    level: "intermediate",
    codeExample: "// O(log n) space"
  },
  {
    question: "How does StringBuilder improve performance in recursive conversion?",
    shortAnswer: "By appending in O(1) amortized time instead of copying the string each time.",
    explanation: "StringBuilder maintains a mutable buffer that grows as needed.",
    hint: "Mutable buffer.",
    level: "intermediate",
    codeExample: "// sb.append(digit)"
  },
  {
    question: "Can decimal-to-binary conversion be done iteratively?",
    shortAnswer: "Yes, by repeatedly dividing by 2 and collecting remainders.",
    explanation: "The iterative version uses O(log n) time and O(1) space.",
    hint: "Loop.",
    level: "basic",
    codeExample: "// while (n > 0) { bits.add(n % 2); n /= 2; }"
  },
  {
    question: "What is the time complexity of iterative decimal-to-binary conversion?",
    shortAnswer: "O(log n) — same as recursive.",
    explanation: "The loop runs once per bit, which is O(log n).",
    hint: "O(log n).",
    level: "basic",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the space complexity of iterative decimal-to-binary conversion?",
    shortAnswer: "O(1) — constant space (if building a string, O(log n) for the string).",
    explanation: "The loop uses only a few variables; the result string is O(log n).",
    hint: "O(1) plus result string.",
    level: "intermediate",
    codeExample: "// O(1) space"
  },
  {
    question: "What is the binary representation of 0?",
    shortAnswer: "0.",
    explanation: "Zero is represented as '0' in binary.",
    hint: "0.",
    level: "basic",
    codeExample: "// 0 → '0'"
  },
  {
    question: "What is the binary representation of 1?",
    shortAnswer: "1.",
    explanation: "One is represented as '1' in binary.",
    hint: "1.",
    level: "basic",
    codeExample: "// 1 → '1'"
  },
  {
    question: "What is the binary representation of 2?",
    shortAnswer: "10.",
    explanation: "2 = 2¹ = 10₂.",
    hint: "10.",
    level: "basic",
    codeExample: "// 2 → '10'"
  },
  {
    question: "What is the binary representation of 3?",
    shortAnswer: "11.",
    explanation: "3 = 2¹ + 2⁰ = 11₂.",
    hint: "11.",
    level: "basic",
    codeExample: "// 3 → '11'"
  },
  {
    question: "What is the binary representation of 4?",
    shortAnswer: "100.",
    explanation: "4 = 2² = 100₂.",
    hint: "100.",
    level: "basic",
    codeExample: "// 4 → '100'"
  },
  {
    question: "What is the binary representation of 5?",
    shortAnswer: "101.",
    explanation: "5 = 4 + 1 = 101₂.",
    hint: "101.",
    level: "basic",
    codeExample: "// 5 → '101'"
  },
  {
    question: "How do you convert a negative number to binary in Java?",
    shortAnswer: "Use two's complement with Integer.toBinaryString(n) or handle sign separately.",
    explanation: "Java's Integer.toBinaryString() returns the two's complement representation.",
    hint: "Two's complement.",
    level: "advanced",
    codeExample: "// Integer.toBinaryString(-1) = '11111111111111111111111111111111'"
  },
  {
    question: "What is the time complexity of Integer.toBinaryString()?",
    shortAnswer: "O(log n) — it's optimized.",
    explanation: "It converts the integer to binary in O(log n) time.",
    hint: "O(log n).",
    level: "intermediate",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the recurrence for the number of recursive calls in decimal-to-binary?",
    shortAnswer: "C(n) = C(n/2) + 1, C(0) = 1 → O(log n).",
    explanation: "Each call adds one, dividing n by 2.",
    hint: "Logarithmic.",
    level: "intermediate",
    codeExample: "// C(n) = C(n/2) + 1"
  },
  {
    question: "What is the recurrence for the string length in decimal-to-binary?",
    shortAnswer: "L(n) = L(n/2) + 1, L(0) = 1 → O(log n).",
    explanation: "Each call adds one character to the binary string.",
    hint: "Logarithmic.",
    level: "intermediate",
    codeExample: "// L(n) = L(n/2) + 1"
  },
  {
    question: "Can decimal-to-binary conversion be done in O(1) time?",
    shortAnswer: "No, because the output size is O(log n) — you must write all bits.",
    explanation: "The result string has O(log n) characters, so O(log n) time is optimal.",
    hint: "Output size.",
    level: "advanced",
    codeExample: "// Ω(log n) lower bound"
  },
  {
    question: "What is the best possible time complexity for decimal-to-binary conversion?",
    shortAnswer: "Ω(log n) — because you must output all bits.",
    explanation: "The number of bits is log₂(n), so the output size is O(log n).",
    hint: "Output size.",
    level: "advanced",
    codeExample: "// Ω(log n) lower bound"
  },
  {
    question: "What is the time complexity of converting a 32-bit integer to binary?",
    shortAnswer: "O(1) — because the input is fixed size (32 bits).",
    explanation: "For a fixed-size integer, the number of bits is constant (32).",
    hint: "Constant bits.",
    level: "intermediate",
    codeExample: "// O(1) for int (32 bits)"
  },
  {
    question: "What is the time complexity of converting a BigInteger to binary?",
    shortAnswer: "O(log n) — the number of bits is proportional to log₂(n).",
    explanation: "BigInteger can have arbitrarily many bits.",
    hint: "O(log n).",
    level: "advanced",
    codeExample: "// O(log n)"
  }
];

export default questions;