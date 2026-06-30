const questions = [
  {
    question: "What is the recurrence for recursive sum of digits?",
    shortAnswer: "T(n) = T(n/10) + O(1), T(0) = O(1)",
    explanation: "Each call removes one digit (n/10) and does constant work (modulo operation).",
    hint: "Divide by 10 each time.",
    level: "basic",
    codeExample: "// T(n) = T(n/10) + 1"
  },
  {
    question: "What is the time complexity of recursive sum of digits?",
    shortAnswer: "O(log n) — logarithmic time.",
    explanation: "The number of digits in n is ⌊log₁₀(n)⌋ + 1, so the number of recursive calls is O(log n).",
    hint: "Number of digits.",
    level: "basic",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the space complexity of recursive sum of digits?",
    shortAnswer: "O(log n) — due to the recursion stack.",
    explanation: "The recursion depth equals the number of digits in n, which is O(log n).",
    hint: "Stack depth = digits.",
    level: "basic",
    codeExample: "// O(log n) space"
  },
  {
    question: "What is the base case for recursive sum of digits?",
    shortAnswer: "sumDigits(0) = 0.",
    explanation: "When n becomes 0, all digits have been processed.",
    hint: "Zero base.",
    level: "basic",
    codeExample: "// if (n == 0) return 0;"
  },
  {
    question: "How many digits does a number n have in base 10?",
    shortAnswer: "⌊log₁₀(n)⌋ + 1.",
    explanation: "This is the number of digits, which determines the number of recursive calls.",
    hint: "Log base 10.",
    level: "intermediate",
    codeExample: "// digits = floor(log10(n)) + 1"
  },
  {
    question: "Is the iterative version of sum of digits also O(log n)?",
    shortAnswer: "Yes, it's O(log n) time but O(1) space.",
    explanation: "The loop runs once per digit, which is O(log n).",
    hint: "Same time, less space.",
    level: "basic",
    codeExample: "// while (n > 0) { ... }"
  },
  {
    question: "What is the space complexity of iterative sum of digits?",
    shortAnswer: "O(1) — constant space.",
    explanation: "Iterative version uses only a few variables, not the call stack.",
    hint: "No recursion stack.",
    level: "basic",
    codeExample: "// O(1) space"
  },
  {
    question: "Why is the base 10 in log₁₀(n) not important?",
    shortAnswer: "Because log₁₀(n) and log₂(n) differ by a constant factor, and Big-O drops constants.",
    explanation: "In O(log n), the base of the logarithm doesn't matter.",
    hint: "Constants are dropped.",
    level: "intermediate",
    codeExample: "// O(log n) is base-independent"
  },
  {
    question: "Can recursive sum of digits cause a stack overflow?",
    shortAnswer: "Rarely, because the depth is only the number of digits (max ~10 for 32-bit int).",
    explanation: "For 64-bit numbers, the depth is at most 20 digits, so stack overflow is not a concern.",
    hint: "Very shallow.",
    level: "intermediate",
    codeExample: "// max depth ≈ 20"
  },
  {
    question: "What is the maximum recursion depth for sum of digits in Java?",
    shortAnswer: "About 19 for long (64-bit) numbers, 10 for int (32-bit).",
    explanation: "The maximum number of digits is 19 for long (9,223,372,036,854,775,807).",
    hint: "Digits in long.",
    level: "intermediate",
    codeExample: "// max depth = 19"
  },
  {
    question: "How do you handle negative numbers in sum of digits?",
    shortAnswer: "Use Math.abs(n) or handle the sign separately.",
    explanation: "Sum of digits is typically defined for positive numbers, so take absolute value first.",
    hint: "Absolute value.",
    level: "intermediate",
    codeExample: "// sumDigits(Math.abs(n))"
  },
  {
    question: "What is the digital root of a number?",
    shortAnswer: "The single-digit value obtained by repeatedly summing digits.",
    explanation: "For n, the digital root is congruent to n mod 9 (with 9 instead of 0).",
    hint: "Repeated sum.",
    level: "advanced",
    codeExample: "// digital root = (n - 1) % 9 + 1"
  },
  {
    question: "What is the time complexity of finding the digital root?",
    shortAnswer: "O(log n) using repeated sum of digits, or O(1) using the formula.",
    explanation: "Repeated sum of digits takes O(log n) for each iteration, but it converges quickly.",
    hint: "Formula exists.",
    level: "advanced",
    codeExample: "// O(1) with formula"
  },
  {
    question: "What is the recurrence for sum of digits in a different base?",
    shortAnswer: "T(n) = T(n/b) + O(1) where b is the base.",
    explanation: "For base 2 (binary), T(n) = T(n/2) + O(1) → O(log₂ n) = O(log n).",
    hint: "Base doesn't matter.",
    level: "intermediate",
    codeExample: "// T(n) = T(n/2) + 1"
  },
  {
    question: "Is the time complexity of sum of digits O(log n) or O(log₁₀ n)?",
    shortAnswer: "Both — O(log n) is base-independent.",
    explanation: "log₁₀ n = log₂ n / log₂ 10, which is a constant factor.",
    hint: "Constants don't matter.",
    level: "basic",
    codeExample: "// O(log n)"
  },
  {
    question: "How many recursive calls does sumDigits(12345) make?",
    shortAnswer: "6 calls (including the base case).",
    explanation: "12345 has 5 digits, so sumDigits(12345) → sumDigits(1234) → ... → sumDigits(0).",
    hint: "Digits + 1.",
    level: "basic",
    codeExample: "// 6 calls"
  },
  {
    question: "What is the recurrence for sum of digits in terms of d (number of digits)?",
    shortAnswer: "T(d) = T(d-1) + O(1), T(0) = O(1) → O(d).",
    explanation: "d is the number of digits, and the algorithm processes one digit per step.",
    hint: "Digits count.",
    level: "intermediate",
    codeExample: "// T(d) = T(d-1) + 1 → O(d)"
  },
  {
    question: "Can sum of digits be computed using recursion with O(1) space?",
    shortAnswer: "No, recursion uses the call stack, so space is O(log n).",
    explanation: "To get O(1) space, use iteration instead of recursion.",
    hint: "Use iteration.",
    level: "intermediate",
    codeExample: "// iteration gives O(1) space"
  },
  {
    question: "What is the time complexity of sum of digits for n = 10⁹?",
    shortAnswer: "O(log n) ≈ 10 steps (since 10⁹ has 10 digits).",
    explanation: "10⁹ has 10 digits, so about 10 operations.",
    hint: "10 steps.",
    level: "basic",
    codeExample: "// ~10 steps"
  },
  {
    question: "Why is sum of digits considered a logarithmic algorithm?",
    shortAnswer: "Because the number of steps is proportional to the number of digits, which is log₁₀(n).",
    explanation: "The algorithm reduces n by a factor of 10 each step, giving logarithmic complexity.",
    hint: "Divide by 10.",
    level: "basic",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the worst-case time complexity of sum of digits?",
    shortAnswer: "O(log n) — even in the worst case, it's still logarithmic.",
    explanation: "The number of digits is always O(log n), so there's no worse case.",
    hint: "Always logarithmic.",
    level: "basic",
    codeExample: "// Θ(log n)"
  },
  {
    question: "What is the average-case time complexity of sum of digits?",
    shortAnswer: "O(log n) — same as worst-case.",
    explanation: "Every number takes O(number of digits) steps.",
    hint: "Always the same.",
    level: "basic",
    codeExample: "// Θ(log n)"
  },
  {
    question: "What is the space complexity of the iterative sum of digits?",
    shortAnswer: "O(1) — constant space.",
    explanation: "The iterative version uses a single variable to accumulate the sum.",
    hint: "No stack.",
    level: "basic",
    codeExample: "// O(1) space"
  },
  {
    question: "Can sum of digits be used to check divisibility by 3 or 9?",
    shortAnswer: "Yes, if the sum of digits is divisible by 3 or 9, the number is divisible by 3 or 9.",
    explanation: "This is a well-known divisibility rule.",
    hint: "Divisibility rules.",
    level: "intermediate",
    codeExample: "// if (sumDigits(n) % 3 == 0) ..."
  },
  {
    question: "What is the recurrence for sum of digits in a recursive function that handles negative numbers?",
    shortAnswer: "T(n) = T(n/10) + O(1) with n = Math.abs(n) in the base case.",
    explanation: "The recurrence is the same, but you take the absolute value first.",
    hint: "Use absolute value.",
    level: "advanced",
    codeExample: "// sumDigits(Math.abs(n))"
  },
  {
    question: "How many steps does sum of digits take for n = 10^k?",
    shortAnswer: "k + 1 steps (the number of digits including the leading 1).",
    explanation: "10^k has k+1 digits (1 followed by k zeros).",
    hint: "k+1 digits.",
    level: "intermediate",
    codeExample: "// k+1 steps"
  },
  {
    question: "What is the time complexity of sum of digits in terms of number of bits?",
    shortAnswer: "O(log n) — same, since the number of bits is proportional to log₂(n).",
    explanation: "The number of bits is log₂(n), which is O(log n).",
    hint: "Bits are logarithmic.",
    level: "intermediate",
    codeExample: "// O(log n)"
  },
  {
    question: "Can sum of digits be computed using tail recursion?",
    shortAnswer: "Yes, but it requires an accumulator.",
    explanation: "A tail-recursive version with accumulator can be optimized by the compiler.",
    hint: "Accumulator.",
    level: "advanced",
    codeExample: "// tailRecSumDigits(n, acc)"
  },
  {
    question: "What is the space complexity of tail-recursive sum of digits with TCO?",
    shortAnswer: "O(1) with Tail Call Optimization.",
    explanation: "TCO reuses the stack frame, eliminating the O(log n) space overhead.",
    hint: "TCO.",
    level: "advanced",
    codeExample: "// O(1) with TCO"
  },
  {
    question: "What is the difference between sum of digits and digital root?",
    shortAnswer: "Sum of digits is one pass; digital root is repeated sum until a single digit remains.",
    explanation: "Digital root is the iterative application of sum of digits.",
    hint: "Single digit.",
    level: "intermediate",
    codeExample: "// digital root = sumDigits repeatedly"
  },
  {
    question: "What is the time complexity of finding the digital root using the formula?",
    shortAnswer: "O(1) — constant time.",
    explanation: "The formula (n - 1) % 9 + 1 gives the digital root in O(1).",
    hint: "Formula.",
    level: "advanced",
    codeExample: "// O(1) formula"
  }
];

export default questions;