// topic3_questions.js
// 30 questions on Use of Abstract Class in Inheritance

const questions = [
    {
        question: "What is the primary benefit of using an abstract class in an inheritance hierarchy?",
        shortAnswer: "It allows code reuse while enforcing that subclasses implement specific behaviors.",
        explanation: "Abstract classes provide common fields and methods (reuse) and declare abstract methods that force subclasses to provide their own implementations.",
        hint: "Think of a template with both shared and customizable parts.",
        level: "basic",
        codeExample: "abstract class Shape { String color; abstract double area(); } // common field, abstract method"
    },
    {
        question: "How does inheritance with abstract classes support polymorphism?",
        shortAnswer: "You can treat any subclass instance as the abstract superclass type, calling abstract methods that execute subclass-specific implementations.",
        explanation: "Polymorphism allows a reference of the abstract class type to refer to any subclass object, and the correct overridden method is called at runtime.",
        hint: "Animal a = new Dog(); a.sound(); // calls Dog's sound()",
        level: "intermediate",
        codeExample: "Employee emp = new FullTimeEmployee(); emp.calculateSalary(); // polymorphic call"
    },
    {
        question: "Can an abstract class inherit from another abstract class?",
        shortAnswer: "Yes, and the child abstract class may choose to implement some or none of the parent's abstract methods.",
        explanation: "This creates a hierarchy of abstraction, where each level can become more concrete or add new abstract methods.",
        hint: "Like Animal → Mammal → Canine, each can be abstract.",
        level: "intermediate",
        codeExample: "abstract class A { abstract void a(); }\nabstract class B extends A { } // B is abstract, a() still abstract"
    },
    {
        question: "What happens if a concrete class extends an abstract class but doesn't implement all abstract methods?",
        shortAnswer: "Compiler error: 'The type must implement the inherited abstract method'.",
        explanation: "Concrete classes must provide implementations for all inherited abstract methods. Otherwise, they would be incomplete.",
        hint: "You'll get a clear error message listing the missing methods.",
        level: "basic",
        codeExample: "abstract class A { abstract void m(); }\nclass B extends A { } // ERROR"
    },
    {
        question: "Can an abstract class have a method that calls its own abstract methods?",
        shortAnswer: "Yes, this is the Template Method pattern, where a concrete method in the abstract class defines an algorithm using abstract steps.",
        explanation: "The abstract class can provide a skeleton algorithm (concrete method) that calls abstract methods, which subclasses implement.",
        hint: "This ensures the algorithm structure is consistent while allowing variations.",
        level: "advanced",
        codeExample: "abstract class Game { final void play() { start(); playTurn(); end(); } abstract void start(); abstract void playTurn(); abstract void end(); }"
    },
    {
        question: "What is the difference between inheriting from an abstract class vs. a concrete class?",
        shortAnswer: "An abstract class may have incomplete methods (abstract), forcing you to implement them, while a concrete class is complete.",
        explanation: "Abstract classes are designed for extension and force subclasses to complete the implementation. Concrete classes may be extended optionally.",
        hint: "Abstract classes say 'you must fill in the blanks'; concrete classes say 'use as is or override'.",
        level: "intermediate",
        codeExample: "abstract class A { abstract void m(); } // must override\nclass B { void m() {} } // optional override"
    },
    {
        question: "How does inheritance with abstract classes help with the Open/Closed Principle?",
        shortAnswer: "It allows you to add new subclasses without modifying existing code that uses the abstract superclass.",
        explanation: "The abstract class defines a stable interface. New functionality can be added by creating new subclasses, keeping existing code closed for modification.",
        hint: "You can add a new Employee type (e.g., Contractor) without changing payroll processing code.",
        level: "expert",
        codeExample: "// Existing code works with any new Employee subclass\nvoid processPayroll(Employee e) { e.calculateSalary(); }"
    },
    {
        question: "Can an abstract class inherit from a concrete class?",
        shortAnswer: "Yes, an abstract class can extend a concrete class, adding abstract methods or overriding concrete ones.",
        explanation: "This allows you to take a fully implemented class and make it abstract for further specialization.",
        hint: "Useful when you want to force additional methods in subclasses of an existing concrete class.",
        level: "advanced",
        codeExample: "class Concrete { void doIt() {} }\nabstract class Abstract extends Concrete { abstract void doMore(); }"
    },
    {
        question: "What is the role of constructors in an abstract class inheritance chain?",
        shortAnswer: "Each abstract class constructor initializes its own fields and is called via super() from the subclass constructor.",
        explanation: "Constructors in abstract classes are called in order from the top of the hierarchy down to the concrete class.",
        hint: "Even though you can't instantiate the abstract class, its constructor still runs.",
        level: "intermediate",
        codeExample: "abstract class A { A() { System.out.println(\"A\"); } }\nclass B extends A { B() { super(); } }"
    },
    {
        question: "How does method overriding work with abstract methods in a multi-level hierarchy?",
        shortAnswer: "An abstract method can be overridden at any level. A subclass can provide an implementation, and further subclasses can override it again.",
        explanation: "The first concrete class in the hierarchy must implement all abstract methods, but subclasses can override those implementations.",
        hint: "Abstract methods can be implemented and then overridden like any other method.",
        level: "intermediate",
        codeExample: "abstract class A { abstract void m(); }\nabstract class B extends A { void m() {} } // implements\nclass C extends B { void m() {} } // overrides"
    },
    {
        question: "Can you have a class that extends an abstract class and also implements an interface?",
        shortAnswer: "Yes, a class can extend one abstract class and implement multiple interfaces.",
        explanation: "Java supports single inheritance for classes (abstract or concrete) but multiple interface implementation.",
        hint: "The extends clause must come before implements.",
        level: "intermediate",
        codeExample: "class Concrete extends AbstractClass implements Interface1, Interface2 { }"
    },
    {
        question: "What is the 'is-a' relationship test for abstract class inheritance?",
        shortAnswer: "If you can say 'subclass IS-A superclass' in a meaningful way, inheritance is appropriate.",
        explanation: "For example, 'Dog IS-A Animal' makes sense. 'Car IS-A Engine' does not (Car HAS-A Engine). Abstract classes are for IS-A relationships.",
        hint: "If it's more 'has-a' or 'uses-a', consider composition instead.",
        level: "basic",
        codeExample: "// Good: class Dog extends Animal {}\n// Bad: class Car extends Engine {}"
    },
    {
        question: "How do you access an overridden abstract method implementation from a superclass?",
        shortAnswer: "Use 'super.methodName()' inside the subclass method to call the superclass version (if the superclass provided a concrete implementation).",
        explanation: "If an abstract method was implemented at some level, you can call super.method() to invoke that implementation.",
        hint: "Only works if the superclass actually has a concrete implementation.",
        level: "intermediate",
        codeExample: "class A { void m() { System.out.println(\"A\"); } }\nclass B extends A { void m() { super.m(); System.out.println(\"B\"); } }"
    },
    {
        question: "What is the difference between abstract class inheritance and interface implementation?",
        shortAnswer: "Abstract classes can hold state (fields) and provide partial implementation; interfaces (before Java 8) had only abstract methods and constants.",
        explanation: "Since Java 8, interfaces have default methods, but still cannot have instance fields (except static final). Abstract classes are better when sharing state.",
        hint: "Use abstract class for 'is-a' with shared code; use interface for 'can-do' capabilities.",
        level: "intermediate",
        codeExample: "abstract class Animal { String name; } // state\ninterface Flyable { void fly(); } // capability"
    },
    {
        question: "How does inheritance with abstract classes affect testing?",
        shortAnswer: "You can test the abstract class's concrete methods by creating a test-specific subclass that implements abstract methods.",
        explanation: "Abstract classes can be tested by creating a mock subclass or using anonymous classes in tests.",
        hint: "Use anonymous inner classes or mocking frameworks (Mockito) to test abstract classes.",
        level: "expert",
        codeExample: "new AbstractClass() { void abstractMethod() { } }.concreteMethod(); // test"
    },
    {
        question: "Can an abstract class be used as a reference type for a collection?",
        shortAnswer: "Yes, you can create collections (List, Set, Map) of the abstract class type and store any subclass instances.",
        explanation: "This is a powerful use of polymorphism with inheritance.",
        hint: "List<Shape> shapes = new ArrayList<>(); shapes.add(new Circle()); shapes.add(new Rectangle());",
        level: "intermediate",
        codeExample: "List<Employee> payroll = new ArrayList<>(); payroll.add(new FullTimeEmployee()); payroll.add(new Contractor());"
    },
    {
        question: "What is the 'template method' pattern and how does it use abstract class inheritance?",
        shortAnswer: "A pattern where an abstract class defines the skeleton of an algorithm in a concrete method, calling abstract methods for variable steps.",
        explanation: "The template method is often final to prevent subclasses from altering the algorithm structure. Subclasses implement the abstract steps.",
        hint: "Common in frameworks: JUnit's setUp(), tearDown() are hook methods called by template.",
        level: "advanced",
        codeExample: "abstract class Recipe { final void cook() { boil(); addIngredients(); simmer(); } abstract void addIngredients(); }"
    },
    {
        question: "How does inheritance with abstract classes support the Dependency Inversion Principle?",
        shortAnswer: "High-level modules depend on the abstract class (abstraction), not concrete subclasses, allowing easy substitution.",
        explanation: "By coding to the abstract class, you decouple high-level logic from low-level implementation details.",
        hint: "Your service class should depend on 'PaymentProcessor' abstract class, not 'StripeProcessor'.",
        level: "expert",
        codeExample: "class OrderService { private PaymentProcessor processor; } // depends on abstraction"
    },
    {
        question: "Can you override a concrete method from an abstract class and make it abstract?",
        shortAnswer: "Yes, you can override a concrete method with an abstract one, but the subclass must then be abstract.",
        explanation: "This 're-abstraction' forces further subclasses to provide an implementation.",
        hint: "Rare but useful in deep hierarchies where a middle class wants to force more specific behavior.",
        level: "expert",
        codeExample: "class A { void m() {} }\nabstract class B extends A { abstract void m(); } // re-abstracted"
    },
    {
        question: "How do you prevent a subclass from modifying a concrete method in an abstract class?",
        shortAnswer: "Declare the method as final in the abstract class.",
        explanation: "Final methods cannot be overridden by subclasses, ensuring the behavior remains consistent.",
        hint: "Use final for template methods to preserve algorithm structure.",
        level: "intermediate",
        codeExample: "abstract class A { final void template() { ... } } // cannot be overridden"
    },
    {
        question: "What is the difference between inheritance and composition when using abstract classes?",
        shortAnswer: "Inheritance is 'is-a' (Dog extends Animal), composition is 'has-a' (Car has Engine). Abstract classes support inheritance.",
        explanation: "Favor composition over inheritance when the relationship is not a clear 'is-a'. Abstract classes encourage inheritance, so use them appropriately.",
        hint: "If you find yourself inheriting just to reuse a method, composition might be better.",
        level: "advanced",
        codeExample: "// Inheritance: class Dog extends Animal {}\n// Composition: class Dog { private Leg leg; }"
    },
    {
        question: "How does Java's single inheritance limitation affect abstract classes?",
        shortAnswer: "A class can extend only one abstract class (or any class), but can implement multiple interfaces.",
        explanation: "This limitation means abstract classes should be used for primary classification, while interfaces add secondary capabilities.",
        hint: "Choose abstract class for the main 'type' of your object.",
        level: "intermediate",
        codeExample: "class Student extends Person implements Playable, Studyable { }"
    },
    {
        question: "Can an abstract class have a method that returns an instance of itself?",
        shortAnswer: "Yes, an abstract class can have methods that return its own type (or a subtype), useful for factory or builder patterns.",
        explanation: "The return type can be the abstract class, and concrete subclasses return instances of themselves.",
        hint: "Common in fluent APIs and builder patterns.",
        level: "advanced",
        codeExample: "abstract class Builder { abstract Builder addPart(); }\nclass ConcreteBuilder extends Builder { Builder addPart() { return this; } }"
    },
    {
        question: "What happens if you have two abstract classes in the inheritance chain both declaring the same abstract method?",
        shortAnswer: "No problem. The method remains abstract until a concrete class implements it.",
        explanation: "The most specific declaration doesn't cause conflict; the method just needs to be implemented once in a concrete subclass.",
        hint: "The method signature is the same, so one implementation satisfies all.",
        level: "intermediate",
        codeExample: "abstract class A { abstract void m(); }\nabstract class B extends A { } // m() still abstract"
    },
    {
        question: "How does inheritance with abstract classes affect serialization?",
        shortAnswer: "If an abstract class implements Serializable, all subclasses are serializable unless they override to prevent it.",
        explanation: "The abstract class can define serialVersionUID and handle serialization of its fields. Subclasses inherit serialization behavior.",
        hint: "Be careful with transient fields in abstract classes.",
        level: "expert",
        codeExample: "abstract class Base implements Serializable { protected transient int cache; }"
    },
    {
        question: "Can an abstract class be used with the 'instanceof' operator?",
        shortAnswer: "Yes, instanceof works with abstract class types because the actual object is always a concrete subclass.",
        explanation: "The operator checks the actual object's type against the abstract class, returning true if it's a subclass instance.",
        hint: "Useful for type checks in polymorphic code.",
        level: "intermediate",
        codeExample: "if (employee instanceof FullTimeEmployee) { ... }"
    },
    {
        question: "What is the 'factory method' pattern and how does it relate to abstract class inheritance?",
        shortAnswer: "A pattern where an abstract class declares a factory method (often abstract) that subclasses override to create specific objects.",
        explanation: "The abstract class may call its own abstract factory method to create objects, allowing subclasses to control instantiation.",
        hint: "Common in frameworks where the framework calls hooks to create objects.",
        level: "expert",
        codeExample: "abstract class Document { abstract Printer createPrinter(); void print() { createPrinter().print(); } }"
    },
    {
        question: "How does method hiding work with static methods in abstract class inheritance?",
        shortAnswer: "Static methods are hidden, not overridden. If a subclass defines a static method with the same signature, it hides the parent's method.",
        explanation: "Static methods belong to the class, not instances. The method called depends on the reference type, not the object type.",
        hint: "Avoid using static methods in inheritance hierarchies.",
        level: "advanced",
        codeExample: "abstract class A { static void m() { } }\nclass B extends A { static void m() { } } // hides, not overrides"
    },
    {
        question: "Can you cast from an abstract class type to a subclass type?",
        shortAnswer: "Yes, downcasting is allowed if the object actually is an instance of that subclass, but it may throw ClassCastException.",
        explanation: "Use instanceof before downcasting to avoid runtime exceptions.",
        hint: "Downcasting is sometimes necessary to access subclass-specific methods.",
        level: "intermediate",
        codeExample: "if (animal instanceof Dog) { Dog d = (Dog) animal; d.bark(); }"
    },
    {
        question: "What is the 'Hollywood Principle' and how does abstract class inheritance support it?",
        shortAnswer: "Don't call us, we'll call you. Abstract classes define hooks that the framework calls, allowing subclasses to plug in behavior.",
        explanation: "The abstract class (framework) controls the flow and calls abstract methods implemented by subclasses.",
        hint: "Template Method pattern is an example: framework calls your overrides.",
        level: "expert",
        codeExample: "// Framework: abstract class GameLoop { final void run() { init(); while(true) update(); } abstract void init(); abstract void update(); }"
    }
];

export default questions;