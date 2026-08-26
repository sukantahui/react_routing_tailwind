/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 4: Memory Model: Reference Variables on Stack Pointing to Object Instances on Heap
 * High-Yield Technical Interview & Academic Q&A Catalog (30 Questions)
 * ============================================================================
 *
 * Educator: Sukanta Hui
 * Academic Centres: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 * ============================================================================
 */

const topic4_questions = [
  {
    question: "What is the key architectural difference between Stack Memory and Heap Memory in the JVM?",
    shortAnswer: "Stack memory is thread-private and holds method call frames/local variables with LIFO lifecycle; Heap memory is thread-shared and holds all objects and arrays managed by Garbage Collection.",
    explanation: "Each thread gets its own Stack containing frames for active method calls (storing primitives and reference handles). When a method returns, its frame is popped instantly. The Heap is a unified, shared memory pool where all object instances reside until garbage-collected.",
    hint: "Think about scope/lifecycle (LIFO vs dynamic allocation) and thread sharing.",
    level: "Beginner",
    codeExample: "int count = 10;                     // Primitive on Stack frame\nStudent s = new Student(\"Swadeep\"); // 's' is reference on Stack; Student data is on Heap"
  },
  {
    question: "Is Java pass-by-value or pass-by-reference?",
    shortAnswer: "Java is strictly PASS-BY-VALUE for everything, including object references.",
    explanation: "When you pass an object reference to a method, Java makes a copy of the reference pointer (the memory address value) and places it into the method's parameter slot on the new Stack frame. The address itself is copied by value.",
    hint: "The bits of the reference pointer are copied, not the object itself.",
    level: "Beginner",
    codeExample: "void modify(Student s) {\n    s.setName(\"Tuhina\"); // Mutates shared object on Heap\n    s = new Student(\"New\"); // Only reassigns local copied pointer on Stack!\n}"
  },
  {
    question: "What happens in memory when you assign one reference variable to another (e.g., 'Student b = a;')?",
    shortAnswer: "The memory address stored in 'a' on the Stack is copied into 'b' on the Stack, so both variables point to the same Heap object.",
    explanation: "Assigning reference variables performs a shallow pointer copy on the Stack. No new Heap object is allocated. Any modification made through variable 'b' immediately reflects when accessed via variable 'a'.",
    hint: "Two remote controls pointing to the exact same television.",
    level: "Beginner",
    codeExample: "Student a = new Student(\"Swadeep\");\nStudent b = a; // 'b' points to the same Heap instance as 'a'\nb.setMarks(95.0);\nSystem.out.println(a.getMarks()); // Prints 95.0"
  },
  {
    question: "What are the components of a Stack Frame in the JVM?",
    shortAnswer: "1. Local Variable Table (LVT), 2. Operand Stack, 3. Frame Data (constant pool resolution & exception dispatch).",
    explanation: "A Stack Frame is pushed onto the thread stack when a method is called. The LVT stores method arguments and local variables. The Operand Stack handles intermediate byte-code evaluation. Frame Data holds runtime constant pool references and exception handlers.",
    hint: "Every executing method receives one dedicated Stack Frame.",
    level: "Intermediate",
    codeExample: "// Bytecode frame stores: this (slot 0), int param (slot 1), double local (slot 2-3)"
  },
  {
    question: "What error is thrown when Stack memory overflows vs when Heap memory is exhausted?",
    shortAnswer: "Stack exhaustion causes java.lang.StackOverflowError; Heap exhaustion causes java.lang.OutOfMemoryError (OOM).",
    explanation: "StackOverflowError occurs when method call depth exceeds stack capacity (e.g. infinite recursion). OutOfMemoryError: Java heap space occurs when the JVM cannot allocate memory for new objects despite Garbage Collection.",
    hint: "One is depth-related (Stack); the other is capacity-related (Heap).",
    level: "Beginner",
    codeExample: "// StackOverflow: void infinite() { infinite(); }\n// OutOfMemory: List<byte[]> list = new ArrayList<>(); while(true) list.add(new byte[1000000]);"
  },
  {
    question: "Why is Stack memory allocation and deallocation significantly faster than Heap memory?",
    shortAnswer: "Stack operations only adjust the CPU Stack Pointer (LIFO); Heap operations require finding free memory blocks, handling fragmentation, and GC cycles.",
    explanation: "Stack allocation is a simple pointer decrement/increment on the CPU stack register (O(1)). Heap memory management involves concurrent thread synchronization, free-list searches, memory compaction, and background GC tracing.",
    hint: "Hardware stack pointer movement vs dynamic heap fragmentation management.",
    level: "Intermediate",
    codeExample: "// Method entry: Stack pointer adjusts in nanoseconds\n// Method exit: Stack pointer pops instantly with zero GC overhead"
  },
  {
    question: "Where are instance variables of primitive types stored in memory?",
    shortAnswer: "On the Heap, inside the memory block allocated for the enclosing object instance.",
    explanation: "Even though primitive variables declared inside methods reside on the Stack, primitive fields (instance variables like 'int rollNumber') declared inside a class live on the Heap as part of the object's contiguous payload.",
    hint: "Where an object lives, all its embedded instance fields live.",
    level: "Intermediate",
    codeExample: "class Student {\n    int roll = 101; // Resides on HEAP inside the Student object memory\n}"
  },
  {
    question: "Where are static variables stored in modern Java (Java 8+)?",
    shortAnswer: "In the JVM Heap, specifically associated with the Class object in Metaspace/Heap.",
    explanation: "Prior to Java 8, static variables lived in PermGen. In Java 8 and newer, PermGen was replaced with Metaspace (native memory for bytecode metadata), and static variables were moved directly into the Java Heap associated with the java.lang.Class object instance.",
    hint: "PermGen is gone; class metadata is in Metaspace, static variables are on Heap.",
    level: "Advanced",
    codeExample: "class Academy {\n    public static String branch = \"Barrackpore\"; // Stored on Heap with Academy.class object\n}"
  },
  {
    question: "What is a 'GC Root' in JVM Garbage Collection?",
    shortAnswer: "An active reference outside the Heap (such as local variables on Stack, JNI pointers, static references) from which reachability is traced.",
    explanation: "The JVM Garbage Collector determines whether an object is alive by tracing reference chains starting from GC Roots. If an object cannot be reached through any active reference chain starting from a GC Root, it is unreachable and candidate for collection.",
    hint: "The starting anchors of the object reachability graph.",
    level: "Advanced",
    codeExample: "// Active local reference 's' in main() is a GC Root:\nStudent s = new Student(\"Abhronila\");"
  },
  {
    question: "What happens to the Heap object when the method creating it returns, but does NOT return the reference?",
    shortAnswer: "The Stack Frame is popped, the reference is destroyed, and the Heap object becomes orphaned and eligible for Garbage Collection.",
    explanation: "If a method allocates an object on the Heap but neither returns it nor assigns it to an outer field, the only reference to it disappears when the method's Stack frame is popped. The object becomes unreachable immediately.",
    hint: "No reference paths remain from any active Stack frame.",
    level: "Intermediate",
    codeExample: "void generateReport() {\n    Student temp = new Student(\"Debangshu\"); // 'temp' on Stack\n    temp.print();\n} // 'temp' popped! Heap Student object is now eligible for GC"
  },
  {
    question: "How does the '==' operator behave on reference variables vs primitive variables?",
    shortAnswer: "'==' on primitives compares actual literal values; '==' on reference variables compares Heap memory addresses.",
    explanation: "For primitives (int, double, char), '==' evaluates whether the values are identical. For object reference variables, '==' checks whether both variables point to the exact same physical memory address in Heap (identity equality).",
    hint: "Value equality vs Address identity equality.",
    level: "Beginner",
    codeExample: "int a = 10, b = 10;\nSystem.out.println(a == b); // true (value)\nStudent s1 = new Student(\"Swadeep\");\nStudent s2 = new Student(\"Swadeep\");\nSystem.out.println(s1 == s2); // false (different Heap addresses)"
  },
  {
    question: "Can two different threads access the same object on the Heap?",
    shortAnswer: "Yes, Heap memory is shared across all threads, which is why synchronization is required for mutable state.",
    explanation: "While each thread has its own private Stack, any thread with a reference pointer to a Heap object can read and mutate its fields. Concurrent modifications by multiple threads without synchronization lead to race conditions.",
    hint: "Shared Heap is the foundation of multi-threaded shared-memory concurrency.",
    level: "Intermediate",
    codeExample: "// Thread 1 & Thread 2 can both hold reference to the same 'bankAccount' on Heap"
  },
  {
    question: "What is the difference between a Local Variable and an Instance Variable in terms of memory?",
    shortAnswer: "Local variables live on the Stack frame and have no default values; instance variables live on the Heap and receive default zero-initialization.",
    explanation: "Local variables are created when a method/block executes and destroyed on exit. They MUST be explicitly initialized before reading. Instance variables are created when 'new' is called on Heap and are automatically zero-initialized by the JVM.",
    hint: "Stack vs Heap, mandatory initialization vs automatic default values.",
    level: "Beginner",
    codeExample: "class Demo {\n    int instVar; // On Heap, initialized to 0\n    void test() {\n        int localVar; // On Stack, uninitialized! Compilation error if read without assignment\n    }\n}"
  },
  {
    question: "What is the Young Generation vs Old (Tenured) Generation in the JVM Heap?",
    shortAnswer: "Young Gen (Eden + S0 + S1) holds newly allocated, short-lived objects; Old Gen holds long-lived objects that survived multiple GC cycles.",
    explanation: "HotSpot Heap is partitioned based on the 'Weak Generational Hypothesis' (most objects die young). New objects are born in Eden. Survivors of Minor GCs move between Survivor spaces (S0/S1) and are eventually tenured/promoted to Old Generation after reaching a tenuring threshold.",
    hint: "Eden -> Survivor S0/S1 -> Old Generation.",
    level: "Advanced",
    codeExample: "// Minor GC collects dead Eden objects in milliseconds without scanning Old Gen"
  },
  {
    question: "What is an 'orphaned object' in the JVM Heap?",
    shortAnswer: "An allocated object on the Heap that no longer has any active references pointing to it.",
    explanation: "When reference variables pointing to an object are reassigned, set to null, or go out of scope, the object becomes orphaned. It occupies Heap memory until the Garbage Collector sweeps it.",
    hint: "An unreachable island in Heap memory.",
    level: "Beginner",
    codeExample: "Student s = new Student(\"Tuhina\");\ns = null; // The Student(\"Tuhina\") object is now orphaned on Heap"
  },
  {
    question: "What does 'Compressed OOPs' mean in the context of 64-bit JVM reference pointers?",
    shortAnswer: "It allows 64-bit JVMs to store Heap object references in 32 bits by utilizing 8-byte object alignment.",
    explanation: "Since objects are aligned to 8-byte boundaries, the last 3 bits of every object address are 000. HotSpot shifts 32-bit pointers by 3 bits to address up to 32 GB of Heap, reducing pointer memory footprint on Stack and Heap from 8 bytes to 4 bytes.",
    hint: "Enables 32-bit pointer speed and compactness on 64-bit JVM architectures.",
    level: "Advanced",
    codeExample: "// With -XX:+UseCompressedOops (default on <32GB heaps), references occupy 4 bytes"
  },
  {
    question: "Why does reassigning a method parameter inside a method not affect the caller's variable?",
    shortAnswer: "Because the parameter is a local copy of the reference address on the callee's Stack frame.",
    explanation: "When method 'foo(Student param)' is called, 'param' is a separate slot on foo's Stack frame containing a copy of the caller's address. Changing 'param = new Student()' only updates foo's local slot, leaving the caller's Stack slot untouched.",
    hint: "Local variable reassignment never escapes the local Stack Frame.",
    level: "Intermediate",
    codeExample: "void reassign(Student s) {\n    s = new Student(\"Abhronila\"); // Caller's variable is NOT changed!\n}"
  },
  {
    question: "What is Scalar Replacement in JVM JIT Compilation?",
    shortAnswer: "An optimization where the JIT compiler decomposes an unescaped object into its individual primitive fields on the Stack/registers.",
    explanation: "If Escape Analysis proves an object never leaves a method, the JIT avoids Heap allocation altogether by representing the object's fields as simple local variables in CPU registers or Stack slots, eliminating GC overhead.",
    hint: "Deconstructing an object into scalar primitives on the Stack.",
    level: "Advanced",
    codeExample: "// JIT turns 'Point p = new Point(10, 20); int sum = p.x + p.y;' into 'int x = 10, y = 20; int sum = x + y;'"
  },
  {
    question: "What is the memory size of a reference variable on a 64-bit JVM without Compressed OOPs?",
    shortAnswer: "8 bytes (64 bits).",
    explanation: "Without pointer compression, every reference variable on the Stack or in object fields requires a full 64-bit (8-byte) native pointer to address modern large memory spaces.",
    hint: "Native 64-bit architecture address bus width.",
    level: "Intermediate",
    codeExample: "// Size of reference variable on Stack = 8 bytes (or 4 bytes if compressed)"
  },
  {
    question: "How does the JVM handle memory when an array of objects is created (e.g., 'Student[] arr = new Student[5];')?",
    shortAnswer: "It allocates one array object on the Heap containing 5 null reference pointers; no Student instances are created yet.",
    explanation: "'new Student[5]' allocates memory for an array object with 5 slots, each initialized to default 'null'. You must instantiate individual Student objects ('arr[0] = new Student(...)') separately.",
    hint: "An array of references is just a container of pointers.",
    level: "Beginner",
    codeExample: "Student[] batch = new Student[3]; // batch on Heap holds [null, null, null]\nbatch[0] = new Student(\"Swadeep\"); // Now slot 0 points to Student instance"
  },
  {
    question: "What is the effect of the 'final' keyword on a reference variable?",
    shortAnswer: "The reference variable cannot be reassigned to point to another Heap address, but the internal state of the object it points to can still be mutated.",
    explanation: "A 'final' reference variable freezes the pointer value on the Stack frame. You cannot execute 'ref = new Student()', but you CAN invoke mutating methods like 'ref.setName(\"Tuhina\")' unless the object itself is immutable.",
    hint: "Final reference != Immutable object.",
    level: "Intermediate",
    codeExample: "final Student s = new Student(\"Swadeep\");\ns.setMarks(98.0); // Allowed: modifying Heap object state\n// s = new Student(\"Debangshu\"); // Compile Error: cannot reassign final reference"
  },
  {
    question: "What is Memory Leak in Java despite having an automatic Garbage Collector?",
    shortAnswer: "When unused objects remain reachable from active GC Roots (e.g., uncleaned static collections, unclosed listeners), preventing GC reclamation.",
    explanation: "Java GC can only collect unreachable objects. If an application holds unused object references in static maps, event registries, or thread locals, the JVM assumes they are still needed, resulting in gradual Heap exhaustion and eventual OutOfMemoryError.",
    hint: "Unintentional retention of references prevents garbage collection.",
    level: "Intermediate",
    codeExample: "class Cache {\n    private static List<Student> history = new ArrayList<>(); // Grows forever, never cleared!\n}"
  },
  {
    question: "Can an object in Java be allocated partially on Stack and partially on Heap?",
    shortAnswer: "No, a single Java object instance is always stored contiguously on the Heap (unless Scalar Replacement completely decomposes it).",
    explanation: "Java objects maintain strict contiguous layout in Heap memory with their Object Header, primitive fields, and reference pointers in a single allocated chunk.",
    hint: "Atomic contiguous memory chunk on the Heap.",
    level: "Intermediate",
    codeExample: "// The entire Student object (header + fields) is contiguous in Heap memory"
  },
  {
    question: "What is the Metaspace in Java 8+ and how does it relate to Stack and Heap?",
    shortAnswer: "Metaspace is native off-heap memory that stores class metadata, bytecode, method tables, and constant pools.",
    explanation: "In Java 8+, class metadata was moved from PermGen (Heap) to Metaspace (out-of-heap native memory). Metaspace auto-resizes based on OS memory availability unless constrained with -XX:MaxMetaspaceSize.",
    hint: "Native OS memory for class definitions, separate from JVM Heap.",
    level: "Advanced",
    codeExample: "// Class metadata in Metaspace -> Object instances on Heap -> References on Stack"
  },
  {
    question: "What happens when a reference variable goes out of block scope (e.g. inside an 'if' or 'for' block)?",
    shortAnswer: "Its slot on the Stack Frame becomes inactive or eligible for reuse by other local variables.",
    explanation: "The JVM local variable table reuses slots for variables with non-overlapping scopes. Once a variable goes out of scope, its reference is no longer a valid GC Root, making unreferenced Heap objects eligible for collection.",
    hint: "Stack slot recycling during method execution.",
    level: "Intermediate",
    codeExample: "{\n    Student temp = new Student(\"Swadeep\");\n    temp.print();\n} // 'temp' goes out of scope; slot can be recycled by JVM"
  },
  {
    question: "How do primitive wrappers like Integer and Double behave in Stack vs Heap?",
    shortAnswer: "Primitive wrapper variables on the Stack hold references pointing to wrapper objects on the Heap (or in Integer cache).",
    explanation: "While primitive 'int x = 10' stores 10 directly on the Stack, 'Integer x = 10' causes autoboxing, allocating an Integer object on the Heap (or referencing the -128 to 127 cached Integer instance).",
    hint: "Primitives are raw values on Stack; Wrappers are objects on Heap.",
    level: "Beginner",
    codeExample: "int p = 500;        // 4 bytes direct on Stack\nInteger w = 500;    // Reference on Stack -> Integer object on Heap (16-24 bytes)"
  },
  {
    question: "Why does returning an object from a method not destroy it when the method's Stack Frame is popped?",
    shortAnswer: "Because the object lives on the Heap, and its reference address is copied to the caller's Stack Frame before pop.",
    explanation: "Heap memory exists independently of Stack frame lifecycles. When a method returns an object, the reference pointer is placed in the return register/operand stack and assigned to the caller's variable before the frame is popped.",
    hint: "Stack frames die; Heap objects survive as long as a reference is maintained.",
    level: "Intermediate",
    codeExample: "Student createStudent() {\n    return new Student(\"Tuhina\"); // Created on Heap, pointer returned to caller\n}"
  },
  {
    question: "What is 'Escape' in the context of method execution?",
    shortAnswer: "An object escapes when its reference is made accessible outside the creating method (returned, stored in a field, passed across threads).",
    explanation: "Escape Analysis classifies object lifetimes into GlobalEscape (accessible anywhere), ArgEscape (passed as parameter but not stored), and NoEscape (strictly contained inside the method). NoEscape objects are candidates for Stack scalar replacement.",
    hint: "Visibility boundary of an object pointer.",
    level: "Advanced",
    codeExample: "// NoEscape:\nvoid helper() { Student s = new Student(); s.calc(); }\n// GlobalEscape:\nStudent helper() { return new Student(); }"
  },
  {
    question: "What is the primary difference between Stack memory sizing (-Xss) and Heap memory sizing (-Xmx)?",
    shortAnswer: "-Xss configures the stack size per individual thread; -Xmx configures the maximum total heap size for the entire JVM process.",
    explanation: "-Xss1m assigns 1 MB of stack memory to every created thread. -Xmx4g sets the upper limit of the shared JVM Heap to 4 Gigabytes. High -Xss allows deeper recursion but reduces total thread capacity.",
    hint: "Per-thread stack depth vs global heap capacity.",
    level: "Intermediate",
    codeExample: "java -Xms2g -Xmx4g -Xss512k -jar academy-app.jar"
  },
  {
    question: "What is Sukanta Hui's Core Architectural Rule regarding Stack and Heap memory visualization?",
    shortAnswer: "Always visualize the Stack as the active execution trajectory of verbs, and the Heap as the persistent reservoir of nouns (entities).",
    explanation: "At the Barrackpore academy, Sukanta Hui teaches that methods, computations, and transient pointers live on the rapid, fleeting Stack (the 'verbs' of the program), while objects, domain models, and business state reside securely on the managed Heap (the 'nouns' of the program).",
    hint: "Stack is the flow of action; Heap is the ground of existence.",
    level: "Beginner",
    codeExample: "// Stack (Verb/Action): calculateFinalScore(studentRef)\n// Heap (Noun/Entity): StudentRecord { name: \"Abhronila\", marks: 98.5 }"
  }
];

export default topic4_questions;
