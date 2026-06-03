// topic0_questions.js
const questions = [
  {
    question: "What is an interface in Java?",
    shortAnswer: "An interface is a reference type that defines a contract of abstract methods.",
    explanation: "It specifies what a class must do, not how. Classes implement interfaces to gain that behavior.",
    hint: "Think of a USB specification – any device that follows it can connect.",
    level: "basic",
    codeExample: "interface Drawable { void draw(); }"
  },
  {
    question: "Can an interface contain instance variables?",
    shortAnswer: "No, all variables in an interface are implicitly public, static, and final (constants).",
    explanation: "Interfaces cannot have instance fields because they cannot hold state.",
    hint: "They are purely a contract, not an implementation.",
    level: "basic",
    codeExample: "interface Config { int VERSION = 1; }"
  },
  {
    question: "How does a class implement multiple interfaces?",
    shortAnswer: "By using the 'implements' keyword followed by comma-separated interface names.",
    explanation: "Java supports multiple inheritance of type (interfaces) but not state (classes).",
    hint: "class C implements A, B { }",
    level: "intermediate",
    codeExample: "class Student implements Comparable<Student>, Serializable { ... }"
  },
  {
    question: "What is a functional interface?",
    shortAnswer: "An interface with exactly one abstract method (SAM).",
    explanation: "Used as the target type for lambda expressions and method references.",
    hint: "@FunctionalInterface annotation is optional but recommended.",
    level: "intermediate",
    codeExample: "@FunctionalInterface interface Calculator { int compute(int a, int b); }"
  },
  {
    question: "Can an interface extend another interface?",
    shortAnswer: "Yes, using the 'extends' keyword. An interface can extend multiple interfaces.",
    explanation: "This allows building interface hierarchies.",
    hint: "interface B extends A { }",
    level: "basic",
    codeExample: "interface List extends Collection { }"
  },
  {
    question: "What is the difference between abstract class and interface before Java 8?",
    shortAnswer: "Abstract class can have state (fields) and concrete methods; interface had only abstract methods and constants.",
    explanation: "Since Java 8, interfaces can have default and static methods, reducing the gap.",
    hint: "Multiple inheritance of implementation is still not allowed for classes.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "What are default methods in interfaces?",
    shortAnswer: "Methods with a body defined using 'default' keyword in an interface.",
    explanation: "They allow adding new methods to interfaces without breaking existing implementations.",
    hint: "Used for backward compatibility (e.g., Collection.stream()).",
    level: "intermediate",
    codeExample: "default void log(String msg) { System.out.println(msg); }"
  },
  {
    question: "How does Java resolve default method conflicts?",
    shortAnswer: "The implementing class must override the conflicting method, or use InterfaceName.super.method().",
    explanation: "If two interfaces provide default methods with same signature, the compiler forces explicit resolution.",
    hint: "Rule: class wins over interface, and explicit > implicit.",
    level: "expert",
    codeExample: "public class MyClass implements A, B { public void method() { A.super.method(); } }"
  },
  {
    question: "Can an interface have a constructor?",
    shortAnswer: "No, interfaces cannot be instantiated, so they have no constructors.",
    explanation: "Constructors are for initializing object state – interfaces have no state.",
    hint: "They are not classes.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "What is marker interface?",
    shortAnswer: "An interface with no methods (empty).",
    explanation: "Used to convey metadata to the JVM or compiler (e.g., Serializable, Cloneable).",
    hint: "It marks a class as having a special capability.",
    level: "intermediate",
    codeExample: "public interface Serializable { }"
  },
  {
    question: "Can we declare an interface as final?",
    shortAnswer: "No, interfaces are implicitly abstract; final and abstract are contradictory.",
    explanation: "An interface must be implemented, so it cannot be final.",
    hint: "Trying 'final interface I {}' gives a compiler error.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "What are static methods in interfaces?",
    shortAnswer: "Methods defined with 'static' keyword in an interface, they belong to the interface itself.",
    explanation: "They cannot be inherited by implementing classes, and are called using InterfaceName.method().",
    hint: "Useful for utility methods (e.g., Comparator.naturalOrder()).",
    level: "intermediate",
    codeExample: "static void printHelp() { System.out.println(\"Help\"); }"
  },
  {
    question: "Can an interface implement another interface?",
    shortAnswer: "No, interfaces do not 'implement' – they 'extend' other interfaces.",
    explanation: "Implementation is for classes.",
    hint: "interface B extends A { }",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Is it possible to have a private method in an interface?",
    shortAnswer: "Yes, from Java 9 onward, interfaces can have private methods (static or non-static).",
    explanation: "Used to share common code between default methods without exposing it.",
    hint: "Improves code reuse inside the interface.",
    level: "expert",
    codeExample: "private void helper() { }"
  },
  {
    question: "What is the purpose of an interface in dependency injection?",
    shortAnswer: "Interfaces decouple the contract from implementation, allowing easy swapping of dependencies.",
    explanation: "Clients depend on interfaces, not concrete classes – that's the Dependency Inversion Principle.",
    hint: "Spring, Guice heavily use interfaces.",
    level: "expert",
    codeExample: "interface PaymentService { void pay(); } class CreditCardPayment implements PaymentService { }"
  },
  {
    question: "Can an interface extend a class?",
    shortAnswer: "No, an interface can only extend other interfaces, not classes.",
    explanation: "Classes contain implementation, which an interface cannot inherit.",
    hint: "Java does not support multiple inheritance of classes for interfaces either.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "What happens if a class implements two interfaces having a default method with the same signature?",
    shortAnswer: "The class must override the method or a compilation error occurs.",
    explanation: "The compiler cannot decide which default to use.",
    hint: "Use super keyword to call a specific default if needed.",
    level: "intermediate",
    codeExample: "public void method() { InterfaceA.super.method(); }"
  },
  {
    question: "Why are interface variables implicitly public static final?",
    shortAnswer: "Because interfaces cannot have instance state, and constants are the only useful kind of variable.",
    explanation: "Public – to be accessible by implementers. Static – belongs to interface. Final – constant.",
    hint: "They are essentially compile‑time constants.",
    level: "intermediate",
    codeExample: "int MAX = 10; // actually public static final int MAX = 10;"
  },
  {
    question: "Can we have a class implementing an interface and extending another class at the same time?",
    shortAnswer: "Yes, Java allows single class inheritance and multiple interface implementation.",
    explanation: "Syntax: class Child extends Parent implements Interface1, Interface2",
    hint: "The extends clause must come before implements.",
    level: "basic",
    codeExample: "class Student extends Person implements Comparable<Student> { }"
  },
  {
    question: "What is the meaning of 'interface segregation principle'?",
    shortAnswer: "It states that no client should be forced to depend on methods it does not use.",
    explanation: "Favor many small, focused interfaces over one fat interface.",
    hint: "Split large interfaces into smaller role‑specific ones.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "Can an interface throw exceptions?",
    shortAnswer: "Yes, abstract methods can declare exceptions using throws clause.",
    explanation: "Implementing methods may throw the declared exceptions or their subclasses.",
    hint: "Checked exceptions must be handled or declared.",
    level: "intermediate",
    codeExample: "void process() throws IOException;"
  },
  {
    question: "What is the difference between abstraction and interface in Java?",
    shortAnswer: "Abstraction is a concept; interface is a language construct to achieve abstraction.",
    explanation: "Abstract classes also provide abstraction, but with partial implementation.",
    hint: "Prefer interfaces for pure abstraction, abstract classes for common state.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "How do you create an anonymous implementation of an interface?",
    shortAnswer: "Using anonymous inner class or lambda (if functional).",
    explanation: "new Interface() { @Override public void method() { ... } }",
    hint: "Lambda only works for functional interfaces.",
    level: "intermediate",
    codeExample: "Runnable r = () -> System.out.println(\"run\");"
  },
  {
    question: "Can an interface be instantiated using 'new'?",
    shortAnswer: "No, but you can instantiate an anonymous class that implements it.",
    explanation: "The new keyword is used for the anonymous class, not the interface itself.",
    hint: "Interface i = new Interface() { ... }; // anonymous class",
    level: "basic",
    codeExample: ""
  },
  {
    question: "What is a constant interface anti‑pattern?",
    shortAnswer: "Defining only constants in an interface and then implementing it just to use those constants.",
    explanation: "Pollutes the namespace and leaks implementation detail. Use static import instead.",
    hint: "Constants should be in a class or enum.",
    level: "expert",
    codeExample: "// bad: interface Constants { int MAX = 10; } class MyClass implements Constants { }"
  },
  {
    question: "Can we have a generic interface?",
    shortAnswer: "Yes, interfaces can be generic, e.g., List<E>, Comparable<T>.",
    explanation: "Type parameters make the interface reusable for different types.",
    hint: "public interface Transformer<I, O> { O transform(I input); }",
    level: "intermediate",
    codeExample: "public interface Pair<K, V> { K getKey(); V getValue(); }"
  },
  {
    question: "How does Java 8 default methods affect multiple inheritance?",
    shortAnswer: "They introduce a form of multiple inheritance of behavior (but not state).",
    explanation: "A class can inherit default methods from multiple interfaces, with conflict resolution rules.",
    hint: "Still safer than C++ multiple inheritance.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What is the 'diamond problem' in interfaces?",
    shortAnswer: "When a class inherits two default methods with the same signature from two interfaces.",
    explanation: "Java forces the class to override the method to resolve the conflict.",
    hint: "Use InterfaceName.super.method() to choose.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "Can an interface be nested inside a class?",
    shortAnswer: "Yes, it is called a nested interface, and it is implicitly static.",
    explanation: "Accessible as OuterClass.NestedInterface.",
    hint: "Useful for logical grouping.",
    level: "intermediate",
    codeExample: "class Outer { interface Inner { void foo(); } }"
  },
  {
    question: "What is the role of interfaces in Java's Collection Framework?",
    shortAnswer: "They define the core contracts: Collection, List, Set, Map, Queue.",
    explanation: "Framework uses interfaces for interoperability and polymorphism.",
    hint: "ArrayList implements List, which extends Collection.",
    level: "intermediate",
    codeExample: "List<String> list = new ArrayList<>();"
  }
];

export default questions;