/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 11: Data Hiding: Restricting Direct Field Access using 'private' Modifier
 * High-Yield Technical Interview & Academic Q&A Catalog (30 Questions)
 * ============================================================================
 *
 * Educator: Sukanta Hui
 * Academic Centres: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 * ============================================================================
 */

const topic11_questions = [
  {
    question: "What is 'Data Hiding' in Object-Oriented Programming?",
    shortAnswer: "The technique of restricting direct external access to an object's internal fields by declaring them with the 'private' modifier.",
    explanation: "Data Hiding ensures that internal state variables and auxiliary algorithms can only be accessed or modified by code residing within the same class, shielding data from unauthorized tampering.",
    hint: "Concealing internal variables behind the private modifier.",
    level: "Beginner",
    codeExample: "public class Vault {\n    private String passwordHash; // Data hidden from external access\n}"
  },
  {
    question: "What error does the Java compiler generate if external code attempts to access a private field?",
    shortAnswer: "'<fieldName> has private access in <ClassName>' compile-time error.",
    explanation: "Java enforces access modifiers strictly at compile-time. If Class B writes 'vault.saltedPasswordHash', javac halts compilation with an access violation error.",
    hint: "Compile-time access control enforcement.",
    level: "Beginner",
    codeExample: "// Compile Error: 'saltedPasswordHash has private access in SecureStudentCredentialVault'"
  },
  {
    question: "Why should sensitive data like passwords or PINs NEVER be stored in public or package-private fields?",
    shortAnswer: "Because any class in the classpath could inspect, print, or overwrite the credentials in cleartext without authentication.",
    explanation: "Hiding credentials behind private fields and storing only cryptographic hashes (e.g. SHA-256) ensures that even memory inspectors or external callers cannot extract plaintext secrets.",
    hint: "Confidentiality and tamper-proofing of critical credentials.",
    level: "Beginner",
    codeExample: "private String saltedPasswordHash; // Stored securely, never exposed via getter"
  },
  {
    question: "What are 'Nestmates' in Java 11+ (JEP 181) and how do they relate to private access?",
    shortAnswer: "A JVM feature that allows nested inner classes and their enclosing outer class to access each other's private members directly without synthetic compiler bridge methods.",
    explanation: "Prior to Java 11, javac had to generate package-private synthetic accessor methods ('access$000') so inner classes could touch outer private fields. JEP 181 added 'NestHost' and 'NestMembers' bytecode attributes for native private sharing.",
    hint: "Native JVM support for nested class private member access.",
    level: "Advanced",
    codeExample: "class Outer {\n    private int secret;\n    class Inner {\n        void read() { int x = secret; } // Native Nestmate access in Java 11+\n    }\n}"
  },
  {
    question: "Can an instance of a class access the private fields of ANOTHER instance of the SAME class?",
    shortAnswer: "Yes! In Java, access control is class-based, not instance-based.",
    explanation: "Any method in Class A can directly access private fields of any Class A object ('otherInstance.privateField'). This allows implementing equals(), compareTo(), and copy constructors efficiently.",
    hint: "Encapsulation boundaries are at the Class level, not individual objects.",
    level: "Intermediate",
    codeExample: "public boolean isSameVault(SecureStudentCredentialVault other) {\n    return this.studentId == other.studentId; // Directly reads other's private field!\n}"
  },
  {
    question: "Can private methods in a class be overridden by a subclass?",
    shortAnswer: "No. Private methods are not inherited and cannot be overridden by subclasses.",
    explanation: "If a child class declares a method with the exact same name and signature as a parent private method, it is treated as a completely new, unrelated method in the child (Method Hiding/Redeclaration), not polymorphic overriding.",
    hint: "Private methods are invisible to subclasses.",
    level: "Intermediate",
    codeExample: "class Parent { private void log() {} }\nclass Child extends Parent { void log() {} /* New method, NOT an override */ }"
  },
  {
    question: "What bytecode instruction is generated when invoking a private instance method?",
    shortAnswer: "'invokespecial'.",
    explanation: "Because private methods cannot be overridden, dynamic vtable lookup is unnecessary. The compiler emits 'invokespecial' for static/direct early binding.",
    hint: "Early binding bytecode instruction for private methods.",
    level: "Advanced",
    codeExample: "// Bytecode: 12: invokespecial #5 // Method computeSha256Hash:(Ljava/lang/String;)Ljava/lang/String;"
  },
  {
    question: "How does Data Hiding enable API Evolution without breaking clients?",
    shortAnswer: "Developers can rename, delete, or change the data type of private fields freely as long as the public method signatures remain constant.",
    explanation: "Because outside callers cannot reference private field names, refactoring an internal variable (e.g. from 'int age' to 'LocalDate birthDate') requires zero changes in external client code.",
    hint: "Decouples public contract from internal storage implementation.",
    level: "Intermediate",
    codeExample: "// Private field refactored from 'int' to 'LocalDate'; getAge() computes Period.between"
  },
  {
    question: "What is 'Data Masking' in accessor methods?",
    shortAnswer: "Returning an obfuscated or partially redacted representation of a private field (e.g. 's***l@domain.com') to protect user privacy.",
    explanation: "Data Hiding allows designing accessors that reveal only non-sensitive portions of internal data, preventing PII (Personally Identifiable Information) leaks in UI logs.",
    hint: "Partial redaction of private fields in accessors.",
    level: "Beginner",
    codeExample: "public String getMaskedEmail() { return rawEmail.charAt(0) + \"***@\" + domain; }"
  },
  {
    question: "Can an interface in Java declare private methods, and starting in which Java version?",
    shortAnswer: "Yes, starting in Java 9, interfaces can declare private static and private instance methods as internal helper routines for default methods.",
    explanation: "Java 9 introduced private interface methods so that complex default methods in an interface could share common code without exposing those helper routines to implementing classes or API consumers.",
    hint: "Java 9 private interface helpers for default methods.",
    level: "Intermediate",
    codeExample: "interface PaymentGateway {\n    default void pay() { log(); }\n    private void log() { System.out.println(\"Payment logging\"); } // Java 9+\n}"
  },
  {
    question: "Why can't top-level (outer) classes be marked with the 'private' modifier in Java?",
    shortAnswer: "A private top-level class would be inaccessible to all other files and the JVM ClassLoader, making it completely unusable.",
    explanation: "Top-level classes can only be 'public' or package-private (default). Only nested/inner classes can be declared 'private' because their access is scoped inside the enclosing outer class.",
    hint: "Top-level classes must be accessible to at least their package.",
    level: "Beginner",
    codeExample: "// Compile Error: private class MyOuterClass { ... }\n// Valid: class MyOuterClass { private class InnerClass { ... } }"
  },
  {
    question: "What is the difference between declaring a constructor 'private' vs declaring class fields 'private'?",
    shortAnswer: "A private constructor prevents external classes from instantiating the class directly with 'new' (used in Singletons and Utility classes).",
    explanation: "Private fields hide data; private constructors control or prohibit object instantiation, forcing callers to use static factory methods or singleton instances.",
    hint: "Instance creation control vs field visibility control.",
    level: "Intermediate",
    codeExample: "public class Singleton {\n    private static final Singleton INSTANCE = new Singleton();\n    private Singleton() {} // Disallows 'new Singleton()' from outside\n    public static Singleton getInstance() { return INSTANCE; }\n}"
  },
  {
    question: "How does Data Hiding prevent Invalid State Transitions in state machines?",
    shortAnswer: "By keeping the state variable private and exposing transition methods that validate allowed state transitions (e.g. ACTIVE → LOCKED).",
    explanation: "If the 'status' field were public, outside code could jump from 'CLOSED' back to 'APPROVED'. With a private field, methods like 'lockAccount()' enforce that only valid lifecycle transitions occur.",
    hint: "State machine guards on private status variables.",
    level: "Intermediate",
    codeExample: "public void lockAccount() {\n    if (this.status == Status.ACTIVE) this.status = Status.LOCKED;\n}"
  },
  {
    question: "Can a subclass access private fields of its parent class using 'super.fieldName'?",
    shortAnswer: "No. 'super' cannot bypass private access; private fields are strictly hidden from subclasses.",
    explanation: "Inheritance does not grant access to private parent members. The subclass must interact with inherited private state through the parent's protected or public getter/setter methods.",
    hint: "Private means private, even to child classes.",
    level: "Beginner",
    codeExample: "class Child extends Parent {\n    void test() {\n        // super.privateField = 10; // Compile Error!\n        super.setProtectedField(10); // Valid via accessor\n    }\n}"
  },
  {
    question: "What is 'Representation Exposure' and how does it compromise Data Hiding?",
    shortAnswer: "When an object returns a direct reference to a mutable internal private field, allowing the caller to mutate it without the class's knowledge.",
    explanation: "If a private array or Date field is returned directly from a getter, the caller holds an alias to the private data, effectively destroying data hiding.",
    hint: "Leaking internal mutable references compromises privacy.",
    level: "Intermediate",
    codeExample: "private int[] scores;\npublic int[] getScores() { return scores.clone(); } // Cloned to prevent representation exposure"
  },
  {
    question: "Why does Joshua Bloch advise 'Minimize the Accessibility of Classes and Members' in Effective Java?",
    shortAnswer: "Making members as private as possible reduces coupling, prevents accidental misuse, and maximizes freedom to modify implementation details later.",
    explanation: "Item 15 of Effective Java states that well-designed components hide all implementation details, cleanly separating their API from their implementation. Default to private and only elevate visibility when strictly required.",
    hint: "Principle of least privilege in access modifier selection.",
    level: "Intermediate",
    codeExample: "// Rule: Start with 'private'; elevate to package-private only if collaborating; never use public for fields"
  },
  {
    question: "Can private static variables be accessed by instance methods of the same class?",
    shortAnswer: "Yes! Instance methods have full access to private static variables.",
    explanation: "Static variables are shared class-wide, and any method declared within the class boundary (static or instance) can read and write to private static fields.",
    hint: "Class-wide scope for all methods within the class.",
    level: "Beginner",
    codeExample: "private static int totalVaults = 0;\npublic SecureStudentCredentialVault() { totalVaults++; } // Modifies private static field"
  },
  {
    question: "How does the 'record' construct in Java 16+ enforce Data Hiding?",
    shortAnswer: "Record components are compiled into private final fields automatically, and can only be read via accessor methods.",
    explanation: "Records guarantee that data components are immutable private fields, preventing external modification while generating standard accessors automatically.",
    hint: "Compiler-generated private final component fields in records.",
    level: "Intermediate",
    codeExample: "record Student(int roll, String name) {} // 'roll' and 'name' are private final fields in bytecode"
  },
  {
    question: "What is the role of Private Helper Methods in Code Cleanliness?",
    shortAnswer: "They break down complex public methods into small, readable, reusable subroutines without polluting the class's public API.",
    explanation: "Internal validation, encryption algorithms, and data parsing logic should be private helpers ('computeSha256Hash()'), keeping the public interface concise and focused.",
    hint: "Internal decomposition without public interface pollution.",
    level: "Beginner",
    codeExample: "private void validateCredentials(String u, String p) { ... }"
  },
  {
    question: "Can Java Reflection (setAccessible) break private data hiding in modern Java 17+?",
    shortAnswer: "No, unless the JVM is started with specific override flags ('--add-opens'); JPMS strongly encapsulates private internals by default.",
    explanation: "In Java 17+ (JEP 403 Strongly Encapsulate JDK Internals by Default), calling 'setAccessible(true)' across module boundaries throws an 'InaccessibleObjectException' at runtime.",
    hint: "Strong encapsulation in modern Java restricts reflective bypasses.",
    level: "Advanced",
    codeExample: "// Throws java.lang.reflect.InaccessibleObjectException in Java 17+"
  },
  {
    question: "What is the difference between Data Hiding and Abstraction?",
    shortAnswer: "Data Hiding focuses on restricting access to internal state (security/safety); Abstraction focuses on hiding complexity and showing only essential features (design).",
    explanation: "Data Hiding is achieved using access modifiers ('private'); Abstraction is achieved using Abstract Classes and Interfaces.",
    hint: "Data Hiding hides state; Abstraction hides implementation complexity.",
    level: "Intermediate",
    codeExample: "// Abstraction: List interface defines behavior\n// Data Hiding: ArrayList's 'elementData' array is private"
  },
  {
    question: "Can an enum in Java have private fields and private constructors?",
    shortAnswer: "Yes! In fact, all enum constructors in Java are implicitly private and cannot be invoked with 'new'.",
    explanation: "Enums can declare private fields to hold associated constants (e.g. 'private final int code;'). Their constructors are strictly private to guarantee a fixed set of constants.",
    hint: "Enum constructors are always private.",
    level: "Intermediate",
    codeExample: "enum Campus { BARRACKPORE(101), NAIHATI(102); private final int id; private Campus(int id){ this.id = id; } }"
  },
  {
    question: "What happens if a private field is never read or written inside its enclosing class?",
    shortAnswer: "The Java compiler generates an 'unused private field' warning, and dead-code elimination in JIT may strip it from execution.",
    explanation: "Because a private field is completely invisible outside the class, if no method in the class uses it, it is guaranteed to be dead code.",
    hint: "Compiler detects dead private members with 100% certainty.",
    level: "Beginner",
    codeExample: "private int unusedVar; // Warning: The value of the field is not used"
  },
  {
    question: "Why should mutable collection fields never be initialized directly from constructor arguments without defensive copying?",
    shortAnswer: "Because the caller retains a reference to the passed collection and can add or remove elements, bypassing private field data hiding.",
    explanation: "If 'this.list = inputList;' is used, any change made by the caller to 'inputList' mutates 'this.list'. Using 'this.list = new ArrayList<>(inputList);' seals the private boundary.",
    hint: "Defensive copying on constructor input.",
    level: "Intermediate",
    codeExample: "public ClassRoster(List<String> students) {\n    this.students = new ArrayList<>(students); // Defensive copy breaks external alias\n}"
  },
  {
    question: "What is a 'Transient Private Field'?",
    shortAnswer: "A private field marked with 'transient' that is excluded from serialization while remaining hidden from outside code.",
    explanation: "Combining 'private' with 'transient' ensures the variable is invisible to outside classes during normal execution AND skipped when writing the object to an ObjectOutputStream.",
    hint: "Hidden from classes and hidden from serialization streams.",
    level: "Intermediate",
    codeExample: "private transient String cachedSessionToken;"
  },
  {
    question: "Can an anonymous inner class access private members of its enclosing class?",
    shortAnswer: "Yes! Anonymous inner classes have full access to all private fields and methods of their outer enclosing class.",
    explanation: "Just like named inner classes, anonymous inner classes belong to the outer class's nest and can read and mutate outer private state seamlessly.",
    hint: "Anonymous classes share outer class scope.",
    level: "Intermediate",
    codeExample: "button.addActionListener(e → this.privateField = true);"
  },
  {
    question: "What is the relationship between Data Hiding and the Single Responsibility Principle (SRP)?",
    shortAnswer: "Data Hiding ensures a class manages its own data exclusively, preventing other classes from meddling in its single designated responsibility.",
    explanation: "When fields are private, other classes cannot take over data manipulation. The class remains the sole authority over its internal business logic, maintaining high cohesion and SRP.",
    hint: "Ownership of state defines ownership of responsibility.",
    level: "Advanced",
    codeExample: "// Vault handles authentication; Payroll handles salary calculation"
  },
  {
    question: "How does the 'private' modifier support Thread Safety?",
    shortAnswer: "It guarantees that state changes cannot happen from arbitrary outside threads without passing through synchronized methods or lock blocks.",
    explanation: "If fields were public, external threads could interleave un-synchronized writes. Hiding data forces all threads through the class's synchronized methods.",
    hint: "Private state ensures all thread mutations follow the class concurrency policy.",
    level: "Intermediate",
    codeExample: "private int counter = 0;\npublic synchronized void increment() { counter++; }"
  },
  {
    question: "What is the difference between 'package-private' (default) and 'private' visibility?",
    shortAnswer: "'private' is visible only inside the same class; 'package-private' (no modifier) is visible to all classes in the same package.",
    explanation: "Default access allows neighboring classes in the same package directory to inspect and mutate fields. Data Hiding requires 'private' to restrict access strictly to the declaring class.",
    hint: "Class-level restriction vs Package-level sharing.",
    level: "Beginner",
    codeExample: "int defaultField;      // Package-private: visible to all classes in package\nprivate int privateField; // Private: visible ONLY inside this class"
  },
  {
    question: "What is Sukanta Hui's Vault Analogy for Data Hiding at the Barrackpore Academy?",
    shortAnswer: "A bank never leaves cash on the sidewalk; it locks currency in a private underground vault and exposes a fortified teller window. Treat your class fields as currency in a vault.",
    explanation: "At the Barrackpore campus, Sukanta Hui teaches that an unhidden field is like dumping cash in the street. By marking fields 'private' and exposing only validated public teller methods ('authenticate', 'changePassword'), your domain records remain forever secure and uncompromised.",
    hint: "Private vault within, fortified teller window without.",
    level: "Beginner",
    codeExample: "// Sukanta Hui's Vault Architecture: Private Fields (Vault) → Public Methods (Teller Window) → Guarded Contracts"
  }
];

export default topic11_questions;
