/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 17: Encapsulation Best Practices and Avoiding Data Leaks
 * High-Yield Technical Interview & Academic Q&A Catalog (30 Questions)
 * ============================================================================
 *
 * Educator: Sukanta Hui
 * Academic Centres: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 * ============================================================================
 */

const topic17_questions = [
  {
    question: "Why can a class with 100% 'private' fields still suffer from severe Data Leaks?",
    shortAnswer: "Because 'private' only hides the reference variable name; if the method returns or accepts a direct mutable object reference without defensive copying, external code can mutate the object's Heap memory directly.",
    explanation: "Declaring 'private List<String> list' protects the variable from direct assignment, but returning 'return list;' gives the caller an alias to the live collection on the Heap. The caller can call 'list.clear()', destroying internal state.",
    hint: "Private hides the variable name, not the mutable Heap buffer.",
    level: "Beginner",
    codeExample: "// Data Leak: private List<String> list;\npublic List<String> getList() { return list; } // Caller can call getList().clear()!"
  },
  {
    question: "What is 'Defensive Copying on Input' in constructor design?",
    shortAnswer: "Creating a fresh duplicate copy of any mutable argument passed into a constructor before assigning it to internal fields.",
    explanation: "If a caller passes a List or array, writing 'this.list = new ArrayList<>(inputList);' breaks the reference link between caller and object, preventing the caller from modifying the object's state afterwards.",
    hint: "Break external constructor aliases with a new copy.",
    level: "Beginner",
    codeExample: "public Profile(List<String> skills) {\n    this.skills = (skills != null) ? new ArrayList<>(skills) : new ArrayList<>();\n}"
  },
  {
    question: "What is 'Defensive Copying on Output' in getter design?",
    shortAnswer: "Returning a clone, a copy, or an unmodifiable wrapper of internal mutable objects from accessor methods.",
    explanation: "Wrapping collections with 'Collections.unmodifiableList(this.list)' or returning 'this.array.clone()' prevents callers from altering the object's internal state through the getter return value.",
    hint: "Shield internal state with unmodifiable views or clones.",
    level: "Beginner",
    codeExample: "public List<String> getSkills() { return Collections.unmodifiableList(this.skills); }"
  },
  {
    question: "Why should 'java.util.Date' NEVER be used in modern Java domain entities?",
    shortAnswer: "Because java.util.Date is mutable (has .setTime(), .setYear()), which creates chronic temporal data leaks.",
    explanation: "A caller holding a Date reference can call 'date.setTime(0)' to retroactively change historical transaction timestamps. Use immutable 'java.time.LocalDate' or 'java.time.Instant' instead.",
    hint: "Use java.time immutable types instead of legacy mutable Date.",
    level: "Intermediate",
    codeExample: "// BAD: private Date createdAt; // Mutable!\n// GOOD: private LocalDate createdAt; // 100% Immutable!"
  },
  {
    question: "Why are Arrays in Java always dangerous for encapsulation?",
    shortAnswer: "Because array elements are always mutable in Java; there is no such thing as an 'unmodifiable array' in the JVM.",
    explanation: "Even if an array field is 'final', its elements can be overwritten ('arr[0] = 99'). Getters MUST return 'arr.clone()' and constructors MUST clone input arrays to avoid leaks.",
    hint: "Arrays cannot be made immutable; always clone them.",
    level: "Intermediate",
    codeExample: "public int[] getScores() { return this.scores.clone(); } // Cloned array defense"
  },
  {
    question: "What is 'Premature this Escape' in constructor execution?",
    shortAnswer: "Publishing the 'this' reference to another thread, static registry, or event listener BEFORE the constructor finishes running.",
    explanation: "If a constructor registers 'this' into a list or starts a new thread with 'new Thread(this).start()', external threads can read uninitialized fields and violate class invariants.",
    hint: "Never publish 'this' before construction completes.",
    level: "Advanced",
    codeExample: "// DANGEROUS THIS ESCAPE:\npublic EventListener() { EventBus.register(this); /* Escapes before init! */ }\n// SAFE: Use a static factory method to construct and register"
  },
  {
    question: "Why is a 'public static final' array variable a critical security flaw in Java?",
    shortAnswer: "The 'final' keyword only locks the array reference; any class in the entire JVM can mutate the array's contents ('VALUES[0] = null').",
    explanation: "Joshua Bloch highlights this as one of Java's biggest security gotchas (Effective Java Item 15). Replace public static arrays with a private array + public unmodifiable List or clone method.",
    hint: "Public final array contents can be rewritten globally.",
    level: "Intermediate",
    codeExample: "// VULNERABLE: public static final String[] ROLES = {\"ADMIN\", \"USER\"};\n// SAFE: private static final String[] R = ...; public static final List<String> ROLES = List.of(R);"
  },
  {
    question: "Why should domain classes be marked 'final' unless explicitly designed for inheritance?",
    shortAnswer: "To prevent malicious or buggy subclasses from overriding methods, adding mutable state, and subverting invariant protections.",
    explanation: "Effective Java Item 19 states: 'Design and document for inheritance or else prohibit it'. Marking classes final closes the door to subclass-driven encapsulation breaches.",
    hint: "Seal the class hierarchy with the final modifier.",
    level: "Intermediate",
    codeExample: "public final class StudentSnapshot { ... }"
  },
  {
    question: "What is the difference between 'Shallow Copy' and 'Deep Copy' in defensive copying?",
    shortAnswer: "A shallow copy duplicates the container (List/Array) but shares references to the same elements; a deep copy duplicates both the container AND all element objects inside it.",
    explanation: "If a List contains mutable objects (like 'List<Address>'), 'new ArrayList<>(list)' is only a shallow copy—callers can still mutate the Address objects inside. A deep copy clones every Address.",
    hint: "Shallow copies collection structure; deep copies element objects.",
    level: "Advanced",
    codeExample: "// Deep copy creates new instances for all items:\nList<Address> copy = list.stream().map(Address::copy).toList();"
  },
  {
    question: "How does the 'List.of()' / 'Set.of()' factory method in Java 9+ eliminate data leaks?",
    shortAnswer: "They produce truly immutable, unmodifiable, non-null collections that throw UnsupportedOperationException on any mutation attempt.",
    explanation: "Using 'List.of(\"Java\", \"Spring\")' creates a compact, immutable collection in memory that is immune to external mutation leaks.",
    hint: "Java 9 immutable collection factory.",
    level: "Beginner",
    codeExample: "private final List<String> courses = List.of(\"Java Core\", \"Spring Boot\");"
  },
  {
    question: "What is 'Field Shadowing' and how can it cause accidental data assignment bugs in setters?",
    shortAnswer: "When a method parameter has the same name as an instance field and the developer forgets 'this.', assigning the parameter to itself.",
    explanation: "Writing 'name = name;' assigns the parameter back to itself, leaving the instance field 'this.name' with its default uninitialized value (null). Always use 'this.name = name;'.",
    hint: "Use 'this.' to resolve parameter-field ambiguity.",
    level: "Beginner",
    codeExample: "public void setName(String name) { this.name = name; // 'this.' is mandatory! }"
  },
  {
    question: "Why is 'clone()' generally considered flawed in Java, and what is the preferred alternative for defensive copying?",
    shortAnswer: "Cloneable lacks a common method, uses fragile non-constructor allocation, and can be subverted by subclasses; Copy Constructors or Static Factory Methods are preferred.",
    explanation: "Joshua Bloch advises avoiding Object.clone() (except on primitive arrays where it is fast and safe). For objects, use 'new TraineeProfile(other)' or 'TraineeProfile.copyOf(other)'.",
    hint: "Prefer Copy Constructors and copyOf() factories over clone().",
    level: "Advanced",
    codeExample: "public TraineeProfile(TraineeProfile other) { this.name = other.name; this.scores = other.scores.clone(); }"
  },
  {
    question: "How does Java 14+ Record feature prevent all 5 common data leaks automatically?",
    shortAnswer: "Records enforce private final component fields, reject subclassing (inherently final), generate immutable accessors, and support compact constructor validation.",
    explanation: "Records provide a compiler-guaranteed immutable data carrier pattern that eliminates boilerplate while eliminating mutable state leaks.",
    hint: "Compiler-enforced immutable data carrier.",
    level: "Intermediate",
    codeExample: "public record StudentDto(int roll, String name, List<String> skills) {\n    public StudentDto { skills = List.copyOf(skills); } // Fortified record\n}"
  },
  {
    question: "What is 'Object Serialization Injection' and how does it threaten Encapsulation?",
    shortAnswer: "Java's legacy ObjectInputStream can instantiate objects without calling constructors, bypassing all validation logic and invariants.",
    explanation: "A corrupted or tampered serialized byte stream can inject illegal negative balances into private fields. Implementing 'readResolve()' or using Records / JSON serializers defends against this.",
    hint: "Serialization bypasses constructors unless defended.",
    level: "Advanced",
    codeExample: "private void readObject(ObjectInputStream s) throws IOException, ClassNotFoundException {\n    s.defaultReadObject();\n    validateInvariants(); // Re-defend invariants during deserialization\n}"
  },
  {
    question: "Why should setters avoid accepting mutable collections without wrapping or defensive copying?",
    shortAnswer: "Because assigning 'this.list = list;' creates a backdoor through which the caller can mutate internal state at any time.",
    explanation: "A setter must defensive-copy input collections: 'this.list = (list != null) ? new ArrayList<>(list) : new ArrayList<>();'.",
    hint: "Defensive copying is mandatory on setter inputs too.",
    level: "Intermediate",
    codeExample: "public void setSkills(List<String> s) { this.skills = (s != null) ? new ArrayList<>(s) : new ArrayList<>(); }"
  },
  {
    question: "What is the 'Principle of Least Astonishment' in API and Encapsulation design?",
    shortAnswer: "A class's behavior should match natural developer expectations (e.g. calling a getter should never unexpectedly mutate internal state or throw exceptions).",
    explanation: "Methods should be intuitive: getters must be idempotent and side-effect free; mutators must either succeed or throw clear exceptions.",
    hint: "APIs must behave intuitively without surprising side effects.",
    level: "Beginner",
    codeExample: "// Calling getBalance() 10 times in a row should return the exact same balance with zero side effects"
  },
  {
    question: "How does the 'final' keyword on method parameters protect encapsulation?",
    shortAnswer: "It prevents the method body from accidentally reassigning the parameter variable, ensuring the original reference is what gets validated and used.",
    explanation: "Writing 'public void setScore(final int score)' tells the compiler that 'score' cannot be reassigned within the method block, preventing logic errors.",
    hint: "Prevents accidental parameter variable reassignment.",
    level: "Beginner",
    codeExample: "public void setScore(final int score) { if (score < 0) throw ...; this.score = score; }"
  },
  {
    question: "Why should getters returning Optional<T> NEVER return null?",
    shortAnswer: "Returning null from an Optional method defeats the entire purpose of Optional, triggering NullPointerExceptions in callers.",
    explanation: "If a value is absent, return 'Optional.empty()'. Never return 'null' for an Optional getter.",
    hint: "Return Optional.empty(), never null.",
    level: "Intermediate",
    codeExample: "public Optional<String> getMiddleName() { return Optional.ofNullable(middleName); }"
  },
  {
    question: "What is the 'Package-Private Collaboration' best practice in layered architecture?",
    shortAnswer: "Keep internal helper classes package-private so they can collaborate with the public service class while remaining completely hidden from outside packages.",
    explanation: "Subsystems should expose only 1 or 2 public API classes. All internal parsers, validators, and builders should have default (package-private) visibility.",
    hint: "Hide subsystem machinery behind a public facade.",
    level: "Intermediate",
    codeExample: "class InternalPayrollCalculator {} // Package-private\npublic class PayrollService { ... } // Public Facade"
  },
  {
    question: "Can an inner class leak the 'this' reference of its outer class?",
    shortAnswer: "Yes! A non-static inner class holds an implicit reference to 'Outer.this', which can leak the outer instance to external threads.",
    explanation: "To prevent memory leaks and unintended outer reference sharing, prefer 'static nested classes' unless the inner class strictly requires outer instance state.",
    hint: "Prefer static nested classes over non-static inner classes to avoid leaks.",
    level: "Advanced",
    codeExample: "public class Outer {\n    private static class SafeNode { int val; } // Static nested: zero outer leak\n}"
  },
  {
    question: "What is 'Immutability by Default'?",
    shortAnswer: "The architectural practice of making all classes and fields immutable (final) first, and only adding mutators when explicitly required by business needs.",
    explanation: "Immutable objects are inherently thread-safe, cannot suffer from data leaks, can be shared freely, and make superb HashMap keys.",
    hint: "Start with final fields; make mutable only when necessary.",
    level: "Beginner",
    codeExample: "// Start with: private final Type field; → Add mutators only when essential"
  },
  {
    question: "Why should public classes avoid declaring public constant collections without unmodifiable wrappers?",
    shortAnswer: "Declaring 'public static final List<String> LIST = new ArrayList<>()' allows any class to call 'LIST.add()', corrupting global constants.",
    explanation: "Always wrap constant collections with 'Collections.unmodifiableList()' or use 'List.of()' to guarantee that global constants cannot be modified.",
    hint: "Global constants must be wrapped in unmodifiable collections.",
    level: "Intermediate",
    codeExample: "public static final List<String> SUPPORTED_CITIES = List.of(\"Barrackpore\", \"Naihati\", \"Shyamnagar\");"
  },
  {
    question: "How does the 'Builder Pattern' preserve encapsulation during complex object creation?",
    shortAnswer: "The builder accumulates parameters, validates cross-field invariants in its build() method, and returns an immutable, fully-fortified target object.",
    explanation: "Builders prevent objects from being instantiated in partially initialized or invalid states, ensuring that constructor invariants are strictly validated before object birth.",
    hint: "Accumulate, validate in build(), return immutable object.",
    level: "Intermediate",
    codeExample: "Student s = Student.builder().roll(101).name(\"Swadeep\").build();"
  },
  {
    question: "What is 'Thread-Local Leakage' and how can encapsulated objects prevent it?",
    shortAnswer: "Failing to remove ThreadLocal variables when a request completes, causing memory leaks in container thread pools.",
    explanation: "Encapsulated session contexts using ThreadLocal must always call 'threadLocal.remove()' inside a 'finally' block to avoid leaking memory to subsequent HTTP requests.",
    hint: "Always clean ThreadLocal variables in finally blocks.",
    level: "Advanced",
    codeExample: "try { userContext.set(user); doWork(); } finally { userContext.remove(); }"
  },
  {
    question: "Why should sensitive security state (e.g. char[] passwords) be wiped (zeroed out) after use?",
    shortAnswer: "To clear the secret from Heap RAM immediately rather than leaving it in memory until Garbage Collection reclaims it.",
    explanation: "Strings are immutable and cannot be wiped from memory. Storing passwords as 'char[]' allows writing 'Arrays.fill(pwd, '0');' immediately after authentication.",
    hint: "Zero out char[] arrays to destroy secrets in RAM.",
    level: "Advanced",
    codeExample: "char[] pwd = ...;\ntry { authenticate(pwd); } finally { Arrays.fill(pwd, '\\0'); }"
  },
  {
    question: "What is the 'Law of Demeter' (LoD) diagnostic test for encapsulation leaks?",
    shortAnswer: "Count the dots: if you see chains like 'a.getB().getC().getD().doSomething()', encapsulation is leaking and coupling is excessive.",
    explanation: "Method chaining across multiple unrelated objects exposes internal system structure. Refactor into 'a.doSomethingOnD()' to keep delegation encapsulated.",
    hint: "Count the dots: excessive dot navigation leaks structure.",
    level: "Intermediate",
    codeExample: "// BAD: student.getAddress().getCity().format();\n// GOOD: student.getFormattedCity();"
  },
  {
    question: "How does Java 17+ Sealed Classes (JEP 409) enhance Encapsulation?",
    shortAnswer: "Sealed classes allow a developer to restrict exactly WHICH subclasses are permitted to extend a parent class using the 'permits' clause.",
    explanation: "Sealed hierarchies ensure no unauthorized third-party classes can subclass the parent, providing total control over domain polymorphism and encapsulation.",
    hint: "Explicitly declared permitted subclasses.",
    level: "Advanced",
    codeExample: "public abstract sealed class Account permits SavingsAccount, CurrentAccount {}"
  },
  {
    question: "What is the ultimate benefit of mastering Encapsulation Best Practices in enterprise software?",
    shortAnswer: "Rock-solid reliability, zero data corruption bugs, frictionless team collaboration, thread safety, and effortless system maintainability over decades.",
    explanation: "Well-encapsulated code has clear boundaries. Bugs are localized to single classes, refactoring is risk-free, and enterprise applications scale reliably to millions of users.",
    hint: "Airtight reliability, zero corruption, painless refactoring.",
    level: "Beginner",
    codeExample: "// Encapsulated software stands unconquerable across enterprise scale"
  },
  {
    question: "What is Sukanta Hui's Golden Checklist for Encapsulation Fortification at the Barrackpore Academy?",
    shortAnswer: "1. Make fields private and final. 2. Defensively copy mutable constructor inputs. 3. Return unmodifiable views or cloned arrays in getters. 4. Validate all mutators. 5. Seal classes with final or permits.",
    explanation: "At the Barrackpore academy, Sukanta Hui drills this 5-point checklist into every student. By applying these seals habitually, your code becomes an impenetrable fortress that enterprise companies trust with their most mission-critical systems.",
    hint: "Private final fields + Defensive inputs + Unmodifiable outputs + Validated setters + Sealed hierarchy.",
    level: "Beginner",
    codeExample: "// Sukanta Hui's 5-Point Fortification Protocol:\n// 1. private final | 2. Copy Inputs | 3. Copy/Unmodify Outputs | 4. Validate Mutators | 5. final Class"
  },
  {
    question: "How does Module 002_001 prepare students for Module 002_002 (Constructors & Object Initialization)?",
    shortAnswer: "Module 002_001 established the memory model, class anatomy, and invariant encapsulation; Module 002_002 deep-dives into how constructors, initializer blocks, and the 'this' keyword orchestrate object birth.",
    explanation: "Now that students understand how objects live in memory and how encapsulation protects them, the next logical milestone is mastering the exact lifecycle and mechanics of object instantiation in Module 002_002.",
    hint: "Bridge to Constructors, 'this' keyword, and Object Initialization pipeline.",
    level: "Beginner",
    codeExample: "// Next: Module 002_002 (Constructors, Constructor Overloading, 'this(...)' Chaining, Initializer Blocks)"
  }
];

export default topic17_questions;
