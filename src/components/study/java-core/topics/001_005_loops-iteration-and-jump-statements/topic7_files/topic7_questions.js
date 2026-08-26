/**
 * Module 001_005: Topic 7: Enhanced 'for-each' loop overview for iterating sequences and arrays
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the Enhanced `for-each` loop in Java (JLS §14.14.2)?",
    shortAnswer: "A high-level iteration construct introduced in Java 5 that enables clean, index-free traversal over arrays and `Iterable` collections.",
    explanation: "Eliminates counter initialization, condition checks, and increment boilerplate.",
    hint: "Index-free traversal over arrays and Iterable collections.",
    level: "basic",
    codeExample: "for (String name : studentNames) { System.out.println(name); }"
  },
  {
    question: "What is the standard syntax of an enhanced `for-each` loop in Java?",
    shortAnswer: "`for (FormalParameter : Expression) { Statement(s) }`",
    explanation: "Where `Expression` is an array or an object implementing `java.lang.Iterable<T>`.",
    hint: "for (Type var : targetCollection) { ... }",
    level: "basic",
    codeExample: "for (double fee : tuitionFees) { total += fee; }"
  },
  {
    question: "How does the Java compiler transform an enhanced `for-each` loop on an ARRAY under the hood?",
    shortAnswer: "It generates a standard indexed `for` loop with a hidden length variable and integer index counter (`int[] a_ = arr; int len_ = a_.length; for (int i_ = 0; i_ < len_; i_++) { int x = a_[i_]; ... }`).",
    explanation: "Direct compiler syntactic sugar transformation.",
    hint: "Transforms into an optimized indexed for loop with cached length.",
    level: "advanced",
    codeExample: "// Bytecode transforms for-each array into standard indexed loop"
  },
  {
    question: "How does the Java compiler transform an enhanced `for-each` loop on a COLLECTION (e.g. `List<T>`) under the hood?",
    shortAnswer: "It generates an `Iterator<T>` loop: `for (Iterator<T> it = list.iterator(); it.hasNext(); ) { T item = it.next(); ... }`.",
    explanation: "Relies on the `Iterable<T>` interface contract.",
    hint: "Transforms into an explicit Iterator loop calling hasNext() and next().",
    level: "advanced",
    codeExample: "for (Iterator<Student> it = list.iterator(); it.hasNext(); ) { Student s = it.next(); }"
  },
  {
    question: "What happens if you reassign the loop variable in a `for-each` loop over a primitive array (`for (int x : arr) { x = 0; }`)?",
    shortAnswer: "The original array elements are UNCHANGED! `x` is merely a local copy of the value at that iteration; reassigning `x` does not write back to `arr[i]`.",
    explanation: "The single most common beginner misunderstanding of for-each loops.",
    hint: "Reassigning the variable mutates a local copy, NOT the underlying array.",
    level: "basic",
    codeExample: "for (int x : arr) { x = 100; } // arr remains unchanged!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore scholarship engine, how does `for-each` process honors candidates?",
    shortAnswer: "By iterating through `List<Student> honorsCandidates` directly, calculating 50% scholarship rebates for scores $\\ge 90\\%$ in Indian Rupees (₹).",
    explanation: "Demonstrates clean object traversal without index clutter.",
    hint: "Directly traverses List<Student> calculating scholarship in ₹.",
    level: "basic",
    codeExample: "for (Student s : candidates) { if (s.score() >= 90) grant(s); }"
  },
  {
    question: "Can an enhanced `for-each` loop traverse a sequence backwards?",
    shortAnswer: "No! The enhanced `for-each` loop is strictly forward-only; to iterate backwards, you must use a standard indexed `for` loop (`for (int i = arr.length - 1; i >= 0; i--)`).",
    explanation: "For-each does not support reverse stepping.",
    hint: "Forward-only traversal; reverse requires indexed for loop.",
    level: "basic",
    codeExample: "for (int i = arr.length - 1; i >= 0; i--) { /* Reverse traversal */ }"
  },
  {
    question: "Can you modify the size of a `List` (e.g. `list.remove(item)`) inside an enhanced `for-each` loop?",
    shortAnswer: "No! Calling `list.remove()` or `list.add()` during a `for-each` loop throws `ConcurrentModificationException` at runtime (Fail-Fast behavior).",
    explanation: "Must use explicit `Iterator.remove()` or `list.removeIf(...)`.",
    hint: "Throws ConcurrentModificationException; use Iterator.remove() instead.",
    level: "intermediate",
    codeExample: "// for (Student s : list) { list.remove(s); } // THROWS ConcurrentModificationException!"
  },
  {
    question: "What happens if the target expression in a `for-each` loop evaluates to `null` (`for (String s : nullList)`)?",
    shortAnswer: "Throws `NullPointerException` immediately upon entering the loop header.",
    explanation: "Attempting to invoke `.iterator()` or `.length` on a null reference causes NPE.",
    hint: "Throws NullPointerException.",
    level: "basic",
    codeExample: "List<String> list = null;\nfor (String s : list) {} // THROWS NullPointerException!"
  },
  {
    question: "Can the iteration variable in an enhanced `for-each` loop be declared as `final` (`for (final Student s : list)`)?",
    shortAnswer: "Yes! Because each iteration introduces a fresh immutable variable binding for that specific element.",
    explanation: "Enforces immutability and allows safe usage in local lambdas.",
    hint: "Yes, final is completely legal and encouraged for immutability.",
    level: "intermediate",
    codeExample: "for (final Student s : students) { System.out.println(s); }"
  },
  {
    question: "Can you use `var` in an enhanced `for-each` loop header in Java 10+?",
    shortAnswer: "Yes! E.g. `for (var fee : tuitionFees)` is completely legal, with type inferred automatically by the compiler.",
    explanation: "Supported under Java 10 JEP 286.",
    hint: "Yes, var is fully supported in for-each loop headers.",
    level: "basic",
    codeExample: "for (var student : honorsCandidates) { print(student.name()); }"
  },
  {
    question: "Can `break` and `continue` be used inside an enhanced `for-each` loop?",
    shortAnswer: "Yes! `break` terminates the loop immediately; `continue` skips the remainder of the body and moves directly to the next element.",
    explanation: "Full support for standard loop jump controls.",
    hint: "Yes, break and continue work normally in for-each loops.",
    level: "basic",
    codeExample: "for (Student s : students) { if (s.isBlacklisted()) continue; }"
  },
  {
    question: "How can you access the integer index `i` inside an enhanced `for-each` loop?",
    shortAnswer: "You cannot access the index directly through the loop syntax; you must maintain an external counter variable (`int i = 0; for (...) { i++; }`) or switch to an indexed `for` loop.",
    explanation: "The enhanced for-each intentionally abstracts away index state.",
    hint: "Index is not provided; maintain an external counter or use standard for loop.",
    level: "basic",
    codeExample: "int index = 0;\nfor (String name : names) { print(index + \": \" + name); index++; }"
  },
  {
    question: "Can you iterate a 2D Array using nested enhanced `for-each` loops?",
    shortAnswer: "Yes! `for (int[] row : matrix) { for (int val : row) { ... } }`.",
    explanation: "Outer loop iterates rows; inner loop iterates column elements.",
    hint: "for (int[] row : matrix) for (int val : row).",
    level: "basic",
    codeExample: "for (int[] row : grid) {\n    for (int cell : row) System.out.print(cell + \" \");\n}"
  },
  {
    question: "What interface must a custom class implement to be iterable via an enhanced `for-each` loop?",
    shortAnswer: "`java.lang.Iterable<T>`, which requires implementing the `Iterator<T> iterator()` method.",
    explanation: "The core interface contract for Java collection iteration.",
    hint: "Must implement java.lang.Iterable<T>.",
    level: "intermediate",
    codeExample: "public class CourseBatch implements Iterable<Student> {\n    public Iterator<Student> iterator() { ... }\n}"
  },
  {
    question: "Why does the enhanced `for-each` loop eliminate `ArrayIndexOutOfBoundsException`?",
    shortAnswer: "Because the compiler automatically bounds the iteration to the exact length of the array (`0` to `length - 1`), eliminating manual boundary errors.",
    explanation: "Guaranteed boundary correctness.",
    hint: "Compiler automatically sets exact array length bounds.",
    level: "basic",
    codeExample: "// Impossible to get IndexOutOfBounds in a standard for-each loop"
  },
  {
    question: "Can you skip elements (e.g. process every 2nd element) using an enhanced `for-each` loop?",
    shortAnswer: "No! `for-each` iterates every single element sequentially; to skip elements (`i += 2`), use a standard indexed `for` loop.",
    explanation: "Custom step increments require indexed loops.",
    hint: "No, custom step skipping requires an indexed for loop.",
    level: "basic",
    codeExample: "for (int i = 0; i < arr.length; i += 2) { /* Process every 2nd element */ }"
  },
  {
    question: "If an array contains mutable OBJECT references (e.g. `Student[]`), does mutating fields (`s.setScore(90)`) affect the array?",
    shortAnswer: "Yes! While the reference `s` cannot be reassigned to a new object, calling mutating setter methods on `s` mutates the actual object in heap memory.",
    explanation: "Reference pass-by-value vs object state mutation.",
    hint: "Yes, calling setters on object references mutates the heap object.",
    level: "intermediate",
    codeExample: "for (Student s : students) { s.setFeePaid(true); } // Mutates object in heap!"
  },
  {
    question: "What is the performance overhead of an enhanced `for-each` loop on an array compared to a traditional `for` loop?",
    shortAnswer: "Zero overhead! Both compile to identical bytecode instructions with length caching.",
    explanation: "JVM JIT compiler produces identical machine instructions.",
    hint: "Zero overhead; identical bytecode to indexed loops.",
    level: "advanced",
    codeExample: "// Identical performance to: for (int i=0, len=arr.length; i<len; i++)"
  },
  {
    question: "What is the performance overhead of an enhanced `for-each` loop on a `List`?",
    shortAnswer: "A temporary `Iterator` object is allocated on the heap (or scalar-replaced by JIT Escape Analysis) to track iteration state.",
    explanation: "For critical zero-allocation paths in high-frequency trading, indexed access (`list.get(i)`) on ArrayList is sometimes used.",
    hint: "Allocates an Iterator object (unless scalar-replaced by JIT).",
    level: "advanced",
    codeExample: "// Allocates an Iterator under the hood"
  },
  {
    question: "Can you iterate a `Map` directly using an enhanced `for-each` loop (`for (var entry : map)`)?",
    shortAnswer: "No, `Map` does not implement `Iterable`. You must iterate its entry set (`map.entrySet()`), key set (`map.keySet()`), or values (`map.values()`).",
    explanation: "Map is not an Iterable collection in Java.",
    hint: "Must iterate map.entrySet(), map.keySet(), or map.values().",
    level: "intermediate",
    codeExample: "for (Map.Entry<String, Double> e : feeMap.entrySet()) { print(e.getKey() + \": \" + e.getValue()); }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, why is `for-each` taught as the default loop for collections?",
    shortAnswer: "Because it produces the most concise, self-documenting code and eliminates 90% of beginner iteration bugs.",
    explanation: "Follows Effective Java Item 58: Prefer for-each loops to traditional for loops.",
    hint: "Produces clean, self-documenting code without index bugs.",
    level: "basic",
    codeExample: "// Item 58: Prefer for-each loops to traditional for loops"
  },
  {
    question: "Can an enhanced `for-each` loop be labeled with a statement label (`OUTER: for (String s : list)`)?",
    shortAnswer: "Yes! Labeled `break OUTER;` and `continue OUTER;` work seamlessly with enhanced `for-each` loops.",
    explanation: "Full support for labeled jump statements.",
    hint: "Yes, labels can be applied to for-each loops.",
    level: "basic",
    codeExample: "OUTER: for (String[] row : table) {\n    for (String cell : row) { if (cell.equals(\"STOP\")) break OUTER; }\n}"
  },
  {
    question: "What happens if you try to use `for-each` on a primitive type instead of an array/collection (`for (int x : 100)`)?",
    shortAnswer: "Compilation error: `foreach not applicable to type int`.",
    explanation: "The target expression must be an array or Iterable.",
    hint: "Compile error: foreach requires an array or Iterable.",
    level: "basic",
    codeExample: "// for (int x : 100) // COMPILER ERROR!"
  },
  {
    question: "How does `for-each` compare to Java 8 Streams `forEach(...)` (`list.forEach(System.out::println)`)?",
    shortAnswer: "The enhanced `for-each` statement supports checked exceptions, `break`, `continue`, and early `return`; Stream `forEach` accepts a consumer lambda where `break` is not supported.",
    explanation: "Imperative control flow vs functional internal iteration.",
    hint: "for-each supports break, continue, and checked exceptions.",
    level: "intermediate",
    codeExample: "// for (s : list) supports 'break'; list.forEach() does not"
  },
  {
    question: "Can an enhanced `for-each` loop iterate over an `Enum.values()` array?",
    shortAnswer: "Yes! E.g. `for (DayOfWeek day : DayOfWeek.values()) { ... }` is the standard idiom for iterating enum constants.",
    explanation: "Enum values() returns an array, which is directly iterable.",
    hint: "for (MyEnum e : MyEnum.values()) is standard.",
    level: "basic",
    codeExample: "for (CourseTier tier : CourseTier.values()) { print(tier); }"
  },
  {
    question: "What is the result of iterating `String[] names = {}; for (String n : names) count++;`?",
    shortAnswer: "`count` remains unchanged (0 iterations) because the empty array length is 0.",
    explanation: "Safely handles empty arrays without errors.",
    hint: "0 iterations on empty arrays.",
    level: "basic",
    codeExample: "for (String n : new String[0]) { /* Never runs */ }"
  },
  {
    question: "What is Effective Java Item 58 rule of thumb for loop selection?",
    shortAnswer: "Prefer enhanced `for-each` loops everywhere, UNLESS: 1. Destructive filtering (need `Iterator.remove()`); 2. Transforming array elements (need index `arr[i] = x`); 3. Parallel iteration across multiple collections.",
    explanation: "Classic Joshua Bloch clean code doctrine.",
    hint: "Use for-each everywhere except for filtering, mutating, or parallel traversal.",
    level: "intermediate",
    codeExample: "// Effective Java Item 58: 3 exceptions to for-each rule"
  },
  {
    question: "What is the ultimate takeaway of Module 001_005 Topic 7 for Java developers?",
    shortAnswer: "The enhanced `for-each` loop provides clean, elegant, index-free iteration over arrays and `Iterable` collections, eliminating boundary and off-by-one errors while preserving peak bytecode performance.",
    explanation: "Premier iteration construct for read-only data traversal.",
    hint: "Index-free traversal eliminating off-by-one errors with zero performance penalty.",
    level: "basic",
    codeExample: "// Summary: for (Type element : collection) { process(element); }"
  },
  {
    question: "What is the next topic (Topic 8) in Module 001_005?",
    shortAnswer: "Infinite loops (for(;;), while(true)): legitimate use cases and accidental causes.",
    explanation: "Topic 8 explores intentional vs accidental infinite loops, event polling architectures, and CPU runaway prevention.",
    hint: "Infinite loops: legitimate use cases and accidental causes.",
    level: "basic",
    codeExample: "// Topic 8: Infinite loops in Java"
  }
];

export default questions;
