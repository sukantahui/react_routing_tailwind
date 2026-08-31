const questions = [
  {
    question: "What is the exact syntax for compiling a Java source file from the command line?",
    shortAnswer: "`javac FileName.java` (using the full file name with .java extension).",
    explanation: "The `javac` compiler takes the source file path with the `.java` extension and outputs a corresponding `.class` bytecode file.",
    hint: "javac requires the .java file extension.",
    level: "basic",
    codeExample: "// Terminal: javac HelloWorld.java"
  },
  {
    question: "What is the exact syntax for running a compiled Java class from the command line?",
    shortAnswer: "`java ClassName` (using the class name WITHOUT any extension).",
    explanation: "The `java` command expects the fully-qualified class name. Appending `.class` (e.g. `java HelloWorld.class`) results in `ClassNotFoundException`.",
    hint: "Do NOT include .class extension.",
    level: "basic",
    codeExample: "// Correct: java HelloWorld\n// Wrong: java HelloWorld.class"
  },
  {
    question: "What is the purpose of the `-d` flag in the `javac` compiler command?",
    shortAnswer: "It specifies the destination directory where compiled .class files and package folders should be placed.",
    explanation: "Running `javac -d bin src/com/example/App.java` cleanly places the compiled `App.class` inside `bin/com/example/App.class`, keeping source and binary folders separate.",
    hint: "Destination directory flag.",
    level: "basic",
    codeExample: "// Command: javac -d bin src/App.java"
  },
  {
    question: "What is the purpose of the `-cp` (or `-classpath`) flag in the `java` execution command?",
    shortAnswer: "It specifies the directory path or JAR files where the JVM ClassLoader should look for compiled classes.",
    explanation: "If compiled classes reside inside a `bin/` or `target/` directory, running `java -cp bin com.example.App` tells the JVM to treat `bin/` as the root of the class hierarchy.",
    hint: "Classpath search root directory.",
    level: "basic",
    codeExample: "// Command: java -cp bin com.codernaccotax.App"
  },
  {
    question: "What error occurs if you try to run a packaged class from inside its package directory (e.g. `cd com/example` and `java App`)?",
    shortAnswer: "`Error: Could not find or load main class App (wrong name: com/example/App)`.",
    explanation: "The JVM verifies that a class declared with `package com.example;` must be launched using its full name `com.example.App` from the classpath root.",
    hint: "Wrong name error due to running from inside package folder.",
    level: "intermediate",
    codeExample: "// Fix: cd back to root and run: java -cp . com.example.App"
  },
  {
    question: "How does single-file source code execution work in Java 11+ (`java HelloWorld.java`)?",
    shortAnswer: "It compiles the source file in memory and executes it directly without creating a `.class` file on disk.",
    explanation: "Introduced in JEP 330, this feature allows running small scripts and learning exercises with a single command without separate `javac` compilation.",
    hint: "Java 11 single-file launcher.",
    level: "basic",
    codeExample: "// Command in Java 11+: java HelloWorld.java"
  },
  {
    question: "How do you pass command-line arguments to a Java application from the terminal?",
    shortAnswer: "List arguments separated by spaces after the class name: `java App arg1 arg2 \"arg 3\"`.",
    explanation: "The JVM packs these parameters into the `String[] args` array passed to the `main()` method.",
    hint: "Arguments follow the class name.",
    level: "basic",
    codeExample: "// Command: java -cp bin com.example.App Barrackpore Naihati"
  },
  {
    question: "How do you compile multiple Java source files across different packages in one command?",
    shortAnswer: "Use wildcard expansion or pass a file list: `javac -d bin src/**/*.java` or `javac -d bin @sources.txt`.",
    explanation: "Passing `@sources.txt` containing a list of all source file paths compiles large multi-module projects in a single `javac` invocation.",
    hint: "Source file list argument (@sources.txt).",
    level: "intermediate",
    codeExample: "// Command: javac -d bin @sources.txt"
  },
  {
    question: "How do you include multiple JAR files in the classpath on Windows vs Linux/macOS?",
    shortAnswer: "Use semicolons (`;`) on Windows: `-cp \"lib/*;bin\"`; use colons (`:`) on Linux/macOS: `-cp \"lib/*:bin\"`.",
    explanation: "Windows uses semicolons as the system path separator, whereas Unix-like operating systems use colons.",
    hint: "Windows = ; (semicolon) | Linux/Mac = : (colon).",
    level: "intermediate",
    codeExample: "// Windows: java -cp \"bin;lib/driver.jar\" App\n// Linux: java -cp \"bin:lib/driver.jar\" App"
  },
  {
    question: "What does the `-Xlint:all` flag in `javac` do?",
    shortAnswer: "It enables all optional compiler warnings (deprecation, raw types, unchecked casts, fallthrough in switch).",
    explanation: "Using `-Xlint:all` helps developers write clean, robust code by flagging deprecated API usage and unchecked generic operations.",
    hint: "Enables comprehensive compiler warnings.",
    level: "intermediate",
    codeExample: "// Command: javac -Xlint:all src/App.java"
  },
  {
    question: "What does the `-Werror` flag in `javac` do?",
    shortAnswer: "It treats all compiler warnings as fatal compilation errors, halting the build.",
    explanation: "Enterprise CI/CD pipelines use `-Werror` to enforce zero-warning code standards across engineering teams.",
    hint: "Warnings become errors.",
    level: "advanced",
    codeExample: "// Command: javac -Werror -Xlint:all src/App.java"
  },
  {
    question: "How do you run an executable JAR file from the command line?",
    shortAnswer: "`java -jar application.jar`.",
    explanation: "The JVM reads the `Main-Class` entry from `META-INF/MANIFEST.MF` inside the JAR and executes that class's `main()` method.",
    hint: "java -jar flag.",
    level: "basic",
    codeExample: "// Command: java -jar target/banking-service.jar"
  },
  {
    question: "How do you create an executable JAR file using the `jar` command in terminal?",
    shortAnswer: "`jar cvfe myapp.jar com.example.Main -C bin .`.",
    explanation: "Flags: `c` (create), `v` (verbose), `f` (file name), `e` (entry point main class), `-C bin .` (change directory to `bin` and include all classes).",
    hint: "jar cvfe ArchiveName MainClass -C bin .",
    level: "advanced",
    codeExample: "// Command: jar cvfe App.jar com.codernaccotax.App -C bin ."
  },
  {
    question: "How do you pass JVM memory configuration flags when launching a Java program?",
    shortAnswer: "Place JVM flags (e.g. `-Xms2g -Xmx4g`) before the class name: `java -Xms2g -Xmx4g -cp bin App`.",
    explanation: "Arguments before the class name configure the JVM; arguments after the class name are passed to `String[] args`.",
    hint: "JVM flags come BEFORE the class name.",
    level: "intermediate",
    codeExample: "// Command: java -Xmx2g -cp bin com.example.App"
  },
  {
    question: "How do you pass System Properties (`-Dkey=value`) from the command line?",
    shortAnswer: "Use `-DpropertyName=value` before the class name: `java -Denv=prod -cp bin App`.",
    explanation: "System properties are accessible inside Java via `System.getProperty(\"propertyName\")`.",
    hint: "-D flag defines System.getProperty values.",
    level: "intermediate",
    codeExample: "// Command: java -Ddb.port=3306 -cp bin com.example.App\n// Java: String port = System.getProperty(\"db.port\");"
  },
  {
    question: "What does the `javap` command do from the terminal?",
    shortAnswer: "It disassembles and inspects the compiled bytecode structure of a .class file.",
    explanation: "`javap -c ClassName` outputs the disassembled JVM bytecode instructions; `javap -v` shows verbose constant pool details.",
    hint: "Bytecode disassembler.",
    level: "basic",
    codeExample: "// Command: javap -c -p bin/com/example/App.class"
  },
  {
    question: "What happens if a Java file name on disk does not match the public class name during `javac` compilation?",
    shortAnswer: "Compilation error: `class ClassName is public, should be declared in a file named ClassName.java`.",
    explanation: "The Java compiler enforces strict case-sensitive matching between public class names and source file names.",
    hint: "Filename must match public class name.",
    level: "basic",
    codeExample: "// File: test.java with public class Test → Compile error!"
  },
  {
    question: "What is the role of the `-sourcepath` flag in `javac`?",
    shortAnswer: "It tells the compiler where to find dependent source files (.java) to compile automatically if needed.",
    explanation: "If `App.java` references `User.java`, `-sourcepath src` allows javac to automatically find and compile `User.java`.",
    hint: "Directory path for finding source files.",
    level: "intermediate",
    codeExample: "// Command: javac -sourcepath src -d bin src/App.java"
  },
  {
    question: "How do you enable JDWP remote debugging when launching a Java program from the command line?",
    shortAnswer: "`java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 -jar app.jar`.",
    explanation: "Opens a debugging socket on port 5005, allowing IntelliJ or Eclipse to attach and debug the running process remotely.",
    hint: "jdwp agent socket debugging flag.",
    level: "expert",
    codeExample: "// Enables remote debug port on 5005 for IDE debugger attachment."
  },
  {
    question: "What does the `java -version` command display?",
    shortAnswer: "The OpenJDK/Oracle JDK version number, release date, runtime environment name, and JVM engine build details.",
    explanation: "Example output: `openjdk version \"21.0.2\" 2024-01-16 LTS / OpenJDK 64-Bit Server VM`.",
    hint: "Displays JDK version and 64-bit VM details.",
    level: "basic",
    codeExample: "// Command: java -version"
  },
  {
    question: "What does the `javac -version` command display?",
    shortAnswer: "The version of the Java compiler installed on the system (e.g. `javac 21.0.2`).",
    explanation: "Confirms that the compiler matches the expected JDK development toolchain version.",
    hint: "Displays compiler version.",
    level: "basic",
    codeExample: "// Command: javac -version"
  },
  {
    question: "How do you view all active JVM startup options and flags for a running Java process?",
    shortAnswer: "Use `jcmd <PID> VM.flags` or `jcmd <PID> VM.command_line`.",
    explanation: "The `jcmd` utility queries the running JVM process for its active heap, garbage collector, and tuning parameters.",
    hint: "jcmd VM.flags diagnostic command.",
    level: "advanced",
    codeExample: "// Command: jcmd 54120 VM.flags"
  },
  {
    question: "What is the shebang (`#!/usr/bin/env java --source 21`) support in Java 11+ single-file scripts on Linux/macOS?",
    shortAnswer: "It allows making a Java source file directly executable like a Bash or Python script (`./script.java`).",
    explanation: "Placing `#!/usr/bin/env java --source 21` on line 1 and running `chmod +x script.java` allows executing Java scripts directly from terminal.",
    hint: "Unix shebang script execution for Java.",
    level: "advanced",
    codeExample: "// Line 1: #!/usr/bin/env java --source 21\n// Terminal: chmod +x Script.java && ./Script.java"
  },
  {
    question: "What is the difference between relative classpath (`-cp bin`) and absolute classpath (`-cp C:\\Project\\bin`)?",
    shortAnswer: "Relative classpath resolves from the current terminal working directory; absolute classpath resolves from the root drive.",
    explanation: "Relative paths are convenient for local execution; absolute paths prevent working-directory errors in background daemon scripts.",
    hint: "Working directory relative vs Fixed absolute path.",
    level: "basic",
    codeExample: "// Relative: java -cp bin App\n// Absolute: java -cp /var/app/bin App"
  },
  {
    question: "How do you redirect console output from a Java application to a text file in the command line?",
    shortAnswer: "Use the shell redirection operator `>` (e.g. `java -cp bin App > output.txt`).",
    explanation: "Standard output (`System.out`) is written to `output.txt`; error output (`System.err`) can be redirected via `2> error.log`.",
    hint: "Shell redirection with > and 2>.",
    level: "basic",
    codeExample: "// Command: java -cp bin com.example.App > log.txt 2> err.txt"
  },
  {
    question: "How do you pass pipe input to a Java program via standard input (System.in)?",
    shortAnswer: "Use the pipe operator `|` (e.g. `cat data.txt | java -cp bin App` or `type data.txt | java -cp bin App`).",
    explanation: "The text stream is read by `Scanner scanner = new Scanner(System.in)` inside the Java application.",
    hint: "Shell pipe | operator.",
    level: "basic",
    codeExample: "// Command: echo \"Swadeep\" | java -cp bin com.example.Greeter"
  },
  {
    question: "What is the purpose of the `--module-path` (or `-p`) flag in Java 9+?",
    shortAnswer: "Specifies directories containing compiled modular JARs or JMODs for the Java Platform Module System (JPMS).",
    explanation: "Replaces traditional classpath with strongly encapsulated module paths (`java -p mods -m com.example/com.example.Main`).",
    hint: "Modular path for Java 9+ modules.",
    level: "advanced",
    codeExample: "// Command: java -p mods -m com.codernaccotax.banking/com.codernaccotax.banking.App"
  },
  {
    question: "How do you compile with assertions enabled and run with assertions enabled?",
    shortAnswer: "Compilation enables assertions by default; runtime requires the `-ea` (enable assertions) flag: `java -ea -cp bin App`.",
    explanation: "In Java, `assert condition;` is disabled at runtime by default for speed unless `-ea` or `-enableassertions` is passed.",
    hint: "-ea flag enables runtime assertions.",
    level: "intermediate",
    codeExample: "// Command: java -ea -cp bin com.example.App"
  },
  {
    question: "What is the difference between `System.exit(0)` and `System.exit(1)` in command-line scripts?",
    shortAnswer: "0 signals success to the calling shell/CI-CD pipeline; non-zero (1, 2) signals failure.",
    explanation: "Build automation tools (like GitHub Actions) inspect the process exit code to determine if the build step succeeded or failed.",
    hint: "0 = Success, Non-Zero = Failure.",
    level: "basic",
    codeExample: "// Success: System.exit(0);\n// Failure: System.exit(1);"
  },
  {
    question: "Why does command-line fluency make you a stronger software engineer?",
    shortAnswer: "Because production servers, Docker containers, Kubernetes pods, and CI/CD pipelines execute Java exclusively through the CLI.",
    explanation: "Understanding terminal compilation and execution ensures you can deploy, debug, and automate Java microservices in real-world Linux cloud environments without an IDE.",
    hint: "Production cloud environments are 100% command-line driven.",
    level: "basic",
    codeExample: "// Terminal Mastery = Cloud & Production DevOps Fluency."
  }
];

export default questions;
