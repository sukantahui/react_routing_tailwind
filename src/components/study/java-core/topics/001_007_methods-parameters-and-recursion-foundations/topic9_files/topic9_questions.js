/**
 * Module 001_007: Topic 9: Automatic type promotion in method overloading resolution
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is Automatic Type Promotion in Method Overloading resolution?",
    shortAnswer: "When an exact parameter type match is not found, the Java compiler automatically promotes (widens) smaller primitive argument types to larger compatible primitive types to find a matching method (JLS §15.12.2).",
    explanation: "Core mechanism of primitive widening in method invocation.",
    hint: "Automatically widens smaller primitive types to larger types when no exact match exists.",
    level: "basic",
    codeExample: "void m(double d) {} m(10); // int 10 promoted to double 10.0"
  },
  {
    question: "What is the 4-tier Resolution Priority Hierarchy in Java method overloading?",
    shortAnswer: "1. **Exact Match** (Priority 1) > 2. **Primitive Widening Promotion** (Priority 2) > 3. **Autoboxing / Unboxing** (Priority 3) > 4. **Varargs** (Priority 4).",
    explanation: "Official 4-tier resolution hierarchy in JLS §15.12.2.",
    hint: "Exact Match > Widening > Autoboxing > Varargs.",
    level: "basic",
    codeExample: "// Exact > Widening > Autoboxing > Varargs"
  },
  {
    question: "What is the primitive type promotion sequence for integer and floating-point types?",
    shortAnswer: "`byte` $\to$ `short` $\to$ `int` $\to$ `long` $\to$ `float` $\to$ `double`; and `char` $\to$ `int` $\to$ `long` $\to$ `float` $\to$ `double`.",
    explanation: "Widening primitive conversions chart (JLS §5.1.2).",
    hint: "byte -> short -> int -> long -> float -> double (and char -> int).",
    level: "basic",
    codeExample: "byte b = 1; -> short -> int -> long -> float -> double"
  },
  {
    question: "If a class defines `void test(long x)` and `void test(Integer x)`, which method is invoked when calling `test(10)` with an `int`?",
    shortAnswer: "`test(long x)` is invoked because **Primitive Widening ALWAYS beats Autoboxing** in the Java resolution hierarchy.",
    explanation: "Fundamental JLS rule: widening takes precedence over autoboxing.",
    hint: "test(long) is called because primitive widening beats autoboxing.",
    level: "intermediate",
    codeExample: "evaluatePriority(10); // Invokes evaluatePriority(long)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what happened when `byte token = 50;` was passed to `processFee(token)`?",
    shortAnswer: "The `byte` was automatically promoted to `int`, invoking `processFee(int)` in Indian Rupees (₹).",
    explanation: "Byte to int promotion demonstration.",
    hint: "Promoted to int, invoking processFee(int).",
    level: "basic",
    codeExample: "byte token = 50; processFee(token); // Promoted to int"
  },
  {
    question: "Can `byte` or `short` be automatically promoted to `char` during method invocation?",
    shortAnswer: "NO! `byte`/`short` to `char` is NOT a widening conversion (because `byte`/`short` are signed while `char` is unsigned 16-bit).",
    explanation: "Signed vs unsigned primitive conversion restrictions.",
    hint: "No, signed types cannot widen to unsigned char.",
    level: "intermediate",
    codeExample: "// byte -> char is NOT widening; byte -> int is widening"
  },
  {
    question: "What happens when passing `char 'A'` to `processFee()` when no `char` overload exists?",
    shortAnswer: "`char 'A'` (ASCII 65) is automatically promoted to `int`, invoking `processFee(int)` with value `65` in Indian Rupees (₹).",
    explanation: "Char to int promotion demonstration.",
    hint: "Promoted to int (65).",
    level: "basic",
    codeExample: "char c = 'A'; processFee(c); // Promoted to int 65"
  },
  {
    question: "Can an `int` be widened and THEN autoboxed in a single method call (e.g. `int` $\to$ `long` $\to$ `Long`)?",
    shortAnswer: "NO! Java allows **Widening followed by Boxing is ILLEGAL** (e.g. `int` cannot be passed to a `Long` parameter!).",
    explanation: "Single transition constraint: Boxing cannot follow Widening.",
    hint: "No, an int cannot be converted to a Long wrapper directly.",
    level: "advanced",
    codeExample: "void m(Long x) {} // m(10); COMPILE ERROR! int cannot box to Long"
  },
  {
    question: "Can an object reference undergo Boxing followed by Widening (e.g. `int` $\to$ `Integer` $\to$ `Object`)?",
    shortAnswer: "YES! An `int` can be autoboxed to `Integer` and then widened to reference supertype `Number` or `Object`.",
    explanation: "Boxing followed by Reference Widening is permitted (JLS §5.1.8).",
    hint: "Yes, int can box to Integer and then widen to Object or Number.",
    level: "advanced",
    codeExample: "void m(Object o) {} m(10); // int -> Integer -> Object (Valid!)"
  },
  {
    question: "What causes a `Compile Error: reference to methodName is ambiguous`?",
    shortAnswer: "When two or more overloaded methods match the arguments through widening with equal specificity (e.g. `m(int, double)` vs `m(double, int)` when calling `m(10, 10)`).",
    explanation: "Ambiguous method invocation resolution failure.",
    hint: "Occurs when multiple overloads match with equal priority.",
    level: "intermediate",
    codeExample: "void m(int a, double b) {} void m(double a, int b) {} // m(10, 10); AMBIGUOUS ERROR!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee ledger, how did `float floatFee = 12500.50f;` resolve?",
    shortAnswer: "Promoted from `float` to `double`, invoking `processFee(double)` in Indian Rupees (₹).",
    explanation: "Float to double promotion demonstration.",
    hint: "Promoted to double, invoking processFee(double).",
    level: "basic",
    codeExample: "float f = 12500.50f; processFee(f); // Promoted to double"
  },
  {
    question: "Why does Varargs (`int...`) have the lowest resolution priority in Java?",
    shortAnswer: "To prevent varargs methods from accidentally capturing calls intended for fixed-arity overloads, preserving backwards compatibility and precision.",
    explanation: "Varargs fallback design rationale.",
    hint: "Designed as the last fallback to avoid capturing fixed-arity calls.",
    level: "basic",
    codeExample: "void m(int x) {} void m(int... x) {} m(10); // Calls m(int)"
  },
  {
    question: "What happens if a call passes `null` to overloaded methods `m(String s)` and `m(Object o)`?",
    shortAnswer: "`m(String s)` is invoked because `String` is a more specific subtype than `Object` (Most Specific Method Rule).",
    explanation: "Most specific subtype resolution rule (JLS §15.12.2.5).",
    hint: "m(String) is chosen because String is more specific than Object.",
    level: "intermediate",
    codeExample: "void m(Object o) {} void m(String s) {} m(null); // Calls m(String)"
  },
  {
    question: "What happens if a call passes `null` to `m(String s)` and `m(Integer i)`?",
    shortAnswer: "`Compile Error: reference to m is ambiguous` because `String` and `Integer` are peer classes with neither being a subtype of the other.",
    explanation: "Peer reference ambiguity with null argument.",
    hint: "Compile error: ambiguous call because neither type is a subtype of the other.",
    level: "intermediate",
    codeExample: "void m(String s) {} void m(Integer i) {} // m(null); AMBIGUOUS ERROR!"
  },
  {
    question: "How can you resolve an ambiguous `m(null)` call between peer types?",
    shortAnswer: "By explicitly casting the `null` argument to the intended type: `m((String) null);` or `m((Integer) null);`.",
    explanation: "Explicit cast disambiguation technique.",
    hint: "Explicitly cast null: m((String) null).",
    level: "basic",
    codeExample: "m((String) null); // Disambiguates to m(String)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee ledger, why did `processFee(1000, 2000, 3000)` invoke the varargs overload?",
    shortAnswer: "Because no 3-parameter fixed-arity `processFee` existed, falling through Phase 1, 2, and 3 to match `processFee(int...)` in Indian Rupees (₹).",
    explanation: "Varargs multi-argument resolution.",
    hint: "No 3-parameter method existed, so it matched varargs.",
    level: "basic",
    codeExample: "processFee(1000, 2000, 3000); // Invokes processFee(int...)"
  },
  {
    question: "What happens if an `int` variable is passed to a method with `void m(double d)` and `void m(Double d)`?",
    shortAnswer: "`m(double d)` is invoked because primitive widening (`int` $\to$ `double`) is Phase 1, while autoboxing (`int` $\to$ `Integer` $\to$ cannot box to `Double`) fails.",
    explanation: "Primitive widening priority over boxing.",
    hint: "m(double) is invoked via primitive widening.",
    level: "intermediate",
    codeExample: "int x = 10; m(x); // Invokes m(double)"
  },
  {
    question: "Can an `Integer` object be passed to a method taking `long` (`void m(long x)`)?",
    shortAnswer: "YES! Java performs **Unboxing followed by Primitive Widening** (`Integer` $\to$ unboxed `int` $\to$ widened to `long`).",
    explanation: "Unboxing followed by primitive widening is permitted (JLS §5.1.8).",
    hint: "Yes, Integer unboxes to int and widens to long.",
    level: "advanced",
    codeExample: "void m(long l) {} Integer obj = 10; m(obj); // Unboxed to int, widened to long"
  },
  {
    question: "What is the difference between Widening Conversion and Narrowing Conversion?",
    shortAnswer: "Widening converts smaller data types to larger types automatically without data loss; Narrowing converts larger types to smaller types (requires explicit cast `(int)` due to potential precision loss).",
    explanation: "Widening vs Narrowing conversions in Java.",
    hint: "Widening is implicit and lossless; narrowing requires explicit cast.",
    level: "basic",
    codeExample: "int a = 10; double d = a; // Widening (implicit) | int b = (int) d; // Narrowing (explicit)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee ledger, why did `evaluatePriority(swadeepScore)` choose `evaluatePriority(long)` over `evaluatePriority(Integer)`?",
    shortAnswer: "Because `swadeepScore` is a primitive `int`, and Java resolution rules strictly prioritize Phase 1 Primitive Widening (`int` $\to$ `long`) over Phase 2 Autoboxing (`int` $\to$ `Integer`).",
    explanation: "Official JLS phase resolution demonstration.",
    hint: "Primitive widening belongs to Phase 1, which runs before Phase 2 Autoboxing.",
    level: "basic",
    codeExample: "evaluatePriority(100); // Selects evaluatePriority(long)"
  },
  {
    question: "Can a `char` argument be promoted to `short`?",
    shortAnswer: "NO! `char` is unsigned 16-bit ($0$ to $65,535$) while `short` is signed 16-bit ($-32,768$ to $32,767$); promoting `char` to `short` is not permitted without explicit cast.",
    explanation: "Char to short incompatibility.",
    hint: "No, unsigned char cannot widen to signed short.",
    level: "intermediate",
    codeExample: "// char -> short is NOT a widening conversion"
  },
  {
    question: "What is 'Poly Expression' resolution introduced in Java 8?",
    shortAnswer: "Expressions like lambdas and method references whose types are inferred dynamically based on target type context during overload resolution.",
    explanation: "Modern Java 8 poly expressions.",
    hint: "Expressions whose types are inferred based on the target type.",
    level: "advanced",
    codeExample: "executor.submit(() -> System.out.println(\"Hi\"));"
  },
  {
    question: "Why should developers avoid creating overloads that rely on complex widening vs boxing distinctions?",
    shortAnswer: "It makes code confusing, error-prone, and fragile; Joshua Bloch (Effective Java Item 52) recommends never having two overloads with the same number of parameters that can be satisfied by the same argument via promotion.",
    explanation: "Effective Java clean API design advice.",
    hint: "Avoid overloads that cause ambiguity or rely on subtle promotion rules.",
    level: "intermediate",
    codeExample: "// Bad API design: m(int, long) and m(long, int)"
  },
  {
    question: "What is the result of calling `Math.abs(-10)` in Java?",
    shortAnswer: "Matches `Math.abs(int)` exactly; passing `-10.5` matches `Math.abs(double)` exactly, demonstrating transparent exact type matching.",
    explanation: "Standard library exact match behavior.",
    hint: "Exact type match invokes corresponding Math.abs overload.",
    level: "basic",
    codeExample: "Math.abs(-10); // int | Math.abs(-10.5); // double"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee ledger, how many total overloads of `processFee` coexisted?",
    shortAnswer: "5 overloads: `(int)`, `(long)`, `(double)`, `(Integer)`, and `(int...)` in Indian Rupees (₹).",
    explanation: "Hierarchy test suite analysis.",
    hint: "5 overloads covering exact match, widenings, boxing, and varargs.",
    level: "basic",
    codeExample: "processFee(int), processFee(long), processFee(double), processFee(Integer), processFee(int...)"
  },
  {
    question: "What happens if a call matches both `m(Object)` and `m(int[])` when passing an array `new int[]{1, 2}`?",
    shortAnswer: "`m(int[])` is invoked because `int[]` is a more specific type than `Object`.",
    explanation: "Array type specificity over Object.",
    hint: "m(int[]) is chosen as the most specific type.",
    level: "basic",
    codeExample: "void m(Object o) {} void m(int[] a) {} m(new int[]{1, 2}); // Calls m(int[])"
  },
  {
    question: "Can an `int` promote to `float` even though `float` has only 24 bits of significand precision?",
    shortAnswer: "YES! `int` to `float` is classified as a Widening Primitive Conversion (JLS §5.1.2), though least significant bits may be rounded.",
    explanation: "Widening with possible precision loss.",
    hint: "Yes, int to float is officially a widening conversion in Java.",
    level: "advanced",
    codeExample: "int i = 123456789; float f = i; // Widening (loss of precision possible)"
  },
  {
    question: "What is the ultimate takeaway of Module 001_007 Topic 9 for Java developers?",
    shortAnswer: "Java resolves overloaded methods in strict 4-tier priority: Exact Match > Primitive Widening Promotion > Autoboxing > Varargs. Widening always beats boxing, and ambiguous matches cause compile errors.",
    explanation: "Mastery of automatic type promotion in method overloading.",
    hint: "Exact Match > Primitive Widening > Autoboxing > Varargs.",
    level: "basic",
    codeExample: "// Summary: Exact > Widening > Autoboxing > Varargs"
  },
  {
    question: "What is the next topic (Topic 10) in Module 001_007?",
    shortAnswer: "Variable Arguments (Varargs - Type... varName): syntax, rules, and single-last-parameter constraint.",
    explanation: "Topic 10 explores varargs mechanics, internal array conversion, and single-last parameter constraints.",
    hint: "Variable Arguments (Varargs - Type... varName): syntax, rules, and single-last-parameter constraint.",
    level: "basic",
    codeExample: "// Topic 10: Variable Arguments (Varargs) Masterclass"
  },
  {
    question: "How does the Java compiler handle overloaded methods in generic classes?",
    shortAnswer: "Overload resolution occurs during compilation before generic type erasure; methods whose erased signatures would collide cause a compile-time error.",
    explanation: "Generic type erasure impact on overloading.",
    hint: "Resolution occurs before type erasure; colliding erased signatures fail compilation.",
    level: "advanced",
    codeExample: "class Box<T> { void set(T t) {} /* void set(Object o) {} ILLEGAL */ }"
  }
];

export default questions;
