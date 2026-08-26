const topic10_questions = [
  {
    question: "What is an Instance Initialization Block (IIB) in Java?",
    shortAnswer: "An unnamed block of code enclosed in curly braces '{ ... }' placed directly inside a class body, executed every time an instance of the class is created.",
    explanation: "IIBs execute before the constructor body runs, allowing developers to share common initialization logic across all constructors.",
    hint: "Unnamed block { ... } in class body executed on each object creation.",
    level: "Beginner",
    codeExample: "class Student {\n    { System.out.println(\"IIB runs!\"); }\n}"
  },
  {
    question: "When does an Instance Initialization Block execute relative to the Constructor?",
    shortAnswer: "An IIB executes on every object instantiation immediately after the superclass constructor ('super()') returns and immediately before the constructor body executes.",
    explanation: "The compiler copies all IIB code directly into the beginning of every constructor, right after the call to 'super()'.",
    hint: "super() -> IIB -> Constructor body.",
    level: "Beginner",
    codeExample: "// Order: super() -> IIB -> Constructor Body"
  },
  {
    question: "How does the Java compiler handle multiple IIBs in the same class?",
    shortAnswer: "Multiple IIBs execute in exact top-to-bottom textual order as they appear in the source code.",
    explanation: "The compiler concatenates their bytecode sequentially into each compiled constructor '<init>'.",
    hint: "Executes in top-to-bottom textual order.",
    level: "Intermediate",
    codeExample: "{ System.out.println(\"First IIB\"); }\n{ System.out.println(\"Second IIB\"); }"
  },
  {
    question: "Why use an IIB instead of placing common logic in a Master Constructor?",
    shortAnswer: "IIBs are useful when initializations must execute for ALL constructors without forcing constructor chaining, and for anonymous inner classes which cannot declare constructors.",
    explanation: "Anonymous inner classes cannot have named constructors, making IIBs the only way to execute instance initialization logic.",
    hint: "Useful for anonymous inner classes and universal constructor logic.",
    level: "Intermediate",
    codeExample: "List<String> list = new ArrayList<>() {{ add(\"Java\"); }}; // Double brace uses IIB"
  },
  {
    question: "Can an Instance Initialization Block throw checked exceptions?",
    shortAnswer: "Yes, but ONLY if ALL constructors in the class explicitly declare that checked exception in their 'throws' clauses.",
    explanation: "Because the compiler inlines the IIB into every constructor, unhandled checked exceptions in an IIB cause compile errors unless declared by every constructor.",
    hint: "All constructors must declare the checked exception.",
    level: "Advanced",
    codeExample: "class Demo {\n    { if (true) throw new IOException(); }\n    Demo() throws IOException {} // Required!\n}"
  },
  {
    question: "Can an IIB access 'this' and instance variables?",
    shortAnswer: "Yes! IIBs execute in instance context on the newly allocated Heap object and can freely access 'this' and instance fields.",
    explanation: "Unlike static blocks, IIBs have full access to instance state.",
    hint: "Full access to this and instance fields.",
    level: "Beginner",
    codeExample: "{ this.id = generateId(); }"
  },
  {
    question: "Can an IIB contain a 'return' statement?",
    shortAnswer: "No! Writing 'return;' inside an IIB causes a compile-time error: 'cannot return a value from initializer block'.",
    explanation: "IIBs are blocks, not methods; return statements are syntactically prohibited.",
    hint: "return statement is prohibited inside IIBs.",
    level: "Intermediate",
    codeExample: "// Compile Error: { return; }"
  },
  {
    question: "How does the Java compiler inline IIBs into bytecode?",
    shortAnswer: "The compiler copies the bytecode of all IIBs into every constructor '<init>' immediately following 'invokespecial super.<init>'.",
    explanation: "In compiled bytecode, IIBs do not exist as separate methods; they are inlined into constructors.",
    hint: "Inlined directly into <init> after invokespecial super.<init>.",
    level: "Advanced",
    codeExample: "// javap shows IIB code inside every <init> method"
  },
  {
    question: "What is the 'Double Brace Initialization' anti-pattern in Java?",
    shortAnswer: "Creating an anonymous subclass with an IIB to populate collections (e.g. 'new ArrayList<>() {{ add(\"A\"); }}').",
    explanation: "It creates hidden anonymous class files and memory leaks (retaining references to enclosing instances).",
    hint: "Anonymous inner class with IIB; creates memory leaks.",
    level: "Advanced",
    codeExample: "Set<String> set = new HashSet<>() {{ add(\"Barrackpore\"); }}; // Avoid in production"
  },
  {
    question: "What is the classroom story by Sukanta Hui for IIBs in Barrackpore?",
    shortAnswer: "The Lab Terminal Security Clearance: Every time a student (Swadeep or Tuhina) logs in, the IIB generates a security UUID and runs hardware diagnostics automatically before any constructor assigns the seat!",
    explanation: "Universal security checks run automatically regardless of which constructor was selected.",
    hint: "Automatic security UUID generation on every terminal login.",
    level: "Beginner",
    codeExample: "LabTerminalSession s = new LabTerminalSession(\"Swadeep\");"
  },
  {
    question: "Do IIBs execute when a constructor delegates to another constructor via 'this()'?",
    shortAnswer: "No! IIBs execute only ONCE per object creation, inside the constructor that invokes 'super()'.",
    explanation: "Because IIBs are inlined after 'super()', chaining via 'this()' does not duplicate IIB execution.",
    hint: "IIBs execute only once per object creation.",
    level: "Advanced",
    codeExample: "// Chain: C1 -> this() -> C2 -> super() -> IIB -> C2 body -> C1 body"
  },
  {
    question: "Can an IIB be declared 'static'?",
    shortAnswer: "Adding 'static' turns it into a Static Initialization Block (SIB), which executes once when the class is loaded, not per instance.",
    explanation: "Without 'static', it is an instance block; with 'static', it is a class-level block.",
    hint: "Adding static converts it into a class-level SIB.",
    level: "Beginner",
    codeExample: "static { /* SIB runs once at class load */ }\n{ /* IIB runs on every new */ }"
  },
  {
    question: "Can an IIB have an access modifier (public, private)?",
    shortAnswer: "No! Access modifiers are strictly illegal on initialization blocks: 'modifier public not allowed here'.",
    explanation: "Initialization blocks are not member declarations and cannot have visibility modifiers.",
    hint: "Access modifiers are prohibited on IIBs.",
    level: "Beginner",
    codeExample: "// Compile Error: public { System.out.println(); }"
  },
  {
    question: "In what order do inline field initializers and IIBs execute?",
    shortAnswer: "In the exact textual order in which they appear in the class source code.",
    explanation: "If 'int x = 10;' appears before '{ x = 20; }', x becomes 10 then 20.",
    hint: "Textual order from top to bottom.",
    level: "Intermediate",
    codeExample: "int a = 5;\n{ a = 10; } // a is 10"
  },
  {
    question: "Can an IIB access a field declared below it (forward reference)?",
    shortAnswer: "You can assign to a forward-declared field ('x = 10;'), but you cannot read from it ('int y = x;') without a compile error: 'illegal forward reference'.",
    explanation: "Java restricts reading fields before their textual declaration.",
    hint: "Writing is allowed; reading causes illegal forward reference.",
    level: "Advanced",
    codeExample: "{ x = 10; /* Legal */ /* int y = x; */ /* Illegal! */ } int x;"
  },
  {
    question: "Can an IIB be overloaded or overridden?",
    shortAnswer: "No! IIBs have no names, take no parameters, and are inlined into bytecode, so overloading and overriding are impossible.",
    explanation: "Only methods and constructors can be overloaded; blocks are anonymous code segments.",
    hint: "IIBs cannot be overloaded or overridden.",
    level: "Beginner",
    codeExample: "// IIBs have no names or parameters"
  },
  {
    question: "Does deserialization execute Instance Initialization Blocks?",
    shortAnswer: "No. Standard Java serialization/deserialization does NOT invoke IIBs for Serializable classes.",
    explanation: "Deserialization restores fields directly from bytes without constructor/IIB execution.",
    hint: "Deserialization bypasses IIBs.",
    level: "Expert",
    codeExample: "// IIBs are skipped during deserialization"
  },
  {
    question: "Can an abstract class declare an IIB?",
    shortAnswer: "Yes! The abstract class's IIB executes when concrete subclass constructors invoke 'super()'.",
    explanation: "Abstract parent IIBs run during parent initialization.",
    hint: "Abstract classes can declare IIBs executed via super().",
    level: "Intermediate",
    codeExample: "abstract class Base { { System.out.println(\"Base IIB\"); } }"
  },
  {
    question: "Can an interface declare an Instance Initialization Block?",
    shortAnswer: "No! Interfaces cannot have instance state or instance initializers; only static nested structures are permitted.",
    explanation: "Interfaces lack instance fields and instance lifecycle.",
    hint: "Interfaces cannot contain IIBs.",
    level: "Beginner",
    codeExample: "// Compile Error if IIB is placed in interface"
  },
  {
    question: "Summarize the primary purpose of Instance Initialization Blocks.",
    shortAnswer: "IIBs provide universal pre-constructor initialization logic that executes automatically on every object creation immediately following superclass constructor completion.",
    explanation: "They are indispensable for anonymous inner classes and unified security/logging routines.",
    hint: "Universal pre-constructor initialization logic.",
    level: "Beginner",
    codeExample: "// Universal initialization before constructor body"
  }
];

export default topic10_questions;