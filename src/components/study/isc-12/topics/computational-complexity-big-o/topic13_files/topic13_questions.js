const questions = [
  {
    question: "What is the time complexity of a for loop that runs from 0 to n-1?",
    shortAnswer: "O(n) — linear time.",
    explanation: "The loop body executes exactly n times.",
    hint: "Count the iterations.",
    level: "basic",
    codeExample: "for (int i = 0; i < n; i++) { ... }"
  },
  {
    question: "What is the time complexity of a loop where i doubles each iteration?",
    shortAnswer: "O(log n) — logarithmic time.",
    explanation: "The loop runs log₂(n) times.",
    hint: "Doubling means fewer iterations.",
    level: "basic",
    codeExample: "for (int i = 1; i < n; i *= 2) { ... }"
  },
  {
    question: "What is the time complexity of a loop that halves n each iteration?",
    shortAnswer: "O(log n) — logarithmic time.",
    explanation: "The loop runs log₂(n) times.",
    hint: "Halving reduces quickly.",
    level: "basic",
    codeExample: "while (n > 0) { n /= 2; }"
  },
  {
    question: "What is the time complexity of a loop that runs i*i <= n?",
    shortAnswer: "O(√n) — square root time.",
    explanation: "The loop runs √n times.",
    hint: "i goes up to sqrt(n).",
    level: "intermediate",
    codeExample: "for (int i = 1; i*i <= n; i++) { ... }"
  },
  {
    question: "What is the time complexity of a loop with a constant number of iterations (e.g., 10)?",
    shortAnswer: "O(1) — constant time.",
    explanation: "The number of iterations does not depend on n.",
    hint: "Fixed iterations.",
    level: "basic",
    codeExample: "for (int i = 0; i < 10; i++) { ... }"
  },
  {
    question: "What is the time complexity of a loop that increments by 2 each iteration?",
    shortAnswer: "O(n) — still linear.",
    explanation: "O(n/2) = O(n) after dropping constants.",
    hint: "Constant step.",
    level: "basic",
    codeExample: "for (int i = 0; i < n; i += 2) { ... }"
  },
  {
    question: "What is the time complexity of a loop that depends on two variables n and m?",
    shortAnswer: "O(n+m) if separate loops, or O(n*m) if nested (but that's next topic).",
    explanation: "For a single loop, the complexity is the number of iterations, which could be O(n+m) if it runs n+m times.",
    hint: "Add or multiply?",
    level: "intermediate",
    codeExample: "for (int i = 0; i < n + m; i++) { ... } // O(n+m)"
  },
  {
    question: "What is the time complexity of the loop: for (int i = n; i > 0; i /= 2)?",
    shortAnswer: "O(log n).",
    explanation: "i halves each iteration, so log₂(n) iterations.",
    hint: "Halving.",
    level: "basic",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the time complexity of the loop: for (int i = 0; i < n; i = i * 2)?",
    shortAnswer: "O(log n) — but careful: i starts at 0, so infinite? Actually it would be infinite unless i starts at 1.",
    explanation: "If i starts at 1, it's O(log n). Starting at 0 leads to infinite loop.",
    hint: "Check the starting value.",
    level: "intermediate",
    codeExample: "// if i=0, infinite; if i=1, O(log n)"
  },
  {
    question: "What is the time complexity of a loop that breaks early in the worst case?",
    shortAnswer: "O(n) in the worst case, but Ω(1) in best case.",
    explanation: "Worst-case: the break condition is never met, so it runs n times.",
    hint: "Worst-case matters for Big-O.",
    level: "intermediate",
    codeExample: "while (i < n && arr[i] != target) { i++; }"
  },
  {
    question: "How do you analyze the complexity of a loop with a variable step?",
    shortAnswer: "You determine the number of iterations by solving the recurrence of the loop variable.",
    explanation: "For example, if i starts at 1 and doubles each time, the number of steps is log₂(n).",
    hint: "Solve for k in i = f(k).",
    level: "intermediate",
    codeExample: "// i = 1, 2, 4, 8, ..."
  },
  {
    question: "What is the time complexity of a loop that runs from 0 to n but with a break when a condition is met?",
    shortAnswer: "Worst-case O(n); best-case Ω(1).",
    explanation: "If the condition is met early, it's fast; otherwise it's linear.",
    hint: "Depends on input.",
    level: "intermediate",
    codeExample: "for (int i=0; i<n; i++) { if (arr[i] == target) break; }"
  },
  {
    question: "What is the time complexity of the loop: for (int i = 1; i < n; i = i + 2)?",
    shortAnswer: "O(n) — because it's n/2 iterations, which is O(n).",
    explanation: "Constant factor (2) is ignored.",
    hint: "Step is constant.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the time complexity of a loop where the variable increases by a constant factor (e.g., i = i * c)?",
    shortAnswer: "O(log_c n) = O(log n).",
    explanation: "Any constant factor gives logarithmic complexity.",
    hint: "Base doesn't matter.",
    level: "intermediate",
    codeExample: "for (int i = 1; i < n; i *= 3) { ... } // O(log n)"
  },
  {
    question: "What is the time complexity of a loop that runs until i becomes n but i is updated as i = i + 1?",
    shortAnswer: "O(n) — linear.",
    explanation: "Standard increment.",
    hint: "Basic loop.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the time complexity of a loop that runs until i becomes n but i is updated as i = i + 10?",
    shortAnswer: "O(n) — still linear.",
    explanation: "O(n/10) = O(n).",
    hint: "Constant step.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "How do you count the number of iterations in a loop with i *= 2?",
    shortAnswer: "It's floor(log₂(n)) + 1.",
    explanation: "The loop runs until i >= n.",
    hint: "Solve 2^k >= n.",
    level: "intermediate",
    codeExample: "// k = ceil(log2(n))"
  },
  {
    question: "How do you count the number of iterations in a loop with i /= 2?",
    shortAnswer: "It's floor(log₂(n)) + 1.",
    explanation: "The loop runs until i becomes 0.",
    hint: "Solve n/2^k = 0.",
    level: "intermediate",
    codeExample: "// k = floor(log2(n)) + 1"
  },
  {
    question: "What is the time complexity of a loop that prints all numbers from 0 to n?",
    shortAnswer: "O(n) — linear.",
    explanation: "Printing each number is O(1), loop runs n times.",
    hint: "Printing is constant.",
    level: "basic",
    codeExample: "for (int i=0; i<n; i++) System.out.println(i);"
  },
  {
    question: "What is the time complexity of a loop that calculates the sum of numbers from 1 to n?",
    shortAnswer: "O(n) using a loop, but O(1) using the formula n(n+1)/2.",
    explanation: "The loop is linear; the formula is constant.",
    hint: "Optimization possible.",
    level: "intermediate",
    codeExample: "// sum = n*(n+1)/2 is O(1)"
  },
  {
    question: "What is the time complexity of a loop that runs while i < n and i starts at 1 and doubles?",
    shortAnswer: "O(log n).",
    explanation: "Number of steps = log₂(n).",
    hint: "Doubling.",
    level: "basic",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the time complexity of a loop that runs while i > 0 and i is divided by 3?",
    shortAnswer: "O(log n) — base 3, but still logarithmic.",
    explanation: "Any constant division gives O(log n).",
    hint: "Base doesn't matter.",
    level: "intermediate",
    codeExample: "// O(log_3 n) = O(log n)"
  },
  {
    question: "What is the time complexity of a loop that iterates from 0 to n-1 but does O(1) work inside?",
    shortAnswer: "O(n) — linear.",
    explanation: "Work per iteration is constant, so total is O(n).",
    hint: "Constant work.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the time complexity of a loop that iterates from 0 to n-1 but does O(n) work inside?",
    shortAnswer: "O(n²) — because n iterations * n work = n².",
    explanation: "Even a single loop can be quadratic if the body is O(n).",
    hint: "Work inside matters.",
    level: "intermediate",
    codeExample: "for (int i=0; i<n; i++) { for (int j=0; j<n; j++) { ... } } // O(n²)"
  },
  {
    question: "What is the time complexity of a loop that iterates from 0 to n-1 but does O(log n) work inside?",
    shortAnswer: "O(n log n) — because n iterations * log n work.",
    explanation: "The total is the product of iterations and per-iteration work.",
    hint: "Multiply.",
    level: "intermediate",
    codeExample: "// O(n log n)"
  },
  {
    question: "What is the time complexity of a loop that iterates from 0 to n-1 but does O(√n) work inside?",
    shortAnswer: "O(n√n).",
    explanation: "Multiplicative complexity.",
    hint: "Multiply iterations and per-iteration work.",
    level: "advanced",
    codeExample: "// O(n√n)"
  },
  {
    question: "What is the time complexity of a loop that iterates from 0 to n-1 but does O(1) work inside, but has an inner loop that runs a constant number of times?",
    shortAnswer: "O(n) — because the inner loop is constant time.",
    explanation: "Constants don't affect Big-O.",
    hint: "Constant inner loop.",
    level: "intermediate",
    codeExample: "for (int i=0; i<n; i++) { for (int j=0; j<10; j++) { ... } } // O(n)"
  },
  {
    question: "What is the time complexity of a loop that iterates from 0 to n-1 but has a break statement that can stop early?",
    shortAnswer: "Worst-case O(n), but best-case Ω(1).",
    explanation: "The worst-case is when the break is never taken.",
    hint: "Worst-case matters.",
    level: "intermediate",
    codeExample: "// break when condition met"
  },
  {
    question: "What is the time complexity of a loop that iterates from 0 to n-1 but has a continue statement?",
    shortAnswer: "O(n) — continue doesn't change the number of iterations.",
    explanation: "It just skips the rest of the body, but still iterates n times.",
    hint: "Continue doesn't reduce iterations.",
    level: "intermediate",
    codeExample: "// continue skips rest of body"
  },
  {
    question: "How do you analyze the complexity of a while loop?",
    shortAnswer: "Determine how many times the condition is true, based on how the loop variable changes.",
    explanation: "Similar to for loops, count the iterations.",
    hint: "Same as for loop.",
    level: "basic",
    codeExample: "while (i < n) { i++; } // O(n)"
  },
  {
    question: "What is the time complexity of a loop that iterates over all elements of an array of size n?",
    shortAnswer: "O(n) — linear.",
    explanation: "You visit each element once.",
    hint: "Array traversal.",
    level: "basic",
    codeExample: "for (int x : arr) { ... }"
  }
];

export default questions;