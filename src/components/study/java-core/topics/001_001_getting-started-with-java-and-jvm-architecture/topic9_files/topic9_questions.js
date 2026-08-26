const questions = [
  {
    question: "What is an Integrated Development Environment (IDE) in the context of Java software engineering?",
    shortAnswer: "A software application that unifies a source code editor, compiler, build automation, debugger, and version control.",
    explanation: "An IDE streamlines development by providing real-time syntax checking, automated refactoring, code navigation, and graphical debugging.",
    hint: "Editor + Compiler + Debugger + Build tools combined.",
    level: "basic",
    codeExample: "// IntelliJ IDEA, Eclipse, and VS Code are the primary Java IDEs."
  },
  {
    question: "Why is IntelliJ IDEA widely considered the industry standard IDE for professional Java development?",
    shortAnswer: "Because of its advanced static code analysis, intelligent refactoring tools, and deep framework integration.",
    explanation: "IntelliJ IDEA's contextual indexing allows instant code navigation, smart completions, and early detection of potential runtime bugs (like NPEs) before execution.",
    hint: "Intelligent code analysis and refactoring by JetBrains.",
    level: "basic",
    codeExample: "// Features: Smart completion, safe refactoring, built-in Git/Maven."
  },
  {
    question: "What is the difference between IntelliJ IDEA Community Edition and Ultimate Edition?",
    shortAnswer: "Community is free/open-source for Java SE and Android; Ultimate is commercial, adding Spring, Jakarta EE, database tools, and frontend support.",
    explanation: "Community Edition has everything needed for Core Java and Android. Ultimate adds enterprise enterprise framework support (Spring Boot, Kubernetes, SQL).",
    hint: "Free open-source (Community) vs Enterprise commercial (Ultimate).",
    level: "intermediate",
    codeExample: "// Community Edition is 100% sufficient for mastering Core Java."
  },
  {
    question: "What is the Eclipse Compiler for Java (ECJ) and how does it differ from standard javac?",
    shortAnswer: "ECJ is an incremental compiler that compiles code as you type and can run classes even if some methods contain compile errors.",
    explanation: "Unlike javac which requires a clean batch pass, ECJ compiles modified methods incrementally and replaces error-containing methods with runtime exception stubs.",
    hint: "Incremental compilation in Eclipse.",
    level: "advanced",
    codeExample: "// Eclipse can execute a class even if unrelated methods have errors."
  },
  {
    question: "How does Visual Studio Code support Java development?",
    shortAnswer: "Through the 'Extension Pack for Java' powered by the Eclipse JDT Language Server (LSP).",
    explanation: "Microsoft and Red Hat collaborated on language server extensions that provide code completion, debugging, JUnit test runners, and Maven integration in VS Code.",
    hint: "Language Server Protocol (LSP) extension pack.",
    level: "basic",
    codeExample: "// VS Code extension: vscjava.vscode-java-pack"
  },
  {
    question: "What unique pedagogical feature makes BlueJ popular in schools and beginner courses?",
    shortAnswer: "Visual interactive UML boxes that allow creating objects and invoking methods directly without writing a main() method.",
    explanation: "BlueJ visually diagrams classes and object instances on an interactive workbench, helping students physically visualize instantiation and encapsulation.",
    hint: "Interactive object workbench without main().",
    level: "basic",
    codeExample: "// Right-click Class -> new Student() -> Right-click Object -> getAge()"
  },
  {
    question: "What is the 'Live Template' shortcut in IntelliJ IDEA to generate the main method?",
    shortAnswer: "Type `psvm` (or `main`) followed by Tab or Enter.",
    explanation: "IntelliJ expands `psvm` into `public static void main(String[] args) { }` instantly.",
    hint: "psvm stands for public static void main.",
    level: "basic",
    codeExample: "// Type: psvm + Tab"
  },
  {
    question: "What is the 'Live Template' shortcut in IntelliJ IDEA to generate `System.out.println()`?",
    shortAnswer: "Type `sout` followed by Tab or Enter.",
    explanation: "`sout` generates `System.out.println()`; `soutv` prints the current variable with its name and value.",
    hint: "sout stands for System.out.println.",
    level: "basic",
    codeExample: "// Type: sout + Tab"
  },
  {
    question: "What keyboard shortcut triggers intelligent intention actions and quick-fixes in IntelliJ IDEA?",
    shortAnswer: "`Alt + Enter` (Windows/Linux) or `Opt + Enter` (macOS).",
    explanation: "`Alt + Enter` suggests automated fixes for syntax errors, generates missing methods, imports classes, and converts loops to streams.",
    hint: "The universal quick-fix key combination.",
    level: "basic",
    codeExample: "// Press Alt + Enter on red squiggly error for instant fix."
  },
  {
    question: "What is the Project SDK setting in IntelliJ IDEA?",
    shortAnswer: "The configured JDK installation used by the IDE to compile and run the project.",
    explanation: "Configured via File -> Project Structure -> Project -> SDK, this tells the IDE which JDK (e.g. JDK 21) to target for language features and class libraries.",
    hint: "File -> Project Structure -> SDK.",
    level: "basic",
    codeExample: "// Project SDK: OpenJDK 21 (Temurin)"
  },
  {
    question: "How do you set a breakpoint in a Java IDE debugger?",
    shortAnswer: "Click in the left gutter next to the desired line of code (or press Ctrl+F8 / Cmd+F8).",
    explanation: "A red dot appears in the gutter. When launched in Debug mode (Shift+F9), execution pauses at that line to allow inspecting variables and call stacks.",
    hint: "Click the left gutter next to the line number.",
    level: "basic",
    codeExample: "// Execution suspends at breakpoint for variable inspection."
  },
  {
    question: "What is the difference between 'Step Over' (F8) and 'Step Into' (F7) during debugging?",
    shortAnswer: "'Step Over' executes the current line without entering method bodies; 'Step Into' jumps inside the method being called.",
    explanation: "Use Step Over to advance line-by-line; use Step Into when you want to trace the internal logic of a specific method call.",
    hint: "Execute line vs Dive into method.",
    level: "intermediate",
    codeExample: "// Step Over: skips over helper(); Step Into: enters helper() body."
  },
  {
    question: "What is 'Safe Delete' refactoring in IntelliJ IDEA?",
    shortAnswer: "A refactoring check that searches the entire codebase to verify a class or method is not used anywhere before deleting it.",
    explanation: "If usages are found, the IDE warns the developer and lists the exact locations where deleting the member will break code.",
    hint: "Verifies zero references before deleting.",
    level: "intermediate",
    codeExample: "// Shortcut: Alt + Delete (Safe Delete refactoring)"
  },
  {
    question: "What is 'Extract Method' refactoring in IntelliJ IDEA?",
    shortAnswer: "An automated refactoring that turns a selected block of code into a private helper method with correct parameters and return types.",
    explanation: "`Ctrl + Alt + M` analyzes selected code, detects input variables and return values, and creates a clean modular method automatically.",
    hint: "Extract code block into a separate method.",
    level: "intermediate",
    codeExample: "// Shortcut: Ctrl + Alt + M (Extract Method)"
  },
  {
    question: "What is 'Rename Refactoring' in modern Java IDEs?",
    shortAnswer: "Renaming a class, method, or variable across all project files, comments, and XML configurations simultaneously (`Shift + F6`).",
    explanation: "`Shift + F6` renames the symbol across all call sites, ensuring you never miss a reference or cause broken links.",
    hint: "Shift + F6 for universal rename.",
    level: "basic",
    codeExample: "// Shift + F6: Renames symbol everywhere safely."
  },
  {
    question: "What is the purpose of the `.idea` folder and `.iml` files in an IntelliJ project?",
    shortAnswer: "They store project-specific IDE configuration settings, run configurations, and module dependency mappings.",
    explanation: "These internal metadata files manage how IntelliJ organizes your workspace. They are typically added to `.gitignore` when using Maven/Gradle.",
    hint: "IntelliJ workspace metadata.",
    level: "intermediate",
    codeExample: "// Added to .gitignore: .idea/ and *.iml"
  },
  {
    question: "What is the purpose of the `.project` and `.classpath` files in an Eclipse workspace?",
    shortAnswer: "Eclipse metadata files describing project build paths, linked resources, and compiler settings.",
    explanation: "Eclipse uses these XML descriptors to manage source folders, output folders, and external JAR dependencies.",
    hint: "Eclipse project configuration files.",
    level: "intermediate",
    codeExample: "// Added to .gitignore: .project and .classpath"
  },
  {
    question: "How does an IDE integrate with Apache Maven (`pom.xml`)?",
    shortAnswer: "The IDE reads the `pom.xml`, downloads declared dependencies from Maven Central automatically, and configures project build paths.",
    explanation: "When you add a dependency (e.g. `mysql-connector-j`) to `pom.xml`, the IDE downloads the JAR and enables immediate autocomplete.",
    hint: "Automatic dependency resolution from pom.xml.",
    level: "basic",
    codeExample: "// IDE automatically detects and syncs pom.xml changes."
  },
  {
    question: "What is 'Code Formatting' shortcut in IntelliJ IDEA?",
    shortAnswer: "`Ctrl + Alt + L` (Windows/Linux) or `Cmd + Opt + L` (macOS).",
    explanation: "Instantly re-indents code, aligns braces, cleans spacing, and wraps long lines according to Java coding style standards.",
    hint: "Format code shortcut.",
    level: "basic",
    codeExample: "// Ctrl + Alt + L formats the entire active file."
  },
  {
    question: "What is 'Optimize Imports' shortcut in IntelliJ IDEA?",
    shortAnswer: "`Ctrl + Alt + O` (Windows/Linux) or `Cmd + Opt + O` (macOS).",
    explanation: "Removes unused `import` statements and sorts active imports alphabetically according to project guidelines.",
    hint: "Cleans up unused imports.",
    level: "basic",
    codeExample: "// Ctrl + Alt + O removes dead imports."
  },
  {
    question: "What is 'Structural Search and Replace' in IntelliJ IDEA?",
    shortAnswer: "An advanced feature that searches code patterns by AST syntax structure rather than regular text strings.",
    explanation: "Allows searching for patterns like 'all try blocks without catch' or 'all calls to System.currentTimeMillis()' across thousands of files.",
    hint: "Syntax-aware pattern matching across projects.",
    level: "expert",
    codeExample: "// Search AST patterns across large codebases."
  },
  {
    question: "What is a 'Run Configuration' in a Java IDE?",
    shortAnswer: "A saved profile specifying the Main class, JVM flags (-Xmx), program arguments, and environment variables for launching an app.",
    explanation: "Run configurations allow toggling between running local tests, CLI arguments, or production simulation flags with a single click.",
    hint: "Saved launch parameters for an application.",
    level: "intermediate",
    codeExample: "// Run Configuration: MainClass=App, VM Options=-Xmx2g, Args=--debug"
  },
  {
    question: "Why should beginners understand command-line compilation (javac/java) before relying completely on IDEs?",
    shortAnswer: "To understand classpath mechanics, package structures, and compiler behavior without IDE abstraction hiding the basics.",
    explanation: "Relying blindly on the green 'Play' button prevents beginners from understanding how the JVM actually locates classes, leading to confusion in CI/CD pipelines.",
    hint: "Understand the fundamentals before using IDE automations.",
    level: "basic",
    codeExample: "// Master javac in terminal first -> Excel in IDEs forever."
  },
  {
    question: "What is the 'Evaluate Expression' tool in the IDE Debugger (`Alt + F8`)?",
    shortAnswer: "An interactive window that evaluates arbitrary Java code snippets and method calls in the context of the paused breakpoint.",
    explanation: "Allows calling methods, inspecting complex object graphs, and testing hypotheses live without restarting the debug session.",
    hint: "Evaluate expressions while paused at a breakpoint.",
    level: "advanced",
    codeExample: "// Alt + F8: Evaluate 'list.stream().filter(...).count()' live at breakpoint!"
  },
  {
    question: "What is 'HotSwap' (Code Hotswapping) during an active debug session in IntelliJ IDEA?",
    shortAnswer: "Reloading modified method bytecode into the running JVM without restarting the application.",
    explanation: "If you fix a bug inside a method while debugging, compiling the class allows the JVM to update the method in-place via JVM TI.",
    hint: "Update code live without restarting debug session.",
    level: "advanced",
    codeExample: "// Compile -> Reload Changed Classes live!"
  },
  {
    question: "What is the 'Hierarchy Tool Window' (`Ctrl + H`) in IntelliJ IDEA?",
    shortAnswer: "Displays the complete inheritance tree (superclasses and subclasses) of the selected class.",
    explanation: "Helps navigate large object hierarchies, showing all classes extending or implementing the active type.",
    hint: "Displays class inheritance hierarchies.",
    level: "intermediate",
    codeExample: "// Ctrl + H: Shows ArrayList -> AbstractList -> AbstractCollection -> Object"
  },
  {
    question: "What is the difference between 'Search Everywhere' (`Double Shift`) and 'Find in Files' (`Ctrl + Shift + F`) in IntelliJ?",
    shortAnswer: "`Double Shift` searches files, classes, symbols, and actions; `Ctrl + Shift + F` performs text search across file contents.",
    explanation: "Search Everywhere is the fastest way to jump to any class or setting; Find in Files scans file text directly.",
    hint: "Double Shift for universal symbol search.",
    level: "basic",
    codeExample: "// Double Shift: Jump to any class in milliseconds."
  },
  {
    question: "What is the Language Server Protocol (LSP) and how does it benefit editors like VS Code and Neovim?",
    shortAnswer: "A standard protocol that decouples language smarts (autocomplete, diagnostics) from the editor frontend.",
    explanation: "A single Java Language Server (Eclipse JDT LS) provides intelligent code analysis to VS Code, Sublime Text, Emacs, and Neovim.",
    hint: "Standardized protocol for language smarts in editors.",
    level: "expert",
    codeExample: "// Client (VS Code) <---LSP---> Server (Eclipse JDT LS)"
  },
  {
    question: "How do you configure Git version control inside IntelliJ IDEA?",
    shortAnswer: "Go to Git -> Clone (or VCS -> Enable Version Control), and use the built-in Commit tool window (`Alt + 0`).",
    explanation: "IntelliJ provides visual diff viewers, branch switchers, interactive rebasing, and merge conflict resolvers directly in the UI.",
    hint: "Built-in Git GUI in IntelliJ.",
    level: "basic",
    codeExample: "// Integrated visual Git commits, diffs, and branch management."
  },
  {
    question: "How does mastering an IDE transform a developer's productivity?",
    shortAnswer: "It eliminates mechanical boilerplate typing, prevents syntax errors in real-time, and enables instant project-wide refactoring.",
    explanation: "A developer who knows IDE shortcuts and debugging tools can navigate large million-line codebases, fix bugs, and refactor architecture in minutes rather than hours.",
    hint: "Speed, accuracy, and effortless code navigation.",
    level: "basic",
    codeExample: "// Keyboard shortcuts + Smart IDE = 10x Developer Productivity."
  }
];

export default questions;
