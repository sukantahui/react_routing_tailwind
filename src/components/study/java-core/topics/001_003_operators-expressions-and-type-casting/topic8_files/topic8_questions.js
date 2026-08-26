/**
 * Module 001_003: Topic 8: Equality check: primitive == value comparison vs object reference comparison
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the fundamental difference between `==` for primitive types and `==` for object reference types in Java?",
    shortAnswer: "For primitives, `==` compares raw bit values in stack memory; for objects, `==` compares memory addresses (reference identity) in the Heap.",
    explanation: "`int a = 5, b = 5; a == b` compares the number 5. For objects `obj1 == obj2`, it tests whether both pointers reference the exact same heap memory address.",
    hint: "Primitive = value equality; Object = memory address identity.",
    level: "basic",
    codeExample: "int a = 10, b = 10; // a == b is true (values match)\nStudent s1 = new Student();\nStudent s2 = new Student(); // s1 == s2 is false (different heap addresses)"
  },
  {
    question: "What does the `.equals()` method do by default in `java.lang.Object`?",
    shortAnswer: "In the default `Object` class, `.equals()` simply executes `this == obj` (reference identity comparison).",
    explanation: "Classes like `String`, `Integer`, `Double`, `Date`, etc., override `.equals()` to compare logical contents rather than memory addresses.",
    hint: "Default Object.equals() is identical to ==.",
    level: "basic",
    codeExample: "// In java.lang.Object:\n// public boolean equals(Object obj) { return (this == obj); }"
  },
  {
    question: "Why does `String s1 = \"Barrackpore\"; String s2 = \"Barrackpore\"; s1 == s2` evaluate to `true`?",
    shortAnswer: "Because String literals are stored in the String Constant Pool, so both variables point to the exact same canonical `String` instance.",
    explanation: "JVM optimizes memory by reusing identical string literals from the constant pool.",
    hint: "String Constant Pool shares identical string literals.",
    level: "basic",
    codeExample: "String s1 = \"Java\";\nString s2 = \"Java\";\nSystem.out.println(s1 == s2); // true (Same pool object)"
  },
  {
    question: "Why does `new String(\"Barrackpore\") == new String(\"Barrackpore\")` evaluate to `false`?",
    shortAnswer: "Because the `new` keyword explicitly allocates a brand new distinct object on the Heap for each call, resulting in different memory addresses.",
    explanation: "Although the text characters are identical, the memory addresses are different.",
    hint: "new keyword always creates a new heap object.",
    level: "basic",
    codeExample: "String s1 = new String(\"Java\");\nString s2 = new String(\"Java\");\nSystem.out.println(s1 == s2);      // false (Different memory)\nSystem.out.println(s1.equals(s2)); // true (Same characters)"
  },
  {
    question: "What does the `String.intern()` method do?",
    shortAnswer: "It returns the canonical String instance from the String Constant Pool, adding it to the pool if it does not already exist.",
    explanation: "Calling `new String(\"A\").intern()` returns the pooled reference.",
    hint: "Returns the constant pool reference.",
    level: "intermediate",
    codeExample: "String s1 = \"Java\";\nString s2 = new String(\"Java\");\nSystem.out.println(s1 == s2.intern()); // true"
  },
  {
    question: "What is the Integer Cache Trap in Java (e.g. `Integer a = 100, b = 100; a == b` vs `Integer c = 200, d = 200; c == d`)?",
    shortAnswer: "`100 == 100` is `true` because the JVM caches `Integer` objects from `-128` to `127`; `200 == 200` is `false` because values outside that range allocate new distinct Heap objects!",
    explanation: "Autoboxing calls `Integer.valueOf()`, which caches bytes `[-128, 127]`. Comparing wrapper objects with `==` causes intermittent, catastrophic production bugs.",
    hint: "Integer cache only covers -128 to 127.",
    level: "intermediate",
    codeExample: "Integer x = 100, y = 100; // x == y is TRUE (cached)\nInteger p = 200, q = 200; // p == q is FALSE (distinct objects!)"
  },
  {
    question: "How should wrapper objects (`Integer`, `Long`, `Double`, `Boolean`) always be compared in production?",
    shortAnswer: "Using `.equals()` or `Objects.equals(a, b)`.",
    explanation: "Never use `==` to compare wrapper object values.",
    hint: "Always use .equals() or Objects.equals().",
    level: "basic",
    codeExample: "Integer a = 200, b = 200;\nboolean match = Objects.equals(a, b); // true (Safe!)"
  },
  {
    question: "What is the advantage of `java.util.Objects.equals(Object a, Object b)` over `a.equals(b)`?",
    shortAnswer: "`Objects.equals()` is null-safe: if `a` is `null`, it returns `false` (or `true` if both are null) without throwing `NullPointerException`.",
    explanation: "`a.equals(b)` crashes with `NullPointerException` if `a` is null.",
    hint: "Prevents NullPointerException when left operand is null.",
    level: "basic",
    codeExample: "String user = null;\nboolean safe = Objects.equals(user, \"admin\"); // false (No crash)"
  },
  {
    question: "What is the Literal-First (Yoda condition) comparison pattern in Java?",
    shortAnswer: "Writing `\"literal\".equals(variable)` instead of `variable.equals(\"literal\")` to avoid `NullPointerException`.",
    explanation: "Because `\"literal\"` is guaranteed non-null, calling `.equals()` on it is 100% crash-proof.",
    hint: "\"Literal\".equals(variable) avoids NullPointerException.",
    level: "basic",
    codeExample: "String role = null;\nif (\"ADMIN\".equals(role)) { } // Safe! (Returns false without NPE)"
  },
  {
    question: "What contract must be satisfied when overriding `equals()` in a custom Java class?",
    shortAnswer: "You MUST also override `hashCode()` so that equal objects produce identical hash codes.",
    explanation: "Violating the `equals()` / `hashCode()` contract breaks `HashMap`, `HashSet`, and `HashTable` collections.",
    hint: "Always override hashCode() whenever equals() is overridden.",
    level: "intermediate",
    codeExample: "@Override\npublic boolean equals(Object o) { ... }\n@Override\npublic int hashCode() { return Objects.hash(id, name); }"
  },
  {
    question: "What are the 5 mathematical properties required of the `equals()` method contract (JLS & Object class)?",
    shortAnswer: "1. Reflexive (`x.equals(x)` is true)\n2. Symmetric (`x.equals(y) == y.equals(x)`)\n3. Transitive (`x.equals(y)` and `y.equals(z)` implies `x.equals(z)`)\n4. Consistent (multiple invocations return identical results)\n5. Non-nullity (`x.equals(null)` is false).",
    explanation: "These 5 mathematical axioms ensure predictable behavior across Java collections and algorithms.",
    hint: "Reflexive, Symmetric, Transitive, Consistent, Non-null.",
    level: "advanced",
    codeExample: "// Verified in custom domain class equals() methods"
  },
  {
    question: "What is the result of `\"hello\" == \"hel\" + \"lo\"` in Java?",
    shortAnswer: "`true`.",
    explanation: "Because both operands are compile-time string constants, the compiler performs Constant Inlining and evaluates `\"hel\" + \"lo\"` to `\"hello\"` at compile time, sharing the same pool entry.",
    hint: "Compile-time constant string concatenation is pooled.",
    level: "intermediate",
    codeExample: "String s1 = \"hello\";\nString s2 = \"hel\" + \"lo\";\nSystem.out.println(s1 == s2); // true"
  },
  {
    question: "What is the result of `String sub = \"lo\"; \"hello\" == (\"hel\" + sub)` in Java?",
    shortAnswer: "`false`.",
    explanation: "Because `sub` is a variable (not a constant), `\"hel\" + sub` creates a new `String` at runtime on the Heap rather than resolving to the compile-time constant pool.",
    hint: "Concatenation with a variable produces a new heap object at runtime.",
    level: "intermediate",
    codeExample: "String s1 = \"hello\";\nString sub = \"lo\";\nString s2 = \"hel\" + sub;\nSystem.out.println(s1 == s2); // false"
  },
  {
    question: "What is the result of `final String sub = \"lo\"; \"hello\" == (\"hel\" + sub)` in Java?",
    shortAnswer: "`true`.",
    explanation: "Because `sub` is `final` and initialized with a constant literal, the compiler treats `\"hel\" + sub` as a compile-time constant expression and inlines it to `\"hello\"`.",
    hint: "final variable with literal initializer enables compile-time inlining.",
    level: "advanced",
    codeExample: "String s1 = \"hello\";\nfinal String sub = \"lo\";\nString s2 = \"hel\" + sub;\nSystem.out.println(s1 == s2); // true"
  },
  {
    question: "How does `Arrays.equals(int[] a, int[] b)` compare array objects?",
    shortAnswer: "It compares the array lengths and the elements at corresponding indices for value equality, whereas `a == b` only compares array reference addresses.",
    explanation: "Arrays inherit `Object.equals()` which performs reference comparison. `Arrays.equals()` checks actual element values.",
    hint: "Use Arrays.equals() to compare array contents.",
    level: "intermediate",
    codeExample: "int[] a = {1, 2, 3};\nint[] b = {1, 2, 3};\nSystem.out.println(a == b);            // false\nSystem.out.println(Arrays.equals(a, b)); // true"
  },
  {
    question: "What does `Arrays.deepEquals(Object[] a, Object[] b)` do?",
    shortAnswer: "It recursively compares multidimensional arrays or nested object arrays for deep content equality.",
    explanation: "Deep equals traverses nested sub-arrays at arbitrary depths.",
    hint: "Used for multidimensional arrays.",
    level: "advanced",
    codeExample: "String[][] m1 = {{\"A\"}};\nString[][] m2 = {{\"A\"}};\nSystem.out.println(Arrays.deepEquals(m1, m2)); // true"
  },
  {
    question: "Can two different objects have the same `hashCode` but not be equal via `equals()`?",
    shortAnswer: "Yes, this is called a Hash Collision.",
    explanation: "Because `hashCode()` maps infinite possible objects to a 32-bit integer range ($2^{32}$), distinct objects can produce identical hash codes.",
    hint: "Hash collisions: equal objects must have same hash, but same hash doesn't mean equal.",
    level: "intermediate",
    codeExample: "String s1 = \"FB\";\nString s2 = \"Ea\";\nSystem.out.println(s1.hashCode() == s2.hashCode()); // true (Hash collision!)\nSystem.out.println(s1.equals(s2));                 // false"
  },
  {
    question: "What is the result of `Boolean.valueOf(true) == Boolean.TRUE`?",
    shortAnswer: "`true`.",
    explanation: "`Boolean.valueOf()` returns the singleton static constants `Boolean.TRUE` or `Boolean.FALSE`.",
    hint: "Boolean wrapper caches TRUE and FALSE singletons.",
    level: "basic",
    codeExample: "boolean b = (Boolean.valueOf(true) == Boolean.TRUE); // true"
  },
  {
    question: "What is the result of `new Boolean(true) == new Boolean(true)`?",
    shortAnswer: "`false` (and deprecated since Java 9!).",
    explanation: "`new` allocates distinct objects on the Heap. Constructing wrappers with `new` is deprecated; always use `Boolean.valueOf()` or autoboxing.",
    hint: "new Boolean() creates distinct objects (deprecated).",
    level: "basic",
    codeExample: "Boolean b1 = new Boolean(true);\nBoolean b2 = new Boolean(true);\nSystem.out.println(b1 == b2); // false"
  },
  {
    question: "How does `BigDecimal.compareTo(BigDecimal other)` differ from `BigDecimal.equals(Object other)`?",
    shortAnswer: "`compareTo()` compares numeric values ignoring scale (e.g. `2.0` equals `2.00`); `.equals()` requires both value AND scale to match exactly (`2.0.equals(2.00)` is `false`).",
    explanation: "`new BigDecimal(\"2.0\").equals(new BigDecimal(\"2.00\"))` is `false`, but `compareTo()` returns `0` (equal).",
    hint: "compareTo() ignores scale; equals() enforces exact scale match.",
    level: "advanced",
    codeExample: "BigDecimal d1 = new BigDecimal(\"2.0\");\nBigDecimal d2 = new BigDecimal(\"2.00\");\nSystem.out.println(d1.equals(d2));          // false\nSystem.out.println(d1.compareTo(d2) == 0); // true"
  },
  {
    question: "What is the recommended idiom for comparing `enum` values in Java?",
    shortAnswer: "Use `==` (e.g. `status == EnrollmentStatus.ACTIVE`).",
    explanation: "Because `enum` constants are strictly JVM singletons, `==` is safe, null-safe, and checked at compile time.",
    hint: "== is best practice for enum comparison.",
    level: "basic",
    codeExample: "if (studentStatus == Status.ENROLLED) { }"
  },
  {
    question: "What happens when comparing a primitive to a wrapper using `==` (e.g. `int 10 == Integer.valueOf(10)`)?",
    shortAnswer: "Evaluates to `true` because Java automatically unboxes the wrapper object to its primitive `int` before comparison.",
    explanation: "Unboxing extracts the primitive value.",
    hint: "Wrapper is unboxed to primitive for comparison.",
    level: "basic",
    codeExample: "int p = 10;\nInteger w = 10;\nSystem.out.println(p == w); // true (Unboxing occurs)"
  },
  {
    question: "What danger occurs when unboxing a null wrapper during `==` comparison with a primitive (`int p = 10; Integer w = null; boolean b = (p == w);`)?",
    shortAnswer: "Throws `java.lang.NullPointerException` at runtime!",
    explanation: "Unboxing `w.intValue()` on a `null` reference causes an immediate crash.",
    hint: "Unboxing null throws NullPointerException.",
    level: "intermediate",
    codeExample: "Integer w = null;\n// boolean bad = (10 == w); // THROWS NullPointerException!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student enrollment system, how is student identity verified?",
    shortAnswer: "By overriding `.equals()` to verify that student roll number, course fee in Indian Rupees (₹), and student name match.",
    explanation: "Custom domain classes must override `equals()` and `hashCode()` to compare business state rather than heap pointers.",
    hint: "Override equals() and hashCode() on domain entities.",
    level: "basic",
    codeExample: "Student s1 = new Student(101, \"Swadeep\", 15000.0);\nStudent s2 = new Student(101, \"Swadeep\", 15000.0);\nboolean match = s1.equals(s2); // true"
  },
  {
    question: "What is the result of `null == null` in Java?",
    shortAnswer: "`true`.",
    explanation: "Two null references are always equal.",
    hint: "null == null is true.",
    level: "basic",
    codeExample: "boolean b = (null == null); // true"
  },
  {
    question: "What is the result of `\"abc\".equals(null)` in Java?",
    shortAnswer: "`false` (does not throw an exception).",
    explanation: "The `.equals()` contract specifies that passing `null` must safely return `false`.",
    hint: ".equals(null) safely returns false.",
    level: "basic",
    codeExample: "boolean b = \"abc\".equals(null); // false"
  },
  {
    question: "Can the JVM Integer cache range `[-128, 127]` be expanded?",
    shortAnswer: "Yes, the upper bound can be increased using the JVM argument `-XX:AutoBoxCacheMax=<size>`.",
    explanation: "The lower bound is fixed at `-128`, but the upper bound can be tuned for high-volume enterprise systems.",
    hint: "-XX:AutoBoxCacheMax expands the upper cache limit.",
    level: "expert",
    codeExample: "// java -XX:AutoBoxCacheMax=1000 MyApplication"
  },
  {
    question: "What is the best way to compare two `Double` or `Float` wrapper objects?",
    shortAnswer: "Use `Double.compare(d1, d2) == 0` or `d1.equals(d2)`.",
    explanation: "Properly handles `+0.0` vs `-0.0` and `NaN` states.",
    hint: "Double.compare or .equals().",
    level: "intermediate",
    codeExample: "Double d1 = 0.0 / 0.0, d2 = Double.NaN;\nSystem.out.println(d1.equals(d2)); // true"
  },
  {
    question: "What is the ultimate takeaway of Topic 8 for Java developers?",
    shortAnswer: "Always use `==` for primitives, but ALWAYS use `.equals()` or `Objects.equals()` for Objects and Wrapper classes to prevent subtle memory reference and caching bugs.",
    explanation: "Mastering the distinction between stack bit comparison and heap address identity is one of the most critical fundamentals in Java programming.",
    hint: "Primitives use ==; Objects use .equals().",
    level: "basic",
    codeExample: "// Summary: primitive == primitive (values match); object.equals(object) (contents match)"
  },
  {
    question: "What is the next topic (Topic 9) in Module 001_003?",
    shortAnswer: "Logical operators: Logical AND (&&), Logical OR (||), Logical NOT (!).",
    explanation: "Topic 9 covers boolean logic operations, truth tables, and composite condition formulation.",
    hint: "Logical operators in Java.",
    level: "basic",
    codeExample: "// Topic 9: &&, ||, !"
  }
];

export default questions;
