/**
 * Module 001_007: Topic 1: Anatomy of a method declaration: access modifier, return type, method name, parameter list, exception list, method body
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What are the 6 fundamental structural parts of a Java Method Declaration?",
    shortAnswer: "1. Access Modifiers (`public`, `private`), 2. Non-Access Modifiers (`static`, `final`), 3. Return Type (`int`, `void`), 4. Method Name (`processFee`), 5. Parameter List `(double amount)`, 6. Exception List (`throws ...`), and Method Body `{ ... }`.",
    explanation: "Complete grammatical syntax of Java methods (JLS §8.4).",
    hint: "Modifiers, Return Type, Name, Parameters, Throws Clause, and Body.",
    level: "basic",
    codeExample: "public static double processFee(double amount) throws Exception { return amount; }"
  },
  {
    question: "What is the difference between a Method Declaration and a Method Signature?",
    shortAnswer: "A Method Declaration includes all modifiers, return type, throws clause, and body; the Method Signature strictly consists of ONLY the Method Name and Parameter Types List (e.g. `processFee(String, double)`).",
    explanation: "Precise JLS §8.4.2 signature distinction.",
    hint: "Signature = Method Name + Parameter Types only.",
    level: "basic",
    codeExample: "// Declaration: public static int add(int a, int b) | Signature: add(int, int)"
  },
  {
    question: "Is the Return Type part of a Java Method Signature?",
    shortAnswer: "NO! The return type is NOT part of the method signature; two methods with the same name and parameter types but different return types cause a compiler error.",
    explanation: "Key rule for method overloading resolution.",
    hint: "No, return type is never part of the method signature.",
    level: "basic",
    codeExample: "// int compute(int x) and double compute(int x) have the IDENTICAL signature!"
  },
  {
    question: "What does the `void` return type signify in Java?",
    shortAnswer: "It indicates that the method executes an action (e.g. printing, updating database) but does NOT return any value to the calling expression.",
    explanation: "Void return type semantics.",
    hint: "Indicates the method returns no value.",
    level: "basic",
    codeExample: "public static void printHeader() { System.out.println(\"Header\"); }"
  },
  {
    question: "Can a `void` method contain a `return;` statement?",
    shortAnswer: "YES! A plain `return;` statement without a value can be used in void methods as a guard clause to terminate execution and exit early.",
    explanation: "Early return in void methods.",
    hint: "Yes, 'return;' exits the method immediately without returning a value.",
    level: "basic",
    codeExample: "if (error) return; // Completely legal in void methods"
  },
  {
    question: "What are the 4 Access Modifiers in Java and their visibility scopes?",
    shortAnswer: "1. `public` (accessible anywhere), 2. `protected` (same package + subclasses), 3. Package-Private (default, same package only), 4. `private` (same class only).",
    explanation: "Encapsulation and access control hierarchy.",
    hint: "public, protected, package-private (no keyword), and private.",
    level: "basic",
    codeExample: "private double computeDiscount() { ... }"
  },
  {
    question: "What does the `static` modifier on a method mean?",
    shortAnswer: "The method belongs to the class itself rather than instances of the class; it can be invoked directly using `ClassName.methodName()` without instantiating an object (`new`).",
    explanation: "Class-level method binding.",
    hint: "Belongs to the class, callable without creating an object instance.",
    level: "basic",
    codeExample: "Math.sqrt(16.0); // static method invocation"
  },
  {
    question: "What does the `final` modifier on a method mean?",
    shortAnswer: "The method cannot be overridden or modified by any subclass, locking down the implementation for security or architectural consistency.",
    explanation: "Preventing polymorphic method overriding.",
    hint: "Prevents subclasses from overriding the method.",
    level: "intermediate",
    codeExample: "public static final double calculateGst(double amount) { return amount * 0.18; }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee engine, what exception was declared in `processFeeDeduction()`?",
    shortAnswer: "`throws IllegalArgumentException` when deduction amount is negative or when the student has insufficient balance in Indian Rupees (₹).",
    explanation: "Defensive exception contract declaration.",
    hint: "throws IllegalArgumentException for invalid or insufficient fee deductions.",
    level: "basic",
    codeExample: "public static double processFeeDeduction(...) throws IllegalArgumentException"
  },
  {
    question: "What is the 'Throws Clause' in a method header?",
    shortAnswer: "A comma-separated list following the `throws` keyword specifying the checked (or unchecked) exceptions that the method might throw to its caller.",
    explanation: "Method exception contract specification.",
    hint: "Declares exceptions the method can throw using the 'throws' keyword.",
    level: "basic",
    codeExample: "public void readFile() throws IOException, FileNotFoundException { ... }"
  },
  {
    question: "What is the difference between `throw` and `throws` in Java?",
    shortAnswer: "`throws` is declared in the method header to advertise potential exceptions; `throw` is used inside the method body to actually instantiate and trigger an exception.",
    explanation: "Keyword distinction in Java exception handling.",
    hint: "throws is in the header; throw is inside the body.",
    level: "basic",
    codeExample: "void m() throws Exception { throw new Exception(\"Error\"); }"
  },
  {
    question: "What are 'Formal Parameters'?",
    shortAnswer: "The variable declarations defined inside the method header parentheses specifying the types and names of inputs the method expects (e.g. `(String studentName, double balance)`).",
    explanation: "Formal parameter definition.",
    hint: "Variable placeholders defined in the method signature.",
    level: "basic",
    codeExample: "public static void enroll(String name, int age) // 'name' and 'age' are formal parameters"
  },
  {
    question: "Can two formal parameters in the same method declaration have the same variable name?",
    shortAnswer: "NO! Parameter variable names must be unique within the method's parameter list.",
    explanation: "Variable scope naming conflict.",
    hint: "No, parameter names must be distinct within the parameter list.",
    level: "basic",
    codeExample: "// public void test(int x, int x) // COMPILE ERROR!"
  },
  {
    question: "What happens if a non-void method reaches the end of its body without executing a `return` statement?",
    shortAnswer: "`Compile Error: This method must return a result of type Type`.",
    explanation: "Unreachable return statement compiler error.",
    hint: "Compiler error: missing return statement.",
    level: "basic",
    codeExample: "// int getFee() { int x = 10; } // COMPILE ERROR: missing return statement!"
  },
  {
    question: "Can a method return multiple values directly in Java?",
    shortAnswer: "No direct multi-return syntax exists; a method returns multiple values by packaging them into an Object, Array, `Record`, `Map`, or custom DTO class.",
    explanation: "Return type cardinality rule.",
    hint: "No, wrap multiple values in an array, record, or custom class.",
    level: "intermediate",
    codeExample: "public record FeeSummary(double gross, double gst, double net) {}"
  },
  {
    question: "What is an `abstract` method in Java?",
    shortAnswer: "A method declared with the `abstract` keyword inside an abstract class or interface that has NO method body (`{ ... }`), ending with a semicolon `;`.",
    explanation: "Polymorphic abstract method contract.",
    hint: "A method declaration with no body, ending with a semicolon.",
    level: "intermediate",
    codeExample: "public abstract void calculateTax(double gross);"
  },
  {
    question: "What is a `native` method in Java?",
    shortAnswer: "A method implemented in platform-specific machine code (like C/C++ via JNI) that has no Java body, declared as `public native void method();`.",
    explanation: "Java Native Interface integration.",
    hint: "Method implemented in C/C++ without a Java body.",
    level: "advanced",
    codeExample: "public static native void arraycopy(...);"
  },
  {
    question: "What is the `synchronized` modifier on a method?",
    shortAnswer: "Ensures that only one thread can execute the method at a time on the target object/class monitor, providing thread safety against race conditions.",
    explanation: "Concurrency control mechanism.",
    hint: "Locks the method so only one thread can execute it at a time.",
    level: "advanced",
    codeExample: "public synchronized void depositFee(double amount) { balance += amount; }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee ledger, why was `processFeeDeduction()` declared `public static final`?",
    shortAnswer: "`public` allows campus coordinators to invoke it, `static` enables class-level calls without object instantiation, and `final` locks deduction arithmetic rules from modification in Indian Rupees (₹).",
    explanation: "Modifier combination rationale.",
    hint: "public for access, static for class call, final to lock business logic.",
    level: "basic",
    codeExample: "public static final double processFeeDeduction(...)"
  },
  {
    question: "Can a method return a primitive type when its declared return type is a Wrapper class (Autoboxing)?",
    shortAnswer: "YES! Java compiler automatically boxes primitives into wrappers (e.g. returning `double` 12000.0 from a `Double` method).",
    explanation: "Automatic boxing in return statements.",
    hint: "Yes, autoboxing converts primitives to wrappers automatically.",
    level: "intermediate",
    codeExample: "public Double getFee() { return 15000.0; } // Autoboxed to Double"
  },
  {
    question: "Can a method return `null` if its return type is a primitive (`int`, `boolean`)?",
    shortAnswer: "NO! Primitive types cannot hold `null`; returning `null` when a primitive is expected causes a `Compile Error` (or `NullPointerException` during unboxing).",
    explanation: "Primitive null incompatibility.",
    hint: "No, primitives cannot be null.",
    level: "basic",
    codeExample: "// int getAge() { return null; } // COMPILE ERROR"
  },
  {
    question: "What is the order of modifiers in a method declaration according to the Java Language Specification?",
    shortAnswer: "Conventional order: `[Access: public/protected/private] [static] [final/abstract] [synchronized] [ReturnType] [MethodName]`.",
    explanation: "Standard Java style guide conventions.",
    hint: "Access modifier first, followed by static/final, return type, and name.",
    level: "intermediate",
    codeExample: "public static final void execute() { ... }"
  },
  {
    question: "Can a method throw an exception that is a subclass of the exception declared in its `throws` clause?",
    shortAnswer: "YES! Polymorphic exception handling allows throwing any subtype of the declared exception (e.g. throwing `FileNotFoundException` when `IOException` is declared).",
    explanation: "Covariant exception handling.",
    hint: "Yes, throwing a subclass of the declared exception is completely valid.",
    level: "intermediate",
    codeExample: "public void load() throws IOException { throw new FileNotFoundException(); }"
  },
  {
    question: "What is the scope of variables declared inside a method body?",
    shortAnswer: "Local Scope: Local variables exist only during the execution of that specific method stack frame and are destroyed when the method returns.",
    explanation: "Method local variable lifecycle.",
    hint: "Local to the method body; allocated on stack and destroyed on return.",
    level: "basic",
    codeExample: "public void test() { int temp = 10; } // 'temp' is inaccessible outside"
  },
  {
    question: "Can formal parameters be declared `final` in Java (`final int x`)?",
    shortAnswer: "YES! Declaring a parameter `final` prevents the method body from reassigning that parameter variable.",
    explanation: "Immutable formal parameters.",
    hint: "Yes, 'final' makes the parameter variable non-reassignable inside the method.",
    level: "basic",
    codeExample: "public void process(final double fee) { /* fee = 0; FAILS! */ }"
  },
  {
    question: "What is the difference between Method Header and Method Body?",
    shortAnswer: "The Method Header defines the interface contract (modifiers, return type, name, parameters, throws); the Method Body `{ ... }` contains the actual executable implementation statements.",
    explanation: "Header vs Body structural distinction.",
    hint: "Header defines the contract; body contains the executable code.",
    level: "basic",
    codeExample: "// Header: public void run() | Body: { System.out.println(\"Running\"); }"
  },
  {
    question: "Why should checked exceptions be documented in JavaDoc using `@throws` tag?",
    shortAnswer: "To inform API consumers of the precise error conditions and recovery expectations without forcing them to inspect bytecode or source code.",
    explanation: "Professional API documentation standards.",
    hint: "Documents error conditions for API consumers in JavaDoc.",
    level: "basic",
    codeExample: "/** @throws IllegalArgumentException if amount is negative */"
  },
  {
    question: "What is the ultimate takeaway of Module 001_007 Topic 1 for Java developers?",
    shortAnswer: "A method declaration is an explicit contract consisting of modifiers, return type, name, parameter list, exception specification, and body; the method signature (name + parameter types) uniquely identifies the method for the compiler.",
    explanation: "Mastery of method declaration anatomy.",
    hint: "Comprehensive understanding of all 6 parts of a method declaration and its signature.",
    level: "basic",
    codeExample: "// Summary: [Modifiers] [ReturnType] [Name]([Params]) [Throws] { [Body] }"
  },
  {
    question: "What is the next topic (Topic 2) in Module 001_007?",
    shortAnswer: "Method naming conventions (verb-noun camelCase).",
    explanation: "Topic 2 focuses on idiomatic Java naming standards, clean code verbs, boolean prefixes, and anti-patterns.",
    hint: "Method naming conventions (verb-noun camelCase).",
    level: "basic",
    codeExample: "// Topic 2: Method Naming Conventions (camelCase Verb-Noun)"
  },
  {
    question: "Can annotations be placed on method declarations in Java?",
    shortAnswer: "YES! Annotations like `@Override`, `@Deprecated`, and `@SuppressWarnings` precede the method header to provide metadata to the compiler and runtime frameworks.",
    explanation: "Annotation metadata on method declarations.",
    hint: "Yes, annotations like @Override precede the method declaration header.",
    level: "basic",
    codeExample: "@Override public String toString() { return \"Custom\"; }"
  }
];

export default questions;
