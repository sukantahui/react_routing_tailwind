/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 8: Instance Methods: Invoking Behaviors on Objects via Dot (.) Operator
 * High-Yield Technical Interview & Academic Q&A Catalog (30 Questions)
 * ============================================================================
 *
 * Educator: Sukanta Hui
 * Academic Centres: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 * ============================================================================
 */

const topic8_questions = [
  {
    question: "What is an Instance Method in Java?",
    shortAnswer: "A non-static method declared in a class that represents behavior acting on the specific state of an object instance.",
    explanation: "Instance methods require an active object instance on the Heap to be invoked. They have access to the implicit 'this' reference pointing to the target object's instance variables and other instance methods.",
    hint: "Non-static method bound to object state.",
    level: "Beginner",
    codeExample: "public void creditStipend(double amount) {\n    this.balanceInr += amount; // 'this' points to target object\n}"
  },
  {
    question: "What is the role of the Dot ('.') operator in Java?",
    shortAnswer: "The member access operator used to invoke methods, access fields, or navigate packages on an object reference or class.",
    explanation: "When used with an object reference ('student.displayStatement()'), the dot operator dereferences the Stack pointer to locate the object on the Heap and dispatches the specified method.",
    hint: "Dereferences reference pointers to access members.",
    level: "Beginner",
    codeExample: "swadeepAccount.creditStipend(5000.0); // Dot operator invokes method on swadeepAccount instance"
  },
  {
    question: "What is the implicit 'this' parameter in JVM bytecode?",
    shortAnswer: "The first argument (at slot 0 in the Local Variable Table) automatically passed to every instance method by the JVM.",
    explanation: "In Java bytecode, instance methods are compiled to receive the invoking object's reference address as local variable 0 ('aload_0'). When you write 'balanceInr += x;', the compiler emits 'aload_0' to load 'this' followed by 'getfield/putfield'.",
    hint: "Local Variable Table slot 0 in every non-static method.",
    level: "Intermediate",
    codeExample: "// Java: void deposit(double amt)\n// Bytecode equivalent: void deposit(StudentScholarshipAccount this, double amt)"
  },
  {
    question: "What bytecode instruction is used to invoke standard instance methods vs static methods?",
    shortAnswer: "Instance methods use 'invokevirtual' (or 'invokeinterface' / 'invokespecial'); Static methods use 'invokestatic'.",
    explanation: "'invokevirtual' uses dynamic dispatch via the Virtual Method Table (vtable) based on the runtime class of the object. 'invokestatic' performs early binding at compile-time based on the declared class name.",
    hint: "Dynamic runtime dispatch vs static compile-time binding.",
    level: "Intermediate",
    codeExample: "// Bytecode:\n// 4: invokevirtual #7 // Method creditStipend:(D)Z\n// 8: invokestatic  #12 // Method printAcademyScholarshipPolicy:()V"
  },
  {
    question: "What is 'Method Chaining' (Fluent Interface Design) and how is it implemented?",
    shortAnswer: "Chaining multiple method calls on a single line by returning 'this' (the current object reference) from mutator methods.",
    explanation: "When mutator methods return 'this', the dot operator immediately has a reference to the same object, allowing calls like 'account.upgradeTier(\"Gold\").relocateBranch(\"Barrackpore\").creditStipend(5000.0);'.",
    hint: "Return 'this' from mutator methods.",
    level: "Beginner",
    codeExample: "public StudentAccount upgradeTier(String tier) {\n    this.tier = tier;\n    return this; // Enables method chaining\n}"
  },
  {
    question: "What happens if you invoke an instance method on a reference variable that holds 'null'?",
    shortAnswer: "The JVM throws java.lang.NullPointerException immediately upon dereferencing the dot operator.",
    explanation: "The dot operator expects a valid 64-bit/32-bit Heap address. If the Stack variable holds 0x00000000 (null), the JVM cannot locate the object header or vtable, triggering an NPE.",
    hint: "Dereferencing null causes an instant runtime crash.",
    level: "Beginner",
    codeExample: "StudentScholarshipAccount account = null;\naccount.creditStipend(100.0); // Throws NullPointerException!"
  },
  {
    question: "Can an instance method invoke a static method of the same class without using the class name?",
    shortAnswer: "Yes! Instance methods have full access to all static methods and static fields of their enclosing class.",
    explanation: "Because static members are loaded into memory when the class is loaded, any instance method executing later can directly invoke static methods by name without prefixing 'ClassName.'.",
    hint: "Instance code has complete access to static members.",
    level: "Beginner",
    codeExample: "class Account {\n    static void log() { ... }\n    void process() {\n        log(); // Valid: calls static method directly\n    }\n}"
  },
  {
    question: "Can a static method invoke an instance method directly without an object reference?",
    shortAnswer: "No. Static methods run in class context without an implicit 'this' pointer, so they cannot invoke instance methods directly.",
    explanation: "Static methods are not tied to any object on the Heap. Trying to call 'creditStipend()' from a static method causes a compile error: 'non-static method cannot be referenced from a static context'. An object must be explicitly instantiated first.",
    hint: "Static context has no 'this' pointer.",
    level: "Beginner",
    codeExample: "// Compile Error:\npublic static void main(String[] args) {\n    // creditStipend(500.0); // Error: non-static method in static context\n    new StudentScholarshipAccount(...).creditStipend(500.0); // Valid via instance\n}"
  },
  {
    question: "What is a 'vtable' (Virtual Method Table) in the HotSpot JVM?",
    shortAnswer: "An internal array of function pointers stored in class metadata (Metaspace) used to resolve dynamic method invocations in O(1) time.",
    explanation: "When an instance method is called via 'invokevirtual', the JVM indexes into the runtime object's vtable to find the exact memory address of the target method's compiled machine code, enabling rapid polymorphic dispatch.",
    hint: "O(1) function pointer lookup table for virtual methods.",
    level: "Advanced",
    codeExample: "// HotSpot JVM: object -> Klass metadata -> vtable[method_index] -> native code pointer"
  },
  {
    question: "What is 'Monomorphic Inline Caching' in JVM JIT compilation?",
    shortAnswer: "A JIT optimization where the compiler replaces dynamic vtable lookup with a direct call if the method is always called on the exact same class.",
    explanation: "If profiling reveals that a call site like 'account.creditStipend()' is only ever invoked on 'StudentScholarshipAccount' (monomorphic), the JIT compiler inlines the method body directly, eliminating method call overhead completely.",
    hint: "JIT eliminates virtual dispatch overhead for predictable call sites.",
    level: "Advanced",
    codeExample: "// JIT inlines 'account.creditStipend(100)' directly into 'account.balance += 100'"
  },
  {
    question: "What is the difference between an Accessor method (Getter) and a Mutator method (Setter)?",
    shortAnswer: "An Accessor reads and returns state without modifying it; a Mutator alters the internal state of the object.",
    explanation: "Accessors (e.g. 'getBalanceInr()') provide read-only views into private fields. Mutators (e.g. 'creditStipend()') modify fields and should enforce business invariant validations.",
    hint: "Read vs Write behavior.",
    level: "Beginner",
    codeExample: "public double getBalance() { return balanceInr; }       // Accessor\npublic void setBalance(double b) { this.balanceInr = b; } // Mutator"
  },
  {
    question: "Can an instance method have the same name as an instance variable in the same class?",
    shortAnswer: "Yes! Java maintains distinct namespaces for fields and methods.",
    explanation: "Writing 'private double balance;' and 'public double balance() { return balance; }' is 100% valid Java syntax (this is how Java 16+ records declare accessors).",
    hint: "Fields and methods occupy different identifier namespaces.",
    level: "Intermediate",
    codeExample: "class Student {\n    private int roll;\n    public int roll() { return this.roll; } // Valid!\n}"
  },
  {
    question: "What is 'Method Overloading' in instance methods?",
    shortAnswer: "Defining multiple methods in the same class with the same name but different parameter lists (different types, number, or order).",
    explanation: "Overloading provides multiple ways to invoke a behavior based on argument variants. Overload resolution occurs at compile-time (Static Polymorphism).",
    hint: "Same name, different parameter signatures.",
    level: "Beginner",
    codeExample: "public void debit(double amt) { ... }\npublic void debit(double amt, String purpose) { ... } // Overload"
  },
  {
    question: "Does the return type participate in Method Overloading resolution?",
    shortAnswer: "No. Two methods in the same class with identical names and parameter lists but different return types cause a compile-time error.",
    explanation: "A method's signature consists only of the method name and parameter types. Return type is not part of the signature because callers can invoke a method without assigning its return value ('account.creditStipend(100.0);').",
    hint: "Signature = Name + Parameter Types only.",
    level: "Beginner",
    codeExample: "// Compile Error: 'method already defined in class'\n// int calculate() { return 1; }\n// double calculate() { return 1.0; }"
  },
  {
    question: "What is the 'final' modifier on an instance method?",
    shortAnswer: "It prevents subclasses from overriding the method, allowing the JIT compiler to optimize with direct inlining.",
    explanation: "Marking an instance method 'final' freezes its implementation across the inheritance tree. Because no child class can override it, the compiler and JIT can safely inline the bytecode without vtable overhead.",
    hint: "Cannot be overridden in child classes.",
    level: "Intermediate",
    codeExample: "public final void lockAccount() { this.isLocked = true; }"
  },
  {
    question: "What is a 'Pure Method' (Side-Effect-Free Method)?",
    shortAnswer: "A method that calculates and returns a value based solely on its parameters/state without mutating any object fields or external state.",
    explanation: "Methods like 'calculateAnnualProjectedInterest(rate)' do not alter 'balanceInr' or any field. They can be invoked repeatedly with identical inputs and always return the same result without side effects.",
    hint: "No state mutation, deterministic return.",
    level: "Intermediate",
    codeExample: "public double calculateTax(double rate) {\n    return this.balanceInr * (rate / 100.0); // Pure computation\n}"
  },
  {
    question: "How does the 'private' modifier affect instance method invocation?",
    shortAnswer: "Private instance methods can only be invoked by code inside the same enclosing class; they use 'invokespecial' instead of 'invokevirtual'.",
    explanation: "Because private methods cannot be overridden by subclasses, dynamic dispatch is not needed. The compiler emits 'invokespecial', enabling direct, fast execution.",
    hint: "Private methods bypass virtual dispatch.",
    level: "Intermediate",
    codeExample: "private void validateAuditTrail() { ... } // Internal helper method"
  },
  {
    question: "Can an instance method be called recursively on an object?",
    shortAnswer: "Yes. Each recursive call pushes a new Stack Frame with its own local variables and parameter slots, all holding the same 'this' pointer.",
    explanation: "Recursive instance methods operate identically to static recursion, except each frame's slot 0 holds 'this'. Excessive depth without base case leads to StackOverflowError.",
    hint: "Stack frames multiply, 'this' pointer is copied to each frame.",
    level: "Beginner",
    codeExample: "public int computeFactorial(int n) {\n    return (n <= 1) ? 1 : n * computeFactorial(n - 1);\n}"
  },
  {
    question: "What is 'Command Query Separation' (CQS) principle in method design?",
    shortAnswer: "A method should either be a Command (performs an action and mutates state, returning void) or a Query (returns data without side effects), but not both.",
    explanation: "CQS simplifies code reasoning by making state-changing methods explicit and guaranteeing that query methods can be called safely without altering system state.",
    hint: "Commands mutate; Queries observe.",
    level: "Advanced",
    codeExample: "// Query: double getBalance() { ... }\n// Command: void applyPenalty(double penalty) { ... }"
  },
  {
    question: "What happens if an instance method throws an unchecked RuntimeException?",
    shortAnswer: "The method's execution terminates immediately, its Stack Frame is popped, and the exception propagates up the call stack.",
    explanation: "Any state mutations executed before the exception was thrown will persist on the Heap object. This is why invariant checks should be performed at the very beginning of the method before mutating fields.",
    hint: "Fails fast and pops stack frames unless caught.",
    level: "Intermediate",
    codeExample: "public void withdraw(double amt) {\n    if (amt > balance) throw new IllegalStateException(\"Overdrawn!\"); // Guard before mutate\n    this.balance -= amt;\n}"
  },
  {
    question: "What is 'Variable Arity' (Varargs) in instance method parameters?",
    shortAnswer: "The '...' syntax allowing a method to accept zero or more arguments of a given type as an array.",
    explanation: "Writing 'public void logEvents(String... events)' compiles to 'public void logEvents(String[] events)'. Inside the method, 'events' is treated as a standard array.",
    hint: "Syntax sugar for array parameters.",
    level: "Beginner",
    codeExample: "public void recordMultipleExpenses(double... amounts) {\n    for (double a : amounts) debitExpense(a, \"Bulk Entry\");\n}"
  },
  {
    question: "What is the 'synchronized' modifier on an instance method?",
    shortAnswer: "It acquires the intrinsic lock (monitor) of the invoking object ('this') before executing the method body.",
    explanation: "Declaring 'public synchronized void creditStipend(...)' ensures that only one thread can execute any synchronized method on that specific object instance at a time, preventing multi-threaded race conditions.",
    hint: "Locks 'this' object instance monitor during method execution.",
    level: "Intermediate",
    codeExample: "public synchronized boolean creditStipend(double amount) { ... }"
  },
  {
    question: "What is the difference between 'invokespecial', 'invokevirtual', and 'invokeinterface'?",
    shortAnswer: "'invokespecial' is for private methods, super calls, and constructors; 'invokevirtual' is for class instance methods; 'invokeinterface' is for interface methods.",
    explanation: "'invokespecial' uses non-virtual early binding. 'invokevirtual' uses class vtable indexing. 'invokeinterface' uses an itable (interface table) because a class can implement multiple interfaces in arbitrary order.",
    hint: "Bytecode instruction dispatch taxonomy.",
    level: "Advanced",
    codeExample: "// super.toString() -> invokespecial\n// account.credit()   -> invokevirtual\n// list.add()         -> invokeinterface"
  },
  {
    question: "Can an instance method return an array or another object instance?",
    shortAnswer: "Yes, methods can return any primitive type, object reference, array, or 'void' (nothing).",
    explanation: "Returning an object reference pushes the 64-bit Heap address onto the operand stack to be received by the caller's Stack frame.",
    hint: "Returns 64-bit reference address pointer.",
    level: "Beginner",
    codeExample: "public String[] getBranchOffices() { return new String[]{\"Barrackpore\", \"Naihati\"}; }"
  },
  {
    question: "What is the effect of invoking a method on an anonymous object (e.g. 'new Account(...).display()')?",
    shortAnswer: "The object is created on the Heap, the method executes, and the object becomes immediately eligible for GC upon return.",
    explanation: "Because no Stack variable holds the returned reference, the object has zero active GC Roots once the line finishes, making it a temporary single-use instance.",
    hint: "Single-use fire-and-forget method execution.",
    level: "Beginner",
    codeExample: "new StudentScholarshipAccount(105, \"Debangshu\", \"Ichapur\", 5000.0).displayStatement();"
  },
  {
    question: "Why should instance methods avoid modifying their input parameters directly?",
    shortAnswer: "Modifying mutable parameter objects causes unintended side effects (action at a distance) for the caller.",
    explanation: "If a method receives a mutable List or Object and mutates it without the caller's explicit intent, it introduces hidden coupling and subtle bugs across system boundaries.",
    hint: "Parameters should generally be treated as read-only inputs.",
    level: "Intermediate",
    codeExample: "// BAD: modifying input list directly\nvoid process(List<Student> list) { list.clear(); }"
  },
  {
    question: "What is 'Escape Analysis' regarding return values of instance methods?",
    shortAnswer: "If a method instantiates an object and returns it, the object 'escapes' the method scope, forcing the JVM to allocate it on the Heap.",
    explanation: "Non-escaping objects can be stack-allocated by the JIT compiler. But returning an object reference means it escapes to the caller (GlobalEscape), mandating standard Heap allocation.",
    hint: "Returning an object reference marks it as escaped.",
    level: "Advanced",
    codeExample: "public Student createStudent() { return new Student(); } // Escapes to caller"
  },
  {
    question: "Can an instance method be declared 'native' and what does it mean?",
    shortAnswer: "Yes. A 'native' method has no Java body and is implemented in platform-specific C/C++ via the Java Native Interface (JNI).",
    explanation: "Native methods interact directly with OS system calls or hardware libraries. For example, Object.hashCode() and Thread.currentThread() are native methods.",
    hint: "C/C++ implementation linked via JNI.",
    level: "Advanced",
    codeExample: "public native int identityHashCode(Object x);"
  },
  {
    question: "What is Method Inlining by the HotSpot C2 JIT Compiler?",
    shortAnswer: "Replacing the method call site with the actual body of the called method to eliminate call overhead and enable further CPU optimizations.",
    explanation: "For small, frequently invoked methods (like getters and setters under 35 bytes of bytecode), the JIT compiler copies the method's code directly into the caller, eliminating stack frame pushes and register saves.",
    hint: "Small methods become zero-cost abstractions through JIT inlining.",
    level: "Advanced",
    codeExample: "// 'int id = student.getId();' is inlined directly into CPU register access"
  },
  {
    question: "What is Sukanta Hui's Pedagogy on Instance Methods at the Barrackpore Academy?",
    shortAnswer: "Instance methods are the living voice of your objects. Never treat objects as passive data bags; give them purposeful behaviors that defend their own state.",
    explanation: "At the Barrackpore centre, Sukanta Hui emphasizes that true Object-Oriented design means objects control their own destiny. Instead of having external services directly manipulate fields, equip the class with rich instance methods that enforce domain rules, audit changes, and express clear business actions.",
    hint: "Tell, Don't Ask: equip objects with active behaviors.",
    level: "Beginner",
    codeExample: "// Sukanta Hui's 'Tell, Don't Ask' Rule:\n// BAD: if (acc.getBalance() >= amt) acc.setBalance(acc.getBalance() - amt);\n// GOOD: acc.debitExpense(amt, \"Lab Fee\");"
  }
];

export default topic8_questions;
