const questions = [
  {
    question: "What are the 11 key architectural features (buzzwords) defined in Sun's original Java White Paper?",
    shortAnswer: "Simple, Object-Oriented, Distributed, Interpreted, Robust, Secure, Architecture-Neutral, Portable, High-Performance, Multi-Threaded, Dynamic.",
    explanation: "These 11 design pillars were formulated by James Gosling to define why Java is superior for network computing and enterprise systems.",
    hint: "Think of the core tenets in the Sun Microsystems 1995 White Paper.",
    level: "intermediate",
    codeExample: "// The 11 buzzwords define the Java runtime and language specification."
  },
  {
    question: "Why is Java considered 'Simple' despite having a large standard library?",
    shortAnswer: "Because it removed complex, dangerous features like pointers, multiple inheritance, and operator overloading.",
    explanation: "Java's syntax is clean and familiar (based on C++), but it eliminates direct memory pointers, header files, macro preprocessors, and struct/union constructs that cause subtle bugs.",
    hint: "Think about what dangerous C++ features Java intentionally left out.",
    level: "basic",
    codeExample: "// C++: int *p = &x; *p = 20;\n// Java: Point p = new Point(); (clean reference, no raw pointers)"
  },
  {
    question: "How does Java achieve 'Architecture-Neutral' behavior across different hardware CPUs?",
    shortAnswer: "By defining fixed-size primitive data types regardless of the underlying 32-bit or 64-bit architecture.",
    explanation: "In C/C++, an 'int' could be 16 bits on one machine and 32 or 64 bits on another. In Java, 'int' is strictly 32 bits, 'long' is 64 bits, and floating-point arithmetic adheres strictly to IEEE 754 everywhere.",
    hint: "Check the bit-width of Java primitive types on different CPUs.",
    level: "intermediate",
    codeExample: "int x = 100; // Strictly 32-bit 2's complement on EVERY CPU."
  },
  {
    question: "What makes Java 'Robust' compared to older procedural and object-oriented languages?",
    shortAnswer: "Automated garbage collection, strict static type checking, exception handling, and bounds checking.",
    explanation: "Java catches errors early at compile-time, prevents memory leaks through automatic garbage collection, enforces explicit exception handling, and checks array bounds at runtime.",
    hint: "Think of memory safety and error management mechanisms.",
    level: "basic",
    codeExample: "int[] arr = new int[3];\n// arr[5] = 10; → Throws ArrayIndexOutOfBoundsException instead of corrupting memory."
  },
  {
    question: "Why did Java creators intentionally omit operator overloading?",
    shortAnswer: "To prevent code obfuscation, ambiguity, and unintended side-effects.",
    explanation: "Operator overloading allows redefining symbols like '+' or '*' for custom objects, which often leads to confusing code. In Java, '+' is only overloaded for arithmetic and String concatenation.",
    hint: "Think of readability and clarity in enterprise codebases.",
    level: "intermediate",
    codeExample: "// Java only overloads '+' for strings: String s = \"A\" + \"B\";"
  },
  {
    question: "Why does Java not support multiple inheritance of classes?",
    shortAnswer: "To avoid ambiguity known as the 'Diamond Problem' in class hierarchies.",
    explanation: "If Class C inherits from both Class A and Class B, and both define a method foo(), the compiler cannot determine which implementation to invoke. Java avoids this by allowing single class inheritance with multiple interface implementation.",
    hint: "Think of the Dreaded Diamond of Death.",
    level: "intermediate",
    codeExample: "// Not allowed: class C extends A, B { }\n// Allowed: class C extends A implements X, Y { }"
  },
  {
    question: "What security features protect a Java program from executing malicious bytecode?",
    shortAnswer: "The Bytecode Verifier, ClassLoader architecture, Security Manager, and absence of raw memory pointers.",
    explanation: "Before execution, the Bytecode Verifier verifies class file integrity and stack invariants. ClassLoaders keep system classes separate from untrusted network code in isolated namespaces.",
    hint: "Defense-in-depth from loading to execution.",
    level: "advanced",
    codeExample: "// Sandboxed ClassLoader isolates untrusted classes."
  },
  {
    question: "How does Java support 'Multi-threading' at the core language level?",
    shortAnswer: "Through built-in java.lang.Thread, Runnable, synchronized keywords, and modern Virtual Threads.",
    explanation: "Unlike languages that rely on external OS threading libraries (like pthreads in C), Java has built-in thread management, memory visibility guarantees (JMM), and thread synchronization primitives directly in the language.",
    hint: "Look at the synchronized keyword and Thread class.",
    level: "intermediate",
    codeExample: "Thread t = new Thread(() → System.out.println(\"Concurrent task\"));\nt.start();"
  },
  {
    question: "What makes Java 'Dynamic'?",
    shortAnswer: "It loads classes on-demand at runtime and supports dynamic reflection and bytecode generation.",
    explanation: "Java does not link all dependencies into a single static binary. Instead, classes are loaded into memory dynamically via ClassLoaders when first referenced, enabling runtime plugins and hot-reloading.",
    hint: "Think of Class.forName() and dynamic ClassLoading.",
    level: "advanced",
    codeExample: "Class<?> clazz = Class.forName(\"com.example.Plugin\");\nObject instance = clazz.getDeclaredConstructor().newInstance();"
  },
  {
    question: "What does 'Distributed' mean in the context of Java features?",
    shortAnswer: "Java has native APIs (Sockets, RMI, HTTP/2, REST) for communicating across distributed computer networks.",
    explanation: "Java was designed with network computing in mind, allowing programs to open socket connections, invoke remote methods across networks (RMI), and consume web services as easily as local files.",
    hint: "Think of networking and client-server communication.",
    level: "basic",
    codeExample: "Socket socket = new Socket(\"api.codernaccotax.co.in\", 443);"
  },
  {
    question: "How does the JIT (Just-In-Time) compiler combine portability with high performance?",
    shortAnswer: "Portable bytecode is dynamically compiled into optimized native machine code during execution.",
    explanation: "Java retains portability because it distributes universal bytecode. On the host machine, the JIT compiler analyzes running hotspot loops and compiles them into blazing-fast native assembly instructions.",
    hint: "Best of both worlds: write once portability + native machine code execution.",
    level: "intermediate",
    codeExample: "// HotSpot C2 compiler optimizes frequently executed loops to native assembly."
  },
  {
    question: "What is the difference between 'Platform Independence' and 'Architecture Neutrality'?",
    shortAnswer: "Platform independence relates to OS portability (JVM); architecture neutrality relates to hardware CPU bit-widths and endianness.",
    explanation: "Platform independence means the same .class runs on Windows or Linux. Architecture neutrality means data types behave identically whether executed on x86, ARM, or RISC-V CPUs.",
    hint: "OS vs CPU hardware level.",
    level: "intermediate",
    codeExample: "// int is 32-bit two's complement on both 32-bit and 64-bit CPUs."
  },
  {
    question: "How does Java prevent memory leaks through Automatic Garbage Collection?",
    shortAnswer: "The JVM periodically identifies unreferenced objects on the heap and reclaims their allocated memory automatically.",
    explanation: "Developers create objects using 'new', but never have to manually call 'free()' or 'delete'. When an object is no longer reachable from any GC root (active threads, static variables), the GC frees its memory.",
    hint: "Reachable vs unreachable objects in Heap memory.",
    level: "basic",
    codeExample: "String s = new String(\"Temp\");\ns = null; // Original string object is now eligible for GC"
  },
  {
    question: "What is the role of the Java Bytecode Verifier in Java security?",
    shortAnswer: "It inspects .class files to ensure they don't break type safety, overflow the stack, or access unauthorized memory.",
    explanation: "Even if someone tampers with a .class file with a hex editor or custom bytecode generator, the Bytecode Verifier rejects invalid bytecode before the JVM execution engine runs it.",
    hint: "Gatekeeper preventing corrupted or malicious bytecode execution.",
    level: "advanced",
    codeExample: "// Verifier runs automatically during class linking phase."
  },
  {
    question: "Why is Java faster today than it was in 1995?",
    shortAnswer: "Advanced JIT compilers (C1/C2), escape analysis, tiered compilation, and low-latency garbage collectors (G1, ZGC).",
    explanation: "Early Java (1995) was purely interpreted and relatively slow. Modern HotSpot JVMs employ aggressive optimizations like method inlining, loop unrolling, escape analysis, and concurrent garbage collection.",
    hint: "Evolution of JIT compilation and memory reclamation.",
    level: "intermediate",
    codeExample: "// HotSpot JVM dynamically optimizes hot code paths."
  },
  {
    question: "What is 'Escape Analysis' in modern Java JVMs?",
    shortAnswer: "A JIT optimization that determines if an object is accessible outside the method where it is created.",
    explanation: "If an object does not 'escape' a method, the JIT compiler can allocate it on the thread Stack instead of the Heap (Scalar Replacement), completely eliminating garbage collection overhead for that object.",
    hint: "Stack allocation instead of Heap allocation.",
    level: "expert",
    codeExample: "public void calc() {\n    Point p = new Point(10, 20); // If p doesn't escape, JIT avoids Heap allocation!\n}"
  },
  {
    question: "Why is Java preferred for large enterprise teams compared to dynamically typed languages?",
    shortAnswer: "Static type checking prevents runtime type errors and enables massive refactoring with IDE autocomplete.",
    explanation: "In dynamically typed languages (Python, JS), typos in variable names or wrong argument types are discovered only at runtime in production. In Java, the compiler catches 100% of these errors at build time.",
    hint: "Compile-time error detection vs runtime crashes.",
    level: "intermediate",
    codeExample: "int sum = 50;\n// sum = \"fifty\"; → Caught immediately by Java compiler!"
  },
  {
    question: "How does Java handle cross-platform floating-point calculations?",
    shortAnswer: "By strictly implementing the IEEE 754 standard for float and double precision arithmetic.",
    explanation: "Floating-point values and operations (NaN, Infinity, rounding) produce identical bit patterns across all hardware architectures conforming to Java specifications.",
    hint: "IEEE 754 standard compliance.",
    level: "advanced",
    codeExample: "double d = 1.0 / 0.0; // Produces Double.POSITIVE_INFINITY on all platforms."
  },
  {
    question: "What is the Java Memory Model (JMM)?",
    shortAnswer: "The specification defining how threads interact through shared memory and when variable writes become visible.",
    explanation: "JMM defines the semantics of 'volatile', 'synchronized', and atomic variables, guaranteeing cache coherency and preventing CPU instruction reordering bugs across multi-core systems.",
    hint: "Memory visibility and thread synchronization contracts.",
    level: "expert",
    codeExample: "private volatile boolean running = true; // Guarantees visibility across CPU caches"
  },
  {
    question: "What does 'Encapsulation' mean in Java's object-oriented pillar?",
    shortAnswer: "Wrapping data (fields) and methods operating on that data into a single unit, restricting direct access via private modifiers.",
    explanation: "Encapsulation hides internal implementation details and protects object state from unauthorized modification, providing controlled access through getters and setters.",
    hint: "Data hiding and private access modifiers.",
    level: "basic",
    codeExample: "public class BankAccount {\n    private double balance;\n    public double getBalance() { return balance; }\n}"
  },
  {
    question: "What is 'Polymorphism' in Java?",
    shortAnswer: "The ability of an object or method to take on many forms (Compile-time overloading and Runtime overriding).",
    explanation: "Polymorphism allows treating subclasses uniformly through a common superclass or interface reference while executing the specialized subclass method at runtime.",
    hint: "One interface, multiple implementations.",
    level: "basic",
    codeExample: "Animal a = new Dog();\na.makeSound(); // Calls Dog's overridden makeSound()"
  },
  {
    question: "What is 'Abstraction' in Java?",
    shortAnswer: "Hiding internal complexity and showing only essential features to the user (via abstract classes and interfaces).",
    explanation: "Abstraction allows designing high-level contracts without worrying about concrete underlying mechanics (e.g. List interface abstracts ArrayList and LinkedList).",
    hint: "Showing 'what' an object does rather than 'how' it does it.",
    level: "basic",
    codeExample: "List<String> list = new ArrayList<>(); // Abstract contract List"
  },
  {
    question: "What is 'Inheritance' in Java?",
    shortAnswer: "A mechanism where a child class inherits properties and behaviors from a parent class via 'extends'.",
    explanation: "Inheritance models the 'IS-A' relationship, fostering code reuse and polymorphic behavior across domain hierarchies.",
    hint: "Child class extending parent class.",
    level: "basic",
    codeExample: "class Student extends Person { }"
  },
  {
    question: "What is the difference between Checked and Unchecked exceptions in Java's robust architecture?",
    shortAnswer: "Checked exceptions are verified at compile time; Unchecked exceptions (RuntimeExceptions) occur at runtime.",
    explanation: "Checked exceptions (IOException, SQLException) force developers to handle expected failure cases using try-catch or throws. Unchecked exceptions (NullPointerException, ArithmeticException) represent programming bugs.",
    hint: "Compile-time enforcement vs runtime faults.",
    level: "intermediate",
    codeExample: "// Checked: FileReader fr = new FileReader(\"test.txt\"); (Must handle IOException)\n// Unchecked: int x = 10 / 0; (RuntimeException)"
  },
  {
    question: "What is the difference between a process and a thread in Java?",
    shortAnswer: "A process is an isolated executing program with its own memory; a thread is a lightweight execution unit sharing heap memory inside a process.",
    explanation: "In Java, multiple threads run concurrently within the single JVM process, sharing the Heap and Metaspace but maintaining private Stacks and PC registers.",
    hint: "Separate memory space vs shared heap memory.",
    level: "intermediate",
    codeExample: "// Multiple Java threads share the same static and heap objects."
  },
  {
    question: "Why is 'String' immutable in Java as part of its security design?",
    shortAnswer: "To prevent malicious tampering with sensitive parameters like database URLs, usernames, network sockets, and class loading names.",
    explanation: "If Strings were mutable, an attacker could pass a String parameter to a security check, pass the check, and then mutate the String in a concurrent thread before execution.",
    hint: "Thread safety, security, and String Constant Pool caching.",
    level: "advanced",
    codeExample: "String s = \"admin\"; // Cannot be modified after creation."
  },
  {
    question: "What are Default Methods in Java Interfaces (introduced in Java 8)?",
    shortAnswer: "Methods in interfaces that provide a default implementation using the 'default' keyword.",
    explanation: "Default methods allow adding new methods to existing interfaces (like forEach() on Collection) without breaking existing legacy classes implementing those interfaces.",
    hint: "Enables backward-compatible interface evolution.",
    level: "intermediate",
    codeExample: "interface Greeter {\n    default void greet() { System.out.println(\"Hello\"); }\n}"
  },
  {
    question: "What is the role of ClassLoaders in Java's dynamic architecture?",
    shortAnswer: "To load class bytecode from disk or network into JVM memory lazily on demand.",
    explanation: "ClassLoaders prevent redundant memory loading and enforce security boundaries by delegating parent class loading up to the Bootstrap ClassLoader.",
    hint: "Loading, linking, and initializing classes dynamically.",
    level: "advanced",
    codeExample: "ClassLoader loader = MyClass.class.getClassLoader();"
  },
  {
    question: "What is the significance of the 'final' keyword across variables, methods, and classes?",
    shortAnswer: "Final variables cannot be reassigned; final methods cannot be overridden; final classes cannot be subclassed.",
    explanation: "'final' enforces immutability and architectural constraints, allowing the JVM compiler to perform optimizations like inlining.",
    hint: "Prevents modification, overriding, and inheritance.",
    level: "basic",
    codeExample: "final int MAX = 100;\nfinal class ImmutableClass { }"
  },
  {
    question: "How do these key features combined make Java the top choice for mission-critical software?",
    shortAnswer: "They deliver a rare balance of platform portability, memory safety, high multi-core performance, and long-term enterprise reliability.",
    explanation: "No other ecosystem matches Java's combination of 30-year backwards compatibility, JVM multi-core engineering, massive open-source tooling, and zero-pointer memory security.",
    hint: "Portability + Safety + Concurrency + Longevity.",
    level: "basic",
    codeExample: "// Java: The foundation of modern enterprise computing."
  }
];

export default questions;
