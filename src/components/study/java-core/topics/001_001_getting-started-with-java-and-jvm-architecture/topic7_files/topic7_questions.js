const questions = [
  {
    question: "What are the 5 major phases of the Java Compiler (javac) when transforming .java into .class?",
    shortAnswer: "Lexical Analysis (Scanner), Syntax Analysis (Parser/AST), Semantic Analysis (Type Checking), Desugaring, and Bytecode Generation.",
    explanation: "javac tokenizes text, builds an Abstract Syntax Tree, validates types and definite assignment, unwraps syntactic sugar, and generates binary bytecode.",
    hint: "Scan → Parse → Type Check → Desugar → Emit Bytecode.",
    level: "advanced",
    codeExample: "// javac phases: Lexer → Parser (AST) → Type Checker → Lowering → Gen (.class)"
  },
  {
    question: "What is an Abstract Syntax Tree (AST) in javac?",
    shortAnswer: "A hierarchical tree representation of the syntactic structure of Java source code.",
    explanation: "The parser builds the AST to represent packages, class hierarchies, method declarations, statements, and expressions as connected nodes.",
    hint: "Hierarchical tree structure of code elements.",
    level: "intermediate",
    codeExample: "// AST nodes: JCClassDecl, JCMethodDecl, JCVariableDecl, JCBinary"
  },
  {
    question: "What is 'Desugaring' (or Lowering) in the javac compiler pipeline?",
    shortAnswer: "The process of rewriting high-level syntax sugar (enhanced for loops, enums, generics) into baseline primitive Java bytecode.",
    explanation: "Desugaring converts modern syntax conveniences into simpler constructs that the JVM bytecode instruction set directly understands.",
    hint: "Converting syntactic sugar into low-level bytecode structures.",
    level: "advanced",
    codeExample: "// for(String s : list) → Rewritten to while(it.hasNext()) iterator loop."
  },
  {
    question: "How does javac implement Generics via 'Type Erasure' during compilation?",
    shortAnswer: "It replaces generic type parameters (T) with their upper bounds (or Object) and inserts explicit downcasts at call sites.",
    explanation: "Generic type arguments (`List<String>`) exist only at compile-time for static type verification. Bytecode contains raw types (`List`) with inserted checkcast instructions.",
    hint: "Compile-time safety with runtime erasure for backward compatibility.",
    level: "advanced",
    codeExample: "// Source: List<String> list;\n// Bytecode: List list + (String) list.get(i)"
  },
  {
    question: "What is Definite Assignment analysis performed during Semantic Analysis in javac?",
    shortAnswer: "A check that ensures local variables are guaranteed to be assigned a value before being read.",
    explanation: "Unlike instance fields which receive default zero/null values, local variables MUST be explicitly initialized before access, otherwise javac emits a compilation error.",
    hint: "Local variables must be initialized before reading.",
    level: "basic",
    codeExample: "int x;\n// System.out.println(x); → Compile error: variable x might not have been initialized!"
  },
  {
    question: "How does javac transform string concatenation with the '+' operator in modern Java (Java 9+)?",
    shortAnswer: "Using the `invokedynamic` opcode with StringConcatFactory (JEP 280) instead of chained StringBuilder calls.",
    explanation: "Pre-Java 9 used verbose `new StringBuilder().append()`. Modern Java delegates string concatenation to `invokedynamic`, allowing the JVM to optimize string construction at runtime.",
    hint: "invokedynamic with StringConcatFactory.",
    level: "expert",
    codeExample: "// Bytecode in Java 9+: invokedynamic #2, makeConcatWithConstants"
  },
  {
    question: "What is the binary structure of a compiled Java .class file?",
    shortAnswer: "Magic Number (0xCAFEBABE), Minor/Major Version, Constant Pool, Access Flags, This Class, Super Class, Interfaces, Fields, Methods, Attributes.",
    explanation: "The JVM specification dictates this rigid 10-part layout so that every certified JVM can parse class files deterministically.",
    hint: "The 10 standard sections of a .class file.",
    level: "expert",
    codeExample: "// First 4 bytes: 0xCAFEBABE, followed by version numbers (e.g. 65 for Java 21)."
  },
  {
    question: "What major version number corresponds to Java 21 in compiled .class bytecode files?",
    shortAnswer: "Major Version 65.",
    explanation: "Java versions increment major version numbers sequentially: Java 8 = 52, Java 11 = 55, Java 17 = 61, Java 21 = 65.",
    hint: "Java 8 is 52; add (Version - 8).",
    level: "intermediate",
    codeExample: "// Java 8 = 52, Java 11 = 55, Java 17 = 61, Java 21 = 65"
  },
  {
    question: "What does the `javap -c` command do when run against a .class file?",
    shortAnswer: "It disassembles the compiled bytecode into readable JVM assembly opcodes.",
    explanation: "`javap -c` displays the exact bytecode instructions (e.g. `iconst_1`, `istore_1`, `invokevirtual`) for each method in the class.",
    hint: "Bytecode disassembler command.",
    level: "basic",
    codeExample: "// Command: javap -c HelloWorld.class"
  },
  {
    question: "What does the `javap -v` (verbose) flag display in addition to bytecode opcodes?",
    shortAnswer: "The complete Constant Pool, Stack Depth limits, Local Variable Table (LVT), and line number tables.",
    explanation: "Verbose mode reveals the internal symbol indices and constant references used by the JVM execution engine.",
    hint: "Detailed internal metadata inspection.",
    level: "intermediate",
    codeExample: "// Command: javap -v HelloWorld.class"
  },
  {
    question: "How does javac translate an 'enhanced for loop' (for-each) over an array?",
    shortAnswer: "Into a standard indexed for-loop: `for (int i = 0; i < arr.length; i++)`.",
    explanation: "The compiler recognizes arrays and lowers the for-each syntax into an index-based counter loop, avoiding Iterator object creation.",
    hint: "Array for-each becomes standard index-based loop.",
    level: "intermediate",
    codeExample: "// for (int n : arr) → for (int i = 0; i < arr.length; i++) { int n = arr[i]; }"
  },
  {
    question: "How does javac translate an 'enhanced for loop' over an Iterable / Collection?",
    shortAnswer: "Into an explicit Iterator loop with `hasNext()` and `next()` calls.",
    explanation: "Any object implementing `java.lang.Iterable` is desugared into `Iterator it = collection.iterator(); while(it.hasNext()) { ... }`.",
    hint: "Uses the java.util.Iterator interface.",
    level: "basic",
    codeExample: "// for (String s : list) → Iterator it = list.iterator(); while(it.hasNext())"
  },
  {
    question: "What is Autoboxing and how is it desugared during compilation?",
    shortAnswer: "Automatic conversion of primitive types to wrapper objects via `Wrapper.valueOf()` (e.g. `Integer.valueOf(10)`).",
    explanation: "The compiler replaces `Integer num = 10;` with `Integer num = Integer.valueOf(10);` during the lowering phase.",
    hint: "Replaces assignment with Integer.valueOf() call.",
    level: "basic",
    codeExample: "// Source: Integer x = 50;\n// Bytecode: invokestatic java/lang/Integer.valueOf:(I)Ljava/lang/Integer;"
  },
  {
    question: "What is Unboxing and how is it desugared during compilation?",
    shortAnswer: "Automatic conversion of wrapper objects to primitives via method calls (e.g. `num.intValue()`).",
    explanation: "The compiler replaces `int val = num;` with `int val = num.intValue();`, which will throw NullPointerException if `num` is null.",
    hint: "Invokes .intValue(), .doubleValue(), etc.",
    level: "basic",
    codeExample: "// Source: int y = x;\n// Bytecode: invokevirtual java/lang/Integer.intValue:()I"
  },
  {
    question: "What happens when you compile a Java file containing an anonymous inner class?",
    shortAnswer: "javac generates a separate .class file named `OuterClass$1.class`.",
    explanation: "Every inner or anonymous class produces its own discrete binary `.class` file on disk with a `$` delimiter.",
    hint: "Check the files generated in the output directory.",
    level: "intermediate",
    codeExample: "// Compiling ButtonHandler.java generates ButtonHandler.class & ButtonHandler$1.class"
  },
  {
    question: "What is the role of the javac `-source` and `-target` compiler flags (or `--release`)?",
    shortAnswer: "They specify the Java source language version to accept and the target bytecode major version to emit.",
    explanation: "Using `--release 11` ensures that code is compiled to Java 11 bytecode and strictly checks against the Java 11 standard class library APIs.",
    hint: "Configuring backward-compatible compilation targets.",
    level: "intermediate",
    codeExample: "// Command: javac --release 11 App.java"
  },
  {
    question: "What is an Annotation Processor in the javac compilation lifecycle?",
    shortAnswer: "A compile-time plugin (JSR 269) that inspects annotations and generates new Java source or resource files.",
    explanation: "Libraries like Lombok and MapStruct hook into javac's Annotation Processing phase to generate getters, setters, and mappers before final bytecode emission.",
    hint: "Compile-time code generation via annotations.",
    level: "advanced",
    codeExample: "// Lombok uses Annotation Processors to generate bytecode at compile time."
  },
  {
    question: "What is the default constructor created by javac if no constructor is declared in a class?",
    shortAnswer: "A public/package-private no-argument constructor that calls `super()`.",
    explanation: "If a developer writes zero constructors, javac automatically synthesizes a default no-arg constructor that invokes the superclass default constructor.",
    hint: "Synthetic no-argument constructor.",
    level: "basic",
    codeExample: "// Synthesized: public MyClass() { super(); }"
  },
  {
    question: "What is the difference between compile-time constants (final static) and runtime variables in bytecode?",
    shortAnswer: "Compile-time constants are inlined directly into bytecode at call sites without querying the class at runtime.",
    explanation: "If `public static final int MAX = 100;`, javac replaces references to `MyClass.MAX` with the literal integer `100` (`bipush 100`) directly in bytecode.",
    hint: "Literal inlining by javac for static final primitives/Strings.",
    level: "advanced",
    codeExample: "// Inlined directly into calling bytecode."
  },
  {
    question: "What does the javac `-g` flag do?",
    shortAnswer: "It instructs the compiler to generate all debugging information (Local Variable Table, Line Numbers, Source File).",
    explanation: "Enabling `-g` includes variable names and line mappings in the `.class` file, making stack traces and debugger variable inspection readable.",
    hint: "Debug symbols flag in javac.",
    level: "intermediate",
    codeExample: "// Command: javac -g App.java"
  },
  {
    question: "What is a Synthetic method or field generated by javac?",
    shortAnswer: "A member created by the compiler that does not exist in the source code (e.g. access$000 for private inner class access).",
    explanation: "Synthetic members are generated to bridge JVM specification constraints, marked with the `ACC_SYNTHETIC` flag.",
    hint: "Compiler-generated helper bridge methods.",
    level: "expert",
    codeExample: "// Synthetic bridge methods enable private inner class access."
  },
  {
    question: "What is the difference between checked exception validation in javac vs runtime JVM?",
    shortAnswer: "Checked exception handling is enforced strictly by javac at compile-time; the JVM runtime treats all exceptions uniformly.",
    explanation: "At the bytecode level, the JVM makes no distinction between checked and unchecked exceptions. Checked exception enforcement is 100% a compiler-level contract.",
    hint: "Compile-time language check vs bytecode runtime behavior.",
    level: "advanced",
    codeExample: "// javac forces try-catch for IOException, but JVM bytecode executes throw uniformly."
  },
  {
    question: "What is the 'LineNumberTable' attribute in a compiled .class file?",
    shortAnswer: "A metadata table mapping bytecode instruction offsets to original source code line numbers.",
    explanation: "When an exception occurs, the JVM reads the LineNumberTable to print the exact source code line number (e.g. `App.java:42`) in the stack trace.",
    hint: "Maps bytecode offsets to source code lines for stack traces.",
    level: "intermediate",
    codeExample: "// LineNumberTable: line 10: 0, line 12: 8, line 15: 14"
  },
  {
    question: "What is the 'LocalVariableTable' (LVT) attribute in a .class file?",
    shortAnswer: "A table mapping local variable slot indices to parameter and variable names and types.",
    explanation: "The LVT allows debuggers and reflection (via Parameter reflection API) to display the original variable names authored by the programmer.",
    hint: "Retains variable names for debuggers.",
    level: "advanced",
    codeExample: "// LocalVariableTable: slot 1 = studentName (Ljava/lang/String;)"
  },
  {
    question: "What is Dead Code Elimination in javac?",
    shortAnswer: "The removal of unreachable statements (e.g. `if (false) { ... }`) from the generated bytecode.",
    explanation: "If javac determines code is statically unreachable (e.g. statements after an unconditional `return` or `while(false)`), it either reports a compilation error or omits the bytecode.",
    hint: "Omitting unreachable code paths.",
    level: "intermediate",
    codeExample: "if (false) { System.out.println(\"Never emitted\"); } // Omitted from .class"
  },
  {
    question: "How does javac compile an Enum declaration?",
    shortAnswer: "As a `final class` that extends `java.lang.Enum` with static final instances and auto-generated `values()` and `valueOf()` methods.",
    explanation: "An enum is syntactic sugar: javac generates private constructors and static initialization blocks that instantiate all enum constants into an array.",
    hint: "Desugared into a final class extending java.lang.Enum.",
    level: "advanced",
    codeExample: "// enum Day { MON } → final class Day extends Enum<Day> { public static final Day MON; }"
  },
  {
    question: "What is the `-classpath` (or `-cp`) option in javac?",
    shortAnswer: "It tells the compiler where to look for third-party dependent .class and .jar library files.",
    explanation: "If your source code imports classes from external libraries, `-cp` provides the directories or JAR paths required to resolve those symbols during semantic analysis.",
    hint: "Classpath lookup for dependencies.",
    level: "basic",
    codeExample: "// Command: javac -cp lib/mysql-connector.jar src/DatabaseApp.java"
  },
  {
    question: "What is the difference between single-file compilation and multi-file compilation in javac?",
    shortAnswer: "Multi-file compilation (`javac *.java`) resolves cross-class dependencies simultaneously in a single compiler pass.",
    explanation: "Compiling multiple interrelated classes together allows javac to build a complete symbol table across all classes without 'Cannot find symbol' errors.",
    hint: "Batch compilation resolves circular class references.",
    level: "basic",
    codeExample: "// Command: javac src/*.java -d bin/"
  },
  {
    question: "How does javac compile a Java Record (Java 16+)?",
    shortAnswer: "As a final class extending `java.lang.Record` with private final fields, canonical constructor, and accessors.",
    explanation: "javac automatically generates the canonical constructor, getter methods matching component names, `equals()`, `hashCode()`, and `toString()`.",
    hint: "Compiler automatically generates all boilerplate methods.",
    level: "intermediate",
    codeExample: "// record Point(int x, int y) {} → Final class with x(), y(), equals(), hashCode()"
  },
  {
    question: "Why is understanding the javac compilation pipeline essential for clean code mastery?",
    shortAnswer: "It demystifies how syntactic sugar works, how type safety is guaranteed, and how to optimize bytecode efficiency.",
    explanation: "Knowing what happens during compilation helps you avoid performance traps with boxing, design clean generic architectures, and debug complex build errors with confidence.",
    hint: "Transforms abstract syntax into tangible understanding.",
    level: "basic",
    codeExample: "// Source Code → [javac Pipeline] → Robust Portable Bytecode."
  }
];

export default questions;
