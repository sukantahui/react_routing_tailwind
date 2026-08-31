/**
 * Module 001_006: Topic 1: Array memory allocation: reference on Stack, elements allocated dynamically on Heap
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "Where does the array reference variable live vs the actual array object in Java memory?",
    shortAnswer: "The array reference variable lives in Stack memory (within the method frame); the actual array object and its element payload are ALWAYS allocated dynamically in Heap memory.",
    explanation: "Core JVM memory division.",
    hint: "Reference lives on Stack; array object lives in Heap.",
    level: "basic",
    codeExample: "int[] arr = new int[5]; // arr on Stack → array object on Heap"
  },
  {
    question: "What are the default initial values of primitive elements in a newly instantiated array (`new int[5]`)?",
    shortAnswer: "Numeric primitives (`byte`, `short`, `int`, `long`) default to `0`; floating-points (`float`, `double`) default to `0.0`; `boolean` defaults to `false`; `char` defaults to `'\\u0000'` (NUL).",
    explanation: "JVM guarantees automatic zero-initialization for all array elements upon allocation.",
    hint: "Numbers default to 0/0.0, boolean to false, char to '\\u0000'.",
    level: "basic",
    codeExample: "int[] nums = new int[3]; // nums[0] is 0"
  },
  {
    question: "What is the default initial value of elements in an Object reference array (`new String[5]` or `new Student[5]`)?",
    shortAnswer: "`null` (indicating that the array slot points to no object in Heap memory).",
    explanation: "Object slots are initialized to null references.",
    hint: "null.",
    level: "basic",
    codeExample: "String[] names = new String[3]; // names[0] is null"
  },
  {
    question: "What is 'Array Aliasing' in Java (`int[] b = a;`)?",
    shortAnswer: "When two reference variables point to the exact same array object on the Heap; modifying elements through `b[0] = 99` mutates the shared object, making the change visible via `a[0]`.",
    explanation: "Copies the reference pointer address, not the underlying array data.",
    hint: "Two references pointing to the exact same heap object.",
    level: "basic",
    codeExample: "int[] a = {1, 2}; int[] b = a; b[0] = 99; // a[0] is now 99!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore workstation deposit demo, what is proved by `aliasRef[0] = 7500.0`?",
    shortAnswer: "It proves that `aliasRef` and `labDeposits` share the exact same Heap memory object in Indian Rupees (₹), mutating `labDeposits[0]` simultaneously.",
    explanation: "Demonstrates practical reference aliasing.",
    hint: "Proves shared Heap object through alias mutation in ₹.",
    level: "basic",
    codeExample: "aliasRef[0] = 7500.0; // mutates shared heap object"
  },
  {
    question: "Why does the JVM zero-initialize array elements automatically?",
    shortAnswer: "To enforce memory safety and eliminate uninitialized garbage memory reads (preventing security exploits common in C/C++).",
    explanation: "Java type safety guarantee.",
    hint: "Enforces memory safety and prevents reading uninitialized garbage data.",
    level: "intermediate",
    codeExample: "// Java guarantees clean zero-filled memory"
  },
  {
    question: "What happens when an array reference is set to `null` (`arr = null;`)?",
    shortAnswer: "The stack reference variable ceases to point to the Heap object; if no other references point to that array, it becomes eligible for Garbage Collection.",
    explanation: "Standard JVM GC eligibility.",
    hint: "Breaks reference pointer, making heap array eligible for Garbage Collection.",
    level: "basic",
    codeExample: "arr = null; // Disconnects pointer from heap object"
  },
  {
    question: "What error occurs if you attempt to access an element of a null array (`int[] a = null; a[0] = 5;`)?",
    shortAnswer: "`java.lang.NullPointerException` because the reference on the stack points to nothing in the Heap.",
    explanation: "Dereferencing null causes NPE.",
    hint: "Throws NullPointerException.",
    level: "basic",
    codeExample: "int[] a = null; a[0] = 5; // THROWS NullPointerException!"
  },
  {
    question: "How much total Heap memory does an `int[1000]` array consume in a 64-bit JVM with Compressed OOPs?",
    shortAnswer: "Approximately 4,024 bytes: 16-byte object header + (1000 elements * 4 bytes = 4,000 bytes) + 8-byte 8-byte alignment padding.",
    explanation: "Standard HotSpot object layout calculation.",
    hint: "16B header + 4000B payload + padding = approx 4,024 bytes.",
    level: "advanced",
    codeExample: "// Memory: 16B header + 1000*4B = 4016B + 8B padding → 4024B"
  },
  {
    question: "How does the memory layout of an array of primitives (`int[]`) differ from an array of objects (`Integer[]`)?",
    shortAnswer: "`int[]` stores raw 4-byte primitive values contiguously in the heap object; `Integer[]` stores an array of 4-byte/8-byte pointers, where each pointer points to a separate `Integer` object elsewhere in the Heap.",
    explanation: "Primitive arrays have 1 layer of indirection; Object arrays have 2 layers of indirection.",
    hint: "Primitive arrays store values directly; Object arrays store pointers to separate heap objects.",
    level: "intermediate",
    codeExample: "// int[] (flat contiguous values) vs Integer[] (array of pointers)"
  },
  {
    question: "What is 'Pointer Chasing' and why is it slower in Object arrays than primitive arrays?",
    shortAnswer: "Pointer chasing requires the CPU to dereference memory addresses from the array to locate the actual objects scattered across Heap memory, causing L1/L2 cache misses.",
    explanation: "Major reason primitive arrays outperform object arrays in performance-critical code.",
    hint: "Dereferencing scattered heap object pointers causes CPU cache misses.",
    level: "advanced",
    codeExample: "// Integer[] requires pointer dereferencing for every element"
  },
  {
    question: "Can an array object on the Heap be allocated on the Stack via JIT Escape Analysis?",
    shortAnswer: "Yes! If the C2 JIT compiler proves an array is strictly local to a method and never escapes, it performs Scalar Replacement, allocating elements directly into CPU registers or Stack memory.",
    explanation: "Advanced JVM performance optimization.",
    hint: "Yes, JIT scalar replacement can allocate non-escaping arrays into CPU registers/stack.",
    level: "expert",
    codeExample: "// JIT performs scalar replacement for local non-escaping arrays"
  },
  {
    question: "What is the lifetime of an array allocated inside a method?",
    shortAnswer: "The stack reference variable exists only while the method execution frame is active; the heap array object persists until the Garbage Collector detects that no references remain.",
    explanation: "Stack frame deallocation vs dynamic Heap GC.",
    hint: "Reference destroyed when method exits; heap object persists until GC reclaims it.",
    level: "basic",
    codeExample: "void m() { int[] a = new int[5]; } // Heap object GC'd after method returns"
  },
  {
    question: "What is an `OutOfMemoryError: Java heap space` caused by an array allocation?",
    shortAnswer: "Occurs when attempting to allocate an array so large (`new byte[Integer.MAX_VALUE]`) that the JVM Heap does not have sufficient contiguous free memory to fulfill the request.",
    explanation: "Heap memory exhaustion.",
    hint: "Heap has insufficient contiguous memory for requested array allocation.",
    level: "intermediate",
    codeExample: "// byte[] huge = new byte[2_000_000_000]; // OutOfMemoryError if heap < 2GB"
  },
  {
    question: "How does `System.identityHashCode(arr)` help verify if two array variables point to the same Heap object?",
    shortAnswer: "It returns the default memory-based hash code of the heap object; identical identity hash codes confirm that both reference variables point to the exact same array in Heap memory.",
    explanation: "Identity verification in Java.",
    hint: "Returns memory identity hash code to confirm pointer equality.",
    level: "intermediate",
    codeExample: "System.out.println(System.identityHashCode(a) == System.identityHashCode(b));"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what default value is assigned to uninitialized `boolean[] attendance`?",
    shortAnswer: "`false` across all elements.",
    explanation: "Standard JVM boolean default initialization.",
    hint: "false.",
    level: "basic",
    codeExample: "boolean[] att = new boolean[30]; // All 30 are false by default"
  },
  {
    question: "What is the memory size of a reference pointer on a 64-bit JVM with `-XX:+UseCompressedOops` enabled?",
    shortAnswer: "4 bytes (32 bits), allowing the JVM to address up to 32 GB of Heap memory efficiently.",
    explanation: "Compressed Ordinary Object Pointers standard in modern 64-bit HotSpot JVM.",
    hint: "4 bytes with Compressed OOPs.",
    level: "advanced",
    codeExample: "// Compressed OOPs reduces reference size from 8B to 4B"
  },
  {
    question: "What happens if you pass an array to a method in Java (Pass-by-Value vs Pass-by-Reference)?",
    shortAnswer: "Java is strictly Pass-by-Value: the *reference address* is passed by value (copied onto the method's stack frame), allowing the method to mutate the original Heap array elements.",
    explanation: "Core Java parameter passing concept.",
    hint: "Reference value is copied, allowing method to mutate original heap elements.",
    level: "basic",
    codeExample: "void update(int[] a) { a[0] = 99; } // Mutates original array in heap!"
  },
  {
    question: "Can a method reassign the caller's array reference variable (`void reset(int[] a) { a = new int[5]; }`)?",
    shortAnswer: "No! Reassigning `a` only changes the local copy of the reference on that method's stack frame; the caller's original reference variable remains unchanged.",
    explanation: "Demonstrates that reference variables are passed by value.",
    hint: "No, reassigning the parameter reference does not affect the caller's variable.",
    level: "intermediate",
    codeExample: "void reset(int[] a) { a = new int[5]; } // Caller's variable is unaffected!"
  },
  {
    question: "What is 'Heap Fragmentation' in relation to large array allocations?",
    shortAnswer: "When total free heap memory is sufficient, but no single contiguous chunk of memory is large enough to allocate a massive array, causing an `OutOfMemoryError`.",
    explanation: "Why very large arrays require contiguous allocation.",
    hint: "Lack of contiguous free heap space for large array allocations.",
    level: "advanced",
    codeExample: "// Requires contiguous memory chunk in Heap"
  },
  {
    question: "What is the default value of an array of `char` primitives in Java?",
    shortAnswer: "The NUL character `'\\u0000'` (integer value `0`).",
    explanation: "Standard Unicode character default.",
    hint: "'\\u0000' (NUL character).",
    level: "basic",
    codeExample: "char[] ch = new char[2]; // ch[0] is '\\u0000'"
  },
  {
    question: "How does the JVM physically clear array memory on allocation (`new int[N]`)?",
    shortAnswer: "The HotSpot JVM issues a bulk zeroing instruction (e.g. `rep stosq` on x86 or AVX zeroing instructions) during allocation in the TLAB (Thread-Local Allocation Buffer).",
    explanation: "Hardware-accelerated bulk memory clearing.",
    hint: "Uses bulk zeroing CPU instructions in Thread-Local Allocation Buffers.",
    level: "expert",
    codeExample: "// TLAB hardware-accelerated memory zeroing"
  },
  {
    question: "What is a TLAB (Thread-Local Allocation Buffer) in Java array allocation?",
    shortAnswer: "A dedicated chunk of Heap memory assigned to a specific thread where small-to-medium arrays can be allocated without acquiring global Heap synchronization locks.",
    explanation: "High-throughput lock-free allocation mechanism in HotSpot JVM.",
    hint: "Thread-specific heap region enabling lock-free array allocation.",
    level: "advanced",
    codeExample: "// TLAB enables lock-free heap allocation"
  },
  {
    question: "In the Coder & AccoTax Barrackpore database, why are primitive arrays preferred for security deposits?",
    shortAnswer: "Because `double[]` guarantees zero-initialization to ₹0.00 and eliminates pointer indirection and GC pauses in Indian Rupees (₹).",
    explanation: "Combines financial safety with high throughput.",
    hint: "Guarantees ₹0.00 default and zero GC pause overhead.",
    level: "basic",
    codeExample: "double[] deposits = new double[100]; // initialized to 0.0"
  },
  {
    question: "What happens if an array is allocated inside a loop repeatedly (`while (true) { int[] a = new int[1000]; }`)?",
    shortAnswer: "The JVM rapidly allocates objects in the Young Generation Eden space, triggering frequent Minor GC collections to sweep unreferenced arrays.",
    explanation: "Memory churn and GC pressure.",
    hint: "Causes Young Generation memory pressure and frequent Minor GC pauses.",
    level: "intermediate",
    codeExample: "while (true) { int[] a = new int[1000]; } // Memory churn"
  },
  {
    question: "Can two different arrays on the Heap occupy the same memory address simultaneously?",
    shortAnswer: "No! Every newly instantiated array via `new` receives a distinct, unique contiguous block of memory on the Heap.",
    explanation: "Heap memory address uniqueness.",
    hint: "No, each 'new' call allocates a unique heap memory address.",
    level: "basic",
    codeExample: "int[] a = new int[2]; int[] b = new int[2]; // a != b (distinct objects)"
  },
  {
    question: "What is the return value of `a == b` when `a` and `b` are two separate arrays with identical contents (`int[] a = {1}; int[] b = {1};`)?",
    shortAnswer: "`false` because the `==` operator on reference types checks memory reference address equality (whether they point to the exact same Heap object), not content equality.",
    explanation: "Must use `Arrays.equals(a, b)` for content equality.",
    hint: "false (== checks memory reference identity, not contents).",
    level: "basic",
    codeExample: "int[] a = {1}; int[] b = {1};\nSystem.out.println(a == b); // false!"
  },
  {
    question: "How do you check Content Equality between two arrays in Java?",
    shortAnswer: "Using `java.util.Arrays.equals(a, b)` (or `Arrays.deepEquals()` for multidimensional arrays).",
    explanation: "Standard content comparison utility.",
    hint: "Arrays.equals(a, b).",
    level: "basic",
    codeExample: "boolean same = Arrays.equals(a, b); // true"
  },
  {
    question: "What is the ultimate takeaway of Module 001_006 Topic 1 for Java developers?",
    shortAnswer: "Stack memory holds lightweight reference variables; Heap memory dynamically holds contiguous array objects with JVM-guaranteed zero default initialization, enabling safe $O(1)$ memory arithmetic.",
    explanation: "Fundamental JVM memory understanding for high-performance Java coding.",
    hint: "Stack holds references; Heap holds contiguous zero-initialized array objects.",
    level: "basic",
    codeExample: "// Summary: Stack (reference) → Heap (16B header + contiguous zero-initialized slots)"
  },
  {
    question: "What is the next topic (Topic 2) in Module 001_006?",
    shortAnswer: "Array declaration styles: int[] arr vs int arr[] (preferred Java convention).",
    explanation: "Topic 2 explores declaration syntax, type-level dimension binding, and standard Java conventions.",
    hint: "Array declaration styles: int[] arr vs int arr[].",
    level: "basic",
    codeExample: "// Topic 2: Array Declaration Styles (int[] vs int arr[])"
  }
];

export default questions;
