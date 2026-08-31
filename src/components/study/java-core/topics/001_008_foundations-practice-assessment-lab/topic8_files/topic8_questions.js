/**
 * Module 001_008: Topic 8: Algorithmic Problem 8: Armstrong numbers in a given range
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is an Armstrong (Narcissistic) Number?",
    shortAnswer: "An integer $N$ of $D$ digits such that the sum of each of its digits raised to the power of $D$ equals the number itself ($N = \\sum d_i^D$).",
    explanation: "Core definition of an Armstrong number.",
    hint: "Sum of each digit raised to total digit count equals the number itself.",
    level: "basic",
    codeExample: "153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153"
  },
  {
    question: "Are all single-digit positive integers (1 to 9) Armstrong numbers?",
    shortAnswer: "YES! For any single-digit number $d$, $d^1 = d$, so 1, 2, 3, 4, 5, 6, 7, 8, 9 are all trivially Armstrong numbers.",
    explanation: "Single digit Armstrong property.",
    hint: "Yes, because d^1 = d for any single digit.",
    level: "basic",
    codeExample: "isArmstrong(7) → true (7^1 = 7)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what were all 3-digit Armstrong numbers found in range $[100..999]$?",
    shortAnswer: "Exactly 4 numbers: `153`, `370`, `371`, and `407`.",
    explanation: "3-digit Armstrong numbers listing.",
    hint: "153, 370, 371, 407.",
    level: "basic",
    codeExample: "findArmstrongInRange(100, 999) → [153, 370, 371, 407]"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what were all 4-digit Armstrong numbers found in range $[1000..9999]$?",
    shortAnswer: "Exactly 3 numbers: `1634`, `8208`, and `9474`.",
    explanation: "4-digit Armstrong numbers listing.",
    hint: "1634, 8208, 9474.",
    level: "basic",
    codeExample: "findArmstrongInRange(1000, 9999) → [1634, 8208, 9474]"
  },
  {
    question: "How do you count the total number of digits $D$ in an integer $N$?",
    shortAnswer: "Either by while-loop division `while (n > 0) { count++; n /= 10; }` or via logarithms: `(n == 0) ? 1 : (int) Math.log10(Math.abs(n)) + 1`.",
    explanation: "Digit count algorithms in Java.",
    hint: "Loop division by 10 or (int) Math.log10(n) + 1.",
    level: "basic",
    codeExample: "int d = (int) Math.log10(n) + 1;"
  },
  {
    question: "Why is precomputing powers for digits 0 to 9 (`int[] digitPowers`) an essential optimization?",
    shortAnswer: "Because `Math.pow(digit, D)` involves slow floating-point math; precomputing $0^D, 1^D, \\dots, 9^D$ in an array of size 10 evaluates powers in $O(1)$ table lookups.",
    explanation: "Digit powers lookup table optimization.",
    hint: "Precomputing 0^D..9^D replaces slow Math.pow() with O(1) table lookups.",
    level: "intermediate",
    codeExample: "int[] digitPowers = new int[10]; for(int d=0; d<=9; d++) digitPowers[d] = intPower(d, D);"
  },
  {
    question: "What is the 'Early Pruning' optimization during Armstrong verification?",
    shortAnswer: "Inside the digit accumulation loop, check `if (sum > n) return false;` to immediately stop processing as soon as the running sum exceeds the original number.",
    explanation: "Early pruning condition in Armstrong check.",
    hint: "If partial sum exceeds n, halt early with return false.",
    level: "intermediate",
    codeExample: "if (sum > n) return false; // Early pruning"
  },
  {
    question: "What is the Time Complexity of checking if an integer $N$ is an Armstrong number?",
    shortAnswer: "$O(D)$ time complexity, where $D = \\log_{10} N$ is the number of digits in $N$.",
    explanation: "Armstrong verification time complexity.",
    hint: "O(D) where D is the number of digits.",
    level: "basic",
    codeExample: "// D loop iterations = O(log10 N)"
  },
  {
    question: "What is the Time Complexity of finding all Armstrong numbers in a range $[L..R]$?",
    shortAnswer: "$O((R - L + 1) \\times D)$ time complexity.",
    explanation: "Range scanner time complexity.",
    hint: "O((R - L + 1) * D).",
    level: "basic",
    codeExample: "for (int i = start; i <= end; i++) isArmstrong(i);"
  },
  {
    question: "Are negative integers ever Armstrong numbers?",
    shortAnswer: "NO! By mathematical convention, Armstrong numbers are defined strictly on non-negative integers ($N \\ge 0$).",
    explanation: "Negative integer exclusion rule.",
    hint: "No, Armstrong numbers are non-negative by definition.",
    level: "basic",
    codeExample: "if (n < 0) return false;"
  },
  {
    question: "What is another mathematical name for Armstrong Numbers?",
    shortAnswer: "**Narcissistic Numbers** or **Pluperfect Digital Invariants (PPDI)**.",
    explanation: "Alternative mathematical nomenclature.",
    hint: "Narcissistic numbers or PPDI.",
    level: "basic",
    codeExample: "// Also known as Narcissistic Numbers or PPDI"
  },
  {
    question: "Is there any 2-digit Armstrong number in base 10?",
    shortAnswer: "NO! There are NO 2-digit Armstrong numbers in base 10 (since for range 10..99, no number equals $d_1^2 + d_2^2$).",
    explanation: "2-digit Armstrong vacancy.",
    hint: "No, there are zero 2-digit Armstrong numbers in base 10.",
    level: "basic",
    codeExample: "findArmstrongInRange(10, 99) → [] (empty list)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the digit count of `1634`?",
    shortAnswer: "4 digits ($D = 4$), with $1^4 + 6^4 + 3^4 + 4^4 = 1 + 1296 + 81 + 256 = 1634$.",
    explanation: "1634 calculation breakdown.",
    hint: "4 digits.",
    level: "basic",
    codeExample: "1^4 + 6^4 + 3^4 + 4^4 = 1634"
  },
  {
    question: "Why can `Math.pow()` cause subtle bugs in integer algorithms?",
    shortAnswer: "`Math.pow()` operates on 64-bit floating-point `double` types and can suffer from precision truncation (e.g. `(int) Math.pow(5, 3)` returning 124.99999 $\\to$ 124); using integer multiplication is strictly accurate.",
    explanation: "Floating point precision hazard in integer algorithms.",
    hint: "Floating point rounding errors can truncate integers incorrectly.",
    level: "intermediate",
    codeExample: "int intPower(int base, int exp) { int res = 1; for(int i=0; i<exp; i++) res *= base; return res; }"
  },
  {
    question: "What is the maximum number of digits a 32-bit positive `int` can have in Java?",
    shortAnswer: "10 digits (since `Integer.MAX_VALUE = 2,147,483,647`).",
    explanation: "32-bit integer maximum digit bound.",
    hint: "10 digits.",
    level: "basic",
    codeExample: "Integer.MAX_VALUE = 2,147,483,647 (10 digits)"
  },
  {
    question: "What is the largest known base-10 Armstrong number?",
    shortAnswer: "A 39-digit number ($115,132,219,018,763,992,565,095,597,973,971,522,401$); there are only 88 Armstrong numbers in total in base 10.",
    explanation: "Finiteness theorem of Armstrong numbers in base 10.",
    hint: "39 digits (there are only 88 base-10 Armstrong numbers in total).",
    level: "advanced",
    codeExample: "// There are exactly 88 Armstrong numbers in base 10"
  },
  {
    question: "How do you verify an Armstrong number in a different base $B$ (e.g. hexadecimal base 16)?",
    shortAnswer: "Count digits in base $B$ using successive division by $B$, extract base-$B$ digits ($n \\% B$), and check if sum of $(d_i)^D = N$.",
    explanation: "Arbitrary base Armstrong verification.",
    hint: "Extract base B digits using % B and compute sum of powers in base B.",
    level: "advanced",
    codeExample: "while(n > 0) { int d = n % B; sum += intPower(d, numDigits); n /= B; }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the result of testing `500`?",
    shortAnswer: "`false` ($5^3 + 0^3 + 0^3 = 125 \\ne 500$).",
    explanation: "500 Armstrong test verification.",
    hint: "False.",
    level: "basic",
    codeExample: "isArmstrong(500) → false"
  },
  {
    question: "Can Parallel Streams in Java accelerate finding Armstrong numbers in large ranges?",
    shortAnswer: "YES! `IntStream.rangeClosed(start, end).parallel().filter(ArmstrongNumbersRangeAlgorithmDemo::isArmstrong).boxed().toList();` distributes range checks across all CPU cores.",
    explanation: "Parallel stream acceleration for range filters.",
    hint: "IntStream.rangeClosed(start, end).parallel().filter(...) uses multi-core CPUs.",
    level: "intermediate",
    codeExample: "IntStream.rangeClosed(1, 100000).parallel().filter(x → isArmstrong(x)).boxed().toList();"
  },
  {
    question: "What is a 'Perfect Number' and how does it differ from an Armstrong Number?",
    shortAnswer: "A **Perfect Number** equals the sum of its proper divisors (excluding itself, e.g. $6 = 1 + 2 + 3$); an **Armstrong Number** equals the sum of its digits raised to its digit count.",
    explanation: "Perfect vs Armstrong number comparison.",
    hint: "Perfect number = sum of proper divisors; Armstrong = sum of digit powers.",
    level: "basic",
    codeExample: "6 is a Perfect Number (1+2+3=6); 153 is an Armstrong Number (1^3+5^3+3^3=153)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the result of testing `9474`?",
    shortAnswer: "`true` ($9^4 + 4^4 + 7^4 + 4^4 = 6561 + 256 + 2401 + 256 = 9474$).",
    explanation: "9474 4-digit Armstrong verification.",
    hint: "True.",
    level: "basic",
    codeExample: "isArmstrong(9474) → true"
  },
  {
    question: "What is an 'Automorphic Number'?",
    shortAnswer: "A number whose square ends in the number itself (e.g. $5^2 = 25$, $6^2 = 36$, $25^2 = 625$).",
    explanation: "Automorphic number definition.",
    hint: "A number whose square ends in the number itself (e.g. 25^2 = 625).",
    level: "basic",
    codeExample: "(n * n) % (int) Math.pow(10, countDigits(n)) == n"
  },
  {
    question: "What is a 'Strong Number' (Krishnamurthy Number)?",
    shortAnswer: "A number whose sum of the factorials of its digits equals the number itself (e.g. $145 = 1! + 4! + 5! = 1 + 24 + 120 = 145$).",
    explanation: "Strong / Krishnamurthy number definition.",
    hint: "Sum of factorials of digits equals the number (e.g. 145 = 1! + 4! + 5!).",
    level: "basic",
    codeExample: "145 = 1! + 4! + 5! = 145"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the result of testing `1000`?",
    shortAnswer: "`false` ($1^4 + 0^4 + 0^4 + 0^4 = 1 \\ne 1000$).",
    explanation: "1000 test output verification.",
    hint: "False.",
    level: "basic",
    codeExample: "isArmstrong(1000) → false"
  },
  {
    question: "Why does the digit extraction loop use `temp /= 10` rather than modifying `n`?",
    shortAnswer: "To preserve the original value of `n` in memory for the final equality check `sum == n`.",
    explanation: "Preserving variable state best practice.",
    hint: "Maintains original value of n for the final sum == n comparison.",
    level: "basic",
    codeExample: "int temp = n; while (temp > 0) { ... temp /= 10; }"
  },
  {
    question: "What is the Space Complexity of `isArmstrong(int n)`?",
    shortAnswer: "$O(1)$ constant memory space (uses a fixed 10-element integer array `digitPowers` and a few register variables).",
    explanation: "Constant auxiliary memory profile.",
    hint: "O(1) constant memory.",
    level: "basic",
    codeExample: "int[] digitPowers = new int[10]; // O(1) space"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, how many 3-digit Armstrong numbers were found?",
    shortAnswer: "4 numbers (`153, 370, 371, 407`).",
    explanation: "Count of 3-digit Armstrongs.",
    hint: "4.",
    level: "basic",
    codeExample: "threeDigitArmstrongs.size() = 4"
  },
  {
    question: "What is the ultimate takeaway of Module 001_008 Topic 8 for Java developers?",
    shortAnswer: "Armstrong number verification demonstrates modular arithmetic, digit extraction (`% 10`, `/ 10`), precomputed lookup tables ($0^D..9^D$), early loop pruning (`sum > n`), and integer power calculations avoiding floating-point precision hazards.",
    explanation: "Mastery of Armstrong number algorithms.",
    hint: "Sum of d^D = N; precompute powers table; prune early when sum > n.",
    level: "basic",
    codeExample: "// Summary: Digit extraction (% 10, / 10) + Precomputed Powers Table + Early Pruning"
  },
  {
    question: "What is the next topic (Topic 9) in Module 001_008?",
    shortAnswer: "Debugging challenge: Identifying and resolving 10 common compilation & logical bugs.",
    explanation: "Topic 9 presents an interactive debugging challenge resolving 10 classic Java bugs.",
    hint: "Debugging challenge: Identifying and resolving 10 common compilation & logical bugs.",
    level: "basic",
    codeExample: "// Topic 9: 10 Common Compilation & Logical Bugs Debugging Challenge"
  },
  {
    question: "How does Java 21 Record Patterns simplify digit-based data structures?",
    shortAnswer: "Record patterns allow deconstructing numeric audit records into structured components for pattern-matching dispatch.",
    explanation: "Java 21 record pattern deconstruction.",
    hint: "Deconstructs numeric records into constituent fields in pattern matching.",
    level: "advanced",
    codeExample: "if (obj instanceof NumberAudit(int n, boolean isArm)) { ... }"
  }
];

export default questions;
