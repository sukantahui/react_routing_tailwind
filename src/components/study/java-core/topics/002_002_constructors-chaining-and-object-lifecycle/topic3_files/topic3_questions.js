const topic3_questions = [
  {
    question: "What is a default constructor in Java?",
    shortAnswer: "A no-argument constructor synthesized by the compiler if and only if no constructor of any kind is explicitly defined in the class.",
    explanation: "If a class source file contains zero constructors, javac automatically generates a public no-arg constructor that calls 'super()'.",
    hint: "Synthesized by compiler when zero constructors exist.",
    level: "Beginner",
    codeExample: "class Student { } // Compiler adds: public Student() { super(); }"
  },
  {
    question: "What default values does the default constructor assign to instance fields?",
    shortAnswer: "Numerical types = 0/0.0, boolean = false, char = '\\u0000', and reference types = null.",
    explanation: "The default constructor executes JVM memory zeroing, populating all instance variables with standard JVM default values.",
    hint: "Primitives to 0/false; objects to null.",
    level: "Beginner",
    codeExample: "int i; // 0\nboolean b; // false\nString s; // null"
  },
  {
    question: "What is the access modifier of a compiler-generated default constructor?",
    shortAnswer: "It inherits the exact access modifier of its declaring class (public if class is public, package-private if class is package-private).",
    explanation: "If the class is declared 'public class Account', the generated constructor is 'public Account()'. If declared 'class Account', it is 'Account()'.",
    hint: "Matches the visibility of the declaring class.",
    level: "Intermediate",
    codeExample: "public class Trainee {} // Constructor is public\nclass Trainee {} // Constructor is package-private"
  },
  {
    question: "What is the difference between a default constructor and a no-argument constructor?",
    shortAnswer: "A default constructor is specifically compiler-generated when none is written. A user-defined no-arg constructor is explicitly written by the developer.",
    explanation: "While both take 0 arguments, the term 'default constructor' strictly refers to the automatic compiler synthesis, whereas 'no-arg constructor' encompasses developer-written versions.",
    hint: "Compiler synthesized vs developer written.",
    level: "Beginner",
    codeExample: "public Student() { this.hub = \"Barrackpore\"; } // User-defined no-arg"
  },
  {
    question: "What bytecode statement does the compiler inject into the default constructor body?",
    shortAnswer: "It injects a call to the superclass no-arg constructor: 'super();'.",
    explanation: "Every constructor in Java must initialize its parent hierarchy. The default constructor automatically begins with 'invokespecial Object.<init>()V'.",
    hint: "super() call to the superclass constructor.",
    level: "Advanced",
    codeExample: "public MyClass() {\n    super(); // Injected automatically\n}"
  },
  {
    question: "Can a default constructor be generated if the class has a private constructor?",
    shortAnswer: "No. Defining any constructor (even private) stops the compiler from generating the default constructor.",
    explanation: "The presence of any explicit constructor halts compiler synthesis.",
    hint: "Any constructor prevents default generation.",
    level: "Beginner",
    codeExample: "class Singleton { private Singleton() {} } // Zero default constructor"
  },
  {
    question: "What error occurs when a caller attempts 'new MyClass()' on a class with only a parameterized constructor?",
    shortAnswer: "Compilation error: 'constructor MyClass in class MyClass cannot be applied to given types; required: parameters; found: no arguments'.",
    explanation: "Because a parameterized constructor was defined, no default constructor exists to satisfy the no-arg invocation.",
    hint: "Cannot find symbol / cannot be applied to given types.",
    level: "Beginner",
    codeExample: "class Student { Student(String n) {} }\n// Student s = new Student(); // COMPILE ERROR"
  },
  {
    question: "Why should developers explicitly declare a no-arg constructor when building JavaBeans or Framework entities?",
    shortAnswer: "Frameworks like Spring, Hibernate, and Jackson use reflection ('Class.getDeclaredConstructor().newInstance()') requiring a no-arg constructor.",
    explanation: "Without a no-arg constructor, ORM and serialization frameworks fail to instantiate domain entity instances reflectively.",
    hint: "Reflection and ORM frameworks require no-arg constructors.",
    level: "Advanced",
    codeExample: "@Entity\npublic class StudentEntity {\n    public StudentEntity() {} // Required by JPA/Hibernate\n}"
  },
  {
    question: "Does the compiler generate a default constructor for an enum in Java?",
    shortAnswer: "No. Enum constructors are always private and synthesized specially by javac.",
    explanation: "Enums cannot be instantiated via 'new' and have private constructor mechanisms handled by java.lang.Enum.",
    hint: "Enums have private constructors managed by JVM.",
    level: "Intermediate",
    codeExample: "enum Hub { BARRACKPORE, NAIHATI; }"
  },
  {
    question: "Does the compiler generate a default constructor for a record in Java 14+?",
    shortAnswer: "No. Records receive a canonical constructor that matches all record components.",
    explanation: "Records automatically generate a canonical constructor matching their header component list rather than a 0-arg default constructor.",
    hint: "Records generate canonical constructors for their components.",
    level: "Intermediate",
    codeExample: "public record Student(String name, int roll) {}"
  },
  {
    question: "Can a user-defined no-arg constructor be marked 'private'?",
    shortAnswer: "Yes. Making the no-arg constructor private prevents external instantiation (used in Singletons and Utility classes).",
    explanation: "A private no-arg constructor ensures only methods within the class can instantiate it.",
    hint: "Private no-arg prevents outside instantiation.",
    level: "Intermediate",
    codeExample: "public class MathUtils {\n    private MathUtils() {} // Prevents 'new MathUtils()'\n}"
  },
  {
    question: "What happens if a parent class does NOT have an accessible no-arg constructor?",
    shortAnswer: "Subclasses will fail to compile unless their constructors explicitly invoke an accessible parameterized parent constructor via 'super(...)'.",
    explanation: "Subclass constructors implicitly attempt 'super()'. If the parent lacks a no-arg constructor, compilation fails.",
    hint: "Implicit super() fails if parent has no accessible no-arg constructor.",
    level: "Advanced",
    codeExample: "class Parent { Parent(int x) {} }\nclass Child extends Parent {\n    Child() { super(10); } // Explicit super required!\n}"
  },
  {
    question: "How does default constructor initialization differ from field inline initialization?",
    shortAnswer: "Inline field initializations (e.g. 'int x = 100;') are copied by javac into the constructor body right after 'super()'.",
    explanation: "The compiler moves field initializers and instance initialization blocks directly into the '<init>' method.",
    hint: "Field initializers are merged into the constructor bytecode.",
    level: "Advanced",
    codeExample: "int x = 100; // Inlined into <init> after super()"
  },
  {
    question: "Can you provide custom logic inside a compiler-generated default constructor?",
    shortAnswer: "No. Compiler-generated constructors only contain 'super()'. For custom logic, write an explicit constructor.",
    explanation: "The compiler never synthesizes custom business rules; you must author an explicit constructor.",
    hint: "Write an explicit constructor for custom logic.",
    level: "Beginner",
    codeExample: "public Student() {\n    System.out.println(\"Custom logic here\");\n}"
  },
  {
    question: "Is it possible for a class to have BOTH a default constructor and a parameterized constructor?",
    shortAnswer: "No. Once you write a parameterized constructor, the 'default' constructor disappears; you must explicitly code a user-defined no-arg constructor.",
    explanation: "A class can have both a no-arg constructor and a parameterized constructor, but the no-arg constructor is now user-defined, not compiler-default.",
    hint: "User-defined no-arg alongside parameterized constructor.",
    level: "Intermediate",
    codeExample: "class Student {\n    Student() {} // User-defined no-arg\n    Student(String name) {} // Parameterized\n}"
  },
  {
    question: "Can a default constructor throw checked exceptions?",
    shortAnswer: "A compiler-generated default constructor throws checked exceptions if and only if the superclass constructor declares 'throws Exception'.",
    explanation: "Since the default constructor injects 'super()', it inherits the throws clause of the parent's no-arg constructor.",
    hint: "Inherits parent constructor checked exceptions.",
    level: "Expert",
    codeExample: "class Parent { Parent() throws IOException {} }\nclass Child extends Parent {} // Child's default constructor declares 'throws IOException'"
  },
  {
    question: "Does creating an array of objects invoke the default constructor?",
    shortAnswer: "No! 'new Student[10]' only allocates an array of 10 null references in the Heap; zero Student constructors execute.",
    explanation: "Array allocation creates an array container. Individual element constructors must be invoked explicitly in a loop.",
    hint: "Array creation allocates references initialized to null.",
    level: "Beginner",
    codeExample: "Student[] arr = new Student[5]; // 0 constructors executed!\narr[0] = new Student(); // 1 constructor executed"
  },
  {
    question: "What is the return type of the default constructor at bytecode level?",
    shortAnswer: "At the JVM bytecode level, constructors are '<init>' methods with a 'void' ('V') descriptor.",
    explanation: "The method signature in bytecode is 'void <init>()', invoked via 'invokespecial' on the allocated object reference.",
    hint: "<init>()V descriptor in bytecode.",
    level: "Expert",
    codeExample: "// Method Student.<init>:()V"
  },
  {
    question: "Why does Java enforce parent constructor invocation in every constructor?",
    shortAnswer: "To guarantee that the parent object state and invariants are fully established before the subclass adds its own specialized state.",
    explanation: "Inheritance is an 'is-a' relationship; a Child object cannot exist safely without its Parent foundation initialized.",
    hint: "Parent invariants must be established first.",
    level: "Intermediate",
    codeExample: "// super() guarantees base class readiness"
  },
  {
    question: "How does default constructor initialization handle 'final' instance variables?",
    shortAnswer: "If a final field has no inline initializer and only a compiler default constructor exists, javac issues a compile error: 'variable might not have been initialized'.",
    explanation: "Final fields must be assigned exactly once. The compiler default constructor does not know what value to assign.",
    hint: "Blank final fields must be assigned explicitly.",
    level: "Intermediate",
    codeExample: "class Demo { final int x; } // COMPILE ERROR: variable x not initialized"
  },
  {
    question: "What is the classroom takeaway for Sukanta Hui's students regarding default constructors?",
    shortAnswer: "The compiler is generous: it gives you a free no-arg constructor only while you write zero constructors. The moment you write even one parameterized constructor, the free gift is revoked!",
    explanation: "Always remember: if you write a custom constructor for Swadeep or Tuhina, you must explicitly code a no-arg constructor if you still want 'new Student()'.",
    hint: "Free gift revoked upon writing any constructor.",
    level: "Beginner",
    codeExample: "// Write Student() {} manually whenever adding Student(name)"
  },
  {
    question: "Can an abstract class have a compiler-generated default constructor?",
    shortAnswer: "Yes. If an abstract class contains zero constructors, javac synthesizes a default constructor (protected or package-private/public) invoked by subclasses.",
    explanation: "Subclass constructors call 'super()' which targets the abstract class's default constructor.",
    hint: "Abstract classes have default constructors for subclass super() calls.",
    level: "Intermediate",
    codeExample: "abstract class Shape {} // Compiler creates Shape() { super(); }"
  },
  {
    question: "Can the default constructor be called using reflection?",
    shortAnswer: "Yes, via 'Class.forName(\"MyClass\").getDeclaredConstructor().newInstance()'.",
    explanation: "Reflection accesses the synthesized '<init>' method and instantiates the class at runtime.",
    hint: "getDeclaredConstructor().newInstance().",
    level: "Intermediate",
    codeExample: "Student s = Student.class.getDeclaredConstructor().newInstance();"
  },
  {
    question: "What is the difference between Heap allocation and constructor execution?",
    shortAnswer: "Heap allocation is done by 'new' (zeroing memory bytes); constructor execution fills those bytes with valid initial application state.",
    explanation: "'new' allocates memory in Eden Space. '<init>' runs immediately afterwards to configure fields.",
    hint: "Allocation (bytes) vs Initialization (state).",
    level: "Advanced",
    codeExample: "// new = allocate raw memory; () = run constructor"
  },
  {
    question: "What happens if the default constructor invokes an overridden method in a subclass?",
    shortAnswer: "The subclass method runs against uninitialized subclass fields, seeing default null/0 values.",
    explanation: "This is the classic constructor polymorphism trap: parent constructor executes before child fields are initialized.",
    hint: "Child method runs before child fields are populated.",
    level: "Expert",
    codeExample: "class A { A() { test(); } void test() {} }\nclass B extends A { int v = 42; void test() { System.out.println(v); } } // Prints 0!"
  },
  {
    question: "Can a default constructor be inlined by the JVM JIT compiler?",
    shortAnswer: "Yes! HotSpot JIT aggressively inlines small constructors (especially default empty constructors) to eliminate method call overhead.",
    explanation: "Empty '<init>' calls are routinely optimized away by JIT compilation into zero-cost operations.",
    hint: "JIT inlines empty constructors for peak performance.",
    level: "Expert",
    codeExample: "// JIT optimization eliminates call overhead"
  },
  {
    question: "Does an anonymous inner class have a default constructor?",
    shortAnswer: "No. Anonymous inner classes do not have declared constructors; javac synthesizes an instance initializer block instead.",
    explanation: "Because anonymous classes have no name, they cannot declare constructors and use instance initializers to pass arguments to super.",
    hint: "Anonymous classes use instance initializers, not named constructors.",
    level: "Advanced",
    codeExample: "Runnable r = new Runnable() { public void run() {} };"
  },
  {
    question: "Can a default constructor execute when deserializing an object in Java?",
    shortAnswer: "For Serializable classes, the class's own constructor does NOT execute; only the nearest non-serializable superclass's no-arg constructor runs.",
    explanation: "Java deserialization restores state from byte streams directly into Heap fields, bypassing the class constructor.",
    hint: "Deserialization bypasses constructors for Serializable classes.",
    level: "Expert",
    codeExample: "// ObjectInputStream restores fields directly"
  },
  {
    question: "What is a 'synthetic' constructor generated by javac?",
    shortAnswer: "A package-private constructor with a dummy parameter generated by older javac versions to facilitate private inner class instantiation.",
    explanation: "Synthetic constructors were used before nestmates (Java 11) to allow outer/inner classes to access private constructors.",
    hint: "Compiler-generated bridge constructor for private inner classes.",
    level: "Expert",
    codeExample: "// Synthetic constructor: Outer$Inner(Outer, Outer$1)"
  },
  {
    question: "Summarize the default constructor lifecycle in one comprehensive sentence.",
    shortAnswer: "The default constructor is a zero-argument initializer provided automatically by javac to allocate default state and link to the superclass when no explicit constructors exist.",
    explanation: "It guarantees JVM object initialization integrity across the entire class hierarchy.",
    hint: "Guarantees zero-arg initialization and parent super() hierarchy.",
    level: "Beginner",
    codeExample: "// Automatic, 0-arg, calls super(), zeroed defaults."
  }
];

export default topic3_questions;