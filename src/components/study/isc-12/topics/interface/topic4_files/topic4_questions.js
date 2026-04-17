// topic4_questions.js
const questions = [
  {
    question: "What is the main difference between an abstract class and an interface?",
    shortAnswer: "Abstract classes can have instance variables and constructors; interfaces cannot (until Java 8+ defaults but still no state).",
    explanation: "Abstract classes are for 'is-a' relationships with shared state; interfaces are for 'can-do' capabilities.",
    hint: "Think state vs. contract.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Can an abstract class implement an interface?",
    shortAnswer: "Yes, and it may choose not to implement some methods, leaving them abstract.",
    explanation: "This is common for base classes that provide partial implementation.",
    hint: "Example: `abstract class AbstractList implements List`.",
    level: "intermediate",
    codeExample: "abstract class MyBase implements Runnable { public abstract void run(); }"
  },
  {
    question: "Can an interface extend an abstract class?",
    shortAnswer: "No, an interface can only extend other interfaces.",
    explanation: "Interfaces cannot inherit from classes.",
    hint: "Wrong: `interface B extends A` where A is an abstract class – not allowed.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "When would you choose an abstract class over an interface?",
    shortAnswer: "When you need to share common state (fields), constructors, or non-public methods among closely related classes.",
    explanation: "Also for template method pattern where you want to provide a skeleton implementation.",
    hint: "If you need instance variables, use abstract class.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "When would you choose an interface over an abstract class?",
    shortAnswer: "When you want to define a capability that unrelated classes can implement, or when you need multiple inheritance of type.",
    explanation: "Interfaces are more flexible and decoupled.",
    hint: "Think `Runnable`, `Comparable`, `Serializable`.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "Can an abstract class have a constructor?",
    shortAnswer: "Yes, and it is called when a concrete subclass is instantiated.",
    explanation: "Used to initialize common state.",
    hint: "Interfaces cannot have constructors.",
    level: "basic",
    codeExample: "abstract class A { A() { } }"
  },
  {
    question: "Can an interface have a constructor?",
    shortAnswer: "No, because interfaces cannot be instantiated.",
    explanation: "Constructors are for object initialization – interfaces have no state to initialize.",
    hint: "Only classes (including abstract) have constructors.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "What access modifiers can be used in an abstract class?",
    shortAnswer: "All (private, protected, public, default).",
    explanation: "Abstract classes support full encapsulation.",
    hint: "Interfaces are implicitly public.",
    level: "basic",
    codeExample: "protected abstract void doSomething();"
  },
  {
    question: "What is the default access modifier for methods in an interface?",
    shortAnswer: "public abstract (implicitly).",
    explanation: "Even if you omit, the compiler adds public abstract.",
    hint: "From Java 9, private methods are allowed.",
    level: "basic",
    codeExample: "void method(); // actually public abstract void method();"
  },
  {
    question: "Can an abstract class be final?",
    shortAnswer: "No, abstract and final are contradictory.",
    explanation: "`final` prevents inheritance; `abstract` requires inheritance.",
    hint: "Compilation error.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "Can an interface have instance variables?",
    shortAnswer: "No, only public static final constants.",
    explanation: "Interfaces cannot hold state.",
    hint: "All fields are implicitly public static final.",
    level: "basic",
    codeExample: "int x = 10; // actually public static final int x = 10;"
  },
  {
    question: "Which is faster: abstract class or interface?",
    shortAnswer: "Abstract class method calls are slightly faster (direct virtual table) than interface method calls (itable lookup).",
    explanation: "But the difference is negligible in practice – design clarity is more important.",
    hint: "Micro-optimisation rarely matters.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "Can an abstract class implement multiple interfaces?",
    shortAnswer: "Yes, just like any other class.",
    explanation: "Abstract classes can implement any number of interfaces.",
    hint: "`abstract class MyClass implements A, B, C { }`",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "What is a skeletal implementation pattern?",
    shortAnswer: "An abstract class that implements an interface, providing default implementations for some methods.",
    explanation: "Reduces boilerplate for concrete subclasses. Example: `AbstractList` implements `List`.",
    hint: "Also called 'adapter class' in some contexts.",
    level: "expert",
    codeExample: "public abstract class AbstractList<E> implements List<E> { // provides implementations for most methods }"
  },
  {
    question: "Since Java 8, do we still need abstract classes?",
    shortAnswer: "Yes, because abstract classes can hold state (fields) and constructors, which interfaces cannot.",
    explanation: "Default methods provide behavior but not state.",
    hint: "State is the key differentiator.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "Can an interface extend an abstract class in Java?",
    shortAnswer: "No, interfaces only extend other interfaces.",
    explanation: "This is a language restriction.",
    hint: "Use abstract class to implement interface instead.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "What is the difference in terms of memory layout?",
    shortAnswer: "Abstract classes have a single vtable; interfaces require separate itables, potentially more memory per object.",
    explanation: "But again, not a practical concern for most applications.",
    hint: "JVM optimises this.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "Can you instantiate an abstract class?",
    shortAnswer: "No, abstract classes cannot be instantiated directly.",
    explanation: "They must be subclassed and the subclass must implement all abstract methods.",
    hint: "Use anonymous class if needed.",
    level: "basic",
    codeExample: "new VehicleAbstract() { ... } // anonymous subclass"
  },
  {
    question: "What is the 'abstract' keyword for methods in an interface?",
    shortAnswer: "It's redundant; all methods are abstract by default (except default/static).",
    explanation: "You can write `abstract void foo();` but it's unnecessary.",
    hint: "Some style guides omit it for brevity.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Which one is more flexible for future evolution?",
    shortAnswer: "Interfaces with default methods allow adding new methods without breaking existing code.",
    explanation: "Abstract class evolution may break subclasses if you add a new abstract method.",
    hint: "Default methods were designed exactly for this.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "Can an abstract class have a final method?",
    shortAnswer: "Yes, a final method in an abstract class cannot be overridden by subclasses.",
    explanation: "Useful for template methods that should not be changed.",
    hint: "`final` and `abstract` cannot be combined on the same method.",
    level: "intermediate",
    codeExample: "public final void templateMethod() { ... }"
  },
  {
    question: "What is the diamond problem with multiple inheritance?",
    shortAnswer: "Ambiguity when inheriting from two parents with the same method. Java avoids it for classes but interfaces with default methods have resolution rules.",
    explanation: "Abstract classes avoid it by single inheritance; interfaces require explicit override.",
    hint: "Interfaces can have default method conflicts.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "Can we declare an abstract method as private?",
    shortAnswer: "No, abstract methods cannot be private because they need to be visible to subclasses.",
    explanation: "In an abstract class, abstract methods can be protected or public.",
    hint: "Interfaces methods are implicitly public.",
    level: "intermediate",
    codeExample: "private abstract void foo(); // error"
  },
  {
    question: "Which one to use for a plugin architecture?",
    shortAnswer: "Interfaces are preferred because plugins are often unrelated and should only agree on a contract.",
    explanation: "Abstract classes would force a common base, limiting flexibility.",
    hint: "Think `Plugin` interface with `execute()` method.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "Can an abstract class have a static method?",
    shortAnswer: "Yes, abstract classes can have static methods just like concrete classes.",
    explanation: "Static methods belong to the class, not instances.",
    hint: "They are not inherited in the polymorphic sense.",
    level: "intermediate",
    codeExample: "public static void utility() { }"
  },
  {
    question: "What is the 'default' keyword in interfaces used for?",
    shortAnswer: "To provide a concrete method body in an interface.",
    explanation: "Introduced in Java 8 for backward compatibility.",
    hint: "Not allowed in abstract classes (they already have concrete methods).",
    level: "basic",
    codeExample: "default void log() { System.out.println(\"Log\"); }"
  },
  {
    question: "Can an interface have a method with a body without 'default'?",
    shortAnswer: "Only static methods or default methods. Before Java 8, no.",
    explanation: "Regular interface methods are implicitly abstract.",
    hint: "You cannot have a non-default, non-static method with a body.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Which is more testable: abstract class or interface?",
    shortAnswer: "Interfaces are easier to mock in unit tests because they have no implementation dependencies.",
    explanation: "You can create mock implementations easily (using Mockito or manually).",
    hint: "Prefer interfaces for dependency injection.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "Can an abstract class be used as a type for polymorphism?",
    shortAnswer: "Yes, you can use an abstract class reference to point to a concrete subclass object.",
    explanation: "Same as interfaces, but limited to single inheritance.",
    hint: "`VehicleAbstract v = new CarAbstractImpl(...);`",
    level: "basic",
    codeExample: ""
  },
  {
    question: "What is the recommendation from Effective Java (Joshua Bloch)?",
    shortAnswer: "Prefer interfaces to abstract classes for defining types that multiple implementations can share.",
    explanation: "Interfaces are more flexible and allow mixing.",
    hint: "Use abstract classes only when you need state or non-public members.",
    level: "expert",
    codeExample: ""
  }
];

export default questions;