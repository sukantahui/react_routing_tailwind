const questions = [
  {
    question: "What is the recurrence for recursive factorial?",
    shortAnswer: "T(n) = T(n-1) + O(1), T(0) = O(1)",
    explanation: "Each call does constant work (multiplication) and makes one recursive call on n-1.",
    hint: "One call, constant work.",
    level: "basic",
    codeExample: "// T(n) = T(n-1) + 1"
  },
  {
    question: "What is the time complexity of recursive factorial?",
    shortAnswer: "O(n) — linear time.",
    explanation: "The recurrence T(n) = T(n-1) + O(1) solves to O(n).",
    hint: "Linear.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of recursive factorial?",
    shortAnswer: "O(n) — due to the recursion stack.",
    explanation: "The recursion depth is n, so O(n) stack space is used.",
    hint: "Depth = n.",
    level: "basic",
    codeExample: "// O(n) space"
  },
  {
    question: "What is the base case for recursive factorial?",
    shortAnswer: "factorial(0) = 1 or factorial(1) = 1.",
    explanation: "The recursion stops when n reaches 0 or 1.",
    hint: "Zero or one.",
    level: "basic",
    codeExample: "// if (n <= 1) return 1;"
  },
  {
    question: "What is the iterative version of factorial?",
    shortAnswer: "Loop from 2 to n, multiplying the result.",
    explanation: "Iterative factorial is O(n) time and O(1) space.",
    hint: "Loop.",
    level: "basic",
    codeExample: "// for (int i=2; i<=n; i++) result *= i;"
  },
  {
    question: "Why does recursive factorial use O(n) space?",
    shortAnswer: "Because each recursive call adds a frame to the call stack, and there are n calls.",
    explanation: "The stack grows to depth n before unwinding.",
    hint: "Call stack depth.",
    level: "basic",
    codeExample: "// n stack frames"
  },
  {
    question: "Can recursive factorial cause a stack overflow?",
    shortAnswer: "Yes, for large n (e.g., n > 10,000 in Java).",
    explanation: "The recursion depth is n, which can exceed the stack size limit.",
    hint: "Large n.",
    level: "intermediate",
    codeExample: "// StackOverflowError for large n"
  },
  {
    question: "What is the maximum value of n for which long factorial works without overflow?",
    shortAnswer: "20! fits in long (20! = 2,432,902,008,176,640,000 < 9.22e18). 21! overflows.",
    explanation: "21! = 51,090,942,171,709,440,000 > 9.22e18.",
    hint: "20! is safe.",
    level: "intermediate",
    codeExample: "// 20! = 2.43e18"
  },
  {
    question: "What is the maximum value of n for which int factorial works without overflow?",
    shortAnswer: "12! fits in int (12! = 479,001,600 < 2.147e9). 13! overflows.",
    explanation: "13! = 6,227,020,800 > 2.147e9.",
    hint: "12! is safe.",
    level: "intermediate",
    codeExample: "// 12! = 479,001,600"
  },
  {
    question: "What is the recurrence for tail-recursive factorial?",
    shortAnswer: "T(n) = T(n-1) + O(1) — same as regular, but tail-recursive.",
    explanation: "The recursive call is the last operation, allowing optimization.",
    hint: "Same recurrence.",
    level: "intermediate",
    codeExample: "// T(n) = T(n-1) + 1"
  },
  {
    question: "What is the space complexity of tail-recursive factorial with TCO?",
    shortAnswer: "O(1) with Tail Call Optimization (TCO).",
    explanation: "TCO reuses the stack frame, eliminating the O(n) space overhead.",
    hint: "Optimization.",
    level: "advanced",
    codeExample: "// O(1) space with TCO"
  },
  {
    question: "Does Java support Tail Call Optimization for factorial?",
    shortAnswer: "No, Java does not support TCO.",
    explanation: "Java compilers do not optimize tail recursion, so space is still O(n).",
    hint: "Not in Java.",
    level: "advanced",
    codeExample: "// Not supported in Java"
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
    question: "What is the maximum recursion depth for factorial(n)?",
    shortAnswer: "n.",
    explanation: "The recursion depth is equal to the input size n.",
    hint: "Depth = n.",
    level: "basic",
    codeExample: "// depth = n"
  },
  {
    question: "Can factorial be computed without recursion or loops?",
    shortAnswer: "Not practically; factorial is defined iteratively or recursively.",
    explanation: "There is no closed-form O(1) formula for factorial.",
    hint: "No formula.",
    level: "basic",
    codeExample: "// no closed form"
  },
  {
    question: "What is the work done at each recursive call in factorial?",
    shortAnswer: "O(1) — a single multiplication operation.",
    explanation: "Each call performs n * factorial(n-1), which is constant time.",
    hint: "Constant work.",
    level: "basic",
    codeExample: "// O(1) per call"
  },
  {
    question: "Why is factorial considered a linear recursion?",
    shortAnswer: "Because there is exactly one recursive call per level.",
    explanation: "Linear recursion has a single branch, forming a chain of calls.",
    hint: "One call.",
    level: "intermediate",
    codeExample: "// single recursive call"
  },
  {
    question: "What is the difference between recursive and iterative factorial in terms of space?",
    shortAnswer: "Recursive is O(n), iterative is O(1).",
    explanation: "Recursion uses the call stack; iteration uses a single variable.",
    hint: "Stack vs variable.",
    level: "basic",
    codeExample: "// recursive O(n), iterative O(1)"
  },
  {
    question: "Can factorial be optimized using memoization?",
    shortAnswer: "No, because there are no overlapping subproblems.",
    explanation: "Factorial has a simple chain of calls with no repeated subproblems.",
    hint: "No overlap.",
    level: "advanced",
    codeExample: "// not needed"
  },
  {
    question: "What is the time complexity of iterative factorial?",
    shortAnswer: "O(n) — linear time.",
    explanation: "The loop runs n-1 times, each iteration O(1).",
    hint: "Linear.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of iterative factorial?",
    shortAnswer: "O(1) — constant space.",
    explanation: "It uses only a few variables.",
    hint: "No stack.",
    level: "basic",
    codeExample: "// O(1) space"
  },
  {
    question: "Can recursive factorial be converted to tail recursion?",
    shortAnswer: "Yes, by using an accumulator parameter.",
    explanation: "Tail-recursive factorial: factorial(n, acc) = factorial(n-1, acc*n).",
    hint: "Accumulator.",
    level: "advanced",
    codeExample: "// tailRecFact(n, acc)"
  },
  {
    question: "What is the space complexity of tail-recursive factorial in Java?",
    shortAnswer: "O(n) — because Java doesn't support TCO.",
    explanation: "Even though it's tail-recursive, Java doesn't optimize it.",
    hint: "Java limitation.",
    level: "advanced",
    codeExample: "// O(n) in Java"
  },
  {
    question: "What is the time complexity of factorial using BigInteger?",
    shortAnswer: "O(n) — but each multiplication is O(log n) due to BigInteger size.",
    explanation: "The number of multiplications is O(n), and each multiplication is O(log n) for large numbers.",
    hint: "Still O(n) operations.",
    level: "advanced",
    codeExample: "// O(n log n) roughly"
  },
  {
    question: "What is the largest factorial that can be computed in reasonable time?",
    shortAnswer: "About 10,000! in a few seconds using iterative BigInteger.",
    explanation: "Factorial grows very fast, but 10,000! has about 35,000 digits.",
    hint: "Limited by time.",
    level: "advanced",
    codeExample: "// 10,000! is feasible"
  },
  {
    question: "Why do we study recursive factorial if iteration is better?",
    shortAnswer: "To understand recursion patterns, recurrence relations, and the call stack.",
    explanation: "Factorial is a simple example that illustrates important concepts.",
    hint: "Educational value.",
    level: "basic",
    codeExample: "// Learning tool"
  },
  {
    question: "What is the recurrence for factorial with an accumulator?",
    shortAnswer: "T(n) = T(n-1) + O(1) — same as regular.",
    explanation: "The recurrence is the same; the implementation changes.",
    hint: "Same recurrence.",
    level: "intermediate",
    codeExample: "// T(n) = T(n-1) + 1"
  },
  {
    question: "How many stack frames are used for factorial(5)?",
    shortAnswer: "6 frames (factorial(5), factorial(4), factorial(3), factorial(2), factorial(1), factorial(0)).",
    explanation: "Each call pushes a frame until the base case is reached.",
    hint: "6 frames.",
    level: "basic",
    codeExample: "// 6 frames"
  },
  {
    question: "What is the value of 0! (zero factorial)?",
    shortAnswer: "1.",
    explanation: "By definition, 0! = 1.",
    hint: "1.",
    level: "basic",
    codeExample: "// 0! = 1"
  },
  {
    question: "What is the value of 1! ?",
    shortAnswer: "1.",
    explanation: "1! = 1.",
    hint: "1.",
    level: "basic",
    codeExample: "// 1! = 1"
  },
  {
    question: "What is the value of 2! ?",
    shortAnswer: "2.",
    explanation: "2! = 2 × 1 = 2.",
    hint: "2.",
    level: "basic",
    codeExample: "// 2! = 2"
  },
  {
    question: "What is the value of 3! ?",
    shortAnswer: "6.",
    explanation: "3! = 3 × 2 × 1 = 6.",
    hint: "6.",
    level: "basic",
    codeExample: "// 3! = 6"
  }
];

export default questions;