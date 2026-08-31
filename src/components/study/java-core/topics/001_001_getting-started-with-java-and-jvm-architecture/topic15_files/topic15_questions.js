const questions = [
  {
    question: "What is the root cause of the error: `error: cannot find symbol` in javac?",
    shortAnswer: "The compiler cannot resolve a referenced variable, method, or class name in the current scope or imported packages.",
    explanation: "Common causes: spelling mistakes, missing imports (e.g. `Scanner`), declaring a variable after its usage, or incorrect case sensitivity.",
    hint: "Check spelling, scope, and import statements.",
    level: "basic",
    codeExample: "// Fix: import java.util.Scanner;\n// Scanner sc = new Scanner(System.in);"
  },
  {
    question: "What causes `error: non-static variable x cannot be referenced from a static context`?",
    shortAnswer: "Attempting to access an instance variable or instance method directly from a static method (like `main`) without creating an object instance.",
    explanation: "Static methods execute without an object instance on the heap. Instance fields require an object instance to exist.",
    hint: "Static methods cannot read instance fields directly.",
    level: "basic",
    codeExample: "public class App {\n    int count = 10;\n    public static void main(String[] args) {\n        // System.out.println(count); → COMPILE ERROR\n        System.out.println(new App().count); // FIXED\n    }\n}"
  },
  {
    question: "What causes `error: incompatible types: possible lossy conversion from double to int`?",
    shortAnswer: "Assigning a higher-precision floating-point or wider numeric type to a narrower integer type without an explicit cast.",
    explanation: "Java prevents accidental data truncation. Converting `double` to `int` requires explicit casting: `int x = (int) 9.99;`.",
    hint: "Explicit downcasting is required.",
    level: "basic",
    codeExample: "double d = 45.89;\nint i = (int) d; // Explicit narrowing cast"
  },
  {
    question: "What causes `error: variable x might not have been initialized`?",
    shortAnswer: "Reading a local variable that is only conditionally assigned inside an `if` block without an `else` guarantee.",
    explanation: "Java enforces Definite Assignment for local variables. Local variables must be guaranteed to have a value on every possible execution path before access.",
    hint: "Local variables must be definitively initialized.",
    level: "basic",
    codeExample: "int x = 0; // Initialize with default value\nif (condition) x = 10;\nSystem.out.println(x);"
  },
  {
    question: "What causes `error: missing return statement` in a Java method?",
    shortAnswer: "A non-void method has at least one execution path where control reaches the end of the method body without encountering a `return`.",
    explanation: "If return statements exist only inside `if` branches without a trailing `else` or default return, javac rejects the method.",
    hint: "All execution branches must return a value.",
    level: "basic",
    codeExample: "public int getScore(boolean flag) {\n    if (flag) return 100;\n    return 0; // Default return required!\n}"
  },
  {
    question: "What causes `error: unreachable statement` in javac?",
    shortAnswer: "Placing statements immediately after an unconditional `return`, `throw`, `break`, `continue`, or inside an impossible loop.",
    explanation: "The compiler's flow analysis detects that execution can never physically reach that line of code.",
    hint: "Code placed after unconditional return/throw.",
    level: "basic",
    codeExample: "public void test() {\n    return;\n    // System.out.println(\"Dead\"); → COMPILE ERROR: unreachable statement\n}"
  },
  {
    question: "What causes `error: class ClassName is public, should be declared in a file named ClassName.java`?",
    shortAnswer: "The public class name inside the file does not match the filename on disk (case-sensitive).",
    explanation: "In Java, a public class named `Employee` MUST reside in a file named `Employee.java`.",
    hint: "Filename must match public class name exactly.",
    level: "basic",
    codeExample: "// Public class OrderService → Must be in OrderService.java"
  },
  {
    question: "What causes `error: ';' expected` or `error: '}' expected`?",
    shortAnswer: "Syntax errors caused by missing semicolons at statement ends or mismatched opening/closing curly braces.",
    explanation: "Every statement must terminate with `;`, and every opening `{` must pair with a closing `}`.",
    hint: "Missing semicolon or unmatched brace.",
    level: "basic",
    codeExample: "int x = 10; // Semicolon required"
  },
  {
    question: "What causes `error: package com.example does not exist`?",
    shortAnswer: "The imported package or external dependency JAR is missing from the compiler classpath.",
    explanation: "Fix by verifying that the dependency is declared in `pom.xml` or passed via `javac -cp`.",
    hint: "Missing dependency on classpath.",
    level: "intermediate",
    codeExample: "// Fix: Add dependency JAR to classpath or Maven pom.xml"
  },
  {
    question: "What causes `error: method does not override or implement a method from a supertype` when using `@Override`?",
    shortAnswer: "Typo in method name, mismatched parameter types, or method not existing in the superclass/interface.",
    explanation: "The `@Override` annotation instructs javac to verify the signature against parent types; any mismatch triggers a compiler error.",
    hint: "Signature mismatch on overridden method.",
    level: "basic",
    codeExample: "// Typo: @Override public String tostring() → Fixed: toString()"
  },
  {
    question: "What causes `error: array required, but java.lang.String found`?",
    shortAnswer: "Attempting to use array indexing syntax (`[i]`) on a String instead of the `.charAt(i)` method.",
    explanation: "In Java, Strings are objects, not primitive character arrays. Use `str.charAt(i)` to access characters.",
    hint: "Strings use charAt(i), not [i].",
    level: "basic",
    codeExample: "String s = \"Java\";\nchar c = s.charAt(0); // Correct (not s[0])"
  },
  {
    question: "What causes `error: bad operand types for binary operator '+'`?",
    shortAnswer: "Attempting to add incompatible types (e.g. adding two booleans, or an array and a boolean).",
    explanation: "The `+` operator in Java is defined only for numeric arithmetic and String concatenation.",
    hint: "Invalid operands for plus operator.",
    level: "basic",
    codeExample: "// boolean b = true + false; → Compile error"
  },
  {
    question: "What causes `error: call to this/super must be first statement in constructor`?",
    shortAnswer: "Placing any code or print statements before `this(...)` or `super(...)` inside a constructor body.",
    explanation: "Java requires that superclass or delegated constructors execute before any subclass initialization statements.",
    hint: "this() and super() must be on line 1 of constructor.",
    level: "intermediate",
    codeExample: "public Dog() {\n    super(); // Must be line 1!\n    System.out.println(\"Dog initialized\");\n}"
  },
  {
    question: "What causes `error: constructor ClassName in class ClassName cannot be applied to given types`?",
    shortAnswer: "Attempting to instantiate an object using constructor arguments that do not match any defined constructor parameter lists.",
    explanation: "For example, calling `new Student(\"Name\")` when the class only defines a no-arg constructor `Student()`.",
    hint: "Argument types do not match constructor signature.",
    level: "basic",
    codeExample: "// new Student(\"Swadeep\", 21) requires constructor Student(String, int)"
  },
  {
    question: "What causes `error: unhandled exception type java.io.IOException`?",
    shortAnswer: "Calling a method that declares a checked exception without surrounding it in a `try-catch` block or declaring `throws` in the method signature.",
    explanation: "Java enforces checked exception handling at compile-time.",
    hint: "Surround with try-catch or add throws clause.",
    level: "basic",
    codeExample: "public void readFile() throws IOException {\n    new FileReader(\"data.txt\");\n}"
  },
  {
    question: "What causes `error: duplicate class: com.example.User`?",
    shortAnswer: "Two files in the same package declaring a class with the exact same name, or compiling overlapping directories.",
    explanation: "Every class in a package must have a unique identifier name.",
    hint: "Two classes with the identical name in the same package.",
    level: "intermediate",
    codeExample: "// Ensure class names are unique per package."
  },
  {
    question: "What causes `error: variable x is already defined in method`?",
    shortAnswer: "Declaring two variables with the same name inside the same local scope.",
    explanation: "Java does not allow variable shadowing inside the same method block.",
    hint: "Duplicate local variable name.",
    level: "basic",
    codeExample: "int count = 10;\n// int count = 20; → COMPILE ERROR: count already defined"
  },
  {
    question: "What causes `error: cannot assign a value to final variable x`?",
    shortAnswer: "Attempting to reassign a variable or field that was declared `final` after its initial assignment.",
    explanation: "Final variables are immutable and can be assigned only once.",
    hint: "Final variables cannot be reassigned.",
    level: "basic",
    codeExample: "final int MAX = 100;\n// MAX = 200; → COMPILE ERROR: cannot assign value to final variable"
  },
  {
    question: "What causes `error: modifier static not allowed here`?",
    shortAnswer: "Attempting to declare a local variable or non-static inner class method with the `static` keyword inside a method body.",
    explanation: "Local variables exist on the thread stack and cannot be static.",
    hint: "Static is not permitted on local variables.",
    level: "intermediate",
    codeExample: "void run() {\n    // static int local = 5; → COMPILE ERROR\n}"
  },
  {
    question: "What causes `error: abstract methods cannot have a body`?",
    shortAnswer: "Putting curly braces `{ }` with code on a method declared with the `abstract` modifier.",
    explanation: "Abstract methods must end with a semicolon (`;`) and leave implementation to subclasses.",
    hint: "Abstract methods must end with semicolon (;).",
    level: "basic",
    codeExample: "public abstract void draw(); // Semicolon, no body"
  },
  {
    question: "What causes `error: ClassName is not abstract and does not override abstract method`?",
    shortAnswer: "A concrete class implementing an interface or extending an abstract class fails to provide implementations for all abstract methods.",
    explanation: "Concrete subclasses must implement every inherited abstract method or be declared `abstract` themselves.",
    hint: "Must implement all interface/abstract methods.",
    level: "basic",
    codeExample: "public class Dog extends Animal {\n    @Override public void makeSound() { System.out.println(\"Bark\"); }\n}"
  },
  {
    question: "What causes `error: illegal start of expression` in javac?",
    shortAnswer: "Placing an invalid keyword, misplaced modifier, or mismatched parenthesis where the compiler expects an expression.",
    explanation: "Often caused by nesting method declarations inside other methods (e.g. writing `public void helper()` inside `main()`).",
    hint: "Check for methods declared inside methods or stray braces.",
    level: "basic",
    codeExample: "// Do NOT declare methods inside other methods!"
  },
  {
    question: "What causes `error: missing method body, or declare abstract`?",
    shortAnswer: "A non-abstract method header ending in a semicolon (`;`) without providing an opening and closing curly brace `{ }` body.",
    explanation: "If a method is not abstract or native, it MUST provide an implementation body enclosed in braces.",
    hint: "Provide { } body or mark method abstract.",
    level: "basic",
    codeExample: "public void process() { } // Added empty body"
  },
  {
    question: "What causes `error: int cannot be dereferenced`?",
    shortAnswer: "Attempting to invoke a method or use dot operator (`.`) on a primitive type (e.g. `int x = 5; x.toString();`).",
    explanation: "Primitives in Java are raw values, not objects. To invoke methods, use wrapper classes (`Integer.toString(x)`).",
    hint: "Primitives do not have methods.",
    level: "basic",
    codeExample: "int x = 5;\nString s = String.valueOf(x); // Correct (not x.toString())"
  },
  {
    question: "What causes `error: reference to overloaded method is ambiguous`?",
    shortAnswer: "The compiler finds two or more overloaded methods matching an invocation (e.g. `test(null)` matching `test(String)` and `test(Integer)`).",
    explanation: "Fix by explicitly casting the argument to the intended type: `test((String) null)`.",
    hint: "Disambiguate with an explicit cast.",
    level: "advanced",
    codeExample: "public void print(String s) { }\npublic void print(Integer i) { }\n// Fix: print((String) null);"
  },
  {
    question: "What causes `error: break outside switch or loop`?",
    shortAnswer: "Using the `break` keyword inside an `if` statement that is not enclosed inside a loop or `switch` block.",
    explanation: "`break` is valid only inside `for`, `while`, `do-while`, and `switch` constructs.",
    hint: "break is only allowed inside loops and switch blocks.",
    level: "basic",
    codeExample: "for (int i = 0; i < 10; i++) {\n    if (i == 5) break; // Valid inside loop\n}"
  },
  {
    question: "What causes `error: continue cannot be used outside of a loop`?",
    shortAnswer: "Placing a `continue` statement inside an `if` statement or method outside any loop construct.",
    explanation: "`continue` skips to the next iteration of an enclosing loop.",
    hint: "continue requires an enclosing loop.",
    level: "basic",
    codeExample: "while (hasMore) {\n    if (skip) continue; // Valid inside while\n}"
  },
  {
    question: "What causes `error: cyclic inheritance involving ClassName`?",
    shortAnswer: "A class extending itself directly or indirectly in an inheritance loop (e.g. `class A extends B` and `class B extends A`).",
    explanation: "Java forbids circular inheritance hierarchies.",
    hint: "Circular inheritance loops are forbidden.",
    level: "intermediate",
    codeExample: "// Illegal: class A extends B; class B extends A;"
  },
  {
    question: "Why should developers always read compiler error logs starting from the very first error at the top?",
    shortAnswer: "Because later errors are often cascading phantom errors caused by the first broken symbol or unmatched brace.",
    explanation: "Fixing the first error (like a missing semicolon or wrong import) frequently clears 10 subsequent errors automatically.",
    hint: "Fix error #1 first to eliminate cascading errors.",
    level: "basic",
    codeExample: "// Always fix line 1 error before inspecting line 50 errors."
  },
  {
    question: "How does developing systematic error-debugging instincts accelerate your growth as an engineer?",
    shortAnswer: "It transforms compiler feedback from frustrating roadblocks into rapid, guided design corrections.",
    explanation: "Master developers read compiler error diagnostics instantly, immediately pinpointing whether the issue is a scoping, typing, import, or syntax rule violation.",
    hint: "Compiler errors are diagnostic guides, not obstacles.",
    level: "basic",
    codeExample: "// Diagnostic Mastery → Fast, Confident Problem Solving."
  }
];

export default questions;
