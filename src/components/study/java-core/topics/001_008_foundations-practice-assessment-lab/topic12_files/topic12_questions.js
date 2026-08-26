/**
 * Module 001_008: Topic 12: Segment 1 Timed Coding Assessment
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the Time Complexity to compute both Primary and Secondary Diagonal sums of an $N \\times N$ matrix?",
    shortAnswer: "$O(N)$ linear time with respect to the matrix dimension, computing both diagonals in a single loop pass.",
    explanation: "Matrix diagonal summation complexity.",
    hint: "O(N) single loop pass.",
    level: "basic",
    codeExample: "for (int i = 0; i < n; i++) { sum += matrix[i][i] + matrix[i][n-1-i]; }"
  },
  {
    question: "How do you avoid double-counting the center element in an odd-dimension $N \\times N$ matrix diagonal sum?",
    shortAnswer: "Subtract `matrix[n / 2][n / 2]` once when `n % 2 != 0`.",
    explanation: "Odd matrix diagonal center duplicate guard.",
    hint: "Subtract center element matrix[n/2][n/2] when n is odd.",
    level: "basic",
    codeExample: "if (n % 2 != 0) total -= matrix[n/2][n/2];"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the diagonal sum of the 3x3 score grid `[[10,20,30],[40,50,60],[70,80,90]]`?",
    shortAnswer: "$(10 + 50 + 90) + (30 + 50 + 70) - 50 = 150 + 150 - 50 =$ **250**.",
    explanation: "Diagonal sum calculation verification.",
    hint: "250.",
    level: "basic",
    codeExample: "computeMatrixDiagonalSum(scoreGrid) -> 250"
  },
  {
    question: "How do Java 14+ Enhanced Switch Expressions improve scholarship tier dispatch?",
    shortAnswer: "They return values directly as expressions using arrow syntax (`case DISTINCTION -> baseFee * 0.25;`), ensuring exhaustiveness and eliminating `break` statements.",
    explanation: "Modern switch expressions in business logic dispatch.",
    hint: "Yields discount values directly with arrow syntax and compiler exhaustiveness checks.",
    level: "basic",
    codeExample: "return switch (tier) { case DISTINCTION -> base * 0.25; ... };"
  },
  {
    question: "In the Coder & AccoTax Barrackpore assessment, what was Swadeep's scholarship award on ₹20,000 base fee (Distinction: 25% waiver)?",
    shortAnswer: "₹20,000 $\\times 0.25 =$ **₹5,000.00** waiver (Net before tax: ₹15,000 &rarr; Net payable with 18% GST: **₹17,700.00**).",
    explanation: "Swadeep capstone fee breakdown.",
    hint: "Waiver: ₹5,000.00 | Net Payable: ₹17,700.00.",
    level: "basic",
    codeExample: "20000 * 0.75 * 1.18 = 17,700.00"
  },
  {
    question: "In the Coder & AccoTax Barrackpore assessment, what was Tuhina's scholarship award on ₹25,000 base fee (Distinction: 25% waiver)?",
    shortAnswer: "₹25,000 $\\times 0.25 =$ **₹6,250.00** waiver (Net before tax: ₹18,750 &rarr; Net payable with 18% GST: **₹22,125.00**).",
    explanation: "Tuhina capstone fee breakdown.",
    hint: "Waiver: ₹6,250.00 | Net Payable: ₹22,125.00.",
    level: "basic",
    codeExample: "25000 * 0.75 * 1.18 = 22,125.00"
  },
  {
    question: "Which candidate roll numbers were verified as PRIME numbers by the Sieve precomputation table?",
    shortAnswer: "Roll `#101`, Roll `#103`, and Roll `#107` are prime numbers; Roll `#110` is composite ($110 = 2 \\times 5 \\times 11$).",
    explanation: "Prime roll numbers identification.",
    hint: "101, 103, 107 are prime.",
    level: "basic",
    codeExample: "sieveTable[101] -> true | sieveTable[110] -> false"
  },
  {
    question: "In the Coder & AccoTax Barrackpore assessment, what was Abhronila's scholarship award on ₹18,000 base fee (First Class: 15% waiver)?",
    shortAnswer: "₹18,000 $\\times 0.15 =$ **₹2,700.00** waiver (Net before tax: ₹15,300 &rarr; Net payable with 18% GST: **₹18,054.00**).",
    explanation: "Abhronila capstone fee breakdown.",
    hint: "Waiver: ₹2,700.00 | Net Payable: ₹18,054.00.",
    level: "basic",
    codeExample: "18000 * 0.85 * 1.18 = 18,054.00"
  },
  {
    question: "In the Coder & AccoTax Barrackpore assessment, what was Debangshu's scholarship award on ₹22,000 base fee (Second Class: 5% waiver)?",
    shortAnswer: "₹22,000 $\\times 0.05 =$ **₹1,100.00** waiver (Net before tax: ₹20,900 &rarr; Net payable with 18% GST: **₹24,662.00**).",
    explanation: "Debangshu capstone fee breakdown.",
    hint: "Waiver: ₹1,100.00 | Net Payable: ₹24,662.00.",
    level: "basic",
    codeExample: "22000 * 0.95 * 1.18 = 24,662.00"
  },
  {
    question: "In the Coder & AccoTax Barrackpore assessment, what was the total certified campus net revenue across all 4 candidates?",
    shortAnswer: "₹17,700 + ₹22,125 + ₹18,054 + ₹24,662 = **₹82,541.00** total revenue.",
    explanation: "Total revenue verification.",
    hint: "₹82,541.00.",
    level: "basic",
    codeExample: "TOTAL CERTIFIED CAMPUS REVENUE: ₹82,541.00"
  },
  {
    question: "What is the benefit of Java Records for capstone data modeling?",
    shortAnswer: "Records provide immutable, compact, thread-safe data carriers with built-in constructor validation, accessors, `equals()`, and `toString()`, eliminating verbose boilerplate.",
    explanation: "Record data modeling advantages.",
    hint: "Immutable, boilerplate-free data carriers with built-in validation and accessors.",
    level: "intermediate",
    codeExample: "public record CapstoneCandidateResult(...) {}"
  },
  {
    question: "What makes Recursive Binary Search optimal for sorted data lookups?",
    shortAnswer: "It achieves logarithmic time complexity $O(\\log N)$ by eliminating half the remaining search space on every recursive invocation.",
    explanation: "Binary search optimality.",
    hint: "O(log N) divide-and-conquer efficiency.",
    level: "basic",
    codeExample: "// T(N) = T(N/2) + O(1) -> O(log N)"
  },
  {
    question: "Why should utility classes declare a private constructor?",
    shortAnswer: "To prevent external code from creating useless object instances of a class that only contains static utility methods.",
    explanation: "Utility class constructor privacy rule.",
    hint: "Prevents instantiation of static-only utility classes.",
    level: "basic",
    codeExample: "private Segment1TimedCodingAssessmentDemo() {}"
  },
  {
    question: "What is the Time Complexity of Sieve of Eratosthenes prime table precomputation up to limit $M$?",
    shortAnswer: "$O(M \\log(\\log M))$ near-linear time.",
    explanation: "Sieve precomputation time complexity.",
    hint: "O(M log(log M)).",
    level: "basic",
    codeExample: "generateSievePrimeTable(200) // Runs in < 1 ms"
  },
  {
    question: "What is the Space Complexity of `generateSievePrimeTable(int maxRoll)`?",
    shortAnswer: "$O(M)$ auxiliary heap memory to store the boolean primality array of size $M + 1$.",
    explanation: "Sieve space complexity.",
    hint: "O(M) memory.",
    level: "basic",
    codeExample: "boolean[] isPrime = new boolean[maxRoll + 1];"
  },
  {
    question: "How does `Objects.requireNonNull()` safeguard candidate evaluations?",
    shortAnswer: "It immediately throws a descriptive `NullPointerException` if any required reference (like `studentName`) is `null`, preventing silent corrupted state downstream.",
    explanation: "Defensive validation with Objects.requireNonNull.",
    hint: "Fails fast if mandatory references are null.",
    level: "basic",
    codeExample: "Objects.requireNonNull(name, \"name must not be null\");"
  },
  {
    question: "What is the GST rate applied to tuition fees in India in our capstone demo?",
    shortAnswer: "18% GST (multiplied by `1.18`).",
    explanation: "GST rate configuration.",
    hint: "18% GST.",
    level: "basic",
    codeExample: "double finalPayable = netBeforeTax * 1.18;"
  },
  {
    question: "How are Enums in Java more type-safe than integer constants (e.g. `1=DISTINCTION, 2=FIRST_CLASS`)?",
    shortAnswer: "Enums are strongly typed and checked by the Java compiler at compile-time, preventing invalid integers from being passed to methods.",
    explanation: "Enum type-safety advantage over integer constants.",
    hint: "Compiler guarantees only valid enum constants can be passed.",
    level: "basic",
    codeExample: "public enum AcademicTier { DISTINCTION, FIRST_CLASS, ... }"
  },
  {
    question: "What happens if a matrix passed to `computeMatrixDiagonalSum` is `null`?",
    shortAnswer: "Defensive guard `if (matrix == null || matrix.length == 0) return 0;` returns 0 safely without throwing `NullPointerException`.",
    explanation: "Null defensive check in matrix summation.",
    hint: "Returns 0 safely.",
    level: "basic",
    codeExample: "if (matrix == null || matrix.length == 0) return 0;"
  },
  {
    question: "How many total modules were synthesized in Segment 1 (Java Core Foundations)?",
    shortAnswer: "8 comprehensive modules: `001_001` through `001_008` (encompassing 100+ topics).",
    explanation: "Segment 1 total module scope.",
    hint: "8 modules (001_001 to 001_008).",
    level: "basic",
    codeExample: "// Modules 001_001 through 001_008"
  },
  {
    question: "What is the primary topic of upcoming Segment 2?",
    shortAnswer: "**Object-Oriented Programming (OOP) Core Mechanics** (Classes, Objects, Constructors, Encapsulation, Inheritance, Polymorphism, and Interfaces).",
    explanation: "Segment 2 OOP curriculum preview.",
    hint: "Object-Oriented Programming (OOP) Core Mechanics.",
    level: "basic",
    codeExample: "// Segment 2: OOP Core Mechanics (Modules 002_001..002_007)"
  },
  {
    question: "In binary search midpoint calculation, why is `mid = (low + high) / 2` discouraged?",
    shortAnswer: "Because `low + high` overflows 32-bit `Integer.MAX_VALUE` for large array lengths, producing negative index crashes.",
    explanation: "Binary search midpoint overflow prevention.",
    hint: "Avoids 32-bit integer overflow.",
    level: "basic",
    codeExample: "int mid = low + (high - low) / 2;"
  },
  {
    question: "Why should `double` money calculations in production enterprise systems use `BigDecimal`?",
    shortAnswer: "Because `double` uses IEEE 754 binary floating-point representation which cannot represent exact base-10 decimals, whereas `BigDecimal` guarantees arbitrary precision arithmetic.",
    explanation: "BigDecimal vs Double financial precision.",
    hint: "BigDecimal avoids IEEE 754 binary floating-point rounding errors.",
    level: "intermediate",
    codeExample: "BigDecimal amount = new BigDecimal(\"17700.00\");"
  },
  {
    question: "What is the time complexity of looking up a precomputed prime in a boolean sieve array?",
    shortAnswer: "$O(1)$ constant time direct array indexing.",
    explanation: "O(1) array index lookup.",
    hint: "O(1) constant time.",
    level: "basic",
    codeExample: "boolean isPrime = sieveTable[rollNumber]; // O(1)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore assessment, what was the tier assigned to Abhronila (score 82.0%)?",
    shortAnswer: "`AcademicTier.FIRST_CLASS` ($75 \\le \\text{score} < 90$).",
    explanation: "Tier boundary check verification.",
    hint: "FIRST_CLASS.",
    level: "basic",
    codeExample: "tier for 82.0% -> FIRST_CLASS"
  },
  {
    question: "In the Coder & AccoTax Barrackpore assessment, what was the tier assigned to Debangshu (score 72.0%)?",
    shortAnswer: "`AcademicTier.SECOND_CLASS` ($60 \\le \\text{score} < 75$).",
    explanation: "Tier boundary check verification.",
    hint: "SECOND_CLASS.",
    level: "basic",
    codeExample: "tier for 72.0% -> SECOND_CLASS"
  },
  {
    question: "What is the significance of the `final` keyword on class `Segment1TimedCodingAssessmentDemo`?",
    shortAnswer: "It prevents other classes from subclassing / extending the utility class.",
    explanation: "Final class immutability and inheritance prevention.",
    hint: "Prevents subclassing.",
    level: "basic",
    codeExample: "public final class Segment1TimedCodingAssessmentDemo { ... }"
  },
  {
    question: "What is the ultimate takeaway of Module 001_008 Topic 12 for Java developers?",
    shortAnswer: "The Timed Coding Assessment unifies all foundational Java Core pillars: matrices, algorithms, recursion, switch expressions, clean records, and billing calculations, confirming 100% readiness for Segment 2 Object-Oriented Programming!",
    explanation: "Mastery of Segment 1 capstone timed assessment.",
    hint: "Unifies matrices, algorithms, recursion, switch expressions, and clean code.",
    level: "basic",
    codeExample: "// Summary: Complete Foundations Mastery -> Ready for Segment 2 OOP!"
  },
  {
    question: "What is the next module in the Java Core Roadmap?",
    shortAnswer: "Module `002_001_classes-objects-and-constructors-deep-dive`.",
    explanation: "Next roadmap module transition.",
    hint: "Module 002_001: Classes, Objects, and Constructors Deep Dive.",
    level: "basic",
    codeExample: "// Module 002_001 Classes & Objects Deep Dive"
  },
  {
    question: "How does clean code architecture improve developer velocity in Java?",
    shortAnswer: "Self-documenting names, consistent Google Java Style formatting, immutable records, and defensive parameter validation reduce bugs and make codebases easy to understand and maintain.",
    explanation: "Clean code architectural value.",
    hint: "Reduces bugs, simplifies code reviews, and accelerates maintainability.",
    level: "basic",
    codeExample: "// Clean Code = High Velocity + Low Maintenance Cost"
  }
];

export default questions;
