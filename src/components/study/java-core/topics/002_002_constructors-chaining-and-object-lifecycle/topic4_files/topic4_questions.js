const topic4_questions = [
  {
    question: "When does the Java compiler NOT generate a default constructor for a class?",
    shortAnswer: "The moment ANY explicit constructor (parameterized, no-arg, public, protected, private) is declared in the class source code.",
    explanation: "The compiler assumes that if you wrote a constructor, you want full control over instantiation. It immediately halts default constructor synthesis.",
    hint: "Writing ANY constructor stops default generation.",
    level: "Beginner",
    codeExample: "class Student { Student(int id) {} } // No default constructor generated"
  },
  {
    question: "What exact compilation error occurs if you call 'new ClassName()' on a class with only a parameterized constructor?",
    shortAnswer: "'constructor ClassName in class ClassName cannot be applied to given types; required: ...; found: no arguments'.",
    explanation: "Because no 0-arg constructor exists, javac cannot match the no-argument call.",
    hint: "Cannot be applied to given types; found no arguments.",
    level: "Beginner",
    codeExample: "// new Student(); // Compile error when only Student(int) exists"
  },
  {
    question: "Why does Java revoke the default constructor when a parameterized constructor is defined?",
    shortAnswer: "To protect domain integrity and invariants. If an entity requires mandatory fields, allowing empty creation would create broken objects.",
    explanation: "Forcing parameters ensures mandatory data like IDs and names are never left as uninitialized nulls.",
    hint: "Guarantees domain invariants and prevents uninitialized null states.",
    level: "Intermediate",
    codeExample: "// BankAccount must have accountNumber and holderName"
  },
  {
    question: "How can you restore no-argument instantiation to a class that has a parameterized constructor?",
    shortAnswer: "By explicitly writing a user-defined no-argument constructor: 'public MyClass() { ... }'.",
    explanation: "You must manually declare a 0-arg constructor alongside your parameterized one.",
    hint: "Explicitly declare a user-defined no-arg constructor.",
    level: "Beginner",
    codeExample: "class Student {\n    Student() {} // Manually restored!\n    Student(String name) { this.name = name; }\n}"
  },
  {
    question: "Does defining a private constructor generate a default constructor?",
    shortAnswer: "No. A private constructor is still a constructor, so no default constructor is generated.",
    explanation: "Private constructors are deliberately used in Singletons to prevent outside instantiation.",
    hint: "Private constructor stops default constructor generation.",
    level: "Intermediate",
    codeExample: "class Singleton { private Singleton() {} }"
  },
  {
    question: "What happens in a subclass if the parent class has only a parameterized constructor and no no-arg constructor?",
    shortAnswer: "The subclass will fail to compile unless every subclass constructor explicitly calls 'super(args)' as its first statement.",
    explanation: "The compiler injects 'super()' into child constructors by default. If the parent lacks a no-arg constructor, this implicit call fails.",
    hint: "Child constructors must explicitly invoke parent parameterized constructor.",
    level: "Advanced",
    codeExample: "class Parent { Parent(int x) {} }\nclass Child extends Parent { Child() { super(10); } }"
  },
  {
    question: "Can an abstract class cause subclass compilation failure if it only defines parameterized constructors?",
    shortAnswer: "Yes. All subclasses must explicitly invoke 'super(args)' to satisfy the abstract parent's constructor.",
    explanation: "Even though abstract classes cannot be directly instantiated, their constructor rules apply strictly to subclass chaining.",
    hint: "Subclasses must chain to available parent constructors.",
    level: "Advanced",
    codeExample: "abstract class Shape { Shape(String color) {} }"
  },
  {
    question: "Does declaring a static method prevent default constructor generation?",
    shortAnswer: "No. Static methods are methods, not constructors. The compiler will still generate a default constructor.",
    explanation: "Only constructors stop default constructor generation; methods have zero effect on constructor synthesis.",
    hint: "Methods do not affect constructor generation.",
    level: "Beginner",
    codeExample: "class Utils { static void run() {} } // Still gets default constructor Utils()"
  },
  {
    question: "Does declaring an instance initialization block (IIB) prevent default constructor generation?",
    shortAnswer: "No. If no constructors are written, the compiler still generates the default constructor and inlines the IIB into it.",
    explanation: "IIB blocks are inlined into all constructors; they do not replace constructor declarations.",
    hint: "IIBs do not prevent default constructor synthesis.",
    level: "Intermediate",
    codeExample: "class Demo { { System.out.println(\"IIB\"); } } // Still gets default constructor"
  },
  {
    question: "How does framework serialization (like JSON deserialization) behave when the default constructor is missing?",
    shortAnswer: "Libraries like Jackson or Gson fail with an 'InstantiationException' or require custom creators / deserializers.",
    explanation: "JSON mappers instantiate empty objects via reflection before populating fields, necessitating a no-arg constructor.",
    hint: "Jackson/Gson fail without a no-arg constructor or creator annotations.",
    level: "Advanced",
    codeExample: "// Jackson requires @JsonCreator or default constructor"
  },
  {
    question: "What is the key lesson for Sukanta Hui's students in Barrackpore regarding no-arg omission?",
    shortAnswer: "If you add a constructor for Swadeep or Abhronila, the compiler deletes its free no-arg constructor. Always write a no-arg constructor if you or frameworks need empty creation!",
    explanation: "Remember: 'You write one, you lose the default.'",
    hint: "You write one constructor, you lose the default.",
    level: "Beginner",
    codeExample: "// Always supply no-arg constructor for JavaBeans / JPA entities"
  },
  {
    question: "Can a constructor with varargs ('public MyClass(String... args)') be invoked with zero arguments?",
    shortAnswer: "Yes! A varargs constructor can accept 0 arguments, fulfilling the need for a no-arg call while remaining parameterized.",
    explanation: "'new MyClass()' matches 'MyClass(String... args)' with an empty array.",
    hint: "Varargs constructor matches 0 arguments at call site.",
    level: "Intermediate",
    codeExample: "class Demo { Demo(String... args) {} }\nDemo d = new Demo(); // Legal!"
  },
  {
    question: "Does the compiler generate a default constructor for nested static inner classes?",
    shortAnswer: "Yes, if no constructors are declared in the static inner class, javac generates a default no-arg constructor for it.",
    explanation: "Static inner classes follow the exact same constructor synthesis rules as top-level classes.",
    hint: "Static nested classes follow standard constructor synthesis rules.",
    level: "Intermediate",
    codeExample: "class Outer { static class Inner {} } // Inner gets default constructor"
  },
  {
    question: "Does the compiler generate a default constructor for non-static inner classes?",
    shortAnswer: "Yes, but it invisibly accepts the enclosing outer instance reference as its first parameter ('Inner(Outer this$0)').",
    explanation: "Non-static inner classes require a reference to their outer enclosing instance to access outer state.",
    hint: "Compiler injects outer reference into non-static inner class constructor.",
    level: "Expert",
    codeExample: "class Outer { class Inner {} } // Bytecode constructor: Inner(Outer)"
  },
  {
    question: "Can a subclass have a no-arg constructor if the parent class has NO no-arg constructor?",
    shortAnswer: "Yes, as long as the subclass no-arg constructor explicitly calls 'super(arg1, arg2)' with default values.",
    explanation: "The child no-arg constructor can provide hardcoded defaults to the parent's parameterized constructor.",
    hint: "Child no-arg can call parent parameterized constructor via super(values).",
    level: "Intermediate",
    codeExample: "class Parent { Parent(int id) {} }\nclass Child extends Parent { Child() { super(100); } }"
  },
  {
    question: "What is the compiler error if both Parent and Child omit explicit constructors, but Parent defines a parameterized one?",
    shortAnswer: "Child fails to compile because Child's compiler-generated default constructor tries to call 'super()', which doesn't exist in Parent.",
    explanation: "Child's generated constructor contains 'super();'. Since Parent only has 'Parent(int)', compilation fails in Child.",
    hint: "Child's synthesized super() cannot find parent no-arg constructor.",
    level: "Advanced",
    codeExample: "class Parent { Parent(int x) {} }\nclass Child extends Parent {} // COMPILE ERROR IN CHILD!"
  },
  {
    question: "Does creating a constructor in a parent class revoke the default constructor of a child class?",
    shortAnswer: "No, but it breaks the child class's default constructor if the parent removes its no-arg constructor.",
    explanation: "Child still gets a synthesized constructor, but that constructor attempts 'super()' which fails.",
    hint: "Breaks child's default constructor invocation of super().",
    level: "Advanced",
    codeExample: "// Implicit super() in child default constructor fails"
  },
  {
    question: "Why do builder patterns often use private constructors?",
    shortAnswer: "To prevent clients from calling 'new Entity()' directly, forcing creation through the validated Builder.",
    explanation: "The private constructor stops default generation and restricts object creation to the Builder's 'build()' method.",
    hint: "Forces instantiation through Builder with validation.",
    level: "Intermediate",
    codeExample: "public class User { private User(Builder b) {} }"
  },
  {
    question: "Can an annotation type have a constructor?",
    shortAnswer: "No. Annotations in Java cannot declare constructors.",
    explanation: "Annotations are special interface types defined with '@interface' and have no constructors.",
    hint: "Annotations cannot have constructors.",
    level: "Intermediate",
    codeExample: "@interface MyAnnotation { String value(); }"
  },
  {
    question: "How does Lombok's '@NoArgsConstructor' interact with the compiler omission rule?",
    shortAnswer: "Lombok generates an explicit no-argument constructor in bytecode, restoring 0-arg instantiation.",
    explanation: "Lombok's annotation processor injects the no-arg constructor into the AST during compilation.",
    hint: "Lombok generates explicit no-arg constructor.",
    level: "Intermediate",
    codeExample: "@NoArgsConstructor @AllArgsConstructor class Student {}"
  },
  {
    question: "What happens if you define a constructor that matches the class name but has a return type 'int'?",
    shortAnswer: "It is treated as a method returning int; the compiler still generates the default constructor!",
    explanation: "Because it has a return type, it is a method, not a constructor. Zero constructors were written, so default constructor is generated!",
    hint: "It's a method! Default constructor is still generated.",
    level: "Advanced",
    codeExample: "class Trainee { int Trainee() { return 1; } } // Trainee() default constructor STILL GENERATED!"
  },
  {
    question: "Can an interface default method act as a constructor for an implementing class?",
    shortAnswer: "No. Interface default methods are instance methods for behavior; they never participate in object construction.",
    explanation: "Interface default methods are inherited behaviors, not constructors.",
    hint: "Default methods are behavior, not constructors.",
    level: "Beginner",
    codeExample: "interface Greeter { default void greet() {} }"
  },
  {
    question: "If a class has 3 overloaded parameterized constructors and no no-arg constructor, how many constructors are in the class?",
    shortAnswer: "Exactly 3. The compiler generates zero additional constructors.",
    explanation: "Since constructors were declared, compiler synthesis is inactive.",
    hint: "Only the 3 explicitly declared constructors exist.",
    level: "Beginner",
    codeExample: "class A { A(int x) {} A(String s) {} A(double d) {} } // Total: 3"
  },
  {
    question: "Why is constructor omission considered a feature rather than a bug in Java?",
    shortAnswer: "It prevents accidental uninitialized object creation when developers design domain models requiring mandatory fields.",
    explanation: "If you design a 'TaxInvoice' that requires a 'customerGSTIN', Java prevents anyone from accidentally creating a blank invoice.",
    hint: "Enforces mandatory domain data integrity.",
    level: "Intermediate",
    codeExample: "new TaxInvoice(\"GSTIN123\"); // Guaranteed valid"
  },
  {
    question: "Can a constructor have the same parameter list as an existing method?",
    shortAnswer: "Yes. Constructors and methods live in different namespaces and are invoked via different opcodes.",
    explanation: "A constructor 'Student(String)' and a method 'void Student(String)' can coexist in bytecode, though methods named after classes are discouraged.",
    hint: "Constructors and methods have separate bytecode namespaces.",
    level: "Advanced",
    codeExample: "Student(String s) {} void Student(String s) {}"
  },
  {
    question: "How does the 'javap' tool display a class where the default constructor was omitted?",
    shortAnswer: "'javap ClassName' lists only the declared parameterized constructors and shows no 'public ClassName();'.",
    explanation: "Inspecting bytecode with 'javap' confirms that '<init>()V' is completely absent.",
    hint: "javap confirms absence of <init>()V.",
    level: "Advanced",
    codeExample: "// javap output: public EnrolledStudent(int, java.lang.String, java.lang.String);"
  },
  {
    question: "What is the best practice when refactoring legacy classes that receive new parameterized constructors?",
    shortAnswer: "Always add an explicit no-arg constructor if existing code or reflection frameworks rely on 0-arg instantiation.",
    explanation: "Adding a parameterized constructor can break existing callers if you don't preserve the no-arg constructor.",
    hint: "Preserve backward compatibility by adding explicit no-arg constructor.",
    level: "Intermediate",
    codeExample: "public Student() {} // Preserve legacy callers"
  },
  {
    question: "Does reflection allow instantiating a class without calling any constructor?",
    shortAnswer: "Yes, via 'sun.misc.Unsafe.allocateInstance()' or serialization, but this bypasses all constructor safety and is restricted in modern Java.",
    explanation: "Unsafe allocates raw memory without running '<init>', which can leave fields in invalid states.",
    hint: "Unsafe.allocateInstance allocates without constructor invocation.",
    level: "Expert",
    codeExample: "// Unsafe.allocateInstance(Class<?>) bypasses constructors"
  },
  {
    question: "Can a constructor parameter have the same name as an instance variable?",
    shortAnswer: "Yes. Shadowing is resolved using the 'this' keyword (e.g. 'this.name = name;').",
    explanation: "'this.name' refers to the instance field, while 'name' refers to the parameter.",
    hint: "Use 'this.' to differentiate instance field from parameter.",
    level: "Beginner",
    codeExample: "public Student(String name) { this.name = name; }"
  },
  {
    question: "Summarize Topic 4 in one core architectural principle.",
    shortAnswer: "Java gives you a default constructor only when you write zero constructors; declaring any constructor immediately revokes compiler generation.",
    explanation: "This principle guarantees developer control over object initialization contracts.",
    hint: "Default constructor exists if and only if zero constructors are declared.",
    level: "Beginner",
    codeExample: "// Zero constructors = Default exists; One constructor = Default revoked"
  }
];

export default topic4_questions;