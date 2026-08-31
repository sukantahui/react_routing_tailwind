const questions = [
  {
    question: "What is the core structural equation relating JDK, JRE, and JVM?",
    shortAnswer: "JDK = JRE + Development Tools; JRE = JVM + Standard Class Libraries.",
    explanation: "The JDK is a superset containing developer tools (javac, jdb) plus the JRE. The JRE contains the JVM plus core runtime class libraries.",
    hint: "JDK > JRE > JVM.",
    level: "basic",
    codeExample: "// JDK: javac Main.java \n// JRE: java Main \n// JVM: Executes bytecode"
  },
  {
    question: "Can you compile a Java source file (.java) if you only have a JRE installed?",
    shortAnswer: "No! The 'javac' compiler is only bundled with the JDK, not the standalone JRE.",
    explanation: "The JRE is strictly a runtime environment. To compile source code, the Java compiler (javac) from the JDK is mandatory.",
    hint: "javac belongs exclusively to the JDK.",
    level: "basic",
    codeExample: "// Terminal on JRE-only system: 'javac' is not recognized as a command."
  },
  {
    question: "What does the JVM (Java Virtual Machine) actually do at runtime?",
    shortAnswer: "It loads bytecode, verifies security constraints, allocates memory, executes instructions (Interpreter/JIT), and runs GC.",
    explanation: "The JVM is the runtime heart of Java: it manages Thread Stacks, Heap memory, Metaspace, executes opcodes, and cleans up dead objects.",
    hint: "Classloading + Memory Management + Execution + Garbage Collection.",
    level: "intermediate",
    codeExample: "// The JVM executes instructions like aload_0, invokevirtual, ireturn."
  },
  {
    question: "Is the JVM a software program, a hardware specification, or an abstract concept?",
    shortAnswer: "It is an abstract specification implemented by concrete software programs (like HotSpot, OpenJ9, GraalVM).",
    explanation: "The JVM Specification (JVMS) documents the virtual machine contracts. HotSpot (by Oracle/OpenJDK) and OpenJ9 (by Eclipse/IBM) are concrete software implementations of that specification.",
    hint: "Specification vs Implementation.",
    level: "intermediate",
    codeExample: "// Oracle HotSpot JVM is the most widely deployed concrete implementation."
  },
  {
    question: "What are the essential development tools included inside the JDK bin directory?",
    shortAnswer: "javac (compiler), java (launcher), jar (archiver), javadoc (doc generator), jdb (debugger), jshell (REPL).",
    explanation: "These command-line utilities enable the full software development lifecycle from authoring and compiling to packaging and debugging.",
    hint: "Look inside the $JAVA_HOME/bin directory.",
    level: "basic",
    codeExample: "// Located in JDK /bin: javac, java, jar, javadoc, jdb, jcmd, jps, jstat"
  },
  {
    question: "Why did Oracle stop distributing standalone JRE installers starting with Java 11?",
    shortAnswer: "Modern Java uses the modular system (jlink) allowing developers to bundle custom, minimal runtimes directly with apps.",
    explanation: "Instead of requiring end-users to install a bloated global JRE, Java 9+ introduced `jlink`, enabling applications to package only the required modules as self-contained executables.",
    hint: "Project Jigsaw and jlink replaced global JRE installations.",
    level: "advanced",
    codeExample: "// jlink generates application-specific stripped down runtimes."
  },
  {
    question: "What is the difference between HotSpot JVM and Eclipse OpenJ9 JVM?",
    shortAnswer: "HotSpot focuses on maximum peak throughput; OpenJ9 is optimized for low memory footprint and fast cloud startup.",
    explanation: "Both implement the exact same Java SE specification, but OpenJ9 (developed by IBM) uses shared class caching and compact memory structures ideal for cloud microservices.",
    hint: "Two competing certified JVM implementations.",
    level: "advanced",
    codeExample: "// Both run identical bytecode with different memory/performance profiles."
  },
  {
    question: "What is the purpose of the 'javadoc' tool in the JDK?",
    shortAnswer: "To automatically generate standardized HTML API documentation from /** */ comments in Java source code.",
    explanation: "The javadoc tool parses source declarations and Javadoc tags (@param, @return, @throws) to produce comprehensive web documentation.",
    hint: "Generates HTML documentation from code comments.",
    level: "basic",
    codeExample: "/**\n * @param name Student Name\n * @return Formatted greeting\n */"
  },
  {
    question: "What is the 'jps' tool in the JDK used for?",
    shortAnswer: "Java Virtual Machine Process Status Tool: lists active JVM processes running on the host system.",
    explanation: "Running `jps -v` in the terminal outputs the Process ID (PID) and JVM startup flags for all running Java applications.",
    hint: "List active Java process IDs.",
    level: "intermediate",
    codeExample: "// Terminal: jps -l\n// Output: 45210 com.codernaccotax.App"
  },
  {
    question: "What is the 'jcmd' tool used for in production diagnostics?",
    shortAnswer: "To send diagnostic command requests to a running JVM (thread dumps, heap dumps, GC control).",
    explanation: "`jcmd <PID> Thread.print` captures a thread dump, and `jcmd <PID> GC.heap_dump /tmp/dump.hprof` triggers a heap dump without stopping the server.",
    hint: "Universal command-line diagnostic tool.",
    level: "advanced",
    codeExample: "// Terminal: jcmd 45210 GC.heap_dump /var/dumps/heap.hprof"
  },
  {
    question: "What is the 'jstat' tool used for?",
    shortAnswer: "To monitor JVM statistics such as Garbage Collection activity, memory pool utilization, and classloading in real-time.",
    explanation: "`jstat -gcutil <PID> 1000` prints Eden, Survivor, Old Gen, and Metaspace utilization percentages every 1,000 milliseconds.",
    hint: "Real-time GC and memory statistics.",
    level: "advanced",
    codeExample: "// Terminal: jstat -gcutil 45210 1000"
  },
  {
    question: "What is the role of the Runtime class in Java (Runtime.getRuntime())?",
    shortAnswer: "It allows the application to interface with the host JVM environment (memory queries, CPU core counts, shutdown hooks).",
    explanation: "Runtime provides methods like `totalMemory()`, `freeMemory()`, `maxMemory()`, `availableProcessors()`, and `addShutdownHook()`.",
    hint: "Querying JVM heap memory and CPU cores from code.",
    level: "basic",
    codeExample: "long freeMem = Runtime.getRuntime().freeMemory();"
  },
  {
    question: "What is the difference between 'totalMemory()' and 'maxMemory()' in java.lang.Runtime?",
    shortAnswer: "totalMemory() is currently allocated heap memory; maxMemory() is the upper limit heap can grow to (-Xmx).",
    explanation: "totalMemory() represents physical heap currently reserved from the OS; maxMemory() is the maximum boundary configured via `-Xmx` (e.g. `-Xmx4g`).",
    hint: "Current reserved heap vs maximum possible heap limit.",
    level: "intermediate",
    codeExample: "long max = Runtime.getRuntime().maxMemory(); // -Xmx limit"
  },
  {
    question: "What is the 'jar' tool in the JDK used for?",
    shortAnswer: "To package multiple .class files, resources, and metadata into a single compressed ZIP archive with a .jar extension.",
    explanation: "The `jar` utility compresses packages, bundles `META-INF/MANIFEST.MF` metadata, and creates executable JAR files with designated `Main-Class` entries.",
    hint: "Java Archive creation tool.",
    level: "basic",
    codeExample: "// Command: jar cvfe App.jar com.example.Main -C bin ."
  },
  {
    question: "What is the 'jdb' tool in the JDK?",
    shortAnswer: "The Java Debugger: a command-line source code debugger for setting breakpoints and inspecting variables.",
    explanation: "jdb attaches to local or remote running JVM instances via the Java Debug Wire Protocol (JDWP) to inspect stack frames and step through code.",
    hint: "Command-line debugging tool.",
    level: "intermediate",
    codeExample: "// Command: jdb -attach 5005"
  },
  {
    question: "Where are the standard Java class library bytecode files stored in modern JDKs (Java 9+)?",
    shortAnswer: "Inside the 'jmods/' directory as modular .jmod files (replacing the legacy 'rt.jar').",
    explanation: "Prior to Java 9, all classes lived in a giant `rt.jar`. Java 9 modularized the JDK into individual `.jmod` files (e.g. `java.base.jmod`, `java.sql.jmod`).",
    hint: "jmods directory replaced monolithic rt.jar.",
    level: "advanced",
    codeExample: "// $JAVA_HOME/jmods/java.base.jmod"
  },
  {
    question: "What is the 'JAVA_HOME' environment variable and why is it important?",
    shortAnswer: "It points to the root directory where the JDK is installed on the operating system.",
    explanation: "Build tools (Maven, Gradle), application servers (Tomcat), and IDEs look for the `JAVA_HOME` environment variable to find the JDK binaries and libraries.",
    hint: "Root directory path of JDK installation.",
    level: "basic",
    codeExample: "// Windows: C:\\Program Files\\Java\\jdk-21\n// Linux: /usr/lib/jvm/jdk-21"
  },
  {
    question: "What is the 'PATH' environment variable in the context of Java setup?",
    shortAnswer: "An OS system variable that tells the terminal where to find executable binaries like 'javac' and 'java'.",
    explanation: "Adding `%JAVA_HOME%\\bin` (Windows) or `$JAVA_HOME/bin` (Linux/Mac) to PATH allows running `javac` and `java` from any terminal directory.",
    hint: "Allows terminal to run javac from any folder.",
    level: "basic",
    codeExample: "PATH=%JAVA_HOME%\\bin;%PATH%"
  },
  {
    question: "What is the Java ClassLoader subsystem inside the JVM?",
    shortAnswer: "The JVM component that loads .class files into memory, links dependencies, and initializes static data.",
    explanation: "The ClassLoader searches the classpath, verifies the bytecode, allocates memory for static fields, and creates java.lang.Class instances in Metaspace.",
    hint: "Loads classes into memory on demand.",
    level: "intermediate",
    codeExample: "ClassLoader loader = String.class.getClassLoader(); // Bootstrap (null)"
  },
  {
    question: "What is the Execution Engine inside the JVM?",
    shortAnswer: "The component that executes the bytecode instructions loaded into memory (Interpreter + JIT Compiler + GC).",
    explanation: "The Execution Engine reads bytecode opcodes and either interprets them line-by-line or compiles hot paths to native machine instructions via JIT compilers.",
    hint: "The computational core of the JVM.",
    level: "intermediate",
    codeExample: "// Converts virtual bytecode into physical CPU execution."
  },
  {
    question: "What are the two JIT compilers inside the HotSpot JVM Execution Engine?",
    shortAnswer: "C1 (Client Compiler for fast startup) and C2 (Server Compiler for aggressive optimization).",
    explanation: "Tiered Compilation uses C1 to quickly compile methods for fast application startup, and later uses C2 to aggressively optimize heavily executed 'hotspot' code.",
    hint: "C1 (Client) vs C2 (Server).",
    level: "advanced",
    codeExample: "// Tiered compilation combines C1 and C2 dynamically."
  },
  {
    question: "What is the Native Method Interface (JNI) inside the JVM architecture?",
    shortAnswer: "A bridge that allows the JVM to invoke native C/C++ libraries and allows C/C++ code to call Java methods.",
    explanation: "JNI enables Java to interact with low-level OS hardware drivers and legacy native C libraries through the `native` keyword.",
    hint: "Bridge to native C/C++ libraries.",
    level: "intermediate",
    codeExample: "public native long getHardwareCounter();"
  },
  {
    question: "What are Native Method Libraries in the JVM?",
    shortAnswer: "OS-specific binary libraries (.dll on Windows, .so on Linux, .dylib on macOS) providing native system services.",
    explanation: "These C/C++ shared libraries implement OS-level functionality like file I/O, network socket handling, and hardware clock queries for the JVM.",
    hint: ".dll, .so, and .dylib system files.",
    level: "advanced",
    codeExample: "// Native system libraries backing java.io and java.net."
  },
  {
    question: "What is the difference between a 32-bit JDK and a 64-bit JDK?",
    shortAnswer: "A 32-bit JDK is limited to 4GB of heap memory; a 64-bit JDK can address terabytes of heap memory.",
    explanation: "Modern enterprise systems exclusively use 64-bit JDKs (x64 and ARM64) to allow memory-intensive databases, caching servers, and big data clusters to allocate large heaps.",
    hint: "4GB memory limit vs Terabyte memory scale.",
    level: "basic",
    codeExample: "// 64-bit JVMs support large heap allocations (e.g. -Xmx64g)."
  },
  {
    question: "What is 'Compressed OOPs' (Ordinary Object Pointers) in 64-bit JVMs?",
    shortAnswer: "A JVM optimization that represents 64-bit heap pointers using 32-bit integers for heaps under 32GB.",
    explanation: "64-bit pointers double memory consumption. Compressed OOPs (-XX:+UseCompressedOops) shifts 32-bit pointers by 3 bits (8-byte alignment) to address up to 32GB of heap with 32-bit efficiency.",
    hint: "Saves ~30% heap RAM on 64-bit JVMs.",
    level: "expert",
    codeExample: "// Enabled by default on 64-bit JVMs with heap < 32GB."
  },
  {
    question: "What is the 'javap' tool and how is it used during development?",
    shortAnswer: "It is the Java Class File Disassembler used to inspect the internal bytecode and method signatures of .class files.",
    explanation: "Running `javap -c -v MyClass.class` outputs the constant pool, stack depth, local variable table, and line-by-line bytecode opcodes.",
    hint: "Disassembles .class files into readable bytecode.",
    level: "intermediate",
    codeExample: "// Command: javap -c HelloWorld.class"
  },
  {
    question: "Why should software development teams install the exact same JDK major version across all developer machines?",
    shortAnswer: "To prevent compilation mismatches, unexpected bytecode version errors, and API deprecation surprises.",
    explanation: "Consistency across team laptops and CI/CD pipelines ensures that code behaving correctly in local tests behaves identically in production builds.",
    hint: "Consistency between dev laptops and production servers.",
    level: "basic",
    codeExample: "// All developers standardize on e.g. OpenJDK 21 LTS."
  },
  {
    question: "What is the difference between 'Oracle JDK' and 'Eclipse Temurin (Adoptium)'?",
    shortAnswer: "Oracle JDK is Oracle's commercial build; Eclipse Temurin is a free, vendor-neutral, community-supported OpenJDK distribution.",
    explanation: "Both are certified OpenJDK builds passing 100% of the Java TCK, but Temurin is completely open-source and free for commercial use without licensing restrictions.",
    hint: "Commercial Oracle distribution vs Free community Eclipse Temurin distribution.",
    level: "intermediate",
    codeExample: "// Both run identical Java bytecode with zero changes."
  },
  {
    question: "What is the role of the 'javac -d' option?",
    shortAnswer: "It specifies the destination output directory where compiled .class files should be placed.",
    explanation: "`javac -d bin src/App.java` compiles the source and automatically generates the package directory structure inside the `bin/` folder.",
    hint: "Destination directory for compiled .class files.",
    level: "basic",
    codeExample: "// Command: javac -d out/production src/App.java"
  },
  {
    question: "How do JDK, JRE, and JVM work together in harmony during a complete software lifecycle?",
    shortAnswer: "Developer writes code using the JDK → javac creates Bytecode → JRE provides runtime libraries → JVM executes bytecode on the host CPU.",
    explanation: "The three layers form a seamless pipeline: JDK for authoring/compiling, JRE for bundling standard class libraries, and JVM for high-performance memory-safe execution.",
    hint: "Write (JDK) → Package (JRE) → Execute (JVM).",
    level: "basic",
    codeExample: "// Source Code (.java) --[JDK / javac]--> Bytecode (.class) --[JRE + JVM]--> CPU Execution"
  }
];

export default questions;
