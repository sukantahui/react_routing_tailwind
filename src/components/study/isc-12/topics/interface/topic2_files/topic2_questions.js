// topic2_questions.js
const questions = [
  {
    question: "Does Java support multiple inheritance of classes?",
    shortAnswer: "No.",
    explanation: "A class can extend only one superclass, but can implement many interfaces.",
    hint: "Multiple inheritance of type is allowed via interfaces.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "How does a class achieve multiple inheritance in Java?",
    shortAnswer: "By implementing multiple interfaces.",
    explanation: "Example: `class C implements A, B { }`",
    hint: "Use `implements` with comma-separated interfaces.",
    level: "basic",
    codeExample: "class FlyingCar implements Flyable, Drivable { ... }"
  },
  {
    question: "What is the diamond problem in multiple inheritance?",
    shortAnswer: "Ambiguity when a class inherits from two parents that have a method with the same signature.",
    explanation: "Java avoids this by disallowing multiple class inheritance and using interface default method conflict resolution rules.",
    hint: "C++ has this problem; Java solves it.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "If a class implements two interfaces with the same abstract method, how many implementations are needed?",
    shortAnswer: "One implementation suffices because the method signature is identical.",
    explanation: "The single method fulfills both contracts.",
    hint: "No conflict for abstract methods.",
    level: "intermediate",
    codeExample: "interface A { void foo(); } interface B { void foo(); } class C implements A,B { public void foo() { ... } }"
  },
  {
    question: "What happens if two interfaces provide a default method with the same signature?",
    shortAnswer: "Compilation error; the class must override the method.",
    explanation: "The class can provide its own implementation or use `InterfaceName.super.method()`.",
    hint: "Diamond problem in interfaces.",
    level: "expert",
    codeExample: "public void foo() { InterfaceA.super.foo(); }"
  },
  {
    question: "Can an interface extend multiple interfaces?",
    shortAnswer: "Yes, an interface can extend one or more interfaces using `extends` with commas.",
    explanation: "This allows combining interfaces.",
    hint: "Example: `interface C extends A, B { }`",
    level: "intermediate",
    codeExample: "interface List extends Collection, Iterable { }"
  },
  {
    question: "What is the order of `extends` and `implements` in a class declaration?",
    shortAnswer: "`extends` must come before `implements`.",
    explanation: "Correct: `class Child extends Parent implements MyInterface`",
    hint: "Think: inheritance first, then contracts.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Can a class implement an interface and also extend a class that already implements that interface?",
    shortAnswer: "Yes, it's allowed and the class inherits the implementation from the superclass.",
    explanation: "The class may override if needed.",
    hint: "It still satisfies the interface contract.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "What is the benefit of multiple interface inheritance over multiple class inheritance?",
    shortAnswer: "Avoids state ambiguity (diamond problem) and keeps the design flexible.",
    explanation: "Interfaces provide only behavior contracts, no state, so conflicts are simpler to resolve.",
    hint: "No 'deadly diamond of death'.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "Can an interface inherit from a class?",
    shortAnswer: "No, interfaces can only extend other interfaces.",
    explanation: "Classes contain implementation which interfaces cannot inherit.",
    hint: "`interface B extends A` where A must be an interface.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "How do you resolve a default method conflict when implementing two interfaces?",
    shortAnswer: "Override the method in the class, optionally using `InterfaceName.super.methodName()` to call a specific default.",
    explanation: "This gives full control.",
    hint: "Explicit is better than implicit.",
    level: "expert",
    codeExample: "@Override public void log() { InterfaceA.super.log(); }"
  },
  {
    question: "What is the `super` keyword in the context of default method conflicts?",
    shortAnswer: "`InterfaceName.super.method()` calls the default method of a specific interface.",
    explanation: "Useful when you want to reuse one of the conflicting defaults.",
    hint: "Available only in the implementing class.",
    level: "expert",
    codeExample: "Movable.super.move();"
  },
  {
    question: "Can an abstract class implement multiple interfaces?",
    shortAnswer: "Yes, and it may choose not to implement some methods, leaving them abstract.",
    explanation: "The first concrete subclass must implement all remaining abstract methods.",
    hint: "Abstract classes can act as partial implementations.",
    level: "intermediate",
    codeExample: "abstract class AbstractShape implements Movable, Drawable { // optionally implement one method }"
  },
  {
    question: "Is it possible to have a class implement 100 interfaces?",
    shortAnswer: "Technically yes, but it's a bad design (God object anti-pattern).",
    explanation: "Interfaces should be small and focused. Many interfaces suggest the class does too much.",
    hint: "Refactor into smaller classes.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "How does polymorphism work with multiple interfaces?",
    shortAnswer: "An object can be referenced by any of its implemented interface types.",
    explanation: "You can pass the object to methods expecting any of those interfaces.",
    hint: "Promotes flexibility and decoupling.",
    level: "intermediate",
    codeExample: "Movable m = new Shape(); Drawable d = new Shape();"
  },
  {
    question: "What is the difference between `extends` and `implements` for interfaces?",
    shortAnswer: "An interface `extends` another interface to add more methods. A class `implements` an interface to provide method bodies.",
    explanation: "`extends` is for inheritance among interfaces; `implements` is for classes fulfilling a contract.",
    hint: "Remember: interface-to-interface = extends, class-to-interface = implements.",
    level: "basic",
    codeExample: "interface B extends A { } class C implements B { }"
  },
  {
    question: "Can a class implement two interfaces that have a method with the same name but different return types?",
    shortAnswer: "No, because Java does not allow methods with same name and parameters but different return types (not overload).",
    explanation: "This is a compile-time error.",
    hint: "Return type is not part of method signature for overloading/overriding in this context.",
    level: "expert",
    codeExample: "interface A { int get(); } interface B { String get(); } // class cannot implement both"
  },
  {
    question: "What is the purpose of marker interfaces like `Serializable` in multiple inheritance context?",
    shortAnswer: "They add a type tag without methods, allowing instanceof checks and JVM special behavior.",
    explanation: "A class can implement `Serializable` along with other interfaces to gain serialization capability.",
    hint: "Marker interfaces add metadata.",
    level: "intermediate",
    codeExample: "class Student implements Serializable, Comparable<Student> { }"
  },
  {
    question: "If a class implements `Comparable` and also extends a class that implements `Comparable`, which `compareTo` is used?",
    shortAnswer: "The class inherits the parent's implementation unless it overrides.",
    explanation: "Inheritance hierarchy determines method resolution, not the fact that the interface is implemented twice.",
    hint: "The class's own implementation takes precedence if provided.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "Can an interface contain a default method that overrides a method from `Object` class?",
    shortAnswer: "No, because interfaces cannot provide default methods for `equals`, `hashCode`, or `toString`.",
    explanation: "These are always inherited from `Object`. It's a compile-time error.",
    hint: "Object methods are special.",
    level: "expert",
    codeExample: "default String toString() { ... } // error"
  },
  {
    question: "What is the 'inheritance of type' vs 'inheritance of implementation'?",
    shortAnswer: "Type inheritance means the object can be treated as that type; implementation inheritance means reusing code.",
    explanation: "Interfaces give type inheritance; classes give both.",
    hint: "Java uses multiple inheritance of type (interfaces) but single inheritance of implementation (classes).",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "Can a class implement an interface and also extend a class that already implements that interface, causing duplicate implementation?",
    shortAnswer: "Yes, it's allowed; the class inherits the parent's implementation (which it can override).",
    explanation: "No conflict because there's only one implementation in the hierarchy.",
    hint: "Java is fine with that.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "What is the maximum number of interfaces a class can implement?",
    shortAnswer: "No theoretical limit, but practical limits due to memory and design.",
    explanation: "The JVM specification doesn't limit the number, but each implemented interface adds a reference in the class's metadata.",
    hint: "Keep it reasonable (3-5).",
    level: "expert",
    codeExample: ""
  },
  {
    question: "How does the JVM handle method lookup when a class implements multiple interfaces?",
    shortAnswer: "The JVM uses virtual tables (vtable) and interface tables (itable) to dispatch methods efficiently.",
    explanation: "Each class has a single vtable for its own methods and an itable for each implemented interface.",
    hint: "It's more complex but efficient.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "Can a class implement an interface with a generic type in multiple ways?",
    shortAnswer: "No, a class can implement a generic interface only once with specific type arguments.",
    explanation: "Example: `class MyList implements List<String>, List<Integer>` is illegal because of type erasure.",
    hint: "Only one concrete parameterization per interface.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What is the role of interfaces in the Strategy design pattern?",
    shortAnswer: "Interfaces define the strategy contract, and different classes implement the interface to provide various algorithms.",
    explanation: "This allows runtime switching of behaviors.",
    hint: "Multiple interface implementations = multiple strategies.",
    level: "expert",
    codeExample: "interface SortStrategy { void sort(int[] arr); } class BubbleSort implements SortStrategy { ... }"
  },
  {
    question: "How do you ensure that a class cannot be instantiated but can still implement multiple interfaces?",
    shortAnswer: "Make the class abstract. Abstract classes can implement interfaces without providing all method bodies.",
    explanation: "Abstract classes cannot be instantiated, but concrete subclasses can.",
    hint: "Useful for base classes.",
    level: "intermediate",
    codeExample: "abstract class Base implements A, B { // partial implementation }"
  },
  {
    question: "Can an enum implement multiple interfaces?",
    shortAnswer: "Yes, enums can implement interfaces, and each enum constant can provide its own behavior.",
    explanation: "Enums are classes under the hood and can implement interfaces like any other class.",
    hint: "Example: `enum Operation implements Calculator { PLUS, MINUS }`",
    level: "expert",
    codeExample: "enum Color implements Drawable { RED, GREEN; public void draw() { ... } }"
  },
  {
    question: "What is the difference between multiple inheritance using interfaces and using mixins (traits) in other languages?",
    shortAnswer: "Java interfaces (with default methods) provide similar capability to mixins but without state.",
    explanation: "Languages like Scala traits can have state; Java default methods cannot access instance fields unless provided by the class.",
    hint: "State remains in the class, not in the interface.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "Why can't Java allow a class to extend two classes even if those classes have no conflicting methods?",
    shortAnswer: "Because of potential state conflicts and complexity in the JVM (object layout, super calls, etc.).",
    explanation: "The designers chose simplicity and safety over flexibility.",
    hint: "It's a design trade-off.",
    level: "expert",
    codeExample: ""
  }
];

export default questions;