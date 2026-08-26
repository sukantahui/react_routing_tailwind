/**
 * Module 001_005: Topic 3: Multiple initializations and updates in a single for loop header
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "Can a `for` loop initialize multiple variables in its header in Java?",
    shortAnswer: "Yes! Multiple variables of the SAME data type can be declared and initialized separated by commas: `for (int i = 0, j = 10; ...)`.",
    explanation: "Standard Java syntax under JLS §14.14.1.",
    hint: "Yes, separated by commas if sharing the same type.",
    level: "basic",
    codeExample: "for (int i = 0, j = 10; i < j; i++, j--) { }"
  },
  {
    question: "Can you declare multiple variables of DIFFERENT types in a `for` loop initialization clause?",
    shortAnswer: "No! Writing `for (int i = 0, double d = 0.0; ...)` causes a compile-time error because Java only allows one type specifier in a declaration statement.",
    explanation: "If different types are needed, declare them before the loop.",
    hint: "Compile error: cannot mix types in a single initialization clause.",
    level: "basic",
    codeExample: "// for (int i = 0, long j = 0; ...) // COMPILER ERROR!"
  },
  {
    question: "How are multiple update expressions separated in a `for` loop header?",
    shortAnswer: "Using the Comma Operator (`,`): `for (...; ...; i++, j--, k += 2)`.",
    explanation: "Expressions are evaluated sequentially from left to right at the end of each iteration.",
    hint: "Separated by commas in the update clause.",
    level: "basic",
    codeExample: "for (int i = 0, j = 100; i < j; i++, j--) { }"
  },
  {
    question: "Can the Boolean Condition clause in a `for` loop header use commas (`for (...; i < 10, j > 0; ...)` )?",
    shortAnswer: "No! The condition clause MUST be a single expression evaluating to `boolean` (combine multiple checks with logical operators like `&&` or `||`).",
    explanation: "Commas are illegal in the boolean condition clause of a Java for loop.",
    hint: "No, condition must be a single boolean expression combined with && or ||.",
    level: "basic",
    codeExample: "// for (int i=0, j=10; i<10 && j>0; i++, j--) // Correct!"
  },
  {
    question: "What is the Two-Pointer Technique in algorithm design?",
    shortAnswer: "An algorithmic pattern where two pointers iterate through a data sequence simultaneously (e.g. one from the start moving forward `i++` and one from the end moving backward `j--`).",
    explanation: "Runs in $O(N/2)$ operations, widely used for reversing and palindrome checks.",
    hint: "Two pointers converging or diverging simultaneously.",
    level: "basic",
    codeExample: "for (int left = 0, right = arr.length - 1; left < right; left++, right--) { swap(left, right); }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student list reversal, how does the two-pointer loop operate?",
    shortAnswer: "By initializing `left = 0, right = batchStudents.length - 1`, swapping elements, and updating `left++, right--` until pointers meet in the middle.",
    explanation: "Demonstrates in-place array reversing in $O(N)$ time and $O(1)$ auxiliary memory.",
    hint: "Swaps left and right elements, stepping left++ and right--.",
    level: "basic",
    codeExample: "for (int l = 0, r = arr.length - 1; l < r; l++, r--) { swap(l, r); }"
  },
  {
    question: "What is the order of execution when multiple update expressions are listed (`i++, j += 2, k = i * j`)?",
    shortAnswer: "They are evaluated strictly from Left to Right at the conclusion of each loop iteration body.",
    explanation: "Guaranteed left-to-right evaluation order under JLS §14.14.1.",
    hint: "Evaluated strictly left-to-right.",
    level: "intermediate",
    codeExample: "for (...; ...; i++, j += 2, k = i + j) { }"
  },
  {
    question: "What is the output of `for (int i = 1, j = 5; i <= j; i++, j--) System.out.print(i + \"-\" + j + \" \");`?",
    shortAnswer: "`1-5 2-4 3-3 ` (terminates when `i=4, j=2` because `4 <= 2` is false).",
    explanation: "3 iterations total.",
    hint: "Prints 1-5 2-4 3-3.",
    level: "basic",
    codeExample: "for (int i = 1, j = 5; i <= j; i++, j--) { print(i + \"-\" + j); }"
  },
  {
    question: "Can already-declared variables of DIFFERENT types be updated together in the update clause?",
    shortAnswer: "Yes! If variables are declared before the loop (`int i; double d;`), they can both be updated in the header: `for (i = 0, d = 1.0; i < 5; i++, d *= 2.0)`.",
    explanation: "The initialization clause accepts an expression list of existing variables.",
    hint: "Yes, existing variables of different types can be initialized/updated.",
    level: "intermediate",
    codeExample: "int i; double d;\nfor (i = 0, d = 0.5; i < 5; i++, d += 0.5) { }"
  },
  {
    question: "How does the Two-Pointer loop check if a String is a Palindrome?",
    shortAnswer: "By comparing `str.charAt(l) != str.charAt(r)`; if mismatched, return false; otherwise step `l++, r--` until `l >= r`.",
    explanation: "Classic interview algorithm.",
    hint: "Compares characters at left and right pointers moving inward.",
    level: "basic",
    codeExample: "for (int l = 0, r = s.length() - 1; l < r; l++, r--) {\n    if (s.charAt(l) != s.charAt(r)) return false;\n}\nreturn true;"
  },
  {
    question: "Can a method call be included in the update expression (`for (int i = 0; i < 5; i++, logProgress())`)?",
    shortAnswer: "Yes! Any statement expression (including void method invocations) is legal in the update list.",
    explanation: "Useful for progress telemetry.",
    hint: "Yes, method invocations are valid statement expressions.",
    level: "intermediate",
    codeExample: "for (int i = 0; i < 5; i++, auditStep(i)) { }"
  },
  {
    question: "What happens if one of the pointers in a two-pointer loop is NOT updated (`i++, /* missing j-- */`)?",
    shortAnswer: "The termination condition `i < j` may take twice as long or create an unexpected infinite loop depending on initial conditions.",
    explanation: "Violates balanced convergence.",
    hint: "Can cause logic errors or infinite loops.",
    level: "basic",
    codeExample: "// for (int i=0, j=10; i<j; i++) // j never decreases!"
  },
  {
    question: "What is the Time and Space Complexity of in-place two-pointer array reversal?",
    shortAnswer: "Time: $O(N)$ (specifically $N/2$ iterations); Space: $O(1)$ constant auxiliary memory.",
    explanation: "Optimal algorithmic efficiency.",
    hint: "O(N) time and O(1) space.",
    level: "basic",
    codeExample: "// In-place reversal: O(N) time, O(1) space"
  },
  {
    question: "Can you initialize three or more variables in a `for` loop header (`for (int i = 0, j = 10, k = 100; ...)` )?",
    shortAnswer: "Yes! Any number of variables sharing the same type can be initialized.",
    explanation: "Unlimited comma-separated declarations of the same type.",
    hint: "Yes, any number of same-type variables.",
    level: "basic",
    codeExample: "for (int a = 0, b = 1, c = 2; a < 10; a++, b += 2, c += 3) { }"
  },
  {
    question: "What is the difference between comma in `for` loop headers and the Comma Operator in C++?",
    shortAnswer: "In C++, the comma operator can be used anywhere to sequence expressions; in Java, the comma operator is restricted EXCLUSIVELY to `for` loop initialization and update clauses.",
    explanation: "Java intentionally omitted the general comma operator to prevent unreadable code.",
    hint: "Java restricts comma expressions exclusively to for loop headers.",
    level: "advanced",
    codeExample: "// Java: Comma operator allowed ONLY in for loop headers!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore financial ledger reconciliation, how are morning and evening batches balanced?",
    shortAnswer: "By running `mBatch` and `eBatch` concurrently in a multi-variable loop (`for (int mBatch = 1, eBatch = 1; mBatch <= 3 && eBatch <= 3; mBatch++, eBatch++)`) in Indian Rupees (₹).",
    explanation: "Demonstrates synchronized multi-batch accounting.",
    hint: "Synchronized dual-batch iteration in ₹.",
    level: "basic",
    codeExample: "for (int m=1, e=1; m<=3 && e<=3; m++, e++) { ... }"
  },
  {
    question: "What happens if you declare `for (int i = 0, j = i + 5; i < 5; i++, j++)`?",
    shortAnswer: "Completely legal! `j` can be initialized using the value of previously initialized variable `i` within the same header.",
    explanation: "Left-to-right variable initialization order.",
    hint: "Legal: later variables can reference earlier initialized variables.",
    level: "intermediate",
    codeExample: "for (int i = 0, j = i + 10; i < 5; i++, j++) { }"
  },
  {
    question: "Can you use pre-increment on one variable and post-increment on another in the update clause (`i++, ++j`)?",
    shortAnswer: "Yes! Both `i++` and `++j` simply increment their respective variables; since their returned values are discarded, their behavior is identical.",
    explanation: "Both evaluate and increment the target variables.",
    hint: "Yes, completely valid syntax.",
    level: "basic",
    codeExample: "for (int i = 0, j = 0; i < 5; i++, ++j) { }"
  },
  {
    question: "Can you reassign a variable to an arithmetic expression in the update clause (`i = i * 2, j = j - 1`)?",
    shortAnswer: "Yes! Any assignment expression is valid in the update clause.",
    explanation: "Full support for general assignment expressions.",
    hint: "Yes, assignments like i = i * 2 are valid.",
    level: "basic",
    codeExample: "for (int i = 1, j = 100; i < j; i = i * 2, j = j - 10) { }"
  },
  {
    question: "What is the result of `for (int i = 0, s = 0; i < 4; s += i, i++)` if `s` is printed after each step?",
    shortAnswer: "Step 0: `s=0`; Step 1: `s=0`; Step 2: `s=1`; Step 3: `s=3` (`s += i` uses old `i` before `i++`).",
    explanation: "Left-to-right update sequence: `s += i` evaluates with `i` before `i++` increments `i`.",
    hint: "Left-to-right evaluation means s += i sees i before i++.",
    level: "intermediate",
    codeExample: "for (int i = 0, s = 0; i < 4; s += i, i++) { print(s); }"
  },
  {
    question: "Why should update expressions with cross-variable dependencies (`i++, j += i`) be used with extreme caution?",
    shortAnswer: "Because subtle ordering dependencies can cause confusion and hard-to-find off-by-one errors during maintenance.",
    explanation: "Keep update expressions mutually independent when possible.",
    hint: "Cross-variable update dependencies impair readability and cause bugs.",
    level: "intermediate",
    codeExample: "// Prefer simple, independent updates: i++, j++"
  },
  {
    question: "Can a `for` loop header declare both a primitive and an object reference of the same type hierarchy?",
    shortAnswer: "No, because all declared variables must have the exact same declared type specifier in the header.",
    explanation: "Single type declaration constraint.",
    hint: "No, must share the exact same type specifier.",
    level: "basic",
    codeExample: "// for (Object o = null, String s = \"\"; ...) // COMPILER ERROR!"
  },
  {
    question: "What is the bytecode representation of multi-variable update expressions?",
    shortAnswer: "The compiler emits sequential `iinc` instructions (e.g. `iinc 1, 1` followed by `iinc 2, -1`) before the `goto` jump instruction.",
    explanation: "Consecutive register operations in bytecode.",
    hint: "Sequential iinc instructions before the goto jump.",
    level: "advanced",
    codeExample: "// Bytecode: iinc 1, 1 -> iinc 2, -1 -> goto L_COND"
  },
  {
    question: "How does the Two-Pointer technique optimize binary search over a sorted array?",
    shortAnswer: "By maintaining `low = 0, high = len - 1` and converging pointers logarithmically in $O(\\log N)$ time.",
    explanation: "Standard binary search pointer paradigm.",
    hint: "Converges low and high pointers in O(log N) time.",
    level: "intermediate",
    codeExample: "for (int l = 0, r = arr.length - 1; l <= r; ) { int mid = (l + r) / 2; ... }"
  },
  {
    question: "Can you initialize variables with method return values in a multi-variable header (`for (int i = 0, max = calculateMax(); ...)` )?",
    shortAnswer: "Yes! Any valid expression evaluating to the declared type can initialize variables.",
    explanation: "Executed once during initialization.",
    hint: "Yes, method return values are valid initializers.",
    level: "basic",
    codeExample: "for (int i = 0, limit = getLimit(); i < limit; i++) { }"
  },
  {
    question: "Why is `for (int i = 0, len = str.length(); i < len; i++)` more efficient than `for (int i = 0; i < str.length(); i++)`?",
    shortAnswer: "Because `len = str.length()` is evaluated once during initialization, avoiding calling `str.length()` on every single condition check.",
    explanation: "Classic loop condition caching optimization.",
    hint: "Caches length once during initialization instead of every iteration.",
    level: "intermediate",
    codeExample: "for (int i = 0, len = str.length(); i < len; i++) { }"
  },
  {
    question: "What is the maximum number of variables recommended in a `for` loop header for clean code?",
    shortAnswer: "Maximum 2 variables (e.g. `i` and `j`, or `left` and `right`). 3 or more variables clutter the header and should be refactored.",
    explanation: "Clean code readability guideline.",
    hint: "Maximum 2 variables for clear readability.",
    level: "basic",
    codeExample: "// Keep headers simple with <= 2 variables"
  },
  {
    question: "What happens if `right--` is placed in the body instead of the header in a two-pointer loop (`for (int l=0, r=9; l<r; l++) { r--; }`)?",
    shortAnswer: "It functions identically, but placing both updates in the header keeps loop mechanics centralized and self-documenting.",
    explanation: "Centralized header updates improve readability.",
    hint: "Centralizing both updates in the header is cleaner and self-documenting.",
    level: "basic",
    codeExample: "// Better: for (int l=0, r=9; l<r; l++, r--)"
  },
  {
    question: "What is the ultimate takeaway of Module 001_005 Topic 3 for Java developers?",
    shortAnswer: "Multiple initializations and comma-separated updates in `for` loop headers allow clean, synchronized multi-pointer iteration (like two-pointer convergence and length caching) within a single compact header.",
    explanation: "Powerful algorithmic technique in Java programming.",
    hint: "Synchronized multi-pointer iteration and condition caching in a compact header.",
    level: "basic",
    codeExample: "// Summary: for (int l = 0, r = len - 1; l < r; l++, r--)"
  },
  {
    question: "What is the next topic (Topic 4) in Module 001_005?",
    shortAnswer: "Entry-controlled loops: 'while' loop syntax, condition validation, and use cases.",
    explanation: "Topic 4 explores the `while` loop construct for indefinite, state-driven iteration in Java.",
    hint: "Entry-controlled loops: 'while' loop syntax and use cases.",
    level: "basic",
    codeExample: "// Topic 4: 'while' loop syntax and validation"
  }
];

export default questions;
