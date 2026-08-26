/**
 * Module 001_007: Topic 11: Static methods vs Instance methods (introductory comparison)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the primary architectural difference between a Static Method and an Instance Method in Java?",
    shortAnswer: "A **Static Method** belongs to the Class itself and is invoked via `ClassName.method()` without an object instance; an **Instance Method** belongs to a specific heap-allocated Object and is invoked via `objectRef.method()` using an implicit `this` reference (JLS §8.4.3.2).",
    explanation: "Core definition and invocation difference.",
    hint: "Static belongs to the class (no 'this'); instance belongs to an object instance on the heap (uses 'this').",
    level: "basic",
    codeExample: "ClassName.staticMethod(); // Static\nobjectRef.instanceMethod(); // Instance"
  },
  {
    question: "Does a Static Method have access to the `this` reference?",
    shortAnswer: "NO! Static methods execute in a class-level context without an active object instance; referencing `this` or `super` inside a static method produces a `Compile Error: non-static variable this cannot be referenced from a static context`.",
    explanation: "No 'this' pointer in static methods.",
    hint: "No, 'this' does not exist in static methods.",
    level: "basic",
    codeExample: "// Inside static method: System.out.println(this.name); // COMPILE ERROR!"
  },
  {
    question: "Can a Static Method access an instance field directly (e.g. `this.feeBalance`)?",
    shortAnswer: "NO! A static method cannot access instance variables directly without explicitly creating or receiving an object reference parameter.",
    explanation: "Instance variable access restriction in static context.",
    hint: "Cannot access instance fields directly; must pass or create an object instance first.",
    level: "basic",
    codeExample: "public static void process(StudentAccount s) { s.makePayment(500); } // Legal via reference parameter"
  },
  {
    question: "Can an Instance Method access a Static Field or call a Static Method directly?",
    shortAnswer: "YES! Instance methods have full access to both instance fields/methods and shared static fields/methods.",
    explanation: "Bidirectional visibility rules in Java.",
    hint: "Yes, instance methods can freely access static fields and methods.",
    level: "basic",
    codeExample: "public void print() { System.out.println(INSTITUTE_NAME); } // Legal!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what static utility method was called without creating any object?",
    shortAnswer: "`StudentAccount.calculateStandardGst(20000.0)` computing 18% GST (₹3,600.00) in Indian Rupees (₹).",
    explanation: "Static method invocation without object instantiation.",
    hint: "StudentAccount.calculateStandardGst().",
    level: "basic",
    codeExample: "double gst = StudentAccount.calculateStandardGst(20000.0);"
  },
  {
    question: "What is the recommended use case for Static Methods?",
    shortAnswer: "Pure mathematical calculations, utility helper functions, factory constructors (`List.of()`, `Math.sqrt()`, `Integer.parseInt()`), and operations that do not depend on object instance state.",
    explanation: "Best practice guidelines for static methods.",
    hint: "Utility functions, mathematical formulas, and factory methods.",
    level: "basic",
    codeExample: "Math.max(10, 20); Arrays.sort(arr); Collections.emptyList();"
  },
  {
    question: "What is the recommended use case for Instance Methods?",
    shortAnswer: "Behaviors that read, modify, or depend on individual object state (`swadeep.makePayment(6000.0)`).",
    explanation: "Best practice guidelines for instance methods.",
    hint: "Behaviors that modify or read specific object instance state.",
    level: "basic",
    codeExample: "student.makePayment(5000.0); account.deposit(1000.0);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, how did Swadeep, Tuhina, and Abhronila track total enrollment?",
    shortAnswer: "Via the shared `private static int totalEnrolledStudents` counter incremented in the constructor to 3 across all instances in Indian Rupees (₹).",
    explanation: "Shared static state across instances.",
    hint: "Shared static counter incremented in constructor.",
    level: "basic",
    codeExample: "public StudentAccount(...) { totalEnrolledStudents++; }"
  },
  {
    question: "Can Static Methods be overridden by subclasses (Method Overriding)?",
    shortAnswer: "NO! Static methods are resolved at compile-time (Early Binding) and cannot be overridden; redefining a static method in a subclass is called **Method Hiding**.",
    explanation: "Static method hiding vs dynamic overriding (JLS §8.4.8.2).",
    hint: "No, static methods cannot be overridden; they are hidden (method hiding).",
    level: "intermediate",
    codeExample: "// Subclass static method hides superclass static method, resolved at compile-time"
  },
  {
    question: "What happens if you invoke a static method through an object reference (`swadeep.calculateStandardGst(1000)`)?",
    shortAnswer: "Syntactically legal, but a code smell and bad practice; the compiler ignores the object instance and resolves the method based solely on the reference variable's declared type.",
    explanation: "Object reference static method invocation code smell.",
    hint: "Syntactically legal, but discouraged; always invoke via ClassName.method().",
    level: "intermediate",
    codeExample: "swadeep.calculateStandardGst(100); // Warning: static method accessed via instance"
  },
  {
    question: "What happens if `swadeep` is `null` and you call `swadeep.calculateStandardGst(100)`?",
    shortAnswer: "It executes WITHOUT throwing `NullPointerException` because static methods are bound at compile-time to the Class type, not the runtime object instance!",
    explanation: "Famous Java interview question on static null dereference.",
    hint: "Executes without NullPointerException because static methods bind to the class at compile-time.",
    level: "intermediate",
    codeExample: "StudentAccount s = null; s.calculateStandardGst(100); // DOES NOT CRASH!"
  },
  {
    question: "Why can't an abstract method in an interface or abstract class be declared `static` prior to Java 8?",
    shortAnswer: "Because abstract methods require dynamic runtime polymorphism and subclass overriding, whereas static methods are bound statically at compile-time.",
    explanation: "Abstract vs Static modifier mutual exclusion.",
    hint: "Abstract methods require dynamic overriding; static methods bind at compile time.",
    level: "intermediate",
    codeExample: "// public abstract static void m(); // ILLEGAL in Java!"
  },
  {
    question: "Can an interface declare Static Methods in Java 8+?",
    shortAnswer: "YES! Java 8 introduced static methods in interfaces to provide utility and factory functions directly alongside interface contracts (e.g. `Comparator.comparing()`).",
    explanation: "Java 8 interface static methods.",
    hint: "Yes, interfaces can declare static utility methods in Java 8+.",
    level: "basic",
    codeExample: "public interface FeeCalculator { static double getGst(double fee) { return fee * 0.18; } }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee ledger, how did Swadeep's balance change after `swadeep.makePayment(6000.0)`?",
    shortAnswer: "Swadeep's balance decreased from ₹18,000 to ₹12,000 via instance method mutation in Indian Rupees (₹).",
    explanation: "Instance method state mutation.",
    hint: "Decreased from ₹18,000 to ₹12,000.",
    level: "basic",
    codeExample: "swadeep.makePayment(6000.0); // ₹18,000 -> ₹12,000"
  },
  {
    question: "Where are Static Methods and Static Variables stored in JVM memory?",
    shortAnswer: "In the **Metaspace** (in Java 8+, formerly PermGen), allocated once when the Class is loaded by the ClassLoader.",
    explanation: "JVM memory layout for class-level metadata.",
    hint: "Stored in Metaspace (class metadata area).",
    level: "intermediate",
    codeExample: "// Class metadata and static methods reside in Metaspace"
  },
  {
    question: "Where are Instance Methods and Instance Variables stored in JVM memory?",
    shortAnswer: "Instance variables are allocated inside the Object instance on the **Heap**; method bytecode resides in Metaspace and is executed within Call Stack frames.",
    explanation: "JVM memory layout for heap instances.",
    hint: "Instance fields reside on the Heap; executed inside Stack frames.",
    level: "intermediate",
    codeExample: "// Objects and instance fields reside in the Heap"
  },
  {
    question: "Can a `static` method be marked `final`?",
    shortAnswer: "YES! `public static final void m()` prevents subclasses from defining a method with the same signature (prevents method hiding).",
    explanation: "Final static methods.",
    hint: "Yes, 'final static' prevents subclasses from hiding the method.",
    level: "basic",
    codeExample: "public static final double calculateGst(double amt) { ... }"
  },
  {
    question: "Can a `static` method be marked `synchronized`?",
    shortAnswer: "YES! A static synchronized method locks on the **Class object monitor** (`ClassName.class`), serializing access across all threads globally.",
    explanation: "Class monitor locking in static synchronized methods.",
    hint: "Yes, locks on the Class object monitor globally across all threads.",
    level: "advanced",
    codeExample: "public static synchronized void registerStudent() { ... }"
  },
  {
    question: "What is a 'Utility Class' in Java and how is it designed?",
    shortAnswer: "A class containing only static methods and static constants with a `private` constructor to prevent instantiation (e.g. `java.lang.Math`, `java.util.Collections`).",
    explanation: "Effective Java Item 4: Enforce non-instantiability with private constructors.",
    hint: "Contains only static methods with a private constructor to prevent 'new'.",
    level: "intermediate",
    codeExample: "public final class FeeUtils { private FeeUtils() {} public static double gst(double f) { ... } }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee ledger, why was `printInstituteHeader()` declared `static`?",
    shortAnswer: "Because institute information (Name: Coder & AccoTax, Campus: Barrackpore) and total student counts are global class-level data that apply to the entire institute.",
    explanation: "Class-level data presentation rationale.",
    hint: "Applies globally to the entire institute, not to one specific student.",
    level: "basic",
    codeExample: "StudentAccount.printInstituteHeader();"
  },
  {
    question: "What is the difference in performance between invoking a Static Method vs an Instance Method?",
    shortAnswer: "Static methods use `invokestatic` bytecode with direct static binding; instance methods use `invokevirtual` or `invokeinterface` with vtable dynamic dispatch (though modern JIT inlining eliminates differences for hot methods).",
    explanation: "JVM bytecode dispatch instructions.",
    hint: "invokestatic (static binding) vs invokevirtual (dynamic vtable dispatch).",
    level: "advanced",
    codeExample: "// invokestatic vs invokevirtual bytecode instructions"
  },
  {
    question: "Can a static method access outer class instance variables from an inner class?",
    shortAnswer: "A `static nested class` cannot access outer instance fields; only non-static inner classes can access outer instance variables via the enclosing `this`.",
    explanation: "Nested class vs inner class static access.",
    hint: "Static nested classes cannot access outer instance fields.",
    level: "advanced",
    codeExample: "public static class Nested { void m() { /* Cannot access outer fields */ } }"
  },
  {
    question: "Why is excessive use of static methods and global mutable static state considered an architectural anti-pattern?",
    shortAnswer: "Because it destroys Object-Oriented polymorphism, makes Unit Testing and mocking difficult, and introduces global concurrency bottlenecks across threads.",
    explanation: "Software architecture and testability trade-offs.",
    hint: "Breaks OOP polymorphism, prevents mocking in unit tests, and creates concurrency issues.",
    level: "intermediate",
    codeExample: "// Prefer dependency injection and instance methods for testable business logic"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was Tuhina's remaining balance after paying ₹10,000?",
    shortAnswer: "₹25,000 − ₹10,000 = ₹15,000.00 remaining balance in Indian Rupees (₹).",
    explanation: "Tuhina account mutation calculation.",
    hint: "₹15,000.00.",
    level: "basic",
    codeExample: "tuhina.makePayment(10000.0); // ₹25,000 -> ₹15,000"
  },
  {
    question: "Can a static method be overridden with `@Override` annotation?",
    shortAnswer: "NO! Applying `@Override` to a static method causes a `Compile Error: static methods cannot be annotated with @Override`.",
    explanation: "Override annotation compiler rejection on static methods.",
    hint: "No, @Override causes a compile error on static methods.",
    level: "basic",
    codeExample: "// @Override public static void m() // COMPILE ERROR"
  },
  {
    question: "What is a 'Static Factory Method'?",
    shortAnswer: "A static method that returns an instance of the class (e.g. `StudentAccount.createWithScholarship(\"Swadeep\", 0.15)`), providing expressive naming over constructors.",
    explanation: "Effective Java Item 1: Consider static factory methods instead of constructors.",
    hint: "Static method that returns a new class instance with an expressive name.",
    level: "intermediate",
    codeExample: "public static StudentAccount of(String name, double fee) { return new StudentAccount(name, \"Java\", fee); }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was Abhronila's course and final balance?",
    shortAnswer: "Course: &ldquo;AccoTax&rdquo; | Initial: ₹12,000 | Paid: ₹4,000 | Final Balance: ₹8,000.00 in Indian Rupees (₹).",
    explanation: "Abhronila account summary.",
    hint: "Course: AccoTax, Remaining Balance: ₹8,000.00.",
    level: "basic",
    codeExample: "abhronila.printAccountSummary(); // Balance: ₹8,000.00"
  },
  {
    question: "What is the ultimate takeaway of Module 001_007 Topic 11 for Java developers?",
    shortAnswer: "Static methods belong to the Class globally (no `this`, used for pure calculations and utilities); Instance methods belong to specific Heap objects (has `this`, used for object behaviors and state mutations).",
    explanation: "Mastery of static vs instance methods.",
    hint: "Static = Class-level utility (no 'this'); Instance = Object-level behavior (uses 'this').",
    level: "basic",
    codeExample: "// Summary: ClassName.staticUtility() vs objectInstance.mutateState()"
  },
  {
    question: "What is the next topic (Topic 12) in Module 001_007?",
    shortAnswer: "Recursive methods: definition, base case (termination condition), and recursive step.",
    explanation: "Topic 12 introduces recursion fundamentals, self-referential functions, base cases, and inductive steps.",
    hint: "Recursive methods: definition, base case (termination condition), and recursive step.",
    level: "basic",
    codeExample: "// Topic 12: Recursive Methods, Base Cases & Recursive Steps"
  },
  {
    question: "How do modern microservice and Spring Boot architectures use static vs instance methods?",
    shortAnswer: "Spring Beans (Services, Repositories, Controllers) use instance methods managed by Dependency Injection, while pure static methods are reserved for stateless string, math, and date helpers.",
    explanation: "Enterprise framework design patterns.",
    hint: "Services and Controllers use instance methods; static methods are reserved for stateless helpers.",
    level: "advanced",
    codeExample: "@Service public class FeeService { public void process() { ... } }"
  }
];

export default questions;
