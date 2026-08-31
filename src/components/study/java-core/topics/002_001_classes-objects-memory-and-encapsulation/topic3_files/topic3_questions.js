/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 3: Object Instantiation using the 'new' Keyword
 * High-Yield Technical Interview & Academic Q&A Catalog (30 Questions)
 * ============================================================================
 *
 * Educator: Sukanta Hui
 * Academic Centres: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 * ============================================================================
 */

const topic3_questions = [
  {
    question: "What is the primary role of the 'new' keyword in Java?",
    shortAnswer: "It dynamically allocates memory on the JVM Heap for an object instance and triggers constructor initialization.",
    explanation: "The 'new' keyword is an operator in Java responsible for requesting Heap memory from the JVM, zero-initializing instance fields, triggering constructor execution (<init> method), and returning the 32/64-bit reference address of the newly allocated object to the caller.",
    hint: "Think about where objects live in memory (Heap) and how their lifecycle begins.",
    level: "Beginner",
    codeExample: "CourseEnrollment student = new CourseEnrollment(101, \"Swadeep Paul\", \"Java\", 6500.0);"
  },
  {
    question: "What are the 5 sequential phases that occur when 'new ClassName()' is executed?",
    shortAnswer: "1. Class loading/verification, 2. Heap memory allocation, 3. Default zero-initialization, 4. Explicit initializers & instance blocks, 5. Constructor execution.",
    explanation: "If the class is not yet loaded, the JVM ClassLoader loads it into Metaspace. Then the JVM allocates Heap bytes for object header + fields, zero-fills fields (0, null, false), executes explicit field initializers and instance initializer blocks in order, and finally executes the constructor body (<init>).",
    hint: "Trace from disk loading down to constructor execution.",
    level: "Intermediate",
    codeExample: "// Bytecode invokes 'new', 'dup', and 'invokespecial <init>'\nCourseEnrollment s = new CourseEnrollment(102, \"Tuhina Das\", \"Spring\", 8500.0);"
  },
  {
    question: "What does the 'new' operator actually return in Java?",
    shortAnswer: "A reference (memory address pointer) to the allocated object on the Heap, not the object itself.",
    explanation: "In Java, object variables do not hold the object's composite data. Instead, 'new' returns a 32-bit or 64-bit reference value (an address in the Heap) which is stored in the reference variable on the Thread's execution Stack frame.",
    hint: "Variables on the Stack hold pointers, while the actual object state lives in Heap memory.",
    level: "Beginner",
    codeExample: "CourseEnrollment ref = new CourseEnrollment(...);\n// 'ref' stores 0x7FFF1234 (Heap address), not the raw fields."
  },
  {
    question: "What is the structure of an Object Header in JVM HotSpot memory?",
    shortAnswer: "Mark Word (metadata, lock state, GC age, hash) + Klass Word (pointer to Metaspace class metadata).",
    explanation: "In HotSpot 64-bit JVM, the object header typically consists of an 8-byte Mark Word (storing hashcode, GC age, locking flags, biased locking thread ID) and a Klass Word (4 bytes with Compressed OOPs or 8 bytes without) pointing to the class metadata in Metaspace.",
    hint: "Every object has overhead bytes before its actual fields begin.",
    level: "Advanced",
    codeExample: "// Object layout in memory:\n// [Mark Word: 8 bytes] [Klass Word: 4/8 bytes] [Instance Fields] [Alignment Padding]"
  },
  {
    question: "Can an object exist in Java without using the 'new' keyword?",
    shortAnswer: "Yes, via reflection (newInstance), deserialization, clone(), Unsafe, or string literals.",
    explanation: "While 'new' is the standard way, objects can also be instantiated via Reflection (Constructor.newInstance()), Object Deserialization (ObjectInputStream.readObject()), the clone() method, sun.misc.Unsafe.allocateInstance(), or String literal pooling by the JVM.",
    hint: "Think about frameworks, serialization, and prototype copying.",
    level: "Intermediate",
    codeExample: "// Reflection instantiation:\nCourseEnrollment c = CourseEnrollment.class.getDeclaredConstructor().newInstance();"
  },
  {
    question: "What happens if JVM Heap memory is completely exhausted when 'new' is called?",
    shortAnswer: "The JVM triggers Garbage Collection, and if still insufficient, throws java.lang.OutOfMemoryError (OOM).",
    explanation: "When Heap allocation fails, the JVM initiates a synchronous Stop-the-World Garbage Collection to reclaim dead objects. If available contiguous space is still insufficient to satisfy the allocation request, the JVM throws an OutOfMemoryError: Java heap space.",
    hint: "It is an Error, not an Exception, representing fatal resource exhaustion.",
    level: "Intermediate",
    codeExample: "try {\n    byte[] hugeArray = new byte[Integer.MAX_VALUE - 2];\n} catch (OutOfMemoryError e) {\n    System.err.println(\"Heap exhausted: \" + e.getMessage());\n}"
  },
  {
    question: "What is default zero-initialization during object instantiation?",
    shortAnswer: "The JVM sets all primitive fields to zero/false and reference fields to null before any user code runs.",
    explanation: "During Phase 3 of instantiation, right after memory allocation, the memory page is wiped. Numeric primitives become 0 (or 0.0), booleans become false, chars become '\\u0000', and all object reference variables become null.",
    hint: "This prevents reading uninitialized garbage memory, ensuring type safety.",
    level: "Beginner",
    codeExample: "class Student {\n    int age;         // 0\n    boolean isPaid;  // false\n    String name;     // null\n}"
  },
  {
    question: "In what order do static blocks, instance blocks, and constructors execute when creating the first instance?",
    shortAnswer: "1. Static blocks (once) → 2. Instance initializers/fields → 3. Constructor body.",
    explanation: "When the first object of a class is created, static initializers and static fields execute first during class loading. Then, for each instance created, instance field initializers and instance blocks execute in textual order, followed immediately by the constructor body.",
    hint: "Static belongs to the Class; instance blocks belong to each individual Object.",
    level: "Intermediate",
    codeExample: "class Demo {\n    static { System.out.println(\"1. Static\"); }\n    { System.out.println(\"2. Instance\"); }\n    Demo() { System.out.println(\"3. Constructor\"); }\n}"
  },
  {
    question: "What is an 'anonymous object' in Java?",
    shortAnswer: "An object created using 'new' without storing its reference in a named variable.",
    explanation: "An anonymous object is instantiated purely to invoke a single method or pass as an immediate method argument. Because no named reference variable keeps it reachable on the Stack, it becomes eligible for Garbage Collection right after the invoking statement completes.",
    hint: "Fire-and-forget object instantiation.",
    level: "Beginner",
    codeExample: "new CourseEnrollment(104, \"Debangshu\", \"Python\", 6000.0).displayEnrollmentCard();"
  },
  {
    question: "What are the 3 key bytecode instructions generated by javac for 'new CourseEnrollment()'?",
    shortAnswer: "'new', 'dup', and 'invokespecial <init>'.",
    explanation: "1. 'new #index' allocates uninitialized Heap memory and pushes the reference onto the operand stack. 2. 'dup' duplicates that reference on the stack (one for <init>, one to assign to the variable). 3. 'invokespecial' invokes the <init> constructor to initialize the object.",
    hint: "Check Java disassembler (javap -c) output.",
    level: "Advanced",
    codeExample: "// javap -c snippet:\n// 0: new           #2 // class CourseEnrollment\n// 3: dup\n// 4: invokespecial #3 // Method <init>:()V\n// 7: astore_1"
  },
  {
    question: "What is Memory Alignment/Padding in the JVM Object Layout?",
    shortAnswer: "Adding padding bytes so that total object size is always an exact multiple of 8 bytes.",
    explanation: "64-bit CPUs fetch data from memory most efficiently in 64-bit (8-byte) words. HotSpot JVM enforces 8-byte address alignment. If an object's header + fields total 21 bytes, the JVM adds 3 bytes of padding to round it up to 24 bytes.",
    hint: "Hardware architecture optimization for 64-bit bus alignment.",
    level: "Advanced",
    codeExample: "// Header (12B) + int id (4B) + boolean (1B) = 17 bytes\n// JVM adds 7 bytes padding → Total 24 bytes."
  },
  {
    question: "Does the declaration 'CourseEnrollment swadeep;' allocate memory for an object on the Heap?",
    shortAnswer: "No. It only allocates 4 or 8 bytes on the Stack for a reference variable, initialized to null or unassigned.",
    explanation: "Variable declaration alone reserves a slot in the Stack frame's local variable table. No Heap memory is allocated, and no constructor is called until the 'new' keyword is evaluated.",
    hint: "Declaration is a Stack slot; instantiation is Heap allocation.",
    level: "Beginner",
    codeExample: "CourseEnrollment swadeep; // Only Stack slot created. swadeep == null\nswadeep = new CourseEnrollment(...); // Heap memory allocated now!"
  },
  {
    question: "Can 'new' be used with abstract classes or interfaces?",
    shortAnswer: "No, abstract classes and interfaces cannot be instantiated directly with 'new'.",
    explanation: "Attempting 'new AbstractClass()' or 'new InterfaceName()' triggers a compile-time error ('is abstract; cannot be instantiated'). However, 'new' can be used with an anonymous inner class syntax that implements all abstract methods on the fly.",
    hint: "Incomplete contracts cannot be turned into standalone objects.",
    level: "Beginner",
    codeExample: "// Compile Error: List list = new List();\n// Valid: List<String> list = new ArrayList<>();"
  },
  {
    question: "What is the difference between 'new String(\"Barrackpore\")' and '\"Barrackpore\"'?",
    shortAnswer: "'new String()' always creates a distinct object in Heap; string literal uses the String Constant Pool.",
    explanation: "A string literal '\"Barrackpore\"' is stored in the String Constant Pool (inside Heap) and reused. Using 'new String(\"Barrackpore\")' forces the JVM to allocate a brand new String object on the standard Heap outside the pool, referencing the pooled char array.",
    hint: "Literal enables caching/interning; 'new' forces a distinct Heap allocation.",
    level: "Intermediate",
    codeExample: "String s1 = \"Barrackpore\";\nString s2 = \"Barrackpore\";      // s1 == s2 is true\nString s3 = new String(\"Barrackpore\"); // s1 == s3 is false"
  },
  {
    question: "What role does the 'super()' statement play during object instantiation?",
    shortAnswer: "It initializes the parent class state before the subclass constructor executes its own body.",
    explanation: "Every constructor in Java (except java.lang.Object) must invoke its parent class constructor as its first statement (either explicitly or via compiler-inserted default super()). This ensures parent fields and invariants are established from top of inheritance down to the child.",
    hint: "Inherited state must be initialized before child specializations.",
    level: "Intermediate",
    codeExample: "class Student extends Person {\n    Student(String name) {\n        super(name); // Person state initialized first\n    }\n}"
  },
  {
    question: "What happens if a constructor throws an unhandled RuntimeException during 'new' execution?",
    shortAnswer: "Object creation fails, no reference is assigned, and partially created state becomes eligible for GC.",
    explanation: "If an exception is thrown inside the constructor, the assignment to the reference variable is aborted. The partially initialized memory on the Heap becomes orphaned and will be reclaimed during future Garbage Collection cycles.",
    hint: "Atomicity of reference assignment: assignment only happens if constructor finishes cleanly.",
    level: "Intermediate",
    codeExample: "CourseEnrollment s = null;\ntry {\n    s = new CourseEnrollment(-5, \"Tuhina\", \"Java\", 5000.0); // Throws IllegalArgumentException\n} catch (Exception e) {\n    // 's' remains null!\n}"
  },
  {
    question: "What is 'Escape Analysis' and can the JIT compiler eliminate 'new' Heap allocation?",
    shortAnswer: "Yes. JIT uses Escape Analysis to allocate non-escaping objects on the Stack instead of the Heap (Scalar Replacement).",
    explanation: "If the JIT compiler determines that an object created with 'new' does not escape the current method (never returned, not stored in a static/instance field, not passed across threads), it can perform Scalar Replacement, breaking the object into primitive local variables on the Stack, avoiding Heap GC overhead.",
    hint: "High-performance JVM optimization for local short-lived objects.",
    level: "Advanced",
    codeExample: "void calculate() {\n    Point p = new Point(10, 20); // If 'p' never escapes, JIT allocates on Stack!\n    int sum = p.x + p.y;\n}"
  },
  {
    question: "Why should we avoid allowing the 'this' reference to escape during constructor execution?",
    shortAnswer: "Because other threads or callbacks might observe an incompletely constructed object in inconsistent state.",
    explanation: "If a constructor passes 'this' to an event listener, static registry, or starts a Thread in its body, another thread can access fields before the constructor finishes assigning default/validated values, violating thread-safety and object invariants.",
    hint: "Never publish 'this' before the closing brace of the constructor.",
    level: "Advanced",
    codeExample: "// UNSAFE Constructor:\nclass EventSource {\n    public EventSource(EventListener listener) {\n        listener.register(this); // BAD: 'this' escapes before construction finishes!\n    }\n}"
  },
  {
    question: "What is Compressed OOPs (Compressed Ordinary Object Pointers) in 64-bit JVMs?",
    shortAnswer: "A JVM feature that compresses 64-bit pointers down to 32 bits on heaps up to 32 GB.",
    explanation: "On 64-bit JVMs with heaps < 32 GB, HotSpot uses 3-bit shifted 32-bit integer offsets (since objects are 8-byte aligned, the lowest 3 bits are always 0). This cuts reference size from 8 bytes to 4 bytes, saving up to 40% memory cache footprint.",
    hint: "-XX:+UseCompressedOops is enabled by default on 64-bit Java.",
    level: "Advanced",
    codeExample: "// 64-bit reference uncompressed: 8 bytes\n// 64-bit reference with Compressed OOPs: 4 bytes"
  },
  {
    question: "What is the difference between 'System.identityHashCode(obj)' and 'obj.hashCode()'?",
    shortAnswer: "identityHashCode returns the default JVM-assigned memory hash regardless of method overrides; hashCode() can be overridden.",
    explanation: "System.identityHashCode(obj) computes the default hash code generated from the object's original identity (stored in the Mark Word). In contrast, obj.hashCode() calls whatever overridden logic the class developer defined.",
    hint: "Use identityHashCode when you want pure reference identity.",
    level: "Intermediate",
    codeExample: "CourseEnrollment c = new CourseEnrollment(...);\nSystem.out.println(System.identityHashCode(c)); // Raw JVM identity hash\nSystem.out.println(c.hashCode());              // Class-defined hash code"
  },
  {
    question: "Can you invoke a method on an object directly after 'new' without saving it in a variable?",
    shortAnswer: "Yes, this creates an anonymous object and immediately invokes the method.",
    explanation: "Syntax such as 'new Scanner(System.in).nextLine()' or 'new CourseEnrollment(...).displayEnrollmentCard()' is completely valid. The object is created, the method is invoked, and the object reference is discarded.",
    hint: "Chaining method call immediately on the instantiation expression.",
    level: "Beginner",
    codeExample: "new CourseEnrollment(105, \"Abhronila\", \"DSA\", 7500.0).displayEnrollmentCard();"
  },
  {
    question: "What is the difference between shallow copy and creating a new object via 'new'?",
    shortAnswer: "Shallow copy shares nested object references; creating with 'new' allocates independent instances.",
    explanation: "A shallow copy duplicates primitive fields and copies reference addresses (meaning both outer objects share the same internal nested objects). Instantiating deeply with 'new' allocates brand new distinct internal objects.",
    hint: "Beware of shared mutable references in cloned structures.",
    level: "Intermediate",
    codeExample: "// Deep copy instantiates new internal objects with 'new':\nStudent copy = new Student(original.getName(), new Address(original.getAddress()));"
  },
  {
    question: "Why does Java not support stack allocation for objects directly like C++ does?",
    shortAnswer: "Java guarantees memory safety, automatic garbage collection, and unified reference semantics via Heap allocation.",
    explanation: "In C++, objects can be declared directly on the stack (`Student s;`), causing dangling pointer bugs if a pointer escapes the stack frame. Java eliminates manual memory corruption by forcing dynamic allocations onto the managed Heap, leaving Stack optimization to the JIT compiler (Escape Analysis).",
    hint: "Safety and garbage collection manageability over manual memory risks.",
    level: "Intermediate",
    codeExample: "// C++ (Stack): Student s; // destroyed on scope exit\n// Java: Student s = new Student(); // managed on Heap by JVM GC"
  },
  {
    question: "What is the TLAB (Thread-Local Allocation Buffer) in JVM Heap?",
    shortAnswer: "A private memory region in Eden space allocated to each thread to allow lock-free 'new' instantiations.",
    explanation: "To prevent multi-threaded lock contention when thousands of threads allocate objects simultaneously, the JVM gives each thread a small chunk of Eden space called a TLAB. 'new' allocations within the TLAB require only updating a thread-local pointer (bump-the-pointer) with zero synchronization locks.",
    hint: "Massive performance optimization for multi-threaded object allocation.",
    level: "Advanced",
    codeExample: "// TLAB enables ultra-fast O(1) lock-free allocation for 'new Object()'"
  },
  {
    question: "Does 'new' call a static method or an instance method when executing the constructor?",
    shortAnswer: "It executes a special instance initialization method named '<init>' via the 'invokespecial' bytecode.",
    explanation: "In JVM bytecode, constructors do not exist as standard methods. The javac compiler translates every constructor into a private instance method named '<init>'. The 'new' operator prepares the memory and then 'invokespecial' runs '<init>' on that uninitialized memory block.",
    hint: "<init> is instance initialization; <clinit> is static class initialization.",
    level: "Advanced",
    codeExample: "// Bytecode: invokespecial #1 // Method <init>:(ILjava/lang/String;)V"
  },
  {
    question: "Can a constructor have a return type like 'void' or 'CourseEnrollment'?",
    shortAnswer: "No. If you specify a return type, Java treats it as a regular instance method, not a constructor.",
    explanation: "Constructors must have the exact same name as the class and must NOT declare any return type (not even void). If you write 'public void Student()', the compiler interprets it as a normal method named Student, which won't be called by 'new Student()'.",
    hint: "Adding 'void' silently turns your constructor into a ordinary method.",
    level: "Beginner",
    codeExample: "class Student {\n    public void Student() {} // WARNING: Normal method, NOT a constructor!\n    public Student() {}      // Valid constructor\n}"
  },
  {
    question: "What is the lifecycle of an object created via 'new' from creation to reclamation?",
    shortAnswer: "1. Created & Initialized → 2. In Use (Reachable) → 3. Unreachable → 4. Finalized (deprecated) → 5. Reclaimed by GC.",
    explanation: "An object is born when 'new' allocates it. It remains in-use as long as a GC Root holds a reference. When all references are cleared (nullified or out of scope), it enters the unreachable state and the Garbage Collector reclaims its Heap space during minor/major GC.",
    hint: "Root reachability determines when JVM Garbage Collector recycles the bytes.",
    level: "Intermediate",
    codeExample: "CourseEnrollment s = new CourseEnrollment(...); // Created & In Use\ns = null; // Unreachable → GC Reclaims memory"
  },
  {
    question: "What is the danger of repeatedly creating large numbers of short-lived objects in a tight loop?",
    shortAnswer: "High GC pressure, Eden space churn, frequent minor GC pauses, and CPU overhead.",
    explanation: "Creating millions of temporary objects inside loops fills Eden space rapidly, triggering frequent Minor Garbage Collections. While modern JVMs optimize short-lived allocations, excessive churn reduces throughput and causes latency spikes.",
    hint: "Object pooling or reusing mutable builders/buffers can alleviate GC pressure.",
    level: "Intermediate",
    codeExample: "// Inefficient:\nfor (int i = 0; i < 1_000_000; i++) {\n    String s = new String(\"Item: \" + i); // 1M objects created\n}\n// Better: StringBuilder or primitive structures"
  },
  {
    question: "How does the 'new' keyword handle multidimensional arrays like 'int[][] matrix = new int[3][4]'?",
    shortAnswer: "It allocates an array of array references in the Heap, where each row is a separate 1D array object.",
    explanation: "In Java, multidimensional arrays are 'arrays of arrays'. 'new int[3][4]' creates 1 parent array holding 3 reference pointers, and 3 distinct child array objects of size 4 on the Heap.",
    hint: "Java arrays are non-contiguous in multidimensional layouts (ragged array support).",
    level: "Intermediate",
    codeExample: "int[][] matrix = new int[3][4]; // 4 distinct array objects allocated on Heap!"
  },
  {
    question: "What is the Golden Rule of Object Creation taught by Sukanta Hui at the Barrackpore Academy?",
    shortAnswer: "Construct valid, fully initialized objects with guaranteed invariants from the moment 'new' returns.",
    explanation: "Never allow an object to escape constructor initialization in a half-baked, invalid, or corrupted state. Every constructor called by 'new' must validate arguments, assign immutable baselines, and guarantee domain invariants before handing the reference to the caller.",
    hint: "Invariants must be established at birth so that all downstream methods can trust object state.",
    level: "Beginner",
    codeExample: "// Sukanta Hui's Invariant Pattern:\npublic CourseEnrollment(int id, String name, double fee) {\n    if (id <= 0 || name == null || fee < 0) throw new IllegalArgumentException(\"Invalid enrollment state!\");\n    this.id = id; this.name = name; this.fee = fee;\n}"
  }
];

export default topic3_questions;
