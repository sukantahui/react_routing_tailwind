const questions = [
  {
    question: "Why must the main() method in Java be declared `public`?",
    shortAnswer: "So the external JVM runtime environment (located outside the class package) can invoke it.",
    explanation: "If `main` were private or package-private, the JVM's launcher would be blocked by access modifier checks, throwing an IllegalAccessException or NoSuchMethodError.",
    hint: "Accessible from outside the class and package.",
    level: "basic",
    codeExample: "public static void main(String[] args)"
  },
  {
    question: "Why must the main() method be declared `static`?",
    shortAnswer: "To allow the JVM to call `ClassName.main()` directly without allocating heap memory or instantiating an object.",
    explanation: "If main were non-static, the JVM would have to create an instance with `new ClassName()`, which might fail if constructors are private or require arguments.",
    hint: "Can be invoked without creating an instance.",
    level: "basic",
    codeExample: "// JVM invokes: App.main(new String[0]);"
  },
  {
    question: "Why is the return type of main() `void` instead of `int` (as in C/C++)?",
    shortAnswer: "Because Java programs terminate via JVM lifecycle control and communicate exit status via System.exit(int).",
    explanation: "In C, `main` returns an exit code. In Java, `main` returns nothing (void); process exit codes are handled explicitly via `System.exit(0)` (success) or `System.exit(1)` (error).",
    hint: "Process exit codes use System.exit().",
    level: "basic",
    codeExample: "System.exit(0); // Standard exit code for success"
  },
  {
    question: "What is `String[] args` in the main method signature?",
    shortAnswer: "An array of String arguments passed from the command line when launching the application.",
    explanation: "When running `java App input.txt 500`, `args[0]` receives `\"input.txt\"` and `args[1]` receives `\"500\"`.",
    hint: "Command-line arguments array.",
    level: "basic",
    codeExample: "// java App Barrackpore Shyamnagar\n// args[0] = \"Barrackpore\", args[1] = \"Shyamnagar\""
  },
  {
    question: "Is `args` null if no command-line arguments are passed?",
    shortAnswer: "No! The JVM passes an empty String array with a length of 0 (`args.length == 0`), never null.",
    explanation: "Calling `args.length` when running `java App` with no arguments safely returns `0` and does not throw NullPointerException.",
    hint: "Non-null empty array (length 0).",
    level: "basic",
    codeExample: "if (args.length == 0) {\n    System.out.println(\"No arguments provided.\");\n}"
  },
  {
    question: "Is `public static void main(String... args)` a valid entry point in Java?",
    shortAnswer: "Yes! Varargs (`String...`) is compiled to `String[]` bytecode and is 100% recognized by the JVM launcher.",
    explanation: "Varargs syntax (introduced in Java 5) is desugared to an array type in bytecode, making it an identical valid entry point signature.",
    hint: "Varargs is syntactic sugar for arrays.",
    level: "intermediate",
    codeExample: "public static void main(String... args) { System.out.println(\"Valid Main!\"); }"
  },
  {
    question: "Is `static public void main(String[] args)` valid syntax in Java?",
    shortAnswer: "Yes! The order of modifier keywords (`public` and `static`) can be legally swapped.",
    explanation: "The Java Language Specification does not enforce an order among method modifiers. Both `public static` and `static public` are identical in bytecode.",
    hint: "Modifier order is flexible.",
    level: "basic",
    codeExample: "static public void main(String[] args) { System.out.println(\"Valid!\"); }"
  },
  {
    question: "What happens if you name the argument array something other than `args` (e.g. `String[] parameters`)?",
    shortAnswer: "It works perfectly! `args` is merely an identifier name chosen by convention.",
    explanation: "The JVM cares only about the parameter type `String[]`, not the parameter identifier name.",
    hint: "args is just a variable identifier name.",
    level: "basic",
    codeExample: "public static void main(String[] myParameters) { }"
  },
  {
    question: "What happens at runtime if a class has `public void main(String[] args)` (omitting `static`)?",
    shortAnswer: "It compiles fine, but launching `java ClassName` produces a runtime error: 'Main method is not static in class...'.",
    explanation: "The compiler considers it a valid instance method, but the JVM launcher rejects it as the application entry point.",
    hint: "NoSuchMethodError / Main method not static.",
    level: "intermediate",
    codeExample: "// Runtime error: Error: Main method is not static in class ClassName"
  },
  {
    question: "Can the main method be declared `final` or `synchronized`?",
    shortAnswer: "Yes! Adding `final`, `synchronized`, or `strictfp` to `public static void main(String[] args)` is 100% valid.",
    explanation: "The JVM checks for `public`, `static`, `void`, and `String[]`. Extra modifiers like `final` or `synchronized` are permitted.",
    hint: "Additional legal method modifiers.",
    level: "advanced",
    codeExample: "public static final synchronized void main(String[] args) { }"
  },
  {
    question: "What is the new 'Instance Main Methods' feature introduced as preview in Java 21+ (JEP 445 / 463 / 477)?",
    shortAnswer: "Allows beginners to write simplified entry points like `void main()` without `public static` or `String[] args` in unnamed classes.",
    explanation: "To ease onboarding for beginner students, modern Java allows `void main() { System.out.println(\"Hello!\"); }` without boilerplate class wrappers.",
    hint: "Beginner-friendly simplified entry points in modern Java.",
    level: "expert",
    codeExample: "// Modern Java: void main() { println(\"Hello from Barrackpore!\"); }"
  },
  {
    question: "Can you overload the `main` method in a Java class?",
    shortAnswer: "Yes, you can write multiple overloaded main methods with different parameter types.",
    explanation: "You can write `main(int x)`, `main(String s)`, but the JVM will only invoke `main(String[] args)` as the initial launcher.",
    hint: "Standard method overloading rules apply.",
    level: "basic",
    codeExample: "public static void main(String[] args) { main(42); }\npublic static void main(int number) { System.out.println(number); }"
  },
  {
    question: "Can you explicitly invoke the `main` method from another method in code?",
    shortAnswer: "Yes, `main` is just a standard static method and can be called explicitly: `OtherClass.main(new String[]{\"arg\"})`.",
    explanation: "You can call `main` recursively or from other classes like any other static method.",
    hint: "It is a standard static method callable in code.",
    level: "intermediate",
    codeExample: "public class Runner {\n    public static void run() {\n        MainApp.main(new String[]{\"test\"});\n    }\n}"
  },
  {
    question: "What happens if a program executes `main()` and launches a background daemon thread vs a non-daemon thread?",
    shortAnswer: "The JVM terminates when `main()` ends if only daemon threads remain; if non-daemon threads are active, the JVM stays running.",
    explanation: "The JVM will continue executing as long as at least one non-daemon user thread is alive, even after the main thread returns.",
    hint: "Daemon vs Non-Daemon thread termination rules.",
    level: "advanced",
    codeExample: "Thread t = new Thread(() -> doWork());\nt.setDaemon(false);\nt.start(); // Keeps JVM alive"
  },
  {
    question: "What is the exit code returned to the OS shell when a Java program finishes `main()` normally without exceptions?",
    shortAnswer: "0 (indicating standard successful termination).",
    explanation: "When `main()` exits and all non-daemon threads complete, the JVM returns status code 0 to the host operating system.",
    hint: "0 means success.",
    level: "basic",
    codeExample: "// Echo in shell on Linux/Mac: echo $? (prints 0)"
  },
  {
    question: "How do you pass arguments containing spaces into `String[] args` from the command line?",
    shortAnswer: "Enclose the argument in double quotes (e.g. `java App \"Sukanta Hui\" Barrackpore`).",
    explanation: "Spaces act as argument delimiters in terminal shells. Wrapping text in quotes passes the entire string as a single array element.",
    hint: "Double quotes preserve whitespace in shell arguments.",
    level: "basic",
    codeExample: "// java App \"Barrackpore City\" 700120\n// args[0] = \"Barrackpore City\", args[1] = \"700120\""
  },
  {
    question: "Why is `String` chosen as the parameter type for `args` rather than `Object[]` or `int[]`?",
    shortAnswer: "String is the universal text representation from which any data type (int, double, boolean) can be parsed.",
    explanation: "Command-line shells pass characters. Numbers and booleans are parsed via `Integer.parseInt(args[0])` or `Boolean.parseBoolean(args[1])`.",
    hint: "Universal character format.",
    level: "basic",
    codeExample: "int port = Integer.parseInt(args[0]);"
  },
  {
    question: "What is the C-style array declaration variation for main: `public static void main(String args[])`?",
    shortAnswer: "It is valid syntax inherited from C/C++, but `String[] args` is the preferred Java idiom.",
    explanation: "Placing brackets after the variable name (`args[]`) is legally permitted by javac, though `String[] args` (brackets on the type) is standard Java practice.",
    hint: "Legal C-style syntax, though brackets on type is preferred.",
    level: "intermediate",
    codeExample: "public static void main(String args[]) { }"
  },
  {
    question: "Can an interface declare a `public static void main(String[] args)` method in Java 8+?",
    shortAnswer: "Yes! Since Java 8, interfaces can contain static methods, including a runnable main method.",
    explanation: "You can execute an interface directly from terminal: `java InterfaceName` if it contains a valid static main method.",
    hint: "Static interface methods added in Java 8.",
    level: "advanced",
    codeExample: "public interface RunnableInterface {\n    static void main(String[] args) {\n        System.out.println(\"Running from interface!\");\n    }\n}"
  },
  {
    question: "Can an `enum` declare and execute a `public static void main(String[] args)` method?",
    shortAnswer: "Yes! An enum is a specialized class and can contain a standard main method executed directly by the JVM.",
    explanation: "Enums compile to standard class files and can be launched from the terminal just like any normal class.",
    hint: "Enums are specialized classes.",
    level: "intermediate",
    codeExample: "public enum Color {\n    RED, GREEN, BLUE;\n    public static void main(String[] args) {\n        System.out.println(Color.RED);\n    }\n}"
  },
  {
    question: "What happens if an unhandled exception is thrown inside `main()`?",
    shortAnswer: "The JVM's default UncaughtExceptionHandler prints the stack trace to System.err and terminates the main thread with non-zero exit code.",
    explanation: "The thread unwinds, stack frames are popped, and the error details are output to standard error.",
    hint: "Default uncaught exception handler.",
    level: "basic",
    codeExample: "public static void main(String[] args) {\n    throw new RuntimeException(\"Fatal crash in main\");\n}"
  },
  {
    question: "How do you programmatically configure a custom UncaughtExceptionHandler for the main thread?",
    shortAnswer: "`Thread.currentThread().setUncaughtExceptionHandler((thread, throwable) -> { ... });`.",
    explanation: "Allows logging errors to files or alerting monitoring systems before process termination.",
    hint: "setUncaughtExceptionHandler on Thread.",
    level: "advanced",
    codeExample: "Thread.currentThread().setUncaughtExceptionHandler((t, e) -> {\n    System.err.println(\"Logged crash: \" + e.getMessage());\n});"
  },
  {
    question: "What is a 'Shutdown Hook' registered from main?",
    shortAnswer: "An initialized but unstarted thread invoked automatically by the JVM when the application is shutting down.",
    explanation: "`Runtime.getRuntime().addShutdownHook(new Thread(...))` allows performing cleanup (closing database pools, flushing logs) even on SIGINT (Ctrl+C).",
    hint: "Graceful shutdown handler.",
    level: "advanced",
    codeExample: "Runtime.getRuntime().addShutdownHook(new Thread(() -> {\n    System.out.println(\"Graceful shutdown cleanup completed!\");\n}));"
  },
  {
    question: "What is the difference between passing program arguments vs passing JVM system properties on the command line?",
    shortAnswer: "System properties use `-Dkey=val` before the class name; program arguments are passed after the class name.",
    explanation: "`-Denv=prod` is parsed by the JVM into `System.getProperty(\"env\")`; parameters after `ClassName` land in `String[] args`.",
    hint: "java [JVM_FLAGS] ClassName [PROGRAM_ARGS]",
    level: "intermediate",
    codeExample: "// java -Ddb.url=jdbc:mysql://localhost App user1 user2\n// JVM prop: db.url; args[0] = \"user1\""
  },
  {
    question: "Can `main` throw checked exceptions in its `throws` clause (e.g. `public static void main(String[] args) throws Exception`)?",
    shortAnswer: "Yes! Declaring `throws Exception` allows bypassing try-catch boilerplate in simple CLI utilities and tests.",
    explanation: "If a checked exception is thrown, it bubbles up to the JVM's uncaught exception handler without compiler errors.",
    hint: "throws Exception is legally allowed on main.",
    level: "basic",
    codeExample: "public static void main(String[] args) throws IOException, InterruptedException { }"
  },
  {
    question: "How does the JVM locate the main method when executing an executable JAR (`java -jar app.jar`)?",
    shortAnswer: "It reads the `Main-Class: com.example.MainApp` attribute inside the JAR's `META-INF/MANIFEST.MF` file.",
    explanation: "The JAR manifest file declares the entry point class containing `public static void main(String[] args)`.",
    hint: "Main-Class manifest header.",
    level: "intermediate",
    codeExample: "// MANIFEST.MF:\n// Main-Class: com.codernaccotax.banking.App"
  },
  {
    question: "Why is `main` executed by a thread named 'main' by default in the JVM?",
    shortAnswer: "The JVM runtime creates an initial user thread named 'main' within the 'main' ThreadGroup to launch the entry point.",
    explanation: "`Thread.currentThread().getName()` inside the entry point returns `\"main\"`.",
    hint: "Initial thread is named 'main'.",
    level: "basic",
    codeExample: "System.out.println(Thread.currentThread().getName()); // Prints \"main\""
  },
  {
    question: "Can a class have `private static void main(String[] args)` and when would that be used?",
    shortAnswer: "Yes, for internal testing or helper invocations within the same class, but the JVM launcher cannot start the application.",
    explanation: "It is a valid private static method, but running `java ClassName` will report that the main method is not public.",
    hint: "Valid method, but invalid external JVM entry point.",
    level: "intermediate",
    codeExample: "// private static void main -> Cannot be launched by JVM from outside."
  },
  {
    question: "What is the return value of `System.getProperty(\"sun.java.command\")` inside main?",
    shortAnswer: "The full command-line invocation string including the main class name and all passed arguments.",
    explanation: "HotSpot JVM stores the exact launch string in this internal system property.",
    hint: "Internal property recording the launch command.",
    level: "expert",
    codeExample: "System.out.println(System.getProperty(\"sun.java.command\"));"
  },
  {
    question: "Why is dissecting the main method word-by-word the first great milestone for every Java student?",
    shortAnswer: "Because it instantly introduces the core concepts of access control, memory lifecycle, data types, and JVM execution.",
    explanation: "By mastering `public`, `static`, `void`, `main`, and `String[] args`, a student transitions from rote memorization to true architectural comprehension.",
    hint: "The gateway to architectural thinking.",
    level: "basic",
    codeExample: "// Understanding main() unlocks the entire Java object and execution model."
  }
];

export default questions;
