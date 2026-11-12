const questions = [
  {
    "id": 1,
    "question": "What is the primary purpose of a constructor in Java?",
    "shortAnswer": "To initialize instance variables of an object during instantiation.",
    "explanation": "Constructors are special member functions executed during object instantiation (using 'new') to initialize the object's instance variables into valid initial states.",
    "hint": "Think about what state a new object starts in.",
    "level": "basic",
    "options": [
      "To destroy unused objects from heap memory",
      "To initialize instance variables during object creation",
      "To compile Java source code into bytecode",
      "To return computed mathematical values to main()"
    ],
    "correctAnswer": 1,
    "codeExample": "class Student {\n  String name;\n  Student(String n) { name = n; }\n}"
  },
  {
    "id": 2,
    "question": "Which of the following is TRUE regarding Java constructors?",
    "shortAnswer": "A constructor must have the exact same name as its class and no return type.",
    "explanation": "A Java constructor MUST have the exact same name as its declaring class and MUST NOT specify any return type (not even void).",
    "hint": "Remember the naming rule and return type rule.",
    "level": "basic",
    "options": [
      "A constructor must have a 'void' return type",
      "A constructor must have the exact same name as its class",
      "A constructor can be called explicitly at any time like a regular method",
      "A constructor is stored in the Stack memory frame"
    ],
    "correctAnswer": 1,
    "codeExample": "class Circle {\n  Circle() { /* valid constructor */ }\n}"
  },
  {
    "id": 3,
    "question": "What happens if a developer writes: 'public void Student()' inside a Student class?",
    "shortAnswer": "Java treats it as a regular member method, not a constructor.",
    "explanation": "Specifying any return type (even 'void') causes the Java compiler to treat it as a standard member method that will NOT be invoked automatically during 'new Student()'.",
    "hint": "What does the keyword 'void' signify?",
    "level": "intermediate",
    "options": [
      "It acts as a default constructor",
      "It results in a syntax error at compile-time",
      "Java treats it as a regular member method, NOT a constructor",
      "It causes a runtime NullPointerException"
    ],
    "correctAnswer": 2,
    "codeExample": "class Student {\n  public void Student() { System.out.println('Regular method!'); }\n}"
  },
  {
    "id": 4,
    "question": "When is a constructor invoked in Java?",
    "shortAnswer": "Automatically when an object is instantiated using the 'new' operator.",
    "explanation": "The constructor is automatically called at runtime when heap memory is allocated for a new object using the 'new' keyword.",
    "hint": "Which keyword triggers object creation?",
    "level": "basic",
    "options": [
      "When the class bytecode is loaded by the JVM",
      "Automatically when an object is instantiated using the 'new' operator",
      "When system garbage collection runs",
      "Only when explicitly called via object dot notation (obj.Constructor())"
    ],
    "correctAnswer": 1,
    "codeExample": "Student s = new Student(); // Constructor invoked here"
  },
  {
    "id": 5,
    "question": "Where is the newly instantiated object created during constructor execution?",
    "shortAnswer": "Heap memory.",
    "explanation": "All Java objects, including their instance variables initialized by constructors, reside in Heap memory. Reference variables holding their addresses reside in Stack frames.",
    "hint": "Distinguish between reference and actual object memory.",
    "level": "intermediate",
    "options": [
      "Stack memory",
      "Heap memory",
      "Method Area / Metaspace",
      "Registers"
    ],
    "correctAnswer": 1,
    "codeExample": "Student s = new Student(); // s in Stack, Student object in Heap"
  },
  {
    "id": 6,
    "question": "Can a constructor be declared with the 'static' modifier?",
    "shortAnswer": "No, constructors cannot be static.",
    "explanation": "Constructors are meant to initialize individual object instances. A static member belongs to the class, not instances, making 'static' invalid for constructors.",
    "hint": "Do static members belong to instances or the class?",
    "level": "intermediate",
    "options": [
      "Yes, to initialize static variables",
      "No, constructors cannot be declared static",
      "Yes, but only in abstract classes",
      "Yes, if it has no parameters"
    ],
    "correctAnswer": 1,
    "codeExample": "// ILLEGAL:\n// static Student() { }"
  },
  {
    "id": 7,
    "question": "Can a constructor be declared 'final' in Java?",
    "shortAnswer": "No, constructors cannot be final.",
    "explanation": "In Java, 'final' methods cannot be overridden in subclasses. Since constructors are never inherited, they cannot be overridden, making 'final' meaningless and illegal on constructors.",
    "hint": "Can constructors be inherited or overridden?",
    "level": "intermediate",
    "options": [
      "Yes, to prevent subclasses from overriding it",
      "No, constructors cannot be final because they are never inherited",
      "Yes, but only in final classes",
      "Yes, if it is private"
    ],
    "correctAnswer": 1,
    "codeExample": "// ILLEGAL:\n// final Student() { }"
  },
  {
    "id": 8,
    "question": "Can a constructor be declared 'abstract'?",
    "shortAnswer": "No, constructors cannot be abstract.",
    "explanation": "An abstract method has no implementation and must be implemented by subclasses. Constructors must provide initialization logic and cannot be inherited or overridden.",
    "hint": "Abstract implies no body.",
    "level": "intermediate",
    "options": [
      "Yes, inside abstract classes",
      "No, constructors must have an implementation body",
      "Yes, if the class has subclasses",
      "Yes, in interface definitions"
    ],
    "correctAnswer": 1,
    "codeExample": "// ILLEGAL:\n// abstract Student();"
  },
  {
    "id": 9,
    "question": "What access modifiers can be applied to a constructor in Java?",
    "shortAnswer": "public, protected, private, or default (package-private).",
    "explanation": "Constructors can use any of the four standard Java access specifiers: public, protected, private, or package-private (no modifier).",
    "hint": "Can constructors be private for singleton patterns?",
    "level": "basic",
    "options": [
      "Only public and default",
      "Only public",
      "public, protected, private, and default (no modifier)",
      "public and private only"
    ],
    "correctAnswer": 2,
    "codeExample": "public class Box {\n  private Box() { } // Legal private constructor\n}"
  },
  {
    "id": 10,
    "question": "What is the return type of a constructor?",
    "shortAnswer": "Constructors do not have any return type, not even void.",
    "explanation": "Constructors return no value and cannot have any return type in their signature. They implicitly evaluate to the new object reference during instantiation with 'new'.",
    "hint": "Does a constructor return a primitive or void?",
    "level": "basic",
    "options": [
      "void",
      "Object",
      "No return type, not even void",
      "int (0 for success)"
    ],
    "correctAnswer": 2,
    "codeExample": "Student() { /* no return type */ }"
  },
  {
    "id": 11,
    "question": "Can a constructor contain a 'return' statement?",
    "shortAnswer": "Yes, but only a plain 'return;' without any return value.",
    "explanation": "A constructor can use a bare 'return;' statement to terminate execution early, but it cannot return a value (e.g., 'return x;' is a compile error).",
    "hint": "Can return be used for early exit?",
    "level": "advanced",
    "options": [
      "No, return statements are never allowed in constructors",
      "Yes, but only 'return;' without an expression",
      "Yes, it can return 'this'",
      "Yes, it can return an integer status code"
    ],
    "correctAnswer": 1,
    "codeExample": "Student(int age) {\n  if (age < 0) return; // Early exit\n  this.age = age;\n}"
  },
  {
    "id": 12,
    "question": "What is the first step executed inside any Java constructor before the developer's statements?",
    "shortAnswer": "A call to super() or this().",
    "explanation": "Every constructor explicitly or implicitly begins with either a call to super() (to invoke the superclass constructor) or this() (to invoke another overloaded constructor).",
    "hint": "How does the parent class get initialized?",
    "level": "advanced",
    "options": [
      "Instance variable zeroing",
      "An implicit or explicit call to super() or this()",
      "Static class loading",
      "Garbage collection check"
    ],
    "correctAnswer": 1,
    "codeExample": "class Child extends Parent {\n  Child() {\n    super(); // inserted automatically if omitted\n  }\n}"
  },
  {
    "id": 13,
    "question": "How many times is a constructor called for a single object instantiation?",
    "shortAnswer": "Exactly once.",
    "explanation": "When an object is created with 'new', the constructor is executed exactly once during that object's initialization lifecycle.",
    "hint": "Can an existing object be re-constructed?",
    "level": "basic",
    "options": [
      "Zero times",
      "Exactly once",
      "Multiple times if called manually",
      "Twice (once for stack, once for heap)"
    ],
    "correctAnswer": 1,
    "codeExample": "Student s = new Student(); // Constructor called once here"
  },
  {
    "id": 14,
    "question": "Can an existing object call its constructor again like: 's.Student()'?",
    "shortAnswer": "No, constructors cannot be invoked on existing object references.",
    "explanation": "Constructors cannot be called via dot notation on object references. They can only be triggered via the 'new' keyword during initial object creation.",
    "hint": "Try calling s.Student() in BlueJ.",
    "level": "basic",
    "options": [
      "Yes, to reset all instance variables to initial state",
      "No, constructors cannot be called via object dot notation",
      "Yes, if the constructor is public",
      "Yes, in BlueJ terminal only"
    ],
    "correctAnswer": 1,
    "codeExample": "Student s = new Student();\n// s.Student(); // COMPILE ERROR"
  },
  {
    "id": 15,
    "question": "What is the primary role of a private constructor in Java?",
    "shortAnswer": "To prevent instantiation of the class from outside.",
    "explanation": "A private constructor prevents outside classes from using 'new', which is commonly used in utility classes containing only static methods (like java.lang.Math) or Singleton design patterns.",
    "hint": "Can Math m = new Math() be written?",
    "level": "intermediate",
    "options": [
      "To make the class abstract",
      "To prevent instantiation from other classes (e.g. Math or Singleton)",
      "To speed up JVM execution",
      "To hide private variables from memory"
    ],
    "correctAnswer": 1,
    "codeExample": "public class MathUtility {\n  private MathUtility() { } // Cannot instantiate\n  public static int add(int a, int b) { return a + b; }\n}"
  },
  {
    "id": 16,
    "question": "What is an instance initialization block (IIB) relative to constructors?",
    "shortAnswer": "A block of code that runs every time an object is instantiated, before the constructor body.",
    "explanation": "An IIB ({ ... }) runs whenever an object is created, just before the constructor code runs (after the super() call completes).",
    "hint": "A block without 'static' inside a class body.",
    "level": "advanced",
    "options": [
      "A block that runs only when class bytecode is loaded",
      "A block that runs on object creation before constructor logic",
      "A block executed after the constructor finishes",
      "A special method called by garbage collector"
    ],
    "correctAnswer": 1,
    "codeExample": "class Demo {\n  { System.out.println('IIB runs'); }\n  Demo() { System.out.println('Constructor runs'); }\n}"
  },
  {
    "id": 17,
    "question": "What happens if an exception is thrown inside a constructor?",
    "shortAnswer": "Object construction fails, no reference is returned, and the half-initialized object becomes eligible for garbage collection.",
    "explanation": "If an uncaught exception is thrown in a constructor, object creation is aborted, the reference is not assigned, and memory is reclaimed by the garbage collector.",
    "hint": "Does the caller receive the reference if an exception occurs?",
    "level": "advanced",
    "options": [
      "The object is created with null fields",
      "Construction is aborted, no object reference is returned, and allocated memory is discarded",
      "The JVM terminates immediately with error code 1",
      "The default constructor is automatically run as fallback"
    ],
    "correctAnswer": 1,
    "codeExample": "class Account {\n  Account(int bal) {\n    if (bal < 0) throw new IllegalArgumentException();\n  }\n}"
  },
  {
    "id": 18,
    "question": "In what order are constructors executed in an inheritance hierarchy?",
    "shortAnswer": "Top-down from superclass (Object) down to the subclass.",
    "explanation": "Constructors execute from the topmost ancestor (java.lang.Object) down through each intermediate class to the derived subclass constructor.",
    "hint": "Must the parent be built before the child?",
    "level": "intermediate",
    "options": [
      "Bottom-up: Subclass first, then Superclass",
      "Top-down: Superclass first, then Subclass",
      "Simultaneously in parallel threads",
      "Only the subclass constructor executes"
    ],
    "correctAnswer": 1,
    "codeExample": "// Class A -> Class B -> Class C\n// Execution order: A() -> B() -> C()"
  },
  {
    "id": 19,
    "question": "What happens if a class does NOT define any constructor explicitly?",
    "shortAnswer": "The Java compiler automatically provides a public/package default no-argument constructor.",
    "explanation": "If no constructor is explicitly declared in source code, javac inserts a default zero-argument constructor that calls super() and initializes fields to default values.",
    "hint": "Does Java let a class exist without any constructor?",
    "level": "basic",
    "options": [
      "The class cannot be instantiated",
      "The Java compiler inserts a default no-argument constructor",
      "A compilation error occurs",
      "An abstract instance is created"
    ],
    "correctAnswer": 1,
    "codeExample": "class Student { /* No constructor */ }\nStudent s = new Student(); // Valid due to compiler-provided default constructor"
  },
  {
    "id": 20,
    "question": "Are constructors inherited by subclasses in Java?",
    "shortAnswer": "No, constructors are not members and cannot be inherited.",
    "explanation": "In Java, subclasses do NOT inherit constructors of their superclass. A subclass must define its own constructors or use the compiler default.",
    "hint": "Can a subclass have a constructor with the parent's class name?",
    "level": "intermediate",
    "options": [
      "Yes, all constructors are inherited",
      "No, constructors are never inherited by subclasses",
      "Only public constructors are inherited",
      "Only default constructors are inherited"
    ],
    "correctAnswer": 1,
    "codeExample": "// class Parent { Parent(int x) {} }\n// class Child extends Parent {}\n// Child c = new Child(10); // COMPILE ERROR: Child does not inherit Parent(int)"
  },
  {
    "id": 21,
    "question": "Which keyword is used inside a constructor to invoke another constructor of the same class?",
    "shortAnswer": "this()",
    "explanation": "The 'this()' call is used for constructor chaining within the same class, and must always be the first statement in the constructor body.",
    "hint": "How does one constructor call a sibling constructor?",
    "level": "intermediate",
    "options": [
      "super()",
      "this()",
      "new()",
      "call()"
    ],
    "correctAnswer": 1,
    "codeExample": "class Box {\n  Box() { this(10, 10, 10); }\n  Box(int l, int b, int h) { /* ... */ }\n}"
  },
  {
    "id": 22,
    "question": "Which keyword is used inside a constructor to invoke a constructor of the parent class?",
    "shortAnswer": "super()",
    "explanation": "The 'super()' call explicitly invokes a constructor of the immediate superclass and must be the first statement in the subclass constructor.",
    "hint": "Refers to the superclass.",
    "level": "intermediate",
    "options": [
      "parent()",
      "base()",
      "super()",
      "this()"
    ],
    "correctAnswer": 2,
    "codeExample": "class Child extends Parent {\n  Child(int x) { super(x); }\n}"
  },
  {
    "id": 23,
    "question": "Can both 'this()' and 'super()' be present in the same constructor body?",
    "shortAnswer": "No, because both must be the very first statement.",
    "explanation": "Both 'this()' and 'super()' require being the first statement in a constructor. Therefore, they cannot both appear in the same constructor.",
    "hint": "Can two different statements both be the first statement?",
    "level": "advanced",
    "options": [
      "Yes, if this() is first and super() is second",
      "Yes, if super() is first and this() is second",
      "No, neither can coexist because both require being the first statement",
      "Yes, separated by a semicolon"
    ],
    "correctAnswer": 2,
    "codeExample": "// COMPILE ERROR:\n// Child() {\n//   this(5);\n//   super();\n// }"
  },
  {
    "id": 24,
    "question": "What is constructor chaining in Java?",
    "shortAnswer": "The process of calling one constructor from another constructor within the same class or hierarchy.",
    "explanation": "Constructor chaining occurs when one constructor invokes another using this() or super(), allowing initialization logic to be centralized and reused.",
    "hint": "Connecting constructors like links in a chain.",
    "level": "intermediate",
    "options": [
      "Creating multiple objects in a loop",
      "Calling one constructor from another constructor using this() or super()",
      "Connecting multiple classes with interfaces",
      "Binding event listeners to buttons"
    ],
    "correctAnswer": 1,
    "codeExample": "Box() -> Box(int s) -> Box(int l, int w, int h)"
  },
  {
    "id": 25,
    "question": "In ICSE Class X Section B class design questions, why is initializing variables inside the constructor preferred over inline assignment?",
    "shortAnswer": "It guarantees encapsulation, clarity, and allows dynamic parameter passing per object.",
    "explanation": "The ICSE board expects students to follow proper OOP principles: define instance variables in the class, and initialize them inside default or parameterized constructors as specified in the question format.",
    "hint": "Think about ICSE marks distribution for constructor initialization.",
    "level": "intermediate",
    "options": [
      "Because inline initialization causes compile-time errors in BlueJ",
      "Because it adheres to ICSE marking scheme standards for class design and ensures controlled object state",
      "Because constructors run faster than inline assignments",
      "Because inline initialization consumes twice the memory"
    ],
    "correctAnswer": 1,
    "codeExample": "// ICSE Expected Standard:\nclass Student {\n  String name; int marks;\n  Student() {\n    name = '';\n    marks = 0;\n  }\n}"
  }
];

export default questions;
