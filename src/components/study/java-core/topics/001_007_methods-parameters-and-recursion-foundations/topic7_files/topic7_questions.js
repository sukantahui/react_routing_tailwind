/**
 * Module 001_007: Topic 7: Method Overloading: same method name with different parameter lists (count, types, order)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is Method Overloading in Java?",
    shortAnswer: "Defining multiple methods within the same class (or inheritance hierarchy) that share the EXACT SAME method name but have DIFFERENT parameter lists (JLS §8.4.9).",
    explanation: "Core definition of method overloading.",
    hint: "Same method name with different parameter lists in the same class.",
    level: "basic",
    codeExample: "void add(int a, int b) {}\nvoid add(double a, double b) {}"
  },
  {
    question: "What type of polymorphism does Method Overloading represent?",
    shortAnswer: "**Compile-Time Polymorphism** (also known as Static Polymorphism or Early Binding), because the compiler resolves which method to invoke at compile-time.",
    explanation: "Polymorphism taxonomy in Java.",
    hint: "Compile-time (static) polymorphism resolved at build time.",
    level: "basic",
    codeExample: "// Method resolution occurs during javac compilation"
  },
  {
    question: "What are the 3 permitted ways parameter lists can differ to achieve valid method overloading?",
    shortAnswer: "1. **Different Parameter Counts** (e.g. `1 vs 2 vs 3 params`), 2. **Different Parameter Types** (`int vs double vs String`), 3. **Different Parameter Orders** (`(String, int) vs (int, String)`).",
    explanation: "The 3 dimensions of method signature differentiation.",
    hint: "Count of parameters, Types of parameters, and Order of parameters.",
    level: "basic",
    codeExample: "void m(int x) {}\nvoid m(double x) {}\nvoid m(int x, double y) {}\nvoid m(double y, int x) {}"
  },
  {
    question: "Can two methods be overloaded if they differ ONLY by their Return Type?",
    shortAnswer: "NO! Return type alone CANNOT overload a method; attempting this causes a `Compile Error: method already defined`.",
    explanation: "Fundamental rule: return types are not part of the method signature.",
    hint: "No, return type alone is not sufficient to overload methods.",
    level: "basic",
    codeExample: "// int compute(int x) and double compute(int x) -> COMPILE ERROR!"
  },
  {
    question: "Can two methods be overloaded if they differ ONLY by their Parameter Variable Names (`void m(int a)` vs `void m(int b)`)?",
    shortAnswer: "NO! Parameter variable names are ignored by the compiler; the parameter types list `(int)` is identical, causing a `Compile Error`.",
    explanation: "Parameter names are not part of the method signature.",
    hint: "No, parameter names are irrelevant to the method signature.",
    level: "basic",
    codeExample: "// void test(int a) and void test(int b) have identical signatures"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee calculator, how was Overload 1 (`calculateFee(4000.0)`) implemented?",
    shortAnswer: "It delegated to Overload 2 (`calculateFee(monthlyRate, 1)`), supplying a default duration of 1 month in Indian Rupees (₹).",
    explanation: "Chained delegation pattern in method overloading.",
    hint: "Delegated to the 2-parameter overload with 1 month default.",
    level: "basic",
    codeExample: "public static double calculateFee(double r) { return calculateFee(r, 1); }"
  },
  {
    question: "What is 'Method Delegation / Chaining' in overloaded methods?",
    shortAnswer: "Having smaller overloaded methods delegate to the most detailed overloaded method with default arguments, centralizing business logic in one place (DRY).",
    explanation: "Clean code pattern for default arguments in Java.",
    hint: "Smaller overloads call the master overload with default parameters.",
    level: "intermediate",
    codeExample: "void log(String msg) { log(msg, LogLevel.INFO); }"
  },
  {
    question: "Can access modifiers differ among overloaded methods (e.g. `public` vs `private`)?",
    shortAnswer: "YES! Overloaded methods can have different access modifiers (`public`, `protected`, `private`), provided their parameter lists are different.",
    explanation: "Access modifier independence in overloading.",
    hint: "Yes, access modifiers can vary freely between overloaded methods.",
    level: "intermediate",
    codeExample: "public void save(Student s) { ... }\nprivate void save(Student s, boolean log) { ... }"
  },
  {
    question: "Can overloaded methods declare different `throws` exception lists?",
    shortAnswer: "YES! Overloaded methods are completely distinct methods to the compiler, so each can declare its own independent exception list.",
    explanation: "Exception list independence in overloading.",
    hint: "Yes, each overloaded method can throw different exceptions.",
    level: "intermediate",
    codeExample: "void read(String file) throws IOException {}\nvoid read(int id) {}"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee ledger, how did `calculateFee(\"JAVA-CORE\")` differ from `calculateFee(4)`?",
    shortAnswer: "`calculateFee(\"JAVA-CORE\")` accepted a `String` course code (returning ₹15,000), while `calculateFee(4)` accepted an `int` unit count (computing 4 × ₹3,500 = ₹14,000) in Indian Rupees (₹).",
    explanation: "Overloading by parameter type demonstration.",
    hint: "One took a String course code, the other took an integer unit count.",
    level: "basic",
    codeExample: "calculateFee(\"JAVA-CORE\"); // String | calculateFee(4); // int"
  },
  {
    question: "Can static methods be overloaded in the same class?",
    shortAnswer: "YES! Static methods can be overloaded just like instance methods (e.g. `Math.max(int, int)`, `Math.max(double, double)`).",
    explanation: "Static method overloading.",
    hint: "Yes, static methods can be overloaded with different parameter lists.",
    level: "basic",
    codeExample: "public static int max(int a, int b) { ... }\npublic static double max(double a, double b) { ... }"
  },
  {
    question: "Can a static method overload an instance method with a different parameter list?",
    shortAnswer: "YES! If the parameter lists differ, a static method and an instance method with the same name can coexist in the same class.",
    explanation: "Static and instance overloading coexistence.",
    hint: "Yes, as long as parameter lists are different.",
    level: "intermediate",
    codeExample: "public void print(String s) {}\npublic static void print(int x) {}"
  },
  {
    question: "What is the primary benefit of Method Overloading for API consumers?",
    shortAnswer: "**Consistency and Simplicity**: Callers use a single intuitive method name (e.g. `print()`, `valueOf()`, `calculateFee()`) rather than memorizing clumsy names like `printInt()`, `printString()`, `printDouble()`.",
    explanation: "API usability and cognitive ergonomics.",
    hint: "Provides a clean, uniform API name without needing clumsy type suffixes.",
    level: "basic",
    codeExample: "System.out.println(10); System.out.println(\"Hi\"); // Both use println()"
  },
  {
    question: "How does the Java compiler resolve which overloaded method to invoke when an exact match exists?",
    shortAnswer: "The compiler matches the exact parameter types first (Exact Type Match); if found, that specific method is invoked immediately.",
    explanation: "Compiler overload resolution phase 1.",
    hint: "Exact type match is prioritized first by the compiler.",
    level: "basic",
    codeExample: "void m(int x) {} void m(double d) {} m(10); // Invokes m(int)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore badge system, what were the parameter orders in `displayStudentBadge`?",
    shortAnswer: "Overload 6 used `(String studentName, int studentId)` while Overload 7 used `(int studentId, String studentName)` in Indian Rupees (₹).",
    explanation: "Overloading by parameter order demonstration.",
    hint: "(String, int) vs (int, String).",
    level: "basic",
    codeExample: "displayStudentBadge(\"Swadeep\", 101); displayStudentBadge(102, \"Tuhina\");"
  },
  {
    question: "Is overloading by parameter order considered good software engineering practice?",
    shortAnswer: "It is syntactically legal, but can lead to confusion and subtle invocation errors if parameter types are easily swapped; use with discretion.",
    explanation: "Code readability and design discretion.",
    hint: "Legal, but can be confusing if overused; design with care.",
    level: "intermediate",
    codeExample: "// Valid in Java, but prefer distinct names or consistent order"
  },
  {
    question: "Can constructors be overloaded in Java?",
    shortAnswer: "YES! Constructor overloading is extremely common, allowing objects to be initialized with varying levels of detail using `this(...)` constructor chaining.",
    explanation: "Constructor overloading pattern.",
    hint: "Yes, constructors are frequently overloaded with different parameter lists.",
    level: "basic",
    codeExample: "public Student(String name) { this(name, 0.0); }\npublic Student(String name, double fee) { ... }"
  },
  {
    question: "Can a subclass overload a method inherited from its parent class?",
    shortAnswer: "YES! If a subclass defines a method with the same name as the parent class but a DIFFERENT parameter list, it **overloads** the parent method (it does NOT override it!).",
    explanation: "Inherited method overloading.",
    hint: "Yes, differing parameter lists in a subclass overload the parent method.",
    level: "intermediate",
    codeExample: "class Parent { void m(int x) {} }\nclass Child extends Parent { void m(String s) {} } // Overload!"
  },
  {
    question: "What is the difference between Method Overloading and Method Overriding?",
    shortAnswer: "Overloading occurs in the same class (or hierarchy) with the SAME name and DIFFERENT parameters (Compile-Time); Overriding occurs in a subclass with the EXACT SAME signature and return type using `@Override` (Runtime Polymorphism).",
    explanation: "Crucial difference between overloading and overriding.",
    hint: "Overloading = same name + different parameters; Overriding = same signature in subclass.",
    level: "basic",
    codeExample: "// Overloading: add(int) vs add(double) | Overriding: @Override toString()"
  },
  {
    question: "Can two methods differ only in that one has a varargs parameter (`void m(int... x)`) and the other has a fixed array (`void m(int[] x)`)?",
    shortAnswer: "NO! Under the hood, varargs `int...` is compiled to `int[]`, giving both methods the identical bytecode signature `m([I)` and causing a `Compile Error`.",
    explanation: "Varargs array signature equivalence.",
    hint: "No, varargs compiles to an array under the hood; signatures collide.",
    level: "advanced",
    codeExample: "// void m(int... x) and void m(int[] x) produce the IDENTICAL signature!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee system, what discount was applied to Swadeep in `calculateFee(4000.0, 6, 0.15)`?",
    shortAnswer: "15% scholarship discount: Gross ₹24,000 − ₹3,600 discount = ₹20,400 net payable in Indian Rupees (₹).",
    explanation: "3-parameter overload calculation.",
    hint: "15% discount on ₹24,000 resulting in ₹20,400.",
    level: "basic",
    codeExample: "calculateFee(4000.0, 6, 0.15); // ₹20,400.00"
  },
  {
    question: "What happens if a call matches both `m(double)` and `m(Double)` when passing primitive `10.0`?",
    shortAnswer: "The primitive overload `m(double)` is selected because exact primitive matching takes precedence over autoboxing to `Double`.",
    explanation: "Primitive vs Autoboxing resolution hierarchy.",
    hint: "Primitive match takes precedence over autoboxing.",
    level: "advanced",
    codeExample: "void m(double d) {} void m(Double d) {} m(10.0); // Calls m(double)"
  },
  {
    question: "What happens if a call matches both `m(int, long)` and `m(long, int)` when calling `m(10, 10)`?",
    shortAnswer: "`Compile Error: reference to m is ambiguous, both method m(int,long) and method m(long,int) match`.",
    explanation: "Ambiguous overload compiler error.",
    hint: "Compile error: ambiguous method invocation.",
    level: "advanced",
    codeExample: "m(10, 10); // Ambiguous if both m(int, long) and m(long, int) exist!"
  },
  {
    question: "Can an overloaded method have a different generic type parameter (`<T> void m(T x)`)?",
    shortAnswer: "YES! Generic method overloading is permitted, provided the type erasure does not cause identical raw method signatures.",
    explanation: "Generic method overloading rules.",
    hint: "Yes, as long as type erasure does not cause signature collision.",
    level: "advanced",
    codeExample: "<T> void print(T item) {}\n<T> void print(List<T> items) {}"
  },
  {
    question: "Why does `Arrays.sort()` provide dozens of overloaded methods in the Java Standard Library?",
    shortAnswer: "To provide optimized sorting implementations for all primitive types (`int[]`, `double[]`, `char[]`, etc.) and Object types (`Object[]`, `Comparable[]`, `Comparator<T>`).",
    explanation: "Standard library overloading masterclass.",
    hint: "To support all primitive and object array types with specialized algorithms.",
    level: "basic",
    codeExample: "Arrays.sort(int[]); Arrays.sort(double[]); Arrays.sort(Object[], Comparator);"
  },
  {
    question: "What is the role of Java's `@Override` annotation in preventing accidental overloading?",
    shortAnswer: "If a developer intends to override a method but accidentally changes parameter types, `@Override` causes a compile error, preventing an unintended overload bug.",
    explanation: "Defensive use of @Override annotation.",
    hint: "@Override catches accidental overloading bugs at compile-time.",
    level: "intermediate",
    codeExample: "@Override void equals(Object o) {} // Catches mistake if typed equals(Student s)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, how many distinct `calculateFee` overloaded methods were created?",
    shortAnswer: "5 overloaded variations: 1-param rate, 2-param rate/months, 3-param rate/months/discount, 1-param units (int), and 1-param code (String) in Indian Rupees (₹).",
    explanation: "Demonstration suite summary.",
    hint: "5 overloaded calculateFee methods.",
    level: "basic",
    codeExample: "calculateFee(double), calculateFee(double, int), calculateFee(double, int, double), calculateFee(int), calculateFee(String)"
  },
  {
    question: "What is the ultimate takeaway of Module 001_007 Topic 7 for Java developers?",
    shortAnswer: "Method Overloading provides compile-time polymorphism by allowing identical method names with differing parameter counts, types, or order; chained delegation keeps code DRY and provides flexible, intuitive APIs.",
    explanation: "Mastery of method overloading foundations.",
    hint: "Method overloading provides compile-time polymorphism with different parameter lists.",
    level: "basic",
    codeExample: "// Summary: Same Name + Different Parameter Signatures = Overloading"
  },
  {
    question: "What is the next topic (Topic 8) in Module 001_007?",
    shortAnswer: "Why return type alone cannot overload a method in Java.",
    explanation: "Topic 8 explores the technical and parsing reasons why return types cannot disambiguate method calls.",
    hint: "Why return type alone cannot overload a method in Java.",
    level: "basic",
    codeExample: "// Topic 8: Why Return Type Alone Cannot Overload a Method"
  },
  {
    question: "Can an overloaded method return a subtype of another overloaded method's return type?",
    shortAnswer: "YES! Since overloaded methods are independent, each can have completely unrelated return types (`int`, `double`, `String`, `void`).",
    explanation: "Return type independence across overloads.",
    hint: "Yes, overloaded methods can have completely different return types.",
    level: "basic",
    codeExample: "int get(int id); String get(String key); // Completely legal!"
  }
];

export default questions;
