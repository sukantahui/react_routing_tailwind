const questions = [
  {
    question: "What is a logarithm?",
    shortAnswer: "The inverse operation of exponentiation: log_b(x) = y means b^y = x.",
    explanation: "A logarithm answers: 'To what power must the base be raised to get the number?'",
    hint: "Think of it as the opposite of exponentiation.",
    level: "basic",
    codeExample: "// log2(8) = 3 because 2^3 = 8"
  },
  {
    question: "What is log₂(1)?",
    shortAnswer: "0",
    explanation: "2^0 = 1, so log₂(1) = 0.",
    hint: "Any base to the power 0 is 1.",
    level: "basic",
    codeExample: "// log2(1) = 0"
  },
  {
    question: "What is log₂(2)?",
    shortAnswer: "1",
    explanation: "2^1 = 2, so log₂(2) = 1.",
    hint: "The base raised to 1 equals the base.",
    level: "basic",
    codeExample: "// log2(2) = 1"
  },
  {
    question: "What is log₂(8)?",
    shortAnswer: "3",
    explanation: "2^3 = 8, so log₂(8) = 3.",
    hint: "What power of 2 equals 8?",
    level: "basic",
    codeExample: "// log2(8) = 3"
  },
  {
    question: "What is the product rule for logarithms?",
    shortAnswer: "logₐ(xy) = logₐ(x) + logₐ(y).",
    explanation: "The log of a product equals the sum of the logs.",
    hint: "Multiplication becomes addition.",
    level: "basic",
    codeExample: "// log2(4*8) = log2(4)+log2(8) = 2+3 = 5"
  },
  {
    question: "What is the quotient rule for logarithms?",
    shortAnswer: "logₐ(x/y) = logₐ(x) - logₐ(y).",
    explanation: "The log of a quotient equals the difference of the logs.",
    hint: "Division becomes subtraction.",
    level: "basic",
    codeExample: "// log2(8/2) = log2(8)-log2(2) = 3-1 = 2"
  },
  {
    question: "What is the power rule for logarithms?",
    shortAnswer: "logₐ(xⁿ) = n · logₐ(x).",
    explanation: "The log of a power equals the exponent times the log of the base.",
    hint: "Exponents become coefficients.",
    level: "basic",
    codeExample: "// log2(8^2) = 2*log2(8) = 2*3 = 6"
  },
  {
    question: "What is the change of base formula?",
    shortAnswer: "logₐ(x) = log_b(x) / log_b(a).",
    explanation: "Allows computing log in any base using a known base (like e or 10).",
    hint: "You can convert between bases.",
    level: "intermediate",
    codeExample: "// log2(8) = ln(8)/ln(2)"
  },
  {
    question: "Why is log₂(n) important in computer science?",
    shortAnswer: "Because many algorithms divide the problem in half each step, giving O(log n) complexity.",
    explanation: "Binary search, tree operations, and divide-and-conquer algorithms all have O(log n) time.",
    hint: "Think of halving the input.",
    level: "intermediate",
    codeExample: "// Binary search is O(log n)"
  },
  {
    question: "What is the base of the natural logarithm?",
    shortAnswer: "e ≈ 2.71828.",
    explanation: "Natural logarithms use base e, denoted ln(x).",
    hint: "It's the Euler's number.",
    level: "basic",
    codeExample: "// Math.log(x) is natural log"
  },
  {
    question: "How do you compute log₂(n) in Java?",
    shortAnswer: "Use Math.log(n) / Math.log(2).",
    explanation: "Java doesn't have a direct log2 function, so you use change of base.",
    hint: "Math.log() returns natural log.",
    level: "intermediate",
    codeExample: "double log2 = Math.log(n) / Math.log(2);"
  },
  {
    question: "What is the time complexity of binary search?",
    shortAnswer: "O(log n) — logarithmic time.",
    explanation: "Each step halves the search space, so the number of steps is log₂(n).",
    hint: "How many times can you halve n?",
    level: "basic",
    codeExample: "// while (low <= high) { mid = ...; }"
  },
  {
    question: "What is the height of a balanced binary tree with n nodes?",
    shortAnswer: "O(log n) — it's the ceiling of log₂(n+1).",
    explanation: "In a balanced tree, each level doubles the number of nodes.",
    hint: "Think of the tree as dividing the nodes.",
    level: "intermediate",
    codeExample: "// height ≈ log2(n)"
  },
  {
    question: "Why is O(log n) considered very efficient?",
    shortAnswer: "Because it grows extremely slowly — even for huge n, log₂(n) is small.",
    explanation: "For n = 1 billion, log₂(n) ≈ 30.",
    hint: "Compare log₂(n) with n.",
    level: "basic",
    codeExample: "// log2(1e9) ≈ 30"
  },
  {
    question: "What is log₂(1024)?",
    shortAnswer: "10.",
    explanation: "2^10 = 1024, so log₂(1024) = 10.",
    hint: "1024 is a common number in computing.",
    level: "basic",
    codeExample: "// log2(1024) = 10"
  },
  {
    question: "What is log₂(1,000,000)?",
    shortAnswer: "Approximately 20 (since 2^20 ≈ 1,048,576).",
    explanation: "So binary search on 1 million items takes at most 20 comparisons.",
    hint: "2^10=1024, 2^20≈1M.",
    level: "intermediate",
    codeExample: "// log2(1e6) ≈ 20"
  },
  {
    question: "What is the relationship between logarithms and exponents?",
    shortAnswer: "They are inverse functions: if b^y = x, then log_b(x) = y.",
    explanation: "One undoes the other.",
    hint: "They are opposite operations.",
    level: "basic",
    codeExample: "// 2^3 = 8 ↔ log2(8) = 3"
  },
  {
    question: "What is the domain of a logarithmic function?",
    shortAnswer: "Positive real numbers (x > 0).",
    explanation: "You cannot take the log of zero or a negative number.",
    hint: "Log of negative or zero is undefined.",
    level: "intermediate",
    codeExample: "// Math.log(-1) // NaN"
  },
  {
    question: "What is the value of logₐ(1)?",
    shortAnswer: "0 for any valid base a.",
    explanation: "Because a^0 = 1.",
    hint: "Anything to the power 0 is 1.",
    level: "basic",
    codeExample: "// log2(1) = 0"
  },
  {
    question: "What is the value of logₐ(a)?",
    shortAnswer: "1.",
    explanation: "Because a^1 = a.",
    hint: "The base raised to 1 equals itself.",
    level: "basic",
    codeExample: "// log2(2) = 1"
  },
  {
    question: "What does log₂(n) represent in the context of number of bits?",
    shortAnswer: "The number of bits needed to represent n in binary.",
    explanation: "For n, the number of bits is floor(log₂(n)) + 1.",
    hint: "Binary representation uses powers of 2.",
    level: "intermediate",
    codeExample: "// bits = floor(log2(n)) + 1"
  },
  {
    question: "How do you solve for x in 2^x = 1000?",
    shortAnswer: "x = log₂(1000) ≈ 9.97.",
    explanation: "Use logarithms: x = log₂(1000).",
    hint: "Take log base 2 of both sides.",
    level: "intermediate",
    codeExample: "// x = Math.log(1000)/Math.log(2)"
  },
  {
    question: "Why does the base of the logarithm not matter in Big-O notation?",
    shortAnswer: "Because changing the base multiplies the log by a constant, and constants are ignored in Big-O.",
    explanation: "log₂(n) = log₁₀(n) / log₁₀(2), and 1/log₁₀(2) is a constant.",
    hint: "Big-O drops constant factors.",
    level: "intermediate",
    codeExample: "// O(log n) is base-independent"
  },
  {
    question: "What is the time complexity of heap operations?",
    shortAnswer: "O(log n) for insertion and deletion in a binary heap.",
    explanation: "The heap property requires percolating up or down, which takes O(height) = O(log n).",
    hint: "Heap is a balanced tree.",
    level: "advanced",
    codeExample: "// heap insert/delete = O(log n)"
  },
  {
    question: "How many times can you divide n by 2 until you reach 1?",
    shortAnswer: "⌊log₂(n)⌋ times.",
    explanation: "Each division reduces the number by half.",
    hint: "This is the definition of log₂(n).",
    level: "basic",
    codeExample: "// while (n > 1) { n /= 2; count++; }"
  },
  {
    question: "What is the space complexity of a recursive function with depth d?",
    shortAnswer: "O(d) — because of the call stack.",
    explanation: "If depth is O(log n), space is O(log n).",
    hint: "Recursion uses stack memory.",
    level: "intermediate",
    codeExample: "// recursion depth = O(log n) for divide-and-conquer"
  },
  {
    question: "What is the value of log₂(0)?",
    shortAnswer: "Undefined.",
    explanation: "Logarithm is not defined for 0 or negative numbers.",
    hint: "There's no power of 2 that gives 0.",
    level: "basic",
    codeExample: "// Math.log(0) = -Infinity, but not a valid log"
  },
  {
    question: "How can you compute log₂(n) without using floating point?",
    shortAnswer: "Use Integer.highestOneBit and numberOfTrailingZeros, or while loop shifting right.",
    explanation: "For integer n, you can find the position of the highest set bit.",
    hint: "Bit operations are exact for integers.",
    level: "advanced",
    codeExample: "// int log2 = 31 - Integer.numberOfLeadingZeros(n);"
  },
  {
    question: "What is the difference between log₂(n) and ln(n)?",
    shortAnswer: "log₂(n) uses base 2, ln(n) uses base e. They differ by a constant factor.",
    explanation: "ln(n) = log₂(n) * ln(2), so they are proportional.",
    hint: "Base changes by a factor.",
    level: "intermediate",
    codeExample: "// ln(n) = log2(n) * 0.693"
  },
  {
    question: "In a balanced BST, what is the worst-case time for search?",
    shortAnswer: "O(log n) — the height of the tree is logarithmic.",
    explanation: "Each comparison moves down one level.",
    hint: "The tree is balanced, so height is log₂(n).",
    level: "intermediate",
    codeExample: "// tree search = O(log n)"
  },
  {
    question: "What is the significance of log₂(n) in information theory?",
    shortAnswer: "It's the number of bits needed to encode n distinct values.",
    explanation: "For example, to represent 8 values, you need 3 bits (log₂(8)=3).",
    hint: "Bits are powers of 2.",
    level: "advanced",
    codeExample: "// bits = ceil(log2(n))"
  }
];

export default questions;