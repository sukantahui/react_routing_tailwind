/**
 * Module 001_007: Topic 3: Formal parameters vs Actual arguments
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the difference between a Formal Parameter and an Actual Argument?",
    shortAnswer: "A Formal Parameter is a variable declared in the method header (e.g. `double rate`); an Actual Argument is the real value, variable, or expression passed into the method at the invocation call site (e.g. `4500.0`).",
    explanation: "Core distinction between parameter definitions and argument values.",
    hint: "Parameters are declared in the method definition; arguments are passed during method calls.",
    level: "basic",
    codeExample: "void m(int x) {} // 'x' is formal parameter\nm(10);           // '10' is actual argument"
  },
  {
    question: "Where are Formal Parameters allocated in memory during method execution?",
    shortAnswer: "In the local variable array of the newly pushed Stack Frame on the JVM Call Stack.",
    explanation: "JVM runtime stack frame allocation for parameters.",
    hint: "Allocated on the Call Stack inside the method's stack frame.",
    level: "basic",
    codeExample: "// Stack frame allocates slots for formal parameters when invoked"
  },
  {
    question: "When are Actual Arguments evaluated in Java?",
    shortAnswer: "BEFORE the method is called; argument expressions are evaluated strictly from left to right, and the resulting values are copied into the formal parameter slots.",
    explanation: "Eager argument evaluation semantics (JLS §15.7.4).",
    hint: "Evaluated eagerly from left-to-right before entering the method.",
    level: "intermediate",
    codeExample: "computeTotalFee(\"Swadeep\", 3000.0 + 1500.0, 2 * 3, true);"
  },
  {
    question: "Can an Actual Argument be a complex arithmetic expression (e.g. `compute(a + b * 2)`)?",
    shortAnswer: "YES! Java evaluates the expression `a + b * 2` down to a single primitive value and passes that evaluated result into the parameter.",
    explanation: "Expression evaluation at call sites.",
    hint: "Yes, expressions are evaluated first and their final value is passed.",
    level: "basic",
    codeExample: "double net = computeTotalFee(\"Abhronila\", 3000.0 + 1500.0, 6, true);"
  },
  {
    question: "What happens if you pass an `int` actual argument into a `double` formal parameter?",
    shortAnswer: "Automatic Widening Primitive Conversion: Java converts the `int` to `double` implicitly without error (e.g. integer `6000` becomes `6000.0`).",
    explanation: "Widening type compatibility in method arguments.",
    hint: "Implicit widening conversion succeeds automatically.",
    level: "basic",
    codeExample: "void calculate(double d) {}\ncalculate(10); // Legal: int 10 widened to double 10.0"
  },
  {
    question: "What happens if you pass a `double` actual argument into an `int` formal parameter?",
    shortAnswer: "`Compile Error: Incompatible types: possible lossy conversion from double to int` (requires an explicit cast `(int)`).",
    explanation: "Narrowing conversion compiler restriction.",
    hint: "Compile error: lossy conversion from double to int.",
    level: "basic",
    codeExample: "void setAge(int a) {}\n// setAge(25.5); // COMPILE ERROR!"
  },
  {
    question: "What three constraints must actual arguments satisfy to match formal parameters?",
    shortAnswer: "1. **Count Match** (same number of arguments), 2. **Type Compatibility** (types must be assignable), 3. **Order Match** (argument types must follow the parameter sequence).",
    explanation: "The 3 fundamental argument matching rules.",
    hint: "Count, Type, and Order matching.",
    level: "basic",
    codeExample: "// computeTotalFee(String, double, int, boolean) requires all 4 in exact order"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee system, what happened when `int integerFee = 6000;` was passed to Debangshu's tuition method?",
    shortAnswer: "The integer `6000` was automatically widened to double `6000.0` matching the `double monthlyFee` formal parameter in Indian Rupees (₹).",
    explanation: "Demonstration of widening conversion.",
    hint: "Automatically widened to double 6000.0.",
    level: "basic",
    codeExample: "computeTotalFee(\"Debangshu\", integerFee, 3, true);"
  },
  {
    question: "Can an actual argument variable have the exact same name as the formal parameter variable?",
    shortAnswer: "YES! Argument variable names at the call site are completely independent from formal parameter names; values are mapped by position, not name.",
    explanation: "Positional argument binding vs name independence.",
    hint: "Yes, arguments are mapped purely by position/type, not by name.",
    level: "basic",
    codeExample: "int months = 6;\ncomputeTotalFee(\"Tuhina\", 5000.0, months, false); // Completely legal!"
  },
  {
    question: "Can a formal parameter variable be modified inside the method without affecting the actual argument variable in the caller?",
    shortAnswer: "YES! For primitives, Java is strictly Pass-by-Value; modifying the formal parameter changes only the local stack frame slot.",
    explanation: "Pass-by-value isolation for primitives.",
    hint: "Yes, modifying the formal parameter does not alter the caller's variable.",
    level: "basic",
    codeExample: "void test(int x) { x = 99; } // Caller's variable remains unchanged"
  },
  {
    question: "What is the term for methods that accept an arbitrary number of actual arguments?",
    shortAnswer: "Variable-Arity Methods or **Varargs** (`Type... varName`), introduced in Java 5.",
    explanation: "Varargs method feature.",
    hint: "Varargs (Type... name).",
    level: "basic",
    codeExample: "public static double sum(double... values) { ... }"
  },
  {
    question: "What exception occurs if a method call passes `null` as an actual argument to a primitive parameter wrapper during auto-unboxing?",
    shortAnswer: "`java.lang.NullPointerException` at runtime.",
    explanation: "Auto-unboxing null pointer hazard.",
    hint: "NullPointerException during unboxing.",
    level: "intermediate",
    codeExample: "void process(int x) {}\nInteger obj = null;\n// process(obj); // THROWS NullPointerException!"
  },
  {
    question: "Can a method call pass another method invocation as an actual argument (`compute(getFee(), getMonths())`)?",
    shortAnswer: "YES! Nested method calls are evaluated first, and their return values are passed as actual arguments to the outer method.",
    explanation: "Method composition in argument expressions.",
    hint: "Yes, inner methods are executed first and their return values are passed.",
    level: "basic",
    codeExample: "computeTotalFee(\"Swadeep\", getBaseFee(), getDuration(), true);"
  },
  {
    question: "Does Java support 'Named Arguments' (e.g. `compute(monthlyFee=4000, months=6)`) like Python or Kotlin?",
    shortAnswer: "NO! Java strictly uses **Positional Arguments**; arguments must be passed in the exact order declared in the method signature.",
    explanation: "Positional argument constraint in Java.",
    hint: "No, Java only supports positional arguments.",
    level: "intermediate",
    codeExample: "// Named arguments are illegal in Java; order is strictly positional"
  },
  {
    question: "Does Java support 'Default Parameter Values' (e.g. `void m(int x = 10)`) like C++ or Python?",
    shortAnswer: "NO! Java does not support default parameter syntax; default parameters are achieved in Java using **Method Overloading**.",
    explanation: "Default parameters via method overloading.",
    hint: "No, Java uses method overloading to achieve default parameter behavior.",
    level: "intermediate",
    codeExample: "void enroll(String name) { enroll(name, 4000.0); }\nvoid enroll(String name, double fee) { ... }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the formal parameter list of `computeTotalFee()`?",
    shortAnswer: "`String studentName, double monthlyFee, int months, boolean isScholarship` representing 4 distinct typed parameters in Indian Rupees (₹).",
    explanation: "Parameter list analysis.",
    hint: "(String studentName, double monthlyFee, int months, boolean isScholarship).",
    level: "basic",
    codeExample: "computeTotalFee(String, double, int, boolean)"
  },
  {
    question: "What is the maximum number of formal parameters a Java method can declare according to the JVM Specification?",
    shortAnswer: "255 parameter slots (where `long` and `double` occupy 2 slots each, and `this` occupies slot 0 for instance methods).",
    explanation: "JVM bytecode limits (JVMS §4.3.3).",
    hint: "255 parameter slots max in JVM bytecode.",
    level: "advanced",
    codeExample: "// Theoretical JVM limit: 255 parameter slots"
  },
  {
    question: "What Clean Code guideline applies to the number of formal parameters in a method?",
    shortAnswer: "The 'Monadic/Dyadic/Triadic' rule: ideally 0 to 2 parameters; methods with more than 3-4 parameters should be refactored into a Parameter Object, Record, or Builder.",
    explanation: "Clean Code parameter reduction guidelines.",
    hint: "Keep parameters <= 3; group excessive parameters into a Record or DTO class.",
    level: "intermediate",
    codeExample: "public record EnrollmentRequest(String name, double fee, int months) {}"
  },
  {
    question: "Can a formal parameter be marked with the `final` keyword?",
    shortAnswer: "YES! `final double monthlyFee` prevents the method body from accidentally reassigning that parameter variable.",
    explanation: "Defensive parameter immutability.",
    hint: "Yes, 'final' prevents reassigning the parameter variable.",
    level: "basic",
    codeExample: "public static double compute(final double fee) { /* fee = 0; FAILS */ return fee; }"
  },
  {
    question: "What happens if a side-effecting expression is passed as multiple arguments (e.g. `m(i++, i++)`)?",
    shortAnswer: "Left-to-right evaluation: the first parameter receives the value of `i` before increment, and the second parameter receives the incremented value.",
    explanation: "Deterministic left-to-right evaluation guarantee in Java.",
    hint: "Evaluated strictly left-to-right; first arg gets initial i, second gets incremented i.",
    level: "advanced",
    codeExample: "int i = 1; m(i++, i++); // arg1 receives 1, arg2 receives 2"
  },
  {
    question: "Can an array be passed as an actual argument to a method?",
    shortAnswer: "YES! Passing an array passes its reference pointer to the formal array parameter.",
    explanation: "Array argument passing.",
    hint: "Yes, passing an array passes its heap reference.",
    level: "basic",
    codeExample: "public static double sum(double[] fees) { ... }"
  },
  {
    question: "What is the difference between 'Pass-by-Value' and 'Pass-by-Reference'?",
    shortAnswer: "Pass-by-Value copies the bit pattern (value) of the argument into the parameter; Pass-by-Reference passes the memory alias of the caller's variable (Java is 100% strictly Pass-by-Value!).",
    explanation: "Core memory model distinction.",
    hint: "Pass-by-value copies the value; Java is strictly 100% pass-by-value.",
    level: "intermediate",
    codeExample: "// Java copies the bits: primitive values or object reference addresses"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what were the 4 actual arguments in `computeTotalFee(\"Swadeep\", 4000.0, 6, true)`?",
    shortAnswer: "1. String literal `\"Swadeep\"`, 2. double literal `4000.0`, 3. int literal `6`, 4. boolean literal `true` in Indian Rupees (₹).",
    explanation: "Call site argument breakdown.",
    hint: "\"Swadeep\", 4000.0, 6, true.",
    level: "basic",
    codeExample: "computeTotalFee(\"Swadeep\", 4000.0, 6, true);"
  },
  {
    question: "Can an anonymous array literal be passed as an actual argument?",
    shortAnswer: "YES! `processScores(new double[]{85.0, 92.5, 78.0})` creates and passes an array inline without declaring a local variable.",
    explanation: "Anonymous array arguments.",
    hint: "Yes, using new Type[]{...} inline.",
    level: "basic",
    codeExample: "process(new double[]{12000.0, 15000.0});"
  },
  {
    question: "What is the compiler error if too few arguments are passed to a method (`computeTotalFee(\"Swadeep\", 4000.0)`)?",
    shortAnswer: "`Compile Error: method computeTotalFee in class ... cannot be applied to given types; required: String, double, int, boolean; found: String, double; reason: actual and formal argument lists differ in length`.",
    explanation: "Argument count mismatch compiler error.",
    hint: "Compile error: actual and formal argument lists differ in length.",
    level: "basic",
    codeExample: "// computeTotalFee(\"Swadeep\", 4000.0); // COMPILE ERROR: missing 2 arguments"
  },
  {
    question: "What happens if arguments are passed in the wrong order (`computeTotalFee(\"Swadeep\", 6, 4000.0, true)`)?",
    shortAnswer: "`Compile Error: incompatible types: possible lossy conversion from double to int` because argument 3 (`4000.0`) cannot be assigned to parameter `int months`.",
    explanation: "Type-order mismatch detection.",
    hint: "Compile error: type mismatch due to incorrect parameter ordering.",
    level: "basic",
    codeExample: "// Passing double where int is expected causes compiler error"
  },
  {
    question: "How do modern Java Records simplify methods with excessive formal parameters?",
    shortAnswer: "By bundling multiple related parameters into a single immutable data carrier object (e.g. `void enroll(EnrollmentRecord req)`).",
    explanation: "Record parameter object pattern.",
    hint: "Bundles multiple parameters into a clean, immutable record object.",
    level: "intermediate",
    codeExample: "public record FeePlan(double base, int months, boolean scholarship) {}"
  },
  {
    question: "What is the ultimate takeaway of Module 001_007 Topic 3 for Java developers?",
    shortAnswer: "Formal Parameters are variable placeholders declared in the method header that define its interface contract; Actual Arguments are the evaluated values supplied at invocation call sites, matched strictly by count, compatible types, and positional order.",
    explanation: "Mastery of parameters vs arguments.",
    hint: "Formal parameters define the contract; actual arguments provide the values at the call site.",
    level: "basic",
    codeExample: "// Summary: Definition (Formal Parameters) vs Invocation (Actual Arguments)"
  },
  {
    question: "What is the next topic (Topic 4) in Module 001_007?",
    shortAnswer: "Return statement: returning values vs void return, early returns as guard clauses.",
    explanation: "Topic 4 examines return statement semantics, void methods, unreachable code errors, and early guard exits.",
    hint: "Return statement: returning values vs void return, early returns as guard clauses.",
    level: "basic",
    codeExample: "// Topic 4: Return Statement Semantics & Guard Clauses"
  },
  {
    question: "Can formal parameters have default annotations in Java (like `@NotNull`, `@Min`)?",
    shortAnswer: "YES! Bean Validation annotations (like `@NotNull`, `@Positive`, `@Min(1)`) can annotate formal parameters for automated framework validation.",
    explanation: "Parameter-level validation annotations.",
    hint: "Yes, annotations like @NotNull and @Positive validate parameters automatically in frameworks.",
    level: "advanced",
    codeExample: "public void process(@NotNull String name, @Positive double fee) { ... }"
  }
];

export default questions;
