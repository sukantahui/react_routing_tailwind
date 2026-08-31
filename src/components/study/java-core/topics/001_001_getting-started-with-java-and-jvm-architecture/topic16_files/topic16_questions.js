const questions = [
  {
    question: "What is a `NullPointerException` (NPE) and what operations trigger it in Java?",
    shortAnswer: "An unchecked RuntimeException thrown when an application attempts to use an object reference that points to `null`.",
    explanation: "Triggered by calling methods on null (`null.toString()`), accessing fields on null, unboxing null wrapper objects, or taking the length of null.",
    hint: "Attempting to access members of a null reference.",
    level: "basic",
    codeExample: "String s = null;\n// s.length(); → Throws NullPointerException"
  },
  {
    question: "What is the 'Helpful NullPointerExceptions' feature introduced in Java 14 (JEP 358)?",
    shortAnswer: "The JVM precise stack trace shows exactly which variable in a chained call was null.",
    explanation: "Instead of a generic NPE on `a.getB().getC().getName()`, the JVM outputs: `Cannot invoke \"B.getC()\" because the return value of \"a.getB()\" is null`.",
    hint: "Pinpoints the exact null expression in chained calls.",
    level: "intermediate",
    codeExample: "// Stack trace: Cannot invoke \"String.toUpperCase()\" because \"name\" is null"
  },
  {
    question: "What is an `ArrayIndexOutOfBoundsException` and how do you prevent it?",
    shortAnswer: "Thrown when accessing an array index that is negative or greater than or equal to `array.length`.",
    explanation: "Java arrays are 0-indexed ($0$ to $length - 1$). Prevent by verifying `index >= 0 && index < arr.length`, or using enhanced for-each loops.",
    hint: "Array index < 0 or >= length.",
    level: "basic",
    codeExample: "int[] arr = new int[5];\n// int val = arr[5]; → Throws ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5"
  },
  {
    question: "What is a `ClassCastException` and how is it safely prevented in modern Java?",
    shortAnswer: "Thrown when casting an object to a class of which it is not an instance; prevented using Pattern Matching `instanceof`.",
    explanation: "Using `if (obj instanceof String s)` ensures that the cast only executes if the object is genuinely an instance of String.",
    hint: "Illegal downcast prevented by instanceof.",
    level: "basic",
    codeExample: "Object obj = Integer.valueOf(10);\n// String s = (String) obj; → Throws ClassCastException\nif (obj instanceof String s) { System.out.println(s); }"
  },
  {
    question: "What is a `StackOverflowError` and what typically causes it in Java programs?",
    shortAnswer: "A JVM Error thrown when thread stack memory is exhausted, usually caused by infinite method recursion.",
    explanation: "Every method invocation pushes a new Stack Frame. If recursion lacks a base termination condition, the stack fills up to `-Xss` limit and crashes.",
    hint: "Infinite recursive method calls exhausting thread stack.",
    level: "basic",
    codeExample: "public static void recursive() {\n    recursive(); // Throws StackOverflowError\n}"
  },
  {
    question: "What is an `OutOfMemoryError: Java heap space` (OOM)?",
    shortAnswer: "A JVM Error thrown when the Garbage Collector cannot reclaim sufficient memory in the Heap to allocate new objects.",
    explanation: "Caused by memory leaks, accumulating objects in static collections without clearing, or configuring an insufficient maximum heap size (`-Xmx`).",
    hint: "Heap memory exhausted by active live objects.",
    level: "basic",
    codeExample: "List<byte[]> list = new ArrayList<>();\nwhile(true) list.add(new byte[1024 * 1024]); // OOM: Java heap space"
  },
  {
    question: "What is an `ArithmeticException: / by zero` in Java?",
    shortAnswer: "Thrown when an integer division or modulo operation attempts to divide by integer zero (`0`).",
    explanation: "Note: Floating-point division by zero (`10.0 / 0.0`) does NOT throw an exception; it returns `Infinity` or `NaN`.",
    hint: "Integer division by zero throws ArithmeticException.",
    level: "basic",
    codeExample: "int x = 10 / 0; // Throws ArithmeticException: / by zero\ndouble d = 10.0 / 0.0; // Evaluates to Double.POSITIVE_INFINITY"
  },
  {
    question: "What is a `NumberFormatException` in Java?",
    shortAnswer: "Thrown when attempting to parse an invalid string into a numeric type (e.g. `Integer.parseInt(\"abc\")`).",
    explanation: "Subclass of `IllegalArgumentException`. Prevent by validating string formatting with regex or wrapping in a `try-catch` block.",
    hint: "Invalid string format for numeric parsing.",
    level: "basic",
    codeExample: "int age = Integer.parseInt(\"twenty\"); // Throws NumberFormatException"
  },
  {
    question: "What is a `StringIndexOutOfBoundsException`?",
    shortAnswer: "Thrown by String methods (like `charAt`, `substring`) when index is negative or greater than `string.length()`.",
    explanation: "Similar to array bounds, String character indexing starts at $0$ and ends at $length() - 1$.",
    hint: "String charAt() index out of range.",
    level: "basic",
    codeExample: "String s = \"Java\";\nchar c = s.charAt(10); // Throws StringIndexOutOfBoundsException"
  },
  {
    question: "What is the difference between `Exception` and `Error` in Java's `Throwable` hierarchy?",
    shortAnswer: "Exceptions represent recoverable conditions an application might want to catch; Errors represent serious JVM environmental failures.",
    explanation: "Applications should catch `Exception` (and its subclasses), but should generally NOT attempt to catch `Error` (like `OutOfMemoryError` or `StackOverflowError`).",
    hint: "Recoverable application issues (Exception) vs Serious JVM failures (Error).",
    level: "intermediate",
    codeExample: "// Throwable → Exception (Checked/Unchecked) and Error (System/JVM)"
  },
  {
    question: "What is an `IllegalArgumentException`?",
    shortAnswer: "Thrown to indicate that a method has been passed an illegal or inappropriate argument value.",
    explanation: "Commonly thrown by defensive validation methods (e.g. if `score < 0 || score > 100`).",
    hint: "Invalid method parameter value.",
    level: "basic",
    codeExample: "if (age < 0) throw new IllegalArgumentException(\"Age cannot be negative\");"
  },
  {
    question: "What is an `IllegalStateException`?",
    shortAnswer: "Thrown when a method is invoked at an illegal or inappropriate time in an object's lifecycle.",
    explanation: "For example, calling `Iterator.remove()` before calling `Iterator.next()`, or starting a thread that has already terminated.",
    hint: "Method invoked in invalid object state.",
    level: "intermediate",
    codeExample: "Thread t = new Thread(); t.start(); t.start(); // Second start() throws IllegalStateException"
  },
  {
    question: "What is a `NoSuchElementException`?",
    shortAnswer: "Thrown by collection iterators or `Scanner` when attempting to read elements beyond the available sequence.",
    explanation: "Calling `iterator.next()` or `scanner.nextInt()` without first checking `hasNext()` throws this exception.",
    hint: "Calling next() when hasNext() is false.",
    level: "basic",
    codeExample: "Iterator<String> it = list.iterator();\nwhile(it.hasNext()) { String item = it.next(); }"
  },
  {
    question: "What is a `ConcurrentModificationException` (CME)?",
    shortAnswer: "Thrown when a collection is modified (added/removed) while iterating over it using a standard for-each loop.",
    explanation: "Java collections use fail-fast iterators with a `modCount`. To safely remove elements during iteration, use `Iterator.remove()` or `Collection.removeIf()`.",
    hint: "Modifying a collection during for-each iteration.",
    level: "intermediate",
    codeExample: "// Fix: list.removeIf(item → item.equals(\"expired\"));"
  },
  {
    question: "What is an `UnsupportedOperationException`?",
    shortAnswer: "Thrown when an invoked method is not supported by the underlying implementation (e.g. modifying an unmodifiable list).",
    explanation: "`List.of(\"a\", \"b\").add(\"c\")` throws `UnsupportedOperationException` because `List.of()` returns an immutable list.",
    hint: "Attempting to mutate an immutable collection.",
    level: "intermediate",
    codeExample: "List<String> immutable = List.of(\"A\", \"B\");\n// immutable.add(\"C\"); → Throws UnsupportedOperationException"
  },
  {
    question: "How does Java unboxing trigger hidden NullPointerExceptions?",
    shortAnswer: "When an automatic unboxing occurs on a wrapper object whose value is `null` (e.g. `Integer n = null; int x = n;`).",
    explanation: "javac translates `int x = n;` into `int x = n.intValue();`. Since `n` is null, calling `intValue()` throws NPE.",
    hint: "Unboxing null invokes .intValue() which throws NPE.",
    level: "intermediate",
    codeExample: "Integer boxed = null;\nint primitive = boxed; // Throws NullPointerException!"
  },
  {
    question: "What is an `ArrayStoreException` in Java?",
    shortAnswer: "Thrown when attempting to store the wrong type of object into an array of objects due to array covariance.",
    explanation: "Java arrays are covariant (`Object[] arr = new String[5];`). Storing an `Integer` (`arr[0] = 100;`) passes compiler checks but throws ArrayStoreException at runtime.",
    hint: "Array covariance type violation at runtime.",
    level: "advanced",
    codeExample: "Object[] arr = new String[3];\n// arr[0] = Integer.valueOf(42); → Throws ArrayStoreException"
  },
  {
    question: "What is `NegativeArraySizeException` in Java?",
    shortAnswer: "Thrown if an application attempts to allocate an array with a negative size dimension (e.g. `new int[-5]`).",
    explanation: "Array sizes in Java must be non-negative integers ($\ge 0$).",
    hint: "Negative array dimension.",
    level: "basic",
    codeExample: "int size = -1;\n// int[] arr = new int[size]; → Throws NegativeArraySizeException"
  },
  {
    question: "What is `NoClassDefFoundError` and how does it differ from `ClassNotFoundException`?",
    shortAnswer: "`ClassNotFoundException` occurs when a class cannot be found by dynamic reflection; `NoClassDefFoundError` occurs when a class present at compile-time is missing at runtime.",
    explanation: "NoClassDefFoundError typically happens when a dependent JAR was available during `javac` compilation but missing from the runtime classpath during `java` execution.",
    hint: "Compile-time dependency missing from runtime classpath.",
    level: "advanced",
    codeExample: "// NoClassDefFoundError: Class compiled successfully, but missing at runtime."
  },
  {
    question: "What is `ExceptionInInitializerError` in Java?",
    shortAnswer: "Thrown when an unexpected exception occurs inside a `static` initialization block or during static field initialization.",
    explanation: "The JVM wraps any uncaught runtime exception thrown during `<clinit>` class initialization inside an `ExceptionInInitializerError`.",
    hint: "Exception thrown during static { } initialization.",
    level: "advanced",
    codeExample: "static {\n    String s = null;\n    s.length(); // Throws ExceptionInInitializerError\n}"
  },
  {
    question: "What is `java.util.Objects.requireNonNull()` used for in defensive programming?",
    shortAnswer: "To fail-fast by validating that a constructor parameter or method argument is not null, throwing an NPE with a clear custom message.",
    explanation: "Checking arguments at method entry prevents corrupted state from propagating deep into internal object graphs.",
    hint: "Fail-fast null validation.",
    level: "intermediate",
    codeExample: "public Student(String name) {\n    this.name = Objects.requireNonNull(name, \"Student name cannot be null\");\n}"
  },
  {
    question: "What is the `java.util.Optional<T>` class and how does it reduce NullPointerExceptions?",
    shortAnswer: "A container object that explicitly represents either the presence of a value or an empty state, forcing callers to handle nullability.",
    explanation: "Methods returning `Optional<User>` communicate clearly in their API signature that a user might not exist, preventing silent null references.",
    hint: "Explicit container for nullable return values.",
    level: "intermediate",
    codeExample: "Optional<User> user = findById(42);\nuser.ifPresent(u → System.out.println(u.getName()));"
  },
  {
    question: "How do you defend against `ArrayIndexOutOfBoundsException` when parsing `String[] args` in `main()`?",
    shortAnswer: "Always check `if (args.length >= expectedCount)` before accessing `args[0]` or `args[1]`.",
    explanation: "Never assume arguments were passed; provide a helpful usage banner if `args.length == 0`.",
    hint: "Verify args.length before index access.",
    level: "basic",
    codeExample: "if (args.length < 2) {\n    System.err.println(\"Usage: java App <username> <port>\");\n    return;\n}"
  },
  {
    question: "What is the difference between Checked and Unchecked Exceptions in Java?",
    shortAnswer: "Unchecked exceptions (subclasses of `RuntimeException`) do not require explicit `try-catch` or `throws`; Checked exceptions are enforced by javac.",
    explanation: "NPE, ArrayIndexOutOfBounds, and ClassCastException are all unchecked RuntimeExceptions representing programmer logic bugs.",
    hint: "RuntimeException subclasses are unchecked.",
    level: "basic",
    codeExample: "// NullPointerException → Unchecked\n// IOException → Checked"
  },
  {
    question: "What is a 'Fail-Fast' vs 'Fail-Safe' iterator behavior regarding runtime errors?",
    shortAnswer: "Fail-fast iterators throw `ConcurrentModificationException` immediately upon concurrent modification; Fail-safe iterators work on a clone.",
    explanation: "`ArrayList` iterator is fail-fast; `CopyOnWriteArrayList` iterator is fail-safe and never throws ConcurrentModificationException.",
    hint: "Immediate CME vs Safe iteration over snapshot.",
    level: "advanced",
    codeExample: "// CopyOnWriteArrayList provides fail-safe iteration."
  },
  {
    question: "What is `OutOfMemoryError: Metaspace` and what causes it?",
    shortAnswer: "Thrown when class metadata exceeds configured Metaspace limits (`-XX:MaxMetaspaceSize`), caused by dynamic bytecode generation leaks.",
    explanation: "Frameworks using CGLIB or dynamic proxies can leak class definitions if ClassLoaders are not properly garbage collected.",
    hint: "Metaspace class metadata exhaustion.",
    level: "expert",
    codeExample: "// -XX:MaxMetaspaceSize=256m"
  },
  {
    question: "How do you read and interpret a Java Exception Stack Trace?",
    shortAnswer: "Read from top to bottom: Exception name + message → Topmost stack frame indicates exact class, method, and line number where the crash occurred.",
    explanation: "Example: `at com.example.App.calculate(App.java:42)` tells you line 42 of `App.java` triggered the exception.",
    hint: "Top frame shows exact line of origin.",
    level: "basic",
    codeExample: "// Exception in thread \"main\" java.lang.NullPointerException: ... at App.java:42"
  },
  {
    question: "Why should developers NEVER catch `Throwable` or `Error` in application try-catch blocks?",
    shortAnswer: "Catching `Error` suppresses catastrophic JVM failures (like OOM or StackOverflow), leaving the JVM in an unpredictable, corrupted state.",
    explanation: "When an Error occurs, the JVM cannot guarantee system invariants. The process should crash and allow container orchestrators to restart cleanly.",
    hint: "Catching Error suppresses fatal JVM crashes.",
    level: "intermediate",
    codeExample: "// Anti-pattern: catch (Throwable t) { }\n// Best practice: catch (Exception e) { }"
  },
  {
    question: "What is Defensive Programming and how does it prevent runtime errors?",
    shortAnswer: "A coding discipline where methods validate inputs, verify state invariants, and check boundaries before performing operations.",
    explanation: "Defensive code checks for nulls, validates array bounds, uses pattern matching, and returns sensible defaults rather than crashing.",
    hint: "Input validation and boundary checking.",
    level: "basic",
    codeExample: "// Defensive: if (input != null && !input.isEmpty()) { ... }"
  },
  {
    question: "How does mastering common runtime errors empower you as an enterprise software developer?",
    shortAnswer: "It allows you to write resilient, fault-tolerant code that handles edge cases gracefully and survives unexpected real-world production inputs.",
    explanation: "Senior engineers don't write fragile code that crashes on nulls or bad indices; they anticipate edge conditions, validate boundaries, and design self-healing architectures.",
    hint: "Fault-tolerant, enterprise-grade resilience.",
    level: "basic",
    codeExample: "// Resilient Architecture → Zero Unexpected Production Crashes."
  }
];

export default questions;
