/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 10: Encapsulation Principle: Bundling Data and Methods into a Single Unit
 * High-Yield Technical Interview & Academic Q&A Catalog (30 Questions)
 * ============================================================================
 *
 * Educator: Sukanta Hui
 * Academic Centres: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 * ============================================================================
 */

const topic10_questions = [
  {
    question: "What is the Encapsulation Principle in Object-Oriented Programming?",
    shortAnswer: "The bundling of state (data fields) and behaviors (methods) into a single cohesive unit (Class) while restricting direct external access to internal data.",
    explanation: "Encapsulation combines data and the code that manipulates that data into a protective capsule. It shields internal representation from outside interference and misuse, exposing only a validated, controlled public API.",
    hint: "Think of a medicinal capsule wrapping active ingredients.",
    level: "Beginner",
    codeExample: "public class EncapsulatedAccount {\n    private double balance; // Hidden data\n    public void deposit(double amt) { if (amt > 0) balance += amt; } // Guarded behavior\n}"
  },
  {
    question: "What are the two foundational pillars of Encapsulation?",
    shortAnswer: "1. Data Bundling (combining fields and methods in one class), and 2. Data Hiding (restricting direct field access using access modifiers).",
    explanation: "Bundling without data hiding is incomplete (e.g. public fields). True encapsulation requires both: grouping related fields and methods together, AND hiding internal fields behind private access modifiers.",
    hint: "Cohesion (bundling) + Protection (data hiding).",
    level: "Intermediate",
    codeExample: "// True Encapsulation = Private Fields + Public Guarded Methods"
  },
  {
    question: "What is a 'Class Invariant' in software architecture?",
    shortAnswer: "A business rule or condition that must always evaluate to true for an object throughout its entire lifecycle.",
    explanation: "For example, in a Bank Account, 'balance >= 0' and 'accountNumber > 0' are class invariants. Encapsulation guarantees invariants because only the class's own methods can mutate state, rejecting any invalid transition.",
    hint: "An unshakeable rule that an object must never break.",
    level: "Intermediate",
    codeExample: "public boolean withdraw(double amount) {\n    if (amount > this.balance) return false; // Defends the invariant: balance >= 0\n    this.balance -= amount;\n    return true;\n}"
  },
  {
    question: "Why are public instance variables considered a serious violation of Encapsulation?",
    shortAnswer: "They allow external code to directly mutate fields to invalid or corrupted values without validation, logging, or invariant checking.",
    explanation: "With 'public double balance', any class in the entire application can write 'account.balance = -999999.0;'. There is zero validation, zero security check, zero audit logging, and no way to change internal storage format without breaking client code.",
    hint: "Direct access destroys safety and tight-couples client code to field layout.",
    level: "Beginner",
    codeExample: "// DANGEROUS UNENCAPSULATED CLASS:\npublic class BadAccount {\n    public double balance; // Anyone can set negative balance!\n}"
  },
  {
    question: "How does Encapsulation improve system maintainability and evolvability?",
    shortAnswer: "Internal field representations can be refactored or optimized without breaking any client code calling the public API.",
    explanation: "If you change internal storage from 'double balanceInr' to 'BigDecimal balanceCents' or an encrypted byte array, client code calling 'account.deposit(100.0)' or 'account.getBalance()' remains 100% untouched and functioning.",
    hint: "Hiding implementation details allows changing them freely.",
    level: "Intermediate",
    codeExample: "// Internal refactoring: 'balance' changed to 'BigDecimal', getters/setters maintain double API contract"
  },
  {
    question: "What is the difference between Encapsulation and Data Hiding?",
    shortAnswer: "Encapsulation is the broader concept of bundling data and code into a capsule; Data Hiding is the specific mechanism of making fields private.",
    explanation: "Data Hiding is a subset/technique within Encapsulation. Encapsulation wraps data and methods together; Data Hiding restricts visibility of internal fields to prevent direct manipulation.",
    hint: "Encapsulation is the capsule; Data Hiding is the opaque shell.",
    level: "Intermediate",
    codeExample: "// Encapsulation = Structure (Class) + Protection (private fields)"
  },
  {
    question: "How does Encapsulation enable centralized Audit Logging and Event Dispatching?",
    shortAnswer: "Because all state modifications flow through specific methods, logging and notifications can be recorded in one central place.",
    explanation: "When fields are private, every deposit, withdrawal, or name change passes through its designated method. You can add timestamped audit logs, database writes, or Kafka events in that single method without modifying client callers.",
    hint: "Single point of mutation enables single point of observation.",
    level: "Intermediate",
    codeExample: "public void updateEmail(String email) {\n    validate(email);\n    this.email = email;\n    auditLogger.log(\"Email changed to: \" + email); // Centralized audit!\n}"
  },
  {
    question: "What is the 'Tell, Don't Ask' principle in relation to Encapsulation?",
    shortAnswer: "Tell the object what behavior to execute, rather than asking for its data and manipulating it externally.",
    explanation: "Instead of querying an object's balance and calculating fees outside the class, invoke an instance method on the object ('account.applyMonthlyFee()') so the object manages its own state and invariants internally.",
    hint: "Delegate behavior to the object owning the data.",
    level: "Intermediate",
    codeExample: "// BAD (Ask): if (acc.getBalance() > 100) acc.setBalance(acc.getBalance() - 100);\n// GOOD (Tell): acc.payFee(100.0);"
  },
  {
    question: "What is an 'Anemic Domain Model' anti-pattern?",
    shortAnswer: "A class that has private fields with simple getters and setters for everything but contains no real domain logic or validation.",
    explanation: "Coined by Martin Fowler, an anemic domain model looks encapsulated on the surface (private fields + getters/setters), but is effectively equivalent to public fields because anyone can set any value without business logic or invariant enforcement.",
    hint: "A dumb data holder pretending to be an encapsulated object.",
    level: "Advanced",
    codeExample: "// Anemic Model: Class with zero logic, just getters and setters for every field"
  },
  {
    question: "How does returning an unmodifiable collection protect encapsulation?",
    shortAnswer: "It prevents external callers from calling .add(), .remove(), or .clear() on the object's internal collection.",
    explanation: "Returning 'Collections.unmodifiableList(this.auditLog)' returns a read-only decorator. Any attempt by external code to mutate the list throws an UnsupportedOperationException, preserving internal state integrity.",
    hint: "Wraps internal collections in read-only armor.",
    level: "Intermediate",
    codeExample: "public List<String> getAuditLog() {\n    return Collections.unmodifiableList(this.auditLog);\n}"
  },
  {
    question: "Can an encapsulated class have package-private (default) or protected helper methods?",
    shortAnswer: "Yes. Encapsulation does not mean everything must be strictly public or private; it means access is intentionally constrained to the appropriate architectural boundary.",
    explanation: "Package-private helper methods can collaborate with related classes in the same package (Subsystem Encapsulation) while remaining completely hidden from external packages.",
    hint: "Tiered access boundaries support layered encapsulation.",
    level: "Intermediate",
    codeExample: "void internalRecalculate() { ... } // Package-private collaboration method"
  },
  {
    question: "How does the 'final' keyword on class fields reinforce Encapsulation?",
    shortAnswer: "It guarantees that the field pointer or primitive value cannot be reassigned after construction, making the baseline identity immutable.",
    explanation: "Declaring fields like 'private final int accountId;' ensures that even other methods inside the class cannot accidentally alter the primary key after construction.",
    hint: "Freezes field assignment to constructor time.",
    level: "Beginner",
    codeExample: "private final int accountId; // Assigned once in constructor, forever immutable"
  },
  {
    question: "What is 'Defensive Copying' and when is it required for encapsulated fields?",
    shortAnswer: "Creating a duplicate of a mutable object when receiving it in a constructor or returning it from a getter.",
    explanation: "If a class holds a mutable object (like java.util.Date or an array), returning the direct reference gives the caller an external alias that bypasses encapsulation. Returning a cloned/copied instance seals the boundary.",
    hint: "Never share raw references to internal mutable dependencies.",
    level: "Intermediate",
    codeExample: "public Date getBirthDate() {\n    return new Date(this.birthDate.getTime()); // Defensive Copy\n}"
  },
  {
    question: "Can a constructor violate Encapsulation if it does not validate parameters?",
    shortAnswer: "Yes! If a constructor accepts corrupted arguments without validation, the object is born in an invalid state, violating class invariants.",
    explanation: "The constructor is the primary gateway to object instantiation. Constructors must validate all parameters and throw IllegalArgumentException if arguments violate domain invariants.",
    hint: "Object invariants must be established at birth.",
    level: "Beginner",
    codeExample: "public Account(int id, double balance) {\n    if (id <= 0 || balance < 0) throw new IllegalArgumentException(\"Invalid account parameters!\");\n    this.id = id; this.balance = balance;\n}"
  },
  {
    question: "What is 'Law of Demeter' (Principle of Least Knowledge) in relation to Encapsulation?",
    shortAnswer: "A design guideline stating that a method should only invoke methods on its own fields, parameters, created objects, or 'this', avoiding train wrecks like 'a.getB().getC().getD().doSomething()'.",
    explanation: "Method chaining across multiple unrelated objects leaks structural internal details of foreign classes. Encapsulating delegations ('a.doSomethingOnD()') respects architectural boundaries.",
    hint: "Talk only to your immediate friends, not strangers.",
    level: "Advanced",
    codeExample: "// BAD (Train Wreck): student.getAddress().getCity().getZipCode().format();\n// GOOD (Demeter): student.getFormattedZipCode();"
  },
  {
    question: "How does Java 9+ Module System (JPMS) take Encapsulation to the architectural package level?",
    shortAnswer: "JPMS allows packages to be completely hidden inside a module, preventing external modules from accessing public classes unless explicitly 'exported'.",
    explanation: "Before Java 9, a 'public' class was accessible to any JAR on the classpath. JPMS strong encapsulation enforces that 'public' means public only within the module unless declared in 'module-info.java' with 'exports'.",
    hint: "Strong module-level encapsulation across JAR boundaries.",
    level: "Advanced",
    codeExample: "// module-info.java:\nmodule com.academy.finance {\n    exports com.academy.finance.api; // Internal impl packages stay hidden!\n}"
  },
  {
    question: "How does Encapsulation prevent Race Conditions in multi-threaded programming?",
    shortAnswer: "By routing all state mutations through synchronized methods or atomic primitives, preventing unsynchronized external thread updates.",
    explanation: "If fields are public, Thread 1 and Thread 2 can write to them concurrently without locks. Encapsulating fields behind synchronized mutator methods guarantees thread-safe mutual exclusion.",
    hint: "Encapsulated methods control the concurrency synchronization contract.",
    level: "Intermediate",
    codeExample: "public synchronized void credit(double amount) {\n    this.balance += amount; // Synchronized state mutation\n}"
  },
  {
    question: "What is the difference between a 'Read-Only' property and an 'Immutable Object'?",
    shortAnswer: "A read-only property has a getter but no setter (state may still change internally); an immutable object's entire state can never change after construction.",
    explanation: "In an account, 'balance' is a read-only property (no 'setBalance' method, only 'getBalance()'), but balance changes via 'deposit()' and 'withdraw()'. An immutable object (like String) never changes at all.",
    hint: "Read-only interface vs unchangeable entity.",
    level: "Intermediate",
    codeExample: "public double getBalance() { return this.balance; } // Read-only accessor for mutable balance"
  },
  {
    question: "Why should setters avoid blindly assigning parameters without validation?",
    shortAnswer: "Because unvalidated setters turn private fields into de facto public fields, destroying data integrity.",
    explanation: "Writing 'public void setAge(int age) { this.age = age; }' allows setting age to -500. Adding validation ('if (age < 0 || age > 130) throw ...') defends the domain invariant.",
    hint: "A setter without validation is a public field in disguise.",
    level: "Beginner",
    codeExample: "public void setAge(int age) {\n    if (age < 0 || age > 120) throw new IllegalArgumentException(\"Invalid age\");\n    this.age = age;\n}"
  },
  {
    question: "How does Encapsulation facilitate Unit Testing?",
    shortAnswer: "Well-encapsulated classes have clear, cohesive contracts that can be thoroughly tested via their public methods without mocking internal private variables.",
    explanation: "Because an encapsulated class is self-contained with well-defined inputs and outputs, unit tests can verify behavior, invariant preservation, and error handling through the clean public API.",
    hint: "Test the public contract, not internal wiring.",
    level: "Beginner",
    codeExample: "@Test\nvoid testWithdrawInsufficientBalance() {\n    Account acc = new Account(101, 1000.0);\n    assertFalse(acc.withdraw(5000.0)); // Tests invariant preservation\n}"
  },
  {
    question: "Can an inner class break the encapsulation of its enclosing outer class?",
    shortAnswer: "Inner classes have full access to outer class private fields by language design, which represents intentional nested cooperation rather than a breach.",
    explanation: "Java permits non-static inner classes to access private outer members (using compiler-generated synthetic accessors or nestmates in Java 11+). This allows tightly coupled helper classes (like Iterators) to operate seamlessly.",
    hint: "Inner classes share the nest with the outer class.",
    level: "Advanced",
    codeExample: "class Outer {\n    private int secret = 99;\n    class Inner {\n        void reveal() { System.out.println(secret); } // Valid nested access\n    }\n}"
  },
  {
    question: "What is 'Loose Coupling' and how does Encapsulation foster it?",
    shortAnswer: "Loose coupling minimizes interdependencies between components; Encapsulation ensures callers depend only on stable method contracts, not volatile data structures.",
    explanation: "When classes communicate purely through methods, changes to internal data structures (e.g. swapping array for HashMap) do not require changes in dependent caller classes.",
    hint: "Depend on contracts, not implementation details.",
    level: "Intermediate",
    codeExample: "// Callers invoke 'student.getRank()', oblivious to whether rank is stored or computed on the fly"
  },
  {
    question: "What is 'High Cohesion' and why does it naturally arise from Encapsulation?",
    shortAnswer: "High cohesion means a class focuses strictly on one unified domain responsibility, containing all the data and methods needed for that task.",
    explanation: "Encapsulation naturally drives cohesion by placing related fields and operations in the same class and excluding unrelated concerns (Single Responsibility Principle).",
    hint: "Everything in the capsule belongs to the same mission.",
    level: "Intermediate",
    codeExample: "class BankAccount { /* Only handles banking transactions, NOT PDF printing or UI rendering */ }"
  },
  {
    question: "How does the 'Record' feature in Java 16+ embody pure transparent data encapsulation?",
    shortAnswer: "Records automatically generate private final fields with canonical constructor validation, accessor methods, and immutable semantics.",
    explanation: "Records provide transparent immutable encapsulation for data carriers, eliminating boilerplate while guaranteeing invariant validation in the compact constructor.",
    hint: "Immutable data carrier encapsulation in modern Java.",
    level: "Intermediate",
    codeExample: "public record StudentDto(int roll, String name) {\n    public StudentDto {\n        Objects.requireNonNull(name, \"Name cannot be null\");\n    }\n}"
  },
  {
    question: "What is the danger of returning 'this' from an unencapsulated builder method during construction?",
    shortAnswer: "If 'this' escapes before construction is finished, other threads can access partially initialized, corrupted object state.",
    explanation: "Constructors and initialization methods should not publish 'this' to external registries or listeners until all invariant checks and field assignments have fully settled.",
    hint: "Prevent premature 'this' escape.",
    level: "Advanced",
    codeExample: "// Safe construction: complete all field assignments before returning 'this'"
  },
  {
    question: "How can Java Reflection bypass private field encapsulation, and how does Java 9+ JPMS prevent it?",
    shortAnswer: "setAccessible(true) in legacy Java bypassed private modifiers; JPMS blocks deep reflection across module boundaries unless explicitly 'opened'.",
    explanation: "In Java 8 and earlier, reflection could overwrite private fields. Java 9 module system enforces Strong Encapsulation, blocking reflective access to unexported/unopened packages by default.",
    hint: "JPMS seals reflection backdoors across module boundaries.",
    level: "Advanced",
    codeExample: "// JPMS throws InaccessibleObjectException on unauthorized setAccessible(true)"
  },
  {
    question: "Why should boolean getters follow the 'isPropertyName()' convention instead of 'getPropertyName()'?",
    shortAnswer: "It aligns with JavaBean naming conventions, reads naturally as a predicate statement, and integrates seamlessly with frameworks.",
    explanation: "Methods like 'public boolean isActive()' or 'public boolean isEnrolled()' express boolean state naturally and are recognized automatically by serialization and UI binding frameworks.",
    hint: "JavaBean convention for boolean properties.",
    level: "Beginner",
    codeExample: "public boolean isScholarshipApproved() { return isApproved; }"
  },
  {
    question: "What is 'Subsystem Encapsulation' (Facade Pattern)?",
    shortAnswer: "Wrapping an entire complex subsystem of classes behind a single clean public interface (Facade).",
    explanation: "Just as a class encapsulates fields, a Facade encapsulates a complex network of internal domain services, exposing a simple unified entry point for clients.",
    hint: "Class-level encapsulation scaled to architectural subsystems.",
    level: "Advanced",
    codeExample: "public class EnrollmentFacade {\n    public void enrollStudent(int studentId, int courseId) { /* Coordinates 5 internal services */ }\n}"
  },
  {
    question: "What is the ultimate test of a well-encapsulated class?",
    shortAnswer: "Can external code put the object into an invalid or illegal state? If NO, the class is well-encapsulated.",
    explanation: "A truly encapsulated class makes it mathematically impossible for outside code to corrupt its state, regardless of what arguments are passed to its public methods or constructors.",
    hint: "Make illegal states unrepresentable.",
    level: "Beginner",
    codeExample: "// Impossible to have negative balance or blank name in EncapsulatedStudentAccount"
  },
  {
    question: "What is Sukanta Hui's Capsule Manifesto taught at the Barrackpore Academy?",
    shortAnswer: "A class without encapsulation is a house without walls. Build a protective fortress of private state, guarded constructors, and validated methods so your domain logic stands unconquerable.",
    explanation: "At the Barrackpore campus, Sukanta Hui teaches that encapsulation is the single most vital skill separating amateur coders from enterprise software architects. By enforcing invariants at the door and guarding mutations from within, your applications run bug-free and scale effortlessly.",
    hint: "Private state, guarded gates, unconquerable domain logic.",
    level: "Beginner",
    codeExample: "// Sukanta Hui's Capsule Template: Private Fields → Guarded Constructors → Invariant-Enforcing Mutators → Defensive Getters"
  }
];

export default topic10_questions;
