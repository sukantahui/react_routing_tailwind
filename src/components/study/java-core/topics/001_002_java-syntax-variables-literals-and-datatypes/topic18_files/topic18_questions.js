/**
 * Topic 18: Closing Scanner resources and avoiding resource leaks
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "Why should a `Scanner` created on a `File` or `InputStream` be closed after use?",
    shortAnswer: "To release the underlying operating system file descriptors, locks, and native buffer resources.",
    explanation: "Failing to close file or network scanners leads to resource leaks (e.g. 'Too many open files' OS error) and prevents other processes from accessing or modifying the locked file.",
    hint: "Releases OS file descriptors and memory buffers.",
    level: "basic",
    codeExample: "try (Scanner sc = new Scanner(new File(\"students.txt\"))) {\n  // File closed automatically\n}"
  },
  {
    question: "Which interfaces does `java.util.Scanner` implement for resource management?",
    shortAnswer: "`java.lang.AutoCloseable` and `java.io.Closeable`.",
    explanation: "Because `Scanner` implements `AutoCloseable`, it can be managed cleanly using the Java 7+ Try-With-Resources statement.",
    hint: "Implements AutoCloseable and Closeable.",
    level: "basic",
    codeExample: "Scanner sc = new Scanner(source);\n// Implements AutoCloseable"
  },
  {
    question: "How does the Try-With-Resources statement work with `Scanner`?",
    shortAnswer: "Any `Scanner` declared inside `try (...)` has its `.close()` method invoked automatically when the block exits, even if an exception occurs.",
    explanation: "Try-With-Resources (ARM) eliminates the need for manual `finally` blocks and ensures guaranteed cleanup without boilerplate code.",
    hint: "Automatic cleanup at block boundary.",
    level: "basic",
    codeExample: "try (Scanner sc = new Scanner(file)) {\n  while (sc.hasNext()) { sc.next(); }\n} // sc.close() called automatically!"
  },
  {
    question: "What is the critical danger of closing a `Scanner` wrapped around `System.in`?",
    shortAnswer: "Closing the `Scanner` permanently closes `System.in` for the entire JVM process.",
    explanation: "`Scanner.close()` invokes `close()` on its underlying stream. Once `System.in` is closed, the JVM cannot reopen standard keyboard input, and subsequent read attempts will fail.",
    hint: "Closing Scanner(System.in) kills keyboard input globally.",
    level: "intermediate",
    codeExample: "Scanner sc = new Scanner(System.in);\nsc.close(); // System.in is now closed!\n// Scanner sc2 = new Scanner(System.in); // Will fail!"
  },
  {
    question: "Why should you NEVER close a `Scanner(System.in)` inside a helper method?",
    shortAnswer: "Because closing it terminates `System.in`, breaking console input for the rest of the application.",
    explanation: "If method `readStudentAge()` creates a Scanner on `System.in` and closes it before returning, subsequent methods like `readStudentName()` will crash with `NoSuchElementException` or `IllegalStateException`.",
    hint: "Pass the Scanner as a parameter instead of closing inside helper methods.",
    level: "intermediate",
    codeExample: "// Anti-pattern:\nvoid readAge() { Scanner sc = new Scanner(System.in); sc.nextInt(); sc.close(); } // Breaks System.in!"
  },
  {
    question: "What is the recommended architectural pattern for managing `Scanner(System.in)` in console applications?",
    shortAnswer: "Instantiate a single shared `Scanner` at the application entry point (`main`), pass it to helper methods, and close it only when the program exits.",
    explanation: "A single shared scanner ensures consistent buffer state and avoids premature stream closure.",
    hint: "Single shared instance at application level.",
    level: "intermediate",
    codeExample: "public static void main(String[] args) {\n  Scanner sc = new Scanner(System.in);\n  readHeader(sc);\n  readDetails(sc);\n  sc.close(); // Closed only at application exit\n}"
  },
  {
    question: "What warning do IDEs like Eclipse, IntelliJ, or SonarQube show when a `Scanner` is not closed?",
    shortAnswer: "'Resource leak: 'scanner' is never closed' or 'Resource leak: 'scanner' is not closed at this location'.",
    explanation: "Static code analyzers check for unclosed `AutoCloseable` instances. For `System.in`, developers can use `@SuppressWarnings(\"resource\")` if keeping it open intentionally.",
    hint: "Resource leak compiler warning.",
    level: "basic",
    codeExample: "@SuppressWarnings(\"resource\")\nScanner consoleScanner = new Scanner(System.in);"
  },
  {
    question: "What happens if an exception is thrown inside a Try-With-Resources block and `close()` also throws an exception?",
    shortAnswer: "The exception inside the block is thrown; the exception from `close()` is attached as a 'Suppressed Exception'.",
    explanation: "Java 7 exception suppression ensures the primary business logic exception is not masked by cleanup failures. You can retrieve suppressed exceptions via `e.getSuppressed()`.",
    hint: "Suppressed exceptions preserve primary error visibility.",
    level: "advanced",
    codeExample: "try (Scanner sc = new Scanner(file)) {\n  throw new RuntimeException(\"Primary\");\n} catch (Exception e) {\n  Throwable[] suppressed = e.getSuppressed();\n}"
  },
  {
    question: "Can multiple resources be declared in a single Try-With-Resources statement?",
    shortAnswer: "Yes, separated by semicolons: `try (Scanner sc1 = ...; Scanner sc2 = ...) { }`.",
    explanation: "Resources are initialized from left to right and closed in reverse order (right to left) upon completion.",
    hint: "Semicolon-separated resource declarations in reverse close order.",
    level: "intermediate",
    codeExample: "try (Scanner sc1 = new Scanner(file1); Scanner sc2 = new Scanner(file2)) {\n  // Both closed automatically in reverse order\n}"
  },
  {
    question: "What exception is thrown if you attempt to call `scanner.next()` on an already closed `Scanner`?",
    shortAnswer: "`java.lang.IllegalStateException`.",
    explanation: "Once a `Scanner` is closed, invoking any scanning or token retrieval method throws `IllegalStateException: Scanner closed`.",
    hint: "IllegalStateException: Scanner closed.",
    level: "basic",
    codeExample: "Scanner sc = new Scanner(\"data\");\nsc.close();\n// sc.next(); // THROWS IllegalStateException!"
  },
  {
    question: "Does `Scanner.close()` throw `IOException`?",
    shortAnswer: "No, `Scanner.close()` catches and suppresses `IOException` internally (unlike `InputStream.close()`).",
    explanation: "`Scanner` overrides `Closeable.close()` without declaring `throws IOException`, simplifying cleanup code.",
    hint: "Scanner.close() does not declare checked exceptions.",
    level: "intermediate",
    codeExample: "Scanner sc = new Scanner(file);\nsc.close(); // No try-catch needed around close()"
  },
  {
    question: "What does `scanner.ioException()` return after an I/O error during scanning?",
    shortAnswer: "The suppressed `IOException` instance thrown by the underlying stream.",
    explanation: "Because `Scanner` suppresses checked `IOException`s during operation, calling `scanner.ioException()` lets developers inspect underlying hardware/file errors.",
    hint: "Inspects underlying stream errors.",
    level: "advanced",
    codeExample: "if (scanner.ioException() != null) {\n  System.err.println(\"Underlying I/O failed!\");\n}"
  },
  {
    question: "Is it necessary to close an in-memory `Scanner` created on a `String` (e.g. `new Scanner(\"1 2 3\");`)?",
    shortAnswer: "It is good practice, but not strictly necessary for OS resources since `StringReader` holds no native file handles.",
    explanation: "In-memory string scanners hold only Java heap memory, which is reclaimed by GC. However, closing them is a good habit for code consistency.",
    hint: "String scanners hold no OS descriptors, but closing is good practice.",
    level: "intermediate",
    codeExample: "Scanner sc = new Scanner(\"Swadeep 101\"); // In-memory, no OS file descriptors"
  },
  {
    question: "What is the difference between Java 7 Try-With-Resources and Java 9 Effectively Final Try-With-Resources?",
    shortAnswer: "In Java 9+, pre-existing `final` or effectively final resource variables can be referenced directly in `try (res) { }` without redeclaring them.",
    explanation: "Java 7 required declaring new variables inside `try (Scanner sc = ...)`. Java 9 allows referencing already initialized variables directly.",
    hint: "Java 9 allows try(existingResource).",
    level: "advanced",
    codeExample: "Scanner sc = new Scanner(file);\ntry (sc) {\n  sc.next();\n}"
  },
  {
    question: "How does closing a `Scanner` wrapped around a `Socket.getInputStream()` affect the socket?",
    shortAnswer: "It closes the underlying input stream, which in turn immediately closes the entire network `Socket`.",
    explanation: "Closing a stream closes all nested streams and parent socket descriptors.",
    hint: "Closing stream closes the parent socket.",
    level: "advanced",
    codeExample: "Socket socket = new Socket(\"localhost\", 8080);\nScanner sc = new Scanner(socket.getInputStream());\nsc.close(); // Socket is now also closed!"
  },
  {
    question: "Why should `Scanner` not be left unclosed in long-running enterprise server microservices?",
    shortAnswer: "Accumulating unclosed file handles over days will exhaust the OS file descriptor table and cause the server to crash.",
    explanation: "Every unclosed file scanner consumes a descriptor in the operating system kernel. When the OS limit is reached, all subsequent file and socket operations fail.",
    hint: "File descriptor exhaustion crashes server daemons.",
    level: "advanced",
    codeExample: "// Microservice best practice: Always use try-with-resources"
  },
  {
    question: "Can a `Scanner` be reopened once closed?",
    shortAnswer: "No, a closed `Scanner` cannot be reopened; a new `Scanner` instance must be created.",
    explanation: "`Scanner` does not provide an `open()` or `reset()` method to revive closed streams.",
    hint: "Closed scanners cannot be reopened.",
    level: "basic",
    codeExample: "// Must create a new instance: sc = new Scanner(newSource);"
  },
  {
    question: "What design pattern is commonly used for console input in multi-class applications?",
    shortAnswer: "A static utility class or Dependency Injection providing a shared `Scanner` or `ConsoleReader`.",
    explanation: "Encapsulating the console scanner in an `InputManager` or passing it via constructor injection prevents scattered `new Scanner(System.in)` instantiations.",
    hint: "Centralized InputManager or Dependency Injection.",
    level: "advanced",
    codeExample: "public class InputManager {\n  private static final Scanner SCANNER = new Scanner(System.in);\n  public static String readString() { return SCANNER.nextLine(); }\n}"
  },
  {
    question: "Does `System.console()` require closing like `Scanner`?",
    shortAnswer: "No, `java.io.Console` represents the singleton system console and does not require explicit closing.",
    explanation: "`System.console()` provides direct access to the console device and handles password masking via `readPassword()`.",
    hint: "System.console() is a managed singleton.",
    level: "intermediate",
    codeExample: "Console console = System.console();\nif (console != null) {\n  char[] pwd = console.readPassword(\"Password: \");\n}"
  },
  {
    question: "How do you suppress the Eclipse/IntelliJ unclosed resource warning for `System.in`?",
    shortAnswer: "Annotate the variable or method with `@SuppressWarnings(\"resource\")`.",
    explanation: "This informs static analysis tools that the resource lifecycle is deliberately managed globally.",
    hint: "@SuppressWarnings(\"resource\")",
    level: "intermediate",
    codeExample: "@SuppressWarnings(\"resource\")\nScanner sc = new Scanner(System.in);"
  },
  {
    question: "What happens when a `Scanner` is used inside a `finally` block before Java 7?",
    shortAnswer: "It required explicit `if (sc != null) { sc.close(); }` inside nested try-catches.",
    explanation: "Before Try-With-Resources, closing streams required error-prone verbose finally blocks.",
    hint: "Legacy finally blocks were verbose and error-prone.",
    level: "basic",
    codeExample: "// Legacy Java 6 idiom:\nScanner sc = null;\ntry { sc = new Scanner(file); }\nfinally { if (sc != null) sc.close(); }"
  },
  {
    question: "Can a custom class implement `AutoCloseable` to work in Try-With-Resources just like `Scanner`?",
    shortAnswer: "Yes, by implementing `public void close() throws Exception` from `java.lang.AutoCloseable`.",
    explanation: "Any class implementing `AutoCloseable` can be managed with try-with-resources statements.",
    hint: "Implement AutoCloseable interface.",
    level: "intermediate",
    codeExample: "class StudentAuditSession implements AutoCloseable {\n  public void close() { System.out.println(\"Audit closed\"); }\n}"
  },
  {
    question: "What is the relationship between `AutoCloseable` and Garbage Collection?",
    shortAnswer: "Garbage collection reclaims JVM heap memory, but does NOT reliably close native OS resources; explicit `close()` is mandatory.",
    explanation: "The JVM garbage collector manages memory only. Relying on GC or `finalize()` to close file handles leads to memory leaks and file lockouts.",
    hint: "GC only reclaims memory, not OS file handles.",
    level: "advanced",
    codeExample: "// Rule: Never rely on GC to close file handles"
  },
  {
    question: "How do you verify whether a `Scanner` is currently open or closed?",
    shortAnswer: "There is no `isOpen()` method on `Scanner`; check your program's architectural lifecycle or catch `IllegalStateException`.",
    explanation: "Because `Scanner` does not expose an `isClosed()` method, proper lifecycle design (e.g. Try-With-Resources) is essential.",
    hint: "Lifecycle must be managed by design.",
    level: "advanced",
    codeExample: "// Best practice: Scope with Try-With-Resources so state is deterministic"
  },
  {
    question: "What is the impact of an unclosed `Scanner` on file deletion in Windows?",
    shortAnswer: "Windows locks open files, causing `file.delete()` or rename operations to fail until the JVM process terminates.",
    explanation: "Unlike Linux which allows unlinking open files, Windows enforces mandatory file locking on active file handles.",
    hint: "Unclosed file scanners prevent file deletion on Windows.",
    level: "intermediate",
    codeExample: "// On Windows: file.delete() returns false if Scanner is still open!"
  },
  {
    question: "What is the return type of `Scanner.reset()` after a scanner is closed?",
    shortAnswer: "It throws `IllegalStateException` because `reset()` cannot be called on a closed scanner.",
    explanation: "All operations on closed scanners throw `IllegalStateException`.",
    hint: "Closed scanners reject all operations.",
    level: "basic",
    codeExample: "sc.close();\n// sc.reset(); // THROWS IllegalStateException"
  },
  {
    question: "Why should unit tests mock or wrap `Scanner` instead of binding directly to `System.in`?",
    shortAnswer: "To prevent tests from blocking for real keyboard input and to avoid closing `System.in` between test runs.",
    explanation: "Supplying test strings via `new Scanner(new StringReader(\"test input\"))` allows automated testing without touching the global keyboard stream.",
    hint: "Mock console inputs with in-memory string scanners in unit tests.",
    level: "advanced",
    codeExample: "Scanner testScanner = new Scanner(new StringReader(\"101 Swadeep\"));"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student fee audit system, how are transaction log files safely processed?",
    shortAnswer: "Using Try-With-Resources around `Scanner` to ensure all student fee ledger files in Indian Rupees (₹) are closed immediately.",
    explanation: "Guarantees that audit records are written, synced, and closed without file handle leaks.",
    hint: "Try-with-resources protects financial audit log integrity.",
    level: "basic",
    codeExample: "try (Scanner audit = new Scanner(new File(\"audit_log.txt\"))) { ... }"
  },
  {
    question: "What is the ultimate takeaway of Topic 18 for professional Java developers?",
    shortAnswer: "Always use Try-With-Resources for File and Stream Scanners to release OS handles, but treat `System.in` as a global shared resource that should never be closed prematurely.",
    explanation: "Disciplined resource management guarantees leak-free server microservices and rock-solid interactive console applications.",
    hint: "Try-with-resources for files, single shared instance for System.in.",
    level: "basic",
    codeExample: "// Summary: Try-with-resources for files, shared instance for System.in"
  },
  {
    question: "What milestone does completing Topic 18 represent in the Java Core roadmap?",
    shortAnswer: "It marks the complete mastery of Module 001_002: Java Syntax, Variables, Literals, Data Types, Constants, and Console I/O!",
    explanation: "You are now fully prepared to advance to Module 001_003: Java Operators, Expressions, Precedence, and Type Casting.",
    hint: "Module 001_002 is 100% completed!",
    level: "basic",
    codeExample: "// Next: Module 001_003 Operators & Expressions"
  }
];

export default questions;
