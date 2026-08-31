const questions = [
  {
    question: "What exact technical mechanism enables Java's 'Write Once, Run Anywhere' (WORA) capability?",
    shortAnswer: "Compiling source code to universal bytecode (.class) which is executed by platform-specific JVMs.",
    explanation: "Bytecode is a hardware-independent virtual machine instruction set. Each operating system has its own native JVM that translates the universal bytecode into native CPU instructions.",
    hint: "Think about the role of the intermediate bytecode and the JVM.",
    level: "basic",
    codeExample: "// Developer compiles once: javac App.java → App.class\n// Runs on Win/Mac/Linux with: java App"
  },
  {
    question: "Is the Java Virtual Machine (JVM) itself platform-independent?",
    shortAnswer: "No! The JVM is platform-dependent; Java Bytecode is platform-independent.",
    explanation: "There is a specific JVM binary written in native C/C++ and assembly for Windows x64, Linux ARM64, macOS Apple Silicon, etc. Each native JVM executes identical platform-independent bytecode.",
    hint: "Think about which part is native to the OS.",
    level: "basic",
    codeExample: "// Windows JVM != Linux JVM, but both run the EXACT SAME App.class file!"
  },
  {
    question: "What is the 4-byte hexadecimal 'Magic Number' found at the start of every valid Java .class file?",
    shortAnswer: "0xCAFEBABE (Coffee Babe).",
    explanation: "The first 4 bytes of every compiled Java bytecode file are 0xCAFEBABE. The ClassLoader checks this magic number to quickly verify that the file is indeed a compiled Java class file.",
    hint: "Named in homage to coffee by James Gosling's team.",
    level: "intermediate",
    codeExample: "// First 4 bytes of .class: CA FE BA BE"
  },
  {
    question: "How does Java's WORA approach differ from C/C++ compilation?",
    shortAnswer: "C/C++ compiles directly to CPU-specific native machine code; Java compiles to portable virtual bytecode.",
    explanation: "In C++, an executable compiled on Windows (PE format x86) will not run on Linux (ELF format) without recompiling from source. Java bytecode runs on all operating systems without recompilation.",
    hint: "Native binary vs virtual bytecode.",
    level: "basic",
    codeExample: "// C++: Source → Machine Code (OS Dependent)\n// Java: Source → Bytecode (OS Independent) → JVM Machine Code"
  },
  {
    question: "Why is Java often referred to as a 'Hybrid' (compiled and interpreted) language?",
    shortAnswer: "Because it is first compiled by javac into bytecode, and then interpreted/JIT-compiled by the JVM.",
    explanation: "Java combines the early type-checking and syntax verification of a compiler (javac) with the runtime portability and dynamic optimization of an interpreter and JIT compiler.",
    hint: "Two distinct execution phases.",
    level: "intermediate",
    codeExample: "// Phase 1 (Compile): javac Main.java\n// Phase 2 (Interpret/JIT): java Main"
  },
  {
    question: "What is an 'Opcode' in Java Bytecode?",
    shortAnswer: "A 1-byte operational code specifying the virtual CPU instruction to be executed.",
    explanation: "Bytecode consists of 1-byte instruction codes (0 to 255) such as `iload` (load int), `istore` (store int), `invokevirtual` (call method), and `return`.",
    hint: "The fundamental 1-byte instructions of the JVM stack machine.",
    level: "advanced",
    codeExample: "// Bytecode example:\n// 0: iconst_1\n// 1: istore_1\n// 2: return"
  },
  {
    question: "How do System.getProperty() calls help Java programs adapt dynamically to the host OS?",
    shortAnswer: "They provide read access to host runtime environment properties (os.name, file.separator, path.separator).",
    explanation: "Instead of hardcoding Windows backslashes (\\) or Linux forward slashes (/), Java provides `File.separator` and `System.getProperty()` to construct portable file paths across operating systems.",
    hint: "Path separation differences between Windows and Linux.",
    level: "intermediate",
    codeExample: "String separator = File.separator; // '\\' on Windows, '/' on Linux"
  },
  {
    question: "Can a Java .class file compiled on a 32-bit machine run on a 64-bit JVM without modification?",
    shortAnswer: "Yes, 100% seamlessly.",
    explanation: "Because Java primitive types have fixed bit-widths (e.g. int is always 32 bits, long is always 64 bits) regardless of OS bitness, bytecode executes with identical arithmetic on 32-bit and 64-bit JVMs.",
    hint: "Architecture neutrality guarantees identical primitive behavior.",
    level: "basic",
    codeExample: "// 32-bit compiled bytecode executes flawlessly on 64-bit JVMs."
  },
  {
    question: "What is the role of the Java Native Interface (JNI) in the context of WORA?",
    shortAnswer: "JNI allows Java to call native C/C++ code, but using JNI breaks Java's cross-platform WORA portability.",
    explanation: "If a Java application depends on native C dynamic libraries (.dll on Windows, .so on Linux), it loses pure WORA capability because the native C library must be recompiled for each target OS.",
    hint: "Native C bindings sacrifice pure portability.",
    level: "advanced",
    codeExample: "// JNI native method requires separate .dll and .so binaries:\npublic native void nativeMethod();"
  },
  {
    question: "How does the JVM prevent OS-specific path manipulation bugs across Windows and Linux?",
    shortAnswer: "By providing java.nio.file.Path and java.nio.file.Paths abstraction APIs.",
    explanation: "NIO.2 `Path.of(\"data\", \"reports\", \"file.txt\")` automatically normalizes path delimiters to the host OS format during filesystem operations.",
    hint: "Use Path.of() instead of hardcoded string concatenation.",
    level: "intermediate",
    codeExample: "Path p = Path.of(\"folder\", \"subfolder\", \"doc.txt\"); // Portable across OS"
  },
  {
    question: "What is the bytecode disassembler command provided with the JDK?",
    shortAnswer: "javap (e.g. javap -c ClassName).",
    explanation: "The `javap` command-line tool inspects compiled .class files and displays the human-readable disassembled JVM bytecode instructions.",
    hint: "The 'p' stands for print.",
    level: "advanced",
    codeExample: "// Terminal command: javap -c -p HelloWorld.class"
  },
  {
    question: "Why does Java enforce strict big-endian network byte ordering for compiled class files?",
    shortAnswer: "To guarantee uniform binary reading across both little-endian (x86) and big-endian (SPARC, ARM) hardware.",
    explanation: "Standardizing on big-endian byte order in the JVM specification ensures that multi-byte integers in .class files are parsed identically across all CPU architectures.",
    hint: "Byte ordering consistency across CPUs.",
    level: "expert",
    codeExample: "// JVM class format is strictly big-endian (most significant byte first)."
  },
  {
    question: "What happens if a developer creates a file named 'con.txt' on Linux in a Java program and tries to run it on Windows?",
    shortAnswer: "Windows rejects the file creation because 'CON', 'PRN', 'AUX', 'NUL' are reserved Windows device names.",
    explanation: "While Java code and bytecode are 100% portable, host OS filesystem rules still apply. Developers must avoid OS-reserved device filenames for true cross-platform safety.",
    hint: "Windows DOS legacy reserved filenames.",
    level: "intermediate",
    codeExample: "// Avoid reserved Windows names: CON, PRN, AUX, NUL, COM1-9, LPT1-9"
  },
  {
    question: "How does Java handle line endings across different operating systems (CRLF on Windows vs LF on Linux)?",
    shortAnswer: "By providing System.lineSeparator() and printf(\"%n\").",
    explanation: "Using `System.lineSeparator()` or `%n` in formatted strings outputs the exact line termination character expected by the host OS (`\\r\\n` on Windows, `\\n` on Linux/macOS).",
    hint: "Never hardcode \\r\\n; use System.lineSeparator() or %n.",
    level: "basic",
    codeExample: "System.out.printf(\"Line 1%nLine 2%n\"); // %n is OS-portable newline"
  },
  {
    question: "What is a 'Fat JAR' (or Uber JAR) in Java software distribution?",
    shortAnswer: "A single standalone .jar archive containing compiled application bytecode and all bundled dependency libraries.",
    explanation: "Fat JARs embody WORA distribution: a single .jar file can be shipped to any server and executed immediately via `java -jar app.jar` without configuring external classpaths.",
    hint: "Self-contained executable Java archive.",
    level: "intermediate",
    codeExample: "// Run anywhere: java -jar production-microservice.jar"
  },
  {
    question: "What is the purpose of the 'jlink' tool introduced in Java 9 for cross-platform containerization?",
    shortAnswer: "It creates custom, minimal Java runtime images containing only the specific modules needed by the application.",
    explanation: "Instead of shipping a full 300MB JDK, `jlink` generates a lightweight custom 35MB runtime, optimizing cloud container deployment across Linux servers.",
    hint: "Modular custom runtime generator.",
    level: "advanced",
    codeExample: "// Command: jlink --module-path $JAVA_HOME/jmods --add-modules java.base --output custom-jre"
  },
  {
    question: "How does Java ensure that graphic user interfaces (GUIs) remain portable across OS platforms?",
    shortAnswer: "Through Swing and JavaFX, which render lightweight custom components rather than relying on native OS widgets.",
    explanation: "While early AWT used native OS peer components (causing visual inconsistencies), Swing and JavaFX draw components directly into pixel buffers, ensuring pixel-identical UI across Windows, Linux, and macOS.",
    hint: "Heavyweight (AWT) vs Lightweight (Swing/JavaFX) GUI rendering.",
    level: "intermediate",
    codeExample: "// Swing & JavaFX draw custom pixels for identical cross-platform look and feel."
  },
  {
    question: "What role does the 'java.base' module play in modern Java portability?",
    shortAnswer: "It is the foundational core module containing java.lang, java.util, java.io, and java.nio required by all Java programs.",
    explanation: "Every Java class implicitly requires `java.base`. It guarantees that foundational types like Object, String, Class, and System are universally present across every JVM implementation.",
    hint: "The root module of the Java Module System (JPMS).",
    level: "basic",
    codeExample: "// module java.base exports java.lang, java.util, java.io, java.nio"
  },
  {
    question: "Why was the 'Write Once, Debug Everywhere' critique sometimes leveled against early Java in the late 1990s?",
    shortAnswer: "Early JVM implementations had minor behavioral differences and bugs across different operating systems.",
    explanation: "In the 1990s, early third-party JVM vendors had slight rendering and thread scheduling discrepancies. Sun Microsystems resolved this through strict Java Compatibility Test Kits (TCK) and the standardized OpenJDK reference implementation.",
    hint: "Historical growing pains of early JVMs.",
    level: "intermediate",
    codeExample: "// Modern OpenJDK TCK testing guarantees 100% compliance across all certified JVMs."
  },
  {
    question: "What is the Java Technology Compatibility Kit (TCK)?",
    shortAnswer: "A test suite of over 100,000 automated tests that a JVM distribution must pass to be certified as Java SE compliant.",
    explanation: "Any vendor building a JVM (Oracle, Amazon, Eclipse, Red Hat) must pass the TCK to guarantee that their JVM executes standard bytecode with 100% specification compliance.",
    hint: "Certification test suite for JVM vendors.",
    level: "advanced",
    codeExample: "// Ensures Amazon Corretto runs identically to Oracle JDK and Eclipse Temurin."
  },
  {
    question: "How does the JVM handle endianness differences between host CPUs?",
    shortAnswer: "The JVM internally standardizes data manipulation, shielding the programmer from byte-ordering hardware quirks.",
    explanation: "Whether running on a little-endian Intel x86 chip or a big-endian IBM mainframe, Java bitwise operations (`<<`, `>>`, `>>>`) produce identical results.",
    hint: "Bit-shift operations behave identically on all CPUs.",
    level: "advanced",
    codeExample: "int mask = 0xFF00; // Operates identically across all CPU architectures"
  },
  {
    question: "Can bytecode compiled on a newer Java version (e.g. Java 21) run on an older JVM (e.g. Java 8)?",
    shortAnswer: "No, the older JVM will throw an 'UnsupportedClassVersionError'.",
    explanation: "Java enforces backward compatibility (old bytecode runs on new JVMs), but NOT forward compatibility. Class file major version numbers (e.g. Java 21 = major version 65, Java 8 = 52) prevent running newer bytecode on older JVMs.",
    hint: "Backward compatibility != Forward compatibility.",
    level: "intermediate",
    codeExample: "// Throws: java.lang.UnsupportedClassVersionError: class has been compiled by a more recent version"
  },
  {
    question: "How can a developer compile code on Java 21 so that it can run on Java 8 or Java 11?",
    shortAnswer: "By using the '--release' flag with javac (e.g. javac --release 11 App.java).",
    explanation: "The `--release N` flag configures both the bytecode class version AND links against the exact class library signature of version N, ensuring backward compatibility.",
    hint: "The --release javac compiler flag.",
    level: "advanced",
    codeExample: "// Command: javac --release 11 HelloWorld.java"
  },
  {
    question: "What is the significance of the 'java.lang.System' class in cross-platform Java programming?",
    shortAnswer: "It provides standard platform-independent APIs for I/O (System.out), current time (currentTimeMillis), and environment access.",
    explanation: "System encapsulates host-specific operating system interactions behind safe, portable static methods that work consistently everywhere.",
    hint: "Standard bridge between Java and host environment.",
    level: "basic",
    codeExample: "long timestamp = System.currentTimeMillis(); // Portable epoch timestamp"
  },
  {
    question: "How do Docker containers interact with Java's WORA philosophy?",
    shortAnswer: "Containers provide OS/runtime isolation, while Java provides portable bytecode and multi-core thread scaling inside containers.",
    explanation: "Modern cloud deployments combine WORA (universal .jar file) with Linux container images (Docker/Kubernetes), allowing single build artifacts to deploy across multi-cloud environments.",
    hint: "Portable JAR inside portable Docker container.",
    level: "intermediate",
    codeExample: "// Dockerfile: FROM eclipse-temurin:21-jre \n// COPY app.jar app.jar \n// ENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]"
  },
  {
    question: "What is the difference between 'source compatibility' and 'binary compatibility' in Java?",
    shortAnswer: "Source compatibility means old source code still compiles; binary compatibility means old .class files still execute without recompilation.",
    explanation: "Java guarantees both: old source code compiles on modern JDKs, and compiled .class files from 20 years ago run directly on modern JVMs.",
    hint: "Compiling source vs executing pre-compiled bytecode.",
    level: "expert",
    codeExample: "// Java provides the highest binary compatibility of any mainstream platform."
  },
  {
    question: "Why does Java use UTF-16 for internal String representation across all platforms?",
    shortAnswer: "To support internationalization and multilingual characters natively regardless of host OS default locale.",
    explanation: "By decoupling String encoding from the host operating system's local codepage (e.g. Windows-1252 or Shift-JIS), Java ensures universal character processing across all languages.",
    hint: "Internationalization from day one.",
    level: "intermediate",
    codeExample: "String multilingual = \"হ্যালো (Bengali) - नमस्ते (Hindi) - Hello (English)\";"
  },
  {
    question: "What is the JVM Stack Machine model and why was it chosen over a Register Machine model for WORA?",
    shortAnswer: "A stack machine does not assume any specific number of CPU hardware registers, making bytecode universally portable.",
    explanation: "Different physical CPUs have varying numbers of general-purpose registers (x86 has few, ARM has many). The JVM uses an Operand Stack for all operations, making bytecode trivial to translate onto any physical CPU architecture.",
    hint: "Operand stack vs hardware CPU registers.",
    level: "expert",
    codeExample: "// Stack operations: push 10, push 20, add, store"
  },
  {
    question: "How does the 'java' command execute a single-file source code program without explicit compilation (Java 11+)?",
    shortAnswer: "Via JEP 330: 'java HelloWorld.java' compiles in-memory and executes immediately.",
    explanation: "Starting with Java 11, developers can run single-file Java programs directly without manually calling `javac`, streamlining scripting and quick prototyping.",
    hint: "Single-file source code execution.",
    level: "basic",
    codeExample: "// Single command: java HelloWorld.java"
  },
  {
    question: "Why does WORA remain a critical competitive advantage for businesses today?",
    shortAnswer: "It drastically lowers development, distribution, cloud hosting, and testing costs while preventing vendor lock-in.",
    explanation: "Organizations can develop on macOS/Windows laptops, test in Linux CI/CD pipelines, and deploy onto AWS Graviton (ARM) or Intel (x86) Kubernetes clusters without modifying application code.",
    hint: "Dev on Mac/Win → Deploy on Linux Cloud.",
    level: "basic",
    codeExample: "// Code once in Barrackpore → Deploy to global AWS Cloud with zero friction."
  }
];

export default questions;
