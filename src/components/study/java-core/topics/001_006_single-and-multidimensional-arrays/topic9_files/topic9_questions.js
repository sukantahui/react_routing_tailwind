/**
 * Module 001_006: Topic 9: Traversing arrays using enhanced for-each loop (read-only limitation)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the syntax of the Enhanced For-Each Loop for arrays in Java?",
    shortAnswer: "`for (ElementType variableName : arrayReference) { ... }`.",
    explanation: "Introduced in Java 5 (JLS §14.14.2) for clean iteration without manual indexing.",
    hint: "for (Type x : arr) { ... }.",
    level: "basic",
    codeExample: "for (int num : numbers) System.out.println(num);"
  },
  {
    question: "How does the Java compiler translate an Enhanced For-Each Loop over an array at the bytecode level?",
    shortAnswer: "The compiler desugars it into an equivalent standard indexed `for` loop with a temporary array reference and a hidden index counter (`i$ = 0; i$ < len$; i$++`).",
    explanation: "Pure syntactic sugar over standard indexed loops.",
    hint: "Desugars directly into an indexed for loop with a hidden index counter.",
    level: "intermediate",
    codeExample: "// Compiler generates: for (int i$ = 0; i$ < len$; i$++) { int x = a$[i$]; ... }"
  },
  {
    question: "Why can't you modify primitive array elements using an Enhanced For-Each Loop (`for (int x : arr) x = 99;`)?",
    shortAnswer: "Because `x` is a LOCAL COPY of the value extracted from the array slot; reassigning `x` mutates only the local stack variable, leaving the original array slot in Heap memory completely unchanged.",
    explanation: "Fundamental read-only limitation on primitive arrays.",
    hint: "x is a local copy variable; modifying x does not affect the heap array slot.",
    level: "basic",
    codeExample: "for (int x : arr) x = 99; // Original array is UNCHANGED!"
  },
  {
    question: "What happens if you invoke a mutating method on an object inside a for-each loop (`for (Student s : list) s.setMarks(95);`)?",
    shortAnswer: "The state of the object in Heap memory IS successfully mutated because `s` holds a copy of the reference pointer pointing to the exact same shared Heap object.",
    explanation: "Object state mutation vs reference reassignment distinction.",
    hint: "Mutating methods modify the shared heap object; reassigning s = new Student() does not.",
    level: "intermediate",
    codeExample: "for (StudentAccount acc : accounts) acc.creditScholarship(1000.0); // WORKS!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore stipend demo, what happened when `stipend += 1000.0` was executed in the for-each loop?",
    shortAnswer: "The stipend amounts in the array remained unchanged at ₹5,000 to ₹6,000 because `stipend` was merely a local primitive double copy in Indian Rupees (₹).",
    explanation: "Demonstrates the local copy read-only trap.",
    hint: "Array elements remained unchanged because stipend was a local copy.",
    level: "basic",
    codeExample: "for (double s : stipends) s += 1000.0; // stipends array unchanged!"
  },
  {
    question: "What are the 4 main limitations of the Enhanced For-Each Loop compared to standard indexed `for` loops?",
    shortAnswer: "1. No access to index counter ($i$); 2. Cannot modify primitive array slots; 3. Cannot traverse in reverse order; 4. Cannot skip elements or step by $2+$.",
    explanation: "Trade-offs between convenience and control.",
    hint: "No index access, read-only on primitives, forward-only, single-step only.",
    level: "basic",
    codeExample: "// Use standard for loop when you need index, reverse, or in-place mutation"
  },
  {
    question: "Can you traverse multidimensional 2D arrays using nested Enhanced For-Each loops?",
    shortAnswer: "YES! `for (int[] row : matrix) for (int val : row) { ... }` cleanly traverses all elements.",
    explanation: "Nested for-each matrix traversal.",
    hint: "Outer loop iterates rows (int[] row : matrix), inner loop iterates elements (int val : row).",
    level: "basic",
    codeExample: "for (int[] row : grid) for (int val : row) System.out.print(val + \" \");"
  },
  {
    question: "What is the performance difference between an Enhanced For-Each loop and a standard indexed `for` loop over an array?",
    shortAnswer: "Zero difference! The JIT compiler optimizes both to the exact same machine code instructions.",
    explanation: "Bytecode equivalence and JIT optimization.",
    hint: "Zero difference; both compile to identical machine code.",
    level: "intermediate",
    codeExample: "// 100% identical performance under HotSpot JIT C2"
  },
  {
    question: "Can an Enhanced For-Each loop throw `ArrayIndexOutOfBoundsException`?",
    shortAnswer: "NO! It is syntactically impossible for a for-each loop to throw `ArrayIndexOutOfBoundsException` because the compiler strictly controls the upper iteration bound.",
    explanation: "Built-in boundary safety.",
    hint: "No, the compiler manages bounds internally.",
    level: "basic",
    codeExample: "// Immune to ArrayIndexOutOfBoundsException"
  },
  {
    question: "What happens if you execute an Enhanced For-Each loop on a `null` array (`int[] a = null; for (int x : a)`)?",
    shortAnswer: "Throws `java.lang.NullPointerException` immediately upon entering the loop header.",
    explanation: "Attempting to read length on null array.",
    hint: "Throws NullPointerException.",
    level: "basic",
    codeExample: "int[] a = null;\n// for (int x : a) { } // THROWS NullPointerException!"
  },
  {
    question: "Can `var` be used in an Enhanced For-Each loop header in Java 10+ (`for (var x : arr)`)?",
    shortAnswer: "YES! The compiler automatically infers the element type of `x` from the array type.",
    explanation: "Local variable type inference in for-each loops.",
    hint: "Yes, var is valid in for-each loop headers.",
    level: "basic",
    codeExample: "for (var fee : stipendAmounts) total += fee;"
  },
  {
    question: "Can you use `final` in an Enhanced For-Each loop header (`for (final int x : arr)`)?",
    shortAnswer: "YES! Marking `final int x` ensures that `x` cannot be reassigned within the loop body.",
    explanation: "Immutable loop variable modifier.",
    hint: "Yes, prevents reassigning the loop variable.",
    level: "basic",
    codeExample: "for (final double fee : stipendAmounts) { ... }"
  },
  {
    question: "When should you prefer a standard indexed `for` loop over an Enhanced For-Each loop?",
    shortAnswer: "When you need the numeric index (e.g. `arr[i] = ...`), need to modify primitive array elements, need reverse traversal, or need to compare adjacent elements (`arr[i] == arr[i+1]`).",
    explanation: "Decision criteria between loop styles.",
    hint: "When index counter, reverse traversal, or element mutation is required.",
    level: "basic",
    codeExample: "// Standard for: arr[i] = 10; | For-each: System.out.println(val);"
  },
  {
    question: "Can `break` and `continue` be used inside an Enhanced For-Each loop?",
    shortAnswer: "YES! `break` terminates the loop immediately, and `continue` skips to the next array element.",
    explanation: "Standard loop control statements apply.",
    hint: "Yes, break and continue function identically in for-each loops.",
    level: "basic",
    codeExample: "for (int x : arr) { if (x < 0) continue; if (x == 100) break; }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what is the #1 recommended use case for for-each loops?",
    shortAnswer: "Read-only traversals: calculating sums, finding averages, filtering data, printing elements, and searching without index requirements.",
    explanation: "Read-only iteration best practice.",
    hint: "Read-only traversals, summing, filtering, and printing.",
    level: "basic",
    codeExample: "for (double fee : fees) total += fee;"
  },
  {
    question: "What happens if you reassign an object reference variable in a for-each loop (`for (Student s : list) s = new Student();`)?",
    shortAnswer: "Only the local variable `s` is pointed to the new object; the slot in the original array continues pointing to the original Heap object.",
    explanation: "Reference reassignment vs object mutation.",
    hint: "Reassigns only the local variable; array slot remains unchanged.",
    level: "intermediate",
    codeExample: "for (Student s : list) s = new Student(); // Array slots are UNCHANGED!"
  },
  {
    question: "Can an Enhanced For-Each loop iterate over an array returned directly by a method (`for (int x : getScores())`)?",
    shortAnswer: "YES! The method `getScores()` is evaluated ONCE before the loop begins, and its return array is traversed.",
    explanation: "Expression evaluation in for-each header.",
    hint: "Yes, method is evaluated once and returned array is traversed.",
    level: "basic",
    codeExample: "for (int score : getScores()) process(score);"
  },
  {
    question: "Does an Enhanced For-Each loop create an `Iterator` object when traversing raw arrays?",
    shortAnswer: "NO! For raw arrays, the compiler desugars into simple integer index loops without allocating an `Iterator` object (unlike Collections).",
    explanation: "Zero-allocation array traversal.",
    hint: "No, compiles to raw integer index loop with zero object allocation.",
    level: "advanced",
    codeExample: "// Zero Iterator allocation for raw arrays"
  },
  {
    question: "How do you find the maximum element in an array using an Enhanced For-Each loop?",
    shortAnswer: "`double max = arr[0]; for (double x : arr) if (x > max) max = x;`.",
    explanation: "Clean maximum search algorithm.",
    hint: "double max = arr[0]; for (double x : arr) if (x > max) max = x;.",
    level: "basic",
    codeExample: "double max = arr[0]; for (double val : arr) if (val > max) max = val;"
  },
  {
    question: "How do you count elements matching a condition using an Enhanced For-Each loop?",
    shortAnswer: "`int count = 0; for (double x : arr) if (x >= 15000.0) count++;` in Indian Rupees (₹).",
    explanation: "Linear filtering pattern.",
    hint: "Increment count inside if condition during for-each iteration.",
    level: "basic",
    codeExample: "int count = 0; for (double f : fees) if (f >= 15000) count++;"
  },
  {
    question: "Can an Enhanced For-Each loop iterate over multiple arrays in parallel?",
    shortAnswer: "NO! A single for-each loop binds to one array only; to iterate two arrays simultaneously (e.g. `names[i]` and `scores[i]`), use a standard indexed `for` loop.",
    explanation: "Parallel array traversal constraint.",
    hint: "No, use standard indexed for loop for parallel array traversals.",
    level: "basic",
    codeExample: "for (int i=0; i<names.length; i++) print(names[i] + \": \" + scores[i]);"
  },
  {
    question: "What is the effect of changing array length during for-each iteration?",
    shortAnswer: "Array length is immutable in Java, so changing array size during iteration is physically impossible.",
    explanation: "Array size immutability invariant.",
    hint: "Impossible; array length is strictly immutable.",
    level: "basic",
    codeExample: "// Array size cannot change at runtime"
  },
  {
    question: "Can an Enhanced For-Each loop iterate over a zero-length array (`new int[0]`)?",
    shortAnswer: "YES! The loop condition evaluates to `0 < 0` (false), immediately skipping the loop body with zero executions.",
    explanation: "Zero-length array safety.",
    hint: "Yes, safely skips loop body without errors.",
    level: "basic",
    codeExample: "for (int x : new int[0]) { } // Executes 0 times safely"
  },
  {
    question: "In the Coder & AccoTax Barrackpore banking engine, why is for-each preferred for fraud audits?",
    shortAnswer: "Because read-only audits only need to inspect transaction values, preventing accidental corruption of financial records in Indian Rupees (₹).",
    explanation: "Read-only data integrity assurance.",
    hint: "Guarantees read-only inspection without risking accidental balance modification.",
    level: "basic",
    codeExample: "for (Transaction tx : batch) audit(tx);"
  },
  {
    question: "What is the type of `x` in `for (var x : new double[]{1.0, 2.0})`?",
    shortAnswer: "Primitive `double`.",
    explanation: "Type inference resolution.",
    hint: "Primitive double.",
    level: "basic",
    codeExample: "for (var x : new double[]{1.0, 2.0}) // x is double"
  },
  {
    question: "Can an Enhanced For-Each loop be labeled with a loop statement label?",
    shortAnswer: "YES! `STIPEND_LOOP: for (double fee : fees) { if (fee > 50000) break STIPEND_LOOP; }` is completely legal.",
    explanation: "Labeled statement compatibility.",
    hint: "Yes, for-each loops support labels.",
    level: "intermediate",
    codeExample: "OUTER: for (int[] row : grid) for (int v : row) if (v == 0) break OUTER;"
  },
  {
    question: "How does the Enhanced For-Each loop prevent off-by-one errors compared to indexed loops?",
    shortAnswer: "By eliminating explicit `<` vs `<=` relational comparisons, initial index declarations, and manual index increment operations.",
    explanation: "Declarative iteration design.",
    hint: "Eliminates index variables, initializers, bounds, and increment operations entirely.",
    level: "basic",
    codeExample: "// Eliminates index variables completely"
  },
  {
    question: "What is the ultimate takeaway of Module 001_006 Topic 9 for Java developers?",
    shortAnswer: "The Enhanced For-Each loop (`for (Type x : arr)`) provides clean, concise, bug-free read-only array traversal; primitive array elements cannot be mutated via `x`, but object state can be mutated via methods.",
    explanation: "Mastery of for-each iteration mechanics.",
    hint: "Concise read-only traversal; primitive variables are local copies; objects allow state mutation.",
    level: "basic",
    codeExample: "// Summary: for (Type x : arr) → Read-only primitives, mutable object states"
  },
  {
    question: "What is the next topic (Topic 10) in Module 001_006?",
    shortAnswer: "Passing arrays to methods and returning arrays from methods.",
    explanation: "Topic 10 explores pass-by-value reference semantics, method mutations, returning newly allocated arrays, and defensive copying.",
    hint: "Passing arrays to methods and returning arrays from methods.",
    level: "basic",
    codeExample: "// Topic 10: Passing and Returning Arrays in Methods"
  },
  {
    question: "Can you modify the elements of an array passed to a method via a for-each loop inside that method?",
    shortAnswer: "NO! Reassigning the for-each loop variable `x` inside the method still only changes the local copy on that method's stack frame.",
    explanation: "Local copy rule applies everywhere.",
    hint: "No, the local copy limitation applies inside methods as well.",
    level: "basic",
    codeExample: "void modify(int[] a) { for (int x : a) x = 0; } // a remains unchanged!"
  }
];

export default questions;
