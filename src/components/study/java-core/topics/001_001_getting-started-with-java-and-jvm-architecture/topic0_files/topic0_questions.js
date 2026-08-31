const questions = [
  {
    question: "What is the core philosophy behind Java's 'Write Once, Run Anywhere' (WORA) capability?",
    shortAnswer: "Java source code compiles to intermediate bytecode (.class) which runs on any OS having a compatible JVM.",
    explanation: "Unlike native compiled languages like C/C++ which compile directly to machine-specific binaries, Java compiles to bytecode. The platform-specific Java Virtual Machine (JVM) interprets or JIT-compiles this bytecode to native machine instructions at runtime.",
    hint: "Think about the role of the intermediate .class file.",
    level: "basic",
    codeExample: "// Compiled via: javac App.java → App.class\n// Executed via: java App"
  },
  {
    question: "Is Java a pure object-oriented programming language? Explain why or why not.",
    shortAnswer: "No, Java is not 100% pure OOP because it supports 8 primitive data types.",
    explanation: "In a pure OOP language (like Smalltalk), everything must be an object. Java retains 8 primitive data types (byte, short, int, long, float, double, char, boolean) for computational speed and memory efficiency.",
    hint: "Consider int vs Integer and memory allocation without objects.",
    level: "intermediate",
    codeExample: "int primitiveValue = 42; // Not an object, no methods\nInteger boxedValue = Integer.valueOf(42); // Object"
  },
  {
    question: "What is the difference between Java as a language and Java as a platform?",
    shortAnswer: "The language defines syntax and semantics, whereas the platform provides the JVM and core runtime class libraries.",
    explanation: "Java the language is a high-level syntax specification. Java the platform includes the Java Virtual Machine (JVM), Java Class Libraries (API), and runtime tools needed to execute compiled bytecode.",
    hint: "Other languages like Kotlin and Scala run on the Java platform.",
    level: "basic",
    codeExample: "// Language: class MyClass {}\n// Platform: java.lang.*, java.util.*, JVM runtime"
  },
  {
    question: "Why does Java not support explicit pointer arithmetic like C and C++?",
    shortAnswer: "To prevent direct memory tampering, security vulnerabilities, and segmentation fault crashes.",
    explanation: "Omitting explicit pointers prevents malicious memory corruption, buffer overflows, and dangling pointer bugs. Instead, Java uses safe object references managed entirely by the JVM and automatic Garbage Collector.",
    hint: "Think about security and memory safety guarantees in banking systems.",
    level: "intermediate",
    codeExample: "// C code allows: ptr++ (dangerous)\n// Java only allows: Object obj = new Object(); (safe reference)"
  },
  {
    question: "Which major edition of Java is used for developing enterprise microservices and large-scale web backends?",
    shortAnswer: "Jakarta EE (formerly Java EE) built on top of Java SE.",
    explanation: "Java SE (Standard Edition) provides the core language and libraries. Jakarta EE (Enterprise Edition) adds enterprise specifications like Servlets, JPA (Hibernate), JMS, and RESTful web services.",
    hint: "Think of enterprise technologies used in Spring Boot and application servers.",
    level: "basic",
    codeExample: "// Core Java: Java SE\n// Enterprise: Jakarta EE / Spring Boot @RestController"
  },
  {
    question: "How does the Java bytecode verifier enhance security before code execution?",
    shortAnswer: "It scans .class bytecode files to ensure they don't violate memory constraints or stack integrity.",
    explanation: "During the linking phase, the Bytecode Verifier checks that bytecode does not forge pointers, access uninitialized variables, overflow the operand stack, or violate access modifiers.",
    hint: "It acts as a gatekeeper before code reaches the execution engine.",
    level: "advanced",
    codeExample: "// Verifier ensures no illegal type casts or stack corruptions occur at bytecode level."
  },
  {
    question: "What role does the JIT (Just-In-Time) compiler play in the JVM?",
    shortAnswer: "It translates frequently executed (hotspot) bytecode into native CPU machine code at runtime.",
    explanation: "The JVM starts by interpreting bytecode line by line. When it identifies 'hot' methods or loops through profiling counters, the JIT compiler compiles those bytecode chunks directly into native machine code for maximum speed.",
    hint: "It combines the fast startup of an interpreter with the execution speed of a compiled binary.",
    level: "advanced",
    codeExample: "// Loop executed 10,000 times → JIT compiles it to raw x86_64 assembly."
  },
  {
    question: "Why do major global banking institutions choose Java over modern scripting languages for transaction ledgers?",
    shortAnswer: "Strong static typing, ACID database connectivity, multithreading, and decades of backward compatibility.",
    explanation: "Financial systems require absolute precision, high concurrency, strict compiler checks to prevent runtime type errors, and guaranteed long-term stability without breaking changes across OS updates.",
    hint: "Think about transaction correctness and multi-billion-dollar reliability.",
    level: "intermediate",
    codeExample: "BigDecimal balance = new BigDecimal(\"1500000.50\"); // Exact monetary precision"
  },
  {
    question: "What is the primary difference between JDK, JRE, and JVM?",
    shortAnswer: "JDK is for developers (compiler + tools), JRE is for running apps (JVM + libraries), JVM executes bytecode.",
    explanation: "JDK = JRE + Development Tools (javac, javadoc, jdb, jar). JRE = JVM + Standard Class Libraries (rt.jar / java.base). JVM = The virtual machine executing bytecode.",
    hint: "JDK contains JRE; JRE contains JVM.",
    level: "basic",
    codeExample: "// JDK: javac Main.java\n// JRE / JVM: java Main"
  },
  {
    question: "What happens if you compile a Java file on a Windows x64 machine and execute the .class file on a Linux ARM64 server?",
    shortAnswer: "It runs seamlessly without recompilation as long as a Linux ARM64 JVM is installed.",
    explanation: "Bytecode is instruction-set independent. The Linux ARM64 JVM translates the portable bytecode into ARM64 native instructions during execution.",
    hint: "This is the essence of 'Write Once, Run Anywhere'.",
    level: "basic",
    codeExample: "// Compiled on Windows: javac App.java → App.class\n// Transfer to Linux: java App (Runs identically!)"
  },
  {
    question: "What is the purpose of the 'public static void main(String[] args)' method signature?",
    shortAnswer: "It is the standardized entry point invoked by the JVM to launch a Java application.",
    explanation: "'public' allows the external JVM runtime to call it; 'static' allows the JVM to invoke it without creating a class instance; 'void' means it returns nothing; 'String[] args' receives command-line arguments.",
    hint: "Break down each of the 4 keywords individually.",
    level: "basic",
    codeExample: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(args.length);\n    }\n}"
  },
  {
    question: "What will happen if you declare a public class in a file with a different name (e.g. public class Student in Teacher.java)?",
    shortAnswer: "A compile-time error: 'class Student is public, should be declared in a file named Student.java'.",
    explanation: "Java enforces that a public top-level class name must exactly match the source file name (case-sensitive) to enable predictable class loading.",
    hint: "Check the Java Language Specification on file naming.",
    level: "basic",
    codeExample: "// File: Teacher.java\n// public class Student { } → COMPILE ERROR!"
  },
  {
    question: "Can a single Java source file contain multiple classes? What are the rules?",
    shortAnswer: "Yes, but at most ONE class can be declared public, and the file must match that public class name.",
    explanation: "A .java file can contain multiple package-private (non-public) classes, but only one public class. When compiled, javac generates separate .class files for each class.",
    hint: "One source file can produce multiple .class bytecode files.",
    level: "intermediate",
    codeExample: "// File: Shapes.java\npublic class Shapes { }\nclass Circle { } // Compiles to Shapes.class & Circle.class"
  },
  {
    question: "Why is Java considered 'Robust'?",
    shortAnswer: "Due to strong memory management, garbage collection, exception handling, and absence of raw pointer errors.",
    explanation: "Java eliminates common programmer errors like memory leaks (via GC), buffer overflows (via array bounds checking), unhandled crashes (via structured exception handling), and type confusion (via strict static typing).",
    hint: "Think about what prevents a Java program from crashing the OS.",
    level: "basic",
    codeExample: "try {\n    int[] arr = new int[5];\n    arr[10] = 50; // Throws ArrayIndexOutOfBoundsException cleanly\n} catch (Exception e) {\n    System.out.println(e.getMessage());\n}"
  },
  {
    question: "What is the difference between System.out.print() and System.out.println()?",
    shortAnswer: "println() appends a newline character after printing; print() does not.",
    explanation: "System.out.print() outputs text and leaves the console cursor on the same line. System.out.println() outputs text and flushes a platform-specific line separator (\\n or \\r\\n).",
    hint: "The 'ln' stands for line.",
    level: "basic",
    codeExample: "System.out.print(\"A\");\nSystem.out.print(\"B\"); // Prints \"AB\"\nSystem.out.println(\"C\"); // Prints \"C\\n\""
  },
  {
    question: "What is Apache Spark and Apache Kafka's connection to Java?",
    shortAnswer: "Both are world-class distributed big data processing engines built natively on the JVM.",
    explanation: "Apache Kafka (distributed event streaming) and Apache Spark (distributed analytics) rely on JVM multi-threading, memory mapping, and high-throughput networking for processing petabytes of real-time data.",
    hint: "JVM powers modern big data infrastructure.",
    level: "intermediate",
    codeExample: "// Kafka and Spark APIs are written in Java and Scala on JVM."
  },
  {
    question: "What are the three types of comments supported in Java?",
    shortAnswer: "Single-line (//), Multi-line (/* */), and Javadoc (/** */).",
    explanation: "Single-line comments start with // and end at line break. Multi-line comments span across /* and */. Javadoc comments start with /** and are parsed by the javadoc tool to generate HTML API documentation.",
    hint: "Javadoc comments produce official Oracle-style API documents.",
    level: "basic",
    codeExample: "// Single line\n/* Multi\n   Line */\n/**\n * @param name Student Name\n */"
  },
  {
    question: "What is the role of the Java ClassLoader subsystem?",
    shortAnswer: "It dynamically loads .class bytecode into JVM memory, links dependencies, and initializes static state.",
    explanation: "The ClassLoader loads class files into the JVM Metaspace on demand using the Delegation-Parent model (Bootstrap, Platform, Application ClassLoaders).",
    hint: "Classes are loaded lazily when first referenced.",
    level: "advanced",
    codeExample: "ClassLoader cl = HelloWorld.class.getClassLoader();\nSystem.out.println(cl.getName());"
  },
  {
    question: "What is the difference between Ahead-Of-Time (AOT) compilation and Just-In-Time (JIT) compilation in modern Java?",
    shortAnswer: "AOT compiles to native binary before execution (GraalVM); JIT compiles hotspot bytecode dynamically during runtime.",
    explanation: "JIT offers peak dynamic profile-guided performance on long-running servers. AOT (like GraalVM Native Image) delivers instant startup (<10ms) and low memory footprint for serverless and containerized workloads.",
    hint: "Think about startup speed in cloud environments.",
    level: "expert",
    codeExample: "// JIT: java -jar app.jar (JVM runtime)\n// AOT: ./app (Standalone OS native binary)"
  },
  {
    question: "What is Project Loom and Virtual Threads in Java 21+?",
    shortAnswer: "Lightweight user-mode threads managed by the JVM that scale to millions of concurrent tasks with minimal memory.",
    explanation: "Traditional Java platform threads are 1:1 mapped to OS threads (1MB stack). Virtual Threads are M:N mapped onto carrier threads, enabling high-throughput I/O servers without complex reactive programming.",
    hint: "Replaces traditional heavy platform threads.",
    level: "expert",
    codeExample: "Thread.ofVirtual().start(() → {\n    System.out.println(\"Running in lightweight Virtual Thread\");\n});"
  },
  {
    question: "How does Java ensure backwards compatibility across decades?",
    shortAnswer: "By preserving the Java Language Specification and JVM Bytecode instruction set contracts.",
    explanation: "Java engineering strictly avoids breaking changes to standard class libraries. A .class file compiled on Java 1.4 or Java 8 will continue to execute on Java 21 without modification.",
    hint: "Enterprise stability is Java's biggest competitive moat.",
    level: "intermediate",
    codeExample: "// Legacy Vector and Hashtable from 1995 still work in 2026."
  },
  {
    question: "What is the purpose of the 'javac' command?",
    shortAnswer: "It is the Java compiler tool in the JDK that converts source code (.java) into bytecode (.class).",
    explanation: "'javac' reads Java source files, checks syntax, verifies types, and emits standard bytecode files for the JVM.",
    hint: "The 'c' stands for compiler.",
    level: "basic",
    codeExample: "// Command: javac -d bin src/HelloWorld.java"
  },
  {
    question: "What is the purpose of the 'java' command from the terminal?",
    shortAnswer: "It launches the Java Virtual Machine (JVM) and starts execution at the specified main() method.",
    explanation: "'java ClassName' initializes the JVM, loads the specified class, checks for public static void main(String[] args), and executes the bytecode.",
    hint: "Do NOT include .class extension when running 'java ClassName'.",
    level: "basic",
    codeExample: "// Correct: java HelloWorld\n// Wrong: java HelloWorld.class"
  },
  {
    question: "What is a 'hotspot' in the context of the HotSpot JVM?",
    shortAnswer: "A piece of bytecode (method or loop) that executes repeatedly and is selected for JIT compilation.",
    explanation: "The HotSpot JVM profiles code dynamically while running. Parts of the code that execute frequently are called 'hot spots' and are optimized aggressively by the C1/C2 JIT compilers.",
    hint: "Where the JVM spends the majority of its execution time.",
    level: "advanced",
    codeExample: "// High-iteration loop triggers HotSpot JIT compilation:\nfor (int i = 0; i < 1_000_000; i++) { calculate(); }"
  },
  {
    question: "Why was the automatic Garbage Collection in Java considered a breakthrough in 1995?",
    shortAnswer: "It eliminated manual memory management (malloc/free), preventing catastrophic memory leaks and double-free bugs.",
    explanation: "In C/C++, forgetting to free memory causes memory leaks, while freeing too early causes dangling pointers. Java's GC automatically scans the heap and frees unreferenced memory safely.",
    hint: "Developers no longer need to manually free memory.",
    level: "intermediate",
    codeExample: "Student s = new Student();\ns = null; // Original Student object is now eligible for Garbage Collection"
  },
  {
    question: "Can you run Java programs without installing a full JDK on a production server?",
    shortAnswer: "Yes, you only need a JRE or a customized modular runtime image created with 'jlink'.",
    explanation: "Production servers that only execute pre-compiled .class or .jar files do not require the 'javac' compiler, only the JRE/JVM runtime.",
    hint: "Development needs JDK; runtime only needs JRE.",
    level: "basic",
    codeExample: "// Production container: jlink creates minimal 35MB custom Java runtime."
  },
  {
    question: "What is the Java Community Process (JCP)?",
    shortAnswer: "The formal mechanism by which the international community develops standard technical specifications for Java (JSRs).",
    explanation: "JCP allows developers, enterprises, and open-source contributors to propose and review Java Specification Requests (JSRs) for future Java enhancements.",
    hint: "It governs Java's evolution via JSRs.",
    level: "intermediate",
    codeExample: "// JSR 310: Modern Date and Time API (java.time)\n// JSR 335: Lambda Expressions (Java 8)"
  },
  {
    question: "What is the OpenJDK project?",
    shortAnswer: "The official open-source reference implementation of the Java Standard Edition platform.",
    explanation: "All major Java distributions (Oracle JDK, Amazon Corretto, Eclipse Temurin, Red Hat OpenJDK, Microsoft OpenJDK) are built from the upstream OpenJDK source repository.",
    hint: "The open-source foundation of all modern Java distributions.",
    level: "intermediate",
    codeExample: "// Check vendor: java -version (e.g. OpenJDK Runtime Environment)"
  },
  {
    question: "How does Java handle character data internally?",
    shortAnswer: "Using 16-bit Unicode (UTF-16 encoding) by default.",
    explanation: "Java was designed from day one with internationalization support. Primitive 'char' in Java is 2 bytes (16 bits) allowing it to represent Unicode characters from all world languages.",
    hint: "Unlike C's 1-byte ASCII char, Java supports global characters.",
    level: "basic",
    codeExample: "char bengaliChar = 'ক';\nchar hindiChar = 'अ';\nSystem.out.println(bengaliChar + \" \" + hindiChar);"
  },
  {
    question: "What is the Long-Term Support (LTS) release model in modern Java?",
    shortAnswer: "Every 2 years, an LTS version is designated for multi-year enterprise support (Java 8, 11, 17, 21).",
    explanation: "Java delivers feature releases every 6 months (March & September). Every 2 years, one release is designated as an LTS release, providing enterprise stability and long-term security patches.",
    hint: "Enterprises standardize on LTS releases like Java 17 and Java 21.",
    level: "intermediate",
    codeExample: "// Current Enterprise Standard: Java 17 LTS and Java 21 LTS"
  }
];

export default questions;
