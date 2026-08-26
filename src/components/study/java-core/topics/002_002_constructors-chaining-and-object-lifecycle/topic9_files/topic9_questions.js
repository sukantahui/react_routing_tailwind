const topic9_questions = [
  {
    question: "What is a Copy Constructor in Java?",
    shortAnswer: "A constructor that creates a new object as an exact duplicate of an existing object of the same class by copying its field values.",
    explanation: "A copy constructor accepts a single parameter of its own class type: 'public Student(Student source) { ... }'.",
    hint: "Constructor taking an instance of its own class to copy state.",
    level: "Beginner",
    codeExample: "public Student(Student other) { this.id = other.id; this.name = other.name; }"
  },
  {
    question: "Why does Java favor Copy Constructors over 'Object.clone()' and 'Cloneable'?",
    shortAnswer: "Copy constructors do not require type casting, don't throw CloneNotSupportedException, don't rely on fragile C++ memory hacking, and work cleanly with 'final' fields.",
    explanation: "Joshua Bloch famously stated that Cloneable is broken in Java. Copy constructors provide type-safe, explicit, and extensible object duplication.",
    hint: "Type-safe, no exception handling, works with final fields.",
    level: "Intermediate",
    codeExample: "// Safe & clean: Student s2 = new Student(s1);"
  },
  {
    question: "What is the difference between a Shallow Copy and a Deep Copy in a copy constructor?",
    shortAnswer: "A shallow copy duplicates only reference pointers (sharing nested objects on the Heap). A deep copy duplicates nested reference objects creating independent copies in memory.",
    explanation: "With shallow copy, modifying a nested object in the clone alters the original. Deep copy provides complete object graph isolation.",
    hint: "Sharing references vs duplicating nested objects.",
    level: "Intermediate",
    codeExample: "// Shallow: this.addr = source.addr;\n// Deep: this.addr = new Address(source.addr);"
  },
  {
    question: "How do you implement a Deep Copy in a Copy Constructor for mutable fields like List or Date?",
    shortAnswer: "Instantiate fresh collections or call the copy constructor of the nested mutable object (e.g. 'new ArrayList<>(source.list)').",
    explanation: "Creating a new collection ensures mutations in the clone do not bleed into the original object.",
    hint: "Create fresh new instances of nested mutable collections/objects.",
    level: "Intermediate",
    codeExample: "this.courses = new ArrayList<>(source.courses);\nthis.address = new Address(source.address);"
  },
  {
    question: "What happens if 'source == null' is passed to a Copy Constructor?",
    shortAnswer: "Accessing 'source.field' throws a NullPointerException unless guarded with 'Objects.requireNonNull(source)'.",
    explanation: "Always validate that the source object is non-null at the start of a copy constructor.",
    hint: "Validate source != null with Objects.requireNonNull.",
    level: "Beginner",
    codeExample: "if (source == null) throw new IllegalArgumentException(\"Source required\");"
  },
  {
    question: "Does the Java compiler automatically generate a copy constructor if none is written?",
    shortAnswer: "No! Unlike C++, Java NEVER generates an automatic copy constructor. Developers must write it manually.",
    explanation: "Java only generates a 0-argument default constructor, never copy constructors.",
    hint: "Compiler never generates copy constructors in Java.",
    level: "Beginner",
    codeExample: "// Must be explicitly coded by the developer"
  },
  {
    question: "Can a copy constructor be polymorphic (e.g. 'Student(Person source)')?",
    shortAnswer: "Yes! A subclass copy constructor can accept a parent class instance to initialize inherited parent fields, or accept interface contracts.",
    explanation: "This is known as a conversion constructor.",
    hint: "Conversion constructor accepting supertype or interface.",
    level: "Advanced",
    codeExample: "public Student(Person p) { super(p); }"
  },
  {
    question: "Can a Copy Constructor be chained to an existing parameterized constructor via 'this(...)'?",
    shortAnswer: "Yes! 'this(source.id, source.name, source.hub)' can be used for flat objects with primitive/immutable fields.",
    explanation: "If no deep defensive copying of nested mutables is needed, chaining simplifies code.",
    hint: "Use this(source.fields...) for flat objects.",
    level: "Beginner",
    codeExample: "public Point(Point p) { this(p.x, p.y); }"
  },
  {
    question: "What is the classroom story by Sukanta Hui for copy constructors in Barrackpore?",
    shortAnswer: "Trainee Swadeep's Exam Admit Card Duplicate: When issuing a duplicate card for Swadeep, we deep clone his details so changing his exam center on the duplicate does NOT corrupt his permanent admission master record!",
    explanation: "Deep cloning guarantees that student mutations remain completely isolated.",
    hint: "Admit card duplicate with isolated exam center updates.",
    level: "Beginner",
    codeExample: "StudentProfile clone = new StudentProfile(original);"
  },
  {
    question: "Are 'String' fields required to be deep cloned in a copy constructor?",
    shortAnswer: "No! Strings are immutable in Java; copying the reference pointer ('this.name = source.name') is 100% thread-safe and memory efficient.",
    explanation: "Because Strings cannot be mutated, sharing String references on the Heap is completely safe.",
    hint: "Immutable types like String need no deep cloning.",
    level: "Beginner",
    codeExample: "this.name = source.name; // Perfectly safe for immutable String"
  },
  {
    question: "How do you deep-copy an array in a copy constructor?",
    shortAnswer: "Using 'Arrays.copyOf(source.arr, source.arr.length)' or 'source.arr.clone()'.",
    explanation: "For arrays of objects, you must also copy each individual element if elements are mutable.",
    hint: "Use Arrays.copyOf() or element-by-element cloning.",
    level: "Intermediate",
    codeExample: "this.marks = Arrays.copyOf(source.marks, source.marks.length);"
  },
  {
    question: "Can a Copy Constructor be declared 'private'?",
    shortAnswer: "Yes. Private copy constructors are used inside factory methods or Prototype pattern implementations.",
    explanation: "A private copy constructor can be called by 'public Student duplicate()' method.",
    hint: "Private copy constructor for internal factory/prototype methods.",
    level: "Intermediate",
    codeExample: "private Student(Student s) {} public Student copy() { return new Student(this); }"
  },
  {
    question: "How does the Prototype Design Pattern use Copy Constructors?",
    shortAnswer: "Prototype classes implement a 'clone()' or 'copy()' method that simply invokes their internal copy constructor.",
    explanation: "Copy constructors provide the clean implementation engine for the Prototype GoF pattern.",
    hint: "Engine for Prototype pattern.",
    level: "Advanced",
    codeExample: "public Prototype clone() { return new ConcretePrototype(this); }"
  },
  {
    question: "What is a 'Copy Factory' and how does it compare to a Copy Constructor?",
    shortAnswer: "A static factory method (e.g. 'Student.copyOf(existing)') that returns a new duplicate instance.",
    explanation: "Like copy constructors, copy factories avoid Cloneable and can return subtypes.",
    hint: "Static factory method returning duplicate instance.",
    level: "Intermediate",
    codeExample: "public static Student newInstance(Student source) { return new Student(source); }"
  },
  {
    question: "Can circular object references cause infinite loops in a Copy Constructor?",
    shortAnswer: "Yes! If Object A contains Object B and Object B references Object A, naive deep copying causes StackOverflowError.",
    explanation: "Circular graphs require an identity hash map or tracking registry during deep cloning.",
    hint: "Circular references cause StackOverflowError without identity tracking.",
    level: "Expert",
    codeExample: "// A -> B -> A requires identity map during deep clone"
  },
  {
    question: "How does a copy constructor handle 'final' fields?",
    shortAnswer: "Flawlessly! Final fields can be assigned directly inside the copy constructor body, unlike 'Object.clone()' which struggles with final fields.",
    explanation: "Copy constructors respect standard Java constructor rules for final field assignment.",
    hint: "Assigns final fields cleanly without reflection hacks.",
    level: "Intermediate",
    codeExample: "public Student(Student s) { this.id = s.id; /* id is final */ }"
  },
  {
    question: "Can a copy constructor be overloaded for different subtypes?",
    shortAnswer: "Yes! A class can declare 'Student(Student s)' and 'Student(GraduateStudent gs)' with specialized copying logic.",
    explanation: "Overloaded copy constructors enable specialized subtype cloning.",
    hint: "Overloaded for different source types.",
    level: "Intermediate",
    codeExample: "Student(Student s) {}\nStudent(GraduateStudent gs) {}"
  },
  {
    question: "What is the performance overhead of deep cloning in a copy constructor?",
    shortAnswer: "It allocates fresh memory on the Heap for every duplicated object, increasing GC pressure for massive object graphs.",
    explanation: "Deep cloning should only be used when state isolation is strictly required.",
    hint: "Allocates fresh memory for all nested objects.",
    level: "Advanced",
    codeExample: "// Duplicates memory footprint for isolated safety"
  },
  {
    question: "Can you pass an uninitialized reference to a copy constructor?",
    shortAnswer: "Passing null throws an exception; passing a reference to an object currently under construction can expose uninitialized fields.",
    explanation: "Always ensure the source object has completed construction before cloning.",
    hint: "Ensure source has completed construction.",
    level: "Intermediate",
    codeExample: "new Student(s); // 's' must be fully initialized"
  },
  {
    question: "Summarize the primary rule of Copy Constructors in Java.",
    shortAnswer: "A Copy Constructor provides an explicit, type-safe, and exception-free mechanism to duplicate objects with complete deep state isolation.",
    explanation: "It is the gold standard for object cloning in professional Java development.",
    hint: "Explicit, type-safe, deep state duplication.",
    level: "Beginner",
    codeExample: "// Gold standard for object duplication in Java"
  }
];

export default topic9_questions;