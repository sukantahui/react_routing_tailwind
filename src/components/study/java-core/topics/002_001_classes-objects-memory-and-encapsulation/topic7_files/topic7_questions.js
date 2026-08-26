/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 7: Instance Variables: Default Initialization Values & Object Lifecycle
 * High-Yield Technical Interview & Academic Q&A Catalog (30 Questions)
 * ============================================================================
 *
 * Educator: Sukanta Hui
 * Academic Centres: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 * ============================================================================
 */

const topic7_questions = [
  {
    question: "What is an Instance Variable in Java and where is it stored in memory?",
    shortAnswer: "A non-static field declared inside a class but outside methods; it is stored inside the object instance on the JVM Heap.",
    explanation: "Every object instantiated via 'new' receives its own dedicated copy of all instance variables. They live on the Heap as part of the contiguous object payload and survive as long as the object remains reachable.",
    hint: "Non-static class-level field stored within Heap memory.",
    level: "Beginner",
    codeExample: "class Student {\n    int roll;      // Instance variable on Heap\n    String name;   // Instance variable (reference) on Heap\n}"
  },
  {
    question: "What are the default initialization values for all 8 primitive types and reference types in Java?",
    shortAnswer: "byte/short/int/long = 0, float/double = 0.0, boolean = false, char = '\\u0000', Reference types = null.",
    explanation: "During Phase 3 of object allocation, the JVM zero-initializes the allocated Heap memory block before running explicit field initializers or constructor logic, guaranteeing type safety.",
    hint: "Numeric to 0, boolean to false, char to NUL, references to null.",
    level: "Beginner",
    codeExample: "class Demo {\n    int i;         // 0\n    double d;      // 0.0\n    boolean b;     // false\n    char c;        // '\\u0000'\n    String s;      // null\n}"
  },
  {
    question: "Why do local variables NOT receive default values like instance variables do?",
    shortAnswer: "Performance and bug prevention: zeroing Stack frames on every method call adds overhead, and requiring explicit initialization catches uninitialized variable bugs at compile time.",
    explanation: "Method execution is optimized for speed. Zeroing out the Local Variable Table on every Stack frame entry would degrade execution throughput. Furthermore, requiring explicit initialization forces programmers to declare intent.",
    hint: "Stack speed optimization vs Heap memory safety.",
    level: "Intermediate",
    codeExample: "void test() {\n    int x; // Stack variable\n    // System.out.println(x); // Compile Error: variable x might not have been initialized\n}"
  },
  {
    question: "What are the 8 sequential stages of a Java Object's complete lifecycle?",
    shortAnswer: "1. Class Loading, 2. Heap Allocation, 3. Zero-Init, 4. Explicit Field Init, 5. Instance Block, 6. Constructor (<init>), 7. In-Use (Reachable), 8. Unreachable & GC Reclaimed.",
    explanation: "From the moment the ClassLoader loads the bytecode into Metaspace to the moment the Garbage Collector sweeps its memory block in Eden/Tenured generation, the object passes through these 8 distinct stages.",
    hint: "From birth in Metaspace/Eden to death in GC sweep.",
    level: "Intermediate",
    codeExample: "// Lifecycle sequence: ClassLoad -> HeapAlloc -> ZeroInit -> FieldInit -> InstanceBlock -> Constructor -> InUse -> GC"
  },
  {
    question: "Can an instance variable be declared 'final' and left without an explicit initializer?",
    shortAnswer: "Yes (a blank final field), provided it is assigned a value in EVERY constructor before constructor execution finishes.",
    explanation: "A 'blank final' instance variable does not receive a default value. It MUST be explicitly assigned exactly once in either an instance initializer block or in every constructor of the class; otherwise, a compile-time error occurs.",
    hint: "Blank final fields must be assigned before constructor exit.",
    level: "Intermediate",
    codeExample: "class Student {\n    private final int id; // Blank final\n    public Student(int id) {\n        this.id = id; // Mandatory assignment\n    }\n}"
  },
  {
    question: "What is an Instance Initializer Block and when does it execute relative to constructors?",
    shortAnswer: "A '{ ... }' block inside a class that runs immediately before the constructor body during every object instantiation.",
    explanation: "Instance initializer blocks are copied by the compiler into every constructor right after the 'super()' call and before the constructor's own body. They are useful for sharing initialization code across overloaded constructors.",
    hint: "Runs on every 'new' before the constructor body.",
    level: "Intermediate",
    codeExample: "class Student {\n    { System.out.println(\"Instance block runs on every instance\"); }\n    Student() { System.out.println(\"Constructor runs\"); }\n}"
  },
  {
    question: "What happens if an instance variable has both an inline initializer and an assignment in the constructor?",
    shortAnswer: "The inline initializer executes first (Stage 4), and then the constructor assignment overrides it (Stage 6).",
    explanation: "Textual inline assignments ('int score = 50;') run before the constructor body. If the constructor assigns 'this.score = 90;', the field transitions from 0 (zero-init) -> 50 (inline init) -> 90 (constructor).",
    hint: "Constructor has the final say during initialization.",
    level: "Beginner",
    codeExample: "class Exam {\n    int marks = 50; // Evaluated first\n    Exam(int m) { this.marks = m; } // Overrides 50 with m\n}"
  },
  {
    question: "What is the scope and lifetime of an instance variable?",
    shortAnswer: "Scope is throughout the class body; lifetime is tied directly to the lifetime of the enclosing object on the Heap.",
    explanation: "An instance variable comes into existence when 'new' allocates the object on the Heap and is destroyed when the object is garbage-collected. It can be accessed by any instance method in the class.",
    hint: "Lives as long as the object lives in Heap memory.",
    level: "Beginner",
    codeExample: "// TraineeProfile p = new TraineeProfile(); // instance variables born\n// p = null; // instance variables die with p"
  },
  {
    question: "Can an instance variable have the same name as a local variable or method parameter?",
    shortAnswer: "Yes, this is called Variable Shadowing; the local variable shadows the instance variable, requiring 'this.fieldName' to disambiguate.",
    explanation: "Inside a method or constructor, an identifier matches the most localized scope first. If a parameter has the same name as a field ('name = name'), it assigns the parameter to itself (a no-op). Using 'this.name = name' explicitly targets the instance variable.",
    hint: "Use 'this.' to bypass local parameter shadowing.",
    level: "Beginner",
    codeExample: "public void setName(String name) {\n    this.name = name; // 'this.name' is field, 'name' is parameter\n}"
  },
  {
    question: "How does the HotSpot JVM layout instance variables in memory for 64-bit alignment?",
    shortAnswer: "HotSpot reorders fields by size (longs/doubles first, then ints/floats, shorts/chars, bytes/booleans, references) to minimize padding gaps.",
    explanation: "To prevent wasted memory from CPU bus alignment padding, the JVM field layout allocator clusters fields of identical alignment requirements together (Field Packing), rather than maintaining the programmer's textual source order.",
    hint: "Field packing and reordering to eliminate padding waste.",
    level: "Advanced",
    codeExample: "// JVM clusters 8-byte fields, then 4-byte, 2-byte, 1-byte, then OOP references"
  },
  {
    question: "What is the difference between a Class Variable (static) and an Instance Variable (non-static)?",
    shortAnswer: "A Class variable has only 1 shared copy per loaded class in Metaspace/Heap; an instance variable has 1 independent copy per object instance.",
    explanation: "Static variables exist without instantiating any objects. Instance variables are created dynamically in Heap every time 'new' is invoked.",
    hint: "1 per Class vs 1 per Object.",
    level: "Beginner",
    codeExample: "static int totalCount = 0; // 1 shared across all instances\nint studentRoll = 101;     // Unique to each Student instance"
  },
  {
    question: "What is the 'finalize()' method and why has it been deprecated since Java 9 and removed in modern Java?",
    shortAnswer: "finalize() was inherently unpredictable, caused performance degradation, deadlocks, and resurrection bugs; replaced by java.lang.ref.Cleaner.",
    explanation: "The Garbage Collector made no guarantees about when or if finalize() would run. It delayed memory reclamation by at least two GC cycles. Java 9 deprecated it (JEP 421 deprecated for removal in Java 18+), replacing it with the 'Cleaner' API and 'AutoCloseable'.",
    hint: "Unpredictable destructor mechanism replaced by Cleaner & try-with-resources.",
    level: "Intermediate",
    codeExample: "// Modern Java uses AutoCloseable and Cleaner instead of finalize()"
  },
  {
    question: "Can an instance variable be marked with the 'transient' modifier and what does it do?",
    shortAnswer: "Yes. 'transient' tells the Java Serialization mechanism to skip saving that instance variable to disk/network stream.",
    explanation: "When an object implementing Serializable is written to an ObjectOutputStream, fields marked 'transient' are ignored. When deserialized, transient fields receive their default zero-initialization values (0, false, null).",
    hint: "Used for sensitive data like passwords or cached computation values.",
    level: "Intermediate",
    codeExample: "private transient String userPassword; // Excluded from serialization"
  },
  {
    question: "Can an instance variable be marked with the 'volatile' modifier and what does it do?",
    shortAnswer: "Yes. 'volatile' ensures that reads and writes to the instance variable are directly synchronized with main memory across all threads.",
    explanation: "The Java Memory Model (JMM) allows CPU cores to cache instance variables in L1/L2 registers. Marking a field 'volatile' prevents thread-local caching and CPU instruction reordering, guaranteeing visibility across threads.",
    hint: "Guarantees cross-thread memory visibility and prevents instruction reordering.",
    level: "Advanced",
    codeExample: "private volatile boolean isShutdownRequested = false;"
  },
  {
    question: "What happens if an instance method reads an unassigned primitive instance variable?",
    shortAnswer: "It reads the JVM default value (0, 0.0, false, or '\\u0000') without any error.",
    explanation: "Because the JVM guarantees zero-initialization during object allocation, reading an unassigned instance variable is completely valid and returns its type-safe default.",
    hint: "Zero-initialization ensures memory safety.",
    level: "Beginner",
    codeExample: "class Record {\n    int count; // Unassigned\n    void print() { System.out.println(count); } // Prints 0\n}"
  },
  {
    question: "What is the memory size of a 'boolean' instance variable inside an object on HotSpot JVM?",
    shortAnswer: "1 byte (8 bits) inside an object field (or 4 bytes in a boolean array on some JVMs).",
    explanation: "While the JVM doesn't have dedicated boolean bytecode instructions (evaluating booleans as ints on the operand stack), HotSpot stores boolean fields inside object memory as 1 byte (0 for false, 1 for true).",
    hint: "1 byte in object layout, padded to alignment.",
    level: "Advanced",
    codeExample: "// Inside object layout: boolean flag occupies 1 byte"
  },
  {
    question: "In what order are instance variables initialized if a subclass extends a superclass?",
    shortAnswer: "Superclass static -> Subclass static -> Superclass instance/constructor -> Subclass instance/constructor.",
    explanation: "When creating a subclass instance: 1. Super static inits, 2. Sub static inits, 3. Super instance fields and super constructor, 4. Sub instance fields and sub constructor.",
    hint: "Parent is born before Child at both class and instance levels.",
    level: "Intermediate",
    codeExample: "// Super instance fields -> Super constructor -> Sub instance fields -> Sub constructor"
  },
  {
    question: "Why should you avoid calling overridable (non-final, non-private) methods inside a constructor?",
    shortAnswer: "Because a subclass overriding the method will execute before its own instance fields have been initialized, reading uninitialized default zeros.",
    explanation: "If a super constructor calls an overridable method 'init()', dynamic dispatch invokes the child's overridden 'init()' BEFORE child instance initializers run. The child method will observe 0 or null in its own fields.",
    hint: "Subclass fields are uninitialized when superclass constructor is running.",
    level: "Advanced",
    codeExample: "class Parent {\n    Parent() { print(); } // Dangerous!\n    void print() {}\n}\nclass Child extends Parent {\n    int x = 42;\n    void print() { System.out.println(x); } // Prints 0, NOT 42!\n}"
  },
  {
    question: "Can an instance variable be accessed before its textual declaration in the same class?",
    shortAnswer: "Only inside methods or constructor bodies; illegal in inline field initializers (Illegal Forward Reference).",
    explanation: "Writing 'int a = b + 1; int b = 10;' causes a compile error ('illegal forward reference'). However, inside an instance method or constructor, fields can be accessed regardless of textual position.",
    hint: "Inline initializers obey strict top-to-bottom textual order.",
    level: "Intermediate",
    codeExample: "// Compile Error:\n// int a = b + 1;\n// int b = 10;"
  },
  {
    question: "What is 'Object Resurrection' in legacy Java garbage collection?",
    shortAnswer: "When an unreachable object re-assigns its 'this' reference to a static or active variable inside its finalize() method, reviving itself.",
    explanation: "Inside finalize(), executing 'ActiveRegistry.saved = this;' made the object reachable again, postponing its death. This was a notorious flaw that contributed to the deprecation and removal of finalizers.",
    hint: "Reviving a dying object during finalization.",
    level: "Advanced",
    codeExample: "// Anti-pattern resurrection in finalize():\nprotected void finalize() { ActiveHolder.instance = this; }"
  },
  {
    question: "How does the 'java.lang.ref.Cleaner' API manage post-mortem object cleanup in modern Java?",
    shortAnswer: "It uses PhantomReferences and a dedicated daemon thread to run cleaning actions without retaining references to the dead object.",
    explanation: "A Cleaner registers an action (Runnable) that holds only the native resource handle (e.g. file descriptor or memory address), ensuring that the Java object itself can be collected immediately without resurrection risks.",
    hint: "Modern, safe replacement for finalize().",
    level: "Advanced",
    codeExample: "private static final Cleaner cleaner = Cleaner.create();\ncleaner.register(this, new StateCleaner(nativeHandle));"
  },
  {
    question: "What is the difference between 'new Student()' and 'Student.class' regarding lifecycle?",
    shortAnswer: "'Student.class' is the Class object in Metaspace/Heap loaded once; 'new Student()' creates an individual instance on the Heap.",
    explanation: "The Class object represents the type metadata and bytecode. It is created once per ClassLoader. Individual instances represent runtime entities with distinct instance variable state.",
    hint: "Class template vs concrete object instance.",
    level: "Beginner",
    codeExample: "Class<TraineeProfile> meta = TraineeProfile.class; // Class metadata\nTraineeProfile instance = new TraineeProfile();       // Object instance"
  },
  {
    question: "What happens to instance variables when an object is promoted from Young Generation to Old Generation?",
    shortAnswer: "The entire object (header + all instance variables) is copied contiguously from Survivor space to Tenured space in the Heap.",
    explanation: "Generational promotion preserves the entire object layout intact. The GC updates the reference pointers in the active Stack frames and card tables to point to the new Tenured Heap address.",
    hint: "Copied contiguously to the long-lived heap space.",
    level: "Intermediate",
    codeExample: "// Object surviving 15 Minor GC cycles is promoted to Old Gen"
  },
  {
    question: "Can an interface declare instance variables?",
    shortAnswer: "No. All fields declared in an interface are implicitly 'public static final' (constants), never instance variables.",
    explanation: "Interfaces define abstract contracts and constants. Because interfaces cannot hold state or be instantiated with 'new', they cannot declare instance variables.",
    hint: "Interfaces only have static constants.",
    level: "Beginner",
    codeExample: "interface Academy {\n    int MAX_STUDENTS = 100; // Implicitly public static final!\n}"
  },
  {
    question: "Why is it best practice to declare instance variables as 'private'?",
    shortAnswer: "To enforce Encapsulation and Data Hiding, preventing external classes from corrupting internal state directly.",
    explanation: "Public fields allow outside code to set invalid values (e.g. negative balances). Private fields force access through validated getter and setter methods.",
    hint: "Encapsulation principle: hide data, expose validated methods.",
    level: "Beginner",
    codeExample: "private double balanceInr; // Protected from external corruption"
  },
  {
    question: "What is a 'Synthetic Field' generated by the Java compiler?",
    shortAnswer: "A compiler-generated hidden instance variable, such as 'this$0' in non-static inner classes pointing to the outer class instance.",
    explanation: "When you create a non-static inner class, javac silently injects a private final instance variable named 'this$0' holding a reference to the enclosing outer instance, enabling the inner class to access outer fields.",
    hint: "Hidden compiler-injected pointer to enclosing outer instance.",
    level: "Advanced",
    codeExample: "class Outer {\n    class Inner {\n        // Compiler injects: final Outer this$0;\n    }\n}"
  },
  {
    question: "How does the 'record' feature in Java 16+ handle instance variables?",
    shortAnswer: "Records automatically generate private final instance variables for all record components with compact constructor validation.",
    explanation: "In 'record Student(int id, String name) {}', the compiler creates private final fields, accessor methods, equals(), hashCode(), and toString() automatically, enforcing immutable domain data transfer objects.",
    hint: "Immutable data classes with compiler-generated final fields.",
    level: "Intermediate",
    codeExample: "public record StudentRecord(int roll, String name) {}"
  },
  {
    question: "What is 'Memory Compaction' during the Garbage Collection stage of an object's lifecycle?",
    shortAnswer: "Moving surviving objects together contiguously in Heap memory to eliminate fragmentation and create large contiguous free space.",
    explanation: "When objects die and leave holes in Heap memory, compacting collectors (like G1, ZGC, Parallel GC) relocate live objects contiguously, adjusting all reference pointers so that new 'new' allocations can use fast bump-the-pointer allocation.",
    hint: "Defragmenting the Heap for ultra-fast new allocations.",
    level: "Advanced",
    codeExample: "// Garbage Collector compacts Eden/Survivor/Tenured space"
  },
  {
    question: "Why should mutable default values (like 'new ArrayList()') as field initializers be used with care?",
    shortAnswer: "Because every instance creation allocates a new collection object; if unneeded, it causes unnecessary Eden allocation churn.",
    explanation: "If 100,000 instances are created and only 5% use the list, allocating 100,000 empty ArrayList objects wastes Heap memory. Lazy initialization can defer allocation until first use.",
    hint: "Eager allocation vs Lazy initialization.",
    level: "Intermediate",
    codeExample: "private List<String> notes = null; // Initialize lazily on first addNote()"
  },
  {
    question: "What is Sukanta Hui's Lifecycle Philosophy taught across Barrackpore and Naihati centres?",
    shortAnswer: "An object is a living contract: initialized in purity, guarded in active duty, and surrendered gracefully to memory recycling.",
    explanation: "At the Barrackpore academy, Sukanta Hui instills that every instance variable is a component of an entity's identity. By ensuring fields are born in validated states and keeping instance scopes clean, you guarantee system stability and high-performance GC throughput.",
    hint: "Purity at birth, vigilance in life, grace in recycling.",
    level: "Beginner",
    codeExample: "// Sukanta Hui's Clean Entity Pattern: Validated constructor -> Guarded mutations -> Clean GC exit"
  }
];

export default topic7_questions;
