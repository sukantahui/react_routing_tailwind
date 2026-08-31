const questions = [
  {
    question: "What is the mandatory ordering of top-level sections in a Java source file (.java)?",
    shortAnswer: "Package declaration (first) → Import statements (second) → Class/Type declaration (third).",
    explanation: "If present, the `package` statement must be the very first non-comment statement in the file, followed by `import` statements, followed by the class or interface declaration.",
    hint: "Package → Imports → Class.",
    level: "basic",
    codeExample: "package com.example;\n\nimport java.util.List;\n\npublic class App { }"
  },
  {
    question: "Which Java package is automatically and implicitly imported into every Java source file?",
    shortAnswer: "`java.lang` (contains String, System, Math, Object, Thread, Exception).",
    explanation: "The compiler automatically inserts `import java.lang.*;` into every compilation unit. You never need to write `import java.lang.String;`.",
    hint: "The core language package.",
    level: "basic",
    codeExample: "// String, System, Math, Integer are available without import statements."
  },
  {
    question: "Can a single .java source file contain multiple class declarations? What are the constraints?",
    shortAnswer: "Yes, but at most ONE class can be marked 'public', and the file name must match that public class.",
    explanation: "You can include multiple package-private (non-public) classes in the same file. The compiler will generate separate .class files for each class.",
    hint: "At most one public class per file.",
    level: "basic",
    codeExample: "// File: Main.java\npublic class Main { }\nclass Helper { } // Compiles to Main.class and Helper.class"
  },
  {
    question: "What happens if a Java file has no `package` declaration?",
    shortAnswer: "The classes belong to the 'Default Package' (unnamed package).",
    explanation: "Classes in the default package reside in the root directory. However, classes inside named packages cannot import classes from the default package (anti-pattern in enterprise software).",
    hint: "The unnamed default package.",
    level: "intermediate",
    codeExample: "// Omitting 'package' places class in the unnamed default package."
  },
  {
    question: "What is a 'Static Import' in Java (introduced in Java 5)?",
    shortAnswer: "An import statement that imports static members (methods/constants) so they can be used without qualifying the class name.",
    explanation: "`import static java.lang.Math.PI;` or `import static java.lang.Math.sqrt;` allows writing `double r = sqrt(16) * PI;` directly.",
    hint: "import static Package.Class.MEMBER;",
    level: "intermediate",
    codeExample: "import static java.lang.Math.PI;\nimport static java.lang.Math.max;\n\ndouble area = PI * 5 * 5;\nint larger = max(10, 20);"
  },
  {
    question: "What is the difference between explicit imports (`import java.util.List;`) and wildcard imports (`import java.util.*;`)?",
    shortAnswer: "Explicit imports name individual classes; wildcard imports make all classes in that specific package accessible (without subpackages).",
    explanation: "Wildcard imports do NOT import subpackages (e.g. `import java.util.*` does NOT import `java.util.concurrent.*`). Wildcard imports also do not increase runtime memory or bytecode size.",
    hint: "Does not import subpackages.",
    level: "intermediate",
    codeExample: "// import java.util.* does NOT import java.util.concurrent.ConcurrentHashMap"
  },
  {
    question: "How do you resolve a naming collision when two imported packages contain a class with the exact same name (e.g. `java.util.Date` and `java.sql.Date`)?",
    shortAnswer: "Use the fully-qualified class name at the point of declaration for at least one of the classes.",
    explanation: "You can import one explicitly (e.g. `import java.util.Date;`) and qualify the other inline (`java.sql.Date sqlDate = ...;`).",
    hint: "Use fully-qualified package prefix inline.",
    level: "intermediate",
    codeExample: "java.util.Date utilDate = new java.util.Date();\njava.sql.Date sqlDate = new java.sql.Date(System.currentTimeMillis());"
  },
  {
    question: "What is the standard naming convention for Java packages in industry?",
    shortAnswer: "Reversed Internet domain name in all lowercase (e.g. `com.codernaccotax.banking.service`).",
    explanation: "This guarantees global uniqueness across millions of open-source and enterprise libraries across different organizations.",
    hint: "Reversed domain in all lowercase.",
    level: "basic",
    codeExample: "package com.codernaccotax.banking.ledger;"
  },
  {
    question: "What is an 'Instance Initializer Block' (`{ }`) inside a Java class?",
    shortAnswer: "A block of code that executes every time an object is instantiated, before the constructor body runs.",
    explanation: "Instance initializer blocks run in source order immediately after the `super()` constructor finishes and before the current constructor body executes.",
    hint: "Runs on object creation before constructor.",
    level: "advanced",
    codeExample: "public class Node {\n    { System.out.println(\"Instance Initializer Block\"); }\n    public Node() { System.out.println(\"Constructor\"); }\n}"
  },
  {
    question: "What is a 'Static Initializer Block' (`static { }`) inside a Java class?",
    shortAnswer: "A block of code that executes exactly ONCE when the class is loaded and initialized by the JVM.",
    explanation: "Static blocks are used for complex static variable initialization, database driver registrations, or loading native shared libraries.",
    hint: "Executes once when class is loaded.",
    level: "intermediate",
    codeExample: "static {\n    System.out.println(\"Static Block: Executed once on class loading\");\n}"
  },
  {
    question: "What is the execution order of static blocks, instance blocks, and constructors?",
    shortAnswer: "1. Static Initializers (once on class load) → 2. Instance Initializers (on new) → 3. Constructor (on new).",
    explanation: "When instantiating an object: Superclass static blocks → Subclass static blocks → Superclass instance blocks & constructor → Subclass instance blocks & constructor.",
    hint: "Static first, then Instance blocks, then Constructor.",
    level: "advanced",
    codeExample: "// 1. static {} \n// 2. {} \n// 3. ClassName()"
  },
  {
    question: "Can a Java source file contain ONLY comments and a package declaration without any class?",
    shortAnswer: "Yes, `javac` will compile it without errors (producing 0 .class files).",
    explanation: "A compilation unit is legally allowed to contain only package and import statements without a type declaration.",
    hint: "Syntactically valid compilation unit.",
    level: "basic",
    codeExample: "// Valid file: package com.example;"
  },
  {
    question: "What is the purpose of the `package-info.java` file in Java packages?",
    shortAnswer: "To declare package-level Javadoc documentation and package-level annotations.",
    explanation: "`package-info.java` contains only Javadoc comments, package annotations (like `@NonNullApi`), and the package declaration.",
    hint: "Package documentation and annotations.",
    level: "advanced",
    codeExample: "/**\n * Core Banking Services\n */\n@NonNullApi\npackage com.codernaccotax.banking;"
  },
  {
    question: "What are the 4 Access Modifiers in Java and their visibility scopes?",
    shortAnswer: "1. private (class only), 2. default/package-private (same package), 3. protected (same package + subclasses), 4. public (everywhere).",
    explanation: "These modifiers enforce encapsulation boundaries across classes, packages, and inheritance trees.",
    hint: "private → default → protected → public.",
    level: "basic",
    codeExample: "private int a; \nint b; // Default\nprotected int c;\npublic int d;"
  },
  {
    question: "Can top-level classes in a .java file be declared `private` or `protected`?",
    shortAnswer: "No! Top-level classes can ONLY be declared `public` or default (package-private).",
    explanation: "A top-level class cannot be private or protected because those modifiers only make sense for members enclosed within a class.",
    hint: "Only public and package-private for top-level classes.",
    level: "intermediate",
    codeExample: "// Illegal: private class TopLevelClass { }\n// Legal: public class TopLevelClass { }"
  },
  {
    question: "What is a 'Compilation Unit' according to the Java Language Specification?",
    shortAnswer: "The contents of a single Java source code file (.java).",
    explanation: "A compilation unit consists of an optional package declaration, zero or more import declarations, and zero or more top-level type declarations.",
    hint: "Formal JLS term for a source file.",
    level: "intermediate",
    codeExample: "// A .java file = One Compilation Unit"
  },
  {
    question: "What is the difference between a Member Variable (Field) and a Local Variable?",
    shortAnswer: "Fields are declared inside the class body and receive default initial values; Local variables are declared inside methods and have no default values.",
    explanation: "Fields exist for the lifetime of the object/class on Heap/Metaspace. Local variables exist only during method execution on the Thread Stack.",
    hint: "Class scope vs Method scope.",
    level: "basic",
    codeExample: "public class Demo {\n    int fieldVar; // Initialized to 0 by default\n    void run() {\n        int localVar = 5; // Must be explicitly initialized\n    }\n}"
  },
  {
    question: "What default values do primitive instance fields receive upon object instantiation?",
    shortAnswer: "byte/short/int/long = 0, float/double = 0.0, char = '\\u0000' (null char), boolean = false, object references = null.",
    explanation: "During JVM heap allocation, the memory buffer for object fields is automatically zero-filled.",
    hint: "Numeric = 0, boolean = false, Object = null.",
    level: "basic",
    codeExample: "int i; // 0\nboolean b; // false\nString s; // null"
  },
  {
    question: "Why should instance variables always be declared `private` in professional software?",
    shortAnswer: "To enforce Encapsulation and prevent external classes from directly corrupting internal object state.",
    explanation: "Private fields force external callers to interact through validated getter and setter methods or business operations.",
    hint: "Encapsulation and data hiding.",
    level: "basic",
    codeExample: "private double balance; // Protected from unauthorized direct mutation"
  },
  {
    question: "What is the `this` keyword in Java?",
    shortAnswer: "A reference variable that refers to the current invoking object instance.",
    explanation: "`this` is used to distinguish instance fields from shadowing parameter variables (`this.name = name`), invoke overloaded constructors (`this(...)`), or pass the current object as an argument.",
    hint: "Reference to the current object instance.",
    level: "basic",
    codeExample: "public void setName(String name) {\n    this.name = name; // Disambiguates field from parameter\n}"
  },
  {
    question: "What is Constructor Overloading in a Java class?",
    shortAnswer: "Defining multiple constructors in the same class with different parameter lists (count, types, or order).",
    explanation: "Overloading allows instantiating objects in multiple convenient ways (e.g. default constructor vs parameterized constructor).",
    hint: "Multiple constructors with distinct parameter signatures.",
    level: "basic",
    codeExample: "public User() { }\npublic User(String name) { this.name = name; }"
  },
  {
    question: "How does constructor chaining work using `this()`?",
    shortAnswer: "`this(...)` invokes another constructor in the same class and must be the FIRST statement in the constructor body.",
    explanation: "Constructor chaining avoids duplicating initialization code across multiple overloaded constructors.",
    hint: "this() must be on line 1 of constructor.",
    level: "intermediate",
    codeExample: "public User() {\n    this(\"Default Guest\"); // Calls User(String)\n}\npublic User(String name) { this.name = name; }"
  },
  {
    question: "What is the `super` keyword in Java?",
    shortAnswer: "A reference variable used to access immediate parent class members, methods, and constructors.",
    explanation: "`super.methodName()` invokes the overridden superclass method, and `super(...)` invokes the parent class constructor.",
    hint: "Reference to the parent superclass.",
    level: "basic",
    codeExample: "public Dog() {\n    super(\"Canine\"); // Calls Animal constructor\n}"
  },
  {
    question: "What is the difference between Method Overloading and Method Overriding?",
    shortAnswer: "Overloading occurs in the same class (same name, different parameters); Overriding occurs in subclasses (same name and exact same signature).",
    explanation: "Overloading is compile-time (static polymorphism); Overriding is runtime dynamic dispatch (runtime polymorphism).",
    hint: "Same class vs Subclass.",
    level: "intermediate",
    codeExample: "// Overloading: add(int a, int b) vs add(double a, double b)\n// Overriding: @Override void draw() in Circle extending Shape"
  },
  {
    question: "What is the purpose of the `@Override` annotation?",
    shortAnswer: "It instructs the compiler to verify that the method correctly overrides a superclass or interface method.",
    explanation: "If there is a typo in the method name or parameters, javac raises a compilation error instead of silently treating it as a new overloaded method.",
    hint: "Compile-time validation for overridden methods.",
    level: "basic",
    codeExample: "@Override\npublic String toString() { return \"Custom string\"; }"
  },
  {
    question: "Can a Java class contain multiple `main` methods?",
    shortAnswer: "Yes, through method overloading, but the JVM will strictly launch `public static void main(String[] args)`.",
    explanation: "You can write `public static void main(int x)` as an overloaded helper, but the JVM entry point remains the standardized String array signature.",
    hint: "Overloaded main methods are allowed; only String[] args is the entry point.",
    level: "intermediate",
    codeExample: "public static void main(String[] args) { main(10); }\npublic static void main(int x) { System.out.println(x); }"
  },
  {
    question: "What is the role of the `final` modifier when applied to a class, method, or variable?",
    shortAnswer: "Final class: cannot be subclassed; Final method: cannot be overridden; Final variable: value cannot be reassigned.",
    explanation: "`final` enforces immutability and architectural security (e.g. `java.lang.String` and `java.lang.Math` are final classes).",
    hint: "Prevents extension, overriding, and reassignment.",
    level: "basic",
    codeExample: "final class SecurityManager { }\nfinal int MAX_ATTEMPTS = 3;"
  },
  {
    question: "What are static methods in a Java class and what limitations do they have?",
    shortAnswer: "Methods belonging to the class rather than instances; cannot access instance variables or use `this`/`super` directly.",
    explanation: "Because static methods execute without an object instance, attempting to reference instance fields (which require `this`) results in a compilation error.",
    hint: "Static methods cannot access non-static instance fields directly.",
    level: "basic",
    codeExample: "public static void print() {\n    // System.out.println(this.name); → COMPILE ERROR!\n}"
  },
  {
    question: "Why does Java enforce strict case-sensitivity across all identifiers?",
    shortAnswer: "To ensure unambiguous symbol resolution and align with standardized C/C++ lexer grammar specifications.",
    explanation: "`Student`, `student`, and `STUDENT` are three completely different symbols in Java.",
    hint: "Case-sensitive language rules.",
    level: "basic",
    codeExample: "int value = 10;\nint Value = 20; // Two distinct variables!"
  },
  {
    question: "How does adhering to standard Java program structure improve team collaboration?",
    shortAnswer: "It makes code instantly predictable, readable, maintainable, and compatible with automated build tools and CI/CD pipelines.",
    explanation: "When code follows standard package hierarchies, PascalCase class naming, camelCase methods, and organized section layouts, any engineer in the team can navigate and maintain it immediately.",
    hint: "Standardized structure = Effortless maintainability.",
    level: "basic",
    codeExample: "// Clean structure → Enterprise maintainability."
  }
];

export default questions;
