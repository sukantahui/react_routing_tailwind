// topic1_questions.js
const questions = [
  {
    question: "What keyword is used to define an interface?",
    shortAnswer: "interface",
    explanation: "Syntax: `interface InterfaceName { }`",
    hint: "It's similar to `class` but with a different keyword.",
    level: "basic",
    codeExample: "public interface Drawable { void draw(); }"
  },
  {
    question: "How does a class implement an interface?",
    shortAnswer: "Using the `implements` keyword.",
    explanation: "Example: `class Circle implements Drawable { }`",
    hint: "Think 'a class implements a contract'.",
    level: "basic",
    codeExample: "class Rectangle implements Shape { ... }"
  },
  {
    question: "What happens if a class does not implement all abstract methods of an interface?",
    shortAnswer: "Compilation error: 'class must be declared abstract or implement abstract method'.",
    explanation: "Unless the class itself is abstract, it must provide implementations.",
    hint: "Try removing one method in Car.java to see.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Can a class implement multiple interfaces?",
    shortAnswer: "Yes, separate by commas: `class A implements B, C`",
    explanation: "This is Java's way of achieving multiple inheritance of type.",
    hint: "It's like promising to do multiple things.",
    level: "intermediate",
    codeExample: "class Student implements Comparable<Student>, Serializable { }"
  },
  {
    question: "What is the default access modifier for methods in an interface?",
    shortAnswer: "public abstract (implicitly)",
    explanation: "You can omit `public` and `abstract`, they are added by the compiler.",
    hint: "All interface methods are automatically public.",
    level: "basic",
    codeExample: "void start(); // actually public abstract void start();"
  },
  {
    question: "What is the default access modifier for variables in an interface?",
    shortAnswer: "public static final",
    explanation: "All variables are constants.",
    hint: "You cannot change them in implementing classes.",
    level: "basic",
    codeExample: "int MAX = 100; // public static final int MAX = 100;"
  },
  {
    question: "Can an interface contain a constructor?",
    shortAnswer: "No.",
    explanation: "Interfaces cannot be instantiated, so constructors are meaningless.",
    hint: "Only classes have constructors.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "What is the purpose of the `@Override` annotation when implementing interface methods?",
    shortAnswer: "It tells the compiler that the method overrides a supertype method (interface or parent class).",
    explanation: "Helps catch typos (e.g., `startengine()` vs `startEngine()`).",
    hint: "Always use it – it's a best practice.",
    level: "intermediate",
    codeExample: "@Override public void startEngine() { }"
  },
  {
    question: "Can an interface extend another interface?",
    shortAnswer: "Yes, using `extends`.",
    explanation: "An interface can extend one or more interfaces.",
    hint: "`interface B extends A { }`",
    level: "intermediate",
    codeExample: "interface List extends Collection { }"
  },
  {
    question: "Can an interface implement another interface?",
    shortAnswer: "No, interfaces do not 'implement' – they 'extend'.",
    explanation: "Implementation is for classes.",
    hint: "Wrong: `interface B implements A` – not allowed.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "What is a functional interface?",
    shortAnswer: "An interface with exactly one abstract method.",
    explanation: "Used as the target for lambda expressions.",
    hint: "Can be annotated with `@FunctionalInterface`.",
    level: "intermediate",
    codeExample: "@FunctionalInterface interface Calculator { int compute(int a, int b); }"
  },
  {
    question: "Can we declare an interface method as `final`?",
    shortAnswer: "No, because it's abstract by default and must be overridden.",
    explanation: "`final` and `abstract` cannot coexist.",
    hint: "Try `final void method();` – compiler error.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "What is the difference between `extends` and `implements`?",
    shortAnswer: "`extends` is for class-to-class or interface-to-interface inheritance. `implements` is for class-to-interface.",
    explanation: "A class can extend only one class but implement many interfaces.",
    hint: "Extends = inheritance, implements = contract fulfillment.",
    level: "basic",
    codeExample: "class Child extends Parent implements MyInterface { }"
  },
  {
    question: "Can an abstract class implement an interface without implementing its methods?",
    shortAnswer: "Yes, an abstract class can leave some interface methods abstract.",
    explanation: "The first concrete subclass must implement all remaining abstract methods.",
    hint: "Useful for partial implementations.",
    level: "intermediate",
    codeExample: "abstract class AbstractDrawer implements Drawable { // optionally implement some methods }"
  },
  {
    question: "What is a marker interface? Give an example.",
    shortAnswer: "An interface with no methods, used to mark a class as having a property.",
    explanation: "Examples: `Serializable`, `Cloneable`.",
    hint: "It's like a tag.",
    level: "intermediate",
    codeExample: "public interface Serializable { }"
  },
  {
    question: "Can an interface contain static methods?",
    shortAnswer: "Yes, from Java 8 onward.",
    explanation: "Static methods belong to the interface and are called via `InterfaceName.method()`.",
    hint: "They are not inherited by implementing classes.",
    level: "intermediate",
    codeExample: "static void printVersion() { System.out.println(\"1.0\"); }"
  },
  {
    question: "What are default methods in interfaces?",
    shortAnswer: "Methods with a default implementation using the `default` keyword.",
    explanation: "Introduced in Java 8 to allow adding methods to interfaces without breaking existing code.",
    hint: "Used in Collection API (e.g., `forEach`, `stream`).",
    level: "intermediate",
    codeExample: "default void log(String msg) { System.out.println(msg); }"
  },
  {
    question: "If a class implements two interfaces with a default method of the same signature, what happens?",
    shortAnswer: "Compilation error – the class must override the method.",
    explanation: "You can resolve by providing your own implementation or using `InterfaceName.super.method()`.",
    hint: "Diamond problem in interfaces.",
    level: "expert",
    codeExample: "public void method() { InterfaceA.super.method(); }"
  },
  {
    question: "Can an interface be instantiated with `new`?",
    shortAnswer: "No, but you can instantiate an anonymous class that implements it.",
    explanation: "`new Interface() { ... }` creates an instance of an anonymous class.",
    hint: "Useful for event handlers.",
    level: "intermediate",
    codeExample: "Runnable r = new Runnable() { public void run() { ... } };"
  },
  {
    question: "What is the `Cloneable` interface used for?",
    shortAnswer: "It marks a class as safe to clone using `Object.clone()`.",
    explanation: "Without it, `clone()` throws `CloneNotSupportedException`.",
    hint: "Marker interface.",
    level: "intermediate",
    codeExample: "class Person implements Cloneable { ... }"
  },
  {
    question: "Can we have a private method in an interface?",
    shortAnswer: "Yes, from Java 9 onward, private methods (static or instance) are allowed.",
    explanation: "Used to share code between default methods without exposing it.",
    hint: "Helps with code reuse inside interface.",
    level: "expert",
    codeExample: "private void helper() { }"
  },
  {
    question: "What is the difference between an abstract class and an interface in terms of fields?",
    shortAnswer: "Abstract classes can have instance variables; interfaces can only have `public static final` constants.",
    explanation: "Interfaces cannot hold state.",
    hint: "State vs. contract.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "Can a class implement an interface and extend a class at the same time?",
    shortAnswer: "Yes. Syntax: `class Child extends Parent implements MyInterface`.",
    explanation: "The `extends` clause must come before `implements`.",
    hint: "Single inheritance for class, multiple for interfaces.",
    level: "basic",
    codeExample: "class Student extends Person implements Comparable<Student> { }"
  },
  {
    question: "What is the `Comparable` interface used for?",
    shortAnswer: "It defines natural ordering for objects via `compareTo()` method.",
    explanation: "Used by `Collections.sort()` and `Arrays.sort()`.",
    hint: "Returns negative, zero, or positive.",
    level: "intermediate",
    codeExample: "public int compareTo(Student other) { return this.id - other.id; }"
  },
  {
    question: "What is the `Comparator` interface?",
    shortAnswer: "A functional interface that defines custom ordering (multiple strategies).",
    explanation: "Unlike `Comparable`, it is external to the class.",
    hint: "Useful for sorting by different fields.",
    level: "intermediate",
    codeExample: "Comparator<Person> byAge = (p1, p2) -> p1.age - p2.age;"
  },
  {
    question: "Can an interface have a nested class?",
    shortAnswer: "Yes, an interface can contain a static nested class (implicitly static).",
    explanation: "Used for helper classes specific to the interface.",
    hint: "Access via `InterfaceName.NestedClass`.",
    level: "expert",
    codeExample: "interface Container { class Node { ... } }"
  },
  {
    question: "What is the purpose of the `@FunctionalInterface` annotation?",
    shortAnswer: "It ensures that the interface has exactly one abstract method.",
    explanation: "Prevents accidental addition of extra abstract methods.",
    hint: "Optional but recommended for functional interfaces.",
    level: "intermediate",
    codeExample: "@FunctionalInterface interface Greeting { void sayHello(); }"
  },
  {
    question: "Can an interface method throw an exception?",
    shortAnswer: "Yes, using `throws` clause.",
    explanation: "The implementing method may throw the same or a subclass exception.",
    hint: "Checked exceptions must be declared or handled in the implementation.",
    level: "intermediate",
    codeExample: "void process() throws IOException;"
  },
  {
    question: "What is the default method conflict resolution rule?",
    shortAnswer: "Class implementation wins over interface default. If two interfaces conflict, the class must override.",
    explanation: "Rule: class > superclass > interface default.",
    hint: "Explicit is better than implicit.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "Why would you use an interface instead of an abstract class?",
    shortAnswer: "To achieve full abstraction and multiple inheritance of type.",
    explanation: "Interfaces are more flexible and decoupled. Use when you only need to define behavior, not state.",
    hint: "Prefer interfaces for defining capabilities (e.g., `Flyable`, `Runnable`).",
    level: "intermediate",
    codeExample: ""
  }
];

export default questions;