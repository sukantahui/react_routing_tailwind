const topic8_questions = [
  {
    question: "Why does Java require 'this(...)' to be the very first statement in a constructor body?",
    shortAnswer: "To guarantee that the target constructor executes and initializes the object state before any subsequent instructions in the caller constructor run.",
    explanation: "Executing statements prior to object initialization could allow code to read uninitialized or invalid field states.",
    hint: "Ensures object state is initialized before any custom logic runs.",
    level: "Beginner",
    codeExample: "public Student() {\n    this(\"Default\"); // Line 1: VALID\n    System.out.println(\"Initialized\");\n}"
  },
  {
    question: "What compilation error occurs if 'this(...)' is placed on line 2 after another statement?",
    shortAnswer: "'call to this must be first statement in constructor'.",
    explanation: "The compiler rejects any constructor where 'this()' is preceded by any executable statement or variable assignment.",
    hint: "call to this must be first statement in constructor.",
    level: "Beginner",
    codeExample: "// COMPILE ERROR:\npublic Student() {\n    System.out.println(\"Hi\");\n    this(\"Default\");\n}"
  },
  {
    question: "Can comments or whitespace precede 'this(...)'?",
    shortAnswer: "Yes. Comments and blank lines are ignored by the compiler and do not count as executable statements.",
    explanation: "Only executable Java statements violate the first statement mandate.",
    hint: "Comments and whitespace are completely legal before this().",
    level: "Beginner",
    codeExample: "// Valid:\n/* Student constructor */\npublic Student() {\n    // Header comment\n    this(\"Swadeep\");\n}"
  },
  {
    question: "Can you call an instance method as an argument to 'this(...)'?",
    shortAnswer: "No! 'cannot reference this before supertype constructor has been called'.",
    explanation: "Because 'this' is not yet fully initialized, instance methods (which require a valid 'this' receiver) cannot be executed.",
    hint: "Instance methods cannot be called in this(...) arguments.",
    level: "Intermediate",
    codeExample: "// Illegal: this(getCalculatedFee()); // Instance method call fails"
  },
  {
    question: "Can you call a static method as an argument to 'this(...)'?",
    shortAnswer: "Yes! Static methods do not require an instance receiver and can be evaluated before constructor execution.",
    explanation: "Static helper functions are frequently used to sanitize or compute constructor arguments.",
    hint: "Static methods are fully permitted as arguments in this(...).",
    level: "Intermediate",
    codeExample: "public Student(String rawName) {\n    this(sanitize(rawName)); // static sanitize() is legal\n}"
  },
  {
    question: "Can you access instance variables inside the argument list of 'this(...)'?",
    shortAnswer: "No. Instance variables do not exist with valid state yet and cannot be accessed: 'cannot reference this before constructor call'.",
    explanation: "Attempting to pass 'this.defaultHub' into 'this(this.defaultHub)' triggers a compile error.",
    hint: "Instance variables are inaccessible; static variables are allowed.",
    level: "Intermediate",
    codeExample: "// Illegal: this(this.hubName);\n// Legal: this(DEFAULT_HUB_CONSTANT);"
  },
  {
    question: "Can a constructor contain multiple 'this(...)' calls in different 'if-else' branches?",
    shortAnswer: "No! Because 'this()' must be the very first statement on line 1, wrapping it inside an 'if' condition violates the rule.",
    explanation: "Conditionals can only be used INSIDE the argument list using ternary operators (e.g. 'this(cond ? a : b)').",
    hint: "Use ternary operator inside this(...) argument list instead of if-else.",
    level: "Advanced",
    codeExample: "public Student(boolean isVip) {\n    this(isVip ? 100 : 500); // Legal ternary inside this()\n}"
  },
  {
    question: "Can a try-catch block wrap a 'this(...)' call?",
    shortAnswer: "No. Putting 'try {' before 'this()' makes 'try' the first statement, causing a compile error.",
    explanation: "Constructor chaining calls cannot be guarded by try-catch blocks in the caller constructor.",
    hint: "try-catch cannot precede this().",
    level: "Advanced",
    codeExample: "// Illegal: try { this(); } catch(Exception e) {}"
  },
  {
    question: "Can you pass 'new OtherClass()' as an argument into 'this(...)'?",
    shortAnswer: "Yes! Constructing a separate independent object to pass as an argument is fully valid.",
    explanation: "The other object is instantiated on the stack/heap and passed as a reference parameter.",
    hint: "Instantiating helper objects in this(...) arguments is legal.",
    level: "Intermediate",
    codeExample: "public Student(String name) {\n    this(name, new Address(\"Barrackpore\"));\n}"
  },
  {
    question: "What is JEP 447 / JEP 482 ('Flexible Constructor Bodies') in modern Java 22+?",
    shortAnswer: "A preview feature in Java 22+ allowing statements (validation, transformations) to run before 'super()' or 'this()', provided they do not access 'this'.",
    explanation: "It relaxes the strict line 1 requirement to allow argument preparation before chaining without using ugly static helper hacks.",
    hint: "Java 22+ allows statements before super/this if they don't access this.",
    level: "Expert",
    codeExample: "// Java 22+: Validation before super/this without static methods"
  },
  {
    question: "What is Sukanta Hui's memory rule for the 'this()' first statement mandate?",
    shortAnswer: "'Before you build the roof or paint the walls, you must lay the foundation on line 1.'",
    explanation: "Delegation to the foundation constructor must happen before any custom processing in the constructor body.",
    hint: "Lay foundation on line 1 before painting the walls.",
    level: "Beginner",
    codeExample: "// Foundation on Line 1: this(args);"
  },
  {
    question: "Can 'super(...)' be placed after 'this(...)' in the same constructor?",
    shortAnswer: "No. You cannot use both 'this()' and 'super()' in the same constructor under any circumstances.",
    explanation: "A constructor delegates to EITHER a peer in the same class (this) OR a parent (super). The peer constructor will eventually call super.",
    hint: "Strictly mutually exclusive.",
    level: "Beginner",
    codeExample: "// Illegal: cannot have both this() and super()"
  },
  {
    question: "Can you return early before 'this(...)'?",
    shortAnswer: "No. Any statement (including 'return;') before 'this()' causes a compile error.",
    explanation: "'this()' must be the first physical statement in the body.",
    hint: "No statements allowed before this().",
    level: "Beginner",
    codeExample: "// Compile error if return; precedes this()"
  },
  {
    question: "Can a constructor have 'this()' and also execute statements after 'this()'?",
    shortAnswer: "Yes! Statements after 'this(...)' are fully valid and execute after the chained constructor returns.",
    explanation: "Code after 'this()' is commonly used for post-initialization logging, event dispatch, or secondary configuration.",
    hint: "Code after this(...) is fully permitted.",
    level: "Beginner",
    codeExample: "public Student(int id) {\n    this(id, \"Unknown\");\n    System.out.println(\"Chaining completed\"); // Valid post-init\n}"
  },
  {
    question: "Can local variables be declared before 'this(...)' in Java 8 to 21?",
    shortAnswer: "No. In standard Java up to Java 21, zero statements (including variable declarations) can precede 'this()'.",
    explanation: "Variable declarations count as statements and are rejected by javac.",
    hint: "No variable declarations permitted before this().",
    level: "Intermediate",
    codeExample: "// Illegal: int x = 10; this(x);"
  },
  {
    question: "How do you pass a complex multi-step calculation into 'this(...)' in Java 8 to 21?",
    shortAnswer: "By encapsulating the multi-step calculation in a 'private static' helper method and invoking that method inside 'this(...)'.",
    explanation: "Static helper methods compute the complex value cleanly within the argument expression.",
    hint: "Use private static helper method.",
    level: "Intermediate",
    codeExample: "private static double computeFee(int tier) { /* multi-step */ return fee; }\npublic Student(int tier) { this(computeFee(tier)); }"
  },
  {
    question: "What happens if a static helper called inside 'this(...)' throws an exception?",
    shortAnswer: "The exception propagates immediately, preventing constructor dispatch and abandoning object creation.",
    explanation: "Arguments are evaluated before the '<init>' method is invoked.",
    hint: "Exception in helper aborts construction before dispatch.",
    level: "Advanced",
    codeExample: "this(checkPositive(id)); // If checkPositive throws, construction stops"
  },
  {
    question: "Can you pass a lambda expression into 'this(...)'?",
    shortAnswer: "Yes, as long as the lambda does not capture or reference 'this' or instance members.",
    explanation: "Stateless lambdas or lambdas capturing static variables are legal constructor arguments.",
    hint: "Lambdas are legal if they do not capture 'this'.",
    level: "Expert",
    codeExample: "public TaskRunner() { this(() → System.out.println(\"Running\")); }"
  },
  {
    question: "Can a constructor parameter be passed directly into 'this(...)'?",
    shortAnswer: "Yes! Forwarding caller parameters to peer constructors is the most common use case for constructor chaining.",
    explanation: "'Student(int id) { this(id, \"Default\"); }' forwards 'id' directly.",
    hint: "Forwarding parameters is the standard chaining idiom.",
    level: "Beginner",
    codeExample: "public Student(int roll) { this(roll, \"Unknown\"); }"
  },
  {
    question: "Does the compiler enforce the first-statement rule for non-constructor methods?",
    shortAnswer: "No. In regular methods, 'this' is a reference variable, not an invocation syntax. You cannot call 'this()' inside regular methods at all.",
    explanation: "'this()' constructor invocation is only valid inside constructors.",
    hint: "this() invocation is illegal inside normal methods.",
    level: "Beginner",
    codeExample: "// void myMethod() { this(); } // COMPILE ERROR"
  },
  {
    question: "Can you pass an anonymous class into 'this(...)'?",
    shortAnswer: "Yes, provided the anonymous class does not reference enclosing instance state.",
    explanation: "Static-context anonymous classes can be passed as arguments.",
    hint: "Legal if no enclosing instance state is referenced.",
    level: "Expert",
    codeExample: "public Service() { this(new Runnable() { public void run() {} }); }"
  },
  {
    question: "Can constructor arguments be verified with 'assert' before 'this(...)' in Java 21?",
    shortAnswer: "No. 'assert' is a statement and cannot precede 'this()' in Java 21. Use validation inside static helper methods instead.",
    explanation: "Static helper functions can evaluate assertions or throw exceptions.",
    hint: "Use static validation methods instead of assert statements.",
    level: "Intermediate",
    codeExample: "this(validate(arg));"
  },
  {
    question: "What bytecode opcode evaluates expressions before 'this(...)'?",
    shortAnswer: "Standard bytecode opcodes (e.g. 'iload', 'invokestatic', 'ldc') execute to push arguments onto the operand stack before 'invokespecial'.",
    explanation: "The operand stack holds evaluated arguments right before the '<init>' dispatch.",
    hint: "Stack operations evaluate arguments prior to invokespecial.",
    level: "Expert",
    codeExample: "// Bytecode: invokestatic Helper.format → invokespecial Student.<init>"
  },
  {
    question: "Can a subclass constructor call 'this()' to chain to another subclass constructor?",
    shortAnswer: "Yes! Subclass constructors can chain among themselves via 'this()'; only the final subclass constructor in the chain calls 'super()'.",
    explanation: "This allows subclasses to have their own multi-tier constructor hierarchies.",
    hint: "Subclass constructors chain via this(); terminal calls super().",
    level: "Intermediate",
    codeExample: "Child(int x) { this(x, 0); }\nChild(int x, int y) { super(x); this.y = y; }"
  },
  {
    question: "Why is 'super()' automatically inserted if neither 'this()' nor 'super()' is written?",
    shortAnswer: "To guarantee that the Java Object Model establishes the parent state before any subclass code executes.",
    explanation: "Every object must inherit from java.lang.Object; parent state initialization cannot be bypassed.",
    hint: "Guarantees base Object class initialization.",
    level: "Beginner",
    codeExample: "// Implicit super() inserted on line 1"
  },
  {
    question: "Can you assign a static variable inside the constructor before calling 'this(...)' in Java 21?",
    shortAnswer: "No. Assigning static variables is a statement and cannot precede 'this()' in Java 21.",
    explanation: "All statements before this() are rejected in Java 8-21.",
    hint: "No assignments permitted before this() in Java 21.",
    level: "Intermediate",
    codeExample: "// Illegal: counter++; this();"
  },
  {
    question: "How does the first statement rule prevent the 'uninitialized this' memory exploit in the JVM?",
    shortAnswer: "It prevents malicious code from publishing an uninitialized 'this' reference to other threads or native code before class invariants are initialized.",
    explanation: "Enforcing super/this before code execution is a fundamental JVM type safety guarantee.",
    hint: "Prevents publishing uninitialized references to other threads.",
    level: "Expert",
    codeExample: "// Security guarantee against escape of uninitialized memory"
  },
  {
    question: "Can you use a method reference (e.g. 'Math::max') inside a 'this(...)' call?",
    shortAnswer: "Yes, passing method references as functional interface arguments to 'this(...)' is valid as long as they are static or target external objects.",
    explanation: "Method references to static methods are evaluated without instance context.",
    hint: "Static method references are valid in this(...) arguments.",
    level: "Advanced",
    codeExample: "public Sorter() { this(Integer::compare); }"
  },
  {
    question: "Can a record constructor use 'this(...)' chaining?",
    shortAnswer: "Yes! Custom record constructors can chain to the canonical record constructor via 'this(...)'.",
    explanation: "All non-canonical record constructors MUST explicitly delegate to the canonical constructor via 'this(...)'.",
    hint: "Non-canonical record constructors must delegate to canonical constructor.",
    level: "Advanced",
    codeExample: "public record Student(String name, int roll) {\n    public Student(String name) { this(name, 0); }\n}"
  },
  {
    question: "Summarize the cardinal rule of 'this()' invocation.",
    shortAnswer: "'this()' must always be the very first statement in a constructor body, delegating execution to a peer constructor before any local constructor code runs.",
    explanation: "It is the ironclad rule of constructor chaining in Java OOP architecture.",
    hint: "Strict line 1 mandate for constructor delegation.",
    level: "Beginner",
    codeExample: "// Cardinal Rule: this(...) on Line 1 always!"
  }
];

export default topic8_questions;