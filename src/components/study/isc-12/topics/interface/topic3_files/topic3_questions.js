// topic3_questions.js
const questions = [
  {
    question: "What is a default method in an interface?",
    shortAnswer: "A method with a body defined using the 'default' keyword.",
    explanation: "Introduced in Java 8 to allow adding methods to interfaces without breaking existing implementations.",
    hint: "It's like a concrete method inside an interface.",
    level: "basic",
    codeExample: "default void print() { System.out.println(\"Hello\"); }"
  },
  {
    question: "Can a class override a default method?",
    shortAnswer: "Yes, the implementing class can provide its own implementation.",
    explanation: "If not overridden, the class inherits the default implementation.",
    hint: "Override just like a regular method.",
    level: "basic",
    codeExample: "@Override public void print() { System.out.println(\"Overridden\"); }"
  },
  {
    question: "What is a static method in an interface?",
    shortAnswer: "A method that belongs to the interface itself, not to instances.",
    explanation: "Called using InterfaceName.method(). Not inherited by implementing classes.",
    hint: "Similar to static methods in classes.",
    level: "basic",
    codeExample: "static void utility() { ... }"
  },
  {
    question: "Why were default methods introduced?",
    shortAnswer: "To enable backward compatibility when evolving interfaces.",
    explanation: "Before Java 8, adding a method to an interface broke all implementing classes. Default methods solved this.",
    hint: "Think of Collection.stream() – added in Java 8 without breaking old code.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "Can an interface have both default and abstract methods?",
    shortAnswer: "Yes, an interface can have any number of default and abstract methods.",
    explanation: "Abstract methods must be implemented by the class; default methods may be overridden.",
    hint: "A functional interface can have many default methods but only one abstract method.",
    level: "intermediate",
    codeExample: "interface MyInterface { void abs(); default void def() { } }"
  },
  {
    question: "What happens if a class implements two interfaces with the same default method signature?",
    shortAnswer: "Compilation error – the class must override the method to resolve the conflict.",
    explanation: "The class can optionally call one of the default implementations using InterfaceName.super.method().",
    hint: "Diamond problem for default methods.",
    level: "expert",
    codeExample: "public void method() { InterfaceA.super.method(); }"
  },
  {
    question: "Can a default method be declared static?",
    shortAnswer: "No, a method cannot be both default and static.",
    explanation: "They are mutually exclusive keywords.",
    hint: "Default methods are instance methods; static methods belong to the interface.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "Can a default method override a method from java.lang.Object?",
    shortAnswer: "No, it's a compile-time error.",
    explanation: "Interfaces cannot provide default implementations for equals(), hashCode(), or toString().",
    hint: "Those are always inherited from Object.",
    level: "expert",
    codeExample: "default String toString() { ... } // error"
  },
  {
    question: "How do you call a default method from another default method?",
    shortAnswer: "Directly by name, or using this.methodName().",
    explanation: "Since default methods are instance methods, they can call each other.",
    hint: "They can also call abstract methods.",
    level: "intermediate",
    codeExample: "default void a() { b(); } default void b() { }"
  },
  {
    question: "Can a static method in an interface be called on an instance?",
    shortAnswer: "No, static methods must be called using the interface name.",
    explanation: "Instance.staticMethod() is allowed for classes but not for interfaces (bad practice anyway).",
    hint: "Always use InterfaceName.method().",
    level: "basic",
    codeExample: "VehicleWithDefault.getMaxSpeed(); // correct"
  },
  {
    question: "Are default methods inherited by subinterfaces?",
    shortAnswer: "Yes, a subinterface inherits default methods from its parent interfaces.",
    explanation: "A subinterface can also override a default method by redeclaring it as abstract or providing a new default.",
    hint: "Inheritance works the same as for classes.",
    level: "intermediate",
    codeExample: "interface B extends A { } // B inherits A's default methods"
  },
  {
    question: "Can a class inherit a default method from an interface and also from a superclass?",
    shortAnswer: "The superclass method wins (class hierarchy takes precedence).",
    explanation: "If a class and its superclass both provide a method, the superclass's implementation is used unless overridden.",
    hint: "Rule: class wins over interface default.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What is the purpose of static methods in interfaces?",
    shortAnswer: "To provide utility or factory methods that are logically related to the interface.",
    explanation: "Examples: Comparator.naturalOrder(), List.of(), Stream.of().",
    hint: "They keep helper methods close to the interface they serve.",
    level: "intermediate",
    codeExample: "static List<Integer> emptyList() { return new ArrayList<>(); }"
  },
  {
    question: "Can an interface have a private default method?",
    shortAnswer: "Yes, from Java 9 onward, interfaces can have private methods (static or instance).",
    explanation: "Used to share code between default methods without exposing implementation details.",
    hint: "Improves code reuse inside the interface.",
    level: "expert",
    codeExample: "private void helper() { }"
  },
  {
    question: "What is the difference between a default method and an abstract method?",
    shortAnswer: "Default methods have a body; abstract methods do not.",
    explanation: "Abstract methods must be implemented by the class; default methods may be overridden but are not mandatory.",
    hint: "Default methods provide a fallback implementation.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Can a default method be declared final?",
    shortAnswer: "No, default methods cannot be final because they are meant to be overridable.",
    explanation: "The combination 'default final' is not allowed.",
    hint: "If you don't want overriding, don't use default – use abstract class.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "How does the Collections Framework use default methods?",
    shortAnswer: "Methods like forEach(), stream(), removeIf(), sort() were added as default methods.",
    explanation: "All existing implementations (ArrayList, HashSet, etc.) automatically gained these methods.",
    hint: "Check java.util.Collection interface.",
    level: "intermediate",
    codeExample: "default void forEach(Consumer<? super T> action) { ... }"
  },
  {
    question: "Can a default method call an abstract method?",
    shortAnswer: "Yes, default methods can call other abstract methods defined in the interface.",
    explanation: "This allows template method patterns within interfaces.",
    hint: "The abstract method will be implemented by the concrete class.",
    level: "intermediate",
    codeExample: "default void execute() { start(); process(); stop(); } // start, process, stop are abstract"
  },
  {
    question: "What is the 'class wins' rule?",
    shortAnswer: "If a superclass provides a concrete method, that method takes precedence over a default method from an interface.",
    explanation: "Prevents ambiguity when a class inherits the same method from both a class and an interface.",
    hint: "Class implementation > interface default.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "Can an interface have a main method?",
    shortAnswer: "Yes, as a static method, you can define public static void main(String[] args) in an interface.",
    explanation: "Since Java 8, static methods in interfaces are allowed, so you can run an interface as a standalone program.",
    hint: "Unusual but possible.",
    level: "expert",
    codeExample: "public interface Test { static void main(String[] args) { System.out.println(\"Hello\"); } }"
  },
  {
    question: "What is the difference between a default method and a regular method in an abstract class?",
    shortAnswer: "Default methods cannot access instance variables (state) unless the interface provides getters/setters.",
    explanation: "Abstract classes can have fields; interfaces cannot (only constants).",
    hint: "State vs. behavior.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "Can a default method be synchronized?",
    shortAnswer: "Yes, the 'synchronized' modifier is allowed on default methods.",
    explanation: "But it's rarely useful because synchronization on 'this' may have unintended consequences.",
    hint: "Use with caution.",
    level: "expert",
    codeExample: "default synchronized void safeMethod() { }"
  },
  {
    question: "How do you call a default method from a class that overrides it?",
    shortAnswer: "Using InterfaceName.super.methodName().",
    explanation: "This syntax is specific to default methods.",
    hint: "It's like calling super.super in some other languages.",
    level: "expert",
    codeExample: "VehicleWithDefault.super.honk();"
  },
  {
    question: "Can a default method be annotated with @Override?",
    shortAnswer: "Yes, but it's optional. The compiler will treat it as an override of a superinterface method.",
    explanation: "It's good practice to use @Override when overriding a default method in a class.",
    hint: "Helps catch typos.",
    level: "intermediate",
    codeExample: "@Override default void honk() { ... } // in an interface extending another"
  },
  {
    question: "What is the accessibility of a default method?",
    shortAnswer: "It is public by default (like all interface methods).",
    explanation: "You cannot reduce the visibility (e.g., protected or private) in the implementing class.",
    hint: "Always public.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Can a static method in an interface be hidden by a subclass?",
    shortAnswer: "No, static methods are not inherited, so there's no hiding.",
    explanation: "A class can define a static method with the same name, but it's independent.",
    hint: "Calling InterfaceName.method() always calls the interface's version.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "Why can't default methods access instance variables?",
    shortAnswer: "Because interfaces cannot have instance variables (fields).",
    explanation: "Default methods can only call other interface methods (abstract or default) and access constants.",
    hint: "State must be provided by the implementing class.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "What is the 'forEach' default method in Iterable?",
    shortAnswer: "A default method that iterates over elements and applies an action.",
    explanation: "It simplified iteration before enhanced for-loop existed? Actually, it's for functional-style iteration.",
    hint: "Used with lambda expressions: list.forEach(item -> System.out.println(item));",
    level: "intermediate",
    codeExample: "default void forEach(Consumer<? super T> action) { for (T t : this) action.accept(t); }"
  },
  {
    question: "Can an interface have a default method that throws an exception?",
    shortAnswer: "Yes, default methods can declare exceptions using 'throws'.",
    explanation: "Implementing methods may override and change the exception list (but cannot add broader checked exceptions).",
    hint: "Same rules as overriding.",
    level: "intermediate",
    codeExample: "default void process() throws IOException { ... }"
  },
  {
    question: "What are the design implications of default methods?",
    shortAnswer: "They allow interfaces to evolve, but overuse can lead to 'fat interfaces' and hidden complexity.",
    explanation: "Prefer abstract classes when you need state; use default methods only for backward compatibility or simple convenience.",
    hint: "Don't treat interfaces as replacement for abstract classes.",
    level: "expert",
    codeExample: ""
  }
];

export default questions;