/**
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 2: Constructors vs Methods: Detailed Comparison Table
 * High-Yield Technical Interview & Academic Q&A Catalog (30 Questions)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

const topic2_questions = [
  {
    question: "What is the fundamental architectural difference in purpose between a Constructor and a Method?",
    shortAnswer: "A constructor initializes newly allocated Heap memory to forge a valid object state, whereas a method defines operational behavior or computes values on existing state.",
    explanation: "Constructors are invoked automatically during 'new' to bring an object into existence with guaranteed domain invariants. Methods are executed after creation to perform calculations or state transitions.",
    hint: "Initialization of state vs execution of behavior.",
    level: "Beginner",
    codeExample: "// Constructor: initializes state\npublic Student(String name) { this.name = name; }\n\n// Method: operational behavior\npublic void updateAttendance(int days) { this.attendance += days; }"
  },
  {
    question: "Can a constructor have a return type in Java?",
    shortAnswer: "No. Constructors must NEVER have a return type, not even 'void'.",
    explanation: "A constructor implicitly returns the newly allocated Heap reference. Declaring a return type converts it into a standard method that the JVM's 'new' opcode will ignore.",
    hint: "Zero return types allowed on constructors.",
    level: "Beginner",
    codeExample: "public Student() {} // Constructor\npublic void Student() {} // Method! NOT a constructor"
  },
  {
    question: "How do invocation mechanisms differ between constructors and methods?",
    shortAnswer: "Constructors are invoked implicitly by the runtime during object creation ('new', 'this()', 'super()'), while methods are explicitly called on object references via dot (.).",
    explanation: "Constructors cannot be called directly on an already initialized object reference. Methods can be invoked arbitrarily many times using 'reference.methodName()'.",
    hint: "Triggered via 'new' vs invoked via dot operator.",
    level: "Beginner",
    codeExample: "Student s = new Student(\"Swadeep\"); // Constructor runs\ns.calculateMarks(); // Method runs"
  },
  {
    question: "Can constructors be inherited by subclasses in Java?",
    shortAnswer: "No, constructors are NOT members of a class and are never inherited by subclasses.",
    explanation: "A child class inherits instance variables and instance methods, but not constructors. The child must declare its own constructors, which explicitly or implicitly invoke a parent constructor via 'super()'.",
    hint: "Constructors are not inherited; child must define its own.",
    level: "Intermediate",
    codeExample: "class Parent { Parent(int x) {} }\nclass Child extends Parent {\n    Child(int x) { super(x); } // Must call super\n}"
  },
  {
    question: "Can constructors be overridden polymorphically?",
    shortAnswer: "No. Since constructors are not inherited and must match their declaring class name, they cannot be overridden.",
    explanation: "Method overriding requires inheritance and identical names. Subclass constructors have their own distinct class name, making overriding syntactically impossible.",
    hint: "Overriding requires inheritance and identical names.",
    level: "Intermediate",
    codeExample: "// Overriding is impossible for constructors\nclass Animal { Animal() {} }\nclass Dog extends Animal { Dog() {} } // New constructor, not an override"
  },
  {
    question: "What bytecode opcode is used by the JVM to invoke a constructor vs an instance method?",
    shortAnswer: "Constructors are invoked via 'invokespecial <init>', while standard instance methods are invoked via 'invokevirtual' (or 'invokeinterface').",
    explanation: "The JVM treats constructors as special instance initialization methods named '<init>', resolved with static binding via 'invokespecial'. Virtual methods use dynamic dispatch via 'invokevirtual'.",
    hint: "invokespecial <init> vs invokevirtual.",
    level: "Advanced",
    codeExample: "// Bytecode:\n// new Student → invokespecial Student.<init>()V\n// s.study()   → invokevirtual Student.study()V"
  },
  {
    question: "Does the compiler ever generate a default method if none is defined?",
    shortAnswer: "No. The compiler only generates a default no-argument constructor if zero constructors are written; it NEVER generates default methods.",
    explanation: "Methods represent custom application logic and are never automatically synthesized by javac. The compiler only generates the default constructor '<init>()' to satisfy JVM object lifecycle requirements.",
    hint: "Only default constructors are generated, never methods.",
    level: "Beginner",
    codeExample: "class Sample {} // Compiler creates Sample() {}, but creates zero methods"
  },
  {
    question: "Can a constructor be declared 'static'?",
    shortAnswer: "No. The 'static' modifier is strictly illegal for constructors because constructors initialize the 'this' instance context.",
    explanation: "Static members belong to the class and execute without an instance. Constructors require an active, allocated instance reference ('this') in Eden space to populate fields.",
    hint: "Constructors operate on 'this', which does not exist in static context.",
    level: "Intermediate",
    codeExample: "// Compile Error: modifier static not allowed here\n// public static Student() {}"
  },
  {
    question: "Can a constructor be declared 'final'?",
    shortAnswer: "No. 'final' on methods prevents overriding, but constructors cannot be inherited or overridden, making 'final' invalid.",
    explanation: "The Java Language Specification forbids 'final' on constructors as it serves no semantic purpose and is syntactically invalid.",
    hint: "Cannot override constructors, so 'final' is meaningless.",
    level: "Beginner",
    codeExample: "// Compile Error: modifier final not allowed here\n// public final Student() {}"
  },
  {
    question: "Can a constructor be declared 'abstract'?",
    shortAnswer: "No. Abstract members have no implementation and defer logic to subclasses, but a constructor must execute object initialization.",
    explanation: "A constructor is bound to create instances of its specific class. An abstract constructor would mean an object cannot initialize its own state, violating object encapsulation.",
    hint: "Constructors must initialize; they cannot be abstract.",
    level: "Intermediate",
    codeExample: "// Compile Error: modifier abstract not allowed here\n// public abstract Student();"
  },
  {
    question: "Can a constructor be declared 'synchronized'?",
    shortAnswer: "No. Java syntax forbids 'synchronized' on constructors because only the creating thread has access to the newly allocated instance during construction.",
    explanation: "During construction, the object reference has not yet been published to other threads. Locking 'this' during construction is redundant and illegal. Synchronized blocks inside the constructor are permitted if locking on a shared lock object.",
    hint: "Objects are private to the constructing thread until published.",
    level: "Advanced",
    codeExample: "// Illegal:\n// public synchronized Student() {}\n\n// Legal:\npublic Student() { synchronized(sharedLock) { /* ... */ } }"
  },
  {
    question: "How many times can a constructor be executed on a single object instance?",
    shortAnswer: "Exactly once, at the instant of object creation via the 'new' operator.",
    explanation: "Once an object is instantiated and its constructor completes, the constructor cannot be re-invoked on that object reference. Methods, in contrast, can be called repeatedly.",
    hint: "Constructor runs once per lifecycle; methods run repeatedly.",
    level: "Beginner",
    codeExample: "Student s = new Student(); // Constructor runs ONCE\ns.attend(); // Method run 1\ns.attend(); // Method run 2"
  },
  {
    question: "Can a constructor call an instance method of the same class?",
    shortAnswer: "Yes, but it is considered risky if the method is overridable (non-final, non-private), as subclass overrides may execute before subclass fields are initialized.",
    explanation: "Calling an overridable method from a constructor causes subclass implementations to run against uninitialized subclass fields, leading to NullPointerExceptions or corrupt state.",
    hint: "Beware of calling overridable methods during construction.",
    level: "Advanced",
    codeExample: "class Parent {\n    Parent() { printState(); } // Dangerous! If overridden in Child\n    void printState() { System.out.println(\"Parent\"); }\n}"
  },
  {
    question: "Can a method have the exact same name as the class in Java?",
    shortAnswer: "Yes, it is legally allowed by the compiler if it specifies a return type, but it violates Java naming conventions and causes major confusion.",
    explanation: "Writing 'public void Student()' is a valid method. However, javac will treat it strictly as a regular method, and executing 'new Student()' will NOT call it.",
    hint: "Legal with return type, but terrible practice.",
    level: "Intermediate",
    codeExample: "public class Trainee {\n    public void Trainee() { System.out.println(\"I am a method!\"); }\n}"
  },
  {
    question: "What is the naming convention for methods vs constructors?",
    shortAnswer: "Constructors must match the class name in PascalCase (UpperCamelCase). Methods should use lowerCamelCase and typically start with a verb.",
    explanation: "Class & Constructor: 'StudentRegistration', 'InvoiceProcessor'. Methods: 'calculateTotal()', 'registerStudent()', 'getFeeDetails()'.",
    hint: "PascalCase for Constructors, lowerCamelCase for Methods.",
    level: "Beginner",
    codeExample: "public class BankAccount {\n    public BankAccount() {} // PascalCase\n    public void depositFunds() {} // lowerCamelCase\n}"
  },
  {
    question: "Can methods be overloaded in Java? Can constructors be overloaded?",
    shortAnswer: "Yes, both methods and constructors can be overloaded by providing distinct parameter lists (different number, types, or order of parameters).",
    explanation: "Constructor overloading allows multiple ways to initialize an object (e.g. default values vs customized parameters). Method overloading provides multiple ways to perform an operation.",
    hint: "Both support overloading with distinct parameter signatures.",
    level: "Beginner",
    codeExample: "public Student() {}\npublic Student(String name) {}\n\npublic void study() {}\npublic void study(int hours) {}"
  },
  {
    question: "How does 'this' keyword behave inside a constructor vs inside an instance method?",
    shortAnswer: "In both, 'this' refers to the current instance. However, inside a constructor, 'this(...)' with parentheses calls an overloaded constructor, which must be the first line.",
    explanation: "As a variable, 'this.fieldName' resolves instance variables in both. As an invocation 'this(...)', it can ONLY be used inside constructors on line 1 for constructor chaining.",
    hint: "this.field works in both; this(...) call works only in constructors.",
    level: "Intermediate",
    codeExample: "public Student(String name) {\n    this(name, 0); // Constructor call\n}\npublic void setName(String name) {\n    this.name = name; // Field access\n}"
  },
  {
    question: "Can an interface in Java declare a constructor?",
    shortAnswer: "No, interfaces can NEVER declare constructors because interfaces cannot be instantiated directly and have no instance state to initialize.",
    explanation: "Interfaces only define abstract contracts, default methods, static methods, and public static final constants. They do not have instance state on the Heap.",
    hint: "Interfaces cannot be instantiated, so no constructors allowed.",
    level: "Beginner",
    codeExample: "interface Calculable {\n    // Calculable() {} // COMPILE ERROR!\n    void compute(); // Valid method\n}"
  },
  {
    question: "Can an abstract class declare a constructor?",
    shortAnswer: "Yes! Abstract classes can and often do declare constructors to initialize inherited fields for concrete subclasses.",
    explanation: "Even though abstract classes cannot be directly instantiated via 'new AbstractClass()', their constructors execute via 'super(...)' when concrete child instances are created.",
    hint: "Abstract classes have constructors called via super() from subclasses.",
    level: "Intermediate",
    codeExample: "abstract class Person {\n    String name;\n    Person(String name) { this.name = name; }\n}\nclass Student extends Person {\n    Student(String name) { super(name); }\n}"
  },
  {
    question: "What happens in memory when a constructor fails by throwing an exception?",
    shortAnswer: "Object creation aborts, the reference is never returned to the caller, and the unreferenced memory in Eden space becomes eligible for Garbage Collection.",
    explanation: "If an exception is thrown in a constructor before completion, the object is considered partially initialized and unusable. It will be reclaimed during the next GC cycle.",
    hint: "Creation aborts; incomplete object is garbage collected.",
    level: "Advanced",
    codeExample: "public Student(int age) {\n    if (age < 0) throw new IllegalArgumentException(\"Invalid age\");\n    this.age = age;\n}"
  },
  {
    question: "Can constructors be declared with variable arguments (varargs)?",
    shortAnswer: "Yes! Both constructors and methods can accept varargs ('Type... args') as their final parameter.",
    explanation: "Varargs provide flexible parameter passing at instantiation time. The JVM compiles varargs into an array parameter under the hood.",
    hint: "Varargs are supported on constructors as the final parameter.",
    level: "Intermediate",
    codeExample: "public class CourseBatch {\n    public CourseBatch(String courseName, String... students) {\n        // students is treated as String[]\n    }\n}"
  },
  {
    question: "Can a method be recursive? Can a constructor be recursive?",
    shortAnswer: "Methods can be recursive with base cases. Constructors CANNOT be directly recursive via 'this()', as the compiler detects circular chaining and rejects it.",
    explanation: "A method can call itself conditionally. Constructor recursion via 'this()' is unconditionally circular, causing the compiler to flag 'recursive constructor invocation'.",
    hint: "Method recursion is legal; constructor circular this() is a compile error.",
    level: "Intermediate",
    codeExample: "// Method recursion: legal\nint fact(int n) { return n <= 1 ? 1 : n * fact(n - 1); }\n// Constructor recursion: illegal\nSample() { this(); } // COMPILE ERROR"
  },
  {
    question: "Can a constructor have the 'native' modifier in Java?",
    shortAnswer: "No. The 'native' modifier is prohibited on constructors by the Java Language Specification.",
    explanation: "Constructors manage Java Heap allocation protocols, object headers, and bytecode initialization sequences that cannot be implemented as pure C/C++ native functions.",
    hint: "Constructors cannot be native; methods can.",
    level: "Advanced",
    codeExample: "// Compile Error: modifier native not allowed here\n// public native Student();"
  },
  {
    question: "Why do factory methods like 'Student.createDefault()' exist if we already have constructors?",
    shortAnswer: "Static factory methods provide descriptive names, can return cached or existing instances, and can return subtypes, unlike constructors.",
    explanation: "Constructors are locked to their class name and always allocate a new object. Static factory methods (e.g. 'Integer.valueOf()') allow caching, descriptive names, and polymorphic return types.",
    hint: "Descriptive names, caching, and subtype flexibility.",
    level: "Advanced",
    codeExample: "public static Student createScholarshipStudent(String name) {\n    return new Student(name, 100.0, true);\n}"
  },
  {
    question: "In what order do Instance Initialization Blocks (IIBs) execute relative to Constructors and Methods?",
    shortAnswer: "IIBs execute on every object instantiation immediately before the constructor body runs. Methods execute only when explicitly called thereafter.",
    explanation: "The compiler copies IIB bytecode into the start of each constructor right after the 'super()' call. Methods only execute when invoked on the completed reference.",
    hint: "super() → IIB → Constructor Body → Methods (when called).",
    level: "Intermediate",
    codeExample: "class Demo {\n    { System.out.println(\"IIB\"); }\n    Demo() { System.out.println(\"Constructor\"); }\n    void run() { System.out.println(\"Method\"); }\n}"
  },
  {
    question: "What is the key takeaway for students in Barrackpore when comparing constructors and methods?",
    shortAnswer: "A constructor is the birth certificate and architect of an object (runs once to build invariants); methods are the daily skills and actions the object performs throughout its life.",
    explanation: "Remember Sukanta Hui's analogy: When Swadeep registers at Barrackpore hub, the Constructor issues his ID and locks his initial state. His daily submissions and marks calculations are Methods invoked across the year.",
    hint: "Birth & identity (Constructor) vs lifelong actions (Methods).",
    level: "Beginner",
    codeExample: "Student s = new Student(\"Swadeep\", 101); // Birth\ns.submitAssignment(); // Action"
  },
  {
    question: "Can a constructor return 'null'?",
    shortAnswer: "No. A constructor cannot specify a return statement with a value, nor can it return 'null'.",
    explanation: "Writing 'return null;' inside a constructor is a compile-time error. You can use 'return;' with no value to exit early, which returns the newly constructed instance.",
    hint: "Return statement with value is prohibited in constructors.",
    level: "Beginner",
    codeExample: "public Student() {\n    if (someCondition) return; // Legal early exit\n    // return null; // ILLEGAL: Compile error\n}"
  },
  {
    question: "How does garbage collection perceive an object initialized by a constructor vs modified by methods?",
    shortAnswer: "GC does not care how an object was initialized or modified; it reclaims any object that becomes unreachable from GC Roots.",
    explanation: "The constructor allocates memory and populates references. Methods may mutate fields or detach sub-objects. GC continuously traces root references regardless of member types.",
    hint: "Reachability from GC roots dictates garbage collection.",
    level: "Intermediate",
    codeExample: "Student s = new Student(); // Live on Heap\ns = null; // Unreachable, eligible for GC"
  },
  {
    question: "Can a private method be called inside a constructor?",
    shortAnswer: "Yes, constructors can freely invoke private helper methods of the same class to modularize complex validation or calculation logic.",
    explanation: "Using private final methods for internal validation is a clean code best practice, keeping constructor bodies concise and readable.",
    hint: "Private helper methods in constructors are clean practice.",
    level: "Intermediate",
    codeExample: "public Student(String email) {\n    this.email = validateEmail(email);\n}\nprivate String validateEmail(String e) { /* validation logic */ return e; }"
  },
  {
    question: "Summarize the 10 core differences between Java Constructors and Methods.",
    shortAnswer: "1. Purpose (Init vs Behavior), 2. Trigger (new vs dot), 3. Return type (None vs Mandatory), 4. Name (Class name vs CamelCase), 5. Inheritance (No vs Yes), 6. Overriding (No vs Yes), 7. Default synthesis (Yes if zero vs Never), 8. static (Prohibited vs Allowed), 9. Modifiers (Access only vs all), 10. Opcode (invokespecial vs invokevirtual).",
    explanation: "Mastering these 10 distinctions provides rock-solid foundation for enterprise Java OOP architecture, design patterns, and JVM bytecode mechanics.",
    hint: "10-point architectural matrix.",
    level: "Expert",
    codeExample: "// Full comparison table implemented in Topic 2"
  }
];

export default topic2_questions;
