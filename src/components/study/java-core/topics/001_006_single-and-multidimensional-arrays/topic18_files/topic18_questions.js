/**
 * Module 001_006: Topic 18: Deep copy vs Shallow copy of arrays
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the difference between a Shallow Copy and a Deep Copy of an array?",
    shortAnswer: "A Shallow Copy duplicates the array container but copies only the reference addresses of objects/inner rows (sharing heap objects); a Deep Copy duplicates the container AND recursively instantiates brand-new copies of every underlying object.",
    explanation: "Core definition of shallow vs deep copy in Java memory.",
    hint: "Shallow copies share inner object references; deep copies duplicate underlying objects independently.",
    level: "basic",
    codeExample: "// Shallow: shares objects | Deep: duplicates objects"
  },
  {
    question: "Why is `clone()` on a primitive 1D array (`int[]`, `double[]`) effectively a Deep Copy?",
    shortAnswer: "Because primitives are scalar values stored directly in the array payload slots without reference pointers; cloning copies the raw values into a new heap array.",
    explanation: "Primitive array cloning behavior.",
    hint: "Primitives have no reference pointers, so copying values provides complete isolation.",
    level: "basic",
    codeExample: "int[] a = {1, 2}; int[] b = a.clone(); b[0] = 99; // a[0] is still 1!"
  },
  {
    question: "What happens if you modify an object's field inside a SHALLOW copied array (`shallow[0].setName(\"New\")`)?",
    shortAnswer: "The original array's object at `original[0]` is ALSO modified because both arrays point to the exact same shared object instance in Heap memory.",
    explanation: "Classic shallow copy side-effect trap.",
    hint: "Both arrays point to the same shared Heap object, causing unexpected mutation.",
    level: "basic",
    codeExample: "Student[] shallow = orig.clone(); shallow[0].setFee(0); // orig[0] is modified!"
  },
  {
    question: "How do you perform a DEEP COPY of an object array `StudentAccount[]`?",
    shortAnswer: "Allocate a new array and instantiate a new `StudentAccount` object for each index using a Copy Constructor or Factory method: `deep[i] = new StudentAccount(orig[i]);`.",
    explanation: "Copy constructor deep copy pattern.",
    hint: "Instantiate a new object for each slot using new StudentAccount(orig[i]).",
    level: "basic",
    codeExample: "for (int i=0; i<orig.length; i++) deep[i] = new Student(orig[i]);"
  },
  {
    question: "How do you perform a DEEP COPY of a 2D matrix (`double[][] matrix`)?",
    shortAnswer: "Allocate an outer array of row pointers, then clone each 1D row independently in a loop: `deep[r] = matrix[r].clone();`.",
    explanation: "2D matrix deep copying idiom.",
    hint: "Loop through rows and clone each 1D row array: deep[r] = matrix[r].clone().",
    level: "basic",
    codeExample: "double[][] deep = new double[m.length][]; for (int r=0; r<m.length; r++) deep[r] = m[r].clone();"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee ledger, what happened when `shallowStudents[0].setBalance(99999.0)` was executed?",
    shortAnswer: "Swadeep's balance in `originalStudents[0]` was also corrupted to ₹99,999 because `clone()` performed a shallow copy in Indian Rupees (₹).",
    explanation: "Demonstrates the real-world impact of shallow copying.",
    hint: "Original student account balance was mutated due to shared object reference.",
    level: "basic",
    codeExample: "shallowStudents[0].setBalance(99999.0); // original mutated!"
  },
  {
    question: "Which of the following creates a Shallow Copy: `clone()`, `Arrays.copyOf()`, or `System.arraycopy()`?",
    shortAnswer: "ALL THREE create shallow copies for Object arrays and 2D arrays!",
    explanation: "Standard JDK copying methods are all shallow.",
    hint: "All three standard methods perform shallow copying.",
    level: "basic",
    codeExample: "// clone(), Arrays.copyOf(), System.arraycopy() are ALL shallow!"
  },
  {
    question: "What is a 'Copy Constructor' in Java?",
    shortAnswer: "A constructor that accepts another instance of the same class and initializes a new object with duplicate field values (e.g. `public Student(Student other)`).",
    explanation: "Standard Java deep copying mechanism.",
    hint: "A constructor taking another object of the same type to create an independent duplicate.",
    level: "basic",
    codeExample: "public Student(Student other) { this.name = other.name; this.fee = other.fee; }"
  },
  {
    question: "How does Java Serialization perform a deep copy of complex nested array structures?",
    shortAnswer: "By serializing the array object graph to a byte stream (`ByteArrayOutputStream`) and deserializing it back (`ByteArrayInputStream`), reconstructing independent heap objects.",
    explanation: "Serialization-based deep copying.",
    hint: "Serializes and deserializes the entire object graph to recreate fresh objects.",
    level: "advanced",
    codeExample: "// Serialization creates full deep copy at the cost of performance"
  },
  {
    question: "What is the Time and Space Complexity of a Deep Copy of an $R \\times C$ matrix?",
    shortAnswer: "Time Complexity: $O(R \\times C)$; Space Complexity: $O(R \\times C)$ (allocates full duplicate memory on the Heap).",
    explanation: "Deep copy complexity analysis.",
    hint: "O(R * C) time and O(R * C) auxiliary memory.",
    level: "basic",
    codeExample: "// O(R * C) time and memory"
  },
  {
    question: "Why are Immutable Objects (like `String`, `Integer`, `java.time.LocalDate`) immune to shallow copy bugs in arrays?",
    shortAnswer: "Because immutable objects cannot be modified after creation; since their internal state can never change, sharing references between arrays is 100% thread-safe and bug-free!",
    explanation: "Immutability solves aliasing bugs.",
    hint: "Immutable objects cannot be modified, making reference sharing completely safe.",
    level: "intermediate",
    codeExample: "String[] copy = origStrArr.clone(); // 100% safe because String is immutable!"
  },
  {
    question: "Can `Arrays.stream()` be used to deep copy an object array?",
    shortAnswer: "YES! `Arrays.stream(orig).map(Student::new).toArray(Student[]::new)` uses a constructor reference to create fresh objects.",
    explanation: "Functional deep copying with Streams.",
    hint: "map(CopyConstructor::new).toArray().",
    level: "intermediate",
    codeExample: "Student[] deep = Arrays.stream(orig).map(Student::new).toArray(Student[]::new);"
  },
  {
    question: "How do you deep copy a 3D array (`int[][][]`) in Java?",
    shortAnswer: "Use nested loops to allocate each dimension: `for (r) for (c) deep[r][c] = orig[r][c].clone();`.",
    explanation: "Hierarchical multidimensional deep copying.",
    hint: "Clone each 1D array at the innermost dimension.",
    level: "intermediate",
    codeExample: "for (int r=0; r<R; r++) for (int c=0; c<C; c++) deep[r][c] = orig[r][c].clone();"
  },
  {
    question: "What is 'Defensive Copying' in Effective Java Item 50?",
    shortAnswer: "Making deep/isolated copies of mutable arguments inside constructors and getter methods to prevent external code from mutating an object's private internal state.",
    explanation: "Joshua Bloch's defensive copying pattern.",
    hint: "Copying mutable arrays in constructors and getters to maintain class invariants.",
    level: "advanced",
    codeExample: "public int[] getFees() { return fees.clone(); }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee ledger, why did the deep copy prevent `originalStudents` from mutating when `deepStudents[0]` was modified?",
    shortAnswer: "Because `deepStudents[0]` pointed to an independent `StudentAccount` instance on the Heap created via the copy constructor in Indian Rupees (₹).",
    explanation: "Heap memory isolation demonstration.",
    hint: "Pointed to an independent heap object created by the copy constructor.",
    level: "basic",
    codeExample: "deepStudents[0] = new StudentAccount(originalStudents[0]);"
  },
  {
    question: "What happens if you deep copy a recursive / circular object graph without cycle detection?",
    shortAnswer: "A `StackOverflowError` occurs due to infinite recursive instantiation loops.",
    explanation: "Circular reference hazard in deep copying.",
    hint: "Causes infinite recursion and StackOverflowError unless an identity map is used.",
    level: "advanced",
    codeExample: "// Requires IdentityHashMap for cycle detection in complex object graphs"
  },
  {
    question: "What library tools provide high-speed deep cloning in enterprise Java?",
    shortAnswer: "Apache Commons Lang (`SerializationUtils.clone()`) or Kryo / Objenesis for reflection-based deep copying.",
    explanation: "Enterprise deep cloning libraries.",
    hint: "Apache Commons Lang SerializationUtils or Kryo.",
    level: "advanced",
    codeExample: "Student[] deep = SerializationUtils.clone(orig);"
  },
  {
    question: "What is the performance cost of a Deep Copy vs a Shallow Copy?",
    shortAnswer: "Deep copying requires allocating $N$ individual objects on the Heap ($N$ memory allocations and GC overhead), whereas a shallow copy requires only 1 array container allocation.",
    explanation: "Memory allocation and garbage collector trade-off.",
    hint: "Deep copy creates N heap objects; shallow copy allocates only 1 array container.",
    level: "intermediate",
    codeExample: "// Deep copy: N new object allocations | Shallow copy: 1 allocation"
  },
  {
    question: "How do you test if two 2D arrays are shallow aliases of each other?",
    shortAnswer: "Check if their row reference addresses are identical: `if (matrix1[0] == matrix2[0])`.",
    explanation: "Reference identity checking ($==$).",
    hint: "Compare row pointers using == (matrix1[0] == matrix2[0]).",
    level: "basic",
    codeExample: "boolean isShallow = (matrix1[0] == matrix2[0]);"
  },
  {
    question: "How do you test if two arrays have equal content values after a deep copy?",
    shortAnswer: "Use `Arrays.deepEquals(arr1, arr2)`.",
    explanation: "Deep recursive value comparison.",
    hint: "Arrays.deepEquals(arr1, arr2).",
    level: "basic",
    codeExample: "boolean sameValues = Arrays.deepEquals(matrix1, deepMatrix);"
  },
  {
    question: "Can Java Records be deep copied simply by cloning their array components?",
    shortAnswer: "YES! If a Record contains an array, construct a new Record with a cloned array component: `new StudentRecord(r.name(), r.scores().clone())`.",
    explanation: "Record immutable defensive copy pattern.",
    hint: "Clone the array component when constructing a new record.",
    level: "intermediate",
    codeExample: "StudentRecord copy = new StudentRecord(r.name(), r.fees().clone());"
  },
  {
    question: "What is 'Lazy Copy' (Copy-On-Write)?",
    shortAnswer: "Sharing shallow references initially and performing a deep copy only when an element is about to be mutated (used in `CopyOnWriteArrayList`).",
    explanation: "Copy-on-write optimization strategy.",
    hint: "Defers deep copy until a write/mutation operation actually occurs.",
    level: "advanced",
    codeExample: "// CopyOnWriteArrayList defers copying until modification"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, why is deep copying required when taking examination snapshots?",
    shortAnswer: "So that subsequent student score modifications or adjustments do not alter the officially submitted snapshot in Indian Rupees (₹).",
    explanation: "Audit snapshot integrity.",
    hint: "Ensures score revisions do not mutate the historical snapshot.",
    level: "basic",
    codeExample: "ExamResult[] snapshot = deepCopy(activeResults);"
  },
  {
    question: "Does `Arrays.copyOf()` deep copy nested 1D arrays in a 2D matrix?",
    shortAnswer: "NO! `Arrays.copyOf(matrix, matrix.length)` copies only the outer array of row pointers (shallow copy).",
    explanation: "Arrays.copyOf is shallow.",
    hint: "No, Arrays.copyOf is strictly shallow on multidimensional arrays.",
    level: "basic",
    codeExample: "double[][] copy = Arrays.copyOf(m, m.length); // Shallow!"
  },
  {
    question: "How can a Copy Factory Method replace a Copy Constructor for deep copying?",
    shortAnswer: "`public static StudentAccount copyOf(StudentAccount original) { return new StudentAccount(original.name, original.balance); }`.",
    explanation: "Static copy factory pattern.",
    hint: "Static factory method returning a fresh copy instance.",
    level: "basic",
    codeExample: "public static Student copyOf(Student s) { return new Student(s.name, s.fee); }"
  },
  {
    question: "What is the effect of deep copying an array of `null` references?",
    shortAnswer: "The deep copy simply assigns `null` to the corresponding slots in the new array without throwing exceptions.",
    explanation: "Null element deep copy safety.",
    hint: "Null slots remain null in the copy.",
    level: "basic",
    codeExample: "if (orig[i] != null) deep[i] = new Student(orig[i]); else deep[i] = null;"
  },
  {
    question: "Why is the `Object.clone()` method protected in `java.lang.Object`?",
    shortAnswer: "To force class authors to explicitly implement `Cloneable` and declare a `public clone()` method if they choose to support cloning.",
    explanation: "Java design history on cloning.",
    hint: "Forces classes to explicitly opt-in by implementing Cloneable.",
    level: "advanced",
    codeExample: "// Object.clone() is protected; arrays override it as public"
  },
  {
    question: "What is the ultimate takeaway of Module 001_006 Topic 18 for Java developers?",
    shortAnswer: "Standard copying tools (`clone()`, `copyOf()`, `arraycopy()`) perform SHALLOW copies on Object and 2D arrays; true DEEP copies require manual iteration to instantiate new objects or clone each row independently, ensuring complete memory isolation.",
    explanation: "Mastery of deep vs shallow copying in Java.",
    hint: "Standard tools are shallow on objects/2D arrays; deep copy requires manual row/object duplication.",
    level: "basic",
    codeExample: "// Summary: Shallow (shares objects) vs Deep (duplicates objects independently)"
  },
  {
    question: "What is the next and final topic (Topic 19) in Module 001_006?",
    shortAnswer: "The java.util.Arrays utility class: Arrays.toString(), Arrays.deepToString(), Arrays.sort(), Arrays.binarySearch(), Arrays.fill(), Arrays.equals().",
    explanation: "Topic 19 is the grand finale masterclass on the java.util.Arrays standard toolkit.",
    hint: "The java.util.Arrays utility class: Arrays.toString, deepToString, sort, binarySearch, fill, equals.",
    level: "basic",
    codeExample: "// Topic 19: The java.util.Arrays Masterclass Utility Suite"
  },
  {
    question: "Can Java 21 Virtual Threads cause concurrency issues if arrays are shallow copied across tasks?",
    shortAnswer: "YES! If virtual threads modify objects in a shallow copied array concurrently, race conditions and memory visibility bugs will occur without synchronization.",
    explanation: "Modern concurrency implications of shallow copies.",
    hint: "Yes, shared mutable objects across threads require deep copying or synchronization.",
    level: "advanced",
    codeExample: "// Use deep copying to pass isolated state across virtual threads"
  }
];

export default questions;
