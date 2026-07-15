const questions = [
  {
    question: "What is the recurrence for recursive sum of n numbers?",
    shortAnswer: "T(n) = T(n-1) + O(1), T(0) = O(1)",
    explanation: "Each call adds n and makes one recursive call on n-1. The work per call is constant.",
    hint: "One call, constant work.",
    level: "basic",
    codeExample: "// T(n) = T(n-1) + 1"
  },
  {
    question: "What is the time complexity of recursive sum?",
    shortAnswer: "O(n) — linear time.",
    explanation: "The recurrence T(n) = T(n-1) + O(1) solves to O(n).",
    hint: "Linear.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of recursive sum?",
    shortAnswer: "O(n) — due to the recursion stack.",
    explanation: "The recursion depth is n, so O(n) stack space is used.",
    hint: "Depth = n.",
    level: "basic",
    codeExample: "// O(n) space"
  },
  {
    question: "What is the base case for recursive sum?",
    shortAnswer: "sum(0) = 0.",
    explanation: "The recursion stops when n reaches 0.",
    hint: "Zero is the base.",
    level: "basic",
    codeExample: "// if (n == 0) return 0;"
  },
  {
    question: "What is the iterative version of sum?",
    shortAnswer: "Loop from 1 to n, accumulating the sum.",
    explanation: "Iterative sum is O(n) time and O(1) space.",
    hint: "Loop.",
    level: "basic",
    codeExample: "// for (int i=1; i<=n; i++) sum += i;"
  },
  {
    question: "What is the formula for sum of 1 to n?",
    shortAnswer: "n(n+1)/2.",
    explanation: "This is the closed-form formula that gives O(1) time and space.",
    hint: "Gauss formula.",
    level: "basic",
    codeExample: "// n*(n+1)/2"
  },
  {
    question: "Why does recursive sum use O(n) space?",
    shortAnswer: "Because each recursive call adds a frame to the call stack, and there are n calls.",
    explanation: "The stack grows to depth n before unwinding.",
    hint: "Call stack depth.",
    level: "basic",
    codeExample: "// n stack frames"
  },
  {
    question: "Can recursive sum cause a stack overflow?",
    shortAnswer: "Yes, for large n (e.g., n > 10,000 in Java).",
    explanation: "The recursion depth is n, which can exceed the stack size limit.",
    hint: "Large n.",
    level: "intermediate",
    codeExample: "// StackOverflowError for large n"
  },
  {
    question: "What is the recurrence for tail-recursive sum?",
    shortAnswer: "T(n) = T(n-1) + O(1) — same as regular, but tail-recursive.",
    explanation: "The recursive call is the last operation, allowing optimization.",
    hint: "Same recurrence.",
    level: "intermediate",
    codeExample: "// T(n) = T(n-1) + 1"
  },
  {
    question: "What is the space complexity of tail-recursive sum with TCO?",
    shortAnswer: "O(1) with Tail Call Optimization (TCO).",
    explanation: "TCO reuses the stack frame, eliminating the O(n) space overhead.",
    hint: "Optimization.",
    level: "advanced",
    codeExample: "// O(1) space with TCO"
  },
  {
    question: "Does Java support Tail Call Optimization?",
    shortAnswer: "No, Java does not support TCO.",
    explanation: "Java compilers do not optimize tail recursion, so space is still O(n).",
    hint: "Not in Java.",
    level: "advanced",
    codeExample: "// Not supported in Java"
  },
  {
    question: "What languages support TCO?",
    shortAnswer: "Functional languages like Scheme, Scala, and some others.",
    explanation: "Languages that support TCO can optimize tail-recursive functions to O(1) space.",
    hint: "Functional languages.",
    level: "advanced",
    codeExample: "// Scala, Scheme"
  },
  {
    question: "Why is the formula n(n+1)/2 better than recursion?",
    shortAnswer: "Because it's O(1) time and O(1) space.",
    explanation: "The formula directly computes the sum without any loops or recursion.",
    hint: "Constant time.",
    level: "basic",
    codeExample: "// O(1)"
  },
  {
    question: "How many recursive calls are made for sum(n)?",
    shortAnswer: "n + 1 calls (including the base case).",
    explanation: "sum(n) calls sum(n-1), which calls sum(n-2), ... down to sum(0).",
    hint: "n+1 calls.",
    level: "basic",
    codeExample: "// n + 1 calls"
  },
  {
    question: "What is the maximum recursion depth for sum(n)?",
    shortAnswer: "n.",
    explanation: "The recursion depth is equal to the input size n.",
    hint: "Depth = n.",
    level: "basic",
    codeExample: "// depth = n"
  },
  {
    question: "Can recursive sum be implemented without a base case?",
    shortAnswer: "No, the base case is essential for termination.",
    explanation: "Without a base case, the recursion would continue indefinitely.",
    hint: "Essential.",
    level: "basic",
    codeExample: "// Must have base case"
  },
  {
    question: "What is the work done at each recursive call in sum?",
    shortAnswer: "O(1) — a single addition operation.",
    explanation: "Each call performs n + sum(n-1), which is constant time.",
    hint: "Constant work.",
    level: "basic",
    codeExample: "// O(1) per call"
  },
  {
    question: "Why is recursive sum a linear recursion?",
    shortAnswer: "Because there is exactly one recursive call per level.",
    explanation: "Linear recursion has a single branch, forming a chain of calls.",
    hint: "One call.",
    level: "intermediate",
    codeExample: "// single recursive call"
  },
  {
    question: "What is the difference between recursive and iterative sum in terms of space?",
    shortAnswer: "Recursive is O(n), iterative is O(1).",
    explanation: "Recursion uses the call stack; iteration uses a single variable.",
    hint: "Stack vs variable.",
    level: "basic",
    codeExample: "// recursive O(n), iterative O(1)"
  },
  {
    question: "Can the recursive sum be optimized using memoization?",
    shortAnswer: "No, because there are no overlapping subproblems.",
    explanation: "Sum has a simple chain of calls with no repeated subproblems.",
    hint: "No overlap.",
    level: "advanced",
    codeExample: "// not needed"
  },
  {
    question: "What is the recurrence for sum of numbers in an array using recursion?",
    shortAnswer: "T(n) = T(n-1) + O(1) — same as sum(1..n).",
    explanation: "Array sum recursively adds the last element to the sum of the rest.",
    hint: "Same recurrence.",
    level: "intermediate",
    codeExample: "// arraySum(arr, n) = arr[n-1] + arraySum(arr, n-1)"
  },
  {
    question: "What is the space complexity of array sum with recursion?",
    shortAnswer: "O(n) — due to recursion stack depth = n.",
    explanation: "Same as sum(1..n).",
    hint: "Depth = n.",
    level: "intermediate",
    codeExample: "// O(n) space"
  },
  {
    question: "What is the time complexity of array sum with recursion?",
    shortAnswer: "O(n) — visits each element once.",
    explanation: "Each element is added once.",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "// O(n) time"
  },
  {
    question: "Can recursion depth be reduced for sum?",
    shortAnswer: "Yes, by using tail recursion with TCO, or by converting to iteration.",
    explanation: "Tail recursion can reduce space if TCO is supported.",
    hint: "TCO or iteration.",
    level: "advanced",
    codeExample: "// tail recursion or loop"
  },
  {
    question: "What is the recurrence for sum with a divide-and-conquer approach?",
    shortAnswer: "T(n) = 2T(n/2) + O(1) — but this is unnecessary for sum.",
    explanation: "Dividing the problem into halves for sum is inefficient and not used.",
    hint: "D&C.",
    level: "advanced",
    codeExample: "// T(n) = 2T(n/2) + 1 → O(n)"
  },
  {
    question: "What is the time complexity of divide-and-conquer sum?",
    shortAnswer: "O(n) — same as linear recursion.",
    explanation: "T(n) = 2T(n/2) + O(1) solves to O(n).",
    hint: "Still O(n).",
    level: "advanced",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of divide-and-conquer sum?",
    shortAnswer: "O(log n) — due to recursion stack depth = log₂(n).",
    explanation: "The recursion depth is logarithmic.",
    hint: "Depth = log n.",
    level: "advanced",
    codeExample: "// O(log n)"
  },
  {
    question: "Why is D&C sum not used in practice?",
    shortAnswer: "Because the simple linear recursion/iteration is simpler and efficient enough.",
    explanation: "D&C adds unnecessary complexity for a simple problem.",
    hint: "Overkill.",
    level: "advanced",
    codeExample: "// Not used"
  },
  {
    question: "What is the sum of 1 to n using the formula?",
    shortAnswer: "n(n+1)/2.",
    explanation: "This is the classic Gauss formula.",
    hint: "Gauss.",
    level: "basic",
    codeExample: "// n*(n+1)/2"
  },
  {
    question: "Can recursion be used to sum numbers in a balanced way?",
    shortAnswer: "Yes, using divide-and-conquer, but it's unnecessary for simple sum.",
    explanation: "Divide-and-conquer sum is O(n) time and O(log n) space.",
    hint: "D&C.",
    level: "advanced",
    codeExample: "// divide-and-conquer sum"
  },
  {
    question: "What is the practical limit of n for recursive sum in Java?",
    shortAnswer: "About 10,000 to 50,000 depending on stack size.",
    explanation: "Java's default stack size is typically 1MB, limiting recursion depth.",
    hint: "Stack limit.",
    level: "intermediate",
    codeExample: "// ~10,000-50,000"
  }
];

export default questions;