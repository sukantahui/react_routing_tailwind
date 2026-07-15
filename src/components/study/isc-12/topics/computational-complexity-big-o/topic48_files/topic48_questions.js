const questions = [
  {
    question: "What is linear recursion?",
    shortAnswer: "A recursive function that makes at most one recursive call per invocation.",
    explanation: "The calls form a linear chain, not a branching tree.",
    hint: "One call per level.",
    level: "basic",
    codeExample: "// factorial: T(n) = T(n-1) + O(1)"
  },
  {
    question: "What is the recurrence for linear recursion?",
    shortAnswer: "T(n) = T(n-1) + O(1), T(0) = O(1)",
    explanation: "Each call does constant work and makes one call on n-1.",
    hint: "T(n) = T(n-1) + 1.",
    level: "basic",
    codeExample: "// T(n) = T(n-1) + 1"
  },
  {
    question: "What is the time complexity of linear recursion?",
    shortAnswer: "O(n) — linear time.",
    explanation: "The recurrence T(n) = T(n-1) + O(1) solves to O(n).",
    hint: "Linear.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of linear recursion?",
    shortAnswer: "O(n) — due to the recursion stack.",
    explanation: "The recursion depth is n, so O(n) stack space is used.",
    hint: "Depth = n.",
    level: "basic",
    codeExample: "// O(n) space"
  },
  {
    question: "What is an example of linear recursion?",
    shortAnswer: "Factorial, sum of 1..n, array sum.",
    explanation: "These functions make one recursive call per level.",
    hint: "Factorial.",
    level: "basic",
    codeExample: "// factorial(n) = n * factorial(n-1)"
  },
  {
    question: "What is the base case for linear recursion?",
    shortAnswer: "The smallest input where recursion stops, usually n=0 or n=1.",
    explanation: "Without a base case, the recursion never terminates.",
    hint: "n=0 or n=1.",
    level: "basic",
    codeExample: "// if (n <= 1) return 1;"
  },
  {
    question: "How many recursive calls are made for factorial(n)?",
    shortAnswer: "n + 1 calls (including the base case).",
    explanation: "factorial(n) calls factorial(n-1), ... down to factorial(0).",
    hint: "n+1 calls.",
    level: "basic",
    codeExample: "// n + 1 calls"
  },
  {
    question: "What is the maximum recursion depth for linear recursion?",
    shortAnswer: "n — the depth is equal to the input size.",
    explanation: "Each call goes one level deeper until the base case.",
    hint: "Depth = n.",
    level: "basic",
    codeExample: "// depth = n"
  },
  {
    question: "Can linear recursion cause a stack overflow?",
    shortAnswer: "Yes, for large n (e.g., n > 10,000 in Java).",
    explanation: "The recursion depth is n, which can exceed the stack size limit.",
    hint: "Large n.",
    level: "intermediate",
    codeExample: "// StackOverflowError for large n"
  },
  {
    question: "How can you avoid stack overflow in linear recursion?",
    shortAnswer: "Use iteration instead of recursion.",
    explanation: "Iterative solutions use O(1) space and avoid the call stack.",
    hint: "Iteration.",
    level: "intermediate",
    codeExample: "// for loop"
  },
  {
    question: "What is the time complexity of iterative factorial?",
    shortAnswer: "O(n) — linear time, same as recursive.",
    explanation: "The loop runs n times, but space is O(1).",
    hint: "O(n) time.",
    level: "basic",
    codeExample: "// O(n) time"
  },
  {
    question: "What is the space complexity of iterative factorial?",
    shortAnswer: "O(1) — constant space.",
    explanation: "Iterative version uses only a few variables.",
    hint: "No stack.",
    level: "basic",
    codeExample: "// O(1) space"
  },
  {
    question: "What is the recurrence for tail-recursive linear recursion?",
    shortAnswer: "T(n) = T(n-1) + O(1) — same as regular.",
    explanation: "The recurrence is the same; the implementation differs.",
    hint: "Same recurrence.",
    level: "intermediate",
    codeExample: "// T(n) = T(n-1) + 1"
  },
  {
    question: "What is the space complexity of tail-recursive linear recursion with TCO?",
    shortAnswer: "O(1) with Tail Call Optimization.",
    explanation: "TCO reuses the stack frame, eliminating O(n) space.",
    hint: "O(1) with TCO.",
    level: "advanced",
    codeExample: "// O(1) with TCO"
  },
  {
    question: "Does Java support Tail Call Optimization?",
    shortAnswer: "No, Java does not support TCO.",
    explanation: "Java compilers do not optimize tail recursion.",
    hint: "Not in Java.",
    level: "advanced",
    codeExample: "// No TCO in Java"
  },
  {
    question: "What is the space complexity of tail-recursive linear recursion in Java?",
    shortAnswer: "O(n) — because Java doesn't support TCO.",
    explanation: "Even with tail recursion, Java still uses O(n) stack space.",
    hint: "O(n) in Java.",
    level: "advanced",
    codeExample: "// O(n) in Java"
  },
  {
    question: "What is the difference between linear recursion and binary recursion?",
    shortAnswer: "Linear has one call per level; binary has two calls per level.",
    explanation: "Linear forms a chain; binary forms a tree.",
    hint: "One vs two calls.",
    level: "intermediate",
    codeExample: "// linear: T(n) = T(n-1) + O(1), binary: T(n) = T(n-1) + T(n-2) + O(1)"
  },
  {
    question: "What is the time complexity of linear recursion vs binary recursion?",
    shortAnswer: "Linear is O(n); binary (like Fibonacci) is O(2ⁿ).",
    explanation: "Linear recursion has one branch; binary recursion branches exponentially.",
    hint: "O(n) vs O(2ⁿ).",
    level: "intermediate",
    codeExample: "// linear O(n), binary O(2ⁿ)"
  },
  {
    question: "What is the space complexity of linear recursion vs binary recursion?",
    shortAnswer: "Both are O(n) for the recursion stack.",
    explanation: "The depth is n for both in the worst case.",
    hint: "Both O(n).",
    level: "intermediate",
    codeExample: "// both O(n) space"
  },
  {
    question: "Can linear recursion be used to reverse a string?",
    shortAnswer: "Yes, by recursively reversing the substring and appending the first character.",
    explanation: "The recurrence is T(n) = T(n-1) + O(n) if using substring.",
    hint: "String reversal.",
    level: "intermediate",
    codeExample: "// reverse(s) = reverse(s.substring(1)) + s.charAt(0)"
  },
  {
    question: "What is the recurrence for linear recursion with O(n) work per call?",
    shortAnswer: "T(n) = T(n-1) + O(n), T(0) = O(1) → O(n²).",
    explanation: "If each call does O(n) work, the total is O(n²).",
    hint: "O(n²).",
    level: "advanced",
    codeExample: "// T(n) = T(n-1) + n → O(n²)"
  },
  {
    question: "What is an example of linear recursion with O(n) work per call?",
    shortAnswer: "String reversal using substring and concatenation.",
    explanation: "Each call creates a new substring of size O(n).",
    hint: "String reversal.",
    level: "advanced",
    codeExample: "// reverse(s) = reverse(s.substring(1)) + s.charAt(0)"
  },
  {
    question: "What is the time complexity of string reversal using linear recursion?",
    shortAnswer: "O(n²) if using substring; O(n) if using character array.",
    explanation: "Substring creates new strings, leading to O(n²) time.",
    hint: "O(n²) with substring.",
    level: "advanced",
    codeExample: "// O(n²) with substring"
  },
  {
    question: "How can linear recursion be used to count digits in a number?",
    shortAnswer: "By dividing the number by 10 each call: countDigits(n) = 1 + countDigits(n/10).",
    explanation: "The recurrence is T(n) = T(n/10) + O(1) → O(log n).",
    hint: "Divide by 10.",
    level: "intermediate",
    codeExample: "// T(n) = T(n/10) + 1 → O(log n)"
  },
  {
    question: "What is the time complexity of counting digits recursively?",
    shortAnswer: "O(log n) — logarithmic time.",
    explanation: "Each call divides the number by 10, so the number of calls is log₁₀(n).",
    hint: "O(log n).",
    level: "intermediate",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the space complexity of counting digits recursively?",
    shortAnswer: "O(log n) — recursion stack depth = number of digits.",
    explanation: "The depth is the number of digits, which is O(log n).",
    hint: "O(log n).",
    level: "intermediate",
    codeExample: "// O(log n) space"
  },
  {
    question: "Is counting digits recursively considered linear recursion?",
    shortAnswer: "Yes, because it makes one recursive call per level.",
    explanation: "Even though the reduction is by factor 10, it's still one call per level.",
    hint: "One call per level.",
    level: "intermediate",
    codeExample: "// linear recursion with n/10 reduction"
  },
  {
    question: "What is the recurrence for linear recursion with reduction by 2?",
    shortAnswer: "T(n) = T(n/2) + O(1) → O(log n).",
    explanation: "When the input is divided by 2 each call, the number of calls is log₂(n).",
    hint: "O(log n).",
    level: "intermediate",
    codeExample: "// T(n) = T(n/2) + 1 → O(log n)"
  },
  {
    question: "What is the time complexity of linear recursion with reduction by 2?",
    shortAnswer: "O(log n) — logarithmic time.",
    explanation: "The number of recursive calls is log₂(n).",
    hint: "O(log n).",
    level: "intermediate",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the space complexity of linear recursion with reduction by 2?",
    shortAnswer: "O(log n) — recursion stack depth = log₂(n).",
    explanation: "The depth is logarithmic.",
    hint: "O(log n).",
    level: "intermediate",
    codeExample: "// O(log n) space"
  },
  {
    question: "When should you use linear recursion?",
    shortAnswer: "When the problem naturally has a recursive structure and n is small.",
    explanation: "Linear recursion is elegant but uses O(n) space. Use iteration for large n.",
    hint: "Small n.",
    level: "basic",
    codeExample: "// Use for small n"
  },
  {
    question: "When should you use iteration instead of linear recursion?",
    shortAnswer: "When n is large or when O(1) space is required.",
    explanation: "Iteration avoids the recursion stack and is more memory-efficient.",
    hint: "Large n.",
    level: "basic",
    codeExample: "// Use iteration for large n"
  }
];

export default questions;