/**
 * ============================================================================
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 1: Rules of Writing Constructors: Name Matches Class, No Return Type
 * High-Yield Technical Interview & Academic Q&A Catalog (30 Questions)
 * ============================================================================
 *
 * Educator: Sukanta Hui
 * Academic Centres: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 * ============================================================================
 */

const topic1_questions = [
  {
    question: "What are the two mandatory syntax rules for declaring a Constructor in Java?",
    shortAnswer: "1. The constructor name MUST exactly match the class name (case-sensitive). 2. It MUST NOT declare any return type (not even 'void').",
    explanation: "Unlike methods, constructors have no return type and share the exact identifier of their enclosing class. Violating either rule causes a compile error or converts the constructor into a regular method.",
    hint: "Exact class name + No return type.",
    level: "Beginner",
    codeExample: "public class Trainee {\n    public Trainee() { /* Valid Constructor */ }\n}"
  },
  {
    question: "What happens if you accidentally add 'void' as the return type to a constructor?",
    shortAnswer: "It ceases to be a constructor and becomes a standard instance method that is NEVER executed by the 'new' operator.",
    explanation: "Writing 'public void Student()' defines a regular method named Student. When 'new Student()' is executed, the JVM calls the compiler's default no-arg constructor, leaving your initialization logic untouched!",
    hint: "Adding 'void' creates a regular method, not a constructor.",
    level: "Beginner",
    codeExample: "// THE VOID TRAP:\npublic void Student() { this.name = \"Swadeep\"; } // Method! Never runs during 'new Student()'"
  },
  {
    question: "Is constructor naming in Java case-sensitive?",
    shortAnswer: "Yes! Java is strictly case-sensitive. The constructor name must match the class name with exact casing.",
    explanation: "If the class is named 'StudentAccount', writing 'public studentaccount()' results in a compile-time error: 'invalid method declaration; return type required' (because javac thinks it's a method without a return type).",
    hint: "Exact case matching is mandatory.",
    level: "Beginner",
    codeExample: "// Class: public class StudentAccount {}\n// Valid:   public StudentAccount() {}\n// Invalid: public studentAccount() {} // Compile error!"
  },
  {
    question: "Which Access Modifiers can be applied to a constructor in Java?",
    shortAnswer: "All 4 standard access modifiers: public, protected, package-private (no modifier), and private.",
    explanation: "Constructor visibility controls who is permitted to instantiate the class. Public allows universal instantiation; protected allows same package + subclasses; package-private allows same package; private restricts to the class itself.",
    hint: "All 4 access modifiers: public, protected, default, private.",
    level: "Beginner",
    codeExample: "public Student() {}\nprotected Student(int id) {}\nStudent(String name) {}\nprivate Student(long ssn) {}"
  },
  {
    question: "Why does the Java compiler prohibit the 'static' modifier on constructors?",
    shortAnswer: "Because a constructor's fundamental purpose is to initialize a specific 'this' instance on the Heap, while static members execute without any instance context.",
    explanation: "Constructors operate directly on the newly allocated Heap instance referenced by 'this'. Since static members have no 'this' pointer, marking a constructor static is impossible.",
    hint: "Constructors initialize 'this'; static has no 'this'.",
    level: "Intermediate",
    codeExample: "// Compile Error: public static Student() {} // modifier static not allowed here"
  },
  {
    question: "Why does the Java compiler prohibit the 'final' modifier on constructors?",
    shortAnswer: "Because 'final' prevents method overriding in subclasses, but constructors are NEVER inherited or overridden in the first place.",
    explanation: "Since constructors cannot be inherited or overridden by child classes, applying 'final' is redundant and syntactically prohibited.",
    hint: "Constructors cannot be overridden, making 'final' illegal.",
    level: "Beginner",
    codeExample: "// Compile Error: public final Student() {} // modifier final not allowed here"
  },
  {
    question: "Why does the Java compiler prohibit the 'abstract' modifier on constructors?",
    shortAnswer: "Because abstract methods have no execution body, but an object cannot be constructed without an executing body to initialize allocated Heap memory.",
    explanation: "Constructors must contain executable initialization bytecode. Declaring an abstract constructor would leave the newly allocated memory uninitialized, violating JVM safety.",
    hint: "Constructors must have bodies to initialize memory.",
    level: "Beginner",
    codeExample: "// Compile Error: public abstract Student(); // modifier abstract not allowed here"
  },
  {
    question: "Why does the Java compiler prohibit the 'synchronized' modifier on constructors?",
    shortAnswer: "Because only the thread executing 'new' has access to the newly allocated instance until construction finishes, making synchronization locks redundant.",
    explanation: "While an object is undergoing construction, no other thread holds a reference to it. The creating thread has exclusive access, so acquiring an object monitor is unnecessary.",
    hint: "Constructing thread already has exclusive access.",
    level: "Advanced",
    codeExample: "// Compile Error: public synchronized Student() {} // modifier synchronized not allowed here"
  },
  {
    question: "Can a constructor be declared with 'native' or 'strictfp' modifiers?",
    shortAnswer: "No! Neither 'native' nor 'strictfp' is permitted on constructors in modern Java.",
    explanation: "Constructors must be implemented in Java bytecode (not native C/C++ libraries), so 'native' is prohibited. 'strictfp' on individual methods/constructors was deprecated/removed in Java 17.",
    hint: "Native and strictfp are prohibited on constructors.",
    level: "Advanced",
    codeExample: "// Compile Error: public native Student();"
  },
  {
    question: "Can a constructor have parameters with the EXACT same names as the instance variables?",
    shortAnswer: "Yes! This is standard Java idiom, and the 'this.' keyword is used to disambiguate the field from the parameter.",
    explanation: "When parameter names shadow instance fields ('public Student(int id) { this.id = id; }'), 'this.id' refers to the Heap instance variable, while 'id' refers to the parameter.",
    hint: "Use 'this.' to resolve variable shadowing.",
    level: "Beginner",
    codeExample: "public Trainee(int rollNumber, String studentName) {\n    this.rollNumber = rollNumber;\n    this.studentName = studentName;\n}"
  },
  {
    question: "Can a constructor invoke instance methods of the same class?",
    shortAnswer: "Yes! However, it should only invoke 'final' or 'private' methods to prevent subclasses from executing overridden methods on uninitialized child state.",
    explanation: "Calling an overridable method inside a constructor allows a subclass to execute its override BEFORE the subclass constructor has run, causing NullPointerExceptions.",
    hint: "Only invoke private or final methods from constructors.",
    level: "Advanced",
    codeExample: "public Account(double bal) { validateBalancePrivate(bal); this.balance = bal; }"
  },
  {
    question: "Can a constructor contain a 'return' statement without a value?",
    shortAnswer: "Yes! A plain 'return;' statement is completely legal in a constructor to terminate execution early.",
    explanation: "Writing 'return;' exits the constructor body early. However, writing 'return value;' (returning a value) is a compile-time error.",
    hint: "Plain 'return;' is valid; returning a value is illegal.",
    level: "Intermediate",
    codeExample: "public Student(int score) {\n    if (score < 0) return; // Early exit (Legal!)\n    this.score = score;\n}"
  },
  {
    question: "What happens if a developer writes 'return 10;' inside a constructor?",
    shortAnswer: "A compile-time error occurs: 'cannot return a value from a constructor'.",
    explanation: "Constructors have no return type and cannot return expressions or values. The only value produced by a constructor expression is the object reference managed by the JVM.",
    hint: "Returning any expression from a constructor is a compile error.",
    level: "Beginner",
    codeExample: "// Compile Error: public Student() { return 10; }"
  },
  {
    question: "Can a constructor be invoked directly on an existing object like a method (e.g. 'obj.Student()')?",
    shortAnswer: "No! Constructors can NEVER be called explicitly on an object reference after instantiation.",
    explanation: "Constructors are invoked ONLY during object birth via 'new', or via constructor chaining ('this(...)' / 'super(...)'). You cannot re-invoke a constructor on an already existing object.",
    hint: "Constructors cannot be called on existing object instances.",
    level: "Beginner",
    codeExample: "Student s = new Student();\n// s.Student(); // COMPILE ERROR: cannot find symbol method Student()"
  },
  {
    question: "How does the Java compiler differentiate between a class constructor and an instance method named identically to the class?",
    shortAnswer: "By the presence or absence of a return type. A constructor has NO return type; a method MUST declare a return type (e.g. void, int, String).",
    explanation: "If a method signature declares a return type (e.g. 'public void Student()'), javac registers it in the method table rather than the constructor '<init>' table.",
    hint: "Absence of return type indicates a constructor.",
    level: "Beginner",
    codeExample: "public Student() {}      // Constructor (<init> in bytecode)\npublic void Student() {} // Method (named Student in bytecode)"
  },
  {
    question: "Can a class have BOTH a constructor and a method with the EXACT same name?",
    shortAnswer: "Yes! Java allows declaring a method with the same name as the class (though it is considered terrible coding practice).",
    explanation: "Writing a method with the class's name compiles cleanly, but generates IDE compiler warnings ('Method name is same as class name') and causes massive confusion.",
    hint: "Compiles, but violates naming conventions and causes bugs.",
    level: "Intermediate",
    codeExample: "public class Demo {\n    public Demo() {}     // Constructor\n    public void Demo() {} // Method (terrible practice!)\n}"
  },
  {
    question: "What is the bytecode instruction used by the JVM to invoke a constructor?",
    shortAnswer: "'invokespecial'.",
    explanation: "Unlike normal virtual methods which use 'invokevirtual' (dynamic vtable dispatch), constructors use 'invokespecial' for static early binding to the class's '<init>' method.",
    hint: "invokespecial is used for constructor invocations.",
    level: "Advanced",
    codeExample: "// Bytecode: 4: invokespecial #1 // Method \"<init>\":()V"
  },
  {
    question: "What are the valid parameter types for a constructor?",
    shortAnswer: "Any valid Java type: primitives, object references, arrays, generics, functional interfaces, and varargs.",
    explanation: "Constructors have full parameter flexibility identical to normal methods, supporting any combination of data types required for initialization.",
    hint: "All primitive and reference types are supported.",
    level: "Beginner",
    codeExample: "public Profile(int id, String name, List<String> skills, Consumer<Profile> callback) { ... }"
  },
  {
    question: "Can a constructor have Generic Type Parameters (e.g. '<T> Student(T data)')?",
    shortAnswer: "Yes! Constructors can declare their own generic type parameters independently of the class's generic type parameters.",
    explanation: "You can write generic constructors that accept type-parameterized arguments, enhancing type safety during object construction.",
    hint: "Generic type parameters can be declared on constructors.",
    level: "Advanced",
    codeExample: "public class Container {\n    public <T> Container(T element) { ... }\n}"
  },
  {
    question: "What happens if a constructor is declared 'private' and a developer tries to instantiate it with 'new' from another class?",
    shortAnswer: "A compile-time error occurs: '<ConstructorName> has private access in <ClassName>'.",
    explanation: "Private access limits instantiation strictly to the declaring class. Outside callers cannot invoke 'new' on a private constructor.",
    hint: "Private constructors block external 'new' instantiations.",
    level: "Beginner",
    codeExample: "// Compile Error: 'Student() has private access in Student'"
  },
  {
    question: "Can a constructor declare checked exceptions in its 'throws' clause?",
    shortAnswer: "Yes! A constructor can declare any checked exception (e.g. throws IOException, SQLException).",
    explanation: "If object initialization requires opening a file or database connection that might fail, declaring checked exceptions on the constructor forces callers to wrap 'new' in try-catch.",
    hint: "Constructors can declare checked exceptions in 'throws' clause.",
    level: "Intermediate",
    codeExample: "public FileLogger(String path) throws IOException {\n    this.writer = new FileWriter(path);\n}"
  },
  {
    question: "If a parent class constructor throws a checked exception, what MUST the child constructor do?",
    shortAnswer: "The child constructor MUST declare the same checked exception or a broader superclass exception in its own 'throws' clause.",
    explanation: "Because the child constructor automatically invokes the parent constructor via 'super()', the child constructor cannot catch the parent exception during super() and must propagate it.",
    hint: "Child constructor must declare parent constructor exceptions.",
    level: "Advanced",
    codeExample: "class Parent { Parent() throws IOException {} }\nclass Child extends Parent { Child() throws IOException { super(); } }"
  },
  {
    question: "What is the visibility of the default constructor generated by the compiler?",
    shortAnswer: "It inherits the EXACT same access modifier as its enclosing class (public if class is public; default if class is default).",
    explanation: "If the class is declared 'public class Account', the compiler generates 'public Account()'. If the class has package-private access, the constructor has package-private access.",
    hint: "Default constructor matches class visibility.",
    level: "Intermediate",
    codeExample: "// 'public class Student {}' → Compiler generates: 'public Student() { super(); }'"
  },
  {
    question: "Can an abstract class have constructors?",
    shortAnswer: "Yes! Abstract classes have constructors to initialize inherited parent fields when subclasses are instantiated.",
    explanation: "Although abstract classes cannot be directly instantiated with 'new AbstractClass()', their constructors execute whenever a concrete child class is created via 'super()'.",
    hint: "Abstract classes have constructors invoked via super() by subclasses.",
    level: "Intermediate",
    codeExample: "abstract class Person {\n    private String name;\n    public Person(String name) { this.name = name; } // Subclass calls via super(name)\n}"
  },
  {
    question: "Can an Interface in Java have a constructor?",
    shortAnswer: "No! Interfaces cannot declare constructors under any circumstances.",
    explanation: "Interfaces do not maintain instance state or Heap memory layouts; they only define abstract contracts and static constants, so constructors are strictly forbidden.",
    hint: "Interfaces cannot have constructors.",
    level: "Beginner",
    codeExample: "// Compile Error in Interface: interface Worker { Worker(); } // Illegal in interface"
  },
  {
    question: "Can an Enum class in Java have 'public' or 'protected' constructors?",
    shortAnswer: "No! Enum constructors in Java are implicitly private and cannot be declared public or protected.",
    explanation: "Enum constants represent a fixed, compile-time set of instances. Allowing public enum constructors would permit creating unauthorized enum values with 'new'.",
    hint: "Enum constructors are strictly private.",
    level: "Intermediate",
    codeExample: "// Compile Error: enum Campus { BARRACKPORE; public Campus() {} } // Modifier public not allowed"
  },
  {
    question: "What is the difference between a Constructor and an Instance Initialization Block (IIB)?",
    shortAnswer: "A constructor runs for a specific parameter signature; an IIB runs for EVERY constructor before the constructor body executes.",
    explanation: "IIBs allow writing shared initialization code that applies uniformly across all constructors before any constructor-specific code runs.",
    hint: "IIB runs uniformly across all constructor invocations.",
    level: "Intermediate",
    codeExample: "class Student {\n    { System.out.println(\"IIB runs\"); }\n    Student() { System.out.println(\"Constructor runs\"); }\n}"
  },
  {
    question: "Why does the Java compiler flag 'this.constructorName()' as an error?",
    shortAnswer: "Because constructors are not methods; to call another constructor in the same class, the keyword 'this(...)' must be used.",
    explanation: "Writing 'this.Student()' attempts to call a method named Student. To invoke a constructor, write 'this()' or 'this(arg)'.",
    hint: "Use 'this(...)', not 'this.ClassName()'.",
    level: "Beginner",
    codeExample: "// WRONG: this.Student(\"Swadeep\");\n// CORRECT: this(\"Swadeep\");"
  },
  {
    question: "What is the order of execution between Field Initializers, IIBs, and Constructor Body?",
    shortAnswer: "1. Field Initializers & IIBs execute in textual order → 2. Constructor body executes.",
    explanation: "When 'new' runs, instance field default assignments and IIBs run in the order they appear in source code, followed immediately by the body of the constructor.",
    hint: "Field initializers + IIBs run before constructor body.",
    level: "Intermediate",
    codeExample: "int x = 10; // 1. Runs first\n{ x = 20; }  // 2. Runs second (IIB)\nDemo() { x = 30; } // 3. Runs third (Constructor)"
  },
  {
    question: "What is Sukanta Hui's Law of Constructor Purity at the Barrackpore Academy?",
    shortAnswer: "A constructor is not a method; it has no return type, bears the proud name of its class, and exists solely to forge a valid living object in memory.",
    explanation: "At the Barrackpore campus, Sukanta Hui teaches that constructor purity is the cornerstone of robust object architecture. Respect the 5 golden rules, never poison a constructor with 'void', and ensure every instance is forged with validated state and unshakeable domain truth.",
    hint: "Exact name match, zero return type, unshakeable domain truth.",
    level: "Beginner",
    codeExample: "// Sukanta Hui's Constructor Rule Checklist: Exact Name + No Return Type + Invariant Validation"
  }
];

export default topic1_questions;
