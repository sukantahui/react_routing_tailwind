// topic0_questions.js
// 30 questions on Abstraction (moderate to expert)

const questions = [
    {
        question: "What is abstraction in object-oriented programming?",
        shortAnswer: "Abstraction hides implementation details and shows only essential features.",
        explanation: "It's a fundamental OOP concept that reduces complexity by focusing on 'what' an object does rather than 'how' it does it. Achieved via abstract classes and interfaces.",
        hint: "Think of a TV remote - you press buttons without knowing the internal circuits.",
        level: "basic",
        codeExample: "abstract class Vehicle { abstract void start(); }"
    },
    {
        question: "How is abstraction different from encapsulation?",
        shortAnswer: "Abstraction hides complexity (design level), encapsulation hides data (implementation level).",
        explanation: "Abstraction provides a simplified interface to a complex system. Encapsulation bundles data and methods together and restricts direct access to some components.",
        hint: "Abstraction = 'what you see', Encapsulation = 'how you protect'.",
        level: "intermediate",
        codeExample: "// Abstraction: interface Vehicle { void move(); }\n// Encapsulation: private int speed; public void setSpeed(int s) { if(s>0) speed=s; }"
    },
    {
        question: "Can we instantiate an abstract class in Java?",
        shortAnswer: "No, abstract classes cannot be instantiated directly.",
        explanation: "Abstract classes are incomplete (they may have abstract methods without bodies). You must create a concrete subclass that implements all abstract methods.",
        hint: "Think of 'Animal' - you can't create an 'Animal' object, but you can create a 'Dog' or 'Cat'.",
        level: "basic",
        codeExample: "abstract class Animal {}\n// Animal a = new Animal(); // ERROR\nclass Dog extends Animal {}\nDog d = new Dog(); // OK"
    },
    {
        question: "What is the purpose of an abstract method?",
        shortAnswer: "To declare a method signature without implementation, forcing subclasses to provide their own version.",
        explanation: "Abstract methods define a contract. They ensure that every subclass will have that behavior, but each subclass can implement it differently.",
        hint: "A 'makeSound()' method for Animal - Dog barks, Cat meows.",
        level: "basic",
        codeExample: "abstract void makeSound(); // no body"
    },
    {
        question: "Can an abstract class have constructors?",
        shortAnswer: "Yes, abstract classes can have constructors, and they are called when a concrete subclass is instantiated.",
        explanation: "Constructors in abstract classes are used to initialize common state. They cannot be used to instantiate the abstract class directly but are invoked via super() from subclasses.",
        hint: "The abstract class constructor runs first, then the subclass constructor.",
        level: "intermediate",
        codeExample: "abstract class Base { Base() { System.out.println(\"Base\"); } }\nclass Derived extends Base { Derived() { super(); } }"
    },
    {
        question: "When should you use an abstract class instead of an interface (prior to Java 8)?",
        shortAnswer: "Use abstract class when you need to share code (concrete methods) among closely related classes.",
        explanation: "Abstract classes can have state (fields) and implemented methods. Interfaces were pure contracts. With default methods, the line blurs, but abstract classes still allow instance variables.",
        hint: "If you want a template with some default behavior, choose abstract class.",
        level: "intermediate",
        codeExample: "abstract class FileProcessor { void log(String msg) {...} abstract void process(); }"
    },
    {
        question: "What happens if a subclass does not implement all abstract methods of its parent abstract class?",
        shortAnswer: "The subclass must also be declared abstract.",
        explanation: "Java enforces that any concrete class must implement all inherited abstract methods. If not, the class remains abstract and cannot be instantiated.",
        hint: "The compiler will give an error unless you add 'abstract' to the subclass.",
        level: "basic",
        codeExample: "abstract class A { abstract void m(); }\nclass B extends A { } // ERROR\nabstract class C extends A { } // OK"
    },
    {
        question: "Can an abstract class be final?",
        shortAnswer: "No, an abstract class cannot be final because final prevents inheritance, and abstract requires inheritance.",
        explanation: "The two modifiers are contradictory. A final class cannot be extended, but an abstract class is meant to be extended.",
        hint: "Illegal combination: 'abstract final' results in a compile-time error.",
        level: "intermediate",
        codeExample: "// abstract final class X {} // COMPILE ERROR"
    },
    {
        question: "How does abstraction improve code maintainability?",
        shortAnswer: "By separating interface from implementation, changes to internals don't affect code that depends on the abstraction.",
        explanation: "When you rely on an abstract type, you can swap concrete implementations without modifying client code. This reduces ripple effects.",
        hint: "If you change how a 'PaymentProcessor' works, the shopping cart code doesn't break.",
        level: "expert",
        codeExample: "// Client depends on interface PaymentProcessor\nprocessor.process(amount);\n// Later you can change to PayPalProcessor without touching client."
    },
    {
        question: "What is the 'abstraction leak' problem?",
        shortAnswer: "When an abstraction accidentally exposes implementation details, forcing clients to know about internals.",
        explanation: "Example: a method called 'getFileSize()' that throws 'FileNotFoundException' leaks that files are involved. Better to catch and wrap into an abstraction-appropriate exception.",
        hint: "If you see a stack trace that mentions 'SQLException' from a 'UserRepository' abstraction, that's a leak.",
        level: "expert",
        codeExample: "// Leaky: public void load() throws SQLException;\n// Better: public void load() throws DataAccessException;"
    },
    {
        question: "What is the difference between abstract class and concrete class?",
        shortAnswer: "Concrete classes can be instantiated and have all methods implemented; abstract classes cannot be instantiated and may have abstract methods.",
        explanation: "Concrete classes provide full implementation. Abstract classes act as blueprints that define common behavior and force subclasses to provide specific implementations.",
        hint: "Concrete = ready-to-use object; Abstract = template.",
        level: "basic",
        codeExample: "abstract class Vehicle {} // cannot new\nclass Car extends Vehicle {} // concrete, can new"
    },
    {
        question: "Can an abstract class implement an interface?",
        shortAnswer: "Yes, an abstract class can implement an interface, and it may choose to implement some or none of the interface's methods.",
        explanation: "This allows you to provide default implementations for some methods while leaving others abstract for subclasses.",
        hint: "Useful for adapter classes where you only need to override a few methods.",
        level: "intermediate",
        codeExample: "interface Drawable { void draw(); void resize(); }\nabstract class Shape implements Drawable { public void resize() {...} } // draw() remains abstract"
    },
    {
        question: "How does abstraction support dependency inversion (DIP)?",
        shortAnswer: "DIP states that high-level modules should depend on abstractions, not concretions. Abstraction enables that by providing stable interfaces.",
        explanation: "By coding to interfaces/abstract classes, you decouple modules, making the system more flexible and testable.",
        hint: "Your service layer should depend on 'PaymentGateway' interface, not 'StripePaymentGateway' directly.",
        level: "expert",
        codeExample: "class OrderService {\n  private PaymentProcessor processor; // abstraction\n  OrderService(PaymentProcessor p) { this.processor = p; }\n}"
    },
    {
        question: "Can we have a static method in an abstract class?",
        shortAnswer: "Yes, abstract classes can have static methods. They belong to the class, not instances, and can be called without a subclass instance.",
        explanation: "Static methods are not inherited (they are hidden), but they are accessible via the abstract class name. They cannot be abstract because abstract implies overriding.",
        hint: "Useful for factory methods that return appropriate subclasses.",
        level: "intermediate",
        codeExample: "abstract class Database {\n  static Database getConnection(String type) { ... }\n}"
    },
    {
        question: "What is the purpose of 'abstract' keyword on a class that has no abstract methods?",
        shortAnswer: "To prevent instantiation of the class, even though it is fully implemented.",
        explanation: "Sometimes you want a class to serve only as a base class (like a utility of common code) and not be instantiated on its own.",
        hint: "It signals 'this class is meant to be extended, not used directly'.",
        level: "intermediate",
        codeExample: "abstract class BaseLogger {\n  void log(String msg) { System.out.println(msg); }\n}\n// BaseLogger b = new BaseLogger(); // ERROR"
    },
    {
        question: "How does abstraction relate to 'information hiding'?",
        shortAnswer: "Abstraction is about providing a simple interface; information hiding is about concealing implementation details. They work together.",
        explanation: "Abstraction decides what to expose, information hiding decides what to hide. Both reduce complexity and increase safety.",
        hint: "Public methods = abstraction; private fields/methods = information hiding.",
        level: "expert",
        codeExample: "class Bank {\n  public void withdraw(double amt) { ... } // abstraction\n  private void audit() { ... } // hidden\n}"
    },
    {
        question: "What are the advantages of using abstraction in large projects?",
        shortAnswer: "It reduces complexity, improves reusability, eases maintenance, and allows parallel development.",
        explanation: "Teams can work on different concrete implementations as long as they adhere to the same abstract contracts. Changes remain local.",
        hint: "Think of pluggable components: different payment methods, databases, or logging frameworks.",
        level: "expert",
        codeExample: "// Multiple implementations of same abstraction\nList<PaymentMethod> methods = Arrays.asList(new CreditCard(), new PayPal());"
    },
    {
        question: "Can an abstract class have a main method?",
        shortAnswer: "Yes, an abstract class can have a main method, and it can be executed (though the class itself cannot be instantiated).",
        explanation: "The main method is static, so it belongs to the class type, not an instance. You can run it as a normal Java program.",
        hint: "Try it: put public static void main in an abstract class - it runs fine.",
        level: "intermediate",
        codeExample: "abstract class Test { public static void main(String[] args) { System.out.println(\"Hello\"); } }"
    },
    {
        question: "What is the difference between abstraction and polymorphism?",
        shortAnswer: "Abstraction defines a contract; polymorphism allows using different implementations through that contract.",
        explanation: "Abstraction is about design (what to expect), polymorphism is about runtime behavior (which concrete method gets called).",
        hint: "Abstraction: 'Animal can move'. Polymorphism: a Dog runs, a Bird flies, both via move().",
        level: "intermediate",
        codeExample: "Animal a = new Dog(); // abstraction\n a.move(); // polymorphic call"
    },
    {
        question: "When is it better to use an interface over an abstract class in modern Java (with default methods)?",
        shortAnswer: "When you need multiple inheritance (implement several interfaces) or when the abstraction has no state.",
        explanation: "Interfaces allow a class to implement multiple types. Abstract classes still allow fields and constructors, but a class can extend only one.",
        hint: "If you need to add new methods without breaking existing code, use interface with default methods.",
        level: "expert",
        codeExample: "interface Flyable { default void fly() { ... } }\ninterface Swimmable { default void swim() { ... } }\nclass Duck implements Flyable, Swimmable {}"
    },
    {
        question: "Can you declare an abstract method in a non-abstract class?",
        shortAnswer: "No. If a class contains any abstract method, the class itself must be declared abstract.",
        explanation: "Java prevents creating instances of a class with incomplete method definitions. The abstract modifier on the class signals incompleteness.",
        hint: "The compiler error: 'The type X must be an abstract class to define abstract methods'.",
        level: "basic",
        codeExample: "class Bad { abstract void m(); } // ERROR"
    },
    {
        question: "How does abstraction help in unit testing?",
        shortAnswer: "It allows you to replace real implementations with mocks or stubs that adhere to the same abstraction.",
        explanation: "By coding to interfaces, you can inject test doubles, isolating the unit under test from external dependencies like databases or APIs.",
        hint: "Use Mockito to mock an interface and verify interactions without real network calls.",
        level: "expert",
        codeExample: "UserService service = new UserService(mockUserRepository); // mock implements interface"
    },
    {
        question: "What is the 'template method' pattern and how does it use abstraction?",
        shortAnswer: "Template method defines the skeleton of an algorithm in an abstract class, letting subclasses override specific steps.",
        explanation: "The abstract class contains a concrete method that calls abstract methods. Subclasses provide implementations for the abstract steps.",
        hint: "Like a recipe: the abstract class says 'boil water, add tea, steep', subclasses define what tea to add.",
        level: "expert",
        codeExample: "abstract class Brew { final void make() { boil(); add(); steep(); } abstract void add(); }"
    },
    {
        question: "Can we have a private abstract method?",
        shortAnswer: "No, because an abstract method must be overridden by subclasses, but private methods are not visible to subclasses.",
        explanation: "Private members are inaccessible outside the class, so a subclass cannot provide an implementation. The combination is illegal.",
        hint: "Compiler says: 'illegal combination of modifiers: abstract and private'.",
        level: "intermediate",
        codeExample: "// abstract private void m(); // ERROR"
    },
    {
        question: "What does the 'non-sealed' modifier mean in the context of sealed classes (Java 17+)?",
        shortAnswer: "It allows a subclass of a sealed class to be non-sealed, opening up further extension.",
        explanation: "Sealed classes restrict subclasses. A non-sealed subclass breaks the sealing for its own hierarchy, allowing unknown subclasses.",
        hint: "Sealed -> permits only specific subclasses. Non-sealed -> permits any subclass.",
        level: "expert",
        codeExample: "sealed class Shape permits Circle, Rectangle {}\nnon-sealed class Circle extends Shape {}\nclass FancyCircle extends Circle {} // now allowed"
    },
    {
        question: "How would you explain abstraction to a non-programmer?",
        shortAnswer: "Abstraction is like using a microwave: you press buttons (simple interface) without needing to know how microwaves work (complex internals).",
        explanation: "It's about hiding unnecessary detail. The microwave abstracts away magnetrons, timers, and waveguides.",
        hint: "Ask: Do you need to know the physics of radio waves to heat food? No.",
        level: "basic",
        codeExample: "// Press start() -> internal machinery runs"
    },
    {
        question: "What is the relationship between abstraction and refactoring?",
        shortAnswer: "Abstraction allows refactoring internal code without affecting external clients, as long as the abstract contract remains unchanged.",
        explanation: "You can optimize, fix bugs, or change algorithms inside a class; client code that uses the public abstract interface never needs to change.",
        hint: "The abstract methods act as a protective shield.",
        level: "expert",
        codeExample: "// Changed implementation from ArrayList to LinkedList, but get(int) still works"
    },
    {
        question: "Can an abstract class be used as a type for a method parameter?",
        shortAnswer: "Yes, you can use an abstract class type for parameters, variables, and return types.",
        explanation: "This is the essence of abstraction: you write code that works with any concrete subclass of the abstract type.",
        hint: "It promotes loose coupling.",
        level: "intermediate",
        codeExample: "void process(Shape s) { s.draw(); } // works for Circle, Rectangle"
    },
    {
        question: "What is the 'abstract factory' pattern?",
        shortAnswer: "A creational pattern that provides an interface for creating families of related objects without specifying their concrete classes.",
        explanation: "It uses abstraction to decouple client code from concrete product classes. The abstract factory returns abstract products.",
        hint: "Example: GUIFactory creates Button and Window; WindowsFactory returns WindowsButton, WindowsWindow.",
        level: "expert",
        codeExample: "interface GUIFactory { Button createButton(); }\nclass WinFactory implements GUIFactory { ... }"
    },
    {
        question: "How does Java's 'abstract' keyword differ from 'virtual' in C++?",
        shortAnswer: "In Java, 'abstract' methods have no body; in C++, 'virtual' methods can have a default implementation (pure virtual = abstract).",
        explanation: "Java's abstract method is equivalent to C++ pure virtual function (=0). Java doesn't need 'virtual' keyword because all non-static methods are virtual by default.",
        hint: "C++: virtual void f() = 0; Java: abstract void f();",
        level: "expert",
        codeExample: "// C++: virtual void start() = 0;\n// Java: public abstract void start();"
    },
    {
        question: "What happens if you try to override a concrete method with an abstract one in a subclass?",
        shortAnswer: "It is allowed, but the subclass must then be declared abstract because it introduces a new abstract method.",
        explanation: "You can 're-abstract' a method by overriding a concrete method with an abstract one. This forces further subclasses to implement it.",
        hint: "Rarely used, but can be useful in deep hierarchies.",
        level: "expert",
        codeExample: "class A { void m() {} }\nabstract class B extends A { abstract void m(); } // allowed, B abstract"
    }
];

export default questions;