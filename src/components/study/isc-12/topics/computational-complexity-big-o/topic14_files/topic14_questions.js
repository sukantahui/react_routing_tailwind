const questions = [
  {
    question: "What is the time complexity of two nested loops both running n times?",
    shortAnswer: "O(n²) — quadratic time.",
    explanation: "Total iterations = n * n = n².",
    hint: "Multiply the iteration counts.",
    level: "basic",
    codeExample: "for (i=0; i<n; i++) for (j=0; j<n; j++) { ... }"
  },
  {
    question: "What is the time complexity of a nested loop where outer runs n times and inner runs m times?",
    shortAnswer: "O(n·m) — product of the sizes.",
    explanation: "Total iterations = n * m.",
    hint: "Different variables.",
    level: "basic",
    codeExample: "for (i=0; i<n; i++) for (j=0; j<m; j++) { ... }"
  },
  {
    question: "What is the time complexity of a triangular loop where inner loop runs from i to n?",
    shortAnswer: "O(n²) — still quadratic.",
    explanation: "Total iterations = n(n+1)/2, which simplifies to O(n²).",
    hint: "Sum of series.",
    level: "intermediate",
    codeExample: "for (i=0; i<n; i++) for (j=i; j<n; j++) { ... }"
  },
  {
    question: "What is the time complexity of a nested loop where outer runs n times and inner runs a constant number of times (e.g., 10)?",
    shortAnswer: "O(n) — linear.",
    explanation: "Total iterations = n * constant = O(n).",
    hint: "Constant factor drops.",
    level: "intermediate",
    codeExample: "for (i=0; i<n; i++) for (j=0; j<10; j++) { ... }"
  },
  {
    question: "What is the time complexity of a nested loop where outer runs n times and inner runs O(log n) times?",
    shortAnswer: "O(n log n).",
    explanation: "Total = n * log n.",
    hint: "Product of linear and logarithmic.",
    level: "intermediate",
    codeExample: "for (i=0; i<n; i++) for (j=1; j<n; j*=2) { ... }"
  },
  {
    question: "What is the time complexity of a nested loop where outer runs O(log n) times and inner runs n times?",
    shortAnswer: "O(n log n).",
    explanation: "Total = log n * n.",
    hint: "Same as above.",
    level: "intermediate",
    codeExample: "for (i=1; i<n; i*=2) for (j=0; j<n; j++) { ... }"
  },
  {
    question: "What is the time complexity of three nested loops each running n times?",
    shortAnswer: "O(n³) — cubic.",
    explanation: "Total = n * n * n = n³.",
    hint: "Multiply all three.",
    level: "basic",
    codeExample: "for (i) for (j) for (k) { ... }"
  },
  {
    question: "What is the time complexity of a nested loop where the inner loop depends on the outer loop variable, e.g., j from 0 to i?",
    shortAnswer: "O(n²) — still quadratic.",
    explanation: "Sum_{i=0}^{n-1} (i+1) = n(n+1)/2 = O(n²).",
    hint: "Sum of arithmetic series.",
    level: "intermediate",
    codeExample: "for (i=0; i<n; i++) for (j=0; j<i; j++) { ... }"
  },
  {
    question: "What is the time complexity of nested loops where the inner loop runs n - i times?",
    shortAnswer: "O(n²).",
    explanation: "Sum_{i=0}^{n-1} (n-i) = n(n+1)/2 = O(n²).",
    hint: "Same as triangular.",
    level: "intermediate",
    codeExample: "for (i=0; i<n; i++) for (j=i; j<n; j++) { ... }"
  },
  {
    question: "Can a nested loop be O(n) even with two loops?",
    shortAnswer: "Yes, if the inner loop runs a constant number of times, or if the outer loop and inner loop together iterate n times total.",
    explanation: "Example: for (i=0; i<n; i++) for (j=0; j<10; j++) → O(n). Or if one loop is just for indexing.",
    hint: "Constant inner loop.",
    level: "intermediate",
    codeExample: "// constant inner loop"
  },
  {
    question: "What is the time complexity of nested loops where outer runs n and inner runs n but with an early break in the inner loop?",
    shortAnswer: "Worst-case O(n²), best-case Ω(1) (if break happens immediately).",
    explanation: "The worst-case is still quadratic.",
    hint: "Worst-case matters.",
    level: "intermediate",
    codeExample: "// break when condition met"
  },
  {
    question: "What is the time complexity of a nested loop where the outer loop runs n and the inner loop runs n but the inner loop only executes for half the outer iterations?",
    shortAnswer: "O(n²) — still quadratic.",
    explanation: "Total is still proportional to n²; constant factors don't matter.",
    hint: "Drop constant.",
    level: "intermediate",
    codeExample: "// if (i%2==0) inner loop"
  },
  {
    question: "How do you analyze a nested loop with a break that depends on the outer loop?",
    shortAnswer: "You must consider the worst-case, which is O(n²) if the break never occurs.",
    explanation: "Analyze the maximum iterations.",
    hint: "Worst-case.",
    level: "advanced",
    codeExample: "// break based on condition"
  },
  {
    question: "What is the time complexity of a nested loop that processes a 2D array of size n×m?",
    shortAnswer: "O(n·m) — product of dimensions.",
    explanation: "Visiting each cell once.",
    hint: "Matrix traversal.",
    level: "basic",
    codeExample: "for (i=0; i<n; i++) for (j=0; j<m; j++) { arr[i][j] ... }"
  },
  {
    question: "What is the time complexity of a nested loop that compares all pairs in an array?",
    shortAnswer: "O(n²) — but often you can do better (e.g., using sorting or hashing).",
    explanation: "Comparing each pair is O(n²).",
    hint: "Pairwise comparison.",
    level: "intermediate",
    codeExample: "for (i=0; i<n; i++) for (j=i+1; j<n; j++) { ... }"
  },
  {
    question: "What is the total iterations of: for (i=1; i<=n; i++) for (j=1; j<=i; j++)?",
    shortAnswer: "n(n+1)/2 = O(n²).",
    explanation: "Sum of i from 1 to n is n(n+1)/2.",
    hint: "Sum of integers.",
    level: "intermediate",
    codeExample: "// O(n²)"
  },
  {
    question: "What is the total iterations of: for (i=1; i<=n; i*=2) for (j=1; j<=n; j++)?",
    shortAnswer: "O(n log n).",
    explanation: "Outer runs log n times, inner n times.",
    hint: "Multiply.",
    level: "intermediate",
    codeExample: "// O(n log n)"
  },
  {
    question: "What is the total iterations of: for (i=1; i<=n; i++) for (j=1; j<=i; j*=2)?",
    shortAnswer: "O(n log n) — sum_{i=1}^n log i = O(n log n).",
    explanation: "Inner loop runs log i times on average.",
    hint: "Sum of logs.",
    level: "advanced",
    codeExample: "// O(n log n)"
  },
  {
    question: "What is the time complexity of a nested loop where the inner loop runs from 1 to i and then j doubles?",
    shortAnswer: "O(n log n).",
    explanation: "Each inner loop runs log i times; sum gives n log n.",
    hint: "Logarithmic inner.",
    level: "advanced",
    codeExample: "for (i=1; i<=n; i++) for (j=1; j<=i; j*=2) { ... }"
  },
  {
    question: "What is the time complexity of matrix multiplication (naive) using three nested loops?",
    shortAnswer: "O(n³) — cubic.",
    explanation: "Three loops of size n: n * n * n = n³.",
    hint: "Standard algorithm.",
    level: "advanced",
    codeExample: "for (i) for (j) for (k) { c[i][j] += a[i][k]*b[k][j]; }"
  },
  {
    question: "Can a nested loop have O(√n) complexity?",
    shortAnswer: "Yes, if the outer loop runs √n and the inner loop runs √n, or similar combination.",
    explanation: "Product of √n * √n = n, but if only one loop is √n and the other constant, it's O(√n).",
    hint: "Product of square roots.",
    level: "advanced",
    codeExample: "// possible"
  },
  {
    question: "What is the time complexity of a nested loop where the outer loop runs n and inner loop runs n but the inner loop body is O(n)?",
    shortAnswer: "O(n³) — because n * n * n = n³.",
    explanation: "The body of the inner loop adds another factor.",
    hint: "Multiply by body complexity.",
    level: "advanced",
    codeExample: "// outer n, inner n, body O(n)"
  },
  {
    question: "How do you simplify the complexity of a nested loop with a break?",
    shortAnswer: "You simplify the worst-case, which is usually the product of the ranges.",
    explanation: "Break only affects best/average, not worst-case.",
    hint: "Worst-case.",
    level: "intermediate",
    codeExample: "// ignore break in Big-O worst-case"
  },
  {
    question: "What is the time complexity of the following: for (i=0; i<n; i++) for (j=0; j<n; j++) if (i==j) break;?",
    shortAnswer: "Worst-case O(n²) because break only happens when i==j, but for i≠j the inner loop runs n times? Actually the break is conditional; worst-case when i != j for many i, so O(n²).",
    explanation: "The break is inside the if, which only executes when i==j, so for most i the inner loop runs n times.",
    hint: "Analyze worst-case.",
    level: "advanced",
    codeExample: "// complex break"
  },
  {
    question: "What is the time complexity of a nested loop that processes a sparse matrix where only non-zero elements are visited?",
    shortAnswer: "It depends on the number of non-zero elements, often O(k) where k is the number of non-zero entries.",
    explanation: "You don't visit all n² cells; only the non-zero ones.",
    hint: "Sparse optimization.",
    level: "advanced",
    codeExample: "// visiting only non-zero"
  },
  {
    question: "What is the time complexity of a nested loop that uses break to exit both loops?",
    shortAnswer: "Worst-case O(n²) if the break never occurs, but best-case O(1).",
    explanation: "The worst-case is still quadratic.",
    hint: "Worst-case.",
    level: "intermediate",
    codeExample: "// break with label"
  },
  {
    question: "What is the time complexity of a nested loop that runs outer n, inner n, but inner loop is optimized to run only half the time?",
    shortAnswer: "O(n²) — constant factor 1/2 is ignored.",
    explanation: "O(n²/2) = O(n²).",
    hint: "Drop constants.",
    level: "basic",
    codeExample: "// if (i%2==0) inner loop"
  },
  {
    question: "What is the time complexity of a nested loop where the outer runs n and the inner runs n but the inner loop is a function that takes O(1) time?",
    shortAnswer: "O(n²).",
    explanation: "n * n * O(1) = O(n²).",
    hint: "Constant body.",
    level: "basic",
    codeExample: "// O(1) body"
  },
  {
    question: "What is the time complexity of a nested loop where the outer runs n and the inner runs n but the inner loop function takes O(log n) time?",
    shortAnswer: "O(n² log n).",
    explanation: "n * n * log n = n² log n.",
    hint: "Multiply.",
    level: "advanced",
    codeExample: "// body O(log n)"
  },
  {
    question: "How can you reduce the complexity of nested loops?",
    shortAnswer: "By using better algorithms (e.g., hash maps, sorting, divide-and-conquer) to eliminate one level.",
    explanation: "For example, using a hash set to reduce O(n²) to O(n).",
    hint: "Optimization.",
    level: "intermediate",
    codeExample: "// use HashMap for O(1) lookups"
  },
  {
    question: "What is the time complexity of a nested loop that iterates over all pairs of elements in two arrays of sizes n and m?",
    shortAnswer: "O(n·m).",
    explanation: "n * m iterations.",
    hint: "Product of sizes.",
    level: "basic",
    codeExample: "for (i in n) for (j in m) { ... }"
  }
];

export default questions;