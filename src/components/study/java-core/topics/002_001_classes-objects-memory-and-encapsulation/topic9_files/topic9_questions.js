/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 9: Anonymous Objects: Creation and Valid Use Cases
 * High-Yield Technical Interview & Academic Q&A Catalog (30 Questions)
 * ============================================================================
 *
 * Educator: Sukanta Hui
 * Academic Centres: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 * ============================================================================
 */

const topic9_questions = [
  {
    question: "What is an Anonymous Object in Java?",
    shortAnswer: "An object instantiated via the 'new' keyword without assigning its reference address to a named reference variable on the Stack.",
    explanation: "Because an anonymous object has no variable holding its address on the Stack frame, it is used for a single statement (such as calling a method or passing as a parameter) and becomes immediately eligible for Garbage Collection once the statement completes.",
    hint: "An unnamed, single-use object instance.",
    level: "Beginner",
    codeExample: "new NotificationDispatcher(\"Barrackpore\").dispatchSmsNotification(\"Swadeep\", \"Exam at 10 AM\");"
  },
  {
    question: "What is the complete lifecycle of an anonymous object in JVM memory?",
    shortAnswer: "1. Allocated in Eden space -> 2. Constructor initializes fields -> 3. Target method executes on 'this' -> 4. Statement completes -> 5. Immediately eligible for GC.",
    explanation: "Unlike named objects which remain reachable until their Stack variable goes out of scope or is nullified, an anonymous object loses reachability as soon as the semicolon terminating the instantiation expression is reached.",
    hint: "Created, executed, and orphaned in a single statement.",
    level: "Intermediate",
    codeExample: "new PaymentGatewayReceipt(\"TXN-1\", \"Tuhina\", 5000.0).getFeeAmountInr(); // GC eligible immediately"
  },
  {
    question: "What are the 4 main valid production use cases for anonymous objects?",
    shortAnswer: "1. Fire-and-forget method execution, 2. Transient method arguments, 3. Anonymous event listeners/callbacks, 4. Immediate return values from factory methods.",
    explanation: "Anonymous objects reduce code clutter and local variable proliferation when an object's sole purpose is to execute one operation or serve as a transient data container for a single method call.",
    hint: "Single-use executions, parameters, callbacks, and factory returns.",
    level: "Beginner",
    codeExample: "ledger.processPayment(new PaymentGatewayReceipt(\"TXN-101\", \"Swadeep\", 7500.0));"
  },
  {
    question: "What is the critical 'State Loss' pitfall with anonymous objects?",
    shortAnswer: "Calling multiple methods across separate lines on 'new ClassName()' creates a brand new independent object for each call, losing all previous state changes.",
    explanation: "If you write 'new ScoreCard().add(50);' and on the next line write 'new ScoreCard().print();', the second line instantiates a fresh ScoreCard with 0 points. Each 'new' creates a completely different object on the Heap.",
    hint: "Each 'new' keyword creates a separate physical object instance.",
    level: "Beginner",
    codeExample: "// BUG:\nnew TraineeScoreCard().addScore(50);\nnew TraineeScoreCard().printFinalScore(); // Prints 0!"
  },
  {
    question: "Does an anonymous object take less Heap memory than a named object?",
    shortAnswer: "No. The Heap memory footprint (Object Header + fields + padding) is identical; only the 4-8 bytes on the Stack frame are saved.",
    explanation: "Every object created with 'new' allocates the exact same bytes in Eden space regardless of whether it is assigned to a named variable. The only difference is that a named variable occupies a slot in the Stack's Local Variable Table.",
    hint: "Heap allocation is identical; only Stack slot is omitted.",
    level: "Intermediate",
    codeExample: "// 'new TraineeProfile()' consumes the exact same 32 bytes in Heap whether named or anonymous"
  },
  {
    question: "Can an anonymous object invoke multiple methods in a single statement via Method Chaining?",
    shortAnswer: "Yes! If the methods return 'this', you can chain multiple operations on the single anonymous instance.",
    explanation: "Writing 'new Account().setTier(\"Gold\").credit(5000.0).displayStatement();' executes all 3 methods on the SAME single anonymous object before it is orphaned at the terminating semicolon.",
    hint: "Method chaining keeps the anonymous reference alive through the chain.",
    level: "Intermediate",
    codeExample: "new StudentScholarshipAccount(101, \"Swadeep\", \"Barrackpore\", 5000.0)\n    .upgradeTier(\"Platinum\")\n    .displayStatement();"
  },
  {
    question: "What is the difference between an 'Anonymous Object' and an 'Anonymous Inner Class'?",
    shortAnswer: "An anonymous object is an unnamed instance of an existing class; an anonymous inner class is an unnamed subclass/implementation defined inline.",
    explanation: "'new Student()' creates an anonymous object of the existing Student class. 'new ActionListener() { public void actionPerformed(ActionEvent e) {} }' defines and instantiates an unnamed subclass implementing the interface.",
    hint: "Unnamed instance vs unnamed subclass definition.",
    level: "Intermediate",
    codeExample: "// Anonymous Object: new Point(10, 20)\n// Anonymous Inner Class: new Runnable() { public void run() { ... } }"
  },
  {
    question: "Can the JIT compiler optimize anonymous objects using Escape Analysis?",
    shortAnswer: "Yes! Because anonymous objects frequently do not escape the invoking method, the JIT can easily scalar-replace them on the Stack.",
    explanation: "If an anonymous object is created solely to invoke a local helper method and is never stored in a field or returned (NoEscape), Escape Analysis can eliminate Heap allocation entirely, executing the method using CPU registers.",
    hint: "Short-lived local objects are prime candidates for Scalar Replacement.",
    level: "Advanced",
    codeExample: "double tax = new TaxCalculator().compute(10000.0); // JIT can scalar-replace TaxCalculator!"
  },
  {
    question: "Why is passing an anonymous object as a method parameter better than creating a temporary named variable?",
    shortAnswer: "It reduces scope pollution, eliminates redundant Stack local variables, and clarifies that the argument is a single-use transient value.",
    explanation: "If 'PaymentGatewayReceipt receipt = new PaymentGatewayReceipt(...); ledger.process(receipt);' is used and 'receipt' is never touched again, declaring 'receipt' clutters the method scope. Passing it anonymously keeps the code concise.",
    hint: "Eliminates single-use temporary variables.",
    level: "Beginner",
    codeExample: "barrackporeLedger.processFeePayment(new PaymentGatewayReceipt(\"TXN-9081\", \"Swadeep\", 8500.0));"
  },
  {
    question: "What happens if an exception is thrown inside an anonymous object's constructor?",
    shortAnswer: "Object instantiation aborts immediately, the method is never called, and the partially allocated Heap memory is reclaimed during GC.",
    explanation: "Just like with named objects, an unhandled exception during constructor evaluation halts the statement before method dispatch occurs.",
    hint: "Atomicity of object creation: exception in constructor aborts execution.",
    level: "Intermediate",
    codeExample: "// If constructor throws IllegalArgumentException, dispatchSmsNotification() is never reached:\nnew NotificationDispatcher(null).dispatchSmsNotification(\"Swadeep\", \"Hello\");"
  },
  {
    question: "Can you pass an anonymous array as an argument to a method in Java?",
    shortAnswer: "Yes! Using syntax like 'method(new int[]{1, 2, 3})' creates an anonymous array without a named variable.",
    explanation: "Anonymous arrays are instantiated on the fly to pass collections of values to methods without declaring intermediate array reference variables.",
    hint: "Inline array instantiation without variable declaration.",
    level: "Beginner",
    codeExample: "processMarks(new int[]{95, 88, 92, 100}); // Anonymous array"
  },
  {
    question: "How does Garbage Collection handle high volumes of anonymous objects created in tight loops?",
    shortAnswer: "They fill Eden space rapidly, triggering frequent Minor Garbage Collections (Eden churn).",
    explanation: "While Minor GCs on Eden space are very fast, creating millions of anonymous objects per second increases GC pause frequency and CPU overhead. Reusing a single mutable helper or static utility method is preferred.",
    hint: "Eden churn from rapid object creation in high-frequency loops.",
    level: "Intermediate",
    codeExample: "// Inefficient:\nfor (int i = 0; i < 1_000_000; i++) new Formatter().format(data[i]);\n// Better: reuse 1 Formatter or use static methods"
  },
  {
    question: "Can an anonymous object access private fields of other objects in the same class?",
    shortAnswer: "Yes. All instances of the same class can access each other's private members.",
    explanation: "Java access control is class-based, not instance-based. An anonymous instance of Class A executing inside Class A has full access to private fields of any other Class A instance.",
    hint: "Class-level encapsulation access.",
    level: "Intermediate",
    codeExample: "class Secret {\n    private int key = 42;\n    void compare(Secret other) {\n        // Anonymous object can access other.key\n    }\n}"
  },
  {
    question: "What is the difference between 'new Thread(new Task()).start()' and storing the Thread in a variable?",
    shortAnswer: "'new Thread(task).start()' runs the thread asynchronously without retaining a Stack reference in the spawning method.",
    explanation: "The thread object is registered with the JVM ThreadGroup (an active GC Root). Even though the spawning method holds no Stack reference, the thread remains alive until its 'run()' method completes.",
    hint: "Active threads are GC Roots regardless of Stack reference variables.",
    level: "Intermediate",
    codeExample: "new Thread(() -> System.out.println(\"Background Task running\")).start();"
  },
  {
    question: "Can you synchronize on an anonymous object (e.g. 'synchronized(new Object())') and why is it useless?",
    shortAnswer: "It compiles, but is completely useless because every thread creates and locks its own distinct object instance, providing ZERO synchronization.",
    explanation: "Synchronization requires all competing threads to lock the SAME object monitor. 'synchronized(new Object())' locks a private temporary object that no other thread will ever see, defeating the purpose of locking.",
    hint: "Locks must be shared across threads to provide mutual exclusion.",
    level: "Advanced",
    codeExample: "// USELESS ANTI-PATTERN:\nsynchronized(new Object()) { /* Never blocks any other thread! */ }"
  },
  {
    question: "What is the return type of an expression that invokes a method on an anonymous object?",
    shortAnswer: "The exact return type declared by the invoked method (primitive, reference, or void).",
    explanation: "In 'double fee = new PaymentGatewayReceipt(...).getFeeAmountInr();', the return value is a primitive 'double', and the anonymous receipt object on the Heap is discarded.",
    hint: "The expression evaluates to the invoked method's return value.",
    level: "Beginner",
    codeExample: "double fee = new PaymentGatewayReceipt(\"TXN-1\", \"Swadeep\", 8500.0).getFeeAmountInr();"
  },
  {
    question: "Can an anonymous object be cast to another type during invocation?",
    shortAnswer: "Yes, using standard casting parentheses: '((SubClass) new SuperClass()).subMethod()'.",
    explanation: "You can cast an anonymous object expression before invoking a method on it, provided the runtime type conforms to the cast.",
    hint: "Wrap instantiation in parentheses to cast before method call.",
    level: "Intermediate",
    codeExample: "((StudentScholarshipAccount) new Object()).displayStatement(); // Casts before calling"
  },
  {
    question: "Why do builder patterns frequently return anonymous objects from intermediate steps?",
    shortAnswer: "To provide a fluent domain-specific language (DSL) that guides the developer step-by-step toward the final build() call.",
    explanation: "Staged builders return transient step objects (e.g. 'StudentBuilder.named(\"Swadeep\").withRoll(101).build()') that provide compile-time safety for mandatory fields.",
    hint: "Step-builder pattern with transient intermediate objects.",
    level: "Advanced",
    codeExample: "CourseEnrollment enrollment = CourseEnrollment.builder().name(\"Swadeep\").fee(8500.0).build();"
  },
  {
    question: "What happens when you pass an anonymous object into 'List.add(new Student(\"Tuhina\"))'?",
    shortAnswer: "The List stores the Heap address in its internal array, creating an active reference that prevents the object from being garbage-collected.",
    explanation: "Although no local variable on the caller's Stack holds the reference, the List's internal array element holds the pointer, keeping the object alive on the Heap as long as the List is reachable.",
    hint: "The collection becomes the active GC Root anchor.",
    level: "Beginner",
    codeExample: "List<Student> list = new ArrayList<>();\nlist.add(new Student(\"Tuhina\")); // Object is safely preserved in the list!"
  },
  {
    question: "Can an anonymous object be used to instantiate an anonymous inner class in a single line?",
    shortAnswer: "Yes! For example, 'new Thread(new Runnable() { public void run() { ... } }).start();'.",
    explanation: "This combines anonymous object creation with anonymous inner class implementation in a single compact statement.",
    hint: "Double anonymous idiom in legacy Java.",
    level: "Intermediate",
    codeExample: "new Thread(new Runnable() { public void run() { System.out.println(\"Running\"); } }).start();"
  },
  {
    question: "How does the 'record' feature in Java 16+ interact with anonymous objects?",
    shortAnswer: "Records make excellent anonymous transient data carriers (DTOs) due to their compact constructor syntax and zero-boilerplate immutability.",
    explanation: "Passing an anonymous record 'new Point(10, 20)' provides immutable, validated data transfer with built-in equals/hashCode support and minimal syntax.",
    hint: "Immutable lightweight records as transient anonymous parameters.",
    level: "Intermediate",
    codeExample: "record GeoCoord(double lat, double lon) {}\nmapService.pinLocation(new GeoCoord(22.76, 88.37)); // Barrackpore coordinates"
  },
  {
    question: "What is the danger of using anonymous objects with heavy native resources (e.g. 'new FileInputStream(...).read()')?",
    shortAnswer: "Resource Leak: the file stream or socket is never explicitly closed with '.close()', leaking OS file descriptors.",
    explanation: "Because no variable holds the stream, you cannot call 'close()' or wrap it in a try-with-resources statement. The file descriptor remains open until the JVM's Cleaner/GC eventually reclaims it (which may be too late).",
    hint: "Always use named variables in try-with-resources for Closeable resources.",
    level: "Advanced",
    codeExample: "// DANGEROUS LEAK:\nint b = new FileInputStream(\"data.txt\").read(); // File descriptor leaked!\n// SAFE:\ntry (FileInputStream fis = new FileInputStream(\"data.txt\")) { int b = fis.read(); }"
  },
  {
    question: "Can an anonymous object have instance initializer blocks?",
    shortAnswer: "Yes. An anonymous object runs all static and instance initializer blocks of its class during instantiation.",
    explanation: "Because an anonymous object uses standard class constructors, all normal initialization stages (zero-init, field inits, instance initializer blocks) execute identically.",
    hint: "Standard class initialization pipeline applies.",
    level: "Beginner",
    codeExample: "class Task {\n    { System.out.println(\"Instance block runs for anonymous object!\"); }\n}"
  },
  {
    question: "Why should you avoid creating anonymous instances of utility classes that have only static methods?",
    shortAnswer: "Utility classes should have private constructors and be invoked via 'UtilityClass.method()'; instantiating them wastes Heap memory.",
    explanation: "Creating 'new Math().max(a, b)' or 'new StringUtils().trim(s)' allocates unnecessary Heap objects. Utility classes should enforce non-instantiability with a private constructor.",
    hint: "Static utility classes should never be instantiated.",
    level: "Beginner",
    codeExample: "// Anti-pattern: new Math().sqrt(16.0);\n// Correct: Math.sqrt(16.0);"
  },
  {
    question: "What is the bytecode difference between 'Student s = new Student(); s.display();' and 'new Student().display();'?",
    shortAnswer: "The named version uses 'astore_1' and 'aload_1' to save and reload the reference from the local variable table; the anonymous version keeps the reference directly on the operand stack.",
    explanation: "The anonymous version saves 2 bytecode instructions ('astore' and 'aload') because the reference pushed by 'new/dup' is consumed directly by 'invokevirtual' without being written to the Stack frame's local variable table.",
    hint: "Saves astore/aload bytecode instructions.",
    level: "Advanced",
    codeExample: "// Anonymous bytecode:\n// 0: new #2; 3: dup; 4: invokespecial #3; 7: invokevirtual #4; 10: return"
  },
  {
    question: "How does Kotlin's 'apply' or 'also' scope functions compare to Java's anonymous object chaining?",
    shortAnswer: "Kotlin scope functions provide language-level block scoping for transient object configuration; Java achieves similar ergonomics via fluent builder methods returning 'this'.",
    explanation: "While Kotlin has built-in scope functions, Java developers design classes with fluent mutators ('return this;') to enable seamless multi-step configuration on anonymous instances.",
    hint: "Fluent mutators provide scope-function ergonomics in Java.",
    level: "Intermediate",
    codeExample: "new StudentRecord().setRoll(101).setName(\"Swadeep\").save();"
  },
  {
    question: "Can an anonymous object be passed to 'System.identityHashCode()'?",
    shortAnswer: "Yes! 'System.identityHashCode(new Object())' returns the JVM identity hash of that transient object.",
    explanation: "The anonymous object is created, passed to the static method, its identity hash code is extracted from its Mark Word, and then it is immediately discarded.",
    hint: "Extracts identity hash before discarding instance.",
    level: "Beginner",
    codeExample: "int hash = System.identityHashCode(new NotificationDispatcher(\"Barrackpore\"));"
  },
  {
    question: "What is the primary indicator that an anonymous object SHOULD be converted into a named variable?",
    shortAnswer: "When the object's methods need to be called multiple times across distinct lines, or its state must be queried after an operation.",
    explanation: "If you need to inspect the return code, check a boolean flag, or query the balance after an operation, storing the reference in a named variable is strictly necessary.",
    hint: "Multi-line interaction or state inspection mandates a named variable.",
    level: "Beginner",
    codeExample: "StudentRecord record = new StudentRecord(101, \"Swadeep\");\nrecord.registerCourse(\"Java\");\nif (record.isEnrolled()) record.printCard(); // Requires named variable!"
  },
  {
    question: "How do modern microservices use anonymous objects in reactive streams or message publishing?",
    shortAnswer: "By instantiating and publishing transient event messages directly into Kafka/RabbitMQ streams without caching them in memory.",
    explanation: "In event-driven architectures, event objects ('new StudentEnrolledEvent(studentId, timestamp)') are fired directly into reactive publishers ('eventBus.publish(new StudentEnrolledEvent(...))') and immediately reclaimed by GC.",
    hint: "Fire-and-forget event message publication.",
    level: "Advanced",
    codeExample: "eventPublisher.emit(new EnrollmentConfirmedEvent(101, \"Barrackpore\"));"
  },
  {
    question: "What is Sukanta Hui's Rule of Thumb for Anonymous Objects?",
    shortAnswer: "Use anonymous objects for transient actions and one-way messages; use named references for persistent domain entities and long-term state.",
    explanation: "At the Barrackpore academy, Sukanta Hui teaches that an anonymous object is like a postal courier—it delivers a message or executes a task and departs immediately. If an entity represents a student, bank account, or persistent system record, it deserves a proud, named reference variable on the Stack.",
    hint: "Couriers are anonymous; citizens have names.",
    level: "Beginner",
    codeExample: "// Sukanta Hui's Law:\n// Transient Action (Anonymous): new ReceiptPrinter().print(report);\n// Domain Entity (Named)       : StudentAccount swadeep = new StudentAccount(...);"
  }
];

export default topic9_questions;
