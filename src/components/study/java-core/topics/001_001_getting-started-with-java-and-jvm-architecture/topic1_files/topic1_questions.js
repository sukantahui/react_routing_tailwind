const questions = [
  {
    question: "Who is known as the Father of Java and which company originally developed the language?",
    shortAnswer: "James Gosling at Sun Microsystems.",
    explanation: "James Gosling led the Green Team at Sun Microsystems in 1991 to create the language originally called Oak, which was officially released as Java in 1995.",
    hint: "Think of Sun Microsystems in the early 1990s.",
    level: "basic",
    codeExample: "// Created in 1991 by James Gosling at Sun Microsystems."
  },
  {
    question: "Why was the language originally named 'Oak' and why was it renamed to 'Java'?",
    shortAnswer: "Named Oak after a tree outside Gosling's office; renamed Java due to a trademark conflict with Oak Technology.",
    explanation: "The team discovered that 'Oak' was already registered by Oak Technology. During a brainstorming session, 'Java' (inspired by Java coffee) was selected for its distinctiveness.",
    hint: "A coffee brand name inspired the final choice.",
    level: "basic",
    codeExample: "// Oak (1991) → Trademark conflict → Java (1995)"
  },
  {
    question: "What were the primary landmark features introduced in Java 5 (J2SE 5.0) in 2004?",
    shortAnswer: "Generics, Enums, Autoboxing/Unboxing, Varargs, Annotations, Enhanced for loop, and java.util.concurrent.",
    explanation: "Java 5 was one of the largest language enhancements in history, fundamentally modernizing Java syntax with type-safe Generics, custom Enums, metadata Annotations, and Doug Lea's concurrency library.",
    hint: "Think of features that eliminated manual casting and raw threads.",
    level: "intermediate",
    codeExample: "List<String> list = new ArrayList<>(); // Generics\nenum Status { ACTIVE, INACTIVE } // Enums"
  },
  {
    question: "Why is Java 8 considered the most impactful paradigm shift in Java's history?",
    shortAnswer: "It introduced Functional Programming paradigms with Lambda Expressions and the Stream API.",
    explanation: "Java 8 (March 2014) transitioned Java from purely imperative OOP to multi-paradigm programming, introducing Lambdas, Stream pipelines, default interface methods, Optional, and the modern java.time API.",
    hint: "Think about (a, b) → a + b and list.stream().filter().",
    level: "intermediate",
    codeExample: "list.stream().filter(x → x > 10).forEach(System.out::println);"
  },
  {
    question: "What is Project Jigsaw and in which Java version was it released?",
    shortAnswer: "The Java Platform Module System (JPMS), released in Java 9.",
    explanation: "Java 9 introduced module-info.java to break the monolithic rt.jar into discrete, strongly encapsulated modules (e.g. java.base, java.sql), improving security and enabling custom small runtime images via jlink.",
    hint: "Introduced module-info.java descriptor.",
    level: "advanced",
    codeExample: "module com.myapp {\n    requires java.sql;\n    exports com.myapp.api;\n}"
  },
  {
    question: "What major change occurred to Java's release cadence starting with Java 10 in 2018?",
    shortAnswer: "A strict 6-month time-driven release model replaced the traditional multi-year feature-driven model.",
    explanation: "Instead of waiting 3-4 years for large monolithic releases, new Java feature versions are released every March and September, with LTS versions designated every 2 years.",
    hint: "Releases occur twice every year like clockwork.",
    level: "intermediate",
    codeExample: "// Java 10 (Mar 2018), Java 11 LTS (Sep 2018), Java 12 (Mar 2019)..."
  },
  {
    question: "What is an LTS version and which Java versions currently carry LTS status?",
    shortAnswer: "Long-Term Support version; current industry LTS versions are Java 8, 11, 17, and 21.",
    explanation: "LTS versions receive multi-year enterprise maintenance, security patches, and commercial support. Enterprise organizations standardize production deployments on LTS versions.",
    hint: "Check the 2-year cadence (Java 11, 17, 21).",
    level: "basic",
    codeExample: "// Enterprise standard: Java 17 LTS & Java 21 LTS"
  },
  {
    question: "What are Records in Java and in which version did they become a standard feature?",
    shortAnswer: "Immutable data carrier classes; finalized as standard in Java 16 (JEP 395).",
    explanation: "Records provide a compact syntax for declaring classes that are transparent holders for immutable data, automatically generating constructors, getters, equals(), hashCode(), and toString().",
    hint: "Replaces boilerplate DTO/POJO classes.",
    level: "intermediate",
    codeExample: "public record User(String id, String name, String email) { }"
  },
  {
    question: "What are Sealed Classes in Java and when were they introduced as a standard feature?",
    shortAnswer: "Classes that restrict which other classes may extend or implement them; standardized in Java 17.",
    explanation: "Sealed classes (using 'sealed' and 'permits') allow developers to define closed class hierarchies, enhancing domain modeling and enabling compiler exhaustiveness checks in switch expressions.",
    hint: "Opposite of unbounded open inheritance.",
    level: "advanced",
    codeExample: "public sealed class Shape permits Circle, Rectangle { }"
  },
  {
    question: "What is Project Loom and why is it a game-changer in Java 21 LTS?",
    shortAnswer: "It brings lightweight Virtual Threads to the JVM, enabling high-throughput I/O with millions of threads.",
    explanation: "Virtual Threads (JEP 444) decouple Java threads from expensive 1:1 OS kernel threads, allowing developers to write simple synchronous blocking code that scales to millions of concurrent requests.",
    hint: "Millions of threads without high RAM consumption.",
    level: "expert",
    codeExample: "try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {\n    executor.submit(() → fetchHttpData());\n}"
  },
  {
    question: "What was the purpose of Applets in Java 1.0 and why were they deprecated and removed?",
    shortAnswer: "To run interactive Java code inside web browsers; removed due to security flaws and modern HTML5 standards.",
    explanation: "Applets were revolutionary in 1995 for embedding interactive content in Netscape. However, browser plugin vulnerabilities and modern JavaScript/HTML5 led to Applets being deprecated in Java 9 and removed in Java 11.",
    hint: "Browser-embedded client-side Java.",
    level: "intermediate",
    codeExample: "// Applets are legacy history; modern web uses React/HTML5 frontends + Java REST backends."
  },
  {
    question: "What company acquired Sun Microsystems in 2010 to become the steward of Java?",
    shortAnswer: "Oracle Corporation.",
    explanation: "Oracle finalized the acquisition of Sun Microsystems in January 2010, taking over leadership of the OpenJDK project, Java SE specification, and enterprise Java development.",
    hint: "A major enterprise database company.",
    level: "basic",
    codeExample: "// Oracle acquired Sun in 2010."
  },
  {
    question: "What is the 'var' keyword introduced in Java 10 (Local-Variable Type Inference)?",
    shortAnswer: "It allows the compiler to infer local variable types from the initializer expression.",
    explanation: "Java 10 introduced 'var' for local variables with initializers, reducing boilerplate while retaining 100% static compile-time type safety.",
    hint: "Does not make Java dynamically typed; type is inferred at compile-time.",
    level: "intermediate",
    codeExample: "var map = new HashMap<String, List<Integer>>(); // Type is statically inferred"
  },
  {
    question: "What are Text Blocks and in which Java version were they standardized?",
    shortAnswer: "Multi-line string literals using triple quotes (\"\"\"); standardized in Java 15.",
    explanation: "Text blocks eliminate the need for escape sequences (\\n, \\\") and concatenation when authoring multi-line SQL queries, JSON strings, or HTML templates.",
    hint: "Uses triple quotes \"\"\".",
    level: "basic",
    codeExample: "String json = \"\"\"\n    {\n      \"name\": \"Swadeep\"\n    }\n    \"\"\";"
  },
  {
    question: "What is Pattern Matching for instanceof (Java 16) and how does it clean up code?",
    shortAnswer: "It combines type checking and downcasting into a single atomic expression.",
    explanation: "Instead of writing `if (obj instanceof String) { String s = (String) obj; }`, Pattern Matching allows `if (obj instanceof String s) { s.toLowerCase(); }`.",
    hint: "Eliminates the explicit casting line.",
    level: "intermediate",
    codeExample: "if (obj instanceof String s) {\n    System.out.println(s.length());\n}"
  },
  {
    question: "What is the difference between HotSpot JVM and GraalVM?",
    shortAnswer: "HotSpot is the standard JIT JVM; GraalVM is a polyglot high-performance VM offering Ahead-Of-Time Native Image compilation.",
    explanation: "HotSpot relies on C1/C2 JIT compilation. GraalVM includes a modern JIT written in Java and can compile Java directly into standalone native OS binaries that start in milliseconds.",
    hint: "GraalVM Native Image generates instant-start binaries.",
    level: "advanced",
    codeExample: "// GraalVM command: native-image -jar myapp.jar"
  },
  {
    question: "When was the Collections Framework added to Java?",
    shortAnswer: "In Java 1.2 (J2SE 1.2) in 1998.",
    explanation: "Prior to Java 1.2, Java only had rudimentary structures like Vector, Hashtable, and raw arrays. Java 1.2 introduced the standardized JCF (List, Set, Map, ArrayList, HashMap).",
    hint: "Part of the Java 2 rebranding.",
    level: "intermediate",
    codeExample: "// Java 1.2 introduced List, Map, Set, ArrayList, HashMap."
  },
  {
    question: "Why was the 'PermGen' memory space removed in Java 8?",
    shortAnswer: "To prevent PermGen OutOfMemoryErrors; replaced by off-heap Metaspace.",
    explanation: "PermGen had a fixed maximum size that frequently overflowed during dynamic class loading. Metaspace uses native memory and expands dynamically as needed by the OS.",
    hint: "Replaced by Metaspace.",
    level: "advanced",
    codeExample: "// Pre-Java 8: java.lang.OutOfMemoryError: PermGen space\n// Java 8+: Metaspace"
  },
  {
    question: "What is the new HTTP Client API introduced in Java 11?",
    shortAnswer: "java.net.http.HttpClient supporting HTTP/1.1, HTTP/2, and WebSockets synchronously and asynchronously.",
    explanation: "Replaced the legacy, awkward HttpURLConnection with a modern, fluent, asynchronous HTTP client API built directly into Java SE.",
    hint: "Located in java.net.http package.",
    level: "intermediate",
    codeExample: "HttpClient client = HttpClient.newHttpClient();\nHrefRequest req = HttpRequest.newBuilder(URI.create(\"https://api.com\")).build();"
  },
  {
    question: "What is JShell and in which version was it introduced?",
    shortAnswer: "An interactive Read-Eval-Print Loop (REPL) tool introduced in Java 9.",
    explanation: "JShell allows developers and students to evaluate Java expressions, statements, and methods interactively from the command line without writing full classes or main methods.",
    hint: "Interactive Java terminal REPL.",
    level: "basic",
    codeExample: "// Terminal command: jshell\n// jshell> int x = 10;\n// jshell> x * 2 ==> 20"
  },
  {
    question: "What are Sequenced Collections introduced in Java 21 (JEP 431)?",
    shortAnswer: "Unified interfaces for collections with a defined encounter order (getFirst, getLast, reversed).",
    explanation: "Java 21 added SequencedCollection, SequencedSet, and SequencedMap to provide consistent methods for accessing and modifying first/last elements across List, Deque, LinkedHashSet, and SortedSet.",
    hint: "Bridges the gap for first/last element access.",
    level: "advanced",
    codeExample: "List<String> list = List.of(\"A\", \"B\", \"C\");\nString first = list.getFirst(); // Java 21 feature\nString last = list.getLast();"
  },
  {
    question: "What is the difference between OpenJDK and Oracle JDK licensing?",
    shortAnswer: "OpenJDK is 100% free open-source (GPLv2+CE); Oracle JDK is commercial with free terms for dev/testing under NFTC.",
    explanation: "Since Java 11, OpenJDK and Oracle JDK share identical source code, but OpenJDK is fully open-source while Oracle JDK has proprietary enterprise licensing terms.",
    hint: "OpenJDK is the free reference codebase.",
    level: "intermediate",
    codeExample: "// Both compile and execute the exact same bytecode."
  },
  {
    question: "What was the Green Project's star 7 device in 1992?",
    shortAnswer: "An interactive handheld touchscreen remote control running Oak with Duke as mascot.",
    explanation: "The *7 (Star Seven) demonstrated Oak controlling home electronics with an animated touchscreen mascot named 'Duke', who later became the official Java mascot.",
    hint: "Duke is the Java mascot.",
    level: "basic",
    codeExample: "// Duke remains the official mascot of Java."
  },
  {
    question: "How did Java 7 improve the 'switch' statement?",
    shortAnswer: "By allowing String objects to be used as switch case expressions.",
    explanation: "Prior to Java 7, switch only supported integers, characters, and enums. Java 7 added support for String matching based on hashcode and equals().",
    hint: "Allowed switch(\"admin\") { case \"admin\": ... }",
    level: "basic",
    codeExample: "String role = \"ADMIN\";\nswitch (role) {\n    case \"ADMIN\" → System.out.println(\"Full Access\");\n}"
  },
  {
    question: "What are Foreign Function & Memory APIs (Project Panama) in modern Java?",
    shortAnswer: "APIs enabling Java programs to interoperate with native C code and native memory safely without JNI.",
    explanation: "Project Panama (standardized in Java 22+) replaces complex and error-prone Java Native Interface (JNI) with clean, high-performance Java APIs for invoking native libraries.",
    hint: "Replaces traditional JNI.",
    level: "expert",
    codeExample: "// Native memory access without C wrappers."
  },
  {
    question: "What is String Deduplication in JVM Garbage Collectors?",
    shortAnswer: "An optimization in G1 GC that shares identical char/byte arrays across String instances to save heap RAM.",
    explanation: "Introduced in Java 8u20 and enhanced in modern versions (-XX:+UseStringDeduplication), G1 GC detects identical String contents in the heap and points them to a single shared array.",
    hint: "Saves memory by pointing duplicate strings to one byte array.",
    level: "expert",
    codeExample: "// Enabled via: java -XX:+UseG1GC -XX:+UseStringDeduplication -jar app.jar"
  },
  {
    question: "Why was the 'finalize()' method deprecated in Java 9 and marked for removal?",
    shortAnswer: "It causes performance degradation, memory retention, deadlocks, and unpredictable execution timing.",
    explanation: "The JVM makes no guarantee when finalize() will run. Java 9 introduced java.lang.ref.Cleaner and PhantomReferences as safe, deterministic resource cleanup alternatives.",
    hint: "Unpredictable garbage collection destructor.",
    level: "advanced",
    codeExample: "// Use try-with-resources or java.lang.ref.Cleaner instead of finalize()."
  },
  {
    question: "What is Compact Strings in Java 9?",
    shortAnswer: "Storing LATIN-1 strings in byte[] (1 byte per char) instead of char[] (2 bytes per char).",
    explanation: "Most application strings contain only ASCII/Latin-1 characters. Java 9 changed String internal storage from `char[]` to `byte[]` with an encoding coder flag, cutting String memory consumption by ~50%.",
    hint: "Halved heap memory consumption for Western strings.",
    level: "advanced",
    codeExample: "// Transparent memory optimization in java.lang.String."
  },
  {
    question: "What is the purpose of the Java Community Process (JCP) executive committee?",
    shortAnswer: "To vote on and ratify Java Specification Requests (JSRs) that govern the evolution of Java SE and EE.",
    explanation: "The JCP includes major tech companies (Oracle, IBM, Red Hat, Eclipse Foundation) and community representatives who collaboratively approve language and API standards.",
    hint: "Community governance of Java standards.",
    level: "intermediate",
    codeExample: "// JCP ratifies JSRs before they enter JDK builds."
  },
  {
    question: "How has Java maintained its position as a top-3 programming language for over 30 years?",
    shortAnswer: "Relentless focus on backwards compatibility, high runtime performance, continuous modern evolution, and massive ecosystem.",
    explanation: "By combining enterprise-grade stability with steady modernization (Lambdas, Records, Loom Virtual Threads, ZGC), Java delivers the reliability businesses trust with the modern syntax developers demand.",
    hint: "Stability + continuous modernization.",
    level: "basic",
    codeExample: "// Over 30 years of continuous innovation (1995 - 2026)."
  }
];

export default questions;
