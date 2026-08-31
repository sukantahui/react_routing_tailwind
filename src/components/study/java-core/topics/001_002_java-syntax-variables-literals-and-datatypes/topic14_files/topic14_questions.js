/**
 * Topic 14: Defining immutable constants using the 'final' keyword
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What does the `final` keyword signify when applied to a variable in Java?",
    shortAnswer: "It makes the variable a single-assignment variable whose value or reference cannot be modified once initialized.",
    explanation: "A `final` variable is immutable in its binding. Any attempt to reassign a `final` variable after its initial assignment triggers a compile-time error.",
    hint: "Single assignment: write once, read forever.",
    level: "basic",
    codeExample: "final int maxAge = 100;\n// maxAge = 105; // COMPILATION ERROR: Cannot assign a value to final variable"
  },
  {
    question: "What is the standard naming convention for global compile-time constants in Java?",
    shortAnswer: "`UPPER_SNAKE_CASE` (all uppercase letters separated by underscores).",
    explanation: "According to Java Code Conventions, constants declared `public static final` should be named using uppercase letters with words separated by underscores (e.g. `MAX_CAPACITY`, `GST_RATE`).",
    hint: "UPPER_SNAKE_CASE like MAX_VALUE or PI.",
    level: "basic",
    codeExample: "public static final double PI = 3.141592653589793;\npublic static final int MAX_STUDENTS = 60;"
  },
  {
    question: "What is a 'Blank Final' variable in Java?",
    shortAnswer: "A `final` variable that is declared without an immediate initial value at its point of declaration.",
    explanation: "A blank final variable's assignment is deferred. A local blank final must be assigned exactly once before being read; an instance blank final must be initialized in every constructor.",
    hint: "Declared without an initial assignment.",
    level: "intermediate",
    codeExample: "final int x; // Blank final\nx = 10;      // First assignment (Legal)\n// x = 20;   // Second assignment (Illegal!)"
  },
  {
    question: "Where MUST an instance blank `final` field be initialized?",
    shortAnswer: "In an instance initializer block or in every constructor of the class.",
    explanation: "If an instance field is marked `final` and not initialized at declaration, the compiler verifies that every constructor path assigns a value to it exactly once.",
    hint: "Constructors must initialize all blank final instance fields.",
    level: "intermediate",
    codeExample: "class Student {\n  final int id;\n  Student(int id) {\n    this.id = id;\n  }\n}"
  },
  {
    question: "Where MUST a static blank `final` field be initialized?",
    shortAnswer: "In a `static` initialization block at the class level.",
    explanation: "Because static fields belong to the class rather than instances, a static blank final must be assigned either at declaration or within a `static { ... }` block before class loading finishes.",
    hint: "Static blocks initialize static blank finals.",
    level: "intermediate",
    codeExample: "class Config {\n  static final long REGISTRATION_ID;\n  static {\n    REGISTRATION_ID = 20260801L;\n  }\n}"
  },
  {
    question: "What is the difference between a `final` primitive variable and a `final` object reference?",
    shortAnswer: "For primitives, the value cannot change; for object references, the reference pointer cannot change, but the object's internal state may still be mutated.",
    explanation: "Marking `final int[] arr = {1, 2};` prevents `arr` from pointing to another array (`arr = new int[5]` is illegal), but `arr[0] = 99;` is perfectly legal because the array object's internal contents are mutable.",
    hint: "Final locks the reference pointer, not the referenced object's internals.",
    level: "intermediate",
    codeExample: "final StringBuilder sb = new StringBuilder(\"Hello\");\nsb.append(\" World\"); // Legal! Object mutated\n// sb = new StringBuilder(); // Illegal! Reference reassigned"
  },
  {
    question: "What is compile-time constant inlining (constant folding) in Java?",
    shortAnswer: "The compiler replaces references to `public static final` primitive/string constants with their literal values directly in the calling bytecode.",
    explanation: "If a constant is known at compile time (e.g. `public static final int TIMEOUT = 5000;`), `javac` copies the integer literal `5000` directly into every class that references `TIMEOUT`.",
    hint: "Compiler embeds constant values directly into call sites.",
    level: "advanced",
    codeExample: "// Class A:\npublic static final int VAL = 100;\n// Class B compiled bytecode embeds '100' directly, not a lookup to Class A.VAL"
  },
  {
    question: "What is the danger of compile-time constant inlining when updating libraries without recompiling clients?",
    shortAnswer: "Client classes retain the old inlined constant value even after the library class is updated with a new constant value.",
    explanation: "Because the compiler inlined the old literal into client `.class` files, simply replacing the library `.jar` without recompiling client code leaves stale constants in memory.",
    hint: "Stale constant values occur if dependent classes are not recompiled.",
    level: "advanced",
    codeExample: "// If GST_RATE changes from 0.18 to 0.20, all calling classes must be recompiled!"
  },
  {
    question: "Can a `final` parameter be reassigned inside a method body?",
    shortAnswer: "No, `final` method parameters are read-only and cannot be reassigned within the method.",
    explanation: "Declaring parameters as `final void process(final int id)` prevents accidental reassignment of argument variables inside complex method algorithms.",
    hint: "Final parameters are immutable inside the method.",
    level: "basic",
    codeExample: "void calculate(final double fee) {\n  // fee = fee * 0.9; // COMPILATION ERROR!\n  double discounted = fee * 0.9; // Correct\n}"
  },
  {
    question: "Can `final` local variables be used in Anonymous Inner Classes or Lambda Expressions?",
    shortAnswer: "Yes, variables captured by anonymous classes and lambdas must be explicitly `final` or effectively final.",
    explanation: "Since Java 8, variables that are not reassigned after initialization are 'effectively final' and can be safely accessed by closures and lambda expressions.",
    hint: "Effectively final variables are accessible in lambdas.",
    level: "intermediate",
    codeExample: "final String center = \"Barrackpore\";\nRunnable r = () → System.out.println(center);"
  },
  {
    question: "What happens if a constructor fails to initialize a blank final instance field?",
    shortAnswer: "The Java compiler generates an error: 'variable [fieldName] might not have been initialized'.",
    explanation: "Java guarantees that no object can exist with an uninitialized `final` field.",
    hint: "Definite assignment rule enforced at compile-time.",
    level: "intermediate",
    codeExample: "class User {\n  final String email;\n  User() { } // ERROR: variable email might not have been initialized\n}"
  },
  {
    question: "Can a constructor initialize a `final` field more than once?",
    shortAnswer: "No, multiple assignments to a final field inside a constructor cause a compile error.",
    explanation: "Even inside a constructor, a `final` variable can only be assigned once.",
    hint: "Single assignment applies inside constructors too.",
    level: "basic",
    codeExample: "class Test {\n  final int x;\n  Test() {\n    x = 10;\n    // x = 20; // ERROR: variable x might already have been assigned\n  }\n}"
  },
  {
    question: "Can a `final` variable be initialized inside an `if-else` block?",
    shortAnswer: "Yes, provided the compiler can guarantee that exactly one branch executes and assigns the variable.",
    explanation: "Definite assignment analysis permits blank finals in `if-else` ladders as long as every possible execution path assigns the variable exactly once.",
    hint: "Every branch must assign the variable exactly once.",
    level: "intermediate",
    codeExample: "final String status;\nif (score >= 40) {\n  status = \"Pass\";\n} else {\n  status = \"Fail\";\n}"
  },
  {
    question: "What is the difference between `final`, `finally`, and `finalize` in Java?",
    shortAnswer: "`final` is a keyword/modifier; `finally` is a cleanup block in exception handling; `finalize` is a deprecated cleanup method on `Object`.",
    explanation: "This is a classic Java interview question: `final` declares immutable variables/methods/classes; `finally` guarantees code execution after try-catch; `finalize()` was the legacy pre-GC cleanup hook.",
    hint: "Modifier vs Exception Block vs Object Method.",
    level: "basic",
    codeExample: "// final: constant variable\n// try { } finally { cleanup(); }\n// finalize(): deprecated GC method"
  },
  {
    question: "What does the `final` keyword do when applied to a class?",
    shortAnswer: "Prevents the class from being extended (subclassed/inherited).",
    explanation: "A `final class` cannot have any child subclasses (e.g. `java.lang.String` and `java.lang.Math` are final classes to preserve security and immutability).",
    hint: "Final classes cannot be inherited.",
    level: "intermediate",
    codeExample: "final class SecurityVault { }\n// class SubVault extends SecurityVault { } // COMPILATION ERROR"
  },
  {
    question: "What does the `final` keyword do when applied to a method?",
    shortAnswer: "Prevents child subclasses from overriding the method.",
    explanation: "Marking a method `final` locks its implementation, guaranteeing that polymorphic subclasses cannot alter its core algorithmic behavior.",
    hint: "Final methods cannot be overridden.",
    level: "intermediate",
    codeExample: "class Parent {\n  final void coreSecurityCheck() { }\n}"
  },
  {
    question: "Are all methods inside a `final` class automatically `final`?",
    shortAnswer: "Yes, implicitly, because the class cannot be subclassed, no method can ever be overridden.",
    explanation: "Because inheritance is blocked for the entire class, all instance methods in a `final` class are implicitly non-overridable.",
    hint: "No subclasses means no method overriding is possible.",
    level: "advanced",
    codeExample: "final class MathUtils {\n  void calculate() { } // Implicitly final\n}"
  },
  {
    question: "Are fields in a `final` class automatically `final`?",
    shortAnswer: "No, fields in a final class remain mutable unless explicitly declared with the `final` modifier.",
    explanation: "Making a class `final` only restricts inheritance; it does not alter the mutability of its member fields.",
    hint: "Field immutability requires explicit final on each field.",
    level: "intermediate",
    codeExample: "final class Student {\n  int age = 20; // Mutable! student.age = 21 is allowed\n}"
  },
  {
    question: "Can an `abstract` method or `abstract` class be declared `final`?",
    shortAnswer: "No, `abstract` and `final` are mutually exclusive opposing concepts and cause a compilation error.",
    explanation: "`abstract` requires that a class or method be extended/implemented by a subclass, whereas `final` forbids inheritance and overriding.",
    hint: "Abstract demands inheritance; final forbids inheritance.",
    level: "basic",
    codeExample: "// final abstract class Bad { } // COMPILER ERROR: Illegal combination of modifiers"
  },
  {
    question: "Are interface fields implicitly `public static final`?",
    shortAnswer: "Yes, every field declared in an interface is implicitly `public static final`.",
    explanation: "Interfaces define pure contracts and cannot hold mutable instance state. Any variable declared in an interface is an immutable constant.",
    hint: "Interface fields are always constants.",
    level: "intermediate",
    codeExample: "interface Constants {\n  int MAX = 100; // Implicitly public static final int MAX = 100;\n}"
  },
  {
    question: "How does `final` assist the Java JIT compiler with performance optimization?",
    shortAnswer: "It allows the JIT compiler to perform method inlining, dead code elimination, and devirtualization.",
    explanation: "When a method or class is `final`, the JVM knows no subclass can override it. The JIT compiler can replace polymorphic virtual table lookups with direct inlined machine code.",
    hint: "Devirtualization and method inlining boost performance.",
    level: "advanced",
    codeExample: "// JIT inlines final methods directly at call sites"
  },
  {
    question: "Can a `final` variable be initialized in an instance initialization block `{ ... }`?",
    shortAnswer: "Yes, an instance blank final can be assigned once in an instance initializer block.",
    explanation: "Instance initialization blocks run before constructors during object creation, providing an alternative place to compute complex final field values.",
    hint: "Instance initializer blocks run during object construction.",
    level: "advanced",
    codeExample: "class Data {\n  final long timestamp;\n  {\n    timestamp = System.currentTimeMillis();\n  }\n}"
  },
  {
    question: "Can you create an unmodifiable list in Java using `final`?",
    shortAnswer: "`final List<String> list` prevents reassigning the list reference, but `list.add(\"item\")` is still possible; use `List.of()` or `Collections.unmodifiableList()` for true content immutability.",
    explanation: "To achieve complete immutability, combine `final` reference declaration with an unmodifiable collection implementation (`List.of(...)`).",
    hint: "Final reference + List.of() = true collection immutability.",
    level: "intermediate",
    codeExample: "final List<String> immutable = List.of(\"Barrackpore\", \"Kolkata\");\n// immutable.add(\"Naihati\"); // Throws UnsupportedOperationException!"
  },
  {
    question: "What is an Immutable Class pattern in Java?",
    shortAnswer: "A class whose instances cannot be modified after creation (e.g. `String`, `Integer`, `LocalDate`).",
    explanation: "To build an immutable class: 1) Declare class `final`, 2) Make all fields `private final`, 3) Provide no setters, 4) Initialize all state in constructor, 5) Make defensive copies of mutable objects.",
    hint: "Private final fields, no setters, defensive copies.",
    level: "advanced",
    codeExample: "public final class Point {\n  private final int x, y;\n  public Point(int x, int y) { this.x = x; this.y = y; }\n  public int getX() { return x; }\n  public int getY() { return y; }\n}"
  },
  {
    question: "What is the result of using `final` on a loop variable in an enhanced for-loop?",
    shortAnswer: "It makes the iteration variable immutable within each loop iteration body.",
    explanation: "`for (final String s : list)` re-declares a fresh `final` variable `s` for each element in the collection, preventing accidental modification of `s` inside the loop body.",
    hint: "Fresh final variable created per iteration.",
    level: "intermediate",
    codeExample: "for (final String student : students) {\n  // student = \"New\"; // COMPILATION ERROR\n  System.out.println(student);\n}"
  },
  {
    question: "Can a `final` local variable be declared in a standard `for` loop (e.g. `for (final int i = 0; i < 10; i++)`)?",
    shortAnswer: "No, because `i++` attempts to reassign the `final` variable on the second iteration, causing a compile error.",
    explanation: "In a standard `for` loop, the index variable `i` is declared once and modified on each step. Marking `i` as `final` prevents `i++` from executing.",
    hint: "i++ violates final immutability.",
    level: "basic",
    codeExample: "// for (final int i = 0; i < 10; i++) { } // COMPILATION ERROR on i++"
  },
  {
    question: "What is the keyword in Java to create immutable data carriers since Java 14/16?",
    shortAnswer: "`record`.",
    explanation: "Java Records (`record Student(int id, String name) { }`) automatically create final classes with `private final` fields, canonical constructors, getters, `equals()`, `hashCode()`, and `toString()`.",
    hint: "Java Records provide built-in immutable data classes.",
    level: "advanced",
    codeExample: "public record Student(int id, String name) { }"
  },
  {
    question: "Can the `final` modifier be applied to a constructor in Java?",
    shortAnswer: "No, constructors cannot be declared `final`.",
    explanation: "Constructors are not inherited and cannot be overridden in child classes, so applying `final` to a constructor is illegal syntax in Java.",
    hint: "Constructors are never inherited, so final modifier is meaningless.",
    level: "basic",
    codeExample: "// final Student() { } // COMPILATION ERROR: Modifier final not allowed here"
  },
  {
    question: "Can a `final` field be accessed before it is initialized in a constructor?",
    shortAnswer: "No, reading a blank final field before its assignment produces a compile error: 'variable might not have been initialized'.",
    explanation: "Java's strict definite assignment rules ensure no uninitialized memory can be observed.",
    hint: "Must assign before reading.",
    level: "intermediate",
    codeExample: "class Test {\n  final int x;\n  Test() {\n    // int y = x; // ERROR: variable x might not have been initialized\n    x = 42;\n  }\n}"
  },
  {
    question: "What is the ultimate takeaway of Topic 14 for professional Java developers?",
    shortAnswer: "`final` enforces immutability, thread safety, compiler optimizations, and self-documenting code architecture.",
    explanation: "By making variables and constants `final` by default, developers prevent unexpected side effects, protect shared data in multithreaded systems, and enable the JIT compiler to optimize aggressively.",
    hint: "Immutability leads to robust, thread-safe, and highly optimized software.",
    level: "basic",
    codeExample: "// Best practice: Favor immutability by using final whenever possible"
  }
];

export default questions;
