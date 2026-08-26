/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 6: Null Reference and the Anatomy of NullPointerException (NPE)
 * High-Yield Technical Interview & Academic Q&A Catalog (30 Questions)
 * ============================================================================
 *
 * Educator: Sukanta Hui
 * Academic Centres: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 * ============================================================================
 */

const topic6_questions = [
  {
    question: "What is 'null' in Java and what is its internal representation?",
    shortAnswer: "'null' is a reserved literal of the null type that represents a reference pointing to no memory location (0x00000000).",
    explanation: "In Java, 'null' is a literal that can be assigned to any reference variable. It indicates that the variable currently does not hold the address of any object in the JVM Heap. Internally on the CPU/JVM, it is a zero pointer.",
    hint: "The absence of a Heap address pointer.",
    level: "Beginner",
    codeExample: "StudentRecord student = null; // Holds 0x00000000 on Stack"
  },
  {
    question: "What is a NullPointerException (NPE) and when does the JVM throw it?",
    shortAnswer: "An unchecked RuntimeException thrown when an application attempts to use 'null' in a case where an active object instance is required.",
    explanation: "When bytecode like 'invokevirtual', 'getfield', 'arraylength', or 'monitorenter' executes and finds a null pointer on top of the operand stack, the JVM hardware signal handler catches the fault and raises a java.lang.NullPointerException.",
    hint: "Dereferencing a non-existent object address.",
    level: "Beginner",
    codeExample: "String s = null;\ns.length(); // Throws java.lang.NullPointerException"
  },
  {
    question: "What are the 8 classic scenarios that trigger a NullPointerException in Java?",
    shortAnswer: "1. Calling instance method, 2. Accessing/modifying field, 3. Taking array length, 4. Indexing array, 5. Auto-unboxing null wrapper, 6. Iterating null in for-each, 7. Synchronizing on null, 8. Throwing null Throwable.",
    explanation: "Every operation that requires an active object handle will fail with an NPE if given null. This includes hidden calls like unboxing ('Integer x = null; int y = x;') which invokes '.intValue()' under the hood.",
    hint: "Think about methods, fields, arrays, unboxing, locks, iterators, and throw.",
    level: "Intermediate",
    codeExample: "Integer val = null;\nint primitive = val; // NPE due to auto-unboxing (.intValue())"
  },
  {
    question: "What was introduced in Java 14 under JEP 358 (Helpful NullPointerExceptions)?",
    shortAnswer: "Detailed, precise exception messages pinpointing the exact expression or variable that was null in chained invocations.",
    explanation: "Prior to Java 14, an NPE on 'a.b().c().d()' only gave a line number, leaving developers guessing which method returned null. JEP 358 analyzes bytecode at runtime to produce messages like: 'Cannot invoke C.d() because the return value of B.c() is null'.",
    hint: "Exact bytecode root-cause diagnostic in the exception message.",
    level: "Intermediate",
    codeExample: "// Java 14+ output:\n// Cannot invoke \"Address.getCity()\" because the return value of \"StudentRecord.getAddress()\" is null"
  },
  {
    question: "Can you invoke a static method using a null reference variable without triggering an NPE?",
    shortAnswer: "Yes! Static methods belong to the Class, not the instance, so the compiler uses the compile-time type without dereferencing the pointer.",
    explanation: "Because static method dispatch uses 'invokestatic' and resolves at compile-time based on the declared reference type, 'StudentRecord nullRef = null; nullRef.printAcademyBranch();' runs cleanly without throwing an NPE (though it is considered poor style).",
    hint: "Static methods do not require an active Heap instance.",
    level: "Intermediate",
    codeExample: "StudentRecord ref = null;\nref.printBranchInfo(); // Executes successfully! Compiles to StudentRecord.printBranchInfo()"
  },
  {
    question: "What is 'Yoda Condition' and how does it prevent NullPointerExceptions in String comparisons?",
    shortAnswer: "Placing the known non-null literal on the left side of '.equals()' (e.g. '\"Barrackpore\".equals(branch)').",
    explanation: "If 'branch' is null, 'branch.equals(\"Barrackpore\")' throws an NPE. Writing '\"Barrackpore\".equals(branch)' is 100% null-safe because String.equals() safely checks if the argument is null and returns false instead of throwing.",
    hint: "Constant on the left, variable on the right.",
    level: "Beginner",
    codeExample: "String branch = null;\nboolean safe = \"Barrackpore\".equals(branch); // Returns false, ZERO NPE!"
  },
  {
    question: "How does 'Objects.requireNonNull(obj, message)' improve defensive programming?",
    shortAnswer: "It immediately validates method arguments and fails fast with a descriptive custom error message at the boundary.",
    explanation: "Instead of letting null propagate deep into downstream methods where it causes hard-to-debug crashes later, 'Objects.requireNonNull()' halts execution at the entry point of the constructor or method.",
    hint: "Fail-fast validation at system boundaries.",
    level: "Intermediate",
    codeExample: "public Student(String name) {\n    this.name = Objects.requireNonNull(name, \"Student name cannot be null!\");\n}"
  },
  {
    question: "What is 'java.util.Optional<T>' and when should it be used?",
    shortAnswer: "A container object that may or may not contain a non-null value, primarily designed as a return type for methods that may have no result.",
    explanation: "Optional<T> forces the caller to explicitly think about and handle the possibility of absence using functional methods like '.map()', '.filter()', '.orElse()', or '.orElseThrow()', eliminating unexpected NPEs.",
    hint: "A type-level signal for optional return values.",
    level: "Intermediate",
    codeExample: "public Optional<Address> getAddress() {\n    return Optional.ofNullable(this.address);\n}"
  },
  {
    question: "Why is it considered bad practice to use 'Optional<T>' as method parameters or class fields?",
    shortAnswer: "It introduces unnecessary object wrapper overhead on the Heap and serialization complexities without adding safety over standard null checks.",
    explanation: "Optional is not Serializable and adds 16-24 bytes of Heap overhead per instance. Brian Goetz (Java Language Architect) designed Optional strictly as a method return type for library APIs.",
    hint: "Use Optional for returns; use Objects.requireNonNull for parameters.",
    level: "Advanced",
    codeExample: "// BAD: void register(Optional<String> name) { ... }\n// GOOD: void register(String name) { Objects.requireNonNull(name); }"
  },
  {
    question: "What is the 'Null Object Pattern' in Object-Oriented Design?",
    shortAnswer: "Creating a concrete implementation of an interface or class that provides default 'do-nothing' or neutral behavior instead of returning null.",
    explanation: "Instead of returning null when an entity is missing (forcing every caller to write 'if (x != null)'), the system returns a Singleton Null Object (e.g. 'NullAddress' or 'AnonymousStudent') that satisfies the contract safely.",
    hint: "Neutral polymorphism instead of null pointers.",
    level: "Intermediate",
    codeExample: "public static final Address NO_ADDRESS = new NullAddress();"
  },
  {
    question: "Why does auto-unboxing cause silent NullPointerExceptions?",
    shortAnswer: "The Java compiler converts primitive unboxing into an implicit method call like '.intValue()' or '.booleanValue()'.",
    explanation: "When you write 'int x = nullableInteger;', the compiler silently translates it into 'int x = nullableInteger.intValue();'. If 'nullableInteger' is null, dereferencing '.intValue()' throws an NPE at runtime.",
    hint: "The compiler injects a hidden method call on the wrapper reference.",
    level: "Beginner",
    codeExample: "Double stipend = null;\ndouble primitiveStipend = stipend; // Crashes with NPE invoking stipend.doubleValue()"
  },
  {
    question: "How does the 'instanceof' operator handle null references?",
    shortAnswer: "'null instanceof AnyType' always evaluates to 'false' without throwing an NPE.",
    explanation: "The JVM specification explicitly dictates that the 'instanceof' bytecode instruction returns false if the object reference on the stack is null, making it safe for type-checking before casting.",
    hint: "instanceof is inherently null-safe.",
    level: "Beginner",
    codeExample: "String s = null;\nif (s instanceof String) { ... } // Evaluates to false safely!"
  },
  {
    question: "What is the difference between 'Optional.of()' and 'Optional.ofNullable()'?",
    shortAnswer: "'Optional.of(val)' throws NPE immediately if val is null; 'Optional.ofNullable(val)' wraps null safely into an empty Optional.",
    explanation: "Use 'Optional.of(x)' when 'x' MUST be non-null. Use 'Optional.ofNullable(x)' when 'x' might legitimately be null, producing Optional.empty() if null is passed.",
    hint: "of() is strict; ofNullable() allows nulls.",
    level: "Intermediate",
    codeExample: "Optional<String> strict = Optional.of(name);        // Throws NPE if name == null\nOptional<String> safe = Optional.ofNullable(name); // Returns Optional.empty() if name == null"
  },
  {
    question: "What happens when you pass null as an argument to 'System.out.println(nullRef)'?",
    shortAnswer: "It safely prints the string '\"null\"' without throwing an NPE.",
    explanation: "PrintStream.println(Object) internally invokes 'String.valueOf(obj)', which checks if the reference is null and returns the literal string \"null\".",
    hint: "String.valueOf() includes an internal null guard.",
    level: "Beginner",
    codeExample: "Student s = null;\nSystem.out.println(s); // Outputs \"null\" cleanly"
  },
  {
    question: "What is the difference between a Checked Exception and NullPointerException?",
    shortAnswer: "NPE is an unchecked RuntimeException (subclass of RuntimeException) that represents programmer logic error and does not require explicit throws/catch clauses.",
    explanation: "Checked exceptions represent recoverable external conditions (like IOException). Unchecked exceptions like NullPointerException represent avoidable programming defects that should be fixed via defensive logic rather than caught with try-catch.",
    hint: "NPE indicates a defect in code invariants, not an I/O fault.",
    level: "Beginner",
    codeExample: "public class NullPointerException extends RuntimeException { ... }"
  },
  {
    question: "Can an array object in Java contain null elements while itself being non-null?",
    shortAnswer: "Yes. An allocated reference array contains null elements in all its slots by default until assigned.",
    explanation: "Executing 'String[] arr = new String[5];' creates a valid, non-null Array object on the Heap. However, 'arr[0]' through 'arr[4]' are initialized to null. Accessing 'arr.length' is valid, but calling 'arr[0].toUpperCase()' throws an NPE.",
    hint: "The container is alive, but the slots are empty.",
    level: "Beginner",
    codeExample: "String[] arr = new String[3];\nSystem.out.println(arr.length); // 3 (Safe)\narr[0].toUpperCase();           // Throws NPE!"
  },
  {
    question: "Why should you never catch 'NullPointerException' with an empty catch block?",
    shortAnswer: "It swallows critical bug signals, leaves the application in an unpredictable corrupted state, and masks root-cause architectural defects.",
    explanation: "Catching and ignoring NPEs is an anti-pattern. If an NPE occurs, the program state is violated. Fixing the null check or establishing domain invariants is the correct solution.",
    hint: "Fix the root cause; do not mask runtime logic failures.",
    level: "Intermediate",
    codeExample: "// ANTI-PATTERN:\ntry { s.doWork(); } catch (NullPointerException e) { /* IGNORED */ }"
  },
  {
    question: "How does the 'Objects.equals(a, b)' method provide null safety?",
    shortAnswer: "It returns true if both are null, false if only one is null, or evaluates 'a.equals(b)' if 'a' is non-null.",
    explanation: "java.util.Objects.equals(a, b) implements the exact contract: '(a == b) || (a != null && a.equals(b))', eliminating all NPE risk during field comparisons.",
    hint: "Built-in utility for dual-nullable equality checks.",
    level: "Intermediate",
    codeExample: "boolean isEqual = Objects.equals(studentA.getCity(), studentB.getCity()); // 100% null-safe"
  },
  {
    question: "What is the 'Elvis Operator' in Groovy/Kotlin and does Java support it natively?",
    shortAnswer: "The Elvis operator (?:) provides a fallback for nulls; Java does not have '?:' but achieves the same via 'Optional.orElse()' or ternary '(x != null ? x : fallback)'.",
    explanation: "In Kotlin/Groovy, 'val name = student?.name ?: \"Unknown\"' is concise. In Java, developers use 'Optional.ofNullable(student).map(Student::getName).orElse(\"Unknown\")' or ternary expressions.",
    hint: "Java uses Optionals and ternaries for null coalescing.",
    level: "Intermediate",
    codeExample: "String city = (address != null && address.getCity() != null) ? address.getCity() : \"Default\";"
  },
  {
    question: "What happens when you synchronize on a null object in Java?",
    shortAnswer: "The JVM throws a NullPointerException immediately when attempting to enter the synchronized block.",
    explanation: "The 'synchronized(lock)' statement executes the 'monitorenter' bytecode, which attempts to acquire the intrinsic monitor in the object's Mark Word. If the reference is null, there is no Mark Word to lock, triggering an NPE.",
    hint: "Locks require a physical object header in Heap memory.",
    level: "Intermediate",
    codeExample: "Object lock = null;\nsynchronized(lock) { ... } // Throws NPE on entry"
  },
  {
    question: "What is the difference between returning 'null' vs returning an Empty Collection from a method?",
    shortAnswer: "Returning an empty collection (e.g. Collections.emptyList()) allows callers to iterate without null checks, eliminating NPEs.",
    explanation: "Joshua Bloch (Effective Java Item 54) strongly advises: 'Return empty collections or arrays, not null'. Returning null forces every consumer to write defensive if-checks; returning an empty list allows seamless for-each iteration.",
    hint: "Never return null for collections; return empty collections.",
    level: "Intermediate",
    codeExample: "public List<String> getCourses() {\n    return enrolledCourses.isEmpty() ? Collections.emptyList() : enrolledCourses;\n}"
  },
  {
    question: "How do static analysis tools (like SonarQube, SpotBugs, Checker Framework) detect NPEs at compile time?",
    shortAnswer: "By performing dataflow analysis and checking annotations like '@NonNull' and '@Nullable'.",
    explanation: "Static analyzers trace all execution branches to detect potential dereferences of nullable variables before code is even deployed to production, turning runtime NPEs into compile-time warnings.",
    hint: "Annotations and branch analysis for compile-time safety.",
    level: "Advanced",
    codeExample: "public void registerStudent(@NonNull String name, @Nullable Address address) { ... }"
  },
  {
    question: "Can a primitive variable like 'int' or 'boolean' ever hold the value 'null'?",
    shortAnswer: "No. Primitives store raw binary values directly in memory and cannot represent 'null'.",
    explanation: "Primitive data types in Java are not objects and do not use reference pointers. An 'int' is always a 32-bit signed integer (defaulting to 0); only reference types can be assigned 'null'.",
    hint: "Primitives have values, never null references.",
    level: "Beginner",
    codeExample: "// Compile Error: int x = null;"
  },
  {
    question: "What happens if a method annotated with '@Override' in a subclass changes parameter nullability?",
    shortAnswer: "It violates the Liskov Substitution Principle (LSP) if the subclass rejects nulls that the parent class accepted.",
    explanation: "Under LSP, a subclass method must accept all inputs that the parent method accepted. Strengthening preconditions (e.g. throwing NPE for null where parent accepted null) breaks polymorphic substitution.",
    hint: "Subtypes must not demand stricter preconditions than supertypes.",
    level: "Advanced",
    codeExample: "// Parent accepts null; Subclass throwing NPE violates LSP contract."
  },
  {
    question: "How does the JVM internally detect a null dereference at the hardware level?",
    shortAnswer: "By catching OS Page Faults / SIGSEGV signals when dereferencing address 0, avoiding explicit null checks before every instruction.",
    explanation: "To keep execution ultra-fast, HotSpot does not emit an 'if (ptr == 0)' check before every method call. Instead, it relies on CPU memory management: address 0 is unmapped, so dereferencing it triggers a hardware page fault that HotSpot traps and converts into an NPE.",
    hint: "Zero-overhead hardware page fault trapping in HotSpot.",
    level: "Advanced",
    codeExample: "// HotSpot optimizes bytecode execution using hardware trap handlers"
  },
  {
    question: "What is the best way to handle null values when sorting a List with 'Comparator'?",
    shortAnswer: "Use 'Comparator.nullsFirst()' or 'Comparator.nullsLast()'.",
    explanation: "Standard comparators throw NPE if any element or key is null. Java 8 provides 'Comparator.nullsFirst(Comparator.comparing(Student::getName))' to safely position null elements at the beginning or end.",
    hint: "Null-friendly comparator decorators.",
    level: "Intermediate",
    codeExample: "list.sort(Comparator.nullsLast(Comparator.comparing(StudentRecord::getFullName)));"
  },
  {
    question: "What is the difference between 'Optional.flatMap()' and 'Optional.map()' in chained calls?",
    shortAnswer: "'map()' wraps the result in an Optional; 'flatMap()' expects the mapper function to return an Optional and flattens it, preventing nested 'Optional<Optional<T>>'.",
    explanation: "If 'StudentRecord.getAddress()' returns 'Optional<Address>' and 'Address.getCity()' returns 'Optional<String>', using 'student.getAddress().flatMap(Address::getCity)' returns 'Optional<String>' cleanly.",
    hint: "FlatMap avoids double-wrapped Optionals.",
    level: "Advanced",
    codeExample: "Optional<String> city = studentOpt.flatMap(StudentRecord::getPostalAddress).map(Address::getCity);"
  },
  {
    question: "Why does casting null to any reference type (e.g. '(String) null') succeed without error?",
    shortAnswer: "Because 'null' is the universal value of the bottom type in Java's type system and conforms to all reference types.",
    explanation: "The null literal has a special type without a name. It is a subtype of all reference types, allowing it to be assigned or cast to any class, interface, or array type.",
    hint: "Subtype of all reference types.",
    level: "Intermediate",
    codeExample: "String s = (String) null; // Valid, s is null\nInteger i = (Integer) null; // Valid, i is null"
  },
  {
    question: "What is Project Valhalla and how will Value Types impact null references in future Java?",
    shortAnswer: "Project Valhalla introduces Primitive/Value Objects that are identityless and cannot be null, bringing stack allocation and NPE immunity.",
    explanation: "Value objects in Valhalla will allow developers to define types (like ComplexNumber, Point) that behave like primitives—stored flat without object headers and incapable of holding null, eliminating NPEs at the language level for performance-critical data.",
    hint: "Non-nullable, identityless value objects in future Java.",
    level: "Advanced",
    codeExample: "// Future Java: value class Point { int x; int y; } // Cannot be null!"
  },
  {
    question: "What is Sukanta Hui's Core Defensive Invariant on Null References?",
    shortAnswer: "Treat 'null' as an uninvited intruder at your API doors. Validate rigorously at entry points so internal domain logic can execute with complete confidence.",
    explanation: "At the Barrackpore campus, Sukanta Hui teaches that an unhandled NPE in production is a sign of lazy boundary enforcement. By validating parameters in constructors with 'Objects.requireNonNull' and returning 'Optional' or empty collections, you make your codebase virtually immune to null crashes.",
    hint: "Guard the gates with validation so internal logic never fears null.",
    level: "Beginner",
    codeExample: "// Sukanta Hui's Fortress Pattern:\npublic StudentRecord(String name, Address addr) {\n    this.name = Objects.requireNonNull(name, \"Name cannot be null\");\n    this.address = (addr != null) ? addr : Address.CAMPUS_DEFAULT;\n}"
  }
];

export default topic6_questions;
