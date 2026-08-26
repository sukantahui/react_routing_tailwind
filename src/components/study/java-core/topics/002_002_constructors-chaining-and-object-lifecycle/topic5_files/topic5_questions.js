const topic5_questions = [
  {
    question: "What is a Parameterized Constructor in Java?",
    shortAnswer: "A constructor that accepts one or more arguments to initialize instance variables with specific caller-provided values during object creation.",
    explanation: "Parameterized constructors allow every object instance to be born with customized, valid state tailored to domain requirements.",
    hint: "Accepts arguments to initialize fields at creation time.",
    level: "Beginner",
    codeExample: "public Student(int id, String name) { this.id = id; this.name = name; }"
  },
  {
    question: "Why are parameterized constructors preferred over using multiple setter methods for initialization?",
    shortAnswer: "They guarantee that an object is never in an invalid, incomplete, or partially initialized state between construction and setter calls.",
    explanation: "With setters, an object may exist for several operations with null fields before setters run, creating concurrency and NullPointer bugs.",
    hint: "Guarantees complete object validity from the moment of birth.",
    level: "Intermediate",
    codeExample: "// Unsafe: Student s = new Student(); s.setId(1); s.setName(\"Swadeep\");\n// Safe: Student s = new Student(1, \"Swadeep\");"
  },
  {
    question: "How do parameterized constructors support immutable objects?",
    shortAnswer: "By assigning all 'final' fields inside the constructor body, after which their state can never be modified.",
    explanation: "Immutable classes declare private final fields without setters, initialized exclusively through parameterized constructors.",
    hint: "Initializes final fields that cannot be modified thereafter.",
    level: "Intermediate",
    codeExample: "public final class Point { private final int x, y; public Point(int x, int y) { this.x = x; this.y = y; } }"
  },
  {
    question: "What is 'shadowing' of instance variables by constructor parameters, and how is it resolved?",
    shortAnswer: "When parameter names match field names, the parameter shadows the field. It is resolved using 'this.fieldName = parameterName'.",
    explanation: "'this' provides explicit qualification to access the instance field on the current Heap object.",
    hint: "Use 'this.' to differentiate field from parameter.",
    level: "Beginner",
    codeExample: "public Student(String name) { this.name = name; }"
  },
  {
    question: "Can a parameterized constructor throw an exception if arguments are invalid?",
    shortAnswer: "Yes! Throwing exceptions (e.g. IllegalArgumentException, NullPointerException) in constructors is the standard idiom to prevent invalid object birth.",
    explanation: "If validation fails, throwing an exception aborts construction, ensuring invalid instances are never created on the Heap.",
    hint: "Throwing exceptions in constructors enforces domain validation.",
    level: "Intermediate",
    codeExample: "if (id <= 0) throw new IllegalArgumentException(\"ID must be positive\");"
  },
  {
    question: "Can you pass object references to a parameterized constructor?",
    shortAnswer: "Yes, constructors can accept primitive types, object references, collections, arrays, and other domain entities.",
    explanation: "Passing reference types enables composition and dependency injection.",
    hint: "Accepts primitives, objects, and collections.",
    level: "Beginner",
    codeExample: "public Order(Customer customer, List<Item> items) {}"
  },
  {
    question: "What is defensive copying in a parameterized constructor?",
    shortAnswer: "Creating a new clone/copy of mutable objects (like Date or List) passed into the constructor before assigning them to fields.",
    explanation: "Defensive copying prevents external callers from mutating the internal state of the newly constructed object by modifying the passed reference.",
    hint: "Copies mutable parameters to protect internal state.",
    level: "Advanced",
    codeExample: "public Course(List<String> topics) { this.topics = new ArrayList<>(topics); }"
  },
  {
    question: "How does the 'new' operator pass parameters to the constructor?",
    shortAnswer: "The JVM pushes arguments onto the evaluation stack and invokes the constructor '<init>' matching the exact descriptor signature.",
    explanation: "The opcode 'invokespecial ClassName.<init>(Descriptor)' consumes the arguments from the stack.",
    hint: "Arguments pushed to stack and consumed by invokespecial.",
    level: "Advanced",
    codeExample: "// Bytecode: ldc \"Swadeep\", invokespecial Student.<init>(Ljava/lang/String;)V"
  },
  {
    question: "Can a class have 10 different parameterized constructors?",
    shortAnswer: "Yes, as long as each constructor has a distinct parameter list (different types, count, or order of parameters).",
    explanation: "This is known as constructor overloading.",
    hint: "Permitted via constructor overloading with unique signatures.",
    level: "Beginner",
    codeExample: "Student(int id) {}\nStudent(String name) {}\nStudent(int id, String name) {}"
  },
  {
    question: "What is the telescoping constructor pattern?",
    shortAnswer: "A design pattern where constructors with fewer parameters chain into constructors with more parameters using 'this(...)'.",
    explanation: "Telescoping allows flexible parameter combinations while centralizing initialization logic in one master constructor.",
    hint: "Chaining smaller constructors into larger ones via this(...).",
    level: "Intermediate",
    codeExample: "Student(int id) { this(id, \"Unknown\", \"Barrackpore\"); }"
  },
  {
    question: "Can a constructor parameter be marked 'final' in Java?",
    shortAnswer: "Yes. Marking constructor parameters 'final' prevents accidental reassignment of the parameter variable within the constructor body.",
    explanation: "'final String name' ensures the local variable 'name' cannot be modified inside the constructor.",
    hint: "Prevents accidental local parameter reassignment.",
    level: "Intermediate",
    codeExample: "public Student(final String name, final int roll) { this.name = name; }"
  },
  {
    question: "What is the classroom analogy used by Sukanta Hui for parameterized constructors?",
    shortAnswer: "A student admission form filled with specific name, photo, and hub details before stamping; without it, the student identity is incomplete.",
    explanation: "Swadeep Paul is registered with roll 101, hub Barrackpore, and 95% scholarship at the instant of admission!",
    hint: "Customized admission certificate with verified credentials.",
    level: "Beginner",
    codeExample: "TraineeRecord swadeep = new TraineeRecord(101, \"Swadeep Paul\", \"Barrackpore\", 95.0);"
  },
  {
    question: "What happens if a parameterized constructor passes 'null' to an unvalidated field?",
    shortAnswer: "The field is assigned null, which will likely trigger a NullPointerException later during method invocation.",
    explanation: "Using 'Objects.requireNonNull(arg, \"message\")' inside the constructor prevents null fields at birth.",
    hint: "Use Objects.requireNonNull to catch null parameters immediately.",
    level: "Intermediate",
    codeExample: "this.name = Objects.requireNonNull(name, \"Name required\");"
  },
  {
    question: "Can a parameterized constructor invoke superclass constructors with arguments?",
    shortAnswer: "Yes! Using 'super(arg1, arg2)' on line 1 passes parameters up the inheritance hierarchy.",
    explanation: "This allows child classes to configure inherited parent fields.",
    hint: "super(args) passes parameters to parent constructor.",
    level: "Intermediate",
    codeExample: "class Employee extends Person { Employee(String name, double salary) { super(name); } }"
  },
  {
    question: "Can a parameterized constructor call private helper methods for validation?",
    shortAnswer: "Yes. Extracting complex validation into private static helper methods is clean code best practice.",
    explanation: "Static helper methods can also be called inside 'this()' expressions before object construction.",
    hint: "Clean practice for complex validation rules.",
    level: "Intermediate",
    codeExample: "public Student(String email) { this.email = validate(email); }"
  },
  {
    question: "What is the difference between passing primitive vs reference types to a constructor?",
    shortAnswer: "Primitives are passed by value (copied). Reference types pass a copy of the reference pointer pointing to the same Heap object.",
    explanation: "Modifying the referenced object outside may affect the internal state unless defensive copying is used.",
    hint: "Pass-by-value of primitives vs reference pointers.",
    level: "Intermediate",
    codeExample: "// Primitives are isolated; objects share Heap references"
  },
  {
    question: "Can a constructor have a generic type parameter?",
    shortAnswer: "Yes! Java allows generic constructors: 'public <T> MyClass(T item) { ... }'.",
    explanation: "Generic constructors declare their own type parameter independent of whether the class itself is generic.",
    hint: "<T> declared before constructor name.",
    level: "Advanced",
    codeExample: "public class Box { public <T> Box(T item) {} }"
  },
  {
    question: "Can constructor parameters have annotations in Java?",
    shortAnswer: "Yes. Parameters can be annotated with validation annotations like '@NotNull', '@Min', '@JsonProperty'.",
    explanation: "Frameworks inspect parameter annotations to perform automated validation and JSON mapping.",
    hint: "@NotNull, @JsonProperty, etc. on parameters.",
    level: "Advanced",
    codeExample: "public Student(@NotNull String name, @Min(1) int roll) {}"
  },
  {
    question: "What happens if a parameterized constructor assigns a field before 'this(...)' is called?",
    shortAnswer: "Compile-time error: 'call to this must be first statement in constructor'.",
    explanation: "'this()' must precede all statements in a constructor.",
    hint: "this() must be on line 1.",
    level: "Beginner",
    codeExample: "// Compile Error if this() is on line 2"
  },
  {
    question: "How does constructor parameter count impact readability and clean code?",
    shortAnswer: "Constructors with more than 4-5 parameters lead to confusing call sites (parameter ordering bugs). The Builder Pattern is recommended for 5+ parameters.",
    explanation: "Long parameter lists make code hard to read and maintain. Builders provide named fluent methods.",
    hint: "Use Builder Pattern when constructor parameters exceed 4-5.",
    level: "Intermediate",
    codeExample: "// Telescoping vs Builder pattern"
  },
  {
    question: "Can a parameterized constructor call 'super()' implicitly if no explicit super call is written?",
    shortAnswer: "Yes. If neither 'this(...)' nor 'super(...)' is written, javac injects 'super();' on line 1.",
    explanation: "The superclass no-arg constructor runs automatically.",
    hint: "Implicit super() runs unless explicit this/super is present.",
    level: "Beginner",
    codeExample: "public Student(String name) { super(); this.name = name; }"
  },
  {
    question: "Can constructor arguments be expressions like 'new Student(calcId(), getName().trim())'?",
    shortAnswer: "Yes! Any valid Java expression that evaluates to the expected parameter type can be passed as an argument.",
    explanation: "Expressions are evaluated on the stack before invoking the constructor.",
    hint: "Expressions are evaluated prior to constructor dispatch.",
    level: "Beginner",
    codeExample: "new TraineeRecord(generateId(), sanitize(name), \"Barrackpore\", 90.0);"
  },
  {
    question: "What is the difference between parameterized constructors in Java vs Python's '__init__'?",
    shortAnswer: "Java requires explicit type declarations and supports multiple overloaded constructors; Python has a single '__init__' with optional/default arguments.",
    explanation: "Java relies on static typing and method overloading for flexible initialization.",
    hint: "Statically typed overloading vs single dynamic __init__.",
    level: "Intermediate",
    codeExample: "// Java: multiple signatures; Python: default kwargs"
  },
  {
    question: "Can a parameterized constructor be declared package-private?",
    shortAnswer: "Yes, omitting the access modifier restricts instantiation to classes in the same package.",
    explanation: "Package-private constructors are used to restrict entity creation to factory classes in the same package.",
    hint: "Restricts creation to the same package.",
    level: "Beginner",
    codeExample: "TraineeRecord(int id, String name) {}"
  },
  {
    question: "Does passing a large array or collection into a parameterized constructor consume extra memory?",
    shortAnswer: "Passing the reference consumes only 8 bytes (reference pointer); doing a defensive copy allocates memory proportional to the collection size.",
    explanation: "Passing references is zero-copy; cloning copies all elements for safety.",
    hint: "Reference passing is 8 bytes; defensive copy duplicates memory.",
    level: "Advanced",
    codeExample: "this.data = Arrays.copyOf(data, data.length); // Defensive copy"
  },
  {
    question: "Can you pass 'null' explicitly to a parameterized constructor?",
    shortAnswer: "Yes, 'new Student(null)' is syntactically valid unless checked with Objects.requireNonNull inside the constructor.",
    explanation: "Java allows null references. Defensive validation prevents null pointer crashes later.",
    hint: "Valid syntax, but prevented by Objects.requireNonNull.",
    level: "Beginner",
    codeExample: "new Student(null); // Passes null unless validated"
  },
  {
    question: "How do modern Java Records handle parameterized constructors?",
    shortAnswer: "Records automatically generate a canonical constructor accepting all components, or allow compact constructors for validation.",
    explanation: "Compact record constructors allow validation without boilerplate field assignments.",
    hint: "Compact constructors allow validation without field assignment boilerplate.",
    level: "Advanced",
    codeExample: "public record Student(String name, int roll) { public Student { Objects.requireNonNull(name); } }"
  },
  {
    question: "What is the difference between parameterized constructors and JavaBeans setters?",
    shortAnswer: "Parameterized constructors enforce atomic, complete, and immutable initialization; setters create mutable, multi-step initialization.",
    explanation: "Constructors guarantee an object is never published in an incomplete state.",
    hint: "Atomic initialization vs multi-step mutable setters.",
    level: "Intermediate",
    codeExample: "// Atomic constructor vs mutable setter calls"
  },
  {
    question: "Can a constructor parameter have default values like in C++ or Kotlin?",
    shortAnswer: "No. Java does not support default parameter values; it achieves default parameters via constructor overloading and chaining with 'this(...)'.",
    explanation: "Overloaded constructors supply default values by chaining to the master constructor.",
    hint: "Java uses constructor overloading and this(...) instead of default parameters.",
    level: "Beginner",
    codeExample: "Student() { this(\"Default Name\"); }"
  },
  {
    question: "Summarize the value of Parameterized Constructors in professional Java architecture.",
    shortAnswer: "Parameterized constructors are the foundation of domain integrity, establishing invariant-protected, thread-safe, and immutable object states at the exact moment of birth.",
    explanation: "They eliminate partially-initialized entity bugs across enterprise systems.",
    hint: "Guarantees domain integrity and invariant protection at birth.",
    level: "Expert",
    codeExample: "// Master constructor establishing complete invariants"
  }
];

export default topic5_questions;