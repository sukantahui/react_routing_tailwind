/**
 * Module 001_005: Topic 9: Loop counter manipulation, accumulators, running sums, and running products
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is an Accumulator Variable in loop programming?",
    shortAnswer: "A variable declared before a loop that progressively collects, aggregates, or combines values across successive iterations.",
    explanation: "Used for running totals, products, string concatenations, and collections.",
    hint: "Variable that gathers running totals across iterations.",
    level: "basic",
    codeExample: "int sum = 0; for (int val : arr) sum += val;"
  },
  {
    question: "What initial value MUST be used for a Running SUM (Additive Accumulator) and why?",
    shortAnswer: "`0` (or `0.0`), because `0` is the Additive Identity element ($x + 0 = x$).",
    explanation: "Starting with any non-zero value introduces an offset error.",
    hint: "0 (Additive Identity).",
    level: "basic",
    codeExample: "double total = 0.0; for (double x : data) total += x;"
  },
  {
    question: "What initial value MUST be used for a Running PRODUCT (Multiplicative Accumulator) and why?",
    shortAnswer: "`1` (or `1L`), because `1` is the Multiplicative Identity element ($x \\times 1 = x$).",
    explanation: "Initializing a product to `0` will cause the entire running product to remain `0` permanently ($x \\times 0 = 0$)!",
    hint: "1 (Multiplicative Identity; 0 zeroes out the product).",
    level: "basic",
    codeExample: "long product = 1; for (int i = 1; i <= n; i++) product *= i;"
  },
  {
    question: "What is the Counter Pattern in loop algorithms?",
    shortAnswer: "A variable initialized to `0` that increments by `1` whenever an element satisfies a specific predicate condition.",
    explanation: "Tracks the frequency or count of qualifying events.",
    hint: "Tracks frequency by incrementing on matching conditions.",
    level: "basic",
    codeExample: "int count = 0; for (int score : scores) { if (score >= 90) count++; }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore semester fee engine, how does the additive accumulator operate?",
    shortAnswer: "By initializing `double runningTuitionSum = 0.0` and adding each semester's tuition (₹12,000 to ₹18,000) in Indian Rupees (₹).",
    explanation: "Demonstrates practical running sum computation.",
    hint: "Accumulates semester fees starting from ₹0.0.",
    level: "basic",
    codeExample: "double sum = 0.0; for (double f : fees) sum += f;"
  },
  {
    question: "How do you calculate the Arithmetic Mean (Average) using an accumulator and a loop?",
    shortAnswer: "By accumulating the total sum in a loop, then dividing `sum / count` after loop completion (cast to `double` to prevent integer truncation).",
    explanation: "Calculates average cleanly.",
    hint: "Accumulate sum, then divide by count outside the loop.",
    level: "basic",
    codeExample: "double sum = 0; for (int x : a) sum += x; double avg = sum / a.length;"
  },
  {
    question: "How should Min and Max tracking variables be initialized before a loop?",
    shortAnswer: "Initialize `min = Integer.MAX_VALUE` (or `arr[0]`) and `max = Integer.MIN_VALUE` (or `arr[0]`).",
    explanation: "Ensures any valid element in the array will successfully update the bounds.",
    hint: "Initialize min to MAX_VALUE and max to MIN_VALUE (or first element).",
    level: "basic",
    codeExample: "int min = Integer.MAX_VALUE;\nfor (int x : arr) if (x < min) min = x;"
  },
  {
    question: "What happens if you initialize `min = 0` when finding the minimum in an array of positive numbers?",
    shortAnswer: "The result will incorrectly remain `0` if all numbers in the array are positive (e.g. `{10, 20, 30}`), because no positive number is less than 0!",
    explanation: "Classic beginner boundary initialization bug.",
    hint: "0 will never be replaced by positive numbers, producing a bug.",
    level: "basic",
    codeExample: "// Bug: int min = 0; on {10, 20, 30} returns 0!"
  },
  {
    question: "How is Factorial ($N!$) computed using a multiplicative accumulator loop?",
    shortAnswer: "`long fact = 1; for (int i = 1; i <= n; i++) fact *= i;`.",
    explanation: "Standard multiplicative accumulation algorithm.",
    hint: "Multiply running product by i from 1 to n.",
    level: "basic",
    codeExample: "long fact = 1;\nfor (int i = 1; i <= 5; i++) fact *= i;"
  },
  {
    question: "What is the maximum factorial value that fits within a 64-bit signed `long` in Java?",
    shortAnswer: "$20! = 2,432,902,008,176,640,000$. Computing $21!$ overflows a `long` (requires `BigInteger`).",
    explanation: "Crucial numerical limitation in Java arithmetic.",
    hint: "20! fits in long; 21! overflows.",
    level: "intermediate",
    codeExample: "// 20! is max for long; use BigInteger for > 20"
  },
  {
    question: "How does Dynamic Counter Stepping work (e.g. exponential doubling `i *= 2`)?",
    shortAnswer: "The update clause multiplies the counter (`for (int i = 1; i <= n; i *= 2)`), producing logarithmic $O(\\log N)$ iterations.",
    explanation: "Common in divide-and-conquer algorithms and tree traversals.",
    hint: "i *= 2 creates exponential stepping with O(log N) iterations.",
    level: "intermediate",
    codeExample: "for (int i = 1; i <= N; i *= 2) { System.out.println(i); }"
  },
  {
    question: "What is a Weighted Accumulator Sum?",
    shortAnswer: "An accumulator where each value is multiplied by a weight factor: `total += score * creditHours;`.",
    explanation: "Used for GPA calculations, financial portfolio weighting, and physics centroids.",
    hint: "total += value * weight.",
    level: "basic",
    codeExample: "double totalGradePoints = 0.0;\nfor (Course c : list) totalGradePoints += c.grade * c.credits;"
  },
  {
    question: "Why should `String` concatenation (`str += item`) be avoided as an accumulator inside large loops?",
    shortAnswer: "Because `String` is immutable; `+=` allocates a new `StringBuilder` and copies character arrays on every iteration, leading to catastrophic $O(N^2)$ quadratic performance.",
    explanation: "Always use `StringBuilder.append()` for string accumulation in loops.",
    hint: "String += causes O(N^2) memory copying; use StringBuilder instead.",
    level: "intermediate",
    codeExample: "StringBuilder sb = new StringBuilder();\nfor (String s : list) sb.append(s);"
  },
  {
    question: "What is a 'Running Difference' (Alternating Series) accumulator?",
    shortAnswer: "An accumulator that alternates between addition and subtraction (`sum += sign * value; sign = -sign;`).",
    explanation: "Used for Taylor series, Leibniz formula for $\\pi$, and balanced accounting ledgers.",
    hint: "Alternates sign: sign = -sign on each iteration.",
    level: "intermediate",
    codeExample: "int sign = 1;\nfor (int i = 1; i <= n; i++) {\n    sum += sign * i;\n    sign = -sign;\n}"
  },
  {
    question: "How does an accumulator compute Power ($base^{exp}$) without using `Math.pow()`?",
    shortAnswer: "`long result = 1; for (int i = 0; i < exp; i++) result *= base;`.",
    explanation: "Multiplicative accumulation over exponent count.",
    hint: "result = 1; multiply by base exp times.",
    level: "basic",
    codeExample: "long res = 1; for (int i = 0; i < exp; i++) res *= base;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what is the 'Compound Growth' algorithm?",
    shortAnswer: "Multiplying semester balance by `(1 + interestRate)` iteratively over years to project fee growth in Indian Rupees (₹).",
    explanation: "Demonstrates iterative financial compounding.",
    hint: "Iterative multiplication of principal by growth rate in ₹.",
    level: "basic",
    codeExample: "for (int year=1; year<=5; year++) principal *= 1.08;"
  },
  {
    question: "How do you count Even and Odd numbers in a single loop using dual counters?",
    shortAnswer: "`int evens = 0, odds = 0; for (int n : arr) { if (n % 2 == 0) evens++; else odds++; }`.",
    explanation: "Single-pass dual classification counters.",
    hint: "if (n % 2 == 0) evens++ else odds++.",
    level: "basic",
    codeExample: "for (int x : data) { if (x % 2 == 0) e++; else o++; }"
  },
  {
    question: "What is Kahan Summation Algorithm in numerical loops?",
    shortAnswer: "A compensated summation algorithm that tracks low-order lost bits in floating-point addition to prevent numerical drift in large datasets.",
    explanation: "Advanced numerical computing technique.",
    hint: "Compensated summation tracking lost floating-point precision bits.",
    level: "expert",
    codeExample: "// Tracks running compensation float 'c' to eliminate drift"
  },
  {
    question: "How does Java 8 Streams simplify sum and product accumulation?",
    shortAnswer: "Using `IntStream.of(arr).sum()` or `IntStream.of(arr).reduce(1, (a, b) -> a * b)`.",
    explanation: "Declarative reduction operations.",
    hint: "stream.sum() or stream.reduce().",
    level: "intermediate",
    codeExample: "int sum = Arrays.stream(arr).sum();"
  },
  {
    question: "What is an 'Integer Overflow Accumulator Trap'?",
    shortAnswer: "When accumulating large numbers into a 32-bit `int` sum exceeds $2^{31}-1$ (approx 2.14 billion), silently wrapping to negative numbers.",
    explanation: "Use `long` or `Math.addExact()` to detect or avoid overflow.",
    hint: "Use long or Math.addExact() to prevent silent 32-bit int overflow.",
    level: "intermediate",
    codeExample: "long total = 0; // Use long for financial totals"
  },
  {
    question: "How does `Math.addExact(a, b)` protect accumulators against silent overflow?",
    shortAnswer: "It throws an `ArithmeticException` immediately if the addition overflows, preventing corrupted data.",
    explanation: "Defensive arithmetic in Java 8+.",
    hint: "Throws ArithmeticException upon overflow.",
    level: "intermediate",
    codeExample: "sum = Math.addExact(sum, nextVal);"
  },
  {
    question: "What is a 'Prefix Sum Array' built via an accumulator loop?",
    shortAnswer: "An array `prefix[i]` where each element stores the cumulative sum of all previous elements (`prefix[i] = prefix[i-1] + arr[i]`), enabling $O(1)$ range queries.",
    explanation: "Fundamental competitive programming data structure.",
    hint: "prefix[i] = prefix[i-1] + arr[i].",
    level: "intermediate",
    codeExample: "for (int i = 1; i < n; i++) prefix[i] = prefix[i-1] + arr[i];"
  },
  {
    question: "Can an accumulator variable be declared INSIDE the loop body?",
    shortAnswer: "No! Declaring the accumulator inside the body (`for (...) { int sum = 0; sum += x; }`) reinitializes it to 0 on every iteration, destroying previous totals.",
    explanation: "Accumulators MUST be declared outside the loop.",
    hint: "No, must be declared outside the loop to retain values across iterations.",
    level: "basic",
    codeExample: "// Bug: for (...) { int sum = 0; } // Resets to 0 every cycle!"
  },
  {
    question: "How do you track the Index of the Maximum element in an array?",
    shortAnswer: "`int maxIdx = 0; for (int i = 1; i < arr.length; i++) { if (arr[i] > arr[maxIdx]) maxIdx = i; }`.",
    explanation: "Stores the index position rather than the value.",
    hint: "Track maxIdx and compare arr[i] > arr[maxIdx].",
    level: "basic",
    codeExample: "int maxIdx = 0;\nfor (int i = 1; i < a.length; i++) if (a[i] > a[maxIdx]) maxIdx = i;"
  },
  {
    question: "What is the Geometric Mean computed with a multiplicative accumulator?",
    shortAnswer: "$\\sqrt[N]{x_1 \\times x_2 \\times \\dots \\times x_N} = \\text{Math.pow}(product, 1.0 / N)$.",
    explanation: "Multiplies all items and computes the $N$-th root.",
    hint: "N-th root of the running product.",
    level: "intermediate",
    codeExample: "double geoMean = Math.pow(runningProduct, 1.0 / count);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore scholarship portal, why is min/max fee tracking used?",
    shortAnswer: "To determine fee dispersion across semesters (lowest: ₹12,000 vs highest: ₹18,000) for tuition installment assistance in Indian Rupees (₹).",
    explanation: "Demonstrates practical range analysis.",
    hint: "Identifies lowest and highest semester fees in ₹.",
    level: "basic",
    codeExample: "if (fee < min) min = fee; if (fee > max) max = fee;"
  },
  {
    question: "How does the HotSpot JIT compiler optimize additive accumulator loops?",
    shortAnswer: "By unrolling the loop and generating parallel SIMD vector addition instructions (`vpaddd` / `vaddps`) across CPU AVX-512 registers.",
    explanation: "High-performance vectorization.",
    hint: "Vectorizes addition with SIMD instructions across AVX registers.",
    level: "advanced",
    codeExample: "// JIT performs automatic SIMD vectorization"
  },
  {
    question: "What is a 'Sliding Window Sum' accumulator pattern?",
    shortAnswer: "Maintaining a fixed-size window sum by adding the new incoming element and subtracting the outgoing element on each step (`windowSum += arr[i] - arr[i - k]`).",
    explanation: "Computes rolling moving averages in $O(1)$ per step.",
    hint: "windowSum += incoming - outgoing.",
    level: "intermediate",
    codeExample: "for (int i = k; i < n; i++) winSum += arr[i] - arr[i - k];"
  },
  {
    question: "What is the ultimate takeaway of Module 001_005 Topic 9 for Java developers?",
    shortAnswer: "Accumulator and counter patterns transform raw loop iteration into powerful aggregations (running sums initialized to 0, running products initialized to 1, min/max bounds, event frequency counters) while maintaining strict numerical type boundaries.",
    explanation: "Essential algorithmic toolkit for data analysis and computation.",
    hint: "Sums start at 0, products start at 1, accumulators live outside loop headers.",
    level: "basic",
    codeExample: "// Summary: Sum (init 0) | Product (init 1) | Count (init 0)"
  },
  {
    question: "What is the next topic (Topic 10) in Module 001_005?",
    shortAnswer: "Nested loops: outer loop vs inner loop execution order and grid traversal.",
    explanation: "Topic 10 explores nested 2D loops, row-column coordinate spaces, and matrix traversals in Java.",
    hint: "Nested loops: outer vs inner loop execution order.",
    level: "basic",
    codeExample: "// Topic 10: Nested Loops and Grid Traversal"
  }
];

export default questions;
