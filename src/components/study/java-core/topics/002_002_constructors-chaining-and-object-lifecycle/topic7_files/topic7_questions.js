const topic7_questions = [
  {
    question: "What is Constructor Chaining in Java?",
    shortAnswer: "The technique of calling one constructor from another constructor within the same class (via 'this()') or across inheritance hierarchies (via 'super()').",
    explanation: "Constructor chaining centralizes initialization and validation logic in a single master constructor, eliminating duplicated assignment code.",
    hint: "Calling one constructor from another using this() or super().",
    level: "Beginner",
    codeExample: "public Student(int id) { this(id, \"Unknown\"); }"
  },
  {
    question: "How is constructor chaining within the same class achieved?",
    shortAnswer: "By writing 'this(arg1, arg2, ...)' as the very first statement inside a constructor body.",
    explanation: "'this()' delegates execution to another overloaded constructor matching the argument list.",
    hint: "Use this(...) on the first line.",
    level: "Beginner",
    codeExample: "public Student() { this(101, \"Swadeep\"); }"
  },
  {
    question: "What is a 'Master Constructor' or 'Canonical Constructor'?",
    shortAnswer: "The most comprehensive overloaded constructor that accepts all parameters, performs all validations, and assigns all instance fields.",
    explanation: "All simpler overloaded constructors chain into the master constructor, supplying sensible defaults for omitted parameters.",
    hint: "The central constructor that holds all validation and field assignments.",
    level: "Intermediate",
    codeExample: "public Student(int id, String name, String hub) { /* all assignments here */ }"
  },
  {
    question: "What happens if constructor chaining forms a cycle (e.g. A calls B, and B calls A)?",
    shortAnswer: "The Java compiler detects the circular dependency and issues a compile-time error: 'recursive constructor invocation'.",
    explanation: "Constructors cannot be recursively circular because it would prevent the object from ever completing construction.",
    hint: "Compile error: recursive constructor invocation.",
    level: "Intermediate",
    codeExample: "// Compile Error: circular this()\nDemo() { this(1); }\nDemo(int x) { this(); }"
  },
  {
    question: "What architectural design principle does constructor chaining fulfill?",
    shortAnswer: "The DRY (Don't Repeat Yourself) principle and Single Responsibility Principle.",
    explanation: "Instead of copying validation logic across 5 constructors, validation exists in one place.",
    hint: "DRY (Don't Repeat Yourself).",
    level: "Beginner",
    codeExample: "// Validation exists in 1 master constructor instead of 5"
  },
  {
    question: "Can 'this()' and 'super()' both be used in the same constructor body?",
    shortAnswer: "No! Both 'this()' and 'super()' must be the very first statement in a constructor, making them mutually exclusive.",
    explanation: "A constructor can either chain to a peer constructor in the same class via 'this()' or to a parent constructor via 'super()', but never both directly.",
    hint: "Mutually exclusive; both require line 1.",
    level: "Intermediate",
    codeExample: "// COMPILE ERROR: cannot have both this() and super() in same constructor"
  },
  {
    question: "How does constructor chaining interact with parent class initialization?",
    shortAnswer: "The chain eventually reaches a constructor that does NOT call 'this()', and that constructor calls 'super()' (explicitly or implicitly) to initialize the parent.",
    explanation: "Only the terminal constructor in the 'this()' chain invokes 'super()', ensuring the parent is initialized exactly once per object.",
    hint: "Parent super() is executed once by the terminal constructor in the chain.",
    level: "Advanced",
    codeExample: "A() -> this(1) -> this(1,2) -> super() [Object initialized once]"
  },
  {
    question: "What bytecode instruction is generated for 'this(...)' call?",
    shortAnswer: "The JVM issues 'invokespecial' targeting the specified overloaded '<init>' method of the current class.",
    explanation: "'invokespecial' uses early static binding to invoke the peer constructor.",
    hint: "invokespecial ClassName.<init>(Descriptor).",
    level: "Expert",
    codeExample: "// invokespecial com/coderaccotax/Student.<init>:(ILjava/lang/String;)V"
  },
  {
    question: "Can an expression inside 'this(...)' call an instance method of the class?",
    shortAnswer: "No! You cannot refer to 'this' or invoke instance methods in arguments to 'this(...)', because the object has not yet been initialized.",
    explanation: "Static methods and static variables CAN be referenced, but instance members cannot.",
    hint: "Instance members are inaccessible in this(...) arguments; static methods are allowed.",
    level: "Advanced",
    codeExample: "// Legal: this(generateStaticId());\n// Illegal: this(getInstanceId()); // COMPILE ERROR"
  },
  {
    question: "Can you pass calculations like 'this(x * 2, y + 10)' to 'this()'?",
    shortAnswer: "Yes! Any pure mathematical expressions or static method evaluations are fully valid arguments to 'this(...)'.",
    explanation: "Expressions are evaluated and pushed onto the stack before the constructor dispatch.",
    hint: "Pure expressions and static method results are valid.",
    level: "Beginner",
    codeExample: "public Circle(double radius) { this(radius, 2 * Math.PI * radius); }"
  },
  {
    question: "What is the classroom analogy used by Sukanta Hui for constructor chaining?",
    shortAnswer: "The Barrackpore Admission Desk Relay: When a student hands in a basic form (1-arg), Clerk A passes it to Clerk B (+ default hub), who passes it to Chief Officer (Master constructor) to sign and stamp!",
    explanation: "Every request flows smoothly down the chain to the master officer (Master constructor) who stamps the record once.",
    hint: "Clerk relay funneling to the Chief Officer who stamps the record.",
    level: "Beginner",
    codeExample: "Student(roll) -> Student(roll, name) -> MasterStudent(roll, name, hub, fee)"
  },
  {
    question: "Can a constructor chain to a private constructor in the same class?",
    shortAnswer: "Yes! Public constructors routinely chain to private master constructors that accept internal configuration flags.",
    explanation: "Private constructors are accessible everywhere within their own class body.",
    hint: "Chaining to private peer constructors is standard practice.",
    level: "Intermediate",
    codeExample: "public Student(String name) { this(name, DEFAULT_ID, false); }\nprivate Student(String name, int id, boolean isVip) {}"
  },
  {
    question: "How many constructors can be chained together in a single instantiation?",
    shortAnswer: "There is no language limit, but typically 2 to 4 chained constructors are used to maintain clarity.",
    explanation: "Each chain step pushes an activation frame on the JVM call stack.",
    hint: "Typically 2-4 chained steps.",
    level: "Beginner",
    codeExample: "C1 -> C2 -> C3 -> Master"
  },
  {
    question: "Does constructor chaining create multiple objects on the Heap?",
    shortAnswer: "No! All chained constructors execute on the EXACT SAME newly allocated Heap memory block referenced by 'this'.",
    explanation: "Only one object is allocated by 'new'; chained constructors simply configure that single instance in sequence.",
    hint: "Exactly one Heap object is created.",
    level: "Intermediate",
    codeExample: "// 1 'new' = 1 Heap object, regardless of chain length"
  },
  {
    question: "In what order do print statements execute in a chain of 3 constructors?",
    shortAnswer: "The deepest (Master) constructor executes its statements first, followed by unwinding through the intermediate constructors in reverse order.",
    explanation: "Because 'this()' is on line 1, execution dives to the target constructor before executing lines below 'this()'.",
    hint: "Master constructor executes first, then unwinds back.",
    level: "Intermediate",
    codeExample: "C1 calls C2; C2 runs to end, then C1 finishes."
  },
  {
    question: "Can you pass a ternary operator expression into 'this(...)'?",
    shortAnswer: "Yes! 'this(condition ? val1 : val2)' is completely valid syntax.",
    explanation: "Ternary expressions evaluate to a single value before the constructor call.",
    hint: "Ternary expressions are legal arguments to this(...).",
    level: "Intermediate",
    codeExample: "public Account(double balance) { this(balance, balance > 10000 ? \"PREMIUM\" : \"STANDARD\"); }"
  },
  {
    question: "What happens if a constructor in the chain throws an exception?",
    shortAnswer: "The entire chain unwinds abruptly, the constructor invocation fails, and the partially initialized object is discarded.",
    explanation: "Exception bubbling halts construction immediately.",
    hint: "Exception halts entire chain; object is discarded.",
    level: "Intermediate",
    codeExample: "if (roll <= 0) throw new IllegalArgumentException();"
  },
  {
    question: "How does constructor chaining interact with Instance Initialization Blocks (IIBs)?",
    shortAnswer: "IIBs execute ONCE when the object is instantiated, inside the constructor that invokes 'super()', before any constructor bodies run.",
    explanation: "Constructors that call 'this()' do NOT re-execute IIBs.",
    hint: "IIBs execute only once per object creation.",
    level: "Advanced",
    codeExample: "// IIB runs once before master constructor body"
  },
  {
    question: "Why can't you put code before 'this(...)' in Java versions prior to Java 22?",
    shortAnswer: "Java enforced that no code could execute before parent/peer construction to prevent accessing uninitialized fields.",
    explanation: "Java 22+ introduces JEP 447 (Statements before super/this), allowing validation before chaining, but traditionally this() had to be line 1.",
    hint: "Prevents accessing uninitialized state.",
    level: "Advanced",
    codeExample: "// Traditionally, this(...) had to be strict line 1"
  },
  {
    question: "Can a constructor chain to itself directly ('Demo() { this(); }')?",
    shortAnswer: "No! Direct self-invocation causes a compile error: 'recursive constructor invocation'.",
    explanation: "A constructor cannot call itself directly.",
    hint: "Self-invocation is an immediate compile error.",
    level: "Beginner",
    codeExample: "// Compile Error: Demo() { this(); }"
  },
  {
    question: "How does constructor chaining work with varargs constructors?",
    shortAnswer: "A constructor can chain to a varargs constructor by passing individual values or an array.",
    explanation: "Javac packages the arguments into an array and invokes the varargs constructor.",
    hint: "Chaining to varargs constructor packages arguments.",
    level: "Intermediate",
    codeExample: "public Batch(String name) { this(name, \"DefaultStudent1\", \"DefaultStudent2\"); }"
  },
  {
    question: "What is the difference between constructor chaining and method chaining?",
    shortAnswer: "Constructor chaining calls peer constructors via 'this()' during object genesis; method chaining calls methods returning 'this' (e.g. 'sb.append().append()').",
    explanation: "Constructor chaining occurs once at birth; method chaining is a fluent runtime API pattern.",
    hint: "Genesis delegation via this() vs fluent API returning this.",
    level: "Intermediate",
    codeExample: "// Constructor chaining: this(a, b);\n// Method chaining: builder.setName().setAge();"
  },
  {
    question: "Can an abstract class use 'this(...)' constructor chaining?",
    shortAnswer: "Yes! Abstract classes can have overloaded constructors that chain to each other via 'this(...)'.",
    explanation: "The terminal abstract constructor then executes 'super()' to Object.",
    hint: "Abstract classes fully support this(...) chaining.",
    level: "Intermediate",
    codeExample: "abstract class Entity { Entity(int id) { this(id, \"Unknown\"); } Entity(int id, String type) {} }"
  },
  {
    question: "Can an enum constructor use 'this(...)' chaining?",
    shortAnswer: "Yes! Enum constructors can chain to overloaded private enum constructors.",
    explanation: "Enum constants invoke the chained constructor accordingly.",
    hint: "Enum constructors support this(...) chaining.",
    level: "Intermediate",
    codeExample: "enum Status { ACTIVE(1), PENDING(); Status() { this(0); } Status(int code) {} }"
  },
  {
    question: "Why should you avoid putting heavy business logic in intermediate chained constructors?",
    shortAnswer: "Because all common logic should reside in the Master constructor; intermediate constructors should only supply default values.",
    explanation: "Scattering logic across intermediate constructors breaks single-responsibility and leads to inconsistent initialization.",
    hint: "Intermediate constructors should only supply defaults.",
    level: "Intermediate",
    codeExample: "// Put validation and logic ONLY in Master constructor"
  },
  {
    question: "Does constructor chaining cause memory leaks?",
    shortAnswer: "No. Constructor chaining only consumes tiny stack frames during the microsecond of construction and releases them immediately upon completion.",
    explanation: "No persistent references are retained on the stack.",
    hint: "Zero memory leak risk; frames pop immediately.",
    level: "Beginner",
    codeExample: "// Stack frames pop immediately after return"
  },
  {
    question: "Can you pass 'this' as an argument to 'this(...)'?",
    shortAnswer: "No! 'this' cannot be referenced before the constructor call completes: compile error 'cannot reference this before supertype constructor has been called'.",
    explanation: "The instance reference cannot be passed to a constructor call before initialization.",
    hint: "Cannot reference 'this' as argument to this(...).",
    level: "Advanced",
    codeExample: "// Illegal: this(this);"
  },
  {
    question: "How does constructor chaining simplify unit testing?",
    shortAnswer: "Tests only need to comprehensively test the Master Constructor for edge cases, while simpler constructors only need default value verification.",
    explanation: "Validation logic is tested once, reducing unit test redundancy.",
    hint: "Test master constructor thoroughly; verify defaults for others.",
    level: "Intermediate",
    codeExample: "@Test void testMasterConstructorValidation() { ... }"
  },
  {
    question: "What is the maximum depth of constructor chaining recommended in clean code?",
    shortAnswer: "3 to 4 levels of delegation. Beyond that, the code becomes convoluted and should be refactored to a Builder or Factory.",
    explanation: "Excessive delegation depth obscures which defaults are being set.",
    hint: "3 to 4 levels maximum.",
    level: "Intermediate",
    codeExample: "// 1-Arg -> 2-Arg -> Master (Clean 3-level chain)"
  },
  {
    question: "Summarize the primary benefit of Constructor Chaining.",
    shortAnswer: "Constructor chaining enforces the DRY principle by routing all object initialization pathways into a single master constructor with guaranteed invariant validation.",
    explanation: "It delivers flexible APIs without duplicating a single line of field assignment or validation code.",
    hint: "DRY principle with single master validation hub.",
    level: "Beginner",
    codeExample: "// Master constructor routes all genesis paths safely"
  }
];

export default topic7_questions;