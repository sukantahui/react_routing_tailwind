/**
 * ============================================================================
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 0: What is a Constructor and Why Object Initialization is Mandatory
 * High-Yield Technical Interview & Academic Q&A Catalog (30 Questions)
 * ============================================================================
 *
 * Educator: Sukanta Hui
 * Academic Centres: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 * ============================================================================
 */

const topic0_questions = [
  {
    question: "What is a Constructor in Java and what is its primary purpose?",
    shortAnswer: "A special member block that has the same name as the class, no return type, and is invoked automatically when an object is instantiated via 'new' to initialize the object's state in Heap memory.",
    explanation: "A constructor is not a method; its sole purpose is to initialize instance variables, establish domain invariants, and prepare resources on the newly allocated Heap memory before returning the reference to the caller.",
    hint: "Special block with class's exact name used for object initialization.",
    level: "Beginner",
    codeExample: "public class Student {\n    private String name;\n    public Student(String name) { this.name = name; } // Constructor\n}"
  },
  {
    question: "Why is Object Initialization considered mandatory in Object-Oriented Programming?",
    shortAnswer: "To prevent objects from existing in corrupted, uninitialized, or invalid states (e.g. null references, zero IDs) that cause immediate NullPointerExceptions or broken business logic.",
    explanation: "When 'new' allocates memory, all bytes are zeroed out (0, 0.0, null). Without constructor initialization, calling methods on reference fields throws NullPointerException immediately. Initialization guarantees object validity from the moment of birth.",
    hint: "Memory safety and invariant guarantee at birth.",
    level: "Beginner",
    codeExample: "// Without constructor: studentName is null → calling studentName.toUpperCase() throws NullPointerException"
  },
  {
    question: "What are the 3 stages in the Object Creation Pipeline in Java?",
    shortAnswer: "1. Memory Allocation in Eden Space (Zero-Initialization) → 2. Constructor Execution on 'this' → 3. Reference Assignment to Stack variable.",
    explanation: "First, the 'new' keyword allocates required bytes on the Heap and zero-initializes all fields. Second, the constructor executes on the uninitialized instance using 'this'. Third, the 64-bit Heap address pointer is returned and stored in the caller's Stack frame.",
    hint: "Allocate → Initialize → Assign reference.",
    level: "Intermediate",
    codeExample: "Student s = new Student(\"Swadeep\"); // 1. new allocates → 2. Student(...) inits → 3. 's' receives pointer"
  },
  {
    question: "Does a constructor allocate memory on the Heap?",
    shortAnswer: "No! The 'new' operator allocates Heap memory; the constructor only initializes the allocated memory.",
    explanation: "A common interview misconception is that constructors allocate memory. In bytecode, the 'new' instruction allocates memory and pushes the object reference onto the operand stack; 'invokespecial <init>' then calls the constructor to initialize that memory.",
    hint: "'new' allocates memory; the constructor initializes it.",
    level: "Intermediate",
    codeExample: "// Bytecode: 0: new #2 (Allocates) → 3: dup → 4: invokespecial #3 (Constructor Initializes)"
  },
  {
    question: "What happens if a developer writes NO constructor in a Java class?",
    shortAnswer: "The Java compiler automatically generates a Default No-Argument Constructor with an empty body and a call to 'super()'.",
    explanation: "If you don't declare any constructors, javac inserts 'public ClassName() { super(); }' into bytecode. This ensures every class has at least 1 constructor for instantiation.",
    hint: "Compiler supplies a default no-arg constructor.",
    level: "Beginner",
    codeExample: "// Source: class A {}\n// Bytecode generated: class A { public A() { super(); } }"
  },
  {
    question: "What happens to the compiler-generated default constructor if you declare ANY custom constructor?",
    shortAnswer: "The compiler immediately suppresses and deletes the automatic default constructor.",
    explanation: "As soon as you define any constructor (e.g. 'public Student(int id)'), the compiler assumes you want to enforce specific initialization parameters, so it will no longer provide a no-arg constructor unless you explicitly write one.",
    hint: "Custom constructor suppresses the compiler's default constructor.",
    level: "Beginner",
    codeExample: "class Student { public Student(int id) {} }\n// Student s = new Student(); // COMPILE ERROR: constructor Student() is undefined!"
  },
  {
    question: "Can a constructor have a return type like 'void' or 'int'?",
    shortAnswer: "No! If you add a return type (even 'void'), it ceases to be a constructor and becomes a normal method with the same name as the class.",
    explanation: "Writing 'public void Student()' declares a normal instance method named Student that returns void, leaving the class with a compiler-generated default constructor! This is a classic trap for beginner programmers.",
    hint: "Adding 'void' turns a constructor into a normal method.",
    level: "Beginner",
    codeExample: "// TRAP: This is a METHOD, NOT a constructor:\npublic void Student() { System.out.println(\"I am just a method!\"); }"
  },
  {
    question: "What does the 'this' keyword represent inside a constructor body?",
    shortAnswer: "It holds the reference pointer to the newly allocated, currently initializing object instance on the Heap.",
    explanation: "Inside the constructor, 'this' refers to the exact physical object in Eden space that was just allocated by the 'new' operator, allowing constructor statements to assign values to its instance fields.",
    hint: "Pointer to the currently initializing object instance.",
    level: "Beginner",
    codeExample: "public Trainee(String name) { this.name = name; // 'this' points to new Heap instance }"
  },
  {
    question: "What is the return value of a constructor expression like 'new Student()'?",
    shortAnswer: "The 64-bit Heap memory address reference of the newly initialized object.",
    explanation: "The expression 'new Student()' evaluates to the reference address of the freshly initialized instance on the Heap, which can be stored in a Stack reference variable or passed anonymously.",
    hint: "Evaluates to the Heap address reference.",
    level: "Beginner",
    codeExample: "Student s = new Student(); // Evaluates to Heap pointer (e.g. 0x4517D9A3)"
  },
  {
    question: "Can a constructor throw an exception, and what happens to the allocated memory?",
    shortAnswer: "Yes! If a constructor throws an exception, object instantiation is aborted immediately and the unreferenced Heap memory is reclaimed during the next GC cycle.",
    explanation: "Throwing IllegalArgumentException inside a constructor prevents an object from being born in an invalid state. The caller never receives a reference, leaving the allocated bytes eligible for Garbage Collection.",
    hint: "Fail-fast at birth: exception aborts creation and memory is recycled.",
    level: "Intermediate",
    codeExample: "public Account(double balance) {\n    if (balance < 0) throw new IllegalArgumentException(\"Negative balance disallowed\");\n}"
  },
  {
    question: "How do constructors enforce Domain Invariants at object birth?",
    shortAnswer: "By validating all constructor arguments (null checks, range limits, formatting) and rejecting invalid parameters before fields are assigned.",
    explanation: "An invariant is a rule that must hold true for the object across its entire lifecycle. Establishing invariants at birth ensures that no invalid instance can ever exist in Heap memory.",
    hint: "Validate arguments at birth before assigning to fields.",
    level: "Intermediate",
    codeExample: "this.studentId = (id > 0) ? id : throw new IllegalArgumentException(\"Invalid ID\");"
  },
  {
    question: "Can a constructor be declared 'private', and what is the primary use case?",
    shortAnswer: "Yes! Private constructors prevent outside classes from instantiating the class with 'new', used in Singletons, Utility classes, and Factory patterns.",
    explanation: "Declaring a private constructor suppresses the default constructor and forces callers to use static factory methods ('Student.of(...)') or singleton instance accessors ('DatabasePool.getInstance()').",
    hint: "Private constructor prevents external 'new' instantiation.",
    level: "Intermediate",
    codeExample: "public final class MathUtils {\n    private MathUtils() {} // Non-instantiable utility class\n}"
  },
  {
    question: "What is the bytecode name used by the JVM for constructors?",
    shortAnswer: "'<init>'.",
    explanation: "In Java bytecode, instance constructors are represented by the special method name '<init>', while static initializer blocks are represented by '<clinit>'.",
    hint: "<init> for instance constructors; <clinit> for static initializers.",
    level: "Advanced",
    codeExample: "// Bytecode: 4: invokespecial #3 // Method \"<init>\":()V"
  },
  {
    question: "Can constructors be inherited by subclasses in Java?",
    shortAnswer: "No! Constructors are NOT members of a class and are NEVER inherited by subclasses.",
    explanation: "A child class inherits fields and methods, but NOT parent constructors. However, a child class constructor MUST invoke a parent constructor (either implicitly via super() or explicitly via super(...)).",
    hint: "Constructors are not inherited; they must be invoked via super().",
    level: "Beginner",
    codeExample: "class Parent { public Parent(int x) {} }\nclass Child extends Parent { public Child(int x) { super(x); } } // Must call super"
  },
  {
    question: "Why can't a constructor be marked with the 'static' modifier?",
    shortAnswer: "Because a constructor's purpose is to initialize a specific 'this' instance on the Heap, whereas static members belong to the class itself with no 'this' context.",
    explanation: "Combining 'static' with a constructor is a contradiction in terms. The compiler rejects 'static Student()' with 'modifier static not allowed here'.",
    hint: "Constructors initialize instance state on 'this'; static has no 'this'.",
    level: "Beginner",
    codeExample: "// Compile Error: public static Student() {}"
  },
  {
    question: "Why can't a constructor be marked with the 'final' modifier?",
    shortAnswer: "Because 'final' on a method prevents overriding in subclasses, but constructors are NEVER inherited or overridden in the first place.",
    explanation: "Since constructor overriding does not exist in Java, marking a constructor 'final' is meaningless and prohibited by the compiler ('modifier final not allowed here').",
    hint: "Constructors cannot be overridden, so final is illegal.",
    level: "Beginner",
    codeExample: "// Compile Error: public final Student() {}"
  },
  {
    question: "Why can't a constructor be marked with the 'abstract' modifier?",
    shortAnswer: "Because an abstract method has no implementation body, but an object cannot be constructed without an executing constructor body to initialize memory.",
    explanation: "Constructors must contain executable initialization bytecode. Declaring an abstract constructor causes a compile error: 'modifier abstract not allowed here'.",
    hint: "Constructors must have bodies to initialize memory.",
    level: "Beginner",
    codeExample: "// Compile Error: public abstract Student();"
  },
  {
    question: "Can a constructor be marked 'synchronized' in Java?",
    shortAnswer: "No. The JVM guarantees that the initializing instance is only visible to the creating thread until construction completes, making synchronization redundant.",
    explanation: "While an object is being constructed, only the thread executing 'new' has access to it. Therefore, locking the object during construction is unnecessary and prohibited by the compiler.",
    hint: "Constructing thread has exclusive access; synchronization is redundant.",
    level: "Advanced",
    codeExample: "// Compile Error: public synchronized Student() {}"
  },
  {
    question: "What is the first statement automatically executed in every constructor if no explicit constructor call is written?",
    shortAnswer: "'super();' (invoking the no-argument constructor of the superclass).",
    explanation: "If neither 'this(...)' nor 'super(...)' is the first line of a constructor, javac automatically inserts 'super();' as line 1 to ensure parent class state initializes before child state.",
    hint: "Implicit super() call to parent no-arg constructor.",
    level: "Intermediate",
    codeExample: "public Student() {\n    // Compiler inserts 'super();' right here!\n    System.out.println(\"Student init\");\n}"
  },
  {
    question: "What happens if a parent class has NO no-arg constructor and the child constructor does not write explicit 'super(...)'?",
    shortAnswer: "A compile-time error occurs: 'constructor Parent in class Parent cannot be applied to given types: required: int, found: no arguments'.",
    explanation: "Because the compiler tries to insert 'super();' automatically, but the parent has only parameterized constructors, compilation fails. The child MUST explicitly call 'super(args)' on line 1.",
    hint: "Child must explicitly invoke parent parameterized constructor.",
    level: "Intermediate",
    codeExample: "class Parent { Parent(int x) {} }\nclass Child extends Parent {\n    Child() { super(10); } // Explicit super call is mandatory!\n}"
  },
  {
    question: "Can a constructor invoke another constructor of the SAME class?",
    shortAnswer: "Yes! Using the 'this(...)' constructor chaining syntax as the very first line of the constructor body.",
    explanation: "Constructor chaining allows overloaded constructors to delegate to a master canonical constructor, eliminating duplicate validation and field assignment code.",
    hint: "this(...) syntax for constructor chaining in same class.",
    level: "Beginner",
    codeExample: "public Student(String name) { this(name, \"Barrackpore\"); } // Delegates to 2-arg constructor"
  },
  {
    question: "How do constructors facilitate Immutable Objects with 'final' fields?",
    shortAnswer: "Final fields must be assigned exactly once before constructor completion, making constructors the exclusive gateway for setting immutable state.",
    explanation: "Java guarantees that all 'final' fields assigned in a constructor are permanently frozen and safely published to all threads without race conditions.",
    hint: "Final fields are assigned permanently inside constructors.",
    level: "Intermediate",
    codeExample: "public class ImmutablePoint {\n    private final int x, y;\n    public ImmutablePoint(int x, int y) { this.x = x; this.y = y; }\n}"
  },
  {
    question: "What is the danger of starting a background Thread inside a constructor?",
    shortAnswer: "The new thread can start executing before the constructor finishes initializing fields, accessing partially initialized state ('this' escape).",
    explanation: "If a constructor starts a thread that reads instance fields, the thread may run concurrently while fields are still null or zero. Never start threads inside constructors.",
    hint: "Never start threads inside constructors due to race conditions.",
    level: "Advanced",
    codeExample: "// BAD: public Worker() { new Thread(this).start(); // Escapes before init! }"
  },
  {
    question: "Can a constructor call an instance method of the same class?",
    shortAnswer: "Yes, but calling OVERRIDABLE (non-final, non-private) methods is dangerous because a subclass override could execute before child fields initialize.",
    explanation: "If parent constructor calls 'init()', and child overrides 'init()', the child's 'init()' runs before the child constructor has initialized its own fields! Only call private or final methods.",
    hint: "Only call private or final helper methods inside constructors.",
    level: "Advanced",
    codeExample: "public Parent() { validatePrivate(); } // Safe: private method cannot be overridden"
  },
  {
    question: "How does the 'record' feature in Java 16+ handle constructors?",
    shortAnswer: "Records automatically generate a Canonical Constructor matching all component fields, and support a Compact Constructor for validation.",
    explanation: "In a record, you can write 'public StudentRecord { Objects.requireNonNull(name); }' without parameter lists or field assignments—the compiler handles the rest.",
    hint: "Canonical and Compact constructors in Java records.",
    level: "Intermediate",
    codeExample: "public record Student(int roll, String name) {\n    public Student { if (roll <= 0) throw new IllegalArgumentException(); }\n}"
  },
  {
    question: "What is the difference between an Instance Initialization Block (IIB) and a Constructor?",
    shortAnswer: "An IIB runs for EVERY constructor before the constructor body executes; a constructor runs specific code for a given parameter signature.",
    explanation: "IIBs are useful for sharing common setup logic across all overloaded constructors without repeating code or when configuring anonymous inner classes.",
    hint: "IIB runs before constructor body on every instantiation.",
    level: "Intermediate",
    codeExample: "class Demo {\n    { System.out.println(\"IIB runs first\"); }\n    Demo() { System.out.println(\"Constructor runs second\"); }\n}"
  },
  {
    question: "What happens if a constructor attempts to call itself recursively ('this()')?",
    shortAnswer: "A compile-time error occurs: 'recursive constructor invocation'.",
    explanation: "The Java compiler detects cyclic constructor calls at compile time and halts with an error, preventing infinite loops during instantiation.",
    hint: "Compiler detects and rejects recursive constructor loops.",
    level: "Beginner",
    codeExample: "// Compile Error: Demo() { this(); } → recursive constructor invocation"
  },
  {
    question: "Can a constructor accept varargs (variable-length arguments) as parameters?",
    shortAnswer: "Yes! A constructor can take varargs (e.g. 'public Group(String... members)') as its last parameter.",
    explanation: "Varargs constructors allow flexible instantiation with zero, one, or many arguments, converted into an array under the hood.",
    hint: "Varargs parameter must be the last argument in constructor.",
    level: "Beginner",
    codeExample: "public Batch(String campus, Student... students) { ... }"
  },
  {
    question: "What is a 'Copy Constructor' in Java?",
    shortAnswer: "A constructor that creates a new independent duplicate object by copying state from an existing instance of the same class.",
    explanation: "Unlike C++, Java has no built-in copy constructor syntax, but developers implement 'public Student(Student other)' for clean, safe, deep object copying.",
    hint: "Constructor accepting an instance of the same class to clone state.",
    level: "Intermediate",
    codeExample: "public Student(Student other) {\n    this.id = other.id;\n    this.name = other.name;\n}"
  },
  {
    question: "What is Sukanta Hui's Law of Object Genesis taught at the Barrackpore Academy?",
    shortAnswer: "An object must never be born in sin. A constructor is the sacred temple where an entity receives its identity, validates its domain truth, and establishes its lifelong invariants.",
    explanation: "At the Barrackpore academy, Sukanta Hui teaches that 90% of software bugs are born at instantiation time when uninitialized or invalid data slips into Heap memory. By establishing strict non-null validation, range checking, and invariant enforcement inside your constructors, your objects stand mathematically pure and bulletproof across the entire enterprise ecosystem.",
    hint: "Objects must never be born in invalid states; constructors establish lifelong truth.",
    level: "Beginner",
    codeExample: "// Sukanta Hui's Object Genesis Formula:\n// Allocate Memory (new) → Validate Invariants → Bind 'this' State → Safe Publication"
  }
];

export default topic0_questions;
