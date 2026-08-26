const topic6_questions = [
  {
    question: "What is Constructor Overloading in Java?",
    shortAnswer: "Defining multiple constructors within the same class, each possessing a unique parameter list (different number, types, or sequence of parameters).",
    explanation: "Constructor overloading provides flexibility, allowing clients to instantiate objects with different sets of initial data depending on context.",
    hint: "Multiple constructors with distinct parameter signatures.",
    level: "Beginner",
    codeExample: "class Student {\n    Student() {}\n    Student(String name) {}\n    Student(int roll, String name) {}\n}"
  },
  {
    question: "How does the Java compiler resolve which overloaded constructor to invoke?",
    shortAnswer: "Through static compile-time binding by matching the number, types, and order of arguments provided at the 'new' invocation site.",
    explanation: "If no exact match exists, the compiler applies implicit type widening (e.g. byte -> short -> int -> long -> float -> double) or boxing/unboxing.",
    hint: "Compile-time argument matching with widening/boxing rules.",
    level: "Intermediate",
    codeExample: "new CourseBatch(\"JAVA-1\", \"OOP\"); // Matches (String, String)"
  },
  {
    question: "Can constructors be overloaded based on return type in Java?",
    shortAnswer: "No! Constructors have NO return type at all, so return types cannot play any role in constructor overloading.",
    explanation: "Only parameter count, parameter types, and parameter order differentiate overloaded constructors.",
    hint: "Constructors have zero return types.",
    level: "Beginner",
    codeExample: "// Overloading is strictly parameter-based"
  },
  {
    question: "What is the difference between Constructor Overloading and Method Overloading?",
    shortAnswer: "Constructor overloading initializes new Heap instances and uses the exact class name; method overloading executes operations on existing instances and uses custom method names.",
    explanation: "Both follow identical signature differentiation rules (parameter lists), but constructors lack return types and execute during 'new'.",
    hint: "Identical signature rules, but constructors lack return types.",
    level: "Intermediate",
    codeExample: "// Constructor: Student(int), Student(String)\n// Method: void study(int), void study(String)"
  },
  {
    question: "Can constructors be overloaded by changing only the parameter variable names?",
    shortAnswer: "No! Parameter names are ignored by the compiler; only parameter data types and sequence count toward the method signature.",
    explanation: "'Student(int rollNumber)' and 'Student(int candidateId)' have the identical signature '(int)' and cause a duplicate method error.",
    hint: "Parameter types matter; parameter names are ignored.",
    level: "Beginner",
    codeExample: "// Compile Error: duplicate constructor\nStudent(int roll) {}\nStudent(int id) {}"
  },
  {
    question: "What causes ambiguity errors during constructor overloading?",
    shortAnswer: "When multiple overloaded constructors can accept the supplied arguments through widening or varargs, and the compiler cannot determine the most specific match.",
    explanation: "For example, calling with 'null' on 'Demo(String)' and 'Demo(Integer)' causes an ambiguous method call error.",
    hint: "Ambiguous match when multiple types can accept the same literal/null.",
    level: "Advanced",
    codeExample: "class Demo { Demo(String s) {} Demo(Integer i) {} }\n// new Demo(null); // COMPILE ERROR: reference to Demo is ambiguous"
  },
  {
    question: "How does constructor overloading improve API usability?",
    shortAnswer: "It allows callers to instantiate objects without specifying optional values, while allowing advanced callers to customize all settings.",
    explanation: "Beginners can use simple 1-parameter constructors, while enterprise integrations can use detailed 5-parameter constructors.",
    hint: "Provides both simple defaults and granular customization.",
    level: "Intermediate",
    codeExample: "new CourseBatch(\"J1\", \"Java\"); // Simple\nnew CourseBatch(\"J1\", \"Java\", \"Sukanta Hui\", 40, \"Barrackpore\"); // Detailed"
  },
  {
    question: "Can an overloaded constructor invoke another overloaded constructor in the same class?",
    shortAnswer: "Yes! By using the 'this(...)' constructor call syntax on the very first line of the constructor body.",
    explanation: "This practice is called Constructor Chaining and prevents code duplication.",
    hint: "Use this(...) on line 1 for constructor chaining.",
    level: "Beginner",
    codeExample: "public CourseBatch(String code) { this(code, \"General Java\"); }"
  },
  {
    question: "Can an overloaded constructor have a different access modifier than other constructors in the same class?",
    shortAnswer: "Yes. For example, a class can have a 'public' constructor for external use and a 'private' or 'protected' constructor for internal factory/subclass use.",
    explanation: "Each overloaded constructor has its own independent access modifier.",
    hint: "Access modifiers are configured independently per constructor.",
    level: "Intermediate",
    codeExample: "public Student(String name) { this(name, 0); }\nprivate Student(String name, int internalFlag) {}"
  },
  {
    question: "What is the classroom story by Sukanta Hui for constructor overloading in Barrackpore?",
    shortAnswer: "Course registration packages: Standard batch (just course name), Regional batch (+ Naihati/Shyamnagar hub), and VIP Intensive batch (full custom mentor + cap + lab choice).",
    explanation: "Swadeep, Tuhina, and Abhronila can each register using the constructor matching their specific enrollment package.",
    hint: "Tiered course packages matching student enrollment needs.",
    level: "Beginner",
    codeExample: "new CourseBatch(\"Core-Java\", \"Barrackpore\");"
  },
  {
    question: "How does constructor overloading interact with varargs?",
    shortAnswer: "Varargs constructors have the lowest priority during compile-time overload resolution and only match if no exact fixed-arity constructor matches.",
    explanation: "Fixed-parameter constructors always take precedence over varargs constructors.",
    hint: "Fixed-arity constructors beat varargs in overload resolution.",
    level: "Advanced",
    codeExample: "Demo(int a) {} // Preferred\nDemo(int... a) {} // Fallback for multiple or 0 ints"
  },
  {
    question: "Can you overload constructors with wrapper classes and primitive types (e.g. int vs Integer)?",
    shortAnswer: "Yes. Javac prefers primitive exact match over autoboxing, but passing an explicit Integer or int directs invocation.",
    explanation: "Passing '10' invokes 'Demo(int)'. Passing 'Integer.valueOf(10)' invokes 'Demo(Integer)'.",
    hint: "Primitive exact match precedes autoboxing to wrapper.",
    level: "Intermediate",
    codeExample: "Demo(int x) {}\nDemo(Integer x) {}"
  },
  {
    question: "How does constructor overloading differ from factory methods?",
    shortAnswer: "Constructors cannot have distinct method names (must all match the class name), while factory methods can have descriptive names like 'createWithDefaults()'.",
    explanation: "When constructor parameter lists become ambiguous or confusing, static factory methods provide clear intent.",
    hint: "Factory methods have descriptive names; constructors share one class name.",
    level: "Intermediate",
    codeExample: "ComplexNumber.fromCartesian(x, y);\nComplexNumber.fromPolar(r, theta);"
  },
  {
    question: "What is the maximum number of constructors a single class can declare?",
    shortAnswer: "Java bytecode specification limits the total number of methods (including constructors) in a single class to 65,535.",
    explanation: "Practically, having more than 5-7 overloaded constructors indicates poor class design and should be refactored to a Builder.",
    hint: "JVM method table limit is 65,535; clean code limit is 4-5.",
    level: "Expert",
    codeExample: "// JVM method limit: 65,535"
  },
  {
    question: "Can an overloaded constructor be declared 'final'?",
    shortAnswer: "No. All constructors (overloaded or not) cannot be declared 'final' in Java.",
    explanation: "Constructors are never inherited, making 'final' illegal syntax.",
    hint: "final modifier is prohibited on all constructors.",
    level: "Beginner",
    codeExample: "// Compile Error: modifier final not allowed here"
  },
  {
    question: "Can constructors be overloaded in an abstract class?",
    shortAnswer: "Yes. Abstract classes can declare multiple overloaded constructors to be invoked by subclass constructors via 'super(...)'.",
    explanation: "Subclasses choose which abstract parent constructor to chain to based on parameters.",
    hint: "Abstract classes can overload constructors for subclasses to chain to.",
    level: "Intermediate",
    codeExample: "abstract class Account { Account(long num) {} Account(long num, double bal) {} }"
  },
  {
    question: "Can two constructors differ only by 'throws' clauses?",
    shortAnswer: "No. 'throws' clauses are not part of the method signature for overloading resolution.",
    explanation: "Parameter types, count, and order are the only components of a constructor signature.",
    hint: "Throws clauses do not differentiate overloaded signatures.",
    level: "Intermediate",
    codeExample: "// Compile Error: duplicate constructor\nDemo() throws IOException {}\nDemo() throws SQLException {}"
  },
  {
    question: "What is the downside of having too many overloaded constructors without constructor chaining?",
    shortAnswer: "Code duplication! If 5 constructors duplicate validation and field assignments, maintaining changes becomes error-prone.",
    explanation: "Failing to chain constructors violates the DRY (Don't Repeat Yourself) principle.",
    hint: "Causes code duplication and violation of DRY principle.",
    level: "Intermediate",
    codeExample: "// Chaining via this() eliminates duplicate assignment code"
  },
  {
    question: "How does the JVM represent overloaded constructors in bytecode?",
    shortAnswer: "All overloaded constructors share the same bytecode name '<init>', but have distinct method descriptors reflecting their parameter types.",
    explanation: "For example, '<init>()V', '<init>(Ljava/lang/String;)V', and '<init>(ILjava/lang/String;)V'.",
    hint: "Identical <init> name with distinct parameter descriptors.",
    level: "Expert",
    codeExample: "// javap: <init>:(Ljava/lang/String;Ljava/lang/String;)V"
  },
  {
    question: "Can an overloaded constructor accept an array vs varargs of the same type?",
    shortAnswer: "No! 'Student(String[])' and 'Student(String...)' compile to the identical parameter signature in bytecode and cause a duplicate constructor error.",
    explanation: "Varargs are syntactic sugar for arrays at the bytecode level.",
    hint: "String[] and String... share identical bytecode signatures.",
    level: "Advanced",
    codeExample: "// Compile Error: duplicate constructor\nDemo(String[] arr) {}\nDemo(String... arr) {}"
  },
  {
    question: "How does type promotion work in overloaded constructor selection?",
    shortAnswer: "If an exact match is missing, Java promotes smaller primitives to larger primitives (e.g. passing a byte matches a constructor taking int or long).",
    explanation: "Type widening is preferred before autoboxing or varargs.",
    hint: "Automatic widening to larger primitive types.",
    level: "Intermediate",
    codeExample: "Demo(long x) {}\nnew Demo(10); // 10 (int) is widened to long"
  },
  {
    question: "Can an enum have overloaded constructors?",
    shortAnswer: "Yes! Enums can have multiple private overloaded constructors to initialize distinct enum constants.",
    explanation: "Enum constants can pass different argument lists to their private constructors.",
    hint: "Enums support private overloaded constructors.",
    level: "Intermediate",
    codeExample: "enum Hub {\n    BARRACKPORE(1, \"North\"),\n    NAIHATI(2);\n    Hub(int id) { this(id, \"Default\"); }\n    Hub(int id, String zone) {}\n}"
  },
  {
    question: "What is constructor overloading resolution order between boxing and widening?",
    shortAnswer: "1. Exact primitive match, 2. Primitive widening, 3. Autoboxing, 4. Autoboxing + Upcasting to Object, 5. Varargs.",
    explanation: "Widening beats boxing; boxing beats varargs.",
    hint: "Exact -> Widening -> Boxing -> Upcasting -> Varargs.",
    level: "Expert",
    codeExample: "// Primitive widening always beats autoboxing"
  },
  {
    question: "Can you overload constructors in generic classes?",
    shortAnswer: "Yes. Generic classes can overload constructors with generic and non-generic parameter types.",
    explanation: "Generic constructors participate normally in overload resolution.",
    hint: "Generic classes fully support overloaded constructors.",
    level: "Advanced",
    codeExample: "class Box<T> { Box(T item) {} Box(T item, String label) {} }"
  },
  {
    question: "Can type erasure cause constructor overloading collisions in generic classes?",
    shortAnswer: "Yes! 'Box(List<String> list)' and 'Box(List<Integer> list)' both erase to 'Box(List list)' and cause a compile error: 'name clash'.",
    explanation: "Type erasure removes generic arguments at compile time, leaving identical bytecode signatures.",
    hint: "Generic type erasure can cause signature collision.",
    level: "Expert",
    codeExample: "// Compile Error: name clash\nBox(List<String> s) {}\nBox(List<Integer> i) {}"
  },
  {
    question: "Can an overloaded constructor be invoked recursively using 'new'?",
    shortAnswer: "Yes, 'new' creates a separate new object on the Heap, but doing this infinitely causes java.lang.StackOverflowError.",
    explanation: "Calling 'new ClassName()' inside a constructor allocates another object, creating an infinite allocation loop if unconditioned.",
    hint: "Creates a new object each time; unchecked recursion causes StackOverflowError.",
    level: "Intermediate",
    codeExample: "class Node { Node next; Node() { this.next = new Node(); } } // Infinite recursion!"
  },
  {
    question: "What is the recommended design pattern when constructor overloading becomes too complex?",
    shortAnswer: "The Builder Pattern (Joshua Bloch's Builder Pattern).",
    explanation: "Builders provide fluent, readable method chaining with named parameters and complete validation.",
    hint: "Use Builder Pattern for complex multi-parameter instantiation.",
    level: "Intermediate",
    codeExample: "User u = new User.Builder(\"Swadeep\").age(22).hub(\"Barrackpore\").build();"
  },
  {
    question: "Can constructor overloading be used with copy constructors?",
    shortAnswer: "Yes! A copy constructor ('Student(Student other)') is simply an overloaded constructor accepting an instance of the same class.",
    explanation: "It coexists cleanly alongside primitive and parameterized constructors.",
    hint: "Copy constructor is a specialized overloaded constructor.",
    level: "Beginner",
    codeExample: "public Student(Student source) { this(source.id, source.name); }"
  },
  {
    question: "How do overloaded constructors affect reflection in Java?",
    shortAnswer: "'Class.getConstructors()' returns an array of all public constructors; 'getDeclaredConstructor(Class<?>... parameterTypes)' selects a specific overload.",
    explanation: "Reflection requires exact parameter type arrays to look up overloaded constructors.",
    hint: "getDeclaredConstructor(Class<?>... paramTypes) looks up specific overload.",
    level: "Advanced",
    codeExample: "Constructor<CourseBatch> c = CourseBatch.class.getDeclaredConstructor(String.class, String.class);"
  },
  {
    question: "Summarize the essence of Constructor Overloading.",
    shortAnswer: "Constructor overloading empowers a class with polymorphic instantiation pathways, allowing objects to be created flexibly across simple, standard, and enterprise configurations.",
    explanation: "Combined with constructor chaining via 'this()', it guarantees clean, robust, and DRY object genesis.",
    hint: "Polymorphic instantiation with flexible parameter choices.",
    level: "Beginner",
    codeExample: "// Overloaded constructors give callers flexibility"
  }
];

export default topic6_questions;