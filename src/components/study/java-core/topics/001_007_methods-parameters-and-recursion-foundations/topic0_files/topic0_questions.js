/**
 * Module 001_007: Topic 0: What is a method and why modularization is critical in software engineering
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is a Method in Java?",
    shortAnswer: "A named block of organized, reusable code statements designed to execute a specific task or calculation, encapsulated within a class (JLS §8.4).",
    explanation: "Fundamental definition of a method in Java object-oriented programming.",
    hint: "A named block of reusable code that performs a specific operation.",
    level: "basic",
    codeExample: "public static double calculateGross(double rate, int hours) { return rate * hours; }"
  },
  {
    question: "What is Modularization in software engineering?",
    shortAnswer: "The process of decomposing a large, complex monolithic software system into smaller, discrete, self-contained, and manageable functional units (modules or methods).",
    explanation: "Core software engineering architectural principle.",
    hint: "Breaking down complex monolithic code into small, isolated, reusable functions.",
    level: "basic",
    codeExample: "// Modular approach: divide computation, validation, and presentation into separate methods"
  },
  {
    question: "What is the DRY principle and how do Java methods enforce it?",
    shortAnswer: "'Don't Repeat Yourself' (DRY) states that every piece of knowledge or logic must have a single, unambiguous representation in a codebase; methods encapsulate shared logic so it is written once and invoked anywhere.",
    explanation: "Eliminating code redundancy via method abstraction.",
    hint: "Don't Repeat Yourself: write once in a method and reuse everywhere.",
    level: "basic",
    codeExample: "// Instead of duplicating GST calculation across 100 places, write calculateGst(amount)"
  },
  {
    question: "What is the Single Responsibility Principle (SRP) for methods?",
    shortAnswer: "A method should do exactly ONE thing and do it well, possessing only one reason to change (e.g. calculating tax, rather than calculating tax, fetching database records, and printing output all together).",
    explanation: "Robert C. Martin's clean code guideline.",
    hint: "Each method should perform exactly one well-defined functional task.",
    level: "intermediate",
    codeExample: "public static double calculateGst(double taxableAmount) { return taxableAmount * 0.18; }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee invoicing system, how was monolithic logic decomposed?",
    shortAnswer: "Into 4 focused methods: `calculateGrossFee()`, `calculateDiscount()`, `calculateGst()`, and `printStudentInvoice()`, coordinated cleanly by `processEnrollment()` in Indian Rupees (₹).",
    explanation: "Practical demonstration of modular software design.",
    hint: "Separated into gross fee, discount, GST, invoice printing, and enrollment processor.",
    level: "basic",
    codeExample: "double gross = calculateGrossFee(baseFee, units); double gst = calculateGst(taxable, 0.18);"
  },
  {
    question: "How does modularization improve code maintainability?",
    shortAnswer: "If a business rule changes (e.g., GST rate updates from 18% to 12%), developers update only the single `calculateGst()` method, instantly reflecting the change across the entire application without bug regression.",
    explanation: "Centralized maintenance and single point of update.",
    hint: "Modifications happen in one isolated location without affecting other components.",
    level: "basic",
    codeExample: "public static double calculateGst(double amount, double rate) { return amount * rate; }"
  },
  {
    question: "How do methods facilitate Unit Testing in Java (e.g. with JUnit)?",
    shortAnswer: "Individual methods can be isolated, given specific input arguments, and validated against expected outputs independently from the user interface or database.",
    explanation: "Testability advantage of modular methods.",
    hint: "Allows isolated testing of input-output behavior with assertions.",
    level: "intermediate",
    codeExample: "@Test void testGst() { assertEquals(180.0, calculateGst(1000.0, 0.18)); }"
  },
  {
    question: "What is the difference between a Function and a Method?",
    shortAnswer: "In general programming, a function is a standalone subprogram; in Java (an OOP language), all functions are declared inside classes or interfaces and are called Methods.",
    explanation: "Terminology distinction in Java OOP.",
    hint: "Java has no standalone functions; all subroutines belong to a class and are called methods.",
    level: "basic",
    codeExample: "// In Java, all methods belong to a class or interface"
  },
  {
    question: "What is Code Abstraction through methods?",
    shortAnswer: "The caller only needs to know WHAT the method does (its name, parameters, and return value) without needing to understand HOW the internal implementation works.",
    explanation: "Hiding internal complexity behind a clean interface.",
    hint: "Callers use methods knowing what they do without worrying about internal implementation.",
    level: "basic",
    codeExample: "double result = Math.sqrt(25.0); // We use sqrt() without knowing its internal C++ algorithm"
  },
  {
    question: "What is 'Spaghetti Code' and why is it dangerous?",
    shortAnswer: "Unstructured, monolithic, tightly-coupled code with duplicated blocks, tangled control flows, and zero modular boundaries, making maintenance, debugging, and scaling nearly impossible.",
    explanation: "Anti-pattern of non-modular programming.",
    hint: "Messy, monolithic, repetitive code without clear method boundaries.",
    level: "basic",
    codeExample: "// Anti-pattern: 1000 lines of nested if-else statements inside main()"
  },
  {
    question: "How does modularization enable team collaboration on large software projects?",
    shortAnswer: "Different software engineers can develop, review, optimize, and test different methods simultaneously with minimal code conflicts.",
    explanation: "Parallel development workflow enablement.",
    hint: "Multiple developers can work concurrently on distinct method modules.",
    level: "basic",
    codeExample: "// Dev 1 writes calculateDiscount(); Dev 2 writes calculateGst()"
  },
  {
    question: "What is the recommended line length for a clean Java method according to Clean Code standards?",
    shortAnswer: "Ideally between 5 to 20 lines of code; methods exceeding 50 lines are typically 'code smells' indicating multiple responsibilities that should be decomposed.",
    explanation: "Clean code length heuristics.",
    hint: "Small methods (5-20 lines) focused on a single responsibility.",
    level: "intermediate",
    codeExample: "// Keep methods small, focused, and readable"
  },
  {
    question: "What are the components of a Method Signature in Java?",
    shortAnswer: "The Method Name and the Parameter List (count, types, and order of parameter types). Note: Access modifiers, return types, and thrown exceptions are NOT part of the method signature.",
    explanation: "Strict JLS §8.4.2 method signature definition.",
    hint: "Method name + parameter types list only (return type is excluded).",
    level: "intermediate",
    codeExample: "// Signature: calculateGrossFee(double, int)"
  },
  {
    question: "Can a Java method exist outside of a class declaration?",
    shortAnswer: "NO! In Java, all methods must be declared within a class, record, or interface.",
    explanation: "Strict OOP language architecture constraint.",
    hint: "No, Java requires all methods to reside inside a class or interface.",
    level: "basic",
    codeExample: "public class Calculator { public static int add(int a, int b) { return a + b; } }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the benefit of passing `discountRate` as a parameter rather than hardcoding 10%?",
    shortAnswer: "It allowed Swadeep (10%), Tuhina (15%), Abhronila (5%), and Debangshu (0%) to use the exact same calculation method dynamically with different scholarship tiers in Indian Rupees (₹).",
    explanation: "Parameterization for behavioral flexibility.",
    hint: "Enables dynamic reuse across diverse scholarship percentages.",
    level: "basic",
    codeExample: "calculateDiscount(gross, 0.15); // Reusable for any rate"
  },
  {
    question: "What is 'High Cohesion' in method design?",
    shortAnswer: "A metric measuring how closely related and focused the statements inside a single method are; high cohesion means the method does one unified logical task.",
    explanation: "Software design quality metric.",
    hint: "All statements in the method strongly relate to a single focused purpose.",
    level: "advanced",
    codeExample: "// High cohesion: calculateGst() only performs tax computation"
  },
  {
    question: "What is 'Loose Coupling' in modular architecture?",
    shortAnswer: "Minimizing dependencies between different methods and classes so that changing internal details of one method does not break or impact other methods.",
    explanation: "Independent module interaction principle.",
    hint: "Modules interact via clean parameters without depending on internal implementation details.",
    level: "advanced",
    codeExample: "// Methods receive inputs via parameters and return outputs, avoiding global state"
  },
  {
    question: "Why should methods avoid mutating global shared state directly?",
    shortAnswer: "Because modifying global static variables creates hidden side-effects, introduces concurrency race conditions in multi-threaded environments, and destroys test predictability.",
    explanation: "Side-effect free functional design.",
    hint: "Causes hidden bugs, race conditions, and testing nightmares.",
    level: "intermediate",
    codeExample: "// Prefer pure methods: result = compute(a, b); over mutating global total"
  },
  {
    question: "What is a 'Pure Method' (deterministic method)?",
    shortAnswer: "A method that always produces the exact same return value for the same input arguments and produces zero observable side effects (no I/O, no global mutation).",
    explanation: "Functional programming concept in Java.",
    hint: "Given the same arguments, always returns the same output without side effects.",
    level: "intermediate",
    codeExample: "public static double add(double a, double b) { return a + b; }"
  },
  {
    question: "What is a 'Coordinator Method' (Orchestrator Method)?",
    shortAnswer: "A higher-level method (like `processEnrollment()`) that sequences calls to specialized worker methods (`calculateGross()`, `calculateGst()`) to fulfill a comprehensive business workflow.",
    explanation: "Layered method orchestration pattern.",
    hint: "Coordinates sub-methods in sequence to complete a larger workflow.",
    level: "intermediate",
    codeExample: "public static void process() { validate(); compute(); save(); print(); }"
  },
  {
    question: "How does the JIT (Just-In-Time) compiler optimize small, modular Java methods?",
    shortAnswer: "HotSpot's JIT compiler automatically INLINES small methods (replaces the method call with the actual method bytecode directly in the caller), eliminating method call overhead while preserving modular source code.",
    explanation: "JVM method inlining optimization.",
    hint: "JIT inlines small methods at runtime, giving zero method call performance penalty.",
    level: "advanced",
    codeExample: "// Small methods are inlined by JIT with zero runtime overhead"
  },
  {
    question: "What is a 'Guard Clause' in a method?",
    shortAnswer: "An early return check placed at the top of a method to handle invalid arguments or boundary cases immediately, avoiding deeply nested `if-else` blocks.",
    explanation: "Clean code control flow technique.",
    hint: "Early return at method start to reject invalid inputs immediately.",
    level: "intermediate",
    codeExample: "if (units <= 0) return 0.0; // Guard clause"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee invoicing engine, what guard clause was used in `calculateDiscount()`?",
    shortAnswer: "`if (discountRate < 0.0 || discountRate > 1.0) return 0.0;` ensuring invalid percentage rates are rejected safely.",
    explanation: "Defensive input validation in methods.",
    hint: "Validates that discount rate is between 0.0 and 1.0.",
    level: "basic",
    codeExample: "if (rate < 0 || rate > 1.0) return 0.0;"
  },
  {
    question: "How does modular method design assist in debugging runtime errors?",
    shortAnswer: "The JVM Stack Trace displays the exact method name and line number where an exception occurred, allowing developers to pinpoint the failing module instantaneously.",
    explanation: "Precise stack trace localization.",
    hint: "Stack traces show the exact method where the bug originated.",
    level: "basic",
    codeExample: "at com.coderaccotax.MethodModularizationDemo.calculateGst(MethodModularizationDemo.java:28)"
  },
  {
    question: "What is the relationship between Modular Methods and the Open/Closed Principle?",
    shortAnswer: "Modular systems are open for extension (adding new specialized methods like `calculateFestivalDiscount()`) but closed for modification (existing core methods remain untouched and stable).",
    explanation: "SOLID design principle integration.",
    hint: "Allows adding new features by adding new methods without rewriting existing working code.",
    level: "advanced",
    codeExample: "// Add calculateCorporateDiscount() without altering calculateGst()"
  },
  {
    question: "Can private helper methods be used to break down complex public methods?",
    shortAnswer: "YES! Declaring internal helper steps as `private` encapsulates low-level implementation details while exposing a clean `public` API.",
    explanation: "Information hiding and encapsulation.",
    hint: "Private helper methods hide internal sub-steps from external callers.",
    level: "intermediate",
    codeExample: "private static double applyTDS(double amount) { ... }"
  },
  {
    question: "What is the impact of meaningful method names on code self-documentation?",
    shortAnswer: "Descriptive names (e.g. `calculateGrossFee` instead of `calc` or `doStuff`) make code self-explanatory, eliminating the need for excessive inline comments.",
    explanation: "Self-documenting clean code practices.",
    hint: "Clear names convey business intent immediately without reading the method body.",
    level: "basic",
    codeExample: "public static double calculateGrossFee(double baseFee, int units)"
  },
  {
    question: "What is the ultimate takeaway of Module 001_007 Topic 0 for Java developers?",
    shortAnswer: "Methods are the fundamental building blocks of modular programming in Java; decomposing monolithic code into focused, single-responsibility methods maximizes reusability (DRY), maintainability, testability, and clarity.",
    explanation: "Core mastery of method modularization.",
    hint: "Modular methods break complexity into reusable, testable, and maintainable units.",
    level: "basic",
    codeExample: "// Summary: Small methods + Single Responsibility = Scalable Clean Architecture"
  },
  {
    question: "What is the next topic (Topic 1) in Module 001_007?",
    shortAnswer: "Anatomy of a method declaration: access modifier, return type, method name, parameter list, exception list, method body.",
    explanation: "Topic 1 dissects every grammatical token of Java method declarations in detail.",
    hint: "Anatomy of a method declaration: access modifiers, return types, names, parameters, exceptions, body.",
    level: "basic",
    codeExample: "// Topic 1: Anatomy of a Method Declaration"
  },
  {
    question: "Can recursive methods benefit from modularization?",
    shortAnswer: "YES! Recursive algorithms separate the public API entry method from a private helper method that manages recursion state and accumulator parameters.",
    explanation: "Helper method pattern in recursive design.",
    hint: "Public wrapper delegates to private recursive helper.",
    level: "intermediate",
    codeExample: "public int factorial(int n) { return factHelper(n, 1); }"
  }
];

export default questions;
