/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 12: Access Modifiers Overview: private, default, protected, public
 * High-Yield Technical Interview & Academic Q&A Catalog (30 Questions)
 * ============================================================================
 *
 * Educator: Sukanta Hui
 * Academic Centres: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 * ============================================================================
 */

const topic12_questions = [
  {
    question: "What are the 4 Access Modifiers in Java and their visibility order from most restrictive to least restrictive?",
    shortAnswer: "1. private (most restrictive) → 2. default (package-private) → 3. protected → 4. public (least restrictive).",
    explanation: "Java controls member visibility through these 4 tiers. Private restricts to the same class; default extends to the same package; protected extends to subclasses across packages; public extends globally.",
    hint: "Private → Default → Protected → Public.",
    level: "Beginner",
    codeExample: "private int a; // Class\nint b;         // Package\nprotected int c; // Package + Subclass\npublic int d;    // World"
  },
  {
    question: "What is 'Package-Private' (Default) access in Java?",
    shortAnswer: "The access level applied when no modifier keyword is written; members are accessible to all classes in the same package.",
    explanation: "There is no keyword named 'default' for access control (except in interfaces for default methods). Leaving a member without a modifier gives it package-private access, making it visible to all classes in that exact package directory.",
    hint: "No modifier specified = visible in the same package.",
    level: "Beginner",
    codeExample: "class PackageHelper { void assist() {} } // Both class and method are package-private"
  },
  {
    question: "What is the difference between 'default' (package-private) and 'protected' access?",
    shortAnswer: "'protected' allows subclasses in DIFFERENT packages to access the member via inheritance; 'default' does NOT allow cross-package subclass access.",
    explanation: "Both modifiers allow full access within the same package. However, if a subclass extends the parent from another package, it can access 'protected' parent members but is completely blocked from 'default' parent members.",
    hint: "Protected crosses package boundaries for subclasses.",
    level: "Intermediate",
    codeExample: "// Package A:\npublic class Parent { protected void hook() {} void internal() {} }\n// Package B:\npublic class Child extends Parent { void test() { hook(); /* internal() is illegal! */ } }"
  },
  {
    question: "Can a top-level (outer) class in Java be declared 'private' or 'protected'?",
    shortAnswer: "No. Top-level classes can only be 'public' or package-private (no modifier).",
    explanation: "A top-level class cannot be 'private' because it would be unusable by any other file, nor 'protected' because package-level scoping already suffices. Only nested/inner classes can be private or protected.",
    hint: "Top-level classes have only 2 choices: public or default.",
    level: "Beginner",
    codeExample: "// Compile Error: private class MyClass {}\n// Valid: public class MyClass {} or class MyClass {}"
  },
  {
    question: "How does a subclass in another package access a 'protected' member of its superclass?",
    shortAnswer: "Only through inheritance ('this.member' or 'super.member') or on references of the subclass's own type, NOT on a raw parent instance.",
    explanation: "Under JLS §6.6.2, a subclass in a different package cannot write 'Parent p = new Parent(); p.protectedField;' because it cannot access protected members on instances of the parent class directly, only on instances of its own subtype.",
    hint: "Protected access across packages requires subclass context.",
    level: "Advanced",
    codeExample: "class Sub extends Super {\n    void test() {\n        this.protectedMethod(); // Valid!\n        // new Super().protectedMethod(); // Compile Error in different package!\n    }\n}"
  },
  {
    question: "What are the access modifier rules when overriding a method in a subclass?",
    shortAnswer: "The overriding method CANNOT reduce visibility (it must have the same or wider access modifier).",
    explanation: "If a parent method is 'protected', the child can make it 'protected' or 'public', but NOT 'default' or 'private'. Reducing visibility violates the Liskov Substitution Principle and causes a compile error ('attempting to assign weaker access privileges').",
    hint: "Visibility can stay the same or widen, never narrow.",
    level: "Intermediate",
    codeExample: "class Parent { protected void serve() {} }\nclass Child extends Parent { public void serve() {} } // Valid widening!"
  },
  {
    question: "What is the access level of members declared inside an Interface?",
    shortAnswer: "Fields are implicitly 'public static final'; methods are implicitly 'public abstract' (unless marked default, static, or private).",
    explanation: "Every field in an interface is an immutable public constant. Methods without bodies are implicitly public abstract. Java 9 allows private methods in interfaces for helper routines.",
    hint: "Interfaces are public contracts by default.",
    level: "Beginner",
    codeExample: "interface Worker {\n    int MAX = 10; // public static final\n    void work();  // public abstract\n}"
  },
  {
    question: "Can a constructor have a different access modifier than its enclosing class?",
    shortAnswer: "Yes! A public class can have private, protected, or package-private constructors.",
    explanation: "For example, Singleton classes are 'public class Singleton' with a 'private Singleton()' constructor. Utility classes have private constructors to prevent instantiation.",
    hint: "Constructor access controls who can instantiate the class.",
    level: "Intermediate",
    codeExample: "public class MathUtils {\n    private MathUtils() {} // Prevents instantiation while class is public\n}"
  },
  {
    question: "What is the default access modifier of local variables declared inside a method?",
    shortAnswer: "Local variables have NO access modifiers (not even default); they are scoped strictly to the enclosing method block.",
    explanation: "Access modifiers (private, protected, public) cannot be applied to local variables. The only modifier allowed on a local variable is 'final'.",
    hint: "Local variables are block-scoped, not class members.",
    level: "Beginner",
    codeExample: "void test() {\n    // public int x = 10; // Compile Error: illegal start of expression\n    final int y = 20;     // Valid!\n}"
  },
  {
    question: "How does the Java 9+ Module System (JPMS) restrict 'public' classes?",
    shortAnswer: "A public class is only accessible outside its module if its package is explicitly 'exported' in module-info.java.",
    explanation: "Before Java 9, 'public' meant universally accessible. With JPMS, if a package is not exported, its public classes are treated as internal and cannot be accessed by other modules.",
    hint: "Module boundaries supercede public access modifiers.",
    level: "Advanced",
    codeExample: "// module-info.java:\nmodule academy.core {\n    exports com.academy.api; // com.academy.internal remains hidden!\n}"
  },
  {
    question: "Why should fields in a public API class NEVER be declared 'protected' unless designed for inheritance?",
    shortAnswer: "Because 'protected' exposes fields to anyone in the same package and tightly couples subclasses to internal field representations.",
    explanation: "Joshua Bloch (Effective Java Item 15) warns that 'protected' is part of the exported API and must be supported forever. Changing a protected field breaks external subclasses.",
    hint: "Protected fields become permanent public commitments.",
    level: "Intermediate",
    codeExample: "// BAD: protected double balance;\n// GOOD: private double balance; protected double getBalance() { return balance; }"
  },
  {
    question: "Can two classes in DIFFERENT sub-packages (e.g. 'com.app.core' and 'com.app.core.util') access each other's default (package-private) members?",
    shortAnswer: "No! Sub-packages in Java are completely independent packages with zero inheritance of package-private access.",
    explanation: "In Java, package hierarchy is purely visual/conceptual. 'com.app.core' and 'com.app.core.util' are treated as two distinct, unrelated packages by the compiler and JVM.",
    hint: "Sub-packages do not inherit package-private visibility.",
    level: "Intermediate",
    codeExample: "// com.app.core.A cannot access package-private members in com.app.core.util.B"
  },
  {
    question: "What is 'Subsystem Encapsulation' and which access modifier is used for internal collaborator classes?",
    shortAnswer: "Package-private (default) access; it allows classes within a package to collaborate freely while presenting only 1 public facade class to the outside world.",
    explanation: "By making internal parsers, validators, and handlers package-private, outside packages only see the single public Service class, keeping the public API footprint minimal.",
    hint: "Package-private classes form internal subsystem machinery.",
    level: "Intermediate",
    codeExample: "class InternalParser {} // Package-private\npublic class PublicService { InternalParser p; } // Public Facade"
  },
  {
    question: "Can an abstract class have a 'private' abstract method?",
    shortAnswer: "No! Abstract methods MUST be implemented by subclasses, but private methods cannot be inherited or overridden.",
    explanation: "Combining 'private' with 'abstract' creates a logical contradiction that causes a compile-time error: 'illegal combination of modifiers: abstract and private'.",
    hint: "Abstract demands overriding; private forbids overriding.",
    level: "Beginner",
    codeExample: "// Compile Error:\n// abstract class Demo { private abstract void compute(); }"
  },
  {
    question: "Can an abstract class have 'private' concrete methods?",
    shortAnswer: "Yes! Abstract classes can contain private concrete helper methods used by their own implemented methods.",
    explanation: "Private concrete methods in abstract classes provide shared internal utilities that are not exposed to child classes.",
    hint: "Concrete private helpers in abstract classes are completely legal.",
    level: "Beginner",
    codeExample: "abstract class BaseDao {\n    private void logSql(String q) { ... }\n    public void execute(String q) { logSql(q); doExec(q); }\n}"
  },
  {
    question: "What is the access level of an enum constant?",
    shortAnswer: "Enum constants are implicitly 'public static final'.",
    explanation: "Every enum constant (e.g. 'Status.ACTIVE') is a globally accessible, immutable instance of the enum class.",
    hint: "Enum constants are public static final members.",
    level: "Beginner",
    codeExample: "enum Level { BEGINNER, ADVANCED } // Both are public static final Level"
  },
  {
    question: "How does the 'protected' modifier enable the 'Template Method Pattern' in OOP?",
    shortAnswer: "The parent class defines a public template workflow method that calls protected hook methods for subclasses to customize.",
    explanation: "In the Template Method pattern, the overall algorithm is final/public, while individual steps ('stepA()', 'stepB()') are declared protected so subclasses can override them without exposing them to general callers.",
    hint: "Protected hooks inside a public template method.",
    level: "Advanced",
    codeExample: "public abstract class ReportGenerator {\n    public final void generate() { readData(); format(); }\n    protected abstract void format(); // Protected hook\n}"
  },
  {
    question: "What happens if a class attempts to import a package-private class from another package?",
    shortAnswer: "A compile-time error occurs: '<ClassName> is not public in <package>; cannot be accessed from outside package'.",
    explanation: "Package-private classes cannot be imported or referenced by classes located in any other package directory.",
    hint: "Package-private classes cannot be imported across packages.",
    level: "Beginner",
    codeExample: "// Compile Error: import com.other.PackagePrivateClass;"
  },
  {
    question: "Can an overridden method in a subclass throw MORE checked exceptions if its access modifier is widened?",
    shortAnswer: "No! Widening access does not allow throwing new or broader checked exceptions.",
    explanation: "Access modifier rules (visibility can stay same or widen) and exception rules (checked exceptions can stay same or narrow) are independent constraints of method overriding.",
    hint: "Visibility can widen, but checked exceptions must never widen.",
    level: "Intermediate",
    codeExample: "class Parent { void run() throws IOException {} }\nclass Child extends Parent { public void run() {} } // Valid: widened access, narrowed exceptions"
  },
  {
    question: "Why should utility classes (e.g. StringUtils, MathHelpers) have a 'private' constructor?",
    shortAnswer: "To prevent accidental instantiation with 'new' and suppress the compiler-generated default public constructor.",
    explanation: "If no constructor is declared, javac automatically generates a public no-arg constructor ('public UtilityClass()'). Declaring a private constructor suppresses this default.",
    hint: "Suppress compiler default constructor to enforce static-only usage.",
    level: "Beginner",
    codeExample: "public final class ValidationUtils {\n    private ValidationUtils() { throw new AssertionError(\"No instances!\"); }\n}"
  },
  {
    question: "Can an inner class declared inside a method (Local Class) have access modifiers?",
    shortAnswer: "No! Local inner classes cannot have public, protected, private, or static modifiers.",
    explanation: "Local classes are scoped purely within the executing method block, just like local variables, and cannot declare access modifiers.",
    hint: "Local classes have no access modifiers.",
    level: "Intermediate",
    codeExample: "void process() {\n    class LocalHelper {} // Valid: no access modifier allowed\n}"
  },
  {
    question: "What is the visibility of a static nested class declared 'private' inside a public class?",
    shortAnswer: "Visible only within the enclosing outer class and its inner nestmates.",
    explanation: "Private static nested classes are commonly used for internal data structures (e.g. 'private static class Node<E>' in LinkedList) that external callers should never see.",
    hint: "Internal data structure hidden inside outer class.",
    level: "Intermediate",
    codeExample: "public class CustomList {\n    private static class Node { int data; Node next; }\n}"
  },
  {
    question: "How does the 'protected' modifier interact with Object's 'clone()' and 'finalize()' methods?",
    shortAnswer: "Object.clone() is protected in java.lang.Object; a class must override it as 'public' and implement Cloneable to allow external cloning.",
    explanation: "Because clone() is protected in Object, code in unrelated packages cannot call 'student.clone()' unless the Student class explicitly overrides clone() with public visibility.",
    hint: "clone() is protected in java.lang.Object.",
    level: "Advanced",
    codeExample: "public class Student implements Cloneable {\n    @Override\n    public Object clone() throws CloneNotSupportedException { return super.clone(); }\n}"
  },
  {
    question: "Can a subclass make a public method 'protected'?",
    shortAnswer: "No! A subclass cannot reduce the visibility of an inherited method; overriding a public method as protected causes a compile error.",
    explanation: "Under polymorphic dispatch, any code holding a reference to the parent expects to call public methods. Narrowing visibility breaks polymorphic substitution.",
    hint: "Never reduce inherited visibility.",
    level: "Beginner",
    codeExample: "// Compile Error: 'attempting to assign weaker access privileges; was public'"
  },
  {
    question: "What is the access level of a default constructor generated by the Java compiler?",
    shortAnswer: "The default constructor receives the exact same access modifier as its enclosing class.",
    explanation: "If the class is declared 'public', the generated default constructor is 'public'. If the class is package-private, the generated default constructor is package-private.",
    hint: "Matches the visibility of the class declaration.",
    level: "Intermediate",
    codeExample: "// 'public class Student {}' → Compiler generates: 'public Student() {}'"
  },
  {
    question: "What is 'Friendly' access in legacy Java terminology?",
    shortAnswer: "An informal historical term for package-private (default) access.",
    explanation: "In early Java 1.0 documentation, package-private was informally called 'friendly access' because classes in the same package were considered friends that could see each other's default members.",
    hint: "Synonym for package-private access.",
    level: "Beginner",
    codeExample: "// 'Friendly' = Package-private = No modifier"
  },
  {
    question: "How do access modifiers affect Java Reflection performance and security?",
    shortAnswer: "Access modifiers are verified by the JVM security manager and bytecode verifier; reflective bypasses require SecurityPermission and add invocation overhead.",
    explanation: "Reflective invocations on non-public members require security checks that can be blocked in secure sandbox environments and disable certain JIT inlining optimizations.",
    hint: "Public access allows direct, fast JIT execution without reflective checks.",
    level: "Advanced",
    codeExample: "// JIT optimizes direct public/protected invocations with zero security check overhead"
  },
  {
    question: "Can a record in Java 16+ have private constructors or private static methods?",
    shortAnswer: "Yes! Records can declare private canonical/custom constructors and private static helper methods.",
    explanation: "Records support private static helper methods and private constructors when factory methods or builder patterns are preferred.",
    hint: "Records allow private constructors and static helpers.",
    level: "Intermediate",
    codeExample: "public record Point(int x, int y) {\n    private Point { /* Validation */ }\n    public static Point of(int x, int y) { return new Point(x, y); }\n}"
  },
  {
    question: "What is the 'Principle of Least Privilege' in choosing access modifiers?",
    shortAnswer: "Every module, class, and member should be granted the minimum visibility necessary to accomplish its intended function.",
    explanation: "Always start by declaring fields and helper methods 'private'. Only escalate to package-private if collaborating within the package, protected if designed for extension, and public for exported APIs.",
    hint: "Start at Private and escalate only when strictly necessary.",
    level: "Beginner",
    codeExample: "1. private → 2. package-private → 3. protected → 4. public"
  },
  {
    question: "What is Sukanta Hui's Concentric Circle Hierarchy for Access Modifiers?",
    shortAnswer: "Visualize 4 concentric rings: Private is the inner sanctum, Default is your local village (package), Protected is your extended family (subclasses), and Public is the global highway.",
    explanation: "At the Barrackpore academy, Sukanta Hui teaches this mental model to ensure students never hesitate on access control. Keep your inner sanctum guarded, collaborate freely in your village, share heritage with your family, and open only official gates to the highway.",
    hint: "Inner Sanctum → Village → Family → Highway.",
    level: "Beginner",
    codeExample: "// Sukanta Hui's Hierarchy:\n// Private (Sanctum) → Default (Village) → Protected (Family) → Public (Highway)"
  }
];

export default topic12_questions;
