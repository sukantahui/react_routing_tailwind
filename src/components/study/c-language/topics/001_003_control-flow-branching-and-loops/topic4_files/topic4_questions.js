const questions = [
  {
    question: "What is a nested loop in C?",
    shortAnswer: "A loop placed completely inside the body of another loop.",
    explanation: "For every single iteration of the outer loop, the inner loop executes through all its iterations from start to finish.",
    hint: "Loops inside loops.",
    level: "basic"
  },
  {
    question: "How do you calculate the total number of iterations in a nested loop?",
    shortAnswer: "Multiply the number of outer loop iterations by the number of inner loop iterations (Outer_N * Inner_M).",
    explanation: "If the outer loop runs 5 times and the inner loop runs 10 times, the inner body executes 5 * 10 = 50 times.",
    hint: "Product of iteration counts.",
    level: "basic"
  },
  {
    question: "What is the time complexity of two nested loops each running N times?",
    shortAnswer: "O(N^2) quadratic time complexity.",
    explanation: "As N doubles, execution time quadruples (N * N = N^2).",
    hint: "O(N^2) quadratic complexity.",
    level: "basic"
  },
  {
    question: "How does the 'Hour Hand and Minute Hand of a Clock' analogy explain nested loops?",
    shortAnswer: "The outer loop is like the hour hand (moves 1 step); the inner loop is like the minute hand (must complete a full 60-minute circle before the hour hand moves again).",
    explanation: "Visualizes the hierarchy where the inner loop fully resets and runs to completion on every outer tick.",
    hint: "Minute hand spins full circle for every single tick of the hour hand.",
    level: "basic"
  },
  {
    question: "How are nested loops used to traverse a 2D matrix in row-major order?",
    shortAnswer: "Outer loop iterates rows (`row = 0; row < rows; row++`); inner loop iterates columns (`col = 0; col < cols; col++`), accessing `matrix[row][col]`.",
    explanation: "Standard matrix traversal matching physical memory layout in C.",
    hint: "Outer loop: row index; Inner loop: column index.",
    level: "basic",
    codeExample: "for (int r = 0; r < rows; r++) {\n    for (int c = 0; c < cols; c++) {\n        printf(\"%d \", matrix[r][c]);\n    }\n    printf(\"\\n\");\n}"
  },
  {
    question: "How do you print a right-angled triangle pattern of stars using nested loops?",
    shortAnswer: "Outer loop controls rows (`i = 1 to N`); inner loop prints stars from `1` to `i` (`j = 1 to i`).",
    explanation: "Row 1 prints 1 star; row 2 prints 2 stars; row N prints N stars.",
    hint: "Inner loop bounds depend on outer loop variable i.",
    level: "basic",
    codeExample: "for (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= i; j++) printf(\"* \");\n    printf(\"\\n\");\n}"
  },
  {
    question: "How do you print a centered equilateral pyramid of stars?",
    shortAnswer: "For each row `i`: first loop prints `(N - i)` spaces; second loop prints `(2 * i - 1)` stars; then print a newline.",
    explanation: "Leading spaces ensure symmetrical alignment; `2*i - 1` generates the odd sequence (1, 3, 5, 7, 9) of stars.",
    hint: "Spaces = (N - i), Stars = (2 * i - 1).",
    level: "intermediate"
  },
  {
    question: "How do you optimize Prime Number detection from O(N) to O(sqrt(N))?",
    shortAnswer: "Test divisors only up to `d * d <= num` (or `d <= sqrt(num)`) instead of testing all numbers up to `num - 1`.",
    explanation: "If a number N has a factor larger than sqrt(N), it must have a corresponding factor smaller than sqrt(N). If no divisor is found up to sqrt(N), N is prime.",
    hint: "Test divisors up to d * d <= num.",
    level: "intermediate",
    codeExample: "bool isPrime = (num >= 2);\nfor (int d = 2; d * d <= num; d++) {\n    if (num % d == 0) { isPrime = false; break; }\n}"
  },
  {
    question: "What is Floyd's Triangle and how is it constructed?",
    shortAnswer: "A right-angled triangle of consecutive natural numbers (1; 2 3; 4 5 6; 7 8 9 10...).",
    explanation: "Maintain a running counter variable that increments on every inner loop print: `printf(\"%d \", count++)`.",
    hint: "Running incremented counter in right-angled loop.",
    level: "basic",
    codeExample: "int count = 1;\nfor (int i = 1; i <= rows; i++) {\n    for (int j = 1; j <= i; j++) printf(\"%d \", count++);\n    printf(\"\\n\");\n}"
  },
  {
    question: "What is Pascal's Triangle in C pattern programming?",
    shortAnswer: "A triangular array of binomial coefficients where each number is the sum of the two numbers directly above it.",
    explanation: "Values are computed using combination formula `C(n, r) = n! / (r! * (n-r)!)` or iteratively with `val = val * (i - j) / j`.",
    hint: "Binomial coefficient triangle.",
    level: "intermediate"
  },
  {
    question: "What happens if you accidentally use the same loop counter variable `i` for both outer and inner loops?",
    shortAnswer: "The inner loop overwrites the outer loop's counter, corrupting the iteration progression and causing infinite loops or incorrect terminations.",
    explanation: "Always use distinct variable names (e.g. `i` for outer, `j` for inner, `k` for 3rd layer).",
    hint: "Variable name collision bug.",
    level: "basic",
    codeExample: "// BUG:\n// for (int i=0; i<5; i++) { for (int i=0; i<5; i++) ... }\n// FIX:\nfor (int i = 0; i < 5; i++) { for (int j = 0; j < 5; j++) ... }"
  },
  {
    question: "How do you print an Inverted Star Pyramid?",
    shortAnswer: "Run outer loop in reverse from `N` down to `1`: inner loop prints `(N - i)` spaces and `(2 * i - 1)` stars.",
    explanation: "Reverses the row expansion order.",
    hint: "Outer loop decreases: for (int i = n; i >= 1; i--).",
    level: "basic"
  },
  {
    question: "How do you print a Diamond Star Pattern?",
    shortAnswer: "Combine an upper centered equilateral pyramid (1 to N) with a lower inverted pyramid (N-1 down to 1).",
    explanation: "Two sequential nested loop sections form the upper and lower halves of the diamond.",
    hint: "Upper pyramid + Lower inverted pyramid.",
    level: "intermediate"
  },
  {
    question: "What is a Hollow Square Star Pattern and how is it coded?",
    shortAnswer: "Print `*` if on a boundary (`r == 1 || r == n || c == 1 || c == n`), otherwise print a blank space ` `.",
    explanation: "Conditional boundary check inside the inner loop.",
    hint: "Border coordinate condition check.",
    level: "basic"
  },
  {
    question: "What is Cache Locality and why does looping rows in the outer loop matter for 2D arrays?",
    shortAnswer: "C stores 2D arrays in Row-Major order. Accessing `matrix[row][col]` provides spatial cache locality, running up to 10x faster than column-major `matrix[col][row]`.",
    explanation: "Row traversal accesses contiguous RAM addresses loaded into CPU cache lines.",
    hint: "Spatial cache hits via row-major iteration.",
    level: "advanced"
  },
  {
    question: "How do you check if a number is an Armstrong Number using loops?",
    shortAnswer: "Count total digits `k`; then peel each digit and sum `digit^k`; check if `sum == originalNumber`.",
    explanation: "For example, 153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153.",
    hint: "Sum of powers of digits equals original number.",
    level: "intermediate"
  },
  {
    question: "How do you print an Alternating 0-1 Binary Triangle (e.g. 1; 0 1; 1 0 1...)?",
    shortAnswer: "If `(row + col) % 2 == 0` print `1`, else print `0`.",
    explanation: "The parity of the sum of coordinates alternates checkerboard-style across rows and columns.",
    hint: "(row + col) % 2 parity rule.",
    level: "basic"
  },
  {
    question: "How do you find the Transpose of a matrix using nested loops?",
    shortAnswer: "Set `transpose[col][row] = original[row][col]` for all row and column indices.",
    explanation: "Swaps row and column indices to reflect the matrix across its main diagonal.",
    hint: "Swap row and column indices.",
    level: "basic"
  },
  {
    question: "What is the time complexity of Matrix Multiplication of two N x N matrices?",
    shortAnswer: "O(N^3) cubic time complexity using 3 nested loops.",
    explanation: "Outer loop: row of A; middle loop: col of B; inner loop: dot product accumulation over K.",
    hint: "3 nested loops yield O(N^3).",
    level: "intermediate"
  },
  {
    question: "How many loop layers should you generally avoid exceeding in clean code?",
    shortAnswer: "Avoid exceeding 3 nested loop levels (O(N^3)). Deeper nesting should be refactored into helper functions or optimized algorithms.",
    explanation: "Deep nesting creates performance bottlenecks and cognitive complexity.",
    hint: "Limit nesting to 3 levels max.",
    level: "intermediate"
  },
  {
    question: "How do you print a Butterfly Star Pattern?",
    shortAnswer: "Divide into two halves; for each row print left stars, center spacing, and right stars.",
    explanation: "Combines left-aligned and right-aligned mirrored triangles.",
    hint: "Mirrored left and right triangles with center gap.",
    level: "intermediate"
  },
  {
    question: "How do you find all Prime Factors of a number using nested loops?",
    shortAnswer: "Outer loop checks divisor `d` starting from 2; inner `while (num % d == 0)` prints `d` and divides `num /= d`.",
    explanation: "Repeated division by prime candidates strips factors completely.",
    hint: "While divisible by d, print and divide.",
    level: "intermediate"
  },
  {
    question: "What is the Sieve of Eratosthenes algorithm and how does it optimize finding primes up to N?",
    shortAnswer: "Initializes a boolean array and iteratively marks multiples of each prime starting from `p*p` as composite in O(N log log N) time.",
    explanation: "Far faster than testing each number individually with trial division.",
    hint: "Array-based composite marking in O(N log log N).",
    level: "advanced"
  },
  {
    question: "How do you calculate the Trace (sum of main diagonal elements) of a square matrix?",
    shortAnswer: "Use a single loop: `trace += matrix[i][i]` for `i` from `0` to `N-1`.",
    explanation: "Main diagonal elements share identical row and column indices, requiring only O(N) time without nested loops.",
    hint: "Single loop over matrix[i][i].",
    level: "basic"
  },
  {
    question: "Why is printing a newline `printf(\"\\n\")` placed after the inner loop in pattern printing?",
    shortAnswer: "Because the inner loop prints all columns of the current row horizontally; the newline terminates the row and moves the cursor to the next line.",
    explanation: "Separates distinct rows visually.",
    hint: "Advances output to next row line.",
    level: "basic"
  }
];

export default questions;
