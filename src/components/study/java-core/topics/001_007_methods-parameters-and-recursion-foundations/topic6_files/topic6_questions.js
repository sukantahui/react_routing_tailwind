/**
 * Module 001_007: Topic 6: Demonstrating parameter re-assignment vs mutating object internal state
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the difference between Parameter Reassignment and Object State Mutation?",
    shortAnswer: "Parameter Reassignment (`ref = new Object()`) changes ONLY the local stack frame pointer slot; Object Mutation (`ref.setField()`) dereferences the pointer to modify the shared instance residing on the Heap.",
    explanation: "Core memory model distinction between pointer update and heap mutation.",
    hint: "Reassignment changes the local stack pointer; mutation changes the shared heap object.",
    level: "basic",
    codeExample: "// Mutation: account.deduct(500); | Reassignment: account = new Student();"
  },
  {
    question: "Why does reassigning an array parameter (`arr = new int[5]`) have no effect on the caller's array?",
    shortAnswer: "Because `arr` is a local reference variable in the method's stack frame; assigning it to a new array changes only what `arr` points to, leaving the caller's pointer unchanged.",
    explanation: "Array parameter reassignment isolation.",
    hint: "Changes only the local stack pointer; caller's array pointer is unchanged.",
    level: "basic",
    codeExample: "void reset(int[] a) { a = new int[10]; } // Caller unaffected"
  },
  {
    question: "Why does updating an array element (`arr[0] = 99`) alter the caller's array?",
    shortAnswer: "Because array elements are stored inside the heap-allocated array object; dereferencing `arr[0]` modifies the shared heap memory directly.",
    explanation: "Array element mutation in shared heap memory.",
    hint: "Elements reside in shared heap memory; modifying an element changes the shared array.",
    level: "basic",
    codeExample: "void update(int[] a) { a[0] = 99; } // Caller sees new element!"
  },
  {
    question: "What does the `final` keyword on a formal parameter (`final StudentAccount account`) do?",
    shortAnswer: "It prevents the method body from reassigning the `account` reference variable (e.g. `account = null` causes a Compile Error), but still allows mutating its internal fields (`account.deduct(...)`).",
    explanation: "Final parameter reference immutability.",
    hint: "Prevents reference reassignment, but allows internal field mutation.",
    level: "basic",
    codeExample: "void m(final Student s) { s.setName(\"X\"); /* s = new Student(); ERROR */ }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what happened to Swadeep's balance after `applyScholarshipMutation(swadeep, 5000.0)`?",
    shortAnswer: "Swadeep's balance decreased from ₹20,000 to ₹15,000 because `account.deductScholarship()` modified the shared Heap object in Indian Rupees (₹).",
    explanation: "In-place mutation demonstration.",
    hint: "Decreased from ₹20,000 to ₹15,000 on the Heap.",
    level: "basic",
    codeExample: "applyScholarshipMutation(swadeep, 5000.0); // Mutated on Heap!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what happened to Tuhina's account after `resetAccountReassignment(tuhina)`?",
    shortAnswer: "Tuhina's account remained intact with ₹15,000 balance because `account = new StudentAccount(...)` modified only the local method stack frame in Indian Rupees (₹).",
    explanation: "Parameter reassignment failure.",
    hint: "Remained intact with ₹15,000 balance.",
    level: "basic",
    codeExample: "resetAccountReassignment(tuhina); // Caller unchanged!"
  },
  {
    question: "How can you make a Java class completely immune to internal state mutation?",
    shortAnswer: "By making the class Immutable: 1. Declare class as `final` (or `record`), 2. Make all fields `private final`, 3. Provide no setter methods, 4. Perform defensive copying for mutable fields.",
    explanation: "Immutable class design pattern.",
    hint: "Make class final, fields private final, no setters, and use defensive copies.",
    level: "intermediate",
    codeExample: "public record ImmutableStudent(String name, double balance) {}"
  },
  {
    question: "What is a 'Side Effect' in method design and why is unexpected mutation dangerous?",
    shortAnswer: "When a method modifies state outside its local scope (e.g. mutating a passed object/collection); hidden side effects cause concurrency race conditions and hard-to-track bugs.",
    explanation: "Pure functions vs side effects.",
    hint: "Mutating shared external state unexpectedly causes bugs and concurrency issues.",
    level: "intermediate",
    codeExample: "// Prefer returning new state over mutating passed parameters"
  },
  {
    question: "What happens when you pass a `List<Student>` to a method and call `list.clear()`?",
    shortAnswer: "The caller's list is cleared (becomes empty) because `list.clear()` mutates the shared `ArrayList` instance on the Heap.",
    explanation: "Collection mutation side effect.",
    hint: "Caller's list is emptied because Collections are mutable heap objects.",
    level: "basic",
    codeExample: "void wipe(List<String> l) { l.clear(); } // Clears caller's list!"
  },
  {
    question: "How can you protect a collection from being mutated when passed into a method?",
    shortAnswer: "Wrap it with `Collections.unmodifiableList(list)` or `List.copyOf(list)`; attempting mutation throws `UnsupportedOperationException`.",
    explanation: "Unmodifiable collection wrappers.",
    hint: "Use Collections.unmodifiableList() or List.copyOf().",
    level: "intermediate",
    codeExample: "process(Collections.unmodifiableList(students));"
  },
  {
    question: "Why does `str.toUpperCase()` NOT modify the original String object?",
    shortAnswer: "Because `String` is immutable; `toUpperCase()` instantiates and returns a brand-new `String` on the Heap, leaving the original String unchanged.",
    explanation: "String immutability method behavior.",
    hint: "Returns a new String; cannot mutate the original.",
    level: "basic",
    codeExample: "String s = \"swadeep\"; s.toUpperCase(); // 's' is STILL \"swadeep\"!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee ledger, how was `batchFees` affected by `mutateArrayElements` vs `reassignArrayParameter`?",
    shortAnswer: "`mutateArrayElements` increased each fee by ₹1,000 (elements mutated on Heap); `reassignArrayParameter` had zero effect on the caller's array in Indian Rupees (₹).",
    explanation: "Array mutation vs reassignment case study.",
    hint: "Elements were increased by ₹1,000, but reassignment had zero effect.",
    level: "basic",
    codeExample: "mutateArrayElements(fees, 1000.0); // Modified | reassign(fees); // No effect"
  },
  {
    question: "Can a method reassign a caller's primitive variable by returning the new value?",
    shortAnswer: "YES! The standard Java pattern for updating values is: `callerVar = method(callerVar);`.",
    explanation: "Return-value assignment pattern.",
    hint: "Yes, by capturing the return value: x = compute(x);",
    level: "basic",
    codeExample: "balance = deductLateFine(balance, 500.0);"
  },
  {
    question: "What is the 'Command-Query Separation' (CQS) principle regarding method mutation?",
    shortAnswer: "A method should either be a **Command** (perform an action / mutate state, returning `void`) or a **Query** (return data, producing no side effects / zero mutations).",
    explanation: "Bertrand Meyer's CQS architectural rule.",
    hint: "Methods should either mutate state (Command) or return data (Query), never both.",
    level: "advanced",
    codeExample: "// Query: double getFee(); | Command: void deductFee(double amt);"
  },
  {
    question: "Does passing a `StringBuilder` and calling `sb.append(\" - Barrackpore\")` mutate the caller's string buffer?",
    shortAnswer: "YES! `StringBuilder` is mutable; `append()` alters its internal `char[]` buffer on the Heap directly.",
    explanation: "Mutable StringBuilder passing.",
    hint: "Yes, StringBuilder is mutable and modifies shared heap buffer.",
    level: "basic",
    codeExample: "void addCampus(StringBuilder sb) { sb.append(\" - Barrackpore\"); }"
  },
  {
    question: "What happens if a method assigns `student = null` inside its body?",
    shortAnswer: "The local parameter `student` in the method's stack frame becomes `null`; the caller's reference variable continues pointing to the object on the Heap with zero effect.",
    explanation: "Parameter null assignment isolation.",
    hint: "Local parameter becomes null; caller's variable is unaffected.",
    level: "basic",
    codeExample: "void destroy(Student s) { s = null; } // Caller still has the student!"
  },
  {
    question: "Why should developers use the `final` keyword on method parameters in enterprise code?",
    shortAnswer: "To explicitly document that the parameter reference is never reassigned, catching accidental reassignments at compile-time and enhancing code clarity.",
    explanation: "Defensive programming with final parameters.",
    hint: "Prevents accidental reassignment bugs at compile-time.",
    level: "intermediate",
    codeExample: "public static void process(final StudentAccount account, final double fee) { ... }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee ledger, why did `secureMethodWithFinalParam(final StudentAccount account, ...)` compile successfully?",
    shortAnswer: "Because it only invoked `account.deductScholarship(...)` (field mutation); it never attempted pointer reassignment (`account = ...`) in Indian Rupees (₹).",
    explanation: "Final parameter legal mutation.",
    hint: "Calling methods on a final parameter is legal; only reassigning the variable is forbidden.",
    level: "basic",
    codeExample: "account.deductScholarship(deduction); // Completely legal on final parameter"
  },
  {
    question: "What is the difference between Shallow Immutability and Deep Immutability?",
    shortAnswer: "Shallow immutability means the object's direct fields cannot be reassigned; Deep immutability means all nested referenced objects are also recursively immutable.",
    explanation: "Deep vs shallow immutability distinction.",
    hint: "Shallow locks top-level fields; Deep locks all nested referenced objects.",
    level: "advanced",
    codeExample: "public record Team(String name, List<Student> members) // Shallow immutable unless List is unmodifiable"
  },
  {
    question: "What happens if two threads pass the same mutable object reference to different methods concurrently?",
    shortAnswer: "Data Race & Race Conditions: Both threads mutate the same shared Heap object simultaneously without synchronization, leading to corrupt or lost state.",
    explanation: "Concurrency hazards of mutable shared objects.",
    hint: "Causes data races and state corruption without synchronization.",
    level: "advanced",
    codeExample: "// Thread 1 and Thread 2 mutating same StudentAccount concurrently"
  },
  {
    question: "How do Java Records (Java 16+) prevent unexpected state mutation?",
    shortAnswer: "Records generate `private final` fields with accessor methods (no setters), guaranteeing that record instances are shallowly immutable by design.",
    explanation: "Java Records immutable design.",
    hint: "Records have private final fields and no setters, making them immutable.",
    level: "basic",
    codeExample: "public record StudentInvoice(String name, double total, double gst) {}"
  },
  {
    question: "Can an enhanced for-each loop reassign array elements (`for (double f : fees) f += 1000;`)?",
    shortAnswer: "NO! The loop variable `f` is a temporary local copy of each element; modifying `f` does NOT alter the elements inside the array!",
    explanation: "For-each loop element reassignment trap.",
    hint: "No, for-each variable is a copy; use index-based loop to mutate elements.",
    level: "basic",
    codeExample: "for (double f : fees) f += 1000; // Array remains unchanged!"
  },
  {
    question: "How should an array be mutated if you want to alter its contents in a loop?",
    shortAnswer: "Use a standard indexed `for` loop: `for (int i = 0; i < fees.length; i++) fees[i] += 1000;`.",
    explanation: "Correct array element mutation.",
    hint: "Use indexed for-loop: arr[i] = newValue;",
    level: "basic",
    codeExample: "for (int i = 0; i < fees.length; i++) fees[i] += 1000.0;"
  },
  {
    question: "What happens if a method passes a primitive wrapper (`Integer x`) and reassigns `x = 200`?",
    shortAnswer: "It creates a new `Integer` object on the Heap (or pulls from integer cache) and assigns the local pointer `x`; the caller's `Integer` is completely unaffected.",
    explanation: "Wrapper class reassignment.",
    hint: "Caller's Integer remains unaffected because wrappers are immutable.",
    level: "intermediate",
    codeExample: "void m(Integer x) { x = 200; } // Caller unaffected"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee ledger, how was Abhronila's account protected from reassignment?",
    shortAnswer: "Using `final StudentAccount account` which guaranteed that the method could not accidentally point `account` to another object in Indian Rupees (₹).",
    explanation: "Final parameter protection demonstration.",
    hint: "Declared parameter as 'final' to prevent pointer reassignment.",
    level: "basic",
    codeExample: "public static void secureMethodWithFinalParam(final StudentAccount account, ...)"
  },
  {
    question: "What is the memory cost of parameter reassignment vs object mutation?",
    shortAnswer: "Reassignment costs zero heap memory if pointing to an existing reference, or allocates a new object if `new` is called; mutation modifies existing heap memory in-place without new allocations.",
    explanation: "Allocation profile differences.",
    hint: "Mutation modifies existing heap in-place; reassignment with 'new' allocates memory.",
    level: "intermediate",
    codeExample: "// Mutation: 0 allocations | Reassignment with new: heap allocation"
  },
  {
    question: "Why does the Java compiler NOT warn about unused parameter reassignments unless configured in linters?",
    shortAnswer: "Reassigning parameters is syntactically valid in Java, though modern static analyzers (SpotBugs, SonarQube) flag it as a code quality warning.",
    explanation: "Static analysis rules for parameter reassignment.",
    hint: "Syntactically legal, but static analyzers flag it as a code smell.",
    level: "intermediate",
    codeExample: "// SonarQube rule: Parameters should not be reassigned (java:S1226)"
  },
  {
    question: "What is the ultimate takeaway of Module 001_007 Topic 6 for Java developers?",
    shortAnswer: "Parameter reassignment modifies only local stack pointers with zero effect on the caller; object mutation dereferences the pointer to change shared heap state. To prevent bugs, mark parameters `final` and design immutable classes.",
    explanation: "Mastery of parameter reassignment vs mutation.",
    hint: "Reassignment affects only local stack; mutation changes shared heap state.",
    level: "basic",
    codeExample: "// Summary: Stack Pointer Reassignment != Shared Heap Object Mutation"
  },
  {
    question: "What is the next topic (Topic 7) in Module 001_007?",
    shortAnswer: "Method Overloading: same method name with different parameter lists (count, types, order).",
    explanation: "Topic 7 explores compile-time polymorphism via method overloading.",
    hint: "Method Overloading: same method name with different parameter lists (count, types, order).",
    level: "basic",
    codeExample: "// Topic 7: Method Overloading & Compile-Time Polymorphism"
  },
  {
    question: "How does functional programming in Java 8+ handle parameter mutation?",
    shortAnswer: "By treating all data structures as immutable and producing new copies using streams and transformational functions (`map`, `filter`) rather than mutating inputs in-place.",
    explanation: "Functional immutability paradigms in Java.",
    hint: "Transforms data via pure functions without in-place mutation.",
    level: "advanced",
    codeExample: "List<Double> discounted = fees.stream().map(f -> f * 0.9).toList();"
  }
];

export default questions;
