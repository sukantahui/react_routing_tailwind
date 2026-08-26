/**
 * Module 002_001: Topic 2: Class definition: syntax, anatomy, and naming conventions
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the complete syntax anatomy of a standard Java Class declaration?",
    shortAnswer: "`[Access Modifier] [Non-Access Modifiers] class ClassName [extends Superclass] [implements Interface1, Interface2] { ... }`",
    explanation: "Class header syntax grammar.",
    hint: "Modifiers + class + ClassName + extends + implements + { body }.",
    level: "basic",
    codeExample: "public final class StudentProfile extends Person implements Serializable { ... }"
  },
  {
    question: "What are the 8 standard architectural sections inside a well-structured Java class?",
    shortAnswer: "1. Package declaration, 2. Import statements, 3. Class header/modifiers, 4. Static constants, 5. Instance fields, 6. Constructors, 7. Instance & static methods, 8. Overridden Object methods (`toString`, `equals`, `hashCode`).",
    explanation: "The 8 architectural sections of a Java class.",
    hint: "Package, Imports, Class Header, Constants, Fields, Constructors, Methods, Object overrides.",
    level: "basic",
    codeExample: "// Package -> Imports -> Class -> Constants -> Fields -> Constructors -> Methods -> Overrides"
  },
  {
    question: "What are the allowed Top-Level Class Access Modifiers in Java?",
    shortAnswer: "Only **`public`** or **default (package-private)**. (Top-level classes CANNOT be `private` or `protected`).",
    explanation: "Top-level class visibility constraints.",
    hint: "Only public and package-private (no modifier) are allowed for top-level classes.",
    level: "basic",
    codeExample: "public class PublicClass {} | class PackagePrivateClass {}"
  },
  {
    question: "What happens if a `.java` file contains a `public class Foo`?",
    shortAnswer: "The source file MUST be named identically as `Foo.java`; otherwise, the Java compiler raises an error (`error: class Foo is public, should be declared in a file named Foo.java`).",
    explanation: "Public class file naming invariant.",
    hint: "Source file name must match the public class name exactly.",
    level: "basic",
    codeExample: "public class StudentProfile {} // File MUST be StudentProfile.java"
  },
  {
    question: "Can a single Java source file contain MULTIPLE top-level classes?",
    shortAnswer: "YES! But **at most ONE class can be declared `public`**; all other top-level classes must be package-private (default visibility).",
    explanation: "Multiple top-level classes in a single file rule.",
    hint: "Yes, but at most one class can be public.",
    level: "basic",
    codeExample: "public class MainClass {} class HelperClass {} // Legal in MainClass.java"
  },
  {
    question: "What is the naming convention for Class and Record identifiers?",
    shortAnswer: "**UpperCamelCase** (PascalCase), using descriptive nouns (e.g. `StudentProfile`, `PaymentGateway`, `CourseEnrollmentManager`).",
    explanation: "Class identifier naming standard.",
    hint: "UpperCamelCase with initial capital letters for each word.",
    level: "basic",
    codeExample: "public class StudentProfile { ... }"
  },
  {
    question: "What does the `final` non-access modifier do when applied to a Class header?",
    shortAnswer: "It prevents the class from being **subclassed or inherited** by any other class (e.g. `java.lang.String` and `java.lang.Math` are `final`).",
    explanation: "Final class semantics.",
    hint: "Prevents inheritance; the class cannot be extended.",
    level: "basic",
    codeExample: "public final class ImmutableRecord {}"
  },
  {
    question: "What is a 'Static Factory Method' and why is it useful?",
    shortAnswer: "A static method that returns an instance of the class (e.g. `createFullMarksStudent(...)`); unlike constructors, they have descriptive names and can return cached instances or subtypes.",
    explanation: "Static factory methods (Effective Java Item 1).",
    hint: "Named static method returning an object instance with clear intent.",
    level: "intermediate",
    codeExample: "public static StudentProfile createFullMarksStudent(int roll, String name, String course)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the result of comparing `swadeep.equals(swadeepDuplicate)`?",
    shortAnswer: "`true` (because both objects shared the same roll number `#101` as defined in `equals()`).",
    explanation: "Overridden equals() method verification.",
    hint: "true (logical equality based on rollNumber).",
    level: "basic",
    codeExample: "swadeep.equals(swadeepDuplicate) -> true"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the result of `swadeep == swadeepDuplicate`?",
    shortAnswer: "`false` (because `swadeep` and `swadeepDuplicate` were created with `new` and reside at **different Heap memory addresses**).",
    explanation: "Reference address vs logical equality.",
    hint: "false (different memory addresses in Heap).",
    level: "basic",
    codeExample: "swadeep == swadeepDuplicate -> false"
  },
  {
    question: "Why must `hashCode()` ALWAYS be overridden whenever `equals()` is overridden?",
    shortAnswer: "To uphold the **General Contract of hashCode**: If two objects are equal according to `equals()`, they **MUST produce the exact same integer hash code**; otherwise, hash collections (`HashMap`, `HashSet`) will lose elements.",
    explanation: "equals and hashCode contract.",
    hint: "Equal objects must have equal hash codes to work correctly in HashMaps/HashSets.",
    level: "intermediate",
    codeExample: "@Override public int hashCode() { return Objects.hash(rollNumber); }"
  },
  {
    question: "What is the difference between a Member Field and a Local Variable?",
    shortAnswer: "**Member Fields** belong to the class/object and reside in Heap memory with default initial values; **Local Variables** belong to a method frame, reside on the Stack, and have NO default values.",
    explanation: "Field vs Local variable lifecycle.",
    hint: "Fields live on Heap with default values; Local variables live on Stack without defaults.",
    level: "basic",
    codeExample: "private double theoryMarks; // Field | int temp = 0; // Local"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was Swadeep's total percentage across theory (92.0) and practical (96.0)?",
    shortAnswer: "$(92.0 + 96.0) / 200 \\times 100 = 188.0 / 200 \\times 100 =$ **94.0%**.",
    explanation: "Student profile calculation verification.",
    hint: "94.0%.",
    level: "basic",
    codeExample: "computePercentage() -> 94.0%"
  },
  {
    question: "What is the purpose of the `this` keyword inside instance methods and constructors?",
    shortAnswer: "`this` is a reference to the **current object instance** executing the method or constructor, used to resolve variable shadowing or invoke constructors.",
    explanation: "this keyword definition.",
    hint: "Reference to the current object instance.",
    level: "basic",
    codeExample: "this.rollNumber = rollNumber;"
  },
  {
    question: "Can an `abstract` class be declared `final` in Java?",
    shortAnswer: "NO! `abstract` requires subclasses to implement it, while `final` prohibits subclassing; combining them is a direct contradiction and triggers a compile-time error.",
    explanation: "Illegal modifier combination.",
    hint: "No, abstract and final are mutually exclusive.",
    level: "basic",
    codeExample: "// Compile error: illegal combination of modifiers: abstract and final"
  },
  {
    question: "What are 'Nested Classes' in Java?",
    shortAnswer: "Classes defined within the body of another enclosing class: can be **Static Nested Classes** or **Non-Static Inner Classes**.",
    explanation: "Nested class definition.",
    hint: "Classes defined inside another enclosing class.",
    level: "intermediate",
    codeExample: "public static final class StudentProfile { ... }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the minimum pass marks defined by the static constant?",
    shortAnswer: "**40.0 marks** (`DEFAULT_MINIMUM_PASS_MARKS = 40.0`).",
    explanation: "Static constant value verification.",
    hint: "40.0 marks.",
    level: "basic",
    codeExample: "public static final double DEFAULT_MINIMUM_PASS_MARKS = 40.0;"
  },
  {
    question: "What is the return type of a Constructor in Java?",
    shortAnswer: "Constructors have **NO return type** (not even `void`). If you add `void Foo()`, Java treats it as a standard method, NOT a constructor.",
    explanation: "Constructor signature rules.",
    hint: "Constructors have no return type, not even void.",
    level: "basic",
    codeExample: "public StudentProfile(...) // No return type"
  },
  {
    question: "What is a 'POJO' (Plain Old Java Object)?",
    shortAnswer: "A standard Java class unencumbered by framework-specific annotations, interfaces, or inheritance hierarchies, typically having private fields and getters/setters.",
    explanation: "POJO definition.",
    hint: "Plain Old Java Object with private fields and standard accessors.",
    level: "basic",
    codeExample: "// Simple POJO representing domain state"
  },
  {
    question: "Why should `Objects.hash()` be used to implement `hashCode()`?",
    shortAnswer: "`Objects.hash(field1, field2)` generates a robust, well-distributed 31-multiplier hash code handling nulls safely in a single clean call.",
    explanation: "Objects.hash utility benefits.",
    hint: "Computes robust well-distributed hash codes handling nulls automatically.",
    level: "basic",
    codeExample: "return Objects.hash(rollNumber, fullName);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what were Abhronila's marks when created via the factory method?",
    shortAnswer: "Theory: `100.0`, Practical: `100.0` (Total: 200.0, 100.0%).",
    explanation: "Factory method marks verification.",
    hint: "100.0 Theory, 100.0 Practical.",
    level: "basic",
    codeExample: "StudentProfile.createFullMarksStudent(103, \"Abhronila\", \"Java Core Pro\")"
  },
  {
    question: "What is the JavaBean naming convention for boolean getters?",
    shortAnswer: "Prefix with **`is`** or **`has`** instead of `get` (e.g. `public boolean hasPassed()`, `public boolean isEnrolled()`).",
    explanation: "Boolean accessor naming convention.",
    hint: "Prefix boolean getters with 'is' or 'has' (e.g. hasPassed()).",
    level: "basic",
    codeExample: "public boolean hasPassed() { return ...; }"
  },
  {
    question: "What is 'Self-Assignment' in a constructor and how does `this` prevent it?",
    shortAnswer: "Writing `fullName = fullName;` assigns the parameter to itself, leaving the instance field uninitialized (`null`); `this.fullName = fullName;` assigns the parameter to the instance field.",
    explanation: "Self-assignment prevention with this keyword.",
    hint: "this.field = param distinguishes instance field from local parameter.",
    level: "basic",
    codeExample: "this.fullName = fullName; // Correct"
  },
  {
    question: "What happens if an invalid theory mark of `150.0` is passed to `setMarks`?",
    shortAnswer: "The method throws `IllegalArgumentException: theory marks must be in [0..100]: 150.0`.",
    explanation: "Validation exception behavior.",
    hint: "Throws IllegalArgumentException.",
    level: "basic",
    codeExample: "if (theory < 0.0 || theory > 100.0) throw new IllegalArgumentException(...);"
  },
  {
    question: "In `equals(Object o)`, why do we check `if (this == o) return true;` first?",
    shortAnswer: "As a fast performance optimization: if both references point to the exact same Heap memory address, they are reflexively equal, skipping field-by-field comparisons.",
    explanation: "Reflexive identity check optimization in equals().",
    hint: "Fast performance check: identical memory address means reflexive equality.",
    level: "intermediate",
    codeExample: "if (this == o) return true;"
  },
  {
    question: "Can a constructor be declared `private`?",
    shortAnswer: "YES! Private constructors prevent external instantiation, commonly used in Singleton classes, Utility classes, or classes exposing static factory methods exclusively.",
    explanation: "Private constructor use cases.",
    hint: "Yes, private constructors enforce factory methods or singleton patterns.",
    level: "basic",
    codeExample: "private StudentProfile(...) {}"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was Debangshu's total marks (78.0 theory, 84.0 practical)?",
    shortAnswer: "$78.0 + 84.0 =$ **162.0 marks** (81.0%).",
    explanation: "Debangshu marks computation.",
    hint: "162.0 marks (81.0%).",
    level: "basic",
    codeExample: "78.0 + 84.0 = 162.0"
  },
  {
    question: "What is the ultimate takeaway of Module 002_001 Topic 2 for Java developers?",
    shortAnswer: "A production Java class is a structured blueprint consisting of 8 clear sections: static constants, private instance fields, robust constructors with invariant guards, domain behavior methods, validating accessors, and overridden `toString`/`equals`/`hashCode` methods.",
    explanation: "Mastery of class definition syntax and anatomy.",
    hint: "A clean class structure: constants -> private fields -> constructors -> domain methods -> equals/hashCode.",
    level: "basic",
    codeExample: "// Summary: Complete 8-part Java Class Architecture"
  },
  {
    question: "What is the next topic (Topic 3) in Module 002_001?",
    shortAnswer: "Object instantiation using the 'new' keyword.",
    explanation: "Topic 3 explores the low-level lifecycle and mechanics of the new keyword.",
    hint: "Object instantiation using the 'new' keyword.",
    level: "basic",
    codeExample: "// Topic 3: Object Instantiation using 'new' Keyword"
  },
  {
    question: "How does the Java 21 Record syntax compare to standard Class anatomy?",
    shortAnswer: "Records automatically generate private final fields, canonical constructor, accessors, `equals()`, `hashCode()`, and `toString()`, replacing 50 lines of boilerplate with a single line.",
    explanation: "Java Records vs standard Class comparison.",
    hint: "Records generate fields, constructors, accessors, and equals/hashCode automatically.",
    level: "intermediate",
    codeExample: "public record StudentProfile(int roll, String name, double gpa) {}"
  }
];

export default questions;
