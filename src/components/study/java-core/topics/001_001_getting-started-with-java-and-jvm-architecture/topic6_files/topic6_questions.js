const questions = [
  {
    question: "What are the three major architectural subsystems of the Java Virtual Machine?",
    shortAnswer: "ClassLoader Subsystem, Runtime Data Areas (Memory), and the Execution Engine.",
    explanation: "The ClassLoader loads and links class files; Runtime Data Areas organize heap/stack memory; the Execution Engine executes the bytecode via Interpreter, JIT Compiler, and Garbage Collector.",
    hint: "Loading -> Memory -> Execution.",
    level: "basic",
    codeExample: "// ClassLoader Subsystem -> Runtime Data Areas -> Execution Engine"
  },
  {
    question: "Which JVM memory areas are shared across all threads, and which are private per thread?",
    shortAnswer: "Shared: Heap Area and Metaspace (Method Area). Private per thread: Java Stack, PC Register, and Native Method Stack.",
    explanation: "Heap and Metaspace are accessible by all application threads, requiring thread synchronization. Each thread has its own isolated Stack, PC Register, and Native Stack.",
    hint: "Heap/Metaspace are shared; Stacks/PC Registers are private.",
    level: "intermediate",
    codeExample: "// Thread 1 & Thread 2 share same Heap objects, but have independent Stack frames."
  },
  {
    question: "What are the three distinct phases of the ClassLoader Subsystem?",
    shortAnswer: "Loading, Linking (Verification, Preparation, Resolution), and Initialization.",
    explanation: "Loading reads binary .class bytes; Linking verifies bytecode, prepares static fields with default values, and resolves symbolic references; Initialization executes static blocks and initializers.",
    hint: "Load -> Link -> Initialize.",
    level: "advanced",
    codeExample: "// Linking: Verification -> Preparation -> Resolution"
  },
  {
    question: "What is the Delegation-Parent Principle in Java ClassLoaders?",
    shortAnswer: "A ClassLoader always delegates class loading requests to its parent before attempting to load the class itself.",
    explanation: "This hierarchical delegation (Application -> Platform -> Bootstrap) ensures core security, preventing a malicious user from replacing core classes like java.lang.String.",
    hint: "Always ask parent loader first.",
    level: "advanced",
    codeExample: "// ClassLoader hierarchy: Bootstrap -> Platform -> Application"
  },
  {
    question: "Why does `String.class.getClassLoader()` return `null` in Java?",
    shortAnswer: "Because `String` is loaded by the Bootstrap ClassLoader, which is written in native C/C++ and has no Java object representation.",
    explanation: "Core Java base classes are loaded by the primordial Bootstrap ClassLoader. In Java code, the Bootstrap loader is represented by `null`.",
    hint: "Bootstrap loader is implemented in native C/C++.",
    level: "intermediate",
    codeExample: "ClassLoader cl = String.class.getClassLoader(); // Returns null"
  },
  {
    question: "What are the contents of a single Java Thread Stack Frame?",
    shortAnswer: "Local Variable Table (LVT), Operand Stack, and Frame Data (Constant Pool reference & exception dispatch).",
    explanation: "Every method invocation pushes a Stack Frame containing local primitive variables, references, the Operand Stack for arithmetic evaluation, and return data.",
    hint: "LVT + Operand Stack + Frame Data.",
    level: "advanced",
    codeExample: "// Stack Frame pushed on method entry, popped on method return."
  },
  {
    question: "What is the role of the Operand Stack inside a Stack Frame?",
    shortAnswer: "It is a LIFO workspace used by bytecode instructions to perform calculations and prepare method arguments.",
    explanation: "For example, to compute `a + b`, the JVM pushes variable `a` onto the operand stack (`iload_1`), pushes `b` (`iload_2`), executes `iadd` (which pops both, adds them, and pushes the result), and stores the result (`istore_3`).",
    hint: "Bytecode math operates on the Operand Stack.",
    level: "expert",
    codeExample: "// Bytecode: iload_1, iload_2, iadd, istore_3"
  },
  {
    question: "What causes a `java.lang.StackOverflowError` in the JVM?",
    shortAnswer: "Excessive or infinite recursive method calls exhausting thread stack memory allocation.",
    explanation: "Each method call allocates a new stack frame. If infinite recursion occurs, the thread exceeds `-Xss` (Thread Stack Size), triggering StackOverflowError.",
    hint: "Deep recursion without base exit condition.",
    level: "basic",
    codeExample: "public void recursive() {\n    recursive(); // Throws StackOverflowError!\n}"
  },
  {
    question: "What causes a `java.lang.OutOfMemoryError: Java heap space`?",
    shortAnswer: "Creating more live, reachable objects on the Heap than the configured maximum heap limit (-Xmx).",
    explanation: "When active objects accumulate without becoming eligible for Garbage Collection and the heap reaches `-Xmx`, the JVM crashes with OutOfMemoryError.",
    hint: "Heap memory exhaustion due to object accumulation.",
    level: "basic",
    codeExample: "List<byte[]> list = new ArrayList<>();\nwhile(true) list.add(new byte[1024 * 1024]); // Throws OOM: Java heap space"
  },
  {
    question: "What is Metaspace and how does it differ from the pre-Java 8 PermGen?",
    shortAnswer: "Metaspace stores class metadata in native off-heap memory, expanding dynamically to prevent PermGen OOMs.",
    explanation: "PermGen had a fixed contiguous memory boundary inside the JVM heap. Metaspace was introduced in Java 8 to allocate class metadata directly in OS native memory.",
    hint: "Off-heap native memory for class metadata.",
    level: "intermediate",
    codeExample: "// Configured via: -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=512m"
  },
  {
    question: "What is the Program Counter (PC) Register in the JVM?",
    shortAnswer: "A per-thread register storing the memory address of the bytecode instruction currently being executed.",
    explanation: "Each thread has its own PC Register. As the thread executes instructions, the PC Register advances to track execution flow across loops and method calls.",
    hint: "Tracks the current instruction pointer for each thread.",
    level: "intermediate",
    codeExample: "// PC Register updates with every bytecode opcode execution."
  },
  {
    question: "What is the difference between the Bytecode Interpreter and the JIT (Just-In-Time) Compiler?",
    shortAnswer: "Interpreter executes bytecode line-by-line immediately; JIT compiles frequently executed hot code directly into native CPU machine code.",
    explanation: "The Interpreter provides fast startup without compilation delay. The JIT compiler monitors method call counters and compiles 'hot' methods into fast native machine code.",
    hint: "Interpreter = fast startup; JIT = peak long-term execution speed.",
    level: "intermediate",
    codeExample: "// Tiered compilation combines Interpreter + C1 JIT + C2 JIT."
  },
  {
    question: "What is Method Inlining in JIT compilation?",
    shortAnswer: "Replacing a method invocation with the actual method body to eliminate method call overhead.",
    explanation: "Method inlining is the most powerful JIT optimization. By inlining small methods (e.g. getters), the JVM eliminates stack frame creation and unlocks further CPU optimizations.",
    hint: "Inlining method body directly at the call site.",
    level: "expert",
    codeExample: "// Original: int val = obj.getValue();\n// Inlined: int val = obj.value;"
  },
  {
    question: "What is the role of Garbage Collection Roots (GC Roots)?",
    shortAnswer: "Objects that are unconditionally reachable (local variables in stack, static variables, active threads) used as starting points for tracing live objects.",
    explanation: "The GC traverses object references starting from GC Roots. Any heap object that cannot be reached through reference chains from GC Roots is considered dead and reclaimed.",
    hint: "Starting points of the reachability graph.",
    level: "advanced",
    codeExample: "// Active Thread Stacks + Metaspace Static Fields = GC Roots"
  },
  {
    question: "What are the generations in JVM Generational Heap Architecture?",
    shortAnswer: "Young Generation (Eden, Survivor S0, Survivor S1) and Old / Tenured Generation.",
    explanation: "Based on the Weak Generational Hypothesis ('most objects die young'), newly created objects land in Eden. Surviving objects migrate to Survivor spaces and eventually promote to Old Gen.",
    hint: "Eden -> Survivor (S0/S1) -> Tenured (Old Gen).",
    level: "advanced",
    codeExample: "// Minor GC cleans Young Gen; Major/Full GC cleans Old Gen."
  },
  {
    question: "What is a 'Stop-The-World' (STW) pause in JVM Garbage Collection?",
    shortAnswer: "A pause where all application threads are safely suspended while the GC marks and cleans memory.",
    explanation: "During STW phases, application execution is paused at safepoints to ensure memory references do not change while the GC updates pointers and reclaims heap regions.",
    hint: "All application threads pause during GC safepoints.",
    level: "advanced",
    codeExample: "// Modern collectors like ZGC achieve sub-millisecond STW pause times (<1ms)."
  },
  {
    question: "What is G1 GC (Garbage-First Garbage Collector)?",
    shortAnswer: "A region-based garbage collector that divides the heap into equal-sized regions and prioritizes regions with the most garbage.",
    explanation: "G1 GC has been the default collector since Java 9. It allows developers to specify target pause times (`-XX:MaxGCPauseMillis=200`) and collects garbage concurrently.",
    hint: "Default collector since Java 9.",
    level: "intermediate",
    codeExample: "// Enabled by default: -XX:+UseG1GC"
  },
  {
    question: "What is ZGC (Z Garbage Collector) in modern Java?",
    shortAnswer: "An ultra-low latency, scalable garbage collector with pause times under 1 millisecond regardless of heap size.",
    explanation: "ZGC (standardized in Java 15+) performs almost all GC work concurrently (marking, relocation, reference processing) using colored pointers and load barriers.",
    hint: "Sub-millisecond pause times on multi-terabyte heaps.",
    level: "expert",
    codeExample: "// Enable ZGC: -XX:+UseZGC"
  },
  {
    question: "What are the C1 (Client) and C2 (Server) JIT compilers?",
    shortAnswer: "C1 compiles code quickly with basic optimizations; C2 performs aggressive, profile-guided native optimizations.",
    explanation: "HotSpot's Tiered Compilation uses C1 for immediate fast execution during application warmup, and promotes hot methods to C2 for peak native speed.",
    hint: "Tiered compilation: C1 (Tiers 1-3) -> C2 (Tier 4).",
    level: "expert",
    codeExample: "// Tiered compilation is enabled by default in Java 8+."
  },
  {
    question: "What is the Native Method Stack?",
    shortAnswer: "A per-thread stack dedicated to holding execution state for native C/C++ functions called via JNI.",
    explanation: "When a Java thread calls a `native` method, it switches from the Java Stack to the Native Method Stack to execute C/C++ machine instructions.",
    hint: "Stack for native C/C++ JNI calls.",
    level: "intermediate",
    codeExample: "// Handles C system calls like open(), read(), write()."
  },
  {
    question: "What is a TLAB (Thread Local Allocation Buffer) in JVM Heap memory?",
    shortAnswer: "A thread-private chunk of Eden space allowing lock-free object allocation.",
    explanation: "TLAB eliminates synchronization lock contention when multiple threads simultaneously instantiate objects with 'new', boosting object creation performance.",
    hint: "Private allocation chunks in Eden space.",
    level: "expert",
    codeExample: "// TLAB allows threads to allocate objects without locking the global heap."
  },
  {
    question: "What happens during the 'Verification' phase of Class Loading?",
    shortAnswer: "The Bytecode Verifier checks that bytecode adheres to JVM safety constraints and does not corrupt memory.",
    explanation: "Verification ensures stack overflow/underflow will not occur, parameter types match method descriptors, and access modifiers are respected.",
    hint: "Bytecode safety and stack integrity checks.",
    level: "advanced",
    codeExample: "// Rejects corrupted or malicious .class files."
  },
  {
    question: "What happens during the 'Preparation' phase of Class Loading?",
    shortAnswer: "Memory is allocated for static fields and initialized to default binary values (0, null, false).",
    explanation: "User-defined initial values (e.g. `public static int count = 5;`) are NOT assigned during preparation; `count` is initialized to `0` here and receives `5` during Initialization.",
    hint: "Static fields get default zero/null values.",
    level: "advanced",
    codeExample: "// static int x = 10; -> x is set to 0 during Preparation, and 10 during Initialization."
  },
  {
    question: "What happens during the 'Initialization' phase of Class Loading?",
    shortAnswer: "Static initializer blocks and static variable initializers execute in source code order.",
    explanation: "Initialization executes the `<clinit>` method generated by javac, running `static { ... }` blocks and assigning user-specified initial static values.",
    hint: "Executes static initializers and static blocks.",
    level: "intermediate",
    codeExample: "static {\n    System.out.println(\"Class Initialized!\");\n}"
  },
  {
    question: "What is the difference between `-Xms` and `-Xmx` JVM flags?",
    shortAnswer: "-Xms sets the initial minimum heap memory; -Xmx sets the maximum allowable heap memory.",
    explanation: "For example, `java -Xms2g -Xmx4g -jar app.jar` starts the JVM with 2GB heap and permits expansion up to 4GB. In production, setting `-Xms` equal to `-Xmx` avoids heap resizing pauses.",
    hint: "Initial Heap vs Maximum Heap size.",
    level: "basic",
    codeExample: "java -Xms4g -Xmx4g -jar banking-ledger.jar"
  },
  {
    question: "What is the `-Xss` JVM flag used for?",
    shortAnswer: "To configure the memory size allocated to each individual Java Thread Stack.",
    explanation: "Default thread stack size is typically 1MB on 64-bit systems. Modifying `-Xss` (e.g. `-Xss512k`) changes the maximum recursion depth and memory allocated per thread.",
    hint: "Thread stack size configuration.",
    level: "intermediate",
    codeExample: "java -Xss512k -jar app.jar"
  },
  {
    question: "How does the JVM handle primitive variables declared inside a method vs inside a class?",
    shortAnswer: "Primitive local variables inside methods live on the Thread Stack; primitive instance fields inside classes live on the Heap inside the object.",
    explanation: "Local variables in methods exist in the method's Stack Frame and disappear when the method returns. Instance variables reside in the object instance memory on the Heap.",
    hint: "Method locals = Stack; Object fields = Heap.",
    level: "basic",
    codeExample: "public class Node {\n    int heapField = 10; // Heap\n    public void run() {\n        int stackLocal = 20; // Stack\n    }\n}"
  },
  {
    question: "What is the Constant Pool in a compiled .class file?",
    shortAnswer: "A table of literal constants, string literals, class names, method names, and field signatures referenced by bytecode.",
    explanation: "The constant pool acts as a central lookup dictionary for the class file. Bytecode opcodes refer to constant pool indices rather than embedding long strings directly.",
    hint: "Central lookup dictionary of literals and symbols in .class.",
    level: "expert",
    codeExample: "// Inspect with: javap -v ClassName.class"
  },
  {
    question: "What is the difference between Shallow Size and Retained Size of an object in Heap memory?",
    shortAnswer: "Shallow size is the bytes consumed by the object itself; Retained size is the total heap freed if that object is garbage collected.",
    explanation: "An ArrayList object has a small shallow size (header + fields ~24 bytes), but its retained size includes the entire internal `Object[]` array and all uniquely referenced elements.",
    hint: "Object bytes alone vs Entire referenced object tree bytes.",
    level: "advanced",
    codeExample: "// Shallow: ArrayList header; Retained: ArrayList + backing Object[] + items."
  },
  {
    question: "Why is mastering JVM internal anatomy essential for senior Java software engineers?",
    shortAnswer: "It allows diagnosing production memory leaks, tuning GC latency, designing thread-safe architectures, and optimizing high-throughput code.",
    explanation: "Engineers who understand the JVM do not guess when performance issues arise—they analyze Heap dumps, configure JIT flags, optimize Stack usage, and tune GC pauses with precision.",
    hint: "Foundational knowledge for high-performance system engineering.",
    level: "basic",
    codeExample: "// Deep JVM knowledge transforms programmers into enterprise software architects."
  }
];

export default questions;
