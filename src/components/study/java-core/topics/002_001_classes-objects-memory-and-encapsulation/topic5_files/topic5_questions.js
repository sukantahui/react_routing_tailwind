/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 5: Multiple Reference Variables Pointing to the Same Object (Aliasing)
 * High-Yield Technical Interview & Academic Q&A Catalog (30 Questions)
 * ============================================================================
 *
 * Educator: Sukanta Hui
 * Academic Centres: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 * ============================================================================
 */

const topic5_questions = [
  {
    question: "What is 'Object Aliasing' in Java?",
    shortAnswer: "When two or more distinct reference variables on the Stack hold the memory address of the exact same object on the Heap.",
    explanation: "Aliasing occurs whenever a reference assignment like 'ref2 = ref1' is executed. Both variables become independent handles pointing to a single underlying object instance in Heap memory.",
    hint: "Multiple names or remote controls for a single physical entity.",
    level: "Beginner",
    codeExample: "BatchProjectAccount primary = new BatchProjectAccount(...);\nBatchProjectAccount coLead = primary; // Aliasing: primary and coLead point to the same object"
  },
  {
    question: "What happens to the object state when one alias mutates a field?",
    shortAnswer: "The mutation immediately affects what all other aliases see, because there is only one object in Heap memory.",
    explanation: "Since all aliases share the exact same Heap memory block, invoking a mutating method through 'aliasA.setBudget(5000)' directly alters the fields in that shared memory chunk. When 'aliasB.getBudget()' is called, it reads the updated value.",
    hint: "There is only one copy of the fields on the Heap.",
    level: "Beginner",
    codeExample: "coLead.recordExpense(\"Lab Equipment\", 5000.0, \"Tuhina\");\nSystem.out.println(primary.getRemainingBudget()); // Reads the updated reduced balance!"
  },
  {
    question: "Does assigning 'ref1 = null' destroy the shared object if 'ref2' is still pointing to it?",
    shortAnswer: "No. Setting 'ref1 = null' only clears the pointer in ref1's Stack slot; the object remains alive because ref2 is an active GC Root.",
    explanation: "Garbage Collection is based on reachability. An object is only eligible for GC when NO active reference paths from any GC Root exist. As long as ref2 holds the Heap address, the object remains 100% alive in memory.",
    hint: "Partial severance does not trigger garbage collection.",
    level: "Beginner",
    codeExample: "BatchProjectAccount a = new BatchProjectAccount(...);\nBatchProjectAccount b = a;\na = null; // Object remains alive via 'b'!"
  },
  {
    question: "How does the '==' operator behave between aliased reference variables?",
    shortAnswer: "It always returns 'true' because both variables contain the identical Heap memory address pointer.",
    explanation: "The '==' operator on reference types compares the physical 32/64-bit addresses stored in their Stack slots. For aliases, those address values are identical.",
    hint: "Reference identity comparison checks address equality.",
    level: "Beginner",
    codeExample: "BatchProjectAccount a = new BatchProjectAccount(...);\nBatchProjectAccount b = a;\nSystem.out.println(a == b); // true"
  },
  {
    question: "What is a 'Defensive Copy' and why is it used to prevent aliasing bugs?",
    shortAnswer: "Creating and returning a separate duplicate object so that callers cannot mutate the internal private state of the original object.",
    explanation: "If a getter returns a reference to an internal mutable object (e.g. a Date or List), the caller gains an alias and can mutate internal state directly. Returning a new cloned/copied instance breaks the alias and preserves encapsulation.",
    hint: "Never hand over your private keys; hand over a duplicate copy.",
    level: "Intermediate",
    codeExample: "public Date getStartDate() {\n    return new Date(this.startDate.getTime()); // Defensive Copy prevents caller mutation\n}"
  },
  {
    question: "What are the common concurrency dangers of object aliasing in multi-threaded programs?",
    shortAnswer: "Race conditions, data corruption, and dirty reads when multiple threads mutate the shared object simultaneously without synchronization.",
    explanation: "Because Heap memory is shared across all threads, two threads with aliased references can execute conflicting mutations concurrently, corrupting object invariants and causing non-deterministic application crashes.",
    hint: "Shared mutable state is the root cause of multi-threading bugs.",
    level: "Intermediate",
    codeExample: "// Thread 1 & Thread 2 both call account.recordExpense(...) without synchronization"
  },
  {
    question: "How does creating an immutable class completely neutralize the risks of aliasing?",
    shortAnswer: "Since immutable objects have no mutator methods, sharing aliases across multiple references is 100% side-effect free and thread-safe.",
    explanation: "Classes like String, Integer, and LocalDate have final fields and no setter methods. Multiple references can point to the same String instance without any fear of unexpected state changes, making aliasing an asset rather than a liability.",
    hint: "If state cannot change, sharing pointers is completely safe.",
    level: "Intermediate",
    codeExample: "String s1 = \"Barrackpore\";\nString s2 = s1; // 100% safe aliasing because String is immutable!"
  },
  {
    question: "What is the difference between shallow copy and deep copy in relation to aliasing?",
    shortAnswer: "Shallow copy creates a new outer object but aliases all inner nested objects; Deep copy recursively creates new instances for both outer and inner objects.",
    explanation: "In a shallow copy, nested mutable reference fields still point to the original internal objects (creating aliased child structures). A deep copy instantiates new objects for every nested tier, guaranteeing zero shared mutable references.",
    hint: "Shallow copies share internal organs; deep copies clone everything.",
    level: "Intermediate",
    codeExample: "// Shallow Copy aliases child address:\nStudent clone = new Student(this.id, this.addressRef); // addressRef is aliased!"
  },
  {
    question: "What is 'Escape Analysis' regarding aliased method parameters?",
    shortAnswer: "The JVM JIT compiler checks if a reference escapes the method scope by being aliased into an external field or returned.",
    explanation: "If a method parameter is only aliased to local variables within the method and never published externally (NoEscape), the JIT compiler can optimize its access or perform scalar replacement.",
    hint: "Tracking pointer visibility boundaries.",
    level: "Advanced",
    codeExample: "void process(Student s) {\n    Student localAlias = s; // Does not escape outside process()\n}"
  },
  {
    question: "What happens if you modify an object inside a 'forEach' loop through an iteration alias variable?",
    shortAnswer: "The changes mutate the actual objects stored in the collection, because the loop variable is an alias to the element.",
    explanation: "In enhanced for-loops ('for (Student s : studentList)'), 's' is an alias holding the reference to each list element in Heap memory. Calling 's.setFees(0)' modifies the actual student object within the list.",
    hint: "The iteration variable is a reference pointer, not an independent copy.",
    level: "Beginner",
    codeExample: "for (BatchProjectAccount acc : accounts) {\n    acc.recordExpense(\"Tax\", 100.0, \"System\"); // Mutates elements in collection!\n}"
  },
  {
    question: "Can an alias reference have a different access modifier or scope than the original variable?",
    shortAnswer: "Yes. Reference variables have their own independent scopes, types (subtypes/supertypes), and modifiers on their respective Stack frames.",
    explanation: "A public field can hold a reference, a private local variable in a method can hold the same reference, and a parameter can hold it simultaneously. The scope belongs to the variable, while the object resides independently in the Heap.",
    hint: "Variable visibility is separate from object location.",
    level: "Intermediate",
    codeExample: "private BatchProjectAccount internalRef = publicService.getSharedAccount();"
  },
  {
    question: "What is the difference between 'Reference Aliasing' and 'Polymorphic Reference'?",
    shortAnswer: "Aliasing is multiple variables pointing to one object; Polymorphism is a parent type reference variable holding a child object instance.",
    explanation: "Polymorphism allows 'Object obj = new Student()' or 'List list = new ArrayList()'. If you have 'Student s = (Student) obj', both 'obj' and 's' are aliases to the same ArrayList instance, with 's' offering specialized subtype access.",
    hint: "Polymorphism defines type hierarchy; aliasing defines pointer multiplicity.",
    level: "Intermediate",
    codeExample: "Object ref1 = new Student(\"Swadeep\");\nStudent ref2 = (Student) ref1; // Both are aliases, but ref2 has Student-specific methods."
  },
  {
    question: "How can the 'final' keyword prevent reference reassignment while still allowing aliased mutation?",
    shortAnswer: "'final' locks the reference pointer to a specific Heap address, but does not prevent mutating the object's internal fields.",
    explanation: "Writing 'final BatchProjectAccount acc = primary;' prevents 'acc' from pointing to any other object in the future. However, calling 'acc.recordExpense(...)' is completely valid and mutates the shared Heap object.",
    hint: "Final reference protects the pointer, not the payload.",
    level: "Beginner",
    codeExample: "final BatchProjectAccount acc = primary;\nacc.recordExpense(\"Lab Books\", 500.0, \"Admin\"); // Allowed!\n// acc = new BatchProjectAccount(...); // Compile Error!"
  },
  {
    question: "What is an 'Unintended Side Effect' (Action at a Distance) in software architecture?",
    shortAnswer: "When modifying an object via one alias unexpectedly breaks assumptions or logic in an unrelated part of the codebase holding another alias.",
    explanation: "If Module A and Module B both hold references to the same mutable Configuration object, Module A changing a flag might cause Module B to fail without any explicit method call between them.",
    hint: "Hidden dependencies through shared mutable pointers.",
    level: "Intermediate",
    codeExample: "// Module A: config.setTimeout(0);\n// Module B: reads timeout=0 and crashes unexpectedly!"
  },
  {
    question: "How does the 'Flyweight Pattern' intentionally use aliasing to optimize memory?",
    shortAnswer: "It shares a single immutable object instance among thousands of references to eliminate duplicate Heap allocations.",
    explanation: "In graphics rendering, text editors, or game engines (e.g. rendering 100,000 trees with the same texture), the Flyweight pattern maintains one shared Texture object and aliases it across 100,000 Tree coordinate objects.",
    hint: "Intentional massive aliasing for memory efficiency.",
    level: "Advanced",
    codeExample: "TreeModel sharedModel = TreeModelFactory.get(\"Pine\");\nforest.add(new Tree(x1, y1, sharedModel));\nforest.add(new Tree(x2, y2, sharedModel)); // Shared pointer"
  },
  {
    question: "What is the role of IdentityHashCode vs Overridden HashCode when inspecting aliases?",
    shortAnswer: "System.identityHashCode() returns identical hashes for all aliases because it reads directly from the JVM object header.",
    explanation: "Even if an overridden hashCode() method calculates values based on mutable fields, System.identityHashCode(refA) and System.identityHashCode(refB) will always return the exact same integer for aliases, proving identical memory identity.",
    hint: "identityHashCode reflects physical Heap object identity.",
    level: "Intermediate",
    codeExample: "System.out.println(System.identityHashCode(refA) == System.identityHashCode(refB)); // true"
  },
  {
    question: "What happens when you pass an object reference to a method that stores it in a static collection?",
    shortAnswer: "The object gains a permanent alias rooted in Metaspace/Heap, preventing Garbage Collection until explicitly removed.",
    explanation: "Adding an aliased reference to a static list/map creates a permanent GC Root. Even if all local method variables go out of scope, the object remains reachable indefinitely (a common source of memory leaks).",
    hint: "Static collections hold persistent aliases.",
    level: "Intermediate",
    codeExample: "public static void register(Student s) {\n    registry.add(s); // 's' is now aliased in static registry for the entire application lifetime\n}"
  },
  {
    question: "How does Java's 'String Constant Pool' utilize reference aliasing?",
    shortAnswer: "Identical string literals are interned in the pool, so multiple variables with the same literal point to the exact same Heap object.",
    explanation: "When you declare 'String s1 = \"Barrackpore\"; String s2 = \"Barrackpore\";', the JVM does not create two string objects. Instead, both s1 and s2 are aliased to the same interned String instance in the pool.",
    hint: "String pooling is automatic compiler-assisted aliasing of immutable strings.",
    level: "Beginner",
    codeExample: "String s1 = \"Barrackpore\";\nString s2 = \"Barrackpore\";\nSystem.out.println(s1 == s2); // true (Aliased to same pooled instance)"
  },
  {
    question: "What is a 'WeakReference' in Java and how does it alter aliasing behavior?",
    shortAnswer: "A WeakReference allows pointing to an object without preventing the Garbage Collector from reclaiming it during GC.",
    explanation: "Standard aliases are 'Strong References'. A WeakReference ('WeakReference<Student> weakRef = new WeakReference<>(student);') allows accessing the object, but if no strong references remain, the GC reclaims it immediately.",
    hint: "Useful for memory-sensitive caches and listeners.",
    level: "Advanced",
    codeExample: "WeakReference<Student> weak = new WeakReference<>(new Student(\"Swadeep\"));\n// Eligible for GC if no strong references exist"
  },
  {
    question: "Can two references point to each other (Circular Reference) and what happens to GC?",
    shortAnswer: "Yes. In modern JVMs, circular references (isolated islands) are successfully collected if unreachable from any GC Root.",
    explanation: "Older reference-counting collectors failed on cycles (A points to B, B points to A). Modern HotSpot JVM uses Tracing Garbage Collection from GC Roots; if the entire cycle is disconnected from the root set, the entire island is reclaimed.",
    hint: "Root reachability ignores internal circular references.",
    level: "Advanced",
    codeExample: "Node a = new Node(); Node b = new Node();\na.next = b; b.next = a;\na = null; b = null; // Island of isolation reclaimed by GC!"
  },
  {
    question: "Why does Java not provide an operator to 'delete' or manually free an aliased object from memory?",
    shortAnswer: "To prevent 'Dangling Pointers' where deleting an object through one reference leaves other aliases pointing to corrupt memory.",
    explanation: "In C++, calling 'delete ptrA' frees the memory, leaving 'ptrB' as a dangerous dangling pointer. Java eliminates dangling pointers and segmentation faults by giving memory reclamation control exclusively to the automatic Garbage Collector.",
    hint: "Automatic GC guarantees pointer safety across all aliases.",
    level: "Intermediate",
    codeExample: "// In Java, you simply set references to null; the JVM safely collects memory when all aliases die."
  },
  {
    question: "What is the difference between 'Object Identity' and 'Object Equality' in aliased structures?",
    shortAnswer: "Identity ('==') means two references point to the exact same physical memory location; Equality ('equals()') means two objects contain equivalent logical field values.",
    explanation: "Aliased references are always identical (ref1 == ref2 is true). Two separate objects created at different Heap addresses may not be identical (ref1 == ref2 is false), but can be equal if their overridden equals() method matches their field values.",
    hint: "Address match vs content match.",
    level: "Beginner",
    codeExample: "Student s1 = new Student(101, \"Tuhina\");\nStudent s2 = new Student(101, \"Tuhina\");\n// s1 == s2 is false (different identity), but s1.equals(s2) is true (logical equality)"
  },
  {
    question: "How do builder patterns prevent aliasing of internal collection fields?",
    shortAnswer: "By making unmodifiable or defensive copies inside the build() method before constructing the target object.",
    explanation: "If a builder accepts a List and passes it directly to the entity constructor, the caller retains an alias to that List and can mutate it later. Encapsulated builders wrap collections using 'List.copyOf()' or 'Collections.unmodifiableList()'.",
    hint: "Seal collections before publishing the built entity.",
    level: "Advanced",
    codeExample: "public Project build() {\n    return new Project(this.title, List.copyOf(this.tasks)); // Immutable snapshot\n}"
  },
  {
    question: "What happens when an alias is passed as a key to a HashMap and its internal state is mutated?",
    shortAnswer: "The object's hashCode changes, corrupting the HashMap bucket index and making the key unsearchable (HashMap leak).",
    explanation: "If a mutable object is used as a HashMap key and its fields are modified through an alias, its computed hash code shifts. When calling 'map.get(key)', the HashMap searches the wrong bucket and returns null, trapping the entry in memory forever.",
    hint: "Never use mutable objects with aliases as Map keys.",
    level: "Advanced",
    codeExample: "Map<Student, Grade> map = new HashMap<>();\nStudent s = new Student(\"Swadeep\");\nmap.put(s, gradeA);\ns.setName(\"Swadeep Paul\"); // Hash changed! map.get(s) now returns null!"
  },
  {
    question: "Can an aliased object be locked by multiple threads using the 'synchronized' keyword?",
    shortAnswer: "Yes. Synchronizing on any alias locks the single underlying object's intrinsic monitor (Monitor Lock).",
    explanation: "Because synchronization in Java acquires the monitor associated with the physical object in Heap memory (Mark Word lock bits), synchronizing on 'refA' or 'refB' locks the exact same monitor, ensuring mutually exclusive thread execution.",
    hint: "The lock belongs to the Heap object, not to the reference variable.",
    level: "Intermediate",
    codeExample: "synchronized(leadRef) { ... } // Locks the same intrinsic monitor as synchronized(coLeadRef) { ... }"
  },
  {
    question: "What is 'Reference Escaping' in constructor design?",
    shortAnswer: "When a constructor prematurely passes 'this' to an external variable or listener before the object is fully initialized.",
    explanation: "Publishing 'this' creates an external alias before constructor validation or field assignment finishes, exposing corrupt or default zeroed state to other threads.",
    hint: "Keep 'this' private until constructor execution terminates.",
    level: "Advanced",
    codeExample: "public ProjectAccount() {\n    AccountRegistry.register(this); // BAD: Escaping 'this' creates alias before construction completes!\n    this.budget = 10000.0;\n}"
  },
  {
    question: "How does the 'clone()' method in java.lang.Object behave with regard to aliasing?",
    shortAnswer: "Object.clone() performs a field-by-field shallow copy, meaning all reference fields in the clone remain aliased to the original objects.",
    explanation: "The default clone() implementation copies primitive bit patterns and reference address bits directly. To avoid aliasing internal child objects, the class must explicitly override clone() and instantiate new clones for each mutable reference field.",
    hint: "Default Object.clone() creates shallow aliases.",
    level: "Intermediate",
    codeExample: "protected Object clone() throws CloneNotSupportedException {\n    Student cloned = (Student) super.clone();\n    cloned.address = (Address) this.address.clone(); // Deep clone breaks alias\n    return cloned;\n}"
  },
  {
    question: "Why should API designers return unmodifiable collections instead of raw collection aliases?",
    shortAnswer: "To prevent external consumers from adding, removing, or clearing elements from internal service state.",
    explanation: "Returning 'Collections.unmodifiableList(internalList)' wraps the list in a read-only decorator. Any attempt by external code to call 'add()' or 'remove()' throws an UnsupportedOperationException, defending domain invariants.",
    hint: "Read-only wrappers guard against malicious or accidental mutations.",
    level: "Intermediate",
    codeExample: "public List<Student> getEnrolledStudents() {\n    return Collections.unmodifiableList(this.enrolledStudents);\n}"
  },
  {
    question: "What is the visual difference between a variable and an object in memory diagrams?",
    shortAnswer: "A variable is a labeled slot on the Stack containing a 32/64-bit address; an object is a shaped block on the Heap containing headers and field data.",
    explanation: "Students often conflate the name of the variable with the object. Visualizing the variable as a 'labeled arrow' and the object as a 'target box' clarifies that multiple arrows can point to the same target box.",
    hint: "Arrows on Stack, Boxes on Heap.",
    level: "Beginner",
    codeExample: "// Stack: [leadRef: 0x100] ---> [Heap Object @ 0x100]\n// Stack: [coLeadRef: 0x100] --/"
  },
  {
    question: "What is Sukanta Hui's Pedagogy on Object Aliasing at the Barrackpore Academy?",
    shortAnswer: "Understand that an object has ONE heart (Heap state) and many hands (Stack references). When one hand moves, the heart beats for all.",
    explanation: "At the Barrackpore centre, Sukanta Hui teaches that mastering aliasing is the key to preventing the #1 beginner bug in Java: unexpected side effects from shared mutable state. He advises using immutability by default and defensive copies whenever sharing state across architectural boundaries.",
    hint: "One heart on Heap, many hands on Stack.",
    level: "Beginner",
    codeExample: "// Sukanta Hui's Rule: Default to immutable records or defensive copies when passing state across boundaries."
  }
];

export default topic5_questions;
