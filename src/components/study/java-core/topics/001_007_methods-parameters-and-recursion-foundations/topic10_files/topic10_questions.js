/**
 * Module 001_007: Topic 10: Variable Arguments (Varargs - Type... varName): syntax, rules, and single-last-parameter constraint
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is Varargs in Java and when was it introduced?",
    shortAnswer: "Variable Arguments (Varargs, `Type... varName`) allows methods to accept zero, one, or multiple arguments of a specified type without requiring callers to explicitly instantiate arrays (introduced in Java 5).",
    explanation: "Core definition and origin of varargs (JLS §8.4.1).",
    hint: "Type... syntax allowing 0 to N arguments without manual array creation.",
    level: "basic",
    codeExample: "public static double sum(double... values) { ... }"
  },
  {
    question: "What are the TWO cardinal syntax rules governing Varargs parameters?",
    shortAnswer: "1. **Single Varargs Constraint**: A method can declare at most ONE varargs parameter. 2. **Last Parameter Constraint**: The varargs parameter MUST be the LAST parameter in the formal parameter list.",
    explanation: "The 2 fundamental grammar rules of varargs declarations.",
    hint: "At most one varargs parameter, and it must be the very last parameter.",
    level: "basic",
    codeExample: "// Legal: void m(int a, String... b) | Illegal: void m(String... b, int a)"
  },
  {
    question: "Why does the compiler require the varargs parameter to be the LAST parameter?",
    shortAnswer: "To eliminate parsing ambiguity: if varargs were placed first or in the middle, the compiler could not determine where the variable-length sequence ends and fixed parameters begin.",
    explanation: "Syntactic parsing determinism in compiler design.",
    hint: "To prevent ambiguity on where variable arguments end and fixed arguments start.",
    level: "basic",
    codeExample: "// If void m(int... a, int b) existed: m(1, 2, 3); → Where does 'b' start?"
  },
  {
    question: "How does the Java compiler implement Varargs under the hood?",
    shortAnswer: "The compiler translates `Type...` directly into an array `Type[]`; at each call site, it automatically generates bytecode to allocate an array and pack the arguments into it.",
    explanation: "Bytecode array transformation mechanism.",
    hint: "Translates Type... into an array Type[] under the hood.",
    level: "basic",
    codeExample: "double... fees → double[] fees"
  },
  {
    question: "What is the value of a varargs parameter inside the method when ZERO arguments are passed (`calculateBatchTotal(\"Barrackpore\")`)?",
    shortAnswer: "An empty, non-null array of length 0 (`new double[0]`), ensuring `fees.length == 0` without throwing a `NullPointerException`.",
    explanation: "Zero-argument varargs array creation.",
    hint: "An empty array of length 0 (never null).",
    level: "basic",
    codeExample: "calculateBatchTotal(\"Barrackpore\"); // fees.length is 0"
  },
  {
    question: "Can an explicit array (`double[] arr`) be passed directly into a varargs parameter?",
    shortAnswer: "YES! Passing an existing array passes that array reference directly without creating an extra wrapping array.",
    explanation: "Direct array passing to varargs.",
    hint: "Yes, explicit arrays can be passed directly to varargs.",
    level: "basic",
    codeExample: "double[] fees = {1000.0, 2000.0}; calculateBatchTotal(\"Naihati\", fees);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore batch system, how did `calculateBatchTotal` process fees?",
    shortAnswer: "Using an enhanced for-each loop over `fees` (`for (double fee : fees) total += fee;`) calculating totals in Indian Rupees (₹).",
    explanation: "Varargs iteration demonstration.",
    hint: "Iterated over the internal double[] array using a for-each loop.",
    level: "basic",
    codeExample: "for (double fee : fees) total += fee;"
  },
  {
    question: "What happens if a class defines `void display(String s, double f)` and `void display(String s, double... f)`?",
    shortAnswer: "When passing exactly 1 double argument, the **Fixed-Arity Method** (`display(String, double)`) is prioritized over the Varargs method.",
    explanation: "Fixed-arity precedence over variable-arity (JLS §15.12.2.4).",
    hint: "Fixed-arity method is prioritized over the varargs method.",
    level: "intermediate",
    codeExample: "displayFeeRecord(\"Abhronila\", 15000.0); // Selects fixed 1-param method"
  },
  {
    question: "Can two methods in the same class have signatures `void m(int... x)` and `void m(int[] x)`?",
    shortAnswer: "NO! Both compile to the identical bytecode descriptor `m([I)`, causing a `Compile Error: method already defined`.",
    explanation: "Bytecode signature collision.",
    hint: "No, both produce the identical array signature in bytecode.",
    level: "intermediate",
    codeExample: "// void m(int... x) and void m(int[] x) fail compilation"
  },
  {
    question: "What happens if you pass `null` to a varargs parameter (`calculateBatchTotal(\"Barrackpore\", (double[]) null)`)?",
    shortAnswer: "The varargs parameter variable `fees` receives `null` (not an empty array); attempting `fees.length` will throw `NullPointerException`!",
    explanation: "Null passing to varargs parameter.",
    hint: "fees becomes null; accessing fees.length throws NullPointerException.",
    level: "intermediate",
    codeExample: "void m(int... x) { if (x == null) return; } // Defensive null check"
  },
  {
    question: "What is 'Heap Pollution' in Generic Varargs methods?",
    shortAnswer: "When a variable of a parameterized type refers to an object that is not of that parameterized type, caused by the runtime creation of generic arrays for varargs.",
    explanation: "Generic array creation and heap pollution.",
    hint: "Type safety violation caused by generic array creation in varargs.",
    level: "advanced",
    codeExample: "@SafeVarargs public static <T> List<T> asList(T... elements) { ... }"
  },
  {
    question: "What is the purpose of the `@SafeVarargs` annotation in Java?",
    shortAnswer: "Suppresses compiler warnings about heap pollution for `final` or `static` methods with generic varargs, asserting that the method does not unsafely store incompatible types in the varargs array.",
    explanation: "SafeVarargs annotation contract (JLS §9.6.4.7).",
    hint: "Asserts that a generic varargs method does not perform unsafe array operations.",
    level: "advanced",
    codeExample: "@SafeVarargs public static <T> void safePrint(T... items) {}"
  },
  {
    question: "In the Coder & AccoTax Barrackpore batch system, what was the total fee computed for Naihati with 4 items?",
    shortAnswer: "₹10,000 + ₹14,000 + ₹18,000 + ₹22,000 = ₹64,000.00 total tuition in Indian Rupees (₹).",
    explanation: "Varargs batch summation calculation.",
    hint: "₹64,000.00 total.",
    level: "basic",
    codeExample: "calculateBatchTotal(\"Naihati\", 10000.0, 14000.0, 18000.0, 22000.0);"
  },
  {
    question: "Why should performance-critical methods avoid excessive Varargs calls in tight loops?",
    shortAnswer: "Because every varargs invocation allocates a new temporary array on the Heap, generating garbage collection pressure if called millions of times inside tight loops.",
    explanation: "Memory allocation profile of varargs.",
    hint: "Every call allocates a new array on the Heap, creating GC overhead.",
    level: "intermediate",
    codeExample: "// Tip: For 1-3 common arguments, provide fixed overloads alongside varargs"
  },
  {
    question: "What optimization pattern does Joshua Bloch recommend in Effective Java Item 53 for high-performance varargs APIs?",
    shortAnswer: "Provide overloaded fixed-arity methods for 1, 2, and 3 arguments (`foo()`, `foo(a1)`, `foo(a1, a2)`, `foo(a1, a2, a3)`) and a varargs fallback (`foo(a1, a2, a3, a4...)`) to eliminate array allocation for 95% of calls.",
    explanation: "Effective Java performance optimization pattern.",
    hint: "Provide fixed overloads for 1, 2, 3 parameters to avoid array allocations.",
    level: "advanced",
    codeExample: "void m(int a) {}\nvoid m(int a, int b) {}\nvoid m(int a, int b, int... rest) {}"
  },
  {
    question: "Can the `main` method signature be written with Varargs (`public static void main(String... args)`)?",
    shortAnswer: "YES! `String... args` is 100% syntactically and functionally equivalent to `String[] args` as the standard JVM entry point.",
    explanation: "JVM entry point varargs compatibility.",
    hint: "Yes, String... args is completely valid for public static void main.",
    level: "basic",
    codeExample: "public static void main(String... args) { ... }"
  },
  {
    question: "Can a varargs method require at least ONE mandatory argument cleanly?",
    shortAnswer: "YES! Declare the first parameter as a standard fixed parameter: `double min(double first, double... rest)`.",
    explanation: "At-least-one argument enforcement pattern.",
    hint: "Declare the first argument as a normal parameter followed by varargs.",
    level: "basic",
    codeExample: "public static double min(double first, double... rest) { ... }"
  },
  {
    question: "What error occurs if you write `void calculate(double... a, int... b)`?",
    shortAnswer: "`Compile Error: ')' expected` or `varargs parameter must be the last parameter`.",
    explanation: "Multiple varargs compiler restriction.",
    hint: "Compile error: a method can declare at most ONE varargs parameter.",
    level: "basic",
    codeExample: "// void calculate(double... a, int... b) // COMPILE ERROR"
  },
  {
    question: "What error occurs if you write `void calculate(double... fees, String campus)`?",
    shortAnswer: "`Compile Error: varargs parameter must be the last parameter`.",
    explanation: "Non-terminal varargs compiler error.",
    hint: "Compile error: varargs parameter must be the last parameter.",
    level: "basic",
    codeExample: "// void calculate(double... fees, String campus) // COMPILE ERROR"
  },
  {
    question: "In the Coder & AccoTax Barrackpore system, what was printed when `calculateBatchTotal(\"Barrackpore\")` ran with zero fees?",
    shortAnswer: "`Count: 0 fees | Array: [] | Total: ₹0.00` in Indian Rupees (₹).",
    explanation: "Zero-argument output verification.",
    hint: "Count: 0 fees, Total: ₹0.00.",
    level: "basic",
    codeExample: "calculateBatchTotal(\"Barrackpore\"); // Total ₹0.00"
  },
  {
    question: "How does `String.format()` utilize Varargs in the Java standard library?",
    shortAnswer: "`public static String format(String format, Object... args)` accepts a format string and an arbitrary number of replacement arguments.",
    explanation: "Standard library varargs example.",
    hint: "Accepts format string and Object... args for formatting placeholders.",
    level: "basic",
    codeExample: "String s = String.format(\"Student: %s | Fee: ₹%,.2f\", name, fee);"
  },
  {
    question: "How does `List.of()` in Java 9+ handle Varargs?",
    shortAnswer: "`List.of()` provides fixed overloads for 0 to 10 elements to prevent array allocations, plus a fallback `List.of(E... elements)` for larger lists.",
    explanation: "Java 9 collection factory design.",
    hint: "Provides 11 fixed-arity overloads (0 to 10) plus a varargs fallback for performance.",
    level: "advanced",
    codeExample: "List<String> list = List.of(\"Swadeep\", \"Tuhina\", \"Abhronila\");"
  },
  {
    question: "Can an array of primitives (`int[]`) be passed to a varargs of Objects (`Object... args`)?",
    shortAnswer: "In Java, `int[]` is an `Object`, so passing `int[]` to `Object...` treats the entire integer array as a SINGLE element (an array of length 1 containing the `int[]`)!",
    explanation: "Primitive array wrapping in Object varargs trap.",
    hint: "int[] is treated as a single Object element, producing an Object[1] array.",
    level: "advanced",
    codeExample: "void m(Object... x) { System.out.println(x.length); } int[] a = {1,2,3}; m(a); // Prints 1!"
  },
  {
    question: "What happens if an array of reference types (`String[]`) is passed to `Object... args`?",
    shortAnswer: "`String[]` is an `Object[]`, so its elements are unpacked directly; `x.length` equals the number of strings in the array.",
    explanation: "Reference array unpacking in Object varargs.",
    hint: "Reference arrays are unpacked into Object... so length matches element count.",
    level: "advanced",
    codeExample: "String[] s = {\"A\", \"B\"}; m(s); // Prints 2"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the total fee computed for Shyamnagar using `preAllocatedFees`?",
    shortAnswer: "₹16,000 + ₹19,000 + ₹21,000 = ₹56,000.00 in Indian Rupees (₹).",
    explanation: "Pre-allocated array passing calculation.",
    hint: "₹56,000.00 total.",
    level: "basic",
    codeExample: "calculateBatchTotal(\"Shyamnagar\", preAllocatedFees); // ₹56,000.00"
  },
  {
    question: "Can a constructor declare a Varargs parameter?",
    shortAnswer: "YES! Constructors can declare varargs parameters (e.g. `public CourseBatch(String name, Student... students)`).",
    explanation: "Varargs constructor declarations.",
    hint: "Yes, constructors can declare a varargs parameter as the last argument.",
    level: "basic",
    codeExample: "public Batch(String name, Student... students) { ... }"
  },
  {
    question: "What reflection method is used to invoke a varargs method programmatically?",
    shortAnswer: "`Method.invoke(instance, (Object) new Object[]{args})` passing the packed arguments array.",
    explanation: "Reflection invocation with varargs.",
    hint: "Method.invoke() passing an array of arguments.",
    level: "advanced",
    codeExample: "method.invoke(null, new Object[]{new double[]{1000.0, 2000.0}});"
  },
  {
    question: "What is the ultimate takeaway of Module 001_007 Topic 10 for Java developers?",
    shortAnswer: "Varargs (`Type...`) allows 0 to N arguments by wrapping them in an internal array. It must be the single, last parameter in the method signature, and calling it with zero arguments creates a non-null empty array.",
    explanation: "Mastery of variable arguments.",
    hint: "Varargs simplifies multi-argument calls; must be the single last parameter.",
    level: "basic",
    codeExample: "// Summary: Type... varName (Single, Last parameter; converts to Type[])"
  },
  {
    question: "What is the next topic (Topic 11) in Module 001_007?",
    shortAnswer: "Static methods vs Instance methods (introductory comparison).",
    explanation: "Topic 11 explores class-level static methods vs object-level instance methods and the 'this' reference.",
    hint: "Static methods vs Instance methods (introductory comparison).",
    level: "basic",
    codeExample: "// Topic 11: Static Methods vs Instance Methods"
  },
  {
    question: "Can an interface default method declare a Varargs parameter?",
    shortAnswer: "YES! Interface default methods can declare varargs parameters just like regular class methods.",
    explanation: "Interface default method varargs compatibility.",
    hint: "Yes, interface default methods can use varargs.",
    level: "basic",
    codeExample: "public interface Logger { default void log(String... lines) { ... } }"
  }
];

export default questions;
