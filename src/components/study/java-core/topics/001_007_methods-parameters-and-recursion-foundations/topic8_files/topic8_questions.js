/**
 * Module 001_007: Topic 8: Why return type alone cannot overload a method in Java
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "Why can't Java methods be overloaded by return type alone?",
    shortAnswer: "Because of **Call-Site Ambiguity**: When a method is called without assigning its return value (e.g. `process(10);`), the compiler cannot determine which version to invoke (JLS §8.4.2, §15.12).",
    explanation: "Primary technical and grammatical reason for return type exclusion.",
    hint: "Caller may discard the return value, making the call site completely ambiguous.",
    level: "basic",
    codeExample: "// If int m(int) and double m(int) existed: m(10); -> Which one to run?"
  },
  {
    question: "What is the exact definition of a Method Signature according to JLS §8.4.2?",
    shortAnswer: "A Method Signature consists strictly of the **Method Name** and the **Formal Parameter Types List** (number, types, and order of parameters).",
    explanation: "Official Java Language Specification method signature definition.",
    hint: "Signature = Method Name + Parameter Types only.",
    level: "basic",
    codeExample: "// Declaration: public static int add(int a, int b) -> Signature: add(int, int)"
  },
  {
    question: "What happens if you define `int compute(int x)` and `double compute(int x)` in the same Java class?",
    shortAnswer: "`Compile Error: method compute(int) is already defined in class ...`.",
    explanation: "Duplicate method signature compiler error.",
    hint: "Compile error: method already defined with identical signature.",
    level: "basic",
    codeExample: "// int compute(int x) and double compute(int x) cause a Compile Error"
  },
  {
    question: "Why doesn't the Java compiler inspect the receiving variable type (e.g. `double d = compute(10);`) to choose the overloaded method?",
    shortAnswer: "Java follows bottom-up type checking: method resolution is determined purely by the method name and argument types, independently of the target assignment context.",
    explanation: "Bottom-up type checking in Java expression resolution.",
    hint: "Method resolution is determined bottom-up from arguments, not top-down from assignment targets.",
    level: "intermediate",
    codeExample: "// Java does not resolve classical method overloads via target-type assignment context"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee inquiry engine, how were multiple return representations cleanly designed?",
    shortAnswer: "By using distinct, intention-revealing method names: `getFeeAsInteger()`, `getFeeAsDouble()`, and `getFeeAsFormattedString()` in Indian Rupees (₹).",
    explanation: "Clean architectural alternative to return type overloading.",
    hint: "Used distinct descriptive method names: getFeeAsInteger, getFeeAsDouble, getFeeAsFormattedString.",
    level: "basic",
    codeExample: "int i = getFeeAsInteger(101); double d = getFeeAsDouble(101); String s = getFeeAsFormattedString(101);"
  },
  {
    question: "Does any mainstream programming language support return-type-based overloading?",
    shortAnswer: "Most imperative and OOP languages (C++, C#, Python) forbid return-type overloading for the exact same call-site ambiguity reason; only functional languages like Haskell (via type-classes) support return type polymorphism.",
    explanation: "Comparative language design context.",
    hint: "C++, C#, and Python also forbid return-type overloading due to call-site ambiguity.",
    level: "intermediate",
    codeExample: "// C++, C#, Java all forbid return-type based method overloading"
  },
  {
    question: "Can two methods have the same name and parameter list if one returns `void` and the other returns `int`?",
    shortAnswer: "NO! `void m(int x)` and `int m(int x)` have identical method signatures `m(int)` and fail to compile.",
    explanation: "Void vs value return signature collision.",
    hint: "No, both produce the identical method signature m(int).",
    level: "basic",
    codeExample: "// void m(int) and int m(int) fail with Compile Error"
  },
  {
    question: "What is 'Covariant Return Type' and how does it differ from return-type overloading?",
    shortAnswer: "Covariant return types allow a subclass method to OVERRIDE a superclass method with a narrower (subtype) return type; it applies strictly to Method Overriding, NOT Method Overloading.",
    explanation: "Covariant return type in inheritance (JLS §8.4.5).",
    hint: "Covariant returns apply to method overriding in subclasses, not overloading.",
    level: "intermediate",
    codeExample: "class Parent { Number get() { ... } } class Child extends Parent { @Override Double get() { ... } }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was Swadeep's fee in integer vs double format?",
    shortAnswer: "Integer: ₹18,001 (rounded) vs Double: ₹18,000.75 in Indian Rupees (₹).",
    explanation: "Numerical precision distinction.",
    hint: "Integer ₹18,001 vs Double ₹18,000.75.",
    level: "basic",
    codeExample: "getFeeAsInteger(101) -> 18001 | getFeeAsDouble(101) -> 18000.75"
  },
  {
    question: "How does the JVM bytecode represent method descriptors?",
    shortAnswer: "Bytecode descriptors include parameter types and return type (e.g. `(I)D` for `double m(int)`), but the Java Language compiler restricts source code overloading to parameter types only.",
    explanation: "JVM bytecode descriptor vs Java language grammar rules.",
    hint: "JVM bytecode supports return types in descriptors, but the Java language compiler forbids it.",
    level: "advanced",
    codeExample: "// JVM Descriptor: (Ljava/lang/String;)I"
  },
  {
    question: "What are 'Bridge Methods' generated by the javac compiler?",
    shortAnswer: "Synthetic bytecode methods created by the compiler to support covariant return types and generic type erasure while maintaining binary compatibility.",
    explanation: "Compiler-generated bridge methods.",
    hint: "Synthetic methods generated by the compiler to preserve binary compatibility.",
    level: "advanced",
    codeExample: "// Compiler generates bridge method: Object get() delegating to String get()"
  },
  {
    question: "Why is giving methods descriptive names (e.g. `parseToInt()` vs `parseToDouble()`) better than overloading by return type even if it were supported?",
    shortAnswer: "Descriptive names explicitly state the output type in the code, improving readability, self-documentation, and reducing cognitive overhead for code reviewers.",
    explanation: "Clean Code readability benefits.",
    hint: "Explicit descriptive names make expected return types obvious to readers.",
    level: "basic",
    codeExample: "Integer.parseInt(\"100\"); Double.parseDouble(\"100.5\");"
  },
  {
    question: "In the Java standard library, how does `Integer` and `Double` handle string parsing?",
    shortAnswer: "By providing distinct method names: `Integer.parseInt()` and `Double.parseDouble()` rather than attempting an ambiguous `parse()` overload.",
    explanation: "Standard library design precedent.",
    hint: "Uses parseInt() and parseDouble() with distinct names.",
    level: "basic",
    codeExample: "int i = Integer.parseInt(\"42\"); double d = Double.parseDouble(\"42.0\");"
  },
  {
    question: "Can an overloaded method have a different return type if its parameter list IS different?",
    shortAnswer: "YES! If the parameter list differs (e.g. `int get(String key)` vs `double get(int id)`), having different return types is completely valid and standard in Java.",
    explanation: "Legal return type variation with distinct parameter lists.",
    hint: "Yes, as long as the parameter lists are different, return types can vary freely.",
    level: "basic",
    codeExample: "int get(String s); double get(int i); // Completely legal!"
  },
  {
    question: "What error message does `javac` produce when two methods differ only by return type?",
    shortAnswer: "`method methodName(params) is already defined in class ClassName`.",
    explanation: "Exact compiler error message.",
    hint: "method is already defined in class.",
    level: "basic",
    codeExample: "Error: method computeFee(int) is already defined in class ReturnTypeOverloadingLimitationDemo"
  },
  {
    question: "In the Coder & AccoTax Barrackpore system, what did `getFeeAsFormattedString(101)` return?",
    shortAnswer: "`\"₹18,000.75\"` formatted with Indian Rupee currency symbol (`₹`) and 2 decimal places.",
    explanation: "Formatted string return demonstration.",
    hint: "\"₹18,000.75\".",
    level: "basic",
    codeExample: "String formatted = getFeeAsFormattedString(101); // \"₹18,000.75\""
  },
  {
    question: "Why can't generics solve return-type-only overloading (e.g. `<T> T get(int id)`)?",
    shortAnswer: "Because type erasure converts generic `<T>` to `Object` at runtime, causing type safety risks and still requiring explicit casting or type tokens at the call site.",
    explanation: "Generic type erasure limitations.",
    hint: "Type erasure converts <T> to Object, preventing true return-type overloading.",
    level: "advanced",
    codeExample: "<T> T get(Class<T> type, int id) { ... } // Requires passing Class token"
  },
  {
    question: "What is the 'Type Token Pattern' used to emulate dynamic return types?",
    shortAnswer: "Passing a `Class<T>` literal as a parameter (e.g. `query(Class<T> type, int id)`), allowing the compiler to infer the return type from the argument.",
    explanation: "Effective Java Item 33: Typesafe heterogeneous containers.",
    hint: "Passing Class<T> token parameter to specify expected return type.",
    level: "advanced",
    codeExample: "Integer fee = queryFee(Integer.class, 101);"
  },
  {
    question: "Does the Java compiler check return types during the method overload resolution phase?",
    shortAnswer: "NO! Overload resolution (Phase 1, 2, 3) evaluates only method names, actual arguments, and formal parameters; return type compatibility is verified only AFTER the method is selected.",
    explanation: "JLS §15.12.2 method invocation resolution sequence.",
    hint: "No, return type is checked only after the method has already been chosen.",
    level: "advanced",
    codeExample: "// Resolution matches name + args; return type is validated afterwards"
  },
  {
    question: "Why is `System.out.println()` overloaded for every primitive type rather than returning different types?",
    shortAnswer: "Because `println()` accepts different parameter types (`int`, `double`, `char`, `Object`) and returns `void`, demonstrating legitimate parameter-based overloading.",
    explanation: "Standard library parameter overloading example.",
    hint: "Overloads parameters with different types, all returning void.",
    level: "basic",
    codeExample: "println(int); println(double); println(String); // All return void"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee ledger, how did Tuhina's fee (ID 102) format in currency?",
    shortAnswer: "`\"₹15,500.50\"` representing course tuition in Indian Rupees (₹).",
    explanation: "Tuhina record inquiry.",
    hint: "\"₹15,500.50\".",
    level: "basic",
    codeExample: "getFeeAsFormattedString(102) -> \"₹15,500.50\""
  },
  {
    question: "What would happen if Java allowed return-type overloading inside lambda expressions?",
    shortAnswer: "It would create severe target-type inference conflicts and exponential parsing ambiguity during type inference phases.",
    explanation: "Lambda expression target typing constraints.",
    hint: "Would break lambda target-typing inference and create parsing ambiguity.",
    level: "advanced",
    codeExample: "// Target typing in lambdas depends on unambiguous method signatures"
  },
  {
    question: "Can two interface default methods differ only by return type?",
    shortAnswer: "NO! Interfaces follow the exact same JLS method signature rules; differing only by return type causes a compile error.",
    explanation: "Interface default method signature rules.",
    hint: "No, interface default methods cannot differ by return type alone.",
    level: "intermediate",
    codeExample: "// default int m() and default double m() cause Compile Error"
  },
  {
    question: "What is the recommended design pattern when a method can return data in multiple formats?",
    shortAnswer: "Use distinct descriptive method names (`getAsInt()`, `getAsDouble()`, `getAsString()`) or return a rich Data Transfer Object (DTO) / Record containing all formats.",
    explanation: "Architectural best practices for multi-format returns.",
    hint: "Use distinct descriptive names or return a Record/DTO with all fields.",
    level: "basic",
    codeExample: "public record FeeView(int rounded, double precise, String formatted) {}"
  },
  {
    question: "Why does the statement `Math.random();` compile even though its return value is discarded?",
    shortAnswer: "Java allows expression statements to discard return values; this is why return-type-based overloading would break call-site disambiguation.",
    explanation: "Expression statement value discarding in Java.",
    hint: "Java allows discarding return values, proving why return type cannot disambiguate calls.",
    level: "intermediate",
    codeExample: "Math.random(); // Valid expression statement discarding double result"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was Debangshu's simulated fee?",
    shortAnswer: "₹10,000.00 default fee in Indian Rupees (₹).",
    explanation: "Database simulation default branch.",
    hint: "₹10,000.00 default fee.",
    level: "basic",
    codeExample: "queryDatabaseFee(999) -> 10000.00"
  },
  {
    question: "Can an annotation method in Java be overloaded by return type?",
    shortAnswer: "NO! Annotation member declarations cannot be overloaded at all (must have distinct names and take zero parameters).",
    explanation: "Annotation declaration constraints (JLS §9.6.1).",
    hint: "No, annotation elements cannot be overloaded.",
    level: "advanced",
    codeExample: "public @interface Fee { int value(); /* double value(); ILLEGAL */ }"
  },
  {
    question: "What is the ultimate takeaway of Module 001_007 Topic 8 for Java developers?",
    shortAnswer: "Method signatures in Java consist strictly of Name + Parameter Types; return type alone cannot overload a method because discarded return values at call sites create unsolvable ambiguity. Always use distinct intention-revealing method names.",
    explanation: "Mastery of return type overloading limitation.",
    hint: "Return types cannot overload methods due to call-site ambiguity; use distinct names.",
    level: "basic",
    codeExample: "// Summary: Method Signature = Name + Parameter Types ONLY (Return type excluded)"
  },
  {
    question: "What is the next topic (Topic 9) in Module 001_007?",
    shortAnswer: "Automatic type promotion in method overloading resolution.",
    explanation: "Topic 9 explores JVM widening, autoboxing, and varargs promotion hierarchy in overload resolution.",
    hint: "Automatic type promotion in method overloading resolution.",
    level: "basic",
    codeExample: "// Topic 9: Automatic Type Promotion in Method Overload Resolution"
  },
  {
    question: "How does the 'Builder Pattern' solve complex method returns and construction?",
    shortAnswer: "By separating configuration methods from terminal build methods (`build()`, `buildAsJson()`, `buildAsPdf()`), providing explicit typed returns cleanly.",
    explanation: "Builder pattern typed termination.",
    hint: "Uses explicit typed terminal methods like buildAsJson() and buildAsPdf().",
    level: "intermediate",
    codeExample: "Invoice inv = builder.forStudent(\"Swadeep\").build();"
  }
];

export default questions;
