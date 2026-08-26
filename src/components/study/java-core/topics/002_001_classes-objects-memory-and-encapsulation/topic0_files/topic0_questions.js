/**
 * Module 002_001: Topic 0: Introduction to Object-Oriented Programming (OOP) vs Procedural Programming
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the primary difference between Procedural Programming and Object-Oriented Programming (OOP)?",
    shortAnswer: "Procedural programming organizes code around step-by-step procedures/functions acting on separate, unprotected global data; OOP organizes software around **Objects** that bundle data (**State**) and methods (**Behavior**) into self-protecting units.",
    explanation: "Core paradigm distinction.",
    hint: "Procedural decouples data from functions; OOP bundles State and Behavior into Objects.",
    level: "basic",
    codeExample: "// Procedural: deposit(accounts, balances, id, amt) vs OOP: account.deposit(amt)"
  },
  {
    question: "What are the 4 fundamental pillars of Object-Oriented Programming?",
    shortAnswer: "1. **Encapsulation** (Data Hiding), 2. **Inheritance** (Code Reuse & Hierarchy), 3. **Polymorphism** (Dynamic Dispatch), and 4. **Abstraction** (Complexity Hiding via Interfaces/Abstract Classes).",
    explanation: "The 4 core OOP pillars.",
    hint: "Encapsulation, Inheritance, Polymorphism, Abstraction.",
    level: "basic",
    codeExample: "// The 4 Pillars: Encapsulation, Inheritance, Polymorphism, Abstraction"
  },
  {
    question: "What is a 'Class' in Java?",
    shortAnswer: "A user-defined **blueprint** or template that defines the structure (fields/state) and capabilities (methods/behavior) that instantiated objects will possess.",
    explanation: "Definition of a Class in Java.",
    hint: "A blueprint or template defining state and behavior.",
    level: "basic",
    codeExample: "public class BankAccount { private double balance; public void deposit() {} }"
  },
  {
    question: "What is an 'Object' in Java?",
    shortAnswer: "A concrete **runtime instance** of a class created in JVM Heap memory, possessing distinct state values and identity.",
    explanation: "Definition of an Object in Java.",
    hint: "A concrete runtime instance residing in Heap memory.",
    level: "basic",
    codeExample: "BankAccount swadeepAccount = new BankAccount(1001, \"Swadeep\", 25000.0);"
  },
  {
    question: "Why is Procedural programming vulnerable to state corruption?",
    shortAnswer: "Because data (like global arrays or struct fields) is exposed globally; any function can modify or invalidate data without validation (e.g. setting balance to `-999999`).",
    explanation: "Vulnerabilities of decoupled procedural data.",
    hint: "Global data lacks access control and validation invariants.",
    level: "basic",
    codeExample: "ProceduralBanking.balances[0] = -50000.0; // Unchecked corruption"
  },
  {
    question: "What is 'Encapsulation' and 'Data Hiding'?",
    shortAnswer: "Restricting direct external access to an object's internal fields by marking them `private`, forcing all interactions through public validated methods (`deposit()`, `withdraw()`).",
    explanation: "Encapsulation and data hiding mechanism.",
    hint: "Private fields with public validating accessors/mutators.",
    level: "basic",
    codeExample: "private double balanceInr; public void deposit(double amount) { ... }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what happened when Swadeep attempted to withdraw ₹50,000 from an account with ₹18,000 balance?",
    shortAnswer: "The encapsulated `withdraw()` method safely rejected the transaction with an `Insufficient balance` alert, preserving account integrity.",
    explanation: "Invariant protection verification.",
    hint: "Safely rejected due to balance invariant check.",
    level: "basic",
    codeExample: "swadeepAccount.withdraw(50000.0) -> false (Insufficient balance)"
  },
  {
    question: "What is an 'Invariant' in software architecture?",
    shortAnswer: "A condition or rule that must always hold true for an object throughout its entire lifecycle (e.g. `balance >= 0`, `accountNumber > 0`).",
    explanation: "Class invariant architectural concept.",
    hint: "A business rule that must always remain true for an object.",
    level: "intermediate",
    codeExample: "if (initialBalance < 0) throw new IllegalArgumentException();"
  },
  {
    question: "How does OOP improve software maintainability over Procedural code?",
    shortAnswer: "By localizing changes: modifying a class's internal implementation details does not break external caller code as long as the public method contracts remain unchanged.",
    explanation: "Maintainability and loose coupling in OOP.",
    hint: "Localizes changes within class boundaries without breaking client code.",
    level: "basic",
    codeExample: "// Changing balance storage internally doesn't alter getBalanceInr() API"
  },
  {
    question: "What are 'State' and 'Behavior' in domain modeling?",
    shortAnswer: "**State** represents the data or attributes an entity holds (fields); **Behavior** represents the operations or actions an entity can perform (methods).",
    explanation: "State vs Behavior.",
    hint: "State = data/fields; Behavior = actions/methods.",
    level: "basic",
    codeExample: "State: balanceInr | Behavior: deposit(), withdraw()"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was Tuhina's initial account balance?",
    shortAnswer: "**₹35,000.00** (Account `#1002`).",
    explanation: "Tuhina account record verification.",
    hint: "₹35,000.00.",
    level: "basic",
    codeExample: "new BankAccount(1002, \"Tuhina\", 35000.0)"
  },
  {
    question: "Can an Object exist without a Class in Java?",
    shortAnswer: "NO! In Java, every object must be instantiated from a defined Class or Array type.",
    explanation: "Class requirement for instantiation in Java.",
    hint: "No, a Class blueprint is mandatory to create an Object.",
    level: "basic",
    codeExample: "// Object instantiation requires class blueprint: new ClassName()"
  },
  {
    question: "What role does the `new` keyword play in Java?",
    shortAnswer: "It dynamically allocates memory for the new object instance on the JVM Heap, initializes instance fields with defaults, executes the constructor, and returns a reference address pointer.",
    explanation: "new keyword execution lifecycle.",
    hint: "Allocates memory on Heap, runs constructor, and returns reference address.",
    level: "basic",
    codeExample: "BankAccount acc = new BankAccount(...);"
  },
  {
    question: "Where is the reference variable stored vs the actual Object instance?",
    shortAnswer: "The reference variable (e.g. `swadeepAccount`) resides on the thread's **Stack**, holding a memory address pointer that points to the actual `BankAccount` object residing on the **Heap**.",
    explanation: "Stack vs Heap object memory layout.",
    hint: "Reference variable on Stack; Object instance on Heap.",
    level: "basic",
    codeExample: "// Stack [swadeepAccount: 0x4A2B] -> Heap [BankAccount instance at 0x4A2B]"
  },
  {
    question: "What is 'Coupling' and how does OOP promote Loose Coupling?",
    shortAnswer: "**Coupling** measures how closely connected two modules are; OOP promotes loose coupling by hiding implementation details behind clean public interfaces, preventing callers from depending on internal field representations.",
    explanation: "Loose coupling principles.",
    hint: "Loose coupling minimizes dependencies between components via clean interfaces.",
    level: "intermediate",
    codeExample: "// Callers interact via public methods, not internal private fields"
  },
  {
    question: "What is 'Cohesion' in OOP class design?",
    shortAnswer: "The degree to which all elements inside a class belong together and focus on a single, well-defined domain responsibility (High Cohesion is best practice).",
    explanation: "Cohesion principle in OOP.",
    hint: "High cohesion means a class focuses strictly on one single responsibility.",
    level: "intermediate",
    codeExample: "// BankAccount only handles banking state; does not handle database IO"
  },
  {
    question: "Why should fields in a class almost always be `private`?",
    shortAnswer: "To prevent external direct access, enforce business validation invariants in mutators, and prevent unintended side-effects across the application.",
    explanation: "Private field encapsulation rationale.",
    hint: "Prevents direct mutation and guarantees invariant validation.",
    level: "basic",
    codeExample: "private double balanceInr;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was Swadeep's balance after depositing ₹5,000 and withdrawing ₹12,000 from ₹25,000 initial?",
    shortAnswer: "₹25,000 + ₹5,000 - ₹12,000 = **₹18,000.00** remaining balance.",
    explanation: "Account transaction balance verification.",
    hint: "₹18,000.00.",
    level: "basic",
    codeExample: "25000 + 5000 - 12000 = 18000.00"
  },
  {
    question: "What is the difference between an Instance Method and a Static Method?",
    shortAnswer: "**Instance Methods** operate on the specific state of an instantiated object (`this` reference); **Static Methods** belong to the class itself and have no `this` context.",
    explanation: "Instance vs Static method context.",
    hint: "Instance methods operate on object instances; static methods belong to the class.",
    level: "basic",
    codeExample: "public void deposit(double amt) // Instance method"
  },
  {
    question: "What is 'Spaghetti Code' in procedural programming?",
    shortAnswer: "A convoluted, tangled software structure with global variable sharing and unstructured jumps, making it impossible to trace, test, or modify safely.",
    explanation: "Procedural spaghetti code anti-pattern.",
    hint: "Tangled code with global variables and lack of structure.",
    level: "basic",
    codeExample: "// Modifying global arrays across dozens of decoupled functions"
  },
  {
    question: "How do Access Modifiers control visibility in Java?",
    shortAnswer: "`private` (class only), `default` (package-private), `protected` (package + subclasses), and `public` (accessible everywhere).",
    explanation: "The 4 Java access modifiers.",
    hint: "private, default (package), protected, public.",
    level: "basic",
    codeExample: "private int id; protected String name; public void run() {}"
  },
  {
    question: "Can multiple reference variables point to the exact same Object in Heap memory?",
    shortAnswer: "YES! If `BankAccount acc2 = swadeepAccount;`, both `acc2` and `swadeepAccount` reference variables on the Stack contain the identical Heap memory address pointer.",
    explanation: "Multiple references to single object instance.",
    hint: "Yes, multiple stack references can point to the same heap object.",
    level: "basic",
    codeExample: "BankAccount b1 = new BankAccount(...); BankAccount b2 = b1; // Same object"
  },
  {
    question: "What happens when an object on the Heap has ZERO active reference variables pointing to it?",
    shortAnswer: "It becomes eligible for **Garbage Collection (GC)**, and its Heap memory will eventually be reclaimed automatically by the JVM.",
    explanation: "Garbage collection eligibility.",
    hint: "Becomes eligible for Garbage Collection and automatic memory reclamation.",
    level: "basic",
    codeExample: "acc = null; // Previous object becomes eligible for GC"
  },
  {
    question: "What is 'Defensive Copying' in encapsulation?",
    shortAnswer: "Returning or storing a clone / new copy of a mutable object (e.g. `Date`, `int[]`) rather than the original reference, preventing callers from mutating internal class state externally.",
    explanation: "Defensive copying for mutable fields.",
    hint: "Returns copies of mutable objects to prevent external state tampering.",
    level: "intermediate",
    codeExample: "public int[] getScores() { return scores.clone(); }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, why did `Objects.requireNonNull()` check `accountHolderName` in the constructor?",
    shortAnswer: "To prevent creating accounts with `null` holder names, ensuring the object enters memory in a strictly valid, non-corrupted state.",
    explanation: "Constructor fail-fast null check.",
    hint: "Guarantees object is created in a valid non-null state.",
    level: "basic",
    codeExample: "Objects.requireNonNull(accountHolderName, \"Holder name cannot be null\");"
  },
  {
    question: "What is 'Domain-Driven Design' (DDD) in modern OOP?",
    shortAnswer: "An architectural approach that models software directly around the real-world business domain terms, entities, and business rules (e.g. `BankAccount`, `TuitionLedger`, `StudentRegistration`).",
    explanation: "Domain-driven design modeling.",
    hint: "Structuring software directly around real-world business entities and domain rules.",
    level: "intermediate",
    codeExample: "// Real-world business domain entities: Account, Invoice, Customer"
  },
  {
    question: "How does OOP facilitate Code Reusability?",
    shortAnswer: "Through **Inheritance** (subclasses inheriting common parent attributes/behaviors) and **Composition** (classes containing instances of other classes).",
    explanation: "Code reuse through inheritance and composition.",
    hint: "Inheritance and Composition enable reusing existing verified components.",
    level: "basic",
    codeExample: "// Composition: Customer has-a BankAccount"
  },
  {
    question: "What is the ultimate takeaway of Module 002_001 Topic 0 for Java developers?",
    shortAnswer: "OOP shifts programming from raw procedural data manipulation to encapsulated, self-protecting domain entities bundling State (fields) and Behavior (methods), guaranteeing data integrity, maintainability, and scalability.",
    explanation: "Mastery of OOP vs Procedural paradigm shift.",
    hint: "OOP bundles State and Behavior into self-protecting entities, guaranteeing domain invariants.",
    level: "basic",
    codeExample: "// Summary: Procedural (Decoupled & Fragile) vs OOP (Encapsulated & Robust)"
  },
  {
    question: "What is the next topic (Topic 1) in Module 002_001?",
    shortAnswer: "Real-world modeling: mapping entities to State (fields) and Behavior (methods).",
    explanation: "Topic 1 dives into domain modeling mapping real-world physical and conceptual entities.",
    hint: "Real-world modeling: mapping entities to State (fields) and Behavior (methods).",
    level: "basic",
    codeExample: "// Topic 1: Real-World Modeling: State & Behavior"
  },
  {
    question: "How does Java 21 Pattern Matching with Records enhance OOP domain modeling?",
    shortAnswer: "It allows safe, type-exhaustive decomposition of domain entities inside switch expressions without manual casting or brittle `instanceof` cascades.",
    explanation: "Modern pattern matching in OOP.",
    hint: "Enables declarative deconstruction of domain objects in switch expressions.",
    level: "advanced",
    codeExample: "if (entity instanceof BankAccount(int id, String name, double bal)) { ... }"
  }
];

export default questions;
